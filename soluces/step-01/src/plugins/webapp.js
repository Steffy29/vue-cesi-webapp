import SideBar from "@/components/SidebarPlugin";
import GlobalComponents from "./globalComponents";
import GlobalDirective from "./globalDirectives";

// scss assets
import "@/assets/sass/webapp.scss";

export default {
  install(Vue) {
    Vue.use(GlobalComponents);
    Vue.use(GlobalDirective);
    Vue.use(SideBar);
  }
}