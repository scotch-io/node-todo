#!groovy
import groovy.json.JsonSlurperClassic
def DOCKER_BUILD_SERVER = "unix:///var/run/docker.sock"
def DOCKER_IMAGE_REPOSITORY = "uzzal2k5"
def GIT_REPOSITORY_NAME  = "https://github.com/uzzal2k5/node-todo.git"
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
                credentialsId: 'github_credentials',
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
// def DockerImageBuild( DOCKER_BUILD_SERVER, IMAGE_REPOSITORY, IMAGE_NAME ){
//
//     // DOCKER IMAGE BUILD
//     withDockerServer([uri: "${DOCKER_BUILD_SERVER}"]) {
//         stage('IMAGE BUILD'){
//             todoImages = docker.build("${IMAGE_REPOSITORY}/${IMAGE_NAME}")
//         }

//
//         //PUSH TO REGISTRY
//         stage('PUSH IMAGE'){
//             withDockerRegistry(credentialsId: 'dockerhub_credentials', url: '') {
//                 todoImages.push("${env.BUILD_NUMBER}")
//                 todoImages.push("latest")
//             }
//
//         }
//
//     }
//     return this
// }
// def ScanWithSynk(){
//          snykSecurity(
//              organisation: 'uzzal2k5',
//              projectName: 'uzzal2k5/node-todo',
//              severity: 'medium',
//              snykInstallation: 'snyk-latest',
//              snykTokenId: 'synk_api_token',
//              targetFile: '/Users/uzzal/.jenkins/workspace/synk-project/Dockerfile',
//              failOnIssues: false
//          )
//
//          return this
// }

// BUILD NODE
pipeline {
environment {
    IMAGE_NAME = "node-todo"
   todoImages = ''
   IMAGE_REPOSITORY = "uzzal2k5"
  }

    agent any
    stages {

          stage('GIT CLONE') {
            steps {
                CloneFromGit(GIT_REPOSITORY_NAME, BRANCH)
            }
          }
          stage('IMAGE BUILD'){
             steps {
               script {
                 todoImages = docker.build("${IMAGE_REPOSITORY}/${IMAGE_NAME}")
                 }
             }
          }
          stage('SCAN'){
              steps{
                  script{
                          snykSecurity(
                                       organisation: 'uzzal2k5',
                                       projectName: 'uzzal2k5/node-todo',
                                       severity: 'medium',
                                       snykInstallation: 'snyk-latest',
                                       snykTokenId: 'synk_api_token',
                                       failOnIssues: false
                                   )
                        def variable = sh(
                                      script: 'snyk container test uzzal2k5/node-todo:latest --severity-threshold=medium',
                                      returnStatus: true
                                   )
                                   echo "Error Code = ${variable}"
                                   if (variable !=0){
                                      echo "Alert for Vulnerability Found"
                                   }
                          }
                        }
                  }


    }

//       DockerImageBuild(DOCKER_BUILD_SERVER,DOCKER_IMAGE_REPOSITORY, IMAGE_NAME)



//NODE END
}
