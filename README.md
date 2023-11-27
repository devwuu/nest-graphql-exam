
### 실행 방법
1. 프로젝트 clone
2. 프로젝트 폴더로 이동
3. cli에서 npm install 실행
4. docker desktop 애플리케이션 다운로드 후 실행
5. cli에서 docker-compose up -d 실행
6. cli에서 npm run start:dev 실행
7. 크롬에서 http://localhost:4000/graphql 접속

### 스크립트 예시
```console
 ✘ dev 🌈   ~/Desktop/workspace/graphql-exam 
 git clone https://github.com/devwuu/grapql-task.git

 dev 🌈   ~/Desktop/workspace/graphql-exam 
 cd grapql-task

 dev 🌈   ~/Desktop/workspace/graphql-exam/grapql-task   feature/find-completed-survey 
 npm install

 dev 🌈   ~/Desktop/workspace/graphql-exam/grapql-task   feature/find-completed-survey 
 docker-compose up -d
[+] Running 2/2
 ✔ Network grapql-task_default  Created                                                                                                                    0.0s
 ✔ Container maumlab-db         Started

 dev 🌈   ~/Desktop/workspace/graphql-exam/grapql-task   feature/find-completed-survey 
 npm run start:dev

```