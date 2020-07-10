
const tableResult = document.getElementById("tableResult");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const initProgressBar = (count) => {
  for (let i = 0; i < count; i++) {
    const bar = document.getElementById(`progressBar_${i+1}`);
    let value = 0;
    const timer = window.setInterval((() => {
      value += getRandomInt(30);
      if (value >= 50)
        value += 10;
      bar.setAttribute("value", value);
      if (value >= 100)
        clearInterval(timer);
    }), 1000);
  }
}

const initTableResult = (fileList) => {
  let tableHTML='';
  for (let i = 0; i < fileList.length; i++) {
    tableHTML += `<tr id="item_${i + 1}">
    <td>${fileList[i].fileName}</td>
    <td class="text-center">
        <div class="row justify-content-center align-items-center">
            <div class="col-3 p-0">
                <span class="file-size" id="fileSize_before_${i + 1}">${fileList[i].fileSize / 1000} KB</span>
            </div>
            <div class="col-6 p-0">
                <progress id="progressBar_${i + 1}" class="skill-2" max="100" value="0"> </progress>
            </div>
            <div class="col-3 p-0">
                <span class="file-size" id="fileSize_after_${i + 1}"></span>
            </div>
        </div>
    </td>
    <td class="text-right" id="download_${i + 1}"></td>
  </tr>`;
    tableResult.innerHTML = tableHTML;
  }
  initProgressBar(fileList.length);
}

document.getElementById("file-uploader").addEventListener('change', async (event) => {
  let fileList = [];
  for (let i = 0; i < fileUploader.files.length; i++) {
    const file = fileUploader.files[i];
    const sizeImage = await getSize(file); 
    const oldImageUrl = await toBase64(file);
    fileList.push({file,sizeImage,oldImageUrl, fileName: file.name, fileSize: file.size });
  }
  // 初始化 Result Table
  initTableResult(fileList);
  // 壓縮圖片
  const compImage = await getCompressImage(fileList[0].file, fileList[0].sizeImage, fileList[0].oldImageUrl);
  // console.log(compImage.oldImg);
  compareImage(compImage.oldImg, compImage.newImg);
});