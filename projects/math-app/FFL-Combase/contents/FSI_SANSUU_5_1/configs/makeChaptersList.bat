@echo off
echo 紙面設定および学習者支援画面設定ファイル（configs直下のフォルダ名）の一覧を取得します。
echo;

echo var fflcom_chapters=[ > fflcom_chapters.js

for /L %%N in (0,1,999) do (
    if exist ffl-chapter_%%N-config.js (
        echo ffl-chapter_%%N-config.js
        echo 'ffl-chapter_%%N-config.js', >> fflcom_chapters.js
    )
)
echo ]; >> fflcom_chapters.js

echo;

echo var fflcom_reflows=[ >> fflcom_chapters.js

for /L %%N in (0,1,999) do (
    if exist ffl-chapter_%%N-reflow.js (
        echo ffl-chapter_%%N-reflow.js
        echo 'ffl-chapter_%%N-reflow.js', >> fflcom_chapters.js
    )
)
echo ]; >> fflcom_chapters.js


echo;
pause