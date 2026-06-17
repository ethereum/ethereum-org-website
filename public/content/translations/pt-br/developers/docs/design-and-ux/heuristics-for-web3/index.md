---
title: 7 heurísticas para o design de interfaces da Web3
description: Princípios para melhorar a usabilidade da Web3
lang: pt-br
---

As heurísticas de usabilidade são "regras práticas" amplas que você pode usar para medir a usabilidade do seu site.
As 7 heurísticas aqui são adaptadas especificamente para a Web3 e devem ser usadas em conjunto com os [10 princípios gerais para o design de interação](https://www.nngroup.com/articles/ten-usability-heuristics/) de Jakob Nielsen.

## Sete heurísticas de usabilidade para a Web3 {#seven-usability-heuristics-for-web3}

1. O feedback segue a ação
2. Segurança e confiança
3. A informação mais importante é óbvia
4. Terminologia compreensível
5. As ações são as mais curtas possíveis
6. As conexões de rede são visíveis e flexíveis
7. Controle pelo aplicativo, não pela carteira

## Definições e exemplos {#definitions-and-examples}

### 1. O feedback segue a ação {#feedback-follows-action}

**Deve ser óbvio quando algo aconteceu ou está acontecendo.**

Os usuários decidem seus próximos passos com base no resultado de seus passos anteriores. Portanto, é essencial que eles permaneçam informados sobre o estado do sistema. Isso é especialmente importante na Web3, pois as transações às vezes podem levar um curto período de tempo para serem confirmadas na blockchain. Se não houver feedback informando-os para esperar, os usuários não terão certeza se algo aconteceu.

**Dicas:** 
- Informe o usuário por meio de mensagens, notificações e outros alertas.
- Comunique os tempos de espera de forma clara.
- Se uma ação for levar mais do que alguns segundos, tranquilize o usuário com um cronômetro ou uma animação para que ele sinta que algo está acontecendo.
- Se houver várias etapas em um processo, mostre cada etapa.

**Exemplo:**
Mostrar cada etapa envolvida em uma transação ajuda os usuários a saberem onde estão no processo. Ícones apropriados permitem que o usuário saiba o estado de suas ações.

![Informing the user about each step when swapping tokens](./Image1.png)

### 2. Segurança e confiança são integradas {#security-and-trust-are-backed-in}

A segurança deve ser priorizada, e isso deve ser enfatizado para o usuário. 
As pessoas se importam profundamente com seus dados. A segurança costuma ser uma preocupação principal para os usuários, portanto, deve ser considerada em todos os níveis do design. Você deve sempre buscar conquistar a confiança de seus usuários, mas a maneira como você faz isso pode significar coisas diferentes em aplicativos diferentes. Não deve ser uma reflexão tardia, mas deve ser projetada conscientemente do início ao fim. Construa confiança em toda a experiência do usuário, incluindo canais sociais e documentação, bem como na interface de usuário (UI) final. Coisas como o nível de descentralização, o status de multi-sig da tesouraria e se a equipe é pública (doxxed), tudo isso afeta a confiança dos usuários.

**Dicas:**
- Liste suas auditorias com orgulho
- Obtenha várias auditorias
- Divulgue quaisquer recursos de segurança que você projetou
- Destaque os possíveis riscos, incluindo integrações subjacentes
- Comunique a complexidade das estratégias
- Considere questões não relacionadas à interface de usuário (UI) que possam afetar a percepção de segurança de seus usuários

**Exemplo:** 
Inclua suas auditorias no rodapé, em um tamanho de destaque.

![Audits referenced in the website footer](./Image2.png)

### 3. A informação mais importante é óbvia {#the-most-important-info-is-obvious}

Para sistemas complexos, mostre apenas os dados mais relevantes. Determine o que é mais importante e priorize sua exibição. 
Muita informação é esmagadora e os usuários normalmente se ancoram em uma informação ao tomar decisões. Em finanças descentralizadas (DeFi), isso provavelmente será a APR em aplicativos de rendimento e o LTV em aplicativos de empréstimo.

**Dicas:**
- A pesquisa com usuários descobrirá a métrica mais importante
- Torne a informação principal grande e os outros detalhes pequenos e discretos
- As pessoas não leem, elas passam os olhos; garanta que seu design seja fácil de escanear visualmente

**Exemplo:** Tokens grandes e coloridos são fáceis de encontrar ao escanear visualmente. A APR é grande e destacada em uma cor de destaque.

![The token and APR are easy to find](./Image3.png)

### 4. Terminologia clara {#clear-terminology}

A terminologia deve ser compreensível e apropriada.
O jargão técnico pode ser um grande obstáculo, pois exige a construção de um modelo mental completamente novo. Os usuários não conseguem relacionar o design a palavras, frases e conceitos que já conhecem. Tudo parece confuso e desconhecido, e há uma curva de aprendizado acentuada antes mesmo que eles possam tentar usá-lo. Um usuário pode abordar as finanças descentralizadas (DeFi) querendo economizar algum dinheiro, e o que ele encontra é: mineração, farming, staking, emissões, subornos (bribes), cofres (vaults), bloqueadores (lockers), veTokens, vesting, épocas (epochs), algoritmos descentralizados, liquidez de propriedade do protocolo…
Tente usar termos simples que serão compreendidos pelo grupo mais amplo de pessoas. Não invente termos totalmente novos apenas para o seu projeto.

**Dicas:**
- Use terminologia simples e consistente
- Use a linguagem existente o máximo possível
- Não crie seus próprios termos
- Siga as convenções conforme elas aparecem
- Eduque os usuários o máximo possível

**Exemplo:**
"Suas recompensas" é um termo neutro e amplamente compreendido; não uma palavra nova inventada para este projeto. As recompensas são denominadas em USD para corresponder aos modelos mentais do mundo real, mesmo que as próprias recompensas estejam em outro token.

![Token rewards, displayed in U.S. dollars](./Image4.png)

### 5. As ações são as mais curtas possíveis {#actions-are-as-short-as-possible}

Acelere as interações do usuário agrupando subações. 
Isso pode ser feito no nível do contrato inteligente, bem como na interface de usuário (UI). O usuário não deve ter que se mover de uma parte do sistema para outra – ou sair do sistema inteiramente – para concluir uma ação comum. 

**Dicas:**
- Combine "Aprovar" com outras ações sempre que possível
- Agrupe as etapas de assinatura o mais próximo possível umas das outras

**Exemplo:** Combinar "adicionar liquidez" e "fazer stake" é um exemplo simples de um acelerador que economiza tempo e gás para o usuário.

![Modal showing a switch to combine the deposit and stake actions](./Image5.png)

### 6. As conexões de rede são visíveis e flexíveis {#network-connections-are-visible-and-flexible}

Informe o usuário sobre a qual rede ele está conectado e forneça atalhos claros para mudar de rede. 
Isso é especialmente importante em aplicativos multichain. As principais funções do aplicativo ainda devem estar visíveis enquanto desconectado ou conectado a uma rede não suportada.

**Dicas:**
- Mostre o máximo possível do aplicativo enquanto estiver desconectado
- Mostre a qual rede o usuário está conectado no momento
- Não faça o usuário ir até a carteira para mudar de rede
- Se o aplicativo exigir que o usuário mude de rede, solicite a ação a partir da chamada para ação (CTA) principal
- Se o aplicativo contiver mercados ou cofres para várias redes, indique claramente qual conjunto o usuário está visualizando no momento

**Exemplo:** Mostre ao usuário a qual rede ele está conectado e permita que ele a altere na barra do aplicativo (appbar).

![Dropdown button showing the connected network](./Image6.png)

### 7. Controle pelo aplicativo, não pela carteira {#control-from-the-app-not-the-wallet}

A interface de usuário (UI) deve dizer ao usuário tudo o que ele precisa saber e dar a ele controle sobre tudo o que ele precisa fazer. 
Na Web3, existem ações que você realiza na UI e ações que você realiza na carteira. Geralmente, você inicia uma ação na UI e, em seguida, a confirma na carteira. Os usuários podem se sentir desconfortáveis se essas duas vertentes não forem integradas com cuidado.

**Dicas:**
- Comunique o estado do sistema por meio de feedback na UI
- Mantenha um registro de seu histórico
- Forneça links para exploradores de blocos para transações antigas
- Forneça atalhos para mudar de redes. 

**Exemplo:** Um contêiner sutil mostra ao usuário quais tokens relevantes ele tem em sua carteira, e a chamada para ação (CTA) principal fornece um atalho para mudar a rede.

![Main CTA is prompting the user to switch network](./Image7.png)