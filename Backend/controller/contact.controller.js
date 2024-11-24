import Contact from '../model/contact.model.js';

export const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  const newMessage = new Contact({
    name,
    email,
    message,
  });

  try {
    await newMessage.save();
    res.status(200).json({ message: 'Message Sent Successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending message.' });
  }
};
