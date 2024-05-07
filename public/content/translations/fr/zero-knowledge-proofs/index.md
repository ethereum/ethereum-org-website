---
title: La preuve à divulgation nulle de connaissance
description: Une introduction non technique aux preuves à divulgation nulle pour les débutants.
lang: fr
---

## En quoi consistent les preuves à divulgation nulle de connaissance ? {#what-are-zk-proofs}

Une preuve à divulgation nulle est un moyen de prouver la validité d'une information sans révéler l'information elle-même. Le « prouveur » est la partie qui tente de prouver une affirmation, tandis que le « vérificateur » est responsable de la validation de l'affirmation.

Les preuves à divulgation nulle sont apparues pour la première fois dans un article publié en 1985, "[La complexité de connaissance des systèmes interactifs de preuve](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)" qui fournit une définition des preuves à divulgation nulle largement utilisée aujourd'hui :

> Un protocole à divulgation nulle est une méthode par laquelle une partie (le prouveur) peut prouver à une autre partie (le vérificateur) qu'une chose est vraie, sans révéler aucune autre information que la véracité de la déclaration.

Au fil des années, les preuves à divulgation nulle se sont améliorées et sont maintenant utilisées dans plusieurs applications concrètes.

## Pourquoi avons-nous besoin des preuves à divulgation nulle de connaissance ? {#why-zero-knowledge-proofs-are-important}

Les preuves à divulgation nulle furent une avancée importante dans l'histoire de la cryptographie appliquée, promettant d'améliorer la sécurité des informations pour les individus. Imaginez la façon dont vous pourriez prouver une affirmation (par ex. « Je suis citoyen de Tel pays ») à une autre partie (par ex. un fournisseur de services). Vous devrez fournir une « preuve » pour étayer votre déclaration, comme un passeport national ou un permis de conduire.

Mais cette approche implique un certain nombre de problèmes, notamment le manque de respect de la vie privée. Les données personnelles identifiables (PII) partagées avec des services tiers sont stockées dans des bases de données centrales, vulnérables aux piratages. Le vol d’identité devenant un problème critique, des voix s'élèvent pour réclamer davantage de moyens de protection de la vie privée dans le partage d'informations sensibles.

Les preuves à divulgation nulle résolvent ce problème en éliminant la nécessité de révéler des informations pour prouver la validité d'une réclamation. Le protocole à divulgation nulle utilise une déclaration (appelée « témoin ») comme base de génération d'une preuve succincte de sa validité. Cette preuve donne de fortes garanties qu'une déclaration est vraie sans révéler les informations utilisées pour la créer.

Pour en revenir à l'exemple précédent, la seule chose dont vous avez besoin pour prouver votre citoyenneté est une preuve à divulgation nulle. Le vérificateur doit seulement vérifier si certaines propriétés de la preuve sont vraies pour être convaincu que la déclaration sous-jacente est également vraie.

## Comment fonctionnent les preuves à divulgation nulle de connaissance ? {#how-do-zero-knowledge-proofs-work}

Une preuve à divulgation nulle vous permet de prouver la véracité d'une affirmation sans devoir en partager le contenu ni révéler la manière dont vous avez découvert la vérité. Pour ce faire, les protocoles à divulgation nulle reposent sur des algorithmes qui reçoivent certaines données en entrée et renvoient « vrai » ou « faux » en sortie.

Un protocole à divulgation nulle doit satisfaire aux critères suivants :

1. **Complétude** : Si l'entrée est valide, le protocole à divulgation nulle renvoie toujours « vrai ». Par conséquent, si la déclaration sous-jacente est vraie, et que le prouveur et le vérificateur agissent honnêtement, la preuve peut être acceptée.

2. **Validité** : Si l'entrée est invalide, il est théoriquement impossible de tromper le protocole à divulgation nulle pour qu'il renvoie la valeur 'vrai'. Ainsi, un prouveur malhonnête ne peut tromper un vérificateur honnête en lui faisant croire qu'une déclaration invalide est valide (sauf avec une infime marge de probabilité).

3. **Divulgation nulle** : Le vérificateur n'apprend rien de plus concernant une déclaration que sa validité ou sa fausseté (ils ont une "connaissance nulle" de l'affirmation). Cette condition empêche également le vérificateur de déduire l'information originale (le contenu de la déclaration) à partir de la preuve.

De manière générale, une preuve à divulgation nulle est composée de trois éléments : **le témoin**, **l'interrogatoire**, et **la réponse**.

- **Le témoin** : Dans le cas d'une preuve à divulgation nulle de connaissance, le prouveur veut prouver qu'il connaît certaines informations cachées. L'information secrète est le "témoin" de la preuve, et la connaissance supposée du témoin par le prouveur établit un ensemble de questions auxquelles seule une partie connaissant les informations peut répondre. Le prouveur commence donc le processus de preuve en choisissant aléatoirement une question, en calculant la réponse, et en l'envoyant au vérificateur.

- **Interrogatoire** : Le vérificateur choisit ensuite aléatoirement une autre question dans l'ensemble et demande au prouveur d'y répondre.

- **Réponse** : Le prouveur accepte la question, calcule la réponse et la renvoie au vérificateur. La réponse du prouveur permet au vérificateur de vérifier si le prouveur a réellement accès au témoin. Pour s'assurer que le prouveur ne devine pas à l'aveuglette et n'obtient pas les bonnes réponses par hasard, le vérificateur choisit davantage de questions à poser. En répétant cette interaction de nombreuses fois, la possibilité pour le prouveur de simuler la connaissance du témoin diminue significativement jusqu'à ce que le vérificateur soit satisfait.

La partie ci-dessus décrit la structure d’une ‘preuve à divulgation nulle de connaissance interactive’. Les premiers protocoles à divulgation nulle utilisaient des preuves interactives, où la vérification de la validité d'une déclaration nécessitait une communication réciproque entre prouveurs et vérificateurs.

Un bon exemple qui illustre le fonctionnement des preuves interactives est la célèbre histoire de la caverne d'Ali Baba de Jean-Jacques Quisquater, disponible sur la page Wikipédia suivante : [lien](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave). Dans l'histoire, Peggy (la prouveuse) veut prouver à Victor (le vérificateur) qu'elle connaît la phrase secrète pour ouvrir une porte magique sans révéler la phrase.

### Preuves à divulgation nulle non interactives {#non-interactive-zero-knowledge-proofs}

Bien que révolutionnaire, les preuves interactives n'avaient qu'une utilité limitée car les deux parties devaient nécessairement être disponibles et interagir de manière répétée. Même si le vérificateur était convaincu de l'honnêteté du prouveur, la preuve était indisponible pour une vérification indépendante (le calcul d'une nouvelle preuve nécessitait un nouvel ensemble de messages entre le prouveur et le vérificateur).

Pour résoudre ce problème, Manuel Blum, Paul Feldman et Silvio Micali ont proposé les premières [preuves à connaissance nulle non interactives](https://dl.acm.org/doi/10.1145/62212.62222) où le prouveur et le vérificateur disposent d'une clé partagée. Cela permet au prouveur de démontrer sa connaissance de certaines informations (c'est-à-dire, le témoin) sans fournir les informations elles-mêmes.

Contrairement aux preuves interactives, les preuves ** non** interactives ne nécessitent qu'un seul échange entre les participants (le prouveur et le vérificateur). Le prouveur transmet l'information secrète à un algorithme spécial pour calculer une preuve à connaissance nulle. Cette preuve est envoyée au vérificateur, qui vérifie que le prouveur connaît les informations secrètes à l'aide d'un autre algorithme.

Les preuves non interactives réduisent les communications entre le prouveur et le vérificateur, rendant les preuves à divulgation nulle plus efficaces. De plus, une fois générée, la preuve est disponible à toute personne (ayant accès à la clé partagée et à l'algorithme de vérification) souhaitant effectuer la vérification.

Les preuves non interactives ont constitué une véritable percée dans la technologie de la connaissance nulle et ont encouragé le développement des systèmes de preuve utilisés aujourd'hui. Nous abordons ce type de preuves ci-dessous:

### Types de preuves à divulgation nulle {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK est l'acronyme de ** "Zero-Knowledge Succinct Non-Interactive Argument of Knowledge"**. En français, on utilise souvent l'acronyme "ZK-SNARK" tel quel, mais on peut également le traduire en "preuve succincte non interactive à divulgation nulle" ou "argument de divulgation nulle succinct non interactif". Le protocole ZK-SNARK possède les qualités suivantes :

- **Connaissance nulle** : Un vérificateur peut valider l'intégrité d'une déclaration sans ne rien savoir d'autre de cette déclaration. La seule connaissance que le vérificateur a de la déclaration est celle de savoir si elle est vraie ou fausse.

- **Succinct** : La preuve à divulgation nulle de connaissance est plus petite que le témoin et peut être vérifiée rapidement.

- **Non-interactif** : La preuve est « non interactive » car le prouveur et le vérificateur n'interagissent qu'une seule fois, contrairement aux preuves interactives nécessitant plusieurs étapes de communication.

- **Argument** : La preuve satisfait à l'exigence de 'crédibilité', de sorte que la triche est extrêmement improbable.

- **(de) Connaissance**: La preuve à divulgation nulle de connaissance ne peut être construite sans accès aux informations secrètes (témoin). Il est difficile, voire impossible, au prouveur ne disposant pas du témoin, de créer une preuve valable à divulgation nulle.

La « clé partagée » mentionnée précédemment fait référence à des paramètres publics que le prouveur et le vérificateur acceptent d’utiliser pour générer et vérifier les preuves. La génération des paramètres publics (collectivement appelés Common Reference String (CRS)) est une opération sensible en raison de son importance du point de vue de la sécurité du protocole. Si l'entropie (l'aléa) utilisée pour générer le CRS tombe dans les mains d'un prouveur malhonnête, celui-ci peut fabriquer de fausses preuves.

[Le Calcul Sécurisé Multi-parties (CSMP)](https://fr.wikipedia.org/wiki/Calcul_s%C3%A9curis%C3%A9_multi-parties) est une façon de réduire les risques liés à la génération des paramètres publics. Plusieurs parties participent à une [cérémonie de configuration de confiance](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), où chaque personne fournit des valeurs aléatoires pour générer le CRS. Tant qu'une partie honnête détruit sa part d'entropie, le protocole ZK-SNARK conserve sa validité sur le plan du calcul.

Les configurations de confiance nécessitent des utilisateurs qui se fient aux participants dans la génération des paramètres. Cependant, le développement de ZK-STARKs a permis la création de protocoles de preuve qui fonctionnent sans configuration de confiance (ou « setup ») préalable.

#### ZK-STARKs {#zk-starks}

ZK-STARK est un acronyme pour **Zero-Knowledge Scalable Transparent Argument of Knowledge**. ("preuve évolutive transparente à divulgation nulle"). Les ZK-STARKs sont similaires aux ZK-SNARKs, sauf qu'ils sont:

- **Évolutifs** : ZK-STARK est plus rapide que ZK-SNARK pour générer et vérifier des preuves avec un témoin de taille plus importante. Avec les preuves STARK, les temps de preuve et de vérification n'augmentent que légèrement lorsque le témoin (witness) augmente (tandis que pour les SNARK ils augmentent linéairement selon la taille du témoin).

- **Transparents**: Contrairement à ZK-SNARK (qui se base sur une configuration de confiance), ZK-STARK repose sur un aléa publiquement vérifiable pour générer les paramètres publics de preuve et de vérification.  Ainsi, ils sont plus transparents que les ZK-SNARKs.

Les ZK-STARKs produisent des preuves plus volumineuses que les ZK-SNARKs, engendrant des frais de vérification généralement plus élevés. Cependant, il y a des cas (comme la preuve de grands ensembles de données) où les ZK-STARKs peuvent être plus intéressants que les ZK-SNARKs.

## Cas d'utilisation des preuves à divulgation nulle de connaissance {#use-cases-for-zero-knowledge-proofs}

### Paiements anonymes {#anonymous-payments}

Les paiements par carte de crédit sont souvent visibles pour plusieurs parties, y compris le fournisseur de paiements, les banques et les autres parties intéressées (par exemple, les autorités gouvernementales). Bien que la surveillance financière ait des avantages à identifier les activités illégales, elle sape également la vie privée des citoyens ordinaires.

Les cryptomonnaies étaient destinées à fournir aux utilisateurs un moyen de réaliser des transactions privées, entre pairs. Mais la plupart des transactions de cryptomonnaies sont ouvertement visibles sur les blockchains publics. Les identités des utilisateurs sont souvent des pseudonymes et se trouvent volontairement liées à des identités du monde réel (par exemple, en incluant des adresses ETH sur des profils Twitter ou GitHub), ou peuvent être associées à des identités du monde réel en utilisant une analyse de base de données à la fois en chaîne et hors chaîne.

Il existe des "crypto-monnaies anonymes" spécialement conçues pour des transactions complètement anonymes. Les blockchains axées sur la confidentialité, telles que Zcash et Monero, protègent les détails des transactions, y compris les adresses de l'expéditeur/du destinataire, le type d'actif, la quantité et la chronologie de la transaction.

En injectant dans le protocole une technologie à divulgation nulle, les réseaux blockchain axés sur la confidentialité permettent aux nœuds de valider les transactions sans avoir besoin d'accéder aux données de transaction.

Les preuves à divulgation nulle de connaissance sont également utilisées pour anonymiser les transactions sur les blockchains publiques. C'est le cas de Tornado Cash, un service décentralisé et non-custodial (qui n'a pas le contrôle direct sur les fonds ou les actifs de l'utilisateur) qui permet aux utilisateurs d'effectuer des transactions privées sur Ethereum. Tornado Cash utilise des preuves à divulgation nulle pour masquer les détails de la transaction et garantir la confidentialité financière. Malheureusement, étant donné qu'il s'agit d'outils de protection de la vie privée, ils sont associés à des activités illicites. Pour surmonter cela, la confidentialité doit devenir la valeur par défaut sur les blockchains publiques.

### Protection de l'identité {#identity-protection}

Les systèmes actuels de gestion de l'identité mettent en péril les renseignements personnels. Les preuves à divulgation nulle peuvent aider les individus à valider leur identité tout en protégeant leurs données personnelles.

Les preuves à divulgation nulle sont particulièrement utiles dans un contexte de [décentralisation de l'identité](/decentralized-identity). La décentralisation de l'identité (également appelée "'identité auto-souveraine") donne à l'individu la possibilité de contrôler l'accès à ses données personnelles. Prouver votre citoyenneté sans révéler les détails de vos documents d'identité est un bon exemple de la manière dont la technologie de la preuve à divulgation nulle de connaissance permet une décentralisation de l'identité.

### Authentification {#authentication}

L'utilisation de services en ligne exige de prouver votre identité et votre droit d'accéder à ces plateformes. Pour cela, il faut souvent fournir quelques informations personnelles, telles que le nom, l'adresse électronique, la date de naissance, etc. Vous pourriez également avoir besoin de retenir de long mot de passe, sous peine de perdre votre accès à la plateforme.

Toutefois, les preuves à divulgation nulle permettent de simplifier l'authentification, aussi bien pour les plateformes que pour les utilisateurs. Ainsi, une fois qu'une preuve à divulgation nulle a été générée en utilisant, d'une part des entrées publiques (par exemple des données attestant de l'adhésion de l'usager de la plateforme), et d'autre part des entrées privées (par exemple les renseignements sur le client de la plateforme), l'usager peut alors simplement se servir de cette preuve pour confirmer son identité lorsqu'il a besoin d'accéder au service. Cela permet d'améliorer l'expérience des utilisateurs et de libérer les organisations de la nécessité de stocker d'énormes quantités d'informations sur les utilisateurs.

### Calcul vérifiable {#verifiable-computation}

Le calcul vérifiable est une autre application de la technologie à divulgation nulle destinée à améliorer les conceptions de la blockchain. Le calcul vérifiable nous permet de sous-traiter le calcul à une autre entité tout en maintenant des résultats vérifiables. L'entité soumet le résultat ainsi qu'une preuve attestant que le programme a été exécuté correctement.

Le calcul vérifiable est essentiel pour améliorer les vitesses de traitement sur les blockchains sans pour autant réduire la sécurité. Pour comprendre cela, il faut connaître les différences entre les différentes solutions proposées pour l'évolutivité d'Ethereum.

[Les solutions d'évolutivité en chaîne](/developers/docs/scaling/#on-chain-scaling), telles que la fragmentation, nécessitent une modification extensive de la couche de base de la blockchain. Cependant, cette approche est très complexe et les erreurs de mise en œuvre peuvent compromettre le modèle de sécurité d'Ethereum.

[Les solutions d'évolutivité hors chaîne](/developers/docs/scaling/#off-chain-scaling) ne nécessitent pas de refonte du protocole Ethereum de base. Elles s'appuient plutôt sur un modèle de calcul externalisé afin d'améliorer le débit sur la couche de base d'Ethereum.

Voici comment les choses fonctionnent dans la pratique :

- Plutôt que de traiter chaque transaction, Ethereum en confie l'exécution à une chaîne séparée.

- Après le traitement de ces transactions, l'autre chaîne retourne les résultats pour qu'ils soient appliqués à l'état d'Ethereum.

Cela a pour avantage d'exonérer Ethereum de toute exécution des tâches. Ethereum a seulement besoin d'appliquer les résultats du calcul externe à son état. Cela réduit la congestion du réseau et améliore les vitesses de transaction (les protocoles hors chaîne sont optimisés pour une exécution plus rapide).

La chaîne a besoin d'un moyen de valider les transactions hors chaîne sans les ré-exécuter, sans quoi la valeur de l'exécution hors chaîne serait perdue.

C'est ici que le calcul vérifiable entre en jeu. En effet, lorsqu'un nœud exécute une transaction en dehors d'Ethereum, il soumet une preuve à divulgation nulle pour prouver la justesse de l'exécution hors chaîne. Cette preuve (appelée [preuve de validation](/glossary/#validity-proof)) garantit la validité d'une transaction, permettant ainsi à Ethereum d'appliquer le résultat obtenu à son état, cela sans aucune contestation possible.

[Les ZK-Rollups](/developers/docs/scaling/zk-rollups) et [ les validiums](/developers/docs/scaling/validium/) sont deux solutions d'évolutivité hors chaîne qui utilisent des preuves de validité pour fournir une évolutivité sécurisée. Ces protocoles exécutent des milliers de transactions hors chaîne et soumettent des preuves pour vérification sur Ethereum. Ces résultats peuvent être appliqués immédiatement une fois la preuve vérifiée, permettant ainsi à Ethereum de traiter plus de transactions, sans augmenter le calcul sur la couche de base.

### Réduire la corruption et la collusion lors du vote en chaîne {#secure-blockchain-voting}

Les systèmes de vote de la blockchain ont de nombreuses caractéristiques favorables : ils sont entièrement auditables, blindés contre les attaques, résistants à la censure et exempts de contraintes géographiques. Mais même les systèmes de vote en chaîne ne sont pas immunisés contre le problème de la **collusion**.

Défini comme "entente visant à limiter la libre concurrence par le trucage, la fraude, et en trompant les autres", la collusion peut prendre la forme d'un individu malveillant influant sur le vote d'autrui en lui offrant des pots-de-vin. Par exemple Alice pourrait recevoir un pot-de-vin de Bob pour voter pour l'`option B` sur un bulletin même si elle préfère l'`option A`.

La corruption et la collusion limitent l'efficacité de tout processus utilisant le système de vote comme mécanisme de positionnement (en particulier lorsque les usagers peuvent révéler comment ils ont voté). Cela peut avoir des conséquences significatives, en particulier lorsque les votes déterminent l'affectation de ressources limitées.

Par exemple, [les mécanismes de financement quadratiques](https://www.radicalxchange.org/concepts/plural-funding/) dépendent des dons pour mesurer la préférence envers certaines options parmi différents projets d'intérêt public. Chaque don compte comme un « vote » pour un projet spécifique, les projets qui reçoivent le plus de votes obtenant plus de fonds de la réserve de correspondance.

L'utilisation du vote en chaîne rend le financement quadratique vulnérable à la collusion : les transactions blockchain sont publiques, de sorte que les corrupteurs peuvent inspecter les activités en chaîne d'un corrompu pour voir comment il a "voté". De cette façon, le financement quadratique cesse d’être un moyen efficace d’allouer des fonds en fonction des préférences cumulées de la collectivité.

Heureusement, de nouvelles solutions telles que MACI (Minimum Anti-Collusion Infrastructure) utilisent des preuves à divulgation nulle pour rendre le vote en chaîne (par ex. Mécanismes de financement quadratiques) résistant à la corruption et à la collusion. MACI est un ensemble de contrats intelligents et de scripts qui permettent à un administrateur central (appelé un "coordinateur") d'agréger les votes et de comptabiliser les résultats _sans_ révéler des détails sur la façon dont chaque personne a voté. Malgré cela, il est toujours possible de vérifier que les votes ont été comptés correctement, ou de confirmer qu'une personne particulière a participé au vote.

#### Comment MACI fonctionne-t-il avec la preuve à divulgation nulle ? {#how-maci-works-with-zk-proofs}

Au départ, le coordinateur déploie le contrat MACI sur Ethereum, après quoi les utilisateurs peuvent s'inscrire au vote (en inscrivant leur clé publique dans le contrat intelligent). Les utilisateurs votent en envoyant des messages chiffrés avec leur clé publique au contrat intelligent (un vote valide doit être signé avec la clé publique la plus récente associée à l'identité de l'utilisateur, entre autres). Le coordinateur traite ensuite tous les messages une fois la période de vote terminée, calcule les votes et vérifie les résultats en chaîne.

Dans MACI, des preuves à divulgation nulle sont utilisées pour assurer l'exactitude du calcul en empêchant le coordinateur de traiter les votes et de comptabiliser les résultats de manière incorrecte. Pour ce faire, le coordinateur est tenu de produire des preuves ZK-SNARK permettant de vérifier que a) tous les messages ont été traités correctement b) le résultat final correspond à la somme de tous les _votes valides_.

Ainsi, même sans partager une répartition des votes par utilisateur (comme c'est généralement le cas), MACI garantit l'intégrité des résultats calculés au cours du processus de décompte. Cette caractéristique permet de réduire l'efficacité des programmes de collusion de base. Nous pouvons étudier cette possibilité en utilisant l'exemple précédent de Bob soudoyant Alice pour voter pour une option:

- Alice enregistre son vote en envoyant sa clé publique à un contrat intelligent.
- Alice accepte de voter pour l'`option B` en échange d'un pot-de-vin de Bob.
- Alice vote pour l'`option B`.
- Alice envoie secrètement une transaction chiffrée pour changer la clé publique associée à son identité.
- Alice envoie un autre message (chiffré) au contrat intelligent afin de voter pour l'`option A` en utilisant la nouvelle clé publique.
- Alice montre à Bob une transaction indiquant qu'elle a voté pour l'`option B` (qui est invalide car la clé publique n'est plus associée à l'identité d'Alice dans le système)
- Lors du traitement des messages, le coordinateur ignore le vote d'Alice pour l'`option B` et ne compte que le vote pour l'`option A`. Ainsi, la tentative de Bob de se joindre à Alice et de manipuler le vote sur la chaîne échoue.

L'utilisation de MACI _nécessite_ de faire confiance au coordinateur pour ne pas collaborer avec des corrupteurs ou tenter de soudoyer les électeurs eux-mêmes. Le coordinateur peut déchiffrer les messages des utilisateurs (nécessaires à la création de la preuve), afin qu'ils puissent vérifier avec précision comment chaque personne a voté.

Mais dans les cas où le coordinateur reste honnête, MACI représente un outil puissant pour garantir le caractère inviolable du vote en chaîne. Ceci explique sa popularité parmi les demandes de financement quadratiques (par exemple, [clr.fund](https://clr.fund/#/about/maci)) qui dépendent fortement de l'intégrité des choix de vote de chaque individu.

[En savoir plus sur MACI](https://privacy-scaling-explorations.github.io/maci/).

## Inconvénients à utiliser des preuves à divulgation nulle {#drawbacks-of-using-zero-knowledge-proofs}

### Coûts en matériels {#hardware-costs}

La génération de preuves à divulgation nulle de connaissance implique des calculs très complexes qu'il est préférable d'effectuer sur des machines spécialisées. Comme ces machines coûtent cher, elles sont souvent hors de portée des personnes ordinaires. En outre, les applications qui veulent utiliser une technologie à divulgation nulle doivent prendre en compte les coûts matériels, et cela peut augmenter les coûts pour les utilisateurs finaux.

### Coûts de la vérification de la preuve {#proof-verification-costs}

La vérification des preuves nécessite également un calcul complexe et augmente les coûts de mise en œuvre de la technologie à divulgation nulle dans les applications. Ce coût est particulièrement pertinent dans le contexte de la preuve du calcul. Par exemple, ZK-rollups paye ~ 500 000 gaz pour vérifier une seule preuve ZK-SNARK sur Ethereum, avec des ZK-STARKs nécessitant des frais encore plus élevés.

### Hypothèses de confiance {#trust-assumptions}

Dans ZK-SNARK, la chaîne de référence commune (paramètres publics) est générée une fois et disponible pour être réutilisée par les parties qui souhaitent participer au protocole à divulgation nulle. Les paramètres publics sont créés par une cérémonie de mise en place de confiance, où les participants sont supposés être honnêtes.

Mais il n’y a vraiment aucun moyen pour les utilisateurs d’évaluer l’honnêteté des participants et les utilisateurs doivent croire les développeurs sur parole. Les ZK-STARKs sont libres d'hypothèses de confiance, puisque le caractère aléatoire utilisé dans la génération de la chaîne est publiquement vérifiable. En attendant, les chercheurs travaillent sur des installations non fiables pour ZK-SNARKs afin d'accroître la sécurité des mécanismes de preuve.

### Menaces liées à l'informatique quantique {#quantum-computing-threats}

ZK-SNARK utilise la cryptographie sur les courbes elliptiques ([ECDSA](/glossary/#ecdsa)) pour le chiffrement. Bien que l'algorithme ECDSA soit actuellement sûr, le développement d'ordinateurs quantiques pourrait briser son modèle de sécurité à l'avenir.

Le ZK-STARK est considéré comme immunisé contre la menace de l'informatique quantique, car il utilise des hachages résistants à la collision pour le chiffrement. Contrairement aux appairages de clés public-privé utilisés dans la cryptographie sur les courbes elliptiques, le hachage résistant aux collisions est plus difficile à briser pour les algorithmes de calcul quantique.

## En savoir plus {#further-reading}

- [L'informaticien explique un concept en 5 niveaux de difficulté | WIRED](https://www.youtube.com/watch?v=fOGdb1CTu5c) - _Chaîne YouTube de Wired_
- [Vue d'ensemble des cas d'utilisation des preuves à connaissance nulle](https://pse.dev/projects) - _Privacy and Scaling Explorations Team_
- [SNARKs vs. STARKS vs SNARKs vs. Récursive SNARKs](https://www.alchemy.com/overviews/snarks-vs-starks) — _Aperçu d’Alchemy_
- [Une preuve à divulgation nulle : Améliorer la confidentialité sur une Blockchain](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARKs — Un exemple de preuve à divulgation nulle réaliste et une plongée en profondeur](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARKs – Créez une confiance vérifiable, même contre Quantum Computers](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Une brève introduction à la façon dont les zk-SNARK sont possibles](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Qu'est-ce que la preuve à divulgation nulle de connaissance et quel est son rôle dans la Blockchain ?](https://www.leewayhertz.com/zero-knowledge-proof-and-blockchain/) — _LeewayHertz_
