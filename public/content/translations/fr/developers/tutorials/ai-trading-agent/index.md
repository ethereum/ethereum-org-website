---
title: "Créez votre propre agent de trading IA sur Ethereum"
description: "Dans ce tutoriel, vous apprendrez comment créer un agent de trading IA simple. Cet agent lit les informations de la blockchain, demande une recommandation à un LLM sur la base de ces informations, effectue la transaction que le LLM recommande, puis attend et répète le processus."
author: Ori Pomerantz
tags: [ "IA", "trading", "agent", "python" ]
skill: intermediate
published: 2026-02-13
lang: fr
sidebarDepth: 3
---

Dans ce tutoriel, vous apprendrez comment créer un agent de trading IA simple. Cet agent fonctionne en suivant ces étapes :

1. Lire les prix actuels et passés d'un jeton, ainsi que d'autres informations potentiellement pertinentes
2. Construire une requête avec ces informations, ainsi que des informations de base pour expliquer en quoi elles pourraient être pertinentes
3. Soumettre la requête et recevoir en retour un prix projeté
4. Trader en fonction de la recommandation
5. Attendre et répéter

Cet agent montre comment lire des informations, les traduire en une requête qui produit une réponse utilisable, et utiliser cette réponse. Toutes ces étapes sont nécessaires pour un agent IA. Cet agent est implémenté en Python car c'est le langage le plus courant utilisé en IA.

## Pourquoi faire cela ? {#why-do-this}

Les agents de trading automatisés permettent aux développeurs de sélectionner et d'exécuter une stratégie de trading. [Les agents IA](/ai-agents) permettent des stratégies de trading plus complexes et dynamiques, en utilisant potentiellement des informations et des algorithmes que le développeur n'a même pas envisagé d'utiliser.

## Les outils {#tools}

Ce tutoriel utilise [Python](https://www.python.org/), la [bibliothèque Web3](https://web3py.readthedocs.io/en/stable/), et [Uniswap v3](https://github.com/Uniswap/v3-periphery) pour les cotations et le trading.

### Pourquoi Python ? {#python}

Le langage le plus utilisé pour l'IA est [Python](https://www.python.org/), c'est pourquoi nous l'utilisons ici. Ne vous inquiétez pas si vous ne connaissez pas Python. Le langage est très clair, et j'expliquerai exactement ce qu'il fait.

La [bibliothèque Web3](https://web3py.readthedocs.io/en/stable/) est l'API Python pour Ethereum la plus courante. Elle est assez facile à utiliser.

### Trader sur la blockchain {#trading-on-blockchain}

Il existe [de nombreux échanges décentralisés (DEX)](/apps/categories/defi/) qui vous permettent de trader des jetons sur Ethereum. Cependant, ils ont tendance à avoir des taux de change similaires en raison de [l'arbitrage](/developers/docs/smart-contracts/composability/#better-user-experience).

[Uniswap](https://app.uniswap.org/) est un DEX largement utilisé que nous pouvons utiliser à la fois pour les cotations (pour voir les valeurs relatives des jetons) et pour les transactions.

### OpenAI {#openai}

Pour un grand modèle de langage, j'ai choisi de commencer avec [OpenAI](https://openai.com/). Pour exécuter l'application de ce tutoriel, vous devrez payer pour l'accès à l'API. Le paiement minimum de 5 $ est plus que suffisant.

## Développement, étape par étape {#step-by-step}

Pour simplifier le développement, nous procédons par étapes. Chaque étape est une branche dans GitHub.

### Mise en route {#getting-started}

Voici les étapes pour commencer sous UNIX ou Linux (y compris [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Si vous ne l'avez pas déjà, téléchargez et installez [Python](https://www.python.org/downloads/).

2. Clonez le dépôt GitHub.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. Installez [`uv`](https://docs.astral.sh/uv/getting-started/installation/). La commande sur votre système pourrait être différente.

   ```sh
   pipx install uv
   ```

4. Téléchargez les bibliothèques.

   ```sh
   uv sync
   ```

5. Activez l'environnement virtuel.

   ```sh
   source .venv/bin/activate
   ```

6. Pour vérifier que Python et Web3 fonctionnent correctement, exécutez `python3` et fournissez-lui ce programme. Vous pouvez le saisir à l'invite `>>>` ; il n'est pas nécessaire de créer un fichier.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Lecture depuis la blockchain {#read-blockchain}

L'étape suivante consiste à lire les données de la blockchain. Pour ce faire, vous devez passer à la branche `02-read-quote`, puis utiliser `uv` pour exécuter le programme.

```sh
git checkout 02-read-quote
uv run agent.py
```

Vous devriez recevoir une liste d'objets `Quote`, chacun avec un horodatage, un prix et l'actif (actuellement toujours `WETH/USDC`).

Voici une explication ligne par ligne.

```python
from web3 import Web3
from web3.contract import Contract
from decimal import Decimal, ROUND_HALF_UP
from dataclasses import dataclass
from datetime import datetime, timezone
from pprint import pprint
import time
import functools
import sys
```

Importez les bibliothèques dont nous avons besoin. Ils sont expliqués ci-dessous lorsqu'ils sont utilisés.

```python
print = functools.partial(print, flush=True)
```

Remplace le `print` de Python par une version qui vide toujours la sortie immédiatement. Ceci est utile dans un script de longue durée car nous ne voulons pas attendre les mises à jour de statut ou les sorties de débogage.

```python
MAINNET_URL = "https://eth.drpc.org"
```

Une URL pour accéder au réseau principal. Vous pouvez en obtenir un auprès d'un [nœud en tant que service](/developers/docs/nodes-and-clients/nodes-as-a-service/) ou utiliser l'un de ceux annoncés dans [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Un bloc du réseau principal Ethereum est généralement créé toutes les douze secondes, il s'agit donc du nombre de blocs que nous nous attendons à voir créés sur une période donnée. Notez que ce chiffre n'est pas exact. Lorsque le [proposeur de bloc](/developers/docs/consensus-mechanisms/pos/block-proposal/) est hors service, ce bloc est sauté, et le temps pour le bloc suivant est de 24 secondes. Si nous voulions obtenir le bloc exact pour un horodatage, nous utiliserions une [recherche binaire](https://en.wikipedia.org/wiki/Binary_search). Cependant, c'est assez proche pour nos besoins. Prédire l'avenir n'est pas une science exacte.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

La taille du cycle. Nous examinons les cotations une fois par cycle et essayons d'estimer la valeur à la fin du cycle suivant.

```python
# L'adresse du pool que nous lisons
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Les valeurs de cotation sont extraites du pool Uniswap 3 USDC/WETH à l'adresse [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Cette adresse est déjà au format checksum, mais il est préférable d'utiliser [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) pour rendre le code réutilisable.

```python
POOL_ABI = [
    { "name": "slot0", ... },
    { "name": "token0", ... },
    { "name": "token1", ... },
]

ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... }
]
```

Ce sont les [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) pour les deux contrats que nous devons contacter. Pour que le code reste concis, nous n'incluons que les fonctions que nous devons appeler.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Initialisez la bibliothèque [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) et connectez-vous à un nœud Ethereum.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

C'est une façon de créer une classe de données en Python. Le type de données [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) est utilisé pour se connecter au contrat. Notez le `(frozen=True)`. En Python, les [booléens](https://en.wikipedia.org/wiki/Boolean_data_type) sont définis comme `True` ou `False`, avec une majuscule. Cette classe de données est `figée` (`frozen`), ce qui signifie que les champs ne peuvent pas être modifiés.

Notez l'indentation. Contrairement aux [langages dérivés de C](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), Python utilise l'indentation pour délimiter les blocs. L'interpréteur Python sait que la définition suivante ne fait pas partie de cette classe de données car elle ne commence pas à la même indentation que les champs de la classe de données.

```python
@dataclass(frozen=True)
class PoolInfo:
    address: str
    token0: ERC20Token
    token1: ERC20Token
    contract: Contract
    asset: str
    decimal_factor: Decimal = 1
```

Le type [`Decimal`](https://docs.python.org/3/library/decimal.html) est utilisé pour gérer avec précision les fractions décimales.

```python
    def get_price(self, block: int) -> Decimal:
```

C'est ainsi que l'on définit une fonction en Python. La définition est indentée pour montrer qu'elle fait toujours partie de `PoolInfo`.

Dans une fonction qui fait partie d'une classe de données, le premier paramètre est toujours `self`, l'instance de la classe de données qui a appelé ici. Ici, il y a un autre paramètre, le numéro de bloc.

```python
        assert block <= w3.eth.block_number, "Le bloc est dans le futur"
```

Si nous pouvions lire l'avenir, nous n'aurions pas besoin de l'IA pour le trading.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

La syntaxe pour appeler une fonction sur l'EVM depuis Web3 est la suivante : `<objet contrat>.functions.<nom de la fonction>().call(<paramètres>)`. Les paramètres peuvent être les paramètres de la fonction EVM (s'il y en a ; ici, il n'y en a pas) ou des [paramètres nommés](https://en.wikipedia.org/wiki/Named_parameter) pour modifier le comportement de la blockchain. Ici, nous en utilisons un, `block_identifier`, pour spécifier [le numéro de bloc](/developers/docs/apis/json-rpc/#default-block) dans lequel nous souhaitons exécuter.

Le résultat est [cette structure, sous forme de tableau](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). La première valeur est une fonction du taux de change entre les deux jetons.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Pour réduire les calculs en chaîne, Uniswap v3 ne stocke pas le facteur de change réel mais plutôt sa racine carrée. Comme l'EVM ne prend pas en charge les calculs à virgule flottante ou les fractions, au lieu de la valeur réelle, la réponse est <math><msqrt><mi>prix</mi></msqrt><mo>&#x22C5</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (jeton1 par jeton0)
        return 1/(raw_price * self.decimal_factor)
```

Le prix brut que nous obtenons est le nombre de `token0` que nous recevons pour chaque `token1`. Dans notre pool, `token0` est l'USDC (un stablecoin ayant la même valeur qu'un dollar américain) et `token1` est le [WETH](https://opensea.io/learn/blockchain/what-is-weth). La valeur que nous voulons vraiment est le nombre de dollars par WETH, et non l'inverse.

Le facteur décimal est le rapport entre les [facteurs décimaux](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) pour les deux jetons.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Cette classe de données représente une cotation : le prix d'un actif spécifique à un moment donné. À ce stade, le champ `asset` n'est pas pertinent car nous utilisons un seul pool et nous n'avons donc qu'un seul actif. Cependant, nous ajouterons d'autres actifs plus tard.

```python
def read_token(address: str) -> ERC20Token:
    token = w3.eth.contract(address=address, abi=ERC20_ABI)
    symbol = token.functions.symbol().call()
    decimals = token.functions.decimals().call()

    return ERC20Token(
        address=address,
        symbol=symbol,
        decimals=decimals,
        contract=token
    )
```

Cette fonction prend une adresse et renvoie des informations sur le contrat de jeton à cette adresse. Pour créer un nouveau [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) Web3, nous fournissons l'adresse et l'ABI à `w3.eth.contract`.

```python
def read_pool(address: str) -> PoolInfo:
    pool_contract = w3.eth.contract(address=address, abi=POOL_ABI)
    token0Address = pool_contract.functions.token0().call()
    token1Address = pool_contract.functions.token1().call()
    token0 = read_token(token0Address)
    token1 = read_token(token1Address)

    return PoolInfo(
        address=address,
        asset=f"{token1.symbol}/{token0.symbol}",
        token0=token0,
        token1=token1,
        contract=pool_contract,
        decimal_factor=Decimal(10) ** Decimal(token0.decimals - token1.decimals)
    )
```

Cette fonction renvoie tout ce dont nous avons besoin à propos d'[un pool spécifique](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). La syntaxe `f"<string>"` est une [chaîne de caractères formatée](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Obtenez un objet `Quote`. La valeur par défaut pour `block_number` est `None` (aucune valeur).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Si un numéro de bloc n'a pas été spécifié, utilisez `w3.eth.block_number`, qui est le dernier numéro de bloc. Voici la syntaxe d'[une instruction `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

On pourrait penser qu'il aurait été préférable de définir la valeur par défaut à `w3.eth.block_number`, mais cela ne fonctionne pas bien car ce serait le numéro de bloc au moment où la fonction est définie. Dans un agent fonctionnant en continu, cela poserait problème.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Utilisez [la bibliothèque `datetime`](https://docs.python.org/3/library/datetime.html) pour la formater dans un format lisible par les humains et les grands modèles de langage (LLM). Utilisez [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) pour arrondir la valeur à deux décimales.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

En Python, vous définissez une [liste](https://docs.python.org/3/library/stdtypes.html#typesseq-list) qui ne peut contenir qu'un type spécifique en utilisant `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

En Python, une boucle [`for`](https://docs.python.org/3/tutorial/controlflow.html#for-statements) itère généralement sur une liste. La liste des numéros de bloc dans lesquels trouver des cotations provient de [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Pour chaque numéro de bloc, obtenez un objet `Quote` et ajoutez-le à la liste `quotes`. Retournez ensuite cette liste.

```python
pool = read_pool(WETHUSDC_ADDRESS)
quotes = get_quotes(
    pool,
    w3.eth.block_number - 12*CYCLE_BLOCKS,
    w3.eth.block_number,
    CYCLE_BLOCKS
)

pprint(quotes)
```

Ceci est le code principal du script. Lisez les informations du pool, obtenez douze cotations et [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint)-les.

### Créer une invite {#prompt}

Ensuite, nous devons convertir cette liste de cotations en une invite pour un LLM et obtenir une valeur future attendue.

```sh
git checkout 03-create-prompt
uv run agent.py
```

La sortie sera désormais une invite pour un LLM, similaire à :

```
Compte tenu de ces cotations :
Actif : WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

Actif : WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


Quelle serait, selon vous, la valeur de WETH/USDC à la date 2026-02-02T17:56 ?

Fournissez votre réponse sous la forme d'un nombre unique arrondi à deux décimales,
sans aucun autre texte.
```

Notez qu'il y a ici des cotations pour deux actifs, `WETH/USDC` et `WBTC/WETH`. L'ajout de cotations d'un autre actif pourrait améliorer la précision de la prédiction.

#### À quoi ressemble une invite {#prompt-explanation}

Cette invite contient trois sections, qui sont assez courantes dans les invites de LLM.

1. Informations. Les LLM disposent de beaucoup d'informations provenant de leur entraînement, mais ils n'ont généralement pas les plus récentes. C'est la raison pour laquelle nous devons récupérer les dernières cotations ici. L'ajout d'informations à une invite est appelé [génération augmentée par récupération (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. La question proprement dite. C'est ce que nous voulons savoir.

3. Instructions de formatage de la sortie. Normalement, un LLM nous donnera une estimation avec une explication sur la façon dont il y est parvenu. C'est mieux pour les humains, mais un programme informatique n'a besoin que du résultat final.

#### Explication du code {#prompt-code}

Voici le nouveau code.

```python
from datetime import datetime, timezone, timedelta
```

Nous devons fournir au LLM le moment pour lequel nous voulons une estimation. Pour obtenir un temps « n minutes/heures/jours » dans le futur, nous utilisons [la classe `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Les adresses des pools que nous lisons
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

Nous avons deux pools à lire.

```python
@dataclass(frozen=True)
class PoolInfo:
    .
    .
    .
    reverse: bool = False

    def get_price(self, block: int) -> Decimal:
        assert block <= w3.eth.block_number, "Block is in the future"
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token1 per token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

Dans le pool WETH/USDC, nous voulons savoir combien de `token0` (USDC) nous avons besoin pour acheter un `token1` (WETH). Dans le pool WETH/WBTC, nous voulons savoir combien de `token1` (WETH) nous avons besoin pour acheter un `token0` (WBTC, qui est du Bitcoin encapsulé). Nous devons savoir si le ratio du pool doit être inversé.

```python
def read_pool(address: str, reverse: bool = False) -> PoolInfo:
    .
    .
    .

    return PoolInfo(
        .
        .
        .

        asset= f"{token1.symbol}/{token0.symbol}" if reverse else f"{token0.symbol}/{token1.symbol}",
        reverse=reverse
    )
```

Pour savoir si un pool doit être inversé, nous devons obtenir cela en entrée de `read_pool`. De plus, le symbole de l'actif doit être correctement configuré.

La syntaxe `<a> if <b> else <c>` est l'équivalent Python de l'[opérateur conditionnel ternaire](https://en.wikipedia.org/wiki/Ternary_conditional_operator), qui dans un langage dérivé de C serait `<b> ? <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Cette fonction construit une chaîne de caractères qui formate une liste d'objets `Quote`, en supposant qu'ils s'appliquent tous au même actif.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

En Python, les [littéraux de chaînes de caractères sur plusieurs lignes](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) s'écrivent comme `"""` .... `"""`.

```python
Compte tenu de ces cotations :
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Ici, nous utilisons le modèle [MapReduce](https://en.wikipedia.org/wiki/MapReduce) pour générer une chaîne de caractères pour chaque liste de cotations avec `format_quotes`, puis nous les réduisons en une seule chaîne de caractères à utiliser dans l'invite.

```python
Quelle serait la valeur attendue pour {asset} au moment {expected_time} ?

Fournissez votre réponse sous la forme d'un nombre unique arrondi à deux décimales,
sans aucun autre texte.
    """
```

Le reste de l'invite est conforme aux attentes.

```python
wethusdc_pool = read_pool(WETHUSDC_ADDRESS, True)
wethusdc_quotes = get_quotes(
    wethusdc_pool,
    w3.eth.block_number - 12*CYCLE_BLOCKS,
    w3.eth.block_number,
    CYCLE_BLOCKS,
)

wethwbtc_pool = read_pool(WETHWBTC_ADDRESS)
wethwbtc_quotes = get_quotes(
    wethwbtc_pool,
    w3.eth.block_number - 12*CYCLE_BLOCKS,
    w3.eth.block_number,
    CYCLE_BLOCKS
)
```

Examinez les deux pools et obtenez des cotations de chacun.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Déterminez le moment futur pour lequel nous voulons l'estimation, et créez l'invite.

### Interaction avec un LLM {#interface-llm}

Ensuite, nous interrogeons un LLM réel et recevons une valeur future attendue. J'ai écrit ce programme en utilisant OpenAI, donc si vous voulez utiliser un autre fournisseur, vous devrez l'ajuster.

1. Créez un [compte OpenAI](https://auth.openai.com/create-account)

2. [Approvisionnez le compte](https://platform.openai.com/settings/organization/billing/overview)—le montant minimum au moment de la rédaction est de 5 $

3. [Créez une clé d'API](https://platform.openai.com/settings/organization/api-keys)

4. Dans la ligne de commande, exportez la clé d'API pour que votre programme puisse l'utiliser

   ```sh
   export OPENAI_API_KEY=sk-<le reste de la clé va ici>
   ```

5. Récupérez et exécutez l'agent

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

Voici le nouveau code.

```python
from openai import OpenAI

open_ai = OpenAI()  # Le client lit la variable d'environnement OPENAI_API_KEY
```

Importez et instanciez l'API OpenAI.

```python
response = open_ai.chat.completions.create(
    model="gpt-4-turbo",
    messages=[
        {"role": "user", "content": prompt}
    ],
    temperature=0.0,
    max_tokens=16,
)
```

Appelez l'API OpenAI (`open_ai.chat.completions.create`) pour créer la réponse.

```python
expected_price = Decimal(response.choices[0].message.content.strip())
current_price = wethusdc_quotes[-1].price

print ("Current price:", wethusdc_quotes[-1].price)
print(f"In {future_time}, expected price: {expected_price} USD")

if (expected_price > current_price):
    print(f"Buy, I expect the price to go up by {expected_price - current_price} USD")
else:
    print(f"Sell, I expect the price to go down by {current_price - expected_price} USD")
```

Affichez le prix et fournissez une recommandation d'achat ou de vente.

#### Tester les prédictions {#testing-the-predictions}

Maintenant que nous pouvons générer des prédictions, nous pouvons également utiliser des données historiques pour évaluer si nous produisons des prédictions utiles.

```sh
uv run test-predictor.py
```

Le résultat attendu est similaire à :

```
Prédiction pour 2026-01-05T19:50 : prédit 3138.93 USD, réel 3218.92 USD, erreur 79.99 USD
Prédiction pour 2026-01-06T19:56 : prédit 3243.39 USD, réel 3221.08 USD, erreur 22.31 USD
Prédiction pour 2026-01-07T20:02 : prédit 3223.24 USD, réel 3146.89 USD, erreur 76.35 USD
Prédiction pour 2026-01-08T20:11 : prédit 3150.47 USD, réel 3092.04 USD, erreur 58.43 USD
.
.
.
Prédiction pour 2026-01-31T22:33 : prédit 2637.73 USD, réel 2417.77 USD, erreur 219.96 USD
Prédiction pour 2026-02-01T22:41 : prédit 2381.70 USD, réel 2318.84 USD, erreur 62.86 USD
Prédiction pour 2026-02-02T22:49 : prédit 2234.91 USD, réel 2349.28 USD, erreur 114.37 USD
Erreur moyenne de prédiction sur 29 prédictions : 83.87103448275862068965517241 USD
Variation moyenne par recommandation : 4.787931034482758620689655172 USD
Variance standard des variations : 104.42 USD
Jours rentables : 51,72%
Jours de perte : 48,28%
```

La majeure partie du testeur est identique à l'agent, mais voici les parties qui sont nouvelles ou modifiées.

```python
CYCLES_FOR_TEST = 40 # Pour le backtest, combien de cycles nous testons

# Obtenir beaucoup de cotations
wethusdc_pool = read_pool(WETHUSDC_ADDRESS, True)
wethusdc_quotes = get_quotes(
    wethusdc_pool,
    w3.eth.block_number - CYCLE_BLOCKS*CYCLES_FOR_TEST,
    w3.eth.block_number,
    CYCLE_BLOCKS,
)

wethwbtc_pool = read_pool(WETHWBTC_ADDRESS)
wethwbtc_quotes = get_quotes(
    wethwbtc_pool,
    w3.eth.block_number - CYCLE_BLOCKS*CYCLES_FOR_TEST,
    w3.eth.block_number,
    CYCLE_BLOCKS
)
```

Nous regardons en arrière sur `CYCLES_FOR_TEST` (spécifié à 40 ici) jours.

```python
# Créer des prédictions et les vérifier par rapport à l'historique réel

total_error = Decimal(0)
changes = []
```

Il y a deux types d'erreurs qui nous intéressent. La première, `total_error`, est simplement la somme des erreurs commises par le prédicteur.

Pour comprendre la seconde, `changes`, nous devons nous rappeler le but de l'agent. Il ne s'agit pas de prédire le ratio WETH/USDC (prix de l'ETH). Il s'agit d'émettre des recommandations de vente et d'achat. Si le prix est actuellement de 2000 $ et qu'il prédit 2010 $ demain, peu nous importe si le résultat réel est de 2020 $ et que nous gagnons de l'argent supplémentaire. Mais nous nous _soucions_ s'il a prédit 2010 $, et a acheté de l'ETH sur la base de cette recommandation, et que le prix chute à 1990 $.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Nous ne pouvons examiner que les cas où l'historique complet (les valeurs utilisées pour la prédiction et la valeur réelle pour la comparer) est disponible. Cela signifie que le cas le plus récent doit être celui qui a commencé il y a `CYCLES_BACK`.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Utilisez des [tranches](https://www.w3schools.com/python/ref_func_slice.asp) pour obtenir le même nombre d'échantillons que celui utilisé par l'agent. Le code entre ici et le segment suivant est le même code d'obtention de prédiction que nous avons dans l'agent.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Obtenez le prix prédit, le prix réel et le prix au moment de la prédiction. Nous avons besoin du prix au moment de la prédiction pour déterminer si la recommandation était d'acheter ou de vendre.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

Calculez l'erreur et ajoutez-la au total.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

Pour les `changements`, nous voulons l'impact monétaire de l'achat ou de la vente d'un ETH. Donc, d'abord, nous devons déterminer la recommandation, puis évaluer comment le prix réel a changé, et si la recommandation a fait gagner de l'argent (changement positif) ou a coûté de l'argent (changement négatif).

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Rapportez les résultats.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Utilisez [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) pour compter le nombre de jours rentables et le nombre de jours coûteux. Le résultat est un objet de filtre, que nous devons convertir en liste pour en obtenir la longueur.

### Soumettre des transactions {#submit-txn}

Maintenant, nous devons réellement soumettre des transactions. Cependant, je ne veux pas dépenser de l'argent réel à ce stade, avant que le système ne soit éprouvé. Au lieu de cela, nous allons créer une fourche locale du réseau principal, et « trader » sur ce réseau.

Voici les étapes pour créer une fourche locale et permettre le trading.

1. Installez [Foundry](https://getfoundry.sh/introduction/installation)

2. Démarrez [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` écoute sur l'URL par défaut de Foundry, http://localhost:8545, nous n'avons donc pas besoin de spécifier l'URL pour [la commande `cast`](https://getfoundry.sh/cast/overview) que nous utilisons pour manipuler la blockchain.

3. Lors de l'exécution dans `anvil`, il y a dix comptes de test qui ont de l'ETH—définissez les variables d'environnement pour le premier

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Ce sont les contrats que nous devons utiliser. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) est le contrat Uniswap v3 que nous utilisons pour réellement trader. Nous pourrions trader directement via le pool, mais c'est beaucoup plus facile.

   Les deux variables du bas sont les chemins Uniswap v3 requis pour échanger entre le WETH et l'USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Chacun des comptes de test dispose de 10 000 ETH. Utilisez le contrat WETH pour envelopper 1000 ETH afin d'obtenir 1000 WETH pour le trading.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. Utilisez `SwapRouter` pour échanger 500 WETH contre des USDC.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   L'appel `approve` crée une autorisation qui permet à `SwapRouter` de dépenser certains de nos jetons. Les contrats ne peuvent pas surveiller les événements, donc si nous transférons des jetons directement au contrat `SwapRouter`, il ne saurait pas qu'il a été payé. Au lieu de cela, nous autorisons le contrat `SwapRouter` à dépenser un certain montant, puis `SwapRouter` le fait. Cela se fait par une fonction appelée par `SwapRouter`, afin qu'il sache si cela a réussi.

7. Vérifiez que vous avez assez des deux jetons.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Maintenant que nous avons des WETH et des USDC, nous pouvons réellement exécuter l'agent.

```sh
git checkout 05-trade
uv run agent.py
```

La sortie ressemblera à ceci :

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
Prix actuel : 1843.16
En 2026-02-06T23:07, prix attendu : 1724.41 USD
Soldes du compte avant la transaction :
Solde USDC : 927301.578272
Solde WETH : 500
Vendre, je m'attends à ce que le prix baisse de 118.75 USD
Transaction d'approbation envoyée : 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
Transaction d'approbation minée.
Transaction de vente envoyée : fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
Transaction de vente minée.
Soldes du compte après la transaction :
Solde USDC : 929143.797116
Solde WETH : 499
```

Pour l'utiliser réellement, vous avez besoin de quelques modifications mineures.

- À la ligne 14, changez `MAINNET_URL` en un point d'accès réel, comme `https://eth.drpc.org`
- À la ligne 28, changez `PRIVATE_KEY` par votre propre clé privée
- À moins que vous ne soyez très riche et que vous puissiez acheter ou vendre 1 ETH chaque jour pour un agent non éprouvé, vous voudrez peut-être modifier 29 pour diminuer `WETH_TRADE_AMOUNT`

#### Explication du code {#trading-code}

Voici le nouveau code.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

Les mêmes variables que nous avons utilisées à l'étape 4.

```python
WETH_TRADE_AMOUNT=1
```

Le montant à trader.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

Pour réellement trader, nous avons besoin de la fonction `approve`. Nous voulons également afficher les soldes avant et après, nous avons donc également besoin de `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

Dans l'ABI `SwapRouter`, nous n'avons besoin que de `exactInput`. Il existe une fonction connexe, `exactOutput`, que nous pourrions utiliser pour acheter exactement un WETH, mais par souci de simplicité, nous utilisons simplement `exactInput` dans les deux cas.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Les définitions Web3 pour le [`compte`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) et le contrat `SwapRouter`.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

Les paramètres de la transaction. Nous avons besoin d'une fonction ici car [le nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) doit changer à chaque fois.

```python
def approve_token(contract: Contract, amount: int):
```

Approuvez une autorisation de jeton pour `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Voici comment nous envoyons une transaction dans Web3. D'abord, nous utilisons [l'objet `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) pour construire la transaction. Ensuite, nous utilisons [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) pour signer la transaction, en utilisant `PRIVATE_KEY`. Enfin, nous utilisons [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) pour envoyer la transaction.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) attend que la transaction soit minée. Il renvoie le reçu si nécessaire.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

Ce sont les paramètres lors de la vente de WETH.

```python
def make_buy_params(quote: Quote) -> dict:
    return {
        "path": USDC_TO_WETH,
        "recipient": account.address,
        "deadline": 2**256 - 1,
        "amountIn": int(quote.price*WETH_TRADE_AMOUNT) * 10**wethusdc_pool.token0.decimals,
        "amountOutMinimum": 0,
    }
```

Contrairement à `SELL_PARAMS`, les paramètres d'achat peuvent changer. Le montant d'entrée est le coût de 1 WETH, tel qu'il est disponible dans la `cotation`.

```python
def buy(quote: Quote):
    buy_params = make_buy_params(quote)
    approve_token(wethusdc_pool.token0.contract, buy_params["amountIn"])
    txn = swap_router.functions.exactInput(buy_params).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Buy transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Buy transaction mined.")


def sell():
    approve_token(wethusdc_pool.token1.contract,
                  WETH_TRADE_AMOUNT * 10**wethusdc_pool.token1.decimals)
    txn = swap_router.functions.exactInput(SELL_PARAMS).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Sell transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Sell transaction mined.")
```

Les fonctions `buy()` et `sell()` sont presque identiques. D'abord, nous approuvons une autorisation suffisante pour `SwapRouter`, puis nous l'appelons avec le bon chemin et le bon montant.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Rapportez les soldes des utilisateurs dans les deux devises.

```python
print("Soldes du compte avant la transaction :")
balances()

if (expected_price > current_price):
    print(f"Acheter, je m'attends à ce que le prix augmente de {expected_price - current_price} USD")
    buy(wethusdc_quotes[-1])
else:
    print(f"Vendre, je m'attends à ce que le prix baisse de {current_price - expected_price} USD")
    sell()

print("Soldes du compte après la transaction :")
balances()
```

Cet agent ne fonctionne actuellement qu'une seule fois. Cependant, vous pouvez le modifier pour qu'il fonctionne en continu, soit en l'exécutant à partir de [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html), soit en encapsulant les lignes 368-400 dans une boucle et en utilisant [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) pour attendre qu'il soit temps de passer au cycle suivant.

## Améliorations possibles {#improvements}

Ce n'est pas une version de production complète ; c'est simplement un exemple pour enseigner les bases. Voici quelques idées d'améliorations.

### Trading plus intelligent {#smart-trading}

Il y a deux faits importants que l'agent ignore lorsqu'il décide quoi faire.

- _L'ampleur du changement anticipé_. L'agent vend un montant fixe de `WETH` si le prix est censé baisser, quelle que soit l'ampleur de la baisse.
  On pourrait soutenir qu'il serait préférable d'ignorer les changements mineurs et de vendre en fonction de l'ampleur de la baisse attendue du prix.
- _Le portefeuille actuel_. Si 10 % de votre portefeuille est en WETH et que vous pensez que le prix va augmenter, il est probablement judicieux d'en acheter davantage. Mais si 90 % de votre portefeuille est en WETH, vous êtes peut-être suffisamment exposé, et il n'est pas nécessaire d'en acheter davantage. L'inverse est vrai si vous vous attendez à ce que le prix baisse.

### Et si vous voulez garder votre stratégie de trading secrète ? {#secret}

Les fournisseurs d'IA peuvent voir les requêtes que vous envoyez à leurs LLM, ce qui pourrait exposer le système de trading de génie que vous avez développé avec votre agent. Un système de trading que trop de gens utilisent est sans valeur car trop de gens essaient d'acheter quand vous voulez acheter (et le prix monte) et essaient de vendre quand vous voulez vendre (et le prix baisse).

Vous pouvez exécuter un LLM localement, par exemple en utilisant [LM-Studio](https://lmstudio.ai/), pour éviter ce problème.

### Du bot IA à l'agent IA {#bot-to-agent}

On peut affirmer qu'il s'agit [d'un bot IA, et non d'un agent IA](/ai-agents/#ai-agents-vs-ai-bots). Il met en œuvre une stratégie relativement simple qui repose sur des informations prédéfinies. Nous pouvons permettre l'auto-amélioration, par exemple, en fournissant une liste de pools Uniswap v3 et leurs dernières valeurs et en demandant quelle combinaison a la meilleure valeur prédictive.

### Protection contre le glissement de prix {#slippage-protection}

Actuellement, il n'y a pas de [protection contre le glissement de prix](https://uniswapv3book.com/milestone_3/slippage-protection.html). Si la cotation actuelle est de 2 000 $ et que le prix attendu est de 2 100 $, l'agent achètera. Cependant, si avant que l'agent n'achète, le coût monte à 2 200 $, il n'est plus logique d'acheter.

Pour mettre en œuvre une protection contre le glissement de prix, spécifiez une valeur `amountOutMinimum` aux lignes 325 et 334 de [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Conclusion {#conclusion}

Espérons que vous en savez maintenant assez pour commencer avec les agents IA. Ce n'est pas un aperçu complet du sujet ; des livres entiers y sont consacrés, mais c'est suffisant pour vous lancer. Bonne chance !

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).
