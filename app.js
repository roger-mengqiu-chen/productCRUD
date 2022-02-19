const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const productRouter = require('./route/product');

app.use(bodyParser.urlencoded( { extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(productRouter);

sequelize
.sync()
.then(res => {
  app.listen(3000);
})
.catch (err => {
  console.log(err);
})