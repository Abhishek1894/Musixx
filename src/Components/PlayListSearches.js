import { useContext } from "react";
import context from "../Contexts/context";
import PlaylistCard from "./PlaylistCard";


function PlayListSearches()
{

    const {fetchedData} = useContext(context);

    let playlistArray = fetchedData.playlists.items;
    return(
        <div>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}>
                    {
                        playlistArray.map(data=>{
                            return <PlaylistCard key = {data.id} data={data}/>
                        })
                    }
            </div>
        </div>
    )
}

export default PlayListSearches;