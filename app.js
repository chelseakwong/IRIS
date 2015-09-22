var express = require('express');
var app = express();
var fs = require('fs');
var cheerio = require('cheerio');
var emails = require('./apis/emails');


app.set('views', './views');


// var stormpathMiddleware = stormpath.init(app, {
//   apiKeyFile: '/Users/robert/.stormpath/apiKey.properties',
//   application: 'https://api.stormpath.com/v1/applications/xxx',
//   secretKey: 'some_long_random_string',
//   expandCustomData: true,
//   enableForgotPassword: true
// });

//app.use(stormpathMiddleware);

app.use(express.static(__dirname + '/public'));

//do get stuff and cheerio rendering in emails
emails.updateEmails(app);

var tid = setInterval(emails.testTimer,1000,"testing...");

app.listen(3000);