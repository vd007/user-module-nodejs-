basic user module

INSTALLATION

1. setup node and mongo on the machine
2. clone the repo
3. npm install
4. npm install bluebird


START THE APP

command : npm start

USAGE

1.register the user using get request
http://localhost:3000/users/registration?username=navneet&password=test&name=dwivedi&email=vd@21&dob=1991-07-01&status=married

2.login with username and password
http://localhost:3000/users/login?username=navneet&password=test

3.update user details only username is mandatory
http://localhost:3000/users/update?username=navneet&password=test&name=dwivedi&email=vd@21&dob=1991-07-01&status=unmarried