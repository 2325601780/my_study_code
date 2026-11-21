// js 中还专门提供了一块能力，用于和html中的元素进行交互

// 1. 监听翻译按钮的点击事件
let translateBtn  = document.getElementById('translate-button')

translateBtn.addEventListener('click', function () {
    // 获取用户输入的文本和目标语言
    let input = document.getElementById('source-text').value
    let targetLang = document.getElementById('target-language').value
    if(input === ''){
        alert('请输入要翻译的文本')
        return
    }
    // 切换到加载状态：显示骨架屏，隐藏其它状态
    document.getElementById('empty-state').hidden = true
    document.getElementById('result-state').hidden = true
    document.getElementById('result-error').hidden = true
    document.getElementById('loading-state').hidden = false
    document.getElementById('copy-button').hidden = true
    document.getElementById('result-region').setAttribute('aria-busy', 'true')

    // 将用户输入的文本传输给本地deepseek-r1
    //在js中发送http请求向http://localhost:11434/api/chat
    fetch('http://localhost:11434/api/chat',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'deepseek-r1:1.5b',
            messages: [
                {role: 'system',content: `你是一个专业的翻译，擅长将一种语言翻译成${targetLang}，只返回最简单的翻译结果，不带任何解释。`},
                {role: 'user',content: input},
            ],
            stream: false
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.message.content);
        console.log(targetLang);
        // result-text 是 <p> 元素，用 textContent 写入，不能用 value
        document.getElementById('result-text').textContent = data.message.content.trim()
        // 按目标语言设置 lang，便于正确渲染与朗读
        document.getElementById('result-text').setAttribute('lang', targetLang)
        // 切换显示状态：显示结果区，隐藏加载/空/错误
        document.getElementById('loading-state').hidden = true
        document.getElementById('empty-state').hidden = true
        document.getElementById('result-error').hidden = true
        document.getElementById('result-state').hidden = false
        document.getElementById('copy-button').hidden = false
        document.getElementById('result-region').setAttribute('aria-busy', 'false')
    })
})

let clearBtn = document.getElementById('clear-button')

clearBtn.addEventListener('click', function () {
    document.getElementById('source-text').value = ''
    document.getElementById('result-text').value = ''
})