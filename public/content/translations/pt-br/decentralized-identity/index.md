---
title: Identidade descentralizada
description: "O que é identidade descentralizada e por que ela é importante?"
lang: pt-br
template: use-cases
sidebarDepth: 2
image: /images/eth-gif-cat.png
summaryPoints:
  - "Os sistemas de identidade tradicionais centralizaram a emissão, a manutenção e o controle dos seus identificadores."
  - "A identidade descentralizada remove a dependência de terceiros centralizados."
  - "Graças às criptomoedas, os usuários agora têm as ferramentas para emitir, manter e controlar seus próprios identificadores e atestações mais uma vez."
---

A identidade sustenta praticamente todos os aspectos da sua vida hoje. Usar serviços online, abrir uma conta bancária, votar em eleições, comprar propriedades, garantir um emprego — todas essas coisas exigem a comprovação da sua identidade.

No entanto, os sistemas tradicionais de gerenciamento de identidade há muito dependem de intermediários centralizados que emitem, mantêm e controlam seus identificadores e [atestações](/glossary/#attestation). Isso significa que você não pode controlar suas informações relacionadas à identidade ou decidir quem tem acesso às informações de identificação pessoal (PII) e quanto acesso essas partes têm.

Para resolver esses problemas, temos sistemas de identidade descentralizada construídos em blockchains públicas como o [Ethereum](/). A identidade descentralizada permite que os indivíduos gerenciem suas informações relacionadas à identidade. Com soluções de identidade descentralizada, _você_ pode criar identificadores e reivindicar e manter suas atestações sem depender de autoridades centrais, como provedores de serviços ou governos.

## O que é identidade? {#what-is-identity}

Identidade significa o senso de si mesmo de um indivíduo, definido por características únicas. Identidade refere-se a ser um _indivíduo_, ou seja, uma entidade humana distinta. A identidade também pode se referir a outras entidades não humanas, como uma organização ou autoridade.

<VideoWatch slug="decentralized-identity-explained" />

## O que são identificadores? {#what-are-identifiers}

Um identificador é uma informação que atua como um ponteiro para uma identidade ou identidades específicas. Identificadores comuns incluem:

- Nome
- Número de seguro social/número de identificação fiscal
- Número de celular
- Data e local de nascimento
- Credenciais de identificação digital, por exemplo, endereços de e-mail, nomes de usuário, avatares

Esses exemplos tradicionais de identificadores são emitidos, mantidos e controlados por entidades centrais. Você precisa de permissão do seu governo para mudar seu nome ou de uma plataforma de mídia social para mudar seu nome de usuário.

## Benefícios da identidade descentralizada {#benefits-of-decentralized-identity}

1. A identidade descentralizada aumenta o controle individual das informações de identificação. Identificadores descentralizados e atestações podem ser verificados sem depender de autoridades centralizadas e serviços de terceiros.

2. As soluções de identidade descentralizada facilitam um método sem necessidade de confiança, contínuo e de proteção à privacidade para verificar e gerenciar a identidade do usuário.

3. A identidade descentralizada aproveita a tecnologia blockchain, que cria confiança entre diferentes partes e fornece garantias criptográficas para provar a validade das atestações.

4. A identidade descentralizada torna os dados de identidade portáteis. Os usuários armazenam atestações e identificadores em uma carteira móvel e podem compartilhar com qualquer parte de sua escolha. Identificadores descentralizados e atestações não ficam bloqueados no banco de dados da organização emissora.

5. A identidade descentralizada deve funcionar bem com tecnologias emergentes de [conhecimento zero](/glossary/#zk-proof) que permitirão que os indivíduos provem que possuem ou fizeram algo sem revelar o que é essa coisa. Isso pode se tornar uma maneira poderosa de combinar confiança e privacidade para aplicativos como votação.

6. A identidade descentralizada permite mecanismos [anti-Sybil](/glossary/#anti-sybil) para identificar quando um indivíduo humano está fingindo ser vários humanos para manipular ou enviar spam a algum sistema.

## Casos de uso de identidade descentralizada {#decentralized-identity-use-cases}

A identidade descentralizada tem muitos casos de uso em potencial:

### 1. Logins universais {#universal-dapp-logins}

A identidade descentralizada pode ajudar a substituir logins baseados em senha por autenticação descentralizada. Os provedores de serviços podem emitir atestações aos usuários, que podem ser armazenadas em uma carteira Ethereum. Um exemplo de atestação seria um [NFT](/glossary/#nft) concedendo ao titular acesso a uma comunidade online.

Uma função de [Sign-In with Ethereum](https://siwe.xyz/) (SIWE) permitiria então que os servidores confirmassem a conta Ethereum do usuário e buscassem a atestação necessária em seu endereço de conta. Isso significa que os usuários podem acessar plataformas e sites sem precisar memorizar senhas longas e melhora a experiência online para os usuários.

### 2. Autenticação KYC {#kyc-authentication}

O uso de muitos serviços online exige que os indivíduos forneçam atestações e credenciais, como carteira de motorista ou passaporte nacional. Mas essa abordagem é problemática porque as informações privadas do usuário podem ser comprometidas e os provedores de serviços não podem verificar a autenticidade da atestação.

A identidade descentralizada permite que as empresas pulem os processos convencionais de [Know-Your-Customer (KYC)](https://en.wikipedia.org/wiki/Know_your_customer) e autentiquem as identidades dos usuários por meio de credenciais verificáveis. Isso reduz o custo do gerenciamento de identidade e evita o uso de documentação falsa.

### 3. Votação e comunidades online {#voting-and-online-communities}

A votação online e as mídias sociais são duas aplicações inovadoras para a identidade descentralizada. Os esquemas de votação online são suscetíveis à manipulação, especialmente se atores mal-intencionados criarem identidades falsas para votar. Pedir aos indivíduos que apresentem atestações onchain pode melhorar a integridade dos processos de votação online.

A identidade descentralizada pode ajudar a criar comunidades online livres de contas falsas. Por exemplo, cada usuário pode ter que autenticar sua identidade usando um sistema de identidade onchain, como o Ethereum Name Service, reduzindo a possibilidade de bots.

### 4. Proteção anti-Sybil {#sybil-protection}

Aplicativos de concessão de subsídios que usam [votação quadrática](/glossary/#quadratic-voting) são vulneráveis a [ataques Sybil](/glossary/#sybil-attack) porque o valor de um subsídio aumenta quando mais indivíduos votam nele, incentivando os usuários a dividir suas contribuições em muitas identidades. As identidades descentralizadas ajudam a evitar isso, aumentando o fardo de cada participante para provar que eles são realmente humanos, embora muitas vezes sem ter que revelar informações privadas específicas.

### 5. Identidade Nacional e Governamental {#national-and-government-id}

Os governos podem usar os princípios da identidade descentralizada para emitir documentos de identidade fundamentais — como identidades nacionais, passaportes ou carteiras de motorista — como credenciais verificáveis no Ethereum, fornecendo fortes garantias criptográficas de autenticidade para reduzir fraudes e falsificações na verificação de identidade online. Os cidadãos podem armazenar essas atestações em sua [carteira](/wallets/) pessoal e usá-las para provar sua identidade, idade ou direito ao voto.

Esse modelo permite a divulgação seletiva, especialmente quando combinado com a tecnologia de privacidade de [prova de conhecimento zero (ZKP)](/zero-knowledge-proofs/). Por exemplo, um cidadão poderia provar criptograficamente que tem mais de 18 anos para acessar um serviço com restrição de idade sem revelar sua data exata de nascimento, oferecendo maior privacidade do que uma identidade tradicional.

#### 💡Estudo de caso: Identidade Digital Nacional (NDI) do Butão no Ethereum {#case-study-bhutan-ndi}

- Fornece acesso a credenciais verificáveis para os quase 800.000 cidadãos do Butão
- Migrou da rede Polygon [para a Rede Principal do Ethereum](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878) em outubro de 2025
- Mais de [234.000 identidades digitais](https://www.blockchain-council.org/blockchain/bhutan-uses-blockchain-in-digital-id-project/) emitidas até março de 2025

O Reino do Butão [migrou seu sistema de Identidade Digital Nacional (NDI)](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878) para o Ethereum em outubro de 2025. Construído com base nos princípios de identidade descentralizada e identidade autossuficiente, o sistema NDI do Butão usa identificadores descentralizados e credenciais verificáveis para emitir credenciais assinadas digitalmente diretamente para a carteira pessoal de um cidadão. Ao ancorar os esquemas de emissores dessas credenciais no Ethereum, o sistema garante que elas sejam autênticas, à prova de adulteração e possam ser verificadas por qualquer parte sem consultar uma autoridade central.

## O que são atestações? {#what-are-attestations}

Uma atestação é uma reivindicação feita por uma entidade sobre outra entidade. Se você mora nos Estados Unidos, a carteira de motorista emitida para você pelo Departamento de Veículos Motorizados (uma entidade) atesta que você (outra entidade) tem permissão legal para dirigir um carro.

As atestações são diferentes dos identificadores. Uma atestação _contém_ identificadores para referenciar uma identidade específica e faz uma reivindicação sobre um atributo relacionado a essa identidade. Portanto, sua carteira de motorista tem identificadores (nome, data de nascimento, endereço), mas também é a atestação sobre seu direito legal de dirigir.

### O que são identificadores descentralizados? {#what-are-decentralized-identifiers}

Identificadores tradicionais, como seu nome legal ou endereço de e-mail, dependem de terceiros — governos e provedores de e-mail. Os identificadores descentralizados (DIDs) são diferentes — eles não são emitidos, gerenciados ou controlados por nenhuma entidade central.

Identificadores descentralizados são emitidos, mantidos e controlados por indivíduos. Uma [conta Ethereum](/glossary/#account) é um exemplo de um identificador descentralizado. Você pode criar quantas contas quiser sem a permissão de ninguém e sem a necessidade de armazená-las em um registro central.

Identificadores descentralizados são armazenados em livros-razão distribuídos ([blockchains](/glossary/#blockchain)) ou [redes ponto a ponto](/glossary/#peer-to-peer-network). Isso torna os DIDs [globalmente únicos, resolvíveis com alta disponibilidade e verificáveis criptograficamente](https://w3c-ccg.github.io/did-primer/). Um identificador descentralizado pode ser associado a diferentes entidades, incluindo pessoas, organizações ou instituições governamentais.

## O que torna os identificadores descentralizados possíveis? {#what-makes-decentralized-identifiers-possible}

### 1. Criptografia de Chave Pública {#public-key-cryptography}

A criptografia de chave pública é uma medida de segurança da informação que gera uma [chave pública](/glossary/#public-key) e uma [chave privada](/glossary/#private-key) para uma entidade. A [criptografia](/glossary/#cryptography) de chave pública é usada em redes blockchain para autenticar identidades de usuários e provar a propriedade de ativos digitais.

Alguns identificadores descentralizados, como uma conta Ethereum, têm chaves públicas e privadas. A chave pública identifica o controlador da conta, enquanto as chaves privadas podem assinar e descriptografar mensagens para essa conta. A criptografia de chave pública fornece as provas necessárias para autenticar entidades e evitar a falsificação de identidade e o uso de identidades falsas, usando [assinaturas criptográficas](https://andersbrownworth.com/blockchain/public-private-keys/) para verificar todas as reivindicações.

### 2. Armazenamentos de dados descentralizados {#decentralized-datastores}

Uma blockchain serve como um registro de dados verificável: um repositório de informações aberto, sem necessidade de confiança e descentralizado. A existência de blockchains públicas elimina a necessidade de armazenar identificadores em registros centralizados.

Se alguém precisar confirmar a validade de um identificador descentralizado, poderá procurar a chave pública associada na blockchain. Isso é diferente dos identificadores tradicionais que exigem que terceiros autentiquem.

## Como os identificadores descentralizados e as atestações permitem a identidade descentralizada? {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

A identidade descentralizada é a ideia de que as informações relacionadas à identidade devem ser autocontroladas, privadas e portáteis, com identificadores descentralizados e atestações sendo os principais blocos de construção.

No contexto da identidade descentralizada, as atestações (também conhecidas como [Credenciais Verificáveis](https://www.w3.org/TR/vc-data-model/)) são reivindicações à prova de adulteração e verificáveis criptograficamente feitas pelo emissor. Cada atestação ou Credencial Verificável que uma entidade (por exemplo, uma organização) emite está associada ao seu DID.

Como os DIDs são armazenados na blockchain, qualquer pessoa pode verificar a validade de uma atestação cruzando o DID do emissor no Ethereum. Essencialmente, a blockchain do Ethereum atua como um diretório global que permite a verificação de DIDs associados a certas entidades.

Os identificadores descentralizados são a razão pela qual as atestações são autocontroladas e verificáveis. Mesmo que o emissor não exista mais, o titular sempre tem a prova da proveniência e validade da atestação.

Os identificadores descentralizados também são cruciais para proteger a privacidade das informações pessoais por meio da identidade descentralizada. Por exemplo, se um indivíduo enviar a prova de uma atestação (uma carteira de motorista), a parte verificadora não precisará verificar a validade das informações na prova. Em vez disso, o verificador só precisa de garantias criptográficas da autenticidade da atestação e da identidade da organização emissora para determinar se a prova é válida.

## Tipos de atestações na identidade descentralizada {#types-of-attestations-in-decentralized-identity}

A forma como as informações de atestação são armazenadas e recuperadas em um ecossistema de identidade baseado no Ethereum é diferente do gerenciamento de identidade tradicional. Aqui está uma visão geral das várias abordagens para emitir, armazenar e verificar atestações em sistemas de identidade descentralizada:

### Atestações offchain {#offchain-attestations}

Uma preocupação com o armazenamento de atestações onchain é que elas podem conter informações que os indivíduos desejam manter privadas. A natureza pública da blockchain do Ethereum a torna pouco atraente para armazenar tais atestações.

A solução é emitir atestações, mantidas pelos usuários offchain em carteiras digitais, mas assinadas com o DID do emissor armazenado onchain. Essas atestações são codificadas como [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token) e contêm a assinatura digital do emissor — o que permite a fácil verificação de reivindicações offchain.

Aqui está um cenário hipotético para explicar as atestações offchain:

1. Uma universidade (o emissor) gera uma atestação (um certificado acadêmico digital), assina com suas chaves e a emite para Bob (o proprietário da identidade).

2. Bob se candidata a um emprego e quer provar suas qualificações acadêmicas a um empregador, então ele compartilha a atestação de sua carteira móvel. A empresa (o verificador) pode então confirmar a validade da atestação verificando o DID do emissor (ou seja, sua chave pública no Ethereum).

### Atestações offchain com acesso persistente {#offchain-attestations-with-persistent-access}

Sob esse arranjo, as atestações são transformadas em arquivos JSON e armazenadas offchain (idealmente em uma plataforma de [armazenamento em nuvem descentralizado](/developers/docs/storage/), como IPFS ou Swarm). No entanto, um [hash](/glossary/#hash) do arquivo JSON é armazenado onchain e vinculado a um DID por meio de um registro onchain. O DID associado pode ser o do emissor da atestação ou do destinatário.

Essa abordagem permite que as atestações ganhem persistência baseada em blockchain, mantendo as informações de reivindicações criptografadas e verificáveis. Também permite a divulgação seletiva, pois o detentor da chave privada pode descriptografar as informações.

### Atestações onchain {#onchain-attestations}

As atestações onchain são mantidas em [contratos inteligentes](/glossary/#smart-contract) na blockchain do Ethereum. O contrato inteligente (atuando como um registro) mapeará uma atestação para um identificador descentralizado onchain correspondente (uma chave pública).

Aqui está um exemplo para mostrar como as atestações onchain podem funcionar na prática:

1. Uma empresa (XYZ Corp) planeja vender ações de propriedade usando um contrato inteligente, mas só quer compradores que tenham concluído uma verificação de antecedentes.

2. A XYZ Corp pode fazer com que a empresa que realiza verificações de antecedentes emita atestações onchain no Ethereum. Essa atestação certifica que um indivíduo passou na verificação de antecedentes sem expor nenhuma informação pessoal.

3. O contrato inteligente que vende ações pode verificar o contrato de registro para as identidades dos compradores selecionados, tornando possível para o contrato inteligente determinar quem tem permissão para comprar ações ou não.

### Tokens vinculados à alma (Soulbound) e identidade {#soulbound}

[Tokens Soulbound](https://vitalik.eth.limo/general/2022/01/26/soulbound.html) ([NFTs intransferíveis](/glossary/#nft)) podem ser usados para coletar informações exclusivas de uma carteira específica. Isso efetivamente cria uma identidade onchain única vinculada a um endereço Ethereum específico que pode incluir tokens representando conquistas (por exemplo, terminar algum curso online específico ou passar de uma pontuação limite em um jogo) ou participação na comunidade.

## Use a identidade descentralizada {#use-decentralized-identity}

Existem muitos projetos ambiciosos usando o Ethereum como base para soluções de identidade descentralizada:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - _Um sistema de nomenclatura descentralizado para identificadores onchain legíveis por máquina, como endereços de carteira Ethereum, hashes de conteúdo e metadados._
- **[Sign in with Ethereum (SIWE)](https://siwe.xyz/)** - _Padrão aberto para autenticação com contas Ethereum._
- **[SpruceID](https://www.spruceid.com/)** - _Um projeto de identidade descentralizada que permite aos usuários controlar a identidade digital com contas Ethereum e perfis ENS em vez de depender de serviços de terceiros._
- **[Ethereum Attestation Service (EAS)](https://attest.org/)** - _Um livro-razão/protocolo descentralizado para fazer atestações onchain ou offchain sobre qualquer coisa._
- **[Proof of Humanity](https://www.proofofhumanity.id)** - _Proof of Humanity (ou PoH) é um sistema de verificação de identidade social construído no Ethereum._
- **[Veramo](https://veramo.io/)** - _Um framework JavaScript que facilita para qualquer pessoa usar dados verificáveis criptograficamente em seus aplicativos._

## Leitura adicional {#further-reading}

### Artigos {#articles}

- [Casos de uso de blockchain: Blockchain na identidade digital](https://consensys.net/blockchain-use-cases/digital-identity/) — _ConsenSys_
- [O que é o Ethereum ERC-725? Gerenciamento de identidade autossuficiente na blockchain](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) — _Sam Town_
- [Como a blockchain pode resolver o problema da identidade digital](https://time.com/6142810/proof-of-humanity/) — _Andrew R. Chow_
- [O que é identidade descentralizada e por que você deve se importar?](https://web3.hashnode.com/what-is-decentralized-identity) — _Emmanuel Awosika_
- [Introdução à identidade descentralizada](https://walt.id/white-paper/digital-identity) — _Dominik Beron_

### Vídeos {#videos}

- [Identidade descentralizada (Sessão de transmissão ao vivo bônus)](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) — _Um ótimo vídeo explicativo sobre identidade descentralizada por Andreas Antonopolous_
- [Sign In with Ethereum e identidade descentralizada com Ceramic, IDX, React e 3ID Connect](https://www.youtube.com/watch?v=t9gWZYJxk7c) — _Tutorial no YouTube sobre como construir um sistema de gerenciamento de identidade para criar, ler e atualizar o perfil de um usuário usando sua carteira Ethereum por Nader Dabit_
- [BrightID - Identidade descentralizada no Ethereum](https://www.youtube.com/watch?v=D3DbMFYGRoM) — _Episódio do podcast Bankless discutindo o BrightID, uma solução de identidade descentralizada para o Ethereum_
- [A Internet offchain: Identidade descentralizada e credenciais verificáveis](https://www.youtube.com/watch?v=EZ_Bb6j87mg) — Apresentação na EthDenver 2022 por Evin McMullen
- [Credenciais verificáveis explicadas](https://www.youtube.com/watch?v=ce1IdSr-Kig) - Vídeo explicativo no YouTube com demonstração por Tamino Baumann

### Comunidades {#communities}

- [Aliança ERC-725 no GitHub](https://github.com/erc725alliance) — _Apoiadores do padrão ERC-725 para gerenciar identidade na blockchain do Ethereum_
- [Servidor do Discord EthID](https://discord.com/invite/ZUyG3mSXFD) — _Comunidade para entusiastas e desenvolvedores trabalhando no Sign-in with Ethereum e no Ethereum Follow Protocol_
- [Veramo Labs](https://discord.gg/sYBUXpACh4) — _Uma comunidade de desenvolvedores contribuindo para a construção de um framework para dados verificáveis para aplicativos_
- [walt.id](https://discord.com/invite/AW8AgqJthZ) — _Uma comunidade de desenvolvedores e construtores trabalhando em casos de uso de identidade descentralizada em vários setores_