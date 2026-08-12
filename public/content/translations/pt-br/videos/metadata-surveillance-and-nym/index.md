---
title: "Especial do Dia da Privacidade de Dados - Vigilância de metadados e Nym"
description: "Uma conversa no Dia da Privacidade de Dados sobre vigilância de metadados: o que os metadados revelam sobre você mesmo quando o conteúdo das mensagens é criptografado e como ferramentas de privacidade em nível de rede, como a Nym, funcionam para protegê-los."
lang: pt-br
youtubeId: "QBX5AK3DXqw"
uploadDate: 2023-01-30
duration: "0:07:49"
educationLevel: beginner
topic:
  - "privacy"
format: interview
author: Nym
breadcrumb: "Privacidade"
---

Um destaque da **Nym** com a Cientista-Chefe da Nym, Claudia Diaz, explorando a mecânica dos metadados, seu papel crítico na vigilância moderna, os detalhes pessoais que eles expõem e as medidas que podemos tomar para recuperar nossa privacidade.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=QBX5AK3DXqw) publicada pela Nym. Ela foi levemente editada para facilitar a leitura.*

#### Introdução (0:04) {#intro-004}

O que são metadados de comunicação? Eles se referem a tudo sobre uma comunicação que não é o conteúdo do que está sendo dito de fato. Isso inclui, por exemplo, a origem da comunicação, o destino, o horário em que a informação é enviada, quanta informação é enviada e quaisquer padrões detectáveis, incluindo os tempos e tamanhos dos pacotes sendo trocados.

#### Metadados de comunicação (0:27) {#communications-metadata-027}

Os metadados de comunicação são expostos por padrão em todos os protocolos de internet: TCP/IP, HTTP, UDP, FTP. Mesmo protocolos seguros como TLS ou DNS seguro, que protegem o conteúdo com criptografia de ponta a ponta, ainda mostram os metadados de comunicação: a origem, o destino, o tempo, o tamanho e assim por diante.

Então, essas informações estão expostas, mas para quem? Quem pode obtê-las?

#### Quem tem acesso aos metadados (1:10) {#who-gets-access-to-metadata-110}

Existem várias entidades que são intermediárias nas comunicações da internet que conseguem acessar esses metadados de comunicação. Isso inclui grandes participantes da infraestrutura da internet, como provedores de serviços de internet, pontos de troca de tráfego (exchanges), sistemas autônomos, roteadores BGP e participantes do backbone da internet em geral; eles podem ter acesso a muitos metadados de comunicação. 

Mas até mesmo pequenos participantes, como quem quer que esteja operando o roteador Wi-Fi ou uma rede local, ou alguém que consiga interceptar dados localmente, também têm acesso aos metadados de comunicação. E, claro, sabe-se que adversários em nível de Estado-nação, como a NSA, coletam metadados em grande escala e os analisam para extrair todos os tipos de inteligência.

#### Por que os metadados são importantes (2:00) {#why-is-metadata-important-200}

Existem mais razões pelas quais os metadados são um tipo de dado muito interessante para coletar e explorar. Eles são legíveis por máquina, porque falam a linguagem dos computadores; é basicamente a linguagem para que os computadores consigam rotear as comunicações de sua origem até seu destino de maneira adequada. Portanto, eles são legíveis por máquina, e isso significa que as máquinas podem compreendê-los em grande escala com muita facilidade, ao contrário da linguagem humana natural, que é muito mais difícil de interpretar, porque talvez as pessoas estejam usando palavras de uma certa maneira, ou elas têm nuances, e isso é muito mais difícil de interpretar. Os metadados, por outro lado, são muito fáceis.

Eles também têm um volume muito menor do que o conteúdo. Se você pensar em um vídeo do YouTube, por exemplo, o conteúdo em si pode ter vários gigabytes, mas os metadados incluiriam apenas qual é a URL do vídeo, quantos bytes ele contém e a que horas foi assistido. Portanto, pode ser muito menos do que o conteúdo real e também é gerenciável em termos de tamanho.

Os metadados também têm uma proteção muito menor do que o conteúdo. Não é legal simplesmente interceptar as comunicações das pessoas e olhar o conteúdo, isso é protegido por lei. Mas os metadados, por não serem considerados tão sensíveis, têm uma proteção muito menor. Assim, muitas entidades podem coletar legalmente esses metadados e analisá-los para obter informações sobre o que as pessoas estão fazendo na internet.

Então, isso é um grande problema? Podemos dizer: "Bem, são apenas metadados. Contanto que você não saiba o que estou dizendo, eu deveria realmente me preocupar com você sabendo com quem eu falo e a que horas?" 

Existem algumas citações que mostram como os metadados são, na verdade, considerados extremamente valiosos. O conselheiro geral da NSA, Stewart Baker, disse que os metadados dizem absolutamente tudo sobre a vida de alguém — se você tiver metadados suficientes, não precisará realmente do conteúdo. É assim que eles são poderosos para conseguir entender no que alguém está interessado, qual é a sua rede social, quais são os seus hobbies, quais são as suas intenções, quais são os seus interesses. Você não precisa realmente ouvir o que eles estão dizendo; basta que você consiga observar todos os metadados.

E Whitfield Diffie e Susan Landau, em seu livro *Privacy on the Line*, dizem que a análise de tráfego, e não a criptoanálise, é a espinha dorsal da inteligência de comunicações. Isso ocorre porque você pode coletá-la em grande escala, pode analisá-la em grande escala, e ela lhe dará todos os grandes padrões, todo o panorama geral, que então permite que você se aprofunde para invadir os alvos específicos que achar mais interessantes. Mas você os encontra primeiro com a análise de tráfego nos metadados.

A análise de tráfego de metadados pode até ser usada para recuperar conteúdo criptografado sem quebrar a criptografia. Vamos supor que temos uma criptografia perfeita: nenhuma quantidade de criptoanálise é capaz de quebrá-la, e as chaves secretas são perfeitamente secretas. Deveríamos ter confiança de que esse conteúdo está protegido e que um adversário não é capaz de descobrir sobre esse conteúdo.

No entanto, existem muitas situações em que a análise de tráfego de metadados de comunicação pode atuar como um canal lateral que revela esse conteúdo criptografado.

#### Vigilância de metadados (5:15) {#metadata-surveillance-515}

Um exemplo é quando você está navegando em um site com HTTPS. Em princípio, como a comunicação com este site é criptografada, alguém que esteja observando sua comunicação não pode dizer qual página específica você está acessando no site. Por exemplo, se você for ao WebMD para verificar doenças, um observador ou bisbilhoteiro poderá ver: "Ok, você está verificando informações médicas no WebMD", mas eles não podem dizer qual doença específica você está procurando.

No entanto, a maneira de descobrir o que alguém está fazendo neste cenário seria um adversário primeiro baixar todas as páginas do site e registrar, para cada página, o padrão de pacotes que são vistos na linha de comunicação. Basicamente, qual número de pacotes vai em qual direção, quais são os tamanhos desses pacotes e qual é o período entre pacotes de um pacote para o próximo. 

Ao fazer isso, você pode construir uma impressão digital de cada uma dessas páginas, de modo que, quando o alvo estiver baixando uma página do site criptografado, você consiga corresponder o número de pacotes em cada direção e seus tamanhos para adivinhar qual página da web específica eles estão olhando, mesmo que a própria página da web seja criptografada e você não devesse ser capaz de descobrir esse conteúdo.

Isso é obviamente preocupante. Mesmo que possamos ter criptografia de ponta a ponta, estamos muito longe de terminar em termos de proteger a privacidade de nossas comunicações.

#### Uma lista de desejos para comunicações privadas (6:40) {#a-wish-list-for-private-communications-640}

Então, se quiséssemos ter uma lista de desejos do que uma rede de comunicação perfeitamente segura ofereceria, quais são as propriedades que queremos? 

Obviamente, queremos proteger o que um usuário está dizendo pelo canal criptografado, e a criptografia de ponta a ponta já é um passo muito importante para alcançar isso. Mas não apenas isso, também queremos ocultar com quem o usuário está se comunicando, ou seja, quem é o parceiro de comunicação, de quem você está recebendo pacotes ou para quem você está enviando pacotes. Também a localização, ou seja, de onde você está se comunicando; quando e por quanto tempo você está se comunicando; quantos bytes de dados você está trocando; e quaisquer outros padrões na comunicação. E você poderia até ir tão longe a ponto de dizer que queremos ocultar se alguém está se comunicando ou não.

Essas são todas propriedades que os sistemas de comunicação anônima visam fornecer e, no espaço de soluções, as mixnets são uma das melhores soluções que temos para fornecer esses tipos de propriedades.