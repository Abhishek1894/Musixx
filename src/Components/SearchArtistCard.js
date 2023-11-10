

function SearchArtistCard(props)
{
    const {data} = props;

    try{
        return(
            <div>
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
                <div>
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