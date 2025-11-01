import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeftSidebarComponent } from './components/sidebar/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './components/sidebar/right-sidebar/right-sidebar.component';

@Component({
    selector: 'ttt-root',
    standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent, LeftSidebarComponent, RightSidebarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
}
