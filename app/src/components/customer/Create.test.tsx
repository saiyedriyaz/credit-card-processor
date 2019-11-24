import * as React from 'react';
import {shallow} from "enzyme";
import Create from "./Create";

it('renders the form', () => {
    const wrapper = shallow(<Create errors={[]} submitSuccess={false} submitError={false}/>);
    expect(wrapper.find('h2').text()).toBe('Credit Card System');
});
