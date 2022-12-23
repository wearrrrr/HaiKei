"use strict";

function showResult() {
  var x = document.getElementById("livesearch");
  $.post("https://cors.haikei.xyz/https://animefox.to/livesearch", {
    value: x.value
  }).done(function (data) {
    var list = document.getElementById("search-suggest").innerHTML = data;
  });
}