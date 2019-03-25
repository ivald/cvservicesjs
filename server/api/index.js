// api router will mount other routers
module.exports = (app) => {
  app.use('/rest/public/main', require('./user/user.routes'));
  app.use('/rest/public/download', require('./pdf/pdf.routes'));
}
