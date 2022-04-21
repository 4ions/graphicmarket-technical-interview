const { Register } = require("../models");

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Verificar Username
    Register.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (user) {
        return res.status(400).json({
          message: "Failed! Username is already in use!"
        });
        
      }
      
      // Verificar Email
      Register.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Email is already in use!"
          });
          return;
        }
        next();
      });
    });
  };
  
  
  module.exports = checkDuplicateUsernameOrEmail
  