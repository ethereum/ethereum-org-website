---
title: Valor máximo extraível (MEV)
description: Uma introdução ao valor máximo extraível (MEV)
lang: pt-br
---

Valor Máximo Extraível (MEV, na sigla em inglês) expressa o valor máximo que pode ser extraído da produção de blocos que excede a recompensa padrão do bloco e sua taxa de gás através da inclusão, exclusão e alteração da ordem de transações em um determinado bloco.

## Valor máximo extraível {#miner-extractable-value}

O valor máximo extraível foi aplicado pela primeira vez no contexto de [prova de trabalho](/developers/docs/consensus-mechanisms/pow/) e inicialmente referido como "valor extraível do minerador". Isto porque na prova de trabalho, os mineradores controlam a inclusão, exclusão e ordenação das transações. No entanto, desde a transição para a prova de participação por meio do [The Merge (A Fusão)](/roadmap/merge), os validadores têm sido responsáveis por essas funções, e a mineração não faz mais parte do protocolo Ethereum. Como os métodos de extração de valor ainda existem, o termo "valor máximo extraível" agora é usado.

## Pré-Requisitos {#prerequisites}

Certifique-se de estar familiarizado com [transações](/developers/docs/transactions/), [blocos](/developers/docs/blocks/), [prova de participação](/developers/docs/consensus-mechanisms/pos) e [gás](/developers/docs/gas/). Conhecer outros detalhes como [dapps](/dapps/) ou [DeFi](/defi/) também seria útil.

## Extração via MEV {#mev-extraction}

Em teoria, o MEV é revertido inteiramente para os validadores porque eles são a única parte que pode garantir a execução de uma oportunidade lucrativa de MEV. Na prática, porém, uma grande parte do MEV é extraída por participantes independentes da rede chamados "buscadores". Os buscadores executam algoritmos complexos nos dados da blockchain para detectar oportunidades de MEV lucrativas e usam bots para enviar automaticamente essas transações rentáveis para a rede.

Os validadores recebem uma parte do valor total do MEV de qualquer maneira, porque os pesquisadores estão dispostos a pagar altas taxas de gás (que vão para o validador) em troca de maior probabilidade de inclusão de suas transações lucrativas em um bloco. Assumindo que os buscadores são economicamente racionais, a taxa de gás que um buscador está disposto a pagar será uma quantia de até 100% do MEV do buscador (porque se a taxa de gás fosse maior, o buscador perderia dinheiro).

Com isso, para algumas oportunidades de MEV altamente competitivas, como [arbitragem DEX](#mev-examples-dex-arbitrage), os buscadores podem ter que pagar 90% ou até mais de sua receita total de MEV, em taxas de gás para o validador, porque muitas pessoas querem executar a mesma operação de arbitragem lucrativa. Isto porque a única maneira de garantir que a sua transação de arbitragem seja executada é submetendo a transação com o preço de gás mais elevado.

### Redução do consumo de gás dos contratos (gas golfing) {#mev-extraction-gas-golfing}

Esta dinâmica fez do "gas-golfing" — o fato de programar as transações para que elas usem a menor quantidade de gás possível — una vantagem competitiva, porque ela permite que os buscadores fixem um preço de gás superior sem deixar de manter as taxas de gás constantes (já que as taxas de gás = preço do gás \* gás usado).

Algumas técnicas de "gas-golfing" conhecidas incluem: o uso de endereços que começam com uma longa série de zeros (por exemplo, [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306)), já que consomem menos espaço (e, portanto, gás); e deixar pequenos saldos de token de [ERC-20](/developers/docs/standards/tokens/erc-20/) em contratos, já que é mais caro inicializar um slot de armazenamento (o que acontece se o saldo for 0) que atualizá-lo. Encontrar mais técnicas para reduzir o uso de gás é uma área ativa de pesquisa entre pesquisadores.

### Frontrunners generalizados {#mev-extraction-generalized-frontrunners}

Em vez de programar algoritmos complexos para detectar oportunidades de MEV rentáveis, alguns buscadores executam frontrunners generalizados. Frontrunners generalizados são bots que assistem o mempool para detectar transações rentáveis. O frontrunner copiará o código da transação potencialmente rentável, substituirá os endereços pelo endereço do frontrunner, e executará a transação localmente para corroborar se a transação modificada resulta em lucro para o endereço do frontrunner. Se a transação for de fato rentável, o frontrunner enviará a transação modificada com o endereço substituído e um preço de gás mais alto, escolhendo a transação original (frontrunning) e obtendo a MEV do buscador original.

### Flashbots {#mev-extraction-flashbots}

Flashbots é um projeto independente que estende clientes de execução com um serviço que permite aos buscadores submeterem transações MEV aos validadores sem revelá-las ao mempool público. Isto evita que transações sejam executadas por frontrunners generalizados.

## Exemplos de MEV {#mev-examples}

O MEV surge na blockchain de diferentes maneiras.

### Arbitragem DEX {#mev-examples-dex-arbitrage}

A arbitragem em [exchanges descentralizadas](/glossary/#dex) (DEX) é a oportunidade mais simples e mais conhecida de MEV. Por conseguinte, é também a mais competitiva.

Isso funciona assim: se dois DEXes estão oferecendo um token a dois preços diferentes, alguém pode comprar o token na DEX com preços mais baixos e vendê-lo nas DEX com preços mais altos em uma única transação atômica. Graças ao mecanismo da blockchain, está é sem dúvidas uma arbitragem sem risco.

[Aqui está um exemplo](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) de uma transação de arbitragem lucrativa onde um buscador transformou 1.00 ETH em 1.045 ETH aproveitando os diferentes preços do par ETH/DAI no Uniswap vs. Sushiswap.

### Liquidações {#mev-examples-liquidations}

As liquidações do protocolo de empréstimo oferecem outra oportunidade conhecida de MEV.

Protocolos de empréstimo como Maker e Aave exigem que os usuários depositem algumas garantias (por exemplo, ETH). Essa garantia depositada é então usada para emprestar a outros usuários.

Os usuários podem então pedir emprestado ativos e tokens de outros, dependendo do que eles precisarem (por exemplo, você pode pedir emprestado MKR, se quiser votar em uma proposta de governança do MakerDAO) até um certo percentual de suas garantias depositadas. Por exemplo, se a quantia emprestada for um máximo de 30%, um usuário que depositar 100 DAI no protocolo poderá emprestar até 30 DAI de outro ativo. O protocolo determina a porcentagem exata do poder de empréstimo.

O valor das garantias de quem pede o emprestado flutua, assim como sua capacidade de pedir empréstimo. Se, por causa das flutuações de mercado, o valor dos ativos emprestados excede, por exemplo, 30% do valor de suas garantias (novamente, a porcentagem exata é determinada pelo protocolo), o protocolo normalmente permite que qualquer pessoa liquide a garantia, pagando imediatamente os mutuantes (isso é semelhante a como [chamada de margem](https://www.investopedia.com/terms/m/margincall.asp) funciona nas finanças tradicionais). Se liquidado, o mutuário geralmente tem de pagar uma taxa de liquidação elevada, parte da qual vai para o liquidador. É aí que se encontra a oportunidade de MEV.

Os buscadores competem para analisar os dados da blockchain o mais rápido possível para determinar quais mutuários podem ser liquidados e ser o primeiro a enviar uma transação de liquidação e coletar a taxa de liquidação para si mesmos.

### Sandwich trading {#mev-examples-sandwich-trading}

Sandwich trading é outro método comum de extração MEV.

Para usar o método sandwich, um buscador observará o mempool para encontrar grandes negociações DEX. Por exemplo, suponha que alguém queira comprar 10.000 UNI com DAI na Uniswap. Uma transação desta magnitude causará um impacto significativo no par UNI/DAI, ocasionando aumento significativo no preço da UNI em relação ao DAI.

Um buscador pode calcular o efeito de preço aproximado desta grande negociação no par UNI/DAI e executar uma ordem de compra ideal imediatamente _antes_ da grande negociação, comprando UNI mais barato e, em seguida, executar uma ordem de venda imediatamente _após_ a grande negociação, vendendo-a pelo preço mais alto causado pelo grande pedido.

No entanto, o método sandwich é mais arriscado, pois não é atômico (ao contrário da arbitragem DEX, como descrito acima) e é propenso a um [ataque "salmonela"](https://github.com/Defi-Cartel/salmonella).

### MEV com NFT {#mev-examples-nfts}

O MEV no espaço de NFT é um fenômeno emergente e não é necessariamente lucrativo.

No entanto, uma vez que as transações NFT acontecem na mesma blockchain compartilhada por todas as outras transações Ethereum, buscadores podem usar técnicas similares como as usadas em oportunidades de MEV tradicionais também no mercado NFT.

Por exemplo, se há o lançamento de um NFT popular e um buscador quer um determinado NFT ou um determinado conjunto de NFTs, ele pode programar uma transação de tal forma a ser o primeiro a comprar a NFT ou ele pode comprar todo o conjunto de NFTs em uma única transação. Ou se um NFT estiver [listado por um preço baixo de maneira equivocada](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), um buscador pode se adiantar por meio de frontrun a outros compradores e adquiri-lo por baixo custo.

Um exemplo proeminente de NFT com MEV ocorreu quando um buscador gastou US$ 7 milhões para [comprar](https://etherscan.io/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5) cada Cryptopunk ao preço mínimo. Um pesquisador de blockchain [explicou no Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) como o comprador trabalhou com um provedor de MEV para manter a compra em segredo.

### A cauda longa {#mev-examples-long-tail}

Arbitragem DEX, liquidações e o método sandwich trading são todos oportunidades de MEV muito conhecidas e são improváveis de serem lucrativas para novos buscadores. No entanto, há uma longa cauda de oportunidades de MEV menos conhecidas. MEV com NFT é, indiscutivelmente, uma dessas oportunidades.

Os buscadores que estão apenas começando talvez consigam ter mais sucesso procurando MEV nesta cauda mais longa. O [quadro de trabalhos MEV](https://github.com/flashbots/mev-job-board) do Flashbot enumera algumas oportunidades emergentes.

## Efeitos do MEV {#effects-of-mev}

Nem tudo sobre o MEV é negativo. Há consequências positivas e negativas com respeito ao MEV no Ethereum.

### As vantagens {#effects-of-mev-the-good}

Muitos projetos DeFi dependem de atores economicamente racionais para assegurar a utilidade e a estabilidade dos seus protocolos. Por exemplo, a arbitragem DEX garante que os usuários obtenham os melhores preços corretos por seus totens, e os protocolos de empréstimo dependem de liquidações rápidas quando os mutuários caem abaixo das proporções de garantia para garantir que os mutuários recebam de volta.

Sem buscadores racionais procurando e corrigindo as ineficiências econômicas e aproveitando os incentivos econômicos dos protocolos, os protocolos de DeFI e dApps podem, em geral, não ser tão robustos como são hoje.

### As desvantagens {#effects-of-mev-the-bad}

Na camada de aplicativo, algumas formas de MEV, como o método "sandwich trading", resultam em uma experiência inequivocamente pior para os usuários. Usuários que sofrem o método "sandwich trading" enfrentam maior slippage (derrapagem) e uma pior execução nas suas transações.

Na camada de rede, os frontrunners generalizados e os leilões de preço do gás nos quais eles costumam participar (quando dois ou mais frontrunners competem para que sua transação seja incluída no bloco seguinte, aumentando progressivamente o preço do gás das suas próprias transações) resultam em congestionamento da rede e em elevados preços do gás para todos os outros que tentam realizar transações regulares.

Além do que está acontecendo _nos_ blocos, o MEV pode ter efeitos prejudiciais _entre_ os blocos. Se o MEV disponível em um bloco excede significativamente a recompensa do bloco padrão, os validadores podem ser incentivados a reorganizar os blocos e capturar o MEV para si mesmos, causando reorganização da blockchain e instabilidade do consenso.

Essa possibilidade de reorganização da blockchain foi [previamente explorada na blockchain Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). Como a recompensa de bloco do Bitcoin é reduzida pela metade e as recompensas de transação representam uma parte cada vez maior da recompensa do bloco, surgem situações nas quais é mais economicamente racional para os mineradores desistirem da recompensa do próximo bloco e, em vez disso, minarem novamente blocos passados com taxas mais elevadas. Com o crescimento do MEV, o mesmo tipo de situação poderia ocorrer com o Ethereum, ameaçando a integridade da blockchain.

## Estado do MEV {#state-of-mev}

A extração MEV teve um grande crescimento no início de 2021, o que resultou em preços de gás extremamente elevados nos primeiros meses do ano. O surgimento do relé MEV de Flashbots reduziu a efetividade dos frontrunners generalizados e tirou os leilões de preço de gás da cadeia, baixando os preços do gás para os utilizadores comuns.

Enquanto muitos buscadores ainda estão ganhando um bom dinheiro com o MEV, à medida que as oportunidades se tornam mais conhecidas e mais e mais buscadores competem pela mesma oportunidade, os validadores irão capturar cada vez mais receita total do MEV (porque o mesmo tipo de leilão de gás descrito originalmente acima também ocorre em Flashbots, embora de forma particular, e os validadores irão capturar a receita de gás resultante). O MEV também não é exclusivo da Ethereum, e conforme as oportunidades se tornam mais competitivas no Ethereum, os buscadores estão migrando para blockchains alternativas, como a Binance Smart Chain, onde oportunidades de MEV semelhantes às que estão na Ethereum existem com menos concorrência.

Por outro lado, a transição da prova de trabalho para prova de participação e o esforço contínuo para escalar o Ethereum usando rollups mudam todo o panorama do MEV de maneiras que ainda não estão claras. Ainda não se sabe bem de que maneira ter proponentes de bloco garantidos conhecidos com pouca antecedência altera a dinâmica da extração de MEV em comparação com o modelo probabilístico na prova de trabalho ou como isso será interrompido quando [a eleição de líder secreto único](https://ethresear.ch/t/secret-non-single-leader-election/11789) e [a tecnologia de validador distribuído](/staking/dvt/) forem implementados. Da mesma forma, resta saber quais são as oportunidades de MEV existentes quando a maioria das atividades do usuário é transferida do Ethereum para seus rollups e fragmentos de camada 2.

## MEV na prova de participação (PoS) do Ethereum {#mev-in-ethereum-proof-of-stake}

Conforme explicado, o MEV tem implicações negativas para a experiência geral do usuário e para a segurança da camada de consenso. Mas a transição do Ethereum para um consenso de prova de participação (denominado "A Fusão") introduz potencialmente novos riscos relacionados ao MEV:

### Centralização do validador {#validator-centralization}

No Ethereum pós-fusão, os validadores (tendo feito depósitos de segurança de 32 ETH) chegam a um consenso sobre a validade dos blocos adicionados à Beacon Chain. Como 32 ETH podem estar fora do alcance de muitos, [entrar em um staking pool](/staking/pools/) pode ser uma opção mais viável. No entanto, uma distribuição saudável de [stakers individuais](/staking/solo/) é ideal, pois mitiga a centralização dos validadores e melhora a segurança do Ethereum.

No entanto, acredita-se que a extração MEV seja capaz de acelerar a centralização de validadores. Isso se deve em parte porque, como os validadores [ganham menos por propor blocos](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) do que os mineradores atualmente, a extração de MEV pode em muito [influenciar os ganhos do validador](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) após o The Merge (A Fusão).

Staking pools maiores provavelmente terão mais recursos para investir em otimizações necessárias para capturar oportunidades de MEV. Quanto mais MEV essas pools extraem, mais recursos eles têm para melhorar suas capacidades de extração MEV (e aumentar a receita geral), criando essencialmente [economias de escala](https://www.investopedia.com/terms/e/economiesofscale.asp#).

Com menos recursos à sua disposição, os stakers individuais podem ser incapazes de lucrar com oportunidades de MEV. Isso pode aumentar a pressão sobre validadores independentes para se unirem a staking pools poderosas para aumentar os ganhos, reduzindo a descentralização no Ethereum.

### Mempools autorizados {#permissioned-mempools}

Em resposta aos ataques "sandwiching" e "frontrunning", os traders podem começar a realizar negócios off-chain com validadores para privacidade de transação. Em vez de enviar uma potencial transação MEV para o mempool público, o trader a envia diretamente ao validador, que a inclui em um bloco e divide os lucros com o trader.

"Dark pools" são uma versão maior deste arranjo e funcionam como mempools autorizados só de acesso, abertas para usuários dispostos a pagar determinadas taxas. Esta tendência diminuiria a ausência de permissão e falta de confiança no Ethereum, e potencialmente transformaria a blockchain em um mecanismo "pay-to-play" que favorece a maior oferta.

Mempools autorizados também acelerariam os riscos de centralização descritos na seção anterior. Grandes pools que executam vários validadores provavelmente se beneficiarão ao oferecer privacidade de transação a traders e usuários, aumentando as receitas MEV deles.

A luta contra esses problemas relacionados ao MEV no Ethereum pós-Fusão é uma área central de pesquisa. Até hoje, duas soluções propostas para reduzir o impacto negativo do MEV na descentralização e na segurança do Ethereum, depois da Fusão são **Separação Proponente-Construtor (PBS)** e **Builder API**.

### Separação Proponente/Construtor {#proposer-builder-separation}

Em ambas prova de trabalho e prova de participação, um nó que cria um bloco o propõe para ser adicionado à cadeia para outros nós que participam do consenso. Um novo bloco se torna parte da cadeia canônica depois que outro minerador constrói com base nele (na prova de trabalho) ou recebe atestados da maioria dos validadores (na prova de participação).

A combinação de funções de produtor de bloco e de proponente de bloco é o que introduz a maioria dos problemas relacionados com o MEV descritos anteriormente. Por exemplo, nós de consenso são incentivados a desencadear reorganizações da cadeia em ataques time-bandit para maximizar os ganhos MEV.

A [Separação Proponente/Construtor](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) foi criada para mitigar o impacto do MEV, especialmente na camada de consenso. A principal característica do PBS é a separação entre o produtor de bloco e as regras do proponente de bloco. Os validadores ainda são responsáveis por propor e votar nos blocos, mas uma nova classe de entidades especializadas, chamada de **construtores de blocos**, é encarregada de ordenar transações e construir blocos.

Em PBS, um construtor de blocos cria um pacote de transações e faz um lance para sua inclusão em um bloco da Beacon Chain (como o “payload de execução”). O validador selecionado para propor o próximo bloco verifica então os diferentes lances e escolhe o pacote com a taxa mais alta. O PBS cria essencialmente um mercado de leilão, no qual os construtores negociam com os validadores vendendo o espaço no bloco.

O design de PBS atual usa um [esquema commit-reveal](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) no qual os construtores só publicam um compromisso criptográfico com o conteúdo de um bloco (header do bloco), juntamente com seus lances. Após aceitar o lance vencedor, o proponente cria uma proposta de bloco assinado que inclui o cabeçalho do bloco. O construtor do bloco deve publicar o corpo completo do bloco após ver a proposta do bloco assinado, e também deve receber [atestações](/glossary/#attestation) suficientes dos validadores antes de ser finalizado.

#### Como a separação proponente-construtor atenua o impacto do MEV? {#how-does-pbs-curb-mev-impact}

O protocolo de separação proponente-construtor reduz o efeito do MEV sobre o consenso removendo a extração MEV da alçada dos validadores. Em vez disso, são os construtores de blocos que executam hardware especializado que irão capturar oportunidades MEV no futuro.

Isso não exclui totalmente os validadores das receitas relacionadas ao MEV, já que os construtores devem dar lances altos para conseguir que seus blocos sejam aceitos pelos validadores. No entanto, com validadores não mais focados diretamente na otimização de renda MEV, a ameaça de ataques time-bandit diminui.

A separação proponente-construtor também reduz os riscos de centralização do MEV. Por exemplo, o uso de um esquema commit-reveal remove a necessidade de os construtores confiarem nos validadores para não roubarem a oportunidade MEV ou expô-la a outros construtores. Isso reduz a barreira para os stakers individuais se beneficiarem do MEV, caso contrário os construtores tenderiam a favorecer grandes pools com reputação off-chain e a conduzir acordos off-chain com eles.

De forma similar, os validadores não têm que confiar que os construtores não vão reter os corpos de blocos ou publicar blocos inválidos porque o pagamento é incondicional. A taxa do validador ainda processa mesmo que o bloco proposto esteja indisponível ou seja declarado inválido por outros validadores. No último caso, o bloco é simplesmente descartado, forçando o construtor de blocos a perder todas as taxas de transação e a receita MEV.

### Builder API {#builder-api}

Embora a separação proponente-construtor prometa reduzir os efeitos da extração do MEV, a sua implementação requer alterações no protocolo de consenso. Especificamente, a regra de [escolha de fork](/developers/docs/consensus-mechanisms/pos/#fork-choice) na Beacon Chain precisaria ser atualizada. A [Builder API](https://github.com/ethereum/builder-specs) é uma solução temporária destinada a fornecer uma implementação funcional da separação proponente-construtor, embora com hipóteses mais confiáveis.

A Builder API é uma versão modificada da [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) usada por clientes da camada de consenso para solicitar payloads de execução de clientes da camada de execução. Conforme descrito na [especificação do validador honesto](https://github.com/ethereum/consensus-specs/blob/dev/specs/bellatrix/validator.md), validadores selecionados para funções de proposta de bloco solicitam um pacote de transação de um cliente de execução conectado, que eles incluem no bloco proposto da Beacon Chain.

A Builder API também atua como um middleware entre validadores e clientes da camada de execução; mas é diferente porque permite aos validadores na Beacon Chain originar blocos de entidades externas (em vez de construir um bloco localmente usando um cliente de execução).

Veja abaixo uma resumo geral de como a Builder API funciona:

1. A Builder API conecta o validador a uma rede de construtores de blocos executando clientes de camada de execução. Como no PBS, construtores são grupos especializados que investem em construção de blocos com uso intensivo de recursos e usam diferentes estratégias para maximizar a receita obtida a partir de MEV + dicas prioritárias.

2. Um validador (executando um cliente de camada de consenso) solicita payloads de execução juntamente com lances da rede de construtores. Os lances dos construtores conterão o cabeçalho do payload de execução, um compromisso criptográfico com o conteúdo do payload, e uma taxa a ser paga ao validador.

3. O validador analisa os lances recebidos e escolhe o payload de execução com a taxa mais alta. Usando a Builder API, o validador cria uma proposta de bloco Beacon "cega" que inclui apenas a assinatura dele e o cabeçalho de payload de execução e o envia para o construtor.

4. O construtor que executa a Builder API deverá responder com a carga completa de execução após ver a proposta de bloco cega. Isso permite que o validador crie um bloco Beacon "assinado" que eles propagam por toda a rede.

5. Ainda é esperado que um validador usando a Builder API construa um bloco localmente caso o construtor de blocos não responda prontamente, para que não percam as recompensas de proposta de bloco. No entanto, o validador não pode criar outro bloco usando as transações agora reveladas ou outro conjunto, pois equivaleria a _equívoco_ (assinar dois blocos dentro do mesmo slot), o que é uma infração passível de advertência.

Uma implementação de exemplo da Builder API é [MEV Boost](https://github.com/flashbots/mev-boost), uma melhoria no mecanismo de leilão [Flashbots](https://docs.flashbots.net/Flashbots-auction/overview/) projetada para limitar as externalidades negativas de MEV no Ethereum. O leilão Flashbots permite que os mineradores em prova de trabalho externalizem o trabalho de construção de blocos lucrativos a partes especializadas chamadas de **buscadores**.

Os buscadores procuram oportunidades de MEV lucrativas e enviam pacotes de transação para os mineradores, juntamente com uma [oferta de preço selada](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) para inclusão no bloco. O minerador executando mev-geth, uma versão bifurcada do cliente go-ethereum (Geth) só precisa escolher o pacote com mais lucro e minerá-lo como parte do novo bloco. Para proteger os mineradores de transações de spam e inválidas, os pacotes de transações passam por **retransmissores** (relayers) para validação antes de chegar aos mineradores.

O MEV Boost mantém o mesmo funcionamento do leilão original de Flashbots, embora com novos recursos projetados para a mudança à prova de participação do Ethereum. Os buscadores ainda consideram transações MEV lucrativas para inclusão em blocos, mas uma nova classe de partes especializadas, chamada de **construtores**, é responsável pela agregação de transações e pacotes em blocos. Um construtor aceita ofertas de preço seladas pelos buscadores e executa otimizações para encontrar o pedido mais lucrativo.

O retransmissor ainda é responsável por validar pacotes de transações antes de passá-los para o proponente. No entanto, o MEV Boost introduz **escrows** responsáveis por fornecer [disponibilidade de dados](/developers/docs/data-availability/) ao armazenar corpos de blocos enviados por construtores e cabeçalhos de bloco enviados por validadores. Aqui, um validador conectado a um relay pede por payloads de execução disponíveis e usa o algoritmo de ordenação MEV Boost para selecionar o cabeçalho de payload com as maiores ofertas + valores MEV.

#### Como a Builder API atenua o impacto do MEV? {#how-does-builder-api-curb-mev-impact}

O principal benefício da Builder API é o seu potencial de democratizar o acesso a oportunidades de MEV. O uso de esquemas commit-revel elimina suposições de confiança e reduz as barreiras de entrada para os validadores que procuram se beneficiar com o MEV. Isso deve reduzir a pressão sobre os participantes individuais para se integrarem com grandes staking pools a fim de aumentar os lucros MEV.

A vasta implementação da Builder API incentivará uma maior concorrência entre os construtores de blocos, o que aumentará a resistência à censura. Como os validadores revisam lances de vários construtores, a intenção de um construtor de censurar uma ou mais transações de usuários deve superar todos os outros construtores que não censuram para ter sucesso. Isto aumenta consideravelmente o custo da censura de usuários e desencoraja a prática.

Alguns projetos, como MEV Boost, usam a Builder API como parte de uma estrutura global projetada para oferecer privacidade de transação a certas partes, tais como os traders que tentam evitar ataques frontrunning/sandwiching. Para isso, se proporciona um canal de comunicação particular entre usuários e construtores de blocos. Ao contrário dos mempools autorizados descritos anteriormente, esta abordagem é vantajosa pelas seguintes razões:

1. A existência de múltiplos construtores no mercado torna a censura impraticável, o que beneficia os usuários. Em contrapartida, a existência de dark pools centralizadas e baseadas em confiança concentraria o poder nas mãos de poucos construtores de blocos e aumentaria a possibilidade de censura.

2. O software da Builder API é de código aberto, o que permite que qualquer pessoa ofereça serviços de construtor de bloco. Isso significa que os usuários não são forçados a usar nenhum construtor de blocos em particular e melhora a neutralidade e a ausência de permissão do Ethereum. Além disso, os traders em busca de MEV não contribuirão inadvertidamente para a centralização por usar canais de transação particulares.

## Recursos relacionados {#related-resources}

- [Documentação sobre Flashbots (links em inglês)](https://docs.flashbots.net/)
- [Flashbots GitHub](https://github.com/flashbots/pm)
- [MEV-Explore](https://explore.flashbots.net/) _Painéis e explorador de transações ao vivo de transações MEV_
- [mevboost.org](https://www.mevboost.org/) - _Rastreador com estatísticas em tempo real para relays MEV-Boost e construtores de blocos_

## Leitura adicional {#further-reading}

- [Valor extraível da mineração (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV e Mim](https://www.paradigm.xyz/2021/02/mev-and-me)
- [O Ethereum é uma Floresta Sombria](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Escapando da Floresta Sombria](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Superando a crise MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [Tópicos sobre MEV de @bertcmiller](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Arquitetura Flashbots pronta para a Fusão](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [O que é MEV Boost](https://www.alchemy.com/overviews/mev-boost)
- [Por que executar mev-boost?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [O Guia do Mochileiro sobre o Ethereum](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)
