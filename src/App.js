
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider,Navigate} from "react-router-dom";
import Root from "./Components/Root";
import Home from "./Components/Home";
import { useEffect, useState } from "react";
import context from "./Contexts/context";
import Artists from "./Components/Artists";
import Albums from "./Components/Albums";
import ShowAlbum from "./Components/ShowAlbum";
import PlayList from "./Components/PlayList";
import ShowPlaylist from "./Components/ShowPlaylist"
import ArtistAlbum from "./Components/ArtistAlbum";
import SearchBox from "./Components/SearchBox";
import AlbumSearches from "./Components/AlbumSearches";
import PlayListSearches from "./Components/PlayListSearches";
import ArtistSearches from "./Components/ArtistSearches";
import TopSearches from "./Components/TopSearches";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>

    {/* Default child root for Root element */}
    <Route index element={<Navigate to="home"/>}/>


    <Route path="search" element={<SearchBox/>}>

      {/* default child root for search box page */}
      <Route index element={<Navigate to="top" />}/>
      <Route path="albums" element={<AlbumSearches/>}/>
      <Route path="playlists" element={<PlayListSearches/>}/>
      <Route path="albums" element={<AlbumSearches/>}/>
      <Route path="artists" element={<ArtistSearches/>}/>
      <Route path="top" element={<TopSearches/>}/>
    </Route>

    <Route path="home" element={<Home/>}/>

    <Route path="artists" element={<Artists/>}/>

    <Route path="artists/albums" element={<ArtistAlbum/>}/>

    <Route path="albums" element={<Albums/>}/>

    <Route path="albums/show" element={<ShowAlbum/>}/>

    <Route path="playlists" element={<PlayList/>}/>

    <Route path="playlists/show" element={<ShowPlaylist/>}/>

  </Route>
))

const clientId = '3f0873ceb1e54c64a2388f0b77458e98';
const clientSecret = '26f71d4c240444e084867e917df7ccfb';

function App() {

  const [accessToken,setAccessToken] = useState('');
  const [artistIdlist,setArtistIdList] = useState([]);

  const [newAlbums,setNewAlbums] = useState([]);
  const [clickedAlbum,setClickedAlbum] = useState(null);

  // create use state for playlists
  const [playlist,setPlaylist] = useState([]);

  const [clickedPlayList,setClickedPlayList] = useState({});

  const [clickedArtistId,setClickedArtistId] = useState(null);

  // state hooks for search data
  const[searchValue,setSearchValue] = useState('');
  const [fetchedData,setFetchedData] = useState(null); // actually object is going to be assigned

  async function getArtistId(artist)
  {
    let parameters = 
    {
      method: 'GET',
      headers: 
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+accessToken
      }
    }

    let artistId = await fetch("https://api.spotify.com/v1/search?q="+artist+"&type=artist",parameters);
    if(artistId.ok)
    {
      let data = await artistId.json();
      
      setArtistIdList(prev=>[...prev,data.artists.items[0]]);
    }
    else
      console.log("error");
    
  }

  async function fetchToken() 
  {

    let authParameters = {
      method: "POST",
      headers: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret
    }

    try
    {

      let response = await fetch("https://accounts.spotify.com/api/token", authParameters);
      let data;

      if (response.ok) 
      {
        data = await response.json();
        setAccessToken(data.access_token);
        console.log(data.access_token);
      }

    }
    catch (error) 
    {
      console.log(error);
    }

  }


  async function getNewRealeasedAlbums()
  {
    let parameters = {
      method: 'GET',
      headers: 
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+accessToken
      }
    }

    try{
      let response = await fetch("https://api.spotify.com/v1/browse/new-releases",parameters);
      // console.log(response);

      let data = await response.json();
      // console.log(data.albums.items);
      setNewAlbums(data.albums.items);

    }catch(error)
    {
      console.log(error);
    }
  }

  

  // get recommendations
  async function getPlaylist()
  {
    let parameters = {
      method: 'GET',
      headers: 
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+accessToken
      }
    }

    try{
      let response = await fetch("https://api.spotify.com/v1/browse/featured-playlists",parameters);
      console.log(response);

      if(response.ok)
      {
        let data = await response.json();
        console.log("tracks");
        console.log(data.playlists.items);
        setPlaylist(data.playlists.items);
      }
      else 
      throw new Error("Some Error Occured");

    }catch(error)
    {
      console.log(error);
    }


  }

  // functions for search functionality
  async function search(value)
    {
        let parameters = 
        {
            method: 'GET',
            headers: 
            {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+accessToken
            }
        }

        let response = await fetch("https://api.spotify.com/v1/search?q="+value+"&type=artist,album,track,playlist",parameters);

        if(response.ok)
        {
            let data = await response.json();
            setFetchedData(data);
        }
        else
            console.log("error");
    
    }

    function handleSearchChange(e)
    {
        setSearchValue(e.target.value);
        search(searchValue);
    }


  // important don't delete this
  useEffect(()=>{
    fetchToken();
    // getNewSongs();
  },[]);

  useEffect(()=>{
    console.log(fetchedData);
  },[fetchedData]);


  // useEffect(()=>{
  //   console.log("Playlist");
  //   console.log(newAlbums);
  // },[newAlbums]);

  return (
    <div>
      <context.Provider value={{accessToken,getArtistId,artistIdlist,setArtistIdList,getNewRealeasedAlbums,newAlbums,setNewAlbums,clickedAlbum,setClickedAlbum,getPlaylist,playlist,setPlaylist,clickedPlayList,setClickedPlayList,clickedArtistId,setClickedArtistId,searchValue,setSearchValue,fetchedData,setFetchedData,search,handleSearchChange}}>
        <RouterProvider router={router}/>
      </context.Provider>
      {/* <button onClick={getPlaylist}>Click</button> */}
    </div>
    
  );
}

export default App;
