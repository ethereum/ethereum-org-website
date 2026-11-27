---
title: "Améliorer l'expérience utilisateur"
description: "Il est encore trop complexe d'utiliser Ethereum pour la plupart des gens. Pour encourager l'adoption massive, Ethereum doit réduire considérablement ses barrières à l'entrée - les utilisateurs doivent bénéficier d'un accès décentralisé, sans permission et résistant à la censure à Ethereum, mais cela doit être aussi fluide que l'utilisation d'une application Web2 traditionnelle."
lang: fr
image: /images/roadmap/roadmap-ux.png
alt: "Feuille de route d'Ethereum"
template: roadmap
---

**L'utilisation d'Ethereum doit être simplifiée** ; de la gestion des [clés](/glossary/#key) et des [portefeuilles](/glossary/#wallet) à l'initiation des transactions. Pour faciliter l'adoption massive, Ethereum doit considérablement augmenter sa facilité d'utilisation, permettant aux utilisateurs de bénéficier d'un accès sans permission et résistant à la censure à Ethereum avec l'expérience fluide de l'utilisation des applications [Web2](/glossary/#web2).

## Au-delà des phrases de récupération {#no-more-seed-phrases}

Les comptes Ethereum sont protégés par une paire de clés utilisées pour identifier les comptes (clé publique) et signer des messages (clé privée). Une clé privée est comme un mot de passe principal ; elle permet un accès complet à un compte Ethereum. C'est une façon différente de fonctionner pour les personnes plus habituées aux banques et aux applications Web2 qui gèrent les comptes au nom de l'utilisateur. Pour qu'Ethereum atteigne une adoption massive sans dépendre de tiers centralisés, il doit y avoir un moyen simple et fluide pour un utilisateur de conserver ses actifs et de garder le contrôle de ses données sans avoir à comprendre la cryptographie à clé publique-privée et la gestion des clés.

La solution à cela est d'utiliser des portefeuilles de [contrats intelligents](/glossary/#smart-contract) pour interagir avec Ethereum. Les portefeuilles de contrats intelligents créent des moyens de protéger les comptes si les clés sont perdues ou volées, des opportunités pour une meilleure détection et défense contre la fraude, et permettent aux portefeuilles d'obtenir de nouvelles fonctionnalités. Bien que les portefeuilles de contrats intelligents existent aujourd'hui, ils sont complexes à concevoir car le protocole Ethereum doit mieux les prendre en charge. Cette prise en charge supplémentaire est connue sous le nom d'abstraction de compte.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">En savoir plus sur l'abstraction de compte</ButtonLink>

## Des nœuds pour tous {#nodes-for-everyone}

Les utilisateurs qui exécutent des [nœuds](/glossary/#node) n'ont pas à faire confiance à des tiers pour leur fournir des données, et ils peuvent interagir rapidement, de manière privée et sans permission avec la [chaîne de blocs](/glossary/#blockchain) Ethereum. Cependant, l'exécution d'un nœud nécessite actuellement des connaissances techniques et un espace disque important, ce qui signifie que de nombreuses personnes doivent plutôt faire confiance à des intermédiaires.

Il existe plusieurs mises à niveau qui rendront l'exécution de nœuds beaucoup plus facile et beaucoup moins gourmande en ressources. L'état d'Ethereum devrait passer à une nouvelle structure d'arbre, actuellement proposée comme un arbre binaire dans l'[EIP-7864](https://eips.ethereum.org/EIPS/eip-7864), qui produit des preuves beaucoup plus petites. De plus, avec l'[absence d'état](/roadmap/statelessness) ou l'[expiration des données](/roadmap/statelessness/#data-expiry), les nœuds Ethereum n'auront pas besoin de stocker une copie de l'ensemble des données d'état d'Ethereum, ce qui réduira considérablement les besoins en espace disque. Les [nœuds légers](/developers/docs/nodes-and-clients/light-clients/) offriront de nombreux avantages de l'exécution d'un nœud complet, mais pourront s'exécuter facilement sur des téléphones mobiles ou dans de simples applications de navigateur.

<ButtonLink variant="outline" href="/roadmap/statelessness/">En savoir plus sur l'absence d'état</ButtonLink>

Avec ces mises à niveau, les obstacles à l'exécution d'un nœud sont réduits à pratiquement zéro. Les utilisateurs bénéficieront d'un accès sécurisé et sans permission à Ethereum sans avoir à sacrifier d'espace disque ou de processeur notable sur leur ordinateur ou leur téléphone mobile, et n'auront pas à dépendre de tiers pour les données ou l'accès au réseau lorsqu'ils utilisent des applications.

## Progrès actuels {#current-progress}

Les portefeuilles de contrats intelligents sont déjà disponibles, mais d'autres mises à niveau sont nécessaires pour les rendre aussi décentralisés et sans permission que possible. L'EIP-4337 est une proposition mature qui ne nécessite aucune modification du protocole d'Ethereum. Le principal contrat intelligent requis pour l'EIP-4337 a été **déployé en mars 2023**.

**L'absence d'état complète est encore en phase de recherche** et il faudra probablement plusieurs années avant qu'elle ne soit mise en œuvre. Il y a plusieurs étapes sur la voie de l'absence d'état complète, y compris l'expiration des données, qui pourraient être mises en œuvre plus tôt. D'autres éléments de la feuille de route, tels qu'un nouvel arbre d'état (actuellement proposé comme un arbre binaire dans l'[EIP-7864](https://eips.ethereum.org/EIPS/eip-7864)) et la [séparation proposant-constructeur](/roadmap/pbs/) doivent d'abord être achevés.

Les [arbres Verkle](/roadmap/verkle-trees/) ont été explorés pour ce rôle, mais la proposition d'arbre Verkle ([EIP-6800](https://eips.ethereum.org/EIPS/eip-6800)) est maintenant stagnante. L'EIP-7864 est encore un brouillon et n'a pas été programmé pour une mise à niveau du réseau.
