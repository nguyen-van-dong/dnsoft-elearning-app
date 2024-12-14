import React, { useEffect } from 'react'
import { Button, Col, Row, Typography, notification } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { loadQrCode, createTransaction, handleClickFinished, setNullErrorCreateOrder, setNullPayment } from './orderSlice';
import useCookie from '../../hooks/useCookie';
import Parser from 'html-react-parser';
const { Paragraph } = Typography;
import { toast } from 'react-toastify';
import { PayCircleOutlined } from '@ant-design/icons';

function QrCode({ method }) {
  const auth = useCookie();
  const course = useSelector(state => state.courses.course);
  const loading = useSelector(state => state.order.loading);
  const paymentInfo = useSelector(state => state.order.payment);
  const errorCreateOrder = useSelector(state => state.order.errorCreateOrder);

  const dispatch = useDispatch();

  const showQrCodePage = () => {
    const data = { course_id: course?.data?.id, method: method.code };
    dispatch(loadQrCode(data));
  }

  useEffect(() => {
    if (paymentInfo) {
      if (paymentInfo.payUrl) {
        const transaction = {...paymentInfo, fromUri: window.location.pathname};
        dispatch(createTransaction(transaction));
        if (paymentInfo.payUrl) {
          window.location.href = paymentInfo.payUrl;
        }
      } else {
        toast.error(paymentInfo.message);
        dispatch(setNullPayment());
      }
    }
  }, [paymentInfo]);

  useEffect(() => {
    if (errorCreateOrder) {
      notification.success({
        message: `Bạn đã mua khoá học trước đây, vui lòng tiếp tục học khoá này, xin cảm ơn bạn đã ủng hộ!`,
        placement: 'topRight',
        duration: 10
      });
      dispatch(setNullErrorCreateOrder());
      navigate('/courses/my-courses');
    }
  }, [errorCreateOrder, dispatch]);

  const handleFinished = () => {
    const data = { course_id: course?.data?.id, method: method.code };
    dispatch(handleClickFinished(data));
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Paragraph>
            {method.content ? Parser(method.content) : null}

            {
              auth ? (
                <>
                  {
                    !method.is_show_finished ? (
                      <Button type="primary" danger htmlType="submit" icon={<PayCircleOutlined />} size="large" loading={loading} onClick={() => showQrCodePage()}>
                        Thanh Toán
                      </Button>
                    ) : (
                      <Button type="primary" htmlType="submit" shape="round" size="large" loading={loading} onClick={() => handleFinished()}>
                        ĐÃ HOÀN THÀNH
                      </Button>
                    )
                  }
                </>
              ) : (
                <h3><i>Vui lòng <a href='/login'>đăng nhập</a> để tiến hành thanh toán!</i></h3>
              )
            }

          </Paragraph>
        </Col>
      </Row>
    </>
  )
}

export default QrCode
