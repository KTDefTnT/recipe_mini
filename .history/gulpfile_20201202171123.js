const gulp = require('gulp');
const sass = require('gulp-sass');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const tap = require('gulp-tap');
const path = require('path');

const config = require('./build/config');

const hasRmCssFiles = new Set();
gulp.task('sass', () => gulp.src('./src/**/*.{scss,wxss}')
    .pipe(tap((file) => {
        // 当前处理文件的路径
        const filePath = path.dirname(file.path);
        // 当前处理内容
        const content = file.contents.toString();
        // 找到filter的scss，并匹配是否在配置文件中
        content.replace(/@import\s+['|"](.+)['|"];/g, ($1, $2) => {
            const hasFilter = config.cssFilterFiles.filter(item => $2.indexOf(item) > -1);
            // hasFilter > 0表示filter的文件在配置文件中，打包完成后需要删除
            if (hasFilter.length > 0) {
                const rmPath = path.join(filePath, $2);
                // 将src改为dist，.scss改为.wxss，例如：'/xxx/src/scss/const.scss' => '/xxx/dist/scss/const.wxss'
                const filea = rmPath.replace(/src/, 'dist').replace(/\.scss/, '.wxss');
                // 加入待删除列表
                hasRmCssFiles.add(filea);
            }
        });
        console.log('rm', hasRmCssFiles);
    }))
    .pipe(replace(/(@import.+;)/g, ($1, $2) => {
        const hasFilter = config.cssFilterFiles.filter(item => $1.indexOf(item) > -1);
        if (hasFilter.length > 0) {
            return $2;
        }
        return `/** ${$2} **/`;
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(replace(/(\/\*\*\s{0,})(@.+)(\s{0,}\*\*\/)/g, ($1, $2, $3) => $3.replace(/\.scss/g, '.wxss')))
    .pipe(rename({
        extname: '.wxss',
    }))
    .pipe(gulp.dest('./dist')));