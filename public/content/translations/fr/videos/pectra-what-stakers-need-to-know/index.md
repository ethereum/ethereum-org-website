---
title: "Mise à jour Pectra d'Ethereum : ce que les stakers doivent savoir"
description: "Explication de la mise à jour Pectra du point de vue d'un staker, couvrant les impacts pratiques sur les validateurs, les opérations de staking et les EIP clés qui affectent le staking dans le protocole Ethereum."
lang: fr
youtubeId: "_UpAFpC7X6Y"
uploadDate: 2025-01-22
duration: "0:09:14"
educationLevel: intermediate
topic:
  - "feuille de route"
  - "pectra"
  - "staking"
format: explainer
author: Blockdaemon
breadcrumb: "Pectra pour les stakers"
---

Un webinaire organisé par **Blockdaemon** avec l'ingénieure en chaîne de blocs Julia Schmidt (Alluvial) et Freddy Tänzer (Blockdaemon) discutant de l'impact de la mise à jour Pectra sur le staking d'ETH. Le webinaire couvre les retraits déclenchables depuis la couche d'exécution, les augmentations du solde effectif maximum, la consolidation des validateurs et les implications du staking liquide.

*Cette transcription est une copie accessible de la [transcription vidéo originale](https://www.youtube.com/watch?v=_UpAFpC7X6Y) publiée par Blockdaemon. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Introduction (0:00) {#introduction-000}

**Animateur :** Bonjour et bienvenue à ce webinaire organisé par Blockdaemon, consacré à la prochaine mise à jour Pectra d'Ethereum. Nous accueillons aujourd'hui Julia Schmidt, ingénieure en chaîne de blocs chez Alluvial, et Freddy Tänzer, responsable de l'écosystème Ethereum chez Blockdaemon, pour discuter de la manière dont les changements de Pectra impacteront le staking d'ETH, le réseau dans son ensemble, les services de staking liquide, et bien plus encore. Pour commencer, Freddy — pourriez-vous nous donner un bref aperçu de la mise à jour Pectra et de son impact sur les stakers ?

#### Qu'est-ce que Pectra (1:28) {#what-is-pectra-128}

**Freddy Tänzer :** Pectra est donc une mise à jour d'Ethereum prévue pour la fin du premier trimestre 2025 — vers mars, cela pourrait être légèrement repoussé, peut-être en avril environ. Au départ, cela devait être un petit fork, puis de plus en plus d'éléments ont été ajoutés, de sorte qu'ils l'ont maintenant divisé en deux.

La première partie contient beaucoup de choses — par exemple, en ce qui concerne les comptes intelligents, l'abstraction de compte, et des choses de ce genre — mais je veux vraiment me concentrer sur les éléments pertinents pour notre public en termes de changements liés au staking. Il y en a principalement deux majeurs.

Le premier est le fait que vous pouvez déclencher des retraits et des sorties de votre validateur via la couche d'exécution — les identifiants de retrait — éliminant ainsi la dépendance à l'égard de l'opérateur de nœud. Le second, dont l'effet est sans doute encore plus important, est que le solde effectif maximum d'un validateur peut désormais changer. Auparavant, il s'agissait d'un montant fixe de 32 ETH, et maintenant il peut se situer n'importe où entre 32 et 2 048 ETH.

Il y en a aussi un plus petit qui fait que les dépôts sont beaucoup plus rapides — enregistrés onchain en moins d'une heure au lieu d'environ 14 heures — mais je pense que ces deux-là sont les plus pertinents pour notre discussion ici.

#### EIP-7002 : sorties déclenchables depuis la couche d'exécution (2:58) {#eip-7002-execution-layer-triggerable-exits-258}

**Animateur :** Pour le premier changement majeur, Julia, pourriez-vous expliquer comment le processus post-Pectra va changer par rapport aux méthodes actuelles d'initiation des retraits dans l'écosystème de staking d'Ethereum ?

**Julia Schmidt :** Pour proposer et attester des blocs, le validateur doit être constamment en ligne et avoir un solde staké de 32 ETH. Lorsque vous configurez un validateur pour participer au mécanisme de consensus, vous configurez deux clés. La première est la clé de validateur, qui est utilisée pour effectuer les tâches du validateur — signer les attestations de bloc. La seconde est la clé de retrait, qui représente la propriété des ETH stakés.

Vous avez deux façons de faire du staking : le staking en solo, ou les configurations multi-dépositaires comme avec Blockdaemon et comme nous le faisons chez Liquid Collective, où vous pouvez choisir votre opérateur de nœud pour effectuer toutes les tâches et opérations du validateur en votre nom. Cela leur donne la clé de validateur, et vous n'avez accès qu'à la clé de retrait.

Le message réel pour sortir un validateur ne peut être envoyé qu'à partir de la clé de validateur qui est contrôlée par l'opérateur de nœud. Cela vous oblige à faire confiance à votre opérateur de nœud — à dépendre de lui pour effectuer la sortie de votre validateur à votre place. S'il le fait, c'est très bien, mais vous devez toujours vous fier à ce tiers.

Ce qui se passait auparavant, c'est que vous acceptiez de pré-signer des messages de sortie lors de la mise en place de cette configuration de staking multi-dépositaire. Vous obteniez un message que vous pouviez utiliser plus tard pour sortir votre validateur, mais vous ne saviez pas si le message de sortie fonctionnerait réellement. À chaque fois qu'il y avait une mise à jour d'Ethereum qui modifiait le numéro de version, votre message de sortie risquait de ne plus fonctionner.

Lors de la dernière mise à jour Dencun, une nouvelle EIP a modifié le délai d'expiration de ces messages de sortie — mais cela ne traitait que le symptôme, sans résoudre le problème. Le véritable problème est que le propriétaire des ETH stakés ne peut pas déclencher le retrait. Les fonds peuvent essentiellement être pris en otage par l'opérateur de nœud.

Ce problème est désormais résolu avec l'EIP-7002, qui permet à la fois à la clé de validateur et à la clé de retrait de déclencher la sortie depuis la couche d'exécution — simplement en envoyant une transaction à un contrat de retrait spécial où vous envoyez une demande de retrait et spécifiez soit une sortie complète du validateur, soit un retrait partiel du solde staké.

#### EIP-7251 : solde effectif maximum (4:15) {#eip-7251-max-effective-balance-415}

**Animateur :** Freddy, pourriez-vous nous donner un aperçu du solde effectif maximum à partir de Pectra, et comment cela impactera les personnes qui stakent actuellement ?

**Freddy Tänzer :** Juste pour ajouter — pour nos clients institutionnels, cette dépendance à l'égard de l'opérateur de nœud était généralement gérée avec des messages de sortie pré-signés, principalement pour répondre aux préoccupations des régulateurs ou aux problèmes de continuité des activités. Ils devaient également conserver ces messages de sortie en sécurité. Il y a donc une nette simplification du processus, éliminant cette dépendance.

Maintenant, concernant le solde effectif maximum : beaucoup de choses ne changent pas, et tout cela est optionnel. Vous n'avez rien à changer. L'objectif des développeurs principaux d'Ethereum et de l'écosystème dans son ensemble est de réduire le nombre de validateurs sur le réseau. Nous avons dépassé le million de validateurs aujourd'hui, et chacun doit communiquer avec les autres concernant les attestations et le consensus. Cela représente beaucoup de trafic réseau — des tests ont montré qu'atteindre deux millions de validateurs pourrait poser problème.

L'objectif est de réduire le nombre de validateurs sans impacter la sécurité du réseau — puisque le montant total d'ETH staké resterait constant, il y aurait simplement plus d'ETH par validateur en moyenne.

Pour le client, cela signifie principalement qu'il doit décider s'il souhaite utiliser le nouveau type de validateur ou l'ancien. Cela dépend de ses besoins en liquidité. Dans la configuration actuelle avec des validateurs de 32 ETH, les récompenses de votre protocole seront envoyées vers vos identifiants de retrait tous les neuf ou dix jours, vous offrant une liquidité régulière.

Mais de nombreuses configurations supposent que les récompenses sont utilisées pour composer la mise. Par le passé, lors de la composition, vous deviez attendre d'avoir 32 ETH de récompenses pour lancer manuellement un nouveau validateur. Avec le nouveau type de validateur, vous composez automatiquement vos récompenses — cela signifie plus de récompenses et moins de travail.

Le compromis est que vous ne recevez pas de récompenses régulièrement, et vous devez mettre en place un processus pour les récupérer. Les déclencheurs de retrait sont désormais des transactions régulières qui entraînent des frais de gaz, plutôt que de recevoir des récompenses gratuitement dans l'ancien modèle.

Il y a aussi de bonnes nouvelles concernant la réduction : la pénalité de réduction initiale va considérablement baisser — d'environ 128 fois. Avec un validateur de 32 ETH, la pénalité initiale était d'un ETH. Après Pectra, ce sera une fraction d'ETH — peut-être 20 ou 25 $. Cela a des effets secondaires positifs sur le staking en solo, ce qui est évidemment important pour la neutralité crédible d'Ethereum.

L'avantage de la composition automatique profite principalement aux plus petits montants de mise. Si vous avez mille validateurs, vous pourriez en lancer un nouveau manuellement chaque mois. Mais si vous n'avez qu'un seul validateur, vous devriez pratiquement attendre 32 ans pour composer.

#### Implications du staking liquide (11:25) {#liquid-staking-implications-1125}

**Animateur :** Julia, comment la consolidation de validateurs plus importants se compare-t-elle aux avantages du staking liquide ? Comment ces décisions pèseront-elles dans l'esprit d'un staker après Pectra ?

**Julia Schmidt :** Chez Alluvial, nous avons suivi de près ces changements et souhaitons proposer les deux solutions. Les demandes de consolidation dans Pectra sont une solution intermédiaire qui ne devrait pas affecter le temps de gain de votre solde effectif — il n'aura pas à repasser par une file d'attente d'activation lors de la consolidation de plusieurs validateurs. Le processus est assez fluide.

Le fait que la pénalité de réduction initiale ait été abaissée réduit le risque de gérer des validateurs à solde élevé. La volonté de la Fondation Ethereum est vraiment de consolider autant que possible pour réduire la charge du réseau. Il y a un petit inconvénient : dans le cas très rare où un validateur avec un solde effectif maximum de 2 048 ETH subirait une réduction, il irait dans la file d'attente de sortie et vos fonds seraient bloqués plus longtemps — ce serait comme si 64 validateurs subissaient une réduction en même temps. Nous essaierions donc d'offrir des plafonds de validateurs flexibles en fonction de l'appétit pour le risque du client.

Du côté de l'utilité, un jeton de staking liquide (LST) ajoute évidemment de la liquidité — même avec des retraits partiels depuis la couche d'exécution, ce ne sera pas instantané. Vous soumettez la transaction, elle est mise en file d'attente, puis il y a l'époque de sortie et l'époque de retrait. Les jetons de staking liquide offrent toujours une liquidité instantanée que les retraits partiels ne peuvent pas offrir.

#### Prochaines étapes pour les stakers (16:20) {#next-steps-for-stakers-1620}

**Freddy Tänzer :** Ce que nous constatons, c'est que les institutions financières stakent généralement entre 65 % et 85 % de leurs ETH sous garde, car elles ont besoin du reste comme réserve de liquidité pour les rachats. Avec le staking liquide, vous pouvez potentiellement augmenter la quantité d'ETH stakés, ce qui génère des récompenses plus élevées.

Les deux parties bénéficient de Pectra — le staking liquide obtient l'option de retraits depuis la couche d'exécution, et le staking traditionnel bénéficie de l'élimination du problème d'incrément de 32 ETH, en particulier pour les plus petites mises.

**Julia Schmidt :** Avec le protocole Liquid Collective, nous ne proposons pas seulement le staking à un seul opérateur de nœud — nous avons un consortium de différents opérateurs de nœuds auxquels nous allouons des mises selon une approche à tour de rôle (round-robin). Cela augmente la décentralisation des ETH stakés. Et ces opérateurs de nœuds suivent la norme NORS (Node Operator Risk Standard), nous garantissons donc également une couverture en cas de réduction.

Un avantage clé que je n'ai pas encore abordé concerne les retraits partiels — maintenant que vous pouvez retirer des ETH stakés depuis la couche d'exécution, cela ouvre de nouvelles voies pour des protocoles tels qu'EigenLayer afin de déclencher des retraits et des sorties. Il y a une énorme augmentation des fonctionnalités et de l'interopérabilité que la finance décentralisée (DeFi) peut désormais mieux intégrer dans le cycle de vie complet du validateur, du dépôt à la sortie. En tant qu'ingénieure en chaîne de blocs, il est passionnant de pouvoir automatiser l'ensemble du flux de travail.

#### Conclusion (19:50) {#closing-1950}

**Animateur :** Julia, où les gens peuvent-ils aller pour en savoir plus sur Liquid Collective et Alluvial ?

**Julia Schmidt :** Vous pouvez suivre Alluvial et Liquid Collective sur Twitter, sur X, sur LinkedIn, ou sur le site web d'Alluvial. Nous partagerons un article détaillant les changements concernant la mise à jour Pectra et la façon dont ils affecteront le paysage d'Ethereum.

**Animateur :** Freddy, des mises à jour à partager concernant Pectra ?

**Freddy Tänzer :** Nous avons beaucoup de choses à venir. Nous allons avoir une page dédiée sur notre site web, blockdaemon.com — ce sera le point central de toutes les ressources. Nous aurons un article de blog, une FAQ, ainsi que des conseils et des recommandations de modélisation concernant le type de validateur à choisir et sa taille. Que vous souhaitiez un validateur de 2 000 ETH, ou deux de 1 000, ou quatre de 500 — tout cela est généralement possible, et il y a des compromis à faire. Nous aiderons nos clients à naviguer à travers cela.

**Animateur :** Fantastique. Freddy, Julia, un grand merci pour votre temps aujourd'hui — une discussion fascinante et une excellente introduction à Pectra.