const Metalsmith     = require('metalsmith');
const timer          = require('./plugins/timer');
const printFilesTree = require('./plugins/printFilesTree');
const jade           = require('metalsmith-jade');
const layouts        = require('metalsmith-layouts');
const permalinks     = require('metalsmith-permalinks');
const collections    = require('metalsmith-collections');
const uglify         = require('metalsmith-uglify');
const less           = require('metalsmith-less');
const ignore         = require('metalsmith-ignore');
const cleanCss       = require('metalsmith-clean-css');
const code           = require('metalsmith-code-highlight');

Metalsmith(__dirname)
    .source('./source')
    .metadata({
        title: 'Risent Veber',
        generator: 'Metalsmith',
        url: 'https://risentveber.ru/',

    })
    .destination('./build')
    .clean(true)

    .use(collections({
        articles: {
            pattern: [
                'dev/**',
                '!dev/index.jade'
            ]
            // sortBy: 'date',
            // reverse: true
        },
    }))

    .use(jade({
        useMetadata: true
    }))
    .use(permalinks({
        relative: false
    }))
    //.use(include())
    .use(layouts({
        engine: 'jade',
        default: 'index.jade',
        pattern: '**/*.html'
    }))
    .use(code({
        useBR: true
    }))
    .use(less())
    .use(cleanCss())
    .use(uglify())
    .use(ignore([
        '**/*.less'
    ]))
    .build((err, files) => {
        if (err) { throw err; }

        process.stdout.write('\x1b[1m');
        printFilesTree(files);
        process.stdout.write('\x1b[0m');
        timer('Build time: ')();
    });
