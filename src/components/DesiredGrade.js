import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import TextField from '@material-ui/core/TextField';

const Total = () => {
  const { desiredGrade } = useContext(GlobalContext);
  const { updateDesired } = useContext(GlobalContext);

  const handleChange = (event) => {
    updateDesired(event.target.value);
  };

  return (
    <div>
      <TextField
        value={desiredGrade}
        type="number"
        id="standard-basic"
        label="Desired Grade"
        onChange={handleChange}
      />
    </div>
  );
};

export default Total;
