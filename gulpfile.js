const gulp = require('gulp');
const rename = require('gulp-rename'); // 重命名插件
const sass = require('gulp-sass');
 
function handleSass() {
  return gulp.src('miniprogram/**/*.scss')            // 读取mp目录下的所有 .scss 文件
    .pipe(sass().on('error', sass.logError)) // 使用 gulp-sass 插件转化
    .pipe(rename({ extname: '.wxss' }))      // 将拓展名修改为 .wxss
    .pipe(gulp.dest('miniprogram'))                   // 导出到 mp 文件夹下
}
 
// watch 文件监听
// ignoreInitial: false，执行 gulp 命令之后立即更新文件
function watch() {
  gulp.watch('miniprogram/**/*.scss', { ignoreInitial: false }, handleSass)
}
 
exports.default = watch