---
title: Dagger-Hashimoto
description: Μια λεπτομερής ματιά στον αλγόριθμο Dagger-Hashimoto.
lang: el
---

Το Dagger-Hashimoto ήταν η αρχική υλοποίηση έρευνας και προδιαγραφή για τον αλγόριθμο κρυπτόρυξης του Ethereum. Το Dagger-Hashimoto αντικαταστάθηκε από το [Ethash](#ethash). Η κρυπτόρυξη απενεργοποιήθηκε πλήρως με τη [Συγχώνευση](/roadmap/merge/) στις 15 Σεπτεμβρίου 2022. Από τότε, η ασφάλεια του Ethereum επιτυγχάνεται μέσω ενός μηχανισμού [απόδειξης συμμετοχής](/developers/docs/consensus-mechanisms/pos). Αυτή η σελίδα είναι ιστορικού ενδιαφέροντος. Οι πληροφορίες εδώ δεν είναι πλέον σχετικές για τη μετά τη Συγχώνευση εποχή του Ethereum.

## Προαπαιτούμενα {#prerequisites}

Για να κατανοήσετε καλύτερα αυτή τη σελίδα, σας συνιστούμε να διαβάσετε πρώτα για τη [συναίνεση απόδειξης εργασίας](/developers/docs/consensus-mechanisms/pow), την [κρυπτόρυξη](/developers/docs/consensus-mechanisms/pow/mining) και τους [αλγόριθμους κρυπτόρυξης](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger-Hashimoto {#dagger-hashimoto}

Το Dagger-Hashimoto στοχεύει στην ικανοποίηση δύο στόχων:

1.  **Αντίσταση στο ASIC**: το όφελος από τη δημιουργία εξειδικευμένου υλικού για τον αλγόριθμο θα πρέπει να είναι όσο το δυνατόν μικρότερο
2.  **Επαληθευσιμότητα ελαφρού πελάτη**: ένα μπλοκ πρέπει να είναι αποτελεσματικά επαληθεύσιμο από έναν ελαφρύ πελάτη.

Με μια πρόσθετη τροποποίηση, καθορίζουμε επίσης πώς να εκπληρώσουμε έναν τρίτο στόχο εάν το επιθυμούμε, αλλά με κόστος πρόσθετης πολυπλοκότητας:

**Αποθήκευση πλήρους αλυσίδας**: η εξόρυξη θα πρέπει να απαιτεί αποθήκευση της πλήρους κατάστασης της αλυσίδας μπλοκ (λόγω της ακανόνιστης δομής της trie κατάστασης Ethereum, προβλέπουμε ότι θα είναι δυνατή κάποια περικοπή, ιδιαίτερα ορισμένων συχνά χρησιμοποιούμενων συμβολαίων, αλλά θέλουμε να το ελαχιστοποιήσουμε αυτό).

## Δημιουργία DAG {#dag-generation}

Ο κώδικας για τον αλγόριθμο θα οριστεί παρακάτω σε Python. Πρώτον, δίνουμε `encode_int` για τη διευθέτηση μη υπογεγραμμένων int συγκεκριμένης ακρίβειας σε συμβολοσειρές. Η αντιστροφή του δίνεται επίσης:

```python
NUM_BITS = 512

def encode_int(x):
    "Encode an integer x as a string of 64 characters using a big-endian scheme"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "Unencode an integer x from a string using a big-endian scheme"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

Στη συνέχεια υποθέτουμε ότι το `sha3` είναι μια συνάρτηση που παίρνει έναν ακέραιο και επιστρέφει έναν ακέραιο, και το `dbl_sha3` είναι μια συνάρτηση διπλού sha3. Εάν μετατρέπετε αυτόν τον κώδικα αναφοράς σε μια εφαρμογή, χρησιμοποιήστε:

```python
from pyethereum import utils
def sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(x))

def dbl_sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(utils.sha3(x)))
```

### Παράμετροι {#parameters}

Οι παράμετροι που χρησιμοποιούνται για τον αλγόριθμο είναι:

```python
SAFE_PRIME_512 = 2**512 - 38117     # Largest Safe Prime less than 2**512

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # Size of the dataset (4 Gigabytes); MUST BE MULTIPLE OF 65536
      "n_inc": 65536,                   # Increment in value of n per period; MUST BE MULTIPLE OF 65536
                                        # with epochtime=20000 gives 882 MB growth per year
      "cache_size": 2500,               # Size of the light client's cache (can be chosen by light
                                        # client; not part of the algo spec)
      "diff": 2**14,                    # Difficulty (adjusted during block evaluation)
      "epochtime": 100000,              # Length of an epoch in blocks (how often the dataset is updated)
      "k": 1,                           # Number of parents of a node
      "w": w,                          # Used for modular exponentiation hashing
      "accesses": 200,                  # Number of dataset accesses during hashimoto
      "P": SAFE_PRIME_512               # Safe Prime for hashing and random number generation
}
```

Το `P` σε αυτή την περίπτωση είναι ένας πρώτος αριθμός επιλεγμένος έτσι ώστε το `log₂(P)` να είναι ελαφρώς μικρότερο από 512, το οποίο αντιστοιχεί στα 512 bits που έχουμε χρησιμοποιήσει για να αναπαραστήσουμε τους αριθμούς μας. Σημειώστε ότι μόνο το δεύτερο μισό του DAG πρέπει να αποθηκευτεί, οπότε η πραγματική απαίτηση σε μνήμη RAM ξεκινά από 1 GB και αυξάνεται κατά 441 MB ανά έτος.

### Δομή γραφήματος Dagger {#dagger-graph-building}

Η αρχική δομή γραφήματος dagger ορίζεται ως εξής:

```python
def produce_dag(params, seed, length):
    P = params["P"]
    picker = init = pow(sha3(seed), params["w"], P)
    o = [init]
    for i in range(1, length):
        x = picker = (picker * init) % P
        for _ in range(params["k"]):
            x ^= o[x % i]
        o.append(pow(x, params["w"], P))
    return o
```

Ουσιαστικά, ξεκινάει έναν γράφο ως μεμονωμένο κόμβο, `sha3(seed)`, και από εκεί αρχίζει να προσθέτει διαδοχικά άλλους κόμβους με βάση τυχαίους προηγούμενους κόμβους. Όταν δημιουργείται ένας νέος κόμβος, υπολογίζεται μια ακέραια δύναμη του seed για να επιλεχθούν τυχαία ορισμένοι δείκτες μικρότεροι από `i` (χρησιμοποιώντας `x % i` παραπάνω) και οι τιμές των κόμβων σε αυτούς τους δείκτες χρησιμοποιούνται σε έναν υπολογισμό για να δημιουργηθεί μια νέα τιμή για το `x`, η οποία στη συνέχεια τροφοδοτείται σε μια μικρή συνάρτηση απόδειξης εργασίας (βασισμένη σε XOR) για να δημιουργήσει τελικά την τιμή του γράφου στο δείκτη `i`. Το σκεπτικό αυτού του συγκεκριμένου σχεδιασμού είναι να επιβάλει τη διαδοχική πρόσβαση στο DAG. Η επόμενη τιμή του DAG που θα προσεγγιστεί δεν μπορεί να προσδιοριστεί μέχρι να είναι γνωστή η τρέχουσα τιμή. Τέλος, ο αλγόριθμος εκθετικής αρίθμησης κατακερματίζει περαιτέρω το αποτέλεσμα.

Αυτός ο αλγόριθμος βασίζεται σε διάφορα αποτελέσματα από τη θεωρία αριθμών. Δείτε το παράρτημα παρακάτω για μια συζήτηση.

## Αξιολόγηση ελαφρού πελάτη {#light-client-evaluation}

Η παραπάνω κατασκευή γράφου στοχεύει να επιτρέψει σε κάθε κόμβο στον γράφο να ανακατασκευαστεί με τον υπολογισμό ενός υποδέντρου μόνο ενός μικρού αριθμού κόμβων και απαιτώντας μόνο μια μικρή ποσότητα βοηθητικής μνήμης. Σημειώστε ότι με k=1, το υποδέντρο είναι μόνο μια αλυσίδα τιμών που ανεβαίνει μέχρι το πρώτο στοιχείο στο DAG.

Η συνάρτηση υπολογισμού ελαφρού πελάτη για το DAG λειτουργεί ως εξής:

```python
def quick_calc(params, seed, p):
    w, P = params["w"], params["P"]
    cache = {}

    def quick_calc_cached(p):
        if p in cache:
            pass
        elif p == 0:
            cache[p] = pow(sha3(seed), w, P)
        else:
            x = pow(sha3(seed), (p + 1) * w, P)
            for _ in range(params["k"]):
                x ^= quick_calc_cached(x % p)
            cache[p] = pow(x, w, P)
        return cache[p]

    return quick_calc_cached(p)
```

Ουσιαστικά, είναι απλώς μια εκ νέου συγγραφή του παραπάνω αλγόριθμου που αφαιρεί τον βρόχο υπολογισμού των τιμών για ολόκληρο το DAG και αντικαθιστά την προηγούμενη αναζήτηση κόμβου με μια αναδρομική κλήση ή μια αναζήτηση cache. Σημειώστε ότι για `k=1` το cache δεν είναι απαραίτητο, αν και μια περαιτέρω βελτιστοποίηση προϋπολογίζει στην πραγματικότητα τις πρώτες χιλιάδες τιμές του DAG και τις διατηρεί ως ένα στατικό cache για υπολογισμούς. Δείτε το παράρτημα για μια υλοποίηση κώδικα αυτού.

## Διπλός χώρος μνήμης για DAG {#double-buffer}

Σε έναν πλήρη πελάτη, χρησιμοποιείται ένας [_διπλός χώρος μνήμης_](https://wikipedia.org/wiki/Multiple_buffering) 2 DAG που παράγονται από τον παραπάνω τύπο. Η ιδέα είναι ότι τα DAG παράγονται ανά κάθε αριθμό μπλοκ `epochtime` σύμφωνα με τις προαναφερθείσες παραμέτρους. Αντί ο πελάτης να χρησιμοποιεί το πιο πρόσφατο παραγόμενο DAG, χρησιμοποιεί το προηγούμενο. Το πλεονέκτημα αυτού είναι ότι επιτρέπει την αντικατάσταση των DAG με την πάροδο του χρόνου χωρίς την ανάγκη να ενσωματώσει ένα βήμα όπου οι εξορύκτες πρέπει ξαφνικά να επανυπολογίσουν όλα τα δεδομένα. Διαφορετικά, υπάρχει η πιθανότητα μιας απότομης προσωρινής επιβράδυνσης στην επεξεργασία της αλυσίδας σε τακτά χρονικά διαστήματα και δραματική αύξηση της κεντρικοποίησης. Έτσι, οι κίνδυνοι επίθεσης 51% εντός αυτών των λίγων λεπτών πριν από την επανυπολογισμό όλων των δεδομένων.

Ο αλγόριθμος που χρησιμοποιείται για τη δημιουργία του συνόλου των DAG που χρησιμοποιούνται για τον υπολογισμό της εργασίας για ένα μπλοκ είναι ο εξής:

```python
def get_prevhash(n):
    from pyethereum.blocks import GENESIS_PREVHASH
    from pyethereum import chain_manager
    if n <= 0:
        return hash_to_int(GENESIS_PREVHASH)
    else:
        prevhash = chain_manager.index.get_block_by_number(n - 1)
        return decode_int(prevhash)

def get_seedset(params, block):
    seedset = {}
    seedset["back_number"] = block.number - (block.number % params["epochtime"])
    seedset["back_hash"] = get_prevhash(seedset["back_number"])
    seedset["front_number"] = max(seedset["back_number"] - params["epochtime"], 0)
    seedset["front_hash"] = get_prevhash(seedset["front_number"])
    return seedset

def get_dagsize(params, block):
    return params["n"] + (block.number // params["epochtime"]) * params["n_inc"]

def get_daggerset(params, block):
    dagsz = get_dagsize(params, block)
    seedset = get_seedset(params, block)
    if seedset["front_hash"] <= 0:
        # No back buffer is possible, just make front buffer
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

Η ιδέα του αρχικού Hashimoto είναι να χρησιμοποιηθεί το blockchain ως σύνολο δεδομένων, το οποίο εκτελεί έναν υπολογισμό που επιλέγει Ν δείκτες από το blockchain, συλλέγει τις συναλλαγές σε αυτούς τους δείκτες, εκτελεί ένα XOR αυτών των δεδομένων και επιστρέφει το hash του αποτελέσματος. Ο αρχικός αλγόριθμος του Thaddeus Dryja, μεταφρασμένος σε Python για συνέπεια, είναι ως εξής:

```python
def orig_hashimoto(prev_hash, merkle_root, list_of_transactions, nonce):
    hash_output_A = sha256(prev_hash + merkle_root + nonce)
    txid_mix = 0
    for i in range(64):
        shifted_A = hash_output_A >> i
        transaction = shifted_A % len(list_of_transactions)
        txid_mix ^= list_of_transactions[transaction] << i
    return txid_mix ^ (nonce << 192)
```

Δυστυχώς, ενώ το Hashimoto θεωρείται δύσκολο για τη RAM, βασίζεται σε αριθμητική 256-bit, η οποία έχει σημαντικό υπολογιστικό κόστος. Ωστόσο, το Dagger-Hashimoto χρησιμοποιεί μόνο τα λιγότερο σημαντικά 64 bits κατά την ευρετηρίαση του συνόλου δεδομένων του για να αντιμετωπίσει αυτό το πρόβλημα.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

Η χρήση του διπλού SHA3 επιτρέπει μια μορφή μηδενικών δεδομένων, σχεδόν άμεσης προ-επαλήθευσης, επαληθεύοντας μόνο ότι παράχθηκε μια σωστή ενδιάμεση τιμή. Αυτό το εξωτερικό επίπεδο απόδειξης εργασίας είναι πολύ φιλικό προς τα ASIC και αρκετά αδύναμο, αλλά υπάρχει για να καταστήσει τη DDoS ακόμη πιο δύσκολη, καθώς πρέπει να γίνει αυτή η μικρή ποσότητα εργασίας για να παραχθεί ένα μπλοκ που δεν θα απορριφθεί αμέσως. Δείτε παρακάτω την έκδοση πελάτη μικρού μεγέθους:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Κρυπτόρυξη και επιβεβαίωση {#mining-and-verifying}

Τώρα, ας τα βάλουμε όλα μαζί στον αλγόριθμο κρυπτόρυξης:

```python
def mine(daggerset, params, block):
    from random import randint
    nonce = randint(0, 2**64)
    while 1:
        result = hashimoto(daggerset, get_dagsize(params, block),
                           params, decode_int(block.prevhash), nonce)
        if result * params["diff"] < 2**256:
            break
        nonce += 1
        if nonce >= 2**64:
            nonce = 0
    return nonce
```

Δείτε τον αλγόριθμο επαλήθευσης:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Φιλική επαλήθευση πελάτη μικρού μεγέθους:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Σημειώστε επίσης ότι το Dagger-Hashimoto επιβάλλει πρόσθετες απαιτήσεις στην κεφαλίδα μπλοκ:

- Για να λειτουργήσει η επαλήθευση δύο επιπέδων, μια κεφαλίδα μπλοκ πρέπει να έχει τόσο το nonce όσο και την ενδιάμεση τιμή pre-sha3
- Κάπου, μια κεφαλίδα μπλοκ πρέπει να αποθηκεύσει το sha3 του τρέχοντος seedset

## Περισσότερες πληροφορίες {#further-reading}

_Γνωρίζετε κάποιο πόρο της κοινότητας που σας βοήθησε; Επεξεργαστείτε αυτή τη σελίδα και προσθέστε το!_

## Appendix {#appendix}

Όπως σημειώθηκε παραπάνω, ο RNG που χρησιμοποιείται για τη δημιουργία DAG βασίζεται σε ορισμένα αποτελέσματα από τη θεωρία αριθμών. Πρώτον, παρέχουμε διαβεβαίωση ότι η γεννήτρια τυχαίων αριθμών Lehmer που αποτελεί τη βάση για τη μεταβλητή `picker` έχει μεγάλη περίοδο. Δεύτερον, δείχνουμε ότι το `pow(x,3,P)` δεν θα αντιστοιχίσει το `x` σε `1` ή `P-1` υπό την προϋπόθεση ότι το `x ∈ [2,P-2]` για να ξεκινήσει. Τέλος, δείχνουμε ότι το `pow(x,3,P)` έχει χαμηλό ποσοστό σύγκρουσης όταν αντιμετωπίζεται ως συνάρτηση κατακερματισμού.

### Γεννήτρια τυχαίων αριθμών Lehmer {#lehmer-random-number}

Ενώ η συνάρτηση `produce_dag` δεν χρειάζεται να παράγει αντικειμενικούς τυχαίους αριθμούς, μια πιθανή απειλή είναι ότι το `seed**i % P` λαμβάνει μόνο μερικές τιμές. Αυτό θα μπορούσε να παρέχει ένα πλεονέκτημα στους κρυπτορύχους που αναγνωρίζουν το μοτίβο έναντι εκείνων που δεν το αναγνωρίζουν.

Για να το αποφύγουμε αυτό, επικαλούμαστε ένα αποτέλεσμα από τη θεωρία αριθμών. Ένας [_ασφαλής πρώτος αριθμός_](https://en.wikipedia.org/wiki/Safe_prime) ορίζεται ως πρώτος αριθμός `P` έτσι ώστε το `(P-1)/2` να είναι επίσης πρώτος. Η _τάξη_ ενός μέλους `x` της [πολλαπλασιαστικής ομάδας](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` ορίζεται ως το ελάχιστο `m` έτσι ώστε <pre>xᵐ mod P ≡ 1</pre>
Δεδομένων των ορισμών αυτών, έχουμε:

> Παρατήρηση 1. Ας είναι το `x` ένα μέλος της πολλαπλασιαστικής ομάδας `ℤ/Pℤ` για έναν ασφαλή πρώτο αριθμό `P`. Εάν `x mod P ≠ 1 mod P` και `x mod P ≠ P-1 mod P`, τότε η τάξη του `x` είναι είτε `P-1` είτε `(P-1)/2`.

_Απόδειξη_. Δεδομένου ότι το `P` είναι ένας ασφαλής πρώτος αριθμός, τότε από το \[θεώρημα του Lagrange\]\[lagrange\] έχουμε ότι η τάξη του `x` είναι είτε `1`, `2`, `(P-1)/2` ή `P-1`.

Η τιμή του `x` δεν μπορεί να είναι `1`, καθώς από το μικρό θεώρημα του Fermat έχουμε:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Επομένως, το `x` πρέπει να είναι μια πολλαπλασιαστική ταυτότητα του `ℤ/nℤ,` η οποία είναι μοναδική. Δεδομένου ότι υποθέσαμε ότι το `x ≠ 1` σύμφωνα με την παραδοχή, αυτό δεν είναι δυνατό.

Η τάξη του `x` δεν μπορεί να είναι `2` εκτός εάν `x = P-1`, καθώς αυτό θα παραβίαζε ότι το `P` είναι πρώτος αριθμός.

Από την παραπάνω πρόταση, μπορούμε να αναγνωρίσουμε ότι η επανάληψη `(picker * init) % P` θα έχει μήκος κύκλου τουλάχιστον `(P-1)/2`. Αυτό συμβαίνει επειδή επιλέξαμε το `P` ως ασφαλή πρώτο αριθμό περίπου ίσο με μια υψηλότερη δύναμη του δύο και το `init` είναι στο διάστημα `[2,2**256+1]`. Δεδομένου του μεγέθους του `P`, δεν πρέπει ποτέ να περιμένουμε έναν κύκλο από την εκθετοποίηση υπολοίπων.

Όταν αντιστοιχίζουμε το πρώτο κελί στο DAG (η μεταβλητή με ετικέτα `init`), υπολογίζουμε `pow(sha3(seed) + 2, 3, P)`. Σε μια πρώτη ματιά, αυτό δεν εγγυάται ότι το αποτέλεσμα δεν είναι ούτε `1` ούτε `P-1`. Ωστόσο, δεδομένου ότι το `P-1` είναι ένας ασφαλής πρώτος αριθμός, έχουμε την ακόλουθη πρόσθετη διαβεβαίωση, η οποία είναι ένα απόρροια της Παρατήρησης 1:

> Παρατήρηση 2. Έστω ότι το `x` είναι μέλος της πολλαπλασιαστικής ομάδας `ℤ/Pℤ` για έναν ασφαλή πρώτο αριθμό `P` και έστω ότι το `w` είναι φυσικός αριθμός. Εάν `x mod P ≠ 1 mod P` και `x mod P ≠ P-1 mod P`, καθώς `w mod P ≠ P-1 mod P` και `w mod P ≠ 0 mod P`, τότε `xʷ mod P ≠ 1 mod P` και `xʷ mod P ≠ P-1 mod P`

### Η εκθετοποίηση υπολοίπων ως συνάρτηση κατακερματισμού {#modular-exponentiation}

Για ορισμένες τιμές των `P` και `w`, η συνάρτηση `pow(x, w, P)` μπορεί να έχει πολλές συγκρούσεις. Για παράδειγμα, το `pow(x,9,19)` παίρνει μόνο τις τιμές `{1,18}`.

Δεδομένου ότι το `P` είναι πρώτος αριθμός, τότε ένα κατάλληλο `w` για μια συνάρτηση κατακερματισμού εκθετοποίησης υπολοίπων μπορεί να επιλεγεί χρησιμοποιώντας το ακόλουθο αποτέλεσμα:

> Παρατήρηση 3. Έστω ότι το `P` είναι πρώτος αριθμός, τα `w` και `P-1` είναι σχετικά πρώτοι αν και μόνο αν για όλα τα `a` και `b` σε `ℤ/Pℤ`:
> 
> <center>
>   `aʷ mod P ≡ bʷ mod P` αν και μόνο αν `a mod P ≡ b mod P`
> </center>

Έτσι, δεδομένου ότι το `P` είναι πρώτος και το `w` είναι σχετικά πρώτος με το `P-1`, έχουμε ότι `|{pow(x, w, P) : x ∈ ℤ}| = P`, υποδηλώνοντας ότι η συνάρτηση κατακερματισμού έχει το ελάχιστο δυνατό ποσοστό σύγκρουσης.

Στην ειδική περίπτωση που το `P` είναι ένας ασφαλής πρώτος όπως έχουμε επιλέξει, τότε το `P-1` έχει μόνο τους παράγοντες 1, 2, `(P-1)/2` και `P-1`. Δεδομένου ότι το `P` > 7, γνωρίζουμε ότι το 3 είναι σχετικά πρώτος με το `P-1`, επομένως το `w=3` ικανοποιεί την παραπάνω πρόταση.

## Πιο αποδοτικός αλγόριθμος αξιολόγησης βάσης cache {#cache-based-evaluation}

```python
def quick_calc(params, seed, p):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_calc_cached(cache, params, p)

def quick_calc_cached(cache, params, p):
    P = params["P"]
    if p < len(cache):
        return cache[p]
    else:
        x = pow(cache[0], p + 1, P)
        for _ in range(params["k"]):
            x ^= quick_calc_cached(cache, params, x % p)
        return pow(x, params["w"], P)

def quick_hashimoto(seed, dagsize, params, header, nonce):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_hashimoto_cached(cache, dagsize, params, header, nonce)

def quick_hashimoto_cached(cache, dagsize, params, header, nonce):
    m = dagsize // 2
    mask = 2**64 - 1
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc_cached(cache, params, m + (mix & mask) % m)
    return dbl_sha3(mix)
```
