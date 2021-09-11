function swap(array, currentIndex, randomIndex) {
  const temp = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temp;
}

export function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    swap(array, currentIndex, randomIndex);
  }
  return array;
}
