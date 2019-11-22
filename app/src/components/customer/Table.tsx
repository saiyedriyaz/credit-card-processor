import * as React from 'react';
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
                                <th scope="col">Limit</th>
                            </tr>
                            <tbody>
                            {customers && customers.map(customer =>
                                <tr key={customer.id}>
                                    <td>{customer.name}</td>
                                    <td>{customer.cardNumber}</td>
                                    <td className={this.getCellStyleClass(customer)}>{customer.currency}{customer.balance}</td>
                                    <td>{customer.currency}{customer.limit}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                </div>

            </div>
        )
    }

    getCellStyleClass = (customer: any) => {
        if (customer.balance < 1) {
            return "red";
        }
    }
}

export default Table