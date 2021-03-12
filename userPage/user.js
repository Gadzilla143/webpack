const userInfBlock = document.getElementById("user-inf-general")
const userInf = document.getElementById("user-inf")

// Запрашиваем информацию о выбранном пользователе (id хранится в localStorage)
const getUser = () => {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    "http://127.0.0.1:3000/user/" + localStorage.getItem("userId"),
    true
  );
  request.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        displayUserInformation(JSON.parse(this.responseText));
      } else {
        alert(this.status + ': ' + this.statusText);
      }
    }
  };
  request.send(this.responseText);
};

const getDate = (data) => {
    const date = new Date(data)
    return (
        (date.getDate() + 1) + '.' +
        (date.getMonth() + 1) + '.' +
        date.getFullYear()
    )
}

const displayUserInformation = (data) => {
    userInf.innerHTML = `
        <img src='${data.avatar}'>
        <p>- ${data.gender} -</p>
        <h2>${data.name}</h2>
        <p>${data.fullName}</p>
        <div class="user-inf__btn">
            <p>ID ${data.employee_id}</p>
            <p>Buisness card</p>
        </div>
    `
    userInfBlock.innerHTML = `
        <div class="user-general-inf__block" style="height: 80px;">
            <h2>GENERAL INFO</h2>
            <hr />
            <div class="field">
                <h5>Department</h5>
                <p>${data.department}</p>
            </div>
            <div class="field">
                <h5>Room</h5>
                <p>${data.room}</p>
            </div>
        </div>
        <div class="user-general-inf__block" style="height: 160px;">
            <h2>CONTACTS</h2>
            <hr />
            <div class="field">
                <h5>Home Phone</h5>
                <p>${data.employee_id}</p>
            </div>
            <div class="field">
                <h5>Mobile phone</h5>
                <p>${data.phone}</p>
            </div>
            <div class="field">
                <h5>Email</h5>
                <p>${data.email}</p>
            </div>
            <div class="field">
                <h5>Skype ID</h5>
                <p>${data.skype}</p>
            </div>
            <div class="field">
                <h5>C-Number</h5>
                <p>${data.cNumber}</p>
            </div>
        </div>
        <div class="user-general-inf__block" style="height: 80px;">
            <h2>PROFILE INFO</h2>
            <hr />
            <div class="field">
                <h5>Hire date</h5>
                <p>${
                    getDate(data.date_hired)
                }</p>
            </div>
            <div class="field">
                <h5>Status</h5>
                <p>${data.status}</p>
            </div>
        </div>
        <div class="user-general-inf__block" style="height: 120px;">
            <h2>EMPLOYMENT INFO</h2>
            <hr />
            <div class="field">
                <h5>State of employment period</h5>
                <p>${
                    getDate(data.employment_period[0].start_date)
                }</p>
            </div>
            <div class="field">
                <h5>Working day duration</h5>
                <p>${data.employment_period[0].working_day_duration} hours</p>
            </div>
            <div class="field">
                <h5>State of employment period 2</h5>
                <p>${
                    getDate(data.employment_period[1].start_date)
                }</p>
            </div>
            <div class="field">
                <h5>Working day duration</h5>
                <p>${data.employment_period[1].working_day_duration} hours</p>
            </div>
        </div>
        <div class="user-general-inf__block" style="height: 80px;">
            <h2>ADDITIONAL MODULES</h2>
            <hr />
            <div class="field">
                <h5>Vacation</h5>
                <p>${data.vacantion}</p>
            </div>
            <div class="field">
                <h5>Address book redesign</h5>
                <p>${data.address_book_redesign}</p>
            </div>
        </div>
    `;
}

getUser();