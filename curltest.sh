#! /bin/bash
#curl --header "Content-Type: application/json" --request POST --data '{ "email":"test4@test.com",  "password":"12345", "phone":"12345"}' http://localhost:3501/signup
customer_url=$(minikube service customer-node-service --url)
modified_url="${customer_url}"

# Assuming you want to use the modified URL in your curl command
curl --header "Content-Type: application/json" --request POST --data '{"email":"test4@test.com",  "password":"12345"}' "$modified_url/login"
curl --header "Content-Type: application/json" --request POST --data '{\n    "name":"Broccoli",\n    "desc":"great Quality of Broccoli",\n    "type":"VEGETABLE",\n    "banner":"data:image/jpeg;base64,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",\n    "unit":2,\n    "price":320, \n    "available":true,\n    "suplier":"Golden seed firming"\n}'  http://192.168.49.2:31282/product/create