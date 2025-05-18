VSCode extension to delete the current selected column in a markdown table.

# Installation

Install extension from VSCode marketplace.

https://marketplace.visualstudio.com/items?itemName=quartic-it.markdown-table-column-deleter

# Usage

- In Markdown table, place the cursor in the column you want to delete
- In command palette, select "Delete Column in Markdown Table"

# Development

Clone:

https://github.com/quartic-it/markdown-table-column-deleter

Build:

    npm run compile

Package to vsix:

    vsce package

Install and test in VScode (command palette > "Extensions: Install from VSIX").
