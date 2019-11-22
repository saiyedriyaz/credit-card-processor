import React from "react";
import {render} from "@testing-library/react";
import Create, {FormProps} from "../components/customer/Create";

const defaultProps: FormProps = {
    onSubmit() {
        return;
    },
    submitSuccess: true,
    submitError: false,
    errors: []
};

const renderLoginForm = (props: Partial<FormProps>) => {
    return render(<Create {...defaultProps} {...props} />);
}

describe("<Create />", () => {
    test("should display a blank form", async () => {
        renderLoginForm({})
    });
});