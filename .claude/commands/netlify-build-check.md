---
description: ตรวจสอบสถานะการ Build ของ PR, วิเคราะห์ความล้มเหลว และเสนอแนวทางการแก้ไข
allowed-tools: Bash, Read, Glob, Grep, Task, AskUserQuestion, WebFetch
argument-hint: [--pr=เลขที่PR (ตรวจหาอัตโนมัติ)]
---

# คำสั่งตรวจสอบการ Build บน Netlify (Netlify Build Check)

ใช้สำหรับตรวจสอบสถานะ CI/CD สำหรับ Pull Request (PR), วิเคราะห์ข้อผิดพลาดที่เกิดขึ้น และเสนอแนวทางการแก้ไขโค้ด

## บริบท (Context)
- Branch ปัจจุบัน: !`git branch --show-current`
- อาร์กิวเมนต์: $ARGUMENTS

## ขั้นตอนที่ 1: ระบุ PR และ Repository

### ดึงข้อมูล Repository
```bash
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
# คืนค่าเป็น: owner/repo (เช่น ethereum/ethereum-org-website)