const mongoose = require('mongoose');


const sessionSchema = new mongoose.Schema({
 mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 menteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 startTime: { type: Date, required: true },
 endTime: { type: Date, required: true }
});


const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;


