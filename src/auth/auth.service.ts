import {Injectable} from '@nestjs/common';
import EventEmitter from 'events';
import SteamAuth from 'node-steam-openid'
import { SteamAuthService } from 'src/shared/providers/auth.service';

@Injectable()
export class AuthService {
	private readonly steam: SteamAuth;
	private readonly steamAPI: SteamAuthService;
	private eventEmitter: EventEmitter = new EventEmitter();

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
		try {
			return await this.steam.authenticate(req)
		} catch (error) {
			console.error(error);
		}
	}
}