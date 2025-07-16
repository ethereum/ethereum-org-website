---
title: Staking yechib olish
description: Steyking push yechimlarining mohiyati, ishlash jarayoni va stavka qo‘yuvchilarning o‘z mukofotlarini olish uchun bajarishi lozim bo‘lgan harakatlar haqidagi ma’lumotlarni umumlashtiruvchi sahifa
lang: uz
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Leslie the rhino with her staking rewards
sidebarDepth: 2
summaryPoints:
  - Shanghai/Capella yangilanishi Ethereumda pul tikishdan olingan mablag‘larni yechib olish imkoniyatini yaratdi
  - Validator operatorlari yechib olish manzilini taqdim etishlari lozim, shunda bu imkoniyat faollashtiriladi
  - Mukofotlar bir necha kundan keyin avtomatik tarzda taqsimlanadi
  - Steyking faoliyatini to‘liq tugatgan tekshiruvchilar qolgan balanslarini olishadi
---

<UpgradeStatus dateKey="page-staking-withdrawals-when">
Shanghai/Capella yangilanishi 2023-yil 12-aprelda amalga oshirilgandan so‘ng, steyking mablag‘larini yechib olish imkoniyati paydo bo‘ldi. &nbsp;<a href="#when" customEventOptions={{ eventCategory: "Anchor link", eventAction: "When's it shipping?", eventName: "click" }}>Shanghai/Capella haqida ko‘proq ma’lumot</a>
</UpgradeStatus>

**Steykingdan yechib olish** Ethereumʼning konsensus qatlamidagi (Mayok zanjiri) validator hisobidan ETHni tranzaksiya qilish mumkin bo‘lgan ijro qatlamiga o‘tkazishni anglatadi.

**32 ETHdan ortiq bo‘lgan qoldiq uchun mukofot to‘lovlari** foydalanuvchi tomonidan taqdim etilgandan so‘ng, avtomatik tarzda va muntazam ravishda har bir tasdiqlovchiga bog‘langan yechib olish manziliga yuboriladi. Foydalanuvchilar, shuningdek, **steyking jarayonidan butunlay chiqishlari** va o‘zlarining to‘liq validator balansini yechib olishlari mumkin.

## Steyking sovrinlari {#staking-rewards}

32 ETH miqdoridagi maksimal samarali balansga ega bo‘lgan faol validator hisoblariga mukofot to‘lovlari avtomatik tarzda amalga oshiriladi.

Mukofotlar orqali qo‘lga kiritilgan 32 ETHdan ortiq har qanday qoldiq amalda asosiy mablag‘ga qo‘shilmaydi yoki ushbu validatorning tarmoqdagi og‘irligini oshirmaydi. Shu sababli, bu qoldiq har bir necha kunda avtomatik tarzda mukofot to‘lovi sifatida yechib olinadi. Bir martalik yechib olish manzilini taqdim etishdan tashqari, ushbu mukofotlar validator operatoridan boshqa hech qanday harakat talab qilmaydi. Bularning barchasi konsensus qatlamida boshlanadi, shu sababli hech qaysi bosqichda gaz (tranzaksiya to‘lovi) talab etilmaydi.

### Biz bu yerga qanday kelib qoldik? {#how-did-we-get-here}

So‘nggi bir necha yil davomida Ethereum tarmog‘i bir qancha yangilanishlarni boshdan kechirdi. Bu yangilanishlar natijasida, avvalgi energiya ko‘p talab qiladigan mayning jarayoni o‘rniga, tarmoq endi ETHning o‘zi tomonidan himoyalanadigan tizimga o‘tdi. Ethereum tarmog‘ida konsensusda qatnashish endi "steyking" deb ataladi, chunki ishtirokchilar ETHni ixtiyoriy ravishda qulflab, uni tarmoqda qatnashish huquqi uchun "stack" qo‘yishadi. Qoidalarga amal qilgan foydalanuvchilar rag‘batlantiriladi, aldovga urinishlar esa jazolanishi mumkin.

2020-yil noyabr oyida garov depozit shartnomasi ishga tushirilganidan buyon, ayrim dovyurak Ethereum izlanuvchilari "validatorlar" deb ataladigan maxsus hisoblarni faollashtirish uchun ixtiyoriy ravishda mablag‘larini qulflab qo‘yishdi. Bu hisoblar tarmoq qoidalariga muvofiq bloklarni rasmiy tasdiqlash va taklif qilish huquqiga ega. Ushbu jasoratli harakatlar tufayli Ethereum tarmog‘i rivojlanishda davom etmoqda.

Shanghai/Capella yangilanishidan oldin siz garovga qo‘yilgan ETHingizdan foydalana olmaydiganingiz yoki unga kira olmaydiganingiz mumkin edi. Endi esa siz mukofotlaringizni avtomatik ravishda tanlangan hisobingizga qabul qilishga rozilik berishingiz mumkin, bundan tashqari, xohlagan paytingizda garovga qo‘yilgan ETHni yechib olish imkoniyatiga ega bo‘lasiz.

### Qanday tayyorgarlik ko‘rishim kerak? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Muhim eslatmalar {#important-notices}

Har qanday validator hisobi uchun pul yechib olish manzilini taqdim etish - bu hisob balansidan ETH yechib olishga huquq qozonishidan oldingi majburiy qadamdir.

<InfoBanner emoji="⚠️" isWarning>
  <strong>Har bir validator hisobi uchun faqat bitta yechib olish manzili, bir martalik tayinlanishi mumkin.</strong> Manzil tanlanib, konsensus qatlamiga yuborilgandan so‘ng, uni bekor qilish yoki qayta o‘zgartirish mutlaqo imkonsiz bo‘ladi. Yuborishdan avval taqdim etilgan manzilning to‘g‘riligini va uning egasini ikki marta sinchiklab tekshirib chiqing.
</InfoBanner>

Agar sizning mnemonik/urug‘ iborangiz oflaynda xavfsiz saqlangan va hech qanday tarzda buzilmagan bo‘lsa, <strong>bu ma’lumotni taqdim etmasligingiz hozircha mablag‘laringizga hech qanday xavf tug‘dirmaydi</strong>. Yechib olish uchun kerakli ma’lumotlarni qo‘shmaslik natijasida, yechib olish manzili ko‘rsatilmaguncha, ETH validator hisobida shunchaki qulflangan holda qolaveradi.

## Steyking jarayonidan butunlay chiqish {#exiting-staking-entirely}

Validator hisobi balansidan _har qanday_ mablag‘ni o‘tkazishdan oldin, mablag‘larni yechib olish manzilini taqdim etish shart.

Steykingdan butunlay chiqishni va o‘z balansini to‘liq qaytarib olishni istagan foydalanuvchilar, shuningdek, validator kalitlari yordamida "ixtiyoriy chiqish" xabarini imzolab tarqatishlari kerak bo‘ladi. Bu steykingdan chiqish jarayonini boshlaydi. Bu jarayon sizning validator mijozingiz orqali amalga oshirilib, konsensus tuguningizga yuboriladi va gaz sarfini talab qilmaydi.

Tekshiruvchining stavkadan chiqish jarayoni turli miqdordagi vaqt talab qiladi. Bu vaqt, bir paytning o‘zida qancha boshqa ishtirokchilar chiqayotganiga bog‘liq bo‘ladi. Bu jarayon yakunlangandan so‘ng, ushbu hisob endi validator tarmog‘i vazifalarini bajarish uchun mas’ul bo‘lmaydi, mukofotlar olishga haqli bo‘lmaydi va uning ETH tizimda garov sifatida saqlanmaydi. Shu vaqtdan boshlab hisob to‘liq "yechib olish mumkin" holatida belgilanadi.

Hisob "yechib olish mumkin" deb belgilangandan va mablag‘ni yechish uchun zarur ma’lumotlar taqdim etilgandan so‘ng, foydalanuvchining kutishdan boshqa qiladigan ishi qolmaydi. Hisoblar blok taklif qiluvchilar tomonidan avtomatik va uzluksiz ravishda chiqarilishga loyiq mablag‘lar uchun tekshiriladi va hisobingiz balansi keyingi <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>tekshirish</a> paytida to‘liq o‘tkaziladi (bu "to‘liq yechib olish" deb ham ataladi).

## Steyking pullari qachon yechib olish mumkin bo‘ladi? {#when}

Steyking yechib olishlari ishga tushdi! 2023-yil 12-aprelda amalga oshirilgan Shanghai/Capella yangilanishi doirasida mablag‘larni yechib olish funksiyasi ishga tushirildi.

Shanghai/Capella yangilanishi avvaldan tiklangan ETHni oddiy Ethereum hisoblariga qaytarib olish imkoniyatini yaratdi. Bu likvidlikni garovga qo‘yish jarayonini to‘liq yopdi va Ethereum barqaror, kengaytiriladigan, xavfsiz markazlashmagan ekotizim yaratish yo‘lidagi maqsadiga yana bir qadam yaqinlashdi.

- [Ethereum tarixi haqida ko‘proq ma’lumot](/history/)
- [Ethereum yo‘l xaritasi to‘g‘risida ko‘proq ma’lumot](/roadmap/)

## Pul yechib olish jarayoni qanday amalga oshiriladi? {#how-do-withdrawals-work}

Berilgan validatorning yechib olishga huquqi bor-yo‘qligi validatorning o‘z hisob holatiga qarab aniqlanadi. Hisob-kitobda pul yechishni boshlash yoki boshlamaslik kerakligini aniqlash uchun hech qanday paytda foydalanuvchi aralashuvi talab etilmaydi - bu jarayonning barchasi konsensus qatlami tomonidan uzluksiz ravishda avtomatik tarzda amalga oshiriladi.

### More of a visual learner? {#visual-learner}

Finematics tomonidan taqdim etilgan Ethereum steykingi yechib olish jarayoni haqidagi ushbu tushuntirishni ko‘rib chiqing:

<YouTube id="RwwU3P9n3uo" />

### Validatorni "tozalash" {#validator-sweeping}

Validator keyingi blokni taklif etish uchun rejalashtirilganda, u 16 tagacha muvofiq yechib olishlardan iborat yechib olish navbatini tuzishi shart bo‘ladi. Bu jarayon dastlab validator indeksi 0 dan boshlanib, protokol qoidalariga ko‘ra ushbu hisob uchun mablag‘ yechib olishga huquq bor-yo‘qligi aniqlanadi va agar bunday huquq mavjud bo‘lsa, u navbatga qo‘shiladi. Keyingi blokni taklif etish uchun tanlangan tekshiruvchilar to‘plami, oldingi blok yakunlangan joydan boshlab, belgilangan tartibda cheksiz davom etadi.

<InfoBanner emoji="🕛">
Analog soat haqida o‘ylab ko‘ring. Soat mili vaqtni ko‘rsatadi, faqat bir yo‘nalishda aylanadi, hech qanday soatni o‘tkazib yubormaydi va oxirgi raqamga yetgandan so‘ng yana boshiga qaytadi.<br/><br/>
Endi 1 dan 12 gacha emas, balki soatda 0 dan N gacha raqamlar bor deb tasavvur qiling <em>(konsensus qatlamida hozirga qadar ro‘yxatdan o‘tgan validator hisoblarining umumiy soni, 2023-yil yanvar holatiga ko‘ra 500 000 dan ortiq)</em>.<br/><br/>
Soat mili chiqarib olishga huquqi bor-yo‘qligini tekshirish kerak bo‘lgan keyingi validatorni ko‘rsatadi. U noldan boshlanib, hech qanday hisobni o‘tkazib yubormasdan to‘liq aylanib chiqadi. Oxirgi tasdiqlovchiga yetib borgandan so‘ng, jarayon yana boshidan qaytadan boshlanadi.
</InfoBanner>

#### Akkauntdan pul yechish uchun tekshiruv {#checking-an-account-for-withdrawals}

Taklif beruvchi validatorlar orqali ehtimoliy yechib olishlar uchun o‘tib chiqar ekan, tekshirilayotgan har bir validator pul yechib olishni boshlash kerakmi yoki yo‘qligini va agar kerak bo‘lsa, qancha ETH yechib olinishi lozimligini aniqlash maqsadida bir nechta qisqa savollar asosida baholanadi.

1. **Pul yechib olish manzili ko‘rsatilganmi?** Agar pul yechib olish manzili ko‘rsatilmagan bo‘lsa, hisob e’tiborga olinmaydi va pul yechish jarayoni boshlanmaydi.
2. **Validator chiqib ketgan va mablag‘ni yechib olish mumkinmi?** Agar validator to‘liq chiqib ketgan bo‘lsa va uning hisobi "mablag‘ni yechib olish mumkin" deb hisoblanadigan davrga yetgan bo‘lsak, to‘liq mablag‘ni yechib olish jarayoni amalga oshiriladi. Bunda qolgan barcha mablag‘ yechib olish manziliga to‘liq o‘tkaziladi.
3. **Samarali balans 32 ga cheklangan ekanmi?** Agar hisob yechib olish ma’lumotlariga ega bo‘lsa, to‘liq chiqib ketilmagan bo‘lsa va 32 dan yuqori mukofotlar kutilayotgan bo‘lsa, faqat 32 dan ortiq mukofotlarni foydalanuvchining yechib olish manziliga o‘tkazadigan qisman yechib olish jarayoni amalga oshiriladi.

Validatorning hayot sikli davomida validator operatorlari tomonidan bajariladigan va ushbu jarayonga to‘g‘ridan-to‘g‘ri ta’sir ko‘rsatadigan faqat ikkita harakat mavjud:

- Pul yechib olishning har qanday turini amalga oshirish uchun yechib olish ma’lumotlarini taqdim eting
- Tarmoqdan chiqish, bu to‘liq mablag‘ni yechib olish jarayonini boshlab beradi

### Gazsiz {#gas-free}

Stavkalarni yechib olishning bu usuli ishtirokchilardan ma’lum miqdordagi ETHni yechib olish uchun tranzaksiyani qo‘lda yuborishni talab qilmaydi. Bu shunday ma’noni anglatadiki, **hech qanday gaz (tranzaksiya to‘lovi) talab etilmaydi**, shuningdek, mablag‘larni yechib olish jarayonlari ham mavjud ijro qatlami bloklari uchun raqobatlashishga ehtiyoj sezmaydi.

### Men stavka mukofotlarimni qancha vaqt oralig‘ida olaman? {#how-soon}

Bir blokda eng ko‘pi bilan 16 ta pul yechib olish amaliyotini bajarish mumkin. Bunday tezlikda, kuniga 115 200 ta validatorining mablag‘larini yechib olish mumkin (agar hech qanday slotlar o‘tkazib yuborilmagan bo‘lsa). Yuqorida ta’kidlanganidek, mablag‘ yechib olishga huquqi bo‘lmagan tekshiruvchilar chetlab o‘tiladi, bu esa tekshiruv jarayonini yakunlash vaqtini qisqartiradi.

Ushbu hisob-kitobni kengaytirib, ma’lum miqdordagi pul yechib olish amaliyotlarini qayta ishlash uchun ketadigan vaqtni taxmin qilishimiz mumkin:

<TableContainer>

| Yechib olishlar soni | Tugatish vaqti |
| :-------------------: | :--------------: |
|        400,000        |     3.5 kun      |
|        500,000        |     4.3 kun      |
|        600,000        |     5.2 kun      |
|        700,000        |     6.1 kun      |
|        800,000        |     7.0 kun      |

</TableContainer>

Ko‘rib turganingizdek, tarmoqdagi tasdiqlovchilar soni ko‘paygan sari bu jarayon sekinlashib boradi. O‘tkazib yuborilgan slotlar sonining ortishi bu jarayonni mutanosib ravishda sekinlashtirishi mumkin, biroq bu umuman olganda ehtimoliy natijalarning sekinroq kechishini aks ettiradi.

## Tez-tez beriladigan savollar {#faq}

<ExpandableCard
title="Yechib olish manzilini taqdim etganimdan so‘ng, uni boshqa bir yechib olish manziliga o‘zgartira olamanmi?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Yo‘q, chiqarish ma’lumotlarini taqdim etish jarayoni bir martalik bo‘lib, uni yuborib bo‘lgandan so‘ng o‘zgartirib bo‘lmaydi.
</ExpandableCard>

<ExpandableCard
title="Nima uchun pul yechib olish manzilini faqat bir marta o‘rnatish mumkin?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Ijro qatlami yechib olish manzilini o‘rnatish orqali, ushbu validator uchun yechib olish hisob ma’lumotlari butunlay va doimiy ravishda o‘zgartirildi. Bu eski kirish ma’lumotlari endi ishlamay qoladi va yangi ma’lumotlar ijro qatlami hisobiga yo‘naltirilgan bo‘ladi.

Pul yechib olish manzillari ikkita turda bo‘lishi mumkin: smart shartnoma (uning kodi orqali boshqariladigan) yoki tashqi egalikdagi hisob (EOA, uning maxfiy kaliti yordamida boshqariladigan). Hozirgi vaqtda bu hisoblarning konsensus qatlamiga validator vakolatlarining o‘zgarganligini bildiruvchi xabarni yuborish imkoniyati yo‘q. Bunday funksiyani qo‘shish esa protokolga keraksiz murakkablik kiritgan bo‘lardi.

Muayyan validatorning yechib olish manzilini o‘zgartirish o‘rniga, foydalanuvchilar kalit almashtirishni boshqara oladigan smart shartnomani, masalan, Safe kabi tizimni, o‘zlarining yechib olish manzili sifatida belgilashni tanlashlari mumkin. O‘z mablag‘larini shaxsiy EOA hisobiga o‘tkazgan foydalanuvchilar to‘liq chiqish orqali barcha tikilgan mablag‘larini yechib olishlari, so‘ngra yangi hisob ma’lumotlari bilan qayta tikishlari mumkin.
</ExpandableCard>

<ExpandableCard
title="Agar men tokenlarni garovga qo‘yishda yoki umumiy garovga qo‘yish jarayonida ishtirok etsam nima bo‘ladi"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Agar siz <a href="/staking/pools/">steyking puli</a>ning a’zosi bo‘lsangiz yoki steyking tokenlariga ega bo‘lsangiz, steyking yechib olish jarayoni haqida batafsilroq ma’lumot olish uchun o‘z xizmat ko‘rsatuvchingizga murojaat qilishingiz lozim, chunki har bir xizmat turlicha ishlaydi.

Umuman olganda, foydalanuvchilar o‘zlarining asosiy garovga qo‘yilgan ETHlarini qaytarib olish yoki foydalanayotgan steyking provayderni o‘zgartirish imkoniyatiga ega bo‘lishlari kerak. Agar ma’lum bir fond juda katta bo‘lib ketayotgan bo‘lsa, mablag‘larni chiqarib olish, qaytarib olish va <a href="https://rated.network/">kichikroq provayderga</a> qayta kiritish mumkin. Yoki, agar yetarli miqdorda ETH to‘plagan bo‘lsangiz, <a href="/staking/solo/">uydan turib steyking qilishingiz</a> mumkin.

</ExpandableCard>

<ExpandableCard
title="Mukofot to‘lovlari (qisman pul yechishlar) o‘z-o‘zidan amalga oshadimi?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Ha, agar tasdiqlovchingiz pul yechish manzilini taqdim etgan bo‘lsa, bu mumkin. Dastlab istalgan pul yechib olishni faollashtirish uchun bu bir marta amalga oshirilishi lozim, shundan so‘ng har bir validator tekshiruvi bilan bir necha kunlar oralig‘ida mukofot to‘lovlari avtomatik ravishda ishga tushadi.
</ExpandableCard>

<ExpandableCard
title="To‘liq mablag‘ni yechib olish jarayoni avtomatik tarzda amalga oshadimi?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Yo‘q, agar validatoringiz tarmoqda faol bo‘lsa, to‘liq mablag‘ni yechib olish o‘z-o‘zidan amalga oshmaydi. Bu ixtiyoriy chiqishni qo‘lda amalga oshirishni talab etadi.

Tekshiruvchi chiqish jarayonini tugatganidan so‘ng, hisobda yechib olish ma’lumotlari mavjud bo‘lsa, qolgan balans keyingi <a href="#validator-sweeping">tekshiruvchilarni tahlil qilish</a> paytida <em>shundagina</em> yechib olinadi.

</ExpandableCard>

<ExpandableCard title="O‘zim belgilagan miqdorni yechib olishim mumkinmi?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Yechib olishlar avtomat tarzda amalga oshirilishi uchun mo‘ljallangan bo‘lib, steyking jarayoniga faol hissa qo‘shmayotgan har qanday ETH o‘tkazib beriladi. Bu chiqish jarayonini to‘liq yakunlagan hisoblarning barcha qoldiqlarini o‘z ichiga oladi.

Muayyan miqdordagi ETH mablag‘larini yechib olishni oddiy usulda so‘rash imkonsiz.
</ExpandableCard>

<ExpandableCard
title="Men validator ishlataman. Pul yechib olishni yoqish to‘g‘risida batafsil ma’lumotni qayerdan topishim mumkin?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Tasdiqlovchi operatorlarga <a href="https://launchpad.ethereum.org/withdrawals/">Staking Launchpad Withdrawals</a> sahifasini ko‘zdan kechirish tavsiya etiladi. Bu yerda siz validatoringizni mablag‘ yechib olishga qanday tayyorlash, tadbirlarning vaqt jadvali va mablag‘ yechib olish jarayonining batafsil ishlash tartibi haqida qo‘shimcha ma’lumotlarni topishingiz mumkin.

Sozlamalaringizni avval sinov tarmog‘ida tekshirib ko‘rish uchun <a href="https://holesky.launchpad.ethereum.org">Holesky Testnet Staking Launchpad</a> sahifasiga tashrif buyuring va ishni boshlang.

</ExpandableCard>

<ExpandableCard
title="Chiqishdan so‘ng validatorni ko‘proq ETH kiritib qayta faollashtirishim mumkinmi?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Yo'q. Validator chiqib ketgandan so‘ng va uning to‘liq balansi yechib olingach, ushbu validatorga qo‘yilgan har qanday qo‘shimcha mablag‘lar keyingi validator tekshiruvi paytida avtomatik tarzda pul yechish manziliga o‘tkaziladi. ETHni qayta tiklab qo‘yish uchun yangi tasdiqlovchi faollashtirish kerak bo‘ladi.
</ExpandableCard>

## Qo'shimcha o'qish {#further-reading}

- [Steykingli ishga tushirish platformasidan mablag‘larni yechib olish](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: Mayoq zanjiri pul yechib olishlarini operatsiya sifatida amalga oshirish](https://eips.ethereum.org/EIPS/eip-4895)
- [Ethereum mushuk boshqaruvchilari - Shanxay](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94: Potuz & Syao-Vey Vang bilan ETH steyking yechib olishi (sinash) Syao-Vey Vang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Aleks Stoks bilan mayoq zanjiri chiqarish operatsiyalarini pul yechish sifatida amalga oshirish](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Validatorning samarali balansini tushunish](https://www.attestant.io/posts/understanding-validator-effective-balance/)
