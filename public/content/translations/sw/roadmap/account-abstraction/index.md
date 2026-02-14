---
title: Ubora wa akaunti
description: Muhtasari wa mipango ya Ethereum ya kufanya akaunti za watumiaji kuwa rahisi na salama zaidi
lang: sw
summaryPoints:
  - Uondoaji wa akaunti hurahisisha zaidi kuunda pochi za mikataba mahiri
  - Pochi za mikataba mahiri hurahisisha zaidi kudhibiti ufikiaji wa akaunti za Ethereum
  - Vifunguo vilivyopotea na vilivyofichuliwa vinaweza kurejeshwa kwa kutumia nakala za akiba nyingi
---

# Uondoaji wa akaunti {#account-abstraction}

Watumiaji wengi waliopo huingiliana na Ethereum kwa kutumia **[akaunti zinazomilikiwa na nje (EOAs)](/glossary/#eoa)**. Hii inapunguza jinsi watumiaji wanaweza kuingiliana na Ethereum. Kwa mfano, inafanya kuwa vigumu kufanya miamala na inahitaji watumiaji kuweka salio la ETH kila wakati ili kulipa ada za miamala.

Uondoaji wa akaunti ni njia ya kutatua matatizo haya kwa kuwaruhusu watumiaji kupanga kwa urahisi usalama zaidi na hali bora ya utumiaji kwenye akaunti zao. Hii inaweza kutokea kwa [kuboresha EOAs](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) ili ziweze kudhibitiwa na mikataba-erevu. Pia kuna njia nyingine inayohusisha kuongeza [mfumo wa pili, tofauti wa muamala](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) ili kufanya kazi sambamba na itifaki iliyopo. Bila kujali njia, matokeo ni ufikiaji wa Ethereum kupitia pochi za mikataba mahiri, ambazo zinatumika kama sehemu ya itifaki iliyopo au kupitia mtandao wa shughuli za ziada.

Pochi za mikataba mahiri hufungua faida nyingi kwa mtumiaji, zikiwemo:

- fafanua sheria zako za usalama zinazonyumbulika
- okoa akaunti yako ukipoteza funguo
- shiriki usalama wa akaunti yako kwenye vifaa au watu binafsi unaoaminika
- kulipa gesi ya mtu mwingine, au mtu mwingine alipe yako
- shughuli za kundi pamoja (k.m., kuidhinisha na kutekeleza ubadilishanaji mara moja)
- fursa zaidi kwa dapps na watengenezaji wa pochi kuvumbua matumizi ya watumiaji

Manufaa haya hayaungwi mkono moja kwa moja leo kwa sababu ni akaunti zinazomilikiwa na nje ([EOAs](/glossary/#eoa)) pekee ndizo zinaweza kuanzisha miamala. EOAs ni jozi muhimu za umma na za kibinafsi. Wanafanya kazi kama hii:

- ikiwa una ufunguo binafsi unaweza kufanya _chochote_ kulingana na sheria za mashine halisi ya ethereum (EVM)
- ikiwa huna ufunguo binafsi, huwezi kufanya _chochote_.

Ukipoteza funguo zako haziwezi kurejeshwa, na funguo zilizoibiwa huwapa wezi ufikiaji wa papo hapo wa pesa zote kwenye akaunti.

Mikoba ya mikataba mahiri ni suluhisho la matatizo haya, lakini leo ni vigumu kupanga kwa sababu mwishowe, mantiki yoyote wanayotekeleza inapaswa kutafsiriwa katika seti ya shughuli za EOA kabla ya kusindika na Ethereum. Uondoaji wa akaunti huwezesha mikataba mahiri kuanzisha shughuli yenyewe, ili mantiki yoyote ambayo mtumiaji angependa kutekeleza iweze kuwekwa kwenye mkoba mahiri wa mkataba yenyewe na kutekelezwa kwenye Ethereum.

Hatimaye, uondoaji wa akaunti huboresha usaidizi wa pochi za mikataba mahiri, na kuzifanya ziwe rahisi kuunda na salama kutumia. Kwa uondoaji wa akaunti, watumiaji wanaweza kufurahia manufaa yote ya Ethereum bila kuhitaji kuelewa teknolojia ya msingi.

## Zaidi ya maneno ya mbegu {#beyond-seed-phrases}

Akaunti za leo zinalindwa kwa kutumia funguo za faragha zinazokokotolewa kutoka kwa vifungu vya maneno. Mtu yeyote aliye na idhini ya kufikia kifungu cha mbegu anaweza kugundua kwa urahisi ufunguo wa faragha unaolinda akaunti na kupata ufikiaji wa mali yote inayolinda. Ikiwa ufunguo wa faragha na maneno ya mbegu yamepotea, vipengee haviwezi kufikiwa kabisa. Kupata misemo hii ya mbegu ni jambo gumu, hata kwa watumiaji waliobobea, na hadaa ya maneno ya mbegu ni mojawapo ya ulaghai unaojulikana sana.

Uondoaji wa akaunti hutatua hili kwa kutumia mkataba mahiri kushikilia mali na kuidhinisha miamala. Mikataba mahiri inaweza kujumuisha mantiki maalum iliyoundwa kwa usalama wa hali ya juu na utumiaji. Watumiaji bado wanatumia funguo za faragha kudhibiti ufikiaji, lakini kwa hatua za usalama zilizoimarishwa.

Kwa mfano, funguo za nakala za akiba zinaweza kuongezwa kwenye pochi, na hivyo kuwezesha uingizwaji wa ufunguo ikiwa ufunguo msingi umeingiliwa. Kila ufunguo unaweza kulindwa kwa njia tofauti au kusambazwa kati ya watu wanaoaminika, na hivyo kuongeza usalama kwa kiasi kikubwa. Sheria za ziada za pochi zinaweza kupunguza uharibifu kutokana na kufichuliwa kwa ufunguo, kama vile kuhitaji saini nyingi kwa miamala ya thamani ya juu au kuzuia miamala kwa anwani zinazoaminika.

## Uzoefu bora wa mtumiaji {#better-user-experience}

Uondoaji wa akaunti huboresha sana matumizi na usalama kwa kutumia pochi za mikataba mahiri katika kiwango cha itifaki. Wasanifu programu wanaweza kuvumbua kwa uhuru, na kuboresha uunganishaji wa shughuli kwa kasi na ufanisi. Ubadilishanaji rahisi unaweza kuwa shughuli za mbofyo mmoja, na kuboresha kwa kiasi kikubwa urahisi wa utumiaji.

Usimamizi wa gharama za muamala unaboresha sana. Programu zinaweza kulipa ada za gesi za watumiaji au kuruhusu malipo katika tokeni tofauti na ETH, hivyo basi kuondoa hitaji la kudumisha salio la ETH.

## Je, uondoaji wa akaunti utatekelezwa vipi? {#how-will-aa-be-implemented}

Kwa sasa, pochi za mikataba mahiri ni changamoto kutekeleza kwani zinategemea miamala changamano ya kufunga msimbo. Ethereum inaweza kubadilisha hili kwa kuruhusu mikataba mahiri ianzishe shughuli moja kwa moja, kupachika mantiki katika mikataba mahiri ya Ethereum badala ya kutegemea mawakala wa nje.

### EIP-4337: Uondoaji wa akaunti bila mabadiliko ya itifaki

EIP-4337 huwezesha usaidizi wa pochi ya mkataba mahiri bila kurekebisha itifaki ya msingi ya Ethereum. Inatambulisha vipengee vya `UserOperation` vinavyokusanywa katika mafungu ya miamala na wathibitishaji, na kurahisisha uundaji wa mkoba. Mkataba wa EIP-4337 EntryPoint ulitumwa kwa Ethereum Mainnet tarehe 1 Machi 2023 na umewezesha uundaji wa pochi mahiri zaidi ya milioni 26 na Uendeshaji wa Watumiaji milioni 170.

## Maendeleo ya sasa {#current-progress}

Kama sehemu ya uboreshaji wa Pectra ya Ethereum, EIP-7702 imepangwa Mei 7, 2025. EIP-4337 imekubaliwa kwa wingi, [kukiwa na zaidi ya akaunti-erevu milioni 26 zimetumwa na zaidi ya `UserOperation` milioni 170 zimechakatwa](https://www.bundlebear.com/erc4337-overview/all).

## Masomo zaidi {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [Nyaraka za EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Nyaraka za EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Dashibodi ya ukubalifu wa ERC-4337](https://www.bundlebear.com/erc4337-overview/all)
- ["Safari ya Kuelekea Uondoaji wa Akaunti" ya Vitalik](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Blogu ya Vitalik kuhusu mikoba ya urejeshaji wa kijamii](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Uondoaji Bora wa Akaunti](https://github.com/4337Mafia/awesome-account-abstraction)
