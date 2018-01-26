/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var projectWrap = document.querySelector('.projects'),
        projectImages = document.querySelector('.project__img'),
        projects = document.querySelectorAll('.project'),
        phoneNumber = document.querySelector('#number'),
        email = document.querySelector('#email'),
        kashName = document.querySelector('.contact__name'),
        emailPhoto = document.querySelector('#email-photo'),
        phonePhoto = document.querySelector('#phone-photo'),
        kashPhoto = document.querySelector('#kash-photo'),
        emailSound = document.querySelector('.email-sound'),
        phoneSound = document.querySelector('.phone-sound');
        doIt = document.querySelector('.hover-sound');
        doItSound = document.querySelector('.do-it');
        kash = document.querySelector('#nav-kash');
        kashSound = document.querySelector('.sound-kash');
        work = document.querySelector('#nav-work');
        workSound = document.querySelector('.sound-werk');
        contact = document.querySelector('#nav-contact');
        contactSound = document.querySelector('.sound-contact');

    var timeoutImg,
        i;

    if("ontouchstart" in document.documentElement == false){
        // for(i = 0; i < projects.length; i++){
        //     opacityImg(projectImages, '0');
        //     addImgHoverEventListeners(projects[i].querySelector('.project__link'), projectImages);
        // }
        if(phoneNumber){
            opacityImg(phonePhoto, '0');
            addImgHoverEventListeners(phoneNumber, phonePhoto);
            playSound(phoneNumber, phoneSound);
        }
        if(email){
            opacityImg(emailPhoto, '0');
            addImgHoverEventListeners(email, emailPhoto);
            playSound(email, emailSound);
        }
        if(kashName){
            opacityImg(kashPhoto, '0');
            addImgHoverEventListeners(kashName, kashPhoto);
        }
        if(doIt){
            playSound(doIt, doItSound);
        }
        if(kash){
            playSound(kash, kashSound);
        }
        if(work){
            playSound(work, workSound);
        }
        if(contact){
            playSound(contact, contactSound);
        }
    }

    function addImgHoverEventListeners(elem, img){
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

    function playSound(elem, sound){
        if("ontouchstart" in document.documentElement == false){
            elem.addEventListener('mouseover', function(){
                sound.autoplay = true;
                sound.play();
            });
            elem.addEventListener('mouseleave', function(){
                sound.pause();
                sound.currentTime = 0;
            });
        }
    }
})();
