import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import { forwardRef } from 'react';
import TextField from '@material-ui/core/TextField';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { fetchGradeData } from '../api/index';
import '../App.css';
import axios from 'axios';

const url = 'http://localhost:1337/grades';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function scoreToGrade(score) {
  if (score) {
    const scoreArray = score.includes('/') ? score.split('/') : [1, 1];
    const output = ((scoreArray[0] / scoreArray[1]) * 100).toFixed(2);

    return output;
  } else {
    return 0;
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: '#ffffff',
    boxShadow: '0 3px 5px 2px rgba(0,0,0,0.2)',
  },
}));

const InputTable = () => {
  const [desired, setDesired] = useState(50);
  const [weight, setWeight] = useState(60);
  const [currentGrade, setCurrentGrade] = useState();
  const [gradeNeeded, setGradeNeeded] = useState();
  const [maxGrade, setMaxGrade] = useState();
  const [minGrade, setMinGrade] = useState();
  const [grades, setGrades] = useState([]);
  const [gradeForm, setGradeForm] = useState([]);
  const classes = useStyles();
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const columns = [
    { tite: 'id', field: 'id', hidden: 'true' },
    { tite: 'created_at', field: 'created_at', hidden: 'true' },
    { tite: 'updated_at', field: 'updated_at', hidden: 'true' },
    {
      title: 'Item Name',
      field: 'assessement',
      cellStyle: {
        width: 300,
        minWidth: 300,
      },
    },
    { title: 'Score', field: 'score' },
    { title: 'Grade %', field: 'grade', type: 'numeric', editable: 'never' },
    { title: 'Weight %', field: 'weight', type: 'numeric' },
  ];

  const handleChange = (event) => {
    setDesired(event.target.value);
  };

  const handleRowAdd = (newData, resolve) => {
    //no error
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assessement: newData.assessement,
        score: newData.score,
        grade: newData.grade,
        weight: newData.weight,
      }),
    })
      .then((res) => {
        let dataToAdd = [...grades];
        dataToAdd.push(newData);
        setGrades(dataToAdd);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(['Cannot add data. Server error!']);
        setIserror(true);
        resolve();
      });
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
    fetch(url + '/' + newData.id, {
      method: 'PUT',
      body: JSON.stringify({
        assessement: newData.assessement,
        score: newData.score,
        grade: newData.grade,
        weight: newData.weight,
      }),
    }).then((res) => {
      const dataUpdate = [...grades];
      const index = oldData.tableData.id;
      dataUpdate[index] = newData;
      setGrades([...dataUpdate]);
      resolve();
      setIserror(false);
      setErrorMessages([]);
    });
  };
  const handleRowDelete = (oldData, resolve) => {
    fetch(url + '/' + oldData.id, {
      method: 'DELETE',
    })
      .then((res) => {
        const dataDelete = [...grades];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setGrades([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(['Delete failed! Server error']);
        setIserror(true);
        resolve();
      });
  };

  const fetchData = () => {
    fetch(`http://localhost:1337/grades`)
      .then((res) => res.json())
      .then((json) => setGrades(json));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const weights = grades.map((grade) => {
      if (+grade.weight > 0) {
        return +grade.weight;
      } else {
        return 0;
      }
    });
    const totalWeight = weights
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);

    const finalWeight = 100 - totalWeight;

    const weightedScore = grades.map((grade) => {
      if (+grade.weight) {
        return +grade.weight * +grade.grade;
      } else {
        return 0 * +grade.grade;
      }
    });
    const currentTotal = +(
      weightedScore.reduce((acc, item) => (acc += item), 0) / +totalWeight
    ).toFixed(2);

    const w = finalWeight / 100;

    const needed = +((desired - (1 - w) * currentTotal) / w).toFixed(2);

    const maxGrade = +(100 * w + (1 - w) * currentTotal).toFixed(2);

    const minGrade = +(0 * w + (1 - w) * currentTotal).toFixed(2);

    isNaN(minGrade) ? setMinGrade(0) : setMinGrade(minGrade);

    isNaN(maxGrade) ? setMaxGrade(0) : setMaxGrade(maxGrade);

    setWeight(finalWeight);

    isNaN(currentTotal) ? setCurrentGrade(0) : setCurrentGrade(currentTotal);

    isNaN(needed) ? setGradeNeeded(0) : setGradeNeeded(needed);
  }, [desired, grades]);

  return (
    <div className="grid-container">
      <div className="table-container">
        <MaterialTable
          localization={{
            header: {
              actions: '',
            },
            body: {
              editRow: {
                deleteText: 'Are you sure',
              },
              emptyDataSourceMessage: 'Please enter your current grades',
            },
          }}
          icons={tableIcons}
          title="Assessement Items"
          columns={columns}
          data={grades}
          options={{
            rowStyle: (rowData) => ({
              //backgroundColor: rowData.grade >= 50 ? '#9dff9d' : '#ff7676',
              backgroundColor: '#4CBCF4',
              color: '#000000',
              fontFamily: 'arial',
              fontSize: '15px',
            }),
            // headerStyle: {
            //   backgroundColor: '#64BCD3',
            // },
            filtering: false,
            search: false,
            grouping: false,
            sorting: false,
            paging: false,
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                newData.grade = scoreToGrade(newData.score);
                handleRowAdd(newData, resolve);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                newData.grade = scoreToGrade(newData.score);
                handleRowUpdate(newData, oldData, resolve);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                handleRowDelete(oldData, resolve);
              }),
          }}
        />
      </div>

      <div className="desired-grade">
        <TextField
          value={desired}
          id="standard-basic"
          variant="standard"
          label="Desired Grade %"
          onChange={handleChange}
        />
      </div>

      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem>
            <ListItemText>
              Current Grade: <b>{currentGrade}%</b>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              Weight of Final: <b>{weight}%</b>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              Grade Needed on Final: <b>{gradeNeeded}%</b>
            </ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List component="nav" aria-label="main mailbox folders">
          <ListItem>
            <ListItemText>
              Minimum Grade: <b>{minGrade}%</b>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              Maximum Grade: <b>{maxGrade}%</b>
            </ListItemText>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default InputTable;
