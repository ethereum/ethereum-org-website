---
title: Glamsterdam
description: "Aprenda sobre a atualização do protocolo Glamsterdam"
lang: pt-br
---

# Glamsterdam {#glamsterdam}

<Alert variant="update">
<AlertContent>
<AlertTitle>
Glamsterdam é uma futura atualização do Ethereum planejada para o segundo semestre de 2026
</AlertTitle>
<AlertDescription>
A atualização Glamsterdam é apenas um único passo nos objetivos de desenvolvimento de longo prazo do Ethereum. Saiba mais sobre [o roteiro do protocolo](/roadmap/) e [atualizações anteriores](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

A futura atualização Glamsterdam do [Ethereum](/) foi projetada para abrir caminho para a próxima geração de escalabilidade. Glamsterdam recebe esse nome a partir da combinação de "Amsterdam" (atualização da camada de execução, nomeada em homenagem a um local anterior da Devconnect) e "Gloas" (atualização da camada de consenso, nomeada em homenagem a uma estrela).

Seguindo o progresso feito na atualização [Fusaka](/roadmap/fusaka/), a Glamsterdam foca em escalar a camada 1 (l1) reorganizando como a rede processa transações e gerencia seu banco de dados crescente, atualizando fundamentalmente como o Ethereum cria e verifica blocos.

Enquanto a Fusaka focou em refinamentos fundamentais, a Glamsterdam avança os objetivos de "Escalar a L1" e "Escalar Blobs" ao consagrar a separação de funções entre diferentes participantes da rede e introduzir maneiras mais eficientes de lidar com dados para preparar o [estado](/glossary/#state) para paralelização de alta vazão.

Essas melhorias garantem que o Ethereum permaneça rápido, acessível e descentralizado à medida que lida com mais atividades, mantendo os requisitos de hardware gerenciáveis para pessoas que executam [nós](/glossary/#node) em casa.

<VideoWatch slug="ethereum-evolution-glamsterdam" />

## Melhorias consideradas para a Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Nota: Este artigo destaca atualmente uma seleção de EIPs sendo consideradas para inclusão na Glamsterdam. Propostas adicionais sendo ativamente testadas em redes de desenvolvimento (devnets) incluem EIP-7778, EIP-7843, EIP-7976, EIP-7981 e EIP-8024. Para as atualizações de status mais recentes, veja a [atualização Glamsterdam no Forkcast](https://forkcast.org/upgrade/glamsterdam).

Se você quiser adicionar uma EIP que está sob consideração para a Glamsterdam, mas ainda não foi adicionada a esta página, [aprenda como contribuir para o ethereum.org aqui](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

A atualização Glamsterdam concentra-se em três objetivos principais:

- Acelerar o processamento (paralelização): Reorganizar como a rede registra dependências de dados, para que possa processar com segurança muitas transações ao mesmo tempo, em vez de em uma sequência lenta, uma a uma.
- Expandir a capacidade: Dividir o trabalho pesado de criar e verificar blocos, dando à rede mais tempo para propagar quantidades maiores de dados sem desacelerar.
- Prevenir o inchaço do banco de dados (sustentabilidade): Ajustar as taxas da rede para refletir com precisão o custo de hardware a longo prazo de armazenar novos dados, desbloqueando futuros aumentos no limite de gas enquanto previne a degradação do desempenho do hardware.

Em suma, a Glamsterdam introduzirá mudanças estruturais para garantir que, à medida que a rede aumenta a capacidade, ela permaneça sustentável e o desempenho continue alto.

## Escalar a L1 e processamento paralelo {#scale-l1}

O dimensionamento significativo da camada 1 (l1) exige o afastamento de premissas de confiança fora do protocolo e restrições de execução em série. A Glamsterdam aborda isso consagrando a separação de certas funções de construção de blocos e introduzindo novas estruturas de dados que permitem que a rede se prepare para o processamento paralelo.

### Proposta principal: Separação Propositor-Construtor Consagrada (ePBS) {#epbs}

- Remove premissas de confiança fora do protocolo e a dependência de retransmissores (relays) de terceiros
- Suporta a escalabilidade da camada 1 (l1) permitindo cargas de execução muito maiores por meio de janelas de propagação estendidas
- Introduz pagamentos de construtores sem necessidade de confiança diretamente no protocolo 
- Exige atualizações arquitetônicas para pools de staking para permitir o monitoramento sem necessidade de confiança, embora a experiência geral do usuário de staking seja melhorada por um processo refinado de seleção de construtores

Atualmente, o processo de propor e construir blocos inclui uma transferência entre proponentes de blocos e construtores de blocos. A relação entre proponentes e construtores não faz parte do protocolo principal do Ethereum, portanto, depende de middleware de terceiros confiáveis, software (retransmissores) e confiança fora do protocolo entre as entidades.

A relação fora do protocolo entre proponentes e construtores também cria um "caminho crítico" (hot path) durante a validação de bloco que força os [validadores](/glossary/#validator) a se apressarem na transmissão e execução de transações em uma janela apertada de 2 segundos, limitando a quantidade de dados que a rede pode suportar.

A **Separação Propositor-Construtor Consagrada (ePBS, ou EIP-7732)** separa formalmente o trabalho do proponente (que seleciona o bloco de consenso) do construtor (que monta a carga de execução), consagrando essa transferência diretamente no protocolo. 

Construir a troca sem necessidade de confiança de uma carga de bloco por pagamento diretamente no protocolo remove a necessidade de middleware de terceiros (como o MEV-Boost). No entanto, construtores e proponentes ainda podem optar por usar retransmissores ou middleware fora do protocolo para recursos complexos que ainda não fazem parte do protocolo principal. 

Para resolver o gargalo do "caminho crítico", a ePBS também introduz o Comitê de Pontualidade de Carga (Payload Timeliness Committee - PTC) e uma lógica de prazo duplo, permitindo que os validadores atestem o bloco de consenso e a pontualidade da carga de execução separadamente para maximizar a vazão.

<VideoWatch slug="proposer-builder-separation" />

Separar as funções de proponente e construtor no nível do protocolo expande a janela de propagação (ou o tempo disponível para espalhar dados pela rede) de 2 segundos para cerca de 9 segundos.

Ao substituir middleware e retransmissores fora do protocolo por mecânicas dentro do protocolo, a ePBS reduz as dependências de confiança e permite que o Ethereum processe com segurança quantidades muito maiores de dados (como mais blobs para [camadas 2 (l2)](/glossary/#layer-2)) sem sobrecarregar a rede.

**Recursos**: [Especificação técnica da EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Proposta principal: Listas de Acesso em Nível de Bloco (BALs) {#bals}

- Elimina gargalos de processamento sequencial fornecendo um mapa antecipado de todas as dependências de transação, preparando o terreno para que os validadores processem muitas transações em paralelo em vez de uma a uma
- Permite que os nós atualizem seus registros lendo os resultados finais sem precisar reproduzir cada transação (sincronização sem execução), tornando muito mais rápido sincronizar um nó com a rede
- Elimina adivinhações, permitindo que os validadores pré-carreguem todos os dados necessários de uma só vez em vez de descobri-los passo a passo, o que torna a validação muito mais rápida

O Ethereum de hoje é como uma estrada de pista única; como a rede não sabe quais dados uma transação precisará ou alterará (como quais contas uma transação tocará) até que uma transação seja executada, os validadores devem processar as transações uma a uma em uma linha estrita e sequencial. Se eles tentassem processar as transações todas de uma vez, sem conhecer essas dependências, duas transações poderiam acidentalmente tentar alterar exatamente os mesmos dados ao mesmo tempo, causando erros.

As **Listas de Acesso em Nível de Bloco (BALs, ou EIP-7928)** funcionam como um mapa para a rede, detalhando quais partes do banco de dados serão acessadas antes do trabalho começar. A camada de execução armazena a Lista de Acesso de Bloco completa, incluindo cada alteração de conta que as transações tocarão, juntamente com os resultados finais dessas alterações (todos os acessos de estado e valores pós-execução). Para manter os blocos leves, o cabeçalho do bloco contém um novo campo com uma impressão digital única (o registro de hash) desta lista.

Como elas dão visibilidade instantânea sobre quais transações não se sobrepõem, as BALs permitem que os nós realizem leituras de disco paralelas, buscando informações para muitas transações simultaneamente. A rede pode agrupar com segurança transações não relacionadas e processá-las em paralelo.

Como a BAL inclui os resultados finais das transações (os valores pós-execução), quando os nós da rede precisam sincronizar com o estado atual da rede, eles podem copiar esses resultados finais para atualizar seus registros. Os validadores não precisam mais reproduzir todas as transações complicadas do zero para saber o que aconteceu, tornando mais rápido e fácil para novos nós se juntarem à rede.

As leituras de disco paralelas habilitadas pelas BALs serão um passo significativo em direção a um futuro onde o Ethereum poderá processar muitas transações de uma só vez, aumentando significativamente a velocidade da rede.

#### Troca de Lista de Acesso de Bloco eth/71 {#bale}

A Troca de Lista de Acesso de Bloco (eth/71 ou EIP-8159) é a companheira de rede direta para listas de acesso em nível de bloco. Enquanto as BALs desbloqueiam a execução paralela, a eth/71 atualiza o protocolo ponto a ponto para permitir que os nós realmente compartilhem essas listas pela rede. Agora exigida para todos os clientes da camada de execução, a troca de lista de acesso de bloco permitirá uma sincronização mais rápida e permitirá que os nós realizem atualizações de estado sem execução.

**Recursos**:

- [Especificação técnica da EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Especificação técnica da EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Sustentabilidade da rede {#network-sustainability}

À medida que a rede Ethereum cresce mais rápido, é importante garantir que o custo de usá-la corresponda ao desgaste do hardware que executa o Ethereum. A rede precisa aumentar seus limites de capacidade geral para escalar com segurança e processar mais transações.

### Aumento do custo de gas para criação de estado {#state-creation-gas-cost-increase}

- Garante que as taxas para criar novas contas ou contratos inteligentes reflitam com precisão o fardo de longo prazo que eles colocam no banco de dados do Ethereum
- Define um **custo fixo por byte de estado (CPSB)** visando uma taxa de crescimento segura e previsível de 120 GiB/ano, garantindo que o hardware físico padrão possa continuar executando a rede
- Separa a contabilidade dessas taxas específicas para um novo reservatório, removendo antigos limites de transação e permitindo que os desenvolvedores implantem aplicativos maiores e mais complexos

Adicionar novas contas, tokens e [contratos inteligentes](/glossary/#smart-contract) cria dados permanentes (conhecidos como "estado") que todo computador que executa a rede deve armazenar indefinidamente. As taxas atuais para adicionar ou ler esses dados são inconsistentes e não refletem necessariamente o fardo real de armazenamento a longo prazo que eles colocam no hardware da rede.

Algumas ações que criam estado no Ethereum, como criar novas contas ou implantar grandes contratos inteligentes, têm tido um custo relativamente baixo em comparação com o espaço de armazenamento permanente que ocupam nos nós da rede; por exemplo, a implantação de contrato é significativamente mais barata por byte do que a criação de slots de armazenamento.

Sem ajustes, o crescimento do estado do Ethereum se tornaria insustentável à medida que a rede escala em direção ao piso de limite de gas de 200M habilitado pela Glamsterdam (com desenvolvedores testando atualmente em um limite de gas de bloco de referência de 150M para derivar preços de estado precisos).

O **Aumento do custo de gas para criação de estado (ou EIP-8037)** harmoniza os custos vinculando-os ao tamanho real dos dados sendo criados, atualizando as taxas para que sejam proporcionais à quantidade de dados permanentes que uma operação cria ou acessa.

A EIP-8037 também introduz um modelo de reservatório para gerenciar esses custos de forma mais previsível; as cobranças de gas de estado são retiradas do `state_gas_reservoir` primeiro, e o código de operação `GAS` retorna apenas `gas_left`, impedindo que os quadros de execução calculem incorretamente o gas disponível. Para apoiar isso, tarefas essenciais em segundo plano recebem uma permissão extra de combustível que vai direto para essa reserva dedicada, garantindo que operações críticas da rede não falhem simplesmente porque o armazenamento de dados permanentes exige mais recursos.

Antes da EIP-8037, tanto o trabalho computacional (o processamento ativo) quanto o armazenamento de dados permanentes (salvar o contrato inteligente no banco de dados da rede) compartilhavam o mesmo limite de gas. O modelo de reservatório divide a contabilidade: o limite de gas para o trabalho computacional real da transação (processamento) e para o armazenamento de dados a longo prazo (gas de estado). Separar os dois ajuda a evitar que o tamanho absoluto dos dados de um aplicativo atinja o limite de gas; desde que os desenvolvedores forneçam fundos suficientes para encher o reservatório para armazenamento de dados, eles podem implantar contratos inteligentes muito maiores e mais complexos.

Precificar o armazenamento de dados de forma mais precisa e previsível ajudará o Ethereum a aumentar com segurança sua velocidade e capacidade sem inchar o banco de dados. Essa sustentabilidade permitirá que os operadores de nós continuem usando hardware (relativamente) acessível nos próximos anos, mantendo o staking doméstico acessível para manter a descentralização da rede.

**Recursos**: [Especificação técnica da EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Atualização do custo de gas para acesso ao estado {#state-access-gas-cost-update}

- Aumenta os custos de gas para quando os aplicativos leem ou atualizam informações armazenadas permanentemente no Ethereum (códigos de operação de acesso ao estado) para corresponder com precisão ao trabalho de computação que esses comandos exigem
- Fortalece a resiliência da rede prevenindo ataques de negação de serviço que exploram operações de leitura de dados artificialmente baratas

À medida que o estado do Ethereum cresceu, o ato de pesquisar e ler dados antigos ("acesso ao estado") tornou-se mais pesado e lento para os nós processarem. As taxas para essas ações permaneceram as mesmas, embora agora seja um pouco mais caro procurar informações (em termos de poder de computação).

Como resultado, alguns comandos específicos estão atualmente subprecificados em relação ao trabalho que forçam um nó a fazer. `EXTCODESIZE` e `EXTCODECOPY` estão subprecificados, por exemplo, porque exigem duas leituras de banco de dados separadas — uma para o objeto da conta e uma segunda para o tamanho real do código ou bytecode.

A **Atualização do custo de gas para acesso ao estado (ou EIP-8038)** aumenta as constantes de gas para códigos de operação de acesso ao estado, como pesquisar dados de contas e contratos, para se alinhar com o desempenho do hardware moderno e o tamanho do estado.

Alinhar o custo do acesso ao estado também ajuda a tornar o Ethereum mais resiliente. Como essas ações pesadas de leitura de dados são artificialmente baratas, um invasor mal-intencionado poderia enviar spam para a rede com milhares de solicitações de dados complexas em um único bloco antes de atingir o limite de taxas da rede, potencialmente fazendo com que a rede trave ou falhe (um ataque de negação de serviço). Mesmo sem intenção maliciosa, os desenvolvedores não são economicamente encorajados a construir aplicativos eficientes se a leitura de dados da rede for muito barata.

Ao precificar as ações de acesso ao estado com mais precisão, o Ethereum pode ser mais resiliente contra lentidões acidentais ou intencionais, enquanto alinhar os custos da rede com a carga de hardware prova ser uma base mais sustentável para futuros aumentos no limite de gas.

**Recursos**: [Especificação técnica da EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Resiliência da rede {#network-resilience}

Refinamentos nas funções dos validadores e nos processos de saída garantem a estabilidade da rede durante eventos de penalização em massa (slashing) e democratizam a liquidez. Essas melhorias tornam a rede mais estável e garantem que todos os participantes, grandes e pequenos, sejam tratados de forma justa.

### Excluir validadores penalizados de propor {#exclude-slashed-validators}

- Impede que validadores penalizados (slashed) sejam selecionados para propor blocos futuros, eliminando slots perdidos garantidos
- Mantém o Ethereum funcionando de forma suave e confiável, prevenindo travamentos severos no caso de um evento de penalização em massa

Atualmente, mesmo que um validador seja penalizado (punido por quebrar as regras ou não operar conforme o esperado), o sistema ainda pode escolhê-lo para liderar um bloco no futuro próximo quando gera previsões de proponentes futuros.

Como os blocos de proponentes penalizados são automaticamente rejeitados como inválidos, isso faz com que a rede perca slots e atrasa a recuperação da rede durante eventos de penalização em massa.

**Excluir validadores penalizados de propor (ou EIP-8045)** simplesmente filtra os validadores penalizados para que não sejam selecionados para funções futuras. Isso melhora a resiliência da cadeia garantindo que apenas validadores saudáveis sejam selecionados para propor blocos, mantendo a qualidade do serviço durante interrupções na rede.

**Recursos**: [Especificação técnica da EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Permitir que as saídas usem a fila de consolidação {#let-exits-use-the-consolidation-queue}

- Fecha uma brecha que permite que validadores de alto saldo saiam da rede mais rapidamente do que validadores menores por meio da fila de consolidação
- Permite que saídas regulares transbordem (overflow) para esta segunda fila quando ela tem capacidade ociosa, reduzindo os tempos de saque de staking durante períodos de alto volume
- Mantém segurança estrita para evitar alterar os limites de segurança principais do Ethereum ou enfraquecer a rede

Desde que a [atualização Pectra](/roadmap/pectra) aumentou o saldo efetivo máximo para validadores do Ethereum de 32 ETH para 2.048 ETH, uma brecha técnica permite que validadores de alto saldo saiam da rede mais rápido do que validadores menores por meio da fila de consolidação.

**Permitir que as saídas usem a fila de consolidação (ou EIP-8080)** democratiza a fila de consolidação para todas as saídas de staking, criando uma fila única e justa para todos.

Para detalhar como isso funciona hoje:

- O limite de rotatividade do Ethereum é um limite de segurança na taxa em que os validadores podem entrar, sair ou mesclar (consolidar) seu ETH em stake, para garantir que a segurança da rede nunca seja desestabilizada
- Como a consolidação de um validador é uma ação mais pesada com mais partes móveis do que uma saída padrão de validador, ela consome uma porção maior desse orçamento de segurança (limite de rotatividade)
- Especificamente, o protocolo dita que o custo exato de segurança de uma saída padrão é de dois terços (2/3) do custo de uma consolidação

Filas de saída mais justas permitirão que saídas padrão peguem emprestado espaço não utilizado da fila de consolidação durante períodos de alta demanda de saída, aplicando uma taxa de câmbio de "3 por 2" (para cada 2 vagas de consolidação não utilizadas, a rede pode processar com segurança 3 saídas padrão). Esse fator de rotatividade de 3/2 equilibra a demanda entre as filas de consolidação e de saída.

Democratizar o acesso à fila de consolidação aumentará a velocidade com que os usuários podem sair de seu stake durante períodos de alta demanda em até 2,5x, sem comprometer a segurança da rede.

**Recursos**: [Especificação técnica da EIP-8080](https://eips.ethereum.org/EIPS/eip-8080)

## Melhorar a experiência do usuário e do desenvolvedor {#improve-user-developer-experience}

A atualização Glamsterdam do Ethereum visa melhorar a experiência do usuário, aprimorar a descoberta de dados e lidar com o aumento do tamanho das mensagens para evitar falhas de sincronização. Isso torna mais fácil rastrear o que está acontecendo onchain, ao mesmo tempo em que evita problemas técnicos à medida que a rede escala.

### Reduzir os custos intrínsecos de gas de transação {#reduce-intrinsic-transaction-gas-costs}

- Reduz a taxa básica para transações, diminuindo o custo geral de um pagamento simples de ETH nativo
- Torna transferências menores mais acessíveis, impulsionando a viabilidade do Ethereum como um meio de troca rotineiro

Todas as transações do Ethereum têm uma taxa de gas básica fixa hoje, independentemente de quão simples ou complexo seja o processamento. **Reduzir o gas intrínseco de transação (ou EIP-2780)** propõe reduzir essa taxa básica para tornar uma transferência padrão de ETH entre contas existentes até **71% mais barata**.

Reduzir o gas intrínseco de transação funciona dividindo a taxa de transação para refletir apenas o trabalho básico e essencial que os computadores que executam a rede realmente fazem, como verificar uma assinatura digital e atualizar um saldo. Como um pagamento básico de ETH não executa código complexo nem carrega dados extras, esta proposta reduziria sua taxa para corresponder à sua pegada leve.

A proposta introduz uma exceção para a criação de contas totalmente novas para evitar que taxas mais baixas sobrecarreguem o estado da rede. Se uma transferência enviar ETH para um endereço vazio e inexistente, a rede deverá criar um novo registro permanente para ele. Uma sobretaxa de gas é adicionada para essa criação de conta para ajudar a cobrir seu fardo de armazenamento a longo prazo.

Juntas, a EIP-2780 visa tornar as transferências diárias entre contas existentes mais acessíveis, garantindo que a rede ainda esteja protegida contra o inchaço do banco de dados, precificando com precisão o verdadeiro crescimento do estado.

**Recursos**: [Especificação técnica da EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Pré-implantação de Fábrica Determinística {#deterministic-factory-predeploy}

- Dá aos desenvolvedores uma maneira nativa de implantar aplicativos e carteiras de contratos inteligentes exatamente no mesmo endereço em várias cadeias
- Permite que os usuários tenham o mesmo endereço de carteira inteligente em várias redes de camada 2 (l2), reduzindo a carga cognitiva, reduzindo a confusão e reduzindo o risco de perda acidental de fundos
- Substitui as soluções alternativas que os desenvolvedores usam atualmente para alcançar essa paridade, tornando mais fácil e seguro construir carteiras e aplicativos multi-cadeia

Se um usuário tem uma carteira de contrato inteligente hoje com contas em várias cadeias compatíveis com a Máquina Virtual Ethereum (EVM), ele frequentemente acaba com um endereço completamente diferente em redes diferentes. Isso não é apenas confuso, mas pode levar à perda acidental de fundos.

A **Pré-implantação de Fábrica Determinística (ou EIP-7997)** dá aos desenvolvedores uma maneira nativa e integrada de implantar seus aplicativos descentralizados e carteiras de contratos inteligentes exatamente no mesmo endereço em várias cadeias EVM, incluindo a Rede Principal do Ethereum, redes de camada 2 (l2) e muito mais. Se adotada, permitiria que o usuário tivesse exatamente o mesmo endereço em cada cadeia participante, reduzindo significativamente a carga cognitiva e o potencial de erro do usuário.

A Pré-implantação de Fábrica Determinística funciona colocando permanentemente um programa de fábrica mínimo e especializado em um local idêntico (especificamente, o endereço 0x12) em cada cadeia compatível com EVM participante. Seu objetivo é fornecer um contrato de fábrica universal e padrão que possa ser adotado por qualquer rede compatível com EVM; desde que uma cadeia EVM participe e adote esse padrão, os desenvolvedores poderão usá-lo para implantar seus contratos inteligentes exatamente no mesmo endereço nessa rede.

Essa padronização simplifica a construção e o gerenciamento de aplicativos cross-chain para desenvolvedores e o ecossistema mais amplo. Os desenvolvedores não precisam mais construir código personalizado e específico da cadeia para vincular seus softwares em diferentes redes, em vez disso, usam essa fábrica universal para gerar exatamente o mesmo endereço para seu aplicativo em todos os lugares. Além disso, exploradores de blocos, serviços de rastreamento e carteiras podem identificar e vincular mais facilmente esses aplicativos e contas em várias cadeias, criando um ambiente multi-cadeia mais unificado e contínuo para todos os participantes baseados no Ethereum.

**Recursos**: [Especificação técnica da EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### Transferências e queimas de ETH emitem um log {#eth-transfers-and-burns-emit-a-log}

- Gera automaticamente um registro permanente (log) toda vez que ETH é transferido ou queimado
- Corrige um ponto cego histórico que permite que aplicativos, exchanges e pontes detectem de forma confiável os depósitos dos usuários sem ferramentas de rastreamento ad-hoc

Ao contrário dos tokens (ERC-20s), as transferências regulares de ETH entre contratos inteligentes não emitem um recibo claro (log padrão), tornando-as difíceis de rastrear para exchanges e aplicativos.

Transferências e queimas de ETH emitem um log (ou EIP-7708) torna obrigatório que a rede emita um evento de log padrão toda vez que uma quantia diferente de zero de ETH for movida ou queimada.

Isso tornará muito mais fácil e confiável para carteiras, exchanges e operadores de pontes rastrear com precisão depósitos e movimentos sem ferramentas personalizadas.

**Recursos**: [Especificação técnica da EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### Listas parciais de recibos de bloco eth/70 {#eth-70-partial-block-receipt-lists}

À medida que aumentamos a quantidade de trabalho que o Ethereum pode fazer, as listas de recibos para essas ações (os registros de dados dessas transações) estão ficando tão grandes que poderiam potencialmente fazer com que os nós da rede falhassem ao tentar sincronizar dados uns com os outros.

Agora um requisito para todos os clientes da camada de execução, as listas parciais de recibos de bloco eth/70 (ou EIP-7975) introduzem uma nova maneira de os nós conversarem entre si (eth/70) que permite que essas grandes listas sejam divididas em pedaços menores e mais gerenciáveis. A eth/70 introduz um sistema de paginação para o protocolo de comunicação da rede que permite que os nós dividam as listas de recibos de bloco e solicitem os dados com segurança em pedaços menores e mais gerenciáveis.

Essa mudança evitaria falhas de sincronização da rede durante períodos de atividade intensa. Em última análise, ela abre caminho para que o Ethereum aumente sua capacidade de bloco e processe mais transações por bloco no futuro, sem sobrecarregar o hardware físico que sincroniza a cadeia.

**Recursos**: [Especificação técnica da EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Leitura adicional {#further-reading}

- [Roteiro do Ethereum](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Meta EIP da Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Anúncio no blog sobre a Atualização de Prioridades do Protocolo para 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podcast The Daily Gwei Refuel - Ethereum pós-quântico, a Glamsterdam está chegando](https://www.youtube.com/watch?v=qx9sd50uQjQ)

## Perguntas frequentes {#faq}

### Como o ETH pode ser convertido após a bifurcação rígida Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **Nenhuma ação é necessária para o seu ETH**: Não há necessidade de converter ou atualizar seu ETH após a atualização Glamsterdam. Os saldos da sua conta permanecerão os mesmos, e o ETH que você possui atualmente permanecerá acessível em sua forma existente após a bifurcação rígida.
- **Cuidado com golpes!** <Emoji text="⚠️" /> **qualquer pessoa instruindo você a "atualizar" seu ETH está tentando aplicar um golpe.** Não há nada que você precise fazer em relação a esta atualização. Seus ativos permanecerão completamente inalterados. Lembre-se, manter-se informado é a melhor defesa contra golpes.

[Mais sobre como reconhecer e evitar golpes](/security/)

### A atualização Glamsterdam afeta todos os nós e validadores do Ethereum? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Sim, a atualização Glamsterdam exige atualizações tanto para [clientes de execução quanto para clientes de consenso](/developers/docs/nodes-and-clients/). Como esta atualização introduz a Separação Propositor-Construtor Consagrada (ePBS), os operadores de nós precisarão garantir que seus clientes estejam atualizados para lidar com as novas maneiras como os blocos são construídos, validados e atestados pela rede.

Todos os principais clientes do Ethereum lançarão versões com suporte à bifurcação rígida marcadas como de alta prioridade. Você pode acompanhar quando esses lançamentos estarão disponíveis nos repositórios do GitHub dos clientes, em seus [canais do Discord](https://ethstaker.org/support), no [Discord do EthStaker](https://dsc.gg/ethstaker), ou assinando o blog do Ethereum para atualizações do protocolo.

Para manter a sincronização com a rede Ethereum após a atualização, os operadores de nós devem garantir que estão executando uma versão de cliente suportada. Observe que as informações sobre os lançamentos de clientes são sensíveis ao tempo, e os usuários devem consultar as atualizações mais recentes para obter os detalhes mais atuais.

### Como um staker, o que preciso fazer para a atualização Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Como em toda atualização de rede, certifique-se de atualizar seus clientes para as versões mais recentes marcadas com suporte à Glamsterdam. Acompanhe as atualizações na lista de e-mails e nos [Anúncios do Protocolo no Blog da EF](https://blog.ethereum.org/category/protocol) para se informar sobre os lançamentos.

Para validar sua configuração antes que a Glamsterdam seja ativada na Mainnet, você pode executar um validador em redes de teste. As bifurcações de redes de teste também são anunciadas na lista de e-mails e no blog.

### Quais melhorias a Glamsterdam incluirá para a escalabilidade da L1? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

O recurso principal é a ePBS (EIP-7732), que separa a pesada tarefa de validar transações da rede da tarefa de alcançar consenso. Isso expande a janela de propagação de dados de 2 segundos para cerca de 9 segundos, desbloqueando a capacidade do Ethereum de lidar com segurança com uma vazão de transações muito maior e acomodar mais blobs de dados para redes de camada 2 (l2).

### A Glamsterdam reduzirá as taxas no Ethereum (camada 1)? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Sim, a Glamsterdam muito provavelmente reduzirá as taxas para usuários comuns! Reduzir o gas intrínseco de transação (ou EIP-2780) reduz a taxa básica para enviar ETH, tornando o ETH muito mais barato de usar para pagamentos diários.

Além disso, para sustentabilidade a longo prazo, a Glamsterdam introduz Listas de Acesso em Nível de Bloco (BALs). Isso permite o processamento paralelo e prepara a L1 para lidar com segurança com limites de gas gerais mais altos no futuro, o que provavelmente reduzirá os custos de gas por transação à medida que a capacidade cresce.

### Haverá alguma mudança nos meus contratos inteligentes existentes após a Glamsterdam? {#will-my-smart-contracts-change}

Os contratos existentes continuarão a funcionar normalmente após a Glamsterdam. Os desenvolvedores provavelmente obterão várias novas ferramentas e devem revisar seu uso de gas:

- Aumentar o tamanho máximo do contrato (ou EIP-7954) permite que os desenvolvedores implantem aplicativos maiores, elevando o limite de tamanho máximo do contrato de cerca de 24KiB para 32KiB.
- A pré-implantação de fábrica determinística (ou EIP-7997) introduz um contrato de fábrica universal e integrado. Ela permite que os desenvolvedores implantem seus aplicativos e carteiras de contratos inteligentes exatamente no mesmo endereço em todas as cadeias EVM participantes.
- Se o seu aplicativo depende de rastreamento complexo para encontrar transferências de ETH, Transferências e queimas de ETH emitem um log (ou EIP-7708) permitirá que você mude para o uso de logs para uma contabilidade mais simples e confiável.
- O aumento do custo de gas para criação de estado (ou EIP-8037) e a atualização do custo de gas para acesso ao estado (ou EIP-8038) introduzem novos modelos de sustentabilidade que mudarão certos custos de implantação de contrato, pois a criação de novas contas ou armazenamento permanente terá uma nova taxa fixa padronizada com base no tamanho dos dados criados.

### Como a Glamsterdam afetará o armazenamento do nó e os requisitos de hardware? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Várias EIPs sob consideração para a Glamsterdam abordam o declínio acentuado de desempenho do crescimento do estado:

- O aumento do custo de gas para criação de estado (ou EIP-8037) introduz uma estrutura de custo fixo (CPSB) para atingir uma taxa de crescimento do banco de dados de estado de 120 GiB/ano, garantindo que o hardware físico padrão possa continuar executando a rede com eficiência.
- As listas parciais de recibos de bloco eth/70 (ou EIP-7975) permitem que os nós solicitem recibos de bloco paginados, o que divide listas de recibos de bloco pesadas em dados em pedaços menores para evitar falhas e problemas de sincronização à medida que o Ethereum escala.