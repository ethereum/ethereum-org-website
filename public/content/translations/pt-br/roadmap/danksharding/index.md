---
title: Danksharding
description: Aprenda sobre o Proto-Danksharding e o Danksharding - duas atualizações sequenciais para escalar a Ethereum.
lang: pt-br
summaryPoints:
  - O Danksharding é uma atualização em várias fases para melhorar a escalabilidade e a capacidade da Ethereum.
  - A primeira etapa, o Proto-Danksharding, adiciona blobs de dados aos blocos
  - Os blobs de dados oferecem uma maneira mais barata para os rollups publicarem dados na Ethereum e esses custos podem ser repassados aos usuários na forma de taxas de transação mais baixas.
  - Mais tarde, o Danksharding completo distribuirá a responsabilidade de verificar os blobs de dados entre subconjuntos de nós, escalando ainda mais a Ethereum para mais de 100.000 transações por segundo.
---

O **Danksharding** é como a [Ethereum](/) se torna uma blockchain verdadeiramente escalável, mas há várias atualizações de protocolo exigidas para chegar lá. O **Proto-Danksharding** é uma etapa intermediária ao longo do caminho. Ambos visam tornar as transações na camada 2 (l2) o mais baratas possível para os usuários e devem escalar a Ethereum para >100.000 transações por segundo.

## O que é o Proto-Danksharding? {#what-is-protodanksharding}

O Proto-Danksharding, também conhecido como [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), é uma maneira de os [rollups](/layer-2/#rollups) adicionarem dados mais baratos aos blocos. O nome vem dos dois pesquisadores que propuseram a ideia: Protolambda e Dankrad Feist. Historicamente, os rollups eram limitados em quão baratas podiam tornar as transações dos usuários pelo fato de publicarem suas transações em `CALLDATA`.

Isso é caro porque é processado por todos os nós da Ethereum e vive onchain para sempre, mesmo que os rollups precisem dos dados apenas por um curto período. O Proto-Danksharding introduz blobs de dados que podem ser enviados e anexados aos blocos. Os dados nesses blobs não são acessíveis à EVM e são excluídos automaticamente após um período de tempo fixo (definido como 4096 épocas no momento da redação, ou cerca de 18 dias). Isso significa que os rollups podem enviar seus dados de forma muito mais barata e repassar a economia aos usuários finais na forma de transações mais baratas.

<ExpandableCard title="Por que os blobs tornam os rollups mais baratos?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Os rollups são uma maneira de escalar a Ethereum por meio do processamento em lote de transações offchain e, em seguida, publicando os resultados na Ethereum. Um rollup é essencialmente composto por duas partes: dados e verificação de execução. Os dados são a sequência completa de transações que está sendo processada por um rollup para produzir a mudança de estado que está sendo publicada na Ethereum. A verificação de execução é a reexecução dessas transações por algum ator honesto (um "provador") para garantir que a mudança de estado proposta esteja correta. Para realizar a verificação de execução, os dados da transação devem estar disponíveis por tempo suficiente para que qualquer pessoa possa baixar e verificar. Isso significa que qualquer comportamento desonesto por parte do sequenciador do rollup pode ser identificado e contestado pelo provador. No entanto, não precisa estar disponível para sempre.

</ExpandableCard>

<ExpandableCard title="Por que não há problema em excluir os dados do blob?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Os rollups publicam compromissos com seus dados de transação onchain e também disponibilizam os dados reais em blobs de dados. Isso significa que os provadores podem verificar se os compromissos são válidos ou contestar dados que consideram incorretos. No nível do nó, os blobs de dados são mantidos no cliente de consenso. Os clientes de consenso atestam que viram os dados e que eles foram propagados pela rede. Se os dados fossem mantidos para sempre, esses clientes ficariam sobrecarregados e levariam a grandes requisitos de hardware para a execução de nós. Em vez disso, os dados são removidos automaticamente do nó a cada 18 dias. Os atestados do cliente de consenso demonstram que houve oportunidade suficiente para os provadores verificarem os dados. Os dados reais podem ser armazenados offchain por operadores de rollup, usuários ou outros.

</ExpandableCard>

### Como os dados do blob são verificados? {#how-are-blobs-verified}

Os rollups publicam as transações que executam em blobs de dados. Eles também publicam um "compromisso" com os dados. Eles fazem isso ajustando uma função polinomial aos dados. Essa função pode então ser avaliada em vários pontos. Por exemplo, se definirmos uma função extremamente simples `f(x) = 2x-1`, então podemos avaliar essa função para `x = 1`, `x = 2`, `x = 3` dando os resultados `1, 3, 5`. Um provador aplica a mesma função aos dados e a avalia nos mesmos pontos. Se os dados originais forem alterados, a função não será idêntica e, portanto, os valores avaliados em cada ponto também não serão. Na realidade, o compromisso e a prova são mais complicados porque são envolvidos em funções criptográficas.

### O que é KZG? {#what-is-kzg}

KZG significa Kate-Zaverucha-Goldberg - os nomes dos três [autores originais](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) de um esquema que reduz um blob de dados a um pequeno ["compromisso" criptográfico](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html). O blob de dados enviado por um rollup deve ser verificado para garantir que o rollup não esteja se comportando mal. Isso envolve um provador reexecutando as transações no blob para verificar se o compromisso era válido. Isso é conceitualmente o mesmo que a maneira como os clientes de execução verificam a validade das transações da Ethereum na camada 1 (l1) usando provas de Merkle. KZG é uma prova alternativa que ajusta uma equação polinomial aos dados. O compromisso avalia o polinômio em alguns pontos de dados secretos. Um provador ajustaria o mesmo polinômio sobre os dados e o avaliaria nos mesmos valores, verificando se o resultado é o mesmo. Esta é uma maneira de verificar os dados que é compatível com técnicas de conhecimento zero usadas por alguns rollups e, eventualmente, outras partes do protocolo Ethereum.

### O que foi a Cerimônia KZG? {#what-is-a-kzg-ceremony}

A cerimônia KZG foi uma maneira de muitas pessoas de toda a comunidade Ethereum gerarem coletivamente uma sequência aleatória secreta de números que pode ser usada para verificar alguns dados. É muito importante que essa sequência de números não seja conhecida e não possa ser recriada por ninguém. Para garantir isso, cada pessoa que participou da cerimônia recebeu uma sequência do participante anterior. Eles então criaram alguns novos valores aleatórios (por exemplo, permitindo que seu navegador medisse o movimento do mouse) e os misturaram com o valor anterior. Eles então enviaram o valor para o próximo participante e o destruíram de sua máquina local. Contanto que uma pessoa na cerimônia tenha feito isso honestamente, o valor final será incognoscível para um invasor.

A cerimônia KZG da EIP-4844 foi aberta ao público e dezenas de milhares de pessoas participaram para adicionar sua própria entropia (aleatoriedade). No total, houve mais de 140.000 contribuições, tornando-a a maior cerimônia do gênero no mundo. Para que a cerimônia fosse comprometida, 100% desses participantes teriam que ser ativamente desonestos. Da perspectiva dos participantes, se eles sabem que foram honestos, não há necessidade de confiar em mais ninguém porque eles sabem que garantiram a cerimônia (eles satisfizeram individualmente o requisito de 1 em N participantes honestos).

<ExpandableCard title="Para que serve o número aleatório da cerimônia KZG?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Quando um rollup publica dados em um blob, ele fornece um "compromisso" que publica onchain. Esse compromisso é o resultado da avaliação de um ajuste polinomial aos dados em determinados pontos. Esses pontos são definidos pelos números aleatórios gerados na cerimônia KZG. Os provadores podem então avaliar o polinômio nos mesmos pontos para verificar os dados - se chegarem aos mesmos valores, os dados estão corretos.

</ExpandableCard>

<ExpandableCard title="Por que os dados aleatórios KZG precisam permanecer secretos?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Se alguém conhece os locais aleatórios usados para o compromisso, é fácil gerar um novo polinômio que se ajuste a esses pontos específicos (ou seja, uma "colisão"). Isso significa que eles poderiam adicionar ou remover dados do blob e ainda fornecer uma prova válida. Para evitar isso, em vez de dar aos provadores os locais secretos reais, eles recebem os locais envolvidos em uma "caixa preta" criptográfica usando curvas elípticas. Elas efetivamente embaralham os valores de tal forma que os valores originais não podem ser submetidos à engenharia reversa, mas com um pouco de álgebra inteligente, provadores e verificadores ainda podem avaliar polinômios nos pontos que representam.

</ExpandableCard>

<Alert variant="warning">
  Nem o Danksharding nem o Proto-Danksharding seguem o modelo tradicional de "sharding" que visa dividir a blockchain em várias partes. As cadeias de fragmentos não fazem mais parte do roteiro. Em vez disso, o Danksharding usa amostragem de dados distribuída em blobs para escalar a Ethereum. Isso é muito mais simples de implementar. Esse modelo às vezes tem sido chamado de "data-sharding" (fragmentação de dados).
</Alert>

## O que é o Danksharding? {#what-is-danksharding}

O Danksharding é a realização completa da escalabilidade de rollup que começou com o Proto-Danksharding. O Danksharding trará quantidades enormes de espaço na Ethereum para que os rollups descarreguem seus dados de transação compactados. Isso significa que a Ethereum será capaz de suportar centenas de rollups individuais com facilidade e tornar milhões de transações por segundo uma realidade.

A maneira como isso funciona é expandindo os blobs anexados aos blocos de seis (6) no Proto-Danksharding para 64 no Danksharding completo. O restante das alterações exigidas são todas atualizações na maneira como os clientes de consenso operam para permitir que eles lidem com os novos blobs grandes. Várias dessas alterações já estão no roteiro para outros fins independentes do Danksharding. Por exemplo, o Danksharding exige que a separação propositor-construtor (PBS) tenha sido implementada. Esta é uma atualização que separa as tarefas de construção de blocos e proposição de blocos entre diferentes validadores. Da mesma forma, a amostragem de disponibilidade de dados é exigida para o Danksharding, mas também é exigida para o desenvolvimento de clientes muito leves que não armazenam muitos dados históricos ("clientes sem estado").

<ExpandableCard title="Por que o danksharding exige a separação propositor-construtor?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

A separação propositor-construtor (PBS) é exigida para evitar que validadores individuais tenham que gerar compromissos e provas caros para 32 MB de dados de blob. Isso colocaria muita pressão sobre os stakers domésticos e exigiria que eles investissem em hardware mais poderoso, o que prejudica a descentralização. Em vez disso, construtores de blocos especializados assumem a responsabilidade por esse trabalho computacional caro. Em seguida, eles disponibilizam seus blocos para os propositores de bloco transmitirem. O propositor de bloco simplesmente escolhe o bloco que é mais lucrativo. Qualquer pessoa pode verificar os blobs de forma barata e rápida, o que significa que qualquer validador normal pode verificar se os construtores de blocos estão se comportando honestamente. Isso permite que os grandes blobs sejam processados sem sacrificar a descentralização. Construtores de blocos que se comportam mal poderiam simplesmente ser ejetados da rede e sofrer penalização - outros assumirão o lugar deles porque a construção de blocos é uma atividade lucrativa.

</ExpandableCard>

<ExpandableCard title="Por que o danksharding exige a amostragem de disponibilidade de dados?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

A amostragem de disponibilidade de dados é exigida para que os validadores verifiquem os dados do blob de forma rápida e eficiente. Usando a amostragem de disponibilidade de dados, os validadores podem ter muita certeza de que os dados do blob estavam disponíveis e foram comprometidos corretamente. Cada validador pode amostrar aleatoriamente apenas alguns pontos de dados e criar uma prova, o que significa que nenhum validador precisa verificar o blob inteiro. Se algum dado estiver faltando, ele será identificado rapidamente e o blob será rejeitado.

</ExpandableCard>

### Progresso atual {#current-progress}

O Danksharding completo está a vários anos de distância. Enquanto isso, a cerimônia KZG foi concluída com mais de 140.000 contribuições, e a [EIP](https://eips.ethereum.org/EIPS/eip-4844) para o Proto-Danksharding amadureceu. Esta proposta foi totalmente implementada em todas as redes de teste e entrou no ar na Mainnet com a atualização de rede Cancun-Deneb ("Dencun") em março de 2024.

### Leitura adicional {#further-reading}

- [Notas sobre o Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Notas de Dankrad sobre o Danksharding](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto e Vitalik discutem o Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [A cerimônia KZG](https://ceremony.ethereum.org/)
- [Palestra de Carl Beekhuizen na Devcon sobre configurações confiáveis](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Mais sobre amostragem de disponibilidade de dados para blobs](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist sobre compromissos e provas KZG](https://youtu.be/8L2C6RDMV9Q)
- [Compromissos polinomiais KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)