---
title: Fulu-Osaka (Fusaka)
description: "Saiba mais sobre a atualização do protocolo Fusaka"
lang: pt-br
---

# Fusaka <Emoji text="🦓" /> {#fusaka}

**A tão esperada atualização Fusaka do Ethereum foi ao ar em 3 de dezembro de 2025**

A atualização da rede Fusaka segue a [Pectra](/roadmap/pectra/) e traz mais novos recursos e melhora a experiência para todos os usuários e desenvolvedores do Ethereum. O nome combina a atualização da camada de execução Osaka com a versão da camada de consenso Fulu, nomeada a partir de uma estrela. Ambas as partes do Ethereum recebem uma atualização que impulsiona a escalabilidade, a segurança e a experiência do usuário, projetando o Ethereum para o futuro.

<Alert variant="update">
<AlertContent>
<AlertDescription>
A atualização Fusaka é apenas um passo nos objetivos de desenvolvimento de longo prazo do Ethereum. Saiba mais sobre [o roteiro do protocolo](/roadmap/) e [atualizações anteriores](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Melhorias em Fusaka {#improvements-in-fusaka}

### Escalar blobs {#scale-blobs}

#### PeerDAS {#peerdas}

Este é o _principal destaque_ da bifurcação Fusaka, o principal recurso adicionado nesta atualização. As Layers 2 atualmente publicam seus dados no Ethereum em blobs, o tipo de dado efêmero criado especificamente para as layers 2. Antes do Fusaka, cada nó completo tinha que armazenar cada blob para garantir que os dados existissem. À medida que a taxa de transferência de blobs aumenta, a necessidade de baixar todos esses dados se torna um consumo de recursos insustentável.

Com [amostragem de disponibilidade de dados](https://notes.ethereum.org/@fradamt/das-fork-choice), em vez de ter que armazenar todos os dados do blob, cada nó será responsável por um subconjunto dos dados do blob. Os blobs são distribuídos uniformemente de forma aleatória entre os nós da rede, com cada full node contendo apenas 1/8 dos dados, permitindo, portanto, uma escala teórica de até 8x. Para garantir a disponibilidade dos dados, qualquer parte dos dados pode ser reconstruída a partir de 50% do total existente com métodos que reduzem a probabilidade de dados errados ou ausentes para um nível criptograficamente insignificante (\~um em 10<sup>20</sup> a um em 10<sup>24</sup>).

Isso mantém os requisitos de hardware e banda larga para nós sustentáveis, ao mesmo tempo em que permite o dimensionamento de blobs, resultando em mais escala com taxas menores para layers 2.

[Saiba mais sobre o PeerDAS](/roadmap/fusaka/peerdas/)

**Recursos**:

- [Especificação técnica do EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion sobre PeerDAS: Escalando o Ethereum hoje | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Acadêmico: uma documentação do PeerDAS do Ethereum (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Bifurcações somente de parâmetro de blob {#blob-parameter-only-forks}

As layer 2 escalam o Ethereum - à medida que suas redes crescem, elas precisam postar mais dados no Ethereum. Isso significa que o Ethereum precisará aumentar o número de blobs disponíveis com o passar do tempo. Embora o PeerDAS permita o dimensionamento de dados de blob, isso precisa ser feito de forma gradual e segura.

Como o Ethereum é um código executado em milhares de nós independentes que exigem acordo sobre as mesmas regras, não podemos simplesmente introduzir mudanças como aumentar a contagem de blobs da mesma forma que você implementa uma atualização de site. Qualquer mudança de regra deve ser uma atualização coordenada, onde cada nó, cliente e software validador são atualizados antes do mesmo bloco predeterminado.

Essas atualizações coordenadas geralmente incluem muitas mudanças, exigem muitos testes e isso leva tempo. Para se adaptar mais rapidamente às necessidades de alteração dos blobs da layer 2, os forks somente de parâmetros de blobs introduzem um mecanismo para aumentar os blobs sem ter que esperar pelo cronograma de atualização.

Somente forks de parâmetros de blob podem ser definidas pelos clientes, de forma semelhante a outras configurações, como limite de gás. Entre as principais atualizações do Ethereum, os clientes podem concordar em aumentar os blobs `target` e `max` para, por exemplo, 9 e 12, e então os operadores de nós atualizarão para participar dessa pequena bifurcação. Esses forks somente de parâmetros de blob podem ser configurados a qualquer momento.

Quando os blobs foram adicionados pela primeira vez à rede na atualização Dencun, a meta era 3. Isso foi aumentado para 6 no Pectra e, após o Fusaka, agora pode ser aumentado a uma taxa sustentável, independentemente dessas grandes atualizações de rede.

![Gráfico mostrando a contagem média de blobs por bloco e o aumento das metas com as atualizações](./average-blob-count-per-block.webp)

Fonte do gráfico: [Blobs do Ethereum - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Recursos**: [Especificação técnica do EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Taxa base do blob limitada pelos custos de execução {#blob-base-fee-bounded-by-execution-costs}

As Layers 2 pagam duas contas quando publicam dados: a taxa de blob e o gás de execução necessário para verificar esses blobs. Se o gás de execução dominar, o leilão de taxas de blob pode cair para 1 wei e deixar de ser um sinal de preço.

O EIP-7918 fixa um preço de reserva proporcional em cada blob. Quando a reserva é maior que a taxa base nominal do blob, o algoritmo de ajuste de taxa trata o bloco como acima da meta, para de pressionar a taxa para baixo e permite que ela aumente normalmente. Como resultado:

- o mercado de taxas de blob sempre reage ao congestionamento
- as layers 2 pagam pelo menos uma fatia significativa da computação que impõem aos nós
- picos de taxa básica no EL não podem mais manter a taxa de blob em 1 wei

**Recursos**:

- [Especificação técnica do EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Explicação em Storybook](https://notes.ethereum.org/@anderselowsson/AIG)

### Escalar a L1 {#scale-l1}

#### Expiração de histórico e recibos mais simples {#history-expiry}

Em julho de 2025, os clientes de execução do Ethereum [começaram a oferecer suporte à expiração parcial do histórico](https://blog.ethereum.org/2025/07/08/partial-history-exp). Isso descartou o histórico anterior à [Fusão](https://ethereum.org/roadmap/merge/) para reduzir o espaço em disco exigido pelos operadores de nós, à medida que o Ethereum continua a crescer.

Este EIP está em uma seção separada dos "EIPs principais" porque a bifurcação não implementa nenhuma alteração — é um aviso de que as equipes de clientes devem suportar a expiração de histórico até a atualização Fusaka. Na prática, os clientes podem implementar isso a qualquer momento, mas adicioná-lo à atualização o colocou concretamente em sua lista de tarefas e permitiu que testassem as alterações do Fusaka em conjunto com esse recurso.

**Recursos**: [Especificação técnica do EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Definir limites superiores para MODEXP {#set-upper-bounds-for-modexp}

Até agora, a pré-compilação do MODEXP aceitava números de praticamente qualquer tamanho. Isso tornou difícil testar, fácil abusar e arriscado para a estabilidade do cliente. O EIP-7823 estabelece um limite claro: cada número de entrada pode ter no máximo 8192 bits (1024 bytes) de comprimento. Qualquer coisa maior é rejeitada, o gás da transação é queimado e nenhuma mudança de estado ocorre. Ele cobre confortavelmente as necessidades do mundo real, ao mesmo tempo em que remove os casos extremos que complicam o planejamento de limites de gás e as revisões de segurança. Essa mudança oferece mais segurança e proteção contra DoS sem afetar a experiência do usuário ou do desenvolvedor.

**Recursos**: [Especificação técnica do EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Limite de gás para transações {#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) adiciona um limite de 16.777.216 (2^24) de gás por transação. É um reforço proativo de DoS ao limitar o pior custo de qualquer transação única à medida que aumentamos o limite de gás do bloco. Isso torna mais fácil modelar a validação e a propagação, o que nos permite enfrentar o desafio de escalar aumentando o limite de gas.

Por que exatamente 2^24 gas? É confortavelmente menor do que o limite de gás atual, é grande o suficiente para implantações de contratos reais e pré-compilações pesadas, e uma potência de 2 facilita a implementação em todos os clientes. Esse novo tamanho máximo de transação é semelhante ao tamanho médio de bloco pré-Pectra, tornando-o um limite razoável para qualquer operação no Ethereum.

**Recursos**: [Especificação técnica do EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Aumento do custo de gás do `MODEXP` {#modexp-gas-cost-increase}

MODEXP é uma função integrada de pré-compilação que calcula a exponenciação modular, um tipo de matemática de números grandes usada em sistemas de verificação e prova de assinatura RSA. Isso permite que os contratos executem esses cálculos diretamente sem precisar implementá-los por conta própria.

Desenvolvedores e equipes de clientes identificaram o MODEXP como um grande obstáculo para aumentar o limite de gas do bloco, porque a precificação atual de gas frequentemente subestima o poder computacional que certas entradas exigem. Isso significa que uma única transação usando MODEXP poderia consumir a maior parte do tempo necessário para processar um bloco inteiro, retardando a rede.

Este EIP altera a precificação para corresponder aos custos computacionais reais da seguinte forma:

- elevando a cobrança mínima de 200 para 500 gas e removendo o desconto de um terço do EIP-2565 no cálculo do custo geral.
- elevando o custo de forma mais acentuada quando o input do expoente possui tamanho excessivo. Se o expoente (o número de ‘potência’ passado como segundo argumento) tiver mais de 32 bytes / 256 bits, a cobrança de gás aumenta muito mais rápido para cada byte extra.
- cobrando adicionalmente por base ou módulo grandes.Os outros dois números (a base e o módulo) são assumidos como tendo pelo menos 32 bytes — se qualquer um for maior, o custo aumenta proporcionalmente ao seu tamanho.

Ao adequar melhor os custos ao tempo de processamento real, o MODEXP não pode mais fazer com que um bloco demore muito para ser validado. Essa mudança é uma das várias que visam tornar seguro aumentar o limite de gás do bloco Ethereum no futuro.

**Recursos**: [Especificação técnica do EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### Limite de tamanho do bloco de execução RLP {#rlp-execution-block-size-limit}

Isso cria um teto para o tamanho que um bloco pode ter — este é um limite sobre o que é _enviado_ pela rede e é separado do limite de gás, que limita o _trabalho_ dentro de um bloco. O limite de tamanho do bloco é de 10 MiB, com uma pequena margem (2 MiB) reservada para dados de consenso, para que tudo se encaixe e se propague de forma limpa. Se um bloco aparecer maior que isso, os clientes o rejeitam.
Isso é necessário porque blocos muito grandes levam mais tempo para se espalhar e verificar pela rede e podem criar problemas de consenso ou ser usados como um vetor de DoS. Além disso, o gossip da camada de consenso já não encaminha blocos acima de ~10 MiB, então alinhar a camada de execução a esse limite evita situações estranhas do tipo "visto por alguns, descartado por outros".

Nos mínimos detalhes: este é um limite no tamanho do bloco de execução codificado por [RLP](/developers/docs/data-structures-and-encoding/rlp/). 10 MiB no total, com uma margem de segurança de 2 MiB reservada para o enquadramento do bloco de beacon. Na prática, os clientes definem

`MAX_BLOCK_SIZE = 10,485,760` bytes e

`SAFETY_MARGIN = 2,097,152` bytes,

e rejeitam qualquer bloco de execução cuja carga RLP exceda

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

O objetivo é limitar o tempo de propagação/validação no pior caso e alinhar-se com o comportamento de gossip da camada de consenso, reduzindo o risco de reorganização/DoS sem alterar a contabilidade de gás.

**Recursos**: [Especificação técnica do EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Definir o limite de gás padrão para 60 milhões {#set-default-gas-limit-to-60-million}

Antes de aumentar o limite de gás de 30M para 36M em fevereiro de 2025 (e posteriormente para 45M), esse valor não havia mudado desde o the Merge (setembro de 2022). Este EIP visa tornar o escalonamento consistente uma prioridade.

O EIP-7935 coordena as equipes de clientes da EL para aumentar o limite de gás padrão acima dos 45M de hoje para Fusaka. É um EIP informativo, mas pede explicitamente aos clientes que testem limites mais altos em devnets, convirjam para um valor seguro e enviem esse número em seus lançamentos Fusaka.

O planejamento da Devnet tem como alvo um estresse de ~60M (blocos completos com carga sintética) e picos iterativos; pesquisas dizem que as piores patologias de tamanho de bloco não devem ficar abaixo de ~150M. A implementação deve ser pareada com o limite de gás da transação (EIP-7825) para que nenhuma transação possa dominar conforme os limites aumentam.

**Recursos**: [Especificação técnica do EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### Melhorar a UX {#improve-ux}

#### Lookahead do proponente determinístico {#deterministic-proposer-lookahead}

Com o EIP-7917, o Beacon Chain tomará conhecimento dos próximos proponentes de blocos para a próxima época. Ter uma visão determinística sobre quais validadores irão propor blocos futuros pode permitir [pré-confirmações](https://ethresear.ch/t/based-preconfirmations/17353) - um compromisso com o próximo proponente que garante que a transação do usuário será incluída em seu bloco sem esperar pelo bloco real.

Esse recurso beneficia as implementações do cliente e a segurança da rede, pois evita casos extremos em que os validadores podem manipular a programação do proponente. A previsão também permite menos complexidade de implementação.

**Recursos**: [Especificação técnica do EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Contar zeros à esquerda (CLZ) opcode {#count-leading-zeros-opcode}

Este recurso adiciona uma pequena instrução EVM, **contagem de zeros à esquerda (CLZ)**. Quase tudo na EVM é representado como um valor de 256 bits — este novo opcode retorna quantos bits zero estão na frente. Este é um recurso comum em muitas arquiteturas de conjuntos de instruções, pois permite operações aritméticas mais eficientes. Na prática, isso reduz as varreduras de bits feitas manualmente em uma única etapa, de modo que encontrar o primeiro bit definido, escanear bytes ou analisar campos de bits se torna mais simples e barato. O opcode é baixo, de custo fixo e foi avaliado para estar no mesmo nível de um add básico, que reduz o bytecode e economiza gás para o mesmo trabalho.

**Recursos**: [Especificação técnica do EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Pré-compilação para suporte à curva secp256r1 {#secp256r1-precompile}

Introduz um verificador de assinatura secp256r1 (P-256) integrado, estilo passkey, no endereço fixo `0x100`, usando o mesmo formato de chamada já adotado por muitas L2s e corrigindo casos extremos, para que os contratos escritos para esses ambientes funcionem na L1 sem alterações.

Melhoria da UX! Para os usuários, isso desbloqueia a assinatura nativa do dispositivo e as passkeys. As carteiras podem acessar diretamente o Apple Secure Enclave, o Android Keystore, os módulos de segurança de hardware (HSMs) e o FIDO2/WebAuthn — sem frase semente, integração mais suave e fluxos multifatoriais que parecem aplicativos modernos. Isso resulta em uma melhor UX, recuperação mais fácil e padrões de abstração de conta que correspondem ao que bilhões de dispositivos já fazem.

Para desenvolvedores, ele recebe uma entrada de 160 bytes e retorna uma saída de 32 bytes, facilitando a portabilidade de bibliotecas existentes e contratos L2. Nos bastidores, ele inclui verificações de ponto no infinito e de comparação modular para eliminar casos extremos complicados sem quebrar os chamadores válidos.

**Recursos**:

- [Especificação técnica do EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [Mais sobre RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Observe que o EIP-7951 substituiu o RIP-7212)_

### Meta {#meta}

#### Método JSON-RPC `eth_config` {#eth-config}

Esta é uma chamada JSON-RPC que permite que você pergunte ao seu nó quais configurações de bifurcação você está executando. Ele retorna três snapshots: `current`, `next` e `last` para que os validadores e as ferramentas de monitoramento possam verificar se os clientes estão alinhados para uma próxima bifurcação.

Na prática, isso é para resolver uma deficiência descoberta quando a bifurcação Pectra foi ao ar na rede de testes Holesky no início de 2025 com pequenas configurações incorretas que resultaram em um estado de não finalização. Isso ajuda as equipes de teste e os desenvolvedores a garantir que as principais bifurcações se comportem como o esperado ao migrar de devnets para redes de teste e de redes de teste para a Mainnet.

Os snapshots incluem: `chainId`, `forkId`, hora de ativação da bifurcação planejada, quais pré-compilações estão ativas, endereços de pré-compilação, dependências de contrato do sistema e a programação de blobs da bifurcação.

Este EIP está em uma seção separada dos "EIPs Principais" porque a bifurcação não implementa nenhuma alteração — é um aviso de que as equipes de cliente devem implementar este método JSON-RPC até a atualização Fusaka.

**Recursos**: [Especificação técnica do EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## FAQ {#faq}

### Esta atualização afeta todos os nós e validadores Ethereum? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Sim, a atualização do Fusaka requer atualizações para [clientes de execução e clientes de consenso](/developers/docs/nodes-and-clients/). Todos os principais clientes Ethereum lançarão versões compatíveis com o hard fork marcadas como alta prioridade. Você pode acompanhar quando esses lançamentos estarão disponíveis nos repositórios do cliente no GitHub, nos [canais do Discord](https://ethstaker.org/support), no [EthStaker Discord](https://dsc.gg/ethstaker) ou assinando o blog do Ethereum para atualizações do protocolo. Para manter a sincronização com a rede Ethereum após a atualização, os operadores de nó precisam assegurar que eles estão executando uma versão habilitada do cliente. Observe que as informações sobre os lançamentos de clientes são perenes, e os usuários deveriam usar como referência as últimas melhorias para ter os detalhes mais atuais.

### Como ETH pode ser convertido depois do hard fork? {#how-can-eth-be-converted-after-the-hardfork}

- **Nenhuma ação necessária para seu ETH**: Após a atualização do Ethereum Fusaka, não há necessidade de converter ou atualizar seu ETH. Seu saldo de conta irá permanecer o mesmo e o ETH que você tem atualmente continuará acessível na sua forma existente depois do hard fork.
- **Atenção aos golpes!**<Emoji text="⚠️" />**Qualquer pessoa que instrua você a "atualizar" seu ETH está tentando aplicar um golpe.** Você não precisa fazer nada em relação a essa melhoria. Seus ativos não serão afetados de forma nenhuma. Lembre-se: estar informado é a melhor defesa contra golpes.

[Mais sobre como reconhecer e evitar golpes](/security/)

### Por que as zebras? <Emoji text="🦓" /> {#whats-with-the-zebras}

A zebra é a "mascote" escolhida pelos desenvolvedores para a Fusaka porque suas listras refletem a amostragem de disponibilidade de dados baseada em colunas do PeerDAS, onde os nós custodiam certas sub-redes de colunas e amostram algumas outras colunas de cada slot de pares para verificar se os dados do blob estão disponíveis.

A Fusão em 2022 [usou um panda](https://x.com/hwwonx/status/1431970802040127498) como mascote para sinalizar a união das camadas de execução e consenso. Desde então, mascotes têm sido escolhidos informalmente para cada bifurcação e aparecem como arte ASCII nos logs do cliente no momento da atualização. É apenas uma maneira divertida de comemorar.

### Quais melhorias estão incluídas para a escalabilidade da L2? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) é o principal recurso da bifurcação. Ele implementa a amostragem de disponibilidade de dados (DAS) que desbloqueia mais escalabilidade para rollups, teoricamente escalando o espaço de blob em até 8 vezes o tamanho atual. O mercado de taxas de blob também será aprimorado para reagir eficientemente ao congestionamento e garantir que as L2s paguem uma taxa significativa pela computação e espaço que os blobs impõem aos nós.

### Em que as bifurcações BPO são diferentes? {#how-are-bpo-forks-different}

As bifurcações de Parâmetro Somente de Blob fornecem um mecanismo para aumentar continuamente a contagem de blobs (tanto o alvo quanto o máximo) após a ativação do PeerDAS, sem ter que esperar por uma atualização totalmente coordenada. Cada aumento é codificado para ser pré-configurado nas versões do cliente que suportam a Fusaka.

Como usuário ou validador, você não precisa atualizar seus clientes para cada BPO e apenas precisa garantir que segue as principais bifurcações (hardforks) como a Fusaka. Esta é a mesma prática de antes, nenhuma ação especial é necessária. Ainda é recomendado monitorar seus clientes durante as atualizações e BPOs e mantê-los atualizados mesmo entre os principais lançamentos, pois correções ou otimizações podem seguir a bifurcação (hardfork).

### Qual é o cronograma da BPO? {#what-is-the-bpo-schedule}

O cronograma exato das atualizações da BPO será determinado com os lançamentos da Fusaka. Acompanhe os [anúncios do protocolo](https://blog.ethereum.org/category/protocol) e as notas de versão de seus clientes.

Exemplo de como pode ser:

- Antes da Fusaka: meta 6, máx. 9
- Na ativação da Fusaka: meta 6, máx. 9
- BPO1, poucas semanas após a ativação da Fusaka: meta 10, máx. 15, aumentando em dois terços
- BPO2, poucas semanas após a BPO1: meta 14, máx. 21

### Isso reduzirá as taxas no Ethereum (camada 1) {#will-this-lower-gas}

Esta atualização não reduz as taxas de gás na L1, pelo menos não diretamente. O foco principal é mais espaço de blob para dados de rollup, portanto, reduzindo as taxas na camada 2. Isso pode ter alguns efeitos colaterais no mercado de taxas da L1, mas nenhuma mudança significativa é esperada.

### Como um staker, o que preciso fazer para a atualização? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Como em toda atualização de rede, certifique-se de atualizar seus clientes para as versões mais recentes marcadas com suporte à Fusaka. Acompanhe as atualizações na lista de e-mails e os [Anúncios de Protocolo no Blog da EF](https://blog.ethereum.org/category/protocol) para se informar sobre os lançamentos.
Para validar sua configuração antes que a Fusaka seja ativada na Mainnet, você pode executar um validador em redes de teste. A Fusaka é [ativada mais cedo em redes de teste](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement), dando a você mais espaço para garantir que tudo funcione e relatar bugs. As bifurcações da rede de testes também são anunciadas na lista de e-mails e no blog.

### "Lookahead determinístico do proponente" (EIP-7917) afeta os validadores? {#does-7917-affect-validators}

Essa mudança não altera o funcionamento do seu cliente validador, no entanto, fornecerá mais informações sobre o futuro de suas tarefas como validador. Certifique-se de atualizar suas ferramentas de monitoramento para acompanhar os novos recursos.

### Como a Fusaka afeta os requisitos de largura de banda para nós e validadores? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

O PeerDAS faz uma mudança significativa na forma como os nós transmitem os dados de blob. Todos os dados são divididos em partes chamadas colunas em 128 sub-redes, com os nós se inscrevendo em apenas algumas delas. A quantidade de colunas de sub-rede que os nós precisam custodiar depende de sua configuração e do número de validadores conectados. Os requisitos reais de largura de banda dependerão da quantidade de blobs permitidos na rede e do tipo de nó. No momento da ativação da Fusaka, a meta de blob permanece a mesma de antes, mas com o PeerDAS, os operadores de nós podem ver uma diminuição no uso de disco de blobs e no tráfego de rede. À medida que os BPOs configuram um número maior de blobs na rede, a largura de banda necessária aumentará a cada BPO.

Os requisitos dos nós ainda estão dentro das [margens recomendadas](https://eips.ethereum.org/EIPS/eip-7870), mesmo após os BPOs da Fusaka.

#### Nós completos {#full-nodes}

Nós regulares sem nenhum validador se inscreverão em apenas 4 sub-redes, fornecendo custódia para 1/8 dos dados originais. Isso significa que, com a mesma quantidade de dados de blob, a largura de banda do nó para baixá-los seria menor por um fator de oito (8). O uso de disco e a largura de banda de download de blobs para um nó completo normal podem diminuir em cerca de 80%, para apenas alguns Mb.

#### Stakers individuais {#solo-stakers}

Se o nó for usado para um cliente validador, ele terá que custodiar mais colunas e, portanto, processar mais dados. Com um validador adicionado, o nó se inscreve em pelo menos 8 sub-redes de coluna e, portanto, processa o dobro de dados de um nó regular, mas ainda menos do que antes da Fusaka. Se o saldo do validador estiver acima de 287 ETH, mais e mais sub-redes serão assinadas.

Para um staker solo, isso significa que o uso de disco e a largura de banda de download diminuirão em cerca de 50%. No entanto, para construir blocos localmente e carregar todos os blobs para a rede, é necessária mais largura de banda de upload. Construtores locais precisarão de 2 a 3 vezes mais largura de banda de upload do que antes no momento da Fusaka e, com a meta BPO2 de 15/21 blobs, a largura de banda de upload final necessária terá que ser cerca de 5 vezes maior, em 100 Mbps.

#### Validadores grandes {#large-validators}

O número de sub-redes assinadas cresce com mais saldo e validadores adicionados ao nó. Por exemplo, com um saldo de cerca de 800 ETH, o nó custodia 25 colunas e precisará de cerca de 30% a mais de largura de banda de download do que antes. O upload necessário aumenta de forma semelhante aos nós regulares e é necessário pelo menos 100 Mbps.

Com 4096 ETH, 2 validadores de saldo máximo, o nó se torna um 'supernó' que custodia todas as colunas, portanto, baixa e armazena tudo. Esses nós curam ativamente a rede, contribuindo com dados ausentes, mas também exigem muito mais largura de banda e armazenamento. Com a meta final de blob sendo 6 vezes maior do que antes, os supernós terão que armazenar cerca de 600 GB de dados de blob extras e ter uma largura de banda de download sustentada mais rápida, em torno de 20 Mbps.

[Leia mais detalhes sobre os requisitos esperados.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Quais mudanças na EVM são implementadas? {#what-evm-changes-are-implemented}

A Fusaka solidifica a EVM com novas pequenas mudanças e recursos.

- Para segurança durante a escalabilidade, o tamanho máximo de uma única transação será [limitado a 16,7 milhões](https://eips.ethereum.org/EIPS/eip-7825) de unidades de gás.
- [Novo opcode de contagem de zeros à esquerda (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) é adicionado à EVM e permitirá que linguagens de contrato inteligente executem certas operações com mais eficiência.
- [O custo da pré-compilação `ModExp` será aumentado](https://eips.ethereum.org/EIPS/eip-7883) — contratos que a utilizam cobrarão mais gás pela execução.

### Como o novo limite de gás de 16M afeta os desenvolvedores de contratos? {#how-does-new-16m-gas-limit-affects-contract-developers}

A Fusaka introduz um limite para o [tamanho máximo de uma única transação de 16,7 milhões](https://eips.ethereum.org/EIPS/eip-7825) (2^24) unidades de gás. Isso é aproximadamente o tamanho anterior de um bloco médio, o que o torna grande o suficiente para acomodar transações complexas que consumiriam um bloco inteiro. Este limite cria proteção para os clientes, prevenindo potenciais ataques de DoS no futuro com um limite de gás de bloco mais alto. O objetivo da escalabilidade é permitir que mais transações entrem na blockchain sem que uma única consuma o bloco inteiro.

Transações de usuários regulares estão longe de atingir este limite. Certos casos extremos, como operações DeFi grandes e complexas, grandes implantações de contratos inteligentes ou transações em lote visando vários contratos, podem ser afetados por essa mudança. Essas transações terão que ser divididas em menores ou otimizadas de outra forma. Use simulação antes de enviar transações que potencialmente atinjam o limite.

O método RPC `eth_call` não é limitado e permitirá a simulação de transações maiores que o limite real da blockchain. O limite real para métodos RPC pode ser configurado pelo operador do cliente para garantir a prevenção de abusos.

### O que CLZ significa para os desenvolvedores? {#what-clz-means-for-developers}

Compiladores EVM como Solidity implementarão e utilizarão a nova função para contagem de zeros nos bastidores. Novos contratos podem se beneficiar da economia de gás se dependerem desse tipo de operação. Acompanhe os lançamentos e anúncios de recursos da linguagem do contrato inteligente para documentação sobre possíveis economias.

### Existem alterações para meus contratos inteligentes existentes? {#what-clz-means-for-developers}

A Fusaka não tem efeito direto que quebraria contratos existentes ou mudaria seu comportamento. As alterações introduzidas na camada de execução são feitas com compatibilidade com versões anteriores, no entanto, fique sempre de olho nos casos extremos e no impacto potencial.

[Com o aumento do custo da pré-compilação `ModExp`](https://eips.ethereum.org/EIPS/eip-7883), os contratos que dependem dela consumirão mais gás para execução. Se seu contrato depende muito disso e se torna mais caro para os usuários, reconsidere como ele é utilizado.

Considere o [novo limite de 16,7 milhões](https://eips.ethereum.org/EIPS/eip-7825) se as transações que executam seus contratos puderem atingir um tamanho semelhante.

## Leitura adicional {#further-reading}

- [Roteiro do Ethereum](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Fusaka Meta EIP](https://eips.ethereum.org/EIPS/eip-7607)
- [Anúncio no blog da rede de testes Fusaka](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: O que Fusaka e Pectra trarão para o Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Próximas atualizações do Ethereum: Fusaka, Glamsterdam e além com Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [Os Arquivos Fusaka](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [PEEPanEIPs Explicados](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)
