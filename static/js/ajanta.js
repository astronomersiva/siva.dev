let ajantaImages=document.getElementsByClassName("ajanta"),htmlElement=document.getElementsByTagName("html")[0];for(let t of ajantaImages){let[e]=t.getElementsByClassName("pixelated"),[a]=t.getElementsByClassName("original"),s=e.getAttribute("data-src");if(a.onload=function(){e.classList.add("ajanta-hide"),a.classList.add("ajanta-show"),a.setAttribute("alt",e.getAttribute("alt"))},a.onerror=function(){a.src=e.getAttribute("data-src"),a.onerror=null},s){let t=!1,e=htmlElement.className.includes("webp"),n="";if(t&&!window.location.hostname.includes("127.0.0.1")){n="https://cdn.sivasubramanyam.me/unsafe",n=`${n}/${window.innerWidth<700?"700x":"1400x"}`;let t=window.location.hostname;t=t.startsWith("https")?t:"https://"+t,n=`${n}/filters:no_upscale()${e?":format(webp)":""}/${t}`}a.src=`${n}${s}`}}