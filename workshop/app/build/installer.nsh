!macro preInit
   SetRegView 64
   WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$APPDATA\Microsoft\Windows\Start Menu\Programs\gakkotosho\syogaku_doutoku\multiboard_1nen\"
   WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$APPDATA\Microsoft\Windows\Start Menu\Programs\gakkotosho\syogaku_doutoku\multiboard_1nen\"
   SetRegView 32
   WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$APPDATA\Microsoft\Windows\Start Menu\Programs\gakkotosho\syogaku_doutoku\multiboard_1nen\"
   WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$APPDATA\Microsoft\Windows\Start Menu\Programs\gakkotosho\syogaku_doutoku\multiboard_1nen\"
!macroend
