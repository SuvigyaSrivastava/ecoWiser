const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const authRoutes = require('./server/routes/auth');
const mongoose = require('./server/models/database');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

const routes = require('./server/routes/recipeRoutes.js')
app.use('/', routes);

app.listen(port, ()=> console.log(`Listening to port ${port}`));