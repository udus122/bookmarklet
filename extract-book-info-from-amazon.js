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

// 書影の取得
const imageurl = document.getElementById("landingImage").getAttribute("src");

// 著者情報の取得
const authors = [...document.querySelectorAll(".author")].map((c) => {
  return c.innerText
    .replace(/\r?\n/g, "")
    .replace(/,/, "")
    .replace(/\(.+\)/, "")
    .replace(/ /g, "");
});

//登録情報欄を取得
let detail = document.getElementById("detailBullets_feature_div");
if (!detail) {
  const subdoc = document.getElementById("product-description-iframe")
    .contentWindow.document;
  detail = subdoc.getElementById("detailBullets_feature_div");
}

// 出版社情報の取得->以降の情報取得に使う
const publisher =
  document.querySelector(
    "#rpi-attribute-book_details-publisher > div.a-section.a-spacing-none.a-text-center.rpi-attribute-value > span"
  )?.innerText ??
  detail.innerText
    .split("\n")
    .find((t) => t.startsWith("出版社"))
    .match(/:[\s\t　]*(.+)[\s\t　]*\(.+\)/)[1]
    .trim();

// 出版日の取得
const publish_date =
  document.querySelector(
    "#rpi-attribute-book_details-publication_date > div.a-section.a-spacing-none.a-text-center.rpi-attribute-value > span"
  ).innerText ??
  detail.innerText
    .split("\n")
    .find((t) => t.startsWith("発売日"))
    ?.match(/:[\s\t　]*(.+)/)[1]
    ?.trim();

// ISBN の取得
const isbn =
  document.querySelector(
    "#rpi-attribute-book_details-isbn10 > div.a-section.a-spacing-none.a-text-center.rpi-attribute-value > span"
  )?.innerText ??
  detail.innerText
    .split("\n")
    .find((t) => t.startsWith("ISBN-10"))
    ?.match(/:[\s\t　]*(.+)/)[1]
    ?.trim() ??
  detail.innerText
    .split("\n")
    .find((t) => t.startsWith("ISBN-13"))
    ?.match(/:[\s\t　]*(.+)/)[1]
    ?.trim();

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
- [x] タイトルをエイリアスに設定する
- [x] Amazonのリンクを貼る(できればリッチリンクとして)
- [x] 書影を貼る
- [ ] ファイル名をISBNに設定する
- [ ] 著者をリンクする
- [ ] 出版社をリンクする
%%

- 著者: ${authors.map((author) => `[[${author}]]`).join(",")}
- 出版社: [[${publisher}]]
- 出版日: ${publish_date}
- ISBN: ${isbn}
- リンク: https://amazon.jp/dp/${asin}

## 読書メモ
`;

document.getElementById(
  "bookDescription_feature_div"
).innerHTML = `<textarea style="height:500px">${lines}</textarea>`;

function copyToClipboard(text) {
  const dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

copyToClipboard(`${isbn}|${title}`);
