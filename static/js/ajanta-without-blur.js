let imagesInPost=document.getElementsByTagName("img");for(let t of imagesInPost){let e=t.getAttribute("data-src");e&&t.parentNode&&t.parentNode.classList&&!t.parentNode.classList.contains("ajanta")&&(t.src=e)}