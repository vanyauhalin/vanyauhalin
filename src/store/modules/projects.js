const state = {
  title: 'Проекты',
  filter: {
    stack: ['Vue.js', 'Scss', 'Bootstrap']
  },
  ctx: [{
    name: 'yansultanov.github.io',
    description: [
      'Дебютная работа с использованием JS-фреймворка Vue.js и препроцессора Scss.',
      'Дебютная работа с использованием JS-фреймворка Vue.js и препроцессора Scss.+',
      'Дебютная работа с использованием JS-фреймворка Vue.js и препроцессора Scss.++',
      'Дебютная работа с использованием JS-фреймворка Vue.js и препроцессора Scss.+++',
      'Дебютная работа с использованием JS-фреймворка Vue.js и препроцессора Scss.++++'
    ],
    view: 'https://yansultanov.github.io',
    date: '11.2020',
    code: 'https://github.com/yansultanov/yansultanov',
    stack: ['Vue.js', 'Scss']
  }, {
    name: 'yansultanov/yansultanov+',
    description: [
      'Дебютная работа с использованием JS-фреймворка Vue.js и препроцессора Scss.',
      'Дебютная работа с использованием JS-фреймворка Vue.js и препроцессора Scss.+',
      'Дебютная работа с использованием JS-фреймворка Vue.js и препроцессора Scss.++',
      'Дебютная работа с использованием JS-фреймворка Vue.js и препроцессора Scss.+++',
      'Дебютная работа с использованием JS-фреймворка Vue.js и препроцессора Scss.++++'
    ],
    date: '11.2020',
    view: 'https://github.com/yansultanov/yansultanov',
    // mockup: ,
    stack: ['Vue.js', 'Scss']
  }]
}

const getters = {
  GET_PROJECTS_TITLE: (state) => state.title,
  GET_PROJECTS_CTX: (state) => state.ctx
}

export default {
  state,
  getters
}
