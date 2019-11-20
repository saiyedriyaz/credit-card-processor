import 'mocha';
import * as chai from 'chai';
import app from "../app";
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;
const assert = chai.assert;
describe('Create New Customer SUCCESS', () => {
    it('Create', (done) => {
        chai.request(app).post('/api/customers')
            .send({
                "name": "Riyaz",
                "cardNumber": "4702924285",
                "balance": "1045",
                "limit": "10",
                "currency": "$"
            })
            .then((res: any) => {
                console.log(res.body)
                chai.expect(res.status).to.eql(200);
                chai.assert(res.body.filter(x => x.name == 'Riyaz').length > 0)
                done();
            });
    }).timeout(1000);
});

describe('Create New Customer INVALID INPUT', () => {
    it('Create', (done) => {
        chai.request(app).post('/api/customers')
            .send({
                "name": "Riyaz",
                "cardNumber": "1111",
                "balance": "-1",
                "limit": "10",
                "currency": "$"
            })
            .then((res: any) => {
                console.log(res.status)
                chai.expect(res.status).to.eql(422);
                chai.assert(res.body.errors.filter(x => x.param == 'cardNumber').filter(x => x.msg = 'Not valid as per LUHN').length > 0)
                done();
            });
    }).timeout(1000);
});