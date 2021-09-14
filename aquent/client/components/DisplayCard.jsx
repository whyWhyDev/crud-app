import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';

export default function DisplayCard({ title, desc, handleInfoOpen, handleContactsOpen }) {
  const randomPic = () => Math.floor(Math.random() * 17);
  return (
    <>
    <Card className='card-display' style={{ maxWidth: 280 }} >
      <CardMedia
        className='card-image'
        style={{ height: 180 }}
        image={`https://placekitten.com/300/200?image=${randomPic()}`}
        title='Contemplative Reptile'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          { title }
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          { desc }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleInfoOpen}>
          Company Info
        </Button>
        <Button size="small" color="primary" onClick={handleContactsOpen}>
          View Contacts
        </Button>
      </CardActions>
    </Card>
    </>
  );
}
