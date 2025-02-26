const { nanoid } = require('nanoid');
const shelf = require('./shelf');

const saveBookHandler = ( req, h ) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;

    if(!name) {
        return h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        }).code(400);
    }

    if (readPage > pageCount ) {
        return h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readpage tidak boleh lebih besar dari pageCount"
        }).code(400);
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const saveBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
    };

    shelf.push(saveBook);

    const isSuccess = shelf.filter( (book) => book.id === id).length > 0;

    if (isSuccess) {
        return h.response({
            status: 'Success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        }).code(201);
    }

    return h.response({
        status: 'fail',
        message: 'Buku gagal di tambahkan'
    }).code(500);
};

const getAllBookHandler = (req, h) => {
    const books = shelf.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }));

    return h.response({
        status: 'Success',
        data: {
            books,
        }
    }).code(200);
}

const getBookbyIdHandler = (req, h) => {
    const { bookId } = req.params;

    const book = shelf.filter( (n) => n.id === bookId )[0];

    if (book !== undefined ) {
        return h.response({
            status: "Success",
            data: {
                book,
            }
        }).code(200)
    }

    return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    }).code(404);
}

const editBookHandler = (req, h) => {
    const {bookId} = req.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;
    const updatedAt = new Date().toISOString();

    const index = shelf.findIndex((book) => book.id === bookId);

    if(!name) {
        return h.response({
            status: 'fail',
            message: "Gagal memperbaharui buku. Mohon isi nama buku"
        }).code(400);
    }

    if (readPage > pageCount ) {
        return h.response({
            status: "fail",
            message: "Gagal memperbaharui buku. readpage tidak boleh lebih besar dari pageCount"
        }).code(400);
    }

    if (index !== -1){
        shelf[index] = {
            ...shelf[index],
            name, 
            year, 
            author, 
            summary, 
            publisher, 
            pageCount, 
            readPage, 
            reading,
            updatedAt,
        }
        return h.response({
            status: 'Success',
            message: "Buku Berhasil diperbarui"
        }).code(200);
    }
}

const deleteBookHandler = (req, h) => {
    const {bookId} = req.params;

    const index = shelf.findIndex( (book) => book.id === bookId);

    if(index !== -1){
        shelf.splice(index, 1);
        return h.response({
            status: 'Success',
            message: 'Buku berhasil dihapus',
        }).code(200);
    }

    return h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
}

module.exports = { saveBookHandler, getAllBookHandler, getBookbyIdHandler, editBookHandler, deleteBookHandler };