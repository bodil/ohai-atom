"use babel";

import {usePackage, configSet} from "atom-use-package";
import path from "path";

//
//
// General options

configSet("core", {
  autoHideMenuBar: true,
  disabledPackages: ["background-tips", "tabs"],
  openEmptyEditorOnStart: false
});

configSet("editor", {
  fontFamily: "PragmataPro",
  lineHeight: 1.3,
  softWrap: true,
  tabType: "soft"
});

//
//
// General keybindings

atom.keymaps.add(__filename, {
  "atom-text-editor:not([mini])": {
    "ctrl-alt-'": "editor:split-selections-into-lines"
  },
  "atom-workspace": {
    "ctrl-x left": "pane:split-left-and-copy-active-item",
    "ctrl-x right": "pane:split-right-and-copy-active-item",
    "ctrl-x up": "pane:split-up-and-copy-active-item",
    "ctrl-x down": "pane:split-down-and-copy-active-item",
    "ctrl-x ctrl-left": "window:focus-pane-on-left",
    "ctrl-x ctrl-right": "window:focus-pane-on-right",
    "ctrl-x ctrl-up": "window:focus-pane-above",
    "ctrl-x ctrl-down": "window:focus-pane-below"
  }
});

//
//
// Packages

usePackage("disable-keybindings", {
  config: {
    allCommunityPackages: true,
    exceptCommunityPackages: []
  }
});

usePackage("contrast-light-syntax");
usePackage("monokai", {
  init: () => {
    // const ui = atom.config.get("core.themes")[0];
    atom.config.set("core.themes", ["atom-dark-ui", "monokai"]);
  }
});

usePackage("atom-material-ui", {
  config: {
    colors: {
      abaseColor: "#ec407a",
      accentColor: "#46ffc1",
      genAccent: true,
      predefinedColor: "Pink"
    },
    fonts: {
      fontSize: 15
    },
    tabs: {
      compactTabs: true,
      noTabMinWidth: true
    },
    ui: {
      panelContrast: true,
      panelShadows: true
    }
  },
  init: () => {
    const syntax = atom.config.get("core.themes")[1];
    atom.config.set("core.themes", ["atom-material-ui", syntax]);
  }
});

usePackage("advanced-open-file", {
  config: {
    createDirectories: true,
    createFileInstantly: true,
    helmDirSwitch: true
  },
  keymap: {
    ".advanced-open-file atom-text-editor": {
      up: "advanced-open-file:move-cursor-up",
      down: "advanced-open-file:move-cursor-down",
      left: "advanced-open-file:delete-path-component",
      right: "advanced-open-file:autocomplete",
      tab: "advanced-open-file:autocomplete",
      "ctrl-i": "advanced-open-file:autocomplete",
      "ctrl-p": "advanced-open-file:move-cursor-up",
      "ctrl-n": "advanced-open-file:move-cursor-down",
      "ctrl-w": "advanced-open-file:delete-path-component",
      "ctrl-/": "advanced-open-file:undo"
    }
  }
});

usePackage("emacs-plus", {
  enableKeys: true
});

usePackage("emacs-tab", {
  enableKeys: true
});

usePackage("find-and-replace", {
  keymap: {
    "atom-text-editor:not([mini])": {
      "ctrl-'": "select-next",
      "ctrl-shift-'": "select-all"
    }
  }
});

usePackage("clipboard-plus", {
  keymap: {
    "atom-text-editor:not([mini])": {
      "alt-y": "toggle"
    }
  }
});

usePackage("expand-region", {
  keymap: {
    "atom-workspace atom-text-editor:not([mini])": {
      "ctrl-=": "expand",
      "ctrl-alt-=": "shrink"
    }
  }
});

usePackage("keybinding-cheatsheet", {
  keymap: {
    "atom-workspace": {
      "ctrl-h ctrl-m": "toggle"
    }
  }
});

usePackage("keybinding-resolver", {
  keymap: {
    "atom-workspace": {
      "ctrl-h k": "key-binding-resolver:toggle"
    }
  }
});

usePackage("fuzzy-finder", {
  keymap: {
    "atom-workspace": {
      "ctrl-x f": "toggle-file-finder"
    }
  }
});

usePackage("hyperclick", {
  enableKeys: true
});
usePackage("hyperclick-markdown");
usePackage("hyperlink-hyperclick");
usePackage("js-hyperclick");
usePackage("path-hyperclick");

usePackage("run-in-atom");

usePackage("autocomplete-plus", {
  keymap: {
    "atom-workspace atom-text-editor:not([mini])": {
      "ctrl-\\": "activate"
    }
  },
  config: {
    autoActivationDelay: 1000,
    backspaceTriggersAutocomplete: true,
    confirmCompletion: "tab always, enter when suggestion explicitly selected",
    enableAutoConfirmSingleSuggestion: false,
    enableExtendedUnicodeSupport: true
  }
});

usePackage("build", {
  enableKeys: true,
  config: {
    panelVisibility: "Toggle",
    refreshOnShowTargetList: true,
    buildOnSave: true,
    saveOnBuild: true,
    scrollOnError: true,
    stealFocus: false
  }
});

usePackage("atomatigit", {
  enableKeys: true,
  keymap: {
    "atom-workspace": {
      "ctrl-x g": "toggle"
    }
  }
});

usePackage("jumpy", {
  enableKeys: true
});

usePackage("linter", {
  keymap: {
    "atom-workspace atom-text-editor:not([mini])": {
      "alt-n": "linter:next-error",
      "alt-p": "linter:previous-error"
    }
  },
  config: {
    lintOnFlyInterval: 1000,
    showErrorTabLine: true,
    ignoreVCSIgnoredFiles: false
  }
});

usePackage("platformio-ide-terminal", {
  keymap: {
    "atom-workspace": {
      "ctrl-x e": "toggle"
    }
  },
  config: {
    ansiColors: {
      normal: {
        blue: "#4c4cff"
      },
      zBright: {
        brightBlue: "#6565d1"
      }
    },
    style: {
      animationSpeed: 100,
      defaultPanelHeight: "20%",
      fontFamily: "PragmataPro",
      theme: "solarized-dark"
    },
    toggles: {
      autoClose: true
    }
  }
});

usePackage("underline-trailing-whitespace");

usePackage("spaces-in-braces");

usePackage("project-jump", {
  keymap: {
    "atom-workspace": {
      "ctrl-x p a": "project-jump:add",
      "ctrl-x p o": "project-jump:open",
      "ctrl-x p p": "project-jump:switch",
      "ctrl-x p r": "project-jump:remove"
    }
  }
});

usePackage("word-jumper-deluxe", {
  keymap: {
    "atom-workspace atom-text-editor:not([mini])": {
      "ctrl-left": "word-jumper-deluxe:move-left",
      "ctrl-backspace": "word-jumper-deluxe:remove-left",
      "ctrl-shift-left": "word-jumper-deluxe:select-left",
      "ctrl-right": "word-jumper-deluxe:move-right",
      "ctrl-del": "word-jumper-deluxe:remove-right",
      "ctrl-shift-right": "word-jumper-deluxe:select-right"
    }
  }
});

usePackage("file-watcher", {
  config: {
    autoReload: true
  }
});

usePackage("atom-oss-license");

//
//
// PureScript

usePackage("language-purescript");

usePackage("ide-purescript", {
  enableKeys: true
});

//
//
// Rust

usePackage("atom-language-rust");

usePackage("racer", {
  config: {
    racerBinPath: "/home/bodil/.cargo/bin/racer",
    rustSrcPath: "/home/bodil/workspace/rust/src/rustc-1.15.0-src/src"
  }
});

usePackage("build-cargo", {
  config: {
    extCommands: {
      cargoCheck: true
    }
  }
});

usePackage("linter-rust");

usePackage("rustsym");

//
//
// JavaScript

usePackage("linter-eslint", {
  keymap: {
    "atom-workspace atom-text-editor[data-grammar='source js']": {
      "ctrl-c f": "linter-eslint:fix-file"
    }
  },
  config: {
    disableWhenNoEslintConfig: false,
    useGlobalEslint: true,
    eslintrcPath: path.join(process.env.HOME, ".eslintrc")
  }
});

usePackage("prettier-atom", {
  keymap: {
    "atom-workspace atom-text-editor[data-grammar='source js']": {
      "ctrl-c tab": "prettier:format"
    }
  },
  config: {
    formatOnSave: false,
    singleQuote: false,
    trailingComma: false,
    bracketSpacing: false
  }
});
