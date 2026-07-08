---
title: Introdução à governança do Ethereum
metaTitle: Governança do Ethereum
description: Uma introdução sobre como as decisões sobre o Ethereum são tomadas.
lang: pt-br
---

_Se ninguém é dono do [Ethereum](/), como são tomadas as decisões sobre mudanças passadas e futuras no Ethereum? A governança do Ethereum refere-se ao processo que permite que tais decisões sejam tomadas._

<Divider />

## O que é governança? {#what-is-governance}

A governança é o conjunto de sistemas em vigor que permite a tomada de decisões. Em uma estrutura organizacional típica, a equipe executiva ou um conselho de administração pode ter a palavra final na tomada de decisões. Ou talvez os acionistas votem em propostas para implementar mudanças. Em um sistema político, os funcionários eleitos podem promulgar leis que tentam representar os desejos de seus eleitores.

## Governança descentralizada {#decentralized-governance}

Nenhuma pessoa possui ou controla o protocolo do Ethereum, mas as decisões ainda precisam ser tomadas sobre a implementação de mudanças para melhor garantir a longevidade e a prosperidade da rede. Essa falta de propriedade torna a governança organizacional tradicional uma solução incompatível.

## Governança do Ethereum {#ethereum-governance}

A governança do Ethereum é o processo pelo qual as mudanças no protocolo são feitas. É importante ressaltar que esse processo não está relacionado a como as pessoas e os aplicativos usam o protocolo - o Ethereum é não permissionado. Qualquer pessoa de qualquer lugar do mundo pode participar de atividades onchain. Não há regras definidas para quem pode ou não construir um aplicativo ou enviar uma transação. No entanto, existe um processo para propor mudanças no protocolo principal, sobre o qual os aplicativos descentralizados (dapps) são executados. Como muitas pessoas dependem da estabilidade do Ethereum, há um limite de coordenação muito alto para mudanças principais, incluindo processos sociais e técnicos, para garantir que quaisquer mudanças no Ethereum sejam seguras e amplamente apoiadas pela comunidade.

<VideoWatch slug="ethereum-core-governance-explained" />

### Governança onchain vs offchain {#onchain-vs-offchain}

A tecnologia blockchain permite novos recursos de governança, conhecidos como governança onchain. A governança onchain ocorre quando as mudanças propostas no protocolo são decididas por um voto das partes interessadas, geralmente por detentores de um token de governança, e a votação acontece na blockchain. Com algumas formas de governança onchain, as mudanças propostas no protocolo já estão escritas em código e são implementadas automaticamente se as partes interessadas aprovarem as mudanças assinando uma transação.

A abordagem oposta, a governança offchain, é onde quaisquer decisões de mudança de protocolo acontecem por meio de um processo informal de discussão social, que, se aprovado, seria implementado em código.

**A governança do Ethereum acontece offchain** com uma ampla variedade de partes interessadas envolvidas no processo.

_Embora no nível do protocolo a governança do Ethereum seja offchain, muitos casos de uso construídos sobre o Ethereum, como as DAOs, usam a governança onchain._

<ButtonLink href="/dao/">
  Mais sobre DAOs
</ButtonLink>

<Divider />

## Quem está envolvido? {#who-is-involved}

Existem várias partes interessadas na [comunidade do Ethereum](/community/), cada uma desempenhando um papel no processo de governança. Começando pelas partes interessadas mais distantes do protocolo e nos aproximando, temos:

- **Detentores de ether**: essas pessoas possuem uma quantidade arbitrária de ETH. [Mais sobre ETH](/what-is-ether/).
- **Usuários de aplicativos**: essas pessoas interagem com aplicativos na blockchain do Ethereum.
- **Desenvolvedores de aplicativos/ferramentas**: essas pessoas escrevem aplicativos que são executados na blockchain do Ethereum (por exemplo, finanças descentralizadas (DeFi), NFTs, etc.) ou constroem ferramentas para interagir com o Ethereum (por exemplo, carteiras, suítes de teste, etc.). [Mais sobre dapps](/apps/).
- **Operadores de nós**: essas pessoas executam nós que propagam blocos e transações, rejeitando qualquer transação ou bloco inválido que encontrarem. [Mais sobre nós](/developers/docs/nodes-and-clients/).
- **Autores de EIPs**: essas pessoas propõem mudanças no protocolo do Ethereum, na forma de Propostas de Melhoria do Ethereum (EIPs). [Mais sobre EIPs](/eips/).
- **Validadores**: essas pessoas executam nós que podem adicionar novos blocos à blockchain do Ethereum.
- **Desenvolvedores de protocolo** (também conhecidos como "Core Developers"): essas pessoas mantêm as várias implementações do Ethereum (por exemplo, go-ethereum, Nethermind, Besu, Erigon, Reth na camada de execução ou Prysm, Lighthouse, Nimbus, Teku, Lodestar, Grandine na camada de consenso). [Mais sobre clientes Ethereum](/developers/docs/nodes-and-clients/).

_Nota: qualquer indivíduo pode fazer parte de vários desses grupos (por exemplo, um desenvolvedor de protocolo pode liderar uma EIP, executar um validador da Beacon Chain e usar aplicativos DeFi). Para clareza conceitual, no entanto, é mais fácil distingui-los._

<Divider />

## O que é uma EIP? {#what-is-an-eip}

Um processo importante usado na governança do Ethereum é a criação de **Propostas de Melhoria do Ethereum (EIPs)**. As EIPs são padrões que especificam possíveis novos recursos ou processos para o Ethereum. Qualquer pessoa na comunidade do Ethereum pode criar uma EIP. Se você estiver interessado em escrever uma EIP ou participar da revisão por pares e/ou governança, consulte:

<ButtonLink href="/eips/">
  Mais sobre EIPs
</ButtonLink>

<Divider />

## O processo formal {#formal-process}

O processo formal para introduzir mudanças no protocolo do Ethereum é o seguinte:

1. **Propor uma EIP Principal (Core EIP)**: conforme descrito na [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), o primeiro passo para propor formalmente uma mudança no Ethereum é detalhá-la em uma EIP Principal. Isso atuará como a especificação oficial para uma EIP que os Desenvolvedores de Protocolo implementarão se for aceita.

2. **Apresentar sua EIP aos Desenvolvedores de Protocolo**: assim que você tiver uma EIP Principal para a qual reuniu a opinião da comunidade, você deve apresentá-la aos Desenvolvedores de Protocolo. Você pode fazer isso propondo-a para discussão em uma [chamada AllCoreDevs](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). É provável que algumas discussões já tenham acontecido de forma assíncrona no [fórum Ethereum Magicians](https://ethereum-magicians.org/) ou no [Discord de P&D do Ethereum](https://discord.gg/mncqtgVSVw).

> Os possíveis resultados desta etapa são:

> - A EIP será considerada para uma futura atualização da rede
> - Mudanças técnicas serão solicitadas
> - Pode ser rejeitada se não for uma prioridade ou se a melhoria não for grande o suficiente em relação ao esforço de desenvolvimento

3. **Iterar em direção a uma proposta final:** após receber feedback de todas as partes interessadas relevantes, você provavelmente precisará fazer mudanças em sua proposta inicial para melhorar sua segurança ou atender melhor às necessidades de vários usuários. Depois que sua EIP incorporar todas as mudanças que você acredita serem necessárias, você precisará apresentá-la novamente aos Desenvolvedores de Protocolo. Você então passará para a próxima etapa deste processo, ou novas preocupações surgirão, exigindo outra rodada de iterações em sua proposta.

4. **EIP incluída na atualização da rede**: supondo que a EIP seja aprovada, testada e implementada, ela é agendada como parte de uma atualização da rede. Dados os altos custos de coordenação das atualizações da rede (todos precisam atualizar simultaneamente), as EIPs geralmente são agrupadas em atualizações.

5. **Atualização da rede ativada**: após a ativação da atualização da rede, a EIP estará ativa na rede Ethereum. _Nota: as atualizações da rede geralmente são ativadas em redes de teste (testnets) antes de serem ativadas na Rede Principal do Ethereum._

Esse fluxo, embora muito simplificado, fornece uma visão geral das etapas significativas para que uma mudança de protocolo seja ativada no Ethereum. Agora, vamos dar uma olhada nos fatores informais em jogo durante esse processo.

## O processo informal {#informal-process}

### Entendendo o trabalho anterior {#prior-work}

Os líderes (Champions) de EIPs devem se familiarizar com trabalhos e propostas anteriores antes de criar uma EIP que possa ser seriamente considerada para implantação na Rede Principal do Ethereum. Dessa forma, espera-se que a EIP traga algo novo que não tenha sido rejeitado antes. Os três principais lugares para pesquisar isso são o [repositório de EIPs](https://github.com/ethereum/EIPs), o [Ethereum Magicians](https://ethereum-magicians.org/) e o [ethresear.ch](https://ethresear.ch/).

### Grupos de trabalho {#working-groups}

É improvável que o rascunho inicial de uma EIP seja implementado na Rede Principal do Ethereum sem edições ou mudanças. Geralmente, os líderes de EIPs trabalharão com um subconjunto de Desenvolvedores de Protocolo para especificar, implementar, testar, iterar e finalizar sua proposta. Historicamente, esses grupos de trabalho exigiram vários meses (e às vezes anos!) de trabalho. Da mesma forma, os líderes de EIPs para tais mudanças devem envolver os Desenvolvedores de Aplicativos/Ferramentas relevantes no início de seus esforços para coletar feedback do usuário final e mitigar quaisquer riscos de implantação.

### Consenso da comunidade {#community-consensus}

Embora algumas EIPs sejam melhorias técnicas diretas com o mínimo de nuances, algumas são mais complexas e vêm com compensações (tradeoffs) que afetarão diferentes partes interessadas de maneiras diferentes. Isso significa que algumas EIPs são mais polêmicas dentro da comunidade do que outras.

Não há um manual claro sobre como lidar com propostas polêmicas. Isso é resultado do design descentralizado do Ethereum, no qual nenhum grupo de partes interessadas pode coagir o outro por meio da força bruta: os desenvolvedores de protocolo podem optar por não implementar mudanças de código; os operadores de nós podem optar por não executar o cliente Ethereum mais recente; as equipes de aplicativos e os usuários podem optar por não transacionar na cadeia. Como os Desenvolvedores de Protocolo não têm como forçar as pessoas a adotar atualizações da rede, eles geralmente evitarão implementar EIPs onde a polêmica supera os benefícios para a comunidade em geral.

Espera-se que os líderes de EIPs solicitem feedback de todas as partes interessadas relevantes. Se você se encontrar como líder de uma EIP polêmica, deve tentar resolver as objeções para construir um consenso em torno de sua EIP. Dado o tamanho e a diversidade da comunidade do Ethereum, não há uma métrica única (por exemplo, uma votação por moedas) que possa ser usada para avaliar o consenso da comunidade, e espera-se que os líderes de EIPs se adaptem às circunstâncias de sua proposta.

Além da segurança da rede Ethereum, historicamente, os Desenvolvedores de Protocolo têm dado um peso significativo ao que os Desenvolvedores de Aplicativos/Ferramentas e os Usuários de Aplicativos valorizam, uma vez que o uso e o desenvolvimento no Ethereum é o que torna o ecossistema atraente para outras partes interessadas. Além disso, as EIPs precisam ser implementadas em todas as implementações de clientes, que são gerenciadas por equipes distintas. Parte desse processo geralmente significa convencer várias equipes de Desenvolvedores de Protocolo de que uma mudança específica é valiosa e que ajuda os usuários finais ou resolve um problema de segurança.

<Divider />

## Lidando com divergências {#disagreements}

Ter muitas partes interessadas com diferentes motivações e crenças significa que as divergências não são incomuns.

Geralmente, as divergências são tratadas com discussões longas em fóruns públicos para entender a raiz do problema e permitir que qualquer pessoa opine. Normalmente, um grupo cede ou um meio-termo é alcançado. Se um grupo se sentir forte o suficiente, forçar uma mudança específica pode resultar em uma divisão da cadeia (chain split). Uma divisão da cadeia ocorre quando algumas partes interessadas protestam contra a implementação de uma mudança de protocolo, resultando na operação de versões diferentes e incompatíveis do protocolo, das quais emergem duas blockchains distintas.

### A bifurcação da DAO {#dao-fork}

As bifurcações (forks) ocorrem quando grandes atualizações técnicas ou mudanças precisam ser feitas na rede e alteram as "regras" do protocolo. Os [clientes Ethereum](/developers/docs/nodes-and-clients/) devem atualizar seus softwares para implementar as novas regras da bifurcação.

A bifurcação da DAO foi uma resposta ao [ataque à DAO em 2016](https://www.coindesk.com/learn/understanding-the-dao-attack), onde um contrato inseguro de [DAO](/glossary/#dao) foi drenado em mais de 3,6 milhões de ETH em um hack. A bifurcação moveu os fundos do contrato defeituoso para um novo contrato, permitindo que qualquer pessoa que perdeu fundos no hack os recuperasse.

Esse curso de ação foi votado pela comunidade do Ethereum. Qualquer detentor de ETH pôde votar por meio de uma transação em [uma plataforma de votação](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). A decisão de bifurcar alcançou mais de 85% dos votos.

É importante notar que, embora o protocolo tenha bifurcado para reverter o hack, o peso que o voto teve na decisão de bifurcar é discutível por alguns motivos:

- O comparecimento para votar foi incrivelmente baixo
- A maioria das pessoas não sabia que a votação estava acontecendo
- O voto representou apenas os detentores de ETH, não qualquer um dos outros participantes do sistema

Um subconjunto da comunidade se recusou a bifurcar, em grande parte porque sentiram que o incidente da DAO não era um defeito no protocolo. Eles passaram a formar o [Ethereum Classic](https://ethereumclassic.org/).

Hoje, a comunidade do Ethereum adotou uma política de não intervenção em casos de bugs de contrato ou perda de fundos para manter a neutralidade crível do sistema.

Assista mais sobre o hack da DAO:

<VideoWatch slug="dao-hack-ethereum-classic" />

<Divider />

### A utilidade da bifurcação {#forking-utility}

A bifurcação Ethereum/Ethereum Classic é um excelente exemplo de uma bifurcação saudável. Tivemos dois grupos que discordaram fortemente um do outro sobre alguns valores fundamentais para sentir que valia a pena os riscos envolvidos para seguir seus cursos de ação específicos.

A capacidade de bifurcar diante de diferenças políticas, filosóficas ou econômicas significativas desempenha um grande papel no sucesso da governança do Ethereum. Sem a capacidade de bifurcar, a alternativa seria uma luta interna contínua, participação relutante forçada para aqueles que eventualmente formaram o Ethereum Classic e uma visão cada vez mais divergente de como é o sucesso para o Ethereum.

<Divider />

## Governança da Beacon Chain {#beacon-chain}

O processo de governança do Ethereum frequentemente troca velocidade e eficiência por abertura e inclusão. A fim de acelerar o desenvolvimento da Beacon Chain, ela foi lançada separadamente da rede Ethereum de Prova de Trabalho (PoW) e seguiu suas próprias práticas de governança.

Embora a especificação e as implementações de desenvolvimento sempre tenham sido totalmente de código aberto, os processos formais usados para propor atualizações descritos acima não foram usados. Isso permitiu que as mudanças fossem especificadas e acordadas mais rapidamente por pesquisadores e implementadores.

Quando a Beacon Chain se fundiu com a camada de execução do Ethereum em 15 de setembro de 2022, The Merge foi concluído como parte da [atualização da rede Paris](/ethereum-forks/#paris). A proposta [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) foi alterada de 'Última Chamada' (Last Call) para 'Final', completando a transição para a Prova de Participação (PoS).

<ButtonLink href="/roadmap/merge/">
  Mais sobre The Merge
</ButtonLink>

<Divider />

## Como posso me envolver? {#get-involved}

- [Propor uma EIP](/eips/#participate)
- [Discutir propostas atuais](https://ethereum-magicians.org/)
- [Envolver-se na discussão de P&D](https://ethresear.ch/)
- [Juntar-se ao Discord de P&D do Ethereum](https://discord.gg/mncqtgVSVw)
- [Executar um nó](/developers/docs/nodes-and-clients/run-a-node/)
- [Contribuir para o desenvolvimento de clientes](/developers/docs/nodes-and-clients/#execution-clients)
- [Programa de Aprendizagem para Core Developers](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort)

## Leitura adicional {#further-reading}

A governança no Ethereum não é rigidamente definida. Vários participantes da comunidade têm perspectivas diversas sobre ela. Aqui estão algumas delas:

- [Notas sobre a Governança de Blockchain](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [Como funciona a Governança do Ethereum?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Como funciona a governança do Ethereum](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [O que é um core developer do Ethereum?](https://hudsonjameson.com/posts/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [Governança, Parte 2: A Plutocracia Ainda é Ruim](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [Indo além da governança de votação por moedas](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
- [Entendendo a Governança de Blockchain](https://web.archive.org/web/20250124192731/https://research.2077.xyz/understanding-blockchain-governance) - _2077 Research_
- [O Governo do Ethereum](https://www.galaxy.com/insights/research/ethereum-governance/) - _Christine Kim_