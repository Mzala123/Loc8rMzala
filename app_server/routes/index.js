var express = require('express');
var router = express.Router();

var ctrlMain = require('../controllers/main');

router.get('/', ctrlMain.index);
module.exports = router;

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//module.exports = router;

var homaPageController = function(req, res){
     res.render('index', { title: 'Express'});
};

router.get('/', homaPageController);
module.exports = router;*/


