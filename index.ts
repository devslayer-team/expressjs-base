import App from "./app";
import RootController from '@/controllers';

const app = new App(
  Number(process.env.PORT || 7921),
  new RootController()
)

app.listen();