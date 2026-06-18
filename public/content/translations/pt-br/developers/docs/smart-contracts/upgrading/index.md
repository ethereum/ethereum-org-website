---
title: Atualizando contratos inteligentes
description: Uma visão geral dos padrões de atualização para contratos inteligentes do Ethereum
lang: pt-br
---

Os contratos inteligentes no Ethereum são programas autoexecutáveis que rodam na Máquina Virtual Ethereum (EVM). Esses programas são imutáveis por design, o que impede quaisquer atualizações na lógica de negócios após a implantação do contrato.

Embora a imutabilidade seja necessária para a desnecessidade de confiança, descentralização e segurança dos contratos inteligentes, ela pode ser uma desvantagem em certos casos. Por exemplo, o código imutável pode impossibilitar que os desenvolvedores corrijam contratos vulneráveis.

No entanto, o aumento das pesquisas para melhorar os contratos inteligentes levou à introdução de vários padrões de atualização. Esses padrões de atualização permitem que os desenvolvedores atualizem contratos inteligentes (preservando a imutabilidade) ao colocar a lógica de negócios em contratos diferentes.

## Pré-requisitos {#prerequisites}

Você deve ter um bom entendimento sobre [contratos inteligentes](/developers/docs/smart-contracts/), [anatomia dos contratos inteligentes](/developers/docs/smart-contracts/anatomy/) e a [Máquina Virtual Ethereum (EVM)](/developers/docs/evm/). Este guia também pressupõe que os leitores tenham uma noção de programação de contratos inteligentes.

## O que é uma atualização de contrato inteligente? {#what-is-a-smart-contract-upgrade}

Uma atualização de contrato inteligente envolve a alteração da lógica de negócios de um contrato inteligente, preservando o estado do contrato. É importante esclarecer que a capacidade de atualização e a mutabilidade não são a mesma coisa, especialmente no contexto de contratos inteligentes.

Você ainda não pode alterar um programa implantado em um endereço na rede Ethereum. Mas você pode alterar o código que é executado quando os usuários interagem com um contrato inteligente.

Isso pode ser feito por meio dos seguintes métodos:

1. Criando várias versões de um contrato inteligente e migrando o estado (ou seja, dados) do contrato antigo para uma nova instância do contrato.

2. Criando contratos separados para armazenar a lógica de negócios e o estado.

3. Usando padrões de proxy para delegar chamadas de função de um contrato proxy imutável para um contrato lógico modificável.

4. Criando um contrato principal imutável que faz interface e depende de contratos satélites flexíveis para executar funções específicas.

5. Usando o padrão diamante para delegar chamadas de função de um contrato proxy para contratos lógicos.

### Mecanismo de atualização nº 1: Migração de contrato {#contract-migration}

A migração de contrato é baseada no versionamento — a ideia de criar e gerenciar estados exclusivos do mesmo software. A migração de contrato envolve a implantação de uma nova instância de um contrato inteligente existente e a transferência de armazenamento e saldos para o novo contrato.

O contrato recém-implantado terá um armazenamento vazio, permitindo que você recupere dados do contrato antigo e os grave na nova implementação. Depois disso, você precisará atualizar todos os contratos que interagiram com o contrato antigo para refletir o novo endereço.

A última etapa na migração de contrato é convencer os usuários a mudarem para o novo contrato. A nova versão do contrato reterá os saldos e endereços dos usuários, o que preserva a imutabilidade. Se for um contrato baseado em token, você também precisará entrar em contato com as exchanges para descartar o contrato antigo e usar o novo contrato.

A migração de contrato é uma medida relativamente simples e segura para atualizar contratos inteligentes sem interromper as interações do usuário. No entanto, migrar manualmente o armazenamento e os saldos do usuário para o novo contrato consome muito tempo e pode incorrer em altos custos de gás.

[Mais sobre migração de contrato.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Mecanismo de atualização nº 2: Separação de dados {#data-separation}

Outro método para atualizar contratos inteligentes é separar a lógica de negócios e o armazenamento de dados em contratos separados. Isso significa que os usuários interagem com o contrato lógico, enquanto os dados são armazenados no contrato de armazenamento.

O contrato lógico contém o código executado quando os usuários interagem com o aplicativo. Ele também mantém o endereço do contrato de armazenamento e interage com ele para obter e definir dados.

Enquanto isso, o contrato de armazenamento mantém o estado associado ao contrato inteligente, como saldos e endereços de usuários. Observe que o contrato de armazenamento pertence ao contrato lógico e é configurado com o endereço deste último na implantação. Isso impede que contratos não autorizados chamem o contrato de armazenamento ou atualizem seus dados.

Por padrão, o contrato de armazenamento é imutável — mas você pode substituir o contrato lógico para o qual ele aponta por uma nova implementação. Isso alterará o código que é executado na EVM, mantendo o armazenamento e os saldos intactos.

O uso desse método de atualização exige a atualização do endereço do contrato lógico no contrato de armazenamento. Você também deve configurar o novo contrato lógico com o endereço do contrato de armazenamento pelos motivos explicados anteriormente.

O padrão de separação de dados é indiscutivelmente mais fácil de implementar em comparação com a migração de contrato. No entanto, você terá que gerenciar vários contratos e implementar esquemas de autorização complexos para proteger os contratos inteligentes de atualizações maliciosas.

### Mecanismo de atualização nº 3: Padrões proxy {#proxy-patterns}

O padrão proxy também usa a separação de dados para manter a lógica de negócios e os dados em contratos separados. No entanto, em um padrão proxy, o contrato de armazenamento (chamado de proxy) chama o contrato lógico durante a execução do código. Isso é o inverso do método de separação de dados, onde o contrato lógico chama o contrato de armazenamento.

Isto é o que acontece em um padrão proxy:

1. Os usuários interagem com o contrato proxy, que armazena dados, mas não contém a lógica de negócios.

2. O contrato proxy armazena o endereço do contrato lógico e delega todas as chamadas de função para o contrato lógico (que contém a lógica de negócios) usando a função `delegatecall`.

3. Depois que a chamada é encaminhada para o contrato lógico, os dados retornados do contrato lógico são recuperados e retornados ao usuário.

O uso dos padrões proxy exige um entendimento da função **delegatecall**. Basicamente, `delegatecall` é um código de operação que permite que um contrato chame outro contrato, enquanto a execução real do código acontece no contexto do contrato chamador. Uma implicação do uso de `delegatecall` em padrões proxy é que o contrato proxy lê e grava em seu armazenamento e executa a lógica armazenada no contrato lógico como se estivesse chamando uma função interna.

Da [documentação da Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Existe uma variante especial de uma chamada de mensagem, chamada **delegatecall**, que é idêntica a uma chamada de mensagem, exceto pelo fato de que o código no endereço de destino é executado no contexto (ou seja, no endereço) do contrato chamador e `msg.sender` e `msg.value` não alteram seus valores._ _Isso significa que um contrato pode carregar dinamicamente o código de um endereço diferente em tempo de execução. O armazenamento, o endereço atual e o saldo ainda se referem ao contrato chamador, apenas o código é retirado do endereço chamado._

O contrato proxy sabe invocar `delegatecall` sempre que um usuário chama uma função porque tem uma função `fallback` embutida nele. Na programação em Solidity, a [função de fallback](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) é executada quando uma chamada de função não corresponde às funções especificadas em um contrato.

Fazer o padrão proxy funcionar exige escrever uma função de fallback personalizada que especifique como o contrato proxy deve lidar com chamadas de função que ele não suporta. Neste caso, a função de fallback do proxy é programada para iniciar um delegatecall e redirecionar a solicitação do usuário para a implementação atual do contrato lógico.

O contrato proxy é imutável por padrão, mas novos contratos lógicos com lógica de negócios atualizada podem ser criados. Realizar a atualização é, então, uma questão de alterar o endereço do contrato lógico referenciado no contrato proxy.

Ao apontar o contrato proxy para um novo contrato lógico, o código executado quando os usuários chamam a função do contrato proxy muda. Isso nos permite atualizar a lógica de um contrato sem pedir aos usuários que interajam com um novo contrato.

Os padrões proxy são um método popular para atualizar contratos inteligentes porque eliminam as dificuldades associadas à migração de contrato. No entanto, os padrões proxy são mais complicados de usar e podem introduzir falhas críticas, como [conflitos de seletores de função](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), se usados incorretamente.

[Mais sobre padrões proxy](https://blog.openzeppelin.com/proxy-patterns/).

### Mecanismo de atualização nº 4: Padrão de estratégia {#strategy-pattern}

Esta técnica é influenciada pelo [padrão de estratégia](https://en.wikipedia.org/wiki/Strategy_pattern), que incentiva a criação de programas de software que fazem interface com outros programas para implementar recursos específicos. Aplicar o padrão de estratégia ao desenvolvimento no Ethereum significaria construir um contrato inteligente que chama funções de outros contratos.

O contrato principal, neste caso, contém a lógica de negócios central, mas faz interface com outros contratos inteligentes ("contratos satélites") para executar certas funções. Este contrato principal também armazena o endereço de cada contrato satélite e pode alternar entre diferentes implementações do contrato satélite.

Você pode construir um novo contrato satélite e configurar o contrato principal com o novo endereço. Isso permite que você altere as _estratégias_ (ou seja, implemente uma nova lógica) para um contrato inteligente.

Embora semelhante ao padrão proxy discutido anteriormente, o padrão de estratégia é diferente porque o contrato principal, com o qual os usuários interagem, contém a lógica de negócios. O uso desse padrão oferece a oportunidade de introduzir alterações limitadas em um contrato inteligente sem afetar a infraestrutura principal.

A principal desvantagem é que esse padrão é útil principalmente para lançar pequenas atualizações. Além disso, se o contrato principal for comprometido (por exemplo, por meio de um hack), você não poderá usar esse método de atualização.

### Mecanismo de atualização nº 5: Padrão diamante {#diamond-pattern}

O padrão diamante pode ser considerado uma melhoria no padrão proxy. Os padrões diamante diferem dos padrões proxy porque o contrato proxy diamante pode delegar chamadas de função para mais de um contrato lógico.

Os contratos lógicos no padrão diamante são conhecidos como _facetas_ (facets). Para fazer o padrão diamante funcionar, você precisa criar um mapeamento no contrato proxy que mapeie [seletores de função](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) para diferentes endereços de facetas.

Quando um usuário faz uma chamada de função, o contrato proxy verifica o mapeamento para encontrar a faceta responsável por executar essa função. Em seguida, ele invoca `delegatecall` (usando a função de fallback) e redirecioniona a chamada para o contrato lógico apropriado.

O padrão de atualização diamante tem algumas vantagens sobre os padrões de atualização proxy tradicionais:

1. Ele permite que você atualize uma pequena parte do contrato sem alterar todo o código. O uso do padrão proxy para atualizações exige a criação de um contrato lógico totalmente novo, mesmo para pequenas atualizações.

2. Todos os contratos inteligentes (incluindo contratos lógicos usados em padrões proxy) têm um limite de tamanho de 24 KB, o que pode ser uma limitação — especialmente para contratos complexos que exigem mais funções. O padrão diamante facilita a solução desse problema dividindo as funções em vários contratos lógicos.

3. Os padrões proxy adotam uma abordagem abrangente para controles de acesso. Uma entidade com acesso a funções de atualização pode alterar _todo_ o contrato. Mas o padrão diamante permite uma abordagem de permissões modulares, onde você pode restringir entidades a atualizar certas funções dentro de um contrato inteligente.

[Mais sobre o padrão diamante](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Prós e contras da atualização de contratos inteligentes {#pros-and-cons-of-upgrading-smart-contracts}

| Prós                                                                                                                                                           | Contras                                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Uma atualização de contrato inteligente pode facilitar a correção de vulnerabilidades descobertas na fase pós-implantação.                                     | A atualização de contratos inteligentes nega a ideia de imutabilidade do código, o que tem implicações para a descentralização e a segurança.                                                           |
| Os desenvolvedores podem usar atualizações lógicas para adicionar novos recursos a aplicativos descentralizados (dapps).                                       | Os usuários devem confiar que os desenvolvedores não modificarão os contratos inteligentes arbitrariamente.                                                                                             |
| As atualizações de contratos inteligentes podem melhorar a segurança para os usuários finais, pois os bugs podem ser corrigidos rapidamente.                   | Programar a funcionalidade de atualização em contratos inteligentes adiciona outra camada de complexidade e aumenta a possibilidade de falhas críticas.                                                 |
| As atualizações de contrato dão aos desenvolvedores mais espaço para experimentar diferentes recursos e melhorar os dapps ao longo do tempo.                   | A oportunidade de atualizar contratos inteligentes pode encorajar os desenvolvedores a lançar projetos mais rapidamente sem fazer a devida diligência durante a fase de desenvolvimento.                |
|                                                                                                                                                                | O controle de acesso inseguro ou a centralização em contratos inteligentes podem facilitar a realização de atualizações não autorizadas por agentes mal-intencionados.                                  |

## Considerações para atualizar contratos inteligentes {#considerations-for-upgrading-smart-contracts}

1. Use mecanismos seguros de controle de acesso/autorização para evitar atualizações não autorizadas de contratos inteligentes, especialmente se usar padrões proxy, padrões de estratégia ou separação de dados. Um exemplo é restringir o acesso à função de atualização, de forma que apenas o proprietário do contrato possa chamá-la.

2. A atualização de contratos inteligentes é uma atividade complexa e exige um alto nível de diligência para evitar a introdução de vulnerabilidades.

3. Reduza as premissas de confiança descentralizando o processo de implementação de atualizações. As estratégias possíveis incluem o uso de um [contrato de carteira com múltiplas assinaturas (multi-sig)](/developers/docs/smart-contracts/#multisig) para controlar as atualizações, ou exigir que os [membros de uma DAO](/dao/) votem na aprovação da atualização.

4. Esteja ciente dos custos envolvidos na atualização de contratos. Por exemplo, copiar o estado (por exemplo, saldos de usuários) de um contrato antigo para um novo contrato durante a migração de contrato pode exigir mais de uma transação, o que significa mais taxas de gás.

5. Considere implementar **timelocks** (bloqueios de tempo) para proteger os usuários. Um timelock refere-se a um atraso imposto às alterações em um sistema. Os timelocks podem ser combinados com um sistema de governança multi-sig para controlar as atualizações: se uma ação proposta atingir o limite de aprovação exigido, ela não será executada até que o período de atraso predefinido termine.

Os timelocks dão aos usuários algum tempo para sair do sistema se discordarem de uma alteração proposta (por exemplo, atualização lógica ou novos esquemas de taxas). Sem timelocks, os usuários precisam confiar que os desenvolvedores não implementarão alterações arbitrárias em um contrato inteligente sem aviso prévio. A desvantagem aqui é que os timelocks restringem a capacidade de corrigir vulnerabilidades rapidamente.

## Recursos {#resources}

**Plugins de Atualizações da OpenZeppelin - _Um conjunto de ferramentas para implantar e proteger contratos inteligentes atualizáveis._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Documentação](https://docs.openzeppelin.com/upgrades)

## Tutoriais {#tutorials}

- [Atualizando seus Contratos Inteligentes | Tutorial no YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) por Patrick Collins
- [Tutorial de Migração de Contrato Inteligente do Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) por Austin Griffith
- [Usando o padrão proxy UUPS para atualizar contratos inteligentes](https://blog.logrocket.com/author/praneshas/) por Pranesh A.S
- [Tutorial de Web3: Escreva um contrato inteligente atualizável (proxy) usando a OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) por fangjun.eth

## Leitura adicional {#further-reading}

- [O Estado das Atualizações de Contratos Inteligentes](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) por Santiago Palladino
- [Várias maneiras de atualizar um contrato inteligente em Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - Blog Crypto Market Pool
- [Aprenda: Atualizando Contratos Inteligentes](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - Documentação da OpenZeppelin
- [Padrões Proxy para Capacidade de Atualização de Contratos em Solidity: Proxies Transparentes vs UUPS](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) por Naveen Sahu
- [Como Funcionam as Atualizações Diamante](https://dev.to/mudgen/how-diamond-upgrades-work-417j) por Nick Mudge