/**
       * 사용자가 입력하는 키보드 이벤트를 감지하고, 0~9까지 숫자, 백스페이스, delete 키, 좌우 방향키만 입력 받도록 하는 함수
       * @param {event} e
       * @returns
       */
 function checkInt(e) {
  if (
    !(
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      e.keyCode == 8 ||
      e.keyCode == 46 ||
      e.keyCode == 37 ||
      e.keyCode == 39
    )
  ) {
    e.preventDefault(); //이벤트가 keyup까지 진행이 되어야 input 필드에 값이 입력이 되는데, 여기서 이벤트를 중단 시켜서 값이 입력되지 않도록 중단시킴.
  }
}

/**
 * 사용자가 입력하는 키보드 이벤트를 감지하고, 한글이 입력되면 한글을 삭제하는 함수
 * @param {event} e
 * @returns
 */
function checkKr(e) {
  e.target.value = e.target.value.replace(/[^0-9]/gi, "");
}