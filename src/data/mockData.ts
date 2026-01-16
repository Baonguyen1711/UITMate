// User data
export const currentUser = {
  id: "u1",
  name: "Nguyễn Văn Minh",
  studentId: "21520123",
  email: "21520123@gm.uit.edu.vn",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Minh",
  faculty: "Khoa Công nghệ Phần mềm",
  year: "Năm 3",
  gpa: 3.45,
  badges: ["deadline-master", "top-collaborator", "high-gpa"],
  joinedDate: "2021-09-01",
  activityPoints: 850,
};

// Badges data
export const badges = [
  {
    id: "deadline-master",
    name: "Deadline Master",
    description: "Hoàn thành 50 deadline đúng hạn",
    icon: "🎯",
    color: "bg-gradient-to-r from-amber-400 to-orange-500",
  },
  {
    id: "top-collaborator",
    name: "Top Collaborator",
    description: "Tham gia 10+ nhóm đồ án",
    icon: "🤝",
    color: "bg-gradient-to-r from-blue-400 to-cyan-500",
  },
  {
    id: "high-gpa",
    name: "High GPA",
    description: "GPA trên 3.2",
    icon: "⭐",
    color: "bg-gradient-to-r from-purple-400 to-pink-500",
  },
  {
    id: "active-member",
    name: "Active Member",
    description: "500+ điểm hoạt động",
    icon: "🔥",
    color: "bg-gradient-to-r from-red-400 to-orange-500",
  },
  {
    id: "helper",
    name: "Helper",
    description: "Trả lời 100+ câu hỏi",
    icon: "💡",
    color: "bg-gradient-to-r from-green-400 to-emerald-500",
  },
];

// Today's schedule
export const todaySchedule = [
  {
    id: "s1",
    subject: "Lập trình Web",
    code: "IT008",
    time: "07:30 - 09:30",
    room: "B3.10",
    teacher: "ThS. Nguyễn Văn A",
    status: "ongoing",
  },
  {
    id: "s2",
    subject: "Cơ sở dữ liệu",
    code: "IT005",
    time: "09:45 - 11:45",
    room: "A1.05",
    teacher: "TS. Trần Thị B",
    status: "upcoming",
  },
  {
    id: "s3",
    subject: "Trí tuệ nhân tạo",
    code: "IT012",
    time: "13:30 - 15:30",
    room: "C2.08",
    teacher: "PGS.TS. Lê Văn C",
    status: "upcoming",
  },
];

// Deadlines - Only upcoming deadlines (future dates)
export const deadlines = [
  // Urgent deadlines (within 24 hours)
  {
    id: "d1",
    title: "Bài tập Lập trình Web - Lab 06",
    course: "IT008",
    dueDate: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
    status: "pending",
    priority: "high",
  },
  {
    id: "d2",
    title: "Nộp báo cáo AI - Tuần 5",
    course: "IT012",
    dueDate: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(), // 20 hours from now
    status: "pending",
    priority: "high",
  },
  // Deadlines within 3 days
  {
    id: "d3",
    title: "Đồ án CSDL - Milestone 3",
    course: "IT005",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    status: "pending",
    priority: "high",
  },
  {
    id: "d4",
    title: "Bài tập Mạng máy tính - Lab 04",
    course: "IT006",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    status: "pending",
    priority: "medium",
  },
  // Deadlines within a week
  {
    id: "d5",
    title: "Quiz Online - Chương 4",
    course: "IT008",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    status: "pending",
    priority: "medium",
  },
  {
    id: "d6",
    title: "Báo cáo thực hành CSDL",
    course: "IT005",
    dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days from now
    status: "pending",
    priority: "medium",
  },
  // Deadlines within 2 weeks
  {
    id: "d7",
    title: "Đồ án AI - Presentation",
    course: "IT012",
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
    status: "pending",
    priority: "low",
  },
  {
    id: "d8",
    title: "Bài tập lớn Mạng máy tính",
    course: "IT006",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    status: "pending",
    priority: "low",
  },
];

// Notifications
export const notifications = [
  {
    id: "n1",
    title: "Điểm mới cập nhật",
    message: "Điểm môn Lập trình Web đã được cập nhật",
    time: "10 phút trước",
    type: "grade",
    read: false,
  },
  {
    id: "n2",
    title: "Thay đổi phòng học",
    message: "Môn CSDL ngày mai chuyển sang phòng B2.12",
    time: "1 giờ trước",
    type: "schedule",
    read: false,
  },
  {
    id: "n3",
    title: "Tin nhắn mới",
    message: "Bạn có 3 tin nhắn mới từ nhóm đồ án",
    time: "2 giờ trước",
    type: "message",
    read: true,
  },
  {
    id: "n4",
    title: "Deadline sắp đến",
    message: "Bài tập Lab 05 sẽ hết hạn trong 2 ngày",
    time: "3 giờ trước",
    type: "deadline",
    read: true,
  },
];

// Courses
export const courses = [
  {
    id: "c1",
    code: "IT008",
    name: "Lập trình Web",
    teacher: "ThS. Nguyễn Văn A",
    credits: 4,
    schedule: "Thứ 2 (7:30-9:30), Thứ 5 (13:30-15:30)",
    room: "B3.10",
    progress: 65,
    grade: null,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "c2",
    code: "IT005",
    name: "Cơ sở dữ liệu",
    teacher: "TS. Trần Thị B",
    credits: 4,
    schedule: "Thứ 3 (9:45-11:45), Thứ 6 (7:30-9:30)",
    room: "A1.05",
    progress: 70,
    grade: null,
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "c3",
    code: "IT012",
    name: "Trí tuệ nhân tạo",
    teacher: "PGS.TS. Lê Văn C",
    credits: 3,
    schedule: "Thứ 4 (13:30-15:30)",
    room: "C2.08",
    progress: 45,
    grade: null,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "c4",
    code: "IT006",
    name: "Mạng máy tính",
    teacher: "TS. Phạm Văn D",
    credits: 3,
    schedule: "Thứ 5 (9:45-11:45)",
    room: "D1.02",
    progress: 55,
    grade: null,
    color: "from-orange-500 to-red-500",
  },
];

// Weekly timetable
export const weeklyTimetable = [
  {
    day: "Thứ 2",
    date: "15/01",
    classes: [
      {
        subject: "Lập trình Web",
        code: "IT008",
        time: "07:30 - 09:30",
        room: "B3.10",
      },
    ],
  },
  {
    day: "Thứ 3",
    date: "16/01",
    classes: [
      {
        subject: "Cơ sở dữ liệu",
        code: "IT005",
        time: "09:45 - 11:45",
        room: "A1.05",
      },
    ],
  },
  {
    day: "Thứ 4",
    date: "17/01",
    classes: [
      {
        subject: "Trí tuệ nhân tạo",
        code: "IT012",
        time: "13:30 - 15:30",
        room: "C2.08",
      },
    ],
  },
  {
    day: "Thứ 5",
    date: "18/01",
    classes: [
      {
        subject: "Mạng máy tính",
        code: "IT006",
        time: "09:45 - 11:45",
        room: "D1.02",
      },
      {
        subject: "Lập trình Web",
        code: "IT008",
        time: "13:30 - 15:30",
        room: "B3.10",
      },
    ],
  },
  {
    day: "Thứ 6",
    date: "19/01",
    classes: [
      {
        subject: "Cơ sở dữ liệu",
        code: "IT005",
        time: "07:30 - 09:30",
        room: "A1.05",
      },
    ],
  },
  {
    day: "Thứ 7",
    date: "20/01",
    classes: [],
  },
  {
    day: "Chủ nhật",
    date: "21/01",
    classes: [],
  },
];

// UITThread Channels
export const threadChannels = [
  {
    id: "ch1",
    name: "IT008 - Lập trình Web",
    type: "course",
    icon: "📚",
    memberCount: 156,
    unreadCount: 5,
    lastMessage: "Ai có slide bài 5 không ạ?",
    lastMessageTime: "5 phút trước",
  },
  {
    id: "ch2",
    name: "IT005 - Cơ sở dữ liệu",
    type: "course",
    icon: "📚",
    memberCount: 142,
    unreadCount: 0,
    lastMessage: "Thầy vừa up điểm giữa kỳ rồi nè",
    lastMessageTime: "1 giờ trước",
  },
  {
    id: "ch3",
    name: "Trao đổi kinh nghiệm",
    type: "topic",
    icon: "💡",
    memberCount: 523,
    unreadCount: 12,
    lastMessage: "Tips học TOEIC hiệu quả cho IT-er",
    lastMessageTime: "30 phút trước",
  },
  {
    id: "ch4",
    name: "Mua bán - Trao đổi",
    type: "marketplace",
    icon: "🛒",
    memberCount: 892,
    unreadCount: 3,
    lastMessage: "Cần bán laptop Dell XPS cũ",
    lastMessageTime: "2 giờ trước",
  },
  {
    id: "ch5",
    name: "Tìm đồ thất lạc",
    type: "lostfound",
    icon: "🔍",
    memberCount: 1024,
    unreadCount: 1,
    lastMessage: "Ai nhặt được thẻ SV ở căn tin không?",
    lastMessageTime: "4 giờ trước",
  },
  {
    id: "ch6",
    name: "Tuyển thành viên CLB",
    type: "topic",
    icon: "🎯",
    memberCount: 678,
    unreadCount: 0,
    lastMessage: "DSC UIT tuyển thành viên kỳ Spring 2024",
    lastMessageTime: "1 ngày trước",
  },
];

// Thread posts
export const threadPosts = [
  {
    id: "p1",
    channelId: "ch1",
    author: {
      name: "Trần Văn Hùng",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hung",
      badge: "top-collaborator",
    },
    content:
      "Mọi người ơi, ai có slide bài 5 về React Hooks không ạ? Mình đi học muộn bị miss mất phần đó 😅",
    timestamp: "5 phút trước",
    likes: 3,
    replies: 2,
    attachments: [],
  },
  {
    id: "p2",
    channelId: "ch1",
    author: {
      name: "Lê Thị Mai",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mai",
      badge: "helper",
    },
    content:
      "Mình có nè, để mình up lên Google Drive rồi share link cho bạn nhé!",
    timestamp: "3 phút trước",
    likes: 5,
    replies: 0,
    attachments: [],
    parentId: "p1",
  },
  {
    id: "p3",
    channelId: "ch1",
    author: {
      name: "Nguyễn Đức Anh",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anh",
      badge: null,
    },
    content:
      "Bài lab tuần này có khó không mọi người? Mình thấy phần useEffect hơi confuse 🤔",
    timestamp: "1 giờ trước",
    likes: 8,
    replies: 5,
    attachments: [],
  },
  {
    id: "p4",
    channelId: "ch3",
    author: {
      name: "Phạm Minh Tuấn",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tuan",
      badge: "deadline-master",
    },
    content:
      "📌 Tips học TOEIC hiệu quả cho IT-er:\n\n1. Học từ vựng theo chủ đề (tech, business)\n2. Nghe podcast tiếng Anh về công nghệ\n3. Đọc documentation bằng tiếng Anh\n4. Practice với app Elsa Speak\n\nMình từ 550 lên 850 trong 6 tháng với cách này! 💪",
    timestamp: "30 phút trước",
    likes: 45,
    replies: 12,
    attachments: [],
  },
  {
    id: "p5",
    channelId: "ch4",
    author: {
      name: "Hoàng Văn Nam",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nam",
      badge: null,
    },
    content:
      "🔥 CẦN BÁN: Laptop Dell XPS 15 9520\n\n- CPU: i7-12700H\n- RAM: 16GB\n- SSD: 512GB\n- Màn hình 3.5K OLED\n- Còn bảo hành đến T6/2024\n- Giá: 28 triệu (còn thương lượng)\n\nLiên hệ: 0912xxx456",
    timestamp: "2 giờ trước",
    likes: 12,
    replies: 8,
    attachments: ["laptop.jpg"],
  },
];

// Project groups
export const projectGroups = [
  {
    id: "g1",
    name: "Nhóm đồ án Web - Team Alpha",
    courseCode: "IT008",
    members: [
      {
        name: "Nguyễn Văn Minh",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Minh",
        role: "leader",
      },
      {
        name: "Trần Thị Hoa",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hoa",
        role: "member",
      },
      {
        name: "Lê Văn Tùng",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tung",
        role: "member",
      },
      {
        name: "Phạm Mai Anh",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MaiAnh",
        role: "member",
      },
    ],
    lastMessage: "Mình đã push code lên branch feature/login rồi nhé",
    lastMessageTime: "15 phút trước",
    unreadCount: 3,
  },
  {
    id: "g2",
    name: "Nhóm CSDL - Database Warriors",
    courseCode: "IT005",
    members: [
      {
        name: "Nguyễn Văn Minh",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Minh",
        role: "member",
      },
      {
        name: "Đỗ Quang Huy",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Huy",
        role: "leader",
      },
      {
        name: "Võ Thị Lan",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lan",
        role: "member",
      },
    ],
    lastMessage: "Deadline milestone 2 là thứ 6 này nhé mọi người",
    lastMessageTime: "1 giờ trước",
    unreadCount: 0,
  },
];

// Chat messages
export const chatMessages = [
  {
    id: "m1",
    groupId: "g1",
    sender: {
      name: "Trần Thị Hoa",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hoa",
    },
    content: "Mình đã push code lên branch feature/login rồi nhé",
    timestamp: "15 phút trước",
    type: "text",
  },
  {
    id: "m2",
    groupId: "g1",
    sender: {
      name: "Lê Văn Tùng",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tung",
    },
    content: "Ok, để mình review code",
    timestamp: "10 phút trước",
    type: "text",
  },
  {
    id: "m3",
    groupId: "g1",
    sender: {
      name: "Nguyễn Văn Minh",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Minh",
    },
    content: "Mình có update file design mới, mọi người check thử nhé",
    timestamp: "5 phút trước",
    type: "text",
  },
];

// Grades
export const grades = [
  {
    semester: "HK1 2023-2024",
    courses: [
      {
        code: "IT001",
        name: "Nhập môn lập trình",
        credits: 4,
        midterm: 8.5,
        final: 9.0,
        total: 8.8,
        letterGrade: "A",
      },
      {
        code: "IT002",
        name: "Lập trình hướng đối tượng",
        credits: 4,
        midterm: 7.5,
        final: 8.0,
        total: 7.8,
        letterGrade: "B+",
      },
      {
        code: "IT003",
        name: "Cấu trúc dữ liệu",
        credits: 4,
        midterm: 8.0,
        final: 8.5,
        total: 8.3,
        letterGrade: "A",
      },
      {
        code: "MA001",
        name: "Giải tích",
        credits: 3,
        midterm: 7.0,
        final: 7.5,
        total: 7.3,
        letterGrade: "B",
      },
      // Current semester courses - Some with full grades, some with only midterm
      {
        code: "IT008",
        name: "Lập trình Web",
        credits: 4,
        midterm: 8.0,
        final: null,
        total: null,
        letterGrade: null,
      },
      {
        code: "IT005",
        name: "Cơ sở dữ liệu",
        credits: 4,
        midterm: 8.5,
        final: 8.8,
        total: 8.7,
        letterGrade: "A",
      },
      {
        code: "IT012",
        name: "Trí tuệ nhân tạo",
        credits: 3,
        midterm: 7.5,
        final: null,
        total: null,
        letterGrade: null,
      },
      {
        code: "IT006",
        name: "Mạng máy tính",
        credits: 3,
        midterm: 7.8,
        final: 8.2,
        total: 8.0,
        letterGrade: "B+",
      },
    ],
    gpa: 3.52,
  },
  {
    semester: "HK2 2022-2023",
    courses: [
      {
        code: "IT004",
        name: "Kiến trúc máy tính",
        credits: 3,
        midterm: 8.0,
        final: 8.5,
        total: 8.3,
        letterGrade: "A",
      },
      {
        code: "IT005",
        name: "Hệ điều hành",
        credits: 4,
        midterm: 7.5,
        final: 8.0,
        total: 7.8,
        letterGrade: "B+",
      },
      {
        code: "MA002",
        name: "Đại số tuyến tính",
        credits: 3,
        midterm: 8.5,
        final: 9.0,
        total: 8.8,
        letterGrade: "A",
      },
      {
        code: "EN001",
        name: "Tiếng Anh 1",
        credits: 3,
        midterm: 7.0,
        final: 7.5,
        total: 7.3,
        letterGrade: "B",
      },
    ],
    gpa: 3.38,
  },
];

// GPA progression
export const gpaProgression = [
  { semester: "HK1 21-22", gpa: 3.2 },
  { semester: "HK2 21-22", gpa: 3.35 },
  { semester: "HK1 22-23", gpa: 3.38 },
  { semester: "HK2 22-23", gpa: 3.42 },
  { semester: "HK1 23-24", gpa: 3.52 },
];
