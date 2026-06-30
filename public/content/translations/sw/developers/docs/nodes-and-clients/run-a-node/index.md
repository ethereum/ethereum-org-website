---
title: Anzisha nodi yako mwenyewe ya Ethereum
description: Utangulizi wa jumla wa kuendesha mfano wako mwenyewe wa mteja wa Ethereum.
lang: sw
sidebarDepth: 2
---

Kuendesha nodi yako mwenyewe kunakupa faida mbalimbali, kunafungua uwezekano mpya, na kusaidia kusaidia mfumo wa ikolojia. Ukurasa huu utakuongoza katika kuanzisha nodi yako mwenyewe na kushiriki katika kuthibitisha miamala ya [Ethereum](/).

Kumbuka kwamba baada ya [Unganisho](/roadmap/merge), wateja wawili wanahitajika ili kuendesha nodi ya Ethereum; kiteja cha **tabaka la utekelezaji (EL)** na mteja wa **tabaka la mwafaka (CL)**. Ukurasa huu utaonyesha jinsi ya kusakinisha, kusanidi na kuunganisha wateja hawa wawili ili kuendesha nodi ya Ethereum.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuelewa nodi ya Ethereum ni nini na kwa nini unaweza kutaka kuendesha mteja. Hili limejadiliwa katika [Nodi na wateja](/developers/docs/nodes-and-clients/).

Ikiwa wewe ni mgeni katika mada ya kuendesha nodi, au unatafuta njia isiyo ya kiufundi sana, tunapendekeza kwanza uangalie utangulizi wetu unaofaa kwa watumiaji kuhusu [kuendesha nodi ya Ethereum](/run-a-node).

## Kuchagua mbinu {#choosing-approach}

Hatua ya kwanza katika kuanzisha nodi yako ni kuchagua mbinu yako. Kulingana na mahitaji na uwezekano mbalimbali, lazima uchague utekelezaji wa mteja (wa wateja wa utekelezaji na mwafaka), mazingira (vifaa, mfumo), na vigezo vya mipangilio ya mteja.

Ukurasa huu utakuongoza kupitia maamuzi haya na kukusaidia kupata njia inayofaa zaidi ya kuendesha mfano wako wa Ethereum.

Ili kuchagua kutoka kwa utekelezaji wa wateja, angalia [wateja wa utekelezaji](/developers/docs/nodes-and-clients/#execution-clients) wote wanaopatikana tayari kwa Mtandao Mkuu, [wateja wa mwafaka](/developers/docs/nodes-and-clients/#consensus-clients) na ujifunze kuhusu [anuwai ya wateja](/developers/docs/nodes-and-clients/client-diversity).

Amua kama utaendesha programu kwenye [vifaa vyako mwenyewe au kwenye wingu](#local-vs-cloud), ukizingatia [mahitaji](#requirements) ya wateja.

Baada ya kuandaa mazingira, sakinisha wateja waliochaguliwa ama kwa [kiolesura kinachofaa kwa wanaoanza](#automatized-setup) au [kwa mikono](#manual-setup) ukitumia terminali yenye chaguo za kina.

Wakati nodi inafanya kazi na kusawazisha, uko tayari [kuitumia](#using-the-node), lakini hakikisha unafuatilia [matengenezo](#operating-the-node) yake.

![Client setup](./diagram.png)

### Mazingira na vifaa {#environment-and-hardware}

#### Ndani au wingu {#local-vs-cloud}

Wateja wa Ethereum wana uwezo wa kufanya kazi kwenye kompyuta za kiwango cha watumiaji na hawahitaji vifaa vyovyote maalum, kama vile mashine za uchimbaji kwa mfano. Kwa hivyo, una chaguo mbalimbali za kusambaza nodi kulingana na mahitaji yako.
Ili kurahisisha, hebu tufikirie kuhusu kuendesha nodi kwenye mashine halisi ya ndani na seva ya wingu:

- Wingu
  - Watoa huduma hutoa muda wa juu wa seva na anwani za IP za umma zisizobadilika
  - Kupata seva maalum au ya mtandaoni inaweza kuwa rahisi zaidi kuliko kujenga yako mwenyewe
  - Hasara ni kuamini mhusika wa tatu - mtoa huduma wa seva
  - Kwa sababu ya ukubwa wa hifadhi unaohitajika kwa nodi kamili, bei ya seva iliyokodishwa inaweza kuwa juu
- Vifaa vyako mwenyewe
  - Mbinu isiyo na hitaji la uaminifu na huru zaidi
  - Uwekezaji wa mara moja
  - Chaguo la kununua mashine zilizosanidiwa mapema
  - Inabidi uandae kimwili, udumishe, na uwezekano wa kutatua matatizo ya mashine na mtandao

Chaguzi zote mbili zina faida tofauti zilizofupishwa hapo juu. Ikiwa unatafuta suluhisho la wingu, pamoja na watoa huduma wengi wa jadi wa kompyuta ya wingu, pia kuna huduma zinazolenga kusambaza nodi. Angalia [nodi kama huduma](/developers/docs/nodes-and-clients/nodes-as-a-service/) kwa chaguo zaidi kwenye nodi zilizopangishwa.

#### Vifaa {#hardware}

Hata hivyo, mtandao unaostahimili udhibiti, uliogatuliwa haupaswi kutegemea watoa huduma wa wingu. Badala yake, kuendesha nodi yako kwenye vifaa vyako vya ndani ni bora zaidi kwa mfumo wa ikolojia. [Makadirio](https://www.ethernodes.org/networkType/cl/Hosting) yanaonyesha sehemu kubwa ya nodi zinaendeshwa kwenye wingu, ambayo inaweza kuwa hatua moja ya kutofaulu.

Wateja wa Ethereum wanaweza kufanya kazi kwenye kompyuta yako, kompyuta mpakato, seva, au hata kompyuta ya bodi moja. Ingawa kuendesha wateja kwenye kompyuta yako binafsi kunawezekana, kuwa na mashine maalum kwa ajili ya nodi yako tu kunaweza kuongeza utendaji na usalama wake kwa kiasi kikubwa huku ukipunguza athari kwenye kompyuta yako kuu.

Kutumia vifaa vyako mwenyewe kunaweza kuwa rahisi sana. Kuna chaguo nyingi rahisi pamoja na mipangilio ya kina kwa watu wa kiufundi zaidi. Kwa hivyo hebu tuangalie mahitaji na njia za kuendesha wateja wa Ethereum kwenye mashine yako.

#### Mahitaji {#requirements}

Mahitaji ya vifaa hutofautiana kulingana na mteja lakini kwa ujumla si ya juu sana kwa kuwa nodi inahitaji tu kusalia katika usawazishaji. Usichanganye na uchimbaji, ambao unahitaji nguvu zaidi ya kompyuta. Hata hivyo, muda wa usawazishaji na utendaji huboreka ukiwa na vifaa vyenye nguvu zaidi.

Kabla ya kusakinisha mteja yeyote, tafadhali hakikisha kompyuta yako ina rasilimali za kutosha kuiendesha. Unaweza kupata mahitaji ya chini na yaliyopendekezwa hapa chini.

Kikwazo kwa vifaa vyako mara nyingi ni nafasi ya diski. Kusawazisha mnyororo wa vitalu wa Ethereum kunahitaji uingizaji/utolewaji mwingi na kunahitaji nafasi nyingi. Ni bora kuwa na **hifadhi ya hali dhabiti (SSD)** yenye mamia ya GB za nafasi ya bure ya kuhifadhi hata baada ya usawazishaji.

Ukubwa wa hifadhidata na kasi ya usawazishaji wa awali inategemea mteja aliyechaguliwa, usanidi wake na [mkakati wa usawazishaji](/developers/docs/nodes-and-clients/#sync-modes).

Pia hakikisha muunganisho wako wa intaneti hauzuiliwi na [kikomo cha kipimo data](https://wikipedia.org/wiki/Data_cap). Inapendekezwa kutumia muunganisho usio na kikomo kwa kuwa usawazishaji wa awali na data inayotangazwa kwenye mtandao inaweza kuzidi kikomo chako.

##### Mfumo wa uendeshaji

Wateja wote wanaauni mifumo mikuu ya uendeshaji - Linux, macOS, Windows. Hii inamaanisha unaweza kuendesha nodi kwenye kompyuta za kawaida za mezani au mashine za seva zilizo na mfumo wa uendeshaji (OS) unaokufaa zaidi. Hakikisha OS yako imesasishwa ili kuepuka matatizo yanayoweza kutokea na udhaifu wa usalama.

##### Mahitaji ya chini

- CPU yenye core 2+
- RAM ya GB 8
- SSD ya TB 2
- Kipimo data cha MBit/s 10+

##### Vipimo vilivyopendekezwa

- CPU ya haraka yenye core 4+
- RAM ya GB 16+
- SSD ya haraka yenye TB 2+
- Kipimo data cha MBit/s 25+

Hali ya usawazishaji na mteja unayemchagua itaathiri mahitaji ya nafasi, lakini tumekadiria nafasi ya diski utakayohitaji kwa kila mteja hapa chini.

| Mteja      | Ukubwa wa diski (usawazishaji wa snap) | Ukubwa wa diski (kumbukumbu kamili) |
| ---------- | -------------------------------------- | ----------------------------------- |
| Besu       | 800GB+                                 | 12TB+                               |
| Erigon     | N/A                                    | 2.5TB+                              |
| Geth       | 500GB+                                 | 12TB+                               |
| Nethermind | 500GB+                                 | 12TB+                               |
| Reth       | N/A                                    | 2.2TB+                              |

- Kumbuka: Erigon na Reth hazitoi usawazishaji wa snap, lakini Upunguzaji Kamili unawezekana (\~2TB kwa Erigon, ~1.2TB kwa Reth)

Kwa wateja wa mwafaka, hitaji la nafasi pia linategemea utekelezaji wa mteja na vipengele vilivyowezeshwa (k.m., mkataji wa mthibitishaji) lakini kwa ujumla hesabu na GB 200 nyingine zinazohitajika kwa data ya kinara. Pamoja na idadi kubwa ya wathibitishaji, mzigo wa kipimo data unakua pia. Unaweza kupata [maelezo kuhusu mahitaji ya mteja wa mwafaka katika uchambuzi huu](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc).

#### Suluhu za chomeka-na-cheza {#plug-and-play}

Chaguo rahisi zaidi la kuendesha nodi na vifaa vyako mwenyewe ni kutumia masanduku ya chomeka-na-cheza. Mashine zilizosanidiwa mapema kutoka kwa wachuuzi hutoa uzoefu wa moja kwa moja: agiza, unganisha, endesha. Kila kitu kimesanidiwa mapema na kinafanya kazi kiotomatiki na mwongozo angavu na dashibodi ya kufuatilia na kudhibiti programu.

- [DAppNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### Ethereum kwenye kompyuta ya bodi moja {#ethereum-on-a-single-board-computer}

Njia rahisi na ya bei nafuu ya kuendesha nodi ya Ethereum ni kutumia kompyuta ya bodi moja, hata yenye usanifu wa ARM kama Raspberry Pi. [Ethereum kwenye ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) hutoa picha zilizo rahisi kuendesha za wateja wengi wa utekelezaji na mwafaka kwa Raspberry Pi na bodi nyingine za ARM.

Vifaa vidogo, vya bei nafuu na vyenye ufanisi kama hivi ni bora kwa kuendesha nodi nyumbani lakini kumbuka utendaji wao mdogo.

## Kuanzisha nodi {#spinning-up-node}

Usanidi halisi wa mteja unaweza kufanywa ama kwa vizindua vya kiotomatiki au kwa mikono, kusanidi programu ya mteja moja kwa moja.

Kwa watumiaji wasio na uzoefu sana, mbinu inayopendekezwa ni kutumia kizindua, programu inayokuongoza kupitia usakinishaji na kufanya mchakato wa usanidi wa mteja kiotomatiki. Hata hivyo, ikiwa una uzoefu fulani wa kutumia terminali, hatua za usanidi wa mikono zinapaswa kuwa rahisi kufuata.

### Usanidi unaoongozwa {#automatized-setup}

Miradi mingi inayofaa kwa watumiaji inalenga kuboresha uzoefu wa kusanidi mteja. Vizindua hivi hutoa usakinishaji na usanidi wa mteja kiotomatiki, huku vingine hata vikitoa kiolesura cha picha kwa usanidi unaoongozwa na ufuatiliaji wa wateja.

Hapa chini kuna miradi michache inayoweza kukusaidia kusakinisha na kudhibiti wateja kwa kubofya mara chache tu:

- [DAppNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) - DAppNode haiji tu na mashine kutoka kwa mchuuzi. Programu, kizindua halisi cha nodi na kituo cha udhibiti chenye vipengele vingi vinaweza kutumika kwenye vifaa vyovyote.
- [EthPillar](https://www.coincashew.com/coins/overview-eth/ethpillar) - Njia ya haraka na rahisi zaidi ya kusanidi nodi kamili. Zana ya usanidi ya mstari mmoja na TUI ya usimamizi wa nodi. Bure. Chanzo wazi. Bidhaa za umma kwa Ethereum na waweka dhamana wa kujitegemea. Usaidizi wa ARM64 na AMD64.
- [eth-docker](https://eth-docker.net/) - Usanidi wa kiotomatiki kwa kutumia Docker unaolenga uwekaji dhamana rahisi na salama, unahitaji ujuzi wa kimsingi wa terminali na Docker, unapendekezwa kwa watumiaji wa hali ya juu kidogo.
- [Stereum](https://stereum-dev.github.io/ethereum-node-web-docs) - Kizindua cha kusakinisha wateja kwenye seva ya mbali kupitia muunganisho wa SSH na mwongozo wa usanidi wa GUI, kituo cha udhibiti, na vipengele vingine vingi.
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) - Zana ya usanidi wa nodi ambayo inazalisha kiotomatiki usanidi wa Docker kwa kutumia mchawi wa CLI. Imeandikwa katika Go na Nethermind.
- [Chainstack Self-Hosted](https://docs.chainstack.com/docs/self-hosted/introduction) - Web UI na CLI kwa ajili ya kusambaza wateja wa utekelezaji na mwafaka kwenye Kubernetes. Bootstrap ya Snapshot na ufuatiliaji uliojengewa ndani umejumuishwa. Bure. Hakuna akaunti ya Chainstack inayohitajika. Imejengwa na Chainstack.

### Usanidi wa wateja kwa mikono {#manual-setup}

Chaguo jingine ni kupakua, kuthibitisha, na kusanidi programu ya mteja kwa mikono. Hata kama baadhi ya wateja wanatoa kiolesura cha picha, usanidi wa mikono bado unahitaji ujuzi wa kimsingi na terminali lakini unatoa uwezo mwingi zaidi.

Kama ilivyoelezwa hapo awali, kusanidi nodi yako mwenyewe ya Ethereum kutahitaji kuendesha jozi ya wateja wa mwafaka na utekelezaji. Baadhi ya wateja wanaweza kujumuisha kiteja chepesi cha aina nyingine na kusawazisha bila programu nyingine yoyote inayohitajika. Hata hivyo, uthibitishaji kamili bila hitaji la uaminifu unahitaji utekelezaji wote wawili.

#### Kupata programu ya mteja {#getting-the-client}

Kwanza, unahitaji kupata programu yako unayopendelea ya [kiteja cha utekelezaji](/developers/docs/nodes-and-clients/#execution-clients) na [mteja wa mwafaka](/developers/docs/nodes-and-clients/#consensus-clients).

Unaweza kupakua tu programu inayoweza kutekelezwa au kifurushi cha usakinishaji kinachofaa mfumo wako wa uendeshaji na usanifu. Kila mara thibitisha sahihi na checksums za vifurushi vilivyopakuliwa. Baadhi ya wateja pia hutoa hazina au picha za Docker kwa usakinishaji na masasisho rahisi zaidi. Wateja wote ni chanzo wazi, kwa hivyo unaweza pia kuwajenga kutoka kwa chanzo. Hii ni njia ya juu zaidi, lakini katika baadhi ya matukio, inaweza kuhitajika.

Maagizo ya kusakinisha kila mteja yametolewa katika nyaraka zilizounganishwa katika orodha za wateja hapo juu.

Hapa kuna kurasa za matoleo ya wateja ambapo unaweza kupata binaries zao zilizojengwa mapema au maagizo juu ya usakinishaji:

##### Wateja wa utekelezaji

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads)
- [Nethermind](https://downloads.nethermind.io/)
- [Reth](https://reth.rs/installation/installation.html)

Inafaa pia kuzingatia kwamba anuwai ya wateja ni [suala kwenye tabaka la utekelezaji](/developers/docs/nodes-and-clients/client-diversity/#execution-layer). Inapendekezwa kwamba wasomaji wafikirie kuendesha kiteja cha utekelezaji cha wachache.

##### Wateja wa mwafaka

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/run/getting-started/installation#build-from-source/) (Haitoi binary iliyojengwa mapema, picha ya Docker pekee au kujengwa kutoka kwa chanzo)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

[Anuwai ya wateja](/developers/docs/nodes-and-clients/client-diversity/) ni muhimu kwa nodi za mwafaka zinazoendesha wathibitishaji. Ikiwa wengi wa wathibitishaji wanaendesha utekelezaji wa mteja mmoja, usalama wa mtandao uko hatarini. Kwa hivyo inapendekezwa kufikiria kuchagua mteja wa wachache.

[Angalia matumizi ya hivi punde ya mteja wa mtandao](https://clientdiversity.org/) na ujifunze zaidi kuhusu [anuwai ya wateja](/developers/docs/nodes-and-clients/client-diversity).

##### Kuthibitisha programu

Unapopakua programu kutoka kwenye intaneti, inapendekezwa kuthibitisha uadilifu wake. Hatua hii ni ya hiari lakini hasa kwa kipande muhimu cha miundombinu kama mteja wa Ethereum, ni muhimu kufahamu vekta zinazoweza kushambulia na kuziepuka. Ikiwa ulipakua binary iliyojengwa mapema, unahitaji kuiamini na kuhatarisha kwamba mshambuliaji anaweza kubadilisha inayoweza kutekelezwa kwa mbaya.

Wasanidi programu hutia saini binaries zilizotolewa na funguo zao za PGP ili uweze kuthibitisha kwa njia ya kriptografia kuwa unaendesha programu haswa waliyounda. Unahitaji tu kupata funguo za umma zinazotumiwa na wasanidi programu, ambazo zinaweza kupatikana kwenye kurasa za matoleo ya mteja au katika nyaraka. Baada ya kupakua toleo la mteja na sahihi yake, unaweza kutumia utekelezaji wa PGP, k.m., [GnuPG](https://gnupg.org/download/index.html) ili kuzithibitisha kwa urahisi. Angalia mafunzo kuhusu kuthibitisha programu huria kwa kutumia `gpg` kwenye [Linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) au [Windows/macOS](https://freedom.press/training/verifying-open-source-software/).

Njia nyingine ya uthibitishaji ni kuhakikisha kwamba heshi, alama ya kipekee ya kriptografia, ya programu uliyopakua inalingana na ile iliyotolewa na wasanidi programu. Hii ni rahisi zaidi kuliko kutumia PGP, na baadhi ya wateja hutoa chaguo hili pekee. Endesha tu kazi ya heshi kwenye programu iliyopakuliwa na uilinganishe na ile kutoka kwenye ukurasa wa toleo. Kwa mfano:

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### Usanidi wa mteja {#client-setup}

Baada ya kusakinisha, kupakua, au kukusanya programu ya mteja, uko tayari kuiendesha. Hii inamaanisha tu inapaswa kutekelezwa na usanidi sahihi. Wateja hutoa chaguo tajiri za usanidi, ambazo zinaweza kuwezesha vipengele mbalimbali.

Hebu tuanze na chaguo zinazoweza kuathiri kwa kiasi kikubwa utendaji wa mteja na matumizi ya data. [Njia za usawazishaji](/developers/docs/nodes-and-clients/#sync-modes) zinawakilisha mbinu tofauti za kupakua na kuthibitisha data ya mnyororo wa vitalu. Kabla ya kuanzisha nodi, unapaswa kuamua ni mtandao gani na hali gani ya usawazishaji ya kutumia. Mambo muhimu zaidi ya kuzingatia ni nafasi ya diski, na muda wa usawazishaji ambao mteja atahitaji. Zingatia nyaraka za mteja ili kubaini ni hali gani ya usawazishaji iliyo chaguo-msingi. Ikiwa hiyo haikufai, chagua nyingine kulingana na kiwango cha usalama, data inayopatikana, na gharama. Mbali na algoriti ya usawazishaji, unaweza pia kuweka upunguzaji wa aina tofauti za data ya zamani. Upunguzaji huwezesha kufuta data iliyopitwa na wakati, yaani, kuondoa nodi za trie ya hali ambazo hazifikiki kutoka kwa vitalu vya hivi karibuni.

Chaguo zingine za msingi za usanidi ni, k.m., kuchagua mtandao - Mtandao Mkuu au mitandao ya majaribio, kuwezesha mwisho wa HTTP kwa RPC au WebSockets, n.k. Unaweza kupata vipengele na chaguo zote katika nyaraka za mteja. Mipangilio mbalimbali ya mteja inaweza kuwekwa kwa kutekeleza mteja na bendera zinazolingana moja kwa moja kwenye CLI au faili ya usanidi. Kila mteja ni tofauti kidogo; tafadhali kila mara rejelea nyaraka zake rasmi au ukurasa wa usaidizi kwa maelezo kuhusu chaguo za usanidi.

Kwa madhumuni ya majaribio, unaweza kupendelea kuendesha mteja kwenye mojawapo ya mitandao ya majaribio. [Angalia muhtasari wa mitandao inayoungwa mkono](/developers/docs/nodes-and-clients/#execution-clients).

Mifano ya kuendesha wateja wa utekelezaji na usanidi wa msingi inaweza kupatikana katika sehemu inayofuata.

#### Kuanzisha kiteja cha utekelezaji {#starting-the-execution-client}

Kabla ya kuanzisha programu ya mteja wa Ethereum, fanya ukaguzi wa mwisho kwamba mazingira yako yako tayari. Kwa mfano, hakikisha:

- Kuna nafasi ya kutosha ya diski ukizingatia mtandao uliochaguliwa na hali ya usawazishaji.
- Kumbukumbu na CPU hazijasimamishwa na programu zingine.
- Mfumo wa uendeshaji umesasishwa hadi toleo la hivi punde.
- Mfumo una muda na tarehe sahihi.
- Rota yako na ngome zinakubali miunganisho kwenye bandari za kusikiliza. Kwa chaguo-msingi wateja wa Ethereum hutumia bandari ya msikilizaji (TCP) na bandari ya ugunduzi (UDP), zote kwenye 30303 kwa chaguo-msingi.

Endesha mteja wako kwenye mtandao wa majaribio kwanza ili kusaidia kuhakikisha kila kitu kinafanya kazi kwa usahihi.

Unahitaji kutangaza mipangilio yoyote ya mteja ambayo si chaguo-msingi mwanzoni. Unaweza kutumia bendera au faili ya usanidi kutangaza usanidi wako unaopendelea. Seti ya vipengele na sintaksia ya usanidi ya kila mteja inatofautiana. Angalia nyaraka za mteja wako kwa maelezo mahususi.

Wateja wa utekelezaji na mwafaka huwasiliana kupitia mwisho uliothibitishwa uliobainishwa katika [API ya Injini](https://github.com/ethereum/execution-apis/tree/main/src/engine). Ili kuunganisha kwa mteja wa mwafaka, kiteja cha utekelezaji lazima kizalise [`jwtsecret`](https://jwt.io/) kwenye njia inayojulikana. Kwa sababu za usalama na uthabiti, wateja wanapaswa kufanya kazi kwenye mashine moja, na wateja wote wawili lazima wajue njia hii kwani inatumika kuthibitisha muunganisho wa RPC wa ndani kati yao. Kiteja cha utekelezaji lazima pia kifafanue bandari ya kusikiliza kwa API zilizothibitishwa.

Tokeni hii inazalishwa kiotomatiki na programu ya mteja, lakini katika baadhi ya matukio, unaweza kuhitaji kuifanya mwenyewe. Unaweza kuizalisha kwa kutumia [OpenSSL](https://www.openssl.org/):

```sh
openssl rand -hex 32 > jwtsecret
```

#### Kuendesha kiteja cha utekelezaji {#running-an-execution-client}

Sehemu hii itakuongoza kupitia kuanzisha wateja wa utekelezaji. Inatumika tu kama mfano wa usanidi wa msingi, ambao utaanzisha mteja na mipangilio hii:

- Inabainisha mtandao wa kuunganisha, Mtandao Mkuu katika mifano yetu
  - Unaweza badala yake kuchagua [mojawapo ya mitandao ya majaribio](/developers/docs/networks/) kwa majaribio ya awali ya usanidi wako
- Inafafanua saraka ya data, ambapo data yote ikiwa ni pamoja na mnyororo wa vitalu itahifadhiwa
  - Hakikisha unabadilisha njia na ile halisi, k.m., inayoelekeza kwenye hifadhi yako ya nje
- Inawezesha violesura vya kuwasiliana na mteja
  - Ikiwa ni pamoja na JSON-RPC na API ya Injini kwa mawasiliano na mteja wa mwafaka
- Inafafanua njia ya `jwtsecret` kwa API iliyothibitishwa
  - Hakikisha unabadilisha njia ya mfano na ile halisi inayoweza kufikiwa na wateja, k.m., `/tmp/jwtsecret`

Tafadhali kumbuka kuwa huu ni mfano wa msingi tu, mipangilio mingine yote itawekwa kwa chaguo-msingi. Zingatia nyaraka za kila mteja ili kujifunza kuhusu thamani za chaguo-msingi, mipangilio, na vipengele. Kwa vipengele zaidi, kwa mfano kwa kuendesha wathibitishaji, ufuatiliaji, n.k., tafadhali rejelea nyaraka za mteja mahususi.

> Kumbuka kwamba mikwaju ya nyuma `\` katika mifano ni kwa madhumuni ya uumbizaji tu; bendera za usanidi zinaweza kufafanuliwa katika mstari mmoja.

##### Kuendesha Besu

Mfano huu unaanzisha Besu kwenye Mtandao Mkuu, unahifadhi data ya mnyororo wa vitalu katika umbizo la chaguo-msingi kwenye `/data/ethereum`, unawezesha JSON-RPC na RPC ya Injini kwa kuunganisha mteja wa mwafaka. API ya Injini inathibitishwa na tokeni `jwtsecret` na simu tu kutoka `localhost` zinaruhusiwa.

```sh
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

Besu pia inakuja na chaguo la kizindua ambalo litauliza mfululizo wa maswali na kuzalisha faili ya usanidi. Endesha kizindua shirikishi kwa kutumia:

```sh
besu --Xlauncher
```

[Nyaraka za Besu](https://besu.hyperledger.org/public-networks/get-started/start-node/) zina chaguo za ziada na maelezo ya usanidi.

##### Kuendesha Erigon

Mfano huu unaanzisha Erigon kwenye Mtandao Mkuu, unahifadhi data ya mnyororo wa vitalu kwenye `/data/ethereum`, unawezesha JSON-RPC, unafafanua ni nafasi gani za majina zinaruhusiwa na unawezesha uthibitishaji kwa kuunganisha mteja wa mwafaka ambao unafafanuliwa na njia ya `jwtsecret`.

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Erigon kwa chaguo-msingi hufanya usawazishaji kamili na HDD ya 8GB ambayo itasababisha zaidi ya 2TB ya data ya kumbukumbu. Hakikisha `datadir` inaelekeza kwenye diski yenye nafasi ya kutosha ya bure au angalia bendera ya `--prune` ambayo inaweza kupunguza aina tofauti za data. Angalia `--help` ya Erigon ili kujifunza zaidi.

##### Kuendesha Geth

Mfano huu unaanzisha Geth kwenye Mtandao Mkuu, unahifadhi data ya mnyororo wa vitalu kwenye `/data/ethereum`, unawezesha JSON-RPC na unafafanua ni nafasi gani za majina zinaruhusiwa. Pia inawezesha uthibitishaji kwa kuunganisha mteja wa mwafaka ambao unahitaji njia ya `jwtsecret` na pia chaguo linalofafanua ni miunganisho gani inaruhusiwa, katika mfano wetu tu kutoka `localhost`.

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Angalia [nyaraka kwa chaguo zote za usanidi](https://geth.ethereum.org/docs/fundamentals/command-line-options) na ujifunze zaidi kuhusu [kuendesha Geth na mteja wa mwafaka](https://geth.ethereum.org/docs/getting-started/consensus-clients).

##### Kuendesha Nethermind

Nethermind inatoa [chaguo mbalimbali za usakinishaji](https://docs.nethermind.io/get-started/installing-nethermind). Kifurushi kinakuja na binaries mbalimbali, ikiwa ni pamoja na Kizindua chenye usanidi unaoongozwa, ambacho kitakusaidia kuunda usanidi kwa mwingiliano. Vinginevyo, unapata Mwendeshaji ambayo ni inayoweza kutekelezwa yenyewe na unaweza kuiendesha tu na bendera za usanidi. JSON-RPC imewezeshwa kwa chaguo-msingi.

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

Nyaraka za Nethermind zinatoa [mwongozo kamili](https://docs.nethermind.io/get-started/running-node/) wa kuendesha Nethermind na mteja wa mwafaka.

Kiteja cha utekelezaji kitaanzisha kazi zake za msingi, miisho iliyochaguliwa, na kuanza kutafuta rika. Baada ya kugundua rika kwa mafanikio, mteja anaanza usawazishaji. Kiteja cha utekelezaji kitasubiri muunganisho kutoka kwa mteja wa mwafaka. Data ya sasa ya mnyororo wa vitalu itapatikana mara tu mteja atakaposawazishwa kwa mafanikio kwa hali ya sasa.

##### Kuendesha Reth

Mfano huu unaanzisha Reth kwenye Mtandao Mkuu, kwa kutumia eneo la data la chaguo-msingi. Inawezesha uthibitishaji wa JSON-RPC na RPC ya Injini kwa kuunganisha mteja wa mwafaka ambao unafafanuliwa na njia ya `jwtsecret`, na simu tu kutoka `localhost` zinaruhusiwa.

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

Angalia [Kusanidi Reth](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth) ili kujifunza zaidi kuhusu saraka za data za chaguo-msingi. [Nyaraka za Reth](https://reth.rs/run/mainnet.html) zina chaguo za ziada na maelezo ya usanidi.

#### Kuanzisha mteja wa mwafaka {#starting-the-consensus-client}

Mteja wa mwafaka lazima aanzishwe na usanidi sahihi wa bandari ili kuanzisha muunganisho wa RPC wa ndani kwa kiteja cha utekelezaji. Wateja wa mwafaka wanapaswa kuendeshwa na bandari ya kiteja cha utekelezaji iliyofichuliwa kama hoja ya usanidi.

Mteja wa mwafaka pia anahitaji njia ya `jwt-secret` ya kiteja cha utekelezaji ili kuthibitisha muunganisho wa RPC kati yao. Sawa na mifano ya utekelezaji hapo juu, kila mteja wa mwafaka ana bendera ya usanidi ambayo inachukua njia ya faili ya tokeni ya jwt kama hoja. Hii lazima iwe sawa na njia ya `jwtsecret` iliyotolewa kwa kiteja cha utekelezaji.

Ikiwa unapanga kuendesha mthibitishaji, hakikisha unaongeza bendera ya usanidi inayobainisha anwani ya Ethereum ya mpokeaji wa ada. Hapa ndipo zawadi za Etha kwa mthibitishaji wako hujilimbikiza. Kila mteja wa mwafaka ana chaguo, k.m., `--suggested-fee-recipient=0xabcd1`, ambalo linachukua anwani ya Ethereum kama hoja.

Unapoanzisha Nodi ya Kinara kwenye mtandao wa majaribio, unaweza kuokoa muda mwingi wa kusawazisha kwa kutumia mwisho wa umma kwa [Usawazishaji wa kituo cha ukaguzi](https://notes.ethereum.org/@launchpad/checkpoint-sync).

#### Kuendesha mteja wa mwafaka {#running-a-consensus-client}

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

Nimbus inakuja na wateja wote wa mwafaka na utekelezaji. Inaweza kuendeshwa kwenye vifaa mbalimbali hata vyenye nguvu ndogo sana ya kompyuta.
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

Wakati mteja wa mwafaka anapounganishwa na kiteja cha utekelezaji ili kusoma mkataba wa amana na kutambua wathibitishaji, pia huunganishwa na rika zingine za Nodi ya Kinara na kuanza kusawazisha nafasi za mwafaka kutoka mwanzo. Mara tu Nodi ya Kinara inapofikia kipindi cha sasa, API ya Kinara inakuwa inatumika kwa wathibitishaji wako. Jifunze zaidi kuhusu [API za Nodi ya Kinara](https://ethereum.github.io/beacon-APIs).

### Kuongeza Wathibitishaji {#adding-validators}

Mteja wa mwafaka hutumika kama Nodi ya Kinara kwa wathibitishaji kuunganishwa. Kila mteja wa mwafaka ana programu yake ya mthibitishaji iliyoelezwa kwa kina katika nyaraka zake husika.

Kuendesha mthibitishaji wako mwenyewe kunaruhusu [uwekaji dhamana wa kujitegemea](/staking/solo/), mbinu yenye athari zaidi na isiyo na hitaji la uaminifu kusaidia mtandao wa Ethereum. Hata hivyo, hii inahitaji amana ya ETH 32. Ili kuendesha mthibitishaji kwenye nodi yako mwenyewe kwa kiasi kidogo, bwawa lililogatuliwa na waendeshaji wa nodi bila ruhusa, kama vile [Rocket Pool](https://rocketpool.net/node-operators), linaweza kukuvutia.

Njia rahisi zaidi ya kuanza na uwekaji dhamana na uzalishaji wa ufunguo wa mthibitishaji ni kutumia [Kizinduzi cha Uwekezaji Dhamana cha Mtandao wa Majaribio wa Hoodi](https://hoodi.launchpad.ethereum.org/), ambacho kinakuruhusu kujaribu usanidi wako kwa [kuendesha nodi kwenye Hoodi](https://notes.ethereum.org/@launchpad/hoodi). Ukiwa tayari kwa Mtandao Mkuu, unaweza kurudia hatua hizi kwa kutumia [Kizinduzi cha Uwekezaji Dhamana cha Mtandao Mkuu](https://launchpad.ethereum.org/).

Angalia [ukurasa wa uwekaji dhamana](/staking) kwa muhtasari kuhusu chaguo za uwekaji dhamana.

### Kutumia nodi {#using-the-node}

Wateja wa utekelezaji hutoa [miisho ya API ya RPC](/developers/docs/apis/json-rpc/) ambayo unaweza kutumia kuwasilisha miamala, kuingiliana na au kusambaza mikataba mahiri kwenye mtandao wa Ethereum kwa njia mbalimbali:

- Kuziita kwa mikono na itifaki inayofaa (k.m., kwa kutumia `curl`)
- Kuambatisha kiweko kilichotolewa (k.m., `geth attach`)
- Kuzitekeleza katika programu kwa kutumia maktaba za Web3, k.m., [Web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io/ethers.js/)

Wateja tofauti wana utekelezaji tofauti wa miisho ya RPC. Lakini kuna JSON-RPC ya kawaida ambayo unaweza kutumia na kila mteja. Kwa muhtasari [soma nyaraka za JSON-RPC](/developers/docs/apis/json-rpc/). Programu zinazohitaji taarifa kutoka kwa mtandao wa Ethereum zinaweza kutumia RPC hii. Kwa mfano, mkoba maarufu wa MetaMask unakuruhusu [kuunganisha kwenye mwisho wako mwenyewe wa RPC](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) ambao una faida kubwa za faragha na usalama.

Wateja wote wa mwafaka hufichua [API ya Kinara](https://ethereum.github.io/beacon-APIs) ambayo inaweza kutumika kuangalia hali ya mteja wa mwafaka au kupakua vitalu na data ya mwafaka kwa kutuma maombi kwa kutumia zana kama vile [Curl](https://curl.se). Maelezo zaidi kuhusu hili yanaweza kupatikana katika nyaraka za kila mteja wa mwafaka.

#### Kufikia RPC {#reaching-rpc}

Bandari ya chaguo-msingi ya JSON-RPC ya kiteja cha utekelezaji ni `8545` lakini unaweza kurekebisha bandari za miisho ya ndani katika usanidi. Kwa chaguo-msingi, kiolesura cha RPC kinafikiwa tu kwenye mwenyeji wa ndani wa kompyuta yako. Ili kuifanya ifikiwe kwa mbali, unaweza kutaka kuifichua kwa umma kwa kubadilisha anwani kuwa `0.0.0.0`. Hii itaifanya ifikiwe kupitia mtandao wa ndani na anwani za IP za umma. Katika hali nyingi utahitaji pia kusanidi usambazaji wa bandari kwenye rota yako.

Fikia kufichua bandari kwenye intaneti kwa tahadhari kwani hii itamruhusu mtu yeyote kwenye intaneti kudhibiti nodi yako. Watendaji wabaya wanaweza kufikia nodi yako ili kuangusha mfumo wako au kuiba pesa zako ikiwa unatumia mteja wako kama mkoba.

Njia ya kuepuka hili ni kuzuia mbinu za RPC zinazoweza kudhuru zisiweze kurekebishwa. Kwa mfano, ukiwa na Geth, unaweza kutangaza mbinu zinazoweza kurekebishwa kwa bendera: `--http.api web3,eth,txpool`.

Ufikiaji wa kiolesura cha RPC unaweza kupanuliwa kupitia uundaji wa API za tabaka la ukingo au programu za seva ya wavuti, kama Nginx, na kuziunganisha kwenye anwani na bandari ya ndani ya mteja wako. Kutumia tabaka la kati kunaweza pia kuruhusu wasanidi programu uwezo wa kusanidi cheti kwa miunganisho salama ya `https` kwenye kiolesura cha RPC.

Kusanidi seva ya wavuti, proksi, au Rest API inayoangalia nje sio njia pekee ya kutoa ufikiaji wa mwisho wa RPC wa nodi yako. Njia nyingine ya kuhifadhi faragha ya kusanidi mwisho unaofikiwa na umma ni kupangisha nodi kwenye huduma yako mwenyewe ya kitunguu ya [Tor](https://www.torproject.org/). Hii itakuruhusu kufikia RPC nje ya mtandao wako wa ndani bila anwani ya IP ya umma isiyobadilika au bandari zilizofunguliwa. Hata hivyo, kutumia usanidi huu kunaweza tu kuruhusu mwisho wa RPC kufikiwa kupitia mtandao wa Tor ambao hauungwi mkono na programu zote na unaweza kusababisha matatizo ya muunganisho.

Ili kufanya hivi, lazima uunde [huduma yako ya kitunguu](https://community.torproject.org/onion-services/). Angalia [nyaraka](https://community.torproject.org/onion-services/setup/) kuhusu usanidi wa huduma ya kitunguu ili kupangisha yako mwenyewe. Unaweza kuielekeza kwenye seva ya wavuti yenye proksi kwenye bandari ya RPC au moja kwa moja kwenye RPC.

Mwisho, na mojawapo ya njia maarufu zaidi za kutoa ufikiaji wa mitandao ya ndani ni kupitia muunganisho wa VPN. Kulingana na kesi yako ya matumizi na idadi ya watumiaji wanaohitaji ufikiaji wa nodi yako, muunganisho salama wa VPN unaweza kuwa chaguo. [OpenVPN](https://openvpn.net/) ni SSL VPN yenye vipengele kamili ambayo inatekeleza upanuzi wa mtandao salama wa tabaka la 2 au 3 la OSI kwa kutumia itifaki ya kiwango cha sekta ya SSL/TLS, inasaidia mbinu rahisi za uthibitishaji wa mteja kulingana na vyeti, kadi mahiri, na/au vitambulisho vya jina la mtumiaji/nenosiri, na inaruhusu sera za udhibiti wa ufikiaji mahususi kwa mtumiaji au kikundi kwa kutumia sheria za ngome zinazotumika kwenye kiolesura cha mtandaoni cha VPN.

### Kuendesha nodi {#operating-the-node}

Unapaswa kufuatilia nodi yako mara kwa mara ili kuhakikisha inafanya kazi vizuri. Unaweza kuhitaji kufanya matengenezo ya mara kwa mara.

#### Kuweka nodi mtandaoni {#keeping-node-online}

Nodi yako si lazima iwe mtandaoni wakati wote, lakini unapaswa kuiweka mtandaoni kadiri iwezekanavyo ili kuiweka katika usawazishaji na mtandao. Unaweza kuizima ili kuiwasha upya, lakini kumbuka kwamba:

- Kuzima kunaweza kuchukua dakika chache ikiwa hali ya hivi karibuni bado inaandikwa kwenye diski.
- Kuzima kwa lazima kunaweza kuharibu hifadhidata na kukuhitaji kusawazisha upya nodi nzima.
- Mteja wako atatoka kwenye usawazishaji na mtandao na atahitaji kusawazisha upya utakapomwasha tena. Ingawa nodi inaweza kuanza kusawazisha kutoka ilipozimwa mara ya mwisho, mchakato unaweza kuchukua muda kulingana na muda ambao imekuwa nje ya mtandao.

_Hii haitumiki kwenye nodi za mthibitishaji wa tabaka la mwafaka._ Kuondoa nodi yako mtandaoni kutaathiri huduma zote zinazoitegemea. Ikiwa unaendesha nodi kwa madhumuni ya _uwekaji dhamana_ unapaswa kujaribu kupunguza muda wa kupumzika kadiri iwezekanavyo.

#### Kuunda huduma za mteja {#creating-client-services}

Fikiria kuunda huduma ili kuendesha wateja wako kiotomatiki wakati wa kuanza. Kwa mfano, kwenye seva za Linux, mazoezi mazuri yatakuwa kuunda huduma, k.m., na `systemd`, ambayo inatekeleza mteja na usanidi sahihi, chini ya mtumiaji aliye na mapendeleo machache na kuanza upya kiotomatiki.

#### Kusasisha wateja {#updating-clients}

Unahitaji kusasisha programu yako ya mteja na viraka vya hivi punde vya usalama, vipengele, na [EIPs](/eips/). Hasa kabla ya [migawanyiko migumu](/ethereum-forks/), hakikisha unaendesha matoleo sahihi ya mteja.

> Kabla ya masasisho muhimu ya mtandao, EF huchapisha chapisho kwenye [blogu](https://blog.ethereum.org) yake. Unaweza [kujiandikisha kwa matangazo haya](https://blog.ethereum.org/category/protocol#subscribe) ili kupata arifa kwenye barua pepe yako wakati nodi yako inahitaji sasisho.

Kusasisha wateja ni rahisi sana. Kila mteja ana maagizo maalum katika nyaraka zao, lakini mchakato kwa ujumla ni kupakua tu toleo la hivi punde na kuanzisha upya mteja na inayoweza kutekelezwa mpya. Mteja anapaswa kuendelea pale alipoishia, lakini na masasisho yaliyotumika.

Kila utekelezaji wa mteja una mfuatano wa toleo unaosomeka na binadamu unaotumika katika itifaki ya rika-kwa-rika lakini pia unafikiwa kutoka kwa mstari wa amri. Mfuatano huu wa toleo huwaruhusu watumiaji kuangalia kuwa wanaendesha toleo sahihi na huruhusu wavumbuzi wa vitalu na zana zingine za uchanganuzi zinazopenda kukadiria usambazaji wa wateja mahususi kwenye mtandao. Tafadhali rejelea nyaraka za mteja binafsi kwa maelezo zaidi kuhusu mifuatano ya matoleo.

#### Kuendesha huduma za ziada {#running-additional-services}

Kuendesha nodi yako mwenyewe kunakuruhusu kutumia huduma zinazohitaji ufikiaji wa moja kwa moja kwa RPC ya mteja wa Ethereum. Hizi ni huduma zilizojengwa juu ya Ethereum kama [suluhu za tabaka la 2 (l2)](/developers/docs/scaling/#layer-2-scaling), mazingira ya nyuma ya mikoba, wavumbuzi wa vitalu, zana za wasanidi programu na miundombinu mingine ya Ethereum.

#### Kufuatilia nodi {#monitoring-the-node}

Ili kufuatilia vizuri nodi yako, fikiria kukusanya vipimo. Wateja hutoa miisho ya vipimo ili uweze kupata data ya kina kuhusu nodi yako. Tumia zana kama [InfluxDB](https://www.influxdata.com/get-influxdb/) au [Prometheus](https://prometheus.io/) kuunda hifadhidata ambazo unaweza kuzigeuza kuwa taswira na chati katika programu kama [Grafana](https://grafana.com/). Kuna mipangilio mingi ya kutumia programu hii na dashibodi tofauti za Grafana ili uweze kuona nodi yako na mtandao kwa ujumla. Kwa mfano, angalia [mafunzo kuhusu kufuatilia Geth](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/).

Kama sehemu ya ufuatiliaji wako, hakikisha unafuatilia utendaji wa mashine yako. Wakati wa usawazishaji wa awali wa nodi yako, programu ya mteja inaweza kuwa nzito sana kwenye CPU na RAM. Mbali na Grafana, unaweza kutumia zana zinazotolewa na OS yako kama `htop` au `uptime` kufanya hivi.

## Usomaji zaidi {#further-reading}

- [Miongozo ya Uwekezaji Dhamana ya Ethereum](https://github.com/SomerEsat/ethereum-staking-guides) - _Somer Esat, inasasishwa mara kwa mara_
- [Mwongozo | Jinsi ya kusanidi mthibitishaji kwa uwekaji dhamana wa Ethereum kwenye Mtandao Mkuu](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew, inasasishwa mara kwa mara_
- [Miongozo ya EthStaker kuhusu kuendesha wathibitishaji kwenye mitandao ya majaribio](https://github.com/remyroy/ethstaker#guides) – _EthStaker, inasasishwa mara kwa mara_
- [Sampuli ya programu ya AWS Blockchain Node Runner kwa Nodi za Ethereum](https://aws-samples.github.io/aws-blockchain-node-runners/docs/blueprints/ethereum) - _AWS, inasasishwa mara kwa mara_
- [Maswali Yanayoulizwa Mara kwa Mara ya Unganisho kwa waendeshaji wa nodi](https://notes.ethereum.org/@launchpad/node-faq-merge) - _Julai 2022_
- [Kuchambua mahitaji ya vifaa ili kuwa nodi kamili iliyothibitishwa ya Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 Septemba 2018_
- [Kuendesha Nodi Kamili za Ethereum: Mwongozo kwa Wasio na Motisha Sana](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 Novemba 2019_
- [Kuendesha Nodi ya Hyperledger Besu kwenye Mtandao Mkuu wa Ethereum: Faida, Mahitaji, na Usanidi](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 Mei 2020_
- [Kusambaza Mteja wa Ethereum wa Nethermind na Rafu ya Ufuatiliaji](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 Julai 2020_

## Mada zinazohusiana {#related-topics}

- [Nodi na wateja](/developers/docs/nodes-and-clients/)
- [Vitalu](/developers/docs/blocks/)
- [Mitandao](/developers/docs/networks/)
