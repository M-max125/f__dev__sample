$(document).ready(function () {
    $(".buttons").click(function () {
        $(this).addClass('active').siblings().removeClass('active');

        var filter = $(this).attr('data-filter')

    if (filter == 'all') {
        $('.img').show(400);
    } else {
        $('.img').not('.'+filter).hide(200); 
        $('.img').filter('.'+filter).show(400);
    }
    
    });

    $('.gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    
});




var demos = [];



var cloudhouse = {
  one : {
    bg: " https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
    bm: "none" 
  },
  two : {
    bg: "images/couple.jpg",
    bm: "multiply" 
  },
  three : {
    bg: "images/couple-rm.png",
    bm: "none" 
  }
}
demos.push(cloudhouse);


var vision = {
  one : {
    bg: "https://wallpaperaccess.com/full/1218225.jpg",
    bm: "none" 
  },
  two : {
    bg: "images/girls.jpg",
    bm: "multiply" 
  },
  three : {
    bg: "images/rm-girls.png",
    bm: "none" 
  }
}
demos.push(vision);


var knowledge = {
  one : {
    bg: "https://images.unsplash.com/photo-1533105595241-bf628ead661f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1850&q=80",
    bm: "none" 
  },
  two : {
    bg: "images/bg.jpg",
    bm: "multiply" 
  },
  three : {
    bg: "images/bg-rmv.png",
    bm: "none" 
  }
}
demos.push(knowledge);


var box = document.getElementById("insight-container");
var active;
var applyDemo = function(number){
  console.log(number);
  var go = demos[number-1];

  box.innerHTML = "";

  

  var f1 = document.createElement("div");
  f1.setAttribute("id", "f1");
  var style = "background-image: url(" + go.one.bg + "); mix-blend-mode: " + go.one.bm + ";";
  f1.setAttribute("style", style);
    box.appendChild(f1);
  

  var f2 = document.createElement("div");
  f2.setAttribute("id", "f2");
  var style = "background-image: url(" + go.two.bg + "); mix-blend-mode: " + go.two.bm + ";";
  f2.setAttribute("style", style);
  box.appendChild(f2);

  var f3 = document.createElement("div");
  f3.setAttribute("id", "f3");
  var style = "background-image: url(" + go.three.bg + "); mix-blend-mode: " + go.three.bm + ";";
  f3.setAttribute("style", style);
  box.appendChild(f3);
  active = number;

    document.body.setAttribute("data-demo", number);
   
        
    

}
applyDemo(1);


$('.demos').on('click', 'a', function(event) {
    event.preventDefault();
    var t = this;
      
    if (active == t.getAttribute("data-go")) return;
    
   
    
    $(box).fadeOut({
      duration: 500,
      complete: function(){
        applyDemo(t.getAttribute("data-go"));
        $(box).fadeIn(500);
      }
    });
});



//slider-wrapper

$('.slide-nav').on('click', function(e) {
    e.preventDefault();
    // get current slide
    var current = $('.flex--active').data('slide'),
      // get button data-slide
      next = $(this).data('slide');
  
    $('.slide-nav').removeClass('active');
    $(this).addClass('active');
  
    if (current === next) {
      return false;
    } else {
      $('.slider__wrapper').find('.flex__container[data-slide=' + next + ']').addClass('flex--preStart');
      $('.flex--active').addClass('animate--end');
      setTimeout(function() {
        $('.flex--preStart').removeClass('animate--start flex--preStart').addClass('flex--active');
        $('.animate--end').addClass('animate--start').removeClass('animate--end flex--active');
      }, 800);
    }
  });
  