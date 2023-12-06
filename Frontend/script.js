

// ---------------------------calender-functionality--------------------------------------------

const currentDate = document.querySelector(".current-date");
const previousNext = document.querySelectorAll(".icons img");
const days = document.querySelector(".days");
const tasksCount = document.querySelector(".middle-section");

let date = new Date();
let dayOfMonth = ('0' + date.getDate()).slice(-2);

let currYear = date.getFullYear();
let currMonth = date.getMonth();

//time
let hours = date.getHours();
let ampm = hours < 12 ? 'am':'pm';
hours = hours % 12;
hours = hours ? hours : 12; //hours 0 should be 12
let minutes = date.getMinutes();
minutes = minutes < 10 ? '0'+minutes: minutes;
let time = hours +':'+ minutes + ampm;
console.log("time :", time);

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let renderCalendar = () => {
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); // last date of month
  let firstDay = new Date(currYear, currMonth, 1).getDay(); // first day of month
  console.log(firstDay);
  let lastDay = new Date(currYear, currMonth, lastDateOfMonth).getDay(); // last day of month
  const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate(); // last date of last month

  let liTag = "";

  for (let i = firstDay; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    // if date is actual date then highlight it
    let isToday =
      i === date.getDate() &&
      currMonth === date.getMonth() &&
      currYear === date.getFullYear()
        ? "active"
        : "";
    liTag += `<li class='${isToday}'>${i}</li>`;
  }

  for (let i = lastDay; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDay + 1}</li>`;
  }
  currentDate.innerHTML = `${months[currMonth % 12]} ${currYear}`;
  days.innerHTML = liTag;
};

renderCalendar();

previousNext.forEach((icon) => {
  icon.addEventListener("click", () => {
    // when click then showing element
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    renderCalendar();
  });
});

// ------------------------------------------todo-functionality-------------------------------

let taskModule = document.querySelector(".task-main-module");

function todayTask(){
let taskInfo = JSON.parse(localStorage.getItem("data"));
let count = 0;
let entireInfo  = [];
taskInfo.forEach((value, i)=>{
  if(taskInfo[i].date === dayOfMonth){
  count++;
  entireInfo.push(`
  <div class="task-module">
  <div class='task-module-title'>
    <p class='task-title same'>${taskInfo[i].task}</p>
    <p class='priority-p'>${taskInfo[i].priority === 'high' ? 'Important': ''}</p>
  </div>
  <div class="middel-of-task">
  <div>
      <p class='para same'>${taskInfo[i].desc}</p>
  </div>
  <div class="btn-of-task">
      <input type="checkbox" id="complete_${i}" onclick="handleCheckboxClick(${i})" name="complete" value="Completed">
      <img onclick="deleteTask(${i})" src="./Asset/bin_484611.png" alt="img">
  </div>
  </div>
  <div class="date-of-task">
  <p>${taskInfo[i].date === dayOfMonth ? `${dayOfMonth}/${currMonth}/${currYear}` : `${taskInfo[i].date}/${currMonth}/${currYear}`}</p>
  <p>${taskInfo[i].time}</p>
  </div>
  </div>
  `);
  }
  taskModule.innerHTML = entireInfo.join('');
  tasksCount.innerHTML = 
  ` <div>
    <p>All tasks(${count} tasks)</p>
  </div>`
})
}
todayTask(); 
// -----------------delete-functionality------------------



let localData = JSON.parse(localStorage.getItem('data'));   // local data
console.log("data: ",localData);

function deleteTask(i){
  localData.splice(i,1); // removiing one item
  localStorage.setItem('data',JSON.stringify(localData));
  todayTask(); 
}


// ----------------------------completed-tasks------------------------------------------

function completedTask(){
  console.log('Completed task clicked');
}



// ----------------------------important-tasks-shortlist------------------------------------

function importantTask(){

    let taskInfo = JSON.parse(localStorage.getItem("data"));
    let count = 0;
    console.log(taskInfo);
    let entireInfo  = [];
    taskInfo.filter((value, i)=>{
      if(value.priority.toLowerCase() === 'high'){
        count++;
        entireInfo.push(`
        <div class="task-module">
        <div class='task-module-title'>
          <p class='task-title same'>${taskInfo[i].task}</p>
          <p class='priority-p'>${taskInfo[i].priority === 'high' ? 'Important': ''}</p>
        </div>
        <div class="middel-of-task">
        <div>
            <p class='para same'>${taskInfo[i].desc}</p>
        </div>
        <div class="btn-of-task">
            <input type="checkbox" id="complete_${i}" onclick="handleCheckboxClick(${i})" name="complete" value="Completed">
            <img onclick="deleteTask(${i})" src="./Asset/bin_484611.png" alt="img">
        </div>
        </div>
        <div class="date-of-task">
        <p>${taskInfo[i].date === dayOfMonth ? `${dayOfMonth}/${currMonth}/${currYear}` : `${taskInfo[i].date}/${currMonth}/${currYear}`}</p>
        <p>${taskInfo[i].time}</p>
        </div>
        </div>
        `);
      }
     
      taskModule.innerHTML = entireInfo.join('');
      tasksCount.innerHTML = 
      ` <div>
        <p>All tasks(${count} tasks)</p>
      </div>`
    })
    console.log("importantTask working")
}

// ------------------------------------------allTask-module---------------------------------------

function allTask(){

  console.log('All task Cliked');

  let taskInfo = JSON.parse(localStorage.getItem("data"));
  console.log(taskInfo);
  let count = 0;
  let entireInfo  = [];
  taskInfo.filter((value, i)=>{
      count++;
      entireInfo.push(`
      <div class="task-module">
      <div class='task-module-title'>
        <p class='task-title same'>${taskInfo[i].task}</p>
        <p class='priority-p'>${taskInfo[i].priority === 'high' ? 'Important': ''}</p>
      </div>
      <div class="middel-of-task">
      <div>
          <p class='para same'>${taskInfo[i].desc}</p>
      </div>
      <div class="btn-of-task">
          <input type="checkbox" id="complete_${i}" onclick="handleCheckboxClick(${i})" name="complete" value="Completed" onclick=''>
          <img onclick="deleteTask(${i})" src="./Asset/bin_484611.png" alt="img">
      </div>
      </div>
      <div class="date-of-task">
      <p>${taskInfo[i].date === dayOfMonth ? `${dayOfMonth}/${currMonth}/${currYear}` : `${taskInfo[i].date}/${currMonth}/${currYear}`}</p>
      <p>${taskInfo[i].time}</p>
      </div>
      </div>
      `);
   
    taskModule.innerHTML = entireInfo.join('');
    tasksCount.innerHTML = 
    ` <div>
      <p>All tasks(${count} tasks)</p>
    </div>`
  })
  console.log("importantTask working")
}


// -------------------------search-functionality---------------------------

let searchInput = document.getElementById('search');

searchInput.addEventListener('input', function() {
    let search = searchInput.value.toLowerCase();
    filterTasks(search);
});

function filterTasks(search) {
    let taskInfo = JSON.parse(localStorage.getItem("data"));
    console.log("data :",taskInfo);
    let count = 0;
    let entireInfo = [];

    taskInfo.filter((value, i) => {
        // Check if the task contains the search text
        if (
            taskInfo[i].task.toLowerCase().includes(search) ||
            taskInfo[i].desc.toLowerCase().includes(search)
        ) {
            count++;
            entireInfo.push(`
                <div class="task-module">
                    <div class='task-module-title '>
                        <p class='task-title same'>${taskInfo[i].task}</p>
                        <p class='priority-p'>${
                            taskInfo[i].priority === 'high' ? 'Important' : ''
                        }</p>
                    </div>
                    <div class="middel-of-task">
                        <div>
                            <p class='para same'>${taskInfo[i].desc}</p>
                        </div>
                        <div class="btn-of-task">
                            <input type="checkbox" id="complete_${i}" onclick="handleCheckboxClick(${i})" name="complete" value="Completed">
                            <img onclick="deleteTask(${i})" src="./Asset/bin_484611.png" alt="img">
                        </div>
                    </div>
                    <div class="date-of-task">
                        <p>${taskInfo[i].date === dayOfMonth ? `${dayOfMonth}/${currMonth}/${currYear}` : `${taskInfo[i].date}/${currMonth}/${currYear}`}</p>
                        <p>${taskInfo[i].time}</p>
                    </div>
                </div>
            `);
        }
    });

    taskModule.innerHTML = entireInfo.join('');
    tasksCount.innerHTML = `
        <div>
            <p>All tasks(${count} tasks)</p>
        </div>`;
}



// ----------------------------checkbox-functionality---------------------------------------

function handleCheckboxClick(i) {
  console.log("id",i);
  let checkboxId = `complete_${i}`;
  let sameElements = document.querySelectorAll(`#${checkboxId} .same`);
  
  sameElements.forEach((element) => {
    element.classList.toggle("cross");
  });

  console.log('CheckBoxClicked');
}

