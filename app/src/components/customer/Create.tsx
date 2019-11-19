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
    submitError: boolean;
    loading: boolean;
    errors: { name: '', cardNumber: '', limit: '' },
}


class Create extends React.Component<RouteComponentProps, IFormState> {

    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            name: null,
            cardNumber: null,
            balance: '',
            limit: null,
            currency: '',
            values: [],
            loading: false,
            submitSuccess: false,
            submitError: false,
            errors: {name: '', cardNumber: '', limit: ''},
            allFieldsValid: false
        }

    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        function validateFormData(errors: { name: any, cardNumber: any, limit: any }, formData: { balance: any; name: any; limit: any; currency: any; cardNumber: any }) {
            let valid = true;
            if (formData.name == null || formData.name.length < 3) {
                errors.name = 'Name must be at least 3 characters long.'
                valid = false;
            } else if (formData.limit == null || formData.limit < 1) {
                errors.limit = 'Card limit must be greater than 0.'
                valid = false;
            } else if (formData.cardNumber == null || formData.cardNumber.length != 10) {
                errors.cardNumber = 'Card Number must be 10 characters long.'
                valid = false;
            }
            return valid;
        }

        const formData = {
            name: this.state.name,
            cardNumber: this.state.cardNumber,
            balance: this.state.balance,
            limit: this.state.limit,
            currency: this.state.currency,
        }


        if (validateFormData(this.state.errors, formData)) {
            console.info('Valid Form')
            this.setState({loading: true});

            this.setState({submitSuccess: true, values: [...this.state.values, formData], loading: false});
            axios.post(`http://localhost:3070/api/customers`, formData).then(data => [
                setTimeout(() => {
                    this.props.history.push('/');
                }, 1500)
            ]);
        } else {
            this.setState({submitError: true, errors: this.state.errors, loading: false});
            console.error('Invalid Form')
            console.error(this.state.errors.name);
        }
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    public render() {
        const {submitSuccess, submitError, loading} = this.state;
        return (
            <div>
                <div className={"form-wrapper"}>
                    <h2> Credit Card System </h2>
                    {!submitSuccess && !submitError && (
                        <h3> Add </h3>
                    )}

                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            The form was successfully submitted!
                        </div>
                    )}

                    {submitError && (
                        <div className="alert alert-info" role="alert">
                            {this.state.errors.name}
                            {this.state.errors.cardNumber}
                            {this.state.errors.limit}
                        </div>
                    )}

                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div>
                            <label htmlFor="name">Name </label><br/>
                            <input type="text" id="name" onChange={(e) => this.handleInputChanges(e)} name="name"
                                   placeholder="Enter customer's name" required/>
                        </div>
                        <br/>
                        <div>
                            <label htmlFor="cardNumber"> Card Number </label> <br/>
                            <input type="text" id="cardNumber" onChange={(e) => this.handleInputChanges(e)}
                                   name="cardNumber" className="form-control"
                                   placeholder="Enter card number" required/>
                        </div>
                        <br/>

                        <div>
                            <label htmlFor="limit"> Limit </label><br/>
                            <input type="limit" id="limit" onChange={(e) => this.handleInputChanges(e)} name="limit"
                                   className="form-control" placeholder="Enter card limit" required/>
                        </div>
                        <br/>
                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                                Add
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