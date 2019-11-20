import * as React from 'react';
import './App.css';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import Create, {IValues} from './components/customer/Create';
import Table from "./components/customer/Table";
import axios from "axios";

interface IState {
    customers: any[];
}

class App extends React.Component<RouteComponentProps<any>, IState> {

    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            customers: []
        }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:3070/api/customers`).then(data => {
            this.setState({customers: data.data})
        })
    }

    public postData = (formData: IValues) => {
        axios.post(`http://localhost:3070/api/customers`, formData).then((response) => {
            //this.setState({customers: customers})
            this.setState({customers: response.data})
        }).catch(error => {
            console.log(error);
        });
    }


    public render() {
        console.log('rerender');
        return (
            <div>
                <Create onSubmit={this.postData}/>
                <Table customers={this.state.customers}/>
            </div>
        );
    }

}

export default withRouter(App);