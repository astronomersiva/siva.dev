
let images=document.getElementsByTagName('img');for(let image of images){image.className=`${image.className}img-responsive center-block`;}
let font=document.createElement('link');font.type='text/css';font.rel='stylesheet';font.href='/static/font-awesome.selected/css/font-awesome.selected.css';let head=document.getElementsByTagName('head')[0];head.appendChild(font);