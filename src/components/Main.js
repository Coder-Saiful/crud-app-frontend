import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Create from './Create';
import Details from './Details';
import Edit from './Edit';
import Dashboard from './Dashboard';
import Menu from './Menu';
import ActiveStudents from './ActiveStudents';
import DeactiveStudents from './DeactiveStudents';

const Main = () => {
    return (
        <>
            <Menu />
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/create" exact component={Create} />
                <Route path="/view/:id" exact component={Details} />
                <Route path="/edit/:id" exact component={Edit} />
                <Route path="/active" exact component={ActiveStudents} />
                <Route path="/deactive" exact component={DeactiveStudents} />
            </Switch>
        </>
    );
};

export default Main;