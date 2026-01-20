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

Parte da [criptografia](/glossary/#cryptography) que protege o Ethereum atualmente será comprometida quando a computação quântica se tornar uma realidade. Embora os computadores quânticos estejam provavelmente a décadas de se tornarem uma ameaça genuína à criptografia moderna, o Ethereum tem sido desenvolvido para ser seguro nos próximos séculos. Isso significa tornar o [Ethereum resistente à computação quântica](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) o mais rápido possível.

O desafio enfrentado pelos desenvolvedores do Ethereum é que o protocolo atual de [prova de participação](/glossary/#pos) depende de um esquema de assinatura muito eficiente, conhecido como BLS, para agregar votos em [blocos](/glossary/#block) válidos. Esse esquema de assinatura é quebrado por computadores quânticos, mas as alternativas quânticas resistentes não são tão eficientes.

Os esquemas de compromisso [“KZG”](/roadmap/danksharding/#what-is-kzg) utilizados em diversos lugares no Ethereum para gerar segredos criptográficos são conhecidos por serem vulneráveis à computação quântica. Atualmente, isso é contornado usando “configurações confiáveis” (cuja cerimônia de configuração principal foi concluída com sucesso em 2023), onde muitos usuários geraram aleatoriedade que não pode ser revertida por um computador quântico. Entretanto, a solução ideal a longo prazo seria incorporar criptografia quântica segura. Existem duas abordagens principais que podem se tornar substitutos eficientes para o esquema BLS: assinaturas [baseadas em STARK](https://hackmd.io/@vbuterin/stark_aggregation) e [baseadas em lattice](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175). **Eles ainda estão sendo ativamente pesquisados ​​e prototipados**.

[Leia sobre KZG e configurações confiáveis](/roadmap/danksharding#what-is-kzg)

## Um Ethereum mais simples e eficiente {#simpler-more-efficient-ethereum}

A complexidade cria oportunidades para bugs ou vulnerabilidades que podem ser exploradas por invasores. Portanto, parte do roadmap é simplificar o Ethereum e remover ou modificar o código que ficou para trás em várias atualizações, mas que não é mais necessário ou agora pode ser melhorado. Uma base de código mais enxuta e simples é mais fácil para os desenvolvedores manterem e analisarem.

Para tornar a [Máquina Virtual Ethereum (EVM)](/developers/docs/evm) mais simples e eficiente, melhorias são continuamente pesquisadas e implementadas. Isso envolve abordar componentes legados e introduzir otimizações.

**Mudanças recentes implementadas:**

- **Revisão do cálculo de gás:** a forma como o [gás](/glossary/#gas) é calculado foi significativamente melhorada com o **EIP-1559 (implementado na atualização London, 2021)**, introduzindo uma taxa base e um mecanismo de queima para uma precificação de transação mais previsível.
- **Restrição do `SELFDESTRUCT`:** o opcode `SELFDESTRUCT`, embora raramente usado, apresentava riscos potenciais. Sua funcionalidade foi fortemente **restringida na atualização Dencun (março de 2024) via EIP-6780** para mitigar perigos, especialmente no que diz respeito ao gerenciamento de estado.
- **Tipos de transação modernizados:** novos formatos de transação foram introduzidos (por exemplo, via **EIP-2718** e **EIP-4844** para blobs na atualização Dencun) para oferecer suporte a novos recursos e melhorar a eficiência em relação aos tipos legados.

**Metas atuais e futuras:**

- **Tratamento adicional do `SELFDESTRUCT`:** embora restrito, a **possível remoção completa** do opcode `SELFDESTRUCT` ainda é considerada para atualizações futuras para simplificar ainda mais o estado da EVM. ([Mais contexto sobre os problemas do SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct)).
- **Eliminação gradual de transações legadas:** embora os [clientes Ethereum](/glossary/#consensus-client) ainda suportem tipos de transação mais antigos para compatibilidade com versões anteriores, o objetivo é incentivar a migração para tipos mais novos e **potencialmente descontinuar ou remover totalmente o suporte para os formatos mais antigos** no futuro.
- **Pesquisa contínua de eficiência de gás:** a exploração continua em **refinamentos adicionais para o cálculo de gás**, incluindo potencialmente conceitos como gás multidimensional para refletir melhor o uso de recursos.
- **Operações criptográficas otimizadas:** estão em andamento esforços para trazer métodos mais eficientes para a aritmética que sustenta as operações criptográficas usadas na EVM.

Da mesma forma, há atualizações que podem ser feitas em outras partes dos clientes Ethereum atuais. Um exemplo é que os clientes atuais de execução e consenso usam um tipo diferente de compressão de dados. Será muito mais fácil e intuitivo compartilhar dados entre clientes quando o esquema de compactação for unificado em toda a rede. Esta segue sendo uma área de exploração.

## Progresso atual {#current-progress}

Muitas das atualizações de preparação para o futuro a longo prazo, particularmente a **resistência quântica total para protocolos principais, ainda estão em fase de pesquisa e podem levar vários anos** para serem implementadas.

No entanto, **um progresso significativo já foi feito nos esforços de simplificação.** Por exemplo, alterações importantes como a **restrição do `SELFDESTRUCT` (EIP-6780)** e a introdução de **transações portadoras de blob (EIP-4844)** foram implementadas na **atualização Dencun (março de 2024)**. O trabalho de harmonização dos esquemas de compressão de clientes e outras melhorias de eficiência também continua.

**Leitura Adicional**

- [Gás](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Estruturas de dados](/developers/docs/data-structures-and-encoding)