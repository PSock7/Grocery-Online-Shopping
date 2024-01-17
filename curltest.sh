#! /bin/bash
if [ "$1" == "customer-login" ]; then
    customer_url=$(minikube service customer-node-service --url -n grocery)
    curl --header "Content-Type: application/json" --request POST --data '{"email":"test4@test.com",  "password":"12345"}' "$customer_url/login"
fi

if [ "$1" == "customer-signup"]; then
    customer_url=$(minikube service customer-node-service --url -n grocery)
    curl --header "Content-Type: application/json" --request POST --data '{ "email":"test4@test.com",  "password":"12345", "phone":"12345"}' "$customer_url/signup"

if [ "$1" == "create-product" ]; then
    product_url=$(minikube service product-node-service --url -n grocery)
    curl --header "Content-Type: application/json" \
         --request POST \
         --data '{"name":"Broccoli","desc":"great Quality of Broccoli","type":"VEGETABLE","unit":2,"price":320,"available":true,"supplier":"Golden seed firming"}' \
         "$product_url/product/create"
fi
