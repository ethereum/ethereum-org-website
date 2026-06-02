---
title: Glamsterdam
description: "Découvrez la mise à jour du protocole Glamsterdam"
lang: fr
---

# Glamsterdam {#glamsterdam}

<Alert variant="update">
<AlertContent>
<AlertTitle>
Glamsterdam est une prochaine mise à jour d'Ethereum prévue pour le second semestre 2026
</AlertTitle>
<AlertDescription>
La mise à jour Glamsterdam n'est qu'une étape dans les objectifs de développement à long terme d'Ethereum. Apprenez-en plus sur [la feuille de route du protocole](/roadmap/) et [les mises à jour précédentes](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

La prochaine mise à jour Glamsterdam d'[Ethereum](/) est conçue pour ouvrir la voie à la prochaine génération de mise à l'échelle. Glamsterdam tire son nom de la combinaison d'« Amsterdam » (mise à jour de la couche d'exécution, nommée d'après un précédent lieu de Devconnect) et de « Gloas » (mise à jour de la couche de consensus, nommée d'après une étoile).

Suite aux progrès réalisés lors de la mise à jour [Fusaka](/roadmap/fusaka/), Glamsterdam se concentre sur la mise à l'échelle de la couche 1 (l1) en réorganisant la façon dont le réseau traite les transactions et gère sa base de données croissante, mettant fondamentalement à jour la façon dont Ethereum crée et vérifie les blocs.

Alors que Fusaka se concentrait sur des améliorations fondamentales, Glamsterdam fait avancer les objectifs « Scale L1 » et « Scale Blobs » en inscrivant la séparation des tâches entre les différents participants du réseau, et en introduisant des moyens plus efficaces de gérer les données pour préparer l'[état](/glossary/#state) à une parallélisation à haut débit.

Ces améliorations garantissent qu'Ethereum reste rapide, abordable et décentralisé à mesure qu'il gère plus d'activité, tout en maintenant des exigences matérielles gérables pour les personnes exécutant des [nœuds](/glossary/#node) chez elles.

<VideoWatch slug="ethereum-evolution-glamsterdam" />

## Améliorations envisagées pour Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Remarque : Cet article met actuellement en évidence une sélection d'EIP envisagées pour être incluses dans Glamsterdam. D'autres propositions activement testées sur les réseaux de développement (devnets) incluent EIP-7778, EIP-7843, EIP-7976, EIP-7981 et EIP-8024. Pour les dernières mises à jour de statut, consultez la [mise à jour Glamsterdam sur Forkcast](https://forkcast.org/upgrade/glamsterdam).

Si vous souhaitez ajouter une EIP en cours d'examen pour Glamsterdam, mais qui n'a pas encore été ajoutée à cette page, [découvrez comment contribuer à ethereum.org ici](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

La mise à jour Glamsterdam se concentre sur trois objectifs principaux :

- Accélérer le traitement (parallélisation) : Réorganiser la façon dont le réseau enregistre les dépendances de données, afin qu'il puisse traiter en toute sécurité de nombreuses transactions en même temps au lieu d'une séquence lente, une par une.
- Augmenter la capacité : Répartir le gros du travail de création et de vérification de blocs, donnant au réseau plus de temps pour propager de plus grandes quantités de données sans ralentir.
- Prévenir l'encombrement de la base de données (durabilité) : Ajuster les frais du réseau pour refléter avec précision le coût matériel à long terme du stockage de nouvelles données, débloquant les futures augmentations de la limite de gaz tout en empêchant la dégradation des performances matérielles.

En bref, Glamsterdam introduira des changements structurels pour s'assurer qu'à mesure que le réseau augmente sa capacité, il reste durable et que les performances restent élevées.

## Mise à l'échelle de la couche 1 (l1) et traitement parallèle {#scale-l1}

Une mise à l'échelle significative de la couche 1 (l1) nécessite de s'éloigner des hypothèses de confiance hors protocole et des contraintes d'exécution en série. Glamsterdam résout ce problème en inscrivant la séparation de certaines tâches de construction de blocs et en introduisant de nouvelles structures de données qui permettent au réseau de se préparer au traitement parallèle.

### Proposition phare : Séparation proposant-constructeur (PBS) inscrite (ePBS) {#epbs}

- Supprime les hypothèses de confiance hors protocole et la dépendance aux relais tiers
- Soutient la mise à l'échelle de la couche 1 (l1) en permettant des charges utiles beaucoup plus importantes grâce à des fenêtres de propagation étendues
- Introduit des paiements de constructeur sans tiers de confiance directement dans le protocole 
- Nécessite des mises à jour architecturales pour les pools de staking afin de permettre une surveillance sans tiers de confiance, bien que l'expérience utilisateur globale du staking soit améliorée par un processus de sélection de constructeur affiné

Actuellement, le processus de proposition et de construction de blocs comprend un transfert entre les proposants de blocs et les constructeurs de blocs. La relation entre les proposants et les constructeurs ne fait pas partie du protocole Ethereum de base, elle repose donc sur des intergiciels tiers de confiance, des logiciels (relais) et une confiance hors protocole entre les entités.

La relation hors protocole entre les proposants et les constructeurs crée également un « chemin critique » (hot path) lors de la validation de bloc qui oblige les [validateurs](/glossary/#validator) à se précipiter dans la diffusion et l'exécution des transactions dans une fenêtre serrée de 2 secondes, limitant la quantité de données que le réseau peut gérer.

**La séparation proposant-constructeur (PBS) inscrite (ePBS, ou EIP-7732)** sépare formellement le travail du proposant (qui sélectionne le bloc de consensus) de celui du constructeur (qui assemble la charge utile d'exécution), inscrivant ce transfert directement dans le protocole. 

L'intégration de l'échange sans tiers de confiance d'une charge utile de bloc contre un paiement directement dans le protocole supprime le besoin d'intergiciels tiers (comme MEV-Boost). Cependant, les constructeurs et les proposants pourraient toujours choisir d'utiliser des relais ou des intergiciels hors protocole pour des fonctionnalités complexes qui ne font pas encore partie du protocole de base. 

Pour résoudre le goulot d'étranglement du « chemin critique », l'ePBS introduit également le comité de ponctualité de la charge utile (Payload Timeliness Committee - PTC) et une logique à double échéance, permettant aux validateurs d'attester séparément du bloc de consensus et de la ponctualité de la charge utile d'exécution afin de maximiser le débit.

<VideoWatch slug="proposer-builder-separation" />

La séparation des rôles de proposant et de constructeur au niveau du protocole étend la fenêtre de propagation (ou le temps disponible pour diffuser les données sur le réseau) de 2 secondes à environ 9 secondes.

En remplaçant les intergiciels et les relais hors protocole par des mécanismes intégrés au protocole, l'ePBS réduit les dépendances de confiance et permet à Ethereum de traiter en toute sécurité des quantités de données beaucoup plus importantes (comme plus de blobs pour les [couches 2 (l2)](/glossary/#layer-2)) sans surcharger le réseau.

**Ressources** : [Spécification technique de l'EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Proposition phare : Listes d'accès au niveau du bloc (BAL) {#bals}

- Élimine les goulots d'étranglement du traitement séquentiel en fournissant une carte préalable de toutes les dépendances de transaction, préparant le terrain pour que les validateurs traitent de nombreuses transactions en parallèle au lieu d'une par une
- Permet aux nœuds de mettre à jour leurs enregistrements en lisant les résultats finaux sans avoir besoin de rejouer chaque transaction (synchronisation sans exécution), ce qui rend la synchronisation d'un nœud au réseau beaucoup plus rapide
- Élimine les conjectures, permettant aux validateurs de précharger toutes les données nécessaires en une seule fois au lieu de les découvrir étape par étape, ce qui rend la validation beaucoup plus rapide

L'Ethereum d'aujourd'hui est comme une route à voie unique ; parce que le réseau ne sait pas de quelles données une transaction aura besoin ou ce qu'elle modifiera (comme les comptes qu'une transaction touchera) jusqu'à ce qu'une transaction ait été exécutée, les validateurs doivent traiter les transactions une par une dans une ligne stricte et séquentielle. S'ils essayaient de traiter les transactions toutes en même temps, sans connaître ces dépendances, deux transactions pourraient accidentellement essayer de modifier exactement les mêmes données en même temps, provoquant des erreurs.

**Les listes d'accès au niveau du bloc (BAL, ou EIP-7928)** fonctionnent comme une carte pour le réseau, détaillant quelles parties de la base de données seront consultées avant le début du travail. La couche d'exécution stocke la liste complète d'accès au bloc, y compris chaque modification de compte que les transactions toucheront, ainsi que les résultats finaux de ces modifications (tous les accès à l'état et les valeurs post-exécution). Pour garder les blocs légers, l'en-tête de bloc contient un nouveau champ avec une empreinte numérique unique (l'enregistrement de hash) de cette liste.

Parce qu'elles donnent une visibilité instantanée sur les transactions qui ne se chevauchent pas, les BAL permettent aux nœuds d'effectuer des lectures de disque parallèles, récupérant des informations pour de nombreuses transactions simultanément. Le réseau peut regrouper en toute sécurité des transactions non liées et les traiter en parallèle.

Comme la BAL inclut les résultats finaux des transactions (les valeurs post-exécution), lorsque les nœuds du réseau ont besoin de se synchroniser à l'état actuel du réseau, ils peuvent copier ces résultats finaux pour mettre à jour leurs enregistrements. Les validateurs n'ont plus à rejouer toutes les transactions compliquées depuis le début pour savoir ce qui s'est passé, ce qui rend plus rapide et plus facile pour de nouveaux nœuds de rejoindre le réseau.

Les lectures de disque parallèles permises par les BAL constitueront une étape importante vers un avenir où Ethereum pourra traiter de nombreuses transactions à la fois, augmentant considérablement la vitesse du réseau.

#### Échange de liste d'accès au bloc eth/71 {#bale}

L'échange de liste d'accès au bloc (eth/71 ou EIP-8159) est le compagnon réseau direct des listes d'accès au niveau du bloc. Alors que les BAL débloquent l'exécution parallèle, eth/71 met à jour le protocole pair à pair pour permettre aux nœuds de partager réellement ces listes sur le réseau. Désormais requis pour tous les clients de la couche d'exécution, l'échange de liste d'accès au bloc permettra une synchronisation plus rapide et permettra aux nœuds d'effectuer des mises à jour d'état sans exécution.

**Ressources** :

- [Spécification technique de l'EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Spécification technique de l'EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Durabilité du réseau {#network-sustainability}

À mesure que le réseau Ethereum se développe plus rapidement, il est important de s'assurer que le coût de son utilisation correspond à l'usure du matériel qui exécute Ethereum. Le réseau doit augmenter ses limites de capacité globales afin de se mettre à l'échelle en toute sécurité et de traiter plus de transactions.

### Augmentation du coût en gaz de la création d'état {#state-creation-gas-cost-increase}

- Garantit que les frais de création de nouveaux comptes ou de contrats intelligents reflètent avec précision la charge à long terme qu'ils imposent à la base de données d'Ethereum
- Fixe un **coût par octet d'état (CPSB)** fixe ciblant un taux de croissance sûr et prévisible de 120 Gio/an, garantissant que le matériel physique standard peut continuer à faire fonctionner le réseau
- Sépare la comptabilité de ces frais spécifiques dans un nouveau réservoir, supprimant les anciennes limites de transaction et permettant aux développeurs de déployer des applications plus grandes et plus complexes

L'ajout de nouveaux comptes, jetons et [contrats intelligents](/glossary/#smart-contract) crée des données permanentes (connues sous le nom d'« état ») que chaque ordinateur exécutant le réseau doit stocker indéfiniment. Les frais actuels pour ajouter ou lire ces données sont incohérents et ne reflètent pas nécessairement la charge de stockage réelle à long terme qu'ils imposent au matériel du réseau.

Certaines actions qui créent un état sur Ethereum, comme la création de nouveaux comptes ou le déploiement de grands contrats intelligents, ont été relativement peu coûteuses par rapport à l'espace de stockage permanent qu'elles occupent sur les nœuds du réseau, par exemple, le déploiement de contrat est nettement moins cher par octet que la création d'emplacements de stockage.

Sans ajustement, la croissance de l'état d'Ethereum deviendrait insoutenable à mesure que le réseau évolue vers le plancher de limite de gaz de 200M permis par Glamsterdam (les développeurs testant actuellement à une limite de gaz de bloc de référence de 150M pour dériver une tarification d'état précise).

**L'augmentation du coût en gaz de la création d'état (ou EIP-8037)** harmonise les coûts en les liant à la taille réelle des données créées, mettant à jour les frais afin qu'ils soient proportionnels à la quantité de données permanentes qu'une opération crée ou auxquelles elle accède.

L'EIP-8037 introduit également un modèle de réservoir pour gérer ces coûts de manière plus prévisible ; les frais de gaz d'état puisent d'abord dans le `state_gas_reservoir`, et le code d'opération `GAS` ne renvoie que `gas_left`, empêchant les trames d'exécution de mal calculer le gaz disponible. Pour soutenir cela, les tâches de fond essentielles reçoivent une allocation de carburant supplémentaire qui va directement dans cette réserve dédiée, garantissant que les opérations critiques du réseau n'échoueront pas simplement parce que le stockage de données permanentes nécessite plus de ressources.

Avant l'EIP-8037, le travail de calcul (le traitement actif) et le stockage de données permanentes (l'enregistrement du contrat intelligent dans la base de données du réseau) partageaient la même limite de gaz. Le modèle de réservoir sépare la comptabilité : la limite de gaz pour le travail de calcul réel de la transaction (traitement) et pour le stockage de données à long terme (gaz d'état). La séparation des deux aide à empêcher que la taille même des données d'une application ne plafonne la limite de gaz ; tant que les développeurs fournissent suffisamment de fonds pour remplir le réservoir de stockage de données, ils peuvent déployer des contrats intelligents beaucoup plus grands et plus complexes.

Tarifer le stockage de données de manière plus précise et prévisible aidera Ethereum à augmenter en toute sécurité sa vitesse et sa capacité sans encombrer la base de données. Cette durabilité permettra aux opérateurs de nœuds de continuer à utiliser du matériel (relativement) abordable pour les années à venir, gardant le staking à domicile accessible pour maintenir la décentralisation du réseau.

**Ressources** : [Spécification technique de l'EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Mise à jour du coût en gaz de l'accès à l'état {#state-access-gas-cost-update}

- Augmente les coûts en gaz lorsque les applications lisent ou mettent à jour des informations stockées en permanence sur Ethereum (codes d'opération d'accès à l'état) pour correspondre avec précision au travail de calcul que ces commandes nécessitent
- Renforce la résilience du réseau en empêchant les attaques par déni de service qui exploitent des opérations de lecture de données artificiellement bon marché

À mesure que l'état d'Ethereum s'est développé, l'acte de rechercher et de lire d'anciennes données (« accès à l'état ») est devenu plus lourd et plus lent à traiter pour les nœuds. Les frais pour ces actions sont restés les mêmes même s'il est désormais légèrement plus coûteux de rechercher des informations (en termes de puissance de calcul).

En conséquence, certaines commandes spécifiques sont actuellement sous-évaluées par rapport au travail qu'elles obligent un nœud à effectuer. `EXTCODESIZE` et `EXTCODECOPY` sont sous-évalués, par exemple, car ils nécessitent deux lectures de base de données distinctes : une pour l'objet de compte, et une seconde pour la taille réelle du code ou le bytecode.

**La mise à jour du coût en gaz de l'accès à l'état (ou EIP-8038)** augmente les constantes de gaz pour les codes d'opération d'accès à l'état, comme la recherche de données de compte et de contrat, pour s'aligner sur les performances du matériel moderne et la taille de l'état.

L'alignement du coût de l'accès à l'état contribue également à rendre Ethereum plus résilient. Parce que ces lourdes actions de lecture de données sont artificiellement bon marché, un attaquant malveillant pourrait spammer le réseau avec des milliers de requêtes de données complexes dans un seul bloc avant d'atteindre la limite de frais du réseau, provoquant potentiellement le blocage ou le plantage du réseau (une attaque par déni de service). Même sans intention malveillante, les développeurs ne sont pas économiquement encouragés à créer des applications efficaces si la lecture des données du réseau est trop bon marché.

En tarifiant plus précisément les actions d'accès à l'état, Ethereum peut être plus résilient face aux ralentissements accidentels ou intentionnels, tandis que l'alignement des coûts du réseau sur la charge matérielle s'avère être une base plus durable pour les futures augmentations de la limite de gaz.

**Ressources** : [Spécification technique de l'EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Résilience du réseau {#network-resilience}

Les améliorations apportées aux tâches des validateurs et aux processus de sortie garantissent la stabilité du réseau lors d'événements de réduction (slashing) massifs et démocratisent la liquidité. Ces améliorations rendent le réseau plus stable et garantissent que tous les participants, grands et petits, sont traités équitablement.

### Exclure les validateurs sanctionnés de la proposition {#exclude-slashed-validators}

- Empêche les validateurs pénalisés (sanctionnés par une réduction) d'être sélectionnés pour proposer de futurs blocs, éliminant ainsi les créneaux manqués garantis
- Maintient le fonctionnement fluide et fiable d'Ethereum, empêchant les blocages graves en cas d'événement de réduction massif

Actuellement, même si un validateur subit une réduction (pénalisé pour avoir enfreint les règles ou ne pas avoir fonctionné comme prévu), le système pourrait toujours le choisir pour diriger un bloc dans un avenir proche lorsqu'il génère de futures prévisions de proposants.

Parce que les blocs des proposants sanctionnés sont automatiquement rejetés comme invalides, cela amène le réseau à manquer des créneaux et retarde la récupération du réseau lors d'événements de réduction massifs.

**L'exclusion des validateurs sanctionnés de la proposition (ou EIP-8045)** filtre simplement les validateurs sanctionnés pour qu'ils ne soient pas sélectionnés pour de futures tâches. Cela améliore la résilience de la chaîne en garantissant que seuls les validateurs sains sont sélectionnés pour proposer des blocs, maintenant la qualité de service pendant les perturbations du réseau.

**Ressources** : [Spécification technique de l'EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Permettre aux sorties d'utiliser la file d'attente de consolidation {#let-exits-use-the-consolidation-queue}

- Comble une faille qui permet aux validateurs à solde élevé de quitter le réseau plus rapidement que les petits validateurs via la file d'attente de consolidation
- Permet aux sorties régulières de déborder dans cette deuxième file d'attente lorsqu'elle a de la capacité de réserve, réduisant les temps de retrait de staking pendant les périodes de fort volume
- Maintient une sécurité stricte pour éviter de modifier les limites de sécurité de base d'Ethereum ou d'affaiblir le réseau

Depuis que la [mise à jour Pectra](/roadmap/pectra) a augmenté le solde effectif maximum pour les validateurs Ethereum de 32 ETH à 2 048 ETH, une faille technique permet aux validateurs à solde élevé de quitter le réseau plus rapidement que les petits validateurs via la file d'attente de consolidation.

**Permettre aux sorties d'utiliser la file d'attente de consolidation (ou EIP-8080)** démocratise la file d'attente de consolidation pour toutes les sorties de staking, créant une ligne unique et équitable pour tous.

Pour détailler comment cela fonctionne aujourd'hui :

- La limite de churn d'Ethereum est une limite de sécurité sur la vitesse à laquelle les validateurs peuvent entrer, sortir ou fusionner (consolider) leurs ETH stakés, pour s'assurer que la sécurité du réseau n'est jamais déstabilisée
- Parce qu'une consolidation de validateur est une action plus lourde avec plus de pièces mobiles qu'une sortie de validateur standard, elle consomme une plus grande partie de ce budget de sécurité (limite de churn)
- Plus précisément, le protocole dicte que le coût de sécurité exact d'une sortie standard est de deux tiers (2/3) du coût d'une consolidation

Des files d'attente de sortie plus équitables permettront aux sorties standards d'emprunter de l'espace inutilisé à la file d'attente de consolidation pendant les périodes de forte demande de sortie, en appliquant un taux de change de « 3 pour 2 » (pour chaque 2 places de consolidation inutilisées, le réseau peut traiter en toute sécurité 3 sorties standards). Ce facteur de churn de 3/2 équilibre la demande entre les files d'attente de consolidation et de sortie.

La démocratisation de l'accès à la file d'attente de consolidation augmentera la vitesse à laquelle les utilisateurs peuvent retirer leur mise pendant les périodes de forte demande jusqu'à 2,5 fois, sans compromettre la sécurité du réseau.

**Ressources** : [Spécification technique de l'EIP-8080](https://eips.ethereum.org/EIPS/eip-8080)

## Améliorer l'expérience utilisateur et développeur {#improve-user-developer-experience}

La mise à jour Glamsterdam d'Ethereum vise à améliorer l'expérience utilisateur, à améliorer la découvrabilité des données et à gérer l'augmentation de la taille des messages pour éviter les échecs de synchronisation. Cela facilite le suivi de ce qui se passe onchain tout en évitant les problèmes techniques à mesure que le réseau évolue.

### Réduire les coûts en gaz intrinsèques des transactions {#reduce-intrinsic-transaction-gas-costs}

- Abaisse les frais de base pour les transactions, réduisant le coût global d'un simple paiement natif en ETH
- Rend les petits transferts plus abordables, stimulant la viabilité d'Ethereum en tant que moyen d'échange courant

Toutes les transactions Ethereum ont aujourd'hui des frais de gaz de base fixes, quelle que soit leur simplicité ou leur complexité de traitement. **La réduction du gaz intrinsèque des transactions (ou EIP-2780)** propose de réduire ces frais de base pour rendre un transfert standard d'ETH entre des comptes existants jusqu'à **71 % moins cher**.

La réduction du gaz intrinsèque des transactions fonctionne en décomposant les frais de transaction pour ne refléter que le travail de base et essentiel que les ordinateurs exécutant le réseau effectuent réellement, comme la vérification d'une signature numérique et la mise à jour d'un solde. Parce qu'un paiement de base en ETH n'exécute pas de code complexe ni ne transporte de données supplémentaires, cette proposition réduirait ses frais pour correspondre à son empreinte légère.

La proposition introduit une exception pour la création de tout nouveaux comptes afin d'éviter que des frais moins élevés ne submergent l'état du réseau. Si un transfert envoie des ETH à une adresse vide et inexistante, le réseau doit créer un nouvel enregistrement permanent pour celle-ci. Une surcharge de gaz est ajoutée pour cette création de compte afin d'aider à couvrir sa charge de stockage à long terme.

Ensemble, l'EIP-2780 vise à rendre les transferts quotidiens entre les comptes existants plus abordables tout en garantissant que le réseau est toujours protégé contre l'encombrement de la base de données en tarifiant avec précision la véritable croissance de l'état.

**Ressources** : [Spécification technique de l'EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Pré-déploiement d'usine déterministe {#deterministic-factory-predeploy}

- Donne aux développeurs un moyen natif de déployer des applications et des portefeuilles de contrats intelligents à la même adresse exacte sur plusieurs chaînes
- Permet aux utilisateurs d'avoir la même adresse de portefeuille intelligent sur plusieurs réseaux de couche 2 (l2), réduisant la charge cognitive, réduisant la confusion et réduisant le risque de perte accidentelle de fonds
- Remplace les solutions de contournement que les développeurs utilisent actuellement pour atteindre cette parité, rendant plus facile et plus sûr la création de portefeuilles et d'applications inter-chaînes

Si un utilisateur possède aujourd'hui un portefeuille de contrat intelligent avec des comptes sur plusieurs chaînes compatibles avec la machine virtuelle Ethereum (EVM), il se retrouve souvent avec une adresse complètement différente sur différents réseaux. Ce n'est pas seulement déroutant, mais cela peut entraîner une perte accidentelle de fonds.

**Le pré-déploiement d'usine déterministe (ou EIP-7997)** donne aux développeurs un moyen natif et intégré de déployer leurs applications décentralisées et leurs portefeuilles de contrats intelligents à la même adresse exacte sur plusieurs chaînes EVM, y compris le réseau principal Ethereum, les réseaux de couche 2 (l2), et plus encore. S'il est adopté, il permettrait à l'utilisateur d'avoir exactement la même adresse sur chaque chaîne participante, réduisant considérablement la charge cognitive et le potentiel d'erreur de l'utilisateur.

Le pré-déploiement d'usine déterministe fonctionne en plaçant de manière permanente un programme d'usine minimal et spécialisé à un emplacement identique (plus précisément, l'adresse 0x12) sur chaque chaîne compatible EVM participante. Son objectif est de fournir un contrat d'usine universel et standard qui peut être adopté par n'importe quel réseau compatible EVM ; tant qu'une chaîne EVM participe et adopte cette norme, les développeurs pourront l'utiliser pour déployer leurs contrats intelligents à la même adresse exacte sur ce réseau.

Cette normalisation simplifie la création et la gestion d'applications inter-chaînes pour les développeurs et l'écosystème au sens large. Les développeurs n'ont plus à créer de code personnalisé spécifique à la chaîne pour lier leurs logiciels entre différents réseaux, utilisant plutôt cette usine universelle pour générer exactement la même adresse pour leur application partout. De plus, les explorateurs de blocs, les services de suivi et les portefeuilles peuvent plus facilement identifier et lier ces applications et comptes sur diverses chaînes, créant un environnement multi-chaînes plus unifié et transparent pour tous les participants basés sur Ethereum.

**Ressources** : [Spécification technique de l'EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### Les transferts et les destructions d'ETH émettent un journal {#eth-transfers-and-burns-emit-a-log}

- Génère automatiquement un enregistrement permanent (journal) chaque fois que de l'ETH est transféré ou détruit (brûlé)
- Corrige un angle mort historique qui permet aux applications, aux échanges et aux ponts de détecter de manière fiable les dépôts des utilisateurs sans outils de traçage ad hoc

Contrairement aux jetons (ERC-20), les transferts réguliers d'ETH entre les contrats intelligents n'émettent pas de reçu clair (journal standard), ce qui les rend difficiles à suivre pour les échanges et les applications.

Les transferts et les destructions d'ETH émettent un journal (ou EIP-7708) rend obligatoire pour le réseau d'émettre un événement de journal standard chaque fois qu'une quantité non nulle d'ETH est déplacée ou détruite.

Cela rendra beaucoup plus facile et plus fiable pour les portefeuilles, les échanges et les opérateurs de ponts de suivre avec précision les dépôts et les mouvements sans outils personnalisés.

**Ressources** : [Spécification technique de l'EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### Listes partielles de reçus de bloc eth/70 {#eth-70-partial-block-receipt-lists}

À mesure que nous augmentons la quantité de travail qu'Ethereum peut effectuer, les listes de reçus pour ces actions (les enregistrements de données de ces transactions) deviennent si volumineuses qu'elles pourraient potentiellement provoquer la défaillance des nœuds du réseau lors de la tentative de synchronisation des données entre eux.

Désormais une exigence pour tous les clients de la couche d'exécution, les listes partielles de reçus de bloc eth/70 (ou EIP-7975) introduisent une nouvelle façon pour les nœuds de se parler (eth/70) qui permet de diviser ces grandes listes en morceaux plus petits et plus gérables. eth/70 introduit un système de pagination pour le protocole de communication du réseau qui permet aux nœuds de décomposer les listes de reçus de bloc et de demander en toute sécurité les données en morceaux plus petits et plus gérables.

Ce changement empêcherait les échecs de synchronisation du réseau pendant les périodes de forte activité. En fin de compte, cela ouvre la voie à Ethereum pour augmenter sa capacité de bloc et traiter plus de transactions par bloc à l'avenir, sans surcharger le matériel physique synchronisant la chaîne.

**Ressources** : [Spécification technique de l'EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Lectures complémentaires {#further-reading}

- [Feuille de route d'Ethereum](/roadmap/)
- [Forkcast : Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Méta EIP Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Annonce sur le blog de la mise à jour des priorités du protocole pour 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podcast The Daily Gwei Refuel - Ethereum post-quantique, Glamsterdam arrive](https://www.youtube.com/watch?v=qx9sd50uQjQ)

## FAQ {#faq}

### Comment les ETH peuvent-ils être convertis après le hard fork Glamsterdam ? {#how-can-eth-be-converted-after-the-hardfork}

- **Aucune action requise pour vos ETH** : Il n'est pas nécessaire de convertir ou de mettre à jour vos ETH suite à la mise à jour Glamsterdam. Les soldes de vos comptes resteront les mêmes, et les ETH que vous détenez actuellement resteront accessibles dans leur forme existante après le hard fork.
- **Méfiez-vous des arnaques !** <Emoji text="⚠️" /> **toute personne vous demandant de « mettre à jour » vos ETH essaie de vous arnaquer.** Vous n'avez rien à faire en rapport avec cette mise à jour. Vos actifs resteront totalement inchangés. N'oubliez pas que rester informé est la meilleure défense contre les arnaques.

[En savoir plus sur la reconnaissance et l'évitement des arnaques](/security/)

### La mise à jour Glamsterdam affecte-elle tous les nœuds et validateurs Ethereum ? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Oui, la mise à jour Glamsterdam nécessite des mises à jour à la fois des [clients d'exécution et des clients de consensus](/developers/docs/nodes-and-clients/). Parce que cette mise à jour introduit la séparation proposant-constructeur (PBS) inscrite (ePBS), les opérateurs de nœuds devront s'assurer que leurs clients sont mis à jour pour gérer les nouvelles façons dont les blocs sont construits, validés et attestés par le réseau.

Tous les principaux clients Ethereum publieront des versions prenant en charge le hard fork marquées comme haute priorité. Vous pouvez vous tenir au courant de la disponibilité de ces versions dans les dépôts GitHub des clients, leurs [canaux Discord](https://ethstaker.org/support), le [Discord EthStaker](https://dsc.gg/ethstaker), ou en vous abonnant au blog Ethereum pour les mises à jour du protocole.

Pour maintenir la synchronisation avec le réseau Ethereum après la mise à jour, les opérateurs de nœuds doivent s'assurer qu'ils exécutent une version de client prise en charge. Notez que les informations sur les versions des clients sont sensibles au temps, et les utilisateurs doivent se référer aux dernières mises à jour pour les détails les plus récents.

### En tant que staker, que dois-je faire pour la mise à jour Glamsterdam ? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Comme pour chaque mise à jour du réseau, assurez-vous de mettre à jour vos clients vers les dernières versions marquées avec la prise en charge de Glamsterdam. Suivez les mises à jour dans la liste de diffusion et les [annonces de protocole sur le blog de l'EF](https://blog.ethereum.org/category/protocol) pour être informé des versions.

Pour valider votre configuration avant que Glamsterdam ne soit activé sur le réseau principal (Mainnet), vous pouvez exécuter un validateur sur les réseaux de test. Les forks de réseau de test sont également annoncés dans la liste de diffusion et le blog.

### Quelles améliorations Glamsterdam inclura-t-elle pour la mise à l'échelle de la couche 1 (l1) ? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

La fonctionnalité phare est l'ePBS (EIP-7732), qui sépare la lourde tâche de validation des transactions du réseau de la tâche d'atteindre un consensus. Cela étend la fenêtre de propagation des données de 2 secondes à environ 9 secondes, débloquant la capacité d'Ethereum à gérer en toute sécurité un débit de transaction beaucoup plus élevé et à accueillir plus de blobs de données pour les réseaux de couche 2 (l2).

### Glamsterdam réduira-t-elle les frais sur Ethereum (couche 1) ? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Oui, Glamsterdam réduira très probablement les frais pour les utilisateurs quotidiens ! La réduction du gaz intrinsèque des transactions (ou EIP-2780) réduit les frais de base pour l'envoi d'ETH, rendant l'ETH beaucoup moins cher à utiliser pour les paiements quotidiens.

De plus, pour une durabilité à long terme, Glamsterdam introduit les listes d'accès au niveau du bloc (BAL). Cela permet un traitement parallèle et prépare la couche 1 (l1) à gérer en toute sécurité des limites de gaz globales plus élevées à l'avenir, ce qui réduira probablement les coûts en gaz par transaction à mesure que la capacité augmentera.

### Y aura-t-il des changements à mes contrats intelligents existants après Glamsterdam ? {#will-my-smart-contracts-change}

Les contrats existants continueront de fonctionner normalement après Glamsterdam. Les développeurs obtiendront probablement plusieurs nouveaux outils et devraient revoir leur utilisation de gaz :

- L'augmentation de la taille maximale du contrat (ou EIP-7954) permet aux développeurs de déployer des applications plus grandes, augmentant la limite de taille maximale du contrat d'environ 24 Kio à 32 Kio.
- Le pré-déploiement d'usine déterministe (ou EIP-7997) introduit un contrat d'usine universel et intégré. Il permet aux développeurs de déployer leurs applications et leurs portefeuilles de contrats intelligents à la même adresse exacte sur toutes les chaînes EVM participantes.
- Si votre application s'appuie sur un traçage complexe pour trouver les transferts d'ETH, les transferts et les destructions d'ETH émettent un journal (ou EIP-7708) vous permettra de passer à l'utilisation de journaux pour une comptabilité plus simple et plus fiable.
- L'augmentation du coût en gaz de la création d'état (ou EIP-8037) et la mise à jour du coût en gaz de l'accès à l'état (ou EIP-8038) introduisent de nouveaux modèles de durabilité qui modifieront certains coûts de déploiement de contrat, car la création de nouveaux comptes ou d'un stockage permanent aura de nouveaux frais fixes standardisés basés sur la taille des données créées.

### Comment Glamsterdam affectera-t-elle le stockage des nœuds et les exigences matérielles ? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Plusieurs EIP en cours d'examen pour Glamsterdam s'attaquent à la chute des performances liée à la croissance de l'état :

- L'augmentation du coût en gaz de la création d'état (ou EIP-8037) introduit un cadre à coût fixe (CPSB) pour cibler un taux de croissance de la base de données d'état de 120 Gio/an, garantissant que le matériel physique standard peut continuer à faire fonctionner le réseau efficacement.
- Les listes partielles de reçus de bloc eth/70 (ou EIP-7975) permettent aux nœuds de demander des reçus de bloc paginés, ce qui divise les listes de reçus de bloc lourdes en données en morceaux plus petits pour éviter les plantages et les problèmes de synchronisation à mesure qu'Ethereum évolue.