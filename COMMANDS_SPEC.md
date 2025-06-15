# Command Specification

This document records the behavior of the Tauri commands implemented in the original project.

### Data directory

All files reside in `<APPDATA>/fextify` on the host system. A `config.json`
file tracks children, opened ids and the current theme:

```json
{
  "children": [{ "id": "uuid", "path": "Untitled-uuid" }],
  "opened": [],
  "theme": "themes/default.css"
}
```

### Command list

## save_file
- **Arguments:** `path: String`, `content: String`
- **Behavior:** writes `content` to a markdown file located at `<APPDATA>/path`. The `.md` extension is expected by callers.

## delete_file
- **Arguments:** `path: String`
- **Behavior:** removes `<APPDATA>/path` and deletes the matching child entry in `config.json`. Returns `0` on completion.

## read_file
- **Arguments:** `path: String`
- **Behavior:** reads the markdown file `<APPDATA>/path.md` and returns `(path, contents)`. Returns `("")` pair if the file does not exist.

## read_file_by_id
- **Arguments:** `id: String`
- **Behavior:** looks up the file path associated with `id` in `config.json` then delegates to `read_file`.

## new_file
- **Arguments:** none
- **Behavior:** generates a unique id, creates an empty file named `Untitled <id>.md`, records the file in `config.json` and marks it opened. Returns `(title, "")`.

## set_theme
- **Arguments:** `name: String`
- **Behavior:** updates the `theme` field of `config.json` with the provided stylesheet path.

## get_theme
- **Arguments:** none
- **Behavior:** reads the current theme path from `config.json`. If missing, writes and returns `themes/default.css`.

## delete_child
- **Arguments:** `path: &str`
- **Behavior:** removes the entry with matching `path` from the `children` list in `config.json`.

## find_by_id
- **Arguments:** `id: String`
- **Behavior:** returns the path associated with `id` from `config.json`, or `"None"` if not found.

## find_by_path
- **Arguments:** `path: &str`
- **Behavior:** returns the id associated with `path` from `config.json`, or `"None"` if not found.

## update_opened
- **Arguments:** `path: String`, `add: bool`
- **Behavior:** adds or removes the file id for `path` in the `opened` array of `config.json` and returns the updated array.

## open_file
- **Arguments:** `path: String`
- **Behavior:** ensures the file is registered in `config.json`, marks it opened and returns its contents using `read_file`.

## save_title
- **Arguments:** `old_path: String`, `new_path: String`
- **Behavior:** renames the file on disk and updates the associated entry in `config.json` to keep ids in sync.

## retrieve_opened
- **Arguments:** none
- **Behavior:** returns the array of opened file ids from `config.json`.

