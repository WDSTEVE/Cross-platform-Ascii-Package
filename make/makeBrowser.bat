
del browserSrc /Q
rmdir browserSrc
del ..\builds\browser /Q
rmdir ..\builds\browser
copy .\kernals\browser.ts ..\src\kernal.ts /Y
xcopy ..\src .\browserSrc\ /Y
call deno run --allow-read --allow-write far.ts ./browserSrc .+\.ts "((from)|(import)) \"[a-zA-Z0-9 _\/\.]+\.ts\"" "return found.substring(0, found.length-4)+\".js\\\"\""
xcopy .\browserPage ..\builds\browser\ /Y
call tsc --build tsconfig.json