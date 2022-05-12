#Création du projet
## Installation

Pour installer le projet, il faut copiez ou importez les dossiers views (pour les pages HTML), javascript (pour le backend) ainsi que les fichiers package et package-lock (ils contiennent la liste des modules et leurs dépendance) et css. Ensuite éxecutez, soit dans le terminal de l'IDE, soit dans le cmd ouvert dans le réportoire, la commmande suivante: 
```powershell
npm i express pg ejs body-parser nodemon socket.io
```
Cette commande va installer les modules express, postgre, nodemon, body-parser et socket.io ainsi que créer le dossier node_modules.

Détail des module:

Ejs: Ce module est un moteur de tamplate, il peut modifier une vue avec les valeur passées en paramètre depuis express (exemple: remplir les lignes d'un tableau avec des données).

Body-parser: Ce module permet de récupérer et de transformer une chaîne de caractère, transmise par le client (navigatteur), en format JSON et vice-versa, dans le cas où la chaîne est dans le format pour le JSON.

pg: Ce module permet de se connecter et de communiquer avec une base de données PostgreSQL. Il permet entre autre d'envoyer des requète SQL et de récupérer les rusaltat au format JSON.

nodemon: Ce module permet de redémarrer le serveur Node.js à chaque modification d'un fichier Javascript (il détecte lorsque l'on sauvegarde ledit fichier)

socket.io: Ce module permet au serveur d'envoyer de lui-même des données au client (exemple d'utilisation: une application de message tchat) et vice-versa. Il écoute si un évenement est émit par le client et agit en conséquence, par exemple envoie une requète SQL au serveur de base de données et renvoie les données au client.

## Paramètrage

Pour paramètrer la connection au serveur de base données, il faut modifier dans les fichiers ConcurrantSocket.js et PartieSocket.js, la const pool.

```javascript
var pool=new Pool({
    user:'postgres',
    host:'localhost',
    database:"easylis",
    password:'P@ssw0rd',
    port:5432
});
```

user: Le nom d'utilisateur pour se connecter à la base de données.

password: Le mot de passe de l'utilisateur.

host: L'adresse IP du serveur de base de données.

database: Le nom de la base de données.

port: Le port d'écoute du serveur de base données. (5432 est le port par défaut)
