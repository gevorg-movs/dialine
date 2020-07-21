let count = $(".lastpack");

// Проверяем, есть ли значение lastpack в localStorage, если localStorage пустой, то устанавливаем значение 60 по умолчанию
if (!localStorage.getItem("lastpack")) {
  localStorage.setItem("lastpack", "60");
}

// Проебегаем по всем местам, где указывается количество и меняем значение на значение из localStorage
count.each(function () {
  $(this).text(localStorage.getItem("lastpack"));
});

// Функция для обновления значения
function update() {
  //   Если значение меньше 1, то устанавливаем обратно на 60
  if (localStorage.getItem("lastpack") < 8) {
    clearInterval(interval);
  } else {
    let newVal = localStorage.getItem("lastpack") - 1;
    localStorage.setItem("lastpack", newVal);

    // Проебегаем по всем местам, где указывается количество и меняем значение на значение из localStorage
    count.each(function () {
      $(this).text(localStorage.getItem("lastpack"));
    });
  }
  // Уменьшаем на 1 и устанавливаем новое значение
}

//   Запускаем цикл, где каждые 15 секунд уменьшается кол-во товара
let interval = setInterval(update, 10000);

// Маска для телефона
let maskPhone = $(document.querySelectorAll("#phonemask"));

maskPhone.each(function () {
  $(this).mask("+7 (999) 99-99-999");
});

// Определение местоположения пользователя
navigator.geolocation.getCurrentPosition(showPosition); // Запрашиваем местоположение, и в случае успеха вызываем функцию showPosition
function showPosition(position) {
  let latitude = position.coords.latitude || null,
    longitude = position.coords.longitude || null;

  // Координаты Москвы для теста
  (ltm = "55.7522"), (lgm = "37.6156");

  getAddress(latitude, longitude)
    .then((address) => {
      // Получаем адрес из ответа и помещаем в массив
      let addresInArray = address.formatted_address.split(",");
      // Помещаем город и страну в отдельные переменные
      let yourCity = addresInArray[1].trim();
      let yourCountry = addresInArray[2].trim();
      // Если страна не Россия, то пишем Страны СНГ, если же Россия, то выводим название города
      if (yourCountry != "Россия") {
        $("#youraddress").text("в Странах СНГ");
      } else {
        $("#youraddress").text(`в городе ${yourCity}`);
      }
    })
    .catch((error) => console.error(error));
}

// Функция для получения адреса
function getAddress(latitude, longitude) {
  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();

    let method = "GET";
    let url =
      "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBl2io2-GM-pqPrvbY9DRusso_hP-vHha0&latlng=" +
      latitude +
      "," +
      longitude +
      "&sensor=true";
    let async = true;

    request.open(method, url, async);
    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        if (request.status == 200) {
          let data = JSON.parse(request.responseText);
          let address = data.results[0];
          resolve(address);
        } else {
          reject(request.status);
        }
      }
    };
    request.send();
  });
}

// Модальное окно
const modalWrap = $(".modal-wrap"),
  modal = $(".modal"),
  modalClose = $(".m-close");
modalWrap.hide();
modal.hide();

modalClose.click(function () {
  modalWrap.hide();
  modal.hide();
});
//
wleave = false;
$(window).mouseout(function (e) {
  if (!wleave && e.clientY < 0) {
    modalWrap.show();
    modal.show();
    wleave = true;
  }
});
