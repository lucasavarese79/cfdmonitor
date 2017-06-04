/**
 * StartupController
 *
 * @description :: Server-side logic for managing startups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var cfdController = require('./CfdController');
//var cfd= require('./Cfd');

var request = require("request"),
  cheerio = require("cheerio"),
  urls = ["http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=" + 02888, "http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=" + 02881];
	  
var temp;

module.exports = {



	
	find: function (req, res) {

	    //cfdController.hello(req, res);
	    for (i=0;i<urls.length;i++)
	    request(urls[i], function (error, response, body) {
		  if (!error) {
		    var $ = cheerio.load(body),
		      temp = $("[data-variable='temperature'] .wx-value").html();
			  
			  Cfd.create({name:temp}).exec(function (err, finn){
				  if (err) { return res.serverError(err); }

				  sails.log('Finn\'s id is:', finn.id);
				  //return res.ok();
				});	
		    	      
		    console.log("It’s " + temp + " degrees Fahrenheit.");
		  } else {
		    console.log("We’ve encountered an error: " + error);
		  }
		});

		return res.json({
		    	todo: 'Not implemented yet!'
		    });
	    
  	},

};

