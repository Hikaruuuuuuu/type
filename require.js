
function require(){
    if(typeof arguments[0] == 'array' && typeof arrguments[1] == 'function'){
        //
    }else{
        return
    }

}

// 定义模块
function define(){
    function init(){
        console.log('是这样么')
    }

    function shy(){
        console.log('这个时候,只要微笑就好')
    }
    return {
        init : init,
        shy: shy
    }
}

var shy = define()

shy.init()

shy.shy()

