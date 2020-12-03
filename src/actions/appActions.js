export const setTrails = trails => ({
  type: 'SET_TRAILS',
  trails,
});

export const addTrails = trail => ({
  type: 'ADD_TRAIL',
  trail,
});

export const addHistory = trail => ({
  type: 'ADD_HISTORY',
  trail,
});

export const toggleIsDark = () => ({
  type: 'TOGGLE_IS_DARK',
});

export const updatePosition = ({center, zoom}) => ({
  type: 'UPDATE_POSITION',
  center,
  zoom,
});
