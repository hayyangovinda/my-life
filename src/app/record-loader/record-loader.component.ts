import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'record-loader',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './record-loader.component.html',
  styleUrl: './record-loader.component.css',
})
export class RecordLoaderComponent {
  @Output() stopRecording = new EventEmitter();

  onStopRecording() {
    this.stopRecording.emit();
  }
}
