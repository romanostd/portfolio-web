import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  @ViewChild('timelineWrapper') timelineWrapper!: ElementRef;

  public timelineItems = [
    {
      date: '2018',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      date: '2019',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      date: '2020',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      date: '2021',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      date: '2021',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },

    {
      date: '2021',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },

    {
      date: '2021',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ];

  showPrevArrow: boolean = false;
  showNextArrow: boolean = true;

  ngAfterViewInit(): void {
    this.checkArrowsVisibility();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkArrowsVisibility();
  }

  checkArrowsVisibility() {
    const timelineWrapper = this.timelineWrapper.nativeElement;
    this.showPrevArrow = timelineWrapper.scrollLeft > 0;
    this.showNextArrow = timelineWrapper.scrollLeft < timelineWrapper.scrollWidth - timelineWrapper.clientWidth;
  }

  scrollLeft() {
    const timelineWrapper = this.timelineWrapper.nativeElement;
    timelineWrapper.scrollBy({ left: -500, behavior: 'smooth' });
    setTimeout(() => this.checkArrowsVisibility(), 500);
  }

  scrollRight() {
    const timelineWrapper = this.timelineWrapper.nativeElement;
    timelineWrapper.scrollBy({ left: 500, behavior: 'smooth' });
    setTimeout(() => this.checkArrowsVisibility(), 500);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar status:', this.isSidebarOpen); 
  }


  title?: string;
  private texts: string[] = ['Romano Marcos Stedile', 'Full Stack Developer'];
  private currentIndex = 0;
  isSidebarOpen = false;

  ngOnInit(): void {
    this.title = this.texts[this.currentIndex];

    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
      this.title = this.texts[this.currentIndex];
    }, 6000); 
  }
}
