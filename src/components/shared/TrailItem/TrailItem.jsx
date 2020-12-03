import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardContent, CardMedia, Typography} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import {makeStyles} from '@material-ui/core/styles';
import {styles} from './styles';

const useStyles = makeStyles(styles);

const TrailItem = props => {
  const classes = useStyles();

  return (
    <Link
      to={`${process.env.PUBLIC_URL}/?trail=${props.trail.id}`}
      className={classes.link}
    >
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={props.trail.image ? props.trail.image : 'no'}
          title={props.trail.name}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography className={classes.title}>
              {props.trail.name}
            </Typography>
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
            <Typography className={classes.difficulty}>
              {props.trail.difficulty}
            </Typography>
            <Rating
              className={classes.stars}
              name="read-only"
              value={props.trail.stars}
              readOnly
            />
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default TrailItem;
