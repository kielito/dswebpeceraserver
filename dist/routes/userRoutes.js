"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const validation_1 = require("../lib/validation");
const register_schema_1 = require("../lib/register-schema");
const verifyToken_1 = require("../lib/verifyToken");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // se asocian rutas con el metodo de una clase existente:
        this.router.get('/', (req, res) => {
            req.session.auth = false;
            req.session.user = {};
            res.render("partials/signinForm");
        });
        // inicio de sesion
        this.router.get('/signin', userController_1.default.signin);
        this.router.post('/signin', userController_1.default.login);
        // registro
        this.router.get('/signup', userController_1.default.signup);
        this.router.post('/signup', register_schema_1.registerSchema, validation_1.validateRequestSchema, userController_1.default.addUser);
        //Home del usuario		
        this.router.get('/home', userController_1.default.home);
        //CRUD
        this.router.get('/list', verifyToken_1.TokenValidation, userController_1.default.list);
        this.router.get('/find/:id', userController_1.default.find);
        this.router.post('/add', userController_1.default.addUser);
        this.router.put('/update/:id', userController_1.default.update);
        /*
        this.router.get('/update/:id',userController.update); // tarea dibujo vista
        this.router.post('/update/:id',userController.update); // tarea update x saveChanges ejecuta update bd
        */
        this.router.delete('/delete/:id', userController_1.default.delete);
        this.router.get('/delete/:id', userController_1.default.delete);
        // FIN CRUD
        this.router.get('/control', userController_1.default.control);
        this.router.post('/procesar', userController_1.default.procesar);
        this.router.get('/salir', userController_1.default.endSession);
        this.router.get('/error', userController_1.default.showError);
    }
}
//Exportamos el enrutador con 
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=userRoutes.js.map