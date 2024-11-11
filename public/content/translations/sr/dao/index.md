---
title: Decentralizovane autonomne organizacije (DAO-i)
description: Pregled DAO-a na mreži Ethereum
lang: sr
template: use-cases
emoji: ":handshake:"
sidebarDepth: 2
image: /images/use-cases/dao-2.png
alt: Predstava nezavisne decentralizovane organizacije (DAO) koja glasa o predlogu.
summaryPoint1: Zajednice koje su u vlasništvu članova bez centralizovanog vođstva.
summaryPoint2: Siguran način da sarađujete sa strancima na internetu.
summaryPoint3: Sigurno mesto za ulaganje sredstava u neki specifičan cilj.
---

## Šta su DAO-i? {#what-are-daos}

DAO je organizacija koja je u kolektivnom vlasništvu, kojom se upravlja putem lanca blokova i koja radi na zajedničkoj misiji.

DAO omogućava da radimo sa osobama koje slično razmišljaju kao mi širom planete bez potrebe da verujemo dobroćudnom vođi da upravlja sredstvima ili operacijama. Ne postoji generalni direktor koji može da troši sredstva na svoje hirove ili finansijski direktor koji može da manipuliše knjigama. Umesto toga, pravila su definisana na lancu blokova i ugrađena u kod koji definiše kako organizacija funkcioniše i kako se sredstva troše.

Imaju ugrađene trezore nad kojima niko nema ovlašćenja za pristup bez odobrenja grupe. Odluke se uređuju na osnovu predloga i glasanja kako bi se osiguralo da svaka osoba u organizaciji ima glas, i sve se dešava transparentno na lancu.

## Zašto su nam potrebni DAO-i? {#why-dao}

Pokretanje organizacije sa nekim ko podrazumeva finansiranje i novac zahteva veliko poverenje u osobe sa kojima sarađujete. Ali je teško verovati nekome sa kim ste interagovali samo putem interneta. Sa DAO-ima nema potrebe da se veruje bilo kome u grupi, već samo kodu DAO-a, što je 100% transparentno i može bilo ko da ga proveri.

To otvara brojne nove mogućnosti za saradnju i koordinaciju na globalnom nivou.

### Poređenje {#dao-comparison}

| Decentralizovane i autonomne organizacije                                                                      | Tradicionalna organizacija                                                                                |
| -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Uglavnom je bez hijerarhije, potpuno demokratizovana.                                                          | Uglavnom ima hijerarhiju.                                                                                 |
| Za bilo kakvu promenu ili odluku potrebno je glasanje članova.                                                 | U zavisnosti od strukture, promene može zahtevati samo jedna strana ili se može ponuditi glasanje.        |
| Glasovi se sabiraju, a ishod se automatski sprovodi bez potrebe za posrednikom.                                | Ako je glasanje dozvoljeno, glasovi se broje interno i ishod glasanja se daje ručno.                      |
| Usluge koje se nude automatski se obrađuju na decentralizovan način (npr. raspodelom filantropskih sredstava). | Potrebno je ljudsko upravljanje ili automatski, ali centralno kontrolisano, što je podložno manipulaciji. |
| Sve aktivnosti su transparentne i potpuno javne.                                                               | Aktivnosti su uglavnom privatne, i ograničene za javnost.                                                 |

### DAO primeri {#dao-examples}

Da bi ovo imalo više smisla, evo nekoliko primera kako možete koristiti DAO:

- Humanitarna organizacija – Možete primati donacije od bilo koga na svetu i glasati koje ciljeve želite da finansirate.
- Kolektivno vlasništvo – možete kupiti fizičku ili digitalnu imovinu i članovi mogu glasati o tome kako će se ona koristiti.
- Ulaganja i stipendije – možete osnovati fond za ulaganja koji akumulira investicioni kapital i glasati koja ulaganja treba podržati. Vraćeni novac se kasnije može ponovo podeliti članovima DAO-a.

## Kako DAO funkcioniše? {#how-daos-work}

Suština svakog DAO-a je njegov pametni ugovor, kojim se definišu pravila organizacije i čuva njen budžet. Kada je ugovor objavljen na mreži Ethereum, niko ne može promeniti pravila izuzev na glasanju. Ako neko pokuša da uradi nešto što nije obuhvaćeno pravilima i logikom u kodeksu, neće uspeti. I s obzirom na to da je trezor definisan i pametnim ugovorom, to znači da niko ne može da potroši novac bez odobrenja ostalih članova grupe. To znači da DAO-u nije potreban centralni organ. Umesto toga, grupa kolektivno donosi odluke i plaćanja se automatski odobravaju nakon glasanja.

To je moguće zato što su pametni ugovori, kada se objave na mreži Ethereum, zaštićeni od neovlašćenog rukovanja. Ne možete jednostavno urditi kod (pravila DAO-a), a da ljudi to ne primete zato što je sve javno.

<DocLink href="/smart-contracts/">
  Više o pametnim ugovorima
</DocLink>

## Ethereum i DAO-i {#ethereum-and-daos}

Ethereum je savršena osnova za DAO iz brojnih razloga:

- Konsenzus mreže Ethereum je distribuiran i utvrđen dovoljno da bi organizacije verovale mreži.
- Kada se kod pametnog ugovora objavi, on se ne može menjati, pa čak ni od strane njegovih vlasnika. To omogućava da DAO funkcioniše prema pravilima na osnovu kojih je programiran.
- Pametni ugovori mogu da šalju/primaju sredstva. Bez toga, bio bi potreban posrednik koji bi upravljao sredstvima organizacije.
- Zajednica Ethereum se pokazala kao saradljivija, a ne kompetetivna, što omogućava brz razvoj najboljih praksi i sistema podrške.

## Upravljanje DAO-m {#dao-governance}

Postoji mnogo otvorenih pitanja pri upravljanju DAO-m, kao što su funkcionisanje glasanja i predlaganja.

### Delegiranje {#governance-delegation}

Delegiranje je DAO verzija predstavničke demokratije. Vlasnici tokena delegiraju glasove korisnicima koji sebe nominuju i potvrđuju se da će nadgledati protokol i biti informisani.

#### Poznat primer {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) – Vlasnici tokena ENS mogu da delegiraju svoje glasove angažovanim članovima zajednice kako bi ih predstavljali.

### Automatsko upravljanje transakcijama {#governance-example}

U mnogim DAO-ima, transakcije će se automatski izvršavati ako članovi kvorumom glasaju potvrdno.

#### Poznat primer {#governance-example}

[Nouns](https://nouns.wtf) — U Nouns DAO-u, transakcije se izvršavaju automatski ako postoji kvorum glasova i ako se većinom glasa potvrdno, pod uslovom da neko od osnivača ne stavi veto.

### Upravljanje višestrukim potpisima {#governance-example}

Iako DAO-i mogu imati hiljade članova sa pravom glasa, sredstva mogu biti smeštena u novčaniku koji deli 5–20 aktivnih članova zajednice koji su pouzdani i obično su javno prepoznatljivi (javni identiteti poznati zajednici). Nakon glasanja, potpisnici sa više potpisa će izvršiti volju zajednice.

## Zakoni DAO-a {#dao-laws}

Godine 1977. američka savezna država Vajoming stvorila je LLC (limited liability company/društvo sa ograničenom odgovornošću), kojim štiti preduzetnike i ograničava njihovu odgovornost. Nedavno, ta država bila je pionir i u usvajanju zakona o DAO kojim se uspostavlja pravni status DAO-a. Trenutno, Vajoming, Vermont i Devičanska Ostrva imaju zakone o DAO u nekom obliku.

### Poznat primer {#law-example}

[DAOGrad](https://citydao.io)Kompanija CityDAO je iskoristila zakon o DAO savezne države Vajoming da kupi 40 ari zemljišta u blizini Nacionalnog parka Jeloustoun.

## Članstvo u DAO-u {#dao-membership}

Postoje različiti modeli za članstvo u DAO-u. Članstvo može da odredi kako glasanje funkcioniše i ostale ključne delove DAO-a.

### Članstvo zasnovano na tokenima {#token-based-membership}

Uglavnom potpuno bez potrebe za dozvolama, u zavisnosti od korišćenog tokena. Uglavnom se tim upravljačkim tokenima može trgovati bez posebne dozvole na decentralizovanoj menjačnici. Ostali se moraju zaraditi pružanjem likvidnosti ili nekim drugim „dokazom o radu”. U svakom slučaju, prosto posedovanje tokena garantuje pristup glasanju.

_Uglavnom se koriste za upravljanje širokim decentralizovanim protokolima i/ili samim tokenima._

#### Poznat primer {#token-example}

[MakerDAO](https://makerdao.com) — Token MKR kompanije MakerDAO široko je dostupan u decentralizovanim menjačnicama i svako može da kupi pravo glasa o budućnosti protokola Maker.

### Članstvo zasnovano na udelu {#share-based-membership}

DAO-i zasnovani na udelu zahtevaju traženje više dozvola, ali i dalje prilično otvoreni. Potencijalni članovi mogu podneti zahtev za pridruživanje DAO-u, obično nudeći prilog vrednosti u vidu tokena ili rada. Udeo predstavlja direktno pravo glasanja i vlasništvo. Članovi mogu izaći u bilo kojem trenutku sa svojim proporcionalnim udelom iz trezora.

_Obično se koriste za organizacije koje su bliskije, orijentisane ka ljudima, kao što su humanitarne organizacije, radničke zadruge i investicioni klubovi. Takođe mogu upravljati i protokolima i tokenima._

#### Poznat primer {#share-example}

[MolochDAO](http://molochdao.com/) – Kompanija MolochDAO je usredsređena na finansiranje projekata u mreži Ethereum. Zahteva predlog za članstvo kako bi grupa mogla da proceni da li imate potrebnu stručnost i kapital da donosite odluke zasnovane na obaveštenosti o potencijalnim dobitnicima sredstava. Ne možete jednostavno da kupite pristup DAO-u na otvorenom tržištu.

### Članstvo zasnovano na reputaciji {#reputation-based-membership}

Reputacija predstavlja dokaz o učešću i omogućava pravo glasanja u DAO-u. Za razliku članstva zasnovanog na posedovanju tokena ili udela, DAO-i zasnovani na reputaciji ne prenose vlasništvo na one koji daju doprinos. Reputacija se ne može kupiti, preneti ili delegirati; članovi DAO-a moraju da zasluže svoju reputaciju učestvovanjem. Glasanje na lancu ne zahteva odobrenje i potencijalni članovi mogu slobodno da daju predloge za pridruživanje DAO-u i da traže da dobiju reputaciju i tokene kao nagradu za svoj doprinos.

_Obično se koristi za decentralizovani razvoj i upravljanje protokolima i decentralizovanim aplikacijama, ali takođe, ovaj tip DAO-a je pogodan za različite vrste organizacija kao što su humanitarne organizacije, radničke zadruge, investicioni klubovi itd._

#### Poznat primer {#reputation-example}

[DXdao](https://DXdao.eth.link) — DXdao je globalna samoupravljiva zadruga koja gradi decentralizovane protokole i aplikacije i upravlja njima od 2019. godine. DXdao koristi upravljanje zasnovano na reputaciji i holografski konsenzus za koordinaciju i upravljanje sredstvima, što znači da niko ne može da kupi uticaj na svoju budućnost.

## Pridruži se/pokreni DAO {#join-start-a-dao}

### Join a DAO {#join-a-dao}

- [DAO-i zajednice mreže Ethereum](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [Lista DAO-a organizacije DAOHaus](https://app.daohaus.club/explore)
- [Lista DAO-a organizacije Tally.xyz](https://www.tally.xyz)

### Pokreni DAO {#start-a-dao}

- [Prizovi DAO sa DAOHaus-om](https://app.daohaus.club/summon)
- [Pokreni upravljački DAO pomoću organizacije Tally](https://www.tally.xyz/add-a-dao)
- [Pokreni DAO koji pokreće Aragon](https://aragon.org/product)
- [Osnuj koloniju](https://colony.io/)
- [Pokreni DAO sa holografskim konsenzusom organizacije DAOstack](https://alchemy.daostack.io/daos/create)

## Dodatna literatura {#further-reading}

### Članci o DAO-u {#dao-articles}

- [Šta je DAO?](https://aragon.org/dao) – [Aragon](https://aragon.org/)
- [Priručnik za DAO](https://daohandbook.xyz)
- [Kuća DAO-a](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [metaigra](https://wiki.metagame.wtf/)
- [Šta je DAO i čemu služi?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [Kako pokrenuti digitalnu zajednicu koja koristi tehnologiju DAO](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [Šta je DAO?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) — [Coinmarketcap](https://coinmarketcap.com)
- [Šta je holografski konsenzus?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) – [DAOstack](https://daostack.io/)
- [DAO-i nisu korporacije: gde decentralizacija u autonomnim organizacijama ima značaj, autor: Vitalik](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [DAO-i, DAC-i, DA-i i još mnogo toga: nedovršen vodič kroz terminologiju](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) – [Ethereum Blog](https://blog.ethereum.org)

### Videos {#videos}

- [Šta je DAO u kriptovalutama?](https://youtu.be/KHm0uUPqmVE)
- [Može li DAO da izgradi grad?](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) — [TED](https://www.ted.com/)
