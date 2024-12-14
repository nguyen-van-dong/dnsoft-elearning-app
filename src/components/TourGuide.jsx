import React from 'react'
import Tour from 'reactour'
import useAuth from '../hooks/useAuth';

function TourGuide({isTourOpen, setIsTourOpen}) {
  const user = useAuth();
  const steps = [
    {
      selector: ".video-player",
      content: () => {
        return <div className="content-guide">
          Chào cậu! Tớ là Tồng - hướng dẫn viên tại DnSoft, mình sẽ đưa cậu đi thăm quan và giới thiệu cho cậu hiểu rõ hơn về DnSoft nhé. Let's go!
        </div>
      },
    },
    {
      selector: ".video-player",
      content: () => {
        return <div className="content-guide">
          Đây là khu vực hiển thị toàn bộ nội dung các bài học như là video, hình ảnh, hoặc văn bản sẽ được hiển thị ở đây {user.full_name} nhé ^^
        </div>
      }
    },
    {
      selector: ".course-content",
      content: () => {
        return <div className="content-guide">
        Tiếp theo là khu vực quan trọng không kém, đây là danh sách các bài học tại khóa này. Cậu sẽ rất thường xuyên tương tác tại đây để chuyển bài học và làm bài tập đấy !!!
        </div>
      }
    },
    {
      selector:".lesson-first",
      content: () => {
        return <div className="content-guide">
          Đây là bài học đầu tiên dành cho cậu, khi học xong bài học này Tồng sẽ đánh 'Tích xanh' bên cạnh để đánh dấu cậu đã hoàn thành bài học nhé!
        </div>
      }
    },
    {
      selector: ".lesson-last",
      content: () => {
        return <div className="content-guide">
          Đây là bài học cuối của chương, theo mặc định các bài học tại DnSoft đều bị khóa. Khi cậu hoàn thành bài học phía trước thì bài sau sẽ tự động được mở. Mà lúc học cậu đừng có tua video, vì sẽ không được tính là hoàn thành bài học đâu đấy nhé ^__^
        </div>
      }
    },
    {
      selector: ".add-note",
      content: () => {
        return <div className="content-guide">
          Tại DnSoft có một chức năng rất đặc biệt, đó là chức năng "Tạo ghi chú". Khi học sẽ có nhiều lúc cậu muốn ghi chép lại đó, tại DnSoft cậu sẽ không cần tốn giấy mực để làm việc này đâu.
        </div>
      }
    },
    {
      selector: "#comment",
      content: () => {
        return <div className="content-guide">
          Và đây là khu vực dành cho việc hỏi đáp, trao đổi trong mỗi bài học. Nếu có bài học nào hay thì cậu bình luận một lời động viên vào đây cũng được nhé. Tồng sẽ rất vui và cảm thấy biết ơn đấy 
        </div>
      }
    }
  ];
  return (
    <Tour
      steps={steps}
      isOpen={isTourOpen}
      onRequestClose={() => setIsTourOpen(false)}
      showNumber={false}
      // nextButton={ () => {
      //   return <Button>Next Button</Button>
      // }}
      // prevButton={ () => {
      //   return <Button>Previous</Button>
      // }}
    />
  )
}

export default TourGuide