---
title: "Canaux d'état"
description: "Une introduction aux canaux d'état et aux canaux de paiement en tant que solution de mise à l'échelle actuellement utilisée par la communauté Ethereum."
lang: fr
sidebarDepth: 3
---

Les canaux d'état permettent aux participants d'effectuer des transactions sécurisées hors chaîne tout en gardant l'interaction avec le réseau principal [Ethereum](/) à un minimum. Les pairs du canal peuvent effectuer un nombre arbitraire de transactions hors chaîne tout en ne soumettant que deux transactions onchain pour ouvrir et fermer le canal. Cela permet un débit de transaction extrêmement élevé et se traduit par des coûts réduits pour les utilisateurs.

## Prérequis {#prerequisites}

Vous devriez avoir lu et compris nos pages sur la [mise à l'échelle d'Ethereum](/developers/docs/scaling/) et la [couche 2 (l2)](/layer-2/).

## Que sont les canaux ? {#what-are-channels}

Les chaînes de blocs publiques, telles qu'Ethereum, sont confrontées à des défis de mise à l'échelle en raison de leur architecture distribuée : les transactions onchain doivent être exécutées par tous les nœuds. Les nœuds doivent être capables de gérer le volume de transactions dans un bloc en utilisant du matériel modeste, ce qui impose une limite au débit de transaction pour garder le réseau décentralisé. Les canaux de chaîne de blocs résolvent ce problème en permettant aux utilisateurs d'interagir hors chaîne tout en s'appuyant sur la sécurité de la chaîne principale pour le règlement final.

Les canaux sont de simples protocoles pair à pair qui permettent à deux parties d'effectuer de nombreuses transactions entre elles, puis de ne publier que les résultats finaux sur la chaîne de blocs. Le canal utilise la cryptographie pour démontrer que les données récapitulatives qu'ils génèrent sont véritablement le résultat d'un ensemble valide de transactions intermédiaires. Un contrat intelligent [« multisig »](/developers/docs/smart-contracts/#multisig) garantit que les transactions sont signées par les bonnes parties.

Avec les canaux, les changements d'état sont exécutés et validés par les parties intéressées, minimisant ainsi les calculs sur la couche d'exécution d'Ethereum. Cela réduit la congestion sur Ethereum et augmente également les vitesses de traitement des transactions pour les utilisateurs.

Chaque canal est géré par un [contrat intelligent multisig](/developers/docs/smart-contracts/#multisig) fonctionnant sur Ethereum. Pour ouvrir un canal, les participants déploient le contrat du canal onchain et y déposent des fonds. Les deux parties signent collectivement une mise à jour d'état pour initialiser l'état du canal, après quoi elles peuvent effectuer des transactions rapidement et librement hors chaîne.

Pour fermer le canal, les participants soumettent le dernier état convenu du canal onchain. Ensuite, le contrat intelligent distribue les fonds verrouillés en fonction du solde de chaque participant dans l'état final du canal.

Les canaux pair à pair sont particulièrement utiles dans les situations où certains participants prédéfinis souhaitent effectuer des transactions à haute fréquence sans encourir de frais généraux visibles. Les canaux de chaîne de blocs se divisent en deux catégories : les **canaux de paiement** et les **canaux d'état**.

## Canaux de paiement {#payment-channels}

Un canal de paiement est mieux décrit comme un « registre bidirectionnel » maintenu collectivement par deux utilisateurs. Le solde initial du registre est la somme des dépôts verrouillés dans le contrat onchain pendant la phase d'ouverture du canal. Les transferts du canal de paiement peuvent être effectués instantanément et sans l'implication de la chaîne de blocs elle-même, à l'exception d'une création onchain initiale unique et d'une fermeture éventuelle du canal.

Les mises à jour du solde du registre (c'est-à-dire l'état du canal de paiement) nécessitent l'approbation de toutes les parties du canal. Une mise à jour du canal, signée par tous les participants du canal, est considérée comme finalisée, un peu comme une transaction sur Ethereum.

Les canaux de paiement figuraient parmi les premières solutions de mise à l'échelle conçues pour minimiser l'activité onchain coûteuse des interactions simples des utilisateurs (par exemple, les transferts d'ETH, les échanges atomiques, les micropaiements). Les participants au canal peuvent effectuer un nombre illimité de transactions instantanées et sans frais entre eux tant que la somme nette de leurs transferts ne dépasse pas les jetons déposés.

## Canaux d'état {#state-channels}

Outre la prise en charge des paiements hors chaîne, les canaux de paiement ne se sont pas avérés utiles pour gérer la logique générale de transition d'état. Les canaux d'état ont été créés pour résoudre ce problème et rendre les canaux utiles pour la mise à l'échelle des calculs à usage général.

Les canaux d'état ont encore beaucoup en commun avec les canaux de paiement. Par exemple, les utilisateurs interagissent en échangeant des messages signés cryptographiquement (transactions), que les autres participants au canal doivent également signer. Si une mise à jour d'état proposée n'est pas signée par tous les participants, elle est considérée comme invalide.

Cependant, en plus de conserver les soldes des utilisateurs, le canal suit également l'état actuel du stockage du contrat (c'est-à-dire les valeurs des variables du contrat).

Cela permet d'exécuter un contrat intelligent hors chaîne entre deux utilisateurs. Dans ce scénario, les mises à jour de l'état interne du contrat intelligent ne nécessitent que l'approbation des pairs qui ont créé le canal.

Bien que cela résolve le problème de mise à l'échelle décrit précédemment, cela a des implications pour la sécurité. Sur Ethereum, la validité des transitions d'état est appliquée par le protocole de consensus du réseau. Cela rend impossible de proposer une mise à jour invalide de l'état d'un contrat intelligent ou de modifier l'exécution du contrat intelligent.

Les canaux d'état n'ont pas les mêmes garanties de sécurité. Dans une certaine mesure, un canal d'état est une version miniature du Réseau principal. Avec un ensemble limité de participants appliquant les règles, la possibilité de comportements malveillants (par exemple, proposer des mises à jour d'état invalides) augmente. Les canaux d'état tirent leur sécurité d'un système d'arbitrage des litiges basé sur des [preuves de fraude](/glossary/#fraud-proof).

## Comment fonctionnent les canaux d'état {#how-state-channels-work}

Fondamentalement, l'activité dans un canal d'état est une session d'interactions impliquant des utilisateurs et un système de chaîne de blocs. Les utilisateurs communiquent principalement entre eux hors chaîne et n'interagissent avec la chaîne de blocs sous-jacente que pour ouvrir le canal, fermer le canal ou régler d'éventuels litiges entre les participants.

La section suivante décrit le flux de travail de base d'un canal d'état :

### Ouverture du canal {#opening-the-channel}

L'ouverture d'un canal nécessite que les participants engagent des fonds dans un contrat intelligent sur le Réseau principal. Le dépôt fonctionne également comme une ardoise virtuelle, de sorte que les acteurs participants peuvent effectuer des transactions librement sans avoir besoin de régler les paiements immédiatement. Ce n'est que lorsque le canal est finalisé onchain que les parties se règlent mutuellement et retirent ce qu'il reste de leur ardoise.

Ce dépôt sert également de caution pour garantir un comportement honnête de chaque participant. Si les déposants sont reconnus coupables d'actions malveillantes pendant la phase de résolution des litiges, le contrat ampute leur dépôt.

Les pairs du canal doivent signer un état initial, sur lequel ils sont tous d'accord. Cela sert de genèse au canal d'état, après quoi les utilisateurs peuvent commencer à effectuer des transactions.

### Utilisation du canal {#using-the-channel}

Après avoir initialisé l'état du canal, les pairs interagissent en signant des transactions et en se les envoyant pour approbation. Les participants initient des mises à jour d'état avec ces transactions et signent les mises à jour d'état des autres. Chaque transaction comprend les éléments suivants :

- Un **nonce**, qui agit comme un identifiant unique pour les transactions et empêche les attaques par rejeu. Il identifie également l'ordre dans lequel les mises à jour d'état se sont produites (ce qui est important pour la résolution des litiges)

- L'ancien état du canal

- Le nouvel état du canal

- La transaction qui déclenche la transition d'état (par exemple, Alice envoie 5 ETH à Bob)

Les mises à jour d'état dans le canal ne sont pas diffusées onchain comme c'est normalement le cas lorsque les utilisateurs interagissent sur le Réseau principal, ce qui s'aligne sur l'objectif des canaux d'état de minimiser l'empreinte onchain. Tant que les participants sont d'accord sur les mises à jour d'état, elles sont aussi définitives qu'une transaction Ethereum. Les participants n'ont besoin de dépendre du consensus du Réseau principal que si un litige survient.

### Fermeture du canal {#closing-the-channel}

La fermeture d'un canal d'état nécessite de soumettre l'état final convenu du canal au contrat intelligent onchain. Les détails référencés dans la mise à jour d'état incluent le nombre de mouvements de chaque participant et une liste des transactions approuvées.

Après avoir vérifié que la mise à jour d'état est valide (c'est-à-dire qu'elle est signée par toutes les parties), le contrat intelligent finalise le canal et distribue les fonds verrouillés en fonction du résultat du canal. Les paiements effectués hors chaîne sont appliqués à l'état d'Ethereum et chaque participant reçoit sa part restante des fonds verrouillés.

Le scénario décrit ci-dessus représente ce qui se passe dans le cas idéal. Parfois, les utilisateurs peuvent être incapables de parvenir à un accord et de finaliser le canal (le cas défavorable). L'une des situations suivantes pourrait se présenter :

- Les participants se déconnectent et ne parviennent pas à proposer des transitions d'état

- Les participants refusent de cosigner des mises à jour d'état valides

- Les participants essaient de finaliser le canal en proposant une ancienne mise à jour d'état au contrat onchain

- Les participants proposent des transitions d'état invalides pour que les autres les signent

Chaque fois que le consensus s'effondre entre les acteurs participants dans un canal, la dernière option consiste à s'appuyer sur le consensus du Réseau principal pour appliquer l'état final et valide du canal. Dans ce cas, la fermeture du canal d'état nécessite le règlement des litiges onchain.

### Règlement des litiges {#settling-disputes}

Généralement, les parties dans un canal conviennent de fermer le canal au préalable et cosignent la dernière transition d'état, qu'elles soumettent au contrat intelligent. Une fois la mise à jour approuvée onchain, l'exécution du contrat intelligent hors chaîne se termine et les participants sortent du canal avec leur argent.

Cependant, une partie peut soumettre une demande onchain pour mettre fin à l'exécution du contrat intelligent et finaliser le canal, sans attendre l'approbation de son homologue. Si l'une des situations de rupture de consensus décrites précédemment se produit, l'une ou l'autre des parties peut déclencher le contrat onchain pour fermer le canal et distribuer les fonds. Cela offre une **absence de confiance requise**, garantissant que les parties honnêtes peuvent retirer leurs dépôts à tout moment, quelles que soient les actions de l'autre partie.

Pour traiter la sortie du canal, l'utilisateur doit soumettre la dernière mise à jour d'état valide de l'application au contrat onchain. Si cela est vérifié (c'est-à-dire qu'elle porte la signature de toutes les parties), alors les fonds sont redistribués en leur faveur.

Il y a cependant un délai dans l'exécution des demandes de sortie d'un seul utilisateur. Si la demande de conclusion du canal a été approuvée à l'unanimité, alors la transaction de sortie onchain est exécutée immédiatement.

Le délai entre en jeu dans les sorties d'un seul utilisateur en raison de la possibilité d'actions frauduleuses. Par exemple, un participant au canal peut essayer de finaliser le canal sur Ethereum en soumettant une ancienne mise à jour d'état onchain.

En guise de contre-mesure, les canaux d'état permettent aux utilisateurs honnêtes de contester les mises à jour d'état invalides en soumettant le dernier état valide du canal onchain. Les canaux d'état sont conçus de telle sorte que les mises à jour d'état plus récentes et convenues l'emportent sur les anciennes mises à jour d'état.

Une fois qu'un pair déclenche le système de résolution des litiges onchain, l'autre partie est tenue de répondre dans un délai imparti (appelé fenêtre de contestation). Cela permet aux utilisateurs de contester la transaction de sortie, en particulier si l'autre partie applique une mise à jour obsolète.

Quoi qu'il en soit, les utilisateurs du canal ont toujours de solides garanties de finalité : si la transition d'état en leur possession a été signée par tous les membres et constitue la mise à jour la plus récente, alors elle a une finalité égale à celle d'une transaction onchain régulière. Ils doivent toujours contester l'autre partie onchain, mais le seul résultat possible est la finalisation du dernier état valide, qu'ils détiennent.

### Comment les canaux d'état interagissent-ils avec Ethereum ? {#how-do-state-channels-interact-with-ethereum}

Bien qu'ils existent en tant que protocoles hors chaîne, les canaux d'état ont un composant onchain : le contrat intelligent déployé sur Ethereum lors de l'ouverture du canal. Ce contrat contrôle les actifs déposés dans le canal, vérifie les mises à jour d'état et arbitre les litiges entre les participants.

Les canaux d'état ne publient pas de données de transaction ou d'engagements d'état sur le Réseau principal, contrairement aux solutions de mise à l'échelle de [couche 2 (l2)](/layer-2/). Cependant, ils sont plus connectés au Réseau principal que, par exemple, les [chaînes latérales](/developers/docs/scaling/sidechains/), ce qui les rend un peu plus sûrs.

Les canaux d'état s'appuient sur le protocole Ethereum principal pour les éléments suivants :

#### 1. Disponibilité (Liveness) {#liveness}

Le contrat onchain déployé lors de l'ouverture du canal est responsable de la fonctionnalité du canal. Si le contrat s'exécute sur Ethereum, alors le canal est toujours disponible pour utilisation. À l'inverse, une chaîne latérale peut toujours échouer, même si le Réseau principal est opérationnel, mettant ainsi les fonds des utilisateurs en danger.

#### 2. Sécurité {#security}

Dans une certaine mesure, les canaux d'état s'appuient sur Ethereum pour fournir une sécurité et protéger les utilisateurs contre les pairs malveillants. Comme discuté dans les sections ultérieures, les canaux utilisent un mécanisme de preuve de fraude qui permet aux utilisateurs de contester les tentatives de finalisation du canal avec une mise à jour invalide ou obsolète.

Dans ce cas, la partie honnête fournit le dernier état valide du canal en tant que preuve de fraude au contrat onchain pour vérification. Les preuves de fraude permettent à des parties mutuellement méfiantes d'effectuer des transactions hors chaîne sans risquer leurs fonds dans le processus.

#### 3. Finalité {#finality}

Les mises à jour d'état signées collectivement par les utilisateurs du canal sont considérées comme aussi bonnes que les transactions onchain. Pourtant, toute l'activité dans le canal n'atteint une véritable finalité que lorsque le canal est fermé sur Ethereum.

Dans le cas optimiste, les deux parties peuvent coopérer et signer la mise à jour d'état finale et la soumettre onchain pour fermer le canal, après quoi les fonds sont distribués en fonction de l'état final du canal. Dans le cas pessimiste, où quelqu'un essaie de tricher en publiant une mise à jour d'état incorrecte onchain, sa transaction n'est pas finalisée tant que la fenêtre de contestation n'est pas écoulée.

## Canaux d'état virtuels {#virtual-state-channels}

L'implémentation naïve d'un canal d'état consisterait à déployer un nouveau contrat lorsque deux utilisateurs souhaitent exécuter une application hors chaîne. C'est non seulement irréalisable, mais cela annule également la rentabilité des canaux d'état (les coûts de transaction onchain peuvent s'accumuler rapidement).

Pour résoudre ce problème, des « canaux virtuels » ont été créés. Contrairement aux canaux réguliers qui nécessitent des transactions onchain pour s'ouvrir et se terminer, un canal virtuel peut être ouvert, exécuté et finalisé sans interagir avec la chaîne principale. Il est même possible de régler les litiges hors chaîne en utilisant cette méthode.

Ce système repose sur l'existence de ce que l'on appelle des « canaux de registre », qui ont été financés onchain. Des canaux virtuels entre deux parties peuvent être construits au-dessus d'un canal de registre existant, le ou les propriétaires du canal de registre servant d'intermédiaire.

Les utilisateurs de chaque canal virtuel interagissent via une nouvelle instance de contrat, le canal de registre pouvant prendre en charge plusieurs instances de contrat. L'état du canal de registre contient également plus d'un état de stockage de contrat, permettant l'exécution parallèle d'applications hors chaîne entre différents utilisateurs.

Tout comme les canaux réguliers, les utilisateurs échangent des mises à jour d'état pour faire progresser la machine à états. À moins qu'un litige ne survienne, l'intermédiaire ne doit être contacté que lors de l'ouverture ou de la fermeture du canal.

### Canaux de paiement virtuels {#virtual-payment-channels}

Les canaux de paiement virtuels fonctionnent sur la même idée que les canaux d'état virtuels : les participants connectés au même réseau peuvent transmettre des messages sans avoir besoin d'ouvrir un nouveau canal onchain. Dans les canaux de paiement virtuels, les transferts de valeur sont acheminés via un ou plusieurs intermédiaires, avec la garantie que seul le destinataire prévu peut recevoir les fonds transférés.

## Applications des canaux d'état {#applications-of-state-channels}

### Paiements {#payments}

Les premiers canaux de chaîne de blocs étaient des protocoles simples qui permettaient à deux participants d'effectuer des transferts rapides et à faible coût hors chaîne sans avoir à payer des frais de transaction élevés sur le Réseau principal. Aujourd'hui, les canaux de paiement sont toujours utiles pour les applications conçues pour l'échange et les dépôts d'ether et de jetons.

Les paiements basés sur les canaux présentent les avantages suivants :

1. **Débit** : La quantité de transactions hors chaîne par canal n'est pas liée au débit d'Ethereum, qui est influencé par divers facteurs, en particulier la taille du bloc et le temps de bloc. En exécutant des transactions hors chaîne, les canaux de chaîne de blocs peuvent atteindre un débit plus élevé.

2. **Confidentialité** : Étant donné que les canaux existent hors chaîne, les détails des interactions entre les participants ne sont pas enregistrés sur la chaîne de blocs publique d'Ethereum. Les utilisateurs du canal n'ont à interagir onchain que lors du financement et de la fermeture des canaux ou du règlement des litiges. Ainsi, les canaux sont utiles pour les personnes qui souhaitent des transactions plus privées.

3. **Latence** : Les transactions hors chaîne effectuées entre les participants au canal peuvent être réglées instantanément, si les deux parties coopèrent, ce qui réduit les retards. En revanche, l'envoi d'une transaction sur le Réseau principal nécessite d'attendre que les nœuds traitent la transaction, produisent un nouveau bloc avec la transaction et parviennent à un consensus. Les utilisateurs peuvent également devoir attendre plus de confirmations de blocs avant de considérer une transaction comme finalisée.

4. **Coût** : Les canaux d'état sont particulièrement utiles dans les situations où un ensemble de participants échangera de nombreuses mises à jour d'état sur une longue période. Les seuls coûts encourus sont l'ouverture et la fermeture du contrat intelligent du canal d'état ; chaque changement d'état entre l'ouverture et la fermeture du canal sera moins cher que le précédent car le coût de règlement est réparti en conséquence.

La mise en œuvre de canaux d'état sur des solutions de couche 2 (l2), telles que les [rollups](/developers/docs/scaling/#rollups), pourrait les rendre encore plus attrayants pour les paiements. Bien que les canaux offrent des paiements bon marché, les coûts de configuration du contrat onchain sur le Réseau principal pendant la phase d'ouverture peuvent devenir coûteux, en particulier lorsque les frais de gaz augmentent. Les rollups basés sur Ethereum offrent des [frais de transaction plus bas](https://l2fees.info/) et peuvent réduire les frais généraux pour les participants au canal en diminuant les frais de configuration.

### Microtransactions {#microtransactions}

Les microtransactions sont des paiements de faible valeur (par exemple, inférieurs à une fraction de dollar) que les entreprises ne peuvent pas traiter sans subir de pertes. Ces entités doivent payer des prestataires de services de paiement, ce qu'elles ne peuvent pas faire si la marge sur les paiements des clients est trop faible pour réaliser un profit.

Les canaux de paiement résolvent ce problème en réduisant les frais généraux associés aux microtransactions. Par exemple, un fournisseur d'accès Internet (FAI) peut ouvrir un canal de paiement avec un client, lui permettant de diffuser de petits paiements chaque fois qu'il utilise le service.

Au-delà du coût d'ouverture et de fermeture du canal, les participants n'encourent pas de coûts supplémentaires sur les microtransactions (pas de frais de gaz). C'est une situation gagnant-gagnant puisque les clients ont plus de flexibilité quant au montant qu'ils paient pour les services et que les entreprises ne perdent pas de microtransactions rentables.

### Applications décentralisées {#decentralized-applications}

Comme les canaux de paiement, les canaux d'état peuvent effectuer des paiements conditionnels en fonction des états finaux de la machine à états. Les canaux d'état peuvent également prendre en charge une logique de transition d'état arbitraire, ce qui les rend utiles pour exécuter des applications génériques hors chaîne.

Les canaux d'état sont souvent limités à de simples applications au tour par tour, car cela facilite la gestion des fonds engagés dans le contrat onchain. De plus, avec un nombre limité de parties mettant à jour l'état de l'application hors chaîne à intervalles réguliers, punir un comportement malhonnête est relativement simple.

L'efficacité d'une application de canal d'état dépend également de sa conception. Par exemple, un développeur peut déployer le contrat de canal d'application onchain une fois et permettre à d'autres joueurs de réutiliser l'application sans avoir à aller onchain. Dans ce cas, le canal d'application initial sert de canal de registre prenant en charge plusieurs canaux virtuels, chacun exécutant une nouvelle instance du contrat intelligent de l'application hors chaîne.

Un cas d'utilisation potentiel pour les applications de canal d'état est celui des jeux simples à deux joueurs, où les fonds sont distribués en fonction du résultat du jeu. L'avantage ici est que les joueurs n'ont pas à se faire confiance (absence de confiance requise) et que le contrat onchain, et non les joueurs, contrôle l'allocation des fonds et le règlement des litiges (décentralisation).

D'autres cas d'utilisation possibles pour les applications de canal d'état incluent la propriété de noms ENS, les registres NFT, et bien d'autres.

### Transferts atomiques {#atomic-transfers}

Les premiers canaux de paiement étaient limités aux transferts entre deux parties, ce qui limitait leur utilité. Cependant, l'introduction de canaux virtuels a permis aux individus d'acheminer les transferts via des intermédiaires (c'est-à-dire plusieurs canaux p2p) sans avoir à ouvrir un nouveau canal onchain.

Communément décrits comme des « transferts à sauts multiples », les paiements acheminés sont atomiques (c'est-à-dire que soit toutes les parties de la transaction réussissent, soit elle échoue complètement). Les transferts atomiques utilisent des [contrats de verrouillage temporel hachés (HTLC)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) pour s'assurer que le paiement n'est libéré que si certaines conditions sont remplies, réduisant ainsi le risque de contrepartie.

## Inconvénients de l'utilisation des canaux d'état {#drawbacks-of-state-channels}

### Hypothèses de disponibilité {#liveness-assumptions}

Pour garantir l'efficacité, les canaux d'état imposent des limites de temps à la capacité des participants au canal à répondre aux litiges. Cette règle suppose que les pairs seront toujours en ligne pour surveiller l'activité du canal et contester les défis si nécessaire.

En réalité, les utilisateurs peuvent se déconnecter pour des raisons indépendantes de leur volonté (par exemple, mauvaise connexion Internet, panne mécanique, etc.). Si un utilisateur honnête se déconnecte, un pair malveillant peut exploiter la situation en présentant d'anciens états intermédiaires au contrat d'arbitrage et en volant les fonds engagés.

Certains canaux utilisent des « tours de guet » (watchtowers) — des entités chargées de surveiller les événements de litige onchain au nom d'autres personnes et de prendre les mesures nécessaires, comme alerter les parties concernées. Cependant, cela peut augmenter les coûts d'utilisation d'un canal d'état.

### Indisponibilité des données {#data-unavailability}

Comme expliqué précédemment, contester un litige invalide nécessite de présenter le dernier état valide du canal d'état. C'est une autre règle basée sur une hypothèse : que les utilisateurs ont accès au dernier état du canal.

Bien qu'il soit raisonnable de s'attendre à ce que les utilisateurs du canal stockent des copies de l'état de l'application hors chaîne, ces données peuvent être perdues en raison d'une erreur ou d'une panne mécanique. Si l'utilisateur n'a pas sauvegardé les données, il ne peut qu'espérer que l'autre partie ne finalise pas une demande de sortie invalide en utilisant d'anciennes transitions d'état en sa possession.

Les utilisateurs d'Ethereum n'ont pas à faire face à ce problème puisque le réseau applique des règles sur la disponibilité des données. Les données de transaction sont stockées et propagées par tous les nœuds et disponibles pour que les utilisateurs les téléchargent si et quand cela est nécessaire.

### Problèmes de liquidité {#liquidity-issues}

Pour établir un canal de chaîne de blocs, les participants doivent verrouiller des fonds dans un contrat intelligent onchain pour le cycle de vie du canal. Cela réduit la liquidité des utilisateurs du canal et limite également les canaux à ceux qui peuvent se permettre de garder des fonds verrouillés sur le Réseau principal.

Cependant, les canaux de registre — exploités par un fournisseur de services hors chaîne (OSP) — peuvent réduire les problèmes de liquidité pour les utilisateurs. Deux pairs connectés à un canal de registre peuvent créer un canal virtuel, qu'ils peuvent ouvrir et finaliser complètement hors chaîne, à tout moment.

Les fournisseurs de services hors chaîne pourraient également ouvrir des canaux avec plusieurs pairs, ce qui les rendrait utiles pour acheminer les paiements. Bien sûr, les utilisateurs doivent payer des frais aux OSP pour leurs services, ce qui peut être indésirable pour certains.

### Attaques de nuisance (Griefing) {#griefing-attacks}

Les attaques de type « griefing » (nuisance) sont une caractéristique courante des systèmes basés sur des preuves de fraude. Une attaque de nuisance ne profite pas directement à l'attaquant mais cause du tort (c'est-à-dire des dommages) à la victime, d'où son nom.

La preuve de fraude est susceptible aux attaques de nuisance car la partie honnête doit répondre à chaque litige, même invalide, sous peine de perdre ses fonds. Un participant malveillant peut décider de publier à plusieurs reprises des transitions d'état obsolètes onchain, forçant la partie honnête à répondre avec l'état valide. Le coût de ces transactions onchain peut s'accumuler rapidement, faisant perdre les parties honnêtes dans le processus.

### Ensembles de participants prédéfinis {#predefined-participant-sets}

De par sa conception, le nombre de participants qui composent un canal d'état reste fixe tout au long de sa durée de vie. En effet, la mise à jour de l'ensemble des participants compliquerait le fonctionnement du canal, en particulier lors du financement du canal ou du règlement des litiges. L'ajout ou la suppression de participants nécessiterait également une activité onchain supplémentaire, ce qui augmente les frais généraux pour les utilisateurs.

Bien que cela rende les canaux d'état plus faciles à appréhender, cela limite l'utilité des conceptions de canaux pour les développeurs d'applications. Cela explique en partie pourquoi les canaux d'état ont été abandonnés au profit d'autres solutions de mise à l'échelle, telles que les rollups.

### Traitement parallèle des transactions {#parallel-transaction-processing}

Les participants au canal d'état envoient des mises à jour d'état à tour de rôle, c'est pourquoi ils fonctionnent mieux pour les « applications au tour par tour » (par exemple, une partie d'échecs à deux joueurs). Cela élimine le besoin de gérer des mises à jour d'état simultanées et réduit le travail que le contrat onchain doit effectuer pour punir les auteurs de mises à jour obsolètes. Cependant, un effet secondaire de cette conception est que les transactions dépendent les unes des autres, ce qui augmente la latence et diminue l'expérience utilisateur globale.

Certains canaux d'état résolvent ce problème en utilisant une conception « full-duplex » qui sépare l'état hors chaîne en deux états « simplex » unidirectionnels, permettant des mises à jour d'état simultanées. De telles conceptions améliorent le débit hors chaîne et diminuent les délais de transaction.

## Utiliser les canaux d'état {#use-state-channels}

Plusieurs projets fournissent des implémentations de canaux d'état que vous pouvez intégrer dans vos applications décentralisées (dapps) :

- [Connext](https://connext.network/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Complément d'information {#further-reading}

**Canaux d'état**

- [Comprendre les solutions de mise à l'échelle de couche 2 d'Ethereum : Canaux d'état, Plasma et Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 fév. 2018_
- [Canaux d'état - une explication](https://www.jeffcoleman.ca/state-channels/) _6 nov. 2015 - Jeff Coleman_
- [Les bases des canaux d'état](https://unlock-protocol.github.io/ethhub/ethereum-roadmap/layer-2-scaling/state-channels/) _District0x_
- [Canaux d'état de chaîne de blocs : un état de l'art](https://ieeexplore.ieee.org/document/9627997)

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_