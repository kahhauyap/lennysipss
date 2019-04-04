import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../reviews.service';
import { Review } from '../review';

import { Inject, HostListener } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews: Review[];
  searchText: string;
  filteredReviews: Review[];

  public fixed: boolean = false;

  constructor(private reviewService: ReviewService, ) { }
  //@Inject(DOCUMENT) private doc: Document
  ngOnInit() {
    this.getReviews();
  }

  getReviews(): void {
    this.reviewService.getReviews()
      .subscribe(reviews => {
        this.reviews = reviews;
        this.filteredReviews = this.reviews;
      });
  }

  search(): void {
    if (!this.searchText)
      this.filteredReviews = this.reviews;
    else
      this.filteredReviews = this.reviews
        .filter(review => this.caseIncludes(review.drink, this.searchText) || this.caseIncludes(review.location, this.searchText));
  }

  caseIncludes(a: string, b: string) {
    if (a['toUpperCase']().includes(b['toUpperCase']()))
      return true;
    else
      return false;
  }

  /*
    @HostListener('window:scroll', ['$event'])
    onWindowScroll(e) {
      if (window.pageYOffset > 600) {
        let element = document.getElementById('search-bar');
        element.classList.add('fixed');
      } else {
        let element = document.getElementById('search-bar');
        element.classList.remove('fixed');
      }
    }
  */
}
