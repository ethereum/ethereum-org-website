---
title: Distributed validator technology
description: Gamit ang distributed validator technology, pinaghihiwa-hiwalay ang operasyon ng Ethereum validor sa maraming partido.
lang: tl
---

# Distributed validator technology {#distributed-validator-technology}

Ang distributed validator technology (DVT) ay isang estratehiya sa seguridad ng validator kung saan pinaghihiwa-hiwalay sa maraming partido ang mga pangunahing responsibilidad at pag-sign para mabawasan ang mga single point of failure, at para mapahusay ang katatagan ng validator.

Ginagawa ito sa pamamagitan ng **paghahati ng pribadong key** na ginagamit upang mag-secure ng validator **sa maraming computer** na isinaayos sa isang "cluster". Mainam ito dahil pinapahirap nito para sa mga attacker na magkaroon ng access sa key, dahil hindi ito naka-store nang buo sa kahit anong machine. Dahil din dito, maaaring mag-offline ang ilang node, dahil magagawa ng isang subset ng mga machine sa bawat cluster ang kinakailangang pag-sign. Binabawasan nito ang mga single point of failure sa network at mas pinapahusay nito ang buong validator set.

![Isang diagram na nagpapakita kung paano hinahati ang isang validator key sa mga key share at ipinamamahagi sa iba't ibang mga node na may magkakaibang mga bahagi.](./dvt-cluster.png)

## Bakit kailangan natin ang DVT? {#why-do-we-need-dvt}

### Seguridad {#security}

Gumagawa ang mga validator ng dalawang pares ng pampubliko at pribadong key: mga validator key para sa pakikilahok sa consensus at mga withdrawal key para sa pag-access sa mga pondo. Bagama't maaaring ma-secure ng mga validator ang mga withdrawal key sa cold storage, dapat online 24/7 ang mga pribadong key ng validator. Kung makokompromiso ang pribadong key ng validator, makokontrol ng attacker ang validator na posibleng maging dahilan ng pag-slash o pagkawala ng ETH ng staker. Makakatulong ang DVT na mapaliit ang panganib na ito. Narito kung paano:

Sa pamamagitan ng paggamit ng DVT, maaaring mag-stake ang mga staker habang nasa cold storage ang mga pribadong key ng validator. Magagawa ito sa pamamagitan ng pag-encrypt ng orihinal at kumpletong key ng validator at paghahati nito sa mga key share. Nananatili online ang mga key share at inilalagay sa maraming node, kung kaya, naisasagawa ang pamamahaging operasyon ng validator. Naisasagawa ito dahil gumagamit ang mga Ethereum validator ng mga BLS signature na additive. Ibig sabihin nito, mabubuo ulit ang kumpletong key sa pamamagitan ng pagsasama-sama ng mga bahagi ng mga ito. Dahil dito, secure na maitatabi offline ng staker ang kumpleto at orihinal na 'master' key ng validator.

### Walang single point of failure {#no-single-point-of-failure}

Kapag hinati ang isang validator sa mga maraming operator at maraming machine, malalabanan nito ang mga pagpalya ng mga indibidwal na hardware at software nang hindi nagiging offline. Mapapaliit din ang mga panganib ng pagpalya sa pamamagitan ng paggamit ng iba't ibang pagsasaayos ng hardware at software sa mga node sa isang cluster. Hindi available ang ganitong katatagan sa mga pagsasaayos ng validator na may isang node - ito ay nagmumula sa DVT layer.

Kung masisira ang isa sa mga bahagi ng machine sa isang cluster (halimbawa, kung may apat na operator sa isang cluster ng validator at gumagamit ang isa sa mga ito ng partikular na client na may bug), tinitiyak ng ibang component na patuloy na tatakbo ang validator.

### Desentralisasyon {#decentralization}

Mainam para sa Ethereum na magkaroon ng lahat ng hiwalay na pinapatakbong validator hangga't posible. Gayunpaman, may ilang staking provider na mas madalas na ginagamit at ang mga ito ang responsable sa malaking bahagi ng kabuuang halaga ng na-stake na ETH sa network. Maaaring hayaan ng DVT ang mga operator na ito habang pinapanatili ang decentralization ng stake. Ito ay dahil inilalagay sa maraming machine ang mga key para sa bawat validator at kakailanganin ng mas malaking sabwatan para maging mapaminsala ang isang validator.

Kung walang DVT, mas madali para sa mga staking provider na suportahan lang ang isa o dalawang configuration ng client para sa lahat ng kanilang mga validator, na nagpapatindi sa epekto ng isang bug sa client. Ang DVT ay maaaring gamitin upang ikalat ang panganib sa maraming configuration ng client at iba't ibang hardware, na siyang gumagawa ng katatagan sa pamamagitan ng diversity.

**Ibinibigay ng DVT ang mga sumusunod na benepisyo sa Ethereum:**

1. **Decentralization** ng consensus ng patunay ng stake ng Ethereum
2. Tinitiyak ang **pagiging aktibo** ng network
3. Lumilikha ng pagpapaubaya sa **pagkakamali ng validator**
4. Operasyon ng **Trust minimized** na validator operation
5. **Mas kaunting slashing** at panganib ng downtime
6. **Pinapaigting ang diversity** (client, data center, lokasyon, regulasyon, at iba pa.)
7. **Pinaigting na seguridad** ng pamamahala ng key ng validator

## Paano gumagana ang DVT? {#how-does-dvt-work}

Ang solusyon ng DVT ay naglalaman ng mga sumusunod na bahagi:

- **[Shamir's secret sharing](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Gumagamit ang mga validator ng [mga BLS key](https://tl.wikipedia.org/wiki/Boneh%E2%80%93Lynn%E2%80%93Shacham). Ang mga indibidwal na "key share" ng BLS ("mga key share") ay maaaring pagsama-samahin sa isang pinagsama-samang key (signature). Sa DVT, ang pribadong key para sa isang validator ay ang pinagsama-samang BLS signature ng bawat operator sa cluster.
- **[Threshold signature scheme](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Itinatakda ang bilang ng mga indibidwal na key share na kailangan para sa mga gawain sa pag-sign, hal., 3 sa 4.
- **[Distributed key generation (DKG)](https://medium.com/toruslabs/ang-distributed-key-generation-dkg-221fa40d0b4a)** - Cryptographic na prosesong gumagawa ng mga key share at ginagamit upang ipamahagi ang mga share ng isang kasalukuyan o bagong key ng validator sa mga node sa isang cluster.
- **[Multiparty computation (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Lihim na ginagawa ang kumpletong key ng validator gamit ang multiparty computation. Hindi malalaman ng kahit anong indibidwal na operator ang kumpletong key—isang bahagi lang nito ang malalaman ng mga ito (ang "share" ng mga ito).
- **Protocol ng Consensus** - Pumipili ang protocol ng consensus ng isang node upang maging proposer ng block. Kahati ng mga ito sa block ang iba pang node sa cluster, na nagdaragdag ng kanilang mga key share sa pinagsama-samang signature. Kapag sapat na ang mga pangunahing bahagi ay pinagsama-sama, ang block ay iminungkahi na sa Ethereum.

Ang mga distributed validator ay may built-in na fault tolerance at maaaring magpatuloy sa pagtakbo kahit na may ilang mga node ay na-offline. Ibig sabihin nito na matatag ang cluster kahit pa maging mapaminsala o tamad ang ilan sa mga node.

## Mga use case ng DVT {#dvt-use-cases}

May malalaking epekto ang DVT para sa mas malawak na industriya ng staking:

### Mga solo staker {#solo-stakers}

Binibigyang-daan din ng DVT ang non-custodial staking sa pamamagitan ng pagpapahintulot sa iyong ilagay ang key ng validator mo sa mga remote node habang pinapanatiling ganap na offline ang kumpletong key. Ibig sabihin nito, hindi kailangang maglaan ng pera ng mga home staker para sa hardware, habang mas malalabanan nila ang mga potensyal na pag-hack sa pamamagitan ng pamamahagi ng mga key share.

### Staking as a service (SaaS) {#saas}

Ang mga operator (tulad ng mga staking pool at institusyonal na staker) na namamahala ng maraming validator ay maaaring gumamit ng DVT upang mapaliit ang kanilang panganib. Sa pamamagitan ng pamamahagi ng kanilang infrastructure, makakapagdagdag ang mga ito ng kalabisan sa kanilang mga operasyon at pag-iba-ibahin ang mga uri ng hardware na ginagamit ng mga ito.

Ibinabahagi ng DVT ang responsibilidad para sa pamamahala ng key sa iba't ibang mga node, na nangangahulugang maibabahagi rin ang gastos sa operasyon. Mapapaliit ng DVT ang panganib sa operasyon at gastos sa insurance para sa mga staking provider.

### Staking pools {#staking-pools}

Dahil sa mga standard na setup ng validator, ang mga staking pool at liquid staking provider ay inaatasang magkaroon ng iba't ibang antas ng tiwala sa nag-iisang operator dahil ang mga kita at pagkalugi ay ipinapamahagi sa buong pool. Umaasa rin ang mga ito na poprotektahan ng mga operator ang mga signing key dahil, hanggang ngayon, wala nang iba pang opsyon ang mga ito.

Kahit na gumawa ng mga tradisyonal na pagsisikap upang ikalat ang panganib sa pamamagitan ng pamamahagi ng mga stake sa maraming operator, hiwalay pa ring pinapamahalaan ng bawat operator ang isang malaking stake. Ang pagtitiwala sa nag-iisang operator ay nagdudulot ng malalaking panganib kung hindi magiging mahusay ang performance nito, magkaroon ito ng downtime, makokompromiso ito, o kumilos sa mapaminsalang paraan.

Sa pamamagitan ng paggamit ng DVT, lubos na lumiliit ang tiwalang kailangan mula sa mga operator. **Sa tulong ng mga pool, maaaring pangasiwaan ng mga operator ang mga stake nang hindi kinakailangang magkaroon ng mga key ng validator** (dahil mga key share lang ang ginagamit). Binibigyang-daan din nito na ipamahagi sa mas maraming operator ang mga stake (hal., sa halip na magkaroon ng nag-iisang operator na namamahala ng 1000 validator, binibigyang-daan ng DVT na pangasiwaan ang mga validator na iyon ng maraming operator). Titiyakin ng iba't ibang configuration ng operator na kung may masisira mang isang operator, makakapag-attest pa rin ang iba. Nagreresulta ito sa kalabisan at diversification na nagdudulot ng mas magandang performance at katatagan, habang pinapataas ng sobra ang mga reward.

Ang isa pang benepisyo ng pagpapaliit sa tiwala sa nag-iisang operator ay maaaring pahintulutan ng mga staking pool ang mas bukas at walang pahintulot na partisipasyon ng mga operator. Sa pamamagitan nito, mapapaliit ng mga serbisyo ang kanilang panganib at masusuportahan nila ang decentralization ng Ethereum sa pamamagitan ng paggamit ng mga na-curate at walang pahintulot na hanay ng mga operator, halimbawa, sa pamamagitan ng pagpapares ng mga home o mas maliit na staker sa mas malalaking staker.

## Mga potensyal na problema sa paggamit ng DVT {#potential-drawbacks-of-using-dvt}

- **Karagdagang bahagi** - ang pag-introduce ng DVT node ay nagdaragdag ng isa pang bahagi na posibleng magkaproblema o maging vulnerable. Ang isang paraan upang maibsan ito ay ang pagtutok sa pagkakaroon ng maraming implementasyon ng isang DVT node, na tumutukoy sa maraming DVT client (tulad ng pagkakaroon ng maraming client para sa mga layer ng consensus at execution).
- **Gastos sa operasyon** - dahil ang DVT ang namamahagi ng validator sa maraming partido, nangangailangan ng mas maraming tool para sa operasyon sa halip na isang node lang, kaya mas lumalaki ang gastos sa operasyon.
- **Posibleng mas mataas na latency** - dahil gumagamit ang DVT ng protocol ng consensus para magkaroon ng consensus sa maraming mode na nagpapatakbo ng isang operator, posible itong magdulot ng mas mataas na latency.

## Further Reading {#further-reading}

- [Specs ng Ethereum distributed validator (mataas na antas)](https://github.com/ethereum/distributed-validator-specs)
- [Technical specs ng Ethereum distributed validator](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Shamir secret sharing demo app](https://iancoleman.io/shamir/)
