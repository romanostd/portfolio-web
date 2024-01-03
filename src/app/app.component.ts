import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { projects } from './mocks/projects.mock';
import { timelineItems } from './mocks/timeline.mock';
import { technologies } from './mocks/technologies.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('timelineWrapper') timelineWrapper!: ElementRef;

  ngOnInit(): void {
    this.title = this.texts[this.currentIndex];

    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
      this.title = this.texts[this.currentIndex];
    }, 6000);
  }

  projects = projects;
  timelineItens = timelineItems;
  techList = technologies;
  title?: string;
  isSidebarOpen = false;
  showPrevArrow: boolean = false;
  showNextArrow: boolean = true;
  selectedProject: any;
  isBlurred: boolean = false;
  private texts: string[] = ['Romano Marcos Stedile', 'Full Stack Developer'];
  private currentIndex = 0;

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
    this.showNextArrow =
      timelineWrapper.scrollLeft <
      timelineWrapper.scrollWidth - timelineWrapper.clientWidth;
  }

  scrollLeft() {
    const timelineWrapper = this.timelineWrapper.nativeElement;
    timelineWrapper.scrollBy({ left: -600, behavior: 'smooth' });
    setTimeout(() => this.checkArrowsVisibility(), 250);
  }

  scrollRight() {
    const timelineWrapper = this.timelineWrapper.nativeElement;
    timelineWrapper.scrollBy({ left: 600, behavior: 'smooth' });
    setTimeout(() => this.checkArrowsVisibility(), 230);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  openModal(project: any) {
    this.selectedProject = project;
    this.isBlurred = true;
  }

  closeModal() {
    this.selectedProject = null;
    this.isBlurred = false;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
