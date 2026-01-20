---
title: Abstração de conta
description: Uma visão geral dos planos do Ethereum para tornar as contas de usuário mais simples e seguras
lang: pt-br
summaryPoints:
  - A abstração da conta facilita muito a criação de carteiras de contratos inteligentes
  - As carteiras de contratos inteligentes facilitam muito o gerenciamento do acesso às contas do Ethereum
  - Chaves perdidas e expostas podem ser recuperadas usando vários backups
---

# Abstração de conta {#account-abstraction}

A maioria dos usuários existentes interage com o Ethereum usando **[contas de propriedade externa (EOAs)](/glossary/#eoa)**. Limitando a forma como o usuário irá interagir com o Ethereum. Por exemplo, isso dificulta a execução de várias transações de uma vez e obriga os usuários a manter um saldo em ETH para lidar com as taxas.

A abstração de contas é uma maneira de resolver esses problemas, permitindo que os usuários programem com flexibilidade mais segurança e melhores experiências de usuário nas respectivas contas. Isso pode acontecer [atualizando as EOAs](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) para que possam ser controladas por contratos inteligentes. Há também outro caminho que envolve adicionar um [segundo sistema de transação separado](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) para ser executado em paralelo ao protocolo existente. Independentemente do caminho, o resultado é o acesso ao Ethereum por meio de carteiras de smart contract, seja com suporte nativo como parte do protocolo existente ou por uma rede de transações.

As carteiras de contratos inteligentes oferecem muitos benefícios ao usuário, incluindo:

- definição das próprias regras de segurança flexíveis
- recuperação da conta, se o usuário perder as chaves
- compartilhamento da segurança da conta entre dispositivos ou indivíduos confiáveis
- pagamento do gás de outra pessoa ou solicitar o pagamento do respectivo gás a um terceiro
- transações em lote (e.g, por exemplo, aprovar e executar uma troca de uma só vez)
- mais oportunidades para que os desenvolvedores de dApps e carteiras inovem as experiências do usuário

Atualmente, esses benefícios não têm suporte nativo porque apenas contas de propriedade externa ([EOAs](/glossary/#eoa)) podem iniciar transações. As EOAs são simplesmente pares de chaves públicas-privadas. Elas funcionam assim:

- se você tiver a chave privada, poderá fazer _qualquer coisa_ dentro das regras da Máquina Virtual Ethereum (EVM)
- se você não tiver a chave privada, não poderá fazer _nada_.

Se você perder as suas chaves, elas não poderão ser recuperadas, e as chaves roubadas dão aos ladrões acesso imediato a todos os fundos de uma conta.

As carteiras de contrato inteligente são a solução para esses problemas, mas hoje são difíceis de programar porque, no final, qualquer lógica que implementem precisa ser traduzida em um conjunto de transações de EOA antes que possam ser processadas pelo Ethereum. A abstração de conta permite que contratos inteligentes iniciem as próprias transações. Dessa forma, qualquer lógica que o usuário queira implementar poderá ser codificada na própria carteira de contrato inteligente e executada no Ethereum.

Na realidade, é a abstração de contas que melhora o suporte a carteiras de contratos inteligentes, tornando-as mais fáceis de criar e mais seguras de usar. Com a abstração de contas, os usuários podem aproveitar todos os benefícios do Ethereum sem precisar entender os detalhes técnicos por trás da tecnologia.

## Além das frases semente {#beyond-seed-phrases}

As contas de hoje são protegidas por meio de chaves privadas que são calculadas a partir de frases sementes. Qualquer um que tenha acesso à frase-semente pode facilmente descobrir a chave private que está protegendo uma conta e ter acesso a todos os ativos que estavam protegidos. Caso a chave privada e a frase-semente sejam perdidas, não será possível acessar os ativos novamente. Proteger essas frases-semente é complicado, até mesmo para os usuários mais avançados, e o phising de frases-semente é um dos golpes mais comuns.

A abstração de contas resolve isso usando smart contract para manter ativas e autorizar transações. Smart contracts podem incluir lógica customizada adaptada para máxima segurança e usabilidade. Usuários ainda utilizam chaves privadas para controlar o acesso, mas como medidas que aumentam a segurança.

Por exemplo, chaves de backup podem ser adicionadas à carteira, permitindo a substituição da chave principal caso ela seja comprometida. Cada chave pode ser protegida diferentemente ou distribuída entre indivíduos de confiança, aumentando significativamente a segurança. Regras adicionais à carteira podem mitigar o dano por exposição da chave, tanto por requerer múltiplas verificações para transações de alto valor ou restringir transações para endereços confiáveis.

## Melhor experiência do usuário {#better-user-experience}

Abstração de contas melhora consideravelmente a experiência do usuário e a sua segurança por oferecer suporte às carteiras smart contract no nível de protocolos. Desenvolvedores podem inovar livremente, melhorando o lote de transações por velocidade e eficiência. Simples trocar por se tornar operações de um clique, melhorando significativamente a facilidade do uso.

O controle de gas melhora consideravelmente. As aplicações podem pagar as taxas de gas dos usuários ou permitir o pagamento em tokens diferentes de ETH, eliminando a necessidade de manter um saldo em ETH.

## Como a abstração da conta será implementada? {#how-will-aa-be-implemented}

Atualmente, implementar carteiras de smart contract é um desafio, já que elas exigem códigos complexos para envolver e gerenciar as transações padrão. Ethereum pode mudar isso permitindo que smart contracts inciem transações diretamente, integrando a lógica nos smart contracts do Ethereum, sem depender de intermediários externos.

### EIP-4337: Abstração de conta sem mudanças de protocolo

EIP-4337 permite suporte nativo a carteiras de smart contract sem modificar o protocolo central do Ethereum. Ele introduz objetos `UserOperation` coletados em pacotes de transação por validadores, simplificando o desenvolvimento de carteiras. O contrato EntryPoint do EIP-4337 foi implantado na Ethereum Mainnet em 1º de março de 2023 e já possibilitou a criação de mais de 26 milhões de carteiras inteligentes e 170 milhões de UserOperations.

## Progresso atual {#current-progress}

Como para do Ethereum Pectra upgrade, EIP-7702 está agendando para 7 de maio, 2025. O EIP-4337 foi amplamente adotado, [com mais de 26 milhões de contas inteligentes implantadas e mais de 170 milhões de UserOperations processadas](https://www.bundlebear.com/erc4337-overview/all).

## Leitura adicional {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [Documentação do EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Documentação do EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Painel de adoção do ERC-4337](https://www.bundlebear.com/erc4337-overview/all)
- [O "Caminho para a Abstração de Contas" de Vitalik](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Blog do Vitalik sobre carteiras de recuperação social](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)
