---
title: "Créez votre propre agent IA de trading sur Ethereum"
description: "Dans ce tutoriel, vous apprendrez à créer un agent IA de trading simple. Cet agent lit les informations de la chaîne de blocs, demande une recommandation à un LLM basée sur ces informations, effectue l'échange recommandé par le LLM, puis attend et répète l'opération."
author: Ori Pomerantz
tags: ["IA", "trading", "agent", "Python"]
skill: intermediate
breadcrumb: Agent IA de trading
published: 2026-02-13
lang: fr
sidebarDepth: 3
---

Dans ce tutoriel, vous apprendrez à construire un agent IA de trading simple. Cet agent fonctionne selon les étapes suivantes :

1. Lire les prix actuels et passés d'un jeton, ainsi que d'autres informations potentiellement pertinentes
2. Construire une requête avec ces informations, accompagnée d'informations de contexte pour expliquer en quoi elles pourraient être pertinentes
3. Soumettre la requête et recevoir en retour un prix projeté
4. Trader en fonction de la recommandation
5. Attendre et répéter

Cet agent démontre comment lire des informations, les traduire en une requête qui produit une réponse utilisable, et utiliser cette réponse. Toutes ces étapes sont requises pour un agent IA. Cet agent est implémenté en Python car c'est le langage le plus couramment utilisé en IA.

## Pourquoi faire cela ? {#why-do-this}

Les agents de trading automatisés permettent aux développeurs de sélectionner et d'exécuter une stratégie de trading. Les [agents IA](/ai-agents) permettent des stratégies de trading plus complexes et dynamiques, utilisant potentiellement des informations et des algorithmes que le développeur n'a même pas envisagé d'utiliser.

## Les outils {#tools}

Ce tutoriel utilise [Python](https://www.python.org/), la [bibliothèque Web3](https://web3py.readthedocs.io/en/stable/) et [Uniswap v3](https://github.com/Uniswap/v3-periphery) pour les cotations et le trading.

### Pourquoi Python ? {#python}

Le langage le plus utilisé pour l'IA est [Python](https://www.python.org/), c'est pourquoi nous l'utilisons ici. Ne vous inquiétez pas si vous ne connaissez pas Python. Le langage est très clair, et j'expliquerai exactement ce qu'il fait.

La [bibliothèque Web3](https://web3py.readthedocs.io/en/stable/) est l'API Ethereum Python la plus courante. Elle est assez facile à utiliser.

### Trader sur la chaîne de blocs {#trading-on-blockchain}

Il existe [de nombreux échanges décentralisés (DEX)](/apps/categories/defi/) qui vous permettent d'échanger des jetons sur Ethereum. Cependant, ils ont tendance à avoir des taux de change similaires en raison de l'[arbitrage](/developers/docs/smart-contracts/composability/#better-user-experience).

[Uniswap](https://app.uniswap.org/) est un DEX largement utilisé que nous pouvons utiliser à la fois pour les cotations (pour voir les valeurs relatives des jetons) et les échanges.

### OpenAI {#openai}

Pour un grand modèle de langage (LLM), j'ai choisi de commencer avec [OpenAI](https://openai.com/). Pour exécuter l'application de ce tutoriel, vous devrez payer pour l'accès à l'API. Le paiement minimum de 5 $ est plus que suffisant.

## Développement, étape par étape {#step-by-step}

Pour simplifier le développement, nous procédons par étapes. Chaque étape correspond à une branche sur GitHub.

### Pour commencer {#getting-started}

Voici les étapes pour commencer sous UNIX ou Linux (y compris [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Si vous ne l'avez pas déjà, téléchargez et installez [Python](https://www.python.org/downloads/).

2. Clonez le dépôt GitHub.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. Installez [`uv`](https://docs.astral.sh/uv/getting-started/installation/). La commande sur votre système peut être différente.

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

### Lire depuis la chaîne de blocs {#read-blockchain}

L'étape suivante consiste à lire depuis la chaîne de blocs. Pour ce faire, vous devez passer à la branche `02-read-quote` puis utiliser `uv` pour exécuter le programme.

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

Importez les bibliothèques dont nous avons besoin. Elles sont expliquées ci-dessous lors de leur utilisation.

```python
print = functools.partial(print, flush=True)
```

Remplace le `print` de Python par une version qui vide toujours la sortie immédiatement. C'est utile dans un script de longue durée car nous ne voulons pas attendre les mises à jour de statut ou les sorties de débogage.

```python
MAINNET_URL = "https://eth.drpc.org"
```

Une URL pour accéder au Réseau principal. Vous pouvez en obtenir une auprès d'un [Nœud en tant que service](/developers/docs/nodes-and-clients/nodes-as-a-service/) ou utiliser l'une de celles annoncées dans [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Un bloc du réseau principal Ethereum se produit généralement toutes les douze secondes, il s'agit donc du nombre de blocs que nous nous attendons à voir se produire sur une période donnée. Notez que ce n'est pas un chiffre exact. Lorsque le [proposeur de bloc](/developers/docs/consensus-mechanisms/pos/block-proposal/) est en panne, ce bloc est ignoré, et le temps pour le bloc suivant est de 24 secondes. Si nous voulions obtenir le bloc exact pour un horodatage, nous utiliserions la [recherche dichotomique](https://en.wikipedia.org/wiki/Binary_search). Cependant, c'est suffisamment proche pour nos besoins. Prédire l'avenir n'est pas une science exacte.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

La taille du cycle. Nous examinons les cotations une fois par cycle et essayons d'estimer la valeur à la fin du cycle suivant.

```python
# L'adresse du pool que nous lisons
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Les valeurs de cotation sont tirées du pool Uniswap 3 USDC/WETH à l'adresse [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Cette adresse est déjà sous forme de somme de contrôle (checksum), mais il est préférable d'utiliser [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) pour rendre le code réutilisable.

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

Ce sont les [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) pour les deux contrats que nous devons contacter. Pour garder le code concis, nous n'incluons que les fonctions que nous devons appeler.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Initiez la bibliothèque [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) et connectez-vous à un nœud Ethereum.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

C'est une façon de créer une classe de données en Python. Le type de données [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) est utilisé pour se connecter au contrat. Notez le `(frozen=True)`. En Python, les [booléens](https://en.wikipedia.org/wiki/Boolean_data_type) sont définis comme `True` ou `False`, avec une majuscule. Cette classe de données est `frozen`, ce qui signifie que les champs ne peuvent pas être modifiés.

Notez l'indentation. Contrairement aux [langages dérivés du C](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), Python utilise l'indentation pour délimiter les blocs. L'interpréteur Python sait que la définition suivante ne fait pas partie de cette classe de données car elle ne commence pas à la même indentation que les champs de la classe de données.

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

Le type [`Decimal`](https://docs.python.org/3/library/decimal.html) est utilisé pour manipuler avec précision les fractions décimales.

```python
    def get_price(self, block: int) -> Decimal:
```

C'est la façon de définir une fonction en Python. La définition est indentée pour montrer qu'elle fait toujours partie de `PoolInfo`.

Dans une fonction qui fait partie d'une classe de données, le premier paramètre est toujours `self`, l'instance de la classe de données qui a été appelée ici. Ici, il y a un autre paramètre, le numéro de bloc.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

Si nous pouvions lire l'avenir, nous n'aurions pas besoin de l'IA pour le trading.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

La syntaxe pour appeler une fonction sur l'EVM depuis Web3 est la suivante : `<contract object>.functions.<function name>().call(<parameters>)`. Les paramètres peuvent être les paramètres de la fonction EVM (s'il y en a ; ici il n'y en a pas) ou des [paramètres nommés](https://en.wikipedia.org/wiki/Named_parameter) pour modifier le comportement de la chaîne de blocs. Ici, nous en utilisons un, `block_identifier`, pour spécifier [le numéro de bloc](/developers/docs/apis/json-rpc/#default-block) dans lequel nous souhaitons l'exécuter.

Le résultat est [cette structure, sous forme de tableau](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). La première valeur est une fonction du taux de change entre les deux jetons.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Pour réduire les calculs onchain, Uniswap v3 ne stocke pas le facteur d'échange réel mais plutôt sa racine carrée. Étant donné que l'EVM ne prend pas en charge les mathématiques à virgule flottante ou les fractions, au lieu de la valeur réelle, la réponse est <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (jeton1 par jeton0)
        return 1/(raw_price * self.decimal_factor)
```

Le prix brut que nous obtenons est le nombre de `token0` que nous obtenons pour chaque `token1`. Dans notre pool, `token0` est l'USDC (stablecoin ayant la même valeur qu'un dollar américain) et `token1` est le [WETH](https://opensea.io/learn/blockchain/what-is-weth). La valeur que nous voulons vraiment est le nombre de dollars par WETH, et non l'inverse.

Le facteur décimal est le rapport entre les [facteurs décimaux](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) des deux jetons.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Cette classe de données représente une cotation : le prix d'un actif spécifique à un moment donné. À ce stade, le champ `asset` n'est pas pertinent car nous utilisons un seul pool et avons donc un seul actif. Cependant, nous ajouterons d'autres actifs plus tard.

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

Cette fonction prend une adresse et renvoie des informations sur le contrat de jeton à cette adresse. Pour créer un nouveau [`Contract` Web3](https://web3py.readthedocs.io/en/stable/web3.contract.html), nous fournissons l'adresse et l'ABI à `w3.eth.contract`.

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

Cette fonction renvoie tout ce dont nous avons besoin concernant [un pool spécifique](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). La syntaxe `f"<string>"` est une [chaîne formatée](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Obtenir un objet `Quote`. La valeur par défaut pour `block_number` est `None` (aucune valeur).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Si aucun numéro de bloc n'a été spécifié, utilisez `w3.eth.block_number`, qui est le dernier numéro de bloc. C'est la syntaxe pour [une instruction `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Il pourrait sembler préférable de simplement définir la valeur par défaut sur `w3.eth.block_number`, mais cela ne fonctionne pas bien car ce serait le numéro de bloc au moment où la fonction est définie. Dans un agent de longue durée, cela poserait problème.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Utilisez [la bibliothèque `datetime`](https://docs.python.org/3/library/datetime.html) pour le formater dans un format lisible par les humains et les grands modèles de langage (LLM). Utilisez [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) pour arrondir la valeur à deux décimales.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

En Python, vous définissez une [liste](https://docs.python.org/3/library/stdtypes.html#typesseq-list) qui ne peut contenir qu'un type spécifique en utilisant `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

En Python, une [boucle `for`](https://docs.python.org/3/tutorial/controlflow.html#for-statements) itère généralement sur une liste. La liste des numéros de blocs dans lesquels trouver des cotations provient de [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Pour chaque numéro de bloc, obtenez un objet `Quote` et ajoutez-le à la liste `quotes`. Ensuite, renvoyez cette liste.

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

Ceci est le code principal du script. Lisez les informations du pool, obtenez douze cotations et [imprimez-les (`pprint`)](https://docs.python.org/3/library/pprint.html#pprint.pprint).

### Créer un prompt {#prompt}

Ensuite, nous devons convertir cette liste de cotations en un prompt pour un LLM et obtenir une valeur future attendue.

```sh
git checkout 03-create-prompt
uv run agent.py
```

La sortie va maintenant être un prompt pour un LLM, similaire à :

```
Given these quotes:
Asset: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

Asset: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


What would you expect the value for WETH/USDC to be at time 2026-02-02T17:56?

Provide your answer as a single number rounded to two decimal places,
without any other text.
```

Remarquez qu'il y a des cotations pour deux actifs ici, `WETH/USDC` et `WBTC/WETH`. L'ajout de cotations d'un autre actif pourrait améliorer la précision de la prédiction.

#### À quoi ressemble un prompt {#prompt-explanation}

Ce prompt contient trois sections, qui sont assez courantes dans les prompts de LLM.

1. Informations. Les LLM disposent de beaucoup d'informations issues de leur entraînement, mais ils n'ont généralement pas les plus récentes. C'est la raison pour laquelle nous devons récupérer les dernières cotations ici. L'ajout d'informations à un prompt est appelé [génération augmentée par la recherche (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. La question elle-même. C'est ce que nous voulons savoir.

3. Instructions de formatage de la sortie. Normalement, un LLM nous donnera une estimation avec une explication de la façon dont il y est parvenu. C'est mieux pour les humains, mais un programme informatique a juste besoin du résultat final.

#### Explication du code {#prompt-code}

Voici le nouveau code.

```python
from datetime import datetime, timezone, timedelta
```

Nous devons fournir au LLM l'heure pour laquelle nous voulons une estimation. Pour obtenir une heure « n minutes/heures/jours » dans le futur, nous utilisons [la classe `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Les adresses des pools que nous lisons
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

Nous avons deux pools que nous devons lire.

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
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (jeton1 par jeton0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

Dans le pool WETH/USDC, nous voulons savoir combien de `token0` (USDC) nous avons besoin pour acheter un `token1` (WETH). Dans le pool WETH/WBTC, nous voulons savoir combien de `token1` (WETH) nous avons besoin pour acheter un `token0` (WBTC, qui est du Bitcoin enveloppé). Nous devons suivre si le ratio du pool doit être inversé.

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

Pour savoir si un pool doit être inversé, nous devons l'obtenir en entrée de `read_pool`. De plus, le symbole de l'actif doit être configuré correctement.

La syntaxe `<a> if <b> else <c>` est l'équivalent Python de l'[opérateur conditionnel ternaire](https://en.wikipedia.org/wiki/Ternary_conditional_operator), qui dans un langage dérivé du C serait `<b> ? <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Cette fonction construit une chaîne qui formate une liste d'objets `Quote`, en supposant qu'ils s'appliquent tous au même actif.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

En Python, les [chaînes de caractères multilignes](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) s'écrivent sous la forme `"""` .... `"""`.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Ici, nous utilisons le modèle [MapReduce](https://en.wikipedia.org/wiki/MapReduce) pour générer une chaîne pour chaque liste de cotations avec `format_quotes`, puis nous les réduisons en une seule chaîne à utiliser dans le prompt.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

Le reste du prompt est comme prévu.

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

Examinez les deux pools et obtenez des cotations des deux.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Déterminez le moment futur pour lequel nous voulons l'estimation, et créez le prompt.

### S'interfacer avec un LLM {#interface-llm}

Ensuite, nous interrogeons un véritable LLM et recevons une valeur future attendue. J'ai écrit ce programme en utilisant OpenAI, donc si vous souhaitez utiliser un autre fournisseur, vous devrez l'adapter.

1. Obtenez un [compte OpenAI](https://auth.openai.com/create-account)
2. [Approvisionnez le compte](https://platform.openai.com/settings/organization/billing/overview) — le montant minimum au moment de la rédaction est de 5 $
3. [Créez une clé API](https://platform.openai.com/settings/organization/api-keys)
4. Dans la ligne de commande, exportez la clé API pour que votre programme puisse l'utiliser

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
   ```

5. Récupérez (checkout) et exécutez l'agent

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
Prediction for 2026-01-05T19:50: predicted 3138.93 USD, real 3218.92 USD, error 79.99 USD
Prediction for 2026-01-06T19:56: predicted 3243.39 USD, real 3221.08 USD, error 22.31 USD
Prediction for 2026-01-07T20:02: predicted 3223.24 USD, real 3146.89 USD, error 76.35 USD
Prediction for 2026-01-08T20:11: predicted 3150.47 USD, real 3092.04 USD, error 58.43 USD
.
.
.
Prediction for 2026-01-31T22:33: predicted 2637.73 USD, real 2417.77 USD, error 219.96 USD
Prediction for 2026-02-01T22:41: predicted 2381.70 USD, real 2318.84 USD, error 62.86 USD
Prediction for 2026-02-02T22:49: predicted 2234.91 USD, real 2349.28 USD, error 114.37 USD
Mean prediction error over 29 predictions: 83.87103448275862068965517241 USD
Mean change per recommendation: 4.787931034482758620689655172 USD
Standard variance of changes: 104.42 USD
Profitable days: 51.72%
Losing days: 48.28%
```

La majeure partie du testeur est identique à l'agent, mais voici les parties qui sont nouvelles ou modifiées.

```python
CYCLES_FOR_TEST = 40 # Pour le backtest, le nombre de cycles sur lesquels nous testons

# Obtenir de nombreuses cotations
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

Nous regardons `CYCLES_FOR_TEST` (spécifié comme 40 ici) jours en arrière.

```python
# Créer des prédictions et les comparer à l'historique réel

total_error = Decimal(0)
changes = []
```

Il y a deux types d'erreurs qui nous intéressent. La première, `total_error`, est simplement la somme des erreurs commises par le prédicteur.

Pour comprendre la seconde, `changes`, nous devons nous rappeler le but de l'agent. Ce n'est pas de prédire le ratio WETH/USDC (prix de l'ETH). C'est d'émettre des recommandations de vente et d'achat. Si le prix est actuellement de 2000 $ et qu'il prédit 2010 $ demain, cela ne nous dérange pas si le résultat réel est de 2020 $ et que nous gagnons de l'argent supplémentaire. Mais cela nous dérange _vraiment_ s'il a prédit 2010 $, a acheté de l'ETH sur la base de cette recommandation, et que le prix chute à 1990 $.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Nous ne pouvons examiner que les cas où l'historique complet (les valeurs utilisées pour la prédiction et la valeur réelle à laquelle la comparer) est disponible. Cela signifie que le cas le plus récent doit être celui qui a commencé il y a `CYCLES_BACK`.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Utilisez des [tranches (slices)](https://www.w3schools.com/python/ref_func_slice.asp) pour obtenir le même nombre d'échantillons que celui utilisé par l'agent. Le code entre ici et le segment suivant est le même code d'obtention de prédiction que nous avons dans l'agent.

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

Pour `changes`, nous voulons l'impact monétaire de l'achat ou de la vente d'un ETH. Donc, d'abord, nous devons déterminer la recommandation, puis évaluer comment le prix réel a changé, et si la recommandation a rapporté de l'argent (changement positif) ou coûté de l'argent (changement négatif).

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

Utilisez [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) pour compter le nombre de jours rentables et le nombre de jours coûteux. Le résultat est un objet filtre, que nous devons convertir en liste pour obtenir la longueur.

### Soumettre des transactions {#submit-txn}

Maintenant, nous devons réellement soumettre des transactions. Cependant, je ne veux pas dépenser d'argent réel à ce stade, avant que le système ne soit éprouvé. À la place, nous allons créer un fork local du réseau principal, et « trader » sur ce réseau.

Voici les étapes pour créer un fork local et activer le trading.

1. Installez [Foundry](https://getfoundry.sh/introduction/installation)

2. Démarrez [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` écoute sur l'URL par défaut de Foundry, http://localhost:8545, nous n'avons donc pas besoin de spécifier l'URL pour [la commande `cast`](https://getfoundry.sh/cast/overview) que nous utilisons pour manipuler la chaîne de blocs.

3. Lors de l'exécution dans `anvil`, il y a dix comptes de test qui ont de l'ETH — définissez les variables d'environnement pour le premier

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Ce sont les contrats que nous devons utiliser. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) est le contrat Uniswap v3 que nous utilisons pour trader réellement. Nous pourrions trader directement via le pool, mais c'est beaucoup plus facile ainsi.

   Les deux variables du bas sont les chemins Uniswap v3 requis pour échanger entre WETH et USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Chacun des comptes de test possède 10 000 ETH. Utilisez le contrat WETH pour envelopper 1000 ETH afin d'obtenir 1000 WETH pour le trading.

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

   L'appel `approve` crée une allocation qui permet à `SwapRouter` de dépenser certains de nos jetons. Les contrats ne peuvent pas surveiller les événements, donc si nous transférons des jetons directement au contrat `SwapRouter`, il ne saurait pas qu'il a été payé. Au lieu de cela, nous permettons au contrat `SwapRouter` de dépenser un certain montant, et ensuite `SwapRouter` le fait. Cela se fait via une fonction appelée par `SwapRouter`, il sait donc si cela a réussi.

7. Vérifiez que vous avez suffisamment des deux jetons.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
   ```

Maintenant que nous avons du WETH et de l'USDC, nous pouvons réellement exécuter l'agent.

```sh
git checkout 05-trade
uv run agent.py
```

La sortie ressemblera à ceci :

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
Current price: 1843.16
In 2026-02-06T23:07, expected price: 1724.41 USD
Account balances before trade:
USDC Balance: 927301.578272
WETH Balance: 500
Sell, I expect the price to go down by 118.75 USD
Approve transaction sent: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
Approve transaction mined.
Sell transaction sent: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
Sell transaction mined.
Account balances after trade:
USDC Balance: 929143.797116
WETH Balance: 499
```

Pour l'utiliser réellement, vous avez besoin de quelques modifications mineures.

- À la ligne 14, remplacez `MAINNET_URL` par un véritable point d'accès, tel que `https://eth.drpc.org`
- À la ligne 28, remplacez `PRIVATE_KEY` par votre propre clé privée
- À moins que vous ne soyez très riche et que vous puissiez acheter ou vendre 1 ETH chaque jour pour un agent non éprouvé, vous voudrez peut-être modifier la ligne 29 pour diminuer `WETH_TRADE_AMOUNT`

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

Pour trader réellement, nous avons besoin de la fonction `approve`. Nous voulons également afficher les soldes avant et après, nous avons donc aussi besoin de `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

Dans l'ABI de `SwapRouter`, nous avons juste besoin de `exactInput`. Il existe une fonction connexe, `exactOutput`, que nous pourrions utiliser pour acheter exactement un WETH, mais pour des raisons de simplicité, nous utilisons simplement `exactInput` dans les deux cas.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Les définitions Web3 pour le [contrat `account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) et le contrat `SwapRouter`.

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

Approuver une allocation de jetons pour `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

C'est ainsi que nous envoyons une transaction dans Web3. D'abord, nous utilisons [l'objet `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) pour construire la transaction. Ensuite, nous utilisons [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) pour signer la transaction, en utilisant `PRIVATE_KEY`. Enfin, nous utilisons [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) pour envoyer la transaction.

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

Contrairement à `SELL_PARAMS`, les paramètres d'achat peuvent changer. Le montant d'entrée est le coût de 1 WETH, tel que disponible dans `quote`.

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

Les fonctions `buy()` et `sell()` sont presque identiques. D'abord, nous approuvons une allocation suffisante pour `SwapRouter`, puis nous l'appelons avec le chemin et le montant corrects.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Rapportez les soldes de l'utilisateur dans les deux devises.

```python
print("Account balances before trade:")
balances()

if (expected_price > current_price):
    print(f"Buy, I expect the price to go up by {expected_price - current_price} USD")
    buy(wethusdc_quotes[-1])
else:
    print(f"Sell, I expect the price to go down by {current_price - expected_price} USD")
    sell()

print("Account balances after trade:")
balances()
```

Cet agent ne fonctionne actuellement qu'une seule fois. Cependant, vous pouvez le modifier pour qu'il fonctionne en continu, soit en l'exécutant depuis [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html), soit en enveloppant les lignes 368-400 dans une boucle et en utilisant [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) pour attendre qu'il soit temps pour le cycle suivant.

## Améliorations possibles {#improvements}

Il ne s'agit pas d'une version de production complète ; c'est simplement un exemple pour enseigner les bases. Voici quelques idées d'améliorations.

### Un trading plus intelligent {#smart-trading}

Il y a deux faits importants que l'agent ignore lorsqu'il décide quoi faire.

- _L'ampleur du changement anticipé_. L'agent vend un montant fixe de `WETH` si le prix devrait baisser, quelle que soit l'ampleur de la baisse.
  On pourrait soutenir qu'il serait préférable d'ignorer les changements mineurs et de vendre en fonction de la baisse de prix attendue.
- _Le portefeuille actuel_. Si 10 % de votre portefeuille est en WETH et que vous pensez que le prix va augmenter, il est probablement judicieux d'en acheter davantage. Mais si 90 % de votre portefeuille est en WETH, vous êtes peut-être suffisamment exposé, et il n'est pas nécessaire d'en acheter plus. L'inverse est vrai si vous vous attendez à ce que le prix baisse.

### Et si vous voulez garder votre stratégie de trading secrète ? {#secret}

Les fournisseurs d'IA peuvent voir les requêtes que vous envoyez à leurs LLM, ce qui pourrait exposer le système de trading de génie que vous avez développé avec votre agent. Un système de trading que trop de gens utilisent ne vaut rien car trop de gens essaient d'acheter quand vous voulez acheter (et le prix monte) et essaient de vendre quand vous voulez vendre (et le prix baisse).

Vous pouvez exécuter un LLM localement, par exemple en utilisant [LM-Studio](https://lmstudio.ai/), pour éviter ce problème.

### Du bot IA à l'agent IA {#bot-to-agent}

Vous pouvez tout à fait soutenir qu'il s'agit d'[un bot IA, et non d'un agent IA](/ai-agents/#ai-agents-vs-ai-bots). Il implémente une stratégie relativement simple qui s'appuie sur des informations prédéfinies. Nous pouvons permettre l'auto-amélioration, par exemple, en fournissant une liste de pools Uniswap v3 et leurs dernières valeurs et en demandant quelle combinaison a la meilleure valeur prédictive.

### Protection contre le glissement {#slippage-protection}

Actuellement, il n'y a pas de [protection contre le glissement](https://uniswapv3book.com/milestone_3/slippage-protection.html). Si la cotation actuelle est de 2000 $ et que le prix attendu est de 2100 $, l'agent achètera. Cependant, si avant que l'agent n'achète, le coût monte à 2200 $, il n'est plus logique d'acheter.

Pour implémenter la protection contre le glissement, spécifiez une valeur `amountOutMinimum` aux lignes 325 et 334 de [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Conclusion {#conclusion}

Espérons que vous en savez maintenant assez pour commencer avec les agents IA. Ce n'est pas un aperçu exhaustif du sujet ; il y a des livres entiers qui y sont consacrés, mais c'est suffisant pour vous lancer. Bonne chance !

[Voir ici pour plus de mes travaux](https://cryptodocguy.pro/).