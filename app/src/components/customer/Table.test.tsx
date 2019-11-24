import * as React from 'react';
import {shallow} from "enzyme";
import Table from "./Table";

const customersData = [{
    id: 1,
    name: "Alice",
    cardNumber: "1111 2222 3333 4444",
    balance: -1045,
    limit: "2000",
    currency: "$"
}];

it('renders the empty table', () => {
    const wrapper = shallow(<Table customers={[]}/>);
    expect(wrapper.find('h2').text()).toBe('Existing Cards');
});

it('renders the table with data', () => {
    const wrapper = shallow(<Table customers={customersData}/>);
    expect(wrapper.find('#tableDataDiv').html()).toContain('<td>Alice</td>');
});