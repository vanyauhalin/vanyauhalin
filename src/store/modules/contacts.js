const state = {
  title: 'Контакты',
  ctx: [{
    name: 'GitHub',
    link: 'https://github.com/yansultanov',
    preview: '@yansultanov'
  }, {
    name: 'Telegram',
    link: 'http://t.me/yansultanov',
    preview: '@yansultanov'
  }, {
    name: 'VK',
    link: 'http://vk.com/yansultanov',
    preview: '@yansultanov'
  }, {
    name: 'Email',
    link: 'mailto:ivan.uhalin@gmail.com',
    preview: 'ivan.uhalin@gmail.com'
  }, {
    name: 'Phone',
    link: 'tel:+79777667009',
    preview: '+7(977)766-70-09'
  }]
}

const getters = {
  GET_CONTACTS_TITLE: (state) => state.title,
  GET_CONTACTS_CTX: (state) => state.ctx
}

export default {
  state,
  getters
}
