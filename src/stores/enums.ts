import type { GetProp, UploadProps } from 'antd';

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const JOB_ID_XDLD = [
    // ====================================================================== XÂY DỰNG LẮP ĐẶT
    {
        value: 'XDLD-ĐT',
        label: 'XDLD-ĐT',
        childrens: [
            { value: 'BD-01', label: 'Kiểm tra thông tin mời, chào' },
            { value: 'BD-02', label: 'Cập nhật thông tin mời chào vào bảng tổng hợp' },
            { value: 'BD-03', label: 'Biên soạn hồ sơ hỏi hàng nhà cung cấp' },
            { value: 'BD-04', label: 'Tiếp nhận đánh giá hồ sơ nhà cung cấp' },
            { value: 'BD-05', label: 'Thương thảo chốt giá với nhà cung cấp' },
            { value: 'BD-06', label: 'Biên soạn HS chất lượng hàng hóa của nhà cung cấp' },
            { value: 'BD-07', label: 'Biên soạn hồ sơ năng lực nhà thầu' },
            { value: 'BD-08', label: 'Biên soạn hồ sơ năng lực tài chính nhà thầu' },
            { value: 'BD-09', label: 'Biên soạn hồ sơ năng lực kinh nghiệm nhà thầu' },
            {
                value: 'BD-10',
                label: 'Biên soạn hồ sơ chất lượng hàng hóa của nhà thầu sản xuất'
            },
            { value: 'BD-11', label: 'Biên soạn hồ sơ ưu đãi' },
            { value: 'BD-12', label: 'Biên soạn hồ sơ máy móc thi công' },
            { value: 'BD-13', label: 'Biên soạn hồ sơ nhân sự chủ chốt' },
            { value: 'BD-14', label: 'Biên soạn biện pháp thi công' },
            { value: 'BD-15', label: 'Biên soạn biểu kê tiến độ' },
            { value: 'BD-16', label: 'Biên soạn hồ sơ đáp ứng bảng điền kỹ thuật' },
            { value: 'BD-17', label: 'Biên soạn các cam kết theo yêu cầu E-HSMT' },
            { value: 'BD-18', label: 'Nộp thầu' },
            { value: 'BD-19', label: 'Hoàn thiện lưu HSMT' },
            { value: 'BD-20', label: 'Tiếp nhận thông tin làm rõ HSDT' },
            { value: 'BD-21', label: 'Đọc phân tích đưa ra kết luận HSDT' },
            { value: 'BD-22', label: 'Biên soạn văn bản trả lời HSDT' },
            { value: 'BD-23', label: 'Biên soạn hồ sơ bổ sung theo HSDT' },
            { value: 'BD-24', label: 'Gửi hồ sơ làm rõ HSDT' },
            { value: 'BD-25', label: 'Tiếp nhận văn bản đề nghị thương thảo hợp đồng' },
            { value: 'BD-26', label: 'Chuẩn bị hồ sơ thương thảo hợp đồng' },
            { value: 'BD-27', label: 'Đi thương thảo hợp đồng' },
            { value: 'BD-28', label: 'Báo cáo kết quả thương thảo hợp đồng' },
            { value: 'BD-29', label: 'Hoàn thiện hợp đồng' },
            { value: 'BD-30', label: 'Ký hợp đồng với khách hàng' },
            { value: 'BD-31', label: 'Bàn giao hợp đồng các phòng' }
        ]
    },
    {
        value: 'XDLD-QLTC',
        label: 'XDLD-QLTC',
        childrens: [
            { value: 'QLTC-01', label: 'Bóc tách & Trình duyệt KL vật tư thiết bị sản xuất' },
            { value: 'QLTC-02', label: 'Bóc tách & Trình duyệt KL vật tư thiết bị đi mua' },
            {
                value: 'QLTC-03',
                label: 'Bóc tách & Trình duyệt KL nhân công & ca máy thi công'
            },
            { value: 'QLTC-04', label: 'Bóc tách & Trình duyệt KL nhân công & ca máy đi thuê' },
            { value: 'QLTC-05', label: 'Biên soạn hồ sơ đề nghị tổ đội thi công báo giá' },
            { value: 'QLTC-06', label: 'Thương thảo chốt giá với tổ đội' },
            { value: 'QLTC-07', label: 'Ký hợp đồng với tổ đội' },
            { value: 'QLTC-08', label: 'Kiểm tra đệ trình hồ sơ tạm ứng' },
            { value: 'QLTC-09', label: 'Trình hồ sơ nhân sự trước khi thi công' },
            { value: 'QLTC-10', label: 'Trình hồ sơ máy móc trước thi công' },
            { value: 'QLTC-11', label: 'Trình hồ sơ vật liệu trước thi công' },
            { value: 'QLTC-12', label: 'Trình hồ sơ đơn vị thí nghiệm trước thi công' },
            { value: 'QLTC-13', label: 'Trình biện pháp tổ chức thi công' },
            { value: 'QLTC-14', label: 'Trình bảng kê tiến độ trước thi công' },

            { value: 'TTGĐ-01', label: 'Hồ sơ QLCL để nghiệm thu thanh toán' },
            { value: 'TTGĐ-02', label: 'Vẽ hoàn công để thanh toán' },
            { value: 'TTGĐ-03', label: 'Bảng khối lượng hoàn thành' },
            { value: 'TTGĐ-04', label: 'Bảng giá trị thanh toán' },
            { value: 'TTGĐ-05', label: 'Văn bản đệ trình hồ sơ thanh toán' },
            { value: 'TTGĐ-06', label: 'Trình ký hồ sơ với TVGS' },
            { value: 'TTGĐ-07', label: 'Trình ký hồ sơ với đại diện chủ đầu tư' },
            { value: 'TTGĐ-08', label: 'Kiểm tra xác nhận KL hoàn thành của tổ đội' },
            { value: 'TTGĐ-09', label: 'Kiểm tra xác nhận giá trị hoàn thành của tổ đội' },
            { value: 'TTGĐ-10', label: 'Trình ký hồ sơ thanh toán cho tổ đội' },

            { value: 'QT-01', label: 'Biên tập HS QLCL công trình' },
            { value: 'QT-02', label: 'Bản vẽ hoàn công công trình' },
            { value: 'QT-03', label: 'Khối lượng phát sinh trong hợp đồng' },
            { value: 'QT-04', label: 'Khối lượng phát sinh ngoài hợp đồng' },
            { value: 'QT-05', label: 'Giá trị phát sinh trong hợp đồng' },
            { value: 'QT-06', label: 'Giá trị phát sinh ngoài hợp đồng' },
            { value: 'QT-07', label: 'Trình duyệt phát sinh ngoài thầu' },
            { value: 'QT-08', label: 'Trình hồ sơ quyết toán với TVGS' },
            { value: 'QT-09', label: 'Trình hồ sơ quyết toán với TVTK' },
            { value: 'QT-10', label: 'Trình hồ sơ quyết toán với QLVH' },
            { value: 'QT-11', label: 'Trình hồ sơ quyết toán với CĐT' },
            { value: 'QT-12', label: 'Kiểm tra khối lượng quyết toán của tổ đội' },
            { value: 'QT-13', label: 'Kiểm tra giá trị quyết toán của tổ đội' },
            { value: 'QT-14', label: 'Trình hồ sơ quyết toán cho tổ đội' }
        ]
    },
    {
        value: 'XDLD-KHVT',
        label: 'XDLD-KHVT',
        childrens: [
            { value: 'KHVT-01', label: 'Tập hợp khối lượng vật tư, vật liệu cần mua' },
            { value: 'KHVT-02', label: 'Kiểm tra đánh giá nhà cung cấp' },
            { value: 'KHVT-03', label: 'Biên soạn hồ sơ hỏi hàng nhà cung cấp' },
            { value: 'KHVT-04', label: 'Tập hợp đánh giá hồ sơ chào hàng của nhà cung cấp' },
            { value: 'KHVT-05', label: 'Thương thảo chốt giá với nhà cung cấp' },
            { value: 'KHVT-06', label: 'Ký hợp đồng với nhà cung cấp' },
            { value: 'KHVT-07', label: 'Kiểm tra đệ trình hồ sơ tạm ứng' },
            { value: 'KHVT-08', label: 'Kiểm tra đệ trình phê duyệt trước lúc cung ứng' },
            { value: 'KHVT-09', label: 'Tổ chức kiểm tra trước lúc nhận hàng' },
            {
                value: 'KHVT-10',
                label: 'Kiểm tra Hồ sơ giao hàng và Thống nhất lịch nhận hàng'
            },
            { value: 'KHVT-11', label: 'Kiểm tra đệ trình hồ sơ thanh toán' },
            { value: 'KHVT-12', label: 'Tổ chức tiếp nhận và bốc xếp hàng hóa' },
            { value: 'KHVT-13', label: 'Giám sát vận chuyển tới nơi giao hàng' },
            { value: 'KHVT-14', label: 'Tổ chức bốc giỡ hàng tại nơi giao hàng' },
            { value: 'KHVT-15', label: 'Tổ chức nghiệm thu bàn giao với khách hàng' },
            { value: 'KHVT-16', label: 'Tập hợp hồ sơ nghiệm thu và bàn giao TCKT' },
            {
                value: 'KHVT-17',
                label: 'Tổ chức trao đổi hàng bị lỗi và sai hỏng với nhà cung cấp'
            }
        ]
    },
    {
        value: 'XDLD-QLKTH',
        label: 'XDLD-QLKTH',
        childrens: [
            { value: 'QLKTH-07', label: 'Khảo sát và lập kế hoạch cắt điện thi công' },
            { value: 'QLKTH-08', label: 'Soạn biện pháp thi công cắt điện' },
            { value: 'QLKTH-09', label: 'Xin phép và phối hợp các đơn vị chức năng' },
            { value: 'QLKTH-10', label: 'Trình duyệt phương án cắt điện' },
            { value: 'QLKTH-13', label: 'Chuẩn bị và trình hồ sơ nghiệm thu đóng điện' },
            {
                value: 'QLKTH-14',
                label: 'Biên tập và trình duyệt hồ sơ đề xuất TEST ETE'
            },
            { value: 'QLKTH-15', label: 'Kiểm tra và trình duyêt kết quả thí nghiệm' },
            { value: 'QLKTH-16', label: 'Kiểm tra và trình duyêt kết quả TEST ETE' },
            { value: 'QLKTH-18', label: 'Tổ chức Nghiệm thu kỹ thuật các hạng mục' },
            { value: 'QLKTH-19', label: 'Nghiệm thu đóng điện công trình' },
            { value: 'QLKTH-20', label: 'Nghiệm thu bàn giao công trình' },
            { value: 'QLKTH-21', label: 'Kiểm tra khối lượng hoàn thành công trình' }
        ]
    },
    {
        value: 'XDLD-CHTT',
        label: 'XDLD-CHTT',
        childrens: [
            { value: 'CHTT-01', label: 'Tổ chức tiếp nhận bàn giao mặt bằng và tim mốc' },
            { value: 'CHTT-02', label: 'Chỉ huy thi công hạng mục' },
            { value: 'CHTT-03', label: 'Nghiệm thu vật liệu trước thi công' },
            { value: 'CHTT-04', label: 'Lấy mẫu vật liệu thí nghiệm' },
            { value: 'CHTT-05', label: 'Giám sát kết quả thí nghiệm' },
            { value: 'CHTT-06', label: 'Nghiệm thu hạng mục chuyển bước thi công' },
            { value: 'CHTT-07', label: 'Nghiệm thu khối lượng thi công hoàn thành đợt' },
            { value: 'CHTT-08', label: 'Kiểm tra giá trị thi công hoàn thành đợt' },
            { value: 'CHTT-09', label: 'Nghiệm thu khối lượng thi công hoàn công trình' },
            { value: 'CHTT-10', label: 'Kiểm tra giá trị thi công hoàn công trình' },
            { value: 'CHTT-11', label: 'Nghiệm thu kỹ thuật' },
            { value: 'CHTT-12', label: 'Nghiệm thu đóng điện công trình' },
            { value: 'CHTT-13', label: 'Nghiệm thu bàn giao công trình' },
            { value: 'CHTT-14', label: 'Kiểm tra khối lượng hoàn thành công trình' },
            { value: 'CHTT-15', label: 'Kiểm tra giá trị hoàn thành công trình' },
            { value: 'CHTT-16', label: 'Kiểm tra và trình hồ sơ thanh toán cho tổ đội' },
            { value: 'CHTT-17', label: 'Báo cáo tiến độ' }
        ]
    },
    {
        value: 'XDLD-GSTC',
        label: 'XDLD-GSTC',
        childrens: [
            { value: 'GSTC-02', label: 'Khảo sát mặt bằng và đường vào thi công' },
            { value: 'GSTC-03', label: 'Lập danh mục vị trí vướng mặt bằng' },
            { value: 'GSTC-04', label: 'Thương thảo đền bù mặt bằng' },
            { value: 'GSTC-05', label: 'Thành toán chi phí đền bù và hỗ trợ' },
            { value: 'GSTC-06', label: 'Tiếp nhận mặt bằng sau đền bù' },
            { value: 'GSTC-07', label: 'Bàn giao mặt bằng cho tổ đội' },
            { value: 'GSTC-08', label: 'Tiếp nhận và bàn giao vật tư vật liệu cho tổ đội' },
            { value: 'GSTC-09', label: 'Tiếp nhận và bàn giao dụng cụ và máy cho tổ đội' },
            { value: 'GSTC-10', label: 'Cập nhật nhật ký thi công' },
            { value: 'GSTC-11', label: 'Nghiệm thu vật liệu trước thi công' },
            { value: 'GSTC-12', label: 'Ký biên bản lấy mẫu vật liệu thí nghiệm' },
            { value: 'GSTC-13', label: 'Ký biên bản giám sát kết quả thí nghiệm' },
            { value: 'GSTC-14', label: 'Nghiệm thu hạng mục chuyển bước thi công' },
            { value: 'GSTC-15', label: 'Kiểm tra xác nhận khối lượng hoàn thành của tổ đội' },
            { value: 'GSTC-16', label: 'Kiểm tra xác nhận trao trả vật tư thiết bị của tổ đội' },
            { value: 'GSTC-17', label: 'Giám sát và kiểm tra công tác sử dụng dụng cụ, máy móc của tổ đội' }
        ]
    },
    {
        value: 'XDLD',
        label: 'XDLD',
        childrens: [
            { value: 'QLXD-01', label: 'Lập kế hoạch & phân công giao việc' },
            { value: 'QLXD-02', label: 'Báo cáo & đánh giá tiến độ thi công các công trình' },
            { value: 'QLXD-03', label: 'Quản lý & đánh giá nhân sự' },
            { value: 'QLXD-04', label: 'Báo cáo Quản lý vật tư, thiết bị các công trình' },
            { value: 'QLXD-05', label: 'Báo cáo quản lý chất lượng thi công các công trình' },
            { value: 'QLXD-06', label: 'Tổng hợp báo cáo công tác kiểm tra nghiệm thu vật liệu, thiết bị' },
            { value: 'QLXD-07', label: 'Báo cáo & đánh giá giám sát an toàn lao động' },
            { value: 'QLXD-08', label: 'Báo cáo công tác quản lý chi phí thi công và lắp đặt' },
            { value: 'QLXD-09', label: 'Báo cáo kiểm soát hồ sơ thi công và lắp đặt' },
            { value: 'QLXD-10', label: 'Báo cáo quản lý thanh toán và quyết toán' },
            { value: 'QLXD-11', label: 'Báo cáo tiến độ, sự cố và giải pháp' },
            { value: 'QLXD-12', label: 'Phối hợp với các bên liên quan' },
            { value: 'QLXD-13', label: 'Xử lý các phát sinh trong thi công và lắp đặt' },
            { value: 'QLXD-14', label: 'Quản lý và đánh giá chất lượng, tuổi thọ dụng cụ và máy móc' },

            { value: 'XDLD-HOP-01', label: 'Họp nội bộ phòng' },
            { value: 'XDLD-HOP-02', label: 'Họp nội bộ công trình' },
            { value: 'XDLD-HOP-03', label: 'Họp nội bộ công ty' },
            { value: 'XDLD-HOP-04', label: 'Họp với lãnh đạo' },
            { value: 'XDLD-HOP-05', label: 'Họp với khách chủ đầu tư' },
            { value: 'XDLD-HOP-06', label: 'Họp với nhà cung cấp' },
            { value: 'XDLD-HOP-07', label: 'Họp với tổ đội thi công' },
            { value: 'XDLD-HOP-08', label: 'Họp với tư vấn thiết kế' },
            { value: 'XDLD-HOP-09', label: 'Họp với tư vấn giám sát' },
            { value: 'XDLD-HOP-10', label: 'Họp với đơn vị quản lý vận hành' },
            { value: 'XDLD-HOP-11', label: 'Họp với đơn vị chính quyền địa phương' },
            { value: 'XDLD-HOP-12', label: 'Họp với ứng viên' },
            { value: 'XDLD-HOP-13', label: 'Báo cáo kết quả họp' }
        ]
    },
    // ====================================================================== TỔ CHỨC HÀNH CHÍNH
    {
        value: 'TCHC-HC',
        label: 'TCHC-HC',
        childrens: [
            { value: 'HC-01', label: 'Trực VP & tiếp khách, nhận công văn' },
            { value: 'HC-02', label: 'Nhận & phát bưu phẩm, hồ sơ' },
            { value: 'HC-03', label: 'Soạn, in, lưu văn bản' },
            { value: 'HC-04', label: 'Đặt vé, phòng khách sạn, phòng họp' },
            { value: 'HC-05', label: 'Mua VPP, đồng phục, tài sản' },
            { value: 'HC-06', label: 'Biên soạn, cập nhật hồ sơ ISO' },
            { value: 'HC-07', label: 'Tổ chức đánh giá ISO' },
            { value: 'HC-08', label: 'Báo cáo kết quả ISO' },
            { value: 'HC-09', label: 'Sao y công chứng' },

            { value: 'TCHC-HOP-01', label: 'Họp nội bộ phòng' },
            { value: 'TCHC-HOP-02', label: 'Họp nội bộ công ty' },
            { value: 'TCHC-HOP-03', label: 'Họp với lãnh đạo' },
            { value: 'TCHC-HOP-04', label: 'Họp với khách hàng' },
            { value: 'TCHC-HOP-05', label: 'Họp với nhà cung cấp' },
            { value: 'TCHC-HOP-06', label: 'Họp với đơn vị quản lý nhà nước' },
            { value: 'TCHC-HOP-07', label: 'Họp với người lao động (NLĐ)' },
            { value: 'TCHC-HOP-08', label: 'Họp với ứng viên' },
            { value: 'TCHC-HOP-09', label: 'Báo cáo kết quả họp' }
        ]
    },
    {
        value: 'TCHC-NS',
        label: 'TCHC-NS',
        childrens: [
            { value: 'NS-01', label: 'Đăng tin tuyển dụng' },
            { value: 'NS-02', label: 'Lọc hồ sơ ứng viên' },
            { value: 'NS-03', label: 'Tổ chức phỏng vấn' },
            { value: 'NS-04', label: 'Soạn quyết định nhân sự' },
            { value: 'NS-05', label: 'Làm & ký hợp đồng lao động' },
            { value: 'NS-06', label: 'Đào tạo hội nhập ứng viên' },
            { value: 'NS-07', label: 'Kê khai cắt giảm lao động với BHXH' },
            { value: 'NS-08', label: 'Kê khai & giải quyết chế độ BHXH cho nhân viên' },
            { value: 'NS-09', label: 'Tổng hợp bảng chấm công' },

            { value: 'TCHC-HOP-01', label: 'Họp nội bộ phòng' },
            { value: 'TCHC-HOP-02', label: 'Họp nội bộ công ty' },
            { value: 'TCHC-HOP-03', label: 'Họp với lãnh đạo' },
            { value: 'TCHC-HOP-04', label: 'Họp với khách hàng' },
            { value: 'TCHC-HOP-05', label: 'Họp với nhà cung cấp' },
            { value: 'TCHC-HOP-06', label: 'Họp với đơn vị quản lý nhà nước' },
            { value: 'TCHC-HOP-07', label: 'Họp với người lao động (NLĐ)' },
            { value: 'TCHC-HOP-08', label: 'Họp với ứng viên' },
            { value: 'TCHC-HOP-09', label: 'Báo cáo kết quả họp' }
        ]
    },
    {
        value: 'TCHC-IT',
        label: 'TCHC-IT',
        childrens: [
            { value: 'IT-01', label: 'Kiểm tra, kiểm định thiết bị' },
            { value: 'IT-02', label: 'Sửa chữa và bảo trì thiết bị' },
            { value: 'IT-03', label: 'Lắp đặt và đấu nối thiết bị' },
            { value: 'IT-04', label: 'Cài đặt phần mềm và cấu hình thiết bị' },
            { value: 'IT-05', label: 'Quản lý và cập nhật website' },
            { value: 'IT-06', label: 'Thiết kế đồ họa chế bản' },
            { value: 'IT-07', label: 'Chuẩn bị và hỗ trợ thiết bị cho sự kiện' },
            { value: 'IT-08', label: 'Tiếp nhận, kiểm tra và nhập kho thiết bị mới' },
            { value: 'IT-09', label: 'Tháo dỡ và xử lý thiết bị cũ' },
            { value: 'IT-10', label: 'Thanh lý thiết bị và tài sản công nghệ thông tin' },
            { value: 'IT-11', label: 'Lập kế hoạch và đề xuất mua vật tư thiết bị IT' },

            { value: 'TCHC-HOP-01', label: 'Họp nội bộ phòng' },
            { value: 'TCHC-HOP-02', label: 'Họp nội bộ công ty' },
            { value: 'TCHC-HOP-03', label: 'Họp với lãnh đạo' },
            { value: 'TCHC-HOP-04', label: 'Họp với khách hàng' },
            { value: 'TCHC-HOP-05', label: 'Họp với nhà cung cấp' },
            { value: 'TCHC-HOP-06', label: 'Họp với đơn vị quản lý nhà nước' },
            { value: 'TCHC-HOP-07', label: 'Họp với người lao động (NLĐ)' },
            { value: 'TCHC-HOP-08', label: 'Họp với ứng viên' },
            { value: 'TCHC-HOP-09', label: 'Báo cáo kết quả họp' }
        ]
    },
    {
        value: 'TCHC-LX',
        label: 'TCHC-LX',
        childrens: [
            { value: 'LX-01', label: 'Đưa khách đi' },
            { value: 'LX-02', label: 'Đón khách tới' },
            { value: 'LX-03', label: 'Rửa dọn xe' },
            { value: 'LX-04', label: 'Sửa chữa xe' },
            { value: 'LX-05', label: 'Đăng ký & hồ sơ xe' },
            { value: 'LX-06', label: 'Vận chuyển hàng' },
            { value: 'LX-07', label: 'Bốc xếp hàng' },
            { value: 'LX-08', label: 'Tổng hợp thanh toán chi phí đi lại' },

            { value: 'TCHC-HOP-01', label: 'Họp nội bộ phòng' },
            { value: 'TCHC-HOP-02', label: 'Họp nội bộ công ty' },
            { value: 'TCHC-HOP-03', label: 'Họp với lãnh đạo' },
            { value: 'TCHC-HOP-04', label: 'Họp với khách hàng' },
            { value: 'TCHC-HOP-05', label: 'Họp với nhà cung cấp' },
            { value: 'TCHC-HOP-06', label: 'Họp với đơn vị quản lý nhà nước' },
            { value: 'TCHC-HOP-07', label: 'Họp với người lao động (NLĐ)' },
            { value: 'TCHC-HOP-08', label: 'Họp với ứng viên' },
            { value: 'TCHC-HOP-09', label: 'Báo cáo kết quả họp' }
        ]
    },
    {
        value: 'TCHC-CANTIN',
        label: 'TCHC-CANTIN',
        childrens: [
            { value: 'CATER-01', label: 'Đi chợ' },
            { value: 'CATER-02', label: 'Quản lý vật tư nấu ăn và vệ sinh' },
            { value: 'CATER-03', label: 'Nấu ăn' },
            { value: 'CATER-04', label: 'Rửa chén sau khi ăn' },
            { value: 'CATER-05', label: 'Vệ sinh văn phòng' },
            { value: 'CATER-06', label: 'Vệ sinh lau chùi, hút bụi' },
            { value: 'CATER-07', label: 'Chăm sóc cây' },
            { value: 'CATER-08', label: 'Kiểm tra chất lượng vệ sinh' },
            { value: 'CATER-09', label: 'Kiểm tra an toàn vệ sinh thực phẩm' },
            { value: 'CATER-10', label: 'Tổng hợp và thanh toán chi phí đi chợ' },
            { value: 'CATER-11', label: 'Báo cáo công việc và đánh giá chất lượng công tác' },

            { value: 'TCHC-HOP-01', label: 'Họp nội bộ phòng' },
            { value: 'TCHC-HOP-02', label: 'Họp nội bộ công ty' },
            { value: 'TCHC-HOP-03', label: 'Họp với lãnh đạo' },
            { value: 'TCHC-HOP-04', label: 'Họp với khách hàng' },
            { value: 'TCHC-HOP-05', label: 'Họp với nhà cung cấp' },
            { value: 'TCHC-HOP-06', label: 'Họp với đơn vị quản lý nhà nước' },
            { value: 'TCHC-HOP-07', label: 'Họp với người lao động (NLĐ)' },
            { value: 'TCHC-HOP-08', label: 'Họp với ứng viên' },
            { value: 'TCHC-HOP-09', label: 'Báo cáo kết quả họp' }
        ]
    },
    {
        value: 'TCHC',
        label: 'TCHC',
        childrens: [
            { value: 'QL-01', label: 'Lập kế mục tiêu và kế hoạch tuần của phòng' },
            { value: 'QL-02', label: 'Phân công nhiệm vụ cho chuyên viên trong phòng' },
            { value: 'QL-03', label: 'Giám sát tiến độ và chất lượng công việc của nhân viên' },
            { value: 'QL-04', label: 'Tổ chức họp định kỳ phòng ban' },
            { value: 'QL-05', label: 'Đánh giá hiệu quả công việc nhân viên theo KPI' },
            { value: 'QL-06', label: 'Báo cáo kết quả công việc phòng ban lên cấp trên' },
            { value: 'QL-07', label: 'Quản lý nguồn lực, phân bổ ngân sách phòng ban' },
            { value: 'QL-08', label: 'Giải quyết các vấn đề phát sinh trong phòng' },
            { value: 'QL-09', label: 'Đề xuất tuyển dụng, đào tạo và phát triển nhân sự' },
            { value: 'QL-10', label: 'Đảm bảo tuân thủ các quy định nội bộ và pháp luật' },
            { value: 'QL-11', label: 'Tham gia họp với lãnh đạo cấp cao' },
            { value: 'QL-12', label: 'Xây dựng và cải tiến quy trình làm việc trong phòng' },
            { value: 'QL-13', label: 'Quản lý rủi ro và đảm bảo an toàn trong phòng' },
            { value: 'QL-14', label: 'Biên soạn các quyết định và thông báo' },

            { value: 'TCHC-HOP-01', label: 'Họp nội bộ phòng' },
            { value: 'TCHC-HOP-02', label: 'Họp nội bộ công ty' },
            { value: 'TCHC-HOP-03', label: 'Họp với lãnh đạo' },
            { value: 'TCHC-HOP-04', label: 'Họp với khách hàng' },
            { value: 'TCHC-HOP-05', label: 'Họp với nhà cung cấp' },
            { value: 'TCHC-HOP-06', label: 'Họp với đơn vị quản lý nhà nước' },
            { value: 'TCHC-HOP-07', label: 'Họp với người lao động (NLĐ)' },
            { value: 'TCHC-HOP-08', label: 'Họp với ứng viên' },
            { value: 'TCHC-HOP-09', label: 'Báo cáo kết quả họp' }
        ]
    },
    // ====================================================================== LÃNH ĐẠO
    {
        value: 'TGD',
        label: 'TGD',
        childrens: [
            {
                value: 'CEO-01',
                label: 'Xây dựng, duy trì tầm nhìn, sứ mệnh và chiến lược phát triển dài hạn của doanh nghiệp.'
            },
            {
                value: 'CEO-02',
                label: 'Xây dựng mục tiêu và kế hoạch thực hiện mục tiêu Quý/Năm/'
            },
            {
                value: 'CEO-03',
                label: 'Quản lý toàn bộ hoạt động, chịu trách nhiệm trước HĐQT/Chủ sở hữu.'
            },
            {
                value: 'CEO-04',
                label: 'Đảm bảo lợi nhuận, kiểm soát chi phí, tăng trưởng doanh thu.'
            },
            { value: 'CEO-05', label: 'Bổ nhiệm, xây dựng văn hóa doanh nghiệp, chính sách nhân sự.' },
            { value: 'CEO-06', label: 'Quan hệ với cổ đông, đối tác chiến lược, cơ quan quản lý.' },
            { value: 'BLD-HOP-01', label: 'Họp nội bộ BLĐ' },
            { value: 'BLD-HOP-02', label: 'Họp nội bộ công ty' },
            { value: 'BLD-HOP-03', label: 'Họp với khách hàng' },
            { value: 'BLD-HOP-04', label: 'Họp với nhà cung cấp' },
            { value: 'BLD-HOP-05', label: 'Họp với đơn vị quản lý nhà nước' },
            { value: 'BLD-HOP-06', label: 'Họp với người lao động (NLĐ)' },
            { value: 'BLD-HOP-07', label: 'Họp với ứng viên' },
            { value: 'BLD-HOP-08', label: 'Họp với đối tác' },
            { value: 'BLD-HOP-09', label: 'Báo cáo kết quả họp' }
        ]
    },
    {
        value: 'PTGD_1',
        label: 'PTGD_1',
        childrens: [
            { value: 'TC-01', label: 'Xây dựng mục tiêu và kế hoạch thực hiện mục tiêu Tháng cho tài chính kế toán' },
            { value: 'TC-02', label: 'Quản lý ngân sách, dòng tiền, vốn vay, cấu trúc vốn.' },
            { value: 'TC-03', label: 'Báo cáo tài chính, tuân thủ thuế, chuẩn mực kế toán.' },
            { value: 'TC-04', label: 'Kiểm soát rủi ro tài chính.' },
            { value: 'TC-05', label: 'Báo cáo kế kết quả thực hiện mục mục tiêu của TCKT' },

            {
                value: 'KD-01',
                label: 'Xây dựng mục tiêu và kế hoạch thực hiện mục tiêu Tháng cho kinh doanh thương mại'
            },
            { value: 'KD-02', label: 'Xây dựng và triển khai chiến lược kinh doanh, mở rộng thị trường.' },
            { value: 'KD-03', label: 'Quản lý hệ thống bán hàng, marketing, chăm sóc khách hàng.' },
            { value: 'KD-04', label: 'Quản lý và thực hiện hợp đồng, đàm phán thương mại.' },
            { value: 'KD-05', label: 'Đảm bảo doanh thu, lợi nhuận theo kế hoạch.' },
            { value: 'KD-06', label: 'Báo cáo kế kết quả thực hiện mục mục tiêu của KDTM' },

            { value: 'HC-01', label: 'Xây dựng mục tiêu và kế hoạch thực hiện mục tiêu Tháng cho tổ chức hành chính' },
            { value: 'HC-02', label: 'Quản lý công tác Tổ chức hành chính' },
            { value: 'HC-03', label: 'Giải quyết mọi chế độ cho các CBCNV' },
            { value: 'HC-04', label: 'Đảm bảo đủ nhân lực và trang thiết bị để văn phòng hoạt động ổn định' },
            { value: 'HC-05', label: 'Báo cáo kế kết quả thực hiện mục mục tiêu của TCHC' },

            { value: 'BLD-HOP-01', label: 'Họp nội bộ BLĐ' },
            { value: 'BLD-HOP-02', label: 'Họp nội bộ công ty' },
            { value: 'BLD-HOP-03', label: 'Họp với khách hàng' },
            { value: 'BLD-HOP-04', label: 'Họp với nhà cung cấp' },
            { value: 'BLD-HOP-05', label: 'Họp với đơn vị quản lý nhà nước' },
            { value: 'BLD-HOP-06', label: 'Họp với người lao động (NLĐ)' },
            { value: 'BLD-HOP-07', label: 'Họp với ứng viên' },
            { value: 'BLD-HOP-08', label: 'Họp với đối tác' },
            { value: 'BLD-HOP-09', label: 'Báo cáo kết quả họp' }
        ]
    },
    {
        value: 'PTGD_2',
        label: 'PTGD_2',
        childrens: [
            { value: 'KT-01', label: 'Nghiên cứu & phát triển (R&D), cải tiến kỹ thuật, ứng dụng công nghệ mới.' },
            { value: 'KT-02', label: 'Đảm bảo chất lượng sản phẩm, tiêu chuẩn kỹ thuật.' },

            { value: 'SX-01', label: 'Quản lý toàn bộ hoạt động sản xuất, nhà máy, xưởng.' },
            { value: 'SX-02', label: 'Đảm bảo tiến độ sản xuất, năng suất, và an toàn' },

            { value: 'TC-01', label: 'Quản lý thi công công trình, tiến độ, chi phí, an toàn.' },
            { value: 'TC-02', label: 'Điều phối nguồn lực (nhân lực, vật tư, máy móc).' },
            { value: 'TC-03', label: 'Quản lý hợp đồng xây dựng, nghiệm thu, bàn giao.' },

            { value: 'BLD-HOP-01', label: 'Họp nội bộ BLĐ' },
            { value: 'BLD-HOP-02', label: 'Họp nội bộ công ty' },
            { value: 'BLD-HOP-03', label: 'Họp với khách hàng' },
            { value: 'BLD-HOP-04', label: 'Họp với nhà cung cấp' },
            { value: 'BLD-HOP-05', label: 'Họp với đơn vị quản lý nhà nước' },
            { value: 'BLD-HOP-06', label: 'Họp với người lao động (NLĐ)' },
            { value: 'BLD-HOP-07', label: 'Họp với ứng viên' },
            { value: 'BLD-HOP-08', label: 'Họp với đối tác' },
            { value: 'BLD-HOP-09', label: 'Báo cáo kết quả họp' }
        ]
    }
];
