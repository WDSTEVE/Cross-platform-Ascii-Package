call makeBrowser
call makeWindows
echo Launching browser build...
cd ../builds/browser
start browser-sync start --server
cd ../../make
echo Launching windows build...
call start ../builds/windows.exe
echo Launching source...
deno run --unstable --allow-all ../src/main.ts