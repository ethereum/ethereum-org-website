---
title: "Entendendo os mecanismos de consenso da blockchain"
description: "Uma explicação cobrindo os principais mecanismos de consenso usados em blockchains, e como eles permitem que redes descentralizadas concordem sobre o estado das transações sem uma autoridade central."
lang: pt-br
youtubeId: "ojxfbN78WFQ"
uploadDate: 2018-11-29
duration: "0:09:33"
educationLevel: beginner
topic:
  - "consenso"
  - "blockchain"
format: explainer
author: Tech in Asia
breadcrumb: "Mecanismos de Consenso"
---

Uma explicação da **Tech in Asia** cobrindo os três principais mecanismos de consenso usados em sistemas blockchain, Prova de Trabalho (PoW), Prova de Participação (PoS) e prova de autoridade (PoA), e como eles permitem que redes descentralizadas concordem sobre o estado das transações.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=ojxfbN78WFQ) publicada pela Tech in Asia. Ela foi levemente editada para facilitar a leitura.*

#### O que são mecanismos de consenso? (0:00) {#what-are-consensus-mechanisms-000}

Blockchain — a palavra do momento de 2018. Mas você sabe como um sistema descentralizado ponto a ponto sem uma figura de autoridade toma decisões? A resposta está nos mecanismos de consenso. Existem vários mecanismos de consenso, mas todos servem ao mesmo propósito: garantir que os registros sejam verdadeiros e honestos. A diferença é a maneira como o consenso é alcançado. Aqui exploraremos três tipos de mecanismos de consenso.

#### Prova de Trabalho (PoW) (0:23) {#proof-of-work-023}

Em um sistema de Prova de Trabalho (PoW), os dados da transação são armazenados em blocos, validados por pessoas que resolvem um problema matemático complicado anexado a ele. Isso geralmente é feito por computadores potentes e é conhecido como "mineração". Uma recompensa na forma de uma criptomoeda é emitida para o primeiro minerador que resolver o problema.

Imagine um grupo de caçadores de tesouros tentando abrir um baú com uma fechadura complicada anexada a ele. Descobrir a combinação correta é entediante, mas a primeira pessoa a fazer isso é recompensada. De forma simples, a Prova de Trabalho (PoW) é uma corrida para descobrir a combinação certa em um baú de tesouro. Criptomoedas como Bitcoin e Ethereum usam um mecanismo de Prova de Trabalho (PoW).

#### Prova de Participação (PoS) (1:04) {#proof-of-stake-104}

Em seguida, temos a Prova de Participação (PoS). Aqui, o criador de um novo bloco, também conhecido como validador, é escolhido aleatoriamente com base em quanto stake ele compromete com a rede. Quanto maior o stake colocado, maior a chance de ser selecionado como um validador.

Vamos aplicar isso ao cenário do baú do tesouro. Imagine um grupo de caçadores de tesouros disputando um baú. O baú é recompensado com base em um sistema de loteria. Para participar, cada caçador tem que comprar bilhetes de loteria. Quanto mais cada caçador compra, maior a chance de ganhar. Protocolos de blockchain como o Ouroboros da Cardano e a EOS adotam o consenso de Prova de Participação (PoS).

#### Prova de autoridade (PoA) (1:42) {#proof-of-authority-142}

Por fim, a prova de autoridade (PoA) — uma forma modificada de Prova de Participação (PoS). Aqui, apenas partes aprovadas selecionadas com base em sua reputação podem se tornar validadores.

Vamos revisitar o cenário do baú do tesouro. O grupo de caçadores de tesouros forma um sindicato e junta seus tesouros. Com base em seu nível de confiabilidade, alguns poucos selecionados são nomeados pelo grupo para garantir a validade do conteúdo do baú. O Hyperledger Fabric da IBM e a rede de teste Kovan da Ethereum são alguns exemplos de sistemas blockchain que usam a prova de autoridade (PoA).

#### Modelos de consenso híbridos (2:14) {#hybrid-consensus-models-214}

Enquanto as empresas tradicionais de blockchain existem em um único mecanismo de consenso, algumas inovadoras estão adotando múltiplos protocolos de consenso. Veja a Opet Foundation, por exemplo, que está construindo uma blockchain única para armazenar dados coletados em seu aplicativo de chatbot de acompanhamento escolar aplicando tanto os protocolos de prova de autoridade (PoA) quanto os de Prova de Trabalho (PoW).

Dados como registros acadêmicos, extracurriculares e de perfil de personalidade dos alunos são armazenados na blockchain e potencialmente validados por meio de uma estrutura de prova de autoridade (PoA) alimentada pelo Hyperledger Fabric. Os validadores, neste caso, são instituições educacionais respeitáveis ou até mesmo registradores nacionais e respectivos ministérios da educação. Isso ajuda a garantir que todos os dados dos alunos sejam confiáveis.

Mas quem trabalhará de graça? O consenso de Prova de Trabalho (PoW) entra em jogo para recompensar os validadores que realizaram o trabalho.

#### Privacidade e dados dos alunos (3:02) {#privacy-and-student-data-302}

Com o Hyperledger Fabric, cada registro de aluno é protegido com uma chave hash privada de propriedade do aluno. Os dados só podem ser acessados quando o aluno fornece a chave única. Isso significa que a privacidade do aluno é preservada e controlada pelo próprio aluno.

Por exemplo, quando os alunos se inscrevem na universidade por meio da plataforma da Opet, eles fornecem a chave única de seus registros para a universidade. Com isso, a universidade consegue acessar seus registros acadêmicos mais recentes. Os alunos também poderão ver se seus registros foram desbloqueados ou pelo menos considerados para a inscrição. Isso aumenta a eficiência e a transparência em comparação com os métodos tradicionais.

#### Encerramento (3:37) {#closing-337}

Ao unir os modelos de Prova de Trabalho (PoW) e prova de autoridade (PoA), a solução de blockchain da Opet Foundation garante a privacidade dos dados dos alunos enquanto incentiva tanto as instituições educacionais quanto os alunos quando eles contribuem para a plataforma. Com as blockchains ganhando popularidade, é apenas uma questão de tempo até vermos sistemas híbridos ainda mais únicos sendo criados.