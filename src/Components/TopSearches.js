import { useContext, useEffect } from "react";
import context from "../Contexts/context";
import AlbumCard from "./AlbumCard";


function TopSearches()
{

    const {fetchedData} = useContext(context);

    useEffect(()=>{
        console.log(fetchedData)
    },[fetchedData]);

    return(<div>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
                {fetchedData.albums.items.map((data,index) =>{
                    if(index <= 9)
                    return(<div><AlbumCard data={data} key={data.id}/></div>)
                })}
            </div>
    </div>);
}

export default TopSearches;