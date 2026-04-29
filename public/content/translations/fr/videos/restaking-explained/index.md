---
title: "Explication du restaking"
description: "Une explication du restaking, qui utilise des ETH déjà stakés pour fournir une sécurité à des protocoles et services supplémentaires au-delà de la couche de base d'Ethereum."
lang: fr
youtubeId: "rOJo7VwPh7I"
uploadDate: 2024-02-05
duration: "0:12:33"
educationLevel: intermediate
topic:
  - "restaking"
  - "security"
format: explainer
author: CBER Forum
breadcrumb: "Restaking"
---

Une présentation de **Mike Neuder** lors d'un événement du CBER Forum expliquant le fonctionnement du restaking. La présentation définit le staking en solo, le staking délégué, le restaking natif et non natif, les mécanismes du staking liquide et des jetons de restaking liquide, ainsi que la manière dont la réduction interagit avec les positions restakées.

*Cette transcription est une copie accessible de la [transcription vidéo originale](https://www.youtube.com/watch?v=rOJo7VwPh7I) publiée par le CBER Forum. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Introduction (0:00) {#introduction-000}

Bonjour à tous, je suis Mike. Je vais vous parler des LRT et des LST. Les LRT — le restaking est-il le nouveau staking ? Je vais commencer par une deuxième question et l'utiliser pour motiver la discussion sur les LST et les LRT, en définissant ce qu'ils sont. Il s'agit principalement d'une présentation graphique, donc j'espère que nous pourrons commencer par le début et construire cela ensemble.

Bref aperçu : en commençant par le tout début, nous allons définir deux modes de staking. Le premier est le staking en solo, le second est le staking délégué. Ensuite, nous aborderons le concept de restaking et le définirons. Il y a quatre modèles différents que je souhaite explorer — en utilisant la séparation entre solo et délégué, puis en nous concentrant sur le restaking natif par rapport au restaking non natif. Ensuite, nous passerons à la liquéfaction, en parlant des jetons liquides — les jetons de staking liquide (LST) et les jetons de restaking liquide (LRT). Nous motiverons cela en examinant la réduction et le restaking, puis les deux types de jetons. Enfin, nous terminerons avec quelques données sur le staking tel qu'il existe aujourd'hui sur Ethereum.

#### Staking en solo (0:48) {#self-staking-048}

Pour commencer par le tout début, nous avons le staking où Alice le fait elle-même. Elle interagit directement avec le protocole, place sa mise dans le protocole, et elle est récompensée pour cela par l'émission du jeton natif. Dans le cas d'Ethereum, Alice stake 32 ETH et est récompensée en ETH pour sa participation au consensus.

Il y a deux choses sur lesquelles se concentrer ici. Premièrement, le staking sert de mécanisme anti-Sybil — vous ne pouvez pas tromper le réseau en prétendant avoir plusieurs identités, car chaque identité coûte une certaine quantité de cette offre fixe de jetons. Deuxièmement, le collatéral à risque — ce sont les règles du protocole en matière de réduction. Si Alice se comporte mal selon des spécifications très bien définies, le protocole lui retirera son capital et la punira pour cela.

#### Staking délégué (2:52) {#delegated-staking-252}

Le staking délégué ajoute une autre couche au milieu, entre Alice et le protocole. Alice délègue maintenant à Bob, qui stake sur le protocole Ethereum. Les récompenses sont envoyées à Bob, et les récompenses moins les frais sont transmises à Alice. C'est la version la plus simple du staking délégué — Alice ne veut pas exécuter le logiciel elle-même, peut-être qu'elle n'a pas 32 ETH complets, ou qu'elle n'a pas le matériel ou l'expertise technique pour gérer un validateur.

Il existe de nombreux modes différents pour cette délégation, à divers niveaux de confiance. La version nécessitant le plus de confiance est dépositaire — vous envoyez vos ETH à Coinbase et dites « stakez en mon nom ». Vous leur faites effectivement entièrement confiance car ils conservent l'actif en votre nom. Il existe une version non dépositaire mais gouvernée par une DAO, où vous déléguez votre mise à quelqu'un déterminé par une DAO qui vote pour savoir qui peut gérer les nœuds — c'est le staking de style Lido. La troisième est une version à confiance minimisée où Alice et Bob apportent tous deux un collatéral. Alice subventionne le reste du collatéral de Bob, et si Bob se comporte mal et subit une réduction, son collatéral est la première tranche à être retirée. Je dis « à confiance minimisée » et non « sans tiers de confiance » car, quoi qu'il arrive, il y a des scénarios dans lesquels le collatéral d'Alice est complètement anéanti en fonction de ce que fait Bob.

#### Restaking en solo avec des ETH natifs (4:42) {#self-restaking-with-native-eth-442}

Maintenant, nous pouvons parler de ce qu'est le restaking. C'est un tout nouveau concept — il existe depuis que Sreeram et EigenLayer ont introduit le terme il y a peut-être un an et demi ou deux ans.

Dans ce modèle, Alice fait la même chose qu'avant — elle envoie sa mise au protocole Ethereum et obtient des récompenses pour sa participation au consensus. Maintenant, nous avons un nouveau protocole — appelons-le « Retheum » — sur lequel Alice effectue un restaking. L'important ici est qu'elle utilise les mêmes jetons qu'elle stake dans le protocole Ethereum pour sécuriser ce second protocole.

Elle obtient des récompenses pour cela. Cela semble génial — Alice a maintenant potentiellement le double de récompenses pour la même mise. Mais le risque est que le capital qu'elle a staké dans les deux protocoles est désormais soumis aux règles des deux protocoles. Si Alice se comporte mal sur Ethereum, elle peut perdre son capital en subissant une réduction. Si elle se comporte mal sur « Retheum », elle peut également subir une réduction. Avec un rendement supplémentaire viennent des responsabilités supplémentaires — des comportements de protocole qui sont obligatoires et punissables de manières supplémentaires si vous engagez votre jeton de staking à travers de nombreux protocoles différents.

#### Restaking natif délégué (8:28) {#delegated-native-restaking-828}

La deuxième version est le restaking délégué avec des ETH natifs. Alice stake sur Ethereum, et maintenant elle veut utiliser Bob pour déléguer sa mise au protocole « Retheum ». Elle délègue à Bob, Bob effectue le restaking, le protocole émet des récompenses à Bob, et Bob transmet les récompenses moins les frais à Alice.

Dans ce modèle, les 32 ETH du protocole Ethereum sont responsables des actions d'Alice et de Bob — deux personnes qui pourraient potentiellement voir ces ETH subir une réduction. Le jeton est soumis à deux ensembles différents de règles de protocole.

**Question du public :** Lorsque vous stakez des ETH dans le protocole Ethereum, le protocole doit vous donner quelque chose que vous présentez ensuite — qu'est-ce que c'est ?

Dans cette version native, Alice stake et obtient ce qu'on appelle un identifiant de retrait de l'écosystème Ethereum. Cet identifiant de retrait peut pointer vers un contrat sur Ethereum qui gère la deuxième couche de staking. C'est un contrat qui contrôle les actifs lorsque vous les retirez d'Ethereum — c'est comme une conservation sans tiers de confiance dans le contrat intelligent qui applique la deuxième couche de pénalités de réduction.

Pourquoi appelle-t-on cela « natif » ? Parce qu'Alice interagit toujours directement avec Ethereum — sa mise correspond aux 32 ETH qu'elle possède, utilisés pour sécuriser la couche de consensus d'Ethereum.

#### Restaking non natif (10:57) {#non-native-restaking-1057}

Le restaking en solo dans un cadre non natif : Alice interagit uniquement avec le protocole « Retheum ». Elle n'exécute pas de nœud sur Ethereum. Elle effectue un restaking — bien que je mette « re » entre guillemets car elle ne fait pas vraiment de restaking, il s'agit d'un staking en premier lieu. La seule raison pour laquelle on l'appelle restaking est que cela se déroule via un protocole qui facilite également d'autres types de restaking.

Elle prend des jetons non natifs — cela pourrait être de l'USDC, un stablecoin euro, du Bitcoin enveloppé (wrapped Bitcoin), peu importe — elle les fournit comme sécurité économique et résistance Sybil au protocole et gagne des récompenses. Cela redéfinit le restaking comme un marché pour la confiance décentralisée, où la confiance fait référence à la valeur économique du capital à risque.

Le restaking délégué avec des jetons non natifs suit le même modèle — Alice délègue par l'intermédiaire de Bob et reçoit les récompenses moins les frais.

#### Réduction et restaking (13:55) {#slashing-and-restaking-1355}

Avant d'aborder la liquidité, parlons de la réduction. Dans le mode de réduction normal, Alice stake dans le protocole Ethereum. Si elle fait quelque chose que le protocole considère comme incorrect — par exemple, une équivoque, où elle utilise sa clé cryptographique pour signer deux informations qui sont en conflit l'une avec l'autre — c'est une faute objective. Tout le monde peut vérifier que les deux signatures ont été signées par Alice, et c'est une preuve suffisante pour appliquer une réduction à ses jetons.

Comment le restaking et la réduction interagissent-ils ? Dans la version la plus simple — le restaking en solo avec l'actif natif — Alice stake sur Ethereum et effectue également un restaking via « Retheum ». Si Alice continue de faire son travail sur le protocole « Retheum » mais commet une équivoque sur Ethereum, nous avons maintenant un problème : elle subit une réduction sur Ethereum, mais « Retheum » n'a rien vu qui lui soit imputable de répréhensible selon ses règles. Il doit y avoir une certaine communication entre les deux protocoles.

Cette direction de communication est en fait assez facile car « Retheum » est un contrat intelligent sur Ethereum — il peut lire l'état d'Ethereum et dire « ce validateur a subi une réduction selon Ethereum », donc sur le protocole de second ordre, Alice subit également une réduction.

L'autre direction est plus difficile. Si Alice subit une réduction sur la plateforme de restaking, Ethereum devrait en être informé. Mais Ethereum est intentionnellement inconscient de tout ce qui se passe sur sa couche de contrat en termes de mécanisme de consensus.

**Question du public :** Pourquoi cela aurait-il de l'importance ? Ethereum a besoin de la mise pour ce qu'il fait, mais le montant du restaking est un dérivé de l'original.

Le problème est que si Alice subit une réduction sur la plateforme de restaking, elle ne possède plus réellement cette mise. Elle peut faire ce qu'elle veut sur le protocole Ethereum sans aucun capital réel à risque — ce qui est tout l'intérêt d'avoir une mise en premier lieu. C'est comme si vous utilisiez de l'argent pour deux choses, qu'il disparaissait sur l'une d'elles, et que l'autre devait prendre conscience que cet argent n'est plus le vôtre. Il a toujours une valeur économique dans un certain sens, mais vous ne le contrôlez pas — donc vous vous fichez de ce qui lui arrive car il a déjà disparu.