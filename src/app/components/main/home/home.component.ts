import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { PageTitleService } from '../../../core/services/page-title.service';
import { SanitizationService } from '../../../core/services/sanitization.service';

interface BannerSlide {
    image: string;
    title: string;
    subtitle: string;
}

@Component({
    selector: 'ttt-home',
    imports: [CommonModule, RouterLink, ButtonDirective],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
    private readonly pageTitleService = inject(PageTitleService);
    private readonly sanitizationService = inject(SanitizationService);

    // Community statistics for the stats section
    readonly communityStats = [
        { value: '80+', label: 'Mitglieder', color: 'text-tttGreen' },
        { value: '2013', label: 'Gegründet', color: 'text-tttGreen' },
        { value: '2x', label: 'Events/Woche', color: 'text-tttGreen' }
    ];

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
    currentImageIndex = 0;
    private sliderInterval?: ReturnType<typeof setInterval>;
    private readonly slideInterval = 8000;

    ngOnInit(): void {
        this.pageTitleService.setBaseTitle();
        this.startSlider();
    }

    ngOnDestroy(): void {
        this.stopSlider();
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

    private startSlider(): void {
        this.stopSlider();
        if (this.bannerSlides.length > 1) {
            this.sliderInterval = setInterval(() => {
                this.nextImage();
            }, this.slideInterval);
        }
    }

    private stopSlider(): void {
        if (this.sliderInterval) {
            clearInterval(this.sliderInterval);
            this.sliderInterval = undefined;
        }
    }

    private restartSlider(): void {
        this.startSlider();
    }

    // Accessibility: strip HTML tags for aria-labels
    getCleanTitle(title: string): string {
        return this.sanitizationService.stripHtml(title);
    }
}
