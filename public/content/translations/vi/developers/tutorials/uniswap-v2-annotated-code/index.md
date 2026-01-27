---
title: "Hướng dẫn chi tiết Hợp đồng Uniswap-v2"
description: Hợp đồng Uniswap-v2 hoạt động như thế nào? Tại sao nó lại được viết theo cách đó?
author: Ori Pomerantz
tags: [ "solidity" ]
skill: intermediate
published: 2021-05-01
lang: vi
---

## Giới thiệu {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) có thể tạo ra một thị trường giao dịch giữa hai token ERC-20 bất kỳ. Trong bài viết này, chúng ta sẽ xem xét mã nguồn của các hợp đồng triển khai giao thức này và xem tại sao chúng được viết theo cách này.

### Uniswap làm gì? {#what-does-uniswap-do}

Về cơ bản, có hai loại người dùng: nhà cung cấp thanh khoản và nhà giao dịch.

_Nhà cung cấp thanh khoản_ cung cấp cho pool hai token có thể được trao đổi (chúng tôi sẽ gọi chúng là **Token0** và **Token1**). Đổi lại, họ nhận được một token thứ ba đại diện cho quyền sở hữu một phần của pool được gọi là _token thanh khoản_.

_Nhà giao dịch_ gửi một loại token vào pool và nhận loại còn lại (ví dụ: gửi **Token0** và nhận **Token1**) từ pool do các nhà cung cấp thanh khoản cung cấp. Tỷ giá hối đoái được xác định bằng số lượng tương đối của **Token0** và **Token1** mà pool có. Ngoài ra, pool sẽ lấy một phần trăm nhỏ làm phần thưởng cho pool thanh khoản.

Khi các nhà cung cấp thanh khoản muốn lấy lại tài sản của mình, họ có thể đốt các token pool và nhận lại các token của mình, bao gồm cả phần thưởng của họ.

[Nhấp vào đây để xem mô tả đầy đủ hơn](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Tại sao lại là v2? Tại sao không phải v3? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) là một bản nâng cấp phức tạp hơn nhiều so với v2. Sẽ dễ dàng hơn nếu học v2 trước rồi mới chuyển sang v3.

### Hợp đồng lõi và Hợp đồng ngoại vi {#contract-types}

Uniswap v2 được chia thành hai thành phần, lõi và ngoại vi. Sự phân chia này cho phép các hợp đồng lõi, nơi chứa tài sản và do đó _phải_ được bảo mật, trở nên đơn giản và dễ kiểm toán hơn. Tất cả các chức năng bổ sung mà nhà giao dịch yêu cầu sau đó có thể được cung cấp bởi các hợp đồng ngoại vi.

## Luồng dữ liệu và luồng điều khiển {#flows}

Đây là luồng dữ liệu và điều khiển xảy ra khi bạn thực hiện ba hành động chính của Uniswap:

1. Hoán đổi giữa các token khác nhau
2. Thêm thanh khoản vào thị trường và nhận phần thưởng bằng các token thanh khoản ERC-20 trao đổi theo cặp
3. Đốt các token thanh khoản ERC-20 và nhận lại các token ERC-20 mà sàn giao dịch cặp cho phép các nhà giao dịch trao đổi

### Hoán đổi {#swap-flow}

Đây là luồng phổ biến nhất, được các nhà giao dịch sử dụng:

#### Người gọi {#caller}

1. Cung cấp cho tài khoản ngoại vi một khoản trợ cấp với số tiền sẽ được hoán đổi.
2. Gọi một trong nhiều hàm hoán đổi của hợp đồng ngoại vi (hàm nào phụ thuộc vào việc ETH có liên quan hay không, liệu nhà giao dịch có chỉ định số lượng token sẽ ký gửi hay số lượng token sẽ nhận lại, v.v.).
   Mọi hàm hoán đổi đều chấp nhận một `path`, một mảng các sàn giao dịch để đi qua.

#### Trong hợp đồng ngoại vi (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Xác định số tiền cần giao dịch trên mỗi sàn giao dịch dọc theo đường dẫn.
4. Lặp lại trên đường dẫn. Đối với mỗi sàn giao dịch trên đường đi, nó sẽ gửi token đầu vào và sau đó gọi hàm `swap` của sàn giao dịch.
   Trong hầu hết các trường hợp, địa chỉ đích cho các token là sàn giao dịch cặp tiếp theo trong đường dẫn. Trong sàn giao dịch cuối cùng, đó là địa chỉ do nhà giao dịch cung cấp.

#### Trong hợp đồng lõi (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. Xác minh rằng hợp đồng lõi không bị gian lận và có thể duy trì đủ thanh khoản sau khi hoán đổi.
6. Xem chúng ta có bao nhiêu token bổ sung ngoài các khoản dự trữ đã biết. Số tiền đó là số lượng token đầu vào mà chúng tôi đã nhận được để trao đổi.
7. Gửi các token đầu ra đến đích.
8. Gọi `_update` để cập nhật số lượng dự trữ

#### Quay lại hợp đồng ngoại vi (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Thực hiện bất kỳ thao tác dọn dẹp cần thiết nào (ví dụ: đốt token WETH để lấy lại ETH gửi cho nhà giao dịch)

### Thêm thanh khoản {#add-liquidity-flow}

#### Người gọi {#caller-2}

1. Cung cấp cho tài khoản ngoại vi một khoản trợ cấp với số tiền sẽ được thêm vào pool thanh khoản.
2. Gọi một trong các hàm `addLiquidity` của hợp đồng ngoại vi.

#### Trong hợp đồng ngoại vi (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Tạo một sàn giao dịch cặp mới nếu cần
4. Nếu có một sàn giao dịch cặp hiện có, hãy tính toán số lượng token cần thêm. Giá trị này được cho là giống hệt nhau đối với cả hai token, do đó, tỷ lệ token mới so với token hiện có là như nhau.
5. Kiểm tra xem số tiền có được chấp nhận hay không (người gọi có thể chỉ định số tiền tối thiểu mà dưới mức đó họ không muốn thêm thanh khoản)
6. Gọi hợp đồng lõi.

#### Trong hợp đồng lõi (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. Đúc token thanh khoản và gửi chúng cho người gọi
8. Gọi `_update` để cập nhật số lượng dự trữ

### Xóa thanh khoản {#remove-liquidity-flow}

#### Người gọi {#caller-3}

1. Cung cấp cho tài khoản ngoại vi một khoản trợ cấp các token thanh khoản để đốt để đổi lấy các token cơ sở.
2. Gọi một trong các hàm `removeLiquidity` của hợp đồng ngoại vi.

#### Trong hợp đồng ngoại vi (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Gửi các token thanh khoản đến sàn giao dịch cặp

#### Trong hợp đồng lõi (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Gửi cho địa chỉ đích các token cơ sở theo tỷ lệ với các token đã đốt. Ví dụ: nếu có 1000 token A trong pool, 500 token B và 90 token thanh khoản, và chúng tôi nhận được 9 token để đốt, chúng tôi đang đốt 10% token thanh khoản, vì vậy chúng tôi gửi lại cho người dùng 100 token A và 50 token B.
5. Đốt các token thanh khoản
6. Gọi `_update` để cập nhật số lượng dự trữ

## Các hợp đồng lõi {#core-contracts}

Đây là những hợp đồng bảo mật chứa thanh khoản.

### UniswapV2Pair.sol {#UniswapV2Pair}

[Hợp đồng này](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) triển khai pool thực tế trao đổi token. Đó là chức năng cốt lõi của Uniswap.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Pair.sol';
import './UniswapV2ERC20.sol';
import './libraries/Math.sol';
import './libraries/UQ112x112.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Callee.sol';
```

Đây là tất cả các giao diện mà hợp đồng cần biết, hoặc vì hợp đồng triển khai chúng (`IUniswapV2Pair` và `UniswapV2ERC20`) hoặc vì nó gọi các hợp đồng triển khai chúng.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Hợp đồng này kế thừa từ `UniswapV2ERC20`, cung cấp các hàm ERC-20 cho các token thanh khoản.

```solidity
    using SafeMath  for uint;
```

[Thư viện SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) được sử dụng để tránh tràn số và tràn số dưới. Điều này rất quan trọng vì nếu không, chúng ta có thể rơi vào tình huống trong đó một giá trị phải là `-1`, nhưng thay vào đó lại là `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

Rất nhiều phép tính trong hợp đồng pool yêu cầu phân số. Tuy nhiên, EVM không hỗ trợ phân số.
Giải pháp mà Uniswap tìm thấy là sử dụng các giá trị 224 bit, với 112 bit cho phần nguyên và 112 bit cho phần phân số. Vì vậy, `1.0` được biểu thị bằng `2^112`, `1.5` được biểu thị bằng `2^112 + 2^111`, v.v.

Thông tin chi tiết hơn về thư viện này có trong [phần sau của tài liệu](#FixedPoint).

#### Biến {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Để tránh các trường hợp chia cho số không, có một số lượng token thanh khoản tối thiểu luôn tồn tại (nhưng thuộc sở hữu của tài khoản không). Con số đó là **MINIMUM_LIQUIDITY**, một nghìn.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Đây là bộ chọn ABI cho hàm chuyển ERC-20. Nó được sử dụng để chuyển token ERC-20 trong hai tài khoản token.

```solidity
    address public factory;
```

Đây là hợp đồng factory đã tạo ra pool này. Mỗi pool là một sàn giao dịch giữa hai token ERC-20, factory là một điểm trung tâm kết nối tất cả các pool này.

```solidity
    address public token0;
    address public token1;
```

Đây là địa chỉ của các hợp đồng cho hai loại token ERC-20 có thể được trao đổi bởi pool này.

```solidity
    uint112 private reserve0;           // sử dụng một khe lưu trữ duy nhất, có thể truy cập qua getReserves
    uint112 private reserve1;           // sử dụng một khe lưu trữ duy nhất, có thể truy cập qua getReserves
```

Các khoản dự trữ mà pool có cho mỗi loại token. Chúng tôi giả định rằng hai loại này đại diện cho cùng một lượng giá trị, và do đó mỗi token0 có giá trị bằng reserve1/reserve0 token1.

```solidity
    uint32  private blockTimestampLast; // sử dụng một khe lưu trữ duy nhất, có thể truy cập qua getReserves
```

Dấu thời gian cho khối cuối cùng trong đó một giao dịch xảy ra, được sử dụng để theo dõi tỷ giá hối đoái theo thời gian.

Một trong những chi phí gas lớn nhất của hợp đồng Ethereum là lưu trữ, tồn tại từ lần gọi hợp đồng này đến lần gọi tiếp theo. Mỗi ô lưu trữ dài 256 bit. Vì vậy, ba biến, `reserve0`, `reserve1` và `blockTimestampLast`, được phân bổ theo cách mà một giá trị lưu trữ duy nhất có thể bao gồm cả ba biến đó (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Các biến này chứa chi phí tích lũy cho mỗi token (mỗi loại theo loại kia). Chúng có thể được sử dụng để tính tỷ giá hối đoái trung bình trong một khoảng thời gian.

```solidity
    uint public kLast; // reserve0 * reserve1, ngay sau sự kiện thanh khoản gần đây nhất
```

Cách sàn giao dịch cặp quyết định tỷ giá hối đoái giữa token0 và token1 là giữ cho bội số của hai khoản dự trữ không đổi trong các giao dịch. `kLast` là giá trị này. Nó thay đổi khi nhà cung cấp thanh khoản ký gửi hoặc rút token, và nó tăng nhẹ do phí thị trường 0,3%.

Đây là một ví dụ đơn giản. Lưu ý rằng để đơn giản, bảng chỉ có ba chữ số sau dấu thập phân và chúng tôi bỏ qua phí giao dịch 0,3% nên các con số không chính xác.

| Sự kiện                                                              |                   dự trữ0 |                   dự trữ1 | dự trữ0 \* dự trữ1 | Tỷ giá hối đoái trung bình (token1 / token0) |
| -------------------------------------------------------------------- | ------------------------: | ------------------------: | -----------------: | --------------------------------------------------------------- |
| Thiết lập ban đầu                                                    | 1,000.000 | 1,000.000 |          1,000,000 |                                                                 |
| Nhà giao dịch A hoán đổi 50 token0 lấy 47.619 token1 | 1,050.000 |   952.381 |          1,000,000 | 0.952                                           |
| Nhà giao dịch B hoán đổi 10 token0 lấy 8.984 token1  | 1,060.000 |   943.396 |          1,000,000 | 0.898                                           |
| Nhà giao dịch C hoán đổi 40 token0 lấy 34.305 token1 | 1,100.000 |   909.090 |          1,000,000 | 0.858                                           |
| Nhà giao dịch D hoán đổi 100 token1 lấy 109,01 token0                |   990.990 | 1,009.090 |          1,000,000 | 0.917                                           |
| Nhà giao dịch E hoán đổi 10 token0 lấy 10.079 token1 | 1,000.990 |   999.010 |          1,000,000 | 1.008                                           |

Khi các nhà giao dịch cung cấp nhiều token0 hơn, giá trị tương đối của token1 tăng lên và ngược lại, dựa trên cung và cầu.

#### Khóa {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Có một loại lỗ hổng bảo mật dựa trên [lạm dụng truy cập lại](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). Uniswap cần chuyển các token ERC-20 tùy ý, điều đó có nghĩa là gọi các hợp đồng ERC-20 có thể cố gắng lạm dụng thị trường Uniswap gọi chúng.
Bằng cách có một biến `unlocked` như một phần của hợp đồng, chúng ta có thể ngăn các hàm được gọi trong khi chúng đang chạy (trong cùng một giao dịch).

```solidity
    modifier lock() {
```

Hàm này là một [bộ điều chỉnh](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), một hàm bao quanh một hàm bình thường để thay đổi hành vi của nó theo một cách nào đó.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Nếu `unlocked` bằng một, hãy đặt nó thành không. Nếu nó đã bằng không, hãy hoàn nguyên cuộc gọi, làm cho nó thất bại.

```solidity
        _;
```

Trong một bộ điều chỉnh, `_;` là lệnh gọi hàm gốc (với tất cả các tham số). Ở đây, nó có nghĩa là lệnh gọi hàm chỉ xảy ra nếu `unlocked` là một khi nó được gọi và trong khi nó đang chạy, giá trị của `unlocked` là không.

```solidity
        unlocked = 1;
    }
```

Sau khi hàm chính trả về, hãy nhả khóa.

#### Khác. các hàm {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Hàm này cung cấp cho người gọi trạng thái hiện tại của sàn giao dịch. Lưu ý rằng các hàm Solidity [có thể trả về nhiều giá trị](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Hàm nội bộ này chuyển một lượng token ERC20 từ sàn giao dịch sang người khác. `SELECTOR` chỉ định rằng hàm chúng ta đang gọi là `transfer(address,uint)` (xem định nghĩa ở trên).

Để tránh phải nhập giao diện cho hàm token, chúng tôi "thủ công" tạo lệnh gọi bằng cách sử dụng một trong các [hàm ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Có hai cách mà một lệnh gọi chuyển ERC-20 có thể báo cáo lỗi:

1. Hoàn nguyên. Nếu một lệnh gọi đến một hợp đồng bên ngoài bị hoàn nguyên, thì giá trị trả về kiểu boolean là `false`
2. Kết thúc bình thường nhưng báo cáo lỗi. Trong trường hợp đó, bộ đệm giá trị trả về có độ dài khác không và khi được giải mã thành giá trị boolean, nó là `false`

Nếu một trong hai điều kiện này xảy ra, hãy hoàn nguyên.

#### Sự kiện {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Hai sự kiện này được phát ra khi nhà cung cấp thanh khoản ký gửi thanh khoản (`Mint`) hoặc rút thanh khoản đó (`Burn`). Trong cả hai trường hợp, số lượng token0 và token1 được ký gửi hoặc rút là một phần của sự kiện, cũng như danh tính của tài khoản đã gọi chúng tôi (`sender`). Trong trường hợp rút tiền, sự kiện này cũng bao gồm mục tiêu đã nhận được token (`to`), có thể không giống với người gửi.

```solidity
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
```

Sự kiện này được phát ra khi một nhà giao dịch hoán đổi một token này lấy một token khác. Một lần nữa, người gửi và người nhận có thể không giống nhau.
Mỗi token có thể được gửi đến sàn giao dịch hoặc nhận từ đó.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Cuối cùng, `Sync` được phát ra mỗi khi token được thêm vào hoặc rút ra, bất kể lý do gì, để cung cấp thông tin dự trữ mới nhất (và do đó là tỷ giá hối đoái).

#### Các hàm thiết lập {#pair-setup}

Các hàm này được cho là sẽ được gọi một lần khi sàn giao dịch cặp mới được thiết lập.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Hàm khởi tạo đảm bảo rằng chúng tôi sẽ theo dõi địa chỉ của factory đã tạo ra cặp. Thông tin này là bắt buộc đối với `initialize` và đối với phí factory (nếu có)

```solidity
    // được gọi một lần bởi factory tại thời điểm triển khai
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // kiểm tra đủ
        token0 = _token0;
        token1 = _token1;
    }
```

Hàm này cho phép factory (và chỉ factory) chỉ định hai token ERC-20 mà cặp này sẽ trao đổi.

#### Các hàm cập nhật nội bộ {#pair-update-internal}

##### \_update

```solidity
    // cập nhật các khoản dự trữ và, trong lần gọi đầu tiên trên mỗi khối, các bộ tích lũy giá
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Hàm này được gọi mỗi khi token được ký gửi hoặc rút.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Nếu balance0 hoặc balance1 (uint256) cao hơn uint112(-1) (=2^112-1) (do đó nó bị tràn và quay trở lại 0 khi được chuyển đổi thành uint112) từ chối tiếp tục \_update để ngăn chặn tràn số. Với một token thông thường có thể được chia thành 10^18 đơn vị, điều này có nghĩa là mỗi sàn giao dịch được giới hạn ở khoảng 5.1\*10^15 cho mỗi token. Cho đến nay, đó không phải là một vấn đề.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // tràn số là mong muốn
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Nếu thời gian đã trôi qua không phải là không, điều đó có nghĩa là chúng ta là giao dịch trao đổi đầu tiên trên khối này. Trong trường hợp đó, chúng ta cần cập nhật các bộ tích lũy chi phí.

```solidity
            // * không bao giờ tràn, và + tràn là mong muốn
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Mỗi bộ tích lũy chi phí được cập nhật với chi phí mới nhất (dự trữ của token khác/dự trữ của token này) nhân với thời gian đã trôi qua tính bằng giây. Để có được giá trung bình, bạn đọc giá tích lũy tại hai thời điểm và chia cho chênh lệch thời gian giữa chúng. Ví dụ: giả sử chuỗi sự kiện này:

| Sự kiện                                                                    |                   dự trữ0 |                   dự trữ1 | dấu thời gian | Tỷ giá hối đoái cận biên (dự trữ1 / dự trữ0) |                                                       price0CumulativeLast |
| -------------------------------------------------------------------------- | ------------------------: | ------------------------: | ------------- | --------------------------------------------------------------: | -------------------------------------------------------------------------: |
| Thiết lập ban đầu                                                          | 1,000.000 | 1,000.000 | 5,000         |                                           1.000 |                                                                          0 |
| Nhà giao dịch A ký gửi 50 token0 và nhận lại 47.619 token1 | 1,050.000 |   952.381 | 5,020         |                                           0.907 |                                                                         20 |
| Nhà giao dịch B ký gửi 10 token0 và nhận lại 8.984 token1  | 1,060.000 |   943.396 | 5,030         |                                           0.890 |                       20+10\*0.907 = 29.07 |
| Nhà giao dịch C ký gửi 40 token0 và nhận lại 34.305 token1 | 1,100.000 |   909.090 | 5,100         |                                           0.826 |    29.07+70\*0.890 = 91.37 |
| Nhà giao dịch D ký gửi 100 token1 và nhận lại 109,01 token0                |   990.990 | 1,009.090 | 5,110         |                                           1.018 |    91.37+10\*0.826 = 99.63 |
| Nhà giao dịch E ký gửi 10 token0 và nhận lại 10.079 token1 | 1,000.990 |   999.010 | 5,150         |                                           0.998 | 99.63+40\*1.1018 = 143.702 |

Giả sử chúng ta muốn tính giá trung bình của **Token0** trong khoảng thời gian từ 5.030 đến 5.150. Sự khác biệt về giá trị của `price0Cumulative` là 143,702-29,07=114,632. Đây là mức trung bình trong hai phút (120 giây). Vì vậy, giá trung bình là 114,632/120 = 0,955.

Việc tính toán giá này là lý do chúng ta cần biết kích thước dự trữ cũ.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Cuối cùng, cập nhật các biến toàn cục và phát ra một sự kiện `Sync`.

##### \_mintFee

```solidity
    // nếu phí được bật, đúc thanh khoản tương đương 1/6 mức tăng trưởng trong sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

Trong Uniswap 2.0, các nhà giao dịch phải trả một khoản phí 0,30% để sử dụng thị trường. Hầu hết khoản phí đó (0,25% giao dịch) luôn thuộc về các nhà cung cấp thanh khoản. 0,05% còn lại có thể thuộc về các nhà cung cấp thanh khoản hoặc đến một địa chỉ do factory chỉ định làm phí giao thức, khoản phí này sẽ trả cho Uniswap cho nỗ lực phát triển của họ.

Để giảm thiểu các phép tính (và do đó là chi phí gas), khoản phí này chỉ được tính khi thanh khoản được thêm vào hoặc xóa khỏi pool, thay vì tại mỗi giao dịch.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Đọc điểm đến của phí factory. Nếu nó bằng không thì không có phí giao thức và không cần phải tính khoản phí đó.

```solidity
        uint _kLast = kLast; // tiết kiệm gas
```

Biến trạng thái `kLast` được đặt trong bộ nhớ, vì vậy nó sẽ có một giá trị giữa các lệnh gọi khác nhau đến hợp đồng.
Việc truy cập vào bộ nhớ lưu trữ tốn kém hơn nhiều so với việc truy cập vào bộ nhớ tạm thời được giải phóng khi lệnh gọi hàm đến hợp đồng kết thúc, vì vậy chúng tôi sử dụng một biến nội bộ để tiết kiệm gas.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Các nhà cung cấp thanh khoản nhận được phần của mình chỉ đơn giản bằng cách đánh giá cao các token thanh khoản của họ. Nhưng phí giao thức yêu cầu các token thanh khoản mới phải được đúc và cung cấp cho địa chỉ `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Nếu có thanh khoản mới để thu phí giao thức. Bạn có thể xem hàm căn bậc hai [ở phần sau của bài viết này](#Math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Việc tính toán phức tạp các khoản phí này được giải thích trong [sách trắng](https://app.uniswap.org/whitepaper.pdf) trên trang 5. Chúng tôi biết rằng giữa thời điểm `kLast` được tính toán và hiện tại, không có thanh khoản nào được thêm vào hoặc xóa đi (bởi vì chúng tôi chạy phép tính này mỗi khi thanh khoản được thêm vào hoặc xóa đi, trước khi nó thực sự thay đổi), vì vậy bất kỳ thay đổi nào trong `reserve0 * reserve1` đều phải đến từ phí giao dịch (nếu không có chúng, chúng tôi sẽ giữ `reserve0 * reserve1` không đổi).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Sử dụng hàm `UniswapV2ERC20._mint` để thực sự tạo các token thanh khoản bổ sung và gán chúng cho `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Nếu không có phí, hãy đặt `kLast` thành không (nếu nó chưa phải là không). Khi hợp đồng này được viết, có một [tính năng hoàn lại gas](https://eips.ethereum.org/EIPS/eip-3298) khuyến khích các hợp đồng giảm kích thước tổng thể của trạng thái Ethereum bằng cách đặt về không bộ nhớ lưu trữ mà chúng không cần.
Mã này sẽ nhận được khoản hoàn trả đó khi có thể.

#### Các hàm có thể truy cập bên ngoài {#pair-external}

Lưu ý rằng mặc dù bất kỳ giao dịch hoặc hợp đồng nào _có thể_ gọi các hàm này, chúng được thiết kế để được gọi từ hợp đồng ngoại vi. Nếu bạn gọi trực tiếp chúng, bạn sẽ không thể gian lận sàn giao dịch cặp, nhưng bạn có thể mất giá trị do nhầm lẫn.

##### đúc

```solidity
    // hàm cấp thấp này nên được gọi từ một hợp đồng thực hiện các kiểm tra an toàn quan trọng
    function mint(address to) external lock returns (uint liquidity) {
```

Hàm này được gọi khi nhà cung cấp thanh khoản thêm thanh khoản vào pool. Nó đúc các token thanh khoản bổ sung như một phần thưởng. Nó nên được gọi từ [một hợp đồng ngoại vi](#UniswapV2Router02) gọi nó sau khi thêm thanh khoản trong cùng một giao dịch (vì vậy không ai khác có thể gửi một giao dịch yêu cầu thanh khoản mới trước chủ sở hữu hợp pháp).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // tiết kiệm gas
```

Đây là cách để đọc kết quả của một hàm Solidity trả về nhiều giá trị. Chúng tôi loại bỏ các giá trị trả về cuối cùng, dấu thời gian của khối, vì chúng tôi không cần nó.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Lấy số dư hiện tại và xem mỗi loại token đã được thêm bao nhiêu.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Tính toán các khoản phí giao thức để thu, nếu có, và đúc các token thanh khoản tương ứng. Vì các tham số của `_mintFee` là các giá trị dự trữ cũ, nên phí được tính toán chính xác chỉ dựa trên các thay đổi của pool do phí.

```solidity
        uint _totalSupply = totalSupply; // tiết kiệm gas, phải được định nghĩa ở đây vì totalSupply có thể cập nhật trong _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // khóa vĩnh viễn các token MINIMUM_LIQUIDITY đầu tiên
```

Nếu đây là lần gửi tiền đầu tiên, hãy tạo token `MINIMUM_LIQUIDITY` và gửi chúng đến địa chỉ không để khóa chúng. Chúng không bao giờ có thể được đổi, điều đó có nghĩa là pool sẽ không bao giờ bị cạn kiệt hoàn toàn (điều này giúp chúng ta tránh bị chia cho số không ở một số nơi). Giá trị của `MINIMUM_LIQUIDITY` là một nghìn, xét rằng hầu hết ERC-20 được chia thành các đơn vị bằng 10^-18 của một token, như ETH được chia thành wei, là 10^-15 giá trị của một token. Không phải là một chi phí cao.

Tại thời điểm gửi tiền lần đầu tiên, chúng tôi không biết giá trị tương đối của hai token, vì vậy chúng tôi chỉ nhân số lượng và lấy căn bậc hai, giả sử rằng khoản tiền gửi cung cấp cho chúng tôi giá trị bằng nhau ở cả hai token.

Chúng ta có thể tin tưởng điều này vì việc cung cấp giá trị bằng nhau là vì lợi ích của người gửi tiền, để tránh mất giá trị cho chênh lệch giá.
Giả sử giá trị của hai token giống hệt nhau, nhưng người gửi tiền của chúng tôi đã gửi số lượng **Token1** nhiều gấp bốn lần so với **Token0**. Một nhà giao dịch có thể sử dụng thực tế là sàn giao dịch cặp nghĩ rằng **Token0** có giá trị hơn để trích xuất giá trị từ nó.

| Sự kiện                                                      | dự trữ0 | dự trữ1 | dự trữ0 \* dự trữ1 | Giá trị của pool (dự trữ0 + dự trữ1) |
| ------------------------------------------------------------ | ------: | ------: | -----------------: | ------------------------------------------------------: |
| Thiết lập ban đầu                                            |       8 |      32 |                256 |                                                      40 |
| Nhà giao dịch gửi 8 token **Token0**, nhận lại 16 **Token1** |      16 |      16 |                256 |                                                      32 |

Như bạn có thể thấy, nhà giao dịch đã kiếm được thêm 8 token, đến từ việc giảm giá trị của pool, gây tổn hại cho người gửi tiền sở hữu nó.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Với mỗi lần gửi tiền tiếp theo, chúng tôi đã biết tỷ giá hối đoái giữa hai tài sản và chúng tôi mong đợi các nhà cung cấp thanh khoản cung cấp giá trị bằng nhau ở cả hai. Nếu không, chúng tôi sẽ cung cấp cho họ các token thanh khoản dựa trên giá trị thấp hơn mà họ đã cung cấp như một hình phạt.

Cho dù đó là khoản tiền gửi ban đầu hay khoản tiền gửi tiếp theo, số lượng token thanh khoản mà chúng tôi cung cấp bằng căn bậc hai của sự thay đổi trong `reserve0*reserve1` và giá trị của token thanh khoản không thay đổi (trừ khi chúng tôi nhận được một khoản tiền gửi không có giá trị bằng nhau của cả hai loại, trong trường hợp đó "khoản phạt" sẽ được phân phối). Đây là một ví dụ khác với hai token có cùng giá trị, với ba khoản tiền gửi tốt và một khoản tiền gửi xấu (tiền gửi chỉ có một loại token, vì vậy nó không tạo ra bất kỳ token thanh khoản nào).

| Sự kiện                             |                                 dự trữ0 |                                 dự trữ1 | dự trữ0 \* dự trữ1 | Giá trị pool (dự trữ0 + dự trữ1) | Token thanh khoản được đúc cho khoản tiền gửi này | Tổng số token thanh khoản |      giá trị của mỗi token thanh khoản |
| ----------------------------------- | --------------------------------------: | --------------------------------------: | -----------------: | --------------------------------------------------: | ------------------------------------------------: | ------------------------: | -------------------------------------: |
| Thiết lập ban đầu                   |                   8.000 |                   8.000 |                 64 |                              16.000 |                                                 8 |                         8 |                  2.000 |
| Gửi bốn của mỗi loại                |                  12.000 |                  12.000 |                144 |                              24.000 |                                                 4 |                        12 |                  2.000 |
| Gửi hai của mỗi loại                |                  14.000 |                  14.000 |                196 |                              28.000 |                                                 2 |                        14 |                  2.000 |
| Gửi tiền có giá trị không bằng nhau |                  18.000 |                  14.000 |                252 |                              32.000 |                                                 0 |                        14 | ~2.286 |
| Sau chênh lệch giá                  | ~15.874 | ~15.874 |                252 |             ~31.748 |                                                 0 |                        14 | ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Sử dụng hàm `UniswapV2ERC20._mint` để thực sự tạo các token thanh khoản bổ sung và cung cấp chúng cho tài khoản chính xác.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Mint(msg.sender, amount0, amount1);
    }
```

Cập nhật các biến trạng thái (`reserve0`, `reserve1` và nếu cần `kLast`) và phát ra sự kiện thích hợp.

##### đốt

```solidity
    // hàm cấp thấp này nên được gọi từ một hợp đồng thực hiện các kiểm tra an toàn quan trọng
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Hàm này được gọi khi thanh khoản được rút và các token thanh khoản thích hợp cần được đốt.
Nó cũng nên được gọi [từ một tài khoản ngoại vi](#UniswapV2Router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // tiết kiệm gas
        address _token0 = token0;                                // tiết kiệm gas
        address _token1 = token1;                                // tiết kiệm gas
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Hợp đồng ngoại vi đã chuyển thanh khoản sẽ được đốt vào hợp đồng này trước khi gọi. Bằng cách đó, chúng tôi biết được lượng thanh khoản cần đốt và có thể đảm bảo rằng nó sẽ bị đốt.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // tiết kiệm gas, phải được định nghĩa ở đây vì totalSupply có thể cập nhật trong _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // sử dụng số dư đảm bảo phân phối theo tỷ lệ
        amount1 = liquidity.mul(balance1) / _totalSupply; // sử dụng số dư đảm bảo phân phối theo tỷ lệ
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

Nhà cung cấp thanh khoản nhận được giá trị bằng nhau của cả hai token. Bằng cách này, chúng tôi không thay đổi tỷ giá hối đoái.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

Phần còn lại của hàm `burn` là hình ảnh phản chiếu của hàm `mint` ở trên.

##### hoán đổi

```solidity
    // hàm cấp thấp này nên được gọi từ một hợp đồng thực hiện các kiểm tra an toàn quan trọng
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Hàm này cũng được cho là sẽ được gọi từ [một hợp đồng ngoại vi](#UniswapV2Router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // tiết kiệm gas
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // scope for _token{0,1}, avoids stack too deep errors
```

Các biến cục bộ có thể được lưu trữ trong bộ nhớ hoặc, nếu không có quá nhiều biến, trực tiếp trên ngăn xếp.
Nếu chúng ta có thể giới hạn số lượng để sử dụng ngăn xếp, chúng ta sẽ sử dụng ít gas hơn. Để biết thêm chi tiết, hãy xem [giấy vàng, thông số kỹ thuật chính thức của Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), trang 26, phương trình 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // chuyển token một cách lạc quan
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // chuyển token một cách lạc quan
```

Việc chuyển tiền này là lạc quan, vì chúng tôi chuyển tiền trước khi chắc chắn tất cả các điều kiện đã được đáp ứng. Điều này ổn trong Ethereum vì nếu các điều kiện không được đáp ứng sau này trong lệnh gọi, chúng tôi sẽ hoàn nguyên khỏi nó và mọi thay đổi mà nó đã tạo ra.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Thông báo cho người nhận về việc hoán đổi nếu được yêu cầu.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Lấy số dư hiện tại. Hợp đồng ngoại vi gửi cho chúng tôi các token trước khi gọi chúng tôi để hoán đổi. Điều này giúp hợp đồng dễ dàng kiểm tra xem nó có bị gian lận hay không, một kiểm tra _phải_ xảy ra trong hợp đồng lõi (vì chúng tôi có thể được gọi bởi các thực thể khác ngoài hợp đồng ngoại vi của chúng tôi).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // scope for reserve{0,1}Adjusted, avoids stack too deep errors
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Đây là một kiểm tra hợp lý để đảm bảo chúng tôi không bị mất mát từ việc hoán đổi. Không có trường hợp nào mà việc hoán đổi sẽ làm giảm `reserve0*reserve1`. Đây cũng là nơi chúng tôi đảm bảo một khoản phí 0,3% đang được gửi khi hoán đổi; trước khi kiểm tra tính hợp lệ của giá trị K, chúng tôi nhân cả hai số dư với 1000 trừ đi số tiền nhân với 3, điều này có nghĩa là 0,3% (3/1000 = 0,003 = 0,3%) đang được khấu trừ khỏi số dư trước khi so sánh giá trị K của nó với giá trị K dự trữ hiện tại.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Cập nhật `reserve0` và `reserve1`, và nếu cần, các bộ tích lũy giá và dấu thời gian và phát ra một sự kiện.

##### Đồng bộ hóa hoặc Lướt qua

Có thể số dư thực tế bị mất đồng bộ với các khoản dự trữ mà sàn giao dịch cặp nghĩ rằng nó có.
Không có cách nào để rút token mà không có sự đồng ý của hợp đồng, nhưng việc gửi tiền lại là một vấn đề khác. Một tài khoản có thể chuyển token đến sàn giao dịch mà không cần gọi `mint` hoặc `swap`.

Trong trường hợp đó có hai giải pháp:

- `sync`, cập nhật các khoản dự trữ thành số dư hiện tại
- `skim`, rút số tiền thừa. Lưu ý rằng bất kỳ tài khoản nào cũng được phép gọi `skim` vì chúng tôi không biết ai đã gửi token. Thông tin này được phát ra trong một sự kiện, nhưng các sự kiện không thể truy cập từ chuỗi khối.

```solidity
    // buộc số dư khớp với các khoản dự trữ
    function skim(address to) external lock {
        address _token0 = token0; // tiết kiệm gas
        address _token1 = token1; // tiết kiệm gas
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // buộc các khoản dự trữ khớp với số dư
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[Hợp đồng này](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) tạo ra các sàn giao dịch cặp.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Các biến trạng thái này là cần thiết để thực hiện phí giao thức (xem [sách trắng](https://app.uniswap.org/whitepaper.pdf), trang 5).
Địa chỉ `feeTo` tích lũy các token thanh khoản cho phí giao thức và `feeToSetter` là địa chỉ được phép thay đổi `feeTo` thành một địa chỉ khác.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Các biến này theo dõi các cặp, các giao dịch giữa hai loại token.

Biến đầu tiên, `getPair`, là một ánh xạ xác định một hợp đồng trao đổi cặp dựa trên hai token ERC-20 mà nó trao đổi. Các token ERC-20 được xác định bằng địa chỉ của các hợp đồng triển khai chúng, vì vậy các khóa và giá trị đều là các địa chỉ. Để lấy địa chỉ của sàn giao dịch cặp cho phép bạn chuyển đổi từ `tokenA` sang `tokenB`, bạn sử dụng `getPair[<địa chỉ tokenA>][<địa chỉ tokenB>]` (hoặc ngược lại).

Biến thứ hai, `allPairs`, là một mảng bao gồm tất cả các địa chỉ của các sàn giao dịch cặp được tạo bởi factory này. Trong Ethereum, bạn không thể lặp lại nội dung của một ánh xạ hoặc lấy danh sách tất cả các khóa, vì vậy biến này là cách duy nhất để biết factory này quản lý những sàn giao dịch nào.

Lưu ý: Lý do bạn không thể lặp lại tất cả các khóa của một ánh xạ là vì việc lưu trữ dữ liệu hợp đồng là _đắt đỏ_, vì vậy chúng ta càng sử dụng ít nó càng tốt và chúng ta càng ít thay đổi nó càng tốt. Bạn có thể tạo [các ánh xạ hỗ trợ lặp lại](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), nhưng chúng yêu cầu bộ nhớ lưu trữ bổ sung cho một danh sách các khóa. Trong hầu hết các ứng dụng, bạn không cần điều đó.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Sự kiện này được phát ra khi một sàn giao dịch cặp mới được tạo. Nó bao gồm các địa chỉ của token, địa chỉ của sàn giao dịch cặp và tổng số sàn giao dịch được quản lý bởi factory.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

Điều duy nhất mà hàm khởi tạo làm là chỉ định `feeToSetter`. Các factory bắt đầu mà không có phí, và chỉ `feeSetter` mới có thể thay đổi điều đó.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Hàm này trả về số lượng cặp trao đổi.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Đây là chức năng chính của factory, để tạo ra một sàn giao dịch cặp giữa hai token ERC-20. Lưu ý rằng bất kỳ ai cũng có thể gọi hàm này. Bạn không cần sự cho phép của Uniswap để tạo một sàn giao dịch cặp mới.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Chúng tôi muốn địa chỉ của sàn giao dịch mới là xác định, vì vậy nó có thể được tính toán trước ngoài chuỗi (điều này có thể hữu ích cho [các giao dịch lớp 2](/developers/docs/scaling/)).
Để làm điều này, chúng ta cần có một thứ tự nhất quán của các địa chỉ token, bất kể thứ tự chúng ta đã nhận chúng, vì vậy chúng ta sắp xếp chúng ở đây.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
```

Các pool thanh khoản lớn tốt hơn các pool nhỏ, vì chúng có giá ổn định hơn. Chúng tôi không muốn có nhiều hơn một pool thanh khoản cho mỗi cặp token. Nếu đã có một sàn giao dịch, không cần phải tạo một sàn giao dịch khác cho cùng một cặp.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Để tạo một hợp đồng mới, chúng ta cần mã tạo ra nó (cả hàm khởi tạo và mã ghi vào bộ nhớ bytecode EVM của hợp đồng thực tế). Thông thường trong Solidity, chúng ta chỉ sử dụng `addr = new <tên hợp đồng>(<tham số hàm khởi tạo>)` và trình biên dịch sẽ lo mọi thứ cho chúng ta, nhưng để có địa chỉ hợp đồng xác định, chúng ta cần sử dụng [opcode CREATE2](https://eips.ethereum.org/EIPS/eip-1014).
Khi mã này được viết, opcode đó chưa được Solidity hỗ trợ, vì vậy cần phải lấy mã thủ công. Đây không còn là vấn đề nữa, vì [Solidity hiện hỗ trợ CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Khi một opcode chưa được Solidity hỗ trợ, chúng ta có thể gọi nó bằng cách sử dụng [hợp ngữ nội tuyến](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Gọi hàm `initialize` để cho sàn giao dịch mới biết nó trao đổi hai token nào.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
```

Lưu thông tin cặp mới vào các biến trạng thái và phát ra một sự kiện để thông báo cho thế giới về sàn giao dịch cặp mới.

```solidity
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
```

Hai hàm này cho phép `feeSetter` kiểm soát người nhận phí (nếu có) và thay đổi `feeSetter` thành một địa chỉ mới.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[Hợp đồng này](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) triển khai token thanh khoản ERC-20. Nó tương tự như [hợp đồng OpenZeppelin ERC-20](/developers/tutorials/erc20-annotated-code), vì vậy tôi sẽ chỉ giải thích phần khác biệt, đó là chức năng `permit`.

Các giao dịch trên Ethereum tốn ether (ETH), tương đương với tiền thật. Nếu bạn có token ERC-20 nhưng không có ETH, bạn không thể gửi giao dịch, vì vậy bạn không thể làm gì với chúng. Một giải pháp để tránh vấn đề này là [giao dịch meta](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
Chủ sở hữu token ký một giao dịch cho phép người khác rút token ngoài chuỗi và gửi nó qua Internet cho người nhận. Người nhận, người có ETH, sau đó gửi giấy phép thay mặt cho chủ sở hữu.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Hàm băm này là [mã định danh cho loại giao dịch](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). Loại duy nhất chúng tôi hỗ trợ ở đây là `Permit` với các tham số này.

```solidity
    mapping(address => uint) public nonces;
```

Việc người nhận giả mạo chữ ký số là không khả thi. Tuy nhiên, việc gửi cùng một giao dịch hai lần là chuyện nhỏ (đây là một dạng [tấn công phát lại](https://wikipedia.org/wiki/Replay_attack)). Để ngăn chặn điều này, chúng tôi sử dụng [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Nếu nonce của `Permit` mới không phải là số lớn hơn một so với số cuối cùng được sử dụng, chúng tôi cho rằng nó không hợp lệ.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Đây là mã để truy xuất [mã định danh chuỗi](https://chainid.network/). Nó sử dụng một phương ngữ hợp ngữ EVM được gọi là [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Lưu ý rằng trong phiên bản hiện tại của Yul, bạn phải sử dụng `chainid()`, không phải `chainid`.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }
```

Tính toán [bộ phân tách miền](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) cho EIP-712.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

Đây là hàm thực hiện các quyền. Nó nhận các trường có liên quan làm tham số và ba giá trị vô hướng cho [chữ ký](https://yos.io/2018/11/16/ethereum-signatures/) (v, r và s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

Không chấp nhận các giao dịch sau thời hạn.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` là thông điệp chúng tôi mong đợi sẽ nhận được. Chúng tôi biết nonce phải là gì, vì vậy chúng tôi không cần phải lấy nó làm tham số.

Thuật toán chữ ký Ethereum mong đợi nhận được 256 bit để ký, vì vậy chúng tôi sử dụng hàm băm `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Từ thông báo tóm tắt và chữ ký, chúng ta có thể lấy địa chỉ đã ký nó bằng cách sử dụng [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Nếu mọi thứ đều ổn, hãy coi đây là [một sự chấp thuận ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## Các hợp đồng ngoại vi {#periphery-contracts}

Các hợp đồng ngoại vi là Giao diện Lập trình Ứng dụng (API) cho Uniswap. Chúng có sẵn cho các lệnh gọi bên ngoài, từ các hợp đồng khác hoặc các ứng dụng phi tập trung. Bạn có thể gọi trực tiếp các hợp đồng lõi, nhưng điều đó phức tạp hơn và bạn có thể mất giá trị nếu mắc lỗi. Các hợp đồng lõi chỉ chứa các bài kiểm tra để đảm bảo chúng không bị gian lận, không phải là các kiểm tra hợp lý cho bất kỳ ai khác. Những điều đó nằm ở ngoại vi để chúng có thể được cập nhật khi cần.

### UniswapV2Router01.sol {#UniswapV2Router01}

[Hợp đồng này](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) có vấn đề và [không nên được sử dụng nữa](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). May mắn thay, các hợp đồng ngoại vi là không trạng thái và không nắm giữ bất kỳ tài sản nào, vì vậy thật dễ dàng để ngừng sử dụng nó và đề nghị mọi người sử dụng thay thế, `UniswapV2Router02`.

### UniswapV2Router02.sol {#UniswapV2Router02}

Trong hầu hết các trường hợp, bạn sẽ sử dụng Uniswap thông qua [hợp đồng này](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol).
Bạn có thể xem cách sử dụng nó [ở đây](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02).

```solidity
pragma solidity =0.6.6;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

import './interfaces/IUniswapV2Router02.sol';
import './libraries/UniswapV2Library.sol';
import './libraries/SafeMath.sol';
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';
```

Hầu hết những điều này chúng tôi đã gặp trước đây, hoặc khá rõ ràng. Ngoại lệ duy nhất là `IWETH.sol`. Uniswap v2 cho phép trao đổi bất kỳ cặp token ERC-20 nào, nhưng bản thân ether (ETH) không phải là token ERC-20. Nó có trước tiêu chuẩn và được chuyển bằng các cơ chế duy nhất. Để cho phép sử dụng ETH trong các hợp đồng áp dụng cho các token ERC-20, mọi người đã nghĩ ra hợp đồng [ether được bọc (WETH)](https://weth.tkn.eth.limo/). Bạn gửi ETH cho hợp đồng này, và nó sẽ đúc cho bạn một lượng WETH tương đương. Hoặc bạn có thể đốt WETH và nhận lại ETH.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Bộ định tuyến cần biết factory nào để sử dụng và đối với các giao dịch yêu cầu WETH, hợp đồng WETH nào để sử dụng. Các giá trị này là [không thể thay đổi](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), có nghĩa là chúng chỉ có thể được đặt trong hàm khởi tạo. Điều này mang lại cho người dùng sự tự tin rằng không ai có thể thay đổi chúng để trỏ đến các hợp đồng kém trung thực hơn.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Bộ điều chỉnh này đảm bảo rằng các giao dịch có giới hạn thời gian ("làm X trước thời gian Y nếu bạn có thể") không xảy ra sau giới hạn thời gian của chúng.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Hàm khởi tạo chỉ đặt các biến trạng thái không thể thay đổi.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // chỉ chấp nhận ETH thông qua dự phòng từ hợp đồng WETH
    }
```

Hàm này được gọi khi chúng tôi đổi token từ hợp đồng WETH trở lại ETH. Chỉ hợp đồng WETH mà chúng tôi sử dụng mới được phép làm điều đó.

#### Thêm thanh khoản {#add-liquidity}

Các hàm này thêm token vào sàn giao dịch cặp, làm tăng pool thanh khoản.

```solidity

    // **** THÊM THANH KHOẢN ****
    function _addLiquidity(
```

Hàm này được sử dụng để tính toán lượng token A và B cần được gửi vào sàn giao dịch cặp.

```solidity
        address tokenA,
        address tokenB,
```

Đây là các địa chỉ của hợp đồng token ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Đây là số tiền mà nhà cung cấp thanh khoản muốn gửi. Chúng cũng là số tiền tối đa của A và B sẽ được gửi.

```solidity
        uint amountAMin,
        uint amountBMin
```

Đây là số tiền tối thiểu có thể chấp nhận để gửi. Nếu giao dịch không thể diễn ra với số tiền này hoặc nhiều hơn, hãy hoàn nguyên khỏi nó. Nếu bạn không muốn tính năng này, chỉ cần chỉ định không.

Các nhà cung cấp thanh khoản thường chỉ định một mức tối thiểu, vì họ muốn giới hạn giao dịch ở một tỷ giá hối đoái gần với tỷ giá hiện tại. Nếu tỷ giá hối đoái biến động quá nhiều, điều đó có thể có nghĩa là tin tức làm thay đổi các giá trị cơ bản và họ muốn quyết định thủ công phải làm gì.

Ví dụ: hãy tưởng tượng một trường hợp trong đó tỷ giá hối đoái là một-một và nhà cung cấp thanh khoản chỉ định các giá trị này:

| Thông số       | Giá trị |
| -------------- | ------: |
| amountADesired |    1000 |
| amountBDesired |    1000 |
| amountAMin     |     900 |
| amountBMin     |     800 |

Miễn là tỷ giá hối đoái nằm trong khoảng từ 0,9 đến 1,25, giao dịch sẽ diễn ra. Nếu tỷ giá hối đoái vượt ra ngoài phạm vi đó, giao dịch sẽ bị hủy.

Lý do cho sự phòng ngừa này là các giao dịch không diễn ra ngay lập tức, bạn gửi chúng và cuối cùng một người xác thực sẽ đưa chúng vào một khối (trừ khi giá gas của bạn rất thấp, trong trường hợp đó bạn sẽ cần gửi một giao dịch khác có cùng nonce và giá gas cao hơn để ghi đè lên nó). Bạn không thể kiểm soát những gì xảy ra trong khoảng thời gian giữa việc gửi và đưa vào.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

Hàm trả về số tiền mà nhà cung cấp thanh khoản nên gửi để có tỷ lệ bằng với tỷ lệ hiện tại giữa các khoản dự trữ.

```solidity
        // tạo cặp nếu nó chưa tồn tại
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Nếu chưa có sàn giao dịch nào cho cặp token này, hãy tạo nó.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Lấy các khoản dự trữ hiện tại trong cặp.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Nếu các khoản dự trữ hiện tại trống thì đây là một sàn giao dịch cặp mới. Số tiền sẽ được gửi phải giống hệt với số tiền mà nhà cung cấp thanh khoản muốn cung cấp.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Nếu chúng ta cần xem số tiền sẽ là bao nhiêu, chúng ta sẽ lấy số tiền tối ưu bằng cách sử dụng [hàm này](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Chúng tôi muốn có cùng tỷ lệ với các khoản dự trữ hiện tại.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Nếu `amountBOptimal` nhỏ hơn số tiền mà nhà cung cấp thanh khoản muốn gửi, điều đó có nghĩa là token B hiện có giá trị hơn so với suy nghĩ của người gửi thanh khoản, vì vậy cần một số tiền nhỏ hơn.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Nếu lượng B tối ưu nhiều hơn lượng B mong muốn, điều đó có nghĩa là các token B hiện có giá trị thấp hơn so với suy nghĩ của người gửi thanh khoản, vì vậy cần một lượng cao hơn. Tuy nhiên, số tiền mong muốn là tối đa, vì vậy chúng tôi không thể làm điều đó. Thay vào đó, chúng tôi tính toán số lượng token A tối ưu cho lượng token B mong muốn.

Kết hợp tất cả lại, chúng ta có được biểu đồ này. Giả sử bạn đang cố gắng gửi một nghìn token A (đường màu xanh) và một nghìn token B (đường màu đỏ). Trục x là tỷ giá hối đoái, A/B. Nếu x=1, chúng có giá trị bằng nhau và bạn gửi một nghìn mỗi loại. Nếu x=2, A có giá trị gấp đôi B (bạn nhận được hai token B cho mỗi token A) vì vậy bạn gửi một nghìn token B, nhưng chỉ 500 token A. Nếu x=0,5, tình hình đảo ngược, một nghìn token A và năm trăm token B.

![Biểu đồ](liquidityProviderDeposit.png)

Bạn có thể gửi thanh khoản trực tiếp vào hợp đồng lõi (sử dụng [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), nhưng hợp đồng lõi chỉ kiểm tra xem nó có bị gian lận hay không, vì vậy bạn có nguy cơ mất giá trị nếu tỷ giá hối đoái thay đổi giữa thời điểm bạn gửi giao dịch và thời điểm nó được thực hiện. Nếu bạn sử dụng hợp đồng ngoại vi, nó sẽ tính ra số tiền bạn nên gửi và gửi ngay lập tức, vì vậy tỷ giá hối đoái không thay đổi và bạn không mất gì cả.

```solidity
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
```

Hàm này có thể được gọi bằng một giao dịch để gửi thanh khoản. Hầu hết các tham số giống như trong `_addLiquidity` ở trên, với hai ngoại lệ:

. `to` là địa chỉ nhận các token thanh khoản mới được đúc để thể hiện phần của nhà cung cấp thanh khoản trong pool
. `deadline` là giới hạn thời gian của giao dịch

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Chúng tôi tính toán số tiền thực sự sẽ gửi và sau đó tìm địa chỉ của pool thanh khoản. Để tiết kiệm gas, chúng tôi không làm điều này bằng cách hỏi factory, mà sử dụng hàm thư viện `pairFor` (xem bên dưới trong các thư viện)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Chuyển đúng số lượng token từ người dùng vào sàn giao dịch cặp.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
```

Đổi lại, cung cấp cho địa chỉ `to` các token thanh khoản để sở hữu một phần pool. Hàm `mint` của hợp đồng lõi xem nó có bao nhiêu token thừa (so với những gì nó có lần cuối thanh khoản thay đổi) và đúc thanh khoản tương ứng.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Khi một nhà cung cấp thanh khoản muốn cung cấp thanh khoản cho một sàn giao dịch cặp Token/ETH, có một vài khác biệt. Hợp đồng xử lý việc bọc ETH cho nhà cung cấp thanh khoản. Không cần phải chỉ định số lượng ETH người dùng muốn gửi, vì người dùng chỉ cần gửi chúng cùng với giao dịch (số tiền có sẵn trong `msg.value`).

```solidity
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external virtual override payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        (amountToken, amountETH) = _addLiquidity(
            token,
            WETH,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWETH(WETH).deposit{value: amountETH}();
        assert(IWETH(WETH).transfer(pair, amountETH));
```

Để gửi ETH, hợp đồng trước tiên bọc nó thành WETH và sau đó chuyển WETH vào cặp. Lưu ý rằng việc chuyển tiền được bọc trong một `assert`. Điều này có nghĩa là nếu việc chuyển tiền không thành công, lệnh gọi hợp đồng này cũng không thành công, và do đó việc bọc không thực sự xảy ra.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // refund dust eth, if any
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
```

Người dùng đã gửi ETH cho chúng tôi, vì vậy nếu có bất kỳ khoản thừa nào còn lại (vì token kia có giá trị thấp hơn so với suy nghĩ của người dùng), chúng tôi cần hoàn lại tiền.

#### Xóa thanh khoản {#remove-liquidity}

Các hàm này sẽ xóa thanh khoản và trả lại tiền cho nhà cung cấp thanh khoản.

```solidity
    // **** XÓA THANH KHOẢN ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
```

Trường hợp đơn giản nhất của việc xóa thanh khoản. Có một lượng tối thiểu của mỗi token mà nhà cung cấp thanh khoản đồng ý chấp nhận, và nó phải xảy ra trước thời hạn.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // gửi thanh khoản đến cặp
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

Hàm `burn` của hợp đồng lõi xử lý việc trả lại token cho người dùng.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Khi một hàm trả về nhiều giá trị, nhưng chúng ta chỉ quan tâm đến một số giá trị đó, đây là cách chúng ta chỉ lấy những giá trị đó. Nó rẻ hơn một chút về mặt gas so với việc đọc một giá trị và không bao giờ sử dụng nó.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Dịch số tiền từ cách hợp đồng lõi trả về chúng (token có địa chỉ thấp hơn trước) sang cách người dùng mong đợi chúng (tương ứng với `tokenA` và `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Việc thực hiện chuyển tiền trước rồi sau đó xác minh tính hợp pháp của nó là ổn, vì nếu không hợp pháp, chúng tôi sẽ hoàn nguyên tất cả các thay đổi trạng thái.

```solidity
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }
```

Việc xóa thanh khoản cho ETH gần như giống nhau, ngoại trừ việc chúng tôi nhận được các token WETH và sau đó đổi chúng lấy ETH để trả lại cho nhà cung cấp thanh khoản.

```solidity
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }


    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }
```

Các hàm này chuyển tiếp các giao dịch meta để cho phép người dùng không có ether rút tiền từ pool, sử dụng [cơ chế cho phép](#UniswapV2ERC20).

```solidity

    // **** XÓA THANH KHOẢN (hỗ trợ các token có phí chuyển) ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountETH) {
        (, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }

```

Hàm này có thể được sử dụng cho các token có phí chuyển hoặc lưu trữ. Khi một token có các khoản phí như vậy, chúng tôi không thể dựa vào hàm `removeLiquidity` để cho chúng tôi biết chúng tôi nhận lại được bao nhiêu token, vì vậy chúng tôi cần phải rút tiền trước và sau đó lấy số dư.

```solidity


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
```

Hàm cuối cùng kết hợp phí lưu trữ với các giao dịch meta.

#### Giao dịch {#trade}

```solidity
    // **** HOÁN ĐỔI ****
    // yêu cầu số tiền ban đầu đã được gửi đến cặp đầu tiên
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Hàm này thực hiện quá trình xử lý nội bộ cần thiết cho các hàm được hiển thị cho các nhà giao dịch.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Khi tôi đang viết bài này, có [388.160 token ERC-20](https://eth.blockscout.com/tokens). Nếu có một sàn giao dịch cặp cho mỗi cặp token, sẽ có hơn 150 tỷ sàn giao dịch cặp. Toàn bộ chuỗi, tại thời điểm này, [chỉ có 0,1% số lượng tài khoản đó](https://eth.blockscout.com/stats/accountsGrowth). Thay vào đó, các hàm hoán đổi hỗ trợ khái niệm về một đường dẫn. Một nhà giao dịch có thể đổi A lấy B, B lấy C và C lấy D, do đó không cần sàn giao dịch cặp A-D trực tiếp.

Giá trên các thị trường này có xu hướng được đồng bộ hóa, vì khi chúng không đồng bộ sẽ tạo ra cơ hội kinh doanh chênh lệch giá. Ví dụ, hãy tưởng tượng ba token A, B và C. Có ba sàn giao dịch cặp, một sàn cho mỗi cặp.

1. Tình hình ban đầu
2. Một nhà giao dịch bán 24,695 token A và nhận được 25,305 token B.
3. Nhà giao dịch bán 24,695 token B để lấy 25,305 token C, giữ lại khoảng 0,61 token B làm lợi nhuận.
4. Sau đó, nhà giao dịch bán 24,695 token C để lấy 25,305 token A, giữ lại khoảng 0,61 token C làm lợi nhuận. Nhà giao dịch cũng có thêm 0,61 token A (25,305 mà nhà giao dịch có được, trừ đi khoản đầu tư ban đầu là 24,695).

| Bước | Sàn giao dịch A-B                                           | Sàn giao dịch B-C                                           | Sàn giao dịch A-C                                           |
| ---- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| 1    | A:1000 B:1050 A/B=1,05      | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 2    | A:1024,695 B:1024,695 A/B=1 | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 3    | A:1024,695 B:1024,695 A/B=1 | B:1024,695 C:1024,695 B/C=1 | A:1050 C:1000 C/A=1,05      |
| 4    | A:1024,695 B:1024,695 A/B=1 | B:1024,695 C:1024,695 B/C=1 | A:1024,695 C:1024,695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Lấy cặp chúng ta đang xử lý, sắp xếp nó (để sử dụng với cặp) và lấy số tiền đầu ra dự kiến.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Lấy số tiền đầu ra dự kiến, được sắp xếp theo cách mà sàn giao dịch cặp mong đợi.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Đây có phải là sàn giao dịch cuối cùng không? Nếu vậy, hãy gửi các token nhận được cho giao dịch đến đích. Nếu không, hãy gửi nó đến sàn giao dịch cặp tiếp theo.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Thực sự gọi sàn giao dịch cặp để hoán đổi các token. Chúng tôi không cần một lệnh gọi lại để được thông báo về sàn giao dịch, vì vậy chúng tôi không gửi bất kỳ byte nào trong trường đó.

```solidity
    function swapExactTokensForTokens(
```

Hàm này được các nhà giao dịch sử dụng trực tiếp để hoán đổi một token này lấy một token khác.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Tham số này chứa các địa chỉ của các hợp đồng ERC-20. Như đã giải thích ở trên, đây là một mảng vì bạn có thể cần phải đi qua một số sàn giao dịch cặp để đi từ tài sản bạn có đến tài sản bạn muốn.

Một tham số hàm trong Solidity có thể được lưu trữ trong `memory` hoặc `calldata`. Nếu hàm là một điểm vào của hợp đồng, được gọi trực tiếp từ người dùng (sử dụng một giao dịch) hoặc từ một hợp đồng khác, thì giá trị của tham số có thể được lấy trực tiếp từ dữ liệu cuộc gọi. Nếu hàm được gọi nội bộ, như `_swap` ở trên, thì các tham số phải được lưu trữ trong `memory`. Từ góc độ của hợp đồng được gọi, `calldata` là chỉ đọc.

Với các loại vô hướng như `uint` hoặc `address`, trình biên dịch sẽ xử lý việc lựa chọn bộ nhớ cho chúng ta, nhưng với các mảng, dài hơn và tốn kém hơn, chúng ta chỉ định loại bộ nhớ sẽ được sử dụng.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Các giá trị trả về luôn được trả về trong bộ nhớ.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Tính toán số tiền sẽ được mua trong mỗi lần hoán đổi. Nếu kết quả nhỏ hơn mức tối thiểu mà nhà giao dịch sẵn sàng chấp nhận, hãy hoàn nguyên giao dịch.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Cuối cùng, chuyển token ERC-20 ban đầu đến tài khoản cho sàn giao dịch cặp đầu tiên và gọi `_swap`. Tất cả điều này đang xảy ra trong cùng một giao dịch, vì vậy sàn giao dịch cặp biết rằng bất kỳ token không mong muốn nào cũng là một phần của lần chuyển khoản này.

```solidity
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Hàm trước đó, `swapTokensForTokens`, cho phép một nhà giao dịch chỉ định một số lượng token đầu vào chính xác mà anh ta sẵn sàng cung cấp và số lượng token đầu ra tối thiểu mà anh ta sẵn sàng nhận lại. Hàm này thực hiện hoán đổi ngược lại, nó cho phép một nhà giao dịch chỉ định số lượng token đầu ra mà anh ta muốn và số lượng token đầu vào tối đa mà anh ta sẵn sàng trả cho chúng.

Trong cả hai trường hợp, nhà giao dịch phải cấp cho hợp đồng ngoại vi này một khoản phụ cấp trước để cho phép nó chuyển chúng.

```solidity
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }


    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }



    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }


    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // refund dust eth, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Bốn biến thể này đều liên quan đến giao dịch giữa ETH và token. Sự khác biệt duy nhất là chúng ta hoặc nhận ETH từ nhà giao dịch và sử dụng nó để đúc WETH, hoặc chúng ta nhận WETH từ sàn giao dịch cuối cùng trong đường dẫn và đốt nó, gửi lại cho nhà giao dịch ETH thu được.

```solidity
    // **** HOÁN ĐỔI (hỗ trợ token phí-khi-chuyển) ****
    // yêu cầu số tiền ban đầu đã được gửi đến cặp đầu tiên
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Đây là hàm nội bộ để hoán đổi các token có phí chuyển khoản hoặc phí lưu trữ để giải quyết ([vấn đề này](https://github.com/Uniswap/uniswap-interface/issues/835)).

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // phạm vi để tránh lỗi stack quá sâu
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

Do phí chuyển khoản, chúng ta không thể dựa vào hàm `getAmountsOut` để cho chúng ta biết chúng ta nhận được bao nhiêu từ mỗi lần chuyển khoản (theo cách chúng ta làm trước khi gọi `_swap` ban đầu). Thay vào đó, chúng ta phải chuyển khoản trước rồi mới xem chúng ta nhận lại được bao nhiêu token.

Lưu ý: Về lý thuyết, chúng ta có thể chỉ cần sử dụng hàm này thay vì `_swap`, nhưng trong một số trường hợp nhất định (ví dụ: nếu giao dịch chuyển khoản cuối cùng bị hoàn nguyên vì không có đủ ở cuối để đáp ứng mức tối thiểu bắt buộc), điều đó sẽ tốn nhiều gas hơn. Các token có phí chuyển khoản khá hiếm, vì vậy mặc dù chúng ta cần phải đáp ứng chúng, nhưng không cần tất cả các lần hoán đổi đều phải giả định rằng chúng đi qua ít nhất một trong số chúng.

```solidity
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }


    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        ensure(deadline)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        uint amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn));
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);
    }
```

Đây là những biến thể tương tự được sử dụng cho các token thông thường, nhưng thay vào đó chúng gọi `_swapSupportingFeeOnTransferTokens`.

```solidity
    // **** CÁC HÀM THƯ VIỆN ****
    function quote(uint amountA, uint reserveA, uint reserveB) public pure virtual override returns (uint amountB) {
        return UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountOut)
    {
        return UniswapV2Library.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountIn)
    {
        return UniswapV2Library.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsIn(factory, amountOut, path);
    }
}
```

Các hàm này chỉ là các proxy gọi các [hàm UniswapV2Library](#uniswapV2library).

### UniswapV2Migrator.sol {#UniswapV2Migrator}

Hợp đồng này được sử dụng để di chuyển các sàn giao dịch từ v1 cũ sang v2. Bây giờ chúng đã được di chuyển, nó không còn phù hợp nữa.

## Các thư viện {#libraries}

Thư viện [SafeMath library](https://docs.openzeppelin.com/contracts/2.x/api/math) được ghi chép đầy đủ, vì vậy không cần phải ghi chép ở đây.

### Math {#Math}

Thư viện này chứa một số hàm toán học thường không cần thiết trong mã Solidity, vì vậy chúng không phải là một phần của ngôn ngữ.

```solidity
pragma solidity =0.5.16;

// một thư viện để thực hiện các phép toán khác nhau

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // phương pháp babylonian (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Bắt đầu với x là một ước tính cao hơn căn bậc hai (đó là lý do chúng ta cần coi 1-3 là các trường hợp đặc biệt).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Lấy một ước tính gần hơn, trung bình của ước tính trước đó và số mà chúng ta đang cố gắng tìm căn bậc hai chia cho ước tính trước đó. Lặp lại cho đến khi ước tính mới không thấp hơn ước tính hiện có. Để biết thêm chi tiết, [xem tại đây](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Chúng ta sẽ không bao giờ cần căn bậc hai của số không. Căn bậc hai của một, hai và ba là xấp xỉ một (chúng ta sử dụng số nguyên, vì vậy chúng ta bỏ qua phần phân số).

```solidity
        }
    }
}
```

### Phân số dấu phẩy tĩnh (UQ112x112) {#FixedPoint}

Thư viện này xử lý các phân số, thường không phải là một phần của số học Ethereum. Nó thực hiện điều này bằng cách mã hóa số _x_ thành _x\*2^112_. Điều này cho phép chúng ta sử dụng các mã vận hành cộng và trừ ban đầu mà không cần thay đổi.

```solidity
pragma solidity =0.5.16;

// một thư viện để xử lý các số dấu phẩy tĩnh nhị phân (https://wikipedia.org/wiki/Q_(number_format))

// phạm vi: [0, 2**112 - 1]
// độ phân giải: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` là mã hóa cho một.

```solidity
    // mã hóa một uint112 thành một UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // không bao giờ tràn
    }
```

Vì y là `uint112`, nên giá trị lớn nhất của nó có thể là 2^112-1. Số đó vẫn có thể được mã hóa thành `UQ112x112`.

```solidity
    // chia một UQ112x112 cho một uint112, trả về một UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Nếu chúng ta chia hai giá trị `UQ112x112`, kết quả sẽ không còn được nhân với 2^112. Vì vậy, thay vào đó, chúng ta lấy một số nguyên cho mẫu số. Chúng ta sẽ cần sử dụng một thủ thuật tương tự để thực hiện phép nhân, nhưng chúng ta không cần phải thực hiện phép nhân các giá trị `UQ112x112`.

### UniswapV2Library {#uniswapV2library}

Thư viện này chỉ được sử dụng bởi các hợp đồng ngoại vi

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // trả về các địa chỉ token đã được sắp xếp, được sử dụng để xử lý các giá trị trả về từ các cặp được sắp xếp theo thứ tự này
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Sắp xếp hai token theo địa chỉ, để chúng ta có thể lấy địa chỉ của sàn giao dịch cặp cho chúng. Điều này là cần thiết bởi vì nếu không chúng ta sẽ có hai khả năng, một cho các tham số A,B và một cho các tham số B,A, dẫn đến hai sàn giao dịch thay vì một.

```solidity
    // tính toán địa chỉ CREATE2 cho một cặp mà không thực hiện bất kỳ lệnh gọi bên ngoài nào
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // hàm băm mã init
            ))));
    }
```

Hàm này tính toán địa chỉ của sàn giao dịch cặp cho hai token. Hợp đồng này được tạo bằng cách sử dụng [mã vận hành CREATE2](https://eips.ethereum.org/EIPS/eip-1014), vì vậy chúng ta có thể tính toán địa chỉ bằng cùng một thuật toán nếu chúng ta biết các tham số mà nó sử dụng. Điều này rẻ hơn nhiều so với việc hỏi nhà máy, và

```solidity
    // tìm nạp và sắp xếp các khoản dự trữ cho một cặp
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Hàm này trả về các khoản dự trữ của hai token mà sàn giao dịch cặp có. Lưu ý rằng nó có thể nhận các token theo một trong hai thứ tự và sắp xếp chúng để sử dụng nội bộ.

```solidity
    // cho một lượng tài sản nhất định và các khoản dự trữ cặp, trả về một lượng tương đương của tài sản kia
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Hàm này cho bạn biết số lượng token B bạn sẽ nhận được để đổi lấy token A nếu không có phí liên quan. Tính toán này có tính đến việc chuyển khoản làm thay đổi tỷ giá hối đoái.

```solidity
    // cho một lượng đầu vào của một tài sản và các khoản dự trữ cặp, trả về lượng đầu ra tối đa của tài sản kia
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

Hàm `quote` ở trên hoạt động rất tốt nếu không có phí để sử dụng sàn giao dịch cặp. Tuy nhiên, nếu có phí giao dịch 0,3% thì số tiền bạn thực sự nhận được sẽ thấp hơn. Hàm này tính toán số tiền sau khi trừ phí giao dịch.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity không xử lý các phân số một cách nguyên bản, vì vậy chúng ta không thể chỉ nhân số tiền ra với 0,997. Thay vào đó, chúng ta nhân tử số với 997 và mẫu số với 1000, đạt được hiệu quả tương tự.

```solidity
    // cho một lượng đầu ra của một tài sản và các khoản dự trữ cặp, trả về một lượng đầu vào cần thiết của tài sản kia
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Hàm này thực hiện gần như điều tương tự, nhưng nó nhận được số lượng đầu ra và cung cấp đầu vào.

```solidity

    // thực hiện các tính toán getAmountOut theo chuỗi trên bất kỳ số lượng cặp nào
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // thực hiện các tính toán getAmountIn theo chuỗi trên bất kỳ số lượng cặp nào
    function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }
}
```

Hai hàm này xử lý việc xác định các giá trị khi cần phải đi qua một số sàn giao dịch cặp.

### Trình trợ giúp chuyển khoản {#transfer-helper}

[Thư viện này](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) bổ sung các kiểm tra thành công xung quanh các lần chuyển khoản ERC-20 và Ethereum để xử lý việc hoàn nguyên và trả về giá trị `false` theo cùng một cách.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// các phương thức trợ giúp để tương tác với các token ERC20 và gửi ETH không nhất quán trả về true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

Chúng ta có thể gọi một hợp đồng khác theo một trong hai cách:

- Sử dụng định nghĩa giao diện để tạo lệnh gọi hàm
- Sử dụng [giao diện nhị phân ứng dụng (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) \"thủ công\" để tạo lệnh gọi. Đây là những gì tác giả của mã đã quyết định làm.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Vì mục đích tương thích ngược với token được tạo trước tiêu chuẩn ERC-20, một lệnh gọi ERC-20 có thể thất bại bằng cách hoàn nguyên (trong trường hợp đó `success` là `false`) hoặc bằng cách thành công và trả về giá trị `false` (trong trường hợp đó có dữ liệu đầu ra, và nếu bạn giải mã nó dưới dạng một giá trị boolean, bạn sẽ nhận được `false`).

```solidity


    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }
```

Hàm này triển khai [chức năng chuyển khoản của ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), cho phép một tài khoản chi tiêu khoản phụ cấp do một tài khoản khác cung cấp.

```solidity

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }
```

Hàm này triển khai [chức năng transferFrom của ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), cho phép một tài khoản chi tiêu khoản phụ cấp do một tài khoản khác cung cấp.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Hàm này chuyển ether đến một tài khoản. Bất kỳ lệnh gọi nào đến một hợp đồng khác đều có thể cố gắng gửi ether. Bởi vì chúng ta không cần thực sự gọi bất kỳ hàm nào, chúng ta không gửi bất kỳ dữ liệu nào với lệnh gọi.

## Kết luận {#conclusion}

Đây là một bài viết dài khoảng 50 trang. Nếu bạn đã đọc đến đây, xin chúc mừng! Hy vọng đến bây giờ bạn đã hiểu những cân nhắc khi viết một ứng dụng thực tế (trái ngược với các chương trình mẫu ngắn) và có thể viết các hợp đồng tốt hơn cho các trường hợp sử dụng của riêng bạn.

Bây giờ hãy đi và viết một cái gì đó hữu ích và làm chúng tôi kinh ngạc.

[Xem thêm công việc của tôi tại đây](https://cryptodocguy.pro/).
