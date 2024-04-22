---
title: Atualizando contratos inteligentes
description: Uma visão geral dos padrões de atualização de contratos inteligentes no Ethereum
lang: pt-br
---

Contratos inteligentes no Ethereum são programas auto-executados que rodam em Máquina Virtual Ethereum (EVM). Estes programas são imutáveis por desenho, o que evita quaisquer atualizações na lógica de negócios uma vez que o contrato é implantado.

Enquanto imutabilidade é necessária para falta de confiança, descentralização, e segurança de contratos inteligentes, ela pode ser um problema em certos casos. Por exemplo, código imutável pode tornar impossível desenvolvedores consertar contratos vulneráveis.

Entretanto, mais pesquisas sobre melhoria de contratos inteligentes tem levado à introdução de vários padrões de atualização. Estes padrões de atualização permitem a desenvolvedores atualizar contratos inteligentes (enquanto preservam a imutabilidade) colocando lógica de negócio em diferentes contratos.

## Pré-requisitos {#prerequisites}

Você deve ter um bom entendimento de [contratos inteligentes](/developers/docs/smart-contracts/), [anatomia de contratos inteligentes](/developers/docs/smart-contracts/anatomy/), e a [Máquina Virtual Ethereum (EVM)](/developers/docs/evm/). Este guia também presume que os leitores entendam de programação de contratos inteligentes.

## O que é uma atualização de contrato inteligente? {#what-is-a-smart-contract-upgrade}

Uma atualização de contrato inteligente envolve mudar a lógica de negócios de um contrato inteligente enquanto preserva o estado do contrato. É importante esclarecer que capacidade de atualização e mutabilidade não são o mesmo, especialmente no contexto de contratos inteligentes.

Você ainda não pode mudar um programa implantado em um endereço na rede Ethereum. Mas você pode alterar o código que é executado quando usuários interagem com um contrato inteligente.

Isto pode ser feito por meio dos seguintes métodos:

1. Criando múltiplas versões de um contrato inteligente e migrando o estado (ou seja, os dados) de um contrato antigo para uma nova instância do contrato.

2. Criando contratos separados para armazenar lógica de negócios e estado.

3. Usando padrões de proxy para delegar chamadas de função de um contrato de proxy imutável para um contrato de lógica modificável.

4. Criando um contrato principal imutável que faz interface e confia em contratos satélites flexíveis para executar funções específicas.

5. Usando o padrão diamante para delegar chamadas de função de um contrato proxy para contratos lógicos.

### Mecanismo de atualização 1: Migração de contrato {#contract-migration}

Migração de contrato é baseada no versionamento - a ideia de criar e gerenciar estados únicos do mesmo software. Migração de contrato envolve implantar uma nova instância de um contrato inteligente existente e transferir o storage e saldos para o novo contrato.

O recém-implantado contrato terá um storage vazio, permitindo você recuperar dados do contrato antigo e escrevê-lo na nova implementação. Depois disso, você precisará atualizar todos os contratos que interagiram com o contrato antigo para refletir o novo endereço.

O último passo na migração do contrato é convencer usuários a mudar para o novo contrato. A nova versão do contrato irá reter saldos de usuários e endereços, que preserva a imutabilidade. Se for um contrato baseado em token, você também precisará contatar a corretora para descartar o contrato antigo e usar o novo contrato.

Migração de contrato é uma medida relativamente direta e segura para atualização de contratos inteligentes sem quebrar interações de usuários. Entretanto, migrar manualmente o storage do usuário e saldos para o novo contrato é demorado e pode incorrer em altos gastos com gas.

[Mais sobre migração de contrato.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Mecanismo de atualização 2: Separação de dados {#data-separation}

Um outro método para atualização de contratos inteligentes é separar a lógica de negócios e o armazenamento de dados em contratos separados. Isto significa usuários interagirem com a lógica do contrato, enquanto dados são armazenados na storage do contrato.

O contrato lógico contém o código executado quando usuários interagem com a aplicação. Ele também mantém o endereço de storage do contrato e interage com ele para pegar e configurar os dados.

Enquanto isso, o storage do contrato mantém o estado associado com o contrato inteligente, como saldos de usuários e endereços. Note que o storage do contrato é de propriedade da lógica do contrato e é configurado com o endereço do último na implantação. Isto evita contratos não autorizados de chamar o storage do contrato ou atualizar seus dados.

Por padrão, o storage do contrato é imutável - mas você pode substituir o contrato lógico que ele aponta para uma nova implementação. Isto irá mudar o código que roda na EVM, enquanto mantém o storage o saldos intactos.

Usando este método de atualização requer atualizar o endereço do contrato lógico na storage do contrato. Você tem também que configurar o novo contrato lógico com o endereço do storage do contrato, por razões já explicadas anteriormente.

O padrão de separação de dados é discutivelmente mais fácil de implementar comparado à migração de contrato. Entretanto, você terá de gerenciar múltiplos contratos e implementar esquemas complexos de autorização para proteger contratos inteligentes de atualizações maliciosas.

### Mecanismo de atualização 3: Padrões de proxy {#proxy-patterns}

O padrão de proxy também usa separação de dados para manter lógica de negócio e dados em contratos separados. Entretanto, em um padrão de proxy, o storage do contrato (chamado de proxy) chama o contrato lógico durante a execução do código. Isto é o contrário do método de separação de dados, onde o contrato lógico chama o contrato de storage.

Isto é o que acontece em um padrão proxy:

1. Usuários interagem com o contrato de proxy, que armazena dados, mas não mantém a lógica de negócio.

2. O contrato proxy armazena os endereços do contrato lógico e delega todas as chamadas de função para o contrato lógico (que mantém a lógica de negócio) usando a função `delegatecall`.

3. Depois de a chamada ser direcionada para o contrato lógico, os dados retornados do contrato lógico é recuperado e retornado ao usuário.

Usar padrões de proxy requer um entendimento da função **delegatecall**. Basicamente, `delegatecall` é um opcode que permite um contrato chamar outro contrato, enquanto a execução real do código acontece no contexto do contrato chamado. Uma implicação de usar `delegatecall` em padrões proxy é que o contrato proxy lê e escreve no seu storage e executa lógica armazenada no contrato lógico como se chamando uma função interna.

Da [Documentação Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Existe uma variante especial de chamada de mensagem, chamada **delegatecall** que é idêntica à chamada de mensagem, exceto pelo fato de que o código no endereço alvo é executado no contexto (ou seja, no endereço) do contrato chamador e `msg.sender` e `msg.value` não mudam seus valores._ _Isto significa que um contrato pode dinamicamente carregar código de um endereço diferente em tempo de execução. Storage, endereço atual e saldo ainda se referem ao contrado chamador, somente o código é pego do endereço chamado._

O contrato proxy sabe invocar `delegatecall` sempre quando um usuário chama a função, porque ele tem uma funçaõ `fallback` construída dentro dele. Em programação Solidity a [função fallback](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) é executada quando uma chamada de função não encontra funções especificadas em um contrato.

Fazer o padrão proxy trabalhar requer escrever uma função fallback customizada que especifique como o contrato proxy deve manipular chamadas de função que ele não suporta. Neste caso, a função de fallback do proxy é programada para iniciar um delegatecall and re-rotear a requisição do usuário para a implementação atual do contrato lógico.

O contrato proxy é imutável por padrão, mas novos contratos lógicos com lógicas de negócio atualizadas podem ser criados. Fazer a atualização é então uma questão de mudança de endereço do contrato lógico referenciado no contrato proxy.

Ao apontar o contrato proxy para um novo contrato lógico, o código executado quando os usuários chamam a função do contrato proxy é alterado. Isso nos permite atualizar a lógica do contrato sem pedir para os usuários interagirem com o novo contrato.

Padrões proxy são um método popular para atualização de contratos inteligentes porque eles eliminam as dificuldades associadas com migração de contrato. No entanto, os padrões de proxy são mais complicados de usar e podem introduzir falhas críticas, como [conflitos do seletor de funções](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), se usado indevidamente.

[Mais sobre padrões de proxy](https://blog.openzeppelin.com/proxy-patterns/).

### Mecanismo de atualização 4: Padrão de estratégia {#strategy-pattern}

Esta técnica é influenciada pelo [padrão de estratégia](https://en.wikipedia.org/wiki/Strategy_pattern), que encoraja criar programas de software que fazem interface com outros programas para implementar recursos específicos. Aplicar padrão de estratégia para desenvolvimento Ethereum significaria construir um contrato inteligente que chama funções de outros contratos.

O contrato principal neste caso contém o núcleo da lógica de negócio, mas faz interface com outros contratos inteligentes ("contratos satélites") para executar certas funções. Este contrato principal também armazena o endereço para cada contrato satélite e pode alternar entre diferentes implementações de contrato satélite.

Você pode construir um novo contrato satélite e configurar o contrato principal com o novo endereço. Isto permite você mudar _estratégias_ (ou seja, implementar nova lógica) para um contrato inteligente.

Apesar de similar ao padrão de proxy discutido anteriormente, o padrão de estratégia é diferente porque o contrato principal, com o qual usuários interagem, mantém a lógica de negócios. Usar este padrão te dá a oportunidade de introduzir mudanças limitadas a um contrato inteligente sem afetar a infraestrutura principal.

A principal desvantagem é que este padrão é mais útil para implantar atualizações menores. Além disso, se o contrato for comprometido (por exemplo, via um hack), você não pode usar este método de atualização.

### Mecanismo de atualização 5: Padrão Diamante {#diamond-pattern}

O padrão diamante pode ser considerado uma melhoria do padrão proxy. Padrões diamante diferem dos padrões proxy porque o contrato proxy diamante pode delegar chamadas de função para mais de um contrato lógico.

Os contratos lógicos no padrão diamante são conhecidos como _facets_. Para fazer o padrão diamante funcionar, você precisa criar um mapeamento no contrato proxy que mapeie [funções seletoras](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) para endereços facet diferentes.

Quando um usuário faz uma chamada de função, o contrato proxy checa o mapeamento para encontrar o facet responsável por executar aquela função. Então ele invoca `delegatecall` (usando a função fallback) e redireciona a chamada para o devido contrato lógico.

O padrão de atualização diamante tem algumas desvantagens sobre os padrões tradicionais de atualização proxy:

1. Ele permite você atualizar uma pequena parte do contrato sem alterar todo o código. Usar o padrão proxy para atualizações requer criar um contrato lógico inteiramente novo, mesmo para pequenas atualizações.

2. Todos os contratos inteligentes (incluindo contratos lógicos usados nos padrões proxy) tem 24KB de limite de tamanho, o que pode ser uma limitação - especialmente para contratos complexos que requerem mais funções. O padrão diamante facilita resolver este problema dividindo funções por múltiplos contratos lógicos.

3. Padrões proxy adotam uma abordagem de pegar todos para controle de acesso. Uma entidade com acesso a funções de atualização pode mudar o contrato _inteiro_. Mas o padrão diamante habilita uma abordagem de permissões modulares, onde você pode restringir entidades para atualizar certas funções dentro de um contrato inteligente.

[Mais sobre padrão diamante](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Prós e contras da atualização de contratos inteligentes {#pros-and-cons-of-upgrading-smart-contracts}

| Prós                                                                                                                                           | Contras                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Uma atualização de contrato inteligente pode tornar mais fácil corrigir vulnerabilidades descobertas na fase pós-implantação.                  | A atualização de contratos inteligentes nega a ideia de imutabilidade do código, o qual tem implicações sobre descentralização e segurança.                                                |
| Os desenvolvedores podem usar atualizações lógicas para adicionar novas funcionalidades para aplicações descentralizadas.                      | Os usuários devem confiar nos desenvolvedores para não modificar contratos inteligentes de forma arbitrária.                                                                               |
| As atualizações de contratos inteligentes podem melhorar a segurança para os usuários finais, pois os bugs podem ser corrigidos rapidamente.   | A funcionalidade de atualização de programação em contratos inteligentes adiciona outra camada de complexidade e aumenta a possibilidade de falhas críticas.                               |
| As atualizações de contrato dá aos desenvolvedores mais liberdade para experimentar diferentes recursos e melhorar os dapps ao longo do tempo. | A oportunidade para atualizar contratos inteligentes pode encorajar os desenvolvedores a lançar projetos mais rapidamente sem fazer a devida diligência durante a fase de desenvolvimento. |
|                                                                                                                                                | O controle de acesso inseguro ou a centralização em contratos inteligentes podem tornar mais fácil por atores maliciosos a execução de atualizações não autorizadas.                       |

## Considerações para atualizar contratos inteligentes {#considerations-for-upgrading-smart-contracts}

1. Use mecanismos seguros de controle/autorização de acesso para evitar atualizações não autorizadas de contratos inteligentes, especialmente ao usar padrões de proxy, padrões de estratégia ou separação de dados. Um exemplo é restringir o acesso à função de atualização, de modo que apenas o proprietário do contrato possa chamá-lo.

2. A atualização de contratos inteligentes é uma atividade complexa e requer um alto nível de diligência para impedir a introdução de vulnerabilidades.

3. Reduza as suposições de confiança ao descentralizar o processo de implementação de atualizações. As estratégias possíveis incluem usar um [contrato de carteira multi-sig](/developers/docs/smart-contracts/#multisig), para controlar atualizações ou exigir [membros de um DAO](/dao/) para votar na aprovação da atualização.

4. Esteja ciente dos custos envolvidos na atualização de contratos. Por uma razão que, ao copiar o estado (por exemplo, saldos do usuário) de um contrato antigo para um novo contrato durante a migração do contrato pode exigir mais do que uma transação, o que significa mais taxas de gás.

5. Considere implementar **bloqueios de tempo** para proteger os usuários. Um bloqueio de tempo se refere a um atraso aplicado de mudanças em um sistema. Os bloqueios de tempo podem ser combinados com um sistema de governança multi-sig para controlar as atualizações: se uma ação proposta atingir o limite de aprovação necessária, ela não será executada até que o período de atraso predefinido termine.

Os bloqueios de tempo dão aos usuários algum tempo para sair do sistema, se eles discordarem de uma mudança proposta (por exemplo, atualização lógica ou novos esquemas de taxas). Sem bloqueios de tempo, os usuários precisam confiar nos desenvolvedores para não implementar alterações arbitrárias em um contrato inteligente sem aviso prévio. A desvantagem aqui é que os bloqueios de tempo restringem a capacidade de corrigir vulnerabilidades rapidamente.

## Recursos {#resources}

**Plugins de atualização do OpenZeppelin - _Um conjunto de ferramentas para implantar e proteger contratos inteligentes atualizáveis._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Documentação](https://docs.openzeppelin.com/upgrades)

## Tutoriais {#tutorials}

- [Atualizando seus contratos inteligentes | Tutorial do YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) por Patrick Collins
- [Tutorial de migração de contrtos inteligentes Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) por Austin Griffith
- [Usando o padrão de proxy UUPS para atualizar contratos inteligentes](https://blog.logrocket.com/author/praneshas/) por Pranesh A.S
- [Tutorial Web3: Escreva o contrato inteligente atualizável (proxy) usando OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) por fangjun.eth

## Leitura adicional {#further-reading}

- [O estado das atualizações de contratos inteligentes](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) por Santiago Palladino
- [Várias maneiras de atualizar um contrato inteligente Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - Blog do Crypto Market Pool
- [Aprenda: Atualizando contratos inteligentes](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - Documentos do OpenZeppelin
- [Padrões de proxy para capacidade de atualização de contratos Solidity: Proxies Transparentes vs UUPS](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) por Naveen Sahu
- [Como funcionam as atualizações por diamantes](https://dev.to/mudgen/how-diamond-upgrades-work-417j) de Nick Mudge
