class ValidationModel {
    constructor() {
        this.types = [
            'email',
            'text',
            'key',
            'number',
            'phonenumber',
            'password'
        ]
        this.errors = {}
        this.default = {
            type: 'text',
            required: true,
            name: 'Default'
        }
        this.iserror = false;
    }
    validate(valdata) {
        this.errors = {};
        this.iserror = false;
        if (typeof this.data === 'object') {
            Object.entries(this.data).forEach(([id, el]) => {
                el = Object.assign({}, this.default, el);
                try {
                    const val = valdata[id];
                    const name = el.name;
                    if (el.required) {
                        this.required(name, val);
                    } 
                    if (this.types.includes(el.type)) {
                        this.validateType(name, el, val);
                    }
                    if (el.valid) {
                        el.valid(valdata[id]);
                    }
                } catch (e) {
                    this.errors[id] = e.message;
                    this.iserror = (this.iserror) ? this.iserror : true;
                }
            });
        }
    }
    validateType(name, el, val) {
        switch(el.type) {
            case 'email': return this.email(name, val);
            case 'key': return this.key(name, val);
            case 'number': return this.number(name, val);
            case 'password': return this.password(name, val);
            default: return null;
        }
    }
    required(name, val) {
        if (!val) {
            throw new Error(`${name} is required`);
        }
    }
    email(name, val) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (val && !re.test(val.toLowerCase())) {
            throw new Error(`${name} field must be email. (Example: example@gmail.com)`);
        }
    }
    key(name, val) {
        if (val && val.length !== 64) {
            throw new Error(`${name} must have 64 symbols length`);
        }
    }
    number(name, val) {
        if (typeof val !== 'number') {
            throw new Error(`${name} must be a number. (Example: 3)`);
        }
    }
    phonenumber(name, val) {
        /* const re = /^38-[0-9]{3}-[0-9]{3}-[0-9]{4}$/
        if (val && !re.test(val)) {
            throw new Error(`${name} must be phone number. (Example: 38-111-111-1111)`);
        } */
    }
    password(name, val) {
        if (val && (val.length < 6 || val.length > 100)) {
            throw new Error(`${name} must be a string with a minimum length of 6 and a maximum length of 100.`);
        }
    }
    isError() {
        return this.iserror;
    }
    getErrors() {
        return this.errors;
    }
    setModel(data = {
        default: {
            type: 'text',
            required: true,
            valid: (value) => { },
        }
    }) {
        this.data = data;
    }
}

export default ValidationModel;