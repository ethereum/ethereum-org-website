---
title: Kupatia majina mikataba mahiri
description: Mbinu bora za kupatia majina mikataba mahiri ya Ethereum kwa kutumia ENS
lang: sw
---

Mikataba mahiri ni msingi wa miundombinu iliyogatuliwa ya Ethereum, inayowezesha programu na itifaki zinazojitegemea. Lakini hata wakati uwezo wa mkataba unavyobadilika, watumiaji na wasanidi bado wanategemea anwani ghafi za heksadesimali kutambua na kurejelea mikataba hii.

Kupatia majina mikataba mahiri kwa kutumia [Ethereum Name Service (ENS)](https://ens.domains/) kunaboresha matumizi ya mtumiaji kwa kuondoa anwani za mkataba za heksadesimali na kupunguza hatari kutokana na mashambulizi kama vile kuharibu anwani na mashambulizi ya kuhadaa. Mwongozo huu unaeleza kwa nini kupatia majina mikataba mahiri ni muhimu, jinsi inavyoweza kutekelezwa, na zana zinazopatikana kama vile [Enscribe](https://www.enscribe.xyz) ili kurahisisha mchakato na kusaidia wasanidi kufuata mbinu hii.

## Kwa nini upatie majina mikataba mahiri? {#why-name-contracts}

### Vitambulisho vinavyosomeka na binadamu {#human-readable-identifiers}

Badala ya kuingiliana na anwani za mkataba zisizoeleweka kama vile `0x8f8e...f9e3`, wasanidi na watumiaji wanaweza kutumia majina yanayosomwa na binadamu kama vile `v2.myapp.eth`. Hii inarahisisha mwingiliano wa mkataba mahiri.

Hili linawezekana kupitia [Ethereum Name Service](https://ens.domains/) ambayo inatoa huduma ya majina iliyogatuliwa kwa anwani za Ethereum. Hii inafanana na jinsi Domain Name Service (DNS) inavyowezesha watumiaji wa intaneti kufikia anwani za mtandao kwa kutumia jina kama vile ethereum.org badala ya kupitia anwani ya IP kama vile `104.18.176.152`.

### Usalama na uaminifu ulioboreshwa {#improved-security-and-trust}

Mikataba iliyopewa majina inasaidia kupunguza miamala ya bahati mbaya kwenda kwenye anwani isiyo sahihi. Pia inasaidia watumiaji kutambua mikataba inayohusishwa na programu au chapa mahususi. Hii inaongeza safu ya uaminifu wa sifa, hasa wakati majina yameunganishwa na vikoa vikuu vinavyojulikana sana kama vile `uniswap.eth`.

Kutokana na urefu wa herufi 42 za anwani ya Ethereum, ni vigumu sana kwa watumiaji kutambua mabadiliko madogo kwenye anwani, ambapo herufi chache zimebadilishwa. Kwa mfano anwani kama vile `0x58068646C148E313CB414E85d2Fe89dDc3426870` kwa kawaida ingefupishwa kuwa `0x580...870` na programu zinazotumiwa na watumiaji kama vile mikoba. Kuna uwezekano mdogo kwa mtumiaji kugundua anwani hasidi ambapo herufi chache zimebadilishwa.

Aina hii ya mbinu inatumiwa na mashambulizi ya kuhadaa na kuharibu anwani ambapo watumiaji wanaongozwa kuamini kuwa wanaingiliana na au kutuma fedha kwenye anwani sahihi, wakati kiuhalisia anwani inafanana tu na anwani sahihi, lakini si sawa.

Majina ya ENS kwa mikoba na mikataba yanalinda dhidi ya aina hizi za mashambulizi. Kama mashambulizi ya kuhadaa ya DNS, mashambulizi ya kuhadaa ya ENS pia yanaweza kufichwa, hata hivyo, kuna uwezekano mkubwa kwa mtumiaji kugundua kosa la tahajia katika jina la ENS kuliko mabadiliko madogo kwenye anwani ya heksadesimali.

### UX bora kwa mikoba na vivinjari {#better-ux}

Wakati mkataba mahiri umesanidiwa na jina la ENS, inawezekana kwa programu kama vile mikoba na vivinjari vya mnyororo wa vitalu kuonyesha majina ya ENS kwa mikataba mahiri, badala ya anwani za heksadesimali. Hii inatoa uboreshaji mkubwa wa matumizi ya mtumiaji (UX) kwa watumiaji.

Kwa mfano, wakati wa kuingiliana na programu kama vile Uniswap, kwa kawaida watumiaji wataona kwamba programu wanayoingiliana nayo inapatikana kwenye tovuti ya `uniswap.org`, lakini wangeonyeshwa anwani ya mkataba ya heksadesimali ikiwa Uniswap haijapatia majina mikataba yao mahiri kwa kutumia ENS. Ikiwa mkataba umepewa jina, badala yake wangeweza kuona `v4.contracts.uniswap.eth` ambayo ni muhimu zaidi.

## Kupatia majina wakati wa usambazaji dhidi ya baada ya usambazaji {#when-to-name}

Kuna hatua mbili ambazo mikataba mahiri inaweza kupatiwa majina:

- **Wakati wa usambazaji**: kugawa jina la ENS kwa mkataba unaposambazwa.
- **Baada ya usambazaji**: kuunganisha anwani ya mkataba iliyopo na jina jipya la ENS.

Njia zote mbili zinategemea kuwa na ufikiaji wa mmiliki au meneja kwenye kikoa cha ENS ili waweze kuunda na kuweka rekodi za ENS.

## Jinsi upatiaji majina wa ENS unavyofanya kazi kwa mikataba {#how-ens-naming-works}

Majina ya ENS yanahifadhiwa mnyororoni na kutatuliwa kwa anwani za Ethereum kupitia vitatuzi vya ENS. Ili kupatia jina mkataba mahiri:

1. Sajili au dhibiti kikoa kikuu cha ENS (k.m. `myapp.eth`)
2. Unda kikoa kidogo (k.m. `v1.myapp.eth`)
3. Weka rekodi ya `address` ya kikoa kidogo kwenye anwani ya mkataba
4. Weka rekodi ya kinyume ya mkataba kwenye ENS ili kuruhusu jina kupatikana kupitia anwani yake

Majina ya ENS yanafuata mpangilio na yanasaidia majina madogo yasiyo na kikomo. Kuweka rekodi hizi kwa kawaida kunahusisha kuingiliana na sajili ya ENS na mikataba ya vitatuzi vya umma.

## Zana za kupatia majina mikataba {#tools}

Kuna njia mbili za kupatia majina mikataba mahiri. Ama kutumia [Programu ya ENS](https://app.ens.domains) na baadhi ya hatua za mikono, au kutumia [Enscribe](https://www.enscribe.xyz). Hizi zimeainishwa hapa chini.

### Usanidi wa ENS wa mikono {#manual-ens-setup}

Kwa kutumia [Programu ya ENS](https://app.ens.domains/), wasanidi wanaweza kuunda majina madogo kwa mikono na kuweka rekodi za anwani za mbele. Hata hivyo, hawawezi kuweka jina la msingi kwa mkataba mahiri kwa kuweka rekodi ya kinyume kwa jina kupitia programu ya ENS. Hatua za mikono lazima zichukuliwe ambazo zimefunikwa katika [nyaraka za ENS](https://docs.ens.domains/web/naming-contracts/).

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) inarahisisha upatiaji majina wa mkataba mahiri kwa kutumia ENS, na inaboresha uaminifu wa mtumiaji katika mikataba mahiri. Inatoa:

- **Usambazaji na upatiaji majina wa atomiki**: Gawa jina la ENS wakati wa kusambaza mkataba mpya
- **Upatiaji majina baada ya usambazaji**: Ambatisha majina kwenye mikataba ambayo tayari imesambazwa
- **Usaidizi wa minyororo mingi**: Inafanya kazi kwenye mitandao ya Ethereum na tabaka la 2 (l2) ambapo ENS inasaidiwa
- **Data ya uthibitishaji wa mkataba**: Inajumuisha data ya uthibitishaji wa mkataba iliyotolewa kutoka vyanzo vingi ili kuongeza uaminifu kwa watumiaji

Enscribe inasaidia majina ya ENS yaliyotolewa na watumiaji, au vikoa vyake yenyewe ikiwa mtumiaji hana jina la ENS.

Unaweza kufikia [Programu ya Enscribe](https://app.enscribe.xyz) ili kuanza kupatia majina na kutazama mikataba mahiri.

## Mbinu bora {#best-practices}

- **Tumia majina wazi, yenye matoleo** kama vile `v1.myapp.eth` ili kufanya uboreshaji wa mkataba uwe wazi
- **Weka rekodi za kinyume** ili kuunganisha mikataba na majina ya ENS kwa mwonekano katika programu kama vile mikoba na vivinjari vya mnyororo wa vitalu.
- **Fuatilia kwa karibu muda wa kuisha** ikiwa unataka kuzuia mabadiliko ya bahati mbaya katika umiliki
- **Thibitisha chanzo cha mkataba** ili watumiaji waweze kuamini kwamba mkataba uliopewa jina unafanya kazi kama inavyotarajiwa

## Hatari {#risks}

Kupatia majina mikataba mahiri kunatoa faida kubwa kwa watumiaji wa Ethereum, hata hivyo, wamiliki wa vikoa vya ENS lazima wawe waangalifu kuhusiana na usimamizi wao. Hatari zinazojulikana ni pamoja na:

- **Kuisha muda**: Kama tu majina ya DNS, usajili wa majina ya ENS una muda maalum. Hivyo ni muhimu kwamba wamiliki wafuatilie tarehe za kuisha kwa vikoa vyao na kuvisasisha mapema kabla ya kuisha muda wake. Programu ya ENS na Enscribe zote zinatoa viashiria vya kuona kwa wamiliki wa vikoa wakati muda wa kuisha unakaribia.
- **Mabadiliko katika umiliki**: Rekodi za ENS zinawakilishwa kama NFT kwenye Ethereum, ambapo mmiliki wa kikoa mahususi cha `.eth` anamiliki NFT inayohusishwa. Hivyo ikiwa akaunti tofauti itachukua umiliki wa NFT hii, mmiliki mpya anaweza kurekebisha rekodi zozote za ENS anavyoona inafaa.

Ili kupunguza hatari kama hizo, akaunti ya mmiliki kwa vikoa vya kiwango cha 2 (2LD) vya `.eth` inapaswa kulindwa kupitia mkoba wa saini nyingi huku vikoa vidogo vikiundwa ili kusimamia upatiaji majina wa mkataba. Kwa njia hiyo katika tukio la mabadiliko yoyote ya bahati mbaya au hasidi katika umiliki katika kiwango cha kikoa kidogo, yanaweza kubatilishwa na mmiliki wa 2LD.

## Mustakabali wa upatiaji majina wa mkataba {#future}

Upatiaji majina wa mkataba unakuwa mbinu bora kwa uundaji wa programu tumizi iliyogatuliwa (dapp), sawa na jinsi majina ya vikoa yalivyochukua nafasi ya anwani za IP kwenye wavuti. Kadiri miundombinu zaidi kama vile mikoba, vivinjari na dashibodi zinavyojumuisha utatuzi wa ENS kwa mikataba, mikataba iliyopewa majina itaboresha usalama na kupunguza makosa katika mfumo mzima wa ikolojia.

Kwa kufanya mikataba mahiri iwe rahisi kutambua na kuelewa, upatiaji majina unasaidia kuziba pengo kati ya watumiaji na programu kwenye Ethereum, na kuboresha usalama na UX kwa watumiaji.

## Usomaji zaidi {#further-reading}

- [Kupatia Majina Mikataba Mahiri kwa kutumia ENS](https://docs.ens.domains/web/naming-contracts/)
- [Kupatia Majina Mikataba Mahiri kwa kutumia Enscribe](https://www.enscribe.xyz/docs).