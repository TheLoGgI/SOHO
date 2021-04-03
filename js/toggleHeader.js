const menuIcon = document.getElementById('toggleMenu')
let isMobilNavigationShowing = false

menuIcon.addEventListener('click', () => {
    toggleMenuNavgation()
})

function toggleMenuNavgation(show) {
    const mobilNav = document.getElementById('mobilNavigationToggle')
    const shadow = document.getElementById('shadowNav')
    isMobilNavigationShowing = show ?? !isMobilNavigationShowing // '??' Nullish coalescing operator - if not null or undefined use the show variable
    if (isMobilNavigationShowing) {
        mobilNav.style.transform = `translateX(20%)`
        shadow.style.transform = `translateX(0%)`
        return true
    } else {
        // Hides mobil navigation
        mobilNav.style.transform = `translateX(110%)`
        shadow.style.transform = `translateX(-100%)`
        return false
    }

}

window.addEventListener('resize', () => {

    const mobilNav = document.getElementById('mobilNavigationToggle')
    if (window.innerWidth >= 1200) {
        // mobilNav.style.transition = 'transform 0.3s ease-in-out 0s'
        mobilNav.style.transform = `translateX(0%)`
    } else {
        mobilNav.style.transition = 'all 0s ease 0s'
        mobilNav.style.transform = `translateX(110%)`
        
        // Prevents 1 tick animation
        setTimeout(() => {
            mobilNav.style.transition = 'transform 0.3s ease-in-out 0s'
        }, 0)
    }


})