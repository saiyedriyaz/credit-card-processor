import * as React from 'react';
import {shallow} from "enzyme";
import Create, {FormData} from "./Create";

const fakePost = (formData: FormData) => {
}

it('renders the form', () => {
    const wrapper = shallow(<Create errors={[]} submitSuccess={false} submitError={false} onSubmit={fakePost}/>);
    expect(wrapper.find('h2').text()).toBe('Credit Card System');
});

it('renders the form with error message 1', () => {
    const wrapper = shallow(<Create errors={['Test Message']} submitSuccess={false} submitError={true} onSubmit={fakePost}/>);
    expect(wrapper.find('#errorDiv').html()).toContain('Test Message');
});