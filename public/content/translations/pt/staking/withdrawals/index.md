---
title: Levantamentos de staking
description: Página que resume o que são levantamentos push de staking, como funcionam e o que os stakers precisam de fazer para receber as suas recompensas
lang: pt
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Leslie, o rinoceronte, com as suas recompensas de staking
sidebarDepth: 2
summaryPoints:
  - A atualização de Xangai/Capella permitiu a realização de saques de staking na Ethereum
  - Os operadores do validador devem fornecer um endereço de levantamento para permitir
  - As recompensas são distribuídas automaticamente a cada intervalo de alguns dias
  - Os validadores que saírem completamente do staking receberão o seu saldo remanescente
---

<UpgradeStatus dateKey="page-staking-withdrawals-when">
Os levantamentos de staking foram habilitados com a atualização de Xangai/Capella que ocorreu em 12 de abril de 2023.&nbsp;<a href="#when" customEventOptions={{ eventCategory: "Anchor link", eventAction: "When's it shipping?", eventName: "click" }}>Mais sobre Xangai/Capella</a>
</UpgradeStatus>

**Levantamentos de staking** referem-se a transferências de ETH de uma conta de validador na camada de consenso da Ethereum (a Beacon Chain), para a camada de execução onde pode ser transacionada.

**Os pagamentos de recompensas por excesso de saldo** superior a 32 ETH serão automaticamente e regularmente enviados para um endereço de levantamento ligado a cada validador, uma vez fornecido pelo utilizador. Os utilizadores também podem **sair totalmente do staking**, desbloqueando todo o seu saldo de validador.

## Recompensas de staking {#staking-rewards}

Os pagamentos de recompensas são processados automaticamente para contas de validador ativas com um saldo efetivo máximo de 32 ETH.

Qualquer saldo superior a 32 ETH ganho através de recompensas não contribui efetivamente para o capital, nem aumenta o peso deste validador na rede, pelo que é automaticamente retirado como pagamento de recompensa de poucos em poucos dias. Para além de fornecer uma única vez um endereço de levantamento, estas recompensas não requerem qualquer outra ação por parte do operador do validador. Tudo isto é iniciado na camada de consenso, pelo que não é necessário gás (taxa de transação) em qualquer etapa.

### Como chegámos aqui? {#how-did-we-get-here}

Ao longo dos últimos anos, a Ethereum sofreu várias atualizações de rede, passando a ser uma rede protegida pelo próprio ETH, em vez de ser uma rede de mineração que consome muita energia, como era anteriormente. Participar no consenso no Ethereum é agora conhecido como "staking", uma vez que os participantes bloquearam voluntariamente o ETH, colocando-o "em jogo" pela capacidade de participar na rede. Os utilizadores que cumprirem as regras serão recompensados, enquanto as tentativas de batota podem ser penalizadas.

Desde o lançamento do contrato de depósito de staking em novembro de 2020, alguns corajosos pioneiros da Ethereum bloquearam voluntariamente fundos para ativar "validadores", contas especiais que têm o direito de atestar e propor formalmente blocos, seguindo as regras da rede.

Antes da atualização de Xangai/Capella, não podia utilizar ou aceder ao seu ETH staked. Mas agora, pode optar por receber automaticamente as suas recompensas numa conta escolhida, e também pode retirar o ETH em jogo sempre que quiser.

### Como me preparo? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Avisos importantes {#important-notices}

Fornecer um endereço de levantamento é um passo necessário para qualquer conta de validador antes de ser elegível para ter ETH retirado do seu saldo.

<InfoBanner emoji="⚠️" isWarning>
  <strong>A cada conta de validador só pode ser atribuído um único endereço de levantamento e uma única vez.</strong> Uma vez escolhido e submetido à camada de consenso, o endereço não pode ser revogado ou alterado novamente. Verifique novamente a titularidade e a exatidão do endereço fornecido antes de o enviar.
</InfoBanner>

Não há <strong>qualquer ameaça aos seus fundos entretanto</strong> por não fornecer isto, assumindo que a sua frase mnemónica/semente permaneceu segura offline e não foi comprometida de forma alguma. Se as credenciais de levantamento não forem adicionadas, o ETH ficará simplesmente bloqueado na conta do validador até que um endereço de levantamento seja fornecido.

## Sair totalmente do staking {#exiting-staking-entirely}

É obrigatório fornecer um endereço de levantamento antes de transferir _quaisquer_ fundos do saldo de uma conta de validador.

Os utilizadores que pretendam sair por completo do staking e levantar todo o seu saldo também devem assinar e transmitir ume mensagem de "saída voluntária" com as chaves de validador para iniciar o processo de saída do staking. Isto é feito com o teu cliente de validador e enviado para o nó de consenso e não requer gás.

O processo de saída de um validador do staking exige períodos de tempo variáveis, dependendo do número de validadores que estão a sair ao mesmo tempo. Depois de concluído, esta conta deixará de ser responsável por realizar a validação de rede e deixará de ser elegível para recompensas; também deixará de ter o seu ETH "em staking". Nesta altura, a conta será marcada como totalmente "levantável".

Quando uma conta é marcada como "levantável" e forem fornecidas credenciais de levantamento, não há mais nada que um utilizador possa fazer além de esperar. As contas são automática e continuamente analisadas por proponentes de blocos para a saída de fundos elegíveis e o saldo da sua conta será transferido integralmente (também conhecido como "levantamento total") durante a próxima <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>análise</a>.

## Quando são ativados os levantamentos de staking? {#when}

Os levantamentos de staking estão ativos! A funcionalidade de levantamento foi ativada como parte da atualização Xangai/Capella ocorrida a 12 de abril de 2023.

A atualização Xangai/Capella permitiu que o ETH previamente em staking fosse reclamado para contas Ethereum comuns. Fecha-se assim o ciclo na liquidez de staking e a Ethereum fica mais perto da construção de um ecossistema sustentável, escalável e descentralizado seguro.

- [Mais na história de Ethereum](/history/)
- [Mais no roteiro da Ethereum](/roadmap/)

## Como funcionam os pagamentos de levantamentos? {#how-do-withdrawals-work}

Se um dado validador é elegível para um levantamento ou não é determinado pelo estado da própria conta de validador. Não é necessária qualquer ação do utilizador num dado momento para determinar se uma conta deve iniciar o levantamento ou não—todo o processo é realizado automaticamente por uma camada de consenso num ciclo contínuo.

### Mais de um aprendiz visual? {#visual-learner}

Consulte esta explicação de levantamento de staking na Ethereum da Finematics:

<YouTube id="RwwU3P9n3uo" />

### "Análise" do validador {#validator-sweeping}

Se um validador estiver agendado para propor o próximo bloco, é necessário construir uma fila de levantamento composta por um máximo de 16 levantamentos elegíveis. Isto consegue-se começando com um validador de índice 0, determinando se existe um levantamento elegível para esta conta de acordo com as regras do protocolo e adicionando à lista, se existir. O validador definido para propor o bloco seguinte retoma o trabalho no ponto em que foi deixado, fazendo a ordem avançar indefinidamente.

<InfoBanner emoji="🕛">
Imagine um relógio analógico. O ponteiro do relógio que aponta para as horas avança numa direção, não salta horas e, eventualmente, volta ao início depois de alcançar o último número.<br/><br/>
Em vez de 1 a 12, imagine que o relógio tem 0 a N <em>(o número total de contas do validador que foram registadas na camada de consenso, mais de 500 mil em janeiro de 2023).</em><br/><br/>
O pnteiro do relógio aponta para o próxima validador que tem de ser verificado para levantamentos elegíveis. Começa no 0 e percorre todo o caminho sem saltar quaisquer contas. Ao chegar ao último validador, o ciclo continua desde o início.
</InfoBanner>

#### Verificar uma conta para levantamentos {#checking-an-account-for-withdrawals}

Enquanto um proponente analisa os validadores para possíveis levantamentos, cada validador verificado é avaliado contra uma série breve de perguntas para determinar se deve ser acionado um levantamento e, se for, quanto ETH deve ser levantado.

1. **Foi fornecido um endereço de elvantamento?** Se não tiver sido fornecido qualquer endereço de levantamento, a conta é ignorada e o levantamento não é iniciado.
2. **O validador saiu e pode ser levantado?** Se o validador tiver saído totalmente e tivermos atingido o epoch no qual se considerou que a conta se podia "levantar", então, será processado um levantamento integral. Esta ação irá transferir o restante saldo para o endereço de levantamento.
3. **O saldo efetivo chega ao máximo de 32?** Se a conta tiver credenciais de levantamento, e não tiver saído totalmente e tiver recompensas acima de 32 em espera, será processado um levantamento parcial que transfere apenas as recompensas acima de 32 para o endereço de levantamento do utilizador.

Existem apenas duas ações que podem ser realizadas pelo validador durante o ciclo de vida do validador que influenciam diretamente este fluxo:

- Fornecer credenciais de levantamento para permitir qualquer forma de levantamento
- Sair da rede, o que acionará um levantamento integral

### Sem taxas {#gas-free}

Esta abordagem aos levantamentos de staking evita que os staker tenham de submeter manualmente uma transação ao solicitar um montante particular de ETH para levantar. Isto significa que **não é necessário gás (taxa de transação)** e os levantamentos também não competem pelo espaço do bloco da camada de execução existente.

### Com que frequência receberei as minhas recompensas de staking? {#how-soon}

Pode ser processado um máximo de 16 levantamentos num único bloco. A este ritmo, podem ser processados 115,200 levantamentos de validadores por dia (pressupondo que não faltam slots). Tal como indicado acima, os validadores sem levantamentos elegíveis serão ignorados, reduzindo o tempo para terminar a análise.

Se expandirmos este cálculo, podemos estimar o tempo que será necessário para o processamento de um dado número de levantamentos:

<TableContainer>

| Número de levantamentos | Tempo para a conclusão |
| :-------------------: | :--------------: |
|        400,000        |     3,5 dias     |
|        500,000        |     4,3 dias     |
|        600,000        |     5,2 dias     |
|        700,000        |     6,1 dias     |
|        800,000        |     7,0 dias     |

</TableContainer>

Como se vê, este tempo abranda à medida que mais validadores entram na rede. Um aumento nas slots falhadas poderá abrandar este processamento proporcionalmente, mas, em geral, representa o lado mais lento de eventuais resultados.

## Perguntas mais frequentes {#faq}

<ExpandableCard
title="Depois de fornecer um endereço de levantamento, posso alterar para um endereço de levantamento alternativo?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Não. O processo de fornecimento de credenciais de levantamento é um processo único e não pode ser alterado depois de submetido.
</ExpandableCard>

<ExpandableCard
title="Por que motivo um endereço de levantamento só pode ser definido uma vez?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Ao definir um endereço de levantamento da camada de execução, as credenciais de levantamento para esse validador são permanentemente alteradas. Isto significa que as antigas credenciais deixam de funcionar e as novas credenciais dirigem para uma conta de camada de execução.

Os endereços de levantamento podem ser um contrato inteligente (controlado pelo respetivo código) ou uma conta externa (EOA, controlada pela sua chave privada). Atualmente, estas contas não têm forma de enviar uma mensagem para a camada de consenso que sinalizaria uma alteração das credenciais do validador e adicionar esta funcionalidade adicionari complexidade desncessária ao protocolo.

Como alternativa à alteração do endereço de levantamento para um validador particular, os utilizadores podem optar por definir um contrato inteligente como o seu endereço de levantamento, que aceitaria uma chave, tal como um cofre. Os utilizadores que definam os seus fundos para a sua própria conta externa (EOA) podem efetuar uma saída completa para levantarem todos os seus fundos em staking e, em seguida, podem reaplicar os fundos em staking utilizando novas credenciais.
</ExpandableCard>

<ExpandableCard
title="E se participar em tokens de staking ou em satking de pools?"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Se fizer parte de um <a href="/staking/pools/">pool de staking</a> ou detiver tokens em staking, deve consultar o seu fornecedor para obter mais detalhes sobre como os levantamentos de staking são processados, uma vez que cada serviço funciona de forma diferente.

Regra geral, os utilizadores deverão reclamar livremente os seus ETH em staking ou alterar o fornecedor de staking que utilizam. Se um pool em particular ficar muito grande, é permitida a saída, resgate e reaplicação em staking dos fundos com um <a href="https://rated.network/">fornecedor mais pequeno</a>. Ou, se tiver acumulado ETH suficiente, pode <a href="/staking/solo/">fazer staking em casa</a>.

</ExpandableCard>

<ExpandableCard
title="Os pagamentos de recompensas (levantamentos parciais) ocorrem automaticamente?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Sim, desde que o seu validador tenha fornecido um endereço de levantamento. Deve ser fornecido uma vez para ativar inicialmente quaisquer levantamentos e, em seguida, os pagamentos de recompensas podem ser acionados automaticamente a cada número de dias com a análise de cada validador.
</ExpandableCard>

<ExpandableCard
title="Os levantamentos integrais ocorrem automaticamente?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Não. Se o seu validador ainda estiver ativo na rede, um levantamento integral não ocorrer automaticamente. Exige o início manual de uma saída voluntária.

Quando um validador tiver concluído o processo de saída e, pressupondo que a conta tem credenciais de levantamento, o saldo remanescente será <em>then</em> levantado durante a <a href="#validator-sweeping">análise do validador</a> seguinte.

</ExpandableCard>

<ExpandableCard title="Posso retirar uma quantia personalizada?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Os levantamentos são concebidos para serem ativados automaticamente, transferindo quaisquer ETH que não estejam a contribuir ativamente para o staking. Isto inclui saldos integrais para contas que tenham concluído o processo de saída.

Não é possível solicitar manualmente o levantamento de montantes específicos de ETH.
</ExpandableCard>

<ExpandableCard
title="Opero um validador. Onde posso encontrar mais informações sobre ativar o levantamento?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Recomenda-se que os operadores de validadores visitem a página <a href="https://launchpad.ethereum.org/withdrawals/">Levantamentos do Staking Launchpad</a> onde encontrará mais detalhes sobre como preparar o validador para levantamentos, agendamento de eventos e mais detalhes sobre o funcionamento dos levantamentos.

Para exoperimentar antecipadamente a sua configuração numa testnet, visite <a href="https://holesky.launchpad.ethereum.org">Holesky Testnet Staking Launchpad</a> para começar.

</ExpandableCard>

<ExpandableCard
title="Posso reativar o meu validador depois de sair ao depositar mais ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Não. Após a saída de um validador e o levantamento integral do seu saldo, quauisquer fundos depositados nesse validador serão automaticamente transferidos para o endereço de levantamento durante a próxima análise do validador. Para reaplicar os ETH em staking, tem de ser ativado um novo validador.
</ExpandableCard>

## Leitura adicional {#further-reading}

- [Levantamentos do Staking Launchpad](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: Levantamentos forçados da Beacon chain como operations](https://eips.ethereum.org/EIPS/eip-4895)
- [Ethereum Cat Herders - Xangai](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94: Levantamento de ETH em staking (teste) com Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Levantamentos forçados da Beacon como operações com Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Compreender o saldo efetivo do validador](https://www.attestant.io/posts/understanding-validator-effective-balance/)
