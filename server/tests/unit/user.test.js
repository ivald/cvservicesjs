const {UserInfo} = require('../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');

describe('user.generateAuthToken', () => {
   it('should return a valid JWT', () => {
       this.generateAuthToken = function(id) {
           const token = jwt.sign({ id: id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
           return token;
       }
      const user = {id: 1};
      const token = this.generateAuthToken(user.id);
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      expect(decoded).toMatchObject(user);
   });
});
