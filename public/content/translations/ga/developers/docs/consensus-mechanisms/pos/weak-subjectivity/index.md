---
title: Suibiachtúlacht lag
description: Míniú ar shuibiachtúlacht lag agus a ról i PoS Ethereum.
lang: ga
---

Tagraíonn suibiachtúlacht i mblocshlabhra do spleáchas ar fhaisnéis shóisialta chun aontú ar an staid reatha. D’fhéadfadh go mbeadh foirc bhailí iolracha ann a roghnófar de réir faisnéise a bhailítear ó chomhghleacaithe eile ar an líonra. Is é a mhalairt an oibiachtúlacht a thagraíonn do shlabhraí nach bhfuil ach slabhra bailí amháin féideartha iontu gur gá go n-aontóidh gach nóid faoi trína rialacha códaithe a chur i bhfeidhm. Tá tríú staid ann freisin, ar a dtugtar suibiachtúlacht lag. Tagraíonn sé seo do shlabhra a théann chun cinn go hoibiachtúil tar éis síol faisnéise tosaigh áirithe a fháil go sóisialta.

## Réamhriachtanais {#prerequisites}

Chun an leathanach seo a thuiscint ní mór bunghnéithe [cruthúnas-gill](/developers/docs/consensus-mechanisms/pos/) a thuiscint ar dtús.

## Cad iad na fadhbanna a réitíonn suibiachtúlacht lag? {#problems-ws-solves}

Tá suibiachtúlacht ina cuid dhílis de bhlocshlabhraí cruthúnas-gill mar go ndéantar an slabhra ceart a roghnú as foirc iolracha trí vótaí stairiúla a chomhaireamh. Nochtann sé seo an blocshlabhra do roinnt veicteoirí ionsaithe, lena n-áirítear ionsaithe fadraoin trína gcoimeádann nóid a ghlac páirt go han-luath sa slabhra forc eile a scaoileann siad i bhfad níos déanaí chun a mbuntáiste féin. Mar mhalairt air sin, má aistarraingíonn 33% de bhailíochtóirí a ngallchur ach go leanann siad orthu ag fianú agus ag táirgeadh bloic, d’fhéadfaidís forc eile a ghiniúint a thagann salach ar an slabhra canónach. B’fhéidir nach mbeadh a fhios ag nóid nó nóid nua atá as líne le fada go bhfuil a gcuid cistí aistarraingthe ag na bailíochtóirí ionsaithe seo, agus mar sin d’fhéadfadh ionsaitheoirí iad a mhealladh le slabhra mícheart a leanúint. Is féidir le Ethereum na veicteoirí ionsaithe seo a réiteach trí shrianta a fhorchur a laghdaíonn gnéithe suibiachtúla na meicníochta - agus dá bhrí sin boinn tuisceana iontaobhais - go dtí an t-íosmhéid lom.

## Seicphointí suibiachtúlachta laga {#ws-checkpoints}

Cuirtear suibiachtúlacht lag i bhfeidhm i gcruthúnas-oibre Ethereum trí úsáid a bhaint as "seicphointí suibiachtúlachta laga". Is fréamhacha staide iad seo a aontaíonn gach nóid ar an líonra go mbaineann siad leis an slabhra canónach. Freastalaíonn siad ar an gcuspóir céanna "fírinne uilíoch" agus atá ag bloic geineasais, ach amháin nach bhfuil siad suite ag suíomh geineasais sa bhlocshlabhra. Tá muinín ag an algartam rogha forc go bhfuil an staid bhlocshlabhra a shainmhínítear sa seicphointe sin ceart agus go ndéanann sé an slabhra a fhíorú go neamhspleách agus go hoibiachtúil ón bpointe sin ar aghaidh. Feidhmíonn na seicphointí mar “theorainneacha aisiompaithe” toisc nach féidir bloic a aimsítear roimh sheicphointí suibiachtúlachta laga a athrú. Baineann sé seo an bonn d'ionsaithe fadraoin go simplí trí fhoirc fhadraoin a shainiú mar chuid de dhearadh na meicníochta neamhbhailí. Má chinntítear go bhfuil achar níos lú idir na seicphointí suibiachtúlachta laga idirscartha ná tréimhse aistarraingthe an bhailíochtóra, cinntítear go ndéantar méid áirithe tairsí ar a laghad a shlaiseáil ar bhailíochtóir a fhorbraíonn an slabhra sula bhféadfaidh siad a ngeallta a aistarraingt agus nach féidir iontrálaithe nua a mhealladh ar fhoirc chontráilte a bhfuil a ngeall aistarraingthe.

## Difríocht idir seicphointí suibiachtúlachta lag agus bloic chríochnaithe {#difference-between-ws-and-finalized-blocks}

Déileálann nóid Ethereum go héagsúil le bloic críochnaithe agus seicphointí suibiachtúlachta laga. Má thagann nód ar an eolas faoi dhá bhloc críochnaithe iomaíocha, ansin stróictear é idir an dá cheann - níl aon bhealach aige a aithint go huathoibríoch cé acu an forc canónach. Is comhartha é seo ar theip chomhdhearcaidh. I gcodarsnacht leis sin, ní dhiúltaíonn nód ach aon bhloc a thagann salach ar a sheicphointe suibiachtúlachta lag. Ó thaobh an nóid de, is ionann an seicphointe suibiachtúlachta lag agus fírinne absalóideach nach féidir a bhaint as eolas nua óna bpiaraí.

## Cé chomh lag atá lag? {#how-weak-is-weak}

Is í an ghné shuibiachtúil de cruthúnas-gill Ethereum ná an gá atá le staid le déanaí (seicphointe suibiachtúlachta lag) ó fhoinse iontaofa le sioncronú uaidh. Tá an baol ann go bhfaighidh tú droch-sheicphointe suibiachtúlachta lag an-íseal mar is féidir iad a sheiceáil i gcoinne roinnt foinsí poiblí neamhspleácha ar nós bloc-thaiscéalaithe nó nóid iolracha. Mar sin féin, bíonn roinnt muiníne ag teastáil i gcónaí chun aon fheidhmchlár bogearraí a rith, mar shampla, muinín a bheith acu go bhfuil bogearraí macánta táirgthe ag na forbróirí bogearraí.

Féadfaidh seicphointe suibiachtúlachta lag teacht fiú mar chuid de na bogearraí cliant. D’fhéadfaí a áitiú gur féidir le hionsaitheoir an seicphointe sna bogearraí a éilliú agus is féidir leis na bogearraí féin a éilliú chomh héasca céanna. Níl aon fhíorbhealach cripte-eacnamaíoch timpeall ar an bhfadhb seo, ach déantar tionchar na bhforbróirí neamhiontaofa a íoslaghdú in Ethereum trí fhoirne neamhspleácha iomadúla cliant a bheith acu, gach ceann acu ag tógáil bogearraí coibhéiseacha i dteangacha éagsúla, iad go léir le leas dílsithe i slabhra macánta a chothabháil. Féadfaidh taiscéalaithe bloc seicphointí suibiachtúlachta laga a sholáthar freisin nó bealach chun seicphointí a fhaightear ó áiteanna eile a chrostagairt i gcoinne foinse bhreise.

Ar deireadh, is féidir seicphointí a iarraidh ó nóid eile; b'fhéidir gur féidir le húsáideoir Ethereum eile a ritheann nód iomlán seicphointe a sholáthar a fhéadfaidh bailíochtóirí a fhíorú ansin i gcoinne sonraí ó thaiscéalaí bloc. Ar an iomlán, is féidir a mheas gur fadhb den chineál céanna é muinín a chur i seicphointe suibiachtúlachta lag agus muinín a chur ar fhorbróirí an chliaint. Tá an t-iontaobhas foriomlán atá ag teastáil íseal. Tá sé tábhachtach a thabhairt faoi deara nach n-éiríonn na cúinsí seo tábhachtach ach amháin sa chás neamh-dhóchúil go ndéanann tromlach na mbailíochtóirí comhbheartú chun forc eile den bhlocshlabhra a tháirgeadh. Faoi imthosca ar bith eile, níl ach slabhra Ethereum amháin le roghnú as.

## Further Reading {#further-reading}

- [Suibiachtúlacht lag in Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Conas a d'fhoghlaim mé grá a thabhairt do shuibiachtúlacht lag](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/)
- [Suibiachtúlacht lag (Doiciméid Teku)](https://docs.teku.consensys.net/en/latest/Concepts/Weak-Subjectivity/)
- [Céim-0 Treoir lag suibiachtúlachta](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/weak-subjectivity.md)
- [Anailís ar shuibiachtúlacht lag in Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)
