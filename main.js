console.log("hey welcome to spotify!");

let listNumber = 0;
let currentSongIndex = 0;


//List of songs
let songs = [
    { songName: "warrior", songPath: "songs/02. Kajra Mohabbat Wala.mp3", songPoster: "posters/kajraposter.png" },
    { songName: "Har ek Muskurahat", songPath: "songs/Har Ek Muskurahat.mp3", songPoster: "posters/muskurahat.png" },
    { songName: "Samay Samajhayega", songPath: "songs/Samay Samjhayega(PaglaSongs).mp3", songPoster: "posters/samay.png" },
    { songName: "The Nights", songPath: "songs/The Nights.mp3", songPoster: "posters/nights.png" },
    { songName: "Rutho Jo Tum To", songPath: "songs/ruthojotum.mp3", songPoster: "posters/rutho.png" },
    { songName: "Rataana Lambiyan", songPath: "songs/Raatan Lambiyan.mp3", songPoster: "posters/ratan.png" },

]





//changing names of songs in song list

let songNames = document.getElementsByClassName('songNames');
let timestamp = document.getElementsByClassName('timestamp');
//console.log(timestamp);
let lengthofSongs = songNames.length;
let songLength = songs.length;
//console.log(lengthofSongs);
//console.log("songN" , songNames);

for (let i = 0; i < lengthofSongs; i++) {
    songNames[i].innerHTML = songs[i].songName;
    //songN[i].src = songs[i].songPath;
}


//poster

let poster = document.getElementsByClassName('songItems');
//console.log(poster[0].childNodes[1].src);
for (let i = 0; i < poster.length; i++) {
    poster[i].childNodes[1].src = songs[i].songPoster;
}

//background of current

let songItems = document.getElementsByClassName('songItems');

//console.log("songItem" , songItems);
//console.log(songItems[0].nodeType);


let bgofCurrent = () => {
    console.log(songItems[listNumber]);
    for (let i = 0; i < lengthofSongs; i++) {
        if (i == listNumber) {
            //console.log(i , " " , listNumber);
            songItems[listNumber].style.backgroundColor = "red";
        }
        else {
            songItems[i].style.backgroundColor = "white";
            //console.log(i , "else " , listNumber);
        }

    }
}
//function to on play button from list

let listOn = () => {
    //console.log(document.getElementsByClassName('timestamp')[0].children[0].attributes.name.value);
    let v = document.getElementsByClassName('timestamp')[listNumber].children[0].attributes.name;
    let val = document.getElementsByClassName('timestamp');
    console.log(v);
    for (let i = 0; i < lengthofSongs; i++) {
        if (i == listNumber) {
            console.log("outer if");
            console.log(i, " ", listNumber);
            /*if (v.value == "play-circle") {
                v.value = "pause-circle";
            }
            else {
                v.value = "play-circle";
            }*/
            val[listNumber].children[0].attributes.name.value = "pause-circle";
            console.log("hel", val[listNumber].children[0].attributes.name);
        }
        else {
            console.log("outer else");
            // if (v.value == "play-circle") {
            //     v.value = "pause-circle";
            // }
            // else {
            //     v.value = "play-circle";
            // }
            val[i].children[0].attributes.name.value = "play-circle";
        }


    }
    if (val[listNumber].children[0].attributes.name.value == "play-circle") {
        val[listNumber].children[0].attributes.name.value == "pause-circle";
        console.log("run1");
    }
    else {
        val[listNumber].children[0].attributes.name.value == "play-circle";
        console.log("run2");
    }
}

//listOn();

//progress bar
let progressBar = document.getElementById('progressBar');


//Audio
let audioElement = new Audio(songs[listNumber].songPath);
// audioElement.play();

//play stop next prev button
let playButton = document.getElementById('play');
let nextButton = document.getElementById('next');
let preButton = document.getElementById('pre');

//console.log(playButton.attributes.name.value);

//let isPlaying = false;
// if(playButton.attributes.name.value == "pause-circle"){
//     isPlaying = true ;
// }





//function to play audio
function playSong() {
    //console.log("song list number ",listNumber);
    audioElement.play();
}

//function to stop audio
function stopSong() {
    audioElement.pause();
}


let Playattr = playButton.attributes;

let currentSong = songs[listNumber].songName;

let nameS = document.getElementById('songName');
//console.log("song name is " , nameS.innerText);

//adding event listener to play button to stop and play song
//playButton
playButton.addEventListener('click', () => {

    //console.log('clicked')
    if (audioElement.paused || audioElement.currentTime <= 0) {
        Playattr[2].value = 'pause-circle';
        //console.log(audioElement);
        nameS.innerText = songs[listNumber].songName;
        bgofCurrent();
        listOn();
        playSong();
        audioElement.addEventListener('timeupdate', () => {
            //console.log('timeupdate');
            //console.log("event is called");
            let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
            document.getElementById('progressBar').value = progress;
            //console.log(parseInt(audioElement.currentTime));
        })
    }
    else {
        Playattr[2].value = 'play-circle';
        listOn();
        stopSong();
        //console.log("st")

    }

})

//event listener to change the current playing time of song
progressBar.addEventListener('change', () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
})


//assigning src of every song




for (let i = 0; i < lengthofSongs; i++) {
    let path = songs[i].songPath;
    songItems[i].setAttribute('src', path);

    //console.log("songItem with src" ,songItems[i]);
}




//adding nextPlay and previousPlay button

//console.log(nextButton);
//nextButton
nextButton.addEventListener('click', () => {

    if (listNumber < (songLength - 1)) {
        if (listNumber != songLength - 1) {
            audioElement.pause();
        }
        listNumber++;
        listOn();
        bgofCurrent();
        audioElement = new Audio(songs[listNumber].songPath);
        //console.log(audioElement);
        //console.log(listNumber);
        //console.log("cuurent play",audioElement);
        //console.log("is playing",audioElement);
        if (playButton.attributes.name.value == "pause-circle") {
            //isPlaying = true ;
            nameS.innerText = songs[listNumber].songName;
            listOn();
            bgofCurrent();
            audioElement.play();
        }


    }
    else {
        listNumber = 0;
        audioElement.pause();
        audioElement = new Audio(songs[listNumber].songPath);
        //console.log(listNumber);
        //console.log("cuurent play",audioElement);
        nameS.innerText = songs[listNumber].songName;
        bgofCurrent();
        listOn();
        audioElement.play();
    }
})
//previousButton
preButton.addEventListener('click', () => {
    if (listNumber > 0) {
        if (listNumber != 0) {
            audioElement.pause();
        }
        listNumber--;
        bgofCurrent();
        listOn();
        audioElement = new Audio(songs[listNumber].songPath);
        //console.log(listNumber);
        //console.log("cuurent play",audioElement);
        if (playButton.attributes.name.value == "pause-circle") {
            //isPlaying = true ;
            nameS.innerText = songs[listNumber].songName;
            bgofCurrent();
            listOn();
            audioElement.play();
        }
        else {
            // console.log("stopped")
        }
    }
    else {
        listNumber = 5;
        bgofCurrent();
        listOn();
        audioElement.pause();
        audioElement = new Audio(songs[listNumber].songPath);
        //console.log(listNumber);
        //console.log("cuurent play",audioElement);
        if (playButton.attributes.name.value == "pause-circle") {
            // isPlaying = true ;
            nameS.innerText = songs[listNumber].songName;
            bgofCurrent();
            listOn();
            audioElement.play();
        }

    }
})


// getting the name of current playing audio






