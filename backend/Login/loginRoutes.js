// backend/Login/loginRoutes.js (TEMPORARY - FOR DEBUGGING LOGS)
const express = require('express');
const router = express.Router();

console.log('loginRoutes.js module loaded!'); // Will show if module loads

// TEMPORARILY COMMENT OUT DB CONNECTION
// const mysql = require('mysql2');
// const db = mysql.createConnection({ ... });
// db.connect((err) => { ... });

// TEMPORARILY COMMENT OUT FILE SYSTEM OPERATIONS
// const fs = require('fs');
// const path = require('path');
// const createFolder = (application_id) => { ... };

router.post('/', (req, res) => {
    console.log('POST /login route hit!'); // This is the crucial one to see
    console.log('Request body:', req.body);
    return res.status(200).json({ message: 'Login route working (test mode)!' });
});

router.post('/change-password', (req, res) => {
    console.log('POST /change-password route hit!');
    console.log('Request body:', req.body);
    return res.status(200).json({ message: 'Change password route working (test mode)!' });
});

module.exports = router;