/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var homeTypingText = document.querySelectorAll('.insert-text');

    var words = {},
        num = 0,
        isAnimating = false,
        speed = 90;

    var prevWord,
        nextWord,
        randNum;

    function init(){
        var i;

        for(i = 0; i < homeTypingText.length; i++){
            splitToArray(homeTypingText[i], homeTypingText[i].id);

            //Refill HTML with only a single word
            homeTypingText[i].innerHTML = words[homeTypingText[i].id][0];

            homeTypingText[i].addEventListener('mouseover', checkIfStillAnimating);
        }
    }

    //Get every word out of the html and make an array of it
    function splitToArray(el, id){
        words[id] = el.innerHTML.split('/');
    }

    //The animation can't be triggered again during an animation
    function checkIfStillAnimating(e){
        if(isAnimating == false){
            e.target.classList.add('animate-border');
            prevWord = e.target.innerHTML;
            eraseWord(e, e.target.innerHTML, e.target.id);
        }
    }

    //Call function that will erase the word that's already there
    function eraseWord(e, prevWord, id){
        isAnimating = true;
        num = prevWord.length;

        loopThroughLetters(e.target, 'subtract', prevWord, 0, id);
    }

    function loopThroughLetters(elem, type, word, max, id){
        //If the goal is to add a word, add one letter everytime, otherwise remove one letter
        type == 'add' ? num++ : num--;

        elem.innerHTML = word.substring (0, num);

        //This function will be called over and over until the word is written or totally erased
        setTimeout(function(){
            if(type == 'add' && num < max){
                loopThroughLetters(elem, type, word, max, id);
            } else if(type == 'subtract' && num > max){
                loopThroughLetters(elem, type, word, max, id);
            } else if(type == 'subtract' && num == max){
                comparePrevAndNextWord(elem, id);
            }
        }, speed);
    }

    //Get a new word to be written in the html
    function comparePrevAndNextWord(elem, id){
        randNum = Math.floor(Math.random() * words[id].length);

        if(words[id][randNum] != prevWord){
            typeWord(elem, words[id][randNum], id);
        } else {
            comparePrevAndNextWord(elem, id);
        }
    }

    function typeWord(elem, word, id){
        num = 0;
        elem.style.minWidth = '0px';

        loopThroughLetters(elem, 'add', word, word.length, id);

        //After the animation, another animation can start again
        setTimeout(function(){
            isAnimating = false;
            elem.classList.remove('animate-border');
        }, (speed * word.length));
    }

    init();

})();
