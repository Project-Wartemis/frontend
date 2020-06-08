import { Component, OnInit } from '@angular/core';
import languageJavascript from '@iconify/icons-mdi/language-javascript';
import languagePython from '@iconify/icons-mdi/language-python';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  public languageJavascriptIcon = languageJavascript;
  public languagePythonIcon = languagePython;

  constructor() { }

  ngOnInit(): void {
  }

}
