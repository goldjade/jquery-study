/** @format */

window.onload = function () {
  // 멀티미디어 로드완료시 실행
};
$(document).ready(function () {
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
  //타이머 필요없으면 setInterval 있는거 주석처리하자

  //타이머 멈춤(탭 컨텐츠에 마우스 오버)
  tabWrap.mouseenter(function () {
    clearInterval.setInterval(tabTimer);
  });
  //타이머 재시작(탭 컨텐츠에 마우스 아웃)
  tabWrap.mouseleave(function () {
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
      // a 태그 href 막기
      e.preventDefault();
      tabStart = index;
      changeTabMenu();
    });
  });
});
