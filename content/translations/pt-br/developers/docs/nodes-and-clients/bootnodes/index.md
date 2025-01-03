---
title: Introdução aos bootnodes Ethereum
description: As informações básicas de que você precisa para entender os bootnodes
lang: pt-br
---

Quando um novo nó se junta à rede Ethereum, ele precisa se conectar aos nós que já estão na rede para descobrir novos pares. Esses pontos de entrada na rede Ethereum são chamados de bootnodes. Geralmente, os clientes têm uma lista de bootnodes codificados neles. Esses bootnodes são tipicamente executados pela equipe de devops da Ethereum Foundation ou pelas próprias equipes de clientes. Observe que os nós de inicialização não são iguais aos nós estáticos. Os nós estáticos são chamados por várias vezes, enquanto os bootnodes são chamados apenas se não houver pares suficientes para se conectar e um nó precisar inicializar algumas novas conexões.

## Conectar-se a um bootnode {#connect-to-a-bootnode}

A maioria dos clientes tem uma lista de bootnodes construídos, mas você também pode querer executar seu próprio bootnode ou usar um que não faça parte da lista codificada do cliente. Nesse caso, você pode especificá-los ao iniciar seu cliente, como a seguir (este exemplo é para Geth. Verifique a documentação do seu cliente):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Executar um bootnode {#run-a-bootnode}

Bootnodes são nós completos que não estão por trás de um NAT ([Conversão de Endereços de Rede](https://www.geeksforgeeks.org/network-address-translation-nat/)). Cada nó completo pode atuar como um bootnode, desde que esteja disponível publicamente.

Quando você inicia um nó, ele deve registrar o seu [enode](/developers/docs/networking-layer/network-addresses/#enode), que é um identificador público que outras pessoas podem usar para se conectar ao seu nó.

Normalmente, o enode é regenerado a cada reinicialização, portanto, verifique a documentação do seu cliente sobre como gerar um enode persistente para o seu bootnode.

Para ter um bom bootnode, recomenda-se aumentar o número máximo de pares que podem se conectar a ele. Executar um bootnode com muitos pares aumentará significativamente o requisito de largura de banda.

## Bootnodes disponíveis {#available-bootnodes}

Uma lista de bootnodes integrados ao go-ethereum pode ser encontrada [aqui](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Esses bootnodes são mantidos pela Ethereum Foundation e pela equipe go-ethereum.

Existem outras listas de bootnodes mantidas por voluntários disponíveis. Certifique-se de sempre incluir pelo menos um bootnode oficial, caso contrário, você poderá sofrer um ataque eclipse.
