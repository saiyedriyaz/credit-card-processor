import * as React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import axios from 'axios';
import './Table.css'

interface TableProps {
    customers: any[];
}

class Table extends React.Component<TableProps> {
    public render() {
        const {customers} = this.props;
        return (
            <div className={"form-wrapper"}>
                <div className="text-center">
                    <h2>Existing Cards</h2>
                </div>

                <div>
                    <div>
                        <table>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Card Number</th>
                                <th scope="col">Balance</th>
                                <th scope="col">Limt</th>
                            </tr>
                            <tbody>
                            {customers && customers.map(customer =>
                                <tr key={customer.name}>
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

export default Table