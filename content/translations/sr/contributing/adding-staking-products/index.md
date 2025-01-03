---
title: Dodavanje proizvoda ili usluga za ulaganje
description: Politika kojom se vodimo prilikom dodavanja proizvoda ili usluga za ulaganje na ethereum.org
lang: sr
---

# Dodavanje proizvoda ili usluga za ulaganje {#adding-staking-products-or-services}

Želimo da obezbedimo da navedemo najbolje moguće resurse dok održavamo sigurnost i poverenje korisnika.

Svako može da preporuči dodavanje proizvode ili usluge za ulaganje na ethereum.org. Ukoliko smo neki preskočili, **[predložite ga](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

Proizvode i usluge za ulaganje trenutno navodimo na sledećim stranicama:

- [Samostalno zalaganje](/staking/solo/)
- [Zalaganje kao servis](/staking/saas/)
- [Grupno ulaganje](/staking/pools/)

Dokaz o ulogu na Beacon lancu je aktivan od 1. decembra 2020. godine. Iako je ulaganje još uvek relativno nov koncept, trudili smo se da stvorimo pošten i transparentan okvir za razmatranje na ethereum.org, ali kriterijumi za navođenje će se menjati i razvijati tokom vremena i na kraju su u nadležnosti tima koji održava sajt ethereum.org.

## Okvir za donošenje odluka {#the-decision-framework}

Odluka o navođenje proizvoda na ethereum.org ne zavisi od samo jednog faktora. Više kriterijuma se zajedno uzimaju u obzir kada je u pitanju odlučivanje o tome koji proizvod ili uslugu ćemo navesti. Što je više kriterijuma ispunjeno, veća je verovatnoća da će se taj proizvod ili usluga navesti.

**Prvo, koja je kategorija proizvoda ili usluge?**

- Alati za čvorove ili klijente
- Upravljanje ključevima
- Ulaganje kao usluga (SaaS)
- Grupno ulaganje

Trenutno navodimo samo proizvode ili usluge u ovim kategorijama.

### Kriterijumi za uključivanje {#criteria-for-inclusion}

Zahtevi za navođenje proizvoda ili usluga za ulaganje biće ocenjivani prema sledećim kriterijumima:

**Kada su proizvod ili usluga pokrenuti?**

- Da li postoji dokaz kada su proizvod ili usluga postali javno dostupni?
- Ovo se koristi kako bismo odredili da li su proizvodi provereni u praksi.

**Da li se projekat aktivno održava?**

- Da li postoji tim koji aktivno razvija projekat? Who is involved?
- Samo proizvodi koji se aktivno održavaju će biti uzeti u obzir.

**Da li su proizvod ili usluga oslobođeni pouzdanih/ljudskih posrednika?**

- Koji koraci u korisničkom putovanju zahtevaju poverenje u ljude da drže ključeve do sredstava ili da pravilno raspodeljuju nagrade?
- Ovo se koristi za određivanje stepena „bezbednosti bez poverenja“ proizvoda ili usluge.

**Da li projekat pruža tačne i pouzdane informacije?**

- Ključno je da sajt proizvoda sadrži ažurirane, tačne i neobmanjujuće informacije, naročito ako se odnose na Ethereum protokol ili druge povezane tehnologije.
- Prijave koje sadrže dezinformacije, zastarele detalje ili potencijalno obmanjujuće izjave o Ethereum-u ili drugim relevantnim temama neće biti navedene ili će biti uklonjene ako su već navedene.

**Koje platforme su podržane?**

- Na primer, Linux, macOS, Windows, iOS, Android

#### Softver i pametni ugovori {#software-and-smart-contracts}

Za bilo koji uključeni prilagođeni softver ili pametni ugovor:

**Da li je sve otvorenog koda?**

- Projekti otvorenog koda treba da imaju javno dostupan repozitorijum otvorenog koda
- Ovo se koristi kako bi se utvrdilo u kojoj meri je određeni proizvod otvorenog koda.

**Da li je proizvod izašao iz faze _beta_ razvoja?**

- Dokle se stiglo sa razvojem proizvoda?
- Proizvodi u beta fazi razvoja neće biti razmotreni za navođenje na ethereum.org

**Da li je softver prošao eksternu bezbednosnu reviziju?**

- Ukoliko nije, da li je u planu sprovođenje eksterne revizije?
- Ovo se koristi kako bismo odredili da li su proizvodi revidirani.

**Da li projekat ima program nagrađivanja otkrivanja grešaka?**

- Ukoliko nije, da li postoji plan za uspostavljanje nagrađivanja otkrivanja grešaka?
- Ovo se koristi kako bi se utvrdio nivo nagrada za otkrivanje grešaka za proizvode.

#### Alati za čvorove ili klijente {#node-or-client-tooling}

Za softverske proizvode koji se odnose na podešavanje, upravljanje ili migraciju čvorova ili klijenata:

**Koji klijenti nivoa konsenzusa (na primer, Lighthouse, Teku, Nimbus, Prysm) su podržani?**

- Koji klijenti su podržani? Da li korisnik može da bira?
- Ovo se koristi za određivanje nivoa „višeklijentski“ proizvoda.

#### Zalaganje kao servis {#staking-as-a-service}

Za [navođenje rešenja za ulaganje kao usluga](/staking/saas/) (na primer, delegirano upravljanje čvorom):

**Koji su troškovi povezani sa korišćenjem usluge?**

- Kakva je struktura naknada, na primer, da li postoji mesečna naknada za uslugu?
- Da li postoje dodatni zahtevi za ulaganje?

**Da li korisnici moraju da se registruju da bi imali nalog?**

- Da li neko može da koristi uslugu bez dozvole ili provere identiteta (KYC)?
- Ovo se koristi za određivanje nivoa „bez dozvola“ proizvoda.

**Ko ima ključeve za potpisivanje i ključeve za povlačenje sredstava?**

- Koje ključeve korisnik zadržava u svom posedu? Kojim ključevima usluga dobija pristup?
- Ovo se koristi za određivanje nivoa „bez poverenja“ proizvoda.

**Kakva je raznovrsnost klijenata koji se koriste za upravljanje čvorovima?**

- Koji procenat validatorskih ključeva koristi većinski klijent nivoa konsenzusa (CL)?
- Od poslednje izmene, Prysm je klijent nivoa konsenzusa koji koristi većina upravljača čvorova, što je opasno za mrežu. Ukoliko bilo koji CL klijent trenutno koristi preko 33% mreže, zahtevamo podatke koji su povezani sa ovim korišćenjem.
- Ovo se koristi za određivanje nivoa „raznolikosti klijenata“ proizvoda.

#### Grupno ulaganje {#staking-pool}

Za [usluge grupnog ulaganja](/staking/pools/):

**Koji je minimum ETH potreban za ulaganje?**

- Na primer, 0,01 ETH

**Koje su sve provizije uključene i koji su zahtevi za ulaganje?**

- Koji procenat nagrada se uklanja kao provizija?
- Da li postoje dodatni zahtevi za ulaganje?

**Da li postoji token likvidnosti?**

- Koji su tokeni uključeni? Kako funkcionišu? Koje su adrese ugovora?
- Ovo se koristi za određivanje nivoa „token likvidnosti“ proizvoda.

**Da li korisnici mogu da učestvuju kao upravljači čvorova?**

- Šta je neophodno da bi se pokrenuo validatorski klijent korišćenjem objedinjenih sredstava?
- Da li to zahteva dozvolu neke osobe, kompanije ili DAO-a?
- Ovo se koristi za određivanje nivoa „čvorovi bez dozvola“ proizvoda.

**Kakva je raznovrsnost klijenata među upravljačima čvorova u grupi?**

- Koliki procenat upravljača čvorova koristi većinski klijent nivoa konsenzusa (CL)?
- Od poslednje izmene, Prysm je klijent nivoa konsenzusa koji koristi većina upravljača čvorova, što je opasno za mrežu. Ukoliko bilo koji CL klijent trenutno koristi preko 33% mreže, zahtevamo podatke koji su povezani sa ovim korišćenjem.
- Ovo se koristi za određivanje nivoa „raznolikosti klijenata“ proizvoda.

### Ostali kriterijumi: poželjne karakteristike {#other-criteria}

**Koji korisnički interfejsi su podržani?**

- Na primer, Aplikacija za pregledač, desktop aplikacija, mobilna aplikacija, CLI (komandna linija)

**Za alate za čvorove, da li softver omogućava jednostavno prebacivanje iz jednog klijenta u drugi?**

- Da li korisnik može lako i bezbedno da menja klijente koristeći alat?

**U slučaju SaaS, kojim brojem validatora trenutno upravlja usluga?**

- Ovo nam daje uvid u dosadašnji domet vaše usluge.

## Kako prikazujemo rezultate {#product-ordering}

Gore navedeni [kriterijumi za uključivanje](#criteria-for-inclusion) se koriste za izračunavanje kumulativne ocene za svaki proizvod ili uslugu. Ovo se koristi kao sredstvo za sortiranje i pokazivanje proizvoda koji ispunjavaju određene objektivne kriterijume. Što ima više kriterijuma za koje su dostavljeni dokazi, proizvod će biti bolje rangiran, pri čemu će izjednačenja biti nasumično rešena prilikom učitavanja.

Logika koda i važnost ovih kriterijuma trenutno su sadržani u [u ovoj JavaScript komponenti](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid.js#L350) u našem repozitorijumu.

## Dodavanje proizvoda ili usluge {#add-product}

Ukoliko želite da dodate proizvod ili uslugu za ulaganje na ethereum.org, kreirajte upit na GitHub-u.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Kreirajte upit
</ButtonLink>
