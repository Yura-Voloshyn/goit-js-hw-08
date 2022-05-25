// import Vimeo from 'Vimeo.Player';
import throttle from 'lodash.throttle';
const CURRENT_TIME_KEY = 'videoplayer-current-time';
const currentTimeStorage = JSON.parse(localStorage.getItem(CURRENT_TIME_KEY));

console.log(currentTimeStorage);
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

// iframe.addEventListener('play', evt => {
//   console.log(evt);
// });

player.on('play', function () {
  console.log('played the video!');
});

// player.on('timeupdate', function (e) {
//   console.log('time', e);
// });

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(evt) {
  localStorage.setItem(CURRENT_TIME_KEY, JSON.stringify(evt));
  //   console.log(time);
}

player
  .setCurrentTime(currentTimeStorage.seconds)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
