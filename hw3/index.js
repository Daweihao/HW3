var express = require('express');
let request = require('request');
var router = express.Router();
const options = {
  method: 'GET',
  url:'http://api.openweathermap.org/data/2.5/weather?zip=02134,us&APPID=f5e514b6004f80bff3f022eeab5b3137',
}

let content = (url)=>{
  return new Promise(((resolve, reject) => {
    request(url,{json:true},(err,res,body)=>{
      if (err) reject(err);
      resolve(body);
    });
  }));
};
function tRequest(paras){
  request(paras).then(function (response) {
    console.log(`${response}`);
  }).catch(function (err) {
    console.log(`${err}`);
  });


}

/* GET home page. */
router.get('/', function(req, res, next) {

  content('http://api.openweathermap.org/data/2.5/weather?zip=02134,us&APPID=f5e514b6004f80bff3f022eeab5b3137').then(response =>{
    let temp = response.main.temp * 9/5 - 459.67;
    temp = temp.toFixed(2);
    res.render('index',{title : response.name,
      weather: response.weather[0].main,
      low_temp : (response.main.temp_min * 9/5 - 459.67).toFixed(2),
      high_temp: (response.main.temp_max * 9/5 - 459.67).toFixed(2),
      temp : temp,
      wind_speed: response.wind.speed
                        })
  }).catch(error =>{
    console.log('Entering Error');
    res.send(error);
  });
  // tRequest(options);
});

module.exports = router;
