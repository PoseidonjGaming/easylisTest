# Création du projet
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

# Utilisation

## Utilisation générale

La procédure d'utilisation générale est similaire pour les parties et les concurrants.

Lorsqu'un utilisateur modifie la base de donnée,ajoute modifie ou supprime une entrée, une notification est envoyée à tous les utilisateurs sauf celui qui a modifié la base (boule rouge dans la bouton "Ouvrir les notification").

Pour celui qui a fait l'action, celle-ci est répercutée dans le tableau (Ajoute une ligne, modifie les colonne ou supprime une ligne) est ajoutera et/ou augmentera la bulle des notification dans le bouton "Ouvrir les notification" des autres utilisateurs.

Pour les autres utilisateurs, ils doivront ouvrir le panneau des notification (Panneau à gauche de l'image) grâce au bouton "Ovrir les notification". A l'interieur de celui-ci, une notification apparaîtra à chaque action des utilisateurs. Pour supprimer ces notifications, les utilisateurs qui n'ont pas fait d'action devront cliquer sur le bouton "Rafraîchir", une fois le panneau des notification ouvert. Cette action fera les modifications nécessaires, ajouter, modifier ou supprimer des ligne du tableau ainsi que supprimer la bulle des notification dans le bouton "Ouvrir les notification".

Pour fermer le panneau, les utilisateurs pourront cliquer sur croix à droite dans le panneau.

*Ecran des autres utilisateurs*
![alt text](https://github.com/PoseidonjGaming/easylisTest/blob/367de0a017162d5b0dd707a8fdd18234d29f53a1/documentation/tableau.png)


## Partie

### Ajout

Pour ajouter une partie, les utilisateurs devront cliquer sur le bouton "Ajouter". Une pop-up (fenêtre qui s'ouvre automatiquement suite à une action) s'affichera alors et les utiliseurs devront sélectionner les 2 adversaires dans la liste correspondante puis ils devront cliquer sur le bouton "Valider" pour ajouter une partie

*pop-up d'ajout*
![alt text](https://github.com/PoseidonjGaming/easylisTest/blob/8602e2ca214daa38f5895bf5f0808d0ab4d96a6e/documentation/modal%20partie.png?raw=true)


### Modification

Pour modifier une partie, les utilisateurs devront cliquer sur le bouton "Modifier" sur la ligne correspondant à la partie qu'ils veulent modifier. Une pop-up s'affichera alors avec les adversaires courants préselectionnés et les utiliseurs devront sélectionner les 2 adversaires dans la liste correspondante puis ils devront cliquer sur le bouton "Valider" pour modifier la partie.


*pop-up de modification*
![alt text](https://github.com/PoseidonjGaming/easylisTest/blob/e457f8262b09c972de3d25543a7941a77d86debd/documentation/modal%20partie%20modif.png?raw=true)

### Suppression

Pour supprimer une partie, les utilisateurs devront cliquer sur le bouton "Supprimer" sur la la ligne correspondant à la partie qu'ils veulent supprimer. Une pop-up s'affichera alors puis cliquer sur le bouton "Oui" pour supprimer la partie.


*pop-up de suppression*
![alt text](https://github.com/PoseidonjGaming/easylisTest/blob/b0e35e5ecdd1ad0cbc6459807e7e159c43952fed/documentation/modal%20partie%20sup.png?raw=true)

## Concurrant

### Ajout

Pour ajouter un concurrant, les utilisateurs devront cliquer sur le bouton "Ajouter". Une pop-up (fenêtre qui s'ouvre automatiquement suite à une action) s'affichera alors et les utiliseurs devront remplir les champs nom et prénom puis ils devront cliquer sur le bouton "Valider" pour ajouter un concurrant

*pop-up d'ajout*
![alt text](https://github.com/PoseidonjGaming/easylisTest/blob/f56def5aae9cec468aa1d2b5c0569563cf22a342/documentation/modal%20concurrant.png?raw=true)


### Modification

Pour modifier un concurrant, les utilisateurs devront cliquer sur le bouton "Modifier" sur la ligne correspondant au concurrant qu'ils veulent modifier. Une pop-up s'affichera alors avec les champs nom et prénom courants préremplies et les utiliseurs devront remplir les champs avec les nom et prénom de leur choix puis ils devront cliquer sur le bouton "Valider" pour modifier le concurrant.


*pop-up de modification*
![alt text](https://github.com/PoseidonjGaming/easylisTest/blob/11e628e43ed4fa89da0c3af3fa1a4c472e62d6b1/documentation/modal%20concurrant%20modif.png?raw=true)

### Suppression

Pour supprimer un concurrant, les utilisateurs devront cliquer sur le bouton "Supprimer" sur la la ligne correspondant au concurrant qu'ils veulent supprimer. Une pop-up s'affichera alors puis cliquer sur le bouton "Oui" pour supprimer la partie.


*pop-up de suppression*
![alt text](https://github.com/PoseidonjGaming/easylisTest/blob/b0e35e5ecdd1ad0cbc6459807e7e159c43952fed/documentation/modal%20partie%20sup.png?raw=true)

