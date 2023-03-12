var cont = document.querySelectorAll(".drum");
var x = cont.length;
for(var i = 0;i<x;i++){
    cont[i].addEventListener("click",function(){
        var c = this.innerHTML;
        makeSound(c);
        createanim(c);
    });
}
var crash = new Audio("sounds/crash.mp3");
var kick = new Audio("sounds/kick-bass.mp3");
var snare = new Audio("sounds/snare.mp3");
var tom1 = new Audio("sounds/tom-1.mp3");
var tom2 = new Audio("sounds/tom-2.mp3");
var tom3 = new Audio("sounds/tom-3.mp3");
var tom4 = new Audio("sounds/tom-4.mp3");
function makeSound(c){
    if(c == "w") {
        crash.play();
    }
    else if(c == "a"){
        kick.play();
    }
    else if(c == "s") snare.play();
    else if(c == "d") tom1.play();
    else if(c == "j") tom2.play();
    else if(c == "k") tom3.play();
    else if(c == "l") tom4.play();
}
document.addEventListener("keypress",function(event){
    var c = event.key;
    makeSound(c);
    createanim(c);
})
function createanim(c){
    var current = document.querySelector("."+c);
    current.classList.add("pressed");
    var y = current.style.color ;
    current.style.color = "yellow";
    setTimeout(function(){
        current.classList.remove("pressed");
        current.style.color = y;
    },50);
}
