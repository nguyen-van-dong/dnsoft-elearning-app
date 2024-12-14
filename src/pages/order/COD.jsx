
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, Select, notification } from 'antd';
import useCookie from '../../hooks/useCookie';
import { createOrder, getAllProvinces, getDistrictsInProvince, getTownshipsInDistrict, setNullDistricts, setNullErrorCreateOrder, setNullTownships, setFalseOrderIsCreated } from './orderSlice';
import { PayCircleOutlined } from '@ant-design/icons';

function COD() {
  let { slug } = useParams();
  const [disabled, setDisabled] = useState(false);
  const [province_id, setProvinceId] = useState(null);
  const [district_id, setDistrictId] = useState(null);
  const [township_id, setTownshipId] = useState(null);

  const loadingCreateOrder = useSelector(state => state.order.loadingCreateOrder);
  const errorCreateOrder = useSelector(state => state.order.errorCreateOrder);
  const orderIsCreated = useSelector(state => state.order.orderIsCreated);
  const provinces = useSelector(state => state.order.provinces);
  const districts = useSelector(state => state.order.districts);
  const townships = useSelector(state => state.order.townships);

  const navigate = useNavigate();
  const auth = useCookie();
  const dispatch = useDispatch();

  const onLoginForm = (values) => {
    setDisabled(true)
    const data = {
      ...values,
      province_id,
      district_id,
      township_id,
      slug
    }
    dispatch(createOrder(data));
  };

  useEffect(() => {
    if (!provinces) {
      dispatch(getAllProvinces())
    }
  }, [])

  console.log('RE_RENDER COD');

  useEffect(() => {
    if (errorCreateOrder) {
      const errorMessage = JSON.parse(errorCreateOrder.message);
      console.log({errorMessage});
      if (errorMessage.status == 'C400') {
        notification.error({
          message: errorMessage.message,
          placement: 'topRight',
          duration: 10
        });
        setDisabled(false);
      } else if (errorMessage.status == 'C203') {
        notification.success({
          message: `Bạn đã mua khoá học trước đây, vui lòng tiếp tục học khoá này, xin cảm ơn bạn đã ủng hộ!`,
          placement: 'topRight',
          duration: 10
        });
      } else {
        notification.error({
          message: `Có lỗi xảy ra trong lúc mua hàng, vui lòng thử lại sau, xin cảm ơn bạn đã ủng hộ!`,
          placement: 'topRight',
          duration: 10
        });
        setDisabled(false);
      }
      dispatch(setNullErrorCreateOrder());
    }
  }, [errorCreateOrder, dispatch]);

  useEffect(() => {
    if (orderIsCreated) {
      notification.success({
        message: `Bạn đã mua khoá học thành công, vui lòng kích hoạt khoá học!`,
        placement: 'topRight',
        duration: 10
      });
      navigate('/courses/my-courses');
    }
    dispatch(setFalseOrderIsCreated());
  }, [orderIsCreated]);

  const onFinishFailedLogin = (errorInfo) => {
    console.log('Failed login:', errorInfo);
    setDisabled(false);
  };

  const onProvinceChange = (value) => {
    dispatch(setNullDistricts());
    dispatch(getDistrictsInProvince(value));
    dispatch(setNullTownships());
    setProvinceId(value);
  }

  const onDistrictChange = (value) => {
    dispatch(setNullTownships());
    dispatch(getTownshipsInDistrict(value));
    setDistrictId(value);
  }

  const onTownshipChange = (value) => {
    setTownshipId(value);
  }

  const style = {
    input: {
      borderRadius: '7px'
    }
  }

  let districtsOption = [];
  if (districts?.items?.length) {
    districtsOption = districts.items.map(item => {
      return {
        value: item.id,
        label: item.name
      }
    })
  }

  let provincesOption = [];
  if (provinces?.items?.length) {
    provincesOption = provinces.items.map(item => {
      return {
        value: item.id,
        label: item.name
      }
    })
  }

  let townshipsOption = [];
  if (townships?.items?.length) {
    townshipsOption = townships.items.map(item => {
      return {
        value: item.id,
        label: item.name
      }
    })
  }

  return (
    <>
      <i><h2>Với việc lựa chọn phương thức thanh toán này, bạn sẽ chờ mã khóa học được giao đến và kích hoạt khóa học sau khi nhận.</h2></i>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onLoginForm}
        onFinishFailed={onFinishFailedLogin}
        autoComplete="off"
        labelAlign='left'
        style={{ marginTop: "10" }}
      >
        {
          !auth ? (
            <>
              <h2>Vui lòng <a href='/login'>đăng nhập</a> để tiến hành thanh toán!</h2>
            </>
          ) : (
            <>
              <Form.Item
                name="province_id"
                label="Tỉnh / thành"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn tỉnh / thành'
                  },
                ]}
              >
                <Select
                  placeholder="Vui lòng chọn tỉnh / thành"
                  onChange={onProvinceChange}
                  size='large'
                  showSearch
                  optionFilterProp="children"
                  allowClear={true}
                  options={provincesOption}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                >
                </Select>
              </Form.Item>

              
                  <Form.Item
                    name="district_id"
                    label="Quận / huyện"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn quận / huyện'
                      },
                    ]}
                  >
                    <Select
                      placeholder="Vui lòng chọn quận / huyện"
                      onChange={onDistrictChange}
                      size='large'
                      showSearch
                      optionFilterProp="children"
                      allowClear={true}
                      options={districtsOption}
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                    >
                    </Select>
                  </Form.Item>
          

              <Form.Item
                name="township_id"
                label="Phường / xã"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn xã / phường'
                  },
                ]}
              >
                <Select
                  placeholder="Vui lòng chọn phường / xã"
                  onChange={onTownshipChange}
                  size='large'
                  showSearch
                  optionFilterProp="children"
                  allowClear={true}
                  options={townshipsOption}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                >
                </Select>
              </Form.Item>

              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[
                  {
                    required: true,
                    message: 'Please input your address!',
                  },
                ]}
              >
                <Input size='large' placeholder="Enter your address" style={style.input} />
              </Form.Item>

              <Form.Item className='btn-deli'>
                <Button type="primary" htmlType="submit" danger icon={<PayCircleOutlined />} size="large" disabled={disabled} loading={loadingCreateOrder}>
                  Mua Ngay
                </Button>
              </Form.Item>
            </>
          )
        }

      </Form>
    </>
  )
}

export default React.memo(COD)
