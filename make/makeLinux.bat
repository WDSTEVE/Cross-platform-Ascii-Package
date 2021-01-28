copy .\kernals\native.ts ..\src\kernal.ts /Y
mkdir "../builds"
deno compile --allow-all --unstable --target=x86_64-unknown-linux-gnu --output=../builds/linux ../src/main.ts