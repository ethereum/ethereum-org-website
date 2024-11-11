---
title: Sécurité
description: Considérations de sécurité pour les développeurs Ethereum
lang: fr
---

Les contrats intelligents Ethereum sont extrêmement flexibles, capables à la fois de détenir de grandes quantités de jetons (souvent plus de 1 milliard de $) et d'exécuter une logique immuable sur du code intelligent précédemment déployé. Alors que cela a créé un écosystème dynamique et créatif de contrats intelligents interconnectés et trustless, c'est aussi l'écosystème parfait pour attirer les attaquants qui cherchent à en tirer profit en exploitant des vulnérabilités dans les contrats intelligents et des comportements inattendus dans Ethereum. Le code d'un contrat intelligent ne peut _habituellement_ pas être modifié pour corriger les défauts de sécurité, les actifs volés à partir de contrats intelligents sont irrécupérables et extrêmement difficiles à tracer. Le montant total volé ou perdu en raison de problèmes sur les contrats intelligents atteint facilement le milliard de dollars. Voici quelques-uns des problèmes les plus importants dus à des erreurs de codage de contrat intelligent :

- [Problème n°1 de multisig Parity - 30 millions de dollars perdus](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach)
- [Problème n°2 de multisig Parity - 300 millions de dollars perdus](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)
- [Hack TheDAO, 3,6 millions d'ETH ! Prés de 1 milliard de dollars en prix actuel de l'ETH](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)

## Prérequis {#prerequisites}

Cette page couvre la sécurité des contrats intelligents, donc assurez-vous d'être familiarisé avec les [contrats intelligents](/developers/docs/smart-contracts/) avant d'aborder la sécurité.

## Comment écrire un code de contrats intelligents plus sécurisé {#how-to-write-more-secure-smart-contract-code}

Avant de lancer un code sur le réseau principal, il est important de prendre des précautions suffisantes pour protéger tout ce qui a de la valeur et qui est confié à votre contrat intelligent. Dans cet article, nous allons discuter de quelques attaques spécifiques, fournir des ressources pour en savoir plus sur les types d'attaques, et vous donner quelques outils et bonnes pratiques de base pour assurer le bon fonctionnement et la sécurité de vos contrats.

## Les audits ne sont pas une solution miracle {#audits-are-not-a-silver-bullet}

Il y a des années, les outils permettant d'écrire, de compiler, de tester et de déployer des contrats intelligents manquaient de maturité, ce qui a généré de nombreux projets désordonnés d'écriture de code Solidity, code qui était ensuite transmis à un expert pour examen afin de s'assurer qu'il fonctionnait de façon sécurisée et comme prévu. En 2020, les processus de développement et les outils qui prennent en charge l'écriture de Solidity sont nettement meilleurs. En exploiter les bonnes pratiques permet non seulement de garantir que votre projet est plus facile à gérer, mais cela constitue un élément essentiel de sa sécurité. Un audit en fin de rédaction de votre contrat intelligent ne suffit plus comme seule considération de sécurité. La sécurité commence bien avant d'écrire votre première ligne de code de contrat intelligent, **elle commence par des processus de conception et de développement adéquats**.

## Processus de développement de contrats intelligents {#smart-contract-development-process}

Il faut au minimum que :

- tout le code soit stocké dans un système de contrôle de version comme git ;
- toutes les modifications de code soient effectuées via des PR (Pull Requests) ;
- toutes les PR aient au moins un réviseur ; _Si vous travaillez sur un projet en solo, envisagez de trouver un autre auteur solo pour négocier des révisions de code !_
- une seule commande compile, déploie et exécute une suite de tests sur votre code en utilisant un environnement de développement Ethereum;
- vous ayez exécuté votre code via des outils d'analyse basiques comme Mythril et Slither, idéalement avant que chaque PR soit fusionnée, en comparant les différences de sortie ;
- Solidity n'émette aucune alerte à la compilation ;
- votre code soit bien documenté.

Il y a bien d'autres choses à dire sur les processus de développement, mais ces éléments constituent un bon point de départ. Pour plus d'éléments et d'explications détaillées, consultez la [liste de contrôle qualité des processus, fournie par DeFiSafety](https://docs.defisafety.com/audit-process-documentation/process-quality-audit-process). [DefiSafety](https://defisafety.com/) est un service public non officiel qui publie des avis sur diverses DApps Ethereum publiques de grande taille. Une partie du système d'évaluation de DeFiSafety comprend la façon dont le projet adhère à cette liste de contrôle qualité des processus. En suivant ces processus :

- vous produirez du code plus sécurisé, via des tests reproductibles et automatisés ;
- les experts seront en mesure de vérifier votre projet plus efficacement ;
- l'intégration de nouveaux développeurs sera plus simple ;
- les développeurs pourront itérer, tester et obtenir des commentaires sur les modifications rapidement ;
- votre projet enregistrera probablement moins de régressions.

## Attaques et vulnérabilités {#attacks-and-vulnerabilities}

Maintenant que vous écrivez du code Solidity en utilisant un processus de développement efficace, examinons quelques vulnérabilités courantes de Solidity pour voir ce qui peut mal tourner.

### Réentrance {#re-entrancy}

La réentrance est l'un des problèmes de sécurité les plus importants à considérer lors du développement de contrats intelligents. L'EVM ne pouvant pas exécuter plusieurs contrats en même temps, un contrat appelant un autre contrat met en pause l'exécution du contrat appelant et l'état de la mémoire jusqu'à ce que l'appel revienne, événement à partir duquel l'exécution reprend normalement. Cette pause et cette reprise peuvent créer une vulnérabilité connue sous le nom de "réentrance".

Voici une version simple d'un contrat vulnérable à la réentrance :

```solidity
// CE CONTRAT A UNE VULNÉRABILITÉ INTENTIONNELLE, NE PAS COPIER
contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Pour permettre à un utilisateur de retirer l'ETH qu'il a précédemment stocké dans le contrat, cette fonction :

1. lit le solde de l'utilisateur ;
2. lui envoie le solde en ETH ;
3. réinitialise le solde à 0, de sorte que l'utilisateur ne puisse pas retirer le solde de nouveau.

Si elle est appelée à partir d'un compte régulier (comme votre propre compte MetaMask), cette fonction est comme attendue : msg.sender.call.value() envoie simplement l'ETH vers votre compte. Toutefois, les contrats intelligents peuvent également effectuer des appels. Si un contrat personnalisé et malveillant appelle la fonction `withdraw()`, msg.sender.call.value() n'enverra pas le montant d'ETH (via `amount`), mais appellera aussi implicitement le contrat pour commencer à exécuter du code. Imaginez le contrat malveillant suivant :

```solidity
contract Attacker {
    function beginAttack() external payable {
        Victim(VICTIM_ADDRESS).deposit.value(1 ether)();
        Victim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
    }
}
```

Appeler Attacker.beginAttack() démarrera un cycle qui ressemble à quelque chose comme ça :

```
0.) Attacker's EOA calls Attacker.beginAttack() with 1 ETH
0.) Attacker.beginAttack() deposits 1 ETH into Victim

  1.) Attacker -> Victim.withdraw()
  1.) Victim reads balanceOf[msg.sender]
  1.) Victim sends ETH to Attacker (which executes default function)
    2.) Attacker -> Victim.withdraw()
    2.) Victim reads balanceOf[msg.sender]
    2.) Victim sends ETH to Attacker (which executes default function)
      3.) Attacker -> Victim.withdraw()
      3.) Victim reads balanceOf[msg.sender]
      3.) Victim sends ETH to Attacker (which executes default function)
        4.) Attacker no longer has enough gas, returns without calling again
      3.) balances[msg.sender] = 0;
    2.) balances[msg.sender] = 0; (it was already 0)
  1.) balances[msg.sender] = 0; (it was already 0)
```

Appeller Attacker.beginAttack avec 1 ETH génère une nouvelle attaque par réentrance contre la victime, retirant plus d'ETH qu'il n'en a été fourni (prélevé sur les soldes des autres utilisateurs, entraînant une sous-garantie du contrat de la victime)

### Comment gérer la réentrance (de la mauvaise façon) {#how-to-deal-with-re-entrancy-the-wrong-way}

On pourrait envisager de contrecarrer la réentrance en empêchant simplement les contrats intelligents d'interagir avec votre code. Vous recherchez stackoverflow, vous trouvez cet extrait de code avec des tonnes de votes positifs :

```solidity
function isContract(address addr) internal returns (bool) {
  uint size;
  assembly { size := extcodesize(addr) }
  return size > 0;
}
```

Cela semble sensé : les contrats ont du code, si l'appelant a du code, cele ne l'autorise pas à déposer. Tentons de l'ajouter :

```solidity
// CE CONTRAT A UNE VULNÉRABILITÉ INTENTIONNELLE, NE PAS COPIER
contract ContractCheckVictim {
    mapping (address => uint256) public balances;

    function isContract(address addr) internal returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

    function deposit() external payable {
        require(!isContract(msg.sender)); // <- NEW LINE
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Maintenant pour déposer de l'ETH, vous ne devez pas avoir de code de contrat intelligent à votre adresse. Ceci est néanmoins facilement surmonté avec le contrat d'attaquant suivant :

```solidity
contract ContractCheckAttacker {
    constructor() public payable {
        ContractCheckVictim(VICTIM_ADDRESS).deposit(1 ether); // <- New line
    }

    function beginAttack() external payable {
        ContractCheckVictim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
   }
}
```

Alors que la première attaque était une attaque sur la logique du contrat, il s'agit maintenant d'une attaque sur le comportement de déploiement du contrat Ethereum. Pendant la construction, un contrat n'a pas encore renvoyé le code à déployer à son adresse, mais conserve le contrôle complet de l'EVM DURANT ce processus.

Il est techniquement possible d'empêcher les contrats intelligents d'appeler votre code, en utilisant cette ligne :

```solidity
require(tx.origin == msg.sender)
```

Cependant, ce n'est toujours pas une bonne solution. L'un des aspects les plus passionnants d'Ethereum est sa composabilité : ses contrats intelligents s'intègrent et se construisent les uns avec les autres. En utilisant la ligne ci-dessus, vous limitez l'utilité de votre projet.

### Comment gérer la réentrance (de la bonne façon) {#how-to-deal-with-re-entrancy-the-right-way}

En changeant simplement l'ordre de la mise à jour de stockage et de l'appel externe, nous empêchons la condition de réentrance qui a permis l'attaque. Un rappel vers un retrait, bien que possible, ne profitera pas à l'attaquant puisque le stockage des `soldes` sera déjà défini à 0.

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

Le code ci-dessus suit le modèle de conception "Checks-Effects-Interactions", qui aide à se protéger contre la réentrance. En savoir plus sur le modèle [Checks-Effects-Interactions](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html)

### Comment gérer la réentrance (l'option nucléaire) {#how-to-deal-with-re-entrancy-the-nuclear-option}

Chaque fois que vous envoyez de l'ETH à une adresse non fiable ou que vous interagissez avec un contrat inconnu (comme appeler le "`transfer()`" d'une adresse de jeton fournie par l'utilisateur), vous vous exposez à un risque de réentrance. **En concevant des contrats qui n'envoient pas d'ETH et n'appellent pas de contrats non fiables, vous empêchez la possiblité de réentrance !**

## Autres types d'attaques {#more-attack-types}

Les types d'attaque ci-dessus couvrent les problèmes de codage de contrats intelligents (réentrance) et les anomalies Ethereum (exécution de code dans les constructeurs de contrats, avant que le code ne soit disponible à l'adresse du contrat). Il existe beaucoup, beaucoup d'autres types d'attaque à connaître, y compris :

- Front running
- Rejet d'envoi d'ETH
- Dépassement/sous-flux d'entier

Complément d'information:

- [Consensys Smart Contract Known Attacks](https://consensys.github.io/smart-contract-best-practices/attacks/) - Une explication très lisible des vulnérabilités les plus importantes, avec un exemple de code pour la plupart.
- [Registre SWC](https://swcregistry.io/docs/SWC-128) - Liste conservée des CWE qui s'appliquent à Ethereum et aux contrats intelligents

## Outils de sécurité {#security-tools}

Bien qu'il n'y ait pas de substitut à la compréhension des bases de sécurité d'Ethereum et à l'engagement d'un expert pour revoir votre code, il existe de nombreux outils disponibles pour aider à mettre en évidence les problèmes potentiels présents dans votre code.

### Sécurité des contrats intelligents {#smart-contract-security}

**Slither -** **_Framework d'analyse statique Solidity rédigé en Python 3_**

- [GitHub](https://github.com/crytic/slither)

**MythX -** **_API d'analyse de sécurité pour les contrats intelligents Ethereum_**

- [mythx.io](https://mythx.io/)
- [Documentation](https://docs.mythx.io/en/latest/)

**Mythril -** **_Outil d'analyse de sécurité pour le bytecode de l'EVM_**

- [mythril](https://github.com/ConsenSys/mythril)
- [Documentation](https://mythril-classic.readthedocs.io/en/master/about.html)

**Manticore -** **_Interface en ligne de commande qui utilise un outil d'exécution symbolique sur les contrats intelligents et les fichiers binaires_**

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentation](https://github.com/trailofbits/manticore/wiki)

**Securify -** **_Scanner de sécurité pour les contrats intelligents Ethereum_**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier -** **_Outil utilisé pour vérifier qu'un contrat est conforme à la norme ERC20_**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Forum](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### Vérification formelle {#formal-verification}

**Informations sur la vérification formelle**

- [How formal verification of smart-contacts works](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _- Brian Marick, 20 juillet 2018_
- [How Formal Verification Can Ensure Flawless Smart Contracts](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _29 - Bernard Mueller, janvier 2018_

### Utilisation d'outils {#using-tools}

Deux des outils les plus populaires pour l'analyse de sécurité des contrats intelligents sont :

- [Slither](https://github.com/crytic/slither) par [Trail of Bits](https://www.trailofbits.com/) (version hébergée : [Crytic](https://crytic.io/))
- [Mythril](https://github.com/ConsenSys/mythril) par [ConsenSys](https://consensys.net/) (version hébergée : [MythX](https://mythx.io/))

Tous deux sont des outils utiles qui analysent votre code et signalent les problèmes. Chacun possède une version hébergée par [commercial], mais est également disponible gratuitement pour fonctionner localement. Voici un bref exemple de la façon d'exécuter Slither, disponible dans une image Docker pratique `trailofbits/eth-security-toolbox`. Vous devrez [installer Node.js](https://nodejs.org/) si vous ne l’avez pas déjà fait.

```bash
$ mkdir test-slither
$ curl https://gist.githubusercontent.com/epheph/460e6ff4f02c4ac582794a41e1f103bf/raw/9e761af793d4414c39370f063a46a3f71686b579/gistfile1.txt > bad-contract.sol
$ docker run -v `pwd`:/share  -it --rm trailofbits/eth-security-toolbox
docker$ cd /share
docker$ solc-select 0.5.11
docker$ slither bad-contract.sol
```

génèrera cette sortie :

```bash
ethsec@1435b241ca60:/share$ slither bad-contract.sol
INFO:Detectors:
Reentrancy in Victim.withdraw() (bad-contract.sol#11-16):
    External calls:
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
    State variables written after the call(s):
    - balances[msg.sender] = 0 (bad-contract.sol#15)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities
INFO:Detectors:
Low level call in Victim.withdraw() (bad-contract.sol#11-16):
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#low-level-calls
INFO:Slither:bad-contract.sol analyzed (1 contracts with 46 detectors), 2 result(s) found
INFO:Slither:Use https://crytic.io/ to get access to additional detectors and GitHub integration
```

Slither a identifié le potentiel de réentrance, ainsi que les lignes clés où le problème pourrait se produire, et nous donne un lien pour plus de détails sur le problème ici :

> Reference : https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities

Ceci vous permet de connaître rapidement les problèmes potentiels dans votre code. Comme tous les outils de test automatisés, Slither n'est pas parfait, et peut signaler trop d'erreurs dans le rapport. Il peut avertir d'une éventuelle réentrance, même si aucune vulnérabilité exploitable n'existe. Souvent, l'examen des DIFFERENCES entre les changements de code répertoriées dans le rapport Slither est extrêmement utile, car il aide à découvrir les vulnérabilités introduites beaucoup plus tôt que si vous attendez la fin de votre projet.

## Complément d'information {#further-reading}

**Guide des bonnes pratiques de sécurité pour les contrat intelligents**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [Compilation de recommandations de sécurité et de bonnes pratiques](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**Norme de vérification de la sécurité des contrats intelligents (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Tutoriels connexes {#related-tutorials}

- [Flux de développement sécurisé](/developers/tutorials/secure-development-workflow/)
- [Comment utiliser Slither pour trouver les bogues des contrats intelligents](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Comment utiliser Manticore pour trouver les bogues des contrats intelligents](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Consignes de sécurité](/developers/tutorials/smart-contract-security-guidelines/)
- [Sécurité des jetons](/developers/tutorials/token-integration-checklist/)
