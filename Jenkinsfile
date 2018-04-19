// Docker variables
docker_registry = "https://mccRegistry.azurecr.io"
docker_registry_tag = "mccRegistry.azurecr.io"
image_name = "azure-vote-front"
image_tag = ''

promote = false

def stageHeader() {
    // Logs out a header for easier reading in console
    echo "[$componentName-log]  ------------------------------------------------"
    echo "[$componentName-log]  Start Stage: $componentName"
    echo "[$componentName-log]  ------------------------------------------------"
}

if(env.BUILD_TAG.contains('PR-') || env.BRANCH_NAME == "master" || env.BRANCH_NAME == "dev"){
timeout(10) {
    node("docker") {

        withEnv(["PATH+NODE=${tool name: 'node6', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) { 

            if (env.BRANCH_NAME == "dev") {
                promote = true
                build = "dev"
                image_tag = "dev-${env.BUILD_ID}"
            } else if (env.BRANCH_NAME == "master") {
                promote = true
                build = "master"
                image_tag = "prod-${env.BUILD_ID}"
            } else {
                build = "sandbox"
                image_tag = "${env.CHANGE_ID}-${env.BUILD_ID}"
            }

        try {
            componentName = 'Notify'
            stageHeader()
            stage(componentName) {
                //util.notifyTeams('buildStart')
            } 

            componentName = 'Check out the branch'
            stageHeader()
            stage(componentName) {
                checkout scm 
            }

            componentName = 'Check Environment'
            stageHeader()
            stage(componentName) {
                sh 'whoami'
                sh 'echo $PATH'
                sh "echo $env.BUILD_TAG"
                sh "printenv"

            }

            componentName = 'Docker Build and Push'
            stageHeader()
            stage(componentName) {
                azureCLI commands: [[exportVariablesString: '', script: "az group list"]], principalCredentialId: 'AzureServicePrincipal'

                // reusing username/password creds from converse registry
                docker.withRegistry("$docker_registry", 'converse_registry') {
                    def customImage = docker.build("$image_name:$image_tag", "./azure-vote")

                    if(promote) {
                        // pushes to the azure repo with the label 'latest'
                        customImage.push('latest')
                    }
                    else {
                        customImage.push()
                    }
                }
                
            }
        } catch(err) {
            echo "$err"
            // util.notifyTeams('buildFailure')

            throw err

            } finally {
                // deletes any image with the name 
                sh "docker rmi -f \$(docker images -f reference=$image_name -q)"
            }
        }
    }
}
} else {
    node {
        componentName = 'Not building branch, please open PR'
        stageHeader()
        stage(componentName) {
            sh 'echo Not building branch, please open PR'
        }
    }
}

