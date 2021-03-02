import React from 'react';
import  Board  from './board';


import './app.css';

const App = () => {
    const dispatch = useDispatch();
    return <div className="App">
        <header className="App-header">
            <Board />
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <span>
                <span>Learn </span>
                <a className="App-link" href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                    React
                </a>
                <span>, </span>
                <a className="App-link" href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">
                    Redux
                </a>
                <span>, </span>
                <a className="App-link" href="https://redux-toolkit.js.org/" target="_blank" rel="noopener noreferrer">
                    Redux Toolkit
                </a>
                ,<span> and </span>
                <a className="App-link" href="https://react-redux.js.org/" target="_blank" rel="noopener noreferrer">
                    React Redux
                </a>
            </span>
        </header>
    </div>
};

export default App;