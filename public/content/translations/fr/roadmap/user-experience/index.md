---
title: "Amélioration de l'expérience utilisateur"
description: "Utiliser Ethereum reste encore trop compliqué pour la plupart des gens. Pour encourager l'adoption massive, Ethereum doit réduire considérablement les obstacles initiaux - les utilisateurs doivent bénéficier d'un accès décentralisé, sans autorisation et résistant à la censure à Ethereum, mais cela doit rester aussi fluide que l'utilisation d'une application Web2 traditionnelle."
lang: fr
image: /images/roadmap/roadmap-ux.png
alt: "Feuille de route d'Ethereum"
template: roadmap
---

**L'utilisation d'Ethereum doit être simplifiée** ; de la gestion des [clés](/glossary/#key) et des [portefeuilles](/glossary/#wallet) à l'initiation des transactions. Pour faciliter l'adoption de masse, Ethereum doit considérablement augmenter la facilité d'utilisation, permettant aux utilisateurs de profiter d'un accès sans autorisation et résistant à la censure à Ethereum avec l'expérience sans friction de l'utilisation des applications [Web2](/glossary/#web2).

## Au-delà des phrases de récupération {#no-more-seed-phrases}

Les comptes sur Ethereum sont protégés par une paire de clés utilisées pour identifier ces comptes (clé publique) et signer les messages (clé privée). Une clé privée est comme un mot de passe principal ; elle permet un accès total à un compte Ethereum. Il s'agit d'une manière différente de fonctionner pour les personnes plus familières avec les banques et les applications Web2 qui gèrent les comptes au nom de l'utilisateur. Pour qu'Ethereum atteigne une l'adoption de masse sans dépendre de tiers centralisés, il doit exister un moyen simple et sans complication pour qu'un utilisateur prenne en charge ses actifs et garde le contrôle de ses données sans avoir à comprendre la cryptographie à clé publique/privée et la gestion de ces clés.

La solution consiste à utiliser des portefeuilles de [contrats intelligents](/glossary/#smart-contract) pour interagir avec Ethereum. Les portefeuilles de contrats intelligents permettent de protéger les comptes si les clés sont perdues ou volées, offrent une meilleure détection et défense contre les fraudes, et permettent aux portefeuilles de fournir de nouvelles fonctionnalités. Bien que les portefeuilles de contrats intelligents existent déjà aujourd'hui, ils sont difficiles à implémenter car le protocole Ethereum doit mieux les prendre en charge. Ce support supplémentaire est ce que l'on appelle l'abstraction de compte.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">En savoir plus sur l'abstraction de compte</ButtonLink>

## Des nœuds pour tous

Les utilisateurs qui exécutent des [nœuds](/glossary/#node) n'ont pas à faire confiance à des tiers pour leur fournir des données, et ils peuvent interagir rapidement, en privé et sans autorisation avec la [blockchain](/glossary/#blockchain) Ethereum. Cependant, exécuter un nœud nécessite actuellement des connaissances techniques et un espace disque important, ce qui signifie que de nombreuses personnes doivent faire confiance à des intermédiaires.

Plusieurs mises à jour faciliteront l'exécution des nœuds et réduiront considérablement les ressources nécessaires. La manière dont les données sont stockées sera modifiée pour utiliser une structure plus efficace en termes d'espace, connue sous le nom d'**arbre Verkle**. De plus, avec le [fonctionnement sans état](/roadmap/statelessness) ou l'[expiration des données](/roadmap/statelessness/#data-expiry), les nœuds Ethereum n'auront pas besoin de stocker une copie de l'intégralité des données d'état d'Ethereum, ce qui réduira considérablement les besoins en espace disque. Les [nœuds légers](/developers/docs/nodes-and-clients/light-clients/) offriront de nombreux avantages de l'exécution d'un nœud complet, mais pourront fonctionner facilement sur des téléphones mobiles ou dans de simples applications de navigateur.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">En savoir plus sur les arbres Verkle</ButtonLink>

Avec ces mises à jour, les freins à l'exécution d'un nœud sont réduites à pratiquement rien. Les utilisateurs bénéficieront d'un accès sécurisé et sans demande d'autorisation à Ethereum sans avoir à sacrifier du stockage ou de la puissance de calcul CPU sur leur ordinateur ou leur téléphone portable, et ils n'auront pas à dépendre de tiers pour les données ou l'accès au réseau lorsqu'ils utilisent des applications.

## Progrès actuels {#current-progress}

Des portefeuilles de contrats intelligents sont déjà disponibles, mais d'autres améliorations sont nécessaires pour les rendre aussi décentralisés et sans autorisation que possible. L'EIP-4337 est une proposition finalisée qui ne nécessite aucune modification du protocole d'Ethereum. Le contrat intelligent principal requis pour l'EIP-4337 a été **déployé en mars 2023**.

**L'absence totale d'état est encore en phase de recherche** et sa mise en œuvre ne se fera probablement pas avant plusieurs années. Il existe plusieurs étapes clés sur la voie du principe de non-vérification de l'état, notamment l'expiration des données, qui pourraient être mises en œuvre plus rapidement. D'autres éléments de la feuille de route, tels que les [arbres Verkle](/roadmap/verkle-trees/) et la [séparation Proposeur-Constructeur](/roadmap/pbs/), doivent d'abord être finalisés.

Les réseaux de test des arbres Verkle sont déjà opérationnels, et la prochaine étape consiste à exécuter des clients compatibles avec les arbres Verkle sur des réseaux de test privés, puis publics. Vous pouvez contribuer à accélérer les progrès en déployant des contrats sur les réseaux de test ou en exécutant des clients de réseau de test.
