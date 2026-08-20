---
title: Whitepaper do Ethereum
description: Um artigo introdutório ao Ethereum, publicado em 2013 antes do seu lançamento.
lang: pt-br
sidebarDepth: 2
hideEditButton: true
authors: ["Vitalik Buterin"]
---

<WhitepaperBridge />

_Embora tenha vários anos, mantemos o artigo original abaixo porque ele continua a servir como uma referência útil e uma representação precisa do [Ethereum](/) e de sua visão._

## Uma Plataforma de Contratos Inteligentes e Aplicativos Descentralizados de Próxima Geração {#a-next-generation-smart-contract-and-decentralized-application-platform}

O desenvolvimento do Bitcoin por Satoshi Nakamoto em 2009 tem sido frequentemente aclamado como um avanço radical no dinheiro e na moeda, sendo o primeiro exemplo de um ativo digital que simultaneamente não tem lastro ou "[valor intrínseco](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)" e nenhum emissor ou controlador centralizado. No entanto, outra parte, indiscutivelmente mais importante, do experimento do Bitcoin é a tecnologia blockchain subjacente como uma ferramenta de consenso distribuído, e a atenção está rapidamente começando a se voltar para esse outro aspecto do Bitcoin. Aplicações alternativas comumente citadas da tecnologia blockchain incluem o uso de ativos digitais na blockchain para representar moedas personalizadas e instrumentos financeiros ("[colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), a propriedade de um dispositivo físico subjacente ("[propriedade inteligente](https://en.bitcoin.it/wiki/Smart_Property)"), ativos não fungíveis, como nomes de domínio ("[Namecoin](http://namecoin.org)"), bem como aplicações mais complexas envolvendo ter ativos digitais sendo controlados diretamente por um pedaço de código implementando regras arbitrárias ("[contratos inteligentes](https://nakamotoinstitute.org/smart-contracts/)") ou até mesmo "[organizações autônomas descentralizadas](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAOs) baseadas em blockchain. O que o Ethereum pretende fornecer é uma blockchain com uma linguagem de programação Turing completa totalmente desenvolvida e integrada, que pode ser usada para criar "contratos" que podem ser usados para codificar funções arbitrárias de transição de estado, permitindo que os usuários criem qualquer um dos sistemas descritos acima, bem como muitos outros que ainda não imaginamos, simplesmente escrevendo a lógica em algumas linhas de código.

## Introdução ao Bitcoin e Conceitos Existentes {#introduction-to-bitcoin-and-existing-concepts}

### História {#history}

O conceito de moeda digital descentralizada, bem como aplicativos alternativos como registros de propriedades, existe há décadas. Os protocolos anônimos de e-cash das décadas de 1980 e 1990, dependentes em grande parte de uma primitiva criptográfica conhecida como assinatura cega de Chaum (Chaumian blinding), forneciam uma moeda com um alto grau de privacidade, mas os protocolos falharam em ganhar tração devido à sua dependência de um intermediário centralizado. Em 1998, o [b-money](https://nakamotoinstitute.org/b-money/) de Wei Dai tornou-se a primeira proposta a introduzir a ideia de criar dinheiro através da resolução de quebra-cabeças computacionais, bem como de consenso descentralizado, mas a proposta era escassa em detalhes sobre como o consenso descentralizado poderia realmente ser implementado. Em 2005, Hal Finney introduziu o conceito de "[provas de trabalho reutilizáveis](https://nakamotoinstitute.org/finney/rpow/)", um sistema que usa ideias do b-money juntamente com os quebra-cabeças Hashcash computacionalmente difíceis de Adam Back para criar um conceito para uma criptomoeda, mas mais uma vez ficou aquém do ideal ao depender de computação confiável como backend. Em 2009, uma moeda descentralizada foi implementada na prática pela primeira vez por Satoshi Nakamoto, combinando primitivas estabelecidas para gerenciar a propriedade através de criptografia de chave pública com um algoritmo de consenso para rastrear quem possui as moedas, conhecido como "Prova de Trabalho (PoW)".

O mecanismo por trás da Prova de Trabalho (PoW) foi um avanço no espaço porque resolveu simultaneamente dois problemas. Primeiro, forneceu um algoritmo de consenso simples e moderadamente eficaz, permitindo que os nós da rede concordassem coletivamente sobre um conjunto de atualizações canônicas para o estado do livro-razão do Bitcoin. Segundo, forneceu um mecanismo para permitir a entrada livre no processo de consenso, resolvendo o problema político de decidir quem pode influenciar o consenso, ao mesmo tempo em que previne ataques Sybil. Ele faz isso substituindo uma barreira formal à participação, como a exigência de ser registrado como uma entidade única em uma lista específica, por uma barreira econômica - o peso de um único nó no processo de votação de consenso é diretamente proporcional ao poder de computação que o nó traz. Desde então, uma abordagem alternativa foi proposta chamada _Prova de Participação (PoS)_, calculando o peso de um nó como sendo proporcional às suas posses de moeda e não aos recursos computacionais; a discussão dos méritos relativos das duas abordagens está além do escopo deste artigo, mas deve-se notar que ambas as abordagens podem ser usadas para servir como a espinha dorsal de uma criptomoeda.

### Bitcoin Como Um Sistema de Transição de Estado {#bitcoin-as-a-state-transition-system}

![Ethereum state transition](./ethereum-state-transition.png)

Do ponto de vista técnico, o livro-razão de uma criptomoeda como o Bitcoin pode ser pensado como um sistema de transição de estado, onde há um "estado" que consiste no status de propriedade de todos os bitcoins existentes e uma "função de transição de estado" que pega um estado e uma transação e produz um novo estado que é o resultado. Em um sistema bancário padrão, por exemplo, o estado é um balanço patrimonial, uma transação é uma solicitação para mover $X de A para B, e a função de transição de estado reduz o valor na conta de A em $X e aumenta o valor na conta de B em $X. Se a conta de A tiver menos de $X em primeiro lugar, a função de transição de estado retorna um erro. Portanto, pode-se definir formalmente:

```
APPLY(S,TX) -> S' or ERROR
```

No sistema bancário definido acima:

```js
APPLY({ Alice: $50, Bob: $50 },"send $20 from Alice to Bob") = { Alice: $30, Bob: $70 }
```

Mas:

```js
APPLY({ Alice: $50, Bob: $50 },"send $70 from Alice to Bob") = ERROR
```

O "estado" no Bitcoin é a coleção de todas as moedas (tecnicamente, "saídas de transações não gastas" ou UTXO) que foram cunhadas e ainda não gastas, com cada UTXO tendo uma denominação e um proprietário (definido por um endereço de 20 bytes que é essencialmente uma chave pública criptográfica<sup>[fn1](#notes)</sup>). Uma transação contém uma ou mais entradas, com cada entrada contendo uma referência a um UTXO existente e uma assinatura criptográfica produzida pela chave privada associada ao endereço do proprietário, e uma ou mais saídas, com cada saída contendo um novo UTXO a ser adicionado ao estado.

A função de transição de estado `APPLY(S,TX) -> S'` pode ser definida aproximadamente da seguinte forma:

<ol>
  <li>
    Para cada entrada em <code>TX</code>:
    <ul>
    <li>
        Se o UTXO referenciado não estiver em <code>S</code>, retorne um erro.
    </li>
    <li>
        Se a assinatura fornecida não corresponder ao proprietário do UTXO, retorne um erro.
    </li>
    </ul>
  </li>
  <li>
    Se a soma das denominações de todos os UTXOs de entrada for menor que a soma das denominações de todos os UTXOs de saída, retorne um erro.
  </li>
  <li>
    Retorne <code>S</code> com todos os UTXOs de entrada removidos e todos os UTXOs de saída adicionados.
  </li>
</ol>

A primeira metade do primeiro passo impede que os remetentes de transações gastem moedas que não existem, a segunda metade do primeiro passo impede que os remetentes de transações gastem as moedas de outras pessoas, e o segundo passo impõe a conservação de valor. Para usar isso para pagamento, o protocolo é o seguinte. Suponha que Alice queira enviar 11,7 BTC para Bob. Primeiro, Alice procurará um conjunto de UTXOs disponíveis que ela possui e que totalize pelo menos 11,7 BTC. Realisticamente, Alice não conseguirá obter exatamente 11,7 BTC; digamos que o menor valor que ela consiga obter seja 6+4+2=12. Ela então cria uma transação com essas três entradas e duas saídas. A primeira saída será de 11,7 BTC com o endereço de Bob como seu proprietário, e a segunda saída será o "troco" restante de 0,3 BTC, com a proprietária sendo a própria Alice.

### Mineração {#mining}

![Ethereum blocks](./ethereum-blocks.png)

Se tivéssemos acesso a um serviço centralizado confiável, este sistema seria trivial de implementar; ele poderia simplesmente ser codificado exatamente como descrito, usando o disco rígido de um servidor centralizado para rastrear o estado. No entanto, com o Bitcoin, estamos tentando construir um sistema de moeda descentralizada, então precisaremos combinar o sistema de transição de estado com um sistema de consenso para garantir que todos concordem com a ordem das transações. O processo de consenso descentralizado do Bitcoin exige que os nós da rede tentem continuamente produzir pacotes de transações chamados "blocos". A rede destina-se a produzir aproximadamente um bloco a cada dez minutos, com cada bloco contendo um carimbo de data/hora, um nonce, uma referência (ou seja, hash) ao bloco anterior e uma lista de todas as transações que ocorreram desde o bloco anterior. Com o tempo, isso cria uma "blockchain" persistente e em constante crescimento que se atualiza constantemente para representar o estado mais recente do livro-razão do Bitcoin.

O algoritmo para verificar se um bloco é válido, expresso neste paradigma, é o seguinte:

1. Verifique se o bloco anterior referenciado pelo bloco existe e é válido.
2. Verifique se o carimbo de data/hora do bloco é maior que o do bloco anterior<sup>[fn2](#notes)</sup> e menos de 2 horas no futuro.
3. Verifique se a Prova de Trabalho (PoW) no bloco é válida.
4. Seja `S[0]` o estado no final do bloco anterior.
5. Suponha que `TX` seja a lista de transações do bloco com `n` transações. Para todo `i` em `0...n-1`, defina `S[i+1] = APPLY(S[i],TX[i])` Se qualquer aplicação retornar um erro, saia e retorne falso.
6. Retorne verdadeiro e registre `S[n]` como o estado no final deste bloco.

Essencialmente, cada transação no bloco deve fornecer uma transição de estado válida do que era o estado canônico antes da transação ser executada para algum novo estado. Note que o estado não é codificado no bloco de forma alguma; é puramente uma abstração a ser lembrada pelo nó validador e só pode ser computada (com segurança) para qualquer bloco começando do estado gênesis e aplicando sequencialmente cada transação em cada bloco. Além disso, note que a ordem na qual o minerador inclui as transações no bloco é importante; se houver duas transações A e B em um bloco de tal forma que B gaste um UTXO criado por A, então o bloco será válido se A vier antes de B, mas não o contrário.

A única condição de validade presente na lista acima que não é encontrada em outros sistemas é a exigência de "Prova de Trabalho (PoW)". A condição precisa é que o hash duplo SHA-256 de cada bloco, tratado como um número de 256 bits, deve ser menor que um alvo ajustado dinamicamente, que no momento em que este texto foi escrito é de aproximadamente 2<sup>187</sup>. O objetivo disso é tornar a criação de blocos computacionalmente "difícil", impedindo assim que invasores Sybil refaçam toda a blockchain a seu favor. Como o SHA-256 foi projetado para ser uma função pseudoaleatória completamente imprevisível, a única maneira de criar um bloco válido é simplesmente por tentativa e erro, incrementando repetidamente o nonce e verificando se o novo hash corresponde.

No alvo atual de ~2<sup>187</sup>, a rede deve fazer uma média de ~2<sup>69</sup> tentativas antes que um bloco válido seja encontrado; em geral, o alvo é recalibrado pela rede a cada 2016 blocos para que, em média, um novo bloco seja produzido por algum nó na rede a cada dez minutos. A fim de compensar os mineradores por este trabalho computacional, o minerador de cada bloco tem o direito de incluir uma transação dando a si mesmo 25 BTC do nada. Além disso, se alguma transação tiver uma denominação total maior em suas entradas do que em suas saídas, a diferença também vai para o minerador como uma "taxa de transação". A propósito, este também é o único mecanismo pelo qual os BTC são emitidos; o estado gênesis não continha nenhuma moeda.

Para entender melhor o propósito da mineração, vamos examinar o que acontece no caso de um invasor malicioso. Como a criptografia subjacente do Bitcoin é conhecida por ser segura, o invasor terá como alvo a única parte do sistema Bitcoin que não é protegida diretamente pela criptografia: a ordem das transações. A estratégia do invasor é simples:

1. Enviar 100 BTC a um comerciante em troca de algum produto (de preferência um bem digital de entrega rápida)
2. Aguardar a entrega do produto
3. Produzir outra transação enviando os mesmos 100 BTC para si mesmo
4. Tentar convencer a rede de que a sua transação para si mesmo foi a que ocorreu primeiro.

Uma vez que o passo (1) tenha ocorrido, após alguns minutos algum minerador incluirá a transação em um bloco, digamos o bloco número 270000. Após cerca de uma hora, mais cinco blocos terão sido adicionados à cadeia após esse bloco, com cada um desses blocos apontando indiretamente para a transação e, assim, "confirmando-a". Neste ponto, o comerciante aceitará o pagamento como finalizado e entregará o produto; como estamos assumindo que este é um bem digital, a entrega é instantânea. Agora, o invasor cria outra transação enviando os 100 BTC para si mesmo. Se o invasor simplesmente a lançar na prática, a transação não será processada; os mineradores tentarão executar `APPLY(S,TX)` e notarão que `TX` consome um UTXO que não está mais no estado. Então, em vez disso, o invasor cria uma bifurcação (fork) da blockchain, começando por minerar outra versão do bloco 270000 apontando para o mesmo bloco 269999 como pai, mas com a nova transação no lugar da antiga. Como os dados do bloco são diferentes, isso requer refazer a Prova de Trabalho (PoW). Além disso, a nova versão do bloco 270000 do invasor tem um hash diferente, então os blocos originais 270001 a 270005 não "apontam" para ele; assim, a cadeia original e a nova cadeia do invasor estão completamente separadas. A regra é que, em uma bifurcação, a blockchain mais longa é considerada a verdade, e assim os mineradores legítimos trabalharão na cadeia 270005 enquanto o invasor sozinho está trabalhando na cadeia 270000. Para que o invasor torne sua blockchain a mais longa, ele precisaria ter mais poder computacional do que o resto da rede combinada para alcançá-la (daí, "ataque de 51%").

### Árvores de Merkle {#merkle-trees}

![SPV in Bitcoin](./spv-bitcoin.png)

_Esquerda: é suficiente apresentar apenas um pequeno número de nós em uma árvore de Merkle para dar uma prova da validade de um ramo._

_Direita: qualquer tentativa de alterar qualquer parte da árvore de Merkle acabará levando a uma inconsistência em algum lugar acima na cadeia._

Um importante recurso de escalabilidade do Bitcoin é que o bloco é armazenado em uma estrutura de dados de vários níveis. O "hash" de um bloco é, na verdade, apenas o hash do cabeçalho do bloco, um pedaço de dados de aproximadamente 200 bytes que contém o carimbo de data/hora, o nonce, o hash do bloco anterior e o hash raiz de uma estrutura de dados chamada árvore de Merkle que armazena todas as transações no bloco. Uma árvore de Merkle é um tipo de árvore binária, composta por um conjunto de nós com um grande número de nós folha na parte inferior da árvore contendo os dados subjacentes, um conjunto de nós intermediários onde cada nó é o hash de seus dois filhos e, finalmente, um único nó raiz, também formado a partir do hash de seus dois filhos, representando o "topo" da árvore. O objetivo da árvore de Merkle é permitir que os dados em um bloco sejam entregues de forma fragmentada: um nó pode baixar apenas o cabeçalho de um bloco de uma fonte, a pequena parte da árvore relevante para ele de outra fonte, e ainda ter a certeza de que todos os dados estão corretos. A razão pela qual isso funciona é que os hashes se propagam para cima: se um usuário malicioso tentar trocar uma transação falsa na parte inferior de uma árvore de Merkle, essa alteração causará uma alteração no nó acima e, em seguida, uma alteração no nó acima desse, finalmente alterando a raiz da árvore e, portanto, o hash do bloco, fazendo com que o protocolo o registre como um bloco completamente diferente (quase certamente com uma Prova de Trabalho (PoW) inválida).

O protocolo da árvore de Merkle é indiscutivelmente essencial para a sustentabilidade a longo prazo. Um "nó completo" na rede Bitcoin, aquele que armazena e processa a totalidade de cada bloco, ocupa cerca de 15 GB de espaço em disco na rede Bitcoin em abril de 2014, e está crescendo mais de um gigabyte por mês. Atualmente, isso é viável para alguns computadores desktop e não para telefones, e mais tarde no futuro apenas empresas e entusiastas poderão participar. Um protocolo conhecido como "verificação de pagamento simplificada" (SPV) permite que exista outra classe de nós, chamados "nós leves", que baixam os cabeçalhos dos blocos, verificam a Prova de Trabalho (PoW) nos cabeçalhos dos blocos e, em seguida, baixam apenas os "ramos" associados às transações que são relevantes para eles. Isso permite que os nós leves determinem com uma forte garantia de segurança qual é o status de qualquer transação Bitcoin, e seu saldo atual, enquanto baixam apenas uma porção muito pequena de toda a blockchain.

### Aplicativos Alternativos de Blockchain {#alternative-blockchain-applications}

A ideia de pegar a ideia subjacente da blockchain e aplicá-la a outros conceitos também tem uma longa história. Em 2005, Nick Szabo surgiu com o conceito de "[títulos de propriedade seguros com autoridade do proprietário](https://nakamotoinstitute.org/library/secure-property-titles/)", um documento descrevendo como "novos avanços na tecnologia de banco de dados replicado" permitirão um sistema baseado em blockchain para armazenar um registro de quem possui qual terra, criando uma estrutura elaborada incluindo conceitos como apropriação original (homesteading), usucapião e imposto sobre a terra georgiano. No entanto, infelizmente não havia nenhum sistema de banco de dados replicado eficaz disponível na época, e assim o protocolo nunca foi implementado na prática. Após 2009, no entanto, uma vez que o consenso descentralizado do Bitcoin foi desenvolvido, uma série de aplicativos alternativos começou a surgir rapidamente.

- **Namecoin** - criado em 2010, o [Namecoin](https://namecoin.org/) é melhor descrito como um banco de dados de registro de nomes descentralizado. Em protocolos descentralizados como Tor, Bitcoin e BitMessage, precisa haver alguma maneira de identificar contas para que outras pessoas possam interagir com elas, mas em todas as soluções existentes o único tipo de identificador disponível é um hash pseudoaleatório como `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Idealmente, gostaríamos de poder ter uma conta com um nome como "george". No entanto, o problema é que se uma pessoa pode criar uma conta chamada "george", então outra pessoa pode usar o mesmo processo para registrar "george" para si mesma também e se passar por ela. A única solução é um paradigma de primeiro a registrar (first-to-file), onde o primeiro registrador tem sucesso e o segundo falha - um problema perfeitamente adequado para o protocolo de consenso do Bitcoin. O Namecoin é a implementação mais antiga e bem-sucedida de um sistema de registro de nomes usando tal ideia.
- **Colored coins** - o propósito das [colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) é servir como um protocolo para permitir que as pessoas criem suas próprias moedas digitais - ou, no importante caso trivial de uma moeda com uma unidade, tokens digitais, na blockchain do Bitcoin. No protocolo de colored coins, "emite-se" uma nova moeda atribuindo publicamente uma cor a um UTXO específico do Bitcoin, e o protocolo define recursivamente a cor de outros UTXOs para ser a mesma que a cor das entradas que a transação que os criou gastou (algumas regras especiais se aplicam no caso de entradas de cores mistas). Isso permite que os usuários mantenham carteiras contendo apenas UTXOs de uma cor específica e os enviem de forma muito semelhante aos bitcoins regulares, retrocedendo através da blockchain para determinar a cor de qualquer UTXO que recebam.
- **Metacoins** - a ideia por trás de uma metacoin é ter um protocolo que vive em cima do Bitcoin, usando transações Bitcoin para armazenar transações metacoin, mas tendo uma função de transição de estado diferente, `APPLY'`. Como o protocolo metacoin não pode impedir que transações metacoin inválidas apareçam na blockchain do Bitcoin, uma regra é adicionada de que se `APPLY'(S,TX)` retornar um erro, o protocolo assume o padrão `APPLY'(S,TX) = S`. Isso fornece um mecanismo fácil para criar um protocolo de criptomoeda arbitrário, potencialmente com recursos avançados que não podem ser implementados dentro do próprio Bitcoin, mas com um custo de desenvolvimento muito baixo, uma vez que as complexidades de mineração e rede já são tratadas pelo protocolo Bitcoin. As metacoins têm sido usadas para implementar algumas classes de contratos financeiros, registro de nomes e corretoras descentralizadas.

Assim, em geral, existem duas abordagens para construir um protocolo de consenso: construir uma rede independente e construir um protocolo em cima do Bitcoin. A primeira abordagem, embora razoavelmente bem-sucedida no caso de aplicativos como o Namecoin, é difícil de implementar; cada implementação individual precisa inicializar uma blockchain independente, bem como construir e testar todo o código de transição de estado e de rede necessário. Além disso, prevemos que o conjunto de aplicativos para a tecnologia de consenso descentralizado seguirá uma distribuição de lei de potência onde a grande maioria dos aplicativos seria muito pequena para justificar sua própria blockchain, e notamos que existem grandes classes de aplicativos descentralizados (dapps), particularmente organizações autônomas descentralizadas, que precisam interagir umas com as outras.

A abordagem baseada no Bitcoin, por outro lado, tem a falha de não herdar os recursos de verificação de pagamento simplificada do Bitcoin. O SPV funciona para o Bitcoin porque pode usar a profundidade da blockchain como um proxy para a validade; em algum momento, uma vez que os ancestrais de uma transação retrocedem o suficiente, é seguro dizer que eles eram legitimamente parte do estado. Os metaprotocolos baseados em blockchain, por outro lado, não podem forçar a blockchain a não incluir transações que não são válidas dentro do contexto de seus próprios protocolos. Portanto, uma implementação de metaprotocolo SPV totalmente segura precisaria fazer uma varredura retroativa até o início da blockchain do Bitcoin para determinar se certas transações são válidas ou não. Atualmente, todas as implementações "leves" de metaprotocolos baseados em Bitcoin dependem de um servidor confiável para fornecer os dados, indiscutivelmente um resultado altamente subótimo, especialmente quando um dos propósitos principais de uma criptomoeda é eliminar a necessidade de confiança.

### Scripting {#scripting}

Mesmo sem nenhuma extensão, o protocolo Bitcoin na verdade facilita uma versão fraca de um conceito de "contratos inteligentes". Os UTXOs no Bitcoin podem ser de propriedade não apenas de uma chave pública, mas também de um script mais complicado expresso em uma linguagem de programação simples baseada em pilha. Neste paradigma, uma transação que gasta esse UTXO deve fornecer dados que satisfaçam o script. De fato, até mesmo o mecanismo básico de propriedade de chave pública é implementado por meio de um script: o script recebe uma assinatura de curva elíptica como entrada, verifica-a em relação à transação e ao endereço que possui o UTXO, e retorna 1 se a verificação for bem-sucedida e 0 caso contrário. Outros scripts mais complicados existem para vários casos de uso adicionais. Por exemplo, pode-se construir um script que exija assinaturas de duas de três chaves privadas fornecidas para validar ("multisig"), uma configuração útil para contas corporativas, contas de poupança seguras e algumas situações de garantia (escrow) de comerciantes. Os scripts também podem ser usados para pagar recompensas por soluções para problemas computacionais, e pode-se até construir um script que diga algo como "este UTXO do Bitcoin é seu se você puder fornecer uma prova SPV de que enviou uma transação Dogecoin desta denominação para mim", permitindo essencialmente a troca descentralizada entre criptomoedas.

No entanto, a linguagem de script conforme implementada no Bitcoin tem várias limitações importantes:

- **Falta de completude de Turing** - ou seja, embora haja um grande subconjunto de computação que a linguagem de script do Bitcoin suporta, ela não suporta quase tudo. A principal categoria que está faltando são os loops. Isso é feito para evitar loops infinitos durante a verificação da transação; teoricamente, é um obstáculo superável para programadores de script, já que qualquer loop pode ser simulado simplesmente repetindo o código subjacente muitas vezes com uma instrução if, mas isso leva a scripts que são muito ineficientes em termos de espaço. Por exemplo, implementar um algoritmo alternativo de assinatura de curva elíptica provavelmente exigiria 256 rodadas de multiplicação repetidas, todas incluídas individualmente no código.
- **Cegueira de valor (Value-blindness)** - não há como um script UTXO fornecer controle refinado sobre o valor que pode ser sacado. Por exemplo, um caso de uso poderoso de um contrato de oráculo seria um contrato de hedge, onde A e B colocam US$ 1.000 em BTC e, após 30 dias, o script envia US$ 1.000 em BTC para A e o restante para B. Isso exigiria um oráculo para determinar o valor de 1 BTC em USD, mas mesmo assim é uma melhoria massiva em termos de confiança e exigência de infraestrutura em relação às soluções totalmente centralizadas que estão disponíveis agora. No entanto, como os UTXOs são tudo ou nada, a única maneira de conseguir isso é através da gambiarra (hack) muito ineficiente de ter muitos UTXOs de denominações variadas (por exemplo, um UTXO de 2<sup>k</sup> para cada k até 30) e fazer com que o oráculo escolha qual UTXO enviar para A e qual para B.
- **Falta de estado** - os UTXOs podem ser gastos ou não gastos; não há oportunidade para contratos de vários estágios ou scripts que mantenham qualquer outro estado interno além disso. Isso torna difícil fazer contratos de opções de vários estágios, ofertas de corretoras descentralizadas ou protocolos de compromisso criptográfico de dois estágios (necessários para recompensas computacionais seguras). Isso também significa que os UTXOs só podem ser usados para construir contratos simples e pontuais e não contratos "com estado" mais complexos, como organizações descentralizadas, e torna os metaprotocolos difíceis de implementar. O estado binário combinado com a cegueira de valor também significa que outro aplicativo importante, os limites de saque, é impossível.
- **Cegueira de blockchain (Blockchain-blindness)** - os UTXOs são cegos para dados da blockchain, como o nonce, o carimbo de data/hora e o hash do bloco anterior. Isso limita severamente os aplicativos em jogos de azar e várias outras categorias, privando a linguagem de script de uma fonte potencialmente valiosa de aleatoriedade.

Assim, vemos três abordagens para construir aplicativos avançados em cima de criptomoedas: construir uma nova blockchain, usar scripts em cima do Bitcoin e construir um metaprotocolo em cima do Bitcoin. Construir uma nova blockchain permite liberdade ilimitada na construção de um conjunto de recursos, mas ao custo de tempo de desenvolvimento, esforço de inicialização e segurança. O uso de scripts é fácil de implementar e padronizar, mas é muito limitado em suas capacidades, e os metaprotocolos, embora fáceis, sofrem de falhas de escalabilidade. Com o Ethereum, pretendemos construir uma estrutura alternativa que forneça ganhos ainda maiores na facilidade de desenvolvimento, bem como propriedades de cliente leve ainda mais fortes, ao mesmo tempo em que permite que os aplicativos compartilhem um ambiente econômico e a segurança da blockchain.

## Ethereum {#ethereum}

A intenção do Ethereum é criar um protocolo alternativo para a construção de aplicativos descentralizados (dapps), fornecendo um conjunto diferente de compensações que acreditamos ser muito útil para uma grande classe de aplicativos descentralizados, com ênfase particular em situações onde o tempo de desenvolvimento rápido, a segurança para aplicativos pequenos e raramente usados, e a capacidade de diferentes aplicativos interagirem de forma muito eficiente, são importantes. O Ethereum faz isso construindo o que é essencialmente a camada fundamental abstrata definitiva: uma blockchain com uma linguagem de programação Turing completa integrada, permitindo que qualquer pessoa escreva contratos inteligentes e aplicativos descentralizados onde podem criar suas próprias regras arbitrárias para propriedade, formatos de transação e funções de transição de estado. Uma versão básica da Namecoin pode ser escrita em duas linhas de código, e outros protocolos como moedas e sistemas de reputação podem ser construídos em menos de vinte. Contratos inteligentes, "caixas" criptográficas que contêm valor e só o desbloqueiam se certas condições forem atendidas, também podem ser construídos sobre a plataforma, com muito mais poder do que o oferecido pelos scripts do Bitcoin devido aos poderes adicionais de completude de Turing, percepção de valor, percepção de blockchain e estado.

### Contas no Ethereum {#ethereum-accounts}

No Ethereum, o estado é composto por objetos chamados "contas", com cada conta tendo um endereço de 20 bytes e as transições de estado sendo transferências diretas de valor e informação entre contas. Uma conta no Ethereum contém quatro campos:

- O **nonce**, um contador usado para garantir que cada transação só possa ser processada uma vez
- O **saldo em ether** atual da conta
- O **código do contrato** da conta, se presente
- O **armazenamento** da conta (vazio por padrão)

"Ether" é o principal criptocombustível interno do Ethereum e é usado para pagar taxas de transação. Em geral, existem dois tipos de contas: **contas de propriedade externa**, controladas por chaves privadas, e **contas de contrato**, controladas pelo seu código de contrato. Uma conta de propriedade externa não tem código, e é possível enviar mensagens de uma conta de propriedade externa criando e assinando uma transação; em uma conta de contrato, toda vez que a conta de contrato recebe uma mensagem, seu código é ativado, permitindo que ela leia e grave no armazenamento interno e envie outras mensagens ou crie contratos por sua vez.

Observe que os "contratos" no Ethereum não devem ser vistos como algo que deve ser "cumprido" ou "obedecido"; em vez disso, eles são mais como "agentes autônomos" que vivem dentro do ambiente de execução do Ethereum, sempre executando um pedaço específico de código quando "cutucados" por uma mensagem ou transação, e tendo controle direto sobre seu próprio saldo em ether e seu próprio armazenamento de chave/valor para acompanhar variáveis persistentes.

### Mensagens e Transações {#messages-and-transactions}

O termo "transação" é usado no Ethereum para se referir ao pacote de dados assinado que armazena uma mensagem a ser enviada de uma conta de propriedade externa. As transações contêm:

- O destinatário da mensagem
- Uma assinatura identificando o remetente
- A quantidade de ether a ser transferida do remetente para o destinatário
- Um campo de dados opcional
- Um valor `STARTGAS`, representando o número máximo de etapas computacionais que a execução da transação tem permissão para realizar
- Um valor `GASPRICE`, representando a taxa que o remetente paga por etapa computacional

Os três primeiros são campos padrão esperados em qualquer criptomoeda. O campo de dados não tem função por padrão, mas a máquina virtual tem um código de operação usando o qual um contrato pode acessar os dados; como um caso de uso de exemplo, se um contrato estiver funcionando como um serviço de registro de domínio na blockchain, ele pode desejar interpretar os dados passados a ele como contendo dois "campos", sendo o primeiro campo um domínio a ser registrado e o segundo campo o endereço IP no qual registrá-lo. O contrato leria esses valores dos dados da mensagem e os colocaria apropriadamente no armazenamento.

Os campos `STARTGAS` e `GASPRICE` são cruciais para o modelo de negação de serviço do Ethereum. A fim de evitar loops infinitos acidentais ou hostis ou outro desperdício computacional no código, cada transação é obrigada a definir um limite de quantas etapas computacionais de execução de código ela pode usar. A unidade fundamental de computação é o "gas"; geralmente, uma etapa computacional custa 1 gas, mas algumas operações custam quantidades maiores de gas porque são computacionalmente mais caras ou aumentam a quantidade de dados que devem ser armazenados como parte do estado. Há também uma taxa de 5 gas para cada byte nos dados da transação. A intenção do sistema de taxas é exigir que um invasor pague proporcionalmente por cada recurso que consome, incluindo computação, largura de banda e armazenamento; portanto, qualquer transação que leve a rede a consumir uma quantidade maior de qualquer um desses recursos deve ter uma taxa de gas aproximadamente proporcional ao incremento.

### Mensagens {#messages}

Os contratos têm a capacidade de enviar "mensagens" para outros contratos. As mensagens são objetos virtuais que nunca são serializados e existem apenas no ambiente de execução do Ethereum. Uma mensagem contém:

- O remetente da mensagem (implícito)
- O destinatário da mensagem
- A quantidade de ether a ser transferida junto com a mensagem
- Um campo de dados opcional
- Um valor `STARTGAS`

Essencialmente, uma mensagem é como uma transação, exceto que é produzida por um contrato e não por um ator externo. Uma mensagem é produzida quando um contrato que está executando código no momento executa o código de operação `CALL`, que produz e executa uma mensagem. Como uma transação, uma mensagem leva a conta destinatária a executar seu código. Assim, os contratos podem ter relacionamentos com outros contratos exatamente da mesma forma que os atores externos podem.

Observe que a permissão de gas atribuída por uma transação ou contrato se aplica ao gas total consumido por essa transação e todas as subexecuções. Por exemplo, se um ator externo A envia uma transação para B com 1000 gas, e B consome 600 gas antes de enviar uma mensagem para C, e a execução interna de C consome 300 gas antes de retornar, então B pode gastar mais 100 gas antes de ficar sem gas.

### Função de Transição de Estado do Ethereum {#ethereum-state-transition-function}

![Ether state transition](./ether-state-transition.png)

A função de transição de estado do Ethereum, `APPLY(S,TX) -> S'`, pode ser definida da seguinte forma:

1. Verifique se a transação está bem formada (ou seja, tem o número certo de valores), se a assinatura é válida e se o nonce corresponde ao nonce na conta do remetente. Se não, retorne um erro.
2. Calcule a taxa de transação como `STARTGAS * GASPRICE` e determine o endereço de envio a partir da assinatura. Subtraia a taxa do saldo da conta do remetente e incremente o nonce do remetente. Se não houver saldo suficiente para gastar, retorne um erro.
3. Inicialize `GAS = STARTGAS` e retire uma certa quantidade de gas por byte para pagar pelos bytes na transação.
4. Transfira o valor da transação da conta do remetente para a conta receptora. Se a conta receptora ainda não existir, crie-a. Se a conta receptora for um contrato, execute o código do contrato até a conclusão ou até que a execução fique sem gas.
5. Se a transferência de valor falhar porque o remetente não tinha dinheiro suficiente, ou a execução do código ficar sem gas, reverta todas as alterações de estado, exceto o pagamento das taxas, e adicione as taxas à conta do minerador.
6. Caso contrário, reembolse as taxas de todo o gas restante ao remetente e envie as taxas pagas pelo gas consumido ao minerador.

Por exemplo, suponha que o código do contrato seja:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Observe que, na realidade, o código do contrato é escrito no código EVM de baixo nível; este exemplo é escrito em Serpent, uma de nossas linguagens de alto nível, por clareza, e pode ser compilado para código EVM. Suponha que o armazenamento do contrato comece vazio e uma transação seja enviada com valor de 10 ether, 2000 gas, preço de gas de 0,001 ether e 64 bytes de dados, com os bytes 0-31 representando o número `2` e os bytes 32-63 representando a string `CHARLIE`<sup>[fn3](#notes)</sup>. O processo para a função de transição de estado neste caso é o seguinte:

1. Verifique se a transação é válida e bem formada.
2. Verifique se o remetente da transação tem pelo menos 2000 \* 0,001 = 2 ether. Se tiver, subtraia 2 ether da conta do remetente.
3. Inicialize gas = 2000; assumindo que a transação tem 170 bytes de comprimento e a taxa por byte é 5, subtraia 850 para que restem 1150 gas.
4. Subtraia mais 10 ether da conta do remetente e adicione-os à conta do contrato.
5. Execute o código. Neste caso, isso é simples: ele verifica se o armazenamento do contrato no índice `2` é usado, percebe que não é, e então define o armazenamento no índice `2` para o valor `CHARLIE`. Suponha que isso leve 187 gas, então a quantidade restante de gas é 1150 - 187 = 963
6. Adicione 963 \* 0,001 = 0,963 ether de volta à conta do remetente e retorne o estado resultante.

Se não houvesse contrato na extremidade receptora da transação, a taxa de transação total seria simplesmente igual ao `GASPRICE` fornecido multiplicado pelo comprimento da transação em bytes, e os dados enviados junto com a transação seriam irrelevantes.

Observe que as mensagens funcionam de forma equivalente às transações em termos de reversões: se a execução de uma mensagem ficar sem gas, a execução dessa mensagem e todas as outras execuções acionadas por essa execução serão revertidas, mas as execuções pai não precisam reverter. Isso significa que é "seguro" para um contrato chamar outro contrato, pois se A chamar B com G gas, a execução de A tem a garantia de perder no máximo G gas. Por fim, observe que há um código de operação, `CREATE`, que cria um contrato; sua mecânica de execução é geralmente semelhante a `CALL`, com a exceção de que a saída da execução determina o código de um contrato recém-criado.

### Execução de Código {#code-execution}

O código nos contratos do Ethereum é escrito em uma linguagem de bytecode baseada em pilha de baixo nível, chamada de "código da máquina virtual Ethereum" ou "código EVM". O código consiste em uma série de bytes, onde cada byte representa uma operação. Em geral, a execução do código é um loop infinito que consiste em realizar repetidamente a operação no contador de programa atual (que começa em zero) e, em seguida, incrementar o contador de programa em um, até que o final do código seja alcançado ou um erro ou instrução `STOP` ou `RETURN` seja detectado. As operações têm acesso a três tipos de espaço nos quais armazenar dados:

- A **pilha** (stack), um contêiner do tipo último a entrar, primeiro a sair (LIFO), no qual os valores podem ser inseridos (pushed) e retirados (popped)
- A **memória**, uma matriz de bytes infinitamente expansível
- O **armazenamento** de longo prazo do contrato, um armazenamento de chave/valor. Ao contrário da pilha e da memória, que são redefinidas após o término da computação, o armazenamento persiste a longo prazo.

O código também pode acessar o valor, o remetente e os dados da mensagem recebida, bem como os dados do cabeçalho do bloco, e o código também pode retornar uma matriz de bytes de dados como saída.

O modelo de execução formal do código EVM é surpreendentemente simples. Enquanto a máquina virtual Ethereum está em execução, seu estado computacional completo pode ser definido pela tupla `(block_state, transaction, message, code, memory, stack, pc, gas)`, onde `block_state` é o estado global contendo todas as contas e inclui saldos e armazenamento. No início de cada rodada de execução, a instrução atual é encontrada pegando o `pc`º byte de `code` (ou 0 se `pc >= len(code)`), e cada instrução tem sua própria definição em termos de como afeta a tupla. Por exemplo, `ADD` retira dois itens da pilha e insere a soma deles, reduz `gas` em 1 e incrementa `pc` em 1, e `SSTORE` retira os dois itens do topo da pilha e insere o segundo item no armazenamento do contrato no índice especificado pelo primeiro item. Embora existam muitas maneiras de otimizar a execução da máquina virtual Ethereum por meio da compilação just-in-time, uma implementação básica do Ethereum pode ser feita em algumas centenas de linhas de código.

### Blockchain e Mineração {#blockchain-and-mining}

![Ethereum apply block diagram](./ethereum-apply-block-diagram.png)

A blockchain do Ethereum é, de muitas maneiras, semelhante à blockchain do Bitcoin, embora tenha algumas diferenças. A principal diferença entre o Ethereum e o Bitcoin em relação à arquitetura da blockchain é que, ao contrário do Bitcoin, os blocos do Ethereum contêm uma cópia tanto da lista de transações quanto do estado mais recente. Além disso, dois outros valores, o número do bloco e a dificuldade, também são armazenados no bloco. O algoritmo básico de validação de bloco no Ethereum é o seguinte:

1. Verifique se o bloco anterior referenciado existe e é válido.
2. Verifique se o carimbo de data/hora do bloco é maior que o do bloco anterior referenciado e menor que 15 minutos no futuro
3. Verifique se o número do bloco, a dificuldade, a raiz da transação, a raiz de tios (uncle root) e o limite de gas (vários conceitos de baixo nível específicos do Ethereum) são válidos.
4. Verifique se a Prova de Trabalho (PoW) no bloco é válida.
5. Seja `S[0]` o estado no final do bloco anterior.
6. Seja `TX` a lista de transações do bloco, com `n` transações. Para todo `i` em `0...n-1`, defina `S[i+1] = APPLY(S[i],TX[i])`. Se algum aplicativo retornar um erro, ou se o gas total consumido no bloco até este ponto exceder o `GASLIMIT`, retorne um erro.
7. Seja `S_FINAL` igual a `S[n]`, mas adicionando a recompensa de bloco paga ao minerador.
8. Verifique se a raiz da árvore de Merkle do estado `S_FINAL` é igual à raiz do estado final fornecida no cabeçalho do bloco. Se for, o bloco é válido; caso contrário, não é válido.

A abordagem pode parecer altamente ineficiente à primeira vista, porque precisa armazenar todo o estado com cada bloco, mas na realidade a eficiência deve ser comparável à do Bitcoin. O motivo é que o estado é armazenado na estrutura de árvore e, após cada bloco, apenas uma pequena parte da árvore precisa ser alterada. Assim, em geral, entre dois blocos adjacentes, a grande maioria da árvore deve ser a mesma e, portanto, os dados podem ser armazenados uma vez e referenciados duas vezes usando ponteiros (ou seja, hashes de subárvores). Um tipo especial de árvore conhecido como "árvore Patricia" é usado para realizar isso, incluindo uma modificação no conceito de árvore de Merkle que permite que os nós sejam inseridos e excluídos, e não apenas alterados, de forma eficiente. Além disso, como todas as informações de estado fazem parte do último bloco, não há necessidade de armazenar todo o histórico da blockchain - uma estratégia que, se pudesse ser aplicada ao Bitcoin, pode ser calculada para fornecer uma economia de espaço de 5 a 20 vezes.

Uma pergunta comum é "onde" o código do contrato é executado, em termos de hardware físico. Isso tem uma resposta simples: o processo de execução do código do contrato faz parte da definição da função de transição de estado, que faz parte do algoritmo de validação de bloco, portanto, se uma transação for adicionada ao bloco `B`, a execução do código gerada por essa transação será executada por todos os nós, agora e no futuro, que baixarem e validarem o bloco `B`.

## Aplicações {#applications}

Em geral, existem três tipos de aplicações no topo do Ethereum. A primeira categoria são as aplicações financeiras, que fornecem aos usuários maneiras mais poderosas de gerenciar e firmar contratos usando seu dinheiro. Isso inclui submoedas, derivativos financeiros, contratos de hedge, carteiras de poupança, testamentos e, em última análise, até mesmo algumas classes de contratos de trabalho em grande escala. A segunda categoria são as aplicações semifinanceiras, onde o dinheiro está envolvido, mas também há um forte lado não monetário no que está sendo feito; um exemplo perfeito são as recompensas autoexecutáveis para soluções de problemas computacionais. Por fim, existem aplicações como votação online e governança descentralizada que não são financeiras de forma alguma.

### Sistemas de Tokens {#token-systems}

Sistemas de tokens na blockchain têm muitas aplicações, variando de submoedas que representam ativos como USD ou ouro a ações de empresas, tokens individuais representando propriedade inteligente, cupons seguros e infalsificáveis, e até mesmo sistemas de tokens sem nenhum vínculo com o valor convencional, usados como sistemas de pontos para incentivo. Sistemas de tokens são surpreendentemente fáceis de implementar no Ethereum. O ponto principal a entender é que tudo o que uma moeda, ou sistema de tokens, fundamentalmente é, é um banco de dados com uma operação: subtrair X unidades de A e dar X unidades a B, com a condição de que (i) A tinha pelo menos X unidades antes da transação e (2) a transação é aprovada por A. Tudo o que é necessário para implementar um sistema de tokens é implementar essa lógica em um contrato.

O código básico para implementar um sistema de tokens em Serpent é o seguinte:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Esta é essencialmente uma implementação literal da função de transição de estado do "sistema bancário" descrita mais acima neste documento. Algumas linhas extras de código precisam ser adicionadas para fornecer a etapa inicial de distribuição das unidades de moeda em primeiro lugar e alguns outros casos extremos, e idealmente uma função seria adicionada para permitir que outros contratos consultem o saldo de um endereço. Mas isso é tudo. Teoricamente, os sistemas de tokens baseados no Ethereum atuando como submoedas podem potencialmente incluir outro recurso importante que as metamoedas onchain baseadas no Bitcoin não possuem: a capacidade de pagar taxas de transação diretamente nessa moeda. A maneira como isso seria implementado é que o contrato manteria um saldo em ether com o qual reembolsaria o ether usado para pagar taxas ao remetente, e reabasteceria esse saldo coletando as unidades de moeda interna que recebe em taxas e revendendo-as em um leilão contínuo. Os usuários, portanto, precisariam "ativar" suas contas com ether, mas uma vez que o ether estivesse lá, ele seria reutilizável porque o contrato o reembolsaria a cada vez.

### Derivativos financeiros e Moedas de Valor Estável {#financial-derivatives-and-stable-value-currencies}

Os derivativos financeiros são a aplicação mais comum de um "contrato inteligente" e uma das mais simples de implementar em código. O principal desafio na implementação de contratos financeiros é que a maioria deles exige referência a um ticker de preço externo; por exemplo, uma aplicação muito desejável é um contrato inteligente que faz hedge contra a volatilidade do ether (ou outra criptomoeda) em relação ao dólar americano, mas fazer isso exige que o contrato saiba qual é o valor do ETH/USD. A maneira mais simples de fazer isso é por meio de um contrato de "feed de dados" mantido por uma parte específica (por exemplo, NASDAQ) projetado para que essa parte tenha a capacidade de atualizar o contrato conforme necessário, e fornecendo uma interface que permite que outros contratos enviem uma mensagem para esse contrato e recebam uma resposta que fornece o preço.

Dado esse ingrediente crítico, o contrato de hedge seria o seguinte:

1. Aguardar que a parte A insira 1000 ether.
2. Aguardar que a parte B insira 1000 ether.
3. Registrar o valor em USD de 1000 ether, calculado consultando o contrato de feed de dados, no armazenamento, digamos que seja $x.
4. Após 30 dias, permitir que A ou B "reativem" o contrato para enviar o equivalente a $x em ether (calculado consultando o contrato de feed de dados novamente para obter o novo preço) para A e o restante para B.

Tal contrato teria um potencial significativo no criptocomércio. Um dos principais problemas citados sobre a criptomoeda é o fato de ser volátil; embora muitos usuários e comerciantes possam querer a segurança e a conveniência de lidar com ativos criptográficos, eles podem não desejar enfrentar a perspectiva de perder 23% do valor de seus fundos em um único dia. Até agora, a solução mais comumente proposta tem sido ativos lastreados por emissores; a ideia é que um emissor crie uma submoeda na qual ele tenha o direito de emitir e revogar unidades, e forneça uma unidade da moeda a qualquer pessoa que lhe forneça (offline) uma unidade de um ativo subjacente especificado (por exemplo, ouro, USD). O emissor então promete fornecer uma unidade do ativo subjacente a qualquer pessoa que devolva uma unidade do criptoativo. Esse mecanismo permite que qualquer ativo não criptográfico seja "elevado" a um ativo criptográfico, desde que o emissor seja confiável.

Na prática, no entanto, os emissores nem sempre são confiáveis e, em alguns casos, a infraestrutura bancária é muito fraca, ou muito hostil, para que tais serviços existam. Os derivativos financeiros fornecem uma alternativa. Aqui, em vez de um único emissor fornecer os fundos para lastrear um ativo, um mercado descentralizado de especuladores, apostando que o preço de um ativo de referência criptográfico (por exemplo, ETH) subirá, desempenha esse papel. Ao contrário dos emissores, os especuladores não têm a opção de não cumprir sua parte no acordo porque o contrato de hedge mantém seus fundos em garantia (escrow). Observe que essa abordagem não é totalmente descentralizada, porque uma fonte confiável ainda é necessária para fornecer o ticker de preço, embora possivelmente ainda seja uma melhoria enorme em termos de redução dos requisitos de infraestrutura (ao contrário de ser um emissor, emitir um feed de preços não requer licenças e provavelmente pode ser categorizado como liberdade de expressão) e redução do potencial de fraude.

### Sistemas de Identidade e Reputação {#identity-and-reputation-systems}

A primeira criptomoeda alternativa de todas, a [Namecoin](http://namecoin.org/), tentou usar uma blockchain semelhante à do Bitcoin para fornecer um sistema de registro de nomes, onde os usuários podem registrar seus nomes em um banco de dados público junto com outros dados. O principal caso de uso citado é para um sistema [DNS](https://wikipedia.org/wiki/Domain_Name_System), mapeando nomes de domínio como "bitcoin.org" (ou, no caso da Namecoin, "bitcoin.bit") para um endereço IP. Outros casos de uso incluem autenticação de e-mail e sistemas de reputação potencialmente mais avançados. Aqui está o contrato básico para fornecer um sistema de registro de nomes semelhante ao da Namecoin no Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

O contrato é muito simples; tudo o que ele é, é um banco de dados dentro da rede Ethereum que pode receber adições, mas não pode ser modificado ou ter dados removidos. Qualquer pessoa pode registrar um nome com algum valor, e esse registro então permanece para sempre. Um contrato de registro de nomes mais sofisticado também terá uma "cláusula de função" permitindo que outros contratos o consultem, bem como um mecanismo para o "proprietário" (ou seja, o primeiro a registrar) de um nome alterar os dados ou transferir a propriedade. Pode-se até adicionar funcionalidades de reputação e rede de confiança (web-of-trust) por cima.

### Armazenamento Descentralizado de Arquivos {#decentralized-file-storage}

Nos últimos anos, surgiram várias startups populares de armazenamento de arquivos online, sendo a mais proeminente o Dropbox, buscando permitir que os usuários façam upload de um backup de seu disco rígido e que o serviço armazene o backup e permita que o usuário o acesse em troca de uma taxa mensal. No entanto, neste ponto, o mercado de armazenamento de arquivos é às vezes relativamente ineficiente; uma rápida olhada em várias soluções existentes mostra que, particularmente no nível do "vale da estranheza" (uncanny valley) de 20-200 GB, no qual nem as cotas gratuitas nem os descontos de nível corporativo entram em vigor, os preços mensais para os custos de armazenamento de arquivos convencionais são tais que você está pagando por mais do que o custo de todo o disco rígido em um único mês. Os contratos do Ethereum podem permitir o desenvolvimento de um ecossistema de armazenamento descentralizado de arquivos, onde usuários individuais podem ganhar pequenas quantias de dinheiro alugando seus próprios discos rígidos e o espaço não utilizado pode ser usado para reduzir ainda mais os custos de armazenamento de arquivos.

A peça fundamental de tal dispositivo seria o que chamamos de "contrato do Dropbox descentralizado". Este contrato funciona da seguinte forma. Primeiro, divide-se os dados desejados em blocos, criptografando cada bloco para privacidade, e constrói-se uma árvore de Merkle a partir deles. Em seguida, faz-se um contrato com a regra de que, a cada N blocos, o contrato escolheria um índice aleatório na árvore de Merkle (usando o hash do bloco anterior, acessível a partir do código do contrato, como fonte de aleatoriedade), e daria X ether à primeira entidade a fornecer uma transação com uma prova de propriedade do bloco semelhante à verificação de pagamento simplificada naquele índice específico na árvore. Quando um usuário deseja baixar novamente seu arquivo, ele pode usar um protocolo de canal de micropagamento (por exemplo, pagar 1 szabo por 32 kilobytes) para recuperar o arquivo; a abordagem mais eficiente em termos de taxas é que o pagador não publique a transação até o final, substituindo a transação por uma um pouco mais lucrativa com o mesmo nonce após cada 32 kilobytes.

Uma característica importante do protocolo é que, embora possa parecer que se está confiando em muitos nós aleatórios para não decidirem esquecer o arquivo, pode-se reduzir esse risco a quase zero dividindo o arquivo em muitas partes por meio de compartilhamento de segredos (secret sharing), e observando os contratos para ver se cada parte ainda está na posse de algum nó. Se um contrato ainda está pagando dinheiro, isso fornece uma prova criptográfica de que alguém por aí ainda está armazenando o arquivo.

### Organizações Autônomas Descentralizadas {#decentralized-autonomous-organizations}

O conceito geral de uma "organização autônoma descentralizada" é o de uma entidade virtual que tem um certo conjunto de membros ou acionistas que, talvez com uma maioria de 67%, têm o direito de gastar os fundos da entidade e modificar seu código. Os membros decidiriam coletivamente sobre como a organização deve alocar seus fundos. Os métodos para alocar os fundos de uma DAO podem variar de recompensas, salários a mecanismos ainda mais exóticos, como uma moeda interna para recompensar o trabalho. Isso essencialmente replica a estrutura legal de uma empresa tradicional ou organização sem fins lucrativos, mas usando apenas a tecnologia de blockchain criptográfica para aplicação. Até agora, grande parte das conversas sobre DAOs tem girado em torno do modelo "capitalista" de uma "corporação autônoma descentralizada" (DAC) com acionistas que recebem dividendos e ações negociáveis; uma alternativa, talvez descrita como uma "comunidade autônoma descentralizada", faria com que todos os membros tivessem uma participação igual na tomada de decisões e exigiria que 67% dos membros existentes concordassem em adicionar ou remover um membro. A exigência de que uma pessoa só possa ter uma associação precisaria então ser aplicada coletivamente pelo grupo.

Um esboço geral de como codificar uma DAO é o seguinte. O design mais simples é apenas um pedaço de código automodificável que muda se dois terços dos membros concordarem com uma mudança. Embora o código seja teoricamente imutável, pode-se facilmente contornar isso e ter mutabilidade de fato, tendo pedaços do código em contratos separados e tendo o endereço de quais contratos chamar armazenado no armazenamento modificável. Em uma implementação simples de tal contrato de DAO, haveria três tipos de transação, distinguidos pelos dados fornecidos na transação:

- `[0,i,K,V]` para registrar uma proposta com índice `i` para alterar o endereço no índice de armazenamento `K` para o valor `V`
- `[1,i]` para registrar um voto a favor da proposta `i`
- `[2,i]` para finalizar a proposta `i` se votos suficientes tiverem sido feitos

O contrato então teria cláusulas para cada um deles. Ele manteria um registro de todas as alterações de armazenamento abertas, juntamente com uma lista de quem votou nelas. Ele também teria uma lista de todos os membros. Quando qualquer alteração de armazenamento atinge dois terços dos membros votando a favor, uma transação de finalização poderia executar a alteração. Um esqueleto mais sofisticado também teria capacidade de votação integrada para recursos como enviar uma transação, adicionar membros e remover membros, e pode até prever a delegação de votos no estilo [Democracia Líquida](https://wikipedia.org/wiki/Liquid_democracy) (ou seja, qualquer pessoa pode designar alguém para votar por ela, e a atribuição é transitiva, portanto, se A designa B e B designa C, então C determina o voto de A). Esse design permitiria que a DAO crescesse organicamente como uma comunidade descentralizada, permitindo que as pessoas eventualmente delegassem a tarefa de filtrar quem é um membro para especialistas, embora, ao contrário do "sistema atual", os especialistas possam facilmente surgir e desaparecer ao longo do tempo à medida que os membros individuais da comunidade mudam seus alinhamentos.

Um modelo alternativo é para uma corporação descentralizada, onde qualquer conta pode ter zero ou mais ações, e dois terços das ações são necessários para tomar uma decisão. Um esqueleto completo envolveria funcionalidade de gerenciamento de ativos, a capacidade de fazer uma oferta para comprar ou vender ações e a capacidade de aceitar ofertas (de preferência com um mecanismo de correspondência de ordens dentro do contrato). A delegação também existiria no estilo Democracia Líquida, generalizando o conceito de um "conselho de administração".

### Outras Aplicações {#further-applications}

**1. Carteiras de poupança**. Suponha que Alice queira manter seus fundos seguros, mas esteja preocupada em perder ou que alguém hackeie sua chave privada. Ela coloca ether em um contrato com Bob, um banco, da seguinte forma:

- Somente Alice pode sacar no máximo 1% dos fundos por dia.
- Somente Bob pode sacar no máximo 1% dos fundos por dia, mas Alice tem a capacidade de fazer uma transação com sua chave desativando essa capacidade.
- Alice e Bob juntos podem sacar qualquer quantia.

Normalmente, 1% ao dia é suficiente para Alice, e se Alice quiser sacar mais, ela pode entrar em contato com Bob para obter ajuda. Se a chave de Alice for hackeada, ela corre para Bob para mover os fundos para um novo contrato. Se ela perder sua chave, Bob retirará os fundos eventualmente. Se Bob se revelar malicioso, ela pode desativar a capacidade dele de sacar.

**2. Seguro agrícola**. Pode-se facilmente fazer um contrato de derivativos financeiros, mas usando um feed de dados do clima em vez de qualquer índice de preços. Se um fazendeiro em Iowa comprar um derivativo que paga inversamente com base na precipitação em Iowa, então, se houver uma seca, o fazendeiro receberá dinheiro automaticamente e, se houver chuva suficiente, o fazendeiro ficará feliz porque suas colheitas irão bem. Isso pode ser expandido para seguros contra desastres naturais em geral.

**3. Um feed de dados descentralizado**. Para contratos financeiros por diferença, pode ser realmente possível descentralizar o feed de dados por meio de um protocolo chamado "[SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed)". A SchellingCoin basicamente funciona da seguinte forma: N partes colocam no sistema o valor de um determinado dado (por exemplo, o preço ETH/USD), os valores são classificados e todos entre o 25º e o 75º percentil recebem um token como recompensa. Todos têm o incentivo de fornecer a resposta que todos os outros fornecerão, e o único valor com o qual um grande número de jogadores pode concordar de forma realista é o padrão óbvio: a verdade. Isso cria um protocolo descentralizado que pode teoricamente fornecer qualquer número de valores, incluindo o preço ETH/USD, a temperatura em Berlim ou até mesmo o resultado de um cálculo difícil específico.

**4. Escrow inteligente multisig**. O Bitcoin permite contratos de transação com múltiplas assinaturas onde, por exemplo, três de cinco chaves fornecidas podem gastar os fundos. O Ethereum permite mais granularidade; por exemplo, quatro de cinco podem gastar tudo, três de cinco podem gastar até 10% por dia e dois de cinco podem gastar até 0,5% por dia. Além disso, a multisig do Ethereum é assíncrona - duas partes podem registrar suas assinaturas na blockchain em momentos diferentes e a última assinatura enviará automaticamente a transação.

**5. Computação em nuvem**. A tecnologia EVM também pode ser usada para criar um ambiente de computação verificável, permitindo que os usuários peçam a outros para realizar cálculos e, em seguida, opcionalmente, peçam provas de que os cálculos em determinados pontos de verificação selecionados aleatoriamente foram feitos corretamente. Isso permite a criação de um mercado de computação em nuvem onde qualquer usuário pode participar com seu desktop, laptop ou servidor especializado, e verificações pontuais juntamente com depósitos de segurança podem ser usados para garantir que o sistema seja confiável (ou seja, os nós não podem trapacear de forma lucrativa). Embora tal sistema possa não ser adequado para todas as tarefas; tarefas que exigem um alto nível de comunicação entre processos, por exemplo, não podem ser feitas facilmente em uma grande nuvem de nós. Outras tarefas, no entanto, são muito mais fáceis de paralelizar; projetos como SETI@home, folding@home e algoritmos genéticos podem ser facilmente implementados no topo de tal plataforma.

**6. Jogos de azar ponto a ponto**. Qualquer número de protocolos de jogos de azar ponto a ponto, como o [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) de Frank Stajano e Richard Clayton, pode ser implementado na blockchain do Ethereum. O protocolo de jogo mais simples é, na verdade, simplesmente um contrato por diferença no próximo hash do bloco, e protocolos mais avançados podem ser construídos a partir daí, criando serviços de jogos de azar com taxas quase nulas que não têm capacidade de trapacear.

**7. Mercados de previsão**. Fornecido um oráculo ou SchellingCoin, os mercados de previsão também são fáceis de implementar, e os mercados de previsão juntamente com a SchellingCoin podem provar ser a primeira aplicação convencional da [futarquia](https://mason.gmu.edu/~rhanson/futarchy.html) como um protocolo de governança para organizações descentralizadas.

**8. Mercados descentralizados onchain**, usando o sistema de identidade e reputação como base.

## Miscelânea e Preocupações {#miscellanea-and-concerns}

### Implementação GHOST Modificada {#modified-ghost-implementation}

O protocolo "Greedy Heaviest Observed Subtree" (GHOST) é uma inovação introduzida pela primeira vez por Yonatan Sompolinsky e Aviv Zohar em [dezembro de 2013](https://eprint.iacr.org/2013/881.pdf). A motivação por trás do GHOST é que as blockchains com tempos de confirmação rápidos sofrem atualmente de segurança reduzida devido a uma alta taxa de blocos obsoletos (stale rate) - como os blocos levam um certo tempo para se propagar pela rede, se o minerador A minera um bloco e, em seguida, o minerador B minera outro bloco antes que o bloco do minerador A se propague para B, o bloco do minerador B acabará sendo desperdiçado e não contribuirá para a segurança da rede. Além disso, há um problema de centralização: se o minerador A for um pool de mineração com 30% de poder de hash e B tiver 10% de poder de hash, A terá o risco de produzir um bloco obsoleto 70% do tempo (já que nos outros 30% do tempo A produziu o último bloco e, portanto, obterá os dados de mineração imediatamente), enquanto B terá o risco de produzir um bloco obsoleto 90% do tempo. Assim, se o intervalo de blocos for curto o suficiente para que a taxa de blocos obsoletos seja alta, A será substancialmente mais eficiente simplesmente em virtude de seu tamanho. Com esses dois efeitos combinados, as blockchains que produzem blocos rapidamente têm grande probabilidade de levar um pool de mineração a ter uma porcentagem grande o suficiente do poder de hash da rede para ter controle de fato sobre o processo de mineração.

Conforme descrito por Sompolinsky e Zohar, o GHOST resolve o primeiro problema de perda de segurança da rede incluindo blocos obsoletos no cálculo de qual cadeia é a "mais longa"; ou seja, não apenas o pai e os ancestrais mais distantes de um bloco, mas também os descendentes obsoletos do ancestral do bloco (no jargão do Ethereum, "tios" ou "uncles") são adicionados ao cálculo de qual bloco tem a maior Prova de Trabalho (PoW) total o apoiando. Para resolver o segundo problema de viés de centralização, vamos além do protocolo descrito por Sompolinsky e Zohar e também fornecemos recompensas de bloco para os blocos obsoletos: um bloco obsoleto recebe 87,5% de sua recompensa base, e o sobrinho que inclui o bloco obsoleto recebe os 12,5% restantes. As taxas de transação, no entanto, não são concedidas aos tios.

O Ethereum implementa uma versão simplificada do GHOST que desce apenas sete níveis. Especificamente, é definido da seguinte forma:

- Um bloco deve especificar um pai e deve especificar 0 ou mais tios
- Um tio incluído no bloco B deve ter as seguintes propriedades:
  - Deve ser um filho direto do ancestral de k-ésima geração de B, onde `2 <= k <= 7`.
  - Não pode ser um ancestral de B
  - Um tio deve ser um cabeçalho do bloco válido, mas não precisa ser um bloco previamente verificado ou mesmo válido
  - Um tio deve ser diferente de todos os tios incluídos em blocos anteriores e de todos os outros tios incluídos no mesmo bloco (não inclusão dupla)
- Para cada tio U no bloco B, o minerador de B recebe um adicional de 3,125% adicionado à sua recompensa coinbase e o minerador de U recebe 93,75% de uma recompensa coinbase padrão.

Esta versão limitada do GHOST, com tios que podem ser incluídos apenas até 7 gerações, foi usada por dois motivos. Primeiro, o GHOST ilimitado incluiria muitas complicações no cálculo de quais tios para um determinado bloco são válidos. Segundo, o GHOST ilimitado com compensação, conforme usado no Ethereum, remove o incentivo para um minerador minerar na cadeia principal e não na cadeia de um invasor público.

### Taxas {#fees}

Como cada transação publicada na blockchain impõe à rede o custo de precisar baixá-la e verificá-la, há a necessidade de algum mecanismo regulatório, normalmente envolvendo taxas de transação, para evitar abusos. A abordagem padrão, usada no Bitcoin, é ter taxas puramente voluntárias, contando com os mineradores para atuar como guardiões e definir mínimos dinâmicos. Essa abordagem foi recebida de forma muito favorável na comunidade do Bitcoin, principalmente porque é "baseada no mercado", permitindo que a oferta e a demanda entre mineradores e remetentes de transações determinem o preço. O problema com essa linha de raciocínio é, no entanto, que o processamento de transações não é um mercado; embora seja intuitivamente atraente interpretar o processamento de transações como um serviço que o minerador está oferecendo ao remetente, na realidade, cada transação que um minerador inclui precisará ser processada por cada nó na rede, de modo que a grande maioria do custo do processamento de transações é arcada por terceiros e não pelo minerador que está tomando a decisão de incluí-la ou não. Portanto, é muito provável que ocorram problemas de tragédia dos comuns.

No entanto, como se constata, essa falha no mecanismo baseado no mercado, quando dada uma suposição simplificadora imprecisa específica, magicamente se anula. O argumento é o seguinte. Suponha que:

1. Uma transação leva a `k` operações, oferecendo a recompensa `kR` a qualquer minerador que a inclua, onde `R` é definido pelo remetente e `k` e `R` são (aproximadamente) visíveis para o minerador de antemão.
2. Uma operação tem um custo de processamento de `C` para qualquer nó (ou seja, todos os nós têm eficiência igual)
3. Existem `N` nós de mineração, cada um com poder de processamento exatamente igual (ou seja, `1/N` do total)
4. Não existem nós completos não mineradores.

Um minerador estaria disposto a processar uma transação se a recompensa esperada for maior que o custo. Assim, a recompensa esperada é `kR/N`, já que o minerador tem uma chance de `1/N` de processar o próximo bloco, e o custo de processamento para o minerador é simplesmente `kC`. Portanto, os mineradores incluirão transações onde `kR/N > kC`, ou `R > NC`. Observe que `R` é a taxa por operação fornecida pelo remetente e, portanto, é um limite inferior para o benefício que o remetente deriva da transação, e `NC` é o custo para toda a rede em conjunto de processar uma operação. Portanto, os mineradores têm o incentivo de incluir apenas as transações para as quais o benefício utilitário total excede o custo.

No entanto, existem vários desvios importantes dessas suposições na realidade:

1. O minerador paga um custo mais alto para processar a transação do que os outros nós verificadores, já que o tempo extra de verificação atrasa a propagação de bloco e, portanto, aumenta a chance de o bloco se tornar obsoleto.
2. Existem nós completos não mineradores.
3. A distribuição do poder de mineração pode acabar sendo radicalmente desigual na prática.
4. Especuladores, inimigos políticos e loucos cuja função de utilidade inclui causar danos à rede existem, e eles podem configurar contratos de forma inteligente onde seu custo é muito menor do que o custo pago por outros nós verificadores.

(1) fornece uma tendência para o minerador incluir menos transações, e
(2) aumenta `NC`; portanto, esses dois efeitos se anulam pelo menos parcialmente.<sup>[Como?](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/issues/447#issuecomment-316972260#issuecomment-316972260)</sup>
(3) e (4) são o problema principal; para resolvê-los, simplesmente instituímos um limite flutuante: nenhum bloco pode ter mais operações do que
`BLK_LIMIT_FACTOR` vezes a média móvel exponencial de longo prazo.
Especificamente:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` e `EMA_FACTOR` são constantes que serão definidas como 65536 e 1,5 por enquanto, mas provavelmente serão alteradas após análises adicionais.

Há outro fator que desincentiva tamanhos de bloco grandes no Bitcoin: blocos grandes levarão mais tempo para se propagar e, portanto, têm uma probabilidade maior de se tornarem obsoletos. No Ethereum, blocos que consomem muito gas também podem levar mais tempo para se propagar, tanto porque são fisicamente maiores quanto porque levam mais tempo para processar as transições de estado da transação para validar. Esse desincentivo de atraso é uma consideração significativa no Bitcoin, mas menos no Ethereum devido ao protocolo GHOST; portanto, depender de limites de bloco regulamentados fornece uma linha de base mais estável.

### Computação e Completude de Turing {#computation-and-turing-completeness}

Uma observação importante é que a máquina virtual do Ethereum é Turing-completa; isso significa que o código da EVM pode codificar qualquer computação que possa ser concebivelmente realizada, incluindo loops infinitos. O código da EVM permite loops de duas maneiras. Primeiro, há uma instrução `JUMP` que permite que o programa volte para um ponto anterior no código, e uma instrução `JUMPI` para fazer saltos condicionais, permitindo instruções como `while x < 27: x = x * 2`. Segundo, os contratos podem chamar outros contratos, permitindo potencialmente loops por meio de recursão. Isso naturalmente leva a um problema: usuários mal-intencionados podem essencialmente desligar mineradores e nós completos forçando-os a entrar em um loop infinito? A questão surge devido a um problema na ciência da computação conhecido como o problema da parada (halting problem): não há como dizer, no caso geral, se um determinado programa irá parar ou não.

Conforme descrito na seção de transição de estado, nossa solução funciona exigindo que uma transação defina um número máximo de etapas computacionais que ela tem permissão para realizar e, se a execução demorar mais, a computação é revertida, mas as taxas ainda são pagas. As mensagens funcionam da mesma maneira. Para mostrar a motivação por trás de nossa solução, considere os seguintes exemplos:

- Um invasor cria um contrato que executa um loop infinito e, em seguida, envia uma transação ativando esse loop para o minerador. O minerador processará a transação, executando o loop infinito, e esperará que ela fique sem gas. Mesmo que a execução fique sem gas e pare no meio do caminho, a transação ainda é válida e o minerador ainda reivindica a taxa do invasor para cada etapa computacional.
- Um invasor cria um loop infinito muito longo com a intenção de forçar o minerador a continuar computando por tanto tempo que, no momento em que a computação terminar, mais alguns blocos terão saído e não será possível para o minerador incluir a transação para reivindicar a taxa. No entanto, o invasor será obrigado a enviar um valor para `STARTGAS` limitando o número de etapas computacionais que a execução pode realizar, de modo que o minerador saberá com antecedência que a computação levará um número excessivamente grande de etapas.
- Um invasor vê um contrato com código de alguma forma como `send(A,contract.storage[A]); contract.storage[A] = 0` e envia uma transação com gas apenas suficiente para executar a primeira etapa, mas não a segunda (ou seja, fazendo um saque, mas não deixando o saldo diminuir). O autor do contrato não precisa se preocupar em se proteger contra tais ataques, porque se a execução parar no meio do caminho, as alterações serão revertidas.
- Um contrato financeiro funciona obtendo a mediana de nove feeds de preços proprietários para minimizar o risco. Um invasor assume o controle de um dos feeds de dados, que é projetado para ser modificável por meio do mecanismo de chamada de endereço variável descrito na seção sobre DAOs, e o converte para executar um loop infinito, tentando assim forçar qualquer tentativa de reivindicar fundos do contrato financeiro a ficar sem gas. No entanto, o contrato financeiro pode definir um limite de gas na mensagem para evitar esse problema.

A alternativa à completude de Turing é a incompletude de Turing, onde `JUMP` e `JUMPI` não existem e apenas uma cópia de cada contrato tem permissão para existir na pilha de chamadas em um determinado momento. Com esse sistema, o sistema de taxas descrito e as incertezas em torno da eficácia de nossa solução podem não ser necessários, pois o custo de execução de um contrato seria limitado superiormente por seu tamanho. Além disso, a incompletude de Turing nem é uma limitação tão grande; de todos os exemplos de contratos que concebemos internamente, até agora apenas um exigia um loop, e mesmo esse loop poderia ser removido fazendo 26 repetições de um trecho de código de uma linha. Dadas as sérias implicações da completude de Turing e o benefício limitado, por que não ter simplesmente uma linguagem Turing-incompleta? Na realidade, no entanto, a incompletude de Turing está longe de ser uma solução simples para o problema. Para ver o porquê, considere os seguintes contratos:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (run one step of a program and record the change in storage)
```

Agora, envie uma transação para A. Assim, em 51 transações, temos um contrato que ocupa 2<sup>50</sup> etapas computacionais. Os mineradores poderiam tentar detectar tais bombas lógicas com antecedência mantendo um valor ao lado de cada contrato especificando o número máximo de etapas computacionais que ele pode realizar e calculando isso para contratos que chamam outros contratos recursivamente, mas isso exigiria que os mineradores proibissem contratos que criam outros contratos (já que a criação e execução de todos os 26 contratos acima poderiam ser facilmente agrupadas em um único contrato). Outro ponto problemático é que o campo de endereço de uma mensagem é uma variável, portanto, em geral, pode nem ser possível dizer quais outros contratos um determinado contrato chamará com antecedência. Portanto, no geral, temos uma conclusão surpreendente: a completude de Turing é surpreendentemente fácil de gerenciar, e a falta de completude de Turing é igualmente surpreendentemente difícil de gerenciar, a menos que exatamente os mesmos controles estejam em vigor - mas, nesse caso, por que não deixar o protocolo ser Turing-completo?

### Moeda e Emissão {#currency-and-issuance}

A rede Ethereum inclui sua própria moeda integrada, o ether, que serve ao duplo propósito de fornecer uma camada de liquidez primária para permitir a troca eficiente entre vários tipos de ativos digitais e, mais importante, de fornecer um mecanismo para o pagamento de taxas de transação. Por conveniência e para evitar discussões futuras (veja o atual debate mBTC/uBTC/satoshi no Bitcoin), as denominações serão pré-rotuladas:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

Isso deve ser considerado como uma versão expandida do conceito de "dólares" e "centavos" ou "BTC" e "satoshi". No futuro próximo, esperamos que "ether" seja usado para transações comuns, "finney" para microtransações e "szabo" e "wei" para discussões técnicas sobre taxas e implementação de protocolo; as denominações restantes podem se tornar úteis mais tarde e não devem ser incluídas nos clientes neste momento.

O modelo de emissão será o seguinte:

- O ether será lançado em uma venda de moeda ao preço de 1000-2000 ether por BTC, um mecanismo destinado a financiar a organização Ethereum e pagar pelo desenvolvimento que tem sido usado com sucesso por outras plataformas, como Mastercoin e NXT. Os primeiros compradores se beneficiarão de descontos maiores. O BTC recebido da venda será usado inteiramente para pagar salários e recompensas aos desenvolvedores e investido em vários projetos com e sem fins lucrativos no ecossistema do Ethereum e de criptomoedas.
- 0,099x o valor total vendido (60102216 ETH) será alocado à organização para compensar os primeiros colaboradores e pagar despesas denominadas em ETH antes do bloco gênesis.
- 0,099x o valor total vendido será mantido como uma reserva de longo prazo.
- 0,26x o valor total vendido será alocado aos mineradores por ano para sempre a partir desse ponto.

| Grupo | No lançamento | Após 1 ano | Após 5 anos |
| ---------------------- | --------- | ------------ | ------------- |
| Unidades de moeda | 1,198X | 1,458X | 2,498X |
| Compradores | 83,5% | 68,6% | 40,0% |
| Reserva gasta na pré-venda | 8,26% | 6,79% | 3,96% |
| Reserva usada pós-venda | 8,26% | 6,79% | 3,96% |
| Mineradores | 0% | 17,8% | 52,0% |

#### Taxa de Crescimento da Oferta a Longo Prazo (porcentagem) {#long-term-supply-growth-rate-percent}

![Ethereum inflation](./ethereum-inflation.png)

_Apesar da emissão linear de moeda, assim como no Bitcoin, ao longo do tempo a taxa de crescimento da oferta tende a zero._

As duas principais escolhas no modelo acima são (1) a existência e o tamanho de um fundo de doação (endowment pool) e (2) a existência de uma oferta linear em crescimento permanente, em oposição a uma oferta limitada como no Bitcoin. A justificativa do fundo de doação é a seguinte. Se o fundo de doação não existisse e a emissão linear fosse reduzida para 0,217x para fornecer a mesma taxa de inflação, a quantidade total de ether seria 16,5% menor e, portanto, cada unidade seria 19,8% mais valiosa. Portanto, no equilíbrio, 19,8% a mais de ether seria comprado na venda, de modo que cada unidade seria mais uma vez exatamente tão valiosa quanto antes. A organização também teria 1,198x mais BTC, que pode ser considerado dividido em duas fatias: o BTC original e os 0,198x adicionais. Portanto, essa situação é _exatamente equivalente_ à doação, mas com uma diferença importante: a organização detém puramente BTC e, portanto, não é incentivada a apoiar o valor da unidade de ether.

O modelo de crescimento permanente da oferta linear reduz o risco do que alguns veem como concentração excessiva de riqueza no Bitcoin e dá aos indivíduos que vivem nas eras presente e futura uma chance justa de adquirir unidades de moeda, ao mesmo tempo em que mantém um forte incentivo para obter e manter ether porque a "taxa de crescimento da oferta" como porcentagem ainda tende a zero ao longo do tempo. Também teorizamos que, como as moedas são sempre perdidas ao longo do tempo devido a descuido, morte, etc., e a perda de moedas pode ser modelada como uma porcentagem da oferta total por ano, a oferta total de moeda em circulação, de fato, acabará se estabilizando em um valor igual à emissão anual dividida pela taxa de perda (por exemplo, a uma taxa de perda de 1%, uma vez que a oferta atinja 26X, então 0,26X será minerado e 0,26X perdido a cada ano, criando um equilíbrio).

Observe que, no futuro, é provável que o Ethereum mude para um modelo de Prova de Participação (PoS) para segurança, reduzindo o requisito de emissão para algo entre zero e 0,05X por ano. No caso de a organização Ethereum perder financiamento ou por qualquer outro motivo desaparecer, deixamos em aberto um "contrato social": qualquer pessoa tem o direito de criar uma futura versão candidata do Ethereum, com a única condição de que a quantidade de ether deve ser no máximo igual a `60102216 * (1.198 + 0.26 * n)`, onde `n` é o número de anos após o bloco gênesis. Os criadores são livres para vender coletivamente (crowd-sell) ou de outra forma atribuir parte ou toda a diferença entre a expansão da oferta impulsionada por PoS e a expansão máxima permitida da oferta para pagar pelo desenvolvimento. Atualizações candidatas que não cumprem o contrato social podem ser justificadamente bifurcadas (forked) em versões compatíveis.

### Centralização da Mineração {#mining-centralization}

O algoritmo de mineração do Bitcoin funciona fazendo com que os mineradores calculem o SHA-256 em versões ligeiramente modificadas do cabeçalho do bloco milhões de vezes repetidamente, até que eventualmente um nó apresente uma versão cujo hash seja menor que o alvo (atualmente em torno de 2<sup>192</sup>). No entanto, esse algoritmo de mineração é vulnerável a duas formas de centralização. Primeiro, o ecossistema de mineração passou a ser dominado por ASICs (circuitos integrados de aplicação específica), chips de computador projetados para, e portanto milhares de vezes mais eficientes na, tarefa específica de mineração de Bitcoin. Isso significa que a mineração de Bitcoin não é mais uma busca altamente descentralizada e igualitária, exigindo milhões de dólares de capital para participar efetivamente. Segundo, a maioria dos mineradores de Bitcoin não realiza a validação de bloco localmente; em vez disso, eles dependem de um pool de mineração centralizado para fornecer os cabeçalhos dos blocos. Esse problema é indiscutivelmente pior: no momento em que este artigo foi escrito, os três principais pools de mineração controlam indiretamente cerca de 50% do poder de processamento na rede Bitcoin, embora isso seja mitigado pelo fato de que os mineradores podem mudar para outros pools de mineração se um pool ou coalizão tentar um ataque de 51%.

A intenção atual no Ethereum é usar um algoritmo de mineração onde os mineradores são obrigados a buscar dados aleatórios do estado, computar algumas transações selecionadas aleatoriamente dos últimos N blocos na blockchain e retornar o hash do resultado. Isso tem dois benefícios importantes. Primeiro, os contratos do Ethereum podem incluir qualquer tipo de computação, portanto, um ASIC do Ethereum seria essencialmente um ASIC para computação geral - ou seja, uma CPU melhor. Segundo, a mineração exige acesso a toda a blockchain, forçando os mineradores a armazenar toda a blockchain e pelo menos serem capazes de verificar cada transação. Isso remove a necessidade de pools de mineração centralizados; embora os pools de mineração ainda possam servir ao papel legítimo de nivelar a aleatoriedade da distribuição de recompensas, essa função pode ser atendida igualmente bem por pools ponto a ponto sem controle central.

Esse modelo não foi testado e pode haver dificuldades ao longo do caminho para evitar certas otimizações inteligentes ao usar a execução de contrato como um algoritmo de mineração. No entanto, uma característica notavelmente interessante desse algoritmo é que ele permite que qualquer pessoa "envenene o poço", introduzindo um grande número de contratos na blockchain projetados especificamente para impedir certos ASICs. Existem incentivos econômicos para os fabricantes de ASIC usarem esse truque para atacar uns aos outros. Assim, a solução que estamos desenvolvendo é, em última análise, uma solução humana econômica adaptativa, em vez de puramente técnica.

### Escalabilidade {#scalability}

Uma preocupação comum sobre o Ethereum é a questão da escalabilidade. Como o Bitcoin, o Ethereum sofre da falha de que cada transação precisa ser processada por cada nó na rede. Com o Bitcoin, o tamanho da blockchain atual fica em cerca de 15 GB, crescendo cerca de 1 MB por hora. Se a rede Bitcoin fosse processar as 2000 transações por segundo da Visa, ela cresceria 1 MB a cada três segundos (1 GB por hora, 8 TB por ano). É provável que o Ethereum sofra um padrão de crescimento semelhante, agravado pelo fato de que haverá muitos aplicativos no topo da blockchain do Ethereum em vez de apenas uma moeda, como é o caso do Bitcoin, mas amenizado pelo fato de que os nós completos do Ethereum precisam armazenar apenas o estado em vez de todo o histórico da blockchain.

O problema com um tamanho de blockchain tão grande é o risco de centralização. Se o tamanho da blockchain aumentar para, digamos, 100 TB, o cenário provável seria que apenas um número muito pequeno de grandes empresas executaria nós completos, com todos os usuários regulares usando nós SPV leves. Em tal situação, surge a preocupação potencial de que os nós completos possam se unir e todos concordarem em trapacear de alguma forma lucrativa (por exemplo, alterar a recompensa de bloco, dar a si mesmos BTC). Os nós leves não teriam como detectar isso imediatamente. É claro que pelo menos um nó completo honesto provavelmente existiria e, após algumas horas, informações sobre a fraude vazariam por canais como o Reddit, mas nesse ponto seria tarde demais: caberia aos usuários comuns organizar um esforço para colocar os blocos em questão na lista negra, um problema de coordenação massivo e provavelmente inviável em uma escala semelhante à de realizar um ataque de 51% bem-sucedido. No caso do Bitcoin, isso é atualmente um problema, mas existe uma modificação na blockchain [sugerida por Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) que aliviará esse problema.

No curto prazo, o Ethereum usará duas estratégias adicionais para lidar com esse problema. Primeiro, devido aos algoritmos de mineração baseados em blockchain, pelo menos cada minerador será forçado a ser um nó completo, criando um limite inferior no número de nós completos. Segundo e mais importante, no entanto, incluiremos uma raiz de árvore de estado intermediária na blockchain após processar cada transação. Mesmo que a validação de bloco seja centralizada, desde que exista um nó verificador honesto, o problema de centralização pode ser contornado por meio de um protocolo de verificação. Se um minerador publicar um bloco inválido, esse bloco deve estar mal formatado ou o estado `S[n]` está incorreto. Como se sabe que `S[0]` está correto, deve haver algum primeiro estado `S[i]` que está incorreto onde `S[i-1]` está correto. O nó verificador forneceria o índice `i`, juntamente com uma "prova de invalidade" consistindo no subconjunto de nós da árvore Patricia necessários para processar `APPLY(S[i-1],TX[i]) -> S[i]`. Os nós seriam capazes de usar esses nós para executar essa parte da computação e ver que o `S[i]` gerado não corresponde ao `S[i]` fornecido.

Outro ataque mais sofisticado envolveria os mineradores mal-intencionados publicando blocos incompletos, de modo que a informação completa nem sequer existe para determinar se os blocos são válidos ou não. A solução para isso é um protocolo de desafio-resposta: os nós de verificação emitem "desafios" na forma de índices de transação alvo e, ao receber um nó, um nó leve trata o bloco como não confiável até que outro nó, seja o minerador ou outro verificador, forneça um subconjunto de nós Patricia como prova de validade.

## Conclusão {#conclusion}

O protocolo Ethereum foi originalmente concebido como uma versão atualizada de uma criptomoeda, fornecendo recursos avançados, como custódia na blockchain, limites de saque, contratos financeiros, mercados de apostas e afins, por meio de uma linguagem de programação altamente generalizada. O protocolo Ethereum não "suportaria" nenhuma das aplicações diretamente, mas a existência de uma linguagem de programação Turing completa significa que contratos arbitrários podem, teoricamente, ser criados para qualquer tipo de transação ou aplicativo. O que é mais interessante sobre o Ethereum, no entanto, é que o protocolo Ethereum vai muito além de apenas uma moeda. Protocolos em torno de armazenamento descentralizado de arquivos, computação descentralizada e mercados de previsão descentralizados, entre dezenas de outros conceitos semelhantes, têm o potencial de aumentar substancialmente a eficiência da indústria da computação e fornecer um grande impulso a outros protocolos ponto a ponto, adicionando, pela primeira vez, uma camada econômica. Por fim, há também uma gama substancial de aplicativos que não têm absolutamente nada a ver com dinheiro.

O conceito de uma função de transição de estado arbitrária, conforme implementado pelo protocolo Ethereum, oferece uma plataforma com potencial único; em vez de ser um protocolo de escopo fechado e propósito único, destinado a uma gama específica de aplicativos em armazenamento de dados, apostas ou finanças, o Ethereum é aberto por design, e acreditamos que ele é extremamente adequado para servir como uma camada fundamental para um número muito grande de protocolos, tanto financeiros quanto não financeiros, nos próximos anos.

## Notas e Leituras Adicionais {#notes-and-further-reading}

### Notas {#notes}

1. Um leitor experiente pode notar que, de fato, um endereço Bitcoin é o hash da chave pública de curva elíptica, e não a própria chave pública. No entanto, é uma terminologia criptográfica perfeitamente legítima referir-se ao hash da chave pública como a própria chave pública. Isso ocorre porque a criptografia do Bitcoin pode ser considerada um algoritmo de assinatura digital personalizado, onde a chave pública consiste no hash da chave pública ECC, a assinatura consiste na chave pública ECC concatenada com a assinatura ECC, e o algoritmo de verificação envolve checar a chave pública ECC na assinatura contra o hash da chave pública ECC fornecido como uma chave pública e, em seguida, verificar a assinatura ECC contra a chave pública ECC.
2. Tecnicamente, a mediana dos 11 blocos anteriores.
3. Internamente, 2 e "CHARLIE" são ambos números, com o último estando na representação de base 256 big-endian. Os números podem ser no mínimo 0 e no máximo 2<sup>256</sup>-1.

### Leituras Adicionais {#further-reading}

1. [Valor intrínseco](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)
2. [Propriedade inteligente](https://en.bitcoin.it/wiki/Smart_Property)
3. [Contratos inteligentes](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](https://nakamotoinstitute.org/b-money/)
5. [Provas de Trabalho reutilizáveis](https://nakamotoinstitute.org/finney/rpow/)
6. [Títulos de propriedade seguros com autoridade do proprietário](https://nakamotoinstitute.org/library/secure-property-titles/)
7. [Whitepaper do Bitcoin](https://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Triângulo de Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Whitepaper das Colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Whitepaper da Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Corporações autônomas descentralizadas, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Verificação de pagamento simplificada](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Árvores de Merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Árvores Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ e Agentes Autônomos, Jeff Garzik](https://garzikrants.blogspot.com/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn sobre Propriedade Inteligente no Turing Festival](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [RLP do Ethereum](/developers/docs/data-structures-and-encoding/rlp/)
20. [Árvores Merkle Patricia do Ethereum](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
21. [Peter Todd sobre árvores de soma de Merkle](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Para a história do whitepaper, consulte [esta wiki](https://web.archive.org/web/20250427212319/https://ethereum.org/whitepaper/)._

_O Ethereum, como muitos projetos de software de código aberto e voltados para a comunidade, evoluiu desde a sua criação inicial. Para saber mais sobre os desenvolvimentos mais recentes do Ethereum e como as alterações no protocolo são feitas, recomendamos [este guia](/learn/)._