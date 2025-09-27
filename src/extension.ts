// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Word and Character Count extension is active!');

	const statusBarItem = vscode.window.createStatusBarItem('wordCharCount', vscode.StatusBarAlignment.Right, 100);
	statusBarItem.name = 'Word & Char Count';
	context.subscriptions.push(statusBarItem);

	function updateStatusBar() {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			statusBarItem.hide();
			return;
		}
		const doc = editor.document;
		let text = '';
		if (editor.selection && !editor.selection.isEmpty) {
			text = doc.getText(editor.selection);
		} else {
			text = doc.getText();
		}
		const charCount = text.length;
		const wordCount = (text.match(/\b\w+\b/g) || []).length;
		statusBarItem.text = `$(pencil) ${wordCount} palavras, ${charCount} caracteres`;
		statusBarItem.tooltip = 'Contagem de palavras e caracteres (seleção ou documento)';
		statusBarItem.show();
	}

	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(updateStatusBar),
		vscode.window.onDidChangeTextEditorSelection(updateStatusBar),
		vscode.workspace.onDidChangeTextDocument(updateStatusBar)
	);

	updateStatusBar();
}

// This method is called when your extension is deactivated
export function deactivate() {}
