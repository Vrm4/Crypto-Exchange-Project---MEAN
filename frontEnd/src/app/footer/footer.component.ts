import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHome , faPoll, faWallet , faCoins} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private library: FaIconLibrary) {
    library.addIcons(faHome,faPoll,faWallet,faCoins)
   }

  ngOnInit(): void {
    
  }

}
