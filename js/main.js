$(function(){
  // 변수
  const body = $("body");

  //푸터 복제
  let ftSection = "<section class=\"section fp-auto-height\" id=\"main-ft\"></section>";
  let ftElement = $(".footer-container").clone();
  let fullPageCreated = false;

  fullPageResize();
  $(window).resize(function(){
    fullPageResize();
  });
  
  function createFullPage() {
    if(!fullPageCreated) {
      $("#hd-main").append(ftSection);
      $("#main-ft").append(ftElement);
      $("#hd-main").fullpage({
        //풀페이지 옵션 추가
        licenseKey: null,
        menu: "#fp-nav-hor",
        anchors: ["Main","Product","Sustainability","News","Career","Info"],
        afterLoad: function(origin, destination, direction){
          let loadedSection = this;
          //console.log(destination.index);
          $("#pf-gnb-hor > a").removeClass("active");
          $("#pf-gnb-hor").fadeIn(300);
          if(destination.index == 0) {
            $("#hd-header").addClass("dark-mode");
            $("#pf-gnb-hor").removeClass("light");
            $("#pf-gnb-hor > a").eq(0).addClass("active");
          } else if(destination.index == 1){
            $("#hd-header").removeClass("dark-mode");
            $("#pf-gnb-hor").addClass("light");
            $("#pf-gnb-hor > a").eq(1).addClass("active");
          } else if(destination.index == 2){
            $("#hd-header").addClass("dark-mode");
            $("#pf-gnb-hor").removeClass("light");
            $("#pf-gnb-hor > a").eq(2).addClass("active");
          } else if(destination.index == 3){
            $("#hd-header").removeClass("dark-mode");
            $("#pf-gnb-hor").addClass("light");
            $("#pf-gnb-hor > a").eq(3).addClass("active");
          } else if(destination.index == 4){
            $("#hd-header").addClass("dark-mode");
            $("#pf-gnb-hor").removeClass("light");
            $("#pf-gnb-hor > a").eq(4).addClass("active");
          } else if(destination.index == 5){
            $("#pf-gnb-hor").fadeOut(300);
          }
        }
      });
      fullPageCreated = true;
    }
  }

  function fullPageResize(){
    if(!body.hasClass("mo")) {
      createFullPage();
    } else {
      $("#main-ft").remove();
      $.fn.fullpage.destroy("all");
      fullPageCreated = false;
    }
  }

}); //전체 제이쿼리 