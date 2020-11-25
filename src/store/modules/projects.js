const state = {
  title: 'Проекты',
  filter: {
    stack: {
      selected: [],
      items: ['Vue.js', 'Scss']
    }
  },
  ctx: [{
    name: 'Личный сайт yansultanov.github.io',
    description: [
      'Дебютная работа с использованием JS-фреймворка Vue.js и препроцессора Scss.',
      'Дебютная работа с использованием JS-фреймворка Vue.js и препроцессора Scss.+',
      'Дебютная работа с использованием JS-фреймворка Vue.js и препроцессора Scss.++',
      'Дебютная работа с использованием JS-фреймворка Vue.js и препроцессора Scss.+++',
      'Дебютная работа с использованием JS-фреймворка Vue.js и препроцессора Scss.++++'
    ],
    tags: {
      view: 'https://yansultanov.github.io',
      date: '11.2020',
      code: 'https://github.com/yansultanov/yansultanov',
      stack: ['Vue.js', 'Scss']
    }
  }]
}

export default {
  state
}
