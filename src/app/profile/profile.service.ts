import { Injectable } from '@angular/core';
import * as ProfileMod from '../profile/profile';

@Injectable()
export class ProfileService {
    constructor() { }
    profile = new ProfileMod.Profile();
    getProfile(): ProfileMod.Profile {
        return null;
    }

}
