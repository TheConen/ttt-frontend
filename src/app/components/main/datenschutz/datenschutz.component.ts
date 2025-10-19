import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackByUtils } from '../../../shared/utils/trackby.utils';
import { PageTitleService } from '../../../core/services/page-title.service';
import { SanitizationService } from '../../../core/services/sanitization.service';

interface DatenschutzSection {
  id: string;
  title: string;
  content: TextSection | DefinitionSection | CookieSection | NewsletterSection | RightsSection;
}

interface TextSection {
  type: 'text';
  paragraphs: string[];
  subsections?: SubSection[];
}

interface DefinitionSection {
  type: 'definitions';
  intro: string;
  definitions: Definition[];
}

interface CookieSection {
  type: 'cookies';
  intro: string;
  types: string[];
  details: CookieDetail[];
}

interface NewsletterSection {
  type: 'newsletter';
  paragraphs: string[];
  provider: ServiceProvider;
  dataTransmitted: string[];
}

interface RightsSection {
  type: 'rights';
  intro: string;
  rights: string[];
  outro: string;
}

interface SubSection {
  title: string;
  content: string | string[];
}

interface Definition {
  number: string;
  title: string;
  description: string;
}

interface CookieDetail {
  title: string;
  description: string;
}

interface ServiceProvider {
  name: string;
  company: string;
  address: string[];
  phone: string;
  email: string;
  privacyUrl: string;
}

@Component({
  selector: 'ttt-datenschutz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datenschutz.component.html',
  styleUrl: './datenschutz.component.css'
})
export class DatenschutzComponent implements OnInit {
  readonly pageTitle = 'Datenschutzerklärung';
  private readonly pageTitleService = inject(PageTitleService);
  private readonly sanitizationService = inject(SanitizationService);

  ngOnInit(): void {
    this.pageTitleService.setTitle(this.pageTitle);
  }
  readonly pageSubtitle = 'Datenschutzbestimmungen';
  readonly lastUpdated = 'Oktober 2025';
  
  readonly staticTexts = {
    cookiesIntro: 'Diese Website nutzt folgende Arten von Cookies, deren Umfang und Funktionsweise im Folgenden erläutert werden:',
    newsletterIntro: 'Für den Versand von Newslettern verwenden wir einen externen Dienstleister. Derzeit arbeiten wir mit folgendem Dienstleister zusammen:'
  } as const;
  
  readonly tttContactInfo = {
    name: 'Tactical Training Team (TTT)',
    email: 'kontakt@tacticalteam.de'
  };

  readonly externalLinks = {
    slotbot: {
      url: 'https://docs.slotbot.de/policies/datenschutzerkl%C3%A4rung',
      label: 'slotbot.de'
    },
    mailchimp: {
      url: 'https://mailchimp.com/legal/privacy/',
      label: 'https://mailchimp.com/legal/privacy/'
    },
    tacticalteam: {
      url: 'https://tacticalteam.de',
      label: 'tacticalteam.de'
    }
  };

  readonly definitions: Definition[] = [
    {
      number: '1',
      title: 'Personenbezogene Daten',
      description: '„Personenbezogene Daten" sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen; als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen Merkmalen identifiziert werden kann.'
    },
    {
      number: '2',
      title: 'Verarbeitung',
      description: '„Verarbeitung" ist jeder, mit oder ohne Hilfe automatisierter Verfahren, ausgeführter Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten wie das Erheben, das Erfassen, die Organisation, das Ordnen, die Speicherung, die Anpassung oder Veränderung, das Auslesen, das Abfragen, die Verwendung, die Offenlegung durch Übermittlung, Verbreitung oder eine andere Form der Bereitstellung, den Abgleich oder die Verknüpfung, die Einschränkung, das Löschen oder die Vernichtung.'
    },
    {
      number: '3',
      title: 'Verantwortlicher',
      description: '„Verantwortlicher" ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.'
    },
    {
      number: '4',
      title: 'Einwilligung',
      description: 'Eine „Einwilligung" der betroffenen Person ist jede freiwillig für den bestimmten Fall, in informierter Weise und unmissverständlich abgegebene Willensbekundung in Form einer Erklärung oder einer sonstigen eindeutigen bestätigenden Handlung, mit der die betroffene Person zu verstehen gibt, dass sie mit der Verarbeitung der sie betreffenden personenbezogenen Daten einverstanden ist.'
    }
  ];

  readonly cookieDetails: CookieDetail[] = [
    {
      title: '1. Transiente Cookies',
      description: 'Transiente Cookies werden automatisiert gelöscht, wenn Sie den Browser schließen. Dazu zählen insbesondere die Session-Cookies. Diese speichern eine sogenannte Session-ID, mit welcher sich verschiedene Anfragen Ihres Browsers der gemeinsamen Sitzung zuordnen lassen. Dadurch kann Ihr Rechner wiedererkannt werden, wenn Sie auf unsere Website zurückkehren. Die Session-Cookies werden gelöscht, wenn Sie sich ausloggen oder den Browser schließen.'
    },
    {
      title: '2. Persistente Cookies',
      description: 'Persistente Cookies werden automatisiert nach einer vorgegebenen Dauer gelöscht, die sich je nach Cookie unterscheiden kann. Sie können die Cookies in den Sicherheitseinstellungen Ihres Browsers jederzeit löschen.'
    },
    {
      title: '3. Browser-Konfiguration',
      description: 'Sie können Ihre Browser-Einstellung entsprechend Ihren Wünschen konfigurieren und z. B. die Annahme von Third-Party-Cookies oder allen Cookies ablehnen. Wir weisen Sie darauf hin, dass Sie durch die Deaktivierung von Cookies eventuell nicht alle Funktionen dieser Website nutzen können.'
    },
    {
      title: '4. Verwendungszweck',
      description: 'Wir setzen Cookies ein, um Sie für Folgebesuche identifizieren zu können, falls Sie über einen Account bei uns verfügen. Andernfalls müssten Sie sich für jeden Besuch erneut einloggen.'
    }
  ];

  readonly mailchimpProvider: ServiceProvider = {
    name: 'MailChimp',
    company: 'The Rocket Science Group LLC d/b/a MailChimp',
    address: [
      '675 Ponce De Leon Ave NE, Suite 5000',
      'Atlanta, Georgia 30308'
    ],
    phone: '+1 404 806-5843',
    email: 'legal@mailchimp.com',
    privacyUrl: 'https://mailchimp.com/legal/privacy/'
  };

  readonly userRights: string[] = [
    'unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten',
    'die Berichtigung oder Löschung dieser Daten zu verlangen',
    'eine Einschränkung der Datenverarbeitung zu verlangen',
    'der Datenverarbeitung zu widersprechen',
    'eine Übertragung Ihrer Daten zu verlangen'
  ];

  readonly datenschutzSections: DatenschutzSection[] = [
    {
      id: 'scope',
      title: 'Gültigkeitsbereich',
      content: {
        type: 'text',
        paragraphs: [
          'Diese Erklärung gilt für alle Subdomains von *.tacticalteam.de, ausgenommen events.tacticalteam.de. Für events.tacticalteam.de gilt die Datenschutzerklärung von slotbot.de.'
        ]
      }
    },
    {
      id: 'security',
      title: 'Sicherheit und Schutz Ihrer personenbezogenen Daten',
      content: {
        type: 'text',
        paragraphs: [
          'Wir betrachten es als unsere vorrangige Aufgabe, die Vertraulichkeit der von Ihnen bereitgestellten personenbezogenen Daten zu wahren und diese vor unbefugten Zugriffen zu schützen. Deshalb wenden wir äußerste Sorgfalt und modernste Sicherheitsstandards an, um einen maximalen Schutz Ihrer personenbezogenen Daten zu gewährleisten.',
          'Als Online-Gaming-Community unterliegen wir zwar nicht den Bestimmungen der europäischen Datenschutzgrundverordnung (DSGVO) und den Regelungen des Bundesdatenschutzgesetzes (BDSG). Jedoch haben wir technische und organisatorische Maßnahmen getroffen, die sicherstellen, dass die Vorschriften über den Datenschutz sowohl von uns, als auch von unseren externen Dienstleistern beachtet werden.'
        ]
      }
    },
    {
      id: 'responsible',
      title: 'Name und Kontakt des Verantwortlichen gemäß Artikel 4 Abs. 7 DSGVO',
      content: {
        type: 'text',
        paragraphs: [
          `Online-Gaming-Community: ${this.tttContactInfo.name}`,
          `E-Mail: ${this.tttContactInfo.email}`
        ]
      }
    },
    {
      id: 'definitions',
      title: 'Begriffsbestimmungen',
      content: {
        type: 'definitions',
        intro: 'Der Gesetzgeber fordert, dass personenbezogene Daten auf rechtmäßige Weise, nach Treu und Glauben und in einer für die betroffene Person nachvollziehbaren Weise verarbeitet werden („Rechtmäßigkeit, Verarbeitung nach Treu und Glauben, Transparenz"). Um dies zu gewährleisten, informieren wir Sie über die einzelnen gesetzlichen Begriffsbestimmungen, die auch in dieser Datenschutzerklärung verwendet werden:',
        definitions: this.definitions
      }
    },
    {
      id: 'data-collection',
      title: 'Information über die Erhebung personenbezogener Daten',
      content: {
        type: 'text',
        paragraphs: [
          'Im Folgenden informieren wir über die Erhebung personenbezogener Daten bei Nutzung unserer Website. Personenbezogene Daten sind z. B. Name, Adresse, E-Mail-Adressen, Nutzerverhalten.',
          'Bei einer Kontaktaufnahme mit uns per E-Mail werden die von Ihnen mitgeteilten Daten (Ihre E-Mail-Adresse, ggf. Ihr Name) von uns gespeichert, um Ihre Fragen zu beantworten. Die in diesem Zusammenhang anfallenden Daten löschen wir, nachdem die Speicherung nicht mehr erforderlich ist, oder die Verarbeitung wird eingeschränkt, falls gesetzliche Aufbewahrungspflichten bestehen.'
        ],
        subsections: [
          {
            title: 'Erhebung personenbezogener Daten bei Besuch unserer Website',
            content: [
              'Bei der bloß informatorischen Nutzung der Website, also wenn Sie sich nicht registrieren oder uns anderweitig Informationen übermitteln, erheben wir nur die personenbezogenen Daten, die Ihr Browser an unseren Server übermittelt. Wenn Sie unsere Website betrachten möchten, erheben wir die folgenden Daten, die für uns technisch erforderlich sind, um Ihnen unsere Website anzuzeigen und die Stabilität und Sicherheit zu gewährleisten (Rechtsgrundlage ist Art. 6 Abs. 1 S. 1 lit. f DSGVO):',
              'IP-Adresse|Datum und Uhrzeit der Anfrage|Zeitzonendifferenz zur Greenwich Mean Time (GMT)|Inhalt der Anforderung (konkrete Seite)|Zugriffsstatus/HTTP-Statuscode|jeweils übertragene Datenmenge|Website, von der die Anforderung kommt|Browser|Betriebssystem und dessen Oberfläche|Sprache und Version der Browsersoftware'
            ]
          }
        ]
      }
    },
    {
      id: 'cookies',
      title: 'Einsatz von Cookies',
      content: {
        type: 'cookies',
        intro: 'Zusätzlich zu den zuvor genannten Daten werden bei der Nutzung unserer Website Cookies auf Ihrem Rechner gespeichert. Bei Cookies handelt es sich um kleine Textdateien, die auf Ihrer Festplatte dem von Ihnen verwendeten Browser zugeordnet gespeichert werden und durch welche der Stelle, die den Cookie setzt, bestimmte Informationen zufließen. Cookies können keine Programme ausführen oder Viren auf Ihren Computer übertragen. Sie dienen dazu, das Internetangebot insgesamt nutzerfreundlicher und effektiver zu machen.',
        types: ['Transiente Cookies', 'Persistente Cookies'],
        details: this.cookieDetails
      }
    },
    {
      id: 'newsletter',
      title: 'Newsletter',
      content: {
        type: 'newsletter',
        paragraphs: [
          'Mit Ihrer Einwilligung können Sie unseren Newsletter abonnieren, mit dem wir Sie über unsere aktuellen interessanten Angebote informieren.',
          'Für die Anmeldung zu unserem Newsletter verwenden wir das sog. Double-Opt-in-Verfahren. Das heißt, dass wir Ihnen nach Ihrer Anmeldung eine E-Mail an die angegebene E-Mail-Adresse senden, in welcher wir Sie um Bestätigung bitten, dass Sie den Versand des Newsletters wünschen. Wenn Sie Ihre Anmeldung nicht innerhalb von 24 Stunden bestätigen, werden Ihre Informationen gesperrt und nach einem Monat automatisch gelöscht.',
          'Pflichtangabe für die Übersendung des Newsletters ist allein Ihre E-Mail-Adresse. Die Angabe weiterer, gesondert markierter Daten ist freiwillig und wird verwendet, um Sie persönlich ansprechen zu können. Nach Ihrer Bestätigung speichern wir Ihre E-Mail-Adresse zum Zweck der Zusendung des Newsletters. Rechtsgrundlage ist Art. 6 Abs. 1 S. 1 lit. a DSGVO.',
          'Ihre Einwilligung in die Übersendung des Newsletters können Sie jederzeit widerrufen und den Newsletter abbestellen. Den Widerruf können Sie durch Klick auf den in jeder Newsletter-E-Mail bereitgestellten Link oder durch eine Nachricht an die im Impressum angegebenen Kontaktdaten erklären.'
        ],
        provider: this.mailchimpProvider,
        dataTransmitted: ['E-Mail-Adresse', 'IP-Adresse']
      }
    },
    {
      id: 'children',
      title: 'Kinder',
      content: {
        type: 'text',
        paragraphs: [
          'Unser Angebot richtet sich grundsätzlich an Erwachsene. Personen unter 18 Jahren sollten ohne Zustimmung der Eltern oder Erziehungsberechtigten keine personenbezogenen Daten an uns übermitteln.'
        ]
      }
    },
    {
      id: 'rights',
      title: 'Ihre Rechte',
      content: {
        type: 'rights',
        intro: 'Sie haben jederzeit das Recht:',
        rights: this.userRights,
        outro: 'Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.'
      }
    },
    {
      id: 'last-updated',
      title: 'Stand der Datenschutzerklärung',
      content: {
        type: 'text',
        paragraphs: [
          `Diese Datenschutzerklärung ist aktuell gültig und hat den Stand ${this.lastUpdated}.`
        ]
      }
    },
    {
      id: 'disclaimer',
      title: 'Haftungsausschluss',
      content: {
        type: 'text',
        paragraphs: [
          'This website is not affiliated or authorized by Bohemia Interactive a.s. Bohemia Interactive, ARMA, DAYZ and all associated logos and designs are trademarks or registered trademarks of Bohemia Interactive a.s.'
        ]
      }
    }
  ];

  // Type guard methods for safe template access
  getTextContent(section: DatenschutzSection): TextSection {
    if (section.content.type === 'text') {
      return section.content;
    }
    throw new Error('Expected text section');
  }

  getDefinitionsContent(section: DatenschutzSection): DefinitionSection {
    if (section.content.type === 'definitions') {
      return section.content;
    }
    throw new Error('Expected definitions section');
  }

  getCookiesContent(section: DatenschutzSection): CookieSection {
    if (section.content.type === 'cookies') {
      return section.content;
    }
    throw new Error('Expected cookies section');
  }

  getNewsletterContent(section: DatenschutzSection): NewsletterSection {
    if (section.content.type === 'newsletter') {
      return section.content;
    }
    throw new Error('Expected newsletter section');
  }

  getRightsContent(section: DatenschutzSection): RightsSection {
    if (section.content.type === 'rights') {
      return section.content;
    }
    throw new Error('Expected rights section');
  }

  // Helper methods for template
  hasSpecialLink(section: DatenschutzSection, linkType: string): boolean {
    return section.id === 'scope' && linkType === 'slotbot';
  }

  getDataList(content: string): string[] {
    return content.includes('|') ? content.split('|') : [content];
  }

  getSubsectionContent(subsection: SubSection): string[] {
    return Array.isArray(subsection.content) ? subsection.content : [subsection.content];
  }

  // TrackBy functions for performance optimization
  trackBySection(index: number, section: DatenschutzSection): string {
    return section.id;
  }

  trackByDefinition(index: number, definition: Definition): string {
    return definition.number;
  }

  trackByCookie(index: number, cookie: CookieDetail): string {
    return cookie.title;
  }

  // Helper method to strip HTML tags for accessibility
  getCleanTitle(title: string): string {
    return this.sanitizationService.stripHtml(title);
  }

  readonly trackByIndex = TrackByUtils.trackByIndex;
}