var exec = require('child_process').exec;
var gulp = require('gulp');

gulp.task('default', function() {
    console.log("http://huangyijie.com")
});

gulp.task('server', function(cb) {
    exec('hexo clean && hexo generate && hexo server', function(err, stdout, stderr) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
})
