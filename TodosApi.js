const { RESTDataSource } = require('apollo-datasource-rest');

class TodoAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://jsonplaceholder.typicode.com/';
  }

  async getTodo(id) {
    return this.get(`todos/${id}`);
  }

  async getTodos() {
    return this.get('todos');
  }
}

module.exports = TodoAPI;
