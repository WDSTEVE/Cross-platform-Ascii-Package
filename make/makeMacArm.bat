copy .\kernals\native.ts ..\src\kernal.ts /Y
mkdir "../builds"
deno compile --allow-all --unstable --target=aarch64-apple-darwin --output=../builds/macOSarm ../src/main.ts