/**
 * CfdController
 *
 * @description :: Server-side logic for managing cfds
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



hello: function (req, res) {
  
    console.log("hello");
   Cfd.find().then(function (data){
   		sails.log("DATA: "+data);
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

