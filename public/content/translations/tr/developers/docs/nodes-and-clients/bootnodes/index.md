---
title: Ethereum Başlatma Düğümlerine Giriş
description: Başlatma düğümlerini anlamak için ihtiyacınız olan temel bilgiler
lang: tr
---

Yeni bir düğüm Ethereum ağına katıldığında, daha sonra yeni eşler keşfedebilmek için ağda halihazırda bulunan düğümlere bağlanması gerekir. Ethereum ağına olan bu giriş noktalarına başlatma düğümleri denir. İstemciler genellikle içlerine kodlanmış bir başlatma düğümleri listesine sahiptir. Bu başlatma düğümleri tipik olarak Ethereum Vakfı'nın devops ekibi veya istemci ekiplerinin kendileri tarafından çalıştırılır. Başlatma düğümlerinin statik düğümlerle aynı şey olmadığını unutmayın. Statik düğümler tekrar tekrar çağrılırken, başlatma düğümleri yalnızca bağlanacak yeterli eş yoksa ve bir düğümün bazı yeni bağlantıları başlatması gerekiyorsa çağrılır.

## Bir başlatma düğümüne bağlanın {#connect-to-a-bootnode}

Çoğu istemcinin yerleşik bir başlatma düğümleri listesi vardır, ancak kendi başlatma düğümünüzü çalıştırmak veya istemcinin kodlanmış listesinin bir parçası olmayan birini kullanmak da isteyebilirsiniz. Bu durumda, istemcinizi başlatırken bunları aşağıdaki gibi belirtebilirsiniz (örnek Geth içindir, lütfen istemcinizin belgelerini kontrol edin):

```
geth --bootnodes "enode://<düğüm kimliği>@<IP adresi>:<port>"
```

## Bir başlatma düğümü çalıştırın {#run-a-bootnode}

Başlatma düğümleri, bir NAT ([Ağ Adresi Çevirisi](https://www.geeksforgeeks.org/network-address-translation-nat/)) arkasında olmayan tam düğümlerdir. Herkese açık olduğu sürece her tam düğüm bir başlatma düğümü olarak işlev görebilir.

Bir düğümü başlattığınızda, başkalarının düğümünüze bağlanmak için kullanabileceği genel bir tanımlayıcı olan [enode](/developers/docs/networking-layer/network-addresses/#enode)'unuzu günlüğe kaydetmelidir.

Enode genellikle her yeniden başlatmada yeniden oluşturulur, bu nedenle başlatma düğümünüz için kalıcı bir enode'un nasıl oluşturulacağı konusunda istemcinizin belgelerine baktığınızdan emin olun.

İyi bir başlatma düğümü olmak için, ona bağlanabilecek maksimum eş sayısını artırmak iyi bir fikirdir. Bir başlatma düğümünü çok sayıda eşle çalıştırmak, bant genişliği gereksinimini önemli ölçüde artıracaktır.

## Mevcut başlatma düğümleri {#available-bootnodes}

go-ethereum içindeki yerleşik başlatma düğümlerinin bir listesi [burada](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23) bulunabilir. Bu başlatma düğümleri Ethereum Vakfı ve go-ethereum ekibi tarafından sürdürülmektedir.

Gönüllüler tarafından sürdürülen başka başlatma düğümü listeleri de mevcuttur. Lütfen her zaman en az bir resmi başlatma düğümü eklediğinizden emin olun, aksi takdirde tutulma saldırısına uğrayabilirsiniz.