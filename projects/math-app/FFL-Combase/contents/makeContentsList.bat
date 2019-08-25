@echo off
echo 教科書ID（contents直下のフォルダ名）の一覧を取得します。
echo;

echo var fflcom_contents=[ > fflcom_contents.js

for /D %%A in (*) do (
    echo %%A
    echo '%%A', >> fflcom_contents.js
)
echo ] >> fflcom_contents.js

echo;
pause