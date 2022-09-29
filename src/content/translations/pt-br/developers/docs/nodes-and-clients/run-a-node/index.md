---
title: Execute seu próprio nó Ethereum
description: Introdução geral para a execução da sua própria instância de um cliente Ethereum.
lang: pt-br
sidebarDepth: 2
---

Exdcutar um nó próprio proporciona vários benefícios, abre novas possibilidades e ajuda a dar suporte ao ecossistema. Esta página vai ajudar você a iniciar seu próprio nó, para assim participar na validação das transações de Ethereum.

## Pré-requisitos {#prerequisites}

Você deve entender o que é um nó de Ethereum e por que é importante executar um cliente. Isso é abordado em [Nós e clientes](/developers/docs/nodes-and-clients/).

If you're new to the topic of running a node, or looking for a less technical path, we recommend first checking out our user-friendly introduction on [running an Ethereum node](/run-a-node).

## Escolhendo um método {#choosing-approach}

O primeiro passo para iniciar um nó é escolher o método. Você precisa escolher um cliente (o software), o ambiente e os parâmetros com os quais você deseja começar. Veja todos os [clientes da rede principal](/developers/docs/nodes-and-clients/#advantages-of-different-implementations) disponíveis.

#### Configurações do cliente {#client-settings}

As implementações do cliente habilitam diferentes modos de sincronização e várias outras opções. [Os modos de sincronização](/developers/docs/nodes-and-clients/#sync-modes) representam diferentes métodos de download e validação de dados da blockchain. Antes de iniciar o nó, você deve decidir que rede e modo de sincronização deve ser usado. As coisas mais importantes a considerar são o espaço em disco e o tempo necessário de sincronização do cliente.

Todos os recursos e opções podem ser encontrados na documentação do cliente. Várias configurações do cliente podem ser definidas executando o próprio cliente com as flags correspondentes. Você pode obter mais informações sobre flags do [EthHub](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/#client-settings) ou da documentação do cliente. Para fins de teste, você pode preferir executar o cliente em uma das redes de teste. [Veja a visão geral das redes suportadas](/developers/docs/nodes-and-clients/#execution-clients).

### Ambiente e hardware {#environment-and-hardware}

#### Local ou nuvem {#local-vs-cloud}

Os clientes Ethereum podem ser executados em computadores pessoais e não exigem hardware específico, ao contrário da mineração. Portanto, existem várias opções de implantação em base as suas necessidades. Para simplificar, vamos analisar como executar um nó em uma máquina física local e um servidor na nuvem:

- Nuvem
  - Os servidores oferecem alto tempo de atividade e endereços IP públicos estáticos
  - Obter um servidor dedicado ou virtual pode ser mais cômodo que desenvolver o seu próprio
  - A desvantagem está em ter que confiar em um terceiro: o servidor
  - Por causa do tamanho do armazenamento necessário para executara um nó completo, alugar um servidor pode ser caro
- Hardware próprio
  - Um método mais confiável e soberano
  - Investimento único
  - Existe a opção para comprar máquinas pré-configuradas
  - Você tem que se preparar mentalmente para manter e solucionar os problemas potenciais que surgirem

Ambas as opções têm vantagens e desvantagens, as quais foram resumidas acima. Caso estiver procurando uma solução para a nuvem, além de muitos provedores tradicionais de computação na nuvem, também existem serviços focados em executar nós. Por exemplo:

- [QuikNode](https://www.quiknode.io/)
- [Blockdaemon](https://blockdaemon.com)
- [LunaNode](https://www.lunanode.com/)
- [Alchemy](https://www.alchemy.com/)

#### Hardware {#hardware}

No entanto, uma rede descentralizada que resistente à censura não deve depender de provedores na nuvem. É, portanto, melhor para o ecossistema se você mesmo executa seu próprio nó usando seu próprio hardware. As opções mais simples são máquinas pré-configuradas como:

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

Verifique os requisitos mínimos e recomendados de espaço em disco [para cada cliente e para cada modo de sincronização](/developers/docs/nodes-and-clients/#requirements). Geralmente, um computador modesto deveria ser suficiente. O problema geralmente é a velocidade da unidade. Durante a sincronização inicial, os clientes de Ethereum realizam muitas operações de leitura/gravação. Portanto, é fortemente recomendado usar um SSD. Um cliente poderia nem mesmo [ser capaz de sincronizar completamente o estado atual da rede principal no HDD](https://github.com/ethereum/go-ethereum/issues/16796#issuecomment-391649278), ficando preso alguns blocos atrás na rede. Você pode executar a maioria dos clientes até mesmo em um [único computador do tipo ARM](/developers/docs/nodes-and-clients/#ethereum-on-a-single-board-computer/). De fato, é possível usar o [sistema operacional Ethbian](https://ethbian.org/index.html) para Raspberry Pi 4. This lets you [run a client by flashing the SD card](/developers/tutorials/run-node-raspberry-pi/). Com base no seu software e nas opções de hardware, o tempo de sincronização inicial e os requisitos de armazenamento podem variar. Certifique-se de [verificar os tempos de sincronização e os requisitos de armazenamento](/developers/docs/nodes-and-clients/#recommended-specifications). Verifique também que sua conexão de Internet não seja limitada devido a um [limite de largura de banda](https://wikipedia.org/wiki/Data_cap). É recomendado usar uma conexão ilimitada para que a sincronização inicial e os dados transmitidos à rede possam exceder seu limite.

#### Sistema operacional {#operating-system}

Todos os clientes suportam os principais sistemas operacionais: Linux, MacOS e Windows. Isso significa que você pode executar seu nó em computadores ou servidores regulares com o sistema operacional (SO) que melhor atenda às suas necessidades. Certifique-se, porém, de que seu sistema operacional está atualizado para evitar possíveis problemas e vulnerabilidades de segurança.

## Executando seu nó {#spinning-up-node}

### Obtendo o software do cliente {#getting-the-client}

Em primeiro lugar, baixe seu [software de cliente preferido](/developers/docs/nodes-and-clients/#execution-clients)

Você pode simplesmente baixar um aplicativo ou pacote de instalação executável que se adeque ao seu sistema operacional e a seu hardware. Verifique sempre as assinaturas e os checksums dos pacotes baixados. Alguns clientes também oferecem repositórios para facilitar a instalação e as atualizações. Se preferir, pode criar a partir da fonte. Todos os clientes são de código aberto para que você possa criá-los a partir do código fonte com o compilador adequado.

Os binários executáveis para implementações do cliente estável na rede principal podem ser baixados dos website deles:

- [Geth](https://geth.ethereum.org/downloads/)
- [OpenEthereum,](https://github.com/openethereum/openethereum/releases)
- [Nethermind](https://downloads.nethermind.io/)
- [Besu](https://besu.hyperledger.org/en/stable/)
- [Erigon](https://github.com/ledgerwatch/erigon)

**Note que o OpenEthereum [foi descontinuado](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) e não está mais sendo mantido.** Use-o com cuidado e de preferência mude para outra implementação do cliente.

### Iniciando o cliente {#starting-the-client}

Antes de iniciar o software de cliente do Ethereum, verifique por última vez que seu ambiente está pronto. Por exemplo, certifique-se de que:

- Há espaço em disco suficiente, considerando a rede escolhida e o modo de sincronização.
- A memória e a CPU não são interrompidas por outros programas.
- O sistema operacional está atualizado com a versão mais recente.
- O sistema tem data e hora corretas.
- Seu roteador e seu firewall aceitam conexões nas portas de escuta. Por padrão, os clientes do Ethereum usam uma porta de escuta (TCP) e uma porta de descoberta (UDP), ambas na porta 30303 por padrão.

Execute seu cliente primeiro em uma rede de teste para garantir que tudo esteja funcionando corretamente. [Executar um nó ligeiro Geth](/developers/tutorials/run-light-node-geth/) deve ajudar. Você precisa declarar no início alguma configuração de cliente que não seja a padrão. Você pode usar flags ou o arquivo de configuração para declarar sua configuração preferida. Confira a documentação do seu cliente, já que as especificações de execução do cliente irá iniciar suas funções principais, uma vez escolhidos os endpoints, e começar a procurar pares. Depois de conseguir descobrir os pares, o cliente começará a sincronização. Os dados atuais da blockchain estarão disponíveis assim que o cliente conseguir sincronizar com o estado atual.

### Utilizando o cliente {#using-the-client}

Os clientes oferecem endpoints de API RPC, que podem ser usados para controlar o próprio cliente e interagir com a rede de Ethereum de várias maneiras:

- Chamando-os manualmente com um protocolo adequado: por exemplo, usando `curl`
- Anexando um console (exemplo `geth attach`)
- Implementando-os nos aplicativos

Diferentes clientes possuem diferentes implementações dos endpoints RPC. Mas existe um JSON-RPC padrão, que pode ser usado com cada cliente. Para uma visão geral [leia a documentação sobre o JSON-RPC](https://eth.wiki/json-rpc/API). Os aplicativos que precisam de informações da rede Ethereum podem usar este RPC. Por exemplo, a carteira popular MetaMask permite [executar uma instância local de blockchain e conectar-se a ela](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node).

#### Comunicação com o RPC {#reaching-rpc}

A porta padrão do JSON-RPC é a `8545`, mas você pode modificar as portas dos endpoints locais no arquivo de configuração. Por padrão, a interface RPC só é acessível no localhost do seu computador. Para torná-lo remotamente acessível, você pode expô-lo ao público alterando o endereço para `0.0.0.0`. Isto o tornará acessível através de endereços IP locais e públicos. Na maioria dos casos, você também precisará configurar o encaminhamento de porta no seu roteador.

Você deve fazer isso com cuidado, pois esse processo permitirá que qualquer pessoa controle seu servidor de Internet. De fato, atores maliciosos podem acessar seu nó para derrubar seu sistema ou roubar seus fundos se você estiver usando seu cliente como carteira.

Uma forma de contornar esta situação seria impedir que os métodos potencialmente nocivos do RPC sejam modificáveis. Por exemplo, com `geth`, você pode declarar métodos modificáveis com uma flag: `--http.api web3,eth,txpool`.

Você também pode hospedar o acesso a sua interface RPC apontando o serviço do servidor web, como Nginx, para o endereço e porta locais do seu cliente.

A maneira mais simples e privada de configurar um endpoint acessível publicamente é hospedá-lo no seu próprio serviço "onion" de [Tor](https://www.torproject.org/). Isto permitirá que você se comunique com o RPC fora da sua rede local sem um endereço estático público IP ou portas abertas. Para fazer isso:

- Instale o `tor`
- Edite a configuração `torrc` para habilitar o serviço oculto com o endereço de RPC e porta do seu cliente
- Reinicie o serviço `tor`

Depois de reiniciar o Tor, você obterá as chaves de serviço ocultas e um nome de host no diretório desejado. A partir daí, seu RPC estará acessível em um nome de host `.onion`.

### Operando o nó {#operating-the-node}

Você deve monitorar o seu nó regularmente para ter certeza de que ele está funcionando corretamente. Ocasionalmente, você poderia precisar fazer alguma manutenção.

#### Mantendo o nó online {#keeping-node-online}

Seu nó não precisa estar on-line o tempo todo, mas você deve mantê-lo on-line tanto quanto for possível para deixá-lo em sincronia com a rede. Você pode desligá-lo para reiniciá-lo, mas tenha em mente que:

- O desligamento pode demorar alguns minutos se o estado recente ainda estiver sendo gravado no disco.
- Desligamentos forçados podem danificar o banco de dados.
- Seu cliente ficará dessincronizado com a rede e precisará ser ressincronizado quando você o reiniciar.

_Isso não se aplica a nós validadores na camada de consenso._ Deixar seu nó offline afetará a todos os serviços dependentes dele. Se você estiver rodando um nó para fins de _participação_, então você deve tentar minimizar o tempo de inatividade tanto quanto for possível.

#### Criando um serviço de cliente {#creating-client-service}

Considere criar um serviço para executar seu cliente automaticamente ao iniciar. Por exemplo, em servidores Linux, uma boa prática seria criar um serviço que executa o cliente com a configuração adequada, sob a administração do usuário, com privilégios limitados e o reiniciar automaticamente.

#### Atualizando o cliente {#updating-client}

Você precisa manter o seu software atualizado com os patches de segurança, recursos e [EIPs](/eips/) mais recentes. Especialmente antes dos [hard forks](/history/), certifique-se de estar executando a versão correta do cliente.

#### Executando serviços adicionais {#running-additional-services}

Executar seu próprio nó permite que você use serviços que requerem acesso direto ao RPC do cliente de Ethereum. Estes são serviços criados sobre Ethereum como [soluções de camada 2](/developers/docs/scaling/#layer-2-scaling), [clientes de consenso](/upgrades/get-involved/#clients)ou outras infraestruturas de Ethereum.

#### Monitorando o nó {#monitoring-the-node}

Para monitorar corretamente seu nó, considere coletar algumas métricas. Os clientes fornecem endpoints métricos para que você possa obter dados detalhados sobre o seu nó. Use ferramentas como [InfluxDB](https://www.influxdata.com/get-influxdb/) ou [Prometheus](https://prometheus.io/) para criar bancos de dados que podem ser transformados em visualizações e gráficos através de software como [Grafana](https://grafana.com/). Existem muitas configurações para usar este software e diferentes painéis Grafana para que você possa visualizar seu nó e a rede como um todo. Como parte de seu monitoramento, fique bem atento ao desempenho da sua máquina. Durante a sincronização inicial do seu nó, o software do cliente pode resultar muito pesado para a CPU e para a RAM. Além do Grafana, você pode usar as ferramentas próprias que seu sistema operacional oferece como `htop` ou `uptime` para fazer isso.

## Leitura adicional {#further-reading}

- [Analisando os requisitos de hardware para um nó validado completo no Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 de setembro de 2018_
- [Executando nós completos do Ethereum: um guia completo](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _ – Justin Leroux, 7 de novembro de 2019_
- [Executando um nó Ethereum](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _: ETHHub, atualizado frequentemente_
- [Executando um nó Hyperledger Besu na rede principal de Ethereum: benefícios, requisitos e configuração](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 de maio de 2020_
- [Implementando um cliente Nethermind em Ethereum com uma pilha de monitoramento](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 de julho de 2020_

## Tópicos relacionados {#related-topics}

- [ Nós e clientes](/developers/docs/nodes-and-clients/)
- [Blocos](/developers/docs/blocks/)
- [Redes](/developers/docs/networks/)
