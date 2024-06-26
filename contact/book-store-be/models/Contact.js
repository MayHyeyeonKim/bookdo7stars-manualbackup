const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  inquiryType: {
    type: String,
    enum: ['상품 문의', '재고 문의', '기타 유형'],
    required: true
  },
  inquiryContent: { 
    type: String, 
    maxlength: 1000, 
    required: true 
  },
  imageSource: { type: String },
  emailReply: { type: Boolean, default: false },
  smsReply: { type: Boolean, default: false },
  cover: { type: String },
  privacyAgreement: { type: Boolean, required: true },
}, {
  timestamps: true
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
