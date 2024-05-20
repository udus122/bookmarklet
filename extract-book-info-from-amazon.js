// ref. https://scrapbox.io/obsidian/Get_book_information_from_Amazon

// 書籍名の取得
const productTitle = document.getElementById("productTitle");
const ebooksProductTitle = document.getElementById("ebooksProductTitle");
const title = productTitle
  ? productTitle.innerText.trim()
  : ebooksProductTitle.innerText.trim();

// ASIN の取得
const asinId = document.getElementById("ASIN");
const asin = asinId
  ? asinId.value
  : document.getElementsByName("ASIN.0")[0].value;

//登録情報欄を取得
let detail = document.getElementById("detailBullets_feature_div");
if (!detail) {
  const subdoc = document.getElementById("product-description-iframe")
    .contentWindow.document;
  detail = subdoc.getElementById("detailBullets_feature_div");
}

// 出版関係の情報を取得 (ここでは出版日付だけ)
const pubdata = detail.innerText.split(/\n/);
const publish_date = pubdata[2].slice(10); //出版日付

// 書籍のタイトルとリンク貼り

const url = `https://amazon.jp/dp/${asin}`;
const link = `[${title}](${url})`;

// 選択範囲を取得する
const isSelection = window.getSelection().toString();
const selection = isSelection
  ? `> [!quote] ${title}\n> ${isSelection
      .replace(/(\W+)( )(\W+)/g, "$1$3")
      .replace(/\n/g, "\n> ")}`
  : "";

// 書影の取得
// const imgBlkFront = document.getElementById("imgBlkFront");
// const ebooksImgBlkFront = document.getElementById("ebooksImgBlkFront");
//   const imageurl = imgBlkFront ? imgBlkFront.getAttribute("src") : ebooksImgBlkFront.getAttribute("src");
const imageurl = document.getElementById("landingImage").getAttribute("src");

// 著者情報の取得
const authors = [];
const viewAuthors = [];
document.querySelectorAll(".author").forEach((c) => {
  var at = c.innerText.replace(/\r?\n/g, "").replace(/,/, "");
  var pu = at.match(/\(.+\)/);
  var ct = at.replace(/\(.+\)/, "").replace(/ /g, "");
  authors.push(ct);
});

// 表示する内容
const lines = `---
author: [${authors.join(",")}]
aliases:
    - ${title}
---

%% [テンプレート](obsidian://advanced-uri?vault=notes&filepath=_templater%252Fbook.md)を編集する %%

![book cover](${imageurl})

# ${title}
%%
読書メモのチェックリスト
- [ ] ファイル名をISBNに設定する
- [x] タイトルをエイリアスに設定する
- [x] Amazonのリンクを貼る(できればリッチリンクとして)
- [x] 書影を貼る
- [ ] 著者をリンクする
- [ ] 出版社をリンクする
%%

- 著者: ${authors.map((author) => `[[${author}]]`).join(",")}
- 出版社:
- 出版日: ${publish_date}
- ISBN:
- リンク: ${url}

## 読書メモ
`;

setTimeout(() => navigator.clipboard.writeText(lines), 100);
