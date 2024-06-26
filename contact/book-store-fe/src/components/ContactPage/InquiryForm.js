import React, { useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import CloudImageUpload from '../../utils/CloudImageUpload';

const InquiryForm = () => {
  const [form, setForm] = useState({
    inquiryType: '',
    inquiryContent: '',
    emailReply: false,
    smsReply: false,
    cover: '',
  });

  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log('val=>', value);

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = (newUrl) => {
    setForm((prevForm) => ({ ...prevForm, cover: newUrl }));
    setImagePreview(newUrl ? newUrl : form.cover);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
  };

  return (
    <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        1:1 문의하기
      </Typography>
      <TextField select label="선택" fullWidth margin="normal" variant="outlined" name="inquiryType" value={form.inquiryType} onChange={handleChange}>
        <MenuItem value="상품 문의">상품 문의</MenuItem>
        <MenuItem value="재고 문의">재고 문의</MenuItem>
        <MenuItem value="기타 유형">기타 유형</MenuItem>
      </TextField>
      <Typography color="error">잠깐! 문의전, 자주 묻는 질문 TOP10을 확인해보세요.</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">문의내용</Typography>
        <TextField multiline rows={4} variant="outlined" fullWidth margin="normal" name="inquiryContent" value={form.inquiryContent} onChange={handleChange} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">파일첨부</Typography>
        {/* {imagePreview && (
          <img
            src={imagePreview}
            alt="cover preview"
            style={{ width: '30%', height: 'auto', marginTop: '20px' }}
          />
        )} */}
        <CloudImageUpload onUpload={handleImageUpload} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">답변메일</Typography>
        {/* <TextField variant="outlined" fullWidth margin="normal" name="email" value={form.email} onChange={handleChange} /> */}
        <FormControlLabel control={<Checkbox name="emailReply" checked={form.emailReply} onChange={handleChange} />} label="이메일로 답변 받기" />
        <FormControlLabel control={<Checkbox name="smsReply" checked={form.smsReply} onChange={handleChange} />} label="SMS로 답변 받기" />
      </Box>
      <Box sx={{ mt: 2 }}>
        <FormControlLabel
          control={<Checkbox name="privacyAgreement" checked={form.privacyAgreement} onChange={handleChange} />}
          label="(필수)개인정보 수집 및 이용 동의"
        />
        <Typography variant="body2">북두칠성에서는 무사히 답변을 드리기 위해 개인정보를 수집 및 이용합니다.</Typography>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined">취소</Button>
        <Button type="submit" variant="contained" color="primary">
          등록
        </Button>
      </Box>
    </Box>
  );
};

export default InquiryForm;
