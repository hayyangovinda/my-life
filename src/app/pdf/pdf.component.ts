import { Component, inject, OnInit } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { DatePipe } from '@angular/common';

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
  ngOnInit() {
    this.sharingService.imgSrcs$.subscribe((srcs) => {
      this.imgSrcs = srcs;
    });

    this.sharingService.date$.subscribe((date) => {
      this.date = date;
    });
  }
}
