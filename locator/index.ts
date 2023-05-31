import { MongoUserDatasource } from "@/database/datasource/mongo/user.datasource";
import ServiceLocator from "./service_locator";
import UserRepository from "@/database/repository/user.repository";
import { UserServiceImpl } from "@/services/user.services";

const locator = new ServiceLocator();
export default locator;
export class ServiceKeys {
    static userDataSource = 'UserDataSource';
    static userRepository = 'UserRepository';
    static userService = 'UserService';
}

export function initializeServicesLocator() {
    locator.register(ServiceKeys.userDataSource, new MongoUserDatasource());
    locator.register(ServiceKeys.userRepository, new UserRepository(locator.get(ServiceKeys.userDataSource)));
    locator.register(ServiceKeys.userService, new UserServiceImpl(locator.get(ServiceKeys.userRepository)));

}
