/* portfolio swiper */

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1.5,
  spaceBetween: 30,
  keyboard: {
    enabled: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/* portfolio */

let slideMainItem = document.querySelector(".portfolio_slide_wrap");

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
  }
});

// const slideMainArr =  siteListArr.filter(item => item.tag == 'main');
const slideMainArr = siteListArr.filter(item => item.id >= 0 && item.id <= 4);

// console.log(slideMainArr)

slideMainArr.map(item => {
  const listItem = document.createElement('div');

  listItem.className = 'swiper-slide';

  let colorList = item.color

  const colorStyle = colorList.map(colorCode  => {
    const iElement = document.createElement('i');
    iElement.style.backgroundColor = `#${colorCode}`;
    return iElement.outerHTML;
  });

  let tagColor = [
    '1BB8C2',
    'B82BFF',
    'E95E00',
    'A5D600',
  ]

  let tagColorCode = 'defaultColorCode'; 
  if (item.tag === 'main') {
    tagColorCode = tagColor[0];
  } else if (item.tag === 'side') {
    tagColorCode = tagColor[1];
  } else if (item.tag === 'clone') {
    tagColorCode = tagColor[2];
  } else if (item.tag === 'team') {
    tagColorCode = tagColor[3];
  }

  const formattedDates = item.period.map(date => {
    const formattedDate = `${date.substr(0, 2)}.${date.substr(2, 2)}.${date.substr(4, 2)}`;
    return formattedDate;
  });

  listItem.innerHTML = 
  `
  <div class="site_img">
    <div class='site_desc_box'>
      <button onclick=location.href='page/detail_${item.id}.html'>description</button>
    </div>
    <img src="${item.img}" alt="${item.title}">
  </div>
  <div class="site_desc">
    <p class='tag' style='background-color:#${tagColorCode};'>${item.tag}<p>
    <h3 class="site_title">${item.title}</h3>
    <p>
      <span>기간</span>
      <span>${formattedDates[0]} - ${formattedDates[1]}</span>
    </p>
    <p>
      <span>프로젝트멤버</span>
      <span>${item.member}</span>
    </p>
    <p>
      <span>제작프로그램</span>
      <span>${item.program}</span>
    </p>
    <p>
      <span>개발언어</span>
      <span>${item.development}</span>
    </p>
    <p>
      <span>컬러시스템</span>
      <span class='color_style'>${colorStyle}</span>
    </p>
    <div class="link_btn">
      <button onclick="window.open('${item.site_address}')">Site</button>
      <button onclick="window.open('${item.github_address}')">GitHub</button>
    </div>
  </div>
  `; // HTML 내용 설정
  slideMainItem.appendChild(listItem); 
});

/* skill and Tool */

let skillNTool = document.querySelector(".skills div");

const skillListArr = skillList.map(item => {
  return {
    id: item.id,
    title: item.title,
    percent: item.percent,
    text: item.text,
  }
});

skillListArr.map(item => {
  const listItem = document.createElement('div');

  listItem.className = 'skill_List';
  
  listItem.innerHTML = 
  `
  <div>
    <div class="skill_title">
      <span>${item.title}</span>
      <span>${item.percent}%</span>
    </div>
    <div class="percent_box">
      <div class="percent" style='width:${item.percent}%;'></div>
    </div>
  </div>
  `; // HTML 내용 설정
  skillNTool.appendChild(listItem); 
});

let skillClick = document.querySelectorAll('.skill_List');

let skillTitle = document.querySelector(".skill_text_title")
let skilltext = document.querySelector(".skill_text_detail")

// console.log(skillClick)

skillClick.forEach((item,index)=>{
  item.addEventListener("click", ()=>{
    skillTitle.innerHTML = skillListArr[index].title;
    skilltext.innerHTML = skillListArr[index].text;
  })
});

/* gototop */
let goToTop = document.querySelector('.go_top_btn');

let docElem = document.documentElement,
    scrollAmount;

goToTop.addEventListener("click", function(e){
  e.preventDefault();
  let scrollInterval = setInterval(function(){
    if (scrollAmount != 0) {
      window.scrollBy(0, -100);
    } else {
      clearInterval(scrollInterval);
    }
  }, 20);
});

window.addEventListener('scroll',()=>{
  scrollAmount = docElem.scrollTop;
  if (scrollAmount > 100) {
    goToTop.classList.add('show');
  } else if (scrollAmount < 100)  {
    goToTop.classList.remove('show')
  }

});

let sideBarBtn = document.querySelectorAll('.side_bar ul li a');
let sideBarContent = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let fromTop = window.scrollY;
  
  sideBarBtn.forEach((menu, index) => {
    const section = sideBarContent[index];
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (fromTop >= sectionTop && fromTop < sectionTop + sectionHeight) {
      menu.classList.add('active');
    } else {
      menu.classList.remove('active');
    }
  });
});

sideBarBtn.forEach((menu, index) => {
  menu.addEventListener('click', (e) => {
    e.preventDefault();

    const sectionTop = sideBarContent[index].offsetTop;

    window.scroll({
      top: sectionTop,
      behavior: 'smooth',
    });
  });
});

let viewMore = document.querySelector(".view_more");

viewMore.addEventListener("click", ()=>{
  window.location.href = 'viewmore.html';
})

/* 메일 */



function sendEmail() {
  let templateParams = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
  }
  console.log(templateParams);
  emailjs.send('service_0d0slcs', 'template_7ki1f37', templateParams)
    .then(function (response) {
      console.log('Success!', response.status, response.text);
      setStatus('success');
    })
    .catch(function (error) {
      console.log('Failed...', error);
      setStatus('fail');
    });
}


function inputFillSend(){
  let inputName = document.querySelector('.contact #name').value;
  let inputMail = document.querySelector('.contact #email').value;
  let inputSubject = document.querySelector('.contact #subject').value;
  let inputTextArea = document.querySelector('.contact textarea').value;

  if (inputName != '' && inputMail != '' && inputSubject != ''  && inputTextArea != '' ) {
    sendEmail()
    alert('메일이 성공적으로 보내졌습니다 🎉')
  } else {
    alert('✨ Contact Me를 모두 채워주세요 ✨')
  }
}

let sendButton = document.querySelector(".send_button");
sendButton.addEventListener('click', inputFillSend);