---
title: "Fusaka 🦓"
metaTitle: Fulu-Osaka (Fusaka)
description: Aprenda sobre a atualização do protocolo Fusaka
lang: pt-br
authors: ["Nixo", "Mario Havel"]
---

**A tão aguardada atualização Fusaka da Ethereum foi lançada em 3 de dezembro de 2025**

A atualização da rede Fusaka segue a [Pectra](/roadmap/pectra/) e traz mais novos recursos e melhora a experiência para cada usuário e desenvolvedor da [Ethereum](/). O nome consiste na atualização da camada de execução Osaka e na versão da camada de consenso nomeada em homenagem à estrela Fulu. Ambas as partes da Ethereum recebem uma atualização que impulsiona a escalabilidade, a segurança e a experiência do usuário da Ethereum para o futuro.

<Alert variant="update">
<AlertContent>
<AlertDescription>
A atualização Fusaka é apenas um único passo nos objetivos de desenvolvimento de longo prazo da Ethereum. Saiba mais sobre [o roteiro do protocolo](/roadmap/) e [atualizações anteriores](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

<VideoWatch slug="fusaka-upgrade-explained" />

## Melhorias na Fusaka {#improvements-in-fusaka}

### Escalar blobs {#scale-blobs}

#### PeerDAS {#peerdas}

Esta é a _atração principal_ da bifurcação Fusaka, o principal recurso adicionado nesta atualização. As camadas 2 (l2) atualmente publicam seus dados na Ethereum em blobs, o tipo de dados efêmero criado especificamente para as camadas 2 (l2). Antes da Fusaka, cada nó completo tinha que armazenar cada blob para garantir que os dados existissem. À medida que a vazão de blobs aumenta, ter que baixar todos esses dados torna-se insustentavelmente intensivo em recursos.

Com a [amostragem de disponibilidade de dados (DAS)](https://notes.ethereum.org/@fradamt/das-fork-choice), em vez de ter que armazenar todos os dados do blob, cada nó será responsável por um subconjunto dos dados do blob. Os blobs são distribuídos de forma uniformemente aleatória entre os nós na rede, com cada nó completo mantendo apenas 1/8 dos dados, permitindo, portanto, uma escala teórica de até 8x. Para garantir a disponibilidade dos dados, qualquer parte dos dados pode ser reconstruída a partir de qualquer 50% existente do todo com métodos que reduzem a probabilidade de dados incorretos ou ausentes a um nível criptograficamente insignificante (~um em 10<sup>20</sup> a um em 10<sup>24</sup>).

Isso mantém os requisitos de hardware e largura de banda para os nós sustentáveis, ao mesmo tempo em que permite a escalabilidade de blobs, resultando em mais escala com taxas menores para as camadas 2 (l2).

[Saiba mais sobre o PeerDAS](/roadmap/fusaka/peerdas/)

**Recursos**:

- [Especificação técnica da EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion sobre o PeerDAS: Escalando a Ethereum Hoje | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Acadêmico: Uma Documentação do PeerDAS da Ethereum (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Bifurcações apenas de parâmetros de blob {#blob-parameter-only-forks}

As camadas 2 (l2) escalam a Ethereum - à medida que suas redes crescem, elas precisam publicar mais dados na Ethereum. Isso significa que a Ethereum precisará aumentar o número de blobs disponíveis para elas com o passar do tempo. Embora o PeerDAS permita escalar os dados de blob, isso precisa ser feito de forma gradual e segura.

Como a Ethereum é um código executado em milhares de nós independentes que exigem acordo sobre as mesmas regras, não podemos simplesmente introduzir mudanças como aumentar a contagem de blobs da mesma forma que você implanta uma atualização de site. Qualquer mudança de regra deve ser uma atualização coordenada onde cada nó, cliente e software validador é atualizado antes do mesmo bloco predeterminado.

Essas atualizações coordenadas geralmente incluem muitas mudanças, exigem muitos testes e isso leva tempo. Para se adaptar mais rapidamente às mudanças nas necessidades de blobs da camada 2 (l2), as bifurcações apenas de parâmetros de blob introduzem um mecanismo para aumentar os blobs sem ter que esperar por esse cronograma de atualização.

As bifurcações apenas de parâmetros de blob podem ser definidas pelos clientes, de forma semelhante a outras configurações como o limite de gas. Entre as principais atualizações da Ethereum, os clientes podem concordar em aumentar os blobs `target` e `max` para, por exemplo, 9 e 12 e, em seguida, os operadores de nós atualizarão para participar dessa pequena bifurcação. Essas bifurcações apenas de parâmetros de blob podem ser configuradas a qualquer momento.

Quando os blobs foram adicionados pela primeira vez à rede na atualização Dencun, a meta era 3. Isso foi aumentado para 6 na Pectra e, após a Fusaka, isso agora pode ser aumentado a uma taxa sustentável independentemente dessas grandes atualizações da rede.

![Chart showing average blob count per block and increasing targets with upgrades](./average-blob-count-per-block.webp)

Fonte do gráfico: [Ethereum Blobs - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Recursos**: [Especificação técnica da EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Taxa básica de blob limitada pelos custos de execução {#blob-base-fee-bounded-by-execution-costs}

As camadas 2 (l2) pagam duas contas quando publicam dados: a taxa de blob e o gás de execução necessário para verificar esses blobs. Se o gás de execução dominar, o leilão da taxa de blob pode cair para 1 Wei e deixar de ser um sinal de preço.

A EIP-7918 fixa um preço de reserva proporcional sob cada blob. Quando a reserva é maior que a taxa básica nominal do blob, o algoritmo de ajuste de taxa trata o bloco como acima da meta e para de empurrar a taxa para baixo, permitindo que ela aumente normalmente. Como resultado:

- o mercado de taxa de blob sempre reage ao congestionamento
- as camadas 2 (l2) pagam pelo menos uma fatia significativa da computação que forçam nos nós
- picos de taxa básica na camada de execução (EL) não podem mais prender a taxa de blob em 1 Wei

**Recursos**:

- [Especificação técnica da EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Explicação no Storybook](https://notes.ethereum.org/@anderselowsson/AIG)

### Escalar a camada 1 (l1) {#scale-l1}

#### Expiração de histórico e recibos mais simples {#history-expiry}

Em julho de 2025, os clientes de execução da Ethereum [começaram a suportar a expiração de histórico parcial](https://blog.ethereum.org/2025/07/08/partial-history-exp). Isso descartou o histórico mais antigo que [The Merge](https://ethereum.org/roadmap/merge/) a fim de reduzir o espaço em disco exigido pelos operadores de nós à medida que a Ethereum continua a crescer.

Esta EIP está em uma seção separada das "EIPs Principais" porque a bifurcação não implementa nenhuma mudança de fato - é um aviso de que as equipes de clientes devem suportar a expiração de histórico até a atualização Fusaka. Na prática, os clientes podem implementar isso a qualquer momento, mas adicioná-lo à atualização o colocou concretamente em sua lista de tarefas e permitiu que testassem as mudanças da Fusaka em conjunto com esse recurso.

**Recursos**: [Especificação técnica da EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Definir limites superiores para MODEXP {#set-upper-bounds-for-modexp}

Até agora, o pré-compilado MODEXP aceitava números de praticamente qualquer tamanho. Isso tornava difícil de testar, fácil de abusar e arriscado para a estabilidade do cliente. A EIP-7823 estabelece um limite claro: cada número de entrada pode ter no máximo 8192 bits (1024 bytes) de comprimento. Qualquer coisa maior é rejeitada, o gás da transação é queimado e nenhuma mudança de estado ocorre. Isso cobre de forma muito confortável as necessidades do mundo real, ao mesmo tempo em que remove os casos extremos que complicavam o planejamento do limite de gas e as revisões de segurança. Essa mudança fornece mais segurança e proteção contra DoS sem afetar a experiência do usuário ou do desenvolvedor.

**Recursos**: [Especificação técnica da EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Limite máximo de gas por transação {#transaction-gas-limit-cap}

A EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) adiciona um limite máximo de 16.777.216 (2^24) de gás por transação. É um fortalecimento proativo contra DoS ao limitar o custo do pior caso de qualquer transação única à medida que aumentamos o limite de gas do bloco. Isso torna a validação e a propagação mais fáceis de modelar para nos permitir lidar com a escalabilidade por meio do aumento do limite de gas.

Por que exatamente 2^24 de gás? É confortavelmente menor do que o limite de gas atual, é grande o suficiente para implantações reais de contratos e pré-compilados pesados, e uma potência de 2 facilita a implementação em todos os clientes. Esse novo tamanho máximo de transação é semelhante ao tamanho médio do bloco pré-Pectra, tornando-o um limite razoável para qualquer operação na Ethereum.

**Recursos**: [Especificação técnica da EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Aumento do custo de gás de `MODEXP` {#modexp-gas-cost-increase}

MODEXP é uma função embutida de pré-compilado que calcula a exponenciação modular, um tipo de matemática de grandes números usada na verificação de assinatura RSA e sistemas de prova. Ele permite que os contratos executem esses cálculos diretamente sem ter que implementá-los por conta própria.

Desenvolvedores e equipes de clientes identificaram o MODEXP como um grande obstáculo para aumentar o limite de gas do bloco porque a precificação atual do gás frequentemente subestima quanto poder de computação certas entradas exigem. Isso significa que uma transação usando MODEXP poderia ocupar a maior parte do tempo necessário para processar um bloco inteiro, desacelerando a rede.

Esta EIP altera a precificação para corresponder aos custos computacionais reais ao:

- aumentar a cobrança mínima de 200 para 500 de gás e remover o desconto de um terço da EIP-2565 no cálculo de custo geral
- aumentar o custo de forma mais acentuada quando a entrada do expoente é muito longa. Se o expoente (o número da "potência" que você passa como o segundo argumento) for maior que 32 bytes / 256 bits, a cobrança de gás sobe muito mais rápido para cada byte extra
- cobrar um extra por base ou módulo grandes também. Presume-se que os outros dois números (a base e o módulo) tenham pelo menos 32 bytes - se qualquer um deles for maior, o custo aumenta proporcionalmente ao seu tamanho

Ao adequar melhor os custos ao tempo de processamento real, o MODEXP não pode mais fazer com que um bloco demore muito para ser validado. Essa mudança é uma das várias destinadas a tornar seguro o aumento do limite de gas do bloco da Ethereum no futuro.

**Recursos**: [Especificação técnica da EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### Limite de tamanho do bloco de execução RLP {#rlp-execution-block-size-limit}

Isso cria um teto sobre o quão grande um bloco pode ser - este é um limite sobre o que é _enviado_ pela rede e é separado do limite de gas, que limita o _trabalho_ dentro de um bloco. O limite de tamanho do bloco é de 10 MiB, com uma pequena permissão (2 MiB) reservada para dados de consenso para que tudo se encaixe e se propague de forma limpa. Se um bloco aparecer maior do que isso, os clientes o rejeitam.
Isso é necessário porque blocos muito grandes levam mais tempo para se espalhar e serem verificados pela rede e podem criar problemas de consenso ou serem abusados como um vetor de DoS. Além disso, a fofoca (gossip) da camada de consenso já não encaminhará blocos com mais de ~10 MiB, então alinhar a camada de execução a esse limite evita situações estranhas de "visto por alguns, descartado por outros".

Os detalhes práticos: este é um limite no tamanho do bloco de execução codificado em [RLP](/developers/docs/data-structures-and-encoding/rlp/). 10 MiB no total, com uma margem de segurança de 2 MiB reservada para o enquadramento do bloco beacon. Na prática, os clientes definem

`MAX_BLOCK_SIZE = 10,485,760` bytes e

`SAFETY_MARGIN = 2,097,152` bytes,

e rejeitam qualquer bloco de execução cuja carga útil RLP exceda

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

O objetivo é limitar o tempo de propagação/validação do pior caso e alinhar com o comportamento de fofoca (gossip) da camada de consenso, reduzindo o risco de reorg/DoS sem alterar a contabilidade de gás.

**Recursos**: [Especificação técnica da EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Definir o limite de gas padrão para 60 milhões {#set-default-gas-limit-to-60-million}

Antes de aumentar o limite de gas de 30M para 36M em fevereiro de 2025 (e subsequentemente para 45M), esse valor não havia mudado desde The Merge (setembro de 2022). Esta EIP visa tornar a escalabilidade consistente uma prioridade.

A EIP-7935 coordena as equipes de clientes da camada de execução (EL) para aumentar o limite de gas padrão acima dos 45M atuais para a Fusaka. É uma EIP Informativa, mas pede explicitamente aos clientes que testem limites mais altos em devnets, convirjam para um valor seguro e enviem esse número em seus lançamentos da Fusaka.

O planejamento da devnet visa um estresse de ~60M (blocos completos com carga sintética) e aumentos iterativos; a pesquisa diz que as patologias de tamanho de bloco de pior caso não devem se vincular abaixo de ~150M. O lançamento deve ser emparelhado com o limite máximo de gas por transação (EIP-7825) para que nenhuma transação única possa dominar à medida que os limites aumentam.

**Recursos**: [Especificação técnica da EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### Melhorar a UX {#improve-ux}

#### Previsão determinística de proponente {#deterministic-proposer-lookahead}

Com a EIP-7917, a Beacon Chain ficará ciente dos próximos proponentes de bloco para a próxima época. Ter uma visão determinística sobre quais validadores estarão propondo blocos futuros pode permitir [pré-confirmações](https://ethresear.ch/t/based-preconfirmations/17353) - um compromisso com o próximo proponente que garante que a transação do usuário será incluída em seu bloco sem esperar pelo bloco real.

Esse recurso beneficia as implementações de clientes e a segurança da rede, pois evita casos extremos em que os validadores poderiam manipular o cronograma do proponente. A previsão também permite menos complexidade na implementação.

**Recursos**: [Especificação técnica da EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Código de operação de contagem de zeros à esquerda (CLZ) {#count-leading-zeros-opcode}

Este recurso adiciona uma pequena instrução EVM, **contagem de zeros à esquerda (CLZ)**. Quase tudo na EVM é representado como um valor de 256 bits — este novo código de operação retorna quantos bits zero estão na frente. Este é um recurso comum em muitas arquiteturas de conjunto de instruções, pois permite operações aritméticas mais eficientes. Na prática, isso reduz as varreduras de bits feitas manualmente hoje em uma única etapa, de modo que encontrar o primeiro bit definido, varrer bytes ou analisar campos de bits se torna mais simples e barato. O código de operação tem um custo fixo e baixo e foi avaliado para estar no mesmo nível de uma adição básica, o que reduz o bytecode e economiza gás para o mesmo trabalho.

**Recursos**: [Especificação técnica da EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Pré-compilado para suporte à curva secp256r1 {#secp256r1-precompile}

Introduz um verificador de assinatura secp256r1 (P-256) embutido, no estilo chave de acesso, no endereço fixo `0x100` usando o mesmo formato de chamada já adotado por muitas camadas 2 (l2) e corrigindo casos extremos, para que os contratos escritos para esses ambientes funcionem na camada 1 (l1) sem alterações.

Atualização de UX! Para os usuários, isso desbloqueia a assinatura nativa do dispositivo e chaves de acesso. As carteiras podem acessar o Apple Secure Enclave, o Android Keystore, módulos de segurança de hardware (HSMs) e FIDO2/WebAuthn diretamente - sem frase semente, integração mais suave e fluxos multifatoriais que parecem aplicativos modernos. Isso resulta em melhor UX, recuperação mais fácil e padrões de abstração de conta que correspondem ao que bilhões de dispositivos já fazem.

Para os desenvolvedores, ele recebe uma entrada de 160 bytes e retorna uma saída de 32 bytes, facilitando a portabilidade de bibliotecas existentes e contratos de camada 2 (l2). Internamente, ele inclui verificações de ponto no infinito e comparação modular para eliminar casos extremos complicados sem quebrar chamadores válidos.

**Recursos**:

- [Especificação técnica da EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [Mais sobre a RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Observe que a EIP-7951 substituiu a RIP-7212)_

### Meta {#meta}

#### Método JSON-RPC `eth_config` {#eth-config}

Esta é uma chamada JSON-RPC que permite que você pergunte ao seu nó quais configurações de bifurcação você está executando. Ela retorna três instantâneos: `current`, `next` e `last` para que validadores e ferramentas de monitoramento possam verificar se os clientes estão alinhados para uma próxima bifurcação.

Em termos práticos, isso serve para resolver uma deficiência descoberta quando a bifurcação Pectra foi lançada na rede de teste Holesky no início de 2025 com pequenas configurações incorretas que resultaram em um estado de não finalização. Isso ajuda as equipes de teste e os desenvolvedores a garantir que as principais bifurcações se comportarão conforme o esperado ao passar de devnets para redes de teste e de redes de teste para a Mainnet.

Os instantâneos incluem: `chainId`, `forkId`, tempo planejado de ativação da bifurcação, quais pré-compilados estão ativos, endereços de pré-compilados, dependências de contratos do sistema e o cronograma de blobs da bifurcação.

Esta EIP está em uma seção separada das "EIPs Principais" porque a bifurcação não implementa nenhuma mudança de fato - é um aviso de que as equipes de clientes devem implementar este método JSON-RPC até a atualização Fusaka.

**Recursos**: [Especificação técnica da EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## Perguntas Frequentes (FAQ) {#faq}

### Esta atualização afeta todos os nós e validadores da Ethereum? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Sim, a atualização Fusaka exige atualizações tanto para [clientes de execução quanto para clientes de consenso](/developers/docs/nodes-and-clients/). Todos os principais clientes da Ethereum lançarão versões com suporte à bifurcação rígida marcadas como de alta prioridade. Você pode acompanhar quando esses lançamentos estarão disponíveis nos repositórios do GitHub dos clientes, em seus [canais do Discord](https://ethstaker.org/support), no [Discord do EthStaker](https://dsc.gg/ethstaker) ou assinando o blog da Ethereum para atualizações do protocolo. Para manter a sincronização com a rede Ethereum após a atualização, os operadores de nós devem garantir que estão executando uma versão de cliente suportada. Observe que as informações sobre os lançamentos de clientes são sensíveis ao tempo e os usuários devem consultar as atualizações mais recentes para obter os detalhes mais atuais.

### Como o ETH pode ser convertido após a bifurcação rígida? {#how-can-eth-be-converted-after-the-hardfork}

- **Nenhuma ação é necessária para o seu ETH**: Após a atualização Fusaka da Ethereum, não há necessidade de converter ou atualizar o seu ETH. Os saldos da sua conta permanecerão os mesmos e o ETH que você possui atualmente permanecerá acessível em sua forma existente após a bifurcação rígida.
- **Cuidado com golpes!** <Emoji text="⚠️" /> **qualquer pessoa instruindo você a "atualizar" o seu ETH está tentando aplicar um golpe em você.** Não há nada que você precise fazer em relação a esta atualização. Seus ativos permanecerão completamente inalterados. Lembre-se, manter-se informado é a melhor defesa contra golpes.

[Mais sobre como reconhecer e evitar golpes](/security/)

### Qual é a das zebras? <Emoji text="🦓" /> {#whats-with-the-zebras}

Uma zebra é o "mascote" escolhido pelos desenvolvedores para a Fusaka porque suas listras refletem a amostragem de disponibilidade de dados (DAS) baseada em colunas do PeerDAS, onde os nós custodiam certas sub-redes de colunas e amostram algumas outras colunas de cada slot de pares para verificar se os dados do blob estão disponíveis.

The Merge em 2022 [usou um panda](https://x.com/hwwonx/status/1431970802040127498) como seu mascote para sinalizar a união das camadas de execução e consenso. Desde então, mascotes têm sido escolhidos informalmente para cada bifurcação e aparecem como arte ASCII nos logs do cliente no momento da atualização. É apenas uma maneira divertida de comemorar.

### Quais melhorias estão incluídas para a escalabilidade da camada 2 (l2)? {#what-improvements-are-included-for-l2-scaling}

O [PeerDAS](/roadmap/fusaka/peerdas) é o principal recurso da bifurcação. Ele implementa a amostragem de disponibilidade de dados (DAS) que desbloqueia mais escalabilidade para rollups, escalando teoricamente o espaço de blob em até 8 vezes o tamanho atual. O mercado de taxa de blob também será melhorado para reagir eficientemente ao congestionamento e garantir que as camadas 2 (l2) paguem uma taxa significativa pela computação e espaço que os blobs impõem aos nós.

### Como as bifurcações BPO são diferentes? {#how-are-bpo-forks-different}

As bifurcações apenas de parâmetros de blob (BPO) fornecem um mecanismo para aumentar continuamente a contagem de blobs (tanto a meta quanto o máximo) após a ativação do PeerDAS, sem ter que esperar por uma atualização coordenada completa. Cada aumento é codificado para ser pré-configurado em lançamentos de clientes que suportam a Fusaka.

Como usuário ou validador, você não precisa atualizar seus clientes para cada BPO e apenas certificar-se de seguir as principais bifurcações rígidas como a Fusaka. Esta é a mesma prática de antes, nenhuma ação especial é necessária. Ainda é recomendado monitorar seus clientes em torno de atualizações e BPOs e mantê-los atualizados mesmo entre os principais lançamentos, pois correções ou otimizações podem seguir a bifurcação rígida.

### Qual é o cronograma de BPO? {#what-is-the-bpo-schedule}

O cronograma exato das atualizações de BPO será determinado com os lançamentos da Fusaka. Siga os [Anúncios do protocolo](https://blog.ethereum.org/category/protocol) e as notas de lançamento de seus clientes.

Exemplo de como pode ser:

- Antes da Fusaka: meta 6, máximo 9
- Na ativação da Fusaka: meta 6, máximo 9
- BPO1, algumas semanas após a ativação da Fusaka: meta 10, máximo 15, aumentando em dois terços
- BPO2, algumas semanas após o BPO1: meta 14, máximo 21

### Isso reduzirá as taxas na Ethereum (camada 1 (l1)) {#will-this-lower-gas}

Esta atualização não reduz as taxas de gás na camada 1 (l1), pelo menos não diretamente. O foco principal é mais espaço de blob para dados de rollup, reduzindo assim as taxas na camada 2 (l2). Isso pode ter alguns efeitos colaterais no mercado de taxas da camada 1 (l1), mas nenhuma mudança significativa é esperada.

### Como um staker, o que preciso fazer para a atualização? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Como em todas as atualizações de rede, certifique-se de atualizar seus clientes para as versões mais recentes marcadas com suporte à Fusaka. Acompanhe as atualizações na lista de e-mails e nos [Anúncios do Protocolo no Blog da EF](https://blog.ethereum.org/category/protocol) para se informar sobre os lançamentos.
Para validar sua configuração antes que a Fusaka seja ativada na Mainnet, você pode executar um validador em redes de teste. A Fusaka é [ativada mais cedo em redes de teste](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement), dando a você mais espaço para garantir que tudo funcione e relatar bugs. As bifurcações de rede de teste também são anunciadas na lista de e-mails e no blog.

### A "Previsão determinística de proponente" (EIP-7917) afeta os validadores? {#does-7917-affect-validators}

Essa mudança não altera o funcionamento do seu cliente validador, no entanto, ela fornecerá mais informações sobre o futuro de suas funções de validador. Certifique-se de atualizar suas ferramentas de monitoramento para acompanhar os novos recursos.

### Como a Fusaka afeta os requisitos de largura de banda para nós e validadores? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

O PeerDAS faz uma mudança significativa na forma como os nós transmitem dados de blob. Todos os dados são divididos em pedaços chamados colunas em 128 sub-redes, com os nós se inscrevendo em apenas algumas delas. A quantidade de colunas de sub-rede que os nós precisam custodiar depende de sua configuração e do número de validadores conectados. Os requisitos reais de largura de banda dependerão da quantidade de blobs permitidos na rede e do tipo de nó. No momento da ativação da Fusaka, a meta de blob permanece a mesma de antes, mas com o PeerDAS, os operadores de nós podem ver uma diminuição no uso do disco de blobs e no tráfego de rede. À medida que os BPOs configuram números maiores de blobs na rede, a largura de banda necessária aumentará com cada BPO.

Os requisitos dos nós ainda estão dentro das [margens recomendadas](https://eips.ethereum.org/EIPS/eip-7870) mesmo após os BPOs da Fusaka.

#### Nós completos {#full-nodes}

Nós regulares sem nenhum validador se inscreverão em apenas 4 sub-redes, fornecendo custódia para 1/8 dos dados originais. Isso significa que, com a mesma quantidade de dados de blob, a largura de banda do nó para baixá-los seria menor por um fator de oito (8). O uso do disco e a largura de banda de download de blobs para um nó completo normal podem diminuir cerca de 80%, para apenas alguns Mb.

#### Stakers individuais {#solo-stakers}

Se o nó for usado para um cliente validador, ele terá que custodiar mais colunas e, portanto, processar mais dados. Com um validador adicionado, o nó se inscreve em pelo menos 8 sub-redes de colunas e, portanto, processa o dobro de dados que um nó regular, mas ainda menos do que antes da Fusaka. Se o saldo do validador for superior a 287 ETH, mais e mais sub-redes serão inscritas.

Para um staker individual, isso significa que o uso do disco e a largura de banda de download diminuirão cerca de 50%. No entanto, para construir blocos localmente e fazer o upload de todos os blobs para a rede, é necessária mais largura de banda de upload. Os construtores locais precisarão de uma largura de banda de upload 2 a 3 vezes maior do que antes no momento da Fusaka e, com a meta do BPO2 de 15/21 blobs, a largura de banda de upload final necessária terá que ser cerca de 5 vezes maior, em 100 Mbps.

#### Grandes validadores {#large-validators}

O número de sub-redes inscritas cresce com mais saldo e validadores adicionados ao nó. Por exemplo, com cerca de 800 ETH de saldo, o nó custodia 25 colunas e precisará de cerca de 30% a mais de largura de banda de download do que antes. O upload necessário aumenta de forma semelhante aos nós regulares e pelo menos 100 Mbps são necessários.

Com 4096 ETH, 2 validadores de saldo máximo, o nó se torna um 'supernó' que custodia todas as colunas, portanto, baixa e armazena tudo. Esses nós curam ativamente a rede contribuindo com os dados ausentes de volta, mas também exigem muito mais largura de banda e armazenamento. Com a meta final de blob sendo 6 vezes maior do que antes, os supernós terão que armazenar cerca de 600 GB de dados de blob extras e ter uma largura de banda de download sustentada mais rápida em cerca de 20 Mbps.

[Leia mais detalhes sobre os requisitos esperados.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Quais mudanças na EVM são implementadas? {#what-evm-changes-are-implemented}

A Fusaka solidifica a EVM com novas pequenas mudanças e recursos.

- Para segurança durante a escalabilidade, o tamanho máximo de uma única transação será [limitado a 16,7 milhões](https://eips.ethereum.org/EIPS/eip-7825) de unidades de gás.
- [O novo código de operação de contagem de zeros à esquerda (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) é adicionado à EVM e permitirá que as linguagens de contrato inteligente executem certas operações com mais eficiência.
- [O custo do pré-compilado `ModExp` será aumentado](https://eips.ethereum.org/EIPS/eip-7883) — os contratos que o utilizam cobrarão mais gás para execução.

### Como o novo limite de gas de 16M afeta os desenvolvedores de contratos? {#how-does-new-16m-gas-limit-affects-contract-developers}

A Fusaka introduz um limite para o [tamanho máximo de uma única transação de 16,7 milhões](https://eips.ethereum.org/EIPS/eip-7825) (2^24) de unidades de gás. Este é aproximadamente o tamanho anterior de um bloco médio, o que o torna grande o suficiente para acomodar transações complexas que consumiriam um bloco inteiro. Esse limite cria proteção para os clientes, evitando possíveis ataques de DoS no futuro com um limite de gas de bloco mais alto. O objetivo da escalabilidade é permitir que mais transações entrem na blockchain sem que uma única consuma o bloco inteiro.

As transações de usuários regulares estão longe de atingir esse limite. Certos casos extremos, como operações grandes e complexas de finanças descentralizadas (DeFi), grandes implantações de contrato inteligente ou transações em lote direcionadas a vários contratos, podem ser afetados por essa mudança. Essas transações terão que ser divididas em menores ou otimizadas de outra forma. Use a simulação antes de enviar transações que potencialmente atinjam o limite.

O método RPC `eth_call` não é limitado e permitirá a simulação de transações maiores do que o limite real da blockchain. O limite real para métodos RPC pode ser configurado pelo operador do cliente para garantir a prevenção de abusos.

### O que o CLZ significa para os desenvolvedores? {#what-clz-means-for-developers}

Compiladores EVM como a Solidity implementarão e utilizarão a nova função para contar zeros internamente. Novos contratos podem se beneficiar da economia de gás se dependerem desse tipo de operação. Acompanhe os lançamentos e anúncios de recursos da linguagem de contrato inteligente para obter documentação sobre possíveis economias.

### Há alguma mudança para meus contratos inteligentes existentes? {#what-clz-means-for-developers-2}

A Fusaka não tem nenhum efeito direto que quebraria quaisquer contratos existentes ou mudaria seu comportamento. As mudanças introduzidas na camada de execução são feitas com compatibilidade com versões anteriores, no entanto, fique sempre de olho em casos extremos e possíveis impactos.

[Com o aumento do custo do pré-compilado `ModExp`](https://eips.ethereum.org/EIPS/eip-7883), os contratos que dependem dele consumirão mais gás para execução. Se o seu contrato depende muito disso e se torna mais caro para os usuários, reconsidere como ele é utilizado.

Considere o [novo limite de 16,7 milhões](https://eips.ethereum.org/EIPS/eip-7825) se as transações que executam seus contratos puderem estar atingindo um tamanho semelhante.

## Leitura adicional {#further-reading}

- [Roteiro da Ethereum](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [EIP Meta da Fusaka](https://eips.ethereum.org/EIPS/eip-7607)
- [Anúncio no blog da rede de teste Fusaka](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: O que a Fusaka e a Pectra trarão para a Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: As próximas atualizações da Ethereum: Fusaka, Glamsterdam e além com Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [Os Arquivos Fusaka](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [PEEPanEIPs Explicado](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)