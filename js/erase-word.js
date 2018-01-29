/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var homeTypingText = document.querySelectorAll('.insert-text');

    var words = {},
        num = 0,
        isAnimating = false,
        speed = {
            typing: 70,
            erasing: 25
        };

    var prevWord,
        nextWord,
        randNum,
        eventInfo;

    function init(){
        var i;

        document.querySelector('.insert-text').classList.add('animate-border');

        for(i = 0; i < homeTypingText.length; i++){
            words[homeTypingText[i].id] = {
                arrWord: splitToArray(homeTypingText[i], homeTypingText[i].id),
                position: 0
            };

            //Refill HTML with only a single word
            homeTypingText[i].innerHTML = words[homeTypingText[i].id].arrWord[0];

            if("ontouchstart" in document.documentElement == false){
                homeTypingText[i].addEventListener('focus', checkIfStillAnimating);
                homeTypingText[i].addEventListener('mouseover', checkIfStillAnimating);
            } else {
                homeTypingText[i].addEventListener('click', checkIfStillAnimating);
            }
        }
    }

    //Get every word out of the html and make an array of it
    function splitToArray(el){
        return el.innerHTML.split('/');
    }

    //The animation can't be triggered again during an animation
    function checkIfStillAnimating(e){
        if(isAnimating == false){
            e.target.classList.add('animate-border');
            prevWord = e.target.innerHTML;
            eventInfo = e;
            eraseWord(e, e.target.innerHTML, e.target.id);
        }
    }

    //Call function that will erase the word that's already there
    function eraseWord(e, prevWord, id){
        isAnimating = true;
        num = prevWord.length;

        loopThroughLetters(e.target, 'subtract', prevWord, 0, id);
    }

    function loopSound(){
        this.currentTime = 0;
        this.play();
    }

    function loopThroughLetters(elem, type, word, max, id){
        var writeSpeed;
        //If the goal is to add a word, add one letter everytime, otherwise remove one letter
        type == 'add' ? num++ : num--;
        type == 'add' ? writeSpeed = speed.typing : writeSpeed = speed.erasing;

        elem.innerHTML = word.substring (0, num);
        //This function will be called over and over until the word is written or totally erased
        setTimeout(function(){
            if(type == 'add' && num < max){
                loopThroughLetters(elem, type, word, max, id);
            } else if(type == 'subtract' && num > max){
                loopThroughLetters(elem, type, word, max, id);
            } else if(type == 'subtract' && num == max){
                if(words[id].position == words[id].arrWord.length - 1){
                    words[id].position = 0;
                } else {
                    words[id].position = words[id].position + 1;
                }
                typeWord(elem, words[id].arrWord[words[id].position], id);
            }
        }, writeSpeed);
    }

    function typeWord(elem, word, id){
        num = 0;
        elem.style.minWidth = '0px';

        //Play sound
        document.querySelector('.ticking-sound').play();
        document.querySelector('.ticking-sound').addEventListener('ended', loopSound);

        loopThroughLetters(elem, 'add', word, word.length, id);
        //After the animation, another animation can start again
        setTimeout(function(){
            isAnimating = false;
            document.querySelector('.ticking-sound').removeEventListener('ended', loopSound);
            document.querySelector('.ticking-sound').pause();
            elem.classList.remove('animate-border');
        }, (speed.typing * word.length));
    }

    //Sorry internet explorer >=8 Typing animation will only work on IE9 or above
    if(document.addEventListener){
        init();
    }

})();
