// for input range
document.documentElement.classList.add('js');
// addEventListener(
//   'input',
//   (e) => {
//     let _t = e.target;
//     _t.style.setProperty('--val', +_t.value);
//   },
//   false
// );
/////////////////////////
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const volume = document.getElementById('volume');
const volumeCaption = document.querySelector('.volumeCaption');

//play & pause video
function toggleVideoStatus() {
  if (video.paused) video.play();
  else video.pause();
}

//update play/pause icon
function updatePlayIcon() {
  if (video.paused) play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  else play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
}

//update progress & timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  progress.style.setProperty('--val', +progress.value);

  //get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }

  //get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

//set video time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

//stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);

volume.addEventListener('change', (e) => {
  video.volume = volume.value;
  if (volume.value > 0.5) {
    volumeCaption.classList.remove('fa-volume-off');
    volumeCaption.classList.remove('fa-volume-down');
    volumeCaption.classList.add('fa-volume-up');
  } else if (volume.value < 0.5) {
    volumeCaption.classList.remove('fa-volume-off');
    volumeCaption.classList.remove('fa-volume-up');
    volumeCaption.classList.add('fa-volume-down');
  }
  if (volume.value == 0) {
    volumeCaption.classList.remove('fa-volume-down');
    volumeCaption.classList.add('fa-volume-off');
  }
  volume.style.setProperty('--valVol', +volume.value * 100);
});
