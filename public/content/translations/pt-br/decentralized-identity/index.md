---
title: Identidade descentralizada
description: O que é uma identidade descentralizada e por que isso importa?
lang: pt-br
template: use-cases
emoji: ":id:"
sidebarDepth: 2
image: /images/eth-gif-cat.png
summaryPoint1: Os sistemas de identidade tradicionais centralizaram a emissão, manutenção e controle de seus identificadores.
summaryPoint2: A identidade descentralizada elimina a dependência de terceiros centralizados.
summaryPoint3: Graças à criptografia, os usuários agora têm as ferramentas para emitir, manter e controlar seus próprios identificadores e atestações novamente.
---

A identidade sustenta virtualmente todos os aspectos da sua vida hoje. Usar serviços on-line, abrir uma conta bancária, votar em eleições, comprar propriedades, garantir um emprego – todas essas coisas exigem que você prove sua identidade.

Entretanto, os sistemas tradicionais de gerenciamento de identidade há muito tempo dependem de intermediários centralizados que emitem, mantêm e controlam seus identificadores e [atestados](/glossary/#attestation). Isso significa que você não pode controlar as informações relacionadas à sua identidade ou decidir quem tem acesso às informações de identificação pessoal (PII) e quanto acesso essas partes têm.

Para resolver esses problemas, temos sistemas de identidade descentralizados construídos em blockchains públicos como o Ethereum. A identidade descentralizada permite que indivíduos gerenciem informações relacionadas à sua identidade. Com soluções de identidade descentralizadas, _você_ pode criar identificadores e reivindicar e manter seus atestados sem depender de autoridades centrais, como provedores de serviços ou governos.

## O que é identidade? {#what-is-identity}

Identidade significa o sentido de si próprio de um indivíduo, definido por características únicas. Identidade refere-se a ser um _indivíduo_, ou seja, uma entidade humana distinta. A identidade também pode se referir a outras entidades não humanas, como uma organização ou autoridade.

<YouTube id="Ew-_F-OtDFI" />

## O que são identificadores? {#what-are-identifiers}

Um identificador é uma informação que atua como um ponteiro para uma identidade ou identidades específicas. Identificadores comuns incluem:

- Nome
- Número da seguro social/número de identificação fiscal
- Número de celular
- Data e local de nascimento
- Credenciais de identificação digital, por exemplo, endereços de e-mail, nomes de usuário, avatares

Esses exemplos tradicionais de identificadores são emitidos, mantidos e controlados por entidades centrais. Você precisa de permissão do seu governo para alterar seu nome ou de uma plataforma de mídia social para alterar seu nome.

## Benefícios da identidade descentralizada {#benefits-of-decentralized-identity}

1. A identidade descentralizada aumenta o controle individual de identificação da informação. Identificadores e atestados descentralizados podem ser verificados sem depender de autoridades centralizadas e serviços de terceiros.

2. As soluções de identidade descentralizadas facilitam um método com necessidade mínima de confiança, sem interrupções e de proteção de privacidade para verificar e gerenciar a identidade do usuário.

3. A identidade descentralizada aproveita a tecnologia blockchain, que cria confiança entre diferentes partes e fornece garantias criptográficas para provar a validade dos atestados.

4. A identidade descentralizada torna os dados de identidade portáteis. Os usuários armazenam atestados e identificadores na carteira móvel e podem compartilhar com qualquer parte de sua escolha. Identificadores e atestados descentralizados não são bloqueados no banco de dados da organização emissora.

5. A identidade descentralizada deve funcionar bem com tecnologias emergentes de [conhecimento zero](/glossary/#zk-proof), que permitirão que indivíduos provem que possuem ou fizeram algo sem revelar o que é essa coisa. Isso pode se tornar uma maneira poderosa de combinar confiança e privacidade para aplicações como votação.

6. A identidade descentralizada permite que mecanismos [anti-Sybil](/glossary/#anti-sybil) identifiquem quando um humano individual está fingindo ser vários humanos para jogar ou enviar spam a algum sistema.

## Casos de uso de identidade descentralizadas {#decentralized-identity-use-cases}

A identidade descentralizada tem muitos casos de uso em potencial:

### 1. Logins universais {#universal-dapp-logins}

A identidade descentralizada pode ajudar a substituir os logins baseados em senha pela autenticação descentralizada. Os provedores de serviços podem emitir atestados aos usuários, aos que podem ser armazenados em uma carteira Ethereum. Um exemplo de atestado seria uma [NFT](/glossary/#nft) concedendo ao titular acesso a uma comunidade on-line.

Uma função [Entrar com Ethereum](https://login.xyz/) permitiria que os servidores confirmassem a conta Ethereum do usuário e buscassem o atestado necessário de seu endereço de conta. Isso significa que os usuários podem acessar plataformas e sites sem precisar memorizar senhas longas e melhorar a experiência on-line dos usuários.

### 2. Autenticação KYC {#kyc-authentication}

O uso de muitos serviços on-line exige que os indivíduos forneçam atestados e credenciais, como carteira de motorista ou passaporte nacional. Mas essa abordagem é problemática porque as informações privadas do usuário podem ser comprometidas e os provedores de serviços não podem verificar a autenticidade do atestado.

A identidade descentralizada permite que as empresas ignorem os processos convencionais de [Conheça seu Cliente (KYC)](https://en.wikipedia.org/wiki/Know_your_customer) e autentiquem identidades de usuários por meio de credenciais verificáveis. Isso reduz o custo de gerenciamento de identidade e previne o uso de documentação falsa.

### 3. Votação e comunidades on-line {#voting-and-online-communities}

A votação on-line e as mídias sociais são duas novas aplicações para a identidade descentralizada. Esquemas de votação on-line são suscetíveis à manipulação, especialmente se atores mal-intencionados criarem identidades falsas para votar. Pedir a indivíduos que apresentem atestados on-chain pode melhorar a integridade dos processos de votação on-line.

A identidade descentralizada pode ajudar a criar comunidades on-line livres de contas falsas. Por exemplo, cada usuário pode ter que autenticar sua identidade usando um sistema de identidade on-chain, como o Nomes de Serviço Ethereum, reduzindo a possibilidade de bots.

### 4. Proteção Anti-Sybil {#sybil-protection}

Os aplicativos de atribuição de concessões que usam [votação quadrática](/glossary/#quadratic-voting) são vulneráveis a [ataques Sybil](/glossary/#sybil-attack) porque o valor de uma concessão aumenta quando mais indivíduos votam nela, incentivando os usuários a dividir suas contribuições entre várias identidades. As identidades descentralizadas ajudam a evitar isso, aumentando o ônus de cada participante para provar que eles são realmente humanos, embora muitas vezes sem ter que revelar informações particulares específicas.

## O que são atestados? {#what-are-attestations}

Um atestado é uma reivindicação feita por uma entidade sobre outra entidade. Se você mora nos Estados Unidos, a carteira de motorista emitida a você pelo Departamento de Veículos Motorizados (uma entidade) atesta que você (outra entidade) tem permissão legal para dirigir um carro.

Atestados são diferentes de identificadores. Um atestado _contém_ identificadores para referir-se a uma identidade específica e faz uma declaração sobre um atributo relacionado a essa identidade. Portanto, sua carteira de motorista possui identificadores (nome, data de nascimento, endereço), mas também é o atestado sobre seu direito legal de dirigir.

### O que são identificadores descentralizados? {#what-are-decentralized-identifiers}

Identificadores tradicionais como seu nome legal ou endereço de e-mail dependem de terceiros – governos e provedores de e-mail. Os identificadores descentralizados (DIDs) são diferentes — eles não são emitidos, gerenciados ou controlados por qualquer entidade central.

Os identificadores descentralizados são emitidos, mantidos e controlados por indivíduos. Uma [conta Ethereum](/glossary/#account) é um exemplo de identificador descentralizado. Você pode criar quantas contas quiser sem permissão de ninguém e sem a necessidade de armazená-las em um registro central.

Os identificadores descentralizados são armazenados em registros distribuídos ([blockchains](/glossary/#blockchain)) ou [redes ponto a ponto](/glossary/#peer-to-peer-network). Isso torna os DIDs [globalmente exclusivos, solucionáveis com alta disponibilidade e verificáveis criptograficamente](https://w3c-ccg.github.io/did-primer/). Um identificador descentralizado pode ser associado a diferentes entidades, incluindo pessoas, organizações ou instituições governamentais.

## O que torna os identificadores descentralizados possíveis? {#what-makes-decentralized-identifiers-possible}

### 1. Criptografia de chave pública {#public-key-cryptography}

A criptografia de chave pública é uma medida de segurança de informações que gera uma [chave pública](/glossary/#public-key) e uma [chave privada](/glossary/#private-key) para uma entidade. A [criptografia de chave pública](/glossary/#cryptography) é usada em redes de blockchain para autenticar identidades de usuários e comprovar a propriedade de ativos digitais.

Alguns identificadores descentralizados, como uma conta Ethereum, possuem chaves públicas e privadas. A chave pública identifica o controlador da conta, enquanto as chaves privadas podem assinar e descriptografar mensagens para essa conta. A criptografia de chave pública fornece as provas necessárias para autenticar entidades e evitar a falsificação de identidade e o uso de identidades falsas, usando [assinaturas criptográficas](https://andersbrownworth.com/blockchain/public-private-keys/) para verificar todas as reclamações.

### 2. Armazenamentos de dados descentralizados {#decentralized-datastores}

Um blockchain serve como um registro de dados verificável: um repositório de informações aberto, com necessidade mínima de confiança e descentralizado. A existência de blockchains públicos elimina a necessidade de armazenar identificadores em registros centralizados.

Se alguém precisar confirmar a validade de um identificador descentralizado, ele poderá procurar a chave pública associada no blockchain. Isso difere dos identificadores tradicionais que exigem autenticação de terceiros.

## Como os identificadores e atestados descentralizados permitem a identidade descentralizada? {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

A identidade descentralizada é a ideia de que as informações relacionadas à identidade devem ser autocontroladas, privadas e portáteis, com identificadores descentralizados e atestações sendo os principais blocos de construção.

No contexto da identidade descentralizada, os atestados (também conhecidos como [Credenciais verificáveis](https://www.w3.org/TR/vc-data-model/)) são declarações à prova de adulteração e criptograficamente verificáveis feitas pelo emissor. Cada atestado ou credencial verificável de uma entidade (por exemplo, uma organização) está associada ao seu DID.

Como os DIDs são armazenados no blockchain, qualquer pessoa pode verificar a validade de um atestado verificando o DID do emissor no Ethereum. Essencialmente, o blockchain Ethereum atua como um diretório global que permite a verificação de DIDs associados a determinadas entidades.

Os identificadores descentralizados são o motivo de os atestados serem autocontrolados e verificáveis. Mesmo que o emissor não exista mais, o titular sempre tem a comprovação da procedência e validade do atestado.

Os identificadores descentralizados também são cruciais para proteger a privacidade das informações pessoais por meio da identidade descentralizada. Por exemplo, se um indivíduo apresentar prova de um atestado (carteira de motorista), a parte verificadora não precisa verificar a validade das informações na prova. Em vez disso, o verificador precisa apenas de garantias criptográficas da autenticidade do atestado e da identidade da organização emissora para determinar se a prova é válida.

## Categorias de atestados na identidade descentralizada {#types-of-attestations-in-decentralized-identity}

Como as informações de atestado são armazenadas e recuperadas em um ecossistema de identidade baseado em Ethereum difere do gerenciamento de identidade tradicional. Aqui está uma visão geral das várias abordagens para emitir, armazenar e verificar atestados em sistemas de identidade descentralizados:

### Atestados Off-Chain {#off-chain-attestations}

Uma das preocupações com o armazenamento de certificados na cadeia é que eles podem conter informações que os usuários queiram manter privadas. A natureza pública da blockchain Ethereum a torna não atraente armazenar tais atestações.

A solução é emitir atestados, mantidos por usuários off-chain em carteiras digitais, mas assinados com o DID do emissor armazenado on-chain. Esses atestados são codificados como [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token) e contêm a assinatura digital do emissor, que permite a verificação fácil de reivindicações off-chain.

Aqui está um cenário hipotético para explicar os atestados off-chain:

1. Uma universidade (o emissor) gera um atestado (um certificado acadêmico digital), assina com suas chaves e o emite para Bob (o proprietário da identidade).

2. Bob se candidata a um emprego e quer provar suas qualificações acadêmicas a um empregador, então ele compartilha o atestado de sua carteira móvel. A empresa (o verificador) pode então confirmar a validade do atestado verificando o DID do emissor (ou seja, sua chave pública no Ethereum).

### Atestados off-chain com acesso persistente {#offchain-attestations-with-persistent-access}

Sob esse arranjo, os atestados são transformados em arquivos JSON e armazenados off-chain (idealmente em uma plataforma de [armazenamento em nuvem descentralizado](/developers/docs/storage/), como IPFS ou Swarm). Entretanto, um [hash](/glossary/#hash) do arquivo JSON é armazenado on-chain e vinculado a um DID por meio de um registro on-chain. O DID associado pode ser o do emissor do atestado ou o do destinatário.

Essa abordagem permite que os atestados obtenham persistência baseada em blockchain, mantendo as informações de declarações criptografadas e verificáveis. Ele também permite a divulgação seletiva, visto que o titular da chave privada pode descriptografar as informações.

### Atestados on-chain {#onchain-attestations}

Os atestados on-chain são mantidos em [contratos inteligentes](/glossary/#smart-contract) na blockchain Ethereum. O contrato inteligente (agindo como um registro) mapeará um atestado para um identificador descentralizado on-chain correspondente (uma chave pública).

Aqui está um exemplo para mostrar como os atestados on-chain podem funcionar na prática:

1. Uma empresa (XYZ Corp) planeja vender ações de propriedade usando um contrato inteligente, mas quer apenas compradores que concluíram uma verificação de fundo.

2. A empresa XYZ pode fazer com que a empresa realize verificações de fundo para emitir atestados on-chain no Ethereum. Este atestado certifica que um indivíduo passou na verificação de fundo sem expor nenhuma informação pessoal.

3. O contrato inteligente de venda de ações pode verificar no contrato de registro as identidades dos compradores selecionados, possibilitando que o contrato inteligente determine quem tem permissão para comprar ações ou não.

### Tokens Soulbound e identidade {#soulbound}

[Tokens Soulbound](https://vitalik.eth.limo/general/2022/01/26/soulbound.html) ([NFTs intransferíveis](/glossary/#nft)) podem ser usados para coletar informações exclusivas de uma carteira específica. Isso cria efetivamente uma identidade única on-chain vinculada a um endereço Ethereum específico que pode incluir tokens que representam conquistas (por exemplo, terminar algum curso on-line específico ou passar uma pontuação mínima em um jogo) ou participação da comunidade.

## Use identidade descentralizada {#use-decentralized-identity}

Existem muitos projetos ambiciosos usando Ethereum como base para soluções de identidade descentralizadas:

- **[Nomes de Serviço Ethereum (ENS)](https://ens.domains/)** - _ Um sistema de nomes descentralizado para identificadores legíveis por máquina on-chain, como endereços de carteira Ethereum, hashes de conteúdo e metadados._
- **[SpruceID](https://www.spruceid.com/)** - _Um projeto de identidade descentralizada que permite aos usuários controlar a identidade digital com contas Ethereum e perfis ENS em vez de depender de serviços de terceiros._
- **[Serviço de Atestação do Ethereum (EAS)](https://attest.sh/)** - _ Um ledger/protocolo descentralizado para fazer atestações on-chain ou off-chain sobre qualquer coisa._
- **[Prova de Humanidade](https://www.proofofhumanity.id)** - _Prova de Humanidade (ou PoH) é um sistema de verificação de identidade social construído no Ethereum._
- **[BrightID](https://www.brightid.org/)** - _Uma descentralizada, rede de identidade social de código aberto que busca reformar a verificação de identidade por meio da criação e análise de um grafo social._
- **[walt.id](https://walt.id)** — _Identidade descentralizada de código aberto e infraestrutura de carteira que permite que desenvolvedores e organizações usem identidade autosoberana e NFTs/SBTs._
- **[Veramo](https://veramo.io/)** - _Uma estrutura JavaScript que facilita o uso de dados criptograficamente verificáveis nos próprios aplicativos por qualquer pessoa._

## Leitura adicional {#further-reading}

### Artigos {#articles}

- [Casos de uso de blockchain: Blockchain em identidade digital](https://consensys.net/blockchain-use-cases/digital-identity/) — _ConsenSys_
- [O que é Ethereum ERC725? Gerenciamento de identidade autossoberana no Blockchain](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) — _Sam Town_
- [Como o Blockchain pode resolver o problema da identidade digital](https://time.com/6142810/proof-of-humanity/) — _Andrew R. Comida_
- [O que é identidade descentralizada e por que você deve se importar?](https://web3.hashnode.com/what-is-decentralized-identity) — _Emmanuel Awosika_
- [Introdução à identidade descentralizada](https://walt.id/white-paper/digital-identity) — _Dominik Beron_

### Vídeos {#videos}

- [Identidade descentralizada (bônus sessão de transmissão ao vivo)](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) — _Um ótimo vídeo explicativo sobre identidade descentralizada por Andreas Antoniopolitas_
- [Faça login com o Ethereum e identidade descentralizada com Ceramic, IDX, React e 3ID Connect](https://www.youtube.com/watch?v=t9gWZYJxk7c) — _Tutorial do YouTube sobre como criar um sistema de gerenciamento de identidade para criar, ler e atualizar o perfil de um usuário usando sua carteira Ethereum por Nader Dabit_
- [BrightID - Identidade descentralizada no Ethereum](https://www.youtube.com/watch?v=D3DbMFYGRoM) — _Episódio de podcast sem banco discutindo o BrightID, uma solução de identidade descentralizada para Ethereum_
- [A Internet off-chain: identidade descentralizada & Credenciais verificáveis](https://www.youtube.com/watch?v=EZ_Bb6j87mg) — apresentação EthDenver 2022 por Evin McMullen
- [Credenciais verificáveis explicadas](https://www.youtube.com/watch?v=ce1IdSr-Kig) - vídeo explicativo do YouTube com demonstração de Tamino Baumann

### Comunidades {#communities}

- [Aliança ERC-725 no GitHub](https://github.com/erc725alliance) — _Apoiadores do padrão ERC725 para gerenciamento de identidade no blockchain Ethereum_
- [Servidor do Discord do SpruceID](https://discord.com/invite/Sf9tSFzrnt) — _Comunidade para entusiastas e desenvolvedores que trabalham no Entrar com Ethereum_
- [Veramo Labs](https://discord.gg/sYBUXpACh4) — _Uma comunidade de desenvolvedores contribuindo para criar um framework de dados verificáveis para aplicativos_
- [walt.id](https://discord.com/invite/AW8AgqJthZ) — _ Uma comunidade de desenvolvedores e construtores trabalhando em casos de uso de identidade descentralizada em vários setores_
