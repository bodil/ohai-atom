"use babel";

import {usePackage, configSet} from "atom-use-package";

//
//
// General options

const darkThemes = ["atom-dark-ui", "atom-dark-syntax"];
const lightThemes = ["atom-light-ui", "atom-light-syntax"];

configSet("core", {
  autoHideMenuBar: true,
  disabledPackages: ["background-tips", "tabs"],
  openEmptyEditorOnStart: false,
  restorePreviousWindowsOnStart: "no",
  themes: darkThemes
});

configSet("editor", {
  fontFamily: "PragmataPro",
  lineHeight: 1.3,
  softWrap: true,
  tabType: "soft",
  scrollPastEnd: true
});

configSet("atom-package-deps", {
  ignored: ["prettier-atom", "linter-eslint", "linter-jsonlint"]
});

//
//
// General keybindings

function subwordNavigateCursor(cursor, selection, moveToNext, lookRight) {
  const oldPos = cursor.getBufferPosition();
  moveToNext(cursor, selection);
  const pos = cursor.getBufferPosition();
  if (oldPos.isEqual(pos)) {
    return;
  }
  const line = cursor.getCurrentBufferLine();
  const column = cursor.getScreenColumn();
  const next = lookRight ? line.substr(column, 1) : line.substr(column - 1, 1);
  if (!/\w/.test(next)) {
    subwordNavigateCursor(cursor, selection, moveToNext, lookRight);
  }
}

function subwordNavigate(step, lookRight) {
  return function(event) {
    const editor = event.currentTarget.getModel();
    if (editor && atom.workspace.isTextEditor(editor)) {
      const selection = editor.getSelections();
      editor.getCursors().forEach((cursor, i) => {
        subwordNavigateCursor(cursor, selection[i], step, lookRight);
      });
    }
  };
}

atom.commands.add(
  "atom-workspace atom-text-editor",
  "editor:emacs-move-subword-left",
  subwordNavigate((cursor, _) => cursor.moveToPreviousSubwordBoundary(), true)
);

atom.commands.add(
  "atom-workspace atom-text-editor",
  "editor:emacs-move-subword-right",
  subwordNavigate((cursor, _) => cursor.moveToNextSubwordBoundary(), false)
);

atom.commands.add(
  "atom-workspace atom-text-editor",
  "editor:emacs-select-subword-left",
  subwordNavigate(
    (_, selection) => selection.selectToPreviousSubwordBoundary(),
    true
  )
);

atom.commands.add(
  "atom-workspace atom-text-editor",
  "editor:emacs-select-subword-right",
  subwordNavigate(
    (_, selection) => selection.selectToNextSubwordBoundary(),
    false
  )
);

atom.commands.add("atom-workspace", "application:switch-to-light-theme", _e =>
  configSet("core", {
    themes: lightThemes
  })
);

atom.commands.add("atom-workspace", "application:switch-to-dark-theme", _e =>
  configSet("core", {
    themes: darkThemes
  })
);

atom.keymaps.add(__filename, {
  "atom-workspace atom-text-editor:not([mini])": {
    "ctrl-alt-'": "editor:split-selections-into-lines",
    "ctrl-a": "editor:move-to-first-character-of-line",
    "ctrl-e": "editor:move-to-end-of-line",
    "ctrl-up": "editor:move-to-beginning-of-previous-paragraph",
    "ctrl-down": "editor:move-to-beginning-of-next-paragraph",
    "ctrl-shift-up": "editor:select-to-beginning-of-previous-paragraph",
    "ctrl-shift-down": "editor:select-to-beginning-of-next-paragraph"
  },
  "atom-workspace atom-text-editor": {
    "ctrl-left": "editor:emacs-move-subword-left",
    "ctrl-right": "editor:emacs-move-subword-right",
    "ctrl-shift-left": "editor:emacs-select-subword-left",
    "ctrl-shift-right": "editor:emacs-select-subword-right",
    "ctrl-backspace": "editor:delete-to-beginning-of-subword",
    "ctrl-delete": "editor:delete-to-end-of-subword"
  },
  "atom-workspace": {
    "ctrl-x left": "pane:split-left-and-copy-active-item",
    "ctrl-x right": "pane:split-right-and-copy-active-item",
    "ctrl-x up": "pane:split-up-and-copy-active-item",
    "ctrl-x down": "pane:split-down-and-copy-active-item",
    "ctrl-x ctrl-left": "window:focus-pane-on-left",
    "ctrl-x ctrl-right": "window:focus-pane-on-right",
    "ctrl-x ctrl-up": "window:focus-pane-above",
    "ctrl-x ctrl-down": "window:focus-pane-below",
    "ctrl-x t": "tree-view:toggle",
    "ctrl-x ctrl-g": "project-find:toggle",
    "ctrl-c b": "window:toggle-bottom-dock",
    "ctrl-c n": "window:toggle-right-dock",
    "ctrl-x ctrl-c": "window:close"
  },
  ".tree-view": {
    enter: "tree-view:expand-item",
    right: "tree-view:expand-item",
    left: "tree-view:collapse-directory"
  }
});

//
//
// Packages

usePackage("disable-keybindings", {
  config: {
    allBundledPackages: true,
    allCommunityPackages: true,
    exceptCommunityPackages: [],
    prefixKeys: ["ctrl-k"]
  }
});

usePackage("base16-syntax");
usePackage("file-icons");

// usePackage("monokai", {
//   init: () => {
//     atom.config.set("core.themes", ["atom-dark-ui", "monokai"]);
//   }
// });

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

usePackage("organized", {
  enableKeys: true,
  config: {
    enableToolbarSupport: false
  }
});

usePackage("find-and-replace", {
  keymap: {
    "atom-text-editor:not([mini])": {
      "ctrl-'": "select-next",
      "ctrl-shift-'": "select-all"
    }
  }
});

usePackage("incsearch", {
  keymap: {
    "atom-workspace atom-text-editor.emacs-plus:not([mini])": {
      "ctrl-s": "toggle",
      "ctrl-r": "toggle"
    },
    ".incsearch": {
      "ctrl-s": "incsearch:goto:next-match",
      "ctrl-r": "incsearch:goto:prev-match"
    }
  }
});

usePackage("clipboard-history", {
  keymap: {
    "atom-text-editor:not([mini])": {
      "alt-y": "paste"
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

usePackage("highlight-selected");

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

usePackage("magic-reflow", {
  keymap: {
    "atom-workspace atom-text-editor.emacs-plus:not([mini])": {
      "alt-q": "reflow"
    }
  }
});

usePackage("autocomplete-plus", {
  keymap: {
    "atom-text-editor:not([mini])": {
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

usePackage("github", {
  keymap: {
    "atom-workspace": {
      "ctrl-x g": "github:toggle-git-tab"
    }
  }
});

usePackage("jumpy", {
  keymap: {
    "atom-text-editor:not([mini])": {
      "ctrl-;": "toggle"
    },
    "atom-text-editor.jumpy-jump-mode:not([mini])": {
      backspace: "reset",
      "ctrl-g": "clear"
    }
  }
});

usePackage("trailing-spaces");
usePackage("spaces-in-braces");
usePackage("atom-oss-license");
usePackage("undo-tree");
usePackage("mouse-autohide");

usePackage("project-manager", {
  keymap: {
    "atom-workspace": {
      "ctrl-x p e": "edit-project",
      "ctrl-x p s": "save-project",
      "ctrl-x p p": "list-projects",
      "ctrl-x p shift-e": "edit-projects"
    }
  }
});

usePackage("file-watcher", {
  config: {
    autoReload: true
  }
});

usePackage("docblockr", {
  enableKeys: true
});

usePackage("atom-beautify", {
  keymap: {
    "atom-workspace atom-text-editor": {
      "ctrl-c ctrl-f": "beautify-editor"
    }
  }
});

usePackage("travis-ci-status", {
  keymap: {
    "atom-workspace": {
      "ctrl-c t t": "toggle-build-matrix",
      "ctrl-c t o": "open-on-travis"
    }
  }
});

usePackage("rustsym", {
  keymap: {
    "atom-workspace atom-text-editor": {
      "ctrl-.": "symbols-view:toggle-file-symbols"
    }
  }
});

usePackage("narrow", {
  keymap: {
    "atom-workspace atom-text-editor.emacs-plus:not([mini])": {
      "ctrl-c ctrl-s": "scan",
      "ctrl-c s": "search"
    },
    "atom-workspace.has-narrow atom-text-editor": {
      "ctrl-g": "close",
      "ctrl-f": "narrow:focus",
      "ctrl-i": "narrow:focus-prompt"
    },
    ".narrow-editor": {
      "ctrl-g": "close",
      enter: "core:confirm",
      backspace: "narrow-ui:exclude-file",
      "ctrl-backspace": "narrow-ui:clear-excluded-files",
      n: "narrow-ui:move-to-next-file-item",
      p: "narrow-ui:move-to-previous-file-item",
      "ctrl-f": "narrow:focus",
      "ctrl-i": "narrow:focus-prompt",
      "ctrl-t": "narrow:relocate"
    }
  }
});

usePackage("git-plus", {
  config: {
    general: {
      alwaysOpenDockWithResult: true,
      splitPane: "Right"
    },
    remoteInteractions: {
      pullAutostash: true,
      pullBeforePush: true
    },
    tags: {
      signTags: true
    }
  },
  keymap: {
    "atom-workspace": {
      "ctrl-c g": "git-plus:menu",
      "ctrl-c ctrl-g": "git-plus:run"
    }
  }
});

usePackage("git-rebase", {
  enableKeys: true
});

usePackage("autoclose-html", {
  enableKeys: true
});

//
//
// Atom IDE

usePackage("atom-ide-ui", {
  keymap: {
    "atom-workspace atom-text-editor.enable-atom-ide-find-references": {
      "ctrl-c ctrl-f": "code-format:format-code"
    },
    "atom-workspace atom-text-editor.emacs-plus:not([mini])": {
      "alt-n": "diagnostics:go-to-next-diagnostic",
      "alt-p": "diagnostics:go-to-previous-diagnostic",
      "ctrl-c s": "diagnostics:show-actions-at-position",
      "ctrl-c alt-s": "diagnostics:fix-all-in-current-file",
      "ctrl-c r": "find-references:activate",
      "ctrl-t": "datatip:toggle",
      "alt-.": "hyperclick:confirm-cursor"
    },
    "atom-workspace": {
      "ctrl-c o": "outline-view:toggle",
      "ctrl-c l": "diagnostics:toggle-table"
    }
  },
  config: {
    "atom-ide-find-references": {
      defaultLocationForPane: "right"
    },
    "atom-ide-diagnostics-ui": {
      autoVisibility: true
    },
    "atom-ide-code-format": {
      formatOnSave: true
    },
    "atom-ide-terminal": {
      fontFamily: "PragmataPro"
    }
  }
});

usePackage("ide-typescript", {
  config: {
    returnTypeInAutocomplete: "right"
  }
});

//
//
// Rust

configSet(
  "editor",
  {
    preferredLineLength: 80
  },
  {scopeSelector: ".rust.source"}
);

usePackage("ide-rust", {
  config: {
    rlsToolchain: "nightly",
    rlsDefaultConfig: {
      allTargets: "On",
      clippyPreference: "On"
    }
  }
});

usePackage("build-cargo");

usePackage("autocomplete-crates");
// usePackage("rustsym");

//
//
// JavaScript

usePackage("linter-eslint");

usePackage("prettier-atom", {
  keymap: {
    "atom-workspace atom-text-editor[data-grammar='source js']": {
      "ctrl-c ctrl-f": "prettier:format"
    }
  },
  config: {
    useEslint: true,
    formatOnSave: false,
    singleQuote: false,
    trailingComma: false,
    bracketSpacing: false
  }
});

//
//
// PureScript

usePackage("language-purescript");

usePackage("ide-purescript", {
  enableKeys: true
});

//
//
// Everybody loves XML
usePackage("tag");
usePackage("double-tag", {
  config: {
    allowEndTagSync: true
  }
});

//
//
// Misc languages

usePackage("linter-jsonlint");
usePackage("language-papyrus");
usePackage("language-stellaris");
usePackage("language-fish-shell");
