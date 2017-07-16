(function() {
    var app = new Vue({
        el: '#app',
        data: {
            list: [],
        },
        created: function() {
        	getlist();
        }
    });

    function getlist() {
        $.get("/getlist", function(data) {
            app.$data.list=data;
        });
    }
})();