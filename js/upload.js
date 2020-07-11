
const tableResult = document.getElementById("tableResult");
const processImage = document.getElementById("processImage");
const sectionDemo=document.getElementById("sectionDemo");
const sectionResult=document.getElementById("sectionResult");
let compressResultList = [];
let fileList = [];

/**
 * 隨機取得0~max間的Int亂數
 * @param {隨機數的最大值} max 
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * 初始化 Result table 中的進度條
 * @param {欲壓縮圖片數量} count 
 */
const initProgressBar = (count) => {
  for (let i = 0; i < count; i++) {
    const progressBar = document.getElementById(`progressBar_${i + 1}`);
    const timer = window.setInterval((() => {
      let value = Number(progressBar.getAttribute("value"));
      value += getRandomInt(30);
      if (value >= 50)
        value += 10;
      progressBar.setAttribute("value", value);
      if (value >= 100)
        clearInterval(timer);
    }), 1000);
  }
}

const lookup = (idName) => {
  const id = Number(idName.split("_")[1]) - 1;
  compareImage(compressResultList[id].oldImg, compressResultList[id].newImg);
}

const downloadImage = (idName) => {
  const id = Number(idName.split("_")[1]) - 1;
  var a = document.createElement('a');
  a.href = `data:image/jpeg;base64,${compressResultList[id].newImg}`;
  a.download = fileList[id].fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * 初始化 Result table 中的詳細資訊，並啟動 initProgressBar()
 * @param {File檔案類型} fileList 
 */
const initTableResult = (fileList) => {
  let tableHTML = '';
  for (let i = 0; i < fileList.length; i++) {
    tableHTML += `<tr id="item_${i + 1}">
    <td>${fileList[i].fileName}</td>
    <td class="text-center">
        <div class="row justify-content-center align-items-center">
            <div class="col-3 p-0">
                <span id="fileSize_before_${i + 1}">${Math.round(fileList[i].fileSize / 1000)} KB</span>
            </div>
            <div class="col-6 p-0">
                <progress id="progressBar_${i + 1}" class="skill-2" max="100" value="0"> </progress>
            </div>
            <div class="col-3 p-0">
                <span id="fileSize_after_${i + 1}"></span>
            </div>
        </div>
    </td>
    <td class="text-right" id="download_${i + 1}">
        <i class="fas fa-search" id="lookup_${i + 1}" onclick="lookup(id)"></i>
        <i class="fas fa-download" id="download_${i + 1}" onclick="downloadImage(id)"></i>&nbsp;
        <span id="offSize_${i+1}">-68%</span>
    </td>
  </tr>`;
    tableResult.innerHTML = tableHTML;
  }
  initProgressBar(fileList.length);
}

/**
 * 當所有圖片都壓縮完成後會觸發此函式
 * 此函式終止 progress bar 動畫直接 value=100，並更新壓縮圖片後的大小
 * @param {*} compressResultList 
 */
const finishAllProcess = (compressResultList) => {
  for (let i = 0; i < compressResultList.length; i++) {
    const progressBar = document.getElementById(`progressBar_${i + 1}`);
    const fileSizeAfter = document.getElementById(`fileSize_after_${i + 1}`);
    const offSize=document.getElementById(`offSize_${i+1}`);
    progressBar.setAttribute("value", "100");
    fileSizeAfter.innerText = `${compressResultList[i].newImageSize} KB`;
    const reduce=Math.round((compressResultList[i].oldImageSize-compressResultList[i].newImageSize)/compressResultList[i].oldImageSize*100);
    offSize.innerText=`-${reduce}%`
  }
}

/**
 * 壓縮所有圖片
 * @param {*} fileList
 * GET:
 *      {原始圖片base64格式} oldImg
 *      {原始圖片大小} oldImageSize, 
 *      {原始圖片寬} width, 
 *      {原始圖片長} height, 
 *      {壓縮後圖片} newImg,
 *      {壓縮後圖片大小} newImageSize, 
 *      {壓縮後圖片長} imgNewHeight, 
 *      {壓縮後圖片寬} imgNewWidth
 */
const compressAllImage = async (fileList) => {
  compressResultList = [];
  for (let i = 0; i < fileList.length; i++) {
    const compImage = await getCompressImage(fileList[i].file, fileList[i].sizeImage, fileList[i].oldImageUrl);
    compressResultList.push(compImage);
  }
  setTimeout(function () {
    finishAllProcess(compressResultList);
    processImage.classList.add("d-none");
    compareImage(compressResultList[0].oldImg, compressResultList[0].newImg);
  }, 2000)
}

/**
 * Input 監聽事件，當有偵測到使用者上傳圖片即觸發此函式
 */
document.getElementById("file-uploader").addEventListener('change', async (event) => {
  // show Result Section
  sectionResult.classList.remove("d-none");
  sectionDemo.classList.add("d-none");
  // Add process animated
  processImage.classList.remove("d-none");
  // GET all input files
  fileList = [];
  for (let i = 0; i < fileUploader.files.length; i++) {
    const file = fileUploader.files[i];
    const sizeImage = await getSize(file);
    const oldImageUrl = await toBase64(file);
    fileList.push({ file, sizeImage, oldImageUrl, fileName: file.name, fileSize: file.size });
  }
  // 初始化 Result Table
  initTableResult(fileList);
  // 壓縮圖片
  compressAllImage(fileList);

  // console.log(compImage.oldImg);
  // compareImage(compImage.oldImg, compImage.newImg);
});