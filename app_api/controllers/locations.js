var mongoose = require('mongoose');
var Loc = mongoose.model('Location');



var theEarth = (function(){
    var earthRadius = 6371;

    var getDistanceFromRads = function(rads){
     return parseFloat(rads * earthRadius);
    };

    var getRadsFromDistance = function(distance){
     return parseFloat(distance / earthRadius);
    };
    return {
     getDistanceFromRads : getDistanceFromRads,
     getRadsFromDistance : getRadsFromDistance
    };
})();

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
 };


module.exports.locationsCreate = function(req, res){
    Loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(","),
        coords:[parseFloat(req.body.lng), parseFloat(req.body.lat)],
        openingTimes: [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1
        },{
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body.closed2
        }]
    }, function(err, location){
        if(err){
            sendJsonResponse(res, 404, err);
        }
        else {
            sendJsonResponse(res, 201, location);
        }
    });
  
};


//Wel trial

module.exports.locationsListByDistance = function(req, res) {
    console.log('locationsListByDistance:');
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var maxDistance = 20;
    var point = {
      type: "Point",
      coordinates: [lng, lat]
    };
    console.log('point: ' + point)
    var geoOptions = {
      spherical: true,
      maxDistance: theEarth.getRadsFromDistance(maxDistance),
      num: 10
    };
    console.log('geoOptions: ' + geoOptions);
    if ((!lng && lng!==0) || (!lat && lat!==0) || ! maxDistance) {
      console.log('locationsListByDistance missing params');
      sendJsonResponse(res, 404, {
        "message": "lng, lat and maxDistance query parameters are all required"
      });
      return;
    } else {
      console.log('locationsListByDistance running...');
      Loc.aggregate(
        [{
          '$geoNear': {
            'near': point,
            'spherical': true,
            'distanceField': 'dist.calculated',
            'maxDistance': maxDistance
          }
        }],
        function(err, results) {
          if (err) {
            sendJsonResponse(res, 404, err);
          } else {
            locations = buildLocationList(req, res, results);
            sendJsonResponse(res, 200, locations);
            console.log(locations);
          }
        }
      )
    };
  };
  
  var buildLocationList = function(req, res, results) {
    console.log('buildLocationList:');
    var locations = [];
    results.forEach(function(doc) {
        locations.push({
          distance: doc.dist.calculated,
          name: doc.name,
          address: doc.address,
          rating: doc.rating,
          facilities: doc.facilities,
          _id: doc._id
        });
    });
    return locations;
  };
//end trial
/*
module.exports.locationsListByDistance = function(req, res){
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var maxDistance = parseFloat(req.query.maxDistance);
   // var maxDistance = 100;
    var point = {
        type : "Point",
        coordinates: [lng, lat]
    };
    var geoOptions = {
        spherical : true,
        maxDistance :  theEarth.getRadsFromDistance(maxDistance),
        num : 10
    };
    if (!lng || !lat || !maxDistance){
        sendJsonResponse(res, 404, { "message": "lng, lat and maxDistance query parameters are all required"});
        return;
    }
    else{
    Loc.aggregate(
        [
            {
                '$geoNear':{
                    'near': point,
                    'spherical': true,
                    'distanceField': 'dist.calculated',
                    'maxDistance': maxDistance
                }
            }
        ],
        function(err, results){
            if(err){
             sendJsonResponse(res, 404, err);
             console.log("Locations not found");
            }
            else{
             locations = buildLocationList(req, res, results);
             sendJsonResponse(res, 200, locations);
            }
        }
    )
    };
};
/*
module.exports.locationsListByDistance = function(req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var maxDistance = 100;
    var point = {
      type: "Point",
      coordinates: [lng, lat]
    };
    var geoOptions = {
      spherical: true,
      maxDistance: theEarth.getRadsFromDistance(20),
      num: 10
    };
    if (!lng || !lat || !maxDistance) {
      console.log('locationsListByDistance missing params');
      sendJsonResponse(res, 404, {
        "message": "lng, lat and maxDistance query parameters are all required"
      });
      return;
    }
    Loc.geoNear(point, geoOptions, function(err, results, stats) {
      var locations;
      console.log('Geo Results', results);
      console.log('Geo stats', stats);
      if (err) {
        console.log('geoNear error:', err);
        sendJsonResponse(res, 404, err);
      } else {
        locations = buildLocationList(req, res, results, stats);
        sendJsonResponse(res, 200, locations);
      }
    });
  };

var buildLocationList = function(req, res, results) {
    var locations = [];
    results.forEach(function(doc) {
      locations.push({
        distance: theEarth.getDistanceFromRads(doc.dis),
        name: doc.obj.name,
        address: doc.obj.address,
        rating: doc.obj.rating,
        facilities: doc.obj.facilities,
        _id: doc.obj._id
      });
    });
    return locations;
  };*/

module.exports.locationsReadOne = function(req, res){
    if(req.params && req.params.locationid){
    Loc
       .findById(req.params.locationid)
       .exec(function(err, location){
        if(!location ){
            sendJsonResponse(res, 404, {"message" : "location not found"});
            return;
        }
        else if(err){
            sendJsonResponse(res, 404, err);
            return;
        }
       sendJsonResponse(res, 200, location);
      })
    }
    else{
        sendJsonResponse(res, 404, {"message" : "no locationid in request"});
    }
    
}

module.exports.locationsUpdateOne = function(req, res){
    if(!req.params.locationid){
        sendJsonResponse(res, 404, {"message" : "Not found, locationid is required"}); 
        return;
    }
    Loc
       .findById(req.params.locationid)
       .select('-reviews -rating')
       .exec(
           function(err, location){
               if(!location){
                   sendJsonResponse(res, 404,{"message" : "location not found"});
               }
               else if(err){
                  sendJsonResponse(res, 404, err);
                  return;  
               }
               location.name = req.body.name;
               location.address = req.body.address;
               location.facilities = req.body.facilities.split(",");
               location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
               location.openingTimes = [{
                   days: req.body.days1,
                   opening: req.body.opening1,
                   closing: req.body.closing1,
                   closed: req.body.closed1 
               },
              {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2
              }
            ];
            location.save(function(err, location){
              if(err){
                  sendJsonResponse(res, 404, err);
              }
              else{
                  sendJsonResponse(res, 200,location);
              }
            });
           }
       );
   
};

module.exports.locationsDeleteOne = function(req, res){
    var locationid = req.params.locationid;
    if(locationid){
        Loc
           .findByIdAndRemove(locationid)
           .exec(
               function(err, location){
                   if(err){
                       sendJsonResponse(res, 404, err);
                       return;
                   }
                   sendJsonResponse(res, 204, null);
               }
           );
    }
   else{
    sendJsonResponse(res, 404, {"message" : "locationid"});
   }

};

