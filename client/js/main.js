(function ($) {

    var query =
        'PREFIX dbo:<http://dbpedia.org/ontology/> \
        PREFIX foaf:<http://xmlns.org/foaf/spec/> \
        SELECT * \
        WHERE { \
            ?uri a dbo:Band; \
                foaf:name ?name; \
                dbo:genre ?genre; \
                dbo:abstract ?bio. \
            FILTER(LANG(?bio) = "fr")\
            FILTER(?uri =<http://dbpedia.org/resource/Queens_of_the_Stone_Age>)\
        }';

    function postQuery() {
        $.ajax({
            data: {
                query: query
            },
            dataType: "json",
            url: "http://dbpedia.org/sparql",
            statusCode: {
                400: function (error) {
                    //Whatever you want to do if there's an error.
                    console.error((JSON.stringify(error)));
                }
            },
            success: function (data) {
                // Just show the returned data as an alert
                console.log(data);
                // var content = "";
                // data.results.bindings.forEach(function (t) {
                //     var subj = t.p.value;
                //     var pred = t.r.value;
                //     var obj = t.q.value;
                //     content += "<tr><td>"+subj+"</td><td>"+pred+"</td><td>"+obj+"</td></tr>"
                // });
                // $("#results").html(content);
            }
        });
    }
    postQuery()
})(jQuery);
