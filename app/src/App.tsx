import * as React from 'react';
import './App.css';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import Create from './components/customer/Create';
import Table from "./components/customer/Table";

class App extends React.Component<RouteComponentProps<any>> {


    public render() {
        return (
            <div>
                <Create/>
                <Table/>
            </div>
        );
    }
}

export default withRouter(App);