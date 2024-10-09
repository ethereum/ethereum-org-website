---
title: Minage
description: Une explication de la façon dont le minage fonctionnait sur Ethereum.
lang: fr
---

<InfoBanner emoji=":wave:">
La preuve de travail n'est plus le mécanisme de consensus d'Ethereum, ce qui implique que le minage a été désactivé. À la place, Ethereum est sécurisé par les validateurs qui misent de l'ETH. Vous pouvez commencer à miser votre ETH aujourd'hui. En savoir plus sur <a href='/roadmap/merge/'>La Fusion</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>la preuve d'enjeu</a> et <a href='/staking/'>la mise en jeu</a>. Cette page n'a qu'un intérêt historique.
</InfoBanner>

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de commencer par lire celles concernant [les transactions](/developers/docs/transactions/), [les blocs](/developers/docs/blocks/) et [la preuve de travail](/developers/docs/consensus-mechanisms/pow/).

## Qu'est-ce que le minage Ethereum ? {#what-is-ethereum-mining}

Le minage est le processus de création d'un bloc de transactions à ajouter à la blockchain Ethereum dans l'architecture de preuve de travail, désormais obsolète, pour Ethereum.

Le terme « minage » trouve son origine dans la comparaison avec l'or des crypto-monnaies. L'or et les métaux précieux sont rares, tout comme les jetons numériques, et le seul moyen d'en augmenter le volume dans le cadre du système de preuve de travail est le minage. Dans le cadre de la preuve de travail Ethereum, le seul mode d’émission était le minage. À la différence du minage historique de l'or ou des métaux précieux, le minage avec Ethereum permet également de sécuriser le réseau en créant, vérifiant, publiant et propageant de nouveaux blocs dans la blockchain.

Miner de l'ether = Sécuriser le réseau

Le minage est la colonne vertébrale de toute blockchain utilisant la preuve de travail. Les mineurs d'Ethereum - les ordinateurs qui exécutent des logiciels - utilisaient leur puissance de temps et de calcul pour traiter les transactions et produire des blocs avant la transition vers la preuve d'enjeu.

## Pourquoi existe-t-il des mineurs ? {#why-do-miners-exist}

Dans les systèmes décentralisés comme Ethereum, nous devons nous assurer que tout le monde s'accorde sur l'ordre des transactions. Les mineurs y contribuent en résolvant des casse-têtes informatiques complexes pour produire des blocs, sécurisant également ainsi le réseau contre les attaques.

[En savoir plus sur la preuve de travail](/developers/docs/consensus-mechanisms/pow/)

Auparavant, n'importe qui pouvait miner sur le réseau Ethereum à l'aide de son ordinateur. Cependant, tout le monde ne pouvait pas miner de l'éther (ETH) de manière rentable. Dans la plupart des cas, les mineurs devaient acheter du matériel informatique et des logiciels dédiés et avoir accès à des sources d'énergie peu coûteuses. Il était peu probable que l'ordinateur moyen gagne suffisamment de récompenses de blocs pour couvrir les coûts associés au minage.

### Coût du minage {#cost-of-mining}

- Coûts potentiels du matériel nécessaire pour construire et entretenir une plate-forme minière
- Coût électrique de l'alimentation de la plate-forme minière
- Si vous miniez au sein d'un pool, ces derniers facturaient généralement des frais fixes en % de chaque bloc généré par le pool
- Coût potentiel de l'équipement pour soutenir la plate-forme minière (ventilation, surveillance de l'énergie, câblage électrique, etc.)

Pour explorer davantage la rentabilité du minage, utilisez un calculateur de minage, tel que celui fourni par [Etherscan](https://etherscan.io/ether-mining-calculator).

## Comment les transactions Ethereum étaient-elles minées ? {#how-ethereum-transactions-were-mined}

Ce qui suit donne un aperçu de la façon dont les transactions ont été exécutés dans la preuve de travail Ethereum. Une description analogue de ce processus pour la preuve d'enjeu Ethereum peut être trouvée [ici](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Un utilisateur rédige et signe une demande de [transaction](/developers/docs/transactions/) avec la clé privée d'un [compte](/developers/docs/accounts/).
2. L'utilisateur diffuse la demande de transaction sur l'ensemble du réseau Ethereum à partir de certains [nœuds](/developers/docs/nodes-and-clients/).
3. Dès qu'il a connaissance de la nouvelle demande de transaction, chaque nœud du réseau Ethereum l'ajoute à son « mempool », une zone d'attente de toutes les demandes de transaction dont il a connaissance et qui n'ont pas encore été engagées dans un bloc de la blockchain.
4. À un moment donné, un nœud de minage regroupe plusieurs dizaines ou centaines de demandes de transaction dans un [bloc](/developers/docs/blocks/) potentiel, de façon à maximiser les [frais de transaction](/developers/docs/gas/) gagnés, tout en restant sous la limite de gaz du bloc. Dès lors, le nœud de minage :
   1. Vérifie la validité de chaque demande de transaction (c'est-à-dire que personne n'essaie de transférer un ether depuis un compte pour lequel il n'a pas fourni de signature, que la demande n'est pas mal rédigée, etc.), puis exécute le code de la demande, modifiant l'état de sa copie locale de l'EVM, la machine virtuelle d'Ethereum. Le mineur attribue les frais de transaction pour chaque demande de transaction à son propre compte.
   2. Commence le processus de production du « certificat de légitimité de preuve de travail » pour le bloc potentiel, une fois que toutes les demandes de transaction du bloc ont été vérifiées et exécutées sur la copie locale de l'EVM.
5. Enfin, un mineur finira de produire un certificat pour un bloc qui inclut notre demande de transaction spécifique. Le mineur diffuse ensuite le bloc terminé qui comprend le certificat et la somme de contrôle du nouvel état de l'EVM.
6. D'autres nœuds prennent connaissance du nouveau bloc. Ils vérifient le certificat, exécutent eux-mêmes toutes les transactions sur le bloc (y compris celle initialement diffusée par notre utilisateur), et vérifient que la somme de contrôle du nouvel état de leur EVM après exécution de toutes les transactions correspond à la somme de contrôle de l'état revendiqué par le bloc du mineur. Ce n'est qu'à ce moment-là que ces nœuds ajoutent ce bloc à la queue de leur blockchain, et acceptent le nouvel état de l'EVM comme étant conforme.
7. Chaque nœud supprime toutes les transactions du nouveau bloc de son mempool local de demandes de transaction non satisfaites.
8. Les nouveaux nœuds qui rejoignent le réseau téléchargent tous les blocs en séquence, y compris le bloc contenant la transaction qui nous intéresse. Ils initialisent une copie locale de l'EVM (qui débute en tant qu'EVM vide), puis commencent l'exécution de chaque transaction dans chaque bloc en plus de leur copie locale de l'EVM, en vérifiant la somme de contrôle de l'état de chaque bloc dans le processus.

Chaque transaction est minée (incluse dans un nouveau bloc et propagée pour la première fois) une fois, mais exécutée et vérifiée par chaque participant au processus d'avancement vers l'état conforme de l'EVM. Cette approche met en avant l'une des principales devises de la blockchain : **Ne faites pas confiance, vérifiez**.

## Blocs ommer (oncle) {#ommer-blocks}

Le minage du bloc reposant sur la preuve de travail (PoW) n'était alors que probabiliste, ce qui signifie que, parfois, il arrivait que deux blocs, ayant déjà été validés, soient en même temps exposés au public, notamment en raison de la latence du réseau. Dans ce cas, le protocole devait déterminer la chaîne la plus longue (et donc la plus « valide ») tout en assurant l'équité envers les mineurs en récompensant partiellement le bloc valide non inclus proposé. Cela a encouragé une plus grande décentralisation du réseau pour les mineurs plus petits, qui pourraient être confrontés à une plus grande latence, leur permettant de générer des rendements par le biais d'un bloc de récompenses [ommer](/glossary/#ommer) .

On utilise de préférence le terme « ommer », plus neutre, pour désigner le frère ou la sœur d'un bloc parent, mais on parle aussi parfois d'« oncle ». **Depuis le passage d'Ethereum à la preuve d'enjeu, les blocs Ommer ne sont plus minés** puisque seulement un acteur de l'écosystème peut être élu dans chaque slot. Vous pouvez voir ce changement en visualisant le [graphique historique](https://ycharts.com/indicators/ethereum_uncle_rate) des blocs Ommer minés.

## Démonstration visuelle {#a-visual-demo}

Regardez Austin vous guider à travers le minage et la blockchain de la preuve de travail.

<YouTube id="zcX7OJ-L8XQ" />

## L'algorithme de minage {#mining-algorithm}

Le réseau principal Ethereum n'a jamais utilisé qu'un seul algorithme de minage - ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash était le successeur d'un algorithme R&D originel connu sous le nom de [«Dagger-Hashimoto»](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Plus de détails sur les algorithmes de minage](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Sujets connexes {#related-topics}

- [Gaz](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Preuve de travail](/developers/docs/consensus-mechanisms/pow/)
