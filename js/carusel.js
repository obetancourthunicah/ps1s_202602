class Carusel {
    root = null;
    trail = null;
    slides = null;
    slidesCount = 0;
    intervalTime = 0;
    currentIndex = 0;
    direction = 1;
    constructor( rootSelector, tickSecond = 3 ) {
        this.root = document.querySelector(rootSelector);
        if(!this.root) {
            throw new Error("No se encuentra el elemento root del carusel");
        }
        this.trail = this.root.querySelector(".carusel-trail");
        this.slides = this.root.querySelectorAll(".carusel-trail>section");
        this.slidesCount = this.slides.length;
        if (this.slidesCount < 3) {
            throw new Error("Mínimo son 3 elementos en carusel");
        }
        console.log("Debug Data", {"root":this.root, "trail":this.trail, "slides": this.slidesCount});
        this.intervalTime = tickSecond * 1000;
        this.tick();
    }

    tick(){
        setTimeout(
            (()=>{
                this.currentIndex += this.direction;
                this.moveSlide();
            }).bind(this)
            , this.intervalTime
        );
    }

    moveSlide(){
        if(this.currentIndex >= this.slidesCount || this.currentIndex < 0) {
            this.direction *= -1;
            this.currentIndex = this.currentIndex + (this.direction * 2);
        }
        this.trail.style.transform = `translateX(${(100*this.currentIndex*-1)}vw)`;
        this.tick();
    }
}