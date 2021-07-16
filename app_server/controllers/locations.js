/* GET 'home' page */
module.exports.homelist = function(req, res){
    res.render('locations-list', { 
      title: 'Loc8r, Find a place to work with wifi',
      pageHeader: {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'    
    },
    locations: [
      {
        name:'Starcups',
        address: '125 High Street, Reading, RG6 1PS',
        rating: '3',
        facilities: ['Hot Drinks', 'Food', 'Premium Wi-Fi'],
        distance: '100m'
      },
      {
        name:'Cafe Hero',
        address: '125 High Street, Reading, RG6 1PS',
        rating: '4',
        facilities: ['Hot Drinks', 'Food', 'Premium Wi-Fi'],
        distance: '200m'

      },
      {
        name:'Bugger Queen',
        address: '125 High Street, Reading, RG6 1PS',
        rating: '2',
        facilities: ['Hot Drinks', 'Food', 'Premium Wi-Fi'],
        distance: '250m'
      }
    ]
  });
  };
  
  /* GET 'Location info' page */
  module.exports.locationInfo = function(req, res){
    res.render('location-info', { 
      title: 'Starcups',
      pageHeader: {title : 'Starcups'},
      sidebar:{
        context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work document.',
        callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
      },
      location: {
        name: 'Starcups',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 3,
        facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        coords:{ lng: -0.9690884, lat: 51.455041},
        openingTimes: [{
          days: 'Monday - Friday',
          opening: '7:00am',
          closing: '7:00pm',
          closed: false
        },{
          days: 'Sartuday',
          opening: '8:00am',
          closing: '5:00pm',
          closed: false
        },{
          days: 'Sunday',
          closed: true
        }],
        
          reviews: [
            {
              author: 'Mtende Mzala',
              rating: 5,
              timestamp: '25 May 2013',
              reviewText: 'what a great place. I can\'t say enough good things about it.'
            },
            {
              author: 'Mzala Ezala',
              rating: 3,
              timestamp: '25 May 2021',
              reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
            }
          ]
        }
      
     });

  };
  
  /* GET 'Add review' page */
  module.exports.addReview = function(req, res){
    res.render('location-review-form', {
       title: 'Review Starcups on Loc8r',
       pageHeader: {title : 'Review Cups'}
       });
  };
  