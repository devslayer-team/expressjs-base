import { Router } from "express";
import Controller from "@/controllers/controller.interface";
import { UserService } from "@/services/user.services";
import { User } from "@/models/user.model";

class RootController implements Controller {
  public path = "/api";
  public router = Router();
  public  userService: UserService;
  constructor(userService : UserService) {
    this.userService = userService;
    this.init([]);
    this.router.post('/', async (req,res) =>{
      try {
        const user = new User(
          'chimdu@gmail.com',
          'Hihi',
        );
        const newUser =  userService.createUser(user);
        res.json(newUser);
      } catch (err){
        res.status(400)
        res.json({message: err})

      }
    })
    this.router.get('/user/:id', async (req,res) =>{
      try {
        const id: string = req.params.id;
        const user = await userService.getUserById(id);
        res.json(user);
      } catch (err){
        console.log(err)
        res.status(400)
        res.json({message: err})

      }
    })
    this.router.get('/user/email/:email', async (req,res) =>{
      try {
        const email: string = req.params.email;
        const user = await userService.getUserByEmail(email);
        res.json(user);
      } catch (err){
        console.log(err)
        res.status(400)
        res.json({message: err})

      }
    })
  }

  private init(controllers: Controller[]): void {
    controllers.forEach((controller) =>
      this.router.use(controller.path, controller.router)
    );
  } 
}

export default RootController;
