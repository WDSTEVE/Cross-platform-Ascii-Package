export interface Keypress {
    key: string | undefined,
    keyCode: number | undefined,
    ctrlKey: boolean,
    metaKey: boolean,
    shiftKey: boolean,
}

export interface Rgb {
    r: number;
    g: number;
    b: number;
}

let blockKernal = false;
let startedKernal = false;
export let enableColor = true;
export let enableSound = false;

export function bold(str: string) {
    if (!enableColor)
        return str;
    return `<b>${str}</b>`;
}

export function italic(str: string) {
    if (!enableColor)
        return str;
    return `<i>${str}</i>`;
}

export function underline(str: string) {
    if (!enableColor)
        return str;
    return `<p>${str}</p>`;
}

export function strike(str: string) {
    if (!enableColor)
        return str;
    return `<span style="text-decoration: line-through;">${str}</span>`;
}

function colorToHex(color: number | Rgb) {
    if (typeof color !== "number") {
        color = color.r * 65536 + color.g * 256 + color.b
    }
    const hex = color.toString(16);
    return "0".repeat(6 - hex.length) + hex;
}

export function rgb24(str: string, color: number | Rgb) {
    if (!enableColor)
        return str;
    return `<span style="color:#${colorToHex(color)}">${str}</span>`;
}

export function bgRgb24(str: string, color: number | Rgb) {
    if (!enableColor)
        return str;
    return `<span style="background-color:#${colorToHex(color)}">${str}</span>`;
}

// shared kernal code for colors
export function white(str: string) { return rgb24(str, 0xffffff); };
export function black(str: string) { return rgb24(str, 0x000000); };
export function red(str: string) { return rgb24(str, 0xff0000); };
export function green(str: string) { return rgb24(str, 0x00ff00); };
export function blue(str: string) { return rgb24(str, 0x0000ff); };
export function magenta(str: string) { return rgb24(str, 0xff00ff); };
export function yellow(str: string) { return rgb24(str, 0xffff00); };
export function cyan(str: string) { return rgb24(str, 0x00ffff); };
export function bgWhite(str: string) { return bgRgb24(str, 0xffffff); };
export function bgBlack(str: string) { return bgRgb24(str, 0x000000); };
export function bgRed(str: string) { return bgRgb24(str, 0xff0000); };
export function bgGreen(str: string) { return bgRgb24(str, 0x00ff00); };
export function bgBlue(str: string) { return bgRgb24(str, 0x0000ff); };
export function bgMagenta(str: string) { return bgRgb24(str, 0xff00ff); };
export function bgYellow(str: string) { return bgRgb24(str, 0xffff00); };
export function bgCyan(str: string) { return bgRgb24(str, 0x00ffff); };

let userInteracted = false;

export function start(): Promise<void> {
    if (startedKernal)
        return Promise.resolve();
    return new Promise((resolve, reject) => {
        const makeDisplayInterval = setInterval(() => {
            if (!userInteracted)
                return;
            clearInterval(makeDisplayInterval);
            startedKernal =  true;
            resolve();
        }, 10);
    });
}

export function draw(str: string) {
    if (blockKernal)
        return;
    // @ts-ignore
    document.getElementById("textContainer").innerHTML = str;
}

export async function* getKeyboard(): AsyncIterable<Keypress> {
    while (true) {
        let keyEvent: any = await new Promise(resolve => {
            window.addEventListener('keypress', resolve, { once: true });
        });
        yield {
            key: keyEvent.key,
            keyCode: keyEvent.keyCode,
            ctrlKey: keyEvent.ctrlKey,
            metaKey: keyEvent.metaKey,
            shiftKey: keyEvent.shiftKey
        };
    }
}

let pageVolume = 0.5;

function userInteraction() {
    userInteracted = true;
    enableSound = true;
}

// @ts-ignore
document.getElementById("body").onmousedown = userInteraction;
// @ts-ignore
document.getElementById("body").onscroll = userInteraction;
// @ts-ignore
document.getElementById("body").onkeydown = userInteraction;

interface SpeakOptions {
    rate?: number
    volume?: number
}

export function speak(text: string, options?: SpeakOptions) {
    if (!enableSound) return Promise.reject("not enabled");
    if ("speechSynthesis" in window) {
        //@ts-ignore
        const synthesis = window.speechSynthesis;
        const voices = synthesis.getVoices().filter(
            (voice: any) => { return voice.lang === 'en'; });
        //@ts-ignore
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.voice = voices[0];
        utterance.pitch = 1.5;
        utterance.rate = 10 ** ((options?.rate ?? 0) / 10);
        utterance.volume = (options?.volume ?? 50) / 100 * pageVolume;

        synthesis.speak(utterance);
        return Promise.resolve(0);
    }
    return Promise.reject("not supported");
}

// @ts-ignore
const audioCtx = new (window.AudioContext ?? window.webkitAudioContext ?? window.audioContext ?? null);
let beepPlaying = false;
const loggedBeeps: [number, number][] = [];

export function beep(frequency: number, duration: number) {
    if (beepPlaying) {
        loggedBeeps.push([frequency, duration]);
        return Promise.resolve(0);
    }
    beepPlaying = true;
    if (audioCtx === null) return Promise.reject("not supported");
    if (!enableSound) return Promise.reject("not enabled");

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    gainNode.gain.value = pageVolume;
    oscillator.frequency.value = frequency;
    oscillator.onended = () => {
        beepPlaying = false;
        let loggedBeep = loggedBeeps.shift();
        if (loggedBeep !== undefined) {
            beep(...loggedBeep).catch(() => { });
        }
    };

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + (duration / 1000));
    return Promise.resolve(0);
};

export function setVolume(volume: number) {
    pageVolume = volume / 100;
    return Promise.resolve(0);
}