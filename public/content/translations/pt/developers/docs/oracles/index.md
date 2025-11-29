---
title: Oracles
description: Os oráculos fornecem aos smart contracts do Ethereum acesso a dados do mundo real, desbloqueando mais casos de uso e maior valor para os utilizadores.
lang: pt
---

Os oráculos são aplicações que produzem feeds de dados que disponibilizam fontes de dados offchain para a blockchain para smart contracts. Isto é necessário porque os smart contracts baseados no Ethereum não conseguem, por defeito, aceder a informações armazenadas fora da rede da blockchain.

Dar aos smart contracts a capacidade de execução utilizando dados offchain expande a utilidade e o valor das aplicações descentralizadas. Por exemplo, os mercados de previsão onchain dependem de oráculos para fornecer informações sobre resultados que usam para validar as previsões dos utilizadores. Suponha que a Alice aposta 20 ETH em quem se tornará o próximo presidente dos E.U.A. Presidente. Nesse caso, a dapp do mercado de previsão precisa de um oráculo para confirmar os resultados da eleição e determinar se a Alice é elegível para um pagamento.

## Pré-requisitos {#prerequisites}

Esta página pressupõe que o leitor está familiarizado com os fundamentos do Ethereum, incluindo [nós](/developers/docs/nodes-and-clients/), [mecanismos de consenso](/developers/docs/consensus-mechanisms/) e a [EVM](/developers/docs/evm/). Deve também ter um bom conhecimento de [smart contracts](/developers/docs/smart-contracts/) e da [anatomia dos smart contracts](/developers/docs/smart-contracts/anatomy/), especialmente de [eventos](/glossary/#events).

## O que é um oráculo da blockchain? {#what-is-a-blockchain-oracle}

Os oráculos são aplicações que obtêm, verificam e transmitem informação externa (ou seja, informação armazenada offchain) a smart contracts em execução na blockchain. Além de “extrair” dados offchain e transmiti-los no Ethereum, os oráculos também podem “enviar” informações da blockchain para sistemas externos, por exemplo, desbloquear uma fechadura inteligente assim que o utilizador envia uma taxa através de uma transação do Ethereum.

Sem um oráculo, um smart contract estaria inteiramente limitado a dados onchain.

Os oráculos diferem com base na fonte de dados (uma ou várias fontes), nos modelos de confiança (centralizados ou descentralizados) e na arquitetura do sistema (leitura imediata, publicação-subscrição e pedido-resposta). Também podemos distinguir os oráculos com base no facto de recuperarem dados externos para utilização por contratos onchain (oráculos de entrada), enviarem informações da blockchain para as aplicações offchain (oráculos de saída) ou executarem tarefas computacionais offchain (oráculos computacionais).

## Porque é que os smart contracts precisam de oráculos? {#why-do-smart-contracts-need-oracles}

Muitos programadores veem os smart contracts como um código executado em endereços específicos na blockchain. No entanto, uma [visão mais geral dos smart contracts](/smart-contracts/) é que são programas de software autoexecutáveis capazes de impor acordos entre as partes, uma vez que condições específicas sejam cumpridas – daí o termo “smart contracts”.

Mas usar smart contracts para fazer cumprir acordos entre pessoas não é simples, dado que o Ethereum é determinista. Um [sistema determinista](https://en.wikipedia.org/wiki/Deterministic_algorithm) é aquele que produz sempre os mesmos resultados, dado um estado inicial e uma entrada específica, o que significa que não há aleatoriedade ou variação no processo de computação de saídas a partir de entradas.

Para alcançar a execução determinista, as blockchains limitam os nós a alcançar o consenso em questões binárias simples (verdadeiro/falso) usando _apenas_ os dados armazenados na própria blockchain. Exemplos de tais perguntas incluem:

- “O proprietário da conta (identificado por uma chave pública) assinou esta transação com a chave privada emparelhada?”
- “Esta conta tem fundos suficientes para cobrir a transação?”
- “Esta transação é válida no contexto deste smart contract?”, etc.

Se as blockchains recebessem informações de fontes externas (isto é, do mundo real), seria impossível alcançar o determinismo, impedindo os nós de chegarem a um acordo sobre a validade das alterações ao estado da blockchain. Tomemos, por exemplo, um smart contract que executa uma transação com base na taxa de câmbio ETH-USD atual, obtida a partir de uma API de preços tradicional. Este número provavelmente mudará com frequência (sem mencionar que a API pode se tornar obsoleta ou ser pirateada), o que significa que os nós que executam o mesmo código de contrato chegariam a resultados diferentes.

Para uma blockchain pública como o Ethereum, com milhares de nós em todo o mundo a processar transações, o determinismo é fundamental. Sem uma autoridade central que sirva como fonte da verdade, os nós precisam de mecanismos para chegar ao mesmo estado depois de aplicarem as mesmas transações. Um caso em que o nó A executa o código de um smart contract e obtém "3" como resultado, enquanto o nó B obtém "7" depois de executar a mesma transação, faria com que o consenso se rompesse e eliminaria o valor do Ethereum como uma plataforma de computação descentralizada.

Este cenário também destaca o problema de projetar blockchains para extrair informações de fontes externas. Os oráculos, no entanto, resolvem este problema, recolhendo informações de fontes offchain e armazenando-as na blockchain para que os smart contracts as possam consumir. Uma vez que as informações armazenadas onchain são inalteráveis e estão publicamente disponíveis, os nós do Ethereum podem usar com segurança os dados offchain importados do oráculo para computar as alterações de estado sem quebrar o consenso.

Para fazer isso, um oráculo é normalmente composto por um smart contract a ser executado onchain e alguns componentes offchain. O contrato onchain recebe pedidos de dados de outros smart contracts, que passa para o componente offchain (chamado de nó de oráculo). Este nó de oráculo pode consultar fontes de dados — usando, por exemplo, interfaces de programação de aplicações (APIs) — e enviar transações para armazenar os dados solicitados no armazenamento do smart contract.

Essencialmente, um oráculo da blockchain preenche a lacuna de informação entre a blockchain e o ambiente externo, criando “smart contracts híbridos”. Um smart contract híbrido é aquele que funciona com base numa combinação de código de contrato onchain e infraestrutura offchain. Os mercados de previsão descentralizados são um excelente exemplo de smart contracts híbridos. Outros exemplos podem incluir smart contracts de seguros de colheitas que pagam quando um conjunto de oráculos determina que ocorreram determinados fenómenos meteorológicos.

## Qual é o problema do oráculo? {#the-oracle-problem}

Os oráculos resolvem um problema importante, mas também introduzem algumas complicações, por exemplo:

- Como podemos verificar se a informação injetada foi extraída da fonte correta ou se não foi adulterada?

- Como garantimos que estes dados estão sempre disponíveis e são atualizados regularmente?

O chamado “problema do oráculo” demonstra os problemas que surgem com o uso de oráculos de blockchain para enviar entradas para smart contracts. Os dados de um oráculo devem estar corretos para que um smart contract seja executado corretamente. Além disso, ter de 'confiar' nos operadores de oráculos para fornecer informações precisas compromete o aspeto 'trustless' (sem necessidade de confiança) dos smart contracts.

Diferentes oráculos oferecem diferentes soluções para o problema do oráculo, que exploraremos mais tarde. Os oráculos são normalmente avaliados pela forma como conseguem lidar com os seguintes desafios:

1. **Correção**: Um oráculo não deve fazer com que os smart contracts acionem alterações de estado com base em dados offchain inválidos. Um oráculo deve garantir a _autenticidade_ e a _integridade_ dos dados. Autenticidade significa que os dados foram obtidos da fonte correta, enquanto integridade significa que os dados permaneceram intactos (ou seja, não foram alterados) antes de serem enviados onchain.

2. **Disponibilidade**: um oráculo não deve atrasar ou impedir que os smart contracts executem ações e acionem alterações de estado. Isto significa que os dados de um oráculo devem estar _disponíveis mediante pedido_ sem interrupção.

3. **Compatibilidade de incentivos**: Um oráculo deve incentivar os fornecedores de dados offchain a submeterem informações corretas aos smart contracts. A compatibilidade de incentivos envolve _atribuibilidade_ e _responsabilização_. A atribuibilidade permite associar uma informação externa ao seu fornecedor, enquanto a responsabilização vincula os fornecedores de dados à informação que fornecem, para que possam ser recompensados ou penalizados com base na qualidade da informação fornecida.

## Como funciona um serviço de oráculo de blockchain? {#how-does-a-blockchain-oracle-service-work}

### Utilizadores {#users}

Os utilizadores são entidades (ou seja, smart contracts) que precisam de informações externas à blockchain para concluir ações específicas. O fluxo de trabalho básico de um serviço de oráculo começa com o utilizador a enviar um pedido de dados para o contrato do oráculo. Os pedidos de dados geralmente respondem a algumas ou a todas as seguintes perguntas:

1. Que fontes os nós offchain podem consultar para obter a informação solicitada?

2. Como é que os relatores processam a informação das fontes de dados e extraem pontos de dados úteis?

3. Quantos nós de oráculo podem participar na obtenção dos dados?

4. Como devem ser geridas as discrepâncias nos relatórios do oráculo?

5. Que método deve ser implementado na filtragem de submissões e na agregação de relatórios num único valor?

### Contrato do oráculo {#oracle-contract}

O contrato do oráculo é o componente onchain para o serviço de oráculo. Ele escuta os pedidos de dados de outros contratos, retransmite os pedidos de dados para os nós de oráculo e transmite os dados retornados para os contratos do cliente. Este contrato também pode realizar algum cálculo sobre os pontos de dados retornados para produzir um valor agregado a ser enviado ao contrato solicitante.

O contrato do oráculo expõe algumas funções que os contratos de cliente chamam ao fazer um pedido de dados. Ao receber uma nova consulta, o smart contract emitirá um [evento de registo](/developers/docs/smart-contracts/anatomy/#events-and-logs) com detalhes do pedido de dados. Isto notifica os nós offchain subscritos no registo (geralmente usando algo como o comando JSON-RPC `eth_subscribe`), que procedem à obtenção dos dados definidos no evento de registo.

Abaixo está um [exemplo de contrato de oráculo](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) de Pedro Costa. Este é um serviço de oráculo simples que pode consultar APIs offchain a pedido de outros smart contracts e armazenar a informação solicitada na blockchain:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //lista de pedidos feitos ao contrato
  uint currentId = 0; //id de pedido crescente
  uint minQuorum = 2; //número mínimo de respostas a receber antes de declarar o resultado final
  uint totalOracleCount = 3; // contagem de oráculos codificada

  // define um pedido geral de api
  struct Request {
    uint id;                            //id do pedido
    string urlToQuery;                  //url da API
    string attributeToFetch;            //atributo json (chave) a obter na resposta
    string agreedValue;                 //valor da chave
    mapping(uint => string) answers;     //respostas fornecidas pelos oráculos
    mapping(address => uint) quorum;    //oráculos que consultarão a resposta (1=o oráculo não votou, 2=o oráculo votou)
  }

  //evento que aciona o oráculo fora da blockchain
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //acionado quando há um consenso sobre o resultado final
  event UpdatedRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch,
    string agreedValue
  );

  function createRequest (
    string memory _urlToQuery,
    string memory _attributeToFetch
  )
  public
  {
    uint length = requests.push(Request(currentId, _urlToQuery, _attributeToFetch, ""));
    Request storage r = requests[length-1];

    // Endereço de oráculos codificado
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // lançar um evento a ser detetado por um oráculo fora da blockchain
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // aumentar id do pedido
    currentId++;
  }

  //chamado pelo oráculo para registar a sua resposta
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //verificar se o oráculo está na lista de oráculos de confiança
    //e se o oráculo ainda não votou
    if(currRequest.quorum[address(msg.sender)] == 1){

      //marcando que este endereço votou
      currRequest.quorum[msg.sender] = 2;

      //iterar através do "array" de respostas até que uma posição esteja livre e guardar o valor obtido
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //encontrar o primeiro espaço vazio
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterar através da lista de oráculos e verificar se oráculos suficientes (quórum mínimo)
      //votaram na mesma resposta que a atual
      for(uint i = 0; i < totalOracleCount; i++){
        bytes memory a = bytes(currRequest.answers[i]);
        bytes memory b = bytes(_valueRetrieved);

        if(keccak256(a) == keccak256(b)){
          currentQuorum++;
          if(currentQuorum >= minQuorum){
            currRequest.agreedValue = _valueRetrieved;
            emit UpdatedRequest (
              currRequest.id,
              currRequest.urlToQuery,
              currRequest.attributeToFetch,
              currRequest.agreedValue
            );
          }
        }
      }
    }
  }
}
```

### Nós de oráculo {#oracle-nodes}

O nó de oráculo é o componente offchain do serviço de oráculo. Ele extrai informação de fontes externas, como APIs alojadas em servidores de terceiros, e coloca-a onchain para consumo por smart contracts. Os nós de oráculo escutam os eventos do contrato de oráculo onchain e procedem à conclusão da tarefa descrita no registo.

Uma tarefa comum para os nós de oráculo é enviar um pedido [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) para um serviço de API, analisar a resposta para extrair dados relevantes, formatá-los numa saída legível pela blockchain e enviá-los onchain, incluindo-os numa transação para o contrato do oráculo. O nó de oráculo também pode ser obrigado a atestar a validade e a integridade das informações submetidas usando “provas de autenticidade”, que exploraremos mais tarde.

Os oráculos computacionais também dependem de nós offchain para realizar tarefas computacionais que seriam impraticáveis de executar onchain, dados os custos de gas e os limites de tamanho do bloco. Por exemplo, o nó do oráculo pode ser incumbido de gerar um número verificavelmente aleatório (por exemplo, para jogos baseados em blockchain).

## Padrões de design de oráculos {#oracle-design-patterns}

Os oráculos existem em diferentes tipos, incluindo _leitura imediata_, _publicação-subscrição_ e _pedido-resposta_, sendo os dois últimos os mais populares entre os smart contracts do Ethereum. Aqui descrevemos brevemente os modelos de publicação-subscrição e de pedido-resposta.

### Oráculos de publicação-subscrição {#publish-subscribe-oracles}

Este tipo de oráculo expõe um “feed de dados” que outros contratos podem ler regularmente para obter informações. Espera-se que os dados, neste caso, mudem com frequência, pelo que os contratos do cliente devem estar atentos às atualizações dos dados no armazenamento do oráculo. Um exemplo é um oráculo que fornece aos utilizadores a informação mais recente do preço do ETH-USD.

### Oráculos de pedido-resposta {#request-response-oracles}

Uma configuração de pedido-resposta permite ao contrato do cliente solicitar dados arbitrários para além dos fornecidos por um oráculo de publicação-subscrição. Os oráculos de pedido-resposta são ideais quando o conjunto de dados é demasiado grande para ser armazenado no armazenamento de um smart contract e/ou os utilizadores só precisarão de uma pequena parte dos dados em qualquer momento.

Embora mais complexos do que os modelos de publicação-subscrição, os oráculos de pedido-resposta são basicamente o que descrevemos na secção anterior. O oráculo terá um componente onchain que recebe um pedido de dados e o passa para um nó offchain para processamento.

Os utilizadores que iniciam os pedidos de dados devem cobrir o custo da obtenção da informação da fonte offchain. O contrato de cliente deve também fornecer fundos para cobrir os custos de gas incorridos pelo contrato de oráculo ao devolver a resposta através da função de retorno de chamada especificada no pedido.

## Oráculos centralizados vs. descentralizados {#types-of-oracles}

### Oráculos centralizados {#centralized-oracles}

Um oráculo centralizado é controlado por uma única entidade responsável por agregar informações offchain e atualizar os dados do contrato do oráculo, conforme solicitado. Os oráculos centralizados são eficientes, uma vez que dependem de uma única fonte da verdade. Podem funcionar melhor nos casos em que os conjuntos de dados proprietários são publicados diretamente pelo proprietário com uma assinatura amplamente aceite. No entanto, também trazem desvantagens:

#### Garantias de baixa correção {#low-correctness-guarantees}

Com os oráculos centralizados, não há forma de confirmar se a informação fornecida está correta ou não. Até os fornecedores “de renome” podem tornar-se desonestos ou ser pirateados. Se o oráculo se corromper, os smart contracts serão executados com base em dados incorretos.

#### Disponibilidade fraca {#poor-availability}

Não é garantido que os oráculos centralizados disponibilizem sempre dados offchain a outros smart contracts. Se o fornecedor decidir desativar o serviço ou se um pirata informático sequestrar o componente offchain do oráculo, o seu smart contract corre o risco de um ataque de negação de serviço (DoS).

#### Fraca compatibilidade de incentivos {#poor-incentive-compatibility}

Os oráculos centralizados têm frequentemente incentivos mal concebidos ou inexistentes para que o fornecedor de dados envie informações precisas/inalteradas. Pagar a um oráculo pela correção não garante a honestidade. Este problema aumenta à medida que aumenta o valor controlado pelos smart contracts.

### Oráculos descentralizados {#decentralized-oracles}

Os oráculos descentralizados foram concebidos para ultrapassar as limitações dos oráculos centralizados, eliminando os pontos únicos de falha. Um serviço de oráculo descentralizado é composto por vários participantes numa rede peer-to-peer que formam um consenso sobre dados offchain antes de os enviar para um smart contract.

Um oráculo descentralizado deve (idealmente) ser sem necessidade de permissão, sem necessidade de confiança e livre da administração por uma parte central; na realidade, a descentralização entre os oráculos está num espectro. Existem redes de oráculos semidescentralizadas onde qualquer pessoa pode participar, mas com um “proprietário” que aprova e remove nós com base no desempenho histórico. Existem também redes de oráculos totalmente descentralizadas: estas funcionam geralmente como blockchains autónomas e definiram mecanismos de consenso para coordenar os nós e punir o mau comportamento.

A utilização de oráculos descentralizados traz os seguintes benefícios:

### Garantias de elevada correção {#high-correctness-guarantees}

Os oráculos descentralizados tentam alcançar a correção dos dados utilizando diferentes abordagens. Isto inclui a utilização de provas que atestam a autenticidade e a integridade da informação devolvida e a exigência de que várias entidades cheguem a um acordo coletivo sobre a validade dos dados offchain.

#### Provas de autenticidade {#authenticity-proofs}

As provas de autenticidade são mecanismos criptográficos que permitem a verificação independente da informação obtida de fontes externas. Estas provas podem validar a fonte da informação e detetar possíveis alterações nos dados após a sua obtenção.

Exemplos de provas de autenticidade incluem:

**Provas de Transport Layer Security (TLS)**: Os nós de oráculo obtêm frequentemente dados de fontes externas utilizando uma ligação HTTP segura baseada no protocolo Transport Layer Security (TLS). Alguns oráculos descentralizados utilizam provas de autenticidade para verificar as sessões TLS (ou seja, confirmar a troca de informações entre um nó e um servidor específico) e confirmar que o conteúdo da sessão não foi alterado.

**Atestados do Ambiente de Execução Fidedigno (TEE)**: Um [ambiente de execução fidedigno](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) é um ambiente computacional em sandbox, isolado dos processos operacionais do seu sistema anfitrião. Os TEEs garantem que qualquer código de aplicação ou dados armazenados/utilizados no ambiente de computação mantêm a integridade, a confidencialidade e a imutabilidade. Os utilizadores também podem gerar um atestado para provar que uma instância da aplicação está a ser executada no ambiente de execução fidedigno.

Certas classes de oráculos descentralizados exigem que os operadores de nós de oráculos forneçam atestados de TEE. Isto confirma a um utilizador que o operador do nó está a executar uma instância do cliente do oráculo num ambiente de execução fidedigno. Os TEEs impedem que processos externos alterem ou leiam o código e os dados de uma aplicação, pelo que esses atestados provam que o nó do oráculo manteve a informação intacta e confidencial.

#### Validação da informação baseada no consenso {#consensus-based-validation-of-information}

Os oráculos centralizados baseiam-se numa única fonte de verdade quando fornecem dados a smart contracts, o que introduz a possibilidade de publicação de informação imprecisa. Os oráculos descentralizados resolvem este problema recorrendo a múltiplos nós de oráculos para consultar informações offchain. Ao comparar dados de múltiplas fontes, os oráculos descentralizados reduzem o risco de passar informações inválidas para contratos onchain.

Os oráculos descentralizados, no entanto, têm de lidar com discrepâncias na informação recuperada de múltiplas fontes offchain. Para minimizar as diferenças de informação e garantir que os dados passados para o contrato do oráculo refletem a opinião coletiva dos nós do oráculo, os oráculos descentralizados utilizam os seguintes mecanismos:

##### Votação/staking sobre a exatidão dos dados

Algumas redes de oráculos descentralizadas exigem que os participantes votem ou façam staking sobre a exatidão das respostas às consultas de dados (por exemplo, "Quem ganhou as eleições norte-americanas de 2020?") utilizando o token nativo da rede. Um protocolo de agregação agrega então os votos e os stakes e considera a resposta apoiada pela maioria como a válida.

Os nós cujas respostas se desviam da resposta da maioria são penalizados pela distribuição dos seus tokens a outros que fornecem valores mais corretos. Forçar os nós a fornecer uma garantia antes de fornecerem dados incentiva respostas honestas, uma vez que se assume que são atores económicos racionais com a intenção de maximizar os retornos.

O staking/votação também protege os oráculos descentralizados de [ataques Sybil](/glossary/#sybil-attack), nos quais atores maliciosos criam múltiplas identidades para manipular o sistema de consenso. No entanto, o staking não pode impedir o “freeloading” (nós de oráculo copiando informações de outros) e a “validação preguiçosa” (nós de oráculo seguindo a maioria sem verificar as informações por si mesmos).

##### Mecanismos de ponto Schelling

[Ponto Schelling](https://en.wikipedia.org/wiki/Focal_point_\(game_theory\)) é um conceito da teoria dos jogos que assume que várias entidades irão sempre optar por uma solução comum para um problema na ausência de qualquer comunicação. Os mecanismos de ponto de Schelling são frequentemente utilizados em redes de oráculos descentralizadas para permitir que os nós cheguem a um consenso sobre as respostas aos pedidos de dados.

Uma ideia inicial para isto foi a [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/), um feed de dados proposto onde os participantes submetem respostas a perguntas "escalares" (perguntas cujas respostas são descritas por magnitude, por exemplo, "qual é o preço do ETH?"), juntamente com um depósito. Os utilizadores que fornecem valores entre o 25.º e o 75.º [percentil](https://en.wikipedia.org/wiki/Percentile) são recompensados, enquanto aqueles cujos valores se desviam largamente do valor mediano são penalizados.

Embora o SchellingCoin não exista hoje em dia, vários oráculos descentralizados — nomeadamente os [Oráculos do Protocolo Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module) — utilizam o mecanismo do ponto de Schelling para melhorar a precisão dos dados do oráculo. Cada Oráculo Maker consiste numa rede P2P offchain de nós ("relayers" e "feeds") que submetem os preços de mercado dos ativos de garantia e um contrato "Medianizer" onchain que calcula a mediana de todos os valores fornecidos. Uma vez terminado o período de atraso especificado, este valor mediano torna-se o novo preço de referência para o ativo associado.

Outros exemplos de oráculos que usam mecanismos de ponto de Schelling incluem o [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) e o [Witnet](https://witnet.io/). Em ambos os sistemas, as respostas dos nós do oráculo na rede peer-to-peer são agregadas num único valor agregado, como uma média ou mediana. Os nós são recompensados ou punidos de acordo com a medida em que as suas respostas se alinham ou se desviam do valor agregado.

Os mecanismos de ponto de Schelling são atrativos porque minimizam a pegada onchain (apenas uma transação precisa de ser enviada) enquanto garantem a descentralização. Este último é possível porque os nós têm de assinar a lista de respostas submetidas antes de esta ser introduzida no algoritmo que produz o valor médio/mediano.

### Disponibilidade {#availability}

Os serviços de oráculos descentralizados garantem uma alta disponibilidade de dados offchain para os smart contracts. Isto é conseguido através da descentralização tanto da fonte de informação offchain como dos nós responsáveis pela transferência da informação onchain.

Isto garante a tolerância a falhas, uma vez que o contrato de oráculo pode contar com vários nós (que também contam com várias fontes de dados) para executar consultas de outros contratos. A descentralização na fonte _e_ no nível do operador do nó é crucial — uma rede de nós de oráculo que servem informação recuperada da mesma fonte irá deparar-se com o mesmo problema que um oráculo centralizado.

Também é possível que os oráculos baseados em stake façam slashing aos operadores de nós que não respondem rapidamente aos pedidos de dados. Isto incentiva significativamente os nós do oráculo a investir em infraestruturas tolerantes a falhas e a fornecer dados de forma atempada.

### Boa compatibilidade de incentivos {#good-incentive-compatibility}

Os oráculos descentralizados implementam vários modelos de incentivos para evitar o comportamento [bizantino](https://en.wikipedia.org/wiki/Byzantine_fault) entre os nós de oráculos. Especificamente, eles alcançam _atribuibilidade_ e _responsabilização_:

1. Os nós de oráculos descentralizados são frequentemente obrigados a assinar os dados que fornecem em resposta a pedidos de dados. Esta informação ajuda a avaliar o desempenho histórico dos nós do oráculo, de modo que os utilizadores possam filtrar os nós do oráculo não fiáveis ao fazer pedidos de dados. Um exemplo é o [Sistema de Reputação Algorítmica](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) do Witnet.

2. Os oráculos descentralizados — como explicado anteriormente — podem exigir que os nós coloquem um stake na sua confiança na veracidade dos dados que submetem. Se a alegação se verificar, este stake pode ser devolvido juntamente com recompensas por um serviço honesto. Mas também pode ser objeto de slashing no caso de a informação estar incorreta, o que proporciona uma certa medida de responsabilização.

## Aplicações de oráculos em smart contracts {#applications-of-oracles-in-smart-contracts}

Seguem-se casos de utilização comuns para oráculos no Ethereum:

### Obtenção de dados financeiros {#retrieving-financial-data}

As aplicações de [finanças descentralizadas](/defi/) (DeFi) permitem o empréstimo, o endividamento e a negociação de ativos peer-to-peer. Isto requer frequentemente a obtenção de diferentes informações financeiras, incluindo dados sobre taxas de câmbio (para calcular o valor fiduciário de criptomoedas ou comparar preços de tokens) e dados sobre mercados de capitais (para calcular o valor de ativos tokenizados, como o ouro ou o dólar americano).

Um protocolo de empréstimo DeFi, por exemplo, precisa de consultar os preços de mercado atuais para os ativos (por exemplo, ETH) depositados como garantia. Isto permite que o contrato determine o valor dos ativos de garantia e determine quanto pode emprestar do sistema.

Os populares “oráculos de preços” (como são frequentemente chamados) no DeFi incluem os Chainlink Price Feeds, o [Open Price Feed](https://compound.finance/docs/prices) do Compound Protocol, os [Time-Weighted Average Prices (TWAPs)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) da Uniswap e os [Maker Oracles](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Os construtores devem compreender as ressalvas que vêm com estes oráculos de preços antes de os integrarem no seu projeto. Este [artigo](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) fornece uma análise detalhada do que deve ser considerado ao planear a utilização de qualquer um dos oráculos de preços mencionados.

Abaixo está um exemplo de como pode obter o preço mais recente do ETH no seu smart contract usando um feed de preços do Chainlink:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

### Gerar aleatoriedade verificável {#generating-verifiable-randomness}

Certas aplicações da blockchain, como jogos baseados em blockchain ou esquemas de lotaria, exigem um elevado nível de imprevisibilidade e aleatoriedade para funcionarem eficazmente. No entanto, a execução determinista das blockchains elimina a aleatoriedade.

A abordagem original era usar funções criptográficas pseudo-aleatórias, como `blockhash`, mas estas podiam ser [manipuladas por mineradores](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) resolvendo o algoritmo de prova de trabalho. Além disso, a [mudança do Ethereum para prova de stake](/roadmap/merge/) significa que os programadores já não podem contar com o `blockhash` para a aleatoriedade onchain. O [mecanismo RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) da Beacon Chain oferece, em vez disso, uma fonte alternativa de aleatoriedade.

É possível gerar o valor aleatório offchain e enviá-lo onchain, mas isso impõe elevados requisitos de confiança aos utilizadores. Eles devem acreditar que o valor foi realmente gerado através de mecanismos imprevisíveis e que não foi alterado em trânsito.

Os oráculos concebidos para computação offchain resolvem este problema gerando de forma segura resultados aleatórios offchain que transmitem onchain juntamente com provas criptográficas que atestam a imprevisibilidade do processo. Um exemplo é o [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Verifiable Random Function), que é um gerador de números aleatórios (RNG) comprovadamente justo e à prova de adulteração, útil para construir smart contracts fiáveis para aplicações que dependem de resultados imprevisíveis.

### Obter resultados de eventos {#getting-outcomes-for-events}

Com os oráculos, a criação de smart contracts que respondem a eventos do mundo real é fácil. Os serviços de oráculo tornam isto possível, permitindo que os contratos se liguem a APIs externas através de componentes offchain e consumam informação dessas fontes de dados. Por exemplo, a dapp de previsão mencionada anteriormente pode solicitar a um oráculo que devolva os resultados eleitorais de uma fonte offchain fidedigna (por exemplo, a Associated Press).

A utilização de oráculos para obter dados baseados em resultados do mundo real permite outros casos de utilização inovadores; por exemplo, um produto de seguro descentralizado necessita de informações precisas sobre o clima, catástrofes, etc. para funcionar eficazmente.

### Automatizar smart contracts {#automating-smart-contracts}

Os smart contracts não são executados automaticamente; em vez disso, uma conta de propriedade externa (EOA), ou outra conta de contrato, deve acionar as funções certas para executar o código do contrato. Na maioria dos casos, a maior parte das funções do contrato são públicas e podem ser invocadas por EOAs e outros contratos.

Mas também existem _funções privadas_ dentro de um contrato que são inacessíveis a outros; mas que são críticas para a funcionalidade geral de uma dapp. Exemplos incluem uma função `mintERC721Token()` que cunha periodicamente novos NFTs para os utilizadores, uma função para atribuir pagamentos num mercado de previsão, ou uma função para desbloquear tokens em stake num DEX.

Os programadores precisarão de acionar essas funções em intervalos para manter a aplicação a funcionar sem problemas. No entanto, isto pode levar a mais horas perdidas em tarefas mundanas para os programadores, razão pela qual a automatização da execução de smart contracts é atrativa.

Algumas redes de oráculos descentralizadas oferecem serviços de automação, que permitem que os nós de oráculos offchain acionem funções de smart contracts de acordo com os parâmetros definidos pelo utilizador. Normalmente, isto requer o “registo” do contrato-alvo no serviço de oráculo, o fornecimento de fundos para pagar ao operador do oráculo e a especificação das condições ou dos momentos para acionar o contrato.

A [Keeper Network](https://chain.link/keepers) do Chainlink oferece opções para os smart contracts externalizarem tarefas de manutenção regulares de uma forma descentralizada e com minimização da confiança. Leia a [documentação oficial do Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) para obter informações sobre como tornar o seu contrato compatível com o Keeper e utilizar o serviço Upkeep.

## Como usar oráculos da blockchain {#use-blockchain-oracles}

Existem várias aplicações de oráculos que pode integrar na sua dapp Ethereum:

**[Chainlink](https://chain.link/)** - _As redes de oráculos descentralizadas da Chainlink fornecem entradas, saídas e cálculos à prova de adulteração para suportar smart contracts avançados em qualquer blockchain._

**[RedStone Oracles](https://redstone.finance/)** - _RedStone é um oráculo modular descentralizado que fornece feeds de dados otimizados para gas. É especializado em oferecer feeds de preços para ativos emergentes, como tokens de liquid staking (LSTs), tokens de liquid restaking (LRTs) e derivados de staking de Bitcoin._

**[Chronicle](https://chroniclelabs.org/)** - _A Chronicle supera as limitações atuais da transferência de dados onchain, desenvolvendo oráculos verdadeiramente escaláveis, económicos, descentralizados e verificáveis._

**[Witnet](https://witnet.io/)** - _Witnet é um oráculo sem permissões, descentralizado e resistente à censura, que ajuda os smart contracts a reagir a eventos do mundo real com fortes garantias criptoeconómicas._

**[Oráculo UMA](https://uma.xyz)** - _O oráculo otimista da UMA permite que os smart contracts recebam rapidamente qualquer tipo de dados para diferentes aplicações, incluindo seguros, derivados financeiros e mercados de previsão._

**[Tellor](https://tellor.io/)** - _Tellor é um protocolo de oráculo transparente e sem permissões para que o seu smart contract obtenha facilmente quaisquer dados sempre que precisar deles._

**[Band Protocol](https://bandprotocol.com/)** - _O Band Protocol é uma plataforma de oráculos de dados cross-chain que agrega e liga dados e APIs do mundo real a smart contracts._

**[Pyth Network](https://pyth.network/)** - _A rede Pyth é uma rede de oráculos financeiros de primeira parte, concebida para publicar dados contínuos do mundo real onchain num ambiente à prova de adulteração, descentralizado e autossustentável._

**[API3 DAO](https://www.api3.org/)** - _A API3 DAO está a fornecer soluções de oráculo de primeira parte que oferecem maior transparência de fonte, segurança e escalabilidade numa solução descentralizada para smart contracts_

**[Supra](https://supra.com/)** - Um kit de ferramentas verticalmente integrado de soluções cross-chain que interligam todas as blockchains, públicas (L1s e L2s) ou privadas (empresas), fornecendo feeds de preços de oráculos descentralizados que podem ser usados para casos de uso onchain e offchain.

**[Gas Network](https://gas.network/)** - Uma plataforma de oráculo distribuída que fornece dados de preços de gas em tempo real em toda a blockchain. Ao trazer para a onchain dados dos principais fornecedores de dados de preços de gas, a Gas Network está a ajudar a impulsionar a interoperabilidade. A Gas Network suporta dados para mais de 35 cadeias, incluindo a Mainnet do Ethereum e muitas das principais L2s.

## Leitura adicional {#further-reading}

**Artigos**

- [O que é um Oráculo de Blockchain?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [O que é um Oráculo de Blockchain?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Oráculos Descentralizados: uma visão abrangente](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Implementando um Oráculo de Blockchain no Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Porque é que os smart contracts não conseguem fazer chamadas de API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Então quer usar um oráculo de preços](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Vídeos**

- [Oráculos e a Expansão da Utilidade da Blockchain](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Tutoriais**

- [Como obter o preço atual do Ethereum em Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Consumir Dados do Oráculo](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_

**Projetos de exemplo**

- [Projeto inicial completo do Chainlink para Ethereum em Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_
