---
title: vscode
urlname: XDdudsfGXo5mxJxQbMnc80WOnFh
date: '2025-04-05 01:00:40'
updated: '2025-04-07 00:55:56'
---
## 1，查看 VSCode 插件占用空间和内存的方法
VSCode 提供了内置的性能分析工具：

1. 打开命令面板（按 Ctrl+Shift+P ）

2. 输入并选择 Developer: Open Process Explorer

查看插件占用的磁盘空间
## 2. 查看插件占用的磁盘空间
你可以直接查看插件安装目录来了解它们占用的磁盘空间：
```bash
cd %USERPROFILE%\.vscode\extensions
dir /s /b | find /c ":"
```
要查看每个插件的大小，可以使用：
```bash
dir /s
```
## 3. 使用 VSCode 的启动性能分析
1. 使用 --status 参数启动 VSCode：
	```bash
	code --status
	```
1. 查看开发者工具中的启动性能：
	- 打开命令面板
		- 输入并选择 Developer: Startup Performance
	
## 4,vscode常用技巧
#### 内置的缩放功能：
- 放大： Ctrl + +

- 缩小： Ctrl + -

- 重置缩放： Ctrl + 0

#### 清空终端信息：
在 Windows 终端中清除之前的控制台信息有几种方法：
1. 使用 cls 命令：在命令行中直接输入 cls 并按回车，这会清空整个控制台。

1. 在 Node.js 程序中，你可以使用 console.clear() 方法来清除控制台：

## 4. 使用第三方插件
安装 "Extension Inspector" 插件，它可以帮助你分析插件的性能影响：
1. 在扩展市场搜索 "Extension Inspector"

1. 安装后，可以查看每个插件的性能数据

## 优化建议
1. 禁用不常用的插件 ：右键点击插件 -> "禁用" 或 "在工作区禁用"

1. 按项目类型使用不同的插件配置 ：创建不同的 VSCode 配置文件

1. 定期清理 ：卸载不再使用的插件

1. 更新插件 ：保持插件为最新版本，因为开发者可能会优化性能

1. 增加 VSCode 的内存限制 ：
	- 打开设置 ( Ctrl+, )
		- 搜索 "memory limit"
		- 增加 "Window: Zoom Level" 的值（默认为 4096MB）
	


vscode设置文件
```undefined
{
  "AI.chatLanguage": "简体中文",
  "editor.linkedEditing": true,
  "editor.minimap.enabled": false,
  "editor.rulers": [
    {
      "column": 80,
      "color": "#00FF0010"
    },
    {
      "column": 100,
      "color": "#BDB76B15"
    },
    {
      "column": 120,
      "color": "#FA807219"
    }
  ],
  "editor.unicodeHighlight.includeComments": true,
  "python.defaultInterpreterPath": "\\\\wsl$\\Ubuntu\\mnt\\f\\project_space\\.homeassistant\\ha_env\\bin\\python",
  "python.analysis.extraPaths": [
    "E:/ProgramData/Anaconda3/envs/music_env/Lib/site-packages"
  ],
  "python.analysis.diagnosticMode": "workspace",
  "python.analysis.typeCheckingMode": "basic",
  "python.analysis.diagnosticSeverityOverrides": {
    "reportUndefinedVariable": "none"
  },
  "workbench.colorCustomizations": {
    "[Default Dark Modern]": {
      "tab.activeBorderTop": "#00FF00",
      "tab.unfocusedActiveBorderTop": "#00FF0088",
      "textCodeBlock.background": "#00000055"
    },
    "editor.wordHighlightStrongBorder": "#FF6347",
    "editor.wordHighlightBorder": "#FFD700",
    "editor.selectionHighlightBorder": "#A9A9A9"
  },
  "workbench.editor.revealIfOpen": true,
  "files.eol": "\n",
  "[bat]": {
    "files.eol": "\r\n"
  },
  "emmet.variables": {
    "lang": "en"
  },
  "cSpell.diagnosticLevel": "Hint",
  "trailing-spaces.backgroundColor": "rgba(255,0,0,0.1)",
  "trailing-spaces.includeEmptyLines": false,
  "terminal.integrated.tabs.hideCondition": "never",
  "terminal.integrated.enablePersistentSessions": false,
  "java.debug.settings.hotCodeReplace": "auto",
  "java.dependency.packagePresentation": "hierarchical",
  "terminal.integrated.automationProfile.windows": {
    "path": "cmd"
  },
  "java.test.config": {
    "vmArgs": ["-Dstdout.encoding=UTF-8", "-Dstderr.encoding=UTF-8"]
  },
  "maven.executable.path": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\maven\\latest\\bin\\mvn",
  "java.import.gradle.home": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\gradle\\latest",
  "java.configuration.runtimes": [
    {
      "name": "JavaSE-1.8",
      "path": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\java\\8"
    },
    {
      "name": "JavaSE-11",
      "path": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\java\\11"
    },
    {
      "name": "JavaSE-17",
      "path": "C:\\Program Files\\Java\\jdk-17",
      "default": true
    },
    {
      "name": "JavaSE-21",
      "path": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\java\\21"
    },
    {
      "name": "JavaSE-24",
      "path": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\java\\latest"
    }
  ],
  "terminal.integrated.profiles.windows": {
    "PowerShell": {
      "source": "PowerShell",
      "icon": "terminal-powershell",
      "args": ["-NoExit", "-Command", "chcp 65001"],
      "path": "${env:windir}\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
    },
    "PowerShell -NoProfile": {
      "source": "PowerShell",
      "args": ["-NoProfile"]
    },
    "Command Prompt": {
      "path": "cmd.exe",
      "args": ["/K", "chcp 65001"],
      "icon": "terminal-cmd",
      "color": "terminal.ansiYellow"
    },
    "GitBash": {
      "path": "E://soft//msys64//msys2_shell.cmd",
      "args": [
        "-defterm",
        "-mingw64",
        "-no-start",
        "-here",
        "-lic",
        "cd $PWD; exec zsh"
      ]
    },
    "Anaconda3 Pytorch": {
      "path": [
        "${env:windir}\\Sysnative\\cmd.exe",
        "${env:windir}\\System32\\cmd.exe"
      ],
      "args": [
        "/K",
        "e:\\ProgramData\\anaconda3\\Scripts\\activate.bat",
        "e:\\ProgramData\\anaconda3\\envs\\Pytorch"
      ],
      "env": {
        "CMDER_ROOT": "E:\\ProgramData\\anaconda3\\envs\\Pytorch\\python.exe"
      },
      "icon": "terminal-cmd",
      "color": "terminal.ansiBlue"
    },
    "Anaconda3 selenium": {
      "path": [
        "${env:windir}\\Sysnative\\cmd.exe",
        "${env:windir}\\System32\\cmd.exe"
      ],
      "args": [
        "/K",
        "e:\\ProgramData\\anaconda3\\Scripts\\activate.bat",
        "E:\\ProgramData\\anaconda3\\envs\\selenium_env"
      ],
      "env": {
        "CMDER_ROOT": "E:\\ProgramData\\anaconda3\\envs\\selenium_env\\python.exe"
      },
      "icon": "terminal-cmd",
      "color": "terminal.ansiBlue"
    },
    "Anaconda3 AnyText": {
      "path": [
        "${env:windir}\\Sysnative\\cmd.exe",
        "${env:windir}\\System32\\cmd.exe"
      ],
      "args": [
        "/K",
        "e:\\ProgramData\\anaconda3\\Scripts\\activate.bat",
        "C:\\Users\\10640\\.conda\\envs\\anytext"
      ],
      "env": {
        "CMDER_ROOT": "C:\\Users\\10640\\.conda\\envs\\anytext\\python.exe"
      },
      "icon": "terminal-cmd",
      "color": "terminal.ansiBlue"
    },
    "Anaconda3 NODEJS": {
      "path": [
        "${env:windir}\\Sysnative\\cmd.exe",
        "${env:windir}\\System32\\cmd.exe"
      ],
      "args": [
        "/K",
        "e:\\ProgramData\\anaconda3\\Scripts\\activate.bat",
        "e:\\ProgramData\\anaconda3\\envs\\nodeenv"
      ],
      "env": {
        "CMDER_ROOT": "E:\\ProgramData\\anaconda3\\python.exe"
      },
      "icon": "terminal-cmd",
      "color": "terminal.ansiRed"
    },
    "Anaconda3 GO": {
      "path": [
        "${env:windir}\\Sysnative\\cmd.exe",
        "${env:windir}\\System32\\cmd.exe"
      ],
      "args": [
        "/K",
        "e:\\ProgramData\\anaconda3\\Scripts\\activate.bat",
        "e:\\ProgramData\\anaconda3\\envs\\goenv"
      ],
      "env": {
        "CMDER_ROOT": "E:\\ProgramData\\anaconda3\\python.exe"
      },
      "icon": "terminal-cmd",
      "color": "terminal.ansiRed"
    },
    "Anaconda3 BASE": {
      "path": [
        "${env:windir}\\Sysnative\\cmd.exe",
        "${env:windir}\\System32\\cmd.exe"
      ],
      "args": [
        "/K",
        "e:\\ProgramData\\anaconda3\\Scripts\\activate.bat",
        "e:\\ProgramData\\anaconda3"
      ],
      "env": {
        "CMDER_ROOT": "E:\\ProgramData\\anaconda3\\python.exe"
      },
      "icon": "terminal-cmd",
      "color": "terminal.ansiRed"
    },
    "Git Bash": {
      "source": "Git Bash"
    },
    "JavaSE-1.8 LTS": {
      "overrideName": true,
      "env": {
        "PATH": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\java\\8\\bin;${env:PATH}",
        "JAVA_HOME": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\java\\8"
      },
      "path": "cmd"
    },
    "JavaSE-11 LTS": {
      "overrideName": true,
      "env": {
        "PATH": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\java\\11\\bin;${env:PATH}",
        "JAVA_HOME": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\java\\11"
      },
      "path": "cmd"
    },
    "JavaSE-17 LTS": {
      "overrideName": true,
      "env": {
        "PATH": "C:\\Program Files\\Java\\jdk-17\\bin;${env:PATH}",
        "JAVA_HOME": "C:\\Program Files\\Java\\jdk-17"
      },
      "path": "cmd"
    },
    "JavaSE-21 LTS": {
      "overrideName": true,
      "env": {
        "PATH": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\java\\21\\bin;${env:PATH}",
        "JAVA_TOOL_OPTIONS": "-Dstdout.encoding=UTF-8 -Dstderr.encoding=UTF-8",
        "JAVA_HOME": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\java\\21"
      },
      "path": "cmd",
      "args": ["/k", "chcp", "65001"]
    },
    "JavaSE-24": {
      "overrideName": true,
      "env": {
        "PATH": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\java\\latest\\bin;${env:PATH}",
        "JAVA_TOOL_OPTIONS": "-Dstdout.encoding=UTF-8 -Dstderr.encoding=UTF-8",
        "JAVA_HOME": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\java\\latest"
      },
      "path": "cmd",
      "args": ["/k", "chcp", "65001"]
    }
  },
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.env.windows": {
    "LANG": "zh_CN.UTF-8",
    "JAVA_HOME": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\java\\21",
    "PATH": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\java\\21\\bin;${env:PATH}"
  },
  "maven.terminal.customEnv": [
    {
      "environmentVariable": "JAVA_HOME",
      "value": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\java\\21"
    }
  ],
  "java.import.gradle.java.home": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\java\\21",
  "database-client.autoSync": true,
  "java.configuration.maven.globalSettings": "F:\\soft\\apache-maven-3.9.9\\conf\\settings.xml",
  "update.showReleaseNotes": false,
  "remote.autoForwardPortsSource": "hybrid",
  "workbench.colorTheme": "Deep Blue",
  "http.proxyStrictSSL": false,
  "launch": {
    "configurations": [
      {
        "name": "ts-node-all",
        "type": "node",
        "request": "launch",
        "args": ["${relativeFile}"],
        "env": {
          "NODE_OPTIONS": "--no-warnings"
        },
        "runtimeArgs": [
          "--loader",
          "/usr/local/lib/node_modules/ts-node/esm/transpile-only.mjs",
          "-r",
          "/usr/local/lib/node_modules/ts-node/register"
        ],
        "cwd": "${workspaceRoot}",
        "internalConsoleOptions": "openOnSessionStart"
      }
    ],
    "compounds": []
  },
  "workbench.editor.empty.hint": "hidden",
  "editor.fontFamily": "MesloLGS NF,LXGW WenKai Mono,xspace,NSimSun,'Ubuntu Mono derivative Powerline',Consolas, 'Courier New', monospace",
  "editor.fontSize": 16,
  "explorer.confirmDelete": false,
  "remote.SSH.remotePlatform": {
    "阿里云服务器包年": "linux",
    "香港服务器": "linux"
  },
  "projectManager.git.baseFolders": ["E:\\github\\"],
  "git.confirmSync": false,
  "explorer.confirmDragAndDrop": false,
  "notebook.cellToolbarLocation": {
    "default": "right",
    "jupyter-notebook": "right"
  },
  "material-icon-theme.activeIconPack": "angular_ngrx",
  "material-icon-theme.hidesExplorerArrows": true,
  "workbench.startupEditor": "none",
  "remote.SSH.path": "E:\\Program Files\\Git\\usr\\bin",
  "github.gitProtocol": "ssh",
  "git.ignoreRebaseWarning": true,
  "python.terminal.activateEnvironment": false,
  "python.venvPath": "D:\\Python\\pyenv-win-3.1.1\\pyenv-win",
  "code-runner.runInTerminal": true,
  "code-runner.defaultLanguage": "javascript",
  "code-runner.executorMap": {
    "javascript": "node",
    "java": "cd $dir && javac $fileName && java $fileNameWithoutExt",
    "c": "chcp 65001,cd $dir && gcc $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    "zig": "zig run",
    "cpp": "chcp 65001,cd $dir && g++ $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    "objective-c": "cd $dir && gcc -framework Cocoa $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    "php": "php",
    "python": "cd $dir && python $fileName",
    "perl": "perl",
    "perl6": "perl6",
    "ruby": "ruby",
    "go": "go run",
    "lua": "lua",
    "groovy": "groovy",
    "powershell": "powershell -ExecutionPolicy ByPass -File",
    "bat": "cmd /c",
    "shellscript": "bash",
    "fsharp": "fsi",
    "csharp": "scriptcs",
    "vbscript": "cscript //Nologo",
    "typescript": "ts-node",
    "coffeescript": "coffee",
    "scala": "scala",
    "swift": "swift",
    "julia": "julia",
    "crystal": "crystal",
    "ocaml": "ocaml",
    "r": "Rscript",
    "applescript": "osascript",
    "clojure": "lein exec",
    "haxe": "haxe --cwd $dirWithoutTrailingSlash --run $fileNameWithoutExt",
    "rust": "cd $dir && rustc $fileName && $dir$fileNameWithoutExt",
    "racket": "racket",
    "scheme": "csi -script",
    "ahk": "autohotkey",
    "autoit": "autoit3",
    "dart": "dart",
    "pascal": "cd $dir && fpc $fileName && $dir$fileNameWithoutExt",
    "d": "cd $dir && dmd $fileName && $dir$fileNameWithoutExt",
    "haskell": "runghc",
    "nim": "nim compile --verbosity:0 --hints:off --run",
    "lisp": "sbcl --script",
    "kit": "kitc --run",
    "v": "v run",
    "sass": "sass --style expanded",
    "scss": "scss --style expanded",
    "less": "cd $dir && lessc $fileName $fileNameWithoutExt.css",
    "FortranFreeForm": "cd $dir && gfortran $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    "fortran-modern": "cd $dir && gfortran $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    "fortran_fixed-form": "cd $dir && gfortran $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    "fortran": "cd $dir && gfortran $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    "sml": "cd $dir && sml $fileName",
    "mojo": "mojo run"
  },
  "files.autoSave": "afterDelay",
  "terminalAllInOne.terminalTheme": "Ashes",
  "code-runner.saveAllFilesBeforeRun": true,
  "code-runner.saveFileBeforeRun": true,
  "files.autoGuessEncoding": true,
  "terminal.integrated.shellArgs.windows": ["/k", "chcp", "65001"],
  "terminal.integrated.minimumContrastRatio": 1,
  "terminal.integrated.drawBoldTextInBrightColors": true,
  "terminal.integrated.scrollback": 10000,
  "terminal.integrated.shellIntegration.enabled": true,
  "terminal.integrated.windowsEnableConpty": false,
  "eslint.enable": true,
  "eslint.options": {
    "extensions": [".js", ".vue", ".ts", ".tsx"]
  },
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "vue",
    "html",
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact"
  ],
  "stylelint.validate": ["css", "scss", "vue", "html"],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "terminal.integrated.cwd": "${fileDirname}",
  "GithubGistExplorer.explorer.gistSortBy": "Last Updated",
  "GithubGistExplorer.explorer.gistAscending": false,
  "GithubGistExplorer.explorer.subscriptionSortBy": "Last Updated",
  "GithubGistExplorer.explorer.subscriptionAscending": false,
  "GithubGistExplorer.github.username": "silvbb",
  "GithubGistExplorer.github.token": "自己填写",
  "files.associations": {
    "*.mjs": "javascriptreact"
  },
  "vscodeGoogleTranslate.preferredLanguage": "Chinese (Simplified)",
  "commentTranslate.targetLanguage": "zh-CN",
  "picgo.picBed.uploader": "tcyun",
  "picgo.picBed.current": "tcyun",
  "picgo.picBed.tcyun.appId": "1256989260",
  "picgo.picBed.tcyun.area": "ap-hongkong",
  "picgo.picBed.tcyun.secretId": "自己填写",
  "picgo.picBed.tcyun.secretKey": "自己填写",
  "picgo.picBed.tcyun.bucket": "jwisdom-1256989260",
  "picgo.picBed.qiniu.accessKey": "自己填写",
  "picgo.picBed.qiniu.bucket": "jwsidomtop",
  "go.gopath": "C:\\Users\\Administrator\\go",
  "files.exclude": {
    "**/.git": false
  },
  "code-runner.executorMapByFileExtension": {
    ".vb": "cd $dir && vbc /nologo $fileName && $dir$fileNameWithoutExt",
    ".vbs": "cscript //Nologo",
    ".scala": "scala",
    ".jl": "julia",
    ".cr": "crystal",
    ".ml": "ocaml",
    ".zig": "zig run",
    ".exs": "elixir",
    ".hx": "haxe --cwd $dirWithoutTrailingSlash --run $fileNameWithoutExt",
    ".rkt": "racket",
    ".scm": "csi -script",
    ".ahk": "autohotkey",
    ".au3": "autoit3",
    ".kt": "cd $dir && kotlinc $fileName -include-runtime -d $fileNameWithoutExt.jar && java -jar $fileNameWithoutExt.jar",
    ".kts": "kotlinc -script",
    ".dart": "dart",
    ".pas": "cd $dir && fpc $fileName && $dir$fileNameWithoutExt",
    ".pp": "cd $dir && fpc $fileName && $dir$fileNameWithoutExt",
    ".d": "cd $dir && dmd $fileName && $dir$fileNameWithoutExt",
    ".hs": "runhaskell",
    ".nim": "nim compile --verbosity:0 --hints:off --run",
    ".csproj": "dotnet run --project",
    ".fsproj": "dotnet run --project",
    ".lisp": "sbcl --script",
    ".kit": "kitc --run",
    ".v": "v run",
    ".vsh": "v run",
    ".sass": "sass --style expanded",
    ".cu": "cd $dir && nvcc $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    ".ring": "ring",
    ".sml": "cd $dir && sml $fileName",
    ".mojo": "mojo run"
  },
  "fittencode.languagePreference.displayPreference": "zh-cn",
  "fittencode.languagePreference.commentPreference": "zh-cn",
  "[python]": {
    "diffEditor.ignoreTrimWhitespace": false,
    "editor.formatOnType": true,
    "editor.wordBasedSuggestions": "off"
  },
  "editor.renderWhitespace": "all",
  "code-eol.highlightNonDefault": true,
  "update.enableWindowsBackgroundUpdates": false,
  "baidu.comate.username": "铁子帮铁骑QQ",
  "baidu.comate.license": "c73500bd-de9a-4ae2-ae28-85d210b22137",
  "baidu.comate.langSuggestion": {
    "scheme": true,
    "python": true,
    "tcsh": true,
    "haskell": true,
    "ocaml": true,
    "stan": true,
    "scss": true,
    "mathematica": true,
    "others": true,
    "javaserverpages": true,
    "fsharp": true,
    "kotlin": true,
    "racket": true,
    "cuda": true,
    "stata": true,
    "alloy": true,
    "sql": true,
    "standardml": true,
    "rmarkdown": true,
    "commonlisp": true,
    "smalltalk": true,
    "assembly": true,
    "erlang": true,
    "xml": true,
    "scala": true,
    "jupyter": true,
    "sas": true,
    "antlr": true,
    "solidity": true,
    "graphql": true,
    "tex": true,
    "batchfile": true,
    "systemverilog": true,
    "cpp": true,
    "php": true,
    "mermaid": true,
    "pug": true,
    "pascal": true,
    "shell": true,
    "clojure": true,
    "protocolbuffer": true,
    "applescript": true,
    "thrift": true,
    "visualbasic": true,
    "sass": true,
    "swan": true,
    "css": true,
    "san": true,
    "idris": true,
    "groovy": true,
    "yacc": true,
    "ruby": true,
    "yaml": true,
    "dockerfile": true,
    "objectivec": true,
    "glsl": true,
    "elixir": true,
    "fortran": true,
    "stylus": true,
    "elm": true,
    "maple": true,
    "tcl": true,
    "literateagda": true,
    "powershell": true,
    "go": true,
    "agda": true,
    "emacslisp": true,
    "augeas": true,
    "java": true,
    "html": true,
    "literatehaskell": true,
    "dart": true,
    "r": true,
    "zig": true,
    "javascript": true,
    "verilog": true,
    "typescript": true,
    "sparql": true,
    "isabelle": true,
    "perl": true,
    "julia": true,
    "coffeescript": true,
    "lua": true,
    "awk": true,
    "markdown": true,
    "lean": true,
    "less": true,
    "rust": true,
    "csharp": true,
    "literatecoffeescript": true,
    "all": true,
    "ada": true,
    "bluespec": true,
    "cmake": true,
    "json": true,
    "xslt": true,
    "matlab": true,
    "vhdl": true,
    "makefile": true,
    "vue": true,
    "swift": true,
    "prolog": true,
    "restructuredtext": true
  },
  "baidu.comate.enableSecurityEnhancement": false,
  "baidu.comate.linePreferMode": "auto",
  "window.confirmBeforeClose": "always",
  "git.enableSmartCommit": true,
  "rsp-ui.enableStartServerOnActivation": [
    {
      "id": "redhat.vscode-community-server-connector",
      "name": "Community Server Connector",
      "startOnActivation": true
    }
  ],
  "oneDarkPro.editorTheme": "Tokyo",
  "oneDarkPro.bold": true,
  "oneDarkPro.vivid": true,
  "diffEditor.maxComputationTime": 0,
  "replacerules.rules": {},
  "baidu.comate.completionLength": "auto",
  "rsp-ui.rsp.java.home": "C:\\Users\\10640\\AppData\\Roaming\\Trae\\User\\globalStorage\\pleiades.java-extension-pack-jdk\\java\\21"
}

```
