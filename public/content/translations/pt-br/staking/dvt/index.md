---
title: Tecnologia de validador distribuído
description: A tecnologia de validador distribuído permite a operação distribuída de um validador do Ethereum por várias partes.
lang: pt-br
template: staking
sidebarDepth: 2
summaryPoints:
  - Divide a chave de assinatura de um validador entre várias máquinas e operadores, removendo pontos únicos de falha
  - Mantém os validadores online durante falhas individuais de hardware, software ou operador
  - Infraestrutura de produção usada hoje por stakers solo, serviços de staking e pools de staking
---

## O que é a tecnologia de validador distribuído? {#what-is-dvt}

A tecnologia de validador distribuído (DVT) é uma abordagem para a segurança do validador que distribui o gerenciamento de chaves e as responsabilidades de assinatura entre várias partes, para reduzir pontos únicos de falha e aumentar a resiliência do validador.

A DVT distribui o gerenciamento de chaves e a assinatura ao **dividir a chave privada** usada para proteger um validador **entre muitos computadores** organizados em um "cluster". Fazer isso permite que alguns nós no cluster fiquem offline enquanto mantém o nó do validador ativo, pois o trabalho de validação necessário pode ser feito por um subconjunto das máquinas em cada cluster. Essa distribuição reduz os pontos únicos de falha, tornando o validador mais robusto. Um benefício adicional da distribuição de assinatura da DVT é que ela torna muito difícil para os invasores obterem acesso à chave, porque ela não é armazenada na íntegra em nenhuma máquina única.

![Um diagrama mostrando como uma única chave de validador é dividida em partes da chave e distribuída para vários nós com componentes variados.](./dvt-cluster.png)

A DVT não é uma maneira separada de fazer staking. É uma camada de software que qualquer configuração de staking pode usar:
- [Stakers solo](/staking/solo/) podem se unir para executar um validador juntos, ou um staker solo individual pode usar a DVT para adicionar resiliência à sua configuração de staking solo.
- [Serviços de staking](/staking/saas/) e [pools de staking](/staking/pools/) podem usar a DVT para adicionar resiliência e fortalecer sua infraestrutura de staking, ou para distribuir as operações do validador entre muitos operadores independentes.

## Por que precisamos da DVT? {#why-do-we-need-dvt}

### Segurança {#security}

Os validadores geram dois pares de chaves público-privadas: chaves de validador para participar do consenso e chaves de saque para acessar fundos. Embora os validadores possam proteger as chaves de saque em armazenamento frio (cold storage), as chaves privadas do validador devem estar online 24 horas por dia, 7 dias por semana, para assinar as tarefas atribuídas ao validador o tempo todo, como atestações e propostas de blocos. Manter uma chave online a expõe a roubo, e a DVT limita essa exposição: apenas partes da chave (key shares) ficam online, nunca a chave completa.

Se uma chave privada de validador for comprometida, um invasor pode controlar o validador, potencialmente levando à penalização (slashing) ou à perda do ETH do staker. A DVT mitiga esse risco. Com a DVT, a chave original e completa do validador é criptografada e dividida em partes da chave. As partes da chave vivem online, distribuídas por vários nós que operam o validador juntos, enquanto a chave 'mestra' completa permanece offline com segurança. A distribuição é possível porque os validadores do [Ethereum](/) usam assinaturas BLS que são aditivas, o que significa que a chave completa pode ser reconstruída somando suas partes componentes. Assinaturas parciais feitas com as partes da chave se combinam em uma assinatura que é válida para a chave completa, de modo que a própria chave completa nunca é necessária para a assinatura do dia a dia. Quando um cluster gera uma nova chave de validador usando a geração de chave distribuída, a chave privada completa nunca existe em nenhuma máquina única.

### Sem pontos únicos de falha {#no-single-point-of-failure}

Quando um validador é dividido entre vários operadores e várias máquinas, ele pode suportar falhas individuais de hardware e software sem ficar offline. O risco de falhas também pode ser reduzido usando diversas configurações de hardware e software nos nós de um cluster. A distribuição multioperador não está disponível nativamente para configurações de validador de nó único; ela vem da camada de middleware da DVT.

Se um dos componentes de uma máquina em um cluster cair (por exemplo, se houver quatro operadores em um cluster de validador e um usar um cliente específico que tenha um bug), os outros podem garantir que o validador continue funcionando.

### Descentralização {#decentralization}

O cenário ideal para o Ethereum é ter o maior número possível de validadores operados de forma independente. No entanto, alguns provedores de staking se tornaram muito populares e representam uma parte substancial do total de ETH em staking na rede. A DVT pode permitir que esses operadores existam enquanto preserva a descentralização do stake. Isso ocorre porque as chaves de cada validador são distribuídas por muitas máquinas e seria necessário um conluio muito maior para que um validador se tornasse malicioso.

Sem a DVT, é mais fácil para os provedores de staking suportarem apenas uma ou duas configurações de cliente para todos os seus validadores, aumentando o impacto de um bug no cliente. A DVT pode ser usada para espalhar o risco por várias configurações de cliente e hardwares diferentes, criando resiliência por meio da diversidade.

**A DVT oferece os seguintes benefícios ao Ethereum:**

1. **Descentralização** do consenso de Prova de Participação (PoS) do Ethereum
2. Garante a **vivacidade (liveness)** da rede
3. Cria **tolerância a falhas** do validador
4. Operação do validador com **confiança minimizada**
5. Riscos de **penalização (slashing)** e tempo de inatividade minimizados
6. **Melhora a diversidade** (cliente, data center, localização, regulamentação, etc.)
7. **Segurança aprimorada** do gerenciamento de chaves do validador

## Como a DVT funciona? {#how-does-dvt-work}

As implementações de DVT normalmente são executadas como um software adicional em cada máquina de um cluster. Esse software atua como middleware, situando-se entre o cliente validador de um nó e seu cliente de consenso, onde ele se coordena com os outros nós do cluster para que as tarefas do validador sejam assinadas coletivamente.

Uma solução de DVT contém os seguintes componentes:

- **[Compartilhamento de segredos de Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Os validadores usam [chaves BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Uma chave privada de validador pode ser dividida em várias "partes da chave" (key shares) e, como as assinaturas BLS são aditivas, as assinaturas parciais feitas com essas partes da chave podem ser combinadas em uma única assinatura que é válida para a chave completa do validador.
- **[Esquema de assinatura de limite (Threshold signature scheme)](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Determina o número de partes individuais da chave que são necessárias para as tarefas de assinatura, por exemplo, 3 de 4.
- **[Geração de chave distribuída (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Processo criptográfico que gera as partes da chave e é usado para distribuir as partes de uma chave de validador existente ou nova para os nós em um cluster.
- **[Computação multipartidária (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - A chave completa do validador é gerada em segredo usando computação multipartidária. A chave completa nunca é conhecida por nenhum operador individual — eles apenas conhecem sua própria parte dela (sua "fração").
- **Protocolo de consenso** - O protocolo de consenso seleciona um nó para ser o propositor de bloco. Eles compartilham o bloco com os outros nós no cluster, que adicionam suas partes da chave à assinatura agregada. Quando partes suficientes da chave tiverem sido agregadas, o bloco é proposto no Ethereum.

Os validadores distribuídos têm tolerância a falhas integrada e podem continuar funcionando mesmo se alguns dos nós individuais ficarem offline. O cluster do nó do validador é resiliente mesmo se alguns dos nós dentro dele se revelarem maliciosos ou inativos.

## DVT em produção {#dvt-in-production}

Os validadores distribuídos são executados na Mainnet hoje em staking solo, de serviço e em pool. Duas redes são responsáveis pela maior parte dessa atividade:

<ProductDisclaimer />

- A **Obol** desenvolve o Charon, um cliente de middleware DVT de código aberto que permite que um cluster de máquinas opere um validador em conjunto ("squad staking"). Os grupos realizam a geração de chave distribuída e configuram seu cluster por meio do [DV Launchpad](https://docs.obol.org/learn/readme/launchpad) da Obol. Os clusters da Obol são usados em produção por [protocolos de staking](/staking/pools/) e [serviços de staking](/staking/saas/), incluindo o módulo Simple DVT da Lido e o programa Operation Solo Staker da EtherFi, que integra operadores domésticos em clusters tolerantes a falhas.
- A **SSV Network** é uma rede não permissionada de operadores de nós independentes. Uma chave de validador é dividida em partes da chave e distribuída para um conjunto escolhido de operadores, que executam as tarefas do validador coletivamente; nenhum operador único detém a chave completa. Serviços e pools de staking executam grandes conjuntos de validadores na SSV e, assim como a Obol, ela é usada pelo módulo Simple DVT da Lido.

## Casos de uso da DVT {#dvt-use-cases}

A DVT tem implicações significativas para a indústria de staking em geral:

### Stakers solo {#solo-stakers}

A DVT permite o **squad staking** (staking em esquadrão): um pequeno grupo de pessoas, como amigos, membros da comunidade ou estranhos coordenados por meio de um launchpad, executando coletivamente um único validador em suas próprias máquinas. Um limite do grupo (por exemplo, 3 de 4) deve estar online para que o validador execute suas tarefas, de modo que o tempo de inatividade, a falha de hardware ou o erro de nenhum membro único tire o validador do ar. Quando a chave é criada com a geração de chave distribuída, nenhum membro detém a chave de assinatura completa.

A DVT também permite o staking não custodial, permitindo que você distribua sua chave de validador por nós remotos enquanto mantém a chave completa totalmente offline. Isso significa que os stakers não precisam necessariamente executar seu próprio hardware, e a distribuição das partes da chave ajuda a proteger contra possíveis hacks.

### Staking como serviço (SaaS) {#saas}

Operadores (como pools de staking e stakers institucionais) que gerenciam muitos validadores podem usar a DVT para reduzir seus riscos. Ao distribuir sua infraestrutura, eles podem adicionar redundância às suas operações e diversificar os tipos de hardware que usam.

A DVT compartilha a responsabilidade pelo gerenciamento de chaves entre vários nós, o que significa que alguns custos operacionais também podem ser compartilhados. A DVT também pode reduzir o risco operacional e os custos de seguro para provedores de staking.

### Pools de staking {#staking-pools}

Devido às configurações padrão do validador, os pools de staking e os provedores de staking líquido historicamente tiveram que depositar uma confiança significativa em cada operador individual, uma vez que os ganhos e perdas são socializados em todo o pool. Eles também dependiam dos operadores para proteger as chaves de assinatura porque, até a DVT, não havia outra opção para eles.

Embora tradicionalmente sejam feitos esforços para espalhar o risco distribuindo stakes entre vários operadores, cada operador ainda gerencia um stake significativo de forma independente. Depender de um único operador apresenta riscos imensos se ele tiver um desempenho inferior, encontrar tempo de inatividade, for comprometido ou agir de forma maliciosa.

Ao alavancar a DVT, a confiança exigida de cada operador individual pode ser reduzida. **Os pools podem permitir que os operadores mantenham stakes sem precisar da custódia das chaves do validador** (pois apenas as partes da chave são utilizadas). Isso também permite que os stakes gerenciados sejam distribuídos entre mais operadores (por exemplo, em vez de ter um único operador gerenciando 1000 validadores, a DVT permite que esses validadores sejam executados coletivamente por vários operadores). Diversas configurações de operadores ajudam a garantir que, se um operador cair, os outros ainda poderão atestar. A redundância e a diversificação resultantes podem levar a um melhor desempenho e resiliência, ao mesmo tempo em que maximizam as recompensas.

Outro benefício de minimizar a confiança em um único operador é que os pools de staking podem permitir uma participação de operador mais aberta e não permissionada. Alguns pools de staking fazem isso em produção hoje. Os clusters DVT multioperador permitem que os protocolos combinem stakers domésticos e operadores menores com profissionais maiores, combinando conjuntos de operadores selecionados e não permissionados.

## Possíveis desvantagens do uso da DVT {#potential-drawbacks-of-using-dvt}

- **Componente adicional** - a introdução de um nó DVT adiciona outra parte que pode ser defeituosa ou vulnerável. Isso é mitigado por ter várias implementações de software DVT, assim como existem vários clientes para as camadas de consenso e de execução.
- **Custos operacionais** - como a DVT distribui o validador entre várias partes, são necessários mais nós para a operação em vez de apenas um único nó, o que introduz custos operacionais maiores.
- **Latência potencialmente aumentada** - como a DVT utiliza um protocolo de consenso para alcançar o consenso entre os vários nós que operam um validador, ela pode potencialmente introduzir maior latência.

## Perguntas frequentes {#faq}

<ExpandableCard title="Preciso de DVT para fazer stake?" eventCategory="DVT" eventName="clicked do I need DVT to stake">
Não. Uma única máquina executando um cliente validador funciona sem nenhum software DVT, e essa continua sendo uma configuração comum de staking doméstico. A DVT é uma camada opcional que adiciona tolerância a falhas e remove pontos únicos de falha. Isso é útil se você quiser que seu validador sobreviva a falhas de máquinas individuais ou se quiser compartilhar a responsabilidade de executar um validador com outras pessoas.
</ExpandableCard>

<ExpandableCard title="A DVT divide meu ETH ou minhas chaves de saque?" eventCategory="DVT" eventName="clicked does DVT split my ETH">
Não. A DVT divide apenas a chave de _assinatura_ do validador, que é usada para tarefas de consenso, como atestações e propostas de blocos. O seu stake é sempre controlado pelo endereço de saque definido para o validador, que não é afetado pela DVT. Desde a atualização Pectra, o titular do endereço de saque também pode acionar uma saída do validador diretamente da camada de execução, sem precisar da chave de assinatura.
</ExpandableCard>

<ExpandableCard title="O que acontece se os nós de um cluster ficarem offline?" eventCategory="DVT" eventName="clicked what happens if nodes go offline">
Contanto que um limite de nós permaneça online (por exemplo, 3 de 4), o validador continua executando suas tarefas. Se muitos nós ficarem offline ao mesmo tempo, o validador simplesmente ficará offline e perderá recompensas até que nós suficientes retornem, o mesmo que qualquer validador offline. Ficar offline não é uma ofensa passível de penalização (slashing).
</ExpandableCard>

<ExpandableCard title="Um cluster precisa ser 3 de 4?" eventCategory="DVT" eventName="clicked does a cluster have to be 3 of 4">
Não. "3 de 4" é apenas a menor configuração comum e é usada como exemplo ao longo desta página. O tamanho do cluster e o limite de assinatura são escolhidos quando o cluster é criado.

Os clusters geralmente são dimensionados para que o limite seja uma supermaioria de dois terços dos nós, o que permite que o cluster continue assinando enquanto tolera membros defeituosos ou offline. Um cluster de 4 nós assina com 3 e tolera 1 falha; 7 nós assinam com 5 e toleram 2; 10 nós assinam com 7 e toleram 3. Clusters maiores compram mais tolerância a falhas ao custo de mais máquinas para executar e mais coordenação entre elas.

[Mais sobre o tamanho e a resiliência do cluster](https://docs.obol.org/next/learn/charon/cluster-configuration#cluster-size-and-resilience)
</ExpandableCard>

<ExpandableCard title="A DVT é o mesmo que staking em pool?" eventCategory="DVT" eventName="clicked is DVT the same as pooled staking">
Não. O staking em pool combina ETH de muitas pessoas para financiar validadores e é uma das várias [maneiras de fazer staking](/staking/). A DVT é a infraestrutura para _operar_ um validador. Ela distribui a assinatura de um validador entre várias máquinas e operadores. Os dois são complementares; muitos pools usam a DVT para distribuir seus conjuntos de operadores, mas a própria DVT não agrupa o ETH de ninguém.
</ExpandableCard>

## Leitura adicional {#further-reading}

- [Tecnologia de Validador Distribuído (DVT) do Ethereum - Introdução Completa](https://www.cyfrin.io/blog/full-introduction-to-ethereum-distributed-validator-technology-dvt) - Cyfrin
- [O que é DVT e como ela melhora o staking no Ethereum?](https://blog.obol.org/what-is-dvt-and-how-does-it-improve-staking-on-ethereum/) - Obol
- [Especificações do validador distribuído do Ethereum (alto nível)](https://github.com/ethereum/distributed-validator-specs)
- [Especificações técnicas do validador distribuído do Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Documentação da Obol](https://docs.obol.org/)
- [Documentação da SSV Network](https://docs.ssv.network/)
- [Módulo Simple DVT da Lido](https://operatorportal.lido.fi/modules/simple-dvt-module)
- [Aplicativo de demonstração de compartilhamento de segredos de Shamir](https://iancoleman.io/shamir/)