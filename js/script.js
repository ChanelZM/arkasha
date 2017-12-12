/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var spans = document.querySelectorAll('.insert-text');

    var words = ['handelsbelemmering', 'aanstichting', 'smeernippel', 'vrachtlijst', 'spraakcentrum', 'doek', 'zuiderzon'],
        count = -1,
        num = 0,
        isAnimating = false,
        speed = 200;

    var nextWord;

    function init(){
        var i;
        for(i = 0; i < spans.length; i++){
            spans[i].addEventListener('mouseover', checkIfStillAnimating);
            spans[i].innerHTML = 'hover here';
        }
    }

    function checkIfStillAnimating(e){
        if(isAnimating == false){
            hasElemHaveText(e);
        }
    }

    function hasElemHaveText(e){
        isAnimating = true;
        e.target.innerHTML == 'hover here' ? getNextWord(e) : eraseWord(e, e.target.innerHTML);
    }

    function getNextWord(e){
        var elem = e.target || e;

        count == (words.length - 1) ? count = 0: count++;
        nextWord = words[count];

        elem.innerHTML = '';

        typeWord(elem, nextWord);
    }

    function typeWord(elem, word){
        num = 0;

        loopThroughLetters(elem, 'add', word, word.length);

        setTimeout(function(){
            isAnimating = false;
        }, (speed * word.length));
    }

    function eraseWord(e, prevWord){
        num = prevWord.length;

        loopThroughLetters(e.target, 'subtract', prevWord, 0);
    }

    function loopThroughLetters(elem, type, word, max){
        type == 'add' ? num++ : num--;

        elem.innerHTML = word.substring (0, num);

        setTimeout(function(){
            if(type == 'add' && num < max){
                loopThroughLetters(elem, type, word, max);
            } else if(type == 'subtract' && num > max){
                loopThroughLetters(elem, type, word, max);
            } else if(type == 'subtract' && num == max){
                getNextWord(elem);
            }
        }, speed);
    }

    init();

})();
