const { check, validationResult} = require('express-validator');
 
exports.userSignupValidator = [
  check('name')
    .isLength({min: 5})
    .withMessage('Name must be at leat 5 characters long.'),
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  check('password')
    .isLength({min:5})
    .withMessage('Password must be at least 5 characters')
]
  
exports.validateResults = function(req,res,next){
  const errors = validationResult(req);
 
  if(!errors.isEmpty()){
    return res.status(422).json({
      error: errors.array()
    })
  }
   next();
}