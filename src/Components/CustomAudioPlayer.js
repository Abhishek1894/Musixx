import { useEffect, useRef, useState } from "react";
import "./CustomAudioPlayer.css";

function CustomAudioPlayer(props)
{
    const{track} = props;

    const [isPlaying,setIsPlaying] = useState(false);
    const [currentTime,setCurrentTime] = useState(0);
    const [duration,setDuration] = useState(0);
    const [error,setError] = useState(false);

    const audioRef = useRef(null);
    const playPauseRef = useRef(null);

    function handleSeek(event)
    {
        audioRef.current.currentTime = event.target.value;
        setCurrentTime(event.target.value);
    }

    function handleTimeUpdate()
    {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    }

    function handlePlay()
    {
        audioRef.current.play();
        setIsPlaying(true);

        playPauseRef.current.classList.add("fa-pause");
        playPauseRef.current.classList.remove("fa-play");
    }

    function handlePause()
    {
        audioRef.current.pause();
        setIsPlaying(false);
        
        playPauseRef.current.classList.remove("fa-pause");
        playPauseRef.current.classList.add("fa-play");
    }

    function handlePlayPause()
    {
        if(isPlaying)
            handlePause();  
        else
            handlePlay();
    }

    function formatDuration(durationSeconds)
    {
        let seconds = Math.floor(durationSeconds);
        return seconds.toString().padStart(2,"0");
    }  

    useEffect(()=>{
        playPauseRef.current.classList.remove("fa-pause");
        playPauseRef.current.classList.add("fa-play");
    },[track])

    useEffect(()=>{

        console.log(track);
        audioRef.current.addEventListener("timeupdate",handleTimeUpdate);

        // return()=>{
        //     audioRef.current.removeEventListener("timeupdate",handleTimeUpdate);
        // }
    },[])

        return (
            <div className="audio-player-card">

                <p style={{fontSize:"1.4rem",margin:"5px"}}>{track.name}</p>
                <input type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                />

                <audio
                ref={audioRef}
                src={track.preview_url} type="audio/mpeg"
                />

                <div className="track-duration">
                    <p>{formatDuration(currentTime)}</p>
                    <p>{formatDuration(duration)}</p>
                </div>

                <div>
                    <button className="fa" ref={playPauseRef}onClick={handlePlayPause}></button>
                </div>

            </div>
        )
}

export default CustomAudioPlayer;