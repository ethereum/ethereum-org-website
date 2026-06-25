---
title: Nodi na wateja
description: Muhtasari wa nodi za Ethereum na programu za wateja, pamoja na jinsi ya kusanidi nodi na kwa nini unapaswa kufanya hivyo.
lang: sw
sidebarDepth: 2
---

[Ethereum](/) ni mtandao uliosambazwa wa kompyuta (zinazojulikana kama nodi) zinazoendesha programu inayoweza kuthibitisha vitalu na data ya muamala. Programu lazima iendeshwe kwenye kompyuta yako ili kuigeuza kuwa nodi ya Ethereum. Kuna programu mbili tofauti (zinazojulikana kama 'wateja') zinazohitajika ili kuunda nodi.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuelewa dhana ya mtandao wa rika-kwa-rika na [misingi ya EVM](/developers/docs/evm/) kabla ya kuzama zaidi na kuendesha mfano wako mwenyewe wa mteja wa Ethereum. Angalia [utangulizi wetu wa Ethereum](/developers/docs/intro-to-ethereum/).

Ikiwa wewe ni mgeni kwa mada ya nodi, tunapendekeza kwanza uangalie utangulizi wetu unaofaa kwa watumiaji kuhusu [kuendesha nodi ya Ethereum](/run-a-node).

## Nodi na wateja ni nini? {#what-are-nodes-and-clients}

"Nodi" ni mfano wowote wa programu ya mteja wa Ethereum ambayo imeunganishwa na kompyuta zingine ambazo pia zinaendesha programu ya Ethereum, na kuunda mtandao. Mteja ni utekelezaji wa Ethereum ambao huthibitisha data dhidi ya sheria za itifaki na kuweka mtandao salama. Nodi inapaswa kuendesha wateja wawili: mteja wa mwafaka na kiteja cha utekelezaji.

- Kiteja cha utekelezaji (pia kinajulikana kama Injini ya Utekelezaji, mteja wa EL au zamani mteja wa Eth1) husikiliza miamala mipya inayotangazwa kwenye mtandao, kuitekeleza katika EVM, na kushikilia hali ya hivi punde na hifadhidata ya data zote za sasa za Ethereum.
- Mteja wa mwafaka (pia anajulikana kama nodi ya kinara, mteja wa CL au zamani mteja wa Eth2) hutekeleza algoriti ya mwafaka ya Uthibitisho wa Dau (PoS), ambayo huwezesha mtandao kufikia makubaliano kulingana na data iliyothibitishwa kutoka kwa kiteja cha utekelezaji. Pia kuna programu ya tatu, inayojulikana kama 'mthibitishaji' ambayo inaweza kuongezwa kwa mteja wa mwafaka, kuruhusu nodi kushiriki katika kulinda mtandao.

Wateja hawa hufanya kazi pamoja ili kufuatilia kichwa cha mnyororo wa Ethereum na kuruhusu watumiaji kuingiliana na mtandao wa Ethereum. Muundo wa kawaida wenye vipande vingi vya programu vinavyofanya kazi pamoja unaitwa [utata uliofungwa](https://vitalik.eth.limo/general/2022/02/28/complexity.html). Mbinu hii ilifanya iwe rahisi kutekeleza [Unganisho](/roadmap/merge) bila mshono, hufanya programu ya mteja iwe rahisi kudumisha na kuendeleza, na kuwezesha utumiaji tena wa wateja binafsi, kwa mfano, katika [mfumo wa ikolojia wa tabaka la 2 (l2)](/layer-2/).

![Coupled execution and consensus clients](./eth1eth2client.png)
Mchoro uliorahisishwa wa kiteja cha utekelezaji na mteja wa mwafaka waliounganishwa.

### Anuwai ya wateja {#client-diversity}

Wote [wateja wa utekelezaji](/developers/docs/nodes-and-clients/#execution-clients) na [wateja wa mwafaka](/developers/docs/nodes-and-clients/#consensus-clients) wapo katika lugha mbalimbali za programu zilizotengenezwa na timu tofauti.

Utekelezaji wa wateja wengi unaweza kufanya mtandao kuwa na nguvu zaidi kwa kupunguza utegemezi wake kwenye msingi mmoja wa msimbo. Lengo kuu ni kufikia anuwai bila mteja yeyote kutawala mtandao, na hivyo kuondoa uwezekano wa hatua moja ya kutofaulu.
Aina mbalimbali za lugha pia hualika jumuiya pana ya wasanidi programu na kuwaruhusu kuunda miunganisho katika lugha wanayopendelea.

Jifunze zaidi kuhusu [anuwai ya wateja](/developers/docs/nodes-and-clients/client-diversity/).

Kile ambacho utekelezaji huu unafanana ni kwamba zote zinafuata vipimo moja. Vipimo huamuru jinsi mtandao wa Ethereum na mnyororo wa vitalu unavyofanya kazi. Kila undani wa kiufundi umefafanuliwa na vipimo vinaweza kupatikana kama:

- Hapo awali, [waraka wa manjano wa Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Vipimo vya utekelezaji](https://github.com/ethereum/execution-specs/)
- [Vipimo vya mwafaka](https://github.com/ethereum/consensus-specs)
- [EIPs](https://eips.ethereum.org/) zilizotekelezwa katika [maboresho mbalimbali ya mtandao](/ethereum-forks/)

### Kufuatilia nodi kwenye mtandao {#network-overview}

Wafuatiliaji wengi hutoa muhtasari wa wakati halisi wa nodi kwenye mtandao wa Ethereum. Kumbuka kwamba kutokana na asili ya mitandao iliyogatuliwa, watambazaji hawa wanaweza tu kutoa mwonekano mdogo wa mtandao na wanaweza kuripoti matokeo tofauti.

- [Ramani ya nodi](https://etherscan.io/nodetracker) na Etherscan
- [Ethernodes](https://ethernodes.org/) na Bitfly
- [Nodewatch](https://www.nodewatch.io/) na Chainsafe, ikitambaza nodi za mwafaka
- [Monitoreth](https://monitoreth.io/) - na MigaLabs, Zana ya ufuatiliaji wa mtandao uliosambazwa
- [Ripoti za Kila Wiki za Afya ya Mtandao](https://probelab.io) - na ProbeLab, Kwa kutumia [mtambazaji wa Nebula](https://github.com/dennis-tra/nebula) na zana zingine

## Aina za nodi {#node-types}

Ikiwa unataka [kuendesha nodi yako mwenyewe](/developers/docs/nodes-and-clients/run-a-node/), unapaswa kuelewa kuwa kuna aina tofauti za nodi zinazotumia data kwa njia tofauti. Kwa kweli, wateja wanaweza kuendesha aina tatu tofauti za nodi: nyepesi, kamili na ya kumbukumbu. Kuna pia chaguzi za mikakati tofauti ya usawazishaji ambayo huwezesha muda wa usawazishaji wa haraka zaidi. Usawazishaji unarejelea jinsi inavyoweza kupata habari za hivi punde zaidi kuhusu hali ya Ethereum kwa haraka.

### Nodi kamili {#full-node}

Nodi kamili hufanya uthibitishaji wa kitalu kwa kitalu wa mnyororo wa vitalu, ikijumuisha kupakua na kuthibitisha mwili wa kitalu na data ya hali kwa kila kitalu. Kuna madaraja tofauti ya nodi kamili - baadhi huanza kutoka kwa kitalu cha asili na kuthibitisha kila kitalu kimoja katika historia nzima ya mnyororo wa vitalu. Wengine huanza uthibitishaji wao kwenye kitalu cha hivi karibuni zaidi ambacho wanaamini kuwa halali (k.m., 'snap sync' ya Geth). Bila kujali uthibitishaji unaanzia wapi, nodi kamili huweka tu nakala ya ndani ya data ya hivi karibuni (kawaida vitalu 128 vya hivi karibuni), kuruhusu data ya zamani kufutwa ili kuokoa nafasi ya diski. Data ya zamani inaweza kuzalishwa upya inapohitajika.

- Huhifadhi data kamili ya mnyororo wa vitalu (ingawa hii hupunguzwa mara kwa mara ili nodi kamili isihifadhi data yote ya hali kurudi kwenye asili)
- Hushiriki katika uthibitishaji wa kitalu, huthibitisha vitalu na hali zote.
- Hali zote zinaweza kupatikana kutoka kwa hifadhi ya ndani au kuzalishwa upya kutoka kwa 'picha' na nodi kamili.
- Huhudumia mtandao na kutoa data kwa ombi.

### Nodi ya kumbukumbu {#archive-node}

Nodi za kumbukumbu ni nodi kamili zinazothibitisha kila kitalu kutoka asili na hazifuti kamwe data yoyote iliyopakuliwa.

- Huhifadhi kila kitu kilichowekwa kwenye nodi kamili na hujenga kumbukumbu ya hali za kihistoria. Inahitajika ikiwa unataka kuuliza kitu kama salio la akaunti kwenye kitalu #4,000,000, au kujaribu kwa urahisi na kwa uhakika seti yako ya miamala bila kuithibitisha kwa kutumia ufuatiliaji.
- Data hii inawakilisha vitengo vya terabaiti, ambayo hufanya nodi za kumbukumbu zisiwe za kuvutia sana kwa watumiaji wa kawaida lakini zinaweza kuwa muhimu kwa huduma kama wachunguzi wa kitalu, wachuuzi wa mkoba, na uchanganuzi wa mnyororo.

Kusawazisha wateja katika hali yoyote isipokuwa kumbukumbu kutasababisha data iliyopunguzwa ya mnyororo wa vitalu. Hii inamaanisha, hakuna kumbukumbu ya hali zote za kihistoria lakini nodi kamili inaweza kuzijenga inapohitajika.

Jifunze zaidi kuhusu [Nodi za kumbukumbu](/developers/docs/nodes-and-clients/archive-nodes).

### Nodi nyepesi {#light-node}

Badala ya kupakua kila kitalu, nodi nyepesi hupakua tu vichwa vya kitalu. Vichwa hivi vina maelezo ya muhtasari kuhusu yaliyomo kwenye vitalu. Taarifa nyingine yoyote ambayo nodi nyepesi inahitaji huombwa kutoka kwa nodi kamili. Nodi nyepesi inaweza kisha kuthibitisha kwa kujitegemea data wanayopokea dhidi ya mizizi ya hali katika vichwa vya kitalu. Nodi nyepesi huwezesha watumiaji kushiriki katika mtandao wa Ethereum bila maunzi yenye nguvu au kipimo data cha juu kinachohitajika ili kuendesha nodi kamili. Hatimaye, nodi nyepesi zinaweza kuendeshwa kwenye simu za mkononi au vifaa vilivyopachikwa. Nodi nyepesi hazishiriki katika mwafaka (yaani, haziwezi kuwa wathibitishaji), lakini zinaweza kufikia mnyororo wa vitalu wa Ethereum na utendaji sawa na dhamana za usalama kama nodi kamili.

Wateja wepesi ni eneo la maendeleo amilifu kwa Ethereum na tunatarajia kuona wateja wepesi wapya kwa tabaka la mwafaka na tabaka la utekelezaji hivi karibuni.
Pia kuna njia zinazowezekana za kutoa data ya kiteja chepesi kupitia [mtandao wa uvumi](https://www.ethportal.net/). Hii ni faida kwa sababu mtandao wa uvumi unaweza kusaidia mtandao wa nodi nyepesi bila kuhitaji nodi kamili kuhudumia maombi.

Ethereum bado haiauni idadi kubwa ya nodi nyepesi, lakini usaidizi wa nodi nyepesi ni eneo linalotarajiwa kuendeleza kwa kasi katika siku za usoni. Hasa, wateja kama [Nimbus](https://nimbus.team/), [Helios](https://github.com/a16z/helios), na [Lodestar](https://lodestar.chainsafe.io/) kwa sasa wamejikita sana kwenye nodi nyepesi.

## Kwa nini niendeshe nodi ya Ethereum? {#why-should-i-run-an-ethereum-node}

Kuendesha nodi hukuruhusu kutumia Ethereum moja kwa moja, bila hitaji la uaminifu na kwa faragha huku ukisaidia mtandao kwa kuuweka imara zaidi na uliogatuliwa.

### Faida kwako {#benefits-to-you}

Kuendesha nodi yako mwenyewe hukuwezesha kutumia Ethereum kwa njia ya faragha, ya kujitegemea na bila hitaji la uaminifu. Huhitaji kuamini mtandao kwa sababu unaweza kuthibitisha data wewe mwenyewe na mteja wako. "Usiamini, thibitisha" ni msemo maarufu wa mnyororo wa vitalu.

- Nodi yako huthibitisha miamala na vitalu vyote dhidi ya sheria za mwafaka yenyewe. Hii inamaanisha sio lazima utegemee nodi zingine zozote kwenye mtandao au kuziwekea imani kamili.
- Unaweza kutumia mkoba wa Ethereum na nodi yako mwenyewe. Unaweza kutumia programu tumizi iliyogatuliwa (dapp) kwa usalama zaidi na kwa faragha kwa sababu hutalazimika kuvujisha anwani na salio lako kwa waamuzi. Kila kitu kinaweza kuangaliwa na mteja wako mwenyewe. [MetaMask](https://metamask.io), [Frame](https://frame.sh/), na [mikoba mingine mingi](/wallets/find-wallet/) hutoa uingizaji wa RPC, na kuwaruhusu kutumia nodi yako.
- Unaweza kuendesha na kujipangia huduma zingine ambazo zinategemea data kutoka kwa Ethereum. Kwa mfano, hii inaweza kuwa mthibitishaji wa Mnyororo wa Beacon, programu kama tabaka la 2 (l2), miundombinu, wachunguzi wa kitalu, wasindikaji wa malipo, n.k.
- Unaweza kutoa [ncha za RPC](/developers/docs/apis/json-rpc/) zako maalum. Unaweza hata kutoa ncha hizi hadharani kwa jamii ili kuwasaidia kuepuka watoa huduma wakubwa waliowekwa kati.
- Unaweza kuunganisha kwenye nodi yako kwa kutumia **Mawasiliano ya Kati ya Michakato (IPC)** au kuandika upya nodi ili kupakia programu yako kama programu-jalizi. Hii inatoa ucheleweshaji mdogo, ambayo husaidia sana, k.m., wakati wa kuchakata data nyingi kwa kutumia maktaba za Web3 au unapohitaji kubadilisha miamala yako haraka iwezekanavyo (yaani, kukimbia mbele).
- Unaweza kuweka dhamana ya ETH moja kwa moja ili kulinda mtandao na kupata tuzo. Tazama [uwekaji dhamana wa kujitegemea](/staking/solo/) ili kuanza.

![How you access Ethereum via your application and nodes](./nodes.png)

### Faida za mtandao {#network-benefits}

Seti tofauti za nodi ni muhimu kwa afya, usalama na uthabiti wa uendeshaji wa Ethereum.

- Nodi kamili hutekeleza sheria za mwafaka ili zisiweze kudanganywa kukubali vitalu ambavyo havizifuati. Hii hutoa usalama wa ziada kwenye mtandao kwa sababu ikiwa nodi zote zingekuwa nodi nyepesi, ambazo hazifanyi uthibitishaji kamili, wathibitishaji wangeweza kushambulia mtandao.
- Katika kesi ya shambulio ambalo linashinda ulinzi wa kiuchumi wa kripto wa [Uthibitisho wa Dau (PoS)](/developers/docs/consensus-mechanisms/pos/#what-is-pos), urejeshaji wa kijamii unaweza kufanywa na nodi kamili zinazochagua kufuata mnyororo wa uaminifu.
- Nodi nyingi zaidi kwenye mtandao husababisha mtandao tofauti zaidi na thabiti, lengo kuu la ugatuzi, ambalo huwezesha mfumo unaostahimili udhibiti na wa kuaminika.
- Nodi kamili hutoa ufikiaji wa data ya mnyororo wa vitalu kwa wateja wepesi wanaoitegemea. Nodi nyepesi hazihifadhi mnyororo mzima wa vitalu, badala yake huthibitisha data kupitia [mizizi ya hali katika vichwa vya kitalu](/developers/docs/blocks/#block-anatomy). Wanaweza kuomba habari zaidi kutoka kwa nodi kamili ikiwa wanaihitaji.

Ikiwa unaendesha nodi kamili, mtandao mzima wa Ethereum unafaidika nayo, hata kama huendeshi mthibitishaji.

## Kuendesha nodi yako mwenyewe {#running-your-own-node}

Je, unavutiwa na kuendesha mteja wako mwenyewe wa Ethereum?

Kwa utangulizi unaofaa kwa wanaoanza tembelea ukurasa wetu wa [endesha nodi](/run-a-node) ili kujifunza zaidi.

Ikiwa wewe ni mtumiaji wa kiufundi zaidi, zama katika maelezo zaidi na chaguo kuhusu jinsi ya [kuanzisha nodi yako mwenyewe](/developers/docs/nodes-and-clients/run-a-node/).

## Njia mbadala {#alternatives}

Kusanidi nodi yako mwenyewe kunaweza kukugharimu muda na rasilimali lakini huhitaji kila wakati kuendesha mfano wako mwenyewe. Katika kesi hii, unaweza kutumia mtoa huduma wa API wa tatu. Kwa muhtasari wa kutumia huduma hizi, angalia [nodi kama huduma](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Ikiwa mtu anaendesha nodi ya Ethereum na API ya umma katika jumuiya yako, unaweza kuelekeza mikoba yako kwenye nodi ya jumuiya kupitia RPC Maalum na kupata faragha zaidi kuliko kwa mhusika mwingine anayeaminika bila mpangilio.

Kwa upande mwingine, ikiwa unaendesha mteja, unaweza kushiriki na marafiki zako ambao wanaweza kuihitaji.

## Wateja wa utekelezaji {#execution-clients}

Jumuiya ya Ethereum hudumisha wateja wengi wa utekelezaji wa chanzo huria (hapo awali walijulikana kama 'wateja wa Eth1', au tu 'wateja wa Ethereum'), waliotengenezwa na timu tofauti kwa kutumia lugha tofauti za programu. Hii inafanya mtandao kuwa na nguvu na [anuwai](/developers/docs/nodes-and-clients/client-diversity/) zaidi. Lengo kuu ni kufikia anuwai bila mteja yeyote kutawala ili kupunguza hatua zozote za kutofaulu.

Jedwali hili linatoa muhtasari wa wateja tofauti. Wote hupita [majaribio ya wateja](https://github.com/ethereum/tests) na hudumishwa kikamilifu ili kusasishwa na maboresho ya mtandao.

| Mteja                                                                   | Lugha   | Mifumo ya uendeshaji     | Mitandao                | Mikakati ya usawazishaji                                            | Upunguzaji wa hali   |
| ------------------------------------------------------------------------ | ---------- | --------------------- | ----------------------- | ---------------------------------------------------------- | --------------- |
| [Geth](https://geth.ethereum.org/)                                       | Go         | Linux, Windows, macOS | Mtandao Mkuu, Sepolia, Hoodi | [Snap](#snap-sync), [Kamili](#full-sync)                     | Kumbukumbu, Iliyopunguzwa |
| [Nethermind](https://www.nethermind.io/)                                 | C#, .NET   | Linux, Windows, macOS | Mtandao Mkuu, Sepolia, Hoodi | [Snap](#snap-sync), Haraka, [Kamili](#full-sync)               | Kumbukumbu, Iliyopunguzwa |
| [Besu](https://besu.hyperledger.org/en/stable/)                          | Java       | Linux, Windows, macOS | Mtandao Mkuu, Sepolia, Hoodi | [Snap](#snap-sync), [Haraka](#fast-sync), [Kamili](#full-sync) | Kumbukumbu, Iliyopunguzwa |
| [Erigon](https://github.com/ledgerwatch/erigon)                          | Go         | Linux, Windows, macOS | Mtandao Mkuu, Sepolia, Hoodi | [Kamili](#full-sync)                                         | Kumbukumbu, Iliyopunguzwa |
| [Reth](https://reth.rs/)                                                 | Rust       | Linux, Windows, macOS | Mtandao Mkuu, Sepolia, Hoodi | [Kamili](#full-sync)                                         | Kumbukumbu, Iliyopunguzwa |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) _(beta)_ | TypeScript | Linux, Windows, macOS | Sepolia, Hoodi          | [Kamili](#full-sync)                                         | Iliyopunguzwa          |

Kwa zaidi kuhusu mitandao inayotumika, soma kuhusu [mitandao ya Ethereum](/developers/docs/networks/).

Kila mteja ana matukio ya kipekee ya matumizi na faida, kwa hivyo unapaswa kuchagua moja kulingana na mapendeleo yako mwenyewe. Anuwai huruhusu utekelezaji kulenga vipengele tofauti na hadhira ya watumiaji. Unaweza kutaka kuchagua mteja kulingana na vipengele, usaidizi, lugha ya programu, au leseni.

### Besu {#besu}

Hyperledger Besu ni mteja wa Ethereum wa kiwango cha biashara kwa mitandao ya umma na yenye ruhusa. Inaendesha vipengele vyote vya Mtandao Mkuu wa Ethereum, kuanzia ufuatiliaji hadi GraphQL, ina ufuatiliaji wa kina na inasaidiwa na ConsenSys, katika njia za wazi za jumuiya na kupitia SLA za kibiashara kwa makampuni. Imeandikwa katika Java na ina leseni ya Apache 2.0.

[Nyaraka](https://besu.hyperledger.org/en/stable/) za kina za Besu zitakuongoza kupitia maelezo yote kuhusu vipengele na usanidi wake.

### Erigon {#erigon}

Erigon, iliyojulikana zamani kama Turbo-Geth, ilianza kama mchepuo wa Go Ethereum iliyoelekezwa kwenye kasi na ufanisi wa nafasi ya diski. Erigon ni utekelezaji uliojengwa upya kabisa wa Ethereum, kwa sasa umeandikwa katika Go lakini na utekelezaji katika lugha zingine zinazoendelezwa. Lengo la Erigon ni kutoa utekelezaji wa haraka, wa kawaida zaidi, na ulioboreshwa zaidi wa Ethereum. Inaweza kufanya usawazishaji kamili wa nodi ya kumbukumbu kwa kutumia karibu 2TB ya nafasi ya diski, chini ya siku 3.

### Go Ethereum {#geth}

Go Ethereum (Geth kwa ufupi) ni mojawapo ya utekelezaji wa asili wa itifaki ya Ethereum. Kwa sasa, ni mteja aliyeenea zaidi na msingi mkubwa wa watumiaji na zana mbalimbali kwa watumiaji na wasanidi programu. Imeandikwa katika Go, chanzo huria kikamilifu na kupewa leseni chini ya GNU LGPL v3.

Jifunze zaidi kuhusu Geth katika [nyaraka](https://geth.ethereum.org/docs) zake.

### Nethermind {#nethermind}

Nethermind ni utekelezaji wa Ethereum ulioundwa na mrundikano wa teknolojia wa C# .NET, uliopewa leseni na LGPL-3.0, unaoendeshwa kwenye majukwaa yote makuu ikiwa ni pamoja na ARM. Inatoa utendaji mzuri na:

- mashine pepe iliyoboreshwa
- ufikiaji wa hali
- mitandao na vipengele tajiri kama dashibodi za Prometheus/Grafana, usaidizi wa ukataji miti wa biashara wa seq, ufuatiliaji wa JSON-RPC, na programu-jalizi za uchanganuzi.

Nethermind pia ina [nyaraka za kina](https://docs.nethermind.io), usaidizi mkubwa wa wasanidi programu, jumuiya ya mtandaoni na usaidizi wa 24/7 unaopatikana kwa watumiaji wa malipo.

### Reth {#reth}

Reth (kifupi cha Rust Ethereum) ni utekelezaji wa nodi kamili ya Ethereum ambayo inalenga kuwa rafiki kwa mtumiaji, ya kawaida sana, ya haraka na yenye ufanisi. Reth awali ilijengwa na kuendeshwa mbele na Paradigm, na imepewa leseni chini ya leseni za Apache na MIT.

Reth iko tayari kwa uzalishaji, na inafaa kwa matumizi katika mazingira muhimu ya dhamira kama vile uwekaji dhamana au huduma za muda wa juu. Inafanya vizuri katika matukio ya matumizi ambapo utendaji wa juu na kando kubwa unahitajika kama vile RPC, MEV, kuorodhesha, uigaji, na shughuli za P2P.

Jifunze zaidi kwa kuangalia [Kitabu cha Reth](https://reth.rs/), au [hifadhi ya GitHub ya Reth](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth).

### Katika maendeleo {#execution-in-development}

Wateja hawa bado wako katika hatua za awali za maendeleo na bado hawapendekezwi kwa matumizi ya uzalishaji.

#### EthereumJS {#ethereumjs}

Kiteja cha Utekelezaji cha EthereumJS (EthereumJS) kimeandikwa katika TypeScript na kinajumuisha idadi ya vifurushi, ikijumuisha misingi ya Ethereum inayowakilishwa na madarasa ya Kitalu, Muamala, na Merkle-Patricia Trie na vipengele vya msingi vya mteja ikijumuisha utekelezaji wa Mashine Pepe ya Ethereum (EVM), darasa la mnyororo wa vitalu, na mrundikano wa mitandao wa devp2p.

Jifunze zaidi kuihusu kwa kusoma [nyaraka](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master) zake

## Wateja wa mwafaka {#consensus-clients}

Kuna wateja wengi wa mwafaka (hapo awali walijulikana kama wateja wa 'Eth2') kusaidia [maboresho ya mwafaka](/roadmap/beacon-chain/). Wanawajibika kwa mantiki yote inayohusiana na mwafaka ikijumuisha algoriti ya kuchagua mchepuo, kuchakata uthibitisho na kudhibiti tuzo na adhabu za [Uthibitisho wa Dau (PoS)](/developers/docs/consensus-mechanisms/pos).

| Mteja                                                        | Lugha   | Mifumo ya uendeshaji     | Mitandao                                                |
| ------------------------------------------------------------- | ---------- | --------------------- | ------------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | Mnyororo wa Beacon, Hoodi, Pyrmont, Sepolia, na zaidi         |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | Mnyororo wa Beacon, Hoodi, Sepolia, na zaidi                  |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | Mnyororo wa Beacon, Hoodi, Sepolia, na zaidi                  |
| [Prysm](https://prysm.offchainlabs.com/docs/)                 | Go         | Linux, Windows, macOS | Mnyororo wa Beacon, Gnosis, Hoodi, Pyrmont, Sepolia, na zaidi |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS | Mnyororo wa Beacon, Gnosis, Hoodi, Sepolia, na zaidi          |
| [Grandine](https://docs.grandine.io/)                         | Rust       | Linux, Windows, macOS | Mnyororo wa Beacon, Hoodi, Sepolia, na zaidi                  |

### Lighthouse {#lighthouse}

Lighthouse ni utekelezaji wa mteja wa mwafaka ulioandikwa katika Rust chini ya leseni ya Apache-2.0. Inadumishwa by Sigma Prime na imekuwa thabiti na tayari kwa uzalishaji tangu asili ya Mnyororo wa Beacon. Inategemewa na makampuni mbalimbali, mabwawa ya uwekaji dhamana na watu binafsi. Inalenga kuwa salama, yenye utendaji na inayoingiliana katika mazingira mbalimbali, kutoka kwa Kompyuta za mezani hadi usambazaji wa kiotomatiki wa kisasa.

Nyaraka zinaweza kupatikana katika [Kitabu cha Lighthouse](https://lighthouse-book.sigmaprime.io/)

### Lodestar {#lodestar}

Lodestar ni utekelezaji wa mteja wa mwafaka ulio tayari kwa uzalishaji ulioandikwa katika TypeScript chini ya leseni ya LGPL-3.0. Inadumishwa na ChainSafe Systems na ndiyo mpya zaidi kati ya wateja wa mwafaka kwa waweka dhamana wa kujitegemea, wasanidi programu na watafiti. Lodestar inajumuisha nodi ya kinara na mteja wa mthibitishaji inayoendeshwa na utekelezaji wa JavaScript wa itifaki za Ethereum. Lodestar inalenga kuboresha utumiaji wa Ethereum na wateja wepesi, kupanua ufikiaji kwa kundi kubwa la wasanidi programu na kuchangia zaidi katika anuwai ya mfumo wa ikolojia.

Habari zaidi inaweza kupatikana kwenye [tovuti ya Lodestar](https://lodestar.chainsafe.io/)

### Nimbus {#nimbus}

Nimbus ni utekelezaji wa mteja wa mwafaka ulioandikwa katika Nim chini ya leseni ya Apache-2.0. Ni mteja aliye tayari kwa uzalishaji anayetumiwa na waweka dhamana wa kujitegemea na mabwawa ya uwekaji dhamana. Nimbus imeundwa kwa ufanisi wa rasilimali, na kuifanya iwe rahisi kuendesha kwenye vifaa vilivyozuiliwa na rasilimali na miundombinu ya biashara kwa urahisi sawa, bila kuathiri uthabiti au utendaji wa tuzo. Alama nyepesi ya rasilimali inamaanisha mteja ana kando kubwa ya usalama wakati mtandao uko chini ya shinikizo.

Jifunze zaidi katika [nyaraka za Nimbus](https://nimbus.guide/)

### Prysm {#prysm}

Prysm ni mteja wa mwafaka wa chanzo huria, aliye na vipengele kamili aliyeandikwa katika Go chini ya leseni ya GPL-3.0. Inaangazia UI ya hiari ya programu ya wavuti na inapeana kipaumbele uzoefu wa mtumiaji, nyaraka, na usanidi kwa watumiaji wa kuweka dhamana nyumbani na wa taasisi.

Tembelea [nyaraka za Prysm](https://prysm.offchainlabs.com/docs/) ili kujifunza zaidi.

### Teku {#teku}

Teku ni mmoja wa wateja wa asili wa Mnyororo wa Beacon. Kando na malengo ya kawaida (usalama, uimara, uthabiti, utumiaji, utendaji), Teku inalenga haswa kutii kikamilifu viwango vyote mbalimbali vya wateja wa mwafaka.

Teku inatoa chaguzi rahisi sana za usambazaji. Nodi ya kinara na mteja wa mthibitishaji zinaweza kuendeshwa pamoja kama mchakato mmoja, ambayo ni rahisi sana kwa waweka dhamana wa kujitegemea, au nodi zinaweza kuendeshwa kando kwa shughuli za kisasa za uwekaji dhamana. Kwa kuongezea, Teku inayoingiliana kikamilifu na [Web3Signer](https://github.com/ConsenSys/web3signer/) kwa usalama wa ufunguo wa kusaini na ulinzi wa ukataji.

Teku imeandikwa katika Java na ina leseni ya Apache 2.0. Inatengenezwa na timu ya Itifaki katika ConsenSys ambayo pia inawajibika kwa Besu na Web3Signer. Jifunze zaidi katika [nyaraka za Teku](https://docs.teku.consensys.net/en/latest/).

### Grandine {#grandine}

Grandine ni utekelezaji wa mteja wa mwafaka, ulioandikwa katika Rust chini ya leseni ya GPL-3.0. Inadumishwa na Timu ya Msingi ya Grandine na ni ya haraka, yenye utendaji wa juu na nyepesi. Inafaa anuwai ya waweka dhamana kutoka kwa waweka dhamana wa kujitegemea wanaoendesha kwenye vifaa vya rasilimali ya chini kama vile Raspberry Pi hadi waweka dhamana wakubwa wa taasisi wanaoendesha makumi ya maelfu ya wathibitishaji.

Nyaraka zinaweza kupatikana katika [Kitabu cha Grandine](https://docs.grandine.io/)

## Njia za usawazishaji {#sync-modes}

Ili kufuata na kuthibitisha data ya sasa kwenye mtandao, mteja wa Ethereum anahitaji kusawazisha na hali ya hivi punde ya mtandao. Hii inafanywa kwa kupakua data kutoka kwa rika, kuthibitisha uadilifu wao kwa njia ya kriptografia, na kujenga hifadhidata ya ndani ya mnyororo wa vitalu.

Njia za usawazishaji zinawakilisha mbinu tofauti za mchakato huu na mabadilishano mbalimbali. Wateja pia hutofautiana katika utekelezaji wao wa algoriti za usawazishaji. Rejelea kila wakati nyaraka rasmi za mteja uliyemchagua kwa maelezo mahususi kuhusu utekelezaji.

### Njia za usawazishaji za tabaka la utekelezaji {#execution-layer-sync-modes}

Tabaka la utekelezaji linaweza kuendeshwa katika njia tofauti ili kuendana na matukio tofauti ya matumizi, kuanzia kutekeleza upya hali ya ulimwengu ya mnyororo wa vitalu hadi kusawazisha tu na ncha ya mnyororo kutoka kwa kituo cha ukaguzi kinachoaminika.

#### Usawazishaji kamili {#full-sync}

Usawazishaji kamili hupakua vitalu vyote (ikijumuisha vichwa na miili ya kitalu) na kuzalisha upya hali ya mnyororo wa vitalu kwa kuongezeka kwa kutekeleza kila kitalu kutoka asili.

- Hupunguza uaminifu na hutoa usalama wa juu zaidi kwa kuthibitisha kila muamala.
- Kwa kuongezeka kwa idadi ya miamala, inaweza kuchukua siku hadi wiki kuchakata miamala yote.

[Nodi za kumbukumbu](#archive-node) hufanya usawazishaji kamili ili kujenga (na kuhifadhi) historia kamili ya mabadiliko ya hali yaliyofanywa na kila muamala katika kila kitalu.

#### Usawazishaji wa haraka {#fast-sync}

Kama usawazishaji kamili, usawazishaji wa haraka hupakua vitalu vyote (ikijumuisha vichwa, miamala, na risiti). Hata hivyo, badala ya kuchakata upya miamala ya kihistoria, usawazishaji wa haraka hutegemea risiti hadi ufikie kichwa cha hivi karibuni, ambapo hubadilika na kuingiza na kuchakata vitalu ili kutoa nodi kamili.

- Mkakati wa usawazishaji wa haraka.
- Hupunguza mahitaji ya uchakataji kwa kupendelea matumizi ya kipimo data.

#### Usawazishaji wa snap {#snap-sync}

Usawazishaji wa snap pia huthibitisha mnyororo kitalu kwa kitalu. Hata hivyo, badala ya kuanzia kwenye kitalu cha asili, usawazishaji wa snap huanza kwenye kituo cha ukaguzi cha hivi karibuni 'kinachoaminika' ambacho kinajulikana kuwa sehemu ya mnyororo wa vitalu wa kweli. Nodi huhifadhi vituo vya ukaguzi vya mara kwa mara huku ikifuta data ya zamani kuliko umri fulani. Picha hizi hutumiwa kuzalisha upya data ya hali inapohitajika, badala ya kuihifadhi milele.

- Mkakati wa usawazishaji wa haraka zaidi, kwa sasa ni chaguo-msingi katika Mtandao Mkuu wa Ethereum.
- Huokoa matumizi mengi ya diski na kipimo data cha mtandao bila kuathiri usalama.

[Zaidi kuhusu usawazishaji wa snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md).

#### Usawazishaji mwepesi {#light-sync}

Hali ya kiteja chepesi hupakua vichwa vyote vya kitalu, data ya kitalu, na kuthibitisha baadhi bila mpangilio. Husawazisha tu ncha ya mnyororo kutoka kwa kituo cha ukaguzi kinachoaminika.

- Hupata tu hali ya hivi punde huku ikitegemea uaminifu kwa wasanidi programu na utaratibu wa makubaliano.
- Mteja yuko tayari kutumia na hali ya sasa ya mtandao katika dakika chache.

**NB** Usawazishaji mwepesi bado haufanyi kazi na Uthibitisho wa Dau (PoS) wa Ethereum - matoleo mapya ya usawazishaji mwepesi yanapaswa kusafirishwa hivi karibuni!

[Zaidi kuhusu wateja wepesi](/developers/docs/nodes-and-clients/light-clients/)

### Njia za usawazishaji za tabaka la mwafaka {#consensus-layer-sync-modes}

#### Usawazishaji wa matumaini {#optimistic-sync}

Usawazishaji wa matumaini ni mkakati wa usawazishaji wa baada ya unganisho ulioundwa kuwa wa hiari na unaoendana nyuma, kuruhusu nodi za utekelezaji kusawazisha kupitia mbinu zilizowekwa. Injini ya utekelezaji inaweza kuingiza _kwa matumaini_ vitalu vya kinara bila kuvithibitisha kikamilifu, kupata kichwa cha hivi punde, na kisha kuanza kusawazisha mnyororo na mbinu zilizo hapo juu. Kisha, baada ya kiteja cha utekelezaji kupata, itamjulisha mteja wa mwafaka kuhusu uhalali wa miamala katika Mnyororo wa Beacon.

[Zaidi kuhusu usawazishaji wa matumaini](https://github.com/ethereum/consensus-specs/blob/master/sync/optimistic.md)

#### Usawazishaji wa kituo cha ukaguzi {#checkpoint-sync}

Usawazishaji wa kituo cha ukaguzi, unaojulikana pia kama usawazishaji wa udhanifu dhaifu, huunda uzoefu bora wa mtumiaji kwa kusawazisha Nodi ya Kinara. Inategemea dhana za [udhanifu dhaifu](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/) ambayo huwezesha kusawazisha Mnyororo wa Beacon kutoka kwa kituo cha ukaguzi cha hivi karibuni cha udhanifu dhaifu badala ya asili. Usawazishaji wa kituo cha ukaguzi hufanya muda wa awali wa usawazishaji kuwa wa haraka zaidi na dhana za uaminifu sawa na kusawazisha kutoka [asili](/glossary/#genesis-block).

Kwa vitendo, hii inamaanisha nodi yako inaunganishwa na huduma ya mbali ili kupakua hali za hivi karibuni zilizokamilishwa na inaendelea kuthibitisha data kutoka hatua hiyo. Mhusika wa tatu anayetoa data anaaminika na anapaswa kuchaguliwa kwa uangalifu.

Zaidi kuhusu [usawazishaji wa kituo cha ukaguzi](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)

## Usomaji zaidi {#further-reading}

- [Ethereum 101 - Sehemu ya 2 - Kuelewa Nodi](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 Februari 2019_
- [Kuendesha Nodi Kamili za Ethereum: Mwongozo kwa Wasio na Motisha Sana](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 Novemba 2019_

## Mada zinazohusiana {#related-topics}

- [Vitalu](/developers/docs/blocks/)
- [Mitandao](/developers/docs/networks/)

## Mafunzo yanayohusiana {#related-tutorials}

- [Geuza Raspberry Pi 4 yako kuwa nodi ya mthibitishaji kwa kuwasha tu kadi ya MicroSD - Mwongozo wa usakinishaji](/developers/tutorials/run-node-raspberry-pi/) _- Washa Raspberry Pi 4 yako, chomeka kebo ya ethaneti, unganisha diski ya SSD na uwashe kifaa ili kugeuza Raspberry Pi 4 kuwa nodi kamili ya Ethereum inayoendesha tabaka la utekelezaji (Mtandao Mkuu) na / au tabaka la mwafaka (Mnyororo wa Beacon / mthibitishaji)._