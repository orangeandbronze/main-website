// basic gulp package
var gulp = require("gulp");

// for watching sass files
var sass = require("gulp-sass");

// for working on sass globs on the component folder
var sassGlob = require("gulp-sass-glob");

// sourcemaps for to trace which sass file
var sourcemaps = require("gulp-sourcemaps");

// for autoprefixing
var autoprefixer = require("gulp-autoprefixer");

// for live reloading
var browserSync = require("browser-sync").create();

// minifying images
var imagemin = require("gulp-imagemin");

// minifying css
var cssnano = require("gulp-cssnano");

//concatenates any number of CSS and JavaScript files into a single file
var useref = require("gulp-useref");

// minifying JavaScript files
var uglify = require("gulp-uglify");

// caching images when optimizing
var cache = require("gulp-cache");

// cleans dist folder for every build run
var del = require("del");

// runs gulp tasks in specified order
var runSequence = require("run-sequence");

// gulp utility
var gulpIf = require("gulp-if");

var rename = require("gulp-rename");

gulp.task("images", function() {
  return (
    gulp
      .src("_assets/images/**/*.+(png|jpg|jpeg|gif|svg|ico)")
      // Caching images that ran through imagemin
      .pipe(
        cache(
          imagemin({
            interlaced: true
          })
        )
      )
      .pipe(gulp.dest("assets/images"))
  );
});

gulp.task("fonts", function() {
  return gulp
  .src("_assets/fonts/**/*")
  .pipe(gulp.dest("assets/fonts"));
});

gulp.task("sass", function() {
  return gulp
    .src("_assets/scss/**/*.scss")
    .pipe(sourcemaps.init()) // Initialize sourcemap plugin
    .pipe(sassGlob()) // Accepts file globbing
    .pipe(sass()) // Converts Sass
    .pipe(autoprefixer({ browsers: ["last 2 versions"], cascade: false })) // Adds Prefixes for Crossbrowser support
    // .pipe(sourcemaps.write("./maps")) // Writes sourcemap
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("default", function(callback) {
  runSequence("sass", "css", "js", "js2", "fonts", "images", "watch", callback);
});

gulp.task("watch", ["sass"], function() {
  gulp
    .watch("_assets/scss/*.scss", ["sass"]);
  gulp
    .watch("_assets/scss/**/*.scss", ["sass"]);
  gulp
    .watch("assets/css/main.css", ["css"]);
  gulp
     .watch("_assets/js/**/*.js", ["js"]);
  gulp
    .watch("_assets/images/**/*.+(png|jpg|jpeg|gif|svg|ico)", ["images"]);
  gulp
  .watch("_assets/fonts/**/*", ["fonts"]);

});

gulp.task("css", function() {
  return gulp
    .src("assets/css/main.css")
    .pipe(rename("assets/css/main.min.css"))
    .pipe(cssnano())
    .pipe(gulp.dest("./")); 
});

gulp.task("js", function() {
  return gulp
    .src("_assets/js/**/*")
    .pipe(gulp.dest("assets/js"));
});

// gulp.task("maps", function() {
//   return gulp.src("_assets/js/**/*").pipe(gulp.dest("assets/js"));
// });

gulp.task("js2", function() {
  return gulp
    .src("assets/js/main.js")
    .pipe(rename("assets/js/main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./")); 
});

// gulp.task("critical", function() {
//   return gulp
//     .src("dist/css/main.min.css")
//     .pipe(criticalCss())
//     .pipe(gulp.dest("dist/css"));
// });
