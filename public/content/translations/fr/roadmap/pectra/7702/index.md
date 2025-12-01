---
title: Directives Pectra 7702
description: En savoir plus sur la 7702 dans la publication de Pectra
lang: fr
---

# Pectra 7702

## Résumé {#abstract}

L’EIP 7702 définit un mécanisme permettant d’ajouter du code à un EOA. Cette proposition permet aux EOA, les anciens comptes Ethereum, de bénéficier d'améliorations de fonctionnalités à court terme, augmentant la convivialité des applications. Cela se fait en définissant un pointeur vers du code déjà déployé à l’aide d’un nouveau type de transaction : 4.

Ce nouveau type de transaction introduit une liste d’autorisation. Chaque tuple d’autorisation dans la liste est défini comme

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** désigne la délégation (le bytecode déjà déployé qui sera utilisé par l’EOA)
**chain_id** restreint l’autorisation à une chaîne spécifique (ou à 0 pour toutes les chaînes)
**nonce** limite l’autorisation à un nonce spécifique du compte
(**y_parity, r, s**) est la signature du tuple d’autorisation, définie comme keccak(0x05 || rlp([chain_id, address, nonce])) signée avec la clé privée de l’EOA concerné (également appelé l’autorité)

Une délégation peut être réinitialisée en la redirigeant vers l’adresse nulle.

La clé privée de l’EOA conserve un contrôle total sur le compte après la délégation. Par exemple, la délégation à un coffre-fort ne fait pas du compte un multisig car il existe toujours une clé unique qui peut contourner toute politique de signature. À l’avenir, les développeurs devraient concevoir leurs applications en partant du principe que tout participant dans le système pourrait être un contrat intelligent. Pour les développeurs de contrats intelligents, il n’est plus sûr de supposer que `tx.origin` fait référence à un EOA.

## Bonnes pratiques {#best-practices}

**Abstraction de compte** : un contrat de délégation devrait être conforme aux normes plus larges de l’abstraction de compte (AA) d’Ethereum afin de maximiser la compatibilité. En particulier, il devrait idéalement être conforme ou compatible avec l’ERC-4337.

**Conception sans autorisation et résistante à la censure** : Ethereum valorise la participation sans autorisation. Un contrat de délégation NE DOIT PAS coder en dur ni dépendre d’un seul relai ou service « de confiance ». Cela rendrait le compte inutilisable si le relai devenait indisponible. Des fonctionnalités comme le regroupement (par exemple, _approve + transferFrom_) peuvent être utilisées directement par l’EOA lui-même, sans passer par un relai. Pour les développeurs d'applications souhaitant utiliser les fonctionnalités avancées permises par 7702 (abstraction du gaz, retraits préservant la confidentialité), un relais sera nécessaire. Bien qu’il existe différentes architectures de relais, nous recommandons d’utiliser des [bundlers 4337](https://www.erc4337.io/bundlers) pointant au minimum vers [le point d'entrée 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0), car :

- Ils offrent des interfaces standardisées pour le relais
- Incluent des systèmes de trésorier intégrés
- Garantissent la compatibilité avec les versions futures
- Peuvent assurer une résistance à la censure grâce à un [mempool public](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Peuvent exiger que la fonction `init` ne soit appelée que depuis [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

Autrement dit, n’importe qui devrait pouvoir agir en tant que sponsor ou relai de la transaction, tant qu’il fournit la signature valide requise ou une UserOperation émise par le compte. Cela garantit une résistance à la censure : si aucune infrastructure personnalisée n’est nécessaire, les transactions d’un utilisateur ne peuvent pas être bloquées arbitrairement par un relai faisant office de gardien. Par exemple, le [Delegation Toolkit de MetaMask](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) fonctionne explicitement avec n’importe quel bundler ou paymaster compatible ERC-4337, sur n’importe quelle chaîne, sans nécessiter de serveur spécifique à MetaMask.

**Intégration des dApps via les interfaces de portefeuille** :

Étant donné que les portefeuilles vont approuver une liste spécifique de contrats de délégation pour l’EIP-7702, les dApps ne doivent pas s’attendre à pouvoir demander directement des autorisations 7702. À la place, l’intégration doit se faire via des interfaces de portefeuille standardisées :

- **ERC-5792 (`wallet_sendCalls`)** : permet aux dApps de demander aux portefeuilles d’exécuter des appels groupés, facilitant des fonctionnalités comme le regroupement de transactions et l’abstraction du gaz.

- **ERC-6900** : permet aux dApps de tirer parti des fonctionnalités modulaires des comptes intelligents, comme les clés de session et la récupération de compte, via des modules gérés par le portefeuille.

En utilisant ces interfaces, les dApps peuvent accéder aux fonctionnalités des comptes intelligents offertes par l’EIP-7702 sans avoir à gérer directement les délégations, garantissant ainsi compatibilité et sécurité entre différentes implémentations de portefeuilles.

> Remarque : Il n’existe actuellement aucune méthode standardisée permettant aux dApps de demander directement des signatures d’autorisation 7702. Les dApps doivent s’appuyer sur des interfaces spécifiques de portefeuille, comme l’ERC-6900, pour tirer parti des fonctionnalités de l’EIP-7702.

Pour plus d'informations :

- [Spécification ERC-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [Spécification ERC-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Éviter l’enfermement propriétaire** : Dans le prolongement de ce qui précède, une bonne implémentation doit être neutre vis-à-vis des fournisseurs et interopérable. Cela implique souvent de suivre les normes émergentes pour les comptes intelligents. Par exemple, le [compte modulaire d’Alchemy](https://github.com/alchemyplatform/modular-account) utilise la norme ERC-6900 pour les comptes intelligents modulaires et est conçu dans une optique d’usage interopérable et sans autorisation.

**Préservation de la vie privée** : Bien que la confidentialité onchain soit limitée, un contrat de délégation devrait s’efforcer de minimiser l’exposition des données et leur traçabilité. Cela peut être réalisé en prenant en charge des fonctionnalités telles que le paiement du gaz en jetons ERC-20 (ce qui permet aux utilisateurs de ne pas avoir à maintenir un solde public en ETH, améliorant ainsi la confidentialité et l’expérience utilisateur) et les clés de session à usage unique (réduisant la dépendance à une seule clé à long terme). Par exemple, l’EIP-7702 permet de payer le gaz en jetons via des transactions sponsorisées, et une bonne implémentation facilitera l’intégration de tels trésoriers sans divulguer plus d’informations que nécessaire. De plus, la délégation hors chaîne de certaines autorisations (au moyen de signatures vérifiées sur la blockchain) permet de réduire le nombre de transactions onchain effectuées avec la clé principale de l’utilisateur, ce qui renforce la confidentialité. Les comptes nécessitant l’utilisation d’un relai obligent les utilisateurs à révéler leur adresse IP. Les Mempools Publics améliorent cette situation : lorsqu’une transaction/UserOp se propage dans la mempool, il est impossible de savoir si elle provient de l’adresse IP qui l’a envoyée ou si elle a simplement été relayée via le protocole pair-à-pair.

**Extensibilité et sécurité modulaire** : les implémentations de comptes doivent être extensibles afin de pouvoir évoluer avec de nouvelles fonctionnalités et des améliorations de sécurité. La possibilité de mise à jour est intrinsèquement offerte par l’EIP-7702 (puisqu’un EOA peut toujours déléguer à un nouveau contrat à l’avenir pour faire évoluer sa logique). Au-delà de la possibilité de mise à jour, une bonne conception permet la modularité – par exemple, l’ajout de modules plug-in pour différentes méthodes de signature ou politiques de dépense – sans nécessiter un redéploiement complet. Le kit Account d’Alchemy en est un excellent exemple, permettant aux développeurs d’ajouter des modules de validation (pour différents types de signatures comme ECDSA, BLS, etc.) ainsi que des modules d’exécution pour une logique personnalisée. Pour offrir plus de flexibilité et de sécurité aux comptes compatibles avec l’EIP-7702, il est recommandé aux développeurs de déléguer à un contrat proxy plutôt que directement à une implémentation spécifique. Cette approche permet des mises à jour et une modularité transparentes, sans nécessiter de nouvelles autorisations EIP-7702 pour chaque modification.

Avantages du modèle proxy :

- **Mise à jour facilitée** : mettez à jour la logique du contrat en redirigeant le proxy vers un nouveau contrat d'implémentation.

- **Logique d’initialisation personnalisée** : intégrez des fonctions d’initialisation dans le proxy pour configurer en toute sécurité les variables d’état nécessaires.

Par exemple, le [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) montre comment un proxy peut être utilisé pour initialiser et gérer en toute sécurité les délégations dans des comptes compatibles avec l’EIP-7702.

Inconvénients du modèle proxy :

- **Dépendance à des acteurs externes** : il faut faire confiance à une équipe externe pour ne pas effectuer de mise à jour vers un contrat non sécurisé.

## Considérations de sécurité {#security-considerations}

**Protection contre la réentrance** : avec l’introduction de la délégation via l’EIP-7702, le compte d’un utilisateur peut basculer dynamiquement entre un compte détenu en externe (EOA) et un contrat intelligent (SC). Cette flexibilité permet au compte à la fois d’initier des transactions et d’être la cible d’appels. En conséquence, dans les scénarios où un compte s’appelle lui-même et effectue des appels externes, `msg.sender` sera égal à `tx.origin`, ce qui compromet certaines hypothèses de sécurité qui reposaient auparavant sur le fait que `tx.origin` faisait toujours référence à un EOA.

Pour les développeurs de contrats intelligents, il n’est plus sûr de supposer que `tx.origin` fait référence à un EOA. De même, utiliser `msg.sender == tx.origin` comme protection contre les attaques par réentrance n’est plus une stratégie fiable.

À l’avenir, les développeurs devraient concevoir leurs applications en partant du principe que tout participant dans le système pourrait être un contrat intelligent. Une alternative consiste à mettre en place une protection explicite contre la réentrance en utilisant des garde-fous de réentrance avec des modèles de type modificateur `nonReentrant`. Nous recommandons d’utiliser un modificateur audité, par exemple le [Reentrancy Guard d’OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Ils peuvent également utiliser une [variable de stockage transitoire](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Considérations de sécurité liées à l’initialisation**

La mise en œuvre de contrats de délégation selon l’EIP-7702 introduit des défis de sécurité spécifiques, notamment en ce qui concerne le processus d’initialisation. Une vulnérabilité critique survient lorsque la fonction d’initialisation (`init`) est liée de manière atomique au processus de délégation. Dans de tels cas, un attaquant pratiquant le frontrunning pourrait intercepter la signature de délégation et exécuter la fonction `init` avec des paramètres modifiés, prenant ainsi potentiellement le contrôle du compte.

Ce risque est particulièrement important lorsqu’on tente d’utiliser des implémentations existantes de comptes de contrat intelligent (SCA) avec l’EIP-7702 sans adapter leurs mécanismes d’initialisation.

**Solutions pour atténuer les vulnérabilités liées à l’initialisation**

- Implémenter `initWithSig`
  Remplacer la fonction `init` standard par une fonction `initWithSig` qui exige que l’utilisateur signe les paramètres d’initialisation. Cette approche garantit que l’initialisation ne peut se poursuivre qu’avec le consentement explicite de l’utilisateur, réduisant ainsi les risques d’initialisation non autorisée.

- Utiliser l’EntryPoint de l’ERC-4337
  Exiger que la fonction d’initialisation soit appelée exclusivement depuis le contrat EntryPoint de l’ERC-4337. Cette méthode s’appuie sur le cadre standardisé de validation et d’exécution fourni par l’ERC-4337, ajoutant ainsi une couche de sécurité supplémentaire au processus d’initialisation.  
  _(Voir : [Safe Docs](https://docs.safe.global/advanced/eip-7702/7702-safe))_

En adoptant ces solutions, les développeurs peuvent améliorer la sécurité des contrats de délégation EIP-7702, en se protégeant contre les attaques potentielles de premier plan pendant la phase d'initialisation.

**Collisions de stockage** : déléguer du code ne réinitialise pas le stockage existant. Lors de la migration d’un contrat de délégation vers un autre, les données résiduelles du contrat précédent restent en place. Si le nouveau contrat utilise les mêmes emplacements de stockage mais les interprète différemment, cela peut entraîner des comportements inattendus. Par exemple, si la première délégation était destinée à un contrat dans lequel un emplacement de stockage représente un `bool`, et que la délégation suivante était destinée à un contrat dans lequel le même emplacement représente un `uint`, l'inadéquation peut conduire à des résultats imprévisibles.

**Risques de phishing** : avec la mise en œuvre de la délégation via l’EIP-7702, les actifs du compte d’un utilisateur peuvent être entièrement contrôlés par des contrats intelligents. Si un utilisateur délègue son compte à un contrat malveillant sans le savoir, un attaquant pourrait facilement en prendre le contrôle et dérober des fonds. Lorsqu’on utilise `chain_id=0`, la délégation s’applique à tous les identifiants de chaîne. Ne déléguez qu’à un contrat définitif (jamais à un proxy), et uniquement à des contrats déployés via CREATE2 (avec un initcode standard - pas de contrats métamorphes), afin d’éviter qu’un déployeur ne puisse déployer un contrat différent à la même adresse sur une autre chaîne. Sinon, votre délégation met votre compte en danger sur toutes les autres chaînes compatibles EVM.

Lorsque les utilisateurs effectuent des signatures déléguées, le contrat cible recevant la délégation doit être affiché de manière claire et visible afin de limiter les risques de phishing.

**Surface de confiance minimale et sécurité** : tout en offrant de la flexibilité, un contrat de délégation doit conserver sa logique de base minimale et vérifiable. Le contrat agit en pratique comme une extension de l’EOA de l’utilisateur, si bien que toute faille peut avoir des conséquences catastrophiques. Les implémentations doivent suivre les bonnes pratiques établies par la communauté spécialisée dans la sécurité des contrats intelligents. Par exemple, les fonctions de construction ou d’initialisation doivent être rigoureusement sécurisées – comme l’a souligné Alchemy, si l’on utilise un modèle proxy avec l’EIP-7702, une initialisation non protégé pourrait permettre à un attaquant de prendre le contrôle du compte. Les équipes devraient s’efforcer de garder le code sur la blockchain simple : le contrat 7702 d’Ambire compte environ 200 lignes de Solidity, avec une complexité volontairement réduite afin de limiter les risques de bugs. Il est essentiel de trouver un équilibre entre une logique riche en fonctionnalités et une simplicité qui facilite l’audit.

### Implémentations connues {#known-implementations}

En raison de la nature de l’EIP 7702, il est recommandé que les portefeuilles fassent preuve de prudence lorsqu’ils aident les utilisateurs à déléguer à un contrat tiers. Voici une liste d’implémentations connues ayant fait l’objet d’un audit :

| Adresse du contrat                         | Source                                                                                                                                            | Audits                                                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                             | [audits](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                             | [audits](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)                     | [audits](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                                 | [audits](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Équipe AA de la Fondation Ethereum](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [audits](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |

## Recommandations pour les portefeuilles matériels {#hardware-wallet-guidelines}

Les portefeuilles matériels ne doivent pas exposer de délégation arbitraire. Le consensus dans le domaine des portefeuilles matériels est d’utiliser une liste de contrats délégateurs de confiance. Nous suggérons d’autoriser les implémentations connues listées ci-dessus et d’examiner les autres au cas par cas. Comme déléguer votre EOA à un contrat donne le contrôle sur l’ensemble des actifs, les portefeuilles matériels doivent faire preuve de prudence dans la manière dont ils implémentent l’EIP 7702.

### Scénarios d’intégration pour les applications compagnons {#integration-scenarios-for-companion-apps}

#### Paresseux {#lazy}

Puisque l’EOA fonctionne toujours comme d’habitude, aucune action n’est nécessaire.

Remarque : certains actifs peuvent être automatiquement rejetés par le code de délégation, comme les NFT ERC-1155, et l'équipe de support doit en être informée.

#### Conscient {#aware}

Avertir l’utilisateur qu’une délégation est en place pour l’EOA en vérifiant son code, et proposer éventuellement de supprimer cette délégation.

#### Délégation courante {#common-delegation}

Le fournisseur de matériel met sur liste blanche les contrats de délégation connus et met en œuvre leur support dans un logiciel compagnon. Il est recommandé de choisir un contrat prenant en charge l’ERC 4337 dans son intégralité.

Les EOA délégués à un autre seront traités comme des EOA standards.

#### Délégation personnalisée {#custom-delegation}

Le fournisseur de portefeuille matériel implémente son propre contrat de délégation, l’ajoute aux listes, et en intègre la prise en charge dans le compagnon logiciel. Il est recommandé de concevoir un contrat prenant en charge l’ERC 4337 dans son intégralité.

Les EOA délégués à un autre seront traités comme des EOA standards.
