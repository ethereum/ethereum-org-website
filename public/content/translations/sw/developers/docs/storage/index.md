---
title: Hifadhi Iliyogatuliwa
description: Muhtasari wa hifadhi iliyogatuliwa ni nini na zana zinazopatikana za kuiunganisha katika mfumo mtawanyo wa kimamlaka.
lang: sw
---

Tofauti na seva ya kati inayoendeshwa na kampuni au shirika moja, mifumo ya hifadhi iliyogatuliwa inajumuisha mtandao wa rika-kwa-rika wa watumiaji-waendeshaji ambao wanashikilia sehemu ya data kwa ujumla, na kuunda mfumo thabiti wa kushiriki hifadhi ya faili. Hizi zinaweza kuwa katika programu inayotegemea mnyororo wa bloku au mtandao wowote unaotegemea rika-kwa-rika.

Ethereum yenyewe inaweza kutumika kama mfumo wa hifadhi iliyogatuliwa, na ndivyo ilivyo linapokuja suala la uhifadhi wa msimbo katika mikataba yote mahiri. Hata hivyo, inapofikia kiasi kikubwa cha data, hiyo siyo ilivyoundwa kwa ajili ya Ethereum. Mnyororo unakua kwa kasi, lakini wakati wa kuandika, mnyororo wa Ethereum una takriban GB 500 - 1TB ([kulingana na mteja](https://etherscan.io/chartsync/chaindefault)), na kila nodi kwenye mtandao inahitaji kuwa na uwezo wa kuhifadhi data zote. Ikiwa mnyororo ungepanuka hadi kiasi kikubwa cha data (tuseme 5TB) haingewezekana kwa nodi zote kuendelea kufanya kazi. Pia, gharama ya kupeleka data nyingi hivi kwenye Mtandao Mkuu itakuwa ghali mno kutokana na ada za [gesi](/developers/docs/gas).

Kwa sababu ya vikwazo hivi, tunahitaji mnyororo au mbinu tofauti ya kuhifadhi kiasi kikubwa cha data kwa njia iliyogatuliwa.

Unapoangalia chaguo za hifadhi iliyogatuliwa (dStorage), kuna mambo machache ambayo mtumiaji anapaswa kuzingatia.

- Utaratibu wa kudumu / muundo wa motisha
- Utekelezaji wa uhifadhi wa data
- Ugatuaji
- Makubaliano

## Utaratibu wa kudumu / muundo wa motisha {#persistence-mechanism}

### Kulingana na mnyororo wa bloku {#blockchain-based}

Ili kipande cha data kiendelee kuwepo milele, tunahitaji kutumia utaratibu wa kudumu. Kwa mfano, kwenye Ethereum, utaratibu wa kudumu ni kwamba mnyororo mzima unahitaji kuzingatiwa wakati wa kuendesha nodi. Vipande vipya vya data vinaunganishwa kwenye mwisho wa mnyororo, na unaendelea kukua - ukihitaji kila nodi kuiga data yote iliyopachikwa.

Hii inajulikana kama uendelevu **unaotegemea mnyororo wa bloku**.

Tatizo la uendelevu unaotegemea mnyororo wa bloku ni kwamba mnyororo unaweza kuwa mkubwa sana kuweza kudumishwa na kuhifadhi data zote kwa njia inayowezekana (k.m., [vyanzo vingi](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) vinakadiria kuwa Mtandao unahitaji zaidi ya Zetabaiti 40 za uwezo wa hifadhi).

Mnyororo wa bloku lazima pia uwe na aina fulani ya muundo wa motisha. Kwa uendelevu unaotegemea mnyororo wa bloku, kuna malipo yanayofanywa kwa mthibitishaji. Wakati data inaongezwa kwenye mnyororo, wathibitishaji hulipwa ili kuongeza data hiyo.

Majukwaa yenye uendelevu unaotegemea mnyororo wa bloku:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Kulingana na mkataba {#contract-based}

Uendelevu **unaotegemea mkataba** una dhana kwamba data haiwezi kuigwa na kila nodi na kuhifadhiwa milele, na badala yake lazima idumishwe kwa makubaliano ya kimkataba. Haya ni makubaliano yaliyofanywa na nodi nyingi ambazo zimeahidi kushikilia kipande cha data kwa kipindi fulani cha muda. Ni lazima zirejeshewe fedha au zifanywe upya kila zinapoisha ili kuweka data iendelee kuwepo.

Katika hali nyingi, badala ya kuhifadhi data zote kwenye mnyororo, hashi ya mahali data inapatikana kwenye mnyororo ndiyo huhifadhiwa. Kwa njia hii, mnyororo mzima hauhitaji kupanuka ili kuhifadhi data zote.

Majukwaa yenye uendelevu unaotegemea mkataba:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Mawazo ya ziada {#additional-consideration}

IPFS ni mfumo uliosambazwa wa kuhifadhi na kupata faili, tovuti, programu, na data. Haina mpango wa motisha uliojengewa ndani, lakini badala yake inaweza kutumika na suluhisho zozote za motisha zinazotegemea mkataba hapo juu kwa uendelevu wa muda mrefu. Njia nyingine ya kuendeleza data kwenye IPFS ni kufanya kazi na huduma ya kubandika, ambayo "itabandika" data yako kwa ajili yako. Unaweza hata kuendesha nodi yako mwenyewe ya IPFS na kuchangia kwenye mtandao ili kudumisha data yako na/au ya wengine bure!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(huduma ya kubandika ya IPFS)_
- [web3.storage](https://web3.storage/) _(Huduma ya kubandika ya IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(huduma ya kubandika ya IPFS)_
- [IPFS Scan](https://ipfs-scan.io) _(kichunguzi cha kubandika cha IPFS)_
- [4EVERLAND](https://www.4everland.org/)_(huduma ya kubandika ya IPFS)_
- [Filebase](https://filebase.com) _(Huduma ya Kubandika ya IPFS)_
- [Spheron Network](https://spheron.network/) _(huduma ya kubandika ya IPFS/Filecoin)_

SWARM ni teknolojia ya ugatuaji wa hifadhi na usambazaji wa data yenye mfumo wa motisha wa hifadhi na oracle ya bei ya kukodisha hifadhi.

## Uhifadhi wa data {#data-retention}

Ili kuhifadhi data, mifumo lazima iwe na aina fulani ya utaratibu wa kuhakikisha data inahifadhiwa.

### Utaratibu wa changamoto {#challenge-mechanism}

Mojawapo ya njia maarufu zaidi za kuhakikisha data inahifadhiwa, ni kutumia aina fulani ya changamoto ya kriptografia ambayo hutolewa kwa nodi ili kuhakikisha bado zina data. Mfano rahisi ni kuangalia uthibitisho wa ufikiaji wa Arweave. Wanatoa changamoto kwa nodi ili kuona kama wana data katika bloku ya hivi karibuni zaidi na bloku ya nasibu katika siku za nyuma. Ikiwa nodi haiwezi kupata jibu, inaadhibiwa.

Aina za dStorage zenye utaratibu wa changamoto:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### Ugatuaji {#decentrality}

Hakuna zana bora za kupima kiwango cha ugatuaji wa majukwaa, lakini kwa ujumla, utataka kutumia zana ambazo hazina aina fulani ya KYC ili kutoa ushahidi kuwa hazijawekwa kati.

Zana zilizogatuliwa bila KYC:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### Makubaliano

Zana nyingi hizi zina toleo lao la [utaratibu wa makubaliano](/developers/docs/consensus-mechanisms/) lakini kwa ujumla zinatokana na [**Uthibitishaji-wa-kazi (PoW)**](/developers/docs/consensus-mechanisms/pow/) au [**Uthibitisho-wa-hisa (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Uthibitisho-wa-kazi msingi:

- Skynet
- Arweave

Uthibitisho-wa-stake:

- Ethereum
- Filecoin
- Züs
- Crust Network

## Zana zinazohusiana {#related-tools}

**IPFS - _Mfumo wa Faili wa K baina ya Sayari ni mfumo uliogatuliwa wa hifadhi na urejeleaji wa faili kwa ajili ya Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Nyaraka](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Hifadhi ya vitu vya wingu iliyogatuliwa, salama, ya faragha, na inayooana na S3 kwa wasanidi programu._**

- [Storj.io](https://storj.io/)
- [Nyaraka](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _Hutumia kriptografia kuunda soko la hifadhi ya wingu lisilohitaji uaminifu, kuruhusu wanunuzi na wauzaji kufanya miamala moja kwa moja._**

- [Skynet.net](https://sia.tech/)
- [Nyaraka](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin - _Filecoin iliundwa na timu ile ile iliyo nyuma ya IPFS. Ni safu ya motisha juu ya maadili ya IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Nyaraka](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave ni jukwaa la dStorage la kuhifadhi data._**

- [Arweave.org](https://www.arweave.org/)
- [Nyaraka](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs ni jukwaa la dStorage la uthibitisho-wa-hisa lenye ugawanyaji na blobbers._**

- [zus.network](https://zus.network/)
- [Nyaraka](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust ni jukwaa la dStorage juu ya IPFS._**

- [Crust.network](https://crust.network)
- [Nyaraka](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _Jukwaa la hifadhi iliyosambazwa na huduma ya usambazaji wa maudhui kwa ajili ya rundo la web3 la Ethereum._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Nyaraka](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _Hifadhidata iliyogatuliwa ya rika-kwa-rika juu ya IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Nyaraka](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Mradi wa wingu uliogatuliwa (hifadhidata, hifadhi ya faili, kompyuta na DID). Mchanganyiko wa kipekee wa teknolojia ya rika-kwa-rika ya nje ya mnyororo na ndani ya mnyororo. Upatanifu wa IPFS na minyororo mingi._**

- [Aleph.im](https://aleph.cloud/)
- [Nyaraka](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Hifadhi ya hifadhidata ya IPFS inayodhibitiwa na mtumiaji kwa ajili ya programu zenye data nyingi na zinazovutia._**

- [Ceramic.network](https://ceramic.network/)
- [Nyaraka](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _Hifadhi iliyogatuliwa inayooana na S3 na huduma ya kubandika ya IPFS yenye nakala za ziada za kijiografia. Faili zote zilizopakiwa kwenye IPFS kupitia Filebase hubandikwa kiotomatiki kwenye miundombinu ya Filebase na nakala 3x kote ulimwenguni._**

- [Filebase.com](https://filebase.com/)
- [Nyaraka](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _Jukwaa la kompyuta ya wingu la Web 3.0 linalounganisha uwezo mkuu wa hifadhi, kompyuta na mtandao, linaoana na S3 na hutoa hifadhi ya data inayolandana kwenye mitandao ya hifadhi iliyogatuliwa kama vile IPFS na Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Nyaraka](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _Jukwaa la mnyororo-kama-huduma lenye Nodi za IPFS za kubofya kitufe_**

- [Kaleido](https://kaleido.io/)
- [Nyaraka](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron ni jukwaa-kama-huduma (PaaS) iliyoundwa kwa ajili ya mifumo mtawanyo wa kimamlaka inayotafuta kuzindua programu zao kwenye miundombinu iliyogatuliwa yenye utendaji bora. Hutoa kompyuta, hifadhi iliyogatuliwa, CDN na upangishaji wa wavuti bila kuhitaji usanidi._**

- [spheron.network](https://spheron.network/)
- [Nyaraka](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## Masomo zaidi {#further-reading}

- [Hifadhi Iliyogatuliwa ni Nini?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Kuondoa Hadithi Tano za Kawaida kuhusu Hifadhi Iliyogatuliwa](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Mifumo ya uundaji](/developers/docs/frameworks/)
