---
title: Segurança de um Contrato Inteligente
description: Uma visão geral das diretrizes para a construção segura de contratos inteligentes na Ethereum
lang: pt-br
---

Os contratos inteligentes são extremamente flexíveis e capazes de controlar grandes quantidades de valor e dados, enquanto executam lógica imutável com base no código implantado na blockchain. Isto criou um vibrante ecossistema de aplicações descentralizadas e sem confiança que oferecem muitas vantagens sobre os sistemas legados. Eles também representam oportunidades para os invasores que procuram lucrar explorando vulnerabilidades em contratos inteligentes.

Blockchains públicas, como a Ethereum, complicam ainda mais a questão de proteger contratos inteligentes. O código do contrato implantado _geralmente_ não pode ser alterado para corrigir falhas de segurança, enquanto os ativos roubados de contratos inteligentes são extremamente difíceis de rastrear e, em sua maioria, irrecuperáveis devido à imutabilidade.

Embora os números variem, estima-se que o valor total roubado ou perdido devido a defeitos de segurança em contratos inteligentes é facilmente superior a 1 bilhão de dólares. Isso inclui incidentes de grande repercussão, como o [hack da DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6M de ETH roubados, valendo mais de US$ 1 bilhão nos preços de hoje), o [hack da carteira multi-assinatura da Parity](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) (US$ 30 milhões perdidos para hackers) e o [problema da carteira congelada da Parity](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (mais de US$ 300 milhões em ETH bloqueados para sempre).

As questões mencionadas tornam imperativo para os desenvolvedores investirem esforços na construção de contratos inteligentes seguros, sólidos e resistentes. Segurança dos contratos inteligentes é um assunto sério, e todo desenvolvedor deve aprender. Este guia abrangerá considerações de segurança para desenvolvedores de Ethereum e explorará recursos para melhorar a segurança dos contratos inteligentes.

## Pré-requisitos {#prerequisites}

Certifique-se de estar familiarizado com os [fundamentos do desenvolvimento de contratos inteligentes](/developers/docs/smart-contracts/) antes de abordar a segurança.

## Diretrizes para a criação de contratos inteligentes Ethereum seguros {#smart-contract-security-guidelines}

### 1. Projete controles de acesso adequados {#design-proper-access-controls}

Em contratos inteligentes, as funções marcadas como `public` ou `external` podem ser chamadas por quaisquer contas de propriedade externa (EOAs) ou contas de contrato. Especificar a visibilidade pública para funções é necessária se você quiser que outras pessoas interajam com seu contrato. No entanto, as funções marcadas como `private` só podem ser chamadas por funções dentro do contrato inteligente, e não por contas externas. Dar a cada participantes da rede o acesso às funções do contrato pode causar problemas, especialmente se isso significar que qualquer pessoa pode realizar operações confidenciais (por exemplo, cunhar novos tokens).

Para evitar o uso não autorizado de funções do contrato inteligente, é necessário implementar controles de acesso seguros. Os mecanismos de controle de acesso restringem a capacidade de usar determinadas funções em um contrato inteligente para entidades aprovadas, como contas responsáveis pelo gerenciamento do contrato. O **padrão Ownable** e o **controle baseado em papéis** são dois padrões úteis para a implementação do controle de acesso em contratos inteligentes:

#### Padrão Ownable {#ownable-pattern}

No padrão Proprietário, um endereço é definido como o “dono” do contrato durante o processo de criação do contrato. As funções protegidas recebem um modificador `OnlyOwner`, que garante que o contrato autentique a identidade do endereço de chamada antes de executar a função. Chamadas para funções protegidas de outros endereços além do proprietário do contrato sempre revertem, impedindo o acesso indesejado.

#### Controle de acesso baseado em papéis {#role-based-access-control}

Registrar um único endereço como `Owner` em um contrato inteligente introduz o risco de centralização e representa um único ponto de falha. Se as chaves da conta do proprietário forem comprometidas, os invasores podem invadir o contrato de propriedade. É por isso que usar um padrão de controle de acesso baseado em funções com várias contas administrativas pode ser uma opção melhor.

No controle de acesso baseado em funções, o acesso a funções confidenciais é distribuído entre um conjunto de participantes confiáveis. Por exemplo, uma conta pode ser responsável por cunhar tokens (transformar um ativo digital na blockchain), enquanto outra conta realiza atualizações ou pausa o contrato. Descentralizar o controle de acesso dessa forma elimina pontos únicos de falha e reduz as suposições de confiança para os usuários.

##### Usando carteiras multi-assinatura

Outra abordagem para implementar um controle de acesso seguro é usar uma [conta de múltiplas assinaturas](/developers/docs/smart-contracts/#multisig) para gerenciar um contrato. Ao contrário de um EOA (conta de propriedade externa) regular, as contas com várias assinaturas são de propriedade de várias entidades e exigem assinaturas de um número mínimo de contas - digamos 3 de 5 - para executar transações.

O uso de multisig (múltiplas assinaturas) para controle de acesso introduz uma camada extra de segurança, pois as ações no contrato de destino exigem o consentimento de várias partes. Isso é particularmente útil se usar o padrão Proprietário, pois torna mais difícil para um invasor ou malfeitor interno de manipular funções de contrato confidenciais para fins maliciosos.

### 2. Use as instruções `require()`, `assert()` e `revert()` para proteger as operações do contrato {#use-require-assert-revert}

Como mencionado, qualquer pessoa pode chamar funções públicas em seu contrato inteligente uma vez que ele é implantado na blockchain. Como você não pode saber com antecedência como as contas externas (EOA) vão interagir com um contrato, é ideal implementar proteções internas contra operações problemáticas antes da implantação. Você pode impor o comportamento correto em contratos inteligentes usando as instruções `require()`, `assert()` e `revert()` para acionar exceções e reverter alterações de estado se a execução falhar em satisfazer certos requisitos.

**`require()`**: As instruções `require` são definidas no início das funções e garantem que as condições predefinidas sejam atendidas antes que a função chamada seja executada. Uma instrução `require` pode ser usada para validar entradas do usuário, verificar variáveis de estado ou autenticar a identidade da conta chamadora antes de prosseguir com uma função.

**`assert()`**: `assert()` é usado para detectar erros internos e verificar violações de “invariantes” em seu código. Uma invariável é uma asserção lógica sobre o estado de um contrato que deve ser verdadeira para todas as execuções de função. Um exemplo invariável é a oferta total máxima ou saldo de um contrato de token. O uso de `assert()` garante que seu contrato nunca atinja um estado vulnerável e, se isso acontecer, todas as alterações nas variáveis de estado serão revertidas.

**`revert()`**: `revert()` pode ser usado em uma instrução if-else que aciona uma exceção se a condição necessária não for satisfeita. O contrato de exemplo abaixo usa `revert()` para proteger a execução das funções:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error NaoAutorizado();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Ether insuficiente fornecido.");
        // Realizar a compra.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert NaoAutorizado();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Teste contratos inteligentes e verifique a exatidão do código {#test-smart-contracts-and-verify-code-correctness}

A imutabilidade do código em execução na [Máquina Virtual Ethereum](/developers/docs/evm/) significa que os contratos inteligentes exigem um nível mais alto de avaliação de qualidade durante a fase de desenvolvimento. Testar seu contrato extensivamente e observá-lo para quaisquer resultados inesperados irão melhorar muito a segurança e proteger os seus usuários a longo prazo.

O método habitual é escrever pequenos testes unitários utilizando dados simulados que o contrato deverá receber dos usuários. [Teste de unidade](/developers/docs/smart-contracts/testing/#unit-testing) é bom para testar a funcionalidade de certas funções e garantir que um contrato inteligente funcione como esperado.

Infelizmente, o teste unitário é minimamente eficaz para melhorar a segurança do contrato inteligente quando usado isoladamente. Um teste unitário pode provar que uma função é executada corretamente para dados simulados (mock), mas os testes unitários são tão eficazes quanto os testes que são escritos. Isso torna difícil detectar casos perdidos de falha e vulnerabilidades que poderiam quebrar a segurança de seu contrato inteligente.

Uma abordagem melhor é combinar testes de unidade com testes baseados em propriedades, realizados usando [análise estática e dinâmica](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). A análise estática se baseia em representações de baixo nível, como [gráficos de fluxo de controle](https://en.wikipedia.org/wiki/Control-flow_graph) e [árvores de sintaxe abstrata](https://deepsource.io/glossary/ast/), para analisar os estados do programa e os caminhos de execução alcançáveis. Enquanto isso, as técnicas de análise dinâmica, como o [fuzzing de contratos inteligentes](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), executam o código do contrato com valores de entrada aleatórios para detectar operações que violam as propriedades de segurança.

[A verificação formal](/developers/docs/smart-contracts/formal-verification) é outra técnica para verificar as propriedades de segurança em contratos inteligentes. Ao contrário dos testes regulares, a verificação formal pode comprovar conclusivamente a ausência de erros em um contrato inteligente. Isso é alcançado criando uma especificação formal que captura as propriedades de segurança desejadas e provando que um modelo formal dos contratos adere a esta especificação.

### 4. Solicite uma revisão independente do seu código {#get-independent-code-reviews}

Depois de testar seu contrato, é bom pedir aos outros que verifiquem o código-fonte para quaisquer problemas de segurança. O teste não revelará todas as falhas de um contrato inteligente, mas realizar uma revisão independente aumenta a possibilidade de detectar vulnerabilidades.

#### Auditorias {#audits}

A comissão de uma auditoria de contrato inteligente é uma forma de realizar uma revisão de código independente. Os auditores desempenham um papel importante na garantia de que os contratos inteligentes sejam seguros e livres de falhas de qualidade e erros de concepção.

Com isto em mente, há que evitar tratar as auditorias como uma bala de prata. Auditorias de contratos inteligentes não irão detectar todos os bugs e são concebidas principalmente para fornecer uma rodada adicional de revisões, o qual pode ajudar a detectar problemas perdidos pelos desenvolvedores durante o desenvolvimento e testes iniciais. Você também deve seguir as práticas recomendadas para trabalhar com auditores, como documentar o código apropriadamente e adicionar comentários em linha, para maximizar o benefício de uma auditoria de contrato inteligente.

- [Dicas e truques de auditoria de contratos inteligentes](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Aproveite ao máximo sua auditoria](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Recompensas por bugs {#bug-bounties}

A criação de um programa de recompensas por bugs é outra abordagem para implementar revisões de código externas. Uma recompensa por bugs é uma recompensa financeira dada a indivíduos (geralmente hackers de chapéu branco) que descobrem vulnerabilidades em um aplicativo.

Quando usadas corretamente, as recompensas por bugs dão aos membros da comunidade hacker incentivo para inspecionar seu código em busca de falhas críticas. Um exemplo da vida real é o “bug do dinheiro infinito” que teria permitido a um invasor criar uma quantidade ilimitada de ether no [Optimism](https://www.optimism.io/), um protocolo de [Camada 2](/layer-2/) em execução no Ethereum. Felizmente, um hacker white hat [descobriu a falha](https://www.saurik.com/optimism.html) e notificou a equipe, [ganhando um grande pagamento no processo](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Uma estratégia útil é definir o pagamento de um programa de recompensas por bugs proporcionalmente à quantidade de fundos em jogo. Descrita como a “[recompensa por bug de escalabilidade](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)”, essa abordagem fornece incentivos financeiros para que indivíduos divulguem vulnerabilidades de forma responsável, em vez de explorá-las.

### 5. Siga as melhores práticas durante o desenvolvimento de contratos inteligentes {#follow-smart-contract-development-best-practices}

A existência de auditorias e recompensas por bugs não dispensa sua responsabilidade de escrever código de alta qualidade. Uma boa segurança em contrato inteligente começa com os seguintes processos de concepção e desenvolvimento adequados:

- Guarde todo o código em um sistema de controle de versão, como git

- Faça todas as modificações de código por meio de solicitações de pull (conhecido como pull request, da sigla PR)

- Garanta que as solicitações de pull (PR) tenham pelo menos um revisor independente - se você estiver trabalhando sozinho(a) em um projeto, considere encontrar outros desenvolvedores e negociar revisões de código

- Use um [ambiente de desenvolvimento](/developers/docs/frameworks/) para testar, compilar e implantar contratos inteligentes

- Execute seu código através de ferramentas básicas de análise de código, como [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril e Slither. Idealmente, você deve fazer isso antes de cada solicitação de pull ser mesclado (merge) e comparar as diferenças na saída

- Garanta que seu código seja compilado sem erros e que o compilador Solidity não emita alertas

- Documente seu código adequadamente (usando [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) e descreva detalhes sobre a arquitetura do contrato em uma linguagem de fácil compreensão. Isso facilitará para outras pessoas auditarem e revisarem seu código.

### 6. Implemente planos robustos de recuperação de desastres {#implement-disaster-recovery-plans}

Conceber controles de acesso seguros, implementar modificadores de função e outras sugestões podem melhorar a segurança do contrato inteligente, mas não podem excluir a possibilidade de explorações maliciosas. Construir contratos inteligentes seguros requer “preparar-se para falhas” e ter um plano de retorno para responder de forma eficaz a ataques. Um plano de recuperação de desastres adequado incorporará alguns ou todos os seguintes componentes:

#### Atualizações de contrato {#contract-upgrades}

Embora os contratos inteligentes Ethereum sejam imutáveis por padrão, é possível alcançar algum grau de mutabilidade usando padrões de atualização. A atualização de contratos é necessária nos casos em que uma falha crítica torna seu contrato antigo inutilizável e a implantação de uma nova lógica é a opção mais viável.

Os mecanismos de atualização de contrato funcionam de forma diferente, mas o “padrão de proxy” é uma das abordagens mais populares para atualizar contratos inteligentes. [Padrões de proxy](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) dividem o estado e a lógica de um aplicativo entre _dois_ contratos. O primeiro contrato (chamado de 'contrato de proxy') armazena variáveis de estado (por exemplo, saldos de usuários), enquanto o segundo contrato (chamado de 'contrato lógico') contém o código para executar funções de contrato.

As contas interagem com o contrato de proxy, que encaminha todas as chamadas de função para o contrato de lógica usando a chamada de baixo nível [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). Diferente de uma chamada de mensagem regular, `delegatecall()` garante que o código em execução no endereço do contrato de lógica seja executado no contexto do contrato chamador. Isso significa que o contrato de lógica sempre gravará no armazenamento do proxy (em vez de em seu próprio armazenamento) e os valores originais de `msg.sender` e `msg.value` serão preservados.

Delegar chamadas para o contrato lógico requer armazenar seu endereço no armazenamento do contrato de proxy. Portanto, atualizar a lógica do contrato é apenas uma questão de implantar outro contrato lógico e armazenar o novo endereço no contrato de proxy. Como as chamadas subsequentes para o contrato de proxy são roteadas automaticamente para o novo contrato lógico, você teria “atualizado” o contrato sem realmente modificar o código.

[Mais sobre a atualização de contratos](/developers/docs/smart-contracts/upgrading/).

#### Paradas de emergência {#emergency-stops}

Como mencionado, auditorias e testes extensivos não podem descobrir todos os bugs em um contrato inteligente. Se uma vulnerabilidade aparecer em seu código após a implantação, corrigi-la é impossível, pois você não pode alterar o código em execução no endereço do contrato. Além disso, mecanismos de atualização (por exemplo, padrões de proxy) podem levar tempo para serem implementados (eles geralmente exigem aprovação de diferentes partes), o que só dá aos invasores mais tempo para causar mais danos.

A opção nuclear é implementar uma função de “interrupção de emergência” que bloqueia chamadas para funções vulneráveis em um contrato. As interrupções ou paradas de emergência normalmente compreendem os seguintes componentes:

1. Uma variável global booleana indicando se o contrato inteligente está em um estado interrompido ou não. Esta variável é definida como `false` ao configurar o contrato, mas reverterá para `true` assim que o contrato for interrompido.

2. Funções que referenciam a variável booleana em sua execução. Essas funções são acessíveis quando o contrato inteligente não é interrompido e tornam-se inacessíveis quando o recurso da interrupção de emergência é acionado.

3. Uma entidade que tenha acesso à função de parada de emergência, que define a variável booleana como `true`. Para evitar ações maliciosas, as chamadas para essa função podem ser restritas a um endereço confiável (por exemplo, o proprietário do contrato).

Uma vez que o contrato ative a parada ou interrupção de emergência, determinadas funções não poderão ser chamadas. Isso é alcançado envolvendo funções de seleção em um modificador que faz referência à variável global. Abaixo está [um exemplo](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) que descreve uma implementação desse padrão em contratos:

```solidity
// Este código não foi auditado profissionalmente e não faz promessas sobre segurança ou exatidão. Use por sua conta e risco.

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
        // Verifique a autorização do msg.sender aqui
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Lógica de depósito aqui
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Saque de emergência aqui
    }
}
```

Este exemplo mostra as características básicas das interrupções de emergência:

- `isStopped` é uma variável booleana que avalia para `false` no início e `true` quando o contrato entra no modo de emergência.

- Os modificadores de função `onlyWhenStopped` e `stoppedInEmergency` verificam a variável `isStopped`. `stoppedInEmergency` é usado para controlar funções que devem estar inacessíveis quando o contrato está vulnerável (por exemplo, `deposit()`). As chamadas para essas funções simplesmente serão revertidas.

`onlyWhenStopped` é usado para funções que devem ser chamadas durante uma emergência (por exemplo, `emergencyWithdraw()`). Essas funções podem ajudar a resolver a situação, daí a sua exclusão da lista de “funções restritas”.

Usar uma funcionalidade de interrupção de emergência fornece um paliativo eficaz para lidar com vulnerabilidades graves em seu contrato inteligente. No entanto, aumenta a necessidade dos usuários confiarem nos desenvolvedores para não ativá-lo por razões egoístas. Para este fim, descentralizar o controle da interrupção de emergência sujeitando-o a um mecanismo de votação on-chain, como o timelock (bloqueio de tempo para transações) ou a aprovação de uma carteira de assinatura múltipla são soluções possíveis.

#### Monitoramento de eventos {#event-monitoring}

[Eventos](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) permitem que você rastreie chamadas para funções de contrato inteligente e monitore alterações nas variáveis de estado. É ideal programar seu contrato inteligente para emitir um evento sempre que alguma parte tomar uma ação crítica de segurança (por exemplo, retirar fundos).

Registrar eventos e monitorá-los off-chain fornece informações sobre as operações do contrato e auxilia na descoberta mais rápida de ações maliciosas. Isso significa que sua equipe pode responder mais rapidamente a hacks e tomar medidas para mitigar o impacto sobre os usuários, como pausar funções ou realizar uma atualização.

Você também pode optar por uma ferramenta de monitoramento pronta para uso, que encaminha alertas automaticamente, sempre que alguém interage com seus contratos. Essas ferramentas permitirão que você crie alertas personalizados com base em diferentes gatilhos, como volume de transações, frequência de chamadas de função ou funções específicas envolvidas. Por exemplo, você poderia programar um alerta que chega quando a quantia retirada em uma única transação ultrapassa determinado limite.

### 7. Projete sistemas de governança seguros {#design-secure-governance-systems}

Você pode querer descentralizar sua aplicação, transferindo o controle dos principais contratos inteligentes para os membros da comunidade. Neste caso, o sistema de contrato inteligente incluirá um módulo de governança — um mecanismo que permite que os membros da comunidade aprovem ações administrativas, por meio de um sistema de governança on-chain. Por exemplo, uma proposta para atualizar um contrato de proxy para uma nova implementação, que pode ser votada pelos detentores do token.

A governança descentralizada pode ser benéfica, especialmente porque alinha os interesses dos desenvolvedores e usuários finais. No entanto, os mecanismos de governança de contratos inteligentes podem apresentar novos riscos se implementados incorretamente. Um cenário plausível é se um invasor adquirir um enorme poder de voto (medido pelo número de tokens detidos) ao fazer um [empréstimo relâmpago](/defi/#flash-loans) e aprovar uma proposta maliciosa.

Uma forma de evitar problemas relacionados à governança on-chain é [usar um timelock](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Um timelock impede que um contrato inteligente execute certas ações até que um período específico passe. Outras estratégias incluem atribuir um “peso de voto” a cada token com base em quanto tempo ele foi bloqueado ou medir o poder de voto de um endereço em um período histórico (por exemplo, 2-3 blocos no passado) em vez do bloco atual. Ambos os métodos reduzem a possibilidade de acumular rapidamente o poder de voto para influenciar os votos on-chain.

Mais sobre [como projetar sistemas de governança seguros](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [diferentes mecanismos de votação em DAOs](https://hackernoon.com/governance-is-the-holy-grail-for-daos) e [os vetores comuns de ataque a DAOs que se aproveitam do DeFi](https://dacian.me/dao-governance-defi-attacks) nos links compartilhados.

### 8. Reduza a complexidade do código ao mínimo {#reduce-code-complexity}

Os desenvolvedores de software tradicionais estão familiarizados com o princípio KISS (“Não complique, estúpido!”), o qual aconselha a não introdução complexidade desnecessária na concepção de software. Isso segue o pensamento de longa data, de que “sistemas complexos falham de maneiras complexas” e são mais suscetíveis a erros dispendiosos.

Não complicar é de particular importância ao escrever contratos inteligentes, visto que os contratos inteligentes estão potencialmente controlando grandes quantidades de valor. Uma dica para alcançar a simplicidade ao escrever contratos inteligentes é reutilizar bibliotecas existentes, como os [Contratos OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/), sempre que possível. Como essas bibliotecas foram extensivamente auditadas e testadas pelos desenvolvedores, usá-las reduz as chances de introduzir bugs ao escrever novas funcionalidades do zero.

Outro conselho comum é escrever funções pequenas e manter contratos modulares, dividindo a lógica do negócio por vários contratos. Não só escrever um código simples reduz a superfície de ataque em um contrato inteligente, também facilita argumentar sobre a exatidão do sistema por inteiro e detectar possíveis erros de concepção mais cedo.

### 9. Defenda-se contra vulnerabilidades comuns de contratos inteligentes {#mitigate-common-smart-contract-vulnerabilities}

#### Reentrância {#reentrancy}

A EVM (Ethereum Virtual Machine) não permite concorrência (paralelismo), o que significa que dois contratos envolvidos em uma chamada de mensagem não podem ser executados simultaneamente. Uma chamada externa pausa a execução e a memória do contrato de chamada até que a chamada retorne, momento em que a execução prossegue normalmente. Este processo pode ser formalmente descrito como a transferência do [fluxo de controle](https://www.computerhope.com/jargon/c/contflow.htm) para outro contrato.

Embora a maioria seja inofensiva, a transferência de fluxo de controle para contratos não confiáveis pode causar problemas, tais como a reentrância. Um ataque de reentrância ocorre quando um contrato malicioso volta a chamar um contrato vulnerável antes que a invocação da função original ser completa. Este tipo de ataque é melhor explicado com um exemplo.

Considere um contrato inteligente ("vítima") que permite que qualquer pessoa deposite e saque Ether:

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

Este contrato expõe uma função `withdraw()` para permitir que os usuários saquem ETH previamente depositado no contrato. Ao processar uma retirada, o contrato realiza as seguintes operações:

1. Verifica o saldo de ETH do usuário
2. Envia fundos para o endereço de chamada
3. Redefine seu saldo para 0, evitando saques adicionais do usuário

A função `withdraw()` no contrato `Victim` segue um padrão de “verificações-interações-efeitos”. Ele _verifica_ se as condições necessárias para a execução são satisfeitas (ou seja, o usuário tem um saldo de ETH positivo) e realiza a _interação_ enviando ETH para o endereço do chamador, antes de aplicar os _efeitos_ da transação (ou seja, reduzindo o saldo do usuário).

Se `withdraw()` for chamada a partir de uma conta de propriedade externa (EOA), a função será executada como esperado: `msg.sender.call.value()` envia ETH para o chamador. No entanto, se `msg.sender` for uma conta de contrato inteligente que chama `withdraw()`, o envio de fundos usando `msg.sender.call.value()` também acionará a execução do código armazenado nesse endereço.

Imagine que este é o código implantado no endereço do contrato:

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

Este contrato foi concebido para fazer três coisas:

1. Aceite um depósito de outra conta (provavelmente o EOA do atacante)
2. Deposite 1 ETH no contrato Victim
3. Retire o 1 ETH armazenado no contrato inteligente

Não há nada de errado aqui, exceto que `Attacker` tem outra função que chama `withdraw()` em `Victim` novamente se o gás restante do `msg.sender.call.value` recebido for maior que 40.000. Isso dá a `Attacker` a capacidade de reentrar em `Victim` e sacar mais fundos _antes_ que a primeira invocação de `withdraw` seja concluída. O ciclo fica assim:

```solidity
- EOA do invasor chama `Attacker.beginAttack()` com 1 ETH
- `Attacker.beginAttack()` deposita 1 ETH em `Victim`
- `Attacker` chama `withdraw() em `Victim`
- `Victim` verifica o saldo do `Attacker` (1 ETH)
- `Victim` envia 1 ETH para o `Attacker` (que aciona a função padrão)
- `Attacker` chama `Victim.withdraw()` novamente (observe que `Victim` não reduziu o saldo do `Attacker` desde a primeira retirada)
- `Victim` verifica o saldo do `Attacker` (que ainda é 1 ETH porque não tem aplicado os efeitos da primeira chamada)
- `Victim` envia 1 ETH para `Attacker` (que aciona a função padrão e permite que `Attacker` entre novamente na função `withdraw`)
- O processo se repete até que `Attacker` fique sem gás, ponto em que `msg.sender.call.value` retorna sem acionar retiradas adicionais
- `Victim` finalmente aplica os resultados da primeira transação (e as subsequentes) ao seu estado, então o saldo do `Attacker` é definido para 0 (zero)
```

O resumo é que, como o saldo do chamador não é definido como 0 até que a execução da função termine, as invocações subsequentes serão bem-sucedidas e permitirão que o chamador retire seu saldo várias vezes. Esse tipo de ataque pode ser usado para drenar os fundos de um contrato inteligente, como o que aconteceu no [hack da DAO em 2016](https://www.coindesk.com/learn/understanding-the-dao-attack). Os ataques de reentrância ainda são um problema crítico para os contratos inteligentes hoje, como mostram as [listas públicas de explorações de reentrância](https://github.com/pcaversaccio/reentrancy-attacks).

##### Como prevenir ataques de reentrância

Uma abordagem para lidar com a reentrância é seguir o [padrão de verificações-efeitos-interações](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Este padrão ordena a execução de funções de forma que o código que realiza as verificações necessárias antes de prosseguir com a execução chegar primeiro, seguido pelo código que manipula o estado do contrato, com o código que interage com outros contratos ou EOAs chegando por último.

O padrão de interação de verificação-efeito é usado em uma versão revisada do contrato `Victim` mostrado abaixo:

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

Este contrato realiza uma _verificação_ no saldo do usuário, aplica os _efeitos_ da função `withdraw()` (redefinindo o saldo do usuário para 0) e prossegue para realizar a _interação_ (enviando ETH para o endereço do usuário). Isso garante que o contrato atualize seu armazenamento antes da chamada externa, eliminando a condição de reentrância que permitiu o primeiro ataque. O contrato `Attacker` ainda poderia chamar de volta `NoLongerAVictim`, mas como `balances[msg.sender]` foi definido como 0, saques adicionais gerarão um erro.

Outra opção é usar um bloqueio de exclusão mútua (comumente descrito como "mutex") que bloqueia uma porção do estado de um contrato até que a invocação de uma função seja concluída. Isso é implementado usando uma variável booleana que é definida como `true` antes que a função seja executada e reverte para `false` após a conclusão da invocação. Como visto no exemplo abaixo, usar um mutex protege uma função contra chamadas recursivas enquanto a invocação original ainda está sendo processada, efetivamente interrompendo a reentrada.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Bloqueado contra reentrância.");
        locked = true;
        _;
        locked = false;
    }
    // Esta função está protegida por um mutex, portanto, chamadas reentrantes de dentro de `msg.sender.call` não podem chamar `withdraw` novamente.
    //  A instrução `return` é avaliada como `true`, mas ainda avalia a instrução `locked = false` no modificador
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "Nenhum saldo para sacar.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Você também pode usar um sistema de [pagamentos pull](https://docs.openzeppelin.com/contracts/5.x/api/security#PullPayment) que exige que os usuários retirem fundos dos contratos inteligentes, em vez de um sistema de "pagamentos push" que envia fundos para as contas. Isso elimina a possibilidade de acionar código inadvertidamente em endereços desconhecidos (e também pode impedir determinados ataques de negação de serviço).

#### Underflows e overflows de números inteiros {#integer-underflows-and-overflows}

Um extravasamento (overflow) de números inteiros ocorre quando os resultados de uma operação aritmética ficam fora do intervalo aceitável de valores, fazendo com que ela "role" para o menor valor representável. Por exemplo, um `uint8` só pode armazenar valores até 2^8-1=255. As operações aritméticas que resultam em valores superiores a `255` sofrerão overflow e redefinirão `uint` para `0`, semelhante a como o hodômetro de um carro é redefinido para 0 quando atinge a quilometragem máxima (999999).

Underflows de inteiros acontecem por razões semelhantes: os resultados de uma operação aritmética ficam abaixo do intervalo aceitável. Digamos que você tentou decrementar `0` em um `uint8`, o resultado simplesmente passaria para o valor máximo representável (`255`).

Tanto overflows quanto underflows de inteiros podem levar a mudanças inesperadas nas variáveis de estado de um contrato e resultar em execução não planejada. Veja abaixo um exemplo mostrando como um invasor pode explorar o extravasamento aritmético em um contrato inteligente para executar uma operação inválida:

```
pragma solidity ^0.7.6;

// Este contrato foi projetado para atuar como um cofre de tempo.
// O usuário pode depositar neste contrato, mas não pode sacar por pelo menos uma semana.
// O usuário também pode estender o tempo de espera para além do período de espera de 1 semana.

/*
1. Implante o TimeLock
2. Implante o Attack com o endereço do TimeLock
3. Chame Attack.attack enviando 1 ether. Você poderá imediatamente
   sacar seu ether.

O que aconteceu?
O ataque causou o overflow de TimeLock.lockTime e foi capaz de sacar
antes do período de espera de 1 semana.
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
        require(balances[msg.sender] > 0, "Fundos insuficientes");
        require(block.timestamp > lockTime[msg.sender], "O tempo de bloqueio não expirou");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Falha ao enviar Ether");
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

##### Como evitar overflows e underflows de números inteiros

A partir da versão 0.8.0, o compilador Solidity rejeita código que resulta em underflows e overflows de números inteiros. No entanto, os contratos compilados com uma versão inferior do compilador devem realizar verificações em funções que envolvam operações aritméticas ou usar uma biblioteca (por exemplo, [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) que verifica a ocorrência de underflow/overflow.

#### Manipulação de oráculos {#oracle-manipulation}

[Oráculos](/developers/docs/oracles/) obtêm informações off-chain e as enviam on-chain para uso em contratos inteligentes. Com oráculos, você pode criar contratos inteligentes que interagem com sistemas off-chain, como mercados capitais, expandindo muito sua aplicação.

Mas se o oráculo estiver corrompido e enviar informações incorretas on-chain, os contratos inteligentes serão executados com base em entradas erradas, o que pode causar problemas. Essa é a base do “problema do oráculo” (paradoxo), que diz respeito à tarefa de garantir que as informações de um oráculo da blockchain sejam precisas, atualizadas e pontuais.

Uma preocupação de segurança relacionada está usando um oráculo on-chain, como uma troca descentralizada, para obter o preço de ponto por um ativo. As plataformas de empréstimo no setor de [finanças descentralizadas (DeFi)](/defi/) costumam fazer isso para determinar o valor da garantia de um usuário e, assim, definir o quanto ele pode tomar emprestado.

Os preços dos DEX são muitas vezes exatos, em grande parte devido aos árbitros que restauram a paridade nos mercados. Porém, eles estão abertos à manipulação, especialmente se o oráculo on-chain calcular os preços dos ativos com base em padrões históricos de negociação (como geralmente é o caso).

Por exemplo, um invasor pode explodir artificialmente o preço de um ativo fazendo um empréstimo rápido antes de interagir com seu contrato de empréstimo. Consultar o DEX pelo preço do ativo retornaria um valor mais alto do que normal (devido à grande demanda de inclinação do atacante de "ordem de compra" pelo ativo), permitir que emprestem mais do que deveriam. Esses "ataques de empréstimos rápidos" foram utilizados para explorar a dependência de preços nos oráculos de aplicações DeFi, custando protocolos milhões em fundos perdidos.

##### Como evitar manipulação de oráculos

O requisito mínimo para [evitar a manipulação de oráculos](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) é usar uma rede de oráculos descentralizada que consulta informações de várias fontes para evitar pontos únicos de falha. Na maioria dos casos, oráculos descentralizados tem incentivos criptoeconômicos incorporados para incentivar nós oráculos a relatar informações corretas, tornando-os mais seguros do que os oráculos centralizados.

Se você planeja consultar um oráculo on-chain sobre preços de ativos, considere usar um que implemente um mecanismo de preço médio ponderado por tempo (TWAP). Um [oráculo TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) consulta o preço de um ativo em dois momentos diferentes (que você pode modificar) e calcula o preço à vista com base na média obtida. Escolher períodos mais longos protege seu protocolo contra a manipulação de preços uma vez que grandes ordens executadas recentemente não podem afetar os preços dos ativos.

## Recursos de segurança de contratos inteligentes para desenvolvedores {#smart-contract-security-resources-for-developers}

### Ferramentas para analisar contratos inteligentes e verificar a correção do código {#code-analysis-tools}

- **[Ferramentas e bibliotecas de teste](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Coleção de ferramentas e bibliotecas padrão da indústria para realizar testes de unidade, análise estática e análise dinâmica em contratos inteligentes._

- **[Ferramentas de verificação formal](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Ferramentas para verificar a correção funcional em contratos inteligentes e checar invariantes._

- **[Serviços de auditoria de contratos inteligentes](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Listagem de organizações que fornecem serviços de auditoria de contratos inteligentes para projetos de desenvolvimento Ethereum._

- **[Plataformas de recompensa por bugs](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Plataformas para coordenar recompensas por bugs e premiar a divulgação responsável de vulnerabilidades críticas em contratos inteligentes._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _Uma ferramenta on-line gratuita para verificar todas as informações disponíveis sobre um contrato bifurcado._

- **[ABI Encoder](https://abi.hashex.org/)** - _Um serviço online gratuito para codificar as funções e os argumentos do construtor do seu contrato Solidity._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Analisador estático do Solidity, percorrendo as Árvores de Sintaxe Abstrata (AST) para identificar vulnerabilidades suspeitas e imprimir problemas em um formato markdown de fácil consumo._

### Ferramentas para monitorar contratos inteligentes {#smart-contract-monitoring-tools}

- **[Tenderly Real-Time Alerting](https://tenderly.co/monitoring)** - _Uma ferramenta para receber notificações em tempo real quando eventos incomuns ou inesperados acontecem em seus contratos inteligentes ou carteiras._

### Ferramentas para administração segura de contratos inteligentes {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** - _Carteira de contrato inteligente executada na Ethereum que requer um número mínimo de pessoas para aprovar uma transação antes que ela possa ocorrer (M-de-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** - _Bibliotecas de contratos para implementar recursos administrativos, incluindo propriedade de contrato, atualizações, controles de acesso, governança, pausabilidade e muito mais._

### Serviços de auditoria de contratos inteligentes {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _Serviço de auditoria de contratos inteligentes que ajuda projetos em todo o ecossistema de blockchain a garantir que seus protocolos estejam prontos para o lançamento e construídos para proteger os usuários._

- **[CertiK](https://www.certik.com/)** - _Empresa de segurança de blockchain pioneira no uso de tecnologia de verificação formal de ponta em contratos inteligentes e redes de blockchain._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Empresa de segurança cibernética que combina pesquisa de segurança com uma mentalidade de invasor para reduzir riscos e fortalecer códigos._

- **[PeckShield](https://peckshield.com/)** - _Empresa de segurança de blockchain que oferece produtos e serviços para a segurança, privacidade e usabilidade de todo o ecossistema de blockchain._

- **[QuantStamp](https://quantstamp.com/)** - _Serviço de auditoria que facilita a adoção em massa da tecnologia blockchain por meio de serviços de segurança e avaliação de riscos._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Empresa de segurança de contratos inteligentes que fornece auditorias de segurança para sistemas distribuídos._

- **[Runtime Verification](https://runtimeverification.com/)** - _Empresa de segurança especializada em modelagem e verificação formal de contratos inteligentes._

- **[Hacken](https://hacken.io)** - _Auditor de segurança cibernética da Web3 que traz a abordagem de 360 graus para a segurança da blockchain._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** - _Serviços de auditoria em Solidity e Cairo que garantem a integridade dos contratos inteligentes e a segurança dos usuários em toda a Ethereum e Starknet._

- **[HashEx](https://hashex.org/)** - _A HashEx se concentra na auditoria de blockchain e contratos inteligentes para garantir a segurança de criptomoedas, fornecendo serviços como desenvolvimento de contratos inteligentes, testes de penetração e consultoria em blockchain._

- **[Code4rena](https://code4rena.com/)** - _Plataforma de auditoria competitiva que incentiva especialistas em segurança de contratos inteligentes a encontrar vulnerabilidades e ajudar a tornar a web3 mais segura._

- **[CodeHawks](https://codehawks.com/)** - _Plataforma de auditorias competitivas que hospeda competições de auditoria de contratos inteligentes para pesquisadores de segurança._

- **[Cyfrin](https://cyfrin.io)** - _Potência em segurança Web3, incubando a segurança de criptoativos através de produtos e serviços de auditoria de contratos inteligentes._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Empresa de segurança Web3 que oferece auditorias de segurança para sistemas de blockchain por meio de uma equipe de auditores experientes e as melhores ferramentas da categoria._

- **[Oxorio](https://oxor.io/)** - _Auditorias de contratos inteligentes e serviços de segurança de blockchain com experiência em EVM, Solidity, ZK e tecnologia cross-chain para empresas de criptoativos e projetos de DeFi._

- **[Inference](https://inference.ag/)** - _Empresa de auditoria de segurança especializada em auditoria de contratos inteligentes para blockchains baseadas em EVM. É graças a seus auditores especializados que eles identificam possíveis problemas e sugerem soluções úteis para corrigi-los antes da implementação._

### Plataformas de recompensa por bugs {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Plataforma de recompensa por bugs para contratos inteligentes e projetos de DeFi, onde pesquisadores de segurança revisam códigos, divulgam vulnerabilidades, são pagos e tornam as criptomoedas mais seguras._

- **[HackerOne](https://www.hackerone.com/)** - _Plataforma de coordenação de vulnerabilidades e recompensa por bugs que conecta empresas com testadores de penetração e pesquisadores de segurança cibernética._

- **[HackenProof](https://hackenproof.com/)** - _Plataforma de recompensa por bugs especializada para projetos de cripto (DeFi, contratos inteligentes, carteiras, CEX e mais), onde profissionais de segurança fornecem serviços de triagem e pesquisadores são pagos por relatórios de bugs relevantes e verificados._

- **[Sherlock](https://www.sherlock.xyz/)** - _Subscritor na Web3 para segurança de contratos inteligentes, com pagamentos para auditores gerenciados por meio de contratos inteligentes para garantir que os bugs relevantes sejam pagos de forma justa._

- **[CodeHawks](https://www.codehawks.com/)** - _Plataforma de recompensa por bugs competitiva, onde os auditores participam de concursos e desafios de segurança e (em breve) em suas próprias auditorias privadas._

### Publicações de vulnerabilidades e ataques (exploits) conhecidos de contratos inteligentes {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: ataques conhecidos em contratos inteligentes](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _Explicação amigável para iniciantes sobre as vulnerabilidades de contrato mais significativas, com código de exemplo para a maioria dos casos._

- **[Registro SWC](https://swcregistry.io/)** - _Lista com curadoria de itens da Enumeração de Fraquezas Comuns (CWE) que se aplicam a contratos inteligentes Ethereum._

- **[Rekt](https://rekt.news/)** - _Publicação atualizada regularmente sobre hacks e explorações de criptoativos de grande repercussão, juntamente com relatórios post-mortem detalhados._

### Desafios para aprender sobre segurança de contratos inteligentes {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Lista com curadoria de wargames de segurança de blockchain, desafios e competições de [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) e artigos de soluções._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Wargame para aprender segurança ofensiva de contratos inteligentes de DeFi e desenvolver habilidades em caça a bugs e auditoria de segurança._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Wargame baseado em Web3/Solidity onde cada nível é um contrato inteligente que precisa ser 'hackeado'._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Desafio de hacking de contrato inteligente, ambientado em uma aventura de fantasia. A conclusão bem-sucedida do desafio também dá acesso a um programa privado de recompensa por bugs._

### Melhores práticas para proteger contratos inteligentes {#smart-contract-security-best-practices}

- **[ConsenSys: melhores práticas de segurança de contratos inteligentes Ethereum](https://consensys.github.io/smart-contract-best-practices/)** - _Lista abrangente de diretrizes para proteger contratos inteligentes Ethereum._

- **[Nascent: Simple Security Toolkit](https://github.com/nascentxyz/simple-security-toolkit)** - _Coleção de guias práticos focados em segurança e listas de verificação para o desenvolvimento de contratos inteligentes._

- **[Padrões do Solidity](https://fravoll.github.io/solidity-patterns/)** - _Compilação útil de padrões seguros e melhores práticas para a linguagem de programação de contratos inteligentes Solidity._

- **[Documentação do Solidity: Considerações de segurança](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Diretrizes para escrever contratos inteligentes seguros com Solidity._

- **[Padrão de Verificação de Segurança de Contratos Inteligentes](https://github.com/securing/SCSVS)** - _Lista de verificação de quatorze partes criada para padronizar a segurança de contratos inteligentes para desenvolvedores, arquitetos, revisores de segurança e fornecedores._

- **[Aprenda sobre segurança e auditoria de contratos inteligentes](https://updraft.cyfrin.io/courses/security)** - _Curso definitivo de segurança e auditoria de contratos inteligentes, criado para desenvolvedores de contratos inteligentes que desejam aprimorar suas melhores práticas de segurança e se tornar pesquisadores de segurança._

### Tutoriais sobre segurança de contratos inteligentes {#tutorials-on-smart-contract-security}

- [Como escrever contratos inteligentes seguros](/developers/tutorials/secure-development-workflow/)

- [Como usar o Slither para encontrar bugs em contratos inteligentes](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Como usar o Manticore para encontrar bugs em contratos inteligentes](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Diretrizes de segurança para contratos inteligentes](/developers/tutorials/smart-contract-security-guidelines/)

- [Como integrar com segurança seu contrato de token com tokens arbitrários](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Curso completo de segurança e auditoria de contratos inteligentes](https://updraft.cyfrin.io/courses/security)
