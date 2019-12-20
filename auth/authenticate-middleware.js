/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');



module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  
  if(token){
  const secret = process.env.JWT_SECRET || "keep it secret, keep it safe";  
  jwt.verify(token, secret, function(err, decodedToken){
    if(err){
      res.status(401).json({ you: 'shall not pass!' });
    }else {
      req.user = decodedToken;
      next();
    }
  })  
}else{
  res.status(400).json({message: "Please try to login again"})
}
};