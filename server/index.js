const path = require('path');
const express = require('express');
const cors = require('cors');
const axios = require('axios')
require('dotenv').config()
console.log(process.env.REACT_APP_GOOGLE_API_KEY);
const NodeGeocoder = require('node-geocoder');

const geocode_options = {
   provider: 'google',
   apiKey: process.env.REACT_APP_GOOGLE_API_KEY
 };
 
const Geocode = NodeGeocoder(geocode_options);



const fs = require('fs');
const fetch = require('node-fetch');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(

      `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="x-ua-compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          
      
      </head>
      <body>
         <script src="https://maps.google.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places"
         data-setted="true"></script>

                  
      </body>
      </html>
      `      
      , { runScripts: "dangerously", resources: "usable", pretendToBeVisual: true }
      );


const app = express()

app.use(cors())

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.static(__dirname + '/server-images'));



app.get('/place', async (req,res) =>{
   let lat = req.query.lat;
   let lon = req.query.lon;

   if ((lat !== "null") && (lon !== "null")) {
      const addresses = await Geocode.reverse({ lat: lat, lon: lon });
      const address = addresses[0];
      const country = address.country;
      const city = address.city;
      let countryState = '';
      if (address.administrativeLevels) {
         countryState = address.administrativeLevels.level1long;
      }
      let reverse;
      if (countryState) {
         reverse = await Geocode.geocode(city + ', ' + countryState);
      } else {
         reverse = await Geocode.geocode(city + ', ' + country);
      }
      const placeID = reverse[0].extra.googlePlaceId;
      


      const request = {
         placeId: placeID
      };
   
      let service = new dom.window.google.maps.places.PlacesService(
         dom.window.document.createElement("div")
      );
      await service.getDetails(request, async (place, status) => {
         if (status === dom.window.google.maps.places.PlacesServiceStatus.OK) {
            //console.log(place);
            //console.log('place call made');
            //console.log(place.photos);
            for (let placePhoto of place.photos) {
               //const { innerWidth: width, innerHeight: height } = window;
               if (placePhoto.height >= 800 & placePhoto.width >=1200) {
                  if (!(placePhoto.height * 1.3 >= placePhoto.width)) {
                     let theURL = placePhoto.getUrl({ maxWidth: 5000, maxHeight: 5000 });
                     
                     const response = await fetch(theURL);
                     const buffer = await response.buffer();
                     fs.writeFile(`./server-images/image.jpg`, buffer, 
                        // eslint-disable-next-line no-loop-func
                        () => {
                           res.json({city: city, country: country, countryState: countryState});
                        });
                     break;
                  }
               }
            }
         }
      });

   }     
    
});


app.get('/weather', async (req,res) =>{
   let lat1 = req.query.lat;
   let lon1 = req.query.lon;
   let unit = req.query.units;
   let key = process.env.REACT_APP_WEATHER_API_KEY;
   if ((lat1 !== "null") && (lon1 !== "null") && (unit !== "null")) {
      await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat1}&lon=${lon1}&units=${unit}&exclude=minutely&appid=${key}`)
         .then(response => {
            res.send(response.data);
         })
         .catch(err => {
            console.log(err);
         })
   }
});

app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
 });

app.listen(process.env.PORT || 8000, () => console.log(`listening ${PORT}`))



