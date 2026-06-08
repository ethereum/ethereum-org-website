---
title: Tecnologia de validador distribuído
description: A tecnologia de validador distribuído permite a operação distribuída de um validador da Ethereum por várias partes.
lang: pt-br
---

A tecnologia de validador distribuído (DVT) é uma abordagem para a segurança do validador que distribui o gerenciamento de chaves e as responsabilidades de assinatura entre várias partes, para reduzir pontos únicos de falha e aumentar a resiliência do validador.

Ela faz isso **dividindo a chave privada** usada para proteger um validador **entre muitos computadores** organizados em um "cluster". O benefício disso é que torna muito difícil para os invasores obterem acesso à chave, porque ela não é armazenada na íntegra em nenhuma máquina única. Isso também permite que alguns nós fiquem offline, pois a assinatura necessária pode ser feita por um subconjunto das máquinas em cada cluster. Isso reduz os pontos únicos de falha da rede e torna todo o conjunto de validadores mais robusto.

![A Diagram showing how a single validator key is split into key shares and distributed to multiple nodes with varying components.](./dvt-cluster.png)

## Por que precisamos da DVT? {#why-do-we-need-dvt}

### Segurança {#security}

Os validadores geram dois pares de chaves públicas-privadas: chaves de validador para participar do consenso e chaves de saque para acessar fundos. Embora os validadores possam proteger as chaves de saque em armazenamento frio (cold storage), as chaves privadas do validador devem estar online 24 horas por dia, 7 dias por semana. Se uma chave privada de validador for comprometida, um invasor poderá controlar o validador, o que pode levar à penalização ou à perda do ETH de quem faz o stake. A DVT pode ajudar a mitigar esse risco. Veja como:

Ao usar a DVT, os stakers podem participar do staking enquanto mantêm a chave privada do validador em armazenamento frio. Isso é alcançado criptografando a chave original e completa do validador e, em seguida, dividindo-a em partes de chave (key shares). As partes da chave vivem online e são distribuídas para vários nós que permitem a operação distribuída do validador. Isso é possível porque os validadores da [Ethereum](/) usam assinaturas BLS que são aditivas, o que significa que a chave completa pode ser reconstruída somando suas partes componentes. Isso permite que o staker mantenha a chave de validador 'mestra' original e completa offline com segurança.

### Sem pontos únicos de falha {#no-single-point-of-failure}

Quando um validador é dividido entre vários operadores e várias máquinas, ele pode suportar falhas individuais de hardware e software sem ficar offline. O risco de falhas também pode ser reduzido usando diversas configurações de hardware e software nos nós de um cluster. Essa resiliência não está disponível para configurações de validador de nó único - ela vem da camada DVT.

Se um dos componentes de uma máquina em um cluster cair (por exemplo, se houver quatro operadores em um cluster de validadores e um usar um cliente específico que tenha um bug), os outros garantem que o validador continue funcionando.

### Descentralização {#decentralization}

O cenário ideal para a Ethereum é ter o maior número possível de validadores operados de forma independente. No entanto, alguns provedores de staking se tornaram muito populares e representam uma parte substancial do total de ETH em stake na rede. A DVT pode permitir que esses operadores existam enquanto preserva a descentralização do stake. Isso ocorre porque as chaves de cada validador são distribuídas em muitas máquinas e seria necessário um conluio muito maior para que um validador se tornasse malicioso.

Sem a DVT, é mais fácil para os provedores de staking suportarem apenas uma ou duas configurações de cliente para todos os seus validadores, aumentando o impacto de um bug no cliente. A DVT pode ser usada para espalhar o risco por várias configurações de cliente e hardwares diferentes, criando resiliência por meio da diversidade.

**A DVT oferece os seguintes benefícios para a Ethereum:**

1. **Descentralização** do consenso de Prova de Participação (PoS) da Ethereum
2. Garante a **vivacidade** (liveness) da rede
3. Cria **tolerância a falhas** do validador
4. Operação de validador com **confiança minimizada**
5. Riscos de **penalização** e tempo de inatividade minimizados
6. **Melhora a diversidade** (cliente, data center, localização, regulamentação, etc.)
7. **Segurança aprimorada** do gerenciamento de chaves do validador

## Como a DVT funciona? {#how-does-dvt-work}

Uma solução DVT contém os seguintes componentes:

- **[Compartilhamento de segredos de Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Os validadores usam [chaves BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). As "partes de chave" ("key shares") BLS individuais podem ser combinadas em uma única chave agregada (assinatura). Na DVT, a chave privada de um validador é a assinatura BLS combinada de cada operador no cluster.
- **[Esquema de assinatura de limite (Threshold signature scheme)](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Determina o número de partes de chave individuais que são necessárias para as tarefas de assinatura, por exemplo, 3 de 4.
- **[Geração de chave distribuída (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Processo criptográfico que gera as partes da chave e é usado para distribuir as partes de uma chave de validador existente ou nova para os nós em um cluster.
- **[Computação multipartidária (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - A chave completa do validador é gerada em segredo usando computação multipartidária. A chave completa nunca é conhecida por nenhum operador individual — eles só conhecem a sua própria parte dela (a sua "parte" ou "share").
- **Protocolo de consenso** - O protocolo de consenso seleciona um nó para ser o propositor de bloco. Eles compartilham o bloco com os outros nós no cluster, que adicionam suas partes de chave à assinatura agregada. Quando partes de chave suficientes tiverem sido agregadas, o bloco é proposto na Ethereum.

Os validadores distribuídos têm tolerância a falhas integrada e podem continuar funcionando mesmo se alguns dos nós individuais ficarem offline. Isso significa que o cluster é resiliente mesmo se alguns dos nós dentro dele se revelarem maliciosos ou preguiçosos.

## Casos de uso da DVT {#dvt-use-cases}

A DVT tem implicações significativas para a indústria de staking em geral:

### Stakers solo {#solo-stakers}

A DVT também permite o staking não custodial, permitindo que você distribua sua chave de validador em nós remotos enquanto mantém a chave completa totalmente offline. Isso significa que os stakers domésticos não precisam necessariamente gastar com hardware, enquanto a distribuição das partes da chave pode ajudar a fortalecê-los contra possíveis hacks.

### Staking como serviço (SaaS) {#saas}

Operadores (como pools de staking e stakers institucionais) que gerenciam muitos validadores podem usar a DVT para reduzir seus riscos. Ao distribuir sua infraestrutura, eles podem adicionar redundância às suas operações e diversificar os tipos de hardware que usam.

A DVT compartilha a responsabilidade pelo gerenciamento de chaves em vários nós, o que significa que alguns custos operacionais também podem ser compartilhados. A DVT também pode reduzir o risco operacional e os custos de seguro para provedores de staking.

### Pools de staking {#staking-pools}

Devido às configurações padrão do validador, os pools de staking e os provedores de staking líquido são obrigados a ter níveis variados de confiança em um único operador, uma vez que os ganhos e perdas são socializados em todo o pool. Eles também dependem dos operadores para proteger as chaves de assinatura porque, até agora, não havia outra opção para eles.

Embora tradicionalmente sejam feitos esforços para espalhar o risco distribuindo os stakes entre vários operadores, cada operador ainda gerencia um stake significativo de forma independente. Depender de um único operador apresenta riscos imensos se ele tiver um desempenho inferior, encontrar tempo de inatividade, for comprometido ou agir de forma maliciosa.

Ao aproveitar a DVT, a confiança exigida dos operadores é significativamente reduzida. **Os pools podem permitir que os operadores mantenham stakes sem precisar da custódia das chaves do validador** (pois apenas as partes da chave são utilizadas). Isso também permite que os stakes gerenciados sejam distribuídos entre mais operadores (por exemplo, em vez de ter um único operador gerenciando 1000 validadores, a DVT permite que esses validadores sejam executados coletivamente por vários operadores). Configurações diversas de operadores garantirão que, se um operador cair, os outros ainda poderão atestar. Isso resulta em redundância e diversificação que levam a um melhor desempenho e resiliência, ao mesmo tempo em que maximizam as recompensas.

Outro benefício de minimizar a confiança em um único operador é que os pools de staking podem permitir uma participação de operador mais aberta e não permissionada. Ao fazer isso, os serviços podem reduzir seus riscos e apoiar a descentralização da Ethereum usando conjuntos de operadores curados e não permissionados, por exemplo, emparelhando stakers domésticos ou menores com os maiores.

## Possíveis desvantagens do uso da DVT {#potential-drawbacks-of-using-dvt}

- **Componente adicional** - a introdução de um nó DVT adiciona outra parte que pode ser defeituosa ou vulnerável. Uma maneira de mitigar isso é buscar várias implementações de um nó DVT, o que significa vários clientes DVT (da mesma forma que existem vários clientes para as camadas de consenso e execução).
- **Custos operacionais** - como a DVT distribui o validador entre várias partes, são necessários mais nós para a operação em vez de apenas um único nó, o que introduz custos operacionais maiores.
- **Latência potencialmente aumentada** - como a DVT utiliza um protocolo de consenso para alcançar o consenso entre os vários nós que operam um validador, ela pode potencialmente introduzir maior latência.

## Leitura adicional {#further-reading}

- [Especificações do validador distribuído da Ethereum (alto nível)](https://github.com/ethereum/distributed-validator-specs)
- [Especificações técnicas do validador distribuído da Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Aplicativo de demonstração de compartilhamento de segredos de Shamir](https://iancoleman.io/shamir/)