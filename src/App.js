import React, {useEffect} from 'react';
import { CssBaseline , Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import List from './components/List/List';
import {getPlacesData} from './api';
import {useState} from 'react';

const App = () => {

  const[places,setPlaces]=useState([]);

  const[bounds,setBounds]=useState({});

  const[coordinates,setCoordinates]=useState({lat:0, lng:0});

  const[childClicked,setChildClicked] = useState(null);
  
  const[ isLoading,setIsLoading] = useState(false);

  const [type,setType]= useState('restaurants');

  const [rating,setRating]= useState('');

  const[filteredPlaces,setFilteredPlaces]=useState([]);

  const[autocomplete,setAutocomplete] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords : {latitude,longitude}}) => {
      setCoordinates({lat : latitude , lng : longitude});
    })
  },[])

  useEffect(() => {
    const filteredPlaces = places.filter((place)=> place.rating >  rating)
    setFilteredPlaces(filteredPlaces);
  },[rating]);
  
  useEffect(() => {
   
    setIsLoading(true);
     
      getPlacesData(type,bounds.sw,bounds.ne)

      .then((data) => { 
        console.log(data);
        setPlaces(data);
        setFilteredPlaces([])
        setIsLoading(false);
      })
  },[type,bounds,coordinates]) 

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat , lng });
  }; 

    return (
    <>
        <CssBaseline/>
        <Header setCoordinates={setCoordinates} onPlaceChanged={onPlaceChanged} onLoad={onLoad}/>
        <Grid container spacing={3} style={{ width:'100%'}}>
            <Grid item xs={12} md={4}>
                <List
                places ={filteredPlaces.length ? filteredPlaces : places}
                childClicked={childClicked} 
                  isLoading={isLoading}
                  type={type}
                  setType={setType}
                  rating={rating}
                  setRating={setRating}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <Map 
                setCoordinates={setCoordinates}
                setBounds={setBounds}  
                coordinates={coordinates}
                places ={filteredPlaces.length ? filteredPlaces : places}
                setChildClicked={setChildClicked}
                />
            </Grid>
        </Grid>
    </>
  );
}

export default App;
