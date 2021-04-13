let isMobilNavigationShowing = false


document.getElementById('menuIconButton').addEventListener('click', e => {
    document.getElementById('nav-icon').classList.toggle('open')
    toggleMainMenuNavigation()
  })

document.getElementById('searchMenuButton').addEventListener('click', e => {
    e.currentTarget.children[0].style.fill = '#dbac2b' /* Primary yellow */
    toggleSearchMenu(e.currentTarget.children[0])
    document.getElementById('searchInput').focus()
  })


function toggleMainMenuNavigation() {
    const menu = document.getElementById('mainMenuNav')
    if (menu.style.transform === 'translateX(0%)') {
        menu.style.transform = `translateX(-140%)`
        document.body.style.overflow = 'auto'
        return
    }

    menu.style.transform = `translateX(0%)`
    document.body.style.overflow = 'hidden'
}


function toggleSearchMenu(buttonTarget) {
    const menu = document.getElementById('mobilSearchNav')
    // hidden - off
    if (menu.style.transform === 'translateY(0%)') {
        buttonTarget.style.fill = '#000'
        menu.style.transform = `translateY(140%)`
        document.body.style.overflow = 'auto'
        return
    }
    // Showing - on
    buttonTarget.style.fill = '#dbac2b'
    menu.style.transform = `translateY(0%)`
    document.body.style.overflow = 'hidden'
}

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

// Animate hover fancy image
const lakorBrandImage = document.getElementById('lakorBrandImage')
const revolutionBrandImage = document.getElementById('revolutionBrandImage')
const imageSeperatorLine = document.getElementById('imageSeperatorLine')

lakorBrandImage.addEventListener('mouseover', e => {
    console.log(e.currentTarget)
    revolutionBrandImage.style.clipPath =`polygon(100% 0, 55% 0, 36% 100%, 100% 100%)`
    imageSeperatorLine.style.transform = `translateX(11%) rotate(-70deg)`
})
lakorBrandImage.addEventListener('mouseleave', e => {
    revolutionBrandImage.style.clipPath =`polygon(100% 0, 35% 0, 16% 100%, 100% 100%)`
    imageSeperatorLine.style.transform = `translateX(-9%) rotate(-70deg)`
})

revolutionBrandImage.addEventListener('mouseover', e => {
    console.log(e.currentTarget)
    imageSeperatorLine.style.transform = `translateX(-29%) rotate(-70deg)`
})
revolutionBrandImage.addEventListener('mouseleave', e => {
    revolutionBrandImage.style.clipPath =`polygon(100% 0, 35% 0, 16% 100%, 100% 100%)`
    imageSeperatorLine.style.transform = `translateX(-9%) rotate(-70deg)`
})