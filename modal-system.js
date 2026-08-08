(function() {
    // 1. สร้างและฝัง CSS อัตโนมัติ
    const style = document.createElement('style');
    style.innerHTML = `
        #customModal {
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(4px);
            justify-content: center;
            align-items: center;
            z-index: 9999;
            padding: 20px;
            box-sizing: border-box;
        }
        .modal-card-box {
            background: white;
            width: 100%;
            max-width: 320px;
            padding: 25px 20px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            font-family: 'Kanit', sans-serif;
            animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes modalPop {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // 2. สร้างโครงสร้าง HTML ของป๊อปอัปอัตโนมัติ
    const modalHTML = `
        <div id="customModal">
            <div class="modal-card-box">
                <div id="modalIcon" style="font-size: 36px; margin-bottom: 10px;">⚠️</div>
                <h3 id="modalTitle" style="margin: 0 0 8px 0; font-size: 18px; color: #1b5e20;">แจ้งเตือน</h3>
                <p id="modalMessage" style="margin: 0 0 20px 0; font-size: 14px; color: #555; line-height: 1.4;">ข้อความ...</p>
                <div id="modalButtons" style="display: flex; gap: 10px;"></div>
            </div>
        </div>
    `;
    
    window.addEventListener('DOMContentLoaded', () => {
        const div = document.createElement('div');
        div.innerHTML = modalHTML;
        document.body.appendChild(div);
    });

    // 3. ฟังก์ชันแจ้งเตือน (แทน alert)
    window.showCustomAlert = function(title, message, icon = '✨') {
        return new Promise((resolve) => {
            document.getElementById('modalTitle').innerText = title;
            document.getElementById('modalMessage').innerText = message;
            document.getElementById('modalIcon').innerText = icon;
            
            document.getElementById('modalButtons').innerHTML = `
                <button onclick="window.closeCustomModal()" style="flex:1; padding:10px; background:#2e7d32; color:white; border:none; border-radius:12px; font-family:'Kanit',sans-serif; font-weight:600; cursor:pointer;">ตกลง</button>
            `;
            
            document.getElementById('customModal').style.display = 'flex';
            
            window.closeCustomModal = () => {
                document.getElementById('customModal').style.display = 'none';
                resolve();
            };
        });
    };

    // 4. ฟังก์ชันยืนยัน (แทน confirm)
    window.showCustomConfirm = function(title, message, isDanger = false) {
        return new Promise((resolve) => {
            document.getElementById('modalTitle').innerText = title;
            document.getElementById('modalMessage').innerText = message;
            document.getElementById('modalIcon').innerText = isDanger ? '🗑️' : '❓';
            
            document.getElementById('modalButtons').innerHTML = `
                <button id="mCancel" style="flex:1; padding:10px; background:#f1f3f2; color:#555; border:none; border-radius:12px; font-family:'Kanit',sans-serif; font-weight:600; cursor:pointer;">ยกเลิก</button>
                <button id="mConfirm" style="flex:1; padding:10px; background:${isDanger ? '#c62828' : '#2e7d32'}; color:white; border:none; border-radius:12px; font-family:'Kanit',sans-serif; font-weight:600; cursor:pointer;">ยืนยัน</button>
            `;
            
            document.getElementById('customModal').style.display = 'flex';

            document.getElementById('mConfirm').onclick = () => {
                document.getElementById('customModal').style.display = 'none';
                resolve(true);
            };
            document.getElementById('mCancel').onclick = () => {
                document.getElementById('customModal').style.display = 'none';
                resolve(false);
            };
        });
    };
})();