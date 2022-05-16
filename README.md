# Création du projet
## Installation

Pour installer le projet, il faut copiez ou importez les dossiers views (pour les pages HTML), javascript (pour le backend) ainsi que les fichiers package et package-lock (ils contiennent la liste des modules et leurs dépendance) et css. Ensuite éxecutez, soit dans le terminal de l'IDE, soit dans le cmd ouvert dans le réportoire, la commmande suivante: 
```powershell
npm i express pg ejs body-parser nodemon socket.io
```
Cette commande va installer les modules express, postgre, nodemon, body-parser et socket.io ainsi que créer le dossier node_modules.

Détail des modules:

Ejs: Ce module est un moteur de tamplate, il peut modifier une vue avec les valeur passées en paramètre depuis express (exemple: remplir les lignes d'un tableau avec des données).

Body-parser: Ce module permet de récupérer et de transformer une chaîne de caractère, transmise par le client (navigatteur), en format JSON et vice-versa, dans le cas où la chaîne est dans le bon format pour le JSON. Il permet aussi de récupérer les valeurs des inputs du clients.

pg: Ce module permet de se connecter et de communiquer avec une base de données PostgreSQL. Il permet entre autre d'envoyer des requète SQL et de récupérer les résultats au format JSON.

nodemon: Ce module permet de redémarrer le serveur Node.js à chaque modification d'un fichier Javascript (il détecte lorsque l'on sauvegarde ledit fichier)

socket.io: Ce module permet au serveur d'envoyer de lui-même des données au client (exemple d'utilisation: une application de message tchat) et vice-versa. Il écoute si un évenement est émit par le client et agit en conséquence, par exemple envoie une requète SQL au serveur de base de données et renvoie les données au client.

## Paramètrage

Pour paramètrer la connection au serveur de base données, il faut modifier dans les fichiers concurrantSocket.js et partieSocket.js, la variable pool.

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

port: Le port d'écoute du serveur de base données. (Le port par défaut est 5432)

# Utilisation



## Utilisation générale

L'utilisation générale est similaire pour les parties et les concurrents.

Lorsqu'un utilisateur modifie la base de donnée (ajoute, modifie ou supprime une entrée), une notification est envoyée à tous les utilisateurs sauf celui qui a modifié la base (boule rouge dans la bouton "Ouvrir les notifications").

Pour celui qui a fait l'action, celle-ci est répercutée dans le tableau (Ajoute une ligne, modifie les colonne ou supprime une ligne) est ajoutera et/ou augmentera la bulle des notification dans le bouton "Ouvrir les notification" des autres utilisateurs.

Pour les autres utilisateurs, ils doivront ouvrir le panneau des notification (Panneau à gauche de l'image) grâce au bouton "Ovrir les notifications". A l'interieur de celui-ci, une notification apparaîtra à chaque action des autres utilisateurs. Pour supprimer ces notifications, les utilisateurs qui n'ont pas fait d'action devront cliquer sur le bouton "Rafraîchir", une fois le panneau des notifications ouvert. Cette action fera les modifications nécessaires, ajouter, modifier ou supprimer unhe ou plusieurs ligne(s) du tableau ainsi que supprimer la bulle des notification dans le bouton "Ouvrir les notification".

Pour fermer le panneau, les utilisateurs pourront cliquer sur la croix à droite dans le panneau ou cliquer sur le bouton "Ouvrir les notifications".

*Ecran des autres utilisateurs*
![alt text](https://github.com/PoseidonjGaming/easylisTest/blob/1c20a2966e1b5beb9d365b6b2e6cf45f6c1f9a4c/documentation/tableau.png?raw=true)

## Partie

### Ajout

Pour ajouter une partie, les utilisateurs devront cliquer sur le bouton "Ajouter". Une pop-up (fenêtre qui s'ouvre automatiquement suite à une action) s'affichera alors et les utiliseurs devront sélectionner les 2 adversaires dans la liste correspondante puis ils devront cliquer sur le bouton "Valider" pour ajouter une partie

*pop-up d'ajout*
![alt text](https://github.com/PoseidonjGaming/easylisTest/blob/2df4aae66014a5a08cd7b1629b913178c633e861/documentation/modal%20partie.png?raw=true)


### Modification

Pour modifier une partie, les utilisateurs devront cliquer sur le bouton "Modifier" sur la ligne correspondant à la partie qu'ils veulent modifier. Une pop-up s'affichera alors avec les adversaires courants préselectionnés et les utiliseurs devront sélectionner les 2 adversaires dans la liste correspondante puis ils devront cliquer sur le bouton "Valider" pour modifier la partie.


*pop-up de modification*
![alt text](https://github.com/PoseidonjGaming/easylisTest/blob/2df4aae66014a5a08cd7b1629b913178c633e861/documentation/modal%20partie%20modif.png?raw=true)

### Suppression

Pour supprimer une partie, les utilisateurs devront cliquer sur le bouton "Supprimer" sur la la ligne correspondant à la partie qu'ils veulent supprimer. Une pop-up s'affichera alors puis cliquer sur le bouton "Oui" pour supprimer la partie.


*pop-up de suppression*
![alt text](https://github.com/PoseidonjGaming/easylisTest/blob/b0e35e5ecdd1ad0cbc6459807e7e159c43952fed/documentation/modal%20partie%20sup.png?raw=true)

#### Suppression de plusieurs parties

Pour supprimer plusieurs parties , les utilissateurs devront cliquer sur les cases correspondant aux parties qu'ils veulent supprimer. Puis ils devront cliquer sur le bonton "Supprimer plusieurs parties", dans le tableau. Enfin pour supprimer de façon effective les parties, les utilisateurs devront cliquer sur le bouton "Oui"

*pop-up de suppression de plusieurs parties*
![alt text](https://github.com/PoseidonjGaming/easylisTest/blob/1fad923b3b21dbb551cdd9b046b6559123541317/documentation/modal%20supp%20all%20partie.png?raw=true)

## Concurrent

### Ajout

Pour ajouter un concurrent, les utilisateurs devront cliquer sur le bouton "Ajouter". Une pop-up s'affichera alors et les utiliseurs devront remplir les champs nom et prénom puis ils devront cliquer sur le bouton "Valider" pour ajouter un concurrent

*pop-up d'ajout*
![alt text](https://github.com/PoseidonjGaming/easylisTest/blob/2df4aae66014a5a08cd7b1629b913178c633e861/documentation/modal%20concurrant.png?raw=true)


### Modification

Pour modifier un concurrent, les utilisateurs devront cliquer sur le bouton "Modifier" sur la ligne correspondant au concurrent qu'ils veulent modifier. Une pop-up s'affichera alors avec les champs nom et prénom courants préremplies et les utiliseurs devront remplir les champs avec les nom et prénom de leur choix puis ils devront cliquer sur le bouton "Valider" pour modifier le concurrent.


*pop-up de modification*
![alt text](https://github.com/PoseidonjGaming/easylisTest/blob/2df4aae66014a5a08cd7b1629b913178c633e861/documentation/modal%20concurrant%20modif.png?raw=true)

### Suppression

Pour supprimer un concurrent, les utilisateurs devront cliquer sur le bouton "Supprimer" sur la la ligne correspondant au concurrent qu'ils veulent supprimer. Une pop-up s'affichera alors puis cliquer sur le bouton "Oui" pour supprimer le concurrent.


*pop-up de suppression*
![alt text](https://github.com/PoseidonjGaming/easylisTest/blob/b0e35e5ecdd1ad0cbc6459807e7e159c43952fed/documentation/modal%20partie%20sup.png?raw=true)


#### Suppression de plusieurs parties

Pour supprimer plusieurs concurrents, les utilissateurs devront cliquer sur les cases correspondant aux concurrents qu'ils veulent supprimer. Puis ils devront cliquer sur le bonton "Supprimer plusieurs concurrents", dans le tableau. Enfin pour supprimer de façon effective les concurrents, les utilisateurs devront cliquer sur le bouton "Oui"

*pop-up de suppression de plusieurs concurrents*
![alt text](https://github.com/PoseidonjGaming/easylisTest/blob/46cfecef765fea0a105dc7b96c9c22e6f77710e5/documentation/modal%20concurrants%20sup.png?raw=true)
