import "./ArtistCard.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import context from "../Contexts/context";

function ArtistCard(props)
{
    const {data} = props;
    const {accessToken,setClickedArtistId} = useContext(context);
    const navigate = useNavigate();

    function artistCardClicked(id)
    {
        setClickedArtistId(id);
        navigate('/artists/albums');
    }


    return(
        <div className="card" onClick={()=>{artistCardClicked(data.id)}}>
            <div 
            style={{
            backgroundImage: `url(${data.images[1].url})`,
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center",
            backgroundSize:"cover",
            height:"300px",
            width:"300px",
            borderRadius:"8px"
            }}>
            </div>

            <div>
                <p className="name">{data.name}</p>
                <p className="type">{data.type}</p>
                <p className="followers">Followers: {data.followers.total}</p>
            </div>
        </div>
    )
}

export default ArtistCard;