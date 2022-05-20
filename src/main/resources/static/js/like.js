let button = document.querySelector(".heart-like-button");

button.addEventListener("click",function(e){
    e.preventDefault();
    this.classList.toggle("active");
  this.classList.add("animated");
  generateClones(this);
});

function generateClones(button){
    if (button.classList.contains("liked")) {
        button.classList.remove("liked");
    } else {
        button.classList.add("liked");
    }
}