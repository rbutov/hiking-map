import {getDefaultSettings} from '../helpers/hiking';

const initialState = {
  trails: [],
  history: [],
  settings: getDefaultSettings(),
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_IS_DARK': {
      return {
        ...state,
        settings: {...state.settings, isDark: !state.settings.isDark},
      };
    }
    case 'UPDATE_POSITION': {
      return {
        ...state,
        settings: {...state.settings, zoom: action.zoom, center: action.center},
      };
    }
    case 'SET_TRAILS': {
      return {...state, trails: action.trails};
    }
    case 'ADD_TRAIL': {
      if (!state.trails.some(t => t.id === action.trail.id)) {
        return {...state, trails: [...state.trails, action.trail]};
      }
      return state;
    }
    case 'ADD_HISTORY': {
      if (!state.history.some(h => h.id === action.trail.id)) {
        return {...state, history: [...state.history, action.trail]};
      }
      return state;
    }
    default:
      return state;
  }
};

export default appReducer;
