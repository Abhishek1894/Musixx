

function SearchArtistCard(props)
{
    const {data} = props;

    try{
        return(
            <div style={{boxShadow:"0px 0px 4px #eb9494", margin:"10px", borderRadius:"8px"}}>
                <div style={{
                    backgroundImage: `url(${data.images[0].url}`,
                    backgroundRepeat:"no-repeat",
                    backgroundPosition:"center",
                    backgroundSize:"cover",
                    borderTopLeftRadius:"8px",
                    borderTopRightRadius:"8px",
                    width:"300px",
                    height:"280px"
                    }}>
                </div>
                <div style={{
                backgroundColor:"#212121", 
                color:"white", 
                fontSize:"1.2rem", 
                textAlign:"center",
                borderBottomLeftRadius:"8px",
                borderBottomRightRadius:"8px",
                padding:"8px"
                }}>
                    {data.name}
                </div>

            </div>
        )
    }
    catch(error)
    {
        return;
    }
}

export default SearchArtistCard;