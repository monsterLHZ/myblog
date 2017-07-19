(function() {
    var id = null;
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
    content.onkeyup = function() {
        var text = content.value;
        if(text){
            var html = marked(text);
        }        
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
        data = { img: data, name: name };
        $.ajax({
            url: '/updateimg/' + name,
            method: 'POST',
            data: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json;charset=utf8'
            },
            success: function() {
                alert("上传成功");

                var text = '\n![这里写图片描述](http://' + window.location.host + '/img/' + name + ') ';
                content.value += text;

                content.onkeyup();
            },
            error: function() {
                alert("上传失败");
            }
        });
    }

    $('#publish').click(function() {
        var title = $('#title').val();
        var des = $('#des').val();
        var type = $('#type').val();
        var textdes = $('#textdes').val();
        var date = new Date().toLocaleDateString();
        var data;
        if (id) {
            data = { id: id, title: title, des: des, type: type, textdes: textdes, date: date };
        } else {
            data = { title: title, des: des, type: type, textdes: textdes, date: date };
        }

        $.ajax({
            url: '/publish',
            method: 'POST',
            data: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json;charset=utf8'
            },
            success: function() {
                alert("上传成功");
            },
            error: function() {
                alert("上传失败");
            }
        });
    });

    (function() {
        var search = window.location.search;
        if (search) {
            id = search.split('=')[1];
            console.log(id);
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    var data = JSON.parse(request.responseText);
                    console.log(data);
                    $('#title').val(data.title);
                    $('#des').val(data.des);
                    $('#type').val(data.type);
                    $('#textdes').val(data.text);
                    if (data.text) {
                        $('#show').html(marked(data.text));
                    }

                    id = data._id;
                }
            };
            request.open("GET", "/blog/" + id);
            request.send();
        }
    })();
})();