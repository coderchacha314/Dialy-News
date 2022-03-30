import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsapiService } from '../newsapi.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  newsDataRes: any;
  constructor(private newsapi: NewsapiService, private router: Router) {}

  ngOnInit() {
    this.newsapi
      .getNews('top-headlines?country=us&category=business')
      .subscribe((data) => {
        console.log(data);
        this.newsDataRes = data;
      });
  }
  goToSiglepage(article) {
    console.log('aaa', article);
    this.newsapi.currentArticle = article;
    this.router.navigate(['/single-page']);
  }
}
