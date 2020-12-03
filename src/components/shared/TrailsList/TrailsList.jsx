import React from 'react';
import TrailItem from '../TrailItem';
import {useSelector} from 'react-redux';
import NoData from '../NoData';

const TrailsList = _ => {
  const trails = useSelector(state => state.app.trails);

  if (trails.length === 0) {
    return <NoData />;
  }

  return (
    <>
      {trails.map(trail => (
        <TrailItem key={trail.id} trail={trail} />
      ))}
    </>
  );
};

export default TrailsList;
