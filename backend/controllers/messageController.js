import Message from '../models/Message.js';
import { sendContactNotification } from '../utils/mailer.js';

// POST /api/messages — public contact form submission
export async function createMessage(req, res, next) {
  try {
    const { name, email, company, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'name, email, and message are required' });
    }
    const saved = await Message.create({ name, email, company, message });
    sendContactNotification({ name, email, company, message }).catch(err =>
      console.error('Failed to send contact notification email:', err.message)
    );
    res.status(201).json({ message: 'Message received', id: saved._id });
  } catch (err) { next(err); }
}

// GET /api/messages (admin)
export async function getMessages(req, res, next) {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) { next(err); }
}

// PATCH /api/messages/:id/status (admin)
export async function updateMessageStatus(req, res, next) {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!message) return res.status(404).json({ message: 'Not found' });
    res.json(message);
  } catch (err) { next(err); }
}
