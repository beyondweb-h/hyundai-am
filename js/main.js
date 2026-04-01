$(function () {
  //변수
  const body = $("body");
  const gotoTop = $(".gototop");
  const hd = "#hd-header";
  let scTop = $(window).scrollTop();

  //푸터 복제
  // let ftSection = "<section class='section fp-auto-height' id='main-ft'></section>"; 
  let ftSection = "<section class=\"section fp-auto-height\" id=\"main-ft\"></section>"; //''넣기 싫으면 \"\" 안에 노드 넣어서 쓸 수 있음
  let ftElement = $(".footer-container").clone();
  let fullPageCreated = false; //풀페이지 만들어 졌는지 확인

  normalFunction();
  fullPageResize();
  $(window).resize(function () {
    normalFunction();
    fullPageResize();
  });

  function createdFullPage() { // 풀페이지가 없다면 풀페이지를 만들라는 문법(리사이즈 때문에 만듦)
    if (!fullPageCreated) {
      $("#hd-main").append(ftSection);
      $("#main-ft").append(ftElement); // 풀페이지 만들어 지기 전에 먼저 시작되어야 함
      $("#hd-main").fullpage({
        //풀페이지 옵션 추가
        licenseKey: null,
        menu: "#fp-nav-hor",
        anchors: ["Main", "Product", "Sustainability", "News", "Career", "Info"],
        afterLoad: function (origin, destination, direction) {
          let loadedSection = this;
          // console.log(destination.index); //종착지의 번호를 찍어본 것
          $("#pf-gnb-hor > a").removeClass("active"); // 모든 앵커의 스타일을 없애는 문법
          $("#pf-gnb-hor").fadeIn(300);

          if (destination.index == 0) {
            $("#hd-header").addClass("dark-mode"); // 1인덱스를 갔다가 0 인덱스로 왔을때를 대비해서 작성
            $("#pf-gnb-hor").removeClass("light");
            $("#pf-gnb-hor > a").eq(0).addClass("active");
          } else if (destination.index == 1) {
            $("#hd-header").removeClass("dark-mode");
            $("#pf-gnb-hor").addClass("light");
            $("#pf-gnb-hor > a").eq(1).addClass("active");
          } else if (destination.index == 2) {
            $("#hd-header").addClass("dark-mode");
            $("#pf-gnb-hor").removeClass("light");
            $("#pf-gnb-hor > a").eq(2).addClass("active");
          } else if (destination.index == 3) {
            $("#hd-header").removeClass("dark-mode");
            $("#pf-gnb-hor").addClass("light");
            $("#pf-gnb-hor > a").eq(3).addClass("active");
          } else if (destination.index == 4) {
            $("#hd-header").addClass("dark-mode");
            $("#pf-gnb-hor").removeClass("light");
            $("#pf-gnb-hor > a").eq(4).addClass("active");
          } else if (destination.index == 5) {
            $("#pf-gnb-hor").fadeOut(300);
          }
        }
      });
      fullPageCreated = true;
    }
  }

  function fullPageResize() {
    if (!body.hasClass("mo")) {
      createdFullPage();
      $(".gototop").click(function(){
				$.fn.fullpage.moveTo(1);
			});
    } else {
      $(".gototop").click(function(){
        $("html, body").stop().animate({
          scrollTop: 0
        }, 600, "linear");
      });
    
      if(fullPageCreated){
        $.fn.fullpage.destroy("all"); // 풀페이지 날리기
        $("#pf-gnb-hor").fadeOut(300);
        $("#main-ft").remove();
        fullPageCreated = false;
      }
    }
  }

  // 모바일에서만 실행
  function normalFunction(){ 
    if (body.hasClass("mo")) {
      // 각 섹션별 헤더디자인 구현(다크모드)
      // 1. each() 문법으로 완성 
      let sections = []; //각 섹션별(.wh) 위치를 담을 배열
      const updateSectionPos = () => {
        sections = [];
        $(".main-section.wh").each(function(){
          sections.push({
            top: $(this).offset().top,
            bottom: $(this).offset().top + $(this).height()
          });
        });
        //console.log(sections);
      }
      updateSectionPos();
      $(window).on("resize", updateSectionPos);
      $(window).on("scroll", () => {
        scTop = $(window).scrollTop();
        let isDark = false; //배경이 어두운 영역이 맞는지 확인
        for(const section of sections){
          if(scTop >= section.top && scTop < section.bottom){
            isDark = true;
            break;
          }
        };
        if(isDark == true){
          $(hd).addClass("dark-mode");
        } else {
          $(hd).removeClass("dark-mode");
        }
      });
    }
  }

  // 히어로 영역
  // swiper 플러그인
  const swiper = new Swiper('.swiper', {
    effect: "fade",
    loop: true,
    speed: 600,
    // autoplay: {
    //   delay: 7000, //영상의 길이(duration)가 7s
    //   disableOnInteraction: false,
    // },  
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
  });

  //영상 끝나면 넘기기
  const videos = document.querySelectorAll('.swiper-slide video');
  videos.forEach((video) => {
    video.addEventListener('ended', () => {
      swiper.slideNext();
    });
  });

  swiper.on('slideChangeTransitionEnd', () => {
    document.querySelectorAll('.swiper-slide video').forEach(video => {
      if (video.closest('.swiper-slide').classList.contains('swiper-slide-active')) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });

    // 현재 슬라이드의 텍스트 애니메이션 재생
    const activeSlide = document.querySelector('.swiper-slide-active');

    // 해당 슬라이드 안 요소만 실행
    activeSlide.querySelectorAll('.v-txt').forEach(el => {
      // reflow (애니메이션 재실행 핵심)
      void el.offsetWidth;

      el.classList.add('animate');
    });

  });


  
}); // 전체 제이쿼리


