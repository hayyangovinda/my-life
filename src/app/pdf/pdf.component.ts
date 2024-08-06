import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
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
  @Input() imgSrcs: string[] = [];
  @Input() date!: Date | undefined;
  @Input() story!: string;

  sharingService = inject(SharingService);
  destroyRef = inject(DestroyRef);
  ngOnInit() {}
}
