const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const { readSync } = require('fs');
const app = express();
const port = 3000;

const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Template engine
app.engine('hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/view'));

route(app);

// app.get('/', (req, res) => res.render('home'))

// app.get('/news', (req, res) => res.render('news'))

// app.get('/search', (req, res) => res.render('search'))

app.listen(
    port,

    () =>
        console.log(`
  
                Example app listening at http://localhost:${port}`),
);
