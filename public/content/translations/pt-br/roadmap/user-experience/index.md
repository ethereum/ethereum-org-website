---
title: "Melhorando a experiência do usuário"
description: "Usar o Ethereum ainda é muito complexo para a maioria das pessoas. Para incentivar a adoção em massa, o Ethereum deve reduzir drasticamente suas barreiras de entrada - os usuários devem obter os benefícios do acesso descentralizado, não permissionado e resistente à censura ao Ethereum, mas isso deve ser tão sem atrito quanto usar um aplicativo Web2 tradicional."
lang: pt-br
image: /images/roadmap/roadmap-ux.png
alt: Roteiro do Ethereum
template: roadmap
---

**O uso do Ethereum precisa ser simplificado**; desde o gerenciamento de [chaves](/glossary/#key) e [carteiras](/glossary/#wallet) até a iniciação de transações. Para facilitar a adoção em massa, o Ethereum deve aumentar drasticamente a facilidade de uso, permitindo que os usuários experimentem um acesso não permissionado e resistente à censura ao Ethereum com a experiência sem atrito do uso de aplicativos da [Web2](/glossary/#web2).

## Além das frases semente {#no-more-seed-phrases}

As contas do Ethereum são protegidas por um par de chaves usado para identificar contas (chave pública) e assinar mensagens (chave privada). Uma chave privada é como uma senha mestra; ela permite acesso completo a uma conta do Ethereum. Esta é uma maneira diferente de operar para pessoas mais familiarizadas com bancos e aplicativos da Web2 que gerenciam contas em nome de um usuário. Para que o Ethereum alcance a adoção em massa sem depender de terceiros centralizados, deve haver uma maneira direta e sem atrito para um usuário assumir a custódia de seus ativos e manter o controle de seus dados sem ter que entender a criptografia de chave pública e privada e o gerenciamento de chaves.

A solução para isso é usar carteiras de [contrato inteligente](/glossary/#smart-contract) para interagir com o Ethereum. As carteiras de contrato inteligente criam maneiras de proteger as contas se as chaves forem perdidas ou roubadas, oportunidades para melhor detecção e defesa contra fraudes, e permitem que as carteiras obtenham novas funcionalidades. Embora as carteiras de contrato inteligente existam hoje, elas são difíceis de construir porque o protocolo do Ethereum precisa suportá-las melhor. Esse suporte adicional é conhecido como abstração de conta.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Mais sobre abstração de conta</ButtonLink>

## Nós para todos {#nodes-for-everyone}

Os usuários que executam [nós](/glossary/#node) não precisam confiar em terceiros para fornecer-lhes dados, e eles podem interagir de forma rápida, privada e não permissionada com a [blockchain](/glossary/#blockchain) do Ethereum. No entanto, executar um nó agora requer conhecimento técnico e espaço em disco substancial, o que significa que muitas pessoas devem confiar em intermediários em vez disso.

Existem várias atualizações que tornarão a execução de nós muito mais fácil e com muito menos uso de recursos. A forma como os dados são armazenados será alterada para usar uma estrutura mais eficiente em termos de espaço conhecida como **árvore Verkle**. Além disso, com a [ausência de estado](/roadmap/statelessness) ou a [expiração de dados](/roadmap/statelessness/#data-expiry), os nós do Ethereum não precisarão armazenar uma cópia de todos os dados de estado do Ethereum, reduzindo drasticamente os requisitos de espaço no disco rígido. Os [nós leves](/developers/docs/nodes-and-clients/light-clients/) oferecerão muitos benefícios da execução de um nó completo, mas podem ser executados facilmente em telefones celulares ou dentro de aplicativos de navegador simples.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Leia sobre as árvores Verkle</ButtonLink>

Com essas atualizações, as barreiras para executar um nó são reduzidas a efetivamente zero. Os usuários se beneficiarão do acesso seguro e não permissionado ao Ethereum sem ter que sacrificar espaço em disco ou CPU perceptível em seu computador ou telefone celular, e não terão que depender de terceiros para dados ou acesso à rede quando usarem aplicativos.

## Progresso atual {#current-progress}

As carteiras de contrato inteligente já estão disponíveis, mas mais atualizações são necessárias para torná-las o mais descentralizadas e não permissionadas possível. A EIP-4337 é uma proposta madura que não requer nenhuma alteração no protocolo do Ethereum. O principal contrato inteligente exigido para a EIP-4337 foi **implantado em março de 2023**.

**A ausência de estado total ainda está na fase de pesquisa** e provavelmente levará vários anos para ser implementada. Existem vários marcos no caminho para a ausência de estado total, incluindo a expiração de dados, que podem ser implementados mais cedo. Outros itens do roteiro, como as [árvores Verkle](/roadmap/verkle-trees/) e a [separação propositor-construtor (PBS)](/roadmap/pbs/) precisam ser concluídos primeiro.

As redes de teste de árvores Verkle já estão em funcionamento, e a próxima fase é executar clientes habilitados para árvores Verkle em redes de teste privadas e, em seguida, públicas. Você pode ajudar a acelerar o progresso implantando contratos nas redes de teste ou executando clientes de rede de teste.
