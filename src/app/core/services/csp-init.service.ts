import { Injectable, inject } from '@angular/core';
import { CSPService } from './csp.service';

@Injectable({ providedIn: 'root' })
export class CSPInitService {
  private readonly cspService = inject(CSPService);

  constructor() {
    this.cspService.updateCSP();
  }
}
