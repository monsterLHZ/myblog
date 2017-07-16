(function() {
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
    // Outputs: <p>I am using <strong>markdown</strong>.</p>
    // Outputs: <p>I am using <strong>markdown</strong>.</p>
    var content = document.querySelectorAll('#textdes')[0];
    var show = document.querySelectorAll('#show')[0];
    console.log(show);
    console.log(content);
    content.onkeyup = function() {
        var text = content.value;
        var html = marked(text);
        show.innerHTML = html;
    }
    var fileInput = document.getElementById('file');
    fileInput.addEventListener('change', function() {
        var file = fileInput.files[0];
        var name = file.name;
        var fd = new FileReader();
        var data = fd.readAsDataURL(file);
        // console.log(data);
        fd.onload = function(e) {
            // console.log(this);
            updateimg(name, this.result);
        }
    })

    function updateimg(name, data) {
        data = { img: data,name:name };
        $.ajax({
            url: '/updateimg/'+name,
            method: 'POST',
            data: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json;charset=utf8'
            },
            success: function() {
                alert("上传成功");
                var text='\n![这里写图片描述](http://127.0.0.1/img/'+name+') ';
                content.value+=text;
                
                content.onkeyup();
            },
            error: function() {
                alert("上传失败");
            }
        });
    }
})();