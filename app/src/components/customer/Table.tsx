import * as React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import axios from 'axios';

interface IState {
    customers: any[];
}

class Table extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {customers: []}
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:3070/api/customers`).then(data => {
            this.setState({customers: data.data})
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.customers[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    public render() {
        const customers = this.state.customers;
        return (
            <div className={"form-wrapper"}>
                <div className="text-center">
                    <h2>Existing Cards</h2>
                </div>

                <div className="table">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Card Number</th>
                                <th scope="col">Balance</th>
                                <th scope="col">Limt</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customers && customers.map(customer =>
                                <tr key={customer.id}>
                                    <td>{customer.name}</td>
                                    <td>{customer.cardNumber}</td>
                                    <td>{customer.balance}</td>
                                    <td>{customer.limit}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(Table)