import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleService } from '../../../core/services/page-title.service';

@Component({
  selector: 'ttt-impressum',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.css'
})
export class ImpressumComponent implements OnInit {
  readonly pageTitle = 'Impressum';
  private readonly pageTitleService = inject(PageTitleService);

  ngOnInit(): void {
    this.pageTitleService.setTitle(this.pageTitle);
  }
}
