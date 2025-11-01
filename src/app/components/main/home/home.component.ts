import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { BasePageComponent } from '../../../shared/components/base-page/base-page.component';
import { SanitizationService } from '../../../core/services/sanitization.service';
import { MemberService } from '../../../core/services/member.service';

@Component({
    selector: 'ttt-home',
    standalone: true,
    imports: [CommonModule, RouterLink, ButtonDirective, GalleriaModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent extends BasePageComponent implements OnInit {
    protected readonly pageTitle = 'Willkommen';
    private readonly sanitizationService = inject(SanitizationService);
    private readonly memberService = inject(MemberService);

    communityStats: { value: string; label: string; color: string }[] = [
        { value: '...', label: 'Mitglieder', color: 'text-tttGreen' },
        { value: '2013', label: 'Gegründet', color: 'text-tttGreen' },
        { value: '2', label: 'Events/Woche', color: 'text-tttGreen' }
    ];

    readonly galleryImages = [
        {
            itemImageSrc: '/img/home-gallery/gallery-img1.webp',
            alt: 'TTT Community Moment 1',
        },
        {
            itemImageSrc: '/img/home-gallery/gallery-img2.webp',
            alt: 'TTT Community Moment 2',
        },
        {
            itemImageSrc: '/img/home-gallery/gallery-img3.webp',
            alt: 'TTT Community Moment 3',
        },
        {
            itemImageSrc: '/img/home-gallery/gallery-img4.webp',
            alt: 'TTT Community Moment 4',
        },
        {
            itemImageSrc: '/img/home-gallery/gallery-img5.webp',
            alt: 'TTT Community Moment 5',
        },
        {
            itemImageSrc: '/img/home-gallery/gallery-img6.webp',
            alt: 'TTT Community Moment 6',
        },
        {
            itemImageSrc: '/img/home-gallery/gallery-img7.webp',
            alt: 'TTT Community Moment 7',
        },
        {
            itemImageSrc: '/img/home-gallery/gallery-img8.webp',
            alt: 'TTT Community Moment 8',
        },
    ];

    override ngOnInit(): void {
        super.ngOnInit();
        this.memberService.getMemberStats().subscribe(stats => {
            const total = Object.values(stats).reduce((sum, n) => sum + n, 0);
            this.communityStats[0].value = total.toString();
        });
    }

    getCleanTitle(title: string): string {
        return this.sanitizationService.stripHtml(title);
    }
}
