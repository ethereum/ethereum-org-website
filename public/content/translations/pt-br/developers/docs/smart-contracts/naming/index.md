---
title: Nomeando contratos inteligentes
description: "Melhores práticas para nomear contratos inteligentes do Ethereum com o ENS"
lang: pt-br
---

Os contratos inteligentes são um pilar da infraestrutura descentralizada do Ethereum, permitindo aplicativos e protocolos autônomos. Mas, mesmo com a evolução das capacidades dos contratos, usuários e desenvolvedores ainda dependem de endereços hexadecimais brutos para identificar e referenciar esses contratos.

Nomear contratos inteligentes com o [Ethereum Name Service (ENS)](https://ens.domains/) melhora a experiência do usuário ao eliminar endereços de contratos hexadecimais e reduz o risco de ataques, como envenenamento de endereço (address poisoning) e ataques de falsificação (spoofing). Este guia explica por que nomear contratos inteligentes é importante, como isso pode ser implementado e as ferramentas disponíveis, como o [Enscribe](https://www.enscribe.xyz), para simplificar o processo e ajudar os desenvolvedores a adotarem a prática.

## Por que nomear contratos inteligentes? {#why-name-contracts}

### Identificadores legíveis por humanos {#human-readable-identifiers}

Em vez de interagir com endereços de contratos opacos como `0x8f8e...f9e3`, desenvolvedores e usuários podem usar nomes legíveis por humanos como `v2.myapp.eth`. Isso simplifica as interações com contratos inteligentes.

Isso é possível graças ao [Ethereum Name Service](https://ens.domains/), que fornece um serviço de nomenclatura descentralizado para endereços do Ethereum. Isso é análogo à forma como o Domain Name Service (DNS) permite que os usuários da internet acessem endereços de rede usando um nome como ethereum.org em vez de um endereço IP como `104.18.176.152`.

### Segurança e confiança aprimoradas {#improved-security-and-trust}

Contratos nomeados ajudam a reduzir transações acidentais para o endereço errado. Eles também ajudam os usuários a identificar contratos vinculados a aplicativos ou marcas específicas. Isso adiciona uma camada de confiança reputacional, especialmente quando os nomes estão anexados a domínios pai conhecidos como `uniswap.eth`.

Devido ao comprimento de 42 caracteres do endereço do Ethereum, é muito difícil para os usuários identificarem pequenas alterações nos endereços, onde alguns caracteres foram modificados. Por exemplo, um endereço como `0x58068646C148E313CB414E85d2Fe89dDc3426870` normalmente seria truncado para `0x580...870` por aplicativos voltados para o usuário, como carteiras. É improvável que um usuário perceba um endereço malicioso onde alguns caracteres foram alterados.

Esse tipo de técnica é empregado por ataques de falsificação e envenenamento de endereço, onde os usuários são levados a acreditar que estão interagindo ou enviando fundos para o endereço correto, quando, na verdade, o endereço simplesmente se assemelha ao endereço correto, mas não é o mesmo.

Nomes ENS para carteiras e contratos protegem contra esses tipos de ataques. Assim como os ataques de falsificação de DNS, os ataques de falsificação de ENS também podem ser realizados; no entanto, é mais provável que um usuário perceba um erro de ortografia em um nome ENS do que uma pequena modificação em um endereço hexadecimal.

### Melhor UX para carteiras e exploradores {#better-ux}

Quando um contrato inteligente foi configurado com um nome ENS, é possível que aplicativos como carteiras e exploradores de blockchain exibam nomes ENS para contratos inteligentes, em vez de endereços hexadecimais. Isso proporciona uma melhoria significativa na experiência do usuário (UX).

Por exemplo, ao interagir com um aplicativo como o Uniswap, os usuários normalmente verão que o aplicativo com o qual estão interagindo está hospedado no site `uniswap.org`, mas eles seriam apresentados a um endereço de contrato hexadecimal se o Uniswap não tivesse nomeado seus contratos inteligentes com o ENS. Se o contrato for nomeado, em vez disso, eles poderiam ver `v4.contracts.uniswap.eth`, o que é muito mais útil.

## Nomeação na implantação vs. pós-implantação {#when-to-name}

Existem dois momentos em que os contratos inteligentes podem ser nomeados:

- **No momento da implantação**: atribuindo um nome ENS ao contrato à medida que ele é implantado.
- **Após a implantação**: mapeando um endereço de contrato existente para um novo nome ENS.

Ambas as abordagens dependem de ter acesso de proprietário ou gerente a um domínio ENS para que possam criar e definir registros ENS.

## Como a nomeação ENS funciona para contratos {#how-ens-naming-works}

Os nomes ENS são armazenados onchain e são resolvidos para endereços do Ethereum por meio de resolvedores ENS. Para nomear um contrato inteligente:

1. Registre ou controle um domínio ENS pai (por exemplo, `myapp.eth`)
2. Crie um subdomínio (por exemplo, `v1.myapp.eth`)
3. Defina o registro `address` do subdomínio para o endereço do contrato
4. Defina o registro reverso do contrato para o ENS para permitir que o nome seja encontrado por meio de seu endereço

Os nomes ENS são hierárquicos e suportam subnomes ilimitados. A definição desses registros normalmente envolve a interação com o registro ENS e os contratos de resolvedores públicos.

## Ferramentas para nomear contratos {#tools}

Existem duas abordagens para nomear contratos inteligentes. Usando o [Aplicativo ENS](https://app.ens.domains) com algumas etapas manuais, ou usando o [Enscribe](https://www.enscribe.xyz). Elas são descritas abaixo.

### Configuração manual do ENS {#manual-ens-setup}

Usando o [Aplicativo ENS](https://app.ens.domains/), os desenvolvedores podem criar subnomes manualmente e definir registros de endereço de encaminhamento. No entanto, eles não podem definir um nome principal para um contrato inteligente definindo o registro reverso para o nome por meio do aplicativo ENS. Devem ser tomadas medidas manuais que são abordadas na [documentação do ENS](https://docs.ens.domains/web/naming-contracts/).

### Enscribe {#enscribe}

O [Enscribe](https://www.enscribe.xyz) simplifica a nomeação de contratos inteligentes com o ENS e aumenta a confiança do usuário nos contratos inteligentes. Ele fornece:

- **Implantação e nomeação atômicas**: Atribua um nome ENS ao implantar um novo contrato
- **Nomeação pós-implantação**: Anexe nomes a contratos já implantados
- **Suporte a várias cadeias**: Funciona no Ethereum e em redes de camada 2 (l2) onde o ENS é suportado
- **Dados de verificação de contrato**: Inclui dados de verificação de contrato extraídos de várias fontes para aumentar a confiança dos usuários

O Enscribe suporta nomes ENS fornecidos pelos usuários ou seus próprios domínios se o usuário não tiver um nome ENS.

Você pode acessar o [Aplicativo Enscribe](https://app.enscribe.xyz) para começar a nomear e visualizar contratos inteligentes.

## Melhores práticas {#best-practices}

- **Use nomes claros e versionados** como `v1.myapp.eth` para tornar as atualizações de contrato transparentes
- **Defina registros reversos** para vincular contratos a nomes ENS para visibilidade em aplicativos como carteiras e exploradores de blockchain.
- **Monitore os vencimentos de perto** se quiser evitar mudanças acidentais de propriedade
- **Verifique a fonte do contrato** para que os usuários possam confiar que o contrato nomeado se comporta conforme o esperado

## Riscos {#risks}

Nomear contratos inteligentes oferece benefícios significativos para os usuários do Ethereum; no entanto, os proprietários de domínios ENS devem estar vigilantes em relação ao seu gerenciamento. Os riscos notáveis incluem:

- **Vencimento**: Assim como os nomes DNS, os registros de nomes ENS têm duração finita. Portanto, é vital que os proprietários monitorem as datas de vencimento de seus domínios e os renovem bem antes do vencimento. Tanto o Aplicativo ENS quanto o Enscribe fornecem indicadores visuais para os proprietários de domínios quando o vencimento está se aproximando.
- **Mudança de propriedade**: Os registros ENS são representados como NFTs no Ethereum, onde o proprietário de um domínio `.eth` específico tem o NFT associado em sua posse. Portanto, caso uma conta diferente assuma a propriedade deste NFT, o novo proprietário poderá modificar quaisquer registros ENS como achar melhor.

Para mitigar esses riscos, a conta do proprietário dos domínios de 2º nível (2LD) `.eth` deve ser protegida por meio de uma carteira com múltiplas assinaturas (multi-sig), com subdomínios sendo criados para gerenciar a nomeação de contratos. Dessa forma, no caso de quaisquer alterações acidentais ou maliciosas de propriedade no nível do subdomínio, elas podem ser substituídas pelo proprietário do 2LD.

## O futuro da nomeação de contratos {#future}

A nomeação de contratos está se tornando uma melhor prática para o desenvolvimento de aplicativos descentralizados (dapps), semelhante à forma como os nomes de domínio substituíram os endereços IP na web. À medida que mais infraestruturas, como carteiras, exploradores e painéis, integram a resolução ENS para contratos, os contratos nomeados melhorarão a segurança e reduzirão os erros em todo o ecossistema.

Ao tornar os contratos inteligentes mais fáceis de reconhecer e entender, a nomeação ajuda a preencher a lacuna entre usuários e aplicativos no Ethereum, melhorando tanto a segurança quanto a UX para os usuários.

## Leitura adicional {#further-reading}

- [Nomeando contratos inteligentes com o ENS](https://docs.ens.domains/web/naming-contracts/)
- [Nomeando contratos inteligentes com o Enscribe](https://www.enscribe.xyz/docs).