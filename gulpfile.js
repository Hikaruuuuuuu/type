var gulp = require('gulp'),
    sass = require('gulp-sass'),
    server = require('gulp-webserver'),
    csso = require('gulp-csso'),
    path = require('path'),
    url = require('url'),
    fs = require('fs'),
    list = require('./src/data/data')
    watch = require('gulp-watch');

gulp.task('sass', function(){
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        // .pipe(csso())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('server', function(){
    return gulp.src('src')
        .pipe(server({
            prot: 8888,
            open: true,
            middleware: function(req, res, next){
                var pathname = url.parse(req.url).pathname;
                if(pathname == '/favicon.ico'){
                    return res.end()
                }

                if(pathname == '/' && req.method == "POST"){
                    var html = "";
                    req.on('data',  function(chunk){
                        html += chunk;
                    })
                    req.on('end', function(){

                        if(html){
                            var params = JSON.parse(html);
                            params.id = list.length+1;
                            params.time = new Date().toLocaleString()
                            list.push(params);
                            fs.writeFileSync("./src/data/data.json",JSON.stringify(list));
                            res.end(JSON.stringify({code:0,msg:"添加成功",data:list}))
                        }else{
                            res.end(JSON.stringify({code:1,msg:"添加失败",data:list}))
                        }
                     
                    })
                   
                }else{
                    pathname = pathname == '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname))) 
                }
            }
        }))
})

gulp.task('watch', function(){
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})

gulp.task('dev', gulp.series('sass', 'server', 'watch'))