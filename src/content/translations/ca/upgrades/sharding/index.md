---
title: Cadenes de fragments
description: "Obteniu informació sobre les cadenes de fragments: particions de la xarxa que proporcionen a Ethereum més capacitat de transacció i en faciliten l'execució."
lang: ca
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: La fragmentació és una actualització multifase que millora la capacitat i l'escalabilitat d'Ethereum.
summaryPoint2: Les cadenes de fragments aporten capes d'emmagatzematge extra perquè les aplicacions i els acumuladors guardin les dades.
summaryPoint3: Fan que les solucions de capa 2 puguin oferir comissions baixes de transacció tot aprofitant la seguretat d'Ethereum.
summaryPoint4: Aquesta actualització s'ha pensat per continuar la fusió entre la xarxa principal i la cadena de balisa.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Les cadenes de fragments haurien de sortir en algun moment del 2023, depenent de la velocitat amb què progressin les tasques després del llançament de <a href="/upgrades/merge/">La Fusió</a>. Aquests fragments dotaran Ethereum de més capacitat d'emmagatzematge i d'accés a dades, però no s'utilitzaran per executar codi.
</UpgradeStatus>

## Què és la fragmentació? {#what-is-sharding}

La fragmentació és el procediment de separar una base de dades horitzontalment per distribuir la càrrega; és un concepte comú en informàtica. En un context Ethereum, la fragmentació reduirà la congestió de la xarxa i incrementarà les transaccions per segon mitjançant la creació de noves cadenes, conegudes com a "fragments".

Això és important per altres raons a part de l'escalabilitat.

## Característiques de la fragmentació {#features-of-sharding}

### Qualsevol persona pot executar un node {#everyone-can-run-a-node}

La fragmentació es una bona manera de dimensionar si es volen mantenir les coses descentralitzades, ja que l'alternativa és dimensionar mitjançant l'augment de la mida de la base de dades existent. Això faria que Ethereum fos menys accessible per als validadors de xarxa, perquè necessitarien ordinadors potents i cars. Amb les cadenes de fragments, els validadors només necessiten emmagatzemar/executar dades per als fragments que estan validant, no per a la xarxa sencera (tal com passa avui en dia). Això accelera molt les coses i redueix dràsticament els requeriments de hardware.

### Més participació a la xarxa {#more-network-participation}

La fragmentació us permetrà finalment executar Ethereum des de qualsevol mòbil o ordinador portàtil. Per tant, més persones haurien de poder participar o executar [clients](/developers/docs/nodes-and-clients/) en una Ethereum fragmentada. Això incrementaria la seguretat perquè quant més descentralitzada fos la xarxa, menor seria la superfície d'atac.

Amb menys requeriments de hardware, la fragmentació farà més fàcil executar [clients](/developers/docs/nodes-and-clients/) pel vostre compte, sense dependre de cap servei intermediari. I si podeu, considereu executar diversos clients. Això pot ajudar a la salut de la xarxa mitjançant la reducció de punts d'error. [Executa un client de Cadena de Balisa](/upgrades/get-involved/)

<br />

<InfoBanner isWarning={true}>
  En primer lloc, hauràs d'executar un client de xarxa Principal a la vegada que el teu client de Cadena de Balisa. <a href="https://launchpad.ethereum.org" target="_blank">La plataforma de llançament</a> us guiarà a través del procés i els requeriments de hardware. Alternativament, pots utilitzar una <a href="/developers/docs/apis/backend/#available-libraries">API de backend</a>.
</InfoBanner>

## Cadenes de fragments versió 1: disponibilitat de dades {#data-availability}

Quan s'envien les primeres cadenes de fragments, només facilitaran dades addicionals a la xarxa. No gestionaran transaccions ni contractes intel·ligents. Però oferiran increïbles millores a les transaccions per segon quan es combinin amb els acumulacions.

Les acumulacions són una tecnologia de "capa 2" que existeix avui en dia. Permeten a les aplicacions descentralitzades o dapps agrupar o "acumular" transaccions dins d'una única transacció fora de la cadena, generar una prova criptogràfica i llavors enviar-la a la cadena. Això redueix les dades necessàries per a una transacció. Si combinem això amb tota la disponibilitat extra de dades aportades pels fragments obtenim 100.000 transaccions per segon.

<InfoBanner isWarning={false}>
  Tenint en compte els recents avanços en la investigació i desenvolupament de solucions d'escala en la capa 2, ha provocat la priorització de l'actualització de la fusió per davant de les cadenes de fragments. Aquests seran el focus després de la transició de la xarxa principal a la prova de participació.

[Més informació sobre els acumuladors](/desenvolupadors/documentss/escalat/#acumuladors)
</InfoBanner>

## Cadenes de fragments versió 2: execució de codi {#code-execution}

L'objectiu sempre ha estat afegir funcionalitats extra als fragments, perquè s'assemblin més a la [xarxa principal d'Ethereum](/glossary/#mainnet) actual. Això els permetria emmagatzemar i executar codi i gestionar transaccions, ja que cada fragment contindria el seu únic conjunt de contractes intel·ligents i de balanços de comptes. La comunicació de fragments creuats permetria les transaccions entre fragments.

Encara que tenint en compte les transaccions per segon impulsades que els fragments de la versió 1 aporten, encara és necessari que això succeeixi? Encara s'està debatent en la comunitat i sembla que hi ha unes quantes opcions.

### Necessiten els fragments execució de codi? {#do-shards-need-code-execution}

Vitalik Buterin, al podcast de Bankless, va presentar 3 opcions potencials que mereixen ésser tractades.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. No necessitar una execució d'estat {#state-execution-not-needed}

Això significaria no donar als fragments la capacitat de gestionar contractes intel·ligents i deixar-los com a magatzems de dades.

#### 2. Tenir alguns fragments d'execució {#some-execution-shards}

Potser existeix un compromís on no necessitem que tots els fragments (ara mateix n'hi ha 64 de planificats) siguin més intel·ligents. Podríem afegir aquesta funcionalitat a uns quants i deixar la resta. Això podria accelerar l'entrega.

#### 3. Esperar fins que puguem fer snarks de Zero Knowledge (ZK) {#wait-for-zk-snarks}

En darrer lloc, potser hauríem de tornar a plantejar aquest debat quan es refermin els snarks de ZK. És una tecnologia que podria ajudar a portar transaccions realment privades a la xarxa. És possible que necessitin fragments més intel·ligents, però encara estan en recerca i desenvolupament.

#### Altres fonts {#other-sources}

Aquí hi ha més idees respecte al mateix tema:

- [Fase U1 i Fet: Eth2 com un motor de disponibilitat de dades](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) - _cdetrio,ethresear.ch_

Aquest és encara un punt actiu de discussió. Actualitzarem aquestes pàgines un cop en sabem més.

## Relació entre les millores {#relationship-between-upgrades}

Les millores d'Ethereum estan d'alguna manera interrelacionades. Per tant, anem a veure com es relacionen les cadenes de fragments amb les altres millores.

### Fragments i la cadena de balisa {#shards-and-beacon-chain}

La cadena de balisa conté la lògica per mantenir els fragments segurs i sincronitzats. La cadena de balisa coordinarà els apostadors a la xarxa i els assignarà als fragments que necessiten per continuar treballant. I també facilitarà la comunicació entre fragments mitjançant la recepció i l'emmagatzematge de les dades de transacció de fragments accessibles mitjançant altres fragments. Això donarà als fragments una instantània de l'estat d'Ethereum per mantenir-ho tot actualitzat.

<ButtonLink to="/upgrades/beacon-chain/">
  La cadena de balisa
</ButtonLink>

### Fragments i la fusió {#shards-and-docking}

Quan s’afegeixin fragments addicionals, la xarxa principal Ethereum ja estarà protegida per la cadena de balisa mitjançant una prova de participació. Això permet que una xarxa principal fèrtil pugui construir cadenes de fragments, impulsades per solucions de capa 2 que sobrecarregen l'escalabilitat.

Falta veure si la Xarxa principal existirà com a únic fragment "intel·ligent" que pot gestionar codi d'execució - però en qualsevol cas, la decisió d'expandir fragments es pot revisar segons sigui necessari.

<ButtonLink to="/upgrades/merge/">
  La fusió
</ButtonLink>

<Divider />

### Més informació {#read-more}

<ShardChainsList />
