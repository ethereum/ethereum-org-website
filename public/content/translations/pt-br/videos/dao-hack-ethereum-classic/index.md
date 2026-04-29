---
title: "O hack da DAO: a história do Ethereum Classic"
description: "A história do hack da DAO em 2016 e como a resposta da comunidade levou à criação do Ethereum Classic como uma cadeia separada."
lang: pt-br
youtubeId: "rNeLuBOVe8A"
uploadDate: 2021-12-15
duration: "0:09:48"
educationLevel: beginner
topic:
  - "governança"
  - "história"
  - "dao"
format: explainer
author: Junion
breadcrumb: "O Hack da DAO"
---

Uma explicação de **Junion** contando a história do hack da DAO em 2016, um dos maiores roubos digitais da história cripto, e como a decisão controversa da comunidade Ethereum de fazer uma bifurcação na blockchain levou à criação do Ethereum Classic.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=rNeLuBOVe8A) publicada por Junion. Ela foi levemente editada para facilitar a leitura.*

#### A descoberta (0:00) {#the-discovery-000}

É segunda-feira, 13 de junho de 2016. Um professor de ciência da computação de Cornell está examinando o código da DAO, um dos projetos mais ambiciosos no espaço cripto. Por meses, ele vinha defendendo que o projeto fosse suspenso, pois acreditava que havia certas falhas que poderiam colocar tudo em risco. Mas hoje ele encontra uma vulnerabilidade grave: um bug na linha 666.

Ele teme que esse bug possa permitir que um hacker faça saques ilimitados, como em um caixa eletrônico. Mesmo que o invasor tivesse apenas US$ 10 em sua conta, ele seria capaz de sacar esse valor repetidas vezes até que todo o dinheiro acabasse. Havia um quarto de bilhão de dólares investidos na DAO, e cada centavo estava em risco.

A Slock.it, empresa por trás da DAO, reconhece a possível exploração, mas declara que qualquer ataque seria inviável, então todos os fundos ainda estão seguros. Eles fazem um commit no GitHub trocando duas linhas de código — uma correção que será incluída como parte do DAO Framework versão 1.1.

Mas, assim que a equipe estava cantando vitória, um hacker seguia secretamente seus passos, desenvolvendo uma exploração que se aproveita exatamente desse bug. Agora é sexta-feira, quatro dias depois, e a DAO acaba de ser hackeada em uma quantia de 55 milhões de dólares.

Assim como o hack de 81 milhões de dólares do SWIFT tornou públicas as falhas no setor bancário centralizado, e o ataque de ransomware WannaCry revelou vulnerabilidades críticas em sistemas operacionais de computadores, o hack da DAO expôs a fragilidade inicial da segurança de contratos inteligentes em um mundo onde o código dita tudo. Isso deixou a comunidade Ethereum devastada enquanto eles corriam para tentar recuperar o controle da blockchain.

Esta é a história de um dos maiores roubos digitais de todos os tempos e da ousada tentativa de reescrever a história para que ele nunca tivesse acontecido.

#### O que era a DAO? (2:00) {#what-was-the-dao-200}

Entra em cena a DAO — sigla para organização autônoma descentralizada (DAO). A ideia foi inspirada no financiamento coletivo (crowdfunding). Em vez de vários fundos para projetos diferentes, haveria um único fundo para governar todos eles, e não havia maneira melhor de fazer isso do que com uma DAO.

No lançamento, os investidores receberiam 100 tokens DAO para cada ether depositado. Esses tokens lhes davam governança sobre o protocolo e representavam sua parte na DAO. Os detentores de tokens podiam enviar propostas — por exemplo, você poderia propor investir um milhão de dólares em troca de um stake de 10% na empresa XYZ.

Assim que uma proposta passasse pela verificação inicial, ela seria votada por todos os outros investidores. Durante esse período, os detentores de tokens podiam votar sim se acreditassem que o investimento renderia um valor esperado positivo, ou não se acreditassem que renderia um valor esperado negativo. Eles também podiam usar o fórum para expressar suas opiniões e ler as dos outros.

Quando o período de votação terminava e um quórum de 20% de todos os tokens era atingido, a DAO transferia automaticamente o ether especificado para o contrato inteligente que representava a proposta. Qualquer ether gerado a partir dessas propostas seria então devolvido à tesouraria. Era como um grande fundo de hedge descentralizado, projetado para gerar lucro. A ideia era que a sabedoria da multidão ajudaria a criar as melhores oportunidades de investimento.

No entanto, ainda precisava haver uma maneira de proteger a minoria de ser oprimida pela maioria. Se um grupo minoritário discordasse fortemente de uma proposta que não pudesse vencer na votação, em vez de votar não, eles poderiam chamar uma função de divisão (split) e mover seu ether da DAO principal para uma DAO filha, essencialmente dividindo a DAO em duas. Essa função de divisão será muito importante mais tarde.

#### O financiamento coletivo (4:01) {#the-crowdfund-401}

A DAO foi o maior projeto de financiamento coletivo de todos os tempos, arrecadando 12,7 milhões de ether — no valor de 150 milhões de dólares na época. Isso ocorreu durante a era inicial do Ethereum, onde o projeto foi submetido a uma enorme quantidade de hype e FOMO (medo de ficar de fora) dos investidores.

Antes disso, os projetos do Ethereum tinham sido principalmente provas de conceito arbitrárias, mas este era um projeto totalmente funcional com um enorme potencial. Era completamente seguro contra quaisquer hacks, protegido por milhões de mineradores em todo o mundo, e era descentralizado — todo o projeto era composto por uma série de contratos inteligentes no Ethereum.

Este era um código imutável hospedado no computador mais seguro do mundo, o que garantia as principais propriedades de uma DAO: uma organização que é completamente descentralizada e autônoma. Uma vez que os contratos foram implantados em 30 de abril, nenhuma entidade única — nem mesmo a Slock.it — poderia fazer alterações no protocolo ou interromper sua existência. Seu código havia sido auditado inúmeras vezes por vários desenvolvedores do Ethereum e estava visível para todos revisarem.

#### O hack (5:02) {#the-hack-502}

"Lonely, so lonely" (Solitário, tão solitário) — o nome da Proposta da DAO nº 59. É apenas uma proposta de divisão normal, mas na verdade é onde o hack começa. Depois que o hacker enviou a proposta, há um período padrão de debate de sete dias em que qualquer pessoa é livre para participar. No entanto, ninguém se junta a essa divisão.

É um procedimento padrão alguém chamar uma divisão por conta própria, criar uma DAO filha e, em seguida, criar uma proposta que envia todo o ether de volta para sua carteira. Isso permite que um usuário recupere seu dinheiro respaldado por seus tokens DAO. Sete dias se passaram e o hacker agora tem permissão para chamar a função de divisão. Ninguém suspeita de nada.

No entanto, à medida que a função de divisão é chamada, a comunidade percebe algo alarmante. O ether está sendo drenado da DAO a uma taxa de oito milhões de dólares por hora. A comunidade corre para descobrir o que está acontecendo. Parece que o invasor está chamando recursivamente a função de divisão — repetidas vezes, centenas de vezes.

Lembra daquela correção de bug que ocorreu quatro dias atrás? É uma pena que não haja como editar o código de um contrato inteligente depois de implantado, então essa correção só existia no GitHub como parte da The DAO 1.1, uma DAO totalmente diferente que estava sendo criada. Essa pequena correção poderia ter evitado tudo isso — tudo o que ela fazia era trocar duas linhas de código para que o saldo fosse atualizado antes do pagamento real.

Mas sem essa correção, qualquer um poderia chamar repetidamente a função para sacar ether antes que o contrato atualizasse seu saldo. É como um caixa eletrônico que não altera seu saldo até que tenha lhe dado o dinheiro. "Posso sacar dez dólares? Espere, antes disso, posso sacar dez dólares? Espere, antes disso..."

#### O grupo Robin Hood (6:55) {#the-robin-hood-group-655}

Os detentores de tokens DAO assistiram enquanto seus investimentos eram lentamente drenados da DAO principal para a DAO filha, também conhecida como dark DAO. Além disso, o preço do Ethereum sofreu uma queda brusca (flash-crash) de US$ 20 para US$ 15 após as notícias. Algo precisava ser feito, e a única maneira era drenar o resto antes que o hacker o fizesse. E assim começou a corrida para esvaziar.

Do outro lado do mundo, em seu apartamento no bairro de Copacabana, no Rio de Janeiro, Alex Van de Sande acorda com seu telefone bombando de mensagens no Skype. Ele se vira para a esposa e diz: "Lembra quando eu estava te falando sobre aquela enorme pilha de dinheiro in-hackeável? Foi hackeada."

Alex entrou em contato com alguns outros desenvolvedores não revelados e eles formaram um grupo que apelidaram de Robin Hood — hackers éticos (white-hat) que drenariam os fundos restantes e os devolveriam aos legítimos proprietários. No entanto, eles não tinham tempo para propor uma nova divisão, pois isso exigiria um período de votação de sete dias.

Em vez disso, eles voltaram seus olhos para a Proposta nº 71, que estava prestes a terminar em algumas horas. Eles se juntariam a essa divisão e usariam o mesmo hack para desviar todos os fundos restantes para essa DAO filha. Seis horas haviam se passado desde o início do ataque, e o ladrão havia conseguido roubar 30% do ether da DAO. Mas, por algum motivo desconhecido, o ataque parou de funcionar. As transações falharam e tudo chegou ao fim.

Enquanto isso, Alex estava se preparando para lançar o ataque white-hat para garantir os 70% restantes dos fundos. Mas, de repente, ele perdeu a conexão com a internet. Faltando apenas 30 minutos, ele ligou freneticamente para a NET, seu provedor de internet brasileiro, mas só obteve uma resposta de uma voz robótica: "Vemos que há um problema de internet no seu bairro." A proposta de divisão terminou e ele havia acabado de perder a janela para executar o ataque Robin Hood.

Na manhã seguinte, Alex tentou reunir o grupo novamente para se infiltrar em outra proposta de divisão, mas os outros estavam ocupados. "Nos sentimos como os piores hackers da história. Fomos frustrados por uma internet ruim e compromissos familiares."

#### A corrida para esvaziar (9:10) {#the-race-to-empty-910}

Quatro dias após o ataque inicial, a DAO estava sob ataque novamente. Estava sendo drenada lentamente — alguns ether por rodada — mas já havia acumulado alguns milhares de dólares. Parecia ser de um invasor testando as águas. Neste ponto, o Robin Hood precisava fazer algo.

Eles escolheram se infiltrar na Divisão nº 78 porque haviam identificado o curador da proposta e ela estava terminando em breve. Eles contataram algumas baleias (grandes investidores) que ficaram felizes em doar seus tokens DAO, permitindo que a equipe garantisse seis milhões de tokens. Quanto mais tokens o contrato Robin tivesse, mais rápido ele poderia desviar ether. O invasor acelerou o ritmo e outros invasores se juntaram. Mas graças às doações, o Robin Hood conseguiu superá-los. Isso permitiu que eles garantissem 7,2 milhões de ether — 55% da DAO.

#### A bifurcação (10:08) {#the-fork-1008}

A DAO principal agora havia sido drenada e todos os fundos foram distribuídos por várias DAOs filhas — sendo as duas principais a DAO white-hat e a dark DAO. Mas todo o dinheiro estava bloqueado por tempo. Nenhuma proposta poderia ser apresentada em uma DAO filha até que um período de espera de 27 dias terminasse. E mesmo depois disso, enviar fundos para um endereço externo exigia o envio de uma proposta e uma espera de duas semanas. Essencialmente, ainda faltavam 41 dias até que o hacker pudesse sacar o que equivalia a 5% do fornecimento total de Ethereum.

Mas o hacker nunca conseguiria tocar em seu Ethereum. O que aconteceu a seguir é um dos episódios mais ousados e controversos da história da blockchain. A comunidade decidiu que não deixaria o hacker vencer. Eles queriam reescrever a história para que todas as transações envolvidas no hack fossem desfeitas, e todos recebessem seu dinheiro de volta. Eles escolheram fazer uma bifurcação no Ethereum.

Uma blockchain é como uma lista de transações que continua crescendo a cada bloco minerado. Cada transação fica enraizada na blockchain para sempre. Mas se mais de 50% dos mineradores entrarem em conluio, eles podem alterar falsamente a blockchain, reescrevendo a história como quiserem. Geralmente, isso é chamado de ataque de 51%. Mas não havia nada de malicioso nessa bifurcação — a comunidade estava apenas recuperando o dinheiro que havia sido roubado deles.

#### O código é a lei (11:48) {#code-is-law-1148}

Ainda assim, nem todos concordavam com a bifurcação proposta. Eles argumentavam que o código é a lei. Nessa visão, o invasor era menos um hacker e mais um advogado inteligente que leu cuidadosamente os termos de um contrato. Portanto, nenhum fundo foi realmente roubado e eles deveriam ter direito legítimo ao ether da dark DAO.

É importante notar que o próprio Ethereum nunca foi realmente hackeado — foi apenas um contrato inteligente mal escrito que foi explorado. Duas coisas diferentes. Além disso, eles acreditavam que as coisas que acontecem na blockchain são imutáveis e nunca devem ser adulteradas, independentemente da situação.

Um dia após o ataque inicial, o invasor enviou uma carta aberta no bate-papo do grupo da DAO no Slack, assinada com sua chave privada:

> "Para a DAO e a comunidade Ethereum: Examinei cuidadosamente o código da The DAO e reivindiquei legitimamente 3 milhões de ether, e gostaria de agradecer à DAO por esta recompensa. Estou decepcionado com aqueles que estão caracterizando o uso desse recurso intencional como 'roubo'. Estou fazendo uso desse recurso explicitamente codificado de acordo com os termos do contrato inteligente. Uma bifurcação leve (soft fork) ou uma bifurcação rígida equivaleria à apreensão do meu ether legítimo e de direito. Tal bifurcação arruinaria permanente e irrevogavelmente toda a confiança não apenas no Ethereum, mas também no campo de contratos inteligentes e tecnologia blockchain. Não se enganem: qualquer bifurcação, leve ou rígida, prejudicará ainda mais o Ethereum e destruirá sua reputação e apelo."

Após uma inspeção mais aprofundada, as pessoas perceberam que a assinatura era inválida, então esta carta foi escrita apenas por alguém alegando ser o invasor.

Por outro lado, os defensores argumentaram que "o código é a lei" é uma afirmação muito drástica e que os humanos deveriam ter a palavra final por meio do consenso social. O hacker não deveria ter permissão para lucrar com a exploração, pois é eticamente errado e muito provavelmente ilegal. Mas o mais importante, a DAO era simplesmente grande demais para falhar. Ela detinha cerca de 15% do fornecimento total de ether.

#### Ethereum Classic (14:34) {#ethereum-classic-1434}

Em um evento que ecoou a crise financeira de 2008, os desenvolvedores do Ethereum resgataram a DAO. Vitalik Buterin, o criador e desenvolvedor líder do Ethereum, não se desculpou por pressionar por uma bifurcação. Em uma entrevista, ele disse mais tarde: "Alguns usuários de Bitcoin veem a bifurcação rígida como, de certa forma, uma violação de seus valores mais fundamentais. Pessoalmente, acho que esses valores fundamentais, levados a tais extremos, são bobos."

Essas visões dominaram a maioria da comunidade Ethereum. Um voto controverso da comunidade — onde um ether equivale a um voto — mostrou 87% de apoio à bifurcação. Então, no bloco 1.920.000, nós de computador em todo o mundo atualizaram seus softwares e aceitaram a bifurcação. Todo o ether da DAO e das DAOs filhas foi movido para um contrato de reembolso.

Mas não termina aí. A blockchain original do Ethereum — aquela com o hack da DAO — continuou. Na verdade, estava crescendo. Os mineradores que se opuseram à bifurcação continuaram a minerar blocos e as transações ainda estavam sendo feitas. No dia seguinte, a Poloniex listou a moeda e ela começou a ser negociada a US$ 2 cada. Essa cadeia ficou conhecida como Ethereum Classic — a blockchain original e inalterada.

Se você possuísse ether antes da bifurcação, agora teria um Ethereum e um Ethereum Classic. Se você possuísse um ether na DAO, seria capaz de sacar um Ethereum do contrato de reembolso. E se você tivesse acabado de hackear a DAO, teria feito uma fortuna decente em Ethereum Classic — cerca de sete milhões de dólares.

#### O legado da DAO (16:14) {#legacy-of-the-dao-1614}

Inicialmente, o Ethereum Classic ganhou força como uma alternativa, com uma forte comunidade de fundamentalistas de blockchain que discordavam do resgate. Mas desde então, o Ethereum Classic não conseguiu ganhar tração e só existe realmente como uma ideia com pouca utilidade. Enquanto o Ethereum abriga milhares de protocolos, o Ethereum Classic tem apenas alguns básicos. Fica claro que a bifurcação havia vencido.

Dois meses depois, o Robin Hood transferiu 2,9 milhões de seu Ethereum Classic para a Poloniex e vendeu tudo por Ethereum em uma tentativa de derrubar o preço. 14% foram convertidos com sucesso, mas 86% foram congelados pela Poloniex e devolvidos ao grupo. O Robin Hood configurou um contrato de reembolso na rede Ethereum Classic para os usuários afetados pelo hack da DAO.

Quanto ao hacker, ele saiu com 3,6 milhões de Ethereum Classic — no valor de 150 milhões de dólares hoje. Mas se não houvesse bifurcação, esses 3,6 milhões de Ethereum valeriam mais de sete bilhões de dólares hoje.

#### O impacto duradouro da DAO (17:26) {#the-daos-lasting-impact-1726}

É importante notar que a DAO agora é comumente chamada de Genesis DAO para evitar confusão, porque foi a primeira DAO, mas definitivamente não a última. Apesar dos contratempos iniciais, as DAOs só se tornaram mais populares. A MakerDAO governa a stablecoin DAI, e protocolos de finanças descentralizadas (DeFi) como o Uniswap com seu token UNI geralmente têm uma DAO de governança. Todas essas DAOs foram construídas a partir das experiências de projetos anteriores para criar organizações ainda mais versáteis e bem-sucedidas.

Mas a Genesis DAO foi a primeira de seu tipo, criada como um experimento — um experimento caro — controlando 250 milhões de dólares em seu pico, ou 15% do fornecimento total de Ethereum. Christoph Jentzsch, o desenvolvedor líder, esperava que arrecadasse apenas cinco milhões de dólares e mais tarde disse que se arrepende de não ter estabelecido um limite. Para um experimento tão grande, era muito cedo e certamente grande demais para falhar.

Criar um contrato inteligente é como desenvolver um carro autônomo — é uma grande responsabilidade que exige testes extensivos para evitar acidentes. Mesmo com essa nova cautela, os protocolos DeFi ainda são hackeados em mais de 50 milhões de dólares, alguns até mesmo depois de serem auditados por empresas de auditoria profissionais. Mas desde o hack da DAO, não houve mais resgates. A comunidade Ethereum está mais forte agora e pronta para seguir em frente com projetos ainda maiores e mais ambiciosos, construindo a próxima geração de aplicativos digitais.