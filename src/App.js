
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from "react-router-dom";
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

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
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


  useEffect(()=>{
    fetchToken();
    // getNewSongs();
  },[]);


  useEffect(()=>{
    console.log("Playlist");
    console.log(newAlbums);
  },[newAlbums]);

  return (
    <div>
      <context.Provider value={{accessToken,getArtistId,artistIdlist,setArtistIdList,getNewRealeasedAlbums,newAlbums,setNewAlbums,clickedAlbum,setClickedAlbum,getPlaylist,playlist,setPlaylist,clickedPlayList,setClickedPlayList,clickedArtistId,setClickedArtistId}}>
        <RouterProvider router={router}/>
      </context.Provider>
      {/* <button onClick={getPlaylist}>Click</button> */}
    </div>
    
  );
}

export default App;
