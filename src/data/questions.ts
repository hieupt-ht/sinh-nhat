export type Question = {
  id: number;
  gateName: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  successMessage: string;
  wrongMessage: string;
};

export const questions: Question[] = [
  {
    id: 1,
    gateName: "The First Smile",
    question: "Nếu hành trình này là một món quà, điều đầu tiên bạn nên làm là gì?",
    options: [
      "Bấm thoát ra ngoài",
      "Đi tiếp để khám phá",
      "Gọi người khác làm hộ",
      "Đợi web tự chạy hết",
    ],
    correctIndex: 1,
    successMessage: "Đúng rồi, hành trình nhỏ này bắt đầu từ đây ✨",
    wrongMessage: "Chưa đúng rồi, đi tiếp để khám phá mới hợp chứ ✨",
  },
  {
    id: 2,
    gateName: "Tiny Memory",
    question: "Theo bạn, thứ gì làm một kỷ niệm trở nên đáng nhớ nhất?",
    options: [
      "Nó phải thật hoàn hảo",
      "Nó phải thật đắt tiền",
      "Nó có người mình từng trân trọng",
      "Nó phải được đăng Facebook",
    ],
    correctIndex: 2,
    successMessage: "Một kỷ niệm đẹp không cần hoàn hảo, chỉ cần đủ chân thành 🌷",
    wrongMessage: "Không phải điều hào nhoáng đâu, nghĩ theo hướng chân thành nhé.",
  },
  {
    id: 3,
    gateName: "Little Guess",
    question: "Nếu có một người âm thầm làm hẳn một web sinh nhật cho bạn, người đó chắc là...",
    options: [
      "Rất rảnh",
      "Hơi khùng nhưng có tâm",
      "Bị ép làm bài tập",
      "Ấn nhầm template",
    ],
    correctIndex: 1,
    successMessage: "Ừ thì... hơi khùng thật, nhưng có tâm đó 🥲",
    wrongMessage: "Đáp án dễ thương hơn một chút nữa cơ.",
  },
  {
    id: 4,
    gateName: "Memory Keeper",
    question: "Một tấm ảnh cũ thường giữ lại điều gì?",
    options: [
      "Dung lượng điện thoại",
      "Một khoảnh khắc không quay lại được",
      "Lý do để xóa bớt ảnh",
      "Bằng chứng để trêu nhau",
    ],
    correctIndex: 1,
    successMessage: "Đúng rồi, có những khoảnh khắc chỉ còn ở lại trong ảnh 📸",
    wrongMessage: "Tấm ảnh này đang giữ một điều quan trọng hơn thế nhiều.",
  },
  {
    id: 5,
    gateName: "Birthday Wish",
    question: "Trong ngày sinh nhật, điều nào là quan trọng nhất?",
    options: [
      "Có thật nhiều quà",
      "Có bánh thật to",
      "Có lời chúc thật lòng",
      "Có story thật đẹp",
    ],
    correctIndex: 2,
    successMessage: "Một lời chúc thật lòng vẫn là món quà ấm áp nhất 🎂",
    wrongMessage: "Không cần hoành tráng lắm đâu, chỉ cần thật lòng thôi.",
  },
  {
    id: 6,
    gateName: "Since When",
    question: "Tôi và bạn chơi với nhau từ khi nào?",
    options: ["Từ lúc sinh ra", "Mầm non", "Cấp 1", "Cấp 3"],
    correctIndex: 2,
    successMessage: "Đúng rồi, từ cấp 1 — một khoảng thời gian rất dài rồi đó 🌼",
    wrongMessage: "Xa hơn một chút nữa, từ hồi còn nhỏ hơn cơ.",
  },
  {
    id: 7,
    gateName: "Twelve Years",
    question: "Chúng ta học chung được bao nhiêu năm?",
    options: ["5 năm", "12 năm", "3 năm", "4 năm"],
    correctIndex: 1,
    successMessage: "Đúng rồi, 12 năm — nghe thôi cũng thấy nhiều kỷ niệm rồi ✨",
    wrongMessage: "Con số này lớn hơn một chút, đủ dài để thành cả một quãng thanh xuân.",
  },
];
