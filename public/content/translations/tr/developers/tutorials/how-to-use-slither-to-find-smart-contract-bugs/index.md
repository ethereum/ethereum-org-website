---
title: "Akıllı sözleşme hatalarını bulmak için Slither nasıl kullanılır"
description: "Akıllı sözleşmelerdeki hataları otomatik olarak bulmak için Slither nasıl kullanılır"
author: Trailofbits
lang: tr
tags: ["Solidity", "akıllı sözleşmeler", "güvenlik", "test etme"]
skill: advanced
breadcrumb: Slither
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Slither nasıl kullanılır {#how-to-use-slither}

Bu eğitimin amacı, akıllı sözleşmelerdeki hataları otomatik olarak bulmak için Slither'ın nasıl kullanılacağını göstermektir.

- [Kurulum](#installation)
- [Komut satırı kullanımı](#command-line)
- [Statik analize giriş](#static-analysis): Statik analize kısa bir giriş
- [API](#api-basics): Python API açıklaması

## Kurulum {#installation}

Slither, Python >= 3.6 gerektirir. pip aracılığıyla veya Docker kullanılarak kurulabilir.

pip aracılığıyla Slither:

```bash
pip3 install --user slither-analyzer
```

Docker aracılığıyla Slither:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Son komut, eth-security-toolbox'ı mevcut dizininize erişimi olan bir Docker içinde çalıştırır. Dosyaları ana makinenizden değiştirebilir ve araçları Docker'daki dosyalar üzerinde çalıştırabilirsiniz_

Docker içinde şunu çalıştırın:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Bir betik çalıştırma {#running-a-script}

Python 3 ile bir Python betiği çalıştırmak için:

```bash
python3 script.py
```

### Komut satırı {#command-line}

**Komut satırı ve kullanıcı tanımlı betikler.** Slither, birçok yaygın hatayı bulan önceden tanımlanmış bir dizi dedektörle birlikte gelir. Slither'ı komut satırından çağırmak tüm dedektörleri çalıştıracaktır, statik analiz hakkında detaylı bilgiye gerek yoktur:

```bash
slither project_paths
```

Dedektörlere ek olarak Slither, [yazıcıları (printers)](https://github.com/crytic/slither#printers) ve [araçları](https://github.com/crytic/slither#tools) aracılığıyla kod inceleme yeteneklerine sahiptir.

Özel dedektörlere ve GitHub entegrasyonuna erişim sağlamak için [crytic.io](https://github.com/crytic) kullanın.

## Statik analiz {#static-analysis}

Slither statik analiz çerçevesinin yetenekleri ve tasarımı blog yazılarında ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) ve bir [akademik makalede](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf) açıklanmıştır.

Statik analizin farklı türleri vardır. Büyük ihtimalle [clang](https://clang-analyzer.llvm.org/) ve [gcc](https://lwn.net/Articles/806099/) gibi derleyicilerin bu araştırma tekniklerine dayandığını fark etmişsinizdir, ancak aynı zamanda ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](https://findbugs.sourceforge.net/) ve [Frama-C](https://frama-c.com/) ile [Polyspace](https://www.mathworks.com/products/polyspace.html) gibi biçimsel yöntemlere dayalı araçların da temelini oluşturur.

Burada statik analiz tekniklerini ve araştırmalarını kapsamlı bir şekilde incelemeyeceğiz. Bunun yerine, hataları bulmak ve kodu anlamak için Slither'ı daha etkili bir şekilde kullanabilmeniz adına onun nasıl çalıştığını anlamak için gerekenlere odaklanacağız.

- [Kod gösterimi](#code-representation)
- [Kod analizi](#analysis)
- [Ara gösterim](#intermediate-representation)

### Kod gösterimi {#code-representation}

Tek bir yürütme yolu hakkında akıl yürüten dinamik analizin aksine, statik analiz tüm yollar hakkında aynı anda akıl yürütür. Bunu yapmak için farklı bir kod gösterimine dayanır. En yaygın iki tanesi soyut sözdizimi ağacı (AST) ve kontrol akış grafiğidir (CFG).

### Soyut Sözdizimi Ağaçları (AST) {#abstract-syntax-trees-ast}

AST, derleyici kodu her ayrıştırdığında kullanılır. Muhtemelen üzerinde statik analizin gerçekleştirilebileceği en temel yapıdır.

Kısacası AST, genellikle her yaprağın bir değişken veya sabit içerdiği ve iç düğümlerin işlenenler veya kontrol akışı işlemleri olduğu yapılandırılmış bir ağaçtır. Aşağıdaki kodu göz önünde bulundurun:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

İlgili AST şurada gösterilmektedir:

![AST](./ast.png)

Slither, solc tarafından dışa aktarılan AST'yi kullanır.

Oluşturulması basit olsa da AST iç içe geçmiş bir yapıdır. Bazen analiz edilmesi en kolay şey değildir. Örneğin, `a + b <= a` ifadesi tarafından kullanılan işlemleri tanımlamak için önce `<=` ve ardından `+` analiz edilmelidir. Yaygın bir yaklaşım, ağaçta özyinelemeli olarak gezinen ziyaretçi (visitor) desenini kullanmaktır. Slither, [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py) içinde genel bir ziyaretçi içerir.

Aşağıdaki kod, ifadenin bir toplama işlemi içerip içermediğini tespit etmek için `ExpressionVisitor` kullanır:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # ifade, test edilecek ifadedir
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Kontrol Akış Grafiği (CFG) {#control-flow-graph-cfg}

İkinci en yaygın kod gösterimi kontrol akış grafiğidir (CFG). Adından da anlaşılacağı gibi, tüm yürütme yollarını ortaya çıkaran grafik tabanlı bir gösterimdir. Her düğüm bir veya birden fazla talimat içerir. Grafikteki kenarlar kontrol akışı işlemlerini (if/then/else, döngü vb.) temsil eder. Önceki örneğimizin CFG'si şöyledir:

![CFG](./cfg.png)

CFG, analizlerin çoğunun üzerine inşa edildiği gösterimdir.

Başka birçok kod gösterimi mevcuttur. Gerçekleştirmek istediğiniz analize göre her gösterimin avantajları ve dezavantajları vardır.

### Analiz {#analysis}

Slither ile gerçekleştirebileceğiniz en basit analiz türü sözdizimsel analizlerdir.

### Sözdizimi analizi {#syntax-analysis}

Slither, desen eşleştirmeye benzer bir yaklaşım kullanarak tutarsızlıkları ve kusurları bulmak için kodun farklı bileşenleri ve bunların gösterimleri arasında gezinebilir.

Örneğin aşağıdaki dedektörler sözdizimi ile ilgili sorunları arar:

- [Durum değişkeni gölgeleme (State variable shadowing)](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): tüm durum değişkenleri üzerinde yinelenir ve herhangi birinin miras alınan bir sözleşmedeki bir değişkeni gölgeleyip gölgelemediğini kontrol eder ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Yanlış ERC-20 arayüzü](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): yanlış ERC-20 işlev imzalarını arar ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Anlamsal analiz {#semantic-analysis}

Sözdizimi analizinin aksine, anlamsal bir analiz daha derine iner ve kodun "anlamını" analiz eder. Bu aile bazı geniş analiz türlerini içerir. Daha güçlü ve faydalı sonuçlara yol açarlar, ancak yazılmaları da daha karmaşıktır.

Anlamsal analizler en gelişmiş güvenlik açığı tespitleri için kullanılır.

#### Veri bağımlılığı analizi {#fixed-point-computation}

Eğer `variable_a` değerinin `variable_b` tarafından etkilendiği bir yol varsa, `variable_a` değişkeninin `variable_b` değişkenine veri bağımlı olduğu söylenir.

Aşağıdaki kodda `variable_a`, `variable_b` değişkenine bağımlıdır:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither, ara gösterimi (sonraki bir bölümde tartışılacaktır) sayesinde yerleşik [veri bağımlılığı](https://github.com/crytic/slither/wiki/data-dependency) yetenekleriyle birlikte gelir.

Veri bağımlılığı kullanımına bir örnek [tehlikeli kesin eşitlik dedektöründe](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities) bulunabilir. Burada Slither, tehlikeli bir değere karşı kesin eşitlik karşılaştırması arayacak ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) ve bir saldırganın sözleşmeyi tuzağa düşürmesini önlemek için kullanıcıya `==` yerine `>=` veya `<=` kullanması gerektiğini bildirecektir. Diğerlerinin yanı sıra dedektör, `balanceOf(address)` çağrısının dönüş değerini tehlikeli olarak değerlendirecek ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) ve kullanımını izlemek için veri bağımlılığı motorunu kullanacaktır.

#### Sabit nokta hesaplaması {#fixed-point-computation-2}

Analiziniz CFG'de geziniyor ve kenarları takip ediyorsa, daha önce ziyaret edilmiş düğümleri görmeniz muhtemeldir. Örneğin, aşağıda gösterildiği gibi bir döngü sunulursa:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Analizinizin ne zaman duracağını bilmesi gerekecektir. Burada iki ana strateji vardır: (1) her düğüm üzerinde sonlu sayıda yineleme yapmak, (2) _sabit nokta (fixpoint)_ adı verilen bir değeri hesaplamak. Sabit nokta temel olarak bu düğümü analiz etmenin anlamlı bir bilgi sağlamadığı anlamına gelir.

Kullanılan sabit noktaya bir örnek yeniden giriş dedektörlerinde bulunabilir: Slither düğümleri keşfeder ve harici çağrıları, depolamaya yazma ve okuma işlemlerini arar. Bir sabit noktaya ulaştığında ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), keşfi durdurur ve farklı yeniden giriş desenleri ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)) aracılığıyla bir yeniden giriş olup olmadığını görmek için sonuçları analiz eder.

Verimli sabit nokta hesaplaması kullanarak analizler yazmak, analizin bilgilerini nasıl yaydığının iyi anlaşılmasını gerektirir.

### Ara gösterim {#intermediate-representation}

Ara gösterim (IR), orijinaline göre statik analize daha uygun olması amaçlanan bir dildir. Slither, Solidity'yi kendi IR'sine çevirir: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Sadece temel kontroller yazmak istiyorsanız SlithIR'yi anlamak gerekli değildir. Ancak, gelişmiş anlamsal analizler yazmayı planlıyorsanız işinize yarayacaktır. [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) ve [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) yazıcıları, kodun nasıl çevrildiğini anlamanıza yardımcı olacaktır.

## API Temelleri {#api-basics}

Slither, sözleşmenin ve işlevlerinin temel niteliklerini keşfetmenizi sağlayan bir API'ye sahiptir.

Bir kod tabanını yüklemek için:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Sözleşmeleri ve işlevleri keşfetme {#exploring-contracts-and-functions}

Bir `Slither` nesnesi şunlara sahiptir:

- `contracts (list(Contract)`: sözleşmelerin listesi
- `contracts_derived (list(Contract)`: başka bir sözleşme tarafından miras alınmayan sözleşmelerin listesi (sözleşmelerin alt kümesi)
- `get_contract_from_name (str)`: Adından bir sözleşme döndürür

Bir `Contract` nesnesi şunlara sahiptir:

- `name (str)`: Sözleşmenin adı
- `functions (list(Function))`: İşlevlerin listesi
- `modifiers (list(Modifier))`: İşlevlerin listesi
- `all_functions_called (list(Function/Modifier))`: Sözleşme tarafından ulaşılabilen tüm dahili işlevlerin listesi
- `inheritance (list(Contract))`: Miras alınan sözleşmelerin listesi
- `get_function_from_signature (str)`: İmzasından bir İşlev (Function) döndürür
- `get_modifier_from_signature (str)`: İmzasından bir Değiştirici (Modifier) döndürür
- `get_state_variable_from_name (str)`: Adından bir Durum Değişkeni (StateVariable) döndürür

Bir `Function` veya `Modifier` nesnesi şunlara sahiptir:

- `name (str)`: İşlevin adı
- `contract (contract)`: işlevin bildirildiği sözleşme
- `nodes (list(Node))`: İşlevin/değiştiricinin CFG'sini oluşturan düğümlerin listesi
- `entry_point (Node)`: CFG'nin giriş noktası
- `variables_read (list(Variable))`: Okunan değişkenlerin listesi
- `variables_written (list(Variable))`: Yazılan değişkenlerin listesi
- `state_variables_read (list(StateVariable))`: Okunan durum değişkenlerinin listesi (okunan değişkenlerin alt kümesi)
- `state_variables_written (list(StateVariable))`: Yazılan durum değişkenlerinin listesi (yazılan değişkenlerin alt kümesi)