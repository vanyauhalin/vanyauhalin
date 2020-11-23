<template>
  <section id="contacts">
    <h2 class="hd hd_l_2">
      {{ title(name) }}
    </h2>
    <div class="contacts__main">
      <ul>
        <li
          class="contacts__item"
          v-for="item in ctx"
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
      <transition name="contacts__transition">
        <form
          :class="form.class"
          v-if="!farewell.status"
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
          <!-- @click="setFarewell" -->
          <!-- type="button" -->
          <button
            class="btn contacts__btn"
          >
            Отправить
          </button>
        </form>
        <div
          class="contacts__farewell"
          :style="`height: ${farewell.height}px; width: ${farewell.width}px`"
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
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

/* eslint no-control-regex: "warn" */
export default {
  name: 'SectionContacts',
  data() {
    return {
      name: 'contacts',
      form: {
        class: 'contacts__form'
      },
      inputs: [{
        name: 'name',
        placeholder: 'Ваше Имя'
      }, {
        name: 'email',
        placeholder: 'Ваше Email',
        pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      }, {
        name: 'subject',
        placeholder: 'Тема'
      }],
      textarea: {
        class: 'contacts__textarea',
        name: 'message',
        placeholder: 'Сообщение',
        rows: {
          current: 3,
          min: 3
        }
      },
      farewell: {
        status: false,
        height: 0,
        width: 0,
        class: '',
        ctx: ['Благодарю Вас за оставленное предложение!', 'Я свяжусь с Вами в ближайшее время.', ':)']
      }
    }
  },
  computed: {
    ...mapGetters({
      title: 'GET_TITLE',
      ctx: 'GET_CONTACTS_CTX'
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
    setFarewell() {
      const form = document.getElementsByClassName(this.form.class)[0]
      this.farewell.height = form.offsetHeight
      this.farewell.width = form.offsetWidth
      this.farewell.status = true
    }
  }
}
</script>

<style lang="scss" scoped>
.contacts__main {
  display: flex;
  justify-content: space-between;
}

.contacts__item {
  display: flex;
  align-items: center;

  margin-bottom: $mg-2;
  padding-left: $list-pd;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.contacts__form {
  display: grid;

  grid-template: repeat(3, auto) / repeat(3, $btn-wd);
  gap: $mg-1;
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

.contacts__textarea {
  overflow: hidden;

  resize: none;

  grid-column: 1 / 4;
}

.contacts__btn {
  grid-column: 3;
}

.contacts__transition-enter-active {
  animation: fade $sec-1 ease-in-out;
}

@keyframes fade {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.contacts__farewell {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  box-sizing: border-box;
  padding: $mg-1;

  background-color: var(--cl-neutral-06);
}

.contacts__pr {
  color: var(--cl-neutral-01);
}
</style>
