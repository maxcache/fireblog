import { ViewEncapsulation, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    styleUrls: ['app.css'],
    templateUrl: 'app.html',
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    ngOnInit() {
        console.log('App loaded!!');
    }
}
