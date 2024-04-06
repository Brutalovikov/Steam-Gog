import {Injectable} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import EventEmitter from 'events';
import SteamAuth from 'node-steam-openid'
import { Observable, fromEvent, map, tap } from 'rxjs';
import { SteamAuthService } from 'src/shared/providers/auth.service';

@Injectable()
export class AuthService {
	private readonly steam: SteamAuth;
	private readonly steamAPI: SteamAuthService;
	private eventEmitter: EventEmitter = new EventEmitter();

	constructor(
		// private eventEmitter: EventEmitter2,
	) {
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
			// this.eventEmitter.emit('auth', {data: "hello"});
			return await this.steam.authenticate(req)

			//...do something with the data
		} catch (error) {
			console.error(error);
		}
	}
}