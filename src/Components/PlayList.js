import { useContext, useEffect } from "react";
import context from "../Contexts/context";
import PlaylistCard from "./PlaylistCard";
import "./PlayListCard.css";

function PlayList()
{
    const {getPlaylist,playlist} = useContext(context);

    useEffect(()=>{
        getPlaylist();
    },[]);


    
    return(
            <div>
                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}>
                    {
                        playlist.map(data=>{
                            return <PlaylistCard key = {data.id} data={data}/>
                        })
                    }
                </div>
            </div>
    )
}

export default PlayList;