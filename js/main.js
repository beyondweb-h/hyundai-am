$(function(){
  const hd = "#hd-header";
  let viewportH = window.innerHeight;
  let scTop = $(window).scrollTop();
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



  // 2. 최대최소 구간 좌표 구해서 조건문으로 완성
  // let secMin = [];
  // let secMax = [];
  // const sec = $(".main-section");
  // for(let i = 0; i < 5; i += 2 ){
  //   secMin[i] = sec.eq(i).offset().top;
  //   secMax[i] = sec.eq(i).offset().top + sec.eq(i).height();
  // }
  // $(window).scroll(function(){
  //   scTop = $(window).scrollTop();
  //   if(scTop >= secMin[0] && scTop < secMax[0]){ //어두운 섹션을 보고 있을 때
  //     $(hd).addClass("dark-mode");
  //   } else if(scTop >= secMin[2] && scTop < secMax[2]) {
  //     $(hd).addClass("dark-mode");
  //   } else if(scTop >= secMin[4] && scTop < secMax[4]) {
  //     $(hd).addClass("dark-mode");
  //   } else {
  //     $(hd).removeClass("dark-mode");
  //   }
  // });

  // 히어로 구현
  const visualBtn = ".visual-pagination button";
  const vSlide = ".v-slide";
  const vTxt = ".v-txt";
  let activeNum = 0;
  $(visualBtn).click(function(){
    // 비주얼 페이지 버튼 초기화
    $(visualBtn).removeClass("active");
    $(this).addClass("active");
    $(vTxt).removeClass("animate");
    activeNum = $(this).data("index");
    // 모든 슬라이드 초기화
    $(vSlide).removeClass("active prev");
    $(vSlide).each(function(){
      const video = $(this).find("video").get(0);
      video.pause();
      video.currentTime = 0;
      const slideIndex = $(this).data("index");
      if(slideIndex < activeNum){
        $(this).addClass("prev");
      }
    });

    // 선택한 번호의 슬라이드 활성화
    let currentSlide = $(vSlide).eq(activeNum);
    currentSlide.addClass("active");

    let txt = $(vSlide).eq(activeNum).find(vTxt);
    setTimeout(() => {
      txt.addClass("animate");
    }, 500);

    let video = currentSlide.find("video").get(0);
    video.play();

    //startTextAnimation(currentSlide);

    // 텍스트 애니메이션
    function startTextAnimation(vSlide) {
      const text = $(vSlide).find(".v-txt");
      text.removeClass("animate");
      setTimeout(() => {
        text.addClass("animate");
      }, 500);
    }
  }); //버튼 클릭했을 때
}); //전체 제이쿼리