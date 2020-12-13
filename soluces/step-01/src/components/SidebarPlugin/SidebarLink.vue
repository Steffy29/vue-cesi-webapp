<template>
  <component
    :is="tag"
    @click.native="hideSidebar"
    class="nav-item"
    v-bind="$attrs"
    tag="li"
  >
    <a class="nav-link">
      <slot>
        <b-icon v-if="!checkIcon()" :icon="icon"></b-icon>
        <font-awesome-icon :icon="icon" v-if="checkIcon()"></font-awesome-icon>
        <span class="ml-2">{{ name }}</span>
      </slot>
    </a>
  </component>
</template>

<script>
export default {
  name: "sidebar-link",
  props: {
    name: String,
    icon: String,
    tag: {
      type: String,
      default: "router-link",
    },
    type: String,
  },
  inheritAttrs: false,
  inject: {
    autoClose: {
      default: true,
    },
    addLink: {
      default: () => {},
    },
    removeLink: {
      default: () => {},
    },
  },
  methods: {
    hideSidebar() {
      if (this.autoClose) {
        this.$sidebar.displaySidebar(false);
      }
    },
    isActive() {
      return this.$el.classList.contains("active");
    },
    checkIcon() {
      console.log('type', this.type)
      if (this.icon) {
        if (this.type === 'font-awesome') {
          return true;
        }
        return false;
      }
      return false
    }
  },
  mounted() {
    if (this.addLink) {
      this.addLink(this);
    }
  },
  beforeDestroy() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    if (this.removeLink) {
      this.removeLink(this);
    }
  },
};
</script>

<style>
</style>
