import * as React from 'react';
import './App.css';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import Create, {IValues} from './components/customer/Create';
import Table from "./components/customer/Table";
import axios from "axios";

interface IState {
    customers: any[];
    errors: any[];
    submitSuccess: boolean;
    submitError: boolean;
}

class App extends React.Component<RouteComponentProps<any>, IState> {

    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            customers: [],
            errors: [],
            submitSuccess: false,
            submitError: false
        }
    }

    public componentDidMount = () => {
        axios.get(`http://localhost:3070/api/customers`).then(data => {
            this.setState({customers: data.data})
        })
    }

    public postData = (formData: IValues) => {
        const messages = this.validateFormData(formData);
        let valid = messages.length == 0;
        if (valid) {
            axios.post(`http://localhost:3070/api/customers`, formData).then((response) => {
                this.setState({customers: response.data})
            }).catch(error => {
                let messages: String[] = [];
                for (const val of error.response.data.errors) {
                    console.log(val)
                    messages.push(val.param + " " + val.msg)
                }
                this.handleUpdate({errors: messages, submitSuccess: false, submitError: true})
            });
        } else {
            //this.setState({submitError: true, loading: false});
            this.handleUpdate({errors: messages, submitSuccess: false, submitError: true})
            console.error('Invalid Form')
        }
    }

    public handleUpdate = (result: any) => {
        this.setState(result);
    }


    public render() {
        console.log('rerender');
        return (
            <div>
                <Create onSubmit={this.postData} errors={this.state.errors} submitSuccess={this.state.submitSuccess} submitError={this.state.submitError} />
                <Table customers={this.state.customers}/>
            </div>
        );
    }

    validateFormData = (formData: { balance: any; name: any; limit: any; currency: any; cardNumber: any }) => {
        let errorResult: String[] = [];
        if (formData.name == null || formData.name.length < 3) {
            errorResult.push('Name must be at least 3 characters long.')
        }
        if (formData.limit == null || formData.limit < 1) {
            errorResult.push('Card limit must be greater than 0.')
        }
        if (formData.cardNumber == null || formData.cardNumber.length != 10) {
            errorResult.push('Card Number must be 10 characters long.')
        }
        // this.setState({errors: errorResult});
        return errorResult;
    }

}

export default withRouter(App);