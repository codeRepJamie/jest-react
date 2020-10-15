import React  from 'react';
import { Radio } from 'antd';
import { Link, Route, useLocation, BrowserRouter,Switch } from 'react-router-dom'
import Home from "./pages/Home/index";
import Remote from "./pages/Remote/index";
import TestForm from "./pages/TestForm/index";

function Navigator() {
  let location = useLocation();
  return (
    <Radio.Group value={location.pathname}>
      <Link to="/"><Radio.Button value="/">简单测试</Radio.Button></Link>
      <Link to="/remote"><Radio.Button value="/remote">远程接口测试</Radio.Button></Link>
      <Link to="/testForm"><Radio.Button value="/testForm">表单填写测试</Radio.Button></Link>
    </Radio.Group>
  )
}

function App() {

  return (
    <BrowserRouter>
      <Navigator />
      <Switch>        
        <Route path="/remote" component={Remote} />
        <Route path="/testForm" component={TestForm} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
