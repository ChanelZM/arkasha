/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var spans = document.querySelectorAll('.insert-text');

    var words = ['handelsbelemmering', 'aanstichting', 'smeernippel', 'vrachtlijst', 'spraakcentrum', 'doek', 'zuiderzon'],
        count = -1;

    function insertNewWord(e){
        count == (words.length - 1) ? count = 0: count++;
        e.target.innerHTML = words[count];
        console.log(e);
    }

    function init(){
        var i;
        for(i = 0; i < spans.length; i++){
            spans[i].addEventListener('mouseover', insertNewWord);
        }
    }

    init();
})();
