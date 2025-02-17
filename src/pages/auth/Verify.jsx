import  { useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { setMessErrVerify, verify } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';

function Verify() {
  const dispatch = useDispatch();
  const messageErrVerify = useSelector(state => state.auth.messageErrVerify)
  const disabledSubmitVerify = useSelector(state => state.auth.disabledSubmitVerify)
  const loading = useSelector(state => state.auth.loading);
  const user = useSelector(state => state.auth.user)

  // Verify OTP
  const onVerifyOTPForm = (values) => {
    const data = { ...values, email: user.data.user.email }
    dispatch(verify(data))
  }

  useEffect(() => {
    dispatch(setMessErrVerify());
  }, [messageErrVerify, dispatch]);

  const onFinishFailedVerify = () => {
    console.log('VERIFIED FAILED');
    // TODO Verifed failed
  }
  const style = {
    input: {
      borderRadius: '10px'
    }
  }

  return (
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onVerifyOTPForm}
      onFinishFailed={onFinishFailedVerify}
      autoComplete="off"
      labelAlign='left'
      style={{ marginTop: "10" }}
    >
      <Form.Item
        label="Mã xác thực"
        name="code"
        rules={[
          {
            required: true,
            message: 'Nhập mã xác thực!',
            min: 6,
            max: 6,
          },
        ]}
      >
        <Input size='large' placeholder="Nhập mã xác thực" maxLength={6} style={style.input} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 18,
        }}
      >
        <Button style={{ marginBottom: 15 }} type="primary" htmlType="submit" shape="round" size='large' disabled={disabledSubmitVerify} loading={loading}>
          Xác Thực
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Verify