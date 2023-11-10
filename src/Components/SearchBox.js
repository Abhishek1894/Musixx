
import "./SearchBox.css"
import { useContext } from "react";
import context from "../Contexts/context";
import {NavLink, Outlet,useNavigate} from "react-router-dom";

function SearchBox()
{
    const navigate = useNavigate();

    const {searchValue,setSearchValue,fetchedData,setFetchedData,handleSearchChange} = useContext(context);

    function clearSearch()
    {
        setSearchValue('');
        setFetchedData(null);
        // to navigate to original position
        navigate("");
    }


    let navBar = <div className="search-navigation">
        <NavLink to={"top"}>Top</NavLink>
        <NavLink to={"albums"}>Albums</NavLink>
        <NavLink to={"artists"}>Artists</NavLink>
        <NavLink to={"playlists"}>Playlists</NavLink>
    </div>


    return(
        <div>
            <div className="search-container">
                <input 
                type="text"
                value={searchValue}
                onChange={handleSearchChange} 
                placeholder="Search Here..."/>
                <button className="clear-search-button" onClick={clearSearch}>x</button>
            </div>

            {fetchedData && navBar}

            <div>
                {fetchedData && <Outlet/>}
            </div>
        </div>
    );
}

export default SearchBox;