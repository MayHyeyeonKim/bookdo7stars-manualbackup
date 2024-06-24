import React, { useEffect } from 'react';
import NavBar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import ToastMessage from '../components/ToastMessage';
import { userActions } from '../action/userActions';
import { bookActions } from '../action/bookActions';
import Footer from '../components/Footer/Footer';
import CategoryBar from '../components/CategoryBar';

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userActions.loginWithToken());
  }, []);

  const { bookList, bookGroup } = useSelector((state) => state.book);

  useEffect(() => {
    if (bookGroup) {
      dispatch(bookActions.getBookList({ queryType: bookGroup }));
    } else {
      dispatch(bookActions.getBookList({}));
    }
  }, [bookGroup]);
  return (
    <div>
      <ToastMessage />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#6b8e23',
          height: '60px',
        }}>
        <h2 style={{ margin: 0, color: '#fff', textAlign: 'center' }}>100불 이상 주문 시 모든 주문 무료 배송 (Standard Shipping)</h2>
      </div>
      <div>
        <NavBar user={user} />
        <CategoryBar bookList={bookList} />
        <div style={{ marginTop: '20px' }}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
