function calcDuration(movieDurationInMinutes) {
  /*
  Вычисляет длительность фильма в часах и минутах
  и возвращает строку вида '2ч 14м'
  */
  const hours = Math.floor(movieDurationInMinutes / 60);
  const minutes = Math.floor(movieDurationInMinutes - hours * 60);
  return `${hours}ч ${minutes}м`;
}

export default calcDuration;
