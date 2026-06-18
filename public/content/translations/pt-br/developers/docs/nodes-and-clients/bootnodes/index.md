---
title: "Introdução aos bootnodes do Ethereum"
description: "As informações básicas que você precisa para entender os bootnodes"
lang: pt-br
---

Quando um novo nó entra na rede Ethereum, ele precisa se conectar a nós que já estão na rede para então descobrir novos pares. Esses pontos de entrada na rede Ethereum são chamados de bootnodes. Os clientes geralmente têm uma lista de bootnodes embutida em seu código (hardcoded). Esses bootnodes são normalmente executados pela equipe de devops da Fundação Ethereum ou pelas próprias equipes de clientes. Note que os bootnodes não são a mesma coisa que nós estáticos. Nós estáticos são chamados repetidas vezes, enquanto os bootnodes só são acionados se não houver pares suficientes para se conectar e um nó precisar iniciar (bootstrap) algumas novas conexões.

## Conectar-se a um bootnode {#connect-to-a-bootnode}

A maioria dos clientes tem uma lista de bootnodes embutida, mas você também pode querer executar seu próprio bootnode, ou usar um que não faça parte da lista codificada do cliente. Neste caso, você pode especificá-los ao iniciar seu cliente, da seguinte forma (o exemplo é para o Geth, por favor, verifique a documentação do seu cliente):

```
geth --bootnodes "enode://<ID do nó>@<endereço IP>:<porta>"
```

## Executar um bootnode {#run-a-bootnode}

Bootnodes são nós completos que não estão atrás de um NAT ([Tradução de Endereço de Rede](https://www.geeksforgeeks.org/network-address-translation-nat/)). Todo nó completo pode atuar como um bootnode, desde que esteja disponível publicamente.

Quando você inicia um nó, ele deve registrar no log o seu [enode](/developers/docs/networking-layer/network-addresses/#enode), que é um identificador público que outros podem usar para se conectar ao seu nó.

O enode geralmente é regenerado a cada reinicialização, portanto, certifique-se de consultar a documentação do seu cliente sobre como gerar um enode persistente para o seu bootnode.

Para ser um bom bootnode, é uma boa ideia aumentar o número máximo de pares que podem se conectar a ele. Executar um bootnode com muitos pares aumentará significativamente o requisito de largura de banda.

## Bootnodes disponíveis {#available-bootnodes}

Uma lista de bootnodes embutidos no go-ethereum pode ser encontrada [aqui](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Esses bootnodes são mantidos pela Fundação Ethereum e pela equipe do go-ethereum.

Existem outras listas de bootnodes mantidas por voluntários disponíveis. Certifique-se de sempre incluir pelo menos um bootnode oficial, caso contrário, você poderá sofrer um ataque de eclipse (eclipse attack).