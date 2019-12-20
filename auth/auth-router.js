const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201).json({
            saved,
            message: "User registered successfully"
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  // implement login
  let {username, password} = req.body;

    Users.findByUserName(username)
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            const token = signToken(user);

            res.status(200).json({
                token,
                message: `Welcome ${user.username}!`,
            });
        }else {
            res.status(401).json({message: "Invalid Username or Password"});
        }
    })
    .catch(err => {
        res.status(500).json({
            err,
            message: "Error logging in user"
        });
    });
});

module.exports = router;
