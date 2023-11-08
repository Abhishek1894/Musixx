import { useEffect,useContext } from "react";
import context from "../Contexts/context";
import ArtistCard from "./ArtistCard";
import "./Artist.css";

function Artists()
{
    const {accessToken,getArtistId,artistIdlist,setArtistIdList} = useContext(context);

    let artistNames = ['Anuv Jain','Arijit Singh','Sonu Nigham','Atif Aslam','Shreya Ghoshal','kk','neeti mohan','Jubin Nautiyal','Mohit Chauhan','A R Rahman','honey singh'];

    useEffect(()=>{
        
        setArtistIdList([]);
        artistNames.forEach(artist =>{
            getArtistId(artist);
        });

    },[])

    if(artistIdlist.length > 0)
    {
        return(
            <div>
                {/* <div className="search">
                    <input type="text" placeholder="Search Artist here"/>
                    <button>x</button>
                </div> */}
                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}>
                    {
                        artistIdlist.map(data=>{
                            return <ArtistCard key = {data.id} data={data}/>
                        })
                    }
                </div>
                
            </div>
        )
    }
    else
    {
        <div>
            some error occurred
        </div>
    }

}

export default Artists;



// to access image: data.images[0].url
// to access id: data.id
// to access name: data.name
