import * as bodyParser from "body-parser";
import * as express from "express";
import {Logger} from "../logger/logger";

const {check, validationResult, body} = require('express-validator');
const luhn = require("luhn");

class Customer {

    public express: express.Application;
    public logger: Logger;

    // array to hold customers
    public customers: any[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.customers = [{
            name: "Alice",
            cardNumber: "1111 2222 3333 4444",
            balance: "1045",
            limit: "2000",
            currency: "$"
        }];
        this.logger = new Logger();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private routes(): void {
        // request to get all the customers
        this.express.get("/customers", (req, res, next) => {
            this.logger.info("url:::::::" + req.url);
            res.json(this.customers);
        });

        // request to get all the customers by name
        this.express.get("/customers/:name", (req, res, next) => {
            this.logger.info("url:::::::" + req.url);
            const customer = this.customers.filter(function (customer) {
                if (req.params.name === customer.name) {
                    return customer;
                }
            });
            res.json(customer);
        });

        // request to post the customer
        this.express.post("/customers", [
                check('cardNumber')
                    .isNumeric().withMessage('Must be only numeric chars')
                    .isLength({min: 10, max: 10}).withMessage('Must be of 10 chars')
                    .custom(input => {
                        if (!luhn.validate(input)) {
                            throw new Error("Not valid as per LUHN");
                        }
                        return true;
                    })
            ],
            (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({errors: errors.array()});
                }
                this.logger.info("url:::::::" + req.url);
                req.body.balance = 0;
                this.customers.push(req.body);
                res.json(this.customers);
            });
    }
}

export default new Customer().express;