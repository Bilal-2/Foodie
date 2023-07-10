const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')



router.post("/ordersData", async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date })

    let eid = await Order.findone({ 'email': req.body.email })
    if (eid === null) {

        try {
            await Order.create({

                email: req.body.email,
                order_data: [data]
                //console.log(global.food_Category);
            }).then(() => {

                res.json({ success: true })
            })

        } catch (error) {

            console.error(error.message);
            res.send("Server Error")

        }
    }
    else {

        try {
            await Order.findoneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: [data] } }

                //console.log(global.food_Category);
            ).then(() => {

                res.json({ success: true })
            })

        } catch (error) {

            console.error(error.message);
            res.send("Server Error")

        }
    }


})

module.exports = router;