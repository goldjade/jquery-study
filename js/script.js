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
  const bannerDir = ""; // up, down, right, left
  // 총 배너 개수
  const bannerTotal = bannerSlide.length;
  // 슬라이드 타이머 생성
  let bannerId;
  // 슬라이드 이동 속도(1000 은 1초)
  let bannerSpeed = 1000;
  // 슬라이드 인터벌 시간(1000 은 1초)
  let bannerDelay = 500;
  // 앞쪽 z-index 관리
  let bannerFront = 0;
  // 뒷쪽 z-index 관리
  let bannerBack = 1;

  // 마우스 오버/아웃시 애니메이션 정지/재시작
  let bannerState = "start"; // "pause"
  bannerWrap.mouseenter(function () {
    bannerState = "pause";
  });
  bannerWrap.mouseleave(function () {
    bannerState = "start";
    switch (bannerDir) {
      case "up":
        break;
      case "down":
        break;
      case "left":
        // 항상 지우고 만든다.
        clearTimeout(bannerId);
        bannerId = setTimeout(slideMoveLeft, bannerSpeed);
        break;
      case "right":
        break;
      default:
        clearTimeout(bannerId);       
        bannerId = setTimeout(slideFade, bannerDelay);
        break;
    }
  });

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
      bannerId = setTimeout(slideMoveLeft, bannerDelay);
      break;
    case "right":
      $.each(bannerSlide, function (index, item) {
        $(item).css({ left: -index * bannerW, top: 0 });
      });
      slideMoveRight();
      break;
    default:
      $.each(bannerSlide, function (index, item) {
        $(item).css({ left: 0, top: 0, opacity: 0, zIndex: -100 });
        if (index === 0) {
          $(item).css({ zIndex: 99, opacity: 1 });
        }
      });
      bannerId = setTimeout(slideFade, bannerDelay);
      break;
  }

  function slideMoveUp() {
    $.each(bannerSlide, function (index, item) {});
  }
  function slideMoveDown() {
    $.each(bannerSlide, function (index, item) {});
  }
  function slideMoveLeft() {
    $.each(bannerSlide, function (index, item) {
      // 각각의 슬라이드 jQuery 대상으로 저장
      let tempSlise = $(item);
      // 왼쪽으로 도착해야 할 위치를 파악한다.
      // 현재 left 위치값 - 300
      let nowX = tempSlise.css("left");
      // nowX 는 글자입니다.
      let tgX = parseInt(nowX) - bannerW;
      // 조건에 따라서
      if (tgX < -bannerW) {
        // 1. 슬라이드를 제일 가장 left 끝쪽으로 위치시킨다.
        tempSlise.css("left", bannerW * (bannerTotal - 1));
        // 2. 새롭게 이동할 값으로 계산
        tgX = bannerW * (bannerTotal - 2);
      }
      tempSlise.animate({ left: tgX }, bannerSpeed, function () {
        clearTimeout(bannerId);
        // 배너의 상태를 읽고 조건에 맞으면 처리
        if (bannerState === "pause") {
          return;
        }
        bannerId = setTimeout(slideMoveLeft, bannerDelay);
      });
    });
  }
  function slideMoveRight() {
    $.each(bannerSlide, function (index, item) {});
  }
  function slideFade() {
    // 모든 슬라이드를 zIndex 를 낯추고, 안보기에 처리
    bannerSlide.css({ zIndex: -100, opacity: 0 });
    // 즉시, 앞쪽 슬라이드를 zIndex 가장 높고, 보이게
    bannerSlide.eq(bannerFront).css({ zIndex: 2, opacity: 1 });
    // 다음에 나와야 하는 슬라이드를 zIndex 를 주고, 보이게
    bannerSlide.eq(bannerBack).css({ zIndex: 1, opacity: 1 });
    // 가장 앞에 있는 슬라이드가 사라지면서 뒤쪽에 있는 슬라이드 보임
    bannerSlide
      .eq(bannerFront)
      .animate({ opacity: 0 }, bannerSpeed, function () {
        // 최종적으로  zindex 조절해 준다.
        bannerSlide.eq(bannerFront).css({ zIndex: -100 });
        bannerSlide.eq(bannerBack).css({ zIndex: 2 });
        // 앞쪽 변화 값
        bannerFront++;
        if (bannerFront >= bannerTotal) {
          bannerFront = 0;
        }
        // console.log("bannerFront", bannerFront);
        // 뒷쪽 변화 값
        bannerBack++;
        if (bannerBack >= bannerTotal) {
          bannerBack = 0;
        }
        // console.log("bannerBack", bannerBack);
        clearTimeout(bannerId);
        // 배너의 상태를 읽고 조건에 맞으면 처리
        if (bannerState === "pause") {
          return;
        }
        bannerId = setTimeout(slideFade, bannerDelay);
      });
  }
});