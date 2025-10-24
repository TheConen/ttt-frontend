import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TrackByUtils } from '../../../shared/utils/trackby.utils';
import { PageTitleService } from '../../../core/services/page-title.service';
import { SanitizationService } from '../../../core/services/sanitization.service';

@Component({
  selector: 'ttt-chronik',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './chronik.component.html',
  styleUrl: './chronik.component.css'
})
export class ChronikComponent implements OnInit {
  readonly pageTitle = 'TTT-Chronik';
  readonly pageSubtitle = 'Geschichte des Tactical Training Teams';

  // Dependency injection
  private readonly pageTitleService = inject(PageTitleService);
  private readonly sanitizationService = inject(SanitizationService);

  // TrackBy functions
  readonly trackByIndex = TrackByUtils.trackByIndex;

  ngOnInit(): void {
    this.pageTitleService.setTitle(this.pageTitle);
  }

  // External documentation link (dynamic)
  readonly fictionDocumentationLink = 'https://drive.google.com/file/d/1QpkevojoID6-HfPsp5GIW3OUmUjnfOSd/view';

  // Template helper methods
  private readonly eventTypeConfig = {
    anniversary: { color: 'border-tttRed bg-tttRed text-tttWhite', label: 'Jubiläum' },
    milestone: { color: 'border-blue-500 bg-blue-500/20 text-blue-300', label: 'Meilenstein' },
    system: { color: 'border-orange-500 bg-orange-500/20 text-orange-300', label: 'System' },
    default: { color: 'border-tttGray-500 bg-tttGray-500/20 text-tttGray-300', label: 'Event' }
  };

  getEventTypeColor(type: string): string {
    const config = this.eventTypeConfig[type as keyof typeof this.eventTypeConfig];
    return config?.color || this.eventTypeConfig.default.color;
  }

  getEventTypeLabel(type: string): string {
    const config = this.eventTypeConfig[type as keyof typeof this.eventTypeConfig];
    return config?.label || this.eventTypeConfig.default.label;
  }

  getEventIconClasses(icon: string): string {
    return `pi ${icon} text-inherit`;
  }

  // Helper method to strip HTML tags for accessibility
  getCleanTitle(title: string): string {
    return this.sanitizationService.stripHtml(title);
  }

  // Button styling methods to eliminate duplication
  getPrimaryButtonClasses(): string {
    return 'inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-tttRed to-tttRed-600 px-4 py-2 text-sm font-bold text-tttWhite shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-tttRed/30';
  }

  getSecondaryButtonClasses(): string {
    return 'inline-flex items-center gap-2 rounded-lg border border-tttWhite/30 bg-tttWhite/10 px-4 py-2 text-sm font-bold text-tttWhite transition-all duration-300 hover:bg-tttWhite/20';
  }
}
