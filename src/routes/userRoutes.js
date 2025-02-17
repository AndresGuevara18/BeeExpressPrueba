const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/usuarios', (req, res) => {
    User.getAllUsers((err, results) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }
        res.json(results);
    });
});

module.exports = router;
