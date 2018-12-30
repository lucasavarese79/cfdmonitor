/**
 * CfdController
 *
 * @description :: Server-side logic for managing cfds
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//var imageDiff = require('image-diff');
module.exports = {



hello: function (req, res) {
  
    console.log("hello");

   Cfd.find({
   		sort: 'deltaperc DESC'
   }).then(function (data){
       sails.log("DATA: "+data);
       /*imageDiff({
        actualImage: 'https://www.nasdaq.com/charts/'+_cfd+'_smallrm.jpeg',
        expectedImage: 'images/60smallrm.jpg'
       }, function (err, imagesAreSame) {
          sails.log("IMAGE "+_cfd+": TRUE");
      })*/
   		return res.view('cfd', {
	      			cfds: data
	      			
	      		});

   })
   .catch(function (err){
   	sails.log("ERR: "+err);
    return res.json({

      todo: 'Not implemented yet!'
    });

   })

   


    },

	
};

