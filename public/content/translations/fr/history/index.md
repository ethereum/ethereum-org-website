---
title: Histoire et fourches d'Ethereum
description: Historique de la blockchain Ethereum, y compris les avancées majeures, les événements clés et les fourches.
lang: fr
sidebarDepth: 1
---

# Historique d'Ethereum {#the-history-of-ethereum}

Chronologie de tous les jalons, fourches et mises à jour majeures de la blockchain Ethereum.

<ExpandableCard title="En quoi consistent les fourches ?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Les forks existent lorsque des mises à jour ou des changements techniques majeurs doivent être effectués sur le réseau – ils proviennent généralement des <a href="/eips/">Propositions d'amélioration d'Ethereum (EIP)</a> et modifient les « règles » du protocole.

Lorsque des mises à niveau des logiciels traditionnels contrôlés centralement sont nécessaires, la société publie simplement une nouvelle version pour l'utilisateur final. Les blockchains fonctionnent différemment parce qu'il n'existe pas de propriété centralisée. <a href="/developers/docs/nodes-and-clients/">Les clients Ethereum</a> doivent mettre à jour leur logiciel pour implémenter les nouvelles règles de la fourche. En outre, les créateurs de blocs (les "mineurs" dans l'univers des preuves de travail, les "validateurs" dans celui des preuves d'enjeu) et les nœuds doivent créer des blocs et les valider conformément aux nouvelles règles. <a href="/developers/docs/consensus-mechanisms/">En savoir plus sur les mécanismes de consensus</a>

Ces changements de règles peuvent créer une scission temporaire dans le réseau. De nouveaux blocs peuvent être produits selon les nouvelles règles ou les anciennes. Les fourches font généralement l'objet d'un accord à l'avance afin que les clients adoptent les changements à l'unisson et que la fourche contenant les mises à niveau devienne la chaîne principale. Toutefois, dans de rares cas, les désaccords sur les forks peuvent causer une séparation permanente du réseau – plus particulièrement la création d'Ethereum Classic avec le <a href="#dao-fork">fork DAO</a>.

</ExpandableCard>

Passer directement à l'information sur certaines des mises à jour passées particulièrement importantes : [La Chaîne phare](/roadmap/beacon-chain/); [La Fusion](/roadmap/merge/); et [EIP-1559](#london)

Vous cherchez les prochaines mises à jour de protocole ? [Découvrez les mises à jour à venir sur la feuille de route Ethereum](/roadmap/).

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Résumé de Shanghai {#shanghai-summary}

La mise à jour Shanghai a ouvert la voie à des opérations de retrait et de basculement vers la couche d'exécution Couplée à la mise à jour Capella, cette mise à jour permet aux blocs d'accepter des opérations de retrait, permettant ainsi aux validateurs de retirer leur ETH de la chaîne phare et de le basculer vers la couche d'exécution.

<ExpandableCard title="EIP Shanghai" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Démarre l'adresse <code>COINBASE</code> </em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Nouvelle instruction <code>PUSH0</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Limite et initcode à compteur</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Retraits de la chaîne phare en tant qu'opérations</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">L'EIP-6049</a> - <em>Désapprouve <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Lire les spécificités de la mise à jour Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Résumé de Capella {#capella-summary}

La mise à jour Capella est la troisième mise à jour majeure vers la couche de consensus (Chaine phare). Elle a permis d'effectuer des retraits de mise en jeu. Capella est entrée en action en même temps que la mise à niveau de la couche d'exécution, Shanghai, et a activé la fonctionnalité de retrait de mise en jeu.

Cette mise à jour de la couche de consensus a permis aux validateurs, qui n'avaient pas fourni de certificats de retrait lors du premier dépôt de le faire, et donc d'effectuer des retraits.

La mise à jour a également permis la mise en place d'une fonctionnalité de balayage automatique de compte, qui traite continuellement les comptes de validateur pour tout paiement de récompenses ou retrait intégral disponible.

- [En savoir plus sur les retraits de mise en jeu](/staking/withdrawals/).
- [Lire les spécifications de la mise à jour Capella](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (La Fusion) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Résumé {#paris-summary}

La mise à jour de Paris a été déclenchée par le passage de la blockchain de preuve de travail à une [difficulté totale finale](/glossary/#terminal-total-difficulty) de 5875000000000000000. Cela s'est produit au bloc 15537393 le 15 septembre 2022, déclenchant la mise à jour du bloc suivant. Paris était la transition vers la [La Fusion](/roadmap/merge/) : sa principale fonctionnalité était de désactiver l'algorithme de minage [preuve de travail](/developers/docs/consensus-mechanisms/pow) et sa logique de consensus associée et d'activer la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos) à la place. Paris lui-même était une mise à jour vers les [clients d'exécution](/developers/docs/nodes-and-clients/#execution-clients) (équivalent de Bellatrix sur la couche de consensus) qui leur permettait de recevoir des instructions depuis leurs [clients de consensus](/developers/docs/nodes-and-clients/#consensus-clients) connectés. Cela nécessitait d'activer un nouvel ensemble de méthodes internes d'API, collectivement connues sous le nom d'[API Moteur](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). C'est sans doute la mise à jour la plus significative de l'histoire d'Ethereum depuis [Homestead](#homestead) !

- [Lisez la spécification de la mise à jour Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIP Paris" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Mise à niveau du consensus vers la preuve d'enjeu</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">L'EIP-4399</a> – <em>Supplante le code d'opération DIFFICULTY par PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Résumé {#bellatrix-summary}

La mise à jour de Bellatrix était la seconde mise à jour planifiée pour la [Chaîne Phare](/roadmap/beacon-chain), préparant la chaîne à [La Fusion](/roadmap/merge/). Elle porte les pénalités de validateur à leurs valeurs maximales en cas d'inactivité ou d'infractions sanctionnables. Bellatrix inclut également une mise à jour des règles de choix de fourche pour préparer la chaîne à La Fusion et à la transition du dernier bloc de preuve de travail vers le premier bloc de preuve d'enjeu. Cela inclut la sensibilisation des clients de consensus à la [difficulté totale du terminal](/glossary/#terminal-total-difficulty) de 5875000000000000000.

- [Lire les spécifications de la mise à niveau Bellatrix](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Résumé {#gray-glacier-summary}

La mise à niveau Gray Glacier a retardé le déclenchement de la [bombe de difficulté](/glossary/#difficulty-bomb) de trois mois. Il s'agit de la seule modification apportée par cette mise à niveau. En essence, elle est donc très semblable aux mises à niveau [Arrow Glacier](#arrow-glacier) et [Muir Glacier](#muir-glacier). Des changements similaires avaient également été effectués lors des mises à niveau [Byzantium](#byzantium), [Constantinople](#constantinople) et [London](#london).

- [Blog de l'Ethereum Foundation - Annonce de la mise à niveau Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="Les EIP de Gray Glacier" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>repousse l'explosion de la bombe de difficulté d'ici à septembre 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Résumé {#arrow-glacier-summary}

La mise à niveau Arrow Glacier a retardé le déclenchement de la [bombe de difficulté](/glossary/#difficulty-bomb) de plusieurs mois. Il s'agit de la seule modification apportée par cette mise à niveau. En essence, elle est donc très semblable à la mise à niveau [Muir Glacier](#muir-glacier). Des changements similaires avaient également été effectués lors des mises à niveau [Byzantium](#byzantium), [Constantinople](#constantinople) et [London](#london).

- [Blog de l'Ethereum Foundation - Annonce de la mise à niveau Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Mise à niveau Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP Arrow Glacier" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>reporte la bombe de difficulté jusqu'en juin 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Résumé {#altair-summary}

La mise à niveau Altair était la première mise à niveau répertoriée pour la [chaîne phare](/roadmap/beacon-chain). La prise en charge des « comités de synchronisation » a été ajoutée, autorisant d'une part les clients légers et augmentant d'autre part les pénalités d'inactivité et de délestage des validateurs à mesure que le système évoluait vers la fusion.

- [Lire les spécifications de la mise à niveau Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />Anecdote ! {#altair-fun-fact}

Altair a été la première mise à jour majeure du réseau à disposer d'un délai de mise en œuvre précis. Toutes les mises à niveau antérieures étaient basées sur un numéro de bloc déclaré sur la chaîne de preuve de travail, dans laquelle les durées de blocage varient. La chaîne phare ne nécessite pas de résoudre de preuve de travail, mais fonctionne sur la base d'un système de périodes composées de 32 créneaux de 12 secondes pendant lesquels les validateurs peuvent proposer des blocs. C'est pourquoi nous savions exactement quand nous atteindrions l'époque 74 240 et la date de sortie d'Altair !

- [Durée de blocage](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Résumé {#london-summary}

La mise à niveau London a introduit [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), qui a réorganisé le marché des frais de transaction, ainsi que des changements dans le traitement des remboursements de gaz et le calendrier [Ice Age](/glossary/#ice-age).

- [Êtes-vous un développeur d'applications décentralisées ? Assurez-vous de mettre à niveau vos bibliothèques et vos outils.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Lire l'explication du site Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP de London" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>améliore le marché des frais de transaction</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>permet le renvoi de <code>BASEFEE</code> depuis un bloc</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>réduit les remboursements de gas associés aux opérations de la machine virtuelle d'Ethereum (EVM)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>empêche le déploiement de contrats commençant par <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>prévoit de repousser l'Ce Age jusqu'au mois de décembre 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Résumé {#berlin-summary}

La mise à niveau Berlin a optimisé le coût en gaz de certaines actions EVM et augmenté la prise en charge de plusieurs types de transactions.

- [Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Lire l'explication du site Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP de Berlin" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>revoit à la baisse les coûts en gas ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>facilite la prise en charge de plusieurs types de transaction</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">L'EIP-2929</a> – <em>revoit ses tarifs en gas à la hausse, pour les codes d'opération d'accès à l'état</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>ajoute des listes d'accès facultatives</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Origine de la chaîne phare {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Résumé {#beacon-chain-genesis-summary}

La [chaîne phare](/roadmap/beacon-chain/) avait besoin de 16 384 dépôts de 32 ETH mis en jeu pour être déployée en toute sécurité. Cela s'est produit le 27 novembre, de sorte que la chaîne phare a commencé à produire des blocs le 1er décembre 2020. Ce fut une première étape importante dans la réalisation de la [vision Ethereum](/roadmap/vision/).

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  La chaîne phare
</DocLink>

---

### Contrat de dépôt de mise en jeu déployé {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Résumé {#deposit-contract-summary}

Le contrat de dépôt de mise en jeu a introduit la [mise en jeu](/glossary/#staking) dans l'écosystème Ethereum. Bien qu'il s'agisse d'un contrat sur le [réseau principal](/glossary/#mainnet), il a eu des conséquences directes sur le calendrier de lancement de la [chaîne phare](/roadmap/beacon-chain/), une importante [mise à niveau d'Ethereum](/roadmap/).

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Mise en jeu
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Résumé {#muir-glacier-summary}

La fourche Muir Glacier a entraîné un report de la [bombe de difficulté](/glossary/#difficulty-bomb). L'augmentation de la difficulté des blocs du mécanisme de consensus de [preuve de travail](/developers/docs/consensus-mechanisms/pow/) menaçait de dégrader l'utilisation d'Ethereum en allongeant les temps d'attente pour l'envoi de transactions et l'utilisation d'applications décentralisées.

- [Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Lire l'explication du site Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Les EIP de Muir Glacier" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>retarde la bombe de difficulté pour 4 000 000 autres blocs, ou ~611 jours.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Résumé {#istanbul-summary}

La fourche Istanbul a :

- optimisé le coût de [gaz](/glossary/#gas) de certaines actions dans l'[EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) ;
- amélioré la résilience face aux attaques par déni de service ;
- rendu plus performantes les solutions de [mise à l'échelle de la couche 2](/developers/docs/scaling/#layer-2-scaling) basées sur les SNARK et les STARK ;
- permis à Ethereum et Zcash d'interagir ;
- permis aux contrats d'introduire des fonctions plus créatives.

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="Les EIP d'Istanbul" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>permet à Ethereum de travailler avec une devise préservant la vie privée comme Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>cryptographie à bas coût pour l'optimisation <a href="/glossary/#gas">des coûts</a> de gas.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>protège Ethereum contre les attaques replay en ajoutant le code d'opération <code>CHAINID</code> <a href="/developers/docs/ethereum-stack/#ethereum-virtual-machine"></a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>l'optimisation des prix du gaz opcode basée sur la consommation.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>réduit le coût de CallData pour permettre plus de données en blocs – bon pour <a href="/developers/docs/scaling/#layer-2-scaling">la mise à l'échelle de la couche 2</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>autres modifications du prix du gaz opcode.</em></li>
</ul>

</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Résumé {#constantinople-summary}

La fourche Constantinople a :

- Réduit les récompenses pour le [minage des blocs](/developers/docs/consensus-mechanisms/pow/mining/) de 3 à 2 ETH.
- S'assurer que la blockchain ne se fige pas avant [la mise en œuvre de la preuve d'enjeu](#beacon-chain-genesis).
- optimisé le coût de [gaz](/glossary/#gas) de certaines actions dans l'[EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) ;
- Ajouté la possibilité d'interagir avec des adresses qui n'ont pas encore été créées.

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Les EIP de Constantinople" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>Optimise le coût de certaines actions en chaîne.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>vous permet d'interagir avec des adresses qui n'ont pas encore été créées.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>optimise le coût de certaines actions en chaîne.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>s'assure que la blockchain ne gèle pas &#39;avant la preuve d'enjeu et réduit les récompenses de 3 à 2 ETH par bloc.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Résumé {#byzantium-summary}

La fourche Byzantium a :

- réduit les récompenses pour le [minage](/developers/docs/consensus-mechanisms/pow/mining/)des blocs de 5 à 3 ETH ;
- retardé la [bombe de difficulté](/glossary/#difficulty-bomb) d'un an ;
- ajouté la possibilité d'effectuer des appels sans changement d'état vers d'autres contrats ;
- ajouté certaines méthodes de cryptographie pour permettre la [mise à l'échelle de la couche 2](/developers/docs/scaling/#layer-2-scaling).

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="EIP de Byzantium" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>ajoute le code d'opération <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>champ de statut ajouté aux reçus de transaction pour indiquer le succès ou l'échec.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>intègre la courbe elliptique ainsi que les algorithmes de multiplication scalaire, qui permettent d'utiliser <a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>intègre la courbe elliptique ainsi que les algorithmes de multiplication scalaire, qui permettent d'utiliser <a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>permet la vérification de la signature RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>intègre le support pour les valeurs retournées de longueur variable.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">L'EIP-214</a> – <em>intègre le code d'opération <code>STATICCALL</code>, ce qui permettra aux autres contrats de ne pas changer l'état des Calls.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>change la formule d'ajustement de difficulté.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>retarde <a href="/glossary/#difficulty-bomb">la bombe de difficulté</a> de 1 an et réduit la récompense de bloc de 5 à 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Résumé {#spurious-dragon-summary}

La fourche Spurious Dragon a été la deuxième réponse aux attaques par déni de service (DoS) sur le réseau (septembre/octobre 2016). Elle comprend les opérations suivantes :

- Adaptation de la tarification du code d'opération pour éviter de futures attaques sur le réseau ;
- « Dégonflage » de l'état de la blockchain ;
- Ajout de la protection contre les attaques par rejeu.

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="EIP de Spurious Dragon" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>empêche les transactions d'une chaîne Ethereum d'être rediffusées sur une chaîne alternative, par exemple une transaction de réseau de test en cours de relecture sur la chaîne principale Ethereum.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>ajuste les prix de code d'opération <code>EXP</code> – rend plus difficile le ralentissement du réseau via des opérations de contrat coûteuses sur le plan du calcul.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>permet de supprimer les comptes vides ajoutés via les attaques DOS.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>modifie la taille de code maximale qu'un contrat sur la blockchain peut avoir – à 24576 octets.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Résumé {#tangerine-whistle-summary}

La fourche Tangerine Whistle a été la première réponse aux attaques par déni de service (DoS) sur le réseau (septembre/octobre 2016). Elle comprend les opérations suivantes :

- Résolution des problèmes urgents d'intégrité du réseau concernant les codes d'opération sous-évalués.

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="EIP de Tangerine Whistle" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>Augmente le coût en gaz des codes d'opération qui peuvent être utilisés dans les attaques anti-spam.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>réduit la taille de l'état en supprimant un grand nombre de comptes vides qui ont été mis dans l'état à très bas prix en raison de défauts dans les versions précédentes du protocole Ethereum.</em></li>
</ul>

</ExpandableCard>

---

### Fourche DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Résumé {#dao-fork-summary}

La fourche DAO est la réponse à l'[attaque DAO de 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/) au cours de laquelle le contrat non sécurisé d'une [DAO](/glossary/#dao) a été vidé de plus de 3,6 millions d'ETH lors d'un piratage. La fourche a déplacé les fonds du contrat défectueux vers un [nouveau contrat](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) avec une seule fonction : withdraw (retrait). Toute personne ayant perdu des fonds pouvait retirer 1 ETH pour chaque tranche de 100 jetons DAO dans son portefeuille.

Ce plan d'action a été voté par la communauté Ethereum. Tout détenteur d'ETH a pu voter via une transaction sur [une plateforme de vote](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Plus de 85 % des votes étaient favorables à la fourche.

Certains mineurs ont refusé la fourche car l'incident DAO ne résultait pas d'un défaut du protocole. Ils ont ensuite formé [Ethereum Classic](https://ethereumclassic.org/).

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Résumé {#homestead-summary}

La fourche Homestead qui regardait vers l'avenir. Elle comprenait plusieurs changements de protocole et un changement de réseau ayant permis à Ethereum de faire d'autres mises à niveau du réseau.

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="EIP d'Homestead" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>modifie le processus de création de contrats.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>ajoute un nouveau code d'opération : <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>présente DEVP2P, pour faire face aux exigences en matière de compatibilité</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier Thawing {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Résumé {#frontier-thawing-summary}

La fourche Frontier Thawing a levé la [limite de gaz](/glossary/#gas) de 5 000 par [bloc](/glossary/#block) et défini le prix du gaz par défaut à 51 [gwei](/glossary/#gwei). Cela a permis de réaliser des transactions. Les transactions nécessitent 21 000 unités de gaz. La [bombe de difficulté](/glossary/#difficulty-bomb) a été introduite pour assurer une future fourche dure vers la [preuve d'enjeu](/glossary/#pos).

- [Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Lire la mise à jour du protocole Ethereum 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Résumé {#frontier-summary}

Frontier était une implémentation réelle, mais sans structure, du projet Ethereum. Elle faisait suite à la phase de tests réussie Olympic. Elle était destinée aux utilisateurs techniques, en particulier aux développeurs. Les [blocs](/glossary/#block) avaient une limite de [gaz](/glossary/#gas) de 5 000. La période « Thawing » a permis aux mineurs de démarrer leurs opérations et aux premiers adoptants d’installer leurs clients sans avoir à « se précipiter ».

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Vente d'ETH {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

L'ETH a officiellement été en vente pendant 42 jours. Il était possible d'en acheter avec des BTC.

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Publication du Livre jaune {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Le Livre jaune, rédigé par le Dr Gavin Wood, est une définition technique du protocole Ethereum.

[Voir le Livre jaune](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Publication du Livre blanc {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Document d'introduction publié en 2013 par Vitalik Buterin, fondateur d'Ethereum, précédant le lancement du projet en 2015.

<DocLink href="/whitepaper/">
  Livre blanc
</DocLink>
