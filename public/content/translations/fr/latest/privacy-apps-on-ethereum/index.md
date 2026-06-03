---
title: "Comment créer des applications de confidentialité sur Ethereum avec des preuves à divulgation nulle de connaissance"
description: "Un modèle réutilisable alimente le vote anonyme, les mixeurs, les airdrops et les systèmes d'adhésion sur Ethereum. Découvrez le cycle engagement-annulateur-preuve et comment les outils à divulgation nulle de connaissance rendent sa création pratique aujourd'hui."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "preuves à divulgation nulle de connaissance"
  - "confidentialité"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-2.png
breadcrumb: Applications de confidentialité sur Ethereum
lang: fr
---

Ethereum est radicalement public par conception. Chaque adresse, solde, transaction, appel de contrat et événement est visible par quiconque disposant d'un explorateur de blocs. Cette transparence est utile lorsque vous souhaitez de la vérifiabilité. C'est un problème lorsque les utilisateurs doivent voter, faire une réclamation, effectuer un retrait ou prouver leur adhésion sans relier chaque action au même portefeuille.

L'adhésion anonyme est le modèle réutilisable qui alimente une grande catégorie d'applications de confidentialité sur Ethereum. Les personnes s'inscrivent d'abord, puis prouvent plus tard qu'elles appartiennent au groupe sans révéler quel membre elles sont. Une preuve à divulgation nulle de connaissance est le pont entre le portefeuille d'inscription et le portefeuille d'action, et le pont ne révèle pas qui l'a traversé.

Le produit environnant change, mais le squelette de confidentialité reste le même.

## Le modèle, expliqué à travers le vote anonyme {#the-pattern-explained-through-anonymous-voting}

Le modèle comporte trois éléments. Un engagement inscrit chaque membre. Un arbre de Merkle transforme ces engagements en une foule. Une preuve et un annulateur permettent à un membre d'agir une fois sans révéler quel membre a agi.

### Première étape : l'inscription {#step-one-registering}

Chaque électeur crée deux valeurs privées hors chaîne, le secret et l'annulateur. L'électeur hache ces valeurs en un engagement public, puis inscrit cet engagement onchain.

L'engagement est le registre d'inscription public. Le secret et l'annulateur constituent la note privée dont l'électeur aura besoin plus tard. S'il perd la note, l'électeur ne peut pas prouver son adhésion. S'il la divulgue, quelqu'un d'autre pourrait être en mesure de voter à la place de l'utilisateur.

Parce que l'engagement est un hash, les observateurs ne peuvent pas récupérer les valeurs privées qu'il contient. L'engagement indique que « quelqu'un s'est inscrit » sans révéler qui utilisera plus tard cette inscription.

### Deuxième étape : la constitution de la foule {#step-two-building-the-crowd}

À mesure que de plus en plus d'électeurs s'inscrivent, l'application rassemble leurs engagements dans un arbre de Merkle. Un arbre de Merkle compresse une longue liste de valeurs en un seul hash, appelé la racine. Modifiez n'importe quelle valeur dans la liste et le hash change, de sorte que la racine agit comme un résumé inviolable de l'ensemble.

Cet arbre est votre ensemble d'anonymat. Si dix utilisateurs sont dans l'arbre, un observateur peut restreindre une action ultérieure à l'un de ces dix. Si dix mille utilisateurs sont dans l'arbre, l'action est beaucoup plus difficile à relier à une seule personne. Une application privée avec un minuscule ensemble d'anonymat n'est généralement pas très confidentielle, même si la cryptographie est correcte.

### Troisième étape : agir anonymement {#step-three-acting-anonymously}

Lorsque le scrutin s'ouvre, l'électeur ne doit pas voter depuis le même portefeuille qui a inscrit l'engagement. Voter depuis le portefeuille d'inscription relierait directement le vote à la personne inscrite et annulerait le travail de confidentialité. Au lieu de cela, l'électeur crée une preuve à divulgation nulle de connaissance. La déclaration est encodée sous forme de circuit qui dit : « Je connais des valeurs privées qui produisent un engagement inscrit, et je révèle le bon hash d'annulateur pour ce scrutin. »

La preuve convainc le contrat vérificateur que la déclaration est vraie. Elle ne révèle ni le secret, ni l'annulateur, ni quel engagement a été utilisé.

L'annulateur est ce qui empêche le double vote. Parallèlement à la preuve, l'électeur publie un hash d'annulateur. Le contrat de vote stocke ce hash après avoir accepté le vote. Si la même note privée est réutilisée pour le même scrutin, elle produit le même hash d'annulateur, et le contrat rejette le second vote. Combiné à la preuve, cela permet au contrat de savoir uniquement qu'un électeur inscrit a agi une fois, mais pas lequel.

## La porte réutilisable {#the-reusable-gate}

Cette même paire preuve-et-annulateur fonctionne au-delà du vote. Retirez l'histoire du vote et ce que vous obtenez est une porte de confidentialité pour les fonctions de contrat intelligent.

Avant que la fonction ne s'exécute, le contrat vérifie la racine de Merkle, vérifie la preuve, confirme que le hash d'annulateur n'a pas été utilisé et lie les entrées publiques à la bonne application, chaîne, scrutin, réclamation ou retrait. Si ces vérifications réussissent, il marque l'annulateur comme utilisé et exécute le reste de la fonction.

Placez cette porte devant un vote et vous obtenez un vote anonyme. Placez-la devant une réclamation d'airdrop et vous obtenez des réclamations anonymes. Placez-la devant une fonction de retrait et vous obtenez le cœur d'un flux de retrait de type mixeur. Même arbre d'engagement, même idée d'annulateur, même modèle de preuve. Ce qui change, c'est le corps de la fonction et la logique de l'application environnante.

## Ce qui s'exécute et où {#what-runs-where}

Le travail privé se déroule généralement hors chaîne. L'utilisateur stocke la note, et une application cliente construit le témoin et exécute le prouveur pour produire la preuve. Un indexeur suit les engagements et les racines de Merkle. Un assembleur propage l'opération d'utilisateur onchain et un paymaster ERC-4337 sponsorise le gaz, de sorte qu'un nouveau portefeuille n'a pas besoin d'ETH provenant d'un portefeuille connu de l'utilisateur au préalable.

L'application publique se fait onchain. Le contrat vérificateur vérifie la preuve. Le contrat de l'application vérifie les racines valides et les annulateurs inutilisés, stocke le hash d'annulateur et exécute l'action publique.

L'expérience utilisateur (UX) sensible est la gestion des notes. Traitez le secret et l'annulateur comme des clés. Ne les mettez pas dans les analyses, les journaux, les URL, les rapports d'erreurs ou la télémétrie normale côté serveur. Une fois que la note fuite, la confidentialité disparaît, quelle que soit la solidité de la preuve.

## Les outils ont rattrapé leur retard {#the-tooling-caught-up}

Vous n'avez pas besoin de coder manuellement la cryptographie sous-jacente. Une approche courante consiste à écrire le circuit dans un langage à divulgation nulle de connaissance de haut niveau, à générer un vérificateur Solidity et à appeler ce vérificateur depuis le contrat de l'application.

La bonne pile technologique dépend de la tâche. Circom avec snarkjs est une voie établie de longue date pour les circuits au niveau de l'application. Noir avec Barretenberg est une voie plus récente et conviviale pour les développeurs. Halo2 et gnark sont des bibliothèques de circuits de plus bas niveau. Les zkVM telles que RISC Zero ou SP1 prouvent des programmes normaux, mais peuvent être plus coûteuses à prouver qu'un petit circuit personnalisé.

Pour l'adhésion anonyme, tournez-vous vers un protocole existant avant d'écrire votre propre circuit. Semaphore regroupe l'adhésion à un groupe et la prévention de la double utilisation basée sur un annulateur dans des contrats et des bibliothèques JavaScript. Pour le vote privé et la gouvernance, MACI est la voie spécialisée car elle ajoute des propriétés anti-collusion. Les protocoles matures sont souvent plus sûrs que les nouveaux circuits.

## La preuve ne suffit pas {#the-proof-is-not-enough}

Même une preuve parfaite échoue si le flux du portefeuille divulgue le lien. Inscrivez-vous depuis le portefeuille A et agissez plus tard depuis le portefeuille A, et quiconque observe peut relier les transactions. Financez le portefeuille B depuis le portefeuille A juste avant d'agir, et cette transaction de financement crée le même problème.

C'est pourquoi les assembleurs et les paymasters sont importants. Le portefeuille d'action doit être nouveau, et il ne devrait pas avoir besoin de recevoir de l'ETH d'un portefeuille que l'utilisateur essaie de séparer de l'action.

Le même problème existe hors chaîne. Soumettre des transactions d'inscription et d'action à partir de la même adresse IP, du même fournisseur RPC ou de la même session peut affaiblir la confidentialité fournie par le circuit. Les interfaces utilisateur (frontends) peuvent fuiter via les analyses, le stockage local et les journaux d'assistance. Une preuve à divulgation nulle de connaissance cache les valeurs à l'intérieur de la preuve. Elle ne cache pas tout ce qui entoure la transaction.

Les entrées publiques sont un autre point de défaillance des applications de confidentialité. Tout ce qui est marqué comme public dans le circuit, émis comme un événement, inclus dans les données d'appel ou stocké par le contrat est visible. Examinez les entrées publiques aussi soigneusement que le contrôle d'accès sur un contrat Solidity.

## Ce que cela change pour les constructeurs {#what-this-changes-for-builders}

La confidentialité sur Ethereum est réalisable. Les constructeurs peuvent assembler les pièces pour créer de véritables applications. La pile technologique comprend un circuit pour la déclaration privée, un vérificateur pour la vérification des preuves, un contrat d'application pour les règles publiques, un indexeur pour les données de Merkle, ainsi qu'un assembleur et un paymaster pour une soumission intraçable et le parrainage du gaz.

Les parties difficiles sont la conception du produit, la gestion des clés, l'hygiène des métadonnées, les audits et l'élargissement de l'ensemble d'anonymat. Si vous vous trompez sur l'un de ces points, la confidentialité offerte par la preuve disparaît.

## Lectures complémentaires {#further-reading}

1. [Preuves à divulgation nulle de connaissance (ethereum.org)](https://ethereum.org/zero-knowledge-proofs/)
2. [Documentation de Semaphore](https://docs.semaphore.pse.dev/)
3. [Documentation de MACI](https://maci.pse.dev/)
4. [Documentation de Circom](https://docs.circom.io/)
5. [Documentation de Noir](https://noir-lang.org/)
6. [Livre sur Halo2](https://zcash.github.io/halo2/)
7. [Documentation de gnark](https://docs.gnark.consensys.io/)
8. [Documentation de RISC Zero](https://dev.risczero.com/api/)
9. [Documentation de SP1](https://docs.succinct.xyz/docs/sp1/introduction)
10. [EIP-4337 : Abstraction de compte via le contrat EntryPoint](https://eips.ethereum.org/EIPS/eip-4337)