---
title: Oracle
description: Oracle memberi kontrak pintar Ethereum akses ke data dunia nyata, membuka lebih banyak kasus penggunaan dan nilai yang lebih besar bagi pengguna.
lang: id
---

Oracle adalah aplikasi yang menghasilkan umpan data yang membuat sumber data offchain tersedia di blockchain untuk kontrak pintar. Hal ini diperlukan karena kontrak pintar berbasis Ethereum, secara default, tidak dapat mengakses informasi yang disimpan di luar jaringan blockchain.

Memberikan kontrak pintar kemampuan untuk mengeksekusi menggunakan data offchain memperluas utilitas dan nilai aplikasi terdesentralisasi. Misalnya, pasar prediksi onchain bergantung pada oracle untuk memberikan informasi tentang hasil yang mereka gunakan untuk memvalidasi prediksi pengguna. Misalkan Alice bertaruh 20 ETH tentang siapa yang akan menjadi Presiden AS berikutnya. Dalam hal ini, dapp pasar prediksi memerlukan oracle untuk mengonfirmasi hasil pemilu dan menentukan apakah Alice berhak atas pembayaran.

## Prasyarat {#prerequisites}

Halaman ini mengasumsikan pembaca sudah familier dengan dasar-dasar [Ethereum](/), termasuk [node](/developers/docs/nodes-and-clients/), [mekanisme konsensus](/developers/docs/consensus-mechanisms/), dan [EVM](/developers/docs/evm/). Anda juga harus memiliki pemahaman yang baik tentang [kontrak pintar](/developers/docs/smart-contracts/) dan [anatomi kontrak pintar](/developers/docs/smart-contracts/anatomy/), terutama [event](/glossary/#events).

## Apa itu oracle blockchain? {#what-is-a-blockchain-oracle}

Oracle adalah aplikasi yang mencari, memverifikasi, dan mengirimkan informasi eksternal (yaitu, informasi yang disimpan secara offchain) ke kontrak pintar yang berjalan di blockchain. Selain "menarik" data offchain dan menyiarkannya di Ethereum, oracle juga dapat "mendorong" informasi dari blockchain ke sistem eksternal, mis., membuka kunci pintar setelah pengguna mengirimkan biaya melalui transaksi Ethereum.

Tanpa oracle, kontrak pintar akan sepenuhnya terbatas pada data onchain.

Oracle berbeda-beda berdasarkan sumber data (satu atau beberapa sumber), model kepercayaan (terpusat atau terdesentralisasi), dan arsitektur sistem (baca-langsung, publikasi-berlangganan, dan permintaan-respons). Kita juga dapat membedakan oracle berdasarkan apakah mereka mengambil data eksternal untuk digunakan oleh kontrak onchain (oracle input), mengirim informasi dari blockchain ke aplikasi offchain (oracle output), atau melakukan tugas komputasi secara offchain (oracle komputasi).

## Mengapa kontrak pintar membutuhkan oracle? {#why-do-smart-contracts-need-oracles}

Banyak pengembang melihat kontrak pintar sebagai kode yang berjalan di alamat tertentu di blockchain. Namun, [pandangan yang lebih umum tentang kontrak pintar](/smart-contracts/) adalah bahwa mereka merupakan program perangkat lunak yang mengeksekusi sendiri yang mampu menegakkan perjanjian antara para pihak setelah kondisi tertentu terpenuhi - karenanya disebut "kontrak pintar."

Namun, menggunakan kontrak pintar untuk menegakkan perjanjian antar individu tidaklah mudah, mengingat Ethereum bersifat deterministik. [Sistem deterministik](https://en.wikipedia.org/wiki/Deterministic_algorithm) adalah sistem yang selalu menghasilkan hasil yang sama jika diberikan status awal dan input tertentu, yang berarti tidak ada keacakan atau variasi dalam proses menghitung output dari input.

Untuk mencapai eksekusi deterministik, blockchain membatasi node untuk mencapai konsensus pada pertanyaan biner sederhana (benar/salah) _hanya_ menggunakan data yang disimpan di blockchain itu sendiri. Contoh pertanyaan tersebut meliputi:

- "Apakah pemilik akun (diidentifikasi dengan kunci publik) menandatangani transaksi ini dengan kunci pribadi yang berpasangan?"
- "Apakah akun ini memiliki dana yang cukup untuk menutupi transaksi?"
- "Apakah transaksi ini valid dalam konteks kontrak pintar ini?", dll.

Jika blockchain menerima informasi dari sumber eksternal (yaitu, dari dunia nyata), determinisme akan mustahil dicapai, mencegah node menyetujui validitas perubahan pada status blockchain. Ambil contoh kontrak pintar yang mengeksekusi transaksi berdasarkan nilai tukar ETH-USD saat ini yang diperoleh dari API harga tradisional. Angka ini kemungkinan akan sering berubah (belum lagi API tersebut bisa dihentikan atau diretas), yang berarti node yang mengeksekusi kode kontrak yang sama akan mendapatkan hasil yang berbeda.

Untuk blockchain publik seperti Ethereum, dengan ribuan node di seluruh dunia yang memproses transaksi, determinisme sangatlah penting. Tanpa otoritas pusat yang berfungsi sebagai sumber kebenaran, node memerlukan mekanisme untuk mencapai status yang sama setelah menerapkan transaksi yang sama. Kasus di mana node A mengeksekusi kode kontrak pintar dan mendapatkan hasil "3", sementara node B mendapatkan "7" setelah menjalankan transaksi yang sama akan menyebabkan konsensus rusak dan menghilangkan nilai Ethereum sebagai platform komputasi terdesentralisasi.

Skenario ini juga menyoroti masalah dalam merancang blockchain untuk menarik informasi dari sumber eksternal. Namun, oracle memecahkan masalah ini dengan mengambil informasi dari sumber offchain dan menyimpannya di blockchain untuk dikonsumsi oleh kontrak pintar. Karena informasi yang disimpan secara onchain tidak dapat diubah dan tersedia untuk publik, node Ethereum dapat dengan aman menggunakan data offchain yang diimpor oracle untuk menghitung perubahan status tanpa merusak konsensus.

Untuk melakukan ini, oracle biasanya terdiri dari kontrak pintar yang berjalan secara onchain dan beberapa komponen offchain. Kontrak onchain menerima permintaan data dari kontrak pintar lainnya, yang kemudian diteruskan ke komponen offchain (disebut node oracle). Node oracle ini dapat menanyakan sumber data—menggunakan antarmuka pemrograman aplikasi (API), misalnya—dan mengirim transaksi untuk menyimpan data yang diminta di penyimpanan kontrak pintar.

Pada dasarnya, oracle blockchain menjembatani kesenjangan informasi antara blockchain dan lingkungan eksternal, menciptakan "kontrak pintar hibrida". Kontrak pintar hibrida adalah kontrak yang berfungsi berdasarkan kombinasi kode kontrak onchain dan infrastruktur offchain. Pasar prediksi terdesentralisasi adalah contoh yang sangat baik dari kontrak pintar hibrida. Contoh lain mungkin termasuk kontrak pintar asuransi tanaman yang membayar ketika serangkaian oracle menentukan bahwa fenomena cuaca tertentu telah terjadi.

## Apa itu masalah oracle? {#the-oracle-problem}

Oracle memecahkan masalah penting, tetapi juga memperkenalkan beberapa komplikasi, mis.,:

- Bagaimana kita memverifikasi bahwa informasi yang disuntikkan diekstraksi dari sumber yang benar atau belum dirusak?

- Bagaimana kita memastikan bahwa data ini selalu tersedia dan diperbarui secara berkala?

Apa yang disebut "masalah oracle" menunjukkan masalah yang muncul dengan menggunakan oracle blockchain untuk mengirim input ke kontrak pintar. Data dari oracle harus benar agar kontrak pintar dapat dieksekusi dengan benar. Lebih jauh lagi, keharusan untuk 'mempercayai' operator oracle untuk memberikan informasi yang akurat merusak aspek 'tanpa kepercayaan' dari kontrak pintar.

Oracle yang berbeda menawarkan solusi yang berbeda untuk masalah oracle, yang akan kita jelajahi nanti. Oracle biasanya dievaluasi berdasarkan seberapa baik mereka dapat menangani tantangan berikut:

1. **Kebenaran**: Oracle tidak boleh menyebabkan kontrak pintar memicu perubahan status berdasarkan data offchain yang tidak valid. Oracle harus menjamin _keaslian_ dan _integritas_ data. Keaslian berarti data didapatkan dari sumber yang benar, sedangkan integritas berarti data tetap utuh (yaitu, tidak diubah) sebelum dikirim secara onchain.

2. **Ketersediaan**: Oracle tidak boleh menunda atau mencegah kontrak pintar mengeksekusi tindakan dan memicu perubahan status. Ini berarti bahwa data dari oracle harus _tersedia berdasarkan permintaan_ tanpa gangguan.

3. **Kompatibilitas insentif**: Oracle harus memberi insentif kepada penyedia data offchain untuk mengirimkan informasi yang benar ke kontrak pintar. Kompatibilitas insentif melibatkan _atribusibilitas_ dan _akuntabilitas_. Atribusibilitas memungkinkan untuk menautkan sepotong informasi eksternal ke penyedianya, sementara akuntabilitas mengikat penyedia data dengan informasi yang mereka berikan, sehingga mereka dapat diberi hadiah atau dihukum berdasarkan kualitas informasi yang diberikan.

## Bagaimana cara kerja layanan oracle blockchain? {#how-does-a-blockchain-oracle-service-work}

### Pengguna {#users}

Pengguna adalah entitas (yaitu, kontrak pintar) yang membutuhkan informasi eksternal ke blockchain untuk menyelesaikan tindakan tertentu. Alur kerja dasar layanan oracle dimulai dengan pengguna mengirimkan permintaan data ke kontrak oracle. Permintaan data biasanya akan menjawab beberapa atau semua pertanyaan berikut:

1. Sumber apa yang dapat dikonsultasikan oleh node offchain untuk informasi yang diminta?

2. Bagaimana pelapor memproses informasi dari sumber data dan mengekstrak titik data yang berguna?

3. Berapa banyak node oracle yang dapat berpartisipasi dalam mengambil data?

4. Bagaimana seharusnya perbedaan dalam laporan oracle dikelola?

5. Metode apa yang harus diterapkan dalam memfilter pengiriman dan menggabungkan laporan menjadi satu nilai?

### Kontrak oracle {#oracle-contract}

Kontrak oracle adalah komponen onchain untuk layanan oracle. Kontrak ini mendengarkan permintaan data dari kontrak lain, meneruskan kueri data ke node oracle, dan menyiarkan data yang dikembalikan ke kontrak klien. Kontrak ini juga dapat melakukan beberapa komputasi pada titik data yang dikembalikan untuk menghasilkan nilai agregat untuk dikirim ke kontrak yang meminta.

Kontrak oracle mengekspos beberapa fungsi yang dipanggil oleh kontrak klien saat membuat permintaan data. Setelah menerima kueri baru, kontrak pintar akan memancarkan [log event](/developers/docs/smart-contracts/anatomy/#events-and-logs) dengan detail permintaan data. Ini memberi tahu node offchain yang berlangganan log (biasanya menggunakan sesuatu seperti perintah JSON-RPC `eth_subscribe`), yang kemudian melanjutkan untuk mengambil data yang ditentukan dalam log event.

Di bawah ini adalah [contoh kontrak oracle](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) oleh Pedro Costa. Ini adalah layanan oracle sederhana yang dapat menanyakan API offchain atas permintaan kontrak pintar lainnya dan menyimpan informasi yang diminta di blockchain:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //list of requests made to the contract // daftar permintaan yang dibuat ke kontrak
  uint currentId = 0; //increasing request id // id permintaan yang meningkat
  uint minQuorum = 2; //minimum number of responses to receive before declaring final result // jumlah minimum respons yang harus diterima sebelum mendeklarasikan hasil akhir
  uint totalOracleCount = 3; // Hardcoded oracle count // Jumlah oracle yang di-hardcode

  // defines a general api request // mendefinisikan permintaan api umum
  struct Request {
    uint id;                            //request id // id permintaan
    string urlToQuery;                  //API url // url API
    string attributeToFetch;            //json attribute (key) to retrieve in the response // atribut json (kunci) yang akan diambil dalam respons
    string agreedValue;                 //value from key // nilai dari kunci
    mapping(uint => string) answers;     //answers provided by the oracles // jawaban yang diberikan oleh oracle
    mapping(address => uint) quorum;    //oracles which will query the answer (1=oracle hasn't voted, 2=oracle has voted) // oracle yang akan meminta jawaban (1=oracle belum memilih, 2=oracle sudah memilih)
  }

  //event that triggers oracle outside of the blockchain // event yang memicu oracle di luar blockchain
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //triggered when there's a consensus on the final result // dipicu ketika ada konsensus pada hasil akhir
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

    // Hardcoded oracles address // Alamat oracle yang di-hardcode
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // launch an event to be detected by oracle outside of blockchain // meluncurkan event untuk dideteksi oleh oracle di luar blockchain
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // increase request id // meningkatkan id permintaan
    currentId++;
  }

  //called by the oracle to record its answer // dipanggil oleh oracle untuk merekam jawabannya
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //check if oracle is in the list of trusted oracles // periksa apakah oracle ada dalam daftar oracle tepercaya
    //and if the oracle hasn't voted yet // dan jika oracle belum memilih
    if(currRequest.quorum[address(msg.sender)] == 1){

      //marking that this address has voted // menandai bahwa alamat ini telah memilih
      currRequest.quorum[msg.sender] = 2;

      //iterate through "array" of answers until a position if free and save the retrieved value // iterasi melalui "array" jawaban hingga ada posisi yang kosong dan simpan nilai yang diambil
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //find first empty slot // temukan slot kosong pertama
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterate through oracle list and check if enough oracles(minimum quorum) // iterasi melalui daftar oracle dan periksa apakah cukup oracle (kuorum minimum)
      //have voted the same answer as the current one // telah memilih jawaban yang sama dengan yang saat ini
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

### Node oracle {#oracle-nodes}

Node oracle adalah komponen offchain dari layanan oracle. Node ini mengekstrak informasi dari sumber eksternal, seperti API yang di-host di server pihak ketiga, dan meletakkannya secara onchain untuk dikonsumsi oleh kontrak pintar. Node oracle mendengarkan event dari kontrak oracle onchain dan melanjutkan untuk menyelesaikan tugas yang dijelaskan dalam log.

Tugas umum untuk node oracle adalah mengirimkan permintaan [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) ke layanan API, mengurai respons untuk mengekstrak data yang relevan, memformatnya menjadi output yang dapat dibaca blockchain, dan mengirimkannya secara onchain dengan menyertakannya dalam transaksi ke kontrak oracle. Node oracle mungkin juga diminta untuk membuktikan validitas dan integritas informasi yang dikirimkan menggunakan "bukti keaslian", yang akan kita jelajahi nanti.

Oracle komputasi juga bergantung pada node offchain untuk melakukan tugas komputasi yang tidak praktis untuk dieksekusi secara onchain, mengingat biaya gas dan batas ukuran blok. Misalnya, node oracle mungkin ditugaskan untuk menghasilkan angka acak yang dapat diverifikasi (mis., untuk game berbasis blockchain).

## Pola desain oracle {#oracle-design-patterns}

Oracle hadir dalam berbagai jenis, termasuk _baca-langsung_, _publikasi-berlangganan_, dan _permintaan-respons_, dengan dua yang terakhir menjadi yang paling populer di antara kontrak pintar Ethereum. Di sini kami menjelaskan secara singkat model publikasi-berlangganan dan permintaan-respons.

### Oracle publikasi-berlangganan {#publish-subscribe-oracles}

Jenis oracle ini mengekspos "umpan data" yang dapat dibaca secara teratur oleh kontrak lain untuk mendapatkan informasi. Data dalam kasus ini diharapkan sering berubah, sehingga kontrak klien harus mendengarkan pembaruan data di penyimpanan oracle. Contohnya adalah oracle yang memberikan informasi harga ETH-USD terbaru kepada pengguna.

### Oracle permintaan-respons {#request-response-oracles}

Pengaturan permintaan-respons memungkinkan kontrak klien untuk meminta data arbitrer selain yang disediakan oleh oracle publikasi-berlangganan. Oracle permintaan-respons sangat ideal ketika kumpulan data terlalu besar untuk disimpan di penyimpanan kontrak pintar, dan/atau pengguna hanya akan membutuhkan sebagian kecil data pada waktu tertentu.

Meskipun lebih kompleks daripada model publikasi-berlangganan, oracle permintaan-respons pada dasarnya adalah apa yang kami jelaskan di bagian sebelumnya. Oracle akan memiliki komponen onchain yang menerima permintaan data dan meneruskannya ke node offchain untuk diproses.

Pengguna yang memulai kueri data harus menanggung biaya pengambilan informasi dari sumber offchain. Kontrak klien juga harus menyediakan dana untuk menutupi biaya gas yang dikeluarkan oleh kontrak oracle dalam mengembalikan respons melalui fungsi panggilan balik yang ditentukan dalam permintaan.

## Oracle terpusat vs. terdesentralisasi {#types-of-oracles}

### Oracle terpusat {#centralized-oracles}

Oracle terpusat dikendalikan oleh satu entitas yang bertanggung jawab untuk menggabungkan informasi offchain dan memperbarui data kontrak oracle seperti yang diminta. Oracle terpusat efisien karena mereka bergantung pada satu sumber kebenaran. Mereka mungkin berfungsi lebih baik dalam kasus di mana kumpulan data kepemilikan diterbitkan langsung oleh pemilik dengan tanda tangan yang diterima secara luas. Namun, mereka juga membawa kelemahan:

#### Jaminan kebenaran yang rendah {#low-correctness-guarantees}

Dengan oracle terpusat, tidak ada cara untuk mengonfirmasi apakah informasi yang diberikan benar atau tidak. Bahkan penyedia yang "bereputasi baik" bisa menjadi nakal atau diretas. Jika oracle menjadi rusak, kontrak pintar akan dieksekusi berdasarkan data yang buruk.

#### Ketersediaan yang buruk {#poor-availability}

Oracle terpusat tidak dijamin untuk selalu membuat data offchain tersedia untuk kontrak pintar lainnya. Jika penyedia memutuskan untuk mematikan layanan atau peretas membajak komponen offchain oracle, kontrak pintar Anda berisiko terkena serangan penolakan layanan (DoS).

#### Kompatibilitas insentif yang buruk {#poor-incentive-compatibility}

Oracle terpusat sering kali memiliki insentif yang dirancang dengan buruk atau tidak ada sama sekali bagi penyedia data untuk mengirimkan informasi yang akurat/tidak diubah. Membayar oracle untuk kebenaran tidak menjamin kejujuran. Masalah ini semakin besar seiring dengan meningkatnya jumlah nilai yang dikendalikan oleh kontrak pintar.

### Oracle terdesentralisasi {#decentralized-oracles}

Oracle terdesentralisasi dirancang untuk mengatasi keterbatasan oracle terpusat dengan menghilangkan titik kegagalan tunggal. Layanan oracle terdesentralisasi terdiri dari beberapa peserta dalam jaringan peer-to-peer yang membentuk konsensus pada data offchain sebelum mengirimkannya ke kontrak pintar.

Oracle terdesentralisasi (idealnya) harus tanpa izin, tanpa kepercayaan, dan bebas dari administrasi oleh pihak pusat; pada kenyataannya, desentralisasi di antara oracle berada pada sebuah spektrum. Ada jaringan oracle semi-terdesentralisasi di mana siapa pun dapat berpartisipasi, tetapi dengan "pemilik" yang menyetujui dan menghapus node berdasarkan kinerja historis. Jaringan oracle yang sepenuhnya terdesentralisasi juga ada: ini biasanya berjalan sebagai blockchain mandiri dan telah menetapkan mekanisme konsensus untuk mengoordinasikan node dan menghukum perilaku buruk.

Menggunakan oracle terdesentralisasi memberikan manfaat berikut:

### Jaminan kebenaran yang tinggi {#high-correctness-guarantees}

Oracle terdesentralisasi berusaha mencapai kebenaran data menggunakan pendekatan yang berbeda. Ini termasuk menggunakan bukti yang membuktikan keaslian dan integritas informasi yang dikembalikan dan mengharuskan beberapa entitas untuk secara kolektif menyetujui validitas data offchain.

#### Bukti keaslian {#authenticity-proofs}

Bukti keaslian adalah mekanisme kriptografi yang memungkinkan verifikasi independen atas informasi yang diambil dari sumber eksternal. Bukti ini dapat memvalidasi sumber informasi dan mendeteksi kemungkinan perubahan pada data setelah pengambilan.

Contoh bukti keaslian meliputi:

**Bukti Transport Layer Security (TLS)**: Node oracle sering kali mengambil data dari sumber eksternal menggunakan koneksi HTTP aman berdasarkan protokol Transport Layer Security (TLS). Beberapa oracle terdesentralisasi menggunakan bukti keaslian untuk memverifikasi sesi TLS (yaitu, mengonfirmasi pertukaran informasi antara node dan server tertentu) dan mengonfirmasi bahwa isi sesi tidak diubah.

**Pengesahan Trusted Execution Environment (TEE)**: [Trusted execution environment](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE) adalah lingkungan komputasi sandbox yang diisolasi dari proses operasional sistem host-nya. TEE memastikan bahwa kode aplikasi atau data apa pun yang disimpan/digunakan dalam lingkungan komputasi mempertahankan integritas, kerahasiaan, dan sifat tetap. Pengguna juga dapat menghasilkan pengesahan untuk membuktikan bahwa instans aplikasi berjalan di dalam trusted execution environment.

Kelas oracle terdesentralisasi tertentu mengharuskan operator node oracle untuk memberikan pengesahan TEE. Ini mengonfirmasi kepada pengguna bahwa operator node menjalankan instans klien oracle di trusted execution environment. TEE mencegah proses eksternal mengubah atau membaca kode dan data aplikasi, oleh karena itu, pengesahan tersebut membuktikan bahwa node oracle telah menjaga informasi tetap utuh dan rahasia.

#### Validasi informasi berbasis konsensus {#consensus-based-validation-of-information}

Oracle terpusat bergantung pada satu sumber kebenaran saat memberikan data ke kontrak pintar, yang memperkenalkan kemungkinan penerbitan informasi yang tidak akurat. Oracle terdesentralisasi memecahkan masalah ini dengan mengandalkan beberapa node oracle untuk menanyakan informasi offchain. Dengan membandingkan data dari berbagai sumber, oracle terdesentralisasi mengurangi risiko meneruskan informasi yang tidak valid ke kontrak onchain.

Namun, oracle terdesentralisasi harus berurusan dengan perbedaan informasi yang diambil dari beberapa sumber offchain. Untuk meminimalkan perbedaan informasi dan memastikan data yang diteruskan ke kontrak oracle mencerminkan pendapat kolektif dari node oracle, oracle terdesentralisasi menggunakan mekanisme berikut:

##### Pemungutan suara/mengunci pada keakuratan data

Beberapa jaringan oracle terdesentralisasi mengharuskan peserta untuk memberikan suara atau stake pada keakuratan jawaban atas kueri data (mis., "Siapa yang memenangkan pemilu AS 2020?") menggunakan token asli jaringan. Protokol agregasi kemudian menggabungkan suara dan stake dan mengambil jawaban yang didukung oleh mayoritas sebagai jawaban yang valid.

Node yang jawabannya menyimpang dari jawaban mayoritas akan dihukum dengan mendistribusikan token mereka kepada orang lain yang memberikan nilai yang lebih benar. Memaksa node untuk memberikan jaminan sebelum memberikan data akan memberi insentif pada respons yang jujur karena mereka diasumsikan sebagai pelaku ekonomi rasional yang berniat memaksimalkan keuntungan.

Mengunci/pemungutan suara juga melindungi oracle terdesentralisasi dari [serangan sybil](/glossary/#sybil-attack) di mana aktor jahat membuat banyak identitas untuk mempermainkan sistem konsensus. Namun, mengunci tidak dapat mencegah "freeloading" (node oracle menyalin informasi dari orang lain) dan "validasi malas" (node oracle mengikuti mayoritas tanpa memverifikasi informasi itu sendiri).

##### Mekanisme titik Schelling

[Titik Schelling](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>) adalah konsep teori permainan yang mengasumsikan beberapa entitas akan selalu menggunakan solusi umum untuk suatu masalah tanpa adanya komunikasi. Mekanisme titik Schelling sering digunakan dalam jaringan oracle terdesentralisasi untuk memungkinkan node mencapai konsensus pada jawaban atas permintaan data.

Ide awal untuk ini adalah [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed), umpan data yang diusulkan di mana peserta mengirimkan respons terhadap pertanyaan "skalar" (pertanyaan yang jawabannya dijelaskan berdasarkan besaran, mis., "berapa harga ETH?"), bersama dengan deposit. Pengguna yang memberikan nilai antara [persentil](https://en.wikipedia.org/wiki/Percentile) ke-25 dan ke-75 akan diberi hadiah, sementara mereka yang nilainya sangat menyimpang dari nilai median akan dihukum.

Meskipun SchellingCoin tidak ada saat ini, sejumlah oracle terdesentralisasi—terutama [Oracle Protokol Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module)—menggunakan mekanisme titik schelling untuk meningkatkan keakuratan data oracle. Setiap Oracle Maker terdiri dari jaringan node P2P offchain ("relayer" dan "feed") yang mengirimkan harga pasar untuk aset jaminan dan kontrak "Medianizer" onchain yang menghitung median dari semua nilai yang diberikan. Setelah periode penundaan yang ditentukan berakhir, nilai median ini menjadi harga referensi baru untuk aset terkait.

Contoh lain dari oracle yang menggunakan mekanisme titik Schelling termasuk [Pelaporan Offchain Chainlink](https://docs.chain.link/architecture-overview/off-chain-reporting) dan [Witnet](https://witnet.io/). Dalam kedua sistem, respons dari node oracle dalam jaringan peer-to-peer digabungkan menjadi satu nilai agregat, seperti rata-rata atau median. Node diberi hadiah atau dihukum sesuai dengan sejauh mana respons mereka selaras dengan atau menyimpang dari nilai agregat.

Mekanisme titik Schelling menarik karena meminimalkan jejak onchain (hanya satu transaksi yang perlu dikirim) sambil menjamin desentralisasi. Hal yang terakhir ini dimungkinkan karena node harus menandatangani daftar respons yang dikirimkan sebelum dimasukkan ke dalam algoritma yang menghasilkan nilai rata-rata/median.

### Ketersediaan {#availability}

Layanan oracle terdesentralisasi memastikan ketersediaan data offchain yang tinggi untuk kontrak pintar. Hal ini dicapai dengan mendesentralisasi sumber informasi offchain dan node yang bertanggung jawab untuk mentransfer informasi secara onchain.

Ini memastikan toleransi kesalahan karena kontrak oracle dapat mengandalkan beberapa node (yang juga mengandalkan beberapa sumber data) untuk mengeksekusi kueri dari kontrak lain. Desentralisasi pada tingkat sumber _dan_ operator node sangat penting—jaringan node oracle yang menyajikan informasi yang diambil dari sumber yang sama akan mengalami masalah yang sama dengan oracle terpusat.

Oracle berbasis stake juga dimungkinkan untuk memotong operator node yang gagal merespons permintaan data dengan cepat. Hal ini secara signifikan memberi insentif pada node oracle untuk berinvestasi dalam infrastruktur yang toleran terhadap kesalahan dan menyediakan data secara tepat waktu.

### Kompatibilitas insentif yang baik {#good-incentive-compatibility}

Oracle terdesentralisasi menerapkan berbagai desain insentif untuk mencegah perilaku [Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault) di antara node oracle. Secara khusus, mereka mencapai _atribusibilitas_ dan _akuntabilitas_:

1. Node oracle terdesentralisasi sering kali diharuskan untuk menandatangani data yang mereka berikan sebagai respons terhadap permintaan data. Informasi ini membantu mengevaluasi kinerja historis node oracle, sehingga pengguna dapat memfilter node oracle yang tidak dapat diandalkan saat membuat permintaan data. Contohnya adalah [Sistem Reputasi Algoritmik](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) Witnet.

2. Oracle terdesentralisasi—seperti yang dijelaskan sebelumnya—mungkin mengharuskan node untuk menempatkan stake pada keyakinan mereka terhadap kebenaran data yang mereka kirimkan. Jika klaim tersebut terbukti benar, stake ini dapat dikembalikan bersama dengan hadiah untuk layanan yang jujur. Namun, stake ini juga dapat dipotong jika informasinya salah, yang memberikan ukuran akuntabilitas tertentu.

## Aplikasi oracle dalam kontrak pintar {#applications-of-oracles-in-smart-contracts}

Berikut ini adalah kasus penggunaan umum untuk oracle di Ethereum:

### Mengambil data keuangan {#retrieving-financial-data}

Aplikasi [keuangan terdesentralisasi](/defi/) (DeFi) memungkinkan peminjaman, meminjam, dan perdagangan aset secara peer-to-peer. Hal ini sering kali memerlukan perolehan informasi keuangan yang berbeda, termasuk data nilai tukar (untuk menghitung nilai fiat dari mata uang kripto atau membandingkan harga token) dan data pasar modal (untuk menghitung nilai aset yang ditokenisasi, seperti emas atau dolar AS).

Protokol peminjaman DeFi, misalnya, perlu menanyakan harga pasar saat ini untuk aset (mis., ETH) yang disetorkan sebagai jaminan. Hal ini memungkinkan kontrak untuk menentukan nilai aset jaminan dan menentukan berapa banyak yang dapat dipinjam dari sistem.

"Oracle harga" (sebutan yang sering digunakan) yang populer di DeFi termasuk Umpan Harga Chainlink, [Umpan Harga Terbuka](https://compound.finance/docs/prices) Protokol Compound, [Harga Rata-Rata Tertimbang Waktu (TWAP)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) Uniswap, dan [Oracle Maker](https://docs.makerdao.com/smart-contract-modules/oracle-module).

Pembangun harus memahami peringatan yang menyertai oracle harga ini sebelum mengintegrasikannya ke dalam proyek mereka. [Artikel](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/) ini memberikan analisis terperinci tentang apa yang harus dipertimbangkan saat merencanakan untuk menggunakan salah satu oracle harga yang disebutkan.

Di bawah ini adalah contoh bagaimana Anda dapat mengambil harga ETH terbaru dalam kontrak pintar Anda menggunakan umpan harga Chainlink:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /* *
     * Jaringan: Kovan
     * Agregator: ETH/USD
     * Alamat: 0x9326BFA02ADD2366b30bacB125260Af641031331 */
    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /* *
     * Mengembalikan harga terbaru */
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

Aplikasi blockchain tertentu, seperti game berbasis blockchain atau skema lotre, memerlukan tingkat ketidakpastian dan keacakan yang tinggi untuk bekerja secara efektif. Namun, eksekusi deterministik dari blockchain menghilangkan keacakan.

Pendekatan aslinya adalah menggunakan fungsi kriptografi pseudorandom, seperti `blockhash`, tetapi ini dapat [dimanipulasi oleh penambang](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) yang memecahkan algoritma proof-of-work. Selain itu, [peralihan Ethereum ke proof-of-stake](/roadmap/merge/) berarti pengembang tidak dapat lagi mengandalkan `blockhash` untuk keacakan onchain. [Mekanisme RANDAO](https://eth2book.info/altair/part2/building_blocks/randomness) dari beacon chain menyediakan sumber keacakan alternatif sebagai gantinya.

Dimungkinkan untuk menghasilkan nilai acak secara offchain dan mengirimkannya secara onchain, tetapi melakukan hal itu membebankan persyaratan kepercayaan yang tinggi pada pengguna. Mereka harus percaya bahwa nilai tersebut benar-benar dihasilkan melalui mekanisme yang tidak dapat diprediksi dan tidak diubah saat transit.

Oracle yang dirancang untuk komputasi offchain memecahkan masalah ini dengan secara aman menghasilkan hasil acak secara offchain yang mereka siarkan secara onchain bersama dengan bukti kriptografi yang membuktikan ketidakpastian proses tersebut. Contohnya adalah [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/) (Fungsi Acak yang Dapat Diverifikasi), yang merupakan generator angka acak (RNG) yang terbukti adil dan tahan kerusakan yang berguna untuk membangun kontrak pintar yang andal untuk aplikasi yang bergantung pada hasil yang tidak dapat diprediksi.

### Mendapatkan hasil untuk event {#getting-outcomes-for-events}

Dengan oracle, membuat kontrak pintar yang merespons event dunia nyata menjadi mudah. Layanan oracle memungkinkan hal ini dengan mengizinkan kontrak untuk terhubung ke API eksternal melalui komponen offchain dan mengonsumsi informasi dari sumber data tersebut. Misalnya, dapp prediksi yang disebutkan sebelumnya dapat meminta oracle untuk mengembalikan hasil pemilu dari sumber offchain tepercaya (mis., Associated Press).

Menggunakan oracle untuk mengambil data berdasarkan hasil dunia nyata memungkinkan kasus penggunaan baru lainnya; misalnya, produk asuransi terdesentralisasi membutuhkan informasi yang akurat tentang cuaca, bencana, dll. untuk bekerja secara efektif.

### Mengotomatiskan kontrak pintar {#automating-smart-contracts}

Kontrak pintar tidak berjalan secara otomatis; melainkan, akun yang dimiliki secara eksternal (EOA), atau akun kontrak lain, harus memicu fungsi yang tepat untuk mengeksekusi kode kontrak. Dalam kebanyakan kasus, sebagian besar fungsi kontrak bersifat publik dan dapat dipanggil oleh EOA dan kontrak lainnya.

Namun ada juga _fungsi privat_ di dalam kontrak yang tidak dapat diakses oleh orang lain;, tetapi sangat penting untuk fungsionalitas dapp secara keseluruhan. Contohnya termasuk fungsi `mintERC721Token()` yang secara berkala melakukan mint NFT baru untuk pengguna, fungsi untuk memberikan pembayaran di pasar prediksi, atau fungsi untuk membuka kunci token yang dikunci di DEX.

Pengembang perlu memicu fungsi tersebut secara berkala untuk menjaga aplikasi berjalan lancar. Namun, ini mungkin menyebabkan lebih banyak waktu yang hilang untuk tugas-tugas duniawi bagi pengembang, itulah sebabnya mengotomatiskan eksekusi kontrak pintar menjadi menarik.

Beberapa jaringan oracle terdesentralisasi menawarkan layanan otomatisasi, yang memungkinkan node oracle offchain untuk memicu fungsi kontrak pintar sesuai dengan parameter yang ditentukan oleh pengguna. Biasanya, ini memerlukan "pendaftaran" kontrak target dengan layanan oracle, menyediakan dana untuk membayar operator oracle, dan menentukan kondisi atau waktu untuk memicu kontrak.

[Jaringan Keeper](https://chain.link/keepers) Chainlink memberikan opsi untuk kontrak pintar untuk mengalihdayakan tugas pemeliharaan rutin dengan cara yang meminimalkan kepercayaan dan terdesentralisasi. Baca [dokumentasi Keeper](https://docs.chain.link/docs/chainlink-keepers/introduction/) resmi untuk informasi tentang membuat kontrak Anda kompatibel dengan Keeper dan menggunakan layanan Upkeep.

## Cara menggunakan oracle blockchain {#use-blockchain-oracles}

Ada beberapa aplikasi oracle yang dapat Anda integrasikan ke dalam dapp Ethereum Anda:

**[Chainlink](https://chain.link/)** - _Jaringan oracle terdesentralisasi Chainlink menyediakan input, output, dan komputasi yang tahan kerusakan untuk mendukung kontrak pintar tingkat lanjut di blockchain mana pun._

**[RedStone Oracles](https://redstone.finance/)** - _RedStone adalah oracle modular terdesentralisasi yang menyediakan umpan data yang dioptimalkan untuk gas. Ini mengkhususkan diri dalam menawarkan umpan harga untuk aset yang sedang berkembang, seperti token liquid staking (LST), token liquid restaking (LRT), dan derivatif staking Bitcoin._

**[Chronicle](https://chroniclelabs.org/)** - _Chronicle mengatasi keterbatasan saat ini dalam mentransfer data secara onchain dengan mengembangkan oracle yang benar-benar dapat diskalakan, hemat biaya, terdesentralisasi, dan dapat diverifikasi._

**[Witnet](https://witnet.io/)** - _Witnet adalah oracle tanpa izin, terdesentralisasi, dan tahan sensor yang membantu kontrak pintar untuk bereaksi terhadap event dunia nyata dengan jaminan kripto-ekonomi yang kuat._

**[UMA Oracle](https://uma.xyz)** - _Oracle optimis UMA memungkinkan kontrak pintar untuk dengan cepat menerima segala jenis data untuk berbagai aplikasi, termasuk asuransi, derivatif keuangan, dan pasar prediksi._

**[Tellor](https://tellor.io/)** - _Tellor adalah protokol oracle yang transparan dan tanpa izin untuk kontrak pintar Anda agar dengan mudah mendapatkan data apa pun kapan pun dibutuhkan._

**[Band Protocol](https://bandprotocol.com/)** - _Band Protocol adalah platform oracle data lintas rantai yang menggabungkan dan menghubungkan data dunia nyata dan API ke kontrak pintar._

**[Pyth Network](https://pyth.network/)** - _Jaringan Pyth adalah jaringan oracle keuangan pihak pertama yang dirancang untuk menerbitkan data dunia nyata secara berkelanjutan secara onchain dalam lingkungan yang tahan kerusakan, terdesentralisasi, dan mandiri._

**[API3 DAO](https://www.api3.org/)** - _API3 DAO memberikan solusi oracle pihak pertama yang memberikan transparansi sumber, keamanan, dan skalabilitas yang lebih besar dalam solusi terdesentralisasi untuk kontrak pintar_

**[Supra](https://supra.com/)** - Perangkat solusi lintas rantai yang terintegrasi secara vertikal yang menghubungkan semua blockchain, publik (L1 dan L2) atau privat (perusahaan), menyediakan umpan harga oracle terdesentralisasi yang dapat digunakan untuk kasus penggunaan onchain dan offchain. 

**[Gas Network](https://gas.network/)** - Platform oracle terdistribusi yang menyediakan data harga gas waktu nyata di seluruh blockchain. Dengan membawa data dari penyedia data harga gas terkemuka secara onchain, Gas Network membantu mendorong interoperabilitas. Gas Network mendukung data untuk lebih dari 35 rantai, termasuk Mainnet Ethereum dan banyak L2 terkemuka.

**[DIA](https://www.diadata.org/)** - Jaringan oracle lintas rantai yang memberikan umpan data yang dapat diverifikasi untuk 20.000+ aset di semua kelas aset utama. DIA mengambil data perdagangan mentah langsung dari 100+ pasar utama dan menghitungnya secara onchain, memastikan transparansi dan verifiabilitas data yang lengkap dengan konfigurasi khusus untuk kasus penggunaan apa pun.

**[Stork](https://stork.network)** - Stork memberikan data harga dengan latensi sangat rendah, mendukung berbagai kasus penggunaan termasuk pasar perpetual, protokol peminjaman, dan ekosistem DeFi, dengan aset baru yang didukung dengan cepat saat listing.

## Bacaan lebih lanjut {#further-reading}

**Artikel**

- [What Is a Blockchain Oracle?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [What is a Blockchain Oracle?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Decentralised Oracles: a comprehensive overview](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Implementing a Blockchain Oracle on Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Why can't smart contracts make API calls?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [So you want to use a price oracle](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Video**

- [Oracles and the Expansion of Blockchain Utility](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Tutorial**

- [How to Fetch the Current Price of Ethereum in Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Consuming Oracle Data](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_ 

**Contoh proyek**

- [Full Chainlink starter project for Ethereum in Solidity](https://github.com/hackbg/chainlink-fullstack) — _HackBG_