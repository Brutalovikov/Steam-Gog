import {Injectable} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import EventEmitter from 'events';
import SteamAuth from 'node-steam-openid'
import { Observable, fromEvent, map, tap } from 'rxjs';
import { SteamAuthService } from 'src/shared/providers/auth.service';

@Injectable()
export class AuthService {
	private readonly steam: SteamAuth;

	constructor(
		private configService: ConfigService,
	) {
		this.steam = new SteamAuth({
			realm: `${this.configService.get('BACK_URL')}`,
			returnUrl: `${this.configService.get('BACK_URL')}/auth/steam/callback`,
			apiKey: this.configService.get('STEAM_API_KEY'),


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