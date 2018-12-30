function hideOnClickOutside(element) {
    const outsideClickListener = event => {
        if (!isVisible(element)) {
            removeClickListener();
        }
        else if (!element.contains(event.target)) { // or use: event.target.closest(selector) === null
            if (isVisible(element)) {
                element.style.display = 'none'
                removeClickListener()
            }
        }
    }

    const removeClickListener = () => {
        document.body.removeEventListener('click', outsideClickListener)
    }

    document.body.addEventListener('click', outsideClickListener)
}

const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length) // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js 
