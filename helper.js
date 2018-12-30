function hideOnClickOutside(element) {
    const outsideClickListener = event => {
        if (!element.contains(event.target)) { // or use: event.target.closest(selector) === null
            element.style.display = 'none'
            removeClickListener()
        }
    }

    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener)
    }

    document.addEventListener('click', outsideClickListener)
}