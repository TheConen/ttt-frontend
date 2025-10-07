import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';

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
