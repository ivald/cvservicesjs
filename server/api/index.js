// api router will mount other routers
module.exports = (app) => {
  app.get('/rest/public/node/run', (req, res) => { res.send('true') });
  app.use('/rest/public/main', require('./user/user.routes'));
  app.use('/rest/public/download', require('./pdf/pdf.routes'));
  app.use('/rest/private/email', require('./emailme/emailme.routes'));
  app.use('/rest/public/email', require('./emailme/emailme.routes'));
  app.use('/rest/private/profile', require('./user/user.routes'));
  app.use('/user', require('./login/login.routes'));
};
