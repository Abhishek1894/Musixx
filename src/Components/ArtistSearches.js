import { useContext } from "react";
import context from "../Contexts/context";
import ArtistCard from "./ArtistCard";
import SearchArtistCard from "./SearchArtistCard";


function ArtistSearches()
{
    const {fetchedData} = useContext(context);

    const artistArray = fetchedData.artists.items;
    return(
        <div>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}>
                    {
                        artistArray.map(data=>{
                            return(<SearchArtistCard key={data.id} data={data}/>)
                        })
                    }
            </div>
        </div>
    );
}

export default ArtistSearches;