---
title: Anzisha nodi yako mwenyewe ya Ethereum
description: Utangulizi wa jumla wa kuendesha mfano wako mwenyewe wa kiteja cha Ethereum.
lang: sw
sidebarDepth: 2
---

Kuendesha nodi yako mwenyewe kunakupa faida mbalimbali, kufungua uwezekano mpya, na kusaidia kuunga mkono ekolojia. Ukurasa huu utakuongoza kupitia kuanzisha nodi yako mwenyewe na kushiriki katika kuthibitisha miamala ya [Ethereum](/).

Kumbuka kwamba baada ya [Unganisho](/roadmap/merge), wateja wawili wanahitajika ili kuendesha nodi ya Ethereum; kiteja cha **tabaka la utekelezaji (EL)** na mteja wa **tabaka la mwafaka (CL)**. Ukurasa huu utaonyesha jinsi ya kusakinisha, kusanidi na kuunganisha wateja hawa wawili ili kuendesha nodi ya Ethereum.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuelewa nodi ya Ethereum ni nini na kwa nini unaweza kutaka kuendesha kiteja. Hili limeangaziwa katika [Nodi na wateja](/developers/docs/nodes-and-clients/).

Ikiwa wewe ni mgeni kwenye mada ya kuendesha nodi, au unatafuta njia isiyo ya kiufundi sana, tunapendekeza kwanza uangalie utangulizi wetu rafiki kwa mtumiaji kuhusu [kuendesha nodi ya Ethereum](/run-a-node).

## Kuchagua mbinu {#choosing-approach}

Hatua ya kwanza katika kuanzisha nodi yako ni kuchagua mbinu yako. Kulingana na mahitaji na uwezekano mbalimbali, lazima uchague utekelezaji wa kiteja (kwa wateja wote wa utekelezaji na mwafaka), mazingira (vifaa, mfumo), na vigezo vya mipangilio ya kiteja.

Ukurasa huu utakuongoza kupitia maamuzi haya na kukusaidia kupata njia inayofaa zaidi ya kuendesha mfano wako wa Ethereum.

Ili kuchagua kutoka kwa utekelezaji wa kiteja, angalia [wateja wa utekelezaji](/developers/docs/nodes-and-clients/#execution-clients) wote wanaopatikana walio tayari kwa Mtandao Mkuu, [wateja wa mwafaka](/developers/docs/nodes-and-clients/#consensus-clients) na ujifunze kuhusu [anuwai ya wateja](/developers/docs/nodes-and-clients/client-diversity).

Amua kama utaendesha programu kwenye [vifaa vyako mwenyewe au kwenye wingu](#local-vs-cloud), ukizingatia [mahitaji](#requirements) ya wateja.

Baada ya kuandaa mazingira, sakinisha wateja waliochaguliwa ama kwa [kiolesura rafiki kwa wanaoanza](#automatized-setup) au [kwa mikono](#manual-setup) ukitumia terminali iliyo na chaguo za hali ya juu.

Wakati nodi inafanya kazi na kusawazisha, uko tayari [kuitumia](#using-the-node), lakini hakikisha unafuatilia [matengenezo](#operating-the-node) yake.

![Client setup](./diagram.png)

### Mazingira na vifaa {#environment-and-hardware}

#### Kwenye mashine ya ndani au wingu {#local-vs-cloud}

Wateja wa Ethereum wanaweza kufanya kazi kwenye kompyuta za kiwango cha watumiaji na hawahitaji vifaa vyovyote maalum, kama vile mashine za uchimbaji kwa mfano. Kwa hivyo, una chaguo mbalimbali za kusambaza nodi kulingana na mahitaji yako.
Ili kurahisisha, hebu tufikirie kuhusu kuendesha nodi kwenye mashine ya kimwili ya ndani na seva ya wingu:

- Wingu
  - Watoa huduma hutoa muda mwingi wa kufanya kazi wa seva na anwani za IP za umma zisizobadilika
  - Kupata seva maalum au ya mtandaoni kunaweza kufaa zaidi kuliko kujenga yako mwenyewe
  - Ubaya ni kuamini mtu wa tatu - mtoa huduma wa seva
  - Kwa sababu ya ukubwa wa hifadhi unaohitajika kwa nodi kamili, bei ya seva iliyokodishwa inaweza kuwa juu
- Vifaa vyako mwenyewe
  - Mbinu huru na bila hitaji la uaminifu zaidi
  - Uwekezaji wa mara moja
  - Chaguo la kununua mashine zilizosanidiwa mapema
  - Inabidi uandae kimwili, udumishe, na uwezekano wa kusuluhisha matatizo ya mashine na mtandao

Chaguo zote mbili zina faida tofauti zilizojumlishwa hapo juu. Ikiwa unatafuta suluhisho la wingu, pamoja na watoa huduma wengi wa jadi wa kompyuta ya wingu, pia kuna huduma zinazolenga kusambaza nodi. Angalia [nodi kama huduma](/developers/docs/nodes-and-clients/nodes-as-a-service/) kwa chaguo zaidi kwenye nodi zilizopangishwa.

#### Vifaa {#hardware}

Hata hivyo, mtandao unaostahimili udhibiti, uliogatuliwa haupaswi kutegemea watoa huduma wa wingu. Badala yake, kuendesha nodi yako kwenye vifaa vyako vya ndani ni bora zaidi kwa ekolojia. [Makadirio](https://www.ethernodes.org/networkType/cl/Hosting) yanaonyesha sehemu kubwa ya nodi zinaendeshwa kwenye wingu, ambazo zinaweza kuwa sehemu moja ya kutofaulu.

Wateja wa Ethereum wanaweza kufanya kazi kwenye kompyuta yako, kompyuta mpakato, seva, au hata kompyuta ya bodi moja. Wakati kuendesha wateja kwenye kompyuta yako binafsi inawezekana, kuwa na mashine maalum kwa ajili ya nodi yako tu kunaweza kuimarisha sana utendaji na usalama wake huku ukipunguza athari kwenye kompyuta yako kuu.

Kutumia vifaa vyako mwenyewe inaweza kuwa rahisi sana. Kuna chaguo nyingi rahisi pamoja na mipangilio ya hali ya juu kwa watu wa kiufundi zaidi. Kwa hivyo hebu tuangalie mahitaji na njia za kuendesha wateja wa Ethereum kwenye mashine yako.

#### Mahitaji {#requirements}

Mahitaji ya vifaa hutofautiana kwa kila kiteja lakini kwa ujumla si makubwa sana kwa kuwa nodi inahitaji tu kusalia katika usawazishaji. Usichanganye na uchimbaji, ambao unahitaji nguvu zaidi ya kompyuta. Hata hivyo, muda wa usawazishaji na utendakazi huboreka ukiwa na vifaa vyenye nguvu zaidi.

Kabla ya kusakinisha kiteja chochote, tafadhali hakikisha kompyuta yako ina rasilimali za kutosha kukiendesha. Unaweza kupata mahitaji ya chini na yaliyopendekezwa hapa chini.

Kikwazo cha vifaa vyako mara nyingi ni nafasi ya diski. Kusawazisha mnyororo wa vitalu wa Ethereum kunahitaji uingizaji/utokaji mwingi na kunahitaji nafasi kubwa. Ni bora kuwa na **hifadhi ya hali thabiti (SSD)** iliyo na mamia ya GB za nafasi ya bure ya kuhifadhi hata baada ya usawazishaji.

Ukubwa wa hifadhidata na kasi ya usawazishaji wa awali inategemea kiteja kilichochaguliwa, usanidi wake na [mkakati wa usawazishaji](/developers/docs/nodes-and-clients/#sync-modes).

Pia hakikisha muunganisho wako wa intaneti hauzuiliwi na [kikomo cha kipimo data](https://wikipedia.org/wiki/Data_cap). Inapendekezwa kutumia muunganisho usio na kipimo kwani usawazishaji wa awali na data inayotangazwa kwenye mtandao inaweza kuzidi kikomo chako.

##### Mfumo wa uendeshaji {#plug-and-play}

Wateja wote hutumia mifumo mikuu ya uendeshaji - Linux, macOS, Windows. Hii ina maana unaweza kuendesha nodi kwenye mashine za kawaida za mezani au seva zilizo na mfumo wa uendeshaji (OS) unaokufaa zaidi. Hakikisha OS yako imesasishwa ili kuepuka matatizo yanayoweza kutokea na udhaifu wa kiusalama.

##### Mahitaji ya chini {#ethereum-on-a-single-board-computer}

- CPU iliyo na core 2+
- RAM ya GB 16 (GB 32 inapendekezwa kwa uthabiti)
- SSD ya NVMe ya TB 2 (inawezekana ikapitwa kufikia 2027, soma zaidi kuhusu [SSD nzuri na zisizo nzuri sana kwa nodi za Ethereum](https://gist.github.com/yorickdowne/f3a3e79a573bf35767cd002cc977b038))
- Kipimo data cha MBit/s 25+

##### Vipimo vilivyopendekezwa {#spinning-up-node}

Mwongozo wa sasa wa vifaa kwa waendeshaji wa nodi umetambuliwa katika [EIP-7870](https://eips.ethereum.org/EIPS/eip-7870). Kwa nodi kamili inapendekeza:

- CPU yenye kasi iliyo na core 4+ (core 8+ ikiwa inathibitisha)
- RAM ya GB 32 (GB 64 inapendekezwa ikiwa inathibitisha ili kuhakikisha uthabiti)
- SSD ya NVMe ya TB 4 (hifadhi zisizo na DRAM na QLC hazipendekezwi)
- Kipimo data cha 50 MBit/s cha kupakua / 15+ MBit/s cha kupakia (25+ MBit/s cha kupakia ikiwa inathibitisha)

Hali ya usawazishaji na kiteja unachochagua kitaathiri mahitaji ya nafasi, lakini tumekadiria nafasi ya diski utayohitaji kwa kila kiteja hapa chini.

| Kiteja     | Ukubwa wa diski (usawazishaji wa picha) | Ukubwa wa diski (kumbukumbu kamili) |
| ---------- | --------------------- | ------------------------ |
| Besu       | 800GB+                | 12TB+                    |
| Erigon     | N/A                   | 2.5TB+                   |
| Geth       | 500GB+                | 12TB+                    |
| Nethermind | 500GB+                | 12TB+                    |
| Reth       | N/A                   | 2.2TB+                   |

- Kumbuka: Erigon na Reth hazitoi usawazishaji wa picha, lakini Upogoaji Kamili unawezekana (~2TB kwa Erigon, ~1.2TB kwa Reth)

Kwa wateja wa mwafaka, hitaji la nafasi pia linategemea utekelezaji wa kiteja na vipengele vilivyowezeshwa (k.m., mkataji wa mthibitishaji) lakini kwa ujumla hesabu na GB 200 nyingine zinazohitajika kwa data ya kinara. Kukiwa na idadi kubwa ya wathibitishaji, mzigo wa kipimo data unakua pia. Unaweza kupata [maelezo kuhusu mahitaji ya mteja wa mwafaka katika uchanganuzi huu](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc).

#### Suluhu za chomeka-na-cheza {#automatized-setup}

Chaguo rahisi zaidi la kuendesha nodi na vifaa vyako mwenyewe ni kutumia visanduku vya chomeka-na-cheza. Mashine zilizosanidiwa mapema kutoka kwa wachuuzi hutoa uzoefu wa moja kwa moja: agiza, unganisha, endesha. Kila kitu kimesanidiwa mapema na hufanya kazi kiotomatiki na mwongozo angavu na dashibodi ya kufuatilia na kudhibiti programu.

- [DAppNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### Ethereum kwenye kompyuta ya bodi moja {#manual-setup}

Njia rahisi na nafuu ya kuendesha nodi ya Ethereum ni kutumia kompyuta ya bodi moja, hata yenye usanifu wa ARM kama Raspberry Pi. [Ethereum kwenye ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) hutoa picha zilizo rahisi kuendesha za kiteja cha utekelezaji na mwafaka nyingi kwa Raspberry Pi na bodi zingine za ARM.

Vifaa vidogo, vya bei nafuu na vyenye ufanisi kama hivi ni bora kwa kuendesha nodi nyumbani lakini kumbuka utendakazi wao mdogo.

## Kuanzisha nodi {#getting-the-client}

Usanidi halisi wa kiteja unaweza kufanywa ama kwa vizindua vya kiotomatiki au kwa mikono, kusanidi programu ya kiteja moja kwa moja.

Kwa watumiaji wasio na ujuzi sana, mbinu inayopendekezwa ni kutumia kizindua, programu inayokuongoza kupitia usakinishaji na kugeuza mchakato wa kusanidi kiteja kiotomatiki. Hata hivyo, ikiwa una uzoefu fulani wa kutumia terminali, hatua za usanidi wa mikono zinapaswa kuwa rahisi kufuata.

### Usanidi unaoongozwa {#client-setup}

Miradi mingi rafiki kwa mtumiaji inalenga kuboresha uzoefu wa kusanidi kiteja. Vizindua hivi hutoa usakinishaji na usanidi wa kiteja kiotomatiki, na baadhi hata hutoa kiolesura cha picha kwa usanidi unaoongozwa na ufuatiliaji wa wateja.

Hapa chini kuna miradi michache inayoweza kukusaidia kusakinisha na kudhibiti wateja kwa kubofya mara chache tu:

- [DAppNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) - DAppNode haiji tu na mashine kutoka kwa mchuuzi. Programu, kizindua nodi halisi na kituo cha udhibiti chenye vipengele vingi vinaweza kutumika kwenye vifaa vya kiholela.
- [EthPillar](https://www.coincashew.com/coins/overview-eth/ethpillar) - Njia ya haraka na rahisi zaidi ya kusanidi nodi kamili. Zana ya usanidi wa mstari mmoja na TUI ya usimamizi wa nodi. Bure. Chanzo wazi. Bidhaa za umma kwa Ethereum na waweka dhamana wanaojitegemea. Usaidizi wa ARM64 na AMD64.
- [eth-docker](https://eth-docker.net/) - Usanidi wa kiotomatiki kwa kutumia Docker unaozingatia uwekaji dhamana rahisi na salama, unahitaji ujuzi wa kimsingi wa terminali na Docker, uliopendekezwa kwa watumiaji wa hali ya juu kidogo.
- [Stereum](https://stereum-dev.github.io/ethereum-node-web-docs) - Kizindua cha kusakinisha wateja kwenye seva ya mbali kupitia unganisho la SSH na mwongozo wa usanidi wa GUI, kituo cha udhibiti, na vipengele vingine vingi.
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) - Zana ya usanidi wa nodi ambayo inaunda usanidi wa Docker kiotomatiki kwa kutumia mchawi wa CLI. Imeandikwa katika Go na Nethermind.
- [Chainstack Inayojipangisha](https://docs.chainstack.com/docs/self-hosted/introduction) - UI ya Wavuti na CLI kwa kusambaza wateja wa utekelezaji na mwafaka kwenye Kubernetes. Kianzio cha Snapshot na ufuatiliaji uliojengewa ndani umejumuishwa. Bure. Hakuna akaunti ya Chainstack inayohitajika. Imejengwa na Chainstack.

### Usanidi wa wateja kwa mikono {#starting-the-execution-client}

Chaguo jingine ni kupakua, kuthibitisha, na kusanidi programu ya kiteja kwa mikono. Hata kama baadhi ya wateja wanatoa kiolesura cha picha, usanidi wa mikono bado unahitaji ujuzi wa kimsingi na terminali lakini hutoa utofauti zaidi.

Kama ilivyoelezwa hapo awali, kusanidi nodi yako mwenyewe ya Ethereum kutahitaji kuendesha jozi ya wateja wa mwafaka na utekelezaji. Baadhi ya wateja wanaweza kujumuisha kiteja chepesi cha aina nyingine na kusawazisha bila programu nyingine yoyote inayohitajika. Hata hivyo, uthibitishaji kamili bila hitaji la uaminifu unahitaji utekelezaji wote miwili.

#### Kupata programu ya kiteja {#running-an-execution-client}

Kwanza, unahitaji kupata programu yako unayopendelea ya [kiteja cha utekelezaji](/developers/docs/nodes-and-clients/#execution-clients) na [mteja wa mwafaka](/developers/docs/nodes-and-clients/#consensus-clients).

Unaweza kupakua kwa urahisi programu inayoweza kutekelezwa au kifurushi cha usakinishaji kinachofaa mfumo wako wa uendeshaji na usanifu. Thibitisha kila wakati saini na cheksamu za vifurushi vilivyopakuliwa. Baadhi ya wateja pia hutoa hazina au picha za Docker kwa usakinishaji na masasisho rahisi. Wateja wote ni chanzo wazi, kwa hivyo unaweza pia kuwajenga kutoka kwa chanzo. Hii ni njia ya hali ya juu zaidi, lakini katika baadhi ya matukio, inaweza kuhitajika.

Maagizo ya kusakinisha kila kiteja yametolewa katika nyaraka zilizounganishwa katika orodha za wateja hapo juu.

Hapa kuna kurasa za kutolewa kwa wateja ambapo unaweza kupata jozi zao zilizojengwa mapema au maagizo juu ya usakinishaji:

##### Wateja wa utekelezaji {#starting-the-consensus-client}

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads)
- [Nethermind](https://downloads.nethermind.io/)
- [Reth](https://reth.rs/installation/installation.html)

Inafaa pia kuzingatia kwamba anuwai ya wateja ni [suala kwenye tabaka la utekelezaji](/developers/docs/nodes-and-clients/client-diversity/#execution-layer). Inapendekezwa kuwa wasomaji wafikirie kuendesha kiteja cha utekelezaji cha wachache.

##### Wateja wa mwafaka {#running-a-consensus-client}

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/run/getting-started/installation#build-from-source/) (Haitoi jozi iliyojengwa mapema, picha ya Docker pekee au kujengwa kutoka kwa chanzo)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

[Anuwai ya wateja](/developers/docs/nodes-and-clients/client-diversity/) ni muhimu kwa nodi za mwafaka zinazoendesha wathibitishaji. Ikiwa wengi wa wathibitishaji wanaendesha utekelezaji wa kiteja kimoja, usalama wa mtandao uko hatarini. Kwa hivyo inapendekezwa kuzingatia kuchagua kiteja cha wachache.

[Tazama matumizi ya hivi punde ya kiteja cha mtandao](https://clientdiversity.org/) na ujifunze zaidi kuhusu [anuwai ya wateja](/developers/docs/nodes-and-clients/client-diversity).

##### Kuthibitisha programu {#adding-validators}

Unapopakua programu kutoka kwenye mtandao, inashauriwa kuthibitisha uadilifu wake. Hatua hii ni ya hiari lakini hasa kwa kipande muhimu cha miundombinu kama kiteja cha Ethereum, ni muhimu kufahamu vekta zinazowezekana za mashambulizi na kuziepuka. Ikiwa ulipakua jozi iliyojengwa mapema, unahitaji kuiamini na kuhatarisha kwamba mshambuliaji anaweza kubadilisha ile inayoweza kutekelezwa kwa hasidi.

Wasanidi hutia saini jozi zilizotolewa kwa funguo zao za PGP ili uweze kuthibitisha kwa njia ya kificho kuwa unaendesha programu hasa waliyounda. Unahitaji tu kupata funguo za umma zinazotumiwa na wasanidi, ambazo zinaweza kupatikana kwenye kurasa za kutolewa kwa kiteja au kwenye nyaraka. Baada ya kupakua toleo la kiteja na saini yake, unaweza kutumia utekelezaji wa PGP, k.m., [GnuPG](https://gnupg.org/download/index.html) ili kuzithibitisha kwa urahisi. Angalia mafunzo ya kuthibitisha programu huria kwa kutumia `gpg` kwenye [Linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) au [Windows/macOS](https://freedom.press/training/verifying-open-source-software/).

Aina nyingine ya uthibitishaji ni kuhakikisha kwamba heshi, alama ya kipekee ya kificho, ya programu uliyopakua inalingana na ile iliyotolewa na wasanidi. Hii ni rahisi zaidi kuliko kutumia PGP, na baadhi ya wateja hutoa chaguo hili pekee. Endesha tu kazi ya heshi kwenye programu iliyopakuliwa na uilinganishe na ile kutoka kwenye ukurasa wa kutolewa. Kwa mfano:

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### Usanidi wa kiteja {#using-the-node}

Baada ya kusakinisha, kupakua, au kukusanya programu ya kiteja, uko tayari kuiendesha. Hii inamaanisha tu inapaswa kutekelezwa kwa usanidi unaofaa. Wateja hutoa chaguo nyingi za usanidi, ambazo zinaweza kuwezesha vipengele mbalimbali.

Hebu tuanze na chaguo zinazoweza kuathiri kwa kiasi kikubwa utendakazi wa kiteja na matumizi ya data. [Hali za usawazishaji](/developers/docs/nodes-and-clients/#sync-modes) zinawakilisha mbinu tofauti za kupakua na kuthibitisha data ya mnyororo wa vitalu. Kabla ya kuanzisha nodi, unapaswa kuamua ni mtandao na hali gani ya usawazishaji utatumia. Mambo muhimu zaidi ya kuzingatia ni nafasi ya diski, na muda wa usawazishaji kiteja kitahitaji. Zingatia nyaraka za kiteja ili kubaini ni hali gani ya usawazishaji ndiyo chaguomsingi. Ikiwa hiyo haikufai, chagua nyingine kulingana na kiwango cha usalama, data inayopatikana, na gharama. Kando na algoriti ya usawazishaji, unaweza pia kuweka upogoaji wa aina tofauti za data ya zamani. Upogoaji huwezesha kufuta data iliyopitwa na wakati, yaani, kuondoa nodi za trie ya hali ambazo hazipatikani kutoka kwa vitalu vya hivi karibuni.

Chaguo zingine za msingi za usanidi ni, k.m., kuchagua mtandao - Mtandao Mkuu au mitandao ya majaribio, kuwezesha mwisho wa HTTP kwa RPC au WebSockets, n.k. Unaweza kupata vipengele vyote na chaguo katika nyaraka za kiteja. Mipangilio mbalimbali ya kiteja inaweza kuwekwa kwa kutekeleza kiteja na bendera zinazolingana moja kwa moja kwenye CLI au faili ya usanidi. Kila kiteja ni tofauti kidogo; tafadhali rejelea kila wakati nyaraka zake rasmi au ukurasa wa usaidizi kwa maelezo kuhusu chaguo za usanidi.

Kwa madhumuni ya majaribio, unaweza kupendelea kuendesha kiteja kwenye mojawapo ya mitandao ya majaribio. [Tazama muhtasari wa mitandao inayotumika](/developers/docs/nodes-and-clients/#execution-clients).

Mifano ya kuendesha wateja wa utekelezaji kwa usanidi wa msingi inaweza kupatikana katika sehemu inayofuata.

#### Kuanzisha kiteja cha utekelezaji {#reaching-rpc}

Kabla ya kuanzisha programu ya kiteja cha Ethereum, fanya ukaguzi wa mwisho kwamba mazingira yako yako tayari. Kwa mfano, hakikisha:

- Kuna nafasi ya kutosha ya diski ukizingatia mtandao uliochaguliwa na hali ya usawazishaji.
- Kumbukumbu na CPU haijasimamishwa na programu zingine.
- Mfumo wa uendeshaji umesasishwa kwa toleo la hivi punde.
- Mfumo una saa na tarehe sahihi.
- Rota na ngome yako inakubali miunganisho kwenye milango ya kusikiliza. Kwa chaguomsingi wateja wa Ethereum hutumia mlango wa kusikiliza (TCP) na mlango wa ugunduzi (UDP), zote zikiwa kwenye 30303 kwa chaguomsingi.

Endesha kiteja chako kwenye mtandao wa majaribio kwanza ili kusaidia kuhakikisha kila kitu kinafanya kazi kwa usahihi.

Unahitaji kutangaza mipangilio yoyote ya kiteja ambayo sio chaguomsingi mwanzoni. Unaweza kutumia bendera au faili ya usanidi kutangaza usanidi wako unaopendelea. Seti ya vipengele na sintaksia ya usanidi ya kila kiteja inatofautiana. Angalia nyaraka za kiteja chako kwa maelezo maalum.

Wateja wa utekelezaji na mwafaka huwasiliana kupitia mwisho uliothibitishwa uliobainishwa katika [API ya Injini](https://github.com/ethereum/execution-apis/tree/main/src/engine). Ili kuunganisha kwa mteja wa mwafaka, kiteja cha utekelezaji lazima kitoe [`jwtsecret`](https://jwt.io/) kwenye njia inayojulikana. Kwa sababu za kiusalama na uthabiti, wateja wanapaswa kufanya kazi kwenye mashine moja, na wateja wote wawili lazima wajue njia hii kwani inatumiwa kuthibitisha muunganisho wa RPC wa ndani kati yao. Kiteja cha utekelezaji lazima pia kifafanue mlango wa kusikiliza kwa API zilizothibitishwa.

Tokeni hii inatolewa kiotomatiki na programu ya kiteja, lakini katika baadhi ya matukio, unaweza kuhitaji kufanya mwenyewe. Unaweza kuizalisha ukitumia [OpenSSL](https://www.openssl.org/):

```sh
openssl rand -hex 32 > jwtsecret
```

#### Kuendesha kiteja cha utekelezaji {#operating-the-node}

Sehemu hii itakuongoza kupitia kuanzisha wateja wa utekelezaji. Inatumika tu kama mfano wa usanidi wa msingi, ambao utaanzisha kiteja kwa mipangilio hii:

- Inabainisha mtandao wa kuunganisha, Mtandao Mkuu katika mifano yetu
  - Unaweza badala yake kuchagua [mojawapo ya mitandao ya majaribio](/developers/docs/networks/) kwa majaribio ya awali ya usanidi wako
- Inafafanua saraka ya data, ambapo data yote ikijumuisha mnyororo wa vitalu itahifadhiwa
  - Hakikisha unabadilisha njia na ile halisi, k.m., inayoelekeza kwenye hifadhi yako ya nje
- Inawezesha violesura vya kuwasiliana na kiteja
  - Ikijumuisha JSON-RPC na API ya Injini kwa mawasiliano na mteja wa mwafaka
- Inafafanua njia ya kuelekea `jwtsecret` kwa API iliyothibitishwa
  - Hakikisha unabadilisha njia ya mfano na ile halisi ambayo inaweza kufikiwa na wateja, k.m., `/tmp/jwtsecret`

Tafadhali kumbuka kuwa huu ni mfano wa kimsingi tu, mipangilio mingine yote itawekwa kuwa chaguomsingi. Zingatia nyaraka za kila kiteja ili ujifunze kuhusu thamani za chaguomsingi, mipangilio, na vipengele. Kwa vipengele zaidi, kwa mfano kwa kuendesha wathibitishaji, ufuatiliaji, n.k., tafadhali rejelea nyaraka za kiteja mahususi.

> Kumbuka kuwa mikwaju ya nyuma `\` katika mifano ni kwa madhumuni ya uumbizaji pekee; bendera za usanidi zinaweza kufafanuliwa katika mstari mmoja.

##### Kuendesha Besu {#keeping-node-online}

Mfano huu unaanzisha Besu kwenye Mtandao Mkuu, huhifadhi data ya mnyororo wa vitalu katika umbizo chaguomsingi kwenye `/data/ethereum`, huwezesha JSON-RPC na RPC ya Injini kwa kuunganisha mteja wa mwafaka. API ya Injini imethibitishwa na tokeni `jwtsecret` na simu pekee kutoka `localhost` zinaruhusiwa.

```sh
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

Besu pia inakuja na chaguo la kizindua ambacho kitauliza mfululizo wa maswali na kutoa faili ya usanidi. Endesha kizindua shirikishi ukitumia:

```sh
besu --Xlauncher
```

[Nyaraka za Besu](https://besu.hyperledger.org/public-networks/get-started/start-node/) zina chaguo za ziada na maelezo ya usanidi.

##### Kuendesha Erigon {#creating-client-services}

Mfano huu unaanzisha Erigon kwenye Mtandao Mkuu, huhifadhi data ya mnyororo wa vitalu kwenye `/data/ethereum`, huwezesha JSON-RPC, hufafanua ni nafasi gani za majina zinaruhusiwa na huwezesha uthibitishaji wa kuunganisha mteja wa mwafaka ambao unafafanuliwa na njia ya `jwtsecret`.

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Kwa chaguomsingi Erigon hufanya usawazishaji kamili na HDD ya 8GB ambayo itasababisha zaidi ya 2TB ya data ya kumbukumbu. Hakikisha `datadir` inaelekeza kwenye diski yenye nafasi ya kutosha ya bure au angalia bendera ya `--prune` ambayo inaweza kupunguza aina tofauti za data. Angalia `--help` ya Erigon ili kujifunza zaidi.

##### Kuendesha Geth {#updating-clients}

Mfano huu unaanzisha Geth kwenye Mtandao Mkuu, huhifadhi data ya mnyororo wa vitalu kwenye `/data/ethereum`, huwezesha JSON-RPC na kufafanua ni nafasi gani za majina zinaruhusiwa. Pia inawezesha uthibitishaji wa kuunganisha mteja wa mwafaka ambao unahitaji njia ya kuelekea `jwtsecret` na pia chaguo la kufafanua ni miunganisho gani inaruhusiwa, katika mfano wetu tu kutoka `localhost`.

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Angalia [nyaraka kwa chaguo zote za usanidi](https://geth.ethereum.org/docs/fundamentals/command-line-options) na ujifunze zaidi kuhusu [kuendesha Geth na mteja wa mwafaka](https://geth.ethereum.org/docs/getting-started/consensus-clients).

##### Kuendesha Nethermind {#running-additional-services}

Nethermind inatoa [chaguo mbalimbali za usakinishaji](https://docs.nethermind.io/get-started/installing-nethermind). Kifurushi huja na jozi mbalimbali, ikiwa ni pamoja na Kizindua kilicho na usanidi unaoongozwa, ambacho kitakusaidia kuunda usanidi kwa maingiliano. Vinginevyo, unapata Kikimbiaji ambacho ndicho kinachoweza kutekelezwa chenyewe na unaweza kukiendesha tu na bendera za usanidi. JSON-RPC imewezeshwa kwa chaguomsingi.

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

Nyaraka za Nethermind hutoa [mwongozo kamili](https://docs.nethermind.io/get-started/running-node/) wa kuendesha Nethermind na mteja wa mwafaka.

Kiteja cha utekelezaji kitaanzisha kazi zake za msingi, miisho iliyochaguliwa, na kuanza kutafuta marika. Baada ya kugundua marika kwa ufanisi, kiteja huanza usawazishaji. Kiteja cha utekelezaji kitasubiri muunganisho kutoka kwa mteja wa mwafaka. Data ya sasa ya mnyororo wa vitalu itapatikana mara tu kiteja kitakaposawazishwa kwa ufanisi kwenye hali ya sasa.

##### Kuendesha Reth {#monitoring-the-node}

Mfano huu unaanzisha Reth kwenye Mtandao Mkuu, kwa kutumia eneo chaguomsingi la data. Huwezesha uthibitishaji wa JSON-RPC na RPC ya Injini kwa kuunganisha mteja wa mwafaka ambao unafafanuliwa na njia ya `jwtsecret`, huku simu pekee kutoka `localhost` zikikubaliwa.

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

Tazama [Kusanidi Reth](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth) ili ujifunze zaidi kuhusu saraka chaguomsingi za data. [Nyaraka za Reth](https://reth.rs/run/mainnet.html) zina chaguo za ziada na maelezo ya usanidi.

#### Kuanzisha mteja wa mwafaka {#further-reading}

Mteja wa mwafaka lazima aanzishwe na usanidi sahihi wa mlango ili kuanzisha muunganisho wa RPC wa ndani kwenye kiteja cha utekelezaji. Wateja wa mwafaka wanapaswa kuendeshwa na mlango wa kiteja cha utekelezaji uliofichuliwa kama hoja ya usanidi.

Mteja wa mwafaka pia anahitaji njia ya kuelekea `jwt-secret` ya kiteja cha utekelezaji ili kuthibitisha muunganisho wa RPC kati yao. Sawa na mifano ya utekelezaji hapo juu, kila mteja wa mwafaka ana bendera ya usanidi ambayo inachukua njia ya faili ya tokeni ya jwt kama hoja. Hii lazima ilingane na njia ya `jwtsecret` iliyotolewa kwa kiteja cha utekelezaji.

Ikiwa unapanga kuendesha mthibitishaji, hakikisha umeongeza bendera ya usanidi inayobainisha anwani ya Ethereum ya mpokeaji ada. Hapa ndipo zawadi za Etha kwa mthibitishaji wako zinapokusanywa. Kila mteja wa mwafaka ana chaguo, k.m., `--suggested-fee-recipient=0xabcd1`, ambalo huchukua anwani ya Ethereum kama hoja.

Unapoanzisha Nodi ya Kinara kwenye mtandao wa majaribio, unaweza kuokoa muda mwingi wa usawazishaji kwa kutumia mwisho wa umma kwa [Usawazishaji wa kituo cha ukaguzi](https://notes.ethereum.org/@launchpad/checkpoint-sync).

#### Kuendesha mteja wa mwafaka {#related-topics}

##### Kuendesha Lighthouse

Kabla ya kuendesha Lighthouse, jifunze zaidi kuhusu jinsi ya kuisakinisha na kuisanidi katika [Kitabu cha Lighthouse](https://lighthouse-book.sigmaprime.io/installation.html).

```sh
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### Kuendesha Lodestar

Sakinisha programu ya Lodestar kwa kuikusanya au kupakua picha ya Docker. Jifunze zaidi katika [nyaraka](https://chainsafe.github.io/lodestar/) na [mwongozo wa usanidi](https://hackmd.io/@philknows/rk5cDvKmK) wa kina zaidi.

```sh
lodestar beacon \
    --dataDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### Kuendesha Nimbus

Nimbus inakuja na wateja wa mwafaka na utekelezaji. Inaweza kuendeshwa kwenye vifaa mbalimbali hata kwa nguvu ndogo sana ya kompyuta.
Baada ya [kusakinisha vitegemezi na Nimbus yenyewe](https://nimbus.guide/quick-start.html), unaweza kuendesha mteja wake wa mwafaka:

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### Kuendesha Prysm

Prysm inakuja na hati ambayo inaruhusu usakinishaji rahisi wa kiotomatiki. Maelezo yanaweza kupatikana katika [nyaraka za Prysm](https://prysm.offchainlabs.com/docs/install-prysm/install-with-script/).

```sh
./prysm.sh beacon-chain \
    --mainnet \
    --datadir /data/ethereum  \
    --execution-endpoint=http://localhost:8551  \
    --jwt-secret=/path/to/jwtsecret
```

##### Kuendesha Teku

```sh
teku --network mainnet \
    --data-path "/data/ethereum" \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file "/path/to/jwtsecret"
```

Wakati mteja wa mwafaka anapounganisha kwenye kiteja cha utekelezaji kusoma mkataba wa amana na kutambua wathibitishaji, pia huunganisha kwa marika wengine wa Nodi ya Kinara na kuanza kusawazisha nafasi za mwafaka kutoka mwanzo. Mara tu Nodi ya Kinara inapofikia kipindi cha sasa, API ya Kinara inakuwa inatumika kwa wathibitishaji wako. Jifunze zaidi kuhusu [API za Nodi ya Kinara](https://ethereum.github.io/beacon-APIs).

### Kuongeza Wathibitishaji

Mteja wa mwafaka hutumika kama Nodi ya Kinara kwa wathibitishaji kuunganisha. Kila mteja wa mwafaka ana programu yake ya mthibitishaji iliyoelezwa kwa kina katika nyaraka zake husika.

Kuendesha mthibitishaji wako mwenyewe kunaruhusu [uwekaji dhamana wa kujitegemea](/staking/solo/), mbinu yenye athari kubwa na isiyo na hitaji la uaminifu ili kusaidia mtandao wa Ethereum. Hata hivyo, hii inahitaji amana ya ETH 32. Ili kuendesha mthibitishaji kwenye nodi yako mwenyewe kwa kiasi kidogo, bwawa lililogatuliwa na waendeshaji nodi bila ruhusa, kama vile [Rocket Pool](https://rocketpool.net/node-operators), linaweza kukuvutia.

Njia rahisi zaidi ya kuanza na uwekaji dhamana na utengenezaji wa ufunguo wa mthibitishaji ni kutumia [Pedi ya Kuzindulia Uwekezaji Dhamana ya Mtandao wa Majaribio wa Hoodi](https://hoodi.launchpad.ethereum.org/), ambayo inakuruhusu kujaribu usanidi wako kwa [kuendesha nodi kwenye Hoodi](https://notes.ethereum.org/@launchpad/hoodi). Ukiwa tayari kwa Mtandao Mkuu, unaweza kurudia hatua hizi ukitumia [Pedi ya Kuzindulia Uwekezaji Dhamana ya Mtandao Mkuu](https://launchpad.ethereum.org/).

Angalia [ukurasa wa uwekaji dhamana](/staking) kwa muhtasari kuhusu chaguo za uwekaji dhamana.

### Kutumia nodi

Wateja wa utekelezaji hutoa [miisho ya API ya RPC](/developers/docs/apis/json-rpc/) ambayo unaweza kutumia kuwasilisha miamala, kuingiliana na au kusambaza mikataba mahiri kwenye mtandao wa Ethereum kwa njia mbalimbali:

- Kuziita kwa mikono na itifaki inayofaa (k.m., kwa kutumia `curl`)
- Kuambatisha kiweko kilichotolewa (k.m., `geth attach`)
- Kuzitekeleza katika programu zinazotumia maktaba za Web3, k.m., [Web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io/ethers.js/)

Wateja tofauti wana utekelezaji tofauti wa miisho ya RPC. Lakini kuna JSON-RPC ya kawaida ambayo unaweza kutumia na kila kiteja. Kwa muhtasari [soma nyaraka za JSON-RPC](/developers/docs/apis/json-rpc/). Programu zinazohitaji taarifa kutoka kwa mtandao wa Ethereum zinaweza kutumia RPC hii. Kwa mfano, mkoba maarufu wa MetaMask hukuruhusu [kuunganisha kwenye mwisho wako wa RPC](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) ambao una faida kubwa za faragha na usalama.

Wateja wote wa mwafaka hufichua [API ya Kinara](https://ethereum.github.io/beacon-APIs) ambayo inaweza kutumika kuangalia hali ya mteja wa mwafaka au kupakua vitalu na data ya mwafaka kwa kutuma maombi kwa kutumia zana kama vile [Curl](https://curl.se). Taarifa zaidi kuhusu hili zinaweza kupatikana katika nyaraka za kila mteja wa mwafaka.

#### Kufikia RPC

Mlango chaguomsingi wa kiteja cha utekelezaji JSON-RPC ni `8545` lakini unaweza kurekebisha milango ya miisho ya ndani kwenye usanidi. Kwa chaguomsingi, kiolesura cha RPC kinaweza kufikiwa tu kwenye localhost ya kompyuta yako. Ili kuifanya ifikike kwa mbali, unaweza kutaka kuifichua kwa umma kwa kubadilisha anwani kuwa `0.0.0.0`. Hii itaifanya ifikike kupitia mtandao wa ndani na anwani za IP za umma. Katika hali nyingi utahitaji pia kusanidi usambazaji wa mlango kwenye rota yako.

Fichua milango kwenye mtandao kwa tahadhari kwani hii itamruhusu mtu yeyote kwenye mtandao kudhibiti nodi yako. Watendaji hasidi wanaweza kufikia nodi yako ili kuangusha mfumo wako au kuiba pesa zako ikiwa unatumia kiteja chako kama mkoba.

Njia ya kuepuka hili ni kuzuia mbinu za RPC zinazoweza kudhuru zisirekebishwe. Kwa mfano, ukiwa na Geth, unaweza kutangaza mbinu zinazoweza kurekebishwa kwa bendera: `--http.api web3,eth,txpool`.

Ufikiaji wa kiolesura cha RPC unaweza kupanuliwa kupitia uundaji wa API za tabaka la ukingo au programu za seva ya wavuti, kama Nginx, na kuziunganisha kwenye anwani ya ndani ya kiteja chako na mlango. Kutumia tabaka la kati kunaweza pia kuruhusu wasanidi programu uwezo wa kusanidi cheti kwa miunganisho salama ya `https` kwenye kiolesura cha RPC.

Kusanidi seva ya wavuti, proksi, au Rest API inayoangalia nje sio njia pekee ya kutoa ufikiaji wa mwisho wa RPC wa nodi yako. Njia nyingine ya kuhifadhi faragha ya kusanidi mwisho unaoweza kufikiwa na umma ni kupangisha nodi kwenye huduma yako mwenyewe ya kitunguu ya [Tor](https://www.torproject.org/). Hii itakuruhusu kufikia RPC nje ya mtandao wako wa ndani bila anwani thabiti ya IP ya umma au milango iliyofunguliwa. Hata hivyo, kutumia usanidi huu kunaweza kuruhusu tu mwisho wa RPC kufikiwa kupitia mtandao wa Tor ambao hautumiki na programu zote na unaweza kusababisha matatizo ya muunganisho.

Ili kufanya hivi, inabidi uunde [huduma yako ya kitunguu](https://community.torproject.org/onion-services/). Angalia [nyaraka](https://community.torproject.org/onion-services/setup/) kwenye usanidi wa huduma ya kitunguu ili kupangisha yako mwenyewe. Unaweza kuielekeza kwenye seva ya wavuti iliyo na proksi kwenye mlango wa RPC au moja kwa moja kwenye RPC.

Mwisho, na mojawapo ya njia maarufu zaidi za kutoa ufikiaji wa mitandao ya ndani ni kupitia muunganisho wa VPN. Kulingana na kesi yako ya utumiaji na wingi wa watumiaji wanaohitaji ufikiaji wa nodi yako, muunganisho salama wa VPN unaweza kuwa chaguo. [OpenVPN](https://openvpn.net/) ni SSL VPN yenye vipengele kamili ambayo inatekeleza upanuzi wa mtandao salama wa tabaka la 2 au 3 la OSI kwa kutumia itifaki ya kawaida ya sekta ya SSL/TLS, inasaidia mbinu rahisi za uthibitishaji wa kiteja kulingana na vyeti, kadi mahiri, na/au vitambulisho vya jina la mtumiaji/nenosiri, na inaruhusu sera za udhibiti wa ufikiaji mahususi wa mtumiaji au kikundi kwa kutumia sheria za ngome zinazotumika kwenye kiolesura pepe cha VPN.

### Kuendesha nodi

Unapaswa kufuatilia nodi yako mara kwa mara ili kuhakikisha inafanya kazi vizuri. Unaweza kuhitaji kufanya matengenezo ya mara kwa mara.

#### Kuweka nodi mtandaoni

Nodi yako si lazima iwe mtandaoni wakati wote, lakini unapaswa kuiweka mtandaoni kadiri iwezekanavyo ili kuiweka katika usawazishaji na mtandao. Unaweza kuizima ili kuiwasha upya, lakini kumbuka kwamba:

- Kuzima kunaweza kuchukua dakika chache ikiwa hali ya hivi karibuni bado inaandikwa kwenye diski.
- Kuzima kwa lazima kunaweza kuharibu hifadhidata na kukuhitaji kusawazisha upya nodi nzima.
- Kiteja chako kitatoka kwenye usawazishaji na mtandao na kitahitaji kusawazisha upya utakapokiwasha tena. Ingawa nodi inaweza kuanza kusawazisha kuanzia pale ilipozimwa mara ya mwisho, mchakato unaweza kuchukua muda kulingana na muda ambao imekuwa nje ya mtandao.

_Hili halitumiki kwa nodi za mthibitishaji za tabaka la mwafaka._ Kuondoa nodi yako mtandaoni kutaathiri huduma zote zinazoitegemea. Ikiwa unaendesha nodi kwa madhumuni ya _uwekaji dhamana_ unapaswa kujaribu kupunguza muda wa kupumzika kadiri iwezekanavyo.

#### Kuunda huduma za kiteja

Fikiria kuunda huduma ili kuendesha wateja wako kiotomatiki wakati wa kuanzisha. Kwa mfano, kwenye seva za Linux, zoezi zuri litakuwa kuunda huduma, k.m., na `systemd`, ambayo inatekeleza kiteja kwa usanidi sahihi, chini ya mtumiaji aliye na mapendeleo machache na inajiwasha upya kiotomatiki.

#### Kusasisha wateja

Unahitaji kusasisha programu yako ya kiteja na viraka vya hivi punde vya usalama, vipengele, na [EIPs](/eips/). Hasa kabla ya [migawanyiko migumu](/ethereum-forks/), hakikisha unaendesha matoleo sahihi ya kiteja.

> Kabla ya masasisho muhimu ya mtandao, EF huchapisha chapisho kwenye [blogu](https://blog.ethereum.org) yake. Unaweza [kujiandikisha kwa matangazo haya](https://blog.ethereum.org/category/protocol#subscribe) ili kupata arifa kwenye barua pepe yako wakati nodi yako inahitaji sasisho.

Kusasisha wateja ni rahisi sana. Kila kiteja kina maagizo maalum katika nyaraka zao, lakini mchakato kwa ujumla ni kupakua tu toleo la hivi punde na kuanzisha upya kiteja ukitumia kipengele kipya kinachoweza kutekelezwa. Kiteja kinapaswa kuendelea pale kilipoachia, lakini kikiwa na masasisho yaliyotumika.

Kila utekelezaji wa kiteja una kamba ya toleo inayosomeka na binadamu inayotumiwa katika itifaki ya rika-kwa-rika lakini pia inapatikana kutoka kwa mstari wa amri. Kamba hii ya toleo huwaruhusu watumiaji kuangalia kuwa wanaendesha toleo sahihi na inaruhusu wavumbuzi wa kitalu na zana zingine za uchanganuzi zinazopenda kutathmini usambazaji wa wateja mahususi kwenye mtandao. Tafadhali rejelea nyaraka za kiteja binafsi kwa maelezo zaidi kuhusu kamba za toleo.

#### Kuendesha huduma za ziada

Kuendesha nodi yako mwenyewe hukuruhusu kutumia huduma zinazohitaji ufikiaji wa moja kwa moja kwa RPC ya kiteja cha Ethereum. Hizi ni huduma zilizojengwa juu ya Ethereum kama [suluhu za tabaka la 2 (l2)](/developers/docs/scaling/#layer-2-scaling), mazingira ya nyuma ya mikoba, wavumbuzi wa kitalu, zana za wasanidi programu na miundombinu mingine ya Ethereum.

#### Kufuatilia nodi

Ili kufuatilia ipasavyo nodi yako, fikiria kukusanya vipimo. Wateja hutoa miisho ya vipimo ili uweze kupata data ya kina kuhusu nodi yako. Tumia zana kama [InfluxDB](https://www.influxdata.com/get-influxdb/) au [Prometheus](https://prometheus.io/) kuunda hifadhidata ambazo unaweza kugeuza kuwa taswira na chati katika programu kama [Grafana](https://grafana.com/). Kuna mipangilio mingi ya kutumia programu hii na dashibodi tofauti za Grafana ili uweze kuona nodi yako na mtandao kwa ujumla. Kwa mfano, angalia [mafunzo ya kufuatilia Geth](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/).

Kama sehemu ya ufuatiliaji wako, hakikisha unafuatilia utendakazi wa mashine yako. Wakati wa usawazishaji wa awali wa nodi yako, programu ya kiteja inaweza kuwa nzito sana kwenye CPU na RAM. Mbali na Grafana, unaweza kutumia zana zinazotolewa na OS yako kama `htop` au `uptime` kufanya hivi.

## Usomaji zaidi

- [Miongozo ya Kuweka Dhamana ya Ethereum](https://github.com/SomerEsat/ethereum-staking-guides) - _Somer Esat, inasasishwa mara kwa mara_
- [Mwongozo | Jinsi ya kusanidi mthibitishaji wa uwekaji dhamana wa Ethereum kwenye Mtandao Mkuu](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew, inasasishwa mara kwa mara_
- [Miongozo ya EthStaker kuhusu kuendesha wathibitishaji kwenye mitandao ya majaribio](https://github.com/remyroy/ethstaker#guides) – _EthStaker, inasasishwa mara kwa mara_
- [Mfano wa Programu ya AWS Blockchain Node Runner kwa Nodi za Ethereum](https://aws-samples.github.io/aws-blockchain-node-runners/docs/blueprints/ethereum) - _AWS, inasasishwa mara kwa mara_
- [Maswali Yanayoulizwa Mara kwa Mara ya Unganisho kwa waendeshaji wa nodi](https://notes.ethereum.org/@launchpad/node-faq-merge) - _Julai 2022_
- [Kuchanganua mahitaji ya vifaa ili kuwa nodi kamili iliyothibitishwa ya Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 Septemba 2018_
- [Kuendesha Nodi Kamili za Ethereum: Mwongozo kwa Wenye Motisha Ndogo](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 Novemba 2019_
- [Kuendesha Nodi ya Hyperledger Besu kwenye Mtandao Mkuu wa Ethereum: Faida, Mahitaji, na Usanidi](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 Mei 2020_
- [Kusambaza Kiteja cha Nethermind Ethereum na Rundo la Ufuatiliaji](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 Julai 2020_

## Mada zinazohusiana

- [Nodi na wateja](/developers/docs/nodes-and-clients/)
- [Vitalu](/developers/docs/blocks/)
- [Mitandao](/developers/docs/networks/)