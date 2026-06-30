---
title: "Réseaux"
description: "Un aperçu des réseaux d'Ethereum et où obtenir de l'ether (ETH) de réseau de test pour tester votre application."
lang: fr
---

Les réseaux [Ethereum](/) sont des groupes d'ordinateurs connectés qui communiquent en utilisant le protocole Ethereum. Il n'y a qu'un seul réseau principal Ethereum, mais des réseaux indépendants conformes aux mêmes règles de protocole peuvent être créés à des fins de test et de développement. Il existe de nombreux « réseaux » indépendants qui se conforment au protocole sans interagir les uns avec les autres. Vous pouvez même en démarrer un localement sur votre propre ordinateur pour tester vos contrats intelligents et vos applications Web3.

Votre compte Ethereum fonctionnera sur les différents réseaux, mais le solde de votre compte et l'historique de vos transactions ne seront pas transférés depuis le réseau principal Ethereum. À des fins de test, il est utile de savoir quels réseaux sont disponibles et comment obtenir de l'ETH de réseau de test pour faire des essais. En général, pour des raisons de sécurité, il n'est pas recommandé de réutiliser des comptes du Réseau principal sur des réseaux de test ou vice versa.

## Prérequis {#prerequisites}

Vous devriez comprendre les [bases d'Ethereum](/developers/docs/intro-to-ethereum/) avant de vous renseigner sur les différents réseaux, car les réseaux de test vous donneront une version d'Ethereum peu coûteuse et sûre pour faire des essais.

## Réseaux publics {#public-networks}

Les réseaux publics sont accessibles à toute personne dans le monde disposant d'une connexion Internet. N'importe qui peut lire ou créer des transactions sur une chaîne de blocs publique et valider les transactions en cours d'exécution. Le consensus entre les pairs décide de l'inclusion des transactions et de l'état du réseau.

### Réseau principal Ethereum {#ethereum-mainnet}

Le Réseau principal est la principale chaîne de blocs de production publique d'Ethereum, où les transactions de valeur réelle se produisent sur le registre distribué.

Lorsque les gens et les plateformes d'échange discutent des prix de l'ETH, ils parlent de l'ETH du Réseau principal.

### Réseaux de test Ethereum {#ethereum-testnets}

En plus du Réseau principal, il existe des réseaux de test publics. Ce sont des réseaux utilisés par les développeurs de protocoles ou les développeurs de contrats intelligents pour tester à la fois les mises à niveau du protocole ainsi que les contrats intelligents potentiels dans un environnement de type production avant le déploiement sur le Réseau principal. Considérez cela comme un analogue aux serveurs de production par rapport aux serveurs de préproduction.

Vous devriez tester tout code de contrat que vous écrivez sur un réseau de test avant de le déployer sur le Réseau principal. Parmi les applications décentralisées (dapps) qui s'intègrent aux contrats intelligents existants, la plupart des projets ont des copies déployées sur des réseaux de test.

La plupart des réseaux de test ont commencé par utiliser un mécanisme de consensus de preuve d'autorité (PoA) à permission. Cela signifie qu'un petit nombre de nœuds sont choisis pour valider les transactions et créer de nouveaux blocs – en mettant en jeu leur identité dans le processus. Alternativement, certains réseaux de test disposent d'un mécanisme de consensus de preuve d'enjeu (PoS) ouvert où tout le monde peut tester l'exécution d'un validateur, tout comme sur le réseau principal Ethereum.

L'ETH sur les réseaux de test est censé n'avoir aucune valeur réelle ; cependant, des marchés ont été créés pour certains types d'ETH de réseau de test qui sont devenus rares ou difficiles à obtenir. Puisque vous avez besoin d'ETH pour interagir réellement avec Ethereum (même sur les réseaux de test), la plupart des gens obtiennent gratuitement de l'ETH de réseau de test à partir de faucets. La plupart des faucets sont des applications web où vous pouvez saisir une adresse à laquelle vous demandez que de l'ETH soit envoyé.

#### Quel réseau de test dois-je utiliser ? {#which-testnet-should-i-use}

Les deux réseaux de test publics que les développeurs de clients maintiennent actuellement sont Sepolia et Hoodi. Sepolia est un réseau permettant aux développeurs de contrats et d'applications de tester leurs applications. Le réseau Hoodi permet aux développeurs de protocoles de tester les mises à niveau du réseau, et permet aux stakers de tester l'exécution de validateurs.

#### Sepolia {#sepolia}

**Sepolia est le réseau de test par défaut recommandé pour le développement d'applications**. Le réseau Sepolia utilise un ensemble de validateurs à permission contrôlé par les équipes de clients et de test.

##### Ressources

- [Site web](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucets

- [Faucet Sepolia d'Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Faucet Sepolia de Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Faucet Sepolia de Chainstack](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Faucet de l'écosystème Ethereum](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [Faucet Sepolia d'ethfaucet.com](https://ethfaucet.com/networks/ethereum)
- [Faucet Sepolia de Google Cloud Web3](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Faucet Sepolia d'Infura](https://www.infura.io/faucet)
- [Faucet PoW](https://sepolia-faucet.pk910.de/)
- [Faucet Sepolia de QuickNode](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi est un réseau de test pour tester la validation et le staking. Le réseau Hoodi est ouvert aux utilisateurs souhaitant exécuter un validateur de réseau de test. Les stakers souhaitant tester les mises à niveau du protocole avant qu'elles ne soient déployées sur le Réseau principal devraient donc utiliser Hoodi.

- Ensemble de validateurs ouvert, les stakers peuvent tester les mises à niveau du réseau
- État volumineux, utile pour tester des interactions complexes de contrats intelligents
- Plus long à synchroniser et nécessite plus de stockage pour exécuter un nœud

##### Ressources

- [Site web](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorateur](https://explorer.hoodi.ethpandaops.io/)
- [Synchronisation de point de contrôle](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Faucets

- [Faucet Hoodi de Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Faucet Hoodi](https://hoodi.ethpandaops.io/)
- [Faucet PoW](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery est un type unique de réseau de test qui se réinitialise complètement chaque mois. L'état d'exécution et de consensus revient à la genèse tous les 28 jours, ce qui signifie que tout ce qui se passe sur le réseau de test est éphémère. Cela le rend idéal pour des tests à court terme, un amorçage rapide de nœud et des applications de type « hello world » qui n'ont pas besoin de permanence.

- État toujours frais, tests à court terme de validateurs et d'applications
- Comprend uniquement un ensemble de base de contrats
- Ensemble de validateurs ouvert et accès facile à de grandes quantités de fonds
- Exigences de nœud les plus faibles et synchronisation la plus rapide, &lt;5 Go en moyenne

##### Ressources

- [Site web](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [Chat de la communauté](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Explorateur Beacon](https://beaconlight.ephemery.dev/)
- [Synchronisation de point de contrôle](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Faucets {#faucets}

- [Faucet Bordel](https://faucet.bordel.wtf/)
- [Faucet PoW Pk910](https://ephemery-faucet.pk910.de/)

#### Holesky (obsolète) {#holesky}

Le réseau de test Holesky est obsolète depuis septembre 2025. Les opérateurs de staking et les fournisseurs d'infrastructure devraient plutôt utiliser Hoodi pour les tests de validateurs.

- [Annonce de l'arrêt du réseau de test Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _Blog de l'EF, 1er septembre 2025_
- [Mises à jour des réseaux de test Holesky et Hoodi](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _Blog de l'EF, 18 mars 2025_

### Réseaux de test de couche 2 {#layer-2-testnets}

La [couche 2 (l2)](/layer-2/) est un terme collectif pour décrire un ensemble spécifique de solutions de mise à l'échelle d'Ethereum. Une couche 2 est une chaîne de blocs distincte qui étend Ethereum et hérite des garanties de sécurité d'Ethereum. Les réseaux de test de couche 2 sont généralement étroitement couplés aux réseaux de test publics d'Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Un réseau de test pour [Arbitrum](https://arbitrum.io/).

##### Ressources

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucets

- [Faucet Arbitrum Sepolia d'Alchemy](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Faucet Arbitrum Sepolia de Chainlink](https://faucets.chain.link/arbitrum-sepolia)
- [Faucet Arbitrum Sepolia d'ethfaucet.com](https://ethfaucet.com/networks/arbitrum)
- [Faucet Arbitrum Sepolia de QuickNode](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Un réseau de test pour [Optimism](https://www.optimism.io/).

##### Ressources

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucets

- [Faucet d'Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [Faucet de Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Faucet Optimism Sepolia d'ethfaucet.com](https://ethfaucet.com/networks/optimism)
- [Faucet de réseau de test](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Un réseau de test pour [Starknet](https://www.starknet.io).

##### Ressources

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### Faucets

- [Faucet d'Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [Faucet Starknet Sepolia de Blast](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Faucet Starknet](https://starknet-faucet.vercel.app/)

## Réseaux privés {#private-networks}

Un réseau Ethereum est un réseau privé si ses nœuds ne sont pas connectés à un réseau public (c'est-à-dire le Réseau principal ou un réseau de test). Dans ce contexte, privé signifie uniquement réservé ou isolé, plutôt que protégé ou sécurisé.

### Réseaux de développement {#development-networks}

Pour développer une application Ethereum, vous voudrez l'exécuter sur un réseau privé pour voir comment elle fonctionne avant de la déployer. De la même manière que vous créez un serveur local sur votre ordinateur pour le développement web, vous pouvez créer une instance locale de chaîne de blocs pour tester votre dapp. Cela permet une itération beaucoup plus rapide qu'un réseau de test public.

Il existe des projets et des outils dédiés pour vous y aider. Apprenez-en plus sur les [réseaux de développement](/developers/docs/development-networks/).

### Réseaux de consortium {#consortium-networks}

Le processus de consensus est contrôlé par un ensemble prédéfini de nœuds de confiance. Par exemple, un réseau privé d'institutions universitaires connues qui gouvernent chacune un seul nœud, et les blocs sont validés par un seuil de signataires au sein du réseau.

Si un réseau Ethereum public est comme l'Internet public, un réseau de consortium est comme un intranet privé.

## <Emoji text="🚉" /> Pourquoi les réseaux de test Ethereum portent-ils le nom de stations de métro ? {#why-naming}

De nombreux réseaux de test Ethereum portent le nom de stations de métro ou de gares du monde réel. Cette tradition de nommage a commencé tôt et reflète les villes mondiales où les contributeurs ont vécu ou travaillé. C'est symbolique, mémorable et pratique. Tout comme les réseaux de test sont isolés du réseau principal Ethereum, les lignes de métro circulent séparément du trafic de surface.

### <Emoji text="🚧" /> Réseaux de test couramment utilisés et obsolètes {#common-and-legacy-testnets}

- **Sepolia** - Un quartier relié au métro à Athènes, en Grèce. Actuellement utilisé pour les tests de contrats intelligents et de dapps.
- **Hoodi** - Nommé d'après la station de métro Hoodi à Bengaluru, en Inde. Utilisé pour les tests de validateurs et de mises à niveau du protocole.
- **Goerli** _(obsolète)_ - Nommé d'après la Görlitzer Bahnhof à Berlin, en Allemagne.
- **Rinkeby** _(obsolète)_ - Nommé d'après une banlieue de Stockholm dotée d'une station de métro.
- **Ropsten** _(obsolète)_ - Fait référence à une zone et à un ancien terminal de ferry/métro à Stockholm.
- **Kovan** _(obsolète)_ - Nommé d'après une station de MRT de Singapour.
- **Morden** _(obsolète)_ - Nommé d'après une station du métro de Londres. Le premier réseau de test public d'Ethereum.

### <Emoji text="🧪" /> Autres réseaux de test spécialisés {#other-testnets}

Certains réseaux de test ont été créés pour des tests à court terme ou spécifiques à une mise à niveau et n'ont pas nécessairement pour thème le métro :

- **Holesky** _(obsolète)_ - Nommé d'après la station Holešovice à Prague. Utilisé pour les tests de validateurs ; obsolète en 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(tous obsolètes)_ et **Ephemery** - Conçus spécifiquement pour des simulations de mise à niveau comme La Fusion, Shanghai, ou des expériences de validateurs. Certains noms sont régionaux ou thématiques plutôt que basés sur le métro.

L'utilisation de noms de stations de métro aide les développeurs à identifier et à mémoriser rapidement les réseaux de test sans avoir besoin de s'appuyer sur des identifiants de chaîne numériques. Cela reflète également la culture d'Ethereum : pratique, mondiale et centrée sur l'humain.

## Outils connexes {#related-tools}

- [Chainlist](https://chainlist.org/) _liste des réseaux EVM pour connecter les portefeuilles et les fournisseurs à l'identifiant de chaîne et à l'identifiant de réseau appropriés_
- [Chaînes basées sur l'EVM](https://github.com/ethereum-lists/chains) _dépôt GitHub de métadonnées de chaîne qui alimente Chainlist_

## Complément d'information {#further-reading}

- [Proposition : Cycle de vie prévisible des réseaux de test Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [L'évolution des réseaux de test Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
