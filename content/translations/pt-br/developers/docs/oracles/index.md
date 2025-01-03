---
title: Oráculos
description: Oráculos fornecem contratos inteligentes Ethereum com acesso a dados do mundo real, desbloqueando mais casos de uso e maior valor para os usuários.
lang: pt-br
---

Oráculos são feeds de dados que trazem dados de fontes de dados fora da blockchain (off-chain) e os colocam na blockchain (on-chain) para uso em contratos inteligentes. Isso é necessário porque os contratos inteligentes executados no Ethereum não podem acessar informações armazenadas fora da rede blockchain.

Dar aos contratos inteligentes a capacidade de executar usando entradas de dados fora da cadeia aumenta o valor dos aplicativos descentralizados. Por exemplo, os mercados de previsão descentralizados dependem de oráculos para fornecer informações sobre os resultados com os quais podem validar as previsões do usuário. Suponha que Alice aposte 20 ETH em quem se tornará o próximo presidente americano. Nesse caso, o dapp do mercado de previsão precisa de um oráculo para confirmar os resultados das eleições e determinar se Alice é elegível para um pagamento.

## Pré-requisitos {#prerequisites}

Esta página assume que o leitor está familiarizado com os fundamentos do Ethereum, incluindo [nós](/developers/docs/nodes-and-clients/), [mecanismos de consenso](/developers/docs/consensus-mechanisms/) e a [EVM](/developers/docs/evm/). Você também deve ter uma boa compreensão de [contratos inteligentes](/developers/docs/smart-contracts/) e [anatomia de contratos inteligentes](/developers/docs/smart-contracts/anatomy/), especialmente de [eventos](/glossary/#events).

## O que é um oráculo blockchain? {#what-is-a-blockchain-oracle}

Oráculos são aplicativos que fornecem, verificam e transmitem informações externas (ou seja, informações armazenadas fora da cadeia) para contratos inteligentes em execução na blockchain. Além de “puxar” dados off-chain e transmiti-los no Ethereum, os oráculos também podem “enviar” informações da blockchain para sistemas externos. Um exemplo deste último poderia ser um oráculo que desbloqueia um bloqueio de contrato inteligente assim que o usuário envia a taxa por meio de uma transação Ethereum.

Oráculos atuam como uma "ponte" conectando contratos inteligentes em blockchains a provedores de dados off-chain. Sem os oráculos, os aplicativos de contratos inteligentes só poderiam acessar dados on-chain. Um oráculo fornece um mecanismo para acionar funções de contrato inteligente usando dados off-chain.

Oráculos diferem com base na fonte de dados (uma ou várias fontes), modelos de confiança (centralizados ou descentralizados) e arquitetura do sistema (leitura imediata, publicação-assinatura e solicitação-resposta). Também podemos distinguir entre oráculos baseados em se eles recuperam dados externos para uso por contratos em cadeia (oráculos de entrada), enviam informações da blockchain para os aplicativos fora de cadeia (oráculos de saída) ou executam tarefas computacionais fora de cadeia (oráculos computacionais).

## Por que os contratos inteligentes precisam de oráculos? {#why-do-smart-contracts-need-oracles}

A maioria dos desenvolvedores vê os contratos inteligentes como simples pedaços de código rodando em endereços específicos na blockchain. No entanto uma visão mais geral [dos contratos inteligentes](/smart-contracts/) é que eles são programas de software autoexecutáveis capazes de forçar acordos entre as partes uma vez que as condições específicas sejam cumpridas, o que explica o termo "contratos inteligentes".

Mas usar contratos inteligentes para aplicar acordos entre pessoas não é fácil, uma vez que o Ethereum é determinístico. Um [sistema determinístico](https://en.wikipedia.org/wiki/Deterministic_algorithm) é aquele que sempre produz os mesmos resultados dado um estado inicial e uma entrada em particular – não há aleatoriedade ou variação no processo de computar as saídas das entradas.

Para alcançar a execução determinística, as blockchains limitam os nós para alcançar consenso sobre questões binárias simples (verdadeiro/falso) usando _somente_ dados armazenados na própria blockchain. Exemplos de tais perguntas incluem:

- “O proprietário da conta (identificado por uma chave pública) assinou esta transação com a chave privada emparelhada?”
- “Esta conta tem fundos suficientes para cobrir a transação?”
- “Esta transação é válida no contexto deste contrato inteligente?” etc.

Se blockchains recebessem informações de fontes externas (ou seja, do mundo real), seria impossível alcançar o determinismo, impedindo que os nós concordassem com a validade das mudanças no estado da blockchain. Tomemos, por exemplo, um contrato inteligente que executa uma transação baseada na taxa de câmbio atual ETH-USD obtida de uma API de preço tradicional. Esse número provavelmente mudaria frequentemente (sem mencionar que a API poderia ser depreciada ou hackeada), o que significa que os nós que executam o mesmo código de contrato chegariam a resultados diferentes.

Para uma blockchain pública, como a Ethereum, com milhares de nós em todo o mundo processando transações, o determinismo é crítico. Sem nenhuma autoridade central servindo como fonte da verdade, é esperado que os nós devam chegar ao mesmo estado após aplicar as mesmas transações. Um caso em que o nó A executa um código de um contrato inteligente e obtém "3" como resultado, enquanto o nó B obtém "7" após executar a mesma transação causaria a quebra do consenso e eliminaria o valor do Ethereum como uma plataforma de computação descentralizada.

O cenário descrito anteriormente também destaca o problema de projetar blockchains para extrair informações de fontes externas. Os oráculos, no entanto, resolvem esse problema pegando informações de fontes off-chain e armazenando-as na blockchain para consumo de contratos inteligentes. Como as informações armazenadas na cadeia são inalteráveis e disponíveis publicamente, os nós do Ethereum podem usar com segurança os dados off-chain importados do oráculo para calcular as mudanças de estado sem quebrar o consenso.

Para fazer isso, um oráculo é normalmente composto de um contrato inteligente executado on-chain e alguns componentes off-chain. O contrato on-chain recebe solicitações de dados de outros contratos inteligentes, que ele passa para o componente off-chain (chamado nó oráculo). Esse nó oráculo pode consultar fontes de dados – usando interfaces de programação de aplicativos (APIs), por exemplo – e enviar transações para armazenar os dados solicitados no armazenamento do contrato inteligente.

Essencialmente, um oráculo da blockchain preenche a lacuna de informações entre a blockchain e o ambiente externo, criando “contratos inteligentes híbridos”. Um contrato inteligente híbrido é aquele que funciona baseado em uma combinação de código de contrato on-chain e infraestrutura off-chain. Os mercados de previsão descentralizados, descritos na introdução, são um excelente exemplo de contratos inteligentes híbridos. Outros exemplos podem incluir contratos inteligentes de seguro de colheitas que pagam quando um conjunto de oráculos determina que certos fenômenos climáticos ocorreram.

## Qual é o problema do oráculo? {#the-oracle-problem}

É fácil fornecer aos contratos inteligentes acesso a dados off-chain, contando com uma entidade (ou várias entidades) para introduzir informações extrínsecas à blockchain, armazenando os dados no corpo de uma transação. Mas isso traz novos problemas:

- Como verificamos que as informações injetadas foram extraídas da fonte correta ou não foram adulteradas?

- Como garantimos que esses dados estejam sempre disponíveis e atualizados regularmente?

O chamado “problema do oráculo” demonstra os problemas que surgem com o uso de oráculos da blockchain para enviar entradas para contratos inteligentes. É fundamental garantir que os dados de um oráculo estejam corretos ou a execução do contrato inteligente produzirá resultados errados. Também é importante a necessidade da falta de confiança - ter que "confiar" nos operadores do oráculo para fornecer informações precisas de forma confiável rouba dos contratos inteligentes suas qualidades mais importantes.

Diferentes oráculos diferem na sua abordagem para resolver o problema do oráculo, e exploramos estas abordagens mais tarde. Embora nenhum oráculo seja perfeito, os méritos de um oráculo devem ser medidos com base em como ele lida com os seguintes desafios:

1. **Exatidão**: um oráculo não deve fazer com que contratos inteligentes acionem mudanças de estado com base em dados inválidos off-chain. Por esse motivo, um oráculo deve garantir a _autenticidade_ e a _integridade_ dos dados – autenticidade significa que os dados foram obtidos da fonte correta, enquanto a integridade significa que os dados permaneceram intactos (ou seja, não foram alterados) antes de serem enviados on-chain.

2. **Disponibilidade**: um oráculo não deve atrasar ou impedir os contratos inteligentes de executar ações e acionar alterações de estado. Essa qualidade exige que os dados de um oráculo estejam _disponíveis mediante solicitação_ sem interrupção.

3. **Compatibilidade de incentivos**: um oráculo deve incentivar provedores de dados off-chain a enviar informações corretas para contratos inteligentes. A compatibilidade de incentivo envolve _atribuição_ e _responsabilidade_. A atribuição permite correlacionar um pedaço da informação externa ao seu provedor, enquanto a responsabilidade vincula os provedores de dados às informações que eles fornecem, de modo que podem ser recompensados ou penalizados com base na qualidade das informações fornecidas.

## Como funciona um serviço de oráculo na blockchain? {#how-does-a-blockchain-oracle-service-work}

### Usuários {#users}

Usuários são entidades (ou seja, contratos inteligentes) que precisam de informação externa à blockchain para completar ações específicas. O fluxo de trabalho básico de um serviço oráculo começa com o usuário enviando uma requisição de dados para o contrato oracle. Os pedidos de dados geralmente respondem a algumas ou todas as seguintes perguntas:

1. Que fontes podem os nós off-chain consultar para conseguir as informações solicitadas?

2. Como os informantes processam informações de fontes de dados e extraem pontos de dados úteis?

3. Quantos nós oráculos podem participar na recuperação dos dados?

4. Como devem ser geridas as discrepâncias nos relatórios do oráculo?

5. Qual método deve ser implementado na filtragem de submissões e agregações dos relatórios em um único valor?

### Contrato de oráculo {#oracle-contract}

O contrato de um oráculo é o componente on-chain para o serviço do oráculo: ele escuta solicitações de dados de outros contratos, retransmite consultas de dados para nós oráculos e transmite dados retornados para contratos de clientes. Este contrato também pode executar alguma computação sobre os pontos de dados retornados para produzir um valor agregado que envia ao contrato solicitante.

O contrato oráculo expõe algumas funções que os contratos do cliente chamam ao fazer uma solicitação de dados. Ao receber uma nova consulta, o contrato inteligente emitirá um [evento de log](/developers/docs/smart-contracts/anatomy/#events-and-logs) com detalhes da solicitação de dados. Isso notifica os nós off-chain inscritos no log (geralmente usando algo como o comando JSON-RPC `eth_subscribe`), que procedem a recuperar os dados definidos no evento de log.

Abaixo está um [exemplo de contrato oráculo](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) por Pedro Costa. Este é um serviço simples de oráculo que pode consultar APIs off-chain mediante solicitação de outros contratos inteligentes e armazenar as informações solicitadas na blockchain:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //list of requests made to the contract
  uint currentId = 0; //increasing request id
  uint minQuorum = 2; //minimum number of responses to receive before declaring final result
  uint totalOracleCount = 3; // Hardcoded oracle count

  // defines a general api request
  struct Request {
    uint id;                            //request id
    string urlToQuery;                  //API url
    string attributeToFetch;            //json attribute (key) to retrieve in the response
    string agreedValue;                 //value from key
    mapping(uint => string) answers;     //answers provided by the oracles
    mapping(address => uint) quorum;    //oracles which will query the answer (1=oracle hasn't voted, 2=oracle has voted)
  }

  //event that triggers oracle outside of the blockchain
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //triggered when there's a consensus on the final result
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

    // Hardcoded oracles address
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // launch an event to be detected by oracle outside of blockchain
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // increase request id
    currentId++;
  }

  //called by the oracle to record its answer
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //check if oracle is in the list of trusted oracles
    //and if the oracle hasn't voted yet
    if(currRequest.quorum[address(msg.sender)] == 1){

      //marking that this address has voted
      currRequest.quorum[msg.sender] = 2;

      //iterate through "array" of answers until a position if free and save the retrieved value
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //find first empty slot
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterate through oracle list and check if enough oracles(minimum quorum)
      //have voted the same answer has the current one
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

### Nós oráculos {#oracle-nodes}

O nó oráculo é o componente off-chain de serviço do oráculo: ele extrai as informações de fontes externas, como APIs hospedadas em servidores de terceiros, e as coloca on-chain para consumo por contratos inteligentes. Os nós oráculos escutam eventos do contrato oráculo on-chain e prosseguem para completar a tarefa descrita no log.

Uma tarefa comum para nós oráculos é enviar uma solicitação [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) para um serviço de API, analisar a resposta para extrair dados relevantes, formatar em uma saída legível para blockchain e enviá-la on-chain incluindo-a em uma transação para o contrato do oráculo. Também é possível que seja solicitado ao nó oráculo atestar a validade e a integridade das informações enviadas usando “provas de autenticidade”, que veremos mais adiante.

Os oráculos computacionais também dependem de nós off-chain para executar tarefas computacionais intensivas, o qual seria impraticável de executar on-chain, devido aos custos de gás e aos limites de tamanho do bloco. Por exemplo, o nó oráculo pode ser encarregado de gerar uma figura verificável aleatória (por exemplo, para jogos baseados em blockchain).

## Padrões de projeto em oráculos {#oracle-design-patterns}

Oráculos vêm em diferentes tipos, incluindo _leitura imediata_, _publicação-assinatura_ e _solicitação-resposta_, com os dois últimos sendo os mais populares entre os contratos inteligentes do Ethereum. Abaixo está uma breve descrição dos dois tipos de serviços de oráculos:

### Publicação-assinatura de oráculos {#publish-subscribe-oracles}

Um serviço de oráculo baseado em um mecanismo de publicação-assinatura expõe um “feed de dados” que outros contratos podem ler regularmente para obter informações. Neste caso, espera-se que os dados mudem com frequência, portanto, os contratos do cliente devem ouvir as atualizações dos dados no armazenamento do oráculo. Um excelente exemplo é um oráculo que fornece informações sobre o último preço ETH-USD para os usuários.

### Solicitação-resposta de oráculos {#request-response-oracles}

Uma configuração de solicitação-resposta permite que o contrato do cliente solicite dados arbitrários diferentes daqueles fornecidos por um oráculo de publicação-assinatura. Oráculos de solicitação-resposta são ideais nas seguintes condições:

- O conjunto de dados é muito grande para ser armazenado em um contrato inteligente

- Os usuários só precisarão de uma pequena parte dos dados a qualquer momento

Embora mais complexos do que os modelos de publicação-assinatura, os oráculos de solicitação-resposta são basicamente o que descrevemos na seção anterior. O oráculo terá um componente on-chain que recebe uma solicitação de dados e a passa para um nó off-chain para processamento.

Os usuários que iniciam consultas de dados devem cobrir o custo de obter informações da fonte off-chain. O contrato do cliente também deve fornecer fundos para cobrir os custos de gás incorridos pelo contrato do oráculo ao retornar a resposta por meio de uma função de callback (função de retorno da chamada) na solicitação.

## Tipos de oráculos {#types-of-oracles}

### Oráculos centralizados {#centralized-oracles}

Um oráculo centralizado é controlado por uma única entidade responsável por agregar informações off-chain e atualizar os dados do contrato do oráculo conforme solicitado. Os oráculos centralizados são eficientes uma vez que dependem de uma única fonte de verdade. Eles podem até ser preferíveis nos casos em que os conjuntos de dados proprietários são publicados diretamente pelo proprietário com uma assinatura amplamente aceita. No entanto, usar um oráculo centralizado traz vários problemas.

#### Garantias de baixa exatidão {#low-correctness-guarantees}

Com oráculos centralizados, não há como confirmar se as informações prestadas estão corretas ou não. O provedor oracle pode ser "conceituado", mas isso não elimina a possibilidade de alguém se tornar desonesto ou um hacker adulterar o sistema. Se o oráculo se tornar corrompido, os contratos inteligentes serão executados com base em dados ruins.

#### Baixa disponibilidade {#poor-availability}

Os oráculos centralizados não garantem sempre disponibilizar dados off-chain para outros contratos inteligentes. Se o provedor decidir desligar o serviço ou um hacker sequestrar o componente off-chain do oráculo, seu contrato inteligente correrá o risco de um ataque de negação de serviço (DoS).

#### Incentivo insuficiente de compatibilidade {#poor-incentive-compatibility}

Oráculos centralizados muitas vezes têm incentivos mal projetados ou inexistentes para que o provedor de dados envie informações precisas/inalteradas. Pagar o oráculo por seus serviços pode encorajar um comportamento honesto, mas isso pode não ser suficiente. Com contratos inteligentes controlando enormes quantidades de valor, a recompensa pela manipulação de dados do oráculo é maior do que nunca.

### Oráculos descentralizados {#decentralized-oracles}

Os oráculos descentralizados são concebidos para superar as limitações dos oráculos centralizados, eliminando pontos únicos de fracasso. Um serviço oráculo descentralizado inclui vários participantes em uma rede peer-to-peer que formam consenso sobre dados off-chain antes de enviá-los para um contrato inteligente.

Um oráculo descentralizado deveria (idealmente) ser sem permissão, sem confiança e livre de administração por uma parte central; na realidade, a descentralização entre os oráculos é um espectro. Existem redes de oráculos semidescentralizadas onde qualquer um pode participar, mas com um "proprietário" que aprova e remove nós com base no desempenho histórico. Redes oráculas totalmente descentralizadas também existem: elas geralmente são executadas como blockchains autônomas e possuem mecanismos de consenso definidos para coordenar nós e punir o comportamento errado.

O uso de oráculos descentralizados vem com os seguintes benefícios:

### Garantias de alta exatidão {#high-correctness-guarantees}

Oráculos descentralizados tentam alcançar a exatidão dos dados utilizando diferentes abordagens. Isso inclui o uso de provas de autenticidade e integridade das informações retornadas e a exigência de que várias entidades concordem coletivamente com a validade dos dados off-chain.

#### Provas de autenticidade {#authenticity-proofs}

As provas de autenticidade são mecanismos de criptografia que permitem a verificação independente da informação recuperada de fontes externas. Estas provas podem validar a fonte da informação e detectar possíveis alterações nos dados após a recuperação.

Exemplos de provas de autenticidade incluem:

**Provas de Transport Layer Security (TLS)**: os nós oráculos geralmente recuperam dados de fontes externas usando uma conexão HTTP segura baseada no protocolo Transport Layer Security (TLS). Alguns oráculos descentralizados usam provas de autenticidade para verificar as sessões TLS (ou seja, confirmar a troca de informações entre um nó e um servidor específico) e confirmar que o conteúdo da sessão não foi alterado.

**Atestados de ambiente de execução confiável (TEE)**: um [ambiente de execução confiável](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) é um ambiente computacional reservado em área restrita isolado dos processos operacionais de seu sistema host. TEEs garantem que qualquer código de aplicativo ou dados armazenados/usados no ambiente de computação mantenham integridade, confidencialidade e imutabilidade. Os usuários também podem gerar um atestado para provar que uma instância do aplicativo está em execução no ambiente de execução confiável.

Certas classes de oráculos descentralizados exigem que os operadores de nós oráculos forneçam atestados TEE. Isto confirma para um usuário que o operador do nó está executando uma instância de cliente oráculo em um ambiente de execução confiável. TEEs impedem que processos externos alterem ou leiam o código e os dados de um aplicativo, portanto, estes atestados provam que o nó oráculo manteve as informações intactas e confidenciais.

#### Validação de informações baseadas em consenso {#consensus-based-validation-of-information}

Os oráculos centralizados dependem de uma única fonte de verdade ao fornecer dados para contratos inteligentes, que introduz a possibilidade de publicar informações imprecisas. Oráculos descentralizados resolvem este problema confiando em vários nós oráculos para consultar informações off-chain. Ao comparar dados de múltiplas fontes, os oráculos descentralizados reduzem o risco de passar informações inválidas para contratos on-chain.

Oráculos descentralizados, entretanto, devem lidar com discrepâncias nas informações recuperadas de múltiplas fontes off-chain. Para minimizar diferenças nas informações e garantir que os dados passados para o contrato do oráculo reflitam a opinião coletiva dos nós do oráculo, os oráculos descentralizados usam os seguintes mecanismos:

##### Votação/staking na precisão dos dados

Algumas redes oráculos descentralizadas exigem que os participantes votem ou apostem na precisão das respostas às consultas de dados (por exemplo, "Quem ganhou as eleições presidenciais dos EUA em 2020?") usando o token nativo da rede. Em seguida, um protocolo de agregação agrupa os votos e as apostas e considera a resposta escolhida pela maioria como a resposta válida.

Os nós cujas respostas se desviam da maioria são penalizados, tendo seus tokens distribuídos para outros que fornecem valores mais corretos. Forçar os nós a fornecer uma caução antes de proporcionar dados incentiva respostas honestas, pois se supõe que eles são atores econômicos racionais com intenção de maximizar os retornos.

O staking/votação também protege oráculos descentralizados de "ataques Sybil", em que agentes maliciosos criam várias identidades para driblar o sistema de consenso. No entanto, o staking não pode impedir o "freeloading" (nós de oráculo copiando informações dos outros) e a "validação tardia" (nós de oráculos seguindo a maioria sem verificar eles mesmos as informações).

##### Mecanismos de ponto Schelling

O [ponto de Schelling](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>) é um conceito da teoria dos jogos que assume que várias entidades encontrarão sempre por padrão uma solução comum para um problema na ausência de qualquer comunicação. Os mecanismos do ponto de Schelling são frequentemente utilizados em redes descentralizadas de oráculos para permitir que os nós cheguem a consenso sobre as respostas às solicitações de dados.

Um exemplo inicial é o [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/), uma proposta de feed de dados (oráculo), na qual os participantes submetem respostas para "escalar" perguntas (perguntas cujas respostas são descritas por magnitude, por exemplo, "qual é o preço do ETH?"), juntamente com um depósito. Os usuários que fornecem valores entre o 25º e 75º [percentil](https://en.wikipedia.org/wiki/Percentile) são recompensados, enquanto aqueles cujos valores se desviam amplamente da mediana são penalizados.

Embora o SchellingCoin não exista hoje, uma série de oráculos descentralizados, principalmente [Oráculos do Maker Protocol](https://docs.makerdao.com/smart-contract-modules/oracle-module), usam o mecanismo schelling-point para melhorar a precisão dos dados do oráculo. Cada Maker Oracle consiste de uma rede off-chain P2P de nós ("relayers" e "feeds") que submetem preços de mercado para ativos colaterais e um contrato on-chain "Medianizer" que calcula a mediana de todos os valores fornecidos. Quando o período de atraso especificado acaba, esta mediana se torna o novo preço de referência para o ativo associado.

Outros exemplos de oráculos que usam mecanismos de ponto de Schelling incluem [Chainlink Off-Chain Reporting](https://docs.chain.link/docs/off-chain-reporting/) e Witnet. Em ambos os sistemas, as respostas de nós oráculos da rede peer-to-peer são agregadas em um único valor agregado, como uma média ou mediana. Os nós são recompensados ou punidos de acordo com o grau de exatidão ou imprecisão de suas respostas com relação ao valor agregado.

Os mecanismos de ponto de Schelling são atrativos porque minimizam a pegada on-chain (apenas uma transação precisa ser enviada) enquanto garantem a descentralização. O último é possível porque os nós devem aprovar a lista de respostas submetidas antes que ela seja introduzida no algoritmo que produz o valor médio/mediano.

### Disponibilidade {#availability}

Serviços de oráculo descentralizados garantem uma elevada disponibilidade de dados off-chain para contratos inteligentes. Isso é conseguido através da descentralização tanto da fonte de informação off-chain como dos nós responsáveis pela transferência da informação on-chain.

Isto garante tolerância a falhas, uma vez que o contrato do oráculo pode depender de vários nós (que também dependem de múltiplas fontes de dados) para executar consultas a partir de outros contratos. A descentralização no nível de origem _e_ operador de nó é crucial — uma rede de nós oráculos servindo informações recuperadas da mesma fonte irá enfrentar o mesmo problema que um oráculo centralizado.

Também é possível que os oráculos baseados em stake consigam cortar operadores de nó que não respondam rapidamente a solicitações de dados. Isto incentiva significativamente os nós oráculos a investirem em infraestruturas tolerantes a falhas e fornecerem dados em tempo hábil.

### Boa compatibilidade com incentivos {#good-incentive-compatibility}

Oráculos descentralizados implementam vários designs de incentivo para evitar o comportamento [bizantino](https://en.wikipedia.org/wiki/Byzantine_fault) entre os nós oráculos. Especificamente, eles alcançam a _atribuibilidade_ e _responsabilidade_:

1. Nós oráculos descentralizados são frequentemente obrigados a assinar os dados que eles fornecem em resposta a solicitações de dados. Essa informação ajuda a avaliar o desempenho histórico de nós oráculos, para que os usuários possam filtrar nós oráculos não confiáveis ao fazer solicitações de dados. Um exemplo é o [Sistema de Reputação de Algoritmos](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) da Witnet.

2. Os oráculos descentralizados, conforme explicado anteriormente, podem exigir que os nós façam stake confiando somente na verdade dos dados que eles submetem. Se a reivindicação é confirmada, esse staking pode ser restituído juntamente com recompensas por um serviço honesto. Mas também pode ser reduzido no caso de a informação ser incorreta, o que impões certa responsabilização.

## Aplicações de oráculos em contratos inteligentes {#applications-of-oracles-in-smart-contracts}

Os seguintes são casos de uso comuns para oráculos no Ethereum:

### Como recuperar dados financeiros {#retrieving-financial-data}

As aplicações de [finanças descentralizadas](/defi/) (DeFi) permitem conceder empréstimos, pedir empréstimos e fazer trading de ativos. Tudo isso peer-to-peer. Isto muitas vezes requer obter diferentes informações relacionadas a finanças, incluindo dados de taxa de exchanges (para calcular o valor fiat de criptomoedas ou comparar preços de dois tokens) e dados de mercados de capital (para calcular o valor de ativos tokenizados, tais como ouro ou dólar americano).

Se você planeja criar um protocolo de crédito DeFi, por exemplo, você precisará consultar os preços atuais de mercado dos ativos (por exemplo, ETH) depositados como garantia. Isso é para que o seu contrato inteligente possa determinar o valor dos ativos colaterais e determinar o quanto eles podem pedir emprestado no sistema.

Os "oráculos de preços" populares (como costumam ser chamados) em DeFi incluem Chainlink Price Feeds, o protocolo composto [Open Price Feed](https://compound.finance/docs/prices), [Time-Weighted Average Prices (TWAPs)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) da Uniswap e [Maker Oracles](https://docs.makerdao.com/smart-contract-modules/oracle-module). É aconselhável entender as advertências que vêm com esses oráculos de preço antes de integrá-los no seu projeto. Este [artigo](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) fornece uma análise detalhada do que deve ser considerado ao planejar usar qualquer um dos oráculos de preço mencionados.

Abaixo é um exemplo de como obter o preço ETH mais recente em seu contrato inteligente usando um feed de preço da Chainlink:

```solidity
pragma solidity ^0.6.7;

import
"@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Intsolidityerface. ol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Rede: Kovan
     * Aggregator: ETH/USD
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
        ) = priceFeed. latestRoundData();
        return price;
    }
}
```

### Geração aleatória verificável {#generating-verifiable-randomness}

Certas aplicações da blockchain, como jogos baseados em blockchain ou esquemas de loteria, requerem um alto nível de imprevisibilidade e aleatoriedade para funcionar efetivamente. No entanto, a execução determinística de blockchains elimina qualquer fonte de aleatoriedade.

A abordagem habitual é usar funções criptográficas pseudoaleatórias, como o `blockhash`, mas isso é passível de [manipulação por outros atores](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.), nomeadamente mineradores resolvendo o algoritmo de prova de trabalho. Além disso, a [mudança para a prova de participação](/roadmap/merge/) do Ethereum significa que os desenvolvedores não podem mais confiar em `blockhash` para obter aleatoriedade on-chain (no entanto, o [mecanismo RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) da Beacon Chain fornece uma fonte alternativa de aleatoriedade).

É possível gerar o valor aleatório off-chain e enviá-lo on-chain, mas fazer isso impõe requisitos de confiança elevados aos usuários. Eles devem acreditar que o valor foi verdadeiramente gerado através de mecanismos imprevisíveis e não foi alterado em trânsito.

Oráculos projetados para computação off-chain resolvem esse problema gerando com segurança resultados aleatórios off-chain que eles emitem on-chain juntamente com provas criptográficas que atestam a imprevisibilidade do processo. Um exemplo é [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (função aleatória verificável), que é um gerador de números aleatórios (RNG, pela sigla em inglês) com prova verificável e inviolável útil para a construção de contratos inteligentes confiáveis para aplicações que dependem de resultados imprevisíveis.

### Como obter resultados para eventos {#getting-outcomes-for-events}

Com oráculos, é fácil criar contratos inteligentes que respondam a eventos do mundo real. Os serviços de oráculo tornam isso possível, permitindo que os contratos se conectem a APIs externas através de componentes off-chain e consumam informações dessas fontes de dados. Por exemplo, o dapp de previsão mencionado anteriormente pode solicitar um oráculo para retornar resultados eleitorais de uma fonte confiável off-chain (por exemplo, a Associated Press).

O uso de oráculos para recuperar dados baseados em resultados do mundo real permite outros novos casos de uso, incluindo aplicações de seguro descentralizadas. Um contrato inteligente de seguro que será pago aos usuários precisará de informações precisas (por exemplo, dados meteorológicos, relatórios de desastres, etc.) para funcionar eficazmente.

### Como automatizar contratos inteligentes {#automating-smart-contracts}

Contrariamente às descrições populares, os contratos inteligentes não funcionam automaticamente. Uma conta de propriedade externa (EOA, pela sigla em inglês), ou outra conta de contrato, deve acionar as funções certas para executar o código do contrato. Na maioria dos casos, a maior parte das funções do contrato são públicas e podem ser invocadas pelas EOAs e por outros contratos.

Mas também existem _funções privadas_ dentro de um contrato que são inacessíveis a outros; estas são geralmente essenciais para a funcionalidade geral do dapp. Exemplos potenciais incluem uma função `mintERC721Token()` que minta periodicamente novas NFT para os usuários, uma função para a atribuição de pagamentos em um mercado de previsões, ou uma função para desbloquear tokens em stake em uma DEX.

Os desenvolvedores precisarão acionar essas funções em intervalos para manter o aplicativo executando sem problemas. No entanto, isso pode fazer com que os desenvolvedores passem mais tempo em tarefas corriqueiras, e é por isso que a automação da execução de contratos inteligentes é atraente.

Algumas redes descentralizadas de oráculos oferecem serviços de automação, que permitem que nós de oráculos off-chain acionem funções de contrato inteligente de acordo com parâmetros definidos pelo usuário. Normalmente, isso requer "registrar" o contrato-alvo com o serviço oráculo, fornecendo fundos para pagar o operador do oráculo, e especificar as condições ou horários para disparar o contrato.

Um exemplo é a [Keeper Network](https://chain.link/keepers) da rede Chainlink, que fornece opções para que os contratos inteligentes terceirizem tarefas de manutenção regulares de maneira minimizada e descentralizada. Leia a [documentação oficial do Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) para obter informações sobre como tornar seu contrato compatível com o Keeper e usar o serviço Upkeep.

## Usar oráculos da blockchain {#use-blockchain-oracles}

Existem vários aplicativos de oráculos que você pode integrar no seu dapp Ethereum:

**[Chainlink](https://chain.link/)**: _a rede Chainlink de oráculos descentralizados fornece entradas, saídas e computação à prova de adulteração para suportar contratos inteligentes avançados em qualquer blockchain._

**[Witnet](https://witnet.io/)**: _Witnet é um óraculo sem permissão, descentralizado e resistente à censura, que ajuda os contratos inteligentes a reagir a eventos do mundo real com fortes garantias criptoeconômicas._

**[UMA Oracle](https://uma.xyz)** – _UMA é um oráculo otimista que permite contratos de receber, rapidamente, qualquer tipo de dados para diferentes aplicações, incluindo seguros, derivativos financeiros e mercados de previsão._

**[Tellor](https://tellor.io/)**: _Tellor é um protocolo de oráculo transparente e sem permissão para que seu contrato inteligente obtenha facilmente quaisquer dados sempre que precisar._

**[Band Protocol](https://bandprotocol.com/)**: _Band Protocol é uma plataforma de dados de oráculos cross-chain que agrega e conecta dados do mundo real e APIs a contratos inteligentes._

**[Paralink](https://paralink.network/)** — _ o Paralink fornece uma plataforma de código aberto e descentralizada de oráculos para contratos inteligentes em execução no Ethereum e em outras blockchains populares._

**[Rede Pyth](https://pyth.network/)** — _A rede Pyth é uma rede de oráculos financeiros internos projetada para publicar dados contínuos do mundo real em cadeia em um ambiente autossustentável, descentralizado e inviolável._

## Leitura Adicional {#further-reading}

**Artigos**

- [O que é um oráculo blockchain?](https://chain.link/education/blockchain-oracles) - _Chainlink_ (todos os links em inglês)
- [O que é um oráculo blockchain?](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72) - _Patrick Collins_
- [Oráculos descentralizados: um panorama abrangente](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) – _Julien Thevenard_
- [Como implementar um oráculo blockchain no Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Por que os contratos inteligentes não podem fazer chamadas à API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) - _StackExchange_
- [Por qu precisamos de oráculos descentralizados](https://newsletter.banklesshq.com/p/why-we-need-decentralized-oracles) - _Bankless_
- [Você quer usar um oráculo para preços](https://samczsun.com/so-you-want-to-use-a-price-oracle/) -_samczsun_

**Vídeos**

- [Oráculos e a expansão da utilidade da blockchain](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Tutoriais**

- [Como obter o preço atual do Ethereum em Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) - _Chainlink_

**Exemplos de projetos**

- [Projeto Chainlink inicial completo para Ethereum em Solidity](https://github.com/hackbg/chainlink-fullstack) - _HackBG_
