---
title: Melhoria da experiência do usuário
description: Para a maioria das pessoas, ainda é complicado usar o Ethereum. Para incentivar a adoção em massa, o Ethereum precisa reduzir drasticamente as barreiras de entrada. Os usuários devem obter os benefícios do acesso descentralizado, sem permissão e resistente à censura ao Ethereum, mas isso precisa ser tão simples quanto usar um aplicativo web2 tradicional.
lang: pt-br
image: /images/roadmap/roadmap-ux.png
alt: "Planejamento Ethereum"
template: roadmap
---

**O uso do Ethereum precisa ser simplificado**; desde o gerenciamento de [chaves](/glossary/#key) e [carteiras](/glossary/#wallet) até o início das transações. Para facilitar a adoção em massa, o Ethereum deve aumentar consideravelmente a facilidade de uso, permitindo que os usuários tenham acesso ao Ethereum sem que haja necessidade de permissão e resistência à censura, com a melhor experiência de uso de aplicativos [Web2](/glossary/#web2).

## Além das frases sementes {#no-more-seed-phrases}

As contas Ethereum são protegidas por um par de chaves utilizadas para identificar contas (chave pública) e assinar mensagens (chave privada). Uma chave privada é como uma senha mestra, ela permite acesso completo a uma conta Ethereum. Essa é uma maneira diferente de operar para pessoas que têm mais experiência com bancos e aplicativos Web2 e que gerenciam contas em nome de um usuário. Para que o Ethereum alcance a adoção em massa sem depender de terceiros centralizados, deve haver uma maneira direta e sem atritos para que um usuário assuma a custódia de seus ativos e mantenha o controle dos dados sem precisar compreender criptografia de chave pública-privada e gerenciamento de chaves.

A solução para isso é usar carteiras de [contrato inteligente](/glossary/#smart-contract) para interagir com o Ethereum. As carteiras de contratos inteligentes criam maneiras de proteger as contas em caso de perda ou roubo de chaves oportunidades para uma melhor detecção e defesa contra fraudes e permitem que as carteiras obtenham novas funcionalidades. Embora existam carteiras de contratos inteligentes atualmente, elas são difíceis de desenvolver porque o protocolo Ethereum precisa oferecer um melhor suporte. Esse suporte adicional é conhecido como abstração de conta.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Mais sobre abstração de contas</ButtonLink>

## Nós para todos

Os usuários que executam [nós](/glossary/#node) não precisam confiar em terceiros para o fornecimento de dados, e podem interagir de forma rápida, privada e sem necessidade de permissão com a [blockchain](/glossary/#blockchain) do Ethereum. Entretanto, a execução de um nó atualmente exige conhecimento técnico e espaço considerável em disco, o que significa que muitas pessoas precisam confiar em intermediários.

Há várias melhorias que tornarão a execução dos nós muito mais fácil e sem a necessidade de muitos recursos. A forma como os dados são armazenados será alterada para usar uma estrutura mais eficiente em termos de espaço, conhecida como **Verkle Tree**. Além disso, com [statelessness](/roadmap/statelessness) (sem estado) ou [expiração de dados](/roadmap/statelessness/#data-expiry), os nós do Ethereum não precisarão armazenar uma cópia de todos os dados de estado do Ethereum, o que reduz drasticamente os requisitos de espaço em disco rígido. [Os nós leves](/developers/docs/nodes-and-clients/light-clients/) oferecerão muitos benefícios da execução de um nó completo, mas podem ser executados facilmente em celulares ou em aplicativos simples de navegador.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Leia sobre Verkle Trees</ButtonLink>

Com essas melhorias, as barreiras à execução de um nó são erradicadas de maneira eficaz. Os usuários se beneficiarão do acesso seguro e sem permissão ao Ethereum sem precisar sacrificar espaço perceptível em disco ou CPU no computador ou celular e, ao usarem aplicativos, não precisarão depender de terceiros para obter acesso a dados ou à rede.

## Progresso atual {#current-progress}

As carteiras de contratos inteligentes já estão disponíveis, mas são necessárias mais melhorias para torná-las o mais descentralizadas e sem permissão possível. A EIP-4337 é uma proposta desenvolvida, que não exige alteração no protocolo do Ethereum. O principal contrato inteligente necessário para o EIP-4337 foi **implantado em março de 2023**.

**O princípio de não verificação de estado ainda está em fase de pesquisa** e é provável que ainda faltem vários anos para ser implementado. Há vários marcos no caminho para uma condição total sem estado, incluindo a expiração de dados, que podem ser implementados mais cedo. Outros itens do planejamento, como [Verkle Trees](/roadmap/verkle-trees/) e a [separação entre proponente e construtor](/roadmap/pbs/), precisam ser concluídas primeiro.

As redes de testes de Verkle Trees já estão em funcionamento, e a próxima fase é a execução de clientes habilitados para Verkle Trees em redes de testes privadas e, em seguida, públicas. Você pode ajudar a acelerar o progresso por meio da implantação de contratos nas redes de testes ou da execução de clientes de rede de testes.
