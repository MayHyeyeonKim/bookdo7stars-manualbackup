import React from 'react';
import { Box, Typography, Paper, Divider, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'; // react-router-dom에서 useNavigate 가져오기
import { currencyFormat } from '../utils/number';

const OrderReceipt = ({ finalTotalPrice, hasSelectedItems, cartList, handleCheckout }) => {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const shippingFee = hasSelectedItems ? (finalTotalPrice > 100000 ? 0 : 2500) : 0; // 선택된 상품이 있으면 100불 이상 무료 배송, 그 외 2500원, 선택된 상품이 없으면 배송비 0
  const pointsEarned = finalTotalPrice * 0.05;
  const grandTotal = finalTotalPrice + shippingFee;

  return (
    <Paper elevation={3} sx={{ padding: '16px', width: '100%', maxWidth: '300px' }}>
      <Typography variant="h6">Summary</Typography>
      <Box mt={2}>
        <Typography variant="body1">총 상품 금액: ₩{currencyFormat(finalTotalPrice)}</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body1">배송비: ₩{currencyFormat(shippingFee)}</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body1">적립금: ₩{currencyFormat(pointsEarned)}</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="h6" mt={2}>
          Order Total: ₩{currencyFormat(grandTotal)}
        </Typography>
        {location.pathname.includes('/cart') && cartList.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleCheckout} // handleCheckout 함수 실행
          >
            주문하기
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default OrderReceipt;
