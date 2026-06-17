---
title: Que sont les preuves à divulgation nulle de connaissance ?
metaTitle: Preuves à divulgation nulle de connaissance
description: Une introduction non technique aux preuves à divulgation nulle de connaissance pour les débutants.
lang: fr
---

Une preuve à divulgation nulle de connaissance est un moyen de prouver la validité d'une affirmation sans révéler l'affirmation elle-même. Le « prouveur » est la partie qui tente de prouver une réclamation, tandis que le « vérificateur » est responsable de la validation de la réclamation.

Les preuves à divulgation nulle de connaissance sont apparues pour la première fois dans un article de 1985, « [The knowledge complexity of interactive proof systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf) », qui fournit une définition des preuves à divulgation nulle de connaissance largement utilisée aujourd'hui :

> Un protocole à divulgation nulle de connaissance est une méthode par laquelle une partie (le prouveur) **peut prouver** à une autre partie (le vérificateur) **que quelque chose est vrai, sans révéler aucune information** en dehors du fait que cette affirmation spécifique est vraie.

Les preuves à divulgation nulle de connaissance se sont améliorées au fil des ans et elles sont désormais utilisées dans plusieurs applications du monde réel.

<VideoWatch slug="zero-knowledge-proofs-5-levels" />

## Pourquoi avons-nous besoin de preuves à divulgation nulle de connaissance ? {#why-zero-knowledge-proofs-are-important}

Les preuves à divulgation nulle de connaissance ont représenté une percée dans la cryptographie appliquée, car elles promettaient d'améliorer la sécurité des informations pour les individus. Considérez comment vous pourriez prouver une réclamation (par exemple, « Je suis citoyen du pays X ») à une autre partie (par exemple, un fournisseur de services). Vous devriez fournir des « preuves » pour étayer votre réclamation, comme un passeport national ou un permis de conduire.

Mais cette approche pose des problèmes, principalement le manque de confidentialité. Les informations personnellement identifiables (PII) partagées avec des services tiers sont stockées dans des bases de données centrales, qui sont vulnérables aux piratages. L'usurpation d'identité devenant un problème critique, des appels sont lancés en faveur de moyens plus respectueux de la confidentialité pour partager des informations sensibles.

Les preuves à divulgation nulle de connaissance résolvent ce problème en **éliminant le besoin de révéler des informations pour prouver la validité des réclamations**. Le protocole à divulgation nulle de connaissance utilise l'affirmation (appelée un « témoin ») comme entrée pour générer une preuve succincte de sa validité. Cette preuve fournit de solides garanties qu'une affirmation est vraie sans exposer les informations utilisées pour la créer.

Pour en revenir à notre exemple précédent, la seule preuve dont vous avez besoin pour prouver votre réclamation de citoyenneté est une preuve à divulgation nulle de connaissance. Le vérificateur n'a qu'à vérifier si certaines propriétés de la preuve sont vraies pour être convaincu que l'affirmation sous-jacente est également vraie.

## Cas d'utilisation des preuves à divulgation nulle de connaissance {#use-cases-for-zero-knowledge-proofs}

### Paiements anonymes {#anonymous-payments}

Les paiements par carte de crédit sont souvent visibles par plusieurs parties, y compris le fournisseur de paiements, les banques et d'autres parties intéressées (par exemple, les autorités gouvernementales). Bien que la surveillance financière présente des avantages pour identifier les activités illégales, elle porte également atteinte à la confidentialité des citoyens ordinaires.

Les cryptomonnaies étaient destinées à fournir un moyen aux utilisateurs d'effectuer des transactions privées de pair à pair. Mais la plupart des transactions en cryptomonnaie sont ouvertement visibles sur les chaînes de blocs publiques. Les identités des utilisateurs sont souvent pseudonymes et soit volontairement liées à des identités du monde réel (par exemple, en incluant des adresses ETH sur des profils Twitter ou GitHub), soit peuvent être associées à des identités du monde réel en utilisant une analyse de données de base onchain et hors chaîne.

Il existe des « pièces de confidentialité » spécifiques conçues pour des transactions complètement anonymes. Les chaînes de blocs axées sur la confidentialité, telles que Zcash et Monero, masquent les détails de la transaction, y compris les adresses de l'expéditeur/du destinataire, le type d'actif, la quantité et la chronologie de la transaction.

En intégrant la technologie à divulgation nulle de connaissance dans le protocole, les réseaux de [chaîne de blocs](/glossary/#blockchain) axés sur la confidentialité permettent aux [nœuds](/glossary/#node) de valider les transactions sans avoir besoin d'accéder aux données de transaction. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) est un exemple de conception proposée qui permettra des transferts de valeur privés natifs sur la chaîne de blocs [Ethereum](/). De telles propositions sont cependant difficiles à mettre en œuvre en raison d'un mélange de préoccupations en matière de sécurité, de réglementation et d'expérience utilisateur (UX).  

**Les preuves à divulgation nulle de connaissance sont également appliquées à l'anonymisation des transactions sur les chaînes de blocs publiques**. Un exemple est Tornado Cash, un service décentralisé et non dépositaire qui permet aux utilisateurs d'effectuer des transactions privées sur Ethereum. Tornado Cash utilise des preuves à divulgation nulle de connaissance pour masquer les détails des transactions et garantir la confidentialité financière. Malheureusement, comme il s'agit d'outils de confidentialité « sur adhésion » (opt-in), ils sont associés à des activités illicites. Pour surmonter cela, la confidentialité doit finalement devenir la norme par défaut sur les chaînes de blocs publiques. En savoir plus sur la [confidentialité sur Ethereum](/privacy/).

### Protection de l'identité {#identity-protection}

Les systèmes actuels de gestion des identités mettent les informations personnelles en danger. Les preuves à divulgation nulle de connaissance peuvent aider les individus à valider leur identité tout en protégeant les détails sensibles.

Les preuves à divulgation nulle de connaissance sont particulièrement utiles dans le contexte de l'[identité décentralisée (DID)](/decentralized-identity/). L'identité décentralisée (également décrite comme « identité auto-souveraine ») donne à l'individu la capacité de contrôler l'accès aux identifiants personnels. Prouver votre citoyenneté sans révéler votre numéro d'identification fiscale ou les détails de votre passeport est un bon exemple de la façon dont la technologie à divulgation nulle de connaissance permet l'identité décentralisée.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + Identité en action : l'identité numérique nationale (NDI) du Bhoutan sur Ethereum
    </AlertTitle>
    <AlertDescription>
      <p>
        Un exemple concret d'utilisation des ZKP pour les systèmes de gestion des identités est le système d'identité numérique nationale (NDI) du Royaume du Bhoutan, construit sur Ethereum. Le NDI du Bhoutan utilise les ZKP pour permettre aux citoyens de prouver cryptographiquement des faits les concernant, comme « Je suis citoyen » ou « J'ai plus de 18 ans », sans révéler les données personnelles sensibles figurant sur leur pièce d'identité.
      </p>
      <p>
        Apprenez-en plus sur le NDI du Bhoutan dans l'<a href="/decentralized-identity/#national-and-government-id">étude de cas sur l'identité décentralisée</a>.
      </p>
    </AlertDescription>
  </AlertContent>
</Alert>

### Preuve d'humanité {#proof-of-humanity}

L'un des exemples les plus largement utilisés de preuves à divulgation nulle de connaissance en action aujourd'hui est le [protocole World ID](https://world.org/blog/world/world-id-faqs), qui peut être considéré comme « un passeport numérique mondial pour l'ère de l'IA ». Il permet aux personnes de prouver qu'elles sont des individus uniques sans révéler d'informations personnelles. Ceci est réalisé grâce à un appareil appelé l'Orb, qui scanne l'iris d'une personne et génère un code d'iris. Le code d'iris est vérifié et validé pour confirmer que la personne est un être humain biologiquement unique. Après vérification, un engagement d'identité généré sur l'appareil de l'utilisateur (et non lié ou dérivé des données biométriques) est ajouté à une liste sécurisée sur la chaîne de blocs. Ensuite, chaque fois que l'utilisateur souhaite prouver qu'il est un humain vérifié – que ce soit pour se connecter, voter ou effectuer d'autres actions – il peut générer une preuve à divulgation nulle de connaissance qui confirme son appartenance à la liste. La beauté de l'utilisation d'une preuve à divulgation nulle de connaissance est qu'une seule affirmation est révélée : cette personne est unique. Tout le reste reste confidentiel.

World ID s'appuie sur le [protocole Semaphore](https://docs.semaphore.pse.dev/) développé par l'[équipe PSE](https://pse.dev/) de la Fondation Ethereum. Semaphore est conçu pour être un moyen léger mais puissant de générer et de vérifier des preuves à divulgation nulle de connaissance. Il permet aux utilisateurs de prouver qu'ils font partie d'un groupe (dans ce cas, des humains vérifiés) sans montrer quel membre du groupe ils sont. Semaphore est également très flexible, permettant de créer des groupes basés sur un large éventail de critères tels que la vérification d'identité, la participation à des événements ou la possession d'identifiants.

### Authentification {#authentication}

L'utilisation de services en ligne nécessite de prouver votre identité et votre droit d'accéder à ces plateformes. Cela nécessite souvent de fournir des informations personnelles, comme des noms, des adresses e-mail, des dates de naissance, etc. Vous devrez peut-être également mémoriser de longs mots de passe ou risquer de perdre l'accès.

Les preuves à divulgation nulle de connaissance peuvent cependant simplifier l'authentification à la fois pour les plateformes et les utilisateurs. Une fois qu'une preuve ZK a été générée à l'aide d'entrées publiques (par exemple, des données attestant de l'appartenance de l'utilisateur à la plateforme) et d'entrées privées (par exemple, les détails de l'utilisateur), l'utilisateur peut simplement la présenter pour authentifier son identité lorsqu'il a besoin d'accéder au service. Cela améliore l'expérience des utilisateurs et libère les organisations de la nécessité de stocker d'énormes quantités d'informations sur les utilisateurs.

### Calcul vérifiable {#verifiable-computation}

Le calcul vérifiable est une autre application de la technologie à divulgation nulle de connaissance pour améliorer les conceptions de chaîne de blocs. Le calcul vérifiable nous permet d'externaliser le calcul vers une autre entité tout en conservant des résultats vérifiables. L'entité soumet le résultat accompagné d'une preuve vérifiant que le programme a été exécuté correctement.

Le calcul vérifiable est **essentiel pour améliorer les vitesses de traitement sur les chaînes de blocs** sans réduire la sécurité. Comprendre cela nécessite de connaître les différences entre les solutions proposées pour la mise à l'échelle d'Ethereum.

Les [solutions de mise à l'échelle onchain](/developers/docs/scaling/#onchain-scaling), telles que le partitionnement (sharding), nécessitent une modification approfondie de la couche de base de la chaîne de blocs. Cependant, cette approche est très complexe et des erreurs de mise en œuvre peuvent compromettre le modèle de sécurité d'Ethereum.

Les [solutions de mise à l'échelle hors chaîne](/developers/docs/scaling/#offchain-scaling) ne nécessitent pas de repenser le protocole Ethereum de base. Au lieu de cela, elles s'appuient sur un modèle de calcul externalisé pour améliorer le débit sur la couche de base d'Ethereum.

Voici comment cela fonctionne en pratique :

- Au lieu de traiter chaque transaction, Ethereum décharge l'exécution sur une chaîne distincte.

- Après avoir traité les transactions, l'autre chaîne renvoie les résultats à appliquer à l'état d'Ethereum.

L'avantage ici est qu'Ethereum n'a pas à effectuer d'exécution et n'a besoin que d'appliquer les résultats du calcul externalisé à son état. Cela réduit la congestion du réseau et améliore également les vitesses de transaction (les protocoles hors chaîne optimisent pour une exécution plus rapide).

La chaîne a besoin d'un moyen de valider les transactions hors chaîne sans les réexécuter, sinon la valeur de l'exécution hors chaîne est perdue.

C'est là que le calcul vérifiable entre en jeu. Lorsqu'un nœud exécute une transaction en dehors d'Ethereum, il soumet une preuve à divulgation nulle de connaissance pour prouver l'exactitude de l'exécution hors chaîne. Cette preuve (appelée [preuve de validité](/glossary/#validity-proof)) garantit qu'une transaction est valide, permettant à Ethereum d'appliquer le résultat à son état — sans attendre que quiconque le conteste.

Les [rollup à divulgation nulle de connaissance](/developers/docs/scaling/zk-rollups) et les [validiums](/developers/docs/scaling/validium/) sont deux solutions de mise à l'échelle hors chaîne qui utilisent des preuves de validité pour fournir une évolutivité sécurisée. Ces protocoles exécutent des milliers de transactions hors chaîne et soumettent des preuves pour vérification sur Ethereum. Ces résultats peuvent être appliqués immédiatement une fois la preuve vérifiée, permettant à Ethereum de traiter plus de transactions sans augmenter le calcul sur la couche de base.

Au-delà de la mise à l'échelle de la couche 2 (l2), les preuves à divulgation nulle de connaissance peuvent également vérifier l'exécution des blocs de la couche 1 (l1) d'Ethereum elle-même. Le [zkEVM pour la vérification L1](/roadmap/zkevm/) permettrait aux validateurs de vérifier les blocs en contrôlant une preuve plutôt qu'en réexécutant toutes les transactions — permettant des limites de gaz plus élevées sans augmenter les exigences matérielles des validateurs.

### Réduire la corruption et la collusion dans le vote onchain {#secure-blockchain-voting}

Les systèmes de vote sur chaîne de blocs présentent de nombreuses caractéristiques favorables : ils sont entièrement auditables, sécurisés contre les attaques, résistants à la censure et exempts de contraintes géographiques. Mais même les systèmes de vote onchain ne sont pas à l'abri du problème de la **collusion**.

Définie comme « la coordination pour limiter la concurrence ouverte en trompant, fraudant et induisant les autres en erreur », la collusion peut prendre la forme d'un acteur malveillant influençant le vote en offrant des pots-de-vin. Par exemple, Alice pourrait recevoir un pot-de-vin de Bob pour voter pour `option B` sur un bulletin de vote même si elle préfère `option A`.

La corruption et la collusion limitent l'efficacité de tout processus qui utilise le vote comme mécanisme de signalisation (en particulier lorsque les utilisateurs peuvent prouver comment ils ont voté). Cela peut avoir des conséquences importantes, en particulier lorsque les votes sont responsables de l'allocation de ressources rares.

Par exemple, les [mécanismes de financement quadratique](https://www.radicalxchange.org/wiki/plural-funding/) s'appuient sur des dons pour mesurer la préférence pour certaines options parmi différents projets de bien public. Chaque don compte comme un « vote » pour un projet spécifique, les projets qui reçoivent plus de votes obtenant plus de fonds de la cagnotte de contrepartie.

L'utilisation du vote onchain rend le financement quadratique susceptible à la collusion : les transactions sur la chaîne de blocs sont publiques, de sorte que les corrupteurs peuvent inspecter l'activité onchain d'une personne corrompue pour voir comment elle a « voté ». De cette façon, le financement quadratique cesse d'être un moyen efficace d'allouer des fonds en fonction des préférences agrégées de la communauté.

Heureusement, des solutions plus récentes telles que MACI (Minimum Anti-Collusion Infrastructure) utilisent des preuves à divulgation nulle de connaissance pour rendre le vote onchain (par exemple, les mécanismes de financement quadratique) résistant à la corruption et à la collusion. MACI est un ensemble de contrats intelligents et de scripts qui permettent à un administrateur central (appelé « coordinateur ») d'agréger les votes et de comptabiliser les résultats _sans_ révéler les détails sur la façon dont chaque individu a voté. Malgré cela, il est toujours possible de vérifier que les votes ont été comptés correctement, ou de confirmer qu'un individu particulier a participé au tour de scrutin.

#### Comment MACI fonctionne-t-il avec les preuves à divulgation nulle de connaissance ? {#how-maci-works-with-zk-proofs}

Au début, le coordinateur déploie le contrat MACI sur Ethereum, après quoi les utilisateurs peuvent s'inscrire pour voter (en enregistrant leur clé publique dans le contrat intelligent). Les utilisateurs votent en envoyant des messages chiffrés avec leur clé publique au contrat intelligent (un vote valide doit être signé avec la clé publique la plus récente associée à l'identité de l'utilisateur, entre autres critères). Ensuite, le coordinateur traite tous les messages une fois la période de vote terminée, comptabilise les votes et vérifie les résultats onchain.

Dans MACI, les preuves à divulgation nulle de connaissance sont utilisées pour garantir l'exactitude du calcul en rendant impossible pour le coordinateur de traiter incorrectement les votes et de comptabiliser les résultats. Ceci est réalisé en exigeant du coordinateur qu'il génère des preuves ZK-SNARK vérifiant que a) tous les messages ont été traités correctement b) le résultat final correspond à la somme de tous les votes _valides_.

Ainsi, même sans partager une répartition des votes par utilisateur (comme c'est généralement le cas), MACI garantit l'intégrité des résultats calculés lors du processus de dépouillement. Cette fonctionnalité est utile pour réduire l'efficacité des stratagèmes de collusion de base. Nous pouvons explorer cette possibilité en utilisant l'exemple précédent de Bob soudoyant Alice pour voter pour une option :

- Alice s'inscrit pour voter en envoyant sa clé publique à un contrat intelligent.
- Alice accepte de voter pour `option B` en échange d'un pot-de-vin de Bob.
- Alice vote pour `option B`.
- Alice envoie secrètement une transaction chiffrée pour modifier la clé publique associée à son identité.
- Alice envoie un autre message (chiffré) au contrat intelligent en votant pour `option A` en utilisant la nouvelle clé publique.
- Alice montre à Bob une transaction qui montre qu'elle a voté pour `option B` (ce qui est invalide puisque la clé publique n'est plus associée à l'identité d'Alice dans le système).
- Lors du traitement des messages, le coordinateur ignore le vote d'Alice pour `option B` et ne compte que le vote pour `option A`. Par conséquent, la tentative de Bob de s'entendre avec Alice et de manipuler le vote onchain échoue.

L'utilisation de MACI nécessite _effectivement_ de faire confiance au coordinateur pour ne pas s'entendre avec les corrupteurs ou tenter de soudoyer les électeurs eux-mêmes. Le coordinateur peut déchiffrer les messages des utilisateurs (nécessaire pour créer la preuve), afin de pouvoir vérifier avec précision comment chaque personne a voté.

Mais dans les cas où le coordinateur reste honnête, MACI représente un outil puissant pour garantir le caractère sacré du vote onchain. Cela explique sa popularité parmi les applications de financement quadratique (par exemple, [clr.fund](https://clr.fund/#/about/maci)) qui s'appuient fortement sur l'intégrité des choix de vote de chaque individu.

[En savoir plus sur MACI](https://maci.pse.dev/).

## Comment fonctionnent les preuves à divulgation nulle de connaissance ? {#how-do-zero-knowledge-proofs-work}

Une preuve à divulgation nulle de connaissance vous permet de prouver la véracité d'une affirmation sans partager le contenu de l'affirmation ni révéler comment vous avez découvert la vérité. Pour rendre cela possible, les protocoles à divulgation nulle de connaissance s'appuient sur des algorithmes qui prennent certaines données en entrée et renvoient « vrai » ou « faux » en sortie.

Un protocole à divulgation nulle de connaissance doit satisfaire aux critères suivants :

1. **Complétude** : Si l'entrée est valide, le protocole à divulgation nulle de connaissance renvoie toujours « vrai ». Par conséquent, si l'affirmation sous-jacente est vraie, et que le prouveur et le vérificateur agissent honnêtement, la preuve peut être acceptée.

2. **Solidité** : Si l'entrée est invalide, il est théoriquement impossible de tromper le protocole à divulgation nulle de connaissance pour qu'il renvoie « vrai ». Par conséquent, un prouveur menteur ne peut pas tromper un vérificateur honnête en lui faisant croire qu'une affirmation invalide est valide (sauf avec une infime marge de probabilité).

3. **Divulgation nulle de connaissance** : Le vérificateur n'apprend rien sur une affirmation au-delà de sa validité ou de sa fausseté (il a une « connaissance nulle » de l'affirmation). Cette exigence empêche également le vérificateur de dériver l'entrée d'origine (le contenu de l'affirmation) à partir de la preuve.

Dans sa forme de base, une preuve à divulgation nulle de connaissance est composée de trois éléments : le **témoin**, le **défi** et la **réponse**.

- **Témoin** : Avec une preuve à divulgation nulle de connaissance, le prouveur veut prouver la connaissance de certaines informations cachées. L'information secrète est le « témoin » de la preuve, et la connaissance supposée du témoin par le prouveur établit un ensemble de questions auxquelles seule une partie ayant connaissance de l'information peut répondre. Ainsi, le prouveur commence le processus de preuve en choisissant au hasard une question, en calculant la réponse et en l'envoyant au vérificateur.

- **Défi** : Le vérificateur choisit au hasard une autre question dans l'ensemble et demande au prouveur d'y répondre.

- **Réponse** : Le prouveur accepte la question, calcule la réponse et la renvoie au vérificateur. La réponse du prouveur permet au vérificateur de contrôler si le premier a réellement accès au témoin. Pour s'assurer que le prouveur ne devine pas aveuglément et n'obtient pas les bonnes réponses par hasard, le vérificateur choisit d'autres questions à poser. En répétant cette interaction de nombreuses fois, la possibilité que le prouveur simule la connaissance du témoin diminue considérablement jusqu'à ce que le vérificateur soit satisfait.

Ce qui précède décrit la structure d'une « preuve interactive à divulgation nulle de connaissance ». Les premiers protocoles à divulgation nulle de connaissance utilisaient la preuve interactive, où la vérification de la validité d'une affirmation nécessitait une communication aller-retour entre les prouveurs et les vérificateurs.

Un bon exemple qui illustre le fonctionnement des preuves interactives est la célèbre [histoire de la caverne d'Ali Baba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) de Jean-Jacques Quisquater. Dans l'histoire, Peggy (le prouveur) veut prouver à Victor (le vérificateur) qu'elle connaît la phrase secrète pour ouvrir une porte magique sans révéler la phrase.

### Preuves non interactives à divulgation nulle de connaissance {#non-interactive-zero-knowledge-proofs}

Bien que révolutionnaire, la preuve interactive avait une utilité limitée car elle nécessitait que les deux parties soient disponibles et interagissent de manière répétée. Même si un vérificateur était convaincu de l'honnêteté d'un prouveur, la preuve serait indisponible pour une vérification indépendante (le calcul d'une nouvelle preuve nécessitait un nouvel ensemble de messages entre le prouveur et le vérificateur).

Pour résoudre ce problème, Manuel Blum, Paul Feldman et Silvio Micali ont suggéré les premières [preuves non interactives à divulgation nulle de connaissance](https://dl.acm.org/doi/10.1145/62212.62222) où le prouveur et le vérificateur ont une clé partagée. Cela permet au prouveur de démontrer sa connaissance de certaines informations (c'est-à-dire le témoin) sans fournir l'information elle-même.

Contrairement aux preuves interactives, les preuves non interactives ne nécessitaient qu'un seul cycle de communication entre les participants (prouveur et vérificateur). Le prouveur transmet l'information secrète à un algorithme spécial pour calculer une preuve à divulgation nulle de connaissance. Cette preuve est envoyée au vérificateur, qui contrôle que le prouveur connaît l'information secrète à l'aide d'un autre algorithme.

La preuve non interactive réduit la communication entre le prouveur et le vérificateur, rendant les preuves ZK plus efficaces. De plus, une fois qu'une preuve est générée, elle est disponible pour que quiconque d'autre (ayant accès à la clé partagée et à l'algorithme de vérification) puisse la vérifier.

Les preuves non interactives ont représenté une percée pour la technologie à divulgation nulle de connaissance et ont stimulé le développement des systèmes de preuve utilisés aujourd'hui. Nous discutons de ces types de preuves ci-dessous :

### Types de preuves à divulgation nulle de connaissance {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK est un acronyme pour **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge**. Le protocole ZK-SNARK possède les qualités suivantes :

- **Divulgation nulle de connaissance** : Un vérificateur peut valider l'intégrité d'une affirmation sans rien savoir d'autre sur l'affirmation. La seule connaissance que le vérificateur a de l'affirmation est de savoir si elle est vraie ou fausse.

- **Succinct** : La preuve à divulgation nulle de connaissance est plus petite que le témoin et peut être vérifiée rapidement.

- **Non interactif** : La preuve est « non interactive » car le prouveur et le vérificateur n'interagissent qu'une seule fois, contrairement aux preuves interactives qui nécessitent plusieurs cycles de communication.

- **Argument** : La preuve satisfait à l'exigence de « solidité », de sorte que la tricherie est extrêmement improbable.

- **(De) Connaissance** : La preuve à divulgation nulle de connaissance ne peut pas être construite sans accès à l'information secrète (témoin). Il est difficile, voire impossible, pour un prouveur qui n'a pas le témoin de calculer une preuve à divulgation nulle de connaissance valide.

La « clé partagée » mentionnée précédemment fait référence aux paramètres publics que le prouveur et le vérificateur acceptent d'utiliser pour générer et vérifier les preuves. La génération des paramètres publics (collectivement connus sous le nom de chaîne de référence commune ou CRS) est une opération sensible en raison de son importance dans la sécurité du protocole. Si l'entropie (caractère aléatoire) utilisée pour générer la CRS tombe entre les mains d'un prouveur malhonnête, il peut calculer de fausses preuves.

Le [calcul multipartite (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) est un moyen de réduire les risques liés à la génération de paramètres publics. Plusieurs parties participent à une [cérémonie de configuration de confiance](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), où chaque personne apporte des valeurs aléatoires pour générer la CRS. Tant qu'une partie honnête détruit sa portion de l'entropie, le protocole ZK-SNARK conserve sa solidité de calcul.

Les configurations de confiance exigent que les utilisateurs fassent confiance aux participants à la génération des paramètres. Cependant, le développement des ZK-STARK a permis de prouver des protocoles qui fonctionnent avec une configuration non approuvée.

#### ZK-STARKs {#zk-starks}

ZK-STARK est un acronyme pour **Zero-Knowledge Scalable Transparent Argument of Knowledge**. Les ZK-STARK sont similaires aux ZK-SNARK, à l'exception qu'ils sont :

- **Évolutifs** : Le ZK-STARK est plus rapide que le ZK-SNARK pour générer et vérifier des preuves lorsque la taille du témoin est plus grande. Avec les preuves STARK, les temps du prouveur et de vérification n'augmentent que légèrement à mesure que le témoin grandit (les temps du prouveur et du vérificateur SNARK augmentent de manière linéaire avec la taille du témoin).

- **Transparents** : Le ZK-STARK s'appuie sur un caractère aléatoire publiquement vérifiable pour générer des paramètres publics pour la preuve et la vérification au lieu d'une configuration de confiance. Ainsi, ils sont plus transparents par rapport aux ZK-SNARK.

Les ZK-STARK produisent des preuves plus volumineuses que les ZK-SNARK, ce qui signifie qu'ils ont généralement des frais généraux de vérification plus élevés. Cependant, il existe des cas (comme la preuve de grands ensembles de données) où les ZK-STARK peuvent être plus rentables que les ZK-SNARK.

## Inconvénients de l'utilisation des preuves à divulgation nulle de connaissance {#drawbacks-of-using-zero-knowledge-proofs}

### Coûts matériels {#hardware-costs}

La génération de preuves à divulgation nulle de connaissance implique des calculs très complexes qu'il est préférable d'effectuer sur des machines spécialisées. Comme ces machines sont chères, elles sont souvent hors de portée des individus ordinaires. De plus, les applications qui souhaitent utiliser la technologie à divulgation nulle de connaissance doivent tenir compte des coûts matériels — ce qui peut augmenter les coûts pour les utilisateurs finaux.

### Coûts de vérification des preuves {#proof-verification-costs}

La vérification des preuves nécessite également des calculs complexes et augmente les coûts de mise en œuvre de la technologie à divulgation nulle de connaissance dans les applications. Ce coût est particulièrement pertinent dans le contexte de la preuve de calcul. Par exemple, les rollup ZK paient environ 500 000 gaz pour vérifier une seule preuve ZK-SNARK sur Ethereum, les ZK-STARK nécessitant des frais encore plus élevés.

### Hypothèses de confiance {#trust-assumptions}

Dans le ZK-SNARK, la chaîne de référence commune (paramètres publics) est générée une fois et disponible pour être réutilisée par les parties qui souhaitent participer au protocole à divulgation nulle de connaissance. Les paramètres publics sont créés via une cérémonie de configuration de confiance, où les participants sont supposés être honnêtes.

Mais il n'y a vraiment aucun moyen pour les utilisateurs d'évaluer l'honnêteté des participants et les utilisateurs doivent croire les développeurs sur parole. Les ZK-STARK sont exempts d'hypothèses de confiance puisque le caractère aléatoire utilisé pour générer la chaîne est publiquement vérifiable. En attendant, les chercheurs travaillent sur des configurations non approuvées pour les ZK-SNARK afin d'augmenter la sécurité des mécanismes de preuve.

### Menaces de l'informatique quantique {#quantum-computing-threats}

Le ZK-SNARK utilise la cryptographie sur courbe elliptique pour le chiffrement. Bien que le problème du logarithme discret sur courbe elliptique soit supposé insoluble pour le moment, le développement des ordinateurs quantiques pourrait briser ce modèle de sécurité à l'avenir.

Le ZK-STARK est considéré comme immunisé contre la menace de l'informatique quantique, car il ne s'appuie que sur des fonctions de hachage résistantes aux collisions pour sa sécurité. Contrairement aux paires de clés publique-privée utilisées dans la cryptographie sur courbe elliptique, le hachage résistant aux collisions est plus difficile à briser pour les algorithmes d'informatique quantique.

## Lectures complémentaires {#further-reading}

- [Aperçu des cas d'utilisation des preuves à divulgation nulle de connaissance](https://pse.dev/projects) — _Équipe Privacy and Scaling Explorations_
- [SNARK vs STARK vs SNARK récursifs](https://www.alchemy.com/overviews/snarks-vs-starks) — _Aperçus d'Alchemy_
- [Une preuve à divulgation nulle de connaissance : améliorer la confidentialité sur une chaîne de blocs](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARK — Un exemple réaliste à divulgation nulle de connaissance et une exploration détaillée](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARK — Créer une confiance vérifiable, même face aux ordinateurs quantiques](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Une introduction approximative à la façon dont les zk-SNARK sont possibles](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Pourquoi les preuves à divulgation nulle de connaissance (ZKP) changent la donne pour l'identité auto-souveraine](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [EIP-7503 expliqué : permettre des transferts privés sur Ethereum avec des preuves ZK](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) — _Emmanuel Awosika_
- [Jeu de cartes ZK : jeu pour apprendre les principes fondamentaux de ZK et les cas d'utilisation réels](https://github.com/ZK-card/zk-cards) - _ZK-Cards_