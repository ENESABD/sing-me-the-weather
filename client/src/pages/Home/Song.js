import React, { Fragment, useEffect, useState } from 'react';
import { songs } from '../../songList';

function Song({ forCategory }) {

    const [song, setSong] = useState({});

   
    const { main, dayOrNight } = forCategory;



    


    

    useEffect(() => {

        

        const getCategory = () => {
            if (main) {
                switch (main) {
                    case "Clouds":
                        return "cloudy";
                    case "Clear":
                        if (dayOrNight === 'n') {
                            return "night";
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
        

      }, [forCategory, main, dayOrNight])

        

    return (
        <section className="song-section">
            {song ? 

                        
            <figure className="song">
                <figcaption className="song-caption">
                    <div className="song-caption-line-1">Playing <span className="song-title">{song.title}</span></div>
                    <div className="song-caption-line-2">by <span className="song-singer">{song.by}</span></div>
                </figcaption>
                <iframe className="song-iframe"
                    width="400" height="250"
                    src={
            `https://www.youtube.com/embed/${song.videoID}?rel=0&autoplay=1&controls=0&disablekb=1&loop=1&playlist=${song.videoID}`
                    }
                    title="Weather Song" frameBorder="0" 
                    allow="autoplay;" 
                    >
                </iframe>
            </figure>            

            :
            <Fragment>
                <label htmlFor="song-loading">Song is loading...</label>
                <progress id="song-loading" className="song-loading"></progress>
            </Fragment>
            
             }
        </section>
    )
}

export default Song;
