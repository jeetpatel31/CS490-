const calendar = document.querySelector(".calendar"),
date = document.querySelector(".date"),
daysContainer = document.querySelector(".days"),
prev = document.querySelector(".prev"),
next = document.querySelector(".next"),
todayBtn = document.querySelector(".today-btn"),
gotoBtn = document.querySelector(".goto-btn"),
dateInput = document.querySelector(".date-input"),
eventDay = document.querySelector(".event-day"),
eventDate = document.querySelector(".event-date"),
eventsContainer = document.querySelector(".events"),
addEventBtn = document.querySelector(".add-event"),
addEventWrapper = document.querySelector(".add-event-wrapper "),
addEventCloseBtn = document.querySelector(".close "),
addEventTitle = document.querySelector(".event-name "),
addEventFrom = document.querySelector(".event-time-from "),
addEventTo = document.querySelector(".event-time-to "),
addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
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

// const eventsArr = [
//   {
//     day: 13,
//     month: 11,
//     year: 2022,
//     events: [
//       {
//         title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
//         time: "10:00 AM",
//       },
//       {
//         title: "Event 2",
//         time: "11:00 AM",
//       },
//     ],
//   },
// ];

const eventsArr = [];
getEvents();
console.log(eventsArr);

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
const firstDay = new Date(year, month, 1);
const lastDay = new Date(year, month + 1, 0);
const prevLastDay = new Date(year, month, 0);
const prevDays = prevLastDay.getDate();
const lastDate = lastDay.getDate();
const day = firstDay.getDay();
const nextDays = 7 - lastDay.getDay() - 1;

date.innerHTML = months[month] + " " + year;

let days = "";

for (let x = day; x > 0; x--) {
  days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
}

for (let i = 1; i <= lastDate; i++) {
  //check if event is present on that day
  let event = false;
  eventsArr.forEach((eventObj) => {
    if (
      eventObj.day === i &&
      eventObj.month === month + 1 &&
      eventObj.year === year
    ) {
      event = true;
    }
  });
  if (
    i === new Date().getDate() &&
    year === new Date().getFullYear() &&
    month === new Date().getMonth()
  ) {
    activeDay = i;
    getActiveDay(i);
    updateEvents(i);
    if (event) {
      days += `<div class="day today active event">${i}</div>`;
    } else {
      days += `<div class="day today active">${i}</div>`;
    }
  } else {
    if (event) {
      days += `<div class="day event">${i}</div>`;
    } else {
      days += `<div class="day ">${i}</div>`;
    }
  }
}

for (let j = 1; j <= nextDays; j++) {
  days += `<div class="day next-date">${j}</div>`;
}
daysContainer.innerHTML = days;
addListner();
}

//function to add month and year on prev and next button
function prevMonth() {
month--;
if (month < 0) {
  month = 11;
  year--;
}
initCalendar();
}

function nextMonth() {
month++;
if (month > 11) {
  month = 0;
  year++;
}
initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day
function addListner() {
const days = document.querySelectorAll(".day");
days.forEach((day) => {
  day.addEventListener("click", (e) => {
    getActiveDay(e.target.innerHTML);
    updateEvents(Number(e.target.innerHTML));
    activeDay = Number(e.target.innerHTML);
    //remove active
    days.forEach((day) => {
      day.classList.remove("active");
    });
    //if clicked prev-date or next-date switch to that month
    if (e.target.classList.contains("prev-date")) {
      prevMonth();
      //add active to clicked day afte month is change
      setTimeout(() => {
        //add active where no prev-date or next-date
        const days = document.querySelectorAll(".day");
        days.forEach((day) => {
          if (
            !day.classList.contains("prev-date") &&
            day.innerHTML === e.target.innerHTML
          ) {
            day.classList.add("active");
          }
        });
      }, 100);
    } else if (e.target.classList.contains("next-date")) {
      nextMonth();
      //add active to clicked day afte month is changed
      setTimeout(() => {
        const days = document.querySelectorAll(".day");
        days.forEach((day) => {
          if (
            !day.classList.contains("next-date") &&
            day.innerHTML === e.target.innerHTML
          ) {
            day.classList.add("active");
          }
        });
      }, 100);
    } else {
      e.target.classList.add("active");
    }
  });
});
}

todayBtn.addEventListener("click", () => {
today = new Date();
month = today.getMonth();
year = today.getFullYear();
initCalendar();
});

dateInput.addEventListener("input", (e) => {
dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
if (dateInput.value.length === 2) {
  dateInput.value += "/";
}
if (dateInput.value.length > 7) {
  dateInput.value = dateInput.value.slice(0, 7);
}
if (e.inputType === "deleteContentBackward") {
  if (dateInput.value.length === 3) {
    dateInput.value = dateInput.value.slice(0, 2);
  }
}
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
console.log("here");
const dateArr = dateInput.value.split("/");
if (dateArr.length === 2) {
  if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
    month = dateArr[0] - 1;
    year = dateArr[1];
    initCalendar();
    return;
  }
}
alert("Invalid Date");
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
const day = new Date(year, month, date);
const dayName = day.toString().split(" ")[0];
eventDay.innerHTML = dayName;
eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//function update events when a day is active
function updateEvents(date) {
let events = "";
eventsArr.forEach((event) => {
  if (
    date === event.day &&
    month + 1 === event.month &&
    year === event.year
  ) {
    event.events.forEach((event) => {
      events += `<div class="event">
          <div class="title">
            <i class="fas fa-circle"></i>
            <h3 class="event-title">${event.title}</h3>
          </div>
          <div class="event-time">
            <span class="event-time">${event.time}</span>
          </div>
      </div>`;
    });
  }
});
if (events === "") {
  events = `<div class="no-event">
          <h3>No Events</h3>
      </div>`;
}
eventsContainer.innerHTML = events;
saveEvents();
}

//function to add event
addEventBtn.addEventListener("click", () => {
addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
  addEventWrapper.classList.remove("active");
}
});

//allow 50 chars in eventtitle
addEventTitle.addEventListener("input", (e) => {
addEventTitle.value = addEventTitle.value.slice(0, 60);
});

function defineProperty() {
var osccred = document.createElement("div");
osccred.style.position = "absolute";
osccred.style.bottom = "0";
osccred.style.right = "0";
osccred.style.fontSize = "10px";
osccred.style.color = "#ccc";
osccred.style.fontFamily = "sans-serif";
osccred.style.padding = "5px";
osccred.style.background = "#fff";
osccred.style.borderTopLeftRadius = "5px";
osccred.style.borderBottomRightRadius = "5px";
osccred.style.boxShadow = "0 0 5px #ccc";
document.body.appendChild(osccred);
}

defineProperty();

//allow only time in eventtime from and to
addEventFrom.addEventListener("input", (e) => {
addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
if (addEventFrom.value.length === 2) {
  addEventFrom.value += ":";
}
if (addEventFrom.value.length > 5) {
  addEventFrom.value = addEventFrom.value.slice(0, 5);
}
});

addEventTo.addEventListener("input", (e) => {
addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
if (addEventTo.value.length === 2) {
  addEventTo.value += ":";
}
if (addEventTo.value.length > 5) {
  addEventTo.value = addEventTo.value.slice(0, 5);
}
});

//function to add event to eventsArr
addEventSubmit.addEventListener("click", () => {
const eventTitle = addEventTitle.value;
const eventTimeFrom = addEventFrom.value;
const eventTimeTo = addEventTo.value;
if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
  alert("Please fill all the fields");
  return;
}

//check correct time format 24 hour
const timeFromArr = eventTimeFrom.split(":");
const timeToArr = eventTimeTo.split(":");
if (
  timeFromArr.length !== 2 ||
  timeToArr.length !== 2 ||
  timeFromArr[0] > 23 ||
  timeFromArr[1] > 59 ||
  timeToArr[0] > 23 ||
  timeToArr[1] > 59
) {
  alert("Invalid Time Format");
  return;
}

const timeFrom = convertTime(eventTimeFrom);
const timeTo = convertTime(eventTimeTo);

//check if event is already added
let eventExist = false;
eventsArr.forEach((event) => {
  if (
    event.day === activeDay &&
    event.month === month + 1 &&
    event.year === year
  ) {
    event.events.forEach((event) => {
      if (event.title === eventTitle) {
        eventExist = true;
      }
    });
  }
});
if (eventExist) {
  alert("Event already added");
  return;
}
const newEvent = {
  title: eventTitle,
  time: timeFrom + " - " + timeTo,
};
console.log(newEvent);
console.log(activeDay);
let eventAdded = false;
if (eventsArr.length > 0) {
  eventsArr.forEach((item) => {
    if (
      item.day === activeDay &&
      item.month === month + 1 &&
      item.year === year
    ) {
      item.events.push(newEvent);
      eventAdded = true;
    }
  });
}

if (!eventAdded) {
  eventsArr.push({
    day: activeDay,
    month: month + 1,
    year: year,
    events: [newEvent],
  });
}

console.log(eventsArr);
addEventWrapper.classList.remove("active");
addEventTitle.value = "";
addEventFrom.value = "";
addEventTo.value = "";
updateEvents(activeDay);
//select active day and add event class if not added
const activeDayEl = document.querySelector(".day.active");
if (!activeDayEl.classList.contains("event")) {
  activeDayEl.classList.add("event");
}
});

//function to delete event when clicked on event
eventsContainer.addEventListener("click", (e) => {
if (e.target.classList.contains("event")) {
  if (confirm("Are you sure you want to delete this event?")) {
    const eventTitle = e.target.children[0].children[1].innerHTML;
    eventsArr.forEach((event) => {
      if (
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
      ) {
        event.events.forEach((item, index) => {
          if (item.title === eventTitle) {
            event.events.splice(index, 1);
          }
        });
        //if no events left in a day then remove that day from eventsArr
        if (event.events.length === 0) {
          eventsArr.splice(eventsArr.indexOf(event), 1);
          //remove event class from day
          const activeDayEl = document.querySelector(".day.active");
          if (activeDayEl.classList.contains("event")) {
            activeDayEl.classList.remove("event");
          }
        }
      }
    });
    updateEvents(activeDay);
  }
}
});

//function to save events in local storage
function saveEvents() {
localStorage.setItem("events", JSON.stringify(eventsArr));
}

//function to get events from local storage
function getEvents() {
//check if events are already saved in local storage then return event else nothing
if (localStorage.getItem("events") === null) {
  return;
}
eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

function convertTime(time) {
//convert time to 24 hour format
let timeArr = time.split(":");
let timeHour = timeArr[0];
let timeMin = timeArr[1];
let timeFormat = timeHour >= 12 ? "PM" : "AM";
timeHour = timeHour % 12 || 12;
time = timeHour + ":" + timeMin + " " + timeFormat;
return time;
}

// Add this function to prevent propagation of click events
function stopPropagationOnCalendarElements() {
const calendarElements = [
  calendar,
  daysContainer,
  prev,
  next,
  todayBtn,
  gotoBtn,
  dateInput,
  eventDay,
  eventDate,
  eventsContainer,
  addEventBtn,
  addEventWrapper,
  addEventCloseBtn,
  addEventTitle,
  addEventFrom,
  addEventTo,
  addEventSubmit,
  // Add other calendar elements here
];

calendarElements.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});
}

// Call the function after initializing the calendar
initCalendar();
stopPropagationOnCalendarElements();





























window.onload = addStyleToSvg;


let infoDiv;

function addStyleToSvg() {
  addStyleFor("svg-front");
  addStyleFor("svg-back");
}

function addWorkoutEvent(bodyPart) {
// Use the globally selected date
const selectedDate = new Date(year, month, activeDay);
const dateString = selectedDate.toISOString().split('T')[0];

// Event title
const eventTitle = `Workout for ${bodyPart}`;

// Check if an event for the selected date already exists
let dateExists = false;
for (let i = 0; i < eventsArr.length; i++) {
  if (eventsArr[i].day === selectedDate.getDate() && eventsArr[i].month === selectedDate.getMonth() + 1 && eventsArr[i].year === selectedDate.getFullYear()) {
    dateExists = true;
    eventsArr[i].events.push({ title: eventTitle, time: 'All Day' });
    break;
  }
}

// If no event for the selected date exists, create a new entry
if (!dateExists) {
  eventsArr.push({
    day: selectedDate.getDate(),
    month: selectedDate.getMonth() + 1,
    year: selectedDate.getFullYear(),
    events: [{ title: eventTitle, time: 'All Day' }]
  });
}

// Update the calendar and events display
initCalendar();
updateEvents(selectedDate.getDate());
}



function addStyleFor(svgFilePrefix) {
  let svgObject = document.getElementById(svgFilePrefix);
  let svgDocument = svgObject.contentDocument;

  if (!infoDiv) {
    infoDiv = document.createElement('div');
    infoDiv.classList.add('info-div');
    infoDiv.style.display = 'none';

    document.body.appendChild(infoDiv);
}


  let svgElements = svgDocument.getElementsByClassName("hover");

  for (let i = 0; i < svgElements.length; i++) {
      const svgElement = svgElements[i];
      const children = svgElement.children;

      const originalColors = [];

      for (let i = 0; i < children.length; i++) {
          originalColors[i] = children[i].style.fill;
      }

      svgElement.addEventListener("mouseover", function () {
          svgElement.style.cursor = "pointer";
          
          for (let i = 0; i < children.length; i++) {
              const svgItem = children[i];
              svgItem.style.fill = "red";
              svgItem.style.transition = "transform 0.3s ease";
              svgItem.style.transform = "translate(4px, -4px)";
          }
      });

      svgElement.addEventListener("mouseout", function () {
          svgElement.style.cursor = "default";
      
          for (let i = 0; i < children.length; i++) {
              const svgItem = children[i];
              svgItem.style.fill = originalColors[i];
              svgItem.style.transition = "transform 0.3s ease";
              svgItem.style.transform = "translate(0px, 0px)";
          }
      });

      svgElement.addEventListener("click", function (event) {
          svgElement.style.cursor = "default";

          for (let i = 0; i < children.length; i++) {
              const svgItem = children[i];
              svgItem.style.fill = originalColors[i];
          }
          let bodyPartName = '';
          
          if (svgFilePrefix === "svg-front"){
             if (svgElement.id === 'necks') {
                bodyPartName = 'Neck';
                infoDiv.innerHTML = `<button onclick="addWorkoutEvent('${bodyPartName}')">Add this Workout to Calendar</button>
                <h2>Information about the neck</h2>
                <p>Here is some information about the neck...</p>
                <video controls autoplay width="100%" height="auto">
                   <source src="vids/neck.mp4" type="video/mp4">
                   Your browser does not support the video tag.
                </video>`;
             } else if (svgElement.id === 'chest') {
                bodyPartName = 'chest';
                infoDiv.innerHTML = `<button onclick="addWorkoutEvent('${bodyPartName}')">Add this Workout to Calendar</button>
                <h2>Information about the chest</h2>
                <p>Here is some information about the chest...</p>
                <video controls autoplay width="100%" height="auto">
                   <source src="vids/chest.mp4" type="video/mp4">
                   Your browser does not support the video tag.
                </video>
                <video controls autoplay width="100%" height="auto">
                   <source src="vids/chest.mp4" type="video/mp4">
                   Your browser does not support the video tag.
                </video>`;
                
             } else if (svgElement.id === 'shoulder') {
                bodyPartName = 'shoulder';
                infoDiv.innerHTML = `<button onclick="addWorkoutEvent('${bodyPartName}')">Add this Workout to Calendar</button>
                <h2>Information about the shoulder</h2>
                <p>Here is some information about the shoulder...</p>
                <video controls autoplay width="100%" height="auto">
                   <source src="vids/sholder.mp4" type="video/mp4">
                   Your browser does not support the video tag.
                </video>`;
             } else if (svgElement.id === 'arms') {
                bodyPartName = 'arms';
                infoDiv.innerHTML = `<button onclick="addWorkoutEvent('${bodyPartName}')">Add this Workout to Calendar</button>
                <h2>Information about the arms</h2>
                <p>Here is some information about the arms...</p>
                <video controls autoplay width="100%" height="auto">
                   <source src="vids/biceps.mp4" type="video/mp4">
                   Your browser does not support the video tag.
                </video>`;
             } else if (svgElement.id === 'stomach') {
                bodyPartName = 'stomach';
                infoDiv.innerHTML = `<button onclick="addWorkoutEvent('${bodyPartName}')">Add this Workout to Calendar</button>
                <h2>Information about the stomach</h2>
                <p>Here is some information about the stomach...</p>
                <video controls autoplay width="100%" height="auto">
                   <source src="vids/abs.mp4" type="video/mp4">
                   Your browser does not support the video tag.
                </video>`;
             } else if (svgElement.id === 'legs') {
                bodyPartName = 'legs';
                infoDiv.innerHTML = `<button onclick="addWorkoutEvent('${bodyPartName}')">Add this Workout to Calendar</button>
                <h2>Information about the legs</h2>
                <p>Here is some information about the legs...</p>
                <video controls autoplay width="100%" height="auto">
                   <source src="vids/legs.mp4" type="video/mp4">
                   Your browser does not support the video tag.
                </video>`;
             }
          } else if (svgFilePrefix === "svg-back") {
             if (svgElement.id === 'shoulder-back') {
                bodyPartName = 'shoulder-back';
                infoDiv.innerHTML = `<button onclick="addWorkoutEvent('${bodyPartName}')">Add this Workout to Calendar</button>
                <h2>Information about the back sholder</h2>
                <p>Here is some information about the back sholder...</p>
                <video controls autoplay width="100%" height="auto">
                   <source src="vids/back sholder.mp4" type="video/mp4">
                   Your browser does not support the video tag.
                </video>`;
             } else if (svgElement.id === 'back-inner') {
                bodyPartName = 'back-inner';
                infoDiv.innerHTML = `<button onclick="addWorkoutEvent('${bodyPartName}')">Add this Workout to Calendar</button>
                <h2>Information about the back inner back</h2>
                <p>Here is some information about the back inner back...</p>
                <video controls autoplay width="100%" height="auto">
                   <source src="vids/innerback.mp4" type="video/mp4">
                   Your browser does not support the video tag.
                </video>`;
             } else if (svgElement.id === 'arms-back') {
                bodyPartName = 'arms-back';
                infoDiv.innerHTML = `<button onclick="addWorkoutEvent('${bodyPartName}')">Add this Workout to Calendar</button>
                <h2>Information about the back triceps</h2>
                <p>Here is some information about the back triceps...</p>
                <video controls autoplay width="100%" height="auto">
                   <source src="vids/triceps.mp4" type="video/mp4">
                   Your browser does not support the video tag.
                </video>`;
             } else if (svgElement.id === 'back-outer') {
                bodyPartName = 'back-outer';
                infoDiv.innerHTML = `<button onclick="addWorkoutEvent('${bodyPartName}')">Add this Workout to Calendar</button>
                <h2>Information about the back outer back</h2>
                <p>Here is some information about the back outer back...</p>
                <video controls autoplay width="100%" height="auto">
                   <source src="vids/outer back.mp4" type="video/mp4">
                   Your browser does not support the video tag.
                </video>`;
             } else if (svgElement.id === 'butt') {
                infoDiv.innerHTML = 'Information about the butt goes here';
             } else if (svgElement.id === 'legs-back') {
                infoDiv.innerHTML = 'Information about the legs-back goes here';
             }
          }

          infoDiv.style.display = 'block';
          infoDiv.style.top = '50%';
          infoDiv.style.left = '50%';
          infoDiv.style.transform = 'translate(-50%, -50%)';

          event.stopPropagation();
      });
  }

  infoDiv.addEventListener("click", function(event) {
    event.stopPropagation(); // Prevent click events on infoDiv from propagating
});

document.addEventListener("click", function(event) {
 if (!infoDiv.contains(event.target)) {
     infoDiv.style.display = 'none';
 }
});





}