import { Router } from "express";
import { CreateUserController } from "./controller/CreateUserController";
import { CreateTagController } from "./controller/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controller/AuthenticateUserController";
import { CreateComplimentController } from "./controller/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListComplimentsSendedController } from "./controller/ListComplimentsSendedController";
import { ListComplimentsReceivedController} from "./controller/ListComplimentReceivedController";
import { ListTagController } from "./controller/ListTagsController";

const router = Router()

const createUserController = new CreateUserController();

const createTagController = new CreateTagController();

const authenticateUserController = new AuthenticateUserController();

const createComplimentController = new CreateComplimentController

const listComplimentSendedController = new ListComplimentsSendedController()

const listComplimentReceivedController = new ListComplimentsReceivedController()

const listTagController = new ListTagController()


router.get(`/`, (req, res) => {
    res.send(`Hello, World`)
})

router.post('/users', createUserController.handle)

router.post('/tags',
    ensureAdmin,
    ensureAuthenticated,
    createTagController.handle)

router.post(`/login`, authenticateUserController.handle)

router.post(`/compliments`,
    ensureAuthenticated,
    createComplimentController.handle)

router.get("/users/compliments/sended",
ensureAuthenticated,
listComplimentSendedController.handle)

router.get("users/compliments/received",
ensureAuthenticated,
listComplimentReceivedController.handle)

router.get("/tags", ensureAuthenticated, listTagController.handle)



export { router }