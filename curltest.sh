#! /bin/bash
curl --header "Content-Type: application/json" --request POST --data '{ "email":"test4@test.com",  "password":"12345", "phone":"12345"}' http://localhost:3501/signup
curl --header "Content-Type: application/json" --request POST --data '{"email":"test4@test.com",  "password":"12345"}' http://localhost:3501/login

