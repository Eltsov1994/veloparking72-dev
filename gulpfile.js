let { src, dest } = require("gulp");
let gulp = require("gulp");
let del = require("del");
let scss = require("gulp-sass");
let autoprefixer = require("gulp-autoprefixer");
let group_media = require("gulp-group-css-media-queries");
let clean_css = require("gulp-clean-css");
let rename = require("gulp-rename");
let fileinclude = require("gulp-file-include");
let uglify = require("gulp-uglify-es").default;
let ttf2woff = require('gulp-ttf2woff');
let ttf2woff2 = require('gulp-ttf2woff2');



let project_folder = 'production/dist';
let source_folder = '#src';

let path = {
   build: {
      css: project_folder + '/css/',
      js: project_folder + '/js/',
      fonts: project_folder + '/fonts/',
      images: project_folder + "/img/",
   },
   src: {
      css: source_folder + '/scss/style.scss',
      js: [source_folder + "/js/app.js", source_folder + "/js/vendors.js"],
      fonts: source_folder + "/fonts/*.ttf",
      images: [source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}", "!**/favicon.*"],
   },
   watch: {
      js: source_folder + "/**/*.js",
      css: source_folder + "/scss/**/*.scss",
      images: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
   },
   clean: "./" + project_folder + "/"
}


function css() {
   return src(path.src.css)
      .pipe(scss({
         outputStyle: "expanded"
      }))
      .pipe(group_media())
      .pipe(autoprefixer({
         grid: true,
         overrideBrowserslist: ["last 5 versions"],
         cascade: true
      }))
      .pipe(dest(path.build.css))
      .pipe(clean_css())
      .pipe(
         rename({
            extname: ".min.css"
         })
      )
      .pipe(dest(path.build.css))
}


function js() {
   return src(path.src.js, {})
      .pipe(fileinclude())
      .pipe(gulp.dest(path.build.js))
      .pipe(uglify(/* options */))
      .pipe(
         rename({
            suffix: ".min",
            extname: ".js"
         })
      )
      .pipe(dest(path.build.js))
}


function fonts() {
   src(path.src.fonts)
      .pipe(ttf2woff())
      .pipe(dest(path.build.fonts));
   return src(path.src.fonts)
      .pipe(ttf2woff2())
      .pipe(dest(path.build.fonts))
}

function images() {
   return src(path.src.images)
      .pipe(dest(path.build.images))
}


function watchFiles() {
   gulp.watch([path.watch.css], css);
   gulp.watch([path.watch.js], js);
   gulp.watch([path.watch.images], images);
}

function clean() {
   return (del(path.clean))
}

let build = gulp.series(clean, gulp.parallel(css, fonts, js, images));
let watch = gulp.parallel(build, watchFiles);

exports.images = images;
exports.js = js;
exports.css = css;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;