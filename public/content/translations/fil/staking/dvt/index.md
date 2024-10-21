---
title: Distributed validator technology
description: Ang distributed validator technology ay nagbibigay-daan sa ipinamamahaging operasyon ng Ethereum validator sa maraming partido.
lang: fil
---

# Distributed validator technology {#distributed-validator-technology}

Ang distributed validator technology (DVT) ay isang pamamaraan sa seguridad ng validator na nagpapalaganap ng pamamahala ng mga key at responsibilidad sa paglagda sa maraming partido, upang mabawasan ang mga isang punto ng kabiguan at mapataas ang katatagan ng validator.

Ginagawa ito sa pamamagitan ng **paghahati ng pribadong key** na ginagamit upang mag-secure ng validator **sa maraming computer** na isinaayos sa isang "cluster". Mainam ito dahil pinapahirap nito para sa mga attacker na magkaroon ng access sa key, dahil hindi ito naka-store nang buo sa kahit anong machine. Pinapahintulutan din nito ang ilang node na mag-offline, dahil ang kinakailangang pag-sign ay maaaring gawin ng isang subset ng mga machine sa bawat cluster. Binabawasan nito ang mga isang punto ng kabiguan sa network at mas pinapahusay nito ang buong set ng validator.

![Dayagram na nagpapakita kung paano hinahati ang nag-iisang validator key at ipinapamahagi sa maraming node na may iba't ibang mga bahagi.](./dvt-cluster.png)

## Bakit kailangan natin ang DVT? {#why-do-we-need-dvt}

### Seguridad {#security}

Gumagawa ang mga validator ng dalawang pares ng pampubliko at pribadong key: mga validator key para sa pakikilahok sa kasunduan at mga withdrawal key para sa pag-access sa mga pondo. Habang ang mga validator ay maaaring mag-secure ng mga withdrawal key sa cold storage, ang mga private key ng validator ay kailangang online 24/7. Kung makompromiso ang private key ng isang validator, maaaring makontrol ito ng attacker, na posibleng humantong sa slashing o pagkawala ng ETH ng pumusta. Makakatulong ang DVT na mapaliit ang panganib na ito. Narito kung paano:

Sa pamamagitan ng paggamit ng DVT, makakalahok ang mga staker sa pagpupusta habang pinapanatiling nasa cold storage ang validator private key. Magagawa ito sa pamamagitan ng pag-encrypt ng orihinal at kumpletong key ng validator at paghahati nito sa mga key share. Nananatili online ang mga key share at ipinapamahagi sa maraming mga node na nagpapagana sa naipamahaging operasyon ng validator. Naisasagawa ito dahil gumagamit ang mga Ethereum validator ng mga BLS signature na maaring pagsamahin. Ibig sabihin nito, mabubuo ulit ang kumpletong key sa pamamagitan ng pagsasama-sama ng mga bahagi ng mga ito. Dahil dito, ligtas na maitatabi offline ng staker ang kumpleto at orihinal na 'master' key ng validator.

### Walang isang punto ng kabiguan {#no-single-point-of-failure}

Kapag hinati ang validator sa maraming operator at maraming machine, malalabanan nito ang mga pagkabigo ng indibidwal na hardware at software nang hindi nagiging offline. Mababawasan din ang mga panganib ng pagkabigo sa pamamagitan ng paggamit ng iba't ibang configuration ng hardware at software sa mga node sa isang cluster. Hindi available ang ganitong katatagan sa mga configuration ng validator na may isang node - ito ay nagmumula sa DVT layer.

Kung masisira ang isa sa mga bahagi ng machine sa isang cluster (halimbawa, kung may apat na nagpapatakbo sa isang cluster ng validator at gumagamit ang isa sa mga ito ng partikular na kliyente na may bug), tinitiyak ng ibang bahagi na patuloy na tatakbo ang validator.

### Desentralisasyon {#decentralization}

Ang pinakamainam na senaryo para sa Ethereum ay magkaroon ng maraming independiyente na pinapatakbong validator hangga't posible. Gayunpaman, ang ilang mga provider ng pagpupusta ay naging napakapopular at bumubuo ng makabuluhang bahagi ng kabuuang pusta na ETH sa network. Maaaring pahintulutan ng DVT ang mga operator na ito habang pinapanatili ang desentralisasyon ng pusta. Ito ay dahil ipinamahagi sa maraming machine ang mga key para sa bawat validator at kakailanganin ng mas malaking sabwatan para maging mapaminsala ang isang validator.

Kung walang DVT, mas madali para sa mga provider ng pagpupusta na suportahan lang ang isa o dalawang configuration ng kliyente para sa lahat ng kanilang mga validator, na nagpapatindi sa epekto ng kliyente na bug. Ang DVT ay maaaring gamitin upang ikalat ang panganib sa maraming configuration ng kliyente at iba't ibang hardware, na siyang gumagawa ng katatagan sa pamamagitan ng pagkakaiba-iba.

**Inaalok ng DVT ang mga sumusunod na benepisyo sa Ethereum:**

1. **Desentralisasyon** ng kasunduan ng patunay ng pusta ng Ethereum
2. Tinitiyak ang **pagkakaroon** ng network
3. Gumagawa ng **pagpaparaya sa pagkakamali** ng validator
4. **Bumabang tiwala** sa operasyon ng validator
5. **Mas kaunting slashing** at panganib ng downtime
6. **Pinapabuti ang pagkakaiba-iba** (kliyente, data center, lokasyon, regulasyon, at iba pa.)
7. **Pinahusay na seguridad** ng pamamahala ng validator key

## Paano gumagana ang DVT? {#how-does-dvt-work}

Ang solusyon ng DVT ay naglalaman ng mga sumusunod na bahagi:

- **[Lihim na pagbabahagi ni Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Gumagamit ang mga validator ng [mga BLS key](https://tl.wikipedia.org/wiki/Boneh%E2%80%93Lynn%E2%80%93Shacham). Ang mga indibidwal na BLS 'key shares' ('key shares') ay maaaring pagsamahin upang makabuo ng nagkakaisang key (signature). Sa DVT, ang private key para sa validator ay ang pinagsamang BLS signature ng bawat nagpapatakbo sa cluster.
- **[Threshold signature scheme](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Tinutukoy ang bilang ng mga indibidwal na key shares na kinakailangan para sa mga tungkulin sa paglagda, hal., 3 mula sa 4.
- **[Distributed key generation (DKG)](https://medium.com/toruslabs/ang-distributed-key-generation-dkg-221fa40d0b4a)** - Cryptographic na prosesong gumagawa ng mga key share at ginagamit upang ipamahagi ang mga share ng kasalukuyan o bagong key ng validator sa mga node sa isang cluster.
- **[Multiparty computation (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Ang buong key ng validator ay binubuo nang lihim gamit ang multiparty computation. Hindi malalaman ng kahit sinong indibidwal na nagpapatakbo ang kumpletong key—isang bahagi lang nito ang kanilang malalaman (ang kanilang "share").
- **Protokol ng Kasunduan** - Pumipili ang protokol ng kasunduan ng isang node upang maging tagapagmungkahi ng block. Ibinabahagi nila ang block sa ibang mga node sa cluster, na nagdadagdag ng kanilang mga key share sa pinagsamang signature. Kapag sapat na ang naipon na mga key share, imumungkahi sa Ethereum ang block.

Ang mga ipinamahaging validator ay may nakabuilt-in na kakayahan sa pagkakamali at maaaring patuloy na tumakbo kahit na ang ilan sa mga indibidwal na node ay mawalan ng koneksyon. Ito ay nangangahulugan na ang cluster ay matatag kahit na ang ilan sa mga node sa loob nito ay nagiging mapaminsala o hindi aktibo.

## Mga use case ng DVT {#dvt-use-cases}

May malalaking epekto ang DVT para sa mas malawak na industriya ng pagpupusta:

### Mga solo na staker {#solo-stakers}

Nagbibigay-daan din ang DVT sa non-custodial staking sa pamamagitan ng pagpahintulot na ipamahagi ang iyong validator key sa mga remote na node habang pinapanatiling ganap na offline ang buong key. Nangangahulugan ito na ang mga home staker ay hindi kinakailangang gumastos para sa hardware, habang ang pamamahagi ng mga key shares ay makakatulong upang palakasin ang mga ito laban sa mga potensyal na pag-hack.

### Staking as a service (SaaS) {#saas}

Ang mga nagpapatakbo (tulad ng mga sama-samang pagpupusta at institusyonal na staker) na namamahala ng maraming validator ay maaaring gumamit ng DVT upang mabawasan ang kanilang panganib. Sa pamamagitan ng pamamahagi ng kanilang imprastruktura, makakapagdagdag sila ng kalabisan sa kanilang operasyon at pag-iba-ibahin ang mga uri ng hardware na kanilang ginagamit.

Ibinabahagi ng DVT ang responsibilidad para sa pamamahala ng key sa iba't ibang mga node, na nangangahulugang maibabahagi rin ang gastos sa operasyon. Mababawasan ng DVT ang panganib sa operasyon at gastos sa insurance para sa mga provider ng pagpupusta.

### Staking pools {#staking-pools}

Dahil sa mga karaniwang setup ng validator, ang mga sama-samang pagpupusta at provider ng liquid staking ay napipilitang magkaroon ng iba't ibang antas ng pagtitiwala sa isang nagpapatakbo dahil ang mga kita at pagkawala ay ibinabahagi sa buong pagsasama. Umaasa rin ang mga ito na poprotektahan ng mga operator ang mga signing key dahil, hanggang ngayon, wala nang iba pang opsyon ang mga ito.

Kahit na gumawa ng mga tradisyonal na pagsisikap upang ikalat ang panganib sa pamamagitan ng pamamahagi ng mga pusta sa maraming operator, hiwalay pa ring pinapamahalaan ng bawat operator ang malaking pusta. Ang pagtitiwala sa nag-iisang operator ay nagdudulot ng malalaking panganib kung hindi magiging mahusay ang pagganap nito, magkaroon ito ng downtime, makokompromiso ito, o kumilos sa mapaminsalang paraan.

Sa pamamagitan ng paggamit ng DVT, lubos na nababawasan ang tiwalang kailangan mula sa mga operator. **Sa tulong ng mga pagsasama-sama, puwedeng pangasiwaan ng mga operator ang mga pusta nang hindi kinakailangang magkaroon ng mga key ng validator** (dahil mga key share lang ang ginagamit). Pinapahintulutan din nito na ipamahagi sa mas maraming operator ang mga pusta (hal., sa halip na magkaroon ng nag-iisang operator na namamahala ng 1000 validator, binibigyang-daan ng DVT na magkakasamang pangasiwaan ang mga validator na iyon ng maraming operator). Titiyakin ng iba't ibang configuration ng operator na kung may babagsak mang isang operator, makakapagpatunay pa rin ang iba. Nagreresulta ito sa kalabisan at pagkakaiba-iba na nagdudulot ng mas magandang pagganap at katatagan, habang pinapalalaki ang mga reward.

Ang isa pang benepisyo ng pagpapababa sa tiwala sa nag-iisang operator ay maaaring pahintulutan ng mga sama-samang pagpupusta ang mas bukas at walang pahintulot na pakikilahok ng mga operator. Sa pamamagitan nito, mababawasan ng mga serbisyo ang kanilang panganib at masusuportahan nila ang desentralisasyon ng Ethereum sa pamamagitan ng paggamit ng mga napili at walang pahintulot na hanay ng mga operator, halimbawa, sa pamamagitan ng pagpapares ng mga home o mas maliit na staker sa mas malalaking staker.

## Mga potensyal na disbentaha ng paggamit ng DVT {#potential-drawbacks-of-using-dvt}

- **Karagdagang bahagi** - ang pagpapakilala ng DVT node ay nagdaragdag ng isa pang bahagi na posibleng may sira o mahina. Ang isang paraan upang mapagaan ito ay ang pagsusumikap para sa maraming pagpapatupad ng DVT node, ibig sabihin ay maramihang mga kliyente ng DVT (katulad ng mayroong maraming mga kliyente para sa kasunduan at mga layer ng pagpapatupad).
- **Gastos sa operasyon** - dahil ang DVT ang namamahagi ng validator sa maraming partido, nangangailangan ng mas maraming node para sa operasyon sa halip na nag-iisang node lang, kaya mas lumalaki ang gastos sa operasyon.
- **Potensyal na pagtaas ng pagkaantala** - dahil gumagamit ang DVT ng protokol ng kasunduan upang makamit ang kasunduan sa pagitan ng maraming node na nagpapatakbo ng validator, maaari itong magdulot ng potensyal na pagtaas ng pagkaantala.

## Further Reading {#further-reading}

- [Specs ng distributed validator ng Ethereum (mataas na antas)](https://github.com/ethereum/distributed-validator-specs)
- [Teknikal na specs ng distributed validator ng Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Demo app ng Shamir secret sharing](https://iancoleman.io/shamir/)
