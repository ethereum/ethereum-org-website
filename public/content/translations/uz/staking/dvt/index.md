---
title: Taqsimlangan validator texnologiyasi
description: Taqsimlangan validator texnologiyasi Ethereum validatorining bir nechta tomonlar tomonidan taqsimlangan ishlashini ta’minlaydi.
lang: uz
---

# Taqsimlangan validator texnologiyasi {#distributed-validator-technology}

Taqsimlangan validator texnologiyasi (DVT) validator xavfsizligiga yondashuv bo‘lib, asosiy boshqaruv va imzolash majburiyatlarini bir nechta tomonlarga tarqatadi, bir nechta muvaffaqiyatsizlik nuqtalarini kamaytiradi va validator barqarorligini oshiradi.

U buni **shaxsiy kalitni** “klasterga” birlashtirilgan ko‘plab kompyuterlarda **validatorni himoyalash uchun ishlatiladigan kalitni** ajratish orqali amalga oshiradi. Buning afzalligi shundaki, bu tajovuzkorlar uchun kalitga kirishni juda qiyinlashtiradi, chunki u hech qanday mashinada to‘liq saqlanmaydi. Shuningdek, u ba’zi tugunlarni oflayn qilish imkonini beradi, chunki zarur imzolashni har bir klasterdagi mashinalarning kichik to‘plami amalga oshirishi mumkin. Bu tarmoqdagi bitta nosozlik nuqtasini kamaytiradi va butun validator to‘plamini yanada mustahkam qiladi.

![Bitta validator kaliti qanday qilib asosiy ulushlarga bo'linishi va turli komponentlar bilan bir nechta tugunlarga taqsimlanishi ko'rsatilgan diagramma.](./dvt-cluster.png)

## DVT nima uchun kerak? {#why-do-we-need-dvt}

### Xavfsizlik {#security}

Validatorlar ikkita davlat-xususiy kalitlar juftligini yaratadi: konsensusda ishtirok etish uchun validator kalitlari va mablag‘larga kirish uchun yechib olish kalitlari. Tasdiqlovchilar yechib olish kalitlarini sovuq xotirada saqlashi mumkin bo‘lsa-da, validator shaxsiy kalitlari 24/7 onlayn bo‘lishi kerak. Agar validator shaxsiy kaliti buzilgan bo‘lsa, tajovuzkor validatorni boshqarishi mumkin, bu esa stakerning ETH qisqarishiga yoki yo‘qolishiga olib kelishi mumkin. DVT bu riskni kamaytirishga yordam beradi. Bu qanday amalga oshiriladi:

DVTdan foydalangan holda, ishtirokchilar sovuq xotirada validator maxfiy kalitini saqlagan holda stavkalarda ishtirok etishlari mumkin. Bunga asl, to‘liq validator kalitini shifrlash va keyin uni kalit ulushlariga bo‘lish orqali erishiladi. Kalit aksiyalari onlayn rejimda ishlaydi va validatorning taqsimlangan ishlashini ta’minlaydigan bir nechta tugunlarga tarqatiladi. Bu mumkin, chunki Ethereum validatorlari qo‘shimcha bo‘lgan BLS imzolaridan foydalanadilar, ya’ni to‘liq kalit ularning tarkibiy qismlarini qo‘shish orqali qayta tiklanishi mumkin. Bu ishtirokchiga to‘liq, asl “master” validator kalitini xavfsiz oflayn saqlash imkonini beradi.

### Muvaffaqiyatsizlik ballari yo‘q {#no-single-point-of-failure}

Agar validator bir nechta operator va bir nechta mashinalarga bo‘lingan bo‘lsa, u oflayn bo‘lmasdan alohida apparat va dasturiy ta’minotdagi nosozliklarga bardosh bera oladi. Klaster tugunlari bo‘ylab turli xil apparat-dasturiy konfiguratsiyalardan foydalanish orqali ham nosozlik riskini kamaytirish mumkin. Bu bardoshlilik bir tugunli validator konfiguratsiyalari uchun mavjud emas — u DVT qatlamidan keladi.

Agar klasterdagi mashinaning tarkibiy qismlaridan biri pastga tushsa (masalan, validator klasterida to‘rtta operator bo‘lsa va bittasi nosozlikka ega bo‘lgan ma’lum bir mijozdan foydalansa), qolganlari validatorning ishlashini ta’minlaydi.

### Decentralization {#decentralization}

Ethereum uchun ideal ssenariy iloji boricha ko‘proq mustaqil ishlaydigan validatorlarga ega bo‘lishdir. Biroq, bir nechta stavka provayderlari juda mashhur bo‘lib ketdi va tarmoqda umumiy ETHning sezilarli qismini tashkil qiladi. DVT ulushning nomarkazlashuvini saqlab qolgan holda ushbu operatorlarning mavjud bo‘lishiga ruxsat berishi mumkin. Buning sababi shundaki, har bir validator uchun kalitlar ko‘plab mashinalarga tarqatiladi va validatorning zararli bo‘lishi uchun ancha katta til biriktirish kerak bo‘ladi.

DVTsiz provayderlar o‘zlarining barcha validatorlari uchun faqat bitta yoki ikkita mijoz konfiguratsiyasini qo‘llab-quvvatlashi va mijoz xatosi ta’sirini oshirishi osonroq. DVT riskni bir nechta mijoz konfiguratsiyalari va turli apparat vositalariga tarqatish uchun ishlatilishi mumkin, bu esa xilma-xillik orqali barqarorlikni yaratadi.

**DVT Ethereum uchun quyidagi imtiyozlarni taklif qiladi:**

1. Ethereum aksiyalarini tasdiqlash konsensusini **nomarkazlashtirish**
2. Tarmoqning **jonliligini** ta’minlaydi
3. Validatorning **nosozlikka chidamliligini** yaratadi
4. **Ishonch minimallashtirilgan** validator amaliyoti
5. **Minimallashtirilgan kesish** va ishlamay qolish riski
6. **Xilma-xillik yaxshilandi** (mijoz, ma’lumotlar markazi, joylashuv axboroti, tartibga solish va boshqalar)
7. Validator kalitlarini boshqarishning **kuchaytirilgan xavfsizligi**

## DVT qanday ishlaydi? {#how-does-dvt-work}

DVT yechimi quyidagi komponentlarni o‘z ichiga oladi:

- **[Shamirning maxfiy ulashuvi](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** — Validatorlar [BLS kalitlaridan](https://en.wikipedia.org/wiki/BLS_digital_signature) foydalanadi. Alohida BLS “asosiy aksiyalar” (“asosiy aksiyalar”) bitta jamlangan kalitga (imzo) birlashtirilishi mumkin. DVTda validatorning xususiy kaliti klasterdagi har bir operatorning birlashtirilgan BLS imzosi hisoblanadi.
- **[Imzoning chegara sxemasi](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** — majburiyatlarni imzolash uchun zarur bo‘lgan alohida asosiy aksiyalar sonini aniqlaydi, masalan, 4 tadan 3 tasi.
- **[Taqsimlangan kalitlar generatsiyasi (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** — bu kalitlar ulushlarini hosil qiluvchi va mavjud yoki yangi validator kalitining ulushlarini klasterdagi tugunlarga taqsimlash uchun ishlatiladigan kriptografik jarayon.
- **[Ko‘p tomonlama hisoblash (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** — To‘liq validator kaliti ko‘p tomonlama hisoblash yordamida maxfiy ravishda yaratiladi. To‘liq kalit hech qachon alohida operatorga ma’lum emas — ular har doim uning faqat o‘z qismini (o‘z “ulushi”) biladilar.
- **Konsensus protokoli** — Konsensus protokoli blok taklif qiluvchi sifatida bitta tugunni tanlaydi. Ular blokni klasterning boshqa tugunlari bilan baham ko‘rishadi, ular o‘zlarining asosiy ulushlarini agregat imzosiga qo‘shadilar. Yetarlicha asosiy aksiyalar jamlanganda, blok Ethereumʼda taklif qilinadi.

Taqsimlangan validatorlar o‘rnatilgan nosozliklarga chidamli va ayrim tugunlar oflayn bo‘lsa ham ishlashda davom etishi mumkin. Bu shuni anglatadiki, klaster tarkibidagi ba’zi tugunlar zararli yoki dangasa bo‘lib chiqsa ham, u bardoshli.

## DVTdan foydalanish holatlari {#dvt-use-cases}

DVT kengroq staking sanoati uchun muhim oqibatlarga ega:

### Yakka stakerlar {#solo-stakers}

DVT, shuningdek, to‘liq kalitni butunlay oflayn saqlagan holda, validator kalitingizni masofaviy tugunlar bo‘ylab tarqatish imkonini berib, ehtiyotsiz stavkalashni ham yoqadi. Bu shuni anglatadiki, bosh sahifa stakeri apparat qismiga sarflashi shart emas, shu bilan birga asosiy aksiyalarni taqsimlash ularni ehtimoliy xakerliklarga qarshi mustahkamlashga yordam beradi.

### Staking as a service (SaaS) {#saas}

Ko‘pgina validatorlarni boshqaradigan operatorlar (masalan, pul qo‘yish fondlari va institutsional manfaatdorlar) o‘z riskini kamaytirish uchun DVTdan foydalanishlari mumkin. O‘z infratuzilmalarini taqsimlash orqali ular o‘z operatsiyalariga ortiqchalik qo‘shishlari va foydalanadigan apparat turlarini diversifikatsiya qilishlari mumkin.

DVT bir nechta tugunlarda asosiy boshqaruv uchun javobgarlikni taqsimlaydi, ya’ni ba’zi operatsion xarajatlar ham taqsimlanishi mumkin. DVT, shuningdek, staking provayderlari uchun operatsion risk va sug‘urta xarajatlarini kamaytirishi mumkin.

### Staking pools {#staking-pools}

Standart tasdiqlash qurilmalari tufayli garov pullari va likvidli garov provayderlari turli darajadagi bir operatorning ishonchiga ega bo‘lishga majburdirlar, chunki foyda va zararlar butun hovuz bo‘ylab ijtimoiylashtiriladi. Ular, shuningdek, imzolash kalitlarini himoya qilish uchun operatorlarga tayanadilar, chunki hozirgacha ular uchun boshqa variant yo‘q edi.

Garchi an’anaviy ravishda bir nechta operatorlar o‘rtasida ulushlarni taqsimlash orqali riskni taqsimlash uchun harakatlar amalga oshirilsa-da, har bir operator hali ham muhim ulushni mustaqil ravishda boshqaradi. Agar bitta operator kam ishlasa, tanaffusga duch kelsa, obro‘siga putur yetkazsa yoki yomon niyatda harakat qilsa, unga tayanish katta xavf tug‘diradi.

DVTdan foydalanish orqali operatorlardan talab qilinadigan ishonch sezilarli darajada kamayadi. **Pullar operatorlarga validator kalitlarini saqlashni talab qilmasdan stavkalarni ushlab turishga imkon berishi mumkin** (chunki faqat kalit qismlari ishlatiladi). Shuningdek, u boshqariladigan stavkalarni ko‘proq operatorlar o‘rtasida taqsimlash imkonini beradi (masalan, 1000 ta validatorni boshqaradigan bitta operator o‘rniga, DVT ushbu validatorlarni bir nechta operatorlar tomonidan birgalikda boshqarishga imkon beradi). Turli xil operator konfiguratsiyalari bitta operator pastga tushsa, qolganlari hali ham tasdiqlay olishini ta’minlaydi. Bu ortiqcha daromad va diversifikatsiyaga olib keladi, bu esa samaradorlikni oshirish va barqarorlikka olib keladi, shu bilan birga mukofotlarni maksimallashtiradi.

Bir operatorning ishonchini minimallashtirishning yana bir afzalligi shundaki, pul qo‘yish pullari operatorning ochiqroq va ruxsatsiz ishtirok etishiga imkon beradi. Shunday qilib, xizmatlar o‘z xavfini kamaytirishi va tartibga solingan va ruxsatsiz operatorlar to‘plamidan foydalanish orqali Ethereum markazlashtirishni qo‘llab-quvvatlashi mumkin, masalan, uy yoki bir nechta kichik ishtirokchilarni kattaroqlari bilan juftlash orqali.

## DVTdan foydalanishning ehtimoliy kamchiliklari {#potential-drawbacks-of-using-dvt}

- **Qo‘shimcha komponent** — DVT tugunini kiritish nosoz yoki zaif bo‘lishi mumkin bo‘lgan boshqa qismni qo‘shadi. Buni yumshatishning bir yo‘li DVT tugunini bir nechta amalga oshirishga intilishdir, ya’ni bir nechta DVT mijozlari (konsensus va ijro etish qatlamlari uchun bir nechta mijozlar bo‘lgani kabi).
- **Operatsion xarajatlar** — DVT validatorni bir nechta tomonlar o‘rtasida taqsimlagani sababli, faqat bitta tugun o‘rniga ishlash uchun ko‘proq tugunlar kerak bo‘ladi, bu esa yuqori operatsion xarajatlarni keltirib chiqaradi.
- **Potensial yuqori kechikish** — DVT validatorni ishlaydigan bir nechta tugunlar o‘rtasida kelishuvga erishish uchun konsensus protokolidan foydalanishi sababli, u potensial ravishda yuqori kechikishni joriy qilishi mumkin.

## Further Reading {#further-reading}

- [Ethereum taqsimlangan validator xususiyatlari (yuqori daraja)](https://github.com/ethereum/distributed-validator-specs)
- [Ethereum taqsimlangan validatorining texnik xususiyatlari](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Shamir maxfiy axborotni ulashish demo ilovasi](https://iancoleman.io/shamir/)
