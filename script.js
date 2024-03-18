import songs from "./data.js";

const music = document.getElementById("audio-source");
const seekBar = document.querySelector(".music-seek-bar");
const songName = document.querySelector(".songplayname");
const artistName = document.querySelector(".songplayartist");
const coverImg = document.querySelector(".coverImg");
const currentMusicTime = document.querySelector(".starttime");
const musicDuration = document.querySelector(".endtime");
//select buttons
const repeatBtn = document.querySelector(".repeatbtn");
const playBtn = document.querySelector(".playbtn");
const pauseBtn = document.querySelector(".pausebtn");
const stopBtn = document.querySelector(".stopbtn");
const musicVolume = document.querySelector(".volume-seek-bar");
const queue = [...document.querySelectorAll(".singlesong")];
const songDuration = [...document.querySelectorAll(".songduration")];

let currentMusic = 0;

playBtn.addEventListener("click", () => {
  music.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});

pauseBtn.addEventListener("click", () => {
  music.pause();
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

const formteTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) min = `0` + min;

  let sec = Math.floor(time % 60);
  if (sec < 10) sec = `0` + sec;

  return `${min} : ${sec}`;
};

const setMusic = (i) => {
  currentMusic = i;
  seekBar.value = 0;
  let song = songs[i];
  music.src = song.path;
  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  coverImg.src = song.cover;

  setTimeout(() => {
    seekBar.max = music.duration;
    musicDuration.innerHTML = formteTime(music.duration);
  }, 300);
  currentMusicTime.innerHTML = "00 : 00";

  queue.forEach((item) => {
    item.children[2].classList.remove("active");
  });
  queue[i].children[2].classList.add("active");
};

setInterval(() => {
  seekBar.value = music.currentTime;
  currentMusicTime.innerHTML = formteTime(music.currentTime);
  musicDuration.innerHTML =
    `-` + formteTime(music.duration - music.currentTime);

  if (Math.floor(music.duration) === Math.floor(seekBar.value)) {
    if (currentMusic >= songs.length - 1) {
      currentMusic = 0;
    } else {
      currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
  }
}, 1000);

seekBar.addEventListener("change", () => {
  music.currentTime = seekBar.value;
});

setMusic(currentMusic);

repeatBtn.addEventListener("click", () => {
  music.currentTime = 0;
});
stopBtn.addEventListener("click", () => {
  music.currentTime = 0;
  pauseBtn.click();
});

musicVolume.addEventListener("change", () => {
  music.volume = musicVolume.value;
});

queue.forEach((item, i) => {
  let audio = new Audio();
  audio.src = songs[i].path;
  setTimeout(() => {
    songDuration[i].innerHTML = formteTime(audio.duration);
  }, 700);

  item.addEventListener("click", () => {
    setMusic(i);
    playBtn.click();
  });
});
