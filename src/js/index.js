
function Type(){

    this.init()
}

Type.prototype.init = function(){
    var that = this;
    this.ajax(null, that.drawing)
    this.bindEvent()
    
}

Type.prototype.drawing = function(data){
    var html = "",
         content = document.getElementsByClassName('content')[0];
    data.forEach((file)=>{
        html += `<div class="file">
                    <p>项目种类 : <span>${file.type}</span></p>
                    <p>项目时间 : <span>${file.time}</span></p>
                </div>`
        console.log(file)
    })
    content.innerHTML = html;
}

Type.prototype.bindEvent = function(){

    var that = this,
        btn = document.getElementsByClassName('footer')[0],
        inps = document.getElementsByClassName('inps')[0],  // 输入框
        back = document.getElementsByClassName('back')[0],  //取消
        ok = document.getElementsByClassName('ok')[0],      // 确认
        alert = document.getElementsByClassName('alert')[0];  // 弹出框
        

    btn.onclick = function(){
        alert.style.display = "block";   
    }

    back.onclick = function(){
        alert.style.display = "none";
    }

    ok.onclick = function(){
        var val = inps.value;
        
        if(val){
            that.ajax(JSON.stringify({type: val}), that.drawing)
            alert.style.display = "none";
        }else{
            return
        }        
    }
    

}

Type.prototype.ajax = function(data, ck){
    var xhr = new XMLHttpRequest();
       
        xhr.open('post', '/')
       
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data)

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
                var data = JSON.parse(xhr.responseText).data;
                   
                console.log(xhr.responseText)
                typeof ck === 'function' && ck(data)
            }
        }
}