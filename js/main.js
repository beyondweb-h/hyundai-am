$(function(){
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