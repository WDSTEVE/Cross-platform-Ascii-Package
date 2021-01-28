// deno-lint-ignore ban-types
async function findAndReplace(dir: string, findFile: RegExp, findStr: RegExp, replace: Function) {
    for await (const dirEntry of Deno.readDir(dir)) {
        if (dirEntry.isDirectory) {
            findAndReplace(dirEntry.name, findFile, findStr, replace);
        } else if (dirEntry.isFile && findFile.test(dirEntry.name)) {
            let text = await Deno.readTextFile(dir + "/" + dirEntry.name);
            text = text.replaceAll(findStr, <(found: string) => string>replace);
            await Deno.writeTextFile(dir + "/" + dirEntry.name, text);
        }
    }
    new Function()()
}

if (Deno.args.length === 4) {
    findAndReplace(Deno.args[0], RegExp(Deno.args[1]), RegExp(Deno.args[2], "g"), new Function("found", Deno.args[3]));
} else {
    console.log("Usage: far [root] [file regex] [find regex] [replace function]");
}

export { };