let loadedFlag = false;
function copyAddr(addr) {
    navigator.clipboard.writeText(addr)
    // dynamically load css only the first time
    if (loadedFlag == false) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css";
        document.head.appendChild(link);
        loadedFlag = true;
    }
    
    Toastify({
        text: "Copied to clipboard!",
        duration: 3000,
        style: {
            background: "var(--dark-accent)",
            boxShadow: "none"
        },
        close: true,
    }).showToast();

}