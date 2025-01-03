---
title: Pametni ugovori
description: Ne-tehnički uvod u pametne ugovore
lang: sr
---

# Introduction to smart contracts {#introduction-to-smart-contracts}

Pametni ugovori su osnovni gradivni elementi aplikativni nivo Ethereuma. To su računarski programi smešteni na [lancu blokova](/glossary/#blockchain) koji slede logiku „ako je ovo onda je to“ (if this then that), i garantovano će se izvršiti prema pravilima definisanim u svom kodu, koja se ne mogu promeniti nakon što su kreirani.

Termin "pametni ugovor" je skovao Nik Sabo. 1994. je napisao [uvod u koncept](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) a 1996. [istraživanje šta sve može pametni ugovor](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Sabo je zamislio digitalno tržište gde automatski, [kriptografski-sigurni](/glossary/#cryptography) procesi omogućavaju transakcije i biznis funkcije bez potrebe za posrednikom od poverenja. Pametni ugovori na Ethereumu su ovu viziju pretvorili u realnost.

Gledajte kako Finematics objašnjava pametne ugovore:

<YouTube id="pWGLtjG-F5c" />

## Poverenje u konvencionalne ugovore {#trust-and-contracts}

Jedan od najvećih problema sa tradicionalnim ugovorima je potreba za pouzdanim pojedincima koji će pratiti izvršenje ugovora.

Evo jednog primera:

Alis i Bob imaju trku biciklima. Hajde da kažemo da se klade u 10 dolara da će Alis da pobedi. Bob je uveren da će biti pobednik i složi se sa opkladom. Na kraju, Alisa pobedi Bobu. Međutim, Boba odbija da isplati opkladu, tvrdeći da je Alisa sigurno varala.

Ovaj blesavi primer ilustruje problem koji imaju ne-pametni dogovori. Čak i ukoliko su uslovi dogovora ispunjeni (tj. vi ste pobednik trke), morate i dalje verovati drugoj osobi da će ona ispuniti dogovor (tj. isplati opkladu).

## A digital vending machine {#vending-machine}

Jednostavna metafora za pametne ugovore je aparat za slatkiše koji radi otprilike kao pametni ugovor — specifični ulog (input) garantuje unapred određeni ishod (output).

- Izaberete proizvod
- Mašina prikaže cenu
- Platite iznos
- Mašina potvrdi da ste platili pravi iznos
- Mašina vam da ono što ste tražili

Mašina će izbaciti proizvod koji želite tek kad ispunite sve uslove koji su traženi. Ukoliko ne izaberete proizvod ili ne unesete dovoljno novca, mašina vam neke dati proizvod.

## Automatsko izvršenje {#automation}

Glavna korist pametnog ugovora je da deterministički izvršava jednoznačan kod kada se određeni uslovi ispune. Ne postoji potreba da se čeka čovek koji će da interpretira ili pregovara oko rezultata. Ovo uklanja potvrdu za posrednikom.

Npr. možete da napišete pametni ugovor kojim se zadržavaju sredstva u zalogu za dete, čime se detetu dozvoljava da povuče sredstva nakon određenog datuma. Ukoliko pokuša da povuče novac pre tog datuma, pametni ugovor se neće izvršiti. Ili možete napisati ugovor koji vam automatski daje digitalnu verziju registracije auta kada platite prodavcu.

## Predvidivi ishodi {#predictability}

Tradicionalni ugovori su višesmisleni zato što se oslanjaju na ljude da ih interpretiraju i implementiraju. Na primer, dvojica sudija mogu interpretirati ugovor drugačije što može dovesti do nekonzistentnih odluka i nejednakih ishoda. Pametni ugovori uklanjaju ovu mogućnost. Umesto toga, pametni ugovor se izvršava precizno na osnovu upisanih uslova u kodu ugovora. Preciznost znači da uz iste okolnosti, pametni ugovor će dati isti rezultat.

## Javni zapis {#public-record}

Pametni ugovori su korisni za revizije i praćenje. S obzirom na to da su Ethereum pametni ugovori na javnom lancu blokova, svako može instant da prati transfer sredstava i druge informacije sa tim u vezi. Na primer, možete proveriti da vidite da li je neko poslao novac na vašu adresu.

## Zaštita privatnosti {#privacy-protection}

Pametni ugovori takođe štite vašu privatnost. S obzirom na to da je Ethereum pseudonimna mreža (vaše transakcije su povezane javno za određenu kriptografsku adresu, ne za vaš identitet), možete zaštiti svoju privatnost od posmatrača.

## Transparentni uslovi {#visible-terms}

Konačno, kao i tradicionalni ugovori, možete proveriti šta se nalazi u pametnom ugovoru pre potpisivanja (ili interagujete sa njim na neki drugi način). Transparentnost pametnog ugovora garantuje da svako može da ga pažljivo ispita.

## Primene pametnog ugovora {#use-cases}

Pametni ugovori mogu da urade sve što i kompjuterski programi.

Mogu da izvršavaju računanja, kreiraju valutu, skladište podatke, kreiraju [NFT-ove](/glossary/#nft), komuniciraju ili čak generišu grafike. Evo nekih popularnih primera iz stvarnog sveta:

- [Stablecoins](/stablecoins/)
- [kreiranje i distribuiranje jedinstvenih digitalnih sredstava](/nft/)
- [automatska, otvorena razmena valuta](/get-eth/#dex)
- [Decentralizovano igranje](/dapps/?category=gaming#explore)
- [polisa osiguranja koja se automatski izvršava](https://etherisc.com/)
- [standard koji omogućava da ljudi kreiraju prilagođene, interoperabilne valute](/developers/docs/standards/tokens/)

## Dodatna literatura {#further-reading}

- [Kako će pametni ugovori promeniti svet](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Pametni ugovori: Blokčejn tehnologija koja će zameniti advokate](https://blockgeeks.com/guides/smart-contracts/)
- [Pametni ugovori za programere](/developers/docs/smart-contracts/)
- [Naučite kako da napišete pametne ugovore](/developers/learning-tools/)
- [Masteriraj Ethereum — Šta je pametni ugovor?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
