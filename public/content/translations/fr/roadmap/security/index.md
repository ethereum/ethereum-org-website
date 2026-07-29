---
title: Un Ethereum plus sécurisé
description: La feuille de route d'Ethereum renforce aujourd'hui la production de blocs et la résistance à la censure tout en préparant le protocole pour l'ère quantique et des décennies de fonctionnement fiable.
lang: fr
image: /images/roadmap/roadmap-security.png
alt: "Feuille de route d'Ethereum"
template: roadmap
summaryPoints:
  - Des mises à jour de renforcement à court terme, telles que la séparation proposant-constructeur (PBS) intégrée et les listes d'inclusion, sont en développement actif
  - La préparation post-quantique est en cours des années avant toute menace quantique crédible
  - La simplification du protocole élimine la complexité et réduit la surface d'attaque d'Ethereum
---

Ethereum est déjà une plateforme de [contrats intelligents](/glossary/#smart-contract) très sécurisée et décentralisée. La feuille de route vise à ce qu'elle le reste pendant des décennies en **renforçant le réseau aujourd'hui tout en se préparant aux menaces qui pourraient n'apparaître que dans plusieurs années**. Les mises à jour à court terme sont suivies sur [forkcast.org](https://forkcast.org), et l'ébauche de la feuille de route à plus long terme est publiée sur [strawmap.org](https://strawmap.org).

<ExpandableCard title="Ethereum est-il sécurisé aujourd'hui ?" eventCategory="/roadmap/security" eventName="clicked is ethereum secure today?">

Oui. Ethereum fonctionne en continu depuis 2015 sans interruption. Les améliorations présentées sur cette page rendent un réseau déjà sécurisé plus difficile à attaquer, à censurer ou à perturber.

</ExpandableCard>

## Construction de blocs sans tiers de confiance {#trustless-block-building}

La plupart des blocs Ethereum actuels sont assemblés grâce à une division du travail : des constructeurs spécialisés construisent le bloc le plus rentable possible, et le [validateur](/glossary/#validator) dont c'est le tour propose la meilleure offre. Cela empêche la construction professionnelle de blocs de concentrer la [mise](/glossary/#staking) entre les mains des plus grands opérateurs, mais depuis 2022, cela repose sur des logiciels hors protocole que le réseau ne peut pas vérifier.

**La séparation proposant-constructeur (PBS) intégrée (ePBS, ou EIP-7732)** déplace cette division dans le protocole, éliminant le besoin de faire confiance aux relais, les intermédiaires tiers qui transmettent actuellement les blocs entre les constructeurs et les validateurs. L'ePBS est l'une des nouveautés phares de la prochaine mise à jour [Glamsterdam](/roadmap/glamsterdam/), prévue pour 2026. Aucune date n'a été fixée pour le Réseau principal ; les équipes clientes la testent sur des devnets (réseaux de test temporaires).

<ButtonLink variant="outline" href="/roadmap/pbs/">En savoir plus sur la séparation proposant-constructeur</ButtonLink>

## Résistance à la censure {#censorship-resistance}

Un réseau résistant à la censure signifie que personne ne peut empêcher une transaction valide d'atteindre la chaîne. **Les listes d'inclusion appliquées par le choix de fork (FOCIL, ou EIP-7805)** donnent à de nombreux validateurs leur mot à dire sur ce qu'un bloc doit inclure : ils publient des listes de transactions en attente que le constructeur de blocs est tenu d'inclure. Aucun acteur unique ne peut discrètement écarter votre transaction.

FOCIL est la nouveauté phare de la couche de consensus de Hegotá, la mise à jour qui suit Glamsterdam et qui est prévue pour 2027. Elle a été délibérément programmée après Glamsterdam afin que l'ePBS et FOCIL ne soient jamais déployées comme une seule combinaison non testée. Les recherches sur les mempools chiffrés, qui masqueraient le contenu des transactions en attente jusqu'à ce qu'elles soient incluses en toute sécurité dans un bloc, se poursuivent.

## Finalité plus rapide {#faster-finality}

Pour les utilisateurs, la [finalité](/glossary/#finality) est le moment où une transaction devient permanente, lorsque son annulation coûterait à un attaquant une quantité énorme d'ETH mis en jeu. Aujourd'hui, la finalité prend environ 15 minutes, et **les chercheurs veulent réduire ce délai de manière drastique**. Les travaux ont commencé sous la forme d'une finalité à créneau unique, ont évolué vers une finalité à trois créneaux, et se poursuivent maintenant sous le nom de Minimmit, un protocole de consensus à un tour dans le programme Lean Ethereum introduit en juillet 2025. La finalité en quelques secondes est un objectif à long terme sur l'ébauche de la feuille de route, visant approximativement 2029. Cela reste un domaine de recherche actif, et aucune mise à jour de finalité n'est encore assignée à un fork.

<ButtonLink variant="outline" href="/roadmap/single-slot-finality/">En savoir plus sur la recherche d'une finalité plus rapide</ButtonLink>

## Validateurs résilients {#resilient-validators}

Un validateur est généralement une seule machine détenant une clé de signature. **La technologie de validateur distribué (DVT)** remplace cette machine unique par un comité de machines qui partagent la clé et signent ensemble, de sorte qu'une panne d'ordinateur ou le vol d'une clé ne met pas le validateur hors service. La DVT est en production et utilisée à grande échelle par les opérateurs de staking. En janvier 2026, Vitalik Buterin a soumis une proposition de variante simplifiée au niveau du protocole appelée DVT-lite ; il s'agit d'une proposition préliminaire sans fork programmé.

Le réseau se protège également grâce à la [diversité des clients](/developers/docs/nodes-and-clients/client-diversity/) : Ethereum fonctionne sur plusieurs implémentations logicielles construites indépendamment, de sorte qu'un bug dans un client laisse le reste du réseau opérationnel.

Deux idées de recherche antérieures, la fusion de vues (view-merge) et l'élection secrète du leader, ne sont plus des éléments actifs de la feuille de route.

<ButtonLink variant="outline" href="/staking/dvt/">En savoir plus sur la technologie de validateur distribué</ButtonLink>

## Résistance quantique {#quantum-resistance}

Ethereum utilise la [cryptographie](/glossary/#cryptography) pour maintenir la sécurité du réseau et protéger les fonds des utilisateurs. À terme, certaines de ces méthodes cryptographiques seront **vulnérables aux ordinateurs quantiques**, qui peuvent résoudre des problèmes mathématiques spécifiques de manière exponentiellement plus rapide que les machines classiques.

**Aucun ordinateur quantique ne peut briser la cryptographie d'Ethereum aujourd'hui.** Le matériel requis n'existe pas encore à grande échelle. Mais des recherches récentes suggèrent que l'écart se réduit plus rapidement que prévu. En mars 2026, Google Quantum AI a publié un article estimant que briser la cryptographie à courbe elliptique de 256 bits (le type utilisé par Ethereum pour les signatures de compte) pourrait nécessiter environ 1 200 qubits logiques, soit environ 20 fois moins que les estimations précédentes.

Les transitions cryptographiques prennent des années à être planifiées et exécutées en toute sécurité, la préparation a donc lieu dès maintenant, bien avant que le matériel n'existe. Quatre domaines ont été identifiés comme nécessitant des mises à jour post-quantiques : les signatures de consensus des validateurs (BLS), les schémas d'engagement utilisés pour la disponibilité des données (KZG), les signatures de compte (ECDSA) et les systèmes de preuve à divulgation nulle de connaissance utilisés par les [rollups](/glossary/#rollups).

La Fondation Ethereum a formé une **équipe dédiée à la sécurité post-quantique** en janvier 2026, et ses travaux sont suivis publiquement sur [pq.ethereum.org](https://pq.ethereum.org). Les travaux actifs incluent des signatures de validateur basées sur le hash (leanXMSS) associées à une zkVM minimale (leanVM) qui agrège efficacement les signatures plus volumineuses résistantes aux ordinateurs quantiques, ainsi que des devnets d'interopérabilité hebdomadaires avec plus de 10 équipes clientes.

Un élément clé de la stratégie de transition est l'**EIP-8141**, qui introduit l'[abstraction de compte](/roadmap/account-abstraction/) native. Cela permet aux comptes individuels de choisir leur propre vérification de signature, ce qui signifie que les utilisateurs pourraient passer à des signatures résistantes aux ordinateurs quantiques sans attendre une migration unique à l'échelle du protocole. L'EIP-8141 est envisagée pour la mise à jour Hegotá. Les étapes clés de l'infrastructure post-quantique visent un achèvement vers 2029. Il s'agit d'objectifs de planification qui peuvent évoluer.

<ExpandableCard title="Les ordinateurs quantiques peuvent-ils voler mes ETH aujourd'hui ?" eventCategory="/roadmap/security" eventName="clicked can quantum computers steal my ETH today?">

Non. Aucun ordinateur quantique ne peut aujourd'hui briser la cryptographie d'Ethereum. Les travaux décrits sur cette page sont une préparation précoce à une menace qui est encore à des années de se concrétiser. Lorsque des portefeuilles post-quantiques seront disponibles, les logiciels de portefeuille vous guideront tout au long de la migration. Pour l'instant, vous n'avez rien à faire.

</ExpandableCard>

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">En savoir plus sur la résistance quantique</ButtonLink>

## Un protocole plus simple et plus efficace {#simpler-and-more-efficient-protocol}

La complexité crée des opportunités pour les bugs et les vulnérabilités. Une partie de la feuille de route se concentre sur **la simplification d'Ethereum et l'élimination de la dette technique** afin que le protocole soit plus facile à maintenir, à auditer et à analyser. Un protocole plus simple offre également aux attaquants une surface d'attaque réduite.

Livré jusqu'à présent :

- **[Pectra (mai 2025)](/roadmap/pectra/)** : A introduit l'EIP-7702, qui permet aux comptes détenus en externe de déléguer temporairement au code d'un contrat intelligent, un tremplin vers une abstraction de compte complète.
- **[Fusaka (décembre 2025)](/roadmap/fusaka/)** : A déployé PeerDAS (EIP-7594), qui répartit la charge de travail de disponibilité des données sur le réseau. A également augmenté les paramètres des blobs, augmentant ainsi le débit de données pour les rollups.
- **[Dencun (mars 2024)](/roadmap/dencun/)** : A introduit les transactions de blobs (EIP-4844) pour des données de rollup moins chères et a restreint `SELFDESTRUCT` (EIP-6780) pour supprimer une source de complexité de longue date.
- **[Shapella (avril 2023)](/staking/withdrawals/)** : A permis aux validateurs de retirer les ETH mis en jeu (EIP-4895), supprimant une contrainte initiale du staking en [preuve d'enjeu (PoS)](/glossary/#pos).
- **London (août 2021)** : A remanié la tarification du gaz avec l'EIP-1559, introduisant des frais de base et un mécanisme pour brûler les frais afin de rendre les coûts de transaction plus prévisibles.

En cours :

- **Glamsterdam (prévue pour 2026)** : Les nouveautés phares sont l'ePBS (EIP-7732) et les listes d'accès au niveau du bloc (EIP-7928), avec une réévaluation du prix du gaz également à l'étude.
- **Hegotá (prévue pour 2027)** : FOCIL (EIP-7805) est la nouveauté phare de la couche de consensus. Envisagée pour inclusion : l'EIP-8141 (abstraction de compte native).
- **En continu** : Les efforts pour simplifier l'[EVM](/developers/docs/evm/), harmoniser les implémentations des clients et supprimer progressivement les fonctionnalités obsolètes se poursuivent au sein des équipes clientes. Les travaux sur l'absence d'état (permettant aux participants de vérifier la chaîne sans stocker toutes ses données) sont en cours de refonte autour d'arbres de hash binaires résistants aux ordinateurs quantiques, l'approche finale restant à confirmer.

## Progrès actuels {#current-progress}

À la mi-2026 :

- **Construction de blocs et résistance à la censure** : L'ePBS et les listes d'accès au niveau du bloc fonctionnent sur les devnets de Glamsterdam. FOCIL est prévue pour Hegotá, ciblée pour 2027.
- **Finalité** : Minimmit et les travaux plus larges sur le consensus Lean Ethereum restent en recherche active sans affectation de fork pour le moment.
- **Résistance quantique** : Des devnets d'interopérabilité post-quantique hebdomadaires sont en cours d'exécution, et les étapes clés de l'infrastructure de base visent approximativement 2029.
- **Simplification** : Pectra et Fusaka ont été déployées ; Glamsterdam et Hegotá apportent la prochaine série de nettoyages.

Aucune partie de ce travail n'est terminée, et tous les délais sont des estimations qui peuvent évoluer.

## Lectures complémentaires {#further-reading}

- [Forkcast : Suivi des mises à jour du réseau Ethereum](https://forkcast.org)
- [Strawmap : une ébauche de la feuille de route de la couche 1 (l1) d'Ethereum](https://strawmap.org) - _EF Architecture_
- [Ethereum post-quantique](https://pq.ethereum.org) - _Fondation Ethereum_
- [Suivi de la feuille de route Lean Ethereum](https://leanroadmap.org) - _ReamLabs_
- [Preuve d'enjeu (PoS) et finalité](/developers/docs/consensus-mechanisms/pos/#finality)
- [L'EVM](/developers/docs/evm/)