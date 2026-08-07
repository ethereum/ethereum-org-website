---
title: "La feuille de route de la confidentialité pour Ethereum"
description: "Ethereum s'efforce de faire de la confidentialité une propriété de premier ordre du réseau grâce à des mises à niveau qui protègent la confidentialité des transactions, sécurisent l'accès aux données des utilisateurs et permettent une identité vérifiable mais privée."
lang: fr
image: /images/roadmap/roadmap-security.png
alt: "Feuille de route d'Ethereum"
template: roadmap
---

**La confidentialité sur Ethereum passe d'un module complémentaire optionnel à un paramètre par défaut au niveau du réseau.** Les feuilles de route de confidentialité proposées pour Ethereum ciblent des points de connexion vulnérables spécifiques où les données des utilisateurs peuvent fuiter aujourd'hui. La recherche à travers l'écosystème vise à faire d'Ethereum une plateforme où la confidentialité est structurelle plutôt qu'optionnelle.

Les chercheurs de la Fondation Ethereum ont [regroupé trois priorités fondamentales de la feuille de route](https://pse.dev/blog/pse-roadmap-2025) issues de la recherche distribuée de l'écosystème :

- **Lectures privées** - interroger et naviguer sur Ethereum sans révéler à quelles adresses, contrats ou données un utilisateur accède. La protection des lectures empêche la collecte de données avant même qu'une transaction ne soit signée.
- **Écritures privées** - envoyer des transactions résistantes à la censure et aux fuites de métadonnées, de l'inclusion dans la mempool jusqu'au règlement final. La protection des écritures garantit que les transactions privées ne sont pas censurées ou reliées à leur origine.
- **Preuves privées** - vérifier l'identité, l'éligibilité ou les données sans divulguer les informations personnelles sous-jacentes, en utilisant des preuves à divulgation nulle de connaissance efficaces. Les preuves privées permettent aux utilisateurs de participer au réseau tout en choisissant de ne révéler que le minimum d'informations nécessaires (divulgation sélective).

Ensemble, ces trois domaines forment un modèle de confidentialité de bout en bout. L'objectif est la **souveraineté informatique**, garantissant qu'Ethereum est une plateforme où les individus et les institutions peuvent interagir, se coordonner et effectuer des transactions à l'échelle mondiale sans collecte de données non approuvée, surveillance ou censure centralisée.

**Pourquoi la confidentialité est-elle importante ?** Découvrez la confidentialité, comment protéger votre confidentialité en ligne et comment protéger votre confidentialité sur Ethereum aujourd'hui.

<ButtonLink variant="outline" href="/privacy/">En savoir plus sur la confidentialité</ButtonLink>

## Les lectures privées protègent les requêtes des utilisateurs et les données d'accès {#private-reads}

Avant même qu'une transaction ne soit signée, un utilisateur doit lire des données sur la chaîne de blocs. Pour vérifier un solde, estimer le gaz ou vérifier l'état d'un contrat intelligent, le logiciel du portefeuille envoie des requêtes à un fournisseur de nœud. Ces requêtes standard d'**appel de procédure distante (RPC)** exposent une immense quantité de métadonnées.

Le fournisseur de nœud peut voir l'adresse IP de l'utilisateur, l'empreinte de l'appareil, les adresses spécifiques interrogées, ainsi que le moment et la fréquence de son activité. Même si un utilisateur envoie ensuite une transaction privée, le fournisseur d'infrastructure a déjà accès à une carte détaillée de ses intentions.

<VideoWatch slug="ethereum-privacy-stack-andy-guzman" />

La fuite de métadonnées au niveau de la couche d'accès est l'un des problèmes de confidentialité les plus persistants dans tous les systèmes de chaîne de blocs. Ethereum vise à résoudre la fuite de métadonnées par la confidentialité de l'origine (cacher qui a demandé), la confidentialité du contenu (cacher ce qui a été demandé), et la vérification de l'exactitude des informations retournées.

La **confidentialité de l'origine** utilise des [RPC anonymes](https://privreads.ethereum.foundation/feed/anon-rpc/) et des solutions de réseau anonyme pour masquer l'entité demandant les données, la **confidentialité du contenu** utilise des tactiques telles que la récupération d'informations privées et la [RAM inconsciente (oblivious RAM)](https://en.wikipedia.org/wiki/Oblivious_RAM) pour cacher les données interrogées, tandis que la **vérification de l'exactitude** utilise des clients légers pour prouver que les données retournées sont exactes.

La brique cryptographique derrière la confidentialité du contenu est la [**récupération d'informations privées (PIR)**](https://en.wikipedia.org/wiki/Private_information_retrieval), une technique cryptographique qui permet à un client d'interroger une base de données et de récupérer une information spécifique sans révéler au serveur quel élément a été consulté. Le serveur traite la requête à l'aveugle et renvoie une réponse chiffrée que seul le portefeuille demandeur peut déchiffrer.

La PIR fonctionne au niveau de la couche d'accès, se situant entre le logiciel du portefeuille et les fournisseurs de nœuds. À mesure que les implémentations de la PIR gagneront en maturité, elles seront intégrées dans les kits de développement logiciel (SDK) de portefeuilles et chez les fournisseurs d'infrastructure, permettant aux utilisateurs d'interroger le réseau sans exposer leur activité à des intermédiaires centralisés.

Les lectures privées réduisent également l'exposition au front-running et aux attaques sur l'ordre des transactions. Si un fournisseur d'infrastructure ne peut pas voir quel contrat intelligent ou quelle adresse un utilisateur interroge, il ne peut pas vendre cette information à des acteurs qui profitent de l'anticipation de l'activité onchain.

## Les écritures privées empêchent la censure et la fuite des transactions {#private-writes}

Une fois qu'une transaction est envoyée, elle traverse une infrastructure réseau qui peut l'observer ou la bloquer avant qu'elle ne soit enregistrée onchain. C'est là que de nombreux protocoles de confidentialité échouent en pratique. De grands constructeurs de blocs centralisés surveillent la mempool et peuvent discrètement écarter ou censurer les transactions provenant d'outils de confidentialité. Même si la cryptographie sous-jacente est solide, une transaction qui n'est jamais incluse dans un bloc n'offre aucune protection.

Deux mises à niveau au niveau du protocole abordent ce problème ensemble :

L'[**EIP-8141 (Transactions de trame)**](https://eips.ethereum.org/EIPS/eip-8141) introduit un nouveau type de transaction qui divise les transactions en segments pour la validation de la signature et l'autorisation des frais, et pour les instructions de transaction proprement dites. Les transactions de trame permettent aux [comptes intelligents](/roadmap/account-abstraction/) de définir leurs propres schémas de signature et d'utiliser des contrats externes pour couvrir les frais de gaz. Des règles strictes de bac à sable (sandboxing) dans la mempool empêchent ces transactions d'ouvrir le réseau à des attaques par déni de service.

Les transactions de trame sont envisagées pour la [mise à niveau Hegotá](https://forkcast.org/upgrade/hegota/) d'Ethereum, la prochaine mise à niveau du réseau après la future [mise à niveau Glamsterdam](/roadmap/glamsterdam/). Cette même mise à niveau permettra également aux comptes intelligents d'adopter des [signatures résistantes aux ordinateurs quantiques](/roadmap/security/quantum-resistance/) avant que la transition complète du réseau post-quantique ne soit achevée.

<ExpandableCard title="Comment les transactions frame (EIP-8141) permettent-elles la confidentialité ?" eventCategory="/roadmap/privacy" eventName="clicked how do frame transactions enable privacy?">

Les transactions de trame permettent aux comptes de choisir leur propre méthode de vérification de signature. Pour la confidentialité, cela signifie que les utilisateurs peuvent adopter des schémas de signature préservant la confidentialité sans attendre une migration à grande échelle à l'échelle du réseau. Les transactions de trame permettent également l'abstraction des frais de gaz, permettant aux outils de confidentialité de couvrir les coûts de transaction sans exposer les adresses des utilisateurs onchain.

</ExpandableCard>

L'[**EIP-7805 (Listes d'inclusion appliquées par le choix de fork, ou FOCIL)**](https://eips.ethereum.org/EIPS/eip-7805) fournit le mécanisme d'application pour les écritures privées. Les proposeurs de blocs sont tenus par les règles de consensus d'inclure dans leurs blocs des transactions provenant de listes d'inclusion locales agrégées, qui collectent des transactions de sources multiples. Si un constructeur de blocs tente de censurer une transaction apparue sur les listes d'inclusion, les nœuds d'attestation rejettent entièrement le bloc proposé. FOCIL est actuellement envisagé pour la [mise à niveau Hegotá](https://forkcast.org/upgrade/hegota/).

Les transactions de trame donnent aux utilisateurs la flexibilité de construire des transactions préservant la confidentialité avec des schémas de signature personnalisés, tandis que FOCIL garantit que ces transactions ne peuvent pas être censurées de manière sélective une fois qu'elles entrent dans la mempool. Ensemble, ils traitent deux points de défaillance différents : l'un permet le format des transactions privées, l'autre garantit leur inclusion. Aucun acteur central ne peut bloquer un transfert privé valide.

<VideoWatch slug="eip-7805-focil-explained" />

Un deuxième point vulnérable pour la confidentialité des utilisateurs est la façon dont Ethereum suit l'ordre des transactions, appelé le système de nonce séquentiel. Dans le modèle de compte Ethereum standard, chaque compte utilise un compteur unique à incrémentation linéaire. Si une transaction privée est retardée dans la mempool, toutes les transactions ultérieures de ce compte sont bloquées derrière elle. La séquence de nonce permet également aux observateurs du réseau de relier plusieurs transactions au même compte d'origine, compromettant ainsi la confidentialité.

L'[**EIP-8250 (Nonces à clé pour les transactions de trame)**](https://eips.ethereum.org/EIPS/eip-8250), actuellement envisagé pour Hegotá, résout ce problème en permettant à un seul compte de gérer simultanément plusieurs séquences de transactions parallèles. Les utilisateurs peuvent exécuter de nombreuses transactions privées dans différents contextes en même temps, et les observateurs ne peuvent plus corréler de manière fiable des activités distinctes au même compte parent.

### Paiements privés et transfert de valeur {#private-payments}

Au-delà du routage des transactions et de la gestion des nonces, la protection des écritures nécessite de masquer les identités et les actifs impliqués dans un transfert. Même lorsqu'un utilisateur effectue une requête en privé et diffuse une transaction sans censure, les données de transaction enregistrées onchain restent publiquement visibles. N'importe qui peut voir qui a envoyé combien à qui, et les sociétés d'analyse de chaîne agrègent ces données dans des profils consultables qui persistent indéfiniment.

L'[**EIP-8182 (Transferts privés d'ETH et d'ERC-20)**](https://eips.ethereum.org/EIPS/eip-8182), proposé pour la mise à niveau Hegotá, introduit un pool masqué partagé et natif directement dans le protocole Ethereum pour les transferts d'ETH et d'ERC-20. Les pools de confidentialité utilisent le mixage cryptographique pour rompre le lien entre le dépôt et le retrait, mais ne sont aujourd'hui disponibles que via des applications de confidentialité, des portefeuilles et des réseaux de couche 2 (l2).

Historiquement, les solutions de confidentialité au niveau des applications ont fracturé la liquidité et souffert de faibles ensembles d'anonymat. L'EIP-8182 consolide les transferts masqués au niveau du protocole, permettant aux utilisateurs d'acheminer des fonds via des clés de livraison cachées sans nécessiter d'architectures de portefeuille spécialisées ni interagir avec des applications fragmentées et optionnelles.

D'autres approches de recherche avancées pour la confidentialité des transactions incluent des preuves qui permettent aux utilisateurs de démontrer que les montants des transactions sont valides sans révéler les valeurs réelles (comme les bulletproofs et les preuves de plage). La recherche sur les **transactions confidentielles** vise à cacher les montants tout en permettant au réseau de vérifier qu'aucune valeur n'est créée ou détruite.

Ces solutions de la couche de paiement s'appuient sur l'infrastructure décrite plus tôt dans cette section. La PIR protège la phase de préparation, les transactions de trame et FOCIL garantissent que les paiements privés atteignent la mempool sans censure, et les zkVMs permettent la cryptographie complexe requise pour masquer la valeur tout en maintenant les garanties de sécurité du réseau.

## Preuves privées et protection de l'identité {#private-proving}

La confidentialité ne consiste pas en une dissimulation totale. Il s'agit de **divulgation sélective**, ou de choisir quelles informations révéler, à qui, et à quelles conditions. Ethereum prend en charge la divulgation sélective grâce aux [**preuves à divulgation nulle de connaissance (ZKP)**](/zero-knowledge-proofs/), qui permettent à une partie de prouver qu'une affirmation est vraie sans révéler les données sous-jacentes. Par exemple, prouver sa citoyenneté sans révéler les détails de son passeport, ou prouver un seuil d'âge sans révéler une date de naissance exacte.

Les preuves privées se connectent à la feuille de route de la confidentialité en permettant une identité vérifiable sans exposition des données au niveau du protocole. Alors que les lectures et écritures privées protègent les métadonnées des transactions, les preuves privées garantissent que les vérifications d'identité et d'éligibilité requises pour la participation dans le monde réel ne nécessitent pas de céder des données personnelles à des systèmes de vérification centralisés.

Sur la feuille de route de la confidentialité d'Ethereum, les preuves privées sont soutenues par des pistes d'infrastructure complémentaires, l'une sur la couche d'exécution pour rendre le calcul privé possible au niveau du protocole, et l'autre sur la couche d'accès, qui rend le calcul privé pratique sur les appareils grand public.

Les **machines virtuelles à divulgation nulle de connaissance (zkVMs)** permettent aux contrats intelligents d'exécuter leur logique et de générer une preuve cryptographique que le travail a été effectué correctement. Lorsque cette preuve est véritablement à divulgation nulle de connaissance, elle ne révèle rien sur les entrées, l'état intermédiaire ou les sorties, débloquant ainsi le calcul privé au niveau du réseau.

Le nom « zkVM » comporte une nuance ; la plupart des systèmes appelés zkVMs aujourd'hui sont succincts plutôt qu'à divulgation nulle de connaissance. Leurs preuves sont petites et rapides à vérifier, mais ne cachent pas nécessairement les données utilisées pour les générer. Aujourd'hui, seule une poignée de systèmes de preuve offrent la propriété de dissimulation dont dépendent les applications de confidentialité. Les [benchmarks de preuves côté client](https://ethproofs.org/csp-benchmarks) suivent quelles zkVMs ont été analysées pour une véritable divulgation nulle de connaissance dans les propriétés de leur système. Combler cette lacune fait partie du travail sur les preuves privées de la feuille de route.

Les transactions de trame (EIP-8141) sont également liées à la mise en œuvre des zkVMs. Elles peuvent utiliser des schémas de vérification personnalisés pour soumettre des transitions d'état vérifiées par des preuves, permettant aux applications d'offrir des environnements d'exécution privés et de soumettre la preuve cryptographique au réseau public Ethereum que l'action a été effectuée correctement, sans exposer les données de transaction elles-mêmes.

Les preuves à divulgation nulle de connaissance sont excellentes pour permettre aux individus de prouver que leurs données sont valides tout en les gardant privées, mais elles ne peuvent pas facilement gérer les contrats intelligents où plusieurs utilisateurs doivent interagir avec un pool partagé de données secrètes en même temps.

Pour combler cette lacune, la feuille de route d'Ethereum intègre le **chiffrement entièrement homomorphe (FHE)**. Le FHE permet aux contrats intelligents d'exécuter des calculs directement sur des données chiffrées sans jamais avoir à déchiffrer ou exposer les informations sous-jacentes. L'intégration de briques de base FHE et de coprocesseurs cryptographiques spécialisés dans Ethereum est essentielle pour les applications décentralisées qui s'appuient sur un « état caché » partagé, comme les teneurs de marché automatisés (AMM) privés, les pools de prêt confidentiels ou les enchères à offres scellées où les entrées de chacun doivent interagir tout en restant complètement secrètes.

Les **preuves côté client** rendent la génération de ces preuves de confidentialité pratique sur les appareils de tous les jours. Le projet de preuves côté client maintient une suite de benchmarks publics comparant les systèmes de preuve et les zkVMs sur du matériel grand public, publiant les résultats sur [ethproofs.org](https://ethproofs.org). La recherche technique vise des preuves transparentes et [post-quantiques](/roadmap/security/quantum-resistance/) avec une vérification directe onchain, rendant le calcul privé plus rapide, plus facile à vérifier directement sur le réseau Ethereum, et viable sur les appareils mobiles.

L'**[initiative zkID](https://pse.dev/projects/zk-id)** a produit une infrastructure open-source alignée sur les cadres d'identité mondiaux, y compris le portefeuille d'identité numérique européenne (EUDI). Le système Open Anonymous Credentials (OpenAC) offre une non-traçabilité pour les identifiants émis, garantissant que plusieurs preuves générées par le même utilisateur sur différentes plateformes ne peuvent pas être corrélées à un profil unique.

Dans l'espace de la gouvernance, le protocole **[Minimal Anti-Collusion Infrastructure (MACI)](https://maci.pse.dev/)** offre l'**absence de reçu**, rendant cryptographiquement impossible de prouver comment un compte a voté. Parce que les électeurs ne peuvent pas produire de reçu montrant leur choix, l'achat de votes et la coercition perdent leur incitation économique. MACI a sécurisé des décisions de financement dans le monde réel depuis 2020 via [clr.fund](https://clr.fund/), qui a distribué des millions de dollars en financement quadratique pour les biens publics d'Ethereum.

Le vote préservant la confidentialité protège déjà de vrais électeurs dans des contextes à enjeux élevés. Le [Freedom Tool de Rarimo](https://docs.rarimo.com/freedom-tool/) utilise la vérification de passeport à divulgation nulle de connaissance pour permettre aux citoyens de prouver qu'ils sont éligibles pour voter sans révéler qui ils sont. Il a alimenté des élections parallèles anonymes et des sondages de l'opposition dans des pays comme la Russie (le vote de l'opposition [Russia2024](https://rarimo.medium.com/russian-opposition-use-rarimos-freedom-tool-to-launch-surveillance-free-voting-app-0d73ebea5e8a)), la Géorgie (l'application de sondage United Space) et l'Iran (le projet Iranians Vote), où la sécurité des électeurs dépend du secret cryptographique du scrutin.

Les preuves privées permettent également une **confidentialité soucieuse de la conformité**. Les solutions de confidentialité comme les pools de confidentialité acceptent les dépôts librement mais exigent des utilisateurs qu'ils génèrent des preuves à divulgation nulle de connaissance que leurs fonds ne croisent pas des adresses malveillantes connues avant de les retirer. Le modèle de conformité programmable sépare l'acte de masquer les transactions de l'acte de démontrer la conformité réglementaire, permettant aux utilisateurs quotidiens d'effectuer des transactions en privé tout en répondant aux exigences institutionnelles.

Les zkEVMs peuvent exécuter ces vérifications de conformité en privé, vérifiant le statut réglementaire sans exposer les détails de la transaction ou l'identité des utilisateurs.

## Avancement actuel de la feuille de route {#current-progress}

La direction du développement de la confidentialité sur Ethereum est façonnée par un alignement à l'échelle de l'écosystème plutôt que par une seule organisation. La feuille de route [strawmap.org](https://strawmap.org/) rassemble les mises à niveau proposées à travers l'écosystème pour suivre et proposer les points sur lesquels la communauté a atteint un consensus. Les chercheurs de la Fondation Ethereum aident à gérer une feuille de route parallèle de recherche et développement à travers l'écosystème de recherche, axée sur l'avancement des outils de confidentialité de la couche d'accès, de l'infrastructure d'identité et des systèmes soucieux de la conformité. Les deux exemples reflètent la même priorité sous-jacente de rendre la confidentialité sur Ethereum structurelle plutôt qu'optionnelle.

La recherche et le développement sur la confidentialité sur Ethereum s'étendent à des dizaines d'équipes à travers l'écosystème. Les travaux progressent sur les mises à niveau du protocole, les solutions de la couche d'accès, l'infrastructure d'identité et les outils soucieux de la conformité.

**Mises à niveau du protocole** : L'EIP-8141 (Transactions de trame), l'EIP-7805 (FOCIL), l'EIP-8250 (Nonces à clé) et l'EIP-8182 (Pools masqués au niveau du protocole) sont en développement actif et sont envisagés pour la [mise à niveau Hegotá](https://forkcast.org/upgrade/hegota/), la prochaine mise à niveau du réseau après [Glamsterdam](/roadmap/glamsterdam/). L'EIP-8025 (preuves d'exécution optionnelles) et les arbres Verkle sont également ciblés pour Hegotá, fournissant la base du calcul privé basé sur zkEVM sur le réseau principal Ethereum. En parallèle, la recherche gagne en maturité autour des coprocesseurs FHE pour permettre des contrats intelligents chiffrés multipartites.

**Couche d'accès** : La recherche sur la PIR progresse avec des implémentations actives testées par les équipes d'infrastructure. Le SDK du portefeuille Kohaku est en cours de développement en tant que référence open-source pour les portefeuilles préservant la confidentialité.

**Preuves côté client** : Les équipes utilisent activement les résultats de tests basés sur des benchmarks pour optimiser la façon dont les preuves à divulgation nulle de connaissance s'exécutent sur des appareils standard. Des projets comme Spartan-WHIR font progresser des preuves sécurisées et résistantes aux ordinateurs quantiques qui peuvent être facilement vérifiées directement sur le réseau Ethereum. Des initiatives de recherche comme leanVM fournissent une zkVM légère conçue pour regrouper plusieurs signatures cryptographiques, réduisant la taille des données des signatures résistantes aux ordinateurs quantiques de 250 fois pour économiser de l'espace et réduire les coûts du réseau.

**Identité et preuves** : L'initiative zkID produit des schémas de preuve optimisés pour les appareils mobiles. MACI continue de sécuriser les cycles de financement quadratique et la gouvernance des DAO, des outils comme le Freedom Tool de Rarimo transposent le vote à divulgation nulle de connaissance dans des élections du monde réel, et la recherche en cours se poursuit sur les normes d'identité préservant la confidentialité.

Aucune partie de ce travail n'est terminée. Les délais sont des objectifs, pas des garanties, et le [processus de gouvernance basé sur le consensus](/governance/) d'Ethereum signifie que la feuille de route peut changer à mesure que la recherche progresse. Mais l'ampleur du développement actif et le nombre d'équipes travaillant sur la confidentialité représentent un engagement clair à rendre Ethereum résistant à l'extraction par défaut.

## Lectures complémentaires {#further-reading}

- [La confidentialité sur Ethereum](/privacy/)
- [Feuille de route PSE : 2025 et au-delà](https://pse.dev/blog/pse-roadmap-2025)
- [Le mandat de la Fondation Ethereum](/foundation/mandate/)
- [strawmap.org](https://strawmap.org/)
- [Preuves à divulgation nulle de connaissance](/zero-knowledge-proofs/)
- [Identité décentralisée](/decentralized-identity/)
- [Feuille de route de Kohaku](https://notes.ethereum.org/@niard/KohakuRoadmap)
- [Benchmarks de preuves côté client](https://ethproofs.org/csp-benchmarks)
- [zkEVM en chiffres](https://zkevm.ethereum.foundation/)