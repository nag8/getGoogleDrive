
function getDriveList(){
    // 共有ドライブリストを取得
    const teamDriveList = Drive.Teamdrives.list().items;
    return teamDriveList.map(teamDrive => new GoogleDrive(teamDrive));
  }
  
  // フォルダーを再帰的に取得
  function getGoogleFolderList(folderId){
    let folderList = [];
    const folders = DriveApp.getFolderById(folderId).getFolders();
    while(folders.hasNext()){
      const folder = folders.next();
      const googleFolder = new GoogleFolder(
        folder,
        getGoogleFolderList(folder.getId()),
  
      );
      folderList.push(googleFolder);
    }
    return folderList;
  }
  
  // ファイルリストを取得
  function getFileList(folder){
    const fileList = [];
    const files = folder.getFiles();
    while(files.hasNext()){
      fileList.push(files.next());
    }
    return fileList;
  }
  