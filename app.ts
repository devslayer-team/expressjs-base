import "module-alias/register";
import { dbConfig, i18n } from "@/config";
import mongoose from "mongoose";
import express, { Application } from "express";
import Controller from "@/controllers/controller.interface";
import bodyParser from "body-parser";
import i18nextMiddleware from "i18next-express-middleware";
import { errorMiddleware } from "./middlewares";

class App {
  public express: Application;
  public port: number;
  constructor(port: number, controller: Controller) {
    this.express = express();
    this.port = port;
    this.connectDatabase();
    this.initialiseMiddleware();
    this.initializeRoutes(controller);
    this.initialiseErrorHandling();
  }

  private connectDatabase(): void {
    mongoose
      .connect(
        `mongodb+srv://${dbConfig.dbUserName}:${dbConfig.dbPassword}@${dbConfig.dbCluster}.uhf6i3m.mongodb.net/DevSlayer?retryWrites=true&w=majority`
      )
      .then(() => console.log("Database Connected"))
      .catch((err) => console.log(err));
  }

  private initialiseMiddleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(i18nextMiddleware.handle(i18n.i18n, {}));
  }

  private initialiseErrorHandling(): void {
    this.express.use(errorMiddleware);
  }

  private initializeRoutes(controller: Controller): void {
    this.express.use(controller.path, controller.router);
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(i18n.t("listen", { lng: "en", port: this.port }));
      console.log(i18n.t("listen", { lng: "vi", port: this.port }));
    });
  }
}

export default App;
