import React from 'react';
import {CardMedia, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {styles} from './styles';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(styles);

const TrailView = props => {
  const classes = useStyles();

  if (!props.trail) {
    return 'Loading...';
  }

  return (
    <>
      <CardMedia
        className={classes.image}
        image={props.trail.imageLarge}
        title={props.trail.name}
      />

      <div className={classes.descriptionContainer}>
        <Rating
          className={classes.stars}
          name="read-only"
          value={props.trail.stars}
          readOnly
        />
        <Typography className={classes.title}>{props.trail.name}</Typography>
        <Typography className={classes.location}>
          {props.trail.location}
        </Typography>
        <div className={classes.lengthContainer}>
          <Typography className={classes.length}>
            {props.trail.length} mi
          </Typography>
          <Typography className={classes.length}>
            {props.trail.high}' Up
          </Typography>
          <Typography className={classes.length}>
            {props.trail.low}' Down
          </Typography>
        </div>

        <Typography className={classes.summary}>
          {props.trail.summary}
        </Typography>

        <Typography className={classes.difficulty}>
          {props.trail.difficulty}
        </Typography>
      </div>
    </>
  );
};

export default TrailView;
