---
title: Prova de conhecimento zero
description: Uma introdução não técnica às provas de conhecimento zero para iniciantes.
lang: pt-br
---

# O que são provas de conhecimento zero? {#what-are-zk-proofs}

Uma prova de conhecimento zero é uma forma de provar a validade de uma afirmação sem a revelar. O “provador” é a parte que tenta provar uma reivindicação, enquanto o “verificador” é responsável pela validação da reivindicação.

As provas de conhecimento zero apareceram pela primeira vez em um artigo de 1985, “[A complexidade conhecida dos sistemas de prova interativos](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)que fornece uma definição de provas de conhecimento zero amplamente utilizadas hoje:

> Um protocolo de conhecimento zero é um método pelo qual uma parte (o provador) **pode comprovar** a outra parte (o verificador) **que algo é verdadeiro, sem revelar nenhuma informação** além do fato de que essa declaração específica é verdadeira.

As provas de conhecimento zero melhoraram ao longo dos anos e agora estão sendo usadas em várias aplicações do mundo real.

<YouTube id="fOGdb1CTu5c" />

## Por que precisamos de provas de conhecimento zero? {#why-zero-knowledge-proofs-are-important}

As provas de conhecimento zero representaram um avanço na criptografia aplicada, pois prometeram melhorar a segurança da informação para os indivíduos. Considere como você pode provar uma reivindicação (por exemplo, "sou um cidadão do país X") para outra parte (por exemplo, um provedor de serviços). Você precisaria fornecer "provas" para sustentar sua reivindicação, como um passaporte ou uma carteira de motorista.

Porém, há problemas com esta abordagem, principalmente com a falta de privacidade. Informações de identificação pessoal (PII) compartilhadas com serviços de terceiros são armazenadas em bancos de dados centrais, que são vulneráveis a hacks. Com o fato de o roubo de identidade ter se tornado um problema crítico, existe uma demanda por mais meios de proteção da privacidade no compartilhamento de informações confidenciais.

As provas de conhecimento zero resolvem esse problema ao **eliminar a necessidade de revelar informações para provar a validade das afirmações**. O protocolo de conhecimento zero usa a declaração (chamada "testemunha") como entrada para gerar uma prova sucinta de sua validade. Essa prova oferece fortes garantias de que uma declaração é verdadeira sem expor a informação utilizada na sua criação.

Voltando ao nosso exemplo anterior, a única evidência de que é necessário provar a sua reivindicação de cidadania é uma prova de conhecimento zero. O verificador só precisa verificar se certas propriedades da prova em questão são verdadeiras para estar convencido de que a declaração subjacente também é verdadeira.

## Casos de uso para provas de conhecimento zero {#use-cases-for-zero-knowledge-proofs}

### Pagamentos anônimos {#anonymous-payments}

Pagamentos com cartão de crédito são frequentemente visíveis para várias partes, incluindo o provedor de pagamentos, bancos e outras partes interessadas (por exemplo, autoridades do governo). Embora a supervisão financeira tenha benefícios ao identificar atividades ilegais, ela também prejudica a privacidade dos cidadãos comuns.

O objetivo das criptomoedas era fornecer um meio para os usuários realizarem transações privadas entre pares. Mas a maioria das transações de criptomoedas são abertamente visíveis em blockchains públicas. Identidades de usuário são muitas vezes pseudônimo e ambos intencionalmente ligados a identidades do mundo real (por exemplo, incluindo endereços ETH nos perfis do Twitter ou GitHub) ou pode ser associado com identidades no mundo real usando análises de dados básicas dentro e fora da cadeia.

Existem "moedas de privacidade" específicas desenhadas para transações completamente anônimas. Blockchains focadas na privacidade, como Zcash e Monero, protegem detalhes da transação, incluindo endereços do remetente/destinatário, tipo de ativo, quantidade e linha do tempo da transação.

Ao incorporar a tecnologia de conhecimento zero ao protocolo, as redes [blockchain](/glossary/#blockchain) voltadas para a privacidade permitem que os [nós](/glossary/#node) validem as transações sem precisar acessar os dados da transação.

<0>Provas de conhecimento zero também estão sendo aplicadas para tornar anônimas transações em blockchains públicas</0>. Um exemplo é o Tornado Cash, um serviço descentralizado e sem custódia que permite aos usuários realizar transações privadas no Ethereum. O Tornado Cash usa provas de conhecimento zero para ofuscar os detalhes das transações e garantir privacidade financeira. Infelizmente, por se tratar de ferramentas de privacidade "opt-in", elas estão associadas a atividades ilícitas. Para superar isso, a privacidade deve se tornar o padrão em blockchains públicas.

### Proteção de identidade {#identity-protection}

Os atuais sistemas de gestão de identidade colocam em risco a informação pessoal. Provas de conhecimento zero podem ajudar os indivíduos a validar a identidade enquanto protegem detalhes confidenciais.

Provas de conhecimento zero são particularmente úteis no contexto de uma [identidade descentralizada](/decentralized-identity/). Identidade descentralizada (também descrita como "identidade autossoberana") dá ao indivíduo a capacidade de controlar o acesso aos identificadores pessoais. Prover a sua cidadania sem revelar o seu documento de identidade fiscal ou detalhes do seu passaporte é um bom exemplo de como a tecnologia de conhecimento zero permite a identidade descentralizada.

### Autenticação {#authentication}

Para usar os serviços online é necessário provar sua identidade e o direito de acesso a essas plataformas. Isso requer, frequentemente, o fornecimento de informações pessoais, como nomes, endereços de e-mail, datas de nascimento e assim por diante. Você também poderá precisar decorar senhas longas ou correr o risco de perder o acesso.

No entanto, provas de conhecimento zero podem simplificar a autenticação para plataformas e usuários. Uma vez que uma prova de ZK foi gerada usando entradas públicas (por exemplo, dados que atestam que o membro é usuário da plataforma) e entradas privadas (por exemplo, os detalhes do usuário), o usuário pode simplesmente apresentá-lo para autenticar sua identidade quando ele precisar acessar o serviço. Isso melhora a experiência para usuários e libera as empresas da necessidade de armazenar grandes quantidades de informação do usuário.

### Computação verificável {#verifiable-computation}

Computação verificável é outra aplicação de tecnologia de conhecimento zero para melhorar os projetos de blockchain. A computação verificável nos permite terceirizar a computação para outra entidade, mantendo resultados verificáveis. A entidade envia o resultado juntamente com uma prova verificando que o programa foi executado corretamente.

A computação verificável é **crítica para melhorar as velocidades de processamento em blockchains** sem reduzir a segurança. Compreender isso requer conhecer as diferenças nas soluções propostas para dimensionar o Ethereum.

[Soluções de dimensionamento em cadeia](/developers/docs/scaling/#on-chain-scaling), como fragmentação, exigem ampla modificação da camada base da blockchain. No entanto, essa abordagem é altamente complexa e erros na implementação podem comprometer o modelo de segurança do Ethereum.

As [soluções de dimensionamento fora da cadeia](/developers/docs/scaling/#off-chain-scaling) não exigem a reformulação do protocolo central do Ethereum. Em vez disso, elas contam com um modelo de computação terceirizado para melhorar a taxa de transferência na camada base do Ethereum.

Veja como isso funciona na prática:

- Em vez de processar todas as transações, o Ethereum transfere a execução para uma cadeia separada.

- Após o processamento das transações, a outra cadeia retorna os resultados para serem aplicados ao estado do Ethereum.

A vantagem aqui é que o Ethereum não precisa fazer nenhuma execução e só precisa aplicar os resultados da computação terceirizada ao seu estado. Isso reduz o congestionamento da rede e também melhora as velocidades de transação (protocolos fora da cadeia otimizados para execução mais rápida).

A cadeia precisa de uma maneira de validar transações fora da cadeia sem reexecutá-las, caso contrário, o valor da execução fora da cadeia é perdido.

É aqui que a computação verificável entra em jogo. Quando um nó executa uma transação fora do Ethereum, ele envia uma prova de conhecimento zero para provar a correção da execução fora da cadeia. Essa prova (chamada [prova de validação](/glossary/#validity-proof)) garante que uma transação é válida, permitindo que o Ethereum aplique o resultado ao seu estado, sem esperar que alguém conteste.

[Roll-ups de conhecimento zero](/developers/docs/scaling/zk-rollups) e [validos](/developers/docs/scaling/validium/) são duas soluções de escalabilidade fora de cadeia que usam provas de validação para fornecer escalabilidade segura. Esses protocolos executam milhares de transações fora da cadeia e enviam provas para verificação no Ethereum. Esses resultados podem ser aplicados imediatamente após a verificação da prova, permitindo que o Ethereum processe mais transações sem aumentar a computação na camada base.

### Redução do suborno e conivência na votação em cadeia {#secure-blockchain-voting}

Os esquemas de votação em blockchain têm muitas características favoráveis: eles são totalmente auditáveis, protegidos contra ataques, resistentes à censura e livres de restrições geográficas. Mas mesmo os esquemas de votação em cadeia não são imunes ao problema de **conluio**.

Definido como “coordenar para limitar a concorrência aberta enganando, defraudando e enganando os outros”, um conluio pode assumir a forma de uma pessoa maliciosa que influencia os votos oferecendo subornos. Por exemplo, Alice pode receber um suborno de Bob para votar na `opção B` em uma cédula, mesmo que ela prefira a `opção A`.

Suborno e conluio limitam a efetividade de qualquer processo que use a votação como um mecanismo de sinalização (especialmente quando os usuários podem provar como votaram). Isso pode ter consequências significativas, especialmente quando os votos são responsáveis pela alocação de recursos escassos.

Por exemplo, [mecanismos de financiamento quadráticos](https://www.radicalxchange.org/concepts/plural-funding/) dependem de doações para medir a preferência por certas opções entre diferentes projetos de bem público. Cada doação conta como um “voto” para um projeto específico, com os projetos que recebem mais votos obtendo mais fundos do pool correspondente.

O uso da votação em cadeia torna o financiamento quadrático suscetível a conluio: as transações de blockchain são públicas, portanto os subornadores podem inspecionar a atividade em cadeia de um subornado para ver como eles “votaram”. Dessa forma, o financiamento quadrático deixa de ser um meio eficaz de alocação de fundos com base nas preferências agregadas da comunidade.

Felizmente, soluções mais recentes, como MACI (Minimum Anti-Collusion Infrastructure) estão usando provas de conhecimento zero para tornar a votação em cadeia (por exemplo, mecanismos de financiamento quadráticos) resistente a suborno e conluio. MACI é um conjunto de contratos inteligentes e scripts que permitem a um administrador central (chamado de “coordenador”) agregar votos e contar os resultados _sem_ revelar especificidades sobre como cada indivíduo votou. Mesmo assim, ainda é possível verificar se os votos foram devidamente contados, ou confirmar que um determinado indivíduo participou da rodada de votação.

#### Como a MACI funciona com provas de conhecimento zero? {#how-maci-works-with-zk-proofs}

No início, o coordenador implanta o contrato MACI no Ethereum, após o qual os usuários podem se inscrever para votação (registrando sua chave pública no contrato inteligente). Os usuários votam enviando mensagens criptografadas com sua chave pública para o contrato inteligente (um voto válido deve ser assinado com a chave pública mais recente associada à identidade do usuário, entre outros critérios). Em seguida, o coordenador processa todas as mensagens quando o período de votação termina, contabiliza os votos e verifica os resultados em cadeia.

Na MACI, as provas de conhecimento zero são usadas para garantir a exatidão do cálculo, tornando impossível para o coordenador processar os votos e apurar os resultados incorretamente. Isto é alcançado exigindo que o coordenador gere provas ZK-SNARK verificando se a) todas as mensagens foram processadas corretamente b) o resultado final corresponde à soma de todos os votos _válidos_.

Assim, mesmo sem compartilhar a divisão dos votos por usuário (como costuma acontecer), a MACI garante a integridade dos resultados durante o processo de contagem. Esse recurso serve para reduzir a eficácia de esquemas básicos de conluio. Podemos explorar essa possibilidade usando o exemplo anterior com o Bob subornando a Alice para votar em uma opção:

- Alice se registra para votar enviando sua chave pública para um contrato inteligente.
- Alice concorda em votar na `opção B` em troca de um suborno de Bob.
- Alice vota na `opção B`.
- Alice envia secretamente uma transação criptografada para alterar a chave pública associada à sua identidade.
- Alice envia outra mensagem (encriptada) para o contrato inteligente votando na `opção A` usando a nova chave pública.
- Alice mostra a Bob uma transação que mostra que ela votou a favor da `opção B` (que é inválida já que a chave pública não está mais associada à identidade de Alice no sistema).
- Ao processar mensagens, o coordenador ignora o voto de Alice para a `opção B` e conta apenas o voto na `opção A`. Assim, a tentativa de Bob de fazer conluio com Alice e manipular o voto em cadeia falha.

O uso da MACI _faz_ requer confiança no coordenador para não conspirar com subornos ou tentativas de suborno dos próprios eleitores. O coordenador pode descriptografar as mensagens do usuário (necessário para criar a prova), para que ele possa verificar com precisão como cada pessoa votou.

Porém, nos casos em que o coordenador seja honesto, a MACI representa uma ferramenta poderosa para garantir a inviolabilidade da votação em cadeia. Isso explica sua popularidade entre as aplicações de financiamento quadrático (por exemplo, [clr.fund](https://clr.fund/#/about/maci)) que dependem fortemente da integridade das escolhas de voto de cada indivíduo.

[Saiba mais sobre a MACI](https://privacy-scaling-explorations.github.io/maci/).

## Como funcionam as provas de conhecimento zero? {#how-do-zero-knowledge-proofs-work}

Uma prova de conhecimento zero permite que você prove a verdade de uma afirmação sem compartilhar o conteúdo da declaração ou revelar como você descobriu a verdade. Para tornar isso possível, os protocolos de conhecimento zero dependem de algoritmos que utilizam alguns dados como entrada e retornam "verdadeiro" ou "falso" como saída.

Um protocolo de conhecimento zero deve satisfazer os seguintes critérios:

1. **Completude**: Se a entrada for válida, o protocolo de conhecimento zero sempre retorna "verdadeiro". Portanto, se a declaração subjacente for verdadeira, e o provador verificar agir honestamente, a prova pode ser aceita.

2. **Solidez**: se a entrada for inválida, é teoricamente impossível enganar o protocolo de conhecimento zero para retornar "verdadeiro". Portanto, um provador mentiroso não pode enganar um verificador honesto fazendo-o acreditar que uma declaração inválida é válida (exceto com uma pequena margem de probabilidade).

3. **Conhecimento-zero**: O verificador não aprende nada sobre uma declaração para além de sua validade ou falsidade (eles têm "conhecimento zero" da declaração). Essa exigência também impede que o verificador obtenha a entrada original (o conteúdo da declaração) da prova.

Na forma básica, uma prova de conhecimento zero é composta de três elementos: **testemunha**, **desafio**, e **resposta**.

- **Testemunha**: Com uma prova de conhecimento zero, o provador quer provar o conhecimento de algumas informações ocultas. A informação secreta é a “testemunha” para a prova, e o presumido conhecimento do provador da testemunha estabelece um conjunto de questões que só podem ser respondidas por uma parte com conhecimento da informação. Assim, a prova inicia o processo de provação escolhendo aleatoriamente uma questão, calculando a resposta e enviando-a para o verificador.

- **Desafio**: O verificador escolhe aleatoriamente outra questão do conjunto e pede ao provador para respondê-la.

- **Resposta**: O provador aceita a pergunta, calcula a resposta e a retorna-a ao verificador. A resposta do provador permite que o verificador verifique se o primeiro tem realmente acesso à testemunha. Para garantir que o provador não esteja “chutando” e obtendo as respostas corretas por acaso, o verificador escolhe mais perguntas a fazer. Repetindo muitas vezes essa interação, a possibilidade de o provador falsificar o conhecimento da testemunha cai significativamente até que o verificador esteja satisfeito.

O exemplo acima descreve a estrutura de uma "prova de conhecimento zero interativa". Os protocolos de conhecimento zero usaram a prova interativa, na qual a verificação da validade de uma declaração exigia retroceder e avançar na comunicação entre os provadores e os verificadores.

Um bom exemplo que ilustra como as provas interativas funcionam é a famosa história da [caverna do Ali Baba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) de Jean-Jacques Quisquater. Na história, Peggy (o provador) quer provar a Victor (o verificador) que ela sabe a frase secreta para abrir uma porta mágica, sem revelar a frase.

### Provas não interativas de conhecimento zero {#non-interactive-zero-knowledge-proofs}

Embora revolucionária, a prova interativa tinha uma utilidade limitada, uma vez que exigia que as duas partes estivessem disponíveis e interagissem repetidamente. Mesmo que um verificador estivesse convencido da honestidade de um provador, a prova não estaria disponível para verificação independente (calcular uma nova prova exigia um novo conjunto de mensagens entre o provador e o verificador).

Para resolver esse problema, Manuel Blum, Paul Feldman e Silvio Micali sugeriram as primeiras [provas de conhecimento zero não interativas](https://dl.acm.org/doi/10.1145/62212.62222), nas quais o provador e o verificador têm uma chave compartilhada. Isso permite que o provador demonstre seu conhecimento de algumas informações (ou seja, testemunha) sem fornecer a informação em si.

Ao contrário de provas interativas, as provas não interativas exigiam apenas uma rodada de comunicação entre os participantes (revisor e verificador). O provador passa as informações secretas para um algoritmo especial para calcular uma prova de conhecimento zero. Essa prova é enviada para o verificador, que verifica se o provador conhece as informações secretas usando outro algoritmo.

Provas não interativas reduzem a comunicação entre provador e verificador, tornando a prova de ZK mais eficiente. Além disso, uma vez que uma prova é gerada, ela fica disponível para qualquer pessoa (com acesso à chave compartilhada e ao algoritmo de verificação) verificar.

As provas não interativas representaram um progresso enorme para a tecnologia do conhecimento zero e estimularam o desenvolvimento de sistemas provas usados atualmente. Discutimos esses tipos de provas abaixo:

### Tipos de provas de conhecimento zero {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK é uma sigla para **Zero-Knowledge Succinct Non-Interative Argument of Knowledge** (Argumento de conhecimento sucinto não interativo de conhecimento zero). O protocolo ZK-SNARK tem as seguintes qualidades:

- **Conhecimento-zero**: Um verificador pode validar a integridade de uma afirmação sem saber mais sobre essa afirmação. O único conhecimento que o verificador tem da afirmação é se ela é verdadeira ou falsa.

- **Sucinto**: A prova de conhecimento zero é menor do que a testemunha e pode ser verificada rapidamente.

- **Não interativo**: A prova é "não-interativa" porque o provador e verificador só interagem uma vez, ao contrário das provas interativas que exigem várias rodadas de comunicação.

- **Argumento**: A prova satisfaz o requisito de "solidez", então trapaça é extremamente improvável.

- **(Des) Conhecimento**: A prova de conhecimento zero não pode ser construída sem acesso às informações secretas (testemunha). É difícil, se não impossível, para um provador que não tem a testemunha calcular uma prova válida de conhecimento zero.

A "chave compartilhada" mencionada anteriormente refere-se a parâmetros públicos que o provador e o verificador concordam em usar na geração e verificação de provas. Gerar os parâmetros públicos (coletivamente conhecidos como String de Referência Comum (CRS)) é uma operação sensível devido à sua importância na segurança do protocolo. Se a entropia (aleatoriedade) usada para gerar o CRS chegar nas mãos de um provador desonesto, eles poderão produzir provas falsas.

[Computação multipartidária (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) é uma forma de reduzir os riscos na geração de parâmetros públicos. Várias partes participam de uma [cerimônia de configuração confiável](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), na qual cada pessoa contribui com alguns valores aleatórios para gerar o CRS. Enquanto uma parte honesta destrói sua porção da entropia, o protocolo ZK-SNARK mantém a solidez computacional.

As configurações confiáveis exigem que os usuários confiem nos participantes na geração de parâmetros. No entanto, o desenvolvimento do ZK STARKs possibilitou protocolos de prova que funcionam com uma configuração não confiável.

#### ZK-STARKs {#zk-starks}

ZK-STARK é um acrônimo para **Zero-Knowledge Scalable Transparent Argument of Knowledge (Argumento de conhecimento transparente escalável de conhecimento zero)**. Os ZK-STARKs são semelhantes aos ZK-SNARKs, exceto que eles são:

- **Escalável**: ZK-STARK é mais rápido que ZK-SNARK ao gerar e verificar provas quando o tamanho da testemunha é maior. Com as provas STARK, os tempos de prova e verificação só aumentam ligeiramente à medida que a testemunha cresce (os tempos do provador e verificador SNARK aumentam linearmente com o tamanho das testemunhas).

- **Transparente**: ZK-STARK depende de uma aleatoriedade publicamente verificável para gerar parâmetros públicos para prova e verificação em vez de uma configuração confiável. Assim, eles são mais transparentes em comparação com os ZK-SNARKs.

Os ZK-STARKs produzem provas maiores do que os ZK-SNARKs, o que significa que eles geralmente têm sobrecargas de verificação maiores. No entanto, existem casos (como provar grandes conjuntos de dados) em que os ZK-STARKs podem ser mais rentáveis do que os ZK-SNARKs.

## Desvantagens do uso das provas de conhecimento zero {#drawbacks-of-using-zero-knowledge-proofs}

### Custos de hardware {#hardware-costs}

Gerar provas de conhecimento zero envolve cálculos muito complexos que funcionam melhor em computadores especializados. Como esses computadores são caros, eles estão muitas vezes fora do alcance de indivíduos normais. Além disso, os aplicativos que querem usar tecnologia de conhecimento zero devem considerar os custos de hardware, o que pode aumentar os custos para os usuários finais.

### Custos da prova de verificação {#proof-verification-costs}

A verificação de provas também requer um cálculo complexo e aumenta os custos de implementação da tecnologia de conhecimento zero nos aplicativos. Esse custo é particularmente relevante no contexto de comprovação da computação. Por exemplo, os roll-ups ZK pagam cerca de 500.000 de gás para verificar uma única prova de ZK-SNARK no Ethereum, sendo que os ZK-STARKs precisam de taxas ainda maiores.

### Suposições de confiança {#trust-assumptions}

No ZK-SNARK, a String de Referência Comum (parâmetros públicos) é gerada uma vez e disponível para ser reutilizada pelas partes que desejam participar do protocolo de conhecimento zero. Parâmetros públicos são criados por meio de uma cerimônia de configuração confiável, na qual se presume que os participantes são honestos.

Mas realmente não há nenhuma maneira de os usuários avaliarem a honestidade dos participantes, e os usuários devem acreditar nos desenvolvedores. Os ZK-STARKs são livres de suposições de confiança, já que a aleatoriedade usada na geração da sequência é publicamente verificável. Enquanto isso, pesquisadores estão trabalhando em configurações não confiáveis para que ZK-SNARKs aumentem a segurança dos mecanismos de prova.

### Ameaças da computação quântica {#quantum-computing-threats}

O ZK-SNARK usa criptografia de curva elíptica para criptografia. Por enquanto, o problema do logaritmo discreto da curva elíptica é considerado sem solução, mas o desenvolvimento de computadores quânticos pode quebrar esse modelo de segurança no futuro.

O ZK-STARK é considerado imune à ameaça da computação quântica, pois depende apenas de funções hash resistentes a colisões para sua segurança. Ao contrário dos pares de chaves público-privadas usados na criptografia de curva elíptica, o hashing resistente a colisões é mais difícil para os algoritmos de computação quânticos quebrarem.

## Leitura adicional {#further-reading}

- [Visão geral dos casos de uso para provas de conhecimento zero](https://pse.dev/projects) — _Equipe de exploração de privacidade e dimensionamento_
- [SNARKs vs. STARKS vs. SNARKs recursivos](https://www.alchemy.com/overviews/snarks-vs-starks) — _Visão geral do Alchemy_
- [Uma prova de conhecimento zero: melhorando a privacidade em uma blockchain](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARKs — Um exemplo realista de conhecimento zero e aprofundamento](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARKs — Crie confiança verificável, mesmo contra computadores quânticos](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adão Luciano_
- [Uma introdução aproximada de como os zk-SNARKs são possíveis](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Por que as provas de conhecimento zero (ZKPs, em inglês) são um divisor de águas para a identidade autônoma](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) - _Franklin Ohaegbulam_

