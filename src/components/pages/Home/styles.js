export const styles = theme => ({
  '@global': {
    'html, body': {
      margin: 0,
      padding: 0,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    '.mapboxgl-ctrl-bottom-right': {
      display: 'none',
    },
    '.mapboxgl-canvas': {
      outline: 0,
    },
  },
  root: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },
  leftBar: {
    minWidth: 300,
    maxWidth: 300,
    height: '100vh',

    paddingLeft: 5,
    paddingRight: 5,
  },
  map: {
    flex: '1 0 auto',
    width: 'calc(100% - 300px)',
  },
  trails: {
    overflow: 'auto',
    height: '100%',
  },
  trailsContainer: {
    height: 'calc(100% - 50px)',
  },
  leftBarContainer: {
    height: '100%',
  },
});
