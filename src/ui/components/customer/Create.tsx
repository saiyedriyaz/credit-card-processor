import * as React from 'react';
import axios from 'axios';
import {RouteComponentProps, withRouter} from 'react-router-dom';

export interface IValues {
    name: string,
    cardNumber: string,
    balance: string,
    limit: string,
    currency: string,
}

export interface IFormState {
    [key: string]: any;

    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class Create extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            name: '',
            cardNumber: '',
            balance: '',
            limit: '',
            currency: '',
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({loading: true});

        const formData = {
            name: this.state.name,
            cardNumber: this.state.cardNumber,
            balance: this.state.balance,
            limit: this.state.limit,
            currency: this.state.currency,
        }

        this.setState({submitSuccess: true, values: [...this.state.values, formData], loading: false});

        axios.post(`http://localhost:5000/customers`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        ]);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    public render() {
        const {submitSuccess, loading} = this.state;
        return (
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Create Post </h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Fill the form below to create a new post
                        </div>
                    )}

                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            The form was successfully submitted!
                        </div>
                    )}

                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="name">Name </label>
                            <input type="text" id="name" onChange={(e) => this.handleInputChanges(e)} name="name"
                                   className="form-control" placeholder="Enter customer's name"/>
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="cardNumber"> Last Name </label>
                            <input type="text" id="cardNumber" onChange={(e) => this.handleInputChanges(e)}
                                   name="cardNumber" className="form-control"
                                   placeholder="Enter customer's cardNumber"/>
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="limit"> Email </label>
                            <input type="limit" id="limit" onChange={(e) => this.handleInputChanges(e)} name="limit"
                                   className="form-control" placeholder="Enter customer's limit"/>
                        </div>

                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                                Create Customer
                            </button>
                            {loading &&
                            <span className="fa fa-circle-o-notch fa-spin"/>
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Create)