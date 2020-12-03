export const styles = _ => ({
  root: {
    display: 'flex',
    height: 100,
    marginBottom: 5,
  },
  details: {
    width: 'calc(100% - 100px)',
    position: 'relative',
  },
  content: {
    padding: 5,
  },
  cover: {
    width: 100,
    flex: 'none',
    background: '#e0e0e0',
  },
  link: {
    textDecoration: 'none',
  },
  title: {
    fontSize: 14,
    clear: 'both',
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    height: 16,
    textOverflow: 'ellipsis',
    width: '100%',
  },
  location: {
    fontSize: 10,
    color: '#949090',
    marginBottom: 3,
  },
  stars: {
    position: 'absolute',
    right: 3,
    bottom: 3,
  },
  length: {
    fontSize: 12,
    paddingRight: 7,
  },
  lengthContainer: {
    display: 'flex',
  },
  difficulty: {
    fontSize: 10,
    fontWeight: 'bold',
    position: 'absolute',
    left: 3,
    bottom: 7,
    textTransform: 'uppercase',
  },
});
