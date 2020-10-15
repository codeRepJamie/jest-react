import React, {useState} from 'react';
import Counter from "../../components/NativeCounter/index";
import AntdCounter from "../../components/AntdCounter/index";
import logo from './logo.svg';
import './index.css'; 

function App() {

  const [counter1,changeCounter1] = useState(2)
  const [counter2,changeCounter2] = useState(3)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>   
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Counter num={counter1} onChange={ value => changeCounter1(value)}/>
        result: {counter1}
        <hr></hr>
        <AntdCounter num={counter2} onChange={ value => changeCounter2(value)}/>
        result: {counter2}
      </header>
    </div>
  );
}

export default App;