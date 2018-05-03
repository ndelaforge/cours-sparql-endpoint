# cours-sparql-endpoint
Se connecter à un sparql-endpoint et récupérer les données pour les intégrer dans une page

# Utiliser Fuseki
[Installer](https://docs.docker.com/install/)et/ou lancer le daemon Docker.

Pour lancer le serveur, exécuter la commande
```
cd path/to/this/repo
docker-compose up -d
open http://localhost:3030
```

Fuseki demande une authentification, les identifiants sont `admin/pw123`.

Créer un [dataset](http://localhost:3030/manage.html), appelez le `test` par exemple.
Choisir un stockage `persistent`, la base de données du serveur est stockée dans `./data/fuseki` par défaut.
Un dataset `in-memory` sera supprimé dès que le conteneur sera stoppé.

Avec le bouton `upload data`, charger les données de test contenues dans le répertoire `./rdf` et `./rdf/gemet`. Cliquer sur `upload all`.


Dans l'onglet `query`, cliquez sur l'exemple de requête `Selection of triples`.
Vous devriez avoir une liste de 25 résultats.

# Interroger le triple store depuis un client HTML
Un exemple de client HTML très basique vous est fourni.
Il exécute une requête SPARQL sur le triple store et l'affiche dans un tableau HTML.

Il suffit de lancer la commande :
```
open ./client/index.html
```