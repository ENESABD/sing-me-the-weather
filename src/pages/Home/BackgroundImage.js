/* global google */
import React, { useEffect } from 'react';

function BackgroundImage({ setPhotoUrl, placeId }) {

    
    useEffect(() => {
        createScriptLoadMap();
    }, [placeId]);



    const initialize = () => {
      if(placeId) {
        console.log(placeId);
        const request = {
            placeId: placeId
          };
      
          let service = new google.maps.places.PlacesService(
            document.createElement("div")
          );
          service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log(place);
                setPhotoUrl(place.photos[2].getUrl({ maxWidth: 5000, maxHeight: 5000 }));
            }
          });
      }
      
    };



    const createScriptLoadMap = () => {
        let gScript = document.querySelector("[data-setted]");
        let isSetted = gScript && gScript.getAttribute("data-setted");
    
        if (!isSetted) {
          let index = document.getElementsByTagName("script")[0];
          let script = document.createElement("script");
          script.src =
            "https://maps.google.com/maps/api/js?key=AIzaSyCAQoJ1jsE-tYAC-sZ4_O_xwaLBC4JQy94&libraries=places&callback=initialize";
          script.async = true;
          script.defer = true;
          script.setAttribute("data-setted", true);
          index.parentNode.insertBefore(script, index);
          window.initialize = initialize;
        } else {
          initialize();
        }
      };

    return (
        <div>
        </div>
    )
}

export default BackgroundImage;
