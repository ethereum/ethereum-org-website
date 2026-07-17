---
title: Hifadhi Iliyogatuliwa
description: Muhtasari wa hifadhi iliyogatuliwa ni nini na zana zinazopatikana za kuiunganisha kwenye programu tumizi iliyogatuliwa (dapp).
lang: sw
authors: ["Patrick Collins"]
---

Tofauti na seva kuu inayoendeshwa na kampuni au shirika moja, mifumo ya hifadhi iliyogatuliwa inajumuisha mtandao wa rika-kwa-rika wa waendeshaji-watumiaji ambao wanashikilia sehemu ya data yote, na kuunda mfumo thabiti wa kushiriki hifadhi ya faili. Hizi zinaweza kuwa katika programu inayotegemea mnyororo wa vitalu au mtandao wowote unaotegemea rika-kwa-rika.

Ethereum yenyewe inaweza kutumika kama mfumo wa hifadhi iliyogatuliwa, na inatumika inapokuja kwenye hifadhi ya msimbo katika mikataba yote mahiri. Hata hivyo, inapokuja kwenye kiasi kikubwa cha data, hilo sio ambalo Ethereum iliundwa kwa ajili yake. Mnyororo unakua kwa kasi, lakini wakati wa kuandika, mnyororo wa Ethereum ni karibu 500GB - 1TB ([kulingana na mteja](https://etherscan.io/chartsync/chaindefault)), na kila nodi kwenye mtandao inahitaji kuwa na uwezo wa kuhifadhi data yote. Ikiwa mnyororo ungepanuka hadi kiasi kikubwa cha data (tuseme 5TBs) isingewezekana kwa nodi zote kuendelea kufanya kazi. Pia, gharama ya kupeleka data nyingi hivi kwenye Mtandao Mkuu itakuwa ghali sana kutokana na ada za [gesi](/developers/docs/gas).

Kutokana na vikwazo hivi, tunahitaji mnyororo tofauti au mbinu ya kuhifadhi kiasi kikubwa cha data kwa njia iliyogatuliwa.

Unapoangalia chaguzi za hifadhi iliyogatuliwa (dStorage), kuna mambo machache ambayo mtumiaji lazima akumbuke.

- Utaratibu wa kudumu / muundo wa motisha
- Utekelezaji wa uhifadhi wa data
- Ugatuzi
- Mwafaka

## Utaratibu wa kudumu / muundo wa motisha {#persistence-mechanism}

### Inayotegemea mnyororo wa vitalu {#blockchain-based}

Ili kipande cha data kidumu milele, tunahitaji kutumia utaratibu wa kudumu. Kwa mfano, kwenye Ethereum, utaratibu wa kudumu ni kwamba mnyororo mzima unahitaji kuzingatiwa wakati wa kuendesha nodi. Vipande vipya vya data vinaongezwa mwishoni mwa mnyororo, na unaendelea kukua - ikihitaji kila nodi kunakili data yote iliyopachikwa.

Hii inajulikana kama udumu **unaotegemea mnyororo wa vitalu**.

Suala la udumu unaotegemea mnyororo wa vitalu ni kwamba mnyororo unaweza kuwa mkubwa sana kuutunza na kuhifadhi data yote kwa uwezekano (k.m., [vyanzo vingi](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) vinakadiria Mtandao unahitaji zaidi ya Zetabytes 40 za uwezo wa kuhifadhi).

Mnyororo wa vitalu lazima pia uwe na aina fulani ya muundo wa motisha. Kwa udumu unaotegemea mnyororo wa vitalu, kuna malipo yanayofanywa kwa mthibitishaji. Wakati data inaongezwa kwenye mnyororo, wathibitishaji wanalipwa ili kuongeza data hiyo.

Majukwaa yenye udumu unaotegemea mnyororo wa vitalu:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Inayotegemea mkataba {#contract-based}

Udumu **unaotegemea mkataba** una dhana kwamba data haiwezi kunakiliwa na kila nodi na kuhifadhiwa milele, na badala yake lazima itunzwe kwa makubaliano ya mkataba. Haya ni makubaliano yaliyofanywa na nodi nyingi ambazo zimeahidi kushikilia kipande cha data kwa muda fulani. Lazima zirejeshewe fedha au zifanywe upya kila zinapoisha ili kuweka data idumu.

Katika hali nyingi, badala ya kuhifadhi data yote mnyororoni, heshi ya mahali data ilipo kwenye mnyororo inahifadhiwa. Kwa njia hii, mnyororo mzima hauhitaji kupanuka ili kuweka data yote.

Majukwaa yenye udumu unaotegemea mkataba:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Kundi](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Mambo ya ziada ya kuzingatia {#additional-consideration}

IPFS ni mfumo uliosambazwa wa kuhifadhi na kufikia faili, tovuti, programu, na data. Haina mpango wa motisha uliojengewa ndani, lakini badala yake inaweza kutumika na suluhisho lolote la motisha linalotegemea mkataba hapo juu kwa udumu wa muda mrefu. Njia nyingine ya kudumisha data kwenye IPFS ni kufanya kazi na huduma ya kubandika (pinning), ambayo "itabandika" data yako kwa ajili yako. Unaweza hata kuendesha nodi yako mwenyewe ya IPFS na kuchangia kwenye mtandao ili kudumisha data yako na/au ya wengine bila malipo!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(Huduma ya kubandika ya IPFS)_
- [web3.storage](https://web3.storage/) _(Huduma ya kubandika ya IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(Huduma ya kubandika ya IPFS)_
- [IPFS Scan](https://ipfs-scan.io) _(Kichunguzi cha kubandika cha IPFS)_
- [4EVERLAND](https://www.4everland.org/)_（Huduma ya kubandika ya IPFS）_
- [Filebase](https://filebase.com) _(Huduma ya Kubandika ya IPFS)_
- [Spheron Network](https://spheron.network/) _(Huduma ya kubandika ya IPFS/Filecoin)_

Kundi (SWARM) ni teknolojia ya hifadhi na usambazaji wa data iliyogatuliwa yenye mfumo wa motisha wa hifadhi na orakeli ya bei ya kodi ya hifadhi.

## Uhifadhi wa data {#data-retention}

Ili kuhifadhi data, mifumo lazima iwe na aina fulani ya utaratibu wa kuhakikisha data inahifadhiwa.

### Utaratibu wa changamoto {#challenge-mechanism}

Mojawapo ya njia maarufu za kuhakikisha data inahifadhiwa, ni kutumia aina fulani ya changamoto ya kriptografia ambayo inatolewa kwa nodi ili kuhakikisha bado zina data. Njia rahisi ni kuangalia uthibitisho wa ufikiaji wa Arweave. Wanatoa changamoto kwa nodi ili kuona kama zina data kwenye kitalu cha hivi karibuni na kitalu cha nasibu cha zamani. Ikiwa nodi haiwezi kupata jibu, inaadhibiwa.

Aina za hifadhi iliyogatuliwa (dStorage) zenye utaratibu wa changamoto:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### Ugatuzi {#decentrality}

Hakuna zana nzuri za kupima kiwango cha ugatuzi cha majukwaa, lakini kwa ujumla, utataka kutumia zana ambazo hazina aina fulani ya KYC ili kutoa ushahidi kwamba hazijajikita kati.

Zana zilizogatuliwa bila KYC:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### Mwafaka {#consensus}

Nyingi ya zana hizi zina toleo lao la [utaratibu wa makubaliano](/developers/docs/consensus-mechanisms/) lakini kwa ujumla zinategemea ama [**Uthibitisho wa Kazi (PoW)**](/developers/docs/consensus-mechanisms/pow/) au [**Uthibitisho wa Dau (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Zinazotegemea Uthibitisho wa Kazi:

- Skynet
- Arweave

Zinazotegemea Uthibitisho wa Dau:

- Ethereum
- Filecoin
- Züs
- Crust Network

## Zana zinazohusiana {#related-tools}

**IPFS - _InterPlanetary File System ni mfumo wa hifadhi iliyogatuliwa na mfumo wa kurejelea faili kwa ajili ya Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Nyaraka](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Hifadhi ya kipengee cha wingu iliyogatuliwa iliyo salama, ya faragha, na inayoendana na S3 kwa ajili ya wasanidi programu._**

- [Storj.io](https://storj.io/)
- [Nyaraka](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _Inatumia kriptografia kuunda soko la hifadhi ya wingu bila hitaji la uaminifu, ikiruhusu wanunuzi na wauzaji kufanya miamala moja kwa moja._**

- [Skynet.net](https://sia.tech/)
- [Nyaraka](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin - _Filecoin iliundwa na timu ile ile iliyo nyuma ya IPFS. Ni safu ya motisha juu ya maadili ya IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Nyaraka](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave ni jukwaa la hifadhi iliyogatuliwa (dStorage) kwa ajili ya kuhifadhi data._**

- [Arweave.org](https://www.arweave.org/)
- [Nyaraka](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs ni jukwaa la hifadhi iliyogatuliwa (dStorage) la Uthibitisho wa Dau lenye shadi na blobbers._**

- [zus.network](https://zus.network/)
- [Nyaraka](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust ni jukwaa la hifadhi iliyogatuliwa (dStorage) juu ya IPFS._**

- [Crust.network](https://crust.network)
- [Nyaraka](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Kundi - _Jukwaa la hifadhi iliyosambazwa na huduma ya usambazaji wa maudhui kwa ajili ya mrundikano wa Web3 wa Ethereum._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Nyaraka](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _Hifadhidata iliyogatuliwa ya rika-kwa-rika juu ya IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Nyaraka](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Mradi wa wingu uliogatuliwa (hifadhidata, hifadhi ya faili, kompyuta na utambulisho uliogatuliwa (DID)). Mchanganyiko wa kipekee wa teknolojia ya rika-kwa-rika nje ya mnyororo na mnyororoni. Utangamano wa IPFS na minyororo mingi._**

- [Aleph.im](https://aleph.cloud/)
- [Nyaraka](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Hifadhi ya hifadhidata ya IPFS inayodhibitiwa na mtumiaji kwa ajili ya programu zenye data nyingi na zinazoshirikisha._**

- [Ceramic.network](https://ceramic.network/)
- [Nyaraka](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _Hifadhi iliyogatuliwa inayoendana na S3 na huduma ya kubandika ya IPFS yenye urudufishaji wa kijiografia. Faili zote zinazopakiwa kwenye IPFS kupitia Filebase zinabandikwa kiotomatiki kwenye miundombinu ya Filebase zikiwa na urudufishaji mara 3 kote ulimwenguni._**

- [Filebase.com](https://filebase.com/)
- [Nyaraka](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _Jukwaa la kompyuta ya wingu la Wavuti 3.0 ambalo linaunganisha uwezo wa msingi wa hifadhi, kompyuta na mtandao, linaendana na S3 na hutoa hifadhi ya data inayosawazishwa kwenye mitandao ya hifadhi iliyogatuliwa kama vile IPFS na Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Nyaraka](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _Jukwaa la mnyororo wa vitalu kama huduma lenye Nodi za IPFS za kubofya kitufe_**

- [Kaleido](https://kaleido.io/)
- [Nyaraka](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron ni jukwaa kama huduma (PaaS) lililoundwa kwa ajili ya programu tumizi zilizogatuliwa (dapps) zinazotafuta kuzindua programu zao kwenye miundombinu iliyogatuliwa kwa utendaji bora. Inatoa kompyuta, hifadhi iliyogatuliwa, CDN na upangishaji wa wavuti kwa chaguo-msingi._**

- [spheron.network](https://spheron.network/)
- [Nyaraka](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

**dweb3 - _Kisuluhishi cha kurasa za wavuti zilizogatuliwa, sawa na eth.limo, kinachounga mkono aina zote na hakizuiliwi kwa ENS na IPFS._**

- [dweb3.wtf](https://dweb3.wtf)

**web3compass - _Injini ya utafutaji kwa ajili ya tovuti zilizogatuliwa zinazoungwa mkono na IPFS + ENS._**

- [web3compass.net](https://www.web3compass.net/)
- [Nyaraka](https://www.web3compass.net/statistics)

## Usomaji zaidi {#further-reading}

- [Hifadhi Iliyogatuliwa ni Nini?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Kuvunja Hadithi Tano za Kawaida kuhusu Hifadhi Iliyogatuliwa](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Unajua rasilimali ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Mifumo ya usanidi](/developers/docs/frameworks/)