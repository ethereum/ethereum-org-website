---
title: Smarteng kontrata
description: Hindi teknikal na panimula sa mga smart contract
lang: fil
---

# Introduction to smart contracts {#introduction-to-smart-contracts}

Ang mga smart contract ang mga pangunahing building block ng application layer ng Ethereum. Sila ay mga programang pangkompyuter na nakaimbak sa [blockchain](/glossary/#blockchain) na sumusunod sa lohika ng 'kung ito, kung gayon iyon,' at garantisadong isasagawa ayon sa mga panuntunang tinukoy ng code nito, na hindi na mababago kapag nagawa na.

Si Nick Szabo ang gumawa ng terminong "smart contract". Noong 1994, sumulat siya ng [panimula sa konsepto](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), at noong 1996, sumulat siya ng [pagtuklas sa magagawa ng mga smart contract](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Inisip ni Szabo ang isang digital marketplace kung saan ang mga awtomatikong, [cryptographically-secure](/glossary/#cryptography) na mga proseso ay nagpapahintulot sa mga transaksyon at mga gawain sa negosyo na mangyari nang walang pinagkakatiwalaang mga tagapamagitan. Isinasagawa ng mga smart contract sa Ethereum ang pananaw nito.

Panoorin ang paliwanag sa Finematics tungkol sa mga smart contract:

<YouTube id="pWGLtjG-F5c" />

## Magtiwala sa mga nakasanayang kontrata {#trust-and-contracts}

Ang isa sa pinakamalalaking problema sa tradisyunal na kontrata ang pangangailangan ng mga mapagkakatiwalaang indibidwal na tuparin ang mga resulta ng kontrata.

Narito ang isang halimbawa:

Sina Alice at Bob ay nagkakarera ng bisikleta. Sabihin nating pumusta ng $10 si Alice kay Bob na siya ang mananalo sa karera. Tiwala si Bob na siya ang mananalo at pumayag siya sa pusta. Sa huli, naunahan ni Alice si Bob at siya ang nanalo. Pero ayaw ibigay ni Bob ang pusta, at inaakusahan niya si Alice na nandaya.

Ipinapakita ng nakakatawang halimbawa ang problema sa anumang non-smart agreement. Kahit na matugunan ang mga kundisyon ng kasunduan (ibig sabihin, ikaw ang nanalo sa karera), kailangan mo pa rin magtiwala sa ibang tao na tuparin ang kasunduan (ibig sabihin, ibigay ang ipinusta).

## A digital vending machine {#vending-machine}

Maihahambing ang smart contract sa isang vending machine, na gumagana na halos katulad ng smart contract - kapag naglagay ng mga partikular na input, siguradong makukuha ang mga paunang natukoy na output.

- Pumili ka ng produkto
- Ipapakita ng vending machine ang presyo
- Babayaran mo ang presyo
- Kukumpirmahin ng vending machine na tama ang binayad mong halaga
- Ibibigay sa iyo ng vending machine ang iyong item

Ilalabas lang ng vending machine ang gusto mong produkto kapag natugunan ang lahat ng kahilingan. Kung hindi ka pipili ng produkto o kulang ang ilalagay mong pera, hindi ilalabas ng vending machine ang iyong produkto.

## Awtomatikong pagpapatupad {#automation}

Ang pangunahing benepisyo ng smart contract ay tiyak nitong isasagawa ang malinaw na code kapag natugunan ang ilang partikular na kundisyon. Hindi na kailangang maghintay ng tao upang bigyang-kahulugan o makipag-usap tungkol sa resulta. Inaalis nito ang pangangailangan ng mga pinagkakatiwalaang tagapamagitan.

Halimbawa, maaari kang lumikha ng smart contract na mangangasiwa ng pondo sa escrow para sa isang bata, na magbibigay-daan sa kanyang kunin ang pondo pagkatapos ng isang partikular na petsa. Kung susubukan niyang kunin ang pondo bago ang petsang iyon, hindi maisasagawa ang smart contract. O maari kang lumikha ng kontrata na awtomatiko kang binibigyan ng digital na bersyon ng titulo ng kotse kapag binayaran mo ang dealer.

## Mahuhulaang mga resulta {#predictability}

Malabo ang mga tradisyunal na kontrata dahil umaasa ang mga ito sa mga tao upang bigyang-kahulugan at ipatupad ang mga ito. Halimbawa, maaaring magkaiba ang interpretasyon ng dalawang hukom sa isang kontrata, na maaaring magresulta sa hindi magkakaayon na desisyon at hindi patas na resulta. Inaalis ng mga smart contract ang posibilidad na ito. Sa halip, tumpak na isasagawa ang mga smart contract batay sa mga kundisyong nakasulat sa code ng kontrata. Ang katumpakang ito ay nangangahulugang sa ilalim ng parehong mga pangyayari, ang smart contract ay magbibigay ng parehong resulta.

## Pampublikong rekord {#public-record}

Ang mga smart contract ay kapaki-pakinabang para sa mga pag-audit at pagsubaybay. Dahil nasa pampublikong blockchain ang mga smart contract ng Ethereum, agad na masusubaybayan ng kahit sino ang mga paglipat ng asset at iba pang nauugnay na impormasyon. Halimbawa, maaari mong mong tingnan kung may nagpadala ng pera sa iyong address.

## Proteksyon sa privacy {#privacy-protection}

Pinoprotektahan din ng mga smart contract ang iyong privacy. Dahil ang Ethereum ay isang pseudonymous na network (ang iyong mga transaksyon ay naka-ugnay nang publiko sa isang natatanging cryptographic address, hindi sa iyong pagkakakilanlan), maaari mong protektahan ang iyong privacy mula sa mga tagamasid.

## Mga nakikitang termino {#visible-terms}

Sa wakas, tulad ng mga tradisyunal na kontrata, maaari mong suriin kung ano ang nasa isang smart contract bago mo ito pirmahan (o kung hindi man ay makipag-ugnayan dito). Sinisigurado ng pagiging malinaw ng smart contract na masusuri ito ng kahit sino.

## Mga use case ng smart contract {#use-cases}

Sa pangkalahatan, magagawa ng mga smart contract ang anumang bagay na magagawa ng mga computer program.

Maaari silang magsagawa ng mga komputasyon, lumikha ng pera, mag-imbak ng data, maglabas ng [mga NFT](/glossary/#nft), magpadala ng komunikasyon at kahit na bumuo ng mga graphic. Narito ang ilan sa mga kilalang halimbawa sa totoong buhay:

- [Stablecoins](/stablecoins/)
- [Paggawa at pamamahagi ng natatangign mga digital asset](/nft/)
- [Awtomatiko, bukas na palitan ng pera](/get-eth/#dex)
- [Decentralized gaming](/dapps/?category=gaming#explore)
- [Patakaran ng insurance na awtomatikong nagbabayad](https://etherisc.com/)
- [Isang pamantayan na nagpapahintulot sa mga tao na lumikha ng mga na-customize at interoperable na pera](/developers/docs/standards/tokens/)

## Karagdagang pagbabasa {#further-reading}

- [Paano Mababago ng Mga Smart Contract ang Mundo](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Mga Smart Contract: Ang Blockchain Technology na Papalit sa Mga Abogado](https://blockgeeks.com/guides/smart-contracts/)
- [Mga smart contract para sa mga developer](/developers/docs/smart-contracts/)
- [Matuto kung paano lumikha ng mga smart contract](/developers/learning-tools/)
- [Pagiging Bihasa sa Ethereum - Ano ang Smart Contract?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
