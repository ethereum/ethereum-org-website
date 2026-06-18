---
title: "Oráculos"
description: "Os oráculos fornecem aos contratos inteligentes do Ethereum acesso a dados do mundo real, desbloqueando mais casos de uso e maior valor para os usuários."
lang: pt-br
authors: ["Patrick Collins"]
---

Os oráculos são aplicativos que produzem feeds de dados que disponibilizam fontes de dados offchain para a blockchain para contratos inteligentes. Isso é necessário porque os contratos inteligentes baseados no Ethereum não podem, por padrão, acessar informações armazenadas fora da rede blockchain.

Dar aos contratos inteligentes a capacidade de executar usando dados offchain estende a utilidade e o valor dos aplicativos descentralizados (dapps). Por exemplo, os mercados de previsão onchain dependem de oráculos para fornecer informações sobre os resultados que eles usam para validar as previsões dos usuários. Suponha que Alice aposte 20 ETH em quem se tornará o próximo presidente dos EUA. Nesse caso, o dapp de mercado de previsão precisa de um oráculo para confirmar os resultados da eleição e determinar se Alice é elegível para um pagamento.

## Pré-requisitos {#prerequisites}

Esta página pressupõe que o leitor esteja familiarizado com os fundamentos do [Ethereum](/), incluindo [nós](/developers/docs/nodes-and-clients/), [mecanismos de consenso](/developers/docs/consensus-mechanisms/) e a [EVM](/developers/docs/evm/). Você também deve ter uma boa compreensão de [contratos inteligentes](/developers/docs/smart-contracts/) e da [anatomia dos contratos inteligentes](/developers/docs/smart-contracts/anatomy/), especialmente [eventos](/glossary/#events).

## O que é um oráculo de blockchain? {#what-is-a-blockchain-oracle}

Os oráculos são aplicativos que buscam, verificam e transmitem informações externas (ou seja, informações armazenadas offchain) para contratos inteligentes em execução na blockchain. Além de “puxar” dados offchain e transmiti-los no Ethereum, os oráculos também podem “empurrar” informações da blockchain para sistemas externos, por exemplo, destrancar uma fechadura inteligente assim que o usuário enviar uma taxa por meio de uma transação do Ethereum.

Sem um oráculo, um contrato inteligente ficaria limitado inteiramente a dados onchain.

Os oráculos diferem com base na fonte de dados (uma ou várias fontes), modelos de confiança (centralizados ou descentralizados) e arquitetura do sistema (leitura imediata, publicação-assinatura e solicitação-resposta). Também podemos distinguir entre oráculos com base em se eles recuperam dados externos para uso por contratos onchain (oráculos de entrada), enviam informações da blockchain para os aplicativos offchain (oráculos de saída) ou executam tarefas computacionais offchain (oráculos computacionais).

## Por que os contratos inteligentes precisam de oráculos? {#why-do-smart-contracts-need-oracles}

Muitos desenvolvedores veem os contratos inteligentes como código em execução em endereços específicos na blockchain. No entanto, uma [visão mais geral dos contratos inteligentes](/smart-contracts/) é que eles são programas de software autoexecutáveis capazes de fazer cumprir acordos entre as partes assim que condições específicas forem atendidas - daí o termo “contratos inteligentes”.

Mas usar contratos inteligentes para fazer cumprir acordos entre pessoas não é simples, dado que o Ethereum é determinístico. Um [sistema determinístico](https://en.wikipedia.org/wiki/Deterministic_algorithm) é aquele que sempre produz os mesmos resultados dado um estado inicial e uma entrada específica, o que significa que não há aleatoriedade ou variação no processo de computação de saídas a partir de entradas.

Para alcançar a execução determinística, as blockchains limitam os nós a chegar a um consenso sobre questões binárias simples (verdadeiro/falso) usando _apenas_ dados armazenados na própria blockchain. Exemplos de tais perguntas incluem:

- “O proprietário da conta (identificado por uma chave pública) assinou esta transação com a chave privada correspondente?”
- “Esta conta tem fundos suficientes para cobrir a transação?”
- “Esta transação é válida no contexto deste contrato inteligente?”, etc.

Se as blockchains recebessem informações de fontes externas (ou seja, do mundo real), o determinismo seria impossível de alcançar, impedindo que os nós concordassem com a validade das alterações no estado da blockchain. Tome como exemplo um contrato inteligente que executa uma transação com base na taxa de câmbio atual de ETH-USD obtida de uma API de preços tradicional. É provável que esse valor mude com frequência (sem mencionar que a API pode ser descontinuada ou hackeada), o que significa que os nós que executam o mesmo código de contrato chegariam a resultados diferentes.

Para uma blockchain pública como o Ethereum, com milhares de nós em todo o mundo processando transações, o determinismo é fundamental. Sem uma autoridade central servindo como fonte da verdade, os nós precisam de mecanismos para chegar ao mesmo estado após aplicar as mesmas transações. Um caso em que o nó A executa o código de um contrato inteligente e obtém "3" como resultado, enquanto o nó B obtém "7" após executar a mesma transação, faria com que o consenso fosse quebrado e eliminaria o valor do Ethereum como uma plataforma de computação descentralizada.

Esse cenário também destaca o problema de projetar blockchains para extrair informações de fontes externas. Os oráculos, no entanto, resolvem esse problema pegando informações de fontes offchain e armazenando-as na blockchain para que os contratos inteligentes as consumam. Como as informações armazenadas onchain são inalteráveis e publicamente disponíveis, os nós do Ethereum podem usar com segurança os dados offchain importados pelo oráculo para calcular as mudanças de estado sem quebrar o consenso.

Para fazer isso, um oráculo é normalmente composto por um contrato inteligente em execução onchain e alguns componentes offchain. O contrato onchain recebe solicitações de dados de outros contratos inteligentes, que ele passa para o componente offchain (chamado de nó de oráculo). Esse nó de oráculo pode consultar fontes de dados — usando interfaces de programação de aplicativos (APIs), por exemplo — e enviar transações para armazenar os dados solicitados no armazenamento do contrato inteligente.

Essencialmente, um oráculo de blockchain preenche a lacuna de informações entre a blockchain e o ambiente externo, criando “contratos inteligentes híbridos”. Um contrato inteligente híbrido é aquele que funciona com base em uma combinação de código de contrato onchain e infraestrutura offchain. Os mercados de previsão descentralizados são um excelente exemplo de contratos inteligentes híbridos. Outros exemplos podem incluir contratos inteligentes de seguro agrícola que pagam quando um conjunto de oráculos determina que certos fenômenos climáticos ocorreram.

## O que é o problema do oráculo? {#the-oracle-problem}

Os oráculos resolvem um problema importante, mas também introduzem algumas complicações, por exemplo:

- Como verificamos se as informações injetadas foram extraídas da fonte correta ou não foram adulteradas?

- Como garantimos que esses dados estejam sempre disponíveis e atualizados regularmente?

O chamado “problema do oráculo” demonstra os problemas que surgem com o uso de oráculos de blockchain para enviar entradas para contratos inteligentes. Os dados de um oráculo devem estar corretos para que um contrato inteligente seja executado corretamente. Além disso, ter que 'confiar' nos operadores de oráculos para fornecer informações precisas prejudica o aspecto sem necessidade de confiança dos contratos inteligentes.

Diferentes oráculos oferecem diferentes soluções para o problema do oráculo, que exploraremos mais adiante. Os oráculos são normalmente avaliados em quão bem eles podem lidar com os seguintes desafios:

1. **Correção**: Um oráculo não deve fazer com que os contratos inteligentes acionem mudanças de estado com base em dados offchain inválidos. Um oráculo deve garantir a _autenticidade_ e a _integridade_ dos dados. Autenticidade significa que os dados foram obtidos da fonte correta, enquanto integridade significa que os dados permaneceram intactos (ou seja, não foram alterados) antes de serem enviados onchain.

2. **Disponibilidade**: Um oráculo não deve atrasar ou impedir que os contratos inteligentes executem ações e acionem mudanças de estado. Isso significa que os dados de um oráculo devem estar _disponíveis mediante solicitação_ sem interrupção.

3. **Compatibilidade de incentivos**: Um oráculo deve incentivar os provedores de dados offchain a enviar informações corretas aos contratos inteligentes. A compatibilidade de incentivos envolve _atribuibilidade_ e _responsabilidade_. A atribuibilidade permite vincular uma informação externa ao seu provedor, enquanto a responsabilidade vincula os provedores de dados às informações que eles fornecem, para que possam ser recompensados ou penalizados com base na qualidade das informações fornecidas.

## Como funciona um serviço de oráculo de blockchain? {#how-does-a-blockchain-oracle-service-work}

### Usuários {#users}

Os usuários são entidades (ou seja, contratos inteligentes) que precisam de informações externas à blockchain para concluir ações específicas. O fluxo de trabalho básico de um serviço de oráculo começa com o usuário enviando uma solicitação de dados para o contrato do oráculo. As solicitações de dados geralmente responderão a algumas ou a todas as seguintes perguntas:

1. Quais fontes os nós offchain podem consultar para obter as informações solicitadas?

2. Como os relatores processam informações de fontes de dados e extraem pontos de dados úteis?

3. Quantos nós de oráculo podem participar da recuperação dos dados?

4. Como as discrepâncias nos relatórios do oráculo devem ser gerenciadas?

5. Qual método deve ser implementado na filtragem de envios e na agregação de relatórios em um único valor?

### Contrato do oráculo {#oracle-contract}

O contrato do oráculo é o componente onchain para o serviço de oráculo. Ele escuta solicitações de dados de outros contratos, retransmite consultas de dados para nós de oráculo e transmite os dados retornados para contratos de clientes. Esse contrato também pode realizar alguns cálculos nos pontos de dados retornados para produzir um valor agregado a ser enviado ao contrato solicitante.

O contrato do oráculo expõe algumas funções que os contratos de clientes chamam ao fazer uma solicitação de dados. Ao receber uma nova consulta, o contrato inteligente emitirá um [evento de log](/developers/docs/smart-contracts/anatomy/#events-and-logs) com detalhes da solicitação de dados. Isso notifica os nós offchain inscritos no log (geralmente usando algo como o comando JSON-RPC `eth_subscribe`), que procedem à recuperação dos dados definidos no evento de log.

Abaixo está um [exemplo de contrato de oráculo](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) de Pedro Costa. Este é um serviço de oráculo simples que pode consultar APIs offchain mediante solicitação de outros contratos inteligentes e armazenar as informações solicitadas na blockchain:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //lista de requisições feitas ao contrato
  uint currentId = 0; //id de requisição crescente
  uint minQuorum = 2; //número mínimo de respostas a receber antes de declarar o resultado final
  uint totalOracleCount = 3; // contagem de oráculos hardcoded

  // define uma requisição geral de API
  struct Request {
    uint id;                            //id da requisição
    string urlToQuery;                  //url da API
    string attributeToFetch;            //atributo json (chave) a ser recuperado na resposta
    string agreedValue;                 //valor da chave
    mapping(uint => string) answers;     //respostas fornecidas pelos oráculos
    mapping(address => uint) quorum;    //oráculos que consultarão a resposta (1=oráculo não votou, 2=oráculo votou)
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

    // endereço dos oráculos hardcoded
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // lança um evento para ser detectado pelo oráculo fora da blockchain
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // incrementa o id da requisição
    currentId++;
  }

  //chamado pelo oráculo para registrar sua resposta
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //verifica se o oráculo está na lista de oráculos confiáveis
    //e se o oráculo ainda não votou
    if(currRequest.quorum[address(msg.sender)] == 1){

      //marcando que este endereço votou
      currRequest.quorum[msg.sender] = 2;

      //itera pelo "array" de respostas até que uma posição esteja livre e salva o valor recuperado
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //encontra o primeiro slot vazio
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //itera pela lista de oráculos e verifica se oráculos suficientes (quórum mínimo)
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

O nó de oráculo é o componente offchain do serviço de oráculo. Ele extrai informações de fontes externas, como APIs hospedadas em servidores de terceiros, e as coloca onchain para consumo por contratos inteligentes. Os nós de oráculo escutam eventos do contrato de oráculo onchain e procedem à conclusão da tarefa descrita no log.

Uma tarefa comum para nós de oráculo é enviar uma solicitação [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) para um serviço de API, analisar a resposta para extrair dados relevantes, formatar em uma saída legível pela blockchain e enviá-la onchain incluindo-a em uma transação para o contrato do oráculo. O nó de oráculo também pode ser obrigado a atestar a validade e a integridade das informações enviadas usando “provas de autenticidade”, que exploraremos mais adiante.

Os oráculos computacionais também dependem de nós offchain para executar tarefas computacionais que seriam impraticáveis de executar onchain, dados os custos de gás e os limites de tamanho do bloco. Por exemplo, o nó de oráculo pode ser encarregado de gerar um número verificavelmente aleatório (por exemplo, para jogos baseados em blockchain).

## Padrões de design de oráculos {#oracle-design-patterns}

Os oráculos vêm em diferentes tipos, incluindo _leitura imediata_, _publicação-assinatura_ e _solicitação-resposta_, sendo os dois últimos os mais populares entre os contratos inteligentes do Ethereum. Aqui descrevemos brevemente os modelos de publicação-assinatura e solicitação-resposta.

### Oráculos de publicação-assinatura {#publish-subscribe-oracles}

Esse tipo de oráculo expõe um “feed de dados” que outros contratos podem ler regularmente para obter informações. Espera-se que os dados neste caso mudem com frequência, portanto, os contratos de clientes devem escutar as atualizações dos dados no armazenamento do oráculo. Um exemplo é um oráculo que fornece as informações de preço mais recentes de ETH-USD aos usuários.

### Oráculos de solicitação-resposta {#request-response-oracles}

Uma configuração de solicitação-resposta permite que o contrato do cliente solicite dados arbitrários diferentes dos fornecidos por um oráculo de publicação-assinatura. Os oráculos de solicitação-resposta são ideais quando o conjunto de dados é muito grande para ser armazenado no armazenamento de um contrato inteligente e/ou os usuários precisarão apenas de uma pequena parte dos dados em um determinado momento.

Embora mais complexos do que os modelos de publicação-assinatura, os oráculos de solicitação-resposta são basicamente o que descrevemos na seção anterior. O oráculo terá um componente onchain que recebe uma solicitação de dados e a passa para um nó offchain para processamento.

Os usuários que iniciam consultas de dados devem cobrir o custo de recuperação de informações da fonte offchain. O contrato do cliente também deve fornecer fundos para cobrir os custos de gás incorridos pelo contrato do oráculo ao retornar a resposta por meio da função de retorno de chamada (callback) especificada na solicitação.

## Oráculos centralizados vs. descentralizados {#types-of-oracles}

### Oráculos centralizados {#centralized-oracles}

Um oráculo centralizado é controlado por uma única entidade responsável por agregar informações offchain e atualizar os dados do contrato do oráculo conforme solicitado. Os oráculos centralizados são eficientes, pois dependem de uma única fonte da verdade. Eles podem funcionar melhor em casos em que conjuntos de dados proprietários são publicados diretamente pelo proprietário com uma assinatura amplamente aceita. No entanto, eles também trazem desvantagens:

#### Baixas garantias de correção {#low-correctness-guarantees}

Com oráculos centralizados, não há como confirmar se as informações fornecidas estão corretas ou não. Mesmo provedores "respeitáveis" podem agir de má-fé ou serem hackeados. Se o oráculo for corrompido, os contratos inteligentes serão executados com base em dados incorretos.

#### Baixa disponibilidade {#poor-availability}

Os oráculos centralizados não têm a garantia de sempre disponibilizar dados offchain para outros contratos inteligentes. Se o provedor decidir desligar o serviço ou um hacker sequestrar o componente offchain do oráculo, seu contrato inteligente corre o risco de sofrer um ataque de negação de serviço (DoS).

#### Baixa compatibilidade de incentivos {#poor-incentive-compatibility}

Os oráculos centralizados geralmente têm incentivos mal projetados ou inexistentes para que o provedor de dados envie informações precisas/inalteradas. Pagar um oráculo pela correção não garante honestidade. Esse problema aumenta à medida que a quantidade de valor controlada por contratos inteligentes aumenta.

### Oráculos descentralizados {#decentralized-oracles}

Os oráculos descentralizados são projetados para superar as limitações dos oráculos centralizados, eliminando pontos únicos de falha. Um serviço de oráculo descentralizado compreende vários participantes em uma rede ponto a ponto que formam consenso sobre dados offchain antes de enviá-los a um contrato inteligente.

Um oráculo descentralizado deve (idealmente) ser não permissionado, sem necessidade de confiança e livre de administração por uma parte central; na realidade, a descentralização entre os oráculos está em um espectro. Existem redes de oráculos semidescentralizadas onde qualquer um pode participar, mas com um “proprietário” que aprova e remove nós com base no desempenho histórico. Também existem redes de oráculos totalmente descentralizadas: elas geralmente funcionam como blockchains independentes e têm mecanismos de consenso definidos para coordenar nós e punir o mau comportamento.

O uso de oráculos descentralizados traz os seguintes benefícios:

### Altas garantias de correção {#high-correctness-guarantees}

Os oráculos descentralizados tentam alcançar a correção dos dados usando diferentes abordagens. Isso inclui o uso de provas que atestam a autenticidade e a integridade das informações retornadas e a exigência de que várias entidades concordem coletivamente sobre a validade dos dados offchain.

#### Provas de autenticidade {#authenticity-proofs}

As provas de autenticidade são mecanismos criptográficos que permitem a verificação independente de informações recuperadas de fontes externas. Essas provas podem validar a fonte das informações e detectar possíveis alterações nos dados após a recuperação.

Exemplos de provas de autenticidade incluem:

**Provas de Transport Layer Security (TLS)**: Os nós de oráculo geralmente recuperam dados de fontes externas usando uma conexão HTTP segura baseada no protocolo Transport Layer Security (TLS). Alguns oráculos descentralizados usam provas de autenticidade para verificar sessões TLS (ou seja, confirmar a troca de informações entre um nó e um servidor específico) e confirmar que o conteúdo da sessão não foi alterado.

**Atestações de Trusted Execution Environment (TEE)**: Um [ambiente de execução confiável](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) é um ambiente computacional em sandbox que é isolado dos processos operacionais de seu sistema host. Os TEEs garantem que qualquer código de aplicativo ou dados armazenados/usados no ambiente de computação mantenham a integridade, a confidencialidade e a imutabilidade. Os usuários também podem gerar uma atestação para provar que uma instância de aplicativo está sendo executada no ambiente de execução confiável.

Certas classes de oráculos descentralizados exigem que os operadores de nós de oráculo forneçam atestações de TEE. Isso confirma a um usuário que o operador do nó está executando uma instância do cliente de oráculo em um ambiente de execução confiável. Os TEEs impedem que processos externos alterem ou leiam o código e os dados de um aplicativo, portanto, essas atestações provam que o nó de oráculo manteve as informações intactas e confidenciais.

#### Validação de informações baseada em consenso {#consensus-based-validation-of-information}

Os oráculos centralizados dependem de uma única fonte da verdade ao fornecer dados para contratos inteligentes, o que introduz a possibilidade de publicar informações imprecisas. Os oráculos descentralizados resolvem esse problema contando com vários nós de oráculo para consultar informações offchain. Ao comparar dados de várias fontes, os oráculos descentralizados reduzem o risco de passar informações inválidas para contratos onchain.

Os oráculos descentralizados, no entanto, devem lidar com discrepâncias nas informações recuperadas de várias fontes offchain. Para minimizar as diferenças nas informações e garantir que os dados passados para o contrato do oráculo reflitam a opinião coletiva dos nós de oráculo, os oráculos descentralizados usam os seguintes mecanismos:

##### Votação/staking na precisão dos dados {#}

Algumas redes de oráculos descentralizadas exigem que os participantes votem ou façam stake na precisão das respostas às consultas de dados (por exemplo, "Quem ganhou as eleições dos EUA em 2020?") usando o token nativo da rede. Um protocolo de agregação então agrega os votos e os stakes e toma a resposta apoiada pela maioria como a válida.

Os nós cujas respostas se desviam da resposta da maioria são penalizados tendo seus tokens distribuídos para outros que fornecem valores mais corretos. Forçar os nós a fornecer um vínculo antes de fornecer dados incentiva respostas honestas, uma vez que se presume que eles sejam atores econômicos racionais com a intenção de maximizar os retornos.

O staking/votação também protege os oráculos descentralizados de [ataques Sybil](/glossary/#sybil-attack), onde atores mal-intencionados criam várias identidades para manipular o sistema de consenso. No entanto, o staking não pode impedir o “aproveitamento” (nós de oráculo copiando informações de outros) e a “validação preguiçosa” (nós de oráculo seguindo a maioria sem verificar as informações por si mesmos).

##### Mecanismos de ponto de Schelling {#}

O [ponto de Schelling](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>) é um conceito da teoria dos jogos que pressupõe que várias entidades sempre adotarão uma solução comum para um problema na ausência de qualquer comunicação. Os mecanismos de ponto de Schelling são frequentemente usados em redes de oráculos descentralizadas para permitir que os nós cheguem a um consenso sobre as respostas às solicitações de dados.

Uma ideia inicial para isso foi a [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed), um feed de dados proposto onde os participantes enviam respostas a perguntas "escalares" (perguntas cujas respostas são descritas por magnitude, por exemplo, "qual é o preço do ETH?"), juntamente com um depósito. Os usuários que fornecem valores entre o 25º e o 75º [percentil](https://en.wikipedia.org/wiki/Percentile) são recompensados, enquanto aqueles cujos valores se desviam amplamente do valor mediano são penalizados.

Embora a SchellingCoin não exista hoje, vários oráculos descentralizados — notavelmente os [Oráculos do Protocolo Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module) — usam o mecanismo de ponto de Schelling para melhorar a precisão dos dados do oráculo. Cada Oráculo Maker consiste em uma rede P2P offchain de nós ("retransmissores" e "feeds") que enviam preços de mercado para ativos colaterais e um contrato “Medianizer” onchain que calcula a mediana de todos os valores fornecidos. Quando o período de atraso especificado termina, esse valor mediano se torna o novo preço de referência para o ativo associado.

Outros exemplos de oráculos que usam mecanismos de ponto de Schelling incluem o [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) e a [Witnet](https://witnet.io/). Em ambos os sistemas, as respostas dos nós de oráculo na rede ponto a ponto são agregadas em um único valor agregado, como uma média ou mediana. Os nós são recompensados ou punidos de acordo com a medida em que suas respostas se alinham ou se desviam do valor agregado.

Os mecanismos de ponto de Schelling são atraentes porque minimizam a pegada onchain (apenas uma transação precisa ser enviada) enquanto garantem a descentralização. Isso último é possível porque os nós devem assinar a lista de respostas enviadas antes que ela seja alimentada no algoritmo que produz o valor médio/mediano.

### Disponibilidade {#availability}

Os serviços de oráculos descentralizados garantem alta disponibilidade de dados offchain para contratos inteligentes. Isso é alcançado descentralizando tanto a fonte de informações offchain quanto os nós responsáveis por transferir as informações onchain.

Isso garante a tolerância a falhas, pois o contrato do oráculo pode contar com vários nós (que também dependem de várias fontes de dados) para executar consultas de outros contratos. A descentralização na fonte _e_ no nível do operador do nó é crucial — uma rede de nós de oráculo servindo informações recuperadas da mesma fonte terá o mesmo problema que um oráculo centralizado.

Também é possível que oráculos baseados em stake apliquem penalização aos operadores de nós que não respondem rapidamente às solicitações de dados. Isso incentiva significativamente os nós de oráculo a investir em infraestrutura tolerante a falhas e fornecer dados em tempo hábil.

### Boa compatibilidade de incentivos {#good-incentive-compatibility}

Os oráculos descentralizados implementam vários designs de incentivos para evitar o comportamento [Bizantino](https://en.wikipedia.org/wiki/Byzantine_fault) entre os nós de oráculo. Especificamente, eles alcançam _atribuibilidade_ e _responsabilidade_:

1. Os nós de oráculo descentralizados geralmente são obrigados a assinar os dados que fornecem em resposta a solicitações de dados. Essas informações ajudam a avaliar o desempenho histórico dos nós de oráculo, de modo que os usuários possam filtrar nós de oráculo não confiáveis ao fazer solicitações de dados. Um exemplo é o [Sistema de Reputação Algorítmica](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) da Witnet.

2. Os oráculos descentralizados — conforme explicado anteriormente — podem exigir que os nós façam um stake em sua confiança na veracidade dos dados que enviam. Se a afirmação for confirmada, esse stake pode ser devolvido junto com recompensas por um serviço honesto. Mas também pode sofrer penalização caso as informações estejam incorretas, o que fornece alguma medida de responsabilidade.

## Aplicações de oráculos em contratos inteligentes {#applications-of-oracles-in-smart-contracts}

A seguir estão os casos de uso comuns para oráculos no Ethereum:

### Recuperação de dados financeiros {#retrieving-financial-data}

Os aplicativos de [finanças descentralizadas](/defi/) (DeFi) permitem empréstimo, tomada de empréstimo e negociação de ativos ponto a ponto. Isso geralmente requer a obtenção de diferentes informações financeiras, incluindo dados de taxa de câmbio (para calcular o valor fiduciário de criptomoedas ou comparar preços de tokens) e dados de mercados de capitais (para calcular o valor de ativos tokenizados, como ouro ou o dólar americano).

Um protocolo de empréstimo DeFi, por exemplo, precisa consultar os preços de mercado atuais para ativos (por exemplo, ETH) depositados como colateral. Isso permite que o contrato determine o valor dos ativos colaterais e determine quanto ele pode tomar emprestado do sistema.

Os “oráculos de preços” populares (como costumam ser chamados) em DeFi incluem os Feeds de Preços da Chainlink, o [Open Price Feed](https://compound.finance/docs/prices) do Protocolo Compound, os [Preços Médios Ponderados pelo Tempo (TWAPs)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) do Uniswap e os [Oráculos Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Os construtores devem entender as ressalvas que vêm com esses oráculos de preços antes de integrá-los em seus projetos. Este [artigo](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) fornece uma análise detalhada do que considerar ao planejar o uso de qualquer um dos oráculos de preços mencionados.

Abaixo está um exemplo de como você pode recuperar o preço mais recente do ETH em seu contrato inteligente usando um feed de preços da Chainlink:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Rede: Kovan
     * Agregador: ETH/USD
     * Endereço: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Retorna o preço mais recente
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

### Geração de aleatoriedade verificável {#generating-verifiable-randomness}

Certos aplicativos de blockchain, como jogos baseados em blockchain ou esquemas de loteria, exigem um alto nível de imprevisibilidade e aleatoriedade para funcionar de forma eficaz. No entanto, a execução determinística das blockchains elimina a aleatoriedade.

A abordagem original era usar funções criptográficas pseudoaleatórias, como `blockhash`, mas estas poderiam ser [manipuladas por mineradores](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) resolvendo o algoritmo de Prova de Trabalho (PoW). Além disso, a [mudança do Ethereum para Prova de Participação (PoS)](/roadmap/merge/) significa que os desenvolvedores não podem mais depender de `blockhash` para aleatoriedade onchain. O [mecanismo RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) da Beacon Chain fornece uma fonte alternativa de aleatoriedade em vez disso.

É possível gerar o valor aleatório offchain e enviá-lo onchain, mas fazer isso impõe altos requisitos de confiança aos usuários. Eles devem acreditar que o valor foi verdadeiramente gerado por meio de mecanismos imprevisíveis e não foi alterado em trânsito.

Os oráculos projetados para computação offchain resolvem esse problema gerando com segurança resultados aleatórios offchain que eles transmitem onchain juntamente com provas criptográficas atestando a imprevisibilidade do processo. Um exemplo é a [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Função Aleatória Verificável), que é um gerador de números aleatórios (RNG) comprovadamente justo e à prova de adulteração, útil para construir contratos inteligentes confiáveis para aplicativos que dependem de resultados imprevisíveis.

### Obtenção de resultados para eventos {#getting-outcomes-for-events}

Com oráculos, criar contratos inteligentes que respondem a eventos do mundo real é fácil. Os serviços de oráculos tornam isso possível permitindo que os contratos se conectem a APIs externas por meio de componentes offchain e consumam informações dessas fontes de dados. Por exemplo, o dapp de mercado de previsão mencionado anteriormente pode solicitar a um oráculo que retorne os resultados das eleições de uma fonte offchain confiável (por exemplo, a Associated Press).

O uso de oráculos para recuperar dados com base em resultados do mundo real permite outros casos de uso inovadores; por exemplo, um produto de seguro descentralizado precisa de informações precisas sobre o clima, desastres, etc. para funcionar de forma eficaz.

### Automação de contratos inteligentes {#automating-smart-contracts}

Os contratos inteligentes não são executados automaticamente; em vez disso, uma conta de propriedade externa (EOA), ou outra conta de contrato, deve acionar as funções corretas para executar o código do contrato. Na maioria dos casos, a maior parte das funções do contrato é pública e pode ser invocada por EOAs e outros contratos.

Mas também existem _funções privadas_ dentro de um contrato que são inacessíveis a outros, mas que são críticas para a funcionalidade geral de um dapp. Exemplos incluem uma função `mintERC721Token()` que cunha periodicamente novos NFTs para os usuários, uma função para conceder pagamentos em um mercado de previsão ou uma função para desbloquear tokens em stake em uma DEX.

Os desenvolvedores precisarão acionar essas funções em intervalos para manter o aplicativo funcionando sem problemas. No entanto, isso pode levar a mais horas perdidas em tarefas mundanas para os desenvolvedores, e é por isso que automatizar a execução de contratos inteligentes é atraente.

Algumas redes de oráculos descentralizadas oferecem serviços de automação, que permitem que nós de oráculo offchain acionem funções de contratos inteligentes de acordo com parâmetros definidos pelo usuário. Normalmente, isso requer o “registro” do contrato de destino no serviço de oráculo, o fornecimento de fundos para pagar o operador do oráculo e a especificação das condições ou horários para acionar o contrato.

A [Keeper Network](https://chain.link/keepers) da Chainlink oferece opções para que os contratos inteligentes terceirizem tarefas de manutenção regulares de maneira descentralizada e com minimização de confiança. Leia a [documentação oficial do Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) para obter informações sobre como tornar seu contrato compatível com o Keeper e usar o serviço Upkeep.

## Como usar oráculos de blockchain {#use-blockchain-oracles}

Existem vários aplicativos de oráculo que você pode integrar ao seu dapp do Ethereum:

**[Chainlink](https://chain.link/)** - _As redes de oráculos descentralizadas da Chainlink fornecem entradas, saídas e cálculos à prova de adulteração para dar suporte a contratos inteligentes avançados em qualquer blockchain._

**[RedStone Oracles](https://redstone.finance/)** - _A RedStone é um oráculo modular descentralizado que fornece feeds de dados otimizados para gás. É especializada em oferecer feeds de preços para ativos emergentes, como tokens de staking líquido (LSTs), tokens de restaking líquido (LRTs) e derivativos de staking de Bitcoin._

**[Chronicle](https://chroniclelabs.org/)** - _A Chronicle supera as limitações atuais de transferência de dados onchain desenvolvendo oráculos verdadeiramente escaláveis, econômicos, descentralizados e verificáveis._

**[Witnet](https://witnet.io/)** - _A Witnet é um oráculo não permissionado, descentralizado e resistente à censura que ajuda os contratos inteligentes a reagir a eventos do mundo real com fortes garantias criptoeconômicas._

**[UMA Oracle](https://uma.xyz)** - _O oráculo otimista da UMA permite que os contratos inteligentes recebam rapidamente qualquer tipo de dados para diferentes aplicativos, incluindo seguros, derivativos financeiros e mercados de previsão._

**[Tellor](https://tellor.io/)** - _A Tellor é um protocolo de oráculo transparente e não permissionado para que seu contrato inteligente obtenha facilmente quaisquer dados sempre que precisar._

**[Band Protocol](https://bandprotocol.com/)** - _O Band Protocol é uma plataforma de oráculo de dados cross-chain que agrega e conecta dados do mundo real e APIs a contratos inteligentes._

**[Pyth Network](https://pyth.network/)** - _A rede Pyth é uma rede de oráculos financeiros primários projetada para publicar dados contínuos do mundo real onchain em um ambiente resistente a adulterações, descentralizado e autossustentável._

**[API3 DAO](https://www.api3.org/)** - _A API3 DAO está fornecendo soluções de oráculos primários que oferecem maior transparência de fonte, segurança e escalabilidade em uma solução descentralizada para contratos inteligentes_

**[Supra](https://supra.com/)** - Um kit de ferramentas verticalmente integrado de soluções cross-chain que interligam todas as blockchains, públicas (L1s e L2s) ou privadas (empresas), fornecendo feeds de preços de oráculos descentralizados que podem ser usados para casos de uso onchain e offchain. 

**[Gas Network](https://gas.network/)** - Uma plataforma de oráculo distribuída que fornece dados de preço do gás em tempo real em toda a blockchain. Ao trazer dados dos principais provedores de dados de preço do gás onchain, a Gas Network está ajudando a impulsionar a interoperabilidade. A Gas Network oferece suporte a dados para mais de 35 cadeias, incluindo a Rede Principal do Ethereum e muitas L2s líderes.

**[DIA](https://www.diadata.org/)** - Uma rede de oráculos cross-chain que fornece feeds de dados verificáveis para mais de 20.000 ativos em todas as principais classes de ativos. A DIA obtém dados brutos de negociação diretamente de mais de 100 mercados primários e os calcula onchain, garantindo total transparência e verificabilidade de dados com configurações personalizadas para qualquer caso de uso.

**[Stork](https://stork.network)** - A Stork fornece dados de preços com latência ultrabaixa, suportando uma ampla gama de casos de uso, incluindo mercados perpétuos, protocolos de empréstimo e ecossistemas DeFi, com novos ativos suportados rapidamente na listagem.

## Leitura adicional {#further-reading}

**Artigos**

- [O que é um oráculo de blockchain?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [O que é um oráculo de blockchain?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Oráculos descentralizados: uma visão geral abrangente](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Implementando um oráculo de blockchain no Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Por que os contratos inteligentes não podem fazer chamadas de API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Então você quer usar um oráculo de preços](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Vídeos**

- [Oráculos e a expansão da utilidade da blockchain](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Tutoriais**

- [Como buscar o preço atual do Ethereum em Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Consumindo dados de oráculo](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_
- [Desafio de oráculos](https://speedrunethereum.com/challenge/oracles) - _Speedrun Ethereum_

**Projetos de exemplo**

- [Projeto inicial completo da Chainlink para Ethereum em Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_