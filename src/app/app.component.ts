import { Component} from '@angular/core';
import { LaadpalenService } from 'src/Services/laadpalen.service';
import { IRootObject } from 'src/Models/rootObject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public appTitle: string = "Laadpalen Antwerpen";
  public regios: string[] = [];
  public errorMsg: string;

  constructor(private _laadpalenService: LaadpalenService) { }

  async ngOnInit(): Promise<void> {

    await this.fetchData();
    if (this.errorMsg) {
      console.log("error", this.errorMsg);
    }

  }

  async fetchData() {

    return new Promise((resolve, reject) => {
      this._laadpalenService.getLaadpalen().subscribe((data: IRootObject) => {
        this.regios = [...new Set(data.features.map(item => item.attributes.District))];
        resolve({});
      }, (error: any) => {
        this.errorMsg = error;
        reject(error);
      });
    });
    
  }

}
