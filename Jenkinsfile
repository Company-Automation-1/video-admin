pipeline {
    agent any

    options {
        buildDiscarder(logRotator(
            numToKeepStr: '10',
            daysToKeepStr: '7',
            artifactNumToKeepStr: '5'
        ))
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        IMAGE_NAME = 'video-admin'
        APP_NAME = 'video-admin'
    }

    stages {

        stage('Checkout') {
            steps {
                deleteDir() // 删除工作空间
                checkout scm // 检出代码
            }
        }
        stage('Build') {
            steps {
                script {
                    // 使用 Jenkins 已配置的 Node 工具（Manage Jenkins → Global Tool Configuration）
                    def nodeHome = tool 'NodeJS-22'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                    sh 'npm ci && npm run build'
                }
            }
        }

        stage('Docker') {
            steps {
                script {
                    // Jenkins 内置函数，检查文件或目录是否存在
                    if (!fileExists('dist')) {
                        error('构建失败：dist 目录不存在')
                    }
                    // sh 'test -d dist || exit 1' // Linux 检查dist目录是否存在
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    export IMAGE=${IMAGE_NAME}:latest
                    export APP_NAME=${APP_NAME}
                    docker compose down || true
                    docker compose up -d
                    docker image prune -f >/dev/null 2>&1 || true
                """
            }
        }

        stage('Health Check') {
            steps {
                sh """
                    sleep 5
                    docker exec ${APP_NAME} curl -sf http://localhost:82/health | grep -q ok || exit 1
                """
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "✅ 构建成功！镜像: ${IMAGE_NAME}:latest"
        }
        failure {
            echo "❌ 构建失败！"
        }
    }
}