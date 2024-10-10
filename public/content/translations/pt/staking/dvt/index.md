---
title: Tecnologia de validação distribuída
description: A tecnologia de validador distribuído permite a operação distribuída de um validador Ethereum por múltiplos intervenientes.
lang: pt
---

# Tecnologia de validação distribuída {#distributed-validator-technology}

A tecnologia de validador distribuído (DVT) é uma abordagem à segurança de validadores que distribui a gestão de chaves e as responsabilidades de assinaturas por várias partes, para reduzir os pontos únicos de falha e aumentar a resiliência do validador.

Isso é feito através da **divisão da chave privada** usada para proteger um validador **entre vários computadores** organizados num "cluster". A vantagem deste procedimento é que torna muito difícil para os hackers acederem à chave, uma vez que esta não é armazenada na sua totalidade num único computador. Também permite que alguns nós estejam offline, uma vez que a assinatura necessária pode ser executada por um subconjunto de computadores em cada cluster. Isto reduz os pontos únicos de falha da rede e torna todo o conjunto de validadores mais robusto.

![Diagrama que mostra como uma única chave de validação é dividida em frações de chave e distribuída por vários nós com componentes variáveis.](./dvt-cluster.png)

## Porque é que precisamos da DVT? {#why-do-we-need-dvt}

### Segurança {#security}

Os validadores geram dois pares de chaves público-privadas: chaves de validador para participar no consenso e chaves de levantamentos para aceder aos fundos. Enquanto os validadores podem guardar as chaves de levantamento em armazenamento seguro, as chaves privadas dos validadores devem estar online 24 horas por dia, 7 dias por semana. Se uma chave privada de validador for comprometida, um invasor pode controlar o validador, potencialmente levando ao corte ou à perda do ETH do staker. A DVT pode ajudar a mitigar este risco. Eis como:

Ao utilizar o DVT, os stakers podem participar no staking enquanto mantêm a chave privada do validador em armazenamento seguro. Isto é conseguido encriptando a chave original completa do validador e depois dividindo-a em partes da chave. As partilhas de chaves permanece online e é distribuído para vários nós, o que permite a operação distribuída do validador. Isto é possível porque os validadores Ethereum utilizam assinaturas BLS que são aditivas, o que significa que a chave completa pode ser reconstruída através da soma das suas fracções. Isto permite que o staker mantenha a chave de validação 'mestre' original completa e segura offline.

### Sem pontos únicos de falha {#no-single-point-of-failure}

Quando um validador é dividido por vários operadores e diferentes computadores, pode resistir a falhas individuais de hardware e software sem ficar offline. O risco de falhas também pode ser reduzido através da utilização de diferentes configurações de hardware e software nos nós de um cluster. Esta resiliência não está disponível para as configurações de validadores de nó único - provém da camada DVT.

Se um dos componentes de um computador de um cluster se avariar (por exemplo, se houver quatro operadores num cluster de validadores e um deles utilizar um cliente específico que tenha um bug), os outros garantem que o validador continua a funcionar.

### Descentralização {#decentralization}

O cenário ideal para a Ethereum é ter o maior número possível de validadores operados de forma independente. No entanto, alguns fornecedores de staking tornaram-se muito populares e representam uma parte substancial do total de ETH em staking na rede. O DVT possibilita a existência desses operadores, preservando a descentralização da participação. Isto deve-se ao facto de as chaves de cada validador estarem distribuídas por múltiplos computadores e seria necessário um consenso muito maior para que um validador se tornasse malicioso.

Sem o DVT, é mais fácil para os fornecedores de staking suportarem apenas uma ou duas configurações de cliente para todos os seus validadores, o que aumenta o impacto de um bug de cliente. O DVT pode ser usado para distribuir o risco por várias configurações de clientes e hardware diferente, criando resiliência através da diversidade.

**O DVT oferece os seguintes benefícios ao Ethereum:**

1. **Descentralização** do consenso de prova de participação da Ethereum
2. Garante a **vitalidade** da rede
3. Cria um validador **com tolerância a falhas**
4. **Operação de validação de confiança minimizada**
5. **Minimização dos riscos de interrupção** e de inatividade
6. **Aumenta a diversidade** (cliente, datacenter, localização, regulamentação, etc.)
7. **Segurança reforçada** da gestão das chaves do validador

## Como é que a TVP funciona? {#how-does-dvt-work}

Uma solução de DVT contém os seguintes componentes:

- **[Shamir's secret sharing](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Os validadores usam [chaves BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). As "chaves primárias" individuais da BLS ("key shares") podem ser combinadas numa única chave agregada (assinatura). No DVT, a chave privada de um validador é a assinatura BLS combinada de cada operador do cluster.
- **[Threshold signature scheme](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Determina o número mínimo de frações da chave que são necessárias para assinar tarefas, por exemplo, 3 em 4.
- **[Distributed key generation (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Processo criptográfico que gera as partilhas das chaves e é utilizado para distribuir as partilhas de uma chave de validação existente ou nova pelos nós de um cluster.
- **[Multiparty computation (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - A chave completa do validador é gerada em segredo utilizando a computação por múltiplos participantes. A chave completa nunca é conhecida por nenhum dos operadores individuais - apenas conhecem a sua própria parte (a sua "quota").
- **Consensus protocol** - O protocolo de consenso selecciona um nó para ser o proponente do bloco. Partilham o bloco com os outros nós do cluster, que adicionam as suas partes da chave à assinatura agregada. Quando um número suficiente de partes da chave tiver sido agregado, o bloco é proposto na Ethereum.

Os validadores distribuídos têm tolerância a falhas incorporada e podem continuar a funcionar mesmo que alguns dos nós individuais fiquem offline. Isto significa que o cluster é resiliente, mesmo que alguns dos seus nós sejam maliciosos ou ineficazes.

## Casos de utilização de DVT {#dvt-use-cases}

A DVT tem implicações significativas para o sector de staking em geral:

### Stakers individuais {#solo-stakers}

O DVT também permite o staking sem custódia, permitindo-lhe distribuir a chave de validação por nós remotos, mantendo a chave completa completamente offline. Isto significa que os stakers domésticos não precisam necessariamente de gastar mais em hardware, enquanto a distribuição das partilhas de chaves pode ajudar a fortalecê-los contra potenciais ataques informáticos.

### Staking as a service (SaaS) {#saas}

Os operadores (tais como pools de staking e stakers institucionais) que gerem muitos validadores podem utilizar o DVT para reduzir o seu risco. Ao distribuir a sua infraestrutura, podem acrescentar redundância às suas operações e diversificar o tipo de hardware que utilizam.

O DVT partilha a responsabilidade pela gestão de chaves entre múltiplos nós, o que significa que alguns custos operacionais também podem ser partilhados. O DVT pode também reduzir o risco operacional e os custos com seguros para os fornecedores de staking.

### Staking pools {#staking-pools}

Devido às configurações padrão do validador, os pools de staking e os fornecedores de staking líquido são obrigados a ter níveis variáveis de confiança de um único operador, uma vez que os ganhos e perdas são socializados em toda a pool. Além disso, dependem dos operadores para salvaguardar as chaves de assinatura porque, até agora, não tinham outra opção.

Embora tradicionalmente sejam feitos esforços para repartir o risco através da distribuição dos stakings por vários operadores, cada operador continua a gerir uma participação significativa de forma independente. Confiar num único operador apresenta riscos imensos se o seu desempenho for inferior ao esperado, se houver tempo de inatividade, se ficar comprometido ou se agir de forma maliciosa.

Ao tirar partido do DVT, a confiança exigida aos operadores é significativamente reduzida. **As pools podem permitir que os operadores detenham participações sem necessitarem da custódia de chaves de validação** (uma vez que apenas são utilizadas partes de chaves). Também permite que os stakes geridos sejam distribuídos por mais operadores (por exemplo, em vez de ter um único operador a gerir 1000 validadores, o DVT permite que esses validadores sejam geridos coletivamente por diversos operadores). A existência de diversas configurações de operadores garante que, em caso de avaria de um operador, os outros continuarão a poder atestar. Isto resulta em redundância e diversificação que conduzem a um melhor desempenho e resiliência, maximizando simultaneamente as recompensas.

Outra vantagem de minimizar a confiança de um único operador é que as pools de staking podem permitir uma participação mais aberta e sem necessidade de permissão do operador. Ao fazê-lo, os serviços podem reduzir o seu risco e apoiar a descentralização do Ethereum, utilizando conjuntos de operadores com e sem permissões, por exemplo, emparelhando stakers domésticos ou mais pequenos com stakers maiores.

## Potenciais desvantagens da utilização da DVT {#potential-drawbacks-of-using-dvt}

- **Componente adicional** - a introdução de um nó de DVT acrescenta outra parte que pode eventualmente estar deficiente ou vulnerável. Uma forma de atenuar este problema é procurar ter várias implementações de um nó DVT, o que significa vários clientes DVT (da mesma forma que existem vários clientes para as camadas de consenso e de execução).
- **Custos operacionais** - uma vez que o DVT distribui o validador entre várias partes, são necessários mais nós para o funcionamento, em vez de um único nó, o que aumenta os custos operacionais.
- **Aumento potencial da latência** - uma vez que o DVT utiliza um protocolo de consenso para obter esse consenso entre os vários nós que operam um validador, pode potencialmente introduzir um aumento da latência.

## Leitura adicional {#further-reading}

- [Especificações do validador distribuído Ethereum (alto nível)](https://github.com/ethereum/distributed-validator-specs)
- [Especificações técnicas do validador distribuído Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Aplicação Shamir de demonstração da partilha de chaves privadas](https://iancoleman.io/shamir/)
