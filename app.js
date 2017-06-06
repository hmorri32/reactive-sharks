const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const index        = require('./routes/index');
const users        = require('./routes/users');
const app          = module.exports = express();

app.set('port', process.env.PORT || 3001);

app.use(favicon(path.join(__dirname, 'client/public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, 'client/build')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/', index);

app.listen(app.get('port'), () => {
/* eslint-disable no-console */
  console.log(`It's ultra chill at ${app.get('port')}`);
});

module.exports = app;
