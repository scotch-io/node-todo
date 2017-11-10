node{
        def commit_id
        def customImage
        def imageName
        
            stage('preparation'){
                checkout scm
                sh "git rev-parse --short HEAD > .git/commit-id"
                commit_id = readFile('.git/commit-id').trim()
            }

            stage('test') {
                // nodejs(nodeJSInstallationName: 'nodejs') {
                //     sh 'npm install --only=dev'
                //     sh 'npm test'
                // }
            }

            stage('build') {
                imageName = "my-node-todo" + ":" + commit_id
                customImage = docker.build(imageName, ".")
            }

            // stage('docker build/push') {
            //     docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
            //     def app = docker.build("emrahyumuk/node-todo:${commit_id}", '.').push()
            // }

            stage('deploy') {
                
                sh "lsof -i:8000"
                def removePreviousContainer = 'docker rm -f my-node-todo-container && echo "previous container removed" || echo "container does not exist"'
                sh removePreviousContainer
                def dockerRunImage = "docker run -d -p 8000:8000 --link=mongo-container --network=nodetodo_db " + imageName
                sh dockerRunImage
                // docker.image(imageName).withRun('-p 8000:8000 --link=mongo-container --network=nodetodo_db"') {c ->
                //     //sh "curl -i http://${hostIp(c)}:8000/"
                // }
            }
   }