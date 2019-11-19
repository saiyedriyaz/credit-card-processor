import customer from '../core/customer';
import {expect} from 'chai';
import 'mocha';

describe('First test', () => {

    it('should return true', () => {
        const result = customer.helloTest();
        expect(result).to.equal(true);
    });

});