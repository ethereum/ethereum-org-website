---
description: ตรวจทานไฟล์งานแปลเพื่อหาปัญหาด้านคุณภาพ (รันหลังจากขั้นตอน sanitizer)
allowed-tools: Bash, Read, Glob, Grep, Task, Edit, AskUserQuestion
argument-hint: [--pr=เลขที่PR (อัตโนมัติ)] [--scope=pr|full (pr)] [--language=รหัสภาษา] [--model=opus|sonnet|haiku (opus)] [--fix]
---

# คำสั่งตรวจทานงานแปล (Translation Review Command)

ตรวจสอบคุณภาพไฟล์งานแปลที่นำเข้า โดยเน้นจุดที่ต้องใช้การตัดสินใจของมนุษย์หรือ AI ซึ่งเครื่องมืออัตโนมัติ (Sanitizer) ไม่สามารถจัดการได้

## บริบท (Context)
- Branch ปัจจุบัน: !`git branch --show-current`
- อาร์กิวเมนต์: $ARGUMENTS

## โหมดการทำงาน

### โหมดที่ 1: ตรวจทาน PR (ค่าเริ่มต้น)
ตรวจทานเฉพาะไฟล์ที่เปลี่ยนแปลงใน PR นั้นๆ