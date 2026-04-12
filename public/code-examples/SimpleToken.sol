    // ส่งเหรียญจากผู้เรียกใช้ (Caller) ไปยังที่อยู่อื่น
    function transfer(address receiver, uint amount) public {
        // ตรวจสอบว่าผู้ส่งมีเหรียญพอที่จะโอนไหม
        require(amount <= balances[msg.sender], "Inadequate balance.");

        // หักเหรียญจากผู้ส่ง และเพิ่มเหรียญให้ผู้รับ
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
    }
}
