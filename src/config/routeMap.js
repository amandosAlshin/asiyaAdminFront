import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
const Classes = Loadable({loader: () => import(/*webpackChunkName:'Classes'*/'@/views/classes'),loading: Loading});
const Sections = Loadable({loader: () => import(/*webpackChunkName:'Sections'*/'@/views/sections'),loading: Loading});
const Lessons = Loadable({loader: () => import(/*webpackChunkName:'Lessons'*/'@/views/lessons'),loading: Loading});
const Exams = Loadable({loader: () => import(/*webpackChunkName:'Exams'*/'@/views/exams'),loading: Loading});
const Questions = Loadable({loader: () => import(/*webpackChunkName:'Questions'*/'@/views/questions'),loading: Loading});
export default [
  { path: "/classes", component: Classes, roles: ["admin","editor","guest"], routes: [] },
  { path: "/sections/:class", component: Sections, roles: ["admin","editor","guest"]},
  { path: "/lessons/:section", component: Lessons, roles: ["admin","editor","guest"] },
  { path: "/exams", component: Exams, roles: ["admin","editor","guest"] },
  { path: "/questions/:exam", component: Questions, roles: ["admin","editor","guest"] },
  { path: "/finished/:exam", component: Exams, roles: ["admin","editor","guest"] },
];
