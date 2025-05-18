import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('markdown-table.deleteColumn', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No editor is active');
            return;
        }

        const document = editor.document;
        const cursorPosition = editor.selection.active;
        const cursorLine = cursorPosition.line;
        const cursorChar = cursorPosition.character;

        const lines = document.getText().split('\n');

        // Determine the column to delete (based on the current cursor position)
        const headerLine = lines[cursorLine];
        const columns = headerLine.split('|');

        let columnIndex = -1;
        let cumulativeLength = 0;

        for (let i = 0; i < columns.length; i++) {
            cumulativeLength += columns[i].length + 1; // Using +1 for the '|' character
            if (cursorChar <= cumulativeLength) {
                columnIndex = i;
                break;
            }
        }

        if (columnIndex === -1) {
            vscode.window.showInformationMessage('Unable to determine column index');
            return;
        }

        // Delete the column in all lines
        const updatedLines = lines.map(line => {
            const cells = line.split('|');
            if (columnIndex < cells.length) {
                cells.splice(columnIndex, 1);
            }
            return cells.join('|').replace(/\s+\|\s+/g, ' | ').trim();
        });

        const updatedText = updatedLines.join('\n');

        editor.edit(editBuilder => {
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(document.getText().length)
            );
            editBuilder.replace(fullRange, updatedText);
        });

        vscode.window.showInformationMessage('Column deleted successfully');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
