import http from "../http";

class TaskDataService {
  getAll() {
    return http.get("/tasks");
  }

  get(id) {
    return http.get(`/tasks/${id}`);
  }

  create(data) {
    return http.post("/tasks", data);
  }

  update(id, data) {
    return http.put(`/tasks/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tasks/${id}`);
  }

  deleteAll() {
    return http.delete(`/tasks`);
  }

  findByfinished(finished) {
    return http.get(`/tasks?finished=${finished}`);
  }

  findByContent(content) {
    return http.get(`/tasks?content=${content}`);
  }
}

export default new TaskDataService();