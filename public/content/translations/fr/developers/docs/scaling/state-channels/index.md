---
title: Canaux d'état
description: Une introduction aux canaux d'état et canaux de paiement en tant que solution de mise à l'échelle actuellement utilisée par la communauté Ethereum.
lang: fr
sidebarDepth: 3
---

Les canaux d'état permettent aux participants d'effectuer des transactions hors chaîne en toute sécurité tout en réduisant au minimum l'interaction avec le réseau principal d'Ethereum. Les pairs du canal peuvent effectuer un nombre arbitraire de transactions hors chaîne tout en ne soumettant que deux transactions en chaîne pour ouvrir et fermer le canal. Cela permet un débit de transaction extrêmement élevé et entraîne une réduction des coûts pour les utilisateurs.

## Prérequis {#prerequisites}

Vous devrez avoir lu et compris nos pages sur l'[évolutivité d'Ethereum](/developers/docs/scaling/) et les [couches de niveau 2](/layer-2/).

## Que sont les canaux ? {#what-are-channels}

Les blockchains publiques, telles qu'Ethereum, sont confrontées à des problèmes d'évolutivité en raison de leur architecture distribuée : les transactions sur la chaîne doivent être exécutées par tous les nœuds. Les nœuds doivent être en mesure de traiter le volume de transactions d'un bloc avec un matériel modeste, imposant une limite au débit des transactions afin de préserver la décentralisation du réseau. Les canaux de la blockchain résolvent ce problème en permettant aux utilisateurs d'interagir hors chaîne tout en s'appuyant sur la sécurité de la chaîne principale pour le règlement final.

Les canaux sont de simples protocoles de pair à pair qui permettent à deux parties d'effectuer de nombreuses transactions entre elles, puis de ne publier que les résultats finaux sur la blockchain. Le canal utilise la cryptographie pour démontrer que les données récapitulatives qu'il génère sont réellement le résultat d'un ensemble valide de transactions intermédiaires. Une ["multi-signature"](/developers/docs/smart-contracts/#multisig) garantit que les transactions sont signées par les bonnes personnes.

Avec les canaux, les changements d'état sont exécutés et validés par les parties intéressées, ce qui minimise les calculs sur la couche d'exécution d'Ethereum. Cela réduit la congestion sur Ethereum et augmente la vitesse de traitement des transactions pour les utilisateurs.

Chaque canal est géré par un [contrat intelligent multi-signature](/developers/docs/smart-contracts/#multisig) fonctionnant sur Ethereum. Pour ouvrir un canal, les participants déploient le contrat de canal sur la chaîne et y déposent des fonds. Les deux parties signent collectivement une mise à jour d'état pour initialiser l'état du canal, après quoi elles peuvent effectuer des transactions rapidement et librement hors chaîne.

Pour fermer le canal, les participants soumettent le dernier état convenu du canal sur la chaîne. Ensuite, le contrat intelligent distribue les fonds bloqués en fonction du solde de chaque participant dans l'état final du canal.

Les canaux pair-à-pair sont particulièrement utiles dans les situations où certains participants prédéfinis souhaitent effectuer des transactions à une fréquence élevée sans encourir de frais généraux visibles. Les canaux de la blockchain se divisent en deux catégories : les **canaux de paiement** et les **canaux d'état**.

## Les canaux de paiement {#payment-channels}

La meilleure façon de décrire un canal de paiement est de dire qu'il s'agit d'un « registre à double sens » tenu collectivement par deux utilisateurs. Le solde initial du registre est la somme des dépôts bloqués dans le contrat sur la chaîne pendant la phase d'ouverture du canal. Les transferts de canaux de paiement peuvent être effectués instantanément et sans l'intervention de la blockchain elle-même, à l'exception d'une création initiale unique sur la chaîne et d'une fermeture éventuelle du canal.

Les mises à jour du solde du registre (c'est-à-dire l'état du canal de paiement) nécessitent l'approbation de toutes les parties du canal. Une mise à jour du canal, signée par tous les participants au canal, est considérée comme finalisée, un peu comme une transaction sur Ethereum.

Les canaux de paiement ont été parmi les premières solutions de mise à l'échelle conçues pour minimiser l'activité coûteuse des interactions simples des utilisateurs sur la chaîne (par exemple, les transferts d'ETH, les échanges atomiques, les micropaiements). Les participants au canal peuvent effectuer un nombre illimité de transactions instantanées et sans frais entre eux, tant que la somme nette de leurs transferts ne dépasse pas les jetons déposés.

## Les canaux d'état {#state-channels}

En dehors de la prise en charge des paiements hors chaîne, les canaux de paiement ne se sont pas révélés utiles pour gérer la logique générale de transition d'état. Les canaux d'état ont été créés pour résoudre ce problème et rendre les canaux utiles pour la mise à l'échelle du calcul à usage général.

Les canaux d'état ont néanmoins beaucoup de points communs avec les canaux de paiement. Par exemple, les utilisateurs interagissent en échangeant des messages cryptographiquement signés (transactions), que les autres participants au canal doivent également signer. Si une mise à jour d'état proposée n'est pas signée par tous les participants, elle est considérée comme invalide.

Cependant, en plus de contenir les soldes de l'utilisateur, le canal suit également l'état actuel du stockage du contrat (c'est-à-dire les valeurs des variables du contrat).

Cela rend possible l'exécution d'un contrat intelligent hors chaîne entre deux utilisateurs. Dans ce scénario, les mises à jour de l'état interne du contrat intelligent ne nécessitent que l'approbation des pairs qui ont créé le canal.

Si cela permet de résoudre le problème d'évolutivité décrit plus haut, cette approche a également des conséquences sur la sécurité. Sur Ethereum, la validité des transitions d'état est assurée par le protocole de consensus du réseau. Il est ainsi impossible de proposer une mise à jour invalide de l'état d'un contrat intelligent ou de modifier l'exécution d'un contrat intelligent.

Les canaux d'état ne présentent pas les mêmes garanties de sécurité. Dans une certaine mesure, un canal d'état constitue une version miniature du réseau principal. Avec un ensemble limité de participants chargés de faire respecter les règles, la possibilité de comportements malveillants (par exemple, proposer des mises à jour d'état invalides) augmente. Les canaux d'état tirent leur sécurité d'un système d'arbitrage des litiges basé sur des [preuves de fraude](/glossary/#fraud-proof).

## Comment fonctionnent les canaux d'état {#how-state-channels-work}

Fondamentalement, l'activité dans un canal d'état constitue une session d'interactions impliquant des utilisateurs et un système de blockchain. Les utilisateurs communiquent principalement entre eux hors chaîne et n'interagissent avec la blockchain sous-jacente que pour ouvrir le canal, le fermer ou régler d'éventuels conflits entre les participants.

La section suivante décrit le flux de travail de base d'un canal d'état :

### Ouverture du canal {#opening-the-channel}

Pour ouvrir un canal, les participants doivent engager des fonds dans un contrat intelligent sur le réseau principal. Le dépôt fonctionne également comme un onglet virtuel, de sorte que les acteurs participants peuvent effectuer des transactions librement sans avoir besoin de régler les paiements immédiatement. Ce n'est que lorsque le canal est finalisé sur la chaîne que les parties s'arrangent entre elles et retirent ce qui reste de leur onglet.

Ce dépôt sert également d'obligation pour garantir un comportement honnête de la part de chaque participant. Si les déposants sont reconnus coupables d'actions malveillantes pendant la phase de résolution des litiges, le contrat annule leur dépôt.

Les pairs du canal doivent signer un état initial, sur lequel ils sont tous d'accord. Il s'agit de la genèse du canal d'état, après quoi les utilisateurs peuvent commencer à effectuer des transactions.

### Utilisation du canal {#using-the-channel}

Après avoir initialisé l'état du canal, les pairs interagissent en signant des transactions et en se les envoyant mutuellement pour approbation. Les participants initient les mises à jour d'état avec ces transactions et signent les mises à jour d'état des autres. Chaque transaction comprend les éléments suivants :

- Un **nonce**, qui sert d'identifiant unique pour les transactions et empêche les attaques par rejeu. Il identifie également l'ordre dans lequel les mises à jour de l'état ont eu lieu (ce qui est important pour la résolution des conflits)

- L'ancien état du canal

- Le nouvel état du canal

- La transaction qui déclenche la transition d'état (par exemple, Alice envoie 5 ETH à Bob)

Les mises à jour d'état dans le canal ne sont pas diffusées sur la chaîne, comme c'est normalement le cas lorsque les utilisateurs interagissent sur le réseau principal, ce qui correspond à l'objectif des canaux d'état de minimiser l'empreinte sur la chaîne. Tant que les participants sont d'accord sur les mises à jour d'état, celles-ci sont aussi définitives qu'une transaction Ethereum. Les participants ne doivent dépendre du consensus du réseau principal qu'en cas de conflit.

### Fermeture du canal {#closing-the-channel}

La fermeture d'un canal d'état nécessite de soumettre l'état final et convenu du canal au contrat intelligent sur la chaîne. Les détails mentionnés dans la mise à jour de l'état comprennent le nombre de mouvements de chaque participant et une liste des transactions approuvées.

Après avoir vérifié que la mise à jour de l'état est valide (c'est-à-dire qu'elle est signée par toutes les parties), le contrat intelligent finalise le canal et distribue les fonds bloqués en fonction du résultat du canal. Les paiements effectués hors chaîne sont appliqués à l'état d'Ethereum et chaque participant reçoit sa part restante des fonds bloqués.

Le scénario décrit ci-dessus représente ce qui se passe dans un cas de figure favorable. Parfois, les utilisateurs ne parviennent pas à se mettre d'accord et à finaliser le canal (cas de figure défavorable). Chacune des affirmations suivantes peut s'appliquer à la situation :

- Les participants se déconnectent et ne proposent pas de transitions d'état

- Les participants refusent de cosigner des mises à jour d'état valides

- Les participants essaient de finaliser le canal en proposant une mise à jour de l'ancien état au contrat sur la chaîne

- Les participants proposent des transitions d'état invalides pour que les autres les signent

Lorsque le consensus est rompu entre les acteurs participants d'un canal, la dernière option est de s'appuyer sur le consensus du réseau principal pour faire respecter l'état final et valide du canal. Dans ce cas, la fermeture du canal d'état nécessite de régler les litiges sur la chaîne.

### Résolution des litiges {#settling-disputes}

En général, les parties d'un canal se mettent d'accord sur la fermeture du canal au préalable et cosignent la dernière transition d'état, qu'elles soumettent au contrat intelligent. Une fois la mise à jour approuvée sur la chaîne, l'exécution du contrat intelligent hors chaîne prend fin et les participants quittent le canal avec leur argent.

Cependant, une partie peut soumettre une demande sur la chaîne pour mettre fin à l'exécution du contrat intelligent et finaliser le canal, sans attendre l'approbation de son homologue. Si l'une des situations de rupture de consensus décrites précédemment se produit, l'une ou l'autre partie peut déclencher le contrat en chaîne pour fermer le canal et distribuer les fonds. Cela permet une **absence de confiance**, garantissant que les parties honnêtes peuvent retirer leurs dépôts à tout moment, indépendamment des actions de l'autre partie.

Pour traiter la sortie du canal, l'utilisateur doit soumettre la dernière mise à jour d'état valide de l'application au contrat en chaîne. S'il est validé (c'est-à-dire qu'il porte la signature de toutes les parties), les fonds sont redistribués en sa faveur.

Il y a cependant un retard dans l'exécution des demandes de sortie des utilisateurs uniques. Si la demande de fermeture du canal a été approuvée à l'unanimité, alors la transaction de sortie sur la chaîne est exécutée immédiatement.

Le délai a une certaine importance dans les sorties mono-utilisateur en raison de la possibilité d'actions frauduleuses. Par exemple, un participant au canal peut essayer de finaliser le canal sur Ethereum en soumettant une ancienne mise à jour d'état sur la chaîne.

Comme contre-mesure, les canaux d'état permettent aux utilisateurs honnêtes de contester les mises à jour d'état invalides en soumettant le dernier état valide du canal sur la chaîne. Les canaux d'état sont conçus de telle sorte que les mises à jour d'état les plus récentes et agréées l'emportent sur les mises à jour d'état plus anciennes.

Lorsqu'un pair déclenche le système de résolution des conflits sur la chaîne, l'autre partie est tenue de répondre dans un certain délai (appelé fenêtre de contestation). Cela permet aux utilisateurs de contester la transaction de sortie, notamment si l'autre partie applique une mise à jour périmée.

Quoi qu'il en soit, les utilisateurs du canal ont toujours de fortes garanties de finalité : si la transition d'état en leur possession a été signée par tous les membres et constitue la mise à jour la plus récente, alors elle a la même finalité qu'une transaction ordinaire sur la chaîne. Ils doivent encore contester l'autre partie sur la chaîne, mais le seul résultat possible est de finaliser le dernier état valide, qu'ils détiennent.

### Comment les canaux d'état interagissent-ils avec Ethereum ? {#how-do-state-channels-interact-with-ethereum}

Bien qu'ils existent en tant que protocoles hors chaîne, les canaux d'état ont un composant en chaîne : le contrat intelligent déployé sur Ethereum lors de l'ouverture du canal. Ce contrat contrôle les actifs déposés dans le canal, vérifie les mises à jour de l'état et arbitre les conflits entre les participants.

Les canaux d'état ne publient pas les données de transaction ou les engagements d'état sur le réseau principal, contrairement aux solutions de mise à l'échelle de la [couche de niveau 2](/layer-2/). Cependant, ils sont plus connectés au réseau principal que, par exemple, les [chaînes latérales](/developers/docs/scaling/sidechains/), ce qui les rend un peu plus sûrs.

Les canaux d'état reposent sur le protocole principal d'Ethereum pour les éléments suivants :

#### 1. Vivacité {#liveness}

Le contrat en chaîne déployé lors de l'ouverture du canal est responsable de la fonctionnalité du canal. Si le contrat est exécuté sur Ethereum, le canal est toujours disponible à l'utilisation. À l'inverse, une chaîne latérale peut toujours échouer, même si le réseau principal est opérationnel, mettant ainsi les fonds des utilisateurs en danger.

#### 2. Sécurité {#security}

Dans une certaine mesure, les canaux d'état reposent sur Ethereum pour assurer la sécurité et protéger les utilisateurs contre les pairs malveillants. Comme nous le verrons dans les sections suivantes, les canaux utilisent un mécanisme de preuve de fraude qui permet aux utilisateurs de contester les tentatives de finaliser le canal avec une mise à jour invalide ou périmée.

Dans ce cas, la partie honnête fournit le dernier état valide du canal comme preuve de fraude au contrat en chaîne pour vérification. Les preuves de fraude permettent à des parties mutuellement méfiantes d'effectuer des transactions hors chaîne sans risquer leurs fonds dans le processus.

#### 3. Finalité {#finality}

Les mises à jour d'état signées collectivement par les utilisateurs du canal sont considérées comme aussi bonnes que les transactions en chaîne. Cependant, toute activité au sein d'un canal n'atteint une véritable finalité que lorsque le canal est fermé sur Ethereum.

Dans l'hypothèse optimiste, les deux parties peuvent coopérer et signer la mise à jour de l'état final et la soumettre sur la chaîne pour fermer le canal, après quoi les fonds sont distribués selon l'état final du canal. Dans l'hypothèse pessimiste, où quelqu'un essaie de tricher en postant une mise à jour d'état incorrecte sur la chaîne, sa transaction n'est pas finalisée tant que la fenêtre de contestation n'est pas écoulée.

## Canaux d'état virtuel {#virtual-state-channels}

L'implémentation naïve d'un canal d'état consisterait à déployer un nouveau contrat lorsque deux utilisateurs souhaitent exécuter une application hors chaîne. Non seulement cela n'est pas faisable, mais cette approche réduirait à néant le rapport coût-efficacité des canaux d'état (les coûts de transaction sur la chaîne peuvent rapidement s'accumuler).

Pour résoudre ce problème, des « canaux virtuels » ont été créés. Contrairement aux canaux réguliers qui nécessitent des transactions sur la chaîne pour s'ouvrir et se clôturer, un canal virtuel peut être ouvert, exécuté et finalisé sans interaction avec la chaîne principale. Cette méthode permet même de régler des litiges hors chaîne.

Ce système repose sur l'existence de ce que l'on appelle des « canaux de registre », qui ont été financés sur la chaîne. Les canaux virtuels entre deux parties peuvent être construits sur un canal de registre existant, le/les propriétaire(s) du canal de registre servant d'intermédiaire.

Les utilisateurs de chaque canal virtuel interagissent via une nouvelle instance de contrat, le canal du registre pouvant prendre en charge plusieurs instances de contrat. L'état du canal du registre contient également plus d'un état de stockage de contrat, ce qui permet l'exécution parallèle d'applications hors chaîne entre différents utilisateurs.

Tout comme les canaux ordinaires, les utilisateurs échangent des mises à jour d'état pour faire progresser la machine d'état. Hormis en cas de litige, il suffit de contacter l'intermédiaire pour ouvrir ou fermer le canal.

### Canaux de paiement virtuel {#virtual-payment-channels}

Les canaux de paiement virtuels fonctionnent sur le même principe que les canaux d'état virtuels : les participants connectés au même réseau peuvent échanger des messages sans avoir à ouvrir un nouveau canal sur la chaîne. Dans les canaux de paiement virtuels, les transferts de valeur sont acheminés par un ou plusieurs intermédiaires, avec la garantie que seul le destinataire prévu peut recevoir les fonds transférés.

## Applications des canaux d'états {#applications-of-state-channels}

### Paiements {#payments}

Les premiers canaux de la blockchain étaient de simples protocoles qui permettaient à deux participants d'effectuer des transferts rapides et peu coûteux hors chaîne sans avoir à payer des frais de transaction élevés sur le réseau principal. Aujourd'hui, les canaux de paiement sont encore utiles pour les applications conçues pour l'échange et les dépôts d'éther et de jetons.

Les paiements basés sur les canaux présentent les avantages suivants :

1. **Débit** : la quantité de transactions hors chaîne par canal n'a aucun lien avec le débit d'Ethereum, qui résulte de divers facteurs, notamment la taille et la durée des blocs. En exécutant des transactions hors chaîne, les canaux de la blockchain peuvent atteindre un débit plus élevé.

2. **Confidentialité** : dans la mesure où les canaux existent hors chaîne, les détails des interactions entre les participants ne sont pas enregistrés sur la blockchain publique d'Ethereum. Les utilisateurs de canaux ne doivent interagir sur la chaîne que pour financer et fermer des canaux ou régler des litiges. Les canaux sont donc utiles pour les personnes qui recherchent des transactions plus privées.

3. **Latence** : les transactions hors chaîne effectuées entre les participants au canal peuvent être réglées instantanément, si les deux parties coopèrent, ce qui réduit les délais. En revanche, pour envoyer une transaction sur le réseau principal, il faut attendre que les nœuds traitent la transaction, produisent un nouveau bloc avec la transaction et parviennent à un consensus. Il se peut également que les utilisateurs doivent attendre d'autres confirmations de blocs avant de considérer une transaction comme finalisée.

4. **Coût** : les canaux d'état sont particulièrement utiles dans les situations où un ensemble de participants échangent de nombreuses mises à jour d'état sur une longue période. Les seuls coûts encourus concernent l'ouverture et la fermeture du contrat intelligent du canal d'état ; chaque changement d'état entre l'ouverture et la fermeture du canal sera moins coûteux que le précédent car le coût du règlement est réparti en conséquence.

La mise en œuvre de canaux d'état sur les solutions de couche 2, telles que les [rollups](/developers/docs/scaling/#rollups), pourrait les rendre encore plus attrayantes pour les paiements. Alors que les canaux offrent des paiements bon marché, les coûts de mise en place du contrat en chaîne sur le réseau principal pendant la phase d'ouverture peuvent devenir onéreux, surtout lorsque les frais de gaz augmentent. Les rollups basés sur Ethereum offrent des [frais de transaction plus bas](https://l2fees.info/) et peuvent réduire les frais généraux pour les participants au canal en faisant baisser les frais d'installation.

### Microtransactions {#microtransactions}

Les microtransactions sont des paiements de faible valeur (inférieurs à une fraction de dollar, par exemple) que les entreprises ne peuvent pas traiter sans encourir de pertes. Ces entités doivent payer les prestataires de services de paiement, ce qu'elles ne peuvent faire si la marge sur les paiements des clients est trop faible pour réaliser un bénéfice.

Les canaux de paiement résolvent ce problème en réduisant les frais généraux associés aux microtransactions. Par exemple, un fournisseur d'accès à Internet (« Internet Service Provider » ou ISP) peut ouvrir un canal de paiement avec un client, lui permettant d'effectuer de petits paiements en continu chaque fois qu'il utilise le service.

Au-delà du coût d'ouverture et de fermeture du canal, les participants n'encourent pas de frais supplémentaires sur les microtransactions (pas de frais de gaz). Tout le monde y gagne : les clients disposent d'une plus grande marge de manœuvre pour régler les services et les entreprises ne perdent pas de bénéfices sur les microtransactions.

### Applications décentralisées {#decentralized-applications}

Comme les canaux de paiement, les canaux d'état peuvent effectuer des paiements conditionnels en fonction des états finaux de la machine d'état. Les canaux d'état peuvent également prendre en charge une logique de transition d'état arbitraire, ce qui les rend utiles pour exécuter des applications génériques hors chaîne.

Les canaux d'état sont souvent limités à de simples applications à tour de rôle, car cela facilite la gestion des fonds engagés dans le contrat sur la chaîne. En outre, avec un nombre limité de parties mettant à jour l'état de l'application hors chaîne à intervalles réguliers, il est relativement simple de sanctionner un comportement malhonnête.

L'efficacité d'une application de canal d'état dépend également de sa conception. Par exemple, un développeur peut déployer une fois le contrat de canal de l'application sur la chaîne et permettre aux autres joueurs de réutiliser l'application sans avoir à passer par la chaîne. Dans ce cas, le canal initial de l'application sert de canal de registre supportant plusieurs canaux virtuels, chacun exécutant une nouvelle instance du contrat intelligent de l'application hors chaîne.

Les jeux simples à deux joueurs, où les fonds sont distribués en fonction de l'issue du jeu, constituent un cas d'utilisation potentiel des applications de canaux d'état. L'avantage est que les joueurs n'ont pas à se faire confiance (absence de confiance) et que le contrat sur la chaîne, et non les joueurs, contrôle l'allocation des fonds et le règlement des litiges (décentralisation).

Parmi les autres cas d'utilisation possibles des applications de canaux d'état, citons la propriété des noms ENS, les registres NFT, et bien d'autres encore.

### Transferts atomiques {#atomic-transfers}

Les premiers canaux de paiement étaient limités aux transferts entre deux parties, ce qui en limitait l'utilité. Cependant, l'introduction des canaux virtuels a permis aux individus d'acheminer les transferts par le biais d'intermédiaires (c'est-à-dire de multiples canaux p2p) sans avoir à ouvrir un nouveau canal sur la chaîne.

Communément décrits comme des « transferts multi-saut », les paiements acheminés sont atomiques (c'est-à-dire que soit toutes les parties de la transaction réussissent, soit la transaction échoue complètement). Les transferts atomiques utilisent les [contrats HTLC (Contrats à synchronisation de hachage)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) pour garantir que le paiement n'est libéré que si certaines conditions sont remplies, ce qui réduit le risque de contrepartie.

## Inconvénients de l'utilisation des canaux d'états {#drawbacks-of-state-channels}

### Hypothèses de vivacité {#liveness-assumptions}

Pour garantir l'efficacité, les canaux d'état imposent des limites de temps aux participants du canal pour répondre aux litiges. Cette règle suppose que les pairs seront toujours en ligne pour surveiller l'activité du canal et contester les problèmes si nécessaire.

En réalité, les utilisateurs peuvent être mis hors ligne pour des raisons indépendantes de leur volonté (par exemple, une mauvaise connexion internet, une panne mécanique, etc.). Si un utilisateur honnête se déconnecte, un pair malveillant peut exploiter la situation en présentant d'anciens états intermédiaires au contrat de l'adjudicateur et en volant les fonds engagés.

Certains canaux utilisent des « watchtowers », c'est-à-dire des entités chargées de surveiller les conflits sur la chaîne au nom des autres et de prendre les mesures nécessaires, comme alerter les parties concernées. Cependant, cela peut augmenter les coûts d'utilisation d'un canal d'état.

### Indisponibilité des données {#data-unavailability}

Comme expliqué précédemment, la contestation d'un litige invalide nécessite de présenter le dernier état valide du canal d'état. Il s'agit d'une autre règle basée sur une hypothèse - que les utilisateurs ont accès au dernier état du canal.

Bien qu'il soit raisonnable d'attendre des utilisateurs de canaux qu'ils stockent des copies de l'état des applications hors chaîne, ces données peuvent être perdues en raison d'une erreur ou d'une défaillance mécanique. Si l'utilisateur n'a pas sauvegardé les données, il ne peut qu'espérer que l'autre partie ne finalise pas une demande de sortie invalide en utilisant les anciennes transitions d'état en sa possession.

Les utilisateurs d'Ethereum n'ont pas à faire face à ce problème puisque le réseau applique des règles sur la disponibilité des données. Les données relatives aux transactions sont stockées, propagées par tous les nœuds et peuvent être téléchargées par les utilisateurs en cas de besoin.

### Problèmes de liquidité {#liquidity-issues}

Pour établir un canal sur la blockchain, les participants doivent bloquer des fonds dans un contrat intelligent sur la chaîne pour le cycle de vie du canal. Cela réduit la liquidité des utilisateurs du canal et limite également les canaux à ceux qui peuvent se permettre de garder les fonds bloqués sur le réseau principal.

Toutefois, les canaux des registres - exploités par un fournisseur de services hors chaîne (OSP) - peuvent réduire les problèmes de liquidité pour les utilisateurs. Deux pairs connectés à un canal du registre peuvent créer un canal virtuel, qu'ils peuvent ouvrir et finaliser complètement hors chaîne, quand ils le souhaitent.

Les fournisseurs de services hors chaîne pourraient également ouvrir des canaux avec plusieurs pairs, ce qui les rend utiles pour l'acheminement des paiements. Bien entendu, les utilisateurs doivent payer des frais aux OSP pour leurs services, ce que certains pourraient juger indésirable.

### Les attaques de griefing {#griefing-attacks}

Les attaques de griefing sont une caractéristique commune des systèmes basés sur la preuve de fraude. Une attaque de griefing ne profite pas directement à l'attaquant mais cause du grief (c'est-à-dire du tort) à la victime, d'où son nom.

La preuve de fraude est susceptible de faire l'objet d'attaques de type griefing, car la partie honnête doit répondre à chaque litige, même invalide, sous peine de perdre ses fonds. Un participant malveillant peut décider de poster de manière répétée des transitions d'état périmées sur la chaîne, obligeant la partie honnête à répondre avec l'état valide. Le coût de ces transactions sur la chaîne peut rapidement s'accumuler, et les parties honnêtes y perdent au change.

### Ensembles de participants prédéfinis {#predefined-participant-sets}

Par conception, le nombre de participants qui composent un canal d'état reste fixe pendant toute sa durée de vie. En effet, la mise à jour de l'ensemble des participants compliquerait le fonctionnement du canal, notamment pour le financement du canal ou le règlement des litiges. L'ajout ou le retrait de participants nécessiterait également une activité supplémentaire sur la chaîne, ce qui augmente les frais généraux pour les utilisateurs.

Bien que cela rende les canaux d'état plus faciles à appréhender, cette approche limite l'utilité des conceptions de canaux pour les développeurs d'applications. Cela explique en partie pourquoi les canaux d'état ont été abandonnés au profit d'autres solutions de mise à l'échelle, comme les rollups.

### Traitement parallèle des transactions {#parallel-transaction-processing}

Les participants au canal d'état envoient des mises à jour d'état à tour de rôle, c'est pourquoi ils fonctionnent mieux pour les « applications basées sur le tour de rôle » (par exemple, un jeu d'échecs à deux joueurs). Cela élimine la nécessité de gérer les mises à jour simultanées de l'état et réduit le travail que le contrat en chaîne doit faire pour punir les publications de mise à jour périmées. Cependant, cette conception a pour effet secondaire de rendre les transactions dépendantes les unes des autres, ce qui augmente la latence et diminue l'expérience globale de l'utilisateur.

Certains canaux d'état résolvent ce problème en utilisant une conception « full-duplex » qui divise l'état hors chaîne en deux états unidirectionnels « simplex », permettant des mises à jour d'état simultanées. Ces conceptions améliorent le débit hors chaîne et réduisent les délais de transaction.

## Utilisation des canaux d'états {#use-state-channels}

Plusieurs projets fournissent des implémentations de canaux d'état que vous pouvez intégrer dans vos dApps :

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## En savoir plus {#further-reading}

**Canaux d'état**

- [Comprendre les solutions de mise à l'échelle de la couche 2 d'Ethereum : State Channels, Plasma, et Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 Fev 2018_
- [Canaux d'état - une explication](https://www.jeffcoleman.ca/state-channels/) _– Jeff Coleman, 6 Nov 2015_
- [Les bases des canaux d'état](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_
- [Les canaux d'état de la blockchain : situation actuelle](https://ieeexplore.ieee.org/document/9627997)

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
