/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var spans = document.querySelectorAll('.insert-text');

    var words = ['handelsbelemmering', 'aanstichting', 'smeernippel', 'vrachtlijst', 'spraakcentrum', 'doek', 'zuiderzon'],
        count = -1;

    var nextWord;

    function init(){
        var i;
        for(i = 0; i < spans.length; i++){
            spans[i].addEventListener('mouseover', hasElemHaveText);
        }
    }

    function hasElemHaveText(e){
        e.target.innerHTML == '' ? getNextWord(e) : eraseWord(e);
    }

    function getNextWord(e){
        count == (words.length - 1) ? count = 0: count++;
        nextWord = words[count];
        e.target.innerHTML = '';

        typeWord(nextWord);
    }

    function typeWord(word){
        //Type word in span
    }

    function eraseWord(e){
        //Erase word in span
        //Then type word again
    }

    function animateWord(elem, type){
        //Animate word depending on erasing or typing
    }

    init();
})();
