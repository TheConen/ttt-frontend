import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';

import { PageTitleService } from '../../../core/services/page-title.service';
import { SanitizationService } from '../../../core/services/sanitization.service';

// Interfaces for type safety
interface BannerSlide {
    image: string;
    title: string;
    subtitle: string;
}

interface CommunityStats {
    value: string;
    label: string;
    color: string;
}

interface CtaButton {
    label: string;
    icon: string;
    routerLink?: string;
    href?: string;
    primary: boolean;
}

interface OrbatRank {
    title: string;
    icon: string;
    description: string;
}

interface Feature {
    title: string;
    description: string;
    icon: string;
}

interface Requirement {
    label: string;
    icon: string;
}

interface JoinStep {
    number: number;
    title: string;
    description: string;
    icon: string;
    iconColor: string;
    link?: {
        url: string;
        label: string;
    };
}

@Component({
    selector: 'ttt-home',
    imports: [CommonModule, RouterLink, ButtonDirective],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
    // Component state
    currentImageIndex = 0;
    private sliderInterval?: ReturnType<typeof setInterval>;
    private readonly slideInterval = 8000; // 8 seconds

    constructor(
        private pageTitleService: PageTitleService,
        private sanitizationService: SanitizationService
    ) {}

    // Banner slides with content
    readonly bannerSlides: BannerSlide[] = [
        {
            image: '/img/home-banner/home-banner1.webp',
            title: 'TACTICAL TRAINING <span class="text-tttRed">TEAM</span>',
            subtitle: 'Als eine der größeren Arma-Gemeinschaften im deutschsprachigen Raum bieten wir dir das volle Paket: Von Ausbildung und Training bis hin zu Events und Kampagnen ist alles dabei.'
        },
        {
            image: '/img/home-banner/home-banner2.webp',
            title: 'REALISTISCHES <span class="text-tttRed">MILSIM</span>',
            subtitle: 'Erlebe authentische militärische Simulation in Arma 3 und Arma Reforger mit taktischem Tiefgang und koordinierten Großoperationen.'
        },
        {
            image: '/img/home-banner/home-banner3.webp',
            title: 'STARKE <span class="text-tttRed">COMMUNITY</span>',
            subtitle: 'Über 80 aktive Community-Mitglieder, regelmäßige Missionen und eine europaweite vernetzte MilSim-Community erwarten dich.'
        }
    ];

    // Gallery images for moving carousel
    readonly galleryImages: readonly string[] = [
        '/img/home-gallery/gallery-img1.webp',
        '/img/home-gallery/gallery-img2.webp',
        '/img/home-gallery/gallery-img3.webp',
        '/img/home-gallery/gallery-img4.webp',
        '/img/home-gallery/gallery-img5.webp',
        '/img/home-gallery/gallery-img6.webp',
        '/img/home-gallery/gallery-img7.webp',
        '/img/home-gallery/gallery-img8.webp'
    ];

    // Static content strings
    readonly content = {
        features: {
            title: 'Deine MilSim-Community für <span class="ttt-accent-text">Rookies</span> und taktische <span class="ttt-accent-text">Profis</span>',
            subtitle: 'Von Waffenkunde über Funken bis zu Taktik, Missionsbau und TvT - erlebe authentische MilSim-Missionen mit uns.'
        },
        join: {
            badge: 'Werde Teil der Community',
            title: 'Bereit für das<span class="text-tttRed">TTT</span>?',
            subtitle: 'Von der Anmeldung bis zum ersten Event - dein Weg in die <span class="ttt-accent-text font-semibold">TTT-Familie</span>',
            processTitle: 'Wie mitmachen?',
            processSubtitle: '4 einfache Schritte zur TTT-Mitgliedschaft',
            requirements: {
                title: 'Voraussetzungen',
                subtitle: 'Was du für TTT brauchst'
            }
        },
        gallery: {
            caption: 'Einblicke aus unseren <span class="ttt-accent-text font-semibold">Events</span>'
        },
        orbat: {
            badge: 'Chain of Command',
            title: 'Unsere Struktur',
            subtitle: 'Schau dir unsere <span class="font-bold">verschiedenen Aufgaben</span> an und finde heraus, wo du dich am wohlsten fühlst.',
            ctaButton: 'VOLLSTÄNDIGE AUFSTELLUNG'
        }
    } as const;

    // Join process steps
    readonly joinSteps: JoinStep[] = [
        {
            number: 1,
            title: 'Discord beitreten',
            description: 'Tritt unserem Discord-Server bei und stelle dich der Community vor',
            icon: 'pi pi-discord',
            iconColor: 'text-tttRed',
            link: {
                url: 'https://discord.tacticalteam.de',
                label: 'discord.tacticalteam.de'
            }
        },
        {
            number: 2,
            title: 'Arma3Sync Setup',
            description: 'Richte Arma3Sync für Arma 3 ein und lade die erforderlichen Mods herunter',
            icon: 'pi pi-download',
            iconColor: 'text-tttGreen'
        },
        {
            number: 3,
            title: 'Einsteiger-Event oder Fast-Path',
            description: 'Nimm an deinem ersten Event teil und lerne die Community kennen',
            icon: 'pi pi-calendar',
            iconColor: 'text-tttRed'
        },
        {
            number: 4,
            title: 'Willkommen bei TTT!',
            description: 'Du bist jetzt Teil der TTT-Familie und kannst an allen Events teilnehmen',
            icon: 'pi pi-star-fill',
            iconColor: 'text-tttGreen'
        }
    ];

    // Community statistics
    readonly communityStats: CommunityStats[] = [
        { value: '80+', label: 'Mitglieder', color: 'text-tttGreen' },
        { value: '2013', label: 'Gegründet', color: 'text-tttGreen' },
        { value: '2x', label: 'Events/Woche', color: 'text-tttGreen' }
    ];

    // CTA buttons data
    readonly ctaButtons: CtaButton[] = [
        {
            label: 'JETZT DURCHSTARTEN',
            icon: 'pi pi-rocket',
            routerLink: '/mitmachen',
            primary: true
        },
        {
            label: 'WIKI ENTDECKEN',
            icon: 'pi pi-book',
            href: 'https://wiki.tacticalteam.de',
            primary: false
        }
    ];

    // ORBAT ranks for structure section
    readonly orbatRanks: OrbatRank[] = [
        { title: 'Offiziere', icon: 'pi pi-star-fill', description: 'Führen das TTT eigenverantwortlich' },
        { title: 'Unteroffiziere', icon: 'pi pi-star', description: 'Direkte Unterstützer der Offiziere' },
        { title: 'Veteranen', icon: 'pi pi-shield', description: 'Hervorragende langjährige Mitglieder' },
        { title: 'Soldaten', icon: 'pi pi-user', description: 'Vollwertige TTT-Mitglieder' },
        { title: 'Rekruten', icon: 'pi pi-users', description: 'Angehende Mitglieder' },
        { title: 'Gäste', icon: 'pi pi-eye', description: 'Freie Mitspieler bei Events' }
    ];

    readonly features: Feature[] = [
        {
            title: 'Mindestens zwei Events pro Woche',
            description: 'Ob Trainings, Coop-Missionen, Zeus-Missionen oder externe Events: bei uns gibt es jede Woche mindestens 2 Spieltage.',
            icon: 'pi pi-calendar'
        },
        {
            title: 'Ausbildung & Training',
            description: 'Wir legen großen Wert auf unsere Ausbildungstätigkeit. Spannende, abwechslungsreiche und stetig weiterentwickelte Trainingskonzepte.',
            icon: 'pi pi-graduation-cap'
        },
        {
            title: 'Für Einsteiger & Profis',
            description: 'Unabhängig von Wissensstand werden Einsteiger explizit durch Ausbildung aufgebaut! Keine Pflichttermine!',
            icon: 'pi pi-users'
        },
        {
            title: 'Abwechslungsreiche Herausforderungen',
            description: 'Erlebe neue Blickwinkel als JTAC, Panzerkommandant, Gruppenführer oder einfacher Infanterist in unterschiedlichsten Einsätzen.',
            icon: 'pi pi-shield'
        }
    ];

    readonly requirements: Requirement[] = [
        { label: 'Ab 18 Jahre', icon: 'pi pi-id-card' },
        { label: 'Headset für TeamSpeak 3 & Discord', icon: 'pi pi-microphone' },
        { label: 'Apex- & Contact Expansion (Arma 3)', icon: 'pi pi-download' },
        { label: 'Keine Erfahrung notwendig', icon: 'pi pi-check' },
        { label: 'Spieltage: Dienstag & Freitag', icon: 'pi pi-calendar' }
    ];

    ngOnInit(): void {
        this.pageTitleService.setBaseTitle(); // Set base title for home page
        this.startSlider();
    }

    ngOnDestroy(): void {
        this.stopSlider();
    }

    private startSlider(): void {
        this.stopSlider(); // Prevent multiple intervals
        this.sliderInterval = setInterval(() => {
            this.nextImage();
        }, this.slideInterval);
    }

    private stopSlider(): void {
        if (this.sliderInterval) {
            clearInterval(this.sliderInterval);
            this.sliderInterval = undefined;
        }
    }

    nextImage(): void {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.bannerSlides.length;
        this.restartSlider();
    }

    previousImage(): void {
        this.currentImageIndex = this.currentImageIndex === 0 
            ? this.bannerSlides.length - 1 
            : this.currentImageIndex - 1;
        this.restartSlider();
    }

    goToImage(index: number): void {
        if (index >= 0 && index < this.bannerSlides.length) {
            this.currentImageIndex = index;
            this.restartSlider();
        }
    }

    private restartSlider(): void {
        this.startSlider(); // Restart timer on manual interaction
    }

    // Helper methods for cleaner HTML
    getGalleryImagesForLoop(): readonly string[] {
        return [...this.galleryImages, ...this.galleryImages];
    }

    getFeatureIconClasses(icon: string): string {
        return `${icon} text-lg text-tttWhite`;
    }

    getButtonClasses(primary: boolean): string {
        return primary 
            ? 'flex-1 bg-gradient-to-r from-tttRed to-tttRed-600 px-8 py-4 font-heading font-bold text-base text-tttWhite shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-tttRed/30 hover:scale-105'
            : 'flex-1 border-2 border-tttWhite/30 bg-tttWhite/10 px-8 py-4 font-heading font-bold text-base text-tttWhite backdrop-blur-sm transition-all duration-300 hover:border-tttWhite hover:bg-tttWhite/20';
    }

    getRequirementIconClasses(icon: string): string {
        return `${icon} text-base text-tttRed`;
    }
}
