---
title: Minage
description: Une explication du fonctionnement du minage sur Ethereum.
lang: fr
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
La preuve de travail (PoW) ne sous-tend plus le mécanisme de consensus d'Ethereum, ce qui signifie que le minage a été désactivé. À la place, [Ethereum](/) est sécurisé par des validateurs qui stakent des ETH. Vous pouvez commencer le staking de vos ETH dès aujourd'hui. Pour en savoir plus, consultez les pages sur <a href='/roadmap/merge/'>La Fusion</a>, la <a href='/developers/docs/consensus-mechanisms/pos/'>preuve d'enjeu (PoS)</a> et le <a href='/staking/'>staking</a>. Cette page n'est conservée qu'à des fins historiques.
</AlertDescription>
</AlertContent>
</Alert>

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de lire d'abord ce qui concerne les [transactions](/developers/docs/transactions/), les [blocs](/developers/docs/blocks/) et la [preuve de travail (PoW)](/developers/docs/consensus-mechanisms/pow/).

## Qu'est-ce que le minage sur Ethereum ? {#what-is-ethereum-mining}

Le minage est le processus de création d'un bloc de transactions à ajouter à la chaîne de blocs Ethereum dans l'architecture de preuve de travail désormais obsolète d'Ethereum.

Le mot minage trouve son origine dans l'analogie avec l'or pour les cryptomonnaies. L'or ou les métaux précieux sont rares, tout comme les jetons numériques, et la seule façon d'augmenter le volume total dans un système de preuve de travail est le minage. Dans l'Ethereum à preuve de travail, le seul mode d'émission se faisait via le minage. Cependant, contrairement à l'or ou aux métaux précieux, le minage sur Ethereum était également le moyen de sécuriser le réseau en créant, vérifiant, publiant et propageant des blocs dans la chaîne de blocs.

Miner de l'ether = Sécuriser le réseau

Le minage est l'élément vital de toute chaîne de blocs à preuve de travail. Les mineurs d'Ethereum - des ordinateurs exécutant des logiciels - utilisaient leur temps et leur puissance de calcul pour traiter les transactions et produire des blocs avant la transition vers la preuve d'enjeu.

## Pourquoi les mineurs existent-ils ? {#why-do-miners-exist}

Dans les systèmes décentralisés comme Ethereum, nous devons nous assurer que tout le monde est d'accord sur l'ordre des transactions. Les mineurs y contribuaient en résolvant des énigmes informatiques difficiles pour produire des blocs, sécurisant ainsi le réseau contre les attaques.

[En savoir plus sur la preuve de travail](/developers/docs/consensus-mechanisms/pow/)

Auparavant, n'importe qui pouvait miner sur le réseau Ethereum en utilisant son ordinateur. Cependant, tout le monde ne pouvait pas miner de l'ether (ETH) de manière rentable. Dans la plupart des cas, les mineurs devaient acheter du matériel informatique dédié et avoir accès à des sources d'énergie peu coûteuses. Il était peu probable qu'un ordinateur moyen gagne suffisamment de récompenses de bloc pour couvrir les coûts associés au minage.

### Coût du minage {#cost-of-mining}

- Coûts potentiels du matériel nécessaire pour construire et entretenir une installation de minage
- Coût électrique de l'alimentation de l'installation de minage
- Si vous miniez dans une coopérative (pool), ces coopératives facturaient généralement des frais fixes en pourcentage sur chaque bloc généré par la coopérative
- Coût potentiel de l'équipement pour soutenir l'installation de minage (ventilation, surveillance de l'énergie, câblage électrique, etc.)

Pour explorer plus en détail la rentabilité du minage, utilisez un calculateur de minage, tel que celui fourni par [Etherscan](https://etherscan.io/ether-mining-calculator).

## Comment les transactions Ethereum étaient minées {#how-ethereum-transactions-were-mined}

Ce qui suit donne un aperçu de la façon dont les transactions étaient minées dans la preuve de travail d'Ethereum. Une description analogue de ce processus pour la preuve d'enjeu d'Ethereum se trouve [ici](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Un utilisateur rédige et signe une demande de [transaction](/developers/docs/transactions/) avec la clé privée d'un [compte](/developers/docs/accounts/).
2. L'utilisateur diffuse la demande de transaction à l'ensemble du réseau Ethereum à partir d'un [nœud](/developers/docs/nodes-and-clients/).
3. En entendant parler de la nouvelle demande de transaction, chaque nœud du réseau Ethereum ajoute la demande à sa mempool locale, une liste de toutes les demandes de transaction dont ils ont entendu parler et qui n'ont pas encore été validées dans la chaîne de blocs au sein d'un bloc.
4. À un moment donné, un nœud de minage regroupe plusieurs dizaines ou centaines de demandes de transaction dans un [bloc](/developers/docs/blocks/) potentiel, de manière à maximiser les [frais de transaction](/developers/docs/gas/) qu'il gagne tout en restant sous la limite de gaz du bloc. Le nœud de minage procède ensuite ainsi :
   1. Il vérifie la validité de chaque demande de transaction (c'est-à-dire que personne n'essaie de transférer de l'ether à partir d'un compte pour lequel il n'a pas produit de signature, que la demande n'est pas mal formée, etc.), puis exécute le code de la demande, modifiant l'état de sa copie locale de l'EVM. Le mineur attribue les frais de transaction pour chaque demande de transaction de ce type à son propre compte.
   2. Il commence le processus de production du « certificat de légitimité » de preuve de travail pour le bloc potentiel, une fois que toutes les demandes de transaction du bloc ont été vérifiées et exécutées sur la copie locale de l'EVM.
5. Finalement, un mineur terminera de produire un certificat pour un bloc qui inclut notre demande de transaction spécifique. Le mineur diffuse ensuite le bloc terminé, qui comprend le certificat et une somme de contrôle (checksum) du nouvel état revendiqué de l'EVM.
6. D'autres nœuds entendent parler du nouveau bloc. Ils vérifient le certificat, exécutent eux-mêmes toutes les transactions du bloc (y compris la transaction initialement diffusée par notre utilisateur) et vérifient que la somme de contrôle de leur nouvel état de l'EVM après l'exécution de toutes les transactions correspond à la somme de contrôle de l'état revendiqué par le bloc du mineur. Ce n'est qu'à ce moment-là que ces nœuds ajoutent ce bloc à la fin de leur chaîne de blocs et acceptent le nouvel état de l'EVM comme état canonique.
7. Chaque nœud supprime toutes les transactions du nouveau bloc de sa mempool locale de demandes de transaction non satisfaites.
8. Les nouveaux nœuds rejoignant le réseau téléchargent tous les blocs en séquence, y compris le bloc contenant notre transaction d'intérêt. Ils initialisent une copie locale de l'EVM (qui commence comme une EVM à l'état vierge), puis passent par le processus d'exécution de chaque transaction dans chaque bloc par-dessus leur copie locale de l'EVM, en vérifiant les sommes de contrôle d'état à chaque bloc en cours de route.

Chaque transaction est minée (incluse dans un nouveau bloc et propagée pour la première fois) une seule fois, mais exécutée et vérifiée par chaque participant dans le processus d'avancement de l'état canonique de l'EVM. Cela met en évidence l'un des mantras centraux de la chaîne de blocs : **Ne faites pas confiance, vérifiez**.

## Blocs ommer (oncles) {#ommer-blocks}

Le minage de blocs sur la preuve de travail était probabiliste, ce qui signifie que parfois deux blocs valides étaient publiés simultanément en raison de la latence du réseau. Dans ce cas, le protocole devait déterminer la chaîne la plus longue (et donc la plus « valide ») tout en garantissant l'équité envers les mineurs en récompensant partiellement le bloc valide proposé non inclus. Cela encourageait une plus grande décentralisation du réseau, car les petits mineurs, qui pouvaient faire face à une plus grande latence, pouvaient toujours générer des rendements via les récompenses de [bloc ommer](/glossary/#ommer).

Le terme « ommer » est le terme neutre préféré pour désigner le frère d'un bloc parent, mais on l'appelle aussi parfois un « oncle ». **Depuis le passage d'Ethereum à la preuve d'enjeu, les blocs ommer ne sont plus minés** car un seul proposant est élu dans chaque créneau. Vous pouvez voir ce changement en consultant le [graphique historique](https://ycharts.com/indicators/ethereum_uncle_rate) des blocs ommer minés.

## Une démonstration visuelle {#a-visual-demo}

Regardez Austin vous guider à travers le minage et la chaîne de blocs à preuve de travail.

<VideoWatch slug="blockchain-eth-build" />

## L'algorithme de minage {#mining-algorithm}

Le réseau principal Ethereum n'a jamais utilisé qu'un seul algorithme de minage : ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash était le successeur d'un algorithme de R&D original connu sous le nom de ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[En savoir plus sur les algorithmes de minage](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Sujets connexes {#related-topics}

- [Gaz](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Preuve de travail (PoW)](/developers/docs/consensus-mechanisms/pow/)