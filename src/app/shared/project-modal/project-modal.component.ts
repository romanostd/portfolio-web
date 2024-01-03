import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss'],
})
export class ProjectModalComponent {
  @Input() project: any;
  @Output() close = new EventEmitter<void>();
  selectedProject: any = null;
  currentImageIndex: number = 0;

  nextImage() {
    if (this.project) {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.project.images.length;
    }
  }

  previousImage() {
    if (this.project) {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.project.images.length) %
        this.project.images.length;
    }
  }
}
