---
title: Canaux d'état
description: Une introduction aux canaux d'état et canaux de paiement en tant que solution de mise à l'échelle actuellement utilisée par la communauté Ethereum.
lang: fr
sidebarDepth: 3
---

Les canaux d'État permettent aux participants d'effectuer des transactions hors chaîne en toute sécurité tout en réduisant au minimum l'interaction avec le réseau principal d'Ethereum. Les pairs du canal peuvent effectuer un nombre arbitraire de transactions hors chaîne tout en ne soumettant que deux transactions en chaîne pour ouvrir et fermer le canal. Cela permet un débit de transaction extrêmement élevé et entraîne une réduction des coûts pour les utilisateurs.

##  {#how-do-sidechains-work}

Les blockchains publiques, telles qu'Ethereum, sont confrontées à des problèmes d'évolutivité en raison de leur architecture distribuée : les transactions sur la chaîne doivent être exécutées par tous les nœuds. Les nœuds doivent être en mesure de traiter le volume de transactions d'un bloc avec un matériel modeste, ce qui impose une limite au débit des transactions pour que le réseau reste décentralisé.

###  {#consensus-algorithms}

Les chaînes sont de simples protocoles de pair à pair qui permettent à deux parties d'effectuer de nombreuses transactions entre elles, puis de ne publier que les résultats finaux sur la blockchain. La chaîne utilise la cryptographie pour démontrer que les données récapitulatives qu'elle génère sont réellement le résultat d'un ensemble valide de transactions intermédiaires. Un [contrat intelligent « multisig »](/developers/docs/smart-contracts/#multisig) garantit que les transactions sont signées par les bonnes parties.

- []()
- []()
-

Avec les canaux, les changements d'état sont exécutés et validés par les parties intéressées, ce qui minimise les calculs sur la couche d'exécution d'Ethereum. Cela réduit la congestion sur Ethereum et augmente la vitesse de traitement des transactions pour les utilisateurs.

####  {#block-parameters}

Chaque canal est géré par un [contrat intelligent multisig](/developers/docs/smart-contracts/#multisig) fonctionnant sur Ethereum. Pour ouvrir un canal, les participants déploient le contrat de canal sur la chaîne et y déposent des fonds.

Pour fermer le canal, les participants soumettent le dernier état convenu du canal sur la chaîne. Ensuite, le contrat intelligent distribue les fonds bloqués en fonction du solde de chaque participant dans l'état final du canal.

Les canaux pair-à-pair sont particulièrement utiles dans les situations où certains participants prédéfinis souhaitent effectuer des transactions à une fréquence élevée sans encourir de frais généraux visibles. Les canaux de la blockchain se divisent en deux catégories : les **canaux de paiement** et les **canaux étatiques**.

###  {#evm-compatibility}

La meilleure façon de décrire un canal de paiement est de dire qu'il s'agit d'un « registre à double sens » tenu collectivement par deux utilisateurs. Le solde initial du registre est la somme des dépôts bloqués dans le contrat en chaîne pendant la phase d'ouverture du canal.

Les mises à jour du solde du registre (c'est-à-dire l'état du canal de paiement) nécessitent l'approbation de toutes les parties du canal. Une mise à jour du canal, signée par tous les participants au canal, est considérée comme finalisée, un peu comme une transaction sur Ethereum.

Les canaux de paiement ont été parmi les premières solutions de mise à l'échelle conçues pour minimiser l'activité coûteuse sur la chaîne des interactions simples avec les utilisateurs (par exemple, les transferts d'ETH, les échanges atomiques, les micropaiements). Les participants au canal peuvent effectuer un nombre illimité de transactions instantanées et sans sentiment entre eux, tant que la somme nette de leurs transferts ne dépasse pas les jetons déposés.

En dehors de la prise en charge des paiements hors chaîne, les canaux de paiement ne se sont pas révélés utiles pour gérer la logique générale de transition d'état. Les canaux d'état ont été créés pour résoudre ce problème et rendre les canaux utiles pour la mise à l'échelle du calcul à usage général.

###  {#asset-movement}

Les canaux d'état ont encore beaucoup de points communs avec les canaux de paiement. Par exemple, les utilisateurs interagissent en échangeant des messages cryptographiquement signés (transactions), que les autres participants au canal doivent également signer. Si une mise à jour d'état proposée n'est pas signée par tous les participants, elle est considérée comme invalide.

##  {#pros-and-cons-of-sidechains}

|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |

###  {#use-sidechains}

- []()
- []()
- []()
- []()
- []()

##  {#further-reading}

-

_ _
