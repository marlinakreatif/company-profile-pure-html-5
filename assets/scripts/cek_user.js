const USER_CACHE_KEY = "user_data";
let CurrentUser = null;

function checkUserData() {
  let user_data;
  if (sessionStorage.getItem(USER_CACHE_KEY) !== null) {
    user_data = sessionStorage.getItem(USER_CACHE_KEY);
  } else {
    user_data = window.prompt("Hallo, Siapa Nama Kamu ?");
    if (!user_data) {
      user_data = "Anonymous";
    }
    alert(`Hallo Selamat Datang : ${user_data}`);
    sessionStorage.setItem(USER_CACHE_KEY, user_data);
  }
  CurrentUser = user_data;
}

checkUserData();
