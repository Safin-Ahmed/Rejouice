const initLocoScroll = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
};

const cursorEffect = (section, cursorEl) => {
  const page1Content = document.querySelector(section);
  const cursor = document.querySelector(cursorEl);

  page1Content.addEventListener("mousemove", function (dets) {
    gsap.to(cursor, {
      x: dets.clientX,
      y: dets.clientY,
    });
  });

  page1Content.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
    });
  });

  page1Content.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
    });
  });
};

function page2Animation(dom, settings) {
  gsap.from(dom, settings);
}

function swiperInit() {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
    mode: "horizontal",
    freeMode: true,
  });
}

function initLoader() {
  const tl = gsap.timeline();

  tl.from("#loader h3", {
    x: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
  });

  tl.to("#loader h3", {
    opacity: 0,
    x: -50,
    duration: 1,
    stagger: 0.1,
  });

  tl.to("#loader", {
    opacity: 0,
    display: "none",
  });

  tl.from("#page1-content h1 span", {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    delay: -0.5,
  });
}

function circleAnimation() {
  const counterNumber = document.querySelector("#counter_number");
  const circle = document.querySelector("#circle");
  const trailingCircle = document.querySelector(
    "#circle svg.trailing-circle circle"
  );

  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
    console.log({ isVisible });

    if (isVisible) {
      circle.classList.add("rotate");
      trailingCircle.classList.add("draw");
      counterNumber.classList.add("count_up");
    } else {
      circle.classList.remove("rotate");
      trailingCircle.classList.remove("draw");
      counterNumber.classList.remove("count_up");
    }
  });

  observer.observe(document.querySelector("#page4-bottom"));
}

initLocoScroll();

initLoader();
page2Animation(".elem h1", {
  y: 120,
  stagger: 0.2,
  duration: 1,
  scrollTrigger: {
    trigger: "#page2",
    scroller: "main",
    start: "top 40%",
    end: "top 37%",
    scrub: 2,
  },
});
page2Animation(".elem4 h1", {
  y: 120,
  stagger: 0.2,
  duration: 1,
  scrollTrigger: {
    trigger: "#page4",
    scroller: "main",
    start: "top 50%",
    end: "top 47%",
    scrub: 2,
  },
});
swiperInit();
cursorEffect("#page1-content", "#cursor");
cursorEffect("#page4-bottom", "#cursor2");
circleAnimation();

document.getElementById("cursor2").addEventListener("click", () => {
  console.log("Button Clicked!");
});

const page6Link = document.querySelector("#page6__heading");
const page6Underline = document.querySelector("#underline");

page6Link.addEventListener("mouseenter", () => {
  page6Underline.classList.add("animate_underline");
});

page6Link.addEventListener("mouseleave", () => {
  page6Underline.classList.remove("animate_underline");
});

page2Animation(".footer__top_upper_left", {
  y: -200,
  stagger: 0.2,
  duration: 1,
  scrollTrigger: {
    trigger: "#footer",
    scroller: "main",
    start: "top 40%",
    end: "top 45%",
    scrub: 2,
  },
});

page2Animation(".footer__top_upper_right", {
  y: -200,
  stagger: 0.2,
  duration: 1,
  scrollTrigger: {
    trigger: "#footer",
    scroller: "main",
    start: "top 40%",
    end: "top 45%",
    scrub: 2,
  },
});

page2Animation(".footer__top_bottom_left", {
  y: -200,
  stagger: 0.2,
  duration: 1,
  scrollTrigger: {
    trigger: "#footer",
    scroller: "main",
    start: "top 40%",
    end: "top 45%",
    scrub: 2,
  },
});

page2Animation(".footer__top_bottom_right", {
  y: -200,
  stagger: 0.2,
  duration: 1,
  scrollTrigger: {
    trigger: "#footer",
    scroller: "main",
    start: "top 40%",
    end: "top 45%",
    scrub: 2,
  },
});

page2Animation("#page6__heading", {
  y: 120,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  scrollTrigger: {
    trigger: "#page6",
    scroller: "main",
    start: "top 40%",
    end: "top 37%",
    scrub: 2,
  },
});

gsap.from(".footer__bottom a h1 span", {
  y: -200,
  opacity: 0,
  stagger: 0.2,
  delay: -0.5,
  duration: 1,
  scrollTrigger: {
    trigger: "#footer",
    scroller: "main",
    start: "top 40%",
    end: "top 45%",
    scrub: 2,
  },
});
