copy .\kernals\native.ts ..\src\kernal.ts /Y
mkdir "../builds"
deno compile --allow-all --unstable --target=x86_64-apple-darwin --output=../builds/macOS ../src/main.ts