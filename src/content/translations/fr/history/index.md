---
title: Historique Ethereum
description: Historique de la blockchain Ethereum, y compris les avancées majeures, les événements clés et les fourches.
lang: fr
sidebar: true
sidebarDepth: 1
isOutdated: true
---

# Historique d'Ethereum {#the-history-of-ethereum}

Chronologie de toutes les avancées, fourches et mises à jour majeures de la blockchain Ethereum.

<ExpandableCard title="En quoi consistent les fourches ?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

On parle de fourches lorsque des mises à niveau ou des modifications techniques majeures doivent être apportées au réseau. Celles-ci proviennent généralement des propositions d'amélioration d'Ethereum (EIP) et modifient les "règles" du protocole.

Lorsque des mises à niveau des logiciels traditionnels contrôlés centralement sont nécessaires, la société publie simplement une nouvelle version pour l'utilisateur final. Les blockchains fonctionnent différemment parce qu'il n'existe pas de propriété centralisée. Les <a href="(/developers/docs/nodes-and-clients/">clients Ethereum</a> doivent mettre à jour leur logiciel pour implémenter les nouvelles règles des fourches. En outre, les créateurs de blocs (les "mineurs" dans l'univers des preuves de travail, les "validateurs" dans celui des preuves d'enjeu) et les nœuds doivent créer des blocs et les valider conformément aux nouvelles règles. <a href="/developers/docs/consensus-mechanisms/">En savoir plus sur les mécanismes de consensus</a>.

Ces changements de règles peuvent créer une scission temporaire sur le réseau. mécanisme de consensus. De nouveaux blocs peuvent être produits selon les nouvelles règles ou les anciennes. Les fourches font généralement l'objet d'un accord à l'avance afin que les clients adoptent les changements à l'unisson et que la fourche contenant les mises à niveau devienne la chaîne principale. Toutefois, dans de rares cas, les désaccords sur les fourches peuvent causer une division permanente du réseau. Cela a notamment été le cas pour Ethereum Classic et la fourche DAO.

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Origine de la chaîne phare {#beacon-chain-genesis}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Dec-01-2020 12:00:35 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc sur la chaîne phare : <a href="https://beaconscan.com/slot/1">1</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Prix en ETH : 586,23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201207184633/https://www.ethereum.org/en/">ethereum.org sur waybackmachine</a>

#### Résumé {#beacon-chain-genesis-summary}

La [chaîne phare](/upgrades/beacon-chain/) avait besoin de 16 384 dépôts de 32 ETH mis en jeu pour être déployée en toute sécurité. Cela s'est produit le 27 novembre, ce qui signifie que la chaîne phare a commencé à produire des blocs le 1er décembre 2020. Il s'agit d'une première étape importante dans la réalisation de la [vision Eth2](/upgrades/vision/).

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink to="/upgrades/beacon-chain/">
  Chaîne phare
</DocLink>

---

### Contrat de dépôt de mise en jeu déployé {#staking-deposit-contract}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-14-2020 09:22:52 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/11052984">11052984</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Prix en ETH : 379,04 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201104235727/https://ethereum.org/en/">ethereum.org sur waybackmachine</a>

#### Résumé {#deposit-contract-summary}

Le contrat de dépôt de mise en jeu a introduit la [mise en jeu](/glossary/#staking) dans l'écosystème Ethereum. Bien qu'il s'agisse d'un contrat du [réseau principal](/glossary/#mainnet), il a eu un impact direct sur la chronologie de lancement de la [chaîne phare](/upgrades/beacon-chain/), une mise à niveau [Eth2](/upgrades/) importante.

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink to="/staking/">
  Miser
</DocLink>

---

### Muir Glacier {#muir-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jan-02-2020 08:30:49 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/9200000">9200000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Prix en ETH : 127,18 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20200103093618/https://ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#muir-glacier-summary}

La fourche Muir Glacier a généré un retard de la [bombe de difficulté](/glossary/#difficulty-bomb). L'augmentation de la difficulté des blocs du mécanisme de consensus de [preuve de travail](/developers/docs/consensus-mechanisms/pow/) menaçait de dégrader l'utilisation d'Ethereum en allongeant les temps d'attente pour l'envoi de transactions et l'utilisation des DApps.

- [Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Lire l'explication du site Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP Muir Glacier" contentPreview="Official improvements included in this fork.">

<a href="https://eips.ethereum.org/EIPS/eip-2384">EIP 2384</a> - Retard de la bombe de difficulté pour 4 000 000 autres blocs, ou ~611 jours

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Dec-08-2019 12:25:09 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/9069000">9069000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Prix en ETH : 151,06 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20191216101254if*/https://ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#istanbul-summary}

La fourche Istanbul a :

- optimisé le coût de [carburant](/glossary/#gas) de certaines actions dans l'[EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) ;
- amélioré la résilience face aux attaques par déni de service ;
- amélioré les performances des solutions d'[évolutivité de la couche 2](/developers/docs/layer-2-scaling/) basées sur des SNARK et des STARK ;
- permis à Ethereum et Zcash d'interagir ;
- permis aux contrats d'introduire des fonctions plus créatives.

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="EIP Istanbul" contentPreview="Official improvements included in this fork.">

- [EIP-152](https://eips.ethereum.org/EIPS/eip-152) - Permet à Ethereum de travailler avec des monnaies préservant la confidentialité, comme Zcash. - Cryptographie moins onéreuse pour améliorer les coûts de carburant.
- [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344) - Protège Ethereum contre les attaques par rejeu en ajoutant le code d'opération ([opcode]) "CHAINID" (/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) - Optimisation du prix du carburant des codes d'opération en fonction de la consommation
- [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) – Réduit le coût des données d'appel pour permettre un plus grand nombre de données dans les blocs. Utile pour l'[évolutivité de la couche 2](/developers/docs/layer-2-scaling/).
- [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) - Autres altérations du prix du carburant des codes d'opération.

</ExpandableCard>

---

### Constantinople {#constantinople}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Feb-28-2019 07:52:04 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/7280000">7280000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Prix en ETH : 136,29 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20190415163751/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#constantinople-summary}

La fourche Constantinople a :

- protégé la blockchain d'un blocage avant l'implémentation de la [preuve d'enjeu](#beacon-chain-genesis) ;
- optimisé le coût du [carburant](/glossary/#gas) pour certaines actions dans l'[EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) ;
- ajouté de la possibilité d'interagir avec des adresses non encore créés.

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="EIP Constantinople" contentPreview="Official improvements included in this fork.">

- [EIP-145](https://eips.ethereum.org/EIPS/eip-145) - Optimise le coût de certaines actions sur la chaîne.
- [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) - Vous permet d'interagir avec des adresses non encore créées.
- [EIP-1052](https://eips.ethereum.org/EIPS/eip-1052) - Optimise le coût de certaines actions sur la chaîne.
- [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) - Protège la blockchain d'un blocage avant la preuve d'enjeu.

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-16-2017 05:22:11 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/4370000">4370000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Prix en ETH : 334,23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20171017201143/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#byzantium-summary}

La fourche Byzantium a :

- réduit les récompenses pour le [minage des blocs](/developers/docs/consensus-mechanisms/pow/mining/) de 5 à 3 ETH ;
- retardé la [bombe de difficulté](/glossary/#difficulty-bomb) d'un an ;
- ajouté la possibilité d'effectuer des appels sans changement d'état vers d'autres contrats ;
- ajouté certaines méthodes de cryptographie pour permettre la [l'évolutivité de la couche 2](/developers/docs/layer-2-scaling/).

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="EIP Byzantium" contentPreview="Official improvements included in this fork.">

- [EIP-140](https://eips.ethereum.org/EIPS/eip-140) - _Ajoute le code d'opération "REVERT"._
- [EIP-658](https://eips.ethereum.org/EIPS/eip-658) - _Champ de statut ajouté aux reçus de transaction pour indiquer le succès ou l'échec._
- [EIP-196](https://eips.ethereum.org/EIPS/eip-196) - _Ajoute la courbe elliptique et la multiplication scalaire pour permettre les [SNARK ZK](/developers/docs/layer-2-scaling/#rollups)._
- [EIP-197](https://eips.ethereum.org/EIPS/eip-197) - _Ajoute la courbe elliptique et la multiplication scalaire pour permettre les [SNARK ZK](/developers/docs/layer-2-scaling/#rollups)._
- [EIP-198](https://eips.ethereum.org/EIPS/eip-198) - _Active la vérification de la signature RSA._
- [EIP-211](https://eips.ethereum.org/EIPS/eip-211) - _Ajoute la prise en charge des valeurs de retour de longueur variable._
- [EIP-214](https://eips.ethereum.org/EIPS/eip-214) - _Ajoute le code d'opération "STATICCALL" permettant de ne pas modifier l'état des appels vers d'autres contrats._
- [EIP-100](https://eips.ethereum.org/EIPS/eip-100) - _Modifie la formule d'ajustement de difficulté._
- [EIP-649](https://eips.ethereum.org/EIPS/eip-649) - _Retarde la [bombe de difficulté](/glossary/#difficulty-bomb) de 1 an et réduit la récompense des blocs de 5 à 3 ETH._

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Nov-22-2016 04:15:44 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/2675000">2675000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Prix en ETH : 9,84 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161127154654/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#spurious-dragon-summary}

La fourche Spurious Dragon est la deuxième réponse aux attaques par déni de service (DoS) sur le réseau (Septembre/Octobre 2016). Elle comprend les opérations suivantes :

- Réglage de la tarification du code d'opération pour éviter de futures attaques sur le réseau
- "Dégonflage" de l'état de la blockchain
- Ajout de la protection contre les attaques par rejeu

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="EIP Spurious Dragon" contentPreview="Official improvements included in this fork.">

- [EIP-155](https://eips.ethereum.org/EIPS/eip-155) - Empêche les transactions d'une chaîne Ethereum d'être rediffusées sur une chaîne alternative, par exemple une transaction du réseau de test rejouée sur la chaîne principale Ethereum.
- [EIP-160](https://eips.ethereum.org/EIPS/eip-160) - Règle les prix du code d'opération "EXP". Rend plus difficile le ralentissement du réseau via des opérations de contrat coûteuses sur le plan du calcul.
- [EIP-161](https://eips.ethereum.org/EIPS/eip-161) - Permet de supprimer les comptes vides ajoutés via les attaques par DoS.
- [EIP-170](https://eips.ethereum.org/EIPS/eip-170) - Définit la taille maximale du code d'un contrat sur la blockchain à 24 576 octets.

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-18-2016 01:19:31 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/2463000">2463000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Prix en ETH : 12,50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161030043727/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#tangerine-whistle-summary}

La fourche Tangerine Whistle est la deuxième réponse aux attaques par déni de service (DoS) sur le réseau (Septembre/Octobre 2016). Elle comprend les opérations suivantes :

- Résolution des problèmes urgents d'intégrité du réseau concernant les codes d'opération sous-évalués

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="EIP Tangerine Whistle" contentPreview="Official improvements included in this fork.">

- [EIP-150](https://eips.ethereum.org/EIPS/eip-150) - Augmente le coût en carburant des codes d'opération qui peuvent être utilisés dans les attaques par spam.
- [EIP-158](https://eips.ethereum.org/EIPS/eip-158) -Réduit la taille de l'état en supprimant un grand nombre de comptes vides
  mis dans l'état à très bas prix en raison de failles dans les versions précédentes du protocole Ethereum.

</ExpandableCard>

---

### Fourche DAO {#dao-fork}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jul-20-2016 01:20:40 PM +UTC</code><br /> Numéro de bloc : <a href="https://etherscan.io/block/1920000">1920000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Prix en ETH : 12,54 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160803215306/https://ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#dao-fork-summary}

La fourche DAO est la réponse à l'attaque [DAO de 2016](https://www.coindesk.com/understanding-dao-hack-journalists) où un contrat non sécurisé d'une [DAO](/glossary/#dao) a été vidé de plus de 3,6 millions d'ETH lors d'un piratage. La fourche a déplacé les fonds du contrat défectueux vers un [nouveau contrat](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) avec une seule fonction : withdraw. Toute personne ayant perdu des fonds pouvait retirer 1 ETH pour chaque tranche de 100 jetons DAO dans son portefeuille.

Ce plan d'action a été voté par la communauté Ethereum. Tout détenteur d'ETH a pu voter via une transaction sur [une plateforme de vote](http://v1.carbonvote.com/). Plus de 85 % des votes étaient favorables à la fourche.

Certains mineurs ont refusé la fourche car l'incident DAO ne résultait pas d'un défaut du protocole. Ils ont ensuite formé [Ethereum Classic](https://ethereumclassic.org/).

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Mar-14-2016 06:49:53 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/1150000">1150000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Prix en ETH : 12,50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160313203843/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#homestead-summary}

La fourche Homestead tournée vers l'avenir. Elle comprenait plusieurs changements de protocole et un changement réseau qui a permis à Ethereum de faire d'autres mises à niveau du réseau.

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="EIP Homestead" contentPreview="Official improvements included in this fork.">

- [EIP-2](https://eips.ethereum.org/EIPS/eip-2) - Apporte des modifications au processus de création de contrats.
- [EIP-7](https://eips.ethereum.org/EIPS/eip-7) - Ajoute le nouveau code d'opération "DELEGATECALL".
- [EIP-8](https://eips.ethereum.org/EIPS/eip-8)- Introduit des exigences de compatibilité devp2p.

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier Thawing {#frontier-thawing}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Sep-07-2015 09:33:09 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/200000">200000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Prix en ETH : 1,24 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150912193811/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#frontier-thawing-summary}

La fourche Frontier Thawing a levé la [limite de carburant](/glossary/#gas) de 5 000 par [bloc](/glossary/#block) et défini le prix du carburant par défaut à 51 [gwei](/glossary/#gwei). Cela a permis de réaliser des transactions. Les transactions nécessitent 21 000 unités de carburant.

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)

---

### Frontier {#frontier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jul-30-2015 03:26:13 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numéro de bloc : <a href="https://etherscan.io/block/0">0</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Prix en ETH : N/A<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150802035735/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

#### Résumé {#frontier-summary}

Frontier était une implémentation vivante, mais sans structure, du projet Ethereum. Elle fait suite à la phase de tests réussie Olympic. Elle était destinée aux utilisateurs techniques, en particulier aux développeurs. Les [blocs](/glossary/#block) avaient une limite de [carburant](/glossary/#gas) de 5 000. La période "Thawing" a permis aux mineurs de démarrer leurs opérations et aux premiers adoptants d’installer leurs clients sans avoir à "se précipiter".

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Vente d'ETH {#ether-sale}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Du 02 au 22 septembre 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140804235628/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

L'ETH est officiellement en vente pour 42 jours. Il était possible d'en acheter avec des BTC.

[Lire l'annonce de l'Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Publication du Livre jaune {#yellowpaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 01 avril 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140509173418/https://www.ethereum.org/">ethereum.org sur waybackmachine</a>

Le Livre jaune, rédigé par le Dr. Gavin Wood, est une définition technique du protocole Ethereum.

[Voir le Livre jaune](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Publication du Livre blanc {#whitepaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 27 Novembre 2013<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140208030136/http://www.ethereum.org/">ethereum.org sur waybackmachine</a>

Document d'introduction publié en 2013 par Vitalik Buterin, le fondateur d'Ethereum, précédant le lancement du projet en 2015.

<DocLink to="/whitepaper/">
  Livre blanc
</DocLink>
