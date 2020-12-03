export default (state, action) => {
  switch (action.type) {
    case 'UPDATE_DESIRED':
      return {
        desiredGrade: action.payload,
      };
    case 'UPDATE_GRADES':
      return {
        grades: action.payload,
      };
    default:
      return state;
  }
};
