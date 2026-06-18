---
title: Orakel
description: Orakel memberi kontrak pintar Ethereum akses ke data dunia nyata, membuka lebih banyak kasus penggunaan dan nilai yang lebih besar bagi pengguna.
lang: id
authors: ["Patrick Collins"]
---

Orakel adalah aplikasi yang menghasilkan umpan data yang membuat sumber data offchain tersedia bagi rantai blok untuk kontrak pintar. Hal ini diperlukan karena kontrak pintar berbasis Ethereum secara bawaan tidak dapat mengakses informasi yang disimpan di luar jaringan rantai blok.

Memberi kontrak pintar kemampuan untuk mengeksekusi menggunakan data offchain memperluas utilitas dan nilai aplikasi terdesentralisasi (dapp). Misalnya, pasar prediksi onchain bergantung pada orakel untuk memberikan informasi tentang hasil yang mereka gunakan untuk memvalidasi prediksi pengguna. Misalkan Alice bertaruh 20 ETH tentang siapa yang akan menjadi Presiden AS berikutnya. Dalam hal ini, dapp pasar prediksi memerlukan orakel untuk mengonfirmasi hasil pemilu dan menentukan apakah Alice memenuhi syarat untuk mendapatkan pembayaran.

## Prasyarat {#prerequisites}

Halaman ini mengasumsikan pembaca sudah familier dengan dasar-dasar [Ethereum](/), termasuk [node](/developers/docs/nodes-and-clients/), [mekanisme konsensus](/developers/docs/consensus-mechanisms/), dan [EVM](/developers/docs/evm/). Anda juga harus memiliki pemahaman yang baik tentang [kontrak pintar](/developers/docs/smart-contracts/) dan [anatomi kontrak pintar](/developers/docs/smart-contracts/anatomy/), terutama [peristiwa](/glossary/#events).

## Apa itu oracle blockchain? {#what-is-a-blockchain-oracle}

Orakel adalah aplikasi yang mencari, memverifikasi, dan mengirimkan informasi eksternal (yaitu, informasi yang disimpan offchain) ke kontrak pintar yang berjalan di rantai blok. Selain "menarik" data offchain dan menyiarkannya di Ethereum, orakel juga dapat "mendorong" informasi dari rantai blok ke sistem eksternal, mis., membuka kunci pintar setelah pengguna mengirimkan biaya melalui transaksi Ethereum.

Tanpa orakel, kontrak pintar akan sepenuhnya terbatas pada data onchain.

Orakel berbeda-beda berdasarkan sumber data (satu atau beberapa sumber), model kepercayaan (tersentralisasi atau terdesentralisasi), dan arsitektur sistem (baca-langsung, publikasi-berlangganan, dan permintaan-respons). Kita juga dapat membedakan orakel berdasarkan apakah mereka mengambil data eksternal untuk digunakan oleh kontrak onchain (orakel input), mengirim informasi dari rantai blok ke aplikasi offchain (orakel output), atau melakukan tugas komputasi offchain (orakel komputasi).

## Mengapa kontrak pintar membutuhkan orakel? {#why-do-smart-contracts-need-oracles}

Banyak pengembang melihat kontrak pintar sebagai kode yang berjalan di alamat tertentu pada rantai blok. Namun, [pandangan yang lebih umum tentang kontrak pintar](/smart-contracts/) adalah bahwa mereka merupakan program perangkat lunak yang mengeksekusi sendiri dan mampu menegakkan perjanjian antar pihak setelah kondisi tertentu terpenuhi - karenanya disebut "kontrak pintar."

Namun, menggunakan kontrak pintar untuk menegakkan perjanjian antar orang tidaklah mudah, mengingat Ethereum bersifat deterministik. [Sistem deterministik](https://en.wikipedia.org/wiki/Deterministic_algorithm) adalah sistem yang selalu menghasilkan hasil yang sama jika diberikan state awal dan input tertentu, yang berarti tidak ada keacakan atau variasi dalam proses menghitung output dari input.

Untuk mencapai eksekusi deterministik, rantai blok membatasi node untuk mencapai konsensus pada pertanyaan biner sederhana (benar/salah) _hanya_ menggunakan data yang disimpan di rantai blok itu sendiri. Contoh pertanyaan tersebut meliputi:

- "Apakah pemilik akun (diidentifikasi oleh kunci publik) menandatangani transaksi ini dengan kunci privat yang dipasangkan?"
- "Apakah akun ini memiliki dana yang cukup untuk menutupi transaksi?"
- "Apakah transaksi ini valid dalam konteks kontrak pintar ini?", dll.

Jika rantai blok menerima informasi dari sumber eksternal (yaitu, dari dunia nyata), determinisme akan mustahil dicapai, sehingga mencegah node menyetujui validitas perubahan pada state rantai blok. Ambil contoh kontrak pintar yang mengeksekusi transaksi berdasarkan nilai tukar ETH-USD saat ini yang diperoleh dari API harga tradisional. Angka ini kemungkinan akan sering berubah (belum lagi API tersebut bisa saja dihentikan atau diretas), yang berarti node yang mengeksekusi kode kontrak yang sama akan mendapatkan hasil yang berbeda.

Untuk rantai blok publik seperti Ethereum, dengan ribuan node di seluruh dunia yang memproses transaksi, determinisme sangatlah penting. Tanpa otoritas pusat yang berfungsi sebagai sumber kebenaran, node memerlukan mekanisme untuk mencapai state yang sama setelah menerapkan transaksi yang sama. Kasus di mana node A mengeksekusi kode kontrak pintar dan mendapatkan hasil "3", sementara node B mendapatkan "7" setelah menjalankan transaksi yang sama akan menyebabkan konsensus rusak dan menghilangkan nilai Ethereum sebagai platform komputasi terdesentralisasi.

Skenario ini juga menyoroti masalah dalam merancang rantai blok untuk menarik informasi dari sumber eksternal. Namun, orakel memecahkan masalah ini dengan mengambil informasi dari sumber offchain dan menyimpannya di rantai blok untuk dikonsumsi oleh kontrak pintar. Karena informasi yang disimpan onchain bersifat tidak dapat diubah (ketidakberubahan) dan tersedia untuk publik, node Ethereum dapat dengan aman menggunakan data offchain yang diimpor orakel untuk menghitung perubahan state tanpa merusak konsensus.

Untuk melakukan ini, sebuah orakel biasanya terdiri dari kontrak pintar yang berjalan onchain dan beberapa komponen offchain. Kontrak onchain menerima permintaan data dari kontrak pintar lainnya, yang kemudian diteruskan ke komponen offchain (disebut node orakel). Node orakel ini dapat meminta sumber data—menggunakan antarmuka pemrograman aplikasi (API), misalnya—dan mengirim transaksi untuk menyimpan data yang diminta di penyimpanan kontrak pintar.

Pada dasarnya, oracle blockchain menjembatani kesenjangan informasi antara rantai blok dan lingkungan eksternal, menciptakan "kontrak pintar hibrida". Kontrak pintar hibrida adalah kontrak yang berfungsi berdasarkan kombinasi kode kontrak onchain dan infrastruktur offchain. Pasar prediksi terdesentralisasi adalah contoh yang sangat baik dari kontrak pintar hibrida. Contoh lain mungkin termasuk kontrak pintar asuransi tanaman yang membayar ketika sekumpulan orakel menentukan bahwa fenomena cuaca tertentu telah terjadi.

## Apa itu masalah oracle? {#the-oracle-problem}

Orakel memecahkan masalah penting, tetapi juga memperkenalkan beberapa komplikasi, mis.,:

- Bagaimana kita memverifikasi bahwa informasi yang disuntikkan diekstraksi dari sumber yang benar atau belum dirusak?

- Bagaimana kita memastikan bahwa data ini selalu tersedia dan diperbarui secara berkala?

Apa yang disebut "masalah oracle" menunjukkan masalah yang muncul dengan menggunakan oracle blockchain untuk mengirim input ke kontrak pintar. Data dari orakel harus benar agar kontrak pintar dapat dieksekusi dengan benar. Lebih jauh lagi, keharusan untuk 'memercayai' operator orakel untuk memberikan informasi yang akurat merusak aspek 'tanpa kepercayaan' dari kontrak pintar.

Orakel yang berbeda menawarkan solusi yang berbeda untuk masalah oracle, yang akan kita jelajahi nanti. Orakel biasanya dievaluasi berdasarkan seberapa baik mereka dapat menangani tantangan berikut:

1. **Kebenaran**: Orakel tidak boleh menyebabkan kontrak pintar memicu perubahan state berdasarkan data offchain yang tidak valid. Orakel harus menjamin _autentisitas_ dan _integritas_ data. Autentisitas berarti data didapatkan dari sumber yang benar, sementara integritas berarti data tetap utuh (yaitu, tidak diubah) sebelum dikirim onchain.

2. **Ketersediaan**: Orakel tidak boleh menunda atau mencegah kontrak pintar mengeksekusi tindakan dan memicu perubahan state. Ini berarti bahwa data dari orakel harus _tersedia berdasarkan permintaan_ tanpa gangguan.

3. **Kompatibilitas insentif**: Orakel harus memberi insentif kepada penyedia data offchain untuk mengirimkan informasi yang benar ke kontrak pintar. Kompatibilitas insentif melibatkan _atribusibilitas_ dan _akuntabilitas_. Atribusibilitas memungkinkan untuk menautkan sepotong informasi eksternal ke penyedianya, sementara akuntabilitas mengikat penyedia data pada informasi yang mereka berikan, sehingga mereka dapat diberi imbalan atau dihukum berdasarkan kualitas informasi yang diberikan.

## Bagaimana cara kerja layanan oracle blockchain? {#how-does-a-blockchain-oracle-service-work}

### Pengguna {#users}

Pengguna adalah entitas (yaitu, kontrak pintar) yang membutuhkan informasi eksternal ke rantai blok untuk menyelesaikan tindakan tertentu. Alur kerja dasar layanan orakel dimulai dengan pengguna mengirimkan permintaan data ke kontrak orakel. Permintaan data biasanya akan menjawab beberapa atau semua pertanyaan berikut:

1. Sumber apa yang dapat dikonsultasikan oleh node offchain untuk informasi yang diminta?

2. Bagaimana pelapor memproses informasi dari sumber data dan mengekstrak titik data yang berguna?

3. Berapa banyak node orakel yang dapat berpartisipasi dalam mengambil data?

4. Bagaimana seharusnya perbedaan dalam laporan orakel dikelola?

5. Metode apa yang harus diimplementasikan dalam memfilter pengiriman dan menggabungkan laporan menjadi satu nilai?

### Kontrak orakel {#oracle-contract}

Kontrak orakel adalah komponen onchain untuk layanan orakel. Kontrak ini mendengarkan permintaan data dari kontrak lain, meneruskan kueri data ke node orakel, dan menyiarkan data yang dikembalikan ke kontrak klien. Kontrak ini juga dapat melakukan beberapa komputasi pada titik data yang dikembalikan untuk menghasilkan nilai agregat untuk dikirim ke kontrak yang meminta.

Kontrak orakel mengekspos beberapa fungsi yang dipanggil oleh kontrak klien saat membuat permintaan data. Setelah menerima kueri baru, kontrak pintar akan memancarkan [peristiwa Log](/developers/docs/smart-contracts/anatomy/#events-and-logs) dengan detail permintaan data. Ini memberi tahu node offchain yang berlangganan Log (biasanya menggunakan sesuatu seperti perintah JSON-RPC `eth_subscribe`), yang kemudian melanjutkan untuk mengambil data yang ditentukan dalam peristiwa Log.

Di bawah ini adalah [contoh kontrak orakel](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) oleh Pedro Costa. Ini adalah layanan orakel sederhana yang dapat meminta API offchain atas permintaan kontrak pintar lainnya dan menyimpan informasi yang diminta di rantai blok:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //daftar permintaan yang dibuat ke kontrak
  uint currentId = 0; //id permintaan yang meningkat
  uint minQuorum = 2; //jumlah minimum respons yang harus diterima sebelum menyatakan hasil akhir
  uint totalOracleCount = 3; // jumlah orakel yang di-hardcode

  // mendefinisikan permintaan API umum
  struct Request {
    uint id;                            //id permintaan
    string urlToQuery;                  //url API
    string attributeToFetch;            //atribut json (kunci) untuk diambil dalam respons
    string agreedValue;                 //nilai dari kunci
    mapping(uint => string) answers;     //jawaban yang diberikan oleh orakel
    mapping(address => uint) quorum;    //orakel yang akan menanyakan jawaban (1=orakel belum memilih, 2=orakel sudah memilih)
  }

  //peristiwa yang memicu orakel di luar rantai blok
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

    // alamat orakel yang di-hardcode
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // meluncurkan peristiwa untuk dideteksi oleh orakel di luar rantai blok
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // tingkatkan id permintaan
    currentId++;
  }

  //dipanggil oleh orakel untuk mencatat jawabannya
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //periksa apakah orakel ada dalam daftar orakel tepercaya
    //dan jika orakel belum memilih
    if(currRequest.quorum[address(msg.sender)] == 1){

      //menandai bahwa alamat ini telah memilih
      currRequest.quorum[msg.sender] = 2;

      //iterasi melalui "array" jawaban hingga ada posisi yang kosong dan simpan nilai yang diambil
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

      //iterasi melalui daftar orakel dan periksa apakah cukup orakel (kuorum minimum)
      //telah memilih jawaban yang sama dengan yang saat ini
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

### Node orakel {#oracle-nodes}

Node orakel adalah komponen offchain dari layanan orakel. Node ini mengekstrak informasi dari sumber eksternal, seperti API yang di-host di server pihak ketiga, dan meletakkannya onchain untuk dikonsumsi oleh kontrak pintar. Node orakel mendengarkan peristiwa dari kontrak orakel onchain dan melanjutkan untuk menyelesaikan tugas yang dijelaskan dalam Log.

Tugas umum untuk node orakel adalah mengirimkan permintaan [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) ke layanan API, mengurai respons untuk mengekstrak data yang relevan, memformatnya menjadi output yang dapat dibaca rantai blok, dan mengirimkannya onchain dengan menyertakannya dalam transaksi ke kontrak orakel. Node orakel mungkin juga diwajibkan untuk membuktikan validitas dan integritas informasi yang dikirimkan menggunakan "bukti autentisitas", yang akan kita jelajahi nanti.

Orakel komputasi juga bergantung pada node offchain untuk melakukan tugas komputasi yang tidak praktis untuk dieksekusi onchain, mengingat biaya gas dan batas ukuran blok. Misalnya, node orakel mungkin ditugaskan untuk menghasilkan angka acak yang dapat diverifikasi (mis., untuk game berbasis rantai blok).

## Pola desain orakel {#oracle-design-patterns}

Orakel hadir dalam berbagai jenis, termasuk _baca-langsung_, _publikasi-berlangganan_, dan _permintaan-respons_, dengan dua yang terakhir menjadi yang paling populer di antara kontrak pintar Ethereum. Di sini kami menjelaskan secara singkat model publikasi-berlangganan dan permintaan-respons.

### Orakel publikasi-berlangganan {#publish-subscribe-oracles}

Jenis orakel ini mengekspos "umpan data" yang dapat dibaca secara teratur oleh kontrak lain untuk mendapatkan informasi. Data dalam kasus ini diharapkan sering berubah, sehingga kontrak klien harus mendengarkan pembaruan data di penyimpanan orakel. Contohnya adalah orakel yang menyediakan informasi harga ETH-USD terbaru kepada pengguna.

### Orakel permintaan-respons {#request-response-oracles}

Pengaturan permintaan-respons memungkinkan kontrak klien untuk meminta data arbitrer selain yang disediakan oleh orakel publikasi-berlangganan. Orakel permintaan-respons ideal ketika kumpulan data terlalu besar untuk disimpan di penyimpanan kontrak pintar, dan/atau pengguna hanya akan membutuhkan sebagian kecil data pada waktu tertentu.

Meskipun lebih kompleks daripada model publikasi-berlangganan, orakel permintaan-respons pada dasarnya adalah apa yang kami jelaskan di bagian sebelumnya. Orakel akan memiliki komponen onchain yang menerima permintaan data dan meneruskannya ke node offchain untuk diproses.

Pengguna yang memulai kueri data harus menanggung biaya pengambilan informasi dari sumber offchain. Kontrak klien juga harus menyediakan dana untuk menutupi biaya gas yang dikeluarkan oleh kontrak orakel dalam mengembalikan respons melalui fungsi panggilan balik yang ditentukan dalam permintaan.

## Orakel tersentralisasi vs. terdesentralisasi {#types-of-oracles}

### Orakel tersentralisasi {#centralized-oracles}

Orakel tersentralisasi dikendalikan oleh satu entitas yang bertanggung jawab untuk menggabungkan informasi offchain dan memperbarui data kontrak orakel seperti yang diminta. Orakel tersentralisasi efisien karena mereka bergantung pada satu sumber kebenaran. Mereka mungkin berfungsi lebih baik dalam kasus di mana kumpulan data kepemilikan dipublikasikan langsung oleh pemilik dengan tanda tangan yang diterima secara luas. Namun, mereka juga membawa kelemahan:

#### Jaminan kebenaran yang rendah {#low-correctness-guarantees}

Dengan orakel tersentralisasi, tidak ada cara untuk mengonfirmasi apakah informasi yang diberikan benar atau tidak. Bahkan penyedia yang "bereputasi baik" dapat bertindak nakal atau diretas. Jika orakel menjadi rusak, kontrak pintar akan dieksekusi berdasarkan data yang buruk.

#### Ketersediaan yang buruk {#poor-availability}

Orakel tersentralisasi tidak dijamin untuk selalu membuat data offchain tersedia untuk kontrak pintar lainnya. Jika penyedia memutuskan untuk mematikan layanan atau peretas membajak komponen offchain orakel, kontrak pintar Anda berisiko terkena serangan penolakan layanan (DoS).

#### Kompatibilitas insentif yang buruk {#poor-incentive-compatibility}

Orakel tersentralisasi sering kali memiliki insentif yang dirancang dengan buruk atau tidak ada sama sekali bagi penyedia data untuk mengirimkan informasi yang akurat/tidak diubah. Membayar orakel untuk kebenaran tidak menjamin kejujuran. Masalah ini semakin besar seiring dengan meningkatnya jumlah nilai yang dikendalikan oleh kontrak pintar.

### Orakel terdesentralisasi {#decentralized-oracles}

Orakel terdesentralisasi dirancang untuk mengatasi keterbatasan orakel tersentralisasi dengan menghilangkan titik kegagalan tunggal. Layanan orakel terdesentralisasi terdiri dari beberapa peserta dalam jaringan peer-to-peer yang membentuk konsensus pada data offchain sebelum mengirimkannya ke kontrak pintar.

Orakel terdesentralisasi (idealnya) harus tanpa izin, tanpa kepercayaan, dan bebas dari administrasi oleh pihak pusat; pada kenyataannya, desentralisasi di antara orakel berada pada sebuah spektrum. Ada jaringan orakel semi-terdesentralisasi di mana siapa pun dapat berpartisipasi, tetapi dengan "pemilik" yang menyetujui dan menghapus node berdasarkan kinerja historis. Jaringan orakel yang sepenuhnya terdesentralisasi juga ada: ini biasanya berjalan sebagai rantai blok mandiri dan memiliki mekanisme konsensus yang ditentukan untuk mengoordinasikan node dan menghukum perilaku buruk.

Menggunakan orakel terdesentralisasi memberikan manfaat berikut:

### Jaminan kebenaran yang tinggi {#high-correctness-guarantees}

Orakel terdesentralisasi berusaha mencapai kebenaran data menggunakan pendekatan yang berbeda. Ini termasuk menggunakan bukti yang membuktikan autentisitas dan integritas informasi yang dikembalikan dan mewajibkan beberapa entitas untuk secara kolektif menyetujui validitas data offchain.

#### Bukti autentisitas {#authenticity-proofs}

Bukti autentisitas adalah mekanisme kriptografi yang memungkinkan verifikasi independen atas informasi yang diambil dari sumber eksternal. Bukti ini dapat memvalidasi sumber informasi dan mendeteksi kemungkinan perubahan pada data setelah pengambilan.

Contoh bukti autentisitas meliputi:

**Bukti Transport Layer Security (TLS)**: Node orakel sering kali mengambil data dari sumber eksternal menggunakan koneksi HTTP aman berdasarkan protokol Transport Layer Security (TLS). Beberapa orakel terdesentralisasi menggunakan bukti autentisitas untuk memverifikasi sesi TLS (yaitu, mengonfirmasi pertukaran informasi antara node dan server tertentu) dan mengonfirmasi bahwa konten sesi tidak diubah.

**Atestasi Trusted Execution Environment (TEE)**: [Trusted execution environment](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) adalah lingkungan komputasi sandbox yang diisolasi dari proses operasional sistem host-nya. TEE memastikan bahwa kode aplikasi atau data apa pun yang disimpan/digunakan dalam lingkungan komputasi mempertahankan integritas, kerahasiaan, dan ketidakberubahan. Pengguna juga dapat menghasilkan atestasi untuk membuktikan bahwa instans aplikasi berjalan di dalam trusted execution environment.

Kelas orakel terdesentralisasi tertentu mewajibkan operator node orakel untuk memberikan atestasi TEE. Ini mengonfirmasi kepada pengguna bahwa operator node menjalankan instans klien orakel di trusted execution environment. TEE mencegah proses eksternal mengubah atau membaca kode dan data aplikasi, oleh karena itu, atestasi tersebut membuktikan bahwa node orakel telah menjaga informasi tetap utuh dan rahasia.

#### Validasi informasi berbasis konsensus {#consensus-based-validation-of-information}

Orakel tersentralisasi bergantung pada satu sumber kebenaran saat memberikan data ke kontrak pintar, yang memperkenalkan kemungkinan memublikasikan informasi yang tidak akurat. Orakel terdesentralisasi memecahkan masalah ini dengan mengandalkan beberapa node orakel untuk meminta informasi offchain. Dengan membandingkan data dari berbagai sumber, orakel terdesentralisasi mengurangi risiko meneruskan informasi yang tidak valid ke kontrak onchain.

Namun, orakel terdesentralisasi harus berurusan dengan perbedaan informasi yang diambil dari beberapa sumber offchain. Untuk meminimalkan perbedaan informasi dan memastikan data yang diteruskan ke kontrak orakel mencerminkan pendapat kolektif node orakel, orakel terdesentralisasi menggunakan mekanisme berikut:

##### Memberikan suara/staking pada keakuratan data {#availability}

Beberapa jaringan orakel terdesentralisasi mewajibkan peserta untuk memberikan suara atau melakukan staking pada keakuratan jawaban atas kueri data (mis., "Siapa yang memenangkan pemilu AS 2020?") menggunakan token asli jaringan. Protokol agregasi kemudian menggabungkan suara dan stake serta mengambil jawaban yang didukung oleh mayoritas sebagai jawaban yang valid.

Node yang jawabannya menyimpang dari jawaban mayoritas akan dihukum dengan mendistribusikan token mereka kepada pihak lain yang memberikan nilai yang lebih benar. Memaksa node untuk memberikan jaminan sebelum memberikan data akan memberi insentif pada respons yang jujur karena mereka diasumsikan sebagai pelaku ekonomi rasional yang berniat memaksimalkan keuntungan.

Staking/memberikan suara juga melindungi orakel terdesentralisasi dari [serangan Sybil](/glossary/#sybil-attack) di mana aktor jahat membuat banyak identitas untuk mempermainkan sistem konsensus. Namun, staking tidak dapat mencegah "freeloading" (node orakel menyalin informasi dari pihak lain) dan "validasi malas" (node orakel mengikuti mayoritas tanpa memverifikasi informasi itu sendiri).

##### Mekanisme titik Schelling {#good-incentive-compatibility}

[Titik Schelling](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>) adalah konsep teori permainan yang mengasumsikan beberapa entitas akan selalu menggunakan solusi umum untuk suatu masalah tanpa adanya komunikasi. Mekanisme titik Schelling sering digunakan dalam jaringan orakel terdesentralisasi untuk memungkinkan node mencapai konsensus pada jawaban atas permintaan data.

Ide awal untuk ini adalah [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed), umpan data yang diusulkan di mana peserta mengirimkan respons terhadap pertanyaan "skalar" (pertanyaan yang jawabannya dijelaskan berdasarkan besaran, mis., "berapa harga ETH?"), bersama dengan deposit. Pengguna yang memberikan nilai antara [persentil](https://en.wikipedia.org/wiki/Percentile) ke-25 dan ke-75 akan diberi imbalan, sementara mereka yang nilainya sangat menyimpang dari nilai median akan dihukum.

Meskipun SchellingCoin tidak ada saat ini, sejumlah orakel terdesentralisasi—terutama [Orakel Protokol Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module)—menggunakan mekanisme titik schelling untuk meningkatkan keakuratan data orakel. Setiap Orakel Maker terdiri dari jaringan node P2P offchain ("relayer" dan "feed") yang mengirimkan harga pasar untuk aset kolateral dan kontrak "Medianizer" onchain yang menghitung median dari semua nilai yang diberikan. Setelah periode penundaan yang ditentukan berakhir, nilai median ini menjadi harga referensi baru untuk aset terkait.

Contoh lain dari orakel yang menggunakan mekanisme titik Schelling termasuk [Pelaporan Offchain Chainlink](https://docs.chain.link/architecture-overview/off-chain-reporting) dan [Witnet](https://witnet.io/). Dalam kedua sistem, respons dari node orakel dalam jaringan peer-to-peer digabungkan menjadi satu nilai agregat, seperti rata-rata atau median. Node diberi imbalan atau dihukum sesuai dengan sejauh mana respons mereka selaras dengan atau menyimpang dari nilai agregat.

Mekanisme titik Schelling menarik karena meminimalkan jejak onchain (hanya satu transaksi yang perlu dikirim) sambil menjamin desentralisasi. Hal yang terakhir ini dimungkinkan karena node harus menandatangani daftar respons yang dikirimkan sebelum dimasukkan ke dalam algoritma yang menghasilkan nilai rata-rata/median.

### Ketersediaan {#applications-of-oracles-in-smart-contracts}

Layanan orakel terdesentralisasi memastikan ketersediaan data offchain yang tinggi untuk kontrak pintar. Hal ini dicapai dengan mendesentralisasikan sumber informasi offchain dan node yang bertanggung jawab untuk mentransfer informasi onchain.

Ini memastikan toleransi kesalahan karena kontrak orakel dapat mengandalkan beberapa node (yang juga mengandalkan beberapa sumber data) untuk mengeksekusi kueri dari kontrak lain. Desentralisasi pada tingkat sumber _dan_ operator node sangat penting—jaringan node orakel yang menyajikan informasi yang diambil dari sumber yang sama akan mengalami masalah yang sama dengan orakel tersentralisasi.

Orakel berbasis stake juga dimungkinkan untuk melakukan pemotongan terhadap operator node yang gagal merespons permintaan data dengan cepat. Hal ini secara signifikan memberi insentif kepada node orakel untuk berinvestasi dalam infrastruktur yang toleran terhadap kesalahan dan menyediakan data secara tepat waktu.

### Kompatibilitas insentif yang baik {#retrieving-financial-data}

Orakel terdesentralisasi mengimplementasikan berbagai desain insentif untuk mencegah perilaku [Bizantium](https://en.wikipedia.org/wiki/Byzantine_fault) di antara node orakel. Secara khusus, mereka mencapai _atribusibilitas_ dan _akuntabilitas_:

1. Node orakel terdesentralisasi sering kali diwajibkan untuk menandatangani data yang mereka berikan sebagai respons terhadap permintaan data. Informasi ini membantu mengevaluasi kinerja historis node orakel, sehingga pengguna dapat memfilter node orakel yang tidak dapat diandalkan saat membuat permintaan data. Contohnya adalah [Sistem Reputasi Algoritmik](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) Witnet.

2. Orakel terdesentralisasi—seperti yang dijelaskan sebelumnya—mungkin mewajibkan node untuk menempatkan stake pada keyakinan mereka terhadap kebenaran data yang mereka kirimkan. Jika klaim tersebut terbukti benar, stake ini dapat dikembalikan bersama dengan imbalan atas layanan yang jujur. Namun, stake ini juga dapat dipotong jika informasinya salah, yang memberikan ukuran akuntabilitas tertentu.

## Aplikasi orakel dalam kontrak pintar {#generating-verifiable-randomness}

Berikut ini adalah kasus penggunaan umum untuk orakel di Ethereum:

### Mengambil data keuangan {#getting-outcomes-for-events}

Aplikasi [keuangan terdesentralisasi (DeFi)](/defi/) memungkinkan peminjaman, peminjaman, dan perdagangan aset peer-to-peer. Hal ini sering kali memerlukan perolehan informasi keuangan yang berbeda, termasuk data nilai tukar (untuk menghitung nilai fiat mata uang kripto atau membandingkan harga token) dan data pasar modal (untuk menghitung nilai aset yang ditokenisasi, seperti emas atau dolar AS).

Protokol peminjaman DeFi, misalnya, perlu meminta harga pasar saat ini untuk aset (mis., ETH) yang disetorkan sebagai kolateral. Hal ini memungkinkan kontrak untuk menentukan nilai aset kolateral dan menentukan berapa banyak yang dapat dipinjam dari sistem.

"Orakel harga" yang populer (sebutan yang sering digunakan) di DeFi termasuk Umpan Harga Chainlink, [Umpan Harga Terbuka](https://compound.finance/docs/prices) Protokol Compound, [Harga Rata-Rata Tertimbang Waktu (TWAP)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) Uniswap, dan [Orakel Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Pembangun harus memahami peringatan yang menyertai orakel harga ini sebelum mengintegrasikannya ke dalam proyek mereka. [Artikel](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) ini memberikan analisis terperinci tentang apa yang harus dipertimbangkan saat merencanakan untuk menggunakan salah satu orakel harga yang disebutkan.

Di bawah ini adalah contoh bagaimana Anda dapat mengambil harga ETH terbaru dalam kontrak pintar Anda menggunakan umpan harga Chainlink:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Jaringan: Kovan
     * Agregator: ETH/USD
     * Alamat: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Mengembalikan harga terbaru
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

### Menghasilkan keacakan yang dapat diverifikasi {#automating-smart-contracts}

Aplikasi rantai blok tertentu, seperti game berbasis rantai blok atau skema lotre, memerlukan tingkat ketidakpastian dan keacakan yang tinggi agar dapat bekerja secara efektif. Namun, eksekusi deterministik dari rantai blok menghilangkan keacakan.

Pendekatan awalnya adalah menggunakan fungsi kriptografi pseudorandom, seperti `blockhash`, tetapi ini dapat [dimanipulasi oleh penambang](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) yang memecahkan algoritma Bukti Kerja (PoW). Selain itu, [peralihan Ethereum ke Bukti Kepemilikan (PoS)](/roadmap/merge/) berarti pengembang tidak dapat lagi mengandalkan `blockhash` untuk keacakan onchain. [Mekanisme RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) Rantai suar menyediakan sumber keacakan alternatif sebagai gantinya.

Dimungkinkan untuk menghasilkan nilai acak offchain dan mengirimkannya onchain, tetapi melakukan hal itu membebankan persyaratan kepercayaan yang tinggi pada pengguna. Mereka harus percaya bahwa nilai tersebut benar-benar dihasilkan melalui mekanisme yang tidak dapat diprediksi dan tidak diubah saat transit.

Orakel yang dirancang untuk komputasi offchain memecahkan masalah ini dengan menghasilkan hasil acak secara aman offchain yang mereka siarkan onchain bersama dengan bukti kriptografi yang membuktikan ketidakpastian proses tersebut. Contohnya adalah [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Fungsi Acak yang Dapat Diverifikasi), yang merupakan generator angka acak (RNG) yang terbukti adil dan tahan kerusakan yang berguna untuk membangun kontrak pintar yang andal untuk aplikasi yang bergantung pada hasil yang tidak dapat diprediksi.

### Mendapatkan hasil untuk peristiwa {#use-blockchain-oracles}

Dengan orakel, membuat kontrak pintar yang merespons peristiwa dunia nyata menjadi mudah. Layanan orakel memungkinkan hal ini dengan mengizinkan kontrak untuk terhubung ke API eksternal melalui komponen offchain dan mengonsumsi informasi dari sumber data tersebut. Misalnya, dapp pasar prediksi yang disebutkan sebelumnya dapat meminta orakel untuk mengembalikan hasil pemilu dari sumber offchain tepercaya (mis., Associated Press).

Menggunakan orakel untuk mengambil data berdasarkan hasil dunia nyata memungkinkan kasus penggunaan baru lainnya; misalnya, produk asuransi terdesentralisasi membutuhkan informasi yang akurat tentang cuaca, bencana, dll. agar dapat bekerja secara efektif.

### Mengotomatiskan kontrak pintar {#further-reading}

Kontrak pintar tidak berjalan secara otomatis; melainkan, akun yang dimiliki secara eksternal (EOA), atau akun kontrak lainnya, harus memicu fungsi yang tepat untuk mengeksekusi kode kontrak. Dalam kebanyakan kasus, sebagian besar fungsi kontrak bersifat publik dan dapat dipanggil oleh EOA dan kontrak lainnya.

Namun ada juga _fungsi privat_ di dalam kontrak yang tidak dapat diakses oleh pihak lain;, tetapi sangat penting untuk fungsionalitas dapp secara keseluruhan. Contohnya termasuk fungsi `mintERC721Token()` yang secara berkala mencetak NFT baru untuk pengguna, fungsi untuk memberikan pembayaran di pasar prediksi, atau fungsi untuk membuka kunci token yang di-stake di DEX.

Pengembang perlu memicu fungsi tersebut secara berkala agar aplikasi tetap berjalan lancar. Namun, hal ini dapat menyebabkan lebih banyak waktu yang terbuang untuk tugas-tugas duniawi bagi pengembang, itulah sebabnya mengotomatiskan eksekusi kontrak pintar menjadi menarik.

Beberapa jaringan orakel terdesentralisasi menawarkan layanan otomatisasi, yang memungkinkan node orakel offchain untuk memicu fungsi kontrak pintar sesuai dengan parameter yang ditentukan oleh pengguna. Biasanya, ini memerlukan "pendaftaran" kontrak target dengan layanan orakel, menyediakan dana untuk membayar operator orakel, dan menentukan kondisi atau waktu untuk memicu kontrak.

[Jaringan Keeper](https://chain.link/keepers) Chainlink memberikan opsi bagi kontrak pintar untuk mengalihdayakan tugas pemeliharaan rutin dengan cara yang meminimalkan kepercayaan dan terdesentralisasi. Baca [dokumentasi resmi Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) untuk informasi tentang cara membuat kontrak Anda kompatibel dengan Keeper dan menggunakan layanan Upkeep.

## Cara menggunakan oracle blockchain

Ada beberapa aplikasi orakel yang dapat Anda integrasikan ke dalam dapp Ethereum Anda:

**[Chainlink](https://chain.link/)** - _Jaringan orakel terdesentralisasi Chainlink menyediakan input, output, dan komputasi yang tahan kerusakan untuk mendukung kontrak pintar tingkat lanjut di rantai blok mana pun._

**[Orakel RedStone](https://redstone.finance/)** - _RedStone adalah orakel modular terdesentralisasi yang menyediakan umpan data yang dioptimalkan untuk gas. Orakel ini berspesialisasi dalam menawarkan umpan harga untuk aset yang sedang berkembang, seperti token staking likuid (LST), token staking ulang likuid (LRT), dan derivatif staking Bitcoin._

**[Chronicle](https://chroniclelabs.org/)** - _Chronicle mengatasi keterbatasan saat ini dalam mentransfer data onchain dengan mengembangkan orakel yang benar-benar dapat diskalakan, hemat biaya, terdesentralisasi, dan dapat diverifikasi._

**[Witnet](https://witnet.io/)** - _Witnet adalah orakel tanpa izin, terdesentralisasi, dan tahan sensor yang membantu kontrak pintar bereaksi terhadap peristiwa dunia nyata dengan jaminan kripto-ekonomi yang kuat._

**[Orakel UMA](https://uma.xyz)** - _Orakel optimis UMA memungkinkan kontrak pintar untuk dengan cepat menerima segala jenis data untuk berbagai aplikasi, termasuk asuransi, derivatif keuangan, dan pasar prediksi._

**[Tellor](https://tellor.io/)** - _Tellor adalah protokol orakel yang transparan dan tanpa izin untuk kontrak pintar Anda agar dengan mudah mendapatkan data apa pun kapan pun dibutuhkan._

**[Protokol Band](https://bandprotocol.com/)** - _Protokol Band adalah platform orakel data lintas rantai yang menggabungkan dan menghubungkan data dunia nyata dan API ke kontrak pintar._

**[Jaringan Pyth](https://pyth.network/)** - _Jaringan Pyth adalah jaringan orakel keuangan pihak pertama yang dirancang untuk memublikasikan data dunia nyata secara berkelanjutan onchain dalam lingkungan yang tahan kerusakan, terdesentralisasi, dan mandiri._

**[API3 DAO](https://www.api3.org/)** - _API3 DAO memberikan solusi orakel pihak pertama yang memberikan transparansi sumber, keamanan, dan skalabilitas yang lebih besar dalam solusi terdesentralisasi untuk kontrak pintar_

**[Supra](https://supra.com/)** - Perangkat solusi lintas rantai yang terintegrasi secara vertikal yang menghubungkan semua rantai blok, publik (L1 dan L2) atau privat (perusahaan), menyediakan umpan harga orakel terdesentralisasi yang dapat digunakan untuk kasus penggunaan onchain dan offchain. 

**[Jaringan Gas](https://gas.network/)** - Platform orakel terdistribusi yang menyediakan data harga gas waktu nyata di seluruh rantai blok. Dengan membawa data dari penyedia data harga gas terkemuka onchain, Jaringan Gas membantu mendorong interoperabilitas. Jaringan Gas mendukung data untuk lebih dari 35 rantai, termasuk Mainnet Ethereum dan banyak L2 terkemuka.

**[DIA](https://www.diadata.org/)** - Jaringan orakel lintas rantai yang memberikan umpan data yang dapat diverifikasi untuk 20.000+ aset di semua kelas aset utama. DIA mengambil data perdagangan mentah langsung dari 100+ pasar primer dan menghitungnya onchain, memastikan transparansi dan verifiabilitas data yang lengkap dengan konfigurasi kustom untuk kasus penggunaan apa pun.

**[Stork](https://stork.network)** - Stork memberikan data harga dengan latensi sangat rendah, mendukung berbagai kasus penggunaan termasuk pasar perpetual, protokol peminjaman, dan ekosistem DeFi, dengan aset baru yang didukung dengan cepat saat pencatatan.

## Bacaan lebih lanjut

**Artikel**

- [Apa Itu Oracle Blockchain?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [Apa itu Oracle Blockchain?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Orakel Terdesentralisasi: gambaran umum yang komprehensif](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Mengimplementasikan Oracle Blockchain di Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Mengapa kontrak pintar tidak dapat melakukan panggilan API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Jadi Anda ingin menggunakan orakel harga](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Video**

- [Orakel dan Perluasan Utilitas Rantai Blok](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Tutorial**

- [Cara Mengambil Harga Ethereum Saat Ini di Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Mengonsumsi Data Orakel](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_
- [Tantangan Orakel](https://speedrunethereum.com/challenge/oracles) - _Speedrun Ethereum_

**Contoh proyek**

- [Proyek pemula Chainlink lengkap untuk Ethereum di Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_