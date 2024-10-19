---
title: Správa Etherea
description: Úvod do toho, ako sa robia rozhodnutia o Ethereu.
lang: sk
---

# Úvod do správy Etherea {#introduction}

_Ak nikto nevlastní Ethereum, ako sa rozhodovalo o minulých a ako o budúcich zmenách Etherea? Správa Etherea odkazuje na proces, ktorý umožňuje robiť takéto rozhodnutia._

<Divider />

## Čo je to správa? {#what-is-governance}

Správa je systém, ktorý umožňuje prijímať rozhodnutia. V typickej organizačnej štruktúre môže mať pri rozhodovaní posledné slovo výkonný tím alebo správna rada. Alebo možno akcionári hlasujú o návrhoch na prijatie zmeny. V politickom systéme môžu volení úradníci prijímať legislatívu, ktorá sa snaží reprezentovať túžby ich voličov.

## Decentralizovaná správa {#decentralized-governance}

Nikto nevlastní ani nekontroluje protokol Ethereum, ale stále je potrebné rozhodnúť o implementácii zmien, aby sa čo najlepšie zabezpečila životnosť a prosperita siete. Tento nedostatok vlastníctva robí z tradičnej organizačnej správy nekompatibilné riešenie.

## Správa Etherea {#ethereum-governance}

Správa Ethera je proces, ktorým sa vykonávajú zmeny protokolu. Je dôležité zdôrazniť, že tento proces nesúvisí s tým, ako ľudia a aplikácie používajú protokol – Ethereum funguje bez oprávnení. Do aktivít na blockchaine sa môže zapojiť ktokoľvek odkiaľkoľvek na svete. Nie sú stanovené žiadne pravidlá kto môže alebo nemôže zostaviť aplikáciu, alebo odoslať transakciu. Existuje však proces navrhovania zmien základného protokolu, na ktorom bežia decentralizované aplikácie. Keďže toľko ľudí závisí od stability Etherea, existuje veľmi vysoký koordinačný prah pre kľúčové zmeny, vrátane sociálnych a technických procesov, aby sa zabezpečilo, že akékoľvek zmeny v Ethereu budú bezpečné a podporované komunitou.

### Správa na blockchaine vs mimo blockchainu {#on-chain-vs-off-chain}

Technológia blockchain umožňuje nové možnosti správy, známe ako on-chain. On-chain správa je, keď o navrhovaných zmenách protokolu rozhoduje hlasovanie zainteresovaných strán, zvyčajne držitelia tokenu správy, a hlasuje sa na blockchaine. Pri niektorých formách on-chain správy sú navrhované zmeny protokolu už zapísané v kóde a implementované automaticky, ak zainteresované strany schvália zmeny podpísaním transakcie.

Opačný prístup, off-chain správa, spočíva v tom, že všetky rozhodnutia o zmene protokolu sa dejú prostredníctvom neformálneho procesu spoločenskej diskusie, ktorá by sa v prípade schválenia implementovala do kódu.

**Správa Etherea prebieha off-chain** so širokou škálou zainteresovaných strán zapojených do procesu.

_Zatiaľ čo na úrovni protokolu je správa Etherea off-chain, mnohé prípady použitia Etherea ako napríklad DAO, využívajú správu on-chain._

<ButtonLink href="/dao/">
  Viac o DAO
</ButtonLink>

<Divider />

## Kto je zapojený? {#who-is-involved}

V [komunite Ethereum](/community/) sú rôzne zainteresované strany, z ktorých každá zohráva úlohu v procese správy. Od zainteresovaných strán, ktoré sú najďalej od protokolu, máme:

- **Držitelia Etheru**: títo ľudia vlastnia ľubovoľné množstvo ETH. [Viac o ETH](/eth/).
- **Používatelia aplikácií**: títo ľudia interagujú s aplikáciami na Ethereum blockchaine.
- **Vývojári aplikácií/nástrojov**: títo ľudia píšu aplikácie, ktoré bežia na blockchaine Ethereum (napr. DeFi, NFT atď.) alebo vytvárajú nástroje na interakciu s Ethereom (napr. peňaženky, testovacie súpravy atď.). [Viac informácií o dapps](/dapps/).
- **Operátori uzlov**: títo ľudia prevádzkujú uzly, ktoré šíria bloky a transakcie a odmietajú akúkoľvek neplatnú transakciu alebo blok, s ktorým sa stretnú. [Viac informácií o uzloch](/developers/docs/nodes-and-clients/).
- **Autori EIP**: títo ľudia navrhujú zmeny protokolu Ethereum vo forme návrhov na zlepšenie Etherea (EIP). [Viac o EIP](/eips/).
- **Validátori**: títo ľudia prevádzkujú uzly, ktoré môžu pridávať nové bloky do Ethereum blockchainu.
- **Vývojári protokolu** tzv. „Core Developeri“): títo ľudia udržiavajú rôzne implementácie Etherea (napr. go-ethereum, Nethermind, Besu, Erigon, Reth na realizačnej vrstve alebo Prysm, Lighthouse, Nimbus, Teku, Lodestar na konsenzuálnej vrstve). [Viac o Ethereum klientoch](/developers/docs/nodes-and-clients/).

_Poznámka: Každý jednotlivec môže byť súčasťou viacerých z týchto skupín (napr. vývojár protokolu by mohol navrhovať EIP a spustiť validátor beaconon chainu a používať DeFi aplikácie). Avšak pre zrozumiteľnosť konceptu je však najjednoduchšie medzi nimi rozlišovať._

<Divider />

## Čo sú EIP? {#what-is-an-eip}

Jedným z dôležitých procesov používaných pri riadení Etherea sú **návrhy na zlepšenie Etherea (EIP)**. EIP návrhy sú štandardy špecifikujúce potenciálne nové funkcie alebo procesy pre Ethereum. Ktokoľvek v komunite Ethereum môže vytvoriť EIP. Ak máte záujem napísať EIP alebo sa zúčastniť na partnerskom hodnotení a/alebo riadení, pozrite si:

<ButtonLink href="/eips/">
  Viac o EIP
</ButtonLink>

<Divider />

## Formálny proces {#formal-process}

Formálny proces zavádzania zmien do protokolu Ethereum je nasledovný:

1. **Navrhnite základný EIP**: ako je opísané v [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), prvým krokom k formálnemu navrhnutiu zmeny Etherea je podrobný popis základného EIP. Bude fungovať ako oficiálna špecifikácia pre návrh EIP, ktorú vývojári protokolu implementujú, ak bude prijatý.

2. **Predstavte svoj návrh EIP vývojárom protokolu**: keď už máte základné EIP, pre ktoré ste zhromaždili informácie od komunity, mali by ste ho predložiť vývojárom protokolu. Môžete to urobiť tak, že ho navrhnete na diskusiu v rámci [hovoru AllCoreDevs](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Je pravdepodobné, že niektoré diskusie už prebehli asynchrónne na [fóre Ethereum Magician](https://ethereum-magicians.org/) alebo v [Ethereum R&D na Discorde](https://discord.gg/mncqtgVSVw).

> Potenciálne výsledky tejto fázy sú:

> - EIP sa bude zvažovať pre budúcu aktualizáciu siete,
> - budú požadované technické zmeny,
> - môže byť zamietnutý, ak nie je prioritou alebo ak zlepšenie nie je dostatočne veľké vzhľadom na vývojové úsilie.

3. **Postupujte ku konečnému návrhu:** po získaní spätnej väzby od všetkých relevantných zainteresovaných strán budete pravdepodobne musieť vykonať zmeny vo svojom pôvodnom návrhu, aby ste zlepšili jeho bezpečnosť alebo lepšie vyhovovali potrebám rôznych používateľov. Keď váš EIP začlení všetky zmeny, ktoré považujete za potrebné, budete ho musieť znova predložiť vývojárom protokolu. Potom prejdete na ďalší krok tohto procesu, inak sa objavia nové obavy, ktoré si vyžadujú ďalšie kolo iterácií vášho návrhu.

4. **EIP zahrnuté v aktualizácii siete**: za predpokladu, že EIP je schválené, testované a implementované, je naplánované ako súčasť inovácie siete. Vzhľadom na vysoké náklady na koordináciu aktualizácií siete (každý musí inovovať súčasne), EIP sú vo všeobecnosti spojené do aktualizácií.

5. **Aktualizácia siete aktivovaná**: po aktivácii aktualizácie siete bude EIP aktívne v sieti Ethereum. _Poznámka: aktualizácie siete sa zvyčajne aktivujú na testovacích sieťach pred aktiváciou v sieti Ethereum Mainnet._

Tento postup, aj keď je veľmi zjednodušený, poskytuje prehľad dôležitých štádií zmeny protokolu, ktorá sa má aktivovať na Ethereu. Teraz sa pozrime na neformálne faktory, ktoré hrajú rolu počas tohto procesu.

## Neformálny proces {#informal-process}

### Pochopenie predchádzajúcej práce {#prior-work}

Šampióni EIP by sa mali oboznámiť s predchádzajúcou prácou a návrhmi pred vytvorením EIP, o ktorého nasadení možno vážne uvažovať v sieti Ethereum Mainnet. Týmto spôsobom dúfame, že EIP prinesie niečo nové, čo ešte nebolo odmietnuté. Tri hlavné miesta, kde sa môžete zoznámiť s prácou ostatných navrhovateľov, sú [úložisko EIP](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) a [ethresear.ch](https://ethresear.ch/).

### Pracovné skupiny {#working-groups}

Je nepravdepodobné, že by sa počiatočný návrh EIP implementoval do siete Ethereum Mainnet bez úprav alebo zmien. Vo všeobecnosti budú EIP šampióni spolupracovať s podskupinou vývojárov protokolu na špecifikovaní, implementácii, testovaní, opakovaní a finalizácii ich návrhu. Historicky si tieto pracovné skupiny vyžadovali niekoľko mesiacov (a niekedy aj rokov!) práce. Podobne by EIP šampióni pre takéto zmeny mali zapojiť príslušných vývojárov aplikácií/nástrojov na začiatku ich úsilia získať spätnú väzbu od koncových používateľov a zmierniť akékoľvek riziká nasadenia.

### Komunitný konsenzus {#community-consensus}

Zatiaľ čo niektoré EIP sú jednoduché technické vylepšenia s minimálnymi nuansami, niektoré sú zložitejšie a prichádzajú s kompromismi, ktoré ovplyvnia rôzne zainteresované strany rôznymi spôsobmi. To znamená, že niektoré EIP sú v rámci komunity spornejšie ako iné.

Neexistuje jasný návod, ako riešiť sporné návrhy. Je to výsledok decentralizovaného dizajnu Etherea, v rámci ktorého žiadna skupina zainteresovaných strán nemôže prinútiť druhú hrubou silou: vývojári protokolu sa môžu rozhodnúť neimplementovať zmeny kódu, prevádzkovatelia uzlov sa môžu rozhodnúť nespúšťať najnovšieho klienta Etherea, aplikačné tímy a používatelia sa môžu rozhodnúť, že nebudú vykonávať transakcie v reťazci. Keďže vývojári protokolu nemajú žiadny spôsob, ako prinútiť ľudí, aby prijali aktualizácie siete, vo všeobecnosti sa vyhýbajú implementácii EIP, kde spornosť prevažuje nad výhodami pre širšiu komunitu.

Od šampiónov EIP sa očakáva, že si vyžiadajú spätnú väzbu od všetkých príslušných zainteresovaných strán. Ak zistíte, že ste šampiónom sporného EIP, mali by ste sa pokúsiť riešiť námietky, aby ste dosiahli konsenzus vášho návrhu EIP. Vzhľadom na veľkosť a rozmanitosť Ethereum komunity neexistuje jediná metrika (napríklad hlasovanie s mincou), ktorá by sa dala použiť na meranie konsenzu komunity, a od šampiónov EIP sa očakáva, že sa prispôsobia okolnostiam svojho návrhu.

Okrem bezpečnosti siete Ethereum vývojári protokolu historicky pripisovali významnú váhu tomu, čo si vývojári aplikácií/nástrojov a používatelia aplikácií cenia, keďže ich používanie a vývoj na Ethereu je to, čo robí ekosystém atraktívnym pre ostatné zainteresované strany. Okrem toho je potrebné implementovať EIP vo všetkých klientskych implementáciách, ktoré sú riadené rôznymi tímami. Súčasťou tohto procesu je zvyčajne presvedčenie viacerých tímov vývojárov protokolu, že konkrétna zmena je cenná a že pomáha koncovým používateľom alebo rieši bezpečnostný problém.

<Divider />

## Riešenie nezhôd {#disagreements}

Mať veľa zainteresovaných strán s rôznymi motiváciami a presvedčeniami znamená, že nezhody nie sú nezvyčajné.

Vo všeobecnosti sa nezhody riešia dlhou diskusiou na verejných fórach, aby sme pochopili koreň problému a umožnili komukoľvek prehodnotiť svoj názor. Typicky jedna skupina ustúpi, alebo sa dosiahne kompromis. Ak sa jedna skupina cíti dostatočne silno, presadenie konkrétnej zmeny by mohlo viesť k rozdeleniu blockchainu. Rozdelenie blockchainu nastane, keď niektoré zainteresované strany protestujú proti implementácii zmeny protokolu, ktorá vedie k rôznym, nekompatibilným verziám fungovania protokolu, z ktorých vznikajú dva odlišné blockchainy.

### DAO fork {#dao-fork}

Rozdelenia nastanú vtedy, keď je potrebné vykonať veľké technické vylepšenia alebo zmeny v sieti a zmeniť „pravidlá“ protokolu. [Klienti Etherea](/developers/docs/nodes-and-clients/) musia aktualizovať svoj softvér, aby implementovali nové pravidlá pre rozdelenie.

DAO fork bol reakciou na [útok na DAO v roku 2016](https://www.coindesk.com/understanding-dao-hack-journalists), pri ktorom sa z nezabezpečeného [DAO](/glossary/#dao) kontraktu pri hackovaní vyčerpalo viac ako 3,6 milióna ETH. Fork presunul prostriedky z nezabezpečeného kontraktu do novej zmluvy, ktorá umožnila komukoľvek, kto stratil prostriedky pri hackovaní, získať ich späť.

O tomto postupe hlasovala komunita Etherea. Any ETH holder was able to vote via a transaction on [a voting platform](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Rozhodnutie o forku (rozdelení) dosiahlo viac ako 85 % hlasov.

Je dôležité poznamenať, že hoci sa protokol rozdelil, aby sa hack vrátil, váha, ktorú mal hlas pri rozhodovaní o rozdelení, je diskutabilná z niekoľkých dôvodov:

- Volebná účasť bola neuveriteľne nízka
- Väčšina ľudí nevedela, že sa hlasuje
- Hlas zastupoval iba držiteľov ETH, nie žiadneho z ostatných účastníkov systému

Podskupina komunity odmietla forkovať hlavne preto, že mala pocit, že DAO incident nebol chybou v protokole. Pokračovali vo vytvorení [Etherea Classic](https://ethereumclassic.org/).

Dnes komunita Etherea prijala politiku nezasahovania v prípadoch chýb kontraktu alebo straty finančných prostriedkov, aby sa zachovala dôveryhodná neutralita systému.

Pozrite si viac o DAO hacku:

<YouTube id="rNeLuBOVe8A" />

<Divider />

### Užitočnosť forku {#forking-utility}

Fork Ethereum/Ethereum Classic je vynikajúcim príkladom zdravého forku. Mali sme dve skupiny, ktoré medzi sebou dostatočne silne nesúhlasili v niektorých základných hodnotách a mali pocit, že stojí za to riskovať, aby pokračovali v ich špecifických postupoch.

Schopnosť forkovať v prípade výrazných politických, filozofických alebo ekonomických rozdielov zohráva veľkú úlohu v úspechu správy Etherea. Bez možnosti forkovania boli alternatívou pokračujúce vnútorné boje, vynútená neochotná účasť tých, ktorí nakoniec vytvorili Ethereum Classic, a čoraz odlišnejšie predstavy o tom, ako vyzerá úspech Etherea.

<Divider />

## Správa Beacon Chainu {#beacon-chain}

Proces správy Etherea často vymieňa rýchlosť a efektivitu za otvorenosť a inkluzívnosť. Aby sa urýchlil vývoj Beacon Chainu, bol spustený oddelene od Ethereum proof-of-work siete a dodržiaval svoje vlastné postupy správy.

Zatiaľ čo implementácie špecifikácií a vývoja boli vždy plne open source, formálne procesy používané na navrhovanie aktualizácií opísané vyššie sa nepoužívali. To umožnilo výskumníkom a realizátorom rýchlejšie špecifikovať a odsúhlasiť zmeny.

Keď sa 15. septembra 2022 Beacon Chain zlúčil s realizačnou vrstvou Ethereum, bolo zlúčenie dokončené ako súčasť [zlepšenia siete v Paríži](/history/#paris). Návrh [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) sa zmenil z „Posledná výzva“ na „Konečný“, čím sa dokončil prechod na proof-of-stake.

<ButtonLink href="/roadmap/merge/">
  Viac o zlúčení
</ButtonLink>

<Divider />

## Ako sa zapojiť? {#get-involved}

- [Navrhnite EIP](/eips/#participate)
- [Diskutujte o aktuálnych návrhoch](https://ethereum-magicians.org/)
- [Zapojte sa do R&D diskusie](https://ethresear.ch/)
- [Zapojte sa do R&D Discordu Etherea](https://discord.gg/mncqtgVSVw)
- [Spustiť uzol](/developers/docs/nodes-and-clients/run-a-node/)
- [Prispejte k rozvoju klienta](/developers/docs/nodes-and-clients/#execution-clients)
- [Program základov pre vývojára](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort/)

## Ďalšie zdroje informácií {#further-reading}

Správa v Ethereu nie je pevne definované. Rôzni účastníci komunity majú na to rôzne pohľady. Tu je niekoľko z nich:

- [Poznámky k správe blockchainu](https://vitalik.eth.limo/general/2017/12/17/voting.html) – _Vitalik Buterin_
- [Ako funguje správa Etherea?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Ako funguje správa Etherea?](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [Kto je základný vývojar Ethera?](https://hudsonjameson.com/2020-06-22-what-is-an-ethereum-core-developer/) – _Hudson Jameson_
- [Správa, časť druhá: plutokracia je stále zlá](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) – _Vitalik Buterin_
- [Mimo správy hlasovania mincami](https://vitalik.eth.limo/general/2021/08/16/voting3.html) – _Vitalik Buterin_
