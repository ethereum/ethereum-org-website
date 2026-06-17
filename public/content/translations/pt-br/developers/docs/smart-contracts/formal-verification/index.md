---
title: Verificação formal de contratos inteligentes
description: Uma visão geral da verificação formal para contratos inteligentes do Ethereum
lang: pt-br
---

[Contratos inteligentes](/developers/docs/smart-contracts/) estão tornando possível criar aplicativos descentralizados, sem necessidade de confiança e robustos que introduzem novos casos de uso e desbloqueiam valor para os usuários. Como os contratos inteligentes lidam com grandes quantidades de valor, a segurança é uma consideração crítica para os desenvolvedores.

A verificação formal é uma das técnicas recomendadas para melhorar a [segurança de contratos inteligentes](/developers/docs/smart-contracts/security/). A verificação formal, que usa [métodos formais](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) para especificar, projetar e verificar programas, tem sido usada há anos para garantir a correção de sistemas críticos de hardware e software.

Quando implementada em contratos inteligentes, a verificação formal pode provar que a lógica de negócios de um contrato atende a uma especificação predefinida. Em comparação com outros métodos para avaliar a correção do código do contrato, como testes, a verificação formal oferece garantias mais fortes de que um contrato inteligente é funcionalmente correto.

## O que é verificação formal? {#what-is-formal-verification}

A verificação formal refere-se ao processo de avaliar a correção de um sistema em relação a uma especificação formal. Em termos mais simples, a verificação formal nos permite verificar se o comportamento de um sistema satisfaz alguns requisitos (ou seja, faz o que queremos).

Os comportamentos esperados do sistema (um contrato inteligente neste caso) são descritos usando modelagem formal, enquanto as linguagens de especificação permitem a criação de propriedades formais. As técnicas de verificação formal podem então verificar se a implantação de um contrato está em conformidade com sua especificação e derivar a prova matemática da correção do primeiro. Quando um contrato satisfaz sua especificação, ele é descrito como "funcionalmente correto", "correto por design" ou "correto por construção".

### O que é um modelo formal? {#what-is-a-formal-model}

Na ciência da computação, um [modelo formal](https://en.wikipedia.org/wiki/Model_of_computation) é uma descrição matemática de um processo computacional. Os programas são abstraídos em funções matemáticas (equações), com o modelo descrevendo como as saídas para as funções são computadas dada uma entrada.

Os modelos formais fornecem um nível de abstração sobre o qual a análise do comportamento de um programa pode ser avaliada. A existência de modelos formais permite a criação de uma _especificação formal_, que descreve as propriedades desejadas do modelo em questão.

Diferentes técnicas são usadas para modelar contratos inteligentes para verificação formal. Por exemplo, alguns modelos são usados para raciocinar sobre o comportamento de alto nível de um contrato inteligente. Essas técnicas de modelagem aplicam uma visão de caixa preta aos contratos inteligentes, vendo-os como sistemas que aceitam entradas e executam computação com base nessas entradas.

Modelos de alto nível concentram-se na relação entre contratos inteligentes e agentes externos, como contas de propriedade externa (EOAs), contas de contrato e o ambiente da blockchain. Tais modelos são úteis para definir propriedades que especificam como um contrato deve se comportar em resposta a certas interações do usuário.

Por outro lado, outros modelos formais concentram-se no comportamento de baixo nível de um contrato inteligente. Embora os modelos de alto nível possam ajudar a raciocinar sobre a funcionalidade de um contrato, eles podem falhar em capturar detalhes sobre o funcionamento interno da implantação. Modelos de baixo nível aplicam uma visão de caixa branca à análise de programas e dependem de representações de nível inferior de aplicativos de contratos inteligentes, como rastreamentos de programas e [gráficos de fluxo de controle](https://en.wikipedia.org/wiki/Control-flow_graph), para raciocinar sobre propriedades relevantes para a execução de um contrato.

Modelos de baixo nível são considerados ideais, pois representam a execução real de um contrato inteligente no ambiente de execução do Ethereum (ou seja, a [EVM](/developers/docs/evm/)). Técnicas de modelagem de baixo nível são especialmente úteis para estabelecer propriedades críticas de segurança em contratos inteligentes e detectar possíveis vulnerabilidades.

### O que é uma especificação formal? {#what-is-a-formal-specification}

Uma especificação é simplesmente um requisito técnico que um sistema específico deve satisfazer. Na programação, as especificações representam ideias gerais sobre a execução de um programa (ou seja, o que o programa deve fazer).

No contexto de contratos inteligentes, as especificações formais referem-se a _propriedades_ — descrições formais dos requisitos que um contrato deve satisfazer. Tais propriedades são descritas como "invariantes" e representam asserções lógicas sobre a execução de um contrato que devem permanecer verdadeiras sob todas as circunstâncias possíveis, sem exceções.

Assim, podemos pensar em uma especificação formal como uma coleção de declarações escritas em uma linguagem formal que descrevem a execução pretendida de um contrato inteligente. As especificações cobrem as propriedades de um contrato e definem como o contrato deve se comportar em diferentes circunstâncias. O objetivo da verificação formal é determinar se um contrato inteligente possui essas propriedades (invariantes) e se essas propriedades não são violadas durante a execução.

As especificações formais são críticas no desenvolvimento de implantações seguras de contratos inteligentes. Contratos que falham em implementar invariantes ou têm suas propriedades violadas durante a execução são propensos a vulnerabilidades que podem prejudicar a funcionalidade ou causar explorações maliciosas.

## Tipos de especificações formais para contratos inteligentes {#formal-specifications-for-smart-contracts}

As especificações formais permitem o raciocínio matemático sobre a correção da execução do programa. Assim como nos modelos formais, as especificações formais podem capturar propriedades de alto nível ou o comportamento de baixo nível de uma implantação de contrato.

As especificações formais são derivadas usando elementos da [lógica de programação](https://en.wikipedia.org/wiki/Logic_programming), que permitem o raciocínio formal sobre as propriedades de um programa. Uma lógica de programação tem regras formais que expressam (em linguagem matemática) o comportamento esperado de um programa. Várias lógicas de programação são usadas na criação de especificações formais, incluindo [lógica de alcançabilidade](https://en.wikipedia.org/wiki/Reachability_problem), [lógica temporal](https://en.wikipedia.org/wiki/Temporal_logic) e [lógica de Hoare](https://en.wikipedia.org/wiki/Hoare_logic).

As especificações formais para contratos inteligentes podem ser classificadas amplamente como especificações de **alto nível** ou de **baixo nível**. Independentemente da categoria a que uma especificação pertence, ela deve descrever de forma adequada e inequívoca a propriedade do sistema em análise.

### Especificações de alto nível {#high-level-specifications}

Como o nome sugere, uma especificação de alto nível (também chamada de "especificação orientada a modelos") descreve o comportamento de alto nível de um programa. As especificações de alto nível modelam um contrato inteligente como uma [máquina de estado finito](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM), que pode transitar entre estados executando operações, com a lógica temporal usada para definir propriedades formais para o modelo FSM.

[Lógicas temporais](https://en.wikipedia.org/wiki/Temporal_logic) são "regras para raciocinar sobre proposições qualificadas em termos de tempo (por exemplo, "Estou _sempre_ com fome" ou "Eu _eventualmente_ estarei com fome")." Quando aplicadas à verificação formal, as lógicas temporais são usadas para declarar asserções sobre o comportamento correto de sistemas modelados como máquinas de estado. Especificamente, uma lógica temporal descreve os estados futuros em que um contrato inteligente pode estar e como ele transita entre os estados.

As especificações de alto nível geralmente capturam duas propriedades temporais críticas para contratos inteligentes: **segurança** e **vivacidade** (liveness). As propriedades de segurança representam a ideia de que "nada de ruim acontece" e geralmente expressam invariância. Uma propriedade de segurança pode definir requisitos gerais de software, como a ausência de [deadlock](https://www.techtarget.com/whatis/definition/deadlock), ou expressar propriedades específicas de domínio para contratos (por exemplo, invariantes no controle de acesso para funções, valores admissíveis de variáveis de estado ou condições para transferências de tokens).

Tome como exemplo este requisito de segurança que cobre as condições para usar o `transfer()` ou `transferFrom()` em contratos de token ERC-20: _"O saldo de um remetente nunca é inferior à quantidade solicitada de tokens a serem enviados."_. Esta descrição em linguagem natural de um invariante de contrato pode ser traduzida em uma especificação formal (matemática), que pode então ser rigorosamente verificada quanto à validade.

As propriedades de vivacidade afirmam que "algo eventualmente bom acontece" e dizem respeito à capacidade de um contrato de progredir por diferentes estados. Um exemplo de propriedade de vivacidade é a "liquidez", que se refere à capacidade de um contrato de transferir seus saldos para os usuários mediante solicitação. Se essa propriedade for violada, os usuários não poderão sacar os ativos armazenados no contrato, como o que aconteceu com o [incidente da carteira Parity](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Especificações de baixo nível {#low-level-specifications}

As especificações de alto nível tomam como ponto de partida um modelo de estado finito de um contrato e definem as propriedades desejadas desse modelo. Em contraste, as especificações de baixo nível (também chamadas de "especificações orientadas a propriedades") frequentemente modelam programas (contratos inteligentes) como sistemas que compreendem uma coleção de funções matemáticas e descrevem o comportamento correto de tais sistemas.

Em termos mais simples, as especificações de baixo nível analisam _rastreamentos de programas_ e tentam definir propriedades de um contrato inteligente sobre esses rastreamentos. Rastreamentos referem-se a sequências de execuções de funções que alteram o estado de um contrato inteligente; portanto, as especificações de baixo nível ajudam a especificar os requisitos para a execução interna de um contrato.

As especificações formais de baixo nível podem ser dadas como propriedades no estilo Hoare ou invariantes em caminhos de execução.

### Propriedades no estilo Hoare {#hoare-style-properties}

A [Lógica de Hoare](https://en.wikipedia.org/wiki/Hoare_logic) fornece um conjunto de regras formais para raciocinar sobre a correção de programas, incluindo contratos inteligentes. Uma propriedade no estilo Hoare é representada por uma tripla de Hoare `{P}c{Q}`, onde `c` é um programa e `P` e `Q` são predicados sobre o estado do `c` (ou seja, o programa), formalmente descritos como _pré-condições_ e _pós-condições_, respectivamente.

Uma pré-condição é um predicado que descreve as condições necessárias para a execução correta de uma função; os usuários que chamam o contrato devem satisfazer esse requisito. Uma pós-condição é um predicado que descreve a condição que uma função estabelece se executada corretamente; os usuários podem esperar que essa condição seja verdadeira após chamar a função. Um _invariante_ na lógica de Hoare é um predicado que é preservado pela execução de uma função (ou seja, não muda).

As especificações no estilo Hoare podem garantir a _correção parcial_ ou a _correção total_. A implantação de uma função de contrato é "parcialmente correta" se a pré-condição for verdadeira antes da execução da função e, se a execução terminar, a pós-condição também for verdadeira. A prova de correção total é obtida se uma pré-condição for verdadeira antes da execução da função, a execução for garantida para terminar e, quando isso acontecer, a pós-condição for verdadeira.

Obter a prova de correção total é difícil, pois algumas execuções podem atrasar antes de terminar, ou nunca terminar. Dito isso, a questão de saber se a execução termina é indiscutivelmente um ponto discutível, já que o mecanismo de gás do Ethereum impede loops infinitos de programas (a execução termina com sucesso ou termina devido a um erro de 'falta de gás').

As especificações de contratos inteligentes criadas usando a lógica de Hoare terão pré-condições, pós-condições e invariantes definidos para a execução de funções e loops em um contrato. As pré-condições geralmente incluem a possibilidade de entradas errôneas para uma função, com as pós-condições descrevendo a resposta esperada a tais entradas (por exemplo, lançando uma exceção específica). Dessa forma, as propriedades no estilo Hoare são eficazes para garantir a correção das implantações de contratos.

Muitas estruturas de verificação formal usam especificações no estilo Hoare para provar a correção semântica das funções. Também é possível adicionar propriedades no estilo Hoare (como asserções) diretamente ao código do contrato usando as instruções `require` e `assert` no Solidity.

As instruções `require` expressam uma pré-condição ou invariante e são frequentemente usadas para validar as entradas do usuário, enquanto `assert` captura uma pós-condição necessária para a segurança. Por exemplo, o controle de acesso adequado para funções (um exemplo de propriedade de segurança) pode ser alcançado usando `require` como uma verificação de pré-condição na identidade da conta chamadora. Da mesma forma, um invariante sobre valores permitidos de variáveis de estado em um contrato (por exemplo, número total de tokens em circulação) pode ser protegido contra violação usando `assert` para confirmar o estado do contrato após a execução da função.

### Propriedades de nível de rastreamento {#trace-level-properties}

As especificações baseadas em rastreamento descrevem operações que transitam um contrato entre diferentes estados e as relações entre essas operações. Como explicado anteriormente, os rastreamentos são sequências de operações que alteram o estado de um contrato de uma maneira particular.

Essa abordagem baseia-se no modelo de contratos inteligentes como sistemas de transição de estado com alguns estados predefinidos (descritos por variáveis de estado) juntamente com um conjunto de transições predefinidas (descritas por funções de contrato). Além disso, um [gráfico de fluxo de controle](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), que é uma representação gráfica do fluxo de execução de um programa, é frequentemente usado para descrever a semântica operacional de um contrato. Aqui, cada rastreamento é representado como um caminho no gráfico de fluxo de controle.

Principalmente, as especificações de nível de rastreamento são usadas para raciocinar sobre padrões de execução interna em contratos inteligentes. Ao criar especificações de nível de rastreamento, afirmamos os caminhos de execução admissíveis (ou seja, transições de estado) para um contrato inteligente. Usando técnicas, como a execução simbólica, podemos verificar formalmente que a execução nunca segue um caminho não definido no modelo formal.

Vamos usar um exemplo de um contrato de [DAO](/dao/) que tem algumas funções acessíveis publicamente para descrever propriedades de nível de rastreamento. Aqui, assumimos que o contrato da DAO permite que os usuários realizem as seguintes operações:

- Depositar fundos

- Votar em uma proposta após depositar fundos

- Reivindicar um reembolso se não votarem em uma proposta

Exemplos de propriedades de nível de rastreamento poderiam ser _"usuários que não depositam fundos não podem votar em uma proposta"_ ou _"usuários que não votam em uma proposta devem sempre ser capazes de reivindicar um reembolso"_. Ambas as propriedades afirmam sequências preferenciais de execução (a votação não pode acontecer _antes_ de depositar fundos e a reivindicação de reembolsos não pode acontecer _depois_ de votar em uma proposta).

## Técnicas para verificação formal de contratos inteligentes {#formal-verification-techniques}

### Verificação de modelos {#model-checking}

A verificação de modelos é uma técnica de verificação formal na qual um algoritmo verifica um modelo formal de um contrato inteligente em relação à sua especificação. Na verificação de modelos, os contratos inteligentes são frequentemente representados como sistemas de transição de estado, enquanto as propriedades sobre os estados permitidos do contrato são definidas usando a lógica temporal.

A verificação de modelos requer a criação de uma representação matemática abstrata de um sistema (ou seja, um contrato) e a expressão de propriedades desse sistema usando fórmulas baseadas na [lógica proposicional](https://www.baeldung.com/cs/propositional-logic). Isso simplifica a tarefa do algoritmo de verificação de modelos, ou seja, provar que um modelo matemático satisfaz uma determinada fórmula lógica.

A verificação de modelos na verificação formal é usada principalmente para avaliar propriedades temporais que descrevem o comportamento de um contrato ao longo do tempo. As propriedades temporais para contratos inteligentes incluem _segurança_ e _vivacidade_, que explicamos anteriormente.

Por exemplo, uma propriedade de segurança relacionada ao controle de acesso (por exemplo, _Apenas o proprietário do contrato pode chamar `selfdestruct`_) pode ser escrita em lógica formal. A partir de então, o algoritmo de verificação de modelos pode verificar se o contrato satisfaz essa especificação formal.

A verificação de modelos usa a exploração do espaço de estados, que envolve a construção de todos os estados possíveis de um contrato inteligente e a tentativa de encontrar estados alcançáveis que resultem em violações de propriedades. No entanto, isso pode levar a um número infinito de estados (conhecido como o "problema da explosão de estados"), portanto, os verificadores de modelos dependem de técnicas de abstração para tornar possível a análise eficiente de contratos inteligentes.

### Prova de teoremas {#theorem-proving}

A prova de teoremas é um método de raciocínio matemático sobre a correção de programas, incluindo contratos inteligentes. Envolve transformar o modelo do sistema de um contrato e suas especificações em fórmulas matemáticas (declarações lógicas).

O objetivo da prova de teoremas é verificar a equivalência lógica entre essas declarações. A "equivalência lógica" (também chamada de "bi-implicação lógica") é um tipo de relação entre duas declarações de tal forma que a primeira declaração é verdadeira _se e somente se_ a segunda declaração for verdadeira.

A relação necessária (equivalência lógica) entre as declarações sobre o modelo de um contrato e sua propriedade é formulada como uma declaração provável (chamada de teorema). Usando um sistema formal de inferência, o provador de teoremas automatizado pode verificar a validade do teorema. Em outras palavras, um provador de teoremas pode provar conclusivamente que o modelo de um contrato inteligente corresponde precisamente às suas especificações.

Enquanto a verificação de modelos modela contratos como sistemas de transição com estados finitos, a prova de teoremas pode lidar com a análise de sistemas de estados infinitos. No entanto, isso significa que um provador de teoremas automatizado nem sempre pode saber se um problema lógico é "decidível" ou não.

Como resultado, a assistência humana é frequentemente necessária para guiar o provador de teoremas na derivação de provas de correção. O uso do esforço humano na prova de teoremas a torna mais cara de usar do que a verificação de modelos, que é totalmente automatizada.

### Execução simbólica {#symbolic-execution}

A execução simbólica é um método de analisar um contrato inteligente executando funções usando _valores simbólicos_ (por exemplo, `x > 5`) em vez de _valores concretos_ (por exemplo, `x == 5`). Como uma técnica de verificação formal, a execução simbólica é usada para raciocinar formalmente sobre propriedades de nível de rastreamento no código de um contrato.

A execução simbólica representa um rastreamento de execução como uma fórmula matemática sobre valores de entrada simbólicos, também chamada de _predicado de caminho_. Um [solucionador SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) é usado para verificar se um predicado de caminho é "satisfatível" (ou seja, existe um valor que pode satisfazer a fórmula). Se um caminho vulnerável for satisfatível, o solucionador SMT gerará um valor concreto que direciona a execução para esse caminho.

Suponha que a função de um contrato inteligente receba como entrada um valor `uint` (`x`) e reverta quando `x` for maior que `5` e também menor que `10`. Encontrar um valor para `x` que acione o erro usando um procedimento de teste normal exigiria a execução de dezenas de casos de teste (ou mais) sem a garantia de realmente encontrar uma entrada que acione o erro.

Por outro lado, uma ferramenta de execução simbólica executaria a função com o valor simbólico: `X > 5 ∧ X < 10` (ou seja, `x` é maior que 5 E `x` é menor que 10). O predicado de caminho associado `x = X > 5 ∧ X < 10` seria então dado a um solucionador SMT para resolver. Se um valor específico satisfizer a fórmula `x = X > 5 ∧ X < 10`, o solucionador SMT o calculará — por exemplo, o solucionador pode produzir `7` como um valor para `x`.

Como a execução simbólica depende de entradas para um programa, e o conjunto de entradas para explorar todos os estados alcançáveis é potencialmente infinito, ela ainda é uma forma de teste. No entanto, como mostrado no exemplo, a execução simbólica é mais eficiente do que os testes regulares para encontrar entradas que acionam violações de propriedades.

Além disso, a execução simbólica produz menos falsos positivos do que outras técnicas baseadas em propriedades (por exemplo, fuzzing) que geram aleatoriamente entradas para uma função. Se um estado de erro for acionado durante a execução simbólica, então é possível gerar um valor concreto que acione o erro e reproduza o problema.

A execução simbólica também pode fornecer algum grau de prova matemática de correção. Considere o seguinte exemplo de uma função de contrato com proteção contra overflow:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
}
```

Um rastreamento de execução que resulta em um overflow de inteiro precisaria satisfazer a fórmula: `z = x + y AND (z >= x) AND (z >= y) AND (z < x OR z < y)` É improvável que tal fórmula seja resolvida, portanto, serve como uma prova matemática de que a função `safe_add` nunca sofre overflow.

### Por que usar a verificação formal para contratos inteligentes? {#benefits-of-formal-verification}

#### Necessidade de confiabilidade {#need-for-reliability}

A verificação formal é usada para avaliar a correção de sistemas críticos de segurança cuja falha pode ter consequências devastadoras, como morte, ferimentos ou ruína financeira. Contratos inteligentes são aplicativos de alto valor que controlam enormes quantidades de valor, e erros simples no design podem levar a [perdas irrecuperáveis para os usuários](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Verificar formalmente um contrato antes da implantação, no entanto, pode aumentar as garantias de que ele funcionará conforme o esperado uma vez em execução na blockchain.

A confiabilidade é uma qualidade altamente desejada em qualquer contrato inteligente, especialmente porque o código implantado na Máquina Virtual do [Ethereum](/) (EVM) é tipicamente imutável. Com atualizações pós-lançamento não prontamente acessíveis, a necessidade de garantir a confiabilidade dos contratos torna a verificação formal necessária. A verificação formal é capaz de detectar problemas complicados, como underflows e overflow de inteiros, reentrância e otimizações de gás ruins, que podem passar despercebidos por auditores e testadores.

#### Provar a correção funcional {#prove-functional-correctness}

O teste de programas é o método mais comum de provar que um contrato inteligente satisfaz alguns requisitos. Isso envolve a execução de um contrato com uma amostra dos dados que se espera que ele manipule e a análise de seu comportamento. Se o contrato retornar os resultados esperados para os dados de amostra, os desenvolvedores terão uma prova objetiva de sua correção.

No entanto, essa abordagem não pode provar a execução correta para valores de entrada que não fazem parte da amostra. Portanto, testar um contrato pode ajudar a detectar bugs (ou seja, se alguns caminhos de código falharem em retornar os resultados desejados durante a execução), mas **não pode provar conclusivamente a ausência de bugs**.

Por outro lado, a verificação formal pode provar formalmente que um contrato inteligente satisfaz os requisitos para uma gama infinita de execuções _sem_ executar o contrato. Isso requer a criação de uma especificação formal que descreva com precisão os comportamentos corretos do contrato e o desenvolvimento de um modelo formal (matemático) do sistema do contrato. Em seguida, podemos seguir um procedimento de prova formal para verificar a consistência entre o modelo do contrato e sua especificação.

Com a verificação formal, a questão de verificar se a lógica de negócios de um contrato satisfaz os requisitos é uma proposição matemática que pode ser provada ou refutada. Ao provar formalmente uma proposição, podemos verificar um número infinito de casos de teste com um número finito de etapas. Dessa forma, a verificação formal tem melhores perspectivas de provar que um contrato é funcionalmente correto em relação a uma especificação.

#### Alvos ideais de verificação {#ideal-verification-targets}

Um alvo de verificação descreve o sistema a ser verificado formalmente. A verificação formal é melhor usada em "sistemas embarcados" (pequenos e simples pedaços de software que fazem parte de um sistema maior). Eles também são ideais para domínios especializados que têm poucas regras, pois isso torna mais fácil modificar ferramentas para verificar propriedades específicas do domínio.

Contratos inteligentes — pelo menos, até certo ponto — cumprem ambos os requisitos. Por exemplo, o tamanho pequeno dos contratos do Ethereum os torna passíveis de verificação formal. Da mesma forma, a EVM segue regras simples, o que torna mais fácil especificar e verificar propriedades semânticas para programas em execução na EVM.

### Ciclo de desenvolvimento mais rápido {#faster-development-cycle}

Técnicas de verificação formal, como verificação de modelos e execução simbólica, são geralmente mais eficientes do que a análise regular do código de contratos inteligentes (realizada durante testes ou auditorias). Isso ocorre porque a verificação formal depende de valores simbólicos para testar asserções ("e se um usuário tentar sacar _n_ ether?") ao contrário dos testes que usam valores concretos ("e se um usuário tentar sacar 5 ether?").

Variáveis de entrada simbólicas podem cobrir várias classes de valores concretos, portanto, as abordagens de verificação formal prometem mais cobertura de código em um período de tempo mais curto. Quando usada de forma eficaz, a verificação formal pode acelerar o ciclo de desenvolvimento para os desenvolvedores.

A verificação formal também melhora o processo de construção de aplicativos descentralizados (dapps) reduzindo erros de design dispendiosos. A atualização de contratos (quando possível) para corrigir vulnerabilidades requer uma reescrita extensa das bases de código e mais esforço gasto no desenvolvimento. A verificação formal pode detectar muitos erros nas implantações de contratos que podem passar despercebidos por testadores e auditores e oferece ampla oportunidade para corrigir esses problemas antes de implantar um contrato.

## Desvantagens da verificação formal {#drawbacks-of-formal-verification}

### Custo do trabalho manual {#cost-of-manual-labor}

A verificação formal, especialmente a verificação semiautomatizada na qual um humano guia o provador para derivar provas de correção, requer um trabalho manual considerável. Além disso, a criação de especificações formais é uma atividade complexa que exige um alto nível de habilidade.

Esses fatores (esforço e habilidade) tornam a verificação formal mais exigente e cara em comparação com os métodos usuais de avaliação da correção em contratos, como testes e auditorias. No entanto, pagar o custo de uma auditoria de verificação completa é prático, dado o custo de erros nas implantações de contratos inteligentes.

### Falsos negativos {#false-negatives}

A verificação formal só pode verificar se a execução do contrato inteligente corresponde à especificação formal. Como tal, é importante certificar-se de que a especificação descreve adequadamente os comportamentos esperados de um contrato inteligente.

Se as especificações forem mal escritas, as violações de propriedades — que apontam para execuções vulneráveis — não poderão ser detectadas pela auditoria de verificação formal. Nesse caso, um desenvolvedor pode assumir erroneamente que o contrato está livre de bugs.

### Problemas de desempenho {#performance-issues}

A verificação formal esbarra em uma série de problemas de desempenho. Por exemplo, problemas de explosão de estado e caminho encontrados durante a verificação de modelos e a verificação simbólica, respectivamente, podem afetar os procedimentos de verificação. Além disso, as ferramentas de verificação formal frequentemente usam solucionadores SMT e outros solucionadores de restrições em sua camada subjacente, e esses solucionadores dependem de procedimentos computacionalmente intensivos.

Além disso, nem sempre é possível para os verificadores de programas determinar se uma propriedade (descrita como uma fórmula lógica) pode ser satisfeita ou não (o "[problema da decidibilidade](https://en.wikipedia.org/wiki/Decision_problem)") porque um programa pode nunca terminar. Como tal, pode ser impossível provar algumas propriedades para um contrato, mesmo que ele seja bem especificado.

## Ferramentas de verificação formal para contratos inteligentes do Ethereum {#formal-verification-tools}

### Linguagens de especificação para criar especificações formais {#specification-languages}

**Act**: _*O Act permite a especificação de atualizações de armazenamento, pré/pós-condições e invariantes de contrato. Seu conjunto de ferramentas também possui backends de prova capazes de provar muitas propriedades via Coq, solucionadores SMT ou hevm.*_

- [GitHub](https://github.com/ethereum/act)
- [Documentação](https://github.com/argotorg/act)

**Scribble** - _*O Scribble transforma anotações de código na linguagem de especificação Scribble em asserções concretas que verificam a especificação.*_

- [Documentação](https://docs.scribble.codes/)

**Dafny** - _*Dafny é uma linguagem de programação pronta para verificação que depende de anotações de alto nível para raciocinar e provar a correção do código.*_

- [GitHub](https://github.com/dafny-lang/dafny)

### Verificadores de programas para verificar a correção {#program-verifiers}

**Certora Prover** - _O Certora Prover é uma ferramenta de verificação formal automática para verificar a correção do código em contratos inteligentes. As especificações são escritas em CVL (Certora Verification Language), com violações de propriedades detectadas usando uma combinação de análise estática e solução de restrições._

- [Site](https://www.certora.com/)
- [Documentação](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - _*O SMTChecker do Solidity é um verificador de modelos integrado baseado em SMT (Satisfiability Modulo Theories) e solução de Horn. Ele confirma se o código-fonte de um contrato corresponde às especificações durante a compilação e verifica estaticamente as violações das propriedades de segurança.*_

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - _*O solc-verify é uma versão estendida do compilador Solidity que pode realizar a verificação formal automatizada no código Solidity usando anotações e verificação de programa modular.*_

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - _*A KEVM é uma semântica formal da Máquina Virtual do Ethereum (EVM) escrita na estrutura K. A KEVM é executável e pode provar certas asserções relacionadas a propriedades usando a lógica de alcançabilidade.*_

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Documentação](https://jellopaper.org/)

### Estruturas lógicas para prova de teoremas {#theorem-provers}

**Isabelle** - _Isabelle/HOL é um assistente de prova que permite que fórmulas matemáticas sejam expressas em uma linguagem formal e fornece ferramentas para provar essas fórmulas. A principal aplicação é a formalização de provas matemáticas e, em particular, a verificação formal, que inclui provar a correção de hardware ou software de computador e provar propriedades de linguagens e protocolos de computador._

- [GitHub](https://github.com/isabelle-prover)
- [Documentação](https://isabelle.in.tum.de/documentation.html)

**Rocq** - _Rocq é um provador de teoremas interativo que permite definir programas usando teoremas e gerar interativamente provas de correção verificadas por máquina._

- [GitHub](https://github.com/rocq-prover/rocq)
- [Documentação](https://rocq-prover.org/docs)

### Ferramentas baseadas em execução simbólica para detectar padrões vulneráveis em contratos inteligentes {#symbolic-execution-tools}

**Manticore** - _*Uma ferramenta de análise de bytecode da EVM baseada em execução simbólica*._

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentação](https://github.com/trailofbits/manticore/wiki)

**hevm** - _*hevm é um mecanismo de execução simbólica e verificador de equivalência para bytecode da EVM.*_

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Uma ferramenta de execução simbólica para detectar vulnerabilidades em contratos inteligentes do Ethereum_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Documentação](https://mythril-classic.readthedocs.io/en/develop/)

## Leitura adicional {#further-reading}

- [Como funciona a verificação formal de contratos inteligentes](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Uma visão geral dos projetos de verificação formal no ecossistema Ethereum](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Verificação formal de ponta a ponta do contrato inteligente de depósito do Ethereum 2.0](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Verificando formalmente o contrato inteligente mais popular do mundo](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker e verificação formal](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)