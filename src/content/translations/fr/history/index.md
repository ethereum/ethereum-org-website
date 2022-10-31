---
title: Histoire et fourches d'Ethereum
description: Historique de la blockchain Ethereum, y compris les avancées majeures, les événements clés et les fourches.
lang: fr
sidebarDepth: 1
---

# Historique d'Ethereum {#the-history-of-ethereum}

Chronologie de toutes les avancées, fourches et mises à jour majeures de la blockchain Ethereum.

<ExpandableCard title="En quoi consistent les fourches ?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

On parle de fourches lorsque des mises à niveau ou des modifications techniques majeures doivent être apportées au réseau. Celles-ci proviennent généralement des propositions d'amélioration d'Ethereum (EIP) et modifient les "règles" du protocole.

Lorsque des mises à niveau des logiciels traditionnels contrôlés centralement sont nécessaires, la société publie simplement une nouvelle version pour l'utilisateur final. Les blockchains fonctionnent différemment parce qu'il n'existe pas de propriété centralisée. Les <a href="(/developers/docs/nodes-and-clients/">clients Ethereum</a> doivent mettre à jour leur logiciel pour implémenter les nouvelles règles des fourches. En outre, les créateurs de blocs (les "mineurs" dans l'univers des preuves de travail, les "validateurs" dans celui des preuves d'enjeu) et les nœuds doivent créer des blocs et les valider conformément aux nouvelles règles. [En savoir plus sur les mécanismes de consensus](/developers/docs/consensus-mechanisms/)

Ces changements de règles peuvent créer une scission temporaire dans le réseau. De nouveaux blocs peuvent être produits selon les nouvelles règles ou les anciennes. Les fourches font généralement l'objet d'un accord à l'avance afin que les clients adoptent les changements à l'unisson et que la fourche contenant les mises à niveau devienne la chaîne principale. Toutefois, dans de rares cas, les désaccords sur les fourches peuvent causer une division permanente du réseau. Cela a notamment été le cas pour Ethereum Classic et la fourche DAO.

</ExpandableCard>

Vous cherchez de prochaines mises à jour de protocole ? [En savoir plus sur les prochaines mises à jour d'Ethereum](/upgrades/).

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>9 déc. 2021 07:55:23 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Numéro de bloc : <a href="https://etherscan.io/block/13773000">13 773 000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Cours ETH : 4 111 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20211207064430/https://ethereum.org/en/">ethereum.org sur waybackmachine</a>

#### Résumé {#arrow-glacier-summary}

La mise à niveau Arrow Glacier a retardé le déclenchement de la [bombe de difficulté](/glossary/#difficulty-bomb) de plusieurs mois. Il s'agit de la seule modification apportée par cette mise à niveau. En essence, elle est donc très semblable à la mise à niveau [Muir Glacier](#muir-glacier). Des changements similaires avaient également été effectués lors des mises à niveau [Byzantium](#byzantium), [Constantinople](#constantinople) et [London](#london).

- [Blog de l'Ethereum Foundation - Annonce de la mise à niveau Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Mise à niveau Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Les EIP d'Arrow Glacier" contentPreview="Official improvements included in this upgrade.">

- [EIP-4345](https://eips.ethereum.org/EIPS/eip-4345) – _Reporte la bombe de difficulté jusqu'en juin 2022_

</ExpandableCard>

#### <Emoji text=":police_car_light:" size={1} mr="0.5rem" />Opérateurs de nœud {#arrow-glacier-node-operators}

En raison des variations de durée de production des blocs, veillez à mettre à niveau votre logiciel client en installant la version la plus récente avant le 5 décembre 2021. Cette étape permettra d'éviter que votre client reste synchronisé avec l'ancienne chaîne une fois la nouvelle fourche créée, ce qui vous empêcherait de transférer des fonds ou de vérifier correctement les transactions.

---

### Altair {#altair}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>27 oct. 2021 10:56:23 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Numéro de période : 74 240<br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Cours ETH : 4 024 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20211026174951/https://ethereum.org/en/">ethereum.org sur waybackmachine</a>

#### Résumé {#altair-summary}

La mise à niveau Altair était la première mise à niveau répertoriée pour la [chaîne phare](/upgrades/beacon-chain). La prise en charge des « comités de synchronisation » a été ajoutée, autorisant d'une part les clients légers et augmentant d'autre part les pénalités d'inactivité et de délestage des validateurs jusqu'au montant total engagé.

- [Lire les informations de mise à niveau Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} mr="0.5rem" />Anecdote ! {#altair-fun-fact}

Altair a été la première mise à niveau majeure du réseau dont la date de lancement était exacte. Toutes les mises à jour antérieures étaient basées sur un numéro de bloc déclaré sur la chaîne de preuve de travail dans laquelle les temps de bloc varient. La chaîne phare ne nécessite pas de résoudre de preuve de travail, mais fonctionne sur la base d'un système de périodes composées de 32 créneaux de 12 secondes chacun durant lesquels les validateurs peuvent proposer des blocs. C'est pourquoi nous savions exactement quand nous atteindrions l'époque 74 240 et la date de sortie d'Altair !

- [Glossaire Beaconcha.in - Créneaux](https://kb.beaconcha.in/glossary#slots)

---

### London {#london}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>5 août 2021 12:33:42 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/12965000">12 965 000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cours ETH : 2 621 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20210805124609/https://ethereum.org/en/">ethereum.org sur waybackmachine</a>

#### Résumé {#london-summary}

La mise à niveau London a introduit l'[EIP 1559](https://eips.ethereum.org/EIPS/eip-1559), qui a réformé le marché des frais de transaction, ainsi que des changements dans la façon dont les remboursements de gaz sont gérés et le calendrier du [Ice Age](/glossary/#ice-age).

- [Vous êtes un développeur de dApp ? Assurez-vous de mettre à niveau vos bibliothèques et vos outils.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Lire l'explication du site Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="Les EIP de London" contentPreview="Official improvements included in this upgrade.">

- [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) – _Améliore le marché des frais de transaction_
- [EIP-3198](https://eips.ethereum.org/EIPS/eip-3198) – _Retourne le « BASEFEE » depuis un bloc_
- [EIP-3529](https://eips.ethereum.org/EIPS/eip-3529) - _Diminue les remboursements de gaz pour les opérations EVM _
- [EIP-3541](https://eips.ethereum.org/EIPS/eip-3541) - _Empêche le déploiement de contrats commençant par « 0xEF »_
- [EIP-3554](https://eips.ethereum.org/EIPS/eip-3554) - _Reporte le Ice Age jusqu'en décembre 2021_

</ExpandableCard>

---

### Berlin {#berlin}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>15 avril 2021 10:07:03 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/12244000">12 244 000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cours ETH : 2 454 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20210415093618/https://ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#berlin-summary}

La mise à niveau Berlin a optimisé le coût en gaz pour certaines actions EVM et augmenté la prise en charge de plusieurs types de transactions.

- [Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Lire l'explication du site Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Les EIP de Berlin" contentPreview="Official improvements included in this upgrade.">

- [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565) – _Diminue le coût en gaz pour ModExp_
- [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) – _Permet une prise en charge plus facile pour plusieurs types de transactions_
- [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) – _Augmentation du coût en gaz pour les opcodes d'accès d'état_
- [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) – _Ajoute des listes d'accès optionnels_

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Origine de la chaîne phare {#beacon-chain-genesis}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>1er déc. 2020 12:00:35 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc sur la chaîne phare : <a href="https://beaconscan.com/slot/1">1</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cours ETH : 586,23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201207184633/https://www.ethereum.org/en/">ethereum.org sur waybackmachine</a>

#### Résumé {#beacon-chain-genesis-summary}

La [chaîne phare](/upgrades/beacon-chain/) avait besoin de 16 384 dépôts de 32 ETH mis en jeu pour être déployée en toute sécurité. Cela s'est produit le 27 novembre, ce qui signifie que la chaîne phare a commencé à produire des blocs le 1er décembre 2020. C'est une première étape importante dans la réalisation de la [vision Ethereum](/upgrades/vision/).

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink to="/upgrades/beacon-chain/">
  La chaîne phare
</DocLink>

---

### Contrat de dépôt de mise en jeu déployé {#staking-deposit-contract}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>14 oct. 2020 09:22:52 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/11052984">11 052 984</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cours ETH : 379,04 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201104235727/https://ethereum.org/en/">ethereum.org sur waybackmachine</a>

#### Résumé {#deposit-contract-summary}

Le contrat de dépôt de mise en jeu a introduit la [mise en jeu](/glossary/#staking) dans l'écosystème Ethereum. Bien qu'il s'agisse d'un contrat sur le [réseau principal](/glossary/#mainnet), cela a eu des conséquences directes sur l'échéance du lancement de la [chaîne phare](/upgrades/beacon-chain/), une importante [mise à niveau d'Ethereum](/upgrades/).

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink to="/staking/">
  Mise en jeu
</DocLink>

---

### Muir Glacier {#muir-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>2 janv. 2020 08:30:49 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/9200000">9200000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cours ETH : 127,18 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20200103093618/https://ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#muir-glacier-summary}

La fourche Muir Glacier a entraîné un report de la [bombe de difficulté](/glossary/#difficulty-bomb). L'augmentation de la difficulté des blocs du mécanisme de consensus de [preuve de travail](/developers/docs/consensus-mechanisms/pow/) menaçait de dégrader l'utilisation d'Ethereum en allongeant les temps d'attente pour l'envoi de transactions et l'utilisation des DApps.

- [Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Lire l'explication du site Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Les EIP de Muir Glacier" contentPreview="Official improvements included in this fork.">

- [EIP-2384](https://eips.ethereum.org/EIPS/eip-2384) - _Report de la bombe de difficulté de 4 000 000 autres blocs, ou environ 611 jours._

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>8 déc. 2019 12:25:09 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/9069000">9069000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cours ETH : 151,06 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20191216101254if*/https://ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#istanbul-summary}

La fourche Istanbul a :

- optimisé le coût de [carburant](/glossary/#gas) de certaines actions dans l'[EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) ;
- amélioré la résilience face aux attaques par déni de service ;
- rendu plus performantes les solutions de [mise à l'échelle de la couche 2](/developers/docs/scaling/#layer-2-scaling) basées sur les SNARK et les STARK ;
- permis à Ethereum et Zcash d'interagir ;
- permis aux contrats d'introduire des fonctions plus créatives.

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="Les EIP d'Istanbul" contentPreview="Official improvements included in this fork.">

- [EIP-152](https://eips.ethereum.org/EIPS/eip-152) – _Permet à Ethereum de travailler avec des monnaies préservant la confidentialité, comme Zcash._
- [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108) – _Cryptographie moins onéreuse pour améliorer le coût du [gaz](/glossary/#gas)._
- [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344) – _Protège Ethereum contre les attaques par rejeu en ajoutant le code d'opération [opcode] « CHAINID » (/developers/docs/ethereum-stack/#ethereum-virtual-machine)._
- [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) – _Optimisation du prix du gaz des codes d'opération basés sur la consommation._
- [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) – _Réduit le coût des données d'appel afin de pouvoir augmenter la taille des données dans les blocs. Utile pour [l'évolutivité de la couche 2](/developers/docs/scaling/layer-2-rollups/)._
- [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) – _Autres altérations du prix du gaz des codes d'opération._

</ExpandableCard>

---

### Constantinople {#constantinople}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>28 févr. 2019 07:52:04 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/7280000">7280000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cours ETH : 136,29 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20190415163751/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#constantinople-summary}

La fourche Constantinople a :

- protégé la blockchain d'un blocage avant l'implémentation de la [preuve d'enjeu](#beacon-chain-genesis) ;
- optimisé le coût en [gaz](/glossary/#gas) de certaines actions dans l'[EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) ;
- ajouté de la possibilité d'interagir avec des adresses non encore créées.

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Les EIP de Constantinople" contentPreview="Official improvements included in this fork.">

- [EIP-145](https://eips.ethereum.org/EIPS/eip-145) - _Optimise le coût de certaines actions sur la chaîne._
- [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) - _Vous permet d'interagir avec des adresses non encore créées._
- [EIP-1052](https://eips.ethereum.org/EIPS/eip-1052) - _Optimise le coût de certaines actions sur la chaîne._
- [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) - _Protège la blockchain d'un blocage avant la preuve d'enjeu._

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>16 oct. 2017 05:22:11 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/4370000">4 370 000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cours ETH : 334,23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20171017201143/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#byzantium-summary}

La fourche Byzantium a :

- réduit les récompenses pour le [minage des blocs](/developers/docs/consensus-mechanisms/pow/mining/) de 5 à 3 ETH ;
- retardé la [bombe de difficulté](/glossary/#difficulty-bomb) d'un an ;
- ajouté la possibilité d'effectuer des appels sans changement d'état vers d'autres contrats ;
- ajouté certaines méthodes de cryptographie pour permettre la [mise à l'échelle de la couche 2](/developers/docs/scaling/#layer-2-scaling).

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Les EIP de Byzantium" contentPreview="Official improvements included in this fork.">

- [EIP-140](https://eips.ethereum.org/EIPS/eip-140) – _Ajoute le code d'opération « REVERT »._
- [EIP-658](https://eips.ethereum.org/EIPS/eip-658) – _Champ de statut ajouté aux reçus de transaction pour indiquer le succès ou l'échec._
- [EIP-196](https://eips.ethereum.org/EIPS/eip-196) – _Ajoute la courbe elliptique et la multiplication scalaire pour permettre les [ZK-Snarks](/developers/docs/layer-2-scaling/#rollups)._
- [EIP-197](https://eips.ethereum.org/EIPS/eip-197) – _Ajoute la courbe elliptique et la multiplication scalaire pour permettre les [ZK-Snarks](/developers/docs/layer-2-scaling/#rollups)._
- [EIP-198](https://eips.ethereum.org/EIPS/eip-198) – _Active la vérification de la signature RSA._
- [EIP-211](https://eips.ethereum.org/EIPS/eip-211) – _Ajoute la prise en charge des valeurs de retour de longueur variable._
- [EIP-214](https://eips.ethereum.org/EIPS/eip-214) – _Ajoute le code d'opération « STATICCALL » permettant d'effectuer des appels sans changement d'état vers d'autres contrats._
- [EIP-100](https://eips.ethereum.org/EIPS/eip-100) – _Modifie la formule d'ajustement de difficulté._
- [EIP-649](https://eips.ethereum.org/EIPS/eip-649) – _Retarde la [bombe de difficulté](/glossary/#difficulty-bomb) de 1 an et réduit la récompense des blocs de 5 à 3 ETH._

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>22 nov. 2016 04:15:44 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro du bloc : <a href="https://etherscan.io/block/2675000">2 675 000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cours ETH : 9,84 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161127154654/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#spurious-dragon-summary}

La fourche Spurious Dragon est la deuxième réponse aux attaques par déni de service (DoS) sur le réseau (septembre/octobre 2016). Elle comprend les opérations suivantes :

- Réglage de la tarification du code d'opération pour éviter de futures attaques sur le réseau
- « Dégonflage » de l'état de la blockchain
- Ajout de la protection contre les attaques par rejeu

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Les EIP de Spurious Dragon" contentPreview="Official improvements included in this fork.">

- [EIP-155](https://eips.ethereum.org/EIPS/eip-155) - _Empêche les transactions d'une chaîne Ethereum d'être rediffusées sur une chaîne alternative, par exemple une transaction du réseau de test rejouée sur la chaîne principale Ethereum._
- [EIP-160](https://eips.ethereum.org/EIPS/eip-160) - _Règle les prix du code d'opération « EXP ». Rend plus difficile le ralentissement du réseau via des opérations de contrat coûteuses sur le plan du calcul._
- [EIP-161](https://eips.ethereum.org/EIPS/eip-161) - _Permet de supprimer les comptes vides ajoutés via les attaques par DoS._
- [EIP-170](https://eips.ethereum.org/EIPS/eip-170) - _Définit la taille maximale du code d'un contrat sur la blockchain à 24 576 octets._

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>18 oct. 2016 01:19:31 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/2463000">2 463 000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cours ETH : 12,50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161030043727/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#tangerine-whistle-summary}

La fourche Tangerine Whistle est la première réponse aux attaques par déni de service (DoS) sur le réseau (septembre/octobre 2016). Elle comprend les opérations suivantes :

- Résolution des problèmes urgents d'intégrité du réseau concernant les codes d'opération sous-évalués

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Les EIP de Tangerine Whistle" contentPreview="Official improvements included in this fork.">

- [EIP-150](https://eips.ethereum.org/EIPS/eip-150) - _Augmente le coût en gaz des codes d'opération qui peuvent être utilisés dans les attaques par spam._
- [EIP-158](https://eips.ethereum.org/EIPS/eip-158) - _Réduit la taille de l'état en supprimant un grand nombre de comptes vides mis dans l'état à très bas prix en raison de failles dans les versions précédentes du protocole Ethereum._

</ExpandableCard>

---

### Fourche DAO {#dao-fork}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>20 juill. 2016 01:20:40 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro du bloc : <a href="https://etherscan.io/block/1920000">1 920 000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cours ETH : 12,54 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160803215306/https://ethereum.org/">ethereum.org on waybackmachine</a>

#### Résumé {#dao-fork-summary}

La fourche DAO est la réponse à [l'attaque DAO de 2016](https://www.coindesk.com/markets/2016/06/25/understanding-the-dao-attack/) au cours de laquelle un contrat non sécurisé d'une [DAO](/glossary/#dao) a été vidé de plus de 3,6 millions d'ETH lors d'un piratage. La fourche a déplacé les fonds du contrat défectueux vers un [nouveau contrat](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) avec une seule fonction : withdraw (retrait). Toute personne ayant perdu des fonds pouvait retirer 1 ETH pour chaque tranche de 100 jetons DAO dans son portefeuille.

Ce plan d'action a été voté par la communauté Ethereum. Tout détenteur d'ETH a pu voter via une transaction sur [une plateforme de vote](http://v1.carbonvote.com/). Plus de 85 % des votes étaient favorables à la fourche.

Certains mineurs ont refusé la fourche car l'incident DAO ne résultait pas d'un défaut du protocole. Ils ont ensuite formé [Ethereum Classic](https://ethereumclassic.org/).

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>14 mars 2016 06:49:53 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro du bloc : <a href="https://etherscan.io/block/1150000">1 150 000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cours ETH : 12,50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160313203843/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#homestead-summary}

La fourche Homestead était tournée vers l'avenir. Elle comprenait plusieurs changements de protocole et un changement réseau qui a permis à Ethereum de faire d'autres mises à niveau du réseau.

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Les EIP d'Homestead" contentPreview="Official improvements included in this fork.">

- [EIP-2](https://eips.ethereum.org/EIPS/eip-2) - _Apporte des modifications au processus de création de contrats._
- [EIP-7](https://eips.ethereum.org/EIPS/eip-7) - _Ajoute le nouveau code d'opération « DELEGATECALL »._
- [EIP-8](https://eips.ethereum.org/EIPS/eip-8)- _Introduit des exigences de compatibilité devp2p._

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier Thawing {#frontier-thawing}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>7 sept. 2015 09:33:09 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro du bloc : <a href="https://etherscan.io/block/200000">200 000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cours ETH : 1,24 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150912193811/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#frontier-thawing-summary}

La fourche Frontier Thawing a levé la [limite de gaz](/glossary/#gas) de 5 000 par [bloc](/glossary/#block) et défini le prix du gaz par défaut à 51 [Gwei](/glossary/#gwei). Cela a permis de réaliser des transactions. Les transactions nécessitent 21 000 unités de gaz.

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)

---

### Frontier {#frontier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>30 juill. 2015 03:26:13 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro du bloc : <a href="https://etherscan.io/block/0">0</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cours ETH : N/A<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150802035735/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#frontier-summary}

Frontier était une implémentation vivante, mais sans structure, du projet Ethereum. Elle a fait suite à la phase de tests réussie Olympic. Elle était destinée aux utilisateurs techniques, en particulier aux développeurs. Les [blocs](/glossary/#block) avaient une limite de [gaz](/glossary/#gas) de 5 000. La période « Thawing » a permis aux mineurs de démarrer leurs opérations et aux premiers adoptants d'installer leurs clients sans avoir à « se précipiter ».

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Vente d'ETH {#ether-sale}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Du 2 juillet au 22 septembre 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140804235628/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

L'ETH était officiellement en vente pour 42 jours. Il était possible d'en acheter avec des BTC.

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Publication du Livre jaune {#yellowpaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 1er avril 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140509173418/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

Le Livre jaune, rédigé par le Dr Gavin Wood, est une définition technique du protocole Ethereum.

[Voir le Livre jaune](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Publication du Livre blanc {#whitepaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 27 novembre 2013<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140208030136/http://www.ethereum.org/">ethereum.org sur waybackmachine</a>

Document d'introduction publié en 2013 par Vitalik Buterin, le fondateur d'Ethereum, précédant le lancement du projet en 2015.

<DocLink to="/whitepaper/">
  Livre blanc
</DocLink>
