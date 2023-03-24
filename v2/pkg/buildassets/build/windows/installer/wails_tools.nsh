# DO NOT EDIT - Generated automatically by `wails build`

!include "x64.nsh"
!include "WinVer.nsh"
!include "FileFunc.nsh"
!include "Logiclib.nsh"

!ifndef INFO_PROJECTNAME
    !define INFO_PROJECTNAME "{{.Name}}"
!endif
!ifndef INFO_COMPANYNAME
    !define INFO_COMPANYNAME "{{.Info.CompanyName}}"
!endif
!ifndef INFO_PRODUCTNAME
    !define INFO_PRODUCTNAME "{{.Info.ProductName}}"
!endif
!ifndef INFO_PRODUCTVERSION
    !define INFO_PRODUCTVERSION "{{.Info.ProductVersion}}"
!endif
!ifndef INFO_COPYRIGHT
    !define INFO_COPYRIGHT "{{.Info.Copyright}}"
!endif
!ifndef PRODUCT_EXECUTABLE
    !define PRODUCT_EXECUTABLE "${INFO_PROJECTNAME}.exe"
!endif
!ifndef UNINST_KEY_NAME
    !define UNINST_KEY_NAME "${INFO_COMPANYNAME}${INFO_PRODUCTNAME}"
!endif
!define UNINST_KEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINST_KEY_NAME}"

!ifndef REQUEST_EXECUTION_LEVEL
    !define REQUEST_EXECUTION_LEVEL "admin"
!endif

RequestExecutionLevel "${REQUEST_EXECUTION_LEVEL}"

!ifdef ARG_WAILS_AMD64_BINARY
    !define SUPPORTS_AMD64
!endif

!ifdef ARG_WAILS_ARM64_BINARY
    !define SUPPORTS_ARM64
!endif

!ifdef ARG_WAILS_386_BINARY
    !define SUPPORTS_386
!endif

!ifdef SUPPORTS_AMD64
    !ifdef SUPPORTS_ARM64
        !define ARCH "amd64_arm64"
    !else
        !define ARCH "amd64"
    !endif
!else
    !ifdef SUPPORTS_ARM64
        !define ARCH "arm64"
    !else
        !ifdef SUPPORTS_386
            !define ARCH "win32"
        !else
            !error "Wails: Undefined ARCH, please provide at least one of ARG_WAILS_AMD64_BINARY or ARG_WAILS_ARM64_BINARY or ARG_WAILS_386_BINARY"
        !endif
    !endif
!endif

!macro wails.checkProgramRunWindow
    StrCpy $1 "${PRODUCT_EXECUTABLE}"

    nsProcessW::_FindProcess "$1"
    Pop $R0
    ${If} $R0 = 0
      nsProcessW::_KillProcess "$1"
      Pop $R0

      Sleep 500
    ${EndIf}
!macroend

!macro wails.checkArchitecture
    !ifndef WAILS_WIN10_REQUIRED
        !define WAILS_WIN10_REQUIRED "This product is only supported on Windows 10 (Server 2016) and later."
    !endif

    !ifndef WAILS_WIN7_REQUIRED
        !define WAILS_WIN7_REQUIRED "This product is only supported on Windows 7 (Server 2008) and later."
    !endif

    !ifndef WAILS_ARCHITECTURE_NOT_SUPPORTED
        !define WAILS_ARCHITECTURE_NOT_SUPPORTED "This product can't be installed on the current Windows architecture. Supports: ${ARCH}"
    !endif

    ${If} ${AtLeastWin10}
        !ifdef SUPPORTS_AMD64
            ${if} ${IsNativeAMD64}
                Goto ok
            ${EndIf}
        !endif

        !ifdef SUPPORTS_ARM64
            ${if} ${IsNativeARM64}
                Goto ok
            ${EndIf}
        !endif

        !ifdef SUPPORTS_386
            Goto ok
        !endif
    ${EndIf}

    ${If} ${AtLeastWin7}
        Goto ok
    ${else}
        IfSilent silentWin notSilentWin
        silentWin:
            SetErrorLevel 64
            Abort
        notSilentWin:
            MessageBox MB_OK "${WAILS_WIN7_REQUIRED}"
            Quit
    ${EndIf}

    ok:
!macroend

!macro wails.files
    !ifdef SUPPORTS_AMD64
        ${if} ${IsNativeAMD64}
            File "/oname=${PRODUCT_EXECUTABLE}" "${ARG_WAILS_AMD64_BINARY}"
        ${EndIf}
    !endif

    !ifdef SUPPORTS_ARM64
        ${if} ${IsNativeARM64}
            File "/oname=${PRODUCT_EXECUTABLE}" "${ARG_WAILS_ARM64_BINARY}"
        ${EndIf}
    !endif

    !ifdef SUPPORTS_386
        File "/oname=${PRODUCT_EXECUTABLE}" "${ARG_WAILS_386_BINARY}"
    !endif
!macroend

!macro wails.writeUninstaller
    WriteUninstaller "$INSTDIR\uninstall.exe"

    SetRegView 64
    WriteRegStr HKLM "${UNINST_KEY}" "Publisher" "${INFO_COMPANYNAME}"
    WriteRegStr HKLM "${UNINST_KEY}" "DisplayName" "${INFO_PRODUCTNAME}"
    WriteRegStr HKLM "${UNINST_KEY}" "DisplayVersion" "${INFO_PRODUCTVERSION}"
    WriteRegStr HKLM "${UNINST_KEY}" "DisplayIcon" "$INSTDIR\${PRODUCT_EXECUTABLE}"
    WriteRegStr HKLM "${UNINST_KEY}" "UninstallString" "$\"$INSTDIR\uninstall.exe$\""
    WriteRegStr HKLM "${UNINST_KEY}" "QuietUninstallString" "$\"$INSTDIR\uninstall.exe$\" /S"

    ${GetSize} "$INSTDIR" "/S=0K" $0 $1 $2
    IntFmt $0 "0x%08X" $0
    WriteRegDWORD HKLM "${UNINST_KEY}" "EstimatedSize" "$0"
!macroend

!macro wails.deleteUninstaller
    Delete "$INSTDIR\uninstall.exe"

    SetRegView 64
    DeleteRegKey HKLM "${UNINST_KEY}"
!macroend

!macro wails.setShellContext
    ${If} ${REQUEST_EXECUTION_LEVEL} == "admin"
        SetShellVarContext all
    ${else}
        SetShellVarContext current
    ${EndIf}
!macroend

# Install webview2 by launching the bootstrapper
# See https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/distribution#online-only-deployment
!macro wails.webview2runtime
    !ifndef WAILS_INSTALL_WEBVIEW_DETAILPRINT
        !define WAILS_INSTALL_WEBVIEW_DETAILPRINT "Installing: WebView2 Runtime"
    !endif

    SetRegView 64
	# If the admin key exists and is not empty then webview2 is already installed
	ReadRegStr $0 HKLM "SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}" "pv"
    ${If} $0 != ""
        Goto ok
    ${EndIf}

    ${If} ${REQUEST_EXECUTION_LEVEL} == "user"
        # If the installer is run in user level, check the user specific key exists and is not empty then webview2 is already installed
	    ReadRegStr $0 HKCU "Software\Microsoft\EdgeUpdate\Clients{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}" "pv"
        ${If} $0 != ""
            Goto ok
        ${EndIf}
     ${EndIf}
    
	SetDetailsPrint both
    DetailPrint "${WAILS_INSTALL_WEBVIEW_DETAILPRINT}"
    SetDetailsPrint listonly
    
    InitPluginsDir
    CreateDirectory "$pluginsdir\webview2bootstrapper"
    SetOutPath "$pluginsdir\webview2bootstrapper"
    File "tmp\MicrosoftEdgeWebview2Setup.exe"
    ExecWait '"$pluginsdir\webview2bootstrapper\MicrosoftEdgeWebview2Setup.exe" /silent /install'
    
    SetDetailsPrint both
    ok:
!macroend