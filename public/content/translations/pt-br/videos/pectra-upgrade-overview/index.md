---
title: "O que vai entrar na atualização Pectra?"
description: "Christine Kim sobre a atualização Pectra do Ethereum, cobrindo as EIPs incluídas na atualização, o que elas mudam no protocolo e por que são importantes para usuários, desenvolvedores e validadores."
lang: pt-br
youtubeId: "ufIDBCgdGwY"
uploadDate: 2024-11-14
duration: "0:20:46"
educationLevel: intermediate
topic:
  - "roadmap"
  - "pectra"
  - "upgrades"
format: presentation
author: Ethereum Foundation
breadcrumb: "Visão Geral da Pectra"
---

Uma apresentação de **Christine Kim** na Devcon SEA cobrindo as EIPs incluídas na atualização Pectra do Ethereum, o que elas mudam no protocolo, quando a ativação na Mainnet é esperada e quais EIPs foram removidas do escopo.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=ufIDBCgdGwY) publicada pela Fundação Ethereum. Ela foi levemente editada para facilitar a leitura.*

#### Introdução (0:00) {#introduction-000}

Vamos falar sobre todas as EIPs que vão entrar na atualização Pectra. Um rápido aviso antes de começar: tudo o que estou prestes a dizer é apenas informativo — para fins informativos — e não deve ser interpretado como conselho financeiro ou de investimento.

#### Quando a Pectra vai para a Mainnet (0:23) {#when-is-pectra-mainnet-023}

Antes de entrarmos no que vai entrar na Pectra, a pergunta que mais me fazem é "quando a Pectra vai para a Mainnet?". Então, vou logo tirar isso do caminho para podermos entrar na parte técnica.

Esta é uma análise de cronograma muito provisória. Quando as pessoas me perguntam quando a Pectra vai acontecer, eu digo que é muito cedo para dizer — porque é verdade. A Pectra ainda está nos estágios iniciais de seu desenvolvimento. As especificações estão mudando, e o escopo da Pectra ainda não foi realmente finalizado.

Através deste processo, uma das coisas que você pode aprender é como as atualizações são desenvolvidas, como as atualizações são testadas e, eventualmente, como elas chegam à Mainnet. Inicialmente, os desenvolvedores decidem sobre algumas EIPs para incluir em uma atualização e, em seguida, implementam essas EIPs em redes de teste privadas focadas em desenvolvedores chamadas devnets. Os desenvolvedores já lançaram algumas devnets para a Pectra, então essas EIPs já passaram por algumas rodadas de implementação. Os desenvolvedores notaram casos extremos e bugs que desejam corrigir, e eles iteram sobre essas EIPs lançando novas devnets. A devnet 4 foi lançada no mês passado, em outubro.

Isso não costuma acontecer, mas os desenvolvedores — muito especialmente para toda esta conferência e para todos na plateia — lançaram a primeira rede de teste pública da Pectra este mês. Ela se chama Mekong, então você pode ir e interagir com algumas das EIPs que estarão na Pectra desde cedo. Ela é baseada nas especificações da devnet 4, mas observe que essas especificações estão mudando.

Há uma lista de mudanças de especificação para as EIPs que os desenvolvedores já querem incluir na devnet 5 da Pectra — coisas como a reprecificação do pré-compilado BLS, e uma nova EIP que não foi implementada na devnet 4, mas que os desenvolvedores pretendem implementar para a devnet 5 ou uma atualização futura. Portanto, as especificações da Pectra estão mudando. Prevejo que ainda haverá várias outras devnets antes que as especificações possam realmente ser congeladas.

A outra parte que é realmente importante para a atualização Pectra em seu progresso para a Mainnet é que o escopo seja finalizado — que todas as EIPs que entrarão na Pectra sejam decididas. Há uma EIP — ainda não é realmente uma EIP — mas é o aumento da capacidade de blob que os desenvolvedores ainda não incluíram formalmente na Pectra, mas parece provável que eles incluam algum tipo de aumento na capacidade de blob porque recentemente incluíram uma EIP que introduz um mecanismo para atualizar o alvo de gás do blob e o máximo de gás do blob dinamicamente através da camada de consenso, em vez de ter esses parâmetros codificados de forma rígida na camada de execução e na camada de consenso.

Uma vez que o escopo esteja finalizado, você começa a testar quaisquer novas EIPs que tenha implementado — o escopo completo da atualização Pectra — e as testa em batalha em mais algumas devnets. Eu imagino talvez até a devnet 6 ou 7. E então, uma vez que as especificações da Pectra estejam congeladas e prontas para uso — todos os casos extremos que os desenvolvedores podem encontrar nas devnets tenham sido encontrados —, eles lançarão a atualização Pectra nas redes de teste públicas do Ethereum. Existem duas no momento: Sepolia e Holesky.

Historicamente, os desenvolvedores orçaram cerca de duas semanas entre as atualizações das redes de teste públicas. Em raras ocasiões, os desenvolvedores reduziram esse cronograma para apenas uma semana entre as redes de teste, mas devido ao tamanho da Pectra, imagino que os desenvolvedores vão querer usar todo o tempo. Estou orçando aproximadamente um mês para Sepolia e Holesky, e depois disso é quando você finalmente pode ter a ativação na Mainnet.

Dadas todas as informações que sei agora e o progresso que os desenvolvedores fizeram até agora na Pectra, minha melhor análise e palpite é que a Mainnet da Pectra acontecerá realisticamente no próximo mês de abril de 2025. Novamente, isso é muito provisório porque muita coisa pode mudar. O desenvolvimento acontece semanalmente — os desenvolvedores estão nessas chamadas ACD falando sobre esse bug que não esperavam nesta EIP ou nesta nova EIP que desejam adicionar à Pectra.

#### EIPs da camada de execução (6:23) {#execution-layer-eips-623}

Vamos passar para a parte principal desta palestra — o que vai entrar na atualização Pectra. Há dez EIPs entrando na Pectra, e quatro delas são focadas na camada de execução.

**EIP-2537** é um novo pré-compilado na EVM — operações de curva BLS12-381. Este é um novo esquema de assinatura criptográfica que os desenvolvedores de contratos inteligentes vêm pedindo há muito tempo. Esta EIP foi criada em 2020 e, na época, os desenvolvedores de aplicativos descentralizados (dapps) diziam que realmente a queriam porque daria a certos dapps que dependem de criptografia de conhecimento zero garantias de privacidade mais fortes, potencialmente maior segurança e escalabilidade. As assinaturas BLS também são a agregação que acontece na camada de consenso para as atestações de validadores. Esta EIP já era esperada há muito tempo. Uma das preocupações é: ainda existem aplicativos esperando pelo pré-compilado BLS, e eles vão usá-lo quando for lançado? Mas se você está nesta plateia e não sabia que o pré-compilado BLS finalmente está chegando — ele está chegando.

**EIP-2935** — servir hashes de blocos históricos a partir do estado. Esta introduz uma mudança na camada de execução de forma que provas de blocos históricos possam ser geradas a partir do estado. Ela tem alguns benefícios de curto prazo para a sincronização de clientes leves e para contratos inteligentes que podem querer utilizar dados sobre o estado de um bloco anterior diretamente através da EVM — você não pode realmente fazer isso agora. Mas esses benefícios de curto prazo não são a principal razão pela qual esta EIP foi incluída na Pectra. A razão principal é que ela é um pré-requisito para Verkle — a grande reformulação da estrutura de dados de estado do Ethereum. Os desenvolvedores pensaram que essa transição aconteceria logo após a Pectra, mas Verkle não vai entrar na Fusaka. Eles a adiaram para outra atualização, mas este passo inicial já foi riscado da lista.

**EIP-7685** — solicitações de propósito geral da camada de execução. Esta EIP não introduz realmente novos recursos ao Ethereum — é uma EIP para dar suporte a outras EIPs na Pectra. Na Pectra, há algumas EIPs onde a camada de execução será capaz de passar muito mais mensagens — diferentes tipos de mensagens — para a camada de consenso que não podia antes. Contratos inteligentes na camada de execução poderão acionar saques, consolidações e depósitos de validadores. Em vez de implementar esses novos canais de comunicação todos de forma separada e única, esta EIP cria uma estrutura generalizada — um barramento generalizado — para abrigar essas solicitações. Será mais fácil de testar, mais fácil de implementar entre os clientes e mais fácil de padronizar, especialmente se os desenvolvedores quiserem introduzir novos tipos de solicitações acionáveis pela camada de execução.

**EIP-7702** — definir código para contas de propriedade externa. Um novo tipo de transação está chegando ao Ethereum. Este tipo de transação permitirá temporariamente que uma EOA tenha maior flexibilidade, habilitando recursos como processamento em lote de transações, transações patrocinadas, transações condicionais e segurança delegada. Você pode estar pensando: "esta é a visão da abstração de conta ganhando vida no Ethereum?". Não, não é — é um pequeno passo. É um passo inicial para ver como o verdadeiro roteiro para a verdadeira abstração de conta nativa poderia ser no Ethereum. Houve bastante debate sobre como os desenvolvedores deveriam dar esse primeiro passo, e muita controvérsia em torno da entrada desta EIP e de seu design — mas ela entrou.

#### EIPs da camada de consenso (12:00) {#consensus-layer-eips-1200}

Existem outras seis — estas são EIPs da camada de consenso.

**EIP-7742** — desacoplar a contagem de blobs entre a camada de consenso e a camada de execução. Esta é a EIP mais recente a ser incluída na Pectra. Atualmente, a capacidade de blob é codificada de forma rígida na camada de execução e na camada de consenso em todos os diferentes clientes. Atualizar essa codificação rígida não é tão fácil quanto alguns podem pensar. Criar um mecanismo para definir dinamicamente a capacidade de blob através da camada de consenso garantirá que, no futuro, os desenvolvedores possam alterar facilmente a capacidade de blob do Ethereum, e que tal atualização exija apenas mudanças na camada de consenso — não mudanças em ambas as camadas.

**EIP-6110** — fornecer depósitos de validadores onchain. The Merge aconteceu e o Ethereum está mais maduro como uma blockchain de Prova de Participação (PoS). Certas suposições de segurança podem ser relaxadas agora. Esta EIP remove uma rodada adicional de votação que acontece no lado da camada de consenso toda vez que você deposita 32 ETH no contrato de depósito, garantindo que toda a validação de depósito aconteça na camada de execução. Isso traz benefícios para a experiência do usuário (UX) do validador — reduzirá o tempo entre o momento em que você deposita seus 32 ETH e quando você vê o validador realmente ativado na Beacon Chain.

**EIP-7002** — saques acionáveis pela camada de execução. Isso é muito bom para pools de staking. No momento, se você quiser sacar totalmente um validador, o operador do nó que opera esse validador precisa usar sua chave de saque para a saída total do validador. Através desta EIP, contratos inteligentes poderão iniciar esses saques totais. É uma suposição de confiança que você agora pode remover dos pools de staking — pools como Lido, Rocket Pool e outros pools de staking baseados em contratos inteligentes agora podem acionar saques totais de validadores, se desejarem.

**EIP-7251** — aumentar o saldo efetivo máximo. Isso é realmente um problema. Quando os desenvolvedores estavam pensando na Beacon Chain, eles não esperavam que o conjunto de validadores crescesse tão rapidamente — estamos em cerca de 1,2 ou 1,3 milhão de validadores. Há muitos validadores ativos, muitas mensagens sendo passadas na camada de rede, e é demais. Isso está sobrecarregando os nós e, se não for controlado, seria um grande problema para a saúde do Ethereum. A EIP-7251 foi projetada para encorajar os validadores a consolidarem seus ETH e terem um saldo efetivo máximo superior a 32 ETH, reduzindo o número de validadores ativos no Ethereum.

**EIP-7549** — mover o índice do comitê para fora da atestação. Esta é uma reestruturação e refatoração da forma como as atestações são agregadas para reduzir a carga de rede no Ethereum e economizar a largura de banda do nó. Quando os desenvolvedores estavam incluindo isso na Pectra, eles pensaram que era uma ótima mudança com benefícios maravilhosos e fácil de fazer — mas, na prática, acabou sendo muito mais difícil de implementar do que o esperado.

#### Resumo (17:19) {#summary-1719}

A Pectra é uma mistura de atualizações. Ela vai fazer três coisas: primeiro, corrigir deficiências críticas do Ethereum como uma blockchain de Prova de Participação (PoS) — pense no MaxEB, essa é uma correção crítica porque o tamanho do conjunto de validadores pode continuar a crescer sem controle. Segundo, melhorar a experiência do usuário — o novo tipo de transação, designs mais flexíveis, algumas melhorias para designs sem necessidade de confiança para pools de staking. E terceiro, aumentar a capacidade de disponibilidade de dados do Ethereum — isso não foi formalmente incluído na Pectra, mas parece provável.

#### EIPs removidas da Pectra (18:02) {#eips-removed-from-pectra-1802}

Aqui estão todas as EIPs que foram removidas da Pectra. Esta é a primeira vez que uma atualização tem tantas EIPs removidas.

**PeerDAS** — inicialmente haveria um aumento muito maior na capacidade de disponibilidade de dados na Pectra. O PeerDAS permitiria aos desenvolvedores aumentar o alvo de blob do Ethereum em múltiplos maiores sem impactar muito o consumo de largura de banda e os requisitos computacionais de executar um nó do Ethereum. Mas ainda está em fase de pesquisa e desenvolvimento.

**EOF** — o EVM Object Format. Essas onze mudanças de código como um pacote são uma grande atualização para a EVM do Ethereum. Tanto o PeerDAS quanto o EOF foram realmente incluídos inicialmente na Pectra, mas estavam sendo testados em devnets separadas. Os desenvolvedores acharam que eles exigiriam muito mais tempo para ficarem prontos para a ativação na Mainnet, e não queriam atrasar as outras EIPs da Pectra. Então eles disseram que o PeerDAS e o EOF claramente precisam de mais tempo — eles os empurrarão para outra atualização e não reterão as outras EIPs da Pectra da Mainnet.

Estes agora foram movidos para a Fusaka. Verkle foi inicialmente programado para a Fusaka, mas desde então foi ainda mais adiado. EOF e PeerDAS estão na Fusaka por enquanto. Existem outras EIPs que os desenvolvedores reconsiderarão para inclusão na Fusaka — a transição SSZ, listas de inclusão, mudanças na emissão, expiração de histórico, ePBS e a direção da abstração de conta.

#### Perguntas e Respostas (22:02) {#qa-2202}

**Apresentador:** Quando sai o EOF?

**Christine Kim:** Eu literalmente acabei de dizer que os desenvolvedores vão tentar colocá-lo na Fusaka. Eu acho que é provável? Provavelmente não. Eu acho que a Fusaka vai acontecer em 2025? Absolutamente não. A quantidade de tempo que levou para preparar a Pectra — a Fusaka levará um tempo semelhante, se não maior.

**Apresentador:** Existe um caminho de emergência para aumentar o alvo de blob entre agora e a ativação da Pectra?

**Christine Kim:** Não. O alvo de blob é um parâmetro codificado de forma rígida na camada de execução e na camada de consenso. Para que a capacidade de blob mude, os desenvolvedores precisam fazer uma bifurcação rígida. Eu não acho que haja qualquer maneira de a capacidade de blob aumentar entre agora e a Pectra sem uma bifurcação rígida.

**Apresentador:** A proposta é alterar apenas o limite de blob ou também o alvo de blob?

**Christine Kim:** Ótima pergunta. O aumento mais conservador é de três para quatro — apenas mudando o alvo, sem mudar o máximo de forma alguma. Mas não é isso que os desenvolvedores da camada 2 (l2) pediram. Há um representante da equipe da Base — a equipe da Base da Coinbase — e ele tem lutado por aumentos mais agressivos. Ele mostrou dados para sugerir que o aumento não impactaria negativamente a descentralização do Ethereum. Há uma proposta conservadora para apenas mudar o alvo, e então há uma proposta mais ambiciosa para mudar tanto o máximo quanto o alvo — como oito e quatro, ou seis e doze. Existem vários gradientes.

**Apresentador:** Você incentivou as pessoas a se envolverem mais na governança. Como a comunidade pode se envolver mais?

**Christine Kim:** ETH Research e ETH Magicians são dois fóruns de discussão muito bons para votar a favor de certas EIPs e mostrar seu apoio. As chamadas ACD são provavelmente o lugar de maior relevância — tudo o que você precisa fazer é deixar um comentário na agenda da chamada ACD no GitHub e dizer que esta é uma EIP sobre a qual você gostaria de falar ou apresentar. O moderador da chamada geralmente é muito receptivo em lhe dar o tempo. Mas não tome muito tempo — talvez cinco minutos para dar o seu recado.