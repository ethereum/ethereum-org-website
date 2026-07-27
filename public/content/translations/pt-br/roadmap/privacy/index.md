---
title: O roteiro de privacidade do Ethereum
description: O Ethereum está trabalhando para tornar a privacidade uma propriedade de primeira classe da rede por meio de atualizações que protegem a privacidade das transações, garantem o acesso aos dados do usuário e permitem uma identidade verificável, porém privada.
lang: pt-br
image: /images/roadmap/roadmap-security.png
alt: "Roteiro do Ethereum"
template: roadmap
---

**A privacidade no Ethereum está passando de um complemento opcional para um padrão no nível da rede.** Os roteiros de privacidade propostos para o Ethereum visam pontos de conexão vulneráveis específicos onde os dados do usuário podem vazar hoje. A pesquisa em todo o ecossistema visa tornar o Ethereum uma plataforma onde a privacidade seja estrutural, em vez de opcional.

Pesquisadores da Fundação Ethereum [agregaram três prioridades principais do roteiro](https://pse.dev/blog/pse-roadmap-2025) a partir da pesquisa distribuída do ecossistema:

- **Leituras privadas** - consultar e navegar no Ethereum sem revelar quais endereços, contratos ou dados um usuário está acessando. Proteger as leituras impede que os dados sejam coletados antes mesmo de uma transação ser assinada.
- **Escritas privadas** - enviar transações que sejam resistentes à censura e ao vazamento de metadados, desde a inclusão na mempool até a liquidação final. Proteger as escritas garante que as transações privadas não sejam censuradas ou vinculadas à sua origem.
- **Provas privadas** - verificar identidade, elegibilidade ou dados sem divulgar informações pessoais subjacentes, usando provas de conhecimento zero eficientes. As provas privadas permitem que os usuários participem da rede optando por revelar apenas o mínimo de informações necessárias (divulgação seletiva).

Juntas, essas três áreas formam um modelo de privacidade de ponta a ponta. O objetivo é a **soberania computacional**, garantindo que o Ethereum seja uma plataforma onde indivíduos e instituições possam interagir, coordenar e transacionar globalmente sem coleta de dados não aprovada, vigilância ou censura centralizada.

**Por que a privacidade é importante?** Aprenda sobre privacidade, como proteger sua privacidade online e como proteger sua privacidade no Ethereum hoje.

<ButtonLink variant="outline" href="/privacy/">Mais sobre privacidade</ButtonLink>

## Leituras privadas protegem consultas de usuários e dados de acesso {#private-reads}

Antes de uma transação ser assinada, um usuário precisa ler dados da blockchain. Para verificar um saldo, estimar o gas ou verificar o estado de um contrato inteligente, o software da carteira envia consultas a um provedor de nó. Essas consultas padrão de **Chamada de Procedimento Remoto (RPC)** expõem uma quantidade imensa de metadados.

O provedor de nó pode ver o endereço IP do usuário, a impressão digital do dispositivo, os endereços específicos consultados e o momento e a frequência de sua atividade. Mesmo que um usuário envie uma transação privada em seguida, o provedor de infraestrutura já tem acesso a um mapa detalhado de suas intenções.

<VideoWatch slug="ethereum-privacy-stack-andy-guzman" />

O vazamento de metadados na camada de acesso é um dos problemas de privacidade mais persistentes em todos os sistemas de blockchain. O Ethereum visa resolver o vazamento de metadados por meio da privacidade na origem, ou seja, ocultando quem perguntou, privacidade no conteúdo, ou seja, ocultando o que foi perguntado, e verificando a exatidão das informações retornadas.

A **privacidade de origem** usa [RPC anônimo](https://privreads.ethereum.foundation/feed/anon-rpc/) e soluções de rede anônima para ocultar a entidade que solicita os dados, a **privacidade de conteúdo** usa táticas como recuperação de informações privadas e [RAM alheia (oblivious RAM)](https://en.wikipedia.org/wiki/Oblivious_RAM) para ocultar os dados que estão sendo consultados, enquanto a **verificação de exatidão** usa clientes leves para provar que os dados retornados são precisos.

O bloco de construção criptográfico por trás da privacidade de conteúdo é a [**Recuperação de Informações Privadas (PIR)**](https://en.wikipedia.org/wiki/Private_information_retrieval), uma técnica de criptografia que permite que um cliente consulte um banco de dados e recupere uma informação específica sem revelar ao servidor qual item foi acessado. O servidor processa a solicitação às cegas e retorna uma resposta criptografada que apenas a carteira que fez a consulta pode descriptografar.

A PIR opera na camada de acesso, situando-se entre o software da carteira e os provedores de nó. À medida que as implementações de PIR amadurecerem, elas serão integradas aos kits de desenvolvimento de software (SDKs) de carteiras e aos provedores de infraestrutura, permitindo que os usuários consultem a rede sem expor suas atividades a intermediários centralizados.

As leituras privadas também reduzem a exposição a ataques de front-running e de ordenação de transações. Se um provedor de infraestrutura não puder ver qual contrato inteligente ou endereço um usuário está consultando, ele não poderá vender essas informações para atores que lucram antecipando a atividade onchain.

## Escritas privadas evitam censura e vazamento de transações {#private-writes}

Depois que uma transação é enviada, ela passa pela infraestrutura da rede que pode observá-la ou bloqueá-la antes de ser registrada onchain. É aqui que muitos protocolos de privacidade falham na prática. Grandes construtores de blocos centralizados monitoram a mempool e podem silenciosamente deixar de lado ou censurar transações originadas de ferramentas de privacidade. Mesmo que a criptografia subjacente seja sólida, uma transação que nunca é incluída em um bloco não oferece proteção.

Duas atualizações no nível do protocolo resolvem esse problema juntas:

A [**EIP-8141 (Transações de Quadro)**](https://eips.ethereum.org/EIPS/eip-8141) introduz um novo tipo de transação que divide as transações em segmentos para validação de assinatura e autorização de taxas, e para as instruções reais da transação. As transações de quadro permitem que [contas inteligentes](/roadmap/account-abstraction/) definam seus próprios esquemas de assinatura e usem contratos externos para cobrir as taxas de gas. Regras estritas de isolamento (sandboxing) na mempool impedem que essas transações abram a rede para ataques de negação de serviço.

As transações de quadro estão sendo consideradas para a [atualização Hegotá](https://forkcast.org/upgrade/hegota/) do Ethereum, a próxima atualização da rede após a futura [atualização Glamsterdam](/roadmap/glamsterdam/). A mesma atualização também permitirá que contas inteligentes adotem [assinaturas seguras contra computação quântica](/roadmap/security/quantum-resistance/) antes que a transição completa da rede pós-quântica seja concluída.

<ExpandableCard title="Como as transações de frame (EIP-8141) permitem a privacidade?" eventCategory="/roadmap/privacy" eventName="clicked how do frame transactions enable privacy?">

As transações de quadro permitem que as contas escolham seu próprio método de verificação de assinatura. Para a privacidade, isso significa que os usuários podem adotar esquemas de assinatura que preservam a privacidade sem esperar por uma migração em larga escala em toda a rede. As transações de quadro também permitem a abstração da taxa de gas, permitindo que ferramentas de privacidade cubram os custos de transação sem expor os endereços dos usuários onchain.

</ExpandableCard>

A [**EIP-7805 (Listas de Inclusão Aplicadas por Escolha de Bifurcação, ou FOCIL)**](https://eips.ethereum.org/EIPS/eip-7805) fornece o mecanismo de aplicação para escritas privadas. Os proponentes de blocos são exigidos pelas regras de consenso a incluir transações em seus blocos a partir de listas de inclusão locais agregadas, que coletam transações de várias fontes. Se um construtor de blocos tentar censurar uma transação que apareceu nas listas de inclusão, os nós atestadores rejeitarão totalmente o bloco proposto. A FOCIL está sendo considerada atualmente para a [atualização Hegotá](https://forkcast.org/upgrade/hegota/).

As transações de quadro dão aos usuários a flexibilidade de construir transações que preservam a privacidade com esquemas de assinatura personalizados, enquanto a FOCIL garante que essas transações não possam ser censuradas seletivamente depois de entrarem na mempool. Juntas, elas abordam dois pontos de falha diferentes: uma permite o formato de transações privadas, a outra garante sua inclusão. Nenhum ator central pode bloquear uma transferência privada válida.

<VideoWatch slug="eip-7805-focil-explained" />

Um segundo ponto vulnerável para a privacidade do usuário é como o Ethereum rastreia a ordem das transações, chamado de sistema de nonce sequencial. No modelo de conta padrão do Ethereum, cada conta usa um único contador de incremento linear. Se uma transação privada for atrasada na mempool, todas as transações subsequentes dessa conta ficarão paradas atrás dela. A sequência de nonce também permite que observadores da rede vinculem várias transações à mesma conta de origem, prejudicando a privacidade.

A [**EIP-8250 (Nonces Chaveados para Transações de Quadro)**](https://eips.ethereum.org/EIPS/eip-8250), atualmente sendo considerada para a Hegotá, resolve isso permitindo que uma única conta gerencie várias sequências de transações paralelas simultaneamente. Os usuários podem executar muitas transações privadas em diferentes contextos ao mesmo tempo, e os observadores não podem mais correlacionar de forma confiável atividades distintas de volta à mesma conta principal.

### Pagamentos privados e transferência de valor {#private-payments}

Além do roteamento de transações e do gerenciamento de nonce, proteger as escritas exige blindar as identidades e os ativos envolvidos em uma transferência. Mesmo quando um usuário faz consultas de forma privada e transmite uma transação sem censura, os dados da transação registrados onchain permanecem visíveis publicamente. Qualquer pessoa pode ver quem enviou quanto para quem, e as empresas de análise de cadeia agregam esses dados em perfis pesquisáveis que persistem indefinidamente.

A [**EIP-8182 (Transferências Privadas de ETH e ERC-20)**](https://eips.ethereum.org/EIPS/eip-8182), proposta para a atualização Hegotá, introduz um pool blindado compartilhado e nativo diretamente no protocolo do Ethereum para transferências de ETH e ERC-20. Os pools de privacidade usam mistura criptográfica para cortar o vínculo entre depósito e saque, mas hoje estão disponíveis apenas por meio de aplicativos de privacidade, carteiras e redes de camada 2 (l2).

Historicamente, as soluções de privacidade no nível do aplicativo fraturaram a liquidez e sofreram com baixos conjuntos de anonimato. A EIP-8182 consolida as transferências blindadas no nível do protocolo, permitindo que os usuários roteiem fundos por meio de chaves de entrega ocultas sem exigir arquiteturas de carteira especializadas ou interagir com aplicativos fragmentados e opcionais.

Outras abordagens de pesquisa que estão sendo avançadas para a privacidade de transações incluem provas que permitem aos usuários demonstrar que os valores das transações são válidos sem revelar os valores reais (como bulletproofs e provas de intervalo). A pesquisa sobre **transações confidenciais** visa ocultar valores e, ao mesmo tempo, permitir que a rede verifique se nenhum valor foi criado ou destruído.

Essas soluções da camada de pagamento baseiam-se na infraestrutura descrita anteriormente nesta seção. A PIR protege a fase de preparação, as transações de quadro e a FOCIL garantem que os pagamentos privados cheguem à mempool sem censura, e as zkVMs permitem a criptografia complexa necessária para ocultar valores, mantendo as garantias de segurança da rede.

## Provas privadas e proteção de identidade {#private-proving}

A privacidade não se trata de ocultação total. Trata-se de **divulgação seletiva**, ou seja, escolher quais informações revelar, para quem e em quais termos. O Ethereum suporta a divulgação seletiva por meio de [**provas de conhecimento zero (ZKPs)**](/zero-knowledge-proofs/), que permitem que uma parte prove que uma afirmação é verdadeira sem revelar os dados subjacentes. Por exemplo, provar a cidadania sem revelar os detalhes do passaporte, ou provar um limite de idade sem revelar a data exata de nascimento.

As provas privadas conectam-se ao roteiro de privacidade ao permitir uma identidade verificável sem exposição de dados no nível do protocolo. Enquanto as leituras e escritas privadas protegem os metadados das transações, as provas privadas garantem que as verificações de identidade e elegibilidade necessárias para a participação no mundo real não exijam a entrega de dados pessoais a sistemas de verificação centralizados.

No roteiro de privacidade do Ethereum, as provas privadas são suportadas por trilhas de infraestrutura complementares, uma na camada de execução para tornar a computação privada possível no nível do protocolo, e outra na camada de acesso, que torna a computação privada prática em dispositivos de consumo.

As **máquinas virtuais de conhecimento zero (zkVMs)** permitem que os contratos inteligentes executem sua lógica e gerem uma prova criptográfica de que o trabalho foi feito corretamente. Quando essa prova é verdadeiramente de conhecimento zero, ela não revela nada sobre as entradas, o estado intermediário ou as saídas, desbloqueando a computação privada no nível da rede.

O nome "zkVM" carrega uma nuance; a maioria dos sistemas chamados de zkVMs hoje são sucintos em vez de conhecimento zero. Suas provas são pequenas e rápidas de verificar, mas não ocultam necessariamente os dados usados para gerá-las. Hoje, apenas um punhado de sistemas de prova fornece a propriedade de ocultação da qual os aplicativos de privacidade dependem. Os [benchmarks de Provas no Lado do Cliente (Client-Side Proving)](https://ethproofs.org/csp-benchmarks) rastreiam quais zkVMs foram analisadas quanto ao conhecimento zero real em suas propriedades de sistema. Fechar essa lacuna faz parte do trabalho de provas privadas do roteiro.

As transações de quadro (EIP-8141) também estão conectadas à implementação de zkVMs. Elas podem usar esquemas de verificação personalizados para enviar transições de estado verificadas por prova, permitindo que os aplicativos ofereçam ambientes de execução privados e enviem a prova criptográfica para a rede pública do Ethereum de que a ação foi feita corretamente, sem expor os próprios dados da transação.

As provas de conhecimento zero são excelentes para permitir que os indivíduos provem que seus dados são válidos, mantendo-os privados, mas não podem gerenciar facilmente contratos inteligentes onde vários usuários precisam interagir com um pool compartilhado de dados secretos ao mesmo tempo.

Para preencher essa lacuna, o roteiro do Ethereum incorpora a **Criptografia Totalmente Homomórfica (FHE)**. A FHE permite que os contratos inteligentes executem cálculos diretamente em dados criptografados sem nunca ter que descriptografar ou expor as informações subjacentes. A integração de blocos de construção de FHE e coprocessadores criptográficos especializados no Ethereum é essencial para aplicativos descentralizados que dependem de um "estado oculto" compartilhado, como formadores de mercado automatizados (AMMs) privados, pools de empréstimo confidenciais ou leilões de lances selados, onde as entradas de todos devem interagir enquanto permanecem completamente secretas.

As **provas no lado do cliente** tornam a geração dessas provas de privacidade prática em dispositivos do dia a dia. O projeto Client-Side Proving mantém um conjunto de benchmarks públicos comparando sistemas de prova e zkVMs em hardware de consumo, publicando os resultados em [ethproofs.org](https://ethproofs.org). A pesquisa técnica visa provas transparentes e [pós-quânticas](/roadmap/security/quantum-resistance/) com verificação direta onchain, tornando a computação privada mais rápida, mais fácil de verificar diretamente na rede Ethereum e viável em dispositivos móveis.

A [**iniciativa zkID**](https://pse.dev/projects/zk-id) produziu uma infraestrutura de código aberto alinhada com estruturas de identidade globais, incluindo a carteira de Identidade Digital Europeia (EUDI). O sistema de Credenciais Anônimas Abertas (OpenAC) fornece a impossibilidade de vinculação para credenciais emitidas, garantindo que várias provas geradas pelo mesmo usuário em diferentes plataformas não possam ser correlacionadas de volta a um único perfil.

No espaço de governança, o protocolo de [**Infraestrutura Mínima Anticonluio (MACI)**](https://maci.pse.dev/) fornece **ausência de recibo**, tornando criptograficamente impossível provar como uma conta votou. Como os eleitores não podem produzir um recibo mostrando sua escolha, a compra de votos e a coerção perdem seu incentivo econômico. A MACI garantiu decisões de financiamento no mundo real desde 2020 por meio do [clr.fund](https://clr.fund/), que distribuiu milhões de dólares em financiamento quadrático para bens públicos do Ethereum.

A votação com preservação de privacidade já está protegendo eleitores reais em ambientes de alto risco. A [Freedom Tool da Rarimo](https://docs.rarimo.com/freedom-tool/) usa a verificação de passaporte de conhecimento zero para permitir que os cidadãos provem que são elegíveis para votar sem revelar quem são. Ela impulsionou eleições paralelas anônimas e pesquisas de oposição em países como a Rússia (o voto da oposição [Russia2024](https://rarimo.medium.com/russian-opposition-use-rarimos-freedom-tool-to-launch-surveillance-free-voting-app-0d73ebea5e8a)), a Geórgia (o aplicativo de votação United Space) e o Irã (o projeto Iranians Vote), onde a segurança do eleitor depende do sigilo criptográfico da cédula.

As provas privadas também permitem a **privacidade ciente da conformidade**. Soluções de privacidade como pools de privacidade aceitam depósitos livremente, mas exigem que os usuários gerem provas de conhecimento zero de que seus fundos não se cruzam com endereços maliciosos conhecidos antes de sacar. O modelo de conformidade programável separa o ato de blindar transações do ato de demonstrar conformidade regulatória, permitindo que usuários comuns transacionem de forma privada enquanto atendem aos requisitos institucionais.

As zkEVMs podem executar essas verificações de conformidade de forma privada, verificando o status regulatório sem expor detalhes da transação ou identidades dos usuários.

## Progresso atual do roteiro {#current-progress}

A direção do desenvolvimento da privacidade no Ethereum é moldada pelo alinhamento em todo o ecossistema, em vez de qualquer organização única. O roteiro [strawmap.org](https://strawmap.org/) coleta atualizações propostas de todo o ecossistema para rastrear e propor onde a comunidade chegou a um consenso. Pesquisadores da Fundação Ethereum ajudam a administrar um roteiro paralelo de pesquisa e desenvolvimento em todo o ecossistema de pesquisa, focado no avanço de ferramentas de privacidade da camada de acesso, infraestrutura de identidade e sistemas cientes da conformidade. Ambos os exemplos refletem a mesma prioridade subjacente de tornar a privacidade no Ethereum estrutural em vez de opcional.

A pesquisa e o desenvolvimento em privacidade no Ethereum abrangem dezenas de equipes em todo o ecossistema. O trabalho está avançando em atualizações de protocolo, soluções de camada de acesso, infraestrutura de identidade e ferramentas cientes da conformidade.

**Atualizações de protocolo**: A EIP-8141 (Transações de Quadro), a EIP-7805 (FOCIL), a EIP-8250 (Nonces Chaveados) e a EIP-8182 (Pools Blindados no Nível do Protocolo) estão em desenvolvimento ativo e sendo consideradas para a [atualização Hegotá](https://forkcast.org/upgrade/hegota/), a próxima atualização da rede após a [Glamsterdam](/roadmap/glamsterdam/). A EIP-8025 (provas de execução opcionais) e as árvores Verkle também são direcionadas para a Hegotá, fornecendo a base para a computação privada baseada em zkEVM na Rede Principal do Ethereum. Paralelamente, a pesquisa está amadurecendo em torno de coprocessadores FHE para permitir contratos inteligentes criptografados multipartidários.

**Camada de acesso**: A pesquisa de PIR está progredindo com implementações ativas sendo testadas por equipes de infraestrutura. O SDK da carteira Kohaku está em desenvolvimento como uma referência de código aberto para carteiras que preservam a privacidade.

**Provas no lado do cliente**: As equipes estão usando ativamente resultados de testes baseados em benchmarks para otimizar como as provas de conhecimento zero são executadas em dispositivos padrão. Projetos como o Spartan-WHIR estão avançando em provas seguras e resistentes a computadores quânticos que podem ser facilmente verificadas diretamente na rede Ethereum. Iniciativas de pesquisa como a leanVM fornecem uma zkVM leve projetada para agrupar várias assinaturas criptográficas, reduzindo o tamanho dos dados de assinaturas seguras contra computação quântica em 250x para economizar espaço e reduzir os custos da rede.

**Identidade e provas**: A iniciativa zkID está produzindo esquemas de prova otimizados para dispositivos móveis. A MACI continua a garantir rodadas de financiamento quadrático e governança de DAOs, ferramentas como a Freedom Tool da Rarimo estão levando a votação de conhecimento zero para eleições no mundo real, e a pesquisa contínua prossegue em padrões de identidade que preservam a privacidade.

Nenhuma parte deste trabalho está concluída. Os cronogramas são metas, não garantias, e o [processo de governança baseado em consenso](/governance/) do Ethereum significa que o roteiro pode mudar à medida que a pesquisa avança. Mas o escopo do desenvolvimento ativo e o número de equipes trabalhando em privacidade representam um compromisso claro de tornar o Ethereum resistente à extração por padrão.

## Leitura adicional {#further-reading}

- [Privacidade no Ethereum](/privacy/)
- [Roteiro do PSE: 2025 e Além](https://pse.dev/blog/pse-roadmap-2025)
- [O Mandato da Fundação Ethereum](/foundation/mandate/)
- [strawmap.org](https://strawmap.org/)
- [Provas de conhecimento zero](/zero-knowledge-proofs/)
- [Identidade descentralizada](/decentralized-identity/)
- [Roteiro da Kohaku](https://notes.ethereum.org/@niard/KohakuRoadmap)
- [Benchmarks de Provas no Lado do Cliente](https://ethproofs.org/csp-benchmarks)
- [zkEVM em Números](https://zkevm.ethereum.foundation/)