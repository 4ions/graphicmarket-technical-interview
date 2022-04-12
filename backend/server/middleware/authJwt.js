const jwt = require("jsonwebtoken");
const config = require("../../config");
const { Auth } = require('../models')

const verifyToken = (req, res, next) => {
  let token = req.headers["accesstoken"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.token, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const verifyIsLogin = async (req, res, next) => {
  
  try {
    token = req.headers['accesstoken']
          
    const user = await Auth.findOne({
        where: {
            jwt: token
        }
    });
  
    if (user.status === "out") {
      return res.status(401).send({
        message: "Need login to access"
      })
    }
    next()
    
  } catch (error) {
    console.log(error)
    return res.status(401).send({
      message: "Need login to access"
    })
  }

}


module.exports = {
  verifyToken,
  verifyIsLogin
};
