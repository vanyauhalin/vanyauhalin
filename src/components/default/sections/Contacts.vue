<template>
  <section id="contacts">
    <Title
      :name="name"
      level="2"
    />
    <div class="contacts__main">
      <ul class="contacts__list">
        <li
          class="contacts__item"
          v-for="item in ctx(name)"
          :key="item.name"
        >
          <span class="marker" />
          <p class="pr pr_l_1">
            {{ item.name }}:
            <a
              class="pr pr_l_1"
              :href="item.link"
              target="_blank"
            >
              {{ item.preview }}
            </a>
          </p>
        </li>
      </ul>
      <transition name="contacts__form_tr_fade">
        <form
          :class="form.class"
          enctype="text/plain"
          :action="form.action"
          :target="iframe.name"
          @submit="submitForm"
          v-if="!form.submit"
        >
          <input
            class="contacts__input"
            v-for="item in inputs"
            :key="item.name"
            type="text"
            :name="item.name"
            :placeholder="item.placeholder"
            :pattern="item.pattern"
            required
          >
          <textarea
            :class="textarea.class"
            :name="textarea.name"
            :placeholder="textarea.placeholder"
            :rows="textarea.rows.current"
            required
          />
          <button
            class="btn contacts__btn"
            type="submit"
          >
            Отправить
          </button>
        </form>
        <div
          class="contacts__farewell"
          :style="`width: ${farewell.width}px; height: ${farewell.height}px`"
          v-else
        >
          <p
            class="pr pr_l_2 contacts__pr"
            v-for="item in farewell.ctx"
            :key="item"
          >
            {{ item }}
          </p>
        </div>
      </transition>
      <iframe
        :name="iframe.name"
        class="contacts__iframe"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import Title from 'default/sections/Title.vue'

/* eslint no-control-regex: "warn" */
export default {
  name: 'SectionsContacts',
  components: {
    Title
  },
  data() {
    return {
      name: 'contacts',
      form: {
        class: 'contacts__form',
        action: 'https://docs.google.com/forms/d/e/1FAIpQLSfkWDRa0g0Hcijp0-XMxHItxwQqu5fcIuc2EEdg9VoTR_LD2Q/formResponse?',
        submit: false
      },
      inputs: [{
        name: 'entry.1207988625',
        placeholder: 'Ваше Имя'
      }, {
        name: 'entry.95353332',
        placeholder: 'Ваше Email',
        pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      }, {
        name: 'entry.674518323',
        placeholder: 'Тема'
      }],
      textarea: {
        name: 'entry.1271337848',
        class: 'contacts__textarea',
        placeholder: 'Сообщение',
        rows: {
          current: 3,
          min: 3
        }
      },
      farewell: {
        width: 0,
        height: 0,
        ctx: [
          'Благодарю Вас за оставленное предложение!',
          'Я свяжусь с Вами в ближайшее время.',
          ':)'
        ]
      },
      iframe: {
        name: 'gform-iframe'
      }
    }
  },
  computed: {
    ...mapGetters({
      ctx: 'GET_CTX'
    })
  },
  mounted() {
    this.parsePattern()
    this.setTextareaRows()
  },
  methods: {
    parsePattern() {
      this.inputs.forEach((item, index) => {
        if (typeof item.pattern !== 'undefined') {
          this.inputs[index].pattern = item.pattern.toString().slice(1, -1)
        }
      })
    },
    setTextareaRows() {
      const { rows } = this.textarea
      const textarea = { el: document.getElementsByClassName(this.textarea.class)[0] }
      textarea.baseHeight = textarea.el.scrollHeight

      textarea.el.addEventListener('input', () => {
        const promise = new Promise((resolve) => {
          this.textarea.rows.current = rows.min

          resolve('done')
        })

        promise.then(() => {
          const difference = textarea.el.scrollHeight - textarea.baseHeight

          if (typeof textarea.step === 'undefined' && textarea.el.scrollHeight > textarea.baseHeight) {
            textarea.step = difference
          }

          typeof textarea.step === 'undefined'
            ? this.textarea.rows.current = rows.min
            : this.textarea.rows.current = rows.min + Math.ceil(difference / textarea.step)
        })
      })
    },
    submitForm() {
      const form = document.getElementsByClassName(this.form.class)[0]
      this.farewell.width = form.offsetWidth
      this.farewell.height = form.offsetHeight
      this.form.submit = true
    }
  }
}
</script>

<style lang="scss" scoped>
.contacts__main {
  position: relative;

  @include for-desktop-only {
    display: flex;
    justify-content: space-between;
  }
}

.contacts__list {
  margin-bottom: $mg-1;

  @include for-desktop-only {
    margin: 0;
  }
}

.contacts__item {
  display: flex;
  align-items: center;

  margin-bottom: $mg-3;
  padding-left: $list-pd;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.contacts__form_tr_fade-enter-active {
  position: absolute;
  top: 0;
  right: 0;

  animation: fade $sec-1 ease-in-out;
}

.contacts__form_tr_fade-leave-active {
  animation: fade $sec-1 ease-in-out reverse;
}

.contacts__form {
  display: grid;

  grid-template:
    'name' auto
    'email' auto
    'subject' auto
    'message' auto
    'button' auto / 1fr;
  gap: $mg-2;

  @include for-desktop-only {
    grid-template:
      'name email subject' auto
      'message message message' auto
      '. . button' auto / $btn-wd $btn-wd $btn-wd;
  }
}

.contacts__input,
.contacts__textarea {
  font-size: $fs-5;
  font-weight: $fw-2;
  line-height: $lh-5;

  padding: $btn-pd;

  color: var(--cl-neutral-06);
  border: $btn-br;
  background-color: var(--cl-neutral-01);

  &::placeholder {
    color: var(--cl-neutral-04);
  }
}

.contacts__input {
  &:nth-of-type(1) {
    grid-area: name;
  }

  &:nth-of-type(2) {
    grid-area: email;
  }

  &:nth-of-type(3) {
    grid-area: subject;
  }
}

.contacts__textarea {
  overflow: hidden;

  resize: none;

  grid-area: message;
}

.contacts__btn {
  margin: 0 auto;

  grid-area: button;
}

.contacts__farewell {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  box-sizing: border-box;
  padding: $mg-2;

  background-color: var(--cl-neutral-06);
}

.contacts__pr {
  color: var(--cl-neutral-01);
}

.contacts__iframe {
  display: none;
}
</style>
