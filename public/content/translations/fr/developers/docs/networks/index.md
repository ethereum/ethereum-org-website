---
title: Les réseaux
description: Une vue d'ensemble des réseaux Ethereum et où obtenir de l'ether de réseau de test (ETH) pour tester votre application.
lang: fr
---

Les réseaux Ethereum sont des groupes d'ordinateurs connectés qui communiquent à l'aide du protocole Ethereum. Il n'existe qu'un seul réseau principal Ethereum, mais des réseaux indépendants conformes aux mêmes règles de protocole peuvent être créés à des fins de test et de développement. Il existe de nombreux « réseaux » indépendants qui se conforment au protocole sans interagir les uns avec les autres. Vous pouvez même en lancer un localement sur votre propre ordinateur pour tester vos contrats intelligents et vos applications web3.

Votre compte Ethereum fonctionnera sur les différents réseaux, mais le solde de votre compte et votre historique de transactions ne seront pas transférés du réseau Ethereum principal. Pour les tests, il est utile de connaître les réseaux disponibles et la façon d'obtenir de l'ETH de test pour pouvoir vous amuser avec. En général, pour des raisons de sécurité, il n'est pas recommandé de réutiliser les comptes principaux sur les réseaux de test ou vice versa.

## Prérequis {#prerequisites}

Vous devez comprendre les [bases d'Ethereum](/developers/docs/intro-to-ethereum/) avant de vous informer sur les différents réseaux, car les réseaux de test vous donneront une version bon marché et sûre d'Ethereum avec laquelle vous pourrez vous amuser.

## Réseaux publics {#public-networks}

Les réseaux publics sont accessibles à toute personne disposant d'une connexion Internet, partout dans le monde. N'importe qui peut lire ou créer des transactions sur une blockchain publique, et valider les transactions exécutées. Le consensus établi entre les pairs décide de l'inclusion des transactions et de l'état du réseau.

### Réseau principal Ethereum {#ethereum-mainnet}

Le réseau principal Ethereum est la blockchain publique primaire de production, où des transactions de valeur réelle se produisent sur le registre distribué.

Lorsque les gens et les échanges discutent des prix de l'ETH, ils parlent de l'ETH du réseau principal.

### Réseaux de test Ethereum {#ethereum-testnets}

En plus du réseau principal, il existe des réseaux de test publics. Il s'agit de réseaux utilisés par les développeurs de protocoles ou de contrats intelligents pour tester à la fois les mises à niveau de protocoles ainsi que les contrats intelligents potentiels dans un environnement semblable à la production avant le déploiement sur le réseau principal. Considérez cela comme une analogie entre les serveurs de production et les serveurs d'essai.

Vous devriez tester tout code de contrat que vous écrivez sur un réseau de test avant de le déployer sur le réseau principal. Parmi les dApps qui s'intègrent aux contrats intelligents existants, la plupart des projets ont des copies déployées sur des réseaux de test.

La plupart des réseaux de test ont commencé par utiliser le mécanisme de consensus de preuve d'autorité. Cela signifie qu'un petit nombre de nœuds sont choisis pour valider les transactions et créer des blocs, en mettant en jeu leur identité dans le processus. Alternativement, certains réseaux de test proposent un mécanisme de consensus ouvert, qui permet à tout le monde de tester un validateur, comme avec le réseau principal Ethereum.

L'ETH sur les réseaux de test est censé n'avoir aucune valeur réelle ; cependant, des marchés ont été créés pour certains types d'ETH testnet qui sont devenus rares ou difficiles à obtenir. Étant donné que vous avez besoin d'ETH pour interagir avec Ethereum (même sur les testnets), la plupart des gens obtiennent l'ETH des testnets gratuitement via des robinets. La plupart des robinets sont des applications Web dans lesquelles vous saisissez l'adresse à laquelle vous demandez l'envoi d'ETH.

#### Quel réseau de test dois-je utiliser ?

Les deux réseaux de test publics que les développeurs de clients conservent actuellement sont Sepolia et Hoodi. Sepolia est un réseau dédié aux développeurs de contrats et d'applications qui vise à tester leurs applications. Le réseau Hoodi permet aux développeurs de protocoles de tester les mises à niveau du réseau, et aux stakers de tester les validateurs en cours d'exécution.

#### Sepolia {#sepolia}

**Sepolia est le réseau de test recommandé par défaut pour le développement d'application**. Le réseau Sepolia utilise un ensemble de validateurs permissionnés, contrôlé par les équipes clientes et de test.

##### Ressources

- [Site web](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Robinets

- [Robinet Sepolia d'Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Robinet Sepolia de Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Robinet Sepolia de Chainstack](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Robinet de l'écosystème Ethereum](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [Robinet Sepolia d'ethfaucet.com](https://ethfaucet.com/networks/ethereum)
- [Robinet Sepolia Web3 de Google Cloud](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Robinet Sepolia d'Infura](https://www.infura.io/faucet)
- [Robinet PoW](https://sepolia-faucet.pk910.de/)
- [Robinet Sepolia de QuickNode](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi est un réseau de test qui permet de tester, de valider et de mettre en jeu. Le réseau Hoodi est ouvert aux utilisateurs souhaitant exécuter un validateur de réseau de test. Les utilisateurs désireux de tester les mises à niveau de protocoles avant de les déployer sur le réseau principal sont donc invités à utiliser Hoodi.

- Ensemble de validateurs ouvert, les validateurs peuvent tester les mises à niveau du réseau
- État diversifié, utile pour tester des interactions de contrats intelligents complexes
- Plus long à synchroniser et nécessite plus de stockage pour exécuter un nœud

##### Ressources

- [Site web](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorateur](https://explorer.hoodi.ethpandaops.io/)
- [Synchronisation par point de contrôle](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Robinets

- [Robinet Hoodi de Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Robinet Hoodi](https://hoodi.ethpandaops.io/)
- [Robinet PoW](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery est un type unique de réseau de test qui se réinitialise entièrement chaque mois. L'état d'exécution et de consensus revient à la genèse tous les 28 jours, ce qui signifie que tout ce qui se passe sur le réseau de test est éphémère. Cela le rend idéal pour les tests à court terme, l'amorçage rapide des nœuds et les applications de type « hello world » qui n'ont pas besoin de permanence.

- État toujours frais, tests à court terme des validateurs et des applications
- Comprend uniquement l'ensemble de contrats de base
- Un ensemble de validateurs ouvert, avec un accès aisé à des capitaux importants
- Exigences minimales pour un nœud et synchronisation la plus rapide, &lt;5 Go en moyenne

##### Ressources

- [Site web](https://ephemery.dev/)
- [Github](https://github.com/ephemery-testnet/ephemery-resources)
- [Chat communautaire](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Explorateur de balises](https://beaconlight.ephemery.dev/)
- [Synchronisation par point de contrôle](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Plateforme de lancement](https://launchpad.ephemery.dev/)

#### Robinets

- [Robinet Bordel](https://faucet.bordel.wtf/)
- [Robinet PoW Pk910](https://ephemery-faucet.pk910.de/)

#### Holesky (déprécié) {#holesky}

Le réseau de test Holesky est déprécié à compter de septembre 2025. Les opérateurs de staking et les fournisseurs d'infrastructure devraient utiliser Hoodi pour les tests de validateurs à la place.

- [Annonce de la fermeture du réseau de test Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _Blog EF, 1er septembre 2025_
- [Mises à jour des réseaux de test Holesky et Hoodi](https://blog.ethereum.org/en/2025/03/18/hoodi-holesky) - _Blog EF, 18 mars 2025_

### Réseaux de test de couche 2 {#layer-2-testnets}

[La couche 2 (L2)](/layer-2/) est un terme collectif qui décrit un ensemble spécifique de solutions de mise à l'échelle d'Ethereum. Une couche 2 est une blockchaià part entière qui prolonge Ethereum et hérite des garanties de sécurité d'Ethereum. Les réseaux de test de couche 2 sont généralement étroitement couplés aux réseaux publics de test Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Un réseau de test pour [Arbitrum](https://arbitrum.io/).

##### Ressources

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Robinets

- [Robinet Arbitrum Sepolia d'Alchemy](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Robinet Arbitrum Sepolia de Chainlink](https://faucets.chain.link/arbitrum-sepolia)
- [Robinet Arbitrum Sepolia d'ethfaucet.com](https://ethfaucet.com/networks/arbitrum)
- [Robinet Arbitrum Sepolia de QuickNode](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Un réseau de test pour [Optimism](https://www.optimism.io/).

##### Ressources

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Robinets

- [Robinet d'Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [Robinet de Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Robinet Optimism Sepolia d'ethfaucet.com](https://ethfaucet.com/networks/optimism)
- [Robinet du réseau de test](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Un réseau de test pour [Starknet](https://www.starknet.io).

##### Ressources

- [Starkscan](https://sepolia.starkscan.co/)

##### Robinets

- [Robinet d'Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [Robinet Starknet Sepolia de Blast](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Robinet Starknet](https://starknet-faucet.vercel.app/)

## Réseaux privés {#private-networks}

Un réseau Ethereum est un réseau privé si ses nœuds ne sont pas connectés à un réseau public (c'est-à-dire, au réseau principal ou à un réseau de test). Dans ce contexte, « privé » signifie « réservé » ou « isolé », plutôt que « protégé » ou « sécurisé ».

### Réseaux de développement {#development-networks}

Pour développer une application Ethereum, exécutez-la sur un réseau privé pour vérifier son bon fonctionnement avant de la déployer. De la même façon que vous exécuteriez un serveur local sur votre ordinateur pour du développement Web, vous pouvez créer une occurrence de blockchain locale pour tester votre application décentralisée (dApp). Cela permet une itération beaucoup plus rapide que sur un réseau de test public.

Il existe des projets et des outils dédiés pour vous aider dans cette tâche. En savoir plus sur les [réseaux de développement](/developers/docs/development-networks/).

### Réseaux de consortium {#consortium-networks}

Le processus de consensus est contrôlé par un ensemble prédéfini de nœuds de confiance. Ce peut être un réseau privé d'institutions universitaires connues régissant chacune un seul nœud, où les blocs sont validés par un seuil de signataires au sein du réseau.

Si le réseau public Ethereum peut être assimilé à l'Internet public, vous pouvez considérer un réseau de consortium comme un intranet privé.

## <Emoji text="🚉" /> Pourquoi les réseaux de test Ethereum portent-ils le nom de stations de métro ? {#why-naming}

De nombreux réseaux de test d'Ethereum portent le nom de stations de métro ou de gares réelles. Cette tradition de nommage a commencé tôt et reflète les villes du monde où les contributeurs ont vécu ou travaillé. C'est symbolique, mémorable et pratique. Tout comme les réseaux de test sont isolés du réseau principal d'Ethereum, les lignes de métro fonctionnent séparément du trafic en surface.

### <Emoji text="🚧" /> Réseaux de test couramment utilisés et anciens {#common-and-legacy-testnets}

- **Sepolia** - Un quartier d'Athènes, en Grèce, desservi par le métro. Actuellement utilisé pour les tests de contrats intelligents et de dapps.
- **Hoodi** - Nommé d'après la station de métro Hoodi à Bangalore, en Inde. Utilisé pour les tests des validateurs et des mises à niveau du protocole.
- **Goerli** _(déprécié)_ - Nommé d'après la gare de Görlitz (Görlitzer Bahnhof) à Berlin, en Allemagne.
- **Rinkeby** _(déprécié)_ - Nommé d'après une banlieue de Stockholm qui possède une station de métro.
- **Ropsten** _(déprécié)_ - Fait référence à un quartier et à un ancien terminal de ferry/métro à Stockholm.
- **Kovan** _(déprécié)_ - Nommé d'après une station de MRT à Singapour.
- **Morden** _(déprécié)_ - Nommé d'après une station du métro de Londres. Premier réseau de test public d'Ethereum.

### <Emoji text="🧪" /> Autres réseaux de test spécialisés {#other-testnets}

Certains réseaux de test ont été créés pour des tests à court terme ou spécifiques à une mise à niveau et ne sont pas nécessairement sur le thème du métro :

- **Holesky** _(déprécié)_ - Nommé d'après la station Holešovice à Prague. Utilisé pour les tests de validateurs ; déprécié en 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(tous dépréciés)_ et **Ephemery** - Conçus spécialement pour les simulations de mises à niveau comme La Fusion, Shanghai ou les expérimentations de validateurs. Certains noms sont régionaux ou thématiques plutôt que basés sur des stations de métro.

L'utilisation de noms de stations de métro aide les développeurs à identifier et à mémoriser rapidement les réseaux de test sans avoir à se fier à des ID de chaîne numériques. Cela reflète également la culture d'Ethereum : pratique, globale et centrée sur l'humain.

## Outils connexes {#related-tools}

- [Chainlist](https://chainlist.org/) _liste des réseaux EVM pour connecter les portefeuilles et les fournisseurs aux ID de chaîne et de réseau appropriés_
- [Chaînes basées sur l'EVM](https://github.com/ethereum-lists/chains) _dépôt GitHub de métadonnées de chaînes qui alimente Chainlist_

## En savoir plus {#further-reading}

- [Proposition : Cycle de vie prévisible des réseaux de test Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [L'évolution des réseaux de test d'Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
