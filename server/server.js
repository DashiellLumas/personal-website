import express from 'express';
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

export const app = express();

app.set('view engine', 'ejs');

app.use('/', express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
