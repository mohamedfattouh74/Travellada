import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  customerReviews = [
    {
      name: 'Samantha B.',
      review:
        'I have been a customer for 4 years, and I can confidently say that their service is top-notch.',
      image: '/assets/customer1.svg',
    },
    {
      name: 'Mark Jacob',
      review:
        'The interface is easy to navigate and I find everything I need quickly.',
      image: '/assets/customer2.svg',
    },
    {
      name: 'Ramiro Pianarosa',
      review:
        "I recently started using it and I couldn't be more impressed with its functionality and user-friendly interface.",
      image: '/assets/customer3.svg',
    },
    {
      name: 'Morgan Adam',
      review:
        'Excellent holiday packages and they provide great, hassle free service.',
      image: '/assets/customer4.svg',
    },
    {
      name: 'Anastasia',
      review:
        'This is the second time booking via the application and i have to say there service is second to none.',
      image: '/assets/customer5.svg',
    },
    {
      name: 'Mariz Ricketts',
      review:
        'Have to say, all was very smooth. Not a single hitch, would use again every time.',
      image: '/assets/customer6.svg',
    },
  ];
  ngOnInit() {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTimeout(() => this.addMarqueeAnimation());
    }
  }

  addMarqueeAnimation() {
    let scrollers = document.querySelectorAll('.scroller');
    scrollers.forEach((scroller) => {
      scroller.setAttribute('data-animated', 'true');

      // Duplicating Content to not leave empty spaces in the marquee
      const scrollerInner: any = scroller.querySelector('.scroller__inner');
      const scrollerContent = Array.from(scrollerInner.children);
      scrollerContent.forEach((item: any) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute('aria-hidden', true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }
}
