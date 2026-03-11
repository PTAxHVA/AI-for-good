import type { CultureData, HistoricalEvent } from '../types/history.types';

export const vietnamCultureData: CultureData = {
  area: 'Lưu vực các sông lớn: sông Hồng, sông Mã, sông Cả (Bắc Bộ và Bắc Trung Bộ ngày nay).',
  weather: 'Nhiệt đới gió mùa, nóng ẩm, mưa nhiều, nguồn nước ngọt dồi dào. Giàu khoáng sản: Đồng, sắt, thiếc, chì.',
  economyAndTrade: 'Nông nghiệp: Trồng lúa nước (dùng lưỡi cày đồng), trị thủy. Thủ công: Luyện kim, đúc đồng đạt trình độ cao, dệt tơ tằm, làm đồ gốm. Chăn nuôi: Đánh cá, nuôi gia súc, gia cầm.',
  culture: 'Thờ Mặt Trời, vật tổ (Chim Lạc, Giao Long), sùng bái tự nhiên, tín ngưỡng phồn thực. Đặc biệt thịnh hành thờ cúng tổ tiên, thờ người có công.',
  artAndWriting: 'Văn học: Truyền miệng (Thần thoại, truyền thuyết như Thánh Gióng, Sơn Tinh - Thủy Tinh). Âm nhạc/Điêu khắc: Trống đồng Đông Sơn, thạp đồng với hoa văn vũ công, nhạc cụ.',
  lifestyleAndEatingHabits: 'Lương thực: Gạo là chính. Ẩm thực: Bánh chưng, bánh giầy, làm đường, mật. Dùng nhiều gia vị. Tập tục: Ăn trầu, nhuộm răng, xăm mình. Lễ hội hóa trang.',
  house: 'Sống định cư thành làng xóm. Kiểu nhà phổ biến là Nhà sàn.',
  culturalSymbol: 'Trống đồng Đông Sơn (đỉnh cao kĩ thuật luyện kim), hình ảnh Chim Lạc, Thành Cổ Loa.',
  clothing: 'Nữ mặc áo váy, nam đóng khố. Có sử dụng đồ trang sức và biết làm đẹp.'
};

export const cultureLocations: HistoricalEvent[] = [
  {
    id: 'culture1',
    name: 'Kinh đô nước Văn Lang',
    year: 1945,
    position: { x: 39, y: 34 },
    period: 'Văn Lang - Âu Lạc',
    unlocked: true,
    level: 1,
    location: 'Phong Châu (Việt Tú - Phú Thọ)',
    basicInfo: {
      location: 'Phong Châu (Việt Tú - Phú Thọ)',
      time: 'Khoảng 2879-258 TCN',
      mainEvent: 'Trung tâm chính trị của nước Văn Lang'
    },
    detailedInfo: {
      cause: 'Trung tâm quyền lực lâu đời nhất của người Việt cổ',
      development: 'Là nơi tổ chức quản lý nhà nước Văn Lang',
      result: 'Nền tảng nền văn minh Việt cổ',
      characters: ['Hùng Vương']
    },
    advancedInfo: {
      territoryChanges: 'Kinh đô của nước Văn Lang',
      campaignMap: 'Trung tâm lưu vực sông Hồng',
      marchRoutes: ['Trung tâm hành chính toàn quốc']
    },
    cultureData: vietnamCultureData
  },
  {
    id: 'culture2',
    name: 'Kinh đô nước Âu Lạc',
    year: 1945,
    position: { x: 46, y: 37 },
    period: 'Văn Lang - Âu Lạc',
    unlocked: true,
    level: 1,
    location: 'Cổ Loa (Đông Anh - Hà Nội)',
    basicInfo: {
      location: 'Cổ Loa (Đông Anh - Hà Nội)',
      time: 'Khoảng 258-179 TCN',
      mainEvent: 'Thủ đô của nước Âu Lạc do Thục Phán lập'
    },
    detailedInfo: {
      cause: 'Thục Phán thành lập nước Âu Lạc sau khi sáp nhập Văn Lang',
      development: 'Xây dựng thành Cổ Loa - kiến trúc quân sự tiên tiến',
      result: 'Trở thành một trong những kinh đô cổ lâu đời nhất của Việt Nam',
      characters: ['Thục Phán', 'Hùng Vương']
    },
    advancedInfo: {
      territoryChanges: 'Kinh đô của nước Âu Lạc',
      campaignMap: 'Nằm tại lưu vực sông Hồng, Hà Nội ngày nay',
      marchRoutes: ['Trung tâm hành chính và quân sự']
    },
    cultureData: vietnamCultureData
  },
  {
    id: 'culture3',
    name: 'Lưu vực sông Mã',
    year: 1945,
    position: { x: 42, y: 57 },
    period: 'Văn Lang - Âu Lạc',
    unlocked: true,
    level: 1,
    location: 'Sông Mã (Thanh Hóa - Nghệ An)',
    basicInfo: {
      location: 'Sông Mã (Thanh Hóa - Nghệ An)',
      time: 'Thời kỳ Văn Lang - Âu Lạc',
      mainEvent: 'Vùng sinh lợi, trung tâm kinh tế Bắc Trung Bộ'
    },
    detailedInfo: {
      cause: 'Sông Mã là lưu vực sông lớn, phong phú tài nguyên',
      development: 'Cổ nhân phát triển nông nghiệp, thủ công thương mại',
      result: 'Thành những vùng đất phong phú của Việt cổ',
      characters: ['Cư dân Bắc Trung Bộ']
    },
    advancedInfo: {
      territoryChanges: 'Lãnh thổ phía Nam của Văn Lang - Âu Lạc',
      campaignMap: 'Lưu vực sông Mã từ Thanh Hóa đến Nghệ An',
      marchRoutes: ['Phát triển kinh tế nông nghiệp dọc sông Mã']
    },
    cultureData: vietnamCultureData
  },
  {
    id: 'culture4',
    name: 'Lưu vực sông Cả',
    year: 1945,
    position: { x: 43, y: 73 },
    period: 'Văn Lang - Âu Lạc',
    unlocked: true,
    level: 1,
    location: 'Sông Cả (Nghệ An - Hà Tĩnh)',
    basicInfo: {
      location: 'Sông Cả (Nghệ An - Hà Tĩnh)',
      time: 'Thời kỳ Văn Lang - Âu Lạc',
      mainEvent: 'Vùng sinh lợi phía Nam của Việt cổ'
    },
    detailedInfo: {
      cause: 'Sông Cả là lưu vực sông lớn, phong phú đất đai',
      development: 'Nơi phát triển nông nghiệp, thủ công tiên tiến',
      result: 'Là một trong những trung tâm kinh tế-văn hóa của Việt cổ',
      characters: ['Cư dân Bắc Trung Bộ']
    },
    advancedInfo: {
      territoryChanges: 'Lãnh thổ phía Nam xa nhất của Văn Lang - Âu Lạc',
      campaignMap: 'Lưu vực sông Cả từ Nghệ An đến Hà Tĩnh',
      marchRoutes: ['Sự mở rộng phía Nam của Văn Lang']
    },
    cultureData: vietnamCultureData
  }
];
