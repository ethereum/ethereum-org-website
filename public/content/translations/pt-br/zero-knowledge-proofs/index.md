---
title: "O que são provas de conhecimento zero?"
metaTitle: Provas de conhecimento zero
description: "Uma introdução não técnica às provas de conhecimento zero para iniciantes."
lang: pt-br
---

Uma prova de conhecimento zero é uma maneira de provar a validade de uma afirmação sem revelar a própria afirmação. O 'provador' é a parte que tenta provar uma reivindicação, enquanto o 'verificador' é responsável por validar a reivindicação.

As provas de conhecimento zero apareceram pela primeira vez em um artigo de 1985, “[A complexidade do conhecimento de sistemas de prova interativos](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)”, que fornece uma definição de provas de conhecimento zero amplamente usada hoje:

> Um protocolo de conhecimento zero é um método pelo qual uma parte (o provador) **pode provar** a outra parte (o verificador) **que algo é verdadeiro, sem revelar nenhuma informação** além do fato de que essa afirmação específica é verdadeira.

As provas de conhecimento zero melhoraram ao longo dos anos e agora estão sendo usadas em várias aplicações do mundo real.

<VideoWatch slug="zero-knowledge-proofs-5-levels" />

## Por que precisamos de provas de conhecimento zero? {#why-zero-knowledge-proofs-are-important}

As provas de conhecimento zero representaram um avanço na criptografia aplicada, pois prometeram melhorar a segurança da informação para os indivíduos. Considere como você pode provar uma reivindicação (por exemplo, "Sou cidadão do país X") para outra parte (por exemplo, um provedor de serviços). Você precisaria fornecer "evidências" para apoiar sua reivindicação, como um passaporte nacional ou carteira de motorista.

Mas há problemas com essa abordagem, principalmente a falta de privacidade. As Informações de Identificação Pessoal (PII) compartilhadas com serviços de terceiros são armazenadas em bancos de dados centrais, que são vulneráveis a hacks. Com o roubo de identidade se tornando um problema crítico, há apelos por meios de compartilhamento de informações confidenciais que protejam mais a privacidade.

As provas de conhecimento zero resolvem esse problema **eliminando a necessidade de revelar informações para provar a validade das reivindicações**. O protocolo de conhecimento zero usa a afirmação (chamada de 'testemunha') como entrada para gerar uma prova sucinta de sua validade. Essa prova fornece fortes garantias de que uma afirmação é verdadeira sem expor as informações usadas em sua criação.

Voltando ao nosso exemplo anterior, a única evidência que você precisa para provar sua reivindicação de cidadania é uma prova de conhecimento zero. O verificador só precisa verificar se certas propriedades da prova são verdadeiras para se convencer de que a afirmação subjacente também é verdadeira.

## Casos de uso para provas de conhecimento zero {#use-cases-for-zero-knowledge-proofs}

### Pagamentos anônimos {#anonymous-payments}

Os pagamentos com cartão de crédito costumam ser visíveis para várias partes, incluindo o provedor de pagamentos, bancos e outras partes interessadas (por exemplo, autoridades governamentais). Embora a vigilância financeira tenha benefícios para identificar atividades ilegais, ela também prejudica a privacidade dos cidadãos comuns.

As criptomoedas foram criadas para fornecer um meio para os usuários realizarem transações privadas ponto a ponto. Mas a maioria das transações de criptomoeda é abertamente visível em blockchains públicas. As identidades dos usuários costumam ser pseudônimas e intencionalmente vinculadas a identidades do mundo real (por exemplo, incluindo endereços de ETH em perfis do Twitter ou GitHub) ou podem ser associadas a identidades do mundo real usando análises básicas de dados onchain e offchain.

Existem "moedas de privacidade" específicas projetadas para transações completamente anônimas. Blockchains focadas em privacidade, como Zcash e Monero, ocultam os detalhes da transação, incluindo endereços de remetente/destinatário, tipo de ativo, quantidade e a linha do tempo da transação.

Ao incorporar a tecnologia de conhecimento zero no protocolo, as redes [blockchain](/glossary/#blockchain) focadas em privacidade permitem que os [nós](/glossary/#node) validem transações sem precisar acessar os dados da transação. A [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) é um exemplo de um design proposto que permitirá transferências privadas nativas de valor na blockchain [Ethereum](/). Tais propostas são, no entanto, difíceis de implementar devido a uma mistura de preocupações de segurança, regulatórias e de experiência do usuário (UX).  

**As provas de conhecimento zero também estão sendo aplicadas para anonimizar transações em blockchains públicas**. Um exemplo é o Tornado Cash, um serviço descentralizado e não custodial que permite aos usuários realizar transações privadas no Ethereum. O Tornado Cash usa provas de conhecimento zero para ofuscar os detalhes da transação e garantir a privacidade financeira. Infelizmente, como essas são ferramentas de privacidade "opt-in" (opcionais), elas estão associadas a atividades ilícitas. Para superar isso, a privacidade deve eventualmente se tornar o padrão em blockchains públicas. Saiba mais sobre a [privacidade no Ethereum](/privacy/).

### Proteção de identidade {#identity-protection}

Os atuais sistemas de gerenciamento de identidade colocam as informações pessoais em risco. As provas de conhecimento zero podem ajudar os indivíduos a validar a identidade enquanto protegem detalhes confidenciais.

As provas de conhecimento zero são particularmente úteis no contexto da [identidade descentralizada](/decentralized-identity/). A identidade descentralizada (também descrita como 'identidade autossuficiente') dá ao indivíduo a capacidade de controlar o acesso a identificadores pessoais. Provar sua cidadania sem revelar seu CPF ou detalhes do passaporte é um bom exemplo de como a tecnologia de conhecimento zero permite a identidade descentralizada.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + Identidade em ação: Identidade Digital Nacional (NDI) do Butão no Ethereum
    </AlertTitle>
    <AlertDescription>
      <p>
        Um exemplo do mundo real do uso de ZKP para sistemas de gerenciamento de identidade é o sistema de Identidade Digital Nacional (NDI) do Reino do Butão, construído no Ethereum. A NDI do Butão usa ZKPs para permitir que os cidadãos provem criptograficamente fatos sobre si mesmos, como "Sou cidadão" ou "Tenho mais de 18 anos", sem revelar os dados pessoais confidenciais em sua identidade.
      </p>
      <p>
        Saiba mais sobre a NDI do Butão no <a href="/decentralized-identity/#national-and-government-id">estudo de caso de Identidade Descentralizada</a>.
      </p>
 
</AlertDescription>
 
</AlertContent>
</Alert>

### Prova de Humanidade {#proof-of-humanity}

Um dos exemplos mais amplamente usados de provas de conhecimento zero em ação hoje é o [protocolo World ID](https://world.org/blog/world/world-id-faqs), que pode ser considerado "um passaporte digital global para a era da IA". Ele permite que as pessoas provem que são indivíduos únicos sem revelar informações pessoais. Isso é alcançado por meio de um dispositivo chamado Orb, que escaneia a íris de uma pessoa e gera um código de íris. O código da íris é checado e verificado para confirmar que a pessoa é um ser humano biologicamente único. Após a verificação, um compromisso de identidade gerado no dispositivo do usuário (e não vinculado ou derivado dos dados biométricos) é adicionado a uma lista segura na blockchain. Então, sempre que o usuário quiser provar que é um humano verificado – seja para fazer login, votar ou realizar outras ações – ele pode gerar uma prova de conhecimento zero que confirma sua participação na lista. A beleza de usar uma prova de conhecimento zero é que apenas uma afirmação é revelada: essa pessoa é única. Todo o resto permanece privado.

O World ID depende do [protocolo Semaphore](https://docs.semaphore.pse.dev/) desenvolvido pela [equipe PSE](https://pse.dev/) na Fundação Ethereum. O Semaphore foi projetado para ser uma maneira leve, mas poderosa, de gerar e verificar provas de conhecimento zero. Ele permite que os usuários provem que fazem parte de um grupo (neste caso, humanos verificados) sem mostrar qual membro do grupo eles são. O Semaphore também é altamente flexível, permitindo que grupos sejam criados com base em uma ampla gama de critérios, como verificação de identidade, participação em eventos ou propriedade de credenciais.

### Autenticação {#authentication}

O uso de serviços online exige provar sua identidade e o direito de acessar essas plataformas. Isso geralmente requer o fornecimento de informações pessoais, como nomes, endereços de e-mail, datas de nascimento e assim por diante. Você também pode precisar memorizar senhas longas ou correr o risco de perder o acesso.

As provas de conhecimento zero, no entanto, podem simplificar a autenticação tanto para plataformas quanto para usuários. Uma vez que uma prova ZK tenha sido gerada usando entradas públicas (por exemplo, dados atestando a associação do usuário à plataforma) e entradas privadas (por exemplo, os detalhes do usuário), o usuário pode simplesmente apresentá-la para autenticar sua identidade quando precisar acessar o serviço. Isso melhora a experiência dos usuários e liberta as organizações da necessidade de armazenar grandes quantidades de informações dos usuários.

### Computação verificável {#verifiable-computation}

A computação verificável é outra aplicação da tecnologia de conhecimento zero para melhorar os designs de blockchain. A computação verificável nos permite terceirizar a computação para outra entidade, mantendo resultados verificáveis. A entidade envia o resultado junto com uma prova verificando que o programa foi executado corretamente.

A computação verificável é **crítica para melhorar as velocidades de processamento em blockchains** sem reduzir a segurança. Entender isso requer conhecer as diferenças nas soluções propostas para escalar o Ethereum.

As [soluções de escalabilidade onchain](/developers/docs/scaling/#onchain-scaling), como a cadeia de fragmentos, exigem modificações extensas na camada base da blockchain. No entanto, essa abordagem é altamente complexa e erros na implementação podem prejudicar o modelo de segurança do Ethereum.

As [soluções de escalabilidade offchain](/developers/docs/scaling/#offchain-scaling) não exigem o redesenho do protocolo principal do Ethereum. Em vez disso, elas dependem de um modelo de computação terceirizado para melhorar a vazão na camada base do Ethereum.

Veja como isso funciona na prática:

- Em vez de processar todas as transações, o Ethereum descarrega a execução para uma cadeia separada.

- Após processar as transações, a outra cadeia retorna os resultados a serem aplicados ao estado do Ethereum.

O benefício aqui é que o Ethereum não precisa fazer nenhuma execução e só precisa aplicar os resultados da computação terceirizada ao seu estado. Isso reduz o congestionamento da rede e também melhora as velocidades de transação (os protocolos offchain otimizam para uma execução mais rápida).

A cadeia precisa de uma maneira de validar transações offchain sem reexecutá-las, ou então o valor da execução offchain é perdido.

É aqui que a computação verificável entra em jogo. Quando um nó executa uma transação fora do Ethereum, ele envia uma prova de conhecimento zero para provar a correção da execução offchain. Essa prova (chamada de [prova de validade](/glossary/#validity-proof)) garante que uma transação seja válida, permitindo que o Ethereum aplique o resultado ao seu estado — sem esperar que alguém o conteste.

Os [rollups de conhecimento zero](/developers/docs/scaling/zk-rollups) e os [validiums](/developers/docs/scaling/validium/) são duas soluções de escalabilidade offchain que usam provas de validade para fornecer escalabilidade segura. Esses protocolos executam milhares de transações offchain e enviam provas para verificação no Ethereum. Esses resultados podem ser aplicados imediatamente assim que a prova for verificada, permitindo que o Ethereum processe mais transações sem aumentar a computação na camada base.

Além da escalabilidade da camada 2 (l2), as provas de conhecimento zero também podem verificar a própria execução do bloco da camada 1 (l1) do Ethereum. A [zkEVM para verificação da l1](/roadmap/zkevm/) permitiria que os validadores verificassem os blocos checando uma prova em vez de reexecutar todas as transações — permitindo limites de gás mais altos sem aumentar os requisitos de hardware do validador.

### Reduzindo o suborno e o conluio na votação onchain {#secure-blockchain-voting}

Os esquemas de votação em blockchain têm muitas características favoráveis: são totalmente auditáveis, seguros contra ataques, resistentes à censura e livres de restrições geográficas. Mas mesmo os esquemas de votação onchain não estão imunes ao problema do **conluio**.

Definido como "coordenar para limitar a concorrência aberta enganando, fraudando e induzindo outros ao erro", o conluio pode assumir a forma de um ator malicioso influenciando a votação oferecendo subornos. Por exemplo, Alice pode receber um suborno de Bob para dar um voto para a `option B` em uma cédula, mesmo que ela prefira a `option A`.

O suborno e o conluio limitam a eficácia de qualquer processo que use a votação como um mecanismo de sinalização (especialmente onde os usuários podem provar como votaram). Isso pode ter consequências significativas, especialmente onde os votos são responsáveis pela alocação de recursos escassos.

Por exemplo, os [mecanismos de financiamento quadrático](https://www.radicalxchange.org/wiki/plural-funding/) dependem de doações para medir a preferência por certas opções entre diferentes projetos de bem público. Cada doação conta como um "voto" para um projeto específico, com os projetos que recebem mais votos obtendo mais fundos do pool de correspondência.

O uso da votação onchain torna o financiamento quadrático suscetível ao conluio: as transações da blockchain são públicas, de modo que os subornadores podem inspecionar a atividade onchain de um subornado para ver como eles "votaram". Dessa forma, o financiamento quadrático deixa de ser um meio eficaz para alocar fundos com base nas preferências agregadas da comunidade.

Felizmente, soluções mais recentes, como a MACI (Infraestrutura Mínima Anticonluio), estão usando provas de conhecimento zero para tornar a votação onchain (por exemplo, mecanismos de financiamento quadrático) resistente a suborno e conluio. A MACI é um conjunto de contratos inteligentes e scripts que permitem que um administrador central (chamado de "coordenador") agregue votos e conte os resultados _sem_ revelar detalhes sobre como cada indivíduo votou. Mesmo assim, ainda é possível verificar se os votos foram contados corretamente ou confirmar que um determinado indivíduo participou da rodada de votação.

#### Como a MACI funciona com provas de conhecimento zero? {#how-maci-works-with-zk-proofs}

No início, o coordenador implanta o contrato MACI no Ethereum, após o qual os usuários podem se inscrever para a votação (registrando sua chave pública no contrato inteligente). Os usuários emitem votos enviando mensagens criptografadas com sua chave pública para o contrato inteligente (um voto válido deve ser assinado com a chave pública mais recente associada à identidade do usuário, entre outros critérios). Depois, o coordenador processa todas as mensagens assim que o período de votação termina, conta os votos e verifica os resultados onchain.

Na MACI, as provas de conhecimento zero são usadas para garantir a correção da computação, tornando impossível para o coordenador processar incorretamente os votos e contar os resultados. Isso é alcançado exigindo que o coordenador gere provas ZK-SNARK verificando que a) todas as mensagens foram processadas corretamente b) o resultado final corresponde à soma de todos os votos _válidos_.

Assim, mesmo sem compartilhar um detalhamento dos votos por usuário (como costuma ser o caso), a MACI garante a integridade dos resultados calculados durante o processo de contagem. Esse recurso é útil para reduzir a eficácia de esquemas básicos de conluio. Podemos explorar essa possibilidade usando o exemplo anterior de Bob subornando Alice para votar em uma opção:

- Alice se registra para votar enviando sua chave pública para um contrato inteligente.
- Alice concorda em votar na `option B` em troca de um suborno de Bob.
- Alice vota na `option B`.
- Alice envia secretamente uma transação criptografada para alterar a chave pública associada à sua identidade.
- Alice envia outra mensagem (criptografada) para o contrato inteligente votando na `option A` usando a nova chave pública.
- Alice mostra a Bob uma transação que mostra que ela votou na `option B` (o que é inválido, pois a chave pública não está mais associada à identidade de Alice no sistema).
- Ao processar as mensagens, o coordenador ignora o voto de Alice na `option B` e conta apenas o voto na `option A`. Portanto, a tentativa de Bob de entrar em conluio com Alice e manipular o voto onchain falha.

O uso da MACI _exige_ confiar que o coordenador não entrará em conluio com subornadores ou tentará subornar os próprios eleitores. O coordenador pode descriptografar as mensagens do usuário (necessário para criar a prova), para que possa verificar com precisão como cada pessoa votou.

Mas nos casos em que o coordenador permanece honesto, a MACI representa uma ferramenta poderosa para garantir a santidade da votação onchain. Isso explica sua popularidade entre os aplicativos de financiamento quadrático (por exemplo, [clr.fund](https://clr.fund/#/about/maci)) que dependem fortemente da integridade das escolhas de votação de cada indivíduo.

[Saiba mais sobre a MACI](https://maci.pse.dev/).

## Como funcionam as provas de conhecimento zero? {#how-do-zero-knowledge-proofs-work}

Uma prova de conhecimento zero permite que você prove a verdade de uma afirmação sem compartilhar o conteúdo da afirmação ou revelar como você descobriu a verdade. Para tornar isso possível, os protocolos de conhecimento zero dependem de algoritmos que recebem alguns dados como entrada e retornam 'verdadeiro' ou 'falso' como saída.

Um protocolo de conhecimento zero deve satisfazer os seguintes critérios:

1. **Completude**: Se a entrada for válida, o protocolo de conhecimento zero sempre retornará 'verdadeiro'. Portanto, se a afirmação subjacente for verdadeira e o provador e o verificador agirem honestamente, a prova poderá ser aceita.

2. **Solidez**: Se a entrada for inválida, é teoricamente impossível enganar o protocolo de conhecimento zero para retornar 'verdadeiro'. Portanto, um provador mentiroso não pode enganar um verificador honesto fazendo-o acreditar que uma afirmação inválida é válida (exceto com uma margem minúscula de probabilidade).

3. **Conhecimento zero**: O verificador não aprende nada sobre uma afirmação além de sua validade ou falsidade (ele tem "conhecimento zero" da afirmação). Esse requisito também impede que o verificador derive a entrada original (o conteúdo da afirmação) a partir da prova.

Em sua forma básica, uma prova de conhecimento zero é composta por três elementos: **testemunha**, **desafio** e **resposta**.

- **Testemunha**: Com uma prova de conhecimento zero, o provador quer provar o conhecimento de alguma informação oculta. A informação secreta é a "testemunha" da prova, e o conhecimento presumido do provador sobre a testemunha estabelece um conjunto de perguntas que só podem ser respondidas por uma parte com conhecimento da informação. Assim, o provador inicia o processo de prova escolhendo aleatoriamente uma pergunta, calculando a resposta e enviando-a ao verificador.

- **Desafio**: O verificador escolhe aleatoriamente outra pergunta do conjunto e pede ao provador que a responda.

- **Resposta**: O provador aceita a pergunta, calcula a resposta e a retorna ao verificador. A resposta do provador permite que o verificador cheque se o primeiro realmente tem acesso à testemunha. Para garantir que o provador não esteja adivinhando cegamente e obtendo as respostas corretas por acaso, o verificador escolhe mais perguntas para fazer. Ao repetir essa interação muitas vezes, a possibilidade de o provador fingir conhecimento da testemunha cai significativamente até que o verificador esteja satisfeito.

O texto acima descreve a estrutura de uma 'prova de conhecimento zero interativa'. Os primeiros protocolos de conhecimento zero usavam provas interativas, onde a verificação da validade de uma afirmação exigia comunicação de ida e volta entre provadores e verificadores.

Um bom exemplo que ilustra como as provas interativas funcionam é a famosa [história da caverna de Ali Babá](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) de Jean-Jacques Quisquater. Na história, Peggy (a provadora) quer provar a Victor (o verificador) que ela conhece a frase secreta para abrir uma porta mágica sem revelar a frase.

### Provas de conhecimento zero não interativas {#non-interactive-zero-knowledge-proofs}

Embora revolucionária, a prova interativa tinha utilidade limitada, pois exigia que as duas partes estivessem disponíveis e interagissem repetidamente. Mesmo que um verificador estivesse convencido da honestidade de um provador, a prova estaria indisponível para verificação independente (calcular uma nova prova exigia um novo conjunto de mensagens entre o provador e o verificador).

Para resolver esse problema, Manuel Blum, Paul Feldman e Silvio Micali sugeriram as primeiras [provas de conhecimento zero não interativas](https://dl.acm.org/doi/10.1145/62212.62222) onde o provador e o verificador têm uma chave compartilhada. Isso permite que o provador demonstre seu conhecimento de alguma informação (ou seja, testemunha) sem fornecer a própria informação.

Ao contrário das provas interativas, as provas não interativas exigiam apenas uma rodada de comunicação entre os participantes (provador e verificador). O provador passa a informação secreta para um algoritmo especial para calcular uma prova de conhecimento zero. Essa prova é enviada ao verificador, que checa se o provador conhece a informação secreta usando outro algoritmo.

A prova não interativa reduz a comunicação entre o provador e o verificador, tornando as provas ZK mais eficientes. Além disso, uma vez que uma prova é gerada, ela fica disponível para qualquer outra pessoa (com acesso à chave compartilhada e ao algoritmo de verificação) verificar.

As provas não interativas representaram um avanço para a tecnologia de conhecimento zero e estimularam o desenvolvimento de sistemas de prova usados hoje. Discutimos esses tipos de prova abaixo:

### Tipos de provas de conhecimento zero {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK é um acrônimo para **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge** (Argumento de Conhecimento Sucinto Não Interativo de Conhecimento Zero). O protocolo ZK-SNARK tem as seguintes qualidades:

- **Conhecimento zero**: Um verificador pode validar a integridade de uma afirmação sem saber mais nada sobre a afirmação. O único conhecimento que o verificador tem da afirmação é se ela é verdadeira ou falsa.

- **Sucinto**: A prova de conhecimento zero é menor que a testemunha e pode ser verificada rapidamente.

- **Não interativo**: A prova é 'não interativa' porque o provador e o verificador interagem apenas uma vez, ao contrário das provas interativas que exigem várias rodadas de comunicação.

- **Argumento**: A prova satisfaz o requisito de 'solidez', portanto, trapacear é extremamente improvável.

- **(De) Conhecimento**: A prova de conhecimento zero não pode ser construída sem acesso à informação secreta (testemunha). É difícil, se não impossível, para um provador que não tem a testemunha calcular uma prova de conhecimento zero válida.

A 'chave compartilhada' mencionada anteriormente refere-se a parâmetros públicos que o provador e o verificador concordam em usar na geração e verificação de provas. A geração dos parâmetros públicos (conhecidos coletivamente como Common Reference String (CRS) ou String de Referência Comum) é uma operação sensível devido à sua importância na segurança do protocolo. Se a entropia (aleatoriedade) usada na geração da CRS cair nas mãos de um provador desonesto, ele poderá calcular provas falsas.

A [computação multipartidária (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) é uma maneira de reduzir os riscos na geração de parâmetros públicos. Várias partes participam de uma [cerimônia de configuração confiável](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), onde cada pessoa contribui com alguns valores aleatórios para gerar a CRS. Contanto que uma parte honesta destrua sua porção da entropia, o protocolo ZK-SNARK retém a solidez computacional.

As configurações confiáveis exigem que os usuários confiem nos participantes na geração de parâmetros. No entanto, o desenvolvimento de ZK-STARKs permitiu protocolos de prova que funcionam com uma configuração não confiável.

#### ZK-STARKs {#zk-starks}

ZK-STARK é um acrônimo para **Zero-Knowledge Scalable Transparent Argument of Knowledge** (Argumento de Conhecimento Transparente Escalável de Conhecimento Zero). Os ZK-STARKs são semelhantes aos ZK-SNARKs, exceto que são:

- **Escalável**: O ZK-STARK é mais rápido que o ZK-SNARK na geração e verificação de provas quando o tamanho da testemunha é maior. Com as provas STARK, os tempos do provador e de verificação aumentam apenas ligeiramente à medida que a testemunha cresce (os tempos do provador e do verificador SNARK aumentam linearmente com o tamanho da testemunha).

- **Transparente**: O ZK-STARK depende de aleatoriedade publicamente verificável para gerar parâmetros públicos para prova e verificação em vez de uma configuração confiável. Assim, eles são mais transparentes em comparação com os ZK-SNARKs.

Os ZK-STARKs produzem provas maiores que os ZK-SNARKs, o que significa que geralmente têm sobrecargas de verificação mais altas. No entanto, há casos (como provar grandes conjuntos de dados) em que os ZK-STARKs podem ser mais econômicos do que os ZK-SNARKs.

## Desvantagens do uso de provas de conhecimento zero {#drawbacks-of-using-zero-knowledge-proofs}

### Custos de hardware {#hardware-costs}

A geração de provas de conhecimento zero envolve cálculos muito complexos, melhor executados em máquinas especializadas. Como essas máquinas são caras, elas costumam estar fora do alcance de indivíduos comuns. Além disso, os aplicativos que desejam usar a tecnologia de conhecimento zero devem levar em consideração os custos de hardware — o que pode aumentar os custos para os usuários finais.

### Custos de verificação de prova {#proof-verification-costs}

A verificação de provas também requer computação complexa e aumenta os custos de implementação da tecnologia de conhecimento zero em aplicativos. Esse custo é particularmente relevante no contexto da prova de computação. Por exemplo, os rollups ZK pagam ~ 500.000 de gás para verificar uma única prova ZK-SNARK no Ethereum, com os ZK-STARKs exigindo taxas ainda mais altas.

### Premissas de confiança {#trust-assumptions}

No ZK-SNARK, a Common Reference String (parâmetros públicos) é gerada uma vez e disponibilizada para reutilização pelas partes que desejam participar do protocolo de conhecimento zero. Os parâmetros públicos são criados por meio de uma cerimônia de configuração confiável, onde se presume que os participantes sejam honestos.

Mas não há realmente nenhuma maneira de os usuários avaliarem a honestidade dos participantes e os usuários precisam confiar na palavra dos desenvolvedores. Os ZK-STARKs estão livres de premissas de confiança, pois a aleatoriedade usada na geração da string é publicamente verificável. Enquanto isso, os pesquisadores estão trabalhando em configurações não confiáveis para ZK-SNARKs para aumentar a segurança dos mecanismos de prova.

### Ameaças da computação quântica {#quantum-computing-threats}

O ZK-SNARK usa criptografia de curva elíptica para criptografia. Embora o problema do logaritmo discreto da curva elíptica seja considerado intratável por enquanto, o desenvolvimento de computadores quânticos pode quebrar esse modelo de segurança no futuro.

O ZK-STARK é considerado imune à ameaça da computação quântica, pois depende apenas de funções de hash resistentes a colisões para sua segurança. Ao contrário dos pares de chaves público-privadas usados na criptografia de curva elíptica, a geração de hash resistente a colisões é mais difícil de ser quebrada por algoritmos de computação quântica.

## Leitura adicional {#further-reading}

- [Visão geral dos casos de uso para provas de conhecimento zero](https://pse.dev/projects) — _Equipe de Explorações de Privacidade e Escalabilidade_
- [SNARKs vs. STARKS vs. SNARKs Recursivos](https://www.alchemy.com/overviews/snarks-vs-starks) — _Visões Gerais da Alchemy_
- [Uma Prova de Conhecimento Zero: Melhorando a Privacidade em uma Blockchain](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARKs — Um Exemplo Realista de Conhecimento Zero e Exploração Detalhada](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARKs — Crie Confiança Verificável, mesmo contra Computadores Quânticos](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Uma introdução aproximada de como os zk-SNARKs são possíveis](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Por que as Provas de Conhecimento Zero (ZKPs) são um Divisor de Águas para a Identidade Autossuficiente](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [EIP-7503 Explicada: Habilitando Transferências Privadas no Ethereum com Provas ZK](https://web.archive.org/web/20251116093505/https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions/) — _Emmanuel Awosika_
- [Jogo de Cartas ZK: jogo para aprender os fundamentos de ZK e casos de uso da vida real](https://github.com/ZK-card/zk-cards) - _ZK-Cards_
