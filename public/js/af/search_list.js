// Generic Debouncing function :D
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
    if (callNow) func.apply(context, args);
  }
}

document.getElementById('livesearch').addEventListener('keyup', (e) => {
    if (e.keyCode == 27) return
    debouncedPost()
})

function showResult() {
  var x = document.getElementById("livesearch");
  $.post("https://cors.haikei.xyz/https://animefox.to/livesearch", { value: x.value }).done(function (data) {
    let list = DOMPurify.sanitize(document.getElementById("search-suggest").innerHTML = data)
  });
}

// Define the debounced function
var debouncedPost = debounce(showResult, 300);