---
title: Preparação do Ethereum para o futuro
description: Essas melhorias consolidam o Ethereum como a camada de base resiliente e descentralizada para o futuro, seja ele qual for.
lang: pt-br
image: /images/roadmap/roadmap-future.png
alt: "Planejamento Ethereum"
template: roadmap
---

Algumas partes do planejamento não são necessariamente obrigatórias para dimensionar ou proteger o Ethereum no curto prazo, mas preparam o Ethereum para a estabilidade e a confiabilidade no futuro.

## Resistência quântica {#quantum-resistance}

Parte da [criptografia](/glossary/#cryptography) que protege o Ethereum atual será comprometida quando a computação quântica se tornar uma realidade. Embora os computadores quânticos estejam provavelmente a décadas de se tornarem uma ameaça genuína à criptografia moderna, o Ethereum tem sido desenvolvido para ser seguro nos próximos séculos. Isso significa tornar o [Ethereum resistente ao quântico](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) o mais rápido possível.

O desafio enfrentado pelos desenvolvedores Ethereum é que o protocolo atual de [prova de participação](/glossary/#pos) depende de um esquema de assinatura muito eficiente conhecido como BLS para agregar votos em [blocos](/glossary/#block)válidos. Esse esquema de assinatura é quebrado por computadores quânticos, mas as alternativas quânticas resistentes não são tão eficientes.

Os [esquemas de compromisso "KZG"](/roadmap/danksharding/#what-is-kzg) utilizados em diversos lugares no Ethereum para gerar segredos criptográficos são conhecidos por serem vulneráveis ao quântico. Atualmente, isso é contornado por meio da utilização de "configurações confiáveis", em que muitos usuários geram uma aleatoriedade que não pode ser revertida por um computador quântico. Entretanto, a solução ideal seria simplesmente incorporar a criptografia quântica segura. Há duas abordagens principais que poderiam se tornar substitutos eficientes para o esquema BLS: assinatura [com base em STARK](https://hackmd.io/@vbuterin/stark_aggregation) e [em malha](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175). **Essas abordagens ainda estão sendo pesquisadas e desenvolvidas.**.

<ButtonLink variant="outline-color" href="/roadmap/danksharding#what-is-kzg"> Leia sobre o KZG e as configurações confiáveis</ButtonLink>

## Ethereum mais simples e mais eficiente {#simpler-more-efficient-ethereum}

A complexidade cria oportunidades para bugs ou vulnerabilidades que podem ser explorados por invasores. Portanto, parte do planejamento é simplificar o Ethereum e remover códigos que permaneceram ao longo de diversas melhorias, mas que não são mais necessários ou podem ser aprimorados. Os desenvolvedores conseguem manter e aplicar lógica de uma maneira mais fácil com uma base de código mais enxuta e simples.

Diversas atualizações serão feitas na [Máquina Virtual do Ethereum (EVM)](/developers/docs/evm) para torná-la mais simples e eficiente. Isso inclui a [remoção do código de operação SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct), um comando raramente utilizado que não é mais necessário e, em algumas circunstâncias, pode ser perigoso de usar, especialmente quando combinado com outras melhorias futuras do modelo de armazenamento do Ethereum. Os [clientes Ethereum](/glossary/#consensus-client) também ainda suportam alguns tipos de transação antigos que agora podem ser completamente removidos. A maneira como [gás](/glossary/#gas) é calculado também pode ser melhorada e podem ser introduzidos métodos mais eficientes para a aritmética que sustenta algumas operações criptográficas.

Da mesma forma, há atualizações que podem ser feitas em outras partes dos clientes atuais do Ethereum. Um exemplo é que os clientes atuais de execução e consenso utilizam um tipo diferente de compactação de dados. Quando o esquema de compactação for unificado em toda a rede, será muito mais fácil e intuitivo compartilhar dados entre clientes.

## Progresso atual {#current-progress}

A maioria das melhorias necessárias para preparação do Ethereum para o futuro ainda** está em fase de pesquisa em poderá demorar diversos anos** para implementação. Melhorias como a remoção do SELFDESTRUCT e a harmonização do esquema de compactação usado na execução e nos clientes de consenso provavelmente virão antes da criptografia quântica resistente.

**Leitura adicional**

- [Gás](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Estruturas de dados](/developers/docs/data-structures-and-encoding)
