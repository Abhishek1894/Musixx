import context from "../Contexts/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function PlaylistCard(props)
{
    const {data} = props;

    const {setClickedPlayList} = useContext(context);
    const navigate = useNavigate();

    function playListCardClick(data)
    {
        setClickedPlayList(data);
        navigate('/playlists/show');
    }

    return(
        <div className="playlist-card" onClick={()=>{playListCardClick(data)}}>
            <div 
            style={{
            backgroundImage: `url(${data.images[0].url})`,
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center",
            backgroundSize:"cover",
            borderTopLeftRadius:"8px",
            borderTopRightRadius:"8px",
            width:"300px",
            height:"280px"
            }}>
            </div>
            <div className="playlist-name">
                {data.name}
            </div>
        </div>
    )
}

export default PlaylistCard;