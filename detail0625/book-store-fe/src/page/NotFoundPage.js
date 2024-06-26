import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        padding: 2,
      }}>
      {/* SVG 이미지 추가 */}
      <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 64 64" fill="#000000">
        <g>
          <rect x="23" y="23" width="12" height="30" fill="#d3ddbd" />
          <rect x="23" y="34" width="12" height="4" fill="#97b605" />
          <rect x="35" y="17" width="14" height="36" fill="#608020" />
          <rect x="35" y="23" width="14" height="8" fill="#d3ddbd" />
          <rect x="35" y="41" width="14" height="4" fill="#d3ddbd" />
          <path d="M55,42V25H49V53H61V48A6,6,0,0,1,55,42Z" fill="#97b605" />
          <rect x="49" y="30" width="12" height="4" fill="#d3ddbd" />
          <rect transform="translate(10.92 -2.4) rotate(15)" x="12.56" y="34.28" width="4" height="12" fill="#d3ddbd" />
          <rect transform="translate(14.06 -1.1) rotate(15)" x="7.2" y="45.84" width="8" height="14" rx="2" ry="2" fill="#97b605" />
          <path d="M20,3A17,17,0,1,0,37,20,17,17,0,0,0,20,3Zm0,30A13,13,0,1,1,33,20,13,13,0,0,1,20,33Z" fill="#97b605" />
          <path d="M15,32A13,13,0,0,0,30.94,13H15Z" fill="#d3ddbd" />
          <path d="M15,27H30.94A12.89,12.89,0,0,0,33,20c0-.34,0-.67,0-1H15Z" fill="#97b605" />
        </g>
        <g>
          <path
            d="M20,6a14,14,0,0,0-5.4,26.91l0,0A14,14,0,1,0,20,6ZM31.82,18H16V14H30.38A12,
            12,0,0,1,31.82,18ZM8,20a12,12,0,0,1,20.92-8H15a1,1,0,0,0-1,1V30.38A12,12,0,0,1,
            8,20ZM20,32a12.05,12.05,0,0,1-4-.7V28H28.92A12,12,0,0,1,20,32Zm10.38-6H16V20H32A12,12,0,0,1,30.38,26Z"
            fill="#3b8686"
          />
          <path d="M31,45H27a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Z" fill="#3b8686" />
          <path d="M39,28h6a1,1,0,0,0,0-2H39a1,1,0,0,0,0,2Z" fill="#3b8686" />
          <path
            d="M61,24H50V17a1,1,0,0,0-1-1H37.54a18,18,0,1,0-25,20.35l-2.18,8.17a3,3,0,0,0-2.67,
            2.2L5.08,56.38A3,3,0,0,0,7.2,60.05l3.86,1a3,3,0,0,0,.78.1A3,3,0,0,0,14.74,59l2.58-9.66a3,
            3,0,0,0-1.2-3.24l2.19-8.16A15.67,15.67,0,0,0,20,38a16.52,16.52,0,0,0,2-.12V53a1,1,0,0,0,1,
            1H61a1,1,0,0,0,1-1V25A1,1,0,0,0,61,24Zm-1,9H50V31H60ZM48,30H36V28.21A18,18,0,0,0,37.54,
            24H48ZM34,33H32.42A19.63,19.63,0,0,0,34,31.29Zm-4.07,2H34v2H25.86A17.91,17.91,0,0,0,29.93,35ZM36,
            32H48v8H36Zm0,10H48v2H36Zm14-7H60V46H50Zm10-9v3H50V26ZM48,18v4H37.88a16.73,16.73,0,0,0,0-4ZM15.39,
            48.79,12.8,58.45a1,1,0,0,1-1.22.7l-3.86-1a1,1,0,0,1-.61-.47,1,1,0,0,1-.1-.76L9.6,47.24a1,1,0,0,1,
            .46-.61,1,1,0,0,1,.76-.1l3.87,1a1,1,0,0,1,.6.47A1,1,0,0,1,15.39,48.79Zm-1.15-3.42-1.94-.51,2.09-7.77a18.18,
            18.18,0,0,0,1.92.53ZM4,20A16,16,0,1,1,20,36,16,16,0,0,1,4,20ZM24,39H34V52H24Zzm12,7H48v6H36Zzm14,6V48H60v4Z"
            fill="#3b8686"
          />
          <path d="M19,24h3a1,1,0,0,0,0-2H19a1,1,0,0,0,0,2Z" fill="#3b8686" />
          <path d="M26,24h3a1,1,0,0,0,0-2H26a1,1,0,0,0,0,2Z" fill="#3b8686" />
        </g>
      </svg>
      {/* 텍스트 및 버튼 */}

      <Typography variant="h3" component="div" gutterBottom>
        찾으시는 도서가 없습니다.
      </Typography>
      <Typography variant="h6" component="div" gutterBottom>
        홈버튼 눌러서 메인 페이지로 이동
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
