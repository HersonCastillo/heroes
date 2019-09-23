import { trigger, transition, style, animate, state } from '@angular/animations';

export const animations = [
    trigger('opacityFrame', [
        state('show', style({
            opacity: 1
        })),
        state('hide', style({
            opacity: 0
        })),
        transition('show => hide', animate('250ms ease-out')),
        transition('hide => show', animate('100ms ease-in'))
    ]),
    trigger('opacityFrameTransform', [
        state('show', style({
          opacity: 1,
          transform: 'scale(1, 1)'
        })),
        state('hide',   style({
          opacity: 0,
          display: 'none',
          transform: 'scale(.95, .95)'
        })),
        transition('show => hide', animate('100ms ease-out')),
        transition('hide => show', animate('250ms ease-in'))
    ])
];