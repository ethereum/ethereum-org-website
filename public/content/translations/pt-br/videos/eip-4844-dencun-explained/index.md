---
title: "Desbloqueando a escalabilidade do Ethereum: EIP-4844 explicado"
description: "A Finematics explica a EIP-4844 (Proto-Danksharding), a principal atualização na bifurcação rígida Dencun que introduz transações de blob para reduzir drasticamente os custos para rollups de camada 2 (l2) no Ethereum."
lang: pt-br
youtubeId: "HT9PHWloIiU"
uploadDate: 2024-03-11
duration: "0:10:56"
educationLevel: intermediate
topic:
  - "como-o-ethereum-funciona"
  - "escalabilidade"
  - "eip-4844"
  - "dencun"
  - "atualizacoes"
format: explainer
author: Finematics
breadcrumb: "EIP-4844 Explicado"
---

Uma explicação da **Finematics** cobrindo a EIP-4844 (Proto-Danksharding), a principal atualização na bifurcação rígida Dencun que introduz transações de blob para reduzir drasticamente os custos para rollups de camada 2 (l2) no Ethereum.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=HT9PHWloIiU) publicada pela Finematics. Ela foi levemente editada para facilitar a leitura.*

#### Introdução (0:00) {#introduction-000}

A escalabilidade do Ethereum tem sido um tópico muito debatido há algum tempo. As soluções de camada 2 (l2) têm estado na vanguarda dessa batalha, oferecendo uma maneira de lidar com transações fora da cadeia principal para aliviar o congestionamento e reduzir as taxas. Mas há um porém — até mesmo as L2s enfrentam limitações que prejudicam sua eficiência e escalabilidade. A EIP-4844 é o próximo passo para aumentar o potencial das L2s e alinhar o Ethereum com seu roteiro de escalabilidade.

Então, do que se trata a EIP-4844? Como exatamente ela ajuda na escalabilidade das L2s? Quais novas possibilidades ela desbloqueia? E é verdade que ela pode reduzir as taxas de transação nas L2s em mais de 90%?

#### O que é a EIP-4844 e o Proto-Danksharding (0:52) {#what-is-eip-4844-and-proto-danksharding-052}

Como lembrete, EIP significa Proposta de Melhoria do Ethereum (Ethereum Improvement Proposal), um processo através do qual os desenvolvedores podem sugerir mudanças no protocolo Ethereum. A EIP-4844, especificamente, propõe um novo tipo de transação que pode melhorar significativamente a forma como os dados são tratados e processados no Ethereum. Você também pode ter ouvido o nome "Proto-Danksharding", que agora é usado de forma intercambiável com a EIP-4844.

O Proto-Danksharding é uma implementação inicial do danksharding completo. Ele estabelece a base para uma maior escalabilidade com o danksharding no futuro. Isso é alcançado implementando a maior parte da lógica e da "estrutura" que compõem uma especificação completa de danksharding, sem implementar a fragmentação de dados real. Fazer dessa forma permite uma transição mais fácil e menos disruptiva que pode ocorrer ao longo de várias atualizações de rede sem introduzir muito risco ao Ethereum em uma única atualização.

A ideia central por trás da EIP-4844 é apoiar o futuro "centrado em rollups" do Ethereum. Rollups são soluções de camada 2 (l2) que processam transações fora da cadeia principal do Ethereum, mas herdam a segurança do Ethereum. A EIP-4844 visa tornar os rollups mais baratos e eficientes, introduzindo um novo tipo de transação que pode ser aproveitado pelos rollups para permitir que eles diminuam seus custos operacionais em uma ordem de magnitude. Isso, por sua vez, permitirá que os aplicativos construídos sobre os rollups sejam muito mais baratos de usar e aumentará a adoção de todo o ecossistema Ethereum.

Imagine fazer uma troca (swap) em uma DEX em um dos rollups. Se o custo atual de fazer tal operação for, digamos, US$ 1, ele muito provavelmente diminuirá para cerca de US$ 0,10 após a EIP-4844. O impacto neste exemplo tem algumas ressalvas, no entanto, que abordaremos mais adiante no vídeo.

A EIP-4844, juntamente com algumas outras EIPs, será incluída na próxima atualização Dencun da rede.

#### Detalhes técnicos (2:50) {#technical-details-250}

Agora, vamos dar uma olhada mais de perto em como a EIP-4844 funciona.

A EIP-4844 introduz um novo tipo de transação no Ethereum que aceita "blobs" de dados para serem persistidos no nó do Beacon por um curto período de tempo. Essas mudanças são compatíveis com o futuro do roteiro de escalabilidade do Ethereum, e os blobs são pequenos o suficiente para manter o uso do disco gerenciável. As transações de blob estão no mesmo formato em que se espera que existam na especificação final do danksharding.

Isso vem acompanhado de um "mercado de taxa de blob", garantindo que o espaço do blob seja usado de forma eficiente e permaneça economicamente viável. Isso é alcançado introduzindo o gás de blob como um novo tipo de gás. Ele é independente do gás normal. Por enquanto, apenas os blobs são precificados em gás de blob.

Os blobs são 4.096 elementos de campo de 32 bytes cada. O limite de blobs por bloco é controlado pelo parâmetro MAX_BLOBS_PER_BLOCK. O limite pode começar baixo e crescer ao longo de várias atualizações de rede. Inicialmente, a Dencun tem como meta 6 blobs por bloco. 4.096 × 32 bytes × 6 por bloco = 0,75 MB por bloco.

Os blobs são persistidos nos nós do Beacon (camada de consenso), não na camada de execução. O trabalho futuro de fragmentação requer apenas mudanças no nó do Beacon, permitindo que a camada de execução trabalhe em outras iniciativas em paralelo.

Os blobs têm vida curta e são podados após cerca de duas semanas. Eles ficam disponíveis por tempo suficiente para que todos os atores de um rollup os recuperem, mas por um tempo curto o suficiente para manter o uso do disco gerenciável. Isso permite que os blobs tenham um preço mais barato do que os dados de chamada (calldata), que são dados armazenados no histórico para sempre.

A espinha dorsal criptográfica da EIP-4844 são os compromissos KZG. Sem entrar em muitos detalhes técnicos, eles permitem a inclusão de dados eficiente e segura, crucial para a funcionalidade das transações de blob. Dessa forma, apenas os compromissos com os blobs precisam ser interpretados pela EVM na camada de execução, e não os próprios blobs.

Para gerar o segredo compartilhado para os compromissos KZG, uma cerimônia amplamente distribuída baseada em navegador foi executada para que todos os participantes da rede Ethereum tivessem a chance de garantir que ele fosse gerado de forma correta e segura.

A EIP-4844 adiciona um novo pré-compilado chamado avaliação de ponto (point evaluation) que verifica uma prova KZG que afirma que um blob (representado por um compromisso) é avaliado para um determinado valor em um determinado ponto.

Então, como exatamente tudo isso se aplica aos rollups? Com o novo espaço de blob, os rollups poderão colocar os dados do seu bloco em blobs em vez dos dados de chamada mais caros que têm sido usados para esse fim até agora. Aproveitar um espaço de blob de vida curta na camada de consenso é possível, pois os rollups precisam que os dados estejam disponíveis apenas pelo tempo suficiente para garantir que atores honestos possam construir o espaço do rollup.

No caso de rollups otimistas como Optimism ou Arbitrum, eles só precisam fornecer os dados subjacentes enquanto a janela de desafio de fraude estiver aberta. A prova de fraude pode verificar a transição em etapas menores, carregando no máximo alguns valores do blob por vez através de dados de chamada.

Os rollups de conhecimento zero (ZK rollups) forneceriam dois compromissos para sua transação ou dados de delta de estado: o compromisso do blob e o próprio compromisso do ZK rollup usando qualquer sistema de prova que o rollup use internamente. Eles também usariam um protocolo de prova de equivalência, usando o pré-compilado de avaliação de ponto mencionado anteriormente, para provar que os dois compromissos se referem aos mesmos dados.

#### Impacto (6:25) {#impact-625}

O impacto da EIP-4844 no ecossistema Ethereum não pode ser subestimado. Para começar, ela melhora drasticamente a escalabilidade das soluções de camada 2 (l2), reduzindo seus custos operacionais e tornando-as mais competitivas com outras blockchains alternativas e baratas. A redução no custo operacional é possível porque a grande maioria do custo atualmente incorrido pelos rollups se deve às taxas pagas por dados de chamada.

Além disso, a EIP-4844 estabelece as bases para uma escalabilidade ainda maior através do danksharding completo. Esta futura atualização dividirá a rede Ethereum em múltiplos fragmentos de dados, cada um capaz de armazenar dados de forma independente, aumentando ainda mais a capacidade da rede.

Com a queda dos custos operacionais, poderíamos testemunhar o surgimento de uma onda de novas soluções de camada 2 (l2), atraindo desenvolvedores para construir aplicativos inovadores em rollups.

Quando se trata da diminuição dos custos de transação em rollups, ilustrada pelo nosso exemplo anterior de troca em DEX, a situação é complexa. Supondo que a demanda por rollups permaneça constante após a EIP-4844, poderíamos de fato antecipar uma redução significativa nos custos para os usuários. No entanto, melhorias na escalabilidade podem levar a efeitos econômicos imprevistos. Por exemplo, taxas de transação mais baixas para os usuários finais podem levar mais pessoas a usar rollups, aumentando subsequentemente a demanda por recursos da rede e potencialmente elevando os custos de transação.

Uma coisa é certa — mesmo que o resultado principal seja o aumento na vazão de transações e o custo das transações permaneça o mesmo, a EIP-4844 estabelece a base para uma escalabilidade ainda maior no futuro, que eventualmente resultará em transações mais baratas para os usuários.

#### Resumo (8:04) {#summary-804}

A comunidade Ethereum já concluiu os testes da EIP-4844 em várias redes de teste, com o lançamento na Mainnet previsto para 13 de março. Este é um passo monumental para alcançar uma escalabilidade sem precedentes para o Ethereum. Já podemos ver a maioria das principais L2s se comprometendo a começar a usar o novo espaço de blob assim que a atualização Dencun acontecer.

Em conclusão, a EIP-4844 é mais do que apenas uma atualização. É um momento crucial na jornada do Ethereum para se tornar uma blockchain mais escalável, eficiente e amigável ao usuário. Ao reduzir os custos e aumentar a eficiência das soluções de camada 2 (l2), o Ethereum está pronto para consolidar sua posição como a plataforma líder para aplicativos descentralizados.