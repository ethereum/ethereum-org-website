---
title: Abstração de conta
description: Uma visão geral dos planos do Ethereum para tornar as contas de usuário mais simples e seguras
lang: pt-br
summaryPoints:
  - A abstração de conta torna muito mais fácil construir carteiras de contrato inteligente
  - As carteiras de contrato inteligente tornam muito mais fácil gerenciar o acesso às contas do Ethereum
  - Chaves perdidas e expostas podem ser recuperadas usando múltiplos backups
---

A maioria dos usuários existentes interage com o [Ethereum](/) usando **[contas de propriedade externa (EOAs)](/glossary/#eoa)**. Isso limita como os usuários podem interagir com o Ethereum. Por exemplo, torna difícil fazer lotes de transações e exige que os usuários sempre mantenham um saldo de ETH para pagar as taxas de transação.

A abstração de conta é uma maneira de resolver esses problemas, permitindo que os usuários programem de forma flexível mais segurança e melhores experiências de usuário em suas contas. Isso pode acontecer [atualizando as EOAs](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) para que possam ser controladas por contratos inteligentes. Há também outro caminho que envolve adicionar um [segundo sistema de transação separado](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) para rodar em paralelo ao protocolo existente. Independentemente da rota, o resultado é o acesso ao Ethereum por meio de carteiras de contrato inteligente, seja com suporte nativo como parte do protocolo existente ou por meio de uma rede de transação complementar.

As carteiras de contrato inteligente desbloqueiam muitos benefícios para o usuário, incluindo:

- definir suas próprias regras de segurança flexíveis
- recuperar sua conta se você perder as chaves
- compartilhar a segurança da sua conta entre dispositivos ou indivíduos confiáveis
- pagar o gás de outra pessoa, ou fazer com que outra pessoa pague o seu
- agrupar transações em lotes (por exemplo, aprovar e executar uma troca de uma só vez)
- mais oportunidades para desenvolvedores de aplicativos descentralizados (dapps) e carteiras inovarem nas experiências do usuário

Esses benefícios não são suportados nativamente hoje porque apenas contas de propriedade externa ([EOAs](/glossary/#eoa)) podem iniciar transações. As EOAs são simplesmente pares de chaves públicas e privadas. Elas funcionam assim:

- se você tiver a chave privada, poderá fazer _qualquer coisa_ dentro das regras da Máquina Virtual Ethereum (EVM)
- se você não tiver a chave privada, não poderá fazer _nada_.

Se você perder suas chaves, elas não poderão ser recuperadas, e chaves roubadas dão aos ladrões acesso instantâneo a todos os fundos em uma conta.

As carteiras de contrato inteligente são a solução para esses problemas, mas hoje elas são difíceis de programar porque, no final, qualquer lógica que implementem tem que ser traduzida em um conjunto de transações de EOA antes que possam ser processadas pelo Ethereum. A abstração de conta permite que os contratos inteligentes iniciem transações por si mesmos, de modo que qualquer lógica que o usuário deseje implementar possa ser codificada na própria carteira de contrato inteligente e executada no Ethereum.

Em última análise, a abstração de conta melhora o suporte para carteiras de contrato inteligente, tornando-as mais fáceis de construir e mais seguras de usar. Com a abstração de conta, os usuários podem aproveitar todos os benefícios do Ethereum sem precisar entender a tecnologia subjacente.

## Além das frases semente {#beyond-seed-phrases}

As contas de hoje são protegidas usando chaves privadas que são calculadas a partir de frases semente. Qualquer pessoa com acesso a uma frase semente pode facilmente descobrir a chave privada que protege uma conta e obter acesso a todos os ativos que ela protege. Se uma chave privada e uma frase semente forem perdidas, os ativos ficarão permanentemente inacessíveis. Proteger essas frases semente é complicado, mesmo para usuários experientes, e o phishing de frase semente é um dos golpes mais comuns.

A abstração de conta resolve isso usando um contrato inteligente para manter ativos e autorizar transações. Os contratos inteligentes podem incluir lógica personalizada adaptada para máxima segurança e usabilidade. Os usuários ainda usam chaves privadas para controlar o acesso, mas com medidas de segurança aprimoradas.

Por exemplo, chaves de backup podem ser adicionadas a uma carteira, permitindo a substituição da chave se a chave primária for comprometida. Cada chave pode ser protegida de forma diferente ou distribuída entre indivíduos confiáveis, aumentando significativamente a segurança. Regras adicionais da carteira podem mitigar os danos causados pela exposição da chave, como exigir múltiplas assinaturas para transações de alto valor ou restringir transações a endereços confiáveis.

## Melhor experiência do usuário {#better-user-experience}

A abstração de conta melhora muito a experiência do usuário e a segurança ao suportar carteiras de contrato inteligente no nível do protocolo. Os desenvolvedores podem inovar livremente, melhorando o agrupamento de transações para velocidade e eficiência. Trocas simples podem se tornar operações de um clique, melhorando significativamente a facilidade de uso.

O gerenciamento de gás melhora consideravelmente. Os aplicativos podem pagar as taxas de gás dos usuários ou permitir o pagamento em tokens diferentes do ETH, eliminando a necessidade de manter um saldo de ETH.

## Como a abstração de conta será implementada? {#how-will-aa-be-implemented}

Atualmente, as carteiras de contrato inteligente são desafiadoras de implementar, pois dependem de códigos complexos envolvendo transações padrão. O Ethereum pode mudar isso permitindo que os contratos inteligentes iniciem transações diretamente, incorporando lógica nos contratos inteligentes do Ethereum em vez de depender de retransmissores externos.

### EIP-4337: Abstração de conta sem mudanças no protocolo {#eip-4337-account-abstraction-without-protocol-changes}

A EIP-4337 permite o suporte nativo a carteiras de contrato inteligente sem modificar o protocolo principal do Ethereum. Ela introduz objetos `UserOperation` coletados em lotes de transações por validadores, simplificando o desenvolvimento de carteiras. O contrato EntryPoint da EIP-4337 foi implantado na Rede Principal do Ethereum em 1º de março de 2023 e facilitou a criação de mais de 26 milhões de carteiras inteligentes e 170 milhões de UserOperations.

## Progresso atual {#current-progress}

Como parte da atualização Pectra do Ethereum, a EIP-7702 está programada para 7 de maio de 2025. A EIP-4337 foi amplamente adotada, [com mais de 26 milhões de contas inteligentes implantadas e mais de 170 milhões de UserOperations processadas](https://www.bundlebear.com/erc4337-overview/all).

## Leitura adicional {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [Documentação da EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Documentação da EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Painel de adoção da ERC-4337](https://www.bundlebear.com/erc4337-overview/all)
- ["O Caminho para a Abstração de Conta" por Vitalik](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Blog do Vitalik sobre carteiras de recuperação social](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)