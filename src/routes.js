import {
  addBooksHandler,
  deleteBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBooksHandler,
} from "./handler.js";

const routes = [
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBookByIdHandler,
  },
  {
    method: "POST",
    path: "/books",
    handler: addBooksHandler,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: updateBooksHandler,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBookHandler,
  },
];

export default routes;
