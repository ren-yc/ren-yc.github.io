const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: true,
    audio: [
      {
        name: "Astronomia",
        artist: 'Vicetone/Tony Igy',
        url: '/assets/music/Astronomia.mp3',
        cover: '/assets/img/auther.jpg',
      }
    ]
});