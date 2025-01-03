---
title: Whitepaper sobre o Ethereum
description: Um documento de introdução ao Ethereum, publicado em 2013 antes de seu lançamento.
lang: pt-br
sidebarDepth: 2
hideEditButton: true
---

# Whitepaper do Ethereum {#ethereum-whitepaper}

_Este artigo de introdução foi publicado em 2014 por Vitalik Buterin, o fundador da [Ethereum](/what-is-ethereum/), antes do lançamento do projeto em 2015. Vale a pena notar que o Ethereum, como muitos projetos de software de código aberto impulsionados pela comunidade, evoluiu desde a sua criação._

_Apesar de já terem se passado alguns anos desde sua publicação, nós o mantivemos porque ele continua a ser uma referência útil e uma autêntica representação do Ethereum e de sua visão. Para aprender sobre os desenvolvimentos mais recentes do Ethereum e como as mudanças no protocolo são feitas, recomendamos [este manual](/learn/)._

[Pesquisadores e acadêmicos que buscam uma versão histórica ou uma versão canônica do whitepaper [de Dezembro de 2014] devem usar este PDF.](./whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf)

## Uma nova geração de contrato inteligente e plataforma de aplicativos descentralizada {#a-next-generation-smart-contract-and-decentralized-application-platform}

O desenvolvimento do Bitcoin por Satoshi Nakamoto em 2009 tem sido frequentemente aclamado como um desenvolvimento radical em dinheiro e moeda, sendo o primeiro exemplo de um ativo digital que simultaneamente não tem respaldo ou "[valor intrínseco](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)" e sem órgão centralizado ou controlador. No entanto, outra parte (talvez mais) importante do experimento é a tecnologia blockchain como ferramenta de consenso distribuído, e esse outro aspecto do bitcoin está recebendo bastante atenção. Outras aplicações da tecnologia blockchain geralmente citadas incluem o uso de ativos digitais em blockchain para representar moedas personalizadas e instrumentos financeiros, ("[moedas coloridas](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), a propriedade de um dispositivo físico, ("[propriedade inteligente](https://en.bitcoin.it/wiki/Smart_Property)"), ativos não-fungíveis como nomes de domínio ("[Namecoin](http://namecoin.org)"), bem como usos mais complexos envolvendo ativos digitais controlados diretamente por uma parte de código que implementa regras arbitrárias, ("[contratos inteligentes](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)"), ou até mesmo "[organizações autônomas descentralizadas](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAOs). O que o Ethereum pretende fornecer é uma blockchain com uma linguagem de programação integrada completa que pode ser usada para criar "contratos" que podem ser usados para codificar funções arbitrárias de transição do estado, permitindo que usuários criem qualquer um dos sistemas descritos acima, bem como muitos outros que ainda não imaginamos, simplesmente escrevendo a lógica em algumas linhas de código.

## Introdução ao bitcoin e conceitos gerais {#introduction-to-bitcoin-and-existing-concepts}

### História {#history}

O conceito de moeda digital descentralizada, bem como aplicativos alternativos, como registros de propriedade, existe há décadas. Os protocolos anônimos de e-cash das décadas de 1980 e 1990, principalmente dependentes de um primitivo criptográfico conhecido como Chaumian blinding, forneciam uma moeda com um alto nível de privacidade, mas os protocolos não conseguiram ganhar força devido à dependência de um intermediário centralizado. Em 1998, o [b-money](http://www.weidai.com/bmoney.txt) de WeiDai foi a primeira proposta a sugerir a ideia de se criar dinheiro usando a resolução de quebra-cabeças computacionais, bem como de consenso descentralizado, mas faltavam detalhes sobre como o consenso descentralizado poderia realmente ser implementado. Em 2005, Hal Finney introduziu um conceito de [provas de trabalho reutilizável](https://nakamotoinstitute.org/finney/rpow/), um sistema que usa ideias do b-money junto com quebra-cabeças de Hashcash computacionalmente difíceis de Adam Back para criar um conceito de criptomoeda, mas mais uma vez ficou aquém do ideal porque usava a computação confiável como backend. Em 2009, uma moeda descentralizada foi implementada pela primeira vez por Satoshi Nakamoto, combinando primitivos estabelecidos para gerenciar a propriedade usando criptografia de chave pública, com um algoritmo de consenso para manter o controle de quem tem moedas conhecido como "prova de trabalho".

O mecanismo por trás da prova de trabalho foi um avanço no espaço porque resolveu simultaneamente dois problemas. Primeiro, ele forneceu um algoritmo de consenso simples e moderadamente eficaz, permitindo que os nós da rede concordassem coletivamente com um conjunto de atualizações canônicas para o estado do livro-razão do Bitcoin. Em segundo lugar, forneceu um mecanismo que não só prevenia ataques cibernéticos como também permitia a livre entrada no processo de consenso, resolvendo o problema político de decidir quem o influencia. Ele faz isso substituindo uma barreira formal à participação, como a exigência de ser registrado como entidade única em uma determinada lista, por uma barreira econômica – o peso de um único nó no processo de votação por consenso é diretamente proporcional ao poder de computação que o nó traz. Desde então, uma abordagem alternativa foi proposta, chamada _prova de participação_, que calcula o peso de um nó como sendo proporcional às posses de moeda e não a recursos computacionais. A discussão dos méritos relativos das duas abordagens está além do escopo deste artigo, mas as duas podem ser usadas para servir como espinha dorsal de uma criptomoeda.

### Bitcoin como um sistema de transição de estado {#bitcoin-as-a-state-transition-system}

![Transições de estado Ethereum](./ethereum-state-transition.png)

Do ponto de vista técnico, o livro-razão de uma criptomoeda como o Bitcoin pode ser pensado como um sistema de transição de estado, onde há um "estado" que consiste no status de propriedade de todos os bitcoins existentes e uma "função de transição de estado" que assume um estado e uma transação e gera um novo estado que é o resultado. Em um sistema bancário padrão, por exemplo, o estado é um balanço patrimonial, uma transação é um pedido para mover $X de A para B, e a função de transição de estado tira $X da conta de A e aumenta $X na conta de B. Se a conta A tem menos que $X, a função de transição de estado retorna um erro. Portanto, pode-se definir formalmente:

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

O estado do "Bitcoin" é a coleção de todas as moedas (tecnicamente, "saídas de transação não gastas" ou UTXO) que foram mineradas e ainda não foram gastas, com cada UTXO tendo uma denominação e um proprietário (definido por um endereço de 20 bytes que é basicamente uma chave pública criptográfica<sup>[fn1](#notes)</sup>). Uma transação contém uma ou mais entradas, com cada entrada contendo uma referência a um UTXO existente e uma assinatura criptográfica produzida pela chave privada associada ao endereço do proprietário, e uma ou mais saídas, com cada saída contendo um novo UTXO a ser adicionado ao estado.

A função de transição de estado `APPLY(S,TX) -> S'` pode ser definida mais ou menos da seguinte forma:

<ol>
  <li>
    Para cada entrada em <code>TX</code>:
    <ul>
    <li>
        Se o UTXO referenciado não está no <code>S</code>, retorne um erro.
    </li>
    <li>
        Se a assinatura fornecida não coincide com o proprietário do UTXO, retorne um erro.
    </li>
    </ul>
  </li>
  <li>
    Se a soma das denominações de todas as entradas UTXO é menor que a soma das denominações de todas as saídas UTXO, retorne um erro.
  </li>
  <li>
    Retorne <code>S</code> com todas as entradas UTXO removidas e todas as saídas UTXO adicionadas.
  </li>
</ol>

A primeira metade do primeiro passo impede que os remetentes de transações gastem moedas que não existem, a segunda metade do primeiro passo impede que os remetentes de transações gastem moedas de outras pessoas e a segunda etapa impõe a conservação do valor. Para usar isso para pagamento, o protocolo é o seguinte. Suponha que Alice queira enviar BTC 11,7 para Bob. Primeiro, Alice vai procurar um conjunto de UTXO disponíveis que ela possui que totalizam até pelo menos BTC 11,7. Realisticamente, obter exatamente BTC 11,7 não é possível. Digamos que o menor valor que Alice obtém seja 6 + 4 + 2 = 12. Então, ela cria uma transação com essas três entradas e duas saídas. A primeira saída será BTC 11,7 com o endereço de Bob como seu proprietário, e a segunda saída será o "troco" restante de BTC 0,3, com o dono sendo a própria Alice.

### Mineração {#mining}

![Blocos Ethereum](./ethereum-blocks.png)

Se tivéssemos acesso a um serviço centralizado de confiança, este sistema seria fácil de implementar. Ele poderia simplesmente ser codificado exatamente como foi descrito, usando o disco rígido de um servidor centralizado para manter o controle do estado. Entretanto, com o Bitcoin nós estamos tentando construir um sistema descentralizado de moeda, então precisaremos combinar o sistema de transição de estado com um sistema de consenso a fim de garantir que todos concordem com a ordem das transações. O processo descentralizado de consenso do Bitcoin requer que os nós na rede tentem produzir continuamente pacotes de transações chamados "blocos". A rede destina-se a produzir cerca de um bloco a cada dez minutos, com cada bloco contendo um carimbo de tempo, um nonce (um número usado apenas uma vez), uma referência para (ou seja, o hash de) o bloco anterior e uma lista de todas as transações realizadas desde o bloco anterior. Ao longo do tempo, isso cria uma cadeia de blocos persistente e em constante crescimento, que constantemente se atualiza para representar o estado mais recente do livro-razão do Bitcoin.

O algoritmo para verificar se um bloco é válido, expresso nesse paradigma, é o seguinte:

1. Verifique se o bloco anterior referenciado pelo bloco existe e é válido.
2. Verifique se o carimbo de tempo do bloco é maior do que o do bloco anterior<sup>[fn2](#notes)</sup> e menos de 2 horas a partir dele.
3. Verifique se a prova de trabalho no bloco é válida.
4. Faça `S[0]` ser o estado ao final do bloco anterior.
5. Suponha que `TX` é a lista de transações do bloco com `n` transações. Para todos os `i` em `0... -1`, use `S[i+1] = APPLY(S[i], X[i])` Se algum aplicativo retornar um erro, saia e retorne falso.
6. Retorne verdadeiro e registre `S[n]` como o estado no final deste bloco.

Basicamente, cada transação no bloco deve fornecer uma transição válida de estado daquele que foi o estado canônico antes da transação ser executada para algum novo estado. O estado não é codificado no bloco de forma alguma; isto é puramente uma abstração para ser lembrada pelo nó de validação e só pode ser calculada (de forma segura) para qualquer bloco começando pelo estado de gênese e aplicando sequencialmente cada transação em cada bloco. Além disso, a ordem com que o minerador inclui as transações no bloco importa; se houver duas transações A e B em um bloco, como por exemplo B gasta um UTXO criado por A, então o bloco será válido se A vier antes do B, mas não em caso contrário.

A única condição de validação presente na lista acima que não é encontrada em outros sistemas é a exigência da "prova de trabalho". A condição exata é que o hash duplo SHA256 de cada bloco, tratado como um número de 256 bits, deve ser menor do que um alvo ajustado dinamicamente, que na data desta publicação é aproximadamente 2<sup>187</sup>. O propósito disso é tornar a criação de blocos computacionalmente "difícil", prevenindo assim os atacantes sybil de refazerem toda a cadeia de blocos a seu favor. Porque o SHA256 é projetado para ser uma função pseudoaleatória totalmente imprevisível, a única maneira de criar um bloco válido é por tentativa e erro, incrementando repetidamente o nonce e verificando há correspondência com o novo hash.

No alvo atual de \~2<sup>187</sup>, a rede deve fazer uma média de \~2<sup>69</sup> tentativas antes que um bloco válido seja encontrado. Em geral, o alvo é recalibrado pela rede a cada 2016 blocos, para que, em média, um novo bloco seja produzido por algum nó na rede a cada dez minutos. Para compensar os mineradores por esse trabalho computacional, o minerador de cada bloco tem direito a incluir uma transação dando a si mesmo BTC 12,5. Além disso, se qualquer transação tiver um valor total maior em suas entradas do que em suas saídas, a diferença também irá para o minerador como "taxa de transação". Aliás, esse é também o único mecanismo pelo qual BTC são emitidas: o estado inicial não continha nenhuma moeda.

Para melhor entender o propósito da mineração, vamos examinar o que acontece no caso de um ataque malicioso. Coma a criptografia do Bitcoin é conhecida por ser segura, o atacante tentará atingir a parte do sistema que não está diretamente protegida pela criptografia: a ordem das transações. A estratégia do invasor é simples:

1. Ele envia BTC 100 para um comerciante em troca de algum produto (de preferência um bem digital de entrega rápida).
2. Aguarda a entrega do produto.
3. Produz outra transação enviando os mesmos BTC 100 para si mesmo.
4. Tenta convencer a rede de que a transação dele para si mesmo foi a que chegou primeiro.

Uma vez que a etapa (1) tenha ocorrido, depois de alguns minutos algum minerador incluirá a transação em um bloco. Por exemplo, o bloco de número 270000. Depois de uma hora, mais cinco blocos terão sido adicionados à cadeia depois desse bloco com cada um deles indiretamente apontando para a transação e, assim, "confirmando-a". Neste ponto, o comerciante aceitará o pagamento conforme finalizado e entregará o produto. Como é um bem digital, a entrega é instantânea. Agora, o invasor cria outra transação enviando BTC 100 para si mesmo. Se ele simplesmente deixar a transação correr solta, ela não será processada. Os mineradores tentarão executar `APPLY(S, X)` e perceberão que o `TX` está consumindo um UTXO que não está mais no estado. Então, o invasor cria uma bifurcação na cadeia de blocos: ele minera outra versão do bloco 270 apontando para o mesmo bloco 269 com um "pai", mas com a transação nova no lugar da antiga. Como os dados dos blocos são diferentes, isso requer a reapresentação da prova de trabalho. Além disso, a nova versão do bloco 270 do invasor tem um hash diferente, então os blocos originais 271 a 275 não "apontam" para ele. Assim, a cadeia original e a nova cadeia do invasor são totalmente separadas. A regra é que, em uma bifurcação, a cadeia de blocos mais longa é considerada verdadeira então mineradores legítimos trabalharão na cadeia 275, enquanto o invasor está trabalhando na cadeia 270. Para que a cadeia de blocos do invasor seja a mais longa, ele precisa ter mais poder computacional do que o restante de toda a rede junta. É por isso que esse tipo de ataque se chama "ataque de 51%".

### Árvores de Merkle {#merkle-trees}

![SPV em Bitcoin](./spv-bitcoin.png)

_Esquerda: é suficiente apresentar apenas um pequeno número de nós em uma árvore Merkle para dar uma prova da validade de um ramo._

_Direita: qualquer tentativa de mudar qualquer parte da árvore de Merkle levará a uma inconsistência em algum lugar acima na cadeia._

Um recurso importante que dá ao Bitcoin a capacidade de se expandir é que o bloco é armazenado em uma estrutura de dados de vários níveis. O "hash" de um bloco na verdade é apenas o hash do cabeçalho do bloco: um pedaço de cerca de 200 bytes de dados que contém o carimbo de tempo, o nonce, o hash do bloco anterior e o hash raiz de uma estrutura de dados chamada de árvore de Merkle, que armazena todas as transações no bloco. Uma árvore de Merkle é um tipo de árvore binária, composta por um conjunto de nós com um grande número de nós folhas na parte inferior da árvore que contém os dados, um conjunto de nós intermediários onde cada nó é o hash de seus dois filhos e, por último, um único nó raiz, também formado usando o hash de seus dois filhos, que representam o "topo" da árvore. O objetivo da árvore de Merkle é permitir que os dados em um bloco sejam entregues por partes: um nó pode baixar apenas o cabeçalho de um bloco de uma fonte, a pequena parte da árvore relevante de outra fonte, e ainda assim garantir que todos os dados estão corretos. Isto funciona porque que os hashes se propagam para cima: se um usuário malicioso em uma falsa transação tentar trocar a parte inferior de uma árvore Merkle, esta mudança causará uma mudança no nó acima e, em seguida, uma mudança no nó acima, alterando assim a raiz da árvore e, portanto, o hash do bloco, o que faz com que o protocolo registre-o como um bloco totalmente diferente (quase certamente com uma prova de trabalho inválida).

O protocolo de árvore de Merkle é essencial para a sustentabilidade a longo prazo. Um "nó completo" na rede Bitcoin, que armazena e processa a totalidade de cada bloco, ocupava cerca de 15 GB de espaço em disco na rede Bitcoin em abril de 2014, e está crescendo em mais de um gigabyte por mês. Atualmente, isso é viável para alguns computadores desktop e não telefones e, no futuro, apenas empresas e quem tem a atividade como hobby poderão participar. Um protocolo conhecido como "verificação de pagamento simplificada" (SPV) permite que exista outra classe de nós chamados de "nós leves", que baixam os cabeçalhos de bloco, autenticam a prova de trabalho nos cabeçalhos do bloco e, em seguida, baixam apenas os "ramos" associados às transações que são relevantes para eles. Isso permite que nós leves determinem, com uma forte garantia de segurança, qual o status de qualquer transação Bitcoin e seu saldo atual, baixando apenas uma parte muito pequena da cadeia de blocos.

### Aplicações alternativas de Blockchain {#alternative-blockchain-applications}

A ideia de pegar o conceito de cadeia de blocos e aplicá-lo a outros contextos também tem uma longa história. Em 2005, Nick Szabo publicou o documento "[Secure property titles with owner authority](https://nakamotoinstitute.org/secure-property-titles/)" ("Títulos Seguros de Propriedade com Autoridade do dono", em tradução livre) que descrevia que "novos avanços na tecnologia de banco de dados replicados" permitirão um sistema baseado em blockchain para armazenar um registro de quem possui qual terra, criando uma estrutura elaborada, incluindo conceitos como propriedade, possessão adversa e imposto territorial georgiano. No entanto, não houve, infelizmente, nenhum sistema de banco de dados replicados eficaz na época, e, por isso, o protocolo nunca foi implementado na prática. Depois de 2009, no entanto, quando o consenso descentralizado do Bitcoin foi desenvolvido, uma série de aplicações alternativas rapidamente começaram a surgir.

- **Namecoin** - criado em 2010, [Namecoin](https://namecoin.org/) pode ser descrito como um banco de dados descentralizado de registro de nomes. Em protocolos descentralizados como Tor, Bitcoin e BitMessage, é preciso haver alguma forma de identificar contas para que outras pessoas possam interagir com elas, mas em todas as soluções que existem, o único tipo de identificador disponível é um hash pseudoaleatório como `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Idealmente, gostaríamos de poder ter uma conta com um nome como "george". No entanto, o problema é que, se uma pessoa pode criar uma conta chamada "george", então outra pessoa pode usar o mesmo processo para registrar "george" para si mesma e se passar por ele. A única solução é o "direito de precedência", onde o primeiro a registrar é bem-sucedido e o segundo falha - algo perfeitamente adequado para o protocolo de consenso Bitcoin. Namecoin é a mais antiga e mais bem-sucedida implementação de um sistema de registro de nomes usando essa ideia.
- **Moedas coloridas** - o propósito das [moedas coloridas](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) é servir como um protocolo para permitir que pessoas criem suas próprias moedas digitais (ou, no importante caso trivial de uma moeda com uma unidade, tokens digitais) na blockchain do Bitcoin. No protocolo de moedas coloridas, alguém "emite" uma nova moeda atribuindo publicamente uma cor para uma específica UTXO de Bitcoin, e o protocolo define recursivamente a cor de outro UTXO para ser da mesma cor das entradas que a transação que as criou gastou (algumas regras especiais se aplicam no caso de entradas com cores mistas). Isto permite que usuários mantenham carteiras contendo apenas UTXO de uma cor específica e as enviem como bitcoin regulares, rastreando através da blockchain para determinar a cor de qualquer UTXO que eles recebam.
- **Metacoins** - a idéia por trás do metacoin é ter um protocolo feito em cima do Bitcoin, usando transações do Bitcoin para armazenar transações metacoin, mas como uma função de transição de estado diferente, `APPLY'`. Como o protocolo metacoin não pode impedir que transações metacoin inválidas apareçam na blockchain do Bitcoin, uma regra é adicionada para que, se `APPLY'(S,TX)` retornar um erro, o protocolo vire `APPLY'(S,TX) = S` por padrão. Isso fornece um mecanismo fácil para criar um protocolo de criptomoeda arbitrário, com recursos avançados que provavelmente não podem ser implementados dentro do próprio Bitcoin, mas com um custo de desenvolvimento muito baixo já que o protocolo do Bitcoin cuida das complexidades de mineração e de rede. Metacoins têm sido usados para implementar algumas classes de contratos financeiros, registro de nomes e câmbio descentralizado.

Assim, em geral, existem duas abordagens para a construção de um protocolo de consenso: construir uma rede independente e construir um protocolo além do Bitcoin. A primeira abordagem, embora seja razoavelmente bem-sucedida, no caso de aplicações como o Namecoin, é difícil de implementar; cada implementação individual precisa inicializar uma cadeia de blocos independente, bem como a construção e o teste de toda a transição de estado necessária e código da rede. Além disso, nós prevemos que o conjunto de aplicações para tecnologia de consenso descentralizada seguirá uma lei de distribuição de poder onde a grande maioria dessas aplicações seria muito pequena para garantir sua própria cadeia de blocos. Também notamos que existem grandes classes de aplicações descentralizadas, particularmente organizações autônomas descentralizadas, que precisam interagir umas com as outras.

Por outro lado, a abordagem baseada no Bitcoin tem a falha de não herdar os recursos de verificação de pagamento simplificados do Bitcoin. O SPV funciona para Bitcoin porque pode usar a profundidade da blockchain como um proxy para a validação. Em algum momento, uma vez que os ancestrais de uma transação sejam antigos o suficiente, se poderá dizer que eles legitimamente faziam parte do Estado. Em contrapartida, meta-protocolos baseados em blockchain, não podem forçar a blockchain a não incluir transações que não são válidas no contexto de seus próprios protocolos. Assim, uma implementação de meta-protocolo SPV totalmente segura precisaria retroceder a varredura até o começo da blockchain do Bitcoin para determinar se certas transações são válidas ou não. Atualmente, todas as implementações "leves" de protocolos bancários baseados em Bitcoin usam um servidor confiável para fornecer os dados, um resultado altamente subotimizado já que um dos propósitos primários de uma criptomoeda é justamente eliminar a necessidade de confiança.

### Linguagem de script {#scripting}

Mesmo sem nenhuma extensão, o protocolo Bitcoin realmente facilita uma versão fraca do conceito de "contratos inteligentes". UTXO no Bitcoin pode ser propriedade não apenas de uma chave pública, mas também por um script mais complicado, expresso em uma simples linguagem "stack-based". Neste paradigma, uma transação que gaste esse UTXO deve fornecer dados que satisfaçam o script. De fato, até o mecanismo básico de propriedade público é implementado por um script: o script recebe uma assinatura de curva elíptica como entrada, verifica-a contra a transação e o endereço que é dono da UTXO, e retorna 1 se a verificação for bem-sucedida e 0 caso contrário. Existem outros scripts mais complicados para vários outros casos de uso. Por exemplo, pode-se criar um script que requer assinaturas de duas das três chaves privadas para validar ("multisig"). Uma configuração útil para contas corporativas, segura para contas poupança e algumas situações de comércio. Scripts também podem ser usados para pagar recompensas por soluções para problemas computacionais, e pode-se até construir um script que diga algo como "este Bitcoin UTXO é seu se você puder fornecer uma prova SPV de que enviou uma transação Dogecoin", permitindo uma troca descentralizada de criptomoedas.

No entanto, o idioma de scripting conforme implementado no Bitcoin tem várias limitações importantes:

- **A falta de completude de Turing** - ou seja, embora haja um grande subconjunto de computação que a linguagem de script de Bitcoin suporta, ele nem de perto suporta tudo. A principal categoria que está faltando são laços (loops). Isso é feito para evitar loops infinitos durante a verificação da transação. Teoricamente é um obstáculo para programadores de script, já que qualquer loop pode ser simulado simplesmente repetindo o código, muitas vezes com uma instrução if, mas leva a scripts que são muito ineficientes em termos de espaço. Por exemplo, a implementação de um algoritmo alternativo de assinatura de curva elíptica provavelmente exigiria 256 rodadas de multiplicação repetidas, todas incluídas individualmente no código.
- **Valor blindado** - não há como um script UTXO fornecer controle fino sobre o valor que pode ser sacado. Por exemplo, um caso de uso poderoso de um contrato Oracle seria um contrato de hedge, em que A e B colocam BTC 1000 e, após 30 dias, o script envia BTC 1000 para A e o restante para B. Isto exigiria um Oracle para determinar o valor de BTC 1 em USD, mesmo assim é uma grande melhoria em termos de confiança e requisitos de infraestrutura em relação às soluções totalmente centralizadas que estão disponíveis agora. No entanto, como os UTXO são tudo ou nada, a única forma de alcançar isso é através do hack muito ineficiente de ter muitos UTXO de denominações variadas (por exemplo, um UTXO de 2<sup>k</sup> para cada k até 30) e fazer com que o oráculo escolha qual UTXO enviar para A e qual para B.
- **Falta de estado** - UTXOs podem ser gastos ou não. Contratos multiestados ou scripts que mantenham qualquer outro estado interno além disso não são possíveis. Isso dificulta a criação de contratos de opções multiestados, ofertas de troca descentralizadas ou protocolos de compromisso criptográfico de dois estágios (necessários para recompensas computacionais seguras). Isso também significa que o UTXO só pode ser usado para construir contratos pontuais simples e não contratos "com estado" mais complexos (como organizações descentralizadas) torna os meta-protocolos difíceis de implementar. O estado binário combinado com o valor blindado também significa que a importante aplicação de limites de retirada é possível.
- **Blockchain blindada** - o UTXO é blindado para os dados de blockchain, como nonce, carimbos de tempo e hashes de blocos anteriores. Isto limita extremamente as aplicações em jogos de azar e várias outras categorias, privando a linguagem de script de uma fonte potencialmente valiosa de aleatoriedade.

Assim, vemos três abordagens para a construção de aplicações avançadas em cima de criptomoedas: a construção de uma nova blockchain, utilização de scripts em cima do Bitcoin e a construção de um meta-protocolo em cima do Bitcoin. Construir uma nova blockchain oferece liberdade ilimitada na construção de um conjunto de recursos, mas em detrimento do tempo de desenvolvimento, esforço de inicialização e segurança. E fácil implementar e padronizar usando scripting, mas ele tem capacidades muito limitadas, e os meta-protocolos, embora fáceis, sofrem com falhas na escalabilidade. Com o Ethereum, queremos construir uma estrutura alternativa que proporcione ganhos ainda maiores na facilidade de desenvolvimento, bem como propriedades light client ainda mais fortes, enquanto as aplicações desfrutam de um ambiente econômico e da segurança da blockchain.

## Ethereum {#ethereum}

A intenção do Ethereum é criar um protocolo alternativo para a construção de aplicações descentralizadas, fornecendo um conjunto de diferentes tradeoffs, que acreditamos que serão muito úteis para uma grande variedade de aplicações descentralizadas. Particularmente, dando ênfase a situações nas quais a rapidez no tempo de desenvolvimento, a segurança para aplicações menores e pouco utilizadas e a capacidade de diferentes aplicações de interagir de forma eficiente, são importantes. O Ethereum faz isso construindo o que é, essencialmente, a derradeira camada fundamental abstrata: uma blockchain com linguagem de programação integrada Turing-complete, em que qualquer pessoa pode escrever contratos de forma inteligente e aplicações descentralizadas e criar suas próprias regras arbitrárias para a propriedade, formatos de transação e funções de transição de estado. Uma versão básica do Namecoin pode ser escrita em duas linhas de código, e outros protocolos como moedas e sistemas de reputação podem ser construídos em menos de vinte. Contratos inteligentes ("caixas" criptografadas que contém um valor que só é desbloqueado se certas condições forem cumpridas) também podem ser construídos em cima da plataforma, com muito mais poder que o oferecido pelo script Bitcoin, devido aos poderes adicionais de Turing-completude, consciência de valor, consciência e estado da blockchain.

### Contas Ethereum {#ethereum-accounts}

No Ethereum, o estado é composto por objetos chamados "contas", com cada conta tendo um endereço de 20-bytes e as transições de estado sendo transferências diretas de valores e informações entre contas. Uma conta Ethereum contém quatro campos:

- O **nonce**, um contador usado para garantir que cada transação só possa ser processada uma única vez
- O saldo atual da conta em **ether**
- O **código de contrato** da conta, se houver
- O **armazenamento** da conta (vazio por padrão)

"Ether" é o principal crypto-combustível do Ethereum e é usado para pagar taxas de transação. Em geral, existem dois tipos de contas: **contas de propriedade externa**, controladas por chaves privadas, e **contas de contrato**, controladas por seus códigos de contrato. Uma conta de propriedade externa não tem código e é possível enviar mensagens de uma conta de propriedade externa criando e assinando a transação. Em uma conta de contrato, toda vez que ela recebe uma mensagem seu código é ativado, permitindo que ela leia e grave no armazenamento interno e envie outras mensagens ou crie contratos.

Observe que "contratos" no Ethereum não devem ser vistos como algo que deve ser "realizado" ou "cumprido". Eles são mais como "agentes autônomos" que vivem dentro do ambiente de execução do Ethereum, sempre executando uma parte específica do código quando "estimulados" por uma mensagem ou transação, e tendo controle direto sobre seu próprio saldo de ether e sua própria chave/valor armazenados para controlar variáveis persistentes.

### Mensagens e transações {#messages-and-transactions}

O termo "transação" é usado no Ethereum para se referir ao pacote de dados assinado que armazena uma mensagem a ser enviada de uma conta de propriedade externa. Transações contêm:

- O destinatário da mensagem
- Uma assinatura identificando o remetente
- A quantidade de ether a ser transferida do remetente para o destinatário
- Um campo de dados opcional
- Um valor `STARTGAS`, representando o número máximo de etapas computacionais que a execução da transação pode realizar
- Um valor `GASPRICE`, representando a taxa que o remetente paga por etapa computacional

Os três primeiros são campos-padrão esperados em qualquer criptomoeda. O campo de dados não tem função por padrão, mas a máquina virtual tem um opcode em que um contrato pode acessar os dados. Por exemplo, se um contrato estiver funcionando como um serviço de registro de domínio na blockchain, pode ser que ele queira interpretar os dados que estão sendo passados para ele como tendo dois "campos": o primeiro campo sendo um domínio a registrar e o segundo o IP no qual registrá-lo. O contrato leria esses valores dos dados da mensagem e os colocaria adequadamente no armazenamento.

Os campos `STARTGAS` e `GASPRICE` são cruciais para o modelo de serviço anti-negação do Ethereum. Para evitar loops infinitos acidentais ou hostis ou outros desperdícios computacionais em código, cada transação deve definir um limite para quantas etapas computacionais de execução de código ela pode usar. A unidade fundamental de computação é "gas". Geralmente, uma etapa computacional custa 1 gas, mas algumas operações custam quantidades maiores de gas porque elas são computacionalmente mais caras, ou aumentam a quantidade de dados que devem ser armazenados como parte do estado. Há também uma taxa de 5 gas para cada byte nos dados da transação. A intenção do sistema de taxas é exigir que um invasor pague proporcionalmente por cada recurso que consome, incluindo computação, largura de banda e armazenamento, portanto, qualquer transação que leve a rede a consumir uma quantidade maior de qualquer um desses recursos deve ter uma taxa de gas mais ou menos proporcional ao aumento.

### Mensagens {#messages}

Os contratos podem enviar "mensagens" para outros contratos. As mensagens são objetos virtuais que nunca são serializados e existem apenas no ambiente de execução Ethereum. Uma mensagem contém:

- O remetente da mensagem (implícito)
- O destinatário da mensagem
- A quantidade de ether a ser transferida junto com a mensagem
- Um campo de dados opcional
- Um valor `STARTGAS`

Essencialmente, uma mensagem é como uma transação, exceto que é produzida por um contrato e não por um agente externo. Uma mensagem é criada quando um contrato em execução usa o opcode `CALL`, que produz e cria uma mensagem. Como uma transação, uma mensagem leva à execução do código de conta do destinatário. Dessa maneira, os contratos podem interagir com outros contratos exatamente da mesma forma que os agentes externos.

Observe que a alocação de gas atribuída por uma transação ou contrato se aplica ao total de gas consumido por essa transação e todas as subexecuções. Por exemplo, se um agente externo A envia uma transação para B com 1.000 gas e B consome 600 gas antes de enviar uma mensagem para C, e a execução interna de C consome 300 gas antes de retornar, então B pode enviar outros 100 gas antes de ficar sem nenhum.

### Função da transição de estado do Ethereum {#ethereum-state-transition-function}

![Transições de estado do Ether](./ether-state-transition.png)

A função da transição de estado do Ethereum, `APPLY(S,TX) -> S'` pode ser definida da seguinte forma:

1. Verifique se a transação está bem-formada (ou seja, tem o número certo de valores), se a assinatura é válida e se o nonce corresponde ao nonce da conta do remetente. Se não, um erro é retornado.
2. Calculamos se a taxa de transação como `STARTGAS * GASPRICE` e determine o endereço de envio da assinatura. Desconte a taxa do saldo da conta do remetente e aumente o nonce do remetente. Retorne um erro caso não haja saldo suficiente para gastar.
3. Inicialize `GAS = STARTGAS` e deduza uma certa quantidade de gas por byte para pagar pelos bytes na transação.
4. Transfira o valor da transação da conta do remetente para a conta do destinatário. Se a conta de recebimento ainda não existir, ela deverá ser criada. Se a conta receptora for um contrato, executaremos o código do contrato até o final ou até que a execução fique sem gas.
5. Se a transferência de valor falhar porque o remetente não tem dinheiro suficiente ou porque não há mais gas para a execução do código, reverta todas as alterações de estado, exceto o pagamento das taxas, e adicione as taxas à conta do minerador.
6. Caso contrário, as taxas por todo o gas restante são reembolsadas ao remetente e as taxas pagas pelo gas consumido são enviadas ao minerador.

Por exemplo, suponha que o código do contrato seja:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Observe que, na realidade, o código do contrato é escrito no código EVM de baixo nível. Para que tudo fique mais claro, este exemplo foi escrito em Serpent, uma de nossas linguagens de alto nível, e pode ser compilado em código EVM. Suponha que o armazenamento do contrato comece vazio e uma transação seja enviada com o valor de 10 ether, 2000 gas, 0.001 ether gasprice e 64 bytes de dados, com 0-31 bytes na representação de números `2` e bytes de 32-63 representados na string `CHARLIE`. Nesse caso, o processo para a função da transição de estado seria:

1. Verificar se a transação é válida e está bem-formada.
2. Verifique se o remetente da transação tem pelo menos 2.000 \* 0,001 = 2 ether. Se tiver, subtraia 2 ether da conta do remetente.
3. Inicializar gas = 2.000. Supondo que a transação tenha 170 bytes de comprimento e que a taxa de bytes seja de 5, subtraia 850, de modo que sobre 1.150 gas.
4. Subtrair mais 10 ether da conta do remetente e adicioná-los à conta do contrato.
5. Executar o código. Isso é simples: ele verifica se o armazenamento do contrato no índice `2` é usado, confirma que não, e então define o armazenamento no índice `2` para o valor `CHARLIE`. Suponha que isso consome 187 gas, então a quantidade de gas restante é 1.150 - 187 = 963
6. Adicionar 963 \* 0,001 = 0,963 ether de volta para a conta do remetente e retorne o estado resultante.

Se não houvesse um contrato no outro extremo da transação, a taxa total da transação seria simplesmente igual ao `GASPRICE` fornecido multiplicado pelo comprimento da transação em bytes e os dados enviados juntamente com a transação seriam irrelevantes.

Veja que as mensagens funcionam de maneira equivalente às transações em termos de reversão: se a execução de uma mensagem fica sem gas, a execução da mensagem e todas as outras execuções acionadas por essa execução são revertidas com exceção das execuções pais, que não precisam ser revertidas. Isso significa que é "seguro" para um contrato chamar outro contrato, por exemplo, se A chamasse B com o gas de G, então a execução de A com certeza perderia no máximo mais G gas. Por fim, há um opcode, `CREATE`, que cria um contrato. Sua mecânica de execução é geralmente semelhante a `CALL`, exceto que o resultado da execução determina o código de um contrato recém-criado.

### Execução de código {#code-execution}

O código nos contratos Ethereum é escrito em linguagem bytecode "stack-based" de baixo nível, chamado de "código de máquina virtual Ethereum" ou "código EVM". Esse código consiste em uma série de bytes, onde cada byte representa uma operação. Em geral, a execução de código é um loop infinito que consiste em realizar repetidamente a operação no contador do programa atual (que começa em zero) e depois incrementar o contador do programa em um, até o final do código ser alcançado ou um erro ou uma instrução `STOP` ou `RETURN` ser detectada. As operações têm acesso a três tipos de espaço para armazenar dados:

- O **stack**, um contêiner onde o último a entrar é o primeiro a sair, no qual os valores podem ser adicionados e extraídos
- **Memória**, um array de bytes infinitamente expansível
- O **armazenamento** de longo prazo do contrato, um repositório e chave/valor. Ao contrário da pilha e da memória, que são redefinidas depois do término do cálculo, o armazenamento persiste ao longo do tempo.

O código também pode acessar o valor, o remetente e os dados da mensagem entrante, bem como os dados do cabeçalho do bloco. Ele também pode retornar um array de bytes como resultado.

O modelo de execução formal do código EVM é bem simples. Enquanto a máquina virtual Ethereum está em execução, seu estado computacional completo pode ser definido pela tupla `(block_state, transaction, message, code, memory, stack, pc, gas)`, em que `block_state` é o estado global que contém todas as contas e inclui saldos e armazenamento. No início de cada rodada de execução, a instrução atual é encontrada pegando o `pc`ésimo byte de `code` (ou 0 se `pc >= len(code)`), e cada instrução tem sua própria definição em termos de como ela afeta a tupla. Por exemplo, `ADD` retira dois itens da pilha e coloca sua soma, reduz o `gás` em 1 e incrementa o `pc` em 1 e o ` SSTORE` remove os dois primeiros itens da pilha e insere o segundo item no armazenamento do contrato, no índice especificado pelo primeiro item. Embora existam muitas maneiras de otimizar a execução da máquina virtual Ethereum por meio de compilação just-in-time, a implementação básica do Ethereum pode ser feita com poucas centenas de linhas de código.

### Blocos e mineração {#blockchain-and-mining}

![Diagrama de blocos de aplicação Ethereum](./ethereum-apply-block-diagram.png)

A blockchain Ethereum é em muitos aspectos parecida com a blockchain Bitcoin, embora haja algumas diferenças. A principal diferença entre Ethereum e Bitcoin em relação à arquitetura blockchain é que, diferentemente do Bitcoin, os blocos Ethereum contêm uma cópia da lista de transações e do estado mais recente. Além disso, outros dois valores (número do bloco e dificuldade) também são armazenados no bloco. O algoritmo de validação do bloco básico no Ethereum é o seguinte:

1. Verifique se o bloco anterior referenciado pelo bloco existe e é válido.
2. Verifique se o carimbo de tempo do bloco é maior que o do bloco anterior referenciado e menos de 15 minutos depois.
3. Verifique se o número do bloco, dificuldade, raiz das transações, tio raiz e limite de gas (vários conceitos de baixo nível, específicos do Ethereum) são válidos.
4. Verifique se a prova de trabalho no bloco é válida.
5. Faça `S[0]` ser o estado ao final do bloco anterior.
6. Faça `TX` ser a lista de transações do bloco com `n` transações. Para todos `i` em `0...n-1`, defina `S[i+1] = APPLY(S[i],TX[i])`. Se algum aplicativo retornar um erro, ou se o total de gas consumido no bloco até este ponto exceder o `GASLIMIT`, retorne um erro.
7. Faça `S_FINAL` ser `S[n]`, mas adicionando a recompensa por bloco paga ao minerador.
8. Verifique se a raiz da árvore de Merkle do estado `S_FINAL` é igual à raiz do estado final fornecida no cabeçalho do bloco. Se for, o bloco é válido. Caso contrário, não é.

A abordagem pode parecer muito ineficiente a princípio, porque precisa armazenar todo o estado com cada bloco, mas na realidade a eficiência deve ser comparável ao Bitcoin. A razão é que o estado é armazenado na estrutura de árvore e, após cada bloco, somente uma pequena parte da árvore precisa ser alterada. Assim, em geral, entre dois blocos adjacentes a maior parte da árvore é a mesma e os dados podem ser armazenados uma vez e referenciados duas vezes usando indicadores (ou seja, hashes de árvores). Um tipo especial de árvore conhecido como "Árvore Patricia" é usado para fazer isso, incluindo uma modificação no conceito de árvore Merkle que permite a inserção e exclusão de nós, e não apenas a alteração, de forma eficiente. Além disso, como todas as informações de estado fazem parte do último bloco, não é preciso armazenar todo o histórico da blockchain. Se essa estratégia pudesse ser aplicada ao Bitcoin, poderia ser calculada para fornecer de 5 a 20 vezes mais economia de espaço.

Uma pergunta comum é "onde" o código do contrato é executado, em termos de hardware físico. A resposta é simples: o processo de execução do código do contrato faz parte da definição da função de transição de estado, a qual faz parte do algoritmo de validação do bloco. Então, se uma transação for adicionada ao bloco `B`, o código de execução gerado por essa transação será executado por todos os nós, agora e no futuro, que baixam e validam blocos `B`.

## Aplicações {#applications}

Em geral, existem três tipos de aplicações em cima da Ethereum. A primeira categoria são aplicações financeiras que oferecem aos usuários formas mais poderosas de gerenciar e celebrar contratos usando dinheiro. Isso inclui submoedas, derivados financeiros, contratos de cobertura (hedge), carteiras de poupança e até mesmo algumas classes de contratos de trabalho inteiros. A segunda categoria é de aplicações semi-financeiras, onde há dinheiro envolvido, mas também há um lado não monetário pesado no que está sendo feito. Um exemplo perfeito são as recompensas autoimpostas para soluções de problemas computacionais. Por fim, existem aplicações que não são financeiras, como votações on-line e governança descentralizada.

### Sistemas de tokens {#token-systems}

Os sistemas de tokens na blockchain tem muitas aplicações que vão desde submoedas que representam ativos como USD ou outro, até ações de empresas, tokens individuais representando propriedades inteligentes, cupons seguros infalsificáveis e até mesmo sistemas de tokens sem nenhuma ligação com valores convencionais, usados como sistemas de pontos de incentivo. Sistemas de token são muito fáceis de implementar na Ethereum. O ponto chave a entender é que toda moeda, ou sistema de token, fundamentalmente é um banco de dados com uma operação: subtrair X unidades de A e dar X unidades a B, com a condição que (i) A tenha pelo menos X unidades antes da transação e (ii) a transação seja aprovada por A. Para implementar um sistema de token, só é preciso usar essa lógica em um contrato.

O código básico para implementar um sistema de token em Serpent é assim:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Essa é essencialmente uma implementação literal da função de transição de estado do "sistema bancário", descrita mais adiante neste documento. Algumas linhas de código precisam ser adicionadas para fornecer a etapa inicial de distribuição das unidades de moeda no primeiro caso e em alguns outros casos extremos, e o ideal é que uma função seja adicionada para permitir que outros contratos consultem o saldo de um endereço. Basicamente, é isso. Em teoria, sistemas de token baseados em Ethereum que atuam como submoedas podem potencialmente incluir outras funcionalidades importantes que as meta-moedas baseadas em Bitcoin dentro da cadeia (on-chain) não têm: a habilidade de pagar taxas de transações diretamente naquela moeda. Isso poderia ser implementado assim: o contrato seria mantido com o saldo em ether, com o qual reembolsaria o ether usado para pagar taxas ao remetente, e reabasteceria esse saldo coletando as unidades monetárias internas que recebe em taxas e revendendo-as em um leilão em execução constante. Os usuários precisariam "ativar" suas contas com ether, mas uma vez que o ether esteja lá, seria reutilizável porque o contrato o reembolsaria toda vez.

### Derivativos financeiros e moedas estáveis {#financial-derivatives-and-stable-value-currencies}

Os derivativos financeiros são a aplicação mais comum de um "contrato inteligente", e uma das mais simples de implementar em código. O principal desafio na implementação de contratos financeiros é que a maioria deles exige uma referência de preço (price ticker) externa. Por exemplo, uma aplicação muito desejável é um contrato inteligente que protege contra a volatilidade do ether (ou outra criptomoeda) em relação ao dólar americano, mas isso exige que o contrato saiba qual é o valor do EHT/USD. A maneira mais simples de fazer isso seria por meio de um contrato de "feed de dados" mantido por um terceiro específico (por exemplo, NASDAQ) projetado para que esse terceiro tenha a capacidade de atualizar o contrato conforme necessário, e fornecendo uma interface que permite outros contratos enviem uma mensagem para esse contrato e recebam uma resposta que forneça o preço.

Dado esse ingrediente muito importante, o contrato de cobertura ficaria assim:

1. Aguarde até que a parte A forneça ETH 1.000.
2. Aguarde até que a parte B forneça ETH 1.000.
3. Registre o valor em USD de 1000 ether, calculado consultando o contrato de feed de dados em armazenamento. Digamos que seja $x.
4. Após 30 dias, permita que A ou B "reative" o contrato para enviar $x de ether (calculado por consulta do contrato do data feed novamente para obter o novo preço) para A e o restante para B.

Esse contrato teria um potencial significativo no comércio de criptomoedas. Um dos principais problemas citados sobre as criptomoedas é a volatilidade. Embora muitos usuários e comerciantes possam querer a segurança e a conveniência de lidar com ativos criptográficos, muitos não desejam enfrentar a perspectiva de perder 23% do valor dos seus fundos em um único dia. Até agora, a solução proposta mais comum tem sido os ativos garantidos pelo emissor. A ideia é que um emissor crie uma submoeda na qual tenha o direito de emitir e revogar unidades, e fornecer uma unidade de moeda a qualquer pessoa que forneça (offline) uma unidade de um ativo subjacente especificado (por exemplo, ouro, dólares). O emissor então promete fornecer uma unidade do ativo subjacente para qualquer pessoa que devolva uma unidade do ativo criptográfico. Este mecanismo permite que qualquer ativo não criptográfico seja "elevado" a ativo criptográfico, desde que o emissor seja confiável.

Na prática, porém, os emissores nem sempre são confiáveis e, em alguns casos, a infraestrutura bancária é muito fraca ou muito hostil, para que tais serviços existam. Os derivativos financeiros oferecem uma alternativa. Aqui, em vez de um único emissor fornecendo os fundos para servirem de backup de um ativo, um mercado descentralizado de especuladores, apostando que o preço de um ativo de referência criptográfica (por exemplo, ETH) vai subir, desempenha esse papel. Ao contrário dos emissores, especuladores não tem opção de inadimplência do seu lado da negociação, porque o contrato de redução de riscos usa os fundos como garantia. Observe que esta abordagem não é totalmente descentralizada, porque uma fonte confiável ainda é necessária para fornecer a referência de preço (price ticker), embora ainda assim, esta seja (discutivelmente) uma grande melhoria em termos de redução dos requisitos de infraestrutura (ao contrário de ser um emissor, a emissão de um feed de preços não requer licenças e provavelmente pode ser categorizada como liberdade de expressão) e de fraudes.

### Sistemas de identidade e reputação {#identity-and-reputation-systems}

A primeira criptomoeda alternativa, o [Namecoin](http://namecoin.org/), tentou usar uma blockchain semelhante ao Bitcoin, para fornecer um sistema de registro de nomes, em que os usuários podem registrar seus nomes em uma base de dados pública juntamente com outros dados. O mais citado caso de uso é para um sistema de [DNS](https://wikipedia.org/wiki/Domain_Name_System), mapeando nomes de domínio como "bitcoin.org" (ou, no caso do Namecoin, "bitcoin.bit") para um endereço de IP. Outros casos de uso incluem autenticação de e-mail e sistemas de reputação mais avançados em potencial. Aqui está o contrato básico para fornecer um sistema de registro de nomes semelhante ao Namecoin no Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

O contrato é muito simples; é apenas um banco de dados dentro da rede Ethereum que pode ser adicionado, mas não modificado ou removido. Qualquer um pode registrar um nome com algum valor, e esse registro então fica para sempre. Um contrato de registro de nome mais sofisticado também terá uma "cláusula de função" permitindo que outros contratos o consultem, bem como um mecanismo para o "proprietário" (por exemplo, o primeiro registrador) de um nome para alterar os dados ou transferir a propriedade. Pode-se até adicionar reputação e funcionalidade Web of Trust.

### Armazenamento descentralizado de arquivo {#decentralized-file-storage}

Nos últimos anos, surgiram várias startups de armazenamento de arquivo on-line. A mais conhecida é o Dropbox, que permite que os usuários enviem um backup de seus discos rígidos, os quais são armazenados no serviço e ficam disponíveis para o usuário em troca de uma taxa mensal. No entanto, o mercado de armazenamento de arquivos agora é relativamente ineficiente. Uma rápida olhada em várias soluções existentes mostra que, particularmente no "vale da estranheza" de 20-200 GB, em que nem cotas gratuitas nem descontos a nível corporativo fazem efeito, os custos de armazenamento de arquivos em um plano mensal comum são tantos que você está pagando mais que o custo de todo o disco rígido em um único mês. Contratos Ethereum podem permitir o desenvolvimento de um ecossistema de armazenamento descentralizado de arquivos, em que usuários individuais podem ganhar pequenas quantidades de dinheiro alugando seus próprios discos rígidos e espaços não utilizados podem ser usados para reduzir ainda mais os custos de armazenamento de arquivos.

A peça-chave base de tal dispositivo seria o que chamamos de "contrato Dropbox descentralizado". Esse contrato funciona da seguinte maneira. Primeiro, divide-se os dados desejados em blocos, criptografando cada bloco para fins de privacidade e constrói uma árvore Merkle a partir deles. Faz-se então um contrato com a regra de que, a cada N blocos, o contrato escolheria um índice aleatório da árvore de Merkle (usando o hash do bloco anterior, acessível no código do contrato, como fonte de aleatoriedade) e daria X ether para a primeira entidade a fornecer uma transação com uma verificação simplificada de pagamento semelhante à prova de propriedade do bloco naquele índice particular da árvore. Quando um usuário deseja baixar seu arquivo, ele pode usar um protocolo de canal de micropagamento (por exemplo, pagar 1 szabo por 32 kilobytes) para recuperar o arquivo. A abordagem mais eficiente em termos de taxa é que o pagador não publique a transação até o final, e sim substitua a transação por uma um pouco mais lucrativa pelo mesmo nonce a cada 32 kilobytes.

Uma característica importante do protocolo é que, embora pareça que se está confiando em muitos nós aleatórios para não decidirem esquecer o arquivo, pode-se reduzir o risco para quase zero dividindo o arquivo em várias partes por compartilhamento secreto, e observando os contratos para ver cada peça que ainda está sob a posse de algum nó. Se o contrato ainda está pagando dinheiro, isso fornece uma prova criptográfica de que alguém ainda está armazenando o arquivo.

### Organização autônoma descentralizada {#decentralized-autonomous-organizations}

O conceito geral de "organização autônoma descentralizada" (DAO, na sigla em inglês) é o de uma entidade virtual que possui um determinado conjunto de membros ou acionistas que, talvez com uma maioria de 67%, tem o direito de gastar os fundos da entidade e modificar seu código. Os membros decidem coletivamente como a organização deve alocar seus fundos. Os métodos para alocar os fundos de uma DAO podem variar de recompensas e salários a mecanismos ainda mais exóticos, como uma moeda interna para recompensar trabalho. Isto replica as armadilhas legais de uma empresa tradicional ou sem fins lucrativos, mas usando apenas a tecnologia blockchain criptográfica para implementação. Até agora, muito da discussão sobre DAOs tem sido em torno do modelo "capitalista" de uma "corporação descentralizada autônoma" (DAC, na sigla em inglês), com acionistas que recebem dividendos e ações negociáveis. Uma alternativa, descrita como talvez uma "comunidade autônoma descentralizada", seria todos os membros tendo uma participação igual na tomada de decisão e exigiria que 67% dos membros concordassem em adicionar ou remover um membro. A exigência de que uma pessoa só pode ter uma associação precisaria ser imposta coletivamente pelo grupo.

Um esboço geral de como codificar uma DAO é o seguinte: o design mais simples é apenas uma peça de código automodificável que muda se dois terços dos membros concordam. Embora o código teoricamente seja imutável, é fácil contornar isso e ter mutabilidade de fato. Basta colocar partes do código em contratos separados, e salvar no armazenamento modificável o endereço de quais contratos chamar. Em uma implementação simples desse contrato DAO, haveria três tipos de transação, distinguidos pelos dados fornecidos na transação:

- `[0,i,K,V]` para registrar uma proposta com índice `i` para alterar o endereço de índice do armazenamento `K` para o valor `V`
- `[1,i]` para registrar um voto a favor da proposta `i`
- `[2,i]` para finalizar a proposta `i` se houver votos suficientes

O contrato teria, então, cláusulas para cada uma dessas transações. Ele manteria um registro de todas as mudanças no armazenamento aberto, e uma lista de quem votou nelas. Haveria também uma lista de todos os membros. Quando qualquer alteração de armazenamento chega a dois terços dos membros votando nela, uma transação finalizada poderia executar a mudança. Um esqueleto mais sofisticado também teria a capacidade de votação integrada para recursos, como enviar uma transação, adicionar e remover membros, e poderia até fornecer uma delegação de votos no estilo [Democracia Líquida](https://wikipedia.org/wiki/Liquid_democracy) (ou seja, qualquer pessoa pode designar alguém para votar em seu lugar, e a designação é transitiva: se A designa B e B designa C, então C determina o voto de A). Este desenho faria a DAO crescer de forma orgânica como comunidade descentralizada, permitindo que pessoas eventualmente delegassem a tarefa de filtrar quem é um membro a especialistas, diferente do "sistema atual" em que especialistas podem aparecer e desaparecer ao longo do tempo à medida que os membros individuais da comunidade mudam seus alinhamentos.

Um modelo alternativo seria o de empresa descentralizada, onde qualquer conta pode ter zero ou mais ações, e dois terços das ações são necessários para se tomar uma decisão. Um esqueleto completo envolveria a funcionalidade de gerenciamento de ativos, a capacidade de fazer uma oferta de compra ou venda de ações, e a capacidade de aceitar ofertas (de preferência com um mecanismo de correspondência de pedidos dentro do contrato). A delegação também existiria no estilo democracia líquida, generalizando o conceito de "conselho de administração".

### Outras aplicações {#further-applications}

**1. Carteiras de poupança**. Suponha que Alice queira proteger seus fundos, mas tem medo de perder sua chave privada ou que ela seja hackeada. Ela faz um contrato em ether com Bob, um banco, da seguinte forma:

- Só Alice pode retirar no máximo 1% de fundos por dia.
- Bob pode retirar no máximo 1% de fundos por dia, mas Alice tem o poder de fazer uma transação com sua chave e desativar essa capacidade.
- Alice e Bob juntos podem retirar tudo o que quiserem.

Normalmente, 1% por dia é suficiente para Alice, e, se ela quiser tirar mais, pode entrar em contato com Bob. Se a chave da Alice for hackeada, ela corre para pedir que Bob transfira os fundos para um novo contrato. Se ela perder sua chave, Bob conseguirá retirar os fundos em algum momento. Se Bob for mal-intencionado, então Alice poderá desativar a capacidade de retirada dele.

**2. Seguro de safra**. É fácil fazer um contrato de derivativos financeiros, mas usando um feed de dados meteorológicos em vez de um índice de preços. Se um agricultor em lowa compra um derivativo que paga inversamente com base na precipitação em lowa. Se houver uma seca, o agricultor receberá dinheiro automaticamente e, se chover, o agricultor ficará feliz porque suas colheitas serão boas. Isso pode se expandir o para seguros contra desastres naturais em geral.

**3. Um feed de dados descentralizado**. Para contratos financeiros por diferença, pode ser possível descentralizar o feed de dados por meio de um protocolo chamado "[SchellingCoin](http://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/)". O SchellingCoin funciona da seguinte forma: N partes colocam dentro do sistema o valor de um dado (exemplo, o preço ETH/USD), os valores são organizados, e todos entre o percentil 25 e 75 ganham um token como recompensa. Todo mundo é incentivado a fornecer a resposta que todos os outros fornecerão, e o único valor que um grande número de jogadores poderá concordar é o padrão óbvio: a verdade. Isto cria um protocolo descentralizado que teoricamente pode fornecer qualquer número de valores, incluindo o preço ETH/USD, a temperatura em Berlim ou até mesmo o resultado de um cálculo difícil.

**4. Abertura de contas de garantia com múltiplas assinaturas**. O Bitcoin permite contratos de transação de múltiplas assinaturas onde, por exemplo, três em cada cinco chaves podem gastar os fundos. O Ethereum permite mais granularidade; por exemplo, quatro em cada 5 podem gastar tudo, três em cada cinco podem gastar até 10% por dia e dois em cada cinco podem gastar até 0.5% por dia. Além disso, o recurso de assinaturas múltiplas no Ethereum é assíncrono: duas partes podem registrar suas assinaturas na blockchain em momentos diferentes e a última assinatura enviará automaticamente a transação.

**5. Computação em nuvem**. A tecnologia EVM também pode ser usada para criar um ambiente de computação verificável, permitindo que os usuários solicitem a outros que realizem cálculos e, opcionalmente, peçam prova de que os cálculos em determinados pontos de verificação selecionados aleatoriamente foram feitos corretamente. Isso permite a criação de um mercado de computação em nuvem em que qualquer usuário pode participar com seu computador, laptop ou servidor especializado, e verificações pontuais aliadas a depósitos de segurança possam ser usados para garantir que o sistema seja confiável (ou seja, nós não podemos trapacear para gerar lucro). Embora tal sistema possa não ser adequado para todas as tarefas, as que, por exemplo, exigem um alto nível de comunicação entre processos, não podem ser feitas facilmente em uma grande nuvem de nós. Outras tarefas, no entanto, são muito mais fáceis de paralelizar. Projetos como o SETI@gome, o folding@home e algoritmos genéticos podem facilmente ser implementados em cima dessa plataforma.

**6. Jogos de azar peer-to-peer**. Qualquer número de protocolos de jogos de azar peer-to-peer, como o [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) de Frank Stajano e Richard Clayton's, pode ser implementado na blockchain do Ethereum. O protocolo de jogo mais simples é, na verdade, apenas um contrato por diferenças no próximo hash do bloco, e protocolos mais avançados podem ser construídos a partir dali, criando serviços de jogos com quase nenhuma taxa e que não podem trapacear.

**7. Mercados de previsões**. Mercados de previsões também são fáceis de implementar com oráculos ou usando o SchellingCoin, e mercados de previsões aliados ao SchellingCoin podem vir a ser a primeira aplicação de [futarchy](http://hanson.gmu.edu/futarchy.html) como protocolo de governança para organizações descentralizadas.

**8. Mercados descentralizados dentro da cadeia (on-chain)** usando o sistema de identidade e reputação como base.

## Preocupações e outras questões {#miscellanea-and-concerns}

### Implementação GHOST modificada {#modified-ghost-implementation}

O protocolo "subárvore mais observada gananciosa" (GHOST, na sigla em inglês) é uma inovação apresentada pela primeira vez por Yonatan Sompolinsky e Aviv Zohar em [dezembro de 2013](https://eprint.iacr.org/2013/881.pdf). A motivação por trás do GHOST é que blockchains com tempos de confirmação rápidos atualmente sofrem com diminuição da segurança devido a uma alta taxa de obsolescência, porque os blocos levam um certo tempo para se propagar pela rede. Se o minerador A minerar um bloco e então o minerador B minerar outro bloco, antes do minerador A propagar o bloco para B, o bloco do minerador B acabará sendo desperdiçado e não contribuirá para segurança da rede. Além disso, há um problema de centralização: se o minerador A está minerando o pool com 30% de hashpower (poder de mineração) e B tem 10% de hashpower, A terá um risco de produzir um bloco obsoleto 70% do tempo (já que, nos outros 30% do tempo, A produziu o último bloco e, portanto, obterá os dados de mineração imediatamente), enquanto B terá o risco de produzir um bloco obsoleto 90% das vezes. Assim, se o intervalo de bloco for curto o suficiente para que a taxa de obsolescência seja alta, A será muito mais eficiente graças apenas a seu tamanho. Com estes dois efeitos combinados, é muito provável que blockchains que produzem blocos rapidamente criem um pool de mineração com alto percentual de hashpower de rede, o suficiente para controlar o processo de mineração.

Como descrito por Sompolinsky e Zohar, o GHOST resolve o primeiro problema de perda de segurança incluindo blocos obsoletos no cálculo da cadeia que for "mais longa": não apenas o pai e outros ancestrais de um bloco, mas também descendentes obsoletos do bloco ancestral (no jargão Ethereum, "tios"), são adicionados ao cálculo de qual bloco tem a maior prova de trabalho. Para resolver o segundo problema (o de centralização), vamos além do protocolo descrito por Sompolinsky e Zohar, e fornecemos recompensas por obsolescência: um bloco obsoleto recebe 87,5% de sua recompensa base e o sobrinho que inclui o bloco obsoleto recebe os 12,5% restantes. As taxas de transação, no entanto, não são concedidas aos tios.

O Ethereum implementa uma versão simplificada de GHOST que só desce sete níveis. Especificamente, se define da seguinte forma:

- Um bloco deve especificar um pai, e deve especificar 0 ou mais tios
- Um tio incluído em no bloco B deve ter as seguintes propriedades:
  - Deve ser um filho direto do ancestral da k-ésima geração de B, onde `2 <= k <= 7`.
  - Não pode ser um ancestral de B
  - Um tio deve ser um cabeçalho de bloco válido, mas não precisa ser um bloco previamente verificado ou até mesmo válido
  - Um tio deve ser diferente de todos os tios incluídos nos blocos anteriores e de todos os outros tios incluídos no mesmo bloco (inclusão não dupla)
- Para todo tio U no bloco B, o minerador B recebe 3,125% a mais adicionados à sua recompensa de moedas e o minerador de U recebe 93,75% de uma recompensa padrão de moedas.

Esta versão limitada de GHOST, com tios incluídos apenas até 7 gerações, foi usada por duas razões. A primeira é que GHOST ilimitado complicaria muito mais o cálculo de quais tios são validos para um determinado bloco. A segunda é que GHOST ilimitado com compensação, conforme usado no Ethereum, tira o incentivo do minerador de minerar na cadeia principal e não na cadeia de um invasor público.

### Taxas {#fees}

Como cada transação publicada na blockchain impõe à rede os custos de download e verificação, há a necessidade para algum mecanismo regulatório, normalmente envolvendo taxas de transação, para evitar abusos. A abordagem padrão, usada no Bitcoin, é ter taxas voluntárias e contar com os mineradores para atuarem como guardiões e definir dinâmicas mínimas. Esta abordagem foi muito bem recebida na comunidade Bitcoin, principalmente porque é "baseada no mercado", permitindo que a oferta e a demanda entre os mineradores e os remetentes das transações determinem os preços. O problema dessa linha de raciocínio é que o processamento da transação não é um mercado. Embora seja muito atraente interpretar o processamento de transações como um serviço que o minerador está oferecendo para o remetente, na realidade todas as transações que um minerador inclui precisarão ser processadas por todos os nós na rede, então, a maior parte do custo de processamento da transação é suportada por terceiros e não pelo minerador que está tomando a decisão de incluí-lo ou não. Portanto, é muito provável que haja uma "tragédia dos bens comuns".

No entanto, ao dar a essa falha no mecanismo baseado no mercado uma específica suposição imprecisa simplificada, se cancela. Veja a seguir o argumento. Suponha que:

1. Uma transação leva a `k` operações, oferecendo a recompensa `kR` para qualquer minerador que a inclui onde `R` é definido pelo remetente e `k` e `R` estão (mais ou menos visíveis) para o minerador antes
2. Uma operação tem o custo de processamento de `C` para qualquer nó (ou seja, todos os nós têm a mesma eficiência)
3. Existem `N` nós de mineração, cada um com o mesmo poder de processamento (ou seja, `1/N` do total)
4. Não existem nós completos não minerados

Um minerador estaria disposto a processar uma transação se a recompensa fosse maior do que o custo. Assim, a recompensa esperada é `kR/N` já que o minerador tem `1/N` de chance de processar o próximo bloco, e o custo de processamento para o minerador é simplesmente `kC`. Assim, os mineradores incluirão transações em que `kR/N > kC` ou `R > NC`. Observe que `R` é a taxa por operação fornecida pelo remetente e, portanto, é um limite inferior do benefício que o remetente obtém da transação, e `NC` é o custo para toda a rede processar uma operação. Assim, mineradores tem incentivo de incluir apenas as transações em que o benefício utilitário total excede o custo.

No entanto, há vários desvios importantes dessas suposições:

1. O minerador realmente paga um custo maior para processar a transação do que os outros nós de verificação, já que o tempo extra de verificação atrasa a propagação de blocos e, assim, aumenta a probabilidade do bloco se tornar obsoleto.
2. Nós completos não minerados existem.
3. A distribuição do poder de mineração pode acabar sendo radicalmente desigual na prática.
4. Especuladores, inimigos políticos e vândalos que se prestam a causar danos à rede existem, e eles podem estabelecer contratos onde o custo é muito menor do que o custo pago por outros nós de verificação.

(1) fornece uma tendência para o minerador incluir menos transações, e (2) aumenta `NC`. Portanto, esses dois efeitos pelo menos parcialmente cancelam um ao outro.<sup>[Como?](https://github.com/ethereum/wiki/issues/447#issuecomment-316972260)</sup> (3) e (4) são o grande problema. Para resolvê-lo, simplesmente instituímos um limite flutuante: nenhum bloco pode ter mais operações do que `BLK_LIMIT_FACTOR` vezes a média móvel exponencial de longo prazo. Especificamente:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` e `EMA_FACTOR` são constantes que serão definidas como 65536 e 1,5 por enquanto, mas provavelmente serão alteradas após uma análise mais aprofundada.

Grandes tamanhos de blocos em Bitcoin não compensam por mais outro fator: blocos grandes levam mais tempo para se propagar e, portanto, têm maior probabilidade de se tornarem obsoletos. No Ethereum, blocos com alto consumo de gas também podem levar mais tempo para propagar, porque são fisicamente maiores e demoram mais para processar as transições de estado da transação para validar. Este atraso é uma questão significativa no Bitcoin, mas nem tanto no Ethereum por causa do protocolo GHOST. Por isso, depender de limites de blocos regulados oferece uma linha de base mais estável.

### Cálculo e completude de Turing {#computation-and-turing-completeness}

A máquina virtual Ethereum é Turing-completa. Isso significa que o código EVM pode codificar qualquer computação que possa teoricamente ser executada, incluindo loops infinitos. Código EVM permite loops de duas maneiras. Primeiro, há uma instrução `JUMP` que permite que o programa volte para um ponto anterior no código e uma instrução `JUMPI` para fazer saltos condicionais, permitindo sentenças como `while x < 27: x = x * 2`. Segundo, contratos podem chamar outro contratos, permitindo loops ao menos em potencial por meio de recursão. Isso leva a um problema: usuários mal-intencionados podem desligar mineradores e nós completos, forçando-os a entrar em um loop infinito? Essa questão surge por causa de um problema em ciência da computação conhecido como o "problema da parada": não há como dizer se um determinado programa vai parar ou não.

Conforme descrito na seção de transição de estado, nossa solução funciona exigindo que uma transação defina um número máximo de etapas computacionais que ela pode executar e, se a execução demorar mais, a computação é revertida, mas as taxas ainda são pagas. As mensagens funcionam da mesma forma. Para mostrar a lógica da nossa solução, veja os seguintes exemplos:

- Um invasor cria um contrato que executa um loop infinito e, em seguida, envia uma transação ativando esse loop para o minerador. O minerador processará a transação, executando o loop infinito, e aguardará até que ela fique sem gas. Mesmo que a execução fique sem gas e pare no meio do caminho, a transação ainda é válida e o minerador reivindica a taxa do invasor para cada etapa computacional.
- Um invasor cria um loop infinito muito longo com a intenção de forçar o minerador a continuar computando por tanto tempo que, quando a computação terminar, mais alguns blocos terão surgido e não será possível para o minerador incluir a transação para reivindicar a taxa. No entanto, o invasor será obrigado a determinar um valor para `STARTGAS` limitando o número de etapas computacionais que a execução pode fazer, para que o minerador saiba com antecedência que a computação levará um número muito grande de etapas.
- Um invasor vê um contrato com um código como `send(A,contract.storage[A]); contract.storage[A] = 0`, e envia uma transação com gas o suficiente para executar a primeira etapa, mas não a segunda (ou seja, fazendo uma retirada mas sem deixar diminuir o saldo). O autor do contrato não precisa se preocupar em se proteger contra ataques assim porque, se a execução parar no meio do caminho, as mudanças são revertidas.
- Um contrato financeiro funciona tomando a mediana de nove feeds de dados proprietários para minimizar o risco. Um invasor controla um dos feed de dados, que é projetado para ser modificável por meio do mecanismo de chamada por endereço-variável descrito na seção sobre DAOs, e o converte para rodar um loop infinito, forçando assim qualquer tentativa de reivindicar fundos do contrato financeiro a ficar sem gas. Porém, o contrato financeiro pode definir um limite de gas na mensagem para prevenir este problema.

A alternativa para completude de Turing é a incompletude de Turing, em que `JUMP` e `JUMPI` não existem e apenas uma cópia de cada contrato pode existir no stack de chamadas em dado momento. Com esse sistema, o sistema de taxas descrito e as incertezas em torno da eficácia de nossa solução podem não ser necessárias, pois o custo de executar um contrato seria limitado por seu tamanho. Alpem disso, a incompletude deTuring não é uma limitação tão grande. De todos os exemplos de contrato que concebemos internamente, até agora apenas um precisou de um loop, e mesmo esse loop poderia ser removido fazendo 26 repetições de um pedaço de linha de código. Dadas as sérias implicações da completude de Turing e o benefício limitado, por que não simplesmente ter uma linguagem Turing incompleta? Na verdade, porém, a incompletude de Turing está longe de ser uma solução perfeita para o problema. Para entender o porquê, considere os seguintes contratos:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (execute um passo de um programa e grave a mudança no armazenamento)
```

Agora, envie uma transação para A. Assim, em 51 transações, temos um contrato que leva até 2<sup>50</sup> etapas computacionais. Mineradores podem tentar detectar tais bombas lógicas antes do tempo mantendo um valor ao lado de cada contrato, especificando o número máximo de etapas computacionais que podem levar, e calculando isto para contratos chamando outros contratos recursivamente, mas isso exigiria que os mineradores proibissem contratos que criassem outros contratos (já que a criação e execução de todos os 26 contratos acima poderiam ser facilmente reunidas em um único contrato). Outro ponto problemático é que o campo de endereço de uma mensagem é uma variável, então no geral pode nem ser possível dizer quais outros contratos um determinado contrato chamará antecipadamente. Assim, no fim das contas, temos uma conclusão surpreendente: a completude de Turing é muito fácil de gerenciar na mesma medida em que a falta de completude de Turing é muito difícil de gerenciar a menos que exatamente os mesmos controles estejam em vigor. Já que é assim, por que não deixar o protocolo ser completo de Turing?

### Moedas e emissão {#currency-and-issuance}

A rede Ethereum tem sua própria moeda integrada, o ether, que foi pensado para oferecer uma camada de liquidez primária que permite a troca eficiente entre vários tipos de ativos digitais e, o mais importante, um mecanismo para pagar taxas de transação. Para conveniência e para evitar discussões futuras (veja o atual debate mBTC/uBTC/satoshi no Bitcoin), as denominações serão pré-rotuladas:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>3</sup>wei = 1 ether

Isso pode ser entendido como uma versão expandida do conceito de "dólares" e "centavos" ou "BTC" e "satohis". Em um futuro próximo, esperamos que o "ether" seja usado para transações comuns, "finney" para microtransações e "szabo" e "wei" para discussões técnicas sobre taxas e implementações de protocolo. As outras denominações serão úteis depois e não devem ser incluídas nos clientes neste momento.

O modelo de emissão será o seguinte:

- O Ether será lançado em uma venda de moeda ao preço de 1000-2000 ether por BTC, um mecanismo destinado a financiar a organização Ethereum e pagar pelo desenvolvimento que foi usado com sucesso por outras plataformas, como Mastercoin e NXT. Compras antecipadas terão descontos maiores. O BTC recebido pela venda será usado inteiramente para pagar salários e recompensas aos desenvolvedores e investido em vários projetos com e sem fim lucrativos, no Ethereum e no ecossistema das criptomoedas.
- 0.099x o valor total vendido (ETC 60102216) será alocado à organização para compensar os colaboradores iniciais e pagar as despesas denominadas em ETH antes do bloco de início (bloco #0).
- 0,099 vezes o valor total vendido será mantido como reserva de longo prazo.
- 0,26 vezes o valor total vendido será alocado aos mineradores por ano para sempre após esse ponto.

| Grupo                         | No lançamento | Depois de 1 ano | Depois de 5 anos |
| ----------------------------- | ------------- | --------------- | ---------------- |
| Unidades de moeda             | 1,198 X       | 1,458 X         | 2,498 X          |
| Compradores                   | 83,5%         | 68,6%           | 40,0%            |
| Reserva gasta antes da venda  | 8,26%         | 6,79%           | 3,96%            |
| Reserva usada depois da venda | 8,26%         | 6,79%           | 3,96%            |
| Mineradores                   | 0%            | 17,8%           | 52,0%            |

#### Taxa de crescimento do fornecimento de longo prazo (porcentagem)

![Fundação Ethereum](./ethereum-inflation.png)

_Apesar da emissão linear da moeda, assim como com o Bitcoin, ao longo do tempo a taxa de crescimento da oferta tende a zero._

As duas principais opções no modelo acima são (1) a existência e o tamanho de um pool de doações e (2) a existência de uma oferta de crescimento linear permanente, em vez de uma oferta limitada como no Bitcoin. A justificativa do pool de doações é a seguinte. se o pool de doações não existisse e a emissão linear fosse reduzida a 0,217x para fornecer a mesma taxa de inflação, então a quantidade total de ether seria 16,5% menor e então cada unidade seria 19,8% mais valiosa. Assim, no equilíbrio de 19,8%, mais ether seria comprado na venda, então cada unidade voltaria a ter exatamente o mesmo valor de antes. A organização teria então também 1,198% mais BTC, que provavelmente será dividido em duas fatias: o BTC original e o adicional de 0,198x. Assim, a situação equivale _exatamente_ à doação, mas com uma importante diferença: a organização possui apenas BTC, e portanto, não é incentivada a apoiar o valor da unidade ether.

O modelo linear permanente de crescimento da oferta (de moeda) reduz o risco do que alguns veem como uma excessiva concentração de riqueza em Bitcoin, e dá aos indivíduos, agora e no futuro, uma chance justa de adquirir unidades da moeda, enquanto mantém um forte incentivo para obter e manter ether, porque a "taxa de crescimento da oferta" como porcentagem ainda tende a zero ao longo do tempo. Também teorizamos isso porque as moedas sempre se perdem ao longo do tempo devido a descuidos, morte etc, e a perda de moedas pode ser modelada como uma porcentagem da oferta total por ano, que a oferta total de moedas em circulação acabará por estabilizar num valor igual à emissão anual dividida pela taxa de perda (por exemplo, a uma taxa de perda de 1%, quando a oferta atingir 26x então 0,26x será minerado e 0,26x perdido todo ano, criando um equilíbrio).

No futuro, é provável que o Ethereum mude para um modelo de prova de participação (proof of stake) por motivos de segurança, reduzindo o requisito de emissão para algo entre zero e 0.05x por ano. Caso a organização Ethereum perca financiamento ou desapareça por qualquer outra razão, deixamos em aberto um "contrato social": qualquer pessoa tem o direito de criar uma candidata a futura versão do Ethereum, com a única condição de que a quantidade de ether seja no máximo ou igual a `60102216 * (1.198 + 0.26 * n)` em que `n` é o número de anos após o bloco de início. Criadores podem vender em massa ou atribuir parte ou toda a diferença entre a expansão de oferta orientada por PoS e a expansão de oferta máxima permitida para pagar pelo desenvolvimento. Candidatos a atualizações que não estejam em conformidade com o contrato social podem ser justificadamente desmembrados em versões que estejam.

### Centralização de mineração {#mining-centralization}

O algoritmo de mineração do Bitcoin funciona fazendo os mineradores calcularem SHA256 em versões ligeiramente modificadas do cabeçalho do bloco milhões de vezes, até que um nó apareça com uma versão cujo hash é menor que o alvo (atualmente em torno de 2<sup>192</sup>). No entanto, este algoritmo de mineração é vulnerável a duas formas de centralização. Primeiro, o ecossistema de mineração passou a ser dominado por ASICs (circuitos integrados de aplicação específica), chips de computador projetados e, portanto, milhares de vezes mais eficientes na tarefa específica de minerar bitcoins. Isso significa que a mineração de Bitcoin não é mais uma busca altamente descentralizada e igualitária. Hoje, ela exige milhões de dólares de capital participar de modo efetivo. Segundo, a maioria dos mineradores de Bitcoin atualmente não realiza validação de bloco localmente. Eles se baseiam na centralização de mineração do pool para fornecer cabeçalhos de bloco. Esse problema é indiscutivelmente o pior: no momento da redação deste artigo, os três principais pools de mineração controlam indiretamente cerca de 50% do poder de processamento da rede do Bitcoin, embora isso seja mitigado pelo fato de que os mineradores podem mudar para outros pools de mineração se um pool ou coalizão tentar um ataque de 51%.

A intenção atual do Ethereum é usar um algoritmo de mineração que obrigue os mineradores a buscar dados aleatórios do estado, calcular algumas transações selecionadas aleatoriamente dos últimos N blocos na blockchain e retornar o hash do resultado. Isso tem dois benefícios importantes. Primeiro, contratos Ethereum pode incluir qualquer tipo de computação, então um Ethereum ASIC seria essencialmente um ASIC para computação geral - ou seja, uma unidade de processamento melhor. Segundo, a mineração requer acesso a toda a blockchain, o que força os mineradores a armazenar toda a blockchain e a pelo menos serem capazes de verificar cada transação. Isso exclui a necessidade de pools de mineração centralizados. Embora os pools de mineração ainda possam cumprir o papel legítimo de nivelar o caráter aleatório da distribuição de recompensas, essa função pode ser igualmente bem atendida por pools peer-to-peer sem controle central.

Esse modelo ainda não foi testado, e talvez apareça alguma dificuldade em evitar certas otimizações inteligentes quando se usa execução de contratos como algoritmo de mineração. No entanto, uma característica interessante desse algoritmo é que ele permite que qualquer pessoa possa "envenenar o poço", introduzindo um grande número de contratos na blockchain projetada especificamente para bloquear certos ASICs. Existem incentivos econômicos para os fabricantes ASIC usarem esse truque para atacar uns aos outros. Assim, a solução que estamos desenvolvendo é, em última análise, uma solução humana econômica adaptativa, e não apenas técnica.

### Escalabilidade {#scalability}

Uma preocupação comum sobre o Ethereum é a questão da escalabilidade. Assim como o Bitcoin, o Ethereum sofre com a falha de que toda transação precisa ser processada por todos os nós da rede. Com o Bitcoin, o tamanho da blockchain atual fica em torno de 15GB, crescendo cerca de 1MB por hora. Se a rede Bitcoin processasse as 2.000 transações da VISA por segundo, cresceria 1MB por três segundos (1 GB por hora, 8 TB por ano). O Ethereum provavelmente terá um padrão de crescimento parecido, agravado pelo fato de que haverá muitas aplicações em cima da blockchain Ethereum, em vez de apenas uma moeda como é no caso do Bitcoin, mas compensado pelo fato de que nós completos do Ethereum só precisam armazenar o estado e não todo o histórico da blockchain.

O problema de uma blockchain tão grande é o risco de centralização. Se o tamanho da blockchain aumentar para, digamos, 100 TB, então provavelmente apenas um número muito pequeno de grandes empresas executará nós completos, com todos os usuários regulares usando nós SPV (Verificação de Pagamento Simplificado) leves. Nessa situação, talvez surja a preocupação de que nós completos possam se unir e concordar em trapacear de alguma forma para lucrar (por exemplo, alterando a recompensa do bloco ou dando BTC a si mesmos). Nós leves não teriam uma maneira de detectar isso imediatamente. É claro que provavelmente pelo menos um nó completo honesto existiria, e depois de algumas horas, as informações sobre a fraude seriam vazadas por canais como o Reddit, mas a essa altura já seria tarde demais: caberia aos usuários comuns organizar um esforço para colocar os blocos na lista de bloqueio, um problema de coordenação enorme e inviável, em uma escala semelhante a realizar um ataque bem-sucedido de 51%. No caso do Bitcoin, isso é um problema atualmente, mas existe uma modificação da blockchain [sugerida por Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/), que vai aliviar a questão.

No curto prazo, o Ethereum usará duas estratégias adicionais para lidar com esse problema. Primeiro, por causa dos algoritmos de mineração baseados em blockchain, pelo menos todo minerador será forçado a ser um nó completo, criando um limite inferior no número de nós completos. Segundo e, no entanto, mais importante, incluiremos uma raiz de árvore de estado intermediário na blockchain após o processamento de cada transação. Mesmo que a validação do bloco seja centralizada, desde que exista um nó de verificação honesto, o problema de centralização poderá ser contornado por meio de um protocolo de verificação. Se um minerador publicar um bloco inválido, esse bloco deverá ou estar mal formatado ou o estado `S[n]` estar incorreto. Como `S[0]` é sabidamente correto, deve haver algum primeiro estado `S[i]` que está incorreto, onde `S[i-1]` é correto. O nó verificador forneceria o índice `i`, juntamente com uma "prova de invalidade" que consiste no subconjunto de nós da árvore Patricia que precisam processar `APPLY(S[i-1],TX[i]) -> S[i]`. Os nós seriam capazes de usar esses nós para executar essa parte da computação, e ver que o `S[i]` gerado não corresponde ao `S[i]` fornecido.

Um outro ataque mais sofisticado envolveria mineradores mal-intencionados publicando blocos incompletos, de modo que as informações completas nem sequer existiriam para determinar se os blocos seriam válidos ou não. A solução é um protocolo de desafio-resposta: os nós de verificação emitem "desafios" na forma de indicadores de transação de destino e, ao receber de um nó, um nó leve trata o bloco como não confiável até que outro nó, seja o minerador ou outro verificador, forneça um subconjunto de nós Patricia como prova de validade.

## Conclusão {#conclusion}

O protocolo Ethereum foi originalmente concebido para ser uma versão melhorada de criptomoeda, fornecendo recursos avançados, como contas de garantia em blockchain, limites de saque, contratos financeiros, mercado de jogos de azar e similares por meio de uma linguagem de programação altamente generalizada. O protocolo Ethereum não lida com as aplicações diretamente, mas a existência de uma linguagem de programação Turing-completa significa que contratos arbitrários podem teoricamente ser criados para qualquer tipo de transação ou aplicação. O mais interessante é que o protocolo Ethereum vai muito além da moeda. Protocolos de armazenamento descentralizado de arquivos, computação descentralizada e mercados de previsão descentralizados, entre dezenas de outros conceitos, têm o potencial de aumentar substancialmente a eficiência da indústria computacional e impulsionar outros protocolos peer-to-peer, adicionando pela primeira vez uma camada econômica. Por fim, há também uma grande variedade de aplicações que não se trata apenas de dinheiro.

O conceito de uma função de transição de estado arbitrária implementada pelo protocolo Ethereum oferece uma plataforma de potencial inigualável. Em vez de ser um protocolo fechado e com unicamente destinado a um conjunto específico de aplicações em armazenamento de dados, jogos de azar ou finanças, o Ethereum foi pensado para ser aberto desde o começo e acreditamos que ele é perfeitamente adequado para servir de base para um grande número de protocolos financeiros e não financeiros nos próximos anos.

## Notas e leituras adicionais {#notes-and-further-reading}

### Observações {#notes}

1. Um leitor mais experiente poderá dizer que, na verdade, um endereço Bitcoin é o hash da chave pública da curva elíptica, e não a chave pública em si. Porém, referir-se ao hash da pubkey como uma chave pública em si é, em termos de criptografia, uma terminologia correta. Isso porque a criptografia do Bitcoin pode ser considerada um algoritmo personalizado de assinatura digital, em que a chave pública consiste no hash do editor ECC, a assinatura consiste na pubkey do ECC concatenada com a assinatura do ECC, e o algoritmo de verificação envolve verificar a pubkey ECC na assinatura do ECC hash pubkey fornecido como uma chave pública e, em seguida, verificar a assinatura ECC contra a publicidade ECC.
2. Tecnicamente, a mediana dos 11 blocos anteriores.
3. Internamente, 2 e "CHARLIE" são números<sup>[fn3](#notes)</sup>, sendo o último em representação big-endian base 256. Os números podem ser pelo menos 0 e no máximo 2<sup>256</sup>-1.

### Leituras adicionais {#further-reading}

1. [Valor intrínseco](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)
2. [Propriedade inteligente](https://en.bitcoin.it/wiki/Smart_Property)
3. [Contratos inteligentes](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Provas de trabalho reutilizáveis](https://nakamotoinstitute.org/finney/rpow/)
6. [Títulos seguros de propriedade com autoridade do dono](https://nakamotoinstitute.org/secure-property-titles/)
7. [Whitepaper sobre Bitcoin](http://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Triângulo de Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Whitepaper sobre moedas coloridas](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Whitepaper sobre Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Empresas autônomas descentralizadas, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Verificação de pagamento simplificado](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Árvores de Merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Árvores Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ e agentes autónomos, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn fala sobre propriedades inteligentes no Festival de Turing](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [Ethereum RLP](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP)
20. [Árvores Ethereum Merkle Patricia](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-Patricia-Tree)
21. [Pedro Todd sobre árvores da soma Merkle](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Para a história do whitepaper, veja [esta wiki](https://github.com/ethereum/wiki/blob/old-before-deleting-all-files-go-to-wiki-wiki-instead/old-whitepaper-for-historical-reference.md)._

_O Ethereum, como muitos projetos de software de código aberto impulsionados pela comunidade, evoluiu desde sua criação. Para saber mais sobre desenvolvimentos recentes do Ethereum e como as mudanças no protocolo são feitas, recomendamos a leitura [deste manual](/learn/)._
