---
title: Kutaja mikataba-erevu
description: Mbinu bora za kutaja mikataba-erevu ya Ethereum kwa kutumia ENS
lang: sw
---

Mikataba-erevu ni msingi wa miundombinu iliyogatuliwa ya Ethereum, inayowezesha programu na itifaki zinazojiendesha. Lakini hata uwezo wa mikataba unavyoendelea kubadilika, watumiaji na wasanidi programu bado wanategemea anwani ghafi za heksadesimali kutambua na kurejelea mikataba hii.

Kutaja mikataba-erevu kwa kutumia [Huduma ya Majina ya Ethereum (ENS)](https://ens.domains/) inaboresha hali ya utumiaji kwa kuondoa anwani za mkataba za heksadesimali na kupunguza hatari kutokana na mashambulizi kama vile sumu ya anwani na mashambulizi ya udanganyifu. Mwongozo huu unaeleza kwa nini kutaja mikataba-erevu ni muhimu, jinsi inaweza kutekelezwa, na zana zinazopatikana kama vile [Enscribe](https://www.enscribe.xyz) ili kurahisisha mchakato na kusaidia wasanidi programu kufuata utaratibu huu.

## Kwa nini tutaje mikataba-erevu? {#why-name-contracts}

### Vitambulisho vinavyoweza kusomwa na binadamu {#human-readable-identifiers}

Badala ya kuingiliana na anwani za mkataba zisizoeleweka kama `0x8f8e...f9e3`, wasanidi programu na watumiaji wanaweza kutumia majina yanayoweza kusomwa na binadamu kama `v2.myapp.eth`. Hii hurahisisha mwingiliano wa mikataba-erevu.

Hii inawezekana kutokana na [Huduma ya Majina ya Ethereum](https://ens.domains/) ambayo hutoa huduma ya majina iliyogatuliwa kwa anwani za Ethereum. Hii ni sawa na jinsi Huduma ya Majina ya Vikoa (DNS) inavyowezesha watumiaji wa intaneti kufikia anwani za mtandao kwa kutumia jina kama vile ethereum.org badala ya anwani ya IP kama vile `104.18.176.152`.

### Usalama na uaminifu ulioboreshwa {#improved-security-and-trust}

Mikataba iliyotajwa husaidia kupunguza miamala ya kimakosa kwenda kwenye anwani isiyo sahihi. Pia husaidia watumiaji kutambua mikataba inayohusishwa na programu au chapa maalum. Hii inaongeza safu ya uaminifu wa sifa, hasa wakati majina yameunganishwa na vikoa vikuu vinavyojulikana kama `uniswap.eth`.

Kutokana na urefu wa herufi 42 za anwani ya Ethereum, ni vigumu sana kwa watumiaji kutambua mabadiliko madogo katika anwani, ambapo herufi chache zimebadilishwa. Kwa mfano, anwani kama `0x58068646C148E313CB414E85d2Fe89dDc3426870` kwa kawaida ingefupishwa hadi `0x580...870` na programu zinazotumiwa na watumiaji kama vile mikoba. Mtumiaji hawezi kugundua kwa urahisi anwani yenye nia mbaya ambapo herufi chache zimebadilishwa.

Aina hii ya mbinu hutumiwa na mashambulizi ya udanganyifu wa anwani na sumu ambapo watumiaji huongozwa kuamini kuwa wanashirikiana na au kutuma fedha kwenye anwani sahihi, wakati kwa kweli anwani hiyo inafanana tu na anwani sahihi, lakini si sawa.

Majina ya ENS kwa mikoba na mikataba hulinda dhidi ya aina hizi za mashambulizi. Kama mashambulizi ya udanganyifu wa DNS, mashambulizi ya udanganyifu wa ENS yanaweza pia kutokea, hata hivyo, mtumiaji ana uwezekano mkubwa wa kugundua makosa ya tahajia katika jina la ENS kuliko mabadiliko madogo kwenye anwani ya heksadesimali.

### UX bora kwa mikoba na wachunguzi {#better-ux}

Wakati mkataba-erevu umesanidiwa na jina la ENS, inawezekana kwa programu kama vile mikoba na wachunguzi wa mnyororo wa bloku kuonyesha majina ya ENS kwa mikataba-erevu, badala ya anwani za heksadesimali. Hii inatoa uboreshaji mkubwa wa hali ya utumiaji (UX) kwa watumiaji.

Kwa mfano, wakati wa kuingiliana na programu kama vile Uniswap, watumiaji kwa kawaida wataona kuwa programu wanayoingiliana nayo inapatikana kwenye tovuti `uniswap.org`, lakini wangeonyeshwa anwani ya mkataba ya heksadesimali ikiwa Uniswap haijataja mikataba-erevu yake kwa kutumia ENS. Ikiwa mkataba umetajwa, badala yake wangeweza kuona `v4.contracts.uniswap.eth` ambayo ni muhimu zaidi.

## Kutaja wakati wa upelekaji dhidi ya baada ya upelekaji {#when-to-name}

Kuna alama mbili ambazo mikataba-erevu inaweza kutajwa:

- **Wakati wa upelekaji**: kupeana jina la ENS kwa mkataba unapopelekwa.
- **Baada ya upelekaji**: kuoanisha anwani ya mkataba iliyopo na jina jipya la ENS.

Njia zote mbili zinategemea kuwa na ufikiaji wa mmiliki au msimamizi wa kikoa cha ENS ili waweze kuunda na kuweka rekodi za ENS.

## Jinsi utajaji wa ENS unavyofanya kazi kwa mikataba {#how-ens-naming-works}

Majina ya ENS huhifadhiwa kwenye mnyororo na hutatuliwa kwa anwani za Ethereum kupitia visuluhishi vya ENS. Ili kutaja mkataba-erevu:

1. Sajili au dhibiti kikoa kikuu cha ENS (k.m. `myapp.eth`)
2. Unda kikoa kidogo (k.m. `v1.myapp.eth`)
3. Weka rekodi ya `address` ya kikoa kidogo kwenye anwani ya mkataba
4. Weka rekodi ya nyuma ya mkataba kwenye ENS ili kuruhusu jina kupatikana kupitia anwani yake

Majina ya ENS yana mpangilio wa daraja na yanasaidia majina madogo yasiyo na kikomo. Kuweka rekodi hizi kwa kawaida kunahusisha kuingiliana na sajili ya ENS na mikataba ya visuluhishi vya umma.

## Zana za kutaja mikataba {#tools}

Kuna njia mbili za kutaja mikataba-erevu. Ama kutumia [Programu ya ENS](https://app.ens.domains) na hatua kadhaa za mwongozo, au kutumia [Enscribe](https://www.enscribe.xyz). Hizi zimeainishwa hapa chini.

### Usanidi wa mwongozo wa ENS {#manual-ens-setup}

Kwa kutumia [Programu ya ENS](https://app.ens.domains/), wasanidi programu wanaweza kuunda majina madogo kwa mikono na kuweka rekodi za anwani za mbele. Hata hivyo, hawawezi kuweka jina la msingi kwa mkataba-erevu kwa kuweka rekodi ya nyuma ya jina kupitia programu ya ENS. Hatua za mwongozo lazima zichukuliwe ambazo zimeelezwa katika [nyaraka za ENS](https://docs.ens.domains/web/naming-contracts/).

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) hurahisisha utajaji wa mikataba-erevu kwa kutumia ENS, na huongeza imani ya mtumiaji katika mikataba-erevu. Inatoa:

- **Upelekaji wa atomiki na utajaji**: Peana jina la ENS wakati wa kupeleka mkataba mpya
- **Utajaji baada ya upelekaji**: Ambatisha majina kwenye mikataba iliyokwishapelekwa
- **Usaidizi wa minyororo mingi**: Inafanya kazi katika mitandao ya Ethereum na L2 ambapo ENS inasaidiwa
- **Data ya uthibitishaji wa mkataba**: Inajumuisha data ya uthibitishaji wa mkataba inayotolewa kutoka vyanzo vingi ili kuongeza imani kwa watumiaji

Enscribe inasaidia majina ya ENS yaliyotolewa na watumiaji, au vikoa vyake ikiwa mtumiaji hana jina la ENS.

Unaweza kufikia [Programu ya Enscribe](https://app.enscribe.xyz) ili kuanza kutaja na kutazama mikataba-erevu.

## Mbinu bora {#best-practices}

- **Tumia majina wazi, yenye matoleo** kama `v1.myapp.eth` ili kufanya masasisho ya mkataba kuwa wazi
- **Weka rekodi za nyuma** ili kuunganisha mikataba na majina ya ENS kwa mwonekano katika programu kama vile mikoba na wachunguzi wa mnyororo wa bloku.
- **Fuatilia kwa karibu tarehe za mwisho wa matumizi** ikiwa unataka kuzuia mabadiliko ya umiliki kwa bahati mbaya
- **Thibitisha chanzo cha mkataba** ili watumiaji waweze kuamini kuwa mkataba uliotajwa unafanya kazi kama inavyotarajiwa

## Hatari {#risks}

Kutaja mikataba-erevu kunatoa manufaa makubwa kwa watumiaji wa Ethereum, hata hivyo, wamiliki wa vikoa vya ENS lazima wawe macho kuhusiana na usimamizi wao. Hatari zinazojulikana ni pamoja na:

- **Kumalizika muda**: Kama vile majina ya DNS, usajili wa majina ya ENS una muda maalum. Kwa hivyo ni muhimu wamiliki wafuatilie tarehe za kumalizika kwa vikoa vyao na kuzifanya upya mapema kabla ya kumalizika. Programu ya ENS na Enscribe zote mbili hutoa viashiria vya kuona kwa wamiliki wa vikoa wakati tarehe ya kumalizika inapokaribia.
- **Mabadiliko katika umiliki**: Rekodi za ENS zinawakilishwa kama NFTs kwenye Ethereum, ambapo mmiliki wa kikoa maalum cha `.eth` anamiliki NFT inayohusiana. Kwa hivyo, ikiwa akaunti tofauti itachukua umiliki wa NFT hii, mmiliki mpya anaweza kurekebisha rekodi zozote za ENS atakavyoona inafaa.

Ili kupunguza hatari kama hizo, akaunti ya mmiliki wa vikoa vya kiwango cha pili (2LD) vya `.eth` inapaswa kulindwa kupitia mkoba wa saini-nyingi huku vikoa vidogo vikiundwa ili kusimamia utajaji wa mikataba. Kwa njia hiyo, katika tukio la mabadiliko yoyote ya umiliki kwa bahati mbaya au yenye nia mbaya katika kiwango cha kikoa kidogo, yanaweza kubatilishwa na mmiliki wa 2LD.

## Mustakabali wa utajaji wa mikataba {#future}

Utajaji wa mikataba unakuwa mbinu bora kwa ajili ya uundaji wa mfumo mtawanyo wa kimamlaka, sawa na jinsi majina ya vikoa yalivyochukua nafasi ya anwani za IP kwenye wavuti. Kadiri miundombinu zaidi kama vile mikoba, wachunguzi na dashibodi zinavyojumuisha usuluhishi wa ENS kwa mikataba, mikataba iliyotajwa itaboresha usalama na kupunguza makosa katika mfumo mzima wa ikolojia.

Kwa kufanya mikataba-erevu iwe rahisi kutambua na kuelewa, utajaji husaidia kuziba pengo kati ya watumiaji na programu kwenye Ethereum, kuboresha usalama na UX kwa watumiaji.

## Masomo zaidi {#further-reading}

- [Kutaja Mikataba-erevu kwa kutumia ENS](https://docs.ens.domains/web/naming-contracts/)
- [Kutaja Mikataba-erevu kwa kutumia Enscribe](https://www.enscribe.xyz/docs).
