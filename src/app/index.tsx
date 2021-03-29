import React from 'react';
import  Board  from './board/Board';
import  Footer  from './footer';


import './app.css';

const App: React.FunctionComponent  = () => {
    return <div className="App">
        <header className="App-header">
            <h1>Customizable Kanban Board</h1>
        </header>
        <main><Board /></main>
        <Footer/>
    </div>
};

export default App;
