const User = require('../models/User');
const Contact = require('../models/Contact');
const contactController = {};

contactController.creatContact = async (req, res) => {
  try {
    const { userId } = req;
    const { inquiryContent, inquiryType, image, emailReply, smsReply, privacyAgreement } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json('user not found!');
    }
    const newContact = new Contact({
      userId,
      inquiryContent,
      inquiryType,
      image,
      emailReply,
      smsReply,
      privacyAgreement,
    });

    await newContact.save();
    res.status(200).json({ status: 'success', newContact });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err.message });
  }
};

contactController.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).populate({
      path: 'userId',
      model: 'User',
    });

    res.status(200).json({ status: 'success', contacts });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err.message });
  }
};

contactController.getContactsByUser = async (req, res) => {
  try {
    const userId = req;
    if (!user) {
      return res.status(401).json('user not found!');
    }
    const contacts = await Contact.find({}).populate({
      path: 'userId',
      model: 'User',
    });
    const contactsByUser = contacts.find({ userId: userId });

    res.status(200).json({ status: 'success', contactsByUser });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err.message });
  }
};

module.exports = contactController;
