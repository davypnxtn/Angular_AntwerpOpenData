import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router, ParamMap, RouterEvent, NavigationEnd } from '@angular/router';
import { LaadpalenService } from 'src/Services/laadpalen.service';
import { IFeatures } from 'src/Models/features';
import { IRootObject } from 'src/Models/rootObject';
import { filter, takeUntil, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-laadpaal-list',
  templateUrl: './laadpaal-list.component.html',
  styleUrls: ['./laadpaal-list.component.css']
})
export class LaadpaalListComponent implements OnInit {
  
  public regio: string;
  public features: IFeatures[] = [];
  public errorMsg: string;
  public destroyed: Subject<any> = new Subject<any>();

  constructor(private route: ActivatedRoute, private router: Router, private _laadpalenService: LaadpalenService) { }

  ngOnInit(): void{

      this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      startWith('Initial call'),
      takeUntil(this.destroyed)).subscribe(async (): Promise<void> => {
        await this.fetchData();
        if (this.errorMsg) {
          console.log("error", this.errorMsg);
        }
      });

  }

  async fetchData() {

    return new Promise((resolve, reject) => {
      this.route.paramMap.subscribe((params: ParamMap) => {
        let regio = params.get('regio');
        this.regio = regio;
        console.log("regio", this.regio);
  
        this._laadpalenService.getLaadpalen().subscribe((data: IRootObject) => {
          this.features = data.features.filter(item => item.attributes.District === this.regio);
          resolve({});
        }, (error: any) => {
          this.errorMsg = error;
          reject(error);
        });
      });
    });

  }

  ngOnDestroy(): void {

    this.destroyed.next();
    this.destroyed.complete();
    
  }
}

