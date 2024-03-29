import {Injectable} from '@nestjs/common';
import SteamAuth from 'node-steam-openid'

@Injectable()
export class AuthService {
	private readonly steam: SteamAuth;

	constructor() {
		this.steam = new SteamAuth({
			realm: 'http://localhost:3000',
			returnUrl: 'http://localhost:3000/auth/steam/callback',
			apiKey: '9EA0004FFC993ED4C65632B399B53BDB',
		});
	}

	async getRedirectUrl(): Promise<string> {
		return await this.steam.getRedirectUrl(); // Renvoie l'URL d'authentification Steam
	}

	async authenticate(req: any): Promise<any> {
    console.log(3)
		try {
			return await this.steam.authenticate(req)

			//...do something with the data
		} catch (error) {
			console.error(error);
		}
	}
}