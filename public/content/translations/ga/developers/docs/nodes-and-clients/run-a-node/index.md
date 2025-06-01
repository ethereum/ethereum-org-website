---
title: Déan do nód Ethereum féin a shníomh
description: Réamhrá ginearálta ar d'ásc féin de chliant Ethereum a rith.
lang: ga
sidebarDepth: 2
---

Soláthraíonn rith do nód féin buntáistí éagsúla duit, osclaíonn sé féidearthachtaí nua, agus cabhraíonn sé le tacú leis an éiceachóras. Tabharfaidh an leathanach seo treoir duit chun do nód féin a shníomh agus páirt a ghlacadh in idirbhearta Ethereum a bhailíochtú.

Tabhair faoi deara, tar éis [The Merge](/roadmap/merge), go gceanglaítear ar bheirt chliaint nód Ethereum a rith; cliant **ciseal reatha (EL)** agus cliant ** ciseal comhdhearcaidh (CL)**. Taispeánfaidh an leathanach seo conas an dá chliaint seo a shuiteáil, a chumrú agus a nascadh chun nód Ethereum a rith.

## Réamhriachtanais {#prerequisites}

Ba cheart duit a thuiscint cad is nód Ethereum ann agus cén fáth go mbeadh fonn ort cliant a rith. Clúdaítear é seo in [Nóid agus cliaint](/developers/docs/nodes-and-clients/).

Mura bhfuil taithí agat ar nód a rith, nó má tá conair nach bhfuil chomh teicniúil uait, molaimid duit ár réamhrá atá éasca le húsáid a sheiceáil ar [nód Ethereum a rith](/run-a-node).

## Ag roghnú cur chuige {#choosing-approach}

Is é an chéad chéim chun do nód a shníomh ná do chur chuige a roghnú. Bunaithe ar riachtanais agus ar fhéidearthachtaí éagsúla, ní mór duit cur i bhfeidhm na gcliant (na gcliant reatha agus comhdhearcaidh araon), an timpeallacht (crua-earraí, córas), agus na paraiméadair do shuímh na gcliant a roghnú.

Tabharfaidh an leathanach seo treoir duit trí na cinntí seo agus cabhróidh sé leat teacht ar an mbealach is oiriúnaí chun d'ásc Ethereum a rith.

Chun rogha a dhéanamh ó fheidhmiúcháin cliant, féach ar na [cliaint reatha](/developers/docs/nodes-and-clients/#execution-clients) atá ar fáil, <[cliaint chomhdhearcaidh](/developers/docs/nodes-and-clients/#consensus-clients) agus foghlaim faoi [éagsúlacht cliant](/developers/docs/nodes-and-clients/client-diversity).

Déan cinneadh cé acu ar cheart duit na bogearraí a rith ar do [crua-earraí nó sa scamall](#local-vs-cloud), le haird ar [riachtanais na gcliant](#requirements).

Tar éis duit an timpeallacht a ullmhú, suiteáil na cliaint roghnaithe le [comhéadan cairdiúil do thosaitheoirí](#automatized-setup) nó [de láimh](#manual-setup) ag úsáid teirminéal le roghanna forbartha.

Agus an nód á rith agus á shioncronú, tá tú réidh le [é a úsáid](#using-the-node), ach bí cinnte súil a choinneáil ar a [chothabháil](#operating-the-node).

![Cumraíocht chliant](./diagram.png)

### Timpeallacht agus crua-earraí {#environment-and-hardware}

#### Áitiúil nó néal {#local-vs-cloud}

Tá cliaint Ethereum in ann oibriú ar ríomhairí tomhaltóra agus níl aon chrua-earraí speisialta ag teastáil uathu, cosúil le meaisíní mianadóireachta mar shampla. Mar sin, tá roghanna éagsúla agat chun an nód a imscaradh bunaithe ar do chuid riachtanas. Chun simpliú a dhéanamh, smaoinímis ar nód a rith ar mheaisín fisiciúil áitiúil agus ar fhreastalaí néil araon:

- Néal
  - Tairgeann soláthraithe ard-aga fónaimh fhreastalaí agus seoltaí IP poiblí statacha
  - Is féidir le freastalaí tiomnaithe nó fíorúil a bheith níos compordaí ná do chuid féin a thógáil
  - Tá muinín ag comhréiteach as tríú páirtí - soláthraí freastalaí
  - Mar gheall ar an méid stórais a theastaíonn le haghaidh nód iomlán, d'fhéadfadh praghas freastalaí ar cíos a bheith ard
- Crua-earraí féin
  - Cur chuige níos neamhiontaofa agus ceannasach
  - Infheistíocht aon uaire
  - An rogha meaisíní réamhchumraithe a cheannach
  - Caithfidh tú an meaisín agus an líonrú a ullmhú, a chothabháil agus a b'fhéidir fabhtcheartú a dhéanamh

Tá buntáistí éagsúla ag an dá rogha mar atá achoimrithe thuas. Má tá réiteach néil uait, chomh maith le go leor soláthraithe néalríomhaireachta traidisiúnta, tá seirbhísí ann freisin atá dírithe ar nóid a imscaradh. Seiceáil [nóid mar sheirbhís](/developers/docs/nodes-and-clients/nodes-as-a-service/) le haghaidh tuilleadh roghanna ar nóid óstáilte.

#### Crua-earraí {#hardware}

Mar sin féin, níor cheart go mbeadh líonra díláraithe atá frithsheasmhach do chinsireacht ag brath ar sholáthraithe néil. Ina áit sin, tá sé níos sláintiúla don éiceachóras do nód a reáchtáil ar do chrua-earraí áitiúla féin. Léiríonn [Meastacháin](https://www.ethernodes.org/networkType/Hosting) sciar mór de na nóid a ritear ar an néal, rud a d'fhéadfadh a bheith ina phointe aonair teipe.

Is féidir le cliaint Ethereum rith ar do ríomhaire, ríomhaire glúine, freastalaí, nó fiú ríomhaire aonchláir. Cé gur féidir cliaint a reáchtáil ar do ríomhaire pearsanta, má tá meaisín tiomnaithe díreach do do nód féadann sé a fheidhmíocht agus a shlándáil a fheabhsú go suntasach agus an tionchar ar do phríomh-ríomhaire a íoslaghdú.

Is féidir leis a bheith an-éasca do chrua-earraí féin a úsáid. Tá go leor roghanna simplí ann chomh maith le hard-shocruithe do dhaoine níos teicniúla. Mar sin féachaimis ar na riachtanais agus na modhanna chun cliaint Ethereum a reáchtáil ar do ríomhaire.

#### Riachtanais {#requirements}

Ní hionann riachtanais crua-earraí idir chliaint ach de ghnáth ní bhíonn siad chomh hard sin mar ní gá don nód ach fanacht sioncronaithe. Ná meas gur ionann é agus mianadóireacht, rud a éilíonn cumhacht ríomhaireachta i bhfad níos mó. Feabhsaítear am sioncronaithe agus feidhmíocht le crua-earraí níos cumhachtaí, áfach.

Sula ndéanann tú aon chliant a shuiteáil, cinntigh le do thoil go bhfuil go leor acmhainní ag do ríomhaire chun é a rith. Is féidir leat na ceanglais íosta agus molta a fháil thíos.

Is é spás diosca den chuid is mó an scroig ar do chrua-earraí. Tá sioncronú bhlocshlabhra Ethereum an-dian ar ionchur/aschur agus éilíonn sé go leor spáis. Is fearr **tiomáint soladstaide (SSD)** a bheith agat leis na céadta GB de spás saor le spáráil fiú tar éis an tsioncrónaithe.

Braitheann méid an bhunachair shonraí agus luas an tsioncrónaithe tosaigh ar an gcliant roghnaithe, a chumraíocht agus a [straitéis sioncronaithe](/developers/docs/nodes-and-clients/#sync-modes).

Cinntigh freisin nach bhfuil do nasc idirlín teoranta ag [caidhp bandaleithead](https://wikipedia.org/wiki/Data_cap). Moltar nasc neamh-mhéadraithe a úsáid mar go bhféadfadh an sioncronú tosaigh agus na sonraí a chraoltar chuig an líonra do theorainn a shárú.

##### Córas oibriúcháin

Tacaíonn gach cliant le mórchórais oibriúcháin - Linux, MacOS, Windows. Ciallaíonn sé seo gur féidir leat nóid a rith ar ghnáth-mheaisíní deisce nó ar fhreastalaithe rialta leis an gcóras oibriúcháin (OS) is fearr a oireann duit. Bí cinnte go bhfuil do OS cothrom le dáta chun saincheisteanna ionchasacha agus leochaileachtaí slándála a sheachaint.

##### Riachtanais íosta

- LAP le 2+ croíleacáin
- 8 GB RAM
- 2TB SSD
- 10+ MBit/s bandaleithead

##### Sonraíochtaí molta

- LAP tapa le 4+ croíleacáin
- 16 GB+ RAM
- SSD tapa le 2+TB
- 25+ MBit/s bandaleithead

Beidh tionchar ag an modh sioncronaithe agus an cliant a roghnaíonn tú ar riachtanais spáis, ach tá meastachán déanta againn ar an spás diosca a bheidh uait do gach cliant thíos.

| Cliant     | Méid an diosca (sioncronú snap) | Méid an diosca (cartlann iomlán) |
| ---------- | ------------------------------- | -------------------------------- |
| Besu       | 800GB+                          | 12TB+                            |
| Erigon     | N/A                             | 2.5TB+                           |
| Geth       | 500GB+                          | 12TB+                            |
| Nethermind | 500GB+                          | 12TB+                            |
| Reth       | N/A                             | 2.2TB+                           |

- Nóta: Ní thairgeann Erigon agus Reth sioncronú snap, ach is féidir Púnáil Iomlán a dhéanamh (~2TB le haghaidh Erigon, ~1.2TB do Reth)

Maidir le cliaint chomhdhearcaidh, braitheann riachtanas spáis freisin ar fheidhmiú na gcliant agus ar ghnéithe cumasaithe (m.sh. slaiseálaí bailíochtóra) ach de ghnáth comhairtear é le 200GB eile a theastaíonn le haghaidh sonraí rabhcháin. Le líon mór bailíochtóirí, fásann an t-ualach bandaleithead chomh maith. Is féidir leat [sonraí ar riachtanais na gcliant comhdhearcaidh a fháil san anailís seo](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc).

#### Réitigh plugáil agus seinn {#plug-and-play}

Is é an rogha is éasca chun nód a rith le do chrua-earraí féin ná boscaí plugáil-agus-seinn a úsáid. Tugann meaisíní réamhchumraithe ó dhíoltóirí an taithí is simplí: ordú, ceangal, rith. Tá gach rud réamhchumraithe agus ritheann sé go huathoibríoch le treoir iomasach agus painéal chun monatóireacht agus rialú a dhéanamh ar na bogearraí.

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### Ethereum ar ríomhaire aon-chláir {#ethereum-on-a-single-board-computer}

Bealach éasca agus saor chun nód Ethereum a rith ná ríomhaire aon bhoird a úsáid, fiú le hailtireacht ARM cosúil leis an Raspberry Pi. Soláthraíonn [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) íomhánna atá éasca le rith d’il-fheidhmiú agus cliant comhdhearcaidh le haghaidh Raspberry Pi agus boird ARM eile.

Tá gléasanna beaga, inacmhainne agus éifeachtacha mar seo oiriúnach chun nód a rith sa bhaile ach ná dearmad a bhfeidhmíocht theoranta.

## Ag casadh suas an nód {#spinning-up-node}

Is féidir socrú iarbhír na gcliant a dhéanamh le lainseálaithe uathoibrithe nó de láimh, trí bhogearraí cliaint a shocrú go díreach.

I gcás úsáideoirí nach bhfuil mórán taithí acu, is é an cur chuige a mholtar ná lainseálaí a úsáid, bogearraí a threoraíonn tú tríd an tsuiteáil agus a uathoibríonn próiseas cumraíochta an chliaint. Mar sin féin, má tá taithí éigin agat ar úsáid teirminéal, ba cheart go mbeadh na céimeanna le haghaidh cumraíocht de láimh simplí le leanúint.

### Cumraíocht treoraithe {#automatized-setup}

Tá sé mar aidhm ag tionscadail iolracha atá éasca le húsáid feabhas a chur ar an taithí a bhaineann le cliant a chumrú. Soláthraíonn na lainseálaithe seo suiteáil agus cumraíocht uathoibríoch don chliaint, agus cuireann cuid acu comhéadan grafach ar fáil fiú le haghaidh socrú treoraithe agus monatóireacht a dhéanamh ar chliaint.

Seo thíos roinnt tionscadal ar féidir leo cabhrú leat cliaint a shuiteáil agus a rialú le cúpla clic:

- [DappNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) - Ní thagann DappNode ach le meaisín ó dhíoltóir. Is féidir na bogearraí, an tosaitheoir nód iarbhír agus an t-ionad rialaithe le go leor gnéithe a úsáid ar chrua-earraí treallacha.
- [eth-docker](https://eth-docker.net/) - Socrú uathoibrithe ag baint úsáide as Docker dírithe ar gheallchur éasca agus slán, teastaíonn buneolas teirminéil agus Docker, molta d'úsáideoirí beagán níos forbartha.
- [Stereum](https://stereum.net/ethereum-node-setup/) - Lainseálaí chun cliaint a shuiteáil ar fhreastalaí cianda trí nasc SSH le treoir chumrú GUI, lárionad rialaithe, agus go leor gnéithe eile.
- [NiceNode](https://www.nicenode.xyz/) - Lainseálaí le taithí úsáideora simplí chun nód a rith ar do ríomhaire. Díreach roghnaigh cliaint agus tosaigh iad le cúpla clic. Fós á fhorbairt.
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) - Uirlis chumraíochta Nód a ghineann cumraíocht Docker go huathoibríoch trí úsáid a bhaint as draoi CLI. Scríofa in Go ag Nethermind.

### Socrú cliant de láimh {#manual-setup}

Is é an rogha eile ná bogearraí an chliaint a íoslódáil, a fhíorú agus a chumrú de láimh. Fiú má thairgeann roinnt cliant comhéadan grafach, teastaíonn bunscileanna leis an teirminéal le cumraíocht de láimh ach cuireann sé i bhfad níos mó solúbthachta ar fáil.

Mar a míníodh cheana, beidh gá le péire cliant comhdhearcaidh agus reatha a bhunú le haghaidh do nód Ethereum féin. D’fhéadfadh cliant éadrom a bheith cuimsithe i roinnt cliant den chineál eile agus sioncronú gan gá le haon bhogearraí eile. Mar sin féin, éilíonn fíorú iomlán iontaofa an dá chur i bhfeidhm.

#### Faigh na bogearraí cliant {#getting-the-client}

Ar dtús, ní mór duit do rogha [cliant reatha](/developers/docs/nodes-and-clients/#execution-clients) agus [bogearraí cliant comhdhearcaidh](/developers/docs/nodes-and-clients/#consensus-clients) a fháil.

Is féidir leat feidhmchlár inrite nó pacáiste suiteála a oireann do do chóras oibriúcháin agus d’ailtireacht a íoslódáil. Fíoraigh sínithe agus seiceálacha na bpacáistí íoslódála i gcónaí. Tairgeann roinnt cliant stóir nó íomhánna Docker freisin le haghaidh suiteála agus nuashonruithe níos éasca. Tá na cliaint go léir foinse oscailte, ionas gur féidir leat iad a thógáil ón bhfoinse freisin. Is modh níos forbartha é seo, ach i gcásanna áirithe, d'fhéadfadh sé a bheith ag teastáil.

Soláthraítear treoracha maidir le suiteáil gach cliant sna doiciméid atá nasctha sna liostaí cliant thuas.

Seo iad leathanaigh eisithe na gcliant mar ar féidir leat teacht ar a gcuid dénártha réamhthógtha nó treoracha maidir le suiteáil:

##### Cliaint fhorghníomhú

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads/)
- [Nethermind](https://downloads.nethermind.io/)
- [Reth](https://reth.rs/installation/installation.html)

Is fiú a thabhairt faoi deara freisin gur saincheist í [éagsúlacht na gcliant maidir leis an gciseal reatha](/developers/docs/nodes-and-clients/client-diversity/#execution-layer). Moltar do léitheoirí smaoineamh ar chliant reatha mionlaigh a reáchtáil.

##### Cliaint comhdhearcadh

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/install/source/) (Ní sholáthraíonn sé dénártha réamhthógtha, íomhá Docker amháin nó le tógáil ón bhfoinse)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

Tá [éagsúlacht cliant](/developers/docs/nodes-and-clients/client-diversity/) ríthábhachtach do nóid chomhdhearcaidh a ritheann bailíochtóirí. Má tá feidhmiú chliant amháin á rith ag tromlach na mbailíochtóirí, tá slándáil líonra i mbaol. Moltar mar sin smaoineamh ar chliant mionlaigh a roghnú.

[Féach ar an úsáid chliaint líonra is déanaí ](https://clientdiversity.org/) agus foghlaim tuilleadh faoi [ éagsúlacht cliant](/developers/docs/nodes-and-clients/client-diversity).

##### Na bogearraí a fhíorú

Agus bogearraí á n-íoslódáil ón idirlíon, moltar a sláine a fhíorú. Tá an chéim seo roghnach ach go háirithe le píosa bonneagair ríthábhachtach cosúil leis an gcliant Ethereum, tá sé tábhachtach a bheith ar an eolas faoi veicteoirí ionsaithe féideartha agus iad a sheachaint. Má d'íoslódáil tú dénártha réamhthógtha, ní mór duit muinín a bheith agat ann agus riosca a bheith agat go bhféadfadh ionsaitheoir an fheidhm inrite a mhalartú le haghaidh ceann mailíseach.

Síníonn forbróirí dénártha scaoilte lena n-eochracha PGP ionas gur féidir leat a fhíorú go cripteagrafach go bhfuil tú ag rith go díreach na bogearraí a chruthaigh siad. Níl le déanamh agat ach eochracha poiblí a úsáideann forbróirí a fháil, ar féidir iad a fháil ar leathanaigh eisithe na gcliant nó i gcáipéisíocht. Tar éis duit an eisiúint chliant a íoslódáil agus a shíniú, is féidir leat feidhmiú PGP a úsáid, m.sh. [GnuPG](https://gnupg.org/download/index.html) chun iad a fhíorú go héasca. Féach ar chúrsa teagaisc maidir le bogearraí foinse oscailte a fhíorú trí úsáid a bhaint as `gpg` ar [linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) nó [Windows/MacOS](https://freedom.press/training/verifying-open-source-software/).

Foirm eile fíoraithe is ea a chinntiú go bhfuil hais, méarloirg cripteagrafach uathúil, na mbogearraí a d’íoslódáil tú ag teacht leis an gceann a chuir na forbróirí ar fáil. Tá sé seo níos éasca fós ná PGP a úsáid, agus ní thairgeann roinnt cliant ach an rogha seo. Déan an fheidhm haise a rith go díreach ar na bogearraí íoslódáilte agus cuir í i gcomparáid leis an gceann ón leathanach scaoileadh. Mar shampla:

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### Cumraíocht chliant {#client-setup}

Tar éis duit na bogearraí cliant a shuiteáil, a íoslódáil, nó a thiomsú, tá tú réidh chun é a rith. Ní chiallaíonn sé seo ach go gcaithfear é a rith leis an gcumraíocht cheart. Tairgeann cliaint roghanna saibhir cumraíochta, ar féidir leo gnéithe éagsúla a chumasú.

Tosaímid le roghanna ar féidir leo tionchar suntasach a imirt ar fheidhmíocht na gcliant agus ar úsáid sonraí. Léiríonn [ modhanna sioncronaithe](/developers/docs/nodes-and-clients/#sync-modes) modhanna éagsúla chun sonraí blocshlabhra a íoslódáil agus a bhailíochtú. Sula dtosaíonn tú an nód, ba cheart duit cinneadh a dhéanamh cén modh líonra agus sioncronaithe a úsáidfidh tú. Is iad na rudaí is tábhachtaí le breithniú ná an spás diosca, agus an t-am sioncronaithe a bheidh ag teastáil ón gcliant. Tabhair aird ar dhoiciméid an chliaint chun a chinneadh cén modh sioncronaithe atá réamhshocraithe. Mura n-oireann sin duit, roghnaigh ceann eile bunaithe ar an leibhéal slándála, na sonraí atá ar fáil, agus an costas. Seachas an t-algartam sioncrónaithe, is féidir leat prúnáil de chineálacha éagsúla sean-shonraí a shocrú freisin. Cumasaíonn prúnáil sonraí atá as dáta a scriosadh, m.sh. nóid trie stáit a bhaint nach féidir teacht orthu ó bhloic le déanaí.

Tá roghanna bunúsacha cumraíochta eile ann, e.g. roghnú líonra - Mainnet nó testnets, críochphointe HTTP do RPC nó WebSockets, srl a chumasú. Is féidir leat na gnéithe agus na roghanna go léir a fháil i ndoiciméadú an chliaint. Is féidir cumraíochtaí éagsúla cliant a shocrú tríd an gcliant a rith leis na bratacha comhfhreagracha go díreach sa chomhad CLI nó cumraíochta. Tá gach cliant beagán difriúil; déan tagairt i gcónaí dá cháipéisíocht oifigiúil nó dá leathanach cabhrach le haghaidh sonraí ar roghanna cumraíochta.

Chun críocha tástála, b'fhéidir gurbh fhearr leat cliant a rith ar cheann de na líonraí testnet. [Féach forbhreathnú ar líonraí tacaithe](/developers/docs/nodes-and-clients/#execution-clients).

Is féidir samplaí de chliaint reatha a rith le cumraíocht bhunúsach a fháil sa chéad chuid eile.

#### Ag tosú leis an gcliant reatha {#starting-the-execution-client}

Sula dtosaíonn tú ar na bogearraí cliant Ethereum, déan seiceáil deireanach go bhfuil do thimpeallacht réidh. Mar shampla, déan cinnte:

- Tá go leor spáis diosca nuair a chuirtear san áireamh an líonra roghnaithe agus an modh sioncronaithe.
- Ní chuireann cláir eile stop le cuimhne agus LAP.
- Déantar an córas oibriúcháin a nuashonrú go dtí an leagan is déanaí.
- Tá an t-am agus an dáta ceart ag an gcóras.
- Glacann do ródaire agus balla dóiteáin naisc ar phoirt éisteachta. De réir réamhshocraithe úsáideann cliaint Ethereum port éisteora (TCP) agus port fionnachtana (UDP), araon ar 30303 de réir réamhshocraithe.

Rith do chliant ar testnet ar dtús le cinntiú go bhfuil gach rud ag obair i gceart.

Ní mór duit aon socruithe cliant nach bhfuil réamhshocraithe a dhearbhú ag an tús. Is féidir leat bratacha nó an comhad cumraíochta a úsáid chun an chumraíocht is fearr leat a dhearbhú. Bíonn tacar gnéithe agus comhréir cumraíochta gach cliant difriúil. Seiceáil doiciméadú do chliaint le haghaidh na sonraí.

Déanann cliaint reatha agus comhdhearcaidh cumarsáid trí chríochphointe fíordheimhnithe atá sonraithe in [Engine API](https://github.com/ethereum/execution-apis/tree/main/src/engine). Chun nascadh le cliant comhdhearcaidh, ní mór don chliant reatha [`jwtsecret`](https://jwt.io/) a ghiniúint ag cosán aitheanta. Ar chúiseanna slándála agus cobhsaíochta, ba cheart do chliaint a bheith ag rith ar an meaisín céanna, agus ní mór go mbeadh aithne ag an dá chliaint ar an gcosán seo toisc go n-úsáidtear é chun nasc RPC áitiúil eatarthu a fhíordheimhniú. Ní mór don chliant reatha port éisteachta a shainiú freisin le haghaidh APIanna fíordheimhnithe.

Gintear an comhartha seo go huathoibríoch ag bogearraí an chliaint, ach i gcásanna áirithe, b'fhéidir go mbeadh ort é a dhéanamh tú féin. Is féidir leat é a ghiniúint trí úsáid a bhaint as [OpenSSL](https://www.openssl.org/):

```sh
openssl rand -hex 32 > jwtsecret
```

#### Cliant ratha a rith {#running-an-execution-client}

Tabharfaidh an chuid seo treoir duit trí chliaint reatha a thosú. Ní fheidhmíonn sé ach mar shampla de chumraíocht bhunúsach, a chuirfidh tús leis an gcliant leis na socruithe seo:

- Sonraítear líonra le nascadh leis, Mainnet inár samplaí
  - Ina ionad sin is féidir leat [ceann de testnets](/developers/docs/networks/) a roghnú le haghaidh réamhthástáil ar do chumraíocht
- Sainmhíníonn eolaire sonraí, ina stórálfar na sonraí go léir lena n-áirítear blocshlabhra
  - Déan cinnte an cosán a chur in ionad ceann fíor, m.sh. ag díriú ar do thiomáint seachtrach
- Cumasaíonn sé comhéadain chun cumarsáid a dhéanamh leis an gcliant
  - Lena n-áirítear JSON-RPC agus Inneall API le haghaidh cumarsáide le cliant comhdhearcaidh
- Sainmhíníonn sé conair chuig `jwtsecret` don API fíordheimhnithe
  - Déan cinnte cosán an tsampla a chur in ionad cosán fíor ar féidir le cliaint rochtain a fháil air, m.sh. `/tmp/jwtsecret`

Meabhraigh le do thoil nach bhfuil anseo ach sampla bunúsach, beidh gach cumraíocht eile socraithe mar réamhshocrú. Tabhair aird ar dhoiciméadú gach cliant chun foghlaim faoi luachanna réamhshocraithe, socruithe agus gnéithe. Le haghaidh tuilleadh gnéithe, mar shampla le haghaidh bailíochtóiirí a rith, monatóireacht, etc., féach ar dhoiciméadú an chliaint ar leith.

> Tabhair faoi deara gur chun críocha formáidithe amháin a úsáidtear cúlslais `\` i samplaí; is féidir bratacha cumraíochta a shainiú i líne amháin.

##### Ag rith Besu

Tosaíonn an sampla seo Besu ar Mainnet, stórálann sé sonraí blocshlabhra i bhformáid réamhshocraithe ag `/data/ethereum`, cuireann sé ar chumas JSON-RPC agus Engine RPC cliant comhdhearcaidh a nascadh. Fíordheimhnítear Engine API le comhartha `jwtsecret` agus ní cheadaítear ach glaonna ó `localhost`.

```sh
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

Tagann Besu le rogha lainseálaithe freisin a chuirfidh sraith ceisteanna agus a ghinfidh an comhad cumraíochta. Rith an tosaitheoir idirghníomhach ag úsáid:

```sh
besu --Xlauncher
```

[Tá roghanna breise agus sonraí cumraíochta i gcáipéisíocht Besu](https://besu.hyperledger.org/en/latest/HowTo/Get-Started/Starting-node/).

##### At rith Erigon

Tosaíonn an sampla seo Erigon ar Mainnet, stórálann sé sonraí blocshlabhra ag `/data/ethereum`, cumasaíonn sé JSON-RPC, sainmhíníonn sé cé na spásanna ainm a cheadaítear agus cumasaíonn sé fíordheimhniú chun an cliant comhdhearcaidh atá sainmhínithe ag an `jwtsecret` a nascadh ag cosán rúnda.

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

De réir réamhshocraithe déanann Erigon sioncronú iomlán le 8GB HDD as a dtiocfaidh níos mó ná 2TB de shonraí cartlainne. Cinntigh go bhfuil `datadir` ag díriú ar dhiosca a bhfuil go leor spáis ar fáil ann nó breathnaigh ar bhratach `--prúnála` ar féidir léi cineálacha éagsúla sonraí a bhearradh. Seiceáil `--cabhair` Erigon chun tuilleadh a fhoghlaim.

##### Ag rith Geth

Tosaíonn an sampla seo Geth ar Mainnet, stórálann sé sonraí blocshlabhra ag `/data/ethereum`, cumasaíonn sé JSON-RPC agus sainmhíníonn sé na spásanna ainm a cheadaítear. Cumasaíonn sé freisin fíordheimhniú chun cliant comhdhearcaidh a nascadh a éilíonn cosán chuig `jwtsecret` agus freisin rogha chun na naisc a cheadaítear a shainiú, inár sampla amháin ó `localhost`.

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Seiceáil [docs le haghaidh gach rogha cumraíochta](https://geth.ethereum.org/docs/fundamentals/command-line-options) agus foghlaim tuilleadh faoi [rith Geth le cliant comhdhearcaidh](https://geth.ethereum.org/docs/getting-started/consensus-clients).

##### Ag rith Nethermind

Tairgeann Nethermind [roghanna suiteála](https://docs.nethermind.io/nethermind/first-steps-with-nethermind/getting-started) éagsúla. Tagann an pacáiste le cóid dhénártha éagsúla, lena n-áirítear Lainseála le socrú treoraithe, a chabhróidh leat an chumraíocht a chruthú go hidirghníomhach. Nó, aimsíonn tú Runner arb é an fheidhm inrite é féin agus is féidir leat é a rith díreach le bratacha cumraíochta. Tá JSON-RPC cumasaithe de réir réamhshocraithe.

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

Tairgeann docs Nethermind [treoir iomlán](https://docs.nethermind.io/nethermind/first-steps-with-nethermind/running-nethermind-post-merge) maidir le Nethermind a rith le cliant comhdhearcaidh.

Tosóidh cliant reatha a chroífheidhmeanna, a chríochphointí roghnaithe, agus tosóidh sé ag lorg piaraí. Tar éis dó piaraí a fhionnadh go rathúil, tosaíonn an cliant an sioncronú. Beidh an cliant reatha ag fanacht le nasc ón gcliant comhdhearcaidh. Beidh sonraí reatha blocshlabhra ar fáil nuair a bheidh an cliant sioncronaithe go rathúil leis an staid reatha.

##### Ag rith Reth

Tosaíonn an sampla seo Reth ar Mainnet, ag baint úsáide as suíomh sonraí réamhshocraithe. Cumasaíonn sé fíordheimhniú JSON-RPC agus Engine RPC chun an cliant comhdhearcaidh atá sainmhínithe ag an gcosán `jwtsecret` a nascadh, agus ní cheadaítear ach glaonna ó `localhost`.

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

Féach [Cumrú Reth](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth) chun tuilleadh a fhoghlaim faoi eolairí sonraí réamhshocraithe. Tá roghanna breise agus sonraí cumraíochta i [i gcáipéisíocht Reth](https://reth.rs/run/mainnet.html).

#### Ag tosú leis an gcliant comhdhearcaidh {#starting-the-consensus-client}

Ní mór an cliant comhdhearcaidh a thosú leis an gcumraíocht cheart poirt chun nasc RPC áitiúil a bhunú leis an gcliant reatha. Ní mór na cliaint chomhdhearcaidh a rith leis an bport cliant reatha nochta mar argóint chumraíochta.

Teastaíonn ón gcliant comhdhearcadh freisin an cosán chuig `jwt-secret` an chliaint reatha chun an nasc RPC eatarthu a fhíordheimhniú. Cosúil leis na samplaí reatha thuas, tá bratach cumraíochta ag gach cliant comhdhearcaidh a ghlacann cosán an chomhaid chomharthaí jwt mar argóint. Caithfidh sé seo a bheith comhsheasmhach leis an gcosán `jwtsecret` a thugtar don chliant reatha.

Má tá sé beartaithe agat bailíochtóir a rith, déan cinnte bratach cumraíochta a chur leis ina sonraítear seoladh Ethereum fhaighteoir na táille. Seo nuair a charnann luach saothair éitear do do bhailíochtóir. Tá rogha ag gach cliant comhdhearcaidh, m.sh. `--suggested-fee-recipient=0xabcd1`, a thógann seoladh Ethereum mar argóint.

Agus Nód Rabhcáin á thosú ar líonra tástála, is féidir leat am suntasach sioncronaithe a shábháil trí úsáid a bhaint as críochphointe poiblí le haghaidh [Sioncronú seicphointe](https://notes.ethereum.org/@launchpad/checkpoint-sync).

#### Cliant comhdhearcaidh a rith {#running-a-consensus-client}

##### Ag rith Lighthouse

Sula ritheann tú Lighthouse, foghlaim tuilleadh faoi conas é a shuiteáil agus a chumrú i [Leabhar Lighthouse](https://lighthouse-book.sigmaprime.io/installation.html).

```sh
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### Ag rith Lodestar

Suiteáil bogearraí Lodestar trína thiomsú nó tríd an íomhá Docker a íoslódáil. Foghlaim tuilleadh i [docs](https://chainsafe.github.io/lodestar/) agus in [treoir chumraíochta](https://hackmd.io/@philknows/rk5cDvKmK).

```sh
lodestar beacon \
    --rootDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### Ag rith Nimbus

Tagann Nimbus le cliaint chomhdhearcaidh agus reatha araon. Is féidir é a rith ar ghléasanna éagsúla fiú le cumhacht ríomhaireachta an-bheag. Tar éis [spleáchais agus Nimbus féin](https://nimbus.guide/quick-start.html) a shuiteáil, is féidir leat a chliant comhdhearcaidh a rith:

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### Ag rith Prysm

Tagann Prysm le script a cheadaíonn suiteáil uathoibríoch éasca. Is féidir sonraí a fháil sna [doiciméid Prysm](https://docs.prylabs.network/docs/install/install-with-script).

```sh
./prysm.sh beacon-chain \
    --mainnet \
    --datadir /data/ethereum  \
    --execution-endpoint=http://localhost:8551  \
    --jwt-secret=/path/to/jwtsecret
```

##### Ag rith Teku

```sh
teku --network mainnet \
    --data-path "/data/ethereum" \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file "/path/to/jwtsecret"
```

Nuair a nascann cliant comhdhearcaidh leis an gcliant reatha chun an conradh taisce a léamh agus bailíochtóirí a aithint, nascann sé freisin le piaraí Nód Rabhcáin eile agus tosaíonn sé ag sioncrónú sliotáin chomhdhearcaidh ó ghineas. Nuair a shroicheann an Nód Rabhcáin an tréimhse reatha, beidh an Beacon API inúsáidte ag do bhailíochtóirí. Foghlaim tuilleadh faoi [Nód Rabhcáin API ](https://eth2docs.vercel.app/).

### Bailíochtóirí a chur leis {#adding-validators}

Feidhmíonn cliant comhdhearcaidh mar Nód Rabhcáin chun go bhféadfaidh bailíochtóirí nascadh. Tá a bhogearraí bailíochtaithe féin ag gach cliant comhdhearcaidh a ndéantar cur síos mionsonraithe orthu ina dhoiciméid faoi seach.

Trí do bhailíochtóir féin a rith ceadaítear [geallta aonair](/staking/solo/), an modh is mó tionchair agus is neamhiontaofa chun tacú le líonra Ethereum. Mar sin féin, éilíonn sé seo éarlais de 32 ETH. Chun bailíochtóir a rith ar do nód féin le méid níos lú, b'fhéidir go mbeadh suim agat i linn díláraithe le hoibreoirí nód gan chead, mar [Rocket Pool](https://rocketpool.net/node-operators).

Is é an bealach is éasca chun tús a chur le giniúint eochrach geallta agus bailíochtóirí ná [Holesky Testnet Staking Launchpad](https://holesky.launchpad.ethereum.org/) a úsáid, a ligeann duit do socraithe ag [nóid rith ar Holesky](https://notes.ethereum.org/@launchpad/holesky). Nuair a bheidh tú réidh le haghaidh Mainnet, is féidir leat na céimeanna seo a dhéanamh arís ag baint úsáide as an [Mainnet Staking Launchpad](https://launchpad.ethereum.org/).

Breathnaigh ar [leathanach geallchuir](/staking) le haghaidh forbhreathnú ar na roghanna geallta.

### An nód a úsáid {#using-the-node}

Tairgeann cliaint reatha [ críochphointí API RPC](/developers/docs/apis/json-rpc/) ar féidir leat a úsáid chun idirbhearta a chur isteach, idirghníomhú le conarthaí cliste ar líonra Ethereum nó iad a imscaradh ar bhealaí éagsúla:

- Ag glaoch orthu de láimh le prótacal oiriúnach (m.sh. ag baint úsáide as `curl`)
- Consól soláthraithe á cheangal (m.sh. `get attach`)
- Iad a chur i bhfeidhm in aon fheidhmchlár a úsáideann leabharlanna web3, e.g. [web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io /ethers.js/)

Tá feidhmiúcháin éagsúla de chríochphointí RPC ag cliaint éagsúla. Ach tá JSON-RPC caighdeánach ann ar féidir leat a úsáid le gach cliant. Le haghaidh forbhreathnú [léigh na doiciméid JSON-RPC](/developers/docs/apis/json-rpc/). Is féidir le hiarratais a dteastaíonn faisnéis ó líonra Ethereum uathu an RPC seo a úsáid. Mar shampla, ligeann sparán móréilimh MetaMask duit [nascadh le do chríochphointe RPC féin](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) a bhfuil buntáistí láidre príobháideachta agus slándála aige.

Nochtann na cliaint chomhdhearcaidh go léir [Beacon API](https://ethereum.github.io/beacon-APIs) ar féidir a úsáid chun stádas an chliaint chomhdhearcaidh a sheiceáil nó chun bloic agus sonraí comhdhearcaidh a íoslódáil trí iarratais a sheoladh le huirlisí ar nós [Curl](https://curl.se). Is féidir tuilleadh eolais a fháil faoi seo sna doiciméid do gach cliant comhdhearcaidh.

#### RPC a bhaint amach {#reaching-rpc}

Is é `8545` an port réamhshocraithe do chliant reatha JSON-RPC ach is féidir leat poirt na gcríochphointí áitiúla a mhodhnú sa chumraíocht. De réir réamhshocraithe, ní féidir an comhéadan RPC a bhaint amach ach ar localhost do ríomhaire. Chun é a dhéanamh cianda-inrochtana, b'fhéidir gur mhaith leat é a nochtadh don phobal tríd an seoladh a athrú go `0.0.0.0`. Fágfaidh sé seo go mbeidh sé insroichte thar sheoltaí líonra áitiúil agus IP poiblí. I bhformhór na gcásanna beidh ort seoladh ar aghaidh poirt a shocrú ar do ródaire freisin.

Tabhair aire agus tú ag nochtadh na bport ar an idirlíon mar ligfidh sé seo d’aon duine ar an idirlíon do nód a rialú. D’fhéadfadh gníomhairí mailíseacha rochtain a fháil ar do nód chun do chóras a thabhairt anuas nó do chistí a ghoid má tá do chliant á úsáid agat mar sparán.

Bealach thart air seo ná modhanna RPC a d’fhéadfadh a bheith díobhálach a chosc ó bheith inathraithe. Mar shampla, le Geth, is féidir leat modhanna inathraithe a dhearbhú le bratach: `--http.api web3,eth,txpool`.

Is féidir rochtain ar an gcomhéadan RPC a leathnú trí APIanna ciseal imill nó feidhmchláir freastalaí gréasáin a fhorbairt, cosúil le Nginx, agus iad a nascadh le seoladh agus le port áitiúil do chliaint. Trí lárchiseal a ghiaráil, is féidir le forbróirí a bheith in ann teastas a chumrú le haghaidh naisc shlána `https` leis an gcomhéadan RPC.

Ní hé an t-aon bhealach amháin chun rochtain ar chríochphointe RPC do nód a chur ar bun freastalaí gréasáin, seachfhreastalaí, nó Rest API a bhfuil aghaidh sheachtrach air. Bealach eile chun príobháideacht a chaomhnú chun críochphointe inrochtana poiblí a shocrú ná an nód a óstáil ar do sheirbhís oinniúin [Tor](https://www.torproject.org/) féin. Ligfidh sé seo duit an RPC a bhaint amach lasmuigh de do líonra áitiúil gan seoladh IP poiblí statach nó port oscailte. Mar sin féin, d’fhéadfadh úsáid na cumraíochta seo a bheith in ann rochtain a fháil ar chríochphointe an RPC trí líonra Tor nach dtacaíonn gach feidhmchlár leis agus d’fhéadfadh fadhbanna ceangail a bheith mar thoradh air.

Chun seo a dhéanamh, caithfidh tú do [seirbhís oinniúin](https://community.torproject.org/onion-services/) féin a chruthú. Seiceáil [na doiciméid](https://community.torproject.org/onion-services/setup/) ar chumraíocht na seirbhíse oinniúin chun do chuid féin a óstáil. Is féidir leat é a chur in iúl do fhreastalaí gréasáin le seachfhreastalaí chuig an bport RPC nó díreach chuig an RPC.

Ar deireadh, agus ceann de na bealaí is coitianta chun rochtain a sholáthar ar líonraí inmheánacha ná trí nasc VPN. Ag brath ar do chás úsáide agus ar líon na n-úsáideoirí a bhfuil rochtain uathu ar do nód, d'fhéadfadh nasc slán VPN a bheith ina rogha. Is SSL VPN lán-ghnéitheach é [OpenVPN](https://openvpn.net/) a chuireann síneadh líonra slán OSI ciseal 2 nó 3 i bhfeidhm ag baint úsáide as prótacal SSL/TLS caighdeánach an tionscail, a thacaíonn le modhanna fhíordheimhniú solúbtha cliant atá bunaithe ar dheimhnithe, cártaí cliste, agus/nó ainm úsáideora/pasfhocal dintiúir, agus ceadaíonn sé beartais rialaithe rochtana a bhaineann go sonrach le húsáideoirí nó le grúpa trí úsáid a bhaint as rialacha balla dóiteáin a chuirtear i bhfeidhm ar chomhéadan fíorúil VPN.

### An nód a oibriú {#operating-the-node}

Ba chóir duit monatóireacht rialta a dhéanamh ar do nód chun a chinntiú go bhfuil sé ag rith i gceart. Seans go mbeidh ort cothabháil a dhéanamh ó am go chéile.

#### Nód a choinneáil ar líne {#keeping-node-online}

Ní gá do nód a bheith ar líne an t-am ar fad, ach ba cheart duit é a choinneáil ar líne oiread agus is féidir chun é a choinneáil sioncronaithe leis an líonra. Is féidir leat é a dhúnadh síos chun é a atosú, ach cuimhnigh:

- Is féidir go dtógfaidh sé cúpla nóiméad múchadh má tá an staid le déanaí fós á scríobh ar diosca.
- Is féidir le múchadh éigeantach damáiste a dhéanamh don bhunachar sonraí a éilíonn ort an nód iomlán a athshioncronú.
- Rachaidh do chliant as sioncronú leis an líonra agus beidh ort sioncronú a dhéanamh arís nuair a atosóidh tú é. Cé gur féidir an nód a shioncronú ón uair a bhí sé múchta go deireanach, féadfaidh an próiseas am a ghlacadh ag brath ar cé chomh fada is atá sé as líne.

_Ní bhaineann sé seo le nóid bhailíochtóirí ciseal comhdhearcaidh._ Má thógtar do nód as líne beidh tionchar aige ar na seirbhísí go léir atá ag brath air. Má tá nód á rith agat chun críocha _geallchuir_ ba cheart duit iarracht a dhéanamh an t-am neamhfhónaimh a laghdú oiread agus is féidir.

#### Seirbhísí cliant a chruthú {#creating-client-services}

Smaoinigh ar sheirbhís a chruthú chun do chliaint a rith go huathoibríoch agus iad ag am tosaithe. Mar shampla, ar fhreastalaithe Linux, bheadh ​​dea-chleachtas ann seirbhís a chruthú, e.g. le `systemd`, a fheidhmíonn an cliant le cumraíocht chuí, faoi úsáideoir le pribhléidí teoranta agus a atosaíonn go huathoibríoch.

#### Cliaint á nuashonrú {#updating-clients}

Ní mór duit bogearraí do chliaint a choinneáil cothrom le dáta leis na paistí slándála, na gnéithe agus na [EIPs](/eips/) is déanaí. Go háirithe roimh [foirc chrua](/history/), cinntigh go bhfuil na leaganacha cearta cliant á rith agat.

> Roimh nuashonruithe líonra tábhachtacha, foilsíonn EF postáil ar a [blog](https://blog.ethereum.org). Is féidir leat [liostáil leis na fógraí seo](https://blog.ethereum.org/category/protocol#subscribe) chun fógra a chur chuig do ríomhphost nuair a bhíonn nuashonrú de dhíth ar do nód.

Tá sé an-simplí cliaint a nuashonrú. Tá treoracha sonracha ag gach cliant ina ndoiciméadú, ach go ginearálta níl sa phróiseas ach an leagan is déanaí a íoslódáil agus an cliant a atosú leis an fheidhm inrite nua. Ba chóir don chliant piocadh suas san áit ar éirigh sé as, ach leis na nuashonruithe i bhfeidhm.

Tá teaghrán leagain inléite ag gach cliant a úsáidtear sa phrótacal piaraí go piaraí ach atá inrochtana freisin ón líne ordaithe. Ligeann an teaghrán leagan seo d'úsáideoirí a sheiceáil go bhfuil an leagan ceart á rith acu agus ceadaíonn sé do bhloc-thaiscéalaithe agus d'uirlisí anailíse eile a bhfuil suim acu dáileadh cliant ar leith thar an líonra a chainníochtú. Déan tagairt le do thoil do dhoiciméadú an chliaint aonair le haghaidh tuilleadh eolais faoi theaghráin leagan.

#### Seirbhísí breise a rith {#running-additional-services}

Ceadaíonn rith do nód féin duit úsáid a bhaint as seirbhísí a éilíonn rochtain dhíreach ar RPC cliant Ethereum. Is seirbhísí iad seo a tógadh ar bharr Ethereum mar [ réitigh ciseal 2](/developers/docs/scaling/#layer-2-scaling), inneall do sparán, taiscéalaithe bloc, uirlisí forbróra agus bonneagar eile Ethereum.

#### Monatóireacht a dhéanamh ar an nód {#monitoring-the-node}

Chun monatóireacht cheart a dhéanamh ar do nód, smaoinigh ar mhéadracht a bhailiú. Soláthraíonn cliaint críochphointí méadrachta ionas gur féidir leat sonraí cuimsitheacha a fháil faoi do nód. Úsáid uirlisí mar [InfluxDB](https://www.influxdata.com/get-influxdb/) nó [Prometheus](https://prometheus.io/) chun bunachair shonraí a chruthú ar féidir leat léirshamhlú agus cairteacha a dhéanamh orthu i mbogearraí ar nós [Grafana](https://grafana.com/). Tá go leor socruithe ann chun na bogearraí seo a úsáid agus deais éagsúla Grafana chun do nód agus an líonra ina iomláine a léirshamhlú. Mar shampla, féach ar [theagasc ar mhonatóireacht Geth](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/).

Mar chuid de do mhonatóireacht, déan cinnte súil a choinneáil ar fheidhmíocht do mheaisín. Le linn sioncronaithe tosaigh do nód, féadfaidh na bogearraí cliant a bheith an-trom ar LAP agus RAM. Chomh maith le Grafana, is féidir leat na huirlisí a thairgeann do OS a úsáid mar `htop` nó `uptime` chun é seo a dhéanamh.

## Tuilleadh léitheoireachta {#further-reading}

- [Treoracha Geallchuir Ethereum](https://github.com/SomerEsat/ethereum-staking-guides) - _Somer Esat, nuashonraithe go minic_
- [Treoir | Conas bailíochtóir a shocrú le haghaidh geall Ethereum ar mainnet](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _ – CoinCashew, nuashonraithe go rialta_
- [treoracha ETHStaker maidir le bailíochtóirí a rith ar testnets](https://github.com/remyroy/ethstaker#guides) – _ETHStaker, nuashonraithe go rialta_
- [Ceisteanna Coitianta Cumaisc le haghaidh oibreoirí nód](https://notes.ethereum.org/@launchpad/node-faq-merge) - _Iúil 2022_
- [Anailís ar na riachtanais chrua-earraí le bheith ina nód iomlán bailíochtaithe Ethereum ](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 Meán Fómhair 2018_
- [Rith Nóid Iomlána Ethereum: Treoir do Dhaoine ar Bheagán Spreagadh ](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7 Samhain 2019_
- [Rith Nód Hyperledger Besu ar an Ethereum Mainnet: Sochair, Riachtanais, agus Socrú](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 Bealtaine 2020_
- [Cliant Nethermind Ethereum a Imscaradh le Cruach Monatóireachta](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) <em x-id =="4">– Nethermind.eth, 8 Lúil 2020</em>

## Ábhair ghaolmhara {#related-topics}

- [Nóid agus cliaint](/developers/docs/nodes-and-clients/)
- [Bloic](/developers/docs/blocks/)
- [Líonraí](/developers/docs/networks/)
