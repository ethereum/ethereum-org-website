---
title: Thêm video
description: Chính sách thêm video vào ethereum.org
lang: vi
---

# Thêm video {#adding-videos}

Thư viện [video của ethereum.org](/videos/) giới thiệu các video về Ethereum và hệ sinh thái Ethereum từ những nhà sáng tạo trong cộng đồng và các nguồn đáng tin cậy. Bất kỳ ai cũng có thể đề xuất thêm video.

## Chính sách niêm yết {#listing-policy}

Ethereum.org là một tài nguyên giáo dục trung lập. Thư viện video được tuyển chọn nhằm:

- **Giáo dục** người dùng về công nghệ, hệ sinh thái và cộng đồng Ethereum
- **Đảm bảo tính chính xác** trong nội dung kỹ thuật
- **Duy trì sự phù hợp** với cộng đồng Ethereum

Trang web không niêm yết các video chủ yếu quảng bá cho một sản phẩm, token hoặc dịch vụ thương mại cụ thể.

## Tiêu chí đưa vào {#criteria-for-inclusion}

### Yêu cầu bắt buộc {#must-haves}

- **Tập trung vào Ethereum** – Video phải chủ yếu nói về Ethereum, công nghệ, hệ sinh thái hoặc cộng đồng của nó. Các video về chủ đề chuỗi khối (blockchain) nói chung chỉ được chấp nhận nếu chúng hỗ trợ đáng kể hoặc liên quan đến một trang giáo dục trên trang web, hoặc có nhắc đến Ethereum.
- **Giá trị giáo dục** – Video nên dạy cho người xem điều gì đó về Ethereum, hoặc tôn vinh cộng đồng Ethereum toàn cầu. Nội dung quảng cáo hoặc tiếp thị sẽ không được chấp nhận.
- **Thông tin chính xác** – Nội dung kỹ thuật phải chính xác về mặt thực tế và được cập nhật. Các video lỗi thời về các tính năng đã bị loại bỏ có thể bị xóa.
- **Chất lượng sản xuất** – Video nên có chất lượng âm thanh và hình ảnh rõ ràng ở mức hợp lý.
- **Công khai** – Video phải được lưu trữ trên một tài nguyên mở hoặc nền tảng dễ tiếp cận như YouTube, và có thể truy cập miễn phí mà không yêu cầu trả phí (paywall) hoặc đăng ký.

### Điểm cộng {#nice-to-haves}

- **Có bản chép lời (transcript)** – Video có bản chép lời giúp cải thiện khả năng tiếp cận và SEO. Nếu bạn không có, đội ngũ ethereum.org có thể hỗ trợ tạo một bản.
- **Từ nguồn đáng tin cậy** – Nội dung từ các nhà giáo dục, nhà nghiên cứu và các nguồn đã được khẳng định uy tín sẽ được ưu tiên.
- **Có giá trị lâu dài** – Nội dung duy trì được sự phù hợp theo thời gian (evergreen) được ưu tiên hơn so với tài liệu có tính thời điểm.

## Cách thêm video {#how-to-add-a-video}

### Lựa chọn 1: Mở một issue {#open-an-issue}

Nếu bạn muốn đề xuất một video nhưng không muốn tự tạo tệp, hãy mở một issue trên GitHub với thông tin chi tiết về video và một người đóng góp có thể giúp bạn thêm nó.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_video.yaml">
  Đề xuất video
</ButtonLink>

### Lựa chọn 2: Mở một pull request {#open-a-pull-request}

Nếu bạn muốn tự mình thêm video, hãy làm theo các bước sau:

#### Bước 1: Tạo tệp video {#step-1}

Tạo một thư mục mới và tệp `index.md` tại:

```
public/content/videos/{your-video-slug}/index.md
```

Slug phải an toàn cho URL, viết thường và sử dụng dấu gạch ngang (ví dụ: `blockchain-101-visual-demo`).

#### Bước 2: Thêm frontmatter {#step-2}

Thêm YAML frontmatter sau vào tệp `index.md` của bạn:

```yaml
---
title: "Your Video Title"
description: "A brief 1–3 sentence summary of the video."
lang: en
youtubeId: "dQw4w9WgXcQ"
uploadDate: 2025-01-15
duration: "12:30"
educationLevel: beginner
topic:
  - "your-topic"
  - "another-topic"
format: explainer
author: Channel Name
---
```

**Tham chiếu trường:**

| Trường | Bắt buộc | Mô tả |
|---|---|---|
| `title` | Có | Tiêu đề video |
| `description` | Có | Tóm tắt 1–3 câu |
| `lang` | Có | Hiện tại luôn là `en` |
| `youtubeId` | Có | ID video YouTube (từ URL sau `v=`) |
| `uploadDate` | Có | Ngày tải lên ban đầu theo định dạng `YYYY-MM-DD` |
| `duration` | Có | Độ dài video dưới dạng `H:MM:SS` hoặc `M:SS` |
| `educationLevel` | Có | `beginner`, `intermediate`, hoặc `advanced` |
| `topic` | Có | Mảng các thẻ chủ đề (topic tags) để lọc thư viện |
| `format` | Có | `explainer`, `presentation`, `interview`, `tutorial`, hoặc `panel` |
| `author` | Có | Tên người sáng tạo hoặc kênh |
| `breadcrumb` | Không | Nhãn ngắn tùy chỉnh cho điều hướng breadcrumb |
| `customThumbnailUrl` | Không | URL hình thu nhỏ tùy chỉnh (mặc định là hình thu nhỏ của YouTube) |

#### Bước 3: Thêm bản chép lời (được khuyến nghị) {#step-3}

Bên dưới `---` của frontmatter, hãy thêm bản chép lời của video ở định dạng markdown:

```markdown
---
title: "..."
# ... phần còn lại của frontmatter
---

Một đoạn giới thiệu ngắn gọn về nội dung video.

### Tiêu đề phần (0:00)

Văn bản chép lời cho phần này...

### Phần tiếp theo (5:30)

Thêm văn bản chép lời...
```

Sử dụng các tiêu đề `###` kèm theo dấu thời gian để đánh dấu các phần chính. Điều này giúp bản chép lời dễ đọc lướt hơn và cải thiện SEO.

Nếu bạn không có bản chép lời, bạn có thể để trống phần thân (body) và đội ngũ sẽ tạo một bản.

#### Bước 4: Chọn thẻ chủ đề {#step-4}

Chọn các thẻ chủ đề phù hợp với các danh mục hiện có được sử dụng trong thư viện. Các danh mục hiện tại và thẻ của chúng bao gồm:

- **Cách Ethereum hoạt động**: `how-ethereum-works`, `consensus`, `blockchain`, `cryptography`, `accounts`, `ethereum`, `intro`, `transactions`, `pos`, `smart-contracts`
- **Nâng cấp mạng lưới**: `network-upgrades`, `upgrades`, `pectra`, `dencun`, `eip-4844`, `blobs`, `fusaka`
- **Lộ trình & Ưu tiên**: `roadmap-and-priorities`, `pbs`, `mev`
- **Mở rộng quy mô & Lớp 2**: `scaling-and-layer-2`, `scaling`, `layer-2`, `rollups`, `optimistic-rollups`, `zk-rollups`
- **Trường hợp sử dụng**: `use-cases`, `defi`, `finance`, `nfts`, `erc-721`, `erc-1155`, `lending`, `dapps`, `restaking`, `eigenlayer`, `dao`, `identity`, `desci`, `refi`
- **Quyền riêng tư & Bảo mật**: `privacy-and-security`, `privacy`, `authentication`
- **Câu chuyện cộng đồng**: `community-stories`, `contributing`, `translations`, `community`

Để đảm bảo video của bạn xuất hiện trong một kệ danh mục của thư viện, hãy bao gồm ít nhất một thẻ khóa danh mục (tên in đậm được viết dưới dạng kebab-case, ví dụ: `use-cases` hoặc `scaling-and-layer-2`). Các video không có thẻ danh mục được nhận diện sẽ chỉ xuất hiện trong chế độ xem "Tất cả" và kết quả tìm kiếm.

Bạn cũng có thể sử dụng các thẻ mới — chúng sẽ có sẵn cho các nhóm danh mục trong tương lai.

#### Bước 5: Gửi PR của bạn {#step-5}

Mở một pull request với các thay đổi của bạn vào nhánh `dev`. Đội ngũ sẽ xem xét nội dung bạn gửi và cung cấp phản hồi.

## Bảo trì {#maintenance}

Các video được niêm yết sẽ được xem xét định kỳ để đảm bảo chúng:

- Vẫn đáp ứng các tiêu chí niêm yết
- Chứa thông tin chính xác, cập nhật
- Có các liên kết lưu trữ/YouTube vẫn hoạt động

Nếu bạn nhận thấy sự cố với một video được niêm yết, hãy [tạo một issue](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) hoặc gửi email đến [website@ethereum.org](mailto:website@ethereum.org).

## Điều khoản sử dụng {#terms-of-use}

Vui lòng tham khảo [điều khoản sử dụng](/terms-of-use/) của ethereum.org. Thông tin trên ethereum.org được cung cấp chỉ nhằm mục đích thông tin chung.