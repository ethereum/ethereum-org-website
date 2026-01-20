---
title: Nomeando contratos inteligentes
description: Melhores práticas para nomear contratos inteligentes do Ethereum com ENS
lang: pt-br
---

Os contratos inteligentes são uma pedra angular da infraestrutura descentralizada do Ethereum, permitindo aplicações e protocolos autônomos. Mas, mesmo com a evolução das capacidades dos contratos, usuários e desenvolvedores ainda dependem de endereços hexadecimais brutos para identificar e referenciar esses contratos.

Nomear contratos inteligentes com o [Ethereum Name Service (ENS)](https://ens.domains/) melhora a experiência do usuário, eliminando os endereços de contrato hexadecimais e reduz o risco de ataques como envenenamento de endereços e ataques de spoofing. Este guia explica por que a nomeação de contratos inteligentes é importante, como ela pode ser implementada e as ferramentas disponíveis, como o [Enscribe](https://www.enscribe.xyz), para simplificar o processo e ajudar os desenvolvedores a adotar essa prática.

## Por que nomear contratos inteligentes? {#why-name-contracts}

### Identificadores legíveis por humanos {#human-readable-identifiers}

Em vez de interagir com endereços de contrato opacos como `0x8f8e...f9e3`, os desenvolvedores e usuários podem usar nomes legíveis por humanos como `v2.myapp.eth`. Isso simplifica as interações de contratos inteligentes.

Isso é possível graças ao [Ethereum Name Service](https://ens.domains/), que fornece um serviço de nomeação descentralizado para endereços Ethereum. Isso é análogo a como o Serviço de Nomes de Domínio (DNS) permite que os usuários da internet acessem endereços de rede usando um nome como ethereum.org em vez de um endereço IP como `104.18.176.152`.

### Segurança e confiança aprimoradas {#improved-security-and-trust}

Contratos nomeados ajudam a reduzir transações acidentais para o endereço errado. Eles também ajudam os usuários a identificar contratos vinculados a aplicativos ou marcas específicas. Isso adiciona uma camada de confiança reputacional, especialmente quando os nomes estão vinculados a domínios pais bem conhecidos como `uniswap.eth`.

Devido ao comprimento de 42 caracteres de um endereço Ethereum, é muito difícil para os usuários identificarem pequenas alterações nos endereços, onde alguns caracteres foram modificados. Por exemplo, um endereço como `0x58068646C148E313CB414E85d2Fe89dDc3426870` normalmente seria truncado para `0x580...870` por aplicativos voltados para o usuário, como carteiras. É improvável que um usuário perceba um endereço malicioso onde alguns caracteres foram alterados.

Esse tipo de técnica é empregado em ataques de falsificação e envenenamento de endereço, nos quais os usuários são levados a acreditar que estão interagindo ou enviando fundos para o endereço correto, quando, na verdade, o endereço apenas se assemelha ao endereço correto, mas não é o mesmo.

Nomes ENS para carteiras e contratos protegem contra esses tipos de ataques. Assim como os ataques de spoofing de DNS, os ataques de spoofing de ENS também podem ocorrer, no entanto, um usuário tem maior probabilidade de notar um erro de digitação em um nome ENS do que uma pequena modificação em um endereço hexadecimal.

### Melhor UX para carteiras e exploradores {#better-ux}

Quando um contrato inteligente foi configurado com um nome ENS, é possível para aplicativos como carteiras e exploradores de blockchain exibir nomes ENS para contratos inteligentes, em vez de endereços hexadecimais. Isso proporciona uma melhoria significativa na experiência do usuário (UX) para os usuários.

Por exemplo, ao interagir com um aplicativo como o Uniswap, os usuários normalmente verão que o aplicativo com o qual estão interagindo está hospedado no site `uniswap.org`, mas um endereço de contrato hexadecimal seria apresentado se o Uniswap não nomeasse seus contratos inteligentes com ENS. Se o contrato for nomeado, em vez disso, eles poderiam ver `v4.contracts.uniswap.eth`, o que é muito mais útil.

## Nomeação na implantação vs. pós-implantação {#when-to-name}

Há dois momentos em que os contratos inteligentes podem ser nomeados:

- **No momento da implantação**: atribuir um nome ENS ao contrato no momento em que ele é implantado.
- **Após a implantação**: mapear um endereço de contrato existente para um novo nome ENS.

Ambas as abordagens dependem de ter acesso de proprietário ou gerente a um domínio ENS para que possam criar e definir registros ENS.

## Como funciona a nomeação de contratos com ENS {#how-ens-naming-works}

Os nomes ENS são armazenados na cadeia e resolvidos para endereços Ethereum através de resolvedores ENS. Para nomear um contrato inteligente:

1. Registre ou controle um domínio pai ENS (p. ex., `myapp.eth`)
2. Crie um subdomínio (p. ex., `v1.myapp.eth`)
3. Defina o registro de `endereço` do subdomínio para o endereço do contrato
4. Defina o registro reverso do contrato para o ENS para permitir que o nome seja encontrado por meio de seu endereço

Os nomes ENS são hierárquicos e suportam um número ilimitado de subnomes. A definição desses registros normalmente envolve a interação com o registro ENS e os contratos do resolvedor público.

## Ferramentas para nomear contratos {#tools}

Existem duas abordagens para nomear contratos inteligentes. Seja usando o [App ENS](https://app.ens.domains) com alguns passos manuais, ou usando o [Enscribe](https://www.enscribe.xyz). Eles são descritos abaixo.

### Configuração manual do ENS {#manual-ens-setup}

Usando o [App ENS](https://app.ens.domains/), os desenvolvedores podem criar subnomes manualmente e definir registros de endereço de encaminhamento. No entanto, eles não podem definir um nome primário para um contrato inteligente, definindo o registro reverso para o nome através do aplicativo ENS. Devem ser tomadas medidas manuais, que são abordadas nos [documentos do ENS](https://docs.ens.domains/web/naming-contracts/).

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) simplifica a nomeação de contratos inteligentes com o ENS e aumenta a confiança do usuário em contratos inteligentes. Ele fornece:

- **Implantação e nomeação atômicas**: atribua um nome ENS ao implantar um novo contrato
- **Nomeação pós-implantação**: anexe nomes a contratos já implantados
- **Suporte multichain**: funciona em redes Ethereum e L2 onde o ENS é suportado
- **Dados de verificação de contrato**: inclui dados de verificação de contrato obtidos de várias fontes para aumentar a confiança dos usuários

O Enscribe suporta nomes ENS fornecidos pelos usuários ou seus próprios domínios se o usuário não tiver um nome ENS.

Você pode acessar o [Enscribe App](https://app.enscribe.xyz) para começar a nomear e visualizar contratos inteligentes.

## Boas práticas {#best-practices}

- **Use nomes claros e com versão**, como `v1.myapp.eth`, para tornar as atualizações do contrato transparentes
- **Defina registros reversos** para vincular contratos a nomes ENS para visibilidade em aplicativos como carteiras e exploradores da blockchain.
- **Monitore os vencimentos de perto** se quiser evitar alterações acidentais de propriedade
- **Verifique a fonte do contrato** para que os usuários possam confiar que o contrato nomeado se comporta como esperado

## Riscos {#risks}

A nomeação de contratos inteligentes oferece benefícios significativos para os usuários do Ethereum, no entanto, os proprietários de domínios ENS devem ser vigilantes em relação à sua gestão. Riscos notáveis incluem:

- **Vencimento**: assim como os nomes de DNS, os registros de nomes de ENS têm duração finita. Portanto, é vital que os proprietários monitorem as datas de validade de seus domínios e os renovem com bastante antecedência do vencimento. Tanto o App ENS quanto o Enscribe fornecem indicadores visuais para os proprietários de domínio quando o vencimento está se aproximando.
- **Mudança de propriedade**: os registros ENS são representados como TNFs na Ethereum, onde o proprietário de um domínio `.eth` específico tem o TNF associado em sua posse. Portanto, se uma conta diferente assumir a propriedade deste TNF, o novo proprietário poderá modificar quaisquer registros ENS como achar melhor.

Para mitigar esses riscos, a conta do proprietário dos domínios de segundo nível (2LD) `.eth` deve ser protegida por meio de uma carteira de assinaturas múltiplas, com subdomínios sendo criados para gerenciar a nomenclatura de contratos. Dessa forma, no caso de quaisquer alterações acidentais ou maliciosas na propriedade no nível do subdomínio, elas podem ser substituídas pelo proprietário do 2LD.

## O futuro da nomeação de contratos {#future}

A nomeação de contratos está se tornando uma melhor prática para o desenvolvimento de dapps, semelhante a como os nomes de domínio substituíram os endereços IP na web. À medida que mais infraestrutura, como carteiras, exploradores e painéis, integram a resolução ENS para contratos, os contratos nomeados melhorarão a segurança e reduzirão os erros em todo o ecossistema.

Ao tornar os contratos inteligentes mais fáceis de reconhecer e de se raciocinar sobre, a nomeação ajuda a preencher a lacuna entre os usuários e os aplicativos na Ethereum, melhorando a segurança e a experiência do usuário (UX).

## Leitura adicional {#further-reading}

- [Nomeando Contratos Inteligentes com ENS](https://docs.ens.domains/web/naming-contracts/)
- [Nomeando Contratos Inteligentes com Enscribe](https://www.enscribe.xyz/docs).
