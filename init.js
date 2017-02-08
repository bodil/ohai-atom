"use babel";

import PackageManager from "./packages/sync-settings/lib/package-manager";

function installPackage(name) {
  return new Promise((resolve, reject) => {
    if (atom.packages.getAvailablePackageNames().indexOf(name) >= 0) {
      return resolve(true);
    }
    const note = atom.notifications.addInfo(
      `Installing '${name}'`, {dismissable: true}
    );
    const apm = new PackageManager();
    apm.getPackage(name).then((pkg) => {
      return new Promise((resolve, reject) => {
        apm.install(pkg, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }, (err) => {
      console.error("installPackage:", err);
      note.dismiss();
      atom.notifications.addError(`Unknown package '${name}'`);
      reject(err);
    }).then(() => {
      note.dismiss();
      atom.notifications.addSuccess(`Installed '${name}'`);
      resolve(true);
    }, (err) => {
      console.error("installPackage:", err);
      note.dismiss();
      atom.notifications.addError(`Failed to install '${name}'`);
      reject(err);
    });
  });
}

function configSet(scope, opts) {
  for (let key of Object.keys(opts)) {
    atom.config.set(`${scope}.${key}`, opts[key]);
  }
}

function usePackage(name, opts = {}) {
  // Set package config from the `config` object
  if (typeof opts.config === "object") {
    configSet(name, opts.config);
  }

  installPackage(name).then(() => {
    // If `enableKeys` is true, add package to disable-keybindings exceptions.
    if (opts.enableKeys == true) {
      const l = atom.config.get("disable-keybindings.exceptCommunityPackages");
      if (l.indexOf(name) < 0) {
        l.push(name);
      }
      atom.config.set("disable-keybindings.exceptCommunityPackages", l);
    }

    // If a keymap is specified, insert it.
    if (typeof opts.keymap === "object") {
      const k = {};
      for (let selector of Object.keys(opts.keymap)) {
        const m = opts.keymap[selector];
        const o = {};
        for (let key of Object.keys(m)) {
          let cmd = m[key];
          if (cmd.indexOf(":") < 0) {
            cmd = `${name}:${cmd}`;
          }
          o[key] = cmd;
        }
        k[selector] = o;
      }
      atom.keymaps.add(`${__filename}/${name}`, k);
    }
  });
}



// General keybindings

atom.keymaps.add(__filename, {
  "atom-text-editor:not([mini])": {
    "ctrl-alt-'": "editor:split-selections-into-lines"
  },
  "atom-workspace": {
    'ctrl-x left': 'pane:split-left-and-copy-active-item',
    'ctrl-x right': 'pane:split-right-and-copy-active-item',
    'ctrl-x up': 'pane:split-up-and-copy-active-item',
    'ctrl-x down': 'pane:split-down-and-copy-active-item',
    'ctrl-x ctrl-left': 'window:focus-pane-on-left',
    'ctrl-x ctrl-right': 'window:focus-pane-on-right',
    'ctrl-x ctrl-up': 'window:focus-pane-above',
    'ctrl-x ctrl-down': 'window:focus-pane-below'
  }
});

// Packages

usePackage("disable-keybindings", {
  config: {
    allCommunityPackages: true,
    exceptCommunityPackages: []
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
    "atom-workspace atom-text-editor": {
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

usePackage("hyperclick-markdown");
usePackage("hyperlink-hyperclick");
usePackage("js-hyperclick");
usePackage("path-hyperclick");

usePackage("run-in-atom");

usePackage("advanced-open-file", {
  config: {
    createDirectories: true,
    createFileInstantly: true,
    helmDirSwitch: true
  },
  keymap: {
    ".advanced-open-file atom-text-editor": {
      'up': 'advanced-open-file:move-cursor-up',
      'down': 'advanced-open-file:move-cursor-down',
      'left': 'advanced-open-file:delete-path-component',
      'right': 'advanced-open-file:autocomplete',
      'tab': 'advanced-open-file:autocomplete',
      'ctrl-i': 'advanced-open-file:autocomplete',
      'ctrl-p': 'advanced-open-file:move-cursor-up',
      'ctrl-n': 'advanced-open-file:move-cursor-down',
      'ctrl-w': 'advanced-open-file:delete-path-component',
      'ctrl-/': 'advanced-open-file:undo'
    }
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
  }
});

usePackage("autocomplete-plus", {
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
    panelVisibility: "Keep Visible",
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
  config: {
    lintOnFlyInterval: 1000,
    showErrorTabLine: true
  }
});

usePackage("platformio-ide-terminal", {
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

// PureScript

usePackage("language-purescript");

usePackage("ide-purescript", {
  enableKeys: true
});

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



// General options

configSet("core", {
  autoHideMenuBar: true,
  disabledPackages: [
    "tabs",
    "sync-settings"
  ],
  openEmptyEditorOnStart: false,
  themes: ["atom-material-ui", "atom-dark-syntax"]
});

configSet("editor", {
  fontFamily: "PragmataPro",
  lineHeight: 1.3,
  softWrap: true,
  tabType: "soft"
});
