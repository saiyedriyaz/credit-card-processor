import * as React from 'react';
import axios from 'axios';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import './Create.css'

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
    errors: { name?: string, cardNumber?: string, limit?: string },
}
interface FormProps {
    onSubmit: (formData: IValues) => void;
}

class Create extends React.Component<FormProps, IFormState> {

    constructor(props: FormProps) {
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

    validateFormData = (formData: { balance: any; name: any; limit: any; currency: any; cardNumber: any }) => {
        let valid = true;
        const errorResult: { name?: any, cardNumber?: any, limit?: any } = {};
        if (formData.name == null || formData.name.length < 3) {
            errorResult.name = 'Name must be at least 3 characters long.'
            valid = false;
        }
        if (formData.limit == null || formData.limit < 1) {
            errorResult.limit = 'Card limit must be greater than 0.'
            valid = false;
        }
        if (formData.cardNumber == null || formData.cardNumber.length != 10) {
            errorResult.cardNumber = 'Card Number must be 10 characters long.'
            valid = false;
        }
        this.setState({errors: errorResult});
        return valid;
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const { onSubmit } = this.props;
        const formData = {
            name: this.state.name,
            cardNumber: this.state.cardNumber,
            balance: this.state.balance,
            limit: this.state.limit,
            currency: this.state.currency,
        }

        if (this.validateFormData(formData)) {
            console.info('Valid Form')
            this.setState({loading: true});

            this.setState({submitSuccess: true, values: [...this.state.values, formData], loading: false});

            onSubmit(formData);

        } else {
            this.setState({submitError: true, loading: false});
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
                        <div className="success">
                            The form was successfully submitted!
                        </div>
                    )}

                    {submitError && (
                        <div>
                            <div className="error">
                                {this.state.errors.name}
                            </div>
                            <div className="error">
                                {this.state.errors.cardNumber}
                            </div>
                            <div className="error">
                                {this.state.errors.limit}
                            </div>
                        </div>
                    )}

                    <form onSubmit={this.processFormSubmission} noValidate={true}>
                        <div>
                            <label htmlFor="name">Name </label><br/>
                            <input type="text" id="name" onChange={(e) => this.handleInputChanges(e)} name="name"
                                   placeholder="Enter customer's name" required/>
                        </div>
                        <br/>
                        <div>
                            <label htmlFor="cardNumber"> Card Number </label> <br/>
                            <input type="text" id="cardNumber" onChange={(e) => this.handleInputChanges(e)}
                                   name="cardNumber" placeholder="Enter card number" required/>
                        </div>
                        <br/>

                        <div>
                            <label htmlFor="limit"> Limit </label><br/>
                            <input type="limit" id="limit" onChange={(e) => this.handleInputChanges(e)} name="limit"
                                   placeholder="Enter card limit" required/>
                        </div>
                        <br/>
                        <div>
                            <button className="button" type="submit">
                                Add
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

export default Create