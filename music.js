const playlistSongs = document.getElementById('playlist-songs');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const shuffleButton = document.getElementById('shuffle');

const renderSongs = (array) => {
   const songsHTML = array.map((song) => {
 return `
      <li id="song-${song.id}" class="playlist-song">
         <button class="playlist-song-info" onclick="playsong(${song.id})">
            <span class="playlist-song-title">${song.title}</span>
            <span class="playlist-song-artist">${song.artist}</span>
            <span class="playlist-song-duration">${song.duration}</span>
         </button>
         <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete${song.title}">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" fill="white"/></svg>
         </button> 
      </li>
      `;
   })
   .join('');
   playlistSongs.innerHTML = songsHTML;
};

const allSongs = [
    {
      id: 0,
      title: 'Remember Me',
      artist: 'Lucky dube',
      duration: '4:23',
      src: 'https://mdundo.com/song/1557379',
    },
    {
        id: 1,
        title: 'One Love',
        artist: 'Lucky dube',
        duration: '1:35',
        src: 'https://mdundo.com/song/1557356',
     },
     {
        id: 3,
        title: 'prisoner',
        artist: 'Lucky dube',
        duration: '4:02',
        src: 'https://mdundo.com/song/1557372',
     },
     {
        id: 4,
        title: 'Slave',
        artist: 'Lucky dube',
        duration: '3:56',
        src: 'https://mdundo.com/song/1557385',
     },
     {
        id: 5,
        title: 'Together As One',
        artist: 'Lucky dube',
        duration: '3:59',
        src: 'https://mdundo.com/song/1557402',
     },
     {
        id: 6,
        title: 'Its Not Easy',
        artist: 'Lucky dube',
        duration: '5:27',
        src: 'https://mdundo.com/song/1557334', 
     },
     {
        id: 7,
        title: 'The Way It IS',
        artist: 'Lucky dube',
        duration: '4:09',
        src: 'https://mdundo.com/song/1557401', 
     },
     {
        id: 8,
        title: 'Soldier',
        artist: 'Lucky dube',
        duration: '5:42',
        src: 'https://mdundo.com/song/1557387', 
     },
     {
        id: 9,
        title: 'Nobody Can Stop Reggae',
        artist: 'Lucky dube',
        duration: '3:44',
        src: 'https://mdundo.com/song/1580001', 
     },
     {
        id: 9,
        title: 'Different Colours, One People',
        artist: 'Lucky dube',
        duration: '4:07',
        src: 'https://mdundo.com/song/1557304', 
     },
     {
        id: 10,
        title: 'Back To My Roots',
        artist: 'Lucky dube',
        duration: '7:48',
        src: 'https://mdundo.com/song/1557288', 
     },
     {
        id: 11,
        title: "I've Got You Babe",
        artist: 'Lucky dube',
        duration: '4:02',
        src: 'https://mdundo.com/song/1557335', 
     },
     {
        id: 12,
        title: 'Crazy World',
        artist: 'Lucky dube',
        duration: '3:18',
        src: 'https://mdundo.com/song/1557302', 
     },
];

const audio = new Audio ();
let userData = {
   songs : [...allSongs],
   currentSong :null,
   songCurrentTime : 0,
};


const playSong = (id) => {
   const song = userData?.songs.find((song) => song.id === id);
   audio.src = song.src;
   audio.title = song.title;

   if(userData?.currentSong === null || userData?.currentSong.Id !== song.id) {
      audio.currentTime = 0;
   } else {
      audio.currentTime = userData.songCurrentTime;
   }

   userData.currentSong = song;
   playButton.classList.add('playing');
   highlightCurrentSong();
   setPlayerDisplay();
   setPlayButtonAccessibleText();
   audio.play();
};
const pauseSong = () =>{
   userData.songCurrentTime = audio.currentTime;

   playButton.classList.remove('playing');
   audio.pause();
};

const playNextSong = () => {
   if(userData?.currentSong === null){
      playSong (userData?.songs[0].id);
   } else {
      const currentSongIndex = getCurrentSongIndex();
      const nextSong = userData?.songs[currentSongIndex + 1];

      playSong(nextSong.id);
   }
};

const playPreviousSong = () => {
   if(userData?.currentSong === null) return;
   else {
      const currentSongIndex = getCurrentSongIndex();
      const previousSong = userData?.songs[currentSongIndex - 1];

      playSong(previousSong.id);
   }
};

const shuffle = () => {
   userData?.songs.sort(() => Math.random() - 0.5);
   userData.currentSong = null;
   userData.currentTime = 0;

   renderSongs(userData?.songs);
   pauseSong();
   setPlayerDisplay();
   setPlayButtonAccessibleText();
};

const deleteSong = (id) => {
   if(userData?.currentSong?.id === id) {
      userData.currentSong = null;
      userData.songCurrentTime = 0;
      pauseSong();
      setPlayerDisplay();
   }
   userData.songs = userData?.songs.filter((song) => song.id !== id);
   renderSongs(userData?.songs);
   highlightCurrentSong();
   setPlayButtonAccessibleText();

   if(userData.songs.length === 0){
      const resetButton = document.createElement('button');
      const resetText = document.createTextNode('Reset Playlist');

      resetButton.id = 'reset';
      resetButton.ariaLabel = 'resetPlaylist';
      resetButton.appendChild(resetText);
      playlistSongs.appendChild(resetButton);

      resetButton.addEventListener('click', () => {
         userData.songs = [...allSongs];
         
         renderSongs(userData?.songs);
         setPlayButtonAccessibleText();
         resetButton.remove();
      });
   }
};

const setPlayerDisplay = () => {
   const playingSong = document.getElementById('player-song-title');
   const songArtist = document.getElementById('player-song-artist');
   const currentTitle = userData?.currentSong?.title;
   const currentArtist = userData?.currentSong?.artist;

   playingSong.textContent = currentTitle ? currentTitle : '';
   songArtist.textContent = currentArtist ? currentArtist : ''; 
};

const highlightCurrentSong = () => {
   const playlistSongElements = document.querySelectorAll('.playlist-song');
   const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);

   playlistSongElements.forEach((songEl) => {
      songEl.removeAttribute('aria-current');
   });

   if(songToHighlight) songToHighlight.setAttribute('aria-current', 'true');
};


const setPlayButtonAccessibleText = () => {
   const song = userData?.currentSong || userData?.songs[0];

   playButton.setAttribute("aria-label", song?.title ? `Play ${song.title}` : "Play");
          
};

const getCurrentSongIndex =() => userData?.songs.indexOf(userData.currentSong);

playButton.addEventListener('click', () => {
   if(userData?.currentSong === null) {
      playSong(userData?.songs[0].id);
   } else{
      playSong(userData?.currentSong.id);
   }
});

pauseButton.addEventListener('click', pauseSong);
nextButton.addEventListener('click', playNextSong);
previousButton.addEventListener('click', playPreviousSong);
shuffleButton.addEventListener('click', shuffle);

audio.addEventListener('ended', () => {
   const currentSongIndex = getCurrentSongIndex();
   const nextSongExists = userData?.songs[currentSongIndex + 1] !==undefined;

   if(nextSongExists){
      playNextSong();
   } else{
      userData.currentSong = null;
      userData.songCurrentTime = 0;

      pauseSong();
      setPlayerDisplay();
      highlightCurrentSong();
      setPlayButtonAccessibleText();
   }
});
renderSongs(userData?.songs);
setPlayButtonAccessibleText();