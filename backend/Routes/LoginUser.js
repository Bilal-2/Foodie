const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecreate="hellookiahallhaimaitheekapsunao";
router.post("/loginuser", [
    body('email', "Enter Valid Email").isEmail(),
    body('password', "Enter Valid Password").isLength({ min: 5 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email })
            if(!userData){
                return res.status(400).json({ errors: "Try With Valid Credentials" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
            if(!pwdCompare){
                return res.status(400).json({ errors: "Try With Valid Credentials" });
                
            }
            const data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data,jwtSecreate) 
            return res.json({ success: true, authToken: authToken });
        } catch (error) {
            res.json({ success: false });

        }


    })

module.exports = router;