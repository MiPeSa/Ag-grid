import React, { useState } from 'react';
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import { useRef } from 'react';
import Button from'@mui/material/Button';
import TextField from'@mui/material/TextField';
import Stack from'@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers';

function Todolistv2() {

const columns = [
    { headerName: "Description", field: "description" , floatingFilter:true, filter: "agTextColumnFilter"},
    { headerName: "Date", field: "date" , floatingFilter:true, filter: 'agTextColumnFilter', width: "270px"},
    { headerName: "Priority", field: "priority" , floatingFilter:true, filter: 'agTextColumnFilter',
        cellStyle: params => params.value === "high" ? {color: 'red'} : {color: 'black'}}
]


  const [todo, setTodo] = useState({description: '', date: (null), priority:''});
  const [todos, setTodos] = useState([]);

  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = (event) => {
    setTodos([...todos, todo]);
  }

  const deleteTodo = () => {
    if(gridRef.current.getSelectedNodes().length > 0){
        setTodos(todos.filter((todo, index) =>  
            index !== gridRef.current.getSelectedNodes()[0].childIndex))
    }
    else {
        alert('Select row first');
    }
  }

  const changeDate = (date) => {
    setTodo({...todo, date})
  }


  return (
    <div>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" paddingTop="30px">
        <TextField label="Description" variant="standard" onChange={inputChanged}  name="description" value={todo.description}/>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label="Date" 
            variant="standard"
            name="date"
            value={todo.date}
            onChange={date => changeDate(date)}
          renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField label="Priority" variant="standard" onChange={inputChanged}  name="priority" value={todo.priority}/>
        <Button onClick={addTodo} variant="contained" >Add</Button>
        <Button onClick={deleteTodo}>Delete</Button>
      </Stack>
       <div className="ag-theme-material"
       style={{height: '700px', width: '40%', margin: 'auto',}} >
       <AgGridReact
            ref={gridRef}
            onGridReady={ params => gridRef.current = params.api }
            rowSelection="single" 
            columnDefs={columns}
            rowData={todos}
            animateRows={true}
       ></AgGridReact>
        </div>
   </div>
  );
};

export default Todolistv2;