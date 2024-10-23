---
title: Dodavanje novčanika
description: Politika koju koristimo prilikom dodavanja novčanika na ethereum.org
lang: sr
---

# Dodavanje novčanika {#adding-wallets}

Želimo da obezbedimo prikazivanje različitih novčanika koji pokrivaju bogat spektar funkcionalnosti, kako bi korisnici mogli da koriste Ethereum sa punim poverenjem.

Svako može da predloži dodavanje određenog novčanika na ethereum.org. Ukoliko postoji novčanik koji smo preskočili, predložite ga!

Novčanici se trenutno navode na sledećoj stranici:

- [ethereum.org/wallets/find-wallet/](/wallets/find-wallet/)

Novčanici u Ethereum ekosistemu se brzo menjaju. Pokušali smo da kreiramo fer okvir za razmatranje na ethereum.org, ali će se kriterijumi za navođenje vremenom menjati i evoluirati.

## Okvir za donošenje odluka {#the-decision-framework}

### Kriterijumi za uključivanje: obavezne stavke {#the-must-haves}

- **Proizvod testirane bezbednosti** – bilo kroz reviziju, internu bezbednosnu ekipu, otvoreni kod ili neku drugu metodu, bezbednost vašeg novčanika mora biti pouzdana. Ovo smanjuje rizik po naše korisnike i pokazuje da sigurnost ozbiljno shvatate.
- **Novčanik koji je „aktivan“ više od šest meseci ILI koji je izdala grupa sa uglednom istorijom korišćenja** – ovo je još jedan pokazatelj bezbednosti. Šest meseci je dobar vremenski okvir za otkrivanje kritičnih grešaka i zloupotreba. Potrebno je šest meseci kako bismo filtrirali kopije koji se brzo napuštaju kao projekti.
- **Razvijan od strane aktivnog tima** – ovo pomaže da se osigura kvalitet i da korisnik dobije podršku za upite.
- **Iskrene i tačne informacije za navođenje** – očekuje se da sva predložena navođenja iz projekata sadrže iskrene i tačne informacije. Proizvodi koji falsifikuju informacije za navođenje, kao što je navođenje da je proizvod „otvorenog koda“, a on to nije, biće uklonjeni.
- **Kontakt osoba** – kontakt osoba za novčanik će nam u velikoj meri pomoći da dobijemo tačne informacije kada se naprave promene. Ovo će olakšati ažuriranje sajta ethereum.org prilikom prikupljanja budućih informacija.
- **EIP-1559 (tip 2) transakcije** – vaš novčanik mora podržavati EIP-1559 (tip 2) transakcije za transakcije na Ethereum glavnoj mreži.
- **Dobro korisničko iskustvo** – dok je korisničko iskustvo stvar ukusa, ukoliko nekoliko glavnih članova tima testira proizvod i smatra da je komplikovan za korišćenje, zadržavamo pravo da odbijemo novčanik i da umesto toga damo korisne sugestije za unapređenje. Ovo se radi kako bismo zaštitili našu bazu korisnika koja se uglavnom sastoji od početnika.

### Uklanjanje proizvoda {#product-removals}

- **Ažurirane informacije** – pružaoci usluge novčanika su odgovorni za ponovno slanje informacija o novčaniku svakih 6 meseci kako bi se osigurala validnost i relevantnost pruženih informacija (čak i ako nema promena u proizvodu). Ako tim za proizvod to ne učini, ethereum.org može ukloniti projekat sa stranice.

### Ostali kriterijumi: poželjne karakteristike {#the-nice-to-haves}

- **Globalno dostupan** – novčanik ne sme imati geografska ograničenja ili zahteve za potvrdu identiteta (KYC) koji isključuju određene osobe iz pristupa vašoj usluzi.
- **Dostupan na više jezika** – novčanik je preveden na više jezika, što omogućava korisnicima širom sveta da mu pristupe.
- **Otvoreni kod** – ceo kod vašeg projekta (ne samo moduli) treba da bude dostupan i trebalo bi prihvatati zahteve za izmene od šire zajednice.
- **Samoupravljački** – korisnici kontrolišu svoja sredstva. Ukoliko proizvod nestane, korisnici i dalje imaju pristup i mogu da upravljaju svojim sredstvima.
- **Podrška za hardverske novčanike** – korisnici mogu povezati hardverski novčanik za potpisivanje transakcija.
- **WalletConnect** – korisnici mogu da se povežu na decentralizovane aplikacije koristeći WalletConnect.
- **Uvoz Ethereum RPC krajnjih tačaka** – korisnici mogu uvoziti RPC podatke čvorova, što im omogućava da se povežu na čvor po svom izboru ili na druge mreže kompatibilne sa EVM-om.
- **NFT-ovi** – korisnici mogu da vide i interaguju sa NFT-ovima u novčaniku.
- **Povezivanje sa Ethereum aplikacijama** – korisnici mogu da se povežu sa Ethereum aplikacijama i koriste ih.
- **Ulaganje** – korisnici mogu da ulože direktno putem novčanika.
- **Razmena** – korisnici mogu da razmenjuju tokene putem novčanika.
- **Višelančane mreže** – novčanik podrazumevano podržava da korisnici pristupaju mrežama sa više lanaca blokova.
- **Mreže nivoa 2** – novčanik podrazumevano podržava da korisnik može da pristupi mrežama nivoa 2.
- **Prilagođavanje naknada za gas** – novčanik omogućava korisnicima da prilagode naknade za gas (osnovna naknada, naknada za prioritet, maksimalna naknada).
- **Podrška za ENS** – novčanik omogućava korisnicima da šalju transakcije na ENS imena.
- **Podrška za ERC-20** – novčanik omogućava korisnicima da uvoze ugovore za ERC-20 tokene ili da automatski pretražuje i prikazuju ERC-20 tokene.
- **Kupovina kriptovaluta** – novčanik podržava da korisnici direkno kupuju kriptovalute i započinju korišćenje kriptovaluta.
- **Prodaja za fiat** – korisnici preko novčanika mogu da prodaju i povlače sredstva u valuti fiat direkno na karticu ili na račun u banci.
- **Višepotpisni** – novčanik podržava više potpisa kako bi se potpisala transakcija.
- **Društvena obnova naloga** – novčanik podržava čuvare, tako da korisnik može da povrati novčanik ako izgubi seed frazu koristeći ove čuvare.
- **Namenski tim za podršku** – novčanik ima namenski tim za podršku kojem se korisnici mogu obratiti u slučaju problema.
- **Obrazovni resursi/dokumentacija** – proizvod bi trebalo da pruža jednostavno iskustvo za početnike kako bi im pomogao i edukovao ih. Ili pak da sadrži dokaz o sadržaju sa uputstvima, kao što su članci ili video-snimci.

## Dodavanje novčanika {#adding-a-wallet}

Ukoliko želite da dodate novčanik na ethereum.org, kreirajte upit na GitHub-u.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml">
  Kreirajte upit
</ButtonLink>

## Održavanje {#maintenance}

S obzirom na fluidnu prirodu Ethereum-a, timovi i proizvodi dolaze i odlaze, a inovacije se dešavaju svakodnevno, pa ćemo sprovoditi redovne provere našeg sadržaja kako bismo:

- osigurali da svi navedeni novčanici i decentralizovane aplikacije ispunjavaju potrebne kriterijume
- proverili da li postoje proizvodi koji su predloženi i koji ispunjavaju više naših kriterijuma od onih koji su trenutno navedeni

ethereum.org održava zajednica otvorenog koda i oslanjamo se na zajednicu da nam pomogne da svi podaci budu ažurirani. Ukoliko primetite bilo koju informaciju o navednim novčanicima koju je potrebno ažurirati, [ pošaljite upit](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml) ili [zahtev za izmenu](https://github.com/ethereum/ethereum-org-website/pulls)!


## Uslovi korišćenja {#terms-of-use}

Pogledajte i naše [uslove korišćenja](/terms-of-use/). Informacije na ethereum.org pružaju se isključivo u svrhu opšteg informisanja.
