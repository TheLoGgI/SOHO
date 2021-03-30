
// Create a timeline
// let tl = gsap.timeline({
//     // delay: 0.5,
//     // paused: false, // default is false
//     // repeat: 2, // number of repeats (-1 for infinite)
//     // repeatDelay: 1, // seconds between repeats
//     // repeatRefresh: true, // invalidates on each repeat
//     // yoyo: true, // if true > A-B-B-A, if false > A-B-A-B
//     defaults: { // children inherit these defaults
//         duration: 1,
//         ease: "none" 
//     },
//     // smoothChildTiming: true,
//     // autoRemoveChildren: true,
//     // onComplete: myFunc,
//     // other callbacks: 
//     // onStart, onUpdate, onRepeat, onReverseComplete
//     // Each callback has a params property as well
//     // i.e. onUpdateParams (Array)
// })

// console.log('tl: ', tl)

// tl.from(".btn", {duration: 1, x: 0, y: 0})
// tl.to(".btn", {duration: .5, width: '140px'})
// tl.to(".fa-cart-plus", {delay: .5,display: 'inline-block'})
// tl.to(".fa-cart-plus", {duration: 1, x: 0 })
//   .to("#id", {autoAlpha: 0} )
//   .to(elem, {duration: 1, backgroundColor: "red"})
//   .to([elem, elem2], {duration: 3, x: 100});

// const produktBuy = document.querySelector('.buy-product')
// produktBuy.addEventListener('mouseover', (e) => {
//     const shopIcon = produktBuy.children[0]
//     produktBuy.style.width =  '140px'
//     shopIcon.style.transition = 'all .4s ease 2s'
//     setTimeout(() => {
//         shopIcon.style.display = 'inline-block'
//         shopIcon.style.transform = 'translateX(0px)'
        
        
//     }, 100)
// })
// produktBuy.addEventListener('mouseleave', (e) => {
//     const shopIcon = produktBuy.children[0]
//     produktBuy.style.width =  '120px'
//     shopIcon.style.display = 'none'
//     shopIcon.style.transform = 'translateX(-200px)'
//     // shopIcon.style.transition = 'none'
// })
