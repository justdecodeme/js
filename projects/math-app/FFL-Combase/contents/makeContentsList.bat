@echo off
echo ���ȏ�ID�icontents�����̃t�H���_���j�̈ꗗ���擾���܂��B
echo;

echo var fflcom_contents=[ > fflcom_contents.js

for /D %%A in (*) do (
    echo %%A
    echo '%%A', >> fflcom_contents.js
)
echo ] >> fflcom_contents.js

echo;
pause