(function ($) {

    function postQuery() {
        $.ajax({
            data: {
                query: "SELECT * WHERE { ?p ?r ?q } LIMIT 10"
            },
            dataType: "json",
            url: "http://localhost:3030/test/query",
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
                    var subj = t.p.value;
                    var pred = t.r.value;
                    var obj = t.q.value;
                    content += "<tr><td>"+subj+"</td><td>"+pred+"</td><td>"+obj+"</td></tr>"
                });
                $("#results").html(content);
            }
        });
    }
    postQuery()
})(jQuery);
