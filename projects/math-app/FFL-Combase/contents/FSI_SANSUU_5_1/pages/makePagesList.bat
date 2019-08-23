@echo off

set n_folder=n
set r_folder=r
set v_folder=v
set vr_folder=vr

echo a > fflcom_pages.js
echo var fflcom_pages={ > fflcom_pages.js

setlocal enabledelayedexpansion

IF NOT EXIST "%n_folder%" ( 
	echo n:[], >> fflcom_pages.js
	goto next_folder
)

cd n
set n=0
for %%i in (*) do (
	set array[!n!]=%%i
	set /a n=!n!+1
)
cd..
echo n:[ >> fflcom_pages.js
set /a s=!n!-1
for /l %%a in (0,1,!s!) do (
	echo '!array[%%a]!', >> fflcom_pages.js
)
echo ], >> fflcom_pages.js

:next_folder

IF NOT EXIST "%r_folder%" (
	echo r:[], >> fflcom_pages.js
	goto next_folder
) 

cd r
set n=0
for %%i in (*) do (
	set array[!n!]=%%i
	set /a n=!n!+1
)
cd..
echo r:[ >> fflcom_pages.js
set /a s=!n!-1
for /l %%a in (0,1,!s!) do (
	echo '!array[%%a]!', >> fflcom_pages.js
)
echo ], >> fflcom_pages.js

:next_folder

IF NOT EXIST "%v_folder%" (
	echo v:[], >> fflcom_pages.js
	goto next_folder
) 

cd v
set n=0
for %%i in (*) do (
	set array[!n!]=%%i
	set /a n=!n!+1
)
cd..
echo v:[ >> fflcom_pages.js
set /a s=!n!-1
for /l %%a in (0,1,!s!) do (
	echo '!array[%%a]!', >> fflcom_pages.js
)
echo ], >> fflcom_pages.js

:next_folder

IF NOT EXIST "%vr_folder%" (
	echo vr:[], >> fflcom_pages.js
	goto next_folder
)

cd vr
set n=0
for %%i in (*) do (
	set array[!n!]=%%i
	set /a n=!n!+1
)
cd..
echo vr:[ >> fflcom_pages.js
set /a s=!n!-1
for /l %%a in (0,1,!s!) do (
	echo '!array[%%a]!', >> fflcom_pages.js
)
echo ] >> fflcom_pages.js

:next_folder

echo }; >> fflcom_pages.js

endlocal

echo fflcom_pages.js‚ğì¬‚µ‚Ü‚µ‚½B
echo;

pause

exit