const html = new XMLHttpRequest();

html.addEventListener("load", () => {
  console.log(html.response);
});
html.open("GET", "https://supersimplebackend.dev/");
html.send();
