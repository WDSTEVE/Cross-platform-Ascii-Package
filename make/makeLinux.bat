copy .\kernals\native.ts ..\src\kernal.ts /Y
mkdir ..\src\keypress-0.0.7-fork
xcopy .\kernals\keypress-0.0.7-fork ..\src\keypress-0.0.7-fork /Y
mkdir ..\builds
deno compile --allow-all --unstable --target=x86_64-unknown-linux-gnu --output=../builds/linux ../src/main.ts