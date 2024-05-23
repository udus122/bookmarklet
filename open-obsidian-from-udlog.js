window.open(
  "obsidian://open?vault=notes&file=" +
    location.href.replace("https://notes.udus.dev/", "").replace(/\+/g, " ")
);
