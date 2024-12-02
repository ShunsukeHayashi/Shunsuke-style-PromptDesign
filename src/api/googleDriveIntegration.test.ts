// Google Drive APIのテスト
import { uploadFile, downloadFile } from './googleDriveIntegration';
import fs from 'fs';
import path from 'path';

const testFilePath = path.join(__dirname, 'testFile.txt'); // テスト用ファイルのパス
const downloadedFilePath = path.join(__dirname, 'downloadedFile.txt'); // ダウンロード先のファイルパス

// テスト用ファイルを作成
fs.writeFileSync(testFilePath, 'This is a test file.');

// アップロードテスト
test('ファイルがGoogle Driveにアップロードされることを確認', async () => {
  const fileId = await uploadFile(testFilePath, 'text/plain');
  expect(fileId).toBeDefined(); // ファイルIDが定義されていることを確認
  expect(typeof fileId).toBe('string'); // fileIdが文字列であることを確認
});

// ダウンロードテスト
test('ファイルがGoogle Driveからダウンロードされることを確認', async () => {
  const fileId = await uploadFile(testFilePath, 'text/plain'); // アップロードしてファイルIDを取得
  expect(fileId).toBeDefined(); // fileIdが定義されていることを確認
  if (fileId) { // fileIdが有効な場合のみダウンロードを実行
    await downloadFile(fileId, downloadedFilePath); // ダウンロード
    const fileExists = fs.existsSync(downloadedFilePath); // ダウンロードしたファイルが存在するか確認
    expect(fileExists).toBe(true); // ファイルが存在することを確認
  } else {
    throw new Error('ファイルIDが無効です。');
  }
});
