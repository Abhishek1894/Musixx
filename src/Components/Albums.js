import { useContext, useEffect } from "react";
import context from "../Contexts/context";
import AlbumCard from "./AlbumCard";
import "./Album.css";

function Albums()
{
    const {getNewRealeasedAlbums,newAlbums} = useContext(context);

    useEffect(()=>{
        // getNewAlbums();
        getNewRealeasedAlbums();
    },[]);


    return(
        <div>
            <div>
                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}>
                    {
                        newAlbums.map(data=>{
                            return <AlbumCard key = {data.id} data={data}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Albums;