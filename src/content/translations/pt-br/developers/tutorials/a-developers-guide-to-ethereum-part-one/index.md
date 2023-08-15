---
title: Uma introdução do desenvolvedor Python ao Ethereum, parte 1
description: Uma introdução ao desenvolvimento do Ethereum, especialmente útil para aqueles com conhecimento sobre a linguagem de programação Python
author: Marc Garreau
lang: pt-br
tags:
  - "primeiros passos"
  - "python"
  - "web3.py"
skill: beginner
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Você ouviu falar sobre Ethereum e agora está pronto para saber mais? Este post cobrirá rapidamente alguns conceitos básicos de blockchain e, em seguida, fará com que você interaja com um nó simulado do Ethereum – lendo dados do bloco, verificando saldos da conta e enviando transações. Em todo o caminho, vamos destacar as diferenças entre as maneiras tradicionais de desenvolver aplicativos e este novo paradigma descentralizado.

## Pré-requisitos de software {#soft-prerequisites}

Este post espera ser acessível a muitos desenvolvedores. Usaremos [ferramentas Python](/developers/docs/programming-languages/python/), mas elas são apenas um meio para as ideias — não há problema se você não é um desenvolvedor Python. No entanto, vou fazer apenas algumas suposições sobre o que você já sabe, para que possamos passar rapidamente aos temas específicos do Ethereum.

Suposições:

- você pode utilizar um terminal,
- você já escreveu algumas linhas de código Python,
- A versão 3.6 ou superior do Python está instalada no seu computador (uso de um [ambiente virtual](https://realpython.com/effective-python-environment/#virtual-environments) é fortemente recomendado) e
- você já usou o `pip`, instalador de pacotes do Python. Novamente, se algum destes pré-requisitos não for verdadeiro, ou se você não planeja reproduzir o código apresentado neste artigo, é provável que você ainda possa acompanhar sem maiores problemas.

## Blockchains, em poucas palavras {#blockchains-briefly}

Há muitas maneiras de descrever o Ethereum, mas no fundo é uma blockchain. As blockchains são compostas de uma série de blocos, então vamos começar por aí. Em termos mais simples, cada bloco na blockchain do Ethereum é somente um conjunto de metadados e uma lista de transações. No formato JSON, que se parece com algo assim:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   "miner": "0xa1b2c3...",
   ...,
   "transactions": [...]
}
```

Cada [bloco](/developers/docs/blocks/) tem uma referência ao bloco que veio antes dele; o `parentHash` é simplesmente o hash do bloco anterior.

<div class="featured">Observação: o Ethereum faz uso regular de <a href="https://wikipedia.org/wiki/Hash_function">funções hash</a> para produzir valores de tamanho fixo ("hashes"). Os hashes desempenham um papel importante no Ethereum, mas você pode pensar neles como IDs exclusivos por enquanto.</div>

![Um diagrama que retrata uma blockchain incluindo os dados dentro de cada bloco](./blockchain-diagram.png)

_Uma blockchain é essencialmente uma lista encadeada; onde cada bloco tem uma referência ao bloco anterior._

Esta estrutura de dados não é nada nova, mas as regras (por exemplo, os protocolos peer-to-peer) que regem a rede são. Não há autoridade central; a rede de pares deve colaborar para sustentar a rede e competir para decidir quais transações incluir no próximo bloco. Então, quando você quiser enviar algum dinheiro para um amigo, você precisará transmitir essa transação para a rede, depois espere que ela seja incluída em um próximo bloco.

A única maneira de a blockchain verificar se o dinheiro foi realmente enviado de um usuário para outro é usar uma moeda nativa de (isto é, criada e governada por) aquela blockchain. No Ethereum, esta moeda é chamada ether, e a blockchain Ethereum contém o único registro oficial dos saldos das contas.

## Um novo paradigma {#a-new-paradigm}

Esta nova pilha de tecnologia descentralizada gerou novas ferramentas de desenvolvedor. Tais ferramentas existem em muitas linguagens de programação, mas vamos analisar através das lentes do Python. Para reiterar: mesmo que o Python não seja sua linguagem escolhida, você não terá muitos problemas para acompanhar.

Os desenvolvedores do Python que querem interagir com o Ethereum provavelmente usem a [Web3.py](https://web3py.readthedocs.io/). Web3.py é uma biblioteca que simplifica muito a forma como você se conecta a um nó Ethereum, e depois envia e recebe dados dele.

<div class="featured">Nota: "Nó Ethereum" e "Cliente Ethereum" são usados de forma intercambiável. Em ambos os casos, refere-se ao software que um participante da rede Ethereum executa. Este software pode ler dados de blocos, receber atualizações quando novos blocos são adicionados à cadeia ("minerado"), transmitir novas transações e muito mais.</div>

[Clientes Ethereum](/developers/docs/nodes-and-clients/) podem ser configurados para serem acessíveis por [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTPS ou Websockets, então Web3. y precisará espelhar esta configuração. Web3.py refere-se a estas opções de conexão como **provedores**. Você vai querer escolher um dos três provedores para vincular a instância da Web3.py ao seu nó.

![Um diagrama que mostra como web3.py usa o IPC para conectar o seu aplicativo a um nó Ethereum](./web3py-and-nodes.png)

_Configure o nó Ethereum e o Web3.py para se comunicarem através do mesmo protocolo, por exemplo, o IPC neste diagrama._

Uma vez que o Web3.py estiver configurado corretamente, você pode começar a interagir com a blockchain. Aqui estão alguns exemplos de uso da Web3.py como uma prévia do que está por vir:

```python
# read block data:
w3.eth.get_block('latest')

# send a transaction:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Instalação {#installation}

Neste guia, vamos trabalhar apenas com um interpretador de Python. Não criaremos nenhum diretório, arquivos, classes ou funções.

<div class="featured">Observação: nos exemplos abaixo, os comandos que começam com `$` devem ser executados no terminal. (Não digite o `$`, ele apenas significa o início da linha.)</div>

Primeiro, instale [IPython](https://ipython.org/) para explorar em um ambiente amigável. IPython propõe, entre outros, um recurso de autopreenchimento com tab, o que facilita a navegação no Web3.py.

```bash
$ pip install ipython
```

Web3.py é publicado sob o nome `web3`. Instale-o assim:

```bash
$ pip install web3
```

Mais uma coisa: vamos simular uma blockchain mais tarde, o que requer mais algumas dependências. Você pode instalar por meio de:

```bash
$ pip install 'web3[tester]'
```

Você está pronto para começar!

## Crie uma sandbox {#spin-up-a-sandbox}

Abra um novo ambiente Python executando o `ipython` no seu terminal. Isso é comparável a executar `python`, mas vem com mais "efeitos especiais".

```bash
$ ipython
```

Isso mostrará algumas informações sobre as versões do Python e do IPython que você está executando, então você deve ver um prompt esperando por uma entrada:

```python
In [1]:
```

Você está olhando para um shell interativo do Python agora. Essencialmente, é uma sandbox para utilizar. If you’ve made it this far, its time to import Web3.py:

```python
In [1]: from web3 import Web3
```

## Introduzindo o módulo Web3 {#introducing-the-web3-module}

Além de ser um gateway para Ethereum, o módulo [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) oferece algumas funções práticas. Vamos ver algumas.

Em um aplicativo Ethereum, você normalmente precisará converter denominações de moeda. O módulo Web3 fornece alguns métodos auxiliares só para isso: [fromWei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.fromWei) e [toWei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toWei).

<div class="featured">
Observação: os computadores são notoriamente pouco eficazes para lidar com números decimais. Para contornar isso, os desenvolvedores costumam armazenar valores em dólares em centavos. Por exemplo, um item com preço de $5,99 pode ser armazenado no banco de dados como 599.

Um padrão similar é usado ao lidar com transações em <b>ether</b>. No entanto, em vez de dois pontos decimais, ether tem 18! A menor denominação de ether é chamada de <b>wei</b>, portanto, esse é o valor especificado ao enviar transações.

1 ether = 1000000000000000000 wei

1 wei = 0,000000000000000001 ether

</div>

Tente converter alguns valores de e para wei. Note que [existem nomes para muitas das denominações](https://web3py.readthedocs.io/en/stable/examples.html#converting-currency-denominations) entre ether e wei. Um dos mais conhecidos entre eles é o **gwei**, já que é frequentemente como as taxas de transação são representadas.

```python
In [2]: Web3.toWei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.fromWei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Outros métodos utilitários no módulo Web3 incluem conversores de formato de dados (por exemplo, [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), os métodos para gerar endereços (por exemplo, [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)) e funções hash (por exemplo, [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Muitos deles serão cobertos mais tarde pela série. Para ver todos os métodos e propriedades disponíveis, utilize o autopreenchimento do IPython, digitando `Web3` e pressionando a tecla tab duas vezes após o ponto.

## Se comunicar com a cadeia {#talk-to-the-chain}

Os métodos práticos são convenientes, mas vamos passar à blockchain. O próximo passo é configurar o Web3.py para se comunicar com um nó Ethereum. Aqui temos a opção de usar os provedores IPC, HTTPS ou Websocket.

Não vamos nos adentrar nesse tema, mas um exemplo de um fluxo de trabalho completo usando o provedor HTTP pode parecer algo assim:

- Baixe um nó Ethereum, por exemplo, [Geth](https://geth.ethereum.org/).
- Inicie o Geth em uma janela de terminal e aguarde a sincronização da rede. A porta HTTP padrão é `8545`, mas é configurável.
- Peça ao Web3.py para se conectar ao nó via HTTP, no `localhost:8545`. `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Use a instância `w3` para interagir com o nó.

Embora esta seja uma maneira "real" de fazer isso, o processo de sincronização leva horas e é desnecessário se você só quer um ambiente de desenvolvimento. A Web3.py expõe um quarto provedor para esse propósito, o **EthereumTesterProvider**. Este provedor de teste se vincula a um nó Ethereum simulado com autorizações abrangentes e moeda falsa para utilizar.

![Um diagrama mostrando o EthereumTesterProvider que vincula o seu aplicativo web3.py a um nó simulado de Ethereum](./ethereumtesterprovider.png)

_O EthereumTesterProvider conecta-se a um nó simulado e é útil para ambientes de desenvolvimento rápido._

O nó simulado é chamado [eth-tester](https://github.com/ethereum/eth-tester) e o instalamos como parte do `pip install web3[tester]`. Configurar o Web3.py para usar este provedor de teste é tão simples como:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Agora você está pronto para navegar pela cadeia! Isso não é algo que as pessoas falam. É algo que eu acabei de inventar. Façamos um tour rápido.

## O tour rápido {#the-quick-tour}

Primeiro, uma verificação:

```python
In [5]: w3.isConnected()
Out[5]: True
```

Já que estamos utilizando o provedor de teste, esse não é um teste muito importante, mas se ele falhar, você provavelmente digitou algo errado ao instanciar a variável `w3`. Verifique se você incluiu os parênteses internos, ou seja, `Web3.EthereumTesterProvider()`.

## Parada n.º 1 do tour: [contas](/developers/docs/accounts/) {#tour-stop-1-accounts}

Por conveniência, o provedor de teste criou algumas contas e as pré-carregou com o ether.

Primeiro, vamos ver uma lista dessas contas:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Se você executar esse comando, você deverá ver uma lista de dez strings que começam com `0x`. Cada um é um **endereço público** e é, em alguns aspectos, análogo ao número da conta em uma conta corrente. Você forneceria este endereço a alguém que quisesse mandar ether para você.

Como mencionado, o provedor de teste pré-carregou cada uma dessas contas com algum ether. Vamos descobrir quanto há na primeira conta:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

São muitos zeros! Antes de você ir rindo até o banco falso, lembre-se daquela lição anterior sobre denominações de moeda. Os valores de ether são representados na menor denominação, wei. Converta para ether:

```python
In [8]: w3.fromWei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Um milhão de ether de teste — nada mal.

## Parada n.º 2 do tour: dados do bloco {#tour-stop-2-block-data}

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

Sãp fornecidas muitas informações sobre um bloco, mas há apenas alguns pontos para salientar aqui:

- O número de bloco é zero — não importa quanto tempo você configurou o provedor de teste. Ao contrário da rede Ethereum real, que minera um novo bloco aproximadamente a cada 15 segundos, essa simulação esperará até que você a instrua a fazer alguma coisa.
- `transactions` é uma lista vazia, pelo mesmo motivo: ainda não fizemos nada. Este primeiro bloco é um **bloco vazio**, apenas para iniciar a cadeia.
- Observe que o `parentHash` é apenas um monte de bytes vazios. Isso significa que ele é o primeiro bloco da cadeia, também conhecido como **bloco de início**.

## Parada n.º 2 do tour: [transações](/developers/docs/transactions/) {#tour-stop-3-transactions}

Estamos presos no bloco zero até que haja uma transação para minerar, então vamos começar. Envie um teste com ether de uma conta para outra:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.toWei(3, 'ether'),
   'gas': 21000
})
```

Normalmente, esse é o ponto em que você espera que sua transação seja minerada em um novo bloco. O processo completo envolve algo como isto:

1. Envie uma transação e espere pelo hash da transação. A transação fica "pendente" até que seja minerada. `tx_hash = w3.eth.send_transaction({ … })`
2. Aguarde a mineração da transação: `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Continue a lógica do aplicativo. Para visualizar a transação bem-sucedida: `w3.eth.get_transaction(tx_hash)`

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

You’ll see some familiar details here: the `from`, `to`, and `value` fields should match the inputs of our `send_transaction` call. A outra parte tranquilizadora é que esta transação foi incluída como a primeira transação (`'transactionIndex': 0`) dentro do bloco número 1.

Também podemos ver facilmente o sucesso dessa transação, verificando o saldo das duas contas envolvidas. Três ether deveriam ter sido enviados de uma conta para outra.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999999999999969000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

O último parece bem! O saldo foi de 1.000.000 a 1.000.003 ether. Mas o que aconteceu com a primeira conta? Parece ter perdido um pouco mais de três ether. Infelizmente, nada na vida é gratuito, e o uso da rede pública Ethereum requer que você compense os seus pares pelo papel de apoio deles. A small transaction fee was deducted from the account making the transaction to the tune of 31000 wei.

<div class="featured">Observação: na rede pública, as taxas de transação são variáveis baseadas na demanda da rede e na rapidez com que você gostaria que uma transação fosse processada. Se você estiver interessado em ver como as taxas são calculadas, veja minha publicação anterior sobre <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">como transações são incluídas em um bloco</a>.</div>

## Agora uma pausa {#and-breathe}

Já estamos nisso por um tempo, então este parece um lugar tão bom quanto qualquer um para fazer uma pausa. A descoberta continua, e vamos continuar com a parte dois desta série. Alguns conceitos que surgem: conectar a um nó real, contratos inteligentes e tokens. Tem perguntas adicionais? Queremos saber! Seu feedback influenciará o caminho a seguir. Suas perguntas são bem-vindas no [Twitter](https://twitter.com/wolovim).
