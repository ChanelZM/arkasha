/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var projectWrap = document.querySelector('.projects'),
        projectImages = document.querySelector('.project__images'),
        projects = document.querySelectorAll('.project');

    var timeoutImg;

    if("ontouchstart" in document.documentElement == false){
        for(var i = 0; i < projects.length; i++){
            projectImages.style.opacity = '0';
            projects[i].querySelector('.project__link').addEventListener('mouseover', function(e){
                projectImages.style.opacity = '1';
            });
            projects[i].querySelector('.project__link').addEventListener('focus', function(e){
                projectImages.style.opacity = '1';
            });
            projects[i].querySelector('.project__link').addEventListener('mouseout', function(e){
                projectImages.style.opacity = '0';
            });
            projects[i].querySelector('.project__link').addEventListener('focusout', function(e){
                projectImages.style.opacity = '0';
            });
        }
    }
})();
