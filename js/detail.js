const siteListArr = siteList.map(item => {
  return {
    id: item.id,
    title: item.title,
    img: item.img,
    period: item.period,
    member: item.member,
    program: item.program,
    development: item.development,
    color: item.color,
    site_address: item.site_address,
    github_address: item.github_address,
    text: item.text,
    tag: item.tag,
    design_preview_web: item.design_preview_web,
    design_preview_tablet: item.design_preview_tablet,
    design_preview_mobile: item.design_preview_mobile,
  }
});


let detailContainer = document.querySelector('.container');

let dataId = detailContainer.getAttribute('data-id');

let dataItem = siteListArr[dataId]

let tagColor = [
  '1BB8C2',
  'B82BFF',
  'E95E00',
  'A5D600',
]

let tagColorCode = 'defaultColorCode'; 
if (dataItem.tag === 'main') {
  tagColorCode = tagColor[0];
} else if (dataItem.tag === 'side') {
  tagColorCode = tagColor[1];
} else if (dataItem.tag === 'clone') {
  tagColorCode = tagColor[2];
} else if (dataItem.tag === 'team') {
  tagColorCode = tagColor[3];
}

if (dataItem) {
  console.log(dataItem);

  const sectionItem = document.createElement('section');

  sectionItem.className = 'detail_main';

  let colorList = dataItem.color;

  const colorStyle = colorList.map(colorCode  => {
    const iElement = document.createElement('i');
    iElement.style.backgroundColor = `#${colorCode}`;
    return iElement.outerHTML;
  });
  
  const formattedDates = dataItem.period.map(date => {
    const formattedDate = `${date.substr(0, 2)}.${date.substr(2, 2)}.${date.substr(4, 2)}`;
    return formattedDate;
  });
  
  sectionItem.innerHTML =
  `
  <div class="main_inner inner">
        <h3 class="site_title">${dataItem.title}</h3>
        <div class="site_img">
          <img src="../${dataItem.img}" alt="${dataItem.title}">
        </div>
        <div class="site_desc">
          <p class='tag' style='background-color:#${tagColorCode};'>${dataItem.tag}<p>
          <p>
            <span>기간</span>
            <span>${formattedDates[0]} - ${formattedDates[1]}</span>
          </p>
          <p>
            <span>프로젝트멤버</span>
            <span>${dataItem.member}</span>
          </p>
          <p>
            <span>제작프로그램</span>
            <span>${dataItem.program}</span>
          </p>
          <p>
            <span>개발언어</span>
            <span>${dataItem.development}</span>
          </p>
          <p>
            <span>컬러시스템</span>
            <span class='color_style'>${colorStyle}</span>
          </p>
          <div class="link_btn">
            <button onclick="window.open('${dataItem.site_address}')">Site</button>
            <button onclick="window.open('${dataItem.github_address}')">GitHub</button>
          </div>
          <p class="site_description">
            ${dataItem.text}
          </p>
        </div>
      </div>
  `;

  detailContainer.appendChild(sectionItem);

  const PreviewItem = document.createElement('section');
  
  PreviewItem.className = 'detail_preview'

  PreviewItem.innerHTML = 
  `
  <div class="preview_inner inner">
        <h3 class="subtitle">Design Preview</h3>
        <div class="preview_box">
          <div class="preview_web">
            <p>Web</p>
            <div>
              <img src="../${dataItem.design_preview_web}" alt="${dataItem.title}">
            </div>
          </div>
          <div class="preview_tablet">
            <p>Tablet</p>
            <div>
              <img src="../${dataItem.design_preview_tablet}" alt="${dataItem.title}">
            </div>
          </div>
          <div class="preview_mobile">
            <p>Mobile</p>
            <div>
              <img src="../${dataItem.design_preview_mobile}" alt="${dataItem.title}">
            </div>
          </div>
        </div>
      </div>
  `;
  
  detailContainer.appendChild(PreviewItem);

  let previewTablet = document.querySelector('.preview_tablet');

  let previewMobile = document.querySelector('.preview_mobile');
  
  if (dataItem.design_preview_web == false) {
    PreviewItem.style.display = "none"
  } 
  
  if (dataItem.design_preview_tablet == false) {
    previewTablet.style.display = "none"
  } 

  if (dataItem.design_preview_mobile  == false) {
    previewMobile.style.display = "none"
  }
}