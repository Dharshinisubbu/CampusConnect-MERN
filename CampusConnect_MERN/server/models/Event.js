import mongoose from 'mongoose';
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, default: 'Campus' },
  date: { type: String, required: true },
  time: { type: String, default: '10:00 AM' },
  venue: { type: String, default: 'Main Auditorium' },
  description: { type: String, default: '' },
  organizer: { type: String, default: 'Student Council' },
  registrations: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Event', eventSchema);
