import React, { useState } from "react";
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import Todolistv2 from './todolistv2';

function TabApp() {

    const [value, setValue] = useState('one');

    const handleChange = (event, value) => { 
        setValue(value);
    };

    return (
    <div>
        <Tabs centered value={value} onChange={handleChange}>
            <Tab value="one" label="Home" />
            <Tab value="two" label="Todos" />
        </Tabs>
        {value === 'one' && 
        <div className="hometext">
            <h1>Welcome to the home page!</h1>
            <h3>check out the "TODOS" page</h3>
        </div>}
        {value === 'two' && <div><Todolistv2 /></div>}
    </div>
    );
}

export default TabApp;