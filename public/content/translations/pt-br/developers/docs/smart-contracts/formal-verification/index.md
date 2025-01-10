---
title: Verificação formal de contratos inteligentes
description: Uma visão geral da verificação formal de contratos inteligentes na Ethereum
lang: pt-br
---

[Contratos inteligentes](/developers/docs/smart-contracts/) permitem criar aplicativos descentralizados, sem necessidade de confiança, e robustos, que introduzem novos casos de uso e desbloqueiam valor para os usuários. Como os contratos inteligentes manipulam grandes quantidades de valor, a segurança é uma consideração crítica para desenvolvedores.

A verificação formal é uma das técnicas recomendadas para melhorar [a segurança do contrato inteligente](/developers/docs/smart-contracts/security/). Verificação formal, que usa [métodos formais](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) para especificar, conceber e verificar programas, tem sido usada há anos para garantir a correção de sistemas críticos de hardware e software.

Quando implementada em contratos inteligentes, a verificação formal pode comprovar que a lógica de negócio de um contrato cumpre uma especificação predefinida. Comparado com outros métodos para avaliar a exatidão do código do contrato, como testes, verificação formal dá mais garantias de que um contrato inteligente está funcionalmente correto.

## O que é a verificação formal? {#what-is-formal-verification}

A verificação formal refere-se ao processo de avaliação da exatidão de um sistema no que diz respeito a uma especificação formal. Em termos simples, verificação formal nos permite verificar se o comportamento de um sistema satisfaz algumas exigências (ou seja, ele faz o que queremos).

Comportamentos esperados do sistema (um contrato inteligente, neste caso) são descritos usando modelagem formal, enquanto linguagens de especificação permitem a criação de propriedades formais. Técnicas formais de verificação podem depois verificar se a implementação de um contrato está de acordo com sua especificação e deriva comprovação matemática da exatidão do primeiro. Quando um contrato satisfaz a sua especificação, ele é descrito como "funcionalmente correto", "correto por concepção" ou "correto por elaboração".

### O que é um modelo formal? {#what-is-a-formal-model}

Na ciência da computação, um [modelo formal](https://en.wikipedia.org/wiki/Model_of_computation) é uma descrição matemática de um processo computacional. Programas são abstraídos em funções matemáticas (equações), com o modelo que descreve como as saídas para funções são computadas dada uma entrada.

Modelos formais fornecem um nível de abstração sobre o qual a análise do comportamento de um programa pode ser avaliada. A existência de modelos formais permite a criação de uma _especificação formal_, que descreve as propriedades desejadas do modelo em questão.

Diferentes técnicas são utilizadas para modelagem de contratos inteligentes para verificação formal. Por exemplo, alguns modelos são usados para racionalizar sobre o comportamento de alto nível de um contrato inteligente. Essas técnicas de modelagem aplicam uma visão de caixa preta em contratos inteligentes, visualizando-os como sistemas que aceitam entradas e executam computação com base nessas entradas.

Os modelos mais gerais focam na relação entre contratos inteligentes e agentes externos, como contas de propriedade externa (EOA), contas de contrato e ambiente da blockchain. Esses modelos são úteis para definir propriedades que especificam como um contrato deve se comportar em resposta a determinadas interações do usuário.

Inversamente, outros modelos formais se concentram no comportamento de baixo nível de um contrato inteligente. Embora os modelos mais gerais possam ajudar no raciocínio sobre a funcionalidade de um contrato, eles podem não conseguir capturar detalhes sobre o funcionamento interno da implementação. Modelos de baixo nível aplicam uma visualização de caixa branca para programar a análise e dependem de representações de baixo nível de aplicações de contrato inteligentes, como traços de programas e [gráficos de controle de fluxo](https://en.wikipedia.org/wiki/Control-flow_graph), justificando sobre propriedades relevantes para a execução de um contrato.

Modelos de baixo nível são considerados ideais uma vez que representam a execução real de um contrato inteligente no ambiente de execução da Ethereum (ou seja, a [EVM](/developers/docs/evm/)). Técnicas de modelagem de baixo nível são especialmente úteis para estabelecer propriedades de segurança críticas em contratos inteligentes e para detectar potenciais vulnerabilidades.

### O que é uma especificação formal? {#what-is-a-formal-specification}

Uma especificação é simplesmente um requisito técnico que determinado sistema tem de cumprir. Em programação, as especificações representam ideias gerais sobre a execução de um programa (ou seja, o que o programa deve fazer).

No contexto dos contratos inteligentes, especificações formais se referem a _propriedades_—descrições formais dos requisitos que um contrato deve cumprir. Essas propriedades são descritas como "invariáveis" e representam afirmações lógicas sobre a execução de um contrato que devem permanecer verdadeiras em todas as circunstâncias possíveis, sem quaisquer exceções.

Assim, podemos pensar em uma especificação formal como uma coleção de instruções escritas em uma linguagem formal que descreve a execução pretendida de um contrato inteligente. As especificações cobrem as propriedades de um contrato e definem como o contrato deve se comportar em diferentes circunstâncias. O objetivo da verificação formal é determinar se um contrato inteligente possui essas propriedades (conhecidas como invariáveis ou invariantes) e que essas propriedades não são violadas durante a execução.

As especificações formais são fundamentais no desenvolvimento de implementações seguras de contratos inteligentes. Contratos que falhem em implementar invariáveis ou que tenham suas propriedades sejam violadas durante a execução estão propensos a vulnerabilidades que podem prejudicar a funcionalidade ou causar usos maliciosos.

## Tipos de especificações formais para contratos inteligentes {#formal-specifications-for-smart-contracts}

Especificações formais permitem o raciocínio matemático sobre a exatidão da execução do programa. Como nos modelos formais, as especificações formais podem capturar propriedades de alto nível ou o comportamento de baixo nível de uma implementação de contrato.

Especificações formais são derivadas usando elementos de [lógica de programa](https://en.wikipedia.org/wiki/Logic_programming), que permitem raciocínio formal sobre as propriedades de um programa. Uma lógica do programa tem regras formais que expressam (na linguagem matemática) o comportamento esperado de um programa. Várias lógicas de programa são usadas na criação de especificações formais, incluindo a [lógica de acessibilidade](https://en.wikipedia.org/wiki/Reachability_problem), [lógica temporal](https://en.wikipedia.org/wiki/Temporal_logic), e [lógica Hoare](https://en.wikipedia.org/wiki/Hoare_logic).

Especificações formais para contratos inteligentes podem ser classificadas geralmente como especificações de **alto nível** ou de **baixo nível**. Independentemente da categoria a que pertence uma especificação, ela deve descrever de forma adequada e inequívoca a propriedade do sistema em análise.

### Especificações de alto nível {#high-level-specifications}

Como o nome sugere, uma especificação de alto nível (também chamada de "especificação orientada ao modelo") descreve o comportamento de alto nível de um programa. Especificações de alto nível modelam um contrato inteligente como uma [máquina de estado finito](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM), que pode fazer a transição entre os estados realizando operações, com lógica temporal usada para definir propriedades formais para o modelo FSM.

[Lógicas temporais](https://en.wikipedia.org/wiki/Temporal_logic) são "regras para raciocínio de proposições qualificadas em termos de tempo (por exemplo, "Eu tenho _sempre_ fome" ou "Eu vou _em algum momento_ estar com fome")." Quando aplicadas à verificação formal, as lógicas temporais são usadas para declarar asserções sobre o comportamento correto de sistemas modelados como máquinas de estado. Especificamente, uma lógica temporal descreve os estados futuros em que um contrato inteligente pode estar e como ele transita entre estados.

Especificações de alto nível geralmente capturam duas propriedades temporais críticas para contratos inteligentes: **segurança** e **vivacidade** (liveness). As propriedades de segurança representam a ideia de que “nada de mal jamais acontece” e geralmente expressam invariância. Uma propriedade de segurança pode definir requisitos gerais de software, como liberdade de [impasse](https://www.techtarget.com/whatis/definition/deadlock) ou expressar propriedades específicas de domínio para contratos (por exemplo, invariáveis no controle de acesso para funções, valores admissíveis de variáveis de estado ou condições para transferências de token).

Veja, por exemplo, este requisito de segurança que cobre condições para usar `transfer()` ou `transferFrom()` em contratos de token ERC-20: _ “O saldo de um remetente nunca é inferior à quantidade solicitada de tokens a serem enviados.”_. Essa descrição em linguagem natural de uma invariável de contrato pode ser traduzida em uma especificação formal (matemática), que pode então ser rigorosamente verificada para validade.

Propriedades de vivacidade afirmam que “algo eventualmente bom acontece” e se refere à capacidade do contrato progredir por diferentes estados. Um exemplo de uma propriedade de vivacidade é a “liquidez”, que se refere à capacidade do contrato transferir seus saldos aos usuários por solicitação. Se essa propriedade for violada, os usuários não poderiam retirar os ativos armazenados no contrato, como aconteceu com o [incidente de carteira do Parity](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Especificações de baixo nível {#low-level-specifications}

As especificações de alto nível tomam como ponto de partida um modelo de estado finito de um contrato e definem as propriedades desejadas deste modelo. Em contraste, as especificações de baixo nível (também chamadas de "especificações orientadas à propriedade") muitas vezes modelam programas (contratos inteligentes) como sistemas que compreendem uma coleção de funções matemáticas e descrevem o comportamento correto desses sistemas.

Em termos simples, as especificações de baixo nível analisam _traços de programa_ e tentam definir propriedades de um contrato inteligente sobre esses traços. Traços se referem a sequências de execuções de funções que alteram o estado de um contrato inteligente; por isso, as especificações de baixo nível ajudam a especificar requisitos para uma execução interna de contrato.

Especificações formais de baixo nível podem ser fornecidas como propriedades do estilo Hoare ou invariáveis em caminhos de execução.

### Propriedades do estilo Hoare {#hoare-style-properties}

[Hore Logic](https://en.wikipedia.org/wiki/Hoare_logic) fornece um conjunto de regras formais para raciocinar sobre a correção de programas, incluindo contratos inteligentes. Uma propriedade de estilo Hoare é representada por um triplo Hoare {_P_}_c_{_Q_}, onde _c_ é um programa e _P_ e _Q_ são predicados no estado do _c_ (ou seja, o programa), formalmente descritos como _precondições_ e _pós-condições_, respectivamente.

Uma precondição é um predicado que descreve as condições necessárias para a execução correta de uma função; os usuários que chamam um contrato devem satisfazer este requisito. Uma pós-condição é um predicado que descreve a condição que uma função estabelece se executada corretamente; os usuários podem esperar que essa condição seja verdadeira após chamar a função. Uma _invariável_ na lógica Hoare é um predicado que é preservado pela execução de uma função (ou seja, não muda).

As especificações do estilo Hoare podem garantir _correção parcial_ ou _correção total_. A implementação de uma função de contrato é "parcialmente correta" se a precondição se confirmar verdadeira antes da função ser executada e, se a execução terminar, a pós-condição também é verdadeira. A prova de correção total é obtida se uma precondição for verdadeira antes da execução da função, a execução é garantida para terminar e, quando isso acontecer, a pós-condição é verdadeira.

Obter a comprovação de correção total é difícil, pois algumas execuções podem atrasar antes de terminar ou nunca terminar nada. Dito isso, a questão de se a execução termina é sem dúvida um ponto discutível, já que o mecanismo de gás da Ethereum evita loops infinitos de programa (a execução termina, ou com sucesso, ou termina devido a um erro de 'falta de gás').

As especificações de contrato inteligente criadas usando a lógica de Hoare terão precondições, pós-condições e invariáveis definidas para a execução de funções e loops em um contrato. Precondições geralmente incluem a possibilidade de entradas erradas para uma função, com pós-condições descrevendo a resposta esperada para essas entradas (por exemplo, lançando uma exceção específica). Dessa maneira, as propriedades do estilo Hoare são eficazes para garantir a correção das implementações de contratos.

Muitas estruturas formais de verificação usam especificações no estilo Hoare para comprovar a correção semântica das funções. Também é possível adicionar propriedades do estilo Hoare (como asserções) diretamente ao código do contrato usando as instruções `require` e `assert` no Solidity.

As instruções `require` expressam uma precondição ou invariável e são frequentemente usadas para validar as entradas do usuário, enquanto `assert` captura uma pós-condição necessária para segurança. Por exemplo, o controle de acesso adequado para funções (um exemplo de uma propriedade de segurança) pode ser alcançado usando `require` como uma verificação de precondição na identidade da conta de chamada. Da mesma forma, uma invariável em valores permitidos de variáveis de estado em um contrato (por exemplo, número total de tokens em circulação) pode ser protegida contra violação usando `assert` para confirmar o estado do contrato após a execução da função.

### Propriedades de nível de traços {#trace-level-properties}

Especificações baseadas em traços descrevem operações que transitam um contrato entre diferentes estados e as relações entre essas operações. Como foi explicado anteriormente, os traços são sequências de operações que alteram o estado de um contrato de uma forma específica.

Essa abordagem depende do modelo de contratos inteligentes como sistemas de transição de estado com alguns estados predefinidos (descritos por variáveis de estado) junto com um conjunto de transições predefinidas (descritas pelas funções de contrato). Além disso, um [gráfico de controle de fluxo ](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), que é uma representação gráfica do fluxo de execução de um programa, é frequentemente utilizado para descrever a semântica operacional de um contrato. Aqui, cada traço representado como um caminho no gráfico do fluxo de controle.

Em primeiro lugar, as especificações de nível de traços são usadas para raciocinar sobre padrões de execução interna em contratos inteligentes. Ao criar especificações de nível de traços, afirmamos os caminhos de execução admissíveis (ou seja, transições de estado) para um contrato inteligente. Utilizando técnicas, como a execução simbólica, podemos verificar formalmente que a execução nunca segue um caminho não definido no modelo formal.

Vamos usar um exemplo de um contrato com [DAO](/dao/) que tem algumas funções publicamente acessíveis para descrever propriedades de nível de traços. Aqui, assumimos que o contrato DAO permite aos usuários executar as seguintes operações:

- Depositar fundos

- Votar em uma proposta depois de depositar fundos

- Reivindicar um reembolso se eles não votarem em uma proposta

Exemplo de propriedades de nível de traços poderia ser _"usuários que não depositam fundos não podem votar em uma proposta"_ ou _"usuários que não votarem em uma proposta devem estar sempre aptos a reivindicar um reembolso"_. Ambas as propriedades afirmam sequências preferidas de execução (votação não pode acontecer _antes_ de depositar fundos, e reivindicar um reembolso não pode acontecer _após_ a votação de uma proposta).

## Técnicas para verificação formal de contratos inteligentes {#formal-verification-techniques}

### Verificação de modelo {#model-checking}

A verificação de modelo é uma técnica de verificação formal na qual um algoritmo verifica um modelo formal de um contrato inteligente em relação à sua especificação. No modelo de verificação, os contratos inteligentes são frequentemente representados como sistemas de transição de estado, enquanto as propriedades nos estados de contrato permitidos são definidas usando lógica temporal.

A verificação de modelo requer a criação de uma representação matemática abstrata de um sistema (ou seja, um contrato) e a expressão das propriedades desse sistema usando fórmulas enraizadas na [lógica proposicional](https://www.baeldung.com/cs/propositional-logic). Isto simplifica a tarefa do algoritmo de verificação de modelo, ou seja, comprovar que um modelo matemático cumpre uma dada fórmula lógica.

A verificação de modelo na verificação formal é usada principalmente para avaliar propriedades temporais que descrevem o comportamento de um contrato ao longo do tempo. As propriedades temporais para contratos inteligentes incluem _segurança_ e _vivacidade_, a qual explicamos anteriormente.

Por exemplo, uma propriedade de segurança relacionada ao controle de acesso (exemplo: _Somente o proprietário do contrato pode chamar `selfdestruct`_) pode ser escrita na lógica formal. Depois disso, o algoritmo de verificação de modelos pode verificar se o contrato satisfaz esta especificação formal.

A verificação de modelo usa a exploração do espaço do estado, que envolve construir todos os estados possíveis de um contrato inteligente e tentar encontrar estados acessíveis que resultem em violações de propriedades. No entanto, isso pode levar a um número infinito de estados (conhecido como o "problema da explosão de estado"), por isso, os verificadores de modelos dependem de técnicas de abstração para possibilitar uma análise eficiente de contratos inteligentes.

### Comprovação de teorema {#theorem-proving}

Comprovação de teorema é um método de raciocínio matemático sobre a exatidão de programas, incluindo contratos inteligentes. Ela envolve transformar o modelo do sistema de um contrato e as suas especificações em fórmulas matemáticas (declarações lógicas).

O objetivo da comprovação de teorema é verificar a equivalência lógica entre essas declarações. “Equivalência lógica” (também chamada de “bi-implicação lógica”) é um tipo de relação entre duas declarações, de modo que a primeira declaração é verdadeira, _se e somente se_, a segunda declaração for verdadeira.

A relação necessária (equivalência lógica) entre as declarações sobre o modelo de um contrato e sua propriedade é formulada como uma declaração provável (chamada teorema). Usando um sistema formal de inferência, o comprovador do teorema automatizado pode verificar a validade do teorema. Em outras palavras, um comprovador de teorema pode comprovar de forma conclusiva se o modelo de um contrato inteligente corresponde precisamente às suas especificações.

Enquanto a verificação de modelos de contratos como sistemas de transição com estados finitos, a comprovação de teorema pode lidar com a análise de sistemas de estado infinito. No entanto, isso significa que um comprovador de teorema automatizado nem sempre sabe se um problema lógico é "decidível" ou não.

Como resultado, muitas vezes a assistência humana é necessária para guiar o comprovador do teorema na derivação das provas de correção. O uso do esforço humano na comprovação do teorema torna mais caro usar do que a verificação de modelos, que é totalmente automatizada.

### Execução simbólica {#symbolic-execution}

Execução simbólica é um método de análise de um contrato inteligente que executa funções usando _valores simbólicos_ (por exemplo, `x > 5`) em vez de _valores concretos_ (por exemplo, `x == 5`). Como técnica formal de verificação, a execução simbólica é usada para argumentar formalmente sobre propriedades de traços no código de um contrato.

A execução simbólica representa um traço de execução como uma fórmula matemática sobre valores simbólicos de entrada, também chamados de _predicado de caminho_. Um [SMT solver](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) é usado para verificar se um predicado de caminho é "satisfatório" (ou seja, existe um valor que pode cumprir a fórmula). Se um caminho vulnerável for cumprido, o solucionador SMT gerará um valor concreto que acionará a execução de guias em direção àquele caminho.

Suponha que a função de um contrato inteligente tome como entrada, um valor `uint` (`x`) e reverta quando `x` for maior que `5` e também menor que `10`. Encontrar um valor para `x` que dispara o erro usando um procedimento de teste normal exigiria ser executado por dezenas de casos de teste (ou mais) sem a garantia de realmente encontrar uma entrada de disparo de erro.

Inversamente, uma ferramenta de execução simbólica executaria a função com o valor simbólico: `X > 5 ∧ X < 10` (ou seja, `x` é maior que 5 E `x` é menor que 10). O predicado do caminho associado `x = X > 5 ∧ X < 10` seria dada a um solucionador de SMT para resolver. Se determinado valor satisfaz a fórmula `x = X > 5 ∧ X < 10`, o solucionador SMT irá calculá-lo—por exemplo, o solucionador pode produzir `7` como um valor para `x`.

Como a execução simbólica depende de entradas para um programa, e o conjunto de entradas para explorar todos os estados acessíveis é potencialmente infinito, ela ainda é uma forma de teste. Contudo, como mostrado no exemplo, a execução simbólica é mais eficiente do que os testes regulares para encontrar entradas que desencadeiem violações de propriedade.

Além disso, a execução simbólica produz menos falsos positivos do que outras técnicas baseadas em propriedades (por exemplo, fuzzing) que geram aleatoriamente entradas para uma função. Se um estado de erro for acionado durante a execução simbólica, então é possível gerar um valor concreto que desencadeie o erro e reproduza o problema.

A execução simbólica também pode fornecer algum grau de prova matemática de exatidão. Considere o seguinte exemplo de uma função de contrato com proteção a overflow:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
```

Um traço de execução que resulta em um overflow de número inteiro precisaria satisfazer a fórmula: `z = x + y E (z >= x) E (z=>y) E (z < x OU z < y)` É improvável que uma fórmula como essa seja resolvida, portanto ela serve uma comprovação matemática de que a função `safe_add` nunca sofre overflow.

### Por que usar a verificação formal para contratos inteligentes? {#benefits-of-formal-verification}

#### Necessidade de confiabilidade {#need-for-reliability}

A verificação formal é utilizada para avaliar a exatidão de sistemas críticos em matéria de segurança, cuja falha pode ter consequências devastadoras, como a morte, ferimentos ou a ruína financeira. Contratos inteligentes são aplicações de alto valor que controlam enormes quantidades de valor, e erros simples na concepção podem levar a [perdas irrecuperáveis para usuários](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Verificar formalmente um contrato antes da implantação pode, no entanto, aumentar as garantias de que ele executará como esperado, uma vez funcionando na blockchain.

A confiabilidade é uma qualidade altamente desejada em qualquer contrato inteligente, especialmente porque o código implantado na Ethereum Virtual Machine (EVM) é tipicamente imutável. Com melhorias pós-lançamento não prontamente acessíveis, a necessidade de garantir a confiabilidade dos contratos torna necessária a verificação formal. A verificação formal é capaz de detectar problemas complicados, como underflows e overflows de inteiros, reentrância, e otimizações de gás fracas, que podem passar por auditores e testadores.

#### Comprovar correção funcional {#prove-functional-correctness}

O teste do programa é o método mais comum de comprovar que um contrato inteligente cumpre alguns requisitos. Isso envolve a execução de um contrato com uma amostra dos dados que se espera que eles lidem e analisar seu comportamento. Se o contrato retorna os resultados esperados para os dados da amostra, então os desenvolvedores têm uma prova objetiva de sua exatidão.

No entanto, esta abordagem não pode comprovar a execução correta para valores de entrada que não fazem parte da amostra. Portanto, testar um contrato pode ajudar a detectar erros (ou seja, se alguns caminhos de código falham em retornar os resultados desejados durante a execução), mas **ele não pode comprovar de forma conclusiva a ausência de bugs**.

Inversamente, verificação formal pode comprovar formalmente que um contrato inteligente cumpre as exigências de uma infinita gama de execuções _sem_ executar nada do contrato. Isso requer a criação de uma especificação formal que descreva precisamente comportamentos de contratos corretos e desenvolva um modelo formal (matemático) do sistema do contrato. Em seguida, podemos seguir um procedimento formal de prova para verificar a consistência entre o modelo do contrato e a sua especificação.

Com a verificação formal, a questão de verificar se a lógica de negócios de um contrato satisfaz os requisitos é uma proposta matemática que pode ser comprovada ou reprovada. Ao comprovar formalmente uma proposição, podemos verificar um número infinito de casos de teste com um número finito de etapas. Desta forma, a verificação formal tem melhores perspectivas de comprovar que um contrato é funcionalmente correto no que se refere a uma especificação.

#### Alvos de verificação ideais {#ideal-verification-targets}

Um alvo de verificação descreve o sistema a ser formalmente verificado. A verificação formal é melhor usada em "sistemas integrados" (pequenos partes simples de software que fazem parte de um sistema maior). Eles também são ideais para domínios especializados que têm poucas regras, já que isso torna mais fácil modificar ferramentas para verificar propriedades específicas de domínio.

Contratos inteligentes, pelo menos em certa medida, preenchem ambos os requisitos. Por exemplo, o tamanho pequeno dos contratos Ethereum os torna acessíveis a uma verificação formal. Da mesma forma, a EVM segue regras simples, o que facilita a especificação e verificação de propriedades semânticas para programas em execução na EVM.

### Ciclo de desenvolvimento mais rápido {#faster-development-cycle}

Técnicas de verificação formais, como verificação de modelo e execução simbólica, geralmente são mais eficientes do que a análise regular do código do contrato inteligente (executado durante testes ou auditorias). Isso é porque a verificação formal depende de valores simbólicos para testar declarações ("e se um usuário tentar retirar _n_ ether?") Ao contrário de testes que usam valores concretos ("e se um usuário tentar retirar 5 ethers?").

Variáveis de entrada simbólica podem cobrir várias classes de valores concretos, assim as abordagens de verificação formal prometem mais cobertura de código em um período de tempo mais curto. Quando usado de forma eficaz, a verificação formal pode acelerar o ciclo de desenvolvimento para desenvolvedores.

A verificação formal também melhora o processo de construção de aplicativos descentralizados (dapps) reduzindo os erros de concepção caros. Atualizar contratos (sempre que possível) para corrigir vulnerabilidades requer extensa reescrita de códigos e mais esforço gasto em desenvolvimento. A verificação formal pode detectar muitos erros em implementações de contratos que podem passar por testadores e auditores anteriores e oferece uma ampla oportunidade para corrigir esses problemas antes de implantar um contrato.

## Desvantagens da verificação formal {#drawbacks-of-formal-verification}

### Custo do trabalho manual {#cost-of-manual-labor}

Verificação formal, especialmente verificação semiautomatizado, na qual um humano guia o comprovador para derivar comprovações de exatidão, requer um trabalho manual considerável. Além disso, a criação de uma especificação formal é uma atividade complexa que exige um elevado nível de competências.

Esses fatores (esforço e habilidade) tornam a verificação formal mais exigente e cara comparada com os métodos normais de avaliação da exatidão nos contratos, como testes e auditorias. No entanto, pagar o custo de uma auditoria completa de verificação é prático, dado o custo de erros em implementações de contratos inteligentes.

### Falsos negativos {#false-negatives}

A verificação formal só pode verificar se a execução do contrato inteligente corresponde à especificação formal. Como tal, é importante garantir que a especificação descreve corretamente os comportamentos esperados de um contrato inteligente.

Se as especificações forem mal escritas, as violações de propriedades - que apontam para execuções vulneráveis - não podem ser detectadas pela auditoria de verificação formal. Neste caso, um desenvolvedor pode assumir erroneamente que o contrato está livre de erros.

### Problemas de desempenho {#performance-issues}

Verificação formal acarreta uma série de problemas de desempenho. Por exemplo, os problemas de explosão de estado e caminho encontrados durante a verificação do modelo e a verificação simbólica, respectivamente, podem afetar os procedimentos de verificação. Além disso, as ferramentas formais de verificação muitas vezes usam solucionadores SMT e outros solucionadores de restrições em sua camada subjacente, e esses solucionadores dependem de procedimentos computacionais intensos.

Além disso, nem sempre é possível que os verificadores de programa determinem se uma propriedade (descrita como uma fórmula lógica) pode ser satisfeita ou não (o "[decidability problem](https://en.wikipedia.org/wiki/Decision_problem)") porque um programa pode nunca terminar. Como tal, pode ser impossível comprovar algumas propriedades de um contrato, mesmo se estiver bem especificado.

## Ferramentas de verificação formal para contratos inteligentes Ethereum {#formal-verification-tools}

### Linguagens de especificação para criação de especificações formais {#specification-languages}

**Act**: _*O Act permite a especificação de atualizações de armazenamento, condições de pré/pós e invariáveis do contrato. Seu conjunto de ferramentas também tem backends capazes de comprovar muitas propriedades via Coq, solucionadores SMT, ou hevm.**

- [GitHub](https://github.com/ethereum/act)
- [Documentação](https://ethereum.github.io/act/)

**Scribble** - _*Scribble transforma anotações de código na linguagem de especificação Scribble em afirmações concretas que verificam a especificação.**

- [Documentação](https://docs.scribble.codes/)

**Dafny** - _*Dafny é uma linguagem de programação pronta para verificação que depende de anotações de alto nível para argumentar e comprovar a exatidão do código.**

- [GitHub](https://github.com/dafny-lang/dafny)

### Verificadores de programa para checagem de exatidão {#program-verifiers}

**Certora Prover** - _Certora Prover é uma ferramenta de verificação formal automática para verificar a exatidão do código em contratos inteligentes. As especificações são escritas em CVL (Certora Verification Language), com violações de propriedade detectadas usando uma combinação de análise estática e resolução de restrições._

- [Site](https://www.certora.com/)
- [Documentação](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - _*Solidity’s SMTChecker é um verificador de modelos integrado com base no SMT (Teorias do Módulo de Satisfiabilidade) e na resolução de Horn. Ele confirma se o código-fonte de um contrato corresponde às especificações durante a compilação e procura estaticamente por violações de propriedades de segurança.**

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - _*solc-verify é uma versão estendida do compilador Solidity que pode executar a verificação formal automatizada no código Solidity usando anotações e verificação de programa modular.**

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - _*KEVM é uma semântica formal da Máquina Virtual Ethereum (EVM) escrita no framework K. KEVM é executável e pode comprovar determinadas declarações relacionadas à propriedade usando a lógica de alcançabilidade.**

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Documentação](https://jellopaper.org/)

### Frameworks lógicos para comprovação de teorema {#theorem-provers}

**Isabelle** - _Isabelle/HOL é um assistente de comprovação que permite que fórmulas matemáticas sejam expressas em uma linguagem formal e fornece ferramentas para comprovar essas fórmulas. A aplicação principal é a formalização de provas matemáticas e, em particular, a verificação formal, que inclui comprovar a exatidão do hardware ou software de computador e comprovar propriedades de linguagens e protocolos de computador._

- [GitHub](https://github.com/isabelle-prover)
- [Documentação](https://isabelle.in.tum.de/documentation.html)

**Coq** - _Coq é um comprovador de teorema interativo que permite definir programas usando teoremas e interativamente gerar comprovações de correção verificadas por máquina._

- [GitHub](https://github.com/coq/coq)
- [Documentação](https://coq.github.io/doc/v8.13/refman/index.html)

### Ferramentas de execução simbólica para detectar padrões vulneráveis em contratos inteligentes {#symbolic-execution-tools}

**Manticore** - _*Uma ferramenta para analisar a ferramenta de análise de bytecode EVM com base em execução simbólica*.*

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentação](https://github.com/trailofbits/manticore/wiki)

**hevm** - _*hevm é um mecanismo de execução simbólico e um verificador de equivalência para bytecode EVM.**

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Uma ferramenta de execução simbólica para detectar vulnerabilidades nos contratos inteligentes da Ethereum_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Documentação](https://mythril-classic.readthedocs.io/en/develop/)

## Leitura adicional {#further-reading}

- [Como funciona a verificação formal dos contratos inteligentes](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Como a verificação formal pode garantir contratos inteligentes infalíveis](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Uma visão geral dos Projetos de Verificação Formal no Ecossistema Ethereum](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Verificação formal de ponta a ponta do contrato inteligente de depósito Ethereum 2.0](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Verificando formalmente o Contrato Inteligente Mais Popular do Mundo](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker e Verificação Formal](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)
