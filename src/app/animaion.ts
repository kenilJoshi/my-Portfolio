import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes,
  } from '@angular/animations';

  export const fader =
  trigger('routeAnimations', [
    transition('* => AboutPage', slideTo('left') ),
    transition('* => ContactPage', slideTo('right') ),
    transition('ContactPage => *', slideTo('left') ),
    transition('AboutPage => *', slideTo('right') )
  ]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({ [direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ [direction]: '0%'}))
      ])
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}