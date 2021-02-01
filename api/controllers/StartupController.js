/**
 * StartupController
 *
 * @description :: Server-side logic for managing startups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var cfdController = require('./CfdController');

var request = require("request"),
  cheerio = require("cheerio"),
  //urls = ["http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=" + 02888, "http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=" + 02881];
  urls=["DDD",
"AIG",
"BABA",
"GOOG",
"MO",
"AMZN",
"AXP",
"AMGN",
"AAPL",
"T",
"BIDU",
"BAC",
"BBRY",
"BA",
"CAT",
"CSCO",
"C",
"KO",
"EBAY",
"FB",
"RACE",
"FSLR",
"F",
"GE",
"GM",
"GILD",
"GRPN",
"IBM",
"INTC",
"JNJ",
"JPM",
"MCD",
"MU",
"MSFT",
"NFLX",
"NEM",
"NOK",
"NVDA",
"ORCL",
"PYPL",
"PEP",
"PFE",
"PG",
"SHLD",
"SIRI",
"SNAP",
"SBUX",
"TSLA",
"TWTR",
"DIS",
"YHOO",
"ZNGA"]
;
urls=["aapl"];

  var prefix="https://www.nasdaq.com/symbol/";
  var suffix="/analyst-research";

var temp;

module.exports = {

	call: function (req, res){
		i=0;
		_cfd=urls[0];
		
		var customHeaderRequest = request.defaults({
			headers: {'User-Agent': 'curl'}
	 })
		urls.forEach ((_cfd, i)=>{
			var url_temp=prefix+_cfd+suffix;
			//url_temp="http://localhost:8888/nasdaq/nasdaq.html";
			//url_temp="https://www.google.com";
			//url_temp="https://www.nasdaq.com";
			sails.log("URL:" + url_temp);
			

			//customHeaderRequest(url_temp, function (error, response, body) {  
		    setTimeout(customHeaderRequest,5000*i,url_temp,function (error, response, body) {
				sails.log("error: "+error);
					if (!error) {
					sails.log("START");
			   
					var $ = cheerio.load(body),
				/*	temp= $(".qwidget-dollar").html();
			  	temp2=$(".half-width-wide").html();
			    */
				temp3 = $.html();
				  
				  
				  
					start_cons=temp3.substring(temp3.indexOf("upgrade-downgrade-b__rating-value\">"));
					sails.log("PRE BIGBLOCK: "+start_cons);
					
					var cons=start_cons.substring(0,start_cons.indexOf("</span"));
					
				  var i_temp=null;
				  var delta=null;
				  if (temp!=null){
				  	i_temp=temp.substring(1);
				 	delta=+(cons-i_temp).toFixed(2);	

				  }
				  
					sails.log("URL:" + url_temp+" "+i_temp+" "+cons+" "+delta);
					
					

					
				  Cfd.create({name:_cfd, value:i_temp, consensus:cons, delta:delta, deltaperc: +(delta/i_temp*100).toFixed(2)}).exec(function (err, finn){
					  if (err) { return res.serverError(err); }

					  sails.log('Finn\'s id is:', finn.id);
					  //return res.ok();
					});	
			    	      
			    sails.log("It’s " + temp + " degrees Fahrenheit.");
			  } else {
			    sails.log("We’ve encountered an error: " + error);
			  }
			});
			
		});
		return res.json({
		    todo: 'Not implemented yet!'
		 });

	},


	find: function (req, res) {
	
	    //cfdController.hello(req, res);
	    Cfd.destroy().exec(function (err){
 			if (err) {
    			return res.negotiate(err);
  			}
  			sails.log('Any users named Finn have now been deleted, if there were any.');
  			return module.exports.call(req, res);
  				//return res.ok();
		});
	    /*
	    i=0;
	    for (i=0;i<urls.length;i++)
	    request(urls[i], function (error, response, body) {
		  if (!error) {
		    var $ = cheerio.load(body),
		      temp = $("[data-variable='temperature'] .wx-value").html();
			  
			  temp= $(".qwidget-dollar").html();
			  temp2=$(".half-width-wide").html();
			  temp3=$.html();
			  start_cons=temp3.substring(temp3.indexOf("Consensus</td>"));
			  end_cons=start_cons.substring(0,start_cons.indexOf("</table>"));
			  start_block=end_cons.substring(end_cons.indexOf("<tr>"));
			  end_block=start_block.substring(0,start_block.indexOf("</tr>"));
			  end_block=end_block.replace(new RegExp('<td align="left"></td>', 'g'), '');
			  
			  var cons=end_block.substring(end_block.indexOf('left">')+6,end_block.indexOf("</td"));
			  
			  Cfd.create({name:temp, consensus:cons}).exec(function (err, finn){
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





*/

/*
		temp= $(".qwidget-dollar").html();
			  	temp2=$(".half-width-wide").html();
			    temp3 = $.html();
				  
					start_cons=temp3.substring(temp3.indexOf("Consensus</td>"));
					sails.log("PRE BIGBLOCK: "+start_cons);
					
					end_cons=start_cons.substring(0,start_cons.indexOf("</table>"));
					sails.log("BIGBLOCK: "+end_cons);
					
					start_block=end_cons.substring(end_cons.indexOf("<tr>"));
				  end_block=start_block.substring(0,start_block.indexOf("</tr>"));
					sails.log("INNER BLOCK: "+ end_block);
				  
					end_block=end_block.replace(new RegExp('<td align="left"></td>', 'g'), '');
					sails.log("INNER BLOCK AFTER: "+ end_block);
				  
					var cons=end_block.substring(end_block.indexOf('left">')+6,end_block.indexOf("</td"));
				  var i_temp=null;
				  var delta=null;
				  if (temp!=null){
				  	i_temp=temp.substring(1);
				 	delta=+(cons-i_temp).toFixed(2);	

*/	    
  	},

};

