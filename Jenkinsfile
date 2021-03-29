pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh "git clone https://github.com/asmabenhabib/cp4480-project.git/"
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
