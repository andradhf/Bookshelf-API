const { saveBookHandler, getAllBookHandler, getBookbyIdHandler, editBookHandler, deleteBookHandler } = require('./handler');
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: saveBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookbyIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookHandler,
    },
    {
        method: "DELETE",
        path:'/books/{bookId}',
        handler: deleteBookHandler,
    },
];

module.exports = routes;