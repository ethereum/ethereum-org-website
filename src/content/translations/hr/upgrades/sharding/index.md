---
title: Razdjeljivanje
description: Saznajte više o razdjeljivanju – razbijanju i distribuciji podatkovnog opterećenja koje je potrebno kako bi Ethereum povećao kapacitet za transakcije i kako bi mu se olakšao rad.
lang: hr
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: Razdjeljivanje je nadogradnja u više faza s ciljem poboljašnja skalabilnosti i kapaciteta Ethereuma.
summaryPoint2: Razdjeljivanje pruža sigurnu distribuciju zahtjeva za pohranu podataka kako bi objedinjavanje transakcija postalo još jeftinije i kako bi čvorovi lakše funkcionirali.
summaryPoint3: Te faze omogućuju rješenja sloja 2 kako bi se ponudile niže cijene transakcija uz ulaganje sigurnosti Ethereuma.
summaryPoint4: Ova je nadogradnja postala zanimljivija nakon što je Ethereum prešao na koncept dokaza uloga.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Razdjeljivanje se očekuje negdje u 2023. Djelići će Ethereumu dati veći kapacitet za pohranu i pristup podacima, ali se neće upotrebljavati za izvršavanje koda.
</UpgradeStatus>

## Što je razdjeljivanje? {#what-is-sharding}

Razdjeljivanje je postupak horizontalnog razdvajanja baze podataka radi raspodjele opterećenja – to je uobičajena koncepcija u računalnoj znanosti. U kontekstu Ethereuma razdjeljivanje će djelovati u sinergiji s [objedinjavanjem transakcija sloja 2](/layer-2/) tako što će dijeliti opterećenje obrade velike količine podataka koji su potrebni za objedinjavanje transakcija cijele mreže. Tako će se nastaviti smanjivati zagušenje mreže i povećavati broj transakcija u sekundi.

To je važno iz razloga koji nisu skalabilnost.

## Značajke razdjeljivanja {#features-of-sharding}

### Svatko može pokrenuti čvor {#everyone-can-run-a-node}

Razdjeljivanje je dobar način za skaliranje ako želite da stvari ne budu centralizirane jer je alternativa skaliranju povećanje veličine postojeće baze podataka. To bi Ethereum učinilo manje dostupnim mrežnim validatorima jer bi im trebala snažna i skupa računala. Uz razdjeljivanje validatori više neće morati pohranjivati sve te podatke, već će moći upotrebljavati podatkovne tehnike kojima će provjeriti jesu li podaci koje je mreža učinila dostupnim potpuni. To drastično smanjuje troškove pohrane podataka na sloju 1 jer smanjuje hardverske zahtjeve.

### Više mrežnog sudjelovanja {#more-network-participation}

Razdjeljivanje će vam na kraju omogućiti pokretanje Ethereuma na osobnom prijenosnom računalu ili telefonu. Tako bi više ljudi trebalo biti u mogućnosti sudjelovati ili pokretati [ klijente](/developers/docs/nodes-and-clients/) u razdijeljenom Ethereumu. To će povećati sigurnost jer što je mreža decentralizirana, to je manja površina napada.

S nižim hardverskim zahtjevima, razdjeljivanje će olakšati samostalno pokretanje [klijenata](/developers/docs/nodes-and-clients/), bez oslanjanja na bilo kakve posredničke usluge. A ako možete, razmotrite mogućnost pokretanja više klijenata. To može pomoći zdravlju mreže daljnjim smanjenjem točaka kvara.

<br />

<InfoBanner isWarning>
  Morat ćete istodobno pokrenuti klijent za izvršenje kao i klijenta za konsenzus. <a href="https://launchpad.ethereum.org" target="_blank">Lansirna rampa</a> provest će vas kroz hardverske zahtjeve i postupak.
</InfoBanner>

## Lanci djelića, verzija 1: dostupnost podataka {#data-availability}

<InfoBanner emoji=":construction:" isWarning>
  <strong>Napomena:</strong> planovi za razdjeljivanje neprestano se razvijaju kako se pronalaze bolji načini skaliranja. „Dank-razdjeljivanje” novi je pristup razdjeljivanja. On ne primjenjuje koncept razbijenih „lanaca”, već upotrebljava razbijene „kapljica” kojim se dijelje podaci zajedno s „uzorkovanjem dostupnosti podataka” kako bi se potvrdilo da su dostupni svi podaci. Ta promjena rješava isti izvorni problem.<br/><br/>
  <strong>Pojedinosti u nastavku možda su zastarjele u odnosu na najnovije planove o razvoju.</strong> Dok radimo na ažuriranju, pogledajte <a href="https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum">Hitchhikerov vodič za Ethereum</a> u kojemu je sjajno prikazan plan razvoja Ethereuma.
</InfoBanner>

Kada se isporuče prvi lanci djelića, oni će samo pružiti dodatne podatke mreži. Neće se baviti transakcijama ili pametnim ugovorima. Ali i dalje će nuditi nevjerojatna poboljšanja broja transakcija u sekundi u kombinaciji s objedinjavanjem transakcija.

Objedinjavanje transakcija tehnologija je „sloja 2” koja postoji danas. Omogućuju decentraliziranim aplikacijama (dapp) da grupiraju ili skupe transakcije u jednu transakciju izvan lanca, generiraju kriptografski dokaz i zatim ga predaju lancu. To smanjuje podatke potrebne za transakciju. Kombinirajući to s dodatnom dostupnošću podataka koju pružaju djelić dobivate 100 000 transakcija u sekundi.

## Lanci djelića, verzija 2: izvršavanje koda {#code-execution}

Plan je uvijek bio dodati dodatnu funkcionalnost djelićima kako bi ih učinili sličnijima [glavnoj mreži Ethereuma](/glossary/#mainnet) danas. To će im omogućiti pohranu i izvršavanje koda i obradu transakcija jer svaki djelić sadrži jedinstveni skup pametnih ugovora i bilanci računa. Komunikacija između djelića omogućit će transakcije između djelića.

Uzimajući u obzir pojačanje u broju transakcija u sekundi koje pružaju djelići verzije 1, je li nam to potrebno? O tome se još uvijek raspravlja u zajednici i čini se da postoji nekoliko mogućnosti.

### Trebaju li djelići izvršenje koda? {#do-shards-need-code-execution}

Vitalik Buterin, u podcastu Bankless, predstavio je 3 potencijalne opcije o kojima vrijedi razgovarati.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Nije potrebno izvršenje stanja {#state-execution-not-needed}

To bi značilo da djelićima ne pružamo mogućnost upravljanja pametnim ugovorima i ostavljanjamo ih kao skladišta podataka.

#### 2. Pogledajmo nekoliko izvršnih djelića {#some-execution-shards}

Možda postoji kompromis gdje nam ne trebaju svi pametni djelići. Mogli bismo samo dodati tu funkcionalnost nekolicini, a ostale ostaviti. To bi moglo ubrzati isporuku.

#### 3. Pričekajte dok ne uspijemo napraviti SNARK-ove s protokolom Zero Knowledge (ZK) {#wait-for-zk-snarks}

Konačno, možda bismo se trebali vratiti ovoj raspravi kad se ZK SNARK-ovi učvrste. To je tehnologija koja bi mogla donijeti uistinu privatne transakcije na mrežu. Vjerojatno će im trebati pametniji djelići, ali još uvijek su u istraživanju i razvoju.

#### Ostali izvori {#other-sources}

Evo još nekoliko razmišljanja na isti način:

- [ Prva faza i gotovo: Eth2 kao pokretač dostupnosti podataka](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) –_ cdetrio, ethresear.ch _

Ovo je još uvijek aktivna točka rasprave. Ažurirat ćemo ove stranice kad saznamo više.

## Odnos između nadogradnji {#relationship-between-upgrades}

Sve nadogradnje Ethereuma donekle su međusobno povezane. Dakle, ponovimo ukratko kako se lanci djelića odnose na ostale nadogradnje.

### Djelići i lanac blokova Ethereuma {#shards-and-blockchain}

Logika koja održava sve djeliće zaštićenim i sinkroniziranim integrirana je u Ethereumove klijente koji grade lanac blokova. Ulagači u mreži dodjeljuju se djelićima na kojima rade. Djelići će imati pristup snimkama stanja ostalih djelića kako bi mogli izgraditi pregled Ethereumovog stanja i održavati ga ažurnim.

### Pročitaj više {#read-more}

<ShardChainsList />
