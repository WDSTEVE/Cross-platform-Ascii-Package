import * as Kernal from "./kernal.js";
Kernal.start().then(() => {
    Kernal.speak("Hello").catch(() => { });
});

Kernal.draw(
    Kernal.bgBlue(Kernal.cyan("blue")) + " or " +
    Kernal.bold("BOLD") + " or " +
    Kernal.italic("italic") + " or " +
    Kernal.strike("strikethrough"));

(async () => {
    for await (let key of Kernal.getKeyboard()) {
        console.log(key);
        Kernal.beep(1000, 2);
    }
})();