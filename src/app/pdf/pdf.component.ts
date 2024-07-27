import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pdf',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './pdf.component.html',
  styleUrl: './pdf.component.css',
})
export class PdfComponent implements OnInit {
  imgSrcs: string[] = [];

  sharingService = inject(SharingService);
  date!: Date;
  destroyRef = inject(DestroyRef);
  ngOnInit() {
    this.sharingService.imgSrcs$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((srcs) => {
        if (srcs) {
          this.imgSrcs = srcs;
        }
      });

    this.sharingService.date$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((date) => {
        if (date) {
          this.date = date;
        }
      });
  }
}
