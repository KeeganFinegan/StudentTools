import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial State
const initialState = {};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvidor = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions

  function updateGrades(grades) {
    dispatch({
      type: 'UPDATE_GRADES',
      payload: grades,
    });
  }

  function updateDesired(desiredGrade) {
    dispatch({
      type: 'UPDATE_DESIRED',
      payload: desiredGrade,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        grades: state.grades,
        desiredGrade: state.desiredGrade,
        updateGrades,
        updateDesired,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
