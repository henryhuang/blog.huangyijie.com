var exec = require('child_process').exec;
var gulp = require('gulp');
var yaml = require('js-yaml');
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


function configtheme(cb) {
    var configFilePath = './themes/aloha/_config.yml';

    var c = yaml.safeLoad(fs.readFileSync(configFilePath, 'utf8'));

    c.menu.Cat = {
        name: '五阿哥是一只猫',
        value: 'http://5thcat.lofter.com/',
        icon: 'square',
        target: '_blank'
    };

    var y = yaml.safeDump(c);

    y = y.replace('\'http://5thcat.lofter.com/\'', 'http://5thcat.lofter.com/');

    fs.writeFileSync(configFilePath, y, 'utf8');

    if(cb) {
        cb();
    }
}

gulp.task('configtheme', configtheme);

gulp.task('downloadtheme', function(cb) {

    var options = {
        hostname: 'codeload.github.com',
        port: 443,
        path: '/henryhuang/hexo-theme-aloha/zip/master',
        method: 'GET'
    };

    var file = fs.createWriteStream("./aloha.zip");

    var req = https.request(options, function(res) {
        console.log("statusCode: ", res.statusCode);
        console.log("headers: ", res.headers);
        res.on('data', function(d) {
            file.write(d);
        }).on('end', function() {
            gulp.src('./aloha.zip')
                .pipe(decompress({ strip: 1 }))
                .pipe(gulp.dest('./themes/aloha'));
        });
    });
    req.end();

})

gulp.task('gen', function(cb) {
    exec('hexo clean && hexo generate', function(err, stdout, stderr) {
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
