//cheerio setup
var express = require('express');
var fs = require('fs');
var cheerio = require('cheerio');

//Context.io API setup
var ContextIO = require('contextio');
var ctxioClient = new ContextIO.Client({
	//commented out for confidentiality
	});

exports.testTimer = function(string){
	console.log(string);
}

exports.updateEmails = function(app){
	var $ = cheerio.load(fs.readFileSync('../PD App/index.html'));
	app.get('/', function(req, res) {
		console.log("rendering in update emails")
	//res.sendFile("/Users/chelseakwong/GitHub/PD App/index.html");
		makeAPICall(function(result){
			//adding email info the html via cheerio
			var htmlString = "";
			var limit;
			if (result.length >= 6) limit = 6;
			else limit = result.length;
			
			for (var i = 0; i<limit; i++){
				var tot = "";
				var deet = result[i];
				var sendStr = "<dt>"+deet.from+"</dt>";
				var titleStr = "<dl>"+deet.title+"</dl>";
				tot += (sendStr + titleStr);
				htmlString = htmlString.concat(tot);
			}
			if (result.length >=6){
				var add = "<dl>"+"...and "+(result.length-8)+" more</dl>";
				htmlString = htmlString.concat(add);
			}
			var newEmails = $(htmlString);
			$('.emaillist').append(htmlString);
			res.send($.html());
		})
	});
}

function makeAPICall(fn){
	var result = [];
	ctxioClient.accounts("55d79f3b14aea124088b4567").messages().get({folder:"INBOX"},function (err, response) {
   		if (err) throw err;
   		//resposne = response
   		for (i = 0; i< response.body.length; i++){
   			var obj = {};
   			var email = response.body[i];
   			obj.title = email.subject;
   			if (email.addresses.from.name == undefined){
   				obj.from = email.addresses.from.email;
   			}
   			else{
   				obj.from = email.addresses.from.name;
   			}
   			result.push(obj);
   		}
   		fn(result)
	});
}