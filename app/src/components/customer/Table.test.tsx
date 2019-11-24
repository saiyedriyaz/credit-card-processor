import * as React from 'react';
import {shallow} from "enzyme";
import Table from "./Table";


it('renders the empty table', () => {
    const wrapper = shallow(<Table customers={[]}/>);
    expect(wrapper.find('h2').text()).toBe('Existing Cards');
});