---
title: Aqlli shartnomalar
description: Aqlli shartnomalar bilan texnik bo‘lmagan tanishuv
lang: uz
---

# Aqlli shartnomalar bilan tanishish {#introduction-to-smart-contracts}

Aqlli shartnomalar Ethereum ilova qatlamining asosiy qurilish bloklari hisoblanadi. Ular [blokcheynda](/glossary/#blockchain) saqlanadigan, “agar bu bo‘lsa, unda u” mantig‘iga amal qiladigan va yaratilganidan keyin o‘zgartirib bo‘lmaydigan, uning kodida belgilangan qoidalarga muvofiq ishlashi kafolatlangan kompyuter dasturlari hisoblanadi.

Nik Szabo “aqlli shartnoma” atamasini kiritdi. 1994-yilda u [konsepsiyaning muqaddimasini](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) yozdi va 1996-yilda [aqlli shartnomalar nima qilishi mumkinligi haqida tadqiqot](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html) yozdi.

Szabo raqamli bozorni tasavvur qildi, bu yerda avtomatik, [kriptografik jihatdan xavfsiz](/glossary/#cryptography) jarayonlar tranzaksiyalar va biznes funksiyalarini ishonchli vositachilarsiz amalga oshirishga imkon beradi. Ethereum’dagi aqlli shartnomalar ushbu qarashni amalga oshirdi.

Watch Finematics aqlli shartnomalarni tushuntiradi:

<YouTube id="pWGLtjG-F5c" />

## An’anaviy shartnomalarga ishonch {#trust-and-contracts}

An’anaviy shartnoma bilan bog‘liq eng katta muammolardan biri ishonchli shaxslar tomonidan shartnoma natijalarini kuzatib borish zarurati hisoblanadi.

Mana bir misol:

Alice va Bob velopoyga o‘tkazmoqda. Aytaylik, Alice Bobga 10 dollar tikib, poygada g‘olib chiqadi. Bob g‘olib bo‘lishiga ishonadi va garovga rozi bo‘ladi. Oxir-oqibat, Alice poygani Bobdan ancha oldinda yakunlaydi va aniq g‘olib hisoblanadi. Ammo Bob garovga pul to‘lashdan bosh tortadi va Alice aldagan bo‘lishi kerak deb da’vo qiladi.

Ushbu ahmoqona misol har qanday aqlga to‘g‘ri kelmaydigan kelishuv bilan bog‘liq muammoni ko‘rsatadi. Shartnoma shartlari bajarilsa ham (ya’ni siz poygada g‘olib bo‘lsangiz), siz shartnomani bajarish uchun boshqa shaxsga ishonishingiz kerak (ya’ni garov bo‘yicha to‘lov).

## Raqamli savdo avtomati {#vending-machine}

Aqlli shartnoma uchun oddiy metafora savdo avtomatidir, u aqlli shartnomaga o‘xshash ishlaydi — ma’lum bir omillar oldindan belgilangan natijalarni kafolatlaydi.

- Mahsulotni tanladingiz
- Savdo mashinasi narxni ko‘rsatadi
- Siz narxni to‘laysiz
- Savdo mashinasi siz kerakli summani to‘laganingizni tekshiradi
- Savdo mashinasi sizga buyumingizni beradi

Savdo mashinasi barcha talablar bajarilganidan keyingina kerakli mahsulotni tarqatadi. Agar mahsulot tanlamasangiz yoki yetarli miqdorda pul sarflamasangiz, savdo mashinasi mahsulotingizni bermaydi.

## Avtomatik ijro {#automation}

Aqlli shartnomaning asosiy afzalligi shundaki, u ma’lum shartlar bajarilganda bir ma’noli kodni deterministik tarzda bajaradi. Insonning natijani sharhlashini yoki muzokara olib borishini kutish shart emas. Bu ishonchli vositachilarga bo‘lgan ehtiyojni bartaraf etadi.

Masalan, siz bola uchun mablag‘larni saqlash uchun aqlli shartnoma yozishingiz mumkin, bu ularga ma’lum bir sanadan keyin mablag‘larni yechib olish imkonini beradi. Agar ushbu sanadan oldin yechib olishga urinsa, aqlli shartnoma ishlamaydi. Yoki dilerga haq to‘laganingizda avtomatik ravishda avtomobil nomining raqamli versiyasini beradigan shartnoma yozishingiz mumkin.

## Bashorat qilish mumkin bo‘lgan natijalar {#predictability}

An’anaviy shartnomalar noaniqdir, chunki ular ularni talqin qilish va amalga oshirish uchun odamlarga tayanadi. Misol uchun, ikki hakam shartnomani turlicha talqin qilishi mumkin, bu esa nomuvofiq qarorlar va noteng natijalarga olib kelishi mumkin. Aqlli shartnomalar bu imkoniyatni olib tashlaydi. Buning o‘rniga aqlli shartnomalar shartnoma kodida yozilgan shartlar asosida amalga oshiriladi. Bu aniqlik shuni anglatadiki, bir xil sharoitlarda aqlli shartnoma bir xil natijani beradi.

## Ochiq yozuv {#public-record}

Aqlli shartnomalar audit va kuzatuv uchun foydalidir. Ethereum aqlli shartnomalari ochiq blokcheynda bo‘lganligi sababli, har kim aktivlarni o‘tkazish va boshqa tegishli ma’lumotlarni darhol kuzatishi mumkin. Masalan, kimdir manzilingizga pul yuborganini tekshirishingiz mumkin.

## Maxfiylik himoyasi {#privacy-protection}

Aqlli shartnomalar maxfiyligingizni ham himoya qiladi. Ethereum taxallusli tarmoq bo‘lganligi sababli (tranzaksiyalaringiz shaxsiyatingiz bilan emas, balki unikal kriptografik manzil bilan ochiq bog‘langan), maxfiyligingizni kuzatuvchilardan himoya qilishingiz mumkin.

## Koʻrinadigan sharhlar {#visible-terms}

Nihoyat, an’anaviy shartnomalar kabi, aqlli shartnomani imzolashdan oldin (yoki boshqacha tarzda u bilan ishlashdan oldin) undagi ma’lumotlarni tekshirishingiz mumkin. Aqlli shartnomaning shaffofligi uni har kim sinchkovlik bilan tekshirishi mumkinligini kafolatlaydi.

## Aqlli shartnomalardan foydalanish holatlari {#use-cases}

Aqlli shartnomalar kompyuter dasturlari bajaradigan deyarli barcha ishlarni bajarishi mumkin.

Ular hisob-kitoblarni amalga oshirishi, valyuta yaratishi, ma’lumotlarni saqlashi, [NFTlarni](/glossary/#nft) zarb qilishi, aloqa yuborishi va hatto grafiklarni yaratishi mumkin. Quyida real hayotdagi ba’zi mashhur misollar keltirilgan:

- [Stablecoins](/stablecoins/)
- [Noyob raqamli aktivlarni yaratish va tarqatish](/nft/)
- [Avtomatik, ochiq valyuta ayirboshlash](/get-eth/#dex)
- [Markazlashmagan o‘yin](/dapps/?category=gaming#explore)
- [Avtomatik ravishda to‘lanadigan sug‘urta polisi](https://etherisc.com/)
- [Odamlarga moslangan, o‘zaro moslashuvchan valyutalarni yaratish imkonini beruvchi standart](/developers/docs/standards/tokens/)

## Qo'shimcha o'qish {#further-reading}

- [Aqlli shartnomalar dunyoni qanday o‘zgartiradi](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Aqlli shartnomalar: advokatlar o‘rnini bosadigan blokcheyn texnologiyasi](https://blockgeeks.com/guides/smart-contracts/)
- [Dasturchilar uchun aqlli shartnomalar](/developers/docs/smart-contracts/)
- [Aqlli shartnomalarni yozishni o‘rganish](/developers/learning-tools/)
- [Ethereumʼni o‘zlashtirish — Aqlli shartnoma nima?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
