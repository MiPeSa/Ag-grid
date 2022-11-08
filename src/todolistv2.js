import React, { useState } from 'react';
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import { useRef } from 'react';

function Todolistv2() {

const columns = [
    { headerName: "Description", field: "description" , floatingFilter:true, filter: "agTextColumnFilter"},
    { headerName: "Date", field: "date" , floatingFilter:true, filter: 'agTextColumnFilter'},
    { headerName: "Priority", field: "priority" , floatingFilter:true, filter: 'agTextColumnFilter',
        cellStyle: params => params.value === "high" ? {color: 'red'} : {color: 'black'}}
]


  const [todo, setTodo] = useState({description: '', date: '', priority:''});
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

  return (
    <div>
      <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description}/>
      <input type="text" onChange={inputChanged} placeholder="Date" name="date" value={todo.date}/>
      <input type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.priority}/>
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>
   
       <div className="ag-theme-material"
       style={{height: '700px', width: '60%', margin: 'auto'}} >
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