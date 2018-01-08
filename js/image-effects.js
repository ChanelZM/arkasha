/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var projectWrap = document.querySelector('.projects'),
        projectImages = document.querySelector('.project__images'),
        projects = document.querySelectorAll('.project');

    var timeoutImg;

    for(var i = 0; i < projects.length; i++){
        projects[i].querySelector('.project__link').addEventListener('mouseover', function(e){
            projectImages.style.opacity = '1';
        });
        projects[i].querySelector('.project__link').addEventListener('mouseout', function(e){
            projectImages.style.opacity = '0';
        });
    }
})();
