const menuIcon = document.getElementById('toggleMenu')
let isMobilNavigationShowing = false

menuIcon.addEventListener('click', () => {
    toggleMenuNavgation()
})

function toggleMenuNavgation(show = false) {
    const mobilNav = document.getElementById('mobilNavigationToggle')
    const shadow = document.getElementById('shadowNav')
    isMobilNavigationShowing = !isMobilNavigationShowing
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