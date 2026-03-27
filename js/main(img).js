$(function(){
  const visualBtn = ".visual-pagination button";
  const vSlide = ".v-slide";
  let activeNum = 0;

  // 2번 버튼을 클릭하면 visualWrap의 left좌표가 -100%
  $(visualBtn).click(function(){
    // 비주얼 페이지 버튼 초기화
    $(visualBtn).removeClass("active");
    $(this).addClass("active");

    activeNum = $(this).data("index");
    // "" 안에 들어가면 무조건 문자로 인식 없으면 상수로 인식 / () 안에 "" 안에 들어가는 값은 상수로 들어감.
    // 모든 슬라이드 초기화
    $(vSlide).removeClass("active prev");
    $(vSlide).each(function(){
      const slideIndex = $(this).data("index");
      // const는 한 번 지정 후 다시 변수 지정하면 에러남
      if(slideIndex < activeNum){
        $(this).addClass("prev");
      } 
    });
    
    // 선택한 번호의 슬라이드 활성화
    let currentSlide = $(vSlide).eq(activeNum);
    currentSlide.addClass("active");
  });
});
