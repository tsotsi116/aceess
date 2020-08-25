require('dotenv').config();
const cheerio = require('cheerio');
const request = require('request');

const got = require('got');

class Main {
    constructor() {
        this.phone = process.env.phonenumber;
        this.password = process.env.password;
        this.sessid = null;
        this.expires = null;
    }

    async init() {
        await request.post('https://access.mw/', {
            form: {
                phonenumber: this.phone,
                password: this.password
            }
        }, (err, res, body) => {
            let cookie = res.headers['set-cookie'][0];
            cookie = cookie.split(';');
            this.expires = cookie[1].split('=')[1];
            this.sessid = cookie[0].split('=')[1];
        });
    }
}

app = new Main();
app.init();
