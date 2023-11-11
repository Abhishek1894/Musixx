import { useContext, useEffect } from "react";
import context from "../Contexts/context";
import AlbumCard from "./AlbumCard";
import PlaylistCard from "./PlaylistCard";
import SearchArtistCard from "./SearchArtistCard";

const some = {
    boxShadow:"0px 0px 4px #eb9494",
    padding:"15px",
    margin:"40px 25px 10px 20px",
    boderRadius:"5px",
    width:"98%"
}

function TopSearches()
{

    const {fetchedData} = useContext(context);

    useEffect(()=>{
        console.log(fetchedData)
    },[fetchedData]);

    return(<div>
            <h1 style={some}>Top Albums</h1>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
                {fetchedData.albums.items.map((data,index) =>{
                    if(index <= 9)
                    return(<AlbumCard data={data} key={data.id}/>);
                })}
            </div>

            <h1 style={some}>Top Playlists</h1>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
                {fetchedData.playlists.items.map((data,index)=>{
                    if(index <= 9)
                        return(<PlaylistCard data={data} key={data.id}/>)
                })}
            </div>

            <h1 style={some}>Top Artists</h1>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}>
                    {
                        fetchedData.artists.items.map((data,index)=>{
                            if(index <= 5)
                                return(<SearchArtistCard key={data.id} data={data}/>);
                        })
                    }
            </div>
        
    </div>);
}

export default TopSearches;