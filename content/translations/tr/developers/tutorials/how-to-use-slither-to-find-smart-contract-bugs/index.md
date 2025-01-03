---
title: Akıllı sözleşme hatalarını bulmak için Slither nasıl kullanılır
description: Akıllı sözleşmelerdeki hataları otomatik olarak bulmak için Slither nasıl kullanılır
author: Trailofbits
lang: tr
tags:
  - "solidity"
  - "akıllı kontratlar"
  - "güvenlik"
  - "test etmek"
  - "statik analiz"
skill: advanced
published: 2020-06-09
source: Güvenli sözleşmeler oluşturmak
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Slither nasıl kullanılır {#how-to-use-slither}

Bu öğreticinin amacı, akıllı sözleşmelerdeki hataları otomatik olarak bulmak için Slither'ın nasıl kullanılacağını göstermektir.

- [Kurulum](#installation)
- [Komut satırı kullanımı](#command-line)
- [Statik analize giriş](#static-analysis): Statik analize kısa giriş
- [API](#api-basics): Python API açıklaması

## Kurulum {#installation}

Slither, Python >= 3.6 gerektirir. Pip veya docker kullanılarak kurulabilir.

Pip aracılığıyla Slither:

```bash
pip3 install --user slither-analyzer
```

Docker aracılığıyla Slither:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Son komut, geçerli dizininize erişimi olan bir docker'da eth-security-toolbox'ı çalıştırır. Dosyaları ana makinenizden değiştirebilir ve dosyalar üzerindeki araçları docker'dan çalıştırabilirsiniz_

Docker'ın içinde şunu çalıştırın:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Bir komut dosyası çalıştırma {#running-a-script}

Python 3 ile bir python komut dosyası çalıştırmak için:

```bash
python3 script.py
```

### Komut satırı {#command-line}

**Komut satırı ve kullanıcı tanımlı komut dosyaları.** Slither, birçok yaygın hatayı bulan bir dizi önceden tanımlanmış algılayıcıyla birlikte gelir. Slither'ı komut satırından çağırmak tüm algılayıcıları çalıştırır, ayrıntılı statik analiz bilgisi gerekmez:

```bash
slither project_paths
```

Algılayıcılara ek olarak Slither, [yazıcıları](https://github.com/crytic/slither#printers) ve [araçları](https://github.com/crytic/slither#tools) aracılığıyla kod inceleme kabiliyetlerine sahiptir.

Özel algılayıcılara ve GitHub entegrasyonuna erişmek için [crytic.io](https://github.com/crytic) kullanın.

## Statik analiz {#static-analysis}

Slither statik analiz çerçevesinin kabiliyetleri ve dizaynı, blog gönderilerinde ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) ve bir [akademik kağıtta](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf) açıklanmıştır.

Statik analiz çeşit çeşittir. Büyük olasılıkla [clang](https://clang-analyzer.llvm.org/) ve [gcc](https://lwn.net/Articles/806099/) gibi derleyicilerin bu araştırma tekniklerine bağlı olduğunun farkındasınızdır ancak bu, aynı zamanda [Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) ve [Frama-C](https://frama-c.com/) ve [Polyspace](https://www.mathworks.com/products/polyspace.html) gibi resmî yöntemlere dayalı araçların da önemini vurgular.

Burada statik analiz tekniklerini ve araştırmacıyı etraflıca incelemeyeceğiz. Bunun yerine, hataları bulmak ve kodu anlamak amacıyla onu daha etkili bir şekilde kullanabilmeniz için Slither'ın nasıl çalıştığını anlamak için gerekenlere odaklanacağız.

- [Kod temsili](#code-representation)
- [Kod analizi](#analysis)
- [Ara temsil](#intermediate-representation)

### Kod temsili {#code-representation}

Tek bir yürütme yolu hakkında mantık oluşturan dinamik bir analizin aksine, statik analiz aynı anda tüm yollar hakkında mantık oluşturur. Bunu yapmak için farklı bir kod temsiline dayanır. Soyut söz dizimi ağacı (AST) ve kontrol akış grafiği (CFG) en yaygın iki statik analiz yöntemidir.

### Soyut Söz Dizimi Ağaçları (AST) {#abstract-syntax-trees-ast}

AST, derleyici her kod ayrıştırdığında kullanılır. Muhtemelen statik analizin yapılabileceği en temel yapıdır.

Özetle bir AST, genellikle her yaprağın bir değişken veya sabit içerdiği ve dahili düğümlerin işlenenler veya kontrol akışı işlemleri olduğu yapılandırılmış bir ağaçtır. Aşağıdaki kodu göz önünde bulundurun:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

İlgili AST şurada gösterilir:

![AST](./ast.png)

Slither, solc tarafından dışa aktarılan AST'yi kullanır.

Oluşturulması basit olsa da, AST iç içe geçmiş bir yapıdır. Bazen, bunun analiz edilmesi pek kolay olmayabilir. Örnek olarak, `a + b <= a` ifadesi tarafından kullanılan operasyonları tanımlamak için, öncelikle `<=` ve sonrasında `+` analiz etmelisiniz. Yaygın bir yaklaşım, ağaçta yinelemeli olarak gezinen sözde ziyaretçi desenini kullanmaktır. Slither, [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py) içinde genel bir ziyaretçi bulundurur.

Aşağıdaki kod, ifadenin bir ekleme içerip içermediğini algılamak için `ExpressionVisitor` kullanır:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression is the expression to be tested
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Kontrol Akış Grafiği (CFG) {#control-flow-graph-cfg}

İkinci en yaygın kod temsili, kontrol akış grafiğidir (CFG). Adından da anlaşılacağı gibi, tüm yürütme yollarını ortaya çıkaran grafik tabanlı bir gösterimdir. Her düğüm bir veya birden fazla talimat içerir. Grafikteki kenarlar, kontrol akışı işlemlerini temsil eder (if/then/else, loop vb.). Önceki örneğimizin CFG'si:

![CFG](./cfg.png)

CFG, analizlerin çoğunun üzerine inşa edildiği temsildir.

Diğer birçok kod temsili mevcuttur. Her temsilin yapmak istediğiniz analize göre avantajları ve dezavantajları vardır.

### Analiz {#analysis}

Slither ile yapabileceğiniz en basit analiz türü söz dizimsel analizdir.

### Söz Dizimi Analizi {#syntax-analysis}

Slither, desen eşleştirme benzeri bir yaklaşım kullanarak tutarsızlıkları ve kusurları bulmak için kodun farklı bileşenleri ve temsilleri arasında gezinebilir.

Örneğin, aşağıdaki algılayıcılar söz dizimi ile ilgili sorunları arar:

- [Durum değişkeni gölgelemesi](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): tüm durum değişkenleri üzerinde yinelenir ve devralınan bir sözleşmeden bir değişkenin gölgelenip gölgelenmediğini kontrol eder ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Hatalı ERC20 arayüzü](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): hatalı ERC20 fonksiyon imzalarını arayın ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Semantik analiz {#semantic-analysis}

Söz dizimi analizinin aksine, semantik bir analiz daha derine inecek ve kodun "anlamını" analiz edecektir. Bu aile, bazı geniş analiz türlerini içerir. Daha güçlü ve kullanışlı sonuçlara yol açarlar, ancak aynı zamanda bunları yazmak daha karmaşıktır.

Semantik analiz, en gelişmiş güvenlik açığı tespitleri için kullanılır.

#### Veri bağımlılığı analizi {#fixed-point-computation}

`variable_a` değerinin `variable_b` tarafından etkilendiği bir yol varsa, `variable_a` değişkeninin `variable_b` değişkenine veri bağımlı olduğu söylenir.

Sıradaki kodda, `variable_a`, `variable_b`'ye bağımlıdır:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither, ara temsil özelliği sayesinde (sonraki bir bölümde bahsedilecek) yerleşik [veri bağımlılığı](https://github.com/crytic/slither/wiki/data-dependency) kabiliyetleriyle gelir.

Veri bağımlılığı kullanımının bir örneği [zararlı katı eşitlik algılayıcısında](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities) bulunabilir. Burada Slither, tehlikeli bir değerle ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) katı bir eşitlik karşılaştırması arayacak ve bir saldırganın sözleşmeyi tuzağa düşürmesini önlemek için kullanıcıya `==` yerine `>=` veya `<=` kullanması gerektiğini bildirecektir. Diğerlerinin yanı sıra algılayıcı, `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) çağrısının dönüş değerini tehlikeli olarak değerlendirecektir ve kullanımını izlemek için veri bağımlılığı motorunu kullanır.

#### Sabit-nokta hesaplaması {#fixed-point-computation}

Analiziniz CFG'de geziniyor ve kenarları takip ediyorsa, muhtemelen önceden ziyaret edilmiş düğümleri görmeniz olasıdır. Örneğin, aşağıda gösterildiği gibi bir döngü sunulursa:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Analizinizin ne zaman duracağını bilmesi gerekecek. Burada iki ana strateji vardır: (1) her bir düğümde sınırlı sayıda yineleme yapın, (2) _düzeltme noktası_ olarak adlandırılan bir noktayı hesaplayın. Bir düzeltme noktası temel olarak, bu düğümü analiz etmenin herhangi bir anlamlı bilgi sağlamadığı anlamına gelir.

Kullanılan bir sabitleme noktası örneği yeniden giriş algılayıcılarında bulunabilir: Slither düğümleri araştırır ve harici çağrıları arar, belleğe yazar ve okur. Bir düzeltme noktasına ulaştığında ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), keşfi durdurur ve farklı yeniden giriş modelleri aracılığıyla bir yeniden girişin olup olmadığını görmek için sonuçları analiz eder ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Etkili sabit nokta hesaplama kullanarak analiz yazmak, analizin bilgilerini nasıl yaydığının iyi anlaşılmasını gerektirir.

### Ara temsil {#intermediate-representation}

Bir ara temsil (IR), statik analize orijinalinden daha uygun olması amaçlanan bir dildir. Slither, Solidity'yi kendi IR'ına çevirir: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Yalnızca temel kontroller yazmak istiyorsanız SlithIR'ı anlamak gerekli değildir. Ancak, ileri düzey anlamsal analiz yazmayı planlıyorsanız kullanışlı olacaktır. [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) ve [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) yazıcıları, kodun nasıl çevirildiğini anlamanıza yardımcı olacaktır.

## API Temelleri {#api-basics}

Slither, sözleşmenin temel özelliklerini ve fonksiyonlarını keşfetmenizi sağlayan bir API'ye sahiptir.

Bir kod temelini yüklemek için:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Sözleşmeleri ve fonksiyonları keşfetme {#exploring-contracts-and-functions}

Bir `Slither` objesi şunlara sahiptir:

- `contracts (list(Contract)`: sözleşme listesi
- `contracts_derived (list(Contract)`: Başka bir sözleşme tarafından kalıtılmayan sözleşmelerin listesi (sözleşmelerin alt kümesi)
- `get_contract_from_name (str)`: İsminden bir sözleşmeyi döndürür

Bir `Contract` objesi şunlara sahiptir:

- `name (str)`: Sözleşmenin adı
- `functions (list(Function))`: Fonksiyon listesi
- `modifiers (list(Modifier))`: Fonksiyon listesi
- `all_functions_called (list(Function/Modifier))`: Sözleşme tarafından erişilebilen tüm iç fonksiyonların listesi
- `inheritance (list(Contract))`: Kalıtılan sözleşmelerin listesi
- `get_function_from_signature (str)`: İmzasından bir Function döndürür
- `get_modifier_from_signature (str)`: İmzasından bir Modifier döndürür
- `get_state_variable_from_name (str)`: İsminden bir StateVariable döndürür

Bir `Function` veya `Modifier` objesi şunlara sahiptir:

- `name (str)`: Fonksiyonun adı
- `contract (contract)`: Fonksiyonun duyurulduğu sözleşmenin adı
- `nodes (list(Node))`: Fonksiyonun/niteleyicinin CFG'sini tutan düğümlerin listesi
- `entry_point (Node)`: CFG giriş noktası
- `variables_read (list(Variable))`: Okunan değişkenlerin listesi
- `variables_written (list(Variable))`: Yazılan değişkenlerin listesi
- `state_variables_read (list(StateVariable))`: Okunan durum değişkenlerinin listesi (okunan değişkenlerin alt kümesi)
- `state_variables_written (list(StateVariable))`: Yazılan durum değişkenlerinin listesi (yazılan değişkenlerin alt kümesi)
