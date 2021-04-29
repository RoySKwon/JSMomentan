const nameContainer = document.querySelector(".js-name");

function paintName(acountName) {
  //user name 입력후에, name입력창 안보이게
  nameContainer.innerHTML = "";

  // HTML span 만들고 name 을 innerHTML로 할당후  appendChild
  const title = document.createElement("span");
  title.className = "name__text";
  title.innerHTML = `Hello ${acountName}`;

  nameContainer.appendChild(title);
}

function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const input = form.querySelector("input");
  const value = input.value;

  //Local Storage 에 저장
  localStorage.setItem("username", value);
  // userName save and greeting paint
  paintName(value);
  return;
}

function askName() {
  //  userName input 생성
  const input = document.createElement("input");
  input.clasName = "name__input";
  input.type = "text";
  input.placeholder = "Type your name here";

  //form을 만들고 submit prevent를 위해 이벤트리스너 사용
  const form = document.createElement("form");
  form.addEventListener("submit", handleSubmit);

  //form에 input을 넣고 , 최상단에 form을 넣고
  form.appendChild(input);
  nameContainer.appendChild(form);
  return;
}

function loadName() {
  const userName = localStorage.getItem("username");

  console.log("userName:", userName); //checking User

  if (userName === null) {
    // userName이 없으면 등록
    askName();
  } else {
    // userName이 있으면 greeting paint
    paintName(userName);
  }
  return;
}

function init() {
  loadName();
  return;
}

init();
