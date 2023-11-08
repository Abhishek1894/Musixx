import { useContext, useEffect,useState } from "react";
import context from "../Contexts/context";
import CustomAudioPlayer from "./CustomAudioPlayer";

function ShowPlaylist()
{
     const{clickedPlayList,accessToken} = useContext(context);
     const [tracks,setTracks] = useState([]);
     const [currentTrack,setCurrentTrack] = useState([]);

    useEffect(()=>{
        getPlaylistTracks();
    },[]);

    useEffect(()=>{
        console.log("playlist-track");
        console.log(tracks);
    },[tracks]);

    async function getPlaylistTracks()
    {
        let url = clickedPlayList.tracks.href;
        console.log(url);
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
            response = await fetch(url,parameters);

            if(response.ok)
            {
                data = await response.json();
                setTracks(data.items);
                console.log("data.items");
                setCurrentTrack(data.items[0].track);
                // console.log("Current Track");
                // setCurrentTrack(data.items[0]);
                // console.log(currentTrack);
            }
            else 
                throw new Error("Some error occureed");
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return(
        <div>

            <div style={{display:"flex",height:"100%"}}>
                    <div 
                    style={{
                    backgroundImage: `url(${clickedPlayList.images[0].url})`,
                    backgroundRepeat:"no-repeat",
                    backgroundPosition:"center center",
                    backgroundSize:"cover",
                    width:"50vw",
                    height:"80vh",
                    borderRadius:"5px",
                    boxShadow:"0px 0px 4px black",
                    margin:"30px"
                    }}>
                    </div>

                    <div>
                    <div style={{width:"50vw",display:"flex",flexDirection:"column",overflowY:"auto",overflowX:"hidden",height:"60vh",marginTop:"30px"}}>

                        {tracks.map(track => {
                            return(
                            <div key={track.id} onClick={()=>{setCurrentTrack(track.track)}}
                            style={{boxShadow:"0px 0px 3px #eb9494",
                            borderRadius:"4px",
                            padding:"5px",
                            margin:"8px 15px"
                            }}>
                                <p style={{fontWeight:"bold",fontSize:"1rem",margin:"10px"}}>{track.track.name}</p>

                                <p>
                                    {track.track.artists.map((artist)=>{
                                        return(<span style = {{margin:"10px", fontSize:"1rem"}}>{`${artist.name}`}</span>)
                                    })}
                                </p>
                                
                            </div>)
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

export default ShowPlaylist;