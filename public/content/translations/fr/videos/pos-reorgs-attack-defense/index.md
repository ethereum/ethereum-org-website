---
title: "Le jeu des réorgs dans l'Ethereum en preuve d'enjeu"
description: "Caspar Schwarz-Schilling présente des recherches sur les attaques par réorganisation de blocs dans l'Ethereum en preuve d'enjeu, couvrant les vecteurs d'attaque, les mécanismes de défense et les mesures d'atténuation en place au niveau du protocole."
lang: fr
youtubeId: "xcPxwhrg3Ao"
uploadDate: 2022-11-29
duration: "0:18:41"
educationLevel: advanced
topic:
  - "consensus"
  - "pos"
  - "sécurité"
format: presentation
author: LisCon
breadcrumb: "Réorgs PoS"
---

Cette présentation explore les types de réorganisations de blocs possibles dans l'Ethereum en preuve d'enjeu (PoS) et les mesures d'atténuation conçues pour les prévenir. Caspar Schwarz-Schilling, chercheur au sein du Robust Incentives Group de la Fondation Ethereum, détaille la mécanique des réorgs ex-post et ex-ante, en comparant le paysage de la sécurité entre la preuve de travail (PoW) et la preuve d'enjeu.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=xcPxwhrg3Ao) publiée par LisCon. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Introduction et contexte (0:03) {#introduction-and-background-003}

Bienvenue. Aujourd'hui, je vais vous parler des réorgs qui sont possibles dans l'Ethereum en preuve d'enjeu.

J'ai récemment rejoint la Fondation Ethereum, plus particulièrement le Robust Incentives Group. En gros, nous sommes une équipe de recherche qui se concentre sur tout ce qui touche aux incitations. Je vais faire court — cette présentation est dense et vous pouvez trouver la majeure partie de notre travail sur GitHub.

#### Deux types de réorgs (0:44) {#two-types-of-reorgs-044}

Aujourd'hui, je veux parler des réorgs, et en particulier je souhaite esquisser deux types différents de réorgs qui sont possibles dans le domaine de l'Ethereum en preuve d'enjeu.

D'une part, nous avons les **réorgs ex-post** et d'autre part les **réorgs ex-ante**. Pardonnez-moi cette appellation latine un peu prétentieuse, mais elle fait l'affaire.

Les réorgs ex-post correspondent à peu près à ce à quoi nous pensons habituellement lorsque nous parlons de réorgs. L'adversaire voit un bloc — s'il a de la valeur, il peut vouloir essayer de l'écarter par une réorg. Donc, sur le schéma ici, nous voyons que le bloc N+1 est le bloc que l'attaquant veut écarter par une réorg, et en construisant sur le même bloc parent N, si cela fonctionne, le bloc N+3 est ensuite construit sur le bloc N+2. C'est la procédure habituelle.

Les réorgs ex-ante sont légèrement différentes. L'idée est que l'attaquant doit commencer l'attaque avant même de savoir quel bloc il va écarter par une réorg. Comment cela fonctionne-t-il en gros ? À un niveau très global, le bloc N+1 est construit par-dessus N mais n'est pas immédiatement publié. Les nœuds honnêtes ne savent même pas que N+1 existe et continueront donc à construire sur N. Ensuite, par un mécanisme quelconque, N+1 est publié et N+3 peut voir que N+1 est en tête et construire par-dessus, de sorte que N+2 est en fait écarté par la réorg.

Vous vous demandez peut-être pourquoi on voudrait faire ce genre de réorg. Eh bien, il y a toujours de la MEV à capturer. Si vous avez de la chance, le bloc N+2 contient beaucoup de MEV — vous pouvez la capturer en copiant-collant simplement le contenu de ce bloc. Dans le pire des cas, vous avez essentiellement l'équivalent de deux créneaux de transactions à écouter.

#### Les réorgs ex-post dans la preuve de travail (2:49) {#ex-post-reorgs-in-proof-of-work-249}

Avant de plonger dans les réorgs ex-ante, qui sont le sujet principal de cette présentation, permettez-moi de récapituler brièvement les réorgs ex-post et de commencer en particulier par le contexte de la preuve de travail.

En gros, c'est un résumé de l'article de blog rédigé par les suspects habituels — Georgios et Vitalik. Allez le lire, il est génial.

En résumé, dans l'Ethereum en preuve de travail, les réorgs ex-post sont difficiles mais pas irréalisables. Un mineur possédant 10 % de la puissance de hachage a de relativement bonnes chances de miner quelques blocs d'affilée, et si l'incitation est suffisamment élevée — imaginez qu'il y ait un bloc avec 100 ETH de MEV à capturer — alors un taux de réussite de un pour cent peut en fait suffire pour que cela vaille la peine d'essayer de réorganiser.

#### Les réorgs ex-post dans la preuve d'enjeu (3:39) {#ex-post-reorgs-in-proof-of-stake-339}

Dans la preuve d'enjeu, c'est une toute autre histoire. Nous parlons d'une quantité absurde de mise requise. Je vais vous expliquer comment on pourrait s'y prendre, juste pour souligner à quel point c'est ridiculement difficile.

Peut-être quelques bases d'abord. Le temps dans l'Ethereum en preuve d'enjeu progresse par créneaux. Chaque créneau dure 12 secondes. Dans chaque créneau, il y a deux rôles : vous avez un proposant — exactement un proposant — et un comité de milliers d'attestateurs qui sont censés attester des blocs qu'ils entendent sur la couche P2P. Ils déterminent la tête de la chaîne en exécutant le choix de fork, qui est essentiellement une fonction prenant l'arbre des blocs en entrée et vous donnant la tête de la chaîne.

Vous êtes censé attester des blocs si vous entendez un bloc valide, ou quatre secondes après le début d'un créneau — selon ce qui se produit en premier. Donc, si pour une raison quelconque le proposant du bloc N+1 est hors ligne et qu'il n'y a pas de bloc quatre secondes après le début du créneau, vous attestez du bloc N. Si vous l'entendez à temps, vous attestez du bloc N+1. C'est simple.

Toutes ces attestations donnent du poids aux blocs, et ce poids est utilisé par le choix de fork pour déterminer quelle est la dernière tête.

Maintenant, passons en revue une réorg d'un bloc. Au début, tout se passe comme d'habitude — tout le monde atteste du bloc N, même l'attaquant. Ensuite, N+1 est construit par-dessus N, et comme l'attaquant ne veut pas donner de poids au bloc qu'il essaie d'écarter par une réorg, il atteste plutôt du bloc N. Le bloc N gagne beaucoup de poids car l'attaquant possède les deux tiers du comité — ce qui signifie qu'il doit contrôler grosso modo les deux tiers de la mise totale.

Un tiers des personnes honnêtes a attesté de N+1, deux tiers de N. Vient ensuite le bloc N+2 — évidemment, l'attaquant le construit sur N, et atteste de son propre bloc. Du point de vue des validateurs honnêtes, N+1 est toujours en tête en termes de poids car N+1 et N+2 héritent tous deux du poids total du bloc N, mais N+1 possède également ce tiers d'attestations qui manque à N+2.

Si nous faisons le compte — le bloc N+1 a des attestations valant un tiers plus un tiers, ce qui donne deux tiers, et le bloc N+2 a également deux tiers. Pour faire simple, supposons que le départage se fasse en faveur de l'attaquant. Alors N+3 verra N+2 comme étant en tête et construira par-dessus.

Pour vous donner une idée du ridicule de ces hypothèses — même si vous étiez un staker à 65 %, pour contrôler les deux tiers du comité dans un créneau donné, vous avez une probabilité de 0,05 %. Cela montre bien que la puissance des attestations parallèles est réelle — les réorgs ex-post sont incroyablement difficiles, voire virtuellement impossibles, dans l'Ethereum en preuve d'enjeu.

#### Mécanique de l'attaque par réorg ex-ante (7:34) {#ex-ante-reorg-attack-mechanics-734}

Maintenant, je vais parler des réorgs ex-ante. Cette attaque est basée sur un article de Neuder et d'autres. Nous avons récemment amélioré cette attaque de manière significative. Nous avons également rédigé un article à ce sujet et réussi à le télécharger sur arXiv juste à temps.

Je précise d'emblée — ne vous inquiétez pas, il y a des mesures d'atténuation. Elles seront fusionnées avant La Fusion.

Comment fonctionne une attaque par réorg ex-ante ? Initialement, le bloc N — comme d'habitude, tout le monde en atteste. Maintenant, vous êtes le proposant de N+1. Vous le proposez et en attestez en privé avec un seul validateur. Fait important, vous le gardez privé — vous ne le publiez pas et vous ne le propagez pas sur la couche P2P.

Ce qui se passe, c'est que les personnes honnêtes ne voient pas le bloc N+1, elles vont donc attester du bloc N. C'est là l'astuce — vous héritez de ce poids et vous n'avez pas à le combattre réellement.

Supposons une latence nulle pour le moment. Dans le créneau N+2, ce que nous faisons en tant qu'attaquant, c'est publier le bloc N+1 et l'attestation privée en même temps. Les validateurs honnêtes dans le créneau N+2 doivent attester d'un bloc. De leur point de vue, ils voient le bloc N+2 et le bloc N+1 avec cette unique attestation privée. S'ils exécutent le choix de fork, ils trouveront que le bloc N+1 a plus de poids que le bloc N+2, car N+1 a l'attestation privée que N+2 n'a pas. Même tous les validateurs honnêtes attesteront en fait du bloc N+1. Dans N+3, de manière triviale, N+1 sera considéré comme la tête de la chaîne.

#### La latence du réseau et l'attaque (10:25) {#network-latency-and-the-attack-1025}

J'ai supposé une latence nulle, ce qui n'est évidemment pas la façon dont cela fonctionne. Il y a de la latence — il faut du temps pour propager les blocs et les messages sur la couche P2P.

La façon dont un attaquant peut tout de même réussir ce genre d'attaque est d'avoir beaucoup de nœuds à différents endroits sur la topologie P2P. Lorsque le proposant honnête dans le créneau N+2 propose ce bloc, vous en entendez parler très tôt dans le processus de propagation. Par conséquent, vous pouvez publier votre bloc privé à partir de tous ces différents endroits de sorte qu'une majorité entendra parler du bloc N+1 avant d'entendre parler du bloc N+2 — ce qui signifie qu'ils verront que le bloc N+1 est en tête en termes de poids et en attesteront réellement.

Pour souligner à nouveau ce qui se passe ici : nous avons un proposant avec un seul attestateur qui parvient à réaliser une réorg d'un bloc. Ce n'est pas idéal, c'est le moins qu'on puisse dire.

#### Stratégies d'équilibrage pour des réorgs plus longues (11:42) {#balancing-strategies-for-longer-reorgs-1142}

Si vous voulez faire les choses en grand, vous pouvez réaliser des réorgs plus longues en utilisant une stratégie d'équilibrage. L'idée est de diviser le comité honnête en différentes vues de la chaîne.

Vous publiez votre bloc privé de telle manière qu'environ la moitié des nœuds honnêtes entendent parler de votre bloc privé et de votre attestation avant d'entendre parler du bloc N+2 — ils attestent donc de votre bloc. Pour l'autre moitié, vous voulez qu'ils n'entendent pas votre bloc avant d'attester de N+2.

Maintenant, vous avez la moitié du comité honnête qui atteste de N+1 et l'autre moitié qui atteste de N+2. En quoi cela aide-t-il ? Le comité honnête s'annule maintenant mutuellement, et vous, en tant qu'attaquant, n'avez même pas à les combattre — ce qui est essentiellement le rêve de tout attaquant devenu réalité.

En parcourant le schéma : le bloc N comme d'habitude, le bloc N+1 — même histoire, vous ne le publiez pas. Les validateurs honnêtes attestent du bloc N. Le bloc N+2 arrive, vous en entendez parler tôt, et vous publiez le bloc N+1 avec une attestation — le « vote décisif » — de telle manière que la moitié du comité honnête le voit avant et l'autre moitié après. La moitié vote pour N+1, l'autre moitié pour N+2. En fait, vous voulez une division inégale à un près de sorte que N+2 ait une attestation de plus, ainsi N+3 se construit sur N+2 et maintient la réorg en cours.

Pour mettre fin à une réorg de deux blocs : le bloc N+3 est proposé, vous l'entendez tôt, vous publiez le bloc N+1 et vos deux attestations restantes, inondant la couche P2P pour qu'une majorité des personnes honnêtes vote pour le bloc N+1 — de sorte qu'il ait plus de poids que le bloc N+3 et que N+4 soit construit par-dessus N+1.

Si vous y réfléchissez, il est relativement peu coûteux de faire ces réorgs sous ces hypothèses. Même si vous n'avez pas de divisions parfaites, parce que la couche P2P est si grande, vous avez une distribution de probabilité que vous pouvez cibler de sorte que le coût de l'attaque croît selon la racine carrée de la taille du comité.

#### Atténuation par le boost du proposeur (15:17) {#proposer-boost-mitigation-1517}

Parlons de l'atténuation. Quelle est l'idée de base ? Nous allons donner un peu plus de pouvoir au proposant. Si un bloc valide arrive à temps, augmentons le poids de ce bloc pour la durée du créneau. Une fois ce créneau terminé, nous reprenons le score LMD-GHOST habituel et tout redevient normal.

Donc, si le bloc N+2 est proposé à temps et qu'il est valide, ce bloc bénéficiera d'un boost — disons 80 % de la taille du comité. Maintenant, cette mignonne petite attestation N+1 de l'attaquant ne fera pas l'affaire. Aucune chance.

Les histoires d'équilibrage ne fonctionnent plus non plus car vous avez une division 50/50 mais le boost fait toujours pencher la balance dans une direction. Il n'y a aucun moyen de maintenir cette division 50/50.

L'idée est qu'avec cette atténuation en place, les attestations de l'adversaire doivent rivaliser avec le boost pour convaincre les validateurs honnêtes de voter selon leurs souhaits. Cela brise les stratégies d'équilibrage et interdit fondamentalement toutes les réorgs. Bonne nouvelle — il y a une PR ouverte, donc en gros, elle sera fusionnée avant La Fusion.

#### Points clés à retenir (16:48) {#key-takeaways-1648}

Quelques points clés à retenir. J'ai parlé des différences entre les réorgs ex-post et ex-ante. J'ai brièvement esquissé les différents paysages pour les réorgs dans la preuve de travail par rapport à la preuve d'enjeu. Je vous ai montré comment réaliser une réorg ex-ante mais aussi, et c'est important, comment y remédier.

Si cela vous intéresse, il y a un article — beaucoup plus détaillé, plus nuancé. Les diapositives seront mises en ligne. Venez me parler si vous êtes intéressé, et vous pouvez également me trouver sur Twitter.

J'espère que cela vous a intéressé. Merci beaucoup.