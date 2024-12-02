// Google Drive APIクライアント設定
import { google } from 'googleapis';
import fs from 'fs'; // fsモジュールをインポート

const drive = google.drive({
  version: 'v3',
  auth: '', // ここにAPIキーを設定
});

// ファイルのアップロード関数
export const uploadFile = async (filePath: string, mimeType: string) => {
  const fileMetadata = {
    name: 'uploaded_file', // アップロードするファイル名
  };
  const media = {
    mimeType: mimeType,
    body: fs.createReadStream(filePath),
  };
  
  const response = await drive.files.create({
    requestBody: fileMetadata, // resourceをrequestBodyに変更
    media: media,
    fields: 'id',
  });
  
  return response.data.id; // アップロードしたファイルのIDを返す
};

// ファイルのダウンロード関数
export const downloadFile = async (fileId: string, dest: string) => {
  const destStream = fs.createWriteStream(dest);
  
  const response = await drive.files.get({
    fileId: fileId,
    alt: 'media',
  }, { responseType: 'stream' });
  
  response.data
    .on('end', () => {
      console.log('Done downloading file.');
    })
    .on('error', err => {
      console.error('Error downloading file.');
    })
    .pipe(destStream);
};
