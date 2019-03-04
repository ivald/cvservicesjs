process.env.NODE_ENV = 'testing';

const {User} = require('../../models/user');
const request = require('supertest');
const app = require('../../../server');

describe('/public/', () => {
    beforeEach(async () => {
        await require('../../models/db').sequelize.sync();
    });

    afterEach(() => {
    });

    describe('GET /', () => {
        it('should return profile object by name', async () => {
            const res = await request(app).get('/rest/public/main/home/ilyav');

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('firstName', 'Ilya');
        });
    });
});

