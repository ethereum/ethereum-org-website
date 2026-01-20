---
title: Utiliser la preuve à divulgation nulle de connaissance pour un état secret
description: les jeux en chaîne sont limités car ils ne peuvent pas conserver d'informations cachées. Après avoir lu ce tutoriel, un lecteur sera en mesure de combiner des preuves à divulgation nulle de connaissance et des composants de serveur pour créer des jeux vérifiables avec un état secret, hors chaîne, composant. La technique pour ce faire sera démontrée en créant un jeu de démineur.
author: Ori Pomerantz
tags:
  [
    "serveur",
    "hors-chaîne",
    "centralisé",
    "preuve à divulgation nulle de connaissance",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: fr
published: 2025-03-15
---

_Il n'y a pas de secret sur la blockchain_. Tout ce qui est publié sur la blockchain est ouvert à la lecture de tous. C'est nécessaire, car la blockchain est basée sur le fait que tout le monde peut la vérifier. Cependant, les jeux reposent souvent sur un état secret. Par exemple, le jeu du [démineur](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) n'a absolument aucun sens si vous pouvez simplement aller sur un explorateur de blockchain et voir la carte.

La solution la plus simple est d'utiliser un [composant serveur](/developers/tutorials/server-components/) pour contenir l'état secret. Cependant, la raison pour laquelle nous utilisons la blockchain est d'empêcher la triche par le développeur du jeu. Nous devons garantir l'honnêteté du composant serveur. Le serveur peut fournir un hachage de l'état, et utiliser des [preuves à divulgation nulle de connaissance](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) pour prouver que l'état utilisé pour calculer le résultat d'un mouvement est le bon.

Après avoir lu cet article, vous saurez comment créer ce type de serveur de maintien d'état secret, un client pour montrer l'état, et un composant en chaîne pour la communication entre les deux. Les principaux outils que nous utiliserons seront :

| Outil                                         | Objectif                                                         |                  Vérifié sur la version |
| --------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | Preuves à divulgation nulle de connaissance et leur vérification |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | Langage de programmation pour le serveur et le client            |   5.4.2 |
| [Node](https://nodejs.org/en)                 | Exécution du serveur                                             | 20.18.2 |
| [Viem](https://viem.sh/)                      | Communication avec la Blockchain                                 |  2.9.20 |
| [MUD](https://mud.dev/)                       | Gestion des données en chaîne                                    |  2.0.12 |
| [React](https://react.dev/)                   | Interface utilisateur du client                                  |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | Servir le code client                                            |   4.2.1 |

## Exemple de démineur {#minesweeper}

Le [démineur](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) est un jeu qui comprend une carte secrète avec un champ de mines. Le joueur choisit de creuser à un endroit précis. Si cet emplacement contient une mine, la partie est terminée. Sinon, le joueur obtient le nombre de mines dans les huit cases environnantes.

Cette application est écrite en utilisant [MUD](https://mud.dev/), un framework qui nous permet de stocker des données en chaîne en utilisant une [base de données clé-valeur](https://aws.amazon.com/nosql/key-value/) et de synchroniser ces données automatiquement avec des composants hors chaîne. En plus de la synchronisation, MUD facilite le contrôle d'accès et permet aux autres utilisateurs d'[étendre](https://mud.dev/guides/extending-a-world) notre application sans permission.

### Exécuter l'exemple du démineur {#running-minesweeper-example}

Pour exécuter l'exemple du démineur :

1. Assurez-vous d'[avoir installé les prérequis](https://mud.dev/quickstart#prerequisites) : [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), et [`mprocs`](https://github.com/pvolok/mprocs).

2. Cloner le dépôt.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. Installez les paquets.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   Si Foundry a été installé dans le cadre de `pnpm install`, vous devez redémarrer le shell de ligne de commande.

4. Compiler les contrats

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. Démarrez le programme (y compris une blockchain [anvil](https://book.getfoundry.sh/anvil/)) et attendez.

   ```sh copy
   mprocs
   ```

   Notez que le démarrage prend beaucoup de temps. Pour voir la progression, utilisez d'abord la flèche vers le bas pour faire défiler jusqu'à l'onglet _contracts_ pour voir les contrats MUD en cours de déploiement. Lorsque vous recevez le message _Waiting for file changes…_, les contrats sont déployés et la suite de la progression se déroulera dans l'onglet _server_. Là, vous attendez de recevoir le message _Verifier address: 0x...._.

   Si cette étape est réussie, vous verrez l'écran `mprocs`, avec les différents processus à gauche et la sortie de la console pour le processus actuellement sélectionné à droite.

   ![L'écran mprocs](./mprocs.png)

   En cas de problème avec `mprocs`, vous pouvez exécuter les quatre processus manuellement, chacun dans sa propre fenêtre de ligne de commande :

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Contrats**

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Serveur**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **Client**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. Vous pouvez maintenant naviguer vers [le client](http://localhost:3000), cliquer sur **New Game** et commencer à jouer.

### Tables {#tables}

Nous avons besoin de [plusieurs tables](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) en chaîne.

- `Configuration` : cette table est un singleton, elle n'a pas de clé et un seul enregistrement. Elle est utilisée pour contenir les informations de configuration du jeu :
  - `height` : la hauteur d'un champ de mines
  - `width` : la largeur d'un champ de mines
  - `numberOfBombs` : le nombre de bombes dans chaque champ de mines

- `VerifierAddress`: cette table est également un singleton. Elle est utilisée pour contenir une partie de la configuration, l'adresse du contrat de vérification (`verifier`). Nous aurions pu mettre cette information dans la table `Configuration`, mais elle est définie par un composant différent, le serveur, il est donc plus facile de la mettre dans une table séparée.

- `PlayerGame` : la clé est l'adresse du joueur. Les données sont :

  - `gameId` : valeur de 32 octets qui est le hachage de la carte sur laquelle le joueur joue (l'identifiant du jeu).
  - `win` : un booléen indiquant si le joueur a gagné la partie.
  - `lose` : un booléen indiquant si le joueur a perdu la partie.
  - `digNumber` : le nombre de creusements réussis dans le jeu.

- `GamePlayer` : cette table contient le mappage inverse, de `gameId` à l'adresse du joueur.

- `Map` : la clé est un tuple de trois valeurs :

  - `gameId` : valeur de 32 octets qui est le hachage de la carte sur laquelle le joueur joue (l'identifiant du jeu).
  - Coordonnée `x`
  - Coordonnée `y`

  La valeur est un nombre unique. C'est 255 si une bombe a été détectée. Sinon, c'est le nombre de bombes autour de cet emplacement plus un. Nous ne pouvons pas simplement utiliser le nombre de bombes, car par défaut, tout le stockage dans l'EVM et toutes les valeurs de lignes dans MUD sont à zéro. Nous devons faire la distinction entre « le joueur n'a pas encore creusé ici » et « le joueur a creusé ici, et a trouvé qu'il n'y avait aucune bombe aux alentours ».

De plus, la communication entre le client et le serveur se fait via le composant en chaîne. Ceci est également implémenté en utilisant des tables.

- `PendingGame`: demandes non traitées pour démarrer une nouvelle partie.
- `PendingDig`: demandes non traitées pour creuser à un endroit spécifique dans un jeu spécifique. Il s'agit d'une [table hors chaîne](https://mud.dev/store/tables#types-of-tables), ce qui signifie qu'elle n'est pas écrite dans le stockage EVM, elle n'est lisible qu'en dehors de la chaîne en utilisant des événements.

### Flux d'exécution et de données {#execution-data-flows}

Ces flux coordonnent l'exécution entre le client, le composant en chaîne et le serveur.

#### Initialisation {#initialization-flow}

Lorsque vous exécutez `mprocs`, ces étapes se produisent :

1. [`mprocs`](https://github.com/pvolok/mprocs) exécute quatre composants :

   - [Anvil](https://book.getfoundry.sh/anvil/), qui exécute une blockchain locale
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), qui compile (si nécessaire) et déploie les contrats pour MUD
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), qui exécute [Vite](https://vitejs.dev/) pour servir l'interface utilisateur et le code client aux navigateurs Web.
   - [Serveur](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), qui effectue les actions du serveur

2. Le paquet `contracts` déploie les contrats MUD puis exécute [le script `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). Ce script définit la configuration. Le code de github spécifie [un champ de mines de 10x5 avec huit mines](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [Le serveur](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) commence par [configurer MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Entre autres, cela active la synchronisation des données, de sorte qu'une copie des tables pertinentes existe dans la mémoire du serveur.

4. Le serveur abonne une fonction à exécuter [lorsque la table `Configuration` change](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Cette fonction](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) est appelée après l'exécution de `PostDeploy.s.sol` et la modification de la table.

5. Lorsque la fonction d'initialisation du serveur dispose de la configuration, [elle appelle `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) pour initialiser [la partie preuve à divulgation nulle de connaissance du serveur](#using-zokrates-from-typescript). Cela ne peut pas se produire tant que nous n'avons pas la configuration, car les fonctions de preuve à divulgation nulle de connaissance doivent avoir la largeur et la hauteur du champ de mines comme constantes.

6. Une fois que la partie preuve à divulgation nulle de connaissance du serveur est initialisée, l'étape suivante consiste à [déployer le contrat de vérification de la preuve à divulgation nulle de connaissance sur la blockchain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) et à définir l'adresse du vérifié dans MUD.

7. Enfin, nous nous abonnons aux mises à jour pour savoir quand un joueur demande soit [de commencer une nouvelle partie](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) soit de [creuser dans une partie existante](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Nouvelle partie {#new-game-flow}

Voici ce qui se passe lorsque le joueur demande une nouvelle partie.

1. S'il n'y a pas de partie en cours pour ce joueur, ou s'il y en a une mais avec un gameId à zéro, le client affiche un [bouton nouvelle partie](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). Lorsque l'utilisateur appuie sur ce bouton, [React exécute la fonction `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) est un appel `System`. Dans MUD, tous les appels sont acheminés via le contrat `World`, et dans la plupart des cas, vous appelez `<namespace>__<function name>`. Dans ce cas, l'appel est à `app__newGame`, que MUD achemine ensuite vers [`newGame` dans `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. La fonction en chaîne vérifie que le joueur n'a pas de partie en cours, et s'il n'y en a pas, [ajoute la demande à la table `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Le serveur détecte le changement dans `PendingGame` et [exécute la fonction abonnée](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Cette fonction appelle [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), qui à son tour appelle [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. La première chose que `createGame` fait est de [créer une carte aléatoire avec le nombre de mines approprié](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Ensuite, elle appelle [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) pour créer une carte avec des bordures vides, ce qui est nécessaire pour Zokrates. Enfin, `createGame` appelle [`calculateMapHash`](#calculateMapHash), pour obtenir le hachage de la carte, qui est utilisé comme ID de jeu.

6. La fonction `newGame` ajoute la nouvelle partie à `gamesInProgress`.

7. La dernière chose que fait le serveur est d'appeler [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43), qui est en chaîne. Cette fonction se trouve dans un `System` différent, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), pour permettre le contrôle d'accès. Le contrôle d'accès est défini dans le [fichier de configuration MUD](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   La liste d'accès n'autorise qu'une seule adresse à appeler le `System`. Cela restreint l'accès aux fonctions du serveur à une seule adresse, afin que personne ne puisse se faire passer pour le serveur.

8. Le composant en chaîne met à jour les tables pertinentes :

   - Créer la partie dans `PlayerGame`.
   - Définir le mappage inverse dans `GamePlayer`.
   - Supprimer la demande de `PendingGame`.

9. Le serveur identifie le changement dans `PendingGame`, mais ne fait rien car [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) est faux.

10. Sur le client, [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) est défini sur l'entrée `PlayerGame` pour l'adresse du joueur. Lorsque `PlayerGame` change, `gameRecord` change aussi.

11. S'il y a une valeur dans `gameRecord`, et que la partie n'a été ni gagnée ni perdue, le client [affiche la carte](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Creuser {#dig-flow}

1. Le joueur [clique sur le bouton de la cellule de la carte](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), ce qui appelle [la fonction `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Cette fonction appelle [`dig` en chaîne](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. Le composant en chaîne [effectue un certain nombre de vérifications de cohérence](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), et en cas de succès, ajoute la demande de creusage à [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. Le serveur [détecte le changement dans `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Si elle est valide](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), il [appelle le code de preuve à divulgation nulle de connaissance](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (expliqué ci-dessous) pour générer à la fois le résultat et une preuve de sa validité.

4. [Le serveur](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) appelle [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) en chaîne.

5. `digResponse` fait deux choses. Tout d'abord, il vérifie [la preuve à divulgation nulle de connaissance](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Ensuite, si la preuve est valide, il appelle [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) pour traiter réellement le résultat.

6. `processDigResult` vérifie si la partie a été [perdue](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) ou [gagnée](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86), et [met à jour `Map`, la carte en chaîne](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. Le client récupère automatiquement les mises à jour et [met à jour la carte affichée au joueur](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), et le cas échéant, informe le joueur s'il s'agit d'une victoire ou d'une défaite.

## Utiliser Zokrates {#using-zokrates}

Dans les flux expliqués ci-dessus, nous avons ignoré les parties concernant la preuve à divulgation nulle de connaissance, en les traitant comme une boîte noire. Maintenant, ouvrons-la et voyons comment ce code est écrit.

### Hachage de la carte {#hashing-map}

Nous pouvons utiliser [ce code JavaScript](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) pour implémenter [Poseidon](https://www.poseidon-hash.info), la fonction de hachage Zokrates que nous utilisons. Cependant, bien que cela serait plus rapide, ce serait aussi plus compliqué que de simplement utiliser la fonction de hachage Zokrates pour le faire. Ceci est un tutoriel, et le code est donc optimisé pour la simplicité, non pour la performance. Par conséquent, nous avons besoin de deux programmes Zokrates différents, un pour calculer simplement le hachage d'une carte (`hash`) et un pour créer réellement une preuve à divulgation nulle de connaissance du résultat du creusement à un emplacement sur la carte (`dig`).

### La fonction de hachage {#hash-function}

C'est la fonction qui calcule le hachage d'une carte. Nous allons parcourir ce code ligne par ligne.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Ces deux lignes importent deux fonctions de la [bibliothèque standard de Zokrates](https://zokrates.github.io/toolbox/stdlib.html). [La première fonction](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) est un [hachage Poseidon](https://www.poseidon-hash.info/). Elle prend un tableau d'éléments [`field`](https://zokrates.github.io/language/types.html#field) et renvoie un `field`.

L'élément field dans Zokrates est généralement inférieur à 256 bits, mais pas de beaucoup. Pour simplifier le code, nous limitons la carte à 512 bits et nous hachons un tableau de quatre champs, et dans chaque champ, nous n'utilisons que 128 bits. La fonction [`pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) transforme un tableau de 128 bits en un `field` à cet effet.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Cette ligne commence une définition de fonction. `hashMap` reçoit un seul paramètre appelé `map`, un tableau `bool`(éen) à deux dimensions. La taille de la carte est de `width+2` par `height+2` pour des raisons qui sont [expliquées ci-dessous](#why-map-border).

Nous pouvons utiliser `${width+2}` et `${height+2}` car les programmes Zokrates sont stockés dans cette application sous forme de [modèles de chaînes de caractères](https://www.w3schools.com/js/js_string_templates.asp). Le code entre `${` et `}` est évalué par JavaScript, et de cette manière, le programme peut être utilisé pour différentes tailles de carte. Le paramètre map a une bordure d'un emplacement de large tout autour sans aucune bombe, c'est la raison pour laquelle nous devons ajouter deux à la largeur et à la hauteur.

La valeur de retour est un `field` qui contient le hachage.

```
   bool[512] mut map1d = [false; 512];
```

La carte est bidimensionnelle. Cependant, la fonction `pack128` ne fonctionne pas avec des tableaux bidimensionnels. Nous aplatissons donc d'abord la carte en un tableau de 512 octets, en utilisant `map1d`. Par défaut, les variables Zokrates sont des constantes, mais nous devons assigner des valeurs à ce tableau dans une boucle, nous le définissons donc comme [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Nous devons initialiser le tableau car Zokrates n'a pas de `undefined`. L'expression `[false; 512]` signifie [un tableau de 512 valeurs `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
   u32 mut counter = 0;
```

Nous avons également besoin d'un compteur pour distinguer les bits que nous avons déjà remplis dans `map1d` de ceux que nous n'avons pas encore remplis.

```
   for u32 x in 0..${width+2} {
```

Voici comment déclarer une boucle [`for`](https://zokrates.github.io/language/control_flow.html#for-loops) en Zokrates. Une boucle `for` de Zokrates doit avoir des limites fixes, car bien qu'elle semble être une boucle, le compilateur la « déroule » en réalité. L'expression `${width+2}` est une constante de temps de compilation car `width` est définie par le code TypeScript avant d'appeler le compilateur.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Pour chaque emplacement de la carte, mettez cette valeur dans le tableau `map1d` et incrémentez le compteur.

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

Le `pack128` pour créer un tableau de quatre valeurs `field` à partir de `map1d`. En Zokrates, `array[a..b]` signifie la tranche du tableau qui commence à `a` et se termine à `b-1`.

```
    return poseidon(hashMe);
}
```

Utilisez `poseidon` pour convertir ce tableau en un hachage.

### Le programme de hachage {#hash-program}

Le serveur doit appeler `hashMap` directement pour créer des identifiants de jeu. Cependant, Zokrates ne peut appeler que la fonction `main` d'un programme pour démarrer, nous créons donc un programme avec une fonction `main` qui appelle la fonction de hachage.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Le programme de creusage {#dig-program}

C'est le cœur de la partie preuve à divulgation nulle de connaissance de l'application, où nous produisons les preuves qui sont utilisées pour vérifier les résultats des creusages.

```
${hashFragment}

// Le nombre de mines à l'emplacement (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Pourquoi une bordure de carte {#why-map-border}

Les preuves à divulgation nulle de connaissance utilisent des [circuits arithmétiques](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), qui n'ont pas d'équivalent facile à une instruction `if`. Au lieu de cela, ils utilisent l'équivalent de l'[opérateur conditionnel](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Si `a` peut être soit zéro soit un, vous pouvez calculer `if a { b } else { c }` comme `ab+(1-a)c`.

Pour cette raison, une instruction `if` de Zokrates évalue toujours les deux branches. Par exemple, si vous avez ce code :

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Il générera une erreur, car il a besoin de calculer `arr[10]`, même si cette valeur sera plus tard multipliée par zéro.

C'est la raison pour laquelle nous avons besoin d'une bordure d'un emplacement de large tout autour de la carte. Nous devons calculer le nombre total de mines autour d'un emplacement, ce qui signifie que nous devons voir l'emplacement une ligne au-dessus et en dessous, à gauche et à droite de l'emplacement où nous creusons. Ce qui signifie que ces emplacements doivent exister dans le tableau de la carte qui est fourni à Zokrates.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

Par défaut, les preuves Zokrates incluent leurs entrées. Il est inutile de savoir qu'il y a cinq mines autour d'un endroit si vous ne savez pas réellement de quel endroit il s'agit (et vous ne pouvez pas simplement le faire correspondre à votre demande, car le prouveur pourrait alors utiliser des valeurs différentes sans vous en informer). Cependant, nous devons garder la carte secrète, tout en la fournissant à Zokrates. La solution est d'utiliser un paramètre `private`, un paramètre qui n'est _pas_ révélé par la preuve.

Cela ouvre une autre voie d'abus. Le prouveur pourrait utiliser les bonnes coordonnées, mais créer une carte avec un nombre quelconque de mines autour de l'emplacement, et éventuellement à l'emplacement même. Pour empêcher cet abus, nous faisons en sorte que la preuve à divulgation nulle de connaissance inclue le hachage de la carte, qui est l'identifiant de la partie.

```
   return (hashMap(map),
```

La valeur de retour ici est un tuple qui inclut le tableau de hachage de la carte ainsi que le résultat du creusage.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Nous utilisons 255 comme valeur spéciale au cas où l'emplacement lui-même contiendrait une bombe.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Si le joueur n'a pas touché de mine, ajoutez les nombres de mines pour la zone autour de l'emplacement et retournez ce résultat.

### Utiliser Zokrates depuis TypeScript {#using-zokrates-from-typescript}

Zokrates a une interface en ligne de commande, mais dans ce programme, nous l'utilisons dans le [code TypeScript](https://zokrates.github.io/toolbox/zokrates_js.html).

La bibliothèque qui contient les définitions de Zokrates s'appelle [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Importer les [liaisons JavaScript de Zokrates](https://zokrates.github.io/toolbox/zokrates_js.html). Nous n'avons besoin que de la fonction [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) car elle renvoie une promesse qui se résout en toutes les définitions de Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Similaire à Zokrates lui-même, nous n'exportons qu'une seule fonction, qui est également [asynchrone](https://www.w3schools.com/js/js_async.asp). Lorsqu'elle finit par retourner un résultat, elle fournit plusieurs fonctions comme nous le verrons ci-dessous.

```typescript
const zokrates = await zokratesInitialize()
```

Initialiser Zokrates, obtenir tout ce dont nous avons besoin de la bibliothèque.

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

Ensuite, nous avons la fonction de hachage et les deux programmes Zokrates que nous avons vus ci-dessus.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

Ici, nous compilons ces programmes.

```typescript
// Créez les clés pour la vérification à divulgation nulle de connaissance.
// Sur un système de production, vous voudriez utiliser une cérémonie de configuration.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

Sur un système de production, nous pourrions utiliser une [cérémonie de configuration](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) plus compliquée, mais cela suffit pour une démonstration. Ce n'est pas un problème que les utilisateurs puissent connaître la clé du prouveur - ils ne peuvent toujours pas l'utiliser pour prouver des choses à moins qu'elles ne soient vraies. Parce que nous spécifions l'entropie (le deuxième paramètre, `""`), les résultats seront toujours les mêmes.

**Note :** La compilation des programmes Zokrates et la création des clés sont des processus lents. Il n'est pas nécessaire de les répéter à chaque fois, seulement lorsque la taille de la carte change. Sur un système de production, vous le feriez une fois, puis stockeriez le résultat. La seule raison pour laquelle je ne le fais pas ici est par souci de simplicité.

#### `calculateMapHash` {#calculateMapHash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

La fonction [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) exécute réellement le programme Zokrates. Elle retourne une structure avec deux champs : `output`, qui est la sortie du programme sous forme de chaîne JSON, et `witness`, qui est l'information nécessaire pour créer une preuve à divulgation nulle de connaissance du résultat. Ici, nous avons juste besoin de la sortie.

La sortie est une chaîne de caractères de la forme `"31337"`, un nombre décimal entre guillemets. Mais la sortie dont nous avons besoin pour `viem` est un nombre hexadécimal de la forme `0x60A7`. Donc, nous utilisons `.slice(1,-1)` pour supprimer les guillemets, puis `BigInt` pour transformer la chaîne restante, qui est un nombre décimal, en un [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` convertit ce `BigInt` en une chaîne hexadécimale, et `"0x"+` ajoute le marqueur pour les nombres hexadécimaux.

```typescript
// Creuser et retourner une preuve à divulgation nulle de connaissance du résultat
// (code côté serveur)
```

La preuve à divulgation nulle de connaissance inclut les entrées publiques (`x` et `y`) et les résultats (hachage de la carte et nombre de bombes).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

C'est un problème de vérifier si un index est hors limites dans Zokrates, alors nous le faisons ici.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

Exécutez le programme de creusage.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

Utilisez [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) et retournez la preuve.

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Un vérificateur Solidity, un contrat intelligent que nous pouvons déployer sur la blockchain et utiliser pour vérifier les preuves générées par `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Enfin, retournez tout ce dont d'autres codes pourraient avoir besoin.

## Tests de sécurité {#security-tests}

Les tests de sécurité sont importants car un bug de fonctionnalité finira par se révéler. Mais si l'application n'est pas sécurisée, cela risque de rester caché pendant longtemps avant d'être révélé par quelqu'un qui triche et s'empare de ressources appartenant à d'autres.

### Permissions {#permissions}

Il y a une entité privilégiée dans ce jeu, le serveur. C'est le seul utilisateur autorisé à appeler les fonctions dans [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). Nous pouvons utiliser [`cast`](https://book.getfoundry.sh/cast/) pour vérifier que les appels aux fonctions à permission sont autorisés uniquement en tant que compte serveur.

[La clé privée du serveur se trouve dans `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. Sur l'ordinateur qui exécute `anvil` (la blockchain), définissez ces variables d'environnement.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Utilisez `cast` pour tenter de définir l'adresse du vérificateur en tant qu'adresse non autorisée.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   Non seulement `cast` signale un échec, mais vous pouvez ouvrir les **Outils de développement MUD** dans le jeu sur le navigateur, cliquer sur **Tables** et sélectionner **app\_\_VerifierAddress**. Vous voyez que l'adresse n'est pas zéro.

3. Définissez l'adresse du vérificateur comme l'adresse du serveur.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   L'adresse dans **app\_\_VerifiedAddress** devrait maintenant être à zéro.

Toutes les fonctions MUD dans le même `System` passent par le même contrôle d'accès, donc je considère ce test suffisant. Si vous n'êtes pas d'accord, vous pouvez vérifier les autres fonctions dans [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### Abus de la preuve à divulgation nulle de connaissance {#zero-knowledge-abuses}

La mathématique pour vérifier Zokrates dépasse le cadre de ce tutoriel (et mes capacités). Cependant, nous pouvons exécuter diverses vérifications sur le code de preuve à divulgation nulle de connaissance pour vérifier que s'il n'est pas fait correctement, il échoue. Tous ces tests vont nous obliger à modifier [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) et à redémarrer toute l'application. Il ne suffit pas de redémarrer le processus du serveur, car cela met l'application dans un état impossible (le joueur a une partie en cours, mais la partie n'est plus disponible pour le serveur).

#### Mauvaise réponse {#wrong-answer}

La possibilité la plus simple est de fournir la mauvaise réponse dans la preuve à divulgation nulle de connaissance. Pour ce faire, nous allons dans `zkDig` et [modifions la ligne 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91) :

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

Cela signifie que nous prétendrons toujours qu'il y a une bombe, quelle que soit la bonne réponse. Essayez de jouer avec cette version, et vous verrez dans l'onglet **server** de l'écran `pnpm dev` cette erreur :

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
00000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

Donc, ce genre de triche échoue.

#### Mauvaise preuve {#wrong-proof}

Que se passe-t-il si nous fournissons les bonnes informations, mais que les données de la preuve sont incorrectes ? Maintenant, remplacez la ligne 91 par :

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

Cela échoue toujours, mais maintenant cela échoue sans raison car cela se produit pendant l'appel du vérificateur.

### Comment un utilisateur peut-il vérifier le code de confiance zéro ? {#user-verify-zero-trust}

Les contrats intelligents sont relativement faciles à vérifier. Généralement, le développeur publie le code source sur un explorateur de blocs, et l'explorateur de blocs vérifie que le code source se compile bien en le code dans la [transaction de déploiement du contrat](/developers/docs/smart-contracts/deploying/). Dans le cas des `System` MUD, c'est [légèrement plus compliqué](https://mud.dev/cli/verify), mais pas de beaucoup.

C'est plus difficile avec la preuve à divulgation nulle de connaissance. Le vérificateur inclut quelques constantes et exécute des calculs sur celles-ci. Cela ne vous dit pas ce qui est prouvé.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

La solution, du moins jusqu'à ce que les explorateurs de blocs ajoutent la vérification Zokrates à leurs interfaces utilisateur, est que les développeurs d'applications mettent à disposition les programmes Zokrates, et qu'au moins certains utilisateurs les compilent eux-mêmes avec la clé de vérification appropriée.

Pour ce faire :

1. [Installez Zokrates](https://zokrates.github.io/gettingstarted.html).

2. Créez un fichier, `dig.zok`, avec le programme Zokrates. Le code ci-dessous suppose que vous avez conservé la taille de carte originale, 10x5.

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // Le nombre de mines à l'emplacement (x,y)
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. Compilez le code Zokrates et créez la clé de vérification. La clé de vérification doit être créée avec la même entropie utilisée dans le serveur d'origine, [dans ce cas une chaîne vide](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Créez le vérificateur Solidity par vous-même, et vérifiez qu'il est fonctionnellement identique à celui sur la blockchain (le serveur ajoute un commentaire, mais ce n'est pas important).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Décisions de conception {#design}

Dans toute application suffisamment complexe, il existe des objectifs de conception concurrents qui nécessitent des compromis. Examinons certains des compromis et pourquoi la solution actuelle est préférable à d'autres options.

### Pourquoi la preuve à divulgation nulle de connaissance {#why-zero-knowledge}

Pour un démineur, vous n'avez pas vraiment besoin de la preuve à divulgation nulle de connaissance. Le serveur peut toujours conserver la carte, puis simplement la révéler entièrement lorsque la partie est terminée. Ensuite, à la fin de la partie, le contrat intelligent peut calculer le hachage de la carte, vérifier qu'il correspond, et s'il ne correspond pas, pénaliser le serveur ou ignorer complètement la partie.

Je n'ai pas utilisé cette solution plus simple car elle ne fonctionne que pour les jeux courts avec un état final bien défini. Quand un jeu est potentiellement infini (comme dans le cas des [mondes autonomes](https://0xparc.org/blog/autonomous-worlds)), vous avez besoin d'une solution qui prouve l'état _sans_ le révéler.

En tant que tutoriel, cet article avait besoin d'un jeu court et facile à comprendre, mais cette technique est plus utile pour les jeux plus longs.

### Pourquoi Zokrates ? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) n'est pas la seule bibliothèque de preuve à divulgation nulle de connaissance disponible, mais il est similaire à un langage de programmation normal et [impératif](https://en.wikipedia.org/wiki/Imperative_programming) et prend en charge les variables booléennes.

Pour votre application, avec des exigences différentes, vous pourriez préférer utiliser [Circum](https://docs.circom.io/getting-started/installation/) ou [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### Quand compiler Zokrates {#when-compile-zokrates}

Dans ce programme, nous compilons les programmes Zokrates [à chaque démarrage du serveur](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Il s'agit clairement d'un gaspillage de ressources, mais c'est un tutoriel, optimisé pour la simplicité.

Si j'écrivais une application de niveau production, je vérifierais si j'ai un fichier avec les programmes Zokrates compilés pour cette taille de champ de mines, et si c'est le cas, je l'utiliserais. Il en va de même pour le déploiement d'un contrat de vérificateur en chaîne.

### Création des clés de vérificateur et de prouveur {#key-creation}

La [création de clés](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) est un autre calcul pur qui n'a pas besoin d'être fait plus d'une fois pour une taille de champ de mines donnée. Encore une fois, cela n'est fait qu'une seule fois par souci de simplicité.

De plus, nous pourrions utiliser [une cérémonie de configuration](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). L'avantage d'une cérémonie de configuration est qu'il faut soit l'entropie, soit un résultat intermédiaire de chaque participant pour tricher sur la preuve à divulgation nulle de connaissance. Si au moins un participant à la cérémonie est honnête et supprime cette information, les preuves à divulgation nulle de connaissance sont à l'abri de certaines attaques. Cependant, il n'y a _aucun mécanisme_ pour vérifier que l'information a été supprimée de partout. Si les preuves à divulgation nulle de connaissance sont d'une importance capitale, vous voudrez participer à la cérémonie de configuration.

Ici, nous nous appuyons sur les [pouvoirs perpétuels de tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), qui ont eu des dizaines de participants. C'est probablement assez sûr, et beaucoup plus simple. Nous n'ajoutons pas non plus d'entropie lors de la création des clés, ce qui facilite la [vérification de la configuration de preuve à divulgation nulle de connaissance](#user-verify-zero-trust) par les utilisateurs.

### Où vérifier {#where-verification}

Nous pouvons vérifier les preuves à divulgation nulle de connaissance soit en chaîne (ce qui coûte du gaz), soit dans le client (en utilisant [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). J'ai choisi la première option, car cela permet de [vérifier le vérificateur](#user-verify-zero-trust) une fois pour toutes, puis de faire confiance au fait qu'il ne change pas tant que l'adresse du contrat reste la même. Si la vérification était effectuée sur le client, vous devriez vérifier le code que vous recevez à chaque fois que vous téléchargez le client.

De plus, bien que ce jeu soit solo, beaucoup de jeux sur la blockchain sont multijoueurs. La vérification en chaîne signifie que vous ne vérifiez la preuve à divulgation nulle de connaissance qu'une seule fois. Le faire dans le client exigerait que chaque client vérifie indépendamment.

### Aplatir la carte en TypeScript ou en Zokrates ? {#where-flatten}

En général, lorsque le traitement peut être effectué soit en TypeScript soit en Zokrates, il est préférable de le faire en TypeScript, qui est beaucoup plus rapide et ne nécessite pas de preuves à divulgation nulle de connaissance. C'est la raison, par exemple, pour laquelle nous ne fournissons pas à Zokrates le hachage pour qu'il vérifie qu'il est correct. Le hachage doit être fait à l'intérieur de Zokrates, mais la correspondance entre le hachage retourné et le hachage en chaîne peut se faire en dehors.

Cependant, nous [aplatissons toujours la carte dans Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), alors que nous aurions pu le faire en TypeScript. La raison est que les autres options sont, à mon avis, pires.

- Fournir un tableau unidimensionnel de booléens au code Zokrates, et utiliser une expression telle que `x*(height+2)
  +y` pour obtenir la carte bidimensionnelle. Cela rendrait [le code](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) quelque peu plus compliqué, j'ai donc décidé que le gain de performance ne valait pas la peine pour un tutoriel.

- Envoyer à Zokrates à la fois le tableau unidimensionnel et le tableau bidimensionnel. Cependant, cette solution ne nous apporte rien. Le code Zokrates devrait vérifier que le tableau unidimensionnel qui lui est fourni est bien la représentation correcte du tableau bidimensionnel. Il n'y aurait donc aucun gain de performance.

- Aplatir le tableau à deux dimensions dans Zokrates. C'est l'option la plus simple, donc je l'ai choisie.

### Où stocker les cartes {#where-store-maps}

Dans cette application, [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) est simplement une variable en mémoire. Cela signifie que si votre serveur tombe en panne et doit être redémarré, toutes les informations qu'il stockait sont perdues. Non seulement les joueurs sont incapables de continuer leur partie, mais ils ne peuvent même pas en commencer une nouvelle car le composant en chaîne pense qu'ils ont toujours une partie en cours.

C'est clairement une mauvaise conception pour un système de production, dans lequel vous stockeriez ces informations dans une base de données. La seule raison pour laquelle j'ai utilisé une variable ici est que c'est un tutoriel et que la simplicité est la principale considération.

## Conclusion : Dans quelles conditions cette technique est-elle appropriée ? {#conclusion}

Donc, vous savez maintenant comment écrire un jeu avec un serveur qui stocke un état secret qui n'a pas sa place sur la chaîne. Mais dans quels cas devriez-vous le faire ? Il y a deux considérations principales.

- _Jeu de longue durée_ : [Comme mentionné ci-dessus](#why-zero-knowledge), dans un jeu court, vous pouvez simplement publier l'état une fois la partie terminée et faire tout vérifier à ce moment-là. Mais ce n'est pas une option lorsque le jeu dure longtemps ou indéfiniment, et que l'état doit rester secret.

- _Une certaine centralisation acceptable_ : les preuves à divulgation nulle de connaissance peuvent vérifier l'intégrité, qu'une entité ne falsifie pas les résultats. Ce qu'ils ne peuvent pas faire, c'est garantir que l'entité sera toujours disponible et répondra aux messages. Dans les situations où la disponibilité doit également être décentralisée, les preuves à divulgation nulle de connaissance ne sont pas une solution suffisante, et vous avez besoin du [calcul multipartite](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).

### Remerciements {#acknowledgements}

- Alvaro Alonso a lu une ébauche de cet article et a clarifié certaines de mes incompréhensions sur Zokrates.

Toute erreur restante est de ma responsabilité.
