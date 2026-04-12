---
title: ข้อเสนอการปรับปรุง Ethereum (EIPs)
description: ข้อมูลเบื้องต้นที่คุณจำเป็นต้องรู้เพื่อทำความเข้าใจ EIPs
lang: th
---

# บทนำสู่ข้อเสนอการปรับปรุง Ethereum (EIPs) {#introduction-to-ethereum-improvement-proposals}

## EIPs คืออะไร? {#what-are-eips}

[ข้อเสนอการปรับปรุง Ethereum (EIPs)](https://eips.ethereum.org/) คือมาตรฐานที่ระบุคุณลักษณะใหม่ๆ หรือกระบวนการที่อาจเกิดขึ้นสำหรับ Ethereum โดย EIPs จะประกอบด้วยข้อกำหนดทางเทคนิค (Technical Specifications) สำหรับการเปลี่ยนแปลงที่เสนอ และทำหน้าที่เป็น "แหล่งข้อมูลที่ถูกต้องที่สุด" (Source of Truth) สำหรับชุมชน ทั้งการอัปเกรดเครือข่ายและมาตรฐานแอปพลิเคชันสำหรับ [Ethereum](/) ล้วนถูกพูดคุยและพัฒนาผ่านกระบวนการ EIP นี้

ทุกคนในชุมชน Ethereum มีความสามารถในการสร้าง EIP ได้ โดยแนวทางในการเขียน EIP จะระบุไว้ใน [EIP-1](https://eips.ethereum.org/EIPS/eip-1) หัวใจสำคัญของ EIP ควรเป็นการระบุข้อกำหนดทางเทคนิคที่กระชับพร้อมเหตุผลสนับสนุนสั้นๆ ผู้เขียน EIP มีหน้าที่รับผิดชอบในการสร้างฉันทามติ (Consensus) ภายในชุมชน และจัดทำเอกสารความคิดเห็นที่แตกต่างกัน เนื่องจากมีการใช้ความรู้ทางเทคนิคขั้นสูงในการเสนอ EIP ให้ถูกต้องตามรูปแบบที่กำหนด ที่ผ่านมาผู้เขียน EIP ส่วนใหญ่มักจะเป็นนักพัฒนาแอปพลิเคชันหรือนักพัฒนาโปรโตคอล

## ทำไม EIPs ถึงสำคัญ? {#why-do-eips-matter}

EIPs มีบทบาทสำคัญอย่างยิ่งต่อวิธีการที่ความเปลี่ยนแปลงเกิดขึ้นและถูกบันทึกไว้ใน Ethereum เป็นช่องทางให้ผู้คนได้นำเสนอ ถกเถียง และยอมรับการเปลี่ยนแปลงต่างๆ EIPs มี [หลายประเภท](https://eips.ethereum.org/EIPS/eip-1#eip-types) รวมถึง **Core EIPs** สำหรับการเปลี่ยนแปลงโปรโตคอลระดับล่างที่ส่งผลต่อฉันทามติและต้องมีการอัปเกรดเครือข่าย (Network Upgrade) เช่น [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) และ **ERCs** สำหรับมาตรฐานแอปพลิเคชัน เช่น [EIP-20](https://eips.ethereum.org/EIPS/eip-20) และ [EIP-721](https://eips.ethereum.org/EIPS/eip-721)

การอัปเกรดเครือข่ายทุกครั้งจะประกอบด้วยชุดของ EIPs ที่ต้องถูกนำไปปรับใช้โดย [Ethereum Client](/learn/#clients-and-nodes) แต่ละรายในเครือข่าย ซึ่งหมายความว่าเพื่อให้การทำงานสอดคล้อง (Consensus) กับ Client อื่นๆ บน Ethereum Mainnet นักพัฒนา Client จะต้องตรวจสอบให้แน่ใจว่าพวกเขาได้ติดตั้ง EIPs ที่จำเป็นทั้งหมดแล้ว

นอกจากจะให้ข้อกำหนดทางเทคนิคสำหรับการเปลี่ยนแปลงแล้ว EIPs ยังเป็นหน่วยพื้นฐานที่ทำให้เกิดการกำครองดูแล (Governance) ใน Ethereum: ทุกคนมีอิสระในการนำเสนอ และผู้มีส่วนได้ส่วนเสียต่างๆ ในชุมชนจะถกเถียงกันเพื่อตัดสินว่าควรยอมรับให้เป็นมาตรฐานหรือรวมไว้ในการอัปเกรดเครือข่ายหรือไม่ เนื่องจาก EIPs ที่ไม่ใช่ระดับ Core ไม่จำเป็นต้องถูกนำไปใช้โดยทุกแอปพลิเคชัน (เช่น คุณสามารถสร้าง Token ที่ไม่ทำตาม EIP-20 ก็ได้) แต่ Core EIPs ต้องได้รับการยอมรับอย่างกว้างขวาง (เพราะทุกโหนดต้องอัปเกรดเพื่อให้อยู่ในเครือข่ายเดียวกัน) ดังนั้น Core EIPs จึงต้องการฉันทามติจากชุมชนที่กว้างขวางกว่า EIPs ประเภทอื่น

## ประวัติของ EIPs {#history-of-eips}

[คลังเก็บข้อมูล GitHub ของ Ethereum Improvement Proposals (EIPs)](https://github.com/ethereum/EIPs) ถูกสร้างขึ้นในเดือนตุลาคม 2015 โดยกระบวนการ EIP อ้างอิงมาจากกระบวนการ [Bitcoin Improvement Proposals (BIPs)](https://github.com/bitcoin/bips) ซึ่ง BIPs เองก็นำมาจากกระบวนการ [Python Enhancement Proposals (PEPs)](https://www.python.org/dev/peps/) อีกทีหนึ่ง

บรรณาธิการ EIP (EIP Editors) มีหน้าที่ตรวจสอบ EIPs ในด้านความสมบูรณ์ทางเทคนิค รูปแบบการเขียน และแก้ไขการสะกดคำ ไวยากรณ์ รวมถึงรูปแบบโค้ด โดย Martin Becze, Vitalik Buterin, Gavin Wood และบุคคลอื่นๆ อีกไม่กี่คนเป็นบรรณาธิการ EIP ยุคแรกเริ่มตั้งแต่ปี 2015 ถึงปลายปี 2016

บรรณาธิการ EIP ชุดปัจจุบัน ได้แก่:
- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

หากคุณต้องการเป็นบรรณาธิการ EIP โปรดตรวจสอบรายละเอียดที่ [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069)

บรรณาธิการ EIP จะตัดสินว่าเมื่อใดที่ข้อเสนอพร้อมที่จะกลายเป็น EIP และช่วยผู้เขียน EIP ในการผลักดันข้อเสนอให้ก้าวหน้า โดยมีกลุ่ม [Ethereum Cat Herders](https://www.ethereumcatherders.com/) ช่วยจัดการประชุมระหว่างบรรณาธิการ EIP และชุมชน (ดู [EIPIP](https://github.com/ethereum-cat-herders/EIPIP))

กระบวนการสร้างมาตรฐานฉบับเต็มพร้อมแผนผังสามารถดูได้ที่ [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## เรียนรู้เพิ่มเติม {#learn-more}

หากคุณสนใจอ่านข้อมูลเพิ่มเติมเกี่ยวกับ EIPs สามารถดูได้ที่ [เว็บไซต์ EIPs](https://eips.ethereum.org/) และ [EIP-1](https://eips.ethereum.org/EIPS/eip-1) นี่คือลิงก์ที่มีประโยชน์:

- [รายชื่อข้อเสนอการปรับปรุง Ethereum ทั้งหมด](https://eips.ethereum.org/all)
- [คำอธิบายประเภทของ EIP ทั้งหมด](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [คำอธิบายสถานะของ EIP ทั้งหมด](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### โปรเจกต์เพื่อการศึกษาของชุมชน {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *ซีรีส์วิดีโอเพื่อการศึกษาที่พูดคุยเกี่ยวกับ EIPs และฟีเจอร์สำคัญของการอัปเกรดที่กำลังจะมาถึง*
- [EIPs.wtf](https://www.eips.wtf/) — *ให้ข้อมูลเพิ่มเติมสำหรับ EIPs รวมถึงสถานะ รายละเอียดการติดตั้ง และความคิดเห็นจากชุมชน* - [EIP.Fun](https://eipfun.substack.com/) — *นำเสนอข่าวสารล่าสุดเกี่ยวกับ EIPs และการอัปเดตจากการประชุมต่างๆ*
- [EIPs Insight](https://eipsinsight.com/) — *การนำเสนอสถานะและสถิติของกระบวนการ EIP โดยรวบรวมข้อมูลจากแหล่งต่างๆ*

## การมีส่วนร่วม {#participate}

ทุกคนสามารถสร้าง EIP ได้ ก่อนที่จะส่งข้อเสนอ คุณควรอ่าน [EIP-1](https://eips.ethereum.org/EIPS/eip-1) ซึ่งระบุกระบวนการและวิธีการเขียน EIP และขอรับข้อเสนอแนะใน [Ethereum Magicians](https://ethereum-magicians.org/) ซึ่งเป็นที่ที่ข้อเสนอจะถูกพูดคุยกับชุมชนเป็นที่แรกก่อนที่จะส่งร่างเข้าสู่ระบบ

## การอ้างอิง {#references}

<cite class="citation">

เนื้อหาบางส่วนในหน้านี้มาจากบทความ [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) โดย Hudson Jameson

</cite>
