let projectBox = document.querySelector('.project_box')

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

const siteListArrSort = siteListArr.sort((a,b)=> b.period[1] - a.period[1]);

siteListArrSort.map(item => {
  const listItem = document.createElement('li');

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
    <div class='tag' style='background-color:#${tagColorCode};'>${item.tag}</div>
    <a href="page/detail_${item.id}.html"><img src="${item.img}" alt="${item.title}"></a>
    <div class="project_title">
      <h3>${item.title}</h3>
      <div class="project_btn">
        <button onclick="window.open('${item.site_address}')">Site</button>
        <button onclick="window.open('${item.github_address}')">GitHub</button>
        <p>${formattedDates[0]}<br>${formattedDates[1]}</p>
      </div>
    </div>
  `
  projectBox.appendChild(listItem); 
})

