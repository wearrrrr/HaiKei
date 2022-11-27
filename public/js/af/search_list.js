function showResult() {
  var x = document.getElementById("livesearch");
  $.post("http://localhost:8081/https://animefox.to/livesearch", { value: x.value }).done(function (data) {
    var list = (document.getElementById("search-suggest").innerHTML = data);
  });
}
