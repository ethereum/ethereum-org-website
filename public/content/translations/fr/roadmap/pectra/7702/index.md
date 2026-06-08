---
title: Pectra 7702
metaTitle: Directives Pectra 7702
description: En savoir plus sur 7702 dans la mise à jour Pectra
lang: fr
---

## Résumé {#abstract}

L'EIP-7702 définit un mécanisme pour ajouter du code à un EOA. Cette proposition permet aux EOA, les comptes Ethereum historiques, de recevoir des améliorations de fonctionnalités à court terme, augmentant ainsi la convivialité des applications. Cela se fait en définissant un pointeur vers un code déjà déployé en utilisant un nouveau type de transaction : 4.

Ce nouveau type de transaction introduit une liste d'autorisations. Chaque tuple d'autorisation dans la liste est défini comme suit :

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** est la délégation (le bytecode déjà déployé qui sera utilisé par l'EOA)
**chain_id** verrouille l'autorisation sur une chaîne spécifique (ou 0 pour toutes les chaînes)
**nonce** verrouille l'autorisation sur un nonce de compte spécifique
(**y_parity, r, s**) est la signature du tuple d'autorisation, définie comme keccak(0x05 || rlp ([chain_id, address, nonce])) par la clé privée de l'EOA auquel l'autorisation s'applique (également appelé l'autorité)

Une délégation peut être réinitialisée en déléguant à l'adresse nulle.

La clé privée de l'EOA conserve le contrôle total sur le compte après la délégation. Par exemple, déléguer à un Safe ne transforme pas le compte en un multisig car il y a toujours une seule clé qui peut contourner toute politique de signature. À l'avenir, les développeurs devraient concevoir en partant du principe que tout participant au système pourrait être un contrat intelligent. Pour les développeurs de contrats intelligents, il n'est plus sûr de supposer que `tx.origin` fait référence à un EOA.

## Bonnes pratiques {#best-practices}

**Abstraction de compte** : Un contrat de délégation devrait s'aligner sur les normes plus larges d'abstraction de compte (AA) d'Ethereum pour maximiser la compatibilité. En particulier, il devrait idéalement être conforme ou compatible avec l'ERC-4337.

**Conception sans permission et résistante à la censure** : Ethereum valorise la participation sans permission. Un contrat de délégation NE DOIT PAS coder en dur ou s'appuyer sur un seul relayeur ou service « de confiance ». Cela bloquerait le compte si le relayeur se déconnecte. Des fonctionnalités telles que le traitement par lots (par exemple, approve+transferFrom) peuvent être utilisées par l'EOA lui-même sans relayeur. Pour les développeurs d'applications qui souhaitent utiliser les fonctionnalités avancées permises par 7702 (abstraction du gaz, retraits préservant la confidentialité), vous aurez besoin d'un relayeur. Bien qu'il existe différentes architectures de relayeurs, notre recommandation est d'utiliser des [assembleurs 4337](https://www.erc4337.io/bundlers) pointant au moins vers le [point d'entrée 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) car :

- Ils fournissent des interfaces standardisées pour le relais
- Ils incluent des systèmes de paymaster intégrés
- Ils assurent une compatibilité ascendante
- Ils peuvent prendre en charge la résistance à la censure via une [mempool publique](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Ils peuvent exiger que la fonction d'initialisation ne soit appelée que depuis [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

En d'autres termes, n'importe qui devrait pouvoir agir en tant que sponsor/relayeur de transaction tant qu'il fournit la signature valide requise ou l'opération d'utilisateur (UserOperation) du compte. Cela garantit la résistance à la censure : si aucune infrastructure personnalisée n'est requise, les transactions d'un utilisateur ne peuvent pas être bloquées arbitrairement par un relais de contrôle d'accès. Par exemple, le [Delegation Toolkit de MetaMask](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) fonctionne explicitement avec n'importe quel assembleur ERC-4337 ou paymaster sur n'importe quelle chaîne, plutôt que de nécessiter un serveur spécifique à MetaMask.

**Intégration des applications décentralisées (dapps) via les interfaces de portefeuille** :

Étant donné que les portefeuilles mettront sur liste blanche des contrats de délégation spécifiques pour l'EIP-7702, les dapps ne devraient pas s'attendre à demander directement des autorisations 7702. Au lieu de cela, l'intégration devrait se faire via des interfaces de portefeuille standardisées :

- **ERC-5792 (`wallet_sendCalls`)** : Permet aux dapps de demander aux portefeuilles d'exécuter des appels groupés, facilitant des fonctionnalités telles que le traitement par lots des transactions et l'abstraction du gaz.

- **ERC-6900** : Permet aux dapps de tirer parti des capacités modulaires des comptes intelligents, telles que les clés de session et la récupération de compte, via des modules gérés par le portefeuille.

En utilisant ces interfaces, les dapps peuvent accéder aux fonctionnalités de compte intelligent fournies par l'EIP-7702 sans gérer directement les délégations, garantissant ainsi la compatibilité et la sécurité entre les différentes implémentations de portefeuilles.

> Remarque : Il n'existe pas de méthode standardisée permettant aux dapps de demander directement des signatures d'autorisation 7702. Les dapps doivent s'appuyer sur des interfaces de portefeuille spécifiques comme l'ERC-6900 pour tirer parti des fonctionnalités de l'EIP-7702.

Pour plus d'informations :

- [Spécification de l'ERC-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [Spécification de l'ERC-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Éviter la dépendance exclusive à un fournisseur** : Dans la lignée de ce qui précède, une bonne implémentation est neutre vis-à-vis des fournisseurs et interopérable. Cela signifie souvent adhérer aux normes émergentes pour les comptes intelligents. Par exemple, le [Modular Account d'Alchemy](https://github.com/alchemyplatform/modular-account) utilise la norme ERC-6900 pour les comptes intelligents modulaires et est conçu dans une optique d'« utilisation interopérable sans permission ».

**Préservation de la confidentialité** : Bien que la confidentialité onchain soit limitée, un contrat de délégation devrait s'efforcer de minimiser l'exposition des données et la possibilité de les relier. Cela peut être réalisé en prenant en charge des fonctionnalités telles que les paiements de gaz en jetons ERC-20 (afin que les utilisateurs n'aient pas besoin de maintenir un solde public en ETH, ce qui améliore la confidentialité et l'expérience utilisateur) et les clés de session à usage unique (qui réduisent la dépendance à une seule clé à long terme). Par exemple, l'EIP-7702 permet de payer le gaz en jetons via des transactions sponsorisées, et une bonne implémentation facilitera l'intégration de tels paymasters sans divulguer plus d'informations que nécessaire. De plus, la délégation hors chaîne de certaines approbations (en utilisant des signatures qui sont vérifiées onchain) signifie moins de transactions onchain avec la clé principale de l'utilisateur, ce qui favorise la confidentialité. Les comptes qui nécessitent l'utilisation d'un relayeur forcent les utilisateurs à révéler leurs adresses IP. Les mempools publiques améliorent cela : lorsqu'une transaction ou une opération d'utilisateur se propage à travers la mempool, il est impossible de dire si elle provient de l'IP qui l'a envoyée, ou si elle a simplement été relayée par celle-ci via le protocole p2p.

**Extensibilité et sécurité modulaire** : Les implémentations de compte devraient être extensibles afin de pouvoir évoluer avec de nouvelles fonctionnalités et améliorations de sécurité. La capacité de mise à niveau est intrinsèquement possible avec l'EIP-7702 (puisqu'un EOA peut toujours déléguer à un nouveau contrat à l'avenir pour mettre à niveau sa logique). Au-delà de la capacité de mise à niveau, une bonne conception permet la modularité – par exemple, des modules enfichables pour différents schémas de signature ou politiques de dépenses – sans avoir besoin de tout redéployer. L'Account Kit d'Alchemy en est un parfait exemple, permettant aux développeurs d'installer des modules de validation (pour différents types de signature comme ECDSA, BLS, etc.) et des modules d'exécution pour une logique personnalisée. Pour obtenir une plus grande flexibilité et sécurité dans les comptes compatibles avec l'EIP-7702, les développeurs sont encouragés à déléguer à un contrat proxy plutôt que directement à une implémentation spécifique. Cette approche permet des mises à niveau transparentes et une modularité sans nécessiter d'autorisations EIP-7702 supplémentaires pour chaque changement.

Avantages du modèle Proxy :

- **Capacité de mise à niveau** : Mettez à jour la logique du contrat en faisant pointer le proxy vers un nouveau contrat d'implémentation.

- **Logique d'initialisation personnalisée** : Incorporez des fonctions d'initialisation au sein du proxy pour configurer les variables d'état nécessaires de manière sécurisée.

Par exemple, le [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) démontre comment un proxy peut être utilisé pour initialiser et gérer de manière sécurisée les délégations dans les comptes compatibles avec l'EIP-7702.

Inconvénients du modèle Proxy :

- **Dépendance envers des acteurs externes** : Vous devez vous fier à une équipe externe pour ne pas effectuer de mise à niveau vers un contrat non sécurisé.

## Considérations de sécurité {#security-considerations}

**Protection contre la réentrance** : Avec l'introduction de la délégation EIP-7702, le compte d'un utilisateur peut basculer dynamiquement entre un compte détenu par un tiers (EOA) et un contrat intelligent (SC). Cette flexibilité permet au compte à la fois d'initier des transactions et d'être la cible d'appels. Par conséquent, les scénarios où un compte s'appelle lui-même et effectue des appels externes auront `msg.sender` égal à `tx.origin`, ce qui compromet certaines hypothèses de sécurité qui reposaient auparavant sur le fait que `tx.origin` était toujours un EOA.

Pour les développeurs de contrats intelligents, il n'est plus sûr de supposer que `tx.origin` fait référence à un EOA. De même, l'utilisation de `msg.sender == tx.origin` comme mesure de protection contre les attaques de réentrance n'est plus une stratégie fiable.

À l'avenir, les développeurs devraient concevoir en partant du principe que tout participant au système pourrait être un contrat intelligent. Alternativement, ils pourraient implémenter une protection explicite contre la réentrance en utilisant des protections contre la réentrance avec des modèles de modificateurs `nonReentrant`. Nous recommandons de suivre un modificateur audité, par exemple la [protection contre la réentrance d'OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Ils pourraient également utiliser une [variable de stockage transitoire](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Considérations de sécurité liées à l'initialisation**

L'implémentation de contrats de délégation EIP-7702 introduit des défis de sécurité spécifiques, en particulier concernant le processus d'initialisation. Une vulnérabilité critique survient lorsque la fonction d'initialisation (`init`) est couplée de manière atomique au processus de délégation. Dans de tels cas, un attaquant par anticipation (frontrunner) pourrait intercepter la signature de délégation et exécuter la fonction `init` avec des paramètres modifiés, prenant potentiellement le contrôle du compte.

Ce risque est particulièrement pertinent lorsque l'on tente d'utiliser des implémentations existantes de comptes intelligents (SCA) avec l'EIP-7702 sans modifier leurs mécanismes d'initialisation.

**Solutions pour atténuer les vulnérabilités d'initialisation**

- Implémenter `initWithSig`  
  Remplacez la fonction standard `init` par une fonction `initWithSig` qui exige que l'utilisateur signe les paramètres d'initialisation. Cette approche garantit que l'initialisation ne peut se poursuivre qu'avec le consentement explicite de l'utilisateur, atténuant ainsi les risques d'initialisation non autorisée.

- Utiliser l'EntryPoint de l'ERC-4337  
  Exigez que la fonction d'initialisation soit appelée exclusivement depuis le contrat EntryPoint de l'ERC-4337. Cette méthode tire parti du cadre de validation et d'exécution standardisé fourni par l'ERC-4337, ajoutant une couche de sécurité supplémentaire au processus d'initialisation.  
  _(Voir : [Documentation Safe](https://docs.safe.global/advanced/eip-7702/7702-safe))_

En adoptant ces solutions, les développeurs peuvent améliorer la sécurité des contrats de délégation EIP-7702, en se prémunissant contre les attaques potentielles par anticipation (frontrunning) pendant la phase d'initialisation.

**Collisions de stockage** : Déléguer du code n'efface pas le stockage existant. Lors de la migration d'un contrat de délégation à un autre, les données résiduelles du contrat précédent demeurent. Si le nouveau contrat utilise les mêmes créneaux de stockage mais les interprète différemment, cela peut provoquer un comportement inattendu. Par exemple, si la délégation initiale était vers un contrat où un créneau de stockage représente un `bool`, et que la délégation suivante est vers un contrat où le même créneau représente un `uint`, l'incompatibilité peut conduire à des résultats imprévisibles.

**Risques d'hameçonnage** : Avec l'implémentation de la délégation EIP-7702, les actifs du compte d'un utilisateur peuvent être entièrement contrôlés par des contrats intelligents. Si un utilisateur délègue sans le savoir son compte à un contrat malveillant, un attaquant pourrait facilement en prendre le contrôle et voler des fonds. Lors de l'utilisation de `chain_id=0`, la délégation est appliquée à tous les identifiants de chaîne (chain ids). Ne déléguez qu'à un contrat immuable (ne déléguez jamais à un proxy), et uniquement à des contrats qui ont été déployés en utilisant CREATE2 (avec un initcode standard - pas de contrats métamorphiques) afin que le déployeur ne puisse pas déployer quelque chose de différent à la même adresse ailleurs. Sinon, votre délégation met votre compte en danger sur toutes les autres chaînes EVM.

Lorsque les utilisateurs effectuent des signatures déléguées, le contrat cible recevant la délégation doit être affiché de manière claire et bien visible pour aider à atténuer les risques d'hameçonnage.

**Surface de confiance minimale et sécurité** : Tout en offrant de la flexibilité, un contrat de délégation devrait garder sa logique de base minimale et auditable. Le contrat est effectivement une extension de l'EOA de l'utilisateur, donc toute faille peut être catastrophique. Les implémentations devraient suivre les bonnes pratiques de la communauté de sécurité des contrats intelligents. Par exemple, les fonctions de constructeur ou d'initialisation doivent être soigneusement sécurisées – comme souligné par Alchemy, si l'on utilise un modèle proxy sous 7702, un initialiseur non protégé pourrait permettre à un attaquant de prendre le contrôle du compte. Les équipes devraient s'efforcer de garder le code onchain simple : le contrat 7702 d'Ambire ne fait qu'environ 200 lignes de Solidity, minimisant délibérément la complexité pour réduire les bugs. Un équilibre doit être trouvé entre une logique riche en fonctionnalités et la simplicité qui facilite l'audit.

### Implémentations connues {#known-implementations}

En raison de la nature de l'EIP-7702, il est recommandé aux portefeuilles de faire preuve de prudence lorsqu'ils aident les utilisateurs à déléguer à un contrat tiers. Vous trouverez ci-dessous une collection d'implémentations connues qui ont été auditées :

| Adresse du contrat                         | Source                                                                                                                                     | Audits                                                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                      | [audits](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                      | [audits](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)              | [audits](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                          | [audits](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Équipe AA de la Fondation Ethereum](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [audits](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                      | [audits](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Lignes directrices pour les portefeuilles matériels {#hardware-wallet-guidelines}

Les portefeuilles matériels ne devraient pas exposer de délégation arbitraire. Le consensus dans l'espace des portefeuilles matériels est d'utiliser une liste de contrats de délégation de confiance. Nous suggérons d'autoriser les implémentations connues énumérées ci-dessus et d'en considérer d'autres au cas par cas. Étant donné que la délégation de votre EOA à un contrat donne le contrôle sur tous les actifs, les portefeuilles matériels doivent être prudents dans la façon dont ils implémentent 7702.

### Scénarios d'intégration pour les applications compagnons {#integration-scenarios-for-companion-apps}

#### Passif {#lazy}

Comme l'EOA fonctionne toujours comme d'habitude, il n'y a rien à faire.

Remarque : certains actifs pourraient être automatiquement rejetés par le code de délégation, tels que les NFT ERC-1155, et le support devrait en être conscient.

#### Informé {#aware}

Informer l'utilisateur qu'une délégation est en place pour l'EOA en vérifiant son code, et proposer éventuellement de supprimer la délégation.

#### Délégation commune {#common-delegation}

Le fournisseur de matériel met sur liste blanche les contrats de délégation connus et implémente leur prise en charge dans l'application logicielle compagnon. Il est recommandé de choisir un contrat avec une prise en charge complète de l'ERC-4337.

Les EOA délégués à un contrat différent seront traités comme des EOA standards.

#### Délégation personnalisée {#custom-delegation}

Le fournisseur de matériel implémente son propre contrat de délégation, l'ajoute aux listes et implémente sa prise en charge dans l'application logicielle compagnon. Il est recommandé de créer un contrat avec une prise en charge complète de l'ERC-4337.

Les EOA délégués à un contrat différent seront traités comme des EOA standards.