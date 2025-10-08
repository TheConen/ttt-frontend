import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackByUtils } from '../../../shared/utils/trackby.utils';
import { PageTitleService } from '../../../core/services/page-title.service';

interface ImpressumSection {
  id: string;
  title: string;
  content: ImpressumContent;
}

interface ImpressumContent {
  type: 'contact' | 'disclaimer';
  data: ContactInfo | DisclaimerSection[];
}

interface ContactInfo {
  name: string;
  email: string;
  role?: string;
}

interface DisclaimerSection {
  subtitle: string;
  paragraphs: string[];
}

interface ExternalLink {
  url: string;
  label: string;
}

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.css'
})
export class ImpressumComponent implements OnInit {
  readonly pageTitle = 'Impressum';

  constructor(private pageTitleService: PageTitleService) {}

  ngOnInit(): void {
    this.pageTitleService.setTitle(this.pageTitle);
  }
  readonly pageSubtitle = 'Rechtliche Informationen';
  readonly sourceLabel = 'Quelle:';
  readonly sourceTitle = 'Quelle';
  
  readonly contactInfo: ContactInfo = {
    name: 'Carsten Kummer',
    email: 'kontakt@tacticalteam.de'
  };

  readonly responsiblePerson: ContactInfo = {
    name: 'Carsten Kummer',
    email: 'kontakt@tacticalteam.de',
    role: 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV'
  };

  readonly disclaimerSections: DisclaimerSection[] = [
    {
      subtitle: 'Haftung für Inhalte',
      paragraphs: [
        'Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
        'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.'
      ]
    },
    {
      subtitle: 'Haftung für Links',
      paragraphs: [
        'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.',
        'Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.'
      ]
    },
    {
      subtitle: 'Urheberrecht',
      paragraphs: [
        'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.',
        'Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.'
      ]
    }
  ];

  readonly sourceLink: ExternalLink = {
    url: 'https://www.e-recht24.de',
    label: 'https://www.e-recht24.de'
  };

  readonly impressumSections: ImpressumSection[] = [
    {
      id: 'tmg-info',
      title: 'Angaben gemäß § 5 TMG',
      content: {
        type: 'contact',
        data: this.contactInfo
      }
    },
    {
      id: 'responsible-content',
      title: this.responsiblePerson.role!,
      content: {
        type: 'contact',
        data: this.responsiblePerson
      }
    },
    {
      id: 'disclaimer',
      title: 'Haftungsausschluss',
      content: {
        type: 'disclaimer',
        data: this.disclaimerSections
      }
    }
  ];

  // Type guard methods for safe template access
  getContactInfo(section: ImpressumSection): ContactInfo {
    if (section.content.type === 'contact') {
      return section.content.data as ContactInfo;
    }
    throw new Error('Expected contact section');
  }

  getDisclaimerSections(section: ImpressumSection): DisclaimerSection[] {
    if (section.content.type === 'disclaimer') {
      return section.content.data as DisclaimerSection[];
    }
    throw new Error('Expected disclaimer section');
  }

  // TrackBy functions for performance optimization
  readonly trackByIndex = TrackByUtils.trackByIndex;
  
  trackBySection(index: number, section: ImpressumSection): string {
    return section.id;
  }

  trackByDisclaimer(index: number, disclaimer: DisclaimerSection): string {
    return disclaimer.subtitle;
  }
}