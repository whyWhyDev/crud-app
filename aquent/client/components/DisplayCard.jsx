import React from 'react';

import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

export default function DisplayCard({ title, desc, img }) {
  return (
    <Card className='card-display' style={{ maxWidth: 345 }}>
      <CardMedia
        className='card-image'
        style={{ height: 140 }}
        image={img}
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
    </Card>
  );
}
