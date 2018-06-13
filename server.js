const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `Requested: ${now}, Method: ${req.method}, Path: ${req.path}`;
    fs.appendFileSync('server.log', log + '\n');
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance In Progress',
        messageText: 'The site is currently under the maintenance. Please check back later'
    });
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',        
        welcomeMessage: 'Welcome to my awesome Website!'
    });
});

app.get('/about', (req, res) => {
    //res.send('<h1>About Page</h1>');
    res.render('about.hbs', {
        pageTitle: 'About Page',        
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill this request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});