// 書籍名の取得
function getTitleEl() {
  // 通常、このIDで書籍のタイトルを取得できるはず
  const productTitleEl = document.getElementById("productTitle");
  if (productTitleEl) {
    return productTitleEl?.innerText.trim() ?? "";
  }

  //
  const ebooksProductTitleEl = document.getElementById("ebooksProductTitle");
  if (ebooksProductTitleEl) {
    return ebooksProductTitleEl?.innerText.trim() ?? "";
  }

  const ebooksTitleEl = document.getElementById("ebooksTitle"); // mobile
  if (ebooksTitleEl) {
    return ebooksTitleEl?.innerText.trim() ?? "";
  }

  const titleEl = document.getElementById("title");
  return titleEl?.innerText.trim() ?? "";
}

const title = getTitleEl();

// ASIN の取得
function getASIN() {
  const ASINIdEl = document.getElementById("ASIN");
  if (ASINIdEl) {
    return ASINIdEl.value;
  }
  const asin_0El = document.getElementsByName("ASIN.0")[0];
  if (asin_0El) {
    return asin_0El.value;
  }
  const asinIdEl = document.getElementById("asin");
  if (asinIdEl) {
    return asinIdEl.value;
  }
}
const asin = getASIN();

// 書影の取得
function getImageUrl() {
  // desktop
  const landingImageEl = document.getElementById("landingImage");
  if (landingImageEl) {
    return landingImageEl?.getAttribute("src") ?? "";
  }
  // 通常書籍 mobile
  const mainImageEl = document.getElementById("main-image");
  if (mainImageEl) {
    return mainImageEl?.getAttribute("src") ?? "";
  }
  // Kindle mobile
  const ebooksImgBlkFrontEl = document.getElementById("ebooksImgBlkFront");
  if (ebooksImgBlkFrontEl) {
    return ebooksImgBlkFrontEl?.getAttribute("src") ?? "";
  }
}

const coverUrl = getImageUrl();

// 著者情報の取得
function getAuthors() {
  const author_alinknormalEls = document.querySelectorAll(
    ".author .a-link-normal"
  );
  if (author_alinknormalEls.length > 0) {
    return Array.from(author_alinknormalEls).map((el) => el.innerText.trim());
  }
  const authorSection_authorNameEls = document.querySelectorAll(
    ".authorSection .authorName"
  );
  if (authorSection_authorNameEls.length > 0) {
    return Array.from(authorSection_authorNameEls).map((el) =>
      el.innerText.trim()
    );
  }
  return [];
}

const authors = getAuthors();

//登録情報欄を取得
function getDetailsList() {
  const detailBullets_feature_div = document.getElementById(
    "detailBullets_feature_div"
  );
  if (detailBullets_feature_div) {
    return detailBullets_feature_div.innerText.split("\n");
  }
  const product_description_iframe = document
    .getElementById("product-description-iframe")
    ?.contentWindow.document?.contentWindow.document?.getElementById(
      "detailBullets_feature_div"
    );
  if (product_description_iframe) {
    return product_description_iframe.innerText.split("\n");
  }

  const productDetails_techSpec_section_1 = document.querySelectorAll(
    "#productDetails_techSpec_section_1 tr"
  );
  if (productDetails_techSpec_section_1.length > 0) {
    return Array.from(productDetails_techSpec_section_1).map((el) =>
      el.innerText.trim()
    );
  }
  return [];
}

const detailsList = getDetailsList();

// 出版社情報の取得->以降の情報取得に使う
const publisher =
  document.querySelector(
    "#rpi-attribute-book_details-publisher > div.a-section.a-spacing-none.a-text-center.rpi-attribute-value > span"
  )?.innerText ??
  detailsList
    .find((t) => t.startsWith("出版社"))
    ?.match(/:[\s\t　]*(.+)[\s\t　]*\(.+\)/)[1]
    ?.trim();

// 出版日の取得
const publish_date =
  document.querySelector(
    "#rpi-attribute-book_details-publication_date > div.a-section.a-spacing-none.a-text-center.rpi-attribute-value > span"
  ).innerText ??
  detailsList
    .find((t) => t.startsWith("発売日"))
    ?.match(/:[\s\t　]*(.+)/)[1]
    ?.trim();

// ISBN の取得
const isbn =
  document.querySelector(
    "#rpi-attribute-book_details-isbn10 > div.a-section.a-spacing-none.a-text-center.rpi-attribute-value > span"
  )?.innerText ??
  detailsList
    .find((t) => t.startsWith("ISBN-10"))
    ?.match(/:[\s\t　]*(.+)/)[1]
    ?.trim() ??
  detailsList
    .find((t) => t.startsWith("ISBN-13"))
    ?.match(/:[\s\t　]*(.+)/)[1]
    ?.trim();

const linkLine = `[[${isbn ?? asin}|${title}]]`;
// 表示する内容
const lines = `---
aliases:
cssclasses:
permalink:
tags: ["literature/book"]
authors: [${authors.map((author) => `"[[${author}]]"`).join(",")}]
cover: ${coverUrl}
isbn: ${isbn ? `[[${isbn}]]` : ""}
publisher: ${publisher ? `"[[${publisher.replace("/", "-")}]]"` : ""}
publish_date: A${publish_date ? `${publish_date}` : ""}
read_at:
status: "unread"
url: https://amazon.jp/dp/${asin}
---

%%
[テンプレート](obsidian://advanced-uri?vault=notes&filepath=_templater%252Fbook.md)を編集する
%%

up: [[Literatures]]

![cover|100](${coverUrl})

%%
# 気になっている・知りたいこと

- 

# 要約
%%

# 目次

## XXX 章

%%
# 感想・学び・アクション
%%
`;

const insertElement = document.createElement("div");
insertElement.innerHTML = `<textarea style="height:500px;border-width:0.5rem;border-style:solid">${lines}</textarea>`;

const insertArea =
  document.getElementById("bookDescription_feature_div") ??
  document.getElementById("image-block") ??
  document.getElementById("ppd") ??
  document.body;
insertArea.prepend(insertElement);

function copyToClipboard(text) {
  const dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

copyToClipboard(linkLine);
