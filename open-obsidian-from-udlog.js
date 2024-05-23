/**
 * javascript:(function(url){s=document.createElement('script');s.src=url;document.body.appendChild(s);})('https://udus122.github.io/bookmarklet/open-obsidian-from-udlog.js');
 */
window.open(
  "obsidian://open?vault=notes&file=" +
    location.href.replace("https://notes.udus.dev/", "").replace(/\+/g, " ")
);
