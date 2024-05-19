/**
 * Shorten Amazon URL
 *
 * javascript:(function(url){s=document.createElement('script');s.src=url;document.body.appendChild(s);})('https://udus122.github.io/bookmarklet/shorten-amazon-url.js');
 *
 * <p>Amazon の商品ページの URL を短縮する。</p>
 */
const asin = document.getElementById("ASIN").value;
location.href = `http://amazon.jp/dp/${asin}`;
