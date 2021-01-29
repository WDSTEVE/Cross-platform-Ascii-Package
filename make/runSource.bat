copy .\kernals\native.ts ..\src\kernal.ts /Y
mkdir ..\src\keypress-0.0.7-fork
xcopy .\kernals\keypress-0.0.7-fork ..\src\keypress-0.0.7-fork /Y
deno run --unstable --allow-all ../src/main.ts