const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: false,
    audio: [
      {
        name: "Star Sky",
        artist: 'Two Steps From Hell & Thomas Bergersen',
        url: '/assets/music/Star Sky.mp3',
        cover: '/assets/music/Star Sky.png',
      }
    ]
});