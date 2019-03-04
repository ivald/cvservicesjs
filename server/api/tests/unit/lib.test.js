const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('should return 0 if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {
        db.getCustomerSync = function(customerId) {
            console.log('Fake reading customer...');
            return {id: customerId, points: 20};
        };
        const order = {customerId: 1, totalPrice: 10};
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        db.getCustomerSync = function(customerId) {
            console.log('Fake reading customer...');
            return {id: customerId, email: 'email@fake.com'};
        };

        let mailSent = false;
        mail.send = function(email, message) {
            console.log('Fake email: ' + email + ', message: ' + message);
            mailSent = true;
        };

        lib.notifyCustomer({customerId: 1});

        expect(mailSent).toBe(true);
    });

    it('should send an email to the customer by jest fake fn', () => {
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'email@fake.com' });

        mail.send = jest.fn();

        lib.notifyCustomer({customerId: 1});

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('email@fake.com');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});
