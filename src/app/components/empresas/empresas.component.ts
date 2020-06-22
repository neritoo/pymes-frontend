import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../clases/empresa';
import { EmpresasService } from '../../services/empresas.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas: Array<Empresa>;

  constructor(private empresaService: EmpresasService) {
    this.empresas = [];
  }

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas() {
    this.empresaService.getEmpresas().subscribe( empresas => this.empresas = empresas);
  }

}
