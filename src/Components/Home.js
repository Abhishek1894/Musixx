import { useContext } from "react";
import context from "../Contexts/context";
import Albums from "./Albums";
import PlayList from "./PlayList";
import Artists from "./Artists";

const some = {
    boxShadow:"0px 0px 4px #eb9494",
    padding:"15px",
    marginTop:"50px",
    marginBottom:"10px",
    width:"96%",
    boderRadius:"5px"
}

function Home(props)
{
    const {accessToken,getArtistId} = useContext(context);

    return (
        <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <h1 style={some}>New Album Releases</h1>
            <Albums/>

            <h1 style={some}>PlayLists Recommendations</h1>
            <PlayList/>

            <h1 style={some}>Famous Artists</h1>
            <Artists/>
        </div>
    )
}

export default Home;