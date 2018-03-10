module.exports = function(app) {
  
  function logErrors(err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    next(err);
  }

  app.use(logErrors);
};
