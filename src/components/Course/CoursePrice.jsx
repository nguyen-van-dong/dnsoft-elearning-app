import { StarOutlined } from '@ant-design/icons';

function CoursePrice({ item }) {
  return (
    <div style={{marginTop: 6, fontSize: 16}}>
      {
        item.is_selling ? (
          <>
            <span style={{ textDecoration: 'line-through' }}>{item.price}₫</span> <StarOutlined style={
              {
                marginLeft: 5,
                marginRight: 5,
                color: '#87d068'
              }
            } />
            <strong style={{ color: '#f56a00' }}>{item.sale_price}₫</strong></>
        ) : (
          <strong>MIỄN PHÍ</strong>
        )
      }
    </div>
  )
}

export default CoursePrice
