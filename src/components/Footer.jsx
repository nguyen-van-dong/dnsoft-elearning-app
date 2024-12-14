
import React from 'react'
import { Col, Row, Layout } from 'antd'
const MyFooter = Layout.Footer;

function Footer() {
  return (
    <div className='footer'>
      <Row className='footer-inner'>
        <Col>
          <strong>Lập Trình Thực Chiến</strong>
          <div>
            <p>Điện thoại: 077.874.8897</p>
            <p>Email: dong.joseph2810@gmail.com</p>
            <p>Địa chỉ: Quận Ngũ Hành Sơn, TP. Đà Nẵng</p>
          </div>
        </Col>
        <Col>
          <strong>VỀ DnSoft</strong>
          <div>
              <p><a href='/page/gioi-thieu'>Giới thiệu</a></p>
            {/* <p><a href='/page/co-hoi-viec-lam'>Cơ hội việc làm</a></p> */}
            <p><a href='/lien-he'>Liên hệ</a></p>
            <p><a href='/page/chinh-sach-cho-doi-tac'>Chính Sách Cho Đối tác</a></p>
          </div>
        </Col>
        <Col>
          <strong>HỖ TRỢ</strong>
          <div>
            {/* <p><a href='/lien-he'>Liên hệ</a></p> */}
            <p><a href='/page/bao-mat'>Bảo mật</a></p>
            <p><a href='/page/dieu-khoan'>Điều khoản</a></p>
            <p><a href='/page/chinh-sach'>Chính Sách</a></p>
          </div>
        </Col>
        <Col>
          <strong>ĐÀO TẠO LẬP TRÌNH DnSoft</strong>
          <div>
            <p>Mã số thuế: 0109922901</p>
            <p>Ngày thành lập: 20/01/2023</p>
            <p>Lĩnh vực: Giáo dục, lập trình.</p>
          </div>
        </Col>
      </Row>
      <MyFooter
        style={{
          textAlign: 'center',
        }}
      >
        <h3><i>© 2022 - {new Date().getFullYear() } Created by DnSoft Technology. Nền tảng học lập trình trực tuyến, xây dựng và phát triển những sản phẩm mang lại giá trị cho cộng đồng!</i></h3>
      </MyFooter>
    </div>
  )
}

export default Footer