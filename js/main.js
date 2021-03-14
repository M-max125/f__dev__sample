

// VanillaTilt.init(document.querySelector('.card'), {
   
//     max: 25,
//     speed: 500
// });

var tl = gsap.timeline();

tl.from(".pic3", {
    opacity: 0,
    y: -500,
    rotation: 360,
    duration: 2,
    ease: "elastic"
})
.from(".card", {
             opacity: 0,
             y: -700,
             duration: 1,
             ease: "back"

         })
.from('.text h1', {
    y: 20,
    clipPath: 'inset(0 0 100% 0)'
},"-=.8")
    .from(".text p", {
        y: 70,
        clipPath: 'inset(0 0 100% 0)'
    
},"-=.9").from(".pic2 img", {
    opacity: 0,
    y: 500,
    stagger: 0.1,
    ease: "power1.out",
})
    .from(".pic1", {
    opacity: 0,
    x: -130
    }, "-=.3");
    
/* Animations that occur on click from the landing page*/ 
var icon = document.getElementById('icon');

icon.addEventListener("click", function () {
    
    var tl1 = gsap.timeline();
    tl1.to("#one", {
        x: "-100%",
        ease: "power1.out",
        duration: 1.2
    }).to("#two", {
        x: "100%",
        opacity: 1,
        duration: 1
    }).to(".first-block", {
        keyframes: [
            { x: 0, left: 0, width: "100%", duration: 1.8 },
            { x: "50%", left: 0, width: "100%", duration: 1.8 },
            { x: "100%", left: "100%", width: "0%", duration: 1.8 },
        ], ease: "power1.inOut"
    }, "-=3.5")
        .to(".temp", {
            keyframes: [
                { x: "0%", opacity: 0, duration: 0.1 },
                { x: "40%", opacity: 0, duration: 0.2 },
                { x: "61%", opacity: 1, duration: 0.2 },
                { x: "91%", opacity: 1, duration: 0.2 },
                { x: "92%", opacity: 0, duration: 0.2 },
                { x: "100%", opacity: 0, duration: 0.1 },
            ]
        })
        .to(".second-block", {
            keyframes: [
                { x: 0, left: 0, width: "100%", duration: 1.3 },
                { x: "50%", left: 0, width: "100%", duration: 1.4 },
                { x: "100%", left: "100%", width: "0%", duration: 1.2 },
            ]
        }, "-=2.5")
        .to(".preload ul li", {
            keyframes: [
                { x: "0%", opacity: 0, translateX: 80, duration: 1.8 },
                { x: "20%", opacity: 1, translateX: 0, duration: 1.8 },
                { x: "80%", opacity: 1, translateX: 80, duration: 2 },
                { x: "100%", opacity: 0, translateX: -80, duration: 1.8 },
            ]
        }, "-=9").to(".third-block", { x: 0, width: "64%", ease: "power1.out" }, "-=1.4")
        .fromTo(".demo-wrapper", { width: 0 },{width: "100%"})
        .fromTo(".image img", { opacity: 0 }, { opacity: 1 }, "+=.3")
        .from(".logo", {
            opacity: 0,
            y: 30,
            ease: "power3.inOut",
        })
        .from(".heading", {
            opacity: 0,
            y: 30,
            ease: "power3.inOut"
        }, "-=0.2")
        .from(".desc", {
            opacity: 0,
            y: 30,
            ease: "power3.inOut"
        }, "-=0.3")
        .from(".arrow", {
            opacity: 0,
            y: 30,
            ease: "power3.inOut"
        }, "-=0.4")
        .from(".media ul li", {
            opacity: 0,
            y: 40,
            stagger: 0.1,
            ease: "power3.inOut"
        }, "-=0.5");
    
});








// Animation & triangulation effect on images 

const TWO_PI = Math.PI * 2;

var images = [],
    imageIndex = 0;

var image,
    imageWidth = 768,
    imageHeight = 485;

var vertices = [],
    indices = [],
    fragments = [];

var container = document.getElementById('container');

var clickPosition = [imageWidth * 0.5, imageHeight * 0.5];

window.onload = function() {
    gsap.set(container, {perspective:500});

    
    var urls = [
            'images/plan1.jpg',
            'images/plan2.jpg',
            'images/plan3.png',
            'images/plan4.png',
        'images/plan5.jpg',
        'images/plan6.jpg'
        ],
        image,
        loaded = 0;
    
    images[0] = image = new Image();
        image.onload = function() {
            if (++loaded === 1) {
                imagesLoaded();
                for (var i = 1; i < 6; i++) {
                    images[i] = image = new Image();

                    image.src = urls[i];
                }
            }
        };
        image.src = urls[0];
};

function imagesLoaded() {
    placeImage(false);
    triangulate();
    shatter();
}

function placeImage(transitionIn) {
    image = images[imageIndex];

    if (++imageIndex === images.length) imageIndex = 0;

    image.addEventListener('click', imageClickHandler);
    container.appendChild(image);

    if (transitionIn !== false) {
        gsap.fromTo(image, 0.75, {y:-1000}, {y:0, ease:Back.easeOut});
    }
}

function imageClickHandler(event) {
    var box = image.getBoundingClientRect(),
        top = box.top,
        left = box.left;

    clickPosition[0] = event.clientX - left;
    clickPosition[1] = event.clientY - top;

    triangulate();
    shatter();
}

function triangulate() {
    var rings = [
            {r:50, c:12},
            {r:150, c:12},
            {r:300, c:12},
            {r:1200, c:12} 
        ],
        x,
        y,
        centerX = clickPosition[0],
        centerY = clickPosition[1];

    vertices.push([centerX, centerY]);

    rings.forEach(function(ring) {
        var radius = ring.r,
            count = ring.c,
            variance = radius * 0.25;

        for (var i = 0; i < count; i++) {
            x = Math.cos((i / count) * TWO_PI) * radius + centerX + randomRange(-variance, variance);
            y = Math.sin((i / count) * TWO_PI) * radius + centerY + randomRange(-variance, variance);
            vertices.push([x, y]);
        }
    });

    vertices.forEach(function(v) {
        v[0] = clamp(v[0], 0, imageWidth);
        v[1] = clamp(v[1], 0, imageHeight);
    });

    indices = Delaunay.triangulate(vertices);
}

function shatter() {
    var p0, p1, p2,
        fragment;

    var tl0 = gsap.timeline({onComplete:shatterCompleteHandler});

    for (var i = 0; i < indices.length; i += 3) {
        p0 = vertices[indices[i + 0]];
        p1 = vertices[indices[i + 1]];
        p2 = vertices[indices[i + 2]];

        fragment = new Fragment(p0, p1, p2);

        var dx = fragment.centroid[0] - clickPosition[0],
            dy = fragment.centroid[1] - clickPosition[1],
            d = Math.sqrt(dx * dx + dy * dy),
            rx = 30 * sign(dy),
            ry = 90 * -sign(dx),
            delay = d * 0.003 * randomRange(0.9, 1.1);
        fragment.canvas.style.zIndex = Math.floor(d).toString();

        var tl1 = gsap.timeline();


        tl1.to(fragment.canvas, 1, {
            z:-500,
            rotationX:rx,
            rotationY:ry,
            ease:Cubic.easeIn
        });
        tl1.to(fragment.canvas, 0.4,{alpha:0}, 0.6);

        tl0.add(tl1, delay);

        fragments.push(fragment);
        container.appendChild(fragment.canvas);
    }

    container.removeChild(image);
    image.removeEventListener('click', imageClickHandler);
}

function shatterCompleteHandler() {
    
    fragments.forEach(function(f) {
        container.removeChild(f.canvas);
    });
    fragments.length = 0;
    vertices.length = 0;
    indices.length = 0;

    placeImage();
}

//////////////
// MATH UTILS
//////////////

function randomRange(min, max) {
    return min + (max - min) * Math.random();
}

function clamp(x, min, max) {
    return x < min ? min : (x > max ? max : x);
}

function sign(x) {
    return x < 0 ? -1 : 1;
}

//////////////
// FRAGMENT
//////////////

Fragment = function(v0, v1, v2) {
    this.v0 = v0;
    this.v1 = v1;
    this.v2 = v2;

    this.computeBoundingBox();
    this.computeCentroid();
    this.createCanvas();
    this.clip();
};
Fragment.prototype = {
    computeBoundingBox:function() {
        var xMin = Math.min(this.v0[0], this.v1[0], this.v2[0]),
            xMax = Math.max(this.v0[0], this.v1[0], this.v2[0]),
            yMin = Math.min(this.v0[1], this.v1[1], this.v2[1]),
            yMax = Math.max(this.v0[1], this.v1[1], this.v2[1]);

        this.box ={
            x:xMin,
            y:yMin,
            w:xMax - xMin,
            h:yMax - yMin
        };
    },
    computeCentroid:function() {
        var x = (this.v0[0] + this.v1[0] + this.v2[0]) / 3,
            y = (this.v0[1] + this.v1[1] + this.v2[1]) / 3;

        this.centroid = [x, y];
    },
    createCanvas:function() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.box.w;
        this.canvas.height = this.box.h;
        this.canvas.style.width = this.box.w + 'px';
        this.canvas.style.height = this.box.h + 'px';
        this.canvas.style.left = this.box.x + 'px';
        this.canvas.style.top = this.box.y + 'px';
        this.ctx = this.canvas.getContext('2d');
    },
    clip:function() {
        this.ctx.translate(-this.box.x, -this.box.y);
        this.ctx.beginPath();
        this.ctx.moveTo(this.v0[0], this.v0[1]);
        this.ctx.lineTo(this.v1[0], this.v1[1]);
        this.ctx.lineTo(this.v2[0], this.v2[1]);
        this.ctx.closePath();
        this.ctx.clip();
        this.ctx.drawImage(image, 0, 0);
    }
};


/** Image gallery slideshow */
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}
    




  



    




  






   

    