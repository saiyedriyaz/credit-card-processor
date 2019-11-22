import * as React from 'react';
import './Create.css'

export interface FormData {
    name: string,
    cardNumber: string,
    balance: string,
    limit: string,
    currency: string,
}

export interface FormState {
    [key: string]: any;

    customers: FormData[];
}

export interface FormProps {
    onSubmit: (formData: FormData) => void;
    errors: any[];
    submitSuccess: boolean;
    submitError: boolean;
}

class Create extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {
            name: null,
            cardNumber: null,
            balance: '',
            limit: null,
            currency: '',
            customers: [],
            allFieldsValid: false
        }
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const {onSubmit} = this.props;
        const formData = {
            name: this.state.name,
            cardNumber: this.state.cardNumber,
            balance: this.state.balance,
            limit: this.state.limit,
            currency: this.state.currency,
        }

        onSubmit(formData);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    public render() {
        const {submitSuccess, submitError, errors} = this.props;

        let errorDiv: any[] = []
        if (errors.length > 0) {
            for (let error of errors) {
                errorDiv.push(<div className="error"> {error} </div>);
            }
        }
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
                            {errorDiv}
                        </div>
                    )}

                    <form onSubmit={this.processFormSubmission} noValidate={true}>
                        <div>
                            <label htmlFor="name">Name </label><br/>
                            <input type="text" id="name" onChange={(e) => this.handleInputChanges(e)} name="name"
                                   placeholder="Enter customer's name" required/>
                        </div>
                        <div>
                            <label htmlFor="cardNumber"> Card Number </label> <br/>
                            <input type="number" id="cardNumber" onChange={(e) => this.handleInputChanges(e)}
                                   name="cardNumber" placeholder="Enter card number" required/>
                        </div>

                        <div>
                            <label htmlFor="limit"> Limit </label><br/>
                            <input type="limit" id="limit" onChange={(e) => this.handleInputChanges(e)} name="limit"
                                   placeholder="Enter card limit" required/>
                        </div>
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