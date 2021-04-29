const clock = document.querySelector(".js-clock .clock__text");

function getTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const days = now.getDate();

  //Not Yet : days, seconds
  const time = `${hours < 10 ? `0${hours}` : hours} : ${
    minutes < 10 ? `0${minutes}` : minutes
  }`;

  // console.log(time); // checking  time
  clock.innerHTML = time;
  return;
}

function init() {
  //   debugger;
  getTime();
  setInterval(getTime, 1000);
  return;
}

init();
