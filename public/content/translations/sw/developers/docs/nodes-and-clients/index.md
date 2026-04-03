---
title: Nodi na wateja
description: Muhtasari wa nodi za Ethereum na programu ya mteja, pamoja na jinsi ya kuanzisha nodi na kwa nini unapaswa kuifanya.
lang: sw
sidebarDepth: 2
---

Ethereum ni mtandao unaosambazwa wa kompyuta (unaojulikana kama nodi) zinazoendesha programu ambazo zinaweza kuthibitisha vizuizi na data ya muamala. Programu lazima iendeshwe kwenye kompyuta yako ili kuigeuza kuwa nodi ya Ethereum. Kuna vipande viwili tofauti vya programu (vinavyojulikana kama 'wateja') vinavyohitajika kuunda nodi.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuelewa dhana ya mtandao wa rika-kwa-rika na [misingi ya EVM](/developers/docs/evm/) kabla ya kuingia ndani zaidi na kuendesha mfano wako mwenyewe wa mteja wa Ethereum. Tazama [utangulizi wetu kwa Ethereum](/developers/docs/intro-to-ethereum/).

Ikiwa wewe ni mgeni kwenye mada ya nodi, tunapendekeza kwanza uangalie utangulizi wetu unaofaa mtumiaji kuhusu [kuendesha nodi ya Ethereum](/run-a-node).

## Nodi na wateja ni nini? {#what-are-nodes-and-clients}

"Node" ni mfano wowote wa programu ya mteja wa Ethereum ambayo imeunganishwa kwa kompyuta nyingine pia inayoendesha programu ya Ethereum, kutengeneza mtandao. Mteja ni utekelezaji wa Ethereum ambao huthibitisha data dhidi ya kanuni za itifaki na kuweka mtandao salama. Nodi inabidi iendeshe wateja wawili: mteja wa makubaliano na mteja wa utekelezaji.

- Mteja wa utekelezaji (pia anajulikana kama Injini ya Utekelezaji, mteja wa EL au aliyekuwa mteja wa Eth1) husikiliza shughuli mpya zinazotangazwa kwenye mtandao, kuzitekeleza katika EVM, na hushikilia hifadhidata ya hivi punde zaidi ya data yote ya sasa ya Ethereum.
- Mteja wa maafikiano (pia hujulikana kama Beacon node, mteja wa CL au aliyekuwa mteja wa Eth2) hutekeleza kanuni ya makubaliano ya uthibitisho wa dau, ambayo huwezesha mtandao kufikia makubaliano kulingana na data iliyoidhinishwa kutoka kwa mteja wa utekelezaji. Pia kuna kipande cha tatu cha programu, kinachojulikana kama 'kithibitishaji' ambacho kinaweza kuongezwa kwa mteja wa makubaliano, kuruhusu nodi kushiriki katika kulinda mtandao.

Wateja hawa hufanya kazi pamoja ili kufuatilia kichwa cha mnyororo wa Ethereum na kuruhusu watumiaji kuingiliana na mtandao wa Ethereum. Muundo wa moduli wenye vipande vingi vya programu vinavyofanya kazi pamoja unaitwa [utata uliofungwa](https://vitalik.eth.limo/general/2022/02/28/complexity.html). Mbinu hii imerahisisha kutekeleza [The Merge](/roadmap/merge) bila mshono, hurahisisha kudumisha na kuendeleza programu ya mteja, na kuwezesha utumiaji tena wa wateja binafsi, kwa mfano, katika [mfumo ikolojia wa safu ya 2](/layer-2/).

![Wateja wa utekelezaji na makubaliano waliounganishwa](./eth1eth2client.png)
Mchoro uliorahisishwa wa mteja wa utekelezaji na makubaliano uliounganishwa.

### Utofauti wa wateja {#client-diversity}

[Wateja wa utekelezaji](/developers/docs/nodes-and-clients/#execution-clients) na [wateja wa makubaliano](/developers/docs/nodes-and-clients/#consensus-clients) hupatikana katika lugha mbalimbali za programu zilizotengenezwa na timu tofauti.

Utekelezaji wa wateja wengi unaweza kufanya mtandao kuwa na nguvu zaidi kwa kupunguza utegemezi wake kwenye msingi mmoja wa msimbo. Lengo bora ni kufikia utofauti bila mteja yeyote kutawala mtandao, na hivyo kuondoa uwezekano wa kutofaulu.
Lugha mbalimbali pia hualika jumuiya pana ya wasanidi programu na kuwaruhusu kuunda miunganisho katika lugha wanayopendelea.

Jifunze zaidi kuhusu [anuwai ya wateja](/developers/docs/nodes-and-clients/client-diversity/).

Kitu ambacho utekelezaji huu unafanana ni kwamba zote hufuata vipimo maalum kimoja. Vipimo maalum huamua jinsi mtandao wa Ethereum na mnyororo wa bloku hufanya kazi. Kila maelezo ya kiufundi yamefafanuliwa na vipimo maalum vinaweza kupatikana kama:

- Hapo awali, [Karatasi ya Njano ya Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Vipimo maalum vya utekelezaji](https://github.com/ethereum/execution-specs/)
- [Vipimo maalum vya makubaliano](https://github.com/ethereum/consensus-specs)
- [EIPs](https://eips.ethereum.org/) zilizotekelezwa katika [maboresho mbalimbali ya mtandao](/ethereum-forks/)

### Kufuatilia nodi kwenye mtandao {#network-overview}

Vifuatiliaji vingi hutoa muhtasari wa wakati halisi wa nodi katika mtandao wa Ethereum. Kumbuka kuwa kutokana na hali ya mitandao iliyotawanywa, watafutaji hawa wanaweza tu kutoa mwonekano mdogo wa mtandao na wanaweza kuripoti matokeo tofauti.

- [Ramani ya nodi](https://etherscan.io/nodetracker) na Etherscan
- [Ethernodes](https://ethernodes.org/) na Bitfly
- [Nodewatch](https://www.nodewatch.io/) na Chainsafe, inayotambaa kwenye nodi za makubaliano
- [Monitoreth](https://monitoreth.io/) - na MigaLabs, Zana ya ufuatiliaji wa mtandao uliosambazwa
- [Ripoti za Afya za Mtandao za Kila Wiki](https://probelab.io) - na ProbeLab, Inatumia [kitambaaji cha Nebula](https://github.com/dennis-tra/nebula) na zana zingine

## Aina za nodi {#node-types}

Ikiwa unataka [kuendesha nodi yako mwenyewe](/developers/docs/nodes-and-clients/run-a-node/), unapaswa kuelewa kuwa kuna aina tofauti za nodi zinazotumia data kwa njia tofauti. Kwa hakika, wateja wanaweza kuendesha aina tatu tofauti za nodi: nyepesi, kamili na kumbukumbu. Pia kuna chaguo za mikakati tofauti ya usawazishaji ambayo huwezesha muda wa usawazishaji wa haraka zaidi. Uunganishaji unarejelea jinsi inavyoweza kupata taarifa za hivi punde kuhusu jimbo la Ethereum kwa haraka.

### Nodi kamili {#full-node}

Nodi kamili hufanya uthibitishaji wa kizuizi kwa kizuizi cha kiambajengo, ikiwa ni pamoja na kupakua na kuthibitisha kiini cha kizuia na data ya serikali kwa kila kizuizi. Kuna aina tofauti za nodi kamili - zingine huanza kutoka kwa kizuizi cha mwanzo na kuthibitisha kila kizuizi kimoja katika historia nzima ya kiambajengo. Wengine huanza uthibitishaji wao kwenye bloku ya hivi karibuni zaidi wanayoiamini kuwa halali (k.m., 'usawazishaji wa snap' wa Geth). Bila kujali mahali ambapo uthibitishaji unaanzia, nodi kamili huweka tu nakala ya ndani ya data ya hivi karibuni (kawaida vizuizi 128 vya hivi karibuni), ikiruhusu data ya zamani kufutwa ili kuhifadhi nafasi ya diski. Data za zamani zinaweza kutengenezwa upya zinapohitajika.

- Huhifadhi data kamili ya mnyororo wa bloku (ingawa hii hupunguzwa mara kwa mara kwa hivyo nodi kamili haihifadhi data zote za hali hadi mwanzo)
- Hushiriki katika uthibitishaji wa bloku, huthibitisha bloku na hali zote.
- Majimbo yote yanaweza kupatikana kutoka kwa hifadhi ya ndani au kutolewa upya kutoka kwa 'picha za kumbukumbu' kwa nodi kamili.
- Huhudumia mtandao na hutoa data kwa ombi.

### Nodi ya kumbukumbu {#archive-node}

Nodi za kumbukumbu ni nodi kamili ambazo huthibitisha kila kizuizi kutoka kwa mwanzo na kamwe kufuta data yoyote iliyopakuliwa.

- Huhifadhi kila kitu kilichohifadhiwa kwenye nodi kamili na hujenga kumbukumbu ya hali za kihistoria. Inahitajika ikiwa ungependa kuuliza swali kama salio la akaunti kwenye kizuizi #4,000,000, au jaribu kwa urahisi na kwa uhakika miamala yako uliyoweka bila kuithibitisha kwa kutumia ufuatiliaji.
- Data hii inawakilisha vitengo vya terabaiti, ambayo hufanya nodi za kumbukumbu zisiwe na mvuto kwa watumiaji wastani lakini inaweza kutumika kwa huduma kama vile vivinjari, wachuuzi wa mkoba na uchanganuzi wa minyororo.

Kusawazisha wateja katika hali yoyote isipokuwa kumbukumbu kutasababisha data ya mnyororo wa bloku iliyopunguzwa. Hii ina maana, hakuna kumbukumbu ya majimbo yote ya kihistoria lakini nodi kamili inaweza kujenga yao juu ya mahitaji.

Jifunze zaidi kuhusu [Nodi za kumbukumbu](/developers/docs/nodes-and-clients/archive-nodes).

### Nodi nyepesi {#light-node}

Badala ya kupakua kila bloku, nodi nyepesi hupakua tu vichwa vya bloku. Vichwa hivi vina maelezo ya muhtasari kuhusu yaliyomo kwenye bloku. Taarifa nyingine yoyote ambayo nodi nyepesi inahitaji huombwa kutoka kwa nodi kamili. Nodi ya nyepesi inaweza kuthibitisha kwa kujitegemea data wanayopokea dhidi ya mizizi ya majimbo kwenye vichwa vya kuzuia. Node za mwanga huwawezesha watumiaji kushiriki katika mtandao wa Ethereum bila vifaa vyenye nguvu au kipimo cha juu kinachohitajika ili kuendesha nodi kamili. Hatimaye, nodi nyepesi zinaweza kuendeshwa kwenye simu za mkononi au vifaa vilivyopachikwa. Nodi nyepesi hazishiriki katika makubaliano (yaani, haziwezi kuwa wathibitishaji), lakini zinaweza kufikia mnyororo wa bloku wa Ethereum na utendaji sawa na dhamana za usalama kama nodi kamili.

Wateja wa mwanga ni eneo la maendeleo ya kazi kwa Ethereum na tunatarajia kuona wateja wapya wa mwanga kwa safu ya makubaliano na safu ya utekelezaji hivi karibuni.
Pia kuna njia zinazowezekana za kutoa data ya mteja nyepesi kupitia [mtandao wa gossip](https://www.ethportal.net/). Hii ni faida kwa sababu mtandao wa porojo unaweza kusaidia mtandao wa nodi nyepesi bila kuhitaji nodi kamili ili kuwasilisha maombi.

Ethereum haiungi mkono idadi kubwa ya nodi za mwanga bado, lakini usaidizi wa nodi za mwanga ni eneo linalotarajiwa kuendeleza haraka katika siku za usoni. Hasa, wateja kama [Nimbus](https://nimbus.team/), [Helios](https://github.com/a16z/helios), na [LodeStar](https://lodestar.chainsafe.io/) kwa sasa wamejikita sana kwenye nodi nyepesi.

## Kwa nini niendeshe nodi ya Ethereum? {#why-should-i-run-an-ethereum-node}

Kuendesha nodi hukuruhusu kutumia Ethereum moja kwa moja, bila uaminifu na kwa faragha huku ukiunga mkono mtandao kwa kuuweka imara zaidi na kutawanywa.

### Faida kwako {#benefits-to-you}

Kuendesha nodi yako mwenyewe hukuwezesha kutumia Ethereum kwa njia ya faragha, ya kujitegemea na isiyoaminika. Huna haja ya kuamini mtandao kwa sababu unaweza kuthibitisha data mwenyewe na mteja wako. "Usiamini, thibitisha" ni kauli mbiu maarufu ya mnyororo wa bloku.

- Nodi yako huthibitisha miamala na bloku zote dhidi ya sheria za makubaliano yenyewe. Hii inamaanisha si lazima utegemee nodi zingine zozote kwenye mtandao au kuziamini kikamilifu.
- Unaweza kutumia mkoba wa Ethereum na nodi yako mwenyewe. Unaweza kutumia dapps kwa usalama zaidi na kwa faragha kwa sababu hutalazimika kuvujisha anwani na salio zako kwa wapatanishi. Kila kitu kinaweza kukaguliwa na mteja wako mwenyewe. [MetaMask](https://metamask.io), [Frame](https://frame.sh/), na [mikoba mingine mingi](/wallets/find-wallet/) hutoa uagizaji wa RPC, kuwaruhusu kutumia nodi yako.
- Unaweza kuendesha na kujihifadhi huduma zingine ambazo hutegemea data kutoka Ethereum. Kwa mfano, hii inaweza kuwa kithibitishaji cha mnyororo wa Beacon, programu kama vile safu ya 2, miundombinu, wachunguzi wa kuzuia, wachakataji malipo, n. k.
- Unaweza kutoa [ncha zako maalum za RPC](/developers/docs/apis/json-rpc/). Unaweza hata kutoa viunganishi hivi hadharani kwa jamii ili kuwasaidia kuepuka watoa huduma wakuu wa kimamlaka.
- Unaweza kuunganisha kwenye nodi yako kwa kutumia **Mawasiliano ya Mchakato wa Kati (IPC)** au uandike upya nodi ili kupakia programu yako kama programu-jalizi. Hii inatoa muda wa kusubiri wa chini, ambayo husaidia sana, k.m., wakati wa kuchakata data nyingi kwa kutumia maktaba za web3 au unapohitaji kubadilisha miamala yako haraka iwezekanavyo (yaani, kukimbia mbele).
- Unaweza kuweka hisa ETH moja kwa moja ili kulinda mtandao na kupata zawadi. Angalia [uwekaji hisa pekee](/staking/solo/) ili kuanza.

![Jinsi unavyofikia Ethereum kupitia mfumo wako na nodi](./nodes.png)

### Faida za mtandao {#network-benefits}

Seti mbalimbali za nodi ni muhimu kwa afya, usalama na ustahimilivu wa kiutendaji wa Ethereum.

- Nodi kamili hutekeleza sheria za maafikiano ili wasiweze kudanganywa ili wakubali vizuizi ambavyo havifuati. Hii hutoa usalama wa ziada kwenye mtandao kwa sababu ikiwa nodi zote zingekuwa nodi nyepesi, ambazo hazifanyi uthibitishaji kamili, viidhinishi vinaweza kushambulia mtandao.
- Katika kisa cha shambulio ambalo hushinda ulinzi wa kiuchumi wa kripto wa [uthibitisho wa hisa](/developers/docs/consensus-mechanisms/pos/#what-is-pos), urejeshaji wa kijamii unaweza kufanywa na nodi kamili zinazochagua kufuata mnyororo mnyofu.
- Nodi nyingi zaidi kwenye mtandao husababisha mtandao tofauti na thabiti, lengo kuu la utawanyaji, ambalo huwezesha mfumo unaostahimili udhibiti na unaotegemewa.
- Nodi kamili hutoa ufikiaji wa data ya mnyororo wa bloku kwa wateja wepesi wanaotegemea. Nodi nyepesi hazihifadhi mnyororo mzima wa bloku, badala yake huthibitisha data kupitia [mizizi ya hali katika vichwa vya bloku](/developers/docs/blocks/#block-anatomy). Wanaweza kuomba maelezo zaidi kutoka kwa nodi kamili ikiwa wanahitaji.

Ikiwa unatumia nodi kamili, mtandao wote wa Ethereum unafaidika nayo, hata ikiwa hutumii kithibitishaji.

## Kuendesha nodi yako mwenyewe {#running-your-own-node}

Unavutiwa na kuendesha mteja wako mwenyewe wa Ethereum?

Kwa utangulizi unaofaa kwa wanaoanza tembelea ukurasa wetu wa [endesha nodi](/run-a-node) ili kujifunza zaidi.

Ikiwa wewe ni mtumiaji wa kiufundi zaidi, ingia katika maelezo na chaguo zaidi kuhusu jinsi ya [kuanzisha nodi yako mwenyewe](/developers/docs/nodes-and-clients/run-a-node/).

## Njia mbadala {#alternatives}

Kuandaa nodi yako mwenyewe kunaweza kukugharimu wakati na rasilimali lakini huhitaji kila wakati kuendesha mfano wako mwenyewe. Katika kesi hii, unaweza kutumia mtoa huduma wa API wa wahusika wengine. Kwa muhtasari wa kutumia huduma hizi, angalia [nodi kama huduma](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Iwapo mtu anaendesha nodi ya Ethereum iliyo na API ya umma katika jumuiya yako, unaweza kuelekeza mikoba yako kwenye nodi ya jumuiya kupitia Custom RPC na upate faragha zaidi kuliko na mtu mwingine anayeaminika bila mpangilio.

Kwa upande mwingine, ikiwa unaendesha mteja, unaweza kuishiriki na marafiki zako wanaoweza kuihitaji.

## Wateja wa utekelezaji {#execution-clients}

Jumuiya ya Ethereum hudumisha wateja wengi wa utekelezaji wa programu huria (hapo awali walijulikana kama 'Wateja wa Eth1', au 'wateja wa Ethereum' pekee), iliyotengenezwa na timu tofauti zinazotumia lugha tofauti za programu. Hii hufanya mtandao kuwa imara zaidi na [wenye anuwai zaidi](/developers/docs/nodes-and-clients/client-diversity/). Lengo bora ni kufikia utofauti bila mteja yeyote kutawala ili kupunguza uwezekano wowote wa kushindwa.

Jedwali hili linatoa muhtasari wa wateja tofauti. Wote hupita [majaribio ya wateja](https://github.com/ethereum/tests) na hudumishwa kikamilifu ili kusasishwa na maboresho ya mtandao.

| Mteja                                                                                       | Lugha                    | Mifumo ya uendeshaji  | Mitandao                     | Mikakati ya Usawazishaji                                                             | Upunguzaji wa hali        |
| ------------------------------------------------------------------------------------------- | ------------------------ | --------------------- | ---------------------------- | ------------------------------------------------------------------------------------ | ------------------------- |
| [Geth](https://geth.ethereum.org/)                                                          | Go                       | Linux, Windows, macOS | Mtandao Mkuu, Sepolia, Hoodi | [Snap](#snap-sync), [Kamili](#full-sync)                                             | Kumbukumbu, Iliyopunguzwa |
| [Nethermind](https://www.nethermind.io/)                                                    | C#, .NET | Linux, Windows, macOS | Mtandao Mkuu, Sepolia, Hoodi | [Snap](#snap-sync) (bila kuhudumia), Haraka, [Kamili](#full-sync) | Kumbukumbu, Iliyopunguzwa |
| [Besu](https://besu.hyperledger.org/en/stable/)                                             | Java                     | Linux, Windows, macOS | Mtandao Mkuu, Sepolia, Hoodi | [Snap](#snap-sync), [Haraka](#fast-sync), [Kamili](#full-sync)                       | Kumbukumbu, Iliyopunguzwa |
| [Erigon](https://github.com/ledgerwatch/erigon)                                             | Go                       | Linux, Windows, macOS | Mtandao Mkuu, Sepolia, Hoodi | [Kamili](#full-sync)                                                                 | Kumbukumbu, Iliyopunguzwa |
| [Reth](https://reth.rs/)                                                                    | Rust                     | Linux, Windows, macOS | Mtandao Mkuu, Sepolia, Hoodi | [Kamili](#full-sync)                                                                 | Kumbukumbu, Iliyopunguzwa |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) _(beta)_ | TypeScript               | Linux, Windows, macOS | Sepolia, Hoodi               | [Kamili](#full-sync)                                                                 | Iliyopunguzwa             |

Kwa zaidi kuhusu mitandao inayotumika, soma kuhusu [mitandao ya Ethereum](/developers/docs/networks/).

Kila mteja ana matumizi na faida za kipekee, kwa hivyo unapaswa kuchagua mmoja kulingana na mapendeleo yako mwenyewe. Anuwai inaruhusu utekelezaji kulenga vipengele tofauti na hadhira ya watumiaji. Unaweza kutaka kuchagua mteja kulingana na vipengele, usaidizi, lugha ya programu, au leseni.

### Besu {#besu}

Hyperledger Besu ni mteja wa Ethereum wa kiwango cha biashara kwa mitandao ya umma na yenye ruhusa. Inaendesha vipengele vyote vya Mtandao Mkuu wa Ethereum, kutoka ufuatiliaji hadi GraphQL, ina ufuatiliaji wa kina na inasaidiwa na ConsenSys, katika njia za wazi za jamii na kupitia SLAs za kibiashara kwa biashara. Imeandikwa kwa Java na ina leseni ya Apache 2.0.

[Nyaraka](https://besu.hyperledger.org/en/stable/) za kina za Besu zitakuongoza kupitia maelezo yote kuhusu vipengele na usanidi wake.

### Erigon {#erigon}

Erigon, ambaye awali alijulikana kama Turbo-Geth, ilianza kama uma wa Go Ethereum inayoelekezwa kwa kasi na ufanisi wa nafasi ya diski. Erigon ni usanifu upya kabisa wa utekelezaji wa Ethereum, ulioandikwa kwa sasa katika Go lakini ukiwa na utekelezaji katika lugha nyingine zinazoendelea. Lengo la Erigon ni kutoa utekelezaji wa haraka, wa moduli zaidi, na ulioboreshwa zaidi wa Ethereum. Inaweza kufanya usawazishaji kamili wa nodi ya kumbukumbu kwa kutumia takriban 2TB ya nafasi ya diski, chini ya siku 3.

### Go Ethereum {#geth}

Go Ethereum (Geth kwa ufupi) ni moja ya utekelezaji wa asili wa itifaki ya Ethereum. Hivi sasa, ndiye mteja aliyeenea zaidi na msingi mkubwa zaidi wa watumiaji na zana anuwai kwa watumiaji na wasanifu. Imeandikwa kwa Go, chanzo wazi kikamilifu na ina leseni chini ya GNU LGPL v3.

Jifunze zaidi kuhusu Geth katika [nyaraka](https://geth.ethereum.org/docs/) zake.

### Nethermind {#nethermind}

Nethermind ni utekelezaji wa Ethereum ulioundwa kwa mkusanyiko wa teknolojia ya C# .NET, iliyopewa leseni na LGPL-3.0, inayoendeshwa kwenye mifumo yote mikuu ikijumuisha ARM. Inatoa utendaji mzuri na:

- mashine halisi iliyoboreshwa
- ufikiaji wa hali
- mitandao na vipengele vingi kama vile dashibodi za Prometheus/Grafana, msaada wa uandikishaji wa seq, ufuatiliaji wa JSON-RPC na programu jalizi za uchanganuzi.

Nethermind pia ina [nyaraka za kina](https://docs.nethermind.io), usaidizi mkubwa wa wasanidi, jumuiya ya mtandaoni na usaidizi wa 24/7 unaopatikana kwa watumiaji wa malipo.

### Reth {#reth}

Reth (ufupi wa Rust Ethereum) ni utekelezaji wa nodi kamili ya Ethereum unaolenga kuwa rafiki kwa mtumiaji, unaoweza kubadilishwa kwa urahisi, haraka na wenye ufanisi. Reth awali ilijengwa na kuendeshwa mbele na Paradigm, na ina leseni chini ya leseni za Apache na MIT.

Reth iko tayari kwa uzalishaji, na inafaa kwa matumizi katika mazingira muhimu ya dhamira kama vile huduma za kasi au za muda wa juu. Hufanya kazi vyema katika hali za utumiaji ambapo utendaji wa juu wenye ukingo mkubwa unahitajika kama vile RPC, MEV kuorodhesha, kuiga mienendo, na shighuli za P2P.

Jifunze zaidi kwa kuangalia [Kitabu cha Reth](https://reth.rs/), au [repo ya Reth ya GitHub](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth).

### Inayoendelezwa {#execution-in-development}

Wateja hawa bado wako katika hatua za awali za maendeleo na bado hawajapendekezwa kwa matumizi ya uzalishaji.

#### EthereumJS {#ethereumjs}

Mteja wa Utekelezaji wa EthereumJS (EthereumJS) imeandikwa katika TypeScript na inaundwa na idadi ya vifurushi, ikiwa ni pamoja na vipengele vya msingi vya Ethereum zinazowakilishwa na kizuizi, Transaction, na Merkle-Patricia Trie na vipengele vya msingi vya mteja ikiwa ni pamoja na utekelezaji wa Ethereum Virtual Machine (EVM), mtandao wa kiambajengo cha 2P, na mfuko wa mitandao wa DevP2P.

Jifunze zaidi kuihusu kwa kusoma [nyaraka](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master) zake

## Wateja wa makubaliano {#consensus-clients}

Kuna wateja wengi wa makubaliano (hapo awali walijulikana kama wateja wa 'Eth2') ili kusaidia [maboresho ya makubaliano](/roadmap/beacon-chain/). Wanawajibika kwa mantiki yote inayohusiana na makubaliano ikiwa ni pamoja na algoriti ya kuchagua uma, kuchakata uthibitisho na kusimamia zawadi na adhabu za [uthibitisho wa hisa](/developers/docs/consensus-mechanisms/pos).

| Mteja                                                         | Lugha      | Mifumo ya uendeshaji  | Mitandao                                                    |
| ------------------------------------------------------------- | ---------- | --------------------- | ----------------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | Mnyororo Kioleza, Hoodi, Pyrmont, Sepolia, na zaidi         |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | Mnyororo Kioleza, Hoodi, Sepolia, na zaidi                  |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | Mnyororo Kioleza, Hoodi, Sepolia, na zaidi                  |
| [Prysm](https://prysm.offchainlabs.com/docs/)                 | Go         | Linux, Windows, macOS | Mnyororo Kioleza, Gnosis, Hoodi, Pyrmont, Sepolia, na zaidi |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS | Mnyororo Kioleza, Gnosis, Hoodi, Sepolia, na zaidi          |
| [Grandine](https://docs.grandine.io/)                         | Rust       | Linux, Windows, macOS | Mnyororo Kioleza, Hoodi, Sepolia, na zaidi                  |

### Lighthouse {#lighthouse}

Lighthouse ni utekelezaji wa mteja wa makubaliano ulioandikwa kwa Rust chini ya leseni ya Apache-2.0. Inatunzwa na Sigma Prime na imekuwa thabiti na tayari kwa uzalishaji tangu mwanzo wa mnyororo wa Beacon. Inategemewa na biashara mbalimbali, mabwawa ya uwekaji hisa na watu binafsi. Inalenga kuwa salama, utendaji na kushirikiana katika mazingira mbalimbali, kutoka kwa Kompyuta za mezani hadi uwekaji wa kiotomatiki wa hali ya juu.

Nyaraka zinaweza kupatikana katika [Kitabu cha Lighthouse](https://lighthouse-book.sigmaprime.io/)

### Lodestar {#lodestar}

Lodestar ni utekelezaji wa makubaliano ya mteja ulio tayari kwa uzalishaji ulioandikwa katika Typescript chini ya leseni ya LGPL-3.0. Inasimamiwa na ChainSafe Systems na ndiyo wateja wapya zaidi wa makubaliano kwa washikadau pekee, watengenezaji na watafiti. Lodestar inajumuisha nodi ya beacon na mteja wa uthibitishaji unaoendeshwa na utekelezaji wa JavaScript wa itifaki za Ethereum. Lodestar inalenga kuboresha urahisi wa matumizi ya Ethereum kwa kutumia wateja wepesi, kupanua upatikanaji kwa kundi kubwa zaidi la watengenezaji, na kuchangia zaidi katika utofauti wa mfumo wa ikolojia.

Maelezo zaidi yanaweza kupatikana kwenye [tovuti ya Lodestar](https://lodestar.chainsafe.io/)

### Nimbus {#nimbus}

Nimbus ni utekelezaji wa mteja wa makubaliano ulioandikwa kwa Nim chini ya leseni ya Apache-2.0. Ni mteja aliye tayari kwa uzalishaji anayetumiwa na waweka hisa pekee na mabwawa ya uwekaji hisa. Nimbus imeundwa kwa ajili ya ufanisi wa rasilimali, na kuifanya iwe rahisi kutumia vifaa vyenye vikwazo vya rasilimali na miundombinu ya biashara kwa urahisi sawa, bila kuathiri uthabiti au utendakazi wa zawadi. Alama ya rasilimali nyepesi inamaanisha kuwa mteja ana ukingo mkubwa wa usalama wakati mtandao uko chini ya msongo.

Jifunze zaidi katika [hati za Nimbus](https://nimbus.guide/)

### Prysm {#prysm}

Prysm ni mteja wa makubaliano wa chanzo wazi wenye vipengele kamili, ulioandikwa kwa Go chini ya leseni ya GPL-3.0. Ina kipengele cha hiari cha UI ya wavuti na inatanguliza uzoefu wa mtumiaji, nyaraka, na urekebishwaji kwa watumiaji wa nyumbani na wale wa taasisi.

Tembelea [hati za Prysm](https://prysm.offchainlabs.com/docs/) ili kujifunza zaidi.

### Teku {#teku}

Teku ni mmoja wa wateja wa asili wa mwanzo wa Mnyororo Kioleza. Pamoja na malengo ya kawaida (usalama, uimara, uthabiti, utumiaji, utendaji), Teku inalenga hasa kuzingatia kikamilifu viwango vyote mbalimbali vya wateja wa makubaliano.

Teku inatoa chaguo rahisi sana za upelekaji. Nodi ya mnyororo kioleza na mteja wa mthibitishaji vinaweza kuendeshwa pamoja kama mchakato mmoja, ambayo ni rahisi sana kwa waweka hisa pekee, au nodi zinaweza kuendeshwa kando kwa shughuli za uwekaji hisa za hali ya juu. Kwa kuongeza, Teku inaingiliana kikamilifu na [Web3Signer](https://github.com/ConsenSys/web3signer/) kwa usalama wa ufunguo wa kutia saini na ulinzi wa kupunguzwa.

Teku imeandikwa kwa Java na ina leseni ya Apache 2.0. Inatengenezwa na timu ya Itifaki huko ConsenSys ambayo pia inawajibika kwa Besu na Web3Signer. Jifunze zaidi katika [hati za Teku](https://docs.teku.consensys.net/en/latest/).

### Grandine {#grandine}

Grandine ni utekelezaji wa mteja wa makubaliano, ulioandikwa kwa Rust chini ya leseni ya GPL-3.0. Inadumishwa na Timu ya Msingi ya Grandine na ni ya haraka, yenye utendaji wa juu na nyepesi. Inafaa kwa waweka hisa anuwai kutoka kwa waweka hisa pekee wanaoendesha vifaa vyenye rasilimali ndogo kama vile Raspberry Pi hadi waweka hisa wakubwa wa kitaasisi wanaoendesha makumi ya maelfu ya wathibitishaji.

Nyaraka zinaweza kupatikana katika [Kitabu cha Grandine](https://docs.grandine.io/)

## Njia za usawazishaji {#sync-modes}

Ili kufuata na kuthibitisha data ya sasa kwenye mtandao, mteja wa Ethereum anahitaji kusawazisha na hali ya hivi karibuni ya mtandao. Hii inafanywa kwa kupakua data kutoka kwa rika, kuthibitisha uadilifu wao kwa kriptografia, na kujenga hifadhidata ya mnyororo wa bloku ya ndani.

Njia za usawazishaji zinawakilisha mbinu tofauti za mchakato huu na maelewano mbalimbali. Wateja pia hutofautiana katika utekelezaji wao wa algoriti za usawazishaji. Daima rejelea nyaraka rasmi za mteja uliyemchagua kwa maelezo maalum juu ya utekelezaji.

### Njia za usawazishaji za safu ya utekelezaji {#execution-layer-sync-modes}

Safu ya utekelezaji inaweza kuendeshwa katika njia tofauti ili kukidhi matumizi tofauti, kutoka kutekeleza tena hali ya ulimwengu ya mnyororo wa bloku hadi kusawazisha tu na ncha ya mnyororo kutoka kwa kituo cha ukaguzi kinachoaminika.

#### Usawazishaji kamili {#full-sync}

Usawazishaji kamili hupakua bloku zote (ikiwa ni pamoja na vichwa na miili ya bloku) na hutengeneza upya hali ya mnyororo wa bloku kwa kuongeza kwa kutekeleza kila bloku kutoka mwanzo.

- Hupunguza uaminifu na hutoa usalama wa juu zaidi kwa kuthibitisha kila muamala.
- Kwa kuongezeka kwa idadi ya miamala, inaweza kuchukua siku hadi wiki kuchakata miamala yote.

[Nodi za kumbukumbu](#archive-node) hufanya usawazishaji kamili ili kujenga (na kuhifadhi) historia kamili ya mabadiliko ya hali yaliyofanywa na kila muamala katika kila bloku.

#### Usawazishaji wa haraka {#fast-sync}

Kama usawazishaji kamili, usawazishaji wa haraka hupakua bloku zote (ikiwa ni pamoja na vichwa, miamala, na risiti). Hata hivyo, badala ya kuchakata upya miamala ya nyuma, uunganishaji wa haraka hutegemea stakabadhi hadi kufikia kichwa cha hivi majuzi, inapobadilika na kuingiza na kuchakata vitalu ili kutoa nodi kamili.

- Mkakati wa usawazishaji wa haraka.
- Hupunguza mahitaji ya uchakataji kwa kupendelea matumizi ya kipimo data.

#### Usawazishaji wa Snap {#snap-sync}

Usawazishaji wa Snap pia huthibitisha mnyororo bloku kwa bloku. Hata hivyo, badala ya kuanza kwenye kizuizi cha mwanzo, uunganishaji wa haraka huanza katika sehemu ya hivi karibuni ya ukaguzi 'inayoaminika' ambayo inajulikana kuwa sehemu ya kiambajengo ya halisi. Nodi huhifadhi vituo vya ukaguzi vya mara kwa mara huku ikifuta data ya zamani zaidi ya umri fulani. Picha hizi za haraka hutumiwa kutengeneza upya data ya hali inavyohitajika, badala ya kuihifadhi milele.

- Mkakati wa haraka zaidi wa usawazishaji, kwa sasa ni chaguomsingi katika Mtandao Mkuu wa Ethereum.
- Huokoa matumizi mengi ya diski na kipimo data cha mtandao bila kuathiri usalama.

[Zaidi kuhusu usawazishaji wa snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md).

#### Usawazishaji mwepesi {#light-sync}

Njia ya mteja mwepesi hupakua vichwa vyote vya bloku, data ya bloku, na huthibitisha baadhi kwa nasibu. Husawazisha tu ncha ya mnyororo kutoka kwa kituo cha ukaguzi kinachoaminika.

- Hupata tu hali ya hivi karibuni huku ikitegemea uaminifu kwa wasanidi programu na utaratibu wa makubaliano.
- Mteja tayari kutumika na hali ya sasa ya mtandao ndani ya dakika chache.

**NB** Usawazishaji mwepesi bado haufanyi kazi na uthibitisho wa hisa wa Ethereum - matoleo mapya ya usawazishaji mwepesi yanapaswa kutolewa hivi karibuni!

[Zaidi kuhusu wateja wepesi](/developers/docs/nodes-and-clients/light-clients/)

### Njia za usawazishaji za safu ya makubaliano {#consensus-layer-sync-modes}

#### Usawazishaji wa matumaini {#optimistic-sync}

Optimistic syn ni mkakati wa ulandanishi wa baada ya kuunganisha iliyoundwa kuingia na inyooana na matoleo ya zamani, kuruhusu nodi za utekelezaji kuunganisha kupitia mbinu zilizowekwa. Injini ya utekelezaji inaweza kuingiza bloku za mnyororo kioleza _kwa matumaini_ bila kuzithibitisha kikamilifu, kupata kichwa cha hivi karibuni, na kisha kuanza kusawazisha mnyororo na mbinu zilizo hapo juu. Kisha, baada ya mteja wa utekelezaji kukamata, itajulisha mteja wa makubaliano ya uhalali wa miamala katika Mnyororo wa Beacon.

[Zaidi kuhusu usawazishaji wa matumaini](https://github.com/ethereum/consensus-specs/blob/dev/sync/optimistic.md)

#### Usawazishaji wa kituo cha ukaguzi {#checkpoint-sync}

Uunganishaji wa sehemu ya ukaguzi, unaojulikana pia kama uunganishaji dhaifu wa ubinafsi, hutengeneza hali bora ya mtumiaji ya kuunganisha Nodi ya Beacon. Inategemea dhana za [udhaifu wa kibinafsi](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/) ambayo huwezesha kusawazisha Mnyororo Kioleza kutoka kwa kituo cha ukaguzi cha hivi karibuni cha udhaifu wa kibinafsi badala ya mwanzo. Usawazishaji wa kituo cha ukaguzi hufanya muda wa awali wa usawazishaji kuwa haraka zaidi na dhana sawa za uaminifu kama kusawazisha kutoka [mwanzo](/glossary/#genesis-block).

Kwa mazoezi, hii inamaanisha kuwa nodi yako inaunganishwa na huduma ya mbali ili kupakua majimbo yaliyokamilishwa hivi karibuni na kuendelea kuthibitisha data kutoka kwa hatua hiyo. Mhusika wa tatu anayetoa data anaaminika na anapaswa kuchaguliwa kwa uangalifu.

Zaidi kuhusu [usawazishaji wa kituo cha ukaguzi](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)

## Masomo zaidi {#further-reading}

- [Ethereum 101 - Sehemu ya 2 - Kuelewa Nodi](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 Februari 2019_
- [Kuendesha Nodi Kamili za Ethereum: Mwongozo kwa Wenye Ari Kidogo](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 Novemba 2019_

## Mada zinazohusiana {#related-topics}

- [Bloku](/developers/docs/blocks/)
- [Mitandao](/developers/docs/networks/)

## Mafunzo yanayohusiana {#related-tutorials}

- [Geuza Raspberry Pi 4 yako kuwa nodi ya mthibitishaji kwa kuwasha tu kadi ya MicroSD – Mwongozo wa usakinishaji](/developers/tutorials/run-node-raspberry-pi/) _– Washa Raspberry Pi 4 yako, chomeka kebo ya ethaneti, unganisha diski ya SSD na uwashe kifaa ili kugeuza Raspberry Pi 4 kuwa nodi kamili ya Ethereum inayoendesha safu ya utekelezaji (Mtandao Mkuu) na/au safu ya makubaliano (Mnyororo Kioleza / mthibitishaji)._
