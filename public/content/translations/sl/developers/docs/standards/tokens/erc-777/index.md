---
title: Standard za žetone ERC-777
description:
lang: sl
---

## Uvod? {#introduction}

ERC-777 je standard za zamenljive žetone, ki izboljšuje obstoječi standard [ ERC-20](/developers/docs/standards/tokens/erc-20/).

## Predpogoji {#prerequisites}

Za boljše razumevanje te strani priporočamo, da si najprej preberete o [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Katere izboljšave za ERC-20 predlaga ERC-777? {#-erc-777-vs-erc-20}

ERC-777 zagotavlja naslednje izboljšave ERC-20.

### Kavlji {#hooks}

Kavlji so funkcija, ki je opisana v kodi pametne pogodbe. Kavlji so poklicani, ko so žetoni poslani ali prejeti prek pogodbe. To pametni pogodbi omogoča reakcijo na prihajajoče ali odhajajoče žetone.

Kavlji so registrirani in odkriti z uporabo standarda [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Zakaj so kavlji dobri? {#why-are-hooks-great}

1. Kavlji dovoljujejo pošiljanje žetonov na pogodbe in obveščajo pogodbe v eni sami transakciji, za razliko od [ERC-20](https://eips.ethereum.org/EIPS/eip-20), ki za dosego tega zahteva dvojni klic (`approve`/`transferFrom`).
2. Pogodbe, ki kavljev niso registrirale, niso kompatibilne z ERC-777. Pošiljateljska pogodba bo prekinila transakcijo, kadar prejemniška pogodba nima registriranega kavlja. To preprečuje slučajne prenose na pametne pogodbe, ki niso ERC-777.
3. Kavlji lahko zavrnejo transakcije.

### Decimalke {#decimals}

Ta standard prav tako rešuje zmedo okoli `decimalk`, ki se pojavlja pri ERC-20. Ta jasnost izboljša razvijalsko izkušnjo.

### Vzvratna kompatibilnost z ERC-20 {#backwards-compatibility-with-erc-20}

S pogodbami ERC-777 se lahko sodeluje enako, kot če bi bile pogodbe ERC-20.

## Nadaljnje branje {#further-reading}

[EIP-777: standard za žetone](https://eips.ethereum.org/EIPS/eip-777)
