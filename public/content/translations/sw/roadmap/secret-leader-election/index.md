---
title: Uchaguzi wa siri wa viongozi
description: Maelezo ya jinsi uchaguzi wa kiongozi wa siri unavyoweza kusaidia kuwalinda Wathibitishaji kutokana na mashambulizi
lang: sw
summaryPoints:
  - Anwani ya IP ya wapendekezaji wa bloku inaweza kujulikana mapema, na kuwafanya wawe katika hatari ya mashambulizi
  - Uchaguzi wa kiongozi wa siri huficha utambulisho wa Wathibitishaji ili wasiweze kujulikana mapema
  - Nyongeza ya wazo hili ni kufanya uteuzi wa Mthibitishaji uwe wa nasibu katika kila yanayopangwa.
---

# Uchaguzi wa kiongozi wa siri {#single-secret-leader-election}

Katika utaratibu wa makubaliano unaotegemea [uthibitisho-wa-hisa](/developers/docs/consensus-mechanisms/pos) wa leo, orodha ya wapendekezaji wa bloku wanaofuata iko wazi na inawezekana kupanga anwani zao za IP. Hii inamaanisha kuwa washambulizi wanaweza kutambua ni Wathibitishaji gani wanaotarajiwa kupendekeza bloku na kuwalenga kwa shambulio la kukatiza huduma (DOS) linalowaacha wasiweze kupendekeza bloku yao kwa wakati.

Hii inaweza kuunda fursa kwa mshambulizi kupata faida. Kwa mfano, mpendekezaji wa bloku aliyechaguliwa kwa ajili ya yanayopangwa `n+1` anaweza kumshambulia kwa DOS mpendekezaji katika yanayopangwa `n` ili akose fursa yake ya kupendekeza bloku. Hii ingemruhusu mpendekezaji wa bloku mshambulizi kutoa MEV ya yanayopangwa yote mawili, au kunyakua miamala yote ambayo ingepaswa kugawanywa katika bloku mbili na badala yake kuijumuisha yote katika moja, na kupata ada zote zinazohusiana. Hii ina uwezekano wa kuathiri Wathibitishaji wa nyumbani zaidi ya Wathibitishaji wa taasisi za kisasa wanaoweza kutumia mbinu za hali ya juu zaidi kujilinda dhidi ya mashambulizi ya DOS, na kwa hivyo inaweza kuwa nguvu ya kuweka mamlaka kati.

Kuna suluhu kadhaa za tatizo hili. Moja wapo ni [Teknolojia ya Mthibitishaji Iliyosambazwa](https://github.com/ethereum/distributed-validator-specs) ambayo inalenga kueneza kazi mbalimbali zinazohusiana na kuendesha Mthibitishaji kwenye mashine nyingi, na upungufu, ili iwe vigumu zaidi kwa mshambulizi kuzuia bloku kupendekezwa katika yanayopangwa maalum. Hata hivyo, suluhu thabiti zaidi ni **Uchaguzi Mmoja wa Kiongozi wa Siri (SSLE)**.

## Uchaguzi mmoja wa kiongozi wa siri {#secret-leader-election}

Katika SSLE, kriptografia ya kijanja hutumiwa kuhakikisha kuwa ni Mthibitishaji aliyechaguliwa pekee ndiye anayejua kuwa amechaguliwa. Hii hufanya kazi kwa kuwa na kila Mthibitishaji anayewasilisha ahadi kwa siri wanayoshiriki wote. Ahadi hizo huchanganywa na kusanidiwa upya ili mtu yeyote asiweze kuhusisha ahadi na Wathibitishaji lakini kila Mthibitishaji anajua ni ahadi ipi ni yake. Kisha, ahadi moja huchaguliwa kwa nasibu. Ikiwa Mthibitishaji atagundua kwamba ahadi yake imechaguliwa, anajua kuwa ni zamu yake kupendekeza bloku.

Utekelezaji mkuu wa wazo hili unaitwa [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Ambayo hufanya kazi kama ifuatavyo:

1. Wathibitishaji hujitolea kwa siri ya pamoja. Mpango wa ahadi umeundwa hivi kwamba unaweza kufungamanishwa na utambulisho wa Mthibitishaji lakini pia kufanywa kuwa wa nasibu ili mtu wa tatu asiweze kubadili mchakato wa uhusiano huo na kuhusisha ahadi maalum na Mthibitishaji maalum.
2. Mwanzoni mwa epoki, seti ya nasibu ya Wathibitishaji huchaguliwa kuchukua sampuli za ahadi kutoka kwa Wathibitishaji 16,384, kwa kutumia RANDAO.
3. Kwa yanayopangwa 8182 yajayo (siku 1), wapendekezaji wa bloku huchanganya na kufanya nasibu sehemu ndogo ya ahadi kwa kutumia entropi yao ya kibinafsi.
4. Baada ya uchanganyaji kukamilika, RANDAO hutumika kuunda orodha iliyopangwa ya ahadi. Orodha hii inahusishwa na yanayopangwa ya Ethereum.
5. Wathibitishaji wanaona kuwa ahadi yao imeambatanishwa na yanayopangwa maalum, na yanayopangwa hilo linapofika wanapendekeza bloku.
6. Rudia hatua hizi ili ugawaji wa ahadi kwa yanayopangwa daima uwe mbele sana ya yanayopangwa la sasa.

Hii huwazuia washambulizi kujua mapema ni Mthibitishaji gani maalum atapendekeza bloku inayofuata, na kuzuia uwezekano wa mashambulizi ya DOS.

## Uchaguzi wa kiongozi usio mmoja wa siri (SnSLE) {#secret-non-single-leader-election}

Pia kuna pendekezo tofauti linalolenga kuunda hali ambapo kila Mthibitishaji ana nafasi ya nasibu ya kupendekeza bloku katika kila yanayopangwa, sawa na jinsi pendekezo la bloku lilivyoamuliwa chini ya uthibitisho-wa-kazi, inayojulikana kama **uchaguzi wa kiongozi usio mmoja wa siri (SnSLE)**. Njia moja rahisi ya kufanya hivi ni kutumia chaguo la kukokotoa la RANDAO linalotumiwa kuchagua Wathibitishaji kwa nasibu katika itifaki ya leo. Wazo la RANDAO ni kwamba nambari ya nasibu ya kutosha inatolewa kwa kuchanganya hashi zilizowasilishwa na Wathibitishaji wengi huru. Katika SnSLE, hashi hizi zinaweza kutumika kumchagua mpendekezaji wa bloku anayefuata, kwa mfano kwa kuchagua hashi yenye thamani ya chini zaidi. Masafa ya hashi halali yanaweza kubanwa ili kurekebisha uwezekano wa Wathibitishaji binafsi kuchaguliwa katika kila yanayopangwa. Kwa kudai kuwa hashi lazima iwe chini ya `2^256 * 5 / N` ambapo `N` = idadi ya Wathibitishaji wanaofanya kazi, nafasi ya Mthibitishaji yeyote binafsi kuchaguliwa katika kila yanayopangwa itakuwa `5/N`. Katika mfano huu, kutakuwa na uwezekano wa 99.3% wa angalau mpendekezaji mmoja kutoa hashi halali katika kila yanayopangwa.

## Maendeleo ya sasa {#current-progress}

SSLE na SnSLE zote ziko katika awamu ya utafiti. Bado hakuna vipimo vilivyokamilishwa kwa wazo lolote kati ya hayo. SSLE na SnSLE ni mapendekezo yanayoshindana ambayo yote hayawezi kutekelezwa. Kabla ya kuzinduliwa, yanahitaji utafiti na maendeleo zaidi, uundaji wa mfano, na utekelezaji kwenye testnet za umma.

## Masomo zaidi {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)
