# 🏨 Exercice Qualiextra Back-End

Cette application est un exercice pour le poste de développeur Back-End chez Qualiextra.

## 🚗 Création d'une API REST CRUD (Create, Read, Update, Delete) avec Node.js, Express.js et Sequelize.

### 🚀 Initialiser le projet

1. Forker le projet sur votre compte Github
2. Cloner le projet sur votre machine
3. Initialiser le projet

### 🧪 Exercice

Nous voudrions avoir une API REST CRUD pour gérer des utilisateurs.  
Chaques utilisateurs a un identifiant unique, un nom, un prénom, un email et un mot de passe.  
Nous voudrions avoir de la sécurité sur les mot de passe, donc les mot de passe doivent être cryptés.  

Une route **/private** est demandé, cette route permettra de vérifier si l'utilisateur est connecté ou non.  
Elle retournera un message: "``Hello ${prenom}``"

### 🛣 Liste des routes

| Method | Route      | Description                            |
| ------ | ---------- | -------------------------------------- |
| GET    | /users     | Récupérer tous les utilisateurs        |
| GET    | /users/:id | Récupérer un utilisateur               |
| POST   | /users     | Créer un utilisateur                   |
| PATCH  | /users/:id | Modifier un utilisateur                |
| DELETE | /users/:id | Supprimer un utilisateur               |
| POST   | /login     | Se connecter                           |
| GET    | /private   | Vérifier si l'utilisateur est connecté |



### Demarer le projet
1. git pull 
2. yarn install
3. créer un .env à la racine du projet
4. Copier le contenu du fichier .env.example
5. Coller le contenu dans le fichier .env
6. remplacer les valeurs de developpement par les valeur de votre base de donnée local
7. Executer la commande: ```yarn run dev```

### Liens documentation swagger
```http://localhost:${port}/docs```
