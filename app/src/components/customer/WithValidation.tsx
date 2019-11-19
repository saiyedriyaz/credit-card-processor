import * as React from "react";

type ValueType = string | number | string[];
type ValidatorType = (value?: ValueType) => string | undefined;

interface RequiredInputProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    error?: string;
    value?: ValueType;
}

interface ValidatedInputState {
    finalized: boolean;
}

function withValidation<InputProps extends RequiredInputProps>(
    InputComponent: React.ComponentType<InputProps>,
    validators: ValidatorType[] = []
) {
    return class InputWithValidation extends React.Component<InputProps,
        ValidatedInputState> {
        state: ValidatedInputState = {
            finalized: false
        };
        handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({finalized: false});
            if (this.props.onChange) {
                this.props.onChange(e);
            }
        };
        handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            this.setState({finalized: true});
            if (this.props.onBlur) {
                this.props.onBlur(e);
            }
        };

        render() {
            const {error, value} = this.props;
            const firstInvalidValidator = validators.find(
                validate => !!validate(value)
            );
            const validationError =
                this.state.finalized && firstInvalidValidator
                    ? firstInvalidValidator(value)
                    : undefined;
            return (
                <InputComponent
                    {...this.props}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    error={error || validationError}
                />
            );
        }
    };
}

export default withValidation;