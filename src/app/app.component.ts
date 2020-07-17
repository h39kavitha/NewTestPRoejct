import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
   beerSearchForm: FormGroup;
  name = 'Angular';
  randomApi = 'https://api.punkapi.com/v2/beers/random';
  searchData: any = [];
  isSubmitted: Boolean = false;
  data: any = [];
  constructor(
    private httpClinet: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.randomAnotherClick('random');
  }
  ngOnInit() {
    this.beerSearchForm = this.formBuilder.group({
      search: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9? -]+$')]],
      searchBy: ['name', Validators.required]
    });
  }

  randomAnotherClick(param) {
    if (param === 'random') {
      this.httpClinet.get(this.randomApi).subscribe((res: any[]) => {
        this.data = res.filter(ele => {
          return ele.name && ele.description;
        });
      });
      console.log(this.data, '----')
    } else {
      this.httpClinet.get(this.randomApi).subscribe((res: any[]) => {
        this.data = res.filter(ele => {
          return ele.name && ele.description && ele.abv / 100 <= 0.05;
        });
      });
    }
  }

  // this method for auto suggestion on key search using debounce concept
  searchByNameOrDescription(event: any) {
    const queryString = this.beerSearchForm.get('searchBy').value === 'name' ? 'beer_name' : 'food';
    console.log(queryString)
      if (!this.beerSearchForm.controls.search.hasError('pattern')) {
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.httpClinet.get(`https://api.punkapi.com/v2/beers?${queryString}=${event.target.value}`)
            .subscribe(res => {
              this.searchData = res;
            });
        }, 3000);
      }
    }
    
  onSubmit() {
    this.isSubmitted = false;
    const queryString = this.beerSearchForm.get('searchBy').value === 'name' ? 'beer_name' : 'food';
    this.httpClinet.get(`https://api.punkapi.com/v2/beers?${queryString}=${this.beerSearchForm.get('search').value}`)
      .subscribe(res => {
        this.searchData = res;
        this.isSubmitted = true;
      });
  }

onChange() {
  this.beerSearchForm.controls['search'].reset();
}
  
}
