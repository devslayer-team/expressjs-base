export default class ServiceLocator {
    private services: { [key: string]: unknown } = {};
  
    public register<T>(name: string, service: T) {
      this.services[name] = service;
    }
  
    public get<T>(name: string): T {
      const service = this.services[name];
      if (!service) {
        throw new Error(`Service '${name}' not found in service locator`);
      }
      return service as T;
    }
  }