---
title: 7 heuristiques pour la conception d'interfaces Web3
description: "Principes pour améliorer l'utilisabilité du Web3"
lang: fr
---

Les heuristiques d'utilisabilité sont des « règles empiriques » générales que vous pouvez utiliser pour mesurer l'utilisabilité de votre site.
Les 7 heuristiques présentées ici sont spécifiquement adaptées au Web3 et doivent être utilisées conjointement avec les [10 principes généraux de conception d'interaction](https://www.nngroup.com/articles/ten-usability-heuristics/) de Jakob Nielsen.

## Sept heuristiques d'utilisabilité pour le Web3 {#seven-usability-heuristics-for-web3}

1. Le retour d'information suit l'action
2. Sécurité et confiance
3. Les informations les plus importantes sont évidentes
4. Terminologie compréhensible
5. Les actions sont aussi courtes que possible
6. Les connexions réseau sont visibles et flexibles
7. Contrôle depuis l'application, pas depuis le portefeuille


## Définitions et exemples {#definitions-and-examples}

### 1. Le retour d'information suit l'action {#feedback-follows-action}

**Il doit être évident que quelque chose s'est produit ou est en train de se produire.**

Les utilisateurs décident de leurs prochaines étapes en fonction du résultat de leurs étapes précédentes. Il est donc essentiel qu'ils restent informés de l'état du système. C'est particulièrement important dans le Web3, car les transactions peuvent parfois prendre un peu de temps pour être validées sur la chaîne de blocs. S'il n'y a pas de retour d'information leur indiquant de patienter, les utilisateurs ne sont pas sûrs que quelque chose se soit passé.

**Conseils :** 
- Informez l'utilisateur via des messages, des notifications et d'autres alertes.
- Communiquez clairement les temps d'attente.
- Si une action doit prendre plus de quelques secondes, rassurez l'utilisateur avec un minuteur ou une animation pour lui donner l'impression que quelque chose se passe.
- S'il y a plusieurs étapes dans un processus, affichez chaque étape.

**Exemple :**
Afficher chaque étape impliquée dans une transaction aide les utilisateurs à savoir où ils en sont dans le processus. Des icônes appropriées permettent à l'utilisateur de connaître l'état de ses actions.

![Informing the user about each step when swapping tokens](./Image1.png)

### 2. La sécurité et la confiance sont intégrées {#security-and-trust-are-backed-in}

La sécurité doit être priorisée, et cela doit être souligné pour l'utilisateur. 
Les gens se soucient profondément de leurs données. La sécurité est souvent une préoccupation majeure pour les utilisateurs, elle doit donc être prise en compte à tous les niveaux de la conception. Vous devez toujours chercher à gagner la confiance de vos utilisateurs, mais la façon dont vous le faites peut signifier différentes choses selon les applications. Cela ne doit pas être une réflexion après coup, mais doit être conçu consciemment tout au long du processus. Instaurez la confiance tout au long de l'expérience utilisateur, y compris sur les canaux sociaux et dans la documentation, ainsi que dans l'interface utilisateur finale. Des éléments tels que le niveau de décentralisation, le statut multi-signatures de la trésorerie et le fait que l'équipe soit publique (doxxed) affectent tous la confiance des utilisateurs.

**Conseils :**
- Affichez fièrement vos audits
- Obtenez plusieurs audits
- Mettez en avant toutes les fonctionnalités de sécurité que vous avez conçues
- Soulignez les risques possibles, y compris les intégrations sous-jacentes
- Communiquez la complexité des stratégies
- Prenez en compte les problèmes non liés à l'interface utilisateur qui pourraient affecter la perception de la sécurité par vos utilisateurs

**Exemple :** 
Incluez vos audits dans le pied de page, dans une taille bien visible.

![Audits referenced in the website footer](./Image2.png)

### 3. Les informations les plus importantes sont évidentes {#the-most-important-info-is-obvious}

Pour les systèmes complexes, n'affichez que les données les plus pertinentes. Déterminez ce qui est le plus important et priorisez son affichage. 
Trop d'informations est accablant et les utilisateurs s'ancrent généralement sur une seule information lorsqu'ils prennent des décisions. Dans la finance décentralisée (DeFi), ce sera probablement l'APR sur les applications de rendement et le LTV sur les applications de prêt.

**Conseils :**
- La recherche utilisateur révélera la métrique la plus importante
- Affichez les informations clés en grand, et les autres détails en petit et de manière discrète
- Les gens ne lisent pas, ils parcourent ; assurez-vous que votre conception est facile à parcourir

**Exemple :** Les gros jetons en couleur sont faciles à trouver lors du parcours visuel. L'APR est grand et mis en évidence avec une couleur d'accentuation.

![The token and APR are easy to find](./Image3.png)

### 4. Terminologie claire {#clear-terminology}

La terminologie doit être compréhensible et appropriée.
Le jargon technique peut être un énorme obstacle, car il nécessite la construction d'un modèle mental complètement nouveau. Les utilisateurs sont incapables de relier la conception à des mots, des phrases et des concepts qu'ils connaissent déjà. Tout semble confus et peu familier, et il y a une courbe d'apprentissage abrupte avant même qu'ils puissent essayer de l'utiliser. Un utilisateur pourrait aborder la finance décentralisée (DeFi) en voulant économiser de l'argent, et ce qu'il trouve est : minage, farming, staking, émissions, pots-de-vin (bribes), coffres-forts (vaults), casiers (lockers), veTokens, acquisition, époques, algorithmes décentralisés, liquidité appartenant au protocole…
Essayez d'utiliser des termes simples qui seront compris par le plus grand nombre. N'inventez pas de tout nouveaux termes juste pour votre projet.

**Conseils :**
- Utilisez une terminologie simple et cohérente
- Utilisez autant que possible le langage existant
- N'inventez pas vos propres termes
- Suivez les conventions à mesure qu'elles apparaissent
- Éduquez les utilisateurs autant que possible

**Exemple :**
« Vos récompenses » est un terme neutre et largement compris ; ce n'est pas un nouveau mot inventé pour ce projet. Les récompenses sont libellées en USD pour correspondre aux modèles mentaux du monde réel, même si les récompenses elles-mêmes sont dans un autre jeton.

![Token rewards, displayed in U.S. dollars](./Image4.png)

### 5. Les actions sont aussi courtes que possible {#actions-are-as-short-as-possible}

Accélérez les interactions de l'utilisateur en regroupant les sous-actions. 
Cela peut être fait au niveau du contrat intelligent, ainsi que dans l'interface utilisateur. L'utilisateur ne devrait pas avoir à passer d'une partie du système à une autre – ou à quitter complètement le système – pour effectuer une action courante. 

**Conseils :**
- Combinez « Approuver » avec d'autres actions lorsque cela est possible
- Regroupez les étapes de signature aussi près que possible les unes des autres

**Exemple :** Combiner « ajouter de la liquidité » et « staker » est un exemple simple d'accélérateur qui fait gagner à l'utilisateur à la fois du temps et du gaz.

![Modal showing a switch to combine the deposit and stake actions](./Image5.png)

### 6. Les connexions réseau sont visibles et flexibles {#network-connections-are-visible-and-flexible}

Informez l'utilisateur du réseau auquel il est connecté et fournissez des raccourcis clairs pour changer de réseau. 
C'est particulièrement important sur les applications multi-chaînes. Les fonctions principales de l'application doivent rester visibles lorsqu'elle est déconnectée ou connectée à un réseau non pris en charge.

**Conseils :**
- Affichez autant que possible l'application lorsqu'elle est déconnectée
- Affichez le réseau auquel l'utilisateur est actuellement connecté
- N'obligez pas l'utilisateur à aller dans le portefeuille pour changer de réseau
- Si l'application nécessite que l'utilisateur change de réseau, proposez l'action depuis l'appel à l'action principal
- Si l'application contient des marchés ou des coffres-forts pour plusieurs réseaux, indiquez clairement quel ensemble l'utilisateur est en train de consulter

**Exemple :** Montrez à l'utilisateur à quel réseau il est connecté et permettez-lui de le changer dans la barre d'application.

![Dropdown button showing the connected network](./Image6.png)

### 7. Contrôle depuis l'application, pas depuis le portefeuille {#control-from-the-app-not-the-wallet}

L'interface utilisateur doit dire à l'utilisateur tout ce qu'il a besoin de savoir et lui donner le contrôle sur tout ce qu'il a besoin de faire. 
Dans le Web3, il y a des actions que vous effectuez dans l'interface utilisateur, et des actions que vous effectuez dans le portefeuille. Généralement, vous initiez une action dans l'interface utilisateur, puis vous la confirmez dans le portefeuille. Les utilisateurs peuvent se sentir mal à l'aise si ces deux aspects ne sont pas intégrés avec soin.

**Conseils :**
- Communiquez l'état du système via des retours d'information dans l'interface utilisateur
- Conservez un enregistrement de leur historique
- Fournissez des liens vers des explorateurs de blocs pour les anciennes transactions
- Fournissez des raccourcis pour changer de réseau. 

**Exemple :** Un conteneur subtil montre à l'utilisateur quels jetons pertinents il a dans son portefeuille, et l'appel à l'action (CTA) principal fournit un raccourci pour changer de réseau.

![Main CTA is prompting the user to switch network](./Image7.png)