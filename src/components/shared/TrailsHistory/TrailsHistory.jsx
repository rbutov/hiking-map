import React from 'react';
import TrailItem from '../TrailItem';
import {useSelector} from 'react-redux';
import NoData from '../NoData';

const TrailsHistory = _ => {
  const history = useSelector(state => state.app.history);

  if (history.length === 0) {
    return <NoData />;
  }

  return (
    <>
      {history.map(trail => (
        <TrailItem key={trail.id} trail={trail} />
      ))}
    </>
  );
};

export default TrailsHistory;
