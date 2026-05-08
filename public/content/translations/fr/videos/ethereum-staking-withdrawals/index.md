---
title: "Comment fonctionnent les retraits sur Ethereum ?"
description: "Comment fonctionnent les retraits de staking sur Ethereum après la mise à jour Shanghai/Capella, couvrant le processus technique, la file d'attente des retraits et ce que les stakers doivent savoir pour accéder à leurs ETH stakés."
lang: fr
youtubeId: "RwwU3P9n3uo"
uploadDate: 2023-03-30
duration: "0:11:39"
educationLevel: intermediate
topic:
  - "how-ethereum-works"
  - "staking"
  - "withdrawals"
format: explainer
author: Finematics
breadcrumb: "Retraits de staking"
---

Une explication par **Finematics** couvrant le fonctionnement des retraits de staking sur Ethereum après la mise à jour Shanghai/Capella, y compris la mécanique des retraits partiels et complets, les idées fausses courantes et les implications pour l'écosystème du staking.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=RwwU3P9n3uo) publiée par Finematics. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### La chaîne balise (0:31) {#the-beacon-chain-031}

Avec l'approche rapide de la mise à jour Shanghai/Capella, il y a beaucoup de discussions concernant les retraits de staking sur Ethereum et ce que cela signifie pour l'écosystème Ethereum dans son ensemble.

Commençons par comprendre comment nous en sommes arrivés là et pourquoi les retraits de staking n'ont pas été activés lorsqu'Ethereum est passé de la preuve de travail (PoW) à la preuve d'enjeu (PoS).

La transition vers la preuve d'enjeu s'est déroulée en plusieurs étapes afin de minimiser le nombre de changements majeurs se produisant simultanément. Cette approche était essentielle, en particulier pour un réseau établi réglant des milliers de milliards de dollars de valeur par an. Les étapes les plus significatives ont été : le lancement de la chaîne balise et La Fusion.

Le lancement de la chaîne balise en 2020 a jeté les bases de la transition en créant une couche de consensus à preuve d'enjeu distincte, fonctionnant parallèlement à la chaîne à preuve de travail d'Ethereum. Le lancement anticipé de la chaîne balise a permis d'accumuler suffisamment d'ETH pour sécuriser le réseau avant de régler des transactions de valeur réelle. Cela a également permis de tester le nouveau modèle de consensus à preuve d'enjeu sur une période prolongée avec de vrais fonds mis en jeu.

Les premiers participants du réseau ont engagé des millions d'ETH pour sécuriser le réseau à preuve d'enjeu d'Ethereum, bien qu'ils sachent qu'ils ne pourraient pas retirer leurs ETH avant bien plus tard.

La grande étape suivante, La Fusion, a uni la couche de consensus à preuve d'enjeu à la couche d'exécution. Cela a permis d'abandonner définitivement la preuve de travail et de ne conserver qu'une seule chaîne canonique — Ethereum — désormais sécurisée par des millions d'ETH stakés. La Fusion a été de loin le changement le plus important jamais apporté à Ethereum. En raison de la nature de la mise à jour, elle devait se dérouler sans aucune interruption de service.

Pour minimiser les risques, la portée de La Fusion a été réduite, et aucune autre fonctionnalité — en dehors du passage de la preuve de travail à la preuve d'enjeu — n'a été incluse dans la mise à jour. La plus grande « coupe » qui a dû être faite a impacté les retraits, qui sont devenus le point central de la prochaine mise à jour Shanghai/Capella.

#### Retraits (2:09) {#withdrawals-209}

Les retraits de staking, comme leur nom l'indique, permettront aux stakers de retirer leurs ETH verrouillés. Il existe deux types de retraits : « partiels » et « complets ».

Un **retrait partiel** se produit lorsque le validateur retire ses récompenses accumulées — le solde supplémentaire au-delà du solde effectif maximum de 32 ETH. Un retrait partiel peut également être appelé « paiement de récompense » ou « paiement de solde excédentaire ».

Un **retrait complet** se produit lorsque le validateur a terminé le processus de sortie et que la totalité du solde est retirée. Cela ne se produit que lorsque le validateur quitte le système, soit volontairement, soit en étant retiré de force lors d'un processus appelé « réduction ».

Une fois activés, les retraits de staking seront automatiquement distribués tous les quelques jours. De plus, le processus de retrait est initié sur la couche de consensus, de sorte qu'aucun frais de transaction n'est requis à aucune des étapes.

Afin de commencer à retirer ses récompenses de staking, un validateur devra fournir son adresse de retrait une seule fois. Étant donné que les retraits affectent à la fois la couche de consensus et la couche d'exécution d'Ethereum, les deux parties du réseau doivent être mises à jour. « Shanghai » est le nom de la mise à jour de la couche d'exécution contenant les retraits, qui sont spécifiés dans l'EIP-4895. « Capella » est le nom de la mise à jour correspondante de la couche de consensus, activée en même temps. Ces deux mises à jour sont parfois également appelées « Shapella ».

#### Mécanique (3:40) {#mechanics-340}

Dans l'écosystème Ethereum, chaque validateur possède un numéro d'indice correspondant. De plus, ils disposent également de deux types d'identifiants de retrait, définis comme `0x00` ou `0x01`.

`0x00` indique qu'un validateur particulier n'a pas d'adresse de retrait associée. Ces identifiants sont dérivés comme le hash de la clé publique BLS avec son premier octet remplacé par un octet zéro — d'où le nom.

`0x01` signifie qu'un validateur a fourni son adresse de retrait. Ces identifiants de retrait sont représentés par `0x01` suivi de 11 octets de zéros, puis d'une adresse Ethereum choisie.

Afin d'activer les retraits, les validateurs avec des identifiants `0x00` devront signer un message « BLSToExecutionChange ». Cela sera possible après la mise à jour Capella.

Une fois les retraits activés, un validateur proposant un bloc parcourra linéairement les indices des validateurs pour trouver les 16 premiers validateurs avec des identifiants `0x01` qui soit :

- Ont un solde qui dépasse 32 ETH (récompenses de validateur accumulées)
- Sont « retirables » (ont complètement effectué leur sortie de l'ensemble des validateurs)

La recherche linéaire s'arrête après avoir trouvé 16 validateurs correspondant à ces critères ou après 16 384 itérations. L'algorithme mémorise l'indice auquel la recherche s'est arrêtée, de sorte que le prochain validateur proposant un bloc puisse reprendre à partir de cet indice. Après avoir atteint le dernier indice, l'algorithme recommence depuis le début — l'indice 0.

Une bonne analogie serait une horloge analogique où l'aiguille pointe vers l'heure, progresse dans une direction, ne saute aucune heure et finit par revenir au début une fois le dernier chiffre atteint.

Une fois le parcours terminé, le validateur crée une liste de retraits à inclure dans sa charge utile d'exécution. Chaque élément de la liste contient :

- **WithdrawalIndex** — un indice augmentant de façon monotone, commençant à 0, qui s'incrémente de 1 par retrait pour identifier de manière unique chaque retrait
- **ValidatorIndex** — l'indice du validateur dont le solde est retiré
- **ExecutionAddress** — l'adresse ETH sur la couche d'exécution où le retrait doit être envoyé
- **Amount** — le montant, en gwei, à envoyer à l'adresse d'exécution

Lors de la construction ou du traitement d'un bloc, les clients de la couche d'exécution appliquent ces retraits à la fin d'un bloc. Le traitement des retraits n'entre pas en concurrence avec les transactions des utilisateurs pour l'espace du bloc. Avec un maximum de 16 retraits traités par bloc, il devrait y avoir un maximum de 115 200 retraits traités par jour, en supposant qu'aucun créneau (slot) ne soit manqué.

La conception des retraits est simple mais extrêmement robuste.

#### Idées fausses (6:30) {#misconceptions-630}

La première idée fausse affirme que lors du traitement des retraits, il y a une différence entre un retrait « complet » et un retrait « partiel » en termes de priorité ou d'ordre. Les retraits complets et partiels se produisent tous deux lorsque le parcours linéaire de l'ensemble des validateurs atteint l'indice d'un validateur. La seule différence est que dans le cas des retraits complets, un validateur doit quitter la file d'attente de sortie et atteindre l'« époque retirable » avant que le parcours linéaire ne puisse le sélectionner.

Une autre idée fausse est que les utilisateurs perdront leurs récompenses s'ils ne fournissent pas d'adresse de retrait. Ce n'est pas vrai — au cas où un validateur oublierait de fournir une adresse de retrait, ses récompenses en ETH ne seront pas envoyées dans le vide une fois les retraits activés. Au lieu de cela, le parcours ignorera les validateurs qui n'ont pas fourni leurs adresses de retrait.

Il est important de se rappeler que l'adresse de retrait ne peut pas être modifiée et n'est définie qu'une seule fois. Les stakers doivent être extrêmement prudents lors de la configuration de l'adresse de retrait, en s'assurant qu'ils ont la pleine propriété de l'adresse fournie.

Il y a également des spéculations selon lesquelles les stakers retireront beaucoup d'ETH de l'écosystème Ethereum une fois les retraits activés, la version la plus forte de cet argument supposant que cela déstabilisera le mécanisme de consensus à preuve d'enjeu. Bien que nous ne puissions pas prédire avec certitude la quantité d'ETH qui sera retirée au fil du temps, il existe quelques contre-arguments importants :

Premièrement, la plupart des stakers sont des adoptants précoces d'Ethereum qui ont été assez courageux pour staker alors qu'il était encore incertain de savoir quand les retraits seraient activés. De nombreux stakers ont exprimé leur désir de continuer le staking pour soutenir le réseau et continuer à gagner des récompenses libellées en ETH.

Deuxièmement, pour s'assurer que le mécanisme de consensus à preuve d'enjeu et l'ensemble actif de validateurs restent stables, Ethereum a mis en place une file d'attente de retrait pour tous les validateurs souhaitant effectuer une sortie. Cette file d'attente limite le nombre de validateurs pouvant quitter l'écosystème simultanément.

Le premier parcours de retrait retirera beaucoup de récompenses accumulées — essentiellement depuis la création de la chaîne balise. Cependant, les suivants traiteront une quantité d'ETH beaucoup plus faible.

#### Implications (8:39) {#implications-839}

L'activation des retraits créera un flux de staking ouvert et bilatéral. Actuellement, le flux de staking est unilatéral — l'ETH ne peut qu'entrer dans le réseau et ne jamais en sortir. Fait intéressant, l'activation des retraits pourrait inciter encore plus de personnes à staker, car elles sauront qu'elles pourront toujours retirer leurs ETH si elles en ont besoin pour autre chose.

Les stakers qui ne gèrent pas leurs propres validateurs et qui stakent avec un fournisseur de staking centralisé pourront changer de fournisseur pour un autre. Ils pourront retirer des fonds d'un fournisseur offrant un taux de staking inférieur vers un autre offrant un meilleur taux, passer d'un fournisseur centralisé à un fournisseur décentralisé, ou même gérer leur propre validateur.

Les retraits auront également un impact sur les dérivés de staking liquide tels que Lido, Rocket Pool et d'autres. Les jetons de staking liquide (LST) comme le stETH ou le rETH ont eu pour habitude de perdre temporairement leur ancrage au prix de l'ETH lors de turbulences sur le marché. Cependant, avec le flux de staking bilatéral, tout écart significatif dans leur ancrage serait rapidement éliminé par arbitrage.

Les premiers adoptants du staking liquide et du staking centralisé ont capturé une grande majorité du marché car ils n'avaient pas beaucoup de concurrence. Cependant, la part de marché de ces acteurs historiques pourrait connaître un changement majeur une fois les retraits activés, surtout s'ils n'offrent pas un taux compétitif. La possibilité de passer librement d'un fournisseur de staking à un autre profitera au marché du staking d'ETH.

#### Résumé (10:01) {#summary-1001}

L'activation des retraits de staking est l'une des mises à jour les plus attendues d'Ethereum. Il sera extrêmement important de s'assurer que ce changement s'exécute en douceur. Afin d'aider aux tests, les validateurs auront plusieurs devnets et testnets à disposition pour exécuter le processus et résoudre tout problème potentiel avant le lancement sur le Réseau principal.

Les retraits sont une autre amélioration qui rapproche Ethereum un peu plus de la construction d'un avenir durable, sécurisé et décentralisé. La mise à jour Shapella devrait avoir lieu au cours du premier semestre 2023.

Au moment de cette vidéo, la chaîne balise a accumulé plus de 17 millions d'ETH répartis sur plus de 530 000 validateurs. Le solde moyen d'un validateur est juste au-dessus de 34 ETH, ce qui signifie plus d'un million d'ETH en récompenses accumulées. Il sera intéressant de voir comment les retraits affecteront ces chiffres.