1 :  Write Dockerfile for node-todo nodeJs app to build docker images

2 :  Test Build with  manual build command
    
        docker build -t node-todo .

3 : Write docker-compose file to deploy Container Service

        version: '2.0'
        services:
            # mongoDB
            mongodb:
                image: mongo:4.0.2
                hostname: mongodb
                container_name: mongodb
                #environment:
                #  MONGO_INITDB_ROOT_USERNAME: "uzzal"
                #  MONGO_INITDB_ROOT_PASSWORD: "password"
                ports:
                - "27017:27017"
                restart: always

            # node-todo App
            node-todo:
                build: .
                container_name: todo-container
                hostname: node-todo
                ports:
                - 80:8080/tcp
                tty: true
                links:
                - mongodb
                depends_on:
                - mongodb
                restart: always

    
    Note: Official mongoDB docker image are used here. I found some issue with USERNAME & PASSWORD
          For that reasion, I leave USERNAEM & PASSWORD 

4 : Found Some Issue with Database Connection [Not Connecting Remote Database], So that I modified server.js   Looking Database connection on 127.0.0.1:27017

    //mongoose.connect(database.localUrl);
    
    mongoose.connect(database.remoteUrl);

5 : Inthis point change DATABASE Connection as bellow 
      
        config/database.js
            ---

            module.exports = {
                remoteUrl : 'mongodb://username:password@mongodb:27017/tododb',
                localUrl: 'mongodb://localhost/meanstacktutorials'
            };

6 : In step 5, I fall in authentication issue with database. After digging  into depp on MongoDB Container, I found there was Issue with that official Image Creation, USERS are getting permission into test DB by default 

If I create user into MongoDB Container, That user get permission by default for test DB

        db.createUser({
            user: 'username',
            pwd: 'password',
            roles: [ { role: "dbOwner", db: "tododb" },
                { role: "dbAdmin", db: "tododb" },
                { role: "readWrite", db: "tododb" }
            ]})

In this  stage I build a new MongoDB image using Ubuntu:16.04 and and Test everything working fine with -  

        module.exports = {
                remoteUrl : 'mongodb://username:password@mongodb:27017/tododb',
                localUrl: 'mongodb://localhost/meanstacktutorials'
            };

After that I decided to use database connection without USERNAME & PASSWORD, as this is a test project.

        module.exports = {
                remoteUrl : 'mongodb://mongodb:27017/tododb',
                localUrl: 'mongodb://localhost/meanstacktutorials'
            };

<h3>Note :</h3>  In production, I will use custom MongoDB docker image with USER Authentication. 

7 :  I write YML file to deploy node-todo application in kubernetes.  I use [Kubernetes Playground | Katacoda](https://www.katacoda.com/courses/kubernetes/playground) to test deploy.

I write two separate Kubernetes YML files. One for Single container with <b>kind: Pod </b>  & seconde one I write for <b>ReplicationController</b>


k8s-node-todo.yml

    ---
    apiVersion: v1
    kind: Service
    metadata:
    name: todo-service
    labels:
        name: todo-service
        app: nodeapp
    spec:
    selector:
        name: node-todo
        app: todoapp
    ports:
    - port: 80
        name: node-port
        targetPort: 8080
        protocol: TCP
    type: LoadBalancer

    ---
    apiVersion: v1
    kind: Pod
    metadata:
    name: todo-pod
    labels:
        name: node-todo
        app: todoapp
    spec:
    containers:
    - name: todo-container
        image: index.docker.io/uzzal2k5/node-todo:latest
        env:
        - name: MONGODB_HOST
        value: mongodb
        ports:
        - containerPort: 8080
    ---
    apiVersion: v1
    kind: Service
    metadata:
    name: mongodb
    labels:
        name: mongodb
        app: database
    spec:
    selector:
        name: mongodb
        app: database
    ports:
    - port: 27017
        name: db-port
        targetPort: 27017

    ---
    apiVersion: v1
    kind: Pod
    metadata:
    name: mongodb
    labels:
        name: mongodb
        app: database
    spec:
    containers:
    - name: mongodb
        image: mongo:4.0.2
        ports:
        - containerPort: 27017

aws-k8s-replication.yml

    ---
    apiVersion: v1
    kind: Service
    metadata:
    name: todo-service
    labels:
        name: todo-service
        app: nodeapp
    spec:
    selector:
        name: node-todo
        app: todoapp
    ports:
    - port: 80
        name: node-port
        targetPort: 8080
        protocol: TCP
    type: LoadBalancer

    ---
    apiVersion: v1
    kind: ReplicationController
    metadata:
    name: todo-replicas
    labels:
        name: node-todo
        app: todoapp
    spec:
    replicas: 2
    template:
        metadata:
        name: todo-pod
        labels:
            name: node-todo
            app: todoapp
        spec:
        containers:
        - name: todo-container
            image: index.docker.io/uzzal2k5/node-todo:latest
            env:
            - name: MONGODB_HOST
            value: mongodb
            ports:
            - containerPort: 8080
            #imagePullPolicy: Always
    ---
    apiVersion: v1
    kind: Service
    metadata:
    name: mongodb
    labels:
        name: mongodb
        app: database
    spec:
    selector:
        name: mongodb
        app: database
    ports:
    - port: 27017
        name: db-port
        targetPort: 27017

    ---
    apiVersion: v1
    kind: Pod
    metadata:
    name: mongodb
    labels:
        name: mongodb
        app: database
    spec:
    containers:
    - name: mongodb
        image: mongo:4.0.2
        ports:
        - containerPort: 27017

<b>Note:</b> Need to active [uncomment] <b>#imagePullPolicy: Always</b> , If use AWS ECR [ AWS Docker Registry ]


8 : Finally I write <b>Jenkinsfile </b> to automate (CI/CD) build node-todo image , push it to docker hub registry.
    

Jenkinsfile

    #!groovy
    import groovy.json.JsonSlurperClassic
    def SERVER_TO_DEPLOY = "tcp://192.168.8.62:2376"
    def DOCKER_IMAGE_REGISTRY = "index.docker.io/uzzal2k5"
    def GIT_REPOSITORY_NAME  = "https://github.com/uzzal2k5/node-todo.git"
    def BRANCH = "master"

    def IMAGE_NAME = "node-todo"
    def todoImages
    def version, revision


    // Version & Release Specified Here
    def getVersion(def projectJson){
        def slurper = new JsonSlurperClassic()
        project = slurper.parseText(projectJson)
        slurper = null
        return project.version.split('-')[0]
    }


    // REPOSITORY CLONE FROM GIT
    def CloneFromGit( REPOSITORY_NAME, BRANCH ){
        def version, revision
        try {
            git(branch: "${BRANCH}",
                    changelog: true,
                    credentialsId: 'github-credentials',
                    poll: true,
                    url: "${REPOSITORY_NAME }"
            )
        }
        catch (Exception e) {
            println 'Some Exception happened here '
            throw e

        }
        finally {
            revision = version + "-" + sprintf("%04d", env.BUILD_NUMBER.toInteger())
            println "Start building  revision $revision"

        }
        return this
    }


    // DOCKER IMAGE BUILD & PUSH TO REGISTRY
    def DockerImageBuild( DOCKER_BUILD_SERVER, DOCKER_IMAGE_REGISTRY, IMAGE_NAME ){

        // DOCKER IMAGE BUILD
        withDockerServer([uri: "${DOCKER_BUILD_SERVER}"]) {
            stage('IMAGE BUILD'){

                todoImages = docker.build("${DOCKER_IMAGE_REGISTRY}/${IMAGE_NAME}")


            }

            //PUSH TO REGISTRY
            stage('PUSH IMAGE'){
                withDockerRegistry(credentialsId: 'DOCKERID', url: '') {
                    todoImages.push("${env.BUILD_NUMBER}")
                    todoImages.push("latest")
                }

            }

        }
        return this
    }

    // BUILD NODE
    node {


        stage('GIT CLONE') {
                CloneFromGit(GIT_REPOSITORY_NAME, BRANCH)

        }

        DockerImageBuild(SERVER_TO_DEPLOY,DOCKER_IMAGE_REGISTRY, IMAGE_NAME)


    //NODE END
    }


This Jekinsfile will automate builing docker image for this application according to Dockerfile 