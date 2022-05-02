const sobreMi = document.getElementById('sobre_mi')
const escritos = document.getElementById('escritos')
const redes = document.getElementById('redes')
const header = document.getElementById('header')
const logo = document.getElementById('titulo')
const link_escrito = document.getElementById('link_escritos')
const link_mi = document.getElementById('link_mi')
const link_redes = document.getElementById('link_redes')

const scrollContainer = document.getElementById('escritos')

const scroller = new SweetScroll();

init();

window.addEventListener("onscroll", ()=>{console.log("scrolls")})

var g_containerInViewport;


function isInViewport(elem) {
    let distance = elem.getBoundingClientRect();
    return (
        distance.top < (window.innerHeight || document.documentElement.clientHeight) && distance.bottom > 0
    );
}

function changeColorLink(container,active){
    if(active){
        container.style = " color: #476B84;"  
    }else{
        container.style = " color:  #242F40;"
    }
}




document.addEventListener("scroll",  () => {
    isInViewport(sobreMi)? changeColorLink(link_mi,true): changeColorLink(link_mi,false)
    isInViewport(redes) && !isInViewport(escritos) ? changeColorLink(link_redes,true): changeColorLink(link_redes,false)
    if(isInViewport(escritos)  && !isInViewport(sobreMi)){
        header.style = 'background-color: #E5E5E5; height: 4rem; animation-name: header--animation; animation-duration: 1s;' 
        logo.style =  'display: none;'
        changeColorLink(link_escrito, true)
    } else{
        header.style= 'background-color: #F5F5F5;  height: 6rem; animation-name: header--animationIn; animation-duration: 1s;' 
        logo.style = ' width: 14.7rem; height: 4.6rem;'   
        changeColorLink(link_escrito, false)       
    }
})


link_escrito.addEventListener("click",()=>{
    scroller.toElement(escritos);
    document.querySelector('main').scrollLeft = 0   
})

link_mi.addEventListener("click",()=>{
    scroller.toElement(sobreMi);
    document.querySelector('main').scrollLeft = 0   
})

link_redes.addEventListener("click",()=>{
    scroller.toElement(redes);
    document.querySelector('main').scrollLeft = 4000   
})


function init(){
    setStickyContainersSize();
    bindEvents();
}

function bindEvents(){
    window.addEventListener("wheel", wheelHandler);        
}



function setStickyContainersSize(){
    document.querySelectorAll('.sticky-container').forEach(function(container){
        const stikyContainerHeight = container.querySelector('main').scrollWidth;
        container.setAttribute('style', 'height: ' + stikyContainerHeight + 'px');
    });
}



function wheelHandler(evt){
    
    const containerInViewPort = Array.from(document.querySelectorAll('.sticky-container')).filter(function(container){
        return isElementInViewport(container);
    })[0];


    

    function isElementInViewport (el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
    }
   
 

    if(!containerInViewPort){
        return;
    }

    var isPlaceHolderBelowTop = containerInViewPort.offsetTop < document.documentElement.scrollTop;
    var isPlaceHolderBelowBottom = containerInViewPort.offsetTop + containerInViewPort.offsetHeight > document.documentElement.scrollTop;
    let g_canScrollHorizontally = isPlaceHolderBelowTop && isPlaceHolderBelowBottom;
    if(g_canScrollHorizontally){
        containerInViewPort.querySelector('main').scrollLeft += evt.deltaY;
    }
}


