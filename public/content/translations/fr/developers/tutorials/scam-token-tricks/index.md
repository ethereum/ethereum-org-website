---
title: "Quelques astuces utilisées par les jetons frauduleux et comment les détecter"
description: "Dans ce tutoriel, nous décortiquons un jeton frauduleux pour voir certaines des astuces utilisées par les escrocs, comment ils les mettent en œuvre et comment nous pouvons les détecter."
author: Ori Pomerantz
tags:
  - escroquerie
  - solidity
  - erc-20
  - javascript
  - typescript
skill: intermediate
breadcrumb: Astuces des jetons frauduleux
published: 2023-09-15
lang: fr
---

Dans ce tutoriel, nous décortiquons [un jeton frauduleux](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) pour voir certaines des astuces utilisées par les escrocs et comment ils les mettent en œuvre. À la fin de ce tutoriel, vous aurez une vue plus complète des contrats de jetons ERC-20, de leurs capacités et des raisons pour lesquelles le scepticisme est nécessaire. Ensuite, nous examinerons les événements émis par ce jeton frauduleux et verrons comment nous pouvons identifier automatiquement qu'il n'est pas légitime.

## Jetons frauduleux - ce qu'ils sont, pourquoi les gens les créent et comment les éviter {#scam-tokens}

L'une des utilisations les plus courantes d'Ethereum est la création par un groupe d'un jeton négociable, en un sens leur propre monnaie. Cependant, partout où il y a des cas d'utilisation légitimes qui apportent de la valeur, il y a aussi des criminels qui essaient de voler cette valeur pour eux-mêmes.

Vous pouvez en lire plus sur ce sujet [ailleurs sur ethereum.org](/guides/how-to-id-scam-tokens/) du point de vue de l'utilisateur. Ce tutoriel se concentre sur la dissection d'un jeton frauduleux pour voir comment il est conçu et comment il peut être détecté.

### Comment savoir que wARB est une escroquerie ? {#warb-scam}

Le jeton que nous décortiquons est le [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), qui prétend être équivalent au [jeton ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) légitime.

La façon la plus simple de savoir quel est le jeton légitime est de regarder l'organisation d'origine, [Arbitrum](https://arbitrum.foundation/). Les adresses légitimes sont spécifiées [dans leur documentation](https://docs.arbitrum.foundation/deployment-addresses#token).

### Pourquoi le code source est-il disponible ? {#why-source}

Normalement, on s'attendrait à ce que les personnes qui essaient d'escroquer les autres soient secrètes, et en effet, de nombreux jetons frauduleux n'ont pas leur code disponible (par exemple, [celui-ci](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) et [celui-là](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Cependant, les jetons légitimes publient généralement leur code source, donc pour paraître légitimes, les auteurs de jetons frauduleux font parfois de même. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) est l'un de ces jetons dont le code source est disponible, ce qui facilite sa compréhension.

Bien que les déployeurs de contrats puissent choisir de publier ou non le code source, ils ne _peuvent pas_ publier le mauvais code source. L'explorateur de blocs compile le code source fourni de manière indépendante, et s'il n'obtient pas exactement le même bytecode, il rejette ce code source. [Vous pouvez en lire plus à ce sujet sur le site d'Etherscan](https://etherscan.io/verifyContract).

## Comparaison avec les jetons ERC-20 légitimes {#compare-legit-erc20}

Nous allons comparer ce jeton à des jetons ERC-20 légitimes. Si vous n'êtes pas familier avec la façon dont les jetons ERC-20 légitimes sont généralement écrits, [consultez ce tutoriel](/developers/tutorials/erc20-annotated-code/).

### Constantes pour les adresses privilégiées {#constants-for-privileged-addresses}

Les contrats ont parfois besoin d'adresses privilégiées. Les contrats conçus pour une utilisation à long terme permettent à une adresse privilégiée de modifier ces adresses, par exemple pour permettre l'utilisation d'un nouveau contrat multisig. Il existe plusieurs façons de le faire.

Le [contrat de jeton `HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) utilise le modèle [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). L'adresse privilégiée est conservée dans le stockage, dans un champ appelé `_owner` (voir le troisième fichier, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

Le [contrat de jeton `ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) n'a pas d'adresse privilégiée directement. Cependant, il n'en a pas besoin. Il se trouve derrière un [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) à [l'adresse `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Ce contrat a une adresse privilégiée (voir le quatrième fichier, `ERC1967Upgrade.sol`) qui peut être utilisée pour les mises à niveau.

```solidity
    /**
     * @dev Stocke une nouvelle adresse dans l'emplacement d'administrateur EIP1967.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

En revanche, le contrat `wARB` a un `contract_owner` codé en dur.

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[Ce propriétaire de contrat](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) n'est pas un contrat qui pourrait être contrôlé par différents comptes à différents moments, mais un [compte détenu en externe](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Cela signifie qu'il est probablement conçu pour une utilisation à court terme par un individu, plutôt que comme une solution à long terme pour contrôler un ERC-20 qui conservera sa valeur.

Et en effet, si nous regardons dans Etherscan, nous voyons que l'escroc n'a utilisé ce contrat que pendant 12 heures (de la [première transaction](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) à la [dernière transaction](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) au cours du 19 mai 2023.

### La fausse fonction `_transfer` {#the-fake-transfer-function}

Il est courant que les transferts réels se produisent en utilisant [une fonction interne `_transfer`](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

Dans `wARB`, cette fonction semble presque légitime :

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

La partie suspecte est :

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

Si le propriétaire du contrat envoie des jetons, pourquoi l'événement `Transfer` indique-t-il qu'ils proviennent de `deployer` ?

Cependant, il y a un problème plus important. Qui appelle cette fonction `_transfer` ? Elle ne peut pas être appelée de l'extérieur, elle est marquée `internal`. Et le code que nous avons n'inclut aucun appel à `_transfer`. De toute évidence, elle est là comme leurre.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

Lorsque nous regardons les fonctions qui sont appelées pour transférer des jetons, `transfer` et `transferFrom`, nous voyons qu'elles appellent une fonction complètement différente, `_f_`.

### La vraie fonction `_f_` {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Il y a deux signaux d'alarme potentiels dans cette fonction.

- L'utilisation du [modificateur de fonction](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. Cependant, lorsque nous regardons dans le code source, nous voyons que `_mod_` est en fait inoffensif.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- Le même problème que nous avons vu dans `_transfer`, à savoir que lorsque `contract_owner` envoie des jetons, ils semblent provenir de `deployer`.

### La fausse fonction d'événements `dropNewTokens` {#the-fake-events-function-dropnewtokens}

Nous en arrivons maintenant à quelque chose qui ressemble à une véritable escroquerie. J'ai un peu modifié la fonction pour des raisons de lisibilité, mais elle est fonctionnellement équivalente.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Cette fonction a le modificateur `auth()`, ce qui signifie qu'elle ne peut être appelée que par le propriétaire du contrat.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

Cette restriction est tout à fait logique, car nous ne voudrions pas que des comptes aléatoires distribuent des jetons. Cependant, le reste de la fonction est suspect.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Une fonction pour transférer d'un compte de pool vers un tableau de destinataires un tableau de montants est tout à fait logique. Il existe de nombreux cas d'utilisation dans lesquels vous voudrez distribuer des jetons d'une source unique vers plusieurs destinations, comme la paie, les airdrops, etc. Il est moins cher (en gaz) de le faire en une seule transaction au lieu d'émettre plusieurs transactions, ou même d'appeler l'ERC-20 plusieurs fois à partir d'un contrat différent dans le cadre de la même transaction.

Cependant, `dropNewTokens` ne fait pas cela. Elle émet des [événements `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), mais ne transfère en réalité aucun jeton. Il n'y a aucune raison légitime de semer la confusion dans les applications hors chaîne en leur signalant un transfert qui n'a pas vraiment eu lieu.

### La fonction `Approve` pour brûler {#the-burning-approve-function}

Les contrats ERC-20 sont censés avoir [une fonction `approve`](/developers/tutorials/erc20-annotated-code/#approve) pour les allocations, et en effet notre jeton frauduleux a une telle fonction, et elle est même correcte. Cependant, comme Solidity descend du C, il est sensible à la casse. « Approve » et « approve » sont des chaînes de caractères différentes.

De plus, la fonctionnalité n'est pas liée à `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Cette fonction est appelée avec un tableau d'adresses pour les détenteurs du jeton.

```solidity
    public approver() {
```

Le modificateur `approver()` s'assure que seul `contract_owner` est autorisé à appeler cette fonction (voir ci-dessous).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

Pour chaque adresse de détenteur, la fonction déplace le solde entier du détenteur vers l'adresse `0x00...01`, le brûlant effectivement (le véritable `burn` dans la norme modifie également l'offre totale, et transfère les jetons vers `0x00...00`). Cela signifie que `contract_owner` peut supprimer les actifs de n'importe quel utilisateur. Cela ne semble pas être une fonctionnalité que vous voudriez dans un jeton de gouvernance.

### Problèmes de qualité du code {#code-quality-issues}

Ces problèmes de qualité du code ne _prouvent_ pas que ce code est une escroquerie, mais ils le rendent suspect. Les entreprises organisées telles qu'Arbitrum ne publient généralement pas de code aussi mauvais.

#### La fonction `mount` {#the-mount-function}

Bien que ce ne soit pas spécifié dans [la norme](https://eips.ethereum.org/EIPS/eip-20), en règle générale, la fonction qui crée de nouveaux jetons est appelée [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

Si nous regardons dans le constructeur `wARB`, nous voyons que la fonction de frappe a été renommée en `mount` pour une raison quelconque, et est appelée cinq fois avec un cinquième de l'offre initiale, au lieu d'une seule fois pour le montant total par souci d'efficacité.

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

La fonction `mount` elle-même est également suspecte.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

En regardant le `require`, nous voyons que seul le propriétaire du contrat est autorisé à frapper. C'est légitime. Mais le message d'erreur devrait être _only owner is allowed to mint_ ou quelque chose de similaire. Au lieu de cela, il s'agit du message non pertinent _ERC20: mint to the zero address_. Le test correct pour la frappe vers l'adresse zéro est `require(account != address(0), "<error message>")`, que le contrat ne prend jamais la peine de vérifier.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Il y a deux autres faits suspects, directement liés à la frappe :

- Il y a un paramètre `account`, qui est vraisemblablement le compte qui devrait recevoir le montant frappé. Mais le solde qui augmente est en fait celui de `contract_owner`.

- Bien que le solde augmenté appartienne à `contract_owner`, l'événement émis montre un transfert vers `account`.

### Pourquoi à la fois `auth` et `approver` ? Pourquoi le `mod` qui ne fait rien ? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Ce contrat contient trois modificateurs : `_mod_`, `auth` et `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` prend trois paramètres et n'en fait rien. Pourquoi l'avoir ?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth` et `approver` sont plus logiques, car ils vérifient que le contrat a été appelé par `contract_owner`. On s'attendrait à ce que certaines actions privilégiées, telles que la frappe, soient limitées à ce compte. Cependant, quel est l'intérêt d'avoir deux fonctions distinctes qui font _exactement la même chose_ ?

## Que pouvons-nous détecter automatiquement ? {#what-can-we-detect-automatically}

Nous pouvons voir que `wARB` est un jeton frauduleux en regardant sur Etherscan. Cependant, il s'agit d'une solution centralisée. En théorie, Etherscan pourrait être subverti ou piraté. Il est préférable de pouvoir déterminer de manière indépendante si un jeton est légitime ou non.

Il existe quelques astuces que nous pouvons utiliser pour identifier qu'un jeton ERC-20 est suspect (soit une escroquerie, soit très mal écrit), en examinant les événements qu'il émet.

## Événements `Approval` suspects {#suspicious-approval-events}

Les [événements `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) ne devraient se produire qu'avec une requête directe (contrairement aux [événements `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1) qui peuvent se produire à la suite d'une allocation). [Consultez la documentation de Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) pour une explication détaillée de ce problème et pourquoi les requêtes doivent être directes, plutôt que médiées par un contrat.

Cela signifie que les événements `Approval` qui approuvent les dépenses à partir d'un [compte détenu en externe](/developers/docs/accounts/#types-of-account) doivent provenir de transactions qui ont pour origine ce compte, et dont la destination est le contrat ERC-20. Tout autre type d'approbation provenant d'un compte détenu en externe est suspect.

Voici [un programme qui identifie ce type d'événement](https://github.com/qbzzt/20230915-scam-token-detection), en utilisant [Viem](https://viem.sh/) et [TypeScript](https://www.typescriptlang.org/docs/), une variante de JavaScript avec sécurité de typage. Pour l'exécuter :

1. Copiez `.env.example` vers `.env`.
2. Modifiez `.env` pour fournir l'URL vers un nœud du réseau principal Ethereum.
3. Exécutez `pnpm install` pour installer les paquets nécessaires.
4. Exécutez `pnpm susApproval` pour rechercher les approbations suspectes.

Voici une explication ligne par ligne :

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

Importez les définitions de type, les fonctions et la définition de la chaîne depuis `viem`.

```typescript
import { config } from "dotenv"
config()
```

Lisez `.env` pour obtenir l'URL.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

Créez un client Viem. Nous n'avons besoin que de lire depuis la chaîne de blocs, ce client n'a donc pas besoin d'une clé privée.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

L'adresse du contrat ERC-20 suspect, et les blocs dans lesquels nous chercherons des événements. Les fournisseurs de nœuds limitent généralement notre capacité à lire les événements car la bande passante peut devenir coûteuse. Heureusement, `wARB` n'a pas été utilisé pendant une période de dix-huit heures, nous pouvons donc rechercher tous les événements (il n'y en avait que 13 au total).

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

C'est la façon de demander à Viem des informations sur les événements. Lorsque nous lui fournissons la signature exacte de l'événement, y compris les noms de champs, il analyse l'événement pour nous.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Notre algorithme n'est applicable qu'aux comptes détenus en externe. S'il y a un bytecode renvoyé par `client.getBytecode`, cela signifie qu'il s'agit d'un contrat et nous devrions simplement l'ignorer.

Si vous n'avez jamais utilisé TypeScript auparavant, la définition de la fonction peut sembler un peu étrange. Nous ne lui disons pas seulement que le premier (et unique) paramètre s'appelle `addr`, mais aussi qu'il est de type `Address`. De même, la partie `: boolean` indique à TypeScript que la valeur de retour de la fonction est un booléen.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Cette fonction obtient le reçu de transaction à partir d'un événement. Nous avons besoin du reçu pour nous assurer de connaître la destination de la transaction.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

C'est la fonction la plus importante, celle qui décide réellement si un événement est suspect ou non. Le type de retour, `(Event | null)`, indique à TypeScript que cette fonction peut renvoyer soit un `Event` soit `null`. Nous renvoyons `null` si l'événement n'est pas suspect.

```typescript
const owner = ev.args._owner
```

Viem a les noms de champs, il a donc analysé l'événement pour nous. `_owner` est le propriétaire des jetons à dépenser.

```typescript
// Les approbations par des contrats ne sont pas suspectes
if (await isContract(owner)) return null
```

Si le propriétaire est un contrat, supposez que cette approbation n'est pas suspecte. Pour vérifier si l'approbation d'un contrat est suspecte ou non, nous devrons tracer l'exécution complète de la transaction pour voir si elle est jamais parvenue au contrat propriétaire, et si ce contrat a appelé le contrat ERC-20 directement. C'est beaucoup plus coûteux en ressources que ce que nous aimerions faire.

```typescript
const txn = await getEventTxn(ev)
```

Si l'approbation provient d'un compte détenu en externe, obtenez la transaction qui l'a causée.

```typescript
// L'approbation est suspecte si elle provient d'un propriétaire d'EOA qui n'est pas le `from` de la transaction
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Nous ne pouvons pas simplement vérifier l'égalité des chaînes de caractères car les adresses sont hexadécimales, elles contiennent donc des lettres. Parfois, par exemple dans `txn.from`, ces lettres sont toutes en minuscules. Dans d'autres cas, comme `ev.args._owner`, l'adresse est en [casse mixte pour l'identification des erreurs](https://eips.ethereum.org/EIPS/eip-55).

Mais si la transaction ne provient pas du propriétaire, et que ce propriétaire est détenu en externe, alors nous avons une transaction suspecte.

```typescript
// C'est également suspect si la destination de la transaction n'est pas le contrat ERC-20 que nous
// examinons
if (txn.to.toLowerCase() != testedAddress) return ev
```

De même, si l'adresse `to` de la transaction, le premier contrat appelé, n'est pas le contrat ERC-20 en cours d'investigation, alors elle est suspecte.

```typescript
    // S'il n'y a aucune raison d'avoir des soupçons, renvoyer null.
    return null
}
```

Si aucune des conditions n'est vraie, alors l'événement `Approval` n'est pas suspect.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Une fonction `async`](https://www.w3schools.com/js/js_async.asp) renvoie un objet `Promise`. Avec la syntaxe courante, `await x()`, nous attendons que cette `Promise` soit remplie avant de poursuivre le traitement. C'est simple à programmer et à suivre, mais c'est aussi inefficace. Pendant que nous attendons que la `Promise` pour un événement spécifique soit remplie, nous pouvons déjà commencer à travailler sur l'événement suivant.

Ici, nous utilisons [`map`](https://www.w3schools.com/jsref/jsref_map.asp) pour créer un tableau d'objets `Promise`. Ensuite, nous utilisons [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) pour attendre que toutes ces promesses soient résolues. Nous utilisons ensuite [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) sur ces résultats pour supprimer les événements non suspects.

### Événements `Transfer` suspects {#suspicious-transfer-events}

Une autre façon possible d'identifier les jetons frauduleux est de voir s'ils ont des transferts suspects. Par exemple, des transferts depuis des comptes qui n'ont pas autant de jetons. Vous pouvez voir [comment mettre en œuvre ce test](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), mais `wARB` n'a pas ce problème.

## Conclusion {#conclusion}

La détection automatisée des escroqueries ERC-20 souffre de [faux négatifs](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), car une escroquerie peut utiliser un contrat de jeton ERC-20 parfaitement normal qui ne représente tout simplement rien de réel. Vous devriez donc toujours essayer d'obtenir _l'adresse du jeton à partir d'une source de confiance_.

La détection automatisée peut aider dans certains cas, comme les éléments de la DeFi, où il y a de nombreux jetons et où ils doivent être gérés automatiquement. Mais comme toujours, [la prudence est de mise](https://www.investopedia.com/terms/c/caveatemptor.asp), faites vos propres recherches et encouragez vos utilisateurs à faire de même.

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).