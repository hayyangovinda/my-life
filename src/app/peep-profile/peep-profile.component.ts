import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-peep-profile',
  standalone: true,
  imports: [],
  templateUrl: './peep-profile.component.html',
  styleUrls: ['../chat/chat.component.css', './peep-profile.component.css'],
})
export class PeepProfileComponent implements OnInit {
  sharingService = inject(SharingService);
  destroyRef = inject(DestroyRef);
  peep: any = {};
  ngOnInit(): void {
    this.sharingService.peepToView$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((peep: any) => {
        this.peep = peep;
        console.log(this.peep);
      });
  }

  toggleSidenav() {
    this.sharingService.toggleSidenav();
  }
}
