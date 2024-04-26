const Session = require('../models/Session');
const User = require('../models/User');
// Book a session
exports.bookSession = async (req, res) => {
  try {
    const { mentorId, menteeId, startTime, endTime } = req.body;
    // Check if mentor exists and is available at the specified time
    const mentor = await User.findOne({ _id: mentorId, role: 'mentor' });
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    // Check if the mentee exists
    const mentee = await User.findById(menteeId);
    if (!mentee || mentee.role !== 'mentee') {
      return res.status(404).json({ error: 'Mentee not found' });
    }
    // Check mentor availability
    const isAvailable = mentor.availability.some(avail =>
      avail.day === new Date(startTime).getDay().toString() &&
      avail.startTime <= startTime &&
      avail.endTime >= endTime
    );
    if (!isAvailable) {
      return res.status(400).json({ error: 'Mentor is not available at this time' });
    }
    // Create session
    const session = new Session({ mentorId, menteeId, startTime, endTime });
    await session.save();
    res.status(201).json({ message: 'Session booked successfully', session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

