---
title: Anzisha nodi yako mwenyewe ya Ethereum
description: Utangulizi wa jumla wa kuendesha mfano wako wa mteja wa Ethereum.
lang: sw
sidebarDepth: 2
---

Kuendesha nodi yako hukupa faida mbalimbali, hufungua uwezekano mpya, na husaidia mfumo wa ikolojia. Ukurasa huu utakusaidia kuanzisha nodi yako na kushiriki katika kuthibitisha miamala ya Ethereum.

Kumbuka kuwa baada ya [Muungano](/roadmap/merge), wateja wawili wanahitajika kuendesha nodi ya Ethereum; mteja wa **safu ya utekelezaji (EL)** na mteja wa **safu ya makubaliano (CL)**. Ukurasa huu utaonesha jinsi ya kusakinisha, kusanidi na kuunganisha wateja hawa wawili ili kuendesha nodi ya Ethereum.

## Mahitaji ya awali {#prerequisites}

Unatakiwa kuelewa nodi ya Ethereum ni nini na kwanini utatakiwa kuendesha mteja. Hili limeelezwa katika [Nodi na wateja](/developers/docs/nodes-and-clients/).

Kama wewe ni mgeni katika mada ya kuendesha nodi, au unatafuta njia isiyo ya kiufundi sana, tunapendekeza kwanza uangalie utangulizi wetu rahisi kwa mtumiaji kuhusu [kuendesha nodi ya Ethereum](/run-a-node).

## Kuchagua mbinu {#choosing-approach}

Hatua ya kwanza kwenye kuendesha nodi yako ni kuchagua mbinu yako. Kulingana na mahitaji na uwezekano mbalimbali, unatakiwa uchague utekelezaji wa mteja (wa wateja wa utekelezaji na makubaliano), mazingira (vifaa, mfumo), na vigezo vya mipangilio ya mteja.

Ukurasa huu utakusaidia katika kufanya maamuzi na kukusaidia kupata njia inayofaa zaidi ya kuendesha tukio lako la Ethereum.

Ili kuchagua kutoka kwa utekelezaji wa wateja, angalia wote [wateja wa utekelezaji](/developers/docs/nodes-and-clients/#execution-clients) walio tayari kwa Mtandao Mkuu, [wateja wa makubaliano](/developers/docs/nodes-and-clients/#consensus-clients) na ujifunze kuhusu [utofauti wa wateja](/developers/docs/nodes-and-clients/client-diversity).

Amua ikiwa utaendesha programu kwenye [maunzi yako mwenyewe au kwenye wingu](#local-vs-cloud), ukizingatia [mahitaji](#requirements) ya wateja.

Baada ya kuandaa mazingira, sakinisha wateja waliochaguliwa ama kwa [kiolesura rahisi kwa wanaoanza](#automatized-setup) au [kwa mikono](#manual-setup) ukitumia terminal yenye chaguo za hali ya juu.

Wakati nodi inaendeshwa na kusawazisha, uko tayari [kuitumia](#using-the-node), lakini hakikisha unafuatilia [utunzaji](#operating-the-node) wake.

![Usanidi wa mteja](./diagram.png)

### Mazingira na maunzi {#environment-and-hardware}

#### Kwenye kifaa au kwenye wingu {#local-vs-cloud}

Wateja wa Ethereum wanaweza kuendeshwa kwenye kompyuta za kawaida za watumiaji na hawahitaji vifaa maalumu, kama mashine za kuchimba madini mfano. Kwa hivyo, una machaguo mbalimbali ya kuendesha nodi kulingana na mahitaji yako.
Ili kurahisisha, tufikirie kuhusu kuendesha nodi kwenye kifaa chako binafsi na kwenye seva ya mtandaoni:

- Wingu
  - Watoa huduma hutoa muda mrefu wa upatikanaji wa seva na anwani za IP zisizobadilika
  - Kupata seva maalumu au seva ya mtandaoni inaweza kuwa rahisi zaidi kuliko kujenga yako
  - Hasara ni kutaabika kwa mtu wa tatu - mtoa huduma wa seva
  - Kwa sababu ya kiasi kinachohitajika cha nodi nzima, bei ya seva iliyokodishwa inaweza ikawa kubwa
- Miliki vifaa
  - Njia ya kujiamini kidogo na uhuru zaidi
  - Uwekezaji wa mara moja
  - Chaguo la kununua mashine zilizosanifiwa tayari
  - Unatakiwa uandae, utunze, na kutatua matatizo ya mashine na mtandao

Machaguo yote mawili yana faida tofauti zilizoelezwa kwa ufupi hapo juu. Kama unatafuta suluhisho la wingu, pamoja na watoa huduma wa kompyuta za wingu, kuna pia huduma zinazolenga kuendesha nodi. Angalia [nodi kama huduma](/developers/docs/nodes-and-clients/nodes-as-a-service/) kwa chaguo zaidi kuhusu nodi zilizopangishwa.

#### Vifaa {#hardware}

Hata hivyo, mtandao usioweza kudhibitiwa na ulioenea hautakiwi kutegemea watoa huduma wa wingu. Badala yake, kuendesha nodi yako kwenye vifaa vyako binafsi ni bora zaidi kwa mfumo wa ikolojia. [Makadirio](https://www.ethernodes.org/networkType/cl/Hosting) yanaonyesha sehemu kubwa ya nodi huendeshwa kwenye wingu, jambo ambalo linaweza kuwa chanzo kimoja cha hitilafu.

Wateja wa Ethereum wanaweza kuendeshwa kwenye kompyuta, kompyuta ya mkononi, seva au hata kompyuta ya bodi moja. Ingawa inawezekana kuendesha wateja kwenye kompyuta yako binafsi, kuwa na mashine maalumu kwa ajili ya nodi yako tu inaweza kuongeza utendaji na usalama wake kwa kiasi kikubwa huku ikipunguza athari kwenye kompyuta yako kuu.

Kutumia vifaa vyako inaweza kuwa rahisi zaidi. Kuna machaguo mengi rahisi na pia kuna machaguo ya juu kwa ajili ya watu wa kiufundi zaidi. Hivyo basi tuangalie mahitaji na njia za kuendesha wateja wa Ethereum kwenye mashine yako.

#### Mahitaji {#requirements}

Mahitaji ya vifaa hutofautiana kulingana na mteja lakini kwa kawaida hayako juu sana kwani nodi zinahitaji tu kuwa zimesawazishwa. Usiichanganye na kuchimba madini, ambayo inahitaji nguvu kubwa zaidi ya kompyuta. Muda wa kusawazisha na utendaji huboreshwa zaidi na vifaa vyenye nguvu zaidi.

Kabla ya kusakinisha mteja yeyote, tafadhali hakikisha kompyuta yako ina uwezo wa kutosha kuiendesha. Unaweza kupata mahitaji ya chini na yaliyopendekezwa hapa chini.

Kizuizi kikubwa cha kifaa chako mara nyingi ni nafasi ya diski. Kusawazisha blockchain ya Ethereum kunahitaji input/output ya kiwango cha juu na nafasi kubwa ya hifadhi. Ni bora kuwa na **hifadhi ya hali dhabiti (SSD)** yenye mamia ya GB za nafasi ya ziada hata baada ya usawazishaji.

Ukubwa wa hifadhidata na kasi ya usawazishaji wa awali hutegemea mteja aliyechaguliwa, usanidi wake na [mkakati wa kusawazisha](/developers/docs/nodes-and-clients/#sync-modes).

Pia hakikisha muunganisho wako wa intaneti hauna [kikomo cha kipimo data](https://wikipedia.org/wiki/Data_cap). Inashauriwa kutumia muunganisho usio na kikomo kwa kuwa usawazishaji wa awali na data inayotumwa kwenye mtandao inaweza kuzidi kikomo chako.

##### Mfumo wa uendeshaji

Wateja wote wanaunga mkono mifumo mikuu ya uendeshaji - Linux MacOS, Windows. Hii inamaanisha kuwa unaweza kuendesha nodi kwenye kompyuta ya kawaida au mashine ya seva kwa kutumia mfumo wa uendeshaji (OS) unaokufaa sana. Hakikisha mfumo wako wa uendeshaji umesasishwa ili kuepuka matatizo yanayoweza kutokea na udhaifu wa kiusalama.

##### Vigezo vya chini

- CPU yenye angalau cores 2 na zaidi
- RAM yenye GB 8
- SSD yenye 2TB
- Kipimo data cha angalau 10 MBit/s

##### Maelezo yaliyopendekezwa

- CPU ya haraka yenye angalau core 4 na zaidi
- RAM yenye GB 16 na zaidi
- SSD ya haraka yenye 2 TB na zaidi
- Kipimo data cha 25+ MBit/s

Hali ya usawazishaji na mteja utakayochagua itaathiri mahitaji ya nafasi, lakini tumekadiria nafasi ya diski utakayohitaji kwa kila mteja hapa chini.

| Mteja      | Ukubwa wa diski (usawazishaji wa haraka) | Ukubwa wa diski (kumbukumbu kamili) |
| ---------- | ----------------------------------------------------------- | ------------------------------------------------------ |
| Besu       | 800GB+                                                      | 12TB+                                                  |
| Erigon     | N/A                                                         | 2.5TB+                                 |
| Geth       | 500GB+                                                      | 12TB+                                                  |
| Nethermind | 500GB+                                                      | 12TB+                                                  |
| Reth       | N/A                                                         | 2.2TB+                                 |

- Kumbuka: Erigon na Reth hawatoi usawazishaji wa haraka, lakini Full Prunning inawezekana (~2TB kwa Erigon, ~1.2TB kwa Reth)

Kwa wateja wa makubaliano, hitaji la nafasi pia linategemea utekelezaji wa mteja na vipengele vilivyowezeshwa (k.m., kikataji cha mthibitishaji) lakini kwa ujumla hesabia GB 200 nyingine inayohitajika kwa data ya beacon. Kwa namba kubwa ya wahalalishaji, kipimo data kinakuwa kikubwa pia. Unaweza kupata [maelezo kuhusu mahitaji ya mteja wa makubaliano katika uchambuzi huu](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc).

#### Suluhisho za chomeka-na-cheza {#plug-and-play}

Chaguo rahisi la kuendesha nodi kwa vifaa vyako binafsi ni kutumia masanduku ya plug-and-play. Mashine zilizosanifiwa tayari kutoka kwa wauzaji hutoa uzoefu rahisi zaidi: oda, unganisha, endesha. Kila kitu kimesanifiwa tayari na kinaendeshwa kiotomatiki kwa kutumia mwongozo wa kirahisi na dashibodi ya kufuatilia na kudhibiti programu.

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### Ethereum kwenye kompyuta ya bodi moja {#ethereum-on-a-single-board-computer}

Njia rahisi na ya bei nafuu ya kuendesha nodi ya Ethereum ni kutumia kompyuta yenye bodi moja, hata yenye usanifu wa ARM kama Raspberry Pi. [Ethereum kwenye ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) hutoa picha rahisi kuendesha za wateja wengi wa utekelezaji na makubaliano kwa ajili ya Raspberry Pi na bodi zingine za ARM.

Vifaa vidogo, vya bei nafuu na vyenye ufanisi kama hivi ni bora kwa kuendesha modi nyumbani lakini kumbuka utendaji wao mdogo.

## Kuanzisha nodi {#spinning-up-node}

Usanidi halisi wa mteja unaweza kufanywa ama kwa kutumia zana za kuanzisha kiotomatiki au kwa mikono, ukisanidi programu ya mteja moja kwa moja.

Kwa watumiaji wasio wa kitaalamu sana, njia inayopendekezwa ni kutumia kizindua, programu inayokuongoza kwenye usanikishaji na kuotomatisha mchakato wa usanidi wa mteja. Hata hivyo, kama una uzoefu wowote wa kutumia terminal, hatua za usanidi kwa mikono zinapaswa kuwa rahisi kufuatwa.

### Usanidi wa kuongozwa {#automatized-setup}

Miradi mbalimbali rahisi kwa watumiaji inalenga kuboresha uzoefu wa kuanzisha mteja. Zana hizi za kuanzisha zinatoa usakinishaji na usanidi wa mteja kiotomatiki, na baadhi hata hutoa kiolesura cha picha kwa ajili ya usanidi uliopangwa na ufuatiliaji wa wateja.

Hapa chini kuna miradi michache inayoweza kukusaidia kusakinisha na kudhibiti wateja kwa mibofyo michache:

- [DappNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) - DappNode haiji tu na mashine kutoka kwa mchuuzi. Programu, kizindua halisi cha nodi na kituo cha kudhibiti chenye vipengele vingi inaweza kutumika kwenye vifaa vyovyote.
- [EthPillar](https://www.coincashew.com/coins/overview-eth/ethpillar) - Njia ya haraka na rahisi zaidi ya kusanidi nodi kamili. Zana ya usanidi kwa mstari mmoja na TUI ya usimamizi wa nodi. Huru. Chanzo cha wazi. Bidhaa za umma za Ethereum zinazotolewa na wadau binafsi. Inasaidia ARM64 na AMD64.
- [eth-docker](https://eth-docker.net/) - Usanidi wa kiotomatiki unaotumia Docker unaolenga kusimamisha kwa urahisi na usalama, unahitaji maarifa ya msingi ya terminal na Docker, unapendekezwa kwa watumiaji walio na uzoefu zaidi.
- [Stereum](https://stereum-dev.github.io/ethereum-node-web-docs) - Kizinduzi cha kusakinisha wateja kwenye seva ya mbali kupitia muunganisho wa SSH na mwongozo wa usanidi wa GUI, kituo cha udhibiti, na vipengele vingine vingi.
- [NiceNode](https://www.nicenode.xyz/) - Kizinduzi chenye uzoefu rahisi wa mtumiaji ili kuendesha nodi kwenye kompyuta yako. Chagua tu wateja na uwanzishe kwa kubofya mara chache. Bado inaendelezwa.
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) - Zana ya usanidi wa nodi inayotengeneza kiotomatiki usanidi wa Docker kwa kutumia kichawi cha CLI. Imeandikwa kwa Go na Nethermind.

### Usanidi wa wateja kwa mikono {#manual-setup}

Chaguo jingine ni kupakua, kuthibitisha, na kusanidi programu ya mteja kwa mikono. Hata kama baadhi ya wateja wanatoa kiolesura cha picha, usanidi wa mikono bado unahitaji ujuzi wa msingi na terminal lakini unatoa wepesi mwingi zaidi.

Kama ilivyoelezwa hapo awali, kusanidi nodi yako ya Ethereum kutahitaji kuendesha jozi ya wateja wa makubaliano na wateja wa utekelezaji. Baadhi ya wateja wanaweza kujumuisha mteja mwepesi wa aina nyingine na kusawazisha bila kuhitaji programu nyingine yoyote. Hata hivyo, uthibitisho kamili usio na uaminifu unahitaji utekelezaji wote miwili.

#### Kupata programu ya mteja {#getting-the-client}

Kwanza, unahitaji kupata programu unayopendelea ya [mteja wa utekelezaji](/developers/docs/nodes-and-clients/#execution-clients) na [mteja wa makubaliano](/developers/docs/nodes-and-clients/#consensus-clients).

Unaweza kupakua tu programu inayoweza kuendeshwa au kifurushi cha usakinishaji kinachofaa mfumo wako wa uendeshaji na usanifu. Thibitisha saini na jumla ya ukaguzi ya vifurushi vilivyopakuliwa kila wakati. Baadhi ya wateja pia hutoa hazina au picha za Docker kwa usakinishaji na masasisho rahisi. Wateja wote ni chanzo-wazi, kwa hivyo unaweza pia kuwajenga kutoka kwa chanzo. Hii ni njia ya hali ya juu zaidi, lakini katika hali zingine, inaweza kuhitajika.

Maagizo ya kusakinisha kila mteja yametolewa katika nyaraka zilizounganishwa kwenye orodha za wateja hapo juu.

Hizi ni kurasa za matoleo ya wateja ambapo unaweza kupata faili zao za binary zilizojengwa awali au maagizo ya usakinishaji:

##### Programu za utelekezji

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads/)
- [Nethermind](https://downloads.nethermind.io/)
- [Reth](https://reth.rs/installation/installation.html)

Inafaa pia kuzingatia kuwa utofauti wa wateja ni [suala kwenye safu ya utekelezaji](/developers/docs/nodes-and-clients/client-diversity/#execution-layer). Inapendekezwa wasomaji wafikirie kuendesha mteja wa utekelezaji wa wachache.

##### Programu ya makubaliano

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/run/getting-started/installation#build-from-source/) (Haitoi faili ya binary iliyojengwa awali, bali picha ya Docker tu au ya kujengwa kutoka kwa chanzo)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

[Utofauti wa wateja](/developers/docs/nodes-and-clients/client-diversity/) ni muhimu kwa nodi za makubaliano zinazoendesha wathibitishaji. Ikiwa wathibitishaji wengi wanaendesha utekelezaji wa mteja mmoja, usalama wa mtandao uko hatarini. Kwa hivyo inapendekezwa kufikiria kuchagua mteja wa wachache.

[Angalia matumizi ya hivi karibuni ya wateja wa mtandao](https://clientdiversity.org/) na jifunze zaidi kuhusu [utofauti wa wateja](/developers/docs/nodes-and-clients/client-diversity).

##### Kuthibitisha programu

Unapopakua programu kutoka kwenye intaneti, inapendekezwa kuthibitisha uadilifu wake. Hatua hii ni ya hiari lakini hasa kwa sehemu muhimu ya miundombinu kama mteja wa Ethereum, ni muhimu kufahamu vekta za mashambulizi zinazowezekana na kuziepuka. Ikiwa umepakua faili ya binary iliyojengwa awali, unahitaji kuiamini na kuhatarisha kwamba mshambuliaji anaweza kubadilisha faili inayoweza kuendeshwa na moja hasidi.

Wasanidi programu hutia saini faili za binary zilizotolewa kwa funguo zao za PGP ili uweze kuthibitisha kwa njia ya kriptografia kuwa unaendesha hasa programu waliyoiunda. Unahitaji tu kupata funguo za umma zinazotumiwa na wasanidi programu, ambazo zinaweza kupatikana kwenye kurasa za matoleo ya mteja au kwenye nyaraka. Baada ya kupakua toleo la mteja na saini yake, unaweza kutumia utekelezaji wa PGP, k.m., [GnuPG](https://gnupg.org/download/index.html) ili kuzithibitisha kwa urahisi. Angalia mafunzo ya jinsi ya kuthibitisha programu chanzo-wazi kwa kutumia `gpg` kwenye [linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) au [Windows/MacOS](https://freedom.press/training/verifying-open-source-software/).

Aina nyingine ya uthibitisho ni kuhakikisha kuwa hashi, alama ya kipekee ya kriptografia, ya programu uliyoipakua inalingana na ile iliyotolewa na wasanidi programu. Hii ni rahisi zaidi kuliko kutumia PGP, na baadhi ya wateja hutoa chaguo hili pekee. Endesha tu chaguo la kukokotoa la hashi kwenye programu iliyopakuliwa na uilinganishe na ile kutoka kwa ukurasa wa toleo. Kwa mfano:

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### Usanidi wa mteja {#client-setup}

Baada ya kusakinisha, kupakua, au kukusanya programu ya mteja, uko tayari kuiendesha. Hii inamaanisha tu kwamba inapaswa kutekelezwa na usanidi unaofaa. Wateja hutoa chaguo nyingi za usanidi, ambazo zinaweza kuwezesha vipengele mbalimbali.

Tuanze na chaguo ambazo zinaweza kuathiri sana utendaji wa mteja na matumizi ya data. [Njia za usawazishaji](/developers/docs/nodes-and-clients/#sync-modes) zinawakilisha mbinu tofauti za kupakua na kuthibitisha data ya mnyororo wa bloku. Kabla ya kuanzisha nodi, unapaswa kuamua ni mtandao gani na njia gani ya kusawazisha utumie. Mambo muhimu zaidi ya kuzingatia ni nafasi ya diski, na muda wa kusawazisha ambao mteja atahitaji. Zingatia nyaraka za mteja ili kubaini ni njia gani ya kusawazisha ndiyo chaguo-msingi. Ikiwa hiyo haikufai, chagua nyingine kulingana na kiwango cha usalama, data inayopatikana, na gharama. Mbali na algoriti ya usawazishaji, unaweza pia kuweka upunguzaji wa aina tofauti za data ya zamani. Upunguzaji huwezesha kufuta data iliyopitwa na wakati, yaani, kuondoa nodi za state trie ambazo hazifikiwi kutoka kwa bloku za hivi karibuni.

Chaguo zingine za msingi za usanidi ni, k.m., kuchagua mtandao - Mtandao Mkuu au testnet, kuwezesha sehemu ya mwisho ya HTTP kwa RPC au WebSockets, n.k. Unaweza kupata vipengele na chaguo zote katika nyaraka za mteja. Usanidi mbalimbali wa mteja unaweza kuwekwa kwa kutekeleza mteja na bendera zinazolingana moja kwa moja kwenye CLI au faili ya usanidi. Kila mteja ni tofauti kidogo; tafadhali rejelea daima nyaraka zake rasmi au ukurasa wa usaidizi kwa maelezo juu ya chaguo za usanidi.

Kwa madhumuni ya majaribio, unaweza kupendelea kuendesha mteja kwenye mojawapo ya mitandao ya testnet. [Angalia muhtasari wa mitandao inayotumika](/developers/docs/nodes-and-clients/#execution-clients).

Mifano ya kuendesha wateja wa utekelezaji na usanidi wa msingi inaweza kupatikana katika sehemu inayofuata.

#### Kuanzisha mteja wa utekelezaji {#starting-the-execution-client}

Kabla ya kuanzisha programu ya mteja wa Ethereum, fanya ukaguzi wa mwisho ili kuhakikisha mazingira yako yako tayari. Kwa mfano, hakikisha:

- Kuna nafasi ya kutosha ya diski ukizingatia mtandao uliochaguliwa na hali ya usawazishaji.
- Kumbukumbu na CPU hazijasimamishwa na programu zingine.
- Mfumo wa uendeshaji umesasishwa kwa toleo la hivi karibuni.
- Mfumo una saa na tarehe sahihi.
- Router na firewall yako vinakubali miunganisho kwenye bandari za kusikiliza. Kwa chaguo-msingi wateja wa Ethereum hutumia bandari ya msikilizaji (TCP) na bandari ya ugunduzi (UDP), zote mbili kwenye 30303 kwa chaguo-msingi.

Endesha mteja wako kwenye testnet kwanza ili kusaidia kuhakikisha kila kitu kinafanya kazi ipasavyo.

Unahitaji kutangaza mipangilio yoyote ya mteja ambayo si chaguomsingi mwanzoni. Unaweza kutumia bendera au faili ya usanidi kutangaza usanidi unaopendelea. Seti ya vipengele na sintaksia ya usanidi ya kila mteja hutofautiana. Angalia nyaraka za mteja wako kwa maelezo maalum.

Wateja wa utekelezaji na makubaliano huwasiliana kupitia sehemu ya mwisho iliyothibitishwa iliyoainishwa katika [Engine API](https://github.com/ethereum/execution-apis/tree/main/src/engine). Ili kuunganisha na mteja wa makubaliano, mteja wa utekelezaji lazima atengeneze [`jwtsecret`](https://jwt.io/) kwenye njia inayojulikana. Kwa sababu za usalama na uthabiti, wateja wanapaswa kufanya kazi kwenye mashine moja, na wateja wote wawili lazima wajue njia hii kwani inatumiwa kuthibitisha muunganisho wa RPC wa ndani kati yao. Mteja wa utekelezaji lazima pia aainishe bandari ya kusikiliza kwa API zilizothibitishwa.

Tokeni hii hutolewa kiotomatiki na programu ya mteja, lakini katika hali zingine, unaweza kuhitaji kuifanya mwenyewe. Unaweza kuitengeneza kwa kutumia [OpenSSL](https://www.openssl.org/):

```sh
openssl rand -hex 32 > jwtsecret
```

#### Kuendesha mteja wa utekelezaji {#running-an-execution-client}

Sehemu hii itakuongoza katika kuanzisha wateja wa utekelezaji. Inatumika tu kama mfano wa usanidi wa msingi, ambao utaanzisha mteja na mipangilio hii:

- Inaainisha mtandao wa kuunganisha, Mtandao Mkuu katika mifano yetu
  - Badala yake unaweza kuchagua [mojawapo ya testnet](/developers/docs/networks/) kwa majaribio ya awali ya usanidi wako
- Inafafanua saraka ya data, ambapo data zote zikiwemo za mnyororo wa bloku zitahifadhiwa
  - Hakikisha unabadilisha njia na moja halisi, k.m., inayoelekeza kwenye hifadhi yako ya nje
- Huwezesha violessura vya mawasiliano na mteja
  - Ikiwa ni pamoja na JSON-RPC na Engine API kwa mawasiliano na mteja wa makubaliano
- Inafafanua njia ya `jwtsecret` kwa API iliyothibitishwa
  - Hakikisha unabadilisha njia ya mfano na moja halisi inayoweza kufikiwa na wateja, k.m., `/tmp/jwtsecret`

Tafadhali kumbuka kuwa huu ni mfano wa msingi tu, mipangilio mingine yote itawekwa kwa chaguomsingi. Zingatia nyaraka za kila mteja ili kujifunza kuhusu maadili chaguomsingi, mipangilio, na vipengele. Kwa vipengele zaidi, kwa mfano kwa kuendesha wathibitishaji, ufuatiliaji, n.k., tafadhali rejelea nyaraka za mteja mahususi.

> Kumbuka kuwa backslash `\` katika mifano ni kwa madhumuni ya uumbizaji tu; bendera za usanidi zinaweza kufafanuliwa katika mstari mmoja.

##### Inaendesha Besu

Mfano huu unaanzisha Besu kwenye Mtandao Mkuu, huhifadhi data ya mnyororo wa bloku katika umbizo la chaguomsingi kwenye `/data/ethereum`, huwezesha JSON-RPC na Engine RPC kwa kuunganisha mteja wa makubaliano. Engine API inathibitishwa na tokeni `jwtsecret` na miito kutoka `localhost` pekee ndiyo inaruhusiwa.

```sh
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

Besu pia huja na chaguo la kizinduzi ambalo litauliza mfululizo wa maswali na kutengeneza faili ya usanidi. Endesha kizinduzi shirikishi kwa kutumia:

```sh
besu --Xlauncher
```

[Nyaraka za Besu](https://besu.hyperledger.org/public-networks/get-started/start-node/) zina chaguo za ziada na maelezo ya usanidi.

##### Inaendesha Erigon

Mfano huu unaanzisha Erigon kwenye Mtandao Mkuu, huhifadhi data ya mnyororo wa bloku kwenye `/data/ethereum`, huwezesha JSON-RPC, hufafanua ni nafasi zipi za majina zinaruhusiwa na huwezesha uthibitishaji wa kuunganisha mteja wa makubaliano ambao umefafanuliwa na njia ya `jwtsecret`.

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Kwa chaguomsingi Erigon hufanya usawazishaji kamili na HDD ya 8GB ambayo itasababisha zaidi ya 2TB ya data ya kumbukumbu. Hakikisha `datadir` inaelekeza kwenye diski yenye nafasi ya kutosha au angalia bendera ya `--prune` ambayo inaweza kupunguza aina tofauti za data. Angalia `--help` ya Erigon ili kujifunza zaidi.

##### Inaendesha Geth

Mfano huu unaanzisha Geth kwenye Mtandao Mkuu, huhifadhi data ya mnyororo wa bloku kwenye `/data/ethereum`, huwezesha JSON-RPC na hufafanua ni nafasi zipi za majina zinaruhusiwa. Pia huwezesha uthibitishaji wa kuunganisha mteja wa makubaliano ambao unahitaji njia ya `jwtsecret` na pia chaguo linalofafanua ni miunganisho ipi inaruhusiwa, katika mfano wetu ni kutoka `localhost` pekee.

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Angalia [nyaraka za chaguo zote za usanidi](https://geth.ethereum.org/docs/fundamentals/command-line-options) na ujifunze zaidi kuhusu [kuendesha Geth na mteja wa makubaliano](https://geth.ethereum.org/docs/getting-started/consensus-clients).

##### Inaendesha Nethermind

Nethermind hutoa [chaguo mbalimbali za usakinishaji](https://docs.nethermind.io/get-started/installing-nethermind). Kifurushi huja na faili mbalimbali za binary, ikiwa ni pamoja na Kizinduzi chenye usanidi wa kuongozwa, ambacho kitakusaidia kuunda usanidi kwa njia shirikishi. Vinginevyo, utapata Runner ambayo ni faili yenyewe inayoweza kuendeshwa na unaweza kuiendesha tu na bendera za usanidi. JSON-RPC huwashwa kwa chaguo-msingi.

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

Nyaraka za Nethermind hutoa [mwongozo kamili](https://docs.nethermind.io/get-started/running-node/) juu ya kuendesha Nethermind na mteja wa makubaliano.

Mteja wa utekelezaji atanzisha kazi zake za msingi, sehemu za mwisho zilizochaguliwa, na kuanza kutafuta rika. Baada ya kugundua rika kwa mafanikio, mteja huanza usawazishaji. Mteja wa utekelezaji atasubiri muunganisho kutoka kwa mteja wa makubaliano. Data ya sasa ya mnyororo wa bloku itapatikana mara tu mteja atakaposawazishwa kwa mafanikio na hali ya sasa.

##### Inaendesha Reth

Mfano huu unaanzisha Reth kwenye Mtandao Mkuu, ukitumia eneo la data la chaguo-msingi. Huwezesha JSON-RPC na uthibitishaji wa Engine RPC kwa kuunganisha mteja wa makubaliano ambao umefafanuliwa na njia ya `jwtsecret`, na miito kutoka `localhost` pekee ndiyo inaruhusiwa.

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

Angalia [Kusanidi Reth](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth) ili kujifunza zaidi kuhusu saraka za data za chaguo-msingi. [Nyaraka za Reth](https://reth.rs/run/mainnet.html) zina chaguo za ziada na maelezo ya usanidi.

#### Kuanzisha mteja wa makubaliano {#starting-the-consensus-client}

Mteja wa makubaliano lazima aanzishwe na usanidi sahihi wa bandari ili kuanzisha muunganisho wa RPC wa ndani na mteja wa utekelezaji. Wateja wa makubaliano wanapaswa kuendeshwa na bandari ya mteja wa utekelezaji iliyo wazi kama hoja ya usanidi.

Mteja wa makubaliano pia anahitaji njia ya `jwt-secret` ya mteja wa utekelezaji ili kuthibitisha muunganisho wa RPC kati yao. Sawa na mifano ya utekelezaji hapo juu, kila mteja wa makubaliano ana bendera ya usanidi ambayo inachukua njia ya faili ya tokeni ya jwt kama hoja. Hii lazima iendane na njia ya `jwtsecret` iliyotolewa kwa mteja wa utekelezaji.

Ikiwa unapanga kuendesha mthibitishaji, hakikisha unaongeza bendera ya usanidi inayobainisha anwani ya Ethereum ya mpokeaji ada. Hapa ndipo zawadi za ether za mthibitishaji wako zinakusanywa. Kila mteja wa makubaliano ana chaguo, k.m., `--suggested-fee-recipient=0xabcd1`, ambalo huchukua anwani ya Ethereum kama hoja.

Unapoanzisha Nodi ya Beacon kwenye testnet, unaweza kuokoa muda mwingi wa kusawazisha kwa kutumia sehemu ya mwisho ya umma kwa [Checkpoint sync](https://notes.ethereum.org/@launchpad/checkpoint-sync).

#### Kuendesha mteja wa makubaliano {#running-a-consensus-client}

##### Inaendesha Lighthouse

Kabla ya kuendesha Lighthouse, jifunze zaidi jinsi ya kuisakinisha na kuisanidi katika [Lighthouse Book](https://lighthouse-book.sigmaprime.io/installation.html).

```sh
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### Inaendesha Lodestar

Sakinisha programu ya Lodestar kwa kuikusanya au kupakua picha ya Docker. Jifunze zaidi katika [nyaraka](https://chainsafe.github.io/lodestar/) na [mwongozo kamili zaidi wa usanidi](https://hackmd.io/@philknows/rk5cDvKmK).

```sh
lodestar beacon \
    --dataDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### Inaendesha Nimbus

Nimbus huja na wateja wa makubaliano na wa utekelezaji. Inaweza kuendeshwa kwenye vifaa mbalimbali hata vyenye nguvu ndogo sana ya kompyuta.
Baada ya [kusakinisha vitegemezi na Nimbus yenyewe](https://nimbus.guide/quick-start.html), unaweza kuendesha mteja wake wa makubaliano:

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### Inaendesha Prysm

Prysm huja na hati ambayo inaruhusu usakinishaji rahisi wa kiotomatiki. Maelezo zaidi yanaweza kupatikana katika [nyaraka za Prysm](https://prysm.offchainlabs.com/docs/install-prysm/install-with-script/).

```sh
./prysm.sh beacon-chain \
    --mainnet \
    --datadir /data/ethereum  \
    --execution-endpoint=http://localhost:8551  \
    --jwt-secret=/path/to/jwtsecret
```

##### Inaendesha Teku

```sh
teku --network mainnet \
    --data-path "/data/ethereum" \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file "/path/to/jwtsecret"
```

Wakati mteja wa makubaliano anapounganisha na mteja wa utekelezaji kusoma mkataba wa amana na kutambua wathibitishaji, pia huunganisha na rika zingine za Nodi ya Beacon na kuanza kusawazisha nafasi za makubaliano kutoka mwanzo. Mara Nodi ya Beacon inapofikia epoch ya sasa, API ya Beacon inakuwa tayari kutumika kwa wathibitishaji wako. Jifunze zaidi kuhusu [API za Nodi ya Beacon](https://eth2docs.vercel.app/).

### Kuongeza Wathibitishaji {#adding-validators}

Mteja wa makubaliano hutumika kama Nodi ya Beacon kwa wathibitishaji kuunganisha. Kila mteja wa makubaliano ana programu yake ya mthibitishaji iliyoelezwa kwa undani katika nyaraka zake husika.

Kuendesha mthibitishaji wako mwenyewe kunaruhusu [kusimamisha peke yako](/staking/solo/), njia yenye athari zaidi na isiyo na uaminifu ya kusaidia mtandao wa Ethereum. Hata hivyo, hii inahitaji amana ya ETH 32. Ili kuendesha mthibitishaji kwenye nodi yako mwenyewe kwa kiasi kidogo, bwawa la ugatuzi na waendeshaji wa nodi wasio na ruhusa, kama vile [Rocket Pool](https://rocketpool.net/node-operators), linaweza kukuvutia.

Njia rahisi zaidi ya kuanza na kusimamisha na uzalishaji wa ufunguo wa mthibitishaji ni kutumia [Jukwaa la Uzinduzi la Kusimamisha la Hoodi Testnet](https://hoodi.launchpad.ethereum.org/), ambalo linakuruhusu kupima usanidi wako kwa [kuendesha nodi kwenye Hoodi](https://notes.ethereum.org/@launchpad/hoodi). Unapokuwa tayari kwa Mtandao Mkuu, unaweza kurudia hatua hizi ukitumia [Jukwaa la Uzinduzi la Kusimamisha la Mtandao Mkuu](https://launchpad.ethereum.org/).

Angalia [ukurasa wa kusimamisha](/staking) kwa muhtasari kuhusu chaguo za kusimamisha.

### Kutumia nodi {#using-the-node}

Wateja wa utekelezaji hutoa [sehemu za mwisho za API za RPC](/developers/docs/apis/json-rpc/) ambazo unaweza kutumia kuwasilisha miamala, kuingiliana na au kupeleka mikataba-erevu kwenye mtandao wa Ethereum kwa njia mbalimbali:

- Kuzipiga simu kwa mikono na itifaki inayofaa (k.m., kwa kutumia `curl`)
- Kuambatanisha koni iliyotolewa (k.m., `geth attach`)
- Kuzitekeleza katika programu kwa kutumia maktaba za web3, k.m., [web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io/ethers.js/)

Wateja tofauti wana utekelezaji tofauti wa sehemu za mwisho za RPC. Lakini kuna JSON-RPC ya kawaida ambayo unaweza kutumia na kila mteja. Kwa muhtasari [soma nyaraka za JSON-RPC](/developers/docs/apis/json-rpc/). Programu zinazohitaji habari kutoka kwa mtandao wa Ethereum zinaweza kutumia RPC hii. Kwa mfano, mkoba maarufu wa MetaMask unakuwezesha [kuunganisha kwenye sehemu yako ya mwisho ya RPC](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) ambayo ina manufaa makubwa ya faragha na usalama.

Wateja wote wa makubaliano huonyesha [API ya Beacon](https://ethereum.github.io/beacon-APIs) ambayo inaweza kutumika kuangalia hali ya mteja wa makubaliano au kupakua bloku na data ya makubaliano kwa kutuma maombi kwa kutumia zana kama vile [Curl](https://curl.se). Taarifa zaidi juu ya hili inaweza kupatikana katika nyaraka za kila mteja wa makubaliano.

#### Kufikia RPC {#reaching-rpc}

Bandari ya chaguo-msingi ya JSON-RPC ya mteja wa utekelezaji ni `8545` lakini unaweza kurekebisha bandari za sehemu za mwisho za ndani katika usanidi. Kwa chaguomsingi, kiolesura cha RPC kinapatikana tu kwenye localhost ya kompyuta yako. Ili kuifanya ipatikane kwa mbali, unaweza kutaka kuifungua kwa umma kwa kubadilisha anwani kuwa `0.0.0.0`. Hii itafanya ifikiwe kupitia mtandao wa ndani na anwani za IP za umma. Katika hali nyingi utahitaji pia kusanidi usambazaji wa bandari kwenye router yako.

Fikia kufungua bandari kwa mtandao kwa tahadhari kwani hii itamruhusu mtu yeyote kwenye mtandao kudhibiti nodi yako. Wahusika hasidi wanaweza kufikia nodi yako ili kuharibu mfumo wako au kuiba fedha zako ikiwa unatumia mteja wako kama mkoba.

Njia ya kuzunguka hii ni kuzuia mbinu hatari za RPC kurekebishwa. Kwa mfano, na Geth, unaweza kutangaza mbinu zinazoweza kurekebishwa na bendera: `--http.api web3,eth,txpool`.

Ufikiaji wa kiolesura cha RPC unaweza kupanuliwa kupitia ukuzaji wa API za safu ya pembeni au programu za seva za wavuti, kama Nginx, na kuziunganisha na anwani na bandari ya ndani ya mteja wako. Kutumia safu ya kati kunaweza pia kuwapa wasanidi programu uwezo wa kusanidi cheti cha miunganisho salama ya `https` kwenye kiolesura cha RPC.

Kuanzisha seva ya wavuti, proksi, au API ya nje ya Rest sio njia pekee ya kutoa ufikiaji wa sehemu ya mwisho ya RPC ya nodi yako. Njia nyingine ya kuhifadhi faragha ya kuanzisha sehemu ya mwisho inayopatikana hadharani ni kupangisha nodi kwenye huduma yako mwenyewe ya [Tor](https://www.torproject.org/) onion. Hii itakuwezesha kufikia RPC nje ya mtandao wako wa ndani bila anwani ya IP ya umma tuli au bandari zilizofunguliwa. Hata hivyo, kutumia usanidi huu kunaweza kuruhusu tu sehemu ya mwisho ya RPC kupatikana kupitia mtandao wa Tor ambao hauhimiliwi na programu zote na inaweza kusababisha matatizo ya muunganisho.

Ili kufanya hivi, unapaswa kuunda [huduma yako ya onion](https://community.torproject.org/onion-services/). Angalia [nyaraka](https://community.torproject.org/onion-services/setup/) juu ya usanidi wa huduma ya onion ili upate yako mwenyewe. Unaweza kuielekeza kwenye seva ya wavuti na proksi kwenye bandari ya RPC au moja kwa moja kwenye RPC.

Mwisho, na mojawapo ya njia maarufu zaidi za kutoa ufikiaji wa mitandao ya ndani ni kupitia muunganisho wa VPN. Kulingana na matumizi yako na idadi ya watumiaji wanaohitaji ufikiaji wa nodi yako, muunganisho salama wa VPN unaweza kuwa chaguo. [OpenVPN](https://openvpn.net/) ni SSL VPN yenye vipengele kamili inayotekeleza upanuzi salama wa mtandao wa safu ya OSI 2 au 3 kwa kutumia itifaki ya SSL/TLS ya kiwango cha tasnia, inasaidia mbinu rahisi za uthibitishaji wa mteja kulingana na vyeti, kadi janja, na/au vitambulisho vya jina la mtumiaji/nenosiri, na inaruhusu sera za udhibiti wa ufikiaji maalum za mtumiaji au kikundi kwa kutumia sheria za firewall zinazotumika kwenye kiolesura cha mtandao cha VPN.

### Kuendesha nodi {#operating-the-node}

Unapaswa kufuatilia nodi yako mara kwa mara ili kuhakikisha inafanya kazi ipasavyo. Unaweza kuhitaji kufanya matengenezo ya mara kwa mara.

#### Kuweka nodi mtandaoni {#keeping-node-online}

Nodi yako haihitaji kuwa mtandaoni kila wakati, lakini unapaswa kuiweka mtandaoni iwezekanavyo ili iendelee kusawazisha na mtandao. Unaweza kuizima ili kuiwasha upya, lakini kumbuka kwamba:

- Kuzima kunaweza kuchukua dakika chache ikiwa hali ya hivi karibuni bado inaandikwa kwenye diski.
- Kuzima kwa lazima kunaweza kuharibu hifadhidata na kukuhitaji usawazishe upya nodi nzima.
- Mteja wako atatoka kwenye usawazishaji na mtandao na atahitaji kusawazisha upya unapoiwasha tena. Wakati nodi inaweza kuanza kusawazisha kutoka pale ilipozimwa mara ya mwisho, mchakato unaweza kuchukua muda kulingana na muda ambao imekuwa nje ya mtandao.

_Hii haihusu nodi za wathibitishaji wa safu ya makubaliano._ Kuzima nodi yako kutaathiri huduma zote zinazoitegemea. Ikiwa unaendesha nodi kwa madhumuni ya _kusimamisha_ unapaswa kujaribu kupunguza muda wa kutofanya kazi iwezekanavyo.

#### Kuunda huduma za mteja {#creating-client-services}

Fikiria kuunda huduma ili kuendesha wateja wako kiotomatiki wakati wa kuanza. Kwa mfano, kwenye seva za Linux, ni vizuri kuunda huduma, k.m., na `systemd`, ambayo inatekeleza mteja na usanidi unaofaa, chini ya mtumiaji mwenye marupurupu machache na kuanza upya kiotomatiki.

#### Kusasisha wateja {#updating-clients}

Unahitaji kuweka programu yako ya mteja ikiwa imesasishwa na viraka vya hivi karibuni vya usalama, vipengele, na [EIPs](/eips/). Hasa kabla ya [uma ngumu](/ethereum-forks/), hakikisha unaendesha matoleo sahihi ya mteja.

> Kabla ya masasisho muhimu ya mtandao, EF huchapisha chapisho kwenye [blogu](https://blog.ethereum.org) yake. Unaweza [kujisajili kwa matangazo haya](https://blog.ethereum.org/category/protocol#subscribe) ili kupata arifa kwenye barua pepe yako wakati nodi yako inahitaji sasisho.

Kusasisha wateja ni rahisi sana. Kila mteja ana maagizo maalum katika nyaraka zake, lakini mchakato kwa ujumla ni kupakua toleo la hivi karibuni na kuanzisha upya mteja na faili mpya inayoweza kuendeshwa. Mteja anapaswa kuendelea kutoka pale alipoishia, lakini na masasisho yaliyotumika.

Kila utekelezaji wa mteja una mfuatano wa toleo unaoweza kusomwa na binadamu unaotumika katika itifaki ya rika-kwa-rika lakini pia unapatikana kutoka kwa mstari wa amri. Mfuatano huu wa toleo unawawezesha watumiaji kuangalia kama wanaendesha toleo sahihi na huruhusu wachunguzi wa bloku na zana zingine za uchanganuzi zinazopenda kupima usambazaji wa wateja maalum kwenye mtandao. Tafadhali rejelea nyaraka za mteja binafsi kwa habari zaidi kuhusu mfuatano wa matoleo.

#### Kuendesha huduma za ziada {#running-additional-services}

Kuendesha nodi yako mwenyewe kunakuwezesha kutumia huduma zinazohitaji ufikiaji wa moja kwa moja kwenye RPC ya mteja wa Ethereum. Hizi ni huduma zilizojengwa juu ya Ethereum kama [suluhisho za safu ya 2](/developers/docs/scaling/#layer-2-scaling), backend kwa mikoba, wachunguzi wa bloku, zana za wasanidi programu na miundombinu mingine ya Ethereum.

#### Kufuatilia nodi {#monitoring-the-node}

Ili kufuatilia vizuri nodi yako, fikiria kukusanya vipimo. Wateja hutoa sehemu za mwisho za vipimo ili uweze kupata data kamili kuhusu nodi yako. Tumia zana kama vile [InfluxDB](https://www.influxdata.com/get-influxdb/) au [Prometheus](https://prometheus.io/) kuunda hifadhidata ambazo unaweza kuzigeuza kuwa taswira na chati katika programu kama [Grafana](https://grafana.com/). Kuna usanidi mwingi wa kutumia programu hii na dashibodi tofauti za Grafana kwako kuona nodi yako na mtandao kwa ujumla. Kwa mfano, angalia [mafunzo ya jinsi ya kufuatilia Geth](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/).

Kama sehemu ya ufuatiliaji wako, hakikisha unaangalia utendaji wa mashine yako. Wakati wa usawazishaji wa awali wa nodi yako, programu ya mteja inaweza kuwa nzito sana kwenye CPU na RAM. Mbali na Grafana, unaweza kutumia zana ambazo OS yako inatoa kama `htop` au `uptime` kufanya hivi.

## Masomo zaidi {#further-reading}

- [Miongozo ya Kusimamisha ya Ethereum](https://github.com/SomerEsat/ethereum-staking-guides) - _Somer Esat, husasishwa mara kwa mara_
- [Mwongozo | Jinsi ya kusanidi mthibitishaji kwa ajili ya kusimamisha Ethereum kwenye mtandao mkuu](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew, husasishwa mara kwa mara_
- [Miongozo ya ETHStaker juu ya kuendesha wathibitishaji kwenye testnet](https://github.com/remyroy/ethstaker#guides) – _ETHStaker, husasishwa mara kwa mara_
- [Sampuli ya programu ya AWS Blockchain Node Runner kwa Nodi za Ethereum](https://aws-samples.github.io/aws-blockchain-node-runners/docs/Blueprints/Ethereum) - _AWS, husasishwa mara kwa mara_
- [Maswali Yanayoulizwa Mara kwa Mara ya Muungano kwa waendeshaji wa nodi](https://notes.ethereum.org/@launchpad/node-faq-merge) - _Julai 2022_
- [Kuchambua mahitaji ya maunzi ili kuwa nodi kamili iliyothibitishwa ya Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 Septemba 2018_
- [Kuendesha Nodi Kamili za Ethereum: Mwongozo kwa Wenye Ari Kidogo](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 Novemba 2019_
- [Kuendesha Nodi ya Hyperledger Besu kwenye Mtandao Mkuu wa Ethereum: Faida, Mahitaji, na Usanidi](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 Mei 2020_
- [Kupeleka Mteja wa Nethermind Ethereum na Mrundikano wa Ufuatiliaji](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 Julai 2020_

## Mada zinazohusiana {#related-topics}

- [Nodi na wateja](/developers/docs/nodes-and-clients/)
- [Bloku](/developers/docs/blocks/)
- [Mitandao](/developers/docs/networks/)
