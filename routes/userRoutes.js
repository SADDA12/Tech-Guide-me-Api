const express = require('express');
const { registerUser, loginUser, logoutUser, getAllMentors, setAvailability } = require('../controllers/userController');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/mentors', getAllMentors);
router.post('/mentors/:id/availability', setAvailability);


module.exports = router;

