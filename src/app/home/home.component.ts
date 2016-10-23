import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    styleUrls: ['home.css'],
    templateUrl: 'home.html'
})
export class HomeComponent implements OnInit {
 
    ngOnInit() {       
        console.log('Home loaded!!');
    }   
}
