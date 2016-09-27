var exec = require('child_process').exec;
var gulp = require('gulp');

gulp.task('default', function() {
    console.log("http://huangyijie.com")
});

gulp.task('beforedeploy', ['clonetheme', 'gen'], function() {
    console.log("before deploy done, now start deploy...")
});

gulp.task('clonetheme', function(cb) {
    exec('git clone https://github.com/henryhuang/hexo-theme-aloha.git ./themes/aloha', function(err, stdout, stderr) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
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
