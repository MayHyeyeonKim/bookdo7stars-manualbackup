import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const NewButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
  },
}));

const AdminPageSearchBox = ({ searchQuery, setSearchQuery, fields, resetSearch, handleOpenNewDialog }) => {
  const [selectedField, setSelectedField] = useState(fields[0]); // isbn

  // const onCheckEnter = (event, item) => {
  //   if (event && event.key === 'Enter') {
  //     event.preventDefault();
  //     setSearchQuery({ ...searchQuery, [item]: event.target.value });
  //   }
  // };

  const handleChange = (event) => {
    event.preventDefault();
    setSelectedField(event.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* NEW 버튼 */}
      <NewButton variant="contained" sx={{ mt: 2, height: '5ch' }} onClick={handleOpenNewDialog}>
        New
      </NewButton>

      {/* 검색 박스 */}
      <Box
        component="form"
        sx={{
          // display: 'flex',
          // justifyContent: 'flex-end',
          '& .MuiTextField-root': { mt: 1 },
        }}
        noValidate
        autoComplete="off">
        <div>
          {/* 검색 필드 선택 */}
          <TextField select label="Search by" onChange={handleChange} variant="standard" sx={{ mt: 1, width: '11ch' }}>
            {/* 선택할 검색 필드 목록 */}
            {fields.map((item) => (
              <MenuItem key={item} value={item || ''}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          {/* 선택된 필드에 따른 검색 창 */}

          <TextField
            id={`standard-input-${selectedField}`}
            label="반갑습니다, 관리자님."
            placeholder={`${selectedField}을(를) 검색하세요.`}
            variant="standard"
            // onKeyPress={onCheckEnter}
            value={searchQuery[selectedField] || ''}
            onChange={(event) => setSearchQuery({ ...searchQuery, [selectedField]: event.target.value })}
            sx={{ mt: 1, width: '25ch' }}
          />
          <IconButton type="button" sx={{ mt: 3 }} aria-label="search">
            <SearchIcon />
          </IconButton>

          {/* 검색 필드 초기화 버튼 */}
          <IconButton type="button" sx={{ mt: 3 }} aria-label="reset" onClick={resetSearch}>
            <RefreshIcon />
          </IconButton>
        </div>
      </Box>
    </div>
  );
};

export default AdminPageSearchBox;
