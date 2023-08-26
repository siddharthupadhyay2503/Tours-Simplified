import React from 'react';
import { Box,Typography,Button,Card,CardMedia,CardContent,CardActionArea,Chip, CardActions } from '@material-ui/core';
import LocationOnIcon  from '@material-ui/icons/LocationOn';
import PhoneIcon  from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import useStyles from './Styles.js';

const PlaceDetails = ({place,selected,refProp}) => {
  const classes = useStyles();
  if(selected) refProp?.current?.scrollIntoView({behaviour:"smooth", block:"start"})
  return (
  <Card elevation={6}>
    <CardMedia
    style={{height:350}}
    image={place.photo? place.photo.images.large.url:'https://as1.ftcdn.net/v2/jpg/03/24/73/92/1000_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg'}
    title={place.name}
    />
    <CardContent>
      <Typography gutterBottom variant='h5'>
        {place.name}
      </Typography>
      <Box display="flex" justifyContent="space-between">
      <Rating  value={Number(place.rating)} readOnly />
        <Typography variant='subtitle1'>Out of {place.num_reviews} reviews</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography variant='subtitle1'>Price</Typography>
        <Typography variant='subtitle1'>{place.price_level}</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography variant='subtitle1'>Ranking</Typography>
        <Typography variant='subtitle1'>{place.ranking}</Typography>
      </Box>
     
        {place?.awards?.map((award) => (
          <Box my={1} display="flex" justifyContent="space-between">
            <img src = {award.images.small} alt={award.display_name}/>
            <Typography variant='subtitle2' color="textSecondary">{award.display.name}</Typography>
           </Box>

        ))}

        {place?.cuisine?.map(({name})=>(
          <Chip key={name} size="small" label={name} className={classes.chip}/>
        ))}
      {place?.address && (
        <Typography gutterBottom variant='body2' color='textSecendory' className={classes.subtitle}>
          <LocationOnIcon/> {place.address}
        </Typography>
      )}
      {place?.phone && (
        <Typography gutterBottom variant='body2' color='textSecendory' className={classes.subtitle}>
          <PhoneIcon/> {place.phone}
        </Typography>
      )}
      <CardActions>
        <Button size='small' color='primary' onClick={() => window.open(place.web_url, '_blank')}>
          Tours Simplified
        </Button>
        <Button size='small' color='primary' onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
      </CardActions>
    </CardContent>
  </Card>
  );
}

export default PlaceDetails; 