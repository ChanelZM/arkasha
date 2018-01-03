/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var spans = document.querySelectorAll('.insert-text');

    var words = {
            name: ['Arkasha Keysers', 'Kash'],
            profession: ['journaliste', 'schrijver', 'copywriter'],
            write: ['artikels', 'verhalen', 'websites'],
            passion: ['vragen stellen', 'luisteren', 'gevoeligheden detecteren', 'doorvragen'],
            language: ['Nederlands', 'Spaans', 'Duits', 'Engels'],
            admire: ['Bewondering', 'Verwondering'],
            topic: ['creativiteit', 'andere culturen', 'mensen met talent'],
            question: ['relaties', 'uitgesproken persoonlijkheden', 'creatieve projecten'],
            place: ['Antwerpen', 'Barcelona', 'Zuid-Amerika'],
            style: ['gevat', 'raak', 'nuchter', 'beschouwend'],
            contact: ['bellen', 'mailen', 'skypen'],
            project: ['zakelijk voorstel', 'goed verhaal', 'festival ticket', 'buitenlands project']
        },
        count = -1,
        num = 0,
        isAnimating = false,
        speed = 90;

    var nextWord;

    function init(){
        var i;
        for(i = 0; i < spans.length; i++){
            spans[i].addEventListener('mouseover', checkIfStillAnimating);
        }
    }

    //The animation can't be triggered again during an animation
    function checkIfStillAnimating(e){
        if(isAnimating == false){
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
                getNextWord(elem, id);
            }
        }, speed);
    }

    //Get a new word to be written in the html
    function getNextWord(elem, id){
        console.log(id);
        count = Math.floor(Math.random() * words[id].length);
        nextWord = words[id][count];

        typeWord(elem, nextWord, id);
    }

    function typeWord(elem, word, id){
        num = 0;

        elem.classList.remove('animate-border');
        elem.style.minWidth = '0px';

        loopThroughLetters(elem, 'add', word, word.length, id);

        //After the animation, another animation can start again
        setTimeout(function(){
            isAnimating = false;
            elem.classList.add('animate-border');
        }, (speed * word.length));
    }

    init();

})();
