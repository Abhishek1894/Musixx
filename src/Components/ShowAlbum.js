import { useContext, useEffect, useState } from "react";
import context from "../Contexts/context";
import CustomAudioPlayer from "./CustomAudioPlayer";


function ShowAlbum()
{
    
    const {clickedAlbum,accessToken} = useContext(context);
    const [tracks,setTracks] = useState([]);
    const [currentTrack,setCurrentTrack] = useState({});

    async function getTracks()
    {
        let parameters = {
            method: 'GET',
            headers: 
            {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+accessToken
            }
          }

        let response;
        let data;
        try
        {
            response = await fetch("https://api.spotify.com/v1/albums/"+clickedAlbum.id+"/tracks",parameters);
            console.log(response);

            if(response.ok)
            {
                data = await response.json();
                console.log(data);
                setTracks(data.items);

                console.log("Current Track");
                setCurrentTrack(data.items[0]);
                console.log(currentTrack);
                
            }
            else 
                throw new Error("Some error occureed");
        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(()=>{
        getTracks();
    },[]);

    // useEffect(()=>{
    //     console.log("Tracks");
    //     console.log(tracks);
    // },[tracks]);

    return (
        <div>
            <div style={{display:"flex"}}>
                <div 
                style={{
                backgroundImage: `url(${clickedAlbum.images[0].url})`,
                backgroundRepeat:"no-repeat",
                backgroundPosition:"center center",
                backgroundSize:"cover",
                width:"45vw",
                height:"80vh",
                borderRadius:"5px",
                boxShadow:"0px 0px 4px #eb9494",
                margin:"30px"
                }}>
                </div>

                <div>
                <div className="tracks" style={{width:"50vw",display:"flex",flexDirection:"column",overflowY:"auto",overflowX:"hidden",height:"60vh",marginTop:"30px"}}>
                    {tracks.map(track=>{
                        return (
                        <div key={track.id} onClick={()=>{setCurrentTrack(track)}}
                        style={
                            {boxShadow:"0px 0px 3px #eb9494",
                            borderRadius:"4px",
                            padding:"5px",
                            margin:"8px 15px"
                            }
                        }>
                            <p style={{fontWeight:"bold",fontSize:"1. 5rem",margin:"10px"}}>{track.name}</p>
                            <p>{track.artists.map(artist=>{
                                return(<span style={{margin:"10px"}}>{`${artist.name} `}</span>)
                            })}
                            </p>

                        </div>
                        );
                    })}
                </div>
                <div>
                    <CustomAudioPlayer track={currentTrack}/>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ShowAlbum;