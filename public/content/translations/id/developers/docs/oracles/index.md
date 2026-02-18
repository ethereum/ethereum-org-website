---
title: Oracle
description: Oracle memberikan smart contract Ethereum akses ke data dunia nyata, membuka lebih banyak kasus penggunaan dan nilai tambah bagi pengguna.
lang: id
---

Oracle adalah aplikasi yang menghasilkan data feed yang membuat sumber data offchain tersedia bagi blockchain untuk digunakan oleh smart contract. This is necessary because Ethereum-based smart contracts, by default, cannot access information stored outside the blockchain network.

Memberikan smart contract kemampuan untuk mengeksekusi menggunakan data offchain memperluas kegunaan dan nilai dari aplikasi terdesentralisasi. Sebagai contoh, pasar prediksi onchain mengandalkan oracle untuk menyediakan informasi tentang hasil yang digunakan untuk memvalidasi prediksi pengguna. Misalkan Alice bertaruh 20 ETH pada siapa yang akan menjadi AS berikutnya. Presiden Dalam hal ini, dapp pasar prediksi membutuhkan oracle untuk mengonfirmasi hasil pemilihan dan menentukan apakah Alice berhak menerima pembayaran.

## Persyaratan {#prerequisites}

Halaman ini mengasumsikan pembaca sudah familiar dengan fundamental Ethereum, termasuk [simpul](/developers/docs/nodes-and-clients/), [mekanisme konsensus](/developers/docs/consensus-mechanisms/), dan [EVM](/developers/docs/evm/). Anda juga harus memiliki pemahaman yang baik tentang [kontrak pintar](/developers/docs/smart-contracts/) dan [anatomi kontrak pintar](/developers/docs/smart-contracts/anatomy/), terutama [aksi](/glossary/#events).

## Apa yang dimaksud dengan oracle blockchain? {#what-is-a-blockchain-oracle}

Oracle adalah aplikasi yang mengambil sumber, memverifikasi, dan mengirimkan informasi eksternal (yaitu, informasi yang disimpan di luar rantai) ke kontrak pintar yang berjalan di rantai blok. Selain “mengambil” data offchain dan menyiarkannya ke Ethereum, oracles juga dapat “mendorong” informasi dari blockchain ke sistem eksternal, misalnya membuka smart lock setelah pengguna mengirimkan biaya melalui transaksi Ethereum.

Tanpa oracle, smart contract akan sepenuhnya terbatas pada data on-chain.

Oracles berbeda berdasarkan sumber data (satu atau beberapa sumber), model kepercayaan (terpusat atau terdesentralisasi), dan arsitektur sistem (baca langsung, publish-subscribe, dan request-response). We can also distinguish between oracles based on whether they retrieve external data for use by onchain contracts (input oracles), send information from the blockchain to the offchain applications (output oracles), or perform computational tasks offchain (computational oracles).

## Mengapa kontrak pintar membutuhkan oracle? {#why-do-smart-contracts-need-oracles}

Banyak pengembang memandang smart contract sebagai kode yang dijalankan pada alamat tertentu di blockchain. Namun, pandangan yang lebih [umum tentang kontrak pintar](/smart-contracts/) adalah bahwa itu merupakan program perangkat lunak yang mengeksekusi sendiri yang mampu menegakkan perjanjian antara para pihak setelah kondisi tertentu terpenuhi - oleh karena itu disebut “kontrak pintar”.

Namun, menggunakan smart contract untuk menegakkan kesepakatan antar manusia tidaklah sederhana, mengingat Ethereum bersifat deterministik. [Sistem deterministik](https://en.wikipedia.org/wiki/Deterministic_algorithm) adalah sistem yang selalu menghasilkan hasil yang sama jika diberi kondisi awal dan input tertentu, yang berarti tidak ada keacakan atau variasi dalam proses penghitungan output dari input.

Untuk mencapai eksekusi deterministik, rantai blok membatasi simpul untuk mencapai konsensus pada pertanyaan biner sederhana (benar/salah) _hanya_ dengan menggunakan data yang tersimpan di rantai blok itu sendiri. Contoh pertanyaan-pertanyaan tersebut antara lain:

- "Apakah pemilik akun (diidentifikasi dengan kunci publik) menandatangani transaksi ini dengan kunci privat yang dipasangkan?"
- "Apakah akun ini memiliki cukup dana untuk menutupi transaksi?"
- "Apakah transaksi ini valid dalam konteks smart contract ini?", dll.

Jika blockchain menerima informasi dari sumber eksternal (yaitu dari dunia nyata), determinisme tidak akan mungkin tercapai, mencegah node untuk menyetujui keabsahan perubahan status blockchain. Ambil contoh sebuah smart contract yang mengeksekusi transaksi berdasarkan kurs ETH-USD saat ini yang diperoleh dari API harga tradisional. Nilai ini kemungkinan besar akan berubah secara sering (belum lagi API tersebut bisa saja dihentikan atau diretas), sehingga node yang mengeksekusi kode kontrak yang sama bisa mendapatkan hasil yang berbeda.

Untuk blockchain publik seperti Ethereum, yang memiliki ribuan node di seluruh dunia yang memproses transaksi, determinisme sangatlah penting. Tanpa adanya otoritas pusat yang menjadi sumber kebenaran, node memerlukan mekanisme untuk mencapai status yang sama setelah menerapkan transaksi yang sama. Sebuah kasus di mana node A menjalankan kode smart contract dan mendapatkan hasil "3", sementara node B mendapatkan "7" setelah menjalankan transaksi yang sama, akan menyebabkan konsensus runtuh dan menghilangkan nilai Ethereum sebagai platform komputasi terdesentralisasi.

Skenario ini juga menyoroti masalah dalam merancang blockchain yang mengambil informasi dari sumber eksternal. Namun, orakel menyelesaikan masalah ini dengan mengambil informasi dari sumber offchain dan menyimpannya di blockchain agar dapat digunakan oleh smart contract. Karena informasi yang disimpan di blockchain bersifat tidak dapat diubah dan tersedia untuk umum, node Ethereum dapat dengan aman menggunakan data offchain yang dibawa oleh orakel untuk menghitung perubahan status tanpa merusak konsensus.

Untuk melakukan hal ini, sebuah orakel biasanya terdiri dari kontrak pintar yang berjalan di onchain serta beberapa komponen yang berjalan di luar offchain. Kontrak onchain menerima permintaan data dari kontrak pintar lain, yang kemudian diteruskan ke komponen offchain (disebut node orakel). Node orakel ini dapat menanyakan sumber data—misalnya melalui antarmuka pemrograman aplikasi (API)—dan mengirim transaksi untuk menyimpan data yang diminta ke dalam penyimpanan kontrak pintar.

Secara mendasar, oracle blockchain menjembatani kesenjangan informasi antara blockchain dan dunia eksternal, sehingga menciptakan “kontrak pintar hibrida”. Kontrak pintar hibrida adalah kontrak yang berfungsi berdasarkan kombinasi kode kontrak yang berjalan onchain dan infrastruktur offchain. Pasar prediksi terdesentralisasi merupakan contoh yang sangat baik dari kontrak pintar hibrida. Contoh lain bisa berupa kontrak pintar asuransi pertanian yang melakukan pembayaran ketika sekumpulan oracle menentukan bahwa fenomena cuaca tertentu telah terjadi.

## Apa masalah oracle? Masalah oracle {#the-oracle-problem}

Oracle menyelesaikan masalah penting, tetapi juga menimbulkan beberapa komplikasi, misalnya.,:

- Bagaimana kita memverifikasi bahwa informasi yang dimasukkan diambil dari sumber yang benar atau tidak telah dimanipulasi?

- Bagaimana kami memastikan bahwa data ini selalu tersedia dan diperbarui secara berkala?

Yang disebut sebagai “masalah oracle” menunjukkan berbagai isu yang muncul saat menggunakan oracle blockchain untuk mengirim data ke smart contract. Data dari oracle harus benar agar kontrak pintar dapat dieksekusi dengan benar. Selain itu, harus ‘mempercayai’ operator oracle untuk memberikan informasi yang akurat justru melemahkan aspek ‘trustless’ dari smart contract.

Berbagai oracle menawarkan solusi berbeda terhadap masalah oracle, yang akan kita bahas lebih lanjut nanti. Oracle biasanya dinilai berdasarkan seberapa baik mereka mengatasi tantangan berikut:

1. **Kebenaran**: Sebuah oracle seharusnya tidak menyebabkan kontrak pintar memicu perubahan status berdasarkan data di luar rantai yang tidak valid. Oracle harus menjamin _keaslian_ dan _integritas_ data. Keaslian berarti data diperoleh dari sumber yang benar, sedangkan integritas berarti data tetap utuh (yaitu, tidak diubah) sebelum dikirim di dalam rantai.

2. **Ketersediaan**: Oracle tidak boleh menunda atau mencegah kontrak pintar mengeksekusi tindakan dan memicu perubahan status. Ini berarti bahwa data dari oracle harus _tersedia sesuai permintaan_ tanpa gangguan.

3. **Kesesuaian insentif**: Oracle harus memberikan insentif kepada penyedia data di luar rantai untuk mengirimkan informasi yang benar ke kontrak pintar. Kesesuaian insentif melibatkan _atribuabilitas_ dan _akuntabilitas_. Atributabilitas memungkinkan pengaitan informasi eksternal dengan penyedianya, sedangkan akuntabilitas mengikat penyedia data pada informasi yang mereka berikan, sehingga mereka dapat diberi imbalan atau dikenai penalti berdasarkan kualitas informasi tersebut.

## Bagaimana cara kerja layanan oracle blockchain? {#how-does-a-blockchain-oracle-service-work}

### Pengguna {#users}

Pengguna adalah entitas (yaitu smart contract) yang membutuhkan informasi di luar blockchain untuk menyelesaikan tindakan tertentu. Alur kerja dasar layanan oracle dimulai dengan pengguna mengirimkan permintaan data ke kontrak oracle. Permintaan data biasanya akan menjawab beberapa atau semua pertanyaan berikut:

1. Sumber apa saja yang dapat dibicarakan oleh node offchain untuk memperoleh informasi yang diminta?

2. Bagaimana reporter memproses informasi dari sumber data dan mengekstrak poin-poin data yang berguna?

3. Berapa banyak node oracle yang dapat berpartisipasi dalam mengambil data?

4. Bagaimana seharusnya perbedaan dalam laporan oracle dikelola?

5. Metode apa yang harus diterapkan dalam menyaring kiriman dan menggabungkan laporan ke dalam satu nilai?

### Kontrak oracle {#oracle-contract}

Kontrak oracle adalah komponen untuk layanan oracle. Kontrak ini mendengarkan permintaan data dari kontrak lain, meneruskan kueri data ke node oracle, dan menyiarkan data yang dikembalikan ke kontrak klien. Kontrak ini juga dapat melakukan beberapa perhitungan pada data yang dikembalikan untuk menghasilkan nilai agregat yang dikirim ke kontrak yang meminta data tersebut.

Kontrak oracle menyediakan beberapa fungsi yang dapat dipanggil oleh kontrak klien saat membuat permintaan data. Setelah menerima kueri baru, kontrak pintar akan memancarkan [log aksi](/developers/docs/smart-contracts/anatomy/#events-and-logs) dengan detail permintaan data. Ini memberitahu simpul di luar rantai yang berlangganan log (biasanya menggunakan sesuatu seperti perintah JSON-RPC `eth_subscribe`), yang kemudian melanjutkan untuk mengambil data yang didefinisikan dalam log aksi.

Di bawah ini adalah [contoh kontrak oracle](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) oleh Pedro Costa. Ini adalah layanan oracle sederhana yang dapat mengambil data dari API offchain saat diminta oleh smart contract lain dan menyimpan informasi yang diminta tersebut di blockchain:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //daftar permintaan yang dibuat ke kontrak
  uint currentId = 0; //meningkatkan id permintaan
  uint minQuorum = 2; //jumlah respons minimum yang diterima sebelum menyatakan hasil akhir
  uint totalOracleCount = 3; // Jumlah oracle yang di-hardcode

  // mendefinisikan permintaan api umum
  struct Request {
    uint id;                            //id permintaan
    string urlToQuery;                  //url API
    string attributeToFetch;            //atribut json (kunci) untuk diambil dalam respons
    string agreedValue;                 //nilai dari kunci
    mapping(uint => string) answers;     //jawaban yang diberikan oleh oracle
    mapping(address => uint) quorum;    //oracle yang akan meminta jawaban (1=oracle belum memilih, 2=oracle sudah memilih)
  }

  //aksi yang memicu oracle di luar rantai blok
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //dipicu ketika ada konsensus pada hasil akhir
  event UpdatedRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch,
    string agreedValue
  );

  function createRequest (
    string memory _urlToQuery,
    string memory _attributeToFetch
  )
  public
  {
    uint length = requests.push(Request(currentId, _urlToQuery, _attributeToFetch, ""));
    Request storage r = requests[length-1];

    // Alamat oracle yang di-hardcode
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // meluncurkan aksi untuk dideteksi oleh oracle di luar rantai blok
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // tingkatkan id permintaan
    currentId++;
  }

  //dipanggil oleh oracle untuk mencatat jawabannya
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //periksa apakah oracle ada dalam daftar oracle tepercaya
    //dan jika oracle belum memilih
    if(currRequest.quorum[address(msg.sender)] == 1){

      //menandai bahwa alamat ini telah memilih
      currRequest.quorum[msg.sender] = 2;

      //iterasi melalui "larik" jawaban sampai posisi bebas dan simpan nilai yang diambil
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //temukan slot kosong pertama
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterasi melalui daftar oracle dan periksa apakah cukup banyak oracle(kuorum minimum)
      //telah memilih jawaban yang sama dengan yang sekarang
      for(uint i = 0; i < totalOracleCount; i++){
        bytes memory a = bytes(currRequest.answers[i]);
        bytes memory b = bytes(_valueRetrieved);

        if(keccak256(a) == keccak256(b)){
          currentQuorum++;
          if(currentQuorum >= minQuorum){
            currRequest.agreedValue = _valueRetrieved;
            emit UpdatedRequest (
              currRequest.id,
              currRequest.urlToQuery,
              currRequest.attributeToFetch,
              currRequest.agreedValue
            );
          }
        }
      }
    }
  }
}
```

### Simpul oracle {#oracle-nodes}

Node oracle merupakan komponen offchain dari layanan oracle. Oracle ini mengambil informasi dari sumber eksternal, seperti API yang dihosting di server pihak ketiga, dan menempatkannya di blockchain agar dapat digunakan oleh smart contract. Node oracle mendengarkan event dari smart contract oracle di blockchain dan kemudian melaksanakan tugas yang dijelaskan dalam log.

Tugas umum untuk simpul oracle adalah mengirimkan permintaan [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) ke layanan API, mengurai respons untuk mengekstrak data yang relevan, memformatnya menjadi keluaran yang dapat dibaca rantai blok, dan mengirimkannya di dalam rantai dengan menyertakannya dalam transaksi ke kontrak oracle. Node oracle juga mungkin diminta untuk memberikan pernyataan attest mengenai keabsahan dan integritas informasi yang dikirimkan menggunakan “bukti keaslian” authenticity proofs, yang akan kita bahas lebih lanjut nanti.

Oracle komputasional juga bergantung pada node offchain untuk melakukan tugas komputasi yang akan sulit atau mahal jika dijalankan onchain, mengingat biaya gas dan batas ukuran blok. Sebagai contoh, node oracle dapat ditugaskan untuk menghasilkan angka yang dapat diverifikasi secara acak (misalnya, untuk game berbasis blockchain).

## Pola desain Oracle {#oracle-design-patterns}

Oracle hadir dalam berbagai jenis, termasuk _baca-langsung_, _publikasi-berlangganan_, dan _permintaan-respons_, dengan dua yang terakhir menjadi yang paling populer di antara kontrak pintar Ethereum. Di sini, kami akan menjelaskan secara singkat model publish-subscribe dan request-response.

### Oracle publikasi-berlangganan {#publish-subscribe-oracles}

Jenis oracle ini menyediakan "aliran data" yang dapat dibaca secara berkala oleh kontrak-kontrak lain untuk mendapatkan informasi. Dalam kasus ini, data diharapkan berubah secara sering, sehingga smart contract klien harus memantau pembaruan data di penyimpanan oracle. Contohnya adalah oracle yang menyediakan informasi harga terbaru ETH-USD kepada pengguna.

### Oracle permintaan-respons {#request-response-oracles}

Dalam setup request-response, smart contract klien dapat meminta data tertentu selain yang disediakan oleh oracle publish-subscribe. Oracle request-response ideal digunakan ketika dataset terlalu besar untuk disimpan di storage smart contract, dan/atau pengguna hanya membutuhkan sebagian kecil dari data tersebut pada suatu waktu.

Meskipun lebih kompleks dibandingkan model publish-subscribe, request-response oracle pada dasarnya adalah seperti yang kita jelaskan di bagian sebelumnya. Oracle akan memiliki komponen onchain yang menerima permintaan data dan meneruskannya ke node off-chain untuk diproses.

Pengguna yang memulai permintaan data harus menanggung biaya untuk mengambil informasi dari sumber offchain. Kontrak klien juga harus menyediakan dana untuk menutup biaya gas yang dikeluarkan oleh kontrak oracle saat mengembalikan respons melalui fungsi callback yang ditentukan dalam permintaan.

## Oracle terpusat vs. terdesentralisasi {#types-of-oracles}

### Oracle terpusat {#centralized-oracles}

Oracle terpusat dikendalikan oleh satu entitas yang bertanggung jawab untuk mengagregasi informasi offchain dan memperbarui data kontrak oracle sesuai permintaan. Oracle terpusat sangat efisien karena mengandalkan satu sumber kebenaran. Mereka mungkin berfungsi lebih baik dalam kasus di mana dataset milik pribadi diterbitkan langsung oleh pemiliknya dengan tanda tangan yang diterima secara luas. Namun, mereka juga memiliki kekurangan:

#### Jaminan kebenaran yang rendah {#low-correctness-guarantees}

Dengan oracle terpusat, tidak ada cara untuk memastikan apakah informasi yang diberikan benar atau tidak. Bahkan penyedia yang "terpercaya" pun bisa saja menyimpang atau diretas. Jika oracle menjadi rusak, smart contract akan dieksekusi berdasarkan data yang buruk.

#### Ketersediaan yang buruk {#poor-availability}

Oracle terpusat tidak menjamin selalu menyediakan data off-chain kepada smart contract lainnya. Jika penyedia memutuskan untuk mematikan layanan atau peretas membajak komponen off-chain oracle, smart contract Anda berisiko terkena serangan denial of service (DoS).

#### Kesesuaian insentif yang buruk {#poor-incentive-compatibility}

Oracle terpusat sering kali tidak dirancang dengan baik atau tidak memiliki insentif bagi penyedia data untuk mengirimkan informasi yang akurat/tidak berubah. Membayar oracle untuk mendapatkan informasi yang benar tidak menjamin bahwa oracle tersebut akan berlaku jujur. Masalah ini menjadi semakin besar seiring bertambahnya nilai yang dikendalikan oleh kontrak pintar.

### Oracle terdesentralisasi {#decentralized-oracles}

Oracle terdesentralisasi dirancang untuk mengatasi keterbatasan oracle terpusat dengan menghilangkan satu titik kegagalan. Layanan oracle terdesentralisasi terdiri dari banyak peserta dalam jaringan peer-to-peer yang membentuk konsensus atas data off-chain sebelum mengirimkannya ke smart contract.

Oracle yang terdesentralisasi seharusnya (idealnya) tidak memerlukan izin, tidak dapat dipercaya, dan bebas dari administrasi oleh pihak pusat; pada kenyataannya, desentralisasi di antara oracle ada dalam sebuah spektrum. Ada jaringan oracle semi-desentralisasi di mana siapa pun dapat berpartisipasi, tetapi dengan "pemilik" yang menyetujui dan menghapus node berdasarkan kinerja historis. Jaringan oracle yang terdesentralisasi sepenuhnya juga ada: jaringan ini biasanya berjalan sebagai blockchain mandiri dan memiliki mekanisme konsensus yang telah ditentukan untuk mengoordinasikan node dan menghukum perilaku buruk.

Menggunakan oracle terdesentralisasi memiliki beberapa manfaat sebagai berikut:

### Jaminan kebenaran yang tinggi {#high-correctness-guarantees}

Oracle terdesentralisasi berusaha untuk mencapai kebenaran data dengan menggunakan pendekatan yang berbeda. Ini mencakup penggunaan bukti yang menjamin keaslian dan integritas informasi yang dikembalikan, serta mengharuskan beberapa entitas untuk secara kolektif menyetujui keabsahan data off-chain.

#### Bukti keaslian {#authenticity-proofs}

Bukti keaslian adalah mekanisme kriptografi yang memungkinkan verifikasi independen atas informasi yang diambil dari sumber eksternal. Bukti-bukti ini dapat memvalidasi sumber informasi dan mendeteksi kemungkinan perubahan pada data setelah pengambilan.

Contoh bukti keaslian meliputi:

**Bukti Transport Layer Security (TLS)**: Simpul oracle sering kali mengambil data dari sumber eksternal menggunakan koneksi HTTP yang aman berdasarkan protokol Transport Layer Security (TLS). Beberapa oracle terdesentralisasi menggunakan bukti keaslian untuk memverifikasi sesi TLS (yaitu, mengonfirmasi pertukaran informasi antara sebuah node dan server tertentu) dan memastikan bahwa konten dari sesi tersebut tidak diubah.

**Pengesahan Lingkungan Eksekusi Tepercaya (TEE)**: [Lingkungan eksekusi tepercaya](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) adalah lingkungan komputasi dalam bak pasir (sandboxed) yang terisolasi dari proses operasional sistem induknya. TEE memastikan bahwa kode aplikasi atau data yang disimpan/digunakan dalam lingkungan komputasi tetap memiliki integritas, kerahasiaan, dan ketidakubahannya. Pengguna juga dapat menghasilkan sebuah pernyataan untuk membuktikan bahwa sebuah instansi aplikasi sedang berjalan di dalam lingkungan eksekusi terpercaya.

Beberapa kelas oracle terdesentralisasi memerlukan operator node oracle untuk menyediakan pernyataan TEE. Hal ini mengkonfirmasi kepada pengguna bahwa operator node sedang menjalankan sebuah instansi klien oracle dalam lingkungan eksekusi terpercaya. TEE mencegah proses eksternal untuk mengubah atau membaca kode dan data sebuah aplikasi, oleh karena itu, pernyataan tersebut membuktikan bahwa node oracle telah menjaga informasi tetap utuh dan rahasia.

#### Validasi informasi berbasis konsensus {#consensus-based-validation-of-information}

Oracle terpusat bergantung pada satu sumber kebenaran saat menyediakan data kepada kontrak pintar, yang memungkinkan untuk mempublikasikan informasi yang tidak akurat. Oracle terdesentralisasi menyelesaikan masalah ini dengan mengandalkan beberapa node oracle untuk mengambil informasi offchain. Dengan membandingkan data dari berbagai sumber, oracle terdesentralisasi mengurangi risiko mengirim informasi yang tidak valid ke smart contract onchain.

Namun, oracle terdesentralisasi harus menangani perbedaan informasi yang diperoleh dari berbagai sumber offchain. Untuk meminimalkan perbedaan informasi dan memastikan data yang diteruskan ke kontrak oracle mencerminkan opini kolektif node oracle, oracle terdesentralisasi menggunakan mekanisme berikut:

##### Pemungutan suara/pertaruhan pada keakuratan data

Beberapa jaringan oracle terdesentralisasi mengharuskan peserta untuk memberikan suara atau mempertaruhkan keakuratan jawaban atas kueri data (misalnya, "Siapa yang memenangkan pemilu AS 2020?") menggunakan token asli jaringan. Protokol agregasi kemudian menggabungkan suara dan taruhan dan mengambil jawaban yang didukung oleh mayoritas sebagai jawaban yang valid.

Node yang jawabannya menyimpang dari jawaban mayoritas akan dihukum dengan cara tokennya didistribusikan ke node lain yang memberikan nilai yang lebih benar. Memaksa node untuk memberikan ikatan sebelum memberikan data akan memberikan insentif untuk memberikan respon yang jujur karena mereka diasumsikan sebagai pelaku ekonomi yang rasional dan berniat untuk memaksimalkan keuntungan.

Penaruhan/pemungutan suara juga melindungi oracle terdesentralisasi dari [serangan Sybil](/glossary/#sybil-attack) di mana aktor jahat membuat banyak identitas untuk mempermainkan sistem konsensus. Namun, staking tidak dapat mencegah "freeloading" (node oracle menyalin informasi dari yang lain) dan "validasi malas" (node oracle mengikuti mayoritas tanpa memverifikasi informasi itu sendiri).

##### Mekanisme titik schelling

[Schelling point](https://en.wikipedia.org/wiki/Focal_point_\(game_theory\)) adalah konsep teori permainan yang mengasumsikan bahwa beberapa entitas akan selalu menggunakan solusi umum untuk suatu masalah tanpa adanya komunikasi. Mekanisme schelling-point sering digunakan dalam jaringan oracle yang terdesentralisasi untuk memungkinkan node mencapai konsensus dalam menjawab permintaan data.

Gagasan awal untuk ini adalah [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/), umpan data yang diusulkan di mana peserta mengirimkan tanggapan untuk pertanyaan \"skalar\" (pertanyaan yang jawabannya dijelaskan oleh besaran, mis., \"berapa harga ETH?\"), bersama dengan deposit. Pengguna yang memberikan nilai antara [persentil](https://en.wikipedia.org/wiki/Percentile) ke-25 dan ke-75 akan diberi imbalan, sementara mereka yang nilainya sangat menyimpang dari nilai median akan dikenai sanksi.

Meskipun SchellingCoin tidak ada saat ini, sejumlah oracle terdesentralisasi—terutama [Oracle dari Maker Protocol](https://docs.makerdao.com/smart-contract-modules/oracle-module)—menggunakan mekanisme schelling-point untuk meningkatkan akurasi data oracle. Setiap Maker Oracle terdiri dari jaringan P2P offchain dari node (“relayers” dan “feeds”) yang mengirimkan harga pasar untuk aset jaminan, serta kontrak onchain “Medianizer” yang menghitung nilai median dari semua data yang diberikan. Setelah periode penundaan yang ditentukan berakhir, nilai median ini menjadi harga referensi baru untuk aset terkait.

Contoh lain dari oracle yang menggunakan mekanisme Schelling point termasuk [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) dan [Witnet](https://witnet.io/). Pada kedua sistem, respons dari node oracle di jaringan peer-to-peer dikumpulkan menjadi satu nilai agregat, seperti mean atau median. Node diberi penghargaan atau hukuman sesuai dengan sejauh mana respons mereka selaras atau menyimpang dari nilai agregat.

Mekanisme Schelling point menarik karena meminimalkan jejak onchain (hanya satu transaksi yang perlu dikirim) sambil tetap menjamin desentralisasi. Yang terakhir ini dimungkinkan karena node harus menandatangani daftar respons yang dikirimkan sebelum dimasukkan ke dalam algoritme yang menghasilkan nilai rata-rata/median.

### Ketersediaan {#availability}

Layanan oracle terdesentralisasi memastikan ketersediaan data offchain yang tinggi bagi smart contract. Hal ini dicapai dengan mendesentralisasi baik sumber informasi offchain maupun node yang bertanggung jawab untuk mentransfer informasi tersebut ke onchain.

Hal ini memastikan toleransi kesalahan karena kontrak oracle dapat mengandalkan banyak node (yang juga mengandalkan banyak sumber data) untuk mengeksekusi kueri dari kontrak lain. Desentralisasi di tingkat sumber _dan_ operator-simpul sangat penting—jaringan simpul oracle yang menyajikan informasi yang diambil dari sumber yang sama akan mengalami masalah yang sama seperti oracle terpusat.

Selain itu, oracle berbasis stake dapat menjatuhkan penalti kepada operator node yang gagal merespons permintaan data dengan cepat. Hal ini secara signifikan memberi insentif kepada node oracle untuk berinvestasi dalam infrastruktur yang toleran terhadap kesalahan dan menyediakan data secara tepat waktu.

### Kesesuaian insentif yang baik {#good-incentive-compatibility}

Oracle terdesentralisasi menerapkan berbagai desain insentif untuk mencegah perilaku [Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault) di antara simpul oracle. Secara khusus, mereka mencapai _atribuabilitas_ dan _akuntabilitas_:

1. Node oracle yang terdesentralisasi sering kali diharuskan untuk menandatangani data yang mereka sediakan sebagai respons terhadap permintaan data. Informasi ini membantu dalam mengevaluasi kinerja historis node oracle, sehingga pengguna dapat menyaring node oracle yang tidak dapat diandalkan saat membuat permintaan data. Contohnya adalah [Sistem Reputasi Algoritmik](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) dari Witnet.

2. Oracle yang terdesentralisasi-seperti yang telah dijelaskan sebelumnya-mungkin mengharuskan node untuk mempertaruhkan kepercayaan mereka pada kebenaran data yang mereka kirimkan. Jika klaimnya lolos, saham ini dapat dikembalikan bersama dengan imbalan atas pelayanan yang jujur. Tetapi juga dapat dipangkas jika informasinya tidak benar, yang memberikan ukuran akuntabilitas.

## Aplikasi oracle dalam kontrak pintar {#applications-of-oracles-in-smart-contracts}

Berikut ini adalah kasus penggunaan umum untuk oracle di Ethereum:

### Mengambil data keuangan {#retrieving-financial-data}

Aplikasi [keuangan terdesentralisasi](/defi/) (DeFi) memungkinkan pemberian pinjaman, peminjaman, dan perdagangan aset secara peer-to-peer. Ini sering kali memerlukan pengumpulan berbagai informasi keuangan, termasuk data nilai tukar (untuk menghitung nilai fiat dari mata uang kripto atau membandingkan harga token) serta data pasar modal (untuk menghitung nilai aset yang tertokenisasi, seperti emas atau dolar AS).

Protokol peminjaman DeFi,contohnya, menanyakan harga pasar saat ini untuk aset (contoh, ETH) yang disimpan sebagai jaminan. Hal ini memungkinkan kontrak menemukan nilai aset jaminan dan menentukan berapa banyak yang dapat di pinjam dari sistem.

\"Oracle harga\" populer (seperti yang sering disebut) di DeFi mencakup Chainlink Price Feeds, [Open Price Feed](https://compound.finance/docs/prices) dari Compound Protocol, [Time-Weighted Average Prices (TWAPs)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) dari Uniswap, dan [Oracle Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Para pembangun harus memahami peringatan yang menyertai prediksi harga ini sebelum menerapkannya di proyek meraka. [Artikel](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) ini memberikan analisis mendetail tentang apa yang harus dipertimbangkan ketika berencana menggunakan salah satu oracle harga yang disebutkan.

Di bawah ini adalah contoh bagaimana Anda dapat mengambil harga ETH terbaru dalam kontrak pintar Anda menggunakan umpan harga Chainlink:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

### Menghasilkan keacakan yang dapat diverifikasi {#generating-verifiable-randomness}

Aplikasi blockchain tertentu, seperti permainan berbasis blockchain atau skema lotere, membutuhkan tingkat ketidakpastian dan keacakan yang tinggi agar dapat bekerja secara efektif. Akan tetapi, eksekusi deterministik dari rantaiblok menghilangkan keacakan.

Pendekatan aslinya adalah menggunakan fungsi kriptografi pseudorandom, seperti `blockhash`, tetapi ini dapat [dimanipulasi oleh penambang](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) menyelesaikan algoritma bukti kerja. Selain itu, [peralihan Ethereum ke bukti taruhan](/roadmap/merge/) berarti pengembang tidak dapat lagi mengandalkan `blockhash` untuk keacakan di dalam rantai. Sebagai gantinya, [mekanisme RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) dari Rantai Suar menyediakan sumber keacakan alternatif.

Dimungkinkan untuk menghasilkan nilai acak secara offchain dan mengirimkannya ke onchain, namun hal ini menuntut tingkat kepercayaan yang tinggi dari pengguna. Mereka harus percaya bahwa nilai tersebut benar-benar dihasilkan melalui mekanisme yang tidak dapat diprediksi dan tidak diubah dalam perjalanan.

Oracle yang dirancang untuk komputasi off-chain memecahkan masalah ini secara aman menghasilkan hasil acak di luar blockchain dan menyiarkannya on-chain beserta bukti kriptografi yang menjamin ketidakpastian proses tersebut. Contohnya adalah [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Verifiable Random Function), yang merupakan generator angka acak (RNG) yang terbukti adil dan tahan kerusakan yang berguna untuk membangun kontrak pintar yang andal untuk aplikasi yang mengandalkan hasil yang tidak dapat diprediksi.

### Mendapatkan hasil untuk peristiwa {#getting-outcomes-for-events}

Dengan oracle, membuat kontrak pintar yang merespons peristiwa di dunia nyata menjadi mudah. Layanan Oracle memungkinkan kontrak mengakses API eksternal lewat komponen off-chain dan menggunakan data dari sumber tersebut. Sebagai contoh, dapp prediksi yang disebutkan sebelumnya dapat meminta oracle untuk mengembalikan hasil pemilu dari sumber offchain terpercaya (misalnya, Associated Press).

Menggunakan oracle untuk mengambil data berdasarkan hasil dunia nyata memungkinkan berbagai kasus penggunaan baru; misalnya, produk asuransi terdesentralisasi memerlukan informasi akurat tentang cuaca, bencana, dan lain-lain agar dapat berfungsi secara efektif.

### Mengotomatiskan kontrak pintar {#automating-smart-contracts}

Smart contract tidak berjalan secara otomatis; sebaliknya, akun yang dimiliki secara eksternal (EOA) atau akun kontrak lain harus memicu fungsi yang tepat untuk mengeksekusi kode kontrak. Dalam banyak kasus, sebagian besar fungsi kontrak bersifat publik dan dapat digunakan oleh EOA dan kontrak lainnya.

Tetapi ada juga _fungsi privat_ dalam sebuah kontrak yang tidak dapat diakses oleh orang lain, tetapi sangat penting untuk fungsionalitas dapp secara keseluruhan. Contohnya termasuk fungsi `mintERC721Token()` yang secara berkala mencetak NFT baru untuk pengguna, fungsi untuk memberikan pembayaran di pasar prediksi, atau fungsi untuk membuka kunci token yang di-stake di DEX.

Pengembang perlu memicu fungsi-fungsi tersebut secara berkala agar aplikasi tetap berjalan dengan lancar. Namun, hal ini dapat menyebabkan lebih banyak waktu yang terbuang untuk tugas-tugas biasa bagi para pengembang, itulah sebabnya mengapa mengotomatiskan eksekusi smart contract menjadi menarik.

Beberapa jaringan oracle terdesentralisasi menawarkan layanan otomatisasi, yang memungkinkan node oracle offchain memicu fungsi smart contract sesuai dengan parameter yang ditentukan oleh pengguna. Biasanya, hal ini membutuhkan "mendaftarkan" kontrak target dengan layanan oracle, menyediakan dana untuk membayar operator oracle, dan menentukan kondisi atau waktu untuk memicu kontrak.

[Jaringan Keeper](https://chain.link/keepers) dari Chainlink menyediakan opsi bagi kontrak pintar untuk mengalihdayakan tugas pemeliharaan rutin dengan cara yang terdesentralisasi dan meminimalkan kepercayaan. Baca [dokumentasi Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) resmi untuk informasi tentang cara membuat kontrak Anda kompatibel dengan Keeper dan menggunakan layanan Upkeep.

## Cara menggunakan oracle rantai blok {#use-blockchain-oracles}

Ada beberapa aplikasi oracle yang dapat Anda integrasikan ke dalam dapp Ethereum Anda:

**[Chainlink](https://chain.link/)** - _Jaringan oracle terdesentralisasi Chainlink menyediakan input, output, dan komputasi yang tahan kerusakan untuk mendukung kontrak pintar canggih di rantai blok mana pun._

**[RedStone Oracles](https://redstone.finance/)** - _RedStone adalah oracle modular terdesentralisasi yang menyediakan umpan data yang dioptimalkan untuk gas._ Layanan ini berspesialisasi dalam menyediakan price feed untuk aset baru, seperti token liquid staking (LST), token liquid restaking (LRT), dan derivatif staking Bitcoin._

**[Chronicle](https://chroniclelabs.org/)** - _Chronicle mengatasi batasan saat ini dalam mentransfer data di dalam rantai dengan mengembangkan oracle yang benar-benar dapat diskalakan, hemat biaya, terdesentralisasi, dan dapat diverifikasi._

**[Witnet](https://witnet.io/)** - _Witnet adalah oracle tanpa izin, terdesentralisasi, dan tahan sensor yang membantu kontrak pintar untuk bereaksi terhadap peristiwa dunia nyata dengan jaminan kripto-ekonomi yang kuat._

**[UMA Oracle](https://uma.xyz)** - _Oracle optimistis UMA memungkinkan kontrak pintar untuk menerima segala jenis data dengan cepat untuk berbagai aplikasi, termasuk asuransi, derivatif keuangan, dan pasar prediksi._

**[Tellor](https://tellor.io/)** - _Tellor adalah protokol oracle yang transparan dan tanpa izin agar kontrak pintar Anda dapat dengan mudah mendapatkan data apa pun kapan pun dibutuhkan._

**[Band Protocol](https://bandprotocol.com/)** - _Band Protocol adalah platform oracle data lintas-rantai yang mengumpulkan dan menghubungkan data dunia nyata dan API ke kontrak pintar._

**[Pyth Network](https://pyth.network/)** - _Jaringan Pyth adalah jaringan oracle keuangan pihak pertama yang dirancang untuk mempublikasikan data dunia nyata secara berkelanjutan di dalam rantai dalam lingkungan yang tahan kerusakan, terdesentralisasi, dan mandiri._

**[API3 DAO](https://www.api3.org/)** - _API3 DAO memberikan solusi oracle pihak pertama yang memberikan transparansi sumber, keamanan, dan skalabilitas yang lebih besar dalam solusi terdesentralisasi untuk kontrak pintar_

**[Supra](https://supra.com/)** - Perangkat terintegrasi vertikal dari solusi lintas-rantai yang menghubungkan semua rantai blok, publik (L1 dan L2) atau privat (perusahaan), menyediakan umpan harga oracle terdesentralisasi yang dapat digunakan untuk kasus penggunaan di dalam rantai dan di luar rantai.

**[Gas Network](https://gas.network/)** - Platform oracle terdistribusi yang menyediakan data harga gas waktu nyata di seluruh rantai blok. Dengan membawa data dari penyedia data harga gas terkemuka ke dalam rantai, Gas Network membantu mendorong interoperabilitas. Gas Network mendukung data untuk lebih dari 35 rantai, termasuk Jaringan Utama Ethereum dan banyak L2 terkemuka.

## Bacaan lebih lanjut {#further-reading}

**Artikel**

- [Apa Itu Oracle Rantai Blok?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [Apa itu Oracle Rantai Blok?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Oracle Terdesentralisasi: tinjauan komprehensif](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Menerapkan Oracle Rantai Blok di Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Mengapa kontrak pintar tidak bisa melakukan panggilan API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Jadi, Anda ingin menggunakan oracle harga](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Video**

- [Oracle dan Perluasan Utilitas Rantai Blok](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Tutorial**

- [Cara Mengambil Harga Ethereum Saat Ini di Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Mengonsumsi Data Oracle](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_

**Contoh proyek**

- [Proyek pemula Chainlink lengkap untuk Ethereum di Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_
