import React, { useEffect, useState } from 'react';
import { songs } from '../../songList';

function Song({ forCategory }) {

    const [song, setSong] = useState({});

   
    const { main, sunset, sunrise, today } = forCategory;

    console.log(main, sunset, sunrise, today );


    


    

    useEffect(() => {

        const isNight = () => {
            let newDate = new Date();
            let time = newDate.getTime();
            time = Math.floor(time / 1000);

            if (time > sunset || time < sunrise) {
                return true;
            } else {
                return false
            }
        }

        const getCategory = () => {
            if (main) {
                switch (main) {
                    case "Clouds":
                        return "cloudy";
                    case "Clear":
                        if (today) {
                            if (isNight()) {
                                return "night";
                            }
                        }
                        return "sunny";
                    case "Snow":
                        return "snow";
                    case "Rain":
                    case "Drizzle":
                        return "rainy";
                    case "Thunderstorm":
                        return "stormy";
                    case "Squall":
                    case "Tornado":
                        return "tornado";
                    case "Fog":
                    case "Mist":
                    case "Smoke":
                    case "Hazy":
                        return "foggy";
                    case "Ash":
                    case "Sand":
                    case "Dust":
                        return "dusty";
                    default:
                        return "none";
                }
            } else {
                return false;
            }
            
        }
    
        let category = getCategory();
        console.log(category);

        if (category) {
            let randomSongIndex = Math.floor(Math.random() * Math.floor(songs[category].length));
            setSong(songs[category][randomSongIndex]);
        }
        

      }, [forCategory, main, sunrise, sunset, today])

        

    return (
        <div>
            {song ? 

            <div>              
                <h1>{song.title} by {song.by}</h1>
                <iframe 
                // width="500" height="300" 
                src={`https://www.youtube.com/embed/${song.videoID}?rel=0&autoplay=1&controls=0&disablekb=1&loop=1&playlist=${song.videoID}`}
                title="YouTube video player" frameBorder="0" 
                allow="autoplay;" 
                >
                </iframe>
            </div>

            : <p>Song is loading...</p>}
        </div>
    )
}

export default Song;
