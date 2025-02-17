import { useState } from 'react'
import { Alert, Button } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Parser from 'html-react-parser';

function RegisterCourse({ slug, price, is_selling }) {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const registerLearning = () => {
    setDisabled(true);
    navigate(`/order/${slug}`);
  }

  return (
    <div style={{ marginTop: 20, textAlign: 'center' }}>
      <Alert message={is_selling ? ('Giá: ' + price) : Parser('<strong>MIỄN PHÍ</strong>')} type="error" style={{ fontSize: 20 }} />
      <Button
        type="primary" danger
        icon={<PlusSquareOutlined />}
        style={{ marginTop: 15, borderRadius: 10,fontSize: 18, height: 45 }}
        size="large"
        disabled={disabled}
        onClick={() => registerLearning()}
      > Đăng Ký Học </Button>
    </div>
  )
}

export default RegisterCourse
