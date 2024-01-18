#!/bin/bash

# Fonction pour afficher le menu
show_menu() {
    echo "1) Démarrer Minikube et configurer l'environnement"
    echo "2) Regarder les pods qui s'executent"
    echo "3) Lister les services avec la commande minikube"
    echo "4) Exécuter les tests Curl pour creer un compte utilisateur"
    echo "5) Executer les tests curl pour se connecter "
    echo "6) Executer les tests curl pour creer un produit "
    echo "7) Minikube Dashbord"
    echo "8) Desinstaller Minikube"
    echo "9) Quitter"
    echo -n "Entrez votre choix [1-9]: "
}

# Fonction pour démarrer Minikube et configurer l'environnement
start_minikube() {
    status=$(minikube status --format "{{.Host}}" 2>&1)
    if [[ "$status" == "Stopped" || "$status" == *"not found"* ]]; then
        echo "Démarrage de Minikube..."
    else
        echo "Minikube est déjà en cours d'exécution. Suppression de l'instance existante..."
        minikube delete
    fi
    minikube start --driver docker --static-ip 192.168.49.2
    minikube addons enable ingress
    minikube addons enable metrics-server
    kubectl apply -f ./K8s/namespace
    kubectl apply -f ./K8s/database
    echo "Vérification de l'état du pod MongoDB..."
    while true; do
        mongo_status=$(kubectl get pod -l app=mongo -n grocery -o=jsonpath='{.items[0].status.phase}')
        if [ "$mongo_status" == "Running" ]; then
            echo "Le pod MongoDB est en cours d'exécution."
            break
        else
            echo "En attente que le pod MongoDB soit en cours d'exécution..."
            sleep 10 
        fi
    done
    sleep 10
    echo "Application des configurations pour le backend et le frontend..."
    kubectl apply -f ./K8s/backend/customer/
    kubectl apply -f ./K8s/backend/product/
    kubectl apply -f ./K8s/backend/shopping/
    kubectl apply -f ./K8s/backend/gateway/
    kubectl apply -f ./K8s/frontend/
    echo "Minikube et les services ont été configurés."
    echo "\n"
}

show_pod(){
     echo "Lancement des pods ..."
	kubectl get pods -n grocery 
}
show_minikube_service(){
       echo "Lancement des services ..."
	minikube service list -n grocery
}

show_dashboard(){
   echo "Lancement du dashboard de minikube ..."
      	minikube dashboard
}
reset_minikube(){
    kubectl delete -f ./K8s/backend/customer/
    kubectl delete -f ./K8s/backend/product/
    kubectl delete -f ./K8s/backend/shopping
    kubectl delete -f ./K8s/namespace/
    kubectl delete -f ./K8s/database
    kubectl delete -f ./K8s/frontend
    minikube delete 
}
# Menu principal
while true; do
    show_menu
    read choice
    case $choice in
        1) start_minikube ;;
	2) show_pod ;;
	3) show_minikube_service ;;
        4) ./curltest.sh customer-signup ;;
        5) ./curltest.sh customer-login ;;
        6) ./curltest.sh create-product ;;
	7) show_dashboard ;;
        8) reset_minikube ;;
        9) break ;;
        *) echo "Choix invalide, réessayez." ;;
    esac
done
