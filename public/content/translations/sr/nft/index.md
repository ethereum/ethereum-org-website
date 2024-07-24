---
title: Nezamenljivi tokeni (NFT)
description: Pregled NFT-ijeva na Ethereum
lang: sr
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 2
image: /images/infrastructure_transparent.png
alt: Eth logo koji se prikazuje putem holograma.
summaryPoint1: Način da se bilo šta jedinstveno prikaže kao sredstvo zasnovano na Ethereum.
summaryPoint2: NFT-ijevi daju više moći kreatorima sadržaja nego ikada ranije.
summaryPoint3: Pokreću ih pametni ugovori na Ethereum-ovom blokčejnu.
---

## Šta su NFT-ijevi? {#what-are-nfts}

NFT-ijevi su tokeni koji su jedinstveni. Svaki NFT ima drugačije karakteristike (nezamenjiv je) i ograničeno je dostupan. NFT-ovi se razlikuju od tokena kao što je ERC-20 u kom je svaki token isti i ima iste karakteristike (zamenjiv je). Ne zanima vas koji dolar imate u novčaniku, zato što je svaki isti i vredi isto. Ipak, veoma je bitno koji NFT posedujete zato što svaki ima svoje karakteristike koje ga razlikuju od drugih ("nezamenljivi su").

Jedinstvenost svakog NFT-ja omogućava tokenizaciju stvari poput umetnosti, kolekcionarskih predmeta ili čak nekretnina, gde jedan određeni jedinstveni NFT predstavlja određenu jedinstvenu stvar iz stvarnog sveta ili digitalni predmet. Vlasništvo nad nekom imovinom je osigurano Ethereum blokčejnom — niko ne može da izmeni zapis o vlasništvu niti da kopira/nalepi novi NFT.

<YouTube id="Xdkkux6OxfM" />

## Internet imovine {#internet-of-assets}

NFT-ijevi i Ethereum rešavaju neke od problema koji postoje na Internetu. Kao što sve postaje digitalno, postoji potreba da se i karakteristike fizičkih proizvoda kao što su ograničena dostupnost, jedinstvenost i dokaz o vlasništvu repliciraju u digitalni svet. na takav način da nije kontrolisano od strane neke centralne organizacije. Na primer, sa NFT-ijevima možete da posedujete muzički mp3 koji nije specifičan za određenu aplikaciju za reprodukciju muzike jedne kompanije, ili možete posedovati korisničko ime na društvenim mrežama koje možete prodati ili razmeniti, ali vam ga pružalac platforme ne može proizvoljno oduzeti.

Evo kako se Internet NFT-ijeva razlikuje od Interneta koji većina nas koristi...

### Poređenje {#nft-comparison}

| Internet NFT-ova                                                                                                                                    | Internet današnjice                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Posedujete svoju imovinu! Samo vi možete da je prodajete ili menjate.                                                                               | Unajmljujete proizvode od neke organizacije.                                                                                                      |
| NFT-jevi su digitalno jedinstveni, ne postoje dva ista.                                                                                             | Kopija jednog entiteta uglavnom ne može da se razlikuje od originala.                                                                             |
| Vlasništvo nad NFT-jem je upisano na lancu blokova i svako može to da utvrdi.                                                                       | Vlasništvo nad digitalnom imovinom je upisano na serverima koji su kontrolisani od strane institucija — i morate im verovati.                     |
| NFT-ijevi su pametni ugovori na Ethereumu. Ovo znači da ih možete jednostavno koristiti u okviru drugih pametnih ugovora i aplikacija na Ethereumu! | Kompanije sa digitalnim predmetima uglavnom zahtevaju svoju sopstvenu "zatvorenu" infrastrukturu.                                                 |
| Kreatori sadržaja mogu da prodaju svoj rad bilo gde i imaju pristup globalnom marketu.                                                              | Kreatori se oslanjaju na infrastrukturu i distribuciju platforme koju koriste. Često su podložni uslovima korišćenja i geografskim ograničenjima. |
| Kreatori NFT-ijeva mogu da zadrže prava vlasništva nad svojim delom i direktno programirati autorske naknade u NFT ugovor.                          | Platforme kao što su one za strimovanje muzike zadržavaju većinu profita od prodaje.                                                              |

## Kako NFT-ijevi funkcionišu? {#how-nfts-work}

Kao i bilo koji token izdat na Ethereumu, NFT-ijevi su izdati putem pametnog ugovora. Pametni ugovor se pridržava jednog od nekoliko standarda za NFT-ijeve (uglavnom ERC-721 ili ERC-1155) koji definišu koje funkcije ugovor ima. Ugovor može da kreira ("izrudari") NFT-ijeve i da ih dodeli nekom vlasniku. Vlasništvo je definisano ugovorom mapiranjem određenih NFT-ijeva određenim adresama. NFT ima identifikator (ID) i obično ima povezane metapodatke koji čine određeni token jedinstvenim.

Kada neko kreira ili izrađuje NFT, zapravo izvršava funkciju u pametnom ugovoru koja dodeljuje određeni NFT njihovoj adresi. Ova informacija se čuva u skladištu ugovora koje je deo lanca blokova. Kreator ugovora može dopisati dodatnu logiku u ugovor, na primer može ograničiti ukupnu ponudu ili definisati autorske naknade koje će biti isplaćivane kreatoru svaki put kada se token prenese.

## Za šta se NFT koristi? {#nft-use-cases}

NFT-ijevi se koriste za mnoge svrhe, uključujući:

- Dokaz da ste prisustvovali nekom događaju
- Sertifikat da ste završili neki kurs
- Predmeti koji se mogu posedovati u igrama
- Digitalna umetnost
- Tokenizacija predmeta iz fizičkog sveta
- Dokaz o onlajn identitetu
- Ograničavanje pristupa sadržaju
- Prodaja karata
- Decentralizovani Internet nazivi domena
- Kolateral u decentralizovanim finansijama (DeFi)

Možda ste vi umetnik koji želi da podeli svoj rad koristeći NFT. ijeve bez gubljenja kontrole i žrtvovanja profita u korist posrednika. Možete kreirati novi ugovor i tačno odrediti broj NFT-ijeva, njihovih karakteristika i link ka određenom umetničkom delu. Kao umetnik, možete programirati autorske naknade u pametni ugovor koje bi trebalo da budete plaćeni (na primer, preneti 5% od cene prodaje vlasniku ugovora svaki put kada se NFT prenese). Takođe, možete dokazati da ste vi kreirali NFT tako što posedujete novčanik koji je sproveo ugovor. Vaši kupci mogu jednostavno da dokažu vlasništvo nad NFT-ijem iz vaše kolekcije zato što je njihova adresa novčanika povezana sa tokenom u vašem pametnom ugovoru. Mogu da koriste taj NFT u Ethereum ekosistemu sa uverenjem u njegovu autentičnost.

Ili, zamislite ulaznicu za neki sportski događaj. Kao što organizator nekog događaja može da izabere koliko karata će prodati, isto tako i kreator NFT-ijeva može da odluči koliko replika će postojati. Ponekad su to identične replike kao što je na primer 5000 karata za opšti ulaz. Ponekad nekoliko njih je izrudareno koje su veoma slične, ali ipak malo različite, na primer karte koje imaju određen broj stolice za sedenje. One mogu biti kupljene i prodate direktno bez plaćanja posredniku za ulaznice, a kupac uvek može biti siguran u autentičnost ulaznice proverom adrese ugovora.

Na ethereum.org, NFT-ijevi se koriste da pokažu da su neke osobe doprinele našem Github nalogu ili su prisustvovali pozivu ili čak imaju svoj NFT domen. Ukoliko doprinesete ethereum.org, možete preuzeti svoj POAP NFT. Neki kripto događaju koriste POAP-e kao ulaznice. [Više o doprinosu](/contributing/#poap).

![ethereum.org POAP](./poap.png)

Ovaj sajt takođe ima alternativni naziv domena u vidu NFT-ova, **ethereum.eth**. Našom adresom sa `.org` ekstenzijom se centralno upravlja od strane pružaoca sistema za imena domena (DNS), dok je ethereum`.eth` registrovan na Ethereum putem Ethereum Name Service (ENS). I on je u vlasništvu i upravljanju nas. [Proverite nas ENS zapis](https://app.ens.domains/name/ethereum.eth)

[Više o ENS-u](https://app.ens.domains)

<Divider />

### Bezbednost u pogledu NFT-ova {#nft-security}

Bezbednost Ethereum dolazi od dokaza o ulogu. Sistem je projektovan tako da ekonomski demotiviše zlonamerne radnje, čime se Ethereum čini otpornim na manipulacije. Ovo omogućava NFT-ijeve. Jednom kada blok koji sadrži vašu NFT transakciju postane finalizovan, napadača bi koštalo na milione ETH da to promeni. Bilo ko ko pokreće Ethereum softver odmah bi mogao da otkrije nepošteno manipulisanje NFT-om, a zlonamerni akter bi bio ekonomski kažnjen i izbačen.

Problemi bezbednosti NFT-ijeva su uglavnom povezani sa fišingom, ranjivošću pametnih ugovora ili korisničkom greškom (kao što je nenamerno izlaganje privatnih ključeva), čineći sigurnost novčanika ključnom za vlasnike NFT-ijeva.

<ButtonLink href="/security/">
  Više o bezbednosti
</ButtonLink>

## Dodatna literatura {#further-reading}

- [Vodič za početnike u NFT-u](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) — _ Linda Ksie, Januar 2020._
- [Praćenje EtherscanNFT-a](https://etherscan.io/nft-top-contracts)
- [Standard za tokene ERC-721](/developers/docs/standards/tokens/erc-721/)
- [ERC-1155 standard za tokene](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
