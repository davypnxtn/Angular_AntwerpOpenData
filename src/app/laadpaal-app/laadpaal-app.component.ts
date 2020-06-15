import { Component, OnInit } from '@angular/core';
import { LaadpalenService } from 'src/Services/laadpalen.service';
import { IRootObject } from 'src/Models/rootObject';
import { IFeatures } from 'src/Models/features';

@Component({
  selector: 'app-laadpaal-app',
  templateUrl: './laadpaal-app.component.html',
  styleUrls: ['./laadpaal-app.component.css']
})
export class LaadpaalAppComponent implements OnInit {

  public features: IFeatures[] = [];
  public errorMsg: string;
  
  constructor(private _laadpalenService: LaadpalenService) { }

  async ngOnInit(): Promise<void>{
    
    await this.fetchData();
    if (this.errorMsg) {
      console.log("error", this.errorMsg);
    }

  }

  async fetchData() {

    return new Promise((resolve, reject) => {
      this._laadpalenService.getLaadpalen().subscribe((data: IRootObject) => {
        this.features = data.features;
        resolve({});
      }, (error: any) => {
        this.errorMsg = error;
        reject(error);
      });
    });
  };

}
