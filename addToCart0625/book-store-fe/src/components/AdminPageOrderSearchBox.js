// AdminPageOrderSearchBox.js
import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Select, MenuItem, InputLabel } from '@mui/material';
import { format, isValid } from 'date-fns';
import DateFilter from './DateFilter';

const AdminPageOrderSearchBox = ({ searchQuery, setSearchQuery, resetSearch }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('orderNum');

  const handleSearch = (event) => {
    event.preventDefault();
    if (startDate && endDate && isValid(new Date(startDate)) && isValid(new Date(endDate))) {
      setSearchQuery({ ...searchQuery, startDate: format(new Date(startDate), 'yyyy-MM-dd'), endDate: format(new Date(endDate), 'yyyy-MM-dd') });
    } else {
      setSearchQuery({ ...searchQuery, startDate: null, endDate: null });
    }
  };

  return (
    <Box ml={2} mb={4}>
      <Grid container spacing={2}>
        <InputLabel sx={{ mt: 2, height: '4ch' }}>조회 기간</InputLabel>
        <DateFilter startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />

        {/* 세부 주문 검색 */}
        <InputLabel sx={{ height: '4ch' }}>상세 조건</InputLabel>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <Select
              value={selectedOption}
              onChange={(event) => {
                setSelectedOption(event.target.value);
              }}
              fullWidth>
              <MenuItem value="orderNum">주문 번호</MenuItem>
              <MenuItem value="userEmail">구매자</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label={selectedOption}
              variant="outlined"
              fullWidth
              value={searchQuery[selectedOption] || ''}
              placeholder="값을 입력해주세요."
              InputLabelProps={{ shrink: true }}
              onChange={(event) => setSearchQuery({ ...searchQuery, [selectedOption]: event.target.value })}
            />
          </Grid>

          {/* 검색 버튼 */}
          <Grid item xs={12} sm={8}>
            <Button variant="contained" color="primary" fullWidth sx={{ ml: 1, width: '30ch', height: '55px' }} onClick={handleSearch}>
              Search
            </Button>
            <Button variant="contained" color="primary" fullWidth sx={{ ml: 1, width: '30ch', height: '55px' }} onClick={resetSearch}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminPageOrderSearchBox;
