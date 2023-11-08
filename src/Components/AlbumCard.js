import "./AlbumCard.css"
import context from "../Contexts/context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

function AlbumCard(props)
{
    const {data} = props;
    const {setClickedAlbum} = useContext(context);
    const navigate = useNavigate();

    function albumCardClick(data)
    {
        setClickedAlbum(data);
        navigate('/albums/show')
    }

    
    return(
        <div className="album-card" onClick={()=>{albumCardClick(data);}}>
            <div 
            style={{
            backgroundImage: `url(${data.images[1].url})`,
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center",
            backgroundSize:"cover",
            height:"280px",
            width:"300px",
            borderTopRightRadius:"8px",
            borderTopLeftRadius:"8px"
            }}>
            </div>
            <div className="album-name">
                {data.name.length > 20 ? <p>{`${data.name.substring(0,20)}...`}</p> : <p>{data.name}</p>}
            </div>
        </div>
    )
}

export default AlbumCard