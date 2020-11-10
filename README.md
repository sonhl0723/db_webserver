# https://dbprojectourhotel.herokuapp.com/  heroku 연동한 링크입니다. 현재는 sochubert/db_webserver 의 develop branch와 연동되어 있습니다.
#### https://jayprogram.tistory.com/37  //권한 바꾸는거 참고.
----------
## DB서버 추가 하였습니다. 저희 DB접속 방법은
##### 시작 전, npm install mysql --save로 mysql을 설치 해 주세요.
#### 1. mysql -h us-cdbr-east-02.cleardb.com -u b0d7db5a46255f -p
#### 2. e0ba2ce1   (password입력)
#### 3. 정상적으로 접속 됐으면 USE heroku_a9f9515c41ce864; (우리가 쓸 db)
---------------
### DB 정보 정리!
#### Hostname : us-cdbr-east-02.cleardb.com
#### port : 3306
#### username:b0d7db5a46255f
#### password:e0ba2ce1
#### db name : heroku_a9f9515c41ce864
