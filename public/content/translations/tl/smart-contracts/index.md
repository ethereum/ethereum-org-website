---
title: Mga smart contract
description: Isang hindi teknikal na panimula sa mga smart contract
lang: tl
---

# Introduction to smart contracts {#introduction-to-smart-contracts}

Ang mga smart contract ay ang mga pangunahing building block ng application layer ng Ethereum. Ito ay mga computer program na naka-store sa [blockchain](/glossary/#blockchain) na sumusunod sa "if this then that" na logic at garantisadong magsagawa ayon sa mga panuntunang itinakda ng code nito, na hindi na mababago kapag nagawa na.

Si Nick Szabo ang bumuo ng terminong "smart contract". Noong 1994, sumulat siya ng [panimula sa konsepto](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), at noong 1996, sumulat siya ng [pagsusuri ng magagawa ng mga smart contract](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Inisip ni Szabo ang isang digital marketplace kung saan ang awtomatiko, [secure na cryptographic](/glossary/#cryptography) na mga proseso ay nagbibigay-daan sa mga transaksyon at mga function ng negosyo na mangyayari nang walang pinagkakatiwalaang mga tagapamagitan. Isinasagawa ng mga smart contract sa Ethereum ang mithiing ito.

Panoorin ang paliwanag sa Finematics tungkol sa mga smart contract:

<YouTube id="pWGLtjG-F5c" />

## Tiwala sa mga nakasanayan na kontrata {#trust-and-contracts}

Ang isa sa pinakamalalaking problema sa tradisyonal na kontrata ay ang pangangailangan ng mga mapagkakatiwalaang indibidwal na tuparin ang mga resulta ng kontrata.

Narito ang isang halimbawa:

Sina Alice at Bob ay nagkakarera sakay ng bisikleta. Sabihin nating pumusta ng $10 si Alice kay Bob na siya ang mananalo sa karera. Tiwala si Bob na siya ang mananalo at pumayag siya sa pusta. Sa huli, naunahan ni Alice si Bob at siya ang nanalo. Pero ayaw ibigay ni Bob ang ipinusta, at inaakusahan niya si Alice na nandaya.

Ipinapakita ng nakakatawang halimbawa ang problema sa anumang hindi matalinong pakikipagkasunduan. Kahit na matugunan ang mga kundisyon ng kasunduan (halimbawa, ikaw ang nanalo sa karera), kailangan mo pa rin magtiwala sa ibang tao na tuparin ang kasunduan (ibig sabihin, ibigay ang ipinusta).

## A digital vending machine {#vending-machine}

Maihahambing ang smart contract sa isang vending machine, na gumagana na halos katulad ng smart contract - kapag naglagay ng mga partikular na input, siguradong makukuha ang mga paunang natukoy na output.

- Pipili ka ng produkto
- Ipapakita ng vending machine ang presyo
- Babayaran mo ang presyo
- Kukumpirmahin ng vending machine na tama ang binayad mong halaga
- Ibibigay sa iyo ng vending machine ang iyong item

Ilalabas lang ng vending machine ang gusto mong produkto kapag natugunan ang lahat ng kahilingan. Kung hindi ka pipili ng produkto o kulang ang ilalagay mong pera, hindi ilalabas ng vending machine ang iyong produkto.

## Awtomatikong pag-execute {#automation}

Ang pangunahing benepisyo ng smart contract ay tiyak nitong ine-execute ang malinaw na code kapag natugunan ang ilang partikular na kundisyon. Hindi mo kailangang maghintay ng tao para i-interpret ang o makipag-usap tungkol sa resulta. Inaalis nito ang pangangailangan ng mga pinagkakatiwalaang tagapamagitan.

Halimbawa, maaari kang sumulat ng smart contract na nag-iingat ng pondo sa escrow para sa isang bata, na magbibigay-daan sa kanyang kunin ang pondo pagkatapos ng isang partikular na petsa. Kung susubukan niyang kunin ang pondo bago ang petsang iyon, hindi mae-execute ang smart contract. O maari kang sumulat ng kontrata na awtomatiko kang binibigyan ng digital na bersyon ng titulo ng kotse kapag binayaran mo ang dealer.

## Mga predictable na kalalabasan {#predictability}

Malabo ang mga tradisyonal na kontrata dahil umaasa ang mga ito sa mga tao upang unawain at ipatupad ang mga ito. Halimbawa, maaaring magkaiba ang interpretasyon ng dalawang hukom sa isang kontrata, na maaaring magresulta sa hindi magkakaayon na desisyon at hindi patas na resulta. Inaalis ng mga smart contract ang posibilidad na ito. Sa halip, ine-execute ang mga smart contract nang tumpak batay sa mga kundisyong nakasulat sa code ng kontrata. Dahil sa katumpakang ito, kapag pareho ang mga sitwasyon, iisang resulta ang ibibigay ng smart contract.

## Pampublikong record {#public-record}

Ang mga smart contract ay kapaki-pakinabang para sa mga audit at pagsubaybay. Dahil nasa pampublikong blockchain ang mga smart contract ng Ethereum, agad na masusubaybayan ng kahit sino ang mga pag-transfer ng asset at iba pang nauugnay na impormasyon. Halimbawa, maaari mong alamin kung may nagpadala ng pera sa iyong address.

## Pagprotekta sa privacy {#privacy-protection}

Pinoprotektahan din ng mga smart contract ang iyong privacy. Dahil isang pseudonymous network ang Ethereum (pampublikong nakaugnay ang iyong mga transaksyon sa isang natatanging cryptographic address, at hindi sa iyong identity), kaya mapoprotektahan mo ang iyong privacy mula sa mga observer.

## Mga nakikitang tuntunin {#visible-terms}

Sa wakas, tulad ng mga tradisyonal na kontrata, matitingnan mo ang laman ng smart contract bago mo ito lagdaan (o kaya ay makipag-ugnayan dito). Sinisigurado ng transparency ng smart contract na masusuri ito ng kahit sino.

## Mga use case ng smart contract {#use-cases}

Sa pangkalahatan, magagawa ng mga smart contract ang anumang bagay na magagawa ng mga computer program.

Maaari silang magsagawa ng mga komputasyon, lumikha ng currency, mag-store ng data, mag-mint ng [NFT](/glossary/#nft), magpadala ng mga komunikasyon, at maging mag-generate ng mga grapiko. Narito ang ilan sa mga kilalang halimbawa sa totoong buhay:

- [Mga Stablecoin](/stablecoins/)
- [Paggawa at pamamahagi ng mga natatanging digital asset](/nft/)
- [Isang awtomatiko at bukas na currency exchange](/get-eth/#dex)
- [Decentralized na paglalaro](/dapps/?category=gaming#explore)
- [Isang insurance policy na awtomatikong nagbabayad](https://etherisc.com/)
- [Isang pamantayan na nagbibigay-daan sa mga tao na gumawa ng mga naka-customize at interoperable na currency](/developers/docs/standards/tokens/)

## Karagdagang pagbabasa {#further-reading}

- [Paano Mababago ng Mga Smart Contract ang Mundo](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Mga Smart Contract: Ang Blockchain Technology na Papalit sa Mga Abogado](https://blockgeeks.com/guides/smart-contracts/)
- [Mga smart contract para sa mga developer](/developers/docs/smart-contracts/)
- [Matuto kung paano sumulat ng mga smart contract](/developers/learning-tools/)
- [Pagiging Bihasa sa Ethereum - Ano ang Smart Contract?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
