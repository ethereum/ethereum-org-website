---
title: Tecnologia de validador distribuído
description: A tecnologia de validador distribuído permite a operação distribuída de um validador Ethereum por diversas partes.
lang: pt-br
---

# Tecnologia de validador distribuído {#distributed-validator-technology}

A tecnologia de validador distribuído (DVT) é uma abordagem à segurança do validador que distribui as responsabilidades de assinatura e gerenciamento de chaves entre diversas partes para reduzir pontos únicos de falha e aumentar a resiliência do validador.

Ela faz isso ao **dividir a chave privada** usada para proteger um validador **em muitos computadores** organizados em um "cluster". A vantagem disso é que fica muito difícil para os invasores obterem acesso à chave, pois ela não é armazenada integralmente em um único computador. Ele também permite que alguns nós fiquem offline, pois a assinatura necessária pode ser feita por um subconjunto de computadores em cada cluster. Isso reduz os pontos únicos de falha da rede e faz com que todo o conjunto de validadores seja mais eficiente.

![Um diagrama mostrando como uma única chave do validador é dividida em compartilhamentos de chaves e distribuída a diversos nós com componentes variados.](./dvt-cluster.png)

## Por que precisamos de DVT? {#why-do-we-need-dvt}

### Segurança {#security}

Os validadores geram dois pares de chaves público-privadas: chaves de validador para participar do consenso e chaves de saque para acessar os fundos. Embora os validadores possam proteger as chaves de saque em armazenamento a frio, as chaves privadas do validador devem estar online 24 horas por dia, 7 dias por semana. Se uma chave privada do validador for comprometida, um invasor poderá controlar o validador, o que pode causar o corte ou a perda da ETH do participante. A DVT pode ajudar a mitigar esse risco. Veja como:

Ao usar o DVT, os stakers podem participar da participação e, ao mesmo tempo, manter a chave privada do validador em um armazenamento a frio. Isso é feito por meio da criptografia da chave original e completa do validador e, em seguida, dividindo-a em compartilhamentos de chave. Os compartilhamentos de chaves ficam online e são distribuídos a diversos nós, o que permite a operação distribuída do validador. Isso é possível porque os validadores Ethereum utilizam assinaturas BLS que são aditivas, o que significa que a chave completa pode ser reconstruída pela soma das respectivas partes componentes. Isso permite que o participante mantenha a chave validadora "mestre" original completa e segura offline.

### Sem pontos únicos de falha {#no-single-point-of-failure}

Quando um validador é dividido entre diversos operadores e vários computadores, ele pode resistir a falhas individuais de hardware e software sem ficar offline. Também é possível reduzir o risco de falhas ao utilizar diversas configurações de hardware e software nos nós de um cluster. Essa resiliência não está disponível para configurações de validador de um único nó, pois deriva da camada DVT.

Se um dos componentes de um computador em um cluster ficar inoperante (por exemplo, se houver quatro operadores em um cluster de validadores e um deles utilizar um cliente específico com um bug), os outros garantem que o validador continue funcionando.

### Descentralização {#decentralization}

O cenário ideal para o Ethereum é ter o maior número possível de validadores operados de maneira independente. Entretanto, alguns provedores de participação se tornaram muito populares e respondem por uma parte considerável do total de ETH em participação na rede. A DVT pode permitir a existência desses operadores e, ao mesmo tempo, manter a descentralização da participação. Isso ocorre porque as chaves de cada validador são distribuídas em diversos computadores e seria necessária uma conspiração muito maior para que um validador se tornasse mal-intencionado.

Sem a DVT, é mais fácil para os provedores de participação oferecerem suporte a apenas uma ou duas configurações de cliente a todos os validadores, o que aumenta o impacto de um bug no cliente. A DVT pode ser utilizada para distribuir o risco entre diversas configurações de clientes e diferentes hardwares, criando resiliência por meio da diversidade.

**A DVT oferece os seguintes benefícios ao Ethereum:**

1. **Descentralização** do consenso da prova de participação do Ethereum
2. Garante a **vivacidade** da rede
3. Cria a **tolerância a falhas** do validador
4. **Operação do validador** com confiança minimizada
5. Riscos **minimizados de remoção** e tempo de inatividade
6. **Melhora a diversidade** (cliente, centro de dados, localização, regulação etc.)
7. **Segurança aprimorada** do gerenciamento de chaves do validador

## Como a DVT funciona? {#how-does-dvt-work}

Uma solução DVT contém os seguintes componentes:

- **[Compartilhamento secreto Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Os validadores utilizam [chaves BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). O "compartilhamento de chaves" BLS individuais ("key shares") pode ser combinado em uma única chave agregada (assinatura). Na DVT, a chave privada de um validador é a assinatura BLS combinada de cada operador no cluster.
- **[O esquema de assinatura com limite](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Determina o número de compartilhamentos de chaves individuais que são necessárias para funções de assinatura, por exemplo, 3 de 4.
- **[Geração distribuída de chaves (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Processo criptográfico que gera os compartilhamentos de chaves e é usado para distribuir os compartilhamentos de uma chave do validador existente ou nova para os nós em um cluster.
- **[Computação multipartidária (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - A chave completa do validador é gerada em segredo por meio de computação multipartidária. A chave completa nunca é conhecida por nenhum operador individual, cada validador conhece apenas a sua própria parte dela (o "compartilhamento").
- **Protocolo de consenso** - O protocolo de consenso seleciona um nó para ser o proponente do bloco. Eles compartilham o bloco com os outros nós do cluster, que adicionam seus compartilhamentos de chave à assinatura agregada. Após a agregação de um número suficiente de compartilhamentos de chaves, o bloco é proposto no Ethereum.

Os validadores distribuídos têm tolerância a falhas incorporada e podem continuar funcionando mesmo com alguns dos nós individuais offline. Isso significa que o cluster é resiliente mesmo que alguns dos nós sejam mal-intencionados ou preguiçosos.

## Casos de uso de DVT {#dvt-use-cases}

A DVT tem implicações significativas para o setor mais amplo de participação:

### Participantes (stakers) individuais {#solo-stakers}

A DVT também possibilita a participação sem custódia, o que permitindo distribuir a chave do validador entre nós remotos, mantendo a chave completa completamente offline. Isso significa que os participantes internos não precisam necessariamente investir em hardware, enquanto a distribuição dos compartilhamentos de chaves pode ajudar a fortalecê-los contra possíveis hacks.

### Participação como Serviço (SaaS) {#saas}

Os operadores (como pools de participação e participantes institucionais) que gerenciam muitos validadores podem utilizar a DVT para reduzir o risco. Ao distribuir a infraestrutura, eles podem adicionar redundância às operações e diversificar os tipos de hardware utilizado.

A DVT compartilha a responsabilidade pelo gerenciamento de chaves em diversos nós, ou seja, alguns custos operacionais também podem ser compartilhados. A DVT também pode reduzir o risco operacional e os custos de seguro para os provedores de participação.

### Pools de participação (staking) {#staking-pools}

Devido às configurações padrão dos validadores, os pools de participação e os provedores de participação líquida têm a obrigação de ter níveis variados de confiança em um único operador, uma vez que os ganhos e as perdas são socializados em todo o pool. Também dependem dos operadores para proteger as chaves de assinatura porque, até agora, não havia outra opção disponível.

Embora tradicionalmente sejam feitos esforços para distribuir o risco por meio da distribuição de participações entre diversos operadores, cada operador ainda gerencia uma participação considerável de maneira independente. Depender de um único operador representa riscos imensos se o desempenho for abaixo do esperado, se enfrentar um período de inatividade, se for comprometido ou agir de maneira mal-intencionada.

Ao utilizar a DVT, a confiança exigida dos operadores reduz consideravelmente. **Os pools podem permitir que os operadores mantenham participações sem a necessidade de custódia de chaves de validador** (pois apenas os compartilhamentos da chave são utilizados). Também permite que as participações gerenciadas sejam distribuídas entre mais operadores (por exemplo, em vez de um único operador gerenciar mil validadores, a DVT permite que esses validadores sejam executados coletivamente por diversos operadores). Diversas configurações de operador garantirão que, se um operador ficar inoperante, os outros ainda poderão atestar. Isso resulta em redundância e diversificação, o que permite um melhor desempenho e resiliência, ao mesmo tempo em que maximiza as recompensas.

Outra vantagem de minimizar a confiança em um único operador é que os pools de participação podem permitir um envolvimento mais aberto e sem necessidade de permissão do operador. Ao fazer isso, os serviços podem reduzir os riscos e apoiar a descentralização do Ethereum ao utilizar conjuntos de operadores selecionados e sem permissão, por exemplo, ao emparelhar participantes internos ou secundários com participantes maiores.

## Possíveis desvantagens do uso da DVT {#potential-drawbacks-of-using-dvt}

- **Componente adicional** - a introdução de um nó da DVT adiciona outra parte que pode estar com defeito ou vulnerável. Uma forma de atenuar esse problema é buscar várias implementações de um nó da DVT, o que significa vários clientes de DVT (da mesma forma que há vários clientes para as camadas de consenso e execução).
- **Custos operacionais** - como a DVT distribui o validador entre diversas partes, são necessários mais nós para a operação, em vez de apenas um único nó, o que aumenta os custos operacionais.
- **Latência potencialmente maior** - como a DVT utiliza um protocolo de consenso para obter consenso entre os diversos nós que operam um validador, é possível ocorrer um aumento da latência.

## Leitura adicional {#further-reading}

- [Especificações do validador distribuído no Ethereum (detalhadas)](https://github.com/ethereum/distributed-validator-specs)
- [Especificações técnicas do validador distribuído no Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Aplicativo de demonstração de compartilhamento secreto Shamir](https://iancoleman.io/shamir/)
