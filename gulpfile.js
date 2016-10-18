var exec = require('child_process').exec;
var gulp = require('gulp');
var fs = require('fs');
var git = require('gulp-git');
var runSequence = require('run-sequence');
var https = require('https');
var decompress = require('gulp-decompress');

gulp.task('default', function() {
    console.log("http://huangyijie.com")
});

// before deploy
gulp.task('beforedeploy', function(done) {
    runSequence('configtheme', 'gen', function() {
        console.log('beforedeploy done!');
    });
});

function getFileByHttpsAndSave(hostname, path, dist, decompressDist) {

    var options = {
        hostname: hostname,
        port: 443,
        path: path,
        method: 'GET'
    };

    var file = fs.createWriteStream(dist);

    var req = https.request(options, function(res) {
        console.log("statusCode: ", res.statusCode);
        console.log("headers: ", res.headers);
        res.on('data', function(d) {
            file.write(d);
        }).on('end', function() {

            if(decompressDist) {
                gulp.src(dist)
                .pipe(decompress({ strip: 1 }))
                .pipe(gulp.dest(decompressDist));
            }
            
        });
    });
    req.end();

}

var menuTask = require('./gulp/tasks/menu');
gulp.task('configtheme', menuTask);

gulp.task('downloadtheme', function(cb) {

    getFileByHttpsAndSave(
        'codeload.github.com', 
        '/henryhuang/hexo-theme-aloha/zip/master', 
        './aloha.zip', 
        './themes/aloha'
    );

})

gulp.task('changeavatar', function () {
    fs.unlinkSync('./themes/aloha/source/images/avatar.jpg');
    console.log('remove ./themes/aloha/source/images/avatar.jpg done!');
    getFileByHttpsAndSave(
        'www.gravatar.com', 
        '/avatar/4e0e61fdf1b2bcfb4ee31da27601fe6b.jpg?s=300', 
        './themes/aloha/source/images/avatar.jpg'
    );
})

gulp.task('gen', function(cb) {
    exec('hexo clean && hexo generate && hexo algolia', function(err, stdout, stderr) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
})


gulp.task('server', function(cb) {
    exec('hexo clean && hexo generate && hexo server', function(err, stdout, stderr) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
})

