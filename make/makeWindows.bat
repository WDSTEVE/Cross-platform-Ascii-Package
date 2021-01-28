copy .\kernals\native.ts ..\src\kernal.ts /Y
mkdir "../builds"
deno compile --allow-all --unstable --target=x86_64-pc-windows-msvc --output=../builds/windows ../src/main.ts