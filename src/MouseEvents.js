import { MAX_BOARD_LENGTH } from './board-setup';

const mouseEvents = (() => {
  let isHorizontal = true;
  let validCoordinates = [];

  const getisHorizontal = () => isHorizontal;
  const getValidCoordinates = () => {
    return validCoordinates;
  };

  const rotate = () => {
    return isHorizontal ? (isHorizontal = false) : (isHorizontal = true);
  };

  const checkTotal = (
    TOTAL_SPACE_OCCUPIED,
    selectedCoordinate,
    CURRENT_LENGTH,
    event
  ) => {
    if (TOTAL_SPACE_OCCUPIED <= MAX_BOARD_LENGTH) {
      for (let shipLength = 0; shipLength < CURRENT_LENGTH; shipLength++) {
        let firstNumber = +selectedCoordinate[0];
        let secondNumber = +selectedCoordinate[2];
        isHorizontal
          ? (firstNumber += shipLength)
          : (secondNumber += shipLength);

        const coordinate = document.querySelector(
          `[data-coordinate="${firstNumber},${secondNumber}"]`
        );
        if (coordinate.getAttribute('class') === 'mark') {
          event.target.style.cursor = 'not-allowed';
        }
        coordinate.classList.add('hover');
        validCoordinates.push(coordinate);
      }
      return;
    }
    event.target.style.cursor = 'not-allowed';
    return false;
  };

  const rotateBtn = document.getElementById('rotate');
  rotateBtn.addEventListener('click', rotate);

  return {
    rotate,
    getisHorizontal,
    checkTotal,
    getValidCoordinates,
    validCoordinates,
  };
})();

export { mouseEvents };
