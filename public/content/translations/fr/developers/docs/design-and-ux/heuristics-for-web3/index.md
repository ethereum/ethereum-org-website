---
title: 7 heuristiques pour la conception d'interfaces Web3
description: Principes pour améliorer la convivialité du Web3
lang: fr
---

Les heuristiques de convivialité sont des « règles générales » que vous pouvez utiliser pour évaluer la convivialité de votre site.
Les 7 heuristiques sont ici spécialement adaptées au Web3 et devraient être utilisées en complément des [10 principes généraux de la conception d'interaction](https://www.nngroup.com/articles/ten-usability-heuristics/) de Jakob Nielsen.

## Sept heuristiques de convivialité pour le Web3 {#seven-usability-heuristics-for-web3}

1. Le retour d'information suit l'action
2. Sécurité et confiance
3. Les informations les plus importantes sont évidentes
4. Terminologie compréhensible
5. Les actions sont aussi courtes que possible
6. Les connexions réseau sont visibles et flexibles
7. Contrôle depuis l'application, pas depuis le portefeuille

## Définitions et exemples {#definitions-and-examples}

### 1. Le retour d'information suit l'action {#feedback-follows-action}

**Il devrait être évident que quelque chose s'est produit ou est en train de se produire**

Les utilisateurs décident de leurs prochaines étapes en fonction des résultats de leurs étapes précédentes. Il est donc essentiel qu'ils soient informés en permanence de l'état du système. Ceci est particulièrement important dans le Web3, car les transactions peuvent parfois prendre un certain temps avant d'être validées sur la blockchain. S'il n'y a pas de retour d'information leur indiquant d'attendre, les utilisateurs ne savent pas si quelque chose s'est passé.

\*_Conseils :_

- Informez l'utilisateur via des messages, des notifications et d'autres alertes.
- Communiquez clairement les temps d'attente.
- Si une action doit prendre plus de quelques secondes, rassurez l'utilisateur avec un minuteur ou une animation pour lui donner l'impression que quelque chose se passe.
- Si un processus se déroule en plusieurs étapes, montrez chaque étape.

**Exemple :**
Afficher chaque étape impliquée dans une transaction aide les utilisateurs à savoir où ils en sont dans le processus. Des icônes appropriées permettent à l'utilisateur de connaître l'état de ses actions.

![Informer l'utilisateur de chaque étape lors de l'échange de tokens](./Image1.png)

### 2. Sécurité et confiance intégrées {#security-and-trust-are-backed-in}

La sécurité doit être une priorité : cela doit être très clair pour l'utilisateur.
Les gens accordent une grande importance à leurs données. La sécurité est souvent une préoccupation majeure pour les utilisateurs, elle doit donc être prise en compte à tous les niveaux de la conception. Vous devez toujours chercher à gagner la confiance de vos utilisateurs, mais la manière d'y parvenir peut varier selon les applications. Cela ne doit pas être une réflexion après coup, mais doit être pensé consciemment tout au long du processus. Établissez la confiance sur l'ensemble de l'expérience utilisateur, y compris sur les réseaux sociaux et la documentation, ainsi que dans l'interface utilisateur finale. Des éléments tels que le niveau de décentralisation, le statut du multi-sig de la trésorerie, et le fait que l'équipe soit identifiable ou non, influencent tous la confiance des utilisateurs

\*_Conseils :_

- Listez fièrement vos audits
- Obtenez plusieurs audits
- Faites la promotion de toutes les fonctionnalités de sécurité que vous avez conçues
- Mettez en évidence les risques potentiels, y compris les intégrations sous-jacentes
- Communiquez la complexité des stratégies
- Tenez compte des problèmes non liés à l'interface utilisateur qui pourraient affecter la perception de vos utilisateurs en termes de sécurité

**Exemple :**
Incluez vos audits dans le pied de page, à une taille bien visible.

![Audits référencés dans le pied de page du site web](./Image2.png)

### 3. Les informations les plus importantes sont évidentes {#the-most-important-info-is-obvious}

Pour les systèmes complexes, affichez uniquement les données les plus pertinentes. Déterminez les éléments les plus importants et affichez-les en priorité.
Une trop grande quantité d'informations risque de submerger les utilisateurs, qui se concentrent généralement sur un seul élément d'information lorsqu'ils prennent une décision. Dans la DeFi, il s'agira probablement de l'APR pour les applications de rendement et du ratio LTV pour les applications de prêt.

\*_Conseils :_

- Une recherche sur les utilisateurs permettra d'identifier les paramètres les plus importants
- Faites en sorte que l'information principale soit de grande taille, et que les autres détails soient petits et discrets
- Les gens ne lisent pas, ils parcourent ; assurez-vous que votre design puise être facilement balayé du regard

**Exemple :** Les jetons de grande taille en pleine couleur sont faciles à repérer lors d'un balayage visuel. L'APR est grand et mis en valeur avec une couleur accentuée.

![Le jeton et l'APR sont faciles à repérer](./Image3.png)

### 4. Terminologie claire {#clear-terminology}

La terminologie doit être compréhensible et appropriée.
Le jargon technique peut être un obstacle majeur, car il nécessite la construction d'un tout nouveau modèle mental. Les utilisateurs ne peuvent pas relier le design à des mots, expressions et concepts qu'ils connaissent déjà. Tout semble confus et étranger, et la courbe d'apprentissage est abrupte avant de pouvoir ne serait-ce qu'essayer de l'utiliser. Un utilisateur peut aborder la DeFi en voulant simplement économiser de l'argent, mais ce qu'il trouve, c'est : miner, farmer, mise en jeu, émissions, pots-de-vin, coffres, stockages, jetons verrouillés, acquisition progressive, époques, algorithmes décentralisés, liquidité détenue par le protocole…
Essayez d'utiliser des termes simples qui seront compris par le plus grand nombre de personnes. N'inventez pas de nouveaux termes uniquement pour votre projet.

\*_Conseils :_

- Utilisez une terminologie simple et cohérente
- Utilisez le langage existant autant que possible
- N'inventez pas vos propres termes
- Suivez les conventions au fur et à mesure qu'elles apparaissent
- Éduquez les utilisateurs autant que possible

**Exemple :**
"Vos récompenses" est un terme neutre largement compris ; ce n'est pas un nouveau mot inventé pour ce projet. Les récompenses sont libellées en USD pour correspondre aux modèles mentaux du monde réel, même si les récompenses elles-mêmes sont dans un autre jeton.

![Récompenses en jetons, affichées en dollars américains.  dollars américains](./Image4.png)

### 5. Les actions sont aussi courtes que possible {#actions-are-as-short-as-possible}

Accélérez les interactions de l'utilisateur en regroupant les sous-actions.
Cela peut être fait au niveau du contrat intelligent ainsi que de l'interface utilisateur. L'utilisateur ne devrait pas avoir à passer d'une partie du système à une autre – ou à quitter complètement le système – pour accomplir une action courante.

\*_Conseils :_

- Combinez "Approuver" avec d'autres actions lorsque c'est possible
- Regroupez les étapes de signature aussi près que possible les unes des autres

**Exemple :** Combiner « ajouter de la liquidité » et « mettre en jeu » est un exemple simple d'accélérateur qui permet à l'utilisateur de gagner du temps et de réduire les frais de gaz.

![Modal montrant un interrupteur permettant de combiner les actions de dépôt et de mise en jeu](./Image5.png)

### 6. Les connexions réseau sont visibles et flexibles {#network-connections-are-visible-and-flexible}

Informez l'utilisateur du réseau auquel il est connecté et fournissez des raccourcis clairs pour changer de réseau.
Cela est particulièrement important sur les applications multichaînes. Les principales fonctions de l'application devraient rester visibles, même en cas de déconnexion ou de connexion à un réseau non pris en charge.

\*_Conseils :_

- Montrez autant que possible l'application pendant la déconnexion
- Indiquez le réseau auquel l'utilisateur est actuellement connecté
- Ne forcez pas l'utilisateur à aller dans le portefeuille pour changer de réseau
- Si l'application nécessite que l'utilisateur change de réseau, invitez-le à le faire à partir de l'appel à l'action principal
- Si l'application contient des marchés ou des coffres pour plusieurs réseaux, indiquez clairement quel ensemble l'utilisateur est en train de consulter

**Exemple :** Indiquez à l'utilisateur à quel réseau il est connecté et permettez-lui de le changer, directement depuis la barre d'application.

![Bouton déroulant affichant le réseau connecté](./Image6.png)

### 7. Contrôle depuis l'application, pas depuis le portefeuille {#control-from-the-app-not-the-wallet}

L'interface utilisateur doit fournir à l'utilisateur toutes les informations dont il a besoin et lui donner le contrôle sur toutes les actions qu'il doit effectuer.
Dans le Web3, certaines actions se font dans l'interface utilisateur, et d'autres dans le portefeuille. En général, vous initiez une action dans l'interface utilisateur, puis vous la confirmez dans le portefeuille. Les utilisateurs peuvent se sentir mal à l'aise si ces deux volets ne sont pas intégrés avec soin.

\*_Conseils :_

- Communiquez l'état du système via des retours d'information dans l'interface utilisateur
- Conservez un historique de leurs actions
- Fournissez des liens vers les explorateurs de blocs pour les anciennes transactions
- Offrez des raccourcis pour changer de réseau.

**Exemple :** Un conteneur subtil montre à l'utilisateur les jetons pertinents qu'il possède dans son portefeuille, et l'appel à l'action principal offre un raccourci pour changer de réseau.

![L'appel à l'action principal invite l'utilisateur à changer de réseau](./Image7.png)
