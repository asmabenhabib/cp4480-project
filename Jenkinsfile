pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                git credentialsId: '5daa4a4c-4723-45cf-9cf0-0898dddbf4e7', url: 'https://github.com/asmabenhabib/cp4480-project.git', branch: 'main'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing....'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}

