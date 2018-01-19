/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var projects = document.querySelectorAll('.project'),
        nextArrow = document.getElementById('next-arrow'),
        prevArrow = document.getElementById('prev-arrow');

    var projectsInfo = [],
        count = 0,
        num = 0,
        isAnimating = false,
        speed = 50;

    var nextProject;

    function init(){
        var noneDisplayPro = document.querySelectorAll('.project:not(:first-of-type)');
        var i,
            j;

        document.querySelector('.projects').classList.add('projects-js');
        document.querySelector('#prev-arrow').removeAttribute('hidden');
        document.querySelector('#next-arrow').removeAttribute('hidden');

        //Save all the project info in an array
        for(i = 0; i < projects.length; i++){
            projectsInfo.push({
                title: getTitle(projects[i]),
                href: projects[i].querySelector('.project__link').getAttribute('href'),
                clientSrc: projects[i].querySelector('.project__client').getAttribute('src'),
                clientAlt: projects[i].querySelector('.project__client').getAttribute('alt'),
                img1: projects[i].querySelector('.project__img').getAttribute('src'),
            });
        }

        //Get the title divided in spans
        function getTitle(parent){
            var arr = [],
                spans = parent.querySelectorAll('.project__title-span');

                for(j = 0; j < spans.length; j++){
                    var string = String(spans[j].innerHTML);
                    arr.push(string);
                }
                return arr;
        }

        //Because we only use the first project with children, the others aren't needed
        for(i = 0; i < noneDisplayPro.length; i++){
            noneDisplayPro[i].style.display = 'none';
        }

        nextArrow.addEventListener('click', checkIfStillAnimating);
        prevArrow.addEventListener('click', checkIfStillAnimating);
        prevArrow.style.display = 'none';

    }

    function checkIfStillAnimating(e){
        var direction = e.target.id;

        if(isAnimating == false){
            var prevNum = count;

            //Depending on arrow go next or back a project
            direction == 'next-arrow' ? count++ : count--;

            //Make sure that user cannot click further than the span of the projects
            if(count == 0){
                prevArrow.style.display = 'none';
            } else if(count == (projects.length - 1)){
                nextArrow.style.display = 'none';
            } else {
                nextArrow.style.display = 'inline-block';
                prevArrow.style.display = 'inline-block';
            }
            eraseProject(prevNum);

        }
    }

    function eraseProject(prevNum){
        isAnimating = true;
        projectParent = document.querySelector('.project');

        //Play sound
        document.querySelector('.ticking-sound').play();
        document.querySelector('.ticking-sound').addEventListener('ended', loopSound);

        var spans = projectParent.querySelectorAll('.project__title-span'),
            firstTimeoutTime = (spans[1].innerHTML.length + 1) * speed,
            secondTimeoutTime = (spans[0].innerHTML.length + 1) * speed;

        //Start animation of first span
        num = spans[1].innerHTML.length;
        spans[1].classList.add('animate-border');
        loopThroughLetters(spans[1], 'subtract', projectsInfo[prevNum].title[1], 0);

        //Start animation of second span
        setTimeout(function(){
            num = spans[0].innerHTML.length;
            spans[0].classList.add('animate-border');
            loopThroughLetters(spans[0], 'subtract', projectsInfo[prevNum].title[0], 0);
        }, firstTimeoutTime);

        //When both animations are done, start typing next project
        setTimeout(function(){
            typeWord(spans);
        }, (firstTimeoutTime + secondTimeoutTime));
    }

    function loopSound(){
        this.currentTime = 0;
        this.play();
    }

    function loopThroughLetters(elem, type, word, max){
        type == 'add' ? num++ : num--;

        elem.style.display = 'inline-block';
        if(type == 'subtract' && num == max){
            elem.style.display = 'none';
        }
        elem.innerHTML = word.substring(0, num);

        //This function will be called over and over until the word is written or totally erased
        setTimeout(function(){
            if(type == 'add' && num < max){
                loopThroughLetters(elem, type, word, max);
            } else if(type == 'subtract' && num > max){
                loopThroughLetters(elem, type, word, max);
            }
        }, speed);
    }

    function typeWord(elements){
        projectParent.querySelector('.project__link').setAttribute('href', projectsInfo[count].href);
        projectParent.querySelector('.project__client').setAttribute('src', projectsInfo[count].clientSrc);
        projectParent.querySelector('.project__client').setAttribute('alt', projectsInfo[count].clientAlt);
        projectParent.querySelector('.project__img').setAttribute('src', projectsInfo[count].img1);

        var firstTimeoutTime = (projectsInfo[count].title[0].length + 1) * speed,
            secondTimeoutTime = (projectsInfo[1].title[0].length + 1) * speed;

        nextWord = projectsInfo[count].title[0];
        num = 0;
        loopThroughLetters(elements[0], 'add', nextWord, nextWord.length);

        setTimeout(function(){
            elements[0].classList.remove('animate-border');
            nextWord = projectsInfo[count].title[1];
            num = 0;
            loopThroughLetters(elements[1], 'add', nextWord, nextWord.length);
        }, firstTimeoutTime);

        setTimeout(function(){
            document.querySelector('.ticking-sound').removeEventListener('ended', loopSound);
            document.querySelector('.ticking-sound').pause();
            elements[1].classList.remove('animate-border');
            isAnimating = false;
        }, (firstTimeoutTime + secondTimeoutTime));
    }

    if(document.addEventListener){
        init();
    }
})();
