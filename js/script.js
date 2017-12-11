/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var spans = document.querySelectorAll('.insert-text'),
        wordList = document.querySelector('.word-list'),
        wordElem = document.querySelectorAll('.word-list__item'),
        wordContainer = document.querySelectorAll('.opening-word__word-list');

    var words = ['handelsbelemmering', 'aanstichting', 'smeernippel', 'vrachtlijst', 'spraakcentrum', 'doek', 'zuiderzon'];

    var last;

    var list = {
        open: function(e){
            var offsetX = e.target.offsetLeft,
                offsetY = e.target.offsetTop,
                i;

            for(i = 0; i < wordElem.length; i++){
                wordElem[i].innerHTML = randomWord();
            }

            wordList.removeAttribute('hidden');
            wordList.style.left = offsetX + 'px';
            wordList.style.top = offsetY + 112 + 'px';
        },
        close: function(){
            wordList.setAttribute('hidden', 'true');
        }
    };

    function randomWord(){
        var randomNum = Math.floor(Math.random() * words.length);

        //Preventing that two or three of the same word will be loaded into the html
        if(last == words[randomNum]){
            randomNum = Math.floor(Math.random() * words.length);
            last = words[randomNum];
        } else {
            last = words[randomNum];
        }
        return last;
    }

    function init(){
        var i;
        for(i = 0; i < spans.length; i++){
            words.push(spans[i].innerHTML);
            spans[i].addEventListener('mouseover', list.open);
        }
        for(i = 0; i < wordContainer.length; i++){
            wordContainer[i].addEventListener('mouseleave', list.close);
        }
    }

    init();
})();
