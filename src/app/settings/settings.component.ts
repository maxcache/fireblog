import { Component, OnInit } from '@angular/core';
import * as ProfileMod from '../profile/profile';
import { ProfileService } from '../profile/profile.service';

@Component({
    providers: [ProfileService],
    selector: 'settings',
    templateUrl: 'settings.html'
})
export class SettingsComponent implements OnInit {
    profile: ProfileMod.Profile;
    constructor(private profileService: ProfileService) { }   
    ngOnInit() {       
        console.log('Settings loaded!!');

    }
   
}
