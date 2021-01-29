# Functions
## General
#### start(): Promise<void>
    Waits tell the kernal is done setting up.

    Kernal.start().then(() => {
        Kernal.speak("Hello").catch(() => { });
    });
#### draw(str: string): void
    Displays a string on the screen replacing anything else.
    
    Kernal.draw("Hello World!");
#### log(str: string): void
    Displays a string on the screen below anything else.
    
    Kernal.draw("Hello World!");
#### getKeyboard(): AsyncIterable<Keypress\>
    Detects keystrokes and yields them as Keypresses. 
    
    for await (let keystroke of Kernal.getKeyboard()) {
        console.log(keystroke.key);
    }
    
    Remember the await must be in a async function.
    Await can be faked run globally like this.
    
    (async () => {
        (YOUR ASYNC CODE)
    })();
## Sound
The behaviour of overlapping sounds and promise resolutions are inconsistent across kernals.
Sound is only supported on Windows and browser builds.
Sound will be disabled on browser until kernal resolves Kernal.start after user input
#### speak(text: string, options?: SpeakOptions): Promise<number\>
    Speaks text outloud with a voice synthesizer.
    Argument options.volume is on a scale of 0 to 100, 50 is default.
    Argument options.rate is on a scale of -10 to 10, 0 is default.
    
    Kernal.speak("Never gonna give you up, Never gonna let you down");
    Kernal.speak("Never gonna run around and desert you?", {rate: -3, volume: 75});
#### beep(frequency: number, duration: number): Promise<number\>
    Makes a sine beep at a set frequency in hertz and for a set duration in milliseconds.
    
    Kernal.beep(1000, 500);
#### setVolume(volume: number): Promise<number\>
    Sets a master volume for the kernal. Volume is on a scale of 0 to 100.
    
    Kernal.setVolume(0); // mute
    Kernal.setVolume(100);
## Style
Styles will not display on many windows consoles.
#### bold(str: string): string
    Makes a string bold.
#### italic(str: string): string
    Makes a string italic. This is not well supported with the native kernal. 
#### underline(str: string): string
    Makes a string underlined. This is not well supported with the native kernal. 
#### strike(str: string): string
    Makes a string strikedthrough. This is not well supported with the native kernal. 
## Foreground Color
Colors will not display on many windows consoles.
#### rgb24(str: string, color: number | Rgb): string
    Sets a string's foreground color
    
    Kernal.rgb24("Hi there", {r: 0, g: 0, b: 255});
    Kernal.rgb24("Why so blue?", 0xff7f00);
#### white(str: string): string
#### black(str: string): string
#### red(str: string): string
#### green(str: string): string
#### blue(str: string): string
#### magenta(str: string): string
#### yellow(str: string): string
#### cyan(str: string): string
## Background Color
Colors will not display on many windows consoles.
#### bgRgb24(str: string, color: number | Rgb): string
    Sets a string's background color
    
    Kernal.bgRgb24("Y'ello?", {r: 255, g: 255, b: 0});
    Kernal.bgRgb24("Orange you glad i didn't say banana?", 0xf64b00);
#### bgWhite(str: string): string
#### bgBlack(str: string): string
#### bgRed(str: string): string
#### bgGreen(str: string): string
#### bgBlue(str: string): string
#### bgMagenta(str: string): string
#### bgYellow(str: string): string
#### bgCyan(str: string): string

# Interfaces
#### Keypress
    key: string | undefined
    keyCode : number | undefined
    ctrlKey: boolean
    metaKey: boolean
    shiftKey: boolean
#### Rgb
    r: number
    g: number
    b: number
#### SpeakOptions (private)
    rate?: number
    volume?: number