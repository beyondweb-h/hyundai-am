$(document).ready(function () {
  // 변수 선언
  // var = 광역변수(잘 안씀)
  const body = $("body");
  const hd = "#hd-header";
  const ft = "#hd-footer";
  let bodyHeight = body.height();
  let viewportW = window.innerwidth; // 화면 크기 구하는 식 외울 것!!!
  let viewportH = window.innerHeight;
  // viewport - 문서가 열리는 창의 크기
  let scTop = $(window).scrollTop(); //화면이 스크롤되는 양
  let hdHeight = $(hd).height(); //.height() = 앞의 타킷의 높이를 알아오게하는 문법
  let ftHeight = $(ft).height();
  let ftTop = $(ft).offset().top; // offset = 떨어진 거리를 구함 / 속성은 () 없음
  const mainMenu = ".depth1";
  const subMenu = ".depth2";
  let speed = 300; //고칠 수 없는 상수
  const smBtn = ".sitemap-btn";
  const sitemap = ".sitemap";
  const familySite = ".family-site";
  const fmBtn = ".family-btn";
  const closedBtn = ".close-btn";
  const smMainMenu = ".sm-depth1 > a";
  const smSubMenu = ".sm-depth2";

  // 부드러운 스크롤
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);   

  //반응형 구현
  rwd();
  // 창의 크기가 조절되면
  $(window).resize(function () {
    rwd();
    smReset();
    bodyHeight = body.height();
    hdHeight = $(hd).height();
    ftHeight = $(ft).height();
  });

  $(window).scroll(function(){
    if(!body.hasClass("main") || body.hasClass("main mo")){ // 첫화면이 아니라면
      scTop = $(window).scrollTop(); //화면이 스크롤되는 양 업데이트
      if(scTop > hdHeight){ //화면에서 헤더가 보이지 않을 정도로 문서가 스크롤되면
        $(hd).addClass("fixed");
      } else {
        $(hd).removeClass("fixed");
      }
    } 
  });


  // 언어선택 : 언어선택 버튼을 클릭하면 언어리스트가 슬라이드(토글)
  $(".lang-btn").click(function () {
    $(this).next().slideToggle(speed);
  });
  // PC GNB구현 : depth1에 마우스가 진입하면 depth2가 슬라이드다운
  $(mainMenu).mouseenter(function () {
    $(this).children(subMenu).stop().slideDown(speed);
  });
  $(mainMenu).mouseleave(function () {
    $(this).children(subMenu).stop().slideUp(speed);
    // 애니메이션 메소드들(slideDown 등)은 앞에 stop()을 꼭 써야함(아니면 애니메이션들이 쌓임)
  });

  // 사이트맵, 모바일 GNB구현

  $(smMainMenu).click(function () {
    if (!body.hasClass("pc")) {
      // ! = not의 의미로 반대 속성 조건문 쓸 때 필요
      $(this).parent().siblings().find(smSubMenu).slideUp(300);
      $(this).next().slideToggle(300);
      // slideToggle - 너비는 건들지 않고 높이만 조절
      // show - 너비, 높이 다 같이 조절해서 초 넣으면 이상하게 보임
    }
  });

  $(smBtn).click(function () {
    body.addClass("fixed");
    $(sitemap).addClass("active");
  });

  $(fmBtn).click(function () {
    body.addClass("fixed");
    $(familySite).addClass("active");
  });

  $(closedBtn).click(function () {
    body.removeClass("fixed");
    $(this).parent().removeClass("active");
  });


  function rwd() { //해상도 표시
    viewportW = window.innerWidth;  //순수한 자바스크립트 문법
    viewportH = window.innerHeight;
    // console.log(viewportW, viewportH)
    // if(조건을 충족하면){실행}
    if (viewportW < 768) { //단위 안 쓰고 절대값 px로 읽음
      body.removeClass("tb pc").addClass("mo");
    } else if (viewportW >= 768 && viewportW < 1280) {
      body.removeClass("mo pc").addClass("tb");
    } else {
      body.removeClass("mo tb").addClass("pc");
    }
  }

  function smReset() {
    $(smSubMenu).attr("style", "");
    // "style 속성을 찾아서 없애버리는 문법"
    //attribute - 속성으로 a href=""의 a 속성이 href=""인 것
  }

});