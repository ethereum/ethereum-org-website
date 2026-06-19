---
title: "Examen détaillé du contrat du pont standard d'Optimism"
description: "Comment fonctionne le pont standard pour Optimism ? Pourquoi fonctionne-t-il ainsi ?"
author: Ori Pomerantz
tags: ["Solidity", "pont", "couche 2 (l2)"]
skill: intermediate
breadcrumb: "Pont Optimism"
published: 2022-03-30
lang: fr
---

[Optimism](https://www.optimism.io/) est un [rollup optimiste](/developers/docs/scaling/optimistic-rollups/).
Les rollup optimistes peuvent traiter des transactions pour un prix bien inférieur à celui du réseau principal Ethereum (également appelé couche 1 ou l1) car les transactions ne sont traitées que par quelques nœuds, au lieu de chaque nœud du réseau.
En même temps, toutes les données sont écrites sur la l1 afin que tout puisse être prouvé et reconstruit avec toutes les garanties d'intégrité et de disponibilité du Réseau principal.

Pour utiliser des actifs de la l1 sur Optimism (ou toute autre couche 2 (l2)), les actifs doivent être [transférés via un pont](/bridges/#prerequisites).
Une façon d'y parvenir est que les utilisateurs verrouillent des actifs (l'ETH et les [jetons ERC-20](/developers/docs/standards/tokens/erc-20/) sont les plus courants) sur la l1, et reçoivent des actifs équivalents à utiliser sur la l2.
À terme, quiconque se retrouve avec ces actifs pourrait vouloir les ramener sur la l1 via le pont.
Lors de cette opération, les actifs sont brûlés sur la l2 puis restitués à l'utilisateur sur la l1.

C'est ainsi que fonctionne le [pont standard d'Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge).
Dans cet article, nous passons en revue le code source de ce pont pour voir comment il fonctionne et l'étudier comme un exemple de code Solidity bien écrit.

## Flux de contrôle {#control-flows}

Le pont a deux flux principaux :

- Dépôt (de la l1 vers la l2)
- Retrait (de la l2 vers la l1)

### Flux de dépôt {#deposit-flow}

#### Couche 1 {#deposit-flow-layer-1}

1. S'il dépose un ERC-20, le déposant donne au pont une allocation pour dépenser le montant déposé
2. Le déposant appelle le pont l1 (`depositERC20`, `depositERC20To`, `depositETH` ou `depositETHTo`)
3. Le pont l1 prend possession de l'actif transféré
   - ETH : L'actif est transféré par le déposant dans le cadre de l'appel
   - ERC-20 : L'actif est transféré par le pont à lui-même en utilisant l'allocation fournie par le déposant
4. Le pont l1 utilise le mécanisme de message inter-domaines pour appeler `finalizeDeposit` sur le pont l2

#### Couche 2 {#deposit-flow-layer-2}

5. Le pont l2 vérifie que l'appel à `finalizeDeposit` est légitime :
   - Il provient du contrat de message inter-domaines
   - Il provenait à l'origine du pont sur la l1
6. Le pont l2 vérifie si le contrat de jeton ERC-20 sur la l2 est le bon :
   - Le contrat l2 signale que son homologue l1 est le même que celui d'où proviennent les jetons sur la l1
   - Le contrat l2 signale qu'il prend en charge la bonne interface ([en utilisant ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Si le contrat l2 est le bon, il l'appelle pour frapper le nombre approprié de jetons à la bonne adresse. Sinon, il lance un processus de retrait pour permettre à l'utilisateur de réclamer les jetons sur la l1.

### Flux de retrait {#withdrawal-flow}

#### Couche 2 {#withdrawal-flow-layer-2}

1. L'auteur du retrait appelle le pont l2 (`withdraw` ou `withdrawTo`)
2. Le pont l2 brûle le nombre approprié de jetons appartenant à `msg.sender`
3. Le pont l2 utilise le mécanisme de message inter-domaines pour appeler `finalizeETHWithdrawal` ou `finalizeERC20Withdrawal` sur le pont l1

#### Couche 1 {#withdrawal-flow-layer-1}

4. Le pont l1 vérifie que l'appel à `finalizeETHWithdrawal` ou `finalizeERC20Withdrawal` est légitime :
   - Il provient du mécanisme de message inter-domaines
   - Il provenait à l'origine du pont sur la l2
5. Le pont l1 transfère l'actif approprié (ETH ou ERC-20) à l'adresse appropriée

## Code de la couche 1 {#layer-1-code}

C'est le code qui s'exécute sur la l1, le réseau principal Ethereum.

### IL1ERC20Bridge {#il1erc20bridge}

[Cette interface est définie ici](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Elle inclut les fonctions et définitions requises pour transférer des jetons ERC-20 via le pont.

```solidity
// SPDX-License-Identifier: MIT
```

[La majeure partie du code d'Optimism est publiée sous la licence MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Au moment de la rédaction, la dernière version de Solidity est la 0.8.12.
Tant que la version 0.9.0 n'est pas publiée, nous ne savons pas si ce code sera compatible avec elle ou non.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Événements *
     **********/

    event ERC20DepositInitiated(
```

Dans la terminologie du pont Optimism, _dépôt_ signifie un transfert de la l1 vers la l2, et _retrait_ signifie un transfert de la l2 vers la l1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

Dans la plupart des cas, l'adresse d'un ERC-20 sur la l1 n'est pas la même que l'adresse de l'ERC-20 équivalent sur la l2.
[Vous pouvez voir la liste des adresses de jetons ici](https://static.optimism.io/optimism.tokenlist.json).
L'adresse avec `chainId` 1 est sur la l1 (Réseau principal) et l'adresse avec `chainId` 10 est sur la l2 (Optimism).
Les deux autres valeurs de `chainId` sont pour le réseau de test Kovan (42) et le réseau de test Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Il est possible d'ajouter des notes aux transferts, auquel cas elles sont ajoutées aux événements qui les signalent.

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Le même contrat de pont gère les transferts dans les deux sens.
Dans le cas du pont l1, cela signifie l'initialisation des dépôts et la finalisation des retraits.

```solidity

    /********************
     * Fonctions publiques *
     ********************/

    /**
     * @dev obtient l'adresse du contrat de pont de couche 2 (l2) correspondant.
     * @return Adresse du contrat de pont de couche 2 (l2) correspondant.
     */
    function l2TokenBridge() external returns (address);
```

Cette fonction n'est pas vraiment nécessaire, car sur la l2, il s'agit d'un contrat prédéployé, il se trouve donc toujours à l'adresse `0x4200000000000000000000000000000000000010`.
Elle est présente ici par symétrie avec le pont l2, car l'adresse du pont l1 n'est _pas_ évidente à connaître.

```solidity
    /**
     * @dev dépose un montant de l'ERC-20 sur le solde de l'appelant sur la couche 2 (l2).
     * @param _l1Token Adresse de l'ERC-20 de couche 1 (l1) que nous déposons
     * @param _l2Token Adresse de l'ERC-20 de couche 2 (l2) respectif de la couche 1 (l1)
     * @param _amount Montant de l'ERC-20 à déposer
     * @param _l2Gas Limite de gaz requise pour terminer le dépôt sur la couche 2 (l2).
     * @param _data Données facultatives à transférer à la couche 2 (l2). Ces données sont fournies
     *        uniquement pour des raisons de commodité pour les contrats externes. Outre l'application d'une longueur
     *        maximale, ces contrats ne fournissent aucune garantie quant à leur contenu.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Le paramètre `_l2Gas` est la quantité de gaz l2 que la transaction est autorisée à dépenser.
[Jusqu'à une certaine limite (élevée), c'est gratuit](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), donc à moins que le contrat ERC-20 ne fasse quelque chose de vraiment étrange lors de la frappe, cela ne devrait pas poser de problème.
Cette fonction prend en charge le scénario courant, où un utilisateur transfère des actifs via le pont vers la même adresse sur une chaîne de blocs différente.

```solidity
    /**
     * @dev dépose un montant d'ERC-20 sur le solde d'un destinataire sur la couche 2 (l2).
     * @param _l1Token Adresse de l'ERC-20 de couche 1 (l1) que nous déposons
     * @param _l2Token Adresse de l'ERC-20 de couche 2 (l2) respectif de la couche 1 (l1)
     * @param _to Adresse de couche 2 (l2) à laquelle créditer le retrait.
     * @param _amount Montant de l'ERC-20 à déposer.
     * @param _l2Gas Limite de gaz requise pour terminer le dépôt sur la couche 2 (l2).
     * @param _data Données facultatives à transférer à la couche 2 (l2). Ces données sont fournies
     *        uniquement pour des raisons de commodité pour les contrats externes. Outre l'application d'une longueur
     *        maximale, ces contrats ne fournissent aucune garantie quant à leur contenu.
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Cette fonction est presque identique à `depositERC20`, mais elle vous permet d'envoyer l'ERC-20 à une adresse différente.

```solidity
    /*************************
     * Fonctions inter-chaînes *
     *************************/

    /**
     * @dev Termine un retrait de la couche 2 (l2) vers la couche 1 (l1), et crédite les fonds sur le solde du destinataire du
     * jeton ERC-20 de couche 1 (l1).
     * Cet appel échouera si le retrait initialisé depuis la couche 2 (l2) n'a pas été finalisé.
     *
     * @param _l1Token Adresse du jeton de couche 1 (l1) pour lequel finaliser le retrait (finalizeWithdrawal).
     * @param _l2Token Adresse du jeton de couche 2 (l2) où le retrait a été initié.
     * @param _from Adresse de couche 2 (l2) initiant le transfert.
     * @param _to Adresse de couche 1 (l1) à laquelle créditer le retrait.
     * @param _amount Montant de l'ERC-20 à déposer.
     * @param _data Données fournies par l'expéditeur sur la couche 2 (l2). Ces données sont fournies
     *   uniquement pour des raisons de commodité pour les contrats externes. Outre l'application d'une longueur
     *   maximale, ces contrats ne fournissent aucune garantie quant à leur contenu.
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

Les retraits (et autres messages de la l2 vers la l1) dans Optimism sont un processus en deux étapes :

1. Une transaction d'initiation sur la l2.
2. Une transaction de finalisation ou de réclamation sur la l1.
   Cette transaction doit avoir lieu après la fin de la [période de contestation de faute](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) pour la transaction l2.

### IL1StandardBridge {#il1standardbridge}

[Cette interface est définie ici](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Ce fichier contient les définitions d'événements et de fonctions pour l'ETH.
Ces définitions sont très similaires à celles définies dans `IL1ERC20Bridge` ci-dessus pour les ERC-20.

L'interface du pont est divisée en deux fichiers car certains jetons ERC-20 nécessitent un traitement personnalisé et ne peuvent pas être gérés par le pont standard.
De cette façon, le pont personnalisé qui gère un tel jeton peut implémenter `IL1ERC20Bridge` et ne pas avoir à transférer également de l'ETH.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Événements *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Cet événement est presque identique à la version ERC-20 (`ERC20DepositInitiated`), à l'exception des adresses de jetons l1 et l2 qui sont absentes.
Il en va de même pour les autres événements et les fonctions.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Fonctions publiques *
     ********************/

    /**
     * @dev Dépose un montant d'ETH sur le solde de l'appelant sur la couche 2 (l2).
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Dépose un montant d'ETH sur le solde d'un destinataire sur la couche 2 (l2).
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * Fonctions inter-chaînes *
     *************************/

    /**
     * @dev Termine un retrait de la couche 2 (l2) vers la couche 1 (l1), et crédite les fonds sur le solde du destinataire du
     * jeton ETH de couche 1 (l1). Puisque seul le xDomainMessenger peut appeler cette fonction, elle ne sera jamais appelée
     * avant que le retrait ne soit finalisé.
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[Ce contrat](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) est hérité par les deux ponts ([l1](#the-l1-bridge-contract) et [l2](#l2-bridge-code)) pour envoyer des messages à l'autre couche.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Importations d'interfaces */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Cette interface](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) indique au contrat comment envoyer des messages à l'autre couche, en utilisant le messager inter-domaines.
Ce messager inter-domaines est un tout autre système, et mérite son propre article, que j'espère écrire à l'avenir.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Contrat d'aide pour les contrats effectuant des communications inter-domaines
 *
 * Compilateur utilisé : défini par le contrat héritier
 */
contract CrossDomainEnabled {
    /*************
     * Variables *
     *************/

    // Contrat de messagerie utilisé pour envoyer et recevoir des messages de l'autre domaine.
    address public messenger;

    /***************
     * Constructeur *
     ***************/

    /**
     * @param _messenger Adresse du CrossDomainMessenger sur la couche actuelle.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Le seul paramètre que le contrat a besoin de connaître est l'adresse du messager inter-domaines sur cette couche.
Ce paramètre est défini une fois, dans le constructeur, et ne change jamais.

```solidity

    /**********************
     * Modificateurs de fonction *
     **********************/

    /**
     * Impose que la fonction modifiée ne soit appelable que par un compte inter-domaines spécifique.
     * @param _sourceDomainAccount Le seul compte sur le domaine d'origine qui est
     *  authentifié pour appeler cette fonction.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

La messagerie inter-domaines est accessible par n'importe quel contrat sur la chaîne de blocs où elle s'exécute (soit le réseau principal Ethereum, soit Optimism).
Mais nous avons besoin que le pont de chaque côté ne fasse confiance _qu'à_ certains messages s'ils proviennent du pont de l'autre côté.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Seuls les messages provenant du messager inter-domaines approprié (`messenger`, comme vous le voyez ci-dessous) peuvent être considérés comme fiables.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

La façon dont le messager inter-domaines fournit l'adresse qui a envoyé un message avec l'autre couche est [la fonction `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Tant qu'elle est appelée dans la transaction qui a été initiée par le message, elle peut fournir cette information.

Nous devons nous assurer que le message que nous avons reçu provient de l'autre pont.

```solidity

        _;
    }

    /**********************
     * Fonctions internes *
     **********************/

    /**
     * Obtient le messager, généralement à partir du stockage. Cette fonction est exposée au cas où un contrat enfant
     * aurait besoin de la remplacer.
     * @return L'adresse du contrat de messagerie inter-domaines qui doit être utilisé.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Cette fonction renvoie le messager inter-domaines.
Nous utilisons une fonction plutôt que la variable `messenger` pour permettre aux contrats qui héritent de celui-ci d'utiliser un algorithme pour spécifier quel messager inter-domaines utiliser.

```solidity

    /**
     * Envoie un message à un compte sur un autre domaine
     * @param _crossDomainTarget Le destinataire prévu sur le domaine de destination
     * @param _message Les données à envoyer à la cible (généralement des données d'appel vers une fonction avec
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit La limite de gaz (gasLimit) pour la réception du message sur le domaine de destination.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Enfin, la fonction qui envoie un message à l'autre couche.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) est un analyseur statique qu'Optimism exécute sur chaque contrat pour rechercher des vulnérabilités et d'autres problèmes potentiels.
Dans ce cas, la ligne suivante déclenche deux vulnérabilités :

1. [Événements de réentrance](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Réentrance bénigne](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

Dans ce cas, nous ne nous inquiétons pas de la réentrance, nous savons que `getCrossDomainMessenger()` renvoie une adresse digne de confiance, même si Slither n'a aucun moyen de le savoir.

### Le contrat du pont l1 {#the-l1-bridge-contract}

[Le code source de ce contrat est ici](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Les interfaces peuvent faire partie d'autres contrats, elles doivent donc prendre en charge un large éventail de versions de Solidity.
Mais le pont lui-même est notre contrat, et nous pouvons être stricts sur la version de Solidity qu'il utilise.

```solidity
/* Importations d'interfaces */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) et [IL1StandardBridge](#il1standardbridge) sont expliqués ci-dessus.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Cette interface](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) nous permet de créer des messages pour contrôler le pont standard sur la l2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Cette interface](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) nous permet de contrôler les contrats ERC-20.
[Vous pouvez en lire plus à ce sujet ici](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Importations de bibliothèques */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Comme expliqué ci-dessus](#crossdomainenabled), ce contrat est utilisé pour la messagerie inter-couches.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) contient les adresses des contrats l2 qui ont toujours la même adresse. Cela inclut le pont standard sur la l2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Utilitaires d'adresse d'OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Ils sont utilisés pour faire la distinction entre les adresses de contrats et celles appartenant à des comptes détenus par des tiers (EOA).

Notez que ce n'est pas une solution parfaite, car il n'y a aucun moyen de faire la distinction entre les appels directs et les appels effectués depuis le constructeur d'un contrat, mais au moins cela nous permet d'identifier et de prévenir certaines erreurs courantes des utilisateurs.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[La norme ERC-20](https://eips.ethereum.org/EIPS/eip-20) prend en charge deux façons pour un contrat de signaler un échec :

1. Annuler
2. Renvoyer `false`

Gérer les deux cas rendrait notre code plus compliqué, nous utilisons donc à la place [`SafeERC20` d'OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), qui s'assure que [tous les échecs entraînent une annulation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev Le pont ETH et ERC-20 de couche 1 (l1) est un contrat qui stocke les fonds de couche 1 (l1) déposés et les
 * jetons standards qui sont utilisés sur la couche 2 (l2). Il synchronise un pont de couche 2 (l2) correspondant, l'informant des dépôts
 * et l'écoutant pour les retraits nouvellement finalisés.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Cette ligne indique comment nous spécifions d'utiliser l'enveloppe `SafeERC20` chaque fois que nous utilisons l'interface `IERC20`.

```solidity

    /********************************
     * Références de contrats externes *
     ********************************/

    address public l2TokenBridge;
```

L'adresse de [L2StandardBridge](#l2-bridge-code).

```solidity

    // Mappe le jeton de couche 1 (l1) au jeton de couche 2 (l2) au solde du jeton de couche 1 (l1) déposé
    mapping(address => mapping(address => uint256)) public deposits;
```

Un double [mapping](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) comme celui-ci est la façon dont vous définissez un [tableau creux bidimensionnel](https://en.wikipedia.org/wiki/Sparse_matrix).
Les valeurs dans cette structure de données sont identifiées comme `deposit[L1 token addr][L2 token addr]`.
La valeur par défaut est zéro.
Seules les cellules qui sont définies sur une valeur différente sont écrites dans le stockage.

```solidity

    /***************
     * Constructeur *
     ***************/

    // Ce contrat se trouve derrière un proxy, les paramètres du constructeur seront donc inutilisés.
    constructor() CrossDomainEnabled(address(0)) {}
```

Nous voulons pouvoir mettre à niveau ce contrat sans avoir à copier toutes les variables dans le stockage.
Pour ce faire, nous utilisons un [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), un contrat qui utilise [`delegatecall`](https://solidity-by-example.org/delegatecall/) pour transférer les appels vers un contrat distinct dont l'adresse est stockée par le contrat proxy (lorsque vous effectuez une mise à niveau, vous dites au proxy de modifier cette adresse).
Lorsque vous utilisez `delegatecall`, le stockage reste le stockage du contrat _appelant_, de sorte que les valeurs de toutes les variables d'état du contrat ne sont pas affectées.

L'un des effets de ce modèle est que le stockage du contrat qui est _l'appelé_ de `delegatecall` n'est pas utilisé et par conséquent les valeurs du constructeur qui lui sont transmises n'ont pas d'importance.
C'est la raison pour laquelle nous pouvons fournir une valeur absurde au constructeur `CrossDomainEnabled`.
C'est aussi la raison pour laquelle l'initialisation ci-dessous est séparée du constructeur.

```solidity
    /******************
     * Initialisation *
     ******************/

    /**
     * @param _l1messenger Adresse du messager de couche 1 (l1) utilisée pour les communications inter-chaînes.
     * @param _l2TokenBridge Adresse du pont standard de couche 2 (l2).
     */
    // slither-disable-next-line external-function
```

Ce [test Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) identifie les fonctions qui ne sont pas appelées depuis le code du contrat et pourraient donc être déclarées `external` au lieu de `public`.
Le coût en gaz des fonctions `external` peut être inférieur, car elles peuvent être fournies avec des paramètres dans les données d'appel.
Les fonctions déclarées `public` doivent être accessibles depuis l'intérieur du contrat.
Les contrats ne peuvent pas modifier leurs propres données d'appel, les paramètres doivent donc être en mémoire.
Lorsqu'une telle fonction est appelée en externe, il est nécessaire de copier les données d'appel en mémoire, ce qui coûte du gaz.
Dans ce cas, la fonction n'est appelée qu'une seule fois, donc l'inefficacité ne nous importe pas.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

La fonction `initialize` ne doit être appelée qu'une seule fois.
Si l'adresse du messager inter-domaines l1 ou du pont de jetons l2 change, nous créons un nouveau proxy et un nouveau pont qui l'appelle.
Il est peu probable que cela se produise, sauf lorsque l'ensemble du système est mis à niveau, ce qui est très rare.

Notez que cette fonction n'a aucun mécanisme qui restreint _qui_ peut l'appeler.
Cela signifie qu'en théorie, un attaquant pourrait attendre que nous déployions le proxy et la première version du pont, puis faire du [front-running](https://solidity-by-example.org/hacks/front-running/) pour accéder à la fonction `initialize` avant l'utilisateur légitime. Mais il existe deux méthodes pour éviter cela :

1. Si les contrats ne sont pas déployés directement par un EOA mais [dans une transaction où un autre contrat les crée](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), l'ensemble du processus peut être atomique et se terminer avant qu'aucune autre transaction ne soit exécutée.
2. Si l'appel légitime à `initialize` échoue, il est toujours possible d'ignorer le proxy et le pont nouvellement créés et d'en créer de nouveaux.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Ce sont les deux paramètres que le pont a besoin de connaître.

```solidity

    /**************
     * Dépôt *
     **************/

    /** @dev Modificateur exigeant que l'expéditeur soit un EOA. Cette vérification pourrait être contournée par un contrat
     *  malveillant via initcode, mais elle prend en charge l'erreur utilisateur que nous voulons éviter.
     */
    modifier onlyEOA() {
        // Utilisé pour arrêter les dépôts provenant de contrats (éviter les jetons accidentellement perdus)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

C'est la raison pour laquelle nous avions besoin des utilitaires `Address` d'OpenZeppelin.

```solidity
    /**
     * @dev Cette fonction peut être appelée sans données
     * pour déposer un montant d'ETH sur le solde de l'appelant sur la couche 2 (l2).
     * Puisque la fonction de réception ne prend pas de données, un montant
     * par défaut prudent est transféré à la couche 2 (l2).
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Cette fonction existe à des fins de test.
Remarquez qu'elle n'apparaît pas dans les définitions d'interface - elle n'est pas destinée à un ultérieure sur la couche 2 (l2) normal.

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

Ces deux fonctions sont des enveloppes autour de `_initiateETHDeposit`, la fonction qui gère le dépôt d'ETH réel.

```solidity
    /**
     * @dev Exécute la logique des dépôts en stockant l'ETH et en informant la passerelle ETH de couche 2 (l2) du
     * dépôt.
     * @param _from Compte à partir duquel retirer le dépôt sur la couche 1 (l1).
     * @param _to Compte auquel donner le dépôt sur la couche 2 (l2).
     * @param _l2Gas Limite de gaz requise pour terminer le dépôt sur la couche 2 (l2).
     * @param _data Données facultatives à transférer à la couche 2 (l2). Ces données sont fournies
     *        uniquement pour des raisons de commodité pour les contrats externes. Outre l'application d'une longueur
     *        maximale, ces contrats ne fournissent aucune garantie quant à leur contenu.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Construit les données d'appel pour l'appel finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

La façon dont les messages inter-domaines fonctionnent est que le contrat de destination est appelé avec le message comme données d'appel.
Les contrats Solidity interprètent toujours leurs données d'appel conformément aux
[spécifications de l'ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
La fonction Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) crée ces données d'appel.

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

Le message ici est d'appeler [la fonction `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) avec ces paramètres :

| Paramètre | Valeur                          | Signification                                                                                                                                      |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | Valeur spéciale pour représenter l'ETH (qui n'est pas un jeton ERC-20) sur la l1                                                                           |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Le contrat l2 qui gère l'ETH sur Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (ce contrat est réservé à un usage interne d'Optimism) |
| \_from    | \_from                         | L'adresse sur la l1 qui envoie l'ETH                                                                                                         |
| \_to      | \_to                           | L'adresse sur la l2 qui reçoit l'ETH                                                                                                      |
| amount    | msg.value                      | Montant de Wei envoyé (qui a déjà été envoyé au pont)                                                                               |
| \_data    | \_data                         | Données supplémentaires à joindre au dépôt                                                                                                     |

```solidity
        // Envoie les données d'appel dans la couche 2 (l2)
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Envoyer le message via le messager inter-domaines.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Émettre un événement pour informer toute application décentralisée (dapp) qui écoute ce transfert.

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

Ces deux fonctions sont des enveloppes autour de `_initiateERC20Deposit`, la fonction qui gère le dépôt d'ERC-20 réel.

```solidity
    /**
     * @dev Exécute la logique des dépôts en informant le contrat
     * de jeton déposé de couche 2 (l2) du dépôt et en appelant un gestionnaire pour verrouiller les fonds de couche 1 (l1). (par ex., transferFrom)
     *
     * @param _l1Token Adresse de l'ERC-20 de couche 1 (l1) que nous déposons
     * @param _l2Token Adresse de l'ERC-20 de couche 2 (l2) respectif de la couche 1 (l1)
     * @param _from Compte à partir duquel retirer le dépôt sur la couche 1 (l1)
     * @param _to Compte auquel donner le dépôt sur la couche 2 (l2)
     * @param _amount Montant de l'ERC-20 à déposer.
     * @param _l2Gas Limite de gaz requise pour terminer le dépôt sur la couche 2 (l2).
     * @param _data Données facultatives à transférer à la couche 2 (l2). Ces données sont fournies
     *        uniquement pour des raisons de commodité pour les contrats externes. Outre l'application d'une longueur
     *        maximale, ces contrats ne fournissent aucune garantie quant à leur contenu.
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

Cette fonction est similaire à `_initiateETHDeposit` ci-dessus, avec quelques différences importantes.
La première différence est que cette fonction reçoit les adresses des jetons et le montant à transférer en tant que paramètres.
Dans le cas de l'ETH, l'appel au pont inclut déjà le transfert de l'actif vers le compte du pont (`msg.value`).

```solidity
        // Lorsqu'un dépôt est initié sur la couche 1 (l1), le pont de couche 1 (l1) transfère les fonds à lui-même pour de futurs
        // retraits. safeTransferFrom vérifie également si le contrat a du code, donc cela échouera si
        // _from est un EOA ou l'adresse(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Les transferts de jetons ERC-20 suivent un processus différent de celui de l'ETH :

1. L'utilisateur (`_from`) donne une allocation au pont pour transférer les jetons appropriés.
2. L'utilisateur appelle le pont avec l'adresse du contrat de jeton, le montant, etc.
3. Le pont transfère les jetons (à lui-même) dans le cadre du processus de dépôt.

La première étape peut se produire dans une transaction distincte des deux dernières.
Cependant, le front-running n'est pas un problème car les deux fonctions qui appellent `_initiateERC20Deposit` (`depositERC20` et `depositERC20To`) n'appellent cette fonction qu'avec `msg.sender` comme paramètre `_from`.

```solidity
        // Construit les données d'appel pour _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Envoie les données d'appel dans la couche 2 (l2)
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Ajouter le montant déposé de jetons à la structure de données `deposits`.
Il pourrait y avoir plusieurs adresses sur la l2 qui correspondent au même jeton ERC-20 l1, il n'est donc pas suffisant d'utiliser le solde du pont du jeton ERC-20 l1 pour garder une trace des dépôts.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Fonctions inter-chaînes *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Le pont l2 envoie un message au messager inter-domaines l2, ce qui amène le messager inter-domaines l1 à appeler cette fonction (une fois que la [transaction qui finalise le message](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) est soumise sur la l1, bien sûr).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

S'assurer qu'il s'agit d'un message _légitime_, provenant du messager inter-domaines et originaire du pont de jetons l2.
Cette fonction est utilisée pour retirer de l'ETH du pont, nous devons donc nous assurer qu'elle n'est appelée que par l'appelant autorisé.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

La façon de transférer de l'ETH est d'appeler le destinataire avec le montant de Wei dans le `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Émettre un événement concernant le retrait.

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Cette fonction est similaire à `finalizeETHWithdrawal` ci-dessus, avec les modifications nécessaires pour les jetons ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Mettre à jour la structure de données `deposits`.

```solidity

        // Lorsqu'un retrait est finalisé sur la couche 1 (l1), le pont de couche 1 (l1) transfère les fonds à la personne effectuant le retrait
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Temporaire - Migration d'ETH *
     *****************************/

    /**
     * @dev Ajoute un solde d'ETH au compte. Ceci est destiné à permettre la migration d'ETH
     * d'une ancienne passerelle vers une nouvelle passerelle.
     * REMARQUE : Ceci est laissé pour une seule mise à niveau afin que nous puissions recevoir l'ETH migré de
     * l'ancien contrat
     */
    function donateETH() external payable {}
}
```

Il y a eu une implémentation antérieure du pont.
Lorsque nous sommes passés de cette implémentation à celle-ci, nous avons dû déplacer tous les actifs.
Les jetons ERC-20 peuvent simplement être déplacés.
Cependant, pour transférer de l'ETH vers un contrat, vous avez besoin de l'approbation de ce contrat, ce que `donateETH` nous fournit.

## Jetons ERC-20 sur la l2 {#erc-20-tokens-on-l2}

Pour qu'un jeton ERC-20 s'intègre dans le pont standard, il doit permettre au pont standard, et _uniquement_ au pont standard, de frapper des jetons.
Ceci est nécessaire car les ponts doivent s'assurer que le nombre de jetons circulant sur Optimism est égal au nombre de jetons verrouillés à l'intérieur du contrat du pont l1.
S'il y a trop de jetons sur la l2, certains utilisateurs ne pourraient pas ramener leurs actifs sur la l1 via le pont.
Au lieu d'un pont de confiance, nous recréerions essentiellement un [système bancaire à réserves fractionnaires](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
S'il y a trop de jetons sur la l1, certains de ces jetons resteraient verrouillés à l'intérieur du contrat du pont pour toujours car il n'y a aucun moyen de les libérer sans brûler des jetons l2.

### IL2StandardERC20 {#il2standarderc20}

Chaque jeton ERC-20 sur la l2 qui utilise le pont standard doit fournir [cette interface](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), qui possède les fonctions et les événements dont le pont standard a besoin.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[L'interface ERC-20 standard](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) n'inclut pas les fonctions `mint` et `burn`.
Ces méthodes ne sont pas requises par [la norme ERC-20](https://eips.ethereum.org/EIPS/eip-20), qui ne spécifie pas les mécanismes de création et de destruction des jetons.

```solidity
import { IERC-165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[L'interface ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) est utilisée pour spécifier quelles fonctions un contrat fournit.
[Vous pouvez lire la norme ici](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Cette fonction fournit l'adresse du jeton l1 qui est transféré vers ce contrat via le pont.
Notez que nous n'avons pas de fonction similaire dans la direction opposée.
Nous devons être en mesure de transférer n'importe quel jeton l1 via le pont, que la prise en charge de la l2 ait été prévue ou non lors de son implémentation.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Fonctions et événements pour frapper (créer) et brûler (détruire) des jetons.
Le pont devrait être la seule entité à pouvoir exécuter ces fonctions pour s'assurer que le nombre de jetons est correct (égal au nombre de jetons verrouillés sur la l1).

### L2StandardERC20 {#l2standarderc20}

[Ceci est notre implémentation de l'interface `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
À moins que vous n'ayez besoin d'une logique personnalisée, vous devriez utiliser celle-ci.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Le contrat ERC-20 d'OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism ne croit pas qu'il faille réinventer la roue, surtout lorsque la roue est bien auditée et doit être suffisamment digne de confiance pour détenir des actifs.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Ce sont les deux paramètres de configuration supplémentaires que nous exigeons et que l'ERC-20 n'exige normalement pas.

```solidity

    /**
     * @param _l2Bridge Adresse du pont standard de couche 2 (l2).
     * @param _l1Token Adresse du jeton de couche 1 (l1) correspondant.
     * @param _name Nom de l'ERC-20.
     * @param _symbol Symbole de l'ERC-20.
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

Appelez d'abord le constructeur du contrat dont nous héritons (`ERC20(_name, _symbol)`) puis définissez nos propres variables.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

C'est ainsi que fonctionne [ERC-165](https://eips.ethereum.org/EIPS/eip-165).
Chaque interface est un certain nombre de fonctions prises en charge, et est identifiée comme le [OU exclusif](https://en.wikipedia.org/wiki/Exclusive_or) des [sélecteurs de fonction de l'ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) de ces fonctions.

Le pont l2 utilise ERC-165 comme vérification de cohérence pour s'assurer que le contrat ERC-20 auquel il envoie des actifs est un `IL2StandardERC20`.

**Remarque :** Rien n'empêche un contrat malveillant de fournir de fausses réponses à `supportsInterface`, il s'agit donc d'un mécanisme de vérification de cohérence, et _non_ d'un mécanisme de sécurité.

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

Seul le pont l2 est autorisé à frapper et à brûler des actifs.

`_mint` et `_burn` sont en fait définis dans le [contrat ERC-20 d'OpenZeppelin](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Ce contrat ne les expose tout simplement pas en externe, car les conditions pour frapper et brûler des jetons sont aussi variées que le nombre de façons d'utiliser l'ERC-20.

## Code du pont l2 {#l2-bridge-code}

C'est le code qui exécute le pont sur Optimism.
[La source de ce contrat est ici](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Importations d'interfaces */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

L'interface [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) est très similaire à [l'équivalent l1](#il1erc20bridge) que nous avons vu ci-dessus.
Il y a deux différences significatives :

1. Sur la l1, vous initiez des dépôts et finalisez des retraits.
   Ici, vous initiez des retraits et finalisez des dépôts.
2. Sur la l1, il est nécessaire de faire la distinction entre l'ETH et les jetons ERC-20.
   Sur la l2, nous pouvons utiliser les mêmes fonctions pour les deux car, en interne, les soldes d'ETH sur Optimism sont gérés comme un jeton ERC-20 avec l'adresse [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Importations de bibliothèques */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Importations de contrats */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev Le pont standard de couche 2 (l2) est un contrat qui fonctionne avec le pont standard de couche 1 (l1) pour
 * permettre les transitions d'ETH et d'ERC-20 entre la couche 1 (l1) et la couche 2 (l2).
 * Ce contrat sert à frapper de nouveaux jetons lorsqu'il est informé de dépôts dans le pont standard
 * de couche 1 (l1).
 * Ce contrat sert également à brûler les jetons destinés au retrait, informant le pont
 * de couche 1 (l1) de libérer les fonds de couche 1 (l1).
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Références de contrats externes *
     ********************************/

    address public l1TokenBridge;
```

Garder une trace de l'adresse du pont l1.
Notez que contrairement à l'équivalent l1, ici nous _avons besoin_ de cette variable.
L'adresse du pont l1 n'est pas connue à l'avance.

```solidity

    /***************
     * Constructeur *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Messager inter-domaines utilisé par ce contrat.
     * @param _l1TokenBridge Adresse du pont de couche 1 (l1) déployé sur la chaîne principale.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Retrait *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

Ces deux fonctions initient des retraits.
Notez qu'il n'est pas nécessaire de spécifier l'adresse du jeton l1.
Les jetons l2 sont censés nous indiquer l'adresse de l'équivalent l1.

```solidity

    /**
     * @dev Exécute la logique des retraits en brûlant le jeton et en informant
     *      la passerelle de jetons de couche 1 (l1) du retrait.
     * @param _l2Token Adresse du jeton de couche 2 (l2) où le retrait est initié.
     * @param _from Compte à partir duquel effectuer le retrait sur la couche 2 (l2).
     * @param _to Compte auquel donner le retrait sur la couche 1 (l1).
     * @param _amount Montant du jeton à retirer.
     * @param _l1Gas Inutilisé, mais inclus pour d'éventuelles considérations de compatibilité ascendante.
     * @param _data Données facultatives à transférer à la couche 1 (l1). Ces données sont fournies
     *        uniquement pour des raisons de commodité pour les contrats externes. Outre l'application d'une longueur
     *        maximale, ces contrats ne fournissent aucune garantie quant à leur contenu.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Lorsqu'un retrait est initié, nous brûlons les fonds de la personne effectuant le retrait pour empêcher l'utilisation
        // usage
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Remarquez que nous ne nous appuyons _pas_ sur le paramètre `_from` mais sur `msg.sender` qui est beaucoup plus difficile à falsifier (impossible, pour autant que je sache).

```solidity

        // Construit les données d'appel pour l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

Sur la l1, il est nécessaire de faire la distinction entre l'ETH et l'ERC-20.

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // Envoie le message au pont de couche 1 (l1)
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Fonction inter-chaînes : Dépôt *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Cette fonction est appelée par `L1StandardBridge`.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

S'assurer que la source du message est légitime.
Ceci est important car cette fonction appelle `_mint` et pourrait être utilisée pour donner des jetons qui ne sont pas couverts par les jetons que le pont possède sur la l1.

```solidity
        // Vérifie que le jeton cible est conforme et
        // vérifie que le jeton déposé sur la couche 1 (l1) correspond à la représentation du jeton déposé de couche 2 (l2) ici
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Vérifications de cohérence :

1. La bonne interface est prise en charge
2. L'adresse l1 du contrat ERC-20 l2 correspond à la source l1 des jetons

```solidity
        ) {
            // Lorsqu'un dépôt est finalisé, nous créditons le compte sur la couche 2 (l2) avec le même montant de
            // jetons.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Si les vérifications de cohérence réussissent, finaliser le dépôt :

1. Frapper les jetons
2. Émettre l'événement approprié

```solidity
        } else {
            // Soit le jeton de couche 2 (l2) dans lequel le dépôt est effectué n'est pas d'accord sur l'adresse correcte
            // de son jeton de couche 1 (l1), soit il ne prend pas en charge l'interface correcte.
            // Cela ne devrait se produire que s'il y a un jeton de couche 2 (l2) malveillant, ou si un utilisateur a d'une manière ou d'une autre
            // spécifié la mauvaise adresse de jeton de couche 2 (l2) dans laquelle déposer.
            // Dans les deux cas, nous arrêtons le processus ici et construisons un retrait
            // message afin que les utilisateurs puissent récupérer leurs fonds dans certains cas.
            // Il n'y a aucun moyen d'empêcher complètement les contrats de jetons malveillants, mais cela limite
            // l'erreur de l'utilisateur et atténue certaines formes de comportement de contrat malveillant.
```

Si un utilisateur a commis une erreur détectable en utilisant la mauvaise adresse de jeton l2, nous voulons annuler le dépôt et renvoyer les jetons sur la l1.
La seule façon de le faire depuis la l2 est d'envoyer un message qui devra attendre la période de contestation de faute, mais c'est bien mieux pour l'utilisateur que de perdre les jetons de façon permanente.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // a inversé le _to et le _from ici pour renvoyer le dépôt à l'expéditeur
                _from,
                _amount,
                _data
            );

            // Envoie le message au pont de couche 1 (l1)
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Conclusion {#conclusion}

Le pont standard est le mécanisme le plus flexible pour les transferts d'actifs.
Cependant, parce qu'il est si générique, ce n'est pas toujours le mécanisme le plus facile à utiliser.
Surtout pour les retraits, la plupart des utilisateurs préfèrent utiliser des [ponts tiers](https://optimism.io/apps#bridge) qui n'attendent pas la période de contestation et ne nécessitent pas de preuve de Merkle pour finaliser le retrait.

Ces ponts fonctionnent généralement en ayant des actifs sur la l1, qu'ils fournissent immédiatement moyennant des frais minimes (souvent inférieurs au coût du gaz pour un retrait de pont standard).
Lorsque le pont (ou les personnes qui le gèrent) anticipe un manque d'actifs l1, il transfère suffisamment d'actifs depuis la l2. Comme il s'agit de très gros retraits, le coût de retrait est amorti sur un montant important et représente un pourcentage beaucoup plus faible.

Espérons que cet article vous a aidé à mieux comprendre le fonctionnement de la couche 2 (l2) et comment écrire du code Solidity clair et sécurisé.

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).