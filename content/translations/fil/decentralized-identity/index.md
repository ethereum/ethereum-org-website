---
title: Decentralized na identity
description: Ano ang decentralized identity at bakit ito importante?
lang: fil
template: use-cases
emoji: ":id:"
sidebarDepth: 2
image: /images/eth-gif-cat.png
summaryPoint1: Ang mga tradisyonal na identity system ay nakasentro sa pagbibigay, pagpapanatili at pagkontrol ng iyong mga identifier.
summaryPoint2: Inaalis ng decentralized identity ang pagdepende sa mga centralized na third party.
summaryPoint3: Dahil sa crypto, mayroon na ulit ang mga user ng mga tool para ibigay, pangasiwaan at kontrolin ang sarili nilang mga identifier at attestation.
---

Sinusuportahan ng identity ang halos lahat ng aspeto ng buhay mo ngayon. Sa paggamit ng mga serbisyo online, pagbubukas ng bank account, pagboto sa halalan, pagbili ng property, at paghahanap ng trabaho, kailangan mong patunayan ang iyong identity.

Gayunpaman, matagal nang umaasa ang mga tradisyonal na identity management system sa mga centralized intermediary na nagbibigay, nangangasiwa, at kumokontrol sa iyong mga identifier at [attestation](#what-are-attestations). Ibig sabihin ito ay hindi mo makokontrol ang impormasyong nauugnay sa iyong identity o hindi ka makakapagpasya sa kung sino ang may access sa personally identifiable information (PII) at kung gaano kalawak ang access ng mga partidong ito.

Para maayos ang mga problemang ito, mayroon kaming mga decentralized identity system na ginawa sa mga pampublikong blockchain tulad ng Ethereum. Sa tulong ng decentralized identity, mapapamahalaan ng mga indibidwal ang kanilang impormasyong nauugnay sa identity. Gamit ang mga decentralized identity solution, maaari _kang_ gumawa ng mga identifier at make-claim at mapapangasiwaan mo ang iyong mga attestation nang hindi nakadepende sa mga central authority, tulad ng mga service provider at ng pamahalaan.

## Ano ang identity? {#what-is-identity}

Tumutukoy ang identity sa pagkakakilala ng isang indibidwal sa kanyang sarili, ayon sa mga natatanging katangian. Tumutukoy ang identity sa pagiging isang _indibidwal_, ibig sabihin, isang partikular na tao. Ang identity ay maaari ding tumukoy sa iba pang entidad na hindi tao, gaya ng isang organisasyon o awtoridad.

## Ano ang mga identifier? {#what-are-identifiers}

Ang identifier ay impormasyong nagsisilbing pointer sa partikular na identity o mga identity. Kasama sa mga karaniwang identifier ang:

- Pangalan
- Social security number/tax ID number
- Numero ng cellphone
- Petsa at lugar ng kapanganakan
- Mga kredensyal sa digital identification, hal., email address, username, avatar

Ang mga tradisyonal na halimbawang ito ng mga identifier ay ibinibigay, pinapangasiwaan at kinokontrol ng mga central entity. Kailangan mo ng pahintulot mula sa iyong pamahalaan para palitan ang pangalan mo o mula sa isang social media platform para palitan ang handle mo.

## Ano ang mga attestiation? {#what-are-attestations}

Ang attestation ay isang claim na ginawa ng isang entity tungkol sa isa pang entity. Kung nakatira ka sa Estados Unidos, ang lisensya sa pagmamaneho na ibinigay sa iyo ng Department of Motor Vehicles (isang entidad) ay nagpapatunay na ikaw (isa pang entidad) ay legal na pinapayagang magmaneho ng kotse.

Magkaiba ang mga attestation at mga identifier. Ang attestation ay _may_ mga identifier para tumukoy ng partikular na identity, at gumagawa ng claim tungkol sa isang attribute na nauugnay sa identity na ito. Kung kaya, may mga identifier ang iyong lisensya sa pagmamaneho (pangalan, petsa ng kapanganakan, address) ngunit ito rin ang pagpapatunay tungkol sa iyong legal na karapatang magmaneho.

### Ano ang mga decentralized identifier? {#what-are-decentralized-identifiers}

Ang mga tradisyonal na identifier tulad ng iyong legal na pangalan o email address ay umaasa sa mga third party—mga pamahalaan at email provider. Naiiba ang decentralized identifiers (DIDs)—hindi ibinibigay, pinapamahalaan, o kinokontrol ang mga ito ng anumang sentral na entity.

Ang mga decentralized identifier ay ibinibigay, pinapangasiwaan, at kinokontrol ng mga indibidwal. Ang [Ethereum account](/developers/docs/accounts/) ay halimbawa ng isang decentralized identifier. Maaari kang gumawa ng mga account hangga't gusto mo nang hindi humihingi ng pahintulot ng kahit sino at nang hindi kinakailangang i-store ang mga ito sa isang sentral na registry.

Ang mga decentralized identifier ay sino-store sa mga distributed ledger (blockchain) o peer-to-peer network. Dahil dito, ang decentralized identifiers (DIDs) ay [walang katulad sa mundo, nareresolba at may high availability, at mave-verify sa pamamagitan ng cryptography](https://w3c-ccg.github.io/did-primer/). Maaaring iugnay ang decentralized identifier sa iba't ibang entity, kasama na ang mga tao, organisasyon, o mga institusyon ng pamahalaan.

## Paano naging posible ang mga decentralized identifier? {#what-makes-decentralized-identifiers-possible}

### 1. Public Key Infrastructure (PKI) {#public-key-cryptography}

Ang public-key infrastructure (PKI) ay isang hakbang para sa seguridad ng impormasyon na bumubuo ng [pampublikong key](/glossary/#public-key) at [ pribadong key](/glossary/#private-key) para sa isang entity. Ang public-key cryptography ay ginagamit sa mga blockchain network upang patunayan ang identity ng user at patunayan ang pagmamay-ari sa mga digital asset.

May pampubliko at pribadong key ang ilang decentralized identifier, tulad ng Ethereum account. Tinutukoy ng pampublikong key ang controller ng account, habang magagawa ng mga pribadong key na mag-sign at mag-decrypt ng mga mensahe para sa account na ito. Ang public key insfrastructure (PKI) ay nagbibigay ng mga patunay na kinakailangan upang i-authenticate ang mga entity at pigilan ang pagpapanggap at paggamit ng mga pekeng identity, at gumagamit ng[mga cryptographic signature](https://andersbrownworth.com/blockchain/public-private-keys/) upang i-verify ang lahat ng claim.

### 2. Mga decentralized datastore {#decentralized-datastores}

Ang blockchain ay nagsisilbing registry ng nave-verify na data: bukas, hindi kailangang umasa sa third party, at desentralisadong repository ng impormasyon. Dahil sa mga pampublikong blockchain, hindi kailangang i-store ang mga identifier sa mga sentralisadong registry.

Kung kailangang kumpirmahin ng sinuman ang validity ng isang decentralized identifier, puwede nilang hanapin ang nauugnay na pampublikong key sa blockchain. Iba ito sa mga tradisyonal na identifier na nangangailangan ng mga third party para mag-authenticate.

## Paano nagbibigay-daan ang mga "decentralized identifier" at "attestation" sa decentralized identity? {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

Tumutukoy ang decentralized identity sa pananaw na dapat pribado, portable, at ikaw mismo ang kumokontrol sa impormasyong nauugnay sa identity, at ang mga decentralized identifier at attestation ang mga pangunahing bahagi nito.

Sa konteksto ng decentralized identity, ang mga attestation (kilala rin bilang [Mga Nave-verify na Kredensyal](https://www.w3.org/TR/vc-data-model/)) ay mga claim ng issuer na hindi mababago at mave-verify sa pamamagitan ng cryptography. Ang bawat "attestation" o "Nave-verify na Kredensyal" na ibinibigay ng isang entity (hal., isang organisasyon) ay iniuugnay sa decentralized identifier (DID) nito.

Dahil naka-store ang decentralized identifiers (DIDs) sa blockchain, maaaring i-verify ng sinuman ang validity ng isang attestation sa pamamagitan ng pagsusuri sa DID ng issuer sa Ethereum. Sa madaling salita, ang blockchain ng Ethereum ay nagsisilbing pandaigdigang direktoryo na nagbibigay-daan sa pag-verify ng mga DID na nauugnay sa mga partikular na entity.

Dahil sa mga decentralized identifier, mave-verify at ikaw mismo ang kokontrol sa mga attestation. Kahit wala na ang issuer ng attestation, palaging may patunay ang may-ari ng pinagmulan at validity ng attestation.

Mahalaga rin ang mga decentralized identifier sa pagprotekta sa privacy ng personal na impormasyon sa pamamagitan ng decentralized identity. Halimbawa, kung magsusumite ang isang indibidwal ng patunay ng attestation (lisensya sa pagmamaneho), hindi kailangang suriin ng partidong nagve-verify ang validity ng impormasyon sa patunay. Kailangan lang ng verifier ng mga crytographic guarantee ng authenticity ng attestation at identity ng nagbigay na organisasyon para matukoy kung valid ang patunay.

## Mga uri ng attestation sa decentralized identity {#types-of-attestations-in-decentralized-identity}

Naiiba sa tradisyonal na pamamahala ng identity ang pag-store at pagkuha sa impormasyon ng attestation sa isang Ethereum-based na identity ecosystem. Narito ang pangkalahatang-ideya ng iba't ibang paraan ng pagbibigay, pag-store, at pag-verify ng mga attestation sa mga decentralized identity system:

### Mga off-chain na attestation {#off-chain-attestations}

Ang isang alalahanin sa pag-store ng mga attestation on-chain ay maaaring maglaman ang mga ito ng impormasyon na gustong panatilihing pribado ng mga indibidwal. Dahil pampubliko ang Ethereum blockchain, hindi mainam na i-store dito ang mga ganitong attestation.

Ang solusyon ay magbigay ng mga attestation, na pinapangasiwaan ng mga user off-chain sa mga digital wallet, pero na-sign gamit ang DID ng issuer na na-store on-chain. Ang mga attestation na ito ay naka-encode bilang [mga JSON Web Token](https://en.wikipedia.org/wiki/JSON_Web_Token) at dapat maglaman ng digital signature ng issuer—na nagpapadali sa pag-verify ng mga off-chain na claim.

Narito ang isang hypothetical na sitwasyon na nagpapaliwanag sa mga off-chain na attestation:

1. May unibersidad (ang issuer) na gumawa ng attestation (isang digital na sertipikong pang-akademiko), na-sign ito gamit ang mga key nito, at ibinigay ito kay Bob (may-ari ng identity).

2. Naghahanap ng trabaho si Bob at gusto niyang patunayan ang kanyang mga kwalipikasyong pang-akademiko sa isang employer, kaya ibinahagi niya ang attestation galing sa mobile wallet niya. Maaaring kumpirmahin ng kumpanya (ang verifier) ang validity ng attestation sa pamamagitan ng pagsusuri sa DID ng issuer (ibig sabihin, ang public key nito sa Ethereum).

### Mga off-chain na attestation na may persistent access {#offchain-attestations-with-persistent-access}

Sa ilalim ng pagsasaayos na ito, ang mga attestation ay ginagawang mga JSON file at sino-store off-chain (pinakamainam kung sa [decentralized cloud storage](/developers/docs/storage/) platform, tulad ng IPFS o Swarm). Gayunpaman, ang [ hash](/glossary/#hash) ng JSON file ay sino-store on-chain at nili-link sa DID sa pamamagitan ng isang on-chain registry. Ang nauugnay na DID ay maaaring galing sa issuer ng attestation o sa recipient.

Sa tulong ng paraang ito, nagkakaroon ang mga attestation ng blockchain-based persistence at napapanatiling naka-encrypt at nave-verify ang impormasyon ng mga claim. Binibigyang-daan din nito ang selective na pagsisiwalat dahil maaaring i-decrypt ng may-ari ng pribadong key ang impormasyon.

### Mga on-chain na attestation {#onchain-attestations}

Ang mga on-chain na attestation ay pinapangasiwaan sa [mga smart contract](/developers/docs/smart-contracts/) sa Ethereum blockchain. Ang smart contract (nagsisilbing registry) ay magmamapa ng attestation sa kaukulang on-chain na decentralized identifier (isang pampublikong key).

Narito ang isang halimbawa upang ipakita kung paano gumagana ang mga on-chain na attestation:

1. Pinaplano ng isang kumpanya (XYZ Corp) na magbenta ng mga share sa pagmamay-ari gamit ang isang smart contract pero gusto lang nito ng mga buyer na sumailalim sa background check.

2. Maaaring hilingin ng XYZ Corp sa kumpanyang nagsasagawa ng mga background check na magbigay ng mga on-chain na attestation sa Ethereum. Papatunayan ng attestation na ito na nakapasa ang indibidwal sa background check nang hindi inilalantad ang anumang personal na impormasyon.

3. Maaaring suriin ng smart contract na nagbebenta ng mga share ang registry contract para sa mga identity ng mga na-screen na buyer, kung kaya, malalaman ng smart contract kung sino ang pinapahintulutang bumili ng mga shares o hindi.

### Soulbound tokens at identity {#soulbound}

Puwedeng gamitin ang [soulbound tokens](https://vitalik.eth.limo/general/2022/01/26/soulbound.html)(mga non-transferable na NFT) upang kolektahin ang impormasyon na partikular sa isang wallet. Epektibo itong gumagawa ng natatanging on-chain na identity patungo sa isang partikular na Ethereum address na maaaring kinabibilangan ng mga token na kumakatawan sa mga napagtagumpayan (hal. pagtatapos ng ilang partikular na online na kurso o paglampas sa isang threshold score sa isang laro) o pakikilahok sa komunidad.

## Mga benepisyo ng decentralized identity {#benefits-of-decentralized-identity}

1. Sa tulong ng decentralized identity, mas makokontrol ng indibidwal ang nakakatukoy na impormasyon. Maaaring i-verify ang mga decentralized identifier at attestation nang hindi umaasa sa mga centralized na awtoridad at mga serbisyo ng third party.

2. Ang mga decentralized identity solution ay tumutulong para magkaroon ng paraan para sa pag-verify at pamamahala ng identity ng user na hindi kailangang umasa sa third party, seamless, at nagpoprotekta sa privacy.

3. Ginagamit ng decentralized identity ang teknolohiya ng blockchain, na bumubuo ng tiwala sa pagitan ng iba't ibang partido at nagbibigay ng mga cryptographic guarantee para patunayan ang validity ng mga attestation.

4. Ginagawang portable ng decentralized identity ang data ng identity. Sino-store ng mga user ang mga attestation at identifier sa mobile wallet at maibabahagi nila ang mga ito sa anumang partidong gusto nila. Hindi rin nakapirmi ang mga decentralized identifier at attestation sa database ng nagbibigay na organisasyon.

5. Magagamit ang decentralized identity sa mga bagong zero-knowledge technology na magbibigay-daan sa mga indibidwal na patunayan na pagmamay-ari o ginawa nila ang isang bagay nang hindi ibinubunyag kung ano ito. Ito ay maaaring maging pinakamahusay na paraan para pagsamahin ang tiwala at privacy para magamit sa mga bagay tulad ng pagboto.

6. Binibigyang-daan ng decentralized identity ang mga mekanismo laban sa Sybil attack na tukuyin kapag may isang indibidwal na taong nagpapanggap bilang maraming tao para dayain o i-spam ang isang system.

## Mga use case ng decentralized identity {#decentralized-identity-use-cases}

Maraming posibleng use case ang decentralized identity:

### 1. Mga universal login {#universal-dapp-logins}

Makakatulong ang decentralized identity na palitan ang mga pag-log in gamit ang password ng [decentralized authentication](https://www.ibm.com/blogs/blockchain/2018/10/decentralized-identity-an-alternative-to-password-based-authentication/). Maaaring magbigay ang mga service provider ng mga attestation sa mga user, na maso-store sa Ethereum wallet. Ang isang halimbawa ng attestation ay isang [NFT](/nft/) na nagbibigay sa may-ari ng access sa isang online na komunidad.

Ang function na [Mag-sign in gamit ang Ethereum](https://login.xyz/) ay magbibigay-daan sa mga server na kumpirmahin ang Ethereum account ng user at kunin ang kinakailangang attestation mula sa account address niya. Ibig sabihin nito, maa-access ng mga user ang mga platform at website nang hindi kinakailangang tandaan ang mahahabang password at mapapahusay nito ang online experience ng mga user.

### 2. KYC authentication {#kyc-authentication}

Sa paggamit ng mga online na serbisyo, kailangang magbigay ng mga indibidwal ng mga attestation at kredensyal, tulad ng lisensya sa pagmamaneho o pambansang pasaporte. Ngunit nagdudulot ng problema ang paraang ito dahil maaaring makompromiso ang pribadong impormasyon ng user at hindi mave-verify ng mga service provider ang authenticity ng attestation.

Binibigyang-daan ng decentralized identity ang mga kumpanya na iwasan ang mga karaniwang prosesong [Know-Your-Customer (KYC)](https://en.wikipedia.org/wiki/Know_your_customer) at i-authenticate ang mga identity ng user sa pamamagitan ng Mga Nave-verify na Kredensyal. Pinapababa nito ang gastos sa pamamahala ng identity at pinipigilan nito ang paggamit ng pekeng dokumentasyon.

### 3. Pagboto at mga online na komunidad {#voting-and-online-communities}

Ang online na pagboto at social media ay dalawang bagong paggamit ng decentralized identity. Madaling mamanipula ang mga scheme ng online na pagboto, lalo kung gumawa ang mga mapanlokong actor ng mga pekeng identity para bumoto. Mapapaganda ng paghiling sa mga indibidwal na magpresenta ng mga on-chain na attestation ang integridad ng mga proseso ng online na pagboto.

Makakatulong ang decentralized identity sa paggawa ng mga online na komunidad na walang pekeng account. Halimbawa, kailangang i-authenticate ng bawat user ang identity nila gamit ang isang on-chain na identity system, tulad ng Ethereum Name Service, na nagpapaliit sa posibilidad na mapasok ito ng mga bot.

### 4. Proteksyon laban sa Sybil attack {#sybil-protection}

Ang mga Sybil attack ay tumutukoy sa mga indibidwal na nagpapanggap bilang maraming tao para manlinlang ng isang system at mapalakas ang impluwensya nila. Ang [mga application na nagbibigay ng grant](https://gitcoin.co/grants/) na gumagamit ng [quadratic voting](https://www.radicalxchange.org/concepts/plural-voting/) ay madaling mabiktima ng mga Sybil attack na ito dahil madadagdagan ang halaga ng grant kapag mas maraming tao ang bumoto para dito, kaya nahihikayat ang mga user na hatiin ang kanilang mga kontribusyon sa maraming identity. Nakakatulong ang mga decentralized identity na iwasan ito sa pamamagitan ng pag-aatang sa bawat kalahok na patunayang totoong tao sila, bagama't madalas na ginagawa ito nang hindi kinakailangang isiwalat ang partikular na pribadong impormasyon.

## Gamitin ang decentralized identity {#use-decentralized-identity}

Maraming malalaking proyekto ang gumagamit ng Ethereum bilang pundasyon para sa mga decentralized identity solution:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - _Isang decentralized naming system para sa mga identifier na on-chain at nababasa ng machine, tuld ng mga address sa Ethereum wallet, mga content hash, at metadata._
- **[SpruceID](https://www.spruceid.com/)** - _Isang decentralized identity project na nagbibigay-daan sa mga user na kontrolin ang digital identity gamit ang mga Ethereum account at ENS profile sa halip na umasa sa mga serbisyo ng third party._
- **[Ethereum Attestation Service (EAS)](https://attest.sh/)** - _Isang decentralized ledger/protocol para sa paggawa ng mga on-chain o off-chain na attestation tungkol sa anumang bagay._
- **[Proof of Humanity](https://www.proofofhumanity.id)** - _Ang Proof of Humanity (o PoH) ay isang social identity verification system na ginawa sa Ethereum._
- **[BrightID](https://www.brightid.org/)** - _ Isang decentralized at open-source na social identity network na naglalayong baguhin ang pag-verify ng identity sa pamamagitan ng paggawa at pagsusuri ng isang social graph._
- **[Proof-of-personhood Passport](https://proofofpersonhood.com/)** - _Isang decentralized digital identity aggregator._

## Karagdagang pagbabasa {#further-reading}

### Mga Artikulo {#articles}

- [Mga Use Case ng Blockchain: Blockchain sa Digital Identity](https://consensys.net/blockchain-use-cases/digital-identity/) — _ConsenSys_
- [Ano ang Ethereum ERC725? Pamamahala ng Self-Sovereign Identity sa Blockchain](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) —_ Sam Town_
- [Paano Malulutas ng Blockchain ang Suliranin sa Digital Identity](https://time.com/6142810/proof-of-humanity/) — _Andrew R. Chow_
- [Ano ang Decentralized Identity at Bakit Dapat Kang Mag-alaala?](https://web3.hashnode.com/what-is-decentralized-identity) — _Emmanuel Awosika_

### Videos {#videos}

- [Decentralized Identity (Bonus Livestream Session)](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) — _Isang magandang video na gawa ni Andreas Antonopolous na nagpapaliwanag sa decentralized identity_
- [Mag-sign In sa Ethereum at Decentralized Identity gamit ang Ceramic, IDX, React, at 3ID Connect](https://www.youtube.com/watch?v=t9gWZYJxk7c) — _Tutorial sa YouTube na gawa ni Nader Dabit tungkol sa pagbuo ng management system para sa paggawa, pagbabasa, at pag-update ng profile ng isang user gamit ang kanyang Ethereum wallet_
- [BrightID - Decentralized Identity sa Ethereum](https://www.youtube.com/watch?v=D3DbMFYGRoM)— _Episode ng Bankless podcast kung saan pinag-uusapan ang BrightID, isang decentralized identity solution para sa Ethereum_
- [The Off Chain Internet: Decentralized Identity at Mga Nave-verify na Kredensyal](https://www.youtube.com/watch?v=EZ_Bb6j87mg) — Presentation ni Evin McMullen sa EthDenver noong 2022

### Mga Komunidad {#communities}

- [ERC-725 Alliance sa GitHub](https://github.com/erc725alliance) — _Mga tagasuporta ng pamantayang ERC725 para sa pamamahala ng identity sa Ethereum blockchain_
- [SpruceID Discord server](https://discord.com/invite/Sf9tSFzrnt) — _Komunidad para sa mga tagahanga at developer na nagtatrabaho sa Mag-sign in gamit ang Ethereum_
- [Veramo Labs](https://discord.gg/sYBUXpACh4) — _Isang komunidad ng mga developer na tumutulong sa pagbuo ng framework para sa nave-verify na data para sa mga application_
