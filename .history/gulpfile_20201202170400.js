const gulp = require('gulp')
const rename = require('gulp-rename')
const sass = require('gulp-sass')

// 嵌套输出方式 nested
// 展开输出方式 expanded 
// 紧凑输出方式 compact 
// 压缩输出方式 compressed
taskSass = ()  => {
  console.log("sass buld")

}
gulp.task("sass", () => {
  // 记得return，否者会卡在这个地方，无法执行下一次监听的回调
  return gulp.src("./miniprogram/**/*.scss",{"base": ''})
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(rename({
    // dirname: "main/text/ciao",
    // basename: "aloha",
    // prefix: "bonjour-",
    // suffix: "-hola",
    extname: ".wxss"
  }))
  .pipe(gulp.dest('miniprogram'))
})

gulp.task('default', ['wxml', 'sass', 'json', 'js', "image"], function() {
  gulp.watch("./miniprogram/**/*.scss",  gulp.parallel("sass"))
  // gulp.watch('./app/**/*.scss', ['sass'])
  // gulp.watch('./app/**/*.json', ['json'])
  // gulp.watch('./app/**/*.js', ['js'])
});
// gulp.task('watch',function(){
//     gulp.watch("./miniprogram/**/*.scss",  gulp.parallel("sass"))
// });