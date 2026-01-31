---
title: "Oráculos"
description: "Oráculos fornecem contratos inteligentes Ethereum com acesso a dados do mundo real, desbloqueando mais casos de uso e maior valor para os usuários."
lang: pt-br
---

Oráculos são aplicações que produzem data feeds que fazem dados offchain disponíveis aos contratos inteligentes. Isso é necessário porque os contratos inteligentes baseados em Ethereum não podem, por padrão, acessar informações armazenadas fora da rede blockchain.

Dar aos contratos inteligentes a capacidade de utilizar dados offchain amplia a utilidade e o valor das aplicações descentralizadas. Por exemplo, os onchain prediction markets dependem de oráculos para fornecer resultados que eles utilizam para validar as previsões aos usuários. Suponha que Alice aposte 20 ETH em quem se tornará o próximo presidente americano. Nesse caso, o dapp do mercado de previsão precisa de um oráculo para confirmar os resultados das eleições e determinar se Alice é elegível para um pagamento.

## Pré-requisitos {#prerequisites}

Esta página pressupõe que o leitor esteja familiarizado com os fundamentos do Ethereum, incluindo [nós](/developers/docs/nodes-and-clients/), [mecanismos de consenso](/developers/docs/consensus-mechanisms/) e a [EVM](/developers/docs/evm/). Você também deve ter um bom conhecimento de [contratos inteligentes](/developers/docs/smart-contracts/) e da [anatomia de contratos inteligentes](/developers/docs/smart-contracts/anatomy/), especialmente [eventos](/glossary/#events).

## O que é um oráculo blockchain? {#what-is-a-blockchain-oracle}

Oráculos são aplicações que obtêm, verificam e transmitem informações externas (ou seja, informações armazenadas fora da cadeia) para contratos inteligentes em execução na cadeia de blocos. Além de 'puxar' dados off-chain e transmiti-los no Ethereum, oráculos também podem 'empurrar' informações da blockchain para sistemas externos, por exemplo, destravando um bloqueio inteligente assim que o usuário envia uma taxa por meio de uma transação Ethereum.

Sem oráculo, um contrato inteligente estaria totalmente limitado aos dados on-chain.

Oráculos diferem com base na fonte de dados (uma ou várias fontes), modelos de confiança (centralizados ou descentralizados) e arquitetura do sistema (leitura imediata, publicação-assinatura e solicitação-resposta). Também podemos distinguir oráculos baseados em se eles recuperam dados externos por contratos onchain (oráculos de entrada), enviam informações do blockchain para as aplicações offchain (oráculos de saída) ou executam tarefas computacionais offchain (oráculos computacionais).

## Por que os contratos inteligentes precisam de oráculos? {#why-do-smart-contracts-need-oracles}

Muitos desenvolvedores veem os contratos inteligentes como código executado em endereços específicos na blockchain. No entanto, uma [visão mais geral dos contratos inteligentes](/smart-contracts/) é que eles são programas de software autoexecutáveis capazes de aplicar acordos entre as partes assim que condições específicas forem atendidas - daí o termo “contratos inteligentes”.

Mas usar contratos inteligentes para aplicar acordos entre pessoas não é fácil, uma vez que o Ethereum é determinístico. Um [sistema determinístico](https://en.wikipedia.org/wiki/Deterministic_algorithm) é aquele que sempre produz os mesmos resultados, dado um estado inicial e uma entrada específica, o que significa que não há aleatoriedade ou variação no processo de computação das saídas a partir das entradas.

Para alcançar a execução determinística, as cadeias de blocos limitam os nós a alcançar um consenso sobre questões binárias simples (verdadeiro/falso) usando _somente_ dados armazenados na própria cadeia de blocos. Exemplos de tais perguntas incluem:

- “O proprietário da conta (identificado por uma chave pública) assinou esta transação com a chave privada emparelhada?”
- “Esta conta tem fundos suficientes para cobrir a transação?”
- “Esta transação é válida no contexto deste contrato inteligente?” etc.

Se blockchains recebessem informações de fontes externas (ou seja, do mundo real), seria impossível alcançar o determinismo, impedindo que os nós concordassem com a validade das mudanças no estado da blockchain. Tomemos, por exemplo, um contrato inteligente que executa uma transação baseada na taxa de câmbio atual ETH-USD obtida de uma API de preço tradicional. Essa informação provavelmente mudará com frequência (sem mencionar que a API pode ser descontinuada ou hackeada), o que significa que os nós executando o mesmo código de contrato chegariam a resultados diferentes.

Para uma blockchain pública como o Ethereum, com milhares de nós ao redor do mundo processando transações, o determinismo é crucial. Sem uma autoridade central servindo como fonte da verdade, os nós precisam de mecanismos para chegar ao mesmo estado após aplicar as mesmas transações. Um caso em que o nó A executa um código de um contrato inteligente e obtém "3" como resultado, enquanto o nó B obtém "7" após executar a mesma transação causaria a quebra do consenso e eliminaria o valor do Ethereum como uma plataforma de computação descentralizada.

Esse cenário também destaca o problema de projetar blockchains para obter informações de fontes externas. Oráculos, no entanto, resolvem este problema pegando informações off-chain e armazenando-as no blockchain por contratos inteligentes. As informações armazenadas onchain são inalteráveis e disponíveis publicamente, por isso os nós do Ethereum podem usar com segurança os dados off-chain importados por oráculo para calcular as mudanças de estado sem quebrar o consenso.

Por isto, um oráculo é normalmente composto de um contrato inteligente executado on-chain e alguns componentes off-chain. O contrato on-chain recebe pedido de dados de outros contratos inteligentes e ele passa os pedidos para off-chain (chamado nó de oráculo). Esse nó oráculo pode consultar fontes de dados – usando interfaces de programação de aplicativos (APIs), por exemplo – e enviar transações para armazenar os dados solicitados no armazenamento do contrato inteligente.

Essencialmente, um oráculo da blockchain preenche a lacuna de informações entre a blockchain e o ambiente externo, criando “contratos inteligentes híbridos”. Um contrato inteligente híbrido é a combinação de código de contrato on-chain e infraestrutura off-chain. Mercados de previsão descentralizados são um excelente exemplo de contratos inteligentes híbridos. Outros exemplos podem incluir contratos inteligentes de seguro de colheitas que pagam quando um conjunto de oráculos determina que certos fenômenos climáticos ocorreram.

## Qual é o problema do oráculo? O problema do oráculo {#the-oracle-problem}

Os oráculos resolvem um problema importante, mas também introduzem algumas complicações, por ex.,:

- Como verificamos que as informações injetadas foram extraídas da fonte correta ou não foram adulteradas?

- Como garantimos que esses dados estejam sempre disponíveis e atualizados regularmente?

O chamado “problema do oráculo” demonstra os problemas que surgem com o uso de oráculos da blockchain para enviar entradas para contratos inteligentes. Dados de um oráculo devem estar corretos para um contrato inteligente executar corretamente. Além disso, ter que "confiar" em operadores de oráculos para prover informação precisa mitiga o aspecto "incerto" dos contratos inteligentes.

Diferentes oráculos oferecem diferentes soluções para o problema do oráculo, algo que veremos depois. Os oráculos são geralmente avaliados de acordo com a capacidade deles de lidar com os seguintes desafios:

1. **Correção**: Um oráculo não deve fazer com que contratos inteligentes acionem alterações de estado com base em dados inválidos fora da cadeia. Um oráculo deve garantir a _autenticidade_ e a _integridade_ dos dados. Autenticidade significa que os dados foram obtidos da fonte correta, enquanto integridade significa que os dados permaneceram intactos (ou seja, não foram alterados) antes de serem enviados para a cadeia.

2. **Disponibilidade**: Um oráculo não deve atrasar ou impedir que contratos inteligentes executem ações e acionem alterações de estado. Isso significa que os dados de um oráculo devem estar _disponíveis sob demanda_ sem interrupção.

3. **Compatibilidade de incentivos**: Um oráculo deve incentivar os provedores de dados fora da cadeia a enviar informações corretas para contratos inteligentes. A compatibilidade de incentivos envolve _atribuibilidade_ e _responsabilização_. A capacidade de atribuição permite vincular uma parte da informação externa para o provedor dela, enquanto responsabilidade liga provedores de dados às informações fornecidas, de forma que sejam recompensados ou penalizados baseado na qualidade da informação provida.

## Como funciona um serviço de oráculo na blockchain? {#how-does-a-blockchain-oracle-service-work}

### Usuários {#users}

Usuários são entidades (ou seja, contratos inteligentes) que precisam de informação externa à blockchain para completar ações específicas. O fluxo de trabalho básico de um serviço oráculo começa com o usuário enviando uma requisição de dados para o contrato oracle. Os pedidos de dados geralmente respondem a algumas ou todas as seguintes perguntas:

1. What sources can offchain nodes consult for the requested information?

2. Como os informantes processam informações de fontes de dados e extraem pontos de dados úteis?

3. Quantos nós oráculos podem participar na recuperação dos dados?

4. Como devem ser geridas as discrepâncias nos relatórios do oráculo?

5. Qual método deve ser implementado na filtragem de submissões e agregações dos relatórios em um único valor?

### Contrato do oráculo {#oracle-contract}

O contrato de oráculo é componente onchain por serviço de oráculo. Esse aguarda requisitos de dados de outros contratos, encaminha consultas de dados para nós oráculos e transmite os dados retornados para os contratos dos clientes. Este contrato também pode realizar alguns cálculos nos dados retornados para produzir um valor agregado a ser enviado para o contrato solicitante.

O contrato oráculo expõe algumas funções que os contratos do cliente chamam ao fazer uma solicitação de dados. Ao receber uma nova consulta, o contrato inteligente emitirá um [evento de log](/developers/docs/smart-contracts/anatomy/#events-and-logs) com detalhes da solicitação de dados. Isso notifica os nós fora da cadeia inscritos no log (geralmente usando algo como o comando JSON-RPC `eth_subscribe`), que então recuperam os dados definidos no evento de log.

Abaixo está um [exemplo de contrato de oráculo](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) por Pedro Costa. É um serviço de oráculo consultar APIs off-chain e armazenar as informações no blockchain:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //lista de solicitações feitas ao contrato
  uint currentId = 0; //id da solicitação crescente
  uint minQuorum = 2; //número mínimo de respostas a serem recebidas antes de declarar o resultado final
  uint totalOracleCount = 3; // Contagem de oráculos codificada

  // define uma solicitação de API geral
  struct Request {
    uint id;                            //id da solicitação
    string urlToQuery;                  //URL da API
    string attributeToFetch;            //atributo json (chave) a ser recuperado na resposta
    string agreedValue;                 //valor da chave
    mapping(uint => string) answers;     //respostas fornecidas pelos oráculos
    mapping(address => uint) quorum;    //oráculos que consultarão a resposta (1=oráculo não votou, 2=oráculo votou)
  }

  //evento que aciona o oráculo fora da cadeia de blocos
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

    // Endereço dos oráculos codificado
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // lança um evento a ser detectado pelo oráculo fora da cadeia de blocos
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // aumenta o id da solicitação
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

      //itera através do "array" de respostas até que uma posição esteja livre e salva o valor recuperado
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //encontra o primeiro espaço vazio
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //itera através da lista de oráculos e verifica se há oráculos suficientes (quórum mínimo)
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

O nó de oráculo é o componente off-chain do serviço de oráculo. Ele extrai informações externas e as coloca onchain para serem usadas por contratos inteligentes. Os nós de oráculo seguem contratos de oráculo on-chain para completar a tarefa no log.

Uma tarefa comum para nós de oráculo é enviar uma solicitação [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) para um serviço de API, analisar a resposta para extrair dados relevantes, formatá-la em uma saída legível pela cadeia de blocos e enviá-la para a cadeia, incluindo-a em uma transação para o contrato do oráculo. Também é possível que seja solicitado ao nó oráculo atestar a validade e a integridade das informações enviadas usando “provas de autenticidade”, que veremos mais adiante.

Oráculos computacionais também dependem de nós off-chain para executar tarefas computacionais que seriam impraticáveis de realizar on-chain, devido aos custos de gás e aos limites de tamanho dos blocos. Por exemplo, o nó oráculo pode ser encarregado de gerar uma figura verificável aleatória (por exemplo, para jogos baseados em blockchain).

## Padrões de design de oráculos {#oracle-design-patterns}

Os oráculos vêm em diferentes tipos, incluindo _leitura imediata_, _publicação-assinatura_ e _solicitação-resposta_, sendo os dois últimos os mais populares entre os contratos inteligentes do Ethereum. Aqui descrevemos brevemente os modelos de "publicação-assinatura" e "solicitação-resposta".

### Oráculos de publicação-assinatura {#publish-subscribe-oracles}

Este tipo de oráculo expõe um “feed de dados” que outros contratos podem ler regularmente para obter informações. Neste caso, espera-se que os dados mudem com frequência, portanto, os contratos do cliente devem ouvir as atualizações dos dados no armazenamento do oráculo. Um exemplo é um oráculo que fornece as informações mais recentes sobre o preço ETH-USD aos usuários.

### Oráculos de solicitação-resposta {#request-response-oracles}

Uma configuração de solicitação-resposta permite que o contrato do cliente solicite dados arbitrários diferentes daqueles fornecidos por um oráculo de publicação-assinatura. Os oráculos de solicitação-resposta são ideais quando o conjunto de dados é muito grande para ser guardado no armazenamento de um contrato inteligente e/ou os usuários precisarão apenas de uma pequena parte dos dados em qualquer momento.

Embora mais complexos do que os modelos de publicação-assinatura, os oráculos de solicitação-resposta são basicamente o que descrevemos na seção anterior. O oráculo vai ter um componente on-chain que recebe uma solicitação de dados e a passa para nó off-chain para processamento.

Os usuários que requerem dados devem pagar as informações off-chain. O contrato do cliente também deve fornecer fundos para cobrir os custos de gás incorridos pelo contrato do oráculo ao retornar a resposta por meio de uma função de callback (função de retorno da chamada) na solicitação.

## Oráculos centralizados vs. descentralizados {#types-of-oracles}

### Oráculos centralizados {#centralized-oracles}

Oráculo centralizado é controlado por uma única entidade responsável por agregar informações off-chain e atualizar os dados de contrato de oráculo conforme solicitado. Os oráculos centralizados são eficientes uma vez que dependem de uma única fonte de verdade. Eles podem funcionar melhor em casos em que conjuntos de dados proprietários são publicados diretamente pelo proprietário com uma assinatura amplamente aceita. No entanto, eles também trazem benefícios:

#### Baixas garantias de correção {#low-correctness-guarantees}

Com oráculos centralizados, não há como confirmar se as informações prestadas estão corretas ou não. Até mesmo provedores "respeitáveis" podem se tornar desonestos ou ser hackeados. Se o oráculo se tornar corrompido, os contratos inteligentes serão executados com base em dados ruins.

#### Baixa disponibilidade {#poor-availability}

Os oráculos centralizados não garantem sempre disponibilizar dados off-chain por outros contratos inteligentes. Se o provedor decidir desligar o serviço ou um hacker sequestrar componente off-chain de oráculo, seu contrato inteligente terá o risco de DoS.

#### Baixa compatibilidade de incentivos {#poor-incentive-compatibility}

Oráculos centralizados muitas vezes têm incentivos mal projetados ou inexistentes para que o provedor de dados envie informações precisas/inalteradas. Pagar um oráculo pela exatidão dele não garante honestidade. Esse problema aumenta à medida que a quantidade de valor controlado pelos contratos inteligentes aumenta.

### Oráculos descentralizados {#decentralized-oracles}

Os oráculos descentralizados são concebidos para superar as limitações dos oráculos centralizados, eliminando pontos únicos de fracasso. Um serviço de oráculo descentralizado inclui vários participantes em rede peer-to-peer que formam consenso sobre dados off-chain antes de os enviar por contrato inteligente.

Um oráculo descentralizado deveria (idealmente) ser sem permissão, sem confiança e livre de administração por uma parte central; na realidade, a descentralização entre os oráculos é um espectro. Existem redes de oráculos semidescentralizadas onde qualquer um pode participar, mas com um "proprietário" que aprova e remove nós com base no desempenho histórico. Redes oráculas totalmente descentralizadas também existem: elas geralmente são executadas como blockchains autônomas e possuem mecanismos de consenso definidos para coordenar nós e punir o comportamento errado.

O uso de oráculos descentralizados vem com os seguintes benefícios:

### Altas garantias de correção {#high-correctness-guarantees}

Oráculos descentralizados tentam alcançar a exatidão dos dados utilizando diferentes abordagens. Isto inclui provas de autenticidade e integridade das informações retornadas e a exigência de que várias entidades concordem coletivamente com a validade dos dados off-chain.

#### Provas de autenticidade {#authenticity-proofs}

As provas de autenticidade são mecanismos de criptografia que permitem a verificação independente da informação recuperada de fontes externas. Estas provas podem validar a fonte da informação e detectar possíveis alterações nos dados após a recuperação.

Exemplos de provas de autenticidade incluem:

**Provas de Transport Layer Security (TLS)**: Os nós de oráculo geralmente recuperam dados de fontes externas usando uma conexão HTTP segura com base no protocolo Transport Layer Security (TLS). Alguns oráculos descentralizados usam provas de autenticidade para verificar as sessões TLS (ou seja, confirmar a troca de informações entre um nó e um servidor específico) e confirmar que o conteúdo da sessão não foi alterado.

**Atestados do Ambiente de Execução Confiável (TEE)**: Um [ambiente de execução confiável](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) é um ambiente computacional em área restrita que é isolado dos processos operacionais do seu sistema anfitrião. TEEs garantem que qualquer código de aplicativo ou dados armazenados/usados no ambiente de computação mantenham integridade, confidencialidade e imutabilidade. Os usuários também podem gerar um atestado para provar que uma instância do aplicativo está em execução no ambiente de execução confiável.

Certas classes de oráculos descentralizados exigem que os operadores de nós oráculos forneçam atestados TEE. Isto confirma para um usuário que o operador do nó está executando uma instância de cliente oráculo em um ambiente de execução confiável. TEEs impedem que processos externos alterem ou leiam o código e os dados de um aplicativo, portanto, estes atestados provam que o nó oráculo manteve as informações intactas e confidenciais.

#### Validação de informações baseada em consenso {#consensus-based-validation-of-information}

Os oráculos centralizados dependem de uma única fonte de verdade ao fornecer dados para contratos inteligentes, que introduz a possibilidade de publicar informações imprecisas. Oráculos descentralizados resolvem este problema confiando em vários nós de oráculo por consultar informações off-chain. Comparando dados de múltiplas fontes, os oráculos descentralizados reduzem o risco de passar informações inválidas para contratos on-chain.

Oráculos descentralizados, entretanto, devem lidar com discrepâncias nas informações recuperadas de múltiplas fontes off-chain. Para minimizar diferenças nas informações e garantir que os dados passados para o contrato do oráculo reflitam a opinião coletiva dos nós do oráculo, os oráculos descentralizados usam os seguintes mecanismos:

##### Votação/staking na precisão dos dados

Algumas redes oráculos descentralizadas exigem que os participantes votem ou apostem na precisão das respostas às consultas de dados (por exemplo, "Quem ganhou as eleições presidenciais dos EUA em 2020?") usando o token nativo da rede. Em seguida, um protocolo de agregação agrupa os votos e as apostas e considera a resposta escolhida pela maioria como a resposta válida.

Os nós cujas respostas se desviam da maioria são penalizados, tendo seus tokens distribuídos para outros que fornecem valores mais corretos. Forçar os nós a fornecer uma caução antes de proporcionar dados incentiva respostas honestas, pois se supõe que eles são atores econômicos racionais com intenção de maximizar os retornos.

O staking/votação também protege os oráculos descentralizados de [ataques Sybil](/glossary/#sybil-attack), em que agentes mal-intencionados criam várias identidades para manipular o sistema de consenso. No entanto, o staking não pode impedir o "freeloading" (nós de oráculo copiando informações dos outros) e a "validação tardia" (nós de oráculos seguindo a maioria sem verificar eles mesmos as informações).

##### Mecanismos de ponto Schelling

O [ponto de Schelling](https://en.wikipedia.org/wiki/Focal_point_\(game_theory\)) é um conceito da teoria dos jogos que pressupõe que várias entidades sempre adotarão uma solução comum para um problema na ausência de qualquer comunicação. Os mecanismos do ponto de Schelling são frequentemente utilizados em redes descentralizadas de oráculos para permitir que os nós cheguem a consenso sobre as respostas às solicitações de dados.

Uma ideia inicial para isso foi o [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/), um feed de dados proposto onde os participantes enviam respostas para perguntas "escalares" (perguntas cujas respostas são descritas por magnitude, por exemplo, "qual é o preço do ETH?"), juntamente com um depósito. Os usuários que fornecem valores entre o 25º e o 75º [percentil](https://en.wikipedia.org/wiki/Percentile) são recompensados, enquanto aqueles cujos valores se desviam muito do valor mediano são penalizados.

Embora o SchellingCoin não exista hoje, vários oráculos descentralizados — notavelmente os [Oráculos do Protocolo Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module) — usam o mecanismo de ponto de Schelling para melhorar a precisão dos dados do oráculo. Cada Maker Oracle tem uma rede off-chain P2P de nós ("relayers" e "feeds") que submetem market prices para colaterais e um contrato on-chain "Medianizer" que calcula a mediana de todos os valores fornecidos. Quando o período de atraso especificado acaba, esta mediana se torna o novo preço de referência para o ativo associado.

Outros exemplos de oráculos que usam mecanismos de ponto de Schelling incluem o [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) e o [Witnet](https://witnet.io/). Em ambos os sistemas, as respostas de nós oráculos da rede peer-to-peer são agregadas em um único valor agregado, como uma média ou mediana. Os nós são recompensados ou punidos de acordo com o grau de exatidão ou imprecisão de suas respostas com relação ao valor agregado.

O Schelling point é atrativo porque minimiza o espaço ocupado on-chain (apenas uma transação precisa ser enviada) enquanto garante a descentralização. O último é possível porque os nós devem aprovar a lista de respostas submetidas antes que ela seja introduzida no algoritmo que produz o valor médio/mediano.

### Disponibilidade {#availability}

Serviços de oráculo descentralizados garantem disponibilidade de dados off-chain por contratos inteligentes. Isto é o resultado da descentralização da fonte de informação off-chain e dos nós responsáveis pela transferência da informação on-chain.

Isto garante tolerância a falhas, uma vez que o contrato do oráculo pode depender de vários nós (que também dependem de múltiplas fontes de dados) para executar consultas a partir de outros contratos. A descentralização no nível da fonte _e_ do operador de nó é crucial — uma rede de nós de oráculo servindo informações recuperadas da mesma fonte enfrentará o mesmo problema que um oráculo centralizado.

Também é possível que os stake-based oráculos consigam cortar operadores de nó que não respondam rapidamente a solicitações de dados. Isto incentiva significativamente os nós oráculos a investirem em infraestruturas tolerantes a falhas e fornecerem dados em tempo hábil.

### Boa compatibilidade de incentivos {#good-incentive-compatibility}

Oráculos descentralizados implementam vários projetos de incentivo para evitar o comportamento [bizantino](https://en.wikipedia.org/wiki/Byzantine_fault) entre os nós do oráculo. Especificamente, eles alcançam _atribuibilidade_ e _responsabilização_:

1. Nós oráculos descentralizados são frequentemente obrigados a assinar os dados que eles fornecem em resposta a solicitações de dados. Essa informação ajuda a avaliar o desempenho histórico de nós oráculos, para que os usuários possam filtrar nós oráculos não confiáveis ao fazer solicitações de dados. Um exemplo é o [Sistema de Reputação Algorítmica](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) do Witnet.

2. Os oráculos descentralizados, conforme explicado anteriormente, podem exigir que os nós façam stake confiando somente na verdade dos dados que eles submetem. Se a reivindicação é confirmada, esse staking pode ser restituído juntamente com recompensas por um serviço honesto. Mas também pode ser reduzido no caso de a informação ser incorreta, o que impões certa responsabilização.

## Aplicações de oráculos em contratos inteligentes {#applications-of-oracles-in-smart-contracts}

Os seguintes são casos de uso comuns para oráculos no Ethereum:

### Recuperando dados financeiros {#retrieving-financial-data}

Aplicações de [finanças descentralizadas](/defi/) (DeFi) permitem empréstimos, recebimentos e negociação de ativos peer-to-peer. Isso geralmente requer a obtenção de diferentes informações financeiras, incluindo dados de taxa de câmbio (para calcular o valor fiduciário de criptomoedas ou comparar preços de tokens) e dados de mercados de capitais (para calcular o valor de ativos tokenizados, como ouro ou dólar americano).

Um protocolo de empréstimo DeFi, por exemplo, precisa consultar os preços de mercado atuais para ativos (por exemplo, ETH) depositados como garantia. Isso permite que o contrato determine o valor dos ativos colaterais e determine quanto ele pode tomar emprestado do sistema.

Os “oráculos de preços” populares (como são frequentemente chamados) no DeFi incluem os Feeds de Preços da Chainlink, o [Open Price Feed](https://compound.finance/docs/prices) do Protocolo Compound, os [Preços Médios Ponderados no Tempo (TWAPs)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) da Uniswap e os [Oráculos da Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Os construtores devem entender as ressalvas que acompanham esses oráculos de preços antes de integrá-los ao seu projeto. Este [artigo](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) fornece uma análise detalhada do que considerar ao planejar usar qualquer um dos oráculos de preço mencionados.

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

### Gerando aleatoriedade verificável {#generating-verifiable-randomness}

Certas aplicativos blockchain, como jogos baseados em blockchain ou esquemas de loteria, requerem um alto nível de imprevisibilidade e aleatoriedade para funcionar efetivamente. Entretanto, a execução determinística de blockchains elimina a aleatoriedade.

A abordagem original era usar funções criptográficas pseudoaleatórias, como `blockhash`, mas estas podiam ser [manipuladas por mineradores](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) resolvendo o algoritmo de prova de trabalho. Além disso, a [mudança do Ethereum para prova de participação](/roadmap/merge/) significa que os desenvolvedores não podem mais confiar no `blockhash` para aleatoriedade na cadeia. O [mecanismo RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) da Beacon Chain fornece uma fonte alternativa de aleatoriedade.

É possível gerar valor aleatório off-chain e enviá-lo on-chain, mas fazer isso requer confiança elevada aos usuários. Eles devem acreditar que o valor foi verdadeiramente gerado através de mecanismos imprevisíveis e não foi alterado em trânsito.

Os oráculos por computação off-chain resolvem este problema. Gerando com segurança resultados aleatórios off-chain, eles os emitem on-chain juntamente com provas criptográficas que atestam a imprevisibilidade do processo. Um exemplo é o [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Função Aleatória Verificável), que é um gerador de números aleatórios (RNG) comprovadamente justo e à prova de adulteração, útil para criar contratos inteligentes confiáveis para aplicações que dependem de resultados imprevisíveis.

### Obtendo resultados para eventos {#getting-outcomes-for-events}

Com oráculos, é fácil criar contratos inteligentes que respondam a eventos do mundo real. Os serviços de oráculo tornam isto possível permitindo que os contratos se conectem a APIs externas através de componentes off-chain e consumam informações dessas fontes de dados. Por exemplo, o dapp por previsão pode solicitar um oráculo por retornar resultados eleitorais de uma fonte confiável off-chain (por exemplo, Associated Press).

Usar oráculos para recuperar dados com base em resultados do mundo real permite outros novos casos de uso; por exemplo, um produto de seguro descentralizado precisa de informações precisas sobre clima, desastres, etc. para funcionar de forma eficaz.

### Automatizando contratos inteligentes {#automating-smart-contracts}

Os contratos inteligentes não são executados automaticamente; em vez disso, uma conta de propriedade externa (EOA), ou outra conta de contrato, deve acionar as funções corretas para executar o código do contrato. Na maioria dos casos, a maior parte das funções do contrato são públicas e podem ser invocadas pelas EOAs e por outros contratos.

Mas também existem _funções privadas_ dentro de um contrato que são inacessíveis para outros; mas que são críticas para a funcionalidade geral de um dapp. Exemplos incluem uma função `mintERC721Token()` que periodicamente cria novos NFTs para usuários, uma função para conceder pagamentos em um mercado de previsão ou uma função para desbloquear tokens em staking em uma DEX.

Os desenvolvedores precisarão acionar essas funções em intervalos para manter o aplicativo executando sem problemas. No entanto, isso pode fazer com que os desenvolvedores passem mais tempo em tarefas corriqueiras, e é por isso que a automação da execução de contratos inteligentes é atraente.

Algumas redes descentralizadas de oráculo oferecem serviços de automação, que permitem que nós de oráculo off-chain abrirem funções de contrato inteligente de acordo com parâmetros definidos por usuário. Normalmente, isso requer "registrar" o contrato-alvo com o serviço oráculo, fornecendo fundos para pagar o operador do oráculo, e especificar as condições ou horários para disparar o contrato.

A [Keeper Network](https://chain.link/keepers) da Chainlink fornece opções para que contratos inteligentes terceirizem tarefas de manutenção regulares de uma maneira descentralizada e com confiança minimizada. Leia a [documentação oficial do Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) para obter informações sobre como tornar seu contrato compatível com o Keeper e usar o serviço Upkeep.

## Como usar oráculos de cadeia de blocos {#use-blockchain-oracles}

Existem vários aplicativos de oráculos que você pode integrar no seu dapp Ethereum:

**[Chainlink](https://chain.link/)** - _As redes de oráculos descentralizados da Chainlink fornecem entradas, saídas e cálculos à prova de violação para dar suporte a contratos inteligentes avançados em qualquer cadeia de blocos._

**[RedStone Oracles](https://redstone.finance/)** - _A RedStone é um oráculo modular descentralizado que fornece feeds de dados otimizados para o gás._ Ela oferece price feeds por ativos emergentes, como os LSTs, LRTs e resultado da participação de Bitcoin._

**[Chronicle](https://chroniclelabs.org/)** - _A Chronicle supera as limitações atuais de transferência de dados na cadeia, desenvolvendo oráculos verdadeiramente escaláveis, econômicos, descentralizados e verificáveis._

**[Witnet](https://witnet.io/)** - _Witnet é um oráculo sem permissão, descentralizado e resistente à censura que ajuda os contratos inteligentes a reagir a eventos do mundo real com fortes garantias criptoeconômicas._

**[Oráculo da UMA](https://uma.xyz)** - _O oráculo otimista da UMA permite que contratos inteligentes recebam rapidamente qualquer tipo de dados para diferentes aplicações, incluindo seguros, derivativos financeiros e mercados de previsão._

**[Tellor](https://tellor.io/)** - _Tellor é um protocolo de oráculo transparente e sem permissão para que seu contrato inteligente obtenha facilmente quaisquer dados sempre que precisar._

**[Band Protocol](https://bandprotocol.com/)** - _O Band Protocol é uma plataforma de oráculo de dados de cadeia cruzada que agrega e conecta dados do mundo real e APIs a contratos inteligentes._

**[Pyth Network](https://pyth.network/)** - _A rede Pyth é uma rede de oráculos financeiros de primeira parte, projetada para publicar dados contínuos do mundo real na cadeia em um ambiente autossustentável, descentralizado e resistente a adulterações._

**[API3 DAO](https://www.api3.org/)** - _A API3 DAO está fornecendo soluções de oráculos primários que oferecem maior transparência, segurança e escalabilidade da fonte em uma solução descentralizada para contratos inteligentes_

**[Supra](https://supra.com/)** - Um conjunto de ferramentas verticalmente integrado de soluções de cadeia cruzada que interligam todas as cadeias de blocos, públicas (L1s e L2s) ou privadas (empresariais), fornecendo feeds de preços de oráculos descentralizados que podem ser usados para casos de uso na cadeia e fora da cadeia.

**[Gas Network](https://gas.network/)** - Uma plataforma de oráculo distribuída que fornece dados de preços de gás em tempo real em toda a cadeia de blocos. Ao trazer dados dos principais provedores de dados de preços de gás para a cadeia, a Gas Network está ajudando a impulsionar a interoperabilidade. A Gas Network oferece suporte a dados para mais de 35 cadeias, incluindo a Rede Principal Ethereum e muitas L2s líderes.

## Leitura adicional {#further-reading}

**Artigos**

- [O que é um oráculo de cadeia de blocos?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [O que é um oráculo de cadeia de blocos?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Oráculos descentralizados: uma visão geral abrangente](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Implementando um Oráculo de Cadeia de Blocos na Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Por que contratos inteligentes não podem fazer chamadas de API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Então você quer usar um oráculo de preços](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Vídeos**

- [Oráculos e a expansão da utilidade da cadeia de blocos](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Tutoriais**

- [Como buscar o preço atual do Ethereum em Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Consumindo dados de oráculos](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_

**Exemplos de projetos**

- [Projeto inicial completo da Chainlink para Ethereum em Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_
