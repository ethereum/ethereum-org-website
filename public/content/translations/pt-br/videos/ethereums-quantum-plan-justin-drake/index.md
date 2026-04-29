---
title: "O plano quântico do Ethereum antes do Dia Q com Justin Drake"
description: "Uma entrevista com Justin Drake, pesquisador da Fundação Ethereum, cobrindo o roteiro pós-quântico do Ethereum, o roteiro do Lean Ethereum e uma discussão honesta sobre riscos existenciais."
lang: pt-br
youtubeId: "wURmzLKhJco"
uploadDate: 2025-07-15
duration: "1:12:30"
educationLevel: advanced
topic:
  - "roteiro-e-prioridades"
format: interview
author: Bankless
breadcrumb: "Justin Drake"
---

Uma entrevista com **Justin Drake**, pesquisador da Fundação Ethereum, cobrindo o roteiro pós-quântico do Ethereum, a visão do Lean Ethereum, os avanços na verificação formal e uma discussão franca sobre o risco existencial da IA.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=wURmzLKhJco) publicada pelo Bankless. Ela foi levemente editada para facilitar a leitura.*

#### Introdução e a ameaça quântica (0:00) {#introduction-and-the-quantum-threat-000}

**Justin Drake:** Uma mudança de mentalidade interessante para mim nos últimos meses é que parei de pensar no pós-quântico como um obstáculo que temos que superar e penso nisso mais como uma oportunidade. É uma oportunidade para o Ethereum se destacar como o primeiro sistema financeiro global que é seguro no cenário pós-quântico, não apenas em relação aos seus concorrentes como o Bitcoin e outros, mas também em relação às moedas fiduciárias e às finanças tradicionais (TradFi). E acho que isso enviaria uma mensagem muito forte e seria uma espécie de argumento de venda de segurança muito natural para o mundo migrar para o Ethereum.

**Ryan Sean Adams:** Nação Bankless, estamos mais uma vez com Justin Drake. Vamos falar sobre computação quântica e sua relação com cripto, Bitcoin e também Ethereum. Justin, bem-vindo de volta ao podcast.

**Justin Drake:** Olá, pessoal. Obrigado por me receberem novamente.

**David Hoffman:** Então, a questão quântica se tornou uma grande ameaça iminente para a nossa indústria. Nós sempre soubemos disso de certa forma. Tem sido algo amplamente teórico. Nos últimos seis meses, mais ou menos, a questão quântica passou firmemente de teórica para algo que impacta materialmente a nossa indústria. Começando apenas pelo preço do Bitcoin, porque gestores de fundos — até mesmo a BlackRock publicou artigos sobre a ameaça quântica à segurança e, portanto, ao valor do Bitcoin. Então, temos visto de forma anedótica pessoas reduzindo o peso do Bitcoin em seus portfólios. Talvez isso também esteja suprimindo o preço de todos os outros ativos da indústria.

Não apenas para falar sobre preço, mas pelo que entendemos, a questão quântica realmente impacta a maneira como as blockchains funcionam. Então, este parece ser um problema fundamental da nossa indústria como um todo. Um obstáculo que a nossa indústria tem que superar — quando cripto e blockchain foram criadas em primeiro lugar, não estávamos equipados para nos tornarmos pós-quânticos como indústria. Então, talvez para começar com um pouco de contexto, qual é o cronograma aqui? Quando esse obstáculo vai chegar? Já ouvi chamarem isso de Dia Q (Q-Day). Quando é o Dia Q? Quanto tempo temos para superar esse obstáculo quântico?

**Justin Drake:** Sim. Então, eu só quero voltar um pouco e enfatizar o que você disse, que é que nos últimos 6 a 12 meses, tivemos grandes avanços. Um deles é essa noção de correção de erros. Somos capazes de passar dos chamados qubits físicos, que são muito ruidosos e propensos a erros, para qubits perfeitamente lógicos. No momento, podemos basicamente fabricar um qubit lógico, mas ainda é um momento muito importante de zero a um e agora trata-se de escalá-lo para múltiplos qubits lógicos. Outro grande avanço é no lado algorítmico. Anteriormente, pensávamos que seriam necessários milhões, na verdade dezenas de milhões de qubits físicos para quebrar nossa amada criptografia. Mas no ano passado houve um artigo que trouxe uma melhoria de 10x, reduzindo isso para 1 milhão de qubits físicos. E este ano temos outra melhoria de 10x, reduzindo para 100.000 qubits.

Então, as metas estão se aproximando cada vez mais, e você tem essa dupla exponencial de certa forma que eventualmente se cruzará. E então outra coisa que aconteceu é no lado dos investimentos — muitas das startups quânticas têm levantado bilhões de dólares. No ano passado, acredito que estamos falando na ordem de US$ 5 bilhões, o que é sem precedentes. Anteriormente, falávamos de centenas de milhões. E acho que a culminação de todas essas coisas realmente energizou o público e levou a essa narrativa que, de fato, impactou potencialmente o preço do Bitcoin e do ether.

Agora, projetando para o futuro, meu Dia Q pessoal é em 2032. Esta é uma visão um pouco otimista no sentido de que é possível que eles cheguem um pouco mais tarde, mas precisamos estar preparados para o pior cenário. Então, eu diria que há pelo menos 1% de chance de que o Dia Q seja em 2032, mais provavelmente uma porcentagem de dois dígitos. Vários especialistas dirão algo entre 2031 e 2038. Um dos meus amigos na indústria, Steve Bryley, fundador e CEO de uma das maiores empresas de correção de erros quânticos do mundo, que por acaso está sediado em Cambridge, onde estou — seu Dia Q pessoal era 2032, mas ele tem essa data há 15 anos

#### Quando é o Dia Q e como nos preparamos? (5:08) {#when-is-q-day-and-how-do-we-prepare-508}

e sempre permaneceu o mesmo.

**Ryan Sean Adams:** Uau, isso é uma continuidade impressionante.

**Justin Drake:** E basicamente, você só precisa extrapolar as exponenciais e é aí que você chega. E então o que estamos tentando fazer com o Ethereum é garantir que tenhamos tudo concluído bem antes de 2032. E minha data de conclusão para que o Ethereum seja totalmente seguro pós-quântico é 2029.

**David Hoffman:** Então, um ano atrás, tivemos você aqui com Scott Aaronson, que é uma espécie de padrinho neste espaço. Fizemos algumas perguntas sobre o Dia Q. Uma boa definição do Dia Q é o dia em que os computadores quânticos poderão quebrar nossos esquemas de assinatura como o ECDSA? É isso que o Dia Q realmente significa?

**Justin Drake:** Sim, exatamente. Então, temos esse novo termo chamado CRQC — computador quântico criptograficamente relevante (na sigla em inglês). Se você apertar um pouco os olhos, o Q no meio vira um O e fica parecendo um crocodilo, "croc". É aí que se torna relevante para nós. É possível que haja outras aplicações que tornem os computadores quânticos úteis para a química ou a física, mas isso virá um pouco mais tarde.

**David Hoffman:** Lembro-me dele dizendo que estava evitando se comprometer na época. Isso foi há um ano, em janeiro de 2025, e ele disse que dentro de 10 anos deveríamos ter computadores quânticos úteis e tolerantes a falhas, mas ele teve muito cuidado ao dizer que isso não significava que seríamos capazes de quebrar o ECDSA. Ele não quis se comprometer com uma data porque disse que era um problema de engenharia incrivelmente difícil. Percebi que o tom dele mudou ao longo do último ano e, de fato, ele se juntou a algumas organizações e fundações para ajudar as criptomoedas a navegar no mundo quântico. Isso se deve aos três motivos que você enfatiza — avanços em algoritmos, correção de falhas que nos permite escalar qubits lógicos e, em seguida, os bilhões em financiamento de capital de risco (VC) investidos nisso? A opinião dele mudou?

**Justin Drake:** Não posso falar por ele, mas uma coisa que devemos notar é que Scott é principalmente um teórico. Por muito tempo ele esteve trabalhando na teoria, não tanto no dia a dia dos computadores quânticos, e acho que essa foi parcialmente a razão pela qual ele foi tão cauteloso. O que está acontecendo cada vez mais é que existem empresas reais, empreendedores reais construindo essas coisas e ele tem uma visão privilegiada. Ele está basicamente absorvendo todas essas informações. Uma das coisas que ele disse recentemente é que o governo dos EUA está começando a intervir na publicação de ideias. Então, temos empresas e acadêmicos que podem apresentar melhorias para o algoritmo de Shor, e elas não estão sendo totalmente divulgadas, possivelmente por razões de segurança nacional.

#### Qubits físicos, qubits lógicos e a quebra do ECDSA (10:11) {#physical-qubits-logical-qubits-and-breaking-ecdsa-1011}

**David Hoffman:** Uau. Certo. Então parece que os governos estão se envolvendo nisso. Na verdade, não temos certeza de todo o trabalho que está acontecendo nos bastidores — só estamos cientes do trabalho comercialmente viável neste momento. Sobre a parte do qubit lógico, você disse que temos um qubit lógico agora. Existem qubits físicos e qubits lógicos, e o que precisa ser escalado são os qubits lógicos. Para quebrar o ECDSA, de quantos qubits lógicos nós realmente precisamos? Essa é uma métrica que estou observando, mas esse é mesmo o número certo? Ouvi pessoas falarem sobre precisar de mil, ou talvez 1.500. Esse é um número ao qual deveríamos prestar atenção?

**Justin Drake:** Sim, então existem várias métricas relevantes. Há o número total de qubits físicos, o número total de qubits lógicos e também o número total de etapas necessárias para executar o algoritmo. E isso tem um impacto real porque vai determinar se leva um minuto para quebrar uma chave, um dia, uma semana, um mês ou um ano.

**David Hoffman:** E quais são os fatores de escala para cada um deles — físico, lógico e, em seguida, o tempo para executar o algoritmo?

**Justin Drake:** Então, falando de forma geral, o número de qubits físicos para obter um qubit lógico hoje é de algumas centenas — digamos mil. O que deve acontecer é que a qualidade dos qubits físicos, as chamadas fidelidades, deve aumentar, e também devemos criar códigos de codificação de apagamento melhores que melhorarão essa proporção. Portanto, é possível que no futuro precisemos de apenas 100 qubits físicos para cada um lógico, ou talvez apenas 10.

Quando você olha para o algoritmo para quebrar o logaritmo discreto e o ECDSA, de modo geral, é um pequeno múltiplo do número de bits na curva. Estamos trabalhando com essa curva chamada secp256k1. O 256 significa 256 bits. Então você pega esse número e multiplica por cinco ou seis, e isso lhe dará aproximadamente o número de qubits lógicos de que você precisa — então vamos chamá-lo de 1.500. Como hoje estamos em um qubit lógico, de certa forma estamos a três ordens de magnitude de distância, como três saltos de 10x para chegar lá. Mas, novamente, teremos melhorias no lado da correção de erros reduzindo essa proporção, e melhorias no lado algorítmico reduzindo o número de qubits lógicos necessários.

Agora, sobre os tempos de execução, isso é um pouco interessante porque existem dois tipos de computadores quânticos — de clock rápido e de clock lento. O clock rápido opera muito rápido, meio que na velocidade da luz. Você tem os computadores quânticos supercondutores e os computadores quânticos fotônicos — fotônicos, como o nome sugere, usam fótons, luz, o que explica por que é tão rápido. Depois, você tem o clock lento — íons aprisionados e átomos neutros. Os nomes não importam muito, mas, de modo geral, eles operam mil vezes mais devagar. Cada arquitetura e modalidade tem suas próprias vantagens e desvantagens. Portanto, é bem possível que no início possamos ver uma modalidade de clock lento vencer no sentido de que eles serão os primeiros a quebrar uma chave, mas levará muito tempo — pode levar uma semana ou um mês. Então, de certa forma, o Q-Day não é totalmente preto no branco; haverá um período em que estará meio que quebrado, mas apenas para os principais endereços de alto valor.

**David Hoffman:** Interessante. Mas o Q-Day também pode acontecer nos bastidores sem sabermos o quão avançados realmente estamos.

**Justin Drake:** Sim. E se de fato for um estado-nação que terá acesso a esses computadores quânticos primeiro, a menos que cripto desempenhe um papel sistêmico importante no mundo, o mais provável é que eles usem seus poderes para atacar as coisas de forma furtiva — por exemplo, espionar seus adversários. Então isso joga a nosso favor. Mas se você estiver lidando com uma entidade puramente racional motivada por dólares, eles podem de fato ir atrás do Bitcoin ou do Ethereum.

#### Data centers quânticos e o cenário de ataque do Q-Day (15:10) {#quantum-data-centers-and-the-q-day-attack-scenario-1510}

**David Hoffman:** Última pergunta sobre qubits. Os data centers de computação quântica estão sendo construídos agora? Temos essa construção massiva de data centers para IA. Algo semelhante está começando a acontecer com os computadores quânticos?

**Justin Drake:** Sim. Eu estava lendo este comunicado à imprensa da Continuum. Eles estão construindo um computador quântico baseado em fotônica e são muito discretos. Eles arrecadaram muito dinheiro — bilhões de dólares, em parte do governo australiano — e eles meio que querem construir computadores quânticos de uma só vez. Muito do que outras empresas estão fazendo é construir pequenas provas de conceito e depois expandir, mas eles querem construir a coisa toda desde o primeiro dia. Então eles estão construindo esse data center massivo. Acho que isso se deve à modalidade — a fotônica não exige as temperaturas realmente frias que algumas outras modalidades, como a supercondutora, exigem. Então você pode pegar um data center com aparência muito mais tradicional e colocar seu computador quântico lá.

**Ryan Sean Adams:** Você acabou de falar sobre como o Q-Day não é realmente preto no branco. Há várias coisas diferentes sobre uma blockchain que são relevantes para a questão quântica, cada uma com um nível diferente de suscetibilidade quântica. Mas eu quero assumir a posição de que, na verdade, o Q-Day é um evento agudo e específico — é quando o ataque real acontece e, como resultado, algo quebra. Talvez isso seja diferente para blockchains diferentes, porque os perfis de risco de diferentes blockchains não são uniformes. Mas podemos falar sobre o Q-Day para o Bitcoin sob a suposição de que o Bitcoin não faça nada. Se assumirmos que o Bitcoin não se adapta, há um dia específico em que o Bitcoin é atacado. Como seria isso? O que aconteceria naquele dia? Qual é o alvo mais fácil para um computador quântico atacar o Bitcoin?

**Justin Drake:** Basicamente, você precisa olhar para os incentivos para atacar. O movimento racional para um invasor é ir atrás dos maiores endereços e, na verdade, talvez até antes disso, ir atrás de endereços onde haja privacidade perfeita ou endereços onde haja negação plausível. Deixe-me analisar isso um por um. O primeiro alvo provavelmente será a Zcash, porque se você atacar a Zcash, poderá cunhar um número arbitrário de ZEC e ninguém saberá. Portanto, o Q-Day não se tornará público.

**David Hoffman:** Espere, só para esclarecer — a Zcash não é segura contra ataques pós-quânticos no momento? Mesmo usando ZK-SNARKs e tudo isso?

**Justin Drake:** Sim, ela está usando SNARKs que são baseados em curvas que estão sujeitas a serem quebradas por computadores quânticos.

**David Hoffman:** Certo. E então um conjunto potencial de vítimas pode ser de pessoas que morreram e simplesmente perderam suas moedas. Se alguém roubar suas moedas, ninguém vai reclamar — há uma certa dose de negação plausível.

**Ryan Sean Adams:** Mas nós notaríamos isso, quero dizer, se começássemos a ver moedas de pessoas—

**Justin Drake:** Sim e não, porque já estamos vendo isso hoje. A cada trimestre, mais ou menos, há algum endereço zumbi que não se move há 13 anos, e eles ressuscitam, e ninguém sabe o motivo real.

**Ryan Sean Adams:** Certo? É como uma carteira de Bitcoin de 13 anos que não teve uma transação desde que mineraram os 50 bitcoins há uma eternidade, e ela faz sua primeira transação em 13 anos. Se essa pessoa ainda está viva e apenas acordando uma carteira inativa ou se é um ataque de computação quântica — um observador ingênuo apenas olhando para a blockchain do Bitcoin não consegue notar a diferença.

**Justin Drake:** Exatamente. Sim. E então você provavelmente iria atacar os peixes grandes, que podem ser alguma corretora que não implementou a infraestrutura correta para se proteger. Acontece que há uma mitigação muito fácil para computadores quânticos, pelo menos para os primeiros — não reutilize seus endereços. Quando você reutiliza seu endereço, você reutiliza a chave pública, e isso significa que um invasor tem tempo para quebrar a chave privada correspondente e, em seguida, roubar seus fundos na segunda vez que você usar o endereço. Portanto, a melhor prática deve ser que, se você estiver mantendo fundos em armazenamento frio de longo prazo, deve ser um endereço limpo para o qual a chave pública correspondente nunca foi revelada. Só para deixar isso bem claro: o que um computador quântico permite que você

#### Endereços vulneráveis de Bitcoin e as moedas de Satoshi (20:08) {#vulnerable-bitcoin-addresses-and-the-satoshi-coins-2008}

fazer é ir da chave pública de volta para a chave privada. Então, isso realmente compromete as bases da propriedade.

**Ryan Sean Adams:** Então, moedas inativas há muito tempo, não importa em qual blockchain, que tiveram sua chave pública exposta — o que não são todas as moedas inativas, mas uma grande porcentagem — estão em risco. Estas são as moedas de Satoshi. Satoshi tem suas moedas em uma carteira que as pessoas conhecem. É por isso que as chamamos de moedas de Satoshi, porque sabemos onde elas estão. Qual porcentagem de bitcoins é suscetível a isso?

**Justin Drake:** Sim, então existe esta página da web chamada "Qisk List" — escrita com Q em vez de C — desta empresa chamada Project 11, onde eles têm este painel que oferece uma visão ao vivo de endereços vulneráveis. Acredito que seja na ordem de 35%.

**David Hoffman:** 35% dos bitcoins.

**Justin Drake:** Sim. Então, milhões de Bitcoin — digamos seis ou sete milhões. Sim, isso são centenas de bilhões de dólares. E você está certo de que isso inclui o cerca de 1 milhão de BTC que Satoshi possui. Agora, uma das características interessantes dos BTC de Satoshi é que eles estão todos em incrementos de 50 Bitcoin, porque essa era a recompensa de bloco e ele usava um endereço novo toda vez que minerava. Era assim que o software padrão era programado naquela época. Se levar, digamos, um dia ou até 10 minutos para hackear uma chave pública, você verá as moedas de Satoshi sendo drenadas aproximadamente na mesma taxa em que foram mineradas naquela época — uma vez a cada 10 minutos ou mais.

Será um processo estendido ao longo do tempo. E uma consequência interessante é que, se você é um peixe pequeno e tem significativamente menos de 50 bitcoins em seu endereço, então você está bem. Você está meio que protegido por Satoshi antes de você.

**David Hoffman:** Certo?

**Justin Drake:** Sim. Exatamente.

**Ryan Sean Adams:** Na analogia de fugir de zumbis, você só precisa não ser o mais lento. Neste caso, precisamos não ter as maiores carteiras que são quanticamente inseguras, porque eles simplesmente irão atrás das carteiras maiores.

**Justin Drake:** Exatamente.

**David Hoffman:** Então o Dia Q acontece em um cenário do Justin Drake — talvez a Zcash seja a primeira a sofrer alguma forma de ataque, então você pode ver alguns endereços onchain que não são muito perceptíveis porque o invasor não vai querer chamar atenção para isso. Alguns endereços no Bitcoin, mas então o invasor intensificaria as coisas e iria atrás de fontes de tesouro cada vez maiores. Agora, meu entendimento a partir dos artigos do Nick Carter é que há uma parte do suprimento de Bitcoin no cenário de moedas perdidas — ou o indivíduo faleceu, perdeu suas chaves privadas, ou é o próprio Satoshi. Acho que o Nick estimou o limite mínimo em 1,7 milhão de Bitcoin, o que seria 8,6% do suprimento minerado. Isso é menos do que os 35% suscetíveis a ataques. As pessoas que tentam ficar um passo à frente do ataque zumbi se moverão para endereços não suscetíveis. Mas se as moedas estiverem perdidas, se não houver acesso às chaves privadas, você não pode movê-las. E então outras estimativas dizem que pode chegar a 15% de Bitcoin suscetível. Quais números você tem visto?

**Justin Drake:** Sim, então o número aproximado que tenho em mente está alinhado com esses. São cerca de 2 milhões de Bitcoin, digamos 10%. Temos 1 milhão do Satoshi e depois aproximadamente outro milhão que não se move há muito tempo. Precisamos descontar um pouco disso porque alguns endereços zumbis são legítimos e vão reviver, mas também devemos aumentar porque pode haver alguns endereços gastos recentemente que serão perdidos. Então, 5 a 15% é a faixa correta. Eu apostaria em torno de 10–12%, o que é muito considerável — definitivamente na casa das centenas de bilhões de dólares.

#### O debate entre queima e resgate para o Bitcoin (25:24) {#the-burn-vs-salvage-debate-for-bitcoin-2524}

Pode-se pensar um pouco sobre a teoria dos jogos aqui. A opção A é tentar queimar as moedas. A vantagem é que você não tem as centenas de bilhões de dólares de pressão de venda. Se você analisar isso com uma visão de curto prazo, essa é a jogada racional. Mas toda a história do Bitcoin é sobre fortes direitos de propriedade, então, se você tiver uma visão de longo prazo, não deveria querer queimar as moedas. É muito difícil saber qual caminho a comunidade seguirá. É possível que, no final, a decisão seja tomada por grandes detentores — por exemplo, Michael Saylor e a MicroStrategy. Porque esses grandes detentores receberão uma cópia de ambas as versões do Bitcoin — a com a queima e a sem — e eles podem escolher despejar a que não gostam. E sabemos que Saylor é a favor da queima, então ele pode, sozinho, potencialmente manipular o mercado e obter o resultado que deseja.

**Ryan Sean Adams:** Podemos ser claros sobre o que você quer dizer? Duas opções para quem? Então, temos um cenário pós Q-Day — se você acredita que o Q-Day está chegando, teremos, digamos, 10% de todo o suprimento de Bitcoin que pode ser atacado por quem tiver o melhor computador quântico. Eles podem entrar e pegar o Bitcoin ao longo de dias, semanas e talvez meses, esvaziando esses endereços um por um. E esses 10% podem ser levados por alguém. Você está dizendo que a comunidade do Bitcoin tem opções sobre o que fazer com esses 10% na camada social, a camada de bifurcação rígida. Essas opções são duas.

Ou eles podem queimar ou congelar as moedas — efetivamente dizer que esses são endereços mortos, sabemos que estão mortos, não queremos que sejam suscetíveis a ataques quânticos, então faremos uma bifurcação rígida e diremos que essas moedas nunca deverão ser movidas. São 21 milhões menos os 10% que foram congelados. Essa é uma opção.

A outra opção é simplesmente deixar esses 10% para quem conseguir criar o computador quântico ir reivindicá-los. Quase como resgatar um naufrágio — quem construir o submarino para pegar o ouro pode reivindicá-lo. Mas essas são opções forçadas. Não importa o que aconteça, se o Q-Day acontecer, a comunidade do Bitcoin terá que escolher uma dessas duas. Ou intervir, queimar e congelar, ou deixar para qualquer força comercial ou geopolítica que tenha a capacidade de desenvolver computadores quânticos e ir reivindicar o prêmio. É isso que estamos dizendo?

**Justin Drake:** Sim, isso foi muito bem dito. Mas uma pequena correção: isso não precisa acontecer no Q-Day ou depois do Q-Day. Pode acontecer antes. A qualquer momento, a comunidade do Bitcoin ou algum subconjunto dela pode propor fazer uma bifurcação. No número do bloco da bifurcação, haveria duas versões do ativo Bitcoin — assim como na bifurcação do Bitcoin Cash. E, em última análise, isso é decidido pelo mercado. As exchanges configurarão as duas versões do ativo e o mercado decidirá qual é o verdadeiro Bitcoin. E é possível que, apenas por causa da dinâmica de liquidez de curto prazo, a versão que queima as moedas, potencialmente antes do Q-Day, seja a que vença.

#### O cenário de Michael Saylor e os pontos de Schelling (30:29) {#the-michael-saylor-scenario-and-schelling-points-3029}

**Ryan Sean Adams:** Certo. Então eu sou o Michael Saylor, possuo de 2 a 3% da oferta de Bitcoin, especialmente a oferta líquida. Eu recebo ambas as cópias. Estamos fazendo uma bifurcação na blockchain do Bitcoin, assim como nas guerras de bifurcação do Bitcoin de 2017. Quero preservar meu valor, então vendo todos os bitcoins que são suscetíveis a ataques quânticos e mantenho todos os bitcoins na versão que queimou as moedas suscetíveis a ataques quânticos. O preço da blockchain intocada cai. O preço da versão com queima permanece alto porque ninguém a está vendendo — Saylor não está vendendo, a BlackRock não está vendendo. Então você está dizendo que o preço do Bitcoin com a solução quântica será mais alto e, pelas forças do mercado, se tornará o Bitcoin canônico.

**Justin Drake:** Sim. E o Michael pode até decidir comprar a versão com queima usando os lucros da versão vulnerável e passar de 5% para 5,5%.

**David Hoffman:** Certo? Mas isso não significa que precisa haver algum nível de coordenação de cima para baixo sobre quais carteiras serão congeladas? Claramente podemos rotular as moedas do Satoshi e congelá-las, mas então temos que congelar mais algumas. Existem algumas carteiras sobre as quais podemos ter uma certeza razoável — aquela pessoa está morta. Mas, na verdade, não sabemos onde traçar a linha sobre quais carteiras são válidas para serem congeladas e quais são realmente de propriedade de humanos que estão apenas inativos. Existe uma linha clara?

**Justin Drake:** Bem, existe um conceito chamado ponto de Schelling — na ausência de um coordenador central, como você chega a um consenso? Para o Bitcoin, o ponto de Schelling pode ser o bloco onde ocorre um halving. Você pode escolher o primeiro halving, o segundo halving ou o terceiro halving. Isso parece razoavelmente neutro e crível — qualquer moeda que não tenha se movido desde o segundo halving é considerada queimada.

**David Hoffman:** Então nós apenas escolhemos uma data e dizemos, ei, se você deixar seus bitcoins em uma carteira quântica insegura até esta data, nós vamos queimar suas moedas nesta blockchain secundária que vamos bifurcar.

**Justin Drake:** Sim, há um espaço de design relativamente amplo e algumas pessoas têm tentado ser criativas. Por exemplo, algumas pessoas estão tentando resolver dois problemas de uma só vez — tanto o problema quântico quanto o problema do orçamento de segurança — onde a proposta é pegar os 2 milhões de moedas e, em vez de queimá-las, adicioná-las à emissão. Isso empurra o problema do orçamento de segurança com a barriga.

**David Hoffman:** Aposto que isso se torna ainda mais ambicioso em termos de coordenação do Bitcoin. Não sei se você quer sobrecarregar a capacidade de coordenação do Bitcoin.

**Justin Drake:** Sim. Se eu fosse um apostador, apostaria apenas na queima muito simples, digamos, após o segundo halving.

**David Hoffman:** Certo.

**Ryan Sean Adams:** Isso é tão difícil, no entanto, porque, voltando ao seu ponto anterior, Justin, isso destrói a narrativa de incorruptibilidade, a narrativa dos direitos de propriedade. Qualquer decisão sobre um congelamento ou queima destrói um pouco a natureza pura do que o Bitcoin é. Então, Nick Carter em seus ensaios passa por uma história diferente — não um cenário de queima e congelamento, mas o cenário de resgate. Em seu cenário, um laboratório quântico privado quebra o ECDSA antes do previsto. Por acaso, eles são baseados nos EUA. O governo dos EUA os nacionaliza rapidamente em segredo. Eles começam a adquirir o Bitcoin, coordenam com a Tesouraria, coordenam com os grandes provedores de ETF, a BlackRock, os Michael Saylors do mundo. E no final, os EUA acabam com 10% da oferta de Bitcoin na Tesouraria. Ele passa por gráficos de preços fictícios — quando as pessoas percebem que a rede Bitcoin está sob ataque quântico, o preço despenca 73%. Mas então, quando é revelado que o governo dos EUA o possui e eles estão usando leis de resgate marítimo para confiscá-lo legalmente, o mercado se recupera porque os EUA têm essa tesouraria de reserva estratégica de Bitcoin. Então esse é o outro cenário dele. Você acha isso plausível? Porque pelo menos nesse cenário você não está violando nenhum direito de propriedade.

Certamente é incrível que isso venha a acontecer com uma rede de vários trilhões de dólares com uma recompensa tão grande. É sem precedentes. Mas isso também pode acontecer, e talvez seja um resultado melhor para o Bitcoin.

#### Prova de frase semente e o problema do tamanho da assinatura pós-quântica (35:06) {#proof-of-seed-phrase-and-the-post-quantum-signature-size-problem-3506}

**Justin Drake:** Sim. Então, eu tenho algumas considerações. A primeira é que existe uma maneira bastante sofisticada de provar a propriedade de Bitcoin sem passar pela chave privada. Isso é conhecido como prova de frase semente. A maneira como você deriva um endereço de Bitcoin ocorre em três etapas: etapa um, você gera sua frase semente; etapa dois, você faz algumas manipulações na frase semente, incluindo a geração de hash, para derivar sua chave privada; então, a partir da chave privada, você deriva a chave pública, que é o endereço que vai onchain. Agora, a chave privada infelizmente não é mais algo que possa provar a propriedade. Mas, por causa da etapa de geração de hash, se você souber sua frase semente, isso ainda é uma prova de propriedade. Então, uma coisa que poderia acontecer — e, tecnicamente falando, é o caminho mais sólido a seguir — é congelar o Bitcoin, mas permitir que qualquer pessoa reviva seu Bitcoin com uma prova de frase semente.

Agora, a prova de frase semente é infelizmente bastante complicada. Ela exige um SNARK, uma prova de conhecimento zero, então isso complicaria significativamente o Bitcoin. Mas minha previsão é que o Bitcoin terá SNARKs para resolver o problema de tamanho das assinaturas pós-quânticas. O Bitcoin é muito conhecido por não querer aumentar o tamanho do seu bloco. Infelizmente, as assinaturas pós-quânticas são cerca de 10 vezes maiores que o ECDSA. Para dar os números concretos: o ECDSA tem 64 bytes, uma assinatura minúscula. A menor assinatura pós-quântica padronizada pelo NIST é a Falcon, que tem 666 bytes — mais de 10 vezes maior. Se você ingenuamente trocar o ECDSA por algo seguro pós-quântico sem aumentar o tamanho do bloco, sua vazão cai cerca de 10 vezes. Seu TPS no Bitcoin passará de três para 0,3, o que, na minha opinião, é inviável.

O que estamos construindo para o Ethereum é essa tecnologia sofisticada de agregação de assinaturas pós-quânticas para que você não coloque as assinaturas brutas onchain, mesmo que sejam grandes — você coloca apenas essa prova de agregação. E minha aposta é que o Bitcoin vai adotar a solução que o Ethereum desenvolver, porque simplesmente não há outro caminho tecnicamente sólido a seguir.

**Ryan Sean Adams:** Entendo. E é por isso que você está apostando contra o cenário de resgate — porque você acha que eles seguirão essa abordagem e, se o fizerem, isso lhes dará uma maneira de congelar os ativos de forma mais neutra e crível. Se você puder provar a propriedade, poderá acessar o antigo Bitcoin legado.

**Justin Drake:** Sim. Agora, infelizmente, se você é um maximalista dos direitos de propriedade, isso não é completamente satisfatório.

**Ryan Sean Adams:** Não.

**Justin Drake:** E o motivo é que há um subconjunto dos endereços congelados para os quais não há uma frase semente conhecida. O padrão de frase semente só surgiu vários anos após a gênese. Portanto, todos os endereços iniciais — todos os endereços do Satoshi, por exemplo — não terão uma frase semente correspondente. E existem algumas carteiras, por exemplo, carteiras baseadas em MPC, onde não há uma frase semente correspondente. Então não é uma solução perfeita, mas resolve 80%.

**David Hoffman:** Que bagunça. Isso é uma grande bagunça, não importa como você olhe.

**Justin Drake:** Sim. A outra coisa que eu queria destacar é que muitas pessoas pensam que, quando você rouba Bitcoin, o preço do BTC vai despencar e o ativo que você roubou não valerá nada.

Mas, na verdade, existe uma maneira de fazer hedge do preço do Bitcoin, que é muito fácil — você simplesmente faz short de BTC. Digamos que você saiba com certeza que quebrou a chave privada de uma carteira que contém 100.000 BTC. Você faz um short de 100.000 BTC. Isso garante o seu lucro. E então, não importa o que aconteça com o preço do Bitcoin, você garantiu seu lucro, que pode ser de dezenas de bilhões de dólares.

#### O desafio da camada social do Bitcoin e a vantagem do Ethereum (40:07) {#bitcoins-social-layer-challenge-and-ethereums-advantage-4007}

**David Hoffman:** Agora, eu quero destacar que Justin, você pensa de uma maneira particular, e a forma como você pensa é o motivo pelo qual você está no Ethereum. Se você fosse um Bitcoiner, pensaria de uma maneira diferente. A forma de pensar de um Bitcoiner é muito única, muito distinta — uma espécie de maximalista dos direitos de propriedade. Eu acho que o que o Justin faria se estivesse no comando do Bitcoin é muito diferente do que a maioria geral dos Bitcoiners faria. Não tenho uma pergunta prática aqui, mas só quero destacar isso.

**Ryan Sean Adams:** Ah, sim. O que os Bitcoiners fazem provavelmente não é o que você faria. A acusação de Nick Carter é que, basicamente, o que muitos dos desenvolvedores principais do Bitcoin estão fazendo é enterrar a cabeça na areia e dizer que o Q-Day não é real ou não será real por 20 a 30 anos.

**Justin Drake:** Só para deixar claro, minha previsão de que a queima vai vencer é uma previsão do que eu acho mais provável. Não é o que eu faria — na verdade, eu não tocaria no Bitcoin e abraçaria os direitos de propriedade. Eu não tenho essa preferência temporal curta, e acho que muitos Bitcoiners concordariam comigo. Mas, infelizmente, Michael Saylor tem uma influência tão forte que, de certa forma, o Bitcoin foi centralizado na camada social, e isso vem com grandes poderes e grandes responsabilidades.

**Ryan Sean Adams:** Na verdade, eu concordo com você. É o que eu faria também. Eu deixaria a caça ao tesouro acontecer, o resgate acontecer. Eu não tocaria em nada. Essa é a principal coisa que o Bitcoin faz, e simplesmente deixaria as coisas seguirem seu curso natural. Mas deixe-me fazer a mesma pergunta. Não é apenas uma parte da oferta do Bitcoin que é insegura no cenário pós-quântico — o Ethereum também tem esse problema, mas com uma porcentagem diferente da oferta. Você pode mapear esse mesmo problema? Chegamos a um cenário pós-Q-Day. Alguém está pegando os Bitcoins do Satoshi. O que está acontecendo no Ethereum neste momento? Qual porcentagem da oferta estaria suscetível? Digamos que o Ethereum ainda não tenha resolvido o problema quântico.

**Justin Drake:** Uma vantagem que o Ethereum tem é que não há 5% da oferta controlada por uma única pessoa, Satoshi, que se acredita estar perdida. A outra vantagem é que o Ethereum é menos antigo e teve um preço desde o primeiro dia. Então, havia um motivo para cuidar do seu ether desde o início, enquanto nos primeiros dias do Bitcoin, era apenas dinheiro de banco imobiliário e as pessoas não tinham uma higiene muito boa com suas chaves privadas. Portanto, é muito mais provável que os 1,7 milhão de BTC do Nick Carter estejam realmente perdidos.

Quando eu estava no projeto Ultrasound, uma das coisas que tentávamos fazer era calcular a quantidade de moedas sabidamente perdidas para adicionar ao painel, além da queima. Era uma quantia tão insignificante que nem nos demos ao trabalho.

**David Hoffman:** E quanto ao hack da Parity? Não é uma grande parte?

**Justin Drake:** Sim, muito bem observado. Esse era o item número um da lista. Mas acontece que é um contrato inteligente inutilizado que não é vulnerável a computadores quânticos.

**David Hoffman:** Então o—

**Ryan Sean Adams:** Na verdade, está apenas preso. Não se trata de não ter as chaves privadas. Está literalmente preso.

**Justin Drake:** Está inutilizado. Sim. Exatamente. E depois há alguns estudos de caso de pessoas — se você realmente cavar nas discussões do Reddit, encontrará coisas — mas no grande esquema das coisas, é um total de menos de 0,1%. Essa é a oferta sabidamente perdida. Mas, realisticamente, algumas moedas se revelarão perdidas mais perto do Q-Day. Se eu fosse dar um palpite, estaria na casa dos dígitos únicos baixos — talvez 2, 3, 4, 5%.

**David Hoffman:** Então você acha que no máximo 2–5% da oferta do Ethereum está tanto perdida quanto em endereços que podem ser quebrados por computadores quânticos.

**Justin Drake:** Exatamente. Sim. Se eu fosse fazer uma previsão concreta, diria cerca de 2%, o que é aproximadamente uma ordem de grandeza menor que o Bitcoin. E essa diferença quantitativa tem consequências qualitativas: no caso do Ethereum, eu defenderia fortemente não fazer nada e realmente honrar os direitos de propriedade, porque no fim das contas, 2% não é grande coisa. No caso do Bitcoin, 15% é um problema enorme.

#### A atualização pós-quântica de três camadas do Ethereum (45:05) {#ethereums-three-layer-post-quantum-upgrade-4505}

**David Hoffman:** Então o Ethereum terá que fazer essa mesma escolha. Digamos 3% — se deve congelar e queimar ou apenas deixar ser uma caça ao tesouro. Sua esperança é que sigamos com a opção da caça ao tesouro, o que significa que algum invasor quântico irá capturar esses 1–3% de ether. E se você olhar o panorama geral, estamos basicamente caminhando para que o ether seja um dinheiro muito melhor do que o BTC. Ele será não intervencionista, respeitoso aos direitos de propriedade, seguro contra ataques quânticos e não terá o problema de orçamento de segurança que vai atormentar o Bitcoin em alguns halvings. Então, acho que esta é uma grande oportunidade para o ativo.

**Ryan Sean Adams:** Certo. Já falamos sobre a questão social. Há muitos desafios técnicos que também temos que enfrentar. Quero trazer este tweet do Hasu Kareshi, amigo do programa. Ele estava citando um tweet do Vitalik sobre o roadmap quântico do Ethereum e disse: "O Ethereum tem um roadmap mais difícil para se tornar pós-quântico do que o Bitcoin — na verdade, muitas dependências antes que você possa lidar com EOAs e chaves privadas devido aos tamanhos das provas pós-quânticas." Então, a opinião dele é que os desafios à frente para o Ethereum são muito mais difíceis do que para o Bitcoin. O que você acha?

**Justin Drake:** Há dois problemas para resolver: o técnico e o social. No técnico, Hasu está correto de que há basicamente três problemas que o Ethereum precisa resolver — cada um nas diferentes camadas. Há a camada de consenso, onde temos BLS. Há a camada de dados, onde temos KZG. E a camada de execução, onde temos ECDSA. Cada uma dessas peças de criptografia é vulnerável. Isso é um superconjunto do Bitcoin, que tem apenas o problema do ECDSA. Então, de certa forma, temos três vezes mais coisas para atualizar.

Mas quando você olha o panorama geral, eu diria que o problema maior — talvez 80% dele — é social. Já mencionamos se devemos queimar ou não. Mas há algo ainda mais fundamental: nós sequer aceitamos que isso é um problema? No mundo do Bitcoin, há essa resposta imunológica que basicamente rejeita qualquer narrativa que possa ser ruim para o preço. Você tem pessoas como Adam Back dizendo que os computadores quânticos estão a pelo menos décadas de distância. Então, o passo zero é algum tipo de aceitação de que há um problema. E é possível que o Bitcoin chegue um pouco tarde demais, o que teria consequências muito maiores do que no lado da tecnologia.

**David Hoffman:** Então você acha que, no geral, o Bitcoin terá um problema mais difícil porque a camada social deles simplesmente não está reconhecendo essa realidade e está menos disposta a se envolver?

**Justin Drake:** Sim. Deixe-me dizer o seguinte: estou disposto a apostar uma grande quantia que todas as três camadas do Ethereum serão atualizadas antes da única camada do Bitcoin.

**David Hoffman:** Certo. Então temos um problema três vezes maior. Mas, no lado do Ethereum, é apenas um problema de engenharia no fim das contas. E não apenas isso, é um problema de engenharia que o Ethereum está enfrentando de frente. Enquanto o problema de engenharia do Bitcoin é menor, é um problema social, um problema de coordenação, que é fundamentalmente mais difícil de superar.

**Justin Drake:** Sim. Exatamente. E mesmo no lado técnico, este é um problema no qual estamos trabalhando há quase uma década. Se você voltar a 2018, demos uma doação de US$ 5 milhões para a StarkWare estudar SNARKs pós-quânticos baseados em hash e estabelecer as bases com funções de hash amigáveis a SNARKs. Foi daí que surgiu a função de hash Poseidon. Mais recentemente, em 2024, houve o anúncio da Lean Consensus Chain, anteriormente conhecida como Beam Chain. Tivemos workshops pós-quânticos em Cambridge no ano passado. Agora temos uma equipe dedicada ao pós-quântico com Tom e Emil. E temos este roadmap que

*(50:00)*

#### Atualizando a camada de execução: agregação de assinatura (50:00) {#upgrading-the-execution-layer-signature-aggregation-5000}

realmente detalha alguns dos principais marcos para fazer essas atualizações.

**Ryan Sean Adams:** Podemos falar sobre cada um desses problemas um por um? Eu sei, Justin, que você pode entrar em detalhes extremos com a criptografia — vamos querer manter isso em um nível que o David e eu possamos entender. Mas nós entendemos as diferentes camadas da pilha do Ethereum. Talvez possamos começar com a camada de execução, porque essa tem sido a principal coisa sobre a qual conversamos. ECDSA é o esquema de assinatura por trás dos endereços do Bitcoin e do Ethereum — isso é o que seria quebrado em um mundo pós-quântico. Qual é o caminho de atualização para o ECDSA? Essa é uma ferramenta criptográfica de longa data — temos algo que possa substituí-la?

**Justin Drake:** Sim. Em primeiro lugar, deixe-me destacar que esta é uma tarefa muito grande — estamos mudando fundamentalmente os pilares das blockchains, a criptografia base, e trocando-a por algo novo com propriedades completamente diferentes. Agora, se você fosse um leigo, sua resposta poderia ser: "É simples. Temos o NIST, o Instituto Nacional de Padrões e Tecnologia. Eles criaram uma competição de assinatura pós-quântica e selecionaram algumas — a saber, Falcon, Dilithium e SPHINCS+. Só precisamos escolher uma ou várias dessas opções."

O problema é que o NIST não projetou para o caso de uso de blockchain. Eles projetaram para assinaturas individuais para mensagens individuais usadas na internet. No contexto de blockchains, você tem lotes de transações — para o Bitcoin, milhares de transações por bloco. E temos esse problema de tamanho com as assinaturas pós-quânticas sendo pelo menos 10 vezes maiores, se não 100 vezes maiores. Na minha opinião, é totalmente inviável considerar essas assinaturas individuais ingenuamente empacotadas e concatenadas em blocos.

A única solução que vejo é chamada de agregação de assinatura, onde você pega várias assinaturas e as comprime em uma multissinatura. Verificar essa multissinatura mestre é o mesmo que verificar todos os constituintes individuais. Quando você olha para o espaço de design para assinaturas pós-quânticas agregáveis, não há muitas opções. Há essencialmente uma opção que é viável na minha opinião: fazer uso de SNARKs, especificamente SNARKs pós-quânticos. Há basicamente uma família principal — SNARKs baseados em hash.

A ideia básica é que você pega assinaturas pós-quânticas individuais e prova o conhecimento de todas elas para acabar com uma prova SNARK final. Agora, se você vai usar SNARKs baseados em hash, você também pode usar assinaturas de folha baseadas em hash — as assinaturas brutas não agregadas. O motivo é que isso lhe dá benefícios de simplicidade e segurança. São as suposições de segurança mais mínimas que você pode ter — você está apenas assumindo que sua função de hash é segura. No mundo das blockchains, as funções de hash são fundamentais. Nós as temos em todos os lugares — para construir blocos, árvores de Merkle, árvores de estado e blockchains onde o encadeamento é feito com hashes.

A Fundação Ethereum tem se esforçado muito para começar com assinaturas baseadas em hash e torná-las o mais amigáveis possível aos SNARKs, para que o custo de agregação seja o menor possível. Tenho o prazer de informar que o desempenho dessa abordagem é realmente bom o suficiente para todas as blockchains. Qualquer que seja a vazão da sua cadeia, você pode ter um agregador em um hardware razoável — por exemplo, a CPU de um laptop — agregando todas essas transações e produzindo uma prova final que acompanha o bloco.

E uma das coisas irônicas sobre essa abordagem é que ela é, na verdade, um aumento de escalabilidade em relação ao que temos hoje. O motivo é que você não tem o custo fixo de 64 bytes por transação. As transações têm zero bytes de dados de assinatura e, em seguida, você tem essa assinatura mestre única que é amortizada em todas as transações no bloco.

#### Definindo o padrão da indústria com a colaboração do Bitcoin (55:28) {#setting-the-industry-standard-with-bitcoin-collaboration-5528}

**David Hoffman:** Certo. Então, esta é uma atualização para muitas outras blockchains de contratos inteligentes derivadas do Ethereum, especialmente aquelas que otimizam para velocidade—

**Justin Drake:** Não apenas contratos inteligentes — o Bitcoin também. ECDSA.

**David Hoffman:** Sim. Certo. Então, o que eu pensava ao entrar neste episódio era que cadeias como a Solana seriam sobrecarregadas por assinaturas mais pesadas, assim como o TPS do Bitcoin diminui para 0,3 transações por segundo. A Solana também ficaria mais lenta porque as transações seriam mais pesadas em um mundo pós-quântico. Mas você está dizendo que com essa tecnologia isso não será verdade — na verdade, ela permitirá que as cadeias fiquem amplamente mais rápidas.

**Justin Drake:** Sim, exatamente. Assim como Satoshi com o ECDSA definiu um padrão de fato para toda a indústria — nós basicamente copiamos até mesmo a curva secp256k1, o que é muito incomum. Ninguém sabe por que ele escolheu essa curva, mas ela se tornou o padrão de fato. Acho que há uma oportunidade para o Ethereum ser o pioneiro e definir o padrão de fato.

A estratégia que estamos adotando é colaborar com os Bitcoiners. No mundo do Bitcoin, há alguns indivíduos — Mikhail Komarov e Nick Jonas. Ambos fazem parte da Blockstream e ambos são especialistas em assinatura baseada em hash. Estamos trabalhando com eles para garantir que tudo o que desenvolvermos no mundo do Ethereum também seja aplicável ao Bitcoin. E se o Bitcoin e o Ethereum usarem esse padrão, então toda a indústria presumivelmente também usará o padrão.

**Ryan Sean Adams:** Isso é fantástico. Então, temos uma maneira de resolver a atualização pós-quântica da camada de execução sem perda de desempenho. Mas deixe-me fazer outra pergunta — e quanto à segurança? Esta é uma criptografia mais recente em comparação com o ECDSA, que existe desde sempre e tem o efeito Lindy. Deveríamos nos preocupar com a possibilidade de haver algum tipo de bug oculto ou zero-day que poderia destruir completamente o que construímos?

**Justin Drake:** Tenho algumas considerações aqui. Levamos a segurança extremamente a sério e, no geral, espero que a solução que implantarmos seja ordens de magnitude mais segura do que o que temos hoje com o ECDSA. Deixe-me explicar. O ECDSA é baseado em curvas elípticas — objetos matemáticos estruturados e sofisticados. É possível que algum matemático inteligente crie um algoritmo para quebrar o logaritmo discreto usando algum truque matemático sofisticado que a humanidade desconhecia. Isso já aconteceu no passado — temos algoritmos cada vez melhores para fatoração e para logaritmo discreto. E uma possibilidade com o advento da IA é que tenhamos matemáticos 100 vezes mais inteligentes que os matemáticos humanos que descubram estruturas ocultas em curvas elípticas e possam quebrar nossa criptografia. Portanto, a criptografia que estamos construindo não é apenas pós-quântica, é também pós-IA.

Voltando à outra coisa que eu disse — ela depende apenas de funções de hash. Qualquer esquema de assinatura depende de duas coisas: a função de hash e uma suposição de dificuldade adicional opcional, que pode ser o logaritmo discreto ou, no caso de assinaturas baseadas em reticulados, reticulados estruturados. Mas no caso de assinaturas baseadas em hash, não há essa suposição de dificuldade adicional — são apenas funções de hash. Se a sua função de hash for segura, você está bem. Então, nesse sentido, espero que seja uma melhoria em relação ao status quo.

Agora, há duas ressalvas que quero destacar. A ressalva número um é que estamos lidando com objetos mais complexos, e a solução que temos aqui é o que chamamos de verificação formal profunda de ponta a ponta.

#### Verificação formal, Poseidon e a camada de consenso (1:00:33) {#formal-verification-poseidon-and-the-consensus-layer-10033}

Temos nosso objeto criptográfico e queremos provar matematicamente que ele é sólido — que é impossível forjar uma assinatura. E não queremos fazer isso apenas para a matemática, mas também para o código. Se você tivesse me perguntado há 2 ou 3 anos se isso era viável, eu teria dito que sim, mas era extremamente trabalhoso e caro. O que estamos vendo com o advento da IA é que esse trabalho trabalhoso e caro pode ser feito 100 vezes mais rápido e 100 vezes mais barato.

Estamos começando a ver matemática de ponta de classe mundial — por exemplo, um resultado recente que ganhou a Medalha Fields, o equivalente ao Prêmio Nobel da matemática. Esse resultado foi verificado formalmente por uma IA em cinco dias. Eles produziram meio milhão de linhas de código — uma prova verificável por máquina de que este é de fato um teorema válido — e no processo encontraram todos os tipos de erros de digitação no artigo escrito por humanos. Esse é o tipo de devida diligência que queremos para evitar bugs.

Agora há outra coisa que quero destacar: a própria função de hash. Historicamente, as blockchains foram construídas com SHA-256 no caso do Bitcoin, ou Keccak no caso do Ethereum. Nossa proposta para o Ethereum pós-quântico é introduzir outra função de hash chamada Poseidon, que é um tipo diferente de função de hash porque é amigável a SNARK. Quando lançarmos o Poseidon, ele deve ser bastante seguro — terá sido analisado por 10 anos inteiros, terá protegido muitos bilhões de dólares através das L2s e terá passado por criptoanálise por todos os principais especialistas da área. Também acabamos de anunciar um prêmio de US$ 1 milhão para tentar quebrar o Poseidon. Mas é de fato possível que o Poseidon possa ser quebrado.

Infelizmente, a maneira como você projeta funções de hash é que você não pode provar que elas são seguras. O melhor que você pode fazer é a ausência de um ataque — há basicamente esse tempo de maturação. E a ordem de grandeza que tenho em mente é de oito anos. Por que oito anos? Porque quando Satoshi escolheu o SHA-256, ele tinha oito anos. Quando Vitalik escolheu o Keccak, ele tinha oito anos, coincidentemente. Então eu gostaria que o Poseidon tivesse pelo menos oito anos, o que ele terá quando o implantarmos no Ethereum.

**Ryan Sean Adams:** Certo. Então essa é a camada de execução. Rapidamente, você poderia falar sobre a camada de dados? O KZG precisa ser atualizado para algo pós-quântico, e a camada de consenso onde temos assinaturas BLS. Isso é semelhante em nível de esforço à substituição do ECDSA?

**Justin Drake:** Deixe-me começar com a camada de consenso porque é uma resposta mais simples. Em uma primeira aproximação, é basicamente um copiar e colar. Temos um conceito semelhante onde os atores fazem assinaturas, há muitas assinaturas, elas ocupam espaço e queremos comprimi-las. A questão na camada de consenso é que temos muito mais assinaturas do que na camada de execução. As pessoas não percebem isso, mas temos um milhão de validadores — isso é um milhão de assinaturas por época, 32.000 assinaturas por slot, milhares de assinaturas por segundo. É mais do que a Solana em termos de transações de voto.

Para desbloquear uma certa otimização de desempenho disponível apenas na camada de consenso, temos essa noção de uma assinatura com estado — as mensagens que você assina têm um contador que aumenta a cada vez. Isso não te lembra de algo? O número do slot. No Ethereum, na camada de consenso, você sempre assinará apenas uma única mensagem por slot. Se você assinar duas, você sofre uma penalização. Usamos essa restrição para ter assinaturas que são 10 vezes mais eficientes para agregar.

#### Lean VM, o roteiro do Lean Consensus e o cronograma para 2029 (1:05:17) {#lean-vm-the-lean-consensus-roadmap-and-2029-timeline-10517}

Esta é a principal diferença — funções de hash sem estado na camada de execução versus assinaturas com estado na camada de consenso, onde o número do slot é incrementado. A tecnologia de agregação tem um nome: Lean VM, uma zkVM mínima para criptografia baseada em hash. Basicamente, a Lean VM estaria provando que esta é uma raiz de Merkle correta. A principal coisa da qual ainda não temos certeza absoluta é se essa abordagem pode desbloquear o que chamo de "fronteira do teragás" — 1 gigagás por segundo na l1, 10.000 TPS, mas de forma ainda mais ambiciosa, 1 teragás, 10 milhões de transações por segundo na l2 usando a disponibilidade de dados.

Estamos falando de 1 gigabyte por segundo de disponibilidade de dados, e a questão é se a zkVM pode ter desempenho suficiente para processar 1 GB de dados por segundo. Isso ainda precisa ser determinado com base em otimizações futuras.

**David Hoffman:** Mas o que sabemos com certeza é que o Ethereum terá a DA para ter 1 giga por segundo para a l1 mais um punhado de l2s.

**Ryan Sean Adams:** Então, acho que os ouvintes podem estar pensando neste momento: "Ok, parece que o Ethereum tem um plano de atualização para o pós-quântico. Eles estão reconhecendo que os computadores quânticos existirão e que há um Dia Q." Agora eles estão se perguntando sobre o cronograma e o nível de esforço. Peguei o tweet do roteiro pós-quântico do Vitalik, joguei no Claude e perguntei: "Qual é o nível de esforço aqui?" O Claude disse: "Pense nisso como um nove de dez." Esta é uma das atualizações mais significativas que o Ethereum fará. Nós a comparamos com o The Merge, onde tínhamos um avião em pleno voo e trocamos o motor de Prova de Trabalho (PoW) pelo de Prova de Participação (PoS). Agora estamos trocando grande parte da criptografia principal. Você pode dimensionar isso para nós? Estaremos prontos até 2032? Quão difícil é isso? Parece assustador?

**Justin Drake:** Sim. Duas partes para a resposta. Primeiro, é na verdade ainda mais ambicioso do que você formulou. A mudança na criptografia é tão invasiva que é essencialmente uma reescrita da camada de consenso, pelo menos. E se vamos reescrever a camada de consenso, é melhor reescrevê-la adequadamente — colocar todas as melhorias e limpar toda a dívida técnica. Esse é o projeto Lean Consensus, onde estamos agrupando várias reescritas, incluindo a finalidade de slot único com a atualização pós-quântica.

Então sim, é muito ambicioso. Estamos começando do zero e construindo algo incrivelmente bonito, simples, eficiente e comprovadamente seguro. A boa notícia é que começar do zero é mais simples de muitas maneiras porque você não tem toda a dívida técnica. Podemos reescrever a especificação para ser o mais mínima e simples possível. É daí que vem a terminologia "lean" (enxuto) — simplicidade máxima, onde toda a função de transição de estado é basicamente mil linhas de código Python que um estudante inteligente do ensino médio pode simplesmente ler.

No momento, temos devnets para o Lean Consensus. E as especificações são tão fáceis de absorver que vimos cerca de 10 equipes implementá-las, ingressar na devnet e fazer isso sem sequer entrar em contato com a Fundação Ethereum. A barreira de entrada é relativamente baixa. Estamos neste mundo onde o desenvolvimento de IA significa que você pode, em grande medida, programar seu cliente na intuição ("vibe-code"). Essa é uma grande razão pela qual temos tantos clientes — muitas vezes equipes de uma só pessoa, ou equipes de duas ou três pessoas.

Acho que isso terá consequências interessantes para a sustentabilidade, bem como para a governança. Sobre a governança, a maneira como fazemos isso hoje é, grosso modo,

#### Governança do Ethereum e a data de conclusão em 2029 (1:10:41) {#ethereum-governance-and-the-2029-completion-date-11041}

que temos cinco clientes da camada de consenso e todos eles precisam implementar a atualização para podermos avançar. No futuro, quando tivermos 10 ou 15 clientes, poderemos simplesmente exigir os 80% melhores ou os 80% mais rápidos para avançar. Isso é mais como uma competição darwiniana que nos permite avançar muito mais rápido sem esperar pelo cliente mais lento.

**David Hoffman:** Então estaremos prontos até 2032? Em que momento estaremos prontos?

**Justin Drake:** Todo o roteiro tem tudo planejado até 2029,

**David Hoffman:** O que é basicamente o exato mesmo roteiro que você apresentou na sua palestra na DevCon, onde introduziu a Beam Chain. E naquela época as pessoas odiaram.

**Justin Drake:** Sim, foi o meu slide mais odiado, porque se estendia por quatro anos e meio. Historicamente, tenho sido ruim com prazos — otimista demais. Mas à medida que envelheço e ganho cabelos brancos, tenho melhorado com os prazos. Acho que foi um prazo realista e conservador que deixou as pessoas chateadas. Mas é assim mesmo.

**David Hoffman:** Também apenas para contextualizar, as pessoas ficaram chateadas em parte porque isso foi durante o pico de impulso da Solana em comparação com uma percepção de falta de impulso técnico no roteiro do Ethereum. Não foi apenas o prazo de quatro anos — foi também o contexto do momento.

**Justin Drake:** Exatamente. Então agora estamos a cerca de três anos de distância. Estou relativamente confiante de que podemos atingir o marco de 2029, e acho que há até uma oportunidade de avançar mais rápido graças à IA.

**David Hoffman:** Então, até 2029, tudo isso estaria implementado se seguir o roteiro — tudo o que acabamos de conversar.

**Justin Drake:** Você promete? Tudo.

**Ryan Sean Adams:** Não tem algo na minha cabeça sobre algum desenvolvedor de software veterano me dizendo que reescritas nunca funcionam? Por que isso não se aplica aqui?

**Justin Drake:** Uma boa notícia é que já fizemos esse tipo de grande reescrita, como você mencionou, com o The Merge. Mudamos completamente as bases de consenso do Ethereum de Prova de Trabalho (PoW) para Prova de Participação (PoS). Isso é uma prova de existência de que pode ser feito. O Ethereum não é estranho a projetos ambiciosos — tivemos outras coisas muito ambiciosas como danksharding e amostragem de disponibilidade de dados em uma escala semelhante.

Outra boa notícia é que não temos escolha. Temos que mudar a criptografia. É um fator de pressão muito forte, e só isso já é uma reescrita de 80% de qualquer maneira.

Isso torna a coordenação e a chegada a um consenso muito mais simples.

#### A questão quântica não é apenas um problema cripto (1:15:06) {#quantum-isnt-just-a-crypto-problem-11506}

**David Hoffman:** Acho que devemos enfatizar que não é apenas o Ethereum que não tem escolha — ninguém em cripto tem uma alternativa a isso. Todos em cripto terão que fazer uma reescrita. Com o Bitcoin é apenas o ECDSA, mas isso por si só já é o suficiente.

**Justin Drake:** Sim. É possível que o Ethereum tenha que fazer uma reescrita maior do que outras cadeias, e isso tem a ver com o número de validadores. Se você tem apenas 100 validadores, pode absorver o custo de assinaturas 10 vezes maiores na camada de consenso. Para a maioria das cadeias de Prova de Participação (PoS), você não precisa da sofisticação que temos. Mas para o Ethereum, esperamos ter dezenas de milhares de validadores votando a cada slot — milhares de assinaturas por segundo — e temos que ser muito criativos.

Onde eu concordaria com você é que tem que haver uma mudança muito grande para todas as blockchains na camada de execução. Mas a boa notícia para outras cadeias é que o Ethereum está fazendo todo o dever de casa. Estamos construindo a Lean VM, vamos fazer a verificação formal de tudo isso, e eles podem simplesmente copiar e colar. É, em grande parte, um trabalho fácil de integrar.

**Ryan Sean Adams:** Nick Carter tuitou: "Uma das falácias mais idiotas é as pessoas pensarem que sua moeda vai vencer se apenas o Bitcoin morrer — como o pessoal da Zcash lutando contra o Bitcoin por causa da questão quântica. É exatamente o oposto. Se o Bitcoin morrer, ninguém nunca mais confiará no dinheiro da internet. Todas as moedas pegam carona no sucesso do Bitcoin." Qual é a sua reação a esse sentimento?

**Justin Drake:** Eu discordo do Nick Carter. O Nick sempre ficou chateado quando eu tuíto sobre o orçamento de segurança. Ele acha que é destrutivo para toda a indústria falar sobre isso, mesmo que os fundamentos estejam alinhados com o que eu digo. Ironicamente, ele está fazendo a mesma coisa com a questão quântica que eu estou fazendo com o orçamento de segurança — tentando forçar a discussão e forçar a mudança.

**Ryan Sean Adams:** Mas e quanto à visão mais ampla? Digamos que cheguemos a 2032, o Ethereum seja seguro contra ataques quânticos, o Bitcoin não, o Bitcoin seja atacado de algumas das maneiras que descrevemos — há essa caça ao tesouro acontecendo e incerteza no mercado. O que o Nick está dizendo é para não torcer por isso, porque será ruim para todas as cadeias em cripto. Ele está dizendo que o que acontece com o Bitcoin, acontece com todos. Se você quer um meme de dinheiro da internet como reserva de valor, o Bitcoin tem que liderar esse movimento. Não existe um cenário de "virada" onde o Ethereum possa dizer: "Nossa cadeia é segura pós-quântica e não temos os problemas que o Bitcoin tem." Ele está dizendo que isso vai derrubar todo o espaço cripto, pelo menos de uma perspectiva de reserva de valor de dinheiro da internet.

**Justin Drake:** Eu discordo. Você pode simplesmente olhar para a análise histórica — conchas do mar foram substituídas por sal, depois prata, depois ouro, e agora potencialmente o Bitcoin substituindo o ouro. Só porque o ouro falha não significa que a próxima coisa também tenha que falhar. Eu diria que o Ethereum é o sucessor muito natural do Bitcoin como dinheiro da internet. E só porque o Bitcoin falha não significa que o Ethereum tenha que falhar. Concordo que pode haver alguma dor a curto prazo, mas também estamos falando de ganhos a longo prazo.

#### A oportunidade pós-quântica e o acerto de contas do orçamento de segurança (1:20:27) {#the-post-quantum-opportunity-and-security-budget-reckoning-12027}

**David Hoffman:** Então, o que teremos no final disso? Em 2030, o Ethereum será seguro contra ameaças pós-quânticas porque o Justin prometeu. O que o Ethereum se tornará? Ele será o único de sua classe ou você espera que outras blockchains sigam o exemplo e também alcancem a segurança pós-quântica? Você pode descrever o sistema que teremos em 2030 se tudo isso se concretizar?

**Justin Drake:** Uma mudança de mentalidade interessante para mim nos últimos meses é que parei de pensar no pós-quântico como um obstáculo a ser superado. Penso nisso mais como uma oportunidade. É uma oportunidade para o Ethereum se destacar como o primeiro sistema financeiro global seguro contra ameaças pós-quânticas — não apenas em relação a concorrentes como o Bitcoin, mas também em relação a moedas fiduciárias e TradFi (finanças tradicionais). Acho que isso enviaria uma mensagem muito forte e seria um argumento de venda de segurança muito natural para o mundo migrar para o Ethereum.

Não é apenas uma oportunidade para o Ethereum se distinguir em relação aos seus pares, mas também é uma oportunidade para o Ethereum se tornar a melhor versão de si mesmo. Isso remete à ideia de que a mudança para o pós-quântico é essencialmente uma reescrita e que isso é uma oportunidade enorme para começar do zero e eliminar a dívida técnica.

Um dado interessante: a Beacon Chain original (OG) foi lançada em 2020, e o design foi congelado um ano antes, em 2019. Então, quando lançarmos a Lean Beacon Chain em 2029, estaremos atualizando algo que tem 10 anos de idade. Em cripto, 10 anos é uma eternidade. Aprendemos tanto que a Lean Beacon Chain será muito diferente da Beacon Chain original. Você pode pensar nela como a Prova de Participação (PoS) 2.0.

**Ryan Sean Adams:** Estamos em um momento muito interessante no que diz respeito à computação. Parece haver três plataformas e paradigmas de computação na fronteira: IA, da qual todos estão cientes; quântica, que talvez esteja onde a IA estava em 2018; e cripto e criptografia, exemplificadas por blockchains como Ethereum e Bitcoin. Quase parece que estamos entrando em uma singularidade dessas três coisas, onde a IA está acelerando a quântica e a criptografia, e a criptografia será um contrapeso para alguns dos vetores de centralização da IA. O que você acha de tudo isso?

**Justin Drake:** É muito difícil prever, mas como você disse, há essa coincidência muito estranha em que 2032 parece ser o ano em que a computação em geral atinge a singularidade. As pessoas têm falado sobre a singularidade da IA potencialmente até antes de 2032. Há o "AI 2027", o artigo muito famoso. Não acho que teremos superinteligência em 2027, mas acho que é provável até 2032.

Já estamos começando a ver — apenas ontem, Dario Amodei, um dos veteranos (OGs) da IA, começou a fazer com que a IA se aprimorasse recursivamente de forma autônoma, o que é extremamente assustador. Isso é basicamente o que deve iniciar a curva exponencial em direção à superinteligência.

#### A crise do orçamento de segurança do Bitcoin e o acerto de contas de 2032 (1:25:12) {#bitcoins-security-budget-crisis-and-the-2032-reckoning-12512}

Temos 2032 potencialmente como o Dia Q, e também temos 2032 onde o Bitcoin terá o que acredito ser seu último halving. Você poderia chamá-lo de Dia B — o dia do Bitcoin onde haverá algum tipo de acerto de contas, porque a emissão será baixa demais para protegê-lo.

Em dois anos teremos um halving, e em seis anos, em 2032, teremos outro. A história de segurança do Bitcoin nos últimos 15–16 anos tem sido que as taxas de transação substituirão a emissão. Convido você a olhar os dados — isso simplesmente não está acontecendo. As taxas de transação hoje são 0,6% da emissão. Então, esqueça as taxas de transação.

Teremos um declínio exponencial da segurança do Bitcoin. Hoje, o Bitcoin é protegido por cerca de 10 gigawatts. E aqui está uma estatística impressionante: todos os dias, a China implanta um gigawatt, principalmente de energia solar. Portanto, 10 dias de implantação na China são suficientes para um ataque de 51% ao Bitcoin.

**David Hoffman:** Em termos de custo de energia — essa coisa que protege o Bitcoin — a China está produzindo a mesma quantidade de energia necessária para proteger o Bitcoin a cada 10 dias.

**Justin Drake:** Em termos de consumo de energia, o Bitcoin está consumindo 10 gigawatts. Um gigawatt é aproximadamente uma usina nuclear, então são 10 usinas nucleares. A China está implantando o equivalente a uma usina nuclear todos os dias. E esse é um dos principais gargalos. O outro gargalo é o hardware — um milhão de rigs. Custaria cerca de US$ 10 bilhões para realizar isso, o que, no grande esquema das coisas, é uma verdadeira ninharia, tanto em relação ao valor de mercado do Bitcoin quanto para um invasor de estado-nação.

**David Hoffman:** Quando você fala dessa forma sobre o Bitcoin, quase me faz pensar que você não acha mais que o Bitcoin deveria ser a vanguarda de cripto. A perspectiva é que o Bitcoin tem falhas do ponto de vista do orçamento de segurança e quântico, e o Ethereum vai liderar cripto depois disso.

**Justin Drake:** Continuo otimista em relação à questão quântica — no fim das contas, é um desafio técnico que pode ser superado. O problema maior é o orçamento de segurança, porque isso atinge o DNA central do Bitcoin: o limite de 21 milhões e a Prova de Trabalho (PoW). Não vejo como você pode combinar a Prova de Trabalho e um limite de 21 milhões. Você tem que abrir mão de um.

Existe a possibilidade de que o BTC, o ativo, possa se desvincular do Bitcoin, a cadeia, e viver em uma cadeia mais segura — por exemplo, como um token ERC-20 no Ethereum. Mas dizer essas palavras — os Bitcoiners não pensam assim.

**David Hoffman:** Não, eles não pensam.

**Justin Drake:** E se eu dissesse palavras diferentes como: "Vamos simplesmente remover o limite de 21 milhões porque o orçamento de segurança não é suficiente" — os Bitcoiners também não pensam assim. Eles estão indo muito rápido em direção a um muro, e 2032 é o dia do acerto de contas.

#### Colete agora, descriptografe depois — riscos quânticos além das cripto (1:30:09) {#harvest-now-decrypt-later-quantum-risks-beyond-crypto-13009}

**Ryan Sean Adams:** E quanto à questão quântica em relação ao resto da sociedade? Este não é apenas um problema do mundo cripto. As blockchains são singularmente suscetíveis, mas outros componentes da sociedade também são. Até que ponto um Ethereum pós-quântico representa uma ferramenta para a sociedade resolver e prevenir coisas em um mundo pós-quântico e pós-IA?

**Justin Drake:** Existem basicamente dois tipos de criptografia. Existe a criptografia em tempo real, onde você está assinando mensagens em tempo real sem impacto material em ações passadas. A atualização para o pós-quântico deve ser relativamente simples para a maior parte da internet. Existem algumas exceções — por exemplo, satélites que já foram implantados e literalmente não podem ser atualizados.

Aí existe outro problema com a criptografia: se o material foi criptografado hoje e você não está usando uma criptografia segura pós-quântica, esses dados podem ser descriptografados no futuro. Existe toda essa classe de ataque chamada "colete agora, descriptografe depois". Acho realista que teremos descriptografias em massa na sociedade — muitas mensagens do Signal, mensagens do Telegram ou acervos de mensagens do Gmail sendo todos descriptografados simultaneamente. Isso poderia ter um impacto muito significativo na sociedade.

#### Ethereum como aceleracionismo defensivo e risco existencial da IA (1:30:09) {#ethereum-as-defensive-accelerationism-and-ai-existential-risk-13009}

**Ryan Sean Adams:** Justin, quando estávamos falando sobre essas três tecnologias de computação, parece que a que mais se destaca é a IA. Você estava falando sobre 2032 ser uma espécie de momento do tipo AGI (Inteligência Artificial Geral). Uma pergunta geral: como um criptógrafo extremamente talentoso, você não é uma AGI. A preocupação é que, à medida que entramos na singularidade da computação, tudo pode acontecer. Todos os planos bem elaborados que fizermos em 2026 para que nossas blockchains sejam resistentes a computadores quânticos — e se a AGI descobrir como quebrar nossa criptografia resistente a computadores quânticos de alguma outra forma? Como criptógrafo, você está preocupado com as incógnitas desconhecidas da inteligência artificial geral e com as coisas que ela poderia quebrar? E se estivermos preparados para um mundo pós-quântico, mas não para um mundo pós-AGI?

**Justin Drake:** Em relação à criptografia, estou bastante confiante sobre a solidez. O motivo é que você pode provar matematicamente que sua criptografia está correta. A criptografia é um sub-ramo da matemática. Geralmente, você calibra esses problemas difíceis de modo que, se alguém fosse quebrá-los computacionalmente, usaria mais energia do que existe no sistema solar.

Voltando às bases criptográficas que estamos sugerindo para o Ethereum pós-quântico — hashes — não há nada mais forte do que isso. Esta é a criptografia mais fraca que você poderia esperar ter. Esse é um dos motivos pelos quais sou cauteloso em colocar as bases da internet de valor sobre reticulados (lattices). O NIST tem dois tipos principais de assinaturas pós-quânticas: baseadas em hash e baseadas em reticulados. As coisas baseadas em reticulados lembram muito as curvas elípticas — objetos altamente estruturados. É plausível que alguma AGI ou até mesmo ASI, superinteligência artificial, milhares de vezes mais inteligente do que toda a humanidade combinada, consiga quebrá-la. Mas as funções de hash — há motivos para acreditar que elas são fortes.

Embora eu não esteja muito preocupado com a criptografia, estou preocupado com algo muito mais profundo. Se você olhar o panorama geral, estou cada vez mais preocupado com o risco existencial para a humanidade. Mais pessoas estão começando a entender o que Eliezer estava tentando dizer no Bankless não muito tempo atrás.

Acho plausível que, se a humanidade sobreviver, o Ethereum desempenhe um papel fundamental para que isso aconteça. A metáfora que tenho é que a humanidade está dirigindo um carro a 100 milhas por hora. Existe essa armadilha de Moloch onde os grandes estados-nação, TSMC, Nvidia, OpenAI — estão todos pisando no acelerador. E o carro não tem freios, nem cinto de segurança, nem airbag. Hoje podemos dirigir de forma relativamente confortável a 100 mph. No ano que vem estaremos a 200, depois a 300. Eventualmente, estaremos dirigindo de forma irresponsavelmente rápida e bateremos.

Trabalhar no Ethereum ganhou um significado totalmente novo para mim nos últimos meses. Eu estava ignorando a IA na maior parte do tempo, em parte porque estava obcecado com coisas de blockchain, mas também porque era um brinquedo não muito tempo atrás. Mas através do meu trabalho, especialmente com verificação formal e desenvolvimento

#### O significado de trabalhar no Ethereum na era da IA (1:35:08) {#the-meaning-of-working-on-ethereum-in-the-age-of-ai-13508}

e programando, estou vendo o quão poderosa essa tecnologia é. Nas últimas semanas e meses, fiquei obcecado por IA, aprendendo o máximo que posso. De forma alguma sou um especialista, e talvez isso seja apenas uma fase pela qual as pessoas passam quando abrem a caixa de Pandora. Mas, para mim, trabalhar no Ethereum agora é tudo sobre aceleracionismo defensivo.

Não vejo outras partes da sociedade trabalhando no sistema de freios — é só pé no acelerador. A boa notícia é que o Ethereum tem muito do pensamento e das ferramentas que poderiam fornecer algumas das soluções. Desde o primeiro dia, presumimos a adversariedade. Desde o primeiro dia, fazemos uso de tecnologia como a criptografia, que capacita os fracos e garante que mesmo os arbitrariamente fortes não consigam quebrar certas coisas. Estamos tentando ser uma fonte de verdade, ser descentralizados, dar soberania às pessoas.

Acho que é possível que, nos próximos meses e anos, tenhamos algum tipo de despertar em que a sociedade diga: "Ferrou". E pode se tornar um imperativo moral começar a trabalhar no aceleracionismo defensivo. Podemos ter algumas das mentes mais brilhantes vindo naturalmente para o Ethereum como uma solução em potencial — parte de um conjunto de soluções de que precisamos para lidar com isso.

**Ryan Sean Adams:** Adoro que você esteja pensando nisso, e parece que seu trabalho no Ethereum lhe dá um propósito. Tenho outra pergunta. Sendo obviamente um grande fã do Ethereum, uma preocupação que tenho, se o destino da IA se concretizar, é que, em certo nível, sim, é uma tecnologia aceleracionista defensiva — descentralizada, não permissionada, transferindo o poder para os pequenos em vez dos grandes. Mas, em outro nível, ela é digital. Criamos um sistema de direitos de propriedade, e parece possível que alguma AGI ou ASI possa alavancar nosso computador mundial imutável e impossível de desligar para coisas que a humanidade não quer. Você se preocupa, em algum nível, que ela simplesmente use o Ethereum — "Ei, humanidade, obrigado pelo sistema de direitos de propriedade, nós assumimos daqui" — e você tenha, na verdade, acelerado uma tecnologia que vai contra a humanidade?

**Justin Drake:** Acho que esse é um ponto muito justo. Em última análise, o Ethereum é uma ferramenta que pode ser usada tanto por humanos quanto por IAs. Talvez seja uma forma de me consolar, mas se você remover o Ethereum, não parece haver muitos outros produtos alternativos no espaço do aceleracionismo defensivo. É quase tudo aceleracionista. Então, sim, talvez o Ethereum acelere algumas coisas, mas é uma das únicas esperanças que temos para a aceleração defensiva. Sendo assim, acho que ainda é racional entregar o roteiro até 2029 e fazer o meu melhor para garantir que o Ethereum esteja pronto para uma era de superinteligência artificial.

**Ryan Sean Adams:** Só uma última pergunta enquanto encerramos. Isso foi absolutamente fantástico. Talvez seja uma pergunta pessoal, já que você teve um despertar para a IA nos últimos meses. Agora noto que você está condicionando com "se a humanidade sobreviver" — "O Ethereum desempenha um papel fundamental se a humanidade sobreviver". Essas palavras são difíceis para mim de dizer. A possibilidade real de que o aceleracionismo tecnológico signifique que a humanidade não sobreviva. Como você lida com isso pessoalmente?

**Justin Drake:** Sou relativamente zen em relação a isso. Cheguei a um ponto em que estou feliz em morrer. Vivi uma vida muito feliz.

#### Considerações finais sobre a probabilidade de ruína (1:40:04) {#closing-thoughts-on-probability-of-doom-14004}

**Ryan Sean Adams:** O quê?

**David Hoffman:** Isso nos chocou.

**Ryan Sean Adams:** Essa não era a resposta que eu esperava.

**Justin Drake:** Acho que você só precisa manter a esperança. Você precisa deixar de lado a chamada P(doom) — a probabilidade de ruína. Minha P(doom) agora é relativamente alta. Acho que é mais de 50%. Mas não quero dizer isso em voz alta. Eu não quero—

**Ryan Sean Adams:** Você não quer viver nesse pessimismo.

**Justin Drake:** Exatamente. Não quero me desencorajar e tornar minha vida miserável. E talvez mais importante, não quero desencorajar outras pessoas e fazer com que percam a esperança. Acho que devemos fazer o nosso melhor com o que temos. O futuro é altamente imprevisível. Embora minha P(doom) tenha subido muito nas últimas semanas e meses, esta é uma opinião forte, mas flexível. Quero que pessoas muito inteligentes se apresentem e me digam por que eu não deveria estar tão assustado e ser mais otimista e esperançoso.

Como eu disse, tenho pensado nisso há literalmente semanas e meses. Estou apenas arranhando a superfície. O grande alerta para mim foi o Opus 4.5, quando Emil me disse: "A partir deste ponto, a IA está realmente me ajudando a me tornar mais produtivo." Antes disso, no geral, ela o atrasava. E então o que vimos nas últimas semanas são resultados mais impressionantes. Cerca de um mês atrás, um dos principais lemas nos SNARKs baseados em hash — o lema de Polyshakes-Spielman — foi verificado formalmente em 8 horas, custando US$ 200. Algo que teria custado 100 vezes mais se um humano fizesse e levado 100 vezes mais tempo.

Também mencionei o resultado da Medalha Fields, que levou apenas 5 dias para gerar uma prova de 500.000 linhas. É meio óbvio para onde isso está indo: teremos todos os teoremas matemáticos conhecidos checados e verificados por IA, com todos os erros de digitação corrigidos. Para um pequeno subconjunto de "teoremas", teremos de fato uma demonstração de que estão incorretos com contraexemplos. A programação já está em grande parte resolvida, depois resolveremos o progresso científico. As coisas ficam filosóficas extremamente rápido — talvez isso fique para outro episódio.

**Ryan Sean Adams:** Acho que isso fica para outro episódio. Mas é uma resposta fantástica. Agradeço sua perspectiva de abordar isso com certo nível de estoicismo e, em seguida, agência — trabalhando em coisas que são significativas para você. Esperamos, se a humanidade sobreviver, fazer muitos outros podcasts como este com você no futuro. É sempre um prazer ter você aqui, Justin Drake. Muito obrigado.

**Justin Drake:** Obrigado.