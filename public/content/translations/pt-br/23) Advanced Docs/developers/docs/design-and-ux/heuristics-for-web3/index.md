---
title: Sete heurísticas para o design da interface Web3
description: Princípios para melhorar a usabilidade do Web3
lang: pt-br
---

As heurísticas de usabilidade são “regras gerais” que você pode usar para medir a usabilidade do seu site.
Essas heurísticas são adaptadas especificamente para Web3 e devem ser usadas junto com os [10 princípios gerais para design de interação](https://www.nngroup.com/articles/ten-usability-heuristics/) de Jakob Nielsen.

## Sete heurísticas de usabilidade para web3 {#seven-usability-heuristics-for-web3}

1. O feedback segue a ação
2. Segurança e confiança
3. A informação mais importante é óbvia
4. Terminologia compreensível
5. As ações são tão curtas quanto possível
6. As conexões de rede são visíveis e flexíveis
7. Controle pelo aplicativo, não pela carteira

## Definições e exemplos {#definitions-and-examples}

### 1. O feedback segue a ação {#feedback-follows-action}

**Deve ser óbvio quando algo aconteceu ou está acontecendo.**

Os usuários decidem as próximas etapas com base no resultado das etapas anteriores. Portanto, é essencial que eles permaneçam informados sobre o status do sistema. Isso é especialmente importante na Web3, pois às vezes as transações podem levar um curto período de tempo para serem confirmadas na blockchain. Se não houver nenhum feedback informando para esperar, os usuários não terão certeza se algo aconteceu.

**Dicas:**

- Informe o usuário por meio de mensagens, notificações e outros alertas.
- Comunique claramente os tempos de espera.
- Se uma ação demorar mais do que alguns segundos, tranquilize o usuário com um cronômetro ou uma animação para fazê-lo sentir que algo está acontecendo.
- Se houver várias etapas em um processo, mostre cada etapa.

**Exemplo:**
Mostrar cada etapa envolvida em uma transação ajuda os usuários a saber onde estão no processo. Ícones apropriados permitem que o usuário saiba o status de suas ações.

![Informando o usuário sobre cada etapa da troca de tokens](./Image1.png)

### 2. A segurança e a confiança são incorporadas {#security-and-trust-are-backed-in}

A segurança deve ser priorizada, e isso deve ser enfatizado para o usuário.
As pessoas se importam profundamente com seus dados. A segurança é frequentemente uma preocupação principal para os usuários, por isso deve ser considerada em todos os níveis do design. Você deve sempre tentar ganhar a confiança dos seus usuários, mas a maneira como você faz isso pode significar coisas diferentes em aplicativos diferentes. Isso não deve ser uma reflexão tardia, mas sim algo planejado conscientemente ao longo de todo o processo de design. Crie confiança em toda a experiência do usuário, inclusive nos canais sociais e na documentação, bem como na interface do usuário final. Aspectos como o nível de descentralização, o status de multi-sig da tesouraria e se os membros da equipe são conhecidos publicamente afetam a confiança dos usuários

**Dicas:**

- Liste suas auditorias com orgulho
- Obtenha várias auditorias
- Anuncie quaisquer recursos de segurança que você projetou
- Destaque os possíveis riscos, incluindo integrações subjacentes
- Comunique a complexidade das estratégias
- Considere questões além da interface que possam influenciar a percepção de segurança dos seus usuários

**Exemplo:**
Inclua suas auditorias no rodapé, em um tamanho destacado.

![Auditorias referenciadas no rodapé do site](./Image2.png)

### 3. A informação mais importante é evidente {#the-most-important-info-is-obvious}

Para sistemas complexos, mostre apenas os dados mais relevantes. Determine o que é mais importante e priorize sua exibição.
O excesso de informações é esmagador e os usuários geralmente se concentram em uma única informação ao tomar decisões. No DeFi, isso provavelmente será APR em aplicativos de rendimento e LTV em aplicativos de empréstimo.

**Dicas:**

- A pesquisa com usuários revelará a métrica mais importante
- Faça com que as informações principais sejam grandes e os outros detalhes sejam pequenos e discretos
- As pessoas não leem, elas escaneiam; garanta que seu design seja escaneável

**Exemplo:** Tokens grandes e coloridos são fáceis de encontrar ao escanear. O APR é grande e destacado em uma cor de destaque.

![O token e a APR são fáceis de encontrar](./Image3.png)

### 4. Terminologia clara {#clear-terminology}

A terminologia deve ser compreensível e apropriada.
O jargão técnico pode ser um grande obstáculo, porque exige a construção de um modelo mental completamente novo. Os usuários não conseguem relacionar o design a palavras, frases e conceitos que já conhecem. Tudo parece confuso e desconhecido, e há uma curva de aprendizado íngreme antes mesmo que eles tentem usá-lo. Um usuário pode abordar o DeFi querendo economizar algum dinheiro, e o que ele encontra é: Mineração, agricultura, staking, emissões, subornos, cofres, armários, veTokens, vesting, épocas, algoritmos descentralizados, liquidez de propriedade do protocolo...
Tente usar termos simples que sejam compreendidos pelo maior número possível de pessoas. Não invente termos novos apenas para o seu projeto.

**Dicas:**

- Use terminologia simples e consistente
- Use a linguagem existente o máximo possível
- Não invente seus próprios termos
- Siga as convenções conforme elas aparecem
- Eduque os usuários o máximo possível

**Exemplo:**
“Suas recompensas” é um termo amplamente compreendido e neutro; não é uma palavra nova inventada para este projeto. As recompensas são denominadas em dólares americanos para corresponder aos modelos mentais do mundo real, mesmo que as recompensas em si estejam em outro token.

![Recompensas de token, exibidas nos Eua. dólares](./Image4.png)

### 5. As ações são tão curtas quanto possível {#actions-are-as-short-as-possible}

Acelere as interações do usuário agrupando sub ações.
Isso pode ser feito no nível do contrato inteligente, bem como na interface do usuário. O usuário não deve ter que se mover de uma parte do sistema para outra – ou sair do sistema completamente – para concluir uma ação comum.

**Dicas:**

- Combine “Aprovar” com outras ações sempre que possível
- Agrupe as etapas de assinatura o mais próximo possível umas das outras

**Exemplo:** Combinar “adicionar liquidez” e “stake” é um exemplo simples de um acelerador que economiza tempo e combustível para o usuário.

![Modal mostrando um interruptor para combinar as ações de depósito e stake](./Image5.png)

### 6. As conexões de rede são visíveis e flexíveis {#network-connections-are-visible-and-flexible}

Informe ao usuário a qual rede ele está conectado e forneça atalhos claros para alterar a rede.
Isto é especialmente importante em aplicativos multichain. As principais funções do aplicativo ainda devem estar visíveis quando desconectado ou conectado a uma rede não suportada.

**Dicas:**

- Mostre o máximo possível do aplicativo enquanto estiver desconectado
- Mostrar a qual rede o usuário está conectado no momento
- Não faça o usuário ir até a carteira para trocar de rede
- Se o aplicativo exigir que o usuário troque de rede, solicite a ação na chamada para ação principal
- Se o aplicativo contiver mercados ou cofres para várias redes, indique claramente qual conjunto o usuário está visualizando no momento

**Exemplo:** Mostre ao usuário a qual rede ele está conectado e permita que ele a altere na barra de aplicativos.

![Botão suspenso mostrando a rede conectada](./Image6.png)

### 7. Controle do aplicativo, não da carteira {#control-from-the-app-not-the-wallet}

A interface do usuário deve informar ao usuário tudo o que ele precisa saber e dar a ele controle sobre tudo o que ele precisa fazer.
No Web3, há ações que você realiza na interface do usuário e ações que você realiza na carteira. Geralmente, você inicia uma ação na interface do usuário e depois a confirma na carteira. Os usuários podem se sentir desconfortáveis ​​se esses dois fios não forem integrados cuidadosamente.

**Dicas:**

- Comunique o status do sistema por meio de feedback na IU
- Mantenha um registro de sua história
- Fornecer links para bloquear exploradores de transações antigas
- Forneça atalhos para alterar redes.

**Exemplo:** Um contêiner sutil mostra ao usuário quais tokens relevantes ele tem em sua carteira, e o CTA principal fornece um atalho para alterar a rede.

![A CTA principal está solicitando que o usuário troque de rede](./Image7.png)
