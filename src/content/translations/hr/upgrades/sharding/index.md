---
title: Lanci djelića
description: Saznajte više o lancima djelića – particijama mreže koje Ethereumu daju veći kapacitet transakcija i olakšavaju rad.
lang: hr
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: Razdjeljivanje je nadogradnja u više faza za poboljšanje skalabilnosti i kapaciteta Ethereuma.
summaryPoint2: Lanci djelića šire opterećenje mreže na 64 nova lanca.
summaryPoint3: Olakšavaju pokretanje čvora održavajući niske hardverske zahtjeve.
summaryPoint4: Tehnički planovi uključuju rad na lancima djelića u „fazi 1” i potencijalno u „fazi 2”.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Lanci djelića trebali bi se isporučiti u 2023. godini, ovisno o tome koliko će brzo napredovati radovi nakon pokretanja nadogradnje <a href="/upgrades/beacon-chain/"> Beacon Chain </a>. Ti će djelići Ethereumu dati veći kapacitet za pohranu i pristup podacima, ali neće se upotrebljavati za izvršavanje koda. Pojedinosti o tome još se otkrivaju.
</UpgradeStatus>

## Što je razdjeljivanje? {#what-is-sharding}

Razdjeljivanje je postupak horizontalnog razdvajanja baze podataka radi raspodjele opterećenja – to je uobičajena koncepcija u računalnoj znanosti. U kontekstu Ethereuma, razdjeljivanje će smanjiti zagušenje mreže i povećati broj transakcija u sekundi stvaranjem novih lanaca, poznatih kao „djelići”.

To je važno iz razloga koji nisu nadogradivost.

## Značajke razdjeljivanja {#features-of-sharding}

### Svatko može pokrenuti čvor {#everyone-can-run-a-node}

Razdjeljivanje je dobar način za skaliranje ako želite da stvari ne budu centralizirane jer je alternativa skaliranju povećanje veličine postojeće baze podataka. To bi Ethereum učinilo manje dostupnim mrežnim validatorima jer bi im trebala snažna i skupa računala. S lancima djelića, validatori trebaju pohraniti/pokrenuti podatke samo za djelić koji provjeravaju, a ne za cijelu mrežu (kao što se događa danas). To ubrzava stvari i drastično smanjuje hardverske zahtjeve.

### Više mrežnog sudjelovanja {#more-network-participation}

Razdjeljivanje će vam na kraju omogućiti pokretanje Ethereuma na osobnom prijenosnom računalu ili telefonu. Tako bi više ljudi trebalo biti u mogućnosti sudjelovati ili pokretati [klijente](/developers/docs/nodes-and-clients/) u razdijeljenom Ethereumu. To će povećati sigurnost, jer što je više mreža decentralizirana, to je manja površina napada.

S nižim hardverskim zahtjevima, razdjeljivanje će olakšati samostalno pokretanje [klijenata](/developers/docs/nodes-and-clients/), bez oslanjanja na bilo kakve posredničke usluge. A ako možete, razmislite o pokretanju više klijenata. To može pomoći zdravlju mreže daljnjim smanjenjem točaka kvara. [ Pokretanje Eth2 klijenta](/upgrades/get-involved/)

<br />

<InfoBanner isWarning={true}>
  Isprva ćete trebati pokretati klijent glavne mreže istovremeno sa svojim Eth2 klijentom. <a href="https://launchpad.ethereum.org" target="_blank"> Lansirna rampa </a> će vas provesti kroz hardverske zahtjeve i postupak. Možete upotrijebiti i <a href="/developers/docs/apis/backend/#available-libraries"> pozadinski API </a>.
</InfoBanner>

## Lanci djelića, verzija 1: dostupnost podataka {#data-availability}

Kada se isporuče prvi lanci djelića, oni će samo pružiti dodatne podatke mreži. Neće se baviti transakcijama ili pametnim ugovorima. Ali i dalje će nuditi nevjerojatna poboljšanja broja transakcija u sekundi u kombinaciji s rollup tehnologijom.

Rollup je tehnologija „sloja 2” koja postoji danas. Omogućuju aplikacijama dapp da grupiraju ili skupe transakcije u jednu transakciju izvan lanca, generiraju kriptografski dokaz i zatim ga predaju lancu. To smanjuje podatke potrebne za transakciju. Kombinirajući to s dodatnom dostupnošću podataka koju pružaju djelić dobivate 100 000 transakcija u sekundi.

[Više o tehnologiji rollup](/developers/docs/scaling/#rollups)

## Lanci djelića, verzija 2: izvršavanje koda {#code-execution}

Plan je uvijek bio dodati dodatnu funkcionalnost djelićima, kako bi postali sličniji današnjoj [glavnoj mreži Ethereum](/glossary/#mainnet). To bi omogućilo pohranu i izvršavanje pametnih ugovora i upravljanje računima. No, s obzirom na pojačanje u broju transakcija u sekundi koje pružaju djelići verzije 1, je li to potrebno? O tome se još uvijek raspravlja u zajednici i čini se da postoji nekoliko mogućnosti.

### Trebaju li djelići izvršenje koda? {#do-shards-need-code-execution}

Vitalik Buterin, u podcastu Bankless, predstavio je 3 potencijalne opcije o kojima vrijedi razgovarati.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Nije potrebno izvršenje stanja {#state-execution-not-needed}

To bi značilo da djelićima ne pružamo mogućnost upravljanja pametnim ugovorima i ostavljanjamo ih kao skladišta podataka.

#### 2. Pogledajmo nekoliko izvršnih djelića {#some-execution-shards}

Možda postoji kompromis gdje nam ne trebaju svi djelići (sada ih je planirano 64) da bismo bili pametniji. Mogli bismo samo dodati tu funkcionalnost nekolicini, a ostale ostaviti. To bi moglo ubrzati isporuku.

#### 3. Pričekajte dok ne uspijemo napraviti SNARK-ove s protokolom Zero Knowledge (ZK) {#wait-for-zk-snarks}

Konačno, možda bismo se trebali vratiti ovoj raspravi kad se ZK SNARK-ovi učvrste. To je tehnologija koja bi mogla donijeti uistinu privatne transakcije na mrežu. Vjerojatno će im trebati pametniji djelići, ali još uvijek su u istraživanju i razvoju.

#### Ostali izvori {#other-sources}

Evo još nekoliko razmišljanja na isti način:

- [ Prva faza i gotovo: Eth2 kao pokretač dostupnosti podataka](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) –_ cdetrio, ethresear.ch _

Ovo je još uvijek aktivna točka rasprave. Ažurirat ćemo ove stranice kad saznamo više.

## Odnos između nadogradnji {#relationship-between-upgrades}

Sve su nadogradnje Eth2 donekle međusobno povezane. Dakle, ponovimo ukratko kako se lanci djelića odnose na ostale nadogradnje.

### Djelići i Beacon Chain {#shards-and-beacon-chain}

Beacon Chain sadrži svu logiku za održavanje djelića na sigurnom i sinkroniziranim. Beacon Chain koordinirat će učesnike u mreži, dodjeljujući ih djelićima na kojima trebaju raditi. Također će olakšati komunikaciju između djelića primanjem i pohranom podataka o transakcijama djelića kojima mogu pristupiti drugi djelići. To će djelićima dati snimak stanja Ethereuma kako bi sve bilo ažurno.

<ButtonLink to="/upgrades/beacon-chain/">Beacon Chain</ButtonLink>

### Djelići i spajanje {#shards-and-docking}

Glavna mreža Ethereum postojat će kao i danas čak i nakon uvođenja djelića. Međutim, u jednom će trenutku glavna mreža morati postati djelić kako bi mogla prijeći na ulaganje. Vidjet ćemo hoće li glavna mreža postojati kao jedini „pametni” djelić koji se može nositi s izvršavanjem koda – u svakom slučaju, morat će se donijeti odluka u drugoj fazi razdjeljivanja.

<ButtonLink to="/upgrades/merge/">Spajanje</ButtonLink>

<Divider />

### Pročitaj više {#read-more}

<ShardChainsList />
