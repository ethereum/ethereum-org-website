---
title: "Comprendre les mécanismes de consensus de la chaîne de blocs"
description: "Une explication couvrant les principaux mécanismes de consensus utilisés dans les chaînes de blocs, et comment ils permettent aux réseaux décentralisés de s'accorder sur l'état des transactions sans autorité centrale."
lang: fr
youtubeId: "ojxfbN78WFQ"
uploadDate: 2018-11-29
duration: "0:09:33"
educationLevel: beginner
topic:
  - "consensus"
  - "blockchain"
format: explainer
author: Tech in Asia
breadcrumb: "Mécanismes de consensus"
---

Une explication par **Tech in Asia** couvrant les trois principaux mécanismes de consensus utilisés dans les systèmes de chaîne de blocs, la preuve de travail (PoW), la preuve d'enjeu (PoS) et la preuve d'autorité (PoA), et comment ils permettent aux réseaux décentralisés de s'accorder sur l'état des transactions.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=ojxfbN78WFQ) publiée par Tech in Asia. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Que sont les mécanismes de consensus ? (0:00) {#what-are-consensus-mechanisms-000}

La chaîne de blocs — le mot à la mode de 2018. Mais savez-vous comment un système pair à pair décentralisé sans figure d'autorité prend des décisions ? La réponse réside dans les mécanismes de consensus. Il existe divers mécanismes de consensus, mais ils servent tous le même objectif : garantir que les enregistrements sont vrais et honnêtes. La différence réside dans la manière dont le consensus est atteint. Nous allons explorer ici trois types de mécanismes de consensus.

#### Preuve de travail (PoW) (0:23) {#proof-of-work-023}

Dans un système de preuve de travail (PoW), les données de transaction sont stockées dans des blocs, validés en demandant à des personnes de résoudre un problème mathématique complexe qui y est attaché. Cela est généralement effectué par des ordinateurs puissants et est connu sous le nom de « minage ». Une récompense sous forme de cryptomonnaie est attribuée au premier mineur qui résout le problème.

Imaginez un groupe de chasseurs de trésors essayant d'ouvrir un coffre muni d'une serrure compliquée. Trouver la bonne combinaison est fastidieux, mais la première personne à y parvenir est récompensée. Pour faire simple, la preuve de travail est une course pour trouver la bonne combinaison d'un coffre au trésor. Les cryptomonnaies comme Bitcoin et Ethereum utilisent un mécanisme de preuve de travail.

#### Preuve d'enjeu (PoS) (1:04) {#proof-of-stake-104}

Ensuite, nous avons la preuve d'enjeu (PoS). Ici, le créateur d'un nouveau bloc, également connu sous le nom de validateur, est choisi au hasard en fonction de la mise qu'il engage sur le réseau. Plus la mise placée est élevée, plus les chances d'être sélectionné comme validateur sont grandes.

Appliquons cela au scénario du coffre au trésor. Imaginez un groupe de chasseurs de trésors se disputant un coffre. Le coffre est attribué selon un système de loterie. Pour participer, chaque chasseur doit acheter des billets de loterie. Plus chaque chasseur en achète, plus ses chances de gagner sont élevées. Les protocoles de chaîne de blocs comme Ouroboros de Cardano et EOS adoptent le consensus de preuve d'enjeu.

#### Preuve d'autorité (PoA) (1:42) {#proof-of-authority-142}

Enfin, la preuve d'autorité (PoA) — une forme modifiée de la preuve d'enjeu. Ici, seules les parties approuvées et sélectionnées en fonction de leur réputation peuvent devenir des validateurs.

Revenons au scénario du coffre au trésor. Le groupe de chasseurs de trésors forme un syndicat et met en commun ses trésors. En fonction de leur niveau de fiabilité, quelques personnes sélectionnées sont nommées par le groupe pour garantir la validité du contenu du coffre. Hyperledger Fabric d'IBM et le réseau de test Kovan d'Ethereum sont quelques exemples de systèmes de chaîne de blocs qui utilisent la preuve d'autorité.

#### Modèles de consensus hybrides (2:14) {#hybrid-consensus-models-214}

Alors que les entreprises traditionnelles de chaîne de blocs reposent sur un seul mécanisme de consensus, certaines entreprises innovantes adoptent plusieurs protocoles de consensus. Prenez la Fondation Opet, par exemple, qui construit une chaîne de blocs unique pour stocker les données collectées sur son application de chatbot d'accompagnement scolaire en appliquant à la fois les protocoles de preuve d'autorité (PoA) et de preuve de travail (PoW).

Des données telles que les dossiers académiques, extrascolaires et de profilage de personnalité des étudiants sont stockées sur la chaîne de blocs et potentiellement validées via un cadre de preuve d'autorité propulsé par Hyperledger Fabric. Les validateurs, dans ce cas, sont des établissements d'enseignement réputés ou même des bureaux d'enregistrement nationaux et les ministères de l'éducation respectifs. Cela permet de garantir que toutes les données des étudiants sont fiables.

Mais qui travaillera gratuitement ? Le consensus de preuve de travail entre en jeu pour offrir une récompense aux validateurs qui ont accompli un travail.

#### Confidentialité et données des étudiants (3:02) {#privacy-and-student-data-302}

Avec Hyperledger Fabric, chaque dossier d'étudiant est sécurisé avec une clé de hash privée appartenant à l'étudiant. Les données ne sont accessibles que lorsque l'étudiant fournit la clé unique. Cela signifie que la confidentialité de l'étudiant est préservée et contrôlée par l'étudiant lui-même.

Par exemple, lorsque les étudiants postulent à l'université via la plateforme d'Opet, ils fournissent la clé unique de leurs dossiers à l'université. Grâce à cela, l'université est en mesure d'accéder à leurs derniers dossiers académiques. Les étudiants pourront également voir si leurs dossiers ont été déverrouillés ou au moins pris en compte pour leur candidature. Cela améliore l'efficacité et la transparence par rapport aux méthodes traditionnelles.

#### Conclusion (3:37) {#closing-337}

En mariant les modèles de preuve de travail et de preuve d'autorité, la solution de chaîne de blocs de la Fondation Opet garantit la confidentialité des données des étudiants tout en incitant à la fois les établissements d'enseignement et les étudiants lorsqu'ils contribuent à la plateforme. Avec la popularité croissante des chaînes de blocs, ce n'est qu'une question de temps avant que nous ne voyions encore plus de systèmes hybrides uniques être créés.