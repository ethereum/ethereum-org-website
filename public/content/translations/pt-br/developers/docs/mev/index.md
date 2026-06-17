---
title: Valor máximo extraível (MEV)
description: Uma introdução ao valor máximo extraível (MEV)
lang: pt-br
---

O valor máximo extraível (MEV) refere-se ao valor máximo que pode ser extraído da produção de blocos além da recompensa de bloco padrão e das taxas de gas, incluindo, excluindo e alterando a ordem das transações em um bloco.

## Valor máximo extraível {#maximal-extractable-value}

O valor máximo extraível foi aplicado pela primeira vez no contexto da [Prova de Trabalho (PoW)](/developers/docs/consensus-mechanisms/pow/) e inicialmente referido como "valor extraível do minerador". Isso ocorre porque, na Prova de Trabalho, os mineradores controlam a inclusão, exclusão e ordenação de transações. No entanto, desde a transição para a Prova de Participação (PoS) via [The Merge](/roadmap/merge), os validadores têm sido responsáveis por essas funções, e a mineração não faz mais parte do protocolo [Ethereum](/). Os métodos de extração de valor ainda existem, no entanto, então o termo "Valor máximo extraível" agora é usado em seu lugar.

## Pré-requisitos {#prerequisites}

Certifique-se de estar familiarizado com [transações](/developers/docs/transactions/), [blocos](/developers/docs/blocks/), [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos) e [gás](/developers/docs/gas/). Familiaridade com [aplicativos descentralizados (dapps)](/apps/) e [finanças descentralizadas (DeFi)](/defi/) também é útil.

## Extração de MEV {#mev-extraction}

Na teoria, o MEV acumula-se inteiramente para os validadores porque eles são a única parte que pode garantir a execução de uma oportunidade de MEV lucrativa. Na prática, no entanto, uma grande parte do MEV é extraída por participantes independentes da rede chamados de "buscadores". Os buscadores executam algoritmos complexos em dados da blockchain para detectar oportunidades lucrativas de MEV e têm bots para enviar automaticamente essas transações lucrativas para a rede.

Os validadores recebem uma parte do valor total do MEV de qualquer maneira, porque os buscadores estão dispostos a pagar altas taxas de gas (que vão para o validador) em troca de uma maior probabilidade de inclusão de suas transações lucrativas em um bloco. Supondo que os buscadores sejam economicamente racionais, a taxa de gas que um buscador está disposto a pagar será um valor de até 100% do MEV do buscador (porque se a taxa de gas fosse maior, o buscador perderia dinheiro).

Com isso, para algumas oportunidades de MEV altamente competitivas, como a [arbitragem em DEX](#mev-examples-dex-arbitrage), os buscadores podem ter que pagar 90% ou até mais de sua receita total de MEV em taxas de gas para o validador, porque muitas pessoas querem executar a mesma negociação de arbitragem lucrativa. Isso ocorre porque a única maneira de garantir que sua transação de arbitragem seja executada é se eles enviarem a transação com o preço do gás mais alto.

### Gas golfing {#mev-extraction-gas-golfing}

Essa dinâmica fez com que ser bom em "gas golfing" — programar transações para que usem a menor quantidade de gás — seja uma vantagem competitiva, porque permite que os buscadores definam um preço do gás mais alto, mantendo suas taxas de gas totais constantes (já que taxas de gas = preço do gás \* gás usado).

Algumas técnicas conhecidas de gas golf incluem: usar endereços que começam com uma longa sequência de zeros (por exemplo, [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)), pois ocupam menos espaço (e, portanto, gás) para armazenar; e deixar pequenos saldos de tokens [ERC-20](/developers/docs/standards/tokens/erc-20/) em contratos, já que custa mais gás inicializar um slot de armazenamento (o caso se o saldo for 0) do que atualizar um slot de armazenamento. Encontrar mais técnicas para reduzir o uso de gás é uma área ativa de pesquisa entre os buscadores.

### Frontrunners generalizados {#mev-extraction-generalized-frontrunners}

Em vez de programar algoritmos complexos para detectar oportunidades lucrativas de MEV, alguns buscadores executam frontrunners generalizados. Frontrunners generalizados são bots que observam a mempool para detectar transações lucrativas. O frontrunner copiará o código da transação potencialmente lucrativa, substituirá os endereços pelo endereço do frontrunner e executará a transação localmente para verificar se a transação modificada resulta em lucro para o endereço do frontrunner. Se a transação for de fato lucrativa, o frontrunner enviará a transação modificada com o endereço substituído e um preço do gás mais alto, antecipando-se ("frontrunning") à transação original e obtendo o MEV do buscador original.

### Flashbots {#mev-extraction-flashbots}

Flashbots é um projeto independente que estende os clientes de execução com um serviço que permite aos buscadores enviar transações de MEV aos validadores sem revelá-las à mempool pública. Isso evita que as transações sofram frontrun por frontrunners generalizados.

## Exemplos de MEV {#mev-examples}

O MEV surge na blockchain de algumas maneiras.

### Arbitragem em DEX {#mev-examples-dex-arbitrage}

A arbitragem em [corretoras descentralizadas](/glossary/#dex) (DEX) é a oportunidade de MEV mais simples e conhecida. Como resultado, também é a mais competitiva.

Funciona assim: se duas DEXes estão oferecendo um token a dois preços diferentes, alguém pode comprar o token na DEX de preço mais baixo e vendê-lo na DEX de preço mais alto em uma única transação atômica. Graças à mecânica da blockchain, esta é uma arbitragem verdadeira e sem riscos.

[Aqui está um exemplo](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) de uma transação de arbitragem lucrativa onde um buscador transformou 1.000 ETH em 1.045 ETH aproveitando os diferentes preços do par ETH/DAI no Uniswap em comparação com o Sushiswap.

### Liquidações {#mev-examples-liquidations}

As liquidações de protocolos de empréstimo apresentam outra oportunidade de MEV bem conhecida.

Protocolos de empréstimo como Maker e Aave exigem que os usuários depositem algum colateral (por exemplo, ETH). Esse colateral depositado é então usado para emprestar a outros usuários.

Os usuários podem então tomar emprestado ativos e tokens de outros, dependendo do que precisam (por exemplo, você pode tomar emprestado MKR se quiser votar em uma proposta de governança da MakerDAO) até uma certa porcentagem de seu colateral depositado. Por exemplo, se o valor do empréstimo for no máximo 30%, um usuário que deposita 100 DAI no protocolo pode tomar emprestado até 30 DAI em outro ativo. O protocolo determina a porcentagem exata do poder de empréstimo.

À medida que o valor do colateral de um mutuário flutua, o mesmo ocorre com seu poder de empréstimo. Se, devido a flutuações do mercado, o valor dos ativos tomados emprestados exceder, digamos, 30% do valor de seu colateral (novamente, a porcentagem exata é determinada pelo protocolo), o protocolo normalmente permite que qualquer pessoa liquide o colateral, pagando instantaneamente os credores (isso é semelhante a como as [chamadas de margem](https://www.investopedia.com/terms/m/margincall.asp) funcionam nas finanças tradicionais). Se liquidado, o mutuário geralmente tem que pagar uma pesada taxa de liquidação, parte da qual vai para o liquidador — que é onde entra a oportunidade de MEV.

Os buscadores competem para analisar os dados da blockchain o mais rápido possível para determinar quais mutuários podem ser liquidados e ser os primeiros a enviar uma transação de liquidação e coletar a taxa de liquidação para si mesmos.

### Negociação sanduíche {#mev-examples-sandwich-trading}

A negociação sanduíche é outro método comum de extração de MEV.

Para fazer um sanduíche, um buscador observará a mempool em busca de grandes negociações em DEX. Por exemplo, suponha que alguém queira comprar 10.000 UNI com DAI no Uniswap. Uma negociação dessa magnitude terá um efeito significativo no par UNI/DAI, potencialmente aumentando significativamente o preço do UNI em relação ao DAI.

Um buscador pode calcular o efeito aproximado de preço dessa grande negociação no par UNI/DAI e executar uma ordem de compra ideal imediatamente _antes_ da grande negociação, comprando UNI barato, e então executar uma ordem de venda imediatamente _depois_ da grande negociação, vendendo-o pelo preço mais alto causado pela grande ordem.

Fazer o sanduíche, no entanto, é mais arriscado, pois não é atômico (ao contrário da arbitragem em DEX, conforme descrito acima) e é propenso a um [ataque salmonella](https://github.com/Defi-Cartel/salmonella).

### MEV de NFT {#mev-examples-nfts}

O MEV no espaço de NFTs é um fenômeno emergente e não é necessariamente lucrativo.

No entanto, como as transações de NFT acontecem na mesma blockchain compartilhada por todas as outras transações do Ethereum, os buscadores também podem usar técnicas semelhantes àquelas usadas em oportunidades tradicionais de MEV no mercado de NFTs.

Por exemplo, se houver um lançamento (drop) popular de NFT e um buscador quiser um determinado NFT ou conjunto de NFTs, ele pode programar uma transação de forma a ser o primeiro da fila a comprar o NFT, ou pode comprar todo o conjunto de NFTs em uma única transação. Ou se um NFT for [listado por engano a um preço baixo](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), um buscador pode se antecipar a outros compradores e arrematá-lo por um preço baixo.

Um exemplo proeminente de MEV de NFT ocorreu quando um buscador gastou US$ 7 milhões para [comprar](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs) todos os Cryptopunks no preço mínimo (floor price). Um pesquisador de blockchain [explicou no Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) como o comprador trabalhou com um provedor de MEV para manter sua compra em segredo.

### A cauda longa {#mev-examples-long-tail}

Arbitragem em DEX, liquidações e negociação sanduíche são oportunidades de MEV muito conhecidas e dificilmente serão lucrativas para novos buscadores. No entanto, há uma cauda longa de oportunidades de MEV menos conhecidas (o MEV de NFT é indiscutivelmente uma dessas oportunidades).

Buscadores que estão apenas começando podem encontrar mais sucesso procurando por MEV nesta cauda mais longa. O [quadro de empregos de MEV](https://github.com/flashbots/mev-job-board) da Flashbots lista algumas oportunidades emergentes.

## Efeitos do MEV {#effects-of-mev}

O MEV não é de todo ruim — existem consequências tanto positivas quanto negativas para o MEV no Ethereum.

### O lado bom {#effects-of-mev-the-good}

Muitos projetos de finanças descentralizadas (DeFi) dependem de atores economicamente racionais para garantir a utilidade e a estabilidade de seus protocolos. Por exemplo, a arbitragem em DEX garante que os usuários obtenham os melhores e mais corretos preços para seus tokens, e os protocolos de empréstimo dependem de liquidações rápidas quando os mutuários caem abaixo dos índices de colateralização para garantir que os credores sejam pagos.

Sem buscadores racionais procurando e corrigindo ineficiências econômicas e aproveitando os incentivos econômicos dos protocolos, os protocolos DeFi e os aplicativos descentralizados (dapps) em geral podem não ser tão robustos quanto são hoje.

### O lado ruim {#effects-of-mev-the-bad}

Na camada de aplicação, algumas formas de MEV, como a negociação sanduíche, resultam em uma experiência inequivocamente pior para os usuários. Os usuários que sofrem o sanduíche enfrentam maior derrapagem e pior execução em suas negociações.

Na camada de rede, os frontrunners generalizados e os leilões de preço do gás nos quais eles frequentemente se envolvem (quando dois ou mais frontrunners competem para que sua transação seja incluída no próximo bloco, aumentando progressivamente o preço do gás de suas próprias transações) resultam em congestionamento da rede e altos preços do gás para todos os outros que tentam executar transações regulares.

Além do que está acontecendo _dentro_ dos blocos, o MEV pode ter efeitos deletérios _entre_ os blocos. Se o MEV disponível em um bloco exceder significativamente a recompensa de bloco padrão, os validadores podem ser incentivados a fazer reorg de blocos e capturar o MEV para si mesmos, causando a reorganização da blockchain e instabilidade de consenso.

Essa possibilidade de reorganização da blockchain foi [explorada anteriormente na blockchain do Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). À medida que a recompensa de bloco do Bitcoin cai pela metade e as taxas de transação compõem uma parte cada vez maior da recompensa de bloco, surgem situações em que se torna economicamente racional para os mineradores abrirem mão da recompensa do próximo bloco e, em vez disso, reminerarem blocos passados com taxas mais altas. Com o crescimento do MEV, o mesmo tipo de situação poderia ocorrer no Ethereum, ameaçando a integridade da blockchain.

## Estado do MEV {#state-of-mev}

A extração de MEV disparou no início de 2021, resultando em preços do gás extremamente altos nos primeiros meses do ano. O surgimento do retransmissor (relay) de MEV da Flashbots reduziu a eficácia dos frontrunners generalizados e levou os leilões de preço do gás para offchain, diminuindo os preços do gás para usuários comuns.

Embora muitos buscadores ainda estejam ganhando um bom dinheiro com o MEV, à medida que as oportunidades se tornam mais conhecidas e mais e mais buscadores competem pela mesma oportunidade, os validadores capturarão cada vez mais a receita total de MEV (porque o mesmo tipo de leilões de gás descritos originalmente acima também ocorrem na Flashbots, embora de forma privada, e os validadores capturarão a receita de gás resultante). O MEV também não é exclusivo do Ethereum e, à medida que as oportunidades se tornam mais competitivas no Ethereum, os buscadores estão se mudando para blockchains alternativas como a Binance Smart Chain, onde existem oportunidades de MEV semelhantes às do Ethereum com menos concorrência.

Por outro lado, a transição da Prova de Trabalho (PoW) para a Prova de Participação (PoS) e o esforço contínuo para escalar o Ethereum usando rollups mudam o cenário do MEV de maneiras que ainda são um tanto obscuras. Ainda não se sabe bem como ter propositores de bloco garantidos conhecidos com um pouco de antecedência muda a dinâmica da extração de MEV em comparação com o modelo probabilístico na Prova de Trabalho ou como isso será interrompido quando a [eleição secreta de líder único (SSLE)](https://ethresear.ch/t/secret-non-single-leader-election/11789) e a [tecnologia de validador distribuído (DVT)](/staking/dvt/) forem implementadas. Da mesma forma, resta saber quais oportunidades de MEV existem quando a maior parte da atividade do usuário é transferida do Ethereum para seus rollups de camada 2 (l2) e shards.

## MEV na Prova de Participação (PoS) do Ethereum {#mev-in-ethereum-proof-of-stake}

Como explicado, o MEV tem implicações negativas para a experiência geral do usuário e a segurança da camada de consenso. Mas a transição do Ethereum para um consenso de Prova de Participação (apelidado de “The Merge”) introduz potencialmente novos riscos relacionados ao MEV:

### Centralização de validadores {#validator-centralization}

No Ethereum pós-Merge, os validadores (tendo feito depósitos de segurança de 32 ETH) chegam a um consenso sobre a validade dos blocos adicionados à Beacon Chain. Como 32 ETH pode estar fora do alcance de muitos, [juntar-se a um pool de staking](/staking/pools/) pode ser uma opção mais viável. No entanto, uma distribuição saudável de [stakers individuais (solo stakers)](/staking/solo/) é ideal, pois mitiga a centralização de validadores e melhora a segurança do Ethereum.

No entanto, acredita-se que a extração de MEV seja capaz de acelerar a centralização de validadores. Isso ocorre em parte porque, como os validadores [ganham menos por propor blocos](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) do que os mineradores ganhavam anteriormente, a extração de MEV tem [influenciado muito os ganhos dos validadores](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) desde [The Merge](/roadmap/merge/).

Pools de staking maiores provavelmente terão mais recursos para investir nas otimizações necessárias para capturar oportunidades de MEV. Quanto mais MEV esses pools extraem, mais recursos eles têm para melhorar suas capacidades de extração de MEV (e aumentar a receita geral), criando essencialmente [economias de escala](https://www.investopedia.com/terms/e/economiesofscale.asp#).

Com menos recursos à sua disposição, os stakers individuais podem ser incapazes de lucrar com as oportunidades de MEV. Isso pode aumentar a pressão sobre os validadores independentes para se juntarem a pools de staking poderosos para aumentar seus ganhos, reduzindo a descentralização no Ethereum.

### Mempools permissionadas {#permissioned-mempools}

Em resposta a ataques de sanduíche e frontrunning, os traders podem começar a realizar acordos offchain com validadores para obter privacidade nas transações. Em vez de enviar uma transação de MEV potencial para a mempool pública, o trader a envia diretamente para o validador, que a inclui em um bloco e divide os lucros com o trader.

As “dark pools” (pools obscuras) são uma versão maior desse arranjo e funcionam como mempools permissionadas, de acesso restrito, abertas a usuários dispostos a pagar certas taxas. Essa tendência diminuiria a natureza sem permissão e a desnecessidade de confiança do Ethereum e potencialmente transformaria a blockchain em um mecanismo “pague para jogar” que favorece quem dá o lance mais alto.

As mempools permissionadas também acelerariam os riscos de centralização descritos na seção anterior. Grandes pools que executam vários validadores provavelmente se beneficiarão ao oferecer privacidade de transação a traders e usuários, aumentando suas receitas de MEV.

Combater esses problemas relacionados ao MEV no Ethereum pós-Merge é uma área central de pesquisa. Até o momento, duas soluções propostas para reduzir o impacto negativo do MEV na descentralização e segurança do Ethereum após o The Merge são a [**separação propositor-construtor (PBS)**](/roadmap/pbs/) e a [**API do Construtor (Builder API)**](https://github.com/ethereum/builder-specs).

### Separação propositor-construtor {#proposer-builder-separation}

Tanto na Prova de Trabalho quanto na Prova de Participação, um nó que constrói um bloco o propõe para adição à cadeia a outros nós que participam do consenso. Um novo bloco se torna parte da cadeia canônica depois que outro minerador constrói sobre ele (em PoW) ou recebe atestados da maioria dos validadores (em PoS).

A combinação das funções de produtor de bloco e propositor de bloco é o que introduz a maioria dos problemas relacionados ao MEV descritos anteriormente. Por exemplo, os nós de consenso são incentivados a desencadear reorganizações da cadeia em [ataques de bandidos do tempo (time-bandit attacks)](https://www.mev.wiki/attack-examples/time-bandit-attack) para maximizar os ganhos de MEV.

A [separação propositor-construtor](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) foi projetada para mitigar o impacto do MEV, especialmente na camada de consenso. A principal característica da PBS é a separação das regras do produtor de bloco e do propositor de bloco. Os validadores ainda são responsáveis por propor e votar em blocos, mas uma nova classe de entidades especializadas, chamadas **construtores de blocos**, é encarregada de ordenar transações e construir blocos.

Sob a PBS, um construtor de blocos cria um pacote de transações e faz um lance para sua inclusão em um bloco da Beacon Chain (como a “carga de execução”). O validador selecionado para propor o próximo bloco então verifica os diferentes lances e escolhe o pacote com a taxa mais alta. A PBS cria essencialmente um mercado de leilões, onde os construtores negociam com os validadores que vendem espaço no bloco.

Os designs atuais da PBS usam um [esquema de compromisso-revelação (commit-reveal)](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) no qual os construtores publicam apenas um compromisso criptográfico com o conteúdo de um bloco (cabeçalho do bloco) junto com seus lances. Após aceitar o lance vencedor, o proponente cria uma proposta de bloco assinada que inclui o cabeçalho do bloco. Espera-se que o construtor de blocos publique o corpo completo do bloco depois de ver a proposta de bloco assinada, e ele também deve receber [atestados](/glossary/#attestation) suficientes dos validadores antes de ser finalizado.

#### Como a separação propositor-construtor mitiga o impacto do MEV? {#how-does-pbs-curb-mev-impact}

A separação propositor-construtor no protocolo reduz o efeito do MEV no consenso ao remover a extração de MEV da alçada dos validadores. Em vez disso, os construtores de blocos que executam hardware especializado capturarão as oportunidades de MEV daqui para frente.

Isso não exclui totalmente os validadores da renda relacionada ao MEV, no entanto, já que os construtores devem dar lances altos para que seus blocos sejam aceitos pelos validadores. No entanto, com os validadores não mais focados diretamente na otimização da renda de MEV, a ameaça de ataques de bandidos do tempo diminui.

A separação propositor-construtor também reduz os riscos de centralização do MEV. Por exemplo, o uso de um esquema de compromisso-revelação remove a necessidade de os construtores confiarem nos validadores para não roubar a oportunidade de MEV ou expô-la a outros construtores. Isso reduz a barreira para que os stakers individuais se beneficiem do MEV; caso contrário, os construtores tenderiam a favorecer grandes pools com reputação offchain e a realizar acordos offchain com eles.

Da mesma forma, os validadores não precisam confiar nos construtores para não reter corpos de blocos ou publicar blocos inválidos porque o pagamento é incondicional. A taxa do validador ainda é processada mesmo se o bloco proposto estiver indisponível ou for declarado inválido por outros validadores. Neste último caso, o bloco é simplesmente descartado, forçando o construtor de blocos a perder todas as taxas de transação e a receita de MEV.

### API do Construtor (Builder API) {#builder-api}

Embora a separação propositor-construtor prometa reduzir os efeitos da extração de MEV, sua implementação requer mudanças no protocolo de consenso. Especificamente, a regra de [escolha de bifurcação (fork choice)](/developers/docs/consensus-mechanisms/pos/#fork-choice) na Beacon Chain precisaria ser atualizada. A [API do Construtor](https://github.com/ethereum/builder-specs) é uma solução temporária que visa fornecer uma implementação funcional da separação propositor-construtor, embora com maiores premissas de confiança.

A API do Construtor é uma versão modificada da [API do Motor (Engine API)](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) usada por clientes da camada de consenso para solicitar cargas de execução de clientes da camada de execução. Conforme descrito na [especificação do validador honesto](https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md), os validadores selecionados para as funções de proposição de blocos solicitam um pacote de transações de um cliente de execução conectado, que eles incluem no bloco proposto da Beacon Chain.

A API do Construtor também atua como um middleware entre validadores e clientes da camada de execução; mas é diferente porque permite que os validadores na Beacon Chain obtenham blocos de entidades externas (em vez de construir um bloco localmente usando um cliente de execução).

Abaixo está uma visão geral de como a API do Construtor funciona:

1. A API do Construtor conecta o validador a uma rede de construtores de blocos executando clientes da camada de execução. Como na PBS, os construtores são partes especializadas que investem na construção de blocos com uso intensivo de recursos e usam estratégias diferentes para maximizar a receita obtida com MEV + gorjetas de prioridade.

2. Um validador (executando um cliente da camada de consenso) solicita cargas de execução junto com lances da rede de construtores. Os lances dos construtores conterão o cabeçalho da carga de execução — um compromisso criptográfico com o conteúdo da carga — e uma taxa a ser paga ao validador.

3. O validador analisa os lances recebidos e escolhe a carga de execução com a taxa mais alta. Usando a API do Construtor, o validador cria uma proposta de bloco Beacon "cega" que inclui apenas sua assinatura e o cabeçalho da carga de execução e a envia ao construtor.

4. Espera-se que o construtor executando a API do Construtor responda com a carga de execução completa ao ver a proposta de bloco cega. Isso permite que o validador crie um bloco Beacon "assinado", que ele propaga por toda a rede.

5. Ainda se espera que um validador usando a API do Construtor construa um bloco localmente caso o construtor de blocos não responda prontamente, para que não perca as recompensas de proposta de bloco. No entanto, o validador não pode criar outro bloco usando as transações agora reveladas ou outro conjunto, pois isso equivaleria a uma _equivocação_ (assinar dois blocos dentro do mesmo slot), o que é uma ofensa passível de slashing.

Um exemplo de implementação da API do Construtor é o [MEV-Boost](https://github.com/flashbots/mev-boost), uma melhoria no [mecanismo de leilão da Flashbots](https://docs.flashbots.net/flashbots-auction/overview) projetado para conter as externalidades negativas do MEV no Ethereum. O leilão da Flashbots permite que os validadores na Prova de Participação terceirizem o trabalho de construção de blocos lucrativos para partes especializadas chamadas **buscadores**.
![A diagram showing the MEV flow in detail](./mev.png)

Os buscadores procuram oportunidades lucrativas de MEV e enviam pacotes de transações aos propositores de bloco junto com um [lance de preço selado](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) para inclusão no bloco. O validador executando o mev-geth, uma versão bifurcada do cliente Go Ethereum (Geth), só precisa escolher o pacote com mais lucro e incluí-lo como parte do novo bloco. Para proteger os propositores de bloco (validadores) de spam e transações inválidas, os pacotes de transações passam por **retransmissores (relayers)** para validação antes de chegarem ao propositor.

O MEV-Boost mantém o mesmo funcionamento do leilão original da Flashbots, embora com novos recursos projetados para a mudança do Ethereum para a Prova de Participação. Os buscadores ainda encontram transações de MEV lucrativas para inclusão em blocos, mas uma nova classe de partes especializadas, chamadas **construtores**, é responsável por agregar transações e pacotes em blocos. Um construtor aceita lances de preço selado de buscadores e executa otimizações para encontrar a ordenação mais lucrativa.

O retransmissor ainda é responsável por validar os pacotes de transações antes de passá-los ao propositor. No entanto, o MEV-Boost introduz **escrows (garantias)** responsáveis por fornecer [disponibilidade de dados](/developers/docs/data-availability/) armazenando corpos de blocos enviados por construtores e cabeçalhos de blocos enviados por validadores. Aqui, um validador conectado a um retransmissor solicita cargas de execução disponíveis e usa o algoritmo de ordenação do MEV-Boost para selecionar o cabeçalho da carga com o lance mais alto + gorjetas de MEV.

#### Como a API do Construtor mitiga o impacto do MEV? {#how-does-builder-api-curb-mev-impact}

O principal benefício da API do Construtor é seu potencial para democratizar o acesso a oportunidades de MEV. O uso de esquemas de compromisso-revelação elimina as premissas de confiança e reduz as barreiras de entrada para validadores que buscam se beneficiar do MEV. Isso deve reduzir a pressão sobre os stakers individuais para se integrarem a grandes pools de staking a fim de aumentar os lucros de MEV.

A ampla implementação da API do Construtor incentivará uma maior concorrência entre os construtores de blocos, o que aumenta a resistência à censura. Como os validadores analisam lances de vários construtores, um construtor com a intenção de censurar uma ou mais transações de usuários deve superar o lance de todos os outros construtores que não censuram para ter sucesso. Isso aumenta drasticamente o custo de censurar usuários e desencoraja a prática.

Alguns projetos, como o MEV-Boost, usam a API do Construtor como parte de uma estrutura geral projetada para fornecer privacidade de transação a certas partes, como traders que tentam evitar ataques de frontrunning/sanduíche. Isso é alcançado fornecendo um canal de comunicação privado entre usuários e construtores de blocos. Ao contrário das mempools permissionadas descritas anteriormente, essa abordagem é benéfica pelos seguintes motivos:

1. A existência de vários construtores no mercado torna a censura impraticável, o que beneficia os usuários. Em contraste, a existência de dark pools centralizadas e baseadas em confiança concentraria o poder nas mãos de alguns construtores de blocos e aumentaria a possibilidade de censura.

2. O software da API do Construtor é de código aberto, o que permite que qualquer pessoa ofereça serviços de construtor de blocos. Isso significa que os usuários não são forçados a usar nenhum construtor de blocos em particular e melhora a neutralidade e a natureza sem permissão do Ethereum. Além disso, os traders que buscam MEV não contribuirão inadvertidamente para a centralização usando canais de transação privados.

## Recursos relacionados {#related-resources}

- [Documentação da Flashbots](https://docs.flashbots.net/)
- [GitHub da Flashbots](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) - _Rastreador com estatísticas em tempo real para retransmissores e construtores de blocos do MEV-Boost_

## Leitura adicional {#further-reading}

- [O que é o valor extraível do minerador (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV e Eu](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum é uma Floresta Sombria](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Escapando da Floresta Sombria](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Antecipando a Crise do MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Threads sobre MEV de @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Arquitetura da Flashbots pronta para o The Merge](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [O que é o MEV-Boost](https://www.alchemy.com/overviews/mev-boost)
- [Por que executar o mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [O Guia do Mochileiro para o Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)