import * as dotenv from "dotenv";
dotenv.config();

export const dbConfig = {
  dbUserName: process.env.MONGOOSE_USERNAME,
  dbPassword: process.env.MONGOOSE_PASSWORD,
  dbCluster: process.env.MONGOOSE_CLUSTER,
};

