---
title: "Segurança de contratos inteligentes"
description: "Uma visão geral das diretrizes para a criação de contratos inteligentes seguros no Ethereum"
lang: pt-br
---

Os contratos inteligentes são extremamente flexíveis e capazes de controlar grandes quantidades de valor e dados, enquanto executam uma lógica imutável baseada em código implantado na blockchain. Isso criou um ecossistema vibrante de aplicativos descentralizados e sem necessidade de confiança que oferecem muitas vantagens sobre os sistemas legados. Eles também representam oportunidades para invasores que buscam lucrar explorando vulnerabilidades em contratos inteligentes.

Blockchains públicas, como o [Ethereum](/), complicam ainda mais a questão da segurança dos contratos inteligentes. O código de contrato implantado _geralmente_ não pode ser alterado para corrigir falhas de segurança, enquanto os ativos roubados de contratos inteligentes são extremamente difíceis de rastrear e, em sua maioria, irrecuperáveis devido à imutabilidade.

Embora os números variem, estima-se que o valor total roubado ou perdido devido a defeitos de segurança em contratos inteligentes ultrapasse facilmente a marca de US$ 1 bilhão. Isso inclui incidentes de grande repercussão, como o [hack da DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6 milhões de ETH roubados, valendo mais de US$ 1 bilhão nos preços de hoje), o [hack da carteira multisig da Parity](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) (US$ 30 milhões perdidos para hackers) e o [problema da carteira congelada da Parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (mais de US$ 300 milhões em ETH bloqueados para sempre).

Os problemas mencionados acima tornam imperativo que os desenvolvedores invistam esforço na criação de contratos inteligentes seguros, robustos e resilientes. A segurança de contratos inteligentes é um assunto sério, e que todo desenvolvedor fará bem em aprender. Este guia abordará considerações de segurança para desenvolvedores do Ethereum e explorará recursos para melhorar a segurança de contratos inteligentes.

## Pré-requisitos {#prerequisites}

Certifique-se de estar familiarizado com os [fundamentos do desenvolvimento de contratos inteligentes](/developers/docs/smart-contracts/) antes de abordar a segurança.

## Diretrizes para a construção de contratos inteligentes seguros no Ethereum {#smart-contract-security-guidelines}

### 1. Projete controles de acesso adequados {#design-proper-access-controls}

Em contratos inteligentes, funções marcadas como `public` ou `external` podem ser chamadas por quaisquer contas de propriedade externa (EOAs) ou contas de contrato. Especificar a visibilidade pública para funções é necessário se você quiser que outras pessoas interajam com seu contrato. No entanto, funções marcadas como `private` só podem ser chamadas por funções dentro do contrato inteligente, e não por contas externas. Dar a todos os participantes da rede acesso às funções do contrato pode causar problemas, especialmente se isso significar que qualquer pessoa pode realizar operações sensíveis (por exemplo, a cunhagem de novos tokens).

Para evitar o uso não autorizado de funções de contratos inteligentes, é necessário implementar controles de acesso seguros. Os mecanismos de controle de acesso restringem a capacidade de usar certas funções em um contrato inteligente a entidades aprovadas, como contas responsáveis pelo gerenciamento do contrato. O **padrão Ownable** e o **controle baseado em funções (role-based control)** são dois padrões úteis para implementar o controle de acesso em contratos inteligentes:

#### Padrão Ownable {#ownable-pattern}

No padrão Ownable, um endereço é definido como o “proprietário” (owner) do contrato durante o processo de criação do contrato. As funções protegidas recebem um modificador `OnlyOwner`, que garante que o contrato autentique a identidade do endereço chamador antes de executar a função. As chamadas para funções protegidas de outros endereços que não sejam o proprietário do contrato sempre revertem, impedindo o acesso indesejado.

#### Controle de acesso baseado em funções (Role-based access control) {#role-based-access-control}

Registrar um único endereço como `Owner` em um contrato inteligente introduz o risco de centralização e representa um ponto único de falha. Se as chaves da conta do proprietário forem comprometidas, os invasores poderão atacar o contrato de sua propriedade. É por isso que usar um padrão de controle de acesso baseado em funções com várias contas administrativas pode ser uma opção melhor.

No controle de acesso baseado em funções, o acesso a funções sensíveis é distribuído entre um conjunto de participantes confiáveis. Por exemplo, uma conta pode ser responsável pela cunhagem de tokens, enquanto outra conta realiza atualizações ou pausa o contrato. Descentralizar o controle de acesso dessa forma elimina pontos únicos de falha e reduz as premissas de confiança para os usuários.

##### Usando carteiras de multissinatura
Outra abordagem para implementar o controle de acesso seguro é usar uma [conta de multissinatura](/developers/docs/smart-contracts/#multisig) para gerenciar um contrato. Ao contrário de uma EOA comum, as contas de multissinatura pertencem a várias entidades e exigem assinaturas de um número mínimo de contas — digamos, 3 de 5 — para executar transações.

O uso de uma multisig para controle de acesso introduz uma camada extra de segurança, já que as ações no contrato alvo exigem o consentimento de várias partes. Isso é particularmente útil se o uso do padrão Ownable for necessário, pois torna mais difícil para um invasor ou um infiltrado mal-intencionado manipular funções sensíveis do contrato para fins maliciosos.

### 2. Use as instruções require(), assert() e revert() para proteger as operações do contrato {#use-require-assert-revert}

Como mencionado, qualquer pessoa pode chamar funções públicas em seu contrato inteligente assim que ele for implantado na blockchain. Como você não pode saber com antecedência como as contas externas interagirão com um contrato, o ideal é implementar salvaguardas internas contra operações problemáticas antes da implantação. Você pode impor o comportamento correto em contratos inteligentes usando as instruções `require()`, `assert()` e `revert()` para acionar exceções e reverter as alterações de estado se a execução não satisfizer determinados requisitos.

**`require()`**: `require` são definidos no início das funções e garantem que condições predefinidas sejam atendidas antes que a função chamada seja executada. Uma instrução `require` pode ser usada para validar as entradas do usuário, verificar variáveis de estado ou autenticar a identidade da conta chamadora antes de prosseguir com uma função.

**`assert()`**: `assert()` é usado para detectar erros internos e verificar violações de “invariantes” em seu código. Um invariante é uma asserção lógica sobre o estado de um contrato que deve ser verdadeira para todas as execuções de função. Um exemplo de invariante é o fornecimento total máximo ou o saldo de um contrato de token. O uso de `assert()` garante que seu contrato nunca atinja um estado vulnerável e, se isso acontecer, todas as alterações nas variáveis de estado serão revertidas.

**`revert()`**: `revert()` pode ser usado em uma instrução if-else que aciona uma exceção se a condição exigida não for satisfeita. O contrato de exemplo abaixo usa `revert()` para proteger a execução de funções:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Realiza a compra.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Teste os contratos inteligentes e verifique a exatidão do código {#test-smart-contracts-and-verify-code-correctness}

A imutabilidade do código em execução na [Máquina Virtual Ethereum](/developers/docs/evm/) significa que os contratos inteligentes exigem um nível mais alto de avaliação de qualidade durante a fase de desenvolvimento. Testar seu contrato extensivamente e observá-lo em busca de resultados inesperados melhorará muito a segurança e protegerá seus usuários a longo prazo.

O método usual é escrever pequenos testes de unidade usando dados simulados (mock data) que o contrato deve receber dos usuários. O [teste de unidade](/developers/docs/smart-contracts/testing/#unit-testing) é bom para testar a funcionalidade de certas funções e garantir que um contrato inteligente funcione conforme o esperado.

Infelizmente, o teste de unidade é minimamente eficaz para melhorar a segurança do contrato inteligente quando usado isoladamente. Um teste de unidade pode provar que uma função é executada corretamente para dados simulados, mas os testes de unidade são tão eficazes quanto os testes que são escritos. Isso dificulta a detecção de casos extremos (edge cases) não previstos e vulnerabilidades que poderiam quebrar a segurança do seu contrato inteligente.

Uma abordagem melhor é combinar testes de unidade com testes baseados em propriedades realizados usando [análise estática e dinâmica](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). A análise estática depende de representações de baixo nível, como [grafos de fluxo de controle](https://en.wikipedia.org/wiki/Control-flow_graph) e [árvores de sintaxe abstrata](https://deepsource.io/glossary/ast/) para analisar estados de programa alcançáveis e caminhos de execução. Enquanto isso, técnicas de análise dinâmica, como o [fuzzing de contratos inteligentes](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), executam o código do contrato com valores de entrada aleatórios para detectar operações que violam as propriedades de segurança.

A [verificação formal](/developers/docs/smart-contracts/formal-verification) é outra técnica para verificar propriedades de segurança em contratos inteligentes. Ao contrário dos testes regulares, a verificação formal pode provar conclusivamente a ausência de erros em um contrato inteligente. Isso é alcançado criando uma especificação formal que captura as propriedades de segurança desejadas e provando que um modelo formal dos contratos adere a essa especificação.

### 4. Peça uma revisão independente do seu código {#get-independent-code-reviews}

Depois de testar seu contrato, é bom pedir a outras pessoas que verifiquem o código-fonte em busca de problemas de segurança. Os testes não descobrirão todas as falhas em um contrato inteligente, mas obter uma revisão independente aumenta a possibilidade de detectar vulnerabilidades.

#### Auditorias {#audits}

Comissionar uma auditoria de contrato inteligente é uma maneira de conduzir uma revisão de código independente. Os auditores desempenham um papel importante em garantir que os contratos inteligentes sejam seguros e livres de defeitos de qualidade e erros de design.

Dito isso, você deve evitar tratar as auditorias como uma solução mágica. As auditorias de contratos inteligentes não detectarão todos os bugs e são projetadas principalmente para fornecer uma rodada adicional de revisões, o que pode ajudar a detectar problemas não percebidos pelos desenvolvedores durante o desenvolvimento e os testes iniciais. Você também deve seguir as melhores práticas para trabalhar com auditores, como documentar o código adequadamente e adicionar comentários em linha, para maximizar o benefício de uma auditoria de contrato inteligente.

- [Dicas e truques de auditoria de contratos inteligentes](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Aproveite ao máximo sua auditoria](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Programas de recompensas por bugs (Bug bounties) {#bug-bounties}

Configurar um programa de recompensas por bugs (bug bounty) é outra abordagem para implementar revisões de código externas. Um bug bounty é uma recompensa financeira dada a indivíduos (geralmente hackers whitehat) que descobrem vulnerabilidades em um aplicativo.

Quando usados adequadamente, os programas de recompensas por bugs dão aos membros da comunidade hacker um incentivo para inspecionar seu código em busca de falhas críticas. Um exemplo da vida real é o “bug do dinheiro infinito” que teria permitido a um invasor criar uma quantidade ilimitada de ether na [Optimism](https://www.optimism.io/), um protocolo de [camada 2 (l2)](/layer-2/) rodando no Ethereum. Felizmente, um hacker whitehat [descobriu a falha](https://www.saurik.com/optimism.html) e notificou a equipe, [ganhando um grande pagamento no processo](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Uma estratégia útil é definir o pagamento de um programa de recompensas por bugs proporcionalmente à quantidade de fundos em jogo. Descrita como a “[recompensa por bug escalável](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)”, essa abordagem fornece incentivos financeiros para que os indivíduos divulguem vulnerabilidades de forma responsável em vez de explorá-las.

### 5. Siga as melhores práticas durante o desenvolvimento de contratos inteligentes {#follow-smart-contract-development-best-practices}

A existência de auditorias e programas de recompensas por bugs não isenta sua responsabilidade de escrever código de alta qualidade. Uma boa segurança de contratos inteligentes começa seguindo processos adequados de design e desenvolvimento:

- Armazene todo o código em um sistema de controle de versão, como o git

- Faça todas as modificações de código por meio de pull requests

- Certifique-se de que os pull requests tenham pelo menos um revisor independente — se você estiver trabalhando sozinho em um projeto, considere encontrar outros desenvolvedores e trocar revisões de código

- Use um [ambiente de desenvolvimento](/developers/docs/frameworks/) para testar, compilar e implantar contratos inteligentes

- Execute seu código por meio de ferramentas básicas de análise de código, como [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril e Slither. O ideal é que você faça isso antes que cada pull request seja mesclado e compare as diferenças na saída

- Certifique-se de que seu código seja compilado sem erros e que o compilador Solidity não emita avisos

- Documente adequadamente seu código (usando [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) e descreva detalhes sobre a arquitetura do contrato em uma linguagem fácil de entender. Isso tornará mais fácil para outras pessoas auditarem e revisarem seu código.

### 6. Implemente planos robustos de recuperação de desastres {#implement-disaster-recovery-plans}

Projetar controles de acesso seguros, implementar modificadores de função e outras sugestões podem melhorar a segurança dos contratos inteligentes, mas não podem descartar a possibilidade de explorações maliciosas. A construção de contratos inteligentes seguros exige “preparação para falhas” e um plano de contingência para responder de forma eficaz aos ataques. Um plano de recuperação de desastres adequado incorporará alguns ou todos os seguintes componentes:

#### Atualizações de contrato {#contract-upgrades}

Embora os contratos inteligentes do Ethereum sejam imutáveis por padrão, é possível atingir algum grau de mutabilidade usando padrões de atualização. A atualização de contratos é necessária nos casos em que uma falha crítica torna seu contrato antigo inutilizável e a implantação de uma nova lógica é a opção mais viável.

Os mecanismos de atualização de contratos funcionam de maneira diferente, mas o “padrão proxy” é uma das abordagens mais populares para atualizar contratos inteligentes. Os [padrões proxy](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) dividem o estado e a lógica de um aplicativo entre _dois_ contratos. O primeiro contrato (chamado de 'contrato proxy') armazena variáveis de estado (por exemplo, saldos de usuários), enquanto o segundo contrato (chamado de 'contrato lógico') contém o código para executar as funções do contrato.

As contas interagem com o contrato proxy, que despacha todas as chamadas de função para o contrato lógico usando a chamada de baixo nível [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). Ao contrário de uma chamada de mensagem regular, `delegatecall()` garante que o código em execução no endereço do contrato lógico seja executado no contexto do contrato chamador. Isso significa que o contrato lógico sempre gravará no armazenamento do proxy (em vez de em seu próprio armazenamento) e os valores originais de `msg.sender` e `msg.value` serão preservados.

A delegação de chamadas para o contrato lógico exige o armazenamento de seu endereço no armazenamento do contrato proxy. Portanto, atualizar a lógica do contrato é apenas uma questão de implantar outro contrato lógico e armazenar o novo endereço no contrato proxy. Como as chamadas subsequentes ao contrato proxy são roteadas automaticamente para o novo contrato lógico, você teria “atualizado” o contrato sem realmente modificar o código.

[Mais sobre a atualização de contratos](/developers/docs/smart-contracts/upgrading/).

#### Paradas de emergência {#emergency-stops}

Como mencionado, auditorias e testes extensivos não podem descobrir todos os bugs em um contrato inteligente. Se uma vulnerabilidade aparecer em seu código após a implantação, corrigi-la será impossível, pois você não pode alterar o código em execução no endereço do contrato. Além disso, os mecanismos de atualização (por exemplo, padrões proxy) podem levar tempo para serem implementados (geralmente exigem a aprovação de diferentes partes), o que apenas dá aos invasores mais tempo para causar mais danos.

A opção nuclear é implementar uma função de “parada de emergência” que bloqueia chamadas para funções vulneráveis em um contrato. As paradas de emergência normalmente compreendem os seguintes componentes:

1. Uma variável booleana global indicando se o contrato inteligente está em um estado parado ou não. Essa variável é definida como `false` ao configurar o contrato, mas será revertida para `true` assim que o contrato for interrompido.

2. Funções que referenciam a variável booleana em sua execução. Essas funções são acessíveis quando o contrato inteligente não está parado e se tornam inacessíveis quando o recurso de parada de emergência é acionado.

3. Uma entidade que tem acesso à função de parada de emergência, que define a variável booleana como `true`. Para evitar ações maliciosas, as chamadas para essa função podem ser restritas a um endereço confiável (por exemplo, o proprietário do contrato).

Assim que o contrato ativar a parada de emergência, certas funções não poderão ser chamadas. Isso é alcançado envolvendo funções selecionadas em um modificador que faz referência à variável global. Abaixo está [um exemplo](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) descrevendo uma implementação desse padrão em contratos:

```solidity
// Este código não foi auditado profissionalmente e não faz promessas sobre segurança ou correção. Use por sua própria conta e risco.

contract EmergencyStop {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // Verifique a autorização de msg.sender aqui
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Lógica de depósito acontecendo aqui
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Saque de emergência acontecendo aqui
    }
}
```

Este exemplo mostra os recursos básicos das paradas de emergência:

- `isStopped` é um booleano que é avaliado como `false` no início e `true` quando o contrato entra no modo de emergência.

- Os modificadores de função `onlyWhenStopped` e `stoppedInEmergency` verificam a variável `isStopped`. `stoppedInEmergency` é usado para controlar funções que devem estar inacessíveis quando o contrato estiver vulnerável (por exemplo, `deposit()`). As chamadas para essas funções simplesmente reverterão.

`onlyWhenStopped` é usado para funções que devem ser chamáveis durante uma emergência (por exemplo, `emergencyWithdraw()`). Essas funções podem ajudar a resolver a situação, daí sua exclusão da lista de “funções restritas”.

O uso de uma funcionalidade de parada de emergência fornece uma medida paliativa eficaz para lidar com vulnerabilidades graves em seu contrato inteligente. No entanto, isso aumenta a necessidade de os usuários confiarem nos desenvolvedores para não ativá-la por motivos egoístas. Para esse fim, descentralizar o controle da parada de emergência, sujeitando-o a um mecanismo de votação onchain, timelock ou aprovação de uma carteira multisig, são soluções possíveis.

#### Monitoramento de eventos {#event-monitoring}

Os [eventos](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) permitem que você rastreie chamadas para funções de contratos inteligentes e monitore alterações nas variáveis de estado. O ideal é programar seu contrato inteligente para emitir um evento sempre que alguma parte realizar uma ação crítica para a segurança (por exemplo, sacar fundos).

Registrar eventos e monitorá-los offchain fornece insights sobre as operações do contrato e ajuda na descoberta mais rápida de ações maliciosas. Isso significa que sua equipe pode responder mais rapidamente a hacks e tomar medidas para mitigar o impacto nos usuários, como pausar funções ou realizar uma atualização.

Você também pode optar por uma ferramenta de monitoramento pronta para uso que encaminha alertas automaticamente sempre que alguém interage com seus contratos. Essas ferramentas permitirão que você crie alertas personalizados com base em diferentes gatilhos, como volume de transações, frequência de chamadas de função ou as funções específicas envolvidas. Por exemplo, você pode programar um alerta que chega quando o valor sacado em uma única transação ultrapassa um limite específico.

### 7. Projete sistemas de governança seguros {#design-secure-governance-systems}

Você pode querer descentralizar seu aplicativo transferindo o controle dos principais contratos inteligentes para os membros da comunidade. Nesse caso, o sistema de contratos inteligentes incluirá um módulo de governança — um mecanismo que permite aos membros da comunidade aprovar ações administrativas por meio de um sistema de governança onchain. Por exemplo, uma proposta para atualizar um contrato proxy para uma nova implementação pode ser votada pelos detentores de tokens.

A governança descentralizada pode ser benéfica, especialmente porque alinha os interesses dos desenvolvedores e dos usuários finais. No entanto, os mecanismos de governança de contratos inteligentes podem introduzir novos riscos se implementados incorretamente. Um cenário plausível é se um invasor adquirir um enorme poder de voto (medido em número de tokens mantidos) fazendo um [empréstimo relâmpago](/defi/#flash-loans) e aprovar uma proposta maliciosa.

Uma maneira de evitar problemas relacionados à governança onchain é [usar um timelock](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Um timelock impede que um contrato inteligente execute certas ações até que um período de tempo específico passe. Outras estratégias incluem atribuir um “peso de voto” a cada token com base em quanto tempo ele esteve bloqueado, ou medir o poder de voto de um endereço em um período histórico (por exemplo, 2 a 3 blocos no passado) em vez do bloco atual. Ambos os métodos reduzem a possibilidade de acumular rapidamente poder de voto para influenciar os votos onchain.

Mais sobre [como projetar sistemas de governança seguros](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [diferentes mecanismos de votação em DAOs](https://hackernoon.com/governance-is-the-holy-grail-for-daos) e [os vetores de ataque comuns a DAOs que alavancam DeFi](https://dacian.me/dao-governance-defi-attacks) nos links compartilhados.

### 8. Reduza a complexidade do código ao mínimo {#reduce-code-complexity}

Os desenvolvedores de software tradicionais estão familiarizados com o princípio KISS (“keep it simple, stupid” - mantenha isso simples, estúpido), que desaconselha a introdução de complexidade desnecessária no design de software. Isso segue o pensamento de longa data de que “sistemas complexos falham de maneiras complexas” e são mais suscetíveis a erros custosos.

Manter as coisas simples é de particular importância ao escrever contratos inteligentes, dado que os contratos inteligentes estão potencialmente controlando grandes quantidades de valor. Uma dica para alcançar a simplicidade ao escrever contratos inteligentes é reutilizar bibliotecas existentes, como a [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/), sempre que possível. Como essas bibliotecas foram extensivamente auditadas e testadas por desenvolvedores, usá-las reduz as chances de introduzir bugs ao escrever novas funcionalidades do zero.

Outro conselho comum é escrever funções pequenas e manter os contratos modulares, dividindo a lógica de negócios em vários contratos. Escrever um código mais simples não apenas reduz a superfície de ataque em um contrato inteligente, mas também torna mais fácil raciocinar sobre a exatidão do sistema geral e detectar possíveis erros de design precocemente.

### 9. Defenda-se contra vulnerabilidades comuns de contratos inteligentes {#mitigate-common-smart-contract-vulnerabilities}

#### Reentrada {#reentrancy}

A EVM não permite concorrência, o que significa que dois contratos envolvidos em uma chamada de mensagem não podem ser executados simultaneamente. Uma chamada externa pausa a execução e a memória do contrato chamador até que a chamada retorne, momento em que a execução prossegue normalmente. Esse processo pode ser formalmente descrito como a transferência do [fluxo de controle](https://www.computerhope.com/jargon/c/contflow.htm) para outro contrato.

Embora na maioria das vezes inofensiva, a transferência do fluxo de controle para contratos não confiáveis pode causar problemas, como a reentrada. Um ataque de reentrada ocorre quando um contrato malicioso chama de volta um contrato vulnerável antes que a invocação da função original seja concluída. Esse tipo de ataque é melhor explicado com um exemplo.

Considere um contrato inteligente simples ('Victim') que permite a qualquer pessoa depositar e sacar ether:

```solidity
// Este contrato é vulnerável. Não use em produção

contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Este contrato expõe uma função `withdraw()` para permitir que os usuários saquem ETH depositado anteriormente no contrato. Ao processar um saque, o contrato realiza as seguintes operações:

1. Verifica o saldo de ETH do usuário
2. Envia fundos para o endereço chamador
3. Redefine seu saldo para 0, impedindo saques adicionais do usuário

A função `withdraw()` no contrato `Victim` segue um padrão de “verificações-interações-efeitos” (checks-interactions-effects). Ele _verifica_ se as condições necessárias para a execução são satisfeitas (ou seja, o usuário tem um saldo de ETH positivo) e realiza a _interação_ enviando ETH para o endereço do chamador, antes de aplicar os _efeitos_ da transação (ou seja, reduzindo o saldo do usuário).

Se `withdraw()` for chamado de uma conta de propriedade externa (EOA), a função será executada conforme o esperado: `msg.sender.call.value()` envia ETH para o chamador. No entanto, se `msg.sender` for uma conta de contrato inteligente que chama `withdraw()`, o envio de fundos usando `msg.sender.call.value()` também acionará a execução do código armazenado nesse endereço.

Imagine que este seja o código implantado no endereço do contrato:

```solidity
 contract Attacker {
    function beginAttack() external payable {
        Victim(victim_address).deposit.value(1 ether)();
        Victim(victim_address).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(victim_address).withdraw();
        }
    }
}
```

Este contrato foi projetado para fazer três coisas:

1. Aceitar um depósito de outra conta (provavelmente a EOA do invasor)
2. Depositar 1 ETH no contrato Victim
3. Sacar o 1 ETH armazenado no contrato inteligente

Não há nada de errado aqui, exceto que `Attacker` tem outra função que chama `withdraw()` em `Victim` novamente se o gás restante da `msg.sender.call.value` de entrada for superior a 40.000. Isso dá a `Attacker` a capacidade de reentrar em `Victim` e sacar mais fundos _antes_ que a primeira invocação de `withdraw` seja concluída. O ciclo se parece com isto:

```solidity
- Attacker's EOA calls `Attacker.beginAttack()` with 1 ETH
- `Attacker.beginAttack()` deposits 1 ETH into `Victim`
- `Attacker` calls `withdraw() in `Victim`
- `Victim` checks `Attacker`’s balance (1 ETH)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function)
- `Attacker` calls `Victim.withdraw()` again (note that `Victim` hasn’t reduced `Attacker`’s balance from the first withdrawal)
- `Victim` checks `Attacker`’s balance (which is still 1 ETH because it hasn’t applied the effects of the first call)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function and allows `Attacker` to reenter the `withdraw` function)
- The process repeats until `Attacker` runs out of gas, at which point `msg.sender.call.value` returns without triggering additional withdrawals
- `Victim` finally applies the results of the first transaction (and subsequent ones) to its state, so `Attacker`’s balance is set to 0
```

O resumo é que, como o saldo do chamador não é definido como 0 até que a execução da função seja concluída, as invocações subsequentes serão bem-sucedidas e permitirão que o chamador saque seu saldo várias vezes. Esse tipo de ataque pode ser usado para drenar os fundos de um contrato inteligente, como o que aconteceu no [hack da DAO em 2016](https://www.coindesk.com/learn/understanding-the-dao-attack). Os ataques de reentrada ainda são um problema crítico para os contratos inteligentes hoje, como mostram as [listagens públicas de explorações de reentrada](https://github.com/pcaversaccio/reentrancy-attacks).

##### Como evitar ataques de reentrada
Uma abordagem para lidar com a reentrada é seguir o [padrão de verificações-efeitos-interações (checks-effects-interactions)](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Esse padrão ordena a execução de funções de forma que o código que realiza as verificações necessárias antes de prosseguir com a execução venha primeiro, seguido pelo código que manipula o estado do contrato, com o código que interage com outros contratos ou EOAs chegando por último.

O padrão de verificações-efeitos-interações é usado em uma versão revisada do contrato `Victim` mostrada abaixo:

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

Este contrato realiza uma _verificação_ no saldo do usuário, aplica os _efeitos_ da função `withdraw()` (redefinindo o saldo do usuário para 0) e prossegue para realizar a _interação_ (enviando ETH para o endereço do usuário). Isso garante que o contrato atualize seu armazenamento antes da chamada externa, eliminando a condição de reentrada que permitiu o primeiro ataque. O contrato `Attacker` ainda poderia chamar de volta para `NoLongerAVictim`, mas como `balances[msg.sender]` foi definido como 0, saques adicionais lançarão um erro.

Outra opção é usar um bloqueio de exclusão mútua (comumente descrito como um "mutex") que bloqueia uma parte do estado de um contrato até que a invocação de uma função seja concluída. Isso é implementado usando uma variável booleana que é definida como `true` antes da execução da função e reverte para `false` após a conclusão da invocação. Como visto no exemplo abaixo, o uso de um mutex protege uma função contra chamadas recursivas enquanto a invocação original ainda está sendo processada, interrompendo efetivamente a reentrada.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Blocked from reentrancy.");
        locked = true;
        _;
        locked = false;
    }
    // Esta função é protegida por um mutex, portanto, chamadas reentrantes de dentro de `msg.sender.call` não podem chamar `withdraw` novamente.
    //  A instrução `return` é avaliada como `true`, mas ainda avalia a instrução `locked = false` no modificador
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Você também pode usar um sistema de [pagamentos pull (pull payments)](https://docs.openzeppelin.com/contracts/5.x/api/utils#security#PullPayment) que exige que os usuários saquem fundos dos contratos inteligentes, em vez de um sistema de "pagamentos push" que envia fundos para as contas. Isso remove a possibilidade de acionar inadvertidamente o código em endereços desconhecidos (e também pode evitar certos ataques de negação de serviço).

#### Underflows e overflows de inteiros {#integer-underflows-and-overflows}

Um overflow de inteiro ocorre quando os resultados de uma operação aritmética ficam fora do intervalo aceitável de valores, fazendo com que ele "zere" para o valor representável mais baixo. Por exemplo, um `uint8` só pode armazenar valores de até 2^8-1=255. As operações aritméticas que resultam em valores superiores a `255` causarão overflow e redefinirão `uint` para `0`, de forma semelhante a como o hodômetro de um carro é redefinido para 0 quando atinge a quilometragem máxima (999999).

Os underflows de inteiros acontecem por motivos semelhantes: os resultados de uma operação aritmética caem abaixo do intervalo aceitável. Digamos que você tentou decrementar `0` em um `uint8`, o resultado simplesmente voltaria para o valor máximo representável (`255`).

Tanto os overflows quanto os underflows de inteiros podem levar a alterações inesperadas nas variáveis de estado de um contrato e resultar em execução não planejada. Abaixo está um exemplo mostrando como um invasor pode explorar o overflow aritmético em um contrato inteligente para realizar uma operação inválida:

```
pragma solidity ^0.7.6;

// Este contrato foi projetado para atuar como um cofre de tempo.
// O usuário pode depositar neste contrato, mas não pode sacar por pelo menos uma semana.
// O usuário também pode estender o tempo de espera além do período de espera de 1 semana.

/*
1. Implante o TimeLock
2. Implante o Attack com o endereço do TimeLock
3. Chame Attack.attack enviando 1 ether. Você poderá sacar seu ether imediatamente.

O que aconteceu?
O Attack fez com que o TimeLock.lockTime sofresse overflow e conseguiu sacar antes do período de espera de 1 semana.
*/

contract TimeLock {
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Insufficient funds");
        require(block.timestamp > lockTime[msg.sender], "Lock time not expired");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}

contract Attack {
    TimeLock timeLock;

    constructor(TimeLock _timeLock) {
        timeLock = TimeLock(_timeLock);
    }

    fallback() external payable {}

    function attack() public payable {
        timeLock.deposit{value: msg.value}();
        /*
        se t = tempo de bloqueio atual, então precisamos encontrar x tal que
        x + t = 2**256 = 0
        então x = -t
        2**256 = type(uint).max + 1
        então x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Como evitar underflows e overflows de inteiros
A partir da versão 0.8.0, o compilador Solidity rejeita o código que resulta em underflows e overflows de inteiros. No entanto, os contratos compilados com uma versão de compilador inferior devem realizar verificações em funções que envolvem operações aritméticas ou usar uma biblioteca (por exemplo, [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) que verifica a ocorrência de underflow/overflow.

#### Manipulação de oráculo {#oracle-manipulation}

Os [oráculos](/developers/docs/oracles/) buscam informações offchain e as enviam onchain para que os contratos inteligentes as usem. Com os oráculos, você pode projetar contratos inteligentes que interoperam com sistemas offchain, como mercados de capitais, expandindo muito sua aplicação.

Mas se o oráculo for corrompido e enviar informações incorretas onchain, os contratos inteligentes serão executados com base em entradas errôneas, o que pode causar problemas. Essa é a base do “problema do oráculo”, que diz respeito à tarefa de garantir que as informações de um oráculo de blockchain sejam precisas, atualizadas e oportunas.

Uma preocupação de segurança relacionada é o uso de um oráculo onchain, como uma exchange descentralizada, para obter o preço à vista (spot price) de um ativo. As plataformas de empréstimo no setor de [finanças descentralizadas (DeFi)](/defi/) costumam fazer isso para determinar o valor do colateral de um usuário para determinar quanto ele pode tomar emprestado.

Os preços das DEXs costumam ser precisos, em grande parte devido aos arbitradores que restauram a paridade nos mercados. No entanto, eles estão abertos à manipulação, principalmente se o oráculo onchain calcular os preços dos ativos com base em padrões históricos de negociação (como costuma ser o caso).

Por exemplo, um invasor poderia inflar artificialmente o preço à vista de um ativo fazendo um empréstimo relâmpago logo antes de interagir com seu contrato de empréstimo. Consultar a DEX sobre o preço do ativo retornaria um valor mais alto do que o normal (devido à grande “ordem de compra” do invasor distorcendo a demanda pelo ativo), permitindo que ele tomasse emprestado mais do que deveria. Esses "ataques de empréstimo relâmpago" têm sido usados para explorar a dependência de oráculos de preços entre aplicativos DeFi, custando aos protocolos milhões em fundos perdidos.

##### Como evitar a manipulação de oráculos
O requisito mínimo para [evitar a manipulação de oráculos](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) é usar uma rede de oráculos descentralizada que consulta informações de várias fontes para evitar pontos únicos de falha. Na maioria dos casos, os oráculos descentralizados têm incentivos criptoeconômicos integrados para encorajar os nós do oráculo a relatar informações corretas, tornando-os mais seguros do que os oráculos centralizados.

Se você planeja consultar um oráculo onchain para obter preços de ativos, considere usar um que implemente um mecanismo de preço médio ponderado pelo tempo (TWAP). Um [oráculo TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) consulta o preço de um ativo em dois momentos diferentes (que você pode modificar) e calcula o preço à vista com base na média obtida. A escolha de períodos de tempo mais longos protege seu protocolo contra a manipulação de preços, já que grandes ordens executadas recentemente não podem impactar os preços dos ativos.

## Recursos de segurança de contratos inteligentes para desenvolvedores {#smart-contract-security-resources-for-developers}

### Ferramentas para analisar contratos inteligentes e verificar a exatidão do código {#code-analysis-tools}

- **[Ferramentas e bibliotecas de teste](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Coleção de ferramentas e bibliotecas padrão da indústria para realizar testes unitários, análise estática e análise dinâmica em contratos inteligentes._

- **[Ferramentas de verificação formal](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Ferramentas para verificar a exatidão funcional em contratos inteligentes e checar invariantes._

- **[Serviços de auditoria de contratos inteligentes](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Lista de organizações que fornecem serviços de auditoria de contratos inteligentes para projetos de desenvolvimento no Ethereum._

- **[Plataformas de bug bounty](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Plataformas para coordenar recompensas por bugs e recompensar a divulgação responsável de vulnerabilidades críticas em contratos inteligentes._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _Uma ferramenta online gratuita para verificar todas as informações disponíveis sobre um contrato bifurcado._

- **[ABI Encoder](https://abi.hashex.org/)** - _Um serviço online gratuito para codificar as funções do seu contrato em Solidity e os argumentos do construtor._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Analisador Estático de Solidity, que percorre as Árvores de Sintaxe Abstrata (AST) para identificar suspeitas de vulnerabilidades e imprimir os problemas em um formato markdown fácil de consumir._

### Ferramentas para monitorar contratos inteligentes {#smart-contract-monitoring-tools}

- **[Tenderly Real-Time Alerting](https://tenderly.co/monitoring)** - _Uma ferramenta para receber notificações em tempo real quando eventos incomuns ou inesperados acontecem em seus contratos inteligentes ou carteiras._

### Ferramentas para administração segura de contratos inteligentes {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** - _Carteira de contrato inteligente rodando no Ethereum que exige um número mínimo de pessoas para aprovar uma transação antes que ela possa ocorrer (M-de-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** - _Bibliotecas de contratos para implementar recursos administrativos, incluindo propriedade de contrato, atualizações, controles de acesso, governança, capacidade de pausa e muito mais._

### Serviços de auditoria de contratos inteligentes {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _Serviço de auditoria de contratos inteligentes que ajuda projetos em todo o ecossistema da blockchain a garantir que seus protocolos estejam prontos para o lançamento e construídos para proteger os usuários._

- **[CertiK](https://www.certik.com/)** - _Empresa de segurança em blockchain pioneira no uso de tecnologia de ponta de verificação formal em contratos inteligentes e redes blockchain._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Empresa de segurança cibernética que combina pesquisa de segurança com uma mentalidade de invasor para reduzir riscos e fortalecer o código._

- **[PeckShield](https://peckshield.com/)** - _Empresa de segurança em blockchain que oferece produtos e serviços para a segurança, privacidade e usabilidade de todo o ecossistema da blockchain._

- **[QuantStamp](https://quantstamp.com/)** - _Serviço de auditoria que facilita a adoção em massa da tecnologia blockchain por meio de serviços de segurança e avaliação de riscos._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Empresa de segurança de contratos inteligentes que fornece auditorias de segurança para sistemas distribuídos._

- **[Runtime Verification](https://runtimeverification.com/)** - _Empresa de segurança especializada em modelagem e verificação formal de contratos inteligentes._

- **[Hacken](https://hacken.io)** - _Auditor de segurança cibernética da Web3 que traz uma abordagem de 360 graus para a segurança da blockchain._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** - _Serviços de auditoria em Solidity e Cairo, garantindo a integridade dos contratos inteligentes e a segurança dos usuários no Ethereum e na Starknet._

- **[HashEx](https://hashex.org/)** - _A HashEx foca na auditoria de blockchain e contratos inteligentes para garantir a segurança das criptomoedas, fornecendo serviços como desenvolvimento de contratos inteligentes, testes de penetração e consultoria em blockchain._

- **[Code4rena](https://code4rena.com/)** - _Plataforma de auditoria competitiva que incentiva especialistas em segurança de contratos inteligentes a encontrar vulnerabilidades e ajudar a tornar a Web3 mais segura._

- **[CodeHawks](https://codehawks.com/)** - _Plataforma de auditorias competitivas que hospeda competições de auditoria de contratos inteligentes para pesquisadores de segurança._

- **[Cyfrin](https://cyfrin.io)** - _Potência em segurança da Web3, incubando a segurança cripto por meio de produtos e serviços de auditoria de contratos inteligentes._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Empresa de segurança da Web3 que oferece auditorias de segurança para sistemas blockchain por meio de uma equipe de auditores experientes e as melhores ferramentas da categoria._

- **[Oxorio](https://oxor.io/)** - _Auditorias de contratos inteligentes e serviços de segurança em blockchain com experiência em EVM, Solidity, ZK e tecnologia cross-chain para empresas cripto e projetos de finanças descentralizadas (DeFi)._

- **[Inference](https://inference.ag/)** - _Empresa de auditoria de segurança, especializada em auditoria de contratos inteligentes para blockchains baseadas na EVM. Graças aos seus auditores especialistas, eles identificam possíveis problemas e sugerem soluções acionáveis para corrigi-los antes da implantação._

### Plataformas de bug bounty {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Plataforma de bug bounty para contratos inteligentes e projetos DeFi, onde pesquisadores de segurança revisam códigos, divulgam vulnerabilidades, são pagos e tornam o mundo cripto mais seguro._

- **[HackerOne](https://www.hackerone.com/)** - _Plataforma de coordenação de vulnerabilidades e bug bounty que conecta empresas a testadores de penetração e pesquisadores de segurança cibernética._

- **[HackenProof](https://hackenproof.com/)** - _Plataforma especializada em bug bounty para projetos cripto (DeFi, Contratos Inteligentes, Carteiras, CEX e mais), onde profissionais de segurança fornecem serviços de triagem e pesquisadores são pagos por relatórios de bugs relevantes e verificados._

-  **[Sherlock](https://www.sherlock.xyz/)** - _Subscritor na Web3 para segurança de contratos inteligentes, com pagamentos para auditores gerenciados via contratos inteligentes para garantir que bugs relevantes sejam pagos de forma justa._

-  **[CodeHawks](https://www.codehawks.com/)** - _Plataforma competitiva de bug bounty onde auditores participam de concursos e desafios de segurança e (em breve) de suas próprias auditorias privadas._

### Publicações de vulnerabilidades e exploits conhecidos em contratos inteligentes {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Ataques Conhecidos a Contratos Inteligentes](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _Explicação amigável para iniciantes sobre as vulnerabilidades de contrato mais significativas, com código de exemplo para a maioria dos casos._

- **[Registro SWC](https://swcregistry.io/)** - _Lista com curadoria de itens da Enumeração de Fraquezas Comuns (CWE) que se aplicam a contratos inteligentes do Ethereum._

- **[Rekt](https://rekt.news/)** - _Publicação atualizada regularmente sobre hacks e exploits cripto de alto perfil, juntamente com relatórios post-mortem detalhados._

### Desafios para aprender sobre segurança de contratos inteligentes {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Lista com curadoria de wargames de segurança em blockchain, desafios e competições de [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) e artigos com soluções._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Wargame para aprender segurança ofensiva de contratos inteligentes DeFi e desenvolver habilidades em caça a bugs e auditoria de segurança._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Wargame baseado em Web3/Solidity onde cada nível é um contrato inteligente que precisa ser 'hackeado'._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Desafio de hacking de contratos inteligentes, ambientado em uma aventura de fantasia. A conclusão bem-sucedida do desafio também dá acesso a um programa privado de bug bounty._

### Melhores práticas para proteger contratos inteligentes {#smart-contract-security-best-practices}

- **[ConsenSys: Melhores Práticas de Segurança de Contratos Inteligentes do Ethereum](https://consensys.github.io/smart-contract-best-practices/)** - _Lista abrangente de diretrizes para proteger contratos inteligentes do Ethereum._

- **[Nascent: Kit de Ferramentas de Segurança Simples](https://github.com/nascentxyz/simple-security-toolkit)** - _Coleção de guias práticos focados em segurança e listas de verificação para o desenvolvimento de contratos inteligentes._

- **[Padrões em Solidity](https://fravoll.github.io/solidity-patterns/)** - _Compilação útil de padrões seguros e melhores práticas para a linguagem de programação de contratos inteligentes Solidity._

- **[Documentação do Solidity: Considerações de Segurança](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Diretrizes para escrever contratos inteligentes seguros com Solidity._

- **[Padrão de Verificação de Segurança de Contratos Inteligentes](https://github.com/securing/SCSVS)** - _Lista de verificação de quatorze partes criada para padronizar a segurança de contratos inteligentes para desenvolvedores, arquitetos, revisores de segurança e fornecedores._

- **[Aprenda Segurança e Auditoria de Contratos Inteligentes](https://updraft.cyfrin.io/courses/security)** - _Curso definitivo de segurança e auditoria de contratos inteligentes, criado para desenvolvedores de contratos inteligentes que buscam aprimorar suas melhores práticas de segurança e se tornarem pesquisadores de segurança._

### Tutoriais sobre segurança de contratos inteligentes {#tutorials-on-smart-contract-security}

- [Como escrever contratos inteligentes seguros](/developers/tutorials/secure-development-workflow/)

- [Como usar o Slither para encontrar bugs em contratos inteligentes](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Como usar o Manticore para encontrar bugs em contratos inteligentes](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Diretrizes de segurança de contratos inteligentes](/developers/tutorials/smart-contract-security-guidelines/)

- [Como integrar com segurança seu contrato de token com tokens arbitrários](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Curso completo de segurança e auditoria de contratos inteligentes](https://updraft.cyfrin.io/courses/security)