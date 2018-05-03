(function ($) {

    var query = 'SELECT ?subject ?predicate ?object \
        WHERE {\
         ?subject ?predicate ?object \
        } \
        LIMIT 25';
    // var query =
    //     'PREFIX dbo:<http://dbpedia.org/ontology/> \
    //     PREFIX foaf:<http://xmlns.org/foaf/spec/> \
    //     SELECT * \
    //     WHERE { \
    //         ?uri a dbo:Band; \
    //             foaf:name ?name; \
    //             dbo:genre ?genre; \
    //             dbo:abstract ?bio. \
    //         FILTER(LANG(?bio) = "fr")\
    //         FILTER(?uri =<http://dbpedia.org/resource/Queens_of_the_Stone_Age>)\
    //     }';

    function postQuery() {
        $.ajax({
            data: {
                query: query
            },
            dataType: "json",
            // url: "http://dbpedia.org/sparql",
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
