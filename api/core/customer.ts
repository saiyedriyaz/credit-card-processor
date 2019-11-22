import * as bodyParser from "body-parser";
import * as express from "express";
import {Logger} from "../logger/logger";

const {check, validationResult, body} = require('express-validator');
const luhn = require("luhn");

class Customer {

    public express: express.Application;
    public logger: Logger;
    public defaultCurrency: String = "£"
    public customers: ({ balance: number; name: string; limit: string; currency: String; id: number; cardNumber: string })[];

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.customers = this.fetchDataFromStore();
        this.logger = new Logger();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private routes(): void {
        this.express.get("/customers", (req, res, next) => {
            this.logger.info("url:::::::" + req.url);
            res.json(this.customers);
        });

        this.express.get("/customers/:name", (req, res, next) => {
            this.logger.info("url:::::::" + req.url);
            const customer = this.customers.filter(function (customer) {
                if (req.params.name === customer.name) {
                    return customer;
                }
            });
            res.json(customer);
        });

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
                    .custom(input => {
                        const existingCustomer = this.customers.filter(function (hero) {
                            return hero.cardNumber == input;
                        });

                        this.logger.info("input.cardNumber=" + input)
                        this.logger.info("marvelHeroes=" + existingCustomer)

                        if (existingCustomer.length > 0) {
                            const e1 = new Error();
                            e1.name = "Card Number";
                            e1.message = "Customer with card number already exists"
                            throw e1;
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
                req.body.id = new Date().getTime();
                req.body.balance = 0;
                this.customers.push(req.body);
                res.json(this.customers);
            });
    }

    fetchDataFromStore = () => {
        this.customers = [];
        return [{
            id: 1,
            name: "Alice",
            cardNumber: "1111 2222 3333 4444",
            balance: -1045,
            limit: "2000",
            currency: this.defaultCurrency
        }, {
            id: 2,
            name: "Bob",
            cardNumber: "4444 3333 2222 1111",
            balance: 10.24,
            limit: "5000",
            currency: this.defaultCurrency
        }]
    }
}

export default new Customer().express;