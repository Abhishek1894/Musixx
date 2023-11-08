import { useContext, useEffect, useState } from "react";
import context from "../Contexts/context";
import AlbumCard from "./AlbumCard";

function ArtistAlbum() 
{
    const { clickedArtistId, accessToken } = useContext(context);
    
    const [albumList,setAlbumList] = useState([]);

    async function getArtistAlbums(id) 
    {
        let parameters =
        {
            method: 'GET',
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        try 
        {
            let response = await fetch("https://api.spotify.com/v1/artists/" + id + "/albums?limit=30", parameters);
            let data;
            // console.log(response);
            if (response.ok) 
            {
                data = await response.json();
                console.log(data.items);
                setAlbumList(data.items);
            }
        }
        catch (error) 
        {
            console.log(error);
        }

    }

    useEffect(()=>{
        getArtistAlbums(clickedArtistId);
    },[])

    // useEffect(()=>{
    //     console.log("heeheh");
    //     console.log(albumList);
    // },[albumList])

    return (
        <div>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}>
                {
                    albumList.map(data=>{
                        return <AlbumCard key = {data.id} data={data}/>
                    })
                }
            </div>
        </div>
    )
}

export default ArtistAlbum;