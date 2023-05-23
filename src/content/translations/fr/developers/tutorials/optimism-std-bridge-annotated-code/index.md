---
title: "Introduction au contrat de passerelle standard Optimism"
description: Comment fonctionne la passerelle standard d'Optimism ? Pourquoi fonctionne-t-elle de cette façon ?
author: Ori Pomerantz
tags:
  - "solidity"
  - "bridge"
  - "Couche 2"
skill: intermediate
published: 2022-03-30
lang: fr
---

[Optimism](https://www.optimism.io/) est un [rollup optimiste](/developers/docs/scaling/optimistic-rollups/). Les rollups Optimistics peuvent traiter les transactions à un prix beaucoup plus bas que le réseau principal Ethereum (également connu sous le nom de couche 1 ou L1), car les transactions sont traitées uniquement par quelques nœuds en lieu et place de tous les nœuds du réseau. En même temps, les données sont toutes écrites sur L1 afin que tout puisse être prouvé et reconstruit avec toutes les garanties d'intégrité et de disponibilité du réseau principal.

Pour utiliser les actifs L1 sur Optimism (ou n'importe quel autre L2), les actifs doivent être [connectés](/bridges/#prerequisites). Une façon d'y arriver est pour les utilisateurs de verrouiller les actifs (ETH et les [jetons ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) sont les plus communs) sur L1 et de recevoir des actifs équivalents à utiliser sur L2. Finalement, celui qui se retrouve avec souhaitera peut-être les ramener en L1. En faisant cela, les actifs sont brûlés sur L2 puis redistribués à l'utilisateur sur L1.

C'est ainsi que fonctionne la [passerelle standard Optimism](https://community.optimism.io/docs/developers/bridge/standard-bridge). Dans cet article, nous passerons en revue le code source de cette passerelle pour comprendre comment elle fonctionne et l'étudier comme un exemple de code Solidity parfaitement écrit.

## Flux de contrôle {#control-flows}

La passerelle dispose de deux flux principaux :

- Dépôt (de L1 vers L2)
- Retrait (de L2 vers L1)

### Flux de dépôt {#deposit-flow}

#### Couche 1 {#deposit-flow-layer-1}

1. En cas de dépôt d'un ERC-20, le déposant affecte à la passerelle une provision pour dépenser le montant déposé
2. Le déposant appelle la passerelle L1 (`depositERC20`, `depositERC20To`, `depositETH`, ou `depositETHTo`)
3. La passerelle L1 prend possession de l'actif connecté
   - ETH : l'actif est transféré par le déposant dans le cadre de l'appel
   - ERC-20 : l'actif est transféré par la passerelle à elle-même en utilisant la provision fournie par le déposant
4. La passerelle de connexion L1 utilise le mécanisme de message inter-domaine pour appeler `finalizeDeposit` sur la passerelle de connexion L2

#### Couche 2 {#deposit-flow-layer-2}

5. La passerelle de connexion L2 vérifie que l'appel `finalizeDeposit` est légitime :
   - Provient du contrat de message inter-domaine
   - Était à l'origine en provenance de la passerelle de connexion sur L1
6. La passerelle de connexion L2 vérifie si le contrat de jeton ERC-20 sur L2 est le bon :
   - Le contrat L2 signale que son homologue L1 est identique à celui dont les jetons provenaient sur L1
   - Le contrat L2 signale qu'il prend en charge l'interface correcte ([en utilisant ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Si le contrat L2 est le bon, appelez-le pour frapper le nombre approprié de jetons à l'adresse appropriée. Sinon, commencez un processus de retrait pour permettre à l'utilisateur de réclamer les jetons sur L1.

### Flux de retrait {#withdrawal-flow}

#### Couche 2 {#withdrawl-flow-layer-2}

1. Le retirant appelle la passerelle de connexion L2 (`withdraw` ou `withdrawTo`)
2. La passerelle de connexion L2 brûle le nombre approprié de jetons appartenant à `msg.sender`
3. La passerelle de connexion L2 utilise le mécanisme de message inter-domaine pour appeler `finalizeETHWithdrawal` ou `finalizeERC20Withdrawal` de la passerelle L1

#### Couche 1 {#withdrawl-flow-layer-1}

4. La passerelle de connexion L1 vérifie que l'appel à `finalizeETHWithal` ou à `finalizeERC20Withal` est légitime :
   - Provient du mécanisme de message inter-domaine
   - Était à l'origine en provenance de la passerelle de connexion sur L2
5. La passerelle L1 transfère l'actif approprié (ETH ou ERC-20) à l'adresse appropriée

## Code de la couche 1 {#layer-1-code}

C'est le code qui s'exécute sur L1, le réseau principal Ethereum.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Cette interface est définie ici](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol). Elle comprend les fonctions et les définitions requises pour la connexion en passerelle des jetons ERC-20.

```solidity
// SPDX-License-Identifier: MIT
```

[La plupart du code Optimism est publié sous la licence MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Lors de l'écriture de cet article, la dernière version de Solidity était 0.8.12. Jusqu'à la publication de la version 0.9.0, nous ne saurons pas si ce code est compatible ou non.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Events *
     **********/

    event ERC20DepositInitiated(
```

Dans le terminologique des passerelles pour Optimism _deposit_ signifie transférer de L1 vers L2, et _withdrawal_ signifie un transfert de L2 vers L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

Dans la plupart des cas, l'adresse d'un ERC-20 sur L1 n'est pas la même que celle de l'équivalent ERC-20 sur L2. [Vous pouvez consulter la liste des adresses de jetons ici](https://static.optimism.io/optimism.tokenlist.json). L'adresse avec `chainId` 1 est sur L1 (le réseau principal) et l'adresse avec `chainId` 10 est sur L2 (Optimism). Les deux autres valeurs `chainId` sont pour le réseau de test Kovan (42) et le réseau de test Optimistic Kovan (69).

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

Le même contrat passerelle gère les transferts dans les deux sens. Dans le cas de la passerelle L1, cela signifie l'initialisation des dépôts et la finalisation des retraits.

```solidity

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev get the address of the corresponding L2 bridge contract.
     * @return Address of the corresponding L2 bridge contract.
     */
    function l2TokenBridge() external returns (address);
```

Cette fonction n'est pas vraiment nécessaire, car sur L2 c'est un contrat prédéployé, donc il sera toujours à l'adresse `0x420000000000000000000000000000000000000000000010`. Il est ici pour la symétrie avec la passerelle L2, car l'adresse de la passerelle de connexion L1 n'est _pas_ à connaître.

```solidity
    /**
     * @dev deposit an amount of the ERC20 to the caller's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _amount Amount of the ERC20 to deposit
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Le paramètre `_l2Gas` est le montant de gaz L2 que la transaction est autorisée à dépenser. [Jusqu'à une certaine limite (haute), c'est gratuit](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), donc à moins que le contrat ERC-20 ne fasse quelque chose de vraiment étrange lors de la frappe, il ne devrait pas y avoir de problème. Cette fonction prend en charge le scénario commun où un utilisateur relie les actifs à la même adresse sur une blockchain différente.

```solidity
    /**
     * @dev deposit an amount of ERC20 to a recipient's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _to L2 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
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
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ERC20 token.
     * This call will fail if the initialized withdrawal from L2 has not been finalized.
     *
     * @param _l1Token Address of L1 token to finalizeWithdrawal for.
     * @param _l2Token Address of L2 token where withdrawal was initiated.
     * @param _from L2 address initiating the transfer.
     * @param _to L1 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _data Data provided by the sender on L2. This data is provided
     *   solely as a convenience for external contracts. Aside from enforcing a maximum
     *   length, these contracts provide no guarantees about its content.
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

Les retraits (et autres messages de L2 vers L1) dans Optimism sont des processus en deux étapes :

1. Une transaction d'initialisation sur L2.
2. Une transaction de finalisation ou de réclamation sur L1. Cette transaction doit être réalisée après la [période de contestation des défauts](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) pour que la transaction L2 se termine.

### IL1StandardBridge {#il1standardbridge}

[Cette interface est définie ici](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol). Ce fichier contient des définitions d'événements et de fonctions pour ETH. Ces définitions sont très similaires à celles définies ci-dessus dans `IL1ERC20Bridge` pour ERC-20.

L'interface de passerelle est divisée entre deux fichiers puisque certains jetons ERC-20 nécessitent un traitement personnalisé et ne peuvent pas être traités par la passerelle de connexion standard. De cette façon, la passerelle personnalisée de connexion qui gère un tel jeton peut implémenter `IL1ERC20Bridge` et ne pas nécessiter une passerelle pour ETH.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Events *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Cet événement est presque identique à la version ERC-20 (`ERC20DepositInitiated`), mais sans les adresses de jeton L1 et L2. Il en va de même pour les autres événements et les fonctions.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev Deposit an amount of the ETH to the caller's balance on L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Deposit an amount of ETH to a recipient's balance on L2.
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
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ETH token. Since only the xDomainMessenger can call this function, it will never be called
     * before the withdrawal is finalized.
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

[Ce contrat](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) a hérité des deux passerelles ([L1](#the-l1-bridge-contract) et [L2](#the-l2-bridge-contract)) pour envoyer des messages à l'autre couche.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Cette interface](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) indique au contrat comment envoyer des messages à l'autre couche, en utilisant le messager inter-domaine. Cette messagerie transversale de domaine est un autre système à part entière et mériterait son propre article que j'espère écrire à l'avenir.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Helper contract for contracts performing cross-domain communications
 *
 * Compiler used: defined by inheriting contract
 */
contract CrossDomainEnabled {
    /*************
     * Variables *
     *************/

    // Messenger contract used to send and receive messages from the other domain.
    address public messenger;

    /***************
     * Constructor *
     ***************/

    /**
     * @param _messenger Address of the CrossDomainMessenger on the current layer.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Le seul paramètre que le contrat a besoin de connaître est l'adresse du messager de domaines croisés sur cette couche. Ce paramètre est défini une seule fois, dans le constructeur, et ne change jamais.

```solidity

    /**********************
     * Function Modifiers *
     **********************/

    /**
     * Enforces that the modified function is only callable by a specific cross-domain account.
     * @param _sourceDomainAccount The only account on the originating domain which is
     *  authenticated to call this function.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

La messagerie inter-domaine est accessible par n'importe quel contrat sur la blockchain où elle est exécutée (soit le réseau principal Ethereum, soit Optimism). Mais nous avons besoin du pont de chaque côté pour faire confiance _uniquement_ à certains messages qui viennent de la passerelle de l'autre côté.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Seuls les messages du messager inter-domaine approprié (`messenger`, comme indiqué ci-dessous) peuvent être fiables.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

La façon dont la messagerie inter-domaine fournit l'adresse qui a envoyé un message avec l'autre couche est [la fonction `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128). Tant qu'elle est appelée dans la transaction qui a été initiée par le message, elle peut fournir ces informations.

Nous devons nous assurer que le message que nous avons reçu provient bien de l'autre passerelle.

```solidity

        _;
    }

    /**********************
     * Internal Functions *
     **********************/

    /**
     * Gets the messenger, usually from storage. This function is exposed in case a child contract
     * needs to override.
     * @return The address of the cross-domain messenger contract which should be used.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Cette fonction retourne le messager inter-domaine. Nous utilisons une fonction plutôt que la variable `messenger` pour permettre aux contrats qui héritent de celui-ci d'utiliser un algorithme pour spécifier quel messager de domaine croisé utiliser.

```solidity

    /**
     * Sends a message to an account on another domain
     * @param _crossDomainTarget The intended recipient on the destination domain
     * @param _message The data to send to the target (usually calldata to a function with
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit The gasLimit for the receipt of the message on the target domain.
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

[Slither](https://github.com/crytic/slither) est un analyseur statique Optimism qui fonctionne sur chaque contrat pour rechercher des vulnérabilités et d'autres problèmes potentiels. Dans notre cas, la ligne suivante déclenche deux vulnérabilités :

1. [Événements de réentrance](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Réentrance Benign](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

Dans notre cas, nous ne devons pas nous inquiéter de la réentrance, nous savons que `getCrossDomainMessenger()` retourne une adresse digne de confiance, même si Slither n'a aucun moyen de le savoir.

### Le contrat de passerelle L1 {#the-l1-bridge-contract}

[Le code source de ce contrat se trouve ici](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Les interfaces peuvent faire partie d'autres contrats, elles doivent donc supporter un large éventail de versions Solidity. Mais la passerelle en elle-même est notre contrat, et nous pouvons être stricts quant à la version de Solidity utilisée.

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) et [IL1StandardBridge](#IL1StandardBridge) sont expliqués ci-dessus.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Cette interface](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) nous permet de créer des messages pour contrôler la passerelle de connexion standard sur L2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Cette interface](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) nous permet de piloter les contrats ERC-20. [Vous pouvez en savoir plus sur ce sujet ici](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Comme expliqué ci-dessus](#crossdomainenabled), ce contrat est utilisé pour la messagerie intercouche.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAdresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol)dispose des adresses pour les contrats L2 qui ont toujours la même adresse. Cela inclut la passerelle standard sur la L2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Utilitaires d'adresses OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Ils servent à distinguer les adresses contractuelles de celles appartenant à des comptes propriétaires externes (EOA).

Notez que ce n'est pas une solution parfaite, car il n'y a aucun moyen de distinguer les appels directs de ceux réalisés par le constructeur d'un contrat, mais au moins cela nous permet d'identifier et de prévenir certaines erreurs utilisateurs courantes.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[La norme ERC-20](https://eips.ethereum.org/EIPS/eip-20) prend en charge deux manières pour un contrat de signaler un échec :

1. Rétablir
2. Renvoyer `false`

La gestion des deux cas rendrait notre code plus compliqué donc à la place nous utilisons [le `SafeERC20` d'OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), qui s'assure que [tous les échecs aboutissent à un rétablissement](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev The L1 ETH and ERC20 Bridge is a contract which stores deposited L1 funds and standard
 * tokens that are in use on L2. It synchronizes a corresponding L2 Bridge, informing it of deposits
 * and listening to it for newly finalized withdrawals.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Cette ligne montre comment nous spécifions d'utiliser le wrapper `SafeERC20` chaque fois que nous utilisons l'interface `IERC20`.

```solidity

    /********************************
     * External Contract References *
     ********************************/

    address public l2TokenBridge;
```

L'adresse de [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // Maps L1 token to L2 token to balance of the L1 token deposited
    mapping(address => mapping(address => uint256)) public deposits;
```

Un double [mapping](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) comme celui-ci est la façon dont vous définissez un [rare tableau bidimensionnel](https://en.wikipedia.org/wiki/Sparse_matrix). Les valeurs dans cette structure de données sont identifiées comme `deposit[L1 token addr][L2 token addr]`. La valeur par défaut est zéro. Seules les cellules qui sont définies à une valeur différente sont écrites pour le stockage.

```solidity

    /***************
     * Constructor *
     ***************/

    // This contract lives behind a proxy, so the constructor parameters will go unused.
    constructor() CrossDomainEnabled(address(0)) {}
```

Pour pouvoir mettre à jour ce contrat sans avoir à copier toutes les variables dans le stockage. Pour cela, nous utilisons un [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), un contrat qui utilise [`delegatecall`](https://solidity-by-example.org/delegatecall/) pour transférer des appels à un contact distinct dont l'adresse est stockée par le contrat de proxy (lorsque vous mettez à jour, vous ordonnez au proxy de changer cette adresse). Lorsque vous utilisez `delegatecall` le stockage reste le stockage du contrat _appelant_, donc les valeurs de toutes les variables d'état du contrat ne sont pas affectées.

Un effet de cette pratique est que le stockage du contrat qui est _appelé_ de `delegatecall` n'est pas utilisé et donc les valeurs du constructeur qui lui sont passées n'ont pas d'importance. C'est la raison pour laquelle nous pouvons fournir une valeur absurde au constructeur `CrossDomainEnabled`. C'est aussi la raison pour laquelle l'initialisation ci-dessous est séparée du constructeur.

```solidity
    /******************
     * Initialization *
     ******************/

    /**
     * @param _l1messenger L1 Messenger address being used for cross-chain communications.
     * @param _l2TokenBridge L2 standard bridge address.
     */
    // slither-disable-next-line external-function
```

Ce [test Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) identifie les fonctions qui ne sont pas appelées à partir du code du contrat et pourrait donc être déclarées `external` au lieu de `public`. Le coût en gaz des fonctions `external` peut être diminué, car elles peuvent être fournies avec des paramètres dans le calldata. Les fonctions déclarées `public` doivent être accessibles depuis le contrat. Les contrats ne peuvent pas modifier leurs propres calldata ainsi, les paramètres doivent être en mémoire. Lorsqu'une telle fonction est appelée en externe, il est nécessaire de copier le calldata dans la mémoire, ce qui coûte du gaz. Dans ce cas, la fonction n'est appelée qu'une seule fois, donc son inefficacité n'a pas d'importance pour nous.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

La fonction `initialize` ne doit être appelée qu'une seule fois. Si l'adresse du messager inter-domaine L1 ou du jeton de connexion L2 changent, nous créons un nouveau proxy et une nouvelle passerelle qui l'appellera. Il est peu probable que cela se produise sauf lorsque le système dans son entier est mis à jour, ce qui est très rare.

Notez que cette fonction ne dispose d'aucun mécanisme qui délimite _qui_ peut l'appeler. Cela signifie qu'en théorie, un attaquant pourrait attendre que nous déployions le proxy et la première version de la passerelle de connexion et donc [front-run](https://solidity-by-example.org/hacks/front-running/) pour accéder à la fonction `initialize` avant que l'utilisateur légitime ne le fasse. Il existe deux méthodes pour éviter cela :

1. Si les contrats ne sont pas déployés directement par un EOA, mais [dans une transaction qui contient un autre contrat les créant](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) l'ensemble du processus peut être atomique, et se terminer avant que toute autre transaction soit exécutée.
2. Si l'appel légitime à `initialize` échoue, il est toujours possible d'ignorer le proxy et la passerelle de connexion nouvellement créé et d'en créer de nouveaux.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Ce sont les deux paramètres que la passerelle a besoin de connaître.

```solidity

    /**************
     * Depositing *
     **************/

    /** @dev Modifier requiring sender to be EOA.  This check could be bypassed by a malicious
     *  contract via initcode, but it takes care of the user error we want to avoid.
     */
    modifier onlyEOA() {
        // Used to stop deposits from contracts (avoid accidentally lost tokens)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

C'est la raison pour laquelle nous avions besoin des utilitaires d'`Address` d'OpenZeppelin.

```solidity
    /**
     * @dev This function can be called with no data
     * to deposit an amount of ETH to the caller's balance on L2.
     * Since the receive function doesn't take data, a conservative
     * default amount is forwarded to L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Cette fonction existe à des fins de test. Notez qu'il n'apparaît pas dans les définitions d'interface - elle n'est pas prévue pour une utilisation normale.

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

Ces deux fonctions sont enveloppées autour de `_initiateETHDeposit`, la fonction qui gère le dépôt réel ETH.

```solidity
    /**
     * @dev Performs the logic for deposits by storing the ETH and informing the L2 ETH Gateway of
     * the deposit.
     * @param _from Account to pull the deposit from on L1.
     * @param _to Account to give the deposit to on L2.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Construct calldata for finalizeDeposit call
        bytes memory message = abi.encodeWithSelector(
```

La façon dont les messages transversaux fonctionnent est que le contrat de destination est appelé avec le message comme ses calldata. Les contrats Solidity interprètent toujours si leurs calldata sont conformes aux [spécifications de l'ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html). La fonction Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) crée ces calldata.

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

Le message ici est destiné à appeler [la fonction `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) avec ces paramètres :

| Paramètre | Valeur                         | Signification                                                                                                                                         |
| --------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | Valeur spéciale pour représenter ETH (qui n'est pas un jeton ERC-20) sur L1                                                                           |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Le contrat L2 qui gère ETH sur Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (ce contrat est destiné à un usage Optimism uniquement interne) |
| \_from    | \_from                         | L'adresse sur L1 qui envoie l'ETH                                                                                                                     |
| \_to      | \_to                           | L'adresse sur L2 qui reçoit l'ETH                                                                                                                     |
| amount    | msg.value                      | Montant de Wei envoyé (qui a déjà été envoyé sur la passerelle)                                                                                       |
| \_data    | \_data                         | Date supplémentaire à joindre au dépôt                                                                                                                |

```solidity
        // Send calldata into L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Envoyez le message à travers le messager inter-domaine.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Émettre un événement pour informer toute application décentralisée qui écoute ce transfert.

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

Ces deux fonctions sont enveloppées autour de `_initiateERC20Deposit`, la fonction qui gère le dépôt réel ETH.

```solidity
    /**
     * @dev Performs the logic for deposits by informing the L2 Deposited Token
     * contract of the deposit and calling a handler to lock the L1 funds. (e.g. transferFrom)
     *
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _from Account to pull the deposit from on L1
     * @param _to Account to give the deposit to on L2
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
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

Cette fonction est similaire à `_initiateETHDeposit` ci-dessus, avec quelques différences importantes. La première différence est que cette fonction reçoit les adresses de jetons et le montant à transférer en tant que paramètres. Dans le cas d'ETH, l'appel à la passerelle comprend déjà le transfert de l'actif à la passerelle de connexion (`msg.value`).

```solidity
        // When a deposit is initiated on L1, the L1 Bridge transfers the funds to itself for future
        // withdrawals. safeTransferFrom also checks if the contract has code, so this will fail if
        // _from is an EOA or address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Les transferts de jetons ERC-20 suivent un processus différent de celui pour ETH :

1. L'utilisateur (`_from`) apporte une provision à la passerelle de connexion pour transférer les jetons appropriés.
2. L'utilisateur appelle la passerelle de connexion avec l'adresse du contrat de jeton, le montant, etc.
3. La passerelle transfère les jetons (à elle-même) dans le cadre du processus de dépôt.

La première étape peut se produire dans une transaction séparée des deux dernières. Cependant, front-running n'est pas un problème car les deux fonctions qui appellent `_initiateERC20Deposit` (`depositERC20` et `depositERC20To`) n'appellent cette fonction qu'avec `msg.sender` en tant que paramètre `_from`.

```solidity
        // Construct calldata for _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Send calldata into L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Ajoute le nombre de jetons déposés à la structure de données `deposits`. Il pourrait y avoir plusieurs adresses sur L2 qui correspondent au même jeton L1 ERC-20, donc il n'est pas suffisant d'utiliser le solde sur la passerelle de jetons L1 ERC-20 pour garder une trace des dépôts.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Cross-chain Functions *
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

La passerelle de connexion L2 envoie un message au messager du domaine transversal L2 qui fait que le messager du domaine transversal L1 appelle cette fonction (lorsque la transaction [qui finalise le message](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) est soumise sur L1, bien sûr).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Assurez-vous qu'il s'agit d'un message _légitime_ provenant de la messagerie inter-domaine et originaire de la passerelle de jeton L2. Cette fonction est utilisée pour retirer l'ETH de la passerelle de connexion ainsi, nous devons nous assurer qu'elle n'est appelée que par l'appelant autorisé.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Le moyen de transférer de l'ETH est d'appeler le destinataire avec le montant de wei dans le `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Émettre un événement à propos du retrait.

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

Cette fonction est similaire à `finalizeETHWithal` ci-dessus, avec les changements nécessaires pour les jetons ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Mettre à jour la structure de données `deposits`.

```solidity

        // When a withdrawal is finalized on L1, the L1 Bridge transfers the funds to the withdrawer
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Temporary - Migrating ETH *
     *****************************/

    /**
     * @dev Adds ETH balance to the account. This is meant to allow for ETH
     * to be migrated from an old gateway to a new gateway.
     * NOTE: This is left for one upgrade only so we are able to receive the migrated ETH from the
     * old contract
     */
    function donateETH() external payable {}
}
```

Il y a eu une implémentation antérieure de la passerelle. Lorsque nous sommes passés de l'implémentation à celle-ci, nous avons dû déplacer tous les actifs. Les jetons ERC-20 peuvent juste être déplacés. Cependant, pour transférer l'ETH à un contrat, vous avez besoin de l'approbation de ce contrat, ce que `donateETH` nous fournit.

## Jetons ERC-20 sur L2 {#erc-20-tokens-on-l2}

Pour qu'un jeton ERC-20 s'intègre dans la passerelle standard, il doit permettre à la passerelle de connexion standard, et _uniquement_ la passerelle standard, de frapper des jetons. Ceci est nécessaire, car les passerelles doivent s'assurer que le nombre de jetons circulant sur Optimism est égal au nombre de jetons verrouillés à l'intérieur du contrat passerelle L1. S'il existe trop de jetons sur L2, certains utilisateurs seraient incapables de récupérer leurs actifs sur L1. Au lieu d'une passerelle de confiance, nous recréerions en fait une [banque de réserve fractionnaire](https://www.investopedia.com/terms/f/fractionalreservebanking.asp). S'il y a trop de jetons sur L1, certains de ces jetons resteraient bloqués à l'intérieur du contrat passerelle pour toujours puisqu'il n'y a aucun moyen de les libérer sans brûler les jetons L2.

### IL2StandardERC20 {#il2standarderc20}

Chaque jeton ERC-20 sur L2 qui utilise la passerelle standard doit fournir [cette interface](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), qui possède les fonctions et les événements dont la passerelle standard a besoin.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[L'interface standard ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) ne dispose ni des fonctions `mint` ni `burn`. Ces méthodes ne sont pas requises par [le standard ERC-20](https://eips.ethereum.org/EIPS/eip-20), qui laisse les mécanismes non spécifiés pour créer et détruire des jetons.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[L'interface ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) est utilisée pour spécifier quelles fonctions sont proposées par un contrat. [Vous pouvez lire le standard ici](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Cette fonction fournit l'adresse du jeton L1 qui est relié à ce contrat. Notez que nous n'avons pas de fonction similaire dans la direction opposée. Nous devons être en mesure de relier tout jeton L1, que la prise en charge L2 ait été planifiée ou non lorsqu'il a été implémenté.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Les fonctions et événements à frapper (créer) et brûler (détruire) des jetons. La passerelle de connexion devrait être la seule entité qui puisse exécuter ces fonctions pour s'assurer que le nombre de jetons est correct (égal au nombre de jetons verrouillés sur L1).

### L2StandardERC20 {#L2StandardERC20}

[Ceci est notre implémentation de l'interface `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol). À moins que vous n'ayez besoin d'une sorte de logique personnalisée, vous devriez utiliser celle-ci.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Le contrat OpenZeppelin ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol). Optimism ne souhaite pas réinventer de la roue, surtout lorsque la roue est bien contrôlée et a besoin d'être suffisamment digne de confiance pour détenir des actifs.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Ce sont les deux paramètres de configuration supplémentaires dont nous avons besoin et que ERC-20 ne réalise normalement pas.

```solidity

    /**
     * @param _l2Bridge Address of the L2 standard bridge.
     * @param _l1Token Address of the corresponding L1 token.
     * @param _name ERC20 name.
     * @param _symbol ERC20 symbol.
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

En premier lieu, appelez le constructeur pour le contrat dont nous héritons de (`ERC20(_name, _symbol)`) et définissez ensuite vos propres variables.

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

C'est ainsi que fonctionne [ERC-165](https://eips.ethereum.org/EIPS/eip-165). Chaque interface est un certain nombre de fonctions supportées, et est identifiée comme ABI[exclusive ou](https://en.wikipedia.org/wiki/Exclusive_or) des [sélecteurs de fonctions ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) pour ces fonctions.

La passerelle de connexion L2 utilise ERC-165 comme vérification garantissant que le contrat ERC-20 auquel des actifs sont envoyés est un `IL2StandardERC20`.

**Remarque :** Il n'existe rien pour empêcher le contrat dévoyé de fournir de fausses réponses à `supportsInterface` ainsi, il s'agit donc d'un mécanisme de vérification et non _pas_ un mécanisme de sécurité.

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

Seul la passerelle L2 est autorisée à frapper et à brûler des actifs.

`_mint` et `_burn` sont définis dans le contrat [OpenZeppelin ERC-20](https://ethereum.org/en/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn). Ce contrat ne les expose pas en externe, parce que les conditions de frappe et de brûlage des jetons sont aussi variées que le nombre de façons d'utiliser ERC-20.

## Code de passerelle L2 {#l2-bridge-code}

Il s'agit du code qui exécute la passerelle de connexion sur Optimism. [La source de ce contrat se trouve ici](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

L'interface [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) est très similaire à [l'équivalent L1](#IL1ERC20Bridge) que nous avons vu ci-dessus. Il existe deux différences significatives :

1. Sur L1, vous initiez des dépôts et finalisez des retraits. Ici, vous initiez des retraits et finalisez les dépôts.
2. Sur L1, il est nécessaire de faire une distinction entre les jetons ETH et ERC-20. Sur L2, nous pouvons utiliser les mêmes fonctions pour les deux, parce que les soldes ETH en interne sur Optimism sont traités comme un jeton ERC-20 avec l'adresse [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://optimistic.etherscan.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev The L2 Standard bridge is a contract which works together with the L1 Standard bridge to
 * enable ETH and ERC20 transitions between L1 and L2.
 * This contract acts as a minter for new tokens when it hears about deposits into the L1 Standard
 * bridge.
 * This contract also acts as a burner of the tokens intended for withdrawal, informing the L1
 * bridge to release L1 funds.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * External Contract References *
     ********************************/

    address public l1TokenBridge;
```

Conserver la trace de l'adresse de la passerelle de connexion L1. Notez que contrairement à l'équivalent pour L1, ici nous \_ avons besoin \_de cette variable. L'adresse de la passerelle L1 n'est pas connue à l'avance.

```solidity

    /***************
     * Constructor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Cross-domain messenger used by this contract.
     * @param _l1TokenBridge Address of the L1 bridge deployed to the main chain.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Withdrawing *
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

Ces deux fonctions initient les retraits. Notez qu'il n'y a pas besoin de spécifier l'adresse de jeton L1. Les jetons L2 doivent nous indiquer l'adresse de l'équivalent L1.

```solidity

    /**
     * @dev Performs the logic for withdrawals by burning the token and informing
     *      the L1 token Gateway of the withdrawal.
     * @param _l2Token Address of L2 token where withdrawal is initiated.
     * @param _from Account to pull the withdrawal from on L2.
     * @param _to Account to give the withdrawal to on L1.
     * @param _amount Amount of the token to withdraw.
     * @param _l1Gas Unused, but included for potential forward compatibility considerations.
     * @param _data Optional data to forward to L1. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // When a withdrawal is initiated, we burn the withdrawer's funds to prevent subsequent L2
        // usage
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Notez que nous ne sommes _pas_ reliés au paramètre `_from` mais à `msg.sender` qui est beaucoup plus difficile à contrefaire (même impossible, à ma connaissance).

```solidity

        // Construct calldata for l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

Sur L1, il est nécessaire de faire une distinction entre les jetons ETH et ERC-20.

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

        // Send message up to L1 bridge
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Cross-chain Function: Depositing *
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

Cette fonction est appelée via `L1StandardBridge`.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

Assurez-vous que la source du message est fiable. C'est important car cette fonction appelle `_mint` et peut être utilisée pour donner des jetons qui ne sont pas couverts par des jetons que la passerelle possède sur L1.

```solidity
        // Check the target token is compliant and
        // verify the deposited token on L1 matches the L2 deposited token representation here
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Contrôle de cohérence :

1. L'interface correcte est prise en charge
2. L'adresse du contrat L2 ERC-20 du L1 correspond à la source L1 des jetons

```solidity
        ) {
            // When a deposit is finalized, we credit the account on L2 with the same amount of
            // tokens.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Si les contrôles de cohérence sont effectués, finalisez le dépôt :

1. Frapper les jetons
2. Émettre l'événement approprié

```solidity
        } else {
            // Either the L2 token which is being deposited-into disagrees about the correct address
            // of its L1 token, or does not support the correct interface.
            // This should only happen if there is a  malicious L2 token, or if a user somehow
            // specified the wrong L2 token address to deposit into.
            // In either case, we stop the process here and construct a withdrawal
            // message so that users can get their funds out in some cases.
            // There is no way to prevent malicious token contracts altogether, but this does limit
            // user error and mitigate some forms of malicious contract behavior.
```

Si un utilisateur a fait une erreur détectable en utilisant la mauvaise adresse de jeton L2, nous souhaitons annuler le dépôt et retourner les jetons sur L1. La seule façon de le faire à partir de L2 est d'envoyer un message qui devra attendre la période problématique de défaut mais c'est beaucoup mieux pour l'utilisateur que de perdre les jetons définitivement.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // switched the _to and _from here to bounce back the deposit to the sender
                _from,
                _amount,
                _data
            );

            // Send message up to L1 bridge
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Conclusion {#conclusion}

La passerelle standard est le mécanisme le plus souple pour les transferts d'actifs. Cependant, parce qu'il est si générique, ce n'est pas toujours le mécanisme le plus facile à utiliser. Spécialement pour les retraits, la plupart des utilisateurs préfèrent utiliser des [passerelles tierces](https://www.optimism.io/apps/bridges) qui n'attendent pas la période problématique et ne nécessitent pas de preuve de Merkle pour finaliser le retrait.

Ces passerelles fonctionnent généralement en ayant des actifs sur L1 qu'ils fournissent immédiatement moyennant un petit supplément (souvent inférieur au coût du gaz pour un retrait standard d'une passerelle). Quand la passerelle (ou la personne qui la gère) prévoit d'être en deçà des actifs L1, elle transfère suffisamment d'actifs de L2. Comme il s'agit de retraits très importants, le coût de retrait est amorti sur une somme importante et représente un pourcentage beaucoup plus faible.

Espérons que cet article vous aide à mieux comprendre comment la couche 2 fonctionne, et comment écrire du code Solidity clair et sécurisé.
