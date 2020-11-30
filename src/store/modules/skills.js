const state = {
  title: 'Навыки',
  ctx: [{
    name: 'Базис',
    tools: [
      { name: 'HTML', progress: 80 },
      { name: 'CSS', progress: 70 },
      { name: 'JavaScript', progress: 60 }
    ]
  }, {
    name: 'JS-фреймворки',
    tools: [
      { name: 'Vue.js', progress: 40 }
    ]
  }, {
    name: 'Препроцессоры',
    tools: [
      { name: 'Scss', progress: 70 }
    ]
  }, {
    name: 'Инструменты',
    tools: [
      { name: 'Photoshop', progress: 60 },
      { name: 'XD', progress: 50 },
      { name: 'Figma', progress: 50 },
      { name: 'VsCode', progress: 60 }
    ]
  }, {
    name: 'Дополнительно',
    tools: [
      { name: 'Git', progress: 10 },
      { name: 'Webpack', progress: 10 },
      { name: 'UML', progress: 70 }
    ]
  }, {
    name: 'Backend',
    tools: [
      { name: 'MySQL', progress: 10 },
      { name: 'Node.js', progress: 20 },
      { name: 'Nuxt.js', progress: 20 }
    ]
  }]
}

export default {
  state
}
