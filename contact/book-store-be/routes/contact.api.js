const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// 1:1 문의 DB에 저장, 수정, 삭제
router.get('/', authController.authenticate, contactController.contact);
// router.put('/:id', authController.authenticate, contactController.addContact);
// router.delete('/:id', authController.authenticate, contactController.deleteContact);

module.exports = router;
