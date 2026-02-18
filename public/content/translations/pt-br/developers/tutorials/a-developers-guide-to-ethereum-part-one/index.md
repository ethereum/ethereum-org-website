---
title: "Uma introdução ao Ethereum para desenvolvedores Python, parte 1"
description: "Uma introdução ao desenvolvimento em Ethereum, especialmente útil para aqueles com conhecimento da linguagem de programação Python"
author: Marc Garreau
lang: pt-br
tags: [ "python", "web3.py" ]
skill: beginner
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Então, você já ouviu falar de Ethereum e está pronto para entrar na toca do coelho? Este artigo abordará rapidamente alguns conceitos básicos de blockchain e, em seguida, fará com que você interaja com um nó Ethereum simulado – lendo dados de blocos, verificando saldos de contas e enviando transações. Ao longo do caminho, destacaremos as diferenças entre as formas tradicionais de criar aplicativos e este novo paradigma descentralizado.

## (Pré-requisitos flexíveis) {#soft-prerequisites}

Este artigo pretende ser acessível a uma vasta gama de desenvolvedores. [Ferramentas Python](/developers/docs/programming-languages/python/) serão usadas, mas elas são apenas um veículo para as ideias – não há problema se você não for um desenvolvedor Python. No entanto, farei apenas algumas suposições sobre o que você já sabe, para que possamos avançar rapidamente para os pontos específicos do Ethereum.

Suposições:

- Você sabe usar um terminal,
- Você já escreveu algumas linhas de código Python,
- A versão 3.6 ou superior do Python está instalada em sua máquina (o uso de um [ambiente virtual](https://realpython.com/effective-python-environment/#virtual-environments) é fortemente incentivado), e
- você já usou o `pip`, o instalador de pacotes do Python.
  Novamente, se algum desses pontos não for verdadeiro, ou se você não planeja reproduzir o código neste artigo, provavelmente ainda conseguirá acompanhar sem problemas.

## Blockchains, resumidamente {#blockchains-briefly}

Existem muitas maneiras de descrever o Ethereum, mas em sua essência, ele é uma blockchain. As blockchains são compostas por uma série de blocos, então vamos começar por aí. Em termos mais simples, cada bloco na blockchain Ethereum é apenas um conjunto de metadados e uma lista de transações. No formato JSON, se parece com algo assim:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Cada [bloco](/developers/docs/blocks/) tem uma referência ao bloco que veio antes dele; o `parentHash` é simplesmente o hash do bloco anterior.

<FeaturedText>Observação: o Ethereum faz uso regular de <a href="https://wikipedia.org/wiki/Hash_function">funções hash</a> para produzir valores de tamanho fixo (“hashes”). Os hashes desempenham um papel importante no Ethereum, mas você pode pensar neles como IDs exclusivos por enquanto.</FeaturedText>

![Um diagrama que retrata uma blockchain, incluindo os dados dentro de cada bloco](./blockchain-diagram.png)

_Uma blockchain é essencialmente uma lista encadeada; cada bloco tem uma referência ao bloco anterior._

Essa estrutura de dados não é nova, mas as regras (ou seja, protocolos ponto a ponto) que governam a rede, sim. Não há autoridade central; a rede de pares deve colaborar para sustentar a rede e competir para decidir quais transações incluir no próximo bloco. Então, quando você quiser enviar dinheiro para um amigo, precisará transmitir essa transação para a rede e esperar que ela seja incluída em um bloco futuro.

A única maneira de a blockchain verificar se o dinheiro foi realmente enviado de um usuário para outro é usar uma moeda nativa daquela blockchain (ou seja, criada e governada por ela). No Ethereum, essa moeda é chamada ether, e a blockchain Ethereum contém o único registro oficial de saldos de contas.

## Um novo paradigma {#a-new-paradigm}

Essa nova pilha de tecnologia descentralizada gerou novas ferramentas para desenvolvedores. Essas ferramentas existem em muitas linguagens de programação, mas nós as veremos pela ótica do Python. Reiterando: mesmo que Python não seja sua linguagem de escolha, não deve ser muito difícil acompanhar.

Desenvolvedores Python que desejam interagir com o Ethereum provavelmente usarão o [Web3.py](https://web3py.readthedocs.io/). Web3.py é uma biblioteca que simplifica muito a maneira como você se conecta a um nó Ethereum e, em seguida, envia e recebe dados dele.

<FeaturedText>Observação: “nó Ethereum” e “cliente Ethereum” são usados de forma intercambiável. Em ambos os casos, refere-se ao software que um participante da rede Ethereum executa. Este software pode ler dados de blocos, receber atualizações quando novos blocos são adicionados à cadeia, transmitir novas transações e muito mais. Tecnicamente, o cliente é o software, e o nó é o computador que executa o software.</FeaturedText>

[Clientes Ethereum](/developers/docs/nodes-and-clients/) podem ser configurados para serem acessíveis por [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP ou Websockets, então o Web3.py precisará espelhar essa configuração. O Web3.py se refere a essas opções de conexão como **provedores**. Você precisará escolher um dos três provedores para vincular a instância do Web3.py com seu nó.

![Um diagrama mostrando como o web3.py usa IPC para conectar seu aplicativo a um nó Ethereum](./web3py-and-nodes.png)

_Configure o nó Ethereum e o Web3.py para se comunicarem através do mesmo protocolo, por exemplo, IPC neste diagrama._

Uma vez que o Web3.py esteja configurado corretamente, você pode começar a interagir com a blockchain. Aqui estão alguns exemplos de uso do Web3.py como uma prévia do que está por vir:

```python
# ler dados de bloco:
w3.eth.get_block('latest')

# enviar uma transação:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Instalação {#installation}

Neste passo a passo, trabalharemos apenas dentro de um interpretador Python. Não criaremos nenhum diretório, arquivo, classe ou função.

<FeaturedText>Observação: nos exemplos abaixo, os comandos que começam com `$` devem ser executados no terminal. (Não digite o `$`, ele apenas significa o início da linha.)</FeaturedText>

Primeiro, instale o [IPython](https://ipython.org/) para ter um ambiente amigável para explorar. O IPython oferece preenchimento com a tecla Tab, entre outros recursos, tornando muito mais fácil ver o que é possível dentro do Web3.py.

```bash
pip install ipython
```

O Web3.py é publicado com o nome `web3`. Instale-o da seguinte forma:

```bash
pip install web3
```

Mais uma coisa – vamos simular uma blockchain mais tarde, o que requer mais algumas dependências. Você pode instalá-las via:

```bash
pip install 'web3[tester]'
```

Está tudo pronto para começar!

Observação: o pacote `web3[tester]` funciona até o Python 3.10.xx

## Iniciando um sandbox {#spin-up-a-sandbox}

Abra um novo ambiente Python executando `ipython` em seu terminal. Isso é comparável a executar `python`, mas vem com mais recursos extras.

```bash
ipython
```

Isso imprimirá algumas informações sobre as versões do Python e do IPython que você está executando, e então você verá um prompt aguardando a entrada:

```python
In [1]:
```

Você está vendo um shell interativo do Python agora. Essencialmente, é um sandbox para experimentar. Se você chegou até aqui, é hora de importar o Web3.py:

```python
In [1]: from web3 import Web3
```

## Apresentando o módulo Web3 {#introducing-the-web3-module}

Além de ser um portal para o Ethereum, o módulo [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) oferece algumas funções de conveniência. Vamos explorar algumas delas.

Em um aplicativo Ethereum, você comumente precisará converter denominações de moeda. O módulo Web3 fornece alguns métodos auxiliares apenas para isso: [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) e [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Observação: computadores são conhecidos por não lidarem bem com matemática decimal. Para contornar isso, os desenvolvedores geralmente armazenam valores em dólares como centavos. Por exemplo, um item com o preço de US$ 5,99 pode ser armazenado no banco de dados como 599.

Um padrão semelhante é usado ao lidar com transações em <b>ether</b>. No entanto, em vez de duas casas decimais, o ether tem 18! A menor denominação do ether é chamada de <b>wei</b>, então esse é o valor especificado ao enviar transações.

1 ether = 1000000000000000000 wei

1 wei = 0,000000000000000001 ether

</FeaturedText>

Tente converter alguns valores de e para wei. Observe que [existem nomes para muitas das denominações](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations) entre ether e wei. Um dos mais conhecidos entre eles é o **gwei**, pois é frequentemente como as taxas de transação são representadas.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Outros métodos utilitários no módulo Web3 incluem conversores de formato de dados (por exemplo, [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), auxiliares de endereço (por exemplo, [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)) e funções de hash (por exemplo, [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Muitos deles serão abordados mais adiante na série. Para ver todos os métodos e propriedades disponíveis, utilize o preenchimento automático do IPython digitando `Web3`. e pressionando a tecla Tab duas vezes após o ponto.

## Conversando com a cadeia {#talk-to-the-chain}

Os métodos de conveniência são ótimos, mas vamos passar para a blockchain. O próximo passo é configurar o Web3.py para se comunicar com um nó Ethereum. Aqui, temos a opção de usar os provedores IPC, HTTP ou Websocket.

Não seguiremos por este caminho, mas um exemplo de um fluxo de trabalho completo usando o Provedor HTTP pode ser algo assim:

- Baixe um nó Ethereum, por exemplo, o [Geth](https://geth.ethereum.org/).
- Inicie o Geth em uma janela de terminal e espere que ele sincronize com a rede. A porta HTTP padrão é `8545`, mas é configurável.
- Diga ao Web3.py para se conectar ao nó via HTTP, em `localhost:8545`.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Use a instância `w3` para interagir com o nó.

Embora esta seja uma maneira “real” de fazer isso, o processo de sincronização leva horas e é desnecessário se você só quer um ambiente de desenvolvimento. O Web3.py expõe um quarto provedor para este fim, o **EthereumTesterProvider**. Este provedor de teste se vincula a um nó Ethereum simulado com permissões flexíveis e moeda falsa para experimentar.

![Um diagrama mostrando o EthereumTesterProvider que vincula o seu aplicativo web3.py a um nó Ethereum simulado](./ethereumtesterprovider.png)

_O EthereumTesterProvider se conecta a um nó simulado e é útil para ambientes de desenvolvimento rápidos._

Esse nó simulado é chamado [eth-tester](https://github.com/ethereum/eth-tester) e nós o instalamos como parte do comando `pip install web3[tester]`. Configurar o Web3.py para usar este provedor de teste é tão simples quanto:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Agora você está pronto para surfar na cadeia! Isso não é algo que as pessoas dizem. Eu acabei de inventar isso. Vamos fazer um tour rápido.

## O tour rápido {#the-quick-tour}

Primeiro, uma verificação:

```python
In [5]: w3.is_connected()
Out[5]: True
```

Como estamos usando o provedor de teste, este não é um teste muito valioso, mas se ele falhar, é provável que você tenha digitado algo errado ao instanciar a variável `w3`. Verifique se você incluiu os parênteses internos, ou seja, `Web3.EthereumTesterProvider()`.

## Parada do tour nº 1: [contas](/developers/docs/accounts/) {#tour-stop-1-accounts}

Por conveniência, o provedor de teste criou algumas contas e as pré-carregou com ether de teste.

Primeiro, vamos ver uma lista dessas contas:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Se você executar este comando, verá uma lista de dez strings que começam com `0x`. Cada um é um **endereço público** e é, de certa forma, análogo ao número de uma conta corrente. Você forneceria este endereço a alguém que quisesse lhe enviar ether.

Como mencionado, o provedor de teste pré-carregou cada uma dessas contas com um pouco de ether de teste. Vamos descobrir quanto há na primeira conta:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

São muitos zeros! Antes de sair rindo até o banco falso, lembre-se da lição sobre denominações de moeda de antes. Os valores de Ether são representados na menor denominação, wei. Converta isso para ether:

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Um milhão de ether de teste — nada mal.

## Parada do tour nº 2: dados do bloco {#tour-stop-2-block-data}

Vamos dar uma olhada no estado desta blockchain simulada:

```python
In [9]: w3.eth.get_block('latest')
Out[9]: AttributeDict({
   'number': 0,
   'hash': HexBytes('0x9469878...'),
   'parentHash': HexBytes('0x0000000...'),
   ...
   'transactions': []
})
```

Muitas informações são retornadas sobre um bloco, mas há apenas algumas coisas a serem destacadas aqui:

- O número do bloco é zero — não importa há quanto tempo você configurou o provedor de teste. Ao contrário da rede Ethereum real, que adiciona um novo bloco a cada 12 segundos, esta simulação esperará até que você lhe dê algum trabalho a fazer.
- `transactions` é uma lista vazia, pelo mesmo motivo: ainda não fizemos nada. Este primeiro bloco é um **bloco vazio**, apenas para iniciar a cadeia.
- Observe que o `parentHash` é apenas um monte de bytes vazios. Isso significa que é o primeiro bloco da cadeia, também conhecido como **bloco gênese**.

## Parada do tour nº 3: [transações](/developers/docs/transactions/) {#tour-stop-3-transactions}

Estamos presos no bloco zero até que haja uma transação pendente, então vamos criar uma. Envie alguns ether de teste de uma conta para outra:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

Este é geralmente o ponto em que você esperaria vários segundos para que sua transação fosse incluída em um novo bloco. O processo completo é mais ou menos assim:

1. Envie uma transação e guarde o hash da transação. Até que o bloco contendo a transação seja criado e transmitido, a transação fica “pendente”.
   `tx_hash = w3.eth.send_transaction({ … })`
2. Aguarde a transação ser incluída em um bloco:
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Continue a lógica do aplicativo. Para ver a transação bem-sucedida:
   `w3.eth.get_transaction(tx_hash)`

Nosso ambiente simulado adicionará a transação a um novo bloco instantaneamente, para que possamos ver a transação imediatamente:

```python
In [11]: w3.eth.get_transaction(tx_hash)
Out[11]: AttributeDict({
   'hash': HexBytes('0x15e9fb95dc39...'),
   'blockNumber': 1,
   'transactionIndex': 0,
   'from': '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
   'to': '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
   'value': 3000000000000000000,
   ...
})
```

Você verá alguns detalhes familiares aqui: os campos `from`, `to` e `value` devem corresponder às entradas de nossa chamada `send_transaction`. O outro detalhe reconfortante é que esta transação foi incluída como a primeira transação (`'transactionIndex': 0`) no bloco número 1.

Também podemos verificar facilmente o sucesso desta transação, verificando os saldos das duas contas envolvidas. Três ether deveriam ter sido movidos de uma para outra.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

O último parece bom! O saldo passou de 1.000.000 para 1.000.003 ether. Mas o que aconteceu com a primeira conta? Parece ter perdido um pouco mais de três ether. Infelizmente, nada na vida é de graça, e usar a rede pública Ethereum exige que você compense seus pares por seu papel de apoio. Uma pequena taxa de transação foi deduzida da conta que enviou a transação - essa taxa é a quantidade de gás queimado (21.000 unidades de gás para uma transferência de ETH) multiplicada por uma taxa base que varia de acordo com a atividade da rede, mais uma gorjeta que vai para o validador que inclui a transação em um bloco.

Mais sobre [gás](/developers/docs/gas/#post-london)

<FeaturedText>Observação: na rede pública, as taxas de transação são variáveis com base na demanda da rede e na rapidez com que você gostaria que uma transação fosse processada. Se você estiver interessado em uma análise de como as taxas são calculadas, veja minha postagem anterior sobre <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">como as transações são incluídas em um bloco</a>.</FeaturedText>

## E respire {#and-breathe}

Já estamos nisso há um tempo, então este parece ser um bom lugar para fazer uma pausa. A descoberta continua, e vamos continuar explorando na parte dois desta série. Alguns conceitos futuros: conectar a um nó real, contratos inteligentes e tokens. Tem mais alguma pergunta? Queremos saber! Seu feedback influenciará para onde vamos a partir daqui. Pedidos são bem-vindos via [Twitter](https://twitter.com/wolovim).
