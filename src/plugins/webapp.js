import SideBar from "@/components/SidebarPlugin";
import GlobalDirective from "./globalDirectives";

// scss assets
import "@/assets/sass/webapp.scss";

export default {
  install(Vue) {
    Vue.use(GlobalDirective);
    Vue.use(SideBar);
  }
}