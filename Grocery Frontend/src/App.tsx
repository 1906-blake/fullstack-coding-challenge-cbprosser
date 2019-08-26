import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import NotFoundComponent from './components/NotFountComponent/NotFoundComponent';
import ListsComponent from './components/ListsComponent/ListsComponent';
import SingleListComponent from './components/SingleListComponent/SingleListComponent';

function App() {
  return (

    <BrowserRouter>
      <Row>
        <Col sm="3" md="2" className="d-none d-sm-none d-sm-block"></Col>
        <Col id="main-row" className="bg-light text-center">
          <Switch>
            <Route path="/" component={ListsComponent} />
            <Route path="/items" component={SingleListComponent} />
            <Route component={NotFoundComponent} />
          </Switch>
        </Col>
        <Col className="col-2 d-none d-sm-none d-md-block"></Col>
      </Row>
    </BrowserRouter>
  );
}

export default App;
