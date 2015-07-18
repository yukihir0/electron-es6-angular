var gulp = require("gulp");
var babel = require("gulp-babel");
var packager = require('electron-packager');

gulp.task("babel", function() {
  return gulp.src("./src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("./app"));
});

gulp.task("copy", ["copy_html", "copy_css"]);

gulp.task("copy_html", function() {
  return gulp.src(["./src/**/*.html"], {base: "src"})
    .pipe(gulp.dest("./app"));
});

gulp.task("copy_css", function() {
  return gulp.src(["./src/**/*.css"], {base: "src"})
    .pipe(gulp.dest("./app"));
});

gulp.task("watch", function() {
  gulp.watch("./src/*.js", ["babel", "copy"])
});

gulp.task('package', ["babel", "copy"], function (done) {
  packager({
    dir: ".",
    name: "electron-es6-angular",
    arch: "x64",
    platform: "darwin",
    out: "release/darwin",
    asar: true,
    version: "0.30.0"
  }, function (err, path) {
    console.log(err);
    done();
  });
});

gulp.task("default", ["babel", "copy"]);
