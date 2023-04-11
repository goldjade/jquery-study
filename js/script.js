window.onload = function () {
  // 멀티미디어 로드완료시 실행
};
$(document).ready(function () {
  // 주메뉴 작업
  // 1. nav 를 저장한다.
  const nav = $(".nav");
  // 2. gnb 를 저장한다.
  const gnb = $(".gnb");
  // 3. gnb > li 를 저장한다.
  const gnbLis = $(".gnb>li");

  // 4. gnb > li 에 mouseenter 하면
  // 해당하는 장소의 ul.depth2 를 보여준다.
  $.each(gnbLis, function (index, item) {
    // $(item)
    $(this).mouseenter(function () {
      // let depth2 = $("gnb>li>.depth2"); 버그
      let depth2 = $(this).find(".depth2");
      depth2.show();
    });
  });

  // 5. gnb > li 에 mouseleave 하면
  // 해당하는 장소의 ul.depth2 를 숨긴다.
  $.each(gnbLis, function (index, item) {
    $(this).mouseleave(function () {
      let depth2 = $(this).find(".depth2");
      depth2.hide();
    });
  });
  // 메뉴 전체 보기 기능
  const showAll = $(".showAll");
  // 버튼을 클릭하면 .depth2 전부 보여라
  // 버튼을 클릭하면 .depth2 전부 숨겨라
  showAll.click(function () {
    $(".depth2").toggle();
  });
  // gnb 에 마우스 올리면 .depth2 보여라
  // gnb 에 마우스 아웃하면 .depth2 숨기기
  gnb.mouseenter(function () {
    $(".depth2").show(); // .depth2 보이게 함
  });
  gnb.mouseleave(function () {
    $(".depth2").hide(); // .depth2 숨김
  });

  // document.querySelector("body").classList.add("modalActive")
  $("body").addClass("modalActive");

  // 문서로딩 완료(js, css, html)
  // 모달창 기능
  //   const mbt = document.querySelector(".modalBt")
  //   mbt.addEventListener("click", function(){
  //   });
  const mbt = $(".modalBt");
  const mWin = $(".modalWin");
  //   const mbtClose = $(".modalWin a");
  const mbtClose = mWin.find("a");

  mbt.click(function (e) {
    e.preventDefault();
    // 캡처링 및 버블링 막기
    e.stopPropagation();
    // display: block;
    // mWin.show();
    mWin.fadeIn(300);

    $("body").addClass("modalActive");
  });
  mbtClose.click(function (e) {
    e.preventDefault();
    // 캡처링 및 버블링 막기
    e.stopPropagation();
    mWin.fadeOut(300);

    // document.querySelector("body").classList.remove("modalActive")
    $("body").removeClass("modalActive");
  });

  //   mWin.fadeIn(300);
  mWin.hide();

  // 탭메뉴
  let tabStart = 2; // 자동 초기 포커스
  const tabWrap = $(".tabWrap");
  const tabMenuBts = $(".tabMenu a");
  const tabBoxs = $(".tabBox");
  const tabSpeed = 3000;
  let tabTimer = setInterval(changeTabMenu, tabSpeed);

  // 타이머를 멈춘다.(탭 컨텐츠에 마우스 오버)
  tabWrap.mouseenter(function () {
    clearInterval(tabTimer);
  });
  // 타이머를 재시작.(탭 컨텐츠에 마우스 아웃)
  tabWrap.mouseleave(function () {
    clearInterval(tabTimer);
    tabTimer = setInterval(changeTabMenu, tabSpeed);
  });

  function changeTabMenu() {
    // 일단 탭내용들은 모두 class 는 제거
    tabBoxs.removeClass("tabFocus");
    // index 에 해당하는 탭내용만 class 추가
    tabBoxs.eq(tabStart).addClass("tabFocus");
    // 일단 모든 탭메뉴의 class 는 제거
    tabMenuBts.removeClass("tabFocus");
    // 클릭된 a 태그만 class 추가
    tabMenuBts.eq(tabStart).addClass("tabFocus");
    // tabStart 증가
    tabStart = tabStart + 1;
    if (tabStart > 3) {
      tabStart = 0;
    }
    console.log(tabStart);
  }

  changeTabMenu();
  // 클릭 기능
  // tabMenuBts[0].click();
  // tabMenuBts[1].click();
  // tabMenuBts[2].click();
  // tabMenuBts[3].click();

  // tabMenuBts.forEach(function(item, index) {})
  $.each(tabMenuBts, function (index, item) {
    $(item).click(function (e) {
      // go class 를 가지고 있니?
      const go = $(this).hasClass("go");
      if (go) return;

      // a 태그 href 막기
      e.preventDefault();

      tabStart = index;
      changeTabMenu();
    });
  });
});

$(document).ready(function () {
  const bannerWrap = $(".bannerWrap");
  // const banner = $(".bannerWrap .banner");
  const banner = bannerWrap.find(".banner");
  // const bannerSlide = $(".bannerWrap .banner .banner-slide");
  const bannerSlide = banner.find(".banner-slide");
  // 배너의 너비
  const bannerW = bannerWrap.width();
  // 배너의 높이
  const bannerH = bannerWrap.height();
  // 배너의 배치
  const bannerDir = "left"; // up, down, right, left
  // 총 배너 개수
  const bannerTotal = bannerSlide.length;

  // 배너의 실제 배치
  switch (bannerDir) {
    case "up":
      $.each(bannerSlide, function (index, item) {
        $(item).css({ left: 0, top: index * bannerH });
      });
      slideMoveUp();
      break;
    case "down":
      $.each(bannerSlide, function (index, item) {
        $(item).css({ left: 0, top: -index * bannerH });
      });
      slideMoveDown();
      break;
    case "left":
      $.each(bannerSlide, function (index, item) {
        $(item).css({ left: index * bannerW, top: 0 });
      });
      slideMoveLeft();
      break;
    case "right":
      $.each(bannerSlide, function (index, item) {
        $(item).css({ left: -index * bannerW, top: 0 });
      });
      slideMoveRight();
      break;
    default:
      $.each(bannerSlide, function (index, item) {
        $(item).css({ left: 0, top: 0, display: "none", zIndex: -100 });
        if (index === 0) {
          $(item).css({ zIndex: 99, display: "block" });
        }
      });
      slideMove();
      break;
  }

  function slideMoveUp() {$.each(bannerSlide, function (index, item) {})}
  function slideMoveDown() {$.each(bannerSlide, function (index, item) {})}
  function slideMoveLeft() {
    $.each(bannerSlide, function (index, item) {
      // 각각의 슬라이드 JQuery 대상으로 저장
      let tempSlise = $(item)
      // 왼쪽으로 도착해야 할 위치를 파악한다
      // 현재 left 위치값 - 300(배너 넓이 이미지임)
      let nowX = tempSlise.css("left")
      //nowX는 글자 숫자로 바꿔줘야해
      let tgX = parseInt(nowX) - bannerW
      // 조건에 따라 슬라이드 들을 가장 left  끝쪽으로 위치 시킨다.

 if (tgX < -bannerW) {
  // 1. 슬라이드를 제일 가장 left 끝쪽으로 위치시킨다.
  tempSlise.css("left", bannerW * (bannerTotal - 1));
  // 2. 새롭게 이동할 값으로 계산
  tgX = bannerW * (bannerTotal - 2);
}
      console.log(tgX);
      tempSlise.animate({ left: tgX }, 1000, function () {
        if(index === 8){
        slideMoveLeft()
        }
      });
    })
  }
  function slideMoveRight() {$.each(bannerSlide, function (index, item) {})}
  function slideMove() {$.each(bannerSlide, function (index, item) {})}
});