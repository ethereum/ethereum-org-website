---
title: Technológia distribuovaných validátorov
description: Technológia distribuovaných validátorov umožňuje distribuovanú prevádzku ethereového validátora viacerými stranami.
lang: sk
---

# Technológia distribuovaných validátorov {#distributed-validator-technology}

Technológia distribuovaných validátorov (DVT) je prístup k zabezpečeniu validátora, ktorý rozdeľuje zodpovednosť za prístupové heslá a podpisovanie medzi viac strán, a to za účelom zníženia pravdepodobnosti zlyhania a zvýšenia odolnosti validátora.

Princípom je **rozdelenie privátneho kľúča** používaného na zabezpečenie validátora **medzi viacero počítačov** organizovaných do klastra. Výhodou tohto rozdelenia je, že útočníci musia vynaložiť oveľa viac energie, aby sa dostali k privátnemu kľúču, pretože na žiadnom počítači nie je uložený celý. Taktiež umožňuje vypnutie niektorých uzlov, pretože potrebné podpisy môžu byť generované podmnožinou počítačov v každom klastri. To znižuje pravdepodobnosť zlyhania a zvyšuje odolnosť celého súboru validátorov.

![Diagram znázorňujúci, ako je kľúč validátora rozdelený na časti a distribuovaný medzi viacerými uzlami s rôznymi komponentmi.](./dvt-cluster.png)

## Na čo sú DVT potrebné? {#why-do-we-need-dvt}

### Zabezpečenie {#security}

Validátory generujú dva páry privátnych a verejných kľúčov: kľúče pre účasť v konsenze a kľúče pre výber finančných prostriedkov. Zatiaľ čo kľúče na výber je možné uchovávať v bezpečí hardvérovej peňaženky, privátne kľúče validátorov musia byť neustále online. Ak je privátny kľúč odhalený, útočník môže tohto validátora ovládnuť a potenciálne dôjde k trestu alebo strate vloženého ETH. DVT môže validátorom pomôcť toto riziko znížiť. Takto to funguje:

Vkladatelia sa môžu podieľať na vkladaní a zároveň uchovávať privátny kľúč svojho validátora v hardvérovej peňaženke, pokiaľ používajú DVT. Pôvodný privátny kľúč je totiž zašifrovaný a potom rozdelený na niekoľko častí. Tieto časti sú online zdieľané medzi viacerými uzlami, čo umožňuje distribuovanú prevádzku validátora. To je možné vďaka tomu, že validátory Etherea používajú BLS podpisy, ktoré sú aditívne, čo znamená, že úplný kľúč je možné obnoviť súčtom jeho zložiek. To umožňuje stakerovi uchovávať plný pôvodný „master“ kľúč validátora v bezpečí offline.

### Žiadne slabé miesta {#no-single-point-of-failure}

Keď je validátor rozdelený medzi viacerých prevádzkovateľov a viac strojov, dokáže odolať individuálnym hardvérovým a softvérovým poruchám bez toho, aby bol odpojený. Riziko zlyhania je možné tiež znížiť tým, že sa použijú rôzne konfigurácie hardvéru a softvéru na sieťových uzloch v klastri. Táto odolnosť je nedostupná na konfiguráciu validátorov s jedným sieťovým uzlom – pochádza priamo z vrstvy DVT.

Ak niektorý z komponentov počítača v klastri zlyhá (napríklad ak sú v klastri validátorov štyria prevádzkovatelia a jeden používa špecifického klienta, ktorý má chybu), ostatní prevádzkovatelia zabezpečia, že validátor bude naďalej fungovať.

### Decentralizácia {#decentralization}

Ideálnym scenárom pre Ethereum je existencia čo najviac nezávisle prevádzkovaných validátorov. Avšak niekoľko poskytovateľov stakovania je v súčasnej dobe veľmi populárnych a spravuje značnú časť celkovo stakovaných ETH. DVT umožňuje prevádzku týchto validátorov bez toho, aby utrpela decentralizácia stakovaného kapitálu. A to vďaka tomu, že kľúče každého validátora sú distribuované medzi viacero počítačov a bolo by potrebné, aby sa na prípadnej podvodnej aktivite validátora zhodlo oveľa väčšie množstvo držiteľov týchto častí kľúča.

Bez DVT je jednoduchšie, aby poskytovatelia stakovania používali iba jednu alebo dve konfigurácie klienta pre všetkých svojich validátorov, čo zvyšuje vplyv prípadnej chyby v klientovi. DVT je možné použiť na rozloženie rizika medzi rôzne konfigurácie klienta a rôzny hardvér a vďaka tejto rozmanitosti sa zvyšuje odolnosť.

**DVT poskytuje Ethereu tieto výhody:**

1. **decentralizuje** proof-of-stake konsenzus Etherea,
2. zabezpečuje **životaschopnosť** siete,
3. vytvára toleranciu **validátorov k chybám**,
4. **znižuje dôveru** operácií validátora,
5. **minimalizuje tresty** a riziká výpadku,
6. **vylepšuje rozmanitosť** (klient, dátové centrum, lokácie, regulácie, atď.),
7. **zvyšuje bezpečnosť** kľúčov validátorov.

## Ako funguje DVT? {#how-does-dvt-work}

DVT obsahuje tieto komponenty:

- **[Shamirov systém tajného zdieľania](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** – validátory používajú [BLS kľúče](https://en.wikipedia.org/wiki/BLS_digital_signature). Jednotlivé BLS „časti kľúča“ („key shares“) možno zlúčiť do jediného agregovaného kľúča (podpisu). V DVT je privátny kľúč validátora kombinovaným BLS podpisom každého operátora v klastri.
- **[Schéma minimálneho podpisu](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** – určuje, koľko častí kľúča je potrebných na podpis, napríklad 3 zo 4.
- **[Distribuované generovanie kľúčov (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** – kryptografický proces, ktorý generuje jednotlivé časti kľúča a slúži na distribúciu podielov existujúceho alebo nového kľúča validátora uzlom v klastri.
- **[Viacstranný výpočet (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** – kompletný kľúč validátora je generovaný tajne pomocou viacstranného výpočtu. Celý kľúč nie je známy žiadnemu operátorovi – každý pozná iba svoju časť (svoj „podiel“).
- **Konsenzuálny protokol** – konsenzuálny protokol vyberie jeden uzol, ktorý sa stane navrhovateľom bloku. Tento sieťový uzol zdieľa blok s ostatnými uzlami v klastri, ktoré pridávajú svoje časti kľúča k agregovanému podpisu. Akonáhle je agregovaný dostatočný počet častí kľúča, blok je navrhnutý na Ethereum.

Distribuované validátory majú naprogramovanú toleranciu k chybám a môžu pokračovať v prevádzke aj v prípade, že sa niektoré individuálne uzly odpoja. To znamená, že klaster je odolný aj v prípade, že sú niektoré uzly v ňom napadnuté alebo nefunkčné.

## Príklady použitia DVT {#dvt-use-cases}

DVT má významné dôsledky pre širší ekosystém stakovania:

### Sólo stakovanie {#solo-stakers}

DVT umožňuje aj stakovanie bez prostredníka a to tak, že rozloží kľúč validátora medzi vzdialené uzly, pričom celý kľúč zostane úplne offline. To znamená, že domáci stakeri nemusia nutne vynakladať finančné prostriedky na hardvér, zatiaľ čo distribúcia častí kľúča im môže pomôcť zvýšiť odolnosť proti potenciálnym hekerským útokom.

### Staking as a service (SaaS) {#saas}

Operátori (ako sú stakovacie pooly a inštitucionálni stakeri), ktorí spravujú viac validátorov, môžu pomocou DVT znížiť svoje riziká. Distribuovaním infraštruktúry môžu pridať do svojich operácii redundanciu a diverzifikovať druhy hardvéru, ktoré pri stakovaní používajú.

DVT zdieľa zodpovednosť za správu kľúčov medzi viacerými uzlami, čo znamená, že aj niektoré prevádzkové náklady môžu byť zdieľané. DVT môže tiež znížiť operačné riziko a náklady na poistenie pre poskytovateľov stakovania.

### Staking pools {#staking-pools}

Vďaka štandardným nastaveniam validátorov sú stakovacie pooly a poskytovatelia likvidného stakovania nútení mať rôzne úrovne dôvery jednotlivým operátorom, pretože zisky a straty sú zdieľané v rámci poolu. Musia sa tiež spoliehať na operátorov, ktorým zverujú zabezpečenie podpisového kľúča, pretože doteraz pre nich neexistovala iná možnosť.

Aj keď sa tradične snažili o rozloženie rizika tým, že sa stakovanie rozdelilo medzi viacerých operátorov, každý operátor aj tak samostatne spravoval významné stakované sumy. Pokiaľ by operátor nebol schopný vykonávať dané úkony, mal výpadok, bol napadnutý alebo sa dopustil podvodného konania, predstavuje spoliehanie sa na jediného prevádzkovateľa obrovské riziko.

Pokiaľ ale pool využíva DVT, je miera potrebnej dôvery v operátorov významne znížená. **Pooly môžu operátorom umožniť držať zábezpeky bez toho, aby potrebovali spravovať kľúč validátora** (sú využívané iba časti kľúča). DVT ďalej umožňuje rozdeliť spravované stakované sumy medzi viacerých operátorov (napríklad namiesto toho, aby jeden operátor spravoval 1 000 validátorov, DVT umožňuje, aby boli tieto validátory prevádzkované kolektívne viacerými operátormi). Rôzne konfigurácie operátorov zaistia, že ak jeden operátor zlyhá, ostatní budú stále schopní fungovať. To vedie k redundancii a diverzifikácii systému, čo vedie k zlepšeniu výkonu a odolnosti a zároveň maximalizácii odmien poolu.

Ďalšou výhodou minimalizácie dôvery voči jednotlivým operátorom je to, že stakovacie pooly môžu umožniť otvorenejšiu účasť bez nutnosti schvaľovania operátorov. Týmto spôsobom môžu znížiť svoje riziká a podporiť decentralizáciu Etherea tým, že budú zapájať ako supervizovaných operátorov, tak operátorov bez nutnosti schvaľovania, napríklad tým, že budú spájať domácich alebo menších stakerov s tými väčšími.

## Potenciálne nevýhody DVT {#potential-drawbacks-of-using-dvt}

- **Dodatočný komponent** – ​​zavedenie DVT uzla pridáva do systému ďalšiu časť, ktorá môže byť potenciálne poruchová alebo zraniteľná. Eliminovať tento problém je možné pomocou implementácie ďalších DVT uzlov, čo znamená viac DVT klientov (rovnako ako existuje viac klientov pre konsenzuálne a realizačné vrstvy).
- **Prevádzkové náklady** – pretože DVT distribuuje validátor medzi viacerých účastníkov, je na prevádzku potrebných viac uzlov namiesto jedného, ​​čo zvyšuje prevádzkové náklady.
- **Potenciálne zvýšená odozva** – pretože DVT využíva konsenzuálny protokol na dosiahnutie konsenzu medzi viacerými uzlami, ktoré prevádzkujú validátor, môže potenciálne spôsobiť zvýšenú odozvu.

## Further Reading {#further-reading}

- [Špecifikácia distribuovaných validátorov Etherea (pre pokročilých)](https://github.com/ethereum/distributed-validator-specs)
- [Technická špecifikácia distribuovaných validátorov Etherea](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Demo aplikácie pre Shamirov systém tajného zdieľania](https://iancoleman.io/shamir/)
