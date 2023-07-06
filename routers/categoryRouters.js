const {createCategory,getAllCategories,getCategoryById,updateCategory,deleteCategory} = require('../controllers/categoryController');
const {authenticateTokenAdmin} = require('../JWT/JWT_authenticateAdmin');

exports.categoryRouters = (app)=>{
    app.get('/categories', getAllCategories);
    app.get('/categories/getOne/:id', getCategoryById);
    app.post('/categories/create', authenticateTokenAdmin, createCategory);
    app.put('/categories/update/:id', authenticateTokenAdmin, updateCategory);
    app.delete('/categories/delete/:id', authenticateTokenAdmin, deleteCategory);
}
