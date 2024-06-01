function render(element, content) {
    const app = document.querySelector(element)
    if (app !== null) {
        app.innerHTML = content
    }
}