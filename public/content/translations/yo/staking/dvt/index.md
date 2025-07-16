---
title: Ìmọ̀ ẹ̀rọ olùṣàyẹ̀wò onípínpín
description: Ìmọ̀ ẹ̀rọ olùṣàyẹ̀wò onípínpín jẹ ki iṣẹ pinpin ti olufọwọsi Ethereum nipasẹ awọn opolopo ẹgbẹ ṣeé ṣe.
lang: yo
---

# Ìmọ̀ ẹ̀rọ olùṣàyẹ̀wò onípínpín {#distributed-validator-technology}

Imọ-ẹrọ olufọwọsi onipinpin (DVT) jẹ ọna si aabo olufọwọsi ti o tan kaakiri iṣakoso kokoro ati bibuwolu awọn ojuse kaakiri awọn ẹgbẹ pupọ, lati dinku awọn aaye ikuna ẹyọkan, ati fikun agbara olufọwọsi.

O ṣe eyi nipasẹ **pipin kokoro ikọkọ** ti a lo lati ni daabo bo olufọwọsi **kaakiri ọpọlọpọ awọn kọnputa** ti a ṣeto si “iṣupọ”. Anfaani ti eyi ni pe o jẹ ki o ṣoro pupọ fun awọn ikọlu lati ni iraye si kokoro, nitori pe ko wa ni afipamo ni kikun lori ẹrọ kan ṣoṣo. O tun n gbanilaaye fun diẹ ninu awọn nodu lati kuro lori ayelujara, nitori wíwọlé pataki le ṣee ṣe nipasẹ ipin ti awọn ero inu iṣupọ kọọkan. Eyi dinku awọn aaye ikuna ẹyọkan latara nẹtiwọọki naa ati jẹ ki gbogbo olufọwọsi ṣeto diẹ sii.

![Aworan to n ṣafihan bawo ni kokoro olufowosi ẹyọkan se je pinpin si awon ipin kokoro ati apinkiri si awon opolopo nodes pelu oriṣiriṣi eya ara.](./dvt-cluster.png)

## Kini idi ti a fi nilo DVT? {#why-do-we-need-dvt}

### Aabo {#security}

Awọn olufọwọsi ṣe ipilẹṣẹ awọn orisii kokoro ikọkọ meji: awọn kokoro olufọwọsi fun ikopa ninu isokan ati awọn kokoro yiyọ kuro fun iraye si awọn owo. Lakoko ti awọn olufọwọsi le se aabo awọn kokoro yiyọ kuro si ibi ipamọ tutu, awọn kokoro ikọkọ olufọwọsi gbọdọ wa ni ori ayelujara nigbagbogbo. Ti kokoro ikọkọ olufọwọsi kan ba ti ohun ti ko pamo mo, olukọlu le ṣakoso olufọwọsi, ti o le ja si idinku tabi pipadanu ETH oludokowo naa. DVT le ṣe iranlọwọ lati din eewu yii ku. Eyi ni bii:

Nipa lilo DVT, awọn oludokowo le kopa ninu idokowo lakoko titọju kokoro ikọkọ olufọwọsi ni ibi ipamọ tutu. Eyi jẹ aṣeyọri nipasẹ piparoko kokoro olufowosi kikun to je ojulowo ati lẹhinna pipin si awọn ipin pataki. Awọn ipin kokoro n gbe lori ayelujara, won si je pinpin si awọn nodu pupọ eyiti o jẹ ki iṣẹ pinpin ti olufọwọsi ṣiṣẹ. Eyi ṣee ṣe nitori awọn olufọwọsi Ethereum lo awọn ibuwọlu BLS ti o jẹ afikun, eyi tumo si pe kokoro ni kikun le je atunṣe nipasẹ sisọpọ awọn ẹya ara wọn. Eyi n gba oludokowo laaye lati tọju kokoro olufowosi, ojulowo to kun ni aabo kuro lori ayelujara.

### Ko si oju kan ti ikuna {#no-single-point-of-failure}

Nigbati olufọwọsi ba je pinpin kaakiri awọn opolopo adarí ẹ̀rọ ati awọn opolopo ero, o le koju ohun elo kọọkan ati awọn ikuna sọfitiwia laisi kikuro lori ayelujara. Ewu awọn ikuna tun le dinku nipa lilo ohun elo oniruuru ati awọn atunto sọfitiwia kaakiri awọn nodu inu iṣupọ kan. Agbara yii ko si fun awọn atunto olufọwọsi nodu kan - o wa lati ipele DVT naa.

Ti ọkan ninu awọn eya ti ẹrọ kan ninu iṣupọ ko ba sise (fun apẹẹrẹ, ti awọn adarí ẹ̀rọ mẹrin ba wa ninu iṣupọ olufọwọsi ati pe ọkan lo onibara kan ni pato to ni asise ero), awọn miiran rii daju pe olufọwọsi naa n ṣiṣẹ.

### Ifowosowopo {#decentralization}

Iṣẹlẹ to dara julọ fun Ethereum ni lati ni ọpọlọpọ awọn olufọwọsi to n ṣiṣẹ ni ominira bi o ti ṣee ṣe to. Bibẹẹkọ, awọn olupese didokowo diẹ ti di olokiki pupọ ati akanti fun ipin pataki ti idokowo ETH lapapọ lori nẹtiwọọki naa. DVT le gba awọn adarí ẹ̀rọ laaye lati wa lakoko ti o n tọju sise alailakoso ti idokowo. Eyi jẹ nitori awọn kokoro fun olufọwọsi kọọkan je pinpin kaakiri ọpọlọpọ awọn ero ati pe yoo gba ikọlu pupọ fun olufọwọsi kan lati yipada si aida.

Laisi DVT, o rọrun fun awọn olupese idokowo lati ṣe atilẹyin fun ọkan tabi meji awọn atunto onibara nikan fun gbogbo awọn olufọwọsi wọn, mimu ipa ti asise ero onibara kan ga. DVT le ṣee lo lati tan eewu naa kale opolopo awọn atunto onibara ati ohun elo oriṣiriṣi, ṣiṣẹda agbara nipasẹ oniruuru.

**DVT n fun Ethereum ni awọn anfaani wọnyi:**

1. **Alailakoso** ti ijẹrisi idokowo Ethereum
2. Ṣe idaniloju **ìwàláàyè** ti nẹtiwọọki naa
3. Ṣẹda olufọwọsi **ifarada àṣìṣe**
4. **Ìgbẹ́kẹ̀lé ti dín kù** iṣẹ olufọwọsi
5. **Idinku gige** ati awọn eewu àkókò aisi lori ayelujara
6. **Mimu oniruuru** (onibara, ibudo data, ipo, ilana, ati bẹbẹ lọ) dara si
7. **Imudara aabo** ti iṣakoso pataki olufọwọsi

## Bawo ni DVT ṣe n ṣiṣẹ? {#how-does-dvt-work}

Ojutu DVT kan ni awọn eya wọnyi:

- **[Pinpin aṣiri Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Lilo awọn olufọwọsi [awọn kokoro BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Olukuluku BLS "awon ipin kokoro" ("awon ipin kokoro") le ṣe kopo sinu kokoro apapo kan (ibuwọlu). Ni DVT, kokoro ikọkọ fun olufọwọsi jẹ ibuwọlu BLS apapọ ti adari ero kọọkan ninu iṣupọ.
- **[Eto ibuwọlu ààlà](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Ṣe ipinnu nọmba awọn ipin kokoro kọọkan ti o nilo fun awọn iṣẹ ibuwolu, fun apẹẹrẹ, 3 ninu 4.
- **[Ipilẹṣẹ kokoro onipinpin (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Ilana cryptographic ti o ṣe ipilẹṣẹ awọn ipin kokoro ati pe a lo lati pin kaakiri awọn ipin ti kokoro olufọwọsi to wa tẹlẹ tabi tuntun si awọn nodu inu iṣupọ kan.
- **[Iṣiro Egbe pupo (MPC) ](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Kokoro olufọwọsi ni kikun ti wa ni ipilẹṣẹ ni ikoko nipa lilo iṣiro ẹgbẹ pupọ. Kokoro kikun ni a ko mọ rara fun adari ero kọọkan—wọn mọ apakan tiwọn nikan (“ipin” wọn).
- **Consensus protocol** Ilana ifohunsokan yan nodu kan lati jẹ onimọran bulooku naa. Wọn pin bulọọku pẹlu awọn nodu miiran ninu iṣupọ, ti o ṣafikun awọn ipin kokoro wọn si ibuwọlu apapọ. Nigbati awọn ipin kokoro to to ba ti ni akojọpọ, a dabaa bulọoku naa lori Ethereum.

Awọn olufọwọsi ti a pin kaakiri ni ifarada asise ti a ṣe sinu won ati pe o le ma ṣiṣẹ koda ti diẹ ninu awọn nodu kọọkan ba kuro lori ayelujara. Eyi tumọ si pe iṣupọ naa lagbara paapaa ti diẹ ninu awọn nodu inu rẹ ba yipada lati jẹ aida tabi ọlẹ.

## Awon isele lilo DVT {#dvt-use-cases}

DVT ni àwọn ìyọrísí pataki fun ile-iṣẹ idokowo gbigbooro:

### Awon oludokowo aladase {#solo-stakers}

DVT tun gba idokowo ti ko ni àbójútó nipasẹ gbigba ọ laaye lati pin kọkọrọ olufowosi re kaakiri awon nodu jíjìnnà lakoko ti o tọju kokoro kikun kuro lori ayelujara. Eyi tumọ si pe awọn oludokowo ko nilo dandan lati ṣeto fun ohun elo, lakoko pinpin awọn ipin kokoro le ṣe iranlọwọ lati fun wọn lagbara lati dojuko awon akolu to le waye.

### Aba bi iṣẹ (saas) {#saas}

Awọn adari ero (bii awọn akojopo idokowo ati awọn oludokowo ile-ise) ti won sakoso ọpọlọpọ awọn olufowosi le lo DVT lati din ewu wọn ku. Nipa pinpin awọn amayederu wọn, wọn le ṣafikun apọju si awọn iṣẹ wọn ati ayipada si orisirisi ohun elo ti wọn lo.

DVT sajopin ojuse fun iṣakoso kokoro kaakiri awọn ọpọlọpọ nodu, to tumo si pe won le sajopin awon inawo ise miiran. DVT tun le din eewu iṣiṣẹ ku ati awọn idiyele ibanigbofo fun awọn olupese idokowo.

### O ma ji awọn adagun {#staking-pools}

Nitori awọn eto olufowosi idiwon, o pondandan fun awon olupese didokowo owo ati awon akojopo didokowo lati ni awon ipele orisirisi ti igbekele adari ero kan niwon igba ti awon ere ati ofo je ti awujo jakejado akojopo naa. Wọn tun wa gbẹkẹle awọn adari ero si lati daabobo awọn kokoro bibuwolu nitori, titi di bayi, ko si aṣayan miiran fun wọn.

Paapaa botilẹjẹpe awọn akitiyan ti a ṣe lati tan eewu nipasẹ pinpin awọn idokowo kaakiri awọn adari ero pupọ ka, adari ero kọọkan tun ṣakoso idokowo pataki ni ominira. Gbigbekele adari ero kan mu eewu to lagbara dani ti wọn ba jẹ aiṣedeede, ni adojuko aisise, gba abode, tabi ṣe ilodisi.

Nipa lilo DVT, igbẹkẹle ti a beere lowo awọn adari ero ti dinku pupọ. **Awọn akojopo le jẹ ki awọn adari ero di idokowo mu lai nilo abojuto awọn kokoro olufọwọṣi ** (nitori pe awon ipin kokoro nikan ni won n lo). O tun n gbanilaaye lati pin awon idokowo to ni isakoso laarin awọn adari ero diẹ sii (fun apẹẹrẹ, dipo nini adari ẹrọ kan ti n ṣakoso awọn olufọwọsi egberun kan, DVT n jẹ ki awọn olufọwọsi wọnyẹn ṣiṣẹ ni apapọ nipasẹ awọn opolopo adari ero). Awọn atunto adari ero oniruuru yoo rii daju pe ti adari ero kan ba ja lule, awọn miiran yoo tun ni anfaani lati jẹri. Eleyi yorisi afikun ati ipinya ti o n yori si iṣẹ to dara julọ ati idurosinsin, nigba mimu ere posi.

Anfaani miiran lati dinku igbẹkẹle adari ero kan ni pe awọn akojopo idokowo le gba diẹ sii ti ilowosi adari ero ti ko nilo igbanilaaye. Nipa ṣiṣe eyi, awọn iṣẹ le se dinku eewu wọn ati atilẹyin alailakoso Ethereum nipa lilo awọn adari ero ti ko nilo igbanilaaye ati ti a satojo, fun apẹẹrẹ, nipa amupapo oludokowo kekeke diẹ sii pẹlu awọn oludokowo nla.

## Awọn ifasilẹ to le waye ni ti lilo DVT {#potential-drawbacks-of-using-dvt}

- **Awon eya afikun** - ṣisafihan nodu DVT kan ṣafikun eya miiran ti o le ṣee ko jẹ aṣiṣe tabi ipalara. Ọna kan lati dena eyi ni lati gbiyanju fun awọn imuse opolopo ti nodu DVT, to tumọ si pe ọpọlọpọ awọn onibaara DVT (bakanna bi awọn onibara pupọ se wa fun awon ipele ifohunsokan ati imusise).
- **Awọn ìdiyele ìṣiṣẹ́** - bi DVT ṣe n pin olufowosi laarin awọn ẹgbẹ pupọ, awọn nodu pupọ wa ti a nilo fun iṣẹ dipo nodu kan, eyiti to mu awọn idiyele ìṣiṣẹ́ wa.
- **Ó ṣeé ṣe kí àkókò ìdúró pọ̀ sí** - Niwọn igba ti DVT n lo ilana ifohunsokan kan lati ṣaṣeyọri ifohunsokan laarin awọn nodu pupọ to n mu olufowosi kan sise, o ṣeé ṣe ko mu àkókò ìdúró pọ̀ sí.

## Further Reading {#further-reading}

- [Awon eya ara ohun elo olufowosi to je pinpin ti Ethereum (ipele giga)](https://github.com/ethereum/distributed-validator-specs)
- [Awon eya ara ti imo-ero olufowosi to je pinpin ti Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Ohun elo àfihàn ti pinpin asiri Shamir](https://iancoleman.io/shamir/)
