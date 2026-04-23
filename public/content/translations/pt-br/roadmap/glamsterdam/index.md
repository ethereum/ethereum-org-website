---
title: Glamsterdam
description: Saiba mais sobre a melhoria do protocolo Glamsterdam
lang: pt-br
---

# Glamsterdam {#glamsterdam}

<Alert variant="update">
<AlertContent>
<AlertTitle>
Glamsterdam é uma melhoria do Ethereum planejada para o primeiro semestre de 2026
</AlertTitle>
<AlertDescription>
A melhoria Glamsterdam é apenas um passo nos objetivos de desenvolvimento de longo prazo do Ethereum. Saiba mais sobre [o roteiro do protocolo](/roadmap/) e [atualizações anteriores](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

A futura melhoria Glamsterdam da [Ethereum](/) foi projetada para abrir caminho para a próxima geração de escalabilidade. Glamsterdam recebe o nome da combinação de "Amsterdam" (melhoria da camada de execução, nomeada em homenagem a um local anterior da Devconnect) e "Gloas" (melhoria da camada de consenso, nomeada em homenagem a uma estrela).

Após o progresso feito na melhoria [Fusaka](/roadmap/fusaka/), Glamsterdam se concentra em escalar a L1, reorganizando como a rede processa transações e gerencia seu crescente banco de dados, atualizando fundamentalmente como o Ethereum cria e verifica blocos.

Enquanto Fusaka se concentrou em refinamentos fundamentais, Glamsterdam avança os objetivos de "Escalar L1" e "Escalar Blobs", consagrando a separação de tarefas entre diferentes participantes da rede e introduzindo maneiras mais eficientes de lidar com dados para preparar o [estado](/glossary/#state) para paralelização de alto rendimento.

Essas melhorias garantem que o Ethereum permaneça rápido, acessível e descentralizado à medida que lida com mais atividades, mantendo os requisitos de hardware gerenciáveis para pessoas que executam [nós](/glossary/#node) em casa.

<YouTube id="GgKveVMLnoo" />

## Melhorias consideradas para a Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Observação: este artigo destaca atualmente uma seleção de EIPs que estão sendo consideradas para inclusão na Glamsterdam. Para as atualizações de status mais recentes, veja a [melhoria Glamsterdam no Forkcast](https://forkcast.org/upgrade/glamsterdam).

Se você quiser adicionar uma EIP que esteja sob consideração para a Glamsterdam, mas que ainda não foi adicionada a esta página, [saiba como contribuir para ethereum.org aqui](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

A melhoria Glamsterdam se concentra em três objetivos principais:

- Acelerar o processamento (paralelização): Reorganizar como a rede registra as dependências de dados, para que ela possa processar com segurança muitas transações ao mesmo tempo, em vez de em uma sequência lenta, uma por uma.
- Expandir a capacidade: dividir o trabalho pesado de criar e verificar blocos, dando à rede mais tempo para propagar grandes quantidades de dados sem lentidão.
- Prevenindo o inchaço do banco de dados (sustentabilidade): Ajustar as taxas da rede para refletir com precisão o custo de hardware a longo prazo do armazenamento de novos dados, desbloqueando futuros aumentos no limite de gas e evitando a degradação do desempenho do hardware.

Em resumo, Glamsterdam introduzirá mudanças estruturais para garantir que, à medida que a rede aumenta a capacidade, ela permaneça sustentável e o desempenho se mantenha alto.

## Escalabilidade da L1 e processamento paralelo {#scale-l1}

A escalabilidade significativa da L1 exige o abandono das premissas de confiança fora do protocolo e das restrições de execução em série. A Glamsterdam aborda isso ao consagrar a separação de certas tarefas de construção de blocos e introduzir novas estruturas de dados que permitem que a rede se prepare para o processamento paralelo.

### Proposta principal: Separação entre proponente e construtor consagrada (ePBS) {#epbs}

- Remove premissas de confiança fora do protocolo e a dependência de relays de terceiros
- Suporta a escalabilidade da L1 ao permitir cargas úteis muito maiores por meio de janelas de propagação estendidas
- Introduz pagamentos de construtor sem confiança diretamente no protocolo

Atualmente, o processo de propor e construir blocos inclui uma passagem de responsabilidades entre proponentes de bloco e construtores de bloco. A relação entre proponentes e construtores não faz parte do protocolo central do Ethereum, então depende de middleware de terceiros confiáveis, software (relays) e confiança fora do protocolo entre as entidades.

A relação fora do protocolo entre proponentes e construtores também cria um "caminho crítico" durante a validação de blocos que força os [validadores](/glossary/#validator) a acelerar a transmissão e execução de transações em uma janela apertada de 2 segundos, limitando a quantidade de dados que a rede pode lidar.

**Separação entre proponente e construtor consagrada (ePBS, ou EIP-7732)** separa formalmente o trabalho do proponente (que seleciona o bloco de consenso) do construtor (que monta a carga de execução), consagrando essa passagem de responsabilidades diretamente no protocolo.

Integrar a troca sem confiança de uma carga útil de bloco por pagamento diretamente no protocolo remove a necessidade de middleware de terceiros (como o MEV-Boost). No entanto, construtores e proponentes ainda podem optar por usar relays ou middleware fora do protocolo para recursos complexos que ainda não fazem parte do protocolo central.

Para resolver o gargalo do "caminho crítico", o ePBS também introduz o Comitê de Pontualidade de Carga Útil (PTC) e uma lógica de prazo duplo, permitindo que os validadores atestem separadamente a pontualidade do bloco de consenso e da carga útil de execução para maximizar o rendimento.

<YouTube id="u8XvkTrjITs" />

A separação das funções de proponente e construtor no nível do protocolo expande a janela de propagação (ou o tempo disponível para espalhar dados pela rede) de 2 segundos para cerca de 9 segundos.

Ao substituir middleware e relays fora do protocolo por mecanismos dentro do protocolo, o ePBS reduz as dependências de confiança e permite que o Ethereum processe com segurança quantidades muito maiores de dados (como mais blobs para [camadas 2](/glossary/#layer-2)) sem sobrecarregar a rede.

**Recursos**: [Especificação técnica da EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Proposta principal: Listas de acesso em nível de bloco (BALs) {#bals}

- Elimina gargalos de processamento sequencial ao fornecer um mapa antecipado de todas as dependências de transação, preparando o terreno para que os validadores processem muitas transações em paralelo em vez de uma por uma
- Permite que os nós atualizem seus registros lendo os resultados finais sem a necessidade de reproduzir cada transação (sincronização sem execução), tornando muito mais rápido sincronizar um nó com a rede
- Elimina a adivinhação, permitindo que os validadores pré-carreguem todos os dados necessários de uma só vez, em vez de descobri-los passo a passo, o que torna a validação muito mais rápida

O Ethereum de hoje é como uma estrada de mão única; como a rede não sabe quais dados uma transação precisará ou alterará (como quais contas uma transação tocará) até que a transação seja executada, os validadores devem processar as transações uma a uma, em uma linha sequencial e estrita. Se eles tentassem processar as transações todas de uma vez, sem conhecer essas dependências, duas transações poderiam acidentalmente tentar alterar os mesmos dados ao mesmo tempo, causando erros.

**Listas de acesso em nível de bloco (BALs, ou EIP-7928)** são como um mapa incluído em cada bloco, informando à rede quais partes do banco de dados serão acessadas antes do início do trabalho. As BALs exigem que cada bloco inclua o hash de cada alteração de conta que as transações tocarão, juntamente com os resultados finais dessas alterações (o registro de hash de todos os acessos ao estado e valores pós-execução).

Como elas dão visibilidade instantânea de quais transações não se sobrepõem, as BALs permitem que os nós realizem leituras de disco paralelas, buscando informações para muitas transações simultaneamente. A rede pode agrupar com segurança transações não relacionadas e processá-las em paralelo.

Como a BAL inclui os resultados finais das transações (os valores pós-execução), quando os nós da rede precisam sincronizar com o estado atual da rede, eles podem copiar esses resultados finais para atualizar seus registros. Os validadores não precisam mais reproduzir todas as transações complicadas do zero para saber o que aconteceu, tornando mais rápido e fácil para novos nós se juntarem à rede.

As leituras de disco paralelas habilitadas pelas BALs serão um passo significativo em direção a um futuro onde o Ethereum poderá processar muitas transações de uma só vez, aumentando significativamente a velocidade da rede.

#### eth/71 Troca de lista de acesso de blocos {#bale}

A Troca de Lista de Acesso de Blocos (eth/71 ou EIP-8159) é o companheiro direto de rede para as listas de acesso em nível de bloco. Enquanto as BALs desbloqueiam a execução paralela, o eth/71 atualiza o protocolo ponto a ponto para permitir que os nós realmente compartilhem essas listas pela rede. A implementação da troca da lista de acesso de blocos permitirá uma sincronização mais rápida e permitirá que os nós realizem atualizações de estado sem execução.

**Recursos**:

- [Especificação técnica da EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Especificação técnica da EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Sustentabilidade da rede {#network-sustainability}

À medida que a rede Ethereum cresce mais rápido, é importante garantir que o custo de usá-la corresponda ao desgaste do hardware que executa o Ethereum. A rede precisa aumentar seus limites de capacidade geral para escalar com segurança e processar mais transações.

### Aumento do custo de gas para criação de estado {#state-creation-gas-cost-increase}

- Garante que as taxas para criar novas contas ou contratos inteligentes reflitam com precisão o fardo a longo prazo que eles colocam no banco de dados do Ethereum
- Ajusta automaticamente essas taxas de criação de dados com base na capacidade geral da rede, visando uma taxa de crescimento segura e previsível para que o hardware físico padrão possa continuar executando a rede
- Separa a contabilidade dessas taxas específicas para um novo reservatório, removendo os limites de transação antigos e permitindo que os desenvolvedores implantem aplicativos maiores e mais complexos

Adicionar novas contas, tokens e [contratos inteligentes](/glossary/#smart-contract) cria dados permanentes (conhecidos como "estado") que todo computador que executa a rede deve armazenar indefinidamente. As taxas atuais para adicionar ou ler esses dados são inconsistentes e não refletem necessariamente o fardo real de armazenamento a longo prazo que eles impõem ao hardware da rede.

Algumas ações que criam estado no Ethereum, como criar novas contas ou implantar grandes contratos inteligentes, têm um custo relativamente baixo em comparação com o espaço de armazenamento permanente que ocupam nos nós da rede, por exemplo, a implantação de contrato é significativamente mais barata por byte do que a criação de espaços de armazenamento.

Sem ajuste, o estado do Ethereum poderia crescer quase 200 GiB por ano se a rede escalasse para um limite de gas de 100M, eventualmente superando o hardware comum.

**Aumento do custo de gas para criação de estado (ou EIP-8037)** harmoniza os custos vinculando-os ao tamanho real dos dados que estão sendo criados, atualizando as taxas para que sejam proporcionais à quantidade de dados permanentes que uma operação cria ou acessa.

A EIP-8037 também introduz um modelo de reservatório para gerenciar esses custos de forma mais previsível; as cobranças de gas do estado são retiradas primeiro do `state_gas_reservoir`, e o opcode `GAS` retorna apenas `gas_left`, impedindo que os quadros de execução calculem mal o gas disponível.

Antes da EIP-8037, tanto o trabalho computacional (o processamento ativo) quanto o armazenamento de dados permanentes (salvando o contrato inteligente no banco de dados da rede) compartilham o mesmo limite de gas. O modelo de reservatório divide a contabilidade: o limite de gas para o trabalho computacional real da transação (processamento) e para o armazenamento de dados a longo prazo (gas de estado). A separação dos dois ajuda a evitar que o tamanho dos dados de um aplicativo atinja o limite de gas; desde que os desenvolvedores forneçam fundos suficientes para encher o reservatório para armazenamento de dados, eles podem implantar contratos inteligentes muito maiores e mais complexos.

A precificação do armazenamento de dados de forma mais precisa e previsível ajudará o Ethereum a aumentar com segurança sua velocidade e capacidade sem sobrecarregar o banco de dados. Essa sustentabilidade permitirá que os operadores de nós continuem usando hardware (relativamente) acessível por muitos anos, mantendo o staking doméstico acessível para manter a descentralização da rede.

**Recursos**: [Especificação técnica da EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Atualização do custo de gas para acesso ao estado {#state-access-gas-cost-update}

- Aumenta os custos de gas para quando os aplicativos leem ou atualizam informações armazenadas permanentemente no Ethereum (opcodes de acesso ao estado) para corresponder com precisão ao trabalho de computação que esses comandos exigem
- Fortalece a resiliência da rede, prevenindo ataques de negação de serviço que exploram operações de leitura de dados artificialmente baratas

À medida que o estado do Ethereum cresceu, o ato de pesquisar e ler dados antigos ("acesso ao estado") tornou-se mais pesado e lento para os nós processarem. As taxas para essas ações permaneceram as mesmas, embora agora seja um pouco mais caro consultar informações (em termos de poder de computação).

Como resultado, alguns comandos específicos estão atualmente com preços abaixo do normal em relação ao trabalho que forçam um nó a fazer. `EXTCODESIZE` e `EXTCODECOPY` estão com preços abaixo do normal, por exemplo, porque exigem duas leituras de banco de dados separadas — uma para o objeto da conta e outra para o tamanho real do código ou bytecode.

**Atualização do custo de gas de acesso ao estado (ou EIP-8038)** aumenta as constantes de gas para opcodes de acesso ao estado, como consultar dados de conta e contrato, para alinhar com o desempenho do hardware moderno e o tamanho do estado.

Alinhar o custo do acesso ao estado também ajuda a tornar o Ethereum mais resiliente. Como essas ações pesadas de leitura de dados são artificialmente baratas, um invasor mal-intencionado poderia sobrecarregar a rede com milhares de solicitações de dados complexas em um único bloco antes de atingir o limite de taxa da rede, podendo causar a paralisação ou falha da rede (um ataque de negação de serviço). Mesmo sem intenção maliciosa, os desenvolvedores não são economicamente incentivados a criar aplicativos eficientes se a leitura de dados da rede for muito barata.

Ao precificar as ações de acesso ao estado com mais precisão, o Ethereum pode ser mais resiliente contra lentidões acidentais ou intencionais, enquanto o alinhamento dos custos da rede com a carga do hardware prova ser uma base mais sustentável para futuros aumentos do limite de gas.

**Recursos**: [Especificação técnica da EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Resiliência da rede

Refinamentos nas tarefas dos validadores e nos processos de saída garantem a estabilidade da rede durante eventos de slashing em massa e democratizam a liquidez. Essas melhorias tornam a rede mais estável e garantem que todos os participantes, grandes e pequenos, sejam tratados de forma justa.

### Excluir validadores que sofreram slashing da proposição {#exclude-slashed-validators}

- Impede que validadores penalizados (que sofreram slashing) sejam selecionados para propor blocos futuros, eliminando slots perdidos garantidos
- Mantém o Ethereum funcionando de forma suave e confiável, evitando paralisações severas no caso de um evento de slashing em massa

Atualmente, mesmo que um validador sofra slashing (penalizado por quebrar as regras ou não operar como esperado), o sistema ainda pode escolhê-lo para liderar um bloco no futuro próximo quando gera as previsões de proponentes futuros.

Como os blocos de proponentes que sofreram slashing são automaticamente rejeitados como inválidos, isso faz com que a rede perca slots e atrasa a recuperação da rede durante eventos de slashing em massa.

**Excluir validadores que sofreram slashing da proposição (ou EIP-8045)** simplesmente filtra os validadores que sofreram slashing para que não sejam selecionados para tarefas futuras. Isso melhora a resiliência da cadeia, garantindo que apenas validadores saudáveis sejam selecionados para propor blocos, mantendo a qualidade do serviço durante interrupções na rede.

**Recursos**: [Especificação técnica da EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Permitir que as saídas usem a fila de consolidação {#let-exits-use-the-consolidation-queue}

- Fecha uma brecha que permite que validadores com saldos altos saiam da rede mais rapidamente do que validadores menores por meio da fila de consolidação
- Permite que as saídas regulares transbordem para esta segunda fila quando houver capacidade ociosa, reduzindo os tempos de retirada de staking durante períodos de alto volume
- Mantém a segurança estrita para evitar alterar os limites de segurança centrais do Ethereum ou enfraquecer a rede

Desde que a [melhoria Pectra](/roadmap/pectra) aumentou o saldo efetivo máximo para validadores do Ethereum de 32 ETH para 2.048 ETH, uma brecha técnica permite que validadores com saldos altos saiam da rede mais rápido do que validadores menores por meio da fila de consolidação.

**Permitir que as saídas usem a fila de consolidação (ou EIP-8080)** democratiza a fila de consolidação para todas as saídas de staking, criando uma única fila justa para todos.

Para detalhar como isso funciona hoje:

- O limite de rotatividade do Ethereum é um limite de segurança na taxa em que os validadores podem entrar, sair ou fundir (consolidar) seus ETH em stake, para garantir que a segurança da rede nunca seja desestabilizada
- Como a consolidação de um validador é uma ação mais pesada, com mais partes móveis do que uma saída padrão de validador, ela consome uma porção maior deste orçamento de segurança (limite de rotatividade)
- Especificamente, o protocolo dita que o custo de segurança exato de uma saída padrão é de dois terços (2/3) do custo de uma consolidação

Filas de saída mais justas permitirão que as saídas padrão peguem emprestado espaço não utilizado da fila de consolidação durante períodos de alta demanda de saída, aplicando uma taxa de troca de "3 por 2" (para cada 2 vagas de consolidação não utilizadas, a rede pode processar com segurança 3 saídas padrão). Este fator de rotatividade de 3/2 equilibra a demanda entre as filas de consolidação e de saída.

Democratizar o acesso à fila de consolidação aumentará em até 2,5x a velocidade com que os usuários podem retirar seu stake durante períodos de alta demanda, sem comprometer a segurança da rede.

**Recursos**: [Especificação técnica da EIP-8080](https://eips.ethereum.org/EIPS/eip-8080)

## Melhorar a experiência do usuário e do desenvolvedor {#improve-user-developer-experience}

A melhoria Glamsterdam do Ethereum visa aprimorar a experiência do usuário, melhorar a descoberta de dados e lidar com o aumento do tamanho das mensagens para evitar falhas de sincronização. Isso torna mais fácil rastrear o que está acontecendo onchain, ao mesmo tempo que previne problemas técnicos à medida que a rede escala.

### Reduzir os custos intrínsecos de gas da transação {#reduce-intrinsic-transaction-gas-costs}

- Reduz a taxa base para transações, diminuindo o custo geral de um pagamento simples em ETH nativo
- Torna as transferências menores mais acessíveis, aumentando a viabilidade do Ethereum como um meio de troca rotineiro

Todas as transações do Ethereum hoje têm uma taxa de gas base fixa, independentemente de quão simples ou complexo seja o processamento. **Reduzir o gas intrínseco da transação (ou EIP-2780)** propõe a redução dessa taxa base para tornar uma transferência padrão de ETH entre contas existentes até **71% mais barata**.

A redução do gas intrínseco da transação funciona decompondo a taxa de transação para refletir apenas o trabalho básico e essencial que os computadores que executam a rede realmente fazem, como verificar uma assinatura digital e atualizar um saldo. Como um pagamento básico em ETH não executa código complexo nem carrega dados extras, esta proposta reduziria sua taxa para corresponder à sua pegada leve.

A proposta introduz uma exceção para a criação de contas totalmente novas para evitar que taxas mais baixas sobrecarreguem o estado da rede. Se uma transferência envia ETH para um endereço vazio e inexistente, a rede deve criar um novo registro permanente para ele. Uma sobretaxa de gas é adicionada para a criação dessa conta para ajudar a cobrir seu ônus de armazenamento a longo prazo.

Em conjunto, a EIP-2780 visa tornar as transferências diárias entre contas existentes mais acessíveis, garantindo ao mesmo tempo que a rede ainda esteja protegida contra o inchaço do banco de dados, precificando com precisão o verdadeiro crescimento do estado.

**Recursos**: [Especificação técnica da EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Pré-implantação de fábrica determinística {#deterministic-factory-predeploy}

- Dá aos desenvolvedores uma maneira nativa de implantar aplicativos e carteiras de contrato inteligente no mesmo endereço exato em várias cadeias
- Permite que os usuários tenham o mesmo endereço de carteira inteligente em várias redes de camada 2 (L2), reduzindo a carga cognitiva, a confusão e o risco de perda acidental de fundos
- Substitui as soluções alternativas que os desenvolvedores usam atualmente para alcançar essa paridade, tornando mais fácil e seguro criar carteiras e aplicativos multicadeia

Se um usuário tiver hoje uma carteira de contrato inteligente com contas em várias cadeias compatíveis com a Máquina Virtual Ethereum (EVM), ele geralmente acaba com um endereço completamente diferente em redes diferentes. Isso não é apenas confuso, mas pode levar à perda acidental de fundos.

**Pré-implantação de fábrica determinística (ou EIP-7997)** oferece aos desenvolvedores uma maneira nativa e integrada de implantar seus aplicativos descentralizados e carteiras de contrato inteligente no mesmo endereço exato em várias cadeias EVM, incluindo a Rede Principal do Ethereum, redes de camada 2 (L2) e mais. Se adotado, permitiria que o usuário tivesse exatamente o mesmo endereço em todas as cadeias participantes, reduzindo significativamente a carga cognitiva e o potencial de erro do usuário.

A pré-implantação de fábrica determinística funciona colocando permanentemente um programa de fábrica mínimo e especializado em um local idêntico (especificamente, endereço 0x12) em cada cadeia compatível com EVM participante. Seu objetivo é fornecer um contrato de fábrica universal e padrão que possa ser adotado por qualquer rede compatível com EVM; contanto que uma cadeia EVM participe e adote esse padrão, os desenvolvedores poderão usá-lo para implantar seus contratos inteligentes no mesmo endereço exato nessa rede.

Essa padronização simplifica a criação e o gerenciamento de aplicativos entre cadeias para os desenvolvedores e o ecossistema mais amplo. Os desenvolvedores não precisam mais criar código personalizado e específico da cadeia para vincular seu software em diferentes redes, em vez disso, usam essa fábrica universal para gerar o mesmo endereço exato para seu aplicativo em todos os lugares. Além disso, exploradores de blocos, serviços de rastreamento e carteiras podem identificar e vincular mais facilmente esses aplicativos e contas em várias cadeias, criando um ambiente multicadeia mais unificado e contínuo para todos os participantes baseados em Ethereum.

**Recursos**: [Especificação técnica da EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### Transferências e queimas de ETH emitem um log {#eth-transfers-and-burns-emit-a-log}

- Gera automaticamente um registro permanente (log) toda vez que ETH é transferido ou queimado
- Corrige um ponto cego histórico que permite que aplicativos, corretoras e pontes detectem depósitos de usuários de forma confiável sem ferramentas de rastreamento ad-hoc

Ao contrário dos tokens (ERC-20s), as transferências regulares de ETH entre contratos inteligentes não emitem um recibo claro (log padrão), o que as torna difíceis de rastrear para corretoras e aplicativos.

A emissão de um log para transferências e queimas de ETH (ou EIP-7708) torna obrigatório que a rede emita um evento de log padrão sempre que uma quantidade diferente de zero de ETH for movida ou queimada.

Isso tornará muito mais fácil e confiável para carteiras, corretoras e operadores de ponte rastrear depósitos e movimentações com precisão sem ferramentas personalizadas.

**Recursos**: [Especificação técnica da EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### eth/70 listas parciais de recibos de blocos {#eth-70-partial-block-receipt-lists}

À medida que aumentamos a quantidade de trabalho que o Ethereum pode fazer, as listas de recibos para essas ações (os registros de dados dessas transações) estão ficando tão grandes que poderiam potencialmente causar a falha dos nós da rede ao tentar sincronizar dados entre si.

As listas parciais de recibos de blocos eth/70 (ou EIP-7975) introduzem uma nova maneira de os nós se comunicarem (eth/70) que permite que essas grandes listas sejam divididas em partes menores e mais gerenciáveis. O eth/70 introduz um sistema de paginação para o protocolo de comunicação da rede que permite aos nós dividir as listas de recibos de blocos e solicitar os dados com segurança em partes menores e mais gerenciáveis.

Essa mudança evitaria falhas de sincronização da rede durante períodos de atividade intensa. Em última análise, isso abre caminho para que o Ethereum aumente sua capacidade de bloco e processe mais transações por bloco no futuro, sem sobrecarregar o hardware físico que sincroniza a cadeia.

**Recursos**: [Especificação técnica da EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Leitura adicional {#further-reading}

- [Roteiro do Ethereum](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Meta EIP da Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Anúncio no blog da Atualização de Prioridades do Protocolo para 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podcast The Daily Gwei Refuel - Ethereum pós-quântico, a Glamsterdam está chegando](https://www.youtube.com/watch?v=qx9sd50uQjQ)

## FAQ {#faq}

### Como o ETH pode ser convertido após o hard fork Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **Nenhuma ação necessária para seu ETH**: Não há necessidade de converter ou atualizar seu ETH após a melhoria Glamsterdam. Seu saldo de conta irá permanecer o mesmo e o ETH que você tem atualmente continuará acessível na sua forma existente depois do hard fork.
- **Cuidado com os golpes!** <Emoji text="⚠️" /> **qualquer pessoa que o instrua a "atualizar" seu ETH está tentando enganá-lo.** Não há nada que você precise fazer em relação a esta melhoria. Seus ativos não serão afetados de forma nenhuma. Lembre-se: estar informado é a melhor defesa contra golpes.

[Mais sobre como reconhecer e evitar golpes](/security/)

### A melhoria Glamsterdam afeta todos os nós e validadores do Ethereum? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Sim, a melhoria Glamsterdam requer atualizações tanto para [clientes de execução quanto para clientes de consenso](/developers/docs/nodes-and-clients/). Como esta melhoria introduz a Separação Consagrada de Proponente-Construtor (ePBS), os operadores de nós precisarão garantir que seus clientes sejam atualizados para lidar com as novas formas como os blocos são construídos, validados e atestados pela rede.

Todos os principais clientes Ethereum lançarão versões compatíveis com o hard fork marcadas como alta prioridade. Você pode acompanhar quando esses lançamentos estarão disponíveis nos repositórios do GitHub do cliente, em seus [canais do Discord](https://ethstaker.org/support), no [EthStaker Discord](https://dsc.gg/ethstaker) ou assinando o blog do Ethereum para atualizações do protocolo.

Para manter a sincronização com a rede Ethereum após a atualização, os operadores de nó precisam assegurar que eles estão executando uma versão habilitada do cliente. Observe que as informações sobre os lançamentos de clientes são perenes, e os usuários deveriam usar como referência as últimas melhorias para ter os detalhes mais atuais.

### Como staker, o que preciso fazer para a melhoria Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Como em toda melhoria da rede, certifique-se de atualizar seus clientes para as versões mais recentes marcadas com suporte à Glamsterdam. Acompanhe as atualizações na lista de e-mails e os [Anúncios de Protocolo no Blog da EF](https://blog.ethereum.org/category/protocol) para se informar sobre os lançamentos.

Para validar sua configuração antes que a Glamsterdam seja ativada na Rede Principal, você pode executar um validador em redes de teste. As bifurcações da rede de testes também são anunciadas na lista de e-mails e no blog.

### Que melhorias a Glamsterdam incluirá para a escalabilidade da L1? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

A principal característica é o ePBS (EIP-7732), que separa a tarefa pesada de validar as transações da rede da tarefa de alcançar o consenso. Isso expande a janela de propagação de dados de 2 segundos para aproximadamente 9 segundos, desbloqueando a capacidade do Ethereum de lidar com segurança com um rendimento de transações muito maior e acomodar mais blobs de dados para redes de camada 2.

### A Glamsterdam reduzirá as taxas no Ethereum (camada 1)? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Sim, a Glamsterdam provavelmente reduzirá as taxas para os usuários comuns! Reduzir o gas intrínseco da transação (ou EIP-2780) reduz a taxa base para enviar ETH, tornando o ETH muito mais barato para usar em pagamentos diários.

Além disso, para sustentabilidade a longo prazo, Glamsterdam introduz as Listas de Acesso em Nível de Bloco (BALs). Isso permite o processamento paralelo e prepara a L1 para lidar com segurança com limites gerais de gas mais altos no futuro, o que provavelmente reduzirá os custos de gas por transação à medida que a capacidade cresce.

### Haverá alguma alteração nos meus contratos inteligentes existentes após a Glamsterdam? {#will-my-smart-contracts-change}

Os contratos existentes continuarão a funcionar normalmente após a Glamsterdam. Os desenvolvedores provavelmente receberão várias novas ferramentas e devem rever seu uso de gas:

- Aumentar o tamanho máximo do contrato (ou EIP-7954) permite que os desenvolvedores implantem aplicativos maiores, aumentando o limite máximo de tamanho do contrato de aproximadamente 24KiB para 32KiB.
- A pré-implantação de fábrica determinística (ou EIP-7997) introduz um contrato de fábrica universal e integrado. Permite que os desenvolvedores implantem seus aplicativos e carteiras de contrato inteligente no mesmo endereço exato em todas as cadeias EVM participantes.
- Se seu aplicativo depende de rastreamento complexo para encontrar transferências de ETH, a emissão de um log para transferências e queimas de ETH (ou EIP-7708) permitirá que você mude para o uso de logs para uma contabilidade mais simples e confiável.
- O aumento do custo de gas para criação de estado (ou EIP-8037) e a atualização do custo de gas para acesso ao estado (ou EIP-8038) introduzem novos modelos de sustentabilidade que alterarão certos custos de implantação de contrato, pois a criação de novas contas ou armazenamento permanente terá uma taxa de ajuste dinâmico.

### Como a Glamsterdam afetará o armazenamento de nós e os requisitos de hardware? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Várias EIPs em consideração para a Glamsterdam abordam o abismo de desempenho do crescimento do estado:

- O aumento do custo de gas para criação de estado (ou EIP-8037) introduz um modelo de precificação dinâmico para atingir uma taxa de crescimento do banco de dados de estado de 100 GiB/ano, garantindo que o hardware físico padrão possa continuar executando a rede eficientemente.
- As listas parciais de recibos de blocos eth/70 (ou EIP-7975) permitem que os nós solicitem recibos de blocos paginados, o que divide as listas de recibos de blocos com muitos dados em partes menores para evitar falhas e sincronizações à medida que o Ethereum escala.
