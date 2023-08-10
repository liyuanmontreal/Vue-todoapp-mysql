import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/tasks",
    name: "tasks",
    component: () => import("./components/TasksList")
  },
  {
    path: "/tasks/:id",
    name: "task-details",
    component: () => import("./components/Task")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddTask")
  }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;