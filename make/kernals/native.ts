import { readKeypress } from "../make/keypress-0.0.7-fork/mod.ts"; // do not run unless in the src folder
import * as Colors from "https://deno.land/std@0.84.0/fmt/colors.ts";
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

let blockKernal = true;
let startedKernal = false;
export let enableColor = false;
export let enableSound = true;

export function bold(str: string) {
    if (!enableColor)
        return str;
    return Colors.bold(str);
};
export function italic(str: string) {
    if (!enableColor)
        return str;
    return Colors.italic(str);
};
export function underline(str: string) {
    if (!enableColor)
        return str;
    return Colors.underline(str);
};
export function strike(str: string) {
    if (!enableColor)
        return str;
    return Colors.strikethrough(str);
};
export function rgb24(str: string, color: number | Rgb) {
    if (!enableColor)
        return str;
    return Colors.rgb24(str, color);
};
export function bgRgb24(str: string, color: number | Rgb) {
    if (!enableColor)
        return str;
    return Colors.bgRgb24(str, color);
};

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

export function start(): Promise<void> {
    if (startedKernal)
        return Promise.resolve();
    return new Promise(async (resolve, reject) => {
        if (Deno.noColor) {
            blockKernal = true;
            console.clear();
            console.log("Your system does not seem to have ANSI support, this means you can't see text formatting. If you had ANSI support the following text would be pink.");
            console.log(magenta("I am pink."));
            console.log("Press any key to disable formatting, press Y to continue with ANSI formatting.");
            for await (const keypress of getUnblockedKeyboard()) {
                enableColor = keypress.key === "y";
                blockKernal = false;
                startedKernal = true;
                resolve();
                break;
            }
        } else {
            blockKernal = false;
            enableColor = true;
            startedKernal = true;
            resolve();
        }
    });
}

export function draw(str: string) {
    if (blockKernal)
        return;
    console.clear();
    console.log(str);
}
export function log(str: string) {
    if (blockKernal)
        return;
    console.log(str);
}

export async function* getKeyboard(): AsyncGenerator<Keypress> {
    for await (const keypress of readKeypress()) {
        if (keypress.ctrlKey && keypress.key === 'c') Deno.exit(0);
        if (blockKernal)
            continue;
        yield {
            key: keypress.key,
            keyCode: keypress.keyCode,
            ctrlKey: keypress.ctrlKey,
            metaKey: keypress.metaKey,
            shiftKey: keypress.shiftKey
        };
    }
}

async function* getUnblockedKeyboard(): AsyncGenerator<Keypress> {
    for await (const keypress of readKeypress()) {
        if (keypress.ctrlKey && keypress.key === 'c') Deno.exit(0);
        yield {
            key: keypress.key,
            keyCode: keypress.keyCode,
            ctrlKey: keypress.ctrlKey,
            metaKey: keypress.metaKey,
            shiftKey: keypress.shiftKey
        };
    }
}

import { speak, beep, setVolume } from "https://deno.land/x/swissKnife/mod.ts"

interface SpeakOptions {
    rate?: number
    volume?: number
}

let speakVar = function (text: string, options?: SpeakOptions) {
    if (!enableSound) return Promise.reject("sound not enabled");
    return speak(text, options);
};
let beepVar = function (frequency: number, duration: number) {
    if (!enableSound) return Promise.reject("sound not enabled");
    return beep(frequency, duration);
};
let setVolumeVar = function (volume: number) {
    return setVolume(volume);
};
if (Deno.build.os === "windows") {
    setVolume(50);
} else {
    let reject = () => Promise.reject("not supported");
    speakVar = reject;
    beepVar = reject;
    setVolumeVar = reject;
}
export {
    speakVar as speak,
    beepVar as beep,
    setVolumeVar as setVolume
};

setInterval(() => { }, 1000); // keep process alive