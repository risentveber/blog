const Metalsmith     = require('metalsmith');
const timer          = require('./plugins/timer');
const jade           = require('metalsmith-jade');
const layouts        = require('metalsmith-layouts');
const permalinks     = require('metalsmith-permalinks');
const collections    = require('metalsmith-collections');
const uglify         = require('metalsmith-uglify');
const less           = require('metalsmith-less');
const ignore         = require('metalsmith-ignore');
const cleanCss       = require('metalsmith-clean-css');
const code           = require('metalsmith-code-highlight');
const metalsmithInspectFiles = require('metalsmith-inspect-files');

Metalsmith(__dirname)
    .source('./source')
    .metadata({
        title: 'Risent Veber',
        generator: 'Metalsmith',
        url: 'https://risentveber.ru/',
        menuLinks: [
            {title:'О себе', url: '/'},
            {title:'Разработка', url: '/dev/'},
            {title:'Деятельность', url: '/activities/'},
            {title:'Стихи', url: '/verse/'}
        ]
    })
    .destination('./build')
    .clean(true)

    .use(collections({
        dev_posts: {
            pattern: [
                'dev/**',
                '!dev/index.jade'
            ],
            sortBy: 'title'
            // reverse: true
        },
        books_posts: {
            pattern: [
                'books/**',
                '!books/index.jade'
            ],
            sortBy: 'title'
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
    .use(metalsmithInspectFiles())
    .build((err, files) => {
        if (err) { throw err; }

        timer('Build time: ')();
    });
