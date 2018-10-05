#!groovy
import groovy.json.JsonSlurperClassic
def DOCKER_BUILD_SERVER = "tcp://10.10.10.10:2376"
def DOCKER_IMAGE_REGISTRY = "index.docker.io/uzzal2k5/"
def GIT_REPOSITORY_NAME  = "https://github.com/uzzal2k5/node-todo.git"


def IMAGE_NAME = "node-todo"
def todoImages
def version, revision
def BRANCH = 'master'


//Version & Release Specified Here
def getVersion(def projectJson){
    def slurper = new JsonSlurperClassic()
    project = slurper.parseText(projectJson)
    slurper = null
    return project.version.split('-')[0]
}


// REPOSITORY CLONE FROM GIT
def CloneFromGit( REPOSITORY_NAME,BRANCH ){
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
            withDockerRegistry(url: "${DOCKER_IMAGE_REGISTRY}") {
                todoImages.push("${IMAGE_NAME}:${env.BUILD_NUMBER}")
                todoImages.push("${IMAGE_NAME}:latest")
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

     DockerImageBuild(DOCKER_BUILD_SERVER,DOCKER_IMAGE_REGISTRY, IMAGE_NAME)


//NODE END
}
