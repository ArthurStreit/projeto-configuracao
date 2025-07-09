pipeline {
  agent any

  environment {
    DOCKER_COMPOSE_CMD = "docker-compose -f docker-compose.yml"
  }

  stages {
    stage('Clonar repositório') {
      steps {
        git 'https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git'
      }
    }

    stage('Build Homologação') {
      steps {
        dir('homologacao') {
          sh 'docker-compose down'
          sh 'docker-compose up --build -d'
        }
      }
    }

    // Se quiser produção:
    // stage('Build Produção') {
    //   steps {
    //     dir('producao') {
    //       sh 'docker-compose down'
    //       sh 'docker-compose up --build -d'
    //     }
    //   }
    // }
  }

  post {
    failure {
      echo '❌ Falha na pipeline!'
    }
    success {
      echo '✅ Pipeline executada com sucesso!'
    }
  }
}