---
title: Uchaguzi wa kiongozi wa siri
description: Maelezo ya jinsi uchaguzi wa kiongozi wa siri unavyoweza kusaidia kulinda wathibitishaji dhidi ya mashambulizi
lang: sw
summaryPoints:
  - Anwani ya IP ya wapendekezaji wa bloku inaweza kujulikana mapema, na kuwafanya wawe katika hatari ya kushambuliwa
  - Uchaguzi wa kiongozi wa siri huficha utambulisho wa wathibitishaji ili wasijulikane mapema
  - Uboreshaji wa wazo hili ni kufanya uteuzi wa mthibitishaji uwe wa kubahatisha katika kila sloti.
---

Katika utaratibu wa makubaliano wa leo unaotegemea [Uthibitisho wa Dau (PoS)](/developers/docs/consensus-mechanisms/pos), orodha ya wapendekezaji wa bloku wanaofuata ni ya umma na inawezekana kupata anwani zao za IP. Hii inamaanisha kuwa washambuliaji wanaweza kutambua ni wathibitishaji gani wanatarajiwa kupendekeza kitalu na kuwalenga kwa shambulio la kunyima huduma (DOS) ambalo linawafanya washindwe kupendekeza kitalu chao kwa wakati.

Hii inaweza kuunda fursa kwa mshambuliaji kupata faida. Kwa mfano mpendekezaji wa bloku aliyechaguliwa kwa sloti `n+1` anaweza kumfanyia DOS mpendekezaji katika sloti `n` ili akose fursa yake ya kupendekeza kitalu. Hii itamruhusu mpendekezaji wa bloku anayeshambulia kutoa MEV ya sloti zote mbili, au kuchukua miamala yote ambayo ilipaswa kugawanywa katika vitalu viwili na badala yake kuiweka yote katika kimoja, na kupata ada zote zinazohusiana. Hili lina uwezekano wa kuathiri wathibitishaji wa nyumbani zaidi kuliko wathibitishaji wa kitaasisi wenye uzoefu ambao wanaweza kutumia mbinu za hali ya juu zaidi kujilinda dhidi ya mashambulizi ya DOS, na kwa hivyo inaweza kuwa nguvu ya kuweka udhibiti kati.

Kuna suluhisho kadhaa kwa tatizo hili. Moja ni [teknolojia ya kithibitishaji kilichosambazwa (DVT)](https://github.com/ethereum/distributed-validator-specs) ambayo inalenga kusambaza kazi mbalimbali zinazohusiana na kuendesha mthibitishaji kwenye mashine nyingi, kwa urudufu, ili iwe vigumu sana kwa mshambuliaji kuzuia kitalu kupendekezwa katika sloti fulani. Hata hivyo, suluhisho thabiti zaidi ni **Uchaguzi wa Kiongozi Mmoja wa Siri (Single Secret Leader Election - SSLE)**.

## Uchaguzi wa kiongozi mmoja wa siri {#secret-leader-election}

Katika SSLE, kriptografia mahiri inatumika kuhakikisha kuwa mthibitishaji aliyechaguliwa pekee ndiye anayejua kuwa amechaguliwa. Hii inafanya kazi kwa kuwa na kila mthibitishaji kuwasilisha ufungamanisho kwa siri wanayoshiriki wote. Mafungamanisho yanachanganywa na kusanidiwa upya ili hakuna mtu anayeweza kuoanisha mafungamanisho kwa wathibitishaji lakini kila mthibitishaji anajua ni ufungamanisho upi ni wake. Kisha, ufungamanisho mmoja unachaguliwa kwa kubahatisha. Ikiwa mthibitishaji atagundua kuwa ufungamanisho wake ulichaguliwa, anajua ni zamu yake kupendekeza kitalu.

Utekelezaji unaoongoza wa wazo hili unaitwa [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Ambao unafanya kazi kama ifuatavyo:

1. Wathibitishaji hufanya ufungamanisho kwa siri ya pamoja. Mpango wa ufungamanisho umeundwa kwa njia ambayo unaweza kufungamanishwa na utambulisho wa mthibitishaji lakini pia kubahatishwa ili hakuna mtu wa tatu anayeweza kubadili mchakato wa ufungamanisho na kuunganisha ufungamanisho maalum kwa mthibitishaji maalum.
2. Mwanzoni mwa kipindi, kundi la kubahatisha la wathibitishaji linachaguliwa ili kuchukua sampuli za mafungamanisho kutoka kwa wathibitishaji 16,384, kwa kutumia RANDAO.
3. Kwa sloti 8182 zinazofuata (siku 1), wapendekezaji wa bloku huchanganya na kubahatisha sehemu ya mafungamanisho kwa kutumia Entropi yao wenyewe ya kibinafsi.
4. Baada ya kuchanganya kukamilika, RANDAO inatumika kuunda orodha iliyopangwa ya mafungamanisho. Orodha hii inaoanishwa kwenye sloti za Ethereum.
5. Wathibitishaji wanaona kuwa ufungamanisho wao umeambatanishwa na sloti maalum, na wakati sloti hiyo inapofika wanapendekeza kitalu.
6. Rudia hatua hizi ili upangaji wa mafungamanisho kwenye sloti uwe mbele sana ya sloti ya sasa kila wakati.

Hii inazuia washambuliaji kujua mapema ni mthibitishaji gani maalum atapendekeza kitalu kinachofuata, na kuzuia uwezo wa mashambulizi ya DOS.

## Uchaguzi wa kiongozi wa siri asiye mmoja (SnSLE) {#secret-non-single-leader-election}

Pia kuna pendekezo tofauti ambalo linalenga kuunda hali ambapo kila mthibitishaji ana nafasi ya kubahatisha ya kupendekeza kitalu katika kila sloti, sawa na jinsi pendekezo la kitalu lilivyoamuliwa chini ya Uthibitisho wa Kazi (PoW), linalojulikana kama **uchaguzi wa kiongozi wa siri asiye mmoja (secret non-single leader election - SnSLE)**. Njia moja rahisi ya kufanya hivi ni kutumia utendakazi wa RANDAO unaotumika kuchagua wathibitishaji kwa kubahatisha katika itifaki ya leo. Wazo la RANDAO ni kwamba nambari ya kubahatisha ya kutosha inazalishwa kwa kuchanganya heshi zilizowasilishwa na wathibitishaji wengi wanaojitegemea. Katika SnSLE, heshi hizi zinaweza kutumika kuchagua mpendekezaji wa bloku anayefuata, kwa mfano kwa kuchagua heshi yenye thamani ya chini zaidi. Masafa ya heshi halali yanaweza kuzuiwa ili kurekebisha uwezekano wa wathibitishaji binafsi kuchaguliwa katika kila sloti. Kwa kusisitiza kwamba heshi lazima iwe chini ya `2^256 * 5 / N` ambapo `N` = idadi ya wathibitishaji wanaofanya kazi, nafasi ya mthibitishaji yeyote binafsi kuchaguliwa katika kila sloti itakuwa `5/N`. Katika mfano huu, kungekuwa na nafasi ya 99.3% ya angalau mpendekezaji mmoja kuzalisha heshi halali katika kila sloti.

## Maendeleo ya sasa {#current-progress}

SSLE na SnSLE zote ziko katika awamu ya utafiti. Hakuna vipimo vilivyokamilishwa kwa wazo lolote bado. SSLE na SnSLE ni mapendekezo yanayoshindana ambayo hayawezi kutekelezwa yote mawili. Kabla ya kutolewa yanahitaji utafiti na maendeleo zaidi, uundaji wa mifano, na utekelezaji kwenye mitandao ya majaribio ya umma.

## Kusoma zaidi {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)