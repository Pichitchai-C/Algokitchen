# AlgoCraft 3D — โครงสร้างโปรเจกต์แบบแยกไฟล์ (Modular Architecture)

การแยกไฟล์ออกเป็นส่วนย่อย (Separation of Concerns) ช่วยให้แก้ไขโค้ดแต่ละส่วนได้ง่าย โหลดเฉพาะโมดูลที่เกี่ยวข้อง และปรับปรุงประสิทธิภาพเฟรมเรตการเรนเดอร์ 3D ได้ดียิ่งขึ้น

## โครงสร้างโฟลเดอร์ภายในไฟล์ ZIP
- `index.html` — โครงสร้างหลักของหน้าจอแบบ 3 คอลัมน์แนวนอน
- `css/theme.css` — ตัวแปรสี (CSS Variables) และค่าพื้นฐาน
- `css/layout.css` — การจัดวาง Grid แนวนอนเต็มหน้าจอและการรองรับการหมุนจอ
- `css/components.css` — สไตล์ของบล็อคคำสั่ง ปุ่มกด หน้าต่างร้านค้า และ Modal
- `js/data/blocks.js` — คลังข้อมูลบล็อคคำสั่งทั้ง 3 ร้านค้า และรายการสินค้าในศูนย์ค้าส่ง
- `js/data/levels.js` — ข้อมูลด่าน เงื่อนไขเป้าหมาย (Goal Evaluation) และโค้ดตัวอย่าง
- `js/engine/audio.js` — ระบบสังเคราะห์เสียงเอฟเฟคด้วย Web Audio API
- `js/engine/renderer3d.js` — เอนจินเรนเดอร์ภาพ 3 มิติแบบ Perspective 3D Projection บน HTML5 Canvas
- `js/main.js` — ตัวควบคุมหลัก (Controller) เชื่อมต่อ State, UI และระบบรันอัลกอริทึม

## วิธีรันใช้งานบนเครื่อง (Local Server)
เนื่องจากโปรเจกต์ใช้ **ES Modules (`<script type="module">`)** เพื่อความปลอดภัยของเบราว์เซอร์ แนะนำให้เปิดผ่าน Local Web Server เช่น:
- **VS Code:** ติดตั้งส่วนขยาย *Live Server* แล้วคลิกขวาที่ `index.html` เลือก *Open with Live Server*
- **Python:** เปิด Terminal ในโฟลเดอร์โปรเจกต์แล้วพิมพ์ `python -m http.server 8080` จากนั้นเข้า `http://localhost:8080`
