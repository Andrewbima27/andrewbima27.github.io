var winWidth = $(window).width();
var ratio = winWidth / 1920;
var fontSize = {
  small: 12,
  medium: 14
};
var played = [0, 0, 0];
var vara = [];
var bodyFontSize = Math.max(16 * ratio, 10);
var posX = Math.max(80 * ratio, 30);
$("body").css("font-size", bodyFontSize + "px");
fontSize.small = Math.max(fontSize.small * ratio, 7);
fontSize.medium = Math.max(fontSize.medium * ratio, 10);
vara[0] = new Vara(
  "#vara-container",
  "https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json",
  [
    {
      text: "02 May 2025",
      textAlign: "right",
      y: 20,
      x: -45,
      delay: 500,
      duration: 1500,
      fontSize: fontSize.small
    },
    {
      text: "Hello Ecii,             ",
      y: 40,
      x: posX,
      duration: 4000
    },
    {
      text: "I just wanna tell u that...",
      id: "sphinx",
      x: posX,
      delay: 500,
      duration: 4500
    },
    {
      text: "Happy birthday.",
      id: "end",
      delay: 500,
      x: posX,
      duration: 4500
    }
  ],
  {
    strokeWidth: 2,
    fontSize: fontSize.medium,
    autoAnimation: false
  }
);
vara[1] = new Vara(
  "#vara-container2",
  "https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json",
  [
    {
      text: "19 Oct 2023",
      textAlign: "right",
      delay: 500,
      y: 20,
      x: -45,
      duration: 1500,
      fontSize: fontSize.small
    },
    {
      text: "I don't know how...            or why.",
      y: 40,
      x: posX,
      duration: 4000
    },
    {
      text: "but i did.",
      y: 40,
      x: posX,
      delay: 500,
      duration: 3500
    }
  ],
  {
    strokeWidth: 2,
    fontSize: fontSize.medium,
    autoAnimation: false
  }
);
vara[2] = new Vara(
  "#vara-container3",
  "https://rawcdn.githack.com/akzhy/Vara/ed6ab92fdf196596266ae76867c415fa659eb348/fonts/Satisfy/SatisfySL.json",
  [
    {
      text: "17 Agust 2023",
      textAlign: "right",
      delay: 500,
      y: 20,
      x: -45,
      duration: 1500,
      fontSize: fontSize.small
    },
    {
      text: "Halo cantik hehe.",
      y: 40,
      x: posX,
      duration: 4000
    },
    {
      text: "apyu so muchh hehe,",
      y: 20,
      x: posX,
      duration: 3500
    },
    {
      text: "mwaaamwamwa",
      y: 10,
      color: "#3f51b5",
      id: "",
      x: posX,
      duration: 1500
    }
  ],
  {
    strokeWidth: 2,
    fontSize: fontSize.medium,
    autoAnimation: false
  }
);
vara[2].ready(function() {
  $(".front:not(.last)").click(function() {
    var ix = $(this)
      .parent(".paper")
      .index();
    $(".book").addClass("open");
    $(this)
      .parent(".paper")
      .addClass("open");
    if (!played[ix]) {
      vara[ix].playAll();
      vara[ix].animationEnd(function(i, o) {
        played[ix] = 1;
        if (i == "link") {
          var group = o.container;
          var rect = vara[2].createNode("rect", {
            x: 0,
            y: 0,
            width: o.container.getBoundingClientRect().width,
            height: o.container.getBoundingClientRect().height,
            fill: "transparent"
          });
          group.appendChild(rect);
          $(rect).css("cursor", "pointer");
          $(rect).click(function() {
            console.log(true);
            document.querySelector("#link").click();
          });
        }
      });
    }
  });
  $(".back").click(function() {
    if (
      $(this)
        .parent(".paper")
        .index() == 0
    )
      $(".book").removeClass("open");
    $(this)
      .parent(".paper")
      .removeClass("open");
  });
});