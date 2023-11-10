import { useContext } from "react";
import context from "../Contexts/context";
import AlbumCard from "./AlbumCard";


function AlbumSearches()
{
    const {fetchedData} = useContext(context);
    let albumArray = fetchedData.albums.items;

    return(
        <div>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}>
                    {
                        albumArray.map(data=>{
                            return <AlbumCard key = {data.id} data={data}/>
                        })
                    }
                </div>
        </div>
    )
}

export default AlbumSearches;