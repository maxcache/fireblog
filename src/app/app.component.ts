import { ViewEncapsulation, Component, OnInit } from '@angular/core';
//import { initializeApp, database } from 'firebase'
@Component({
    selector: 'app',
    styleUrls: ['app.css'],
    templateUrl: 'app.html',
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    /**
     *
     */
    constructor() {
      
        // initializeApp(config);

        // var root = database().ref('msgs/2');
        // root.on('value', function (snap) {

        //     console.log(snap.key, snap.val());
        // }
        // );


    }


    ngOnInit() {
        console.log('App loaded!!');
    }
}
