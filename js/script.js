/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var spans = document.querySelectorAll('.insert-text'),
        wordContainer = document.querySelectorAll('.opening-word__word-list');

    var words = ['handelsbelemmering', 'aanstichting', 'smeernippel', 'vrachtlijst', 'spraakcentrum', 'doek', 'zuiderzon'];

    var last;

    var list = {
        open: function(e){
            var offsetX = e.target.offsetLeft,
                offsetY = e.target.offsetTop,
                optionList = e.target.parentNode.children[1],
                options = e.target.parentNode.children[1].children;

            addRandomWords(e, options);

            optionList.removeAttribute('hidden');
            optionList.style.left = offsetX + 'px';
            optionList.style.top = offsetY + 112 + 'px';
        },
        close: function(e){
            e.target.children[1] ? e.target.children[1].setAttribute('hidden', 'true') : e.target.parentNode.children[1].setAttribute('hidden', 'true');
        }
    };

    function addRandomWords(e, options){
        var randomWords = [];
        var i;

        for(i = 0; i < options.length; i++){
            options[i].innerHTML = createRandomWord(e, randomWords);
        }
    }

    function createRandomWord(e, array){
        var randomNum = Math.floor(Math.random() * words.length);

        //Preventing that two or three of the same word will be loaded into the html
        if(last == words[randomNum]){
            randomNum = Math.floor(Math.random() * words.length);
            last = words[randomNum];
        } else if(e.target.innerHTML == words[randomNum]){
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
            spans[i].addEventListener('mouseover', function(e){
                if(e.target.parentNode.children[1].hasAttribute('hidden')){
                    list.open(e);
                }
            });
        }
        for(i = 0; i < wordContainer.length; i++){
            wordContainer[i].addEventListener('mouseleave', list.close);
        }
    }

    init();
})();
