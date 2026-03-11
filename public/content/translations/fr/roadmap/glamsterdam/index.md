---
title: Glamsterdam
description: "En savoir plus sur la mise à niveau du protocole Glamsterdam"
lang: fr
---
# Glamsterdam {#glamsterdam}

**Glamsterdam est une prochaine mise à niveau d'Ethereum prévue pour le premier semestre 2026**


<Alert variant="update">
<AlertContent>
<AlertDescription>
La mise à niveau Glamsterdam n'est qu'une étape dans les objectifs de développement à long terme d'Ethereum. Apprenez-en davantage sur [la feuille de route du protocole](/roadmap/) et [les mises à niveau précédentes](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

La prochaine mise à niveau [d'Ethereum,](/) Glamsterdam, est conçue pour ouvrir la voie à la prochaine génération de mise à l'échelle. Glamsterdam est le nom de la combinaison de « Amsterdam » (mise à niveau de la couche d’exécution, nommée d'après un ancien lieu de Devconnect) et de « Gloas » (mise à niveau de la couche de consensus, nommée d'après une étoile).

Suite aux progrès réalisés dans la mise à niveau [de Fusaka](/roadmap/fusaka/), Glamsterdam se concentre sur la mise à l'échelle de la L1 en réorganisant la façon dont le réseau traite les transactions et gère sa base de données croissante, en mettant à jour fondamentalement la façon dont Ethereum crée et vérifie les blocs.

Alors que Fusaka s'est concentré sur des améliorations fondamentales, Glamsterdam fait progresser les objectifs « Scale L1 » et « Scale Blobs » en consacrant la séparation des tâches entre les différents participants au réseau et en introduisant des moyens plus efficaces de gérer les données afin de préparer l' [état](/glossary/#state) à une parallélisation à haut débit. 

Ces améliorations garantissent qu'Ethereum reste rapide, abordable et décentralisé à mesure qu'il gère davantage d'activité, tout en maintenant des exigences matérielles gérables pour les personnes qui exécutent [des nœuds](/glossary/#node) à domicile.

<YouTube id="GgKveVMLnoo" />

## Améliorations envisagées pour Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Remarque: Cet article présente actuellement une sélection d'EIP envisagées pour inclusion dans Glamsterdam. Pour les dernières mises à jour de statut, consultez la [mise à niveau de Glamsterdam sur Forkcast](https://forkcast.org/upgrade/glamsterdam). 

Si vous souhaitez ajouter une EIP qui est à l'étude pour Glamsterdam, mais qui n'a pas encore été ajoutée à cette page, [découvrez comment contribuer à ethereum.org ici](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

La mise à niveau de Glamsterdam s'articule autour de trois objectifs principaux:

- Accélération du traitement (parallélisation): Réorganiser la façon dont le réseau enregistre les dépendances de données, afin qu'il puisse traiter en toute sécurité de nombreuses transactions en même temps au lieu d'une séquence lente, une par une.
- Capacité accrue: la répartition de la tâche lourde de création et de vérification des blocs donne au réseau plus de temps pour propager de plus grandes quantités de données sans ralentissement.
- Prévention de l'encombrement de la base de données (durabilité): Ajuster les frais de réseau pour refléter avec précision le coût matériel à long terme du stockage de nouvelles données, débloquer les futures augmentations de la limite de gaz tout en empêchant la dégradation des performances matérielles.

En bref, Glamsterdam introduira des changements structurels pour garantir que, à mesure que le réseau augmentera sa capacité, il restera durable et que les performances resteront élevées.

## Échelle L1 et traitement parallèle {#scale-l1}

Une mise à l'échelle L1 significative nécessite de s'éloigner des hypothèses de confiance hors protocole et des contraintes d'exécution en série. Glamsterdam y remédie en consacrant la séparation de certaines tâches de construction de blocs et en introduisant de nouvelles structures de données qui permettent au réseau de se préparer au traitement parallèle.

### Proposition principale: Séparation intégrée entre le proposant et le constructeur (ePBS) {#epbs}

- Supprime les hypothèses de confiance hors protocole et la dépendance à l'égard des relais à code source fermé.
- Permet la mise à l'échelle L1 en autorisant des charges utiles beaucoup plus importantes grâce à des fenêtres de propagation étendues.
- Introduit les paiements aux constructeurs sans tiers de confiance et les transactions chiffrées pour les constructeurs anonymes.

Actuellement, le processus de proposition et de construction de blocs comprend un transfert entre les bloc et les constructeurs de bloc. La relation entre les proposeurs et les constructeurs ne fait pas partie du protocole Ethereum de base, elle repose donc sur des logiciels tiers à code fermé (relais), ainsi que sur une confiance hors protocole entre les entités. 

La relation hors protocole entre les proposants et les constructeurs crée également un « chemin critique » pendant la validation des bloc, ce qui oblige [les validateurs](/glossary/#validator) à diffuser et à exécuter les transaction rapidement dans une fenêtre de 2 secondes, limitant ainsi la quantité de données que le réseau peut traiter.

**La séparation proposant-constructeur (ePBS, ou EIP-7732)**, inscrite dans le protocole, sépare formellement le rôle du proposant (qui choisit le bloc) de celui du constructeur (qui assemble les transactions), « inscrivant » ce processus directement dans le protocole Ethereum afin de supprimer la confiance hors protocole. Elle introduit également le Payload Timeliness Committee (PTC) et une logique à double échéance, les validateurs attestant de la ponctualité et de la disponibilité des données séparément afin de maximiser le débit. 

<YouTube id="u8XvkTrjITs" />

La séparation des rôles de proposant et de constructeur au niveau du protocole élargit la fenêtre de propagation (ou le temps disponible pour diffuser des données sur le réseau) de 2 secondes à environ 9 secondes. 

ePBS réduit la dépendance à l'égard de logiciels tiers supplémentaires et permet à Ethereum de traiter en toute sécurité des quantités beaucoup plus importantes de données (comme plus de blobs pour [les couches 2](/glossary/#layer-2) ) sans surcharger le réseau.

**Ressources**: [Spécification technique EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Proposition principale: listes d'accès au niveau des blocs (BAL) {#bals}

- Élimine les goulots d'étranglement du traitement séquentiel en fournissant une carte préalable de toutes les dépendances des transaction, préparant le terrain pour que les validateurs traitent de nombreuses transactions en parallèle au lieu de les traiter une par une.
- Permet aux nœuds de mettre à jour leurs enregistrements en lisant les résultats finaux sans avoir besoin de rejouer chaque transaction (synchronisation sans exécution), ce qui rend la synchronisation d'un nœud avec le réseau beaucoup plus rapide. 
- Élimine les conjectures, permettant aux validateurs de précharger toutes les données nécessaires en une seule fois au lieu de les découvrir étape par étape, ce qui rend la validation beaucoup plus rapide 

L'Ethereum d'aujourd'hui est comme une route à une seule voie ; comme le réseau ne sait pas quelles données une transaction nécessitera ou modifiera (par exemple, quels comptes une transaction affectera) tant qu'une transaction n'a pas été exécutée, les validateurs doivent traiter les transactions une par une dans une file stricte et séquentielle. S'ils essayaient de traiter les transactions toutes en même temps, sans connaître ces dépendances, deux transactions pourraient accidentellement essayer de modifier les mêmes données en même temps, ce qui provoquerait des erreurs.

**Les listes d'accès au niveau des blocs (BAL, ou EIP-7928)** sont comme une carte incluse dans chaque bloc, indiquant au réseau quelles parties de la base de données seront consultées avant le début du travail. Les BAL exigent que chaque bloc inclue le hachage de chaque modification de compte que les transactions toucheront, ainsi que les résultats finaux de ces modifications (l'enregistrement de hachage de tous les accès à état et des valeurs post-exécution). 

Parce qu'elles offrent une visibilité instantanée sur les transactions qui ne se chevauchent pas, les BAL permettent aux nœuds d'effectuer des lectures de disque parallèles, récupérant des informations pour de nombreuses transactions simultanément. Le réseau peut regrouper en toute sécurité des transactions non liées et les traiter en parallèle. 

Étant donné que le BAL inclut les résultats finaux des transactions (les valeurs post-exécution), lorsque les nœuds du réseau doivent se synchroniser avec l' état actuel du réseau, ils peuvent copier ces résultats finaux pour mettre à jour leurs enregistrements. Les validateurs n'ont plus besoin de rejouer toutes les transactions complexes à partir de zéro pour savoir ce qui s'est passé, ce qui permet aux nouveaux nœuds de rejoindre le réseau plus rapidement et plus facilement. 

Les lectures de disques parallèles activées par les BAL constitueront une étape importante vers un avenir où Ethereum pourra traiter de nombreuses transactions à la fois, augmentant considérablement la vitesse du réseau.

#### eth/71 échange de liste d'accès aux bloc {#bale}

L'échange de listes d'accès aux blocs (eth/71 ou EIP-8159) est le complément direct des listes d'accès au niveau des blocs. Alors que les BAL débloquent l'exécution parallèle, eth/71 met à niveau le protocole pair à pair pour permettre aux nœuds de partager réellement ces listes sur le réseau. La mise en œuvre de l'échange de listes d'accès aux bloc permettra une synchronisation plus rapide et permettra aux nœuds d'effectuer des mises à jour état sans exécution.

**Ressources**: 
- [Spécification technique EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Spécification technique EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Pérennité du réseau {#network-sustainability}

À mesure que le réseau Ethereum se développe rapidement, il est important de s'assurer que le coût de son utilisation correspond à l'usure du matériel qui exécute Ethereum. Le réseau doit augmenter ses limites de capacité globales afin de pouvoir évoluer en toute sécurité et traiter plus de transactions. 

### Augmentation du coût du gas pour la création d'un État {#state-creation-gas-cost-increase}

- Garantit que les frais de création de nouveaux comptes ou de contrats intelligents reflètent fidèlement la charge à long terme qu'ils imposent à la base de données d'Ethereum.
- Ajuste automatiquement ces frais de création de données en fonction de la capacité globale du réseau, en ciblant un taux de croissance sûr et prévisible afin que le matériel physique standard puisse continuer à faire fonctionner le réseau.
- Sépare la comptabilisation de ces frais spécifiques dans un nouveau réservoir, supprimant les anciennes limites de transaction et permettant aux développeurs de déployer des applications plus grandes et plus complexes.

L'ajout de nouveaux comptes, jetons et [contrats intelligents](/glossary/#smart-contract) crée des données permanentes (appelées «état») que chaque ordinateur exécutant le réseau doit stocker indéfiniment. Les frais actuels pour ajouter ou lire ces données sont incohérents et ne reflètent pas nécessairement la charge de stockage réelle et à long terme qu'ils imposent au matériel du réseau.

Certaines actions qui créent un état sur Ethereum, comme la création de nouveaux comptes ou le déploiement de contrats intelligents volumineux, ont été relativement peu coûteuses par rapport à l'espace de stockage permanent qu'elles occupent sur les nœuds du réseau. Par exemple, le déploiement de contrats est nettement moins cher par octet que la création d'emplacements de stockage. 

Sans ajustement, état d'Ethereum pourrait augmenter de près de 200 GiB par an si le réseau passe à une limite de gaz, dépassant à terme le matériel courant. 

**L'augmentation du coût du gas pour la création d'état (ou EIP-8037)** harmonise les coûts en les liant à la taille réelle des données créées, en mettant à jour les frais afin qu'ils soient proportionnels à la quantité de données permanentes qu'une opération crée ou auxquelles elle accède. 

L'EIP-8037 introduit également un modèle de réservoir pour gérer ces coûts de manière plus prévisible; les frais de gas état proviennent d'abord du `state_gas_reservoir`, et l'opcode `GAS` ne renvoie que `gas_left`, empêchant les cadres d'exécution de mal calculer le gas disponible.

Avant EIP-8037, le travail de calcul (le traitement actif) et le stockage permanent des données (l'enregistrement du contrat intelligent dans la base de données du réseau) partageaient la même limite de gaz. Le modèle de réservoir divise la comptabilité: la limite de gaz pour le travail de calcul réel de la transaction (traitement) et pour le stockage de données à long terme ( gas état ). La séparation des deux permet d'éviter que la taille des données d'une application n'atteigne la limite de gaz; tant que les développeurs fournissent suffisamment de fonds pour remplir le réservoir pour le stockage des données, ils peuvent déployer des contrats intelligents beaucoup plus grands et plus complexes. 

Une tarification du stockage des données plus précise et prévisible aidera Ethereum à augmenter en toute sécurité sa vitesse et sa capacité sans surcharger la base de données. Cette durabilité permettra aux opérateurs de nœud de continuer à utiliser du matériel (relativement) abordable pour les années à venir, en maintenant le mise en jeu à domicile accessible pour préserver la décentralisation du réseau.

**Ressources**: [Spécification technique EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Mise à jour du coût du gas d'accès à l'État {#state-access-gas-cost-update}

- Augmente les coûts de gas pour les applications qui lisent ou mettent à jour des informations stockées de manière permanente sur Ethereum (opcodes d'accès à l'état) afin de correspondre précisément au travail de calcul requis par ces commandes.

À mesure que état d'Ethereum s'est développé, l'acte de recherche et de lecture d'anciennes données (« accès à état ») est devenu plus lourd et plus lent à traiter pour les nœuds. Les frais pour ces actions sont restés les mêmes, même s'il est maintenant légèrement plus coûteux de rechercher des informations (en termes de puissance de calcul). 

Par conséquent, certaines commandes spécifiques sont actuellement sous-évaluées par rapport au travail qu'elles obligent un nœud à effectuer. `EXTCODESIZE` et `EXTCODECOPY` sont sous-évaluées, par exemple, car elles nécessitent deux lectures de base de données distinctes: une pour l'objet de compte et une seconde pour la taille réelle du code ou du bytecode.

**La mise à jour du coût du gas d'accès à l'état (ou EIP-8038)** augmente les constantes de gas pour les opcodes d'accès à l'état, comme la recherche de données de compte et de contrat, afin de s'aligner sur les performances du matériel moderne et la taille de état. 

L'alignement du coût de l'accès à l'état contribue également à rendre Ethereum plus résilient. Étant donné que ces actions de lecture de données lourdes sont artificiellement bon marché, un attaquant malveillant pourrait inonder le réseau de milliers de requêtes de données complexes dans un seul bloc avant d'atteindre la limite de frais du réseau, ce qui pourrait entraîner un ralentissement ou un plantage du réseau (une attaque par déni de service). Même sans intention malveillante, les développeurs ne sont pas économiquement encouragés à créer des applications efficaces si la lecture des données du réseau est trop bon marché.

En évaluant plus précisément les actions d'accès à l'état, Ethereum peut être plus résilient face aux ralentissements accidentels ou intentionnels, tandis que l'alignement des coûts du réseau sur la charge matérielle constitue une base plus durable pour les futures augmentations de la limite de gaz.

**Ressources**: [Spécification technique EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Résilience du réseau 

Les améliorations apportées aux fonctions des validateur et aux processus de sortie garantissent la stabilité du réseau lors d'événements de slashing massifs et démocratisent la liquidité. Ces améliorations rendent le réseau plus stable et garantissent que tous les participants, petits et grands, sont traités équitablement.

### Exclure les validateurs pénalisés des propositions {#exclude-slashed-validators}

- Empêche les validateurs pénalisés (slashed) d'être sélectionnés pour proposer de futurs blocs, éliminant ainsi les créneaux manqués garantis.
- Assure le bon fonctionnement et la fiabilité d'Ethereum, en évitant les pannes graves en cas d' pénalisation massif.

Actuellement, même si un validateur est pénalisé (sanctionné pour avoir enfreint les règles ou ne pas avoir fonctionné comme prévu), le système pourrait toujours le choisir pour diriger un bloc dans un avenir proche lorsqu'il génère de futures anticipations de proposeurs. 

Étant donné que les blocs des validateurs pénalisés sont automatiquement rejetés comme invalides, cela entraîne des ratés de créneaux et retarde la reprise du réseau réseau d'événements de pénalisation massive. 

**Exclure les validateurs pénalisés de la proposition (ou EIP-8045)** filtre simplement les validateurs pénalisés pour qu'ils ne soient pas sélectionnés pour les tâches futures. Cela améliore la résilience de la chaîne en garantissant que seuls les validateurs sains sont sélectionnés pour proposer des blocs, maintenant ainsi la qualité de service pendant les perturbations du réseau.

**Ressources**: [Spécification technique EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Permettre aux sorties d'utiliser la file d'attente de consolidation {#let-exits-use-the-consolidation-queue}

- Comble une faille qui permet aux validateurs disposant de soldes élevés de quitter le réseau plus rapidement que les validateurs plus petits via la file d'attente de consolidation. 
- Permet aux sorties régulières de se déverser dans cette deuxième file d'attente lorsqu'elle a une capacité disponible, réduisant ainsi les délais de retrait des mise en jeu pendant les périodes de fort volume.
- Maintient une sécurité stricte pour éviter de modifier les limites de sécurité fondamentales d'Ethereum ou d'affaiblir le réseau.

Depuis que la [mise à niveau de Pectra](/roadmap/pectra) a augmenté le solde effectif maximal des validateurs Ethereum de 32 ETH à 2 048 ETH, une faille technique permet aux validateurs disposant de soldes élevés de quitter le réseau plus rapidement que les validateurs disposant de soldes plus faibles via la file d'attente de consolidation.

**Permettre aux sorties d'utiliser la file d'attente de consolidation (ou EIP-8080)** démocratise la file d'attente de consolidation pour toutes les sorties de mise en jeu, créant une file d'attente unique et équitable pour tous.  

Voici comment cela fonctionne aujourd'hui:

- La limite de rotation d'Ethereum est une limite de sécurité sur le taux auquel les validateurs peuvent entrer, sortir ou fusionner (consolider) leur ETH mis en jeu, afin de garantir que la sécurité du réseau ne soit jamais déstabilisée.
- Étant donné qu'une consolidation de validateur est une action plus lourde avec plus de pièces mobiles qu'une sortie de validateur standard, elle consomme une plus grande partie de ce budget de sécurité (limite de rotation). 
- Plus précisément, le protocole stipule que le coût de sécurité exact d'une sortie standard est de deux tiers (2/3) du coût d'une consolidation.

Des files d'attente de sortie plus équitables permettront aux sorties standard d'emprunter l'espace inutilisé de la file d'attente de consolidation pendant les périodes de forte demande de sortie, en appliquant un taux d'échange de « 3 pour 2 » (pour chaque tranche de 2 places de consolidation inutilisées, le réseau peut traiter en toute sécurité 3 sorties standard). Ce facteur de rotation de 3/2 équilibre la demande entre les files d'attente de consolidation et de sortie.

La démocratisation de l'accès à la file d'attente de consolidation augmentera la vitesse à laquelle les utilisateurs peuvent retirer leur mise pendant les périodes de forte demande jusqu'à 2,5 fois, sans compromettre la sécurité du réseau.

**Ressources**: [Spécification technique EIP-8080](https://eips.ethereum.org/EIPS/eip-8080)

## Améliorer l'expérience utilisateur et développeur {#improve-user-developer-experience}

La mise à niveau Glamsterdam d'Ethereum vise à améliorer l'expérience utilisateur, à faciliter la découverte des données et à gérer la taille croissante des messages afin d'éviter les échecs de synchronisation. Cela permet de suivre plus facilement ce qui se passe sur chaîne tout en évitant les problèmes techniques à mesure que le réseau évolue.

### Réduire les coûts intrinsèques du gas des transaction {#reduce-intrinsic-transaction-gas-costs}

- Réduit les frais de base des transactions, diminuant ainsi le coût global d'un simple paiement en ETH natif. 
- Rend les petits transferts plus abordables, ce qui renforce la viabilité d'Ethereum en tant que moyen d'échange courant.

Toutes les transactions Ethereum ont aujourd'hui des frais de gaz de base fixes, quelle que soit la simplicité ou la complexité de leur traitement. **Réduire le gas de transaction intrinsèque (ou EIP-2780)** propose de réduire ces frais de base pour rendre un transfert ETH standard entre des comptes existants jusqu'à 71% moins cher. 

Réduire les frais de gas intrinsèques des transaction en décomposant les frais de transaction pour ne refléter que le travail de base et essentiel que les ordinateurs exécutant le réseau effectuent réellement, comme la vérification d'une signature numérique et la mise à jour d'un solde. Étant donné qu'un paiement ETH de base n'exécute pas de code complexe et ne transporte pas de données supplémentaires, cette proposition réduirait ses frais pour correspondre à son empreinte légère. 

La proposition introduit une exception pour la création de nouveaux comptes afin d'éviter que des frais peu élevés ne surchargent l' état du réseau. Si un transfert envoie de l'ETH à une adresse vide et inexistante, le réseau doit créer un nouvel enregistrement permanent pour celle-ci. Une surtaxe de gas est ajoutée pour cette création de compte afin de couvrir sa charge de stockage à long terme. 

Ensemble, l'EIP-2780 vise à rendre les transferts quotidiens entre les comptes existants plus abordables tout en garantissant que le réseau est toujours protégé contre le gonflement de la base de données en évaluant avec précision la croissance réelle de état.

**Ressources**: [Spécification technique EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Prédécouplage déterministe d'usine {#deterministic-factory-predeploy}

- Offre aux développeurs un moyen natif de déployer des applications et des portefeuilles de contrat intelligent à la même adresse sur plusieurs chaînes.
- Permet aux utilisateurs d'avoir la même adresse de portefeuille intelligent sur plusieurs réseaux de couche 2 (L2), ce qui réduit la charge cognitive, la confusion et le risque de perte accidentelle de fonds. 
- Remplace les solutions de contournement que les développeurs utilisent actuellement pour atteindre cette parité, ce qui facilite et sécurise la création de portefeuilles et d'applications multi-chaînes.

Si un utilisateur possède aujourd'hui un portefeuille de contrat intelligent avec des comptes sur plusieurs chaînes compatibles avec la machine virtuelle Ethereum (EVM), il se retrouve souvent avec une adresse complètement différente sur différents réseaux. Non seulement cela prête à confusion, mais cela peut également entraîner une perte accidentelle de fonds. 

**Le déploiement préalable déterministe d'usine (ou EIP-7997)** offre aux développeurs un moyen natif et intégré de déployer leurs applications décentralisé et leurs portefeuilles de contrat intelligent à la même adresse sur plusieurs chaînes EVM, y compris le réseau principal Ethereum, les réseaux de couche 2 (L2), et plus encore. S'il est adopté, il permettrait aux utilisateurs d'avoir la même adresse sur chaque chaîne participante, réduisant considérablement la charge cognitive et le risque d'erreur de l'utilisateur.

Le déploiement préalable déterministe de la fabrique fonctionne en plaçant de manière permanente un programme de fabrique minimal et spécialisé à un emplacement identique (plus précisément, adresse 0x12) sur chaque chaîne compatible EVM participante. Son objectif est de fournir un contrat de fabrique universel et standard qui peut être adopté par n'importe quel réseau compatible EVM; tant qu'une chaîne EVM participe et adopte cette norme, les développeurs pourront l'utiliser pour déployer leurs contrats intelligents à la même adresse sur ce réseau. 

Cette standardisation simplifie la création et la gestion d'applications inter-chaînes pour les développeurs et l'ensemble de l'écosystème. Les développeurs n'ont plus besoin de créer de code personnalisé et spécifique à une chaîne pour relier leurs logiciels entre différents réseaux, mais utilisent plutôt cette usine universelle pour générer la même adresse pour leur application partout. En outre, les explorateurs de bloc, les services de suivi et les portefeuilles peuvent plus facilement identifier et relier ces applications et comptes sur différentes chaînes, créant ainsi un environnement multi-chaînes plus unifié et transparent pour tous les participants basés sur Ethereum. 

**Ressources**: [Spécification technique EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### Les transferts et les destructions d'ETH émettent un journal {#eth-transfers-and-burns-emit-a-log}

- Génère automatiquement un enregistrement permanent (journal) chaque fois que des ETH sont transférés ou brûlés.
- Corrige un angle mort historique qui permet aux applications, aux plateformes d'échange et aux ponts de détecter de manière fiable les dépôts des utilisateurs sans outils de traçage ad hoc.

Contrairement aux jetons (ERC-20), les transferts réguliers d'ETH entre les contrats intelligents n'émettent pas de reçu clair (journal standard), ce qui les rend difficiles à suivre pour les échanges et les applications.

Les transferts et les destructions d'ETH émettent un journal (ou EIP-7708) qui rend obligatoire pour le réseau d'émettre un événement de journal standard chaque fois qu'une quantité non nulle d'ETH est déplacée ou détruite.

Cela permettra aux portefeuilles, aux plateformes d'échange et aux opérateurs de pont de suivre avec précision les dépôts et les mouvements de manière beaucoup plus simple et fiable, sans avoir besoin d'outils personnalisés.

**Ressources**: [Spécification technique EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### eth/70 listes de réception de bloc partiels {#eth-70-partial-block-receipt-lists}

À mesure que nous augmentons la quantité de travail qu'Ethereum peut effectuer, les listes de reçus pour ces actions (les enregistrements de données de ces transactions) deviennent si volumineuses qu'elles pourraient potentiellement entraîner la défaillance des nœuds du réseau lors de la tentative de synchronisation des données entre eux. 

Les listes de réception de bloc partielles eth/70 (ou EIP-7975) introduisent une nouvelle façon pour les nœuds de communiquer entre eux (eth/70) qui permet de diviser ces grandes listes en morceaux plus petits et plus faciles à gérer. eth/70 introduit un système de pagination pour le protocole de communication du réseau qui permet aux nœuds de diviser les listes de réception de bloc et de demander les données en toute sécurité dans des morceaux plus petits et plus faciles à gérer.

Ce changement empêcherait les échecs de synchronisation du réseau pendant les périodes de forte activité. En fin de compte, il ouvre la voie à Ethereum pour augmenter sa capacité de bloc et traiter plus de transactions par bloc à l'avenir, sans surcharger le matériel physique qui synchronise la chaîne.

**Ressources**: [Spécification technique EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Pour en savoir plus {#further-reading}

- [feuille de route d'Ethereum](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Glamsterdam Meta EIP](https://eips.ethereum.org/EIPS/eip-7773) 
- [Annonce sur le blogue: Mise à jour des priorités du protocole pour 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Le podcast Daily Gwei Refuel - L'Ethereum post-quantique, Glamsterdam arrive](https://www.youtube.com/watch?v=qx9sd50uQjQ) 

## FAQ {#faq}

### Comment l'ETH peut-il être converti après le fourche dure de Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **Aucune action requise pour votre ETH**: Il n'est pas nécessaire de convertir ou de mettre à niveau votre ETH après la mise à niveau de Glamsterdam. Les soldes de votre compte resteront les mêmes, et l'ETH que vous détenez actuellement restera accessible sous sa forme actuelle après le fourche dure.
- **Attention aux arnaques!**<Emoji text="⚠️" /> **Toute personne qui vous demande de « mettre à niveau » votre ETH essaie de vous arnaquer.** Vous n'avez rien à faire en ce qui concerne cette mise à niveau. Vos actifs resteront complètement inchangés. N'oubliez pas que rester informé est la meilleure défense contre les escroqueries.

[En savoir plus sur la reconnaissance et la prévention des escroqueries](/security/)

### La mise à niveau Glamsterdam affecte-t-elle tous les nœuds et validateurs Ethereum? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Oui, la mise à niveau Glamsterdam nécessite des mises à jour [des clients d'exécution et des clients de consensus](/developers/docs/nodes-and-clients/). Étant donné que cette mise à niveau introduit la séparation intégrée des proposeurs-constructeurs (ePBS), les opérateurs de nœud devront s'assurer que leurs clients sont mis à jour pour gérer les nouvelles façons dont les blocs sont construits, validés et attestés par le réseau. 

Tous les principaux clients Ethereum publieront des versions prenant en charge le fourche dure, marqué comme étant de haute priorité. Vous pouvez suivre la disponibilité de ces versions dans les dépôts GitHub des client, leurs [canaux Discord](https://ethstaker.org/support), le [Discord d'EthStaker](https://dsc.gg/ethstaker), ou en vous abonnant au blog Ethereum pour les mises à jour du protocole. 

Pour maintenir la synchronisation avec le réseau Ethereum après la mise à niveau, les opérateurs de nœud doivent s'assurer qu'ils exécutent une version de client prise en charge. Notez que les informations sur les versions des client sont sensibles au facteur temps et que les utilisateurs doivent se référer aux dernières mises à jour pour obtenir les détails les plus récents.

### En tant que staker, que dois-je faire pour la mise à niveau de Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Comme pour chaque mise à niveau du réseau, assurez-vous de mettre à jour vos clients vers les dernières versions compatibles avec Glamsterdam. Suivez les mises à jour sur la liste de diffusion et [les annonces de protocole sur le blog EF](https://blog.ethereum.org/category/protocol) pour être informé des versions.

Pour valider votre configuration avant que Glamsterdam ne soit activé sur le Mainnet, vous pouvez exécuter un validateur sur les réseaux de test. Les forks de réseau de test sont également annoncés sur la liste de diffusion et le blog.

### Quelles améliorations Glamsterdam apportera-t-elle pour la mise à l'échelle L1? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

La fonctionnalité principale est l'ePBS (EIP-7732), qui sépare la tâche lourde de validation des transactions réseau de la tâche de consensus. Cela étend la fenêtre de propagation des données de 2 secondes à environ 9 secondes, débloquant la capacité d'Ethereum à gérer en toute sécurité un débit de transaction beaucoup plus élevé et à accueillir plus de blobs de données pour les réseaux de couche 2.

### Glamsterdam va-t-il réduire les frais sur Ethereum (couche 1)? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Oui, Glamsterdam réduira très probablement les frais pour les utilisateurs quotidiens! La réduction des gas de transaction intrinsèques (ou EIP-2780) réduit les frais de base pour l'envoi d'ETH, ce qui rend l'utilisation de l'ETH beaucoup moins chère pour les paiements quotidiens.

De plus, pour assurer la pérennité à long terme, Glamsterdam introduit les listes d'accès au niveau des blocs (BAL). Cela permet le traitement parallèle et prépare la couche 1 à gérer en toute sécurité des limites de gas globales plus élevées à l'avenir, ce qui réduira probablement les coûts de gas par transaction à mesure que la capacité augmentera.

### Mes contrats intelligents existants subiront-ils des modifications après Glamsterdam? {#will-my-smart-contracts-change}

Les contrats existants continueront de fonctionner normalement après Glamsterdam. Les développeurs obtiendront probablement plusieurs nouveaux outils et devront revoir leur consommation de gas:
- L'augmentation de la taille maximale des contrats (ou EIP-7954) permet aux développeurs de déployer des applications plus volumineuses, en portant la limite de taille maximale des contrats d'environ 24 KiB à 32 KiB. 
- Le déploiement préalable déterministe d'usine (ou EIP-7997) introduit un contrat d'usine universel et intégré. Il permet aux développeurs de déployer leurs applications et leurs portefeuilles de contrat intelligent à la même adresse sur toutes les chaînes EVM participantes.
- Si votre application s'appuie sur un traçage complexe pour trouver les transferts d'ETH, les transferts et les destructions d'ETH émettent un journal (ou EIP-7708) qui vous permettra de passer à l'utilisation de journaux pour une comptabilité plus simple et plus fiable.
- L'augmentation du coût du gas pour la création d'état (ou EIP-8037) et la mise à jour du coût du gas pour l'accès à l'état (ou EIP-8038) introduisent de nouveaux modèles de durabilité qui modifieront certains coûts de déploiement de contrat, car la création de nouveaux comptes ou de stockage permanent entraînera des frais ajustés dynamiquement. 

### Comment Glamsterdam affectera-t-il le stockage des nœud et la configuration matérielle requise? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Plusieurs EIP à l'étude pour Glamsterdam adresse de la baisse de performance de la croissance de état: 
- L'augmentation du coût du gas pour la création d'état (ou EIP-8037) introduit un modèle de tarification dynamique visant un taux de croissance de la base de données état de 100 Gio/an, garantissant que le matériel physique standard puisse continuer à exécuter le réseau efficacement. 
- Les listes de réception de bloc partielles eth/70 (ou EIP-7975) permettent aux nœuds de demander des réceptions de bloc paginées, ce qui divise les listes de réception de bloc lourdes en données en plus petits morceaux pour éviter les plantages et les synchronisations à mesure qu'Ethereum évolue.

