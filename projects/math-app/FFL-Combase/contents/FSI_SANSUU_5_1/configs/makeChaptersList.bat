@echo off
echo ���ʐݒ肨��ъw�K�Ҏx����ʐݒ�t�@�C���iconfigs�����̃t�H���_���j�̈ꗗ���擾���܂��B
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