const musicAudio = document.querySelector("#music-audio")

const playPauseButton = document.querySelector("#play-pause-button")

const previousButton = document.querySelector("#previous-button")

const nextButton = document.querySelector("#next-button")

const musicProgress = document.querySelector("#music-progress")

const musicProgressFill = document.querySelector("#music-progress-fill")

const musicCurrentTime = document.querySelector("#music-current-time")

const musicDuration = document.querySelector("#music-duration")

const musicTitle = document.querySelector("#music-title")

// =========================
// PLAYLIST
// =========================

const playlist = [

{
    title: "Brilho Eterno",
    file: "assets/Music-Audio/Brilho Eterno Remake Beat.mp3"
},

{
    title: "Horizonte",
    file: "assets/Music-Audio/5- Horizonte.mp3"
},

{
    title: "Pela Primeira Vez",
    file: "assets/Music-Audio/1- Pela Primeira Vez.mp3"
},

{
    title: "Desejos",
    file: "assets/Music-Audio/4- Hikki.mp3"
},

{
    title: "Noite Estrelada",
    file: "assets/Music-Audio/3- Noite Estrelada.mp3"
},


{
    title: "So Queria Ser Amado Por Voce",
    file: "assets/Music-Audio/queriia ser amado por voce.mp3"
},


]

let currentMusic = 0

// =========================

function loadMusic(index){

    musicAudio.src = playlist[index].file

    musicTitle.textContent = playlist[index].title

    musicAudio.load()

}

function formatMusicTime(time){

    const minutes = Math.floor(time / 60)

    const seconds = Math.floor(time % 60)

    return `${minutes}:${String(seconds).padStart(2,"0")}`

}

function updateMusicDuration(){

    if(!musicAudio.duration){

        return

    }

    musicDuration.textContent = formatMusicTime(musicAudio.duration)

}

function updateMusicProgress(){

    if(!musicAudio.duration){

        return

    }

    const progress = (musicAudio.currentTime / musicAudio.duration) * 100

    musicProgressFill.style.width = `${progress}%`

    musicCurrentTime.textContent = formatMusicTime(musicAudio.currentTime)

}

function toggleMusic(){

    if(musicAudio.paused){

        musicAudio.play()

        playPauseButton.textContent = "⏸"

        return

    }

    musicAudio.pause()

    playPauseButton.textContent = "▶"

}

function seekMusic(event){

    if(!musicAudio.duration){

        return

    }

    const width = musicProgress.clientWidth

    const click = event.offsetX

    musicAudio.currentTime = (click / width) * musicAudio.duration

}

function nextMusic(){

    currentMusic++

    if(currentMusic >= playlist.length){

        currentMusic = 0

    }

    loadMusic(currentMusic)

    musicAudio.play()

    playPauseButton.textContent = "⏸"

}

function previousMusic(){

    currentMusic--

    if(currentMusic < 0){

        currentMusic = playlist.length - 1

    }

    loadMusic(currentMusic)

    musicAudio.play()

    playPauseButton.textContent = "⏸"

}

// =========================

loadMusic(currentMusic)

playPauseButton.addEventListener("click", toggleMusic)

previousButton.addEventListener("click", previousMusic)

nextButton.addEventListener("click", nextMusic)

musicAudio.addEventListener("loadedmetadata", updateMusicDuration)

musicAudio.addEventListener("timeupdate", updateMusicProgress)

musicAudio.addEventListener("ended", nextMusic)

musicProgress.addEventListener("click", seekMusic)