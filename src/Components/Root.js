
import { Outlet, NavLink } from "react-router-dom";
import "./Root.css";

function Root()
{
    

    return (
        <div className="root-container" style={{display:"flex",flexDirection:"column",height:"100vh"}}>
            <div className="root-heading">

                <div className="project-name-container">
                    <p className="project-name">Musixx</p>
                </div>
                <div className="navigation">
                    <NavLink to={"/home"} className="navlink">Home</NavLink>
                    <NavLink to={"/albums"} className="navlink">Albums</NavLink>
                    <NavLink to={"/playlists"} className="navlink">PlayLists</NavLink>
                    <NavLink to={"/artists"} className="navlink">Artists</NavLink>
                </div>

            </div>

            <div className=".content" style={{flexGrow:"1"}}>
                <Outlet/>
            </div>
        </div>
    )
}

export default Root;