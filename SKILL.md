---
name: hilab-sales-prospector
description: >
  Automatically audit any company URL to score fit for HILAB B2B software engineering & AI services (BANT + MEDDIC calibrated for outsourcing/agency model), map buying committee, and generate hyper-personalized pitch emails.
---

# HILAB Sales Prospector

Tự động hóa toàn bộ quy trình nghiên cứu doanh nghiệp, chấm điểm tiềm năng (lead scoring) chuyên biệt cho mô hình Outsourcing/AI Agency, tìm kiếm và phân tích chân dung khách hàng (decision makers), và tạo email chào hàng (outreach sequence) mang phong cách riêng của HILAB.

---

## 1. Khi nào trigger Skill này

Sử dụng skill này khi người dùng yêu cầu:
- "Tìm hiểu công ty X" / "Phân tích đối tác Y"
- "Prospect lead..." / "Qualify công ty..."
- "Viết email chào hàng cho..." / "Lên kịch bản tiếp cận..."
- "Tìm người liên hệ tại..." / "Định danh decision maker của..."
- "Kiểm tra xem trang [url] có tiềm năng làm đối tác/khách hàng không"

---

## 2. Quy trình Thực thi (Workflow)

```
[1] Discovery (Python) → [2] Stakeholders (Python) → [3] Lead Scoring (Calibrated) → [4] Outreach Copywriter (Agent) → [5] Deliver & Output
```

### Bước 1: Thu thập thông tin Website (Discovery)
Chạy script Python để phân tích cấu trúc kỹ thuật và thông tin cơ bản:
```bash
python3 /Users/jamesduy/.gemini/config/skills/hilab-sales-prospector/scripts/analyze_prospect.py --url <URL>
```
Script sẽ trả về cấu trúc JSON chứa:
- Tên công ty (`company_name`), mô tả (`description`).
- Công nghệ đang sử dụng (`tech_stack` như Next.js, WordPress, Webflow, HubSpot, Stripe...).
- Liên kết mạng xã hội (`social_links`) và thông tin liên hệ sơ bộ (`contact_info`).
- Tín hiệu về quy mô (`company_size_signals`) và tin tuyển dụng (`has_job_postings`).

### Bước 2: Tìm kiếm liên hệ & Định danh Buying Committee (Stakeholders)
Chạy script Python để phân tích các trang nhân sự, giới thiệu nhằm tìm ra các liên hệ chính yếu:
```bash
python3 /Users/jamesduy/.gemini/config/skills/hilab-sales-prospector/scripts/contact_finder.py --url <URL>
```
Nhiệm vụ của bước này là bóc tách và phân loại ban lãnh đạo theo mức độ quan trọng đối với HILAB:
- **C-Suite (CEO, CTO, Founder):** Người quyết định chi ngân sách (Economic Buyer).
- **VP / Director (Engineering, Product, Marketing):** Champion hoặc Người đánh giá chính (Technical Evaluator).
- **IC (Lập trình viên, Designer):** Người dùng cuối (End User).

### Bước 3: Đánh giá & Chấm điểm (Lead Scoring)
Đọc kết quả từ 2 bước trên, tổng hợp thành cấu trúc đầu vào và chạy:
```bash
python3 /Users/jamesduy/.gemini/config/skills/hilab-sales-prospector/scripts/lead_scorer.py
```
**⚠️ TIÊU CHÍ HIỆU CHỈNH ĐẶC THÙ CHO HILAB:**
HILAB bán dịch vụ **Thiết kế Website cao cấp, Tích hợp AI Agent, và Outsourcing Đội ngũ Lập trình viên chuyên nghiệp**. Khi chấm điểm, Agent cần chủ động đánh giá thêm các yếu tố sau:
1. **Tech Stack & Website Performance:**
   - Nếu website load rất chậm nhưng công ty đang tăng trưởng nhanh (ví dụ: Startup gọi vốn mới) `=>` Cơ hội bán dịch vụ **tối ưu hóa Frontend (Next.js)**.
   - Nếu website đang dùng nền tảng cũ, thiếu tính năng tương tác `=>` Cơ hội đề xuất **phát triển Web/App chuyên sâu**.
2. **Hiring / Resource Bottleneck:**
   - Nếu công ty đang tuyển dụng kỹ sư lập trình (React, Python, Node.js, DevOps) `=>` **Need Score và Timeline Score đạt mức tối đa (25/25)**. Đây là cơ hội vàng để HILAB chào bán "Squad cho thuê lập trình viên" để lấp đầy khoảng trống ngay lập tức mà không cần tuyển dụng thủ công.
3. **Quy mô doanh nghiệp (Employee Count):**
   - Phân khúc lý tưởng nhất của HILAB là các Startup/SMB quy mô từ **10 - 200 nhân sự** (Cần mở rộng quy mô kỹ thuật nhanh, linh hoạt) hoặc các doanh nghiệp Enterprise cần phòng lab công nghệ riêng.

### Bước 4: Soạn thảo Email Chào hàng (Outreach Copywriting)
Kế thừa thông tin từ `hilab-brand-guide` để viết email tiếp cận đầu tiên.
**Nguyên tắc viết email chào hàng của HILAB:**
- **Không dùng văn mẫu chung chung.** Email phải nhắm trực tiếp vào những gì phát hiện được (ví dụ: *"Tôi thấy FastShip đang tuyển kỹ sư React để phát triển ứng dụng Next.js..."*).
- **Độ dài cực kỳ ngắn gọn:** Dưới 100 từ cho nội dung chính.
- **Lời kêu gọi hành động (CTA) nhẹ nhàng, không ép buộc:** Đề xuất một cuộc trao đổi ngắn 10 phút hoặc gửi bản phân tích hiệu năng miễn phí.
- **Tập trung vào giải pháp cụ thể:** Thay vì nói "chúng tôi là công ty phần mềm", hãy nói: *"Chúng tôi có sẵn đội ngũ React/Next.js đã tối ưu hơn 20 dự án, sẵn sàng onboard trong 5 ngày để giúp bạn tăng tốc kịp roadmap."*

---

## 3. Quy ước Đầu ra (Output)

### 3.1. Báo cáo Chi tiết (`HILAB-PROSPECT-ANALYSIS.md`)
Tạo và lưu trữ báo cáo này tại thư mục dự án trong workspace: `output/<project-slug>/HILAB_PROSPECT_[CompanyName]_[YYYYMMDD].md`.

Cấu trúc file báo cáo bao gồm:
1. **Thông tin chung:** Tên doanh nghiệp, URL, Phân loại ngành, Điểm Prospect Score kèm Phân hạng thương vụ (A/B/C/D).
2. **BANT & MEDDIC Scorecard:** Bảng điểm chi tiết kèm theo lý giải tại sao đạt mức điểm đó.
3. **Thông tin kỹ thuật & Tín hiệu cơ hội:** Danh sách các công nghệ họ dùng, trạng thái tải trang, tin đăng tuyển dụng phát hiện được.
4. **Buying Committee:** Danh sách người liên hệ tìm thấy (kèm chức danh, vai trò ra quyết định, và link LinkedIn).
5. **Kịch bản tiếp cận chi tiết:**
   - 2 Tiêu đề email (để chạy A/B Testing).
   - Nội dung email chào hàng (copy-paste ready, cá nhân hóa sâu sắc).
   - Đề xuất giải pháp kỹ thuật cụ thể mà HILAB nên chào bán.

### 3.2. Xuất bản tài liệu Word chuẩn HILAB (`.docx`)
Sau khi hoàn thành file Markdown, Agent có thể chạy script Node.js đi kèm để tự động biên dịch sang file Word (.docx) chuẩn nhận diện thương hiệu HILAB (Tiêu đề Fire Red #CE2029, phông chữ Open Sans & Inter, đính kèm logo HILAB ở Header, footer thông tin công ty và số trang):
```bash
node /Users/jamesduy/.gemini/config/skills/hilab-sales-prospector/scripts/generate_docx_report.js --input <path_to_markdown> --output <path_to_docx>
```
Hãy chủ động đề xuất xuất file Word cho user sau khi phân tích xong để mang lại trải nghiệm chuyên nghiệp nhất.

### 3.3. Hiển thị Scorecard trên Terminal
Khi kết thúc tác vụ, in ra một bảng scorecard tóm tắt đẹp mắt bằng Unicode để người dùng nắm nhanh trạng thái:
```
============================================
  HILAB PROSPECT INTELLIGENCE
============================================
Company:      [Name]
Prospect Score: [X]/100 (Grade: [A/B/C/D] - [Label])
Key Tech:     [Detected Stack]
Top Target:   [Decision Maker Name], [Title]

Next Action:  [Recommended Step]
Report Saved: [Path to MD file]
============================================
```

---

## 4. Liên kết và Tích hợp Nâng cao

- **`hilab-project-estimator`:** Nếu khách hàng có mô tả rõ ràng về yêu cầu tài sự (ví dụ: tuyển 1 BA, 2 React Dev), hãy gợi ý người dùng cho chạy `hilab-project-estimator` ngay để tạo file dự thảo ballpark Excel đi kèm email pitch.
- **Google Sheets CRM Sync:** Khi Prospect đạt điểm **Grade A hoặc B**, tự động đề xuất người dùng ghi nhận cơ hội này lên Google Sheets CRM để theo dõi phễu bán hàng.
