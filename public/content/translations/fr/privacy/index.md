---
title: "Confidentialité sur Ethereum"
description: "Outils et techniques pour protéger votre confidentialité sur Ethereum"
lang: fr
---

# Confidentialité sur Ethereum {#introduction}

La confidentialité n'est pas seulement essentielle à la sécurité personnelle, elle est aussi la pierre angulaire de la liberté et un [garant clé de la décentralisation](https://vitalik.eth.limo/general/2025/04/14/privacy.html). La confidentialité donne aux gens la possibilité de s'exprimer, d'effectuer des transactions avec d'autres personnes et d'organiser des communautés librement. Mais comme pour toutes les blockchains, le registre public d'Ethereum rend la confidentialité difficile.

Ethereum est transparent par conception. Toute action en chaîne est visible par quiconque la consulte. Bien qu'Ethereum offre un pseudonymat en liant votre activité à une [clé publique](/decentralized-identity/#public-key-cryptography) plutôt qu'à une identité réelle, les schémas d'activité peuvent être analysés pour révéler des informations sensibles et identifier des utilisateurs.

L'intégration d'outils de protection de la confidentialité dans Ethereum peut aider les personnes, les organisations et les institutions à interagir en toute sécurité tout en limitant une exposition inutile. Cela rend l'écosystème plus sûr et plus pratique pour un plus large éventail de cas d'utilisation.

## Confidentialité des écritures {#privacy-of-writes}

Par défaut, chaque transaction écrite sur Ethereum est publique et permanente. Cela inclut non seulement l'envoi d'ETH, mais aussi l'enregistrement de noms ENS, la collecte de POAP ou l'échange de NFT. Les actions quotidiennes telles que les paiements, le vote ou la vérification d'identité peuvent révéler vos informations à des parties non intentionnelles. Il existe plusieurs outils et techniques qui peuvent aider à rendre ces actions plus confidentielles :

### Protocoles de mixage (ou "mixeurs") {#mixing-protocols}

Les mixeurs brisent le lien entre les expéditeurs et les destinataires en regroupant les transactions de nombreux utilisateurs dans un "pool" partagé, puis en permettant aux personnes de retirer ultérieurement des fonds vers une nouvelle adresse. Étant donné que les dépôts et les retraits sont mélangés, il est beaucoup plus difficile pour les observateurs de les relier.

_Exemples : [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Pools protégés {#shielded-pools}

Les pools protégés sont similaires aux mixeurs, mais ils permettent aux utilisateurs de détenir et de transférer des fonds de manière privée à l'intérieur même du pool. Au lieu de simplement masquer le lien entre le dépôt et le retrait, les pools protégés maintiennent un état privé continu, souvent sécurisé par des preuves à divulgation nulle de connaissance. Cela permet de créer des transferts privés, des soldes privés, et plus encore.

_Exemples : [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Adresses furtives {#stealth-addresses}

Une [adresse furtive](https://vitalik.eth.limo/general/2023/01/20/stealth.html) revient à donner à chaque expéditeur une boîte postale unique et à usage unique. que vous seul pouvez ouvrir. Chaque fois que quelqu'un vous envoie des cryptomonnaies, elles sont dirigées vers une nouvelle adresse, de sorte que personne d'autre ne peut voir que tous ces paiements vous appartiennent. Cela maintient la confidentialité de votre historique de paiement et le rend plus difficile à suivre.

_Exemples : [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Autres cas d'utilisation {#other-use-cases}

D'autres projets explorant les écritures privées incluent [PlasmaFold](https://pse.dev/projects/plasma-fold) (paiements privés) et des systèmes comme [MACI](https://pse.dev/projects/maci) et [Semaphore](https://pse.dev/projects/semaphore) (vote privé).

Ces outils étendent les options d'écriture privée sur Ethereum, mais chacun comporte des compromis. Certaines approches sont encore expérimentales, d'autres augmentent les coûts ou la complexité, et certains outils comme les mixeurs peuvent faire l'objet d'un examen juridique ou réglementaire en fonction de leur utilisation.

## Confidentialité des lectures {#privacy-of-reads}

La lecture ou la vérification de toute information sur Ethereum (par exemple, le solde de votre portefeuille) passe généralement par un service tel que votre fournisseur de portefeuille, un fournisseur de nœud ou un explorateur de blocs. Parce que vous comptez sur eux pour lire la blockchain pour vous, ils peuvent également voir vos requêtes ainsi que des métadonnées comme votre adresse IP ou votre emplacement. Si vous continuez à vérifier le même compte, ces informations peuvent être rassemblées pour lier votre identité à votre activité.

L'exécution de votre propre nœud Ethereum empêcherait cela, mais le stockage et la synchronisation de l'intégralité de la blockchain restent coûteux et peu pratiques pour la plupart des utilisateurs, en particulier sur les appareils mobiles.

Certains projets explorant les lectures privées incluent [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, récupérer des données sans révéler ce que vous recherchez), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (vérifications d'identité privées avec des preuves à divulgation nulle de connaissance), [vOPRF](https://pse.dev/projects/voprf) (utiliser des comptes Web2 de manière pseudonyme dans le Web3), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (calculer sur des données chiffrées), et [MachinaIO](https://pse.dev/projects/machina-io) (masquer les détails du programme tout en conservant les fonctionnalités).

## Confidentialité des preuves {#privacy-of-proving}

Les preuves préservant la confidentialité sont des outils que vous pouvez utiliser sur Ethereum pour démontrer que quelque chose est vrai sans révéler de détails inutiles. Par exemple, vous pourriez :

- Prouver que vous avez plus de 18 ans sans partager votre date de naissance complète
- Prouver la propriété d'un NFT ou d'un jeton sans révéler l'intégralité de votre portefeuille
- Prouver votre éligibilité à une adhésion, une récompense ou un vote sans exposer d'autres données personnelles

La plupart de ces outils reposent sur des techniques cryptographiques telles que les preuves à divulgation nulle de connaissance, mais le défi consiste à les rendre suffisamment efficaces pour fonctionner sur des appareils de tous les jours, portables sur n'importe quelle plateforme et sécurisés.

Certains projets explorant la confidentialité pour la preuve incluent [Client Side Proving](https://pse.dev/projects/client-side-proving) (systèmes de preuve ZK), [TLSNotary](https://tlsnotary.org/), (preuves d'authenticité pour toutes les données sur le web), [Mopro](https://pse.dev/projects/mopro) (preuve côté client mobile), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (cadres de délégation qui évitent les hypothèses de confiance), et [Noir](https://noir-lang.org/) (langage pour le calcul privé et vérifiable).

## Glossaire de la confidentialité {#privacy-glossary}

**Anonyme** : Interagir en supprimant définitivement tous les identifiants de vos données, ce qui rend impossible de remonter à un individu

**Chiffrement** : Un processus qui brouille les données de sorte que seule une personne disposant de la bonne clé puisse les lire

**[Chiffrement entièrement homomorphe](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)** : Un moyen d'effectuer des calculs directement sur des données chiffrées, sans jamais les déchiffrer

**[Obfuscation indiscernable](https://pse.dev/projects/machina-io) (iO)** : Techniques de confidentialité qui rendent les programmes ou les données inintelligibles tout en restant utilisables

**[Calcul multipartite](https://pse.dev/blog/secure-multi-party-computation) (MPC)** : Méthodes qui permettent à plusieurs parties de calculer un résultat ensemble sans exposer leurs entrées privées

**Cryptographie programmable** : Cryptographie flexible, régie par des règles, qui peut être personnalisée dans un logiciel pour contrôler comment et quand les données sont partagées, vérifiées ou révélées

**Pseudonyme** : Utiliser des codes ou des numéros uniques (comme une adresse Ethereum) à la place d'identifiants personnels

**Divulgation sélective** : La capacité de ne partager que ce qui est nécessaire (par exemple, prouver que vous possédez un NFT sans révéler l'historique complet de votre portefeuille)

**Non-liabilité** : S'assurer que des actions distinctes sur la blockchain ne peuvent pas être rattachées à la même adresse

**Vérifiabilité** : S'assurer que d'autres peuvent confirmer qu'une affirmation est vraie, comme la validation d'une transaction ou d'une preuve sur Ethereum

**Délégation vérifiable** : Assigner une tâche — comme la génération d'une preuve — à une autre partie (par exemple, un portefeuille mobile utilisant un serveur pour une cryptographie lourde) tout en pouvant vérifier qu'elle a été effectuée correctement

**[Preuves à divulgation nulle de connaissance](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKP)** : Protocoles cryptographiques qui permettent à quelqu'un de prouver qu'une information est vraie sans révéler les données sous-jacentes

**Rollup ZK** : Un système de scalabilité qui regroupe les transactions hors chaîne et soumet une preuve de validité en chaîne — non privé par défaut, mais qui permet des systèmes de confidentialité efficaces (comme les pools protégés) en réduisant les coûts

## Ressources {#resources}

- [Privacy Stewards of Ethereum](https://pse.dev/) (PSE), un laboratoire de recherche et développement de la Fondation Ethereum axé sur la confidentialité de l'écosystème
- [Web3PrivacyNow](https://web3privacy.info/), un réseau de personnes, de projets et d'organisations alignées qui protègent et font progresser les droits de l'homme en ligne
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), un site de notation de portefeuilles Ethereum visant à fournir une liste complète des portefeuilles, de leurs fonctionnalités, de leurs pratiques et de leur prise en charge de certaines normes.
- [Zk-kit](https://zkkit.pse.dev/) : Un ensemble de bibliothèques (algorithmes, fonctions utilitaires et structures de données) qui peuvent être réutilisées dans différents projets et protocoles à divulgation nulle de connaissance.
- [Applications de confidentialité](/apps/categories/privacy/) - Découvrez une liste d'applications de confidentialité sélectionnées qui fonctionnent sur Ethereum.
