import { Component, OnInit } from '@angular/core';
import { EventService } from '../../core/services/event';
import { Event } from '../../shared/models/event';
import { EventComponent } from '../../shared/components/events/event/event';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [EventComponent],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events implements OnInit {

  currentPage: number = 1;
  totalPages: number = 0;
  events: Event[] = []

  constructor(private eventService: EventService, private router:Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = params['page'] ? Number(params['page']) : 1
      this.loadEvents(page)
    })
  }

  loadEvents(page: number) {
    this.eventService.getEvents(page).subscribe({
      next: (response: any) => {
        this.events = response.events;
        this.currentPage = response.current_page;
        this.totalPages = response.total_pages;
        console.log(this.events, this.currentPage, this.totalPages)
      },
      error: (error: any) => {
        console.error("error fetching events", error)
      }
    })
  }

  nextPage() {
    if(this.currentPage < this.totalPages) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage + 1 },
        queryParamsHandling: 'merge'
      })
    }
  }

  previousPage() {
    if(this.currentPage > 1) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage - 1 },
        queryParamsHandling: 'merge'
      })
    }
  }
}
