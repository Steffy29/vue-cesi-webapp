import {
  BaseDropdown
} from "@/components/index";

const GlobalComponents = {
  install(Vue) {
    Vue.component(BaseDropdown.name, BaseDropdown);
  }
};

export default GlobalComponents;