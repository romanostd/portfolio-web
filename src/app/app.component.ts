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
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('timelineWrapper') timelineWrapper!: ElementRef;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  currentLang = 'en';
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

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  onLanguageChange(event: any) {
    if ((event == 'pt') || (event == 'en')) {
      this.switchLanguage(event);
    }
    else {
    const input = event.target as HTMLInputElement;
    this.currentLang = input.checked ? 'pt' : 'en';
    this.switchLanguage(this.currentLang);
  }
  }

  ngOnInit(): void {
    this.title = this.texts[this.currentIndex];

    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
      this.title = this.texts[this.currentIndex];
    }, 6000);
  }

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


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const sections = document.querySelectorAll('.animated-section');
    sections.forEach((section: Element) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  }
}
