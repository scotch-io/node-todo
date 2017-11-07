node{
        def commit_id
        def customImage
        def customContainer
        
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
                def imageName = "my-node-todo" + ":" + commit_id
                customImage = docker.build(imageName, ".")
            }

            // stage('docker build/push') {
            //     docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
            //     def app = docker.build("emrahyumuk/node-todo:${commit_id}", '.').push()
            // }

            stage('deploy') {
                sh "docker rm my-node-todo-container -f"
                docker.image(imageName).withRun('-p 8000:8000 --link=mongo-container') {c ->
                    sh "curl -i http://${hostIp(c)}:8000/"
                }
            }
   }