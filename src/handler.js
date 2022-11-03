import fs from "fs";
import { nanoid } from "nanoid";

const books = await JSON.parse(fs.readFileSync("./src/books.json", "utf-8"));

// GET (all)
export const getAllBooksHandler = (req, res) => {
  return res
    .response({
      status: "ok",
      message: "success",
      data: { books },
    })
    .code(200);
};

// GET (by id)
export const getBookByIdHandler = (req, res) => {
  const { id } = req.params;
  const book = books.filter((b) => b.id === id);
  // jika buku nya ada
  if (book.length > 0) {
    return res
      .response({
        status: "ok",
        message: "success",
        data: { book },
      })
      .code(200);
  }
  // jika buku dengan id tsb tidak ada
  return res
    .response({
      status: "gagal",
      message: "Buku dengan id tersebut tidak ditemukan.",
      bookId: id,
    })
    .code(404);
};

// POST
export const addBooksHandler = (req, res) => {
  const id = nanoid(12);
  const {
    title = "Untitled",
    author = "Unknown",
    pages = "Unknown",
  } = req.payload;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  books.push({
    id,
    title,
    author,
    pages,
    createdAt,
    updatedAt,
  });

  //eksekusi re-wriite file json nya
  fs.writeFileSync("./src/books.json", JSON.stringify(books));

  return res
    .response({
      status: "ok",
      message: "Berhasil menambahkan buku.",
      bookId: id,
    })
    .code(201);
};

// PUT
export const updateBooksHandler = (req, res) => {
  const { id } = req.params;
  const findBook = books.findIndex((b) => b.id === id);
  const updatedAt = new Date().toISOString();
  // jika book nya ada
  if (findBook !== -1) {
    const {
      title = books[findBook].title,
      author = books[findBook].author,
      pages = books[findBook].pages,
    } = req.payload;

    books[findBook] = {
      ...books[findBook],
      title,
      author,
      pages,
      updatedAt,
    };

    //eksekusi re-wriite file json nya
    fs.writeFileSync("./src/books.json", JSON.stringify(books));

    return res
      .response({
        status: "ok",
        message: "Berhasil memperbarui buku.",
        bookId: id,
      })
      .code(200);
  }
  // jika gagal
  return res
    .response({
      status: "gagal",
      message:
        "Gagal memeperbarui buku. Buku dengan id tersebut tidak ditemukan.",
      bookId: id,
    })
    .code(404);
};

// DELETE
export const deleteBookHandler = (req, res) => {
  const { id } = req.params;
  const cekIsExsist = books.findIndex((b) => b.id === id);
  if (cekIsExsist !== -1) {
    books.splice(cekIsExsist, 1);

    //eksekusi re-wriite file json nya
    fs.writeFileSync("./src/books.json", JSON.stringify(books));

    return res
      .response({
        status: "ok",
        message: "Buku berhasil dihapus",
        bookId: id,
      })
      .code(200);
  }

  return res
    .response({
      status: "gagal",
      message: "Gagal menghapus buku. Buku dengan id tersebut tidak ditemukan.",
      bookId: id,
    })
    .code(404);
};
