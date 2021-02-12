import "./styles.css";
import Audio from "./Audio";

const audio = new Audio();

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<button class="play-sound">
  Play Sound
</button>

<button class="cancel-sound">
  Cancel Sound
</button>
`;

const playButton = document.querySelector(".play-sound");
const cancelButton = document.querySelector(".cancel-sound");

let interval;
playButton.addEventListener("click", async () => {
  // audio.playTrill(10);
  // audio.playBuzz(100, 750, { oscillationMillis: 30, buzzOffsetCents: 500});
  // audio.playBuzz(300, 750, { oscillationMillis: 30, buzzOffsetCents: 500});
  // audio.playBuzz(300, 750, { oscillationMillis: 30, buzzOffsetCents: 1000});
  // audio.playBuzz(350, 750, { oscillationMillis: 30, buzzOffsetCents: 2000});
  // audio.playBuzz(300, 750, { oscillationMillis: 20, buzzOffsetCents: 500});
  // audio.playBuzz(300, 750, { oscillationMillis: 20, buzzOffsetCents: 1000});
  // audio.playBuzz(300, 750, { oscillationMillis: 10, buzzOffsetCents: 500});
  // audio.playBuzz(300, 750, { oscillationMillis: 10, buzzOffsetCents: 1000});

    while (true) {
      // const frequencies = [400, 450];
      // // const frequencies = [200, 630];
      // await audio.playRing({ frequencies, millis: 400});
      // await audio.playSilence(200);
      // await audio.playRing({ frequencies, millis: 400});
      // await audio.playSilence(2000);
      // await audio.playBuzz(2000, 75, { oscillationMillis: 10, buzzOffsetCents: 400});
      await audio.playRing({ frequencies: [750, 1100], millis: 50 })
      await audio.playSilence(50);
    }

    // audio.playScript([
    //   [400, 1000],
    //   [800, 1000],
    //   [300, 500],
    //   [100, 666],
    //   [400, 1000],
    //   [800, 1000],
    //   [300, 500],
    //   [100, 666],
    // ]);

    // await audio.playNote(250, 75);
    // await audio.playNote(500, 75);
    // await audio.playNote(1000, 75);
    // await audio.playNote(2000, 75);
    // await audio.playNote(4000, 75);
    // await audio.playNote(8000, 75);

  /* Wall collision sound */
  // audio.playNote(1000, 17);
  /* Hit ball sound */
  // await audio.playNote(2000, 50);
  // await audio.playNote(1000, 50);
  // await audio.playNote(2000, 50);
  const notes = [
    "1174.659",
    "1108.731",
    "1046.502",
    "987.7666",
    "932.3275",
    "880.0000",
    "830.6094",
    "783.9909",
    "739.9888",
    "698.4565",
    "659.2551",
    "622.2540",
    "587.3295",
    "554.3653",
    "523.2511",
    "493.8833",
    "466.1638",
    "440.0000",
    "415.3047",
    "391.9954",
    "369.9944",
    "349.2282",
    "329.6276",
    "311.1270",
    "293.6648"
  ];

  // await audio.playNote("349.2282", 1000);

  // while (true) {
  //   for (let i = 0; i < notes.length; i += 2) {
  //     const note = notes[i];

  //     await audio.playNote(note, 25);
  //   }
  //   // await audio.playNote(250, 75);
  //   // await audio.playNote(500, 75);
  //   // await audio.playNote(1000, 75);
  //   // await audio.playNote(2000, 75);
  //   // await audio.playNote(4000, 75);
  //   // await audio.playNote(8000, 75);
  // }

  /* start sound */
  // await audio.playNote(250, 75);
  // await audio.playNote(500, 75);
  // await audio.playNote(1000, 75);
  // await audio.playNote(2000, 75);
  // await audio.playNote(4000, 75);
  // await audio.playNote(8000, 75);
});

cancelButton.addEventListener("click", () => {
  // clearInterval(interval);
});
