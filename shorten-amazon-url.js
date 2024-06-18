/**
 * Shorten Amazon URL
 *
 * javascript:(function(url){s=document.createElement('script');s.src=url;document.body.appendChild(s);})('https://udus122.github.io/bookmarklet/shorten-amazon-url.js');
 *
 * <p>Amazon の商品ページの URL を短縮する。</p>
 */
const asin = getASIN();
const shortenUrl = `http://amazon.jp/dp/${asin}`;
copyToClipboard(shortenUrl);
location.href = shortenUrl;

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

function copyToClipboard(text) {
  const dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}
