const time = document.querySelector('.time');
const firstDate = document.querySelector('.date');

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    setTimeout(showTime, 1000);
    time.textContent = currentTime;
  };

  showTime();



function showDate() {
   const lastDate = new Date();
   const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
    const currentDate = lastDate.toLocaleDateString('de-De', options);
    console.log(currentDate);  
    firstDate.textContent = currentDate;  
};

showDate();
