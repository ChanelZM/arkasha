/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var homeTypingText = document.querySelectorAll('.insert-text');

    var words = {},
        num = 0,
        isAnimating = false,
        isHovering = {},
        speed = 50;

    var prevWord,
        nextWord,
        randNum,
        eventInfo;

    function init(){
        var i;

        document.querySelector('.insert-text').classList.add('animate-border');

        for(i = 0; i < homeTypingText.length; i++){
            words[homeTypingText[i].id] = splitToArray(homeTypingText[i], homeTypingText[i].id);
            isHovering[homeTypingText[i].id] = false;

            //Refill HTML with only a single word
            homeTypingText[i].innerHTML = words[homeTypingText[i].id][0];

            if("ontouchstart" in document.documentElement == false){
                homeTypingText[i].addEventListener('focus', checkIfStillAnimating);
                homeTypingText[i].addEventListener('mouseover', checkIfStillAnimating);
                homeTypingText[i].addEventListener('mouseenter', function(e){
                    isHovering[e.target.id] = true;
                });
                homeTypingText[i].addEventListener('mouseleave', function(e){
                    isHovering[e.target.id] = false;
                });
            } else {
                homeTypingText[i].addEventListener('click', checkIfStillAnimating);
            }
        }
    }

    //Get every word out of the html and make an array of it
    function splitToArray(el, id){
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

        //Play sound
        document.querySelector('.ticking-sound').play();
        document.querySelector('.ticking-sound').addEventListener('ended', loopSound);

        loopThroughLetters(e.target, 'subtract', prevWord, 0, id);
    }

    function loopSound(){
        this.currentTime = 0;
        this.play();
    }

    function loopThroughLetters(elem, type, word, max, id){
        //If the goal is to add a word, add one letter everytime, otherwise remove one letter
        type == 'add' ? num++ : num--;

        console.log(isHovering);

        elem.innerHTML = word.substring (0, num);
        //This function will be called over and over until the word is written or totally erased
        setTimeout(function(){
            if(type == 'add' && num < max){
                loopThroughLetters(elem, type, word, max, id);
            } else if(type == 'subtract' && num > max){
                loopThroughLetters(elem, type, word, max, id);
            } else if(type == 'subtract' && num == max){
                var newWord = comparePrevAndNextWord(elem, word, id);
                typeWord(elem, newWord, id);
            } else if(type == 'add' && num == max && isHovering[id] == true){
                var newWord = comparePrevAndNextWord(elem, word, id);
                setTimeout(function(){
                    eraseWord(eventInfo, word, id);
                }, 500);
            }
        }, speed);
    }

    //Get a new word to be written in the html
    function comparePrevAndNextWord(elem, compareWord, id){
        randNum = Math.floor(Math.random() * words[id].length);

        if(words[id][randNum] == compareWord) {
            comparePrevAndNextWord(elem, compareWord, id);
        }
        if(words[id][randNum] != compareWord){
            return words[id][randNum];
        }
    }

    function typeWord(elem, word, id){
        num = 0;
        elem.style.minWidth = '0px';

        loopThroughLetters(elem, 'add', word, word.length, id);
        //After the animation, another animation can start again
        setTimeout(function(){
            isAnimating = false;
            document.querySelector('.ticking-sound').removeEventListener('ended', loopSound);
            document.querySelector('.ticking-sound').pause();
            elem.classList.remove('animate-border');
        }, (speed * word.length));
    }

    //Sorry internet explorer >=8
    if(document.addEventListener){
        init();
    }

})();
