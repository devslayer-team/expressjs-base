import App from "./app";
import RootController from '@/controllers';
import locator,{ ServiceKeys, initializeServicesLocator } from "./locator";

initializeServicesLocator();
const app = new App(
  Number(process.env.PORT || 7921),
  new RootController(locator.get(ServiceKeys.userService))
)

app.listen();