(function() {
	var id=window.location.search.split('=')[1];
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            torender(JSON.parse(request.responseText));
        }
    };
    request.open("GET", "/blog/" + id);
    request.send();
})();
function torender(data){
	var rendererMD = new marked.Renderer();
    marked.setOptions({
        renderer: rendererMD,
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    }); //基本设置
    marked.setOptions({
        highlight: function(code) {
            return hljs.highlightAuto(code).value;
        }
    });
    var content=document.querySelectorAll('.content')[0];
    console.log(content);
    content.innerHTML=marked(data.text);
    document.querySelectorAll('.title')[0].innerHTML=data.title;
     document.querySelectorAll('.des')[0].innerHTML=data.des;
}