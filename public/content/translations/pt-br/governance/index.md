---
title: Governança Ethereum
description: Uma introdução à forma como as decisões sobre a Ethereum são tomadas.
lang: pt-br
---

# Introdução à governança Ethereum {#introduction}

_Se ninguém é proprietário da Ethereum, como são feitas as decisões sobre mudanças passadas e futuras na Ethereum? A governança Ethereum refere-se ao processo que permite que tais decisões sejam tomadas._

<Divider />

## O que é governança? {#what-is-governance}

Governança é o sistema em vigor que permite a tomada de decisões. Em uma estrutura típica organizacional, a equipe executiva ou o conselho de administração podem ter a última palavra sobre o processo decisório. Ou talvez os acionistas votem propostas para adoção de mudanças. Em um sistema político, os funcionários eleitos podem aprovar legislação que tenta representar os desejos dos seus eleitores.

## Governança descentralizada {#decentralized-governance}

Ninguém possui ou controla o protocolo Ethereum, mas ainda é necessário tomar decisões sobre a implementação de mudanças para garantir da melhor forma a longevidade e a prosperidade da rede. Esta falta de propriedade faz da governança organizacional tradicional uma solução incompatível.

## Governança Ethereum {#ethereum-governance}

A governança Ethereum é o processo pelo qual as alterações no protocolo são feitas. É importante salientar que este processo não está relacionado à maneira como as pessoas e os aplicativos usam o protocolo – o Ethereum é sem restrições. Qualquer pessoa de qualquer lugar do mundo pode participar de atividades on-chain. Não há regras definidas para quem pode ou não desenvolver um aplicativo ou enviar uma transação. No entanto, existe um processo para propor alterações no protocolo principal, que é executado em cima de aplicações descentralizadas. Uma vez que tantas pessoas dependem da estabilidade do Ethereum, existe uma limitação de coordenação muito alta para mudanças principais, incluindo processos sociais e técnicos, para garantir que quaisquer alterações no Ethereum sejam seguras e amplamente suportadas pela comunidade.

### Governança on-chain versus off-chain {#on-chain-vs-off-chain}

A tecnologia Blockchain permite novos recursos de governança, conhecidos como governança on-chain. A governança on-chain é quando as alterações propostas no protocolo são decididas por votação das partes interessadas, geralmente por detentores de um token de governança, e a votação acontece no blockchain. Com algumas formas de governança on-chain, as mudanças de protocolo propostas já são escritas em código e implementadas automaticamente, se as partes interessadas aprovarem as mudanças por meio da assinatura de uma transação.

A abordagem oposta, a governança off-chain, é quando quaisquer decisões de mudança de protocolo acontecem por meio de um processo informal de discussão social que, se aprovado, é implementado no código.

**A governança da Ethereum acontece de maneira off-chain**, com uma grande variedade de partes interessadas envolvidas no processo.

_Embora no protocolo a governança Ethereum seja off-chain, muitos casos de uso com base em Ethereum, como DAOs, usam a governação on-chain._

<ButtonLink href="/dao/">
  Mais sobre DAOs
</ButtonLink>

<Divider />

## Quem está envolvido? {#who-is-involved}

Existem vários interessados na [comunidade Ethereum](/community/), cada um desempenhando um papel no processo de governança. Começando pelas partes interessadas mais distantes do protocolo e ampliando, temos:

- **Detentores de Ether**: essas pessoas têm uma quantidade arbitrária de ETH. [Mais sobre ETH](/eth/).
- **Usuários da aplicação**: essas pessoas interagem com aplicativos no blockchain Ethereum.
- **Desenvolvedores de aplicativos/ferramentas**: estas pessoas escrevem aplicativos que são executados no blockchain Ethereum (por exemplo, DeFi, NFTs etc.) ou criam ferramentas para interagir com a Ethereum (por exemplo, carteiras, suíte de testes etc.). [Mais sobre dapps](/dapps/).
- **Operadores de nós**: essas pessoas executam nós que propagam blocos e transações, rejeitando qualquer transação ou bloco inválido que eles encontrem. [Mais sobre nós](/developers/docs/nodes-and-clients/).
- **Autores do EIP**: estas pessoas propõem alterações no protocolo Ethereum, na forma de propostas de aprimoramento do Ethereum (EIPs). [Mais sobre EIPs](/eips/).
- **Validadores**: essas pessoas executam nós que podem adicionar novos blocos à blockchain Ethereum.
- **Desenvolvedores de protocolo** (conhecido como "Desenvolvedores principais"): essas pessoas mantêm as várias implementações do Ethereum (por exemplo, go-ethereum, Nethermind, Besu, Erigon, Reth na camada de execução, ou Prysm, Lighthouse, Nimbus, Teku, Lodestar, na camada de consenso). [Mais sobre clientes Ethereum](/developers/docs/nodes-and-clients/).

_Nota: qualquer indivíduo pode fazer parte de vários desses grupos (por exemplo, um desenvolvedor de protocolo pode ganhar um EIP e executar uma Beacon Chain validadora e usar aplicativos DeFi). Mas, para clareza conceitual, é mais fácil distinguir entre eles._

<Divider />

## O que é um EIP? {#what-is-an-eip}

Um processo importante usado na governança Ethereum é a sugestão de **Propostas de melhoria Ethereum (EIPs)**. EIPs são padrões que especificam novos recursos ou processos potenciais para a Ethereum. Qualquer um dentro da comunidade Ethereum pode criar um EIP. Caso tenha interesse em escrever uma EIP, participar em revisão por pares e/ou governança, consulte:

<ButtonLink href="/eips/">
  Mais sobre EIPs
</ButtonLink>

<Divider />

## Processo formal {#formal-process}

O processo formal para a introdução de alterações no protocolo Ethereum é o seguinte:

1. **Propor um EIP principal**: como descrito em [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), o primeiro passo para propor formalmente uma alteração no Ethereum é detalhá-la em um EIP principal. Isto funcionará como a especificação oficial de um EIP que os desenvolvedores do protocolo irão implementar, se aceitarem.

2. **Apresentar seu EIP aos desenvolvedores do protocolo**: uma vez que você tiver um EIP principal para o qual você coletou informações da comunidade, você deve apresentá-lo aos desenvolvedores do protocolo. Você pode fazer isso propondo-a para discussão em uma chamada [AllCoreDevs](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). É provável que algumas discussões já tenham acontecido de forma assíncrona no [fórum da Ethereum Magician](https://ethereum-magicians.org/) ou no [Ethereum R&D Discord](https://discord.gg/mncqtgVSVw).

> Os resultados potenciais desta fase são:

> - O EIP será considerado para uma atualização futura da rede
> - Serão solicitadas mudanças técnicas
> - Pode ser rejeitado se não for uma prioridade ou se a melhoria não for o suficientemente grande em relação ao esforço de desenvolvimento

3. **Refazer a proposta final:** depois de receber feedback de todas as partes interessadas relevantes, você provavelmente precisará fazer alterações em sua proposta inicial para melhorar a segurança dela ou atender melhor às necessidades de vários usuários. Depois que sua EIP tiver incorporado todas as mudanças que você acredita serem necessárias, precisará apresentá-la novamente aos desenvolvedores do protocolo. Em seguida, você avançará para o próximo passo deste processo, ou surgirão novas preocupações, exigindo outra rodada de iterações sobre sua proposta.

4. **EIP incluída na atualização de rede**: assumindo que a EIP seja aprovada, testada e implementada, ela é programada como parte de uma atualização de rede. Tendo em conta os altos custos de coordenação das atualizações da rede (todos precisam ser atualizados simultaneamente), as EIPs geralmente são agrupadas nas atualizações.

5. **Atualização de rede ativada**: após a atualização de rede ser ativada, a EIP estará disponível na rede Ethereum. _Nota: atualizações de rede geralmente são ativadas nas redes de teste antes de serem ativadas na rede principal de Ethereum._

Este fluxo, embora muito simplificado, fornece uma visão geral das etapas relevantes para alteração do protocolo que será ativado em Ethereum. Vejamos agora os fatores informais em jogo durante este processo.

## Processo informal {#informal-process}

### Entendendo o trabalho anterior {#prior-work}

Os ganhadores da EIP devem se familiarizar com o trabalho prévio e as propostas antes de criar uma EIP que pode ser seriamente considerada para implantação na rede principal Ethereum. Desta forma, a EIP traz algo novo que não foi rejeitado antes. Os três principais lugares para pesquisar isso são o [repositório EIP](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) e [ethresear.ch](https://ethresear.ch/).

### Grupos de trabalho {#working-groups}

É improvável que o rascunho inicial de uma EIP seja implementado na rede principal Ethereum sem edições ou alterações. Geralmente, os ganhadores da EIP trabalharão com um subconjunto de desenvolvedores de protocolo para especificar, implementar, testar, iterar e finalizar sua proposta. Historicamente, estes grupos de trabalho exigiram vários meses (e as vezes anos!) de trabalho. Da mesma forma, para tais mudanças, os ganhadores da EIP devem envolver, logo nos estágios iniciais, desenvolvedores relevantes de aplicativos e ferramentas em seus esforços para reunir feedback do usuário final e mitigar quaisquer riscos de implementação.

### Consenso da comunidade {#community-consensus}

Embora alguns EIPs sejam melhorias técnicas simples com nuances mínimas, alguns são mais complexos e vêm com tradeoffs que afetarão diferentes partes interessadas de maneiras diferentes. Isso significa que alguns EIPs são mais controversos dentro da comunidade do que outros.

Não existe um roteiro claro sobre a forma de lidar com propostas controversas. Isso é resultado do design descentralizado do Ethereum, pelo qual nenhum grupo de participantes pode coagir o outro por meio de força bruta: os desenvolvedores de protocolo podem escolher não implementar mudanças de código; os operadores de nó podem escolher não executar o cliente Ethereum mais recente; equipes de aplicativos e usuários podem escolher não realizar transações na cadeia. Uma vez que os desenvolvedores do protocolo não têm como forçar as pessoas a adotarem atualizações de rede, geralmente evitarão a implementação de EIPs se os pontos controversos superarem os benefícios para a comunidade em geral.

Espera-se que os campeões da EIP solicitem feedback de todas as partes interessadas relevantes. Se você encontrar o ganhador de uma EIP controversa, você deve tentar resolver objeções para criar consenso em torno da sua EIP. Dado o tamanho e a diversidade da comunidade Ethereum, não existe uma única métrica (por exemplo, uma votação de moeda) que pode ser usada para medir o consenso da comunidade e espera-se que os ganhadores do EIP se adaptem às circunstâncias da sua proposta.

Além da segurança da rede Ethereum, os desenvolvedores de protocolo dão muita importância ao que os desenvolvedores de aplicativos/ferramentas e os usuários de aplicativos valorizam, dado que o uso que eles dão e o desenvolvimento que fazem na Ethereum é o que torna o ecossistema atraente para outras partes interessadas. Além disso, as EIPs precisam ser implementadas em todas as implementações do cliente, que são gerenciadas por equipes distintas. Parte deste processo geralmente significa convencer várias equipes de desenvolvedores do protocolo de que uma determinada mudança é valiosa e que ajuda usuários finais ou resolve um problema de segurança.

<Divider />

## Tratamento de discordâncias {#disagreements}

Ter muitas partes interessadas com motivações e convicções diferentes significa que as divergências não são incomuns.

De um modo geral, os desacordos são tratados com discussões de longo prazo em fóruns públicos para compreender a raiz do problema e permitir que qualquer um faça ponderações. Normalmente, um grupo concede ou um meio termo é alcançado. Se houver um grupo que se sinta suficientemente forte, a imposição de uma determinada mudança poderá resultar em uma divisão da cadeia. Uma divisão da cadeia é quando algumas partes interessadas protestam pela implementação de uma mudança no protocolo, resultando em algo diferente, versões incompatíveis do protocolo que opera, do qual emergem dois blockchains distintos.

### Bifurcação (Fork) de DAO {#dao-fork}

Forks são quando é necessário fazer grandes melhorias técnicas ou alterações na rede e modificar as "regras" do protocolo. [Os clientes da Ethereum](/developers/docs/nodes-and-clients/) devem atualizar seu software para implementar as novas regras do fork.

O fork da DAO foi em resposta ao [ataque da DAO de 2016](https://www.coindesk.com/understanding-dao-hack-journalists) no qual um contrato inseguro de [DAO](/glossary/#dao) foi drenado em mais de 3 milhões de ETH em um hack. O fork transferiu os fundos do contrato falho para um novo contrato, permitindo que qualquer um que perdeu fundos no hack os recuperasse.

Este curso de ação foi votado pela comunidade Ethereum. Qualquer titular de ETH pôde votar por meio de uma transação em [uma plataforma de votação](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). A decisão de criar fork ultrapassou 85% dos votos.

É importante notar que enquanto o protocolo fez um fork para reverter o hack, o peso que a votação teve na decisão de criar fork é discutível por algumas razões:

- A participação na votação foi incrivelmente baixa
- A maioria das pessoas não sabia que a votação estava acontecendo
- O voto somente representou os titulares de ETH, e nenhum dos outros participantes no sistema

Um subconjunto da comunidade se recusou a fazer um fork, principalmente por sentirem que o incidente da DAO não era um defeito no protocolo. Eles começaram a formar a [Ethereum Classic](https://ethereumclassic.org/).

Hoje, a comunidade Ethereum adotou uma política de não intervenção em casos de erros contratuais ou perda de fundos para manter a neutralidade verossímil do sistema.

Veja mais sobre o hack DAO:

<YouTube id="rNeLuBOVe8A" />

<Divider />

### A utilidade do forking {#forking-utility}

O fork Ethereum/Ethereum Classic é um excelente exemplo de um fork íntegro. Houve dois grupos que não chegaram a um consenso com respeito a alguns valores fundamentais, pois sentiram que prosseguir com suas ações específicas valia o risco.

A capacidade de criar forks em face de diferenças políticas, filosóficas ou econômicas desempenha um papel importante no sucesso da governança Ethereum. Sem capacidade de lançar fork, a alternativa era a luta interna contínua, participação relutante forçada para aqueles que eventualmente formaram o Ethereum Classic e uma visão cada vez mais diferente do sucesso para o Ethereum.

<Divider />

## Governança da Beacon Chain {#beacon-chain}

O processo de governança Ethereum muitas vezes troca velocidade e eficiência por abertura e inclusão. A fim de acelerar o desenvolvimento da Beacon Chain, esta foi lançada separadamente da prova de trabalho da rede Ethereum e seguiu suas próprias práticas de governança.

Embora as implementações de especificação e desenvolvimento sempre tenham sido totalmente de código aberto, os processos formais usados para propor as atualizações descritas acima não foram usados. Isso permitiu que as alterações fossem especificadas e acordadas mais rapidamente por pesquisadores e implementadores.

Quando ocorreu a fusão da Beacon Chain com a camada de execução do Ethereum em 15 de setembro de 2022, a transação foi concluída como parte da [melhoria da rede Paris](/history/#paris). A proposta [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) foi alterada de "Última Chamada" para "Final", completando a transição para o prova de participação.

<ButtonLink href="/roadmap/merge/">
  Mais sobre a integração
</ButtonLink>

<Divider />

## Como posso participar? {#get-involved}

- [Propor um EIP](/eips/#participate)
- [Discutir as propostas atuais](https://ethereum-magicians.org/)
- [Envolver-se na discussão de R&D](https://ethresear.ch/)
- [Unir-se ao Discord da Ethereum R&D](https://discord.gg/mncqtgVSVw)
- [Executar um nó](/developers/docs/nodes-and-clients/run-a-node/)
- [Contribuir para o desenvolvimento do cliente](/developers/docs/nodes-and-clients/#execution-clients)
- [Programa de aprendizagem de desenvolvimento principal](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort/)

## Leitura adicional {#further-reading}

A governança na Ethereum não está definida de forma rígida. Vários participantes da comunidade têm diversas perspectivas sobre isso. Aqui estão alguns deles:

- [Notas sobre governança da blockchain](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [Como funciona a governança Ethereum?](https://cryptotesters.com/blog/ethereum-governance) – _Criptotesters_
- [Como funciona a governança Ethereum](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [O que é um desenvolvedor principal Ethereum?](https://hudsonjameson.com/2020-06-22-what-is-an-ethereum-core-developer/) – _Hudson Jameson_
- [Governança, Parte 2: a plutocracia ainda é uma desvantagem](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) – _Vitalik Buterin_
- [Indo além da governança por meio da votação com moedas.](https://vitalik.eth.limo/general/2021/08/16/voting3.html) – _Vitalik Buterin_
