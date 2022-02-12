const {urlencoded, json, static} = require('express');
const {engine} = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const errorHandler = require('errorhandler');

const routes = require('../routes/index');

module.exports = app => {
    // settings
    app.set('port', process.env.port || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', engine({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers'),
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }));
    app.set('view engine', '.hbs');

    // middlewares
    app.use(morgan('dev'));
    app.use(multer({
        dest: path.join(__dirname, '../public/upload/temp')
    }).single('image'));
    app.use(urlencoded({extended: false}));
    app.use(json());

    // routes
    routes(app);

    // static files
    app.use('/public', static(path.join(__dirname, '../public')));

    // errorhandlers
    if ('development' === app.get('env')) {
        app.use(errorHandler);
    }

    return app;
}