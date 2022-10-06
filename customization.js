function dodathings() {
 
  var db = firebase.firestore();
  const select = document.getElementById('music-sel');
  var myAudio = document.getElementById("myAudio");
  var docRef = db.collection("players").doc(name);
    let url = ''


  docRef.get().then((doc) => {
    if (doc.exists) {
      console.log(doc.data())

      var selected_song_lol = doc.data().music
      var selected_song = selected_song_lol.replace("https://school-game.cool-sidd.repl.co/music/", '').replace(".wav", '')
      select.value = selected_song

      if (selected_song != 'none') {
        url = selected_song_lol
        document.querySelector('.play-song').disabled = false
        myAudio.src = url
      } else {
        url = 'none'
        document.querySelector('.play-song').disabled = true

      }
  document.querySelector('fieldset').style.display = 'block'
  document.querySelector('.loader').style.display = 'none'
    } else {

    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });



  select.addEventListener('change', function handleChange(event) {

    var music_name = event.target.value // 👉️ get selected VALUE

    if (music_name != 'none') {
      url = 'https://school-game.cool-sidd.repl.co/music/' + music_name + '.wav'
      document.querySelector('.play-song').disabled = false
      myAudio.src = url
    } else {
      url = 'none'
      document.querySelector('.play-song').disabled = true

    }




    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log(doc.data())
        var usersoldpoints = doc.data().score || 0

        db.collection("players").doc(doc.id).set({
          name: name,
          score: usersoldpoints,
          music: url
        });

      } else {
        // doc.data() will be undefined in this case
        console.log("new player!!!")

        var db_collection = db.collection("players");

        db_collection.doc(name).set({
          name: name,
          music: url,
          score: 0



        })
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

  });







}

 var isPlaying = false;

  function togglePlay() {
    isPlaying ? myAudio.pause() : myAudio.play();
  };

  myAudio.onplaying = function() {
    isPlaying = true;
    document.querySelector('.play-song img').src = "img/pause.png"

  };
  myAudio.onpause = function() {
    isPlaying = false;
    document.querySelector('.play-song img').src = "img/play.png"

  };