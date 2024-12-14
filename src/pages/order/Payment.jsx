import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Image, Row } from 'antd'
import QrCode from './QrCode'
import { getPaymentMethods } from './paymentSlice';
import COD from './COD';

function Payment() {
  const dispatch = useDispatch();

  const [styleSelectedPaymentMethod, setStyleSelectedPaymentMethod] = useState({ borderRadius: 15, border: '2px solid #c0c0c0' });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isSelectCoD, setIsSelectCoD] = useState(false);
  const paymentMethods = useSelector(state => state.payment.paymentMethods);

  const handleClickPaymentMethod = (method) => {
    setStyleSelectedPaymentMethod({ borderRadius: 15, border: '2px solid #c0c0c0' });
    setSelectedPaymentMethod(method);
    if (method.code == 'COD') {
      setIsSelectCoD(true);
    } else {
      setIsSelectCoD(false);
    }
  }

  useEffect(() => {
    dispatch(getPaymentMethods());
  }, []);

  return (
    <>
      <h1 style={{ marginTop: 10 }}>Chọn hình thức thanh toán bằng cách click vào hình ảnh</h1>
      <Row className='payment-image'>
        {
          paymentMethods?.data?.map(item => (
            <Col key={item.code}>
              <a style={{ cursor: 'pointer' }} onClick={() => handleClickPaymentMethod(item)}>
                <Image preview={false} src={item.image} style={ selectedPaymentMethod && item.code == selectedPaymentMethod.code ? styleSelectedPaymentMethod : ''}/>
              </a>
            </Col>
          ))
        }
      </Row>
      {
        selectedPaymentMethod ? (
          <>
            <h2 style={{ marginTop: 10 }}>{selectedPaymentMethod.name}</h2>
            {
              isSelectCoD ? (
                <COD />
              ) : (
                <QrCode method={selectedPaymentMethod} />
              )
            }
          </>
        ) : ''
      }
    </>
  )
}

export default Payment
