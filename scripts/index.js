const path = require('path');
const del = require('del');
const gulp = require('gulp');
const copy = require('gulp-copy');
const inject = require('gulp-inject');
const replace = require('gulp-replace');

const basePath = process.cwd();
const docsDir = path.join(basePath, 'docs/**/*');
const docsSource = path.join(basePath, 'packages/docs/build');
const outDir = path.join(basePath, 'docs/');
const templatePath = path.join(basePath, 'scripts/index.html');
const extensions = ['.js', '.css', '.png', '.jpg', '.gif', '.svg'];

const generateExtsByPath = (path, exts) => {
  const extsArr = exts || extensions;
  return extsArr.map((ext) => `${path}/**/*${ext}`);
};

function CopyFn() {
  return gulp
    .src([...generateExtsByPath(docsSource)])
    .pipe(copy(outDir, { prefix: 3 }));
}

function InjectFn() {
  return gulp
    .src(templatePath)
    .pipe(
      inject(
        gulp.src(generateExtsByPath(outDir, ['.js', '.css']), {
          read: false,
        }),
        {
          removeTags: true,
        }
      )
    )
    .pipe(gulp.dest(outDir));
}

function replaceFn() {
  return gulp
    .src(`${outDir}/index.html`)
    .pipe(replace('/docs', 'https://yuanbingrui.github.io/floating-ball'))
    .pipe(gulp.dest(outDir));
}

(function handle() {
  del([docsDir])
    .then((paths) => {
      console.log('Deleted files and folders:\n', paths.join('\n'));

      gulp.series(CopyFn, InjectFn, replaceFn)();
    })
    .catch((err) => console.log(err.message));
})();
