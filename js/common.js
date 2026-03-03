$(document).ready(function(){
  //변수선언
  const body ="body";
  let viewportW, viewportH;
  const mainMenu = ".depth1";
  const subMenu = ".depth2";
  let speed = 300;
  // 사이트맵, 모바일 GNB구현
  const sitemap =".sitemap";
  const familySite =".family-site";
  const smBtn = ".sitemap-btn";
  const fmBtn = ".family-btn";
  const closeBtn = ".close-btn";
  const smMainMenu = ".sm-depth1 > a";
  const smSubMenu = ".sm-depth2";

  // 반응형 구현
  rwd();
  $(window).resize(function(){
    rwd();
    smReset();
  });
  

  // lang-btn 클릭 시 lang-list show
  // 언어선택 : 언어선택 버튼을 클릭하면 언어리스트가 슬라이드(토글)
  $(".lang-btn").click(function(){
    // $(".lang-list").slideToggle(300);
    $(this).next().slideToggle(speed);
  });
  // PC GNB 구현 : depth1에 마우스가 진입하면 depth2가 슬라이드다운
  $(mainMenu).mouseenter(function(){
    $(this).children(subMenu).stop().slideDown(speed);
  });
  // PC GNB 구현 : depth1에 마우스가 떠나면 depth2가 슬라이드업
  $(mainMenu).mouseleave(function(){
    $(this).children(subMenu).stop().slideUp(speed);
  });

  // 사이트맵 버튼을 클릭하면
  $(smBtn).click(function() {
    $(body).addClass("fixed");
    $(sitemap).addClass("active");
  });

  // 패밀리사이트 버튼을 클릭하면
  $(fmBtn).click(function() {
    $(body).addClass("fixed");
    $(familySite).addClass("active");
  });

  //메인메뉴를 클릭하면
  $(smMainMenu).click(function() {
    if(!$(body).hasClass("pc")) {
      $(this).parent().siblings().find(smSubMenu).slideUp(300);
      $(this).parent().find(smSubMenu).slideToggle(300);
    }
  });
  
  // 사이트맵 버튼을 클릭하면
  $(smBtn).click(function() {
    $(body).addClass("fixed");
    $(sitemap).addClass("active");
  });

  //닫기버튼 클릭
  $(closeBtn).click(function() {
    $(body).removeClass("fixed");
    $(this).parent().removeClass("active");
  });

  function rwd() {
    viewportW = window.innerWidth;
    viewportH = window.innerHeight;
    // console.log(viewportW, viewportH);
    if(viewportW < 768){
      $(body).removeClass("tb pc").addClass("mo");
    } else if(viewportW >= 768 && viewportW < 1280 ){
      $(body).removeClass("mo pc").addClass("tb");
    } else {
      $(body).removeClass("mo tb").addClass("pc");
    }
  }

  function smReset() {
    $(smSubMenu).attr("style", "");
  }
});