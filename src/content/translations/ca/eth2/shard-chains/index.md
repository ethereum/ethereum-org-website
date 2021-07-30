---
title: Cadenes de fragments
description: "Obtén informació sobre les cadenes de fragments: particions de la xarxa que proporcionen a Ethereum més capacitat de transacció i en faciliten l'execució."
lang: ca
template: eth2
sidebar: true
image: ../../../../../assets/eth2/newrings.png
summaryPoints:
  [
    "La fragmentació es una actualització de diverses fases que millora la capacitat i l'escalabilitat d'Ethereum.",
    "Les cadenes de fragments distribueixen la càrrega de la xarxa a través de 64 cadenes noves.",
    "Fan més fàcil executar un node fent que els requeriments de maquinari siguin més baixos.",
    'La planificació tècnica inclou la feina en cadenes de fragments en la "Fase 1" i potencialment en la "Fase 2".',
  ]
---

<UpgradeStatus date="~2021">
    Les cadenes de fragments haurien de sortir en algun moment del 2021, depenent de la velocitat amb què progressin les tasques després del llançament de la <a href="/en/eth2/beacon-chain/">Cadena de Balisa.</a>. Aquests fragments dotaran Ethereum de més capacitat d'emmagatzematge i d'accés a dades, però no s'utilitzaran per executar codi. Encara s'estan esbrinant els detalls de tot plegat.
</UpgradeStatus>

## Què és la fragmentació? {#what-is-sharding}

La fragmentació és el procediment de separar una base de dades horitzontalment per distribuir la càrrega; és un concepte comú en informàtica. En un context Ethereum, la fragmentació reduirà la congestió de la xarxa i incrementarà les transaccions per segon mitjançant la creació de noves cadenes, conegudes com a "fragments".

Això és important per altres raons a part de l'escalabilitat.

## Característiques de la fragmentació {#features-of-sharding}

### Qualsevol persona pot executar un node {#everyone-can-run-a-node}

La fragmentació es una bona manera de dimensionar si es volen mantenir les coses descentralitzades, ja que l'alternativa és dimensionar mitjançant l'augment de la mida de la base de dades existent. Això faria que Ethereum fos menys accessible per als validadors de xarxa, perquè necessitarien ordinadors potents i cars. Amb les cadenes de fragments, els validadors només necessiten emmagatzemar/executar dades per als fragments que estan validant, no per a la xarxa sencera (tal com passa avui en dia). Això accelera molt les coses i redueix dràsticament els requeriments de hardware.

### Més participació a la xarxa {#more-network-participation}

La fragmentació et permetrà finalment executar Ethereum des de qualsevol mòbil o ordinador portàtil. Per tant, més persones haurien de poder participar o executar [clients](/developers/docs/nodes-and-clients/) en una Ethereum fragmentada. Això incrementaria la seguretat perquè quant més descentralitzada fos la xarxa, menor seria la superfície d'atac.

Amb menys requeriments de hardware, la fragmentació farà més fàcil executar [clients](/developers/docs/nodes-and-clients/) pel teu compte, sense dependre de cap servei intermediari. I si pots, considera executar diversos clients. Això pot ajudar a la salut de la xarxa mitjançant la reducció de punts d'error. [Executar un client Eth2](/eth2/get-involved/)

<br />

<InfoBanner isWarning={true}>
  En primer lloc, necessitaràs executar un client de la xarxa principal alhora que el client Eth2. <a href="https://launchpad.ethereum.org" target="_blank">La plataforma de llançament</a> et guiarà a través del procés i els requeriments de hardware. Alternativament, pots utilitzar una <a href="/en/developers/docs/apis/backend/#available-libraries">API de backend</a>.
</InfoBanner>

## Cadenes de fragments versió 1: disponibilitat de dades {#data-availability}

Quan s'envien les primeres cadenes de fragments, només facilitaran dades addicionals a la xarxa. No gestionaran transaccions ni contractes intel·ligents. Però oferiran increïbles millores a les transaccions per segon quan es combinin amb els acumulacions.

Les acumulacions són una tecnologia de "capa 2" que existeix avui en dia. Permeten a les aplicacions descentralitzades o dapps agrupar o "acumular" transaccions dins d'una única transacció fora de la cadena, generar una prova criptogràfica i llavors enviar-la a la cadena. Això redueix les dades necessàries per a una transacció. Combina això amb tota la disponibilitat extra de dades aportades pels fragments i obtén 100.000 transaccions per segon.

[Més informació sobre les acumulacions](/developers/docs/layer-2-scaling/)

## Cadenes de fragments versió 2: execució de codi {#code-execution}

L'objectiu sempre ha estat afegir funcionalitats extra als fragments, perquè s'assemblin més a la [xarxa principal d'Ethereum](/glossary/#mainnet) actual. Això permetria que emmagatzemessin i executessin contractes intel·ligents i gestionessin comptes. Però, tenint en compte l'augment de transaccions per segon que proporcionen els fragments de la versió 1, és necessari que això passi? Encara s'està debatent en la comunitat i sembla que hi ha unes quantes opcions.

### Necessiten els fragments execució de codi? {#do-shards-need-code-execution}

Vitalik Buterin, al podcast de Bankless, va presentar 3 opcions potencials que mereixen ésser tractades. <iframe width="100%" height="315" src="https://www.youtube.com/embed/-R0j5AMUSzA?start=5841" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

#### 1. No necessitar una execució d'estat {#state-execution-not-needed}

Això significaria no donar als fragments la capacitat de gestionar contractes intel·ligents i deixar-los com a magatzems de dades.

#### 2. Tenir alguns fragments d'execució {#some-execution-shards}

Potser existeix un compromís on no necessitem que tots els fragments (ara mateix n'hi ha 64 de planificats) siguin més intel·ligents. Podríem afegir aquesta funcionalitat a uns quants i deixar la resta. Això podria accelerar l'entrega.

#### 3. Esperar fins que puguem fer snarks de Zero Knowledge (ZK) {#wait-for-zk-snarks}

En darrer lloc, potser hauríem de tornar a plantejar aquest debat quan es refermin els snarks de ZK. És una tecnologia que podria ajudar a portar transaccions realment privades a la xarxa. És possible que necessitin fragments més intel·ligents, però encara estan en recerca i desenvolupament.

#### Altres fonts {#other-sources}

Aquí hi ha més idees respecte a les mateixes línies:

- [Fase U1 i Fet: Eth2 com un motor de disponibilitat de dades](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) - _cdetrio,ethresear.ch_

Aquest és encara un punt actiu de discussió. Actualitzarem aquestes pàgines un cop en sabem més.

## Relació entre les millores {#relationship-between-upgrades}

D'alguna manera, les millores d'Eth2 estan interrelacionades. Per tant, anem a veure com es relacionen les cadenes de fragments amb les altres millores.

### Fragments i la Cadena de Balisa {#shards-and-beacon-chain}

La Cadena de Balisa conté la lògica per mantenir els fragments segurs i sincronitzats. La Cadena de Balisa coordinarà els participants a la xarxa, i els assignarà als fragments que necessiten per continuar treballant. I també facilitarà la comunicació entre fragments mitjançant la recepció i l'emmagatzematge de les dades de transacció de fragments accessibles mitjançant altres fragments. Això donarà als fragments una instantània de l'estat d'Ethereum per mantenir-ho tot actualitzat.<ButtonLink to="/eth2/beacon-chain/">La Cadena de Balisa</ButtonLink>

### Fragments i acoblament {#shards-and-docking}

La xarxa principal d'Ethereum existirà igual que avui en dia inclús després de la introducció dels fragments. Però en algun moment, la xarxa principal necessitarà transformar-se en un fragment per tal de poder passar a ser una aposta. Falta veure si la xarxa principal romandrà com a únic fragment "intel·ligent" que pugui gestionar execució de codi - però sigui com sigui, s'haurà de prendre una decisió a la fase 2 de fragmentació.<ButtonLink to="/eth2/docking/">L'acoblament</ButtonLink>

<Divider />

### Més informació {#read-more}

<Eth2ShardChainsList />
