const newsRouter = require('./news');
const siteRouter = require('./site');
const blogRouter = require('./blog');
const meRouter = require('./me');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/blog', blogRouter);
    app.use('/', siteRouter);
}

module.exports = route;
