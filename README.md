# cours-sparql-endpoint
Se connecter à un sparql-endpoint et récupérer les données pour les intégrer dans une page

# Utiliser Fuseki
[Installer](https://docs.docker.com/install/)et/ou lancer le daemon Docker.

Pour lancer le serveur, exécuter la commande
```bash
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

# Les commandes docker-compose
Docker compose permet de lacner une stack de l'arrêter, de la redémarrer ou de la supprimer.
Les commandes sont les suivantes : 

```bash
docker-compose up                       // lance la stack
docker-compose up -d                    // lance la stack en mode "daemon"
docker-compose up -f monfichier.yaml -d // lance la stack en mode "daemon" avec un nom de fichier custom
docker-compose stop                     // arrête la stack
docker-compose restart                  // redémarre la stack
docker-compose rm                       // supprime la stack 
```

# Interroger le triple store depuis un client HTML
Un exemple de client HTML très basique vous est fourni.
Il exécute une requête SPARQL sur le triple store et l'affiche dans un tableau HTML.

Il suffit de lancer la commande :
```bash
open http://localhost
```

Le code qui exécute la requête se trouve dans le fichier `./client/js/main.js`.

```javascript
(function ($) {

    var query = 'SELECT ?subject ?predicate ?object \
        WHERE {\
         ?subject ?predicate ?object \
        } \
        LIMIT 25';

    function postQuery() {
        $.ajax({
            data: {
                query: query
            },
            dataType: "json",
            url: "http://localhost:3030/test/sparql",
            statusCode: {
                400: function (error) {
                    //Whatever you want to do if there's an error.
                    console.error((JSON.stringify(error)));
                }
            },
            success: function (data) {
                // Just show the returned data as an alert
                console.log(data);
                var content = "";
                data.results.bindings.forEach(function (t) {
                    var subj = t.subject.value;
                    var pred = t.predicate.value;
                    var obj = t.object.value;
                    content += "<tr><td>"+subj+"</td><td>"+pred+"</td><td>"+obj+"</td></tr>"
                });
                $("#results").html(content);
            }
        });
    }
    postQuery()
})(jQuery);

```