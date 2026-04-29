---
title: "L'évolution d'Ethereum : Fusaka, Glamsterdam et au-delà"
description: "Preston Van Loon parle des prochaines mises à jour du protocole Ethereum, couvrant les étapes de la feuille de route Fusaka et Glamsterdam ainsi que l'évolution à long terme du protocole."
lang: fr
youtubeId: "GgKveVMLnoo"
uploadDate: 2025-03-01
duration: "0:21:34"
educationLevel: intermediate
topic:
  - "roadmap-and-priorities"
  - "roadmap"
  - "upgrades"
format: presentation
author: ETHDenver
breadcrumb: "Évolution d'Ethereum"
---

Une présentation de **Preston Van Loon** d'Offchain Labs et Prysm, donnée à l'ETHDenver. Preston aborde la vitesse récente des mises à jour d'Ethereum et ce qui attend le réseau, notamment Pectra, Fusaka, PeerDAS, Glamsterdam, FOCIL, des temps de créneau plus courts et une finalité plus rapide.

*Cette transcription est une copie accessible de la [transcription vidéo originale](https://www.youtube.com/watch?v=GgKveVMLnoo) publiée par l'ETHDenver. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Introduction (0:07) {#introduction-007}

**Animateur :** Très bien, tout le monde. Continuons. Nous allons parler de l'évolution d'Ethereum avec Preston Van Loon. À vous.

**Preston Van Loon :** Très bien. Merci. GM — vous savez que c'est GM à tout moment, de jour comme de nuit, que ce soit le matin ou non. Donc je vois des GM toute la journée et toute la nuit. Je veux parler de l'évolution d'Ethereum, alors commençons.

Il y a un discours que vous avez probablement déjà entendu : Ethereum est trop lent à déployer ses mises à jour. Je sais que vous l'avez entendu. Je l'ai entendu. Vous l'avez entendu de nombreuses fois. Les gens disaient : « À quand The Merge ? Les développeurs ne peuvent-ils pas faire quelque chose ? D'autres chaînes avancent vite. Pourquoi Ethereum avance-t-il si lentement ? » Je suis ici pour vous dire que ce discours est révolu.

Je travaille sur le client de consensus Prysm. C'est l'un des composants clés de la chaîne balise d'Ethereum. Et j'étais sur le front pour les mises à jour les plus récentes — pour Pectra, Fusaka. D'après ce que j'ai vu de l'intérieur, ce n'était pas la bureaucratie lente que les gens ont reprochée à Ethereum pendant de nombreuses années. C'était en fait une machine à grande vitesse et bien exécutée, livrant certaines des plus grandes mises à jour que nous ayons jamais vues dans l'histoire d'Ethereum.

#### Déploiement de trois mises à jour en un an (1:18) {#shipping-three-upgrades-in-one-year-118}

Ce que nous avons déployé en 2025, ce sont trois mises à jour majeures en un an. Tout d'abord, Pectra en mai 2025. Cela a introduit l'abstraction de compte native, une augmentation du solde effectif maximum du validateur permettant des consolidations, et dix autres EIP. En mai, c'était la plus grande mise à jour en termes d'EIP qu'Ethereum ait jamais connue.

Mais à peine sept mois plus tard, nous avons déployé Fusaka — une mise à jour encore plus importante en termes d'EIP. Celle-ci en comptait treize, avec une innovation appelée PeerDAS, ce qui est vraiment passionnant. Mais à peine six jours plus tard, nous avons de nouveau mis à jour avec un fork BPO1, et BPO2 a suivi peu de temps après, augmentant la capacité de blob d'Ethereum.

C'est une preuve de la capacité d'Ethereum à livrer. Il s'agit d'une collaboration entre cinq ou six clients de consensus, cinq clients d'exécution, de nombreux chercheurs — plus d'une centaine de personnes impliquées dans le développement principal d'Ethereum — et ils déploient tous en coordination en même temps.

#### Mise à l'échelle avec PeerDAS (2:22) {#peerdas-scaling-222}

Jetons un coup d'œil à la tête d'affiche de Fusaka : PeerDAS. PeerDAS est une solution de mise à l'échelle vraiment géniale. Avant PeerDAS, nous avions Pectra, et avec Pectra, vous deviez — en tant qu'opérateur de nœud ou validateur — télécharger chaque blob qui accompagnait un bloc. Cela ciblait six blobs par bloc. Tout le monde devait le télécharger, et c'est vraiment un goulot d'étranglement pour la mise à l'échelle. Si vous voulez augmenter cela, vous demandez aux opérateurs de nœuds d'augmenter proportionnellement leur utilisation de bande passante pour les blobs.

Maintenant avec Fusaka, nous avons des blobs qui sont codés par effacement et nous demandons aux validateurs de n'en conserver qu'une partie. Vous n'avez besoin de conserver qu'un huitième des blobs. Et avec n'importe quel 50 % des blobs, vous pouvez reconstruire l'ensemble. Ainsi, avec cette répartition sur le réseau, cela garantit que les données sont disponibles et qu'il y a moins de charge pour les stakers individuels. Cela nous donne une réduction immédiate de près de 90 % de la bande passante du réseau pour l'utilisation des blobs.

En regardant les chiffres : pour Pectra, nous avions un objectif de six et un maximum de neuf blobs avec une limite de gaz de 36 millions. Nous considérons cela comme la base de référence pour l'utilisation des blobs — c'était 768 kilo-octets par bloc. Ensuite, entre Pectra et Fusaka, nous avons eu une mise à jour hors bande où la limite de gaz a été augmentée. Il s'agissait d'un processus de gouvernance onchain où les validateurs ont simplement voté sur ce qu'ils pensaient que la limite de bloc devrait être — elle est passée de 36 à 45 millions. Et puis plus tard dans l'année, nous sommes arrivés à Fusaka, qui n'a pas changé l'objectif ou le maximum de blobs mais a de nouveau augmenté la limite de gaz.

Et puis nous avons obtenu cette importante diminution de la bande passante où chaque bloc avec un objectif de six blobs ne représente plus que 96 kilo-octets de données de blob qu'un validateur devait stocker. Ensuite, avec BPO1, le fork uniquement pour les paramètres de blob, nous avons augmenté l'objectif à 10 et le maximum à 15. BPO2, qui a eu lieu juste un mois plus tard, est passé à 14 et 21 — ce qui est le double de ce que nous avions dans Pectra, mais toujours 71 % d'utilisation de bande passante en moins sur les blobs pour les stakers individuels.

#### Ce qui arrive dans Glamsterdam (4:30) {#whats-coming-in-glamsterdam-430}

Que nous réserve la suite avec Glamsterdam ? Il y a trois éléments vraiment clés et un qui fait toujours l'objet de recherches actives.

Le premier est l'ePBS — la séparation proposant-constructeur (PBS) intégrée. La façon dont la production de blocs est effectuée aujourd'hui, beaucoup de gens sous-traitent leur opportunité de construire un bloc via MEV-Boost à des constructeurs très sophistiqués. C'est la majorité du réseau. Le problème est que vous devez faire confiance à un relais, et il faut beaucoup de confiance pour que le constructeur propose réellement le bloc sur lequel il a enchéri. L'ePBS introduit un mécanisme intégré au protocole afin qu'il y ait beaucoup moins de confiance requise, et c'est une implémentation très propre de la même idée.

La chose suivante que nous avons, ce sont les listes d'accès au niveau du bloc. C'est une innovation intéressante où chaque bloc sera accompagné d'une liste indiquant où dans l'état il lisait ou écrivait des données. Ce que cela signifie, c'est que vous pouvez traiter les blocs en parallèle. Aujourd'hui, vous devez traiter les blocs de manière séquentielle. Si vous voulez traiter le bloc 10, vous devez d'abord traiter le 9 et le 8, et ainsi de suite. Maintenant, si vous avez une collection de blocs et qu'aucun d'entre eux n'est en conflit avec les informations d'accès à l'état, vous pouvez traiter les huit en parallèle. Peut-être avez-vous huit cœurs — cela rend Ethereum plus efficace et plus rapide pour traiter les blocs.

La troisième chose est la réévaluation du prix du gaz. Il y a eu des tests de performance via cette EIP qui ont montré que certains codes d'opération étaient surévalués, d'autres sous-évalués. Maintenant, nous allons mettre à jour les frais que vous payez pour chaque code d'opération afin de refléter la réalité, rendant Ethereum plus sécurisé et plus efficace.

#### L'évolution du rôle des L2 (6:14) {#the-evolving-role-of-l2s-614}

Il y a une chose dont je veux parler et que Vitalik a mentionnée récemment. Il a déclaré dans un tweet il y a quelques semaines que la vision originale des L2 et de leur rôle dans Ethereum n'avait plus de sens. Cela a fait les gros titres, et je pense que beaucoup de gens en ont tiré la mauvaise conclusion.

Laissez-moi vous dire ce que cela signifie du point de vue de quelqu'un de l'intérieur. Ethereum se met à l'échelle plus rapidement que prévu. Les frais sont plus bas que jamais. Je n'aurais jamais pensé payer des frais de gaz inférieurs à un gwei sur le Réseau principal, mais nous y sommes. Les blobs sont abondants — nous en avons plein. Nous mettons à l'échelle les blobs plus rapidement que prévu. Et même les frais des L2 sont vraiment bas.

Donc, l'idée que nous avons besoin de L2 à usage général — c'est-à-dire des L2 qui sont simplement la même EVM que nous avons sur la couche 1 (l1), qu'il suffit de copier-coller plusieurs fois et dont le seul but est d'aller plus vite — ce n'est plus la vision. Ces L2 prospéreront grâce à la spécialisation. Certains d'entre eux cibleront des éléments comme la confidentialité, les jeux, des spécificités de la finance décentralisée (DeFi) ou des extensions de l'EVM. Mais s'ils sont simplement une copie conforme de la couche 1 (l1), ils ne font pas partie de la feuille de route où nous avions initialement envisagé ce type de paradigme fragmenté via les L2.

#### FOCIL : résistance à la censure au niveau du protocole (7:25) {#focil-protocol-level-censorship-resistance-725}

Au-delà de Glamsterdam, il y a trois choses vraiment géniales en développement et en recherche actifs. La première est FOCIL — Fork-Choice Enforced Inclusion Lists (Listes d'inclusion appliquées par le choix de fork).

Le problème qu'il vise à résoudre est que les constructeurs de blocs ont le choix. Ils peuvent décider quelles transactions sont incluses dans le bloc. Ils peuvent en préférer certaines ou ne pas en préférer d'autres — peut-être pour un avantage MEV, peut-être en raison de pressions réglementaires. Mais dans tous les cas, ils sont capables de censurer les transactions comme ils le souhaitent, et personne ne peut rien y faire.

FOCIL modifie la dynamique de pouvoir. Au lieu de dire que les constructeurs de blocs peuvent choisir toutes les transactions dans un bloc, il y a un comité aléatoire qui sélectionne — sur la base de ses heuristiques locales — certaines transactions qu'il estime devoir être incluses dans le prochain bloc. Ce ne sont pas toutes les transactions du prochain bloc. Les constructeurs ont toujours beaucoup de liberté, mais il y a un sous-ensemble qu'ils doivent inclure. Le proposeur de bloc prendra cette courte liste — peut-être environ huit transactions — et la placera à la fin du bloc, et elles seront exécutées avec le bloc.

Cela est appliqué via le choix de fork. Les validateurs qui voient un bloc ne l'attesteront pas à moins qu'une liste d'inclusion n'y soit ajoutée à la fin. S'ils en voient un sans la liste, ils considéreront ce bloc comme invalide et l'ignoreront tout simplement — ils ne le propageront pas, ils ne voteront pas pour lui. Il s'agit toujours d'une recherche active avec certains paramètres encore en cours de décision, mais la direction est claire : Ethereum va inclure la résistance à la censure au niveau du protocole.

#### Temps de créneau plus courts (9:24) {#shorter-slot-times-924}

Le prochain point vraiment passionnant concerne les temps de créneau plus courts. Avec Hegata — le fork après Glamsterdam — nous examinons si nous pouvons inclure des temps de créneau plus courts ou des créneaux rapides. Cela ne veut pas dire que nous passons directement à des créneaux de six secondes ou même plus rapides, mais que nous construisons l'infrastructure pour rendre cela possible.

Cela semble vraiment simple — du genre, « allons juste plus vite ». Mais il faut penser à la propagation sur le réseau, aux tâches d'attestation des validateurs où ils ont un temps limité pour s'exécuter, et puis il y a l'aspect économique. Quand j'ai expérimenté cela pour la première fois, j'ai juste changé le 12 en 6 et soudainement tout le monde générait deux fois plus d'émission — deux fois plus d'argent — ce qui n'est pas vraiment l'intention derrière des temps de créneau plus courts. Il s'agit d'aller plus vite mais en gardant toutes choses égales par ailleurs. C'est donc une chose très complexe, mais il y a la possibilité d'y arriver progressivement à terme.

#### Finalité plus rapide (10:20) {#faster-finality-1020}

La troisième chose est une finalité plus rapide. C'est vraiment important car Ethereum finalise toutes les deux époques — toutes les 13 minutes — et il y a des applications qui dépendent vraiment de la question : ma transaction est-elle permanente ? Si la transaction n'a pas été dans une époque finalisée, alors la réponse est non — il y a une petite chance qu'elle puisse être réorganisée et que la transaction doive être soumise à nouveau.

Maintenant, si nous avons une finalité rapide, des choses comme les échanges, les ponts ou n'importe quelle application peuvent être assurés qu'une transaction est finale. Tout d'abord, au lieu de deux époques pour la finalité, faisons-le en une seule. Ensuite, nous pouvons dire qu'au lieu d'époques de 32 créneaux, raccourcissons-les à quatre créneaux. Maintenant, si vous associez cela à des temps de créneau de six secondes, vous parlez d'une finalité en moins de 30 secondes. C'est un objectif final vraiment génial.

#### L'étoile polaire (11:15) {#the-north-star-1115}

Tout cela est intégré dans l'étoile polaire, où nous disons que la couche 1 (l1) est rapide avec une finalisation en quelques secondes. Comment y parvenons-nous ? Tout d'abord, nous commençons par PeerDAS — qui est déjà déployé. Cela nous a donné une couche évolutive pour la disponibilité des données. Ensuite, nous avons Glamsterdam, incluant principalement l'ePBS, qui est une implémentation propre pour la séparation proposant-constructeur (PBS) et rend des choses comme FOCIL plus percutantes. FOCIL arrive avec la résistance à la censure, ce qui est très harmonieux avec l'ePBS. Avec des créneaux plus rapides, des temps de créneau plus courts rendent une finalité plus rapide encore plus percutante. Ensuite, nous arrivons à cet objectif final où nous avons vraiment des transactions rapides qui sont finalisées en quelques secondes.

#### Conclusion (12:02) {#closing-1202}

Je veux que vous imaginiez à quoi ressemblera la vie dans deux ans. C'est un peu difficile à concevoir car la crypto évolue si vite. Cela pourrait être une réalité dans seulement deux ans : des temps de confirmation de transaction de quatre ou six secondes ; une finalité mesurée en secondes, et non en minutes ; une application au niveau du protocole pour la résistance à la censure ; des protections contre la cryptographie post-quantique ; et des L2 en concurrence sur les fonctionnalités et les nouvelles innovations, pas seulement sur la vitesse. Tout cela en conservant la vertu de pouvoir utiliser un ordinateur portable ou du matériel grand public pour faire tourner un nœud complet à la maison. Ethereum est accessible et le restera pour tout le monde à l'avenir.

Ce que je veux que vous reteniez, c'est : le discours que je vous ai présenté au début — il n'y a vraiment aucune preuve pour le soutenir. Ethereum déploie rapidement. En seulement un an, il y a eu trois mises à jour. Et dans les 24 prochains mois, il y a encore plus de choses à venir, et elles arriveront encore plus vite.

Ce ne sont pas de simples calendriers fantaisistes sur cinq ans. Ce sont des choses réelles avec des propositions concrètes en cours de développement en ce moment même. Il y a des choses sur le devnet en ce moment. Il y a des gens qui travaillent en ce moment même sur ces implémentations. Si vous construisez sur Ethereum aujourd'hui, vous construisez sur la chaîne de blocs la plus activement développée au monde.

Je suis Preston Van Loon, développeur principal d'Ethereum. Je travaille dans l'équipe Prysm chez Offchain Labs. Si vous voulez vous impliquer, la meilleure façon de rester au courant de ce qui se passe sur Ethereum est d'aider à le construire vous-même. Venez me parler après. Venez jeter un œil au dépôt Prysm ou à n'importe quel dépôt de spécifications de consensus ou d'exécution — nous serions vraiment ravis de vos contributions. Merci.