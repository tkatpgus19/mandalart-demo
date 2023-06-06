const OPENAI_API_KEY = ''

function call_gpt(str){
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: str}],
    }),
  })
  .then((res)=>res.json())
  .then((data)=>{
    document.querySelector('.loading').style.display = 'none';
    let answer = data.choices[0].message.content;
    var arr = []
    
    arr = answer.split('#')
    document.querySelector('p').innerHTML = answer;
    let boxes = document.querySelectorAll('.box')
    var cnt = 0
    boxes.innerHTML = ''
    arr.forEach((data, i) => {
      boxes[cnt].innerHTML = data
      cnt += 1
    });
  })
}

let publish = document.querySelector('#publish').addEventListener('click', ()=>{
  let str = document.querySelector('input').value;
  document.querySelector('.main').innerHTML = str;
  let value = str + '가 되는데 필요한 8가지 덕목을 "1. 키워드#" 형태로 알려줘. 키워드가 끝날 때 마다 꼭 "#"을 붙여줘.'
  document.querySelector('.loading').style.display = 'block';
  call_gpt(value)
})

// '백엔드 개발자'가 되는데 필요한 8가지 덕목을 "1. 키워드#" 형태로 알려줘.