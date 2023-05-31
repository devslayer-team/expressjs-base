export class User {
	public email: string;
	public password: string;
  
	constructor(
		email: string,
		password: string,
	) {
		this.email = email;
		this.password = password;
	}
  
	public toString(): string {
		return `{email: '${this.email}', password: '${this.password}'}`;
  
	}
	public toJson(): Map<string, string> {
		const userMap = new Map<string, string>();
		userMap.set('email', this.email);
		userMap.set('password', this.password);
		return userMap;
	}
	static fromJson(json: Map<string, string>): User {
		const email = json.get('email') ?? '';
		const password = json.get('password') ?? '';
		return new User(email, password, );
	}
  
  }
  
  
  
  