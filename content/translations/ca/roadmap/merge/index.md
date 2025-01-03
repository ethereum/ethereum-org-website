---
title: La fusió
description: "Més informació sobre la fusió: quan la xarxa principal d'Ethereum s'integri al sistema coordinat de prova de participació de la cadena de balisa."
lang: ca
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoint1: Està previst que l'actual xarxa principal d'Ethereum es "fusioni" amb la cadena de balisa basada en el sistema de prova de participació.
summaryPoint2: Això marcarà el final del sistema de prova de treball per Ethereum i significarà la transició completa al sistema de prova de participació.
summaryPoint3: Està previst que precedeixi la posada en marxa de la millora anomenada cadena de fragments.
summaryPoint4: En el passat ens hi referíem com "l'acoblament."
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
  Aquesta actualització representa el canvi oficial al consens de la prova de participació. D'aquesta manera s'elimina la necessitat de la mineria, que consumeix molta energia, i en el seu lloc s'assegura la xarxa utilitzant ether estacat. Un pas realment exitant és assolir <a href="/roadmap/vision/">Ethereum vision</a> - més escalabilitat, seguretat, i sostenibilitat.
</UpgradeStatus>

## Què és la fusió? {#what-is-the-docking}

És important recordar que inicialment, l'actualització de la [cadena de balisa](/roadmap/beacon-chain/) s'enviava per separat des de la [xarxa principal](/glossary/#mainnet), la cadena que utilitzem avui. La xarxa principal d'Ethereum seguirà estant protegida mitjançant la [prova de treball](/developers/docs/consensus-mechanisms/pow/), fins i tot quan la cadena de balisa s'executi en paral·lel utilitzant la [prova de participació](/developers/docs/consensus-mechanisms/pos/). La fusió és quan aquests dos sistemes finalment es combinen.

Imagineu que Ethereum és una nau espacial que no està del tot preparada per a un viatge interestel·lar. Amb la cadena de balisa la comunitat ha creat un nou motor i un habitacle més reforçat. Quan sigui el moment, la nau actual es fusionarà amb aquest nou sistema per convertir-se en una única nau, preparada per viatjar a anys llum i conquerir l'univers.

## Fusió amb la xarxa principal {#docking-mainnet}

Quan estigui preparada, la xarxa principal d'Ethereum es "fusionarà" amb la cadena de balisa transformant-se en un fragment propi que utilitzi la prova de participació en lloc de la [prova de treball](/developers/docs/consensus-mechanisms/pow/).

La xarxa principal aportarà la capacitat d'executar contractes intel·ligents en el sistema de prova de participació, a més de l'historial complet i l'estat actual d'Ethereum, per garantir que la transició sigui fluida per a tots els titulars i usuaris d'ETH.

## Després de la fusió {#after-the-merge}

Això marcarà el final de la prova de treball per a Ethereum i el principi d'una nova era més sostenible i respectuosa amb el medi ambient. Arribats a aquest punt, Ethereum estarà un pas més a prop d'adquirir la mida completa, la seguretat i la sostenibilitat remarcades en la seva [visió d'Ethereum](/roadmap/vision/).

És important tenir en compte que un objectiu d’implementació de la fusió és la simplicitat per agilitar la transició de la prova de treball a la prova de participació. Els desenvolupadors estan focalitzant els seus esforços en aquesta transició, alhora que minimitzen característiques addicionals que podrien endarrerir aquest objectiu.

**Això vol dir que algunes funcions, com ara la possibilitat de retirar els ETH apilats, hauran d'esperar una mica més després de completar la unió.**Els plans inclouen una actualització de "neteja" posterior a la fusió per fer front a aquestes funcions, cosa que s'espera que passi molt aviat després de finalitzar la fusió.

## Relació entre les millores {#relationship-between-upgrades}

Les millores d'Ethereum estan d'alguna manera interrelacionades. Per tant, recapitulem sobre com La Fusió es relaciona amb les altres millores.

### La Fusió i la Cadena de Balisa {#docking-and-beacon-chain}

Un cop succeeixi La Fusió, s'assignaran els tenidors per validar la xarxa principal d'Ethereum. [La mineria](/developers/docs/consensus-mechanisms/pow/mining/) ja no farà falta, per tant, el miners probablement invertiran els seus guanys en participacions en el nou sistema de prova de participació.

<ButtonLink href="/roadmap/beacon-chain/">
  La cadena de balisa
</ButtonLink>

### La fusió i la neteja postfusió {#merge-and-post-merge-cleanup}

Immediatament després de La Fusió, algunes característiques com ara la retirada d'ETH apilats, ja no estarà disponible. Aquestes estan previstes per a una millora separada que vindrà poc després de La Fusió.

Estigueu al dia amb el [Blog de recerca i desenvolupament EF](https://blog.ethereum.org/category/research-and-development/). Per als curiosos, obteniu més informació sobre què passa després de la fusió en [What Happens After the Merge](https://youtu.be/7ggwLccuN5s?t=101), presentat per Vitalik a l'esdeveniment ETHGlobal d'abril de 2021.

### La Fusió i les cadenes de fragments {#docking-and-shard-chains}

Originalment, el pla era treballar en cadenes de fragments abans de La Fusió, per abordar l’escalabilitat. Tot i això, amb l’auge de les [solucions d’escala de capa 2](/developers/docs/scaling/#layer-2-scaling), la prioritat s’ha canviat a passar de la prova de treball a la prova de participació mitjançant La Fusió.

La comunitat avaluarà de forma contínua la necessitat de múltiples rondes de cadenes de fragments per permetre una escalabilitat infinita.

<ButtonLink href="/roadmap/danksharding/">
  Cadenes de fragments
</ButtonLink>

## Més informació {#read-more}

<MergeArticleList />
