const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
var rename = require("gulp-rename");

const browsersync = require("browser-sync").create();

// sass task
function scssTask() {
  return src("scss/main.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(rename("style.css"))
    .pipe(postcss([cssnano]))
    .pipe(dest("dist", { sourcemaps: "." }));
}

// Browsersync tasks
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch task
function watchTask() {
  watch("*.html", browsersyncReload);
  watch(["scss/**/*.scss"], series(scssTask, browsersyncReload));
}

// default gulp task

exports.default = series(scssTask, browsersyncServe, watchTask);
