---
title: Prijedlozi za poboljšanje Ethereuma (EIP)
description: Osnovne informacije koje morate razumijeti o EIP-u
lang: hr
---

# Uvod u prijedloge za poboljšanje Ethereuma (EIP) {#introduction-to-ethereum-improvement-proposals}

## Što je EIP? {#what-are-eips}

[Prijedlozi za poboljšanje Ethereuma (EIP)](https://eips.ethereum.org/) norme su koje specificiraju nove značajke procesa za Ethereum. EIP sadrži tehničke specifikacije predloženih promjena i predstavlja „točan izvor” informacija za zajednicu. Norme mrežnih nadogradnji i aplikacija za Ethereum razmatraju se u okviru EIP postupka.

Svaki član zajednice Ethereum može izraditi EIP. Smjernice o tome kako napisati EIP sadržane su u dokumentu [EIP-1](https://eips.ethereum.org/EIPS/eip-1). EIP mora sadržavati jasne tehničke specifikacije uz manji znak motivacije. Pisac EIP-a odgovoran je za postizanje konsenzusa u zajednici i dokumentiranje mogućih mišljenja. Uzimajući u obzir činjenicu da dobro oblikovani EIP zahtijeva visoko tehničko znanje, povijesno gledano pisci EIP-a uglavnom su razvojni programeri aplikacija i protokola.

## Što EIP znači? {#why-do-eips-matter}

EIP ima centralnu ulogu u postupku kako se promjene događaju i dokumentiraju u Ethereumu. One su način kako pojedinci mogu predložiti promjene, raspraviti o njima i u konačnici ih usvojiti. Postoje [različite vrste EIP-ova](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types), uključujući osnovne EIP-ove za promjene protokola niske razine koje imaju utjecaj na konsenzus i zahtijevaju mrežnu nadogradnju poput [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) te ERC-ovi za norme u svezi s aplikacijom poput [EIP-20](https://eips.ethereum.org/EIPS/eip-20) i [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Svaka se mrežna nadogradnja sastoji od skupine EIP-ova koju svaki [Ethereumov korisnik](/learn/#clients-and-nodes) mora implementirati na mreži. To znači da ako žele ostati u konsenzusu s drugim korisnicima glavne mreže Ethereum, razvojni programeri korisnika moraju implementirati sve obvezne EIP-ove.

Zajedno s tehničkim specifikacijama promjena, EIP predstavlja osnovu upravljanja u Ethereumu: svatko može dati prijedlog koji će zatim različiti dionici zajednice raspraviti i odlučiti traba li se promjena usvojiti kao norma ili se treba ugraditi u mrežnu nadogradnju. Kako se EIP-ovi koji nisu osnovni ne moraju usvojiti u svim primjenama (npr. moguće je izraditi zamjenjivi token koji ne implementora EIP-20), dok se osnovni EIP-ovi moraju usvojiti u većoj mjeri (jer se svi mrežni čvorovi moraju nadograditi kako bi ostali dijelom iste mreže), osnovni EIP-ovi zahtijevaju širi konsenzus zajednice od EIP-ova koji nisu osnovni.

## Povijest EIP-a {#history-of-eips}

[GitHubov repozitorij prijedloga za poboljšanje Ethereuma](https://github.com/ethereum/EIPs) izrađen je u listopadu 2015. Postupak za EIP temelji se na postupku za [prijedloge za poboljšanje Bitcoina (BIP)](https://github.com/bitcoin/bips), a koji se temelji na postupku za [prijedloge za poboljšanje Pythona (PEP)](https://www.python.org/dev/peps/).

Urednici EIP-a dobivaju zadatak pregleda EIP-a pri čemu se usredotočuju na tehničku jasnoću, pogreške u formatiranju te ispravljanje pravopisnih, gramatičkih pogrešaka i stila koda. Martin Becze, Vitalik Buterin, Gavin Wood i ješ nekolicina bili su izvorni urednici za EIP od 2015. do kraja 2016.

Trenutačni urednici za EIP su:

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Umirovljeni urednici za EIP su:

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Ako želite postati urednik za EIP, pogledajte dokument [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Urednici za EIP odlučuju kada je prijedlog spreman da postane službeni EIP i pomažu piscima EIP-a da svoj prijedlog proslijede dalje. [Ethereum Cat Herderi](https://ethereumcatherders.com/) pomaže organizirati sastanke između urednika za EIP i zajednice (pogledajte [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Cjelokupni postupak standardizacije i dijagram opisani su u dokumentu [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Saznajte više {#learn-more}

Ako vas zanima više o EIP-u, pogledajte [web-mjesto za EIP](https://eips.ethereum.org/) i dokument [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Slijedi nekoliko korisnih veza:

- [Popis svih EIP-ova](https://eips.ethereum.org/all)
- [Opis svih vrsta EIP-ova](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Opis svih stanja EIP-a](https://eips.ethereum.org/EIPS/eip-1#eip-process)

## Sudjelovanje {#participate}

Svatko može izraditi EIP. Prije nego što pošaljete prijedlog, pročitajte dokument [EIP-1](https://eips.ethereum.org/EIPS/eip-1) u kojemu je opisanj postupak za EIP i kako napisati EIP te tražene povratne informacije na web-mjestu [Ethereum Magicians](https://ethereum-magicians.org/) gdje se prije slanja skice o prijedlozima prvo razgovara u zajednici.

## Reference {#references}

<cite class="citation">

Vlasnik dijela sadržaja stranice [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) je Hudson Jameson

</cite>
