import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class NewsapiService {
  currentArticle: any;
  constructor(private http: HttpClient) {}

  getNews(url) {
    //  return this.http.get(`${API_KEY}/${url}&apiKey=${API_KEY}`);
    return this.http.get(
      'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d00663ea0d504681afa1096386a4aaa9'
    );
  }
}
