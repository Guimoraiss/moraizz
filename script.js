
function togglemode() {
 const html = document.documentElement


html.classList.toggle("lightmode")

}

const musicAudio = document.querySelector("#music-audio")
const playPauseButton = document.querySelector("#play-pause-button")
const musicProgress = document.querySelector("#music-progress")
const musicProgressFill = document.querySelector("#music-progress-fill")
const musicCurrentTime = document.querySelector("#music-current-time")
const musicDuration = document.querySelector("#music-duration")

function formatMusicTime(time) {
 const minutes = Math.floor(time / 60)
 const seconds = Math.floor(time % 60)

 return `${minutes}:${String(seconds).padStart(2, "0")}`
}

function updateMusicDuration() {
 if (!musicAudio.duration) {
  return
 }

 musicDuration.textContent = formatMusicTime(musicAudio.duration)
}

function updateMusicProgress() {
 if (!musicAudio.duration) {
  return
 }

 const progress = (musicAudio.currentTime / musicAudio.duration) * 100

 musicProgressFill.style.width = `${progress}%`
 musicCurrentTime.textContent = formatMusicTime(musicAudio.currentTime)
}

function toggleMusic() {
 if (musicAudio.paused) {
  musicAudio.play()
  playPauseButton.textContent = "Pause"
  return
 }

 musicAudio.pause()
 playPauseButton.textContent = "Play"
}

function seekMusic(event) {
 if (!musicAudio.duration) {
  return
 }

 const progressWidth = musicProgress.clientWidth
 const clickPosition = event.offsetX

 musicAudio.currentTime = (clickPosition / progressWidth) * musicAudio.duration
}

playPauseButton.addEventListener("click", toggleMusic)
musicAudio.addEventListener("loadedmetadata", updateMusicDuration)
musicAudio.addEventListener("timeupdate", updateMusicProgress)
musicProgress.addEventListener("click", seekMusic)
