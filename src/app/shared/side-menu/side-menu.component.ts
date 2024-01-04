import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  @Input() isOpen: boolean = false;
  @Input() currentLang: string = 'en'; 
  @Output() languageChange = new EventEmitter<string>(); 

  onLanguageSwitchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      const newLang = input.checked ? 'pt' : 'en';
      this.currentLang = newLang;
      this.languageChange.emit(newLang);
    }
  }
}
