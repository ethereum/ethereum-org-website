---
title: "Ajouter la signature en clair à votre protocole avec l'ERC-7730"
description: "Apprenez à écrire un descripteur ERC-7730 pour que les interactions avec vos contrats intelligents affichent des détails lisibles par l'homme dans les portefeuilles avant que les utilisateurs ne signent."
author: Hester Bruikman
lang: fr
tags: ["ERC-7730", "sécurité", "signature", "contrats intelligents", "portefeuilles"]
skill: intermediate
breadcrumb: Signature en clair
published: 2026-05-11
---

La plupart des failles majeures sur Ethereum ont eu la même étape finale : un utilisateur approuvant une transaction qu'il ne pouvait pas vraiment comprendre. Les portefeuilles matériels affichent des données d'appel brutes en hexadécimal, et pire encore, vous obligent à activer la signature aveugle (blind signing). Les portefeuilles logiciels affichent des champs décodés, mais uniquement lorsqu'ils reconnaissent le contrat. Lorsque ce n'est pas le cas, que ce soit parce que le protocole est nouveau, que l'application est compromise ou que l'appareil est hors ligne, les utilisateurs signent à l'aveugle.

L'[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) définit un format JSON standard pour décrire ce que *signifient* les appels de fonction de votre contrat.

Un portefeuille qui prend en charge l'ERC-7730 lit votre descripteur et affiche :

> **Échange**  
> Envoyer : 1 000 USDC  
> Recevoir minimum : 0,42 WETH  
> Protocole : Uniswap V2

Ou une seule phrase construite, lisible par les humains comme par les agents :

> Échanger 1 000 USDC contre au moins 0,42 WETH

Au lieu d'un sélecteur de fonction et d'une liste de valeurs entières brutes.

C'est ce qu'on appelle la [signature en clair](https://clearsigning.org/) (clear signing) — « Ce que vous voyez est ce que vous signez ». Ce tutoriel vous guide dans la rédaction d'un descripteur pour votre propre contrat, sa validation avec l'outil CLI officiel et sa soumission au registre ouvert.

## Prérequis {#prerequisites}

- Familiarité avec Solidity et les ABI de contrats intelligents
- Un contrat intelligent déployé avec une ABI vérifiée (la vérification [Sourcify](https://sourcify.dev) est requise avant qu'un descripteur ne soit accepté dans le registre)
- Python 3.12 pour la CLI de validation (le paquet `erc7730` épinglé ne s'installe pas sur Python 3.13 ou ultérieur). Si le Python de votre système est d'une version différente, [uv](https://docs.astral.sh/uv/) peut télécharger et exécuter Python 3.12 pour vous
- Connaissances de base en JSON

## Qu'est-ce qu'un descripteur ERC-7730 ? {#what-is-an-erc-7730-descriptor}

Un descripteur est un fichier JSON unique comportant trois sections :

| Section | Objectif |
| :---- | :---- |
| `context` | Lie le descripteur à des déploiements de contrats spécifiques par ID de chaîne et adresse |
| `metadata` | Nomme le projet et définit des constantes réutilisables |
| `display` | Associe chaque signature de fonction à des étiquettes lisibles par l'homme et à des formats de champs |

Puisque le descripteur est séparé du contrat lui-même, vous pouvez ajouter la prise en charge de la signature en clair à n'importe quel protocole existant sans redéploiement. Les portefeuilles récupèrent les descripteurs depuis le registre et les utilisent au moment de la signature.

## Étape 1 : Créer le squelette du fichier {#step-1-create-the-file-skeleton}

Créez un fichier nommé `calldata-<ContractName>.json`, par exemple `calldata-SwapRouter.json`. Le préfixe `calldata-` indique au registre que ce descripteur couvre les appels de fonction de contrat, par opposition à `eip712-` pour les messages de données typées. Si vous devez décrire plusieurs versions d'un contrat, incluez la version du contrat dans le nom, comme dans `calldata-UniswapV3Router02.json` du registre.

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {},
  "metadata": {},
  "display": {
    "formats": {}
  }
}
```

## Étape 2 : Rédiger la section de contexte {#step-2-write-the-context-section}

La section `context` lie le descripteur à un ou plusieurs déploiements de contrats. Les portefeuilles l'utilisent pour faire correspondre une transaction entrante au bon descripteur.

```json
"context": {
  "$id": "example-swap-router",
  "contract": {
    "deployments": [
      { "chainId": 1, "address": "0xYourContractAddressOnMainnet" },
      { "chainId": 137, "address": "0xYourContractAddressOnPolygon" }
    ]
  }
}
```

### Champs de contexte {#context-fields}

- `context.$id` — Un identifiant unique pour ce document descripteur ou cette configuration de déploiement.
- `contract.deployments` — L'ensemble des déploiements auxquels ce descripteur s'applique.
- `deployments[].chainId` — L'ID de chaîne EVM pour un déploiement. Incluez chaque chaîne où votre contrat est déployé.
- `deployments[].address` — L'adresse du contrat que les portefeuilles doivent associer à ce descripteur. Il s'agit de l'adresse à laquelle les utilisateurs envoient réellement des transactions. Si votre contrat est évolutif (upgradeable), il s'agit de l'adresse du proxy, et non de l'adresse d'implémentation, tandis que les signatures de fonction dans `display.formats` proviennent de l'ABI de l'implémentation.

## Étape 3 : Rédiger la section des métadonnées {#step-3-write-the-metadata-section}

La section des métadonnées fournit des informations lisibles par l'homme sur le projet et le contrat décrits par ce fichier. Les portefeuilles peuvent utiliser ces informations pour afficher les noms de protocole, les liens et d'autres détails contextuels lors de la signature.

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### Champs de métadonnées {#metadata-fields}

- `owner` — Le projet, le protocole, l'organisation ou le mainteneur responsable de ce descripteur.
- `info.url` — Une URL canonique de projet ou de documentation que les portefeuilles peuvent afficher aux utilisateurs pour plus de contexte.
- `contractName` — Le nom du contrat ou de l'implémentation décrit par ce fichier, correspondant généralement au code source vérifié ou à l'ABI.

Si votre fichier ERC-7730 décrit un contrat ERC-20, vous devriez également ajouter un objet jeton. 

## Étape 4 : Rédiger la section des formats d'affichage {#step-4-write-the-displayformats-section}

L'objet `display.formats` associe les signatures de fonction à des instructions de signature lisibles par l'homme. C'est ainsi que les portefeuilles montrent votre fonction aux utilisateurs avant qu'ils n'approuvent une transaction !

Chaque clé est un fragment d'ABI lisible par l'homme — la signature de la fonction comprenant à la fois les noms et les types de paramètres exactement tels qu'ils apparaissent dans votre ABI.


### Exemple : Décrire un échange de jetons {#eg-describing-token-swap}

Cet exemple décrit `swapExactTokensForTokens` du contrat `Router02` d'Uniswap V2. Le jeton d'entrée est le premier élément de `path`, et le jeton de sortie est le dernier (`path` peut avoir plus de deux éléments pour un échange à sauts multiples).

```json
"display": {
  "formats": {
    "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
      "intent": "Swap",
      "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
      "fields": [
        {
          "path": "#.amountIn",
          "label": "Send",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path.[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path.[-1]"
          }
        },
        {
          "path": "#.to",
          "label": "Recipient",
          "format": "addressName",
          "params": {
            "types": ["eoa", "contract"],
            "sources": ["local", "ens"]
          }
        },
        {
          "path": "#.deadline",
          "label": "Expires",
          "format": "date",
          "params": {
            "encoding": "timestamp"
          }
        }
      ]
    }
  }
}
```

### Champs d'affichage {#display-fields}

- **`intent`** — **(Requis)** Une description courte et conviviale de l'action, telle que « Échange ».
- **`interpolatedIntent`** — **(Recommandé)** Un modèle de phrase plus riche qui intègre des valeurs de champs formatées, tel que `"Swap {amountIn} for at least {amountOutMin}"`. Incluez ceci aux côtés de `intent` pour fournir un descripteur encore plus convivial que les portefeuilles peuvent choisir d'afficher en fonction de leurs contraintes d'affichage.
- **`fields`** — **(Requis)** La liste ordonnée des champs de transaction que les portefeuilles doivent afficher aux utilisateurs.
  - **`path`** — **(Requis)** Une référence aux données de la transaction. `#.fieldName` pointe vers un paramètre de données d'appel décodé par son nom dans l'ABI. `@.value` fait référence à la valeur en ETH envoyée avec la transaction. Les éléments de tableau sont écrits avec un `.` avant les crochets : `#.path.[0]` est le premier élément et `#.path.[-1]` le dernier. `#.path[0]` (sans le point) est rejeté par le linter.
  - **`label`** — **(Requis)** L'étiquette lisible par l'homme affichée à côté de la valeur.
  - **`format`** — **(Recommandé)** Contrôle la façon dont la valeur doit être rendue. Les formats courants incluent :
    - `tokenAmount`
    - `addressName`
    - `date`

    Utilisez `raw` lorsqu'aucun formatage supplémentaire n'est nécessaire. Certains formats acceptent une configuration **`params`** supplémentaire. Par exemple :

    - `tokenAmount` peut utiliser `tokenPath` pour identifier quelle adresse de jeton fournit les métadonnées de décimales et de symbole (ticker).
    - `date` peut utiliser `encoding` pour décrire comment l'horodatage est encodé.

    Si le format sélectionné ne nécessite pas d'informations supplémentaires, omettez `params`.

## Le descripteur complet {#the-complete-descriptor}

Remplacez les adresses fictives par les adresses de votre contrat déployé. Le linter vérifie le descripteur par rapport à l'ABI vérifiée à ces adresses, il signalera donc des erreurs jusqu'à ce que vous le fassiez.

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "example-swap-router",
    "contract": {
      "deployments": [
        {
          "chainId": 1,
          "address": "0xYourContractAddressOnMainnet"
        },
        {
          "chainId": 137,
          "address": "0xYourContractAddressOnPolygon"
        }
      ]
    }
  },
  "metadata": {
    "owner": "Example Swap Protocol",
    "info": {
      "url": "https://example.xyz"
    },
    "contractName": "SwapRouter"
  },
  "display": {
    "formats": {
      "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
        "intent": "Swap",
        "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
        "fields": [
          {
            "path": "#.amountIn",
            "label": "Send",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path.[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path.[-1]"
            }
          },
          {
            "path": "#.to",
            "label": "Recipient",
            "format": "addressName",
            "params": {
              "types": ["eoa", "contract"],
              "sources": ["local", "ens"]
            }
          },
          {
            "path": "#.deadline",
            "label": "Expires",
            "format": "date",
            "params": {
              "encoding": "timestamp"
            }
          }
        ]
      }
    }
  }
}
```

## Étape 5 : Soumettre au registre {#step-5-submit-to-the-registry}

Le [registre ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry) est un dépôt ouvert hébergé par la [Fondation Ethereum](/foundation/) en tant que gestionnaire neutre. Chacun est libre de le cloner et de l'auto-héberger — les portefeuilles décident indépendamment des instances de registre auxquelles ils font confiance.

1. Faites un fork du dépôt sur GitHub
2. Créez un dossier dans `registry/<your-project-name>/`
3. Placez votre fichier à l'intérieur : `registry/myproject/calldata-SwapRouter.json`
4. Mettez à jour le champ `$schema` avec le chemin relatif utilisé dans le dépôt : `"../../specs/erc7730-v2.schema.json"`. La CI rejette une URL ici.
5. Ajoutez un fichier de test (voir ci-dessous)
6. Validez vos fichiers localement (voir ci-dessous)
7. Ouvrez une pull request. Chaque pull request ne peut modifier qu'un seul dossier sous `registry/`

### Ajouter un fichier de test {#add-a-test-file}

Chaque descripteur que vous ajoutez ou modifiez nécessite un fichier de test, afin que les implémentations de signature en clair puissent être vérifiées par rapport à celui-ci. Créez `registry/<your-project-name>/testsv2/calldata-<ContractName>.tests.json` avec au moins un cas de test pour chaque fonction dans `display.formats`. La CI dérive le sélecteur de fonction de chaque format et échoue si aucune transaction de test ne l'appelle.

```json
{
  "$schema": "../../../specs/erc7730-tests-v2.schema.json",
  "descriptor": "../calldata-SwapRouter.json",
  "dataProvider": {
    "tokens": {
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": { "symbol": "USDC", "decimals": 6, "name": "USD Coin" },
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": { "symbol": "WETH", "decimals": 18, "name": "Wrapped Ether" }
    }
  },
  "tests": [
    {
      "description": "Swap 1,000 USDC for at least 0.42 WETH",
      "rawTx": "0x02f9012f0180843b9aca00...",
      "expected": {
        "intent": "Swap",
        "interpolatedIntent": "Swap 1000 USDC for at least 0.42 WETH",
        "owner": "Example Swap Protocol",
        "fields": [
          { "label": "Send", "value": "1000 USDC" },
          { "label": "Receive minimum", "value": "0.42 WETH" },
          { "label": "Recipient", "value": "0x1234567890123456789012345678901234567890" },
          { "label": "Expires", "value": "2026-01-01 00:00:00Z" }
        ]
      }
    }
  ]
}
```

- `rawTx` est la transaction **non signée** sérialisée complète (raccourcie ici), et pas seulement les données d'appel. Les transactions réelles vers votre contrat constituent les meilleurs cas de test.
- `dataProvider` fournit les métadonnées du jeton (et éventuellement l'adresse et les noms ENS) afin que les tests n'aient pas besoin d'un accès au réseau.
- `expected` est ce qu'un portefeuille devrait afficher. La CI rend chaque cas de test avec les implémentations de signature en clair et signale toute différence sur la pull request.

Consultez les [Cas de test de référence](https://github.com/ethereum/clear-signing-erc7730-registry#reference-test-cases) dans le README du registre pour le format complet, y compris les fichiers de test pour les descripteurs EIP-712.

### Valider localement {#validate-locally}

Le registre vérifie les descripteurs avec l'outil en ligne de commande [`erc7730`](https://github.com/sourcifyeth/python-erc7730), épinglé dans `.github/requirements.txt`. Exécutez-le depuis la racine de votre fork, dans un environnement Python 3.12 :

```sh
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r .github/requirements.txt
erc7730 lint registry/myproject/calldata-SwapRouter.json
```

Si vous utilisez [uv](https://docs.astral.sh/uv/), vous pouvez ignorer l'environnement virtuel, et uv télécharge Python 3.12 si nécessaire :

```sh
uvx --python 3.12 --from "$(cat .github/requirements.txt)" erc7730 lint registry/myproject/calldata-SwapRouter.json
```

Le linter vérifie le descripteur par rapport au schéma et par rapport à l'ABI vérifiée de votre contrat. Corrigez chaque erreur. Les avertissements tels que `Missing display format` signifient que le contrat possède des fonctions que votre descripteur ne décrit pas encore. Pour vérifier également les chemins `$schema` et le fichier de test de la même manière que la CI, consultez [Comment valider](https://github.com/ethereum/clear-signing-erc7730-registry#how-to-validate) dans le README du registre.

Lorsque vous ouvrez la PR, la CI exécute automatiquement la validation du schéma, vérifie que les signatures de fonction produisent des sélecteurs valides, confirme que l'adresse du contrat est vérifiée sur Sourcify et signale les incohérences de l'ABI. Les résultats de la vérification apparaissent directement sur la PR. Les mainteneurs du registre examinent les soumissions pour détecter les descripteurs mal formés ou potentiellement malveillants. L'inclusion dans le registre n'implique ni audit ni approbation.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**Remarque :** Votre contrat doit être vérifié sur <a href="https://repo.sourcify.dev">Sourcify</a> avant que votre PR ne puisse être acceptée. S'il n'est pas encore vérifié, <a href="https://verify.sourcify.dev/">soumettez la vérification</a> d'abord.
</AlertDescription>
</AlertContent>
</Alert>

## Que se passe-t-il après la fusion ? {#what-happens-after-merging}

Tous les descripteurs du registre sont ouverts aux auditeurs. Une fois votre PR fusionnée, n'importe quel auditeur peut examiner votre descripteur et publier une attestation cryptographique (sous [l'ERC-8176](https://eips.ethereum.org/EIPS/eip-8176)) confirmant son exactitude. 

Ces signaux d'attestation permettent aux portefeuilles d'appliquer leurs propres politiques de confiance — un descripteur avec plusieurs attestations indépendantes a plus de poids qu'un descripteur sans attestation. Vous pouvez contacter la communauté des auditeurs via [clearsigning.org](https://clearsigning.org).

Les portefeuilles choisissent le registre qu'ils prendront en charge. Une fois votre descripteur dans le registre, les portefeuilles qui prennent en charge l'ERC-7730 commenceront à le récupérer s'il se trouve dans leur registre et afficheront des données lisibles par l'homme lorsque les utilisateurs interagiront avec votre contrat.

## Lectures complémentaires {#further-reading}

- [Spécification de l'ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)  
- [Registre ERC-7730](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — outils, état de l'écosystème et gouvernance  
- [Vérification de contrat Sourcify](https://sourcify.dev)  
- [Initiative Trillion Dollar Security](https://trilliondollarsecurity.org)

