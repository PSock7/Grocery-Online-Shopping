#! /bin/bash
#curl --header "Content-Type: application/json" --request POST --data '{ "email":"test4@test.com",  "password":"12345", "phone":"12345"}' http://localhost:3501/signup
customer_url=$(minikube service customer-node-service --url)
modified_url="${customer_url}"

# Assuming you want to use the modified URL in your curl command
curl --header "Content-Type: application/json" --request POST --data '{"email":"test4@test.com",  "password":"12345"}' "$modified_url/login"
