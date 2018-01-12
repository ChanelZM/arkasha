/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var projectWrap = document.querySelector('.projects'),
        projectImages = document.querySelector('.project__images'),
        projects = document.querySelectorAll('.project'),
        phoneNumber = document.querySelector('#number'),
        email = document.querySelector('#email'),
        emailPhoto = document.querySelector('#email-photo'),
        phonePhoto = document.querySelector('#phone-photo');

    var timeoutImg,
        i;

    if("ontouchstart" in document.documentElement == false){
        for(i = 0; i < projects.length; i++){
            opacityImg(projectImages, '0');
            addHoverEventListeners(projects[i].querySelector('.project__link'), projectImages);
        }
        if(phoneNumber){
            opacityImg(phonePhoto, '0');
            addHoverEventListeners(phoneNumber, phonePhoto);
        }
        if(email){
            opacityImg(emailPhoto, '0');
            addHoverEventListeners(email, emailPhoto);
        }
    }

    function addHoverEventListeners(elem, img){
        elem.addEventListener('mouseover', function(){
            opacityImg(img, '1');
        });
        elem.addEventListener('focus', function(){
            opacityImg(img, '1');
        });
        elem.addEventListener('mouseout', function(){
            opacityImg(img, '0');
        });
        elem.addEventListener('focusout', function(){
            opacityImg(img, '0');
        });
    }

    function opacityImg(img, opac){
        img.style.opacity = opac;
    }
})();
