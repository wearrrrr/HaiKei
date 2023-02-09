function copyAddr(addr) {
    navigator.clipboard.writeText(addr)
    Toastify({
        text: "Copied to clipboard!",
        duration: 3000,
        style: {
            background: "var(--dark-accent)",
            boxShadow: "none"
        },
    }).showToast();
}